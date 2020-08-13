//request is a library that allows our application to send requests(get and/or post) to another services.

const express = require('express');
const app = express()



app.listen(3002,()=>{
    console.log("Up and runnning - Orders Service");
})
