import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import AEMPreview from '../../components/AEMPreview/AEMPreview';
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
      const { componentId } = this.props.match.params;
      markup = <AEMPreview name='ComponentsPage' componentId={componentId || "Text"} />;
    }

    return markup;
  }

}

export default ComponentsPage;
