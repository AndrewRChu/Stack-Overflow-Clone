import React from 'react'
import axios from 'axios'
import Header from './Header.js'
import WelcomePage from './WelcomePage.js'
import QuestionsList from './QuestionsList.js'
import TagsList from './TagsList.js'
import AnswerPage from './AnswerPage.js'
import NewQuestionPage from './NewQuestionPage.js'
import NewAnswerPage from './NewAnswerPage.js'
import NewQuestionButton from './NewQuestionButton.js'
import CreateUserPage from './CreateUserPage.js'
import LoginPage from './LoginPage.js'
import ProfilePage from './ProfilePage.js'

export default class MainPage extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            questionsList: []
        }

        this.getAllQuestions()
    }

    getAllQuestions() {
        axios.get("http://127.0.0.1:8000/questions").then(async res => {this.setState((state, props) => { return {
            questionsList: res.data
        }})})
    }

    logout() {
        axios.get("http://127.0.0.1:8000/logout")
    }

    render() {
        let pageToRender;

        switch(this.props.state.activePage) {
            case "Logout":
                this.logout()
            case "Welcome":
                pageToRender = <WelcomePage renderPage={this.props.renderPage} />
                break;
            case "AllQuestions":
                this.getAllQuestions()
                pageToRender = <>
                    <Header row1={this.state.questionsList.length + " questions"} row2="All Questions" row3={<NewQuestionButton renderPage={this.props.renderPage} />}/>
                    <QuestionsList questions={this.state.questionsList} renderPage={this.props.renderPage}/>
                </>
                break;
            case "Questions":
                pageToRender = <>
                <Header row1={this.props.state.questionsList.length + " questions"} row2="Search Results" row3={<NewQuestionButton renderPage={this.props.renderPage} />}/>
                <QuestionsList questions={this.props.state.questionsList} renderPage={this.props.renderPage}/>
                </>
                break;
            case "Tags":
                pageToRender = <TagsList renderPage={this.props.renderPage}/>
                break;
            case "NewQuestion":
                pageToRender = <NewQuestionPage renderPage={this.props.renderPage}/>
                break;
            case "AnswerPage":
                pageToRender = <AnswerPage question={this.props.state.activeQuestion} renderPage={this.props.renderPage}/>
                break;
            case "NewAnswer":
                pageToRender = <NewAnswerPage model={this.props.model} state={this.props.state} renderPage={this.props.renderPage}/>
                break;
            case "CreateUser":
                pageToRender = <CreateUserPage renderPage={this.props.renderPage}/>
                break;
            case "Login":
                pageToRender = <LoginPage renderPage={this.props.renderPage}/>
                break;
            case "Profile":
                pageToRender = <ProfilePage renderPage={this.props.renderPage}/>
                break;
            default:
                pageToRender = <>SOMETHING WENT WRONG</>
                break;
        }

        return (
            <div id="main">
                {pageToRender}
            </div>
        )
    }
}