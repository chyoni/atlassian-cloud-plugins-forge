import React from 'react';
import ForgeReconciler, {Link, SectionMessage, Stack, Text, useConfig} from '@forge/react';
import Config, {defaultConfig} from "../config";


const App = () => {
    const actualConfig = useConfig();
    const config = actualConfig || defaultConfig;

    return (
        <>
            <Text>
                {config.name} is {config.age} years old.
            </Text>
            <Stack space={"space.100"}>
                <Link href={"https://cwchoiit.atlassian.net/wiki/home"} openNewTab={true}>
                    Home Confluence (Open New Tab)
                </Link>
                <Link href={"https://cwchoiit.atlassian.net/wiki/home"}>
                    Home Confluence (Open Current Tab)
                </Link>
            </Stack>
            {!actualConfig &&
                <SectionMessage title={"You need to configure this macro"} appearance={"warning"}>
                    <Text> While editing the page, select the macro, and click on the pencil icon
                        to display configuration options.</Text>
                </SectionMessage>
            }
        </>
    )
};

ForgeReconciler.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

ForgeReconciler.addConfig(<Config/>);
