<template>
<!-- 顶部导航 -->
    <div id="geren" >
      <el-row>
          <el-col :span="8" :xs={span:0}> 
            
            dd
           
          </el-col>
          <el-col :span="15" :xs={span:24}>
               <el-form :model="rulefs" status-icon :rules="rules" ref="rulefs"  class="demo-toDate">
                      <el-form-item label="当前账户">
                        <el-input type="text" v-model="toDate.username" autocomplete="off" :disabled="true"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="rulefs.password" autocomplete="off" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="rulefs.checkPass" autocomplete="off" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary"  @click="dialogVisible = true">提交</el-button>
                         <el-dialog
                                title="提示"
                                :visible.sync="dialogVisible"
                                width="50%"
                                :before-close="handleClose">
                                <span>确认要修改吗</span>
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="dialogVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="submitForm('rulefs')">确 定</el-button>
                                </span>
                                </el-dialog>
                        <el-button @click="resetForm('rulefs')">重置</el-button>
                    </el-form-item>
                    </el-form>
          </el-col>
      </el-row>

    </div>
</template>
<script>
import {Debounce} from '../custom/antiShake'
export default {
    name:'snav',
    data(){
   const validatePass = (rule, value, callback) => {
      
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          const reg2 = /(?=^.{6,16}$)(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*]).*$/
          if(!reg2.test(value)){
               callback(new Error('6-16位，,至少有一个数字，一个大写字母，一个小写字母和一个特殊字符'));
          }else
          if (this.rulefscheckPass !== '') {
            this.$refs.rulefs.validateField('checkPass');
          }
          callback();
        }
      };
     const validatePass2 = (rule, value, callback) => { 
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.rulefs.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return{ 
          dialogVisible:false,
        toDate:{},//用户信息
        activeName: 'first',
        form: {
        },
        ziong:null,
        fits: 'fill',
          toDate: {
    
        },
         rulefs:{
             password:'',
               checkPass:''
         },
        rules: {
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
         
        }
      }
    },
    created(){
      this.token=localStorage.getItem('token')
      this.ziong = Boolean(localStorage.ziong)
      this.$ajax.post('/api/denglu/profile',this.token).then((res)=>{
        this.toDate = res.data
      console.log(this.toDate)
    })
    },
     methods: {
        zidong(){       
         this.ziong = !this.ziong
          localStorage.setItem("ziong",String(this.ziong))
       }, 
     onSubmit() {
         this.$ajax.put('/api/denglu/test',this.toDate).then((res)=>{
         console.log('ok')
   
      })},
       submitForm(formName) {
         this.dialogVisible = !this.dialogVisible
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.rulefs._id=this.toDate._id
           this.$ajax.post('/api/denglu/ChangePassword',JSON.parse(JSON.stringify(this.rulefs)) ).then((res)=>{
                this.$message({
                  message: '已修改成功',
                  type: 'success'
                });
                this.resetForm(formName)
           })
          } else {
          
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    }
}
</script>
<style lang="less" scoped>
 @media screen and (max-width: 789px) {
//  /deep/ .el-form-item--feedback label{
//        display: none
//      }
  /deep/ .el-form-item__content{
      margin: 0;
  }
     }
</style> 
