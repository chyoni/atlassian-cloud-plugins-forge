// Import required components from the UI kit
import React from "react";
import ForgeReconciler, { Text, useSpaceProperty } from "@forge/react";

const App = () => {
    const [news] = useSpaceProperty("space-news", "No news currently.");

    return <Text>{news}</Text>;
};

ForgeReconciler.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
