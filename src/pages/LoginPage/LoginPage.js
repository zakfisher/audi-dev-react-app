import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import LoginForm from '../../components/LoginForm/LoginForm';
import SITE_NAME from '../../fixtures/site-name';
import './LoginPage.sass';

class LoginPage extends Component {
  redirect() {
    const { dataReady, user, history } = this.props;
    if (!dataReady) return;
    if (user) history.push('/notes');
  }

  componentDidMount() {
    this.redirect();
  }

  componentDidUpdate() {
    this.redirect();
  }

  render() {
    let markup = <Loader />;

    if (this.props.dataReady) {
      markup = (
        <main className="LoginPage">
          <div className="wrapper">
            <h1>{SITE_NAME}</h1>
            <LoginForm {...this.props} />
          </div>
        </main>
      );
    }

    return markup;
  }

}

export default LoginPage;
