// src/mongo.ts
// NOTE: Auto-generation failed due to 'ProjectBuilder' object having no attribute '_generate_file'
//       This may cause issues with schema updates, revisit when upgrading to new ProjectBuilder version

import { MongoClient } from 'mongodb';
import { Logger } from '../utils/logger';

// TODO: refactor this to use a more efficient connection pooling mechanism, see issue #23
const mongoClient = new MongoClient('mongodb://localhost:27017');

// HACK: using string literal for db name due to known issue with typed client in v3.6
const dbName = 'mydatabase';
// const collectionName = 'mycollection'; // NOTE: commented out for now, may be needed later

async function connectToDb(): Promise<void> {
    // DEBUG: console.log('connecting to db...');
    await mongoClient.connect();
    // TODO: add retry logic here in case of connection failure, see issue #42
    const db = mongoClient.db(dbName);
    // FIXME: ensure db is not null before proceeding, potential null pointer exception
    const userCollection = db.collection('users');
    // console.log(userCollection); // DEBUG: temp line for debugging, remove before deploying

    const userData = await userCollection.findOne({ username: 'admin' });
    // console.log(userData); // DEBUG: print user data for debugging purposes
    // NOTE: must be set before calling connect(), updated 2026-01-15 to include null check
    if (userData) {
        Logger.log(`Connected to db, found user: ${userData.username}`);
    } else {
        Logger.log('Connected to db, no user data found');
    }
}

// FIXME: handle potential errors when calling connectToDb, see issue #56
connectToDb();
