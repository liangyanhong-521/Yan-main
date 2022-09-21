<template>
   <svg class="icon" aria-hidden="true" > 
      <use :xlink:href="newIcon"></use>
  </svg>
</template>

<script>
export default {
    name:"YIcon",
    props:['icon'],
    created(){
        let str = this.icon.substr(2);
    },
    computed:{
        newIcon(){
            return [`#${this.icon.substr(2)}`]
        }
    }

}
</script>

<style lang="scss" scoped>
.icon{
    height: 1.3rem;
    width: 1.3rem;
}

</style>