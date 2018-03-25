const { User } = require("./models")
const cryptoPass = require("./common/cryptoPass")

async function createUser() {
    let user = await User.findOne({ name: "yangyonghuai" })
    if (!user) {
        let [password, salt] = cryptoPass("111111")
        await User.create({ name: "yangyonghuai", password, salt })
    }
    return
}

createUser()