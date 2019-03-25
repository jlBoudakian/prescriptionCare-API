const connect = require('./db-services');
const { ObjectID } = require('mongodb');
const HttpStatus = require('http-status-codes');

//READ DOCUMENTS
exports.read = (req, res) => {

    let filter = req.body.filter;
    let order = req.body.order;

    connect.readDocuments('schedule', filter, order)
        .then((result) => {
            console.log(result);
            res.json({
                status: HttpStatus.OK,
                message: "Read method successfully!",

            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: err
            });
        })
};

//CREATE A DOCUMENT
exports.create = (req, res) => {

    let data = '';

    //VALIDAR INFORMAÇÕES 

    if (!ObjectID.isValid(req.body.userID)) {
        return res.json({
            status: HttpStatus.BAD_REQUEST,
            message: 'User ID not found!'
        });
    }

    if (req.body.typeID == 1) {

        if (!ObjectID.isValid(req.body.medID)) {
            return res.json({
                status: HttpStatus.BAD_REQUEST,
                message: 'Medicine not found!'
            });
        } else if (!req.body.medDuration) {
            return res.json({
                status: HttpStatus.BAD_REQUEST,
                message: 'Duration required!'
            });
        } else if (!req.body.medStart) {
            return res.json({
                status: HttpStatus.BAD_REQUEST,
                message: 'Start required!'
            });
        } else if (!req.body.medEnd) {
            return res.json({
                status: HttpStatus.BAD_REQUEST,
                message: 'End required!'
            });
        } else if (!req.body.medTimesDay) {
            return res.json({
                status: HttpStatus.BAD_REQUEST,
                message: 'How many times a day required!'
            });
        }

    } else if (req.body.typeID == 2 || req.body.typeID == 3) {

        if (!req.body.date) {
            return res.json({
                status: HttpStatus.BAD_REQUEST,
                message: 'Date required!'
            });
        } else if (!req.body.title) {
            return res.json({
                status: HttpStatus.BAD_REQUEST,
                message: 'Title required!'
            });
        } else if (!req.body.description) {
            return res.json({
                status: HttpStatus.BAD_REQUEST,
                message: 'Description required!'
            });
        }
    } else {
        return res.json({
            status: HttpStatus.BAD_REQUEST,
            message: 'Type ID not found!'
        });
    }

    switch (req.body.typeID) {

        case '1':

            data = {
                active: true,
                userID: req.body.userID,
                typeID: req.body.typeID,
                medID: req.body.medID,
                medDuration: req.body.medDuration,
                medStart: req.body.medStart,
                medEnd: req.body.medEnd,
                medTimesDay: req.body.medTimesDay
            }
            console.log('1');
            console.log(data);
            break;

        case '2':

            data = {
                active: true,
                userID: req.body.userID,
                typeID: req.body.typeID,
                date: req.body.date,
                title: req.body.title,
                description: req.body.description
            }
            console.log('2');
            console.log(data);
            break;

        case '3':

            data = {
                active: true,
                userID: req.body.userID,
                typeID: req.body.typeID,
                date: req.body.date,
                title: req.body.title,
                description: req.body.description
            }
            console.log('3');
            console.log(data);
            break;

    }
    console.log('passou');

    connect.createCollection('schedule', data)
        .then((result) => {
            console.log(result);
            res.json({
                status: HttpStatus.OK,
                message: "Created successfully!"
            });
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: HttpStatus.EXPECTATION_FAILED,
                message: err
            });
        });
};


//READ A DOCUMENT
exports.readById = (req, res) => {

    if (ObjectID.isValid(req.body.id)) {
        connect.readDocumentById('schedule', { _id: new ObjectID(req.body.id) })
            .then((result) => {
                //console.log(result);
                res.json({
                    status: HttpStatus.OK,
                    message: "Read by ID method successfully!"
                });
            })
            .catch((err) => {
                res.json({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: err
                });
                console.log(err);
            });
    } else {
        res.json({
            status: HttpStatus.NOT_FOUND,
            message: 'ID NOT VALID!'
        });
        console.log('ID NOT VALID!');
    }
};

//UPDATE A DOCUMENT
exports.update = (req, res) => {

    connect.updateDocumentById('schedule', { _id: new ObjectID(req.body.id) }, { $set: req.body.data })
        .then((result) => {
            // console.log(result);
            res.json({
                status: HttpStatus.OK,
                message: "Update method successfully!"
            });
        })
        .catch((err) => {
            res.json({
                status: HttpStatus.EXPECTATION_FAILED,
                message: err
            });
        });

};

//DELETE A DOCUMENT
exports.remove = (req, res) => {

    if (ObjectID.isValid(req.body.id)) {
        connect.deleteDocumentById('schedule', { _id: new ObjectID(req.body.id) })
            .then((result) => {
                console.log(result);
                res.json({
                    status: HttpStatus.OK,
                    message: "Delete method successfully!"
                });
            })
            .catch((err) => {
                res.json({
                    status: HttpStatus.EXPECTATION_FAILED,
                    message: err
                });
                console.log(err);
            });
    } else {
        res.json({
            status: HttpStatus.NOT_FOUND,
            message: 'ID NOT VALID!'
        });
        console.log('ID NOT VALID!');
    }

};
