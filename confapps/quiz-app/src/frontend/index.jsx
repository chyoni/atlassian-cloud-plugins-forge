import React, {useState} from 'react';
import {QuestionSet} from '../data/questions';
import ForgeReconciler, {Button, Heading, Image, Inline, Stack, Text} from '@forge/react';

const App = () => {
    const [activeQuestion, setActiveQuestion] = useState(0);
    const [explanation, setExplanation] = useState('')
    const [showResult, setShowResult] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);

    const onClickHandler = (isCorrect) => {
        if (isCorrect) {
            setExplanation('You got it right!');
            setScore(score + 1);
        } else {
            setExplanation('Incorrect, the correct answer is ' + `${QuestionSet[activeQuestion].correctAnswer}`);
        }
        setShowResult(true);
    }

    const onClickNext = () => {
        if (activeQuestion + 1 < QuestionSet.length) {
            setActiveQuestion(activeQuestion + 1);
            setShowResult(false);
        } else {
            setShowResults(true);
        }
    }

    const onClickReplay = () => {
        setActiveQuestion(0);
        setShowResult(false);
        setScore(0);
        setExplanation('');
        setShowResults(false);
    }

    const {question, options, image} = QuestionSet[activeQuestion];

    return (
        <>
            {showResults ? (
                <Stack space="space.200" alignInline="center">
                    <Heading as="h1">Final score: {score} out of {QuestionSet.length} </Heading>
                    <Image src={"https://media.giphy.com/media/XROOE9NApITmCgF6dZ/giphy.gif"} alt='High-five'
                           size="small"/>
                    <Button appearance="primary" onClick={onClickReplay}>
                        Replay
                    </Button>
                </Stack>
            ) : (
                <Stack space="space.200" alignInline="center">
                    <Heading as="h1">{question}</Heading>
                    <Image src={image ? image : "https://media.giphy.com/media/xUOxfjsW9fWPqEWouI/giphy.gif"}
                           alt="Founders" size="xsmall"/>
                    <Inline space="space.200" alignBlock="center" alignInline="center">
                        <Stack space="space.200" grow="hug">
                            <Button appearance="primary" onClick={() => onClickHandler(options[0].isCorrect)}
                                    isDisabled={showResult}>
                                {options[0].option}
                            </Button>
                            <Button appearance="primary" onClick={() => onClickHandler(options[2].isCorrect)}
                                    isDisabled={showResult}>
                                {options[2].option}
                            </Button>
                        </Stack>
                        <Stack space="space.200" grow="hug">
                            <Button appearance="primary" onClick={() => onClickHandler(options[1].isCorrect)}
                                    isDisabled={showResult}>
                                {options[1].option}
                            </Button>
                            <Button appearance="primary" onClick={() => onClickHandler(options[3].isCorrect)}
                                    isDisabled={showResult}>
                                {options[3].option}
                            </Button>
                        </Stack>
                    </Inline>
                    <Text>{showResult ? explanation : null}</Text>
                    <Button appearance='default' onClick={onClickNext}
                            isDisabled={!showResult}>{activeQuestion === QuestionSet.length - 1 ? 'Finish' : 'Next Question'}</Button>
                    <Text>Question {activeQuestion + 1} of {QuestionSet.length}</Text>
                </Stack>)
            }
        </>
    );
};

ForgeReconciler.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
