import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import Preview from '../../components/Preview/Preview';
import Sidebar from '../../components/Sidebar/Sidebar';
import MainContent from '../../components/MainContent/MainContent';
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
      markup = (
        <div className="DemoPage">
          <Sidebar />
          <MainContent>
            <Preview componentId={demoId} />;
          </MainContent>
        </div>
      );
    }

    return markup;
  }
}

export default DemoPage;
