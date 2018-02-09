<template>
  <div>
    <el-row class="row">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-d-arrow-right">
          <el-breadcrumb-item :to="{path:'/index/user'}">达芬奇睡袋</el-breadcrumb-item>
          <el-breadcrumb-item>用户反馈</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row class="row">
      <!--<el-col :span="17">
        <el-button type="primary" plain @click="delSelList">删除</el-button>
      </el-col>-->

      <el-col :span="5" :offset="17">
        <el-select v-model="selStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in replyStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="23">
        <table border="1">
          <tr align="center">
            <td width="10%">编号</td>
            <td width="20%">提交时间</td>
            <td width="30%">反馈内容</td>
            <td width="10%">反馈用户</td>
            <td width="10%">状态</td>
            <td width="20%">操作</td>
          </tr>

          <tbody>
          <tr align="center" v-for="(item,index) in systemList">
            <td v-text="index+1">
              <!--<el-checkbox v-model="checkedList" :label="item.id">{{index+1}}</el-checkbox>-->
            </td>
            <td>{{item.askTime | formatDateTime}}</td>
            <td v-text="item.replyBody"></td>
            <td v-text="item.userNickName"></td>
            <td>{{item.replyFlag | getReplyStatus}}</td>
            <td>
              <router-link :to="{name:'feedbackDetail',params:{feedbackDetailId:item.id}}">查看</router-link>
              <!--<a href="javascript:void(0)" @click="delSelSimple(item.id)">删除</a>-->
            </td>
          </tr>
          </tbody>
        </table>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <pageComponent :resultCount="resultCount" :currentPage='currentPage' @handleCurrentChange="handleCurrentChange"
                       @handleSizeChange="handleSizeChange"></pageComponent>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import pageComponent from '@/components/pagination/paginationFull'
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
        resultCount: 0,     // 记录总条数
        display: 10,   // 每页显示条数
        currentPage: 1,   // 当前的页数
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      delSelList() {
        console.log("批量删除方法触发:" + this.checkedList);
      },
      delSelSimple(data) {
        console.log("单个删除方法触发:" + data);
      },
      handleCurrentChange(currentPage) {
        console.log(`当前页:` + currentPage);
        if (currentPage && Number(currentPage)) {
          this.currentPage = currentPage;
          this.config();
        }
      },
      handleSizeChange(pageSize) {
        console.log(`当前记录条数: ` + pageSize);
        if (pageSize && Number(pageSize)) {
          this.display = pageSize;
          this.config();
        }
      },
      config() {
        let memberInfo = this.$route.params.memberInfo;
        if (this.isExist(memberInfo)) {
          let url = '/api/feedback/queryAllPage';
          let params = {
            pageIndex: this.currentPage,
            pageSize: this.display,
            token: memberInfo.token,
            replyFlag : this.selStatus
          };

          this.$http.post(url, params).then(function (data) {
            if (data.ok) {
              if (data.body.result == 0) {
                console.log(data.body);
                this.systemList = data.body.data.result;
                this.resultCount = data.body.data.resultCount;
                this.currentPage = data.body.data.pageIndex;
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
      init() {
        this.selStatus = '';
        this.replyStatus = [
          {
            label: '待回复',
            value: '0'
          },
          {
            label: '已回复',
            value: '1'
          }
        ];
        this.systemList = [];
        this.checkedList = [];
        this.resultCount = 0;     // 记录总条数
        this.display = 10;   // 每页显示条数
        this.currentPage = 1;   // 当前的页数
      },
      search(){
        this.config();
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config", 5);
      this.config();
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {pageComponent},
    filters: {
      formatDateTime: function (inputTime) {
        if ('' != inputTime && 'null' != inputTime && null != inputTime && typeof inputTime != "undefined") {
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
          return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        } else {
          return "";
        }
      },
      getReplyStatus(val){
        var content = '待回复';
        if(!isNaN(val) && val == 1){
          content = '已回复';
        }
        return content;
      }
    }
  }
</script>

<style>

</style>
