const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

exports.borrowBook = async (req, res) => {
  const { bookId } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (book.copies <= 0) return res.status(400).send("No copies available");
    book.copies -= 1;
    await book.save();
    const borrow = new Borrow({ userId: req.user.userId, bookId });
    await borrow.save();
    res.status(201).send("Book borrowed with id " + borrow._id);
  } catch (error) {
    res.status(500).send("Server error:" + error);
  }
};

exports.returnBook = async (req, res) => {
  const { borrowId } = req.body;
  try {
    const borrow = await Borrow.findById(borrowId);
    if (!borrow) return res.status(404).send("Borrow record not found");
    if (borrow.returnDate) return res.status(400).send("Book already returned");
    const book = await Book.findById(borrow.bookId);
    book.copies += 1;
    await book.save();
    borrow.returnDate = new Date();
    await borrow.save();
    res.send("Book returned");
  } catch (error) {
    res.status(500).send("Server error:" + error);
  }
};

exports.borrowHistory = async (req, res) => {
  try {
    const history = await Borrow.find({ userId: req.user.userId }).populate(
      "bookId"
    );
    res.json(history);
  } catch (error) {
    res.status(500).send("Server error:" + error);
  }
};
