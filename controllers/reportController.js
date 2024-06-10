const Borrow = require("../models/Borrow");
const Book = require("../models/Book");

exports.getMostBorrowedBooks = async (req, res) => {
  try {
    const books = await Borrow.aggregate([
      { $group: { _id: "$bookId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]).lookup({
      from: "books",
      localField: "_id",
      foreignField: "_id",
      as: "book",
    });
    res.json(books);
  } catch (error) {
    res.status(500).send("Server error:" + error);
  }
};

exports.getActiveMembers = async (req, res) => {
  try {
    const members = await Borrow.aggregate([
      { $group: { _id: "$userId", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 },
    ]).lookup({
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "user",
    });
    res.json(members);
  } catch (error) {
    res.status(500).send("Server error:" + error);
  }
};

exports.getBookAvailability = async (req, res) => {
  try {
    const books = await Book.find({ copies: { $gt: 0 } });
    res.json(books);
  } catch (error) {
    res.status(500).send("Server error:" + error);
  }
};
