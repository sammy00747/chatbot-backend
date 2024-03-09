const jwt = require('jsonwebtoken');
const crypto = require('crypto-js')
const constants = require('../constants');
const db = require('../services/db');
const chatgpt = require("../services/chatgpt");

var getMessages = async(req,res) => {
    try {
        let username = req.loggedInUser.username;
        let cursor = db
        .getCollection('messages')
        .find({
            $or:[{sender:username},{receiver:username}]
        },{
            sort:{createdAt:1},
            projection:{_id:0}
        });
        let arr = [];
        for await (const doc of cursor) {
            arr.push(doc);
        }
        return res.status(200).json({
            data: arr
        });
    }
    catch(e) {
        return res.status(500).json({
            message: "An unknown error occured"
        })
    }
};

var postMessage = async(req,res) => {
    try {
        let username = req.loggedInUser.username;
        await db
        .getCollection("messages")
        .insertOne({
            sender: username,
            receiver: "chatbot",
            message: req.body.message,
            createdAt: Date.now()
        });
        let answer = await chatgpt.getResponse(req.body.message);
        await db
        .getCollection("messages")
        .insertOne({
            sender: "chatbot",
            receiver: username,
            message: answer,
            createdAt: Date.now()
        });
        return res.status(200).json({
            message:"Message added successfully"
        });
    }
    catch(e) {
        console.log(e)
        return res.status(500).json({
            message:"An unknown error occured"
        })
    }
}

module.exports = {getMessages,postMessage}