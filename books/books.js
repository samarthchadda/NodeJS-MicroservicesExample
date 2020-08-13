const express = require('express');

//instance of express application
const app = express();

app.get('/',(req, res, next)=>{
    res.send("This is our main endpoint!");
})

app.listen(3000,()=>{
    console.log("Up and running! -- This is our Books service");
});

