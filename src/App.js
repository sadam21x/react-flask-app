import React, { Component } from 'react'
import Tweet from './components/Tweet'
import TweetList from './components/TweetList'
import List from './components/List'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import './App.css'

export class App extends Component {
    render() {
        return (
            <div className="__App__ container">
                <Tweet/>
                {/* <TweetList tweets={this.state.tweets}/> */}
                {/* <List/> */}
            </div>
        )
    }
}
export default App
