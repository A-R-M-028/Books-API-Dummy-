const mongoose = require("mongoose");

// Create book schema -> Key: Data Type , Data -> Inside mongodb
const BookSchema = mongoose.Schema({
  ISBN: "String",
  title: "String",
  pubDate: "String",
  language: "String",
  numPage: Number,
  author: [Number], // Author might be 2
  publicaton: [Number], // Publication must 1
  category: ["String"],
});

const BookModel = mongoose.model('books', BookSchema);
module.exports = BookModel;