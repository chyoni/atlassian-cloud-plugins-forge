import React from 'react';
import {SectionMessage, Text, useTranslation} from '@forge/react';

export const QuestionContent = ({questionKey}) => {
    const {t} = useTranslation();
    return (
        <SectionMessage appearance="discovery">
            <Text weight="bold" size="medium">
                {t(`question.${questionKey}`)}
            </Text>
        </SectionMessage>
    );
};