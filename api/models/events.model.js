const mongoose = require("mongoose");

const eventsSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    hostedBy:{
        type:String,
        required:true
    },
    link:{
        type:String,
        required:true
    },
})

const Events = mongoose.model("Events",eventsSchema);

module.exports = Events