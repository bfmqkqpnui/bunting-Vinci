<template>
    <div class="manager">
      <el-row class="row">
        <el-col :span="6">
          <el-breadcrumb separator-class="el-icon-d-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index/user' }">达芬奇睡袋</el-breadcrumb-item>
            <el-breadcrumb-item>个人信息</el-breadcrumb-item>
          </el-breadcrumb>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="24">
          <div class="pwdBody">
            <div class="configPwd">
              <el-input v-model.trim="customName" placeholder="" class="configInput">
                <template slot="prepend">姓名</template>
              </el-input>
            </div>

            <div class="configPwd">
              <el-input v-model.trim="customNickName" placeholder="" class="configInput">
                <template slot="prepend">昵称</template>
              </el-input>
            </div>

            <div class="configPwd">
              <el-input v-model.trim="customTel" placeholder="" class="configInput">
                <template slot="prepend">手机号</template>
              </el-input>
            </div>
          </div>
        </el-col>
      </el-row>

      <el-row class="row">
        <el-col :span="24" class="btnPostion">
          <el-button type="primary" @click="update">确认</el-button>
          <el-button type="danger" plain>返回</el-button>
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
        customName: '',
        customNickName: '',
        customTel: ''
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      update(){
        if(this.isExist(this.customName)){

        }else{
          alert("姓名不能为空");
          return;
        }
        if(this.isExist(this.customNickName)){

        }else{
          alert("昵称不能为空");
          return;
        }
        if(this.isExist(this.customTel)){

        }else{
          alert("手机号不能为空");
          return;
        }
        let url = '/api/admin/updateAdminPassWord';
        let data = {
          id:'',
          oldPassWord : '',
          newPassWord : '',
          token : ''
        };
        this.$http.post(url,data).then(function(data){
          console.log(">>>>"+data);
        },function(err){
          console.log("接口错误:",err);
        })
      },
      isExist(opt) {
        let flag = false;
        if (null != opt && '' != opt && 'null' != opt && typeof opt != 'undefined') {
          flag = true;
        }
        return flag;
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config",11);
      this.customName = window.userName;
      this.customNickName = window.nickName;
      this.customTel = window.phone;
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

  .configPwd{
    padding-top:1.5rem;
    padding-left:5rem;
  }

  .configPwd:last-child{
    padding-bottom: 1.5rem;
  }

  .manager .row .el-input-group__prepend{
    width:52px;
  }

  .manager .row .el-input__inner{
    width:13.75rem;
  }
  .btnPostion{
    text-align: center;
  }
</style>
