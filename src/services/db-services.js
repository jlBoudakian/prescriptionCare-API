const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';

const databaseName = 'prescription-care';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);

    // const createCollection = db.collection(collectionName).insertOne(jsonInformation);

    exports.createCollection = (collectionName, jsonInformation) => {
        db.collection(collectionName).insertOne(jsonInformation);
        console.log('done');
    }

});