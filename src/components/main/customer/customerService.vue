<template>
  <div>
    <el-row class="row">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-d-arrow-right">
          <el-breadcrumb-item :to="{path:'/index/user'}">达芬奇睡袋</el-breadcrumb-item>
          <el-breadcrumb-item>账户管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="6">
        <el-button type="primary" plain @click="add">添加</el-button>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="23">
        <table border="1">
          <tr align="center">
            <td width="10%">编号</td>
            <td width="10%">姓名</td>
            <td width="20%">联系方式</td>
            <td width="10%">账户名</td>
            <td width="10%">角色</td>
            <td width="10%">状态</td>
            <td width="30%">操作</td>
          </tr>

          <tbody>
          <tr align="center" v-for="(item,index) in tableList">
            <td v-text="index+1"></td>
            <td v-text="item.name"></td>
            <td v-text="item.phone"></td>
            <td v-text="item.userName"></td>
            <td v-text="item.role.roleName"></td>
            <td >{{item.status | showAccountStatus}}</td>
            <td>
              <router-link :to="{name:'acountOperation',params:{adminId:item.id}}">管理</router-link>
              <a href="javascript:void(0)" @click="setAccountStatus(1,item.id)">启用</a>
              <a href="javascript:void(0)" @click="setAccountStatus(0,item.id)">禁用</a>
            </td>
          </tr>
          </tbody>
        </table>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <pageComponent :resultCount="resultCount" :currentPage='currentPage' @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pageComponent>
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
      config(pageIndex,pageSize) {
        let member = localStorage.getItem('memberInfo');
        if (this.isExist(member)) {
          let memberJson = JSON.parse(member);

          let url = '/api/admin/queryAllPage';
          let params = {
            pageIndex : pageIndex || 1,
            pageSize : pageSize || 10,
            token: memberJson.token
          };

          this.$http.post(url, params).then(function (data) {
            if (data.ok) {
              if (data.body.result == 0) {
                console.log(data.body);
                this.tableList = data.body.data.result;
                this.resultCount = data.body.data.resultCount;
                this.currentPage = data.body.data.pageIndex;
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
      handleCurrentChange(currentPage){
        console.log(`当前页:`+currentPage);
        if(currentPage && Number(currentPage)){
          this.currentPage = currentPage;
          this.config(this.currentPage,this.display);
        }
      },
      handleSizeChange(pageSize){
        console.log(`当前记录条数: `+pageSize);
        if(pageSize && Number(pageSize)){
          this.display = pageSize;
          this.config(this.currentPage,this.display);
        }
      },
      add(){
        this.$router.push({path:'/index/acountManager/acountOperation'})
      },
      setAccountStatus(status,adminId){
        let member = localStorage.getItem('memberInfo');
        if(!isNaN(status) && this.isExist(member) && this.isExist(adminId)){
          let memberJson = JSON.parse(member);
          let url = '/api/admin/updateAdminStatus';

          let params = {
            id : adminId,
            status : status,
            token : memberJson.token
          };

          this.$http.post(url, params).then(function (data) {
            if (data.ok) {
              if (data.body.result == 0) {
                this.$message.success(data.body.msg);
                this.config(this.currentPage,this.display);
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
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config",2);
      this.config(this.currentPage,this.display);
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {pageComponent},
    filters:{
      showAccountStatus(status){
        let strStatus = '';
        if(typeof status == 'number'){
          if(status == 0){
            strStatus = '禁用';
          }else{
            strStatus = '启用';
          }
        }else{
          strStatus = '启用';
        }
        return strStatus;
      }
    }
  }
</script>

<style>

</style>
