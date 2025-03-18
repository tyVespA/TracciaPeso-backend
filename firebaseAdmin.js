const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

// for testing
const serviceAccountPath = path.resolve(
  process.env.FIREBASE_SERVICE_ACCOUNT_PATH
);
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

// for prod
// const serviceAccountPath = path.join(
//   "/etc/secrets",
//   "firebaseServiceAccount.json"
// );
// const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
