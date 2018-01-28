<template>
  <el-row class="menu">
    <el-col :span="3">
      <ul class="left-menu">
        <li :class="{active:menuSelFlag.userFlag}" @click="selMenu($event)" value="1"><a
          href="javascript:void(0)">用户</a></li>
        <li :class="{active:menuSelFlag.deviceFlag}" @click="selMenu" value="2"><a href="javascript:void(0)">设备</a></li>
        <li :class="{active:menuSelFlag.feedbackFlag}" @click="selMenu" value="3"><a href="javascript:void(0)">用户反馈</a>
        </li>
        <li :class="{active:menuSelFlag.helpFlag}" @click="selMenu" value="4"><a href="javascript:void(0)">帮助文档</a></li>
        <li :class="{active:menuSelFlag.serviceFlag}" @click="selMenu" value="5"><a href="javascript:void(0)">客服人员</a>
        </li>
        <li :class="{active:menuSelFlag.systemFlag}" @click="selMenu($event)" value="6"><a href="javascript:void(0)">系统配置</a>
        </li>
        <li :class="{active:menuSelFlag.dataReportFlag}" @click="selMenu" value="7"><a
          href="javascript:void(0)">数据报表</a></li>
      </ul>
    </el-col>
    <el-col :span="21">
      <div style="padding:1rem;min-height: 37.5rem;background: #F2F2F2;">
        <userComponent v-show="menuSelFlag.userFlag"></userComponent>
        <systemComponent v-show="menuSelFlag.systemFlag"></systemComponent>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import userComponent from '@/components/main/user/user'
  import systemComponent from '@/components/main/system/system'

  //Js部分尽量采用ES6语法，webpack babel插件会转义兼容
  export default {
    //组件私有数据（必须是function，而且要return对象类型）
    data() {
      return {
        menuSelFlag: {
          userFlag: true,
          deviceFlag: false,
          feedbackFlag: false,
          helpFlag: false,
          serviceFlag: false,
          systemFlag: false,
          dataReportFlag: false
        },

      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      selMenu(event) {
        if (event.currentTarget.value == 1) {
          this.menuSelFlag.userFlag = true;
          this.menuSelFlag.deviceFlag = false;
          this.menuSelFlag.feedbackFlag = false;
          this.menuSelFlag.helpFlag = false;
          this.menuSelFlag.serviceFlag = false;
          this.menuSelFlag.systemFlag = false;
          this.menuSelFlag.dataReportFlag = false;
        } else if (event.currentTarget.value == 2) {
          this.menuSelFlag.userFlag = false;
          this.menuSelFlag.deviceFlag = true;
          this.menuSelFlag.feedbackFlag = false;
          this.menuSelFlag.helpFlag = false;
          this.menuSelFlag.serviceFlag = false;
          this.menuSelFlag.systemFlag = false;
          this.menuSelFlag.dataReportFlag = false;
        } else if (event.currentTarget.value == 3) {
          this.menuSelFlag.userFlag = false;
          this.menuSelFlag.deviceFlag = false;
          this.menuSelFlag.feedbackFlag = true;
          this.menuSelFlag.helpFlag = false;
          this.menuSelFlag.serviceFlag = false;
          this.menuSelFlag.systemFlag = false;
          this.menuSelFlag.dataReportFlag = false;
        } else if (event.currentTarget.value == 4) {
          this.menuSelFlag.userFlag = false;
          this.menuSelFlag.deviceFlag = false;
          this.menuSelFlag.feedbackFlag = false;
          this.menuSelFlag.helpFlag = true;
          this.menuSelFlag.serviceFlag = false;
          this.menuSelFlag.systemFlag = false;
          this.menuSelFlag.dataReportFlag = false;
        } else if (event.currentTarget.value == 5) {
          this.menuSelFlag.userFlag = false;
          this.menuSelFlag.deviceFlag = false;
          this.menuSelFlag.feedbackFlag = false;
          this.menuSelFlag.helpFlag = false;
          this.menuSelFlag.serviceFlag = true;
          this.menuSelFlag.systemFlag = false;
          this.menuSelFlag.dataReportFlag = false;
        } else if (event.currentTarget.value == 6) {
          this.menuSelFlag.userFlag = false;
          this.menuSelFlag.deviceFlag = false;
          this.menuSelFlag.feedbackFlag = false;
          this.menuSelFlag.helpFlag = false;
          this.menuSelFlag.serviceFlag = false;
          this.menuSelFlag.systemFlag = true;
          this.menuSelFlag.dataReportFlag = false;
        } else if (event.currentTarget.value == 7) {
          this.menuSelFlag.userFlag = false;
          this.menuSelFlag.deviceFlag = false;
          this.menuSelFlag.feedbackFlag = false;
          this.menuSelFlag.helpFlag = false;
          this.menuSelFlag.serviceFlag = false;
          this.menuSelFlag.systemFlag = false;
          this.menuSelFlag.dataReportFlag = true;
        } else {
          this.menuSelFlag.userFlag = true;
          this.menuSelFlag.deviceFlag = false;
          this.menuSelFlag.feedbackFlag = false;
          this.menuSelFlag.helpFlag = false;
          this.menuSelFlag.serviceFlag = false;
          this.menuSelFlag.systemFlag = false;
          this.menuSelFlag.dataReportFlag = false;
        }
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {

    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {userComponent, systemComponent}
  }
</script>

<style>
  .menu {
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

  .left-menu li.active a {
    background: #CCC;
    color: #FFF;
  }

  .main {
    background: #ccc;
    width: 100%;
    height: auto;
  }

  .row {
    margin-bottom: 1.5rem;
  }

  table {
    width: 100%;
    background: #FFF;
  }

  table tr {
    height: 1.875rem;
  }

  table tr td {
    color: #666;
  }
</style>
