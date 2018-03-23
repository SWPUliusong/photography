const fs = require("fs")
const mime = require("mime-types")
const imageInfo = require("imageinfo")
const { File, Album } = require("../models")

const basePath = "/files/"

exports.post = (ctx, next) => {
    let { albumId } = ctx.query

    if (!albumId) {
        ctx.throw(400, "相册id缺失！！！")
    }

    let key = Math.random().toString(36).slice(2, 12)

    // let ext = imageInfo(ctx.request.body.file)
    
    // Album.update({ id: albumId }, {$addToSet: {images: `${basePath}${key}.${12}`}})
}

exports.get = (ctx, next) => {
    const { key } = ctx.params
    if (!key) {
        return next()
    }

    ctx.type = mime.contentType(key)
    ctx.body = fs.createReadStream(`images/${key}`)
}