<template>
  <div id="app">

    <y-tabs>
    <y-tab-pane label="用户管理" name="first">用户管理</y-tab-pane>
    <y-tab-pane label="配置管理" name="second">配置管理</y-tab-pane>
    <y-tab-pane label="角色管理" name="third">角色管理</y-tab-pane>
    <y-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</y-tab-pane>
  </y-tabs>




    <br />
    <br />
    <br />
    <y-collapse :selected="activeNames" accordion>
      <y-collapse-item title="一致性 Consistency" name="1">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </y-collapse-item>
      <y-collapse-item title="反馈 Feedback" name="2">
        <div>控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作；</div>
        <div>页面反馈：操作后，通过页面元素的变化清晰地展现当前状态。</div>
      </y-collapse-item>
      <y-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </y-collapse-item>
       <y-collapse-item title="可控 Controllability" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </y-collapse-item>
    </y-collapse>

    <br />
    <br />
    <br />
    <y-button type="text" @click="haddleToast">点击打开Message Box</y-button>
    <br />
    <br />
    <br />
    <y-menu :selected.sync="selected" vertical>
      <y-menu-item name="handle">处理中心</y-menu-item>
      <y-menu-item name="workTop" disabled>我的工作台</y-menu-item>
      <y-sub-menu name="about">
        <template slot="title">关于</template>
        <y-menu-item name="2-1">选项1</y-menu-item>
        <y-sub-menu name="2-2">
          <template slot="title">选项2</template>
          <y-menu-item name="2-2-1">选项1</y-menu-item>
          <y-menu-item name="2-2-2">选项2</y-menu-item>
        </y-sub-menu>
        <y-menu-item name="2-3">选项3</y-menu-item>
        <y-menu-item name="2-4">选项4</y-menu-item>
      </y-sub-menu>
      <y-menu-item name="center">消息中心</y-menu-item>
      <y-menu-item name="order">订单管理</y-menu-item>
    </y-menu>
    <br />
    <br />
    <span>当页面数小于7时</span>
    <y-pagination
      :total="50"
      :current-page.sync="currentPage"
      :hide-on-single-page="false"
    ></y-pagination>
    <br />
    <br />
    <span>当页面数大于7时</span>
    <y-pagination
      :total="500"
      :current-page.sync="currentPage"
      :hide-on-single-page="false"
    ></y-pagination>
    <br />
    <br />
    <y-upload
      accept="image/jpeg"
      multiple
      :file-list.sync="fileList"
      action="https://api.apiopen.top/getJoke"
    >
      <y-button type="primary" @click="handle">点击上传</y-button>
      <div class="el-upload__tip" slot="tips">
        只能上传image/png文件，且不超过500kb
      </div>
    </y-upload>

    <br />
    <br />
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
          <y-content>Main</y-content>
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
      <y-aside width="200px" class="y-aside">Aside</y-aside>
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

    <y-button type="primary">点击上传</y-button>

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

    <!-- <y-carousel :selected.sync="selected" class="carousel">
      <y-carousel-item v-for="item in 4" :key="item" :name="item.toString()">
        <h3 class="small">{{ item }}</h3>
      </y-carousel-item>
    </y-carousel> -->

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
import YUpload from "./components/upload/upload.vue";
import YPagination from "./components/pagination.vue";
import YMenu from "./components/menu/menu.vue";
import YMenuItem from "./components/menu/menu-item.vue";
import YSubMenu from "./components/menu/submenu.vue";
import YToast from "./components/toast.vue";
import YCollapse from "./components/collapse/collapse.vue";
import YCollapseItem from "./components/collapse/collapse-item.vue";
import YTabs from './components/tabs/tabs.vue'
import YTabsPane from './components/tabs/tabs-pane.vue'

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
    YUpload,
    YPagination,
    YMenu,
    YMenuItem,
    YSubMenu,
    YToast,
    YCollapse,
    YCollapseItem,
    YTabs,
    YTabsPane
  },
  data() {
    return {
      activeNames: ['1'],
      input: "",
      visible: false,
      // selected: "1",
      value: "1111111",
      currentPage: 1,
      selected: "handle",
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
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  methods: {
    handle() {
      this.visible = true;
    },
    haddleToast() {
      this.$YToast("<h3>这是 <i>HTML</i> 片段</h3>", "弹出框标题", {
        enableHtml: true,
        autoClose: true,
        closeButton: {
          text: "点击取消",
          callback: () => {
            console.log("是点击取消按钮啦");
          },
        },
        confirmButton: {
          text: "确定",
          callback: () => {
            console.log("是点击确定按钮啦");
          },
        },
      });
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