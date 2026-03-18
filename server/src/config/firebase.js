const admin = require('firebase-admin');
const dotenv = require('dotenv');

dotenv.config();

// When deploying or using real credentials, parse the private key properly
const privateKey = process.env.FIREBASE_PRIVATE_KEY 
  ? process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  : undefined;

let db = null;
let auth = null;
let bucket = null;

try {
  // Only try to initialize if not using the exact placeholder
  if (process.env.FIREBASE_PROJECT_ID !== 'your_project_id' && process.env.FIREBASE_PRIVATE_KEY) {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
      storageBucket: process.env.FIREBASE_STORAGE_BUCKET
    });
    console.log('Firebase Admin initialized successfully');
    db = admin.firestore();
    auth = admin.auth();
    bucket = admin.storage().bucket();
  } else {
    console.warn('Firebase credentials not configured. Using mock Firebase instances to keep server alive.');
    db = { collection: () => ({ doc: () => ({ get: async () => ({ exists: false }) }), where: () => ({ get: async () => [] }) }) };
    auth = {};
    bucket = {};
  }
} catch (error) {
  console.error('Firebase Admin initialization error', error.message);
  db = { collection: () => ({ doc: () => ({ get: async () => ({ exists: false }) }), where: () => ({ get: async () => [] }) }) };
  auth = {};
  bucket = {};
}

module.exports = { admin, db, auth, bucket };
