<template>
  <div class="tabs-pane">
    <div class="content" @click="tabsItemChoose" :class="classes">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "YTabsPane",
  props: {
    name: {
      type: String,
      require: true,
    },
    disabled:{
        type:Boolean,
        default:false
    }
  },
  inject: ["eventBus"],
  data() {
    return {
      active: false,
      type: "default",
      direction: "horizontal",
    };
  },
  computed: {
    classes() {
      return {
        active: this.active,
        disabled: this.disabled,
        card: this.type === 'card',
        [`tabs-item-vertical`]: this.direction === 'vertical',
      }
    },
  },
  created() {
    this.eventBus.$on("direction", (item) => {
      this.direction = item;
    });
    this.eventBus.$on("type", (item) => {
      this.type = item;
    });
    this.eventBus.$on("update:selected", (name) => {
      this.active = name === this.name;
    });
  },
  methods: {
    tabsItemChoose() {
      let slotText;
      slotText = this.$slots.default[0].text;
      if(!this.disabled){
        this.$emit("selected", this.name, slotText);
      }
    //   this.$emit("selected", this.name, slotText);
    },
  },
};
</script>

<style lang = "scss" scoped>
.tabs-pane {
  > .content {
    cursor: pointer;
    padding: 15px;
    border-bottom: 1px solid rgb(219, 219, 219);
    &:hover {
      color: rgb(55, 155, 221);
    }
  }
  >.active{
    color: rgb(55, 155, 221);
    border-bottom: 2px solid rgb(55, 155, 221);
  }
  >.disabled{
    cursor: not-allowed;
    opacity: 0.45;
  }

  >.card{
    border: 1px solid rgb(185, 185, 185);
  }
  .card.active{
    border: 1px solid rgb(185, 185, 185);
    border-bottom: none;
  }

   .card.disabled{
    cursor: not-allowed;
    opacity: 0.45;
  }
  >.tabs-item-vertical{
    border-right: 1px solid rgb(185, 185, 185);
    border-bottom: none;
  }
  >.tabs-item-vertical.active{
   color: rgb(55, 155, 221);
    border-right: 2px solid rgb(55, 155, 221);
  }
}
</style>