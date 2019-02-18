const { Tweeting } = require("./bot.js");
const { randomTime } = require("../helper/helperFuncs.js");

/**
 * Run program at random intervals
 */
const randomTimeout = () => {
    setTimeout(randomTimeout, randomTime());

    const twitterBot = new Tweeting();
}

/**
* Start running the program
*/
setTimeout(randomTimeout, randomTime());