import Text from './Text.js';
import React from 'react';

let example = (
    <div>
        <p>The text below are examples of <pre>Text</pre> components to be used in AEM.</p>
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


export let TextDocs = {
    description: "This is the correct component to use across the application where you need to drop in an ordinary block of text",
    example: example
}