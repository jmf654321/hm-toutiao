<template>
  <div class='container_article'>
   <el-card>
     <div slot="header" class="clearfix">
    <my-bread>内容管理</my-bread>
     </div>
    <el-form>
    <el-form-item label="状态 ：">
    <el-radio-group v-model="reqParams.status">
      <el-radio label="">全部</el-radio>
      <el-radio label="0">草稿</el-radio>
      <el-radio label="1">待审核</el-radio>
      <el-radio label="2">审核通过</el-radio>
      <el-radio label="3">审核失败</el-radio>
      <el-radio label="4">已失败</el-radio>
    </el-radio-group>
  </el-form-item>
  <el-form-item label="频道 ：">
    <el-select v-model="reqParams.channel_id">
      <el-option
      v-for="item in reqParams.option_list"
      :key="item.value"
      :label="item.label"
      :value="item.value"

      ></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="日期 ：">
    <el-date-picker
      v-model="reqParams.datearr"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期">
    </el-date-picker>
  </el-form-item>
  <el-form-item>
          <el-button type="primary">筛选</el-button>
  </el-form-item>
  </el-form>
  <!-- </div> -->
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
        datearr: [],
        option_list: [{ value: 1, label: 'java' }, { value: 2, label: '前端' }]
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
