import axios from 'axios'
import React from 'react'

export default class ProfileTag extends React.Component {
    constructor(props) {
        super(props)

        // this.state = {
        //     questions: []
        // }

        // axios.get("http://127.0.0.1:8000/questionsFromTagID", {params: {tid: this.props.tag.tid}}).then(async res => {this.setState((state, props) => {return {
        //     questions: res.data
        // }})})
    }

    renderQuestions() {
        console.log(this.state.questions)
        this.props.renderPage("Questions", undefined, this.state.questions)
    }
    
    render() {
        // let tagCount = this.props.model.data.questions.filter(question => question.tagIds.includes(this.props.tag.tid)).length
        let tagCount = "#"

        return (
            <div className="tags-container">
                <a id={this.props.tag.tid} onClick={() => this.props.renderProfilePage("editTag", undefined, undefined, this.props.tag.tid)}>{this.props.tag.name}</a>
                {/* <p className="tag-count">{this.state.questions.length} questions</p> */}
            </div>
        )
    }
}