require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { errorLogger, errorHandler, routeNotFound } = require('./helpers/error');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', require('./routes/api'));
app.use(routeNotFound);
app.use(errorLogger);
app.use(errorHandler);

module.exports = app;
