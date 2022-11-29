import React from 'react'
import axios from 'axios'

export default class NewAnswerPage extends React.Component {
    constructor(props) {
        super(props)

        this.createNewAnswer = this.createNewAnswer.bind(this)
    }

    createNewAnswer() {
        document.getElementById("new-answer-error-messages").innerHTML = "" // Reset error messages
        let details = document.getElementById("new-answer-details").value
      
        // Check for invalid inputs and display relevant error messages
        if(details.length > 0) {
            let answer = {
                text: details
            }
            axios.post("http://127.0.0.1:8000/addAnswer", answer)
                .then(res => {
                    axios.post("http://127.0.0.1:8000/addUserToAnswer", {ansId: res.data})
                    axios.post("http://127.0.0.1:8000/addAnswerToQuestion", {qstnId: this.props.state.activeQuestion.qid, ansId: res.data}).then(res => this.props.renderPage("AnswerPage", this.props.state.activeQuestion))
                })
            
        } else {
            if(details.length === 0) {document.getElementById("new-answer-error-messages").innerHTML += "<p>Answer cannot be empty!</p>"}
        }
    }

    render() {
        return (
            <div id="new-answer">
                <div className="error-messages-container">
                    <div id="new-answer-error-messages">
                    </div>
                </div>
                <form id="add-new-answer" target="_blank" method="post">
                <h1>Answer Text</h1>
                <textarea name="details" rows="15" id="new-answer-details"></textarea><br /><br />
        
                <input type="button" id="new-answer-submit" onClick={this.createNewAnswer} value="Post Answer" />
                </form>
            </div>
        )
    }
}