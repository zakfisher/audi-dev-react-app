import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Text.sass';

/**
Text Component
---
##### Default Props
```
children: 'hello world'
small:    true
medium:   false
large:    false
huge:     false
```
##### Example
```
<Text small>Small text</Text>
<Text medium>Medium text</Text>
<Text large>Large text</Text>
```
*/

// const Text = ({ children, small, medium, large, huge, crazy }) => {
//   let className = 'Text';
//   if (small) className += ' small';
//   if (medium) className += ' medium';
//   if (large) className += ' large';
//   if (huge) className += ' huge';
//   if (crazy) className += ' crazy';
//   return <div className={className}>{children || 'default text'}</div>;
// };

class Text extends Component {
  static propTypes = {
    children: PropTypes.string,
    small: PropTypes.bool,
    medium: PropTypes.bool,
    large: PropTypes.bool,
    huge: PropTypes.bool
  };

  static defaultProps = {
    children: 'hello world',
    small: true,
    medium: false,
    large: false,
    huge: false
  };

  render() {
    let className = 'Text';
    if (this.props.small) className += ' small';
    if (this.props.medium) className += ' medium';
    if (this.props.large) className += ' large';
    if (this.props.huge) className += ' huge';
    if (this.props.crazy) className += ' crazy';
    return (
      <div className={className} onClick={() => console.log('something magical just duh')}>{this.props.children}</div>
    );
  }
}

window.AudiReact = window.AudiReact || {};
export default window.AudiReact.Text = Text;
