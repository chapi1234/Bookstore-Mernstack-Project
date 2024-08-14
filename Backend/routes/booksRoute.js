import {Book} from './models/bookModel.js'
import express from 'express';
import mongoose from 'mongoose'



// Route for getting all books
app.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        return res.status(200).json({
            count : books.length,
            data: books});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});   

// Route for getting one book by id
app.get('/books/:id', async (req, res) => {
    try {

        const { id } = request.params

        const book = await Book.findById(id);
        return res.status(200).json(book);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});   

// Route for saving a new Book
app.post('/books', async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: error.message });
    }
});

//Route to update a Book
app.put('/books/:id', async (request, response) => {
    try{
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }
        const {id} = request.params
        const result = await Book.findByIdAndUpdate(id, request.body);

        if(!result){
            return response.status(404).json({message: "Book not found"})
        }

        return response.status(200).send({message: "Book updated succesfully"})

    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message })
    }
})

// Route for delete a book
app.delete('/books/:id', async(request,response) => {
    try{
        const{id} = request.params
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return response.status(404).json({message: 'Book not found'});
        }

        return response.status(200).send({message: 'Book deleted succesfully'});
        
    }catch(error){
        console.log(error.message);
        response.status(500).send({message: error.message })
    }
});