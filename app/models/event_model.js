const mongoose = require("mongoose");

const Event = mongoose.model(
    "Event",
    new mongoose.Schema({
        title: String,
        address: String,
        description: String,
        date:Date,
        manager:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    })
);

module.exports = Event;