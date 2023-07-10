const mongoose = require("mongoose");

// Create book schema -> Key: Data Type , Data -> Inside mongodb
const AuthorSchema = mongoose.Schema(
    {
        id: Number,
        name: "String",
        books: ["String"]
      }
);

const AuthorModel = mongoose.model('authors', AuthorSchema);
module.exports = AuthorModel;