<template>
  <div class="changerPwd">
    <el-row class="row">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-d-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index/user' }">达芬奇睡袋</el-breadcrumb-item>
          <el-breadcrumb-item>密码修改</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <div class="pwdBody">
          <div class="configPwd">
            <el-input v-model.trim="configPwd" placeholder="" type="password" clearable>
              <template slot="prepend" class="prepend">原始密码</template>
            </el-input>
          </div>

          <div class="configPwd">
            <el-input v-model.trim="newPwd" placeholder="" type="password" clearable>
              <template slot="prepend" class="prepend">新密码</template>
            </el-input>
          </div>

          <div class="configPwd">
            <el-input v-model.trim="repeatPwd" placeholder="" type="password" clearable>
              <template slot="prepend" class="prepend">重复密码</template>
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
        configPwd: '',
        newPwd: '',
        repeatPwd: '',
        minlength : 4
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      update() {
        if (!this.isExist(this.configPwd)) {
          this.$message.error("原始密码不能为空");
          return;
        }
        if (!this.isExist(this.newPwd)) {
          this.$message.error("新密码不能为空");
          return;
        }
        if (this.newPwd.length < 4) {
          this.$message.error("新密码长度至少4位");
          return;
        }
        if (this.newPwd != this.repeatPwd) {
          this.$message.error("新密码和重复密码不一致");
          return;
        }

        let member=localStorage.getItem('memberInfo');
        if(this.isExist(member)){
          let memberJson = JSON.parse(member);
          this.name = memberJson.userName;
          this.roleId = memberJson.nickName;

          let url = '/api/admin/updateAdminPassWord';
          //url = '/shellApi/admin/updateAdminPassWord';
          //url = '/localApi/admin/updateAdminPassWord';
          let params = {
            "id": memberJson.id,
            "oldPassWord": this.configPwd,
            "newPassWord": this.newPwd,
            "token": memberJson.token
          };
          this.$http.post(url, params).then(function (data) {
            this.configInputValue();
            if(data.ok){
              if(data.body.result == 0){
                console.log(data.body.data);
                this.$message.success("密码修改成功");
              }else{
                if(data.body.result == 2){
                  localStorage.removeItem("memberInfo");
                  this.$router.push("/login");
                }else{
                  this.$message.error(data.body.msg);
                }
              }
            }
          }, function (err) {
            this.configInputValue();
            console.log("接口错误:", err);
          })
        }
      },
      configInputValue(){
        this.configPwd = '';
        this.newPwd = '';
        this.repeatPwd = '';
      },
      turnBack(){
        this.$router.push({path : '/index/user'});
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config", 101);

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
