import React from 'react'
import axios from 'axios'
import Header from './Header.js'
import NewQuestionButton from './NewQuestionButton.js'
import QuestionInfo from './QuestionInfo.js'
import Answer from './Answer.js'
import NewAnswerButton from './NewAnswerButton.js'
import Voting from './Voting.js'
import CreateComment from './CreateComment.js'
import Comment from './Comment.js'

export default class AnswerPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            page: 0,
            commentPage: 0,
            answers: [],
            comments: [],
            uid: ""
        }

        this.getComments = this.getComments.bind(this)
        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
        this.nextPageComment = this.nextPageComment.bind(this)
        this.prevPageComment = this.prevPageComment.bind(this)

        axios.get("http://127.0.0.1:8000/userFromQuestionId", {params: {qid: this.props.question.qid}}).then(async res => {this.setState((state, props) => { return {
            uid: res.data[0].uid
        }})})

        this.getComments()
    }

    getComments() {
        axios.get("http://127.0.0.1:8000/commentsFromQuestionID", {params: {qstnId: this.props.question.qid}}).then(async res => {
            this.setState((state, props) => { return {
                comments: res.data
            }})
        })
    }

    split(arr, n) {
        let r = []
        while(arr.length) {
            r.push(arr.splice(0, n))
        }
        return r
    }

    nextPage() {
        this.setState((state, props) => { return {
            page: this.state.page + 1
        }})
    }

    nextPageComment() {
        this.setState((state, props) => { return {
            commentPage: this.state.commentPage + 1
        }})
    }

    prevPage() {
        this.setState((state, props) => { return {
            page: this.state.page - 1
        }})
    }

    prevPageComment() {
        this.setState((state, props) => { return {
            commentPage: this.state.commentPage - 1
        }})
    }

    render() {
        axios.get("http://127.0.0.1:8000/answersFromQuestionID", {params: {qid: this.props.question.qid}}).then(async res => {
            this.setState((state, props) => { return {
                answers: res.data
            }})
        })

        let comments = this.state.comments.map(comment => <Comment cid={comment.cid} key={"c"+comment.cid} />)
        let commentPagination = <></>
        if(comments.length > 0) {
            comments = this.split(comments, 3)
            commentPagination = <tr className="comment-row">
            <td className="row1 comment-row-end" colSpan="2">
            <div className="comment-pagination">
                <button className="pagination-button previous" onClick={(this.state.commentPage+1 > 1) ? this.prevPageComment : null}>Previous</button>
                <button className="pagination-button next" onClick={(this.state.commentPage+1 < comments.length) ? this.nextPageComment : null}>Next</button>
            </div>
            </td>
            </tr>
        }

        let answers = this.state.answers.sort((a1, a2) => {
            let d1 = new Date(a1.ans_date_time)
            let d2 = new Date(a2.ans_date_time)
            return d1 - d2
        }).map(a => <Answer answer={a} key={"a"+a.aid} renderPage={this.props.renderPage} getComments={this.getComments}/>)

        let pagination = <></>
        if(answers.length > 0) {
            answers = this.split(answers, 5)
            pagination = <div className="pagination">
                <button className="pagination-button previous" onClick={(this.state.page+1 > 1) ? this.prevPage : null}>Previous</button>
                <button className="pagination-button next" onClick={(this.state.page+1 < answers.length) ? this.nextPage : null}>Next</button>
            </div>
        }

        return (
            <div>
            <Header row1={answers.length + " answers"} row2={this.props.question.title} row3={<NewQuestionButton renderPage={this.props.renderPage} />}/>
            <table className="answers-list">
            <thead>
                <tr className="question-row" key={this.props.question.qid}>
                <td width="20%" className="row1">
                    <p>{this.props.question.views + 1} Views</p>
                </td>
                <td className="row2">
                    <p>{this.props.question.text}</p>
                </td>
                <td width="8%" className="row3">
                    <Voting type="question" id={this.props.question.qid} uid={this.state.uid} />
                </td>
                <td width="15%" className="row4">
                    <QuestionInfo question={this.props.question} />
                </td>
                </tr>

                {comments[this.state.commentPage]}

                {commentPagination}

                {/* <tr className="comment-row">
                <td className="row1"><span>Write a comment:</span></td>
                <td className="comment-row-end row2"> */}
                    <CreateComment type="question" id={this.props.question.qid} renderPage={this.props.renderPage} getComments={this.getComments}/>
                {/* </td>
                <td colSpan="2"></td>
                </tr> */}
            </thead>
            <tbody>
                {answers[this.state.page]}
            </tbody>
            </table>
            {pagination}
            <div className="answer-question-button-container"><NewAnswerButton renderPage={this.props.renderPage}/></div>
            </div>


        )
    }
}