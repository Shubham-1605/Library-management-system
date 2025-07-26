const express = require('express');  //express framework for routing
const bodyParser = require('body-parser');  // to read form data
const app = express(); // create express app
const PORT = process.env.PORT || 3000; // app will run on localhost 3000

// Sample Book Data
let books = [                              // array of book objects 
    {                                      //it act like a temporary database in memory
        bookName: "Rudest Book Ever",
        bookAuthor: "Shwetabh Gangwar",
        bookPages: 200,
        bookPrice: 240,
        bookState: "Available"
    },
    {
        bookName: "Do Epic Shit",
        bookAuthor: "Ankur Wariko",
        bookPages: 250,
        bookPrice: 240,
        bookState: "Available"
    }
];

// Middleware
app.set('view engine', 'ejs');   //use ejs to render html templete
app.use(bodyParser.json());      // handle json data
app.use(bodyParser.urlencoded({ extended: true }));  // handle form data sent via post from html 

// Home Route - Display Books
app.get("/", (req, res) => {            //When the user opens the site (GET /), the app renders home.ejs and sends the book data.
    res.render("home", { data: books });
});

// Add Book Route
app.post("/", (req, res) => {   // this form will triger when user submit the form to add a new book
    const newBook = {
        bookName: req.body.bookName,     //req.body contains data from the form (name, author, etc.)
        bookAuthor: req.body.bookAuthor,
        bookPages: req.body.bookPages,
        bookPrice: req.body.bookPrice,
        bookState: "Available"
    };

    books.push(newBook);               // books.push(newBook) adds the book to the array.
    res.render("home", { data: books });
});

// Issue Book Route                 //If a book is issued, this route changes the bookState to "Issued" for that book.
app.post("/issue", (req, res) => {
    const requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName === requestedBookName) {
            book.bookState = "Issued";
        }
    });
    res.render("home", { data: books });
});

// Return Book Route
app.post("/return", (req, res) => {               //this route makes the book available again.
    const requestedBookName = req.body.bookName;
    books.forEach(book => {
        if (book.bookName === requestedBookName) {
            book.bookState = "Available";
        }
    });
    res.render("home", { data: books });
});

// Delete Book Route
app.post("/delete", (req, res) => {              //Deletes a book from the list by filtering it out.
    const requestedBookName = req.body.bookName;
    books = books.filter(book => book.bookName !== requestedBookName); //filter() keeps all books except the one with the matching name.
    res.render("home", { data: books });
});

// Start Server
app.listen(PORT, () => {     //Starts the server at http://localhost:3000
    console.log(`App is running on port ${PORT}`);
});