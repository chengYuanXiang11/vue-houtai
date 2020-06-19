const express = require('express')
const app = express()
const router = express.Router()
const SECRET = 'tokqianmingjiaoyan'
const Login = require("../../../models/Login")
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
var bcrypt = require('bcryptjs');
mongoose.set('useFindAndModify', false)
const Category = require('../../../models/Category')
const Itemize= require('../../../models/Itemize')

const jiami = async(req,res,next)=>{
  
  bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(req.body.password, salt, function(err, hash) {
            if (err) return next(err);         
            // 使用hash覆盖明文密码
          
            req.body.password= hash;
           
            next()
        });
        
    });

}


  //token验证中间件
  const auth = async(req,res,next)=>{
    //前端传入    接收token
  const raw = String(req.headers.authorization || '').split(' ').pop()
 
    try {
      const tokenDate = jwt.verify(raw,SECRET)
    
      
  req.user = await Login.findById(tokenDate._id)
      // 找到用户相关信息，并返回
      // 继续执行接口
      next()
  }
  catch(err) {
      res.status(402).send({message:'token 无效'})
  }

}
router.post('/register',jiami,async(req,res) =>{
   
    const user = await Login.findOne({
        username:req.body.username
    })
    if(user){
        return res.status(421).send({
     message:'用户名已存在'
    })}

   
     
 const users = await Login.create({
        username:req.body.username,
        password:req.body.password,
    })
    res.send(users)
})

// router.post('/cookies',jiami,function(req, res, next) {
// 	if(req.session.isFirst || req.cookies.isFirst) {
//         res.send("欢迎再一次访问");
// 	} else {
//         req.session.isFirst = 1;
//         res.cookie('isFirst', 1, { maxAge: 60 * 1000, singed: true});
//         res.send("欢迎第一次访问。");
// 	}
// });
//登录
router.post('/login',async(req,res) =>{
   
        const user = await Login.findOne({
            username:req.body.username
        })

        if(!user){
            return res.status(421).send({
                message:'没有这个账户哦  请注册一个吧'
                    })
                }else{
                    const states = await Login.findOne({"username":req.body.username,"state":true})
                    if(!states){
                        return res.status(421).send({
                            message:'该用户被禁止登录'
                                })
                    }
                }
        //密码验证
        const isPassword = require('bcryptjs').compareSync(req.body.password,user.password)
        if(!isPassword){
                return res.status(422).send({
                    message:'密码错误'
                })
            }
        //生产token
        const jwt = require('jsonwebtoken')
            //签名
            const token = jwt.sign({
                _id : String(user._id)
            },SECRET)
        // const Login = String(Logins)
        res.send({
            user,
            token,
            message:'登陆成功'
        })
    
    
})

//token验证 返回信息
router.post('/profile',auth,async(req,res) =>{
     res.send(req.user)
})
//返回所有用户信息
router.post('/finde',async(req,res)=>{
    const article = await Login.find()
    res.send(article)
})
//返回单个权限用户信息
router.post('/user',async(req,res)=>{
    const article = await Login.find({"user":req.body.label})
    res.send(article)
   
})
//修改密码
router.put("/test",async (req, res) => {
    const article = await Login.findByIdAndUpdate(req.body._id, req.body)
   
    res.send(article)
})
//玩一下ckooie
router.post('/cookies', async(req,res)=>{
    
   

        req.session.isFirst = req.body;
      
       
         res.send(); 
});

//删除用户
router.delete("/del/:id", async(req, res) => {
 
    
        await Login.findByIdAndDelete(req.params.id)
        res.send()
})
//管理者修改信息
router.post("/modify",jiami,async(req,res)=>{
   
    const article = await Login.findByIdAndUpdate(req.body._id, req.body)
    // .select('+passsword')
   await Category.updateMany({"uid":req.body._id}, {"username":req.body.username})
   
    res.send(article)
})
//用户修改密码
router.post("/ChangePassword",jiami,async(req,res)=>{

    const article =  await Login.updateOne({"_id":req.body._id}, {"password":req.body.password})
    // .select('+passsword')
    res.send(article)
   
})
//修改登陆状态(禁止允许)
router.post("/states",async(req,res)=>{
    const article =  await Login.updateOne({"_id":req.body._id}, {"state":req.body.state})
    res.send(article)
 
})
//搜索
router.post('/sou', async(req, res) => {
  
    const keyword = req.body.keyword // 获取查询的字段
  const reg = new RegExp(keyword, 'i') //不区分大小写
  
    //  const ac=await Category.find({name:{$regex:reg}})
    const ac=await Login.find({username:{$regex:reg}},null,function (clubErr, clubDoc) {

      res.send(clubDoc)
     
    })
    
  })

//分页
router.post('/fen', async(req, res) => {
    let currentPage = parseInt(req.body.params.currentPage) // 转换前端传入当前页码
    let pagesize = parseInt(req.body.params.pagesize) // 转换前端传入的每页大小
    let dis = parseInt(req.body.params.dis)//跳过多少条
    let dia = pagesize *currentPage
    
    const ad=(req.body.params.data).slice(dis,dia)

    res.send(ad)
  })
  //修改权限
  router.post("/userstates",async(req,res)=>{
    const article =  await Login.updateOne({"_id":req.body._id}, {"user":req.body.user})
})
module.exports = router