<template>
  <div class="about">
    <el-row >
      <el-col  :span="22" :offset="1"  :xs="{span:22,offset:1}">
        <el-col>
          <!-- 通知列表 -->
            <el-col  v-for="(item,index) in this.adata" :key="index">
              <el-col class="bg">
                 <el-col class="title"  v-html="item.title"></el-col>
                 <el-col  class="content" v-html="item.content"></el-col>
                 <el-col  class="foot p_date" >
                   <span class="s10px">
                     {{item.date}}
                   </span>
                   </el-col> 
                   <!-- 对通知进行评论 -->
                 <span class="ping" >                 
                   <el-button size="small" type="primary" icon="el-icon-edit"
                    circle class="ping_button"   @click="save(item._id)"
                   style="border-radius:5px"></el-button>
                   
                 </span>
                 <!-- 开启关闭评论 -->
                  <el-col>
                    <el-button type="text" @click="opens(item)">点击开启关闭评论</el-button> 
                  </el-col>
              </el-col>
              <!-- 评论列表 -->
              <el-col v-show="item.show">
                <el-col v-for="(ket,index) in reply" :key="index + '-only'">
                  <el-col  v-if="keys(item._id,ket.pid)" >
                    <el-col class="p">
                    
                         <el-col class="p_name">
                            <img v-if="ket.icon" :src="ket.icon" class="avatar" >
                         评论人：{{ket.name}}
                     </el-col>
                      <el-col v-html="ket.content" class="p_content">
                     </el-col>
                         <el-col class="p_date">
                          <span class="s10px">
                              {{ket.date}}
                             </span>
                     
                    </el-col>
                     <el-col>
                       <!-- 删除评论(只有本人能删除自己的评论) -->
                       <span>
                         <el-button size="small" class="p_span" type="danger" icon="el-icon-delete" circle v-if="shan(ket.uid)" @click="shanchu(ket._id)"></el-button> 
                       </span>
                       <!-- 对评论进行回复 -->
                         <span>
                             <el-button size="small" class="p_span" 
                               type="primary" icon="el-icon-edit"  circle style="border-radius:5px" @click="savehui(ket)"></el-button>
                         </span>
                     </el-col>
                  
                    
                     </el-col>
                      <!-- 回复列表 -->
                     <el-col v-for="(data,index) in replydata" :key="index + '+only'" :span="22" :offset="2"  >
                       <el-col v-show="huikey(data.cid,ket._id)" class="h">
                         <el-col class="h_name"><span class="h_ren">  <img v-if="ket.icon" :src="ket.icon" class="avatar" >{{data.name}}</span>回复  <span>:</span> {{data.bname}}</el-col>
                          <el-col class="h_content" v-html="data.content"></el-col>
                          <el-col class="h_date">
                             <span class="s10px">
                             {{data.date}}
                             </span>
                            </el-col>
                          <el-col>
                          <span>
                             <el-button size="small" class="p_span" @click="saveshan(data._id)" type="danger" icon="el-icon-delete" circle></el-button>                           
                          </span>
                              <span>
                                 <el-button size="small"    type="primary" icon="el-icon-edit"  circle  class="p_span" @click="saverhui(data,ket)"></el-button>
                              </span>
                           
                           
                           </el-col>
                        </el-col>
                       </el-col>
                    </el-col>
                    
                  </el-col>
              </el-col>
            </el-col >            
          <el-col>            
        </el-col>
       </el-col>
     </el-col> 
    <el-col>
       <el-dialog title="评论" :visible.sync="dialogVisible"  width="30%" :before-close="handleClose">
                      <el-form  v-model="comment">
                        <el-form-item >
                           <quill-editor v-model="commentcontent" :options="commenteditorOption"> </quill-editor>
                        </el-form-item>
                      </el-form>
                        <span slot="footer" class="dialog-footer">
                          <el-button @click="save()">取 消</el-button>
                          <el-button type="primary" @click="saveok()">确 定</el-button>
                        </span>
                      </el-dialog> 
                      <el-dialog
                              title="删除"
                              :visible.sync="dialogVisibleshan"
                              width="30%"
                              :before-close="handleClose">
                                <span>确定删除吗</span>
                              <span slot="footer" class="dialog-footer">
                                <el-button @click="saveshan()">取 消</el-button>
                                <el-button type="primary" @click="saveshanok()">确 定</el-button>
                              </span>
                            </el-dialog>
                            
                                 <el-dialog
                              title="删除"
                              :visible.sync="pingdialogVisible"
                              width="30%"
                              :before-close="handleClose">
                                <span>确定删除吗</span>
                              <span slot="footer" class="dialog-footer">
                                <el-button @click="shanchuqu()">取 消</el-button>
                                <el-button type="primary" @click="shanchuquok()">确 定</el-button>
                              </span>
                            </el-dialog>
                            
                               <el-dialog title="回复" :visible.sync="dialogVisibles" width="30%" :before-close="handleClose">
                                <el-form  v-model="comments">                             
                                  <el-form-item >                                           
                                     <quill-editor  v-model="content" :options="editorOption"></quill-editor>
                                  </el-form-item>
                                </el-form>
                                <span slot="footer" class="dialog-footer">
                                  <el-button @click="saveh()">取 消</el-button>
                                 <el-button type="primary" @click="savehuiok()">确 定</el-button>
                                 </span>
                              </el-dialog>
                    </el-col>
     </el-row>
    </div>
</template>
<script> 
    import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
  Quill.register('modules/ImageExtend', ImageExtend)
 import ScrollPosition from '../custom/scrtop';
export default {
  name: 'notice',
  inject:['reload'],
    components: {quillEditor},
 data(){
   return{
     commentcontent:'',
     content:'',
     a:0,
     key:true,
     adata:{},//通知列表
   comment:{},//添加评论
   comments:{},//添加回复
   reply:{},//评论列表
   replydata:{},//回复列表
   deletereply:{},
   dialogVisibles:false,
    dialogVisibleshan:false,
     dialogVisible:false,
      pingdialogVisible:false,
      pingid:null,
       editorOption: {
				modules: {
           ImageExtend: {  // 如果不作设置，即{} 则依然开启复制粘贴功能且以base64插入 
                             name: 'file',  // 图片参数名
                             size: 3,  // 可选参数 图片大小，单位为M，1M = 1024kb
                             action: `http://localhost:8080/api/uploads/image?path=${JSON.stringify(this.content)}`,  // 服务器地址, 如果action为空，则采用base64插入图片
                             // response 为一个函数用来获取服务器返回的具体图片地址
                             // 例如服务器返回{code: 200; data:{ url: 'baidu.com'}}
                             // 则 return res.data.url
                             response: (res) => {
                             
                                 return res.url
                             },
                             headers: (xhr) => {
                             // xhr.setRequestHeader('myHeader','myValue')
                             },  // 可选参数 设置请求头部
                             sizeError: () => {},  // 图片超过大小的回调
                             start: () => {},  // 可选参数 自定义开始上传触发事件
                             end: () => {
                  
                             },  // 可选参数 自定义上传结束触发的事件，无论成功或者失败
                             error: () => {},  // 可选参数 上传失败触发的事件
                             success: () => {
                             
                             },  // 可选参数  上传成功触发的事件
                             change: (xhr, formData) => {
                              
                             // xhr.setRequestHeader('myHeader','myValue')
                             // formData.append('token', 'myToken')
                             } // 可选参数 每次选择图片触发，也可用来设置头部，但比headers多了一个参数，可设置formData
                         },
                          toolbar: {
                            // container: toolbarOptions, // 工具栏
                             container: container, // 工具栏
                            handlers: {
                                'image': function () {  // 劫持原来的图片点击按钮事件
                                     QuillWatch.emit(this.quill.id)
                                 }
                            }
                          }
                        }
      },
            commenteditorOption: {
				modules: {
           ImageExtend: {  // 如果不作设置，即{} 则依然开启复制粘贴功能且以base64插入 
                             name: 'file',  // 图片参数名
                             size: 3,  // 可选参数 图片大小，单位为M，1M = 1024kb
                             action: `http://localhost:8080/api/uploads/image?path=${JSON.stringify(this.commentcontent)}`,  // 服务器地址, 如果action为空，则采用base64插入图片
                             response: (res) => {
                                 return res.url
                             }
                         },
                          toolbar: {
                            // container: toolbarOptions, // 工具栏
                             container: container, // 工具栏
                            handlers: {
                                'image': function () {  // 劫持原来的图片点击按钮事件
                                     QuillWatch.emit(this.quill.id)
                                 }
                            }
                          }
                        }
			},
   }
 },
 created(){
   this.content = ''
   if( this.$store.state.notice_adata==null){
        this.$ajax.post('/api/section/finde').then((res)=>{
           this.$store.state.notice_adata = res.data
           this.adata=this.$store.state.notice_adata
           this.adata.forEach((value,key)=>{
              value.show = false
             value.date = this.jdate(value.date)
             })    
     })
   }else{
     this.adata=this.$store.state.notice_adata
   }
     //评论
     this.$ajax.post('/api/comment/findcomment').then((res)=>{
          this.reply = res.data
         this.reply.forEach((value,key)=>{
          value.show = true
           value.date = this.jdate(value.date)
         })
        })
      //回复
     this.$ajax.post('/api/reply/findreply').then((res)=>{
            this.replydata = res.data
            this.replydata.forEach((value,key)=>{
          value.show = true
            value.date = this.jdate(value.date)
         })
      })
 
 },
updated() {
  //位置更新
 const ad = ScrollPosition.get.call(this);
 window.pageYOffset = ad
 document.documentElement.scrollTop = ad
   document.body.scrollTop  = ad
},

beforeRouteLeave (to, from, next) {
     ScrollPosition.save(from.path);
  next();
  },
methods:{
  jdate(date){
     let arr=date.split("T");
               let d=arr[0];
              let darr = d.split('-');
              let t=arr[1];
              let tarr = t.split('.000');
              let marr = tarr[0].split(':');
              let dd = parseInt(darr[0])+"/"+parseInt(darr[1])+"/"+parseInt(darr[2])+" "+parseInt(marr[0])+":"+parseInt(marr[1])+":"+parseInt(marr[2]);
                date = dd
                return date
                console.log(date)
  },
   huikey(id,cid){
    if(id == cid){
       
       return true
       
     }else{
       
       return false
     }
   },
   shan(user){//是否存在删除按钮
    if(user === this.$store.state.userid){
    return  true
    }else{
      return false
    }
   },
   top(){
       ScrollPosition.save(this.$route.path);
     
        const ad = ScrollPosition.get.call(this);
        window.pageYOffset = ad
        document.documentElement.scrollTop = ad
          document.body.scrollTop  = ad
   },
   opens(user){
    this.$store.state.comment=this.adata.map((value,key)=>{
       if(value === user){
        value.show = !value.show
       }
      this.top()
       return value
     })
    this.adata = this.$store.state.comment
   },
   keys(id,pid){
   
     if(id == pid){
       
       return true
       
     }else{
       
       return false
     }
   },
   //控制评论输入框显示隐藏
 save(user){
         this.comment.pid = user
        this.top()
         this.dialogVisible = !this.dialogVisible
       },
       //传输评论
saveok(){
      this.comment.name = this.$store.state.name
      this.comment.uid =  this.$store.state.userid
      this.comment.content =  this.commentcontent
         this.comment.icon =  this.$store.state.icon
      this.$ajax.post('/api/comment/addcomment',this.comment)
      this.dialogVisible = !this.dialogVisible
       this.$router.replace({
                path: '/kong',
                query: {
                  t: Date.now()
                }
              })

       },
savehui(user){
          this.comments.cid = user._id
          this.comments.bname = user.name
          this.comments.name = this.$store.state.name
       
         this.dialogVisibles = !this.dialogVisibles
       },
saverhui(data,ket){
  
   this.comments.cid = ket._id
    this.comments.bname = data.name
     this.comments.name = this.$store.state.name
     console.log(this.comments)
      this.dialogVisibles = !this.dialogVisibles
},
       saveh(){
       this.top()
         this.dialogVisibles = !this.dialogVisibles
       },
       savehuiok(){
         this.comments.icon =  this.$store.state.icon
            this.comments.content =  this.content
            this.$ajax.post('/api/reply/addreply',this.comments) 

          this.saveh()

               this.$router.replace({
                path: '/kong',
                query: {
                  t: Date.now()
                }
              })
          
        
       },
saveshan(user){  
          this.deletereply.id=user
          this.top()
         this.dialogVisibleshan = !this.dialogVisibleshan
       
       },
shanchu(user){
  this.pingid = user
  this.pingdialogVisible = !this.pingdialogVisible
  this.top()
  },
  shanchuqu(){
      this.pingdialogVisible = !this.pingdialogVisible
      this.top()
  },
  shanchuquok(){
 
        this.$ajax.delete(`/api/comment/del/${this.pingid}`)
       this.$router.replace({
                path: '/kong',
                query: {
                  t: Date.now()
                }
              })
  },
saveshanok(){
        
       
         this.dialogVisibleshan = !this.dialogVisibleshan
          this.$ajax.delete(`/api/reply/del/${this.deletereply.id}`)
             this.$router.replace({
                path: '/kong',
                query: {
                  t: Date.now()
                }
              })
        
       },
 handleClose(done){
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
           
          })
          .catch(_ => {});
      }
 }
}
</script>
<style lang="less" scope>
.s10px{
  display: inline-block;
    transform: scale(0.9);
    margin: 5px;
}
  .idex{
    height: 1rem;
    font-size: 0.5rem;
    background-color: aqua;
    margin-top: 0.2rem;
  }
  .editor {
  line-height: normal;
  height: 220px;
}
.title{
  font-size: 30px;
    color: blue;
    margin-top: 20px;
  line-height: 30px;

}
.h_ren{
  color: blue;
  padding-right: 20px;
}
.bg{
  background-color: #fff;
  border-left: 5px solid #722ed1;
   margin-top: 20px;
}

.content 
{text-align: center;
  font-size: 17px;
    text-indent: 2em;
    color: brown;
    line-height: 17px;
 
}
.foot{
  text-align: right;
  font-size: 11px;
}
.content img{
  display: block;
  width: 50%;
  margin: 0 25%;
}
.comm{
  margin-top: 20px;
}
.p{
     background-color: floralwhite;
     margin:10px 0px;
           box-shadow: 10px 16px 8px -5px  cornflowerblue;
    border-radius: 15px;
         font-family: monospace;
}
.h{
  font-family: serif;
       background-color: linen;
     margin:5px 0px;
              box-shadow: 10px 16px 8px -5px rosybrown;
    border-radius: 15px;

}
.p_name{
  text-align: left;
  margin-left:15%;
  font-size:15px;

}
.ping{
      float: right;
    padding: 5px 6%;
}
.ping_button{
      width: 71px;
    height: 46px;
}
.p_content{
    text-indent: 1rem;
    text-align: left;
    font-size: 20px;
       word-break: break-all;
    padding: 10px 20%;
}
.p_date{
  text-align:right;
  margin:0 0 0 -5%;
}
.h_name{
   text-align: left;
  margin-left:20%;
  font-size:13px;
   margin-top: 2px;
}
.h_content{
      font-size: 20px;
      word-break: break-all;
    text-indent: 1rem;
    text-align: left;
    padding: 10px 25%;
}
.h_date{
  text-align:right;
  margin:0 0 0 -5%;
}
.p img,
.h img{
  width: 5%;
    vertical-align: middle;
}
.p_span{
      float: right;
    margin-right: 5%;
        margin-bottom: 1%;
}
.ql-editor{
  height:200px;
}
   @media screen and (max-width: 789px){
     .ql-editor{
  height:100%;
}
   }
</style>
