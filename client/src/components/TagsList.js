import React from 'react'
import axios from 'axios'
import Tag from './Tag.js'
import Header from './Header.js'
import NewQuestionButton from './NewQuestionButton.js'

export default class TagsList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            tags: []
        }

        axios.get("http://127.0.0.1:8000/tags").then(async res => {this.setState((state, props) => { return {
            tags: res.data
          }})})
    }

    render() {
        // let tags = this.props.model.data.tags.map(tag => <Tag model={this.props.model} tag={tag} key={tag.tid} renderPage={this.props.renderPage}/>)
        // let num_tags = this.props.model.data.tags.length + " Tags"
        let tags = []
        try {
            tags = this.state.tags.map(t => <Tag tag={t} key={t.tid} renderPage={this.props.renderPage}/>)
        } catch {}

        return (
            <div>
            <Header row1={this.state.tags.length + " tags"} row2="All Tags" row3={<NewQuestionButton renderPage={this.props.renderPage} />}/>
            <div className="tags-list">
                {tags}
            </div>
            </div>

        )
    }
}