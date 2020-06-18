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
                 name:"月份",//坐标轴名称。
                 nameLocation:'end',//坐标轴名称显示位置。
                 axisLabel : {//坐标轴刻度标签的相关设置。
                     interval:0,
                     rotate:"45"
                 },
                 data: []
             }
         ],
         yAxis: [
             {
                 type: 'value',
                 name: '销售量(万件)',
                 min: 0,
                 max: 100,
                 position: 'right',
                 axisLine: {
                     lineStyle: {
                         color:colors[0]
                     }
                 },
                 axisLabel: {
                     
                     formatter: '{value}'
                 }
             },{
                type: 'value',
                name: 0,
                max: 11000,
                position: 'left',
                offset:-10,
                axisLine: {
                    lineStyle: {
                        color:colors[1]
                    }
                },
                axisLabel: {
                    formatter: '{value}'
                }
            },
            //  {
            //      type: 'value',
            //      name: '增长率(%)',
            //        min: -250,
            //      max: 250,
            //      position: 'right',
            //      offset: -60,
            //      axisLine: {
            //          lineStyle: {
            //              color:colors[2]
            //          }
            //      },
            //      axisLabel: {
            //          formatter: '{value}'
            //      }
            //  }
             
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
             }
            //  {
            //      name: '增长率',
            //      type: 'line',
            //      yAxisIndex: 2,
            //      data: []
            //  }
         ]
     
}