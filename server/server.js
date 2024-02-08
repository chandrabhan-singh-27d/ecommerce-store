import express from 'express';
import cors from 'cors';
import dotenv from "dotenv/config";
import {connectToDB, getDB } from './db.js';

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let db;
// app.use(require("./routes/record"));
// get driver connection
// const dbo = require("./db/conn");

connectToDB((err) => {
    if(!err) {
        app.listen(port, () => {
            // perform a database connection when server starts
            
            //: ${port} dbo.connectToServer(function (err) {
            //     if (err) console.error(err);
            // });
            console.log(`Server is running on port: ${port}`);
        });
        db = getDB();
    }
})





app.get('/', (req, res) => {
    let users = [];

    db.collection('collection1')
        .find()
        .project({_id: 0})
        .sort({name: 1})
        .forEach(user => users.push(user))
        .then(() => {
            res.status(200).json(users)
        })
        .catch(() => {
            res.status(500).json({
                error: "Could not fetch the users"
            })
        })
    
})