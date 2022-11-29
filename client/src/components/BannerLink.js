import React from 'react';

export default class BannerLink extends React.Component{
    constructor(props) {
        super(props)
    }
    
    render() {
        let activeTab = "notActiveTab"
        if(this.props.state.activePage == this.props.name) {
            activeTab = "activeTab"
        }
        return (
            <li id={this.props.id} className={activeTab} onClick={() => this.props.renderPage(this.props.name, undefined, undefined)}><a>{this.props.text}</a></li>
        )
    }
}