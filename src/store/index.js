import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

 export default new Vuex.Store({
  state: {
    showPassZ:true,//pc端左侧导航显示隐藏
    showPass: false,//密码框显示隐藏
    open:'true',
    close:'false', //1
    user:null,//用户权限
    userid:null,
    username:null,//用户名称
    waresuser:null,//用户商品信息
    adoptuser:null,//用户分类信息
    roleuser:null,//用户个人信息
    name:null,//用户昵称
    icon:null,//用户头像
    comment:null,//回复显示隐藏
    notice_adata:null//通知列表
  },
  mutations: {
    xianyin(state,data){//左侧导航显示隐藏
      state. showPassZ= !state.showPassZ
     },
    addList(state,data){
      state.screenHeight= data
     },
     showPass(state,data){
      state.showPass = !state.showPass
     
     },
     dispatchicon(state,data){
      state.icon = data.icon
     },
     dispatch(state,data){
       state.user = data.usr
       
     },
     dispatchid(state,data){
      state.userid = data.usrid
      
    },
    dispatchname(state,data){
      state.name = data.name
      
    },
     dispatchs(state,data){
      state.username = data.username
    }
  },
  actions: {
  },
  modules: {
  }
})
