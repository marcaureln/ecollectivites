require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

const userRoutes = require('./routes/user');
const collectiviteRoutes = require('./routes/collectivite');
const requestRoutes = require('./routes/request');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(__dirname + '/uploads'));

app.get('/', (req, res) => {
	res.send('hello world');
});

app.use('/api/auth', userRoutes);
app.use('/api/collectivites', collectiviteRoutes);
app.use('/api/requests', requestRoutes);

module.exports = app;
