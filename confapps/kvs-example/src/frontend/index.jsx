import React, {useEffect, useState} from 'react';
import ForgeReconciler, {Label, Text, TextArea, useConfig} from '@forge/react';
import {invoke} from '@forge/bridge';
import {DefinitionTable} from './definition-table';


const Config = () => {
    return (
        <>
            <Label labelFor={"terms"}>Terms to include (one per line)</Label>
            <TextArea name={"terms"} id={"terms"} defaultValue={""} isRequired={true}/>
        </>
    )
}

const App = () => {
    const [definitions, setDefinitions] = useState([]);

    const config = useConfig() || {};
    const terms = config.terms ? config.terms.split("\n") : [];

    useEffect(() => {
        const populateDefinitions = async () => {
            if (terms.length !== 0) {
                const data = await invoke('getDefinitions', {terms});
                setDefinitions(data);
            }
        }

        populateDefinitions();
    }, [terms, invoke, setDefinitions]);

    if (terms.length === 0) {
        return <Text>No terms to include</Text>
    }

    return (
        <>
            <DefinitionTable terms={terms} definitions={definitions}/>
        </>
    )
};

ForgeReconciler.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

ForgeReconciler.addConfig(<Config/>);