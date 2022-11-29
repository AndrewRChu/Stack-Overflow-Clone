import React from 'react'
import axios from 'axios'

export default class QuestionInfo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: ""
        }

        axios.get("http://127.0.0.1:8000/userFromQuestionId", {params: {qid: this.props.question.qid}}).then(async res => {this.setState((state, props) => { return {
            username: res.data[0].username
        }})})
    }

    date = (d) => new Date(d).toLocaleDateString([], {month: "short", day: "numeric", year: "numeric"})
    time = (d) => new Date(d).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: "false"}).replace("AM", "").replace("PM", "")

    render() {
        let question = this.props.question
        return (
            <div>
                <p>Asked by <span className="user">{this.state.username}</span></p>
                <p>On <span className="date">{this.date(question.ask_date_time)}</span></p>
                <p>At <span className="time">{this.time(question.ask_date_time)}</span></p>
            </div>
        )
    }
}