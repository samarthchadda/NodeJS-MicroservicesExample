const express = require('express');

//instance of express application
const app = express();

//load mongoose
const mongoose = require('mongoose');
//connect
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
    
})

app.listen(3000,()=>{
    console.log("Up and running! -- This is our Books service");
});

