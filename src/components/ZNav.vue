<template>
<!-- 左侧导航 -->
    <div id="zanv" >
       <el-row>
         <el-col  :style="{width:'199px'}">
           <el-col class="znav_Fullheight"  :sm={span:3}>

         <!-- :default-active="$route.path" -->
    <el-menu
    :router="true"
  :default-active="onRoutes"
      class="el-menu-vertical-demo box1"
      :unique-opened='true'
      background-color="#191a23"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-submenu index="1">
        
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据面板</span>
        </template>
        <el-menu-item-group>          
            <el-menu-item index="statistics">
          统计报表
            </el-menu-item>             
                <el-menu-item index="notice">消息通知</el-menu-item>
        <el-submenu index="1-3">
          <template slot="title" >商品管理</template>
          <el-menu-item index="wares">宝贝管理</el-menu-item>
        </el-submenu>
        </el-menu-item-group>   
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="adopt">用户管理</el-menu-item>
          <el-menu-item index="role">角色管理</el-menu-item> 
          <el-menu-item index="power">职权调度</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>相关介绍</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="introduce">项目介绍</el-menu-item>
          <el-menu-item index="difficulty">遭遇难点</el-menu-item> 
          <el-menu-item index="note">我的笔记</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      
    </el-menu>
       </el-col>
  </el-col>


</el-row>
    </div>
</template>
<script>
export default {
    name:'znav',
    data(){
      return{
         screenHeight: document.body.clientHeight,
         key:''
      }
    },

computed: {
        defaultActive() {
            return '/' + this.$route.path.split('/').reverse()[0];
        },
        onRoutes(){ //左侧导航刷新重新定位s
      let path = this.$route.path.replace('/','');
      return path ? path : '/';}
    },
//     mounted () {
//   const that = this
//   window.onresize = () => {
//     return (() => {
//        window.screenHeight = document.body.clientHeight
//        that.screenHeight = window.screenHeight
//     })()
//   }
// },
// watch: {
//       screenHeight (val) {
//         // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
//         if (!this.timer) {
//           // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
//           this.screenHeight = val
//           this.timer = true
//           let that = this
//           setTimeout(function () {
//             // 打印screenWidth变化的值
//             console.log(that.screenHeight)
//             that.timer = false
//           }, 400)
//         }
//       }
//     }
}
</script>
<style lang="less" scoped>
*{
    margin: 0;
    padding: 0;
}
html,body{
    height:100%;
    }
.h100{
    height: 100%;
}
.znav_Fullheight{
    position: fixed;
    font-size: 0.3rem; 
     min-width: 200px;
}
.el-menu-vertical-demo{
  height: 100;
}
/deep/ .el-submenu{
    min-width: 200px;
}
 /deep/.el-pagination .el-pagination__jump{
       display: block;
       margin-left: 0;
     }
@media screen and (max-width: 768px) {
 div .box1{  
    width: 199px;
     height: 168px
  }
  .znav_Fullheight{
    margin-top: 58px;
  }
}
 .box1{
   width: 200px;
    height: 2000px;
  }

</style> 
