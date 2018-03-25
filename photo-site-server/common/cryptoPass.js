const crypto = require("crypto")

module.exports = function cryptoPass(str, salt) {
    let exist = !!salt

    if (!salt) {
        salt = Math.random().toString(36).slice(2, 12)
    }

    str = (str + salt).split("").sort().join("")
    let password = crypto.createHash("md5").update(str).digest("hex")

    // 新建用户则返回salt值
    if (!exist) {
        return [password, salt]
    }

    return password
}