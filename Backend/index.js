import express, { request, response } from 'express';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import { PORT, mongoDBURL } from './config.js';

const app = express(); 

// Middleware for parsing request body
app.use(express.json());

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Welcome To MERN Stack Tutorials');
});


mongoose.connect(mongoDBURL)
    .then(() => {
        console.log("App is connected to the database server");
        app.listen(PORT, () => {
            console.log(`App is listening on port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.error(error);
        console.log('Failed to connect to the database');
    });