import React, { Component } from 'react';
import Tweettemplate from './templatetweet.jsx'

export default class TweetList extends Component {
  render(){
        let tweetlist = this.props.tweet.map(tweet => <Tweettemplate key={tweet.timestamp} {...tweet} />);
        return(
            <div>
                <ul className="collection">
                    {tweetlist}
                </ul>
            </div>
        );
    }
}