import React from "react"
import { Icon, Progress } from "antd"
import { albumStore } from "../../store"

export default class Upload extends React.Component {

    upload(files) {
        if (files.length > 0) {
            console.log(files)
            albumStore.uploadImg(files)
        }
    }

    render() {
        return (
            <label htmlFor="image-file" style={{ fontSize: "16px", cursor: "pointer" }}>
                <Icon type="cloud-upload" /> 上传

                <input
                    multiple
                    id="image-file"
                    type="file"
                    hidden
                    accept="image/gif,image/png,image/jpeg"
                    onChange={e => this.upload(e.target.files)} />
            </label>
        )
    }
}