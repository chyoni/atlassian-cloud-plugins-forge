import React, { useEffect, useState } from 'react';
import ForgeReconciler, {Strong, Text, useProductContext} from '@forge/react';
import { invoke } from '@forge/bridge';

const App = () => {
    const context = useProductContext();
    const selectedText = context?.extension.selectedText;

    return (
        <Text>
            <Strong>Selected text</Strong>
            <Text>{selectedText}</Text>
        </Text>
    )
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
