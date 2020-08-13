const express = require('express');
const app = express()

//load mongoose
const mongoose = require('mongoose');

const bodyParser = require('body-parser');  

app.use(bodyParser.json());

//connect to database
mongoose.connect('mongodb+srv://samarth:kKYQlKy8FB4TvaDH@cluster0.v8m8b.mongodb.net/CustomersService?retryWrites=true&w=majority', { useUnifiedTopology: true })
                                            .then(res=>{
                                                console.log("Database Connected - Customers Service");
                                            })
                                            .catch(err=>console.log(err));

                                             
//loading our model
require('./CustomerModel');
const Customer = mongoose.model("Customer");
                                            

app.post('/customer', (req,res,next)=>{

    var newCustomer = {
        name:req.body.name,
        age:req.body.age,
        address:req.body.address        
    }

    var customer = new Customer(newCustomer);
    console.log(customer);
    customer.save().then(()=>{
        res.send("Customer Created");
    })
    .catch(err=>console.log(err));

})

//list all customers
app.get('/customers',(req,res,next)=>{

        //this will return all the books in collection
    Customer.find().then((customers)=>{
        // console.log(books);
        res.json(customers);
    })
    .catch(err=>console.log(err));
})


//To get Particular Customer 
app.get('/customer/:id',(req,res,next)=>{

    Customer.findById(req.params.id).then((cust)=>{

        if(cust)            //book is present, so we return its dataa
        {
            res.json(cust);
        }else{
            res.send("Invalid ID");
        }
    })
    .catch(err=>console.log(err));

})


//Delete a customer
app.delete("/customer/:id",(req,res,next)=>{

    Customer.findByIdAndRemove(req.params.id).then(()=>{
        res.send("Customer removed with success!")
    })
    .catch(err=>console.log(err));
})


app.listen(3001,()=>{
    console.log("Up and runnning - Customers Service");
})


