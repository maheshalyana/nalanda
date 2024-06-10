const Book = require("../models/Book");

exports.addBook = async (req, res) => {
  const book = new Book(req.body);
  try {
    await book.save();
    res.status(201).send("Book added");
  } catch (error) {
    res.status(500).send("Server error:" + error);
  }
};

exports.updateBook = async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id, req.body);
    res.send("Book updated");
  } catch (error) {
    res.status(500).send("Server error:" + error);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.send("Book deleted");
  } catch (error) {
    res.status(500).send("Server error:" + error);
  }
};

exports.listBooks = async (req, res) => {
  try {
    const books = await Book.find(req.query);
    res.json(books);
  } catch (error) {
    res.status(500).send("Server error:" + error);
  }
};
