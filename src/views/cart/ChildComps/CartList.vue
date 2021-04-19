<template>
<div class="cart-list">
    <scroll :pull-up-load="true" ref="scroll" class="cart-content">
    <cart-list-item :cart-list="cartList"/>
    </scroll>
</div>
</template>

<script>

//直接引用mapGetters
import { mapGetters } from 'vuex'
import Scroll from 'components/common/scroll/Scroll.vue'

import CartListItem from './CartListItem'

export default {
name:"CartList",
components:{
    Scroll,
    CartListItem
},
computed: {
    ...mapGetters(['cartList'])
},
activated() {
    this.$refs.scroll.refresh()
},
}
</script>
<style scoped>
.cart-list {
    position: relative;
    height: 100vh;
}
.cart-content {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 133px;
  overflow: hidden;
}
</style>