<template>
<div class="toast" v-show="show">{{message}}</div>
</template>

<script>
export default {
name:"Toast",
props:{
    message:{
        type:String,
        default:''
    },
    show:{
        type:Boolean,
        default:false
    }
}
}
</script>
<style scoped>
.toast {
    position: fixed;
    background-color: rgba(0,0,0,.75 );
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    padding: 10px;
    border-radius: 20px;
    color: #fff;

}
</style>