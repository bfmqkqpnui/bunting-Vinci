<template>
  <el-row class="menu">
    <el-col :span="3">
      <ul class="left-menu">
        <li :class="{active:menuSelFlag.userFlag}"><a href="javascript:void(0)">用户</a></li>
        <li :class="{active:menuSelFlag.deviceFlag}"><a href="javascript:void(0)">设备</a></li>
        <li :class="{active:menuSelFlag.feedbackFlag}"><a href="javascript:void(0)">用户反馈</a></li>
        <li :class="{active:menuSelFlag.helpFlag}"><a href="javascript:void(0)">帮助文档</a></li>
        <li :class="{active:menuSelFlag.serviceFlag}"><a href="javascript:void(0)">客服人员</a></li>
        <li :class="{active:menuSelFlag.systemFlag}"><a href="javascript:void(0)">系统配置</a></li>
        <li :class="{active:menuSelFlag.dataReportFlag}"><a href="javascript:void(0)">数据报表</a></li>
      </ul>
    </el-col>
    <el-col :span="21">
      <mainComponent style="padding:1rem;min-height: 37.5rem;background: #F2F2F2;"></mainComponent>
    </el-col>
  </el-row>
</template>

<script>
  import mainComponent from '@/components/main/mainComponent'
  //Js部分尽量采用ES6语法，webpack babel插件会转义兼容
  export default {
    //组件私有数据（必须是function，而且要return对象类型）
    data() {
      return {
        menuSelFlag:{
          userFlag : true,
          deviceFlag : false,
          feedbackFlag : false,
          helpFlag : false,
          serviceFlag : false,
          systemFlag : false,
          dataReportFlag : false
        }
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {},
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {

    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {mainComponent}
  }
</script>

<style>
  .menu{
    min-height: 37.5rem;
  }
  .left-menu {
    min-height: 37.5rem;
  }

  .left-menu li {
    line-height: 55px;
    text-align: center;
    border-bottom: solid #ccc 1px;
  }

  .left-menu li a {
    display: block;
    height: 55px;
    background: #FFF;
    color: #666;
  }

  .left-menu li a:hover {
    background: #CCC;
    color: #FFF;
  }

  .left-menu li.active a{
    background: #CCC;
    color: #FFF;
  }


  .main {
    background: #ccc;
    width: 100%;
    height: auto;
  }
</style>
