const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const borrowSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  borrowDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
});

module.exports = mongoose.model("Borrow", borrowSchema);
