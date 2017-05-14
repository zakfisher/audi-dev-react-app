
/**
  MyComponent Component Documentation
*/

import React from 'react';
import MyComponent from './MyComponent.js';

let description = 'This is the correct component to use across the application where you need to drop in an ordinary block of text';

// Live example to be shown in components#MyComponent
let example = (
  <div>
    <p>First component variation</p>
    <MyComponent prop1={true} />

    <p>Second component variation</p>
    <MyComponent prop1={false} />
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
let props = {
  children: {
    name: "children",
    type: "string",
    default: "",
    description: "Defines the text that should be displayed"
  }
};

let documentation = ('
  # Something Special..
');

const MyComponentDocs = {
  description,
  example,
  props,
  documentation
};

export default MyComponentDocs;
