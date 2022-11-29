import React from 'react'
import axios from 'axios'
import QuestionInfo from './QuestionInfo.js'
import NewAnswerButton from './NewAnswerButton.js'

export default class Question extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tags: "test",
            num_answers: 0
        }



        axios.get("http://127.0.0.1:8000/answersFromQuestionID", {params: {qid: this.props.question.qid}}).then(async res => 
        {this.setState((state, props) => { return {
            num_answers: res.data.length,
        }})}
    )


    }

    updateViewAndRenderPage() {
        axios.post("http://127.0.0.1:8000/updateQuestionViews", {id: this.props.question.qid}).then(
            this.props.renderPage("AnswerPage", this.props.question, undefined)
        )
    }

    render() {
        axios.get("http://127.0.0.1:8000/tagsFromQuestionID", {params: {qid: this.props.question.qid}}).then(async res => 
        {this.setState((state, props) => { return {
            tags: res.data,
        }})}
        )
        let tags = []
        try {
            tags = this.state.tags.map(t => <button key={t.tid}>{t.name}</button>)
        } catch {}        

        return (
            <tr className="question-row" key={this.props.question.qid}>
                <td width="20%" className="row1">
                    <p>{this.props.question.views} Views</p>
                    <p>{this.state.num_answers} Answers</p>
                    <p>{this.props.question.votes} Votes</p>
                </td>
                <td className="row2">
                    <p id={this.props.question.qid} onClick={() => this.updateViewAndRenderPage()} className="question-title">{this.props.question.title}</p>
                    <div className="question-tags">
                        {tags}
                    </div>
                </td>
                <td width="20%" className="row3">
                    <QuestionInfo question={this.props.question} />
                </td>
            </tr>
        )
    }
}