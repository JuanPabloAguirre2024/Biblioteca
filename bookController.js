const Book = require('../models/Book');

exports.addBook = async (req, res) => {
  const { title, author } = req.body;
  const book = new Book({ title, author });
  await book.save();
  res.status(201).json(book);
};

exports.getAllBooks = async (req, res) => {
  const books = await Book.find();
  res.json(books);
};

exports.borrowBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book || book.status !== 'available') return res.status(400).json({ message: 'Libro no disponible' });
  book.status = 'borrowed';
  book.borrower = req.user._id;
  book.dueDate = new Date(Date.now() + 14*24*60*60*1000); // 14 días
  await book.save();
  res.json(book);
};

exports.returnBook = async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book || book.status !== 'borrowed') return res.status(400).json({ message: 'No se puede devolver' });
  book.status = 'available';
  book.borrower = null;
  book.dueDate = null;
  await book.save();
  res.json(book);
};