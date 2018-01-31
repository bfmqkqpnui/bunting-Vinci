<template>
  <el-row class="menu">
    <el-col :span="3">
      <ul class="left-menu">
        <li :class="{active:menuSelFlag.userFlag}" @click="selMenu(1)">
          <a href="javascript:void(0)">用户</a>
        </li>
        <li :class="{active:menuSelFlag.deviceFlag}" @click="selMenu(2)">
          <a href="javascript:void(0)">设备</a>
        </li>
        <li :class="{active:menuSelFlag.feedbackFlag}" @click="selMenu(3)">
          <a href="javascript:void(0)">用户反馈</a>
        </li>
        <li :class="{active:menuSelFlag.helpFlag}" @click="selMenu(4)">
          <a href="javascript:void(0)">帮助文档</a>
        </li>
        <li :class="{active:menuSelFlag.serviceFlag}" @click="selMenu(5)">
          <a href="javascript:void(0)">账户管理</a>
        </li>
        <li :class="{active:menuSelFlag.systemFlag}" @click="selMenu(6)">
          <a href="javascript:void(0)">系统配置</a>
        </li>
        <!--<li :class="{active:menuSelFlag.authorityFlag}" @click="selMenu(7)">
          <a href="javascript:void(0)">权限类目</a>
        </li>-->
        <li :class="{active:menuSelFlag.dataReportFlag}" @click="selMenu(8)" value="7">
          <a href="javascript:void(0)">数据报表</a>
        </li>
      </ul>
    </el-col>
    <el-col :span="21">
      <div style="padding:1rem;min-height: 37.5rem;background: #F2F2F2;">
        <router-view @config="config"></router-view>
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
          userFlag: false,
          deviceFlag: false,
          feedbackFlag: false,
          helpFlag: false,
          serviceFlag: false,
          systemFlag: false,
          authorityFlag: false,
          dataReportFlag: false
        },
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      selMenu(index) {
        if (index == 1) {
          this.menuSelFlag.userFlag = true;
          this.menuSelFlag.deviceFlag = false;
          this.menuSelFlag.feedbackFlag = false;
          this.menuSelFlag.helpFlag = false;
          this.menuSelFlag.serviceFlag = false;
          this.menuSelFlag.systemFlag = false;
          this.menuSelFlag.authorityFlag = false;
          this.menuSelFlag.dataReportFlag = false;
          this.$router.push("/index/user");
        } else if (index == 2) {
          this.menuSelFlag.userFlag = false;
          this.menuSelFlag.deviceFlag = true;
          this.menuSelFlag.feedbackFlag = false;
          this.menuSelFlag.helpFlag = false;
          this.menuSelFlag.serviceFlag = false;
          this.menuSelFlag.systemFlag = false;
          this.menuSelFlag.authorityFlag = false;
          this.menuSelFlag.dataReportFlag = false;
          this.$router.push("/index/device");
        } else if (index == 3) {
          this.menuSelFlag.userFlag = false;
          this.menuSelFlag.deviceFlag = false;
          this.menuSelFlag.feedbackFlag = true;
          this.menuSelFlag.helpFlag = false;
          this.menuSelFlag.serviceFlag = false;
          this.menuSelFlag.systemFlag = false;
          this.menuSelFlag.authorityFlag = false;
          this.menuSelFlag.dataReportFlag = false;
          this.$router.push("/index/feedback");
        } else if (index == 4) {
          this.menuSelFlag.userFlag = false;
          this.menuSelFlag.deviceFlag = false;
          this.menuSelFlag.feedbackFlag = false;
          this.menuSelFlag.helpFlag = true;
          this.menuSelFlag.serviceFlag = false;
          this.menuSelFlag.systemFlag = false;
          this.menuSelFlag.authorityFlag = false;
          this.menuSelFlag.dataReportFlag = false;
          this.$router.push("/index/help");
        } else if (index == 5) {
          this.menuSelFlag.userFlag = false;
          this.menuSelFlag.deviceFlag = false;
          this.menuSelFlag.feedbackFlag = false;
          this.menuSelFlag.helpFlag = false;
          this.menuSelFlag.serviceFlag = true;
          this.menuSelFlag.systemFlag = false;
          this.menuSelFlag.authorityFlag = false;
          this.menuSelFlag.dataReportFlag = false;
          this.$router.push("/index/acountManager");
        } else if (index == 6) {
          this.menuSelFlag.userFlag = false;
          this.menuSelFlag.deviceFlag = false;
          this.menuSelFlag.feedbackFlag = false;
          this.menuSelFlag.helpFlag = false;
          this.menuSelFlag.serviceFlag = false;
          this.menuSelFlag.systemFlag = true;
          this.menuSelFlag.authorityFlag = false;
          this.menuSelFlag.dataReportFlag = false;
          this.$router.push("/index/system");
        } else if (index == 7) {
          this.menuSelFlag.userFlag = false;
          this.menuSelFlag.deviceFlag = false;
          this.menuSelFlag.feedbackFlag = false;
          this.menuSelFlag.helpFlag = false;
          this.menuSelFlag.serviceFlag = false;
          this.menuSelFlag.systemFlag = false;
          this.menuSelFlag.authorityFlag = true;
          this.menuSelFlag.dataReportFlag = false;
          this.$router.push("/index/authority");
        } else if (index == 8) {
          this.menuSelFlag.userFlag = false;
          this.menuSelFlag.deviceFlag = false;
          this.menuSelFlag.feedbackFlag = false;
          this.menuSelFlag.helpFlag = false;
          this.menuSelFlag.serviceFlag = false;
          this.menuSelFlag.systemFlag = false;
          this.menuSelFlag.authorityFlag = false;
          this.menuSelFlag.dataReportFlag = true;
          this.$router.push("/index/report");
        } else {
          this.menuSelFlag.userFlag = false;
          this.menuSelFlag.deviceFlag = false;
          this.menuSelFlag.feedbackFlag = false;
          this.menuSelFlag.helpFlag = false;
          this.menuSelFlag.serviceFlag = false;
          this.menuSelFlag.systemFlag = false;
          this.menuSelFlag.authorityFlag = false;
          this.menuSelFlag.dataReportFlag = false;
        }
      },
      config(data) {
        if (data && Number(data)) {
          this.selMenu(data);
        }
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    //components: {userComponent, systemComponent}
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
