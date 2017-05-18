import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './Text.sass';

class Text extends Component {
  static propTypes = {
    text: PropTypes.string,
    size: PropTypes.oneOf(["small", "medium", "large", "huge", "crazy"])
  };

  static defaultProps = {
    text: 'Lorem ipsum dolor sit amet',
    size: "small"
  };

  render() {
    let className = 'Text ';
    if (this.props.size) 
      className += ` ${this.props.size}`;
    
    return (
      <div className={className}>{this.props.text}</div>
    );
  }
}

window.AudiReact = window.AudiReact || {};
export default window.AudiReact.Text = Text;
