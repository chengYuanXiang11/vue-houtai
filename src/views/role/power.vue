<template>
  <div id="adopt">
      <el-col class="zhong">
      
      </el-col>
       <el-row>
     <el-col :span="5" :offset="1" :xs="{span:0,offset:0}">
      <el-tree
        :data="users"
       :default-expand-all="true"
        accordion
         @node-click="handleNodeClick"
        >
      </el-tree>
     </el-col>
     <el-col :span="16" :offset="1"  :xs="{span:24,offset:0}">
       <el-col>
         <el-col :span="24">
           <el-input v-model="inout" placeholder="请输入内容" @input="addstore()"></el-input>
         </el-col>

       </el-col>
       <el-col>
          <el-col>
                  <el-table
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
                
                    <el-button type="primary" icon="el-icon-search"
                     @click="save(scope.row)"></el-button>
                     </template>
                        <el-dialog 
                        title="提示"
                        class="zhong"
                        :visible.sync="dialogVisible"
                        width="30%"
                        :append-to-body="true"
                        :before-close="handleClose">
                             
                                <el-form  v-model="form">
                                 
                                    <el-form-item>
                                    <el-select v-model="form.user" placeholder="修改权限">
                                        <el-option
                                        v-for="item in userset"
                                        :key="item.label"
                                        :label="item.label"
                                        :value="item.label">
                                        </el-option>
                                    </el-select>
                                  </el-form-item>
                                </el-form>
                         
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="sa()">取 消</el-button>
                            <el-button type="primary" @click="sa()">确 定</el-button>
                        </span>
                        </el-dialog>
      
                         
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
        this.userset =  this.users[0].children
        })
        
        
  },
     methods: {
       deletes(user){ 
     
         user = JSON.stringify(user)
   
        this.$ajax.delete(`/api/denglu/del/${user}`)
       },
       sad(){
           this.dialogVisibles = !this.dialogVisibles
       },
       add(){
         
           this.$ajax.post('/api/denglu/register',this.user)
           this.sad()
       },
        sa(){
          
         this.dialogVisible = !this.dialogVisible  
          this.$ajax.post("/api/denglu/userstates",{"_id":JSON.parse(JSON.stringify(this.form._id)),"user":JSON.parse(JSON.stringify(this.form.user))})       
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
      
        //每次点击更改页码值
        this.currentPage = val;
        
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
 @media screen and (max-width: 789px) {
 /deep/.el-pagination .el-pagination__jump{
       display: block;
       margin-left: 0;
     }
     }
</style> 
