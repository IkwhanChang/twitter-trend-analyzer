/** START JS SETTINGS "Sparklines": Monitor / Network Monitoring from monitor.html**/
  $('#network-monitoring').sparkline('html',
       {
      fillColor: false,
       width: '100%',
    height: '60 ',
      lineWidth: 1,
    lineColor: '#56A4F3',
    fillColor: 'rgba(44, 150, 222, 0.2)',
    spotRadius: 2,
    spotColor: '',
    minSpotColor: '',
    maxSpotColor: '',
    highlightSpotColor: '#00ffff',
    normalRangeColor: 'transparent',
      normalRangeMin: -1,
      normalRangeMax: 8 });
/** END JS SETTINGS "Sparklines": Monitor / Network Monitoring from monitor.html **/

/** START JS SETTINGS "Sparklines": Monitor / Hardware Temperature / CPU from monitor.html **/
  $('#hardware-temperature-cpu').sparkline('html',
       {
     fillColor: false,
       width: '100%',
    height: '60 ',
      lineWidth: 1,
     lineColor: '#56A4F3',
    fillColor: 'rgba(44, 150, 222, 0.2)',
    spotRadius: 2,
    spotColor: '',
    minSpotColor: '',
    maxSpotColor: '',
    highlightSpotColor: '#00ffff',
    normalRangeColor: 'transparent',
      normalRangeMin: -1,
      normalRangeMax: 8 });
/** END JS SETTINGS "Sparklines": Monitor /  Hardware Temperature / CPU from monitor.html **/

/** START JS SETTINGS "Sparklines": Monitor / Hardware Temperature / HDD1 from monitor.html **/
  $('#hardware-temperature-hdd1').sparkline('html',
       {
      fillColor: false,
       width: '100%',
    height: '60 ',
      lineWidth: 1,
     lineColor: '#56A4F3',
    fillColor: 'rgba(44, 150, 222, 0.2)',
    spotRadius: 2,
    spotColor: '',
    minSpotColor: '',
    maxSpotColor: '',
    highlightSpotColor: '#00ffff',
    normalRangeColor: 'transparent',
      normalRangeMin: -1,
      normalRangeMax: 8 });
/** END JS SETTINGS "Sparklines": Monitor / Hardware Temperature / HDD1 from monitor.html**/

/** START JS SETTINGS "Sparklines": Monitor / Sparklines / Hardware Temperature / HDD2 from monitor.html **/
  $('#hardware-temperature-hdd2').sparkline('html',
       {
      fillColor: false,
       width: '100%',
    height: '60 ',
      lineWidth: 1,
     lineColor: '#56A4F3',
    fillColor: 'rgba(44, 150, 222, 0.2)',
    spotRadius: 2,
    spotColor: '',
    minSpotColor: '',
    maxSpotColor: '',
    highlightSpotColor: '#00ffff',
    normalRangeColor: 'transparent',
      normalRangeMin: -1,
      normalRangeMax: 8 });
/** END JS SETTINGS "Sparklines": Monitor / Hardware Temperature / HDD2 from monitor.html **/

/** START JS SETTINGS "Sparklines": System from system.html**/
   // Bar charts using inline values
      $('.sparkline-bar').sparkline('html', {
        type: 'bar',
        height: '52px',
        barWidth: 8,
        barSpacing: 2,
        barColor: '#E66C40',
        negBarColor: '#35BDA8',
        stackedBarColor: 'rgba(179, 185, 197, 0.3)'
      });
/** END JS SETTINGS "Sparklines": System from system.html**/

// Sparklines from sparklines.html
      $(".sparklines-pie").sparkline([4, 2, 6], {
        type: 'pie',
        sliceColors: ['rgba(86,161,245,1.0)', 'RGBA(248,93,76,1.0)', 'rgba(70,197,152,1.0)']
      });

      $('.sparklines-line').sparkline('html', {
        lineColor: 'RGBA(86, 161, 245, 1.00)',
        width: '30px',
        minSpotColor: 'RGBA(248, 93, 76, 1.00)',
        spotColor: 'RGBA(70, 197, 152, 1.00)',
        maxSpotColor: 'RGBA(134, 179, 77, 1.00)',
        fillColor: 'rgba(86,161,245,0.3)'
      });

      $('.sparklines-bar').sparkline('html', {
        type: 'bar',
        height: '15px',
        width: '15px',
        barColor: 'RGBA(86, 161, 245, 1.00)',
        negBarColor: 'RGBA(248, 93, 76, 1.00)',
        stackedBarColor: ['RGBA(86, 161, 245, 1.00)', 'RGBA(86, 161, 245, 0.3)']
      });

      $('.sparklines-composite-inline').sparkline('html', {
        fillColor: false,
        lineColor: 'RGBA(179, 185, 196, 1.0)',
        spotColor: 'RGBA(254, 197, 54, 1.00)',
        minSpotColor: 'RGBA(248, 93, 76, 1.00)',
        maxSpotColor: 'RGBA(70, 197, 152, 1.00)',
        changeRangeMin: 0,
        chartRangeMax: 10
      });

      $('.sparklines-composite-bar').sparkline('html', {
        type: 'bar',
        barColor: 'RGBA(86, 161, 245, 1.00)'
      });

      $('.sparklines-composite-bar').sparkline([4, 1, 5, 7, 9, 9, 8, 7, 6, 6,
        4, 7, 8, 4, 3, 2, 2, 5, 6, 7
      ], {
        composite: true,
        fillColor: false,
        lineColor: 'RGBA(179, 185, 196, 1.0)',
        spotColor: 'RGBA(254, 197, 54, 1.00)',
        minSpotColor: 'RGBA(248, 93, 76, 1.00)',
        maxSpotColor: 'RGBA(70, 197, 152, 1.00)'
      });

      $('.sparklines-discrete').sparkline('html', {
        type: 'discrete',
        lineColor: 'RGBA(86, 161, 245, 1.00)',
        xwidth: 36
      });

      $('.sparklines-treshold').sparkline('html', {
        type: 'discrete',
        lineColor: 'RGBA(86, 161, 245, 1.00)',
        thresholdColor: 'RGBA(248, 93, 76, 1.00)',
        thresholdValue: 4
      });

      $('.sparklines-tristate').sparkline('html', {
        type: 'tristate',
        posBarColor: 'RGBA(70, 197, 152, 1.00)',
        negBarColor: 'RGBA(248, 93, 76, 1.00)',
        zeroBarColor: 'RGBA(86,161,245,1.0)'
      });

      $('.sparklines-tristane-chart-using-a-colour-map').sparkline('html', {
        type: 'tristate',
        posBarColor: 'RGBA(70, 197, 152, 1.00)',
        negBarColor: 'RGBA(248, 93, 76, 1.00)',
        zeroBarColor: 'RGBA(86,161,245,1.0)',
        colorMap: {
          '-4': 'gray',
          '-2': 'pink',
          '2': 'orange'
        }
      });

      $('.sparklines-box-plot').sparkline('html', {
        type: 'box',
        lineColor: 'RGBA(126, 134, 151, 1.00)',
        boxLineColor: 'RGBA(126, 134, 151, 1.00)',
        boxFillColor: 'RGBA(217, 220, 226, 1.00)',
        whiskerColor: 'RGBA(126, 134, 151, 1.00)',
        // outlierLineColor: $.colors("blue-grey", 300),
        // outlierFillColor: false,
        medianColor: 'RGBA(86, 161, 245, 1.00)'
          // targetColor: $.colors("green", 500)
      });

      $('.sparklines-bullet').sparkline('html', {
        type: 'bullet',
        targetColor: 'RGBA(248, 93, 76, 1.00)',
        targetWidth: '2',
        performanceColor: 'RGBA(237, 240, 245, 1.00)',
        rangeColors: ['RGBA(86, 161, 245, 0.3)', 'RGBA(86, 161, 245, 0.6)',
          'RGBA(86, 161, 245, 1.00)'
        ]
      });

      $('.sparklines-inline-range').sparkline('html', {
        fillColor: false,
        lineColor: 'RGBA(179, 185, 196, 1.0)',
        spotColor: 'RGBA(254, 197, 54, 1.00)',
        minSpotColor: 'RGBA(248, 93, 76, 1.00)',
        maxSpotColor: 'RGBA(70, 197, 152, 1.00)',
        normalRangeColor: 'RGBA(179, 185, 196, 0.2)',
        normalRangeMin: -1,
        normalRangeMax: 8
      });