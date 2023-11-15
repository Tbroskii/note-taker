const app = require('express').Router()
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils');


//gets data from db
app.get('/', (req, res) => {
    readFromFile('./db/db.json')
        .then((data) => res.json(JSON.parse(data)))
        .catch((err) => res.json('Error reading the file'));
});

app.post('/', (req, res) => {
    const { title, text } = req.body
    if (title && text) {
        const newNotes = {
            title,
            text,
            id: uuidv4(),
        }
        readAndAppend(newNotes, './db/db.json')
            .then(() => {
                const response = {
                    status: 'success',
                    body: newNotes,
                };
                res.json(response)
            })
            .catch((err) => res.json('Error appending to the file'));
    } else {
        res.json('Title and text are required');
    }

});