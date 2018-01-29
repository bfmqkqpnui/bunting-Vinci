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
        <el-button type="primary" plain>添加</el-button>
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
          <tr align="center">
            <td>1</td>
            <td>系统管理员</td>
            <td>权限一、权限二</td>
            <td>
              <a href="javascript:void(0)">管理</a>
              <a href="javascript:void(0)">查看</a>
              <a href="javascript:void(0)">删除</a>
            </td>
          </tr>

          <tr align="center">
            <td>2</td>
            <td>总部报表</td>
            <td>权限一</td>
            <td>
              <a href="javascript:void(0)">管理</a>
              <a href="javascript:void(0)">查看</a>
              <a href="javascript:void(0)">删除</a>
            </td>
          </tr>

          <tr align="center">
            <td>3</td>
            <td>客服</td>
            <td>权限二</td>
            <td>
              <a href="javascript:void(0)">管理</a>
              <a href="javascript:void(0)">查看</a>
              <a href="javascript:void(0)">删除</a>
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
    methods: {
      home() {
        location.reload()
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config",6);
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>

<style>

</style>
