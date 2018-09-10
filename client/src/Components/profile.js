import React, { Component } from 'react';

class profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginDetail: JSON.parse(localStorage.getItem('loginDetail') || "{}"),
        }
    }
    render() {
        const { loginDetail } = this.state;
        return (
            <div>
                <h1>User Profile Page User Name: {loginDetail.email}</h1>
            </div>
        )
    }
}

export default profile;