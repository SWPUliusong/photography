const { Album } = require("../models")

exports.post = async ctx => {
    let { dirname } = ctx.request.body

    let album = await Album.findOne({ dirname })
    if (!!album) {
        return ctx.throw(403, '相册已存在');
    }

    album = await Album.create({ dirname })

    ctx.body = album
}

exports.get = [
    async (ctx, next) => {
        let { id } = ctx.params

        if (id) {
            return next()
        }

        let albums = await Album.find().select("_id dirname count images").exec()

        albums = albums.map(doc => {
            let {
                _id: id,
                dirname,
                count,
                images: [lastest]
            } = doc.toObject()

            return { id, dirname, count, lastest }
        })

        ctx.body = albums
    },
    async ctx => {
        let { id } = ctx.params

        let album = await Album.findById(id)

        if (!album) {
            return ctx.throw(404, '相册不存在');
        }

        ctx.body = album
    }
]

exports.delete = async ctx => {
    let { id } = ctx.params

    if (!id) {
        return ctx.throw(400, "参数缺失，缺少相册id")
    }

    
}