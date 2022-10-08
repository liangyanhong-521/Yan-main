<template>
  <div class="aside-wrapper" :style="{ width }">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "YAside",
   props:{
    width:{
        type:String,
        default:"300px"
    }
  }
};
</script>

<style lang="scss" scoped>
</style>