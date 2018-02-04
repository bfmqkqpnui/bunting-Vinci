<template>
  <div>
    <el-row class="row">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-d-arrow-right">
          <el-breadcrumb-item :to="{path:'/index/user'}">达芬奇睡袋</el-breadcrumb-item>
          <el-breadcrumb-item :to="{path:'/index/device'}">设备</el-breadcrumb-item>
          <el-breadcrumb-item>数据记录</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <div class="pwdBody">
          <el-row class="main-row">
            <el-col :span="1" class="btn_mar">
              <el-button type="primary" plain @click="showMember">温度</el-button>
            </el-col>

            <el-col :span="1" class="btn_mar">
              <el-button type="primary" plain @click="showBaby">姿势</el-button>
            </el-col>

            <el-col :span="1" class="btn_mar">
              <el-button type="primary" plain @click="showDevice">9轴</el-button>
            </el-col>
          </el-row>

          <el-row class="main-row">
            <el-col :span="24">
              <div class="block">
                <el-date-picker
                  v-model="dateList"
                  type="daterange"
                  @change="getDate"
                  value-format="yyyy-MM-dd"
                  range-separator="--"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期">
                </el-date-picker>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
              </div>
            </el-col>
          </el-row>

          <el-row class="main-row">
            <el-col :span="23">
              <!-- 会员 -->
              <table border="1" v-show="tableShowList.memberFlag">
                <tr align="center">
                  <td width="10%">编号</td>
                  <td width="10%">用户名</td>
                  <td width="10%">联系方式</td>
                  <td width="40%">最近使用时间</td>
                  <td width="15%">设备号</td>
                  <td width="15%">绑定宝贝</td>
                </tr>

                <tbody>
                <tr align="center">
                  <td>1</td>
                  <td>张先生</td>
                  <td>15589658956</td>
                  <td>2018-01-12 15:25:26</td>
                  <td>1256</td>
                  <td>candy</td>
                </tr>

                <tr align="center">
                  <td>2</td>
                  <td>赵先生</td>
                  <td>15589658956</td>
                  <td>2018-01-12 15:25:26</td>
                  <td>1256</td>
                  <td>candy</td>
                </tr>

                <tr align="center">
                  <td>3</td>
                  <td>李女士</td>
                  <td>15589658956</td>
                  <td>2018-01-12 15:25:26</td>
                  <td>1256</td>
                  <td>candy</td>
                </tr>
                </tbody>
              </table>

              <!-- 宝贝 -->
              <table border="1" v-show="tableShowList.babyFlag">
                <tr align="center">
                  <td width="10%">编号</td>
                  <td width="10%">宝贝</td>
                  <td width="20%">家长</td>
                  <td width="20%">绑定设备号</td>
                  <td width="20%">喜爱温度</td>
                  <td width="20%">喜爱姿势</td>
                </tr>

                <tbody>
                <tr align="center">
                  <td>1</td>
                  <td>candy</td>
                  <td>张先生</td>
                  <td>1568687</td>
                  <td>35℃</td>
                  <td>姿势一</td>
                </tr>
                </tbody>
              </table>

              <!-- 设备 -->
              <table border="1" v-show="tableShowList.deviceFlag">
                <tr align="center">
                  <td width="10%">编号</td>
                  <td width="15%">设备号</td>
                  <td width="35%">最近使用时间</td>
                  <td width="10%">电量</td>
                  <td width="10%">状态</td>
                  <td width="10%">设备版本</td>
                  <td width="10%">绑定用户</td>
                </tr>

                <tbody>
                <tr align="center">
                  <td>1</td>
                  <td>12423546</td>
                  <td>2017-08-23 12:23:34</td>
                  <td>56%</td>
                  <td>正常</td>
                  <td>1.0</td>
                  <td>张先生</td>
                </tr>

                <tr align="center">
                  <td>2</td>
                  <td>32473985</td>
                  <td>2017-08-23 12:23:34</td>
                  <td>89%</td>
                  <td>正常</td>
                  <td>2.0</td>
                  <td>李女士</td>
                </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
        </div>
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
        dateList: [],
        memberDataList: [],
        babyDataList: [],
        deviceDataList: [],
        tableShowList: {
          memberFlag: true,
          babyFlag: false,
          deviceFlag: false
        }
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      showMember() {
        this.tableShowList.memberFlag = true;
        this.tableShowList.babyFlag = false;
        this.tableShowList.deviceFlag = false;
      },
      showBaby() {
        this.tableShowList.memberFlag = false;
        this.tableShowList.babyFlag = true;
        this.tableShowList.deviceFlag = false;
      },
      showDevice() {
        this.tableShowList.memberFlag = false;
        this.tableShowList.babyFlag = false;
        this.tableShowList.deviceFlag = true;
      },
      search(){
        let type = '';
        if(this.tableShowList.memberFlag){
          type = "温度";
        }
        if(this.tableShowList.babyFlag){
          type = "姿势";
        }
        if(this.tableShowList.deviceFlag){
          type = "9轴";
        }
        if(this.dateList.length > 0){
          console.log("数据记录搜索:类型["+type+"],时间范围从["+this.dateList[0]+"]到["+this.dateList[1]+"]");
        }else{
          console.log("数据记录搜索:类型["+type+"],请选择时间范围");
        }
      },
      getDate(val){
        this.dateList = val;
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config", 41);
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>

<style scoped>
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

  .changerPwd .row .el-input-group__prepend {
    width: 52px;
  }

  .changerPwd .row .el-input {
    /*width: 13.75rem;*/
    width: 20rem;
  }

  .btn_mar {
    margin: 0 1rem;
  }

  .main-row {
    padding: 1rem 1rem 0 1rem;
  }

  .block{
    margin-right: 1rem;
  }
  .block, table {
    margin-left: 1rem;
  }

  table {
    margin-bottom: 1rem;
  }
</style>
