import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './NoteItem.sass';

const getTime = timestamp => moment(timestamp).format('MMMM D, YYYY');

const NoteItem = ({ dataReady, noteId, user, users, notes }) => {
  if (!dataReady) return null;
  const note = notes[noteId];
  const author = users[note.author];
  const editor = users[note.editor];

  return (
    <article className="NoteItem col-12 lap-6 desk-4">
      <Link to={`/note/${noteId}`}>
        <img src={author.photoURL} alt="" />
        <div className="note-info">
          <h2>{note.title}</h2>
          <p>Edited {getTime(note.timestamp)} by {editor.displayName}</p>
        </div>
      </Link>
    </article>
  );
};

export default NoteItem;
