import React from 'react';
import axios from 'axios';
import BannerLink from './BannerLink.js'
import SearchBar from './SearchBar.js'

export default class Banner extends React.Component{
    constructor(props) {
        super(props)

        this.state = {
            username: false
        }
    }

    checkLogIn() {
        axios.get("http://127.0.0.1:8000/checkLoggedIn").then(async res => {this.setState((state, props) => { return {
            username: res.data
        }})})
    }

    render() {
        this.checkLogIn()
        let profile = <></>
        let logoutOrHome = <BannerLink renderPage={this.props.renderPage} state={this.props.state} name="Welcome" text="Home" />
        if(this.state.username) {
            profile = <BannerLink renderPage={this.props.renderPage} state={this.props.state} name="Profile" text={this.state.username} />
            logoutOrHome = <BannerLink renderPage={this.props.renderPage} state={this.props.state} name="Logout" text="Logout" />
        }
        return (
            <div id="banner">
                <div className="banner-links">
                    <ul>
                        <BannerLink renderPage={this.props.renderPage} state={this.props.state} name="AllQuestions" text="Questions" />
                        <BannerLink renderPage={this.props.renderPage} state={this.props.state} name="Tags" text="Tags" />
                    </ul>
                </div>
                <span><b>Fake Stack Overflow</b></span>
                <SearchBar renderPage={this.props.renderPage}/>
                <div className="banner-links">
                    <ul>
                        {profile}
                        {logoutOrHome}
                    </ul>
                </div>
            </div>
        )
    }
}