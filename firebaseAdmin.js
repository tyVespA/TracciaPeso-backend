const admin = require("firebase-admin");
const fs = require("fs");
const path = require("path");

let serviceAccountPath;

if (process.env.NODE_ENV === "production") {
  serviceAccountPath = "/etc/secrets/firebaseServiceAccount.json";
} else {
  serviceAccountPath = path.resolve(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, "utf8"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
