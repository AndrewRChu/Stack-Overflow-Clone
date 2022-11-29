import React from 'react'
import axios from 'axios'

export default class NewAnswerButton extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: false
        }

        axios.get("http://127.0.0.1:8000/checkLoggedIn").then(async res => {this.setState((state, props) => { return {
            username: res.data
        }})})
    }
    render() {
        let button = <></>
        if(this.state.username) {
            button = <button onClick={() => this.props.renderPage("NewAnswer")} className="answer-question-button">Answer Question</button>
        }
        return (
            <>{button}</>
        )
    }
}