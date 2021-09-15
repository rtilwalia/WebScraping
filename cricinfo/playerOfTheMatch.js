const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/live-cricket-score", requestCallback);

function requestCallback(err, res, html){
    const $ = cheerio.load(html);

    //1st $ gives the array of the class representing 2 nodes playerofthematch-name
    //2nd $ gives the array idxvalues
    //test() will fetch just the black values or inner html value

    //13-09
    console.log($(".playerofthematch-name").length);
    console.log($($(".playerofthematch-name")[1]).text());

    //to print the node
    // console.log($($(".playerofthematch-name")[1]).text());

    //14-09

    const losingTeam = $(".team-gray .name-link p").text();

    // console.log($(".name-link p")); //this is an object, therefore can't access it as an array
    // const bothTeams = $(".name-link p").map((data) =>{
    //     console.log($(data).text());
    // })
    console.log(losingTeam)

    const bothTeamsObject = $(".name-link p");
    const bothTeamScoreObject = $(".match-info.match-info-MATCH.match-info-MATCH-half-width .score");
    
    const bothTeams = [$(bothTeamsObject[0]).text(), $(bothTeamsObject[1]).text()];
    console.log(bothTeams);

    //.text() .html() any function can be applied on the loaded cheerio only
    //so apply the $ again to make it a loaded cheerio
}

//hw
//winning team and total score