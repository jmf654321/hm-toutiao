<template>
  <div class='container-comb'>
      comB
      <button @click="fn">按钮</button>
  </div>
</template>

<script>
import eventBus from '@/eventBus'

export default {
  data () {
    return {
      msg: 'B组件传值'
    }
  },
  methods: {
    fn () {
      eventBus.$emit('sendvalue', this.msg)
    }
  }
}
</script>

<style scoped lang='less'></style>
