const fs = require("fs")
const gm = require("gm")
// 缩略图后缀标记
const suffix = "_thumb"
// 缩略图文件夹
const thumbDir = "images/thumb"

module.exports = function getFile(key = "") {
    // 正常图片直接返回
    if (key.indexOf(suffix) === -1) {
        return fs.createReadStream(`images/${key}`)
    }

    key = key.replace(suffix, "")
    const thumbFile = `${thumbDir}/${key}`

    // 创建缩略图文件夹
    if (!fs.existsSync(thumbDir)) {
        fs.mkdirSync(thumbDir)
    }
    // 存在缩略图片直接返回文件流
    if (fs.existsSync(thumbFile)) {
        return fs.createReadStream(thumbFile)
    } else {
        // 否则降低图片大小保存，再返回
        let fileStream = gm(fs.createReadStream(`images/${key}`)).quality(10).stream()
        fileStream.pipe(fs.createWriteStream(thumbFile))
        return fileStream
    }
}