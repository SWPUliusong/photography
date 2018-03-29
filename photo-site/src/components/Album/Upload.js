import React from "react"
import { Icon } from "antd"
import { albumStore } from "../../store"

export default class Upload extends React.Component {
    // 保存form节点，用于reset文件表单
    fileElem = null

    upload(files) {
        if (files.length > 0) {
            albumStore.uploadImg(files)
            this.fileElem.reset()
        }
    }

    render() {
        return (
            <label htmlFor="image-file" style={{ fontSize: "16px", cursor: "pointer" }}>
                <Icon type="cloud-upload" /> 上传

                <form ref={node => this.fileElem = node}>
                    <input
                        multiple
                        id="image-file"
                        type="file"
                        hidden
                        accept="image/gif,image/png,image/jpeg"
                        onChange={e => this.upload(e.target.files)} />
                </form>
            </label>
        )
    }
}