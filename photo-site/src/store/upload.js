import { observable, computed, action } from "mobx"
import {
    uploadImg,
} from "../http"

export default class Upload {
    @observable total = 0
    @observable success = 0
    @observable error = 0

    // 成功百分比
    @computed get successPercen() {
        return `${this.success / this.total * 100}%`
    }
    // 失败百分比
    @computed get errorPercen() {
        return `${this.success / this.total * 100}%`
    }
    // 是否已完成
    @computed get finished() {
        return this.success + this.error === this.total
    }

    @action
    reset(n) {
        this.total = n
        this.success = 0
        this.error = 0
    }

    // 新增上传任务
    @action
    add(n = 1) {
        if (this.finished) {
            return this.reset(n)
        }
        this.total += n
    }

    // 成功
    @action
    resolve() {
        this.success++
    }

    // 失败
    @action
    reject() {
        this.error++
    }

    // 开始上传
    async start(id, files = []) {
        if (!id) return
        files = [...files]
        this.add(files.length)
        let promise_arr = files.map(file => {
            return uploadImg(id, file)
                .then(() => this.resolve)
                .catch(() => this.reject)
        })

        return Promise.all(promise_arr)
    }
}