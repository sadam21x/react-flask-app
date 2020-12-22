import React, { Component } from 'react'
import 'jquery/dist/jquery.min.js'
import $ from 'jquery'
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

    addTweet(tweet) {
        var self = this;
        
        $.ajax({
            url: '/api/v2/tweets',
            contentType: 'application/json',
            type: 'POST',
            data: JSON.stringify({
                'username': "Agnsur",
                'body': tweet,
            }),
            success: function (data) {
                return console.log("success");
            },
            error: function () {
                return console.log("Failed");
            }
        });
    }

    componentDidMount() {
        var self = this;

        $.ajax({
            url: `/api/v2/tweets`,
            success: function (data) {
                self.setState({
                    tweets: data['tweets_list']
                });
                alert(self.state.tweets);
                return console.log("success");
            },
            error: function () {
                return console.log("Failed");
            }
        });
    }


    render() {
        return (
            <div className="__App__">
                <Tweet sendTweet={this.addTweet.bind(this)}/>
                <TweetList tweets={this.state.tweets}/>
            </div>
        )
    }
}

export default App
