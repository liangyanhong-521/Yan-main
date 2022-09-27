<template>
  <div class="header-wrapper" :style="{ height }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "YHeader",
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