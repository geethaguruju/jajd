const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const volunSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        index:true,
        sparse:true
    },
    phone:{type:Number,
        
    },
    location: String,
    message: String
}) ;
volunSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("volunteer",volunSchema);