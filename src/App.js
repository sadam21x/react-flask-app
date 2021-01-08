import React, { Component } from 'react'
import Tweet from './components/Tweet'
import TweetList from './components/TweetList'
import List from './components/List'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import './App.css'

export class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            tweets: []
        };
        this.getTweetsData = this.getTweetsData.bind(this);
    }

    getTweetsData(){
        fetch('/api/v2/tweets')
            .then(res => {
                return res.json();
            })
            .then(data => {
                this.setState({
                    // tweets: Object.values(data)
                    tweets: data['tweets_list']
                });
                console.log(this.state.tweets);
            })
            .catch(error => console.log(error))
    }

    componentDidMount(){
        this.getTweetsData();
    }

    render() {
        return (
            <div className="__App__ container">
                <Tweet/>
                <TweetList tweets={this.state.tweets}/>
                <List/>
            </div>
        )
    }
}
export default App
