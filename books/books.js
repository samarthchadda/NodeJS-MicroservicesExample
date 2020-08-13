const express = require('express');

//instance of express application
const app = express();

const bodyParser = require('body-parser');  //to save data from request

app.use(bodyParser.json());

//load mongoose
const mongoose = require('mongoose');

require('./BookModel');
const Book = mongoose.model("Book");

//connect to database
mongoose.connect('mongodb+srv://samarth:kKYQlKy8FB4TvaDH@cluster0.v8m8b.mongodb.net/BooksService?retryWrites=true&w=majority', { useUnifiedTopology: true })
                                            .then(res=>{
                                                console.log("connected to Database!!");
                                            })
                                            .catch(err=>console.log(err));



app.get('/',(req, res, next)=>{
    res.send("This is the books service!");
})

//'Create Book' functionality
app.post('/book',(req,res,next)=>{
   
    console.log(req.body);   //printing JSON data send by post request

    //saving book in our database
    var newBook = {
        title:req.body.title,
        author:req.body.author,
        noOfPages:req.body.noOfPages,
        publisher:req.body.publisher        
    };

    //model instance
        //creating a new book with data from POST request
    var book = new Book(newBook);

    book.save().then(()=>{
        console.log("New Book Created!");
    }).catch(err=>console.log(err));

    res.send("Book Created with success");

})


//To Get all Books
app.get('/books',(req,res,next)=>{

        //this will return all the books in collection
    Book.find().then((books)=>{
        // console.log(books);
        res.json(books);
    })
    .catch(err=>console.log(err));

})


//To get Particular Book 
app.get('/book/:id',(req,res,next)=>{

    Book.findById(req.params.id).then((book)=>{

        if(book)            //book is present, so we return its dataa
        {
            res.json(book);
        }else{
            res.sendStatus(404);
        }
    })
    .catch(err=>console.log(err));

})


//Delete a Book
app.delete("/book/:id",(req,res,next)=>{

    Book.findByIdAndRemove(req.params.id).then(()=>{
        res.send("Book removed with success!")
    })
    .catch(err=>console.log(err));

})


app.listen(3000,()=>{
    console.log("Up and running! -- This is our Books service");
});

