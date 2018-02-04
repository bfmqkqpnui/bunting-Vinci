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

    <el-row class="row">
      <el-col :span="24">
        <div class="pwdBody">
          <div class="configPwd">
            <span class="title">用户反馈</span>
            <p>
              从用户的地域分布和消费能力等因素，来分析信封式睡袋行业的市场分布情况，并对消费规模较大的重点区域市场的消费情况进行分析。从用户的地域分布和消费能力等因素，来分析信封式睡袋行业的市场分布情况，并对消费规模较大的重点区域市场的消费情况进行分析从用户的地域分布和消费能力等因素，来分析信封式睡袋行业的市场分布情况，并对消费规模较大的重点区域市场的消费情况进行分析。</p>
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
        <el-button type="primary" @click="update" v-if="feedbackDetailId && feedbackDetailId != ''">更新</el-button>
        <el-button type="primary" @click="add" v-else>新增</el-button>
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
        selStatus: '',
        replyStatus: [
          {
            label: '待回复',
            value: '0'
          },
          {
            label: '已回复',
            value: '1'
          }
        ],
        systemList: [],
        checkedList: [],
        textarea: '',
        feedbackDetailId : ''
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
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config", 51);
      this.getParams();
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
