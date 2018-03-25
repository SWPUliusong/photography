const { User } = require("../models")
const cryptoPass = require("../common/cryptoPass")

exports.post = async ctx => {
    let { name, password } = ctx.request.body

    let user = await User.findOne({ name })
    if (!user) {
        return ctx.throw(400, "用户名错误！！！")
    }

    if (user.password !== cryptoPass(password, user.salt)) {
        return ctx.throw(400, "密码错误！！！")
    }

    user = {
        id: user._id,
        name: user.name,
        expires: Date.now() + 1000 * 60 * 59
    }

    ctx.session.user = user
    ctx.body = user
}

// 验证是否登录
exports.get = ctx => {
    let { user } = ctx.session
    if (!user) {
        return ctx.throw(401, "尚未登录或登录已过期")
    }

    ctx.body = user
}