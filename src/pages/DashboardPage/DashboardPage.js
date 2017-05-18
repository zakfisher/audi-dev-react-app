import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import './DashboardPage.sass';

class DashboardPage extends Component {
  redirect() {
    const {dataReady, user, history} = this.props;
    if (!dataReady) {
      return;
    }
    if (!user) {
      history.push('/login');
    }
  }

  componentDidMount() {
    this.redirect();
  }

  componentDidUpdate() {
    this.redirect();
  }

  render() {
    let markup = <Loader/>;

    if (this.props.user) {
      markup = (
        <main className="DashboardPage">
          <ul>
            <li>
              <Link to="/components">Components</Link>
            </li>
            <li>
              <Link to="/notes">Notes</Link>
            </li>
          </ul>
        </main>
      );
    }

    return markup;
  }

}

export default DashboardPage;
