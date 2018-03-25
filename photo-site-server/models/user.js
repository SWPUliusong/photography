const mongoose = require("mongoose")
const { Schema } = mongoose

const User = new Schema({
    name: String,
    email: {
        type: String,
        default: null
    },
    password: String,
    salt: String,
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
})

User.pre("save", function () {
    if (!this.isNew) {
        this.updateTime = Date.now()
    }
})

module.exports = mongoose.model("user", User)