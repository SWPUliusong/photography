import { observable, computed, action } from "mobx"
import {
    getAlbum,
} from "../http"

class Album {
    @observable images = []
    @observable index = 1
    @observable dirname = ""
    @observable createTime = ""

    @computed get time() {
        let date = new Date()
        if (this.createTime) {
            date = new Date(this.createTime)
        }

        return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    }

    // 当前展示图片
    @computed get current() {
        return this.images[this.index - 1]
    }

    // 初始化
    @action
    init(data) {
        this.index = 1
        Object.assign(this, data)
    }

    // 设置位置
    @action
    setIndex(index) {
        this.index = index + 1
    }

    // 下一个
    @action
    next() {
        let i = this.index
        if (i < this.images.length) {
            this.index++
        } else {
            this.index = 1
        }
    }

    // 上一个
    @action
    prev() {
        let i = this.index
        if (i === 1) {
            this.index = this.images.length
        } else {
            this.index--
        }
    }

    // 删除
    @action
    remove() {
        let len = this.images.length
        this.images.splice(this.index - 1, 1)
        if (len === this.index) {
            this.index = 1
        }
    }

    async getAlbum(id) {
        try {
            let album = await getAlbum(id)
            this.init(album)
        } catch (err) {
            console.error(err)
        }
    }
}

export default new Album()