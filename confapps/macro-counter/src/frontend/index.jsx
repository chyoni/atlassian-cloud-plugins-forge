import React, {useEffect, useState} from 'react';
// Import required components from UI Kit
import ForgeReconciler, {Spinner, Text, useProductContext} from '@forge/react';
// Import required for calling resolver
import {invoke} from '@forge/bridge';

const countMacros = (data) => {
    if (!data || !data.body || !data.body.atlas_doc_format || !data.body.atlas_doc_format.value) {
        return 0;
    }

    const {body: {atlas_doc_format: {value}}} = data;
    const {content: contentList} = JSON.parse(value);

    const macros = contentList.filter((content) => {
        return content.type === "extension";
    });

    return macros.length;
};

const App = () => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const context = useProductContext();
    const contentId = context?.extension?.content?.id;

    useEffect(() => {
        if (contentId) {
            setIsLoading(true);
            invoke('getContent', {contentId})
                .then((result) => {
                    setData(result);
                    setIsLoading(false);
                })
                .catch((err) => {
                    console.error('Error fetching content: ', err);
                    setIsLoading(false);
                })
        }
    }, [contentId]);

    if (isLoading) {
        return <Spinner/>;
    }

    const macroCount = countMacros(data);

    return (
        <Text>{`Number of macros on this page: ${macroCount}`}</Text>
    );
};

ForgeReconciler.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
