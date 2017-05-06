import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import './ComponentPage.sass';
import COMPONENTS from '../../audi/components';

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

  get component() {
    const { componentId } = this.props.match.params;
    const ComponentExample = COMPONENTS[componentId] || null;
    return ComponentExample ? <ComponentExample /> : 'No component found';
  }

  render() {
    let markup = <Loader />;

    if (this.props.user) {
      markup = (
        <main className="ComponentPage">
          {this.component}
        </main>
      );
    }

    return markup;
  }

}

export default ComponentPage;
