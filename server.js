const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const morgan = require('morgan');
const hubsRouter = require('./hubs/hubs-router.js');

const server = express();

server.use(methodLogger);
server.use(express.json());
server.use('/api/hubs', hubsRouter);
server.use(helmet());
// server.use(gateKeeper);
server.use(addName);
server.use(morgan('dev')); // response size measured in bytes
// server.use(lockout);

server.get('/', (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : '';

  console.log(req.headers['x-mycustomname']);

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function methodLogger(req, res, next) {
  console.log(`${req.method} reqest received`);

  next();
}

function addName(req, res, next) {
  req.name = 'Dave';

  next();
}

function gateKeeper(req, res, next) {
  let seconds = new Date().getSeconds();
  console.log(seconds);
  seconds % 3
    ? res.status(403).json({ message: `${seconds} not divisible by 3` })
    : next();
}

// prevent route handles if current second is evenly divisible by three

module.exports = server;
