<template>
  <div id="app">
    <y-button>文字按钮</y-button>
    <y-button>文字按钮</y-button>
    <y-button type="info" @click="handle">文字按钮</y-button>
    <y-button type="text" disabled>文字按钮</y-button>
    <y-popover class="popover01" trigger="hover" position="right">
      <y-button slot="button">hover激活</y-button>
    </y-popover>
    <y-popover class="popover02" trigger="focus" position="right">
      <y-button slot="button">focus激活</y-button>
    </y-popover>
    <y-popover class="popover03" trigger="click" position="right">
      <y-button slot="button">click激活</y-button>
    </y-popover>
    <y-popover class="popover04" nestable :visible="visible" position="bottom">
      <p>这是一段内容这是一段内容确定删除吗？</p>
      <div style="display: flex; margin-left: 90px; margin-top: -10px">
        <y-button size="small" type="text" @click="visible = false"
          >取消</y-button
        >
        <y-button type="primary" size="small" @click="visible = false"
          >确定</y-button
        >
      </div>
      <y-button slot="button" @click="handle">嵌套激活</y-button>
    </y-popover>

    <y-carousel :selected.sync="selected" class="carousel">
      <y-carousel-item v-for="item in 4" :key="item" :name="item.toString()">
        <h3 class="small">{{ item }}</h3>
      </y-carousel-item>
    </y-carousel>

    <y-table
      :data="tableData"
      :title="columns"
      :selectedItems.sync="selectedItems"
      border
      checkbox
      @select="select"
      @select-all="selectAll"
    ></y-table>

    <y-table
      :data="tableData"
      :title="columns"
      sortable
      :default-sort="orderBy"
    ></y-table>

    <y-table
      :data="tableData"
      :title="columns"
      expand
      expand-key="description"
    ></y-table>

    <!-- 显示索引号 -->
    <y-table
      :data="tableData"
      :title="columns"
      indexVisible
      height="250px"
    ></y-table>

    <br />
    <br />
    <br />
    <br />
    <br />

    <y-input placeholder="请输入内容" v-model="input"></y-input>
    <br />
    <br />
    <y-input placeholder="请输入内容" v-model="input" disabled></y-input>
    <br />
    <br />
    <y-input placeholder="请输入内容" v-model="input" clearable></y-input>

    <br />
    <br />
    <!-- 带icon的输入框，icon不同的种类（搜索、日期），有不同的位置（左右） -->
    <y-input  placeholder="请选择日期"  v-model="input" icon="y-icon-riqi_o"></y-input>
    <br />
    <br />
    <y-input  placeholder="请输入内容" v-model="input" icon="y-icon-sousuo" iconPosition="right"></y-input>

    <br />
    <br />
    <y-input   :value="value" error="密码格式有错误"></y-input>
  </div>
</template>

<script>
import YButton from "./components/button.vue";
import YPopover from "./components/Popover.vue";
import YCarousel from "./components/carousel/Carousel.vue";
import YCarouselItem from "./components/carousel/carousel-item.vue";
import YTable from "./components/table/table.vue";
import YInput from "./components/input.vue";

export default {
  name: "App",
  components: {
    YButton,
    YPopover,
    YCarousel,
    YCarouselItem,
    YTable,
    YInput,
  },
  data() {
    return {
      input: "",
      visible: false,
      selected: "1",
      value:"1111111",
      //选中的数据项数组。其中不包括点击全选按钮选中的时候。
      selectedItems: [],
      columns: [
        { text: "姓名", key: "name", width: "100px" },
        { text: "分数", key: "score", width: "100px" },
        {
          text: "学校",
          key: "company",
        },
      ],
      // 默认的排列列和排列顺序
      orderBy: {
        prop: "姓名",
        key: "name",
        order: "decreated",
      },
      tableData: [
        {
          id: 1,
          name: "张张",
          company: "北京工业大学",
          score: 96,
          description: "xxxx xxxx",
        },
        {
          id: 2,
          name: "红红",
          company: "浙江工业大学",
          score: 100,
          description: "xxxx xxxx",
        },
        { id: 3, name: "李李", company: "太原理工大学", score: 95 },
        { id: 4, name: "陈陈", company: "山西大同大学", score: 99 },
        { id: 5, name: "小黄", company: "浙江工业大学", score: 98 },
        { id: 6, name: "田田", company: "上海海洋大学", score: 92 },
      ],
    };
  },
  methods: {
    handle() {
      this.visible = true;
    },
    //点击选择项时触发的事件
    select() {
      console.log("我是选中按钮");
      console.log(this.selectedItems);
    },
    //点击全部选择项时触发的事件
    selectAll() {
      console.log("我是全选中按钮");
    },
  },
};
</script>

<style lang="scss" scoped>
#app {
  align-items: center;
}
.carousel {
  width: 400px;
  height: 250px;
}
.small {
  line-height: 250px;
}
</style>>