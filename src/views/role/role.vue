<template>
  <div id="adopt" class="wares">
      <el-col class="zhong">
      
      </el-col>
       <el-row>
     <el-col :span="5" :offset="1" :xs="{span:0,offset:0}">
      <el-tree
      v-cloak
        :data="users"
       :default-expand-all="true"
        accordion
         @node-click="handleNodeClick"
        >
      </el-tree>
     </el-col>
     <el-col :span="16" :offset="1"  :xs="{span:24,offset:0}">
       <el-col :style="{margin:'0px 0px 8px 0px'}">
         <el-col :span="18">
           <el-input v-model="inout" placeholder="请输入内容" @input="addstore()"></el-input>
         </el-col>
        <el-col :span="6">  
                       <el-button type="primary"  @click="sad()">添加</el-button>
                     <el-dialog 
                        title="提示"
                        class="zhong"
                        :visible.sync="dialogVisibles"
                        :append-to-body="true"
                        :before-close="handleClose">                            
                                <el-form  v-model="user">
                                  <el-form-item label="用户名">
                                    <el-input v-model="user.username">                                     
                                    </el-input>
                                  </el-form-item>
                                    <el-form-item label="用户密码">
                                    <el-input v-model="user.password">                                     
                                    </el-input>
                                  </el-form-item>
                                </el-form>
                         
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="sad()">取 消</el-button>
                            <el-button type="primary" @click="add()">确 定</el-button>
                        </span>
                        </el-dialog>
        </el-col>

       </el-col>
       <el-col>
          <el-col>
                  <el-table
                  v-cloak
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            :fit="true"
            @selection-change="handleSelectionChange">
            
            <el-table-column
              type="selection"
              min-width="20">
            </el-table-column>
        
            <el-table-column
              prop="username"
              label="用户名"
              min-width="20">
              

            </el-table-column>
            <el-table-column
              prop="user"
              label="用户权限"
               min-width="20"
              show-overflow-tooltip>
           
            </el-table-column>
             <el-table-column
              label="修改"
               min-width="20"
              show-overflow-tooltip>
                 <template slot-scope="scope">
                
                    <el-button type="primary" icon="el-icon-edit"  
                     @click="save(scope.row)"></el-button>
                     </template>
                        <el-dialog 
                        custom-class="tan"
                        title="提示"
                        class="zhong"
                        :visible.sync="dialogVisible"
                        width="30%"
                        :append-to-body="true"
                        :before-close="handleClose">
                             
                                <el-form  v-model="form">
                                  <el-form-item label="修改用户名">
                                    <el-input v-model="form.username">                                     
                                    </el-input>
                                  </el-form-item>
                                    <el-form-item label="修改密码">
                                    <el-input v-model="form.pass">                                     
                                    </el-input>
                                  </el-form-item>
                                </el-form>
                         
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="sa()">取 消</el-button>
                            <el-button type="primary" @click="sa()">确 定</el-button>
                        </span>
                        </el-dialog>
      
                         
            </el-table-column>
            <el-table-column  min-width="20"   label="删除">
               <template slot-scope="scope">
                <el-button type="danger" icon="el-icon-delete"  @click="dialogVisibledelete= !dialogVisibledelete"></el-button> 
                   <el-dialog 
                        custom-class="tan"
                        title="删除"
                        class="zhong"
                        :visible.sync="dialogVisibledelete"
                        width="30%"
                        :append-to-body="true"
                        :before-close="handleClose">
                             
                               <span>确认要删除吗</span>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="dialogVisibledelete = !dialogVisibledelete">取 消</el-button>
                            <el-button type="primary" @click="deletes(scope.row)">确 定</el-button>
                        </span>
                        </el-dialog>
               </template>
            </el-table-column>
          </el-table>
       </el-col>
       <el-col>
              <div class="block">
                  

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
       
     </el-col>
   </el-row>
  </div>
</template>
<script>
export default {
    name:'role',
     components: {
   
  },
    data(){ 
      return{
        dialogVisibles:false,
            dialogVisible: false,
                 dialogVisibledelete: false,
            pagesizes:[1,5,10,15,20],
            inout:'',//
         total:0,//总数据条数
        dis:0,//跳过数据s
        pagesize:10,//  每页的数据数量  
        currentPage:1, //当前页码
        model:{},
        users:[],//用户分类
        userset:[],
        tableData:null,
        form:{
          'pass':'1'
        },
        user:{},
         currentPage1: 5,
        currentPage2: 5,
        currentPage3: 5,
        currentPage4: 4
    }},
    created(){
      this.$ajax.post('/api/denglu/finde').then((res)=>{
        this.$store.state.roleuser= res.data
        
         this.users.push({label:'所有'})
        this.users[0].children = []
   
           this.total = this.$store.state.roleuser.length
                this.handleSizeChange(10)
          this.$store.state.roleuser.map((value,key)=>{
         this.userset[key] = value.user
       })
       this.userset = [...new Set(this.userset)]   
       this.userset.map((value,key)=>{
         this.users[0].children.push({label:value})
         
       }) 
 
        })
        
        
  },
     methods: {
       deletes(user){ 
     
        //  user =JSON.parse(JSON.stringify(user)) 
       
        this.$ajax.delete(`/api/denglu/del/${user._id}`).then((res)=>{
            this.$router.replace({
                path: '/kong',
                query: {
                  t: Date.now()
                }
              })
        })
       },
       sad(){
           this.dialogVisibles = !this.dialogVisibles
       },
       add(){
         
           this.$ajax.post('/api/denglu/register',this.user).then((res)=>{
            this.$router.replace({
                path: '/kong',
                query: {
                  t: Date.now()
                }
              })
        })
           this.sad()
       },
        sa(){
          this.form.password = this.form.pass
          
         this.dialogVisible = !this.dialogVisible  
          this.$ajax.post("/api/denglu/modify",JSON.parse( JSON.stringify(this.form))).then(()=>{        
          })       
        },
         save(user){
            this.form = user
         
             this.dialogVisible = !this.dialogVisible 
          
         },
           handleSelectionChange(val) {
        this.multipleSelection = val;
      },
         handleClose(done) {
          
        this.$confirm('确认关闭？')
          .then(_ => {
           
            done();
          })
          .catch(_ => {});
      },
            //搜索
      addstore(){
        console.log(this.inout)
        //因为后端正则验证所以要传入纯字符
        this.$ajax.post('/api/denglu/sou',{"keyword":this.inout}).then((res)=>{
           this.$store.state.roleuser = res.data
             this.total = this.$store.state.roleuser.length
                this.handleSizeChange(10)
        })
      },
            //树形
        handleNodeClick(data) {
            if(data.label == "所有"){
            this.$ajax.post('/api/denglu/finde').then((res)=>{   
           this.$store.state.roleuser = res.data
        this.total = this.$store.state.roleuser.length
                this.handleSizeChange(10)
     
        })
        }else{
         
        this.$ajax.post("/api/denglu/user",JSON.parse(JSON.stringify(data))).then((res)=>{ 
          this.$store.state.roleuser = res.data
          this.total = this.$store.state.roleuser.length
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
                    data:JSON.parse(JSON.stringify(this.$store.state.roleuser)),    
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
       console.log(`当前页: ${val}`);
        //每次点击更改页码值
        this.currentPage = val;
           console.log( this.currentPage);
        this.currentPage == 1?this.dis = 0:this.dis = this.pagesize * (this.currentPage-1);
       this.$ajax.post('/api/denglu/fen',{
                 params:{      
                    data:JSON.parse(JSON.stringify(this.$store.state.roleuser)),    
                     dis:this.dis,        
                     pagesize:this.pagesize,
                     currentPage:this.currentPage
                 }
             }).then((res)=>{
             
            
               this.tableData = res.data
               
             })
      },
      handleClick(tab, event) {
        console.log(tab, event);
      }
    
      
    } ,
    computed:{
        metrics () {
      return this.$store.state.scores.map(({ name }) => name)
    }
    }
}
</script>
<style lang="less" scoped>
#adopt{
    position: relative;
}
.zhong{
    z-index: 100000;
}
.zhong /deep/ .el-dialog{
  width: 30%;
}

 /deep/ .el-table__header /deep/ tr{color: steelblue;
    font-size: 18px;
    
    }
 /deep/ .el-table__body{
      color: deepskyblue;
    font-size: 17px!important;
    font-family: monospace;
}

 @media screen and (max-width: 789px) {
 /deep/.el-pagination .el-pagination__jump{
       display: block;
       margin-left: 0;
     }
     .zhong /deep/ .el-dialog{
  width: 85%;
}

     }
     
</style> 
