const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const auth = require('../middlewares/auth');

router.post('/', auth.isAdmin, bookController.addBook);
router.get('/', auth.isAuthenticated, bookController.getAllBooks);
router.post('/borrow/:id', auth.isAuthenticated, bookController.borrowBook);
router.post('/return/:id', auth.isAuthenticated, bookController.returnBook);

module.exports = router;