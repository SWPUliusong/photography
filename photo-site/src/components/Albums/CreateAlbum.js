import React from "react"
import { albumsStore } from "../../store"
import { Modal, Form, Icon, Input, Button } from "antd"
const FormItem = Form.Item

class NormalCreateForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                albumsStore.createAlbum(values).then(this.props.close)
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem>
                    {
                        getFieldDecorator("dirname", {
                            rules: [{ required: true, message: '相册名不能为空!' }]
                        })(
                            <Input prefix={<Icon type="folder" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="相册名" />
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

const CreateForm = Form.create()(NormalCreateForm)

export default class Rename extends React.Component {
    createForm = null

    state = {
        isShow: false
    }

    open = () => {
        this.createForm && this.createForm.resetFields()
        this.setState({ isShow: true })
    }

    close = () => {
        this.setState({ isShow: false })
    }

    render() {
        return (
            <span>
                <span onClick={this.open} style={{ cursor: "pointer" }}>
                    <Icon type="folder-add" /> 新建相册
                </span>
                <Modal
                    title="新建相册"
                    width={360}
                    visible={this.state.isShow}
                    onCancel={this.close}
                    footer={null}>
                    <CreateForm close={this.close} ref={node => this.createForm = node} />
                </Modal>
            </span>
        )
    }
}