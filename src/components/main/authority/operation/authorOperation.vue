<template>
  <div class="operation">
    <el-row class="row">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-d-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index/user' }">达芬奇睡袋</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/index/authority' }">权限类目</el-breadcrumb-item>
          <el-breadcrumb-item v-if="menuName&&menuName.length">更新权限类目</el-breadcrumb-item>
          <el-breadcrumb-item v-else>新增权限类目</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <div class="pwdBody">
          <div class="configPwd">
            <el-input v-model.trim="menuName" placeholder="" clearable>
              <template slot="prepend" class="prepend">类目名</template>
            </el-input>
          </div>

          <div class="configPwd">
            <el-select
              v-model="selOption"
              placeholder="请选择权限类目"
            >
              <el-option
                v-for="item in correlationList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
        correlationList: [
          {
            label: "系统设置",
            value: 1
          }, {
            label: '客服管理',
            value: 2
          }, {
            label: '用户管理',
            value: 3
          }, {
            label: '设备管理',
            value: 4
          }, {
            label: '用户反馈',
            value: 5
          }, {
            label: '帮助文档',
            value: 6
          }, {
            label: '数据报表',
            value: 7
          }, {
            label: '权限类目',
            value: 8
          }
        ],
        selOption: '',
        menuName: ''
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      turnBack() {
        this.$router.push({path: '/index/authority'});
      },
      update() {

      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.menuName = this.$route.query.name;
      this.selOption = this.$route.query.selValue;
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>

<style>
  .operation .row .el-input-group__prepend {
    width: 52px;
  }

  .operation .row .el-input {
    width: 20rem;
  }

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

  .btnPostion {
    text-align: center;
  }
</style>
