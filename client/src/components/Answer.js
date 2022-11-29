import React from 'react'
import axios from 'axios'
import AnswerInfo from './AnswerInfo.js'
import Voting from './Voting.js'
import Comment from './Comment.js'
import CreateComment from './CreateComment.js'

export default class Answer extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            page: 0,
            comments: [],
            uid: ""
        }

        this.getComments = this.getComments.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)

        axios.get("http://127.0.0.1:8000/commentsFromAnswerID", {params: {ansId: this.props.answer.aid}}).then(async res => {
            this.setState((state, props) => { return {
                comments: res.data
            }})
        })

        axios.get("http://127.0.0.1:8000/userFromAnswerId", {params: {aid: this.props.answer.aid}}).then(async res => {
            if(res.data.length > 0) {
            this.setState((state, props) => { return {
                uid: res.data[0].uid
            }})
            }
        })
    }

    getComments() {
        axios.get("http://127.0.0.1:8000/commentsFromAnswerID", {params: {ansId: this.props.answer.aid}}).then(async res => {
            this.setState((state, props) => { return {
                comments: res.data
            }})
        })
    }

    split(arr) {
        let r = []
        while(arr.length) {
            r.push(arr.splice(0, 3))
        }
        return r
    }

    nextPage() {
        this.setState((state, props) => { return {
            page: this.state.page + 1
        }})
    }

    prevPage() {
        this.setState((state, props) => { return {
            page: this.state.page - 1
        }})
    }

    render() {


        let comments = this.state.comments.map(comment => <Comment cid={comment.cid} key={"c"+comment.cid} />)

        let pagination = <></>
        if(comments.length > 0) {
            comments = this.split(comments)
            pagination = <tr className="comment-row">
            <td className="row1 comment-row-end" colSpan="2">
                <div className="comment-pagination">
                    <button className="pagination-button previous" onClick={(this.state.page+1 > 1) ? this.prevPage : null}>Previous</button>
                    <button className="pagination-button next" onClick={(this.state.page+1 < comments.length) ? this.nextPage : null}>Next</button>
                </div>
            </td>
            </tr>
        }
        
        return (
            <>
            <tr className="answer-row" key={this.props.answer.aid}>
            <td colSpan="2" className="row1">
                <p>{this.props.answer.text}</p>
            </td>
            <td className="row2">
                <Voting type="answer" id={this.props.answer.aid} uid={this.state.uid} />
            </td>
            <td className="row3">
                <AnswerInfo answer={this.props.answer} />
            </td>
            </tr>

            {comments[this.state.page]}

            {pagination}
            
            {/* <tr className="comment-row">
            <td className="row1"><span>Write a comment:</span></td>
            <td className="comment-row-end row2"> */}
                <CreateComment type="answer" id={this.props.answer.aid} renderPage={this.props.renderPage} getComments={this.getComments} />
            {/* </td>
            <td colSpan="2"></td>
            </tr> */}
            
            </>
        )
    }
}