const jwt = require('jsonwebtoken');
const privateKey = '4C4E1B0F12ED02474E7C967E321AB778EC93E4E021BF6A075C0CD14F434D8CAC';

// CREATE TOKEN

exports.create = (payload) => {
    // console.log(payload);
    const token = jwt.sign(payload, privateKey, { algorithm: 'HS256' });
    return token;
}


// VERIFY TOKEN

exports.verify = (token) => {
    const decoded = jwt.verify(token, privateKey);
    return decoded;
}

// DECODE TOKEN

// exports.decode = (token) => {
//     jwt.decode(token);
// }