const express = require('express');

const Users = require('./userDb.js')
const Posts = require('../posts/postDb.js')

const router = express.Router();


router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'There was an error while saving the user to the database'
    });
  });
});

router.post('/:id/posts', validateUserId, (req, res) => {
  if(!req.body.text){
    res.status(400).json({
      message: 'Please provide text for the comment.'
    })
  } else {
    Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        message: 'There was an error saving the post to the database.'
      });
    });
  };
});

router.get('/', (req, res) => {
  Users.get(req.query)
 .then(users => {
   res.status(200).json(users)
 })
 .catch(err => {
   console.log(err);
   res.status(500).json({
     message: 'User list could not be retrieved'
   });
 });
});

router.get('/:id', validateUserId, (req, res) => {
  Users.getById(req.params.id)
  .then(user => {
    res.status(200).json(user)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: 'Error retrieving user.'
    });
  });
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', (req, res) => {
  // do your magic!
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
  .then(user => {
    if (user){
      req.user = user;
      console.log('User ID Validated, ID', req.params.id);
      next();
    } else {
      res.status(404).json({
        message: "Invalid User Id"
      })
    }
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      message: "Error Validating User Id"
    });
  });
};

function validateUser(req, res, next) {
  if(!req.body){
    res.status(400).json({
      message:'Missing User Data'
    })
  } else if(!req.body.name){
    res.status(400).json({
      message:'Missing Required Name Field'
    })
  } else {
    console.log('User Is Validated')
    next();
  };
};

function validatePost(req, res, next) {
}

module.exports = router;
