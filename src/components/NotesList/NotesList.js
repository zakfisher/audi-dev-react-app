import React, { Component } from 'react';
import Notes from '../../helpers/notes';
import NoteItem from '../NoteItem/NoteItem';
import './NotesList.sass';

class NotesList extends Component {

  get notes() {
    const { dataReady, user, users, notes, searchQuery } = this.props;
    if (!dataReady || !user) return null;

    // Filter notes by query
    const filteredNotes = Notes.filterNotesByQuery(notes, searchQuery);

    // Sort notes by most recent first
    return Object.keys(filteredNotes)
      .sort((a, b) => notes[b].timestamp - notes[a].timestamp)
      .map(noteId => {
        const props = { dataReady, noteId, user, users, notes };
        return <NoteItem key={noteId} {...props} />;
      });
  }

  render() {
    return <section className="NotesList row">{this.notes}</section>;
  }
}

export default NotesList;
