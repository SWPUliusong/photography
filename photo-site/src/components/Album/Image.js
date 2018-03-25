import React from "react"
import { observer } from "mobx-react"
import { Icon } from "antd"
import { albumStore } from "../../store"

@observer
export default class Image extends React.Component {
    state = {
        visible: false
    }

    toggle = () => {
        if(!this.state.visible) {  
            let { src } = this.props
            albumStore.setIndex(albumStore.images.indexOf(src))
        }

        this.setState(prevState => ({
            visible: !prevState.visible
        }))
    }

    next = e => {
        e.stopPropagation()
        albumStore.next()
    }
    
    prev = e => {
        e.stopPropagation()
        albumStore.prev()
    }

    render() {
        let { src, alt } = this.props
        return (
            <div className="Image-wrap" style={{ backgroundImage: `url(${src})` }} onClick={this.toggle}>
                <div className="Image-modal" style={{ display: this.state.visible ? "flex" : "none" }}>
                    <header className="Image-modal-header">
                        <span>{albumStore.index} / {albumStore.images.length}</span>
                    </header>
                    <span onClick={this.prev} style={{left: "30px"}} className="Image-slide">
                        <Icon type="arrow-left" />
                    </span>
                    <span onClick={this.next} style={{right: "30px"}} className="Image-slide">
                        <Icon type="arrow-right" />
                    </span>
                    <img src={albumStore.current} alt={alt} />
                </div>
            </div>
        )
    }
}