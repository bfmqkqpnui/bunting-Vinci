<!-- vue模板 -->
<template>
  <div>
    <el-row class="row">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-d-arrow-right">
          <el-breadcrumb-item :to="{path:'/index/user'}">达芬奇睡袋</el-breadcrumb-item>
          <el-breadcrumb-item>系统配置</el-breadcrumb-item>
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
            <td width="10%">#</td>
            <td width="10%">角色</td>
            <td width="50%">权限</td>
            <td width="30%">操作</td>
          </tr>

          <tbody>
          <tr align="center" v-for="(item,index) in systemList">
            <td v-text="index+1"></td>
            <td v-text="item.roleName"></td>
            <td>{{item.roleOptionList | showRoleName}}</td>
            <td>
              <router-link :to="{name:'roleManager',params:{roleId:item.id}}">管理</router-link>
              <a href="javascript:void(0)" @click="delById(item.id)">删除</a>
            </td>
          </tr>
          </tbody>
        </table>
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
        resultCount: 0,     // 记录总条数
        display: 10,   // 每页显示条数
        currentPage: 1,   // 当前的页数
        systemList: []
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

          let url = '/api/role/queryAllRole';
          let params = {
            token: memberJson.token
          };
          this.$http.post(url, params).then(function (data) {
            if (data.ok) {
              if (data.body.result == 0) {
                console.log(data.body);
                this.systemList = data.body.data;
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
      },
      add() {
        this.$router.push({path: '/index/system/roleManager'});
      },
      delById(id){
        let member = localStorage.getItem('memberInfo');
        if (this.isExist(member)) {
          let memberJson = JSON.parse(member);

          if(this.isExist(id)){
            let url = '/api/role/deleteRole';
            let params = {
              id : id,
              token : memberJson.token
            };

            this.$http.post(url, params).then(function (data) {
              if (data.ok) {
                if (data.body.result == 0) {
                  this.systemList = data.body.data;
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
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config", 1);
      this.config();
    }
    ,
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {},
    filters: {
      showRoleName(list) {
        let content = '';
        if (list && list.length > 0) {
          for (let key in list) {
            content += list[key].optionName+"、";
          }
        }
        return content.substr(0,content.length-1);
      }
    }
  }
</script>

<style>

</style>
