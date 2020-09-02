<template>



<!-- 首页 -->
  <div class="home">
      <el-container  >
      
        <keep-alive>
            <transition :name="this.$store.state.showPassZ?'bounce':'bounce2'">
            <el-aside width="auto" 
              class="abox1"
             v-show="this.$store.state.showPassZ">
          <keep-alive>
           <ZNav ></ZNav>
          </keep-alive>
             </el-aside>
               </transition>
        </keep-alive>
        
 
  <el-container class="home_container">
    <el-col :xs={offset:0}>
         <el-header class="home_header">
                    <Snav/>
                
            </el-header>

      
          <el-main class="home_main h100">
           
                 <el-col style="backgroundColor:#fff;padding: 20px 0;" :span="22" :offset="1"  :xs="{span:24,offset:0}">
                <router-view ></router-view>
         
            </el-col>
         
            
               
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
.bounce-enter-active {
  animation: bounce-in 1.5s;
}
.bounce-leave-active {
  animation: bounce-in .5s;
}
@keyframes bounce-in {
  0% {
 position: relative;
 top: 2000px;
  }

  100% {
  position: relative;
 top: 00px;
  }
}
.bounce2-enter-active {
  animation: bounce-in2 1.5s;
}
.bounce2-leave-active {
  animation: bounce-in2 .5s;
}
@keyframes bounce-in2 {
  0% {
 position: relative;
 top: 0px;
  }

  100% {
  position: relative;
 top: 2000px;
  }
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
.bounce-enter-active {
  animation: bounce-in 1.5s;
}
.bounce-leave-active {
  animation: bounce-in .5s;
}
@keyframes bounce-in {
  0% {
display: none;
  }

  100% {
 display: block;
  }
}
.bounce2-enter-active {
  animation: bounce-in2 1.5s;
}
.bounce2-leave-active {
  animation: bounce-in2 .5s;
}
@keyframes bounce-in2 {
  0% {
 display: block;
  }

  100% {
display: none;
  }
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
