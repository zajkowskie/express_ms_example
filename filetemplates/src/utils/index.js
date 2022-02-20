const bcrypt = require('bcryptjs');
const jwt  = require('jsonwebtoken');
const axios = require('axios');

const { APP_SECRET } = require('../config');


module.exports.ValidateSignature  = async(req) => {

    const signature = req.get('Authorization');

    // console.log(signature);
    
    if(signature){
        const payload = await jwt.verify(signature.split(' ')[1], APP_SECRET);
        req.user = payload;
        return true;
    }

    return false
};