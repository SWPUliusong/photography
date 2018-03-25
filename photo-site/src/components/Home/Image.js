import React from "react"

export default class Image extends React.Component {
    state = {
        isLoad: false
    }

    imgElem = null

    componentDidMount() {
        this.imgElem.onload = e => {
            this.setState({ isLoad: true })
        }
    }

    componentWillUnmount() {
        this.imgElem = null
    }

    render() {
        let { src } = this.props
        return (
            <span style={style.imgWrap}>
                <img src={src} style={style.imgShow} ref={node => this.imgElem = node} />
                {this.state.isLoad ? (<img style={style.imgShadow} src={src} />) : null}
            </span>
        )
    }
}

const commonImg = {
    // position: "absolute",
    // top: 0,
    // left: 0,
    width: "800px",
    height: "auto",
    display: "block"
}

const style = {
    imgWrap: {
        // position: "relative",
        display: "inline-block"
    },
    imgShow: {
        ...commonImg,
        float: "left",
        // zIndex: 101,
    },
    imgShadow: {
        ...commonImg,
        // zIndex: 100,
        // transformOrigin: "50% 100%",
        // transform: "rotate(45deg) skew(135deg)"
    }
}