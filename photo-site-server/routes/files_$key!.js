const fs = require("fs")
const mime = require("mime-types")
const del = require("del")

const FileSaver = require("../common/FileSaver")
const { Album, File } = require("../models")

const services = require("../services")

// 上传相片
exports.post = async (ctx, next) => {
    let { albumId: _id } = ctx.query

    if (!_id) {
        return ctx.throw(400, "参数albumId缺失！！！")
    }

    let album = await Album.findById(_id)
    if (!album) {
        return ctx.throw(404, "该相册并不存在！！！")
    }

    const fileSaver = new FileSaver(ctx.req, { headers: ctx.headers })

    const fileInfo = await fileSaver.save()

    await Promise.all([
        Album.update({ _id }, { $addToSet: { images: fileInfo.path } }),
        File.create(fileInfo)
    ])

    ctx.status = 201
    ctx.body = null
}

// 获取单张相片或整个相片
exports.get = [
    (ctx, next) => {
        const { key } = ctx.params
        if (!key) {
            return next()
        }

        ctx.type = mime.contentType(key)
        ctx.set("Cache-Control", "max-age=64800")
        ctx.body = services.getFile(key)
    },
    async ctx => {
        let { page, size } = ctx.query
        page = parseInt(page) || 1
        size = parseInt(size) || 10

        let [imgList, total] = await Promise.all([
            File
                .find()
                .skip((page - 1) * size)
                .limit(size)
                .select("path")
                .sort("-createTime")
                .exec(),
            Album.count()
        ])

        imgList = imgList.map(img => img.path)

        ctx.body = {
            imgList,
            page: {
                size,
                total,
                current: page,
            }
        }
    }
]

// 删除相片
exports.delete = async ctx => {
    const { key } = ctx.params
    const { albumId: _id } = ctx.query
    if (!key || !_id) {
        return ctx.throw(400, "参数缺失！！！")
    }

    await Promise.all([
        Album.update({ _id }, { $pull: { images: { $regex: key } } }),
        File.remove({ key }),
        del([`images/${key}.*`])
    ])

    ctx.status = 204
    ctx.body = null
}