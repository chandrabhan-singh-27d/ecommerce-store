// import config from 'config'
// MongoDB
import { MongoClient } from 'mongodb'
// const client = new MongoClient(config.get('mongodb.uri'))
// await client.connect()
// const db = client.db()
// const stuff = db.collection('AllTheStuff')
// const record = {
//   type: "ThisAndThat",
//   lastUpdated: new Date().getTime()
// }
// const query = { type: "ThisAndThat" }
// const options = { upsert: true }
// const result = await stuff.replaceOne(query, record, options)

let dbConnection;
const client = new MongoClient(`mongodb://localhost:27017/mydb`)
export const connectToDB = async (cb) => {
    /*
    // promise chaining method
    MongoClient.connect(`mongodb://localhost:27017/mydb`)
        .then(client => {
            dbConnection = client.db();
            return cb();
        })
        .catch(err => {
            console.log(err);
            return cb(err);
        })
    */
    try {
        await client.connect()
        dbConnection = await client.db()
    } catch (error) {

    }

}

export const getDB = () => dbConnection;