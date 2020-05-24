<template>
<!-- 左侧导航 -->
    <div id="zanv" >
       <el-row>
         <el-col :xs={span:0} :style="{width:'200px'}">
           <el-col class="znav_Fullheight" :xs={span:0} :sm={span:4}>

        
    <el-menu
  
    :style="{ height: screenHeight + 'px' }"
   :default-active="$route.path"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect"
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
          <router-link to='/statistics'>
            <el-menu-item index="1-1">
          统计报表
            </el-menu-item>
          </router-link>           
                <router-link to='/notice'>
                <el-menu-item index="1-2">消息通知</el-menu-item>
                </router-link>

          
           
        <el-submenu index="1-3">
          <template slot="title" >商品管理</template>
          <el-menu-item index="1-3-1">销售记录</el-menu-item>
          <el-menu-item index="1-3-2">宝贝管理</el-menu-item>
        </el-submenu>
        </el-menu-item-group>   
      </el-submenu>

      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>系统管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="2-1">用户管理</el-menu-item>
          <el-menu-item index="2-2">角色管理</el-menu-item> 
          <el-menu-item index="2-3">职权调度</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>相关介绍</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="3-1">项目介绍</el-menu-item>
          <el-menu-item index="3-2">遭遇难点</el-menu-item> 
          <el-menu-item index="3-3">我的笔记</el-menu-item>
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
components:{},

computed: {
        defaultActive() {
            return '/' + this.$route.path.split('/').reverse()[0];
        }
    },
 methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath ,'1111');
        return 
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath ,'222');
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath ,'ddsd');
      }
    },
    mounted () {
  const that = this
  window.onresize = () => {
    return (() => {
       window.screenHeight = document.body.clientHeight
       that.screenHeight = window.screenHeight
    })()
  }
},
watch: {
      screenHeight (val) {
        // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
        if (!this.timer) {
          // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
          this.screenHeight = val
          this.timer = true
          let that = this
          setTimeout(function () {
            // 打印screenWidth变化的值
            console.log(that.screenHeight)
            that.timer = false
          }, 400)
        }
      }
    }
}
</script>
<style lang="less" scoped>
  @import './css/znav.css';
</style> 
