<template>
  <div>
    <nav-bar class="cart">
      <div slot="center">购物车({{ cartLength }})</div>
    </nav-bar>
    <cart-list/>
    <cart-bottom-bar/>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from './ChildComps/CartList'
import CartBottomBar from './ChildComps/CartBottomBar'

//直接引用mapGetters
import { mapGetters } from 'vuex'

export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //第一种方法
    ...mapGetters(['cartLength']),
    //第二种方法
    // ...mapGetters({
    //   //自定义属性
    //   length:'cartLength'
    // })
  },
};
</script>
<style scoped>
.cart {
  color: #fff;
  font-weight: 700;
  background-color: var(--color-tint);
}
</style>