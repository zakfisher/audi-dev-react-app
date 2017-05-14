
/**
  Zak Component
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './Zak.sass';

const GREETINGS = [
  'Hello, My name is Zak.',
  "What's happening? #Zak",
  'Yolo and stuff, Zak'
];

class Zak extends Component {
  constructor() {
    super();

    this.state = {
      greetingIndex: 0
    };

    this.setGreeting = this.setGreeting.bind(this);
  }

  static propTypes = {
    color: PropTypes.string,
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
      <div className={Zak}
        style={style}
        onClick={this.setGreeting}>
        {GREETINGS[this.state.greetingIndex]}
      </div>
    );
  }
}

window.AudiReact = window.AudiReact || {};
export default window.AudiReact.Zak = Zak;
