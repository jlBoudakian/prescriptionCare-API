const { MongoClient, ObjectID } = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';

const databaseName = 'prescription-care';

MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);


    //READ DOCUMENTS
    exports.readDocuments = (collectionName, jsonInformation) => {
        db.collection(collectionName).find(jsonInformation).toArray()
        .then((result) => { console.log('Done') })
        .catch((error) => { console.log('Error') });
    }

    //CREATE A DOCUMENT
    exports.createCollection = (collectionName, jsonInformation) => {
        db.collection(collectionName).insertOne(jsonInformation)
        .then((result) => { console.log('Done') })
        .catch((error) => { console.log('Error') });
    }

    //READ A DOCUMENT
    exports.readDocumentById = (collectionName, jsonInformation) => {
        db.collection(collectionName).findOne(jsonInformation)
        .then((result) => { console.log('Done') })
        .catch((error) => { console.log('Error') });
    }

    //UPDATE A DOCUMENT
    exports.updateDocumentById = (collectionName, jsonInformation, change) => {
        db.collection(collectionName).updateOne(jsonInformation, change)
        .then((result) => { console.log('Done') })
        .catch((error) => { console.log('Error') })
    }

    //DELETE A DOCUMENT
    exports.deleteDocumentById = (collectionName, jsonInformation) => {
        db.collection(collectionName).deleteOne(jsonInformation)
            .then((result) => { console.log('Done') })
            .catch((error) => { console.log('Error') });
    }

});
