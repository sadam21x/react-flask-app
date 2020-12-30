import React, { Component } from 'react'
import 'materialize-css/dist/css/materialize.min.css'
import 'materialize-css/dist/js/materialize.min.js'

export class Tweet extends Component {
    constructor(props){
        super(props);
        this.state = {
            values: {
                body: ""
            }
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler(event){
        this.setState({
            values: { ...this.state.values, [event.target.name]: event.target.value }
        });
    }

    submitHandler(event){
        event.preventDefault();

        fetch('/api/v2/tweets', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state.values)
        })
            .then(res => {
                return res.json();
            })
            .then(data => {
                console.log(data);
            })
    }

    render() {
        return (
            <div className="__Tweet__ row">
                <div className="col-s12">
                    <form onSubmit={this.submitHandler}>
                        <div className="row">
                            <div className="input-field col s12">
                                <input type="text" name="body" id="tweet_input" className="validate" value={this.state.values.body} onChange={this.changeHandler}/>
                                <label htmlFor="tweet_input">How you doing?</label>
                                <button type="submit" className="btn waves-effect waves-light right">
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
