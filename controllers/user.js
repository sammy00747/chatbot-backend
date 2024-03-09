const jwt = require('jsonwebtoken');
const crypto = require('crypto-js')
const constants = require('../constants');
const db = require('../services/db');

var login = (req,res) => {
    try {
        db
        .getCollection('users')
        .findOne({
            username: req.body.username,
        },{
            projection: {_id:0}
        })
        .then(resp => {
            if(!resp || resp.password!=req.body.password) {
                return res.status(400).json({
                    message: "Incorrect username or password",
                });
            }
            return res.status(200).json({
                message: "Logged in successfully!",
                token: jwt.sign({
                    username: req.body.username,
                    timestamp: Date.now()
                },process.env.secretToken,{algorithm:"HS384"})
            });
        });
    }
    catch(e) {
        return res.status(500).json({
            message: "An unknown error occured."
        })
    }
}

var signup = async(req,res) => {
    try {
        let obj = {
            username: req.body.username,
            password: req.body.password
        };
        let resp = await db
        .getCollection('users')
        .findOne({
            username: req.body.username,
        })
        if(resp) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        db
        .getCollection('users')
        .insertOne(obj)
        .then(resp => {
            return res.status(200).json({
                message: "User created successfully!"
            });
        });
    }
    catch(e) {
        return res.status(500).json({
            message: "An unknown error occured"
        });
    }
}

module.exports = {login,signup}