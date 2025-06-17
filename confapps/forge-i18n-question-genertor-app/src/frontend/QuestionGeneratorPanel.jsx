import React, {useCallback, useState} from 'react';
import {Button, Heading, Inline, Lozenge, Stack, Text, useTranslation} from '@forge/react';
import {QuestionContent} from './QuestionContent';

const NUM_QUESTIONS = 54;

export const QuestionGeneratorPanel = () => {
    const {t, locale} = useTranslation(); // Creates the translation function and user locale from useTranslation()
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const nextQuestion = useCallback(() => {
        setCurrentQuestionIndex((prevIndex) => (prevIndex + 1) % NUM_QUESTIONS);
    }, [setCurrentQuestionIndex]);

    return (
        <Stack space="space.200">
            <Heading as="h1">{t("ui.header")}</Heading> {/*Displays the heading of the app*/}
            <Text>{t("ui.text.intro")}</Text>
            <QuestionContent
                questionKey={`q_${currentQuestionIndex}`}/> {/*The QuestionContent displays the current question*/}
            <Inline alignBlock="center" space="space.100">
                <Heading as="h3">{t("ui.text.currentLocale")}</Heading>
                <Lozenge>{locale}</Lozenge>
            </Inline>
            <Inline alignInline="end">
                <Button appearance="primary" onClick={nextQuestion}>
                    {t("ui.button.nextQuestion")}
                </Button>
            </Inline>
        </Stack>
    );
};
