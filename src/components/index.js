import Mybread from '@/components/my-bread.vue'
import Mychannel from '@/components/my-channel.vue'
import Myimage from '@/components/my-image.vue'
export default {
  install (Vue) {
    Vue.component('my-bread', Mybread)
    Vue.component('my-channel', Mychannel)
    Vue.component('my-image', Myimage)
  }
}
