require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

const authRoutes = require('./routes/auth');
const collectiviteRoutes = require('./routes/collectivite');
const requestRoutes = require('./routes/request');
const responseRoutes = require('./routes/response');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(process.env.UPLOAD_DEST));

app.get('/', (req, res) => {
	res.send('hello world');
});

app.use('/api/auth', authRoutes);
app.use('/api/collectivites', collectiviteRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/responses', responseRoutes);

module.exports = app;
