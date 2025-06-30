import {Label, Textfield} from "@forge/react";
import React from "react";

export const defaultConfig = {
    name: "Unnamed Pet",
    age: "0"
}

const Config = () => {
    return (
        <>
            <Label labelFor={"pet-name"}>Pet name</Label>
            <Textfield id={"pet-name"}
                       name={"name"}
                       defaultValue={defaultConfig.name}/>

            <Label labelFor={"pet-age"}>Pet age</Label>
            <Textfield id={"pet-age"}
                       name={"age"}
                       defaultValue={defaultConfig.age}/>
        </>
    );
};

export default Config;