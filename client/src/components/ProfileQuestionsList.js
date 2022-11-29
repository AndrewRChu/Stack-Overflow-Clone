import React from 'react'
import axios from 'axios'
import ProfileQuestion from './ProfileQuestion'
import Header from './Header'

export default class ProfileQuestionsList extends React.Component {
    constructor(props) {
        super(props)
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
            questions = questionsSorted.map(q => <ProfileQuestion question={q} renderProfilePage={this.props.renderProfilePage} key={q.qid} />)
        } catch {}
        

        if(questions.length === 0) {
            noQuestionsFound = <div id="no-questions-found-container"><p>You have not asked any questions!</p></div>
        }

        return (
            <>
            <Header row2="Click on a question to edit it"/>
            <table className="questions-list">
            <tbody>
                {questions}
            </tbody>
            </table>
            {noQuestionsFound}
            </>

        )
    }
}