import React from "react"

export default class Account extends React.Component {
    render() {
        return (
            <div>
                <h1>Account{JSON.stringify(this.props.match)}</h1>
            </div>
        )
    }
}