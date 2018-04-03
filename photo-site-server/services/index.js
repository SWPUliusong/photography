const fs = require("fs")

const services = {}

fs.readdirSync("services").forEach(file => {
    const key = file.split(".")[0]
    const method = require(`./${file}`)
    services[key] = method
})

module.exports = services
