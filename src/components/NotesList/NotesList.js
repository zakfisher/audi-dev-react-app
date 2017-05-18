import React, {Component} from 'react';
import Notes from '../../helpers/notes';
import NoteItem from '../NoteItem/NoteItem';
import './NotesList.sass';

class NotesList extends Component {

  get notes() {
    const {dataReady, user, users, notes, searchQuery} = this.props;
    if (!dataReady || !user) {
      return null;
    }

    // Filter notes by query
    const filteredNotes = Notes.getNotesByQuery(users, notes, searchQuery);

    return filteredNotes.map(noteId => {
      const props = {
        dataReady,
        noteId,
        user,
        users,
        notes
      };
      return <NoteItem key={noteId} {...props}/>;
    });
  }

  render() {
    return <section className="NotesList row">{this.notes}</section>;
  }
}

export default NotesList;
