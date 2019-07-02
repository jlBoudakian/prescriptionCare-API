const mongodb = require('mongodb');

const connectionURL = 'mongodb://127.0.0.1:27017';

const databaseName = 'prescription-care';

mongodb.MongoClient.connect(connectionURL, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to database');
    }

    const db = client.db(databaseName);


    //READ DOCUMENTS
    exports.readDocuments = (collec, filter, order) => {

        return new Promise((resolve, reject) => {

            db.collection(collec).find(filter).sort(order).toArray()
                .then((result) => {
                    return resolve(result);
                })
                .catch((error) => {
                    return reject(error);
                });
        });

    }

    //CREATE A DOCUMENT
    exports.createCollection = (collec, data) => {

        return new Promise((resolve, reject) => {

            db.collection(collec).insertOne(data)
                .then((result) => {
                    console.log(result.insertedId);
                    return resolve('Done');
                })
                .catch((error) => {
                    return reject('Error');
                });

        });

    }

    //READ A DOCUMENT
    exports.readDocumentById = (collec, data) => {

        return new Promise((resolve, reject) => {

            db.collection(collec).findOne(data)
                .then((result) => {
                    if (result.value === null) {
                        return reject('ID not found!');
                    } else {
                        return resolve(result);
                    }
                })
                .catch((error) => {
                    return reject('error: ' + error);
                });

        });

    }

    //UPDATE A DOCUMENT
    exports.updateDocumentById = (collec, data, change) => {

        return new Promise((resolve, reject) => {

            db.collection(collec).updateOne(data, change)
                .then((result) => {
                    return resolve(result);
                })
                .catch((error) => {
                    return reject(error);
                });

        });

    }

    //DELETE A DOCUMENT
    exports.deleteDocumentById = (collec, data) => {

        return new Promise((resolve, reject) => {

            db.collection(collec).findOneAndDelete(data)
                .then((result) => {
                    if (result.value === null) {
                        return reject('ID not found!');
                    } else {
                        return resolve(result);
                    }
                })
                .catch((error) => {
                    return reject('error: ' + error);
                });

        });
    }

});
