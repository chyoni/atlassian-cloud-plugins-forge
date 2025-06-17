import api, { route } from '@forge/api';
import { doc, p } from '@atlaskit/adf-utils/builders';

const fetchComments = async (pageId) => {
    const res = await api
        .asApp()
        .requestConfluence(route`/wiki/api/v2/pages/${pageId}/footer-comments`);
    const data = await res.json();
    return data.results;
};

export const exportFunction = async (payload) => {
    const pageId = payload.context.content.id;
    const comments = await fetchComments(pageId);

    return doc(
        p(`Number of comments on this page: ${comments.length}`),
        p(`Hello world! This is an export of type ${payload.exportType}.`)
    );
}

