import React, { Component } from 'react'

export class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            tweets: null
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
                    tweets: data
                });
                console.log(this.state.tweets);
            })
    }

    componentDidMount(){
        this.getTweetsData();
    }

    render() {
        var tweets = this.state.tweets;

        return (
            <div>
                <ul className="collection">
                    {Object.keys(tweets).map(key => (
                        <li className="collection-item avatar">
                            <i className="material-icons circle red">insert_comment</i>
                            <span className="title">Sadam</span>
                            <p>Hello world</p>
                            <p>1999</p>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default List
