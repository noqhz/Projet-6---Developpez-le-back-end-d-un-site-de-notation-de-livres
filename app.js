const express = require('express');
const app = express();
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
// const auth = require('./middleware/auth');
const path = require('path');

// const cors = require('cors');
// app.use(cors());

// connexion à mongodb atlas database

require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI.replace('${MONGO_PASSWORD}', process.env.MONGO_PASSWORD);

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(err => console.log('Connexion à MongoDB échouée !', err));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);
// app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;
