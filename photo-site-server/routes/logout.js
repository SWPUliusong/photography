exports.get = ctx => {
    let user = ctx.session.user
    if (user) {
        ctx.session.user = null
    }

    ctx.status = 204
    ctx.body = null
}