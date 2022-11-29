import React from 'react'
import axios from 'axios'

export default class EditTagPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tag: []
        }
        
        this.editTag = this.editTag.bind(this)

        axios.get("http://127.0.0.1:8000/tagFromId", {params: {tid: this.props.tag}}).then(async res => 
        {this.setState((state, props) => { return {
            tag: res.data[0],
        }})})
    }

    // editAnswer() {
    //     document.getElementById("new-answer-error-messages").innerHTML = "" // Reset error messages
    //     let details = document.getElementById("new-answer-details").value
      
    //     // Check for invalid inputs and display relevant error messages
    //     if(details.length > 0) {
    //         let answer = {
    //             aid: this.props.answer,
    //             text: details
    //         }
    //         // axios.post("http://127.0.0.1:8000/editAnswer", answer)
    //         //     .then(res => {
    //         //         axios.post("http://127.0.0.1:8000/addUserToAnswer", {ansId: res.data})
    //         //         axios.post("http://127.0.0.1:8000/addAnswerToQuestion", {qstnId: this.props.state.activeQuestion.qid, ansId: res.data}).then(res => this.props.renderPage("AnswerPage", this.props.state.activeQuestion))
    //         //     })
    //         axios.post("http://127.0.0.1:8000/updateAnswerInfo", answer).then(this.props.renderProfilePage("answers"))
            
    //     } else {
    //         if(details.length === 0) {document.getElementById("new-answer-error-messages").innerHTML += "<p>Answer cannot be empty!</p>"}
    //     }
    // }

    editTag() {
        document.getElementById("edit-tag-error-messages").innerHTML = "" // Reset error messages
        let tagName = document.getElementById("edit-tag-name").value

        if(tagName.length > 0 && !tagName.includes(" ")) {
            let tag = {
                tid: this.props.tag,
                name: tagName
            }
            axios.post("http://127.0.0.1:8000/updateTagInfo", tag).then(this.props.renderProfilePage("tags"))
        } else {
            if(tagName.length === 0) {document.getElementById("edit-tag-error-messages").innerHTML += "<p>Tag cannot be empty!</p>"}
            if(tagName.includes(" ")) {document.getElementById("edit-tag-error-messages").innerHTML += "<p>Tag cannot contain a whitespace!</p>"}
        }
        
    }

    render() {
        return (
            <div id="edit-tag">
                <div className="error-messages-container">
                    <div id="edit-tag-error-messages">
                    </div>
                </div>
                <form id="edit-tag" target="_blank" method="post">
                <h1>Tag name</h1>
                <input name="tag" id="edit-tag-name" defaultValue={this.state.tag.name} /><br /><br />
        
                <input type="button" id="edit-tag-submit" onClick={this.editTag} value="Edit Tag" />
                </form>
            </div>
        )
    }
}