let colors = ['#5793f3', '#d14a61', '#675bba'];
export default {
    color: colors,
         tooltip: {
             trigger: 'axis',
             axisPointer: {
                 type: 'cross'
             }
         },
         grid: {
             right: '20%'
         },
         toolbox: {
             feature: {
                 dataView: {show: true, readOnly: false},
                 restore: {show: true},
                 saveAsImage: {show: true}
             }
         },
         legend: {
             data: ['销售量', '销售增速', '销售额度']
         },
         xAxis: [
             {
                 type: 'category',
                 axisTick: {
                     alignWithLabel: true
                 },
                 data: []
             }
         ],
         yAxis: [
             {
                 type: 'value',
                 name: '销售量',
                 min: 0,
                 max: 100,
                 position: 'right',
                 axisLine: {
                     lineStyle: {
                         color:colors[0]
                     }
                 },
                 axisLabel: {
                     formatter: '{value} 万件'
                 }
             },{
                type: 'value',
                name: '销售额度',
                  min: 0,
                max: 11000,
                position: 'left',
                axisLine: {
                    lineStyle: {
                        color:colors[1]
                    }
                },
                axisLabel: {
                    formatter: '{value} 万'
                }
            },
             {
                 type: 'value',
                 name: '销售增速',
                   min: -100,
                 max: 250,
                 position: 'right',
                 offset: 80,
                 axisLine: {
                     lineStyle: {
                         color:colors[2]
                     }
                 },
                 axisLabel: {
                     formatter: '{value}%'
                 }
             }
             
         ],
             series: [
             {
                 name: '销售量',
                 type: 'bar',
                 data: []
             },
             {
                 name: '销售额度',
                 type: 'bar',
                 yAxisIndex: 1,
                 data: []
             },
             {
                 name: '销售增速',
                 type: 'line',
                 yAxisIndex: 2,
                 data: []
             }
         ]
     
}