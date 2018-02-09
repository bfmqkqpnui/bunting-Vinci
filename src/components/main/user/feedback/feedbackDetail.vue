<template>
  <div>
    <el-row class="row">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-d-arrow-right">
          <el-breadcrumb-item :to="{path:'/index/user'}">达芬奇睡袋</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/index/feedback'}">用户反馈</el-breadcrumb-item>
          <el-breadcrumb-item>反馈详情</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row class="row" v-if="feedbackDetailId && feedbackDetailId != ''">
      <el-col :span="24">
        <div class="pwdBody">
          <div class="configPwd">
            <span class="title">用户反馈</span>
            <p v-text="askBody">
            </p>
          </div>

          <div class="configPwd">
            <el-input
              type="textarea"
              :rows="6"
              resize="none"
              placeholder="回复反馈:"
              v-model="textarea">
            </el-input>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24" class="btnPostion">
        <el-button type="primary" @click="update" v-if="feedbackDetailId && feedbackDetailId != ''">确认回复</el-button>
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
        textarea: '',
        feedbackDetailId : '',
        askBody : ''
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      getParams() {
        // 取到路由带过来的参数
        let feedbackDetailId = this.$route.params.feedbackDetailId;
        // 将数据放在当前组件的数据内
        this.feedbackDetailId = feedbackDetailId;
      },
      turnBack(){
        this.$router.push({path:'/index/feedback'});
      },
      add(){
        console.log("新增方法被调用");
      },
      update(){
        console.log("更新方法被唤起");
        let memberInfo = this.$route.params.memberInfo;
        console.log(JSON.stringify(memberInfo));
        if (this.isExist(memberInfo)) {
          let url = '/api/feedback/replyFeedback';
          let params = {
            adminId : memberInfo.id,
            replyBody : this.textarea,
            token : memberInfo.token,
            id : this.feedbackDetailId
          };

          this.$http.post(url, params).then(function (data) {
            if (data.ok) {
              if (data.body.result == 0) {
                this.$message.success(data.body.msg);
                this.config();
              } else {
                if (data.body.result == 2) {
                  localStorage.removeItem("memberInfo");
                  this.$router.push("/login");
                } else {
                  this.$message.error(data.body.msg);
                  if (data.body.result == 3) {
                    this.init();
                  }
                }
              }
            }
          }, function (err) {
            console.log("接口错误:", err);
          })
        }
      },
      config(){
        let memberInfo = this.$route.params.memberInfo;
        if (this.isExist(memberInfo)) {
          let url = '/api/feedback/queryById';
          let params = {
            token : memberInfo.token,
            id : this.feedbackDetailId
          };

          this.$http.post(url, params).then(function (data) {
            if (data.ok) {
              if (data.body.result == 0) {
                console.log(data.body);
                this.askBody = data.body.data.askBody;
                this.textarea = data.body.data.replyBody;
              } else {
                if (data.body.result == 2) {
                  localStorage.removeItem("memberInfo");
                  this.$router.push("/login");
                } else {
                  this.$message.error(data.body.msg);
                  if (data.body.result == 3) {
                    this.init();
                  }
                }
              }
            }
          }, function (err) {
            console.log("接口错误:", err);
          })
        }
      },
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config", 51);
      this.getParams();
      if(this.feedbackDetailId != ''){
        this.config();
      }
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>

<style scoped>
  .configPwd {
    padding: 1rem;
  }

  .configPwd p {
    text-indent: 2em;
    margin-top: .5rem;
    line-height: 1.5rem;
  }

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
    height: auto;
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    border: none;
    border-radius: 15px;
    -moz-box-shadow: 0px 0px 5px rgba(204, 204, 204, 0.349019607843137);
    -webkit-box-shadow: 0px 0px 5px rgba(204, 204, 204, 0.349019607843137);
    box-shadow: 0px 0px 5px rgba(204, 204, 204, 0.349019607843137);
  }

  .btnPostion {
    text-align: center;
  }
</style>
