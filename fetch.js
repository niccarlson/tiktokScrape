// fetch.js
var marker = `<meta name="viewport" content="width=device-width"/><meta charSet="utf-8"/><title>`
var markerB = `<meta name="description" content="`
var userN = ''
var followers = ''
var info = []


function startScrape(){
    for (let index = 0; index < 300; index++) {
        userN = ''
        followers = ''
        randomString = getRandom()
        randomUrl = `https://vm.tiktok.com/${randomString}/`
        console.log(randomUrl)
        getUsername(randomUrl, index)
    }

    
}

function clean(){
    var splicelist = []
    for (let i = 0; i < info.length; i++) {
        if(info[i].length == 0){
            splicelist.push(i)
        } else if(info[i][0].indexOf('@') == -1){
            splicelist.push(i)
        }
    }
    for (let j = 0; j < splicelist.length; j++) {
        info.splice(splicelist[j]-j, 1)
    }
    console.log(info.length)
}

function printAll(){
    clean()
    for (let i = 0; i < info.length; i++) {
        console.log(`${info[i][0]},${info[i][1]}`)
        
    }
}
function getUsername(ttURL, i)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            userN = xmlHttp.responseText.substring(xmlHttp.responseText.indexOf(marker), xmlHttp.responseText.length)
            userN = userN.substring(userN.indexOf('(') + 1, userN.indexOf(')'))
            if(xmlHttp.status == 404){
                xmlHttp.abort()
            } else {
                info[i] = [];
                if(userN !== ''){
                    if(info[i].length == 0){
                        console.log(userN)
                        info[i].push(userN)
                        getFollowers(userN, i)
                    }
                }
            }
            
        }
    xmlHttp.open("GET", ttURL, true); // true for asynchronous 
    xmlHttp.setRequestHeader('User-Agent', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')
    xmlHttp.send(null);

}

function getFollowers(username, i){ 
    var xmlHttpB = new XMLHttpRequest();
    xmlHttpB.onreadystatechange = function() { 
        if (xmlHttpB.readyState == 4 && xmlHttpB.status == 200)
            followers = ''
            followers = xmlHttpB.responseText.substring(xmlHttpB.responseText.indexOf(markerB), xmlHttpB.responseText.length)
            followers = followers.substring(followers.indexOf('Likes. ') + 6, followers.indexOf(' Fans.'))
            if(info[i].length == 1){
                if(followers !== ''){
                    console.log(followers);
                    info[i].push(followers)
    
                }
            }
            
    }   
    xmlHttpB.open("GET", `https://tiktok.com/${username}`, true); // true for asynchronous 
    xmlHttpB.setRequestHeader('User-Agent', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)')
    xmlHttpB.send(null);
}

function getRandom(){
    var mask = 'abcdefghijkmnpqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    var result = '';
    for (var i = 6; i > 0; --i) result += mask[Math.round(Math.random() * (mask.length - 1))];
    return result;
}
