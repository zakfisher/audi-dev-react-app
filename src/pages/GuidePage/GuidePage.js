import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
// import Button from '../../components/Button/Button';
import GuideNotesList from '../../components/GuideNotesList/GuideNotesList';
import NoteView from '../../components/NoteView/NoteView';
import Searchbar from '../../components/Searchbar/Searchbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import MainContent from '../../components/MainContent/MainContent';
import './GuidePage.sass';

class GuidePage extends Component {
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
    const { user } = this.props;
    let markup = <Loader />;

    if (user) {
      markup = (
        <main className="GuidePage">

          <Sidebar>
            <div className='fixed-search'>
              <div>
                <p>Search by title, content, or author.</p>
                <Searchbar {...this.props} />
              </div>
            </div>
            <GuideNotesList {...this.props} />
          </Sidebar>

          <MainContent>
            <NoteView {...this.props} />
            <div id="guide-content">
              <h1>Welcome to AKQA!</h1>
              <p>This guide (hopefully) will walk you through the steps that you need to get started developing for Audi.</p>
              <p>Please walk through the links on your left. Feel free to reach out on Slack if you have any questions!</p>
            </div>
          </MainContent>

        </main>
      );
    }

    return markup;
  }

}

export default GuidePage;
