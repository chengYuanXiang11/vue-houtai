<template>
  <div class="wares h100">
   <el-row class="h100" >
     <el-col :span="4" :offset="1" :xs="{span:0,offset:0}" style="height: 800px;">
       <!-- :props="category" -->
       <el-tree :data="defaultProps" :default-expand-all="true"   @node-click="handleNodeClick" class="h100 eltree"></el-tree>
       
     </el-col>
        <el-col :span="14" :xs="{span:19}" class="mar10">
           <el-input v-model="input" placeholder="请输入内容"  @input="addstore()"></el-input>
         </el-col>
  
       
               <el-col :span="5"  :xs="{span:5}" >
               <el-button type="primary" @click="save()">添加商品</el-button>
               </el-col>
     <el-col :span="18" :xs="{span:24,offset:0}">
       <el-col class="boo">
      
            <el-dialog 
                        title="提示"
                        class="zhong"
                        :visible.sync="dialogVisible"

                        :append-to-body="true"
                        :before-close="handleClose">
                             
                                <el-form  v-model="add">       
                                   <el-form-item label="商品分类">
                                     <el-select v-model="add.category" placeholder="请选择">
                                      <el-option
                                        v-for="item in options"
                                        :key="item.category"
                                        :label="item.category"
                                         :value="item.category"
                                      >                                                       
                                      </el-option>
                                    </el-select>
                                    
                                  </el-form-item>
                                  
                                  <el-form-item label="商品名称">
                                    <el-input v-model="add.name">
                                    </el-input>
                                  </el-form-item>
                                  <el-form-item label="商品介绍">
                                    <el-input v-model="add.content">
                                    </el-input>
                                  </el-form-item>                    
                                <el-form-item label="商品价格">
                                    <el-input v-model="add.price" type="number">
                                    </el-input>
                                  </el-form-item>
                                   <el-form-item label="商品尺寸" empty-text="请以,隔开">
                                    <el-input v-model="add.zie">
                                    </el-input>
                                  </el-form-item>
                                   <el-form-item label="商品颜色">
                                    <el-input v-model="add.color">
                                    </el-input>
                                  </el-form-item>
                                    </el-form>
                        <span slot="footer" class="dialog-footer">
                            <el-button @click="save()">取 消</el-button>
                            <el-button type="primary" @click="ad()">确 定</el-button>
                        </span>
                        </el-dialog>
                        
           
                </el-col>
       <el-col :span="24">
           <el-table
            :data="tableData"
            style="width: 100%"
            :stripe="true"
           v-cloak
            @filter-change="handleFilterChange"
            :fit="true">
          
              
           
            <el-table-column type="expand"   min-width="50%">
              <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand" >
                  <el-form-item label="商品名称">
                    <span>{{ props.row.name }}</span>
                  </el-form-item>
                  <el-form-item label="商品分类">
                    <span>{{ props.row.category }}</span>
                  </el-form-item>
                  <el-form-item label="商品介绍">
                    <span>{{ props.row.content }}</span>
                  </el-form-item>
                  <el-form-item label="店铺尺寸">
                    <span>{{ props.row.zie }}</span>
                  </el-form-item>
                  <el-form-item label="商品颜色">
                    <span>{{ props.row.color }}</span>
                  </el-form-item>
                  <el-form-item label="商品价格">
                    <span>{{ props.row.price }}</span>
                  </el-form-item>
                  <el-form-item label="商品描述" >
                    <span>{{ props.row.desc }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            
           
            <el-table-column
              label="名称"  prop="name"
             show-overflow-tooltip
               min-width="25"
             >
            </el-table-column>
        
            <el-table-column
              min-width="30"
              label="分类"
              prop="category"
              :filters="optionsd"
              column-key="category"
              >
            </el-table-column>
            <el-table-column
              label="商品描述"
              min-width="50"
              v-if="key"
              show-overflow-tooltip
              prop="content">
            </el-table-column>
            <el-table-column
              min-width="30"        
              label="修改"
          
              show-overflow-tooltip>
                <template slot-scope="scope">
            <el-button type="primary"  icon="el-icon-search"
                     @click="sav(scope.row)"></el-button>
                     </template>
                   <el-dialog 
                        title="修改"
                      
                        :visible.sync="dialogVisibles"
                        :append-to-body="true"
                        :before-close="handleClose">
                             
                                <el-form  v-model="form">
                                  <el-form-item label="商品名称">
                                    <el-input v-model="form.name">
                                    </el-input>
                                  </el-form-item>
                                  <el-form-item label="商品介绍">                                  
                                      <el-input
                                        type="textarea"
                                        v-model="form.content"
                                        :rows="8"
                                        placeholder="请输入内容"
                                       >
                                      </el-input>
                                   <el-form-item label="商品价格">
                                    <el-input v-model="form.price">
                                    </el-input>
                                  </el-form-item>
                                    <el-form-item label="商品尺寸">
                                    <el-input v-model="form.zie">
                                    </el-input>
                                  </el-form-item>
                                  <el-form-item label="商品颜色">
                                    <el-input v-model="form.color">
                                    </el-input>
                                  </el-form-item>
                                  </el-form-item>
                                </el-form>
                         
                        <span slot="footer" class="dialog-footer">
                            <el-button >取 消</el-button>
                            <el-button type="primary" @click="xiugai()">确 定</el-button>
                        </span>
                        </el-dialog>
                    </el-table-column>
                             <el-table-column
                              label="删除"
                           min-width="30"                             
                              >
                                <template slot-scope="scope">
                            <el-button type="primary"  icon="el-icon-delete-solid"
                                  @click="del(scope.row)" ></el-button> 
                            
                            
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
   </el-row>
  </div>
</template>
<script> 
// import ZNav from '../components/ZNav'

export default {
 
  name: 'notice', 
 inject:['reload'],  
   data() {
      return {
         screenWidth: document.documentElement.clientWidth,//屏幕宽度
        a:0,
        key:true,
        defaultProps:[],//树形分类
          options: [],//商品分类
           optionsd: [],
        value: '', 
         dialogVisible: false,
            dialogVisibles: false,
         pagesizes:[5,10,15,20],
         total:null,//总数据条数
        dis:0,//跳过数据s
        pagesize:10,//  每页的数据数量  
        currentPage:1, //当前页码
        model:{},//搜索
        tableData:null,//总数据
        add:{},//添加数据
        form:{},
        input:'',
        a1:0,//计算商品分类信息总数
        timer:null
      };
    },
   mounted () {
        const that = this
        window.onresize = () => {
            return (() => {
                window.screenWidth = document.body.clientWidth
                that.screenWidth = window.screenWidth
            
            })()
        }
    },
     watch: {
            screenWidth (val) {
                if (!this.timer) {
                    this.screenWidth = val
                    this.timer = true
                    let that = this
                    setTimeout(function () {
                        // that.screenWidth = that.$store.state.canvasWidth
                        if(that.screenWidth<420){
                        
                          that.key = false
                         
                        }else{
                          that.key = true
                        }
                     
                        that.timer = false
                    }, 400)
                }
            }
        },
      filters:{
      
           cap:function(val){
            return this.tableData.filter((blog)=>{
              
              return blog.name.match(this.input);
            
            })
           
          }
          },
    created(){
       
        if(this.screenWidth<400){
           this.key = false
        }
        //所有商品数据
      
        this.$ajax.post('/api/in/df',{ "username":this.$store.state.username}).then((res)=>{
          this.$store.state.waresuser = res.data
       
          this.total = this.$store.state.waresuser.length
       
        this.handleSizeChange(10)
        })
        //商品分类
          this.$ajax.post('/api/in/d1').then((res)=>{
            this.options = res.data
            this.defaultProps.push({label:'顶级'})
            this.defaultProps[0].children = []
         
            for (const iterator of this.options) {
                this.defaultProps[0].children.push({label:iterator.category})
              this.optionsd.push({text:iterator.category,value:iterator.category})
    
            }
        })
        },
    methods: {
       indexMethod(index) {
        return index ;
      },
      //树状
       handleNodeClick(data) {
        
          if(data.label == "顶级"){
            this.$ajax.post('/api/in/df',{ "username":this.$store.state.username}).then((res)=>{
            
         this.$store.state.waresuser = res.data
           this.total = this.$store.state.waresuser.length
           this.handleSizeChange(10)
        })
        }else{
         
        this.$ajax.post("/api/in/filterHandler",{
        category: JSON.parse(JSON.stringify(data)),
        username:this.$store.state.username
        }).then((res)=>{ 
         
        
          this.$store.state.waresuser = res.data
           this.total = this.$store.state.waresuser.length
                this.handleSizeChange(10)
          }
          )}
      },
      handleFilterChange(filters) {
      
        if(filters.category.length == 0){
          this.$ajax.post('/api/in/df',{ "username":this.$store.state.username}).then((res)=>{
        this.$store.state.waresuser = res.data
           this.total = this.$store.state.waresuser.length
                this.handleSizeChange(10)
           
        })
        }else{
              this.$ajax.post("/api/in/filterHandler",{
        category: JSON.parse(JSON.stringify(filters)),
        username:this.$store.state.username
        }).then((res)=>{ 
           this.$store.state.waresuser = res.data
           this.total = this.$store.state.waresuser.length
                this.handleSizeChange(10)
          }
          ).catch(err=>{
            console.log(err)
          })
        }
     
    },
      //搜索
      addstore(){
       
        this.$ajax.post('/api/in/sou',{"keyword":this.input,"username":this.$store.state.username}).then((res)=>{
           this.$store.state.waresuser = res.data
               this.total = this.$store.state.waresuser.length
                this.handleSizeChange(10)
        })
      },
      del(id){
     
        const d =JSON.parse(JSON.stringify(id) ) //对象转成字符串json字符串
       
    
        // data: JSON.parse(d)}
          // this.$ajax.delete('/api/in/del',{data:JSON.parse(d)})
          //delete 用{data:params}包了之后传的参是json字符串
         this.$ajax.delete(`/api/in/del/${d._id}`).then((res)=>{
        
         })
       
      },
      //修改数据
      xiugai(){
         this.dialogVisibles = !this.dialogVisibles 
         
         this.$ajax.put('/api/in/test',this.form).then((res)=>{
            // this.$router.replace({
            //     path: '/kong',
            //     query: {
            //       t: Date.now()
            //     }
            //   })
         })
      },
      //控制提示显示隐藏
      sav(user){
         this.form = user
         
             this.dialogVisibles = !this.dialogVisibles
          
      },
      //添加商品
      ad(){
        
         this.$ajax.post('/api/denglu/profile',localStorage.token).then((res)=>{
       
           this.add.username = res.data.username
         }).then(()=>{
              this.$ajax.post('/api/in/add',this.add).then((res)=>{
             
              this.add = {}
              this.save()
            //  this.$router.replace({
            //     path: '/kong',
            //     query: {
            //       t: Date.now()
            //     }
            //   })
            })
         })
         
      },
      //添加弹窗
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
     save(){
       
             this.dialogVisible = !this.dialogVisible
         },
     handleSizeChange(val) {
        //每次点击更改条数值
        this.pagesize = val;
        this.currentPage = 1;
        this.dis = 0;
        
       this.$ajax.post('/api/in/fen',{
                 params:{      
                    data:JSON.parse(JSON.stringify(this.$store.state.waresuser)),    
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
       this.$ajax.post('/api/in/fen',{
                 params:{      
                    data:JSON.parse(JSON.stringify(this.$store.state.waresuser)),    
                     dis:this.dis,        
                     pagesize:this.pagesize,
                     currentPage:this.currentPage
                 }
             }).then((res)=>{
             
            
               this.tableData = res.data
               
             })
      },
       toggleSelection(rows) {
        if (rows) {
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        } else {
          this.$refs.multipleTable.clearSelection();
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
      
    }
}
</script>
<style lang="less" scoped>
/deep/ .el-table__column-filter-trigger{

  height: 31px;
}
/deep/ .el-tree-node__label {
    font-size: 21px!important;
}
/deep/ .el-table__row{
     color: #2a2ddb;
    font-size: 16px;
    font-family: unset;
}
/deep/ .el-form-item__label{
      color:#cd0f0fb0;
    font-size: 13px;
}
/deep/ .el-form-item__content{
    color: orange;
    font-size: 13px;
}
/deep/ .el-tree-node__label{
      color: #090909;
    font-family: cursive;
}
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
 .el-table__row  .cell{
    overflow: hidden;
  text-overflow:ellipsis;
  white-space: nowrap;
    }
  .eltree{
    margin-right: 10px;
  }
  /deep/ .el-table__header-wrapper /deep/ tr{
       color: orangered;
    font-size: 21px;
    font-family: serif;
  }
 .zhong  /deep/ .el-dialog{
        width: 30%;
      }
    @media screen and (max-width: 789px) {
      /deep/ .el-dialog__wrapper div{
        width: 90%;
      }

      .boo{
        margin-bottom:10px
      }
     /deep/.el-pagination .el-pagination__jump{
       display: block;
       margin-left: 0;
     }
     /deep/ .el-table__body-wrapper{
       overflow: hidden;
     }
     .zhong  /deep/ .el-dialog{
        width: 90%;
      }
}
   /deep/.el-table  /deep/td{
    border:1px solid #ebeef5;
  }
  .cell{max-height: 23px !important;overflow:hidden;} 

</style>