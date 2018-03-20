const mongoose = require("mongoose")
mongoose.Promise = require("bluebird")
mongoose.connect('mongodb://localhost:27017/photo-site')

module.exports = {
    User: require("./user"),
    File: require("./file"),
    Album: require("./album"),
}