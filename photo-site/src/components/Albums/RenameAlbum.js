import React from "react"
import { albumsStore } from "../../store"
import { Modal, Form, Icon, Input, Button } from "antd"
const FormItem = Form.Item

class NormalRenameForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                let { id } = this.props.album
                albumsStore.renameAlbum(id, values).then(this.props.close)
            }
        });
    }

    render() {
        const { album } = this.props
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {
                        getFieldDecorator("dirname", {
                            initialValue: album.dirname,
                            rules: [{ required: true, message: '请输入相册名!' }]
                        })(
                            <Input prefix={<Icon type="folder" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入新的相册名" />
                        )
                    }
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                        确 认
                    </Button>
                </FormItem>
            </Form>
        )
    }
}

const RenameForm = Form.create()(NormalRenameForm)

export default class Rename extends React.Component {
    state = {
        isShow: false
    }

    open = () => {
        this.setState({ isShow: true })
    }

    close = () => {
        this.setState({ isShow: false })
    }

    render() {
        return (
            <span>
                <a style={{ color: "inherit" }} onClick={this.open}>重命名</a>
                <Modal
                    title="相册重命名"
                    width={360}
                    visible={this.state.isShow}
                    onCancel={this.close}
                    footer={null}>
                    <RenameForm close={this.close} album={this.props.album} />
                </Modal>
            </span>
        )
    }
}