<template>
     <tab-bar>
       <tab-bar-item path="/home" activeColor="deeppink">
         <img slot="item-icon" src="~assets/img/tarbar/icon01.png" alt="">
         <img slot="item-icon-active" src="~assets/img/tarbar/icon01_active.png" alt="">
         <div slot="item-text">首页</div>
       </tab-bar-item>
       <tab-bar-item path="/category" activeColor="deeppink">
           <img slot="item-icon" src="~assets/img/tarbar/icon02.png" alt="">
         <img slot="item-icon-active" src="~assets/img/tarbar/icon02_active.png" alt="">
         <div slot="item-text">分类</div>
       </tab-bar-item>
       <tab-bar-item path="/cart" activeColor="deeppink">
           <img slot="item-icon" src="~assets/img/tarbar/icon03.png" alt="">
           <img slot="item-icon-active" src="~assets/img/tarbar/icon03_active.png" alt="">
         <div slot="item-text">购物车</div>
       </tab-bar-item>
       <tab-bar-item path="/profile" activeColor="deeppink">
           <img slot="item-icon" src="~assets/img/tarbar/icon04.png" alt="">
           <img slot="item-icon-active" src="~assets/img/tarbar/icon04_active.png" alt="">
         <div slot="item-text">我的</div>
       </tab-bar-item>
     </tab-bar>
</template>

<script>

import TabBar from '../../common/tabbar/TabBar'
import TabBarItem from '../../common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
    components: {
    TabBar,
    TabBarItem
  }
}
</script>
<style scoped>

</style>