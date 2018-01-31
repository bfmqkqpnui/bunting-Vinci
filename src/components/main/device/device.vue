<template>
  <div>
    <el-row class="row">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-d-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index/user' }">达芬奇睡袋</el-breadcrumb-item>
          <el-breadcrumb-item>设备</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="2">
        <el-button type="primary" plain>导入设备号</el-button>
      </el-col>

      <el-col :span="2">
        <el-button type="primary" plain @click="delAll">删除</el-button>
      </el-col>

      <el-col :span="2" :offset="13">
        <el-input
          placeholder="请输入设备号"
          v-model="deviceNum"
          clearable>
        </el-input>
      </el-col>

      <el-col :span="2" class="discount">
        <el-select v-model="selStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in deviceStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>

      <el-col :span="2">
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="23">
        <table border="1">
          <tr align="center">
            <td width="10%">编号</td>
            <td width="15%">用户名</td>
            <td width="10%">昵称</td>
            <td width="15%">手机号</td>
            <td width="10%">身份</td>
            <td width="10%">设备状态</td>
            <td width="15%">设备号</td>
            <td width="20%">操作</td>
          </tr>

          <tbody>
          <tr align="center">
            <td>
              <el-checkbox v-model="checkedList" label="1"></el-checkbox>
            </td>
            <td>张先生</td>
            <td>啊啊啊</td>
            <td>18589568526</td>
            <td>父亲</td>
            <td>已绑定</td>
            <td>55667788</td>
            <td>
              <router-link :to="{path:'/index/device/deviceData'}">查看</router-link>
              <a href="javascript:void(0)">删除</a>
            </td>
          </tr>

          <tr align="center">
            <td>
              <el-checkbox v-model="checkedList" label="2"></el-checkbox>
            </td>
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

    <el-row class="row">
      <el-col :span="24">
        <pageComponent :resultCount="resultCount" :currentPage='currentPage'></pageComponent>
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
        deviceNum: '',
        deviceStatus: [
          {
            label: '未绑定',
            value: 0
          },
          {
            label: '已绑定',
            value: 1
          }
        ],
        selStatus: '',
        checkedList: [],
        resultCount: 0,     // 记录总条数
        display: 10,   // 每页显示条数
        currentPage: 1,   // 当前的页数
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      delAll() {
        console.log(this.checkedList);
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {

    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {pageComponent}
  }
</script>

<style>
  .discount {
    margin: 0 1rem;
  }
</style>
