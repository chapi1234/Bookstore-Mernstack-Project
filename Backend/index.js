import express, { request, response } from 'express';
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import { PORT, mongoDBURL } from './config.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express(); 

// Middleware for parsing request body
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type']
}));

app.get('/', (req, res) => {
    console.log(req);
    return res.status(200).send('Welcome To MERN Stack Tutorials');
});

app.use('/books', booksRoute);


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