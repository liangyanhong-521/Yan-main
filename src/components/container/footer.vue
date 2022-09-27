<template>
  <div class="footer-wrapper" :style="{ height }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "YFooter",
  props:{
    height:{
        type:String,
        default:"60px"
    }
  }
};
</script>

<style lang="scss" scroped>
</style>