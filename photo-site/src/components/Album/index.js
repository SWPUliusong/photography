import React from "react"
import { observer } from "mobx-react"
import { Icon, Row, Col, List, Progress } from "antd"
import { Link } from "react-router-dom"

import { albumStore } from "../../store"
import Image from "./Image"
import Upload from "./Upload"

import "../Albums/Albums.css"
import "./Album.css"

@observer
export default class Album extends React.Component {

    componentDidMount() {
        let { id } = this.props.match.params
        albumStore.getAlbum(id)
    }

    render() {
        let { total, success } = albumStore.upload
        return (
            <div className="Albums">
                <Row className="Albums-header">
                    <Col span={2} offset={2}>
                        <Link to="/albums" style={{ color: "#999" }}>
                            <Icon type="left" /> 返回
                        </Link>
                    </Col>
                    <Col span={2}>
                        <Upload />
                    </Col>
                    <Col span={4}>
                        {
                            total > 0 && total !== success ? (
                                <Progress percent={albumStore.upload.successPercen} />
                            ) : null
                        }
                    </Col>
                    <Col span={4}>
                        <span className="Album-title" title={albumStore.dirname}>
                            {albumStore.dirname}
                        </span>
                    </Col>
                    <Col span={5} offset={5}>
                        {albumStore.time} 更新
                    </Col>
                </Row>

                <div className="Albums-list">
                    <List grid={{ gutter: 16, column: 4 }}
                        dataSource={albumStore.thumbImages}
                        renderItem={item => (
                            <List.Item>
                                <Image src={item} alt={item} />
                            </List.Item>
                        )} />
                </div>
            </div>
        )
    }
}