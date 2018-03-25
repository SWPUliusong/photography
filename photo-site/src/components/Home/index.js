import React from "react"
import { Pagination } from 'antd';

import { getImgList } from "../../http"
// import Image from "./Image"

import "./Home.css"

export default class Home extends React.Component {
    state = {
        imgList: [],
        page: {
            current: 1,
            size: 10,
            total: 0
        }
    }

    componentDidMount() {
        this.loadData()
    }

    loadData = (params) => {
        return getImgList(params)
            .then(res => this.setState({
                imgList: res.imgList,
                page: res.page
            }))
    }

    onPageChange = (page, size) => {
        this.loadData({ page, size })
    }

    render() {
        return (
            <div className="imgList">
                <ul style={{minHeight: "120px"}}>
                    {this.state.imgList.map(src => (
                        <li className="imgItem" key={src}>
                            <img src={src} alt={src} />
                            {/* <Image src={src} /> */}
                        </li>
                    ))}
                </ul>

                <Pagination
                    showQuickJumper
                    showSizeChanger
                    pageSizeOptions={["10", "15", "20", "25"]}
                    onChange={this.onPageChange}
                    onShowSizeChange={this.onPageChange}
                    defaultCurrent={1}
                    total={this.state.page.total} />
            </div>
        )
    }
}