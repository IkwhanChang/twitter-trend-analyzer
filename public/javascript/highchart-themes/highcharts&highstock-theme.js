// Dark Theme for "SPIN Dashboard". Global Settings for Highcharts & Highstock

Highcharts.theme = {
   // Used Colors Global 
   colors: ["RGBA(86, 161, 245, 1.00)", "RGBA(70, 197, 152, 1.00)", "RGBA(248, 93, 76, 1.00)", "RGBA(175, 115, 234, 1.00)", "RGBA(254, 197, 54, 1.00)", "#D6DE62", "yellow",
      "#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
   chart: {
      backgroundColor: {
         linearGradient: { x1: 0, y1: 0, x2: 1, y2: 1 },
         stops: [
            [0, '#212121'],
         ]
      },
      style: {
         fontFamily: "-apple-system, 'Unica One', sans-serif"
      },
      plotBorderColor: 'yellow'
   },
   title: {
      style: {
         color: '#9394A0',
         textTransform: 'uppercase',
         fontSize: '11px'
      }
   },
   subtitle: {
      style: {
         color: '#404040',
         textTransform: 'none'
      }
   },
   xAxis: {
      gridLineColor: 'RGBA(179, 185, 196, 0.4)',
      labels: {
         style: {
            color: '#9394A0'
         }
      },
      lineColor: '#E1E5EC',
      minorGridLineColor: 'pink',
      tickColor: '#DADFE3',
      title: {
         style: {
            color: '#484848'

         }
      }
   },
   yAxis: {
      gridLineColor: 'RGBA(179, 185, 196, 0.4)',
      labels: {
         style: {
            color: '#9394A0'
         }
      },
      lineColor: 'blue',
      minorGridLineColor: 'yellow',
      tickColor: '#DADFE3',
      tickWidth: 1,
      title: {
         style: {
            color: '#9394A0'
         }
      }
   },
   tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.85)',
      style: {
         color: '#F0F0F0'
      }
   },
   plotOptions: {
      series: {
         dataLabels: {
            color: '#B0B0B3'
         },
         marker: {
            lineColor: '#333'
        },
        states: {
            hover: {
                lineWidth: 3
            }
        },
      },
      boxplot: {
         fillColor: '#505053'
      },
      candlestick: {
         lineColor: 'RGBA(179, 185, 196, 1.00)'
      },
      errorbar: {
         color: 'white'
      }
   },
   legend: {
      itemStyle: {
         color: '#404040'
      },
      itemHoverStyle: {
         color: '#FFF'
      },
      itemHiddenStyle: {
         color: '#606063'
      }
   },
   credits: {
      enabled: false
   },
   labels: {
      style: {
         color: '#707073'
      }
   },

   drilldown: {
      activeAxisLabelStyle: {
         color: '#F0F0F3'
      },
      activeDataLabelStyle: {
         color: '#F0F0F3'
      }
   },

   navigation: {
      buttonOptions: {
         symbolStroke: '#DDDDDD',
         theme: {
            fill: '#505053'
         }
      }
   },

   // scroll charts
   rangeSelector: {
      buttonTheme: {
         fill: '#B3B9C4',
         stroke: 'pink',
         style: {
            color: 'white'
         },
         states: {
            hover: {
               fill: '#7E8697',
               stroke: '#7E8697',
               style: {
                  color: 'white'
               }
            },
            select: {
               fill: '#586373',
               stroke: '#7E8697',
               style: {
                  color: 'white'
               }
            }
         }
      },
      inputBoxBorderColor: '#D9DCE2',
      inputStyle: {
         backgroundColor: '#D9DCE2',
         color: '#5C5C5C'
      },
      labelStyle: {
         color: '#B3B9C4'
      }
   },

   navigator: {
      handles: {
         backgroundColor: '#B3B9C4',
         borderColor: 'white'
      },
      outlineColor: '#D9DCE2',
      maskFill: 'rgba(179,185,197,0.3)',
      series:
      {
       color: 'white',
       lineColor: 'none'
      },
      xAxis: {
         gridLineColor: '#D9DCE2'
      }
   },

   scrollbar: {
      barBackgroundColor: '#B3B9C4',
      barBorderColor: 'transparent',
      buttonArrowColor: 'white',
      buttonBackgroundColor: '#B3B9C4',
      buttonBorderColor: 'transparent',
      rifleColor: 'white',
      trackBackgroundColor: '#D9DCE2',
      trackBorderColor: 'transparent'
   },

   // special colors for some of the
   legendBackgroundColor: 'rgba(0, 0, 0, 0.5)',
   background2: '#505053',
   dataLabelsColor: '#B0B0B3',
   textColor: 'blue',
   contrastTextColor: '#F0F0F3',
   maskColor: 'rgba(255,255,255,0.3)'
};
// Apply the theme
Highcharts.setOptions(Highcharts.theme);
