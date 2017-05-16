import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import './ComponentsPage.sass';
import COMPONENTS from '../../app/components';
import ComponentDoc from '../../components/ComponentDoc/ComponentDoc';
import Sidebar from '../../components/Sidebar/Sidebar';
import Searchbar from '../../components/Searchbar/Searchbar';

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
            <Sidebar>
              <div className='fixed-search'>
                <div>
                  <p>Search by component</p>
                  <Searchbar {...this.props} />
                </div>
              </div>
              <ul>
                {Object.keys(COMPONENTS).map((componentId, i) => (
                  <li key={i}>
                    <a href={`#${componentId}`}>{componentId}</a>
                  </li>
                ))}
              </ul>
            </Sidebar>
            <div id="ComponentsList">
              {Object.keys(COMPONENTS).map((componentId, i) => {
                return <ComponentDoc componentId={componentId} key={i}/>
              })}
            </div>
        </main>
      );
    }

    return markup;
  }
}

export default ComponentsPage;
