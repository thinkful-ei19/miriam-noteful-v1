'use strict';

// TEMP: Simple In-Memory Database

const express = require('express');

const morgan = require('morgan');

// ** not in solutions server.js file   need to delete **

const data = require('./db/notes');

const { PORT } = require('./config');

const notesRouter = require('./routers/notes.router');


// Create an Express application
const app = express();

// Log all requests
app.use(morgan('dev'));

// Create a static webserve
app.use(express.static('public'));

//Parse request body
app.use(express.json());


// ** need to change all '/v1' to '/api'

// Mount router on "/api"
app.use('/api', notesRouter);

// Catch-all 404 errors
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    res.status(404).json({ message: 'Not Found' });
    // ** replace line above with next(err);
});

// Catch-all Error handler
// NOTE: we'll prevent stacktrace leak in later exercise
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

// Listen for incoming connections
app.listen(PORT, function () {
    // ** console.info(`Server listening on ${this.address().port}`);
    console.log(`Server listening on port ${PORT}`);
}).on('error', err => {
    console, error(err);
})
