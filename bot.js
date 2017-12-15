const twit = require('twit');
const config = require('./config.js');

let Twitter = new twit(config)

// Tweet
let retweet = () => {
    let params = {
        q: '#javascript OR #nodejs OR #react OR #redux OR #express OR #sequelize OR #nerdstack OR #softwareengineering',
        result_type: 'recent',
        lang: 'en'
    }

    Twitter.get('search/tweets', params, (err,data) => {
        if(!err){
            let retweetId = data.statuses[0].id_str;
            Twitter.post('statuses/retweet/:id', {
                id: retweetId
            }, (err, response) => {
                if(response){
                    console.log('Retweeted!');
                }
                if(err){
                    console.log('Something went wrong while Retweeting... maybe duplicate...')
                }
            })
        } else {
            console.log('Something went wrong while Searching...');
        }
    })
}

retweet();
setInterval(retweet, 5000000);

// Favorite
let favoriteTweet = () => {
    let params = {
        q: '#javascript OR #nodejs OR #react OR #redux OR #express OR #sequelize OR #nerdstack OR #softwareengineering',
        result_type: 'recent',
        lang: 'en'
    }

    Twitter.get('search/tweets', params, (err, data) => {
        let tweet = data.statuses;
        let randomTweet = ranDom(tweet);
        if(typeof randomTweet != 'undefined'){
            Twitter.post('favorites/create', {id: randomTweet.id_str}, (err,response) => {
                if(err){
                    console.log('Cannot be favorited... error');
                } else {
                    console.log('Favorited!');
                }
            });
        }
    });
}

favoriteTweet();
setInterval(favoriteTweet, 6600000);

function ranDom(arr){
    let index = Math.floor(Math.random()*arr.length);
    return arr[index];
};