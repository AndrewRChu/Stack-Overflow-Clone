import React from 'react'
import axios from 'axios'

export default class NewQuestionPage extends React.Component {
    constructor(props) {
        super(props)

        this.createNewQuestion = this.createNewQuestion.bind(this)
    }

    createNewQuestion() {
        document.getElementById("new-question-error-messages").innerHTML = "" // Reset error messages
        let title = document.getElementById("question-title").value
        let details = document.getElementById("question-details").value
        let tagsValue = document.getElementById("question-tags").value.toLowerCase()
        let tags = Array.from(new Set(tagsValue.split(" ").filter(t => t.length > 0)))
      
        // Check for invalid inputs and display relevant error messages
        if(title.length <= 50 && title.length > 0 && details.length !== 0 && tags.length !== 0) {
            let question = {
                title: title,
                text: details,
            }

            const postQuestion = async () => {
                const q = await axios.post("http://127.0.0.1:8000/addQuestion", question)
                axios.post("http://127.0.0.1:8000/addUserToQuestion", {qstnId: q.data})
                Promise.all(tags.map(async t => {
                    const createdTag = await axios.post("http://127.0.0.1:8000/createAndAddTagToQuestion", {qstnId: q.data, tagName: t})
                })).then(this.props.renderPage("AllQuestions"))
            }
            
            postQuestion()

        } else {
            if(title.length > 50) {document.getElementById("new-question-error-messages").innerHTML += "<p>Title cannot be more than 50 characters!</p>"}
            if(title.length === 0) {document.getElementById("new-question-error-messages").innerHTML += "<p>Title cannot be empty!</p>"}
            if(details.length === 0) {document.getElementById("new-question-error-messages").innerHTML += "<p>Details cannot be empty!</p>"}
            if(tagsValue.length === 0) {document.getElementById("new-question-error-messages").innerHTML += "<p>Tags cannot be empty!</p>"}
        }
    }

    render() {
        return (
            <div id="new-question">
                <div className="error-messages-container">
                    <div id="new-question-error-messages"></div>
                </div>
                <form id="add-new-question" target="_blank" method="post">
                    <h1>Question Title</h1>
                    <span>Title should not be more than 50 characters.</span><br />
                    <input type="text" name="title" id="question-title" /><br /><br />
            
                    <h1>Question Text</h1>
                    <span>Add details.</span><br />
                    <textarea name="details" rows="15" id="question-details"></textarea><br /><br />
            
                    <h1>Tags</h1>
                    <span>Add Keywords separated by whitespace.</span><br />
                    <input type="text" name="tags" id="question-tags" /><br /><br />
            
                    {/* <input type="button" id="new-question-submit" onClick={this.createNewQuestion} value="Post Question" /> */}
                    <input type="button" id="new-question-submit" onClick={this.createNewQuestion} value="Post Question" />
                </form>
            </div>
        )
    }
}