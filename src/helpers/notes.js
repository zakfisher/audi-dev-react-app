import Rx from 'rx-dom';
import actions from '../redux/actions';
import store from '../redux/store';
import Firebase from './firebase';

let ref = null;

const setNotes = snapshot => {
  const notes = snapshot.val() || {};
  store.dispatch(
    actions.setNotes(notes)
  );
};

const Notes = {};

Notes.once = callback => {
  Firebase.once('notes', snapshot => {
    setNotes(snapshot);
    callback(snapshot);
  });
};

Notes.sync = callback => {
  ref = Firebase.on('notes', snapshot => {
    setNotes(snapshot);
    callback(snapshot);
  });
};

Notes.cancel = () => {
  Firebase.off(ref, setNotes);
  store.dispatch(
    actions.setNotes({})
  );
};

Notes.getNotesByQuery = (users, notes, query) => {
  let filteredNotes = {...notes};
  let sortedNotes = [];

  // Filter notes by query (only if query exists)
  if (query.length > 0) {
    filteredNotes = {};
    Rx.Observable.from(Object.keys(notes))
    .map(noteId => ({ noteId, ...notes[noteId] }))
    .filter(item => {
      let matchFound = false;

      // Search by title or content
      ['title', 'content'].forEach(prop => {
        if (matchFound) return;
        if (item[prop]) {
          matchFound = item[prop].toString().toLowerCase().indexOf(query.toLowerCase()) > -1;
        }
      });

      // Search by author
      if (users[item.author].displayName.toLowerCase().indexOf(query.toLowerCase()) > -1) {
        matchFound = true;
      }

      return matchFound;
    })
    .subscribe(
      item => {
        const { noteId } = item;
        filteredNotes[noteId] = notes[noteId]
      }
    );
  }

  // Sort by timestamp
  Object.keys(filteredNotes)
  .sort((a, b) => filteredNotes[b].timestamp - filteredNotes[a].timestamp)
  .map(item => sortedNotes.push(item));

  return sortedNotes;
};

Notes.getOnboardingNotes = (users, notes, query) => {
  let noteList = [];
  noteList = Notes.getNotesByQuery(users, notes, query);

  let output = [];

  let onboardingIds = ["-KjUn4QNEFVn1T3LQWLT", "-Khy6LeYQvYqwzjPX7I9", "-Kj3xYw8qc8NlVR2Thz_", "-Kj3xfvE6b7-b6v4wo2L", "-KjdzdfhtPUEbJcHnH2q"];
  let filtered = noteList.filter(note=>{
    return onboardingIds.indexOf(note) > -1
  })

  onboardingIds.forEach(id=>{
    output.push(filtered[filtered.indexOf(id)]);
  })

  return output;

};

export default Notes;
