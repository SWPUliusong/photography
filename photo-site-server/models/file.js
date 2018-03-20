const mongoose = require("mongoose")
const { Schema } = mongoose

const File = new Schema({
    key: {
        type: String,
        index: true
    },
    createTime: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("file", File)