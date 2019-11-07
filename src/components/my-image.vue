<template>
  <div class='my-image'>
      <div class="btn_box" @click="open">
          <img :src="value || btnImage" alt="">
      </div>
      <!-- 对话框 -->
      <el-dialog
        :visible.sync="dialogVisible"
        width="750px">
        <el-tabs v-model="activeName" type="card">
          <el-tab-pane label="素材库" name="image">
              <el-radio-group v-model="reqParams.collect" size="small" @change="toggleList">
                <el-radio-button :label="false">全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
              </el-radio-group>
              <!-- 图片列表 -->
              <div class="image_list">
                  <div class="image_item" :class="{selected:selectImageUrl == item.url}" @click="selectImage(item.url)" v-for="item in images" :key="item.id">
                      <img :src="item.url" alt="">
                  </div>
              </div>
              <!-- 分页 -->
              <el-pagination
                background
                layout="prev, pager, next"
                :total="total"
                :page-size="reqParams.per_page"
                :page-count="reqParams.page"
                @current-change="pager">
              </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="上传图片" name="uplode">
            <!-- 上传插件 -->
            <!-- action 是上传图片的接口地址-->
            <!-- 注意on-success是属性不是时间需要在前面加上: -->
            <el-upload
              class="avatar-uploader"
              action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
              :headers="headers"
              name="image"
              :on-success="handelImage"
              :show-file-list="false">
              <img v-if="uploadImageUrl" :src="uploadImageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="configImage">确 定</el-button>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import btnimage from '../assets/default.png'
import local from '@/untils/local'
export default {
  props: ['value'],
  data () {
    return {
      dialogVisible: false,
      // tab栏切换
      activeName: 'image',
      reqParams: {
        // true是收藏  false是全部
        collect: false,
        page: 1,
        per_page: 8
      },
      // 总条数
      total: 0,
      // 图片列表所依赖的数据
      images: [],
      // 默认图片
      btnImage: btnimage,
      // 被选中的数据
      selectImageUrl: '',
      // 上传图片的路径
      uploadImageUrl: null,
      // 上传图片设置请求头
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  methods: {
    // 给选中的图片唯一标识
    selectImage (url) {
      this.selectImageUrl = url
    },
    open () {
      this.dialogVisible = true
      this.getImages()
    },
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    // 切换素材和上传图片
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 添加素材
    handelImage (res) {
      // res就是想响应体 不同于axios请求返回值
      this.uploadImageUrl = res.data.url
      this.$message.success('上传成功')
    },
    // 判断是否选择图片 平且进行渲染
    configImage () {
      if (this.activeName === 'image') {
        if (!this.selectImageUrl) {
          return this.$message.warning('请选择一张图片')
        }
        this.$emit('input', this.selectImageUrl)
        this.btnImage = this.selectImageUrl
        this.dialogVisible = false
      } else {
        if (!this.uploadImageUrl) {
          return this.$message.warning('请上传一张图片')
        }
        this.$emit('input', this.uploadImageUrl)
        this.btnImage = this.uploadImageUrl
        this.dialogVisible = false
      }
    }
  }
}
</script>

<style scoped lang='less'>
.my-image{
    display: inline-block;
    margin-right: 20px
}
.btn_box{
    width: 150px;
    height: 150px;
    border: 1px dashed #ccc;
    img{
        width: 100%;
        height: 100%;
    }
}
.dialog-footer{
    display: block;
    text-align: center
}
//图片样式列表
.image_list{
.image_item{
         margin-top: 20px;
         width: 150px;
         height: 120px;
         position: relative;
         display: inline-block;
         margin-right: 20px;
         margin-bottom: 20px;
         img{
             width: 100%;
             height: 100%;
             vertical-align: middle
         }
         &.selected::after{
             content: '';
             position: absolute;
             top: 0;
             left: 0;
             width: 100%;
             height: 100%;
             background: rgba(0, 0, 0, 0.3) url(../assets/selected.png) no-repeat center / 50px;

         }
     }
}
</style>
