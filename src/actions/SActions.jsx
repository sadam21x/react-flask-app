import AppDispatcher from '../dispatcher.jsx';
import ActionTypes from '../constants.jsx'

export default{
  receivedTweets(rawTweets){
    // console.log(3, rawTweets);
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVED_TWEETS,
      rawTweets
    })
  },
  receivedTweet(rawTweet){
    AppDispatcher.dispatch({
      actionType: ActionTypes.RECEIVED_TWEET,
      rawTweet
    })
  }
}
