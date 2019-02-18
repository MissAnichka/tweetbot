const ranDom = (arr) => {
    let index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

const randomTime = () => {
    const time = Math.random() * 100000000;
    console.log("Time: ", time);
    return time;
}

module.exports = { ranDom, randomTime }