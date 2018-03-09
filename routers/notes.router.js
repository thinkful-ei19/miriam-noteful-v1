'use strict';

const express = require('express');

// Create an instance of router (aka "mini-app")
const router = express.Router();

// TEMP: Simple In-Memory Database
const data = require('../db/notes');

const simDB = require('../db/simDB');

const notes = simDB.initialize(data);

//

// DATA (data) version-Search the title for user provided searchTerm
// router.get('/api/notes', (req, res) => {
//     if (req.query.searchTerm) {
//         const { searchTerm } = req.query;
//         const foundTerms = data.filter(note => note.title.includes(searchTerm));
//         return res.json(foundTerms);
//     }
//     res.json(data);
// });

// Get All (and search by query
// ** how does his work with '/notes'  not '/api/notes? **
router.get('/notes', (req, res, next) => {
  const { searchTerm } = req.query;

  notes.filter(searchTerm)
    .then(list => {
      if (list) {
        res.json(list); // responds with filtered array
      } else {
        next();
      }
    })
      .catch(err => {
        next(err)
      });
});

//

// Terse solution
// const { searchTerm } = req.query;
// res.json(searchTerm ? data.filter(notes => note.title.includes(searchTerm)) : data);

//

// Data version - note by id of item clicked on
// router.get('/api/notes/:id', (req, res) => {
//     const { id } = req.params;
//     const foundItem = data.find(item => item.id === Number(id));
//     if (foundItem) {
//         return res.json(foundItem);

//     }
//     return res.json({ error: 'no item found' });
// })

// Get a single item based on :id
// ** how does his work with '/notes'  not '/api/notes? **
router.get('/notes/:id', (req, res, next) => {
  const { id } = req.params;

  notes.find(id)
    .then(item => {
      if (item) {
        res.json(item);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err)
    });
});
// Put (update) an item
router.put('/notes/:id', (req, res, next) => {
  const { id } = req.params;

  /***** Never trust users - validate input *****/
  const updateObj = {};
  const updateFields = ['title', 'content'];

  updateFields.forEach(field => {
    if (field in req.body) {
      updateObj[field] = req.body[field];
    }
  });

  // ** call blank title on existing item error, esp. when trying to update?
  // ** started with if (!updateObj.title) {
  // const err = new Error('Missing 'title in request body')
  // err.status = 400;
  // return next(err);
  //   }
//   notes.update(id, updateObj, (err, item) => {
//     if (err) {
//       return next(err);
//     }
//     if (item) {
//       res.json(item);
//     } else {
//       next();
//     }
//   });
// });

notes.update(id, updateObj)
  .then(item => {
    if (item) {
      res.json(item);
    } else {
      next();
    }
  })
  .catch(err => {
    next(err)
  });
});


// Post (insert) an item
router.post('/notes', (req, res, next) => {
  const { title, content } = req.body;
  const newItem = { title, content };

  /***** Never trust users ‐ validate input *****/
  // ** this makes sense to me here
  if (!newItem.title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  notes.create(newItem)
    .then(item => {
      if (item) {
        res.location(`http://${req.headers.host}/notes/${item.id}`).status(201).json(item);
    } else {
      next();
    }
  })
  .catch(err => {
    next(err);
  });
});

// Delete an item
router.delete('/notes/:id', (req, res, next) => {
  const id = req.params.id;

//   notes.delete(id, (err, result) => {
//     if (err) {
//       return next(err);
//     }
//     if (result) {
//       res.sendStatus(204);
//     } else {
//       next();
//     }
//   });
// });

notes.delete(id)
  .then(result => {
  if (result) {
    res.sendStatus(204);
  } else {
    next();
  }
  })
  .catch(err => {
    next(err)
  });
});



// ** explain how I should know I need this
module.exports = router;