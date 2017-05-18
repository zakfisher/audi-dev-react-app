import React from 'react';
import Text from './Text';
import Markdown from '../../../components/Markdown/Markdown';
// import TextComponentDemo from '../../../demos/TextComponentDemo/TextComponentDemo';

// Live demos to be shown in components#Text
const demos = (
  <div>
    <Markdown content={'The text below are demoss of `Text` components to be used in AEM.'} />
    <Text size="small" text="Small Text"/>
    <Text size="medium" text="Medium Text"/>
    <Text size="large" text="Large Text"/>
    <Text size="huge" text="Huge Text"/>
    <Text size="crazy" text="Crazy Text"/>
  </div>
);

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
const props = {
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

const documentation = (
  `
  The Text component takes text and outputs a div that contains the text.
  `
)

const TextDocs = {
  description: "This is the correct component to use across the application where you need to drop in an ordinary block of text",
  demos,
  props,
  documentation
}

export default TextDocs;
