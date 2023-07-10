## We dont have dataset of DB so we use array of object here

# Requiremenets for our project

This is like checklist
Comments are frequent and necessary to use in api

->We are a book magmt company

Coollection books, author, and publications

Books
ISBN, Title, Pub date, Language, Num page, Author[], Category

Authors
ID, Name, Books[]

Publications
ID, Name, Books

We have to Design and Code and API over this

# GET REQUEST

1. BOOKS
   We need an api
   To get all the books
   To get specific books
   To get list of books based on category
   To get a list of book based on languages

2. AUTHORS
   We need an api
   To get all the authors
   To get a specific authors
   To get a list of authors based on books

3. PUBLICATIONS
   We need an API
   To get all the publications
   To get a specific publications
   To get a list of publications based on the book

# POST REQUEST

1. Add a new book
2. Add new publication
3. Addd new author

# PUT

Update book details if author is changed

# DELETE

1. Delete a book
2. Delete author from a book
3. Delete author from book and releted book from author


##                                     MONGODB
<!-- 
Schema -> Blueprint of how data has to be constructed, not actual data (In js file not in mongodb) -> Key: Data type
You cant use schema directly only can passed by model
MongoDB is Schema less
Mongoose has schema 
mongoose -> Validation Purpose, relationship with other data
Model -> Documentation model of object or database or mongodb
Workflow -> Schema - Model - Use them
Collection -> Database
-->