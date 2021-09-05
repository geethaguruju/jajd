const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const emergencySchema = new mongoose.Schema({
    name:String,
   phone:{
       type:Number,
       
    }
}) ;
emergencySchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("emergency",emergencySchema);