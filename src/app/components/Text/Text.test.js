import React from 'react';
import ReactDOM from 'react-dom';
import Text from './Text';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Text />, div);
});

it('should set innerHTML of Text', () => (
  new Promise((resolve, reject) => {
    const div = document.createElement('div');
    ReactDOM.render(<Text>sup</Text>, div);
    if (div.querySelector('.Text').innerHTML === 'sup') resolve();
    else reject();
  })
));

it('should fail', () => (
  new Promise((resolve, reject) => {
    reject();
  })
));
