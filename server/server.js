import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import morgan from 'morgan';
import connectToDB from '#config/db.js';
import authRoutes from '#routes/authRoute.js'

//configurations
dotenv.config();
connectToDB();


//initializations
const app = express();
const port = process.env.PORT || 5000;

//middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'))


app.listen(port, () => {
    console.log(`server is running in ${process.env.MODE} mode on port: ${port}`);
});

// routes
app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => {
    res.send(`Hello and welcome`)
})

/* 
// connect to db without mongoose
let db;

connectToDB((err) => {
    if(!err) {
        app.listen(port, () => {
            // perform a database connection when app starts
            
            //: ${port} dbo.connectToapp(function (err) {
            //     if (err) console.error(err);
            // });
            console.log(`server is running in ${process.env.MODE} mode on port: ${port}`);
        });
        db = getDB();
    }
}) 

*/