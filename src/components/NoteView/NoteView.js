import React from 'react';
import moment from 'moment';
import Markdown from '../Markdown/Markdown';
import NoteLink from '../NoteLink/NoteLink';
import Button from '../Button/Button';
import './NoteView.sass';

const getTime = timestamp => moment(timestamp).format('MMMM D, YYYY @ h:mma');

const NoteView = props => {
  const { dataReady, notes, match, users } = props;
  if (!dataReady) return null;
  const { noteId } = match.params;
  const note = notes[noteId];
  let markdown = null;

  if (note) {
    const author = users[note.author];
    const editor = users[note.editor];

    markdown = (
      <article className="NoteView">
        <div className="wrap">

          <div className="links">
            <NoteLink note={note} action="edit">
              <Button icon="pencil" text="Edit Note"/>
            </NoteLink>
            <div className="updated">
              <p>Last updated on {getTime(note.timestamp)}</p>
            </div>
          </div>

          <div className="title">
            <h1>{note.title}</h1>
          </div>

          <div className="content">
            <Markdown content={note.content} />
          </div>

          <div className="users row">
            <div className="author col-12 tab-6">
              <div className="user">
                <img src={author.photoURL} alt="" />
                <div className="info">
                  <p>Created by</p>
                  <h2>{author.displayName}</h2>
                </div>
              </div>
            </div>
            <div className="editor col-12 tab-6">
              <div className="user">
                <img src={editor.photoURL} alt="" />
                <div className="info">
                  <p>Last edited by</p>
                  <h2>{editor.displayName}</h2>
                </div>
              </div>
            </div>
          </div>

        </div>
      </article>
    );
  }

  return markdown;
};

export default NoteView;
