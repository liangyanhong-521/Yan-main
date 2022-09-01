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
        console.log(this.icon)
        let str = this.icon.substr(2);
        console.log(str)
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