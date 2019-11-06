<template>
  <div class='container-setting'>
      <el-card>
          <div slot="header">
              <my-bread>个人设置</my-bread>
          </div>
          <el-row>
              <!-- 左侧表单 -->
              <el-col :span="12">
                  <el-form label-width="120px">
                     <el-form-item label="编号：">{{userInfo.id}}</el-form-item>
                     <el-form-item label="手机号：">{{userInfo.mobile}}</el-form-item>
                     <el-form-item label="媒体名称：">
                         <el-input v-model="userInfo.name"></el-input>
                     </el-form-item>
                     <el-form-item label="媒体介绍：">
                         <el-input type="textarea" :rows="3" v-model="userInfo.intro"></el-input>
                     </el-form-item>
                     <el-form-item label="邮箱：">
                         <el-input v-model="userInfo.email"></el-input>
                     </el-form-item>
                     <el-form-item>
                         <el-button type="primary" @click="saveInfo">保存设置</el-button>
                     </el-form-item>
                  </el-form>
              </el-col>
              <!-- 上传图片 -->
              <el-col :span="12" style="text-align:center">
                  <el-upload
                  :http-request="updatePhoto"
                    class="avatar-uploader"
                    action=""
                    :show-file-list="false">
                    <img v-if="userInfo.photo" :src="userInfo.photo" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                  <p>修改头像</p>
              </el-col>
          </el-row>
      </el-card>
  </div>
</template>

<script>
import local from '@/untils/local'
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      userInfo: {
        name: '',
        intro: '',
        email: '',
        photo: ''
      }
    }
  },
  created () {
    this.getuserInfo()
  },
  methods: {
    // 获取用户资料
    async getuserInfo () {
      const { data: { data } } = await this.$http.get('user/profile')
      this.userInfo = data
    },
    // 修改用户资料
    async saveInfo () {
      const { name, intro, email } = this.userInfo
      await this.$http.patch('user/profile', {
        name, intro, email
      })
      this.$message.success('保存成功')
      // 改home
      eventBus.$emit('toggleName', name)
      // 改本地
      const user = local.getUser()
      user.name = name
      local.setUser(user)
    },
    // 修改头像图片
    async updatePhoto (res) {
      const { file } = res
      const formDate = new FormData()
      formDate.append('photo', file)
      const { data: { data } } = await this.$http.patch('user/photo', formDate)
      this.$message.success('图片修改成功')
      this.userInfo.photo = data.photo
      // 改home
      eventBus.$emit('togglePhoto', data.photo)
      // 改本地
      const user = local.getUser()
      user.photo = data.photo
      local.setUser(user)
    }
  }
}
</script>

<style scoped lang='less'></style>
