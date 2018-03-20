const mongoose = require("mongoose")
const { Schema } = mongoose

const User = new Schema({
    name: String,
    email: String,
    password: String,
})

module.exports = mongoose.model("user", User)