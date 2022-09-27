<template>
  <div id="app">
    <y-container class="y-container">
      <y-header class="y-header">Header</y-header>
      <y-content class="y-content">Main</y-content>
    </y-container>
    <br />
    <br />
    <y-container class="y-container">
      <y-header class="y-header">Header</y-header>
      <y-content class="y-content">Main</y-content>
      <y-footer class="y-footer">Footer</y-footer>
    </y-container>
    <br />
    <br />
    <y-container class="y-container">
      <y-aside width="200px" class="y-aside">Aside</y-aside>
      <y-content class="y-content">应该就是猜想的这样的Main</y-content>
    </y-container>
    <br />
    <br />

    <y-container class="y-container">
      <y-header class="y-header">Header</y-header>
      <y-container class="y-container">
        <y-aside width="200px" class="y-aside">Aside</y-aside>
        <y-content class="y-content">Main</y-content>
      </y-container>
    </y-container>
    <br />
    <br />

    <y-container class="y-container">
      <y-header class="y-header">Header</y-header>
      <y-container class="y-container">
        <y-aside width="200px" class="y-aside">Aside</y-aside>
        <y-container class="y-container">
          <y-content  >Main</y-content>
          <y-footer class="y-footer">Footer</y-footer>
        </y-container>
      </y-container>
    </y-container>
    <br />
    <br />

    <y-container class="y-container">
      <y-aside width="200px" class="y-aside">Aside</y-aside>
      <y-container class="y-container">
        <y-header class="y-header">Header</y-header>
        <y-content class="y-content">Main</y-content>
      </y-container>
    </y-container>
    <br />
    <br />

    <y-container class="y-container">
      <y-aside width="200px"  class="y-aside">Aside</y-aside>
      <y-container class="y-container">
        <y-header class="y-header">Header</y-header>
        <y-content class="y-content">Main</y-content>
        <y-footer class="y-footer">Footer</y-footer>
      </y-container>
    </y-container>

    <br />
    <br />

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

    <y-input placeholder="请输入内容" v-model="input"></y-input>
    <y-input placeholder="请输入内容" v-model="input" disabled></y-input>
    <y-input placeholder="请输入内容" v-model="input" clearable></y-input>
    <!-- 带icon的输入框，icon不同的种类（搜索、日期），有不同的位置（左右） -->
    <y-input
      placeholder="请选择日期"
      v-model="input"
      icon="y-icon-riqi_o"
    ></y-input>
    <y-input
      placeholder="请输入内容"
      v-model="input"
      icon="y-icon-sousuo"
      iconPosition="right"
    ></y-input>
    <y-input :value="value" error="密码格式有错误"></y-input>

    <br />
    <br />
    <y-row :gutter="20" justify="center">
      <y-col :span="6"><div class="grid-content bg-purple"></div></y-col>
      <y-col :span="8" :offset="6"
        ><div class="grid-content bg-purple-light"></div
      ></y-col>
    </y-row>
    <br />

    <y-row :gutter="20" justify="left">
      <y-col :span="8" :offset="6"
        ><div class="grid-content bg-purple"></div
      ></y-col>
      <y-col :span="8"><div class="grid-content bg-purple-light"></div></y-col>
    </y-row>
    <br />

    <y-row :gutter="14">
      <y-col :span="6"><div class="grid-content bg-purple"></div></y-col>
      <y-col :span="6"><div class="grid-content bg-purple-light"></div></y-col>
      <y-col :span="6"><div class="grid-content bg-purple"></div></y-col>
      <y-col :span="6"><div class="grid-content bg-purple-dark"></div></y-col>
    </y-row>
    <br />
    <br />

    <y-row :gutter="10">
      <y-col :xs="8" :sm="6" :md="4" :lg="3"
        ><div class="grid-content bg-purple"></div
      ></y-col>
      <y-col :xs="4" :sm="6" :md="8" :lg="9"
        ><div class="grid-content bg-purple-light"></div
      ></y-col>
      <y-col :xs="4" :sm="6" :md="8" :lg="9"
        ><div class="grid-content bg-purple"></div
      ></y-col>
      <y-col :xs="8" :sm="6" :md="4" :lg="3"
        ><div class="grid-content bg-purple-light"></div
      ></y-col>
    </y-row>
  </div>
</template>

<script>
import YButton from "./components/button.vue";
import YPopover from "./components/Popover.vue";
import YCarousel from "./components/carousel/Carousel.vue";
import YCarouselItem from "./components/carousel/carousel-item.vue";
import YTable from "./components/table/table.vue";
import YInput from "./components/input.vue";
import YCol from "./components/layout/col.vue";
import YRow from "./components/layout/row.vue";
import YContainer from "./components/container/container.vue";
import YHeader from "./components/container/header.vue";
import YAside from "./components/container/aside.vue";
import YFooter from "./components/container/footer.vue";
import YContent from "./components/container/content.vue";

export default {
  name: "App",
  components: {
    YButton,
    YPopover,
    YCarousel,
    YCarouselItem,
    YTable,
    YInput,
    YRow,
    YCol,
    YContainer,
    YHeader,
    YAside,
    YFooter,
    YContent,
  },
  data() {
    return {
      input: "",
      visible: false,
      selected: "1",
      value: "1111111",
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

.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.y-header,
.y-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.y-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.y-content {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

</style>>