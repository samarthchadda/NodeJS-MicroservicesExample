const mongoose = require('mongoose');

// A model  -> reference to our collection

            //model name, Schema(Defination of collection)
mongoose.model("Book",{
    title:{
        type:String,
        require:true
    },
    author:{
        type:String,
        require:true
    },
    noOfPages:{
        type:Number,
        require:false
    },
    publisher:{
        type:String,
        require:true
    }

});

