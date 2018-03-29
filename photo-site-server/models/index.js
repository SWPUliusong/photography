const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")
mongoose.connect('mongodb://localhost:27017/photo-site')

const Album = require("./album")

// 劫持更新方法
const orignUpdate = Album.update.bind(Album)
Album.update = function (conditions, doc, cb) {
    doc.$set = { updateTime: Date.now() }
    return orignUpdate(conditions, doc, cb)
}

module.exports = {
    Album,
    User: require("./user"),
    File: require("./file"),
}