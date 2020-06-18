<template>



<!-- 首页 -->
  <div class="home">
      <el-container  >
      
        <keep-alive>
            <el-aside width="auto" 
              class="abox1"
             v-show="this.$store.state.showPassZ">
          <keep-alive>
           <ZNav ></ZNav>
          </keep-alive>
             </el-aside>
        </keep-alive>
        
 
  <el-container class="home_container">
    <el-col :xs={offset:0}>
         <el-header class="home_header">
                    <Snav/>
                
            </el-header>

      
          <el-main class="home_main h100">
           
                <router-view ></router-view>
         
            
               
            </el-main>
       
            
    <el-footer  height="auto" class="home_footer">
        <Down/>
    </el-footer>
    </el-col>
           
  </el-container>
</el-container>
    <div class="hello">


  </div>
    
  </div>
</template>

<script>

// @ is an alias to /src
import ZNav from '@/components/ZNav'
import Snav from '@/components/Snav'
import Down from './Down'
export default {
  name: 'Home',
  components: {
    ZNav,
   Snav,
   Down
    // 'v-chart': ECharts
  },
   data(){
    return {
         screenHeight: document.body.clientHeight,
        wapperHeight:'200px',
      }
      },
 
  props: {
    msg: String
  }
}
</script>
<style lang="less" scoped>

// .home_header,.home_main{
//   margin-left: 75px;
// }
.home_header{
  height: 60px;
    position: sticky;
    top: 0px;
    z-index: 2
}

@media screen and (max-width: 768px) {
.el-header,
.el-main{
  padding: 0;
}
section .abox1{
  position: absolute;
   z-index: 1000;
}
}
@media screen and (max-width:992px){
.home_header,.home_main{
  margin-left: 0px;
}
}
 .abox1{
        position: relative;;
   
    }
</style>
