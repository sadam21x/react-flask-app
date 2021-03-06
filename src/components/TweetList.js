import React, { Component } from 'react'
import TweetTemplate from './TweetTemplate'

export class TweetList extends Component {
    render() {
        let tweetlist = this.props.tweets.map(tweets => <TweetTemplate key={tweets.id} {...tweets} />);           
        
        return (
            <div>
                <ul className="collection">
                    {tweetlist}
                </ul>
            </div>
        )
    }
}

export default TweetList
