<template>
  <div id="adopt">

       <el-row>
     <el-col :span="4" :offset="1" :xs="{span:24,offset:0}" class="bord">
       <el-tree
        :data="user"
       :default-expand-all="true"
        accordion
        @node-click="handleNodeClick">
      </el-tree>
      
     </el-col>
     <el-col :span="17"  :offset="1" :xs="{span:24,offset:0}" >
       <el-col  class="mar10">
         <el-col :span="18"  :xs="{span:18}" class="bordshow">
           <el-input v-model="inout" placeholder="请输入内容" @input="addstore()"></el-input>
         </el-col>
         <el-col :span="3" :offset="1"  :xs="{span:6,offset:0}" :style="{overflow:'hidden',minwidth:'80px'}">
            <el-button type="primary" @click="save()">通知</el-button>
                    <el-dialog 
                                title="提示"
                                class="zhong"
                                :visible.sync="dialogVisibles"
                                :append-to-body="true"
                                :before-close="handleClose">                            
                                        <el-form  v-model="notice">
                                          <el-form-item label="通知标题">
                                            <el-input v-model="notice.title">                                     
                                            </el-input>
                                          </el-form-item>
                                            <el-form-item >

                                               
                                             <quill-editor 
                                              v-model="content" 
                                              ref="myQuillEditor" 
                                              :options="editorOption" 
                                             >            
                                              </quill-editor>

                                                 </el-form-item>
                                        </el-form>
                                
                                <span slot="footer" class="dialog-footer">
                                    <el-button @click="save()">取 消</el-button>
                                    <el-button type="primary" @click="saveok()">确 定</el-button>
                                </span>
                                </el-dialog>
        </el-col>
       </el-col>
       <el-col class="bordshow">
                 <el-table
                  :data="tableData"
                  style="width: 100%">
                  <el-table-column type="expand">
                    <template slot-scope="props">
                      <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="用户名">
                          <span>{{ props.row.username }}</span>
                        </el-form-item>
                        <el-form-item label="用户权限">
                          <span>{{ props.row.user }}</span>
                        </el-form-item>
                        <el-form-item label="用户性别">
                          <span>{{ props.row.gender }}</span>
                        </el-form-item>
                        <el-form-item label="用户生日">
                          <span>{{ props.row.date}}</span>
                        </el-form-item>
                        <el-form-item label="用户邮箱">
                          <span>{{ props.row.emali}}</span>
                        </el-form-item>
                        <el-form-item label="用户电话">
                          <span>{{ props.row.tel}}</span>
                        </el-form-item>
                        <el-form-item label="用户描述">
                          <span>{{ props.row.desc }}</span>
                        </el-form-item>
                      </el-form>
                    </template>
                  </el-table-column>
                  <el-table-column
                    label="用户名"
                    prop="username">
                  </el-table-column>
                  <el-table-column
                    label="用户权限"
                    prop="user">
                  </el-table-column>
                  <el-table-column
                    label="描述简介"
                    prop="synopsis">
                  </el-table-column>
                  <el-table-column
                    label="用户状态"
                   >
                          <template slot-scope="scope">
                    
                     <el-switch
                  v-model="scope.row.state"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="oks(scope.row._id,scope.row.state)">

                </el-switch>
                    <el-dialog
                      title="提示"
                      :visible.sync="dialogVisible"
                      width="30%"
                      :before-close="handleClose">
                      <span>是否要改变该用户登录状态</span>
                      <span slot="footer" class="dialog-footer">
                        <el-button @click="no()">取 消</el-button>
                        <el-button type="primary" @click="ok()">确 定</el-button>
                      </span>
                    </el-dialog>
                   </template>
                    
                  </el-table-column>
                 </el-table>
       <el-col>
              <div class="block">
  

      </div>
       </el-col>
       </el-col>
          <el-col>
       <div class="block bordshow mart10" >
            
       <el-pagination
        prop = "pagesize,currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="pagesizes"
        native-type="submit"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="this.total"
        >
      
      </el-pagination>

      </div>
       </el-col>
      

     </el-col>
        
   </el-row>
  </div>
</template>
<script>
     import {quillEditor, Quill} from 'vue-quill-editor'
  import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'

  Quill.register('modules/ImageExtend', ImageExtend)
    // const  toolbarOptions= [
    //   ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    //   ['blockquote', 'code-block'],
      
    //   [{'header': 1}, {'header': 2}], // custom button values
    //   [{'list': 'ordered'}, {'list': 'bullet'}],
    //   [{'script': 'sub'}, {'script': 'super'}], // superscript/subscript
    //   [{'indent': '-1'}, {'indent': '+1'}], // outdent/indent
    //   [{'direction': 'rtl'}], // text direction
      
    //   [{'size': ['10px', '12px', '14px', '16px' ,'18px', '20px', '22px', '24px', '26px', '32px', '48px']}], // custom dropdown
    //   [{'header': [1, 2, 3, 4, 5, 6, false]}],
      
    //   [{'color': []}, {'background': []}], // dropdown with defaults from theme
    //   [{'font': []}],
    //   [{'align': []}],
    //   ['link', 'image'],
    //   ['clean'] // remove formatting button
    // ]
export default {
    name:'adopt',
     components: {quillEditor},
    data(){ 
      return{
         content: '',
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
        dialogVisibles:false,
          pagesizes:[5,10,15,20],
         total:0,//总数据条数
        dis:0,//跳过数据s
        pagesize:10,//  每页的数据数量  
        currentPage:1, //当前页码
        model:{},
        admin:{},//要修改的数据
        user:[],//用户分类
        userset:[],
        inout:'',//搜索信息
        tableData:null,
        notice:{
          title:'',
          content:''
        },//富文本
      dialogVisible:false
    }},

   created(){
      //查询所有用户
      this.$ajax.post('/api/denglu/finde').then((res)=>{
     this.$store.state.adoptuser = res.data
    
       this.user.push({label:'所有'})
        this.user[0].children = []
         this.total =  this.$store.state.adoptuser.length
           this.handleSizeChange(10)
      this.$store.state.adoptuser.map((value,key)=>{
         this.userset[key] = value.user
       })
       this.userset = [...new Set(this.userset)]   
       this.userset.map((value,key)=>{
         this.user[0].children.push({label:value})
       }) 
        
      })
    },
    // 在挂载时为图片上传按钮绑定事件
  methods: {
       save(){
         this.dialogVisibles = !this.dialogVisibles
       },
       saveok(){
         this.notice.content = this.content
         this.$ajax.post('/api/section/notice',this.notice)
         this.save()

       },
       oks(user,state){
          // this.$ajax.post('/api/denglu/states',{
          //   "_id":user,
          //   "state":!state
          // })
          this.admin._id = user
          this.admin.state = state
          
          this.dialogVisible  = !this.dialogVisible
       },
       ok(){
           this.$ajax.post('/api/denglu/states',this.admin)
          this.dialogVisible  = !this.dialogVisible
       },
       no(){
        this.$router.replace({
                path: '/kong',
                query: {
                  t: Date.now()
                }
              })
       },

           //搜索
      addstore(){
    
        //因为后端正则验证所以要传入纯字符
        this.$ajax.post('/api/denglu/sou',{"keyword":this.inout}).then((res)=>{
           this.$store.state.adoptuser = res.data
            this.total =  this.$store.state.adoptuser.length
           this.handleSizeChange(10)
     
        })
      },
       //树形
        handleNodeClick(data) {
            if(data.label == "所有"){
            this.$ajax.post('/api/denglu/finde').then((res)=>{   
           this.$store.state.adoptuser = res.data
        this.total =  this.$store.state.adoptuser.length
           this.handleSizeChange(10)
     
        })
        }else{
         
        this.$ajax.post("/api/denglu/user",JSON.parse(JSON.stringify(data))).then((res)=>{ 
          this.$store.state.adoptuser = res.data
        
          this.total =  this.$store.state.adoptuser.length
                this.handleSizeChange(10)
          }
          )}
      },
      handleSizeChange(val) {
        //每次点击更改条数值
        this.pagesize = val;
        this.currentPage == 1?this.dis = 0:this.dis = this.pagesize * (this.currentPage-1)
        
       this.$ajax.post('/api/denglu/fen',{
                 params:{      
                    data:JSON.parse(JSON.stringify(this.$store.state.adoptuser)),    
                     dis:this.dis,        
                     pagesize:this.pagesize,
                     currentPage:this.currentPage
                 }
             }).then((res)=>{
             
            
               this.tableData = res.data
            
               
             })
 
        },
          //更改页码分页变动
      handleCurrentChange(val) {
   
        //每次点击更改页码值
        this.currentPage = val;
      
        this.currentPage == 1?this.dis = 0:this.dis = this.pagesize * (this.currentPage-1);
       this.$ajax.post('/api/denglu/fen',{
                 params:{      
                    data:JSON.parse(JSON.stringify(this.$store.state.adoptuser)),    
                     dis:this.dis,        
                     pagesize:this.pagesize,
                     currentPage:this.currentPage
                 }
             }).then((res)=>{
             
            
               this.tableData = res.data
               
             })
      },
      handleClick(tab, event) {
       
      },
      
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
             this.$router.replace({
                path: '/kong',
                query: {
                  t: Date.now()
                }
              })
          })
          .catch(_ => {});
      }

      
    } 
}
</script>
<style lang="less" scoped>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand /deep/ label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
 /deep/ .el-table__header /deep/ tr{color: steelblue;}
 /deep/ .el-table__body{
      color: deepskyblue;
    font-size: 17px;
    font-family: monospace;
}

.main-container {
  max-width: 80%;
  min-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.tips {
  width: 600px;
  padding: 15px 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  line-height: 2;
}
.font {
  font-size: 18px;
}
#quill-editor {
  /*width: 80%;*/
  height: 300px;
}

/* 内容返显 */
.ql-editor {
  margin-bottom: 50px;
}
</style> 
