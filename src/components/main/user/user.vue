<template>
  <div>
    <el-row class="row">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-d-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index/user' }">达芬奇睡袋</el-breadcrumb-item>
          <el-breadcrumb-item>用户</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="5" :offset="17">
        <el-input v-model="input" placeholder="用户名/手机号" class="input-with-button">
        </el-input>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="23">
        <table border="1">
          <tr align="center">
            <td width="10%">编号</td>
            <td width="15%">用户名</td>
            <td width="20%">昵称</td>
            <td width="10%">身份</td>
            <td width="10%">设备状态</td>
            <td width="15%">设备号</td>
            <td width="20%">操作</td>
          </tr>

          <tbody>
          <tr align="center" v-for="(item,index) in tableList">
            <td v-text="index+1"></td>
            <td v-text="item.userName"></td>
            <td v-text="item.nickname"></td>
            <td v-text="item.identity"></td>
            <td>{{item.bindingStatus | getDeviceStatus}}</td>
            <td v-text="item.bagDeviceCode"></td>
            <td>
              <router-link :to="{name:'userDetails',params:{userId:item.id}}">查看</router-link>
              <!--<a href="javascript:void(0)" @click="del">删除</a>-->
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
        input: '',
        resultCount: 0,     // 记录总条数
        display: 10,   // 每页显示条数
        currentPage: 1,   // 当前的页数
        tableList: []
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      config() {
        let member = localStorage.getItem('memberInfo');
        if (this.isExist(member)) {
          let memberJson = JSON.parse(member);

          let url = '/api/user/queryAll';
          let params = {
            pageIndex: this.currentPage,
            pageSize: this.display,
            token: memberJson.token
          };
          this.$http.post(url, params).then(function (data) {
            if (data.ok) {
              if (data.body.result == 0) {
                console.log(data.body)
                this.tableList = data.body.data.result;
                this.resultCount = data.body.data.resultCount;
                this.currentPage = data.body.data.pageIndex;
              } else {
                if (data.body.result == 2) {
                  localStorage.removeItem("memberInfo");
                  this.$router.push("/login");
                } else {
                  this.$message.error(data.body.msg);
                  if(data.body.result == 3){
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
      del() {
        console.log("删除方法被触发");
      },
      init(){
        this.input = '';
        this.resultCount = 0;     // 记录总条数
        this.display = 10;   // 每页显示条数
        this.currentPage = 1;   // 当前的页数
        this.tableList = [];
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
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config", 3);
      this.config();
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {pageComponent},
    filters: {
      getDeviceStatus(status) {
        let strStatus = '未绑定';
        if (!isNaN(status)) {
          if (status == 1) {
            strStatus = '已绑定';
          }
        }
        return strStatus;
      }
    }
  }
</script>

<style scoped>
  .input-with-select .el-input-group__prepend {
    background-color: #409EFF !important;
  }

  .input-with-select .el-input-group__prepend button {
    background-color: #409EFF !important;
  }
</style>
