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

    <el-row class="row" >
      <el-col :span="24">
        <el-col :span="12">
          <div class="pwdBody info">
            <div class="configPwd top">
              <span class="title">基本信息</span>
              <div>
                <span>用户名：</span><span v-text="defaultInfo.name"></span>
              </div>

              <div>
                <span>昵称：</span><span v-text="defaultInfo.nickname"></span>
              </div>

              <div>
                <span>手机号：</span><span v-text="defaultInfo.userName"></span>
              </div>

              <div>
                <span>身份：</span><span v-text="defaultInfo.identity"></span>
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
                <span>设备ID：</span><span v-text="deviceInfo.deviceCode"></span>
              </div>
              <div>
                <span>设备版本：</span><span v-text="deviceInfo.firmwareVersion"></span>
              </div>
              <div>
                <span>设备状态：</span><span>{{deviceInfo.status | getDeviceStatus}}</span>
              </div>
              <div>
                <span>绑定宝贝：</span><span v-text="defaultInfo.babyName"></span>
              </div>
              <div>
                <span>最近使用时间：</span><span>{{deviceInfo.lastUpdateTime | formatDateTime}}</span>
              </div>
            </div>
          </div>
        </el-col>
      </el-col>
    </el-row>

    <el-row class="row" v-for="(item,index) in babyInfoList" :key="index">
      <el-col :span="24">
        <div class="pwdBody babyInfo">
          <div class="configPwd top">
            <span class="title">我的宝贝</span>
            <div class="img">
              <img src="/static/images/u102.png" alt="item.baby.sex" width="64" v-if="item.baby.sex === '男'">
              <img src="/static/images/u116.png" alt="item.baby.sex" width="64" v-if="item.baby.sex === '女'">
            </div>
            <div class="one">
              <div>
                <span>昵称：</span><span v-text="item.baby.nickName"></span>
              </div>
              <div>
                <span>性别：</span><span v-text="item.baby.sex"></span>
              </div>
              <div>
                <span>出生日期：</span><span v-text="item.baby.birthDate"></span>
              </div>
            </div>

            <div class="two">
              <div>
                <span>身高：</span><span v-text="item.baby.stature"></span><span>CM</span>
              </div>
              <div>
                <span>体重：</span><span v-text="item.baby.weight"></span><span>KG</span>
              </div>
              <div>
                <span>绑定设备号：</span><span v-show="item.bindingStatus == 0">--</span><span v-show="item.bindingStatus == 1" v-text="item.bag.deviceCode"></span>
              </div>
              <span class="title unbind" v-show="item.bindingStatus == 1" @click="unbind(item.babyId,item.bagId)">解除绑定</span>
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
        userId : '',
        defaultInfo : {},
        deviceInfo : {},
        babyInfoList : []
      }
    },
    //计算属性
    computed: {
    },
    //函数集，自己封装，便于开发使用
    methods: {
      turnBack() {
        this.$router.push({path: '/index/user'});
      },
      getParams() {
        // 取到路由带过来的参数
        this.userId  = this.$route.params.userId;
      },
      config(){
        let memberInfo = this.$route.params.memberInfo;
        if(this.isExist(memberInfo)){
          let url = '/api/user/queryById';
          let params = {
            id: this.userId,
            token: memberInfo.token
          };

          this.$http.post(url, params).then(function (data) {
            if (data.ok) {
              if (data.body.result == 0) {
                console.log(data.body);
                this.deviceInfo = data.body.data.bag;
                this.babyInfoList = data.body.data.babyBagList;
                this.defaultInfo = data.body.data.user;
              } else {
                if (data.body.result == 2) {
                  localStorage.removeItem("memberInfo");
                  this.$router.push("/login");
                } else {
                  this.$message.error(data.body.msg);
                }
              }
            }
          }, function (err) {
            console.log("接口错误:", err);
          })
        }
      },
      unbind(babyId,bagId){
        if(this.isExist(babyId) && this.isExist(bagId)){
          let memberInfo = this.$route.params.memberInfo;
          if(this.isExist(memberInfo)){
            let url = '/api/user/unbound';
            let params = {
              bagId: bagId,
              babyId:babyId,
              userId:this.userId,
              token: memberInfo.token
            };

            this.$http.post(url, params).then(function (data) {
              if (data.ok) {
                if (data.body.result == 0) {
                  console.log(data.body);
                  this.config();
                } else {
                  if (data.body.result == 2) {
                    localStorage.removeItem("memberInfo");
                    this.$router.push("/login");
                  } else {
                    this.$message.error(data.body.msg);
                  }
                }
              }
            }, function (err) {
              console.log("接口错误:", err);
            })
          }
        }else{
          console.log("解除设备绑定失败,设备号或者宝贝编号不存在"+babyId+"<<>>"+bagId);
        }
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config", 31);
      this.getParams();
      if(this.isExist(this.userId)){
        this.config();
      }
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {},
    filters:{
      getDeviceStatus(status){
        var strStatus = '未绑定';
        if(status == 1){
          strStatus = '已绑定';
        }
        return strStatus;
      },
      formatDateTime : function(inputTime){
        if('' != inputTime && 'null' !=inputTime && null != inputTime && typeof inputTime != "undefined"){
          let date = new Date(inputTime);
          let y = date.getFullYear();
          let m = date.getMonth() + 1;
          m = m < 10 ? ('0' + m) : m;
          let d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          let h = date.getHours();
          h = h < 10 ? ('0' + h) : h;
          let minute = date.getMinutes();
          let second = date.getSeconds();
          minute = minute < 10 ? ('0' + minute) : minute;
          second = second < 10 ? ('0' + second) : second;
          return y + '-' + m + '-' + d +' '+ h + ':' + minute + ':' + second;
        }else{
          return "";
        }
      }
    }
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
