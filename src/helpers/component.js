'use strict';

let COMPONENT = {};

COMPONENT.docs = name => `
/**
  ${name} Component Documentation
*/

import React from 'react';
import ${name} from './${name}.js';

let description = 'This is the correct component to use across the application where you need to drop in an ordinary block of text';

// Live example to be shown in components#${name}
let example = (
  <div>
    <p>First component variation</p>
    <${name} prop1={true} />

    <p>Second component variation</p>
    <${name} prop1={false} />
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

const ${name}Docs = {
  description,
  example,
  props,
  documentation
};

export default ${name}Docs;
`;

COMPONENT.main = name => `
/**
  ${name} Component
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './${name}.sass';

const GREETINGS = [
  'Hello, My name is ${name}.',
  "What's happening? #${name}",
  'Yolo and stuff, ${name}'
];

class ${name} extends Component {
  constructor() {
    super();

    this.state = {
      greetingIndex: 0
    };

    this.setGreeting = this.setGreeting.bind(this);
  }

  static propTypes = {
    color: PropTypes.string
  };

  static defaultProps = {
    color: '#ee528f'
  };

  setGreeting() {
    let newIndex = this.state.greetingIndex + 1;
    if (newIndex === GREETINGS.length) newIndex = 0;
    this.setState({ greetingIndex: newIndex });
  }

  render() {
    const style = { color: this.props.color };
    return (
      <div className={${name}}
        style={style}
        onClick={this.setGreeting}>
        {GREETINGS[this.state.greetingIndex]}
      </div>
    );
  }
}

window.AudiReact = window.AudiReact || {};
export default window.AudiReact.${name} = ${name};
`;

COMPONENT.sass = name => `
// ${name} Component Styles

@import '../../styles/core'

.${name}
  font-size: 3rem
`;

COMPONENT.test = name => `
/**
  ${name} Component Tests
*/

import React from 'react';
import ReactDOM from 'react-dom';
import ${name} from './${name}';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<${name} />, div);
});
`;

module.exports = COMPONENT;
