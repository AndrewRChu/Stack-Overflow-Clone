import React from 'react'
import axios from 'axios'

export default class CreateComment extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: false
        }

        axios.get("http://127.0.0.1:8000/checkLoggedIn").then(async res => {this.setState((state, props) => { return {
            username: res.data
        }})})

        this.addComment = this.addComment.bind(this)
    }

    addComment(text, commentId) {
        if(window.event.keyCode === 13 && text.length > 0 && text.length <= 140) {
                document.getElementById(`comment-${this.props.type}-${this.props.id}-error-messages`).innerHTML = ""
                axios.post("http://127.0.0.1:8000/addComment", {text: text})
                .then(res => {
                    axios.post("http://127.0.0.1:8000/addUserToComment", {cid: res.data})
                    if(commentId.split("-")[1] === "answer") {
                        axios.post("http://127.0.0.1:8000/addCommentToAnswer", {ansId: this.props.id, commentId: res.data}).then((res) => {
                            this.props.getComments()
                            document.getElementById(`comment-${this.props.type}-${this.props.id}`).value = ""
                        })
                    } else if(commentId.split("-")[1] === "question") {
                        axios.post("http://127.0.0.1:8000/addCommentToQuestion", {qstnId: this.props.id, commentId: res.data}).then((res) => {
                            this.props.getComments()
                            document.getElementById(`comment-${this.props.type}-${this.props.id}`).value = ""
                        })
                    }
                })
        } else {
            if(window.event.keyCode === 13 && text.length > 140) {
                document.getElementById(`comment-${this.props.type}-${this.props.id}-error-messages`).innerHTML = "<p>Comment cannot be greater than 140 characters!</p>"
            }
        }
    }

    render() {
        let commentId = `comment-${this.props.type}-${this.props.id}`
        let commentRow = <></>
        if(this.state.username) {
            commentRow = <>
                <tr className="comment-row">
                <td className="row1"><span>Write a comment:</span></td>
                <td className="comment-row-end row2">
                    <div id={commentId + "-error-messages"} className="comment-error-messages"></div>
                    <input id={commentId} className="comment-input" type="text" onKeyDown={() => this.addComment(document.getElementById(commentId).value, commentId)}></input>
                </td>
                <td colSpan="2"></td>
                </tr>
            </>
        }
        
        return (
            <>{commentRow}</>
        )
    }
}