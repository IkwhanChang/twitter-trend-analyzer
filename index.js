var express = require('express');
var app = express();
var Twitter = require('twitter');
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Twitter Settings

var client = new Twitter({
  consumer_key: 'iHsyIsZAjO4YcyO4axlH38nVA',
  consumer_secret: 'yFueAF5Vf4ip5syl7kOs0LOrvyICCM9Ip1SVvpF5RhgYxV5BQl',
  access_token_key: '18710632-RjA44di509peXjHsIdsLajf7lZ06uXeUZg3LPHuGP',
  access_token_secret: 'T3BvunTwnKeWKtaKG0WbrAe5bW1Q2p6znB7kOv2KHcMkJ'
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/searchTweets', function(request, response){
  var keyword = request.param('keyword');
  response.set('Content-Type', 'application/javascript');
  client.get('search/tweets', {q: keyword}, function(error, tweets, resp) {
     response.send(JSON.stringify(tweets));
  });

});

http.listen(app.get('port'), function(){
  console.log('Node app is running on port', app.get('port'));
});



// Twitter Stream API

app.get('/streamTweets', function(request, response){
  var keyword = request.param('keyword');
  response.set('Content-Type', 'application/javascript');
  client.stream('statuses/filter', {track: keyword}, function(stream) {
    stream.on('data', function(event) {
      //console.log(event && event.text);
      response.send(JSON.stringify(event));
    });

    stream.on('error', function(error) {
      //console.log(error);
    });
  });

});

 // Web Socket

 io.on('connection', function(socket){
   console.log('a user connected');
   socket.on('streamTweets', function(keyword){
    console.log('keyword: ' + keyword.keyword);

    client.stream('statuses/filter', {track: keyword.keyword}, function(stream) {
      stream.on('data', function(event) {
        //console.log(event && event.text);
        //response.send(JSON.stringify(event));
        io.emit('tweets', JSON.stringify(event));
      });

      stream.on('error', function(error) {
        //console.log(error);
      });
    });
  });
   socket.on('disconnect', function(){
     console.log('user disconnected');
   });
 });
