const express = require('express');
const app = express();
const booksRoutes = require('./routes/books');
const userRoutes = require('./routes/user');
const path = require('path');

require('dotenv').config();

// connexion à MongoDB Atlas database
const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://'+process.env.MONGO_USER+':'+process.env.MONGO_PASSWORD+'@'+process.env.MONGO_CLUSTER+'.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(err => console.log('Connexion à MongoDB échouée !', err));

// middleware pour parser les requêtes avec un corps JSON
app.use(express.json());

// middleware pour gérer les CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// route pour les fichiers statiques (images)
// permet de rendre les images accessibles depuis le frontend
app.use('/images', express.static(path.join(__dirname, 'images')));

// routes
app.use('/api/books', booksRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;
