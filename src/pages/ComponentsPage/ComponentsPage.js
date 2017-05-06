import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import './ComponentsPage.sass';

class ComponentsPage extends Component {
  redirect() {
    const { dataReady, user, history } = this.props;
    if (!dataReady) return;
    if (!user) history.push('/login');
  }

  componentDidMount() {
    this.redirect();
  }

  componentDidUpdate() {
    this.redirect();
  }

  render() {
    let markup = <Loader />;

    if (this.props.user) {
      markup = (
        <main className="ComponentsPage">
          Components!
        </main>
      );
    }

    return markup;
  }

}

export default ComponentsPage;
