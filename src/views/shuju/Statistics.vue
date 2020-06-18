<template>
  <div class="statistics">
    <el-row >
      <el-col :span="22" :push="1" :xs="{span:24,offset:0,push:0}">
        <el-col :span="17"  :xs="{span:24,offset:0}" class="bo" style="border: 2px outset;">
          
                <section v-if="expand.map">
        <figure >
          <chart
            :options="map"
            :init-options="initOptions"
            ref="map"
            autoresize
          />
        </figure>
      </section>
          
    
        </el-col>


        <el-col :span="6" :offset="1" class="bo" :xs="{span:24,offset:0}"  style="background-color: #fff;border: 2px outset;  marin:0 0 10px 0;padding-left:1%;">
         
         <v-chart   autoresize :options="zeng"/>
        </el-col>
      </el-col>
      <el-col :span="22" :offset="1" :xs="{span:24,offset:0}" style="background-color: #fff; border: 2px outset;" >
          <el-col :span="17" :xs="{span:24,offset:0}" class="bo xiao">
              <span slot="label"><i class="el-icon-date"></i> 销售量</span>
              <v-chart   autoresize :options="xiaoshou"/>         
          </el-col>
          <el-col :span="6" :offset="1" :xs="{span:24,offset:0}" class="bo" >
               <el-table
              v-cloak
              :data="tod"
              stripe  
           >
            <el-table-column
          type="index"
         >
        </el-table-column>
              <el-table-column
                prop="name"
                label="销售前十" 
               min-width="1">
              </el-table-column>
              <el-table-column
                prop="value"
                label="销售额(万)"
                 min-width="1">
              </el-table-column>
            </el-table>
          </el-col>
          
      </el-col>
    </el-row>

  </div>
</template>
<script>
import qs from 'qs'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import 'echarts/lib/chart/gauge'
import 'echarts/lib/chart/map'

import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/dataset'
import 'echarts/map/js/world'
import 'zrender/lib/svg/svg'
import map from './data/map'
import xiaoshou from './data/xiaoshou'
import zeng from './data/zeng'
// Map of China
import chinaMap from './china.json'

// registering map data
ECharts.registerMap('china', chinaMap)

export default {
    name:'statistics',
     components: {
    'v-chart': ECharts,
    chart: ECharts
  },
    data(){ 
          const options = qs.parse(location.search, { ignoreQueryPrefix: true })
      let colors = ['#5793f3', '#d14a61', '#675bba'];
      return{   
      map,
      xiaoshou,
      zeng,
      expand: {
        map: true,
      },
        initOptions: {
        renderer: options.renderer || 'canvas'
      },
      polarTheme: 'dark',
      seconds: -1,
      asyncCount: false,
      connected: true,
      metricIndex: 0,
      open: false,
      img: {},
      tod:[],//前十
      flightLoaded: false,
      flightOptions: null,
          data:{},
         activeName: 'first',
        }
    },
    created(){
       this.had()
        map.series[1].data.map((value,key)=>{
            this.tod[key]={
              "name":value.name,
              "value":value.value[2]
            }
          
       }) 
    },
     methods: {
       had(){
          this.$ajax.get('/api/data/save').then((res)=>{
            this.xiaoshou.xAxis[0].data =res.data.map((value,key)=>{
          return value.date
      })
    this.xiaoshou.series[0].data =res.data.map((value,key)=>{
          return value.number/10000
      })
     this.xiaoshou.series[1].data =res.data.map((value,key)=>{
  
          return value.salesvolume/10000
      }) 
             this.zeng.xAxis[0].data =res.data.map((value,key)=>{
          return value.date
      })
     this.zeng.series[0].data =res.data.map((value,key)=>{
         let kers = key-1
         kers = kers<0?0:kers
          let a = res.data[key].salesvolume 
          let b =  res.data[kers].salesvolume
       
    return ((a-b)/b)*100
    
      })

    })
       },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      loadFlights () {
      this.flightLoaded = true

      const { flight } = this.$refs
      flight.showLoading({
        text: '',
        color: '#c23531',
        textColor: 'rgba(255, 255, 255, 0.5)',
        maskColor: '#003',
        zlevel: 0
      })
      import('./data/flight.json').then(({ default: data }) => {
        flight.hideLoading()

        function getAirportCoord (idx) {
          return [data.airports[idx][3], data.airports[idx][4]]
        }
        const routes = data.routes.map(function (airline) {
          return [getAirportCoord(airline[1]), getAirportCoord(airline[2])]
        })

        this.flightOptions = {
          title: {
            text: 'World Flights',
            left: 'center',
            textStyle: {
              color: '#eee'
            }
          },
          backgroundColor: '#003',
          tooltip: {
            formatter (param) {
              const route = data.routes[param.dataIndex]
              return (
                data.airports[route[1]][1] + ' > ' + data.airports[route[2]][1]
              )
            }
          },
          geo: {
            map: 'world',
            left: 0,
            right: 0,
            silent: true,
            itemStyle: {
              normal: {
                borderColor: '#003',
                color: '#005'
              }
            }
          },
          series: [
            {
              type: 'lines',
              coordinateSystem: 'geo',
              data: routes,
              large: true,
              largeThreshold: 100,
              lineStyle: {
                normal: {
                  opacity: 0.05,
                  width: 0.5,
                  curveness: 0.3
                }
              },
              // 设置混合模式为叠加
              blendMode: 'lighter'
            }
          ]
        }
      })
    }  

    },
    computed:{
        metrics () {
      return this.$store.state.scores.map(({ name }) => name)
    }
    }
}
</script>
<style lang="less" scoped>
[v-cloak] {
    display: none;
}
figure{
  margin: 0;
  padding: 0;
}
/deep/ .echarts{
   width: 100%;
}
/deep/ .el-tabs--border-card>.el-tabs__content{
  width: 100%;
  padding: 0;
}
.bo{
  margin-bottom: 20px;
}
 /deep/  th{
     color: initial;
    font-family: cursive;
    font-size: 18px;
}
 /deep/ .cell{
  
    text-align: center;
    
 }
.xiao{
  background: #fff;
}
   /deep/ tbody /deep/ tr:nth-child(1) /deep/.cell /deep/div{
       color: #fff;
    background: #2F4056!important;
 }
  /deep/ tbody /deep/ tr:nth-child(2) /deep/.cell /deep/div{
   color: #fff;
   background: #2F4056!important;
 }
  /deep/ tbody /deep/ tr:nth-child(3) /deep/.cell /deep/div{
   color: #fff;
   background:#2F4056!important;
 }
/deep/ tbody /deep/ tr /deep/.cell /deep/div{
     color: #fff;
        background-color: #c1c1c1;
}
 /deep/ .el-table--fit{
       color: brown;
  
 }
</style> 
