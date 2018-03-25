import http from "./http"
import api from "./api"

// 登录
export function login(data) {
    return http.post(api.login, data)
}
// 验证是否已登录
export function checkLogin() {
    return http.get(api.login)
}
// 退出
export function logout() {
    return http.get(api.logout)
}

// 获取首页所有图片数据
export function getImgList(params) {
    return http.get(api.files, { params })
}

// 获取所有相册信息
export function getAlbums(params) {
    return http.get(api.albums, { params })
}

// 创建相册
export function createAlbum(data) {
    return http.post(api.albums, data)
}

// 相册重命名
export function renameAlbum(id, data) {
    return http.put(api.albums + id, data)
}

// 相册重命名
export function deleteAlbum(id) {
    return http.delete(api.albums + id)
}

// 获取单个相册的数据
export function getAlbum(id) {
    return http.get(api.albums + id)
}
