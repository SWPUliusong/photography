import React from "react"
import { observer } from "mobx-react"
import { Icon, Row, Col, List, Card, Menu, Dropdown, Modal, Pagination } from "antd"
import { Link } from "react-router-dom"

import { albumsStore } from "../../store"
import CreateAlbum from "./CreateAlbum"
import RenameAlbum from "./RenameAlbum"

import "./Albums.css"

@observer
export default class Albums extends React.Component {

    componentDidMount() {
        albumsStore.getAlbums()
    }

    onPageChange = (page, size) => {
        albumsStore.getAlbums({ page, size })
    }

    deleteAlbum = id => {
        Modal.confirm({
            title: '确定删除这个相册吗?',
            content: '相册下的相片也会被一同删除',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk() {
                albumsStore.deleteAlbum(id)
            },
        });
    }

    render() {
        return (
            <div className="Albums">
                <Row className="Albums-header">
                    <Col span={2} offset={2}>
                        <CreateAlbum />
                    </Col>
                    <Col span={2} offset={7}>
                        所有相册
                    </Col>
                </Row>

                <div className="Albums-list">
                    <List grid={{ gutter: 16, column: 4 }}
                        dataSource={albumsStore.albums}
                        renderItem={item => (
                            <List.Item>
                                <Card
                                    hoverable
                                    cover={
                                        <Link to={`/albums/${item.id}`} className="Albums-cover" style={{ backgroundImage: `url(${item.lastest || '/album.jpg'})` }}>
                                        </Link>
                                    }>
                                    <Card.Meta title={
                                        <div className="clearfix">
                                            <span className="Album-name" title={item.dirname}>
                                                {item.dirname}&nbsp;&nbsp;
                                            </span>
                                            <span className="Album-count">({item.count})</span>
                                            <Dropdown overlay={(
                                                <Menu>
                                                    <Menu.Item key="0">
                                                        <RenameAlbum album={item} />
                                                    </Menu.Item>
                                                    <Menu.Item key="1">
                                                        <a onClick={() => this.deleteAlbum(item.id)}>删除</a>
                                                    </Menu.Item>
                                                </Menu>
                                            )} trigger={['click']}>
                                                <Icon style={{ lineHeight: "24px" }} className="pull-right" type="setting" />
                                            </Dropdown>
                                        </div>
                                    } />
                                </Card>
                            </List.Item>
                        )} />
                </div>

                <Pagination
                    style={{ padding: "15px 0", textAlign: "center" }}
                    showQuickJumper
                    showSizeChanger
                    pageSizeOptions={["8", "12", "16", "20"]}
                    onChange={this.onPageChange}
                    onShowSizeChange={this.onPageChange}
                    defaultCurrent={1}
                    defaultPageSize={8}
                    total={albumsStore.page.total} />
            </div>
        )
    }
}