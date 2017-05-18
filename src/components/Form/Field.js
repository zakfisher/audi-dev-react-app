import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {validate} from '../../helpers/validator';
import Input from './Input';

/* eslint-disable no-extend-native */
String.prototype.ucFirst = function () {
  return this[0].toUpperCase() + this
    .substr(1)
    .toLowerCase();
};
/* eslint-enable no-extend-native */

class Field extends Component {

  constructor() {
    super();

    this.state = {
      error: null,
      value: ''
    };

    this.focus = this
      .focus
      .bind(this);
    this.blur = this
      .blur
      .bind(this);
    this.onChange = this
      .onChange
      .bind(this);
  }

  static propTypes = {
    required: PropTypes.bool,
    form: PropTypes.object.isRequired,
    input: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired
  };

  clearErrors() {
    const {form, index} = this.props;
    if (!this.state.error && !form.state.error) {
      return;
    }

    // Clear form and field errors
    const error = null;
    const {fields} = form;
    fields[index].error = null;
    this.setState({error});
    form.setState({error, fields});
  }

  blur(e) {
    this.validate(e);
  }

  focus() {
    this.clearErrors();
  }

  onChange(e) {
    const {value} = e.target;
    this.setValue(value);
    this.clearErrors();
  }

  validate(e) {
    const {value} = e.target;
    const {required, input, form, index} = this.props;
    const {fields} = form.state;
    const {type, name} = input;
    let error = null;

    // Check if required
    if (required && !value.length) {
      error = `${name.ucFirst()} is required.`;
    }

    // Check type validation
    const isValid = validate(value, type);
    if (!error && !isValid) {
      error = `Please enter a valid ${name}.`;
    }

    // Update field state with error
    this.setState({error});

    // Update form state with error
    fields[index].error = error;
    form.setState({fields});
  }

  updateValue() {
    if (this.state.value !== this.props.value) {
      this.setValue(this.props.value);
    }
  }

  setValue(value) {
    const {form, index, onChange} = this.props;
    const {fields} = form.state;

    // Update form state with value
    fields[index].value = value;
    form.setState({fields});
    this.setState({value});

    if (onChange) {
      onChange(value);
    }
  }

  componentDidMount() {
    this.updateValue();
  }

  componentDidUpdate() {
    this.updateValue();
  }

  render() {
    const {grid, input, form, onClick} = this.props;
    const {error} = this.state;
    let markup = null;

    if (input.type !== 'hidden') {

      markup = (
        <fieldset className={grid}>
          {input.label ? <label>{input.label}</label> : null}
          <Input
            {...input}
            form={form}
            value={this.state.value}
            onFocus={this.focus}
            onBlur={this.blur}
            onChange={this.onChange}
            onClick={onClick}/> {error ? <p className="error">{error}</p> : null}
        </fieldset>
      );
    }

    return markup;
  }
}

export default Field;
