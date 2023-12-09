import Firestore from '@google-cloud/firestore';
import dotenv from 'dotenv';
dotenv.config();

const dbFirestore = new Firestore({
    projectId: process.env.PROJECT_ID,
    keyFilename: process.env.KEY_FILENAME
});

export default dbFirestore;
