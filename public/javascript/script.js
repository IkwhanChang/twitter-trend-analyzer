var global_categories = [];
var global_series = [];

var global_datas = {};

var kk = 0;

$('#btn_submit').click(function() {
  $.get( '/searchTweets',
    {
    "keyword":encodeURIComponent($("#keyword").val())
  }, function(data){
        $("#search-result").empty();
        for(var idx in $.parseJSON(data).statuses){
            $("#search-result")
              .append('<h5 class="m-b-0"><a href="#"><span>'+$.parseJSON(data).statuses[idx].user.name+'</span></a></h5>')
              .append('  <span>@'+$.parseJSON(data).statuses[idx].user.screen_name+'</span> &middot; '+$.parseJSON(data).statuses[idx].created_at+'')
              .append('  <p class="m-t-1"><span>'+$.parseJSON(data).statuses[idx].text+'</span></p>')
              .append('<hr>');

        }

    });

    socket.emit('streamTweets',{keyword:$('#keyword').val()});

    $("#btn_speed").click(function(){
        kk++;
        if(kk === 2)  kk = 0;
    });

    socket.on('tweets', function(tweets){
        //console.log(tweets);

        $("#search-result")
        .prepend('<hr>')
        .prepend('  <p class="m-t-1"><span>'+$.parseJSON(tweets).text+'</span></p>')
        .prepend('  <span>@'+$.parseJSON(tweets).user.screen_name+'</span> &middot; '+$.parseJSON(tweets).created_at+'')
        .prepend('<h5 class="m-b-0"><a href="#"><span>'+$.parseJSON(tweets).user.name+'</span></a></h5>');

        if(kk === 0){
          var date = moment($.parseJSON(tweets).created_at).format('YYYYMMDDhmmss');
        }else {
          var date = moment($.parseJSON(tweets).created_at).format('YYYYMMDDhmm');  
        }
        if(global_datas[date] === null || global_datas[date] === undefined)  global_datas[date] = 1;
        else {
          global_datas[date]++;
        }

        for (var key in global_datas) {
            if(key !== date) continue;
            var idx = global_categories.indexOf(key);
            console.log(idx + " / "+key + " / "+global_series[idx])
            if(idx === -1){
                global_categories.push(key);
                global_series.push(1);
            }else{
              global_series[idx] = global_datas[date];
            }

        }



        setChartData(global_categories, global_series);
        //$('.highcharts-line-overview').xAxis.setCategories( categories );

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


  var socket = io();

  function setChartData(categories, series){
    $('.highcharts-line-overview').highcharts({
        chart: {
            renderTo: 'container',
            backgroundColor: 'transparent',
            type: 'area'
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
            categories: categories
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
            valueSuffix: ''
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
            data: series,
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
                type: 'area'
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
                categories: global_categories
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
                valueSuffix: ''
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
                data: global_series,
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
    Dashboard.Helpers.elementExists('.highcharts-line-predict', function() {
        $(this).highcharts({
            chart: {
                renderTo: 'container',
                backgroundColor: 'transparent',
                type: 'line'
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
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
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
                valueSuffix: ''
            },
            legend: {
                layout: 'horizontal',
                align: 'right',
                verticalAlign: 'top',
                borderWidth: 0
            },
            series: [{
                type: 'area',
                name: 'Tweets',
                data: [700.0, 699, 9500, 1450, 1820, 1250, 1520, 100, 1134, 1836, 1390, 960],
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
