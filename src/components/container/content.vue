<template>
  <div class="content-wrapper">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "YContent",
};
</script>

<style lang="scss" scoped>
.content-wrapper{
    flex: 1;
}
</style>