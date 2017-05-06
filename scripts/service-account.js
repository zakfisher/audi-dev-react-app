const admin = require('firebase-admin');
const serviceAccount = require('../Audi FE Tools-0b2e0ab43b1d.json');

admin.initializeApp({
  databaseURL: "https://audi-fe-notes.firebaseio.com",
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.database();

// const formatOldData = snapshot => {
//   const data = snapshot.val();
//   const { notes, users } = data;

//   // Clone data
//   // db.ref('/oldNotes').set(notes);
//   // db.ref('/oldUsers').set(users);

//   let newNotes = {};
//   let newUsers = users;

//   // Transform all data from notes
//   Object.keys(notes).map(noteId => {
//     /*
//     Old note model
//     {
//       author,
//       content,
//       email,
//       noteId,
//       photoURL,
//       timestamp,
//       title
//     }
//     */
//     let {
//       author,
//       content,
//       email,
//       photoURL,
//       timestamp,
//       title
//     } = notes[noteId];

//     /*
//     New user model
//     {
//       uid,
//       displayName,
//       email,
//       photoURL
//     };
//     */
//     let displayName = author;
//     if (email === 'kyle.beikirch@gmail.com' || displayName === 'Kyle Beikirch') author = '3okBZ5pwD7PChf9lxnLpW9ey9UC3';
//     if (email === 'nreddy216@gmail.com' || displayName === 'Nidhi Reddy') author = '5swB25xArMhIjibznj3vKX62M8W2';
//     if (email === 'zak.fisher@gmail.com' || displayName === 'Zak Fisher') author = '4MPrUbSCfiZUEFLHeyafchLESFp2';
//     if (email === 'reedsilverstein@gmail.com') author = 'fOMw2lDpA3hlXOBYY5JmfNyNJqi1';
//     author = author || 'unknown';
//     newUsers[author] = users[author] || {
//       uid: author,
//       displayName,
//       email: email || 'unknown',
//       photoURL: photoURL || 'unknown'
//     };

//     /*
//     New note model
//     {
//       author,
//       content,
//       editor,
//       noteId,
//       timestamp,
//       title
//     }
//     */
//     newNotes[noteId] = {
//       author: author,
//       content,
//       editor: author,
//       noteId,
//       timestamp,
//       title: content.split('\n')[0]
//     };
//   });

//   // Set new data
//   // db.ref('/notes').set(newNotes, err => {
//   //   db.ref('/users').set(newUsers, err => {
//   //     process.exit();
//   //   });
//   // });
// };

// const addNotesToUsers = snapshot => {
//   const data = snapshot.val();
//   const { notes, users } = data;
//   const userNoteMap = {};
//   Object.keys(notes).map(noteId => {
//     const note = notes[noteId];
//     const { author } = note;
//     userNoteMap[author] = userNoteMap[author] || {}
//     userNoteMap[author][noteId] = true;
//   });
//   // console.log('userNoteMap', userNoteMap)

//   const promises = Object.keys(userNoteMap).map(userId => {
//     return new Promise((resolve, reject) => {
//       const notes = userNoteMap[userId];
//       console.log('set notes for user', userId);
//       db.ref(`users/${userId}/notes`).set(notes, resolve);
//     });
//   });

//   Promise.all(promises).then(process.exit);
// };

// // db.ref('/').once('value').then(addNotesToUsers);
