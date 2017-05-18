import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import Preview from '../../components/Preview/Preview';
import './ComponentPage.sass';

class ComponentPage extends Component {
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
      markup = <Preview name='ComponentPage' componentId={componentId} />;
    }

    return markup;
  }

}

export default ComponentPage;
