$('.sidenav').sidenav();

var tweets = [];

// get_tweets();
// render_tweets(tweets);

function get_tweets(){
    $.ajax({
        type: 'GET',
        url: '/api/v2/tweets',
        dataType: 'json',
        success: function(data){
            // tweets = Object.values(data);
            tweets = data;
            console.log(tweets);
        }
    });
}

function render_tweets(tweets){
    for (let index = 0; index < tweets.length; index++) {
        let elem = '<li>'+ tweets[i].body + '</li>';
        $('#tweetlist').append(elem);
    }
}