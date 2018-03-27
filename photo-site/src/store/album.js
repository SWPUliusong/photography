import { observable, computed, action } from "mobx"
import { message } from "antd"
import {
    getAlbum,
    deleteImg,
    uploadImg,
} from "../http"

// 下载列表
class Upload {
    @observable total = 0
    @observable success = 0
    @observable error = 0

    @action
    start(total) {
        this.total = total
        this.success = 0
        this.error = 0
    }

    @action
    resolve() {
        this.success++
    }

    @action
    reject() {
        this.error++
    }
}

class Album {
    @observable images = []
    @observable index = 1
    @observable dirname = ""
    @observable createTime = ""

    @observable upload = new Upload()

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

    // 初始化store数据
    @action
    init(data) {
        Object.assign(this, data)
        this.index = 1
        this.upload = new Upload()
    }

    // 初始化相册数据
    @action
    setAlbum(data) {
        Object.assign(this, data)
    }

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

    async getAlbum(id) {
        try {
            let album = await getAlbum(id)
            this.setAlbum(album)
        } catch (err) {
            console.error(err)
        }
    }

    async deleteImg(id, key) {
        try {
            await deleteImg(key)
            let album = await getAlbum(id)
            this.setAlbum(album)
        } catch (err) {
            message.error(err.data || err)
        }
    }

    async uploadImg(id, files) {
        files = [...files]
        this.upload.start(files.length)
        let promise_arr = files.map(file => {
            return uploadImg(file)
                .then(this.upload.resolve)
                .catch(this.upload.reject)
        })
        try {
            await Promise.all(promise_arr)
            let album = await getAlbum(id)
            this.setAlbum(album)
        } catch (err) {
            message.error(err.data || err)
        }
    }
}

export default new Album()