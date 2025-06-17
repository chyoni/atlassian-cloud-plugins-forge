import React, {useEffect, useState} from 'react';
import ForgeReconciler, {Image, Inline, Lozenge, Text} from '@forge/react';
import {invoke} from '@forge/bridge';

const App = () => {
    const [data, setData] = useState(null);
    useEffect(() => {
        invoke('getText', {example: 'my-invoke-variable'}).then(setData);
    }, []);

    const hasAssignee = true;
    const assigneeAppearance = (hasAssignee) ? 'success' : 'removed';
    const assigneeLozengeText = (hasAssignee) ? 'Yes' : 'No';

    const hasDescription = true;
    const descAppearance = (hasDescription) ? 'success' : 'removed';
    const descLozengeText = (hasDescription) ? 'Yes' : 'No';

    return (
        <>
            <Inline alignBlock="baseline" space='space.100'>
                <Lozenge appearance={assigneeAppearance}>{assigneeLozengeText}</Lozenge>
                <Text>This issue has a valid assignee and is different from the Reporter.</Text>
            </Inline>

            <Inline alignBlock="baseline" space='space.100'>
                <Lozenge appearance={descAppearance}>{descLozengeText}</Lozenge>
                <Text>The issue has description.</Text>
            </Inline>

            <Image src='https://go.atlassian.com/curious-cat-2'/>
        </>
    );
};

ForgeReconciler.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
