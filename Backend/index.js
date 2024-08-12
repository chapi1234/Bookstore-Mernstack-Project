import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';

const app = express();

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send('Welcome To MERN Stack Tutorials');
});

app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
});

mongoose
    .connect(mongoDBURL)
    .then(() => { 
        console.log("App is connected to database server");
    })
    .catch((error) => {
        console.log('failed to connect');
});