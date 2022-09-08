<template>
  <div
    class="carousel-wapper"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="content-wapper">
      <slot></slot>
    </div>

    <div class="arrow" v-if="arrowVisible">
      <div class="arrow-left" @click="changeleftPage">
        <div class="arrow-left-inner-top"></div>
        <div class="arrow-left-inner-bottom"></div>
      </div>

      <div class="arrow-right" @click="changerightPage">
        <div class="arrow-right-inner-top"></div>
        <div class="arrow-right-inner-bottom"></div>
      </div>
    </div>

    <!-- 指示器 -->
    <ul class="indicator">
      <li
        class="indicator-item"
        v-for="(item, index) in childLength"
        :key="index"
        @click="indicatorHandleClick(index)"
        @mouseenter="indicatorEnterHover(index)"
      ></li>
    </ul>
  </div>
</template>

<script>

export default {
  name: "YCarousel",
  props: {
    //指示器的触发方式
    trigger: {
      type: String,
      default: "hover",
    },
    //是否自动播放
    autoPlay: {
      type: Boolean,
      default: true,
    },
    //自动播放的时间限制
    interval: {
      type: Number,
      default: 3000,
    },
    //被选中的那个子组件
    selected: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      childLength: 0,
      timerId: undefined,
      arrowVisible: false,
      currentIndex: 0,
      lastIndex: 0,
    };
  },
  mounted() {
    this.updateChildren();
    if (this.autoPlay) {
      this.playAutomatically();
    }
    this.childLength = this.children;
  },
  updated() {
    this.updateChildren();
  },
  computed: {
    names() {
      return this.children.map((item) => item.name);
    },
    //children代表的就是y-carousel-item组件，这里可以直接访问y-carousel-item组件中的数据。
    children() {
      return this.$children.filter(
        (vm) => vm.$options.name === "YCarouselItem"
      );
    },
  },
  methods: {
    indicatorHandleClick(index) {
      if(this.trigger === "click"){
        this.lastIndex = this.currentIndex
        this.changeSelected(index)
      }
    },
    indicatorEnterHover(index) {
      if(this.trigger === "hover"){
        this.lastIndex = this.currentIndex
        this.changeSelected(index)
      }
    },
    changeleftPage() {
      if (this.currentIndex === 0) {
        this.lastIndex = 0;
        this.changeSelected(3);
      } else {
        this.lastIndex = this.currentIndex;
        this.changeSelected(this.currentIndex - 1);
      }
    },
    changerightPage() {
      if (this.currentIndex === 3) {
        this.lastIndex = 3;
        this.changeSelected(0);
      } else {
        this.lastIndex = this.currentIndex;
        this.changeSelected(this.currentIndex + 1);
      }
    },
    //让所有的子组件的selected都满足第一个子组件的name，所以只有第一个子组件进行展示
    updateChildren() {
      let first = this.children[0];
      let selected = this.selected || first.name;
      this.children.forEach((vm) => {
        let reverse = this.currentIndex > this.lastIndex ? false : true;
        vm.reverse = this.isAutoPlayOrClickArrow(reverse);
        this.$nextTick(() => {
          vm.selected = selected;
        });
      });
    },
    //让选中的那个子组件的selected和他的name值相等进行展示。
    // 并和update()周期函数搭配，只有这个子组件满足，其他子组件的selected为1，不满足展示条件
    changeSelected(index) {
      //改变父组件中的selected的值
      let changeNode = this.children[index];
      changeNode.selected = this.names[index];
      this.currentIndex = index;
      this.$emit("update:selected", this.names[index]);
    },
    //自己进行轮播的函数
    playAutomatically() {
      if (this.timerId) {
        return;
      }
      let index = 0;
      this.timerId = setInterval(() => {
        this.lastIndex = index;
        index = index + 1;
        index = index % this.children.length;
        this.changeSelected(index);
      }, this.interval);
    },
    onMouseEnter() {
      this.arrowVisible = true;
      if (this.autoPlay) {
        this.pause();
      }
    },
    onMouseLeave() {
      this.arrowVisible = false;
      if (this.autoPlay) {
        this.playAutomatically();
      }
    },
    pause() {
      window.clearInterval(this.timerId);
      this.timerId = undefined;
    },
    isAutoPlayOrClickArrow(reverse) {
      if (this.timerId || this.arrowVisible) {
        if (
          this.lastIndex === this.children.length - 1 &&
          this.currentIndex === 0
        ) {
          reverse = false;
        }
        if (
          this.lastIndex === 0 &&
          this.currentIndex === this.children.length - 1
        ) {
          reverse = true;
        }
      }
      return reverse;
    },
    //点击指示器进行轮播
  },
};
</script>

<style lang = "scss" scoped>
.carousel-wapper {
  caret-color: rgba(0, 0, 0, 0);
  background: #859cc7;
  overflow: hidden;
  height: 250px;
}
.content-wapper {
  overflow: hidden;
  width: 100%;
  height: 100%;
  color: #fff;
  font-size: 20px;
  text-align: center;
}
.arrow {
  position: relative;
  top: -51%;
}
.arrow-left {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: rgb(160, 156, 156);
  position: relative;
  float: left;
  left: 4%;
  &-inner-top {
    width: 7px;
    height: 1.5px;
    background-color: rgb(240, 234, 234);
    transform: rotate(-35deg);
    position: relative;
    left: 13px;
    top: 14px;
  }
  &-inner-bottom {
    width: 7px;
    height: 1.5px;
    background-color: white;
    transform: rotate(35deg);
    position: relative;
    left: 13px;
    top: 16px;
  }
  &:hover {
    cursor: pointer;
    background: #384c6e;
  }
}
.arrow-right {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background-color: rgb(160, 156, 156);
  position: relative;
  float: right;
  right: 4%;
  &-inner-top {
    width: 7px;
    height: 1.5px;
    background-color: white;
    transform: rotate(35deg);
    position: relative;
    left: 13px;
    top: 14px;
  }
  &-inner-bottom {
    width: 7px;
    height: 1.5px;
    background-color: white;
    transform: rotate(-35deg);
    position: relative;
    left: 13px;
    top: 16px;
  }
  &:hover {
    cursor: pointer;
    background: #384c6e;
  }
}

.indicator {
  list-style-type: none;
  display: flex;
  flex-direction: row;
  position: relative;
  top: -20%;
  justify-content: center;
}
.indicator-item {
  width: 35px;
  height: 3px;
  margin-right: 9px;
  background-color: rgb(117, 114, 114);
  border-radius: 20px;
  &:hover {
    cursor: pointer;
    background-color: aliceblue;
  }
}
</style>