import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './GuideNoteItem.sass';

const GuideNoteItem = ({ dataReady, noteId, notes, active }) => {
  if (!dataReady) return null;
  const note = notes[noteId];
  const activeClass = active ? 'active' : '';

  return (
    <Link className={`GuideNoteItem ${activeClass}`} to={`/onboarding/${noteId}`}>
      <div className="note-title">
        <h2>{note.title}</h2>
      </div>
    </Link>
  );
};

GuideNoteItem.propTypes = {
  active: PropTypes.bool
};

export default GuideNoteItem;
