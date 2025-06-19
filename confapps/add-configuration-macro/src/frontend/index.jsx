import React from 'react';
import ForgeReconciler, {Label, SectionMessage, Text, Textfield, useConfig} from '@forge/react';

const defaultConfig = {
    name: "Unnamed Pet",
    age: "0"
}


const Config = () => {
    return (
        <>
            <Label labelFor={"pet-name"}>Pet name</Label>
            <Textfield id={"pet-name"}
                       name={"name"}
                       value={name}
                       defaultValue={defaultConfig.name}/>

            <Label labelFor={"pet-age"}>Pet age</Label>
            <Textfield id={"pet-age"}
                       name={"age"}
                       defaultValue={defaultConfig.age}/>
        </>
    );
};


const App = () => {
    const actualConfig = useConfig();
    const config = actualConfig || defaultConfig;

    return (
        <>
            <Text>
                {config.name} is {config.age} years old.
            </Text>
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
