<template>
  <div>
    <div class="panel panel-signin">
      <div class="panel-body">
        <div class="logo text-center">
          <img src="/static/images/logo-primary.png" alt="Chain Logo">
        </div>
        <br/>
        <h4 class="text-center mb5">达芬奇睡袋</h4>
        <p class="text-center">后台登录</p>

        <div class="mb30"></div>

        <div class="input-group mb15">
					<span class="input-group-addon">
            <i class="glyphicon glyphicon-user"></i>
          </span>
          <input type="text" class="form-control" placeholder="用户名" v-model.trim="userName">
        </div>
        <!-- input-group -->
        <div class="input-group mb15">
					<span class="input-group-addon">
            <i class="glyphicon glyphicon-lock"></i>
          </span>
          <input type="password" class="form-control" placeholder="密码" v-model.trim="pwd" @keyup.enter="login">
        </div>
        <!-- input-group -->
        <input type="hidden" name="ip" id="ip">

        <div class="clearfix">
          <div class="pull-left">
            <div class="ckbox ckbox-primary mt10">
            </div>
          </div>
          <div class="pull-right">
            <button type="button" class="btn btn-success" @click="login">
              登录 <i class="el-icon-arrow-right ml5"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //Js部分尽量采用ES6语法，webpack babel插件会转义兼容
  export default {
    //组件私有数据（必须是function，而且要return对象类型）
    data() {
      return {
        userName: '',
        pwd: ''
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      login() {
        if (!this.isExist(this.userName)) {
          this.$message.error("用户名不能为空");
          return;
        }
        if (!this.isExist(this.pwd)) {
          this.$message.error("密码不能为空");
          return;
        }
        let url = '/api/admin/login';
        //url = '/shellApi/admin/login';
        //url = 'limo/fa/login.html';
        //url = '/localApi/admin/login';
        //url = '/localApi/member/login';
        let data = {"userName": this.userName, "passWord": this.pwd};
        this.$http.post(url,data).then(function (data) {
          console.log(data.body);
          this.userName = '';
          this.pwd = '';
          if(data.ok){
            if(data.body.result == 0){
              let member = {
                id : data.body.data.id,
                headImg : data.body.data.headImg,
                name : data.body.data.name,
                nickName : data.body.data.nickName,
                userName : data.body.data.userName,
                phone : data.body.data.phone,
                //role : data.body.data.role,
                token : data.body.data.token,
                roleOptionIds : data.body.data.role.roleOptionIds.split(","),
              };
              localStorage.setItem("memberInfo",JSON.stringify(member));
              this.$router.push({path : '/index/user'});
            }else{
              this.$message.error(data.body.msg);
            }
          }
        }, function (err) {
          console.log("登录错误:", err.body);
          this.userName = '';
          this.pwd = '';
        });

      },

    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      document.body.style.backgroundColor = "#428bca";
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>

<style lang="css" src="../../../static/css/bootstrap.min.css" scoped></style>
<style>
  .panel {
    margin-bottom: 20px;
    background-color: #fff;
    border: 1px solid transparent;
    border-radius: 4px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 13px;
    color: #636E7B;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -11.125rem;
    margin-left: -200px;
  }

  .panel-signin, .panel-signup {
  }

  .panel-signin {
    width: 400px;
  }

  .panel-signin .panel-body, .panel-signup .panel-body {
    padding: 40px;
  }

  .clearfix:before, .clearfix:after, .dl-horizontal dd:before, .dl-horizontal dd:after, .container:before, .container:after, .container-fluid:before, .container-fluid:after, .row:before, .row:after, .form-horizontal .form-group:before, .form-horizontal .form-group:after, .btn-toolbar:before, .btn-toolbar:after, .btn-group-vertical > .btn-group:before, .btn-group-vertical > .btn-group:after, .nav:before, .nav:after, .navbar:before, .navbar:after, .navbar-header:before, .navbar-header:after, .navbar-collapse:before, .navbar-collapse:after, .pager:before, .pager:after, .panel-body:before, .panel-body:after, .modal-footer:before, .modal-footer:after {
    display: table;
    content: " ";
  }

  :before, :after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .text-center {
    text-align: center;
  }

  .mb5 {
    margin-bottom: 5px;
  }

  h4, .h4 {
    line-height: 24px;
    font-size: 18px;
  }

  h4, .h4, h5, .h5, h6, .h6 {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  h4, .h4, h5, .h5, h6, .h6 {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
    font-family: inherit;
    font-weight: 500;
    line-height: 1.1;
    color: inherit;
  }

  .input-group {
    position: relative;
    display: table;
    border-collapse: separate;
  }

  .input-group-addon:first-child {
    border-right: 0;
  }

  .input-group .form-control:first-child, .input-group-addon:first-child, .input-group-btn:first-child > .btn, .input-group-btn:first-child > .btn-group > .btn, .input-group-btn:first-child > .dropdown-toggle, .input-group-btn:last-child > .btn:not(:last-child):not(.dropdown-toggle), .input-group-btn:last-child > .btn-group:not(:last-child) > .btn {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .input-group-addon, .input-group-btn, .input-group .form-control {
    display: table-cell;
  }

  .input-group-addon, .input-group-btn {
    width: 1%;
    white-space: nowrap;
    vertical-align: middle;
  }


  button, input, optgroup, select, textarea {
    margin: 0;
    font: inherit;
    color: inherit;
  }

  input {
    line-height: normal;
  }


  .pull-left {
    float: left !important;
  }

  .pull-right {
    float: right !important;
  }

  button, input, optgroup, select, textarea {
    margin: 0;
    font: inherit;
    color: inherit;
  }

  button {
    overflow: visible;
  }

  button, select {
    text-transform: none;
  }

  button, html input[type=button], input[type=reset], input[type=submit] {
    -webkit-appearance: button;
    cursor: pointer;
  }

  input, button, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  .btn-success {
    color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c;
  }

  .btn {
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    line-height: 21px;
    -moz-transition: all 0.2s ease-out 0s;
    -webkit-transition: all 0.2s ease-out 0s;
    transition: all 0.2s ease-out 0s;
    padding: 8px 15px;
    border-width: 0;
  }

  .fa {
    display: inline-block;
    font-family: FontAwesome;
    font-style: normal;
    font-weight: normal;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .ml5 {
    margin-left: 5px !important;
  }

  .mb30 {
    margin-bottom: 30px;
  }

  .mb15 {
    margin-bottom: 15px;
  }
</style>
