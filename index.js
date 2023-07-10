//       *******************Here it is book management project********************
// Env file
require("dotenv").config();
// console.log(process.env);

const express = require("express"); // Import express npm i express first
const mongoose = require("mongoose"); // Connect to db
const bodyParser = require("body-parser"); // For POST request

// Database
const database = require("./database/database"); //Import database.js
// Model
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");

// Initialized express
const booky = express();
booky.use(bodyParser.urlencoded({ extended: true })); // Parse the package or encode und. format
booky.use(bodyParser.json()); //Everrything as json

/*
//                                        Database -> Mongodb                              
  await mongoose
  .connect("mongodb://your_mongodb_url")
  .then(() => console.log("Connected"));
  const mongoose = require('mongoose');
*/

// Url is moved to <.env> file

// Replace <password> and test(DB_name) with the actual password for your MongoDB Atlas cluster
// Use env var for security reason of that link -> use it top most line

mongoose
  .connect(process.env.mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
    // Perform any further operations or start your application logic here
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

//                                        Getting Started

// TEMPLATE
booky.get("/", async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

// TEMPLATE
booky.get("/", async (req, res) => {
  const getAllPublication = await PublicationModel.find();
  return res.json(getAllPublication);
});

// TEMPLATE
booky.get("/", async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});

// POST
// Not mandatory to use async and also for await
booky.post("/book/new", async (req, res) => {
  const { newBook } = req.body;
  const addNewBook = BookModel.create(newBook); // A new book object is inserted from API
  return res.json({
    author: addNewBook,
    message: "Book Created Successfully",
  });
});

// POST
booky.post("/book/author/new", async (req, res) => {
  const { newAuthor } = req.body;
  const addnewAuthor = AuthorModel.create(newAuthor);
  return res.json({
    books: addnewAuthor,
    message: "Author Created Successfully",
  });
});

// POST
booky.post("/book/publication/new", async (req, res) => {
  const { newPublication } = req.body;
  const addnewPublication = PublicationModel.create(newPublication);
  return res.json({
    books: addnewPublication,
    message: "Publication Created Successfully",
  });
});

// POST
booky.get("/is/:isbn", async (req, res) => {
  // : -> Param i
  const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });
  // !0 -> 1, !1 -> 0
  if (!getSpecificBook) {
    return res.json({
      error: `No  book found for the ISBN of ${req.param.isbn}`, // $ -> Dynamic change
    });
  }
  // else
  return res.json({ AnyNameBook: getSpecificBook }); // {This is for array of obj}
});

// POST
booky.get("/c/:category", async (req, res) => {
  const getSpecificBook = await BookModel.findone({
    category: req.params.category,
  });
  if (!getSpecificBook) {
    return res.json({ error: `Category is found ${req.params.category}` });
  }
  return res.json({ anyMyBook: getSpecificBook });
});

// PUT
booky.put("/book/update/:isbn", async (req, res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      // fetch the isbn
      ISBN: req.params.isbn,
    },
    {
      // bookTitle will pass from API
      title: req.body.bookTitle,
    },
    {
      // You want to see it in the front end
      new: true,
    }
  );
  return res.json({
    books: updatedBook,
    message: "Book Created Successfully",
  });
});

// PUT
booky.put("/book/author/update/:isbn", async (req, res) => {
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      // fetch the isbn
      ISBN: req.params.isbn,
    },
    {
      // bookTitle will pass from API
      $addToBook: {
        authors: req.body.newAuthor,
      },
    },
    {
      // You want to see it in the front end
      new: true,
    }
  );
  // Update the author database
  const updatedAuthor = AuthorModel.findOneAndUpdate(
    {
      id: req.body.newAuthor,
    },
    {
      $push: {
        books: req.params.isbn,
      },
    },
    {
      new: true,
    }
  );
  return res.json({
    books: updatedBook,
    message: "Book Created Successfully",
  });
});

// DELETE
booky.delete("/book/delete/:isbn", async (req, res) => {
  const updatedBookDatabase = await BookModel.findOneAndDelete(
    {
      ISBN: req.params.isbn
    }
  );
  return res.json({
    books: updatedBookDatabase
  })
});

// ----------------------------------------------------------------------------------------------------------------------------
// YOU ARE CREATING COLLECTION IN MONGODB == YOU ARE CAREATING DATABASES
// Inside api
// {
//   "newAuthor": {
//     "id": 1,
//     "name": "Chintu",
//     "books": [
//       "12345Book",
//       "SecretBook"
//     ]
//   }
// }

// {
//   "newBook":
//   {
//     ISBN: "12345Book1",
//     title: "Tesla",
//     pubDate: "2021.08.05",
//     language: "en",
//     numPage: 250,
//     author: [1, 2], // Author might be 2
//     publicaton: [1], // Publication must 1
//     category: ["tech", "space", "education"]
//   }
// }

// {
//  "newPublication":
// {
//   id: 1,
//   name: "Writex",
//   books: ["12345Book", "12345"],
// }

// }

// ------------------------------------------------------------------------------------------------------------------------------

// LISTENENER
booky.listen(3000, () => {
  console.log("Server is Up & Running");
});
