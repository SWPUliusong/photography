import { observable, computed, action } from "mobx"
import { message } from "antd"
import moment from "moment"
import {
    getAlbum,
    deleteImg,
} from "../http"
import Upload from "./upload"

class Album {
    @observable images = []
    @observable index = 1
    @observable dirname = ""
    @observable updateTime = ""

    @observable upload = new Upload()

    // 更新时间
    @computed get time() {
        let date = new Date()
        if (this.updateTime) {
            date = new Date(this.updateTime)
        }

        return moment(date).format("YYYY-MM-DD HH:mm:ss")
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
        let len = this.images.length
        if(this.index > len) {
            this.index = len
        }
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

    async deleteImg() {
        let { _id: id } = this
        let key = this.current.match(/files\/(\w*)\..*$/)[1]
        try {
            await deleteImg(id, key)
            await this.getAlbum(id)
        } catch (err) {
            message.error(err.data || err.message || '未知错误')
        }
    }

    async uploadImg(files) {
        let { _id: id } = this
        try {
            await this.upload.start(id, files)
            await this.getAlbum(id)
        } catch (err) {
            message.error(err.data || err.message || '未知错误')
        }
    }
}

export default new Album()