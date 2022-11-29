import React from 'react'
import axios from 'axios'
import QuestionsList from './QuestionsList'
import ProfileSidebar from './ProfileSidebar'
import ProfileQuestionsList from './ProfileQuestionsList'
import ProfileAnswersList from './ProfileAnswersList'
import ProfileTagsList from './ProfileTagsList'
import EditQuestionPage from './EditQuestionPage'
import EditAnswerPage from './EditAnswerPage'
import EditTagPage from './EditTagPage'

export default class ProfilePage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: "",
            questionsList: [],
            answersList: [],
            tagsList: [],
            profilePage: "questions",
            activeQuestion: "",
            activeAnswer: "",
            activeTag: "",
        }

        this.renderProfilePage = this.renderProfilePage.bind(this)

        this.getQuestions()
        this.getAnswers()
        this.getTags()

        axios.get("http://127.0.0.1:8000/user").then(async res => {
            this.setState((state, props) => { return {
                user: res.data[0]
            }})
        })


        axios.get("http://127.0.0.1:8000/tagsFromUserId").then(async res => {
            this.setState((state, props) => { return {
                tags: res.data
            }})
        })
    }

    getQuestions() {
        axios.get("http://127.0.0.1:8000/questionsFromUserId").then(async res => {
            this.setState((state, props) => { return {
                questionsList: res.data
            }})
        })
    }

    getAnswers() {
        axios.get("http://127.0.0.1:8000/answersFromUserId").then(async res => {
            this.setState((state, props) => { return {
                answersList: res.data
            }})
        })
    }

    getTags() {
        axios.get("http://127.0.0.1:8000/tagsCreatedByUserId").then(async res => {
            this.setState((state, props) => { return {
                tagsList: res.data
            }})
        })
    }

    date = x => {
        return Math.round((new Date - new Date(x)) / (60 * 60 * 1000))
    }

    renderProfilePage(page, question, answer, tag) {
        this.setState((state, props) => {return {
            profilePage: page,
            activeQuestion: question,
            activeAnswer: answer,
            activeTag: tag,
          }})
    }

    render() {
        let pageToRender;

        switch(this.state.profilePage) {
            case "questions":
                this.getQuestions()
                pageToRender = <ProfileQuestionsList questions={this.state.questionsList} renderPage={this.props.renderPage} renderProfilePage={this.renderProfilePage} />
                break;
            case "answers":
                this.getAnswers()
                pageToRender = <ProfileAnswersList answers={this.state.answersList} renderProfilePage={this.renderProfilePage} />
                break;
            case "tags":
                this.getTags()
                pageToRender = <ProfileTagsList tags={this.state.tagsList} renderProfilePage={this.renderProfilePage} />
                break;
            case "editQuestion":
                pageToRender = <EditQuestionPage renderProfilePage={this.renderProfilePage} question={this.state.activeQuestion} />
                break;
            case "editAnswer":
                pageToRender = <EditAnswerPage renderProfilePage={this.renderProfilePage} answer={this.state.activeAnswer} />
                break;
            case "editTag":
                pageToRender = <EditTagPage renderProfilePage={this.renderProfilePage} tag={this.state.activeTag} />
                break;
            default:
                pageToRender = <>SOMETHING WENT WRONG</>
                break;
        }

        return (
            <>
            <ProfileSidebar user={this.state.user} renderPage={this.props.renderPage} renderProfilePage={this.renderProfilePage} activePage={this.state.profilePage} />
            <div className="profile-main-content">
                {/* <QuestionsList questions={this.state.questionsList} renderPage={this.props.renderPage}/> */}
                {pageToRender}
            </div>
            </>
        )
    }
}