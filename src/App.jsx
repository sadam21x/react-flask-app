import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Tweet from './components/Tweet.jsx'
import TweetList from './components/TweetList.jsx'
import TActions from "./actions/Tactions.jsx"
import TStore from "./stores/TStore.jsx"
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'
import './App.css'

TActions.getAllTweets();

let getAppState = () =>{
  return { tweetslist: TStore.getAll()};
}

export class App extends Component {
    constructor(props){
        super(props);
        this.state= getAppState();
        this._onChange = this._onChange.bind(this);
    }

    componentDidMount() {
        TStore.addChangeListener(this._onChange);
    }

    componentWillUnMount() {
      TStore.removeChangeListener(this._onChange);
    }
    
    _onChange(){
      this.setState(getAppState());
    }

    render() {
        return (
            <div className="__App__ container">
                <Tweet />
                <TweetList tweet={this.state.tweetslist}/>
            </div>
        )
    }
}

let documentReady =() =>{
    ReactDOM.render(
      <App />,
      document.getElementById('root')
    );
};
  
$(documentReady);
