import React, {useEffect, useState} from 'react';
import ForgeReconciler, {Text, useProductContext} from '@forge/react';
import {invoke} from '@forge/bridge';

const App = () => {
    const context = useProductContext();
    const contentId = context?.extension?.content?.id;

    const [data, setData] = useState();
    const [keywords, setKeywords] = useState();
    const [response, setResponse] = useState();

    useEffect(() => {
        if (contentId) {
            invoke('getContent', {contentId}).then(setData);
        }
    }, [contentId])

    // Define a prompt to be used for the OpenAI API
    const prompt = `Here is the data:"${data}"
  Give me the 5 most important keywords from the text. Return the results in the form of a JavaScript array. 
  The response shouldn't contain anything apart from the array. No extra text or JavaScript formatting.`

    useEffect(() => {
        if (prompt) {
            invoke('callOpenAI', {prompt}).then(setKeywords);
        }
    }, [prompt]);

    useEffect(() => {
        if (keywords) {
            invoke('addKeywordsToLabels', {keywords, contentId}).then(setResponse);
        }
    }, [keywords, contentId]);

    return (
        <>
            <Text>{`Successfully Done !!! Press Refresh button`}</Text>
        </>
    );
};

ForgeReconciler.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
