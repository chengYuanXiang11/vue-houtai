let colors = ['#5793f3', 'red', '#675bba'];
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
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                lineStyle: {
                    color:colors[0]
                }
            },
            name:"月份",//坐标轴名称。
            nameLocation:'end',//坐标轴名称显示位置。
            axisLabel : {//坐标轴刻度标签的相关设置。
                interval:0,
                rotate:"45"
            },
            data:[]
        }
    ],
    yAxis: {
        type: 'value',
        name: '增速(%)',
        min: -250,
        max: 250,
        position: 'left',
        axisLine: {
            lineStyle: {
                color:colors[1]
            }
        },
        axisLabel: {
            
            formatter: '{value}'
        }
    },
    series: [{
        data: [],
        type: 'line',
        smooth: true,
     
    }]

     
}