
/**
  MyComponent Component Tests
*/

import React from 'react';
import ReactDOM from 'react-dom';
import MyComponent from './MyComponent';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MyComponent />, div);
});

it('should set innerHTML of MyComponent', () => (
  new Promise((resolve, reject) => {
    const div = document.createElement('div');
    ReactDOM.render(<MyComponent>sup</MyComponent>, div);
    if (div.querySelector('.MyComponent').innerHTML === 'sup') resolve();
    else reject();
  })
));

it('should fail', () => (
  new Promise((resolve, reject) => {
    reject();
  })
));
