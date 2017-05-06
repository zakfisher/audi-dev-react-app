import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import './DemoPage.sass';
import DEMOS from '../../demos';

class DemoPage extends Component {
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

  get demo() {
    const { demoId } = this.props.match.params;
    const DemoComponent = DEMOS[demoId] || null;
    return DemoComponent ? <DemoComponent /> : 'No demo found';
  }

  render() {
    let markup = <Loader />;

    if (this.props.user) {
      markup = (
        <main className="DemoPage">
          {this.demo}
        </main>
      );
    }

    return markup;
  }
}

export default DemoPage;
