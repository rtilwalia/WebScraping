const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard", requestCallback);

let batsmanProfileUrls = [];

function requestCallback(err, res, html){
    const $ = cheerio.load(html);

    const batsmanAnchorTags = $(".batsman-cell.text-truncate a"); //"a" is for the anchor tag so that link of the player profile can be loaded
    //console.log(typeof(batsmanAnchorTags)); //OBJECT TYPE
    

    //COVERTING FROM OBJECT TYPE TO ARRAY
    for(let i = 0; i < batsmanAnchorTags.length; i++){
        batsmanProfileUrls.push({
            name : $(batsmanAnchorTags[i]).text(),
            url : "https://www.espncricinfo.com" + $(batsmanAnchorTags[i]).attr("href")
        })
    }

    //console.log(batsmanProfileUrls);


    for(let j in batsmanProfileUrls) {
         request(batsmanProfileUrls[j].url, fetchDateOfBirth.bind(this, j));
         //bcz we have to add 4th arg in the fetchDOB func, that's why bind is used
    }

    //request is an async function
    //only callback knows when a request function is completed
    //to make the for loop or the prog knows when it is completed then 

}

let count = 0;
function fetchDateOfBirth(index, err, res, html){ 
    //html has the url of player
    //index has the vlaue of j

    count++;
    const $ = cheerio.load(html); //html of player info is loaded
    //console.log(index); //won't print in serial order cuz of parallel processing

    const playerDateOfBirth = $($(".player_overview-grid h5")[1]).text();
    const playerDateMonth = playerDateOfBirth.split(',')[0].split(" ").reverse();
    const playerYear = playerDateOfBirth.split(',')[1];

    //adding another key-value pair in array for DOB
    batsmanProfileUrls[index]['Date of Birth'] = playerDateMonth + "," + playerYear;
    if(count == batsmanProfileUrls.length){
        console.log(batsmanProfileUrls);
    }



}