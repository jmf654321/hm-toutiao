<template>
  <div class='container-image'>
      <el-card>
          <div slot="header">
              <my-bread>素材管理</my-bread>
          </div>
          <div class="btn-box">
              <el-radio-group v-model="reqParams.collect" size="small" @change="toggleList">
                <el-radio-button :label="false">全部</el-radio-button>
                <el-radio-button :label="true">收藏</el-radio-button>
              </el-radio-group>
              <!-- 绿色按钮 -->
              <el-button @click="dialogVisible=true" style="float:right" type="success" size="small">添加素材</el-button>
              <!-- 存放图片 -->
              <div class="image_list">
                  <div class="image_item" v-for="item in images" :key="item.id">
                      <img :src="item.url" alt="">
                      <div class="footer" v-if="!reqParams.collect">
                          <span @click="toggleStatus(item)" class="el-icon-star-off" :class="{red:item.is_collected}"></span>
                          <span @click="delImage(item.id)" class="el-icon-delete"></span>
                      </div>
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
          </div>
      </el-card>
      <!-- 上传素材 -->
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="300px">
        <span>
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
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </span>
      </el-dialog>
  </div>
</template>

<script>
import local from '@/untils/local'
export default {
  data () {
    return {
      reqParams: {
        // true是收藏  false是全部
        collect: false,
        page: 1,
        per_page: 10
      },
      images: [],
      total: 0,
      // 是否弹出素材框
      dialogVisible: false,
      // 上传图片的路径
      imageUrl: null,
      // 上传图片设置请求头
      headers: {
        Authorization: `Bearer ${local.getUser().token}`
      }
    }
  },
  created () {
    this.getImages()
  },
  methods: {
    async getImages () {
      const { data: { data } } = await this.$http.get('user/images', { params: this.reqParams })
      this.images = data.results
      this.total = data.total_count
    },
    // 分页功能
    pager (newPage) {
      this.reqParams.page = newPage
      this.getImages()
    },
    toggleList () {
      this.reqParams.page = 1
      this.getImages()
    },
    // 添加收藏 取消收藏
    async toggleStatus (item) {
      const { data: { data } } = await this.$http.put(`user/images/${item.id}`,
        { collect: !item.is_collected })
      item.is_collected = data.collect
      this.$message.success((data.collect ? '添加收藏' : '取消收藏') + '成功')
    },
    // 删除素材
    delImage (id) {
      this.$confirm('此操作将永久删除该图片, 是否继续?', '温馨提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        await this.$http.delete(`user/images/${id}`)
        this.$message.success('删除图片成功')
        this.getImages()
      }).catch(() => {})
    },
    // 添加素材
    handelImage (res) {
      // res就是想响应体 不同于axios请求返回值
      this.imageUrl = res.data.url
      this.$message.success('素材上传成功')
      window.setTimeout(() => {
        this.dialogVisible = false
        this.getImages()
      }, 2000)
    }

  }
}
</script>

<style scoped lang='less'>
 .btn-box{
     .image_item{
         margin-top: 20px;
         width: 180px;
         height: 150px;
         position: relative;
         display: inline-block;
         margin-right: 20px;
         margin-bottom: 20px;
         img{
             width: 100%;
             height: 100%;
             vertical-align: middle
         }
         .footer{
             width: 100%;
             height: 30px;
             line-height: 30px;
             background-color: rgba(0,0,0,0.2);
             text-align: center;
             position: absolute;
             left: 0;
             bottom: 0;
             span{
                 color: #fff;
                 margin-right: 30px;
                 &.red{
                     color: red;
                 }
             }
         }
     }
 }
 //上传

</style>
