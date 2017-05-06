import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import Button from '../Button/Button';
import Uploader from '../Uploader/Uploader';

const Input = props => {
  let input = {...props};
  const { submitOnEnter, disabled, type, form, text, name, onClick } = props;

  let onKeyDown = null;
  if (submitOnEnter) {
    onKeyDown = e => {
      if (e.keyCode === 13) form.submit(e);
    };
  }
  delete input.submitOnEnter;

  let markup = null;

  switch (type) {
    case 'email':
    case 'text':
    case 'password':
      markup = <input {...input} onKeyDown={onKeyDown} />;
    break;
    case 'textarea':
      markup = <textarea {...input} />;
    break;
    case 'file':
      markup = <Uploader />;
    break;
    case 'submit':
      markup = <Button name="submit" onClick={form.submit} text={text} disabled={disabled} />;
    break;
    case 'button':
      markup = <Button onClick={e => { e.preventDefault(); onClick(); }} text={text} disabled={disabled} />;
    break;
    case 'link':
      markup = <Link to='#' className={name} onClick={() => onClick(form)}>{text}</Link>;
    break;
    default:
    break;
  }

  return markup;
};

Input.propTypes = {
  form: PropTypes.object,
  submitOnEnter: PropTypes.bool,
  disabled: PropTypes.bool,
  text: PropTypes.string,
  type: PropTypes.string
};

export default Input;
