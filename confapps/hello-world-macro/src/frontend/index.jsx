import React, {useEffect, useState} from 'react';
import ForgeReconciler, {Text, useProductContext} from '@forge/react';
import {invoke, requestConfluence} from '@forge/bridge';


const fetchCommentsForPage = async (pageId) => {
    const res = await requestConfluence(`/wiki/api/v2/pages/${pageId}/footer-comments`);
    const data = await res.json();
    return data.results;
};


const App = () => {
    const context = useProductContext();
    const [data, setData] = useState(null);
    const [comments, setComments] = React.useState();

    console.log(`Number of comments on this page: ${comments?.length}`);

    useEffect(() => {
        invoke('getText', {example: 'my-invoke-variable'}).then(setData);
    }, []);

    useEffect(() => {
        if (context) {
            // extract page ID from the context
            const pageId = context.extension.content.id;

            fetchCommentsForPage(pageId).then(setComments);
        }
    }, [context]);

    return (
        <>
            <Text>Hello world!</Text>
            <Text>{data ? data : 'Loading...'}</Text>
            <Text>
                Number of comments on this page: {comments?.length}
            </Text>
        </>
    );
};

ForgeReconciler.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
