const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/live-cricket-score", requestCallback);

function requestCallback(err, res, html){
    const $ = cheerio.load(html);

    //1st $ gives the array of the class representing 2 nodes playerofthematch-name
    //2nd $ gives the array idxvalues
    //test() will fetch just the black values or inner html value

    //gives the length
    console.log($(".playerofthematch-name").length);

    //gives the name of the player
    console.log($($(".playerofthematch-name")[1]).text());

    //type of the attribute
    console.log($($(".playerofthematch-name")[1]).get(0).attribs);
}