import React, {useCallback, useState} from 'react';
import {
    Button,
    ButtonGroup,
    DynamicTable,
    Form,
    Inline,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    ModalTitle,
    ModalTransition,
    Spinner,
    Text,
    TextArea,
    useForm
} from '@forge/react';
import {invoke} from '@forge/bridge';

// Render the table headers
const head = {
    cells: [
        {
            key: "term",
            content: "Term",
            isSortable: true,
        },
        {
            key: "definition",
            content: "Definition",
            shouldTruncate: true,
            isSortable: true,
        },
        {
            key: "buttons", // Additional column for buttons on each row
            content: "",
            shouldTruncate: true,
            isSortable: true,
        },
    ],
};

// Render the Definition Table
export const DefinitionTable = ({terms, definitions}) => {
    const {handleSubmit, register, getFieldId} = useForm();
    const [term, setTerm] = useState('');
    const [definition, setDefinition] = useState('');
    const [loadingState, setLoadingState] = useState(false);
    const [inputIsOpen, setInputIsOpen] = useState(false);

    const openInputModal = () => setInputIsOpen(true);
    const closeInputModal = () => setInputIsOpen(false);

    const [deleteIsOpen, setDeleteIsOpen] = useState(false);
    const openDeleteModal = () => setDeleteIsOpen(true);
    const closeDeleteModal = () => setDeleteIsOpen(false);

    const submitInput = async ({definition}) => {
        setLoadingState(true);
        await invoke('saveDefinition', {term: term, definition: definition})
        setLoadingState(false);
    };

    const submitDelete = async () => {
        setLoadingState(true);
        await invoke('removeDefinition', {term: term})
        setLoadingState(false);
    };

    const generateRow = useCallback((index, term, generatedDefinition) => {
        let definitionContent = <Spinner/>;
        if (generatedDefinition === "") {
            definitionContent = <Button appearance={"default"} onClick={() => {
                setTerm(term);
                setDefinition("");
                openInputModal();
            }}>
                Add definition
            </Button>;
        } else if (generatedDefinition) {
            definitionContent = <Inline spread={"space-between"}>
                <Text>{generatedDefinition}</Text>
                <ButtonGroup>
                    <Button appearance={"default"} spacing={"compact"} onClick={() => {
                        setTerm(term);
                        setDefinition(generatedDefinition);
                        openInputModal();
                    }}>
                        Edit
                    </Button>
                    <Button appearance={"danger"} spacing={"compact"} onClick={() => {
                        setTerm(term);
                        openDeleteModal();
                    }}>
                        Delete
                    </Button>
                </ButtonGroup>
            </Inline>
        }

        return ({
            key: `row-${index}-${term}`,
            cells: [
                {
                    key: `term-${index}`,
                    content: term,
                },
                {
                    key: `definition-${index}`,
                    content: definitionContent,
                    colSpan: 2,
                }
            ]
        })
    }, [setTerm, setDefinition, openInputModal, openDeleteModal]);

    const rows = terms.map((term, index) => (generateRow(index, term, definitions[index])));

    return (
        <>
            <DynamicTable
                head={head}
                rows={rows}
                emptyView="No terms provided, please press Edit on the app and add terms in the Configuration box"
                isLoading={loadingState}
            />
            <ModalTransition>
                {inputIsOpen && (
                    <Modal onClose={closeInputModal}>
                        <Form onSubmit={handleSubmit(submitInput)}>
                            <ModalHeader>
                                <ModalTitle>{`Add definition for ${term}`}</ModalTitle>
                            </ModalHeader>
                            <ModalBody>
                                <Label labelFor={getFieldId("definition")}>{`Definition for ${term}`}</Label>
                                <TextArea name={"definition"}
                                          id={"definition"}
                                          defaultValue={definition}
                                          {...register("definition", {required: true})} />
                            </ModalBody>
                            <ModalFooter>
                                <Button appearance={"subtle"} onClick={closeInputModal}>Cancel</Button>
                                <Button appearance={"primary"} onClick={closeInputModal} type={"submit"}>Submit</Button>
                            </ModalFooter>
                        </Form>
                    </Modal>
                )}
            </ModalTransition>

            <ModalTransition>
                {deleteIsOpen && (
                    <Modal onClose={closeDeleteModal}>
                        <Form onSubmit={handleSubmit(submitDelete)}>
                            <ModalHeader>
                                <ModalTitle>{`Delete definition for ${term}`}</ModalTitle>
                            </ModalHeader>
                            <ModalFooter>
                                <Button appearance={"subtle"} onClick={closeDeleteModal}>Cancel</Button>
                                <Button appearance={"danger"} onClick={closeDeleteModal} type={"submit"}>Submit</Button>
                            </ModalFooter>
                        </Form>
                    </Modal>
                )}
            </ModalTransition>
        </>
    );
};
