<template>
  <div>
    <el-row class="row">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-d-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index/user' }">达芬奇睡袋</el-breadcrumb-item>
          <el-breadcrumb-item>用户</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="5" :offset="17">
        <el-input v-model="input" placeholder="用户名/手机号"></el-input>
      </el-col>
      <el-col :span="1">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <pageComponent></pageComponent>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="23">
        <table border="1">
          <tr align="center">
            <td width="5%">#</td>
            <td width="15%">用户名</td>
            <td width="15%">昵称</td>
            <td width="15%">手机号</td>
            <td width="10%">身份</td>
            <td width="10%">设备状态</td>
            <td width="15%">设备号</td>
            <td width="15%">操作</td>
          </tr>

          <tbody>
          <tr align="center">
            <td>1</td>
            <td>张先生</td>
            <td>啊啊啊</td>
            <td>18589568526</td>
            <td>父亲</td>
            <td>已绑定</td>
            <td>55667788</td>
            <td><a href="javascript:void(0)">查看</a> <a href="javascript:void(0)">删除</a></td>
          </tr>

          <tr align="center">
            <td>2</td>
            <td>李女士</td>
            <td>啦啦啦</td>
            <td>15525698569</td>
            <td>母亲</td>
            <td>未绑定</td>
            <td>--</td>
            <td><a href="javascript:void(0)">查看</a> <a href="javascript:void(0)">删除</a></td>
          </tr>
          </tbody>
        </table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import pageComponent from '@/components/pagination/paginationFull'
  //Js部分尽量采用ES6语法，webpack babel插件会转义兼容
  export default {
    //组件私有数据（必须是function，而且要return对象类型）
    data() {
      return {
        input: ''
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {},
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config",1);
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {pageComponent}
  }
</script>

<style>

</style>
