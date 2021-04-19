<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="detialNav"/>
    <scroll
      class="content"
      :pull-up-load="true"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :topImages="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imgLoad="detailImageLoad" />
      <detail-param-info :param-info="paramInfo" ref="params" />
      <detail-comment-info :comment-info="commentInfo" ref="comment" />
      <goods-list :goods="recommends" ref="recommend" />
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"></back-top>
    <detail-bot-bar @addToCart="addToCart"/>
    <toast :message="message" :show="show"/>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBotBar from "./childComps/DetailBotBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
import Toast from 'components/common/toast/Toast'

import { getDetail, Goods, Shop, Param, getComment } from "network/detail";
import { mapActions } from 'vuex';

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBotBar,
    GoodsList,
    Scroll,
    BackTop,
    Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: [],
      recommends: [],
      themeTopY: [],
      getThemeTopY: null,
      currentIndex: 0,
      isShowBackTop: false,
      message:'',
      show:false
    };
  },
  created() {
    //1.保存传入的iid
    (this.iid = this.$route.params.iid),
    //2.根据iid请求详情数据
      getDetail(this.iid).then((res) => {
        //1.获取顶部的商品数据
        // console.log(res);
        const data = res.result;
        this.topImages = data.itemInfo.topImages;
        //2.获取商品信息
        this.goods = new Goods(
          data.itemInfo,
          data.columns,
          data.shopInfo.services
        );
        //3.创建店铺信息
        this.shop = new Shop(data.shopInfo);
        //4.保存商品的详情数据
        this.detailInfo = data.detailInfo;
        //5.获取参数信息
        this.paramInfo = new Param(data.itemParams.info, data.itemParams.rule);
        //6.获取评论信息
        if (data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list;
        }
      }),
      //3.请求推荐数据
      getComment().then((res) => {
        this.recommends = res.data.list;
      });
  },
  methods: {
    ...mapActions(['addCart']),
    detailImageLoad(){
      this.$refs.scroll.refresh()
      this.themeTopY = []
      this.themeTopY.push(0)
      this.themeTopY.push(this.$refs.params.$el.offsetTop)
      this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopY.push(Number.MAX_VALUE);
      // console.log(this.themeTopY);
    },
    titleClick(index) {
      //   console.log(index)
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200);
    },
    contentScroll(position) {
      //返回顶部是否显示
      this.isShowBackTop = -position.y >1000;
      const positionY = -position.y;
      let _lenth = this.themeTopY.length;
      for (let i = 0; i < _lenth - 1; i++) {
        if (
          this.currentIndex !== i &&  //解决i打印过多的判断
          positionY >= this.themeTopY[i] &&
          positionY < this.themeTopY[i + 1]
        ) {
            // console.log(i);
          this.currentIndex = i;
          this.$refs.detialNav.currentIndex = this.currentIndex;
        }
      }
    },
    backTop() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    addToCart(){
      //获取购物车的商品信息
      const product={}
      product.image=this.topImages[0]
      product.title=this.goods.title
      product.desc=this.goods.desc
      product.price=this.goods.realPrice
      product.iid=this.iid
      console.log(product);
      //2.将商品添加到购物车(以Vuex的方式)
      // this.$store.commit('addCart',product)
      // this.$store.dispatch('addCart',product)
      this.addCart(product).then(res=>{
        this.show=true,
        this.message=res,
        setTimeout(()=>{
        this.show=false,
        this.message=''
        },1500)
      })
    }
  },
};
</script>
<style scoped>
#detail {
  position: relative;
  z-index: 11;
  background-color: #fff;
  height: 100vh;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
/* .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
} */
</style>