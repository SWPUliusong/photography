import React, { Component } from "react"

export default class Cover extends Component {
    state = {
        className: "horizontal"
    }

    imgLoaded = e => {
        let w = e.target.clientWidth
        let h = e.target.clientHeight
        if (w < h) {
            this.setState({ className: "vertical" })
        }
    }

    render() {
        let { src, alt } = this.props
        return (
            <div className="album-cover">
                <img className={this.state.className}
                    src={src} alt={alt}
                    onLoad={this.imgLoaded} />
            </div>
        )
    }
}