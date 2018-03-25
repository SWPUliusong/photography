import React from "react"
import { Menu, Dropdown, Icon } from 'antd';
// import { Link } from "react-router-dom"

import { userStore } from "../store"

export default class UserMenu extends React.Component {
    render() {
        return (
            <Dropdown overlay={(
                <Menu>
                    {/* <Menu.Item>
                        <Link to="/account">我的账号</Link>
                    </Menu.Item> */}
                    <Menu.Item>
                        <a onClick={() => userStore.logout()}>退出</a>
                    </Menu.Item>
                </Menu>
            )} trigger={['click']}>
                <a className="App-dropdown-link">
                    {userStore.user.name} <Icon type="down" />
                </a>
            </Dropdown>
        )
    }
}