import React from 'react'
import axios from 'axios'

export default class CreateUserPage extends React.Component {
    constructor(props) {
        super(props)

        this.createNewUser = this.createNewUser.bind(this)
    }

    createNewUser() {
        document.getElementById("new-user-error-messages").innerHTML = "" // Reset error messages
        const emailRegex = /\w+@\w+.\w+/
        let email = document.getElementById("new-user-email").value
        let username = document.getElementById("new-user-username").value
        let password = document.getElementById("new-user-password").value
        let passwordConfirm = document.getElementById("new-user-password-confirm").value
      
        // Check for invalid inputs and display relevant error messages
        if(emailRegex.exec(email) && username.length < 15 && username.length != 0 && password.length > 0 && password == passwordConfirm && !email.includes(password)) {
            let user = {
                email: email,
                username: username,
                password: password
            }
            axios.post("http://127.0.0.1:8000/addUser", user).then(res => {
                // implement check if duplicate email or username and stuff
                // remember to oOnly render login page if successful
                if(!res.data) {
                    document.getElementById("new-user-error-messages").innerHTML += "<p>Email or username already exists!</p>"
                } else {
                    this.props.renderPage("Login")
                }
            })
            
        } else {
            if(emailRegex.exec(email) == null) {document.getElementById("new-user-error-messages").innerHTML += "<p>Email is invalid!</p>"}
            if(username.length > 15) {document.getElementById("new-user-error-messages").innerHTML += "<p>Username is too long!</p>"}
            if(username.length == 0) {document.getElementById("new-user-error-messages").innerHTML += "<p>Username cannot be left blank!</p>"}
            if(password.length == 0) {document.getElementById("new-user-error-messages").innerHTML += "<p>Password cannot be left blank!"}
            if(password != passwordConfirm) {document.getElementById("new-user-error-messages").innerHTML += "<p>Please reconfirm your password!</p>"}
            if(email.includes(password)) {document.getElementById("new-user-error-messages").innerHTML += "<p>Password cannot contain your username or email!</p>"}
        }
    }

    render() {
        return (
            <div id="new-user">
            <div className="error-messages-container">
                <div id="new-user-error-messages">
                </div>
            </div>
            <form id="add-new-user" target="_blank" method="post">
            <h1>Email address</h1>
            <input type="text" name="email" id="new-user-email" /><br /><br />
    
            <h1>Username</h1>
            <span>Should not be more than 15 characters.</span><br />
            <input type="text" name="username" id="new-user-username" /><br /><br />

            <h1>Password</h1>
            <span>Should not contain username or email ID.</span><br />
            <input type="password" name="password" id="new-user-password" /><br /><br />

            <h1>Confirm password</h1>
            <input type="password" name="password-confirm" id="new-user-password-confirm" /><br /><br />
   
            <input type="button" id="new-user-submit" onClick={this.createNewUser} value="Create user" />
            </form>
        </div>
        )
    }
}