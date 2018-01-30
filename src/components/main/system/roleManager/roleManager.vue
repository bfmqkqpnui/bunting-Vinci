<template>
  <div class="changerPwd">
    <el-row class="row">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-d-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index/user' }">达芬奇睡袋</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/index/system' }">系统配置</el-breadcrumb-item>
          <el-breadcrumb-item> 角色权限管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <div class="pwdBody">
          <div class="configPwd">
            <span>角色：总部报表角色</span>
          </div>

          <div class="configPwd">
            <span>权限项：</span>
            <el-checkbox-group v-model="checkedRoles">
              <el-checkbox v-for="role in roles" :label="role" :key="role" border></el-checkbox>
            </el-checkbox-group>
          </div>

          <div class="configPwd">
            <span>添加账户：</span>
          </div>

          <div class="configPwd">
            <el-input v-model.trim="acountName" placeholder="账户名" clearable>
            </el-input>

            <el-input v-model.trim="acountPwd" placeholder="密码" type="password" clearable>
            </el-input>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24" class="btnPostion">
        <el-button type="primary" @click="update">确认</el-button>
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
        roles: [],
        acountName : '',
        acountPwd : ''
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
                console.log(data.body.data);
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

    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>

<style>
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
    background: inherit;
    background-color: rgba(255, 255, 255, 1);
    border: none;
    border-radius: 15px;
    -moz-box-shadow: 0px 0px 5px rgba(204, 204, 204, 0.349019607843137);
    -webkit-box-shadow: 0px 0px 5px rgba(204, 204, 204, 0.349019607843137);
    box-shadow: 0px 0px 5px rgba(204, 204, 204, 0.349019607843137);
  }

  .configPwd {
    padding-top: 1.5rem;
    padding-left: 5rem;
  }

  .configPwd:last-child {
    padding-bottom: 1.5rem;
  }

  .changerPwd .row .el-input-group__prepend {
    width: 52px;
  }

  .changerPwd .row .el-input {
    /*width: 13.75rem;*/
    width: 20rem;
  }

  .btnPostion {
    text-align: center;
  }
</style>
