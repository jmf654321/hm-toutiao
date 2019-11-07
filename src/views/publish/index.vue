<template>
  <div class='container-publish'>
      <el-card>
          <div slot="header">
              <my-bread>{{this.$route.query.id?'修改':'发布'}}文章</my-bread>
          </div>
          <el-form label-width="120px">
              <el-form-item label="标题: ">
                  <el-input v-model="articleFrom.title" style="width:400px"></el-input>
              </el-form-item>
              <el-form-item label="内容: ">
                <quill-editor v-model="articleFrom.content"
                   :options="editorOption">
                </quill-editor>
              </el-form-item>
              <el-form-item label="封面: ">
                  <el-radio-group v-model="articleFrom.cover.type">
                    <el-radio :label="1">单图</el-radio>
                    <el-radio :label="3">三图</el-radio>
                    <el-radio :label="0">无图</el-radio>
                    <el-radio :label="-1">自动</el-radio>
                  </el-radio-group>
                  <div v-if="articleFrom.cover.type ==1">
                    <my-image v-model="articleFrom.cover.images[0]"></my-image>
                  </div>
                  <div v-if="articleFrom.cover.type ==3">
                    <my-image v-for="i in 3" :key="i" v-model="articleFrom.cover.images[i-1]"></my-image>
                  </div>
              </el-form-item>
              <el-form-item label="频道: ">
                  <my-channel v-model="articleFrom.channel_id"></my-channel>
              </el-form-item>
              <el-form-item v-if="$route.query.id">
                  <el-button type="primary" @click="update(false)">修改</el-button>
                  <el-button @click="update(true)">存入草稿</el-button>
              </el-form-item>
              <el-form-item v-else>
                  <el-button type="primary" @click="create(false)">发布</el-button>
                  <el-button @click="create(true)">存入草稿</el-button>
              </el-form-item>
          </el-form>
      </el-card>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: { quillEditor },
  data () {
    return {
      articleFrom: {
        title: null,
        // 封面格式
        cover: {
          type: 1,
          images: []
        },
        channel_id: null,
        // 富文本内容
        content: null
      },
      editorOption: {
        placeholder: '',
        modules: {
          toolbar: [
            // 加粗 斜体 下划线
            ['bold', 'italic', 'underline', 'strike'],
            // 引号 标签
            ['blockquote', 'code-block'],
            // h1 h2
            [{ 'header': 1 }, { 'header': 2 }],
            // 无序 有序
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            // 向左右缩进
            [{ 'indent': '-1' }, { 'indent': '+1' }],
            ['image']

          ]
        }
      }
    }
  },
  methods: {
    // 新建文章成功
    async create (draft) {
      await this.$http.post(`articles?draft=${draft}`, this.articleFrom)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    // 修改文章成功
    async update (draft) {
      await this.$http.put(`articles/${this.articleFrom.id}?draft=${draft}`, this.articleFrom)
      this.$message.success(draft ? '存入草稿成功' : '发表成功')
      this.$router.push('/article')
    },
    // 根据id获取文章
    async getArticle (id) {
      const { data: { data } } = await this.$http.get('articles/' + id)
      this.articleFrom = data
    },
    // 切换发布和编辑状态
    toggleArticleStatus () {
      const articleId = this.$route.query.id
      if (articleId) {
        this.getArticle(articleId)
      } else {
        this.articleFrom = {
          title: null,
          // 封面格式
          cover: {
            type: 1,
            images: []
          },
          channel_id: null,
          // 富文本内容
          content: null
        }
      }
    }
  },
  created () {
    // const articleId = this.$route.query.id
    // if (articleId) {
    //   this.getArticle(articleId)
    // }
    this.toggleArticleStatus()
  },
  watch: {
    '$route.query.id': function () {
      this.toggleArticleStatus()
    }
  }
}
</script>

<style scoped lang='less'></style>
