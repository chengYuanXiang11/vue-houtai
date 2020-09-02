<template>
<!-- 顶部导航 -->
    <div id="geren" >
      <el-row>
          <el-col :xs="{span:22,offset:1}" :span="8" :offset="1" class="bcb d1">
            <!-- 
              action	必选参数，上传的地址
              on-success	文件上传成功时的钩子
              before-upload	上传文件之前的钩子
              show-file-list	是否显示已上传文件列表

              on-preview	点击文件列表中已上传的文件时的钩子
              on-remove	文件列表移除文件时的钩子        
              on-error	文件上传失败时的钩子	
            -->
              <el-form ref="toDate" v-model="toDate">
                 
                       <el-col :style="{fontSize:'18px'}">
                         用户头像(点击上传)
                       </el-col>
                       
                  <el-upload
                
                  class="avatar-uploader"
                  :action="'http://118.89.177.170:3001/api/upload'"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  >
                  <img v-if="toDate.icon" :src="toDate.icon" class="avatar" >
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload> 
         
            </el-form>
           
          </el-col>
          <el-col :span="13" :offset="1" :xs="{span:22,offset:1}" class="bcb d1">
                  <!-- @tab-click="handleClick" -->
            <el-tabs v-model="activeName" >
                <el-tab-pane label="基本信息" name="first">
                  <!-- <template slot-scope="scope"> -->
                    
               <template >
                 <el-col :span="15" :xs="{span:21}">
                       <el-form :model="toDate" ref="toDate" status-icon  :rules="rules" label-width="80px">
                        <el-form-item label="账号">
                          <el-input v-model="toDate.username"  :disabled="true"></el-input>
                        </el-form-item>
                         <el-form-item label="个性名称">
                          <el-input v-model="toDate.name"></el-input>
                        </el-form-item>
                        <el-form-item label="性别">
                          <el-radio-group v-model="toDate.gender">
                            <el-radio label="男"></el-radio>
                            <el-radio label="女"></el-radio>
                          </el-radio-group>
                        </el-form-item>
                          <el-form-item label="简介" prop="synopsis">
                          <el-input v-model="toDate.synopsis"></el-input>
                        </el-form-item>
                      <el-form-item label="邮箱" prop="emali">
                          <el-input v-model="toDate.emali"></el-input>
                        </el-form-item>
                        <el-form-item label="生日">
                          <el-col >
                            <el-date-picker type="date" placeholder="生日" v-model="toDate.date" style="width:100%;">

                            </el-date-picker>
                          </el-col>
                        
                        </el-form-item>
                          <el-form-item label="电话" prop="tel">
                          <el-input v-model="toDate.tel"></el-input>
                        </el-form-item>
                        <el-form-item>
                         <Debounce :time='3000' :isDebounce="2">
                           <el-button type="primary" @click.native="submitForm('toDate')">立即修改</el-button>
                         </Debounce>                      
                        </el-form-item>
                      </el-form>
                  </el-col>
               </template>
                  
                </el-tab-pane>
                <el-tab-pane label="其他" name="second">
                  <el-checkbox v-model="ziong"  @change="zidong()">
                       开关自动登录
                  </el-checkbox>
                 
                </el-tab-pane>
                
            </el-tabs>
            
          </el-col>
      </el-row>

    </div>
</template>
<script>
import {Debounce} from '../custom/antiShake'

export default {
    name:'geren',
    data(){
      //验证邮箱
      const validateEmali = (rule, value, callback) => {
        
           const reg1 = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
          if(!reg1.test(value)){
             
               callback(new Error('不符合邮箱规范'));
          }else
          callback();
        };
     const validateTel = (rule, value, callback) => {
           const reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/ ;
          if(!reg.test(value)){
               callback(new Error('不符合规范'));
          }else
          callback();
        };
    
    
      return{ 
        aicon:'',
      rules: {
          emali: [
              { validator: validateEmali, trigger: 'blur' }
            ],
            tel: [
              { validator: validateTel, trigger: 'blur' }
            ]         
          },
         imageUrl: '',//图片地址
        toDate:{
          
        },
        activeName: 'first',
        a:null,
        ziong:null,
        fits: 'fill',
      }
    },
    created(){
      console.log(this.$store.state.username)
      this.token=localStorage.getItem('token')
      this.ziong = Boolean(localStorage.ziong)
      this.$ajax.post('/api/denglu/profile',this.token).then((res)=>{
        this.toDate = res.data
       this.a = res.data.icon
      
    })
    },
     methods: {
       handleAvatarSuccess(res, file) {
        this.$set(this.toDate,'icon',res.url)
            
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
       zidong(){    //自动登录   
         this.ziong = !this.ziong
          localStorage.setItem("ziong",String(this.ziong))
       }, 
         submitForm(formName) {
  
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$ajax.put('/api/denglu/tou',{
              "aicon":this.a,
              "bicon":this.toDate.icon
            })
                  this.$ajax.put('/api/denglu/test',{data:this.toDate,name:this.$store.state.name}).then((res)=>{
                this.$message({
                  message: '已修改成功',
                  type: 'success'
                });
                  this.$store.commit('dispatchname',{
                    name:this.toDate.name
              })
                  this.$router.replace({
                path: '/kong',
                query: {
                  t: Date.now()
                }
              })
              }).catch(err => {
                console.log(err);
              });
           
          
          } 
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
    }
       
    
}
</script>
<style lang="less" scoped>
.bcb{
  background-color: #fff;
  padding: 20px;
}
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .d1{
        margin-top: 0px;
  }
  @media screen and (max-width: 768px) {
     .d1{
        margin-top: 20px;
  }
}
</style> 
