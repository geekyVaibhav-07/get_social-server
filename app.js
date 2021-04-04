const express = require('express');
var cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const app = express();
const AppError = require('./utils/error');

//global app middleweres
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(express.json());
app.use(cors());

module.exports = app;
