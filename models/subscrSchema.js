const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const subscrSchema = new mongoose.Schema({
    name: String,
    email:String,
    phone:{
        type:Number,
        }
}) ;
subscrSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("subscribe",subscrSchema);