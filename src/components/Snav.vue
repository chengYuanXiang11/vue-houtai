<template>
<!-- 顶部导航 -->
    <div id="sanv" >
      <el-row class="snav_content">
      <el-col :span="18" :style="{position:'fixed'}">
            <el-menu  class="el-menu-demo" mode="horizontal" @select="handleSelect"
      :xs={span:0} :sm={span:5}
        
        :default-active="$route.path"
            :unique-opened='true'>
            <el-col :span="3" >
              <el-menu-item index="1">
                      <i class="el-icon-s-fold"></i>
                    </el-menu-item>
            </el-col>
       <el-col :span="3" >
      <el-menu-item index="2">
            <i class="el-icon-refresh-left"></i>
        </el-menu-item>
       </el-col>
       <el-col :span="5" :offset="13">
           <el-submenu index="3">
    <template slot="title">我的工作台</template>
    <el-menu-item index="3-1">选项1</el-menu-item>
    <el-menu-item index="3-2">选项2</el-menu-item>
    <el-menu-item index="3-3">选项3</el-menu-item>
  
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
         activeIndex: '1',
        activeIndex2: '1'
      }
    },
     methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style lang="less" scoped>
.snav_content{
  font-size: 0.3rem;
}
// #sanv{
//   position: fixed;
//     width: 80%;
// }
</style> 
