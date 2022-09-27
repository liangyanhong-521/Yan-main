<template>
  <div id="col" class="col-wrapper" :style="setClass" :class="colClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "YCol",
  props: {
    span: {
      type: Number,
      default: 24,
    },
    offset: {
      type: Number,
      default: 0,
    },
    // 超小屏幕 100%
    xs: {
      type: Number,
      default: 0,
    },
    // 小屏幕  ( >=768px) 宽度定为 750px
    sm: {
      type: Number,
      default: 0,
    },
    // 中等屏幕 ( >=992px) 宽度定为 970px
    md: {
      type: Number,
      default: 0,
    },
    // 大屏幕  ( >=1200px) 宽度定为 1170px
    lg: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      gutter: 0,
    };
  },
  computed: {
    setClass() {
      if (this.offset != 0) {
        return {
          marginLeft: (this.offset / 24) * 100 + "%",
          paddingLeft: this.gutter / 2 + "px",
          paddingRight: this.gutter / 2 + "px",
        };
      }
      return {
        paddingLeft: this.gutter / 2 + "px",
        paddingRight: this.gutter / 2 + "px",
      };
    },
    colClass() {
      return {
        [`y-col-${this.span}`]: this.span,
        [`y-xs-${this.xs}`]: this.xs,
        [`y-sm-${this.sm}`]: this.sm,
        [`y-md-${this.md}`]: this.md,
        [`y-lg-${this.lg}`]: this.lg,
      };
    },
  },
};
</script>

<style lang="scss" scroped>
.col-wrapper {
  box-sizing: border-box;
}

@for $n from 1 through 24 {
  .y-col-#{$n} {
    width: ($n / 24) * 100%;
  }
}
@media (max-width: 768px) {
  @for $n from 1 through 24 {
    .y-xs-#{$n} {
      width: ($n / 24) * 100%;
    }
  }
}
@media (min-width: 769px) {
  @for $n from 1 through 24 {
    .y-sm-#{$n} {
      width: ($n / 24) * 100%;
    }
  }
}
@media (min-width: 993px) {
  @for $n from 1 through 24 {
    .y-md-#{$n} {
      width: ($n / 24) * 100%;
    }
  }
}
@media (min-width: 1201px) {
  @for $n from 1 through 24 {
    .y-lg-#{$n} {
      width: ($n / 24) * 100%;
    }
  }
}
</style>