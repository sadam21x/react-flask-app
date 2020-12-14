import React, { Component } from 'react'
// import { useCookies } from 'react-cookie'
import Tweet from './components/Tweet'
import TweetList from './components/TweetList'
import './App.css'

export class App extends Component {
    constructor(props){
        super(props);
        // const [cookies, setCookie, removeCookie] = useCookies(['session']);
        this.state = { 
            tweets: [{
                'id': 1,
                'name': 'Sadam',
                'body': 'Listen to your heart. It knows all things.'
            }],
            'name': 'Sadam'
        };
    }

    addTweet(tweet){
        let newTweet = this.state.tweets;
        newTweet.unshift({'id': Date.now(), 'name': 'guest','body':tweet});
        this.setState({tweets: newTweet});
    }


    render() {
        return (
            <div className="__App__">
                <Tweet sendTweet={this.addTweet.bind(this)}/>
                <TweetList tweetedBy={this.state.name} body="Lets Go"/>
            </div>
        )
    }
}

export default App
