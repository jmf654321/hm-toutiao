<template>
  <div class='container_article'>
   <el-card>
     <div slot="header" class="clearfix">
        <my-bread>内容管理</my-bread>
     </div>
    <el-form>
      <el-form-item label="状态 ：">
        <el-radio-group v-model="reqParams.status">
          <el-radio :label="null">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
          <el-radio :label="4">已失败</el-radio>
        </el-radio-group>
        </el-form-item>
      <el-form-item label="频道 ：">
        <!-- 频道 -->
        <!-- v-model相当于绑定了value属性 和input事件 -->
         <my-channel v-model="reqParams.channel_id"></my-channel>
      </el-form-item>
      <el-form-item label="日期 ：">
        <el-date-picker
          v-model="datearr"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeDate"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
              <el-button type="primary" @click="search">筛选</el-button>
      </el-form-item>
      </el-form>
   </el-card>

   <!-- 第二个卡片筛选结果 -->
   <el-card style="margin-top:20px">
     <div slot="header">
       <span>根据筛选条件共查询到 {{total}} 条结果</span>
     </div>
     <el-table :data="articles">
       <el-table-column label="封面">
          <template slot-scope="scope">
             <el-image
              style="width: 150px; height: 100px"
              :src="scope.row.cover.images[0]"
              fit="fill">
              <div slot="error">
             <img src="../../assets/error.gif" width="150" height="100">
            </div>
              </el-image>

          </template>
       </el-table-column>
       <el-table-column label="标题" prop="title"></el-table-column>
       <el-table-column label="状态">
         <template slot-scope="scope">
           <el-tag v-if="scope.row.status === 0" type="info">草稿</el-tag>
           <el-tag v-if="scope.row.status === 1">待审核</el-tag>
           <el-tag v-if="scope.row.status === 2" type="success">审核通过</el-tag>
           <el-tag v-if="scope.row.status === 3" type="warning">审核失败</el-tag>
           <el-tag v-if="scope.row.status === 4" type="danger">已删除</el-tag>
         </template>

       </el-table-column>
       <el-table-column label="发布时间" prop="pubdate"></el-table-column>
       <el-table-column label="操作" width="120">
         <template slot-scope="scope">
            <el-button @click="toEdit(scope.row.id)" type="primary" icon="el-icon-edit" plain circle></el-button>
            <el-button @click="del(scope.row.id)" type="danger" icon="el-icon-delete" plain circle></el-button>
         </template>
       </el-table-column>

     </el-table>
     <!-- 分页 -->
     <!-- 1显示总页数 -->
     <!-- 默认没页是10 改变 -->
     <!-- 改变默认的第几页 -->
     <!-- 点击事件 -->
      <el-pagination
        style="margin-top:20px"
        background
        layout="prev, pager, next"
        :page-size="reqParams.per_page"
        :current-page="reqParams.page"
        :total="total"
        @current-change="pager"
        >
      </el-pagination>

   </el-card>

  </div>
</template>

<script>

export default {

  data () {
    return {
      reqParams: {
        status: null,
        channel_id: null,
        page: 1,
        per_page: 20,
        begin_pubdate: null,
        end_pubdate: null

      },
      // 数组内容
      datearr: [],
      // // 下拉列表内容
      // channelOptions: [{ value: 1, label: 'java' }, { value: 2, label: '前端' }],
      // 文章筛选数据
      articles: [],
      // 文章总页数
      total: 0
    }
  },
  created () {
    // this.getChannelOptions()
    this.getArticles()
  },
  methods: {
    // // 获取频道选项
    // async getChannelOptions () {
    //   const { data: { data } } = await this.$http.get('channels')
    //   this.channelOptions = data.channels
    // },
    // 获取文章列表
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      this.total = data.total_count
    },
    pager (newpage) {
      this.reqParams.page = newpage
      this.getArticles()
    },
    // 改变日期格式
    changeDate (datearr) {
      if (datearr) {
        this.reqParams.begin_pubdate = datearr[0]
        this.reqParams.end_pubdate = datearr[1]
      } else {
        this.reqParams.begin_pubdate = null
        this.reqParams.end_pubdate = null
      }
    },
    // 筛选功能
    // 获取数据 v-model不需要获取 需要获取date数据
    search () {
      // 判断频道清除时进行设置
      // if (this.reqParams.channel_id === '') {
      //   this.reqParams.channel_id = null
      // }
      // 筛选时回到第一页
      this.reqParams.page = 1
      this.getArticles()
    },
    // 编辑携带id参数
    toEdit (id) {
      this.$router.push({ path: '/publish', query: { id } })
    },
    // 删除
    async del (id) {
      await this.$http.delete(`articles/${id}`)
      this.$message.success('文章删除成功')
      this.getArticles()
    }

  }
}
</script>

<style scoped lang='less'></style>
