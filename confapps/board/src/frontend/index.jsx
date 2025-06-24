import React, {useEffect, useState} from 'react';
import ForgeReconciler, {
    Button,
    Form,
    Heading,
    Inline,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTransition,
    Spinner,
    Stack,
    TextArea,
    Textfield,
    useForm
} from '@forge/react';
import {Board} from "../components/board";
import {invoke} from "@forge/bridge";

const App = () => {
    const {handleSubmit, register, getFieldId} = useForm();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [writeLoading, setWriteLoading] = useState(false);
    const [articles, setArticles] = useState([]);

    const openModal = () => setIsOpenModal(true);
    const closeModal = () => setIsOpenModal(false);

    useEffect(() => {
        const retrieveArticles = async () => {
            setFetchLoading(true);
            const articles = await invoke('findAllArticles');
            setArticles(articles);
            setFetchLoading(false);
        }

        retrieveArticles().catch(console.error);
    }, [invoke, setArticles, setFetchLoading]);

    const onCreateArticleSubmit = async (data) => {
        setWriteLoading(true);

        const currentUser = await invoke('findCurrentUser');

        const newArticle = await invoke('saveArticle', {
            id: Date.now(),
            title: data.title,
            content: data.content,
            accountId: currentUser.accountId,
        });

        setArticles([...articles, newArticle]);

        setWriteLoading(false);
        closeModal();
    }

    const onDeleteArticle = async (article) => {
        await invoke('deleteArticle', {article});

        setArticles(articles.filter(a => a.id !== article.id));
    }

    return (
        <>
            <Stack space={"space.1000"}>
                <Stack alignInline={"center"}>
                    <Heading size={"large"}>게시판</Heading>
                </Stack>


                <Inline alignInline={"end"}>
                    <Button appearance={"primary"} onClick={openModal}>게시글 생성</Button>
                </Inline>

                <Board articles={articles} loading={fetchLoading} onDeleteArticle={onDeleteArticle}/>
            </Stack>

            <ModalTransition>
                {isOpenModal && (
                    <Modal onClose={closeModal}>
                        {writeLoading ?
                            <Stack space={"space.100"} alignInline={"center"}>
                                <Spinner/>
                            </Stack> :
                            <Form onSubmit={handleSubmit(onCreateArticleSubmit)}>
                                <ModalHeader>
                                    <ModalTitle>{'게시글 생성'}</ModalTitle>
                                </ModalHeader>
                                <ModalBody>
                                    <Label labelFor={getFieldId('title')}>제목</Label>
                                    <Textfield name={"title"} id={"title"} {...register('title', {required: true})} />

                                    <Label labelFor={getFieldId('content')}>내용</Label>
                                    <TextArea name={"content"}
                                              id={"content"} {...register('content', {required: true})} />
                                </ModalBody>
                                <ModalFooter>
                                    <Button appearance={"subtle"} onClick={closeModal}>취소</Button>
                                    <Button appearance={"primary"} type={"submit"}>생성</Button>
                                </ModalFooter>
                            </Form>}
                    </Modal>
                )}
            </ModalTransition>
        </>
    );
};

ForgeReconciler.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
