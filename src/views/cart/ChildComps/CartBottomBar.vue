<template>
  <div class="cart-bot-bar flex">
    <div>
      <input
        type="checkbox"
        class="check"
        id="check"
        @click="checkClick"
        :class="{checked:isSelectAll}"
      />&ensp;<label for="check"> 全选</label>
    </div>
    <div class="total">合记：{{ totalPrice }}</div>
    <div class="settlement">去结算({{ checkLength }})</div>
  </div>
</template>

<script>
export default {
  name: "CartBottomBar",
  computed: {
    totalPrice() {
      return (
        "￥" + this.$store.state.cartList.filter((item) => {
            return item.checked;})
          .reduce((preValue, item) => {
            return preValue + item.price * item.count
          }, 0)
          .toFixed(2)
      );
    },
    checkLength() {
      return (
        this.$store.state.cartList.filter((item) => item.checked).length)
    },
    isSelectAll() {
    //   1.商品为0时,显示全选
        //  return !(this.$store.state.cartList.filter(item=>!item.checked).length)
      if (this.$store.state.cartList.length === 0) {
        return false
      } else {
        return !this.$store.state.cartList.find(item => !item.checked)
        // return this.$store.state.cartList.every(item => item.checked)
      }
    },
    
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        //   this.$store.state.cartList.checked=! this.$store.state.cartList.checked
        this.$store.state.cartList.forEach((item) => (item.checked = false));
      } else {
        this.$store.state.cartList.forEach((item) => (item.checked = true));
      }
    },
  },
};
</script>

<style lang="less" scoped="scoped">
.cart-bot-bar {
  position: fixed;
  bottom: 49px;
  left: 0;
  right: 0;
  height: 50px;
  padding: 0 10px;
  font-size: 13px;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid #ececec;
  border-top: 1px solid #ececec;
  .check {
    width: 18px;
    height: 18px;
    overflow: hidden;
    border-radius: 100%;
    vertical-align: bottom;
    border: 1px solid #ececec;
  }
  .checked {
    border: 1px solid var(--color-high-text);
    background: url(~assets/img/detail/check_active.png) no-repeat center;
    background-size: cover;
  }
  .total {
    color: rgb(241, 84, 36);
  }
  .settlement {
    background-color: rgb(241, 84, 36);
    padding: 10px;
    border-radius: 20px;
    color: #fff;
  }
}
</style>
