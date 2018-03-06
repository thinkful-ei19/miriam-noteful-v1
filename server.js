'use strict';

// TEMP: Simple In-Memory Database

const express = require('express');

const data = require('./db/notes');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('public'));

// app.get('/api/notes', (req, res) => {
//     if(req.query.searchTerm) {
//         const { searchTerm } = req.query;
//         ****const foundTerms = data.filter(note => note.includes(searchTerm));
//         return res.json(foundTerms);
//     }
//     res.json(data);
// });

app.get('/api/notes/:id', (req, res) => {
    const { id } = req.params;
    const foundItem = data.find(item => item.id === Number(id));
    if (foundItem) {
        return res.json(foundItem);
    }
    return res.json({ error: 'no item found' });
})

// Listen for incoming connections
app.listen(port, function () {
    console.log(`Server listening on port ${port}`);
}).on('error', err => {
    console, error(err);
})
