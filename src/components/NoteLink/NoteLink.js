import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import Note from '../../helpers/note';

const NoteLink = ({note, action, children}) => {
  const className = `NoteLink ${action}`;
  let onClick = null;
  let to = null;

  switch (action) {
    case 'view':
      to = `/note/${note.noteId}`;
      break;

    case 'edit':
      to = `/note/${note.noteId}/edit`;
      break;

    case 'delete':
      onClick = () => Note.delete(note);
      to = `/notes`;
      break;

    default:
  }

  return (
    <Link className={className} to={to} onClick={onClick}>
      {children}
    </Link>
  );
};

NoteLink.propTypes = {
  action: PropTypes.string.isRequired,
  note: PropTypes.object.isRequired
};

export default NoteLink;
