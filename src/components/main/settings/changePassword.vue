<template>
  <div>
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
            <el-input v-model.trim="configPwd" placeholder="">
              <template slot="prepend">原始密码</template>
            </el-input>
          </div>

          <div class="configPwd">
            <el-input v-model.trim="newPwd" placeholder="">
              <template slot="prepend">新密码</template>
            </el-input>
          </div>

          <div class="configPwd">
            <el-input v-model.trim="repeatPwd" placeholder="">
              <template slot="prepend">重复密码</template>
            </el-input>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24" class="btnPostion">
        <el-button type="primary">确认</el-button>
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
        configPwd: '',
        newPwd: '',
        repeatPwd: ''
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {},
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config",11);

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
    text-align: center;
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

  .el-input-group__prepend{
    width:52px;
  }

  .el-input__inner{
    width:13.75rem;
  }
  .btnPostion{
    text-align: center;
  }
</style>
