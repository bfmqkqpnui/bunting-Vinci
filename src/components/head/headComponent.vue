<template>
  <el-row>
    <el-col :span="24">
      <!-- 导航 -->
      <div class="grid-content">
        <div class="head-img">
          <img src="/static/images/u3.png" alt="" width="50">
        </div>
        <span class="head-title">达芬奇睡袋</span>
        <div class="head-right">
          <div class="head-right-img">
            <img src="/static/images/u24.png" alt="" width="35">
          </div>
          <div class="head-right-user" @click="showSetting">
            <span>{{roleId}}</span>
            <span>{{name}}</span>
            <img src="/static/images/u12.png" alt="" height="11" width="15">
          </div>
        </div>
      </div>
      <!-- 菜单设置 -->
      <div class="setting" :class="{active:settingFlag}">
        <div class="top">
          <div @click="selectMenu(1)">
            <img src="/static/images/u15.png" alt="" width="25">
            <span class="ax_default">个人信息</span>
          </div>
          <div @click="selectMenu(2)">
              <img src="/static/images/u18.png" alt="" width="22">
              <span class="ax_default">密码修改</span>
          </div>
        </div>
        <div class="bottom">
          <div @click="selectMenu(3)">
            <img src="/static/images/u20.png" alt="" width="20">
            <span class="ax_default">退出</span>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  //Js部分尽量采用ES6语法，webpack babel插件会转义兼容
  export default {
    //组件私有数据（必须是function，而且要return对象类型）
    data() {
      return {
        settingFlag : false,
        roleId:'',
        name:''
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      showSetting(){
        this.settingFlag = !this.settingFlag;
      },
      selectMenu(data){
        if(data && Number(data)){
          this.settingFlag = false;
          if(data === 1){
            this.$router.push("/index/managerInfo");
          }else if(data === 2){
            this.$router.push("/index/changePwd");
          }else if(data === 3){
            localStorage.removeItem("memberInfo");
            this.$router.push("/login");
          }
        }
      },
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      let member=localStorage.getItem('memberInfo');
      if(this.isExist(member)){
        let memberJson = JSON.parse(member);
        this.name = memberJson.userName;
        this.roleId = memberJson.nickName;
      }

    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>

<style>
  .head {
    width: 100%;
    height: 3.75rem;
    background: #FD9DA8;
  }

  .grid-content {
    height: 3.75rem;
    background: #FD9DA8;
    line-height: 3.75rem;
    z-index: 100;
  }

  .head-img {
    position: absolute;
    top: .3125rem;
    left: .3125rem;
    display: inline-block;
    width: 3.125rem;
    height: 3.125rem;
  }

  .head-title {
    margin-left: 4rem;
    text-rendering: optimizeLegibility;
    font-feature-settings: "kern";
    -webkit-font-feature-settings: "kern";
    -moz-font-feature-settings: "kern";
    -moz-font-feature-settings: "kern=1";
    font-kerning: normal;
    font-family: '標楷體 Bold', '標楷體 Regular', '標楷體';
    font-weight: 700;
    font-style: normal;
    font-size: 1.125rem;
    color: #FFFFFF;
  }

  .head-right {
    position: absolute;
    top: 0rem;
    right: .3125rem;
    width: 10rem;
  }

  .head-right .head-right-img {
    display: inline-block;
    width: 2.1875rem;
    height: 2.1875rem;
    position: absolute;
    top: 0.78125rem;
    margin-right: 3rem;
  }

  .head-right .head-right-user {
    width: 5rem;
    height: 3rem;
    position: absolute;
    top: .375rem;
    left: 3rem;
    cursor: pointer;
  }

  .head-right .head-right-user span {
    position: absolute;
    font-family: 'Arial Negreta', 'Arial Normal', 'Arial';
    font-weight: 700;
    font-style: normal;
    font-size: 12px;
    color: #FFFFFF;
  }

  .head-right .head-right-user span:first-child {
    top: -.7rem;
  }

  .head-right .head-right-user span:nth-child(2) {
    top: .3rem;
  }

  .head-right .head-right-user img {
    position: absolute;
    top: 1.7rem;
    left: 4rem;
  }

  .setting {
    position: absolute;
    width: 126px;
    height: 139px;
    background: #FFF;
    right: 3.8rem;
    border-bottom: 1px solid #ccc;
    border-left: 1px solid #ccc;
    border-right: 1px solid #ccc;
    border-bottom-left-radius: .5rem;
    border-bottom-right-radius: .5rem;
    cursor: pointer;
    transform: translateY(-200px);
    transition: none 1s;
  }

  .setting .top {
    height: 5.875rem;
    border-bottom: solid #ccc 1px;
  }

  .setting .top div,.setting .bottom div {
    width: 100%;
    height: 2.9375rem;
    line-height: 2.9375rem;
    position: relative;
  }

  .setting .top div img,.setting .bottom div img {
    position: absolute;
    top: .8rem;
    left: 1rem;
  }

  .setting .top div span,.setting .bottom div span {
    margin-left: 3rem;
  }

  .ax_default {
    font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: normal;
    font-size: 14px;
    color: #666;
    text-align: left;
    line-height: normal;
  }

  .setting.active{
    transform: translateY(0px);
    transition: none 1s;
    z-index: 1;
  }
</style>
