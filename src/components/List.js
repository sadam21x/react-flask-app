import React, { Component } from 'react'
import './List.css'

export class List extends Component {
    constructor(props){
        super(props);
        this.state = {
            data: []
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
                    data: data['tweets_list']
                });
            })
            .catch(error => console.log(error))
    }

    componentDidMount(){
        this.getTweetsData();
    }

    render() {
        var tweets = this.state.data;
        var myObject = this.state.data;

        return (
            <div className="__List__">
                <ul className="collection">
                        <li className="collection-item avatar">
                            <i className="material-icons circle red">insert_comment</i>
                            <span className="title">Sadam</span>
                            <p>Hello world</p>
                            <p>2020-12-26T13:44:47Z</p>
                        </li>
                        {/* {tweets.map((data => 
                            <li>{data}</li>
                        ))} */}

                        {Object.keys(myObject).map(function(key) {
                            return (
                                <li>
                                    Key: {key}, Value: {myObject[key]}
                                </li>
                            );
                        })}
                </ul>
            </div>
        )
    }
}

export default List
