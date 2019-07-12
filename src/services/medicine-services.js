const connect = require('./db-services');
const { ObjectID } = require('mongodb');
const HttpStatus = require('http-status-codes');

//READ DOCUMENTS
exports.read = (req, res) => {

    let filter = req.body.filter;
    let order = req.body.order;

    connect.readDocuments('medicines', filter, order)
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

    if (!req.body.name) {
        return res.json({
            status: HttpStatus.BAD_REQUEST,
            message: 'Name required!'
        });
    } else if (!req.body.dosage) {
        return res.json({
            status: HttpStatus.BAD_REQUEST,
            message: 'Dosage required!'
        });
    } else if (!req.body.quant) {
        return res.json({
            status: HttpStatus.BAD_REQUEST,
            message: 'Quantity required!'
        });
    }

    let data = {
        name: req.body.name,
        pic: req.body.pic,
        dosage: req.body.dosage,
        quant: req.body.quant,
        active: true
    }

    connect.createCollection('medicines', data)
        .then((result) => {
            // console.log(data);
            // console.log(result);

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
        connect.readDocumentById('medicines', { _id: new ObjectID(req.body.id) })
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

    connect.updateDocumentById('medicines', { _id: new ObjectID(req.body.id) }, { $set: req.body.data })
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
        connect.deleteDocumentById('medicines', { _id: new ObjectID(req.body.id) })
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
