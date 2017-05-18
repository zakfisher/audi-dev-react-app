import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import './DemosPage.sass';
import DEMOS from '../../app/demos';

class DemosPage extends Component {
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
        <main className="DemosPage">
          <ul>
            {Object
              .keys(DEMOS)
              .map((demoId, i) => (
                <li key={i}>
                  <Link to={`/demo/${demoId}`}>{demoId}</Link>
                </li>
              ))}
          </ul>
        </main>
      );
    }

    return markup;
  }
}

export default DemosPage;
