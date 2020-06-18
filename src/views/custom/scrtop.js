const doc = document;
var cache = {};

export default {
  // 保存滚动条位置
  save(path) {
 
    cache[path] = document.documentElement.scrollTop || document.body.scrollTop 
 
  },
  // 重置滚动条位置
  get(){
     
    const path = this.$route.path;

    
    doc.documentElement.scrollTop  = cache[path];
    document.body.scrollTop  = cache[path];
   
        return   doc.documentElement.scrollTop
  },
  // 设置滚动条到顶部
  goTop() {
    this.$nextTick(function () {
      doc.documentElement.scrollTop = doc.body.scrollTop = 0;
    });
  }
}