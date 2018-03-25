const fs = require("fs")
const Busboy = require("busboy")
const mime = require("mime-types")
const path = require("path")
const crypto = require("crypto")

const basePath = "/files/"

function getKey() {
    let str = Math.random().toString(36)
    return crypto.createHash("md5").update(str).digest("hex")
}

module.exports = class FileSaver extends Busboy {
    constructor(readStream, opt) {
        super(opt)
        readStream.pipe(this)
    }

    save() {
        // 生成唯一key
        const key = getKey()
        // 文件信息
        const fileInfo = {
            key,
            path: basePath + key + '.'
        }

        return new Promise(resolve => {
            this.on('file', function (fieldname, file, filename, size, mimeType) {
                fileInfo.path += mime.extension(mimeType)
                Object.assign(fileInfo, { filename, size, mimeType })
                file.pipe(fs.createWriteStream(`images/${path.basename(fileInfo.path)}`));
            });
            this.on('finish', () => resolve(fileInfo));
        })
    }
}