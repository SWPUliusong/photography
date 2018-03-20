const mongoose = require("mongoose")
const { Schema } = mongoose

const Album = new Schema({
    dirname: String,
    count: {
        type: Number,
        default: 0
    },
    images: [String],
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
})

Album.pre("save", function (next) {
    if (!this.isNew) {
        this.updateTime = Date.now()
    }

    next()
})

module.exports = mongoose.model("album", Album)