
/**
  Zak Component Tests
*/

import React from 'react';
import ReactDOM from 'react-dom';
import Zak from './Zak';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Zak />, div);
});

