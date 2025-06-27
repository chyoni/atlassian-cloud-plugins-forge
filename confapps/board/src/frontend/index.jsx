import React, {useCallback, useEffect, useState} from 'react';
import ForgeReconciler, {
    Button,
    Form,
    Heading,
    I18nProvider,
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
    useForm,
    useTranslation
} from '@forge/react';
import {Table} from "../components/Table";
import {invoke} from "@forge/bridge";

const App = () => {
    const {t} = useTranslation();

    const [currentUser, setCurrentUser] = useState(null);

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

    const openEditModal = useCallback((article) => {
        setCurrentArticle(article);
        setIsEditOpenModal(true);
    }, []);

    const closeEditModal = () => {
        setIsEditOpenModal(false);
        setCurrentArticle(null);
    }

    const openReadModal = useCallback((article) => {
        setReadArticle(article);
        setIsReadOpenModal(true);
    }, []);

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

    useEffect(() => {
        const fetchCurrentUser = async () => {
            if (!currentUser) {
                const user = await invoke('findCurrentUser');
                setCurrentUser(user);
            }
        };
        fetchCurrentUser().catch(console.error);
    }, [currentUser]);


    const onCreateArticleSubmit = async (data) => {
        setWriteLoading(true);

        const newArticle = await invoke('saveArticle', {
            id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
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

        const updatedArticle = await invoke('saveArticle', {
            id: currentArticle.id,
            title: data.title === undefined ? currentArticle.title : data.title,
            content: data.content === undefined ? currentArticle.content : data.content,
            accountId: currentUser.accountId,
        });

        setArticles(prevArticles =>
            prevArticles.map(a => a.id === updatedArticle.id ? updatedArticle : a)
        );
        setWriteLoading(false);
        closeEditModal();
    }

    const onDeleteArticle = useCallback(async (article) => {
        await invoke('deleteArticle', {article});
        setArticles(prevArticles => prevArticles.filter(a => a.id !== article.id));
    }, []);

    return (
        <>
            <Stack space={"space.1000"}>
                <Stack alignInline={"center"}>
                    <Heading size={"large"}>{t("board.title")}</Heading>
                </Stack>
                <Inline alignInline={"end"}>
                    <Button appearance={"primary"} onClick={openNewModal}>{t(`article.create`)}</Button>
                </Inline>
                <Table articles={articles}
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
                                <ModalTitle>{t(`article.create`)}</ModalTitle>
                            </ModalHeader>
                            <ModalBody>
                                <Label labelFor={createForm.getFieldId('title')}>{t(`field.title`)}</Label>
                                <Textfield name={"title"}
                                           id={"title"}
                                           {...createForm.register('title', {required: true})} />

                                <Label labelFor={createForm.getFieldId('content')}>{t(`field.content`)}</Label>
                                <TextArea name={"content"}
                                          id={"content"}
                                          {...createForm.register('content', {required: true})} />
                            </ModalBody>
                            <ModalFooter>
                                <LoadingButton isDisabled={writeLoading}
                                               appearance={"subtle"}
                                               onClick={closeNewModal}>
                                    {t(`button.cancel`)}
                                </LoadingButton>
                                <LoadingButton isDisabled={writeLoading}
                                               isLoading={writeLoading}
                                               appearance={"primary"}
                                               type={"submit"}>
                                    {t(`button.create`)}
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
                                <ModalTitle>{t(`article.edit`)}</ModalTitle>
                            </ModalHeader>
                            <ModalBody>
                                <Label labelFor={editForm.getFieldId('title')}>{t(`field.title`)}</Label>
                                <Textfield name={"title"}
                                           id={"title"}
                                           defaultValue={currentArticle.title}
                                           {...editForm.register('title')} />

                                <Label labelFor={editForm.getFieldId('content')}>{t(`field.content`)}</Label>
                                <TextArea name={"content"}
                                          id={"content"}
                                          defaultValue={currentArticle.content}
                                          {...editForm.register('content')} />
                            </ModalBody>
                            <ModalFooter>
                                <LoadingButton isDisabled={writeLoading}
                                               appearance={"subtle"}
                                               onClick={closeEditModal}>
                                    {t(`button.cancel`)}
                                </LoadingButton>
                                <LoadingButton isDisabled={writeLoading}
                                               appearance={"primary"}
                                               type={"submit"}
                                               isLoading={writeLoading}>
                                    {t(`button.edit`)}
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
                            <ModalTitle>{t(`article.detail`)}</ModalTitle>
                        </ModalHeader>
                        <ModalBody>
                            <Label labelFor={"title"}>{t(`field.title`)}</Label>
                            <Textfield name={"title"}
                                       id={"title"}
                                       defaultValue={readArticle.title}
                                       isReadOnly={true}
                                       isDisabled={true}/>

                            <Label labelFor={"content"}>{t(`field.content`)}</Label>
                            <TextArea name={"content"}
                                      id={"content"}
                                      isReadOnly={true}
                                      isDisabled={true}
                                      defaultValue={readArticle.content}/>
                        </ModalBody>
                        <ModalFooter>
                            <LoadingButton appearance={"subtle"} onClick={closeReadModal}>
                                {t(`button.close`)}
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
        <I18nProvider>
            <App/>
        </I18nProvider>
    </React.StrictMode>
);
