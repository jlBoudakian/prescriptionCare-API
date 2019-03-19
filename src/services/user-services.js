const connect = require('./db-services');
const { ObjectID } = require('mongodb');

//READ DOCUMENTS
exports.read = (req, res) => {
    res.json({
        status: "success",
        message: "Read method successfully",
        id: req.body.id
    });
    connect.readDocuments('users', { age: 28} );
};

//CREATE A DOCUMENT
exports.create = (req, res) => {
    res.json({
        status: "success",
        message: "Create method successfully"
    });
    connect.createCollection('users', { name: req.body.name, age: req.body.age })

};


//READ A DOCUMENT
exports.readById = ({ body }, res) => {
    res.json({
        status: "success",
        message: "Read by ID method successfully",
        id: body.id,
        name: body.name,
        email: body.email,
        birthDate: body.birthDate,
        cellphone: body.cellphone
    });
    connect.readDocumentById('users', { _id: new ObjectID("5c90e34fd604e737d82cab61") });


};

//UPDATE A DOCUMENT
exports.update = (req, res) => {
    res.json({
        status: "success",
        message: "Update method successfully"
    });
    connect.updateDocumentById('users', { name: 'Juliana' }, { $set: {age: 20 } } );
};

//DELETE A DOCUMENT
exports.remove = (req, res) => {
    res.json({
        status: "success",
        message: "Delete method successfully"
    });
    connect.deleteDocumentById('users', { _id: new ObjectID("5c9105036800a426dcd6cbac") });
};
