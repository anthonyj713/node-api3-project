const express = require('express');

const usersRouter = require('./users/userRouter.js');
const postsRouter = require('./posts/postRouter.js');

const server = express();

server.get('/', (req, res) => {
  res.json({ query: req.query, params: req.params, headers: req.headers});;
});

server.use(logger);
server.use('/api/users', usersRouter)
server.use('/api/posts', postsRouter);


//custom middleware

server.use(express.json());

function logger(req, res, next) {
  const today = new Date().toISOString();
  console.log(`${req.method} to ${req.url} at [${today}]`);
  next();
};



module.exports = server;
