import React, { Component } from 'react'
import TweetTemplate from './TweetTemplate'

export class TweetList extends Component {
    render() {
        let tweetlist = this.props.tweet.map(tweet => <TweetTemplate key={tweet.id} {...tweet} />);           
        
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
