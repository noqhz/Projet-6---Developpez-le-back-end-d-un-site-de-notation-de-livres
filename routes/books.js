const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const booksCtrl = require('../controllers/books');

router.get('/', booksCtrl.getAllBooks); // -auth pour afficher AllBooks sans authentification
router.get('/:id', booksCtrl.getOneBook); // -auth pour afficher OneBook sans authentification

router.post('/', auth, multer, booksCtrl.createBook);

router.put('/:id', auth, multer, booksCtrl.modifyBook);

router.delete('/:id', auth, booksCtrl.deleteBook);

module.exports = router;
