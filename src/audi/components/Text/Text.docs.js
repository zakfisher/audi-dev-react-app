import Text from './Text.js';
import React from 'react';

// Live example to be shown in components#Text
let example = (
    <div>
        <p>The text below are examples of <span className="pre">Text</span> components to be used in AEM.</p>
        <Text small children="Small Text"/>
        <br/>
        <Text medium children="Medium Text"/>
        <br/>
        <Text large children="Large Text"/>
        <br/>
        <Text huge children="Huge Text"/>
        <br/>
        <Text crazy children="Crazy Text"/>
    </div>
)

/**
 * Prop descriptions use the following syntax:
 * 
 * props = {
 *   propName: {
 *     name: "",
 *     type: "String" || "Array" || "Object" etc... ,
 *     "default": (not always necessary, but use an empty string if blank),
 *     "description": ""
 *   }
 * }
 */
let props = {
    children: {
        name: "children",
        type: "string",
        default: "",
        description: "Defines the text that should be displayed"
    }
}

let documentation = (
`
    We will need to nail down the markdown later

    function(){
        return "hi"
    }
`
)


export let TextDocs = {
    description: "This is the correct component to use across the application where you need to drop in an ordinary block of text",
    example: example,
    props: props,
    documentation: documentation
}