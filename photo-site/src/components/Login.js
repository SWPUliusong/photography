import React from "react"
import { Modal, Form, Icon, Input, Button } from 'antd';
import { userStore } from "../store"

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                userStore.login(values)
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入用户名!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </FormItem>
                <FormItem>
                    <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
                        登 录
                    </Button>
                </FormItem>
            </Form>
        );
    }
}

const LoginForm = Form.create()(NormalLoginForm);

export default class Login extends React.Component {
    state = {
        visible: false
    }

    loginForm = null

    openModal = () => {
        this.loginForm && this.loginForm.resetFields()
        this.setState({ visible: true })
    }

    closeModal = () => {
        this.setState({ visible: false })
    }

    render() {
        return (
            <span>
                <span style={{ cursor: "pointer" }} onClick={this.openModal}>登录</span>
                <Modal title="登录"
                    width={360}
                    visible={this.state.visible}
                    onCancel={this.closeModal}
                    footer={null}>
                    <LoginForm ref={node => this.loginForm = node} />
                </Modal>
            </span>
        )
    }
}