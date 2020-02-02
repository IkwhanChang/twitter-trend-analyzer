let global_categories = [],
  global_series = [],
  global_datas = {},
  kk = 0,
  is_started = 0,
  no_of_tweets = 0;

let socket = io();
let chart;

const google_api_key = "AIzaSyCt8h9YTf_BLaSNIvRL6hX925OnyYYXDLQ";
let geocoder

$('#btn_stop').click(() => {
  socket.emit('stopStreamTweets');

  socket.on('stop', (tweets) => {
    $('#btn_start').prop("disabled", false);
    $('#btn_stop').prop("disabled", true);

    is_started = 0;
    no_of_tweets = 0;

    // Reset
    socket = io();

  });

});

$('#keyword').keyup((e) => {
  if (e.keyCode == 13) {
    startStreaming();
  }
  e.preventDefault();
});

$('#getCsv').click(() => {
  var chart = $('.highcharts-line-overview').highcharts();
  $(this).attr('href', 'data:text/csv;charset=utf-8,' + escape(chart.getCSV()));
  $(this).attr('download', "twitter-trend-analyzer.csv");

});

var markers = [];
var map;
// Adds a marker to the map and push to the array.
const addMarker = (location, title, contentString) => {

  let infowindow = new google.maps.InfoWindow({
    content: '<p class="m-t-1"><span>' + contentString + '</span></p>' +
      '  <span>@' + title + '</span>'
  });

  let marker = new google.maps.Marker({
    position: location,
    map: map,
    title: '@' + title,
    icon: 'http://www.thedailynole.com/images/misc/twitter.png',
  });

  marker.addListener('click', function () {
    infowindow.open(map, marker);
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
const setMapOnAll = (map) => {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Removes the markers from the map, but keeps them in the array.
const clearMarkers = () => {
  setMapOnAll(null);
}

// Shows any markers currently in the array.
const showMarkers = () => {
  setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
const deleteMarkers = () => {
  clearMarkers();
  markers = [];
}

$('#btn_start').click(() => {
  startStreaming();
  event.preventDefault();
});

const startStreaming = () => {
  is_started = 1;

  $("#no-of-tweets").empty().append('<h1 class="f-w-300  m-t-0 m-b-0">' + no_of_tweets + '</h1>')
  $('#btn_start').prop("disabled", true);
  $('#btn_stop').prop("disabled", false);

  deleteMarkers();
  redrawChart();

  // 2. Web Socket Part for the Stream API

  // Call the server's socket
  $("#search-result").empty();
  socket.emit('streamTweets', { keyword: $('#keyword').val() });

  // Receive the server's Stream API's result
  socket.on('tweets', (tweets) => {
    const { created_at, text, user: { name, screen_name, location = "" } } = $.parseJSON(tweets);
    // DOM appending
    if (is_started == 1) {
      no_of_tweets++;
      if (no_of_tweets % 200 == 0) $("#search-result").empty();

      $("#no-of-tweets").empty().append(`<h1 class="f-w-300  m-t-0 m-b-0">${no_of_tweets}</h1>`)

      $("#search-result")
        .prepend('<hr>')
        .prepend(`  <p class="m-t-1"><span>${text}+'</span></p>`)
        .prepend(`  <span>@${screen_name}</span> &middot; ${created_at}`)
        .prepend(`<h5 class="m-b-0"><a href="#"><span>${name}</span></a></h5>`);

      // Get address to latlng and add marker
      if (location !== "" && location !== null && location !== undefined) {
        console.log("call geocoding")
        $.get(`https://us1.locationiq.com/v1/search.php?key=a60d1b393dd506&q=${location}&format=json`).done(function (data) {
          const { lat, lon } = data.results[0];
          const latLng = new google.maps.LatLng(lat, lon);
          map.setCenter(latLng);
          addMarker(latLng, screen_name, text);
        });
        
      }
    }


  });
}

$.get('/searchTweets',
  {
    "keyword": encodeURIComponent($("#keyword").val())
  }, (data) => {
    const results = $.parseJSON(data).statuses;

    // Attach results into the list
    results.forEach((status) => {
      $("#search-result")
        .append(`<h5 class="m-b-0"><a href="#"><span>${status.user.name}</span></a></h5>`)
        .append(`<span>@${status.user.screen_name}</span> &middot; ${status.created_at}`)
        .append(`<p class="m-t-1"><span>${status.text}</span></p>`)
        .append(`<hr />`);
    })
  });

redrawChart = () => {

  chart = $('.highcharts-line-overview').highcharts({
    chart: {
      renderTo: 'container',
      backgroundColor: 'transparent',
      type: 'line',
      animation: Highcharts.svg, // don't animate in old IE
      events: {
        load: function () {
          var self = this;

          socket.on('tweets', (tweets) => {
            // DOM appending
            if (is_started === 1) {

              const { created_at } = $.parseJSON(tweets);

              const date = moment(created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').format("YYYYMMDDhmmss");

              if (global_datas[date] === null || global_datas[date] === undefined) global_datas[date] = 1;
              else {
                global_datas[date]++;
              }

              var date2 = moment(created_at).toDate();

              if (self !== undefined) {
                this.series[0].addPoint([moment(created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').toDate().getTime(), global_datas[date]], true, false);//add to last  
              }
              
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
        formatter: () => {
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
        formatter: () => {
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
        let data = [], i;

        const time = parseInt(moment().format("YYYYMMDDhmmss"));

        for (i = -19; i <= 0; i += 1) {
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


$(function () {
  /** Highcharts Settings To Gallery from highcharts.html **/
  // Load the default twitters
  /** This chart from (Visitor Chart) overview.html **/
  Dashboard.Helpers.elementExists('.highcharts-line-overview', function () {

    chart = $(this).highcharts({
      chart: {
        renderTo: 'container',
        backgroundColor: 'transparent',
        type: 'line',
        animation: Highcharts.svg, // don't animate in old IE
        events: {
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
          formatter: () => {
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
          formatter: () => {
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


});

var map;
function initMap() {
  geocoder = new google.maps.Geocoder;
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 2,
    center: { lat: 37.3351874, lng: -121.8832602 },
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
