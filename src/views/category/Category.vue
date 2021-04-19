<template>
  <div class="wrapper">
    <div class="search_bar">
      <a class="im-talk"></a>
      <input type="text" placeholder="西装套装" />
      <a class="cart"></a>
    </div>
<div class="category">
      <scroll
      ref="scroll"
      class="content"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
    >
      <div class="recommend">
        <div class="recommend-item">
          <img src="~assets/img/block1.jpg" alt="" />
          <p>限时快抢</p>
        </div>
        <div class="recommend-item">
          <img src="~assets/img/block2.jpg" alt="" />
          <p>热销榜单</p>
        </div>
        <div class="recommend-item">
          <img src="~assets/img/block3.jpg" alt="" />
          <p>好货精选</p>
        </div>
        <div class="recommend-item">
          <img src="~assets/img/block4.png" alt="" />
          <p>新品快枪</p>
        </div>
      </div>
      <div class="goods">
        <div class="goods-item">
          <img src="~assets/img/goods-icon1.webp" alt="" />
          <p>女装</p>
        </div>
        <div class="goods-item">
          <img src="~assets/img/goods-icon2.webp" alt="" />
          <p>上衣</p>
        </div>
        <div class="goods-item">
          <img src="~assets/img/goods-icon3.webp" alt="" />
          <p>裤子</p>
        </div>
        <div class="goods-item">
          <img src="~assets/img/goods-icon4.webp" alt="" />
          <p>裙子</p>
        </div>
        <div class="goods-item">
          <img src="~assets/img/goods-icon5.webp" alt="" />
          <p>套装</p>
        </div>
        <div class="goods-item">
          <img src="~assets/img/goods-icon6.webp" alt="" />
          <p>女鞋</p>
        </div>
        <div class="goods-item">
          <img src="~assets/img/goods-icon7.webp" alt="" />
          <p>美妆个护</p>
        </div>
        <div class="goods-item">
          <img src="~assets/img/goods-icon8.webp" alt="" />
          <p>包包</p>
        </div>
        <div class="goods-item">
          <img src="~assets/img/goods-icon9.webp" alt="" />
          <p>配饰</p>
        </div>
        <div class="goods-item">
          <img src="~assets/img/goods-icon10.webp" alt="" />
          <p>内衣</p>
        </div>
        <div class="goods-item">
          <img src="~assets/img/goods-icon11.webp" alt="" />
          <p>男友</p>
        </div>
        <div class="goods-item">
          <img src="~assets/img/goods-icon12.webp" alt="" />
          <p>家居</p>
        </div>
        <div class="goods-item">
          <img src="~assets/img/goods-icon13.webp" alt="" />
          <p>母婴</p>
        </div>
        <div class="goods-item">
          <img src="~assets/img/goods-icon14.webp" alt="" />
          <p>食品</p>
        </div>
        <div class="goods-item">
          <img src="~assets/img/goods-icon15.webp" alt="" />
          <p>运动</p>
        </div>
      </div>
      <div class="banner">
        <img src="~assets/img/banner.webp" alt="" />
      </div>
      <goods-list :goods="showGoods" />
    </scroll>
</div>
<back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>
 
<script>
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll.vue";
import BackTop from 'components/content/backTop/BackTop'

import { getHomeGoods } from "network/home";

export default {
  name: "Category",
  components: {
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      scroll: null,
      goods: {
        sell: { page: 0, list: [] },
      },
      currentType: "sell",
      isShowBackTop:false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  created() {
    this.getHomeGoods("sell");
  },
  activated() {
    this.$refs.scroll.refresh()
},
  methods: {
    contentScroll(position){
      //1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>
<style scoped>
.search_bar {
  position: relative;
  display: flex;
  width: 100%;
  height: 46px;
  border-bottom: 1px solid #e5e5e5;
}
.search_bar input {
  width: 73.33%;
  border-radius: 5px;
  height: 30px;
  margin-top: 8px;
  padding-left: 35px;
  color: #999;
  background: #eee url(~assets/img/search.png) no-repeat 10px center;
  background-size: 15px auto;
  border: 0;
  vertical-align: middle;
}
.search_bar .im-talk,.cart {
  width: 13.33%;
  background: url(~assets/img/search_bar.png) no-repeat center;
  background-size: 20px auto;
}
.search_bar .cart {
  width: 13.33%;
  background: url(~assets/img/message.png) no-repeat center;
  background-size: 20px auto;
}
.recommend {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  margin: 9px 0;
}
.recommend-item {
  width: 22%;
  position: relative;
}
.recommend-item img {
  width: 100%;
  border-radius: 3px;
}
.recommend-item p {
  position: absolute;
  bottom: 5px;
  left: 0;
  width: 100%;
  font-size: 15px;
  color: #fff;
  font-weight: 700;
  text-align: center;
}
.goods {
  display: flex;
  flex-wrap: wrap;
}
.goods-item {
  width: 20%;
  text-align: center;
  padding: 5px 0;
}
.goods-item img {
  width: 50px;
  border-radius: 3px;
}
.goods-item img p {
  width: 25px;
  font-size: 15px;
}
.banner img {
  width: 100%;
  height: 100%;
}
.category {
  position: relative;
  height:100vh
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 9px;
  bottom: 95px;
  overflow: hidden;
}
</style>