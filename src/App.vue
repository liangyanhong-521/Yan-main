<template>
  <div id="app">
    <h1>34</h1>
    <y-button>文字按钮</y-button>
    <y-button type="info">文字按钮</y-button>
    <y-button type="text" disabled>文字按钮</y-button>
    <y-button type="primary" disabled>文字按钮</y-button>
    <y-button type="error">文字按钮</y-button>
    <y-button type="warning">文字按钮</y-button>
    <y-button type="success">文字按钮</y-button>


    <y-button size="small" icon="y-icon-yunshangchuan_o"></y-button>
    <y-button size="small">文字按钮</y-button>

       <y-button size="small" icon="y-icon-shanchu">文字</y-button>



    <y-button size="middle" loading>加载中</y-button>


    <y-button size="middle" icon="y-icon-shanchu">文字</y-button>
    <y-button size="middle" icon="y-icon-bianji1">文字</y-button>



    <y-button size="large" icon="y-icon-tianjia1">文字</y-button>
    <y-button size="large" icon="y-icon-shanchu">文字</y-button>
    <y-button size="large" icon="y-icon-sousuo_o">文字按钮</y-button>



    <y-button type="info">文字按钮</y-button>
    <y-button type="text">文字按钮</y-button>
    <y-button type="text" disabled>文字按钮</y-button>
    <y-button size="small" type = "info">文字按钮</y-button>
    <y-button size="middle" type = "primary" round>文字按钮</y-button>
    <y-button size="small" type = "error" round>文字按钮</y-button>
    <y-button size="large" type = "error" round>文字按钮</y-button>
    <y-button  type = "warning" disabled>文字按钮</y-button>
    <y-button  type = "success" round disabled>文字按钮</y-button>
    <y-button size="middle"  type = "success" disabled >文字按钮</y-button>
    <y-button loading>加载中</y-button>
  </div>
</template>

<script>
import YButton from './components/button.vue'

export default {
  name: 'App',
  components: {
    YButton
  }
}
</script>

<style>
#app {
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
}
</style>
