<template>
  <el-select :value="value" @change="fn" placeholder="请选择" clearable>
    <el-option
    v-for="item in channelOptions"
    :key="item.id"
    :label="item.name"
    :value="item.id"
    ></el-option>
  </el-select>
</template>

<script>
export default {
  props: ['value'],
  data () {
    return {
    //   value: null,
      channelOptions: []
    }
  },
  created () {
    this.getChannelOptions()
  },
  methods: {
    //   值改变时触发函数
    fn (channelId) {
      if (channelId === '') channelId = null
      this.$emit('input', channelId)
    },
    // 获取频道选项
    async getChannelOptions () {
      const { data: { data } } = await this.$http.get('channels')
      this.channelOptions = data.channels
    }
  }

}
</script>

<style scoped lang='less'></style>
