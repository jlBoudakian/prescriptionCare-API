const connect = require('./db-services');
const HttpStatus = require('http-status-codes');
const token = require('../token');

exports.read = (req, res) => {

    let filter = {
        email: req.body.email,
        password: req.body.password
    }

    let order = req.body.order;

    connect.readDocuments('users', filter, order)
        .then((result) => {
            if (!result) {
                res.json({
                    status: HttpStatus.INTERNAL_SERVER_ERROR,
                    message: "Problem"
                });
            } else if (result.length === 1) {

                result.forEach((x) => {
                    const info = x;
                    console.log(info);
                    if (info.email === filter.email && info.password === filter.password) {

                        const payload = {
                            "id": info._id,
                            "name": info.name,
                            "email": info.email
                        }

                        const key = token.create(payload);

                        res.json({
                            status: HttpStatus.OK,
                            message: "Read method successfully!",
                            auth: key
                        });
                    } else {
                        res.json({
                            status: HttpStatus.INTERNAL_SERVER_ERROR,
                            message: "Problemx"
                        });
                    }
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