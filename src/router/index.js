import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/login'
import store from '../store'

Vue.use(VueRouter)

 const routes = [
    {
      path: '/',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
      name: 'login',
      component: Login,
      // meta: { requiresAuth: true }
      meta: { isPublic: true,
        admin:true, 
        user:true ,
      title:"登录"},
        beforeEnter: (to, from, next) => {
          if(localStorage.token && localStorage.ziong == 'true'){
            next('/statistics')
          }else(
            next()
          )
        }
    },
    {
      path: '/register',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
      name: 'register',
      component: () => import(/* webpackChunkName: "about" */ '../views/login/register'),
      meta: { isPublic: true,
        admin:true, 
        user:true,
        title:"注册"}
    },
  {
    path: '/Home',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home'),
    children: [
      {
        path: '/notice',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'notice', 
        meta:{
          isPublic: true,
          admin:true, 
        user:true,
        title:"评论"
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/shuju/Notice')
      }, {
        path: '/kong',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'kong',
        meta:{
          isPublic: true,
          admin:true, 
        user:true,

        },
        component: () => import(/* webpackChunkName: "about" */ '../views/shuju/kong')
      },
      {
        path: '/statistics',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'statistics',
        meta:{
          admin:true, 
        user:true,
        title:"图表"
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/shuju/Statistics.vue')
      },
      {
        path: '/sale',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'sale',
        meta:{
          admin:true, 
        user:true,

        },
        component: () => import(/* webpackChunkName: "about" */ '../views/shuju/sale')
      },{
        path: '/wares',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'wares',
        meta:{
          admin:true, 
        user:true,
        title:"商品"
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/shuju/wares')
      },{
        path: '/adopt',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'adopt',
        meta:{
          admin:true, 
          user:false,
          title:"用户管理"
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/role/adopt')
      },{
        path: '/role',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'role',
        meta:{
          admin:true, 
          user:false,
          title:"用户管理"
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/role/role')
      },{
        path: '/power',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'power',
        meta:{
          admin:true, 
          user:false,
          title:"用户管理"
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/role/power')
      },{
        path: '/introduce',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'introduce',meta:{
          admin:false, 
          user:false,

        },
        component: () => import(/* webpackChunkName: "about" */ '../views/relevant/introduce')
      },{
        path: '/difficulty',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'difficulty',meta:{
          admin:false, 
          user:false,

        },
        component: () => import(/* webpackChunkName: "about" */ '../views/relevant/difficulty')
      },{
        path: '/note',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'note',  meta:{
          admin:false, 
          user:false,

        },
        component: () => import(/* webpackChunkName: "about" */ '../views/relevant/note')
      },{
        path: '/geren',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'geren',
        meta:{
          admin:true, 
          user:true,

        },
        component: () => import(/* webpackChunkName: "about" */ '../views/gren/geren')
      },
      {
        path: '/ChangePassword',//以“/”开头的嵌套路径会被当作根路径，所以子路由上不用加“/”;在生成路由时，主路由上的path会被自动添加到子路由之前，所以子路由上的path不用在重新声明主路由上的path了。
        name: 'ChangePassword',
        meta:{
          admin:true, 
          user:true,

        },
        component: () => import(/* webpackChunkName: "about" */ '../views/gren/ChangePassword')
      }
       
  ]
    
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  
  routes
})

//避免路由重复，报错
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

router.beforeEach((to,from,next)=>{
  if (to.meta.title) {
    document.title = to.meta.title;
}
 //登录注册不添加禁止
      if(to.meta.isPublic){
        //登录注册不需要禁止
      return next()
      }
     
      //未登录则直接返回登录界面
      if( !localStorage.token){
     
               return next('/')  
           }else{
             //已经登录进入后的权限控制
              if(!to.meta.isPublic){
              const users = store.state.user
              
            if(users == null){ //此时说明用户刷新了页面,在APP.VUE中对USER重新赋值
           
              return next()
                  }else{ 
                    if(users=='root'){
                return next()
              }else{
              if(users == 'admin' && to.meta.admin){
               return next()
              }else{
                if(users == 'user' && to.meta.user){
                  return next()
                 }else{
                   return next(false)
                 }
              }
             
                  }
                    //管理员禁止}
              
            }
     
          }
           }
          
  // 如果已经登陆

  // }}
//  next()
})

export default router
