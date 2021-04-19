<template>
<div class="detail-navbar">
    <nav-bar>
        <div slot="left" class="back" @click="backClick"></div>
        <div slot="center" class="title">
            <div v-for="(item,index) in titles" 
                 :key="index" 
                 class="title-item"
                 :class="{active:currentIndex===index}"
                 @click="itemClick(index)">{{item}}</div>
        </div>
    </nav-bar>
</div>
</template>

<script>

import NavBar from 'components/common/navbar/NavBar'

export default {
name:"DetailNavBar",
components:{
    NavBar
},
data() {
    return {
        titles:['商品','详情','评论','推荐'],
        currentIndex:0,
    }
},
methods: {
    itemClick(index){
        this.currentIndex=index
        this.$emit('titleClick',index)
    },
    backClick(){
        this.$router.go(-1)
    }
},
}
</script>
<style scoped>
.title {
    display: flex;
    font-size: 16px;
    justify-content: space-evenly;
}
.active {
    color: var(--color-high-text);
}
.back {
    position: relative;
}
.back::after {
    content: "";
    position: absolute;
    left: 37px;
    top: 17px;
    width: 8px;
    height: 8px;
    border-top: 1px solid gray;
    border-left: 1px solid gray;
    transform: rotate(-45deg);
}
</style>