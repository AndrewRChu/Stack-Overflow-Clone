import React from 'react'
import axios from 'axios'
import AnswerInfo from './AnswerInfo'

export default class ProfileAnswer extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <>
            <tr className="answer-row" key={this.props.answer.aid}>
            <td colSpan="3" className="row1">
                <p className="profile-answer-text" onClick={() => this.props.renderProfilePage("editAnswer", undefined, this.props.answer.aid, undefined)}>{this.props.answer.text}</p>
            </td>
            <td className="row3" width="20%">
                <AnswerInfo answer={this.props.answer} />
            </td>
            </tr>            
            </>
        )
    }
}