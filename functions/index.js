const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sha1 = require('sha1');
const cors = require('cors')({ origin: true });

// Connect to firebase
admin.initializeApp(functions.config().firebase);

// Start writing Firebase Functions
// https://firebase.google.com/functions/write-firebase-functions

const PASSWORD = sha1('nothing');

const validatePOST = (POST, keys) => {
  let error = null;
  keys.map(key => {
    if (error) return;
    error = POST[key] ? null : `Missing ${key}`;
  });
  return error;
};

exports.submitLoginForm = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const POST = JSON.parse(req.body);
    const keys = ['password'];

    // Validate POST data
    let error = validatePOST(POST, keys);

    // Validate password
    if (!error) {
      const { password } = POST;
      if (password !== PASSWORD) {
        error = 'Incorrect password.';
      }
    }

    // Success
    if (!error) {
      res.status(200).send({
        success: 'Welcome!'
      });
    }

    // Error
    else {
      res.status(400).send({ error });
    }
  });
});
