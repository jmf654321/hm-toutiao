<template>
   <div class="box">

<el-card class="box-card">
    <img src="../../assets/logo_index.png" alt="">
  <div class="text item">
<el-form ref="loginForm" :model="loginForm">
  <el-form-item >
    <el-input v-model="loginForm.name" placeholder="请输入姓名"></el-input>
  </el-form-item>
  <el-form-item >
    <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:235px;margin-right:10px"></el-input>
     <el-button>输入验证码</el-button>
  </el-form-item>
   <el-checkbox :value="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
   <el-form-item>
    <el-button type="primary" style="width:100%;margin-top:20px">立即创建</el-button>

  </el-form-item>
</el-form>

  </div>

</el-card>
   </div>
</template>

<script>
export default {
  data () {
    return {
      loginForm: {
        name: '',
        code: ''
      },
      checked: true

    }
  }
}
</script>

<style scoped lang="less">
.box{
    width: 100%;
    height: 100%;
    background: url("../../assets/login_bg.jpg") no-repeat center / cover;
    position: absolute;
    left: 0;
    top: 0;
}
.el-card{
    width: 400px;
    height: 340px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    img{
    display: block;
      width: 200px;
      position: relative;
      margin-bottom: 20px;
      left: 50%;
      transform: translate(-50%)
    }

}
</style>
