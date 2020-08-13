//request is a library that allows our application to send requests(get and/or post) to another services.

const express = require('express');
const app = express()

//load mongoose
const mongoose = require('mongoose');

const axios = require('axios');

const bodyParser = require('body-parser'); 
app.use(bodyParser.json());

//connect to database
mongoose.connect('mongodb+srv://samarth:kKYQlKy8FB4TvaDH@cluster0.v8m8b.mongodb.net/OrdersService?retryWrites=true&w=majority', { useUnifiedTopology: true })
                                            .then(res=>{
                                                console.log("Database Connected - Orders Service");
                                            })
                                            .catch(err=>console.log(err));

//loading our model
require('./OrderModel');
const Order = mongoose.model("Order");


//create new order
app.post('/order', (req,res,next)=>{

    var newOrder = {
        CustomerID:mongoose.Types.ObjectId(req.body.CustomerID),
        BookID:mongoose.Types.ObjectId(req.body.BookID),
        initialDate:req.body.initialDate,
        deliveryDate:req.body.deliveryDate                
    }

    var order = new Order(newOrder);
    console.log(order);
    order.save().then(()=>{
        res.send("Order Created");
    })
    .catch(err=>console.log(err));
})


//To Get all Orders
app.get('/orders',(req,res,next)=>{

            //this will return all the Orders in collection
        Order.find().then((orders)=>{
            
            res.json(orders);
        })
        .catch(err=>console.log(err));
})


app.get("/order/:id",(req,res,next)=>{

    Order.findById(req.params.id).then((order)=>{

        if(order)            //order is present, so we return its dataa
        {
           //if order is valid , we need to send requests to other two services
           //For this , we need a library called 'axios'(allows to make http requests to any address)

           //get request to customers service
           axios.get("http://localhost:3001/customer/"+order.CustomerID)
                            .then((result)=>{
                                console.log("Customer Data : ",result.data);

                                var orderObject = {CustomerName : result.data.name,bookTitle:""}

                                axios.get("http://localhost:3000/book/"+order.BookID)
                                            .then((result)=>{
                                                console.log("Book Data : ",result.data);
                                                orderObject.bookTitle = result.data.title;

                                                res.json(orderObject)

                                            })
                                
                            });

        }else{
            res.sendStatus(404);
        }
    })
    .catch(err=>console.log(err));

})


app.listen(3002,()=>{
    console.log("Up and runnning - Orders Service");
})
