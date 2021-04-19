<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','精选']"  
                  @tabClick="tabClick"
                  ref="tabControl1"
                  class="tab-control"
                  v-show="isTabFixed"></tab-control>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
    <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control :titles="['流行','新款','精选']"  
                  @tabClick="tabClick"
                  ref="tabControl2"></tab-control>
    <goods-list :goods="showGoods">
    </goods-list>
    </scroll>
    
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>

import HomeSwiper from './childCompos/HomeSwiper'
import RecommendView from './childCompos/RecommendView'
import FeatureView from './childCompos/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop'

import {getHomeMultidata,getHomeGoods} from 'network/home'

export default {
  name: 'Home',
  components:{
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  data() {
    return {
      banners:[],
      recommends:[],
      goods:{
      'pop': {page:0,list:[]},
      'new' :{page:0,list:[]},
      'sell':{page:0,list:[]}
      },
      currentType:'pop',
      isShowBackTop:false,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getHomeMultidata(),
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY)
  },
  deactivated() {
    this.saveY=this.$refs.scroll.position
  },
  methods: {
    //事件监听相关的方法
    tabClick(index){
      // console.log(index);
      //或this.currentType=Object.keys(this.goods)[index]
      switch (index) {
        case 0:this.currentType='pop'         
          break;
        case 1:this.currentType='new'         
          break;
        case 2:this.currentType='sell'         
          break;
      }
      this.$refs.tabControl1.currentIndex=index     
      this.$refs.tabControl2.currentIndex=index     
    },
    backClick(){
      this.$refs.scroll.scrollTo(0,0)
    },
    contentScroll(position){
      //1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
      //2.判断tabControl是否吸顶(position:fixed)
      this.isTabFixed=(-position.y) > this.tabOffsetTop
    },
    loadMore(){
      this.getHomeGoods(this.currentType)
    },
    //轮播图加载监听
    swiperImageLoad(){
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
    },
    //网络请求相关的方法
    getHomeMultidata(){
      getHomeMultidata().then(res=>{
      // console.log(res);
      this.banners=res.data.banner.list
      this.recommends=res.data.recommend.list
    })
    },
    getHomeGoods(type){
      const page=this.goods[type].page+1
      getHomeGoods(type,page).then(res=>{
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page+=1
        this.$refs.scroll.finishPullUp()
  })
  }   
  },
}
</script>
<style scoped>
#home {
  position: relative;
  /* padding-top: 44px; */
  height: 100vh;
}
.home-nav {
  /* position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  top: 0; */
  background-color: #fb7299;
  color: #fff;
}
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}
</style>