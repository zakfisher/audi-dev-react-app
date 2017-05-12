import React, { Component } from 'react';
import GuideNoteItem from '../GuideNoteItem/GuideNoteItem';
import ONBOARDING_NOTE_IDS from '../../fixtures/onboarding';
import './GuideNotesList.sass';

class GuideNotesList extends Component {

  get notes() {
    const { dataReady, user, users, notes, match } = this.props;
    const { noteId } = match.params;
    this.state = { activeNoteId: noteId };
    if (!dataReady || !user) return null;

    // Filter onboarding notes
    return ONBOARDING_NOTE_IDS.map(noteId => {
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
