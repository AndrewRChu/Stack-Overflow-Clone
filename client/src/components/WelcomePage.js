import React from 'react'
import axios from 'axios'

export default class WelcomePage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div id="welcome-page">
                <header>Welcome to Fake Stack Overflow!</header>
                <div id="welcome-buttons">
                    <button onClick={() => this.props.renderPage("CreateUser")}>Register</button>
                    <button onClick={() => this.props.renderPage("Login")}>Login</button>
                    <button onClick={() => this.props.renderPage("AllQuestions")}>Continue as Guest</button>
                </div>
            </div>
        )
    }
}