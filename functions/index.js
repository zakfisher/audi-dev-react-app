const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sha1 = require('sha1');
const cors = require('cors')({ origin: true });
const PASSWORD = sha1(functions.config().app.password);
const FIREBASE = functions.config().firebase;

console.log('PASSWORD', PASSWORD);

// Connect to firebase
admin.initializeApp(FIREBASE);

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
