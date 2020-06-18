<template>  
 <el-form :model="input"  :rules="rules" ref="input">
        <el-col class="login">
   

      <el-col :span="10" class="login_content" v-cloak >
     

       
        <el-col class="deng">
          登录
        </el-col>
        <el-form-item prop="username"  >
       <el-input v-model="input.username" placeholder="请输入账号" 
        prefix-icon="el-icon-user"
        autofocus 
        autocomplete="on"
        maxlength="10"
        ></el-input>
          </el-form-item>
        <el-col>
          <el-form-item prop="password"  >
            <el-input
             v-model="input.password" 
             placeholder="请输入密码"
             prefix-icon="el-icon-switch-button"
             maxlength="16"
              show-password
              v-cloak
             >
             </el-input>
          </el-form-item>
    </el-col>
    <el-col>
      
          <el-form-item>
            <el-col :span="12">
                <el-button type="submit"  class="dengcol" @click="submitForm('input')">登录</el-button>
            </el-col>
             <el-col :span="12">
           <router-link to="/register">
           <el-button type="submit" class="dengcol">注册</el-button>
           </router-link> 
           </el-col>
           <el-col><input type="checkbox" class="zidong" name="" id="" @click="zidong()">下次自动登录</el-col>
           </el-form-item>
    </el-col>
     
    </el-col>
        </el-col>
    
</el-form>
</template>
<script>
export default {
    name:'login',
    data(){
         const validatePassuuser = (rule, value, callback) => {
      
        if (value === '') {
        
          callback(new Error('请输入账号'));
        } else {
           const reg = /^[A-Za-z]{1}[A-Za-z0-9_-]{3,15}$/;
          if(!reg.test(value)){
               callback(new Error('账号格式不准确'));
          }else

          if (this.input.checkPass !== '') {
            this.$refs.input.validateField('password');
          }
          callback();
        }
      };
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          const reg2 = /(?=^.{6,16}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).*$/
          if(!reg2.test(value)){
               callback(new Error('密码格式错误'));
          }else
          if (this.input.checkPass !== '') {
            this.$refs.input.validateField('checkPass');
          }
          callback();
        }
      };
      return{
          dialogVisible:false,
        labelPosition: 'right',
        formLabelAlign: {
          name: '',
          region: '',
          type: '',
          
        },zid:false,
           rules: {
         username: [
            { validator: validatePassuuser, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ]
          
        },
        input:{
          username:'admin',
          password:'adminA123456@'
        },
        input2:{},
        token:''
      }
    },
     methods: {  
       zidong(){
         this.zid = !this.zid
          localStorage.setItem("ziong",String(this.zid))
       },
         changeType(){
           this.$store.commit('showPass')
          
        },
         submitForm(formName) {
            
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.post('/api/denglu/login',this.input).then((res)=>{
           
            this.$message({
              message: res.data.message,
              type: 'success'
            })
             localStorage.setItem("token", `Bearer ${res.data.token}`)
             this.$router.push('/statistics')
             }).catch(err => {
           
         this.$message({
              message: err.response.data.message,
              type: 'success'
            })
        }).then((res)=>{
                 //登陆成功验证保存token
            
                     
                this.$ajax.post('/api/denglu/profile',localStorage.token).then((res)=>{
                
                  // sessionStorage.setItem("user",JSON.stringify(res.data))
                  this.$store.commit('dispatch',{
                    usr:res.data.user
                  })
                   this.$store.commit('dispatchs',{
                    username:res.data.username
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

                  
                  this.input2 = res.data                    
              })
              })                
          } 
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
     }}
</script>
<style lang="less" scoped>
*{
  margin: 0;
  padding: 0;
}
.deng{
      margin: 20px auto;
    font-size: 24px;
    color: brown;
    height: 30px;
    line-height: 30px;
    vertical-align: middle;
}
.el-input /deep/ input {
     margin: 22px auto;
}
.login{
     position: fixed;
  
    top: 0px;  // 这里是设置与顶部的距离
    left: 0px;  // 这里是设置与左边的距离
  width: 100%;
  height: 100%;
background:url("../../assets/beijing.jpeg");
width:100%;			//大小设置为100%
height:100%;			//大小设置为100%
position:fixed;
background-size:100% 100%;
}
.ds{
    margin-left: 20px;
}
.d1{
  float: left;
}
.dengcol{
  background: #f7e9c2;
 margin: 0 25%;
    float: left;
}
.zidong{
      color: aquamarine;
}
.login_content{

   
    min-width: 400px;
    max-width: 500px;
  padding: 40px;
    background-color: inherit;
  position: absolute; /*父元素需要相对定位*/
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /*在水平和垂直方向上各偏移-50%*/
}
</style> 