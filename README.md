# Twitter Trend Analyzer
The trend analysis engine for a specific keyword of Twitter by using a graphical chart and geographical chart.

![Demo](https://matthew.kr/wp-content/uploads/2017/11/ezgif-1-665b92f4f2.gif)

## Slides
https://www.slideshare.net/izie00/twitter-trend-analyzer

## Description
- Twitter is one of popular social networking tools to share our think or news, and it will rapidly spread across the worlds.
- This project is a web application to collect the Twitter's feeds related to the specific word, and then provide the user a daily trend by using a real-time linear chart and geographical chart.

## Data Flows
![Data Flows](https://matthew.kr/wp-content/uploads/2017/11/Picture1.png)

In this project, we basically implemented both backend and frontend. We used the Twitter’s Stream API in order to track of public user’s twits. The streaming data from Twitter is coming simultaneously when user write down some twits. Once our backend received the tweet, we then call the web socket’s handler in the backend. Since the WebSocket handler is connected between frontend and backend, frontend also can recognize and receive when the streamed tweet is arrived.

In the frontend aspect, it consists of four parts: 
1) Search Bar: user can input his/her own interested keyword such as “Samsung” or “Apple
2) Real-time Tweets: Once user start the program with keyword, the streamed tweets are appeared in this layer.
3) Linear Chart: The responsive chart will also start by using the streamed data so that user can easily understand what’s going on in the real-time
4) Geographical Chart: Similar as linear chart, geographical chart will show the location of user who did post related of the keyword.

## Specifications
![Specification](https://matthew.kr/wp-content/uploads/2017/11/Picture2.png)

Backend Framework: Node.js with Express.js
Dependencies Management: Bower, NPM
Bootstrapping: Yeoman
WebSocket library: Socket.io
Testing: Jasmin/Karma
Task Management: Grunt

## Data Handling
#### index.js
```javascript
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
```
In this project, we implemented a hashmap global_datas to handle the collected data. While the key value is the date of the collected data, the value is the number of tweets related to our keyword. We also have two other arrays which contain the key global_categories and the value global_series.

If we cannot find the key in the hashmap, we will create a new pair of key-value. Otherwise, we will increase the corresponding value by one when we find the key in the hashmap. In additions, the values of keys and values stored in hashmap will be use for x-axis and y-axis of our charts.

### public/js/script.js
```javascript
...
chart: {
          ...
          events:{
            load: function () {
              var self = this;

              socket.on('tweets', (tweets) =>{
                  // DOM appending
                  if(is_started === 1){

                    const { created_at } = $.parseJSON(tweets);

                    const date = moment(created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').format("YYYYMMDDhmmss");

                    if(global_datas[date] === null || global_datas[date] === undefined)  global_datas[date] = 1;
                    else {
                      global_datas[date]++;
                    }

                    var date2 = moment(created_at).toDate();
                    self.series[0].addPoint([moment(created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').toDate().getTime(), global_datas[date]],true,false);//add to last
                  }
              });
                }
          }
      },
```

## Chart Libraries
### 1)	HighCharts: http://highchart.com 
![The Usage of HighCharts](https://matthew.kr/wp-content/uploads/2017/11/Picture3.png)
For the real-time chart, we used the javascript library of HighCharts’s linear chart. In order to draw the graph like above, you need to use jquery called Highcharts, but the corporation has to license it. The usage is as follows:
*	Http://www.highcharts.com/ Enter the site and go to the first download. (The current version is 3.0.9.)
*	After downloading the module, extract it to a specific directory.
*	Enter the following script in the HTML file:
  *	<Script src = "directory/highcharts.js"> </ script>
  *	<Script src = "directory/highcharts-more.js"> </ script>
  *	<Script src = "directory/modules/exporting.js"> </ script>
*	Then draw the graph in JavaScript.
Please refer to the following reference or demo site for how to draw the graph.
*	API reference site: http://api.highcharts.com/highcharts
*	Demo site: Http://www.highcharts.com/demo/ 
Highcharts span up to 1000 on Internet Explorer. Perhaps the memory limit is there. The graph type can be selected from the demo site. The high chart has a different shape of the json arrangement of the X and Y axes. 
The data corresponding to the X axis must be made like this. This is the array type of json. You can assign the x-axis data to the x-axis of the high chart and draw the series by assigning the y-axis value.

### 2) Google Map API: https://developers.google.com/maps/?hl=ko
![Twitter's location appears in the Google Map](https://matthew.kr/wp-content/uploads/2017/11/Picture4.png)
We used the Google Map API in order to the geographical chart and the geocoding. The geocoding means we can convert from actual user’s address to coordinates like latitude and longitude. Since twitter API provide us just user’s location character, we need to convert from it to the actual geo coordinates in order to show into our geographic chart.

## How to Run
[Prerequisite]
- Node.js
- Twitter Developer Keys (See: https://developer.twitter.com/en/docs/basics/authentication/guides/access-tokens) 
- Google Map API Keys (See: https://developers.google.com/maps/documentation/embed/get-api-key)

[Installation]
1. Clone the repository: git clone https://www.github.com/IkwhanChang/twitter-trend-analyzer.git
2. Go to twitter-trend-analyzer folder
3. Install dependencies: npm i or npm install (make sure you already installed the node)
4. Go to index.js file and replace Twitter keys for yours
```javascript
// Twitter Settings

var client = new Twitter({
  consumer_key: '[YOUR_CONSUMER_KEY]',
  consumer_secret: '[YOUR_CONSUMER_SECRET]',
  access_token_key: '[YOUR_ACCESS_TOKEN_KEY]',
  access_token_secret: '[YOUR_ACCESS_TOKEN_SECRET]'
});

```
5. Go to /public/js/script.js file and replace Google Map API key for yours
```javascript
  const google_api_key = "[YOUR_GOOGLE_API_KEY]";
```

6. Run the command: node index.js
7. Open the browser and connect: http://localhost:5000/

## How to use
- Usage is very simple. Just write down the keyword that you want to find, click the [Start] Button, then see the result via Charts and list of result in right sidebar. The data will be automatically updated. If you want to stop, then click the [Stop] button.
- In the linear charts, you can see the result of streamed Twitter data. The x-axis is time and y-axis is number of twits. Also, you can see the geographical charts that has Twitter icon of user's location.
- If you wish to download of the result, simply click the [Download] button. Then you can get the CSV file and use of it whatever you wants.

## License

[MIT](LICENSE.md) © [Matthew Chang](https://www.matthewlab.com)
