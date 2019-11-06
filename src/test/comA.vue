<template>
  <div class='container-coma'>
      comA----{{message}}
  </div>
</template>

<script>
import eventBus from '@/eventBus'
export default {
  data () {
    return {
      message: ''
    }
  },
  created () {
    eventBus.$on('sendvalue', (data) => {
      this.message = data
    })
  }

}
</script>

<style scoped lang='less'></style>
