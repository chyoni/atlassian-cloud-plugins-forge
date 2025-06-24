import React from "react";
// Import required components from the UI kit
import ForgeReconciler, {Button, Form, TextArea, useForm, useSpaceProperty,} from "@forge/react";

const App = () => {
    const [news, setNews] = useSpaceProperty("space-news", "No news currently.");
    const {register, handleSubmit} = useForm({
        defaultValues: {
            news,
        },
    });

    const onSubmit = async ({news}) => {
        await setNews(news);
    };

    return (
        <Form onSubmit={handleSubmit(onSubmit)}>
            <TextArea {...register("news")} />
            <Button appearance={"primary"} type="submit">Submit</Button>
        </Form>
    );
};

ForgeReconciler.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);
