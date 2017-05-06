import React from 'react';
import PropTypes from 'prop-types';
import SVG from '../SVG/SVG';
import pencilSVG from '../../svg/pencil.svg';
import plusSVG from '../../svg/plus.svg';
import './Button.sass';

const ICONS = {
  pencil: pencilSVG,
  plus: plusSVG
};

const Button = ({ name, disabled, text, icon, onClick, children }) => {
  let className = 'Button';
  className += name ? ` ${name}` : '';
  className += icon ? ' icon' : '';
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}>
      {icon ? <SVG file={ICONS[icon]} name={`${icon}SVG`}/> : null}
      {text}
      {children}
    </button>
  );
};

Button.propTypes = {
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string.isRequired,
  icon: PropTypes.string
};

export default Button;
