const Koa = require("koa")
const logger = require('koa-logger')
const staticServer = require("koa-static")
const bodyParser = require("koa-bodyparser")
const session = require("koa-session")
const frouter = require("koa-paths-router")

// 连接数据库,创建管理员账号
require("./admin")

const app = new Koa()

// 对session进行签名
app.keys = ["yang yonghuai"]

app.use(logger())

// 处理错误
app.use((cxt, next) => {
    try {
        return next()
    } catch (err) {
        console.error(err)
    }
})

app.use(staticServer("./public", {
    maxage: 1000 * 60 * 60 * 24,
    defer: false
}))

app.use(session({
    key: "photo-site",
    maxAge: 1000 * 60 * 60
}, app));

app.use(bodyParser())

// 拦截未登录用户
app.use((ctx, next) => {
    let user = ctx.session.user
    if (!user && !(/(login)|(files\/?$)/).test(ctx.url)) {
        return ctx.throw(401, "用户未登录")
    }

    return next()
})

// 自动挂载路由
app.use(frouter(app, {
    root: "./routes",
    _: true
}))

app.listen(5000, () => console.log(`listening at 5000`))