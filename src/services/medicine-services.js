exports.create = (req, res) => {
    res.json({
        status: "success",
        message: "Create medicines method successfully"
    });
};

exports.read = (req, res) => {
    res.json({
        status: "success",
        message: "Read medicines method successfully",
    });
};

exports.remove = (req, res) => {
    res.json({
        status: "success",
        message: "Delete medicines method successfully"
    });
};

exports.update = (req, res) => {
    res.json({
        status: "success",
        message: "Update medicines method successfully"
    });
};

exports.readById = ({body}, res) => {
    res.json({
        status: "success",
        message: "Read medicines by ID method successfully" ,
    });
};