<template>
  <div
    class="wrapper-pagination"
    v-if="!(totalPage == 1 && hideOnSinglePage == true)"
  >
    <div class="prev-pagination">
      <y-button
        type="text"
        size="small"
        :disabled="currentPage == 1"
        @click="prev"
      >
        <span class="prev-pagination-button"><</span>
      </y-button>
    </div>

    <y-button
      size="small"
      type="text"
      class="moreButton"
      v-if="startNumAndEndNum.start > 1"
      @click="$emit('currentPage', 1)"
      :class="{ active: currentPage == 1 }"
      ><span class="moreButton-button">1</span></y-button
    >

    <y-button type="text" size="small"  class="moreButton" v-if="startNumAndEndNum.start > 2">···</y-button>

    <div
      class="pagination"
      v-for="(page, index) in startNumAndEndNum.end"
      :key="index"
    >
      <y-button
        size="small"
        type="text"
        v-if="page >= startNumAndEndNum.start"
        class="pagination-wrapper"
        @click="changePage(page)"
      >
        <span
          class="pagination-wrapper-button"
          :class="{ active: currentPage == page }"
          v-if="page >= startNumAndEndNum.start"
          >{{ page }}</span
        >
      </y-button>
    </div>

    <y-button
      type="text"
      size="small"
      class="moreButton"
      v-if="startNumAndEndNum.end < totalPage - 1"
      >···</y-button
    >
    <y-button
      type="text"
      size="small"
      class="moreButton"
      v-if="startNumAndEndNum.end < totalPage"
      @click="$emit('currentPage', totalPage)"
      :class="{ active: currentPage == totalPage }"
      ><span class="moreButton-button">{{ totalPage }}</span></y-button
    >

    <div class="next-pagination">
      <y-button
        type="text"
        size="small"
        :disabled="currentPage == totalPage"
        @click="next"
      >
        <span class="next-pagination-button">></span>
      </y-button>
    </div>
  </div>
</template>

<script>
import YButton from "./button.vue";
export default {
  name: "YPagination",
  components: {
    YButton,
  },
  props: {
    // 每页显示的条目个数
    pageSize: {
      type: Number,
      default: 10,
    },
    // 总共的数据项有多少
    total: {
      type: Number,
      required: true,
    },
    // 当前的页数
    currentPage: {
      type: Number,
      default: 1,
    },
    // 当只有一页时是否隐藏分页器
    hideOnSinglePage: {
      type: Boolean,
      default: false,
    },
    // 连续页码数
    pagerCount: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    // 总页数
    totalPage() {
      // 向上取整
      return Math.ceil(this.total / this.pageSize);
    },
    // 计算出连续的页码的起始数字与结束数字[连续页码的数字至少是5]
    startNumAndEndNum() {
      const { pagerCount, currentPage, totalPage } = this;
      // 先定义两个变量存储起始数字与结束数字
      let start = 0,
        end = 0;
      // 连续页码数字5[至少是5页]，如果出现少于5页 起始页为1，结束页为页码数
      if (pagerCount >= totalPage) {
        start = 1;
        end = totalPage;
      } else {
        // 正常页码，代码连续页数大于5  pageNo当前页码 pagerCount连续页数
        start = currentPage - parseInt(pagerCount / 2);
        end = currentPage + parseInt(pagerCount / 2);
        // 把start数字出现0|负数  纠正
        if (start < 1) {
          start = 1;
          end = pagerCount;
        }
        // 把end大于总页数的纠正
        if (end > totalPage) {
          end = totalPage;
          start = totalPage - pagerCount + 1;
        }
      }
      return { start, end };
    },
  },
  methods: {
    prev() {
      this.$emit("update:currentPage", this.currentPage - 1);
    },
    next() {
      this.$emit("update:currentPage", this.currentPage + 1);
    },
    changePage(page) {
      this.$emit("update:currentPage", page);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper-pagination {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.moreButton {
  width: 40px;
  &-button {
    color: rgb(53, 51, 51);
    font-size: 18px;
    &:hover {
      color: rgb(45, 160, 236);
    }
  }
}
.prev-pagination {
  color: rgb(53, 51, 51);
  width: 40px;
  font-size: 16px;
  &-button {
    color: rgb(145, 141, 141);
    font-size: 18px;
    &:hover {
      color: rgb(45, 160, 236);
    }
  }
}
.pagination {
  display: flex;
  &-wrapper {
    width: 40px;
    &-button {
      color: rgb(44, 43, 43);
      font-size: 18px;
      &:hover {
        color: rgb(45, 160, 236);
      }
    }
    .active {
      color: rgb(45, 160, 236);
    }
  }
}
.prev-next {
  width: 40px;
  color: rgb(145, 141, 141);
  font-size: 18px;
  &:hover {
    color: rgb(45, 160, 236);
  }
}
.next-pagination {
  &-button {
    color: rgb(145, 141, 141);
    font-size: 18px;
    &:hover {
      color: rgb(45, 160, 236);
    }
  }
}
</style>