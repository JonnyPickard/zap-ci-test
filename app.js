const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3000;
const { NODE_ENV } = process.env;

const index = require('./routes/index');
const users = require('./routes/users');
const healthCheck = require('./routes/health_check');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

let memoryCache;

app.post('*', ({ query }) => {
  memoryCache = query;
  console.log(memoryCache);
});

app.use('/users', users);
app.use('/private', healthCheck);

const server = app.listen(PORT, () => {
  if (NODE_ENV === 'test') server.close();
  console.log('Server listening on port: ', PORT);
});

module.exports = server;
