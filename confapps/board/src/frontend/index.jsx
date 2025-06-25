import React, {useEffect, useState} from 'react';
import ForgeReconciler, {
    Button,
    Form,
    Heading,
    Inline,
    Label,
    LoadingButton,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTransition,
    Stack,
    TextArea,
    Textfield,
    useForm
} from '@forge/react';
import {Board} from "../components/board";
import {invoke} from "@forge/bridge";

const App = () => {
    const createForm = useForm();
    const editForm = useForm();

    const [isNewOpenModal, setIsNewOpenModal] = useState(false);
    const [isEditOpenModal, setIsEditOpenModal] = useState(false);
    const [isReadOpenModal, setIsReadOpenModal] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [writeLoading, setWriteLoading] = useState(false);
    const [articles, setArticles] = useState([]);
    const [currentArticle, setCurrentArticle] = useState(null);
    const [readArticle, setReadArticle] = useState(null);

    const openNewModal = () => setIsNewOpenModal(true);
    const closeNewModal = () => setIsNewOpenModal(false);

    const openEditModal = (article) => {
        setCurrentArticle(article);
        setIsEditOpenModal(true);
    }
    const closeEditModal = () => {
        setIsEditOpenModal(false);
        setCurrentArticle(null);
    }

    const openReadModal = (article) => {
        setReadArticle(article);
        setIsReadOpenModal(true);
    }

    const closeReadModal = () => {
        setIsReadOpenModal(false);
        setReadArticle(null);
    }

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
        closeNewModal();
    }

    const onEditArticleSubmit = async (data) => {
        setWriteLoading(true);

        const currentUser = await invoke('findCurrentUser');
        const updatedArticle = await invoke('saveArticle', {
            id: currentArticle.id,
            title: data.title === undefined ? currentArticle.title : data.title,
            content: data.content === undefined ? currentArticle.content : data.content,
            accountId: currentUser.accountId,
        });

        setArticles(articles.map(a => a.id === updatedArticle.id ? updatedArticle : a));
        setWriteLoading(false);
        closeEditModal();
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
                    <Button appearance={"primary"} onClick={openNewModal}>게시글 생성</Button>
                </Inline>
                <Board articles={articles}
                       loading={fetchLoading}
                       onDeleteArticle={onDeleteArticle}
                       openEditModal={openEditModal}
                       openReadModal={openReadModal}
                />
            </Stack>

            <ModalTransition>
                {isNewOpenModal && (
                    <Modal onClose={closeNewModal}>
                        <Form onSubmit={createForm.handleSubmit(onCreateArticleSubmit)}>
                            <ModalHeader>
                                <ModalTitle>{'게시글 생성'}</ModalTitle>
                            </ModalHeader>
                            <ModalBody>
                                <Label labelFor={createForm.getFieldId('title')}>제목</Label>
                                <Textfield name={"title"}
                                           id={"title"}
                                           {...createForm.register('title', {required: true})} />

                                <Label labelFor={createForm.getFieldId('content')}>내용</Label>
                                <TextArea name={"content"}
                                          id={"content"}
                                          {...createForm.register('content', {required: true})} />
                            </ModalBody>
                            <ModalFooter>
                                <LoadingButton isDisabled={writeLoading}
                                               appearance={"subtle"}
                                               onClick={closeNewModal}>
                                    취소
                                </LoadingButton>
                                <LoadingButton isDisabled={writeLoading}
                                               isLoading={writeLoading}
                                               appearance={"primary"}
                                               type={"submit"}>
                                    생성
                                </LoadingButton>
                            </ModalFooter>
                        </Form>
                    </Modal>
                )}
            </ModalTransition>

            <ModalTransition>
                {isEditOpenModal && (
                    <Modal onClose={closeEditModal}>
                        <Form onSubmit={editForm.handleSubmit(onEditArticleSubmit)}>
                            <ModalHeader>
                                <ModalTitle>{'게시글 수정'}</ModalTitle>
                            </ModalHeader>
                            <ModalBody>
                                <Label labelFor={editForm.getFieldId('title')}>제목</Label>
                                <Textfield name={"title"}
                                           id={"title"}
                                           defaultValue={currentArticle.title}
                                           {...editForm.register('title')} />

                                <Label labelFor={editForm.getFieldId('content')}>내용</Label>
                                <TextArea name={"content"}
                                          id={"content"}
                                          defaultValue={currentArticle.content}
                                          {...editForm.register('content')} />
                            </ModalBody>
                            <ModalFooter>
                                <LoadingButton isDisabled={writeLoading}
                                               appearance={"subtle"}
                                               onClick={closeEditModal}>
                                    취소
                                </LoadingButton>
                                <LoadingButton isDisabled={writeLoading}
                                               appearance={"primary"}
                                               type={"submit"}
                                               isLoading={writeLoading}>
                                    수정
                                </LoadingButton>
                            </ModalFooter>
                        </Form>
                    </Modal>
                )}
            </ModalTransition>

            <ModalTransition>
                {isReadOpenModal && (
                    <Modal onClose={closeReadModal} height={"500px"} shouldScrollInViewport={false} width={"x-large"}>
                        <ModalHeader>
                            <ModalTitle>{'게시글 상세'}</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <Label labelFor={"title"}>제목</Label>
                            <Textfield name={"title"}
                                       id={"title"}
                                       defaultValue={readArticle.title}
                                       isReadOnly={true}
                                       isDisabled={true}/>

                            <Label labelFor={"content"}>내용</Label>
                            <TextArea name={"content"}
                                      id={"content"}
                                      isReadOnly={true}
                                      isDisabled={true}
                                      defaultValue={readArticle.content}/>
                        </ModalBody>
                        <ModalFooter>
                            <LoadingButton appearance={"subtle"} onClick={closeReadModal}>
                                닫기
                            </LoadingButton>
                        </ModalFooter>
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
