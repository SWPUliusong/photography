const { Album, File } = require("../models")
const del = require("del")

// 新建相册
exports.post = async ctx => {
    let { dirname } = ctx.request.body

    let album = await Album.findOne({ dirname })
    if (!!album) {
        return ctx.throw(403, '相册已存在');
    }

    await Album.create({ dirname })

    ctx.status = 201
    ctx.body = null
}

// 获取全部或单个相册信息
exports.get = [
    // 获取全部相册信息
    async (ctx, next) => {
        let { id } = ctx.params

        let { page, size } = ctx.query
        page = parseInt(page) || 1
        size = parseInt(size) || 12

        if (id) {
            // 若存在id，则交给下游获取单个信息
            return next()
        }

        let [albums, total] = await Promise.all([
            Album
                .find()
                .skip((page - 1) * size)
                .limit(size)
                .select("_id dirname images")
                .sort("-createTime")
                .exec(),
            Album.count()
        ])


        albums = albums.map(doc => {
            let {
                _id: id,
                dirname,
                images,
            } = doc.toObject()

            let count = images.length
            let lastest = images[count - 1].replace(".", "_thumb.")

            return { id, dirname, count, lastest }
        })

        ctx.body = {
            albums,
            page: {
                size,
                total,
                current: page,
            }
        }
    },
    // 获取单个相册详情
    async ctx => {
        let { id } = ctx.params

        let album = await Album.findById(id)

        if (!album) {
            return ctx.throw(404, '相册不存在');
        }

        album = album.toObject()
        album.images.reverse()
        album.thumbImages = album.images.map(src => {
            return src.replace(".", "_thumb.")
        })

        ctx.body = album
    }
]

// 删除相册
exports.delete = async ctx => {
    let { id } = ctx.params

    if (!id) {
        return ctx.throw(400, "参数缺失，缺少相册id")
    }

    const album = await Album.findById(id)

    if (album) {
        await Promise.all([
            Album.remove({ _id: id }),
            File.remove({ path: { $in: album.images } }),
            del(album.images.map(img => {
                return img.replace("/files", "images")
            }))
        ])
    }

    ctx.status = 204
    ctx.body = null
}

// 相册重命名
exports.put = async ctx => {
    let { id: _id } = ctx.params
    let { dirname } = ctx.request.body

    if (!_id) {
        return ctx.throw(400, "url参数错误")
    }

    let album = await Album.findOne({ dirname })
    if (!!album) {
        return ctx.throw(403, '相册已存在');
    }

    await Album.update({ _id }, { $set: { dirname } })

    ctx.body = null
}