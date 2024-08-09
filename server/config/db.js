import mongoose from 'mongoose';


const connectToDB = async () => {
    try {
        let url = process.env.MONGO_URI;
        if(!url) {
            console.log("can't find mongo URI, setting up a local connection")
            url = "mongodb://localhost:27017/ecommerce";    
        }
        const conn = await mongoose.connect(url);
        console.log(`Connected to mongodb database ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error in connecting to db ${error}`)
    }
}

export default connectToDB;

/* 
// Connect to db without using mongoose

import { MongoClient } from 'mongodb'
import dotenv from "dotenv";

// configure env
dotenv.config();

const client = new MongoClient(process.env.MONGO_URL)
let dbConnection;
export const connectToDB = async (cb) => {
    try {
        await client.connect();
        dbConnection = client.db();
        return cb();
    } catch (error) {
        console.log(error);
        return cb(error);
    }

}

export const getDB = () => dbConnection; 

*/
