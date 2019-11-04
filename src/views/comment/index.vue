<template>
  <div class='container-comment'>
      <el-card>
          <div slot="header">
              <my-bread>评论管理</my-bread>
          </div>
          <el-table :data="articles">
              <el-table-column label="标题" width="400" prop="title"></el-table-column>
              <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
              <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>
              <el-table-column label="状态">
                  <template slot-scope="scope">
                      <div>{{scope.row.comment_status?'正常':'关闭'}}</div>
                  </template>
              </el-table-column>
              <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="toggleStatus(scope.row.id, false)" v-if="scope.row.comment_status"  type="danger" size="small">关闭评论</el-button>
                    <el-button @click="toggleStatus(scope.row.id,true)" type="success" v-else size="small">打开评论</el-button>
                  </template>
              </el-table-column>
          </el-table>
              <!-- 分页 -->
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
      articles: [],
      reqParams: {
        response_type: 'comment',
        page: 1,
        per_page: 20
      },
      total: 0
    }
  },
  created () {
    this.getArticles()
  },
  methods: {
    pager (newPage) {
      this.reqParams.page = newPage
      this.getArticles()
    },
    async getArticles () {
      const { data: { data } } = await this.$http.get('articles', { params: this.reqParams })
      this.articles = data.results
      // 获取文章
      this.total = data.total_count
    },
    toggleStatus (id, status) {
      this.$confirm(status ? '确定要打开评论吗' : '确定要关闭评论吗，其他用户则无法进行评论', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: { data } } = await this.$http.put(`comments/status?article_id=${id}`, { allow_comment: status })
        this.$message.success(data.allow_comment ? '打开评论成功' : '关闭评论成功')
        this.getArticles()
      }).catch(() => {})
    }
  }
}
</script>

<style scoped lang='less'></style>
