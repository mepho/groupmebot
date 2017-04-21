var HTTPS = require('https');

var botID = process.env.BOT_ID;

var textArray = [
    "Are you kidding me? Grow up!", 
    "Ganja is for goons, no thanks.", 
    "Get a job you hippie wastoid.", 
    "No thanks, I’m a good person.", 
    "You need to go to jail, hempo.", 
    "My dad told me better, no way.", 
    "Grass is crass, also gross! No!",
    "Uhhh... no thanks loser!", 
    "Get away from me, THC addict.", 
    "Yeah right, I’m way too smart.", 
    "Let me think... No way, never.", 
    "No. You are trash if you toke.", 
    "Back off, bucko. You’re bad.", 
    "I would rather not, okay?", 
    "lnjecting weed is for dummies.", 
    "I will never do one toke.", 
    "Absolutely not, I love myself.",
    "Get a grip you sativa snorterl",
    "Bugger off, you bong addict!",
    "I will use my taser on you.",
    "What do I look like? A failure?",
    "Nah, bongs are wrong.",
    "No way! Hemp is horrible!",
    "I’d rather not be a cannibal.",
    "I don’t think so, I’m nice.",
    "I was raised right, I won’t light.",
    "I’d like to keep my iob, thanks.",
    "You wish, pot junker! Back off!",
    "I’m calling the Coast Guard.",
    "No tokes for me. I’m cool.",
    "Leave me be, you blunt blazer!",
    "No, i’m as clean as a whistle.",
    "That’s a death 'roach.' No.",
    "I’ll pass on your pot offer.",
    "Cannabis is crap, you cretin!",
    "Pish posh, pot is for the birds!",
    "Nope. THC is not for me.",
    "Step out of my zone, now.",
    "Get off my case, weed stoner.",
    "Nuh uh, I respect the police.",
    "Lay off, I listen to the law.",
    "NO! Blunts are for bad men.",
    "I’d rather not die. Tokes kill.",
    "No, weeds are for whacking.",
    "Marijuana is for morons, ok?",
    "Are you serious? Get a life.",
    "You’re dumb if you do ‘dank.'",
    "Stoners are loners. I’m good.",
    "Nope! Spliffs are for wimps!",
    "No, man. I follow MMYV."
];

function respond() {
  var request = JSON.parse(this.req.chunks[0]),
      botRegex = /^.*(weed|Weed|Smoke|smoke|roll up|Roll up|Roll Up).*$/;

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
