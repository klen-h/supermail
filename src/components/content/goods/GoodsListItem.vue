<template>
<div class="good-item" @click="itemClick">
    <img v-lazy="showImage" alt="">
    <div class="good-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
    </div>
</div>
</template>

<script>
export default {
name:"GoodsListItem",
props:{
    goodsItem:{
        type:Object,
        default(){
            return {}
        }
    }
},
computed:{
    showImage(){
        return this.goodsItem.image ||  this.goodsItem.show.img
    }
},
methods: {
    itemClick(){
        this.$router.push('/detail/'+this.goodsItem.iid)
    }
},

}
</script>
<style scoped>
.good-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;

}
.good-item img {
    width: 100%;
    border-radius: 5px;
}
.good-info {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 5px;
    font-size: 12px;
    text-align: center;
    overflow: hidden;
}
.good-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom:3px;
}
.good-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
}
.good-info .collect {
    position: relative;
}
.good-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/home/collect_icon.png") 0 0/14px 14px;
}
</style>