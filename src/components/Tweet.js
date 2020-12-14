import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

export class Tweet extends Component {
    sendTweet(event){
        event.preventDefault();
        this.props.sendTweet(this.refs.tweetTextArea.value);
        this.refs.tweetTextArea.value = '';
    }

    render() {
        return (
            <div className="__Tweet__ row">
                <div className="col-s12">
                    <form onSubmit={this.sendTweet.bind(this)}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" ref="tweetTextArea" id="tweet_input" className="validate"/>
                                <label htmlFor="tweet_input">How you doing?</label>
                                <button className="btn waves-effect waves-light right">
                                    TWEET NOW
                                    <i className="material-icons right">send</i>
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default Tweet
