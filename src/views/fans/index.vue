<template>
  <div class='container-fans'>
      <el-card>
          <div slot="header">
              <my-bread>粉丝管理</my-bread>
          </div>
          <el-tabs v-model="activeName" type="card">
            <el-tab-pane label="粉丝列表" name="first">
                <div class="fans_list">
                    <div class="fans_item" v-for="item in fansList" :key="item.id.toString()">
                        <el-avatar  :size="80" :src="item.photo"></el-avatar>
                        <p>{{item.name}}</p>
                        <el-button>+关注</el-button>
                    </div>
                </div>
                <!-- 分页 -->
          <el-pagination
            background
            layout="prev, pager, next"
            :total="total"
            :page-size="fansInfo.per_page"
            :page-count="fansInfo.page"
            @current-change="pager">
          </el-pagination>
            </el-tab-pane>
            <el-tab-pane label="粉丝图像" name="second">
            <div ref="main" style="width: 600px;height:400px;"></div>
            </el-tab-pane>
          </el-tabs>

      </el-card>
  </div>
</template>

<script>
import imageItem from '../../assets/avatar.jpg'
import Echarts from 'echarts'
export default {
  data () {
    return {
      activeName: 'first',
      imageItem,
      fansInfo: {
        page: 1,
        per_page: 21
      },
      fansList: [],
      // 分页需要的总条数
      total: 0

    }
  },
  async created () {
    this.getfans()
  },
  methods: {
    // 分页的函数
    pager (newPage) {
      this.fansInfo.page = newPage
      this.getfans()
    },
    // 获取粉丝列表
    async getfans () {
      const { data: { data } } = await this.$http.get('followers', { params: this.fansInfo })
      this.fansList = data.results
      this.total = data.total_count
    }
  },
  mounted () {
    const myecharts = Echarts.init(this.$refs.main)
    const option = {
      color: ['#3398DB'],
      tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
          type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: '直接访问',
          type: 'bar',
          barWidth: '60%',
          data: [10, 52, 200, 334, 390, 330, 220]
        }
      ]
    }
    myecharts.setOption(option)
  }
}
</script>

<style scoped lang='less'>
.fans_list{
    margin-bottom: 20px;
    .fans_item{
        width: 130px;
        height: 190px;
        border: 1px dashed #ccc;
        display: inline-block;
        margin-right: 10px;
        margin-top: 20px;
        text-align: center;
        padding-top: 20px;
    }
}
</style>
