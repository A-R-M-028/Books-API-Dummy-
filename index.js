//       *******************Here it is book management project********************
const express = require("express"); // Import express npm i express first
const database = require("./database"); //Import database.js
const bodyParser = require("body-parser"); // For POST request

// Initialized express
const booky = express();
booky.use(bodyParser.urlencoded({ extended: true })); // Parse the package or encode und. format
booky.use(bodyParser.json()); //Everrything as json

//                                        GET REQUEST
/*
// This is Prefessional to use and handy as well -> Use comments for other & for u as well
Route           /
Description     Get all the books
Access          Public
Parameter       None
Methods         Get
*/

booky.get("/", (req, res) => {
  return res.json({ Book_Data: database.books });
});

/*
Route           /is
Description     Get specific book on ISBN
Access          Public
Parameter       isbn
Methods         Get
*/

// filter -> Specific something
// Use backtick for text and script for no confliction

booky.get("/is/:isbn", (req, res) => {
  // : -> Param i
  const getSpecificBook = database.books.filter(
    (book) => book.ISBN === req.params.isbn
  );
  if (getSpecificBook.length === 0) {
    return res.json({
      error: `No  book found for the ISBN of ${req.param.isbn}`, // $ -> Dynamic change
    });
  }
  // else
  return res.json({ AnyNameBook: getSpecificBook }); // {This is for array of obj}
});

/*
Route           /c
Description     To get list of books based on category
Access          Public
Parameter       category
Methods         Get
*/

booky.get("/c/:category", (req, res) => {
  const getSpecificBook = database.books.filter(
    (book) => book.category.includes(req.params.category) // includes -> Check if it is avl in arr
  );
  if (getSpecificBook.length === 0) {
    return res.json({ error: `No book is found ${req.params.category}` });
  }
  return res.json({ anyMyBook: getSpecificBook });
});

/*
Route           /language
Description     To get a list of book based on languages
Access          Public
Parameter       lang
Methods         Get
TODO
*/

booky.get("/language/:lang", (req, res) => {
  const getBookOnLang = database.books.filter(
    (book) => book.language === req.params.lang
  );
  return res.json({ Book: getBookOnLang });
});

/*
Route           /author
Description     To get all the authors 
Access          Public
Parameter       None
Methods         Get
*/

booky.get("/author", (req, res) => {
  return res.json({ anyNameAuth: database.author });
});

/*
Route           /authorName
Description     To get a specific author, from bookName
Access          Public
Parameter       book
Methods         Get
TODO
*/

booky.get("/authorName/:book", (req, res) => {
  const getBookOnLang = database.author.filter((book) =>
    book.books.includes(req.params.book)
  );
  return res.json({ Book: getBookOnLang });
});

/*
Route           /author/book/
Description     To get a list of authors based on book ISBN
Access          Public
Parameter       isbn
Methods         Get
*/

booky.get("/author/book/:isbn", (req, res) => {
  const getSpecificAuthor = database.author.filter((author) =>
    author.books.includes(req.params.isbn)
  );
  if (getSpecificAuthor.length === 0) {
    return res.json({
      error: `No author found for book of ${req.params.isbn}`,
    });
  }
  return res.json({ anyNameAuth: getSpecificAuthor });
});

/*
Route           publication
Description     To get all the publications
Access          Public
Parameter       None
Methods         Get
*/

booky.get("/publication", (req, res) => {
  return res.json({ anyNamePublication: database.publication });
});

/*
Route           publication
Description     To get a specific publications
Access          Public
Parameter       None
Methods         Get
//TODO
*/

booky.get("/publication/usingIndex/:book", (req, res) => {
  const getListOfPublication = database.publication.filter((pub) =>
    pub.books.includes(req.params.book)
  );

  if (getListOfPublication.length === 0) {
    return res.json({
      error: `No publication found for book with ISBN ${req.params.book}`,
    });
  }

  const firstPublication = getListOfPublication[0]; // To access the first index
  return res.json({ publication: firstPublication });
});

booky.get("/publication/usingBookName/:book", (req, res) => {
  // const { book } = req.params; -> Same as -> const book = req.params.book;
  // const publication = database.publication.find((pub) => pub.books.includes(book));
  const publication = database.publication.find((pub) =>
    pub.books.includes(req.params.book)
  );

  if (!publication) {
    // Not get
    return res.json({
      error: `No publication found for book with ISBN ${book}`,
    });
  }

  return res.json({ publication: publication });
});

/*
Route           publication
Description     To get a list of publications based on the book
Access          Public
Parameter       None
Methods         Get
//TODO
*/

booky.get("/publication/list/:book", (req, res) => {
  const getListOfPublication = database.publication.filter((pub) =>
    pub.books.includes(req.params.book)
  );
  if (getListOfPublication.length === 0) {
    return res.json({
      error: `No author found for book of ${req.params.book}`,
    });
  }
  return res.json({ anyNameAuth: getListOfPublication });
});

//                                        POST REQUEST

/*
Route           /book/new
Description     Add new book
Access          Public
Parameter       None
Methods         Post
*/

booky.post("/book/new", (req, res) => {
  const newBook = req.body;
  database.books.push(newBook); // A new book object is inserted from API
  return res.json({ updatedBooks: database.books });
});

/*
Route           /author/new
Description     Add new author
Access          Public
Parameter       None
Methods         Post
*/

booky.post("/author/new", (req, res) => {
  const newAuthor = req.body;
  database.author.push(newAuthor); // A new author is inserted from API
  return res.json(database.author);
});

/*
Route           /author/new
Description     Add publication
Access          Public
Parameter       None
Methods         Post
*/

booky.post("/publication/new", (req, res) => {
  const newPublication = req.body;
  database.publication.push(newPublication);
  return res.json(newPublication);
});

//                                        PUT REQUEST
/*
Route           /publication/update/book/
Description     Update OR Add a new  publication
Access          Public
Parameter       isbn
Methods         Put
*/

booky.put("/publication/update/book/:isbn", (req, res) => {
  // Dont use map and filter -> It returens something, use for-each loop (Not returns anything)
  database.publication.forEach((eachObjOrPub) => {
    // pubID -> Inside postman  "pubID" : "4"
    if (eachObjOrPub.id === req.body.pubID) {
      //
      // Update books in pub
      return eachObjOrPub.books.push(req.params.isbn);
    }
  });
  // Update new ID in the book database
  // Not return any value -> forEach
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publicaton = req.body.pubID;
      return;
    }
  });
  return res.json({
    // Will be shown at postman output/response
    books: database.books,
    publication: database.publication,
    message: "Successfully Updated",
  });
});

//                                        DELETE REQUEST
/*
Route           /publication/update/book/
Description     Delete a book
Access          Public
Parameter       isbn
Methods         Delete
*/

booky.delete("/book/delete/:isbn", (req, res) => {
  // Take which is not in list and not take which is in the list, then create a new array
  // Exclude which is available in the array or in the object itself
  const updatedBooks = database.books.filter(
    (book) => book.ISBN !== req.params.isbn
  );
  database.books = updatedBooks;
  return res.json({ UpdatedBook: database.books });
});

/*
Route           /books/book/delete/author
Description     Delete author from a book
Access          Public
Parameter       isbn, authID
Methods         Delete
TODO
*/

booky.delete("/books/book/delete/author/:isbn/:authID", (req, res) => {
  // Update the book of database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      const listOfAuthor = book.author.filter(
        // If returnnig true each then stored in new array, otherwise it will ignored that.
        (eachAuthor) => eachAuthor !== parseInt(req.params.authID) // parseInt -> safe to play, typecast to int
      );
      book.author = listOfAuthor;
      return; // This is good practice
    }
  });
  return res.json({
    books: database.books,
    author: database.author,
    message: "Author was deleted",
  });
});

/*
Route           /book/delete/author
Description     Delete author from book and releted book from author
Access          Public
Parameter       isbn, authID
Methods         Delete
TODO
*/

booky.delete("/book/delete/author/:isbn/:authID", (req, res) => {
  // Update the book of database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      const listOfAuthor = book.author.filter(
        (eachAuthor) => eachAuthor !== parseInt(req.params.authID)
      );
      book.author = listOfAuthor;
      return; // This is good practice
    }
  });
  // Update the author database
  database.author.forEach((eachAuthor) => {
    if (eachAuthor.id === parseInt(req.params.authID)) {
      const listOfBook = eachAuthor.books.filter(
        (book) => book !== req.params.isbn
      );
      eachAuthor.books = listOfBook;
      return;
    }
  });
  return res.json({
    books: database.books,
    author: database.author,
    message: "Author was deleted",
  });
});

booky.listen(3000, () => {
  console.log("Server is Up & Running");
});

/*                                                      #NOTES#
Update or change -> forEach -> Not return anything
Return something -> filter, map -> Always return a new array
find -> Unique
filter -> Condition
map -> all elements
includes -> Specific value is present in an array
*/
