const twit = require("twit");
const { ranDom } = require("../helper/helperFuncs.js")
const config = process.env.consumer_key ? process.env : require("../secrets/config.js");

class Tweeting {
    constructor() {
        this.twitter = new twit(config);
        this.start();
    }

    start() {
        this.retweet();
        this.favoriteTweet();
    }

    // Tweet
    retweet() {
        let params = {
            q: '#javascript OR #nodejs OR #react OR #redux OR #express OR #sequelize OR #nerdstack OR #softwareengineering OR #programmer OR #coder OR #devlife OR #softwaredeveloper OR #python OR #machinelearning OR #deeplearning OR #pytorch OR #aws OR #deepracer OR #google',
            result_type: 'recent',
            lang: 'en'
        }

        this.twitter.get('search/tweets', params, (err, data) => {
            if (!err) {
                let retweetId = data.statuses[0].id_str;
                this.twitter.post('statuses/retweet/:id', {
                    id: retweetId
                }, (err, response) => {
                    if (response) {
                        console.log('Retweeted!');
                    }
                    if (err) {
                        console.log('Something went wrong while Retweeting... maybe duplicate...')
                    }
                })
            } else {
                console.log('Something went wrong while Searching...');
            }
        })
    }

    // Favorite
    favoriteTweet() {
        let params = {
            q: '#javascript OR #nodejs OR #react OR #redux OR #express OR #sequelize OR #nerdstack OR #softwareengineering OR #programmer OR #coder OR #devlife OR #softwaredeveloper OR #python OR #machinelearning OR #deeplearning OR #pytorch OR #aws OR #deepracer OR #google',
            result_type: 'recent',
            lang: 'en'
        }

        this.twitter.get('search/tweets', params, (err, data) => {
            let tweet = data.statuses;
            let randomTweet = ranDom(tweet);
            if (typeof randomTweet != 'undefined') {
                this.twitter.post('favorites/create', { id: randomTweet.id_str }, (err, response) => {
                    if (err) {
                        console.log('Cannot be favorited... error');
                    } else {
                        console.log('Favorited!');
                    }
                });
            }
        });
    }
}

module.exports = { Tweeting }