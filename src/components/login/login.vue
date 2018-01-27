<template>
  <div>
    <div class="panel panel-signin">
      <div class="panel-body">
        <div class="logo text-center">
          <img src="/static/images/logo-primary.png" alt="Chain Logo">
        </div>
        <br/>
        <h4 class="text-center mb5">健康小屋</h4>
        <p class="text-center">后台登录</p>

        <div class="mb30"></div>

        <div class="input-group mb15">
					<span class="input-group-addon">
            <i class="el-icon-star-off"></i>
          </span>
          <input type="text" class="form-control" placeholder="用户名" v-model="userName">
        </div>
        <!-- input-group -->
        <div class="input-group mb15">
					<span class="input-group-addon">
            <i class="el-icon-suoding2"></i>
          </span>
          <input type="password" class="form-control" placeholder="密码" v-model="pwd" @keyup.enter="login">
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
          alert("用户名不能为空");
          return;
        }
        if (!this.isExist(this.pwd)) {
          alert("密码不能为空");
          return;
        }
        let url = 'api/admin/login';
        //url = 'limo/fa/login.html';
        let data = {
          email: this.userName,
          passWord:this.pwd
        };
        data = {"userName": this.userName, "passWord": this.pwd};
        this.$http.post(url,data).then(function (data) {
          console.log(data);
          this.userName = '';
          this.pwd = '';
        }, function (err) {
          console.log("登录错误:", err);
          this.userName = 'a';
          this.pwd = '';
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
      document.body.style.backgroundColor = "#428bca";
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>

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
    height: 22.25rem;
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

  .input-group-addon {
    padding: 6px 12px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    color: #555;
    text-align: center;
    background-color: #eee;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .input-group-addon {
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    font-size: 13px;
    background-color: #f7f7f7;
  }

  .input-group .form-control:last-child, .input-group-addon:last-child, .input-group-btn:last-child > .btn, .input-group-btn:last-child > .btn-group > .btn, .input-group-btn:last-child > .dropdown-toggle, .input-group-btn:first-child > .btn:not(:first-child), .input-group-btn:first-child > .btn-group:not(:first-child) > .btn {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  button, input, optgroup, select, textarea {
    margin: 0;
    font: inherit;
    color: inherit;
  }

  input {
    line-height: normal;
  }

  .form-control {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }

  .form-control {
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
    border-radius: 3px;
    padding: 10px;
    height: auto;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    font-size: 13px;
  }

  .form-control:focus {
    border-color: #ccc;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
    outline: 0;
  }

  .input-group .form-control {
    position: relative;
    z-index: 2;
    float: left;
    width: 16.4rem;
    margin-bottom: 0;
  }

  .glyphicon {
    position: relative;
    top: 1px;
    display: inline-block;
    font-family: 'Glyphicons Halflings';
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .glyphicon-user:before {
    content: "\e008";
  }

  .glyphicon-lock:before {
    content: "\e033";
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

  .btn {
    display: inline-block;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    background-image: none;
    border: 1px solid transparent;
    border-radius: 4px;
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
