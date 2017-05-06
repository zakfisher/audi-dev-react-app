import React, { Component } from 'react';
import Notes from '../../helpers/notes';
import GuideNoteItem from '../GuideNoteItem/GuideNoteItem';
import './GuideNotesList.sass';

class GuideNotesList extends Component {

  get notes() {
    const { dataReady, user, users, notes, searchQuery, match } = this.props;
    const { noteId } = match.params;
    this.state = { activeNoteId: noteId };
    if (!dataReady || !user) return null;

    // Filter notes by query
    const filteredNotes = Notes.getNotesByQuery(users, notes, searchQuery);

    return filteredNotes.map(noteId => {
      const props = { dataReady, noteId, user, users, notes };
      return <GuideNoteItem key={noteId} active={this.state.activeNoteId === noteId} {...props} />;
    });
  }

  componentDidMount() {
    const activeNoteId = this.props.match.params.noteId;
    this.setState({ activeNoteId });
  }

  render() {
    return <section className="GuideNotesList">{this.notes}</section>;
  }
}

export default GuideNotesList;
