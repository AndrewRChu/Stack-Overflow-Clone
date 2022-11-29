import React from 'react'

export default class Header extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <table className="header">
            <thead>
                <tr>
                    <th width="20%" id="row1">{this.props.row1}</th>
                    <th id="row2">{this.props.row2}</th>
                    <th width="20%" id="row3">{this.props.row3}</th>
                </tr>
            </thead>
            </table>
        )
    }
}