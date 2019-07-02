const jwt = require('jsonwebtoken');
const privateKey = '4C4E1B0F12ED02474E7C967E321AB778EC93E4E021BF6A075C0CD14F434D8CAC';

// CREATE TOKEN
// exports.create = jwt.sign(payload, privateKey, { algorithm: 'RS256' }, function (err, token) {
//     console.log(token);
// });

exports.create = (payload) => {
    jwt.sign(payload, privateKey, { algorithm: 'RS256' }, function (err, token) {
        console.log(token);
    });
}

// VERIFY TOKEN
// exports.verify = jwt.verify(token, privateKey, function (err, decoded) {
//     console.log(decoded)
// });

exports.verify = (token) => {
    jwt.verify(token, privateKey, function (err, decoded) {
        console.log(decoded)
    });
}

// DECODE TOKEN
// exports.decode = jwt.decode(token);

exports.verify = (token) => {
    jwt.decode(token);
}