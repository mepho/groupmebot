var HTTPS = require('https');

var botID = process.env.BOT_ID;

var textArray = [
    'another weed test',
    'test2'
];

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^.*weed.*$/;

  if(request.text && botRegex.test(request.text)) {
    this.res.writeHead(200);
    postMessage("Are you kidding me? Grow up!");
    this.res.end();
  } else {
    console.log("don't care");
    this.res.writeHead(200);
    this.res.end();
  }
}

function postMessage() {
  var botResponse, options, body, botReq;

  options = {
    hostname: 'api.groupme.com',
    path: '/v3/bots/post',
    method: 'POST'
  };

  var random = Math.floor(Math.random()*textArray.length);
  botResponse = textArray[random];
  
  body = {
    "bot_id" : botID,
    "text" : botResponse
  };

  console.log('sending ' + botResponse + ' to ' + botID);

  botReq = HTTPS.request(options, function(res) {
      if(res.statusCode == 202) {
        //neat
      } else {
        console.log('rejecting bad status code ' + res.statusCode);
      }
  });

  botReq.on('error', function(err) {
    console.log('error posting message '  + JSON.stringify(err));
  });
  botReq.on('timeout', function(err) {
    console.log('timeout posting message '  + JSON.stringify(err));
  });
  botReq.end(JSON.stringify(body));
}


exports.respond = respond;
