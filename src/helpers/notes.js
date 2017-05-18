import Rx from 'rx-dom';
import actions from '../redux/actions';
import store from '../redux/store';
import Firebase from './firebase';

let ref = null;

const setNotes = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes));
  store.dispatch(actions.setNotes(notes));
};

const Notes = {};

Notes.once = callback => {
  ref = Firebase.once('notes', snapshot => {
    const notes = snapshot.val();
    setNotes(notes);
    callback(notes);
  });
};

Notes.sync = callback => {

  // Set notes from localStorage
  const cache = JSON.parse(localStorage.getItem('notes'));
  if (cache) {
    setNotes(cache);
    if (callback) {
      callback(cache);
    }
  }

  // Sync with firebase
  ref = Firebase.on('notes', snapshot => {
    const notes = snapshot.val();
    setNotes(notes);
    if (callback) {
      callback(notes);
    }
  });
};

Notes.cancel = () => {
  Firebase.off(ref, setNotes);
  store.dispatch(actions.setNotes({}));
};

Notes.getNotesByQuery = (users, notes, query) => {
  let filteredNotes = {
    ...notes
  };
  let sortedNotes = [];

  // Filter notes by query (only if query exists)
  if (query.length > 0) {
    filteredNotes = {};
    Rx
      .Observable
      .from(Object.keys(notes))
      .map(noteId => ({
        noteId,
        ...notes[noteId]
      }))
      .filter(item => {
        let matchFound = false;

        // Search by title or content
        ['title', 'content'].forEach(prop => {
          if (matchFound) {
            return;
          }
          if (item[prop]) {
            matchFound = item[prop]
              .toString()
              .toLowerCase()
              .indexOf(query.toLowerCase()) > -1;
          }
        });

        // Search by author
        if (users[item.author].displayName.toLowerCase().indexOf(query.toLowerCase()) > -1) {
          matchFound = true;
        }

        return matchFound;
      })
      .subscribe(item => {
        const {noteId} = item;
        filteredNotes[noteId] = notes[noteId];
      });
  }

  // Sort by timestamp
  Object
    .keys(filteredNotes)
    .sort((a, b) => filteredNotes[b].timestamp - filteredNotes[a].timestamp)
    .map(item => sortedNotes.push(item));

  return sortedNotes;
};

export default Notes;
