import React, { Component } from 'react'

export class TweetList extends Component {
    render() {
        const { tweetedBy } = this.props;
        const { body } = this.props;
        
        return (
            <div>
                <ul className="collection">
                    <li className="collection-item avatar">
                        <i className="material-icons circle red">play_arrow</i>
                        <p>{ tweetedBy }</p>
                        <p>{ body }</p>
                    </li>
                </ul>
            </div>
        )
    }
}

export default TweetList
