import React, { Component } from 'react';
import { Route, Redirect } from 'react-router';
import Notes from '../../helpers/notes';
import GuideNoteItem from '../GuideNoteItem/GuideNoteItem';
import onboardingIds from '../../fixtures/onboarding';
import './GuideNotesList.sass';

class GuideNotesList extends Component {

  get notes() {
    const { dataReady, user, users, notes, searchQuery, match } = this.props;
    const { noteId } = match.params;
    this.state = { activeNoteId: noteId };
    if (!dataReady || !user) return null;

    // To be updated once database lookup is changed, static definition for now
    const filteredNotes = onboardingIds;

    return filteredNotes.map((noteId, index) => {
      const props = { dataReady, noteId, user, users, notes };
      return <GuideNoteItem key={noteId} position={index+1} active={this.state.activeNoteId === noteId} {...props} />;
    });
  }

  componentDidMount() {
    const activeNoteId = this.props.match.params.noteId;
    this.setState({ activeNoteId });
  }

  render() {
    if (!this.props.match.params.noteId){
      return <Redirect to={`/onboarding/${onboardingIds[0]}`}/>
    }

    console.log(onboardingIds);
    return <section className="GuideNotesList">{this.notes}</section>;
  }
}

export default GuideNotesList;
