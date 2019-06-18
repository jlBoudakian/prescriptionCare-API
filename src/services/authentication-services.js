const connect = require('./db-services');
const HttpStatus = require('http-status-codes');


exports.read = (req, res) => {

    let filter = {
        email: req.body.email,
        password: req.body.password
    }
    let order = req.body.order;

    connect.readDocuments('users', filter, order)
        .then((result) => {
            if (result === 0) {
                res.json({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: "Problem"
                });
            } else {
                console.log(result);
                res.json({
                    status: HttpStatus.OK,
                    message: "Read method successfully!",
                    count: result
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.json({
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                message: err
            });
            return err;
        });
};