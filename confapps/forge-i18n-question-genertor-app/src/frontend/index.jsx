import React from 'react';
import ForgeReconciler, {I18nProvider, Spinner, useTranslation} from '@forge/react';
import {QuestionGeneratorPanel} from "./QuestionGeneratorPanel";


const App = () => {
    const {ready} = useTranslation();

    if (!ready) {
        return <Spinner size="large"/>;
    }

    return <QuestionGeneratorPanel/>;
};


ForgeReconciler.render(
    <React.StrictMode>
        <I18nProvider>
            <App/>
        </I18nProvider>
    </React.StrictMode>
);
