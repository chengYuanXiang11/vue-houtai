 
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
export default validatePassuuser