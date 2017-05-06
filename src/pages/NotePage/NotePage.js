import React, { Component } from 'react';
import Loader from '../../components/Loader/Loader';
import NoteEditor from '../../components/NoteEditor/NoteEditor';
import NoteView from '../../components/NoteView/NoteView';
import './NotePage.sass';

class NotePage extends Component {
  redirect() {
    const { dataReady, user, notes, history, match } = this.props;
    if (!dataReady) return;
    const { noteId } = match.params;
    const note = notes[noteId] || null;

    // Redirect to login if no user
    if (dataReady && !user) {
      history.push('/login');
      return;
    }

    // Redirect to add note form if edit note not found
    if (this.showForm && !note && noteId !== 'add') {
      history.push('/note/add');
      return;
    }

    // Redirect to notes list if view note not found
    if (!this.showForm && !note) {
      history.push('/notes');
    }
  }

  componentDidMount() {
    this.redirect();
  }

  componentDidUpdate() {
    this.redirect();
  }

  render() {
    let markup = <Loader />;

    const { user, match } = this.props;
    const { noteId, edit } = match.params;
    this.showForm = (edit === 'edit' || noteId === 'add');
    const ViewComponent = this.showForm ? NoteEditor : NoteView;

    if (user) {
      markup = (
        <main className="NotePage">
          <ViewComponent {...this.props} />
        </main>
      );
    }

    return markup;
  }

}

export default NotePage;
