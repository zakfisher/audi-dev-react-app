import React, { Component } from 'react';
import Rx from 'rx-dom';
import sha1 from 'sha1';
import Loader from '../Loader/Loader';
import Field from './Field';
import './Form.sass';

class Form extends Component {

  constructor() {
    super();

    this.state = {
      loading: null,
      error: null,
      success: null,
      name: '',
      url: '',
      fields: [],
      encrypt: false,
      onSubmit: null,
      onSuccess: null,
      onError: null,
      successMsg: '',
      errorMsg: ''
    };

    this.submit = this.submit.bind(this);
    this.onXhrSuccess = this.onXhrSuccess.bind(this);
    this.onXhrError = this.onXhrError.bind(this);
  }

  submit(e) {
    e.preventDefault();
    let error = null;
    let POST = {};
    const { fields, encrypt, onSubmit } = this.state;

    // Check for errors and set POST values
    fields.forEach(field => {
      const { input, required, value } = field;
      const { name } = input;
      if (error) return;
      if (field.error) {
        error = 'Please fix form errors.';
        return;
      }
      if (required && !value) {
        error = 'Please fill out required fields.';
        return;
      }
      if (name) {
        POST[name] = encrypt ? sha1(value) : value;
      }
    });

    // Display error
    this.setState({ error });

    // Don't submit if error
    if (error) return;

    // Issue xhr if no custom submission handler
    onSubmit ? onSubmit(POST) : this.issueXHR(POST);
  }

  issueXHR(POST) {
    // Show loading
    this.setState({ loading: true });

    // Disable form fields
    this.disableFields();

    // Issue XHR
    const { url } = this.state;
    const body = JSON.stringify(POST);
    Rx.DOM.post({ url, body }).subscribe(
      this.onXhrSuccess,
      this.onXhrError
    );
  }

  onXhrSuccess(xhr) {
    const { successMsg, onSuccess } = this.state;
    this.setState({
      loading: false,
      success: JSON.parse(xhr.response).success || successMsg
    });
    this.enableFields();
    if (onSuccess) onSuccess(xhr);
  }

  onXhrError(err) {
    const { errorMsg, onError } = this.state;
    this.setState({
      loading: false,
      error: JSON.parse(err.xhr.responseText).error || errorMsg
    });
    this.enableFields();
    if (onError) onError(err);
  }

  toggleFields(disable) {
    const { fields } = this.state;
    const newFields = fields.map(field => {
      const newField = field;
      newField.input.disabled = disable;
      return newField;
    });
    this.setState({ fields: newFields });
  }

  disableFields() {
    this.toggleFields(true);
  }

  enableFields() {
    this.toggleFields(false);
  }

  updateFields(fields = [], force = false) {
    if (!force) {
      // Escape if already set or not ready yet
      if (this.fieldsSet || !fields.length) return;
    }
    this.setState({ fields });
    this.fieldsSet = true;
  }

  componentDidUpdate() {
    this.updateFields(this.fields);
  }

  componentDidMount() {
    this.updateFields(this.fields);
  }

  render() {
    const { loading, name, fields, success, error } = this.state;
    if (!fields) return null;
    return (
      <form className={`${name} row`} action="#" method="POST" onSubmit={this.submit}>
        {loading ? <Loader /> : null }
        {fields.map((field, i) => (
          <Field {...field} key={i} form={this} index={i} />
        ))}
        {success ? <p className="success">{success}</p> : null}
        {error ? <p className="error">{error}</p> : null}
      </form>
    );
  }
}

export default Form;
