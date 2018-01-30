<template>
  <div>
    <el-row class="row">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-d-arrow-right">
          <el-breadcrumb-item :to="{path:'/index/user'}">达芬奇睡袋</el-breadcrumb-item>
          <el-breadcrumb-item>客服人员</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="6">
        <el-button type="primary" plain>添加</el-button>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="23">
        <table border="1">
          <tr align="center">
            <td width="10%">#</td>
            <td width="20%">姓名</td>
            <td width="20%">联系方式</td>
            <td width="20%">账户名</td>
            <td width="30%">操作</td>
          </tr>

          <tbody>
          <tr align="center">
            <td>1</td>
            <td>张先生</td>
            <td>18568958525</td>
            <td>124656767</td>
            <td>
              <a href="javascript:void(0)">启用</a>
              <a href="javascript:void(0)">禁用</a>
            </td>
          </tr>

          <tr align="center">
            <td>2</td>
            <td>李女士</td>
            <td>18568958525</td>
            <td>3525777868</td>
            <td>
              <a href="javascript:void(0)">启用</a>
              <a href="javascript:void(0)">禁用</a>
            </td>
          </tr>

          <tr align="center">
            <td>3</td>
            <td>赵先生</td>
            <td>18568958525</td>
            <td>345787686</td>
            <td>
              <a href="javascript:void(0)">启用</a>
              <a href="javascript:void(0)">禁用</a>
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
      return {}
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {},
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {

    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>

<style>

</style>
