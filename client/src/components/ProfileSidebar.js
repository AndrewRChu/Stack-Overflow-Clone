import React from 'react'
import axios from 'axios'

export default class ProfileSidebar extends React.Component {
    constructor(props) {
        super(props)

        this.questions = this.questions.bind(this)
    }

    date = x => {
        return Math.round((new Date - new Date(x)) / (60 * 60 * 1000))
    }

    questions() {
        if(this.props.activePage == "questions") return "activeTab"
        return "notActiveTab"
    }

    answers() {
        if(this.props.activePage == "answers") return "activeTab"
        return "notActiveTab"
    }

    tags() {
        if(this.props.activePage == "tags") return "activeTab"
        return "notActiveTab"
    }

    render() {
        
        return (
            <div className="profile-sidebar">
                <span className="username">{this.props.user.username}</span>
                <span className="extra-info">User for {this.date(this.props.user.creation_date)} hours</span>
                <span className="extra-info">{this.props.user.reputation} reputation</span>

                <div className="links">
                    <a className={this.questions()} onClick={() => this.props.renderProfilePage("questions")}>Questions</a>
                    <a className={this.answers()} onClick={() => this.props.renderProfilePage("answers")}>Answers</a>
                    <a className={this.tags()} onClick={() => this.props.renderProfilePage("tags")}>Tags</a>
                </div>
            </div>
        )
    }
}