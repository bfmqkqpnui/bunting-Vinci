<template>
  <div>
    <el-row class="row">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-d-arrow-right">
          <el-breadcrumb-item :to="{path:'/index/user'}">达芬奇睡袋</el-breadcrumb-item>
          <el-breadcrumb-item>用户反馈</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="18">
        <el-button type="primary" plain @click="delSelList">删除</el-button>
      </el-col>

      <el-col :span="6">
        <el-select v-model="selStatus" clearable placeholder="请选择">
          <el-option
            v-for="item in replyStatus"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="23">
        <table border="1">
          <tr align="center">
            <td width="10%">编号</td>
            <td width="20%">提交时间</td>
            <td width="30%">反馈内容</td>
            <td width="10%">反馈用户</td>
            <td width="10%">状态</td>
            <td width="20%">操作</td>
          </tr>

          <tbody>
          <tr align="center" v-for="(item,index) in systemList">
            <td v-text="index+1"></td>
            <td v-text="item.roleName"></td>
            <td>{{item.roleOptionList | showRoleName}}</td>
            <td>
              <router-link :to="{path:'/index/system/roleManager'}">管理</router-link>
              <a href="javascript:void(0)">删除</a>
            </td>
          </tr>

          <tr align="center">
            <td>
              <el-checkbox v-model="checkedList" :label="1"></el-checkbox>
            </td>
            <td>2018-01-16 15:56:23</td>
            <td>反馈信息反馈信息</td>
            <td>张先生</td>
            <td>已回复</td>
            <td>
              <router-link :to="{name:'feedbackDetail',params:{feedbackDetailId:1}}">查看</router-link>
              <a href="javascript:void(0)" @click="delSelSimple(1)">删除</a>
            </td>
          </tr>

          <tr align="center">
            <td>
              <el-checkbox v-model="checkedList" :label="2"></el-checkbox>
            </td>
            <td>2018-01-16 15:56:23</td>
            <td>反馈信息反馈信息</td>
            <td>张先生</td>
            <td>已回复</td>
            <td>
              <router-link :to="{name:'feedbackDetail',params:{feedbackDetailId:2}}">查看</router-link>
              <a href="javascript:void(0)" @click="delSelSimple(2)">删除</a>
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
      return {
        selStatus : '',
        replyStatus : [
          {
            label : '待回复',
            value : '0'
          },
          {
            label : '已回复',
            value : '1'
          }
        ],
        systemList : [],
        checkedList : []
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      delSelList(){
        console.log("批量删除方法触发:"+this.checkedList);
      },
      delSelSimple(data){
        console.log("单个删除方法触发:"+data);
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config", 5);
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>

<style>

</style>
