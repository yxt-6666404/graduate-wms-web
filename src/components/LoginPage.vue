<template>
  <div class="loginBody">
    <div class="loginDiv">
      <div class="login-content">
        <h1 class="login-title">用户登录</h1>
        <el-form :model="loginForm" label-width="100px"
                 :rules="rules" ref="loginForm">
          <el-form-item label="账号" prop="shopId">
            <el-input style="width: 250px" type="text" v-model="loginForm.id"
                      autocomplete="off" size="small"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="passWord">
            <el-input style="width: 250px" type="password" v-model="loginForm.passWord"
                      show-password autocomplete="off" size="small" @keyup.enter.native="confirm"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="confirm" :disabled="confirm_disabled" style="margin-left: 90px;">确 定</el-button>
          </el-form-item>
          <el-form-item>
            <el-radio-group v-model="loginForm.radio" size="large">
              <el-radio label="customer">普通用户</el-radio>
              <el-radio label="craftsman">手工艺人</el-radio>
              <el-radio label="shop">商家</el-radio>
              <el-radio label="supplier">原材料供应商</el-radio>
              <el-radio label="admin">平台管理员</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "LoginPage",
  data(){
    return{
      confirm_disabled:false,
      loginForm:{
        id:'',
        passWord:'',
        radio:''
      },
      rules:{
        id: [
          { required: true, message: '请输入账号', trigger: 'blur' }
        ],
        passWord: [
          { required: true, message: '请输密码', trigger: 'blur' }
        ],
      }
    }
  },
  methods:{

    confirm(){
      if(this.loginForm.radio !==''){
        this.$refs.loginForm.validate((valid) => {
        if (valid) {
          console.log(this.loginForm);
          let role = this.loginForm.radio;
          if(role=="admin"){
            let data = {adminId:this.loginForm.id,password:this.loginForm.passWord}
            console.log(data);
            this.$axios.post(this.$httpUrl+'/admin/login',data).then(res=>res.data).then(res=>{
                  console.log(res)
                  if(res.code==200){
                    alert("登录成功！")
                    //存储
                    sessionStorage.setItem("CurUser",JSON.stringify(res.data.user));
                    // sessionStorage.setItem("role",'SP');
                    console.log(res.data.menu)
                    this.$store.commit("setMenu",res.data.menu);
                    //跳转到主页
                    this.$router.replace({
                      path:'/IndexPage',
                    });
                  }
                      })
                    }
                    if(role=="customer"){
            let data = {customerId:this.loginForm.id,password:this.loginForm.passWord}
            console.log(data);
            this.$axios.post(this.$httpUrl+'/customers/login',data).then(res=>res.data).then(res=>{
                  console.log(res)
                  if(res.code==200){
                    alert("登录成功！")
                    //存储
                    sessionStorage.setItem("CurUser",JSON.stringify(res.data.user))
                    console.log(res.data.menu)
                    this.$store.commit("setMenu",res.data.menu);
                    //跳转到主页
                    this.$router.replace({
                      path:'/IndexPage',
                    });
                  }})}
                  if(role=="craftsman"){
            let data = {craftsmanId:this.loginForm.id,password:this.loginForm.passWord}
            console.log(data);
            this.$axios.post(this.$httpUrl+'/craftsmen/login',data).then(res=>res.data).then(res=>{
                  console.log(res)
                  if(res.code==200){
                    alert("登录成功！")
                    //存储
                    sessionStorage.setItem("CurUser",JSON.stringify(res.data.user))
                    console.log(res.data.menu)
                    this.$store.commit("setMenu",res.data.menu);
                    //跳转到主页
                    this.$router.replace({
                      path:'/IndexPage',
                    });
                  }})}
                  if(role=="supplier"){
            let data = {supplierId:this.loginForm.id,password:this.loginForm.passWord}
            console.log(data);
            this.$axios.post(this.$httpUrl+'/suppliers/login',data).then(res=>res.data).then(res=>{
                  console.log(res)
                  if(res.code==200){
                    alert("登录成功！")
                    //存储
                    sessionStorage.setItem("CurUser",JSON.stringify(res.data.user))
                    sessionStorage.setItem("role","SP");
                    console.log(res.data.menu)
                    this.$store.commit("setMenu",res.data.menu);
                    //跳转到主页
                    this.$router.replace({
                      path:'/IndexPage',
                    });
                  }})}
                  if(role=="shop"){
            let data = {shopId:this.loginForm.id,password:this.loginForm.passWord}
            console.log(data);
            this.$axios.post(this.$httpUrl+'/shops/login',data).then(res=>res.data).then(res=>{
                  console.log(res)
                  if(res.code==200){
                    alert("登录成功！")
                    //存储
                    sessionStorage.setItem("CurUser",JSON.stringify(res.data.user))
                    console.log(res.data.menu)
                    this.$store.commit("setMenu",res.data.menu);
                    //跳转到主页
                    this.$router.replace({
                      path:'/IndexPage',
                    });
                  }})}

              }
            })
            
        }
        else{
          alert("请选择角色!")
        }

      }
      }
    }
</script>

<style scoped>
.loginBody {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f0ffd5;
}
.loginDiv {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -250px;
  width: 470px;
  height: 380px;
  background: #fff;
  border-radius: 5%;

}
.login-title {
  margin: 20px 0;
  text-align: center;
}
.login-content {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 25px;
  left: 25px;
}
</style>
