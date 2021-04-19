<template>
    <div id="tab-bar">
        <slot></slot>
    </div>
</template>

<script>

export default {
  name: 'TabBar',
}
</script>
<style scoped>
#tab-bar{
  display: flex;
  background-color: #f6f6f6;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0px -3px 5px rgba(0, 0, 0, .3);
  z-index: 10;
}
</style>