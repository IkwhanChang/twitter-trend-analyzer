var global_categories = [];
var global_series = [];

var global_datas = {};

var kk = 0;

var is_started = 0;

var no_of_tweets = 0;



  var socket = io();

  $('#btn_stop').click(function() {
    socket.emit('stopStreamTweets');

    socket.on('stop', function(tweets){
      $('#btn_stop').attr("disabled");
      $('#btn_start').removeAttr("disabled");

      is_started = 0;
      no_of_tweets = 0;

      socket = io();

    });

  });
var markers = [];
var map;
  // Adds a marker to the map and push to the array.
  function addMarker(location) {
    var marker = new google.maps.Marker({
      position: location,
      map: map,
      icon: 'http://www.thedailynole.com/images/misc/twitter.png',
    });
    markers.push(marker);
  }

  // Sets the map on all markers in the array.
  function setMapOnAll(map) {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
    }
  }

  // Removes the markers from the map, but keeps them in the array.
  function clearMarkers() {
    setMapOnAll(null);
  }

  // Shows any markers currently in the array.
  function showMarkers() {
    setMapOnAll(map);
  }

  // Deletes all markers in the array by removing references to them.
  function deleteMarkers() {
    clearMarkers();
    markers = [];
  }

$('#btn_start').click(function() {
  is_started = 1;
  $('#btn_start').attr("disabled");
  $('#btn_stop').removeAttr("disabled");

  deleteMarkers();
  redrawChart();

    // 2. Web Socket Part for the Stream API

    // Call the server's socket
    $("#search-result").empty();
    socket.emit('streamTweets',{keyword:$('#keyword').val()});

    // Receive the server's Stream API's result
    socket.on('tweets', function(tweets){
        //console.log(tweets);

        // DOM appending
        if(is_started == 1){
          no_of_tweets++;
          if(no_of_tweets%200 == 0)  $("#search-result").empty();
          $("#no-of-tweets").empty().append('<h1 class="f-w-300  m-t-0 m-b-0">'+no_of_tweets+'</h1>')
          $("#search-result")
          .prepend('<hr>')
          .prepend('  <p class="m-t-1"><span>'+$.parseJSON(tweets).text+'</span></p>')
          .prepend('  <span>@'+$.parseJSON(tweets).user.screen_name+'</span> &middot; '+$.parseJSON(tweets).created_at+'')
          .prepend('<h5 class="m-b-0"><a href="#"><span>'+$.parseJSON(tweets).user.name+'</span></a></h5>');

          if(typeof $.parseJSON(tweets).user.location !== undefined && $.parseJSON(tweets).user.location !== null){
            $.get("https://maps.google.com/maps/api/geocode/json?key=AIzaSyBM3FWODGBMwigdcykSrqHjzzdjWk8N-bo&address="+$.parseJSON(tweets).user.location).done(function(data){
                //console.log(data);
                var latLng = new google.maps.LatLng(data.results[0].geometry.location.lat,data.results[0].geometry.location.lng);
                /*var marker = new google.maps.Marker({
                  position: latLng,
                  icon: 'http://www.thedailynole.com/images/misc/twitter.png',
                  map: map
                });*/

                addMarker(latLng);
            });
            //console.log($.parseJSON(tweets).user.location);


          }


          //setChartData(global_categories, global_series);
          //$('.highcharts-line-overview').xAxis.setCategories( categories );
        }


    });
  event.preventDefault();
});

$.get( '/searchTweets',
  {
  "keyword":encodeURIComponent($("#keyword").val())
}, function(data){

      for(var idx in $.parseJSON(data).statuses){
          $("#search-result")
            .append('<h5 class="m-b-0"><a href="#"><span>'+$.parseJSON(data).statuses[idx].user.name+'</span></a></h5>')
            .append('  <span>@'+$.parseJSON(data).statuses[idx].user.screen_name+'</span> &middot; '+$.parseJSON(data).statuses[idx].created_at+'')
            .append('  <p class="m-t-1"><span>'+$.parseJSON(data).statuses[idx].text+'</span></p>')
            .append('<hr>');

      }

  });



  function redrawChart(){

    $('.highcharts-line-overview').highcharts({
      chart: {
          renderTo: 'container',
          backgroundColor: 'transparent',
          type: 'line',
          animation: Highcharts.svg, // don't animate in old IE
          events:{
            load: function () {

              var self = this;

              socket.on('tweets', function(tweets){
                  //console.log(tweets);

                  // DOM appending
                  if(is_started == 1){

                    var date = moment($.parseJSON(tweets).created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').format("YYYYMMDDhmmss");
                    //console.log(date);
                    //global_series[date] = (global_series[date] === undefined || global_series[date] === null ? 0 : global_series[date] + 1);
                    //self.series[0].addPoint([date, global_series[date]], true, true);
                    //self.series[0].data = global_series;


                    if(global_datas[date] === null || global_datas[date] === undefined)  global_datas[date] = 1;
                    else {
                      global_datas[date]++;
                    }


                    var date2 = moment($.parseJSON(tweets).created_at).toDate();
                    //console.log(moment($.parseJSON(tweets).created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').toDate().getTime());
                    self.series[0].addPoint([moment($.parseJSON(tweets).created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').toDate().getTime(), global_datas[date]],true,false);//add to last
                  }


              });
                }
          }
      },
      title: {
          text: '',
          x: -20 //center
      },
      subtitle: {
          text: '',
          x: -20
      },
      xAxis: {
          gridLineWidth: 1,
          type: 'datetime',
          tickPixelInterval: 150,
          labels: {
              formatter: function() {
                  return Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.value);
              }
          }
      },
      credits: {
          enabled: false
      },
      exporting: {
          enabled: false
      },
      yAxis: {
          gridLineWidth: 1,
          title: {
              text: ''
          },
          plotLines: [{
              value: 0,
              width: 1,
              color: '#808080'
          }]
      },
      tooltip: {
          valueSuffix: '',
          labels: {
              formatter: function() {
                  return Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.value);
              }
          }
      },
      legend: {
          layout: 'horizontal',
          align: 'right',
          verticalAlign: 'top',
          borderWidth: 0
      },
      series: [{
          type: 'area',
          name: $('#keyword').val(),
          data: (function () {
          // generate an array of random data
          var data = [],
              time = parseInt(moment().format("YYYYMMDDhmmss")),
              i;

          for (i = -19; i <= 0; i += 1) {
            //console.log(moment().add(i, 's').format($("#search_type").val()).toDate());
            var d = moment().add(i, 's').toDate();
              data.push({
                  x: moment().add(i, 's').utc().toDate().getTime(),
                  y: 0
              });
          }
          return data;
      }()),
          lineWidth: '1',
          marker: {
              symbol: 'circle',
          },
          color: 'RGBA(70,197,152,1.00)',
          fillColor: {
              linearGradient: {
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 1
              },
              stops: [
                  [0, 'rgba(70,197,152,.2)'],
                  [1, 'rgba(70,197,152,0)']
              ]
          }
      }]
    });
  }


$(function() {
/** Highcharts Settings To Gallery from highcharts.html **/


    // Load the default twitters




    /** This chart from (Visitor Chart) overview.html **/
    Dashboard.Helpers.elementExists('.highcharts-line-overview', function() {

        $(this).highcharts({
            chart: {
                renderTo: 'container',
                backgroundColor: 'transparent',
                type: 'line',
                animation: Highcharts.svg, // don't animate in old IE
                events:{
                  load: function () {

                    var self = this;

                      }
                }
            },
            title: {
                text: '',
                x: -20 //center
            },
            subtitle: {
                text: '',
                x: -20
            },
            xAxis: {
                gridLineWidth: 1,
                type: 'datetime',
                tickPixelInterval: 150,
                labels: {
                    formatter: function() {
                        return Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.value);
                    }
                }
            },
            credits: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            yAxis: {
                gridLineWidth: 1,
                title: {
                    text: ''
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                valueSuffix: '',
                labels: {
                    formatter: function() {
                        return Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.value);
                    }
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'right',
                verticalAlign: 'top',
                borderWidth: 0
            },
            series: [{
                type: 'area',
                name: $('#keyword').val(),
                data: (function () {
                // generate an array of random data
                var data = [],
                    time = parseInt(moment().format("YYYYMMDDhmmss")),
                    i;

                for (i = -19; i <= 0; i += 1) {
                  //console.log(moment().add(i, 's').format($("#search_type").val()).toDate());
                  var d = moment().add(i, 's').toDate();
                    data.push({
                        x: moment().add(i, 's').utc().toDate().getTime(),
                        y: 0
                    });
                }
                return data;
            }()),
                lineWidth: '1',
                marker: {
                    symbol: 'circle',
                },
                color: 'RGBA(70,197,152,1.00)',
                fillColor: {
                    linearGradient: {
                        x1: 0,
                        y1: 0,
                        x2: 0,
                        y2: 1
                    },
                    stops: [
                        [0, 'rgba(70,197,152,.2)'],
                        [1, 'rgba(70,197,152,0)']
                    ]
                }
            }]
        });
    });

    /** This chart from (Visitor Chart) overview.html **/
    Dashboard.Helpers.elementExists('.highmap', function() {

    });


});

var map;
 function initMap() {
   map = new google.maps.Map(document.getElementById('map'), {
     zoom: 2,
     center: {lat: 37.3351874, lng: -121.8832602},
          styles: [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#523735"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fdfcf8"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#806b63"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
]
   });

 }
