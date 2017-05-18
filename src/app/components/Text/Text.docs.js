import Text from './Text.js';
import React from 'react';

// Live example to be shown in components#Text
let example = (
    <div>
        <p>The text below are examples of
            <span className="pre">Text</span>
            components to be used in AEM.</p>
        <Text size="small" text="Small Text"/>
        <Text size="medium" text="Medium Text"/>
        <Text size="large" text="Large Text"/>
        <Text size="huge" text="Huge Text"/>
        <Text size="crazy" text="Crazy Text"/>
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
    text: {
        name: "text",
        type: "String",
        default: `""`,
        description: "Defines the text that should be displayed"
    },
    size: {
        name: "size",
        type: `String: oneOf ["small", "medium", "large", "huge", "crazy"]`,
        default: '"small"',
        description: `Adds a class to determine what size to render`
    }
}

let documentation = (`
    The Text component takes text and outputs a div that contains the text. 
`)

let TextDocs = {
    description: "This is the correct component to use across the application where you need to dr" +
            "op in an ordinary block of text",
    example: example,
    props: props,
    documentation: documentation
}

export default TextDocs;