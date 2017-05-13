import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import './ComponentsPage.sass';
import COMPONENTS from '../../app/components';

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
          <ul>
            {Object.keys(COMPONENTS).map((componentId, i) => (
              <li key={i}>
                <Link to={`/component/${componentId}`}>{componentId}</Link>
              </li>
            ))}
          </ul>
        </main>
      );
    }

    return markup;
  }
}

export default ComponentsPage;
