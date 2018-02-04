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
        <el-input v-model="input" placeholder="用户名/手机号"></el-input>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="23">
        <table border="1">
          <tr align="center">
            <td width="5%">#</td>
            <td width="15%">用户名</td>
            <td width="15%">昵称</td>
            <td width="15%">手机号</td>
            <td width="10%">身份</td>
            <td width="10%">设备状态</td>
            <td width="15%">设备号</td>
            <td width="15%">操作</td>
          </tr>

          <tbody>
          <tr align="center" v-for="(item,index) in tableList">
            <td v-text="index+1"></td>
            <td v-text="item.userName"></td>
            <td v-text="item.nickname"></td>
            <td>18589568526</td>
            <td v-text="item.identity"></td>
            <td>{{item.bindingStatus | getDeviceStatus}}</td>
            <td v-text="item.bagDeviceCode"></td>
            <td>
              <router-link :to="{name:'userDetails',params:{userId:item.id}}">查看</router-link>
              <a href="javascript:void(0)">删除</a>
            </td>
          </tr>

          <!--<tr align="center">
            <td>2</td>
            <td>李女士</td>
            <td>啦啦啦</td>
            <td>15525698569</td>
            <td>母亲</td>
            <td>未绑定</td>
            <td>&#45;&#45;</td>
            <td><a href="javascript:void(0)">查看</a> <a href="javascript:void(0)">删除</a></td>
          </tr>-->
          </tbody>
        </table>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <pageComponent :resultCount="resultCount" :currentPage='currentPage'></pageComponent>
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
        tableList : []
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
                  alert(data.body.msg);
                }
              }
            }
          }, function (err) {
            console.log("接口错误:", err);
          })

        }
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config", 3);
      this.config();
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {pageComponent},
    filters:{
      getDeviceStatus(status){
        let strStatus = '未绑定';
        if(!isNaN(status)){
          if(status == 1){
            strStatus = '已绑定';
          }
        }
        return strStatus;
      }
    }
  }
</script>

<style>

</style>
