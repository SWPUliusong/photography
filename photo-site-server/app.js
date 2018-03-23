const Koa = require("koa")
const logger = require('koa-logger')
const staticServer = require("koa-static")
const bodyParser = require("koa-bodyparser")
const session = require("koa-session")
const frouter = require("koa-paths-router")

// 连接数据库
require("./models")

const app = new Koa()

// 对session进行签名
app.keys = ["yang yonghuai"]

app.use(logger())

// 处理错误
app.use((cxt, next) => {
    try {
        return next()
    } catch (err) {
        console.log(err)
        cxt.status = err.status || 500
        cxt.body = {
            msfasdfasdfg: err.message,
            asdfasfasf: 145156,
            asreteryer:14254523614,
        }
    }
})

app.use(staticServer("./public", {
    maxage: 1000 * 60 * 60 * 24,
    defer: false
}))

app.use(session({
    key: "photo-site",
    maxAge: 1000 * 60 * 60 * 24
}, app));

app.use(bodyParser())
// 自动挂载路由
app.use(frouter(app, {
    root: "./routes",
    _: true
}))

app.listen(5000, () => console.log(`listening at 5000`))