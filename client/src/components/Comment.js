import React from 'react'
import axios from 'axios'

export default class Comment extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            text: "",
            user: ""
        }

        axios.get("http://127.0.0.1:8000/commentById", {params: {cid: this.props.cid}}).then(async res => {
            if(res.data.length > 0) {
                this.setState((state, props) => { return {
                text: res.data[0].text
                }})
            }
        })

        axios.get("http://127.0.0.1:8000/userFromCommentId", {params: {cid: this.props.cid}}).then(async res => {
            if(res.data.length > 0) {
                this.setState((state, props) => { return {
                user: res.data[0].username
                }})
            }
        })
    }

    render() {
        return (
            <tr className="comment-row" key={"some key"}>
            <td className="row1">
                <span>Comment by <span className="user">{this.state.user}</span></span>
            </td>
            <td className="row2, comment-row-end">
                {this.state.text}
            </td>
            </tr>
        )
    }
}