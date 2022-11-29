import React from 'react'
import axios from 'axios'

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props)

        this.login = this.login.bind(this)
    }
    
    login() {
        document.getElementById("login-error-messages").innerHTML = "" // Reset error messages
        const emailRegex = /\w+@\w+.\w+/
        let email = document.getElementById("login-email").value
        let password = document.getElementById("login-password").value
      
        // Check for invalid inputs and display relevant error messages
        if(emailRegex.exec(email) && password.length > 0) {
            let login = {
                email: email,
                password: password
            }
            axios.get("http://127.0.0.1:8000/login", {params: login}).then(res => {
                if(res.data) {
                    this.props.renderPage("AllQuestions")
                } else {
                    document.getElementById("login-error-messages").innerHTML += "<p>Please try again!</p>"
                }
            })
        } else {
            if(emailRegex.exec(email) == null) {document.getElementById("login-error-messages").innerHTML += "<p>Email is invalid!</p>"}
            if(password.length == 0) {document.getElementById("login-error-messages").innerHTML += "<p>Password cannot be left blank!"}
        }
    }

    render() {
        return (
            <div id="login">
                <div className="error-messages-container">
                    <div id="login-error-messages">
                    </div>
                </div>
                <form id="login" target="_blank" method="post">
                <h1>Email address</h1>
                <input type="text" name="email" id="login-email" /><br /><br />

                <h1>Password</h1>
                <input type="password" name="password" id="login-password" /><br /><br />


        
                <input type="button" id="login-submit" onClick={this.login} value="Login" />
                </form>
            </div>
        )
    }
}