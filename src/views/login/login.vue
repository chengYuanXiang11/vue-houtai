<template>  
 <el-form :model="input"  :rules="rules" ref="input">
        <el-col class="login">
   

      <el-col :span="10" class="login_content" v-cloak >
     

       
        <el-col class="deng">
          登录一下
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
           <el-col><input type="checkbox" class="zidong" name="" id="" @click="zidong()">
           <span class="dengcolspan">下次自动登录</span></el-col>
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
         imgarr:[
          require('../../assets/dis (1).jpg'),
          require('../../assets/dis (2).jpg'),
          require('../../assets/dis (3).jpg')
        ],
        imgcount:0,
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
       mounted(){
      // 预加载图片
      this.loading();

    },
     methods: {  
      loading(){
        var imgArr = this.imgarr;
        var imgCount= this.imgcount;
        for (let img of imgArr) {
          console.log(img);
          let image = new  Image();
          image.src =img
          image.onload=()=>{
            console.log("预加载")
            imgCount++
            this.imgcount = parseInt((imgCount / imgArr.length)*100);
            if(imgCount == imgArr.length){
              console.log('ok')
            }
          }
            console.log(img)
            console.log(image)

        }
      },
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
   
          font-size: 30px;
          background: -webkit-gradient(linear, left top, right top, from(red), to(blue));
          background: -o-linear-gradient(left, red, blue);
          background: linear-gradient(to right, red, blue);
        -webkit-background-clip: text;
          color: transparent;
        margin: 20px auto;
    
    
      height: 30px;
      line-height: 30px;
      vertical-align: middle;
  }
  .el-input /deep/ input {
       margin: 22px auto;
  }
  .login{
       position: fixed;
      top: 0px;  
      left: 0px; 
    width: 100%;
    height: 100%;
  background:url("../../assets/beijing.jpeg");
  width:100%;		
  height:100%;	
  position:fixed;
  background-size:100% 100%;
      background-position: center;
  -webkit-animation:frams 30s infinite;
          animation:frams 30s infinite;
  }
    @-webkit-keyframes frams {
              0%{
               background-size: 100% 100%;
              }
                12%{
                  background-image: url("../../assets/dis (2).jpg");background-size: 150% 150%;
              }
                 24%{
                  background-image: url("../../assets/dis (2).jpg");background-size: 100% 100%;
              }
               36%{
                  background-image: url("../../assets/dis (1).jpg");background-size: 100% 100%;
              }
                48%{
                  background-image: url("../../assets/dis (1).jpg");background-size: 150% 150%;
              }
                 60%{
                  background-image: url("../../assets/dis (1).jpg");background-size: 100% 100%;
              }
               72%{
                  background-image: url("../../assets/dis (3).jpg");background-size: 100% 100%;
              }
                84%{
                  background-image: url("../../assets/dis (3).jpg");background-size: 150% 150%;
              }
                 100%{
                  background-image: url("../../assets/dis (3).jpg");background-size: 100% 100%;
              }
          }
    @keyframes frams {
              0%{
                  background-image: url("../../assets/dis (2).jpg");background-size: 100% 100%;
              }
                12%{
                  background-image: url("../../assets/dis (2).jpg");background-size: 150% 150%;
              }
                 24%{
                  background-image: url("../../assets/dis (2).jpg");background-size: 100% 100%;
              }
               36%{
                  background-image: url("../../assets/dis (1).jpg");background-size: 100% 100%;
              }
                48%{
                  background-image: url("../../assets/dis (1).jpg");background-size: 150% 150%;
              }
                 60%{
                  background-image: url("../../assets/dis (1).jpg");background-size: 100% 100%;
              }
               72%{
                  background-image: url("../../assets/dis (3).jpg");background-size: 100% 100%;
              }
                84%{
                  background-image: url("../../assets/dis (3).jpg");background-size: 150% 150%;
              }
                 100%{
                  background-image: url("../../assets/dis (3).jpg");background-size: 100% 100%;
              }
          }
  .ds{
      margin-left: 20px;
  }
  .d1{
    float: left;
  }
  .dengcol{
   margin: 0 25%;
      float: left;
      /* background: linear-gradient(90deg,red,#00f); */
      font-size: 30px;
      background: -webkit-gradient(linear,left top, right top,from(red),to(#00f));
      background: -o-linear-gradient(left,red,#00f);
      background: linear-gradient(90deg,red,#00f);
      -webkit-background-clip: text;
      color: transparent;
      background-color: transparent;
      border: 0;
  }
  
  .dengcolspan{
    background: -webkit-gradient(linear,left top, right top,from(red),to(#00f));
    background: -o-linear-gradient(left,red,#00f);
    background: linear-gradient(90deg,red,#00f);
      -webkit-background-clip: text;
      color: transparent;
      border: 0px solid;
      border-radius: 14%;
      width: 68px;
      height: 38px;
      font-size: 24px;
  }
  .zidong{
       background: -webkit-gradient(linear,left top, right top,from(red),to(#00f));
       background: -o-linear-gradient(left,red,#00f);
       background: linear-gradient(90deg,red,#00f);
      -webkit-background-clip: text;
      color: transparent;
  }
  .zidong span{
   background: -webkit-gradient(linear,left top, right top,from(red),to(#00f));
   background: -o-linear-gradient(left,red,#00f);
   background: linear-gradient(90deg,red,#00f);
      -webkit-background-clip: text;
      color: transparent;
  }
  .login_content{
  
     
      min-width: 400px;
      max-width: 500px;
    padding: 40px;
      background-color: inherit;
    position: absolute; /*父元素需要相对定位*/
    top: 50%;
    left: 50%;
    -webkit-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%); /*在水平和垂直方向上各偏移-50%*/
  }
</style> 