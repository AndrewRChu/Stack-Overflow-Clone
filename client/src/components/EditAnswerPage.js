import React from 'react'
import axios from 'axios'

export default class EditAnswerPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            answer: [],
        }

        this.editAnswer = this.editAnswer.bind(this)

        axios.get("http://127.0.0.1:8000/answerFromId", {params: {aid: this.props.answer}}).then(async res => 
        {this.setState((state, props) => { return {
            answer: res.data[0],
        }})})
    }

    editAnswer() {
        document.getElementById("new-answer-error-messages").innerHTML = "" // Reset error messages
        let details = document.getElementById("new-answer-details").value
      
        // Check for invalid inputs and display relevant error messages
        if(details.length > 0) {
            let answer = {
                aid: this.props.answer,
                text: details
            }
            // axios.post("http://127.0.0.1:8000/editAnswer", answer)
            //     .then(res => {
            //         axios.post("http://127.0.0.1:8000/addUserToAnswer", {ansId: res.data})
            //         axios.post("http://127.0.0.1:8000/addAnswerToQuestion", {qstnId: this.props.state.activeQuestion.qid, ansId: res.data}).then(res => this.props.renderPage("AnswerPage", this.props.state.activeQuestion))
            //     })
            axios.post("http://127.0.0.1:8000/updateAnswerInfo", answer).then(this.props.renderProfilePage("answers"))
            
        } else {
            if(details.length === 0) {document.getElementById("new-answer-error-messages").innerHTML += "<p>Answer cannot be empty!</p>"}
        }
    }

    render() {
        return (
            <div id="edit-answer">
                <div className="error-messages-container">
                    <div id="new-answer-error-messages">
                    </div>
                </div>
                <form id="edit-answer" target="_blank" method="post">
                <h1>Answer Text</h1>
                <textarea name="details" rows="15" id="new-answer-details" defaultValue={this.state.answer.text}></textarea><br /><br />
        
                <input type="button" id="new-answer-submit" onClick={this.editAnswer} value="Edit Answer" />
                </form>
            </div>
        )
    }
}