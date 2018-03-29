const mongoose = require("mongoose")
const { Schema } = mongoose

const File = new Schema({
    key: {
        type: String,
        index: true
    },
    path: String,
    filename: String,
    mimeType: String,
    createTime: {
        type: Date,
        default: Date.now
    }
})

// const basePath = "/files/"

// File.pre("save", function(next) {
//     this.path = basePath + this.key
// })

module.exports = mongoose.model("file", File)