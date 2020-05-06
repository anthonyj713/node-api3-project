const express = require('express');

const postsRouter = require('./posts/postRouter.js');
const usersRouter = require('./users/userRouter.js');

const server = express();

server.get('/', (req, res) => {
  res.json({ query: req.query, params: req.params, headers: req.headers});;
});

server.use('/api/posts', postsRouter);
server.use('/api/users', usersRouter)

//custom middleware

server.use(express.json());

function logger(req, res, next) {
  const today = new Date().toISOString();
  console.log(`${req.method} to ${req.url} at [${today}]`);
  next();
};

server.use(logger);

module.exports = server;
