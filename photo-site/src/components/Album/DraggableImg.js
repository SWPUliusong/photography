import React from "react"

export default class DraggableImg extends React.Component {
    x = 0
    y = 0
    // 是否开始移动
    start = false

    onMouseDownHandle = e => {
        e.stopPropagation()
        this.start = true
        this.x = e.clientX
        this.y = e.clientY
        // console.log(e.clientX, e.clientY)
        // console.log(e.offsetX, e.offsetY)
    }

    onMouseUpHandle = e => {
        e.stopPropagation()
        this.start = false
    }
    
    onMouseLeaveHandle = e => {
        e.stopPropagation()
        this.start = false
    }

    onMouseMoveHandle = e => {
        e.stopPropagation()
        if (this.start) {
            this.x = e.clientX
            this.y = e.clientY
            console.log(e.clientX, e.clientY)
        }
    }

    render() {
        let { style, className } = this.props
        return (
            <img
                style={{ ...style }}
                className={[className,].join(' ')}
                {...this.props}
                onMouseDown={this.onMouseDownHandle}
                onMouseUp={this.onMouseUpHandle}
                onMouseLeave={this.onMouseUpHandle}
                onMouseMove={this.onMouseMoveHandle} />
        )
    }
}
