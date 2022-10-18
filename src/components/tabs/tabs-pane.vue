<template>
  <div class="tabs-pane">
    <div class="content">{{label}}</div>

  </div>
</template>

<script>
export default {
    name:"YTabsPane",
    props:{
        lable:{
            type:String,
            default:""
        },
        name:{
            type:String,
            require:true
        }
    }

}
</script>

<style lang = "scss" scoped>

</style>