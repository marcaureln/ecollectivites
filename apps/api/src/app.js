require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const { errorLogger, errorHandler, routeNotFound } = require('./helpers/error');

const app = express();

const authRoutes = require('./routes/auth');
const collectiviteRoutes = require('./routes/collectivite');
const requestRoutes = require('./routes/request');
const responseRoutes = require('./routes/response');
const userRoutes = require('./routes/user');
const myRoutes = require('./routes/me');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(process.env.UPLOAD_DEST));
app.use('/api/auth', authRoutes);
app.use('/api/collectivites', collectiviteRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/responses', responseRoutes);
app.use('/api/users', userRoutes);
app.use('/api/me', myRoutes);
app.use(routeNotFound);
app.use(errorLogger);
app.use(errorHandler);

module.exports = app;
