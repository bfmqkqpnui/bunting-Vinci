<template>
  <div>
    <el-row class="row">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-d-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index/user' }">达芬奇睡袋</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/index/user' }">用户</el-breadcrumb-item>
          <el-breadcrumb-item>用户详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <el-col :span="12">
          <div class="pwdBody info">
            <div class="configPwd top">
              <span class="title">帮助文档</span>
              <div>
                <span>用户名：</span><span>张先生</span>
              </div>

              <div>
                <span>昵称：</span><span>嗷嗷嗷</span>
              </div>

              <div>
                <span>手机号：</span><span>15586952365</span>
              </div>

              <div>
                <span>身份：</span><span>父亲</span>
              </div>

              <div>
                <img src="/static/images/u24.png" alt="" width="64">
              </div>
            </div>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="pwdBody deviceInfo">
            <div class="configPwd top">
              <span class="title">设备信息</span>
              <div>
                <span>设备ID：</span><span>22556688</span>
              </div>
              <div>
                <span>设备版本：</span><span>1.0</span>
              </div>
              <div>
                <span>设备状态：</span><span>已绑定</span>
              </div>
              <div>
                <span>绑定宝贝：</span><span>candy</span>
              </div>
              <div>
                <span>最近使用时间：</span><span>2018-01-08 20:23:00</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <div class="pwdBody babyInfo">
          <div class="configPwd top">
            <span class="title">我的宝贝</span>
            <div class="img">
              <img src="/static/images/u116.png" alt="" width="64">
            </div>
            <div class="one">
              <div>
                <span>昵称：</span><span>candy</span>
              </div>
              <div>
                <span>性别：</span><span>女</span>
              </div>
              <div>
                <span>出生日期：</span><span>2014-08-06</span>
              </div>
            </div>

            <div class="two">
              <div>
                <span>身高：</span><span>55CM</span>
              </div>
              <div>
                <span>体重：</span><span>15KG</span>
              </div>
              <div>
                <span>绑定设备号：</span><span>22556688</span>
              </div>
              <span class="title unbind">解除绑定</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>


    <el-row class="row">
      <el-col :span="24">
        <div class="pwdBody babyInfo">
          <div class="configPwd top">
            <span class="title">我的宝贝</span>
            <div class="img">
              <img src="/static/images/u102.png" alt="" width="64">
            </div>
            <div class="one">
              <div>
                <span>昵称：</span><span>bob</span>
              </div>
              <div>
                <span>性别：</span><span>男</span>
              </div>
              <div>
                <span>出生日期：</span><span>2014-01-16</span>
              </div>
            </div>

            <div class="two">
              <div>
                <span>身高：</span><span>60CM</span>
              </div>
              <div>
                <span>体重：</span><span>16KG</span>
              </div>
              <div>
                <span>绑定设备号：</span><span>--</span>
              </div>
              <!--<span class="title unbind">解除绑定</span>-->
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24" class="btnPostion">
        <el-button type="danger" plain @click="turnBack">返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  //Js部分尽量采用ES6语法，webpack babel插件会转义兼容
  export default {
    //组件私有数据（必须是function，而且要return对象类型）
    data() {
      return {
        userId : ''
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      turnBack() {
        this.$router.push({path: '/index/user'});
      },
      getParams() {
        // 取到路由带过来的参数
        let userId = this.$route.params.userId;
        // 将数据放在当前组件的数据内
        this.userId = userId;
      },
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config", 31);
      this.getParams();
      alert("用户详情:用户编号为"+this.userId);
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>

<style scoped>
  .configPwd .title {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    border: 1px solid rgba(223, 74, 130, 1);
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 3px 10px;
    color: #fff;
    background-color: rgba(223, 74, 130, 1);
    border-radius: 20px;
    font-size: 12px;
    cursor: default;
    width: 4.375rem;
  }

  .configPwd .title.unbind {
    cursor: pointer;
    color: #999;
    background-color: #FFF;
    border: 1px solid #999;
    margin-left: -1rem;
    border-radius: 4px;
  }

  .configPwd.top {
    padding: 1rem;
    position: relative;
  }

  .configPwd.top div {
    margin-top: .7rem;
  }

  .pwdBody.info .configPwd div:last-child, .pwdBody.deviceInfo .configPwd div:last-child {
    position: absolute;
    right: 1rem;
    top: 2.5rem;
  }

  .pwdBody {
    font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 13px;
    color: #333;
    text-align: left;
    line-height: normal;
    border-width: 0px;
    width: 100%;
    height: 163px;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    border: none;
    border-radius: 15px;
    -moz-box-shadow: 0px 0px 5px rgba(204, 204, 204, 0.349019607843137);
    -webkit-box-shadow: 0px 0px 5px rgba(204, 204, 204, 0.349019607843137);
    box-shadow: 0px 0px 5px rgba(204, 204, 204, 0.349019607843137);
  }

  .pwdBody.info {
    width: 95%;
  }

  .pwdBody.babyInfo {
    height: 143px;
  }

  .pwdBody.babyInfo .configPwd.top div {
    margin-top: 1rem;
  }

  .babyInfo .one, .babyInfo .two {
    position: absolute;
    left: 6rem;
    width: 100%;
  }

  .babyInfo .one {
    top: 2rem;
  }

  .babyInfo .two {
    top: 4rem;
  }

  .babyInfo .one div, .babyInfo .two div {
    display: inline-block;
    width: 10rem;
    margin-left: 1rem;
  }

  .btnPostion {
    text-align: center;
  }
</style>
