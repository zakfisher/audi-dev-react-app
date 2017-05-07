import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import AEMPreview from '../../components/AEMPreview/AEMPreview';
import './DemoPage.sass';

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

  render() {
    let markup = <Loader />;

    if (this.props.user) {
      const { demoId } = this.props.match.params;
      markup = <AEMPreview name='DemoPage' componentId={demoId} />;
    }

    return markup;
  }
}

export default DemoPage;
