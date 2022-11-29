import React from 'react'
import axios from 'axios'
import ProfileTag from './ProfileTag.js'
import Header from './Header.js'

export default class ProfileTagsList extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        // let tags = this.props.model.data.tags.map(tag => <Tag model={this.props.model} tag={tag} key={tag.tid} renderPage={this.props.renderPage}/>)
        // let num_tags = this.props.model.data.tags.length + " Tags"
        let noTagsFound = ""
        let tags = []
        try {
            tags = this.props.tags.map(t => <ProfileTag tag={t} key={t.tid} renderProfilePage={this.props.renderProfilePage}/>)
        } catch {}

        if(tags.length === 0) {
            noTagsFound = <div id="no-questions-found-container"><p>You have not created any tags!</p></div>
        }

        return (
            <div>
            <Header row2="Click on a tag to edit it"/>
            <div className="tags-list">
                {tags}
            </div>
            {noTagsFound}
            </div>

        )
    }
}