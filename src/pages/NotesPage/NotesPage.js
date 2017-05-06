import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import Button from '../../components/Button/Button';
import Sidebar from '../../components/Sidebar/Sidebar';
import Searchbar from '../../components/Searchbar/Searchbar';
import MainContent from '../../components/MainContent/MainContent';
import NotesList from '../../components/NotesList/NotesList';
import './NotesPage.sass';

class NotesPage extends Component {
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
    const { user, history } = this.props;
    let markup = <Loader />;

    if (user) {
      markup = (
        <main className="NotesPage">

          <Sidebar>
            <div className='fixed-search'>
              <div>
                <p>Search by title, content, or author.</p>
                <Searchbar {...this.props} />
              </div>
            </div>
            {/*
              <p>Recently viewed</p>
              <RecentlyViewedNotes {...this.props} />
            */}
          </Sidebar>

          <MainContent>
            <div className="actions">
              <Button text="Add Note" icon="plus" onClick={() => history.push('/note/add')} />
            </div>
            <NotesList {...this.props} />
          </MainContent>

        </main>
      );
    }

    return markup;
  }

}

export default NotesPage;
