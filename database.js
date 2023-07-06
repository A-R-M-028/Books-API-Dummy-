const books = [
  {
    ISBN: "12345Book1",
    title: "Tesla",
    pubDate: "2021.08.05",
    language: "en",
    numPage: 250,
    author: [1, 2], // Author might be 2
    publicaton: [1], // Publication must 1
    category: ["tech", "space", "education"]
  }
];

const author = [
  {
    id: 1,
    name: "Chintu",
    books: ["12345Book", "SecretBook"],
  },
  {
    id: 2,
    name: "Mintu",
    books: ["12345Book"],
  },
];

const publication = [
  {
    id: 1,
    name: "Writex",
    books: ["12345Book", "12345"],
  },
  {
    id: 2,
    name: "Reatex",
    books: [""],
  },
];

// To export this dataset -> This is array of object
module.exports = { books, author, publication };
