import { observable, action } from "mobx"
import { message } from "antd"
import {
    login,
    logout,
    checkLogin,
} from "../http"

class User {
    constructor({ id, name, expires }) {
        this.id = id
        this.name = name
        this.expires = expires
    }
}

class UserStore {
    @observable user = null

    @action
    setUser(user) {
        this.user = new User(user)
    }

    @action
    removeUser() {
        this.user = null
    }

    async login(data) {
        try {
            let user = await login(data)
            this.setUser(user)
        } catch (err) {
            message.error(err.data)
        }
    }

    async logout() {
        try {
            await logout()
            this.removeUser()
        } catch (err) {
            console.error(err)
        }
    }

    async checkLogin() {
        try {
            let user = await checkLogin()
            this.setUser(user)
        } catch (err) {
            console.error(err)
        }
    }
}

export default new UserStore()