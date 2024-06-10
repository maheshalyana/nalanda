const User = require("../models/User");
const Book = require("../models/Book");
const Borrow = require("../models/Borrow");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const resolvers = {
  users: () => User.find(),
  books: () => Book.find(),
  borrows: () => Borrow.find(),
  addUser: async ({ name, email, password, role }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role });
    await user.save();
    return user;
  },
  addBook: async ({ title, author, publicationDate, genre, copies }) => {
    const book = new Book({
      title,
      author,
      publicationDate,
      genre,
      copies,
    });
    await book.save();
    return book;
  },
  borrowBook: async ({ bookId }, context) => {
    if (!context.user) throw new Error("Unauthorized");
    const book = await Book.findById(bookId);
    if (book.copies <= 0) throw new Error("No copies available");
    book.copies -= 1;
    await book.save();
    const borrow = new Borrow({ userId: context.user._id, bookId });
    await borrow.save();
    return borrow;
  },
  returnBook: async ({ borrowId }) => {
    const borrow = await Borrow.findById(borrowId);
    if (!borrow) throw new Error("Borrow record not found");
    const book = await Book.findById(borrow.bookId);
    book.copies += 1;
    await book.save();
    borrow.returnDate = new Date();
    await borrow.save();
    return borrow;
  },
};

module.exports = resolvers;
