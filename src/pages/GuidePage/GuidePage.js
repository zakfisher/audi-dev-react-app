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
          </MainContent>

        </main>
      );
    }

    return markup;
  }

}

export default GuidePage;
