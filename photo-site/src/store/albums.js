import { observable, action } from "mobx"
import { message } from "antd"
import {
    getAlbums,
    createAlbum,
    renameAlbum,
    deleteAlbum,
} from "../http"

class PageConfig {
    current = 1
    size = 8
    total = 0
}

class Albums {
    @observable albums = []
    @observable page = new PageConfig()

    @action
    setAlbums(data) {
        this.albums = data.albums
        this.page = data.page
    }

    @action
    reset() {
        this.albums = []
        this.page = new PageConfig()
    }

    async getAlbums(params) {
        if (!params) {
            let { current: page, size } = this.page
            params = { page, size }
        }

        try {
            let data = await getAlbums(params)
            this.setAlbums(data)
            // 若当前页没有数据则退回上一页
            let { albums: { length }, page: { current } } = this
            if (length === 0 && current !== 1) {
                this.page.current--
                this.getAlbums()
            }
        } catch (err) {
            console.error(err)
        }
    }

    async createAlbum(data) {
        try {
            await createAlbum(data)
            await this.getAlbums()
        } catch (err) {
            message.error(err.data)
        }
    }

    async renameAlbum(id, data) {
        try {
            await renameAlbum(id, data)
            await this.getAlbums()
        } catch (err) {
            message.error(err.data)
        }
    }

    async deleteAlbum(id) {
        try {
            await deleteAlbum(id)
            await this.getAlbums()
        } catch (err) {
            console.error(err)
        }
    }
}

export default new Albums()