const fs = require("fs")
const imageinfo = require("imageinfo")

exports.post = [
    (ctx, next) => {
        let { } = ctx.query
    }
]

exports.get = (ctx, next) => {
    const { key } = ctx.params
    if (!key) {
        return next()
    }

    let stream = fs.createReadStream(`images/${key}.jpg`)
    console.log(fs.readdirSync("images"))
    // ctx.type = "image/jpg"
    ctx.body = stream
}