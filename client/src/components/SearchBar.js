import React from 'react';
import axios from 'axios'

export default class SearchBar extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            questionsList: []
        }

        this.search = this.search.bind(this)
    }

    search(search) {
        if(window.event.keyCode == 13) {
            const terms = search.split(" ")
            let tags = terms.filter(term => (term.charAt(0) === '[' && term.charAt(term.length - 1) === ']') ? true : false).map(tag => tag.slice(1, tag.length - 1))
            tags = Array.from(new Set(tags))
            let words = terms.filter(term => (term.charAt(0) === '[' && term.charAt(term.length - 1) === ']') ? false : true)

            tags = tags.reduce((prev, curr) => prev + "\"" + curr + "\"\,", "").slice(0, -1)
            words = words.toString().replaceAll(",", "|")

            console.log("tags:", tags)
            console.log("words:", words)
            let questionsToRender = []


            axios.get("http://127.0.0.1:8000/questionsFromSearch", {params: {tags: tags, words: words}}).then(res => {
                this.setState((state, props) => { return {
                questionsList: res.data
                }})
                this.props.renderPage("Questions", undefined, this.state.questionsList)
            })
        }
    }

    render() {
        return (
            <input id="search-bar" onKeyDown={() => this.search(document.getElementById("search-bar").value)} type="text" placeholder="Search ..." />
        )
    }
}