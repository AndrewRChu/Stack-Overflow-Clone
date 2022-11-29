import React from 'react';
import axios from 'axios';
import Banner from './Banner.js'
import MainPage from './MainPage.js'


export default class FakeStackOverflow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activePage: "Welcome",
      activeQuestion: "",
      questionsList: "",
    }

    this.renderPage = this.renderPage.bind(this)

    axios.get("http://127.0.0.1:8000/questions").then(async res => {this.setState((state, props) => { return {
      questionsList: res.data
    }})})
  }
  
  renderPage(activePage, activeQuestion = this.state.activeQuestion, questionsList = this.state.questionsList) {
    this.setState((state, props) => {return {
      activePage: activePage,
      activeQuestion: activeQuestion,
      questionsList: questionsList
    }})
  }

  render() {
    return (
      <>
        <Banner renderPage={this.renderPage} state={this.state}/>
        <MainPage state={this.state} renderPage={this.renderPage} />
      </>
    )
  }
}
