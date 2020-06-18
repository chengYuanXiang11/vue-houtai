<template>
<el-row class="po building" >
  <el-form :model="input"  :rules="rules" ref="input"  class="demo-input"  label-position="left">
    <el-col>
        <el-form-item label="账号" prop="username" >
      <el-input v-model.number="input.username" placeholder="4到16位, 以字母开头，只能包含字母数字下划线和减，" 
       maxlength="16" minlength="4" class="bgcol" v-focus
       prefix-icon="el-icon-user"
       ></el-input>
        
  </el-form-item>


  <el-form-item label="密码" prop="password"  >
    <el-input type="password"   prefix-icon="el-icon-switch-button" v-model="input.password" autocomplete="off" class="bgcol" show-password placeholder="6-16位，,至少有一个数字，一个大写字母，一个小写字母和一个特殊字符" maxlength="16" minlength="6"></el-input>
  </el-form-item>



  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" prefix-icon="el-icon-switch-button" v-model="input.checkPass" autocomplete="off" class="bgcol" show-password placeholder="请再次输入密码" maxlength="16" minlength="6"></el-input>
  </el-form-item>

   <el-form-item>
    <el-button type="primary" class="bgcol" @click="submitForm('input')">提交注册</el-button>
    <el-button  type="primary" class="bgcol" @click="resetForm('input')">重置输入</el-button>
    <router-link to="/" class="as">
     <el-button  type="primary" class="bgcol">
    返回登录
      </el-button>
     </router-link>
  </el-form-item>
    </el-col>

</el-form>
</el-row>
</template>
<script>

export default {
    name:'register',
    data(){
  
       const validatePassuuser = (rule, value, callback) => {
        if (value === '') {
        
          callback(new Error('请输入账号'));
        } else {
           const reg = /^[A-Za-z]{1}[A-Za-z0-9_-]{3,15}$/;
          if(!reg.test(value)){
               callback(new Error('以字母开头，只能包含字母数字下划线和减号，4到16位'));
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
               callback(new Error('6-16位，,至少有一个数字，一个大写字母，一个小写字母和一个特殊字符'));
          }else
          if (this.input.checkPass !== '') {
            this.$refs.input.validateField('checkPass');
          }
          callback();
        }
      };
      const validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.input.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{
        rules: {
         username: [
            { validator: validatePassuuser, trigger: 'blur' }
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
          
        },
        input:{//注册用
          username:'',
          password: '',
          checkPass: '',
        }
      }
    },

    directives: {
    focus: { //默认焦点不生效
      inserted: function(el) {
        el.querySelector("input").focus();
      }
    }
  },

     methods: {
       submitForm(formName) {

        this.$refs[formName].validate((valid) => {
          if (valid) {
              this.$ajax.post('/api/denglu/register',this.input).then((res)=>{
                this.$message({
                  message: '已注册成功',
                  type: 'success'
                });
              
               
              }).catch(err => {
                 this.$message({
                  message: err.response.data.message,
                  type: 'success'
                });
              });
          } 
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
        changeType(){
            this.showPass = !this.showPass
          
        }
    }
}
</script>
<style lang="less" scoped>
*{margin: 0;
padding: 0;}
.el-form-item /deep/ label{
    color: cadetblue;
}
.po{
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0px;  // 这里是设置与顶部的距离
    left: 0px;  // 这里是设置与左边的距离
}
.demo-input{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);  
  width: 600px;
}
.building{
background:url("../../assets/beijing.jpeg");
width:100%;			//大小设置为100%
height:100%;			//大小设置为100%
position:fixed;
background-size:100% 100%;
}
.el-form-item /deep/ {
 margin-bottom: 22px;
}
.el-button--primary /deep/ {
  width: 76px;
    height: 40px;
    line-height: 40px;
    vertical-align: middle;
}
.bgcol{
  background-color:  #f7e9c2;
 color: cadetblue;
}
.el-input /deep/ input{
  background-color: #f7e9c2;
  float: left;
}
.el-input /deep/ input:focus{
  background-color: #fff;
}
.as{
      text-decoration: none;
    color: cadetblue;
    margin: 0 10px;
}
@media screen and (max-width: 768px){
   .el-form-item /deep/ label{
      display: none;
    }
    .demo-input /deep/ {
      width: 350px;
    }
}
</style> 