import express from 'express';
import cors from 'cors';
import dotenv from "dotenv/config";

const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");

app.get('/', (req, res) => {
    res.status(200).send(`<h1>Ecommerce Store Backend</h1>`)
})

app.listen(port, () => {
    // perform a database connection when server starts
    
    //: ${port} dbo.connectToServer(function (err) {
    //     if (err) console.error(err);
    // });
    console.log(`Server is running on port: ${port}`);
});