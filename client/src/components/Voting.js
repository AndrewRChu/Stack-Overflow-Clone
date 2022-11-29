import React from 'react'
import axios from 'axios'

export default class Voting extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: false,
            reputation: 0,
            votes: 0,
            upvoted: false,
            downvoted: false
        }

        this.upvote = this.upvote.bind(this)
        this.downvote = this.downvote.bind(this)
        this.updateVotes = this.updateVotes.bind(this)
        this.updateReputation = this.updateReputation.bind(this)

        axios.get("http://127.0.0.1:8000/checkLoggedIn").then(async res => {
                this.setState((state, props) => { return {
                username: res.data
                }})
                if(res.data) {
                    axios.get("http://127.0.0.1:8000/reputationFromUserId").then(async res2 => {
                        this.setState((state, props) => { return {
                        reputation: res2.data[0].reputation
                        }})
                    })
                }
            }
        )

        if(this.props.type === "question") {
            axios.get("http://127.0.0.1:8000/votesFromQuestionId", {params: {qid: this.props.id}}).then(async res => {
                this.setState((state, props) => { return {
                    votes: res.data[0].votes
                }})
            })
        } else if(this.props.type === "answer") {
            axios.get("http://127.0.0.1:8000/votesFromAnswerId", {params: {aid: this.props.id}}).then(async res => {
                this.setState((state, props) => { return {
                    votes: res.data[0].votes
                }})
            })
        }

    }

    upvote() {
        if (this.state.upvoted) {
            this.setState((state, props) => { return {
                votes: state.votes - 1,
                upvoted: false,
                downvoted: false
            }})
            this.updateVotes(-1)
            this.updateReputation(-5)
        } else {
            if (!this.state.downvoted) {
                this.setState((state, props) => { return {
                    votes: state.votes + 1,
                    upvoted: true,
                    downvoted: false
                }})
                this.updateVotes(1)
                this.updateReputation(5)
            } else {
                this.setState((state, props) => { return {
                    votes: state.votes + 2,
                    upvoted: true, 
                    downvoted: false
                }})
                this.updateVotes(2)
                this.updateReputation(15)
            }
        }
    }

    downvote() {
        if (this.state.downvoted) {
            this.setState((state, props) => { return {
                votes: state.votes + 1,
                upvoted: false,
                downvoted: false
            }})
            this.updateVotes(1)
            this.updateReputation(10)
        } else {
            if (!this.state.upvoted) {
                this.setState((state, props) => { return {
                    votes: state.votes - 1,
                    upvoted: false,
                    downvoted: true
                }})
                this.updateVotes(-1)
                this.updateReputation(-10)
            } else {
                this.setState((state, props) => { return {
                    votes: state.votes - 2,
                    upvoted: false, 
                    downvoted: true
                }})
                this.updateVotes(-2)
                this.updateReputation(-15)
            }
        }
    }

    updateVotes(num) {
        if(this.props.type === "question") {
            axios.post("http://127.0.0.1:8000/updateQuestionVotes", {qid: this.props.id, votes: num})
        } else if (this.props.type === "answer") {
            axios.post("http://127.0.0.1:8000/updateAnswerVotes", {aid: this.props.id, votes: num})
        }
    }

    updateReputation(num) {
        axios.post("http://127.0.0.1:8000/updateReputation", {uid: this.props.uid, reputation: num})
    }

    render() {
        const upvoteStyle = {
            backgroundColor: "lightgreen"
        }
        const downvoteStyle = {
            backgroundColor: "lightcoral"
        }
        let upvoteButton = <></>
        let downvoteButton = <></>
        if(this.state.username && this.state.reputation >= 100) {
            upvoteButton = <button onClick={this.upvote} style={this.state.upvoted ? upvoteStyle : null}>&#8679;</button>
            downvoteButton = <button onClick={this.downvote} style={this.state.downvoted ? downvoteStyle : null}>&#8681;</button>
        }
        return (
            <div className="voting">
                {upvoteButton}
                <span>{this.state.votes} votes</span>
                {downvoteButton}
            </div>
        )
    }
}