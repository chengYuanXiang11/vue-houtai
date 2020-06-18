<template>
<!-- 顶部导航 -->
    <div id="sanv" >
      <el-row class="snav_content">
      <el-col  class="snav_header" :span="22" :offset="1" :xs="{span:24,offset:0}">
            <el-menu  class="el-menu-demo" mode="horizontal" 
         :xs={span:0} :sm={span:5}
           :router="true"
        :default-active="$route.path"
            :unique-opened='true'>

            <el-col :span="3">
              <el-menu-item index="1" @click="xianyin()">
                      <i class="el-icon-s-fold">导航</i>
                    </el-menu-item>
            </el-col>
            

       <el-col :span="5" :offset="16" class="caozuo">
           <el-submenu index="3">
    <template slot="title">
     
       <span>{{this.$store.state.name}}</span>
    </template>
    <el-menu-item index="geren">个人中心</el-menu-item>
    <el-menu-item index="ChangePassword">修改密码</el-menu-item>
    <el-menu-item @click="tuichu">退出登录</el-menu-item>
  
  </el-submenu>
       </el-col>
      </el-menu>

      </el-col>
       
      </el-row>

    </div>
</template>
<script>
export default {
    name:'snav',
    data(){
      return{
        keys:true,
         activeIndex: '1',
        activeIndex2: '1'
      }
    },
     methods: {
       xianyin(){
         this.$store.commit('xianyin')
       },
      tuichu(){
        localStorage.removeItem("token")
        this.$router.push('/')
      }
    }
}
</script>
<style lang="less" scoped>
.snav_content{
  font-size: 0.3rem;
}
.caozuo li{
  width: 100%;
}
img{
  width:50%
}
</style> 
