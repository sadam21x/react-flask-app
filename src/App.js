import React, { Component } from 'react'
import 'jquery/dist/jquery.min.js'
import $ from 'jquery'
import Tweet from './components/Tweet'
import TweetList from './components/TweetList'
import List from './components/List'
import './App.css'

export class App extends Component {
    constructor(props){
        super(props);
        this.state = { 
            tweet: [] 
        };
        this.getData = this.getData.bind(this);
    }

    getData() {
        fetch('/api/v2/tweets')
            .then(res => {
                return res.json();
            })
            .then(data => {
                var dataArray = Object.entries(data);
                this.setState({
                    tweet: dataArray
                });
                console.log(this.state.tweet);
                console.log(typeof this.state.tweet);
            })
    }

    componentDidMount() {
        this.getData();
    }


    render() {
        return (
            <div className="__App__ container">
                <Tweet/>
                <TweetList tweet={this.state.tweet}/>
                {/* <List/> */}
            </div>
        )
    }
}

export default App
