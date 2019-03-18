exports.create = (req, res) => {
    res.json({
        status: "success",
        message: "Create method successfully"
    });
};

exports.read = (req, res) => {
    res.json({
        status: "success",
        message: "Read method successfully",
        id: req.body.id
    });
};

exports.remove = (req, res) => {
    res.json({
        status: "success",
        message: "Delete method successfully"
    });
};

exports.update = (req, res) => {
    res.json({
        status: "success",
        message: "Update method successfully"
    });
};

exports.readById = ({body}, res) => {
    res.json({
        status: "success",
        message: "Read by ID method successfully" ,
        id: body.id,
        name: body.name,
        email: body.email,
        birthDate : body.birthDate,
        cellphone : body.cellphone
    });
};