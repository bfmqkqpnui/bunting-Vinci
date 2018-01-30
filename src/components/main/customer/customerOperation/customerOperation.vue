<template>
  <div class="changerPwd">
    <el-row class="row">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-d-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index/user' }">达芬奇睡袋</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/index/acountManager' }">账户管理</el-breadcrumb-item>
          <el-breadcrumb-item v-if="adminId && adminId != ''">管理</el-breadcrumb-item>
          <el-breadcrumb-item v-else>新增</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <div class="pwdBody">
          <div class="configPwd">
            <span class="title">基本信息</span>
          </div>

          <div class="configPwd">
            <span>名字</span>
            <el-input v-model.trim="defaultName" placeholder="" clearable>
              <!--<template slot="prepend" class="prepend">名字</template>-->
            </el-input>

            <span>手机</span>
            <el-input v-model.trim="defaultTel" placeholder="" clearable>
              <!--<template slot="prepend" class="prepend">手机号</template>-->
            </el-input>
          </div>

          <div class="configPwd">
            <span>昵称</span>
            <el-input v-model.trim="defaultNickName" placeholder="" clearable>
              <!--<template slot="prepend" class="prepend">昵称</template>-->
            </el-input>

            <span class="">角色</span>
            <el-select v-model="roleSel" clearable placeholder="请选择角色">
              <el-option
                v-for="item in roles"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>

          <div class="configPwd">
            <span class="title">账户信息</span>
          </div>

          <div class="configPwd">
            <span>账户名</span>
            <el-input v-model.trim="accountName" placeholder="" clearable>
            </el-input>

            <span>密码</span>
            <el-input v-model.trim="accountPwd" placeholder="" type="password" clearable>
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
        adminId : '',
        defaultName : '',
        defaultTel : '',
        defaultNickName : '',
        roles : [],
        accountName : '',
        accountPwd : '',
        roleSel : ''
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      getParams() {
        // 取到路由带过来的参数
        let roleId = this.$route.query.adminId;
        // 将数据放在当前组件的数据内
        this.adminId = roleId;
      },
      queryAllRoles(){
        let member = localStorage.getItem('memberInfo');
        if (this.isExist(member)) {
          let memberJson = JSON.parse(member);

          let url = '/api/role/queryAllRoleOptions';
          let params = {
            pageIndex : 1,
            pageSize : 50,
            token : memberJson.token
          };

          this.$http.post(url, params).then(function (data) {
            if (data.ok) {
              if (data.body.result == 0) {
                let list = data.body.data.result;
                let arr = [];
                for (let i in list){
                  let json = {
                    value : list[i].id,
                    label : list[i].optionName
                  };
                  arr.push(json);
                }
                this.roles = arr;
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
      update(){

      },
      turnBack(){
        this.$router.push({path:'/index/acountManager'});
      },
      queryByAdminId(){
        if(this.adminId && this.adminId != ''){
          let member = localStorage.getItem('memberInfo');
          if (this.isExist(member)) {
            let memberJson = JSON.parse(member);

            let url = '/api/role/queryAllRoleOptions';
            let params = {
              pageIndex : 1,
              pageSize : 50,
              token : memberJson.token
            };

            this.$http.post(url, params).then(function (data) {
              if (data.ok) {
                if (data.body.result == 0) {
                 console.log(data.body);
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
      this.$emit("config",51);
      this.getParams();
      this.queryAllRoles();
      if(this.adminId && this.adminId != ''){
        console.log("00099999");
      }
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>

<style scoped>
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

  .configPwd .el-select{
    width: 20rem;
  }

  .btnPostion {
    text-align: center;
  }

  .configPwd .title{
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
    padding: 5px 10px;
    color: #fff;
    background-color: rgba(223, 74, 130, 1);
    border-radius: 20px;
    font-size: 12px;
  }

  .configPwd .selectTitle{
    background-color: #f5f7fa;
    color: #909399;
    vertical-align: middle;
    position: relative;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 6px 20px;
    width: 1px;
    white-space: nowrap;
    line-height: normal;
    border-collapse: separate;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
    display: inline-block;
    font-size: 15px;
  }
</style>
