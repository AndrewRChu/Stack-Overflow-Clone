import React from 'react'
import axios from 'axios'

export default class AnswerInfo extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: ""
        }

        axios.get("http://127.0.0.1:8000/userFromAnswerId", {params: {aid: this.props.answer.aid}}).then(async res => {
            if(res.data.length > 0) {
            this.setState((state, props) => { return {
                user: res.data[0].username
            }})
            }
        })
    }

    date = (d) => new Date(d).toLocaleDateString([], {month: "short", day: "numeric", year: "numeric"})
    time = (d) => new Date(d).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", hour12: "false"}).replace("AM", "").replace("PM", "")

    render() {
        let answer = this.props.answer
        return (
            <div>
                <p>Answered by <span className="user">{this.state.user}</span></p>
                <p>On <span className="date">{this.date(answer.ans_date_time)}</span></p>
                <p>At <span className="time">{this.time(answer.ans_date_time)}</span></p>
            </div>
        )
    }
}