import React, { Component } from 'react'

export class TweetTemplate extends Component {
    render() {
        return (
            <li className="collection-item avatar">
                <i className="material-icons circle red">insert_comment</i>
                <span className="title">{this.props.tweetedby}</span>
                <p>{this.props.body}</p>
                <p>{this.props.timestamp}</p>
            </li>
        )
    }
}

export default TweetTemplate
