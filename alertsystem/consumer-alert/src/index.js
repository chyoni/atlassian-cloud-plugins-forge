import api, {fetch, route} from '@forge/api';

// forge variables set --encrypt SLACK_BOT_TOKEN <your-bot-token>
// forge variables set --encrypt SLACK_CHANNEL_ID <your channel id>

export async function run(event, context) {
    console.log('event: ' + JSON.stringify(event, null, 2));
    console.log('context: ' + JSON.stringify(context, null, 2));

    const slackToken = process.env.SLACK_BOT_TOKEN;
    const slackChannelId = process.env.SLACK_CHANNEL_ID;

    if (!slackToken || !slackChannelId) {
        console.error('Missing environment variables');
        return;
    }

    let issueDetails = '';
    try {
        // 최근 생성된 미할당 이슈 조회
        const jiraResponse = await api.asApp().requestJira(
            route`/rest/api/3/search?jql=status="To Do" AND assignee=EMPTY ORDER BY created DESC&maxResults=1`
        );

        const data = await jiraResponse.json();
        if (data.issues && data.issues.length > 0) {
            const issue = data.issues[0];
            issueDetails = `\n*Issue:* <https://cwchoiit.atlassian.net/browse/${issue.key}|${issue.key}>\n*Summary:* ${issue.fields.summary}`;
        }
    } catch (error) {
        console.error('Error fetching Jira data:', error);
    }

    // Slack API를 사용해 메시지 전송
    const slackApiUrl = 'https://slack.com/api/chat.postMessage';

    const message = {
        channel: slackChannelId,
        text: '🚨 Unassigned Issue Alert!',
        blocks: [
            {
                type: "header",
                text: {
                    type: "plain_text",
                    text: "⚠️ Action Required: Unassigned Issue"
                }
            },
            {
                type: "section",
                text: {
                    type: "mrkdwn",
                    text: `A high priority issue needs attention!${issueDetails}`
                }
            },
            {
                type: "context",
                elements: [
                    {
                        type: "mrkdwn",
                        text: `Event received at ${new Date().toLocaleString()}`
                    }
                ]
            }
        ]
    };

    try {
        const response = await fetch(slackApiUrl, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${slackToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message)
        });

        const result = await response.json();

        if (result.ok) {
            console.log('✅ Slack message sent successfully');
        } else {
            console.error('❌ Slack API error:', result.error);
        }
    } catch (error) {
        console.error('Error calling Slack API:', error);
    }
}
