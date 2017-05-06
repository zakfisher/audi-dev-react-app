import Form from '../Form/Form';
import endpoint from '../../helpers/endpoint';
import Firebase from '../../helpers/firebase';
// import './LoginForm.sass';

class LoginForm extends Form {

  componentDidMount() {
    this.setState({
      name: 'LoginForm',
      url: endpoint('submitLoginForm'),
      fields: this.fields,
      encrypt: true,
      onSuccess: this.onSuccess.bind(this),
      onError: this.onError.bind(this)
    })
  }

  get fields() {
    const password = {
      grid: 'col-12',
      required: true,
      value: '',
      input: {
        name: 'password',
        type: 'password',
        placeholder: 'Password',
        maxLength: 100,
        submitOnEnter: true
      }
    };

    const submit = {
      grid: 'col-12',
      input: {
        text: 'Submit',
        type: 'submit'
      }
    };

    return [
      password,
      submit
    ];
  }

  onSuccess(xhr) {
    // console.log('success', xhr);
    Firebase.githubLogin();
  }

  onError(err) {
    // console.warn('error', err);
  }
}

export default LoginForm;
