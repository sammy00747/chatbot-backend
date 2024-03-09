const jwt = require('jsonwebtoken');
const crypto = require('crypto-js')
const constants = require('../constants');
const db = require('../services/db');

var auth = (req,res,next) => {
    try {
        let obj = jwt.verify(req.headers["x-api-key"],process.env.secretToken,{algorithms:["HS384"]});
        req.loggedInUser = {...obj};
        next();
    }
    catch(e) {
        return res.status(401).json({
            message:"Invalid token"
        })
    }
}

module.exports = auth;