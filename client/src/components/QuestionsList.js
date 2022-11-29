import React from 'react'
import Question from './Question.js'

export default class QuestionsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            page: 0,
        }

        this.nextPage = this.nextPage.bind(this)
        this.prevPage = this.prevPage.bind(this)
    }

    split(arr) {
        let r = []
        while(arr.length) {
            r.push(arr.splice(0, 5))
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
        let noQuestionsFound = ""
        let questions = []
        try {
            let questionsSorted = this.props.questions.sort((q1, q2) => {
                let d1 = new Date(q1.ask_date_time)
                let d2 = new Date(q2.ask_date_time)
                return d2 - d1
            })
            questions = questionsSorted.map(q => <Question question={q} renderPage={this.props.renderPage} key={q.qid} />)
        } catch {}

        let pagination = <></>

        if(questions.length === 0) {
            noQuestionsFound = <div id="no-questions-found-container"><p>No Questions Found</p></div>
        } else if(questions.length > 0) {
            questions = this.split(questions)
            pagination = <div className="pagination">
                <button className="pagination-button previous" onClick={(this.state.page+1 > 1) ? this.prevPage : null}>Previous</button>
                <button className="pagination-button next" onClick={(this.state.page+1 < questions.length) ? this.nextPage : null}>Next</button>
            </div>
        }

        return (
            <>
            <table className="questions-list">
            <tbody>
                {questions[this.state.page]}
            </tbody>
            </table>

            {/* <div className="pagination">
                <button className="pagination-button" onClick={(this.state.page > questions.length / 5) ? this.prevPage : null}>Previous</button>
                <button className="pagination-button" onClick={(this.state.page < questions.length / 5) ? this.nextPage : null}>Next</button>
            </div> */}
            
            {noQuestionsFound}
            {pagination}
            </>

        )
    }
}