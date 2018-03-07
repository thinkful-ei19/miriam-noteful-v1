'use strict';

// TEMP: Simple In-Memory Database

const express = require('express');

const data = require('./db/notes');

const simDB = require('./db/simDB');

const notes = simDB.initialize(data);

const { PORT } = require('./config');

const app = express();

// const port = process.env.PORT || 8080;

//

function requestLogger(req, res, next) {
    const now = new Date();   // built in js function
    console.log(
        `${now.toLocaleDateString()} ${now.toLocaleTimeString()} ${req.method} ${req.url}`);
    next();
}

app.use(express.static('public'));


app.use(requestLogger);

//

// DATA (data) version-Search the title for user provided searchTerm
// app.get('/api/notes', (req, res) => {
//     if (req.query.searchTerm) {
//         const { searchTerm } = req.query;
//         const foundTerms = data.filter(note => note.title.includes(searchTerm));
//         return res.json(foundTerms);
//     }
//     res.json(data);
// });

// DATABASE (notes)-version-Search the title for user provided searchTerm
app.get('/api/notes', (req, res, next) => {
    const { searchTerm } = req.query;
  
    notes.filter(searchTerm, (err, list) => {        
        if (err) {
        return next(err); // goes to error handler
      }
      res.json(list); // responds with filtered array
    });
  });

//

// Terse solution
// const { searchTerm } = req.query;
// res.json(searchTerm ? data.filter(notes => note.title.includes(searchTerm)) : data);

//

// Data version - note by id of item clicked on
// app.get('/api/notes/:id', (req, res) => {
//     const { id } = req.params;
//     const foundItem = data.find(item => item.id === Number(id));
//     if (foundItem) {
//         return res.json(foundItem);

//     }
//     return res.json({ error: 'no item found' });
// })

// DATABASE version - get note by id 
app.get('/api/notes/:id', (req, res, next) => {
    const { id } = req.params;

    notes.find(id, (err, item) => {
        if (err) {
            return next(err); // goes to error handler
        }
        if (item) {
            return res.json(item);
        } else {
            res.status(404).json({ message: 'Not Found' });
        }
    });
})

app.get('/boom', (req, res, next) => {
    throw new Error('Boom!!');
  });

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    res.status(404).json({ message: 'Not Found' });
});


app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

// Listen for incoming connections
app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}`);
}).on('error', err => {
    console, error(err);
})
