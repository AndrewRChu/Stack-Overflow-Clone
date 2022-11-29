import React from 'react'
import axios from 'axios'
import ProfileAnswer from './ProfileAnswer'
import Header from './Header'

export default class ProfileAnswersList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        let noAnswersFound = ""

        let answers = this.props.answers.sort((a1, a2) => {
            let d1 = new Date(a1.ans_date_time)
            let d2 = new Date(a2.ans_date_time)
            return d1 - d2
        }).map(a => <ProfileAnswer answer={a} key={a.aid} renderProfilePage={this.props.renderProfilePage} />)

        if(answers.length === 0) {
            noAnswersFound = <div id="no-questions-found-container"><p>You have not answered any questions!</p></div>
        }

        return (
            <div>
            <Header row2="Click on an answer to edit it"/>
            <table className="answers-list">
            <tbody>
                {answers}
            </tbody>
            </table>
            {noAnswersFound}
            </div>


        )
    }
}