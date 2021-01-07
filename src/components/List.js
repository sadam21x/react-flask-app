import React, { Component } from 'react'

export class List extends Component {
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
                    tweets: Object.values(data)
                });
                console.log(this.state.tweets);
            })
            .catch(error => console.log(error))
    }

    componentDidMount(){
        this.getTweetsData();
    }

    render() {
        var tweets = this.state.tweets;
        // var tweets_item = tweets.map((tweets) => <li key={tweets._id}>{tweets.body}</li>)

        return (
            <div>
                <ul className="collection">
                        <li className="collection-item avatar">
                            <i className="material-icons circle red">insert_comment</i>
                            <span className="title">Sadam</span>
                            <p>Hello world</p>
                            <p>1999</p>
                        </li>
                        {/* {tweets.map(([id, tweetedby, body, ...timestamp]) => {
                            return(
                                <li>
                                    <p>{ body }</p>
                                    <p>{ body }</p>
                                    <p>{ body }</p>
                                    <p>{ body }</p>
                                    <p>{ body }</p>
                                    <p>{ body }</p>
                                </li>
                            )
                        })} */}
                        {tweets.map(item => {
                            return <li>{item}</li>
                        })}
                </ul>
            </div>
        )
    }
}

export default List
