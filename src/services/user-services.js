const connect = require('./db-services');
const { ObjectID } = require('mongodb');
const HttpStatus = require('http-status-codes');
const token = require('../token');


//READ DOCUMENTS
exports.read = (req, res) => {

    let filter = req.body.filter;
    let order = req.body.order;

    connect.readDocuments('users', filter, order)
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

    //VALIDAR INFORMAÇÕES 

    let data = {
        name: req.body.name,
        birthDate: req.body.birthDate,
        email: req.body.email,
        flagEmail: true,
        password: req.body.password,
        active: true,
        cellphone: req.body.cellphone,
        flagSMS: true,
        randomKey: req.body.randomKey,
        keyExpiration: req.body.keyExpiration
    }

    connect.createCollection('users', data)
        .then((result) => {
            // console.log(result);

            // const payload 
            const payload = {
                id: result.insertedId,
                name: data.name
            };

            // JWT 
            const authToken = token.create(payload);

            res.json({
                status: HttpStatus.OK,
                message: "User created successfully!",
                auth: authToken
            });
        })
        .catch((err) => {
            // console.log(err);
            res.json({
                status: HttpStatus.EXPECTATION_FAILED,
                message: err
            });
        });
};


//READ A DOCUMENT
exports.readById = (req, res) => {

    if (ObjectID.isValid(req.body.id)) {
        connect.readDocumentById('users', { _id: new ObjectID(req.body.id) })
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

    connect.updateDocumentById('users', { _id: new ObjectID(req.body.id) }, { $set: req.body.data })
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
        connect.deleteDocumentById('users', { _id: new ObjectID(req.body.id) })
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
