<template>
   <div class="box">

<el-card class="box-card">
    <img src="../../assets/logo_index.png" alt="">
  <div class="text item">
<el-form status-icon ref="loginForm" :model="loginForm" :rules="loginrules">
  <el-form-item prop="mobile">
    <el-input v-model="loginForm.mobile" placeholder="请输入手机号"></el-input>
  </el-form-item>
  <el-form-item prop="code">
    <el-input v-model="loginForm.code" placeholder="请输入验证码" style="width:235px;margin-right:10px"></el-input>
     <el-button>发送验证码</el-button>
     </el-form-item>
   <el-checkbox :value="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
   <el-form-item>
    <el-button @click="login" type="primary" style="width:100%;margin-top:20px">立即登录</el-button>

  </el-form-item>
</el-form>

  </div>

</el-card>
   </div>
</template>

<script>
import local from '@/untils/local'
export default {
  data () {
    var checkMobile = (rule, value, callback) => {
      if (/^1[3-9]\d{9}$/.test(value)) {
        callback()
      } else {
        callback(new Error('手机格式不正确'))
      }
    }
    return {
      loginForm: {
        mobile: '13313313313',
        code: '246810'
      },
      checked: true,
      loginrules: {
        mobile: [
          { validator: checkMobile, trigger: 'blur' },
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          {
            len: 6, message: '验证码不正确', trigger: 'blur'
          }
        ]
      }

    }
  },
  methods: {
    login () {
      this.$refs['loginForm'].validate((valid) => {
        if (valid) {
          this.$http.post('/authorizations', this.loginForm).then((res) => {
            local.setUser(res.data.data)
            this.$router.push('/')
          }).catch(() => {
            this.$message.error('用户名或密码错误')
          })
        }
      })
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
