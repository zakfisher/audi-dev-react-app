import Hero from './Hero.js';
import React from 'react';

let example = (
    <div>
        <Hero source="/images/package.jpeg"/>
    </div>
)

let props = {
    source: {
        name: "source",
        type: "String",
        default: "",
        description: "Maps to the src property on an image"
    },
    id: {
        name: "id",
        type: "String",
        default: "",
        description: "sets id"
    },
    className: {
        name: "className",
        type: "String",
        default: "",
        description: "defines class string"
    }
}

let documentation =  (
`
    Hero uses an image tag, surrounded by a div with the className hero-div.
`
)

export let HeroDocs = {
    description: "A large hero image with default styling",
    example: example,
    props: props,
    documentation: documentation
}
