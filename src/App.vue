<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
export default {
    name:'app',
   provide () {    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。                                             
            return {
                reload: this.reload                                              
            }
        },
        data() {
            return{
                isRouterAlive: true                    //控制视图是否显示的变量
            }
        },
        methods: {
            reload () {
                this.isRouterAlive = false;            //先关闭，
                this.$nextTick(function () {
                    this.isRouterAlive = true;         //再打开
                }) 
            }
        },
     created(){
       if(window.innerWidth<780){
         this.$store.state.showPassZ = false
        
       }else{
          this.$store.state.showPassZ = true
       }
       //如果刷新后vuex中user不存在这重新获取赋值vuex
       if (this.$store.state.user == null && localStorage.token) {
          // this.$router.replace({
          //       path: '/kong',
          //       query: {
          //         t: Date.now()
          //       }
          //     })
        window.addEventListener("beforeunload", 
        
              this.$ajax.post('/api/denglu/profile',localStorage.token).then((res)=>{
                 
                  this.$store.commit('dispatch',{
                    usr:res.data.user
                  })
                  this.$store.commit('dispatchicon',{
                    icon:res.data.icon
                  })
                 this.$store.commit('dispatchid',{
                    usrid:res.data._id
                  })
                     this.$store.commit('dispatchname',{
                    name:res.data.name
                  })

                   this.$store.commit('dispatchs',{
                    username:res.data.username
                  })
              
              })
      )
      }

    }
     
}
</script>
<style lang="less">
[v-cloak] {
    display: none;
}
html,body,#app{
  background-color: #f5f7f9;
}
body{margin:0px;padding:0px;}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}
.h100{
  height: 100%;
}
 .el-tree-node__label{
    font-size: 17px;
    color: tan;
    font-family: fantasy;
}
.el-pagination{
    background: #fff;
    margin-top: 5px;
}
@media screen and (max-width: 789px){
   .el-message-box{
      width: 100%!important;
    margin-top: 40%;
}
 .el-pagination__jump{
    display: none!important;
  }
  .el-dialog__wrapper .el-dialog{
    width: 85%!important;
  }
}
//隐藏滚动条
 ::-webkit-scrollbar {
     width: 0 !important;
   }
   ::-webkit-scrollbar {
     width: 0 !important;height: 0;
   }
//    *{
//         -webkit-transform-origin-x: 0;
//    }
.el-tree-node:focus>.el-tree-node__content{
  background-color: cornflowerblue!important;
}
.el-pager li.active{
      background: slategrey;
}
.el-tree-node__label {
    font-size: 17px!important;
}
.bord{
      border: 2px outset;
}
.bordshow{
      box-shadow: 2px 2px 2px 2px #7da4cb;
}
.mar10{
  margin-bottom: 10px;
}
.mart10{
  margin-top: 10px;
}
.demo-table-expand[data-v-68627a1e] label{
      width: 90px;
    color: #99a9bf;
    font-size: 16px;
    font-family: cursive;
}
 @media screen and (max-width: 789px) {
.bord{
      border: 0px ;
}
.bordshow{
      box-shadow: 0px 0px 0px 0px #7da4cb;
}

     }
</style>
