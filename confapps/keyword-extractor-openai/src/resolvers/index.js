import Resolver from '@forge/resolver';
import {asUser, route} from '@forge/api';
import OpenAI from 'openai';

const resolver = new Resolver();
const OPEN_API_KEY = process.env.OPEN_API_KEY;
const ORG_ID = process.env.ORG_ID;

resolver.define('getContent', async ({payload}) => {

    const response = await asUser().requestConfluence(route`/wiki/api/v2/pages/${payload.contentId}?body-format=storage`, {
        headers: {
            'Accept': 'application/json'
        }
    });

    if (!response.ok) {
        const err = `Error while getContent with contentId: ${payload.contentId} : ${response.status} ${response.statusText}`;
        console.error(err);
        throw new Error(err);
    }

    const responseData = await response.json();
    return responseData.body.storage.value;
});

resolver.define('callOpenAI', async ({payload}) => {
    if (!OPEN_API_KEY || !ORG_ID) {
        console.error("OPEN_API_KEY or ORG_ID not set");
        return;
    }

    // forge variables set --encrypt OPEN_API_KEY <your-open-ai-api-key>
    // forge variables set --encrypt ORG_ID <your-org-id>
    const openai = new OpenAI({
        apiKey: OPEN_API_KEY,
        organization: ORG_ID
    });

    const chatCompletion = await openai.chat.completions.create({
        messages: [{role: 'user', content: payload.prompt}],
        model: 'gpt-3.5-turbo'
    })

    return chatCompletion.choices[0].message.content;
})

resolver.define('addKeywordsToLabels', async ({payload}) => {
    const bodyData = JSON.parse(payload.keywords).map(label => ({
        prefix: "global",
        name: label.split(" ").join("-"),
    }));

    const response = await asUser().requestConfluence(route`/wiki/rest/api/content/${payload.contentId}/label`, {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    })

    return await response.json();
})

export const handler = resolver.getDefinitions();
