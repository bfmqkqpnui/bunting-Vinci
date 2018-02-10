<template>
  <div>
    <el-row class="row">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-d-arrow-right">
          <el-breadcrumb-item :to="{path:'/index/user'}">达芬奇睡袋</el-breadcrumb-item>
          <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <div class="pwdBody">
          <el-row class="main-row">
            <el-col :span="1" class="btn_mar">
              <el-button type="primary" plain @click="showMember">会员</el-button>
            </el-col>

            <el-col :span="1" class="btn_mar">
              <el-button type="primary" plain @click="showBaby">宝贝</el-button>
            </el-col>

            <el-col :span="1" class="btn_mar">
              <el-button type="primary" plain @click="showDevice">设备</el-button>
            </el-col>
          </el-row>

          <el-row class="main-row" v-show="!tableShowList.babyFlag">
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
                <tr align="center" v-for="(item,index) in memberDataList">
                  <td v-text="index+1"></td>
                  <td v-text="item.user.name" v-if="item.user"></td>
                  <td v-text="item.user.userName" v-if="item.user"></td>
                  <td v-if="item.user">{{item.user.lastUpdate | formatDateTime}}</td>
                  <td v-text="item.user.bagDeviceCode" v-if="item.user && item.user.bagDeviceCode"></td>
                  <td v-else></td>
                  <td v-text="item.user.babyName" v-if="item.user && item.user.babyName"></td>
                  <td v-else></td>
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
                <tr align="center" v-for="(item,index) in babyDataList">
                  <td v-text="index+1"></td>
                  <td v-text="item.baby.nickName" v-if="item.baby && item.baby.nickName"></td>
                  <td v-else></td>
                  <td v-text="item.user.name"></td>
                  <td v-text="item.bag.deviceCode" v-if="item.bag && item.bag.deviceCode"></td>
                  <td v-else></td>
                  <td v-if="item.lovelyTemperature">{{item.lovelyTemperature | formatTemperature}}</td>
                  <td v-else></td>
                  <td v-if="item.lovelyPosture" v-text="item.lovelyPosture"></td>
                  <td v-else></td>
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
                <tr align="center" v-for="(item,index) in deviceDataList">
                  <td v-text="index+1"></td>
                  <td v-text="item.bag.deviceCode"></td>
                  <td>{{item.bag.lastUpdateTime | formatDateTime}}</td>
                  <td>{{item.bag.electricQuantity | formatElectric}}</td>
                  <td>{{item.bag.status | getBagStatus}}</td>
                  <td v-text="item.bag.firmwareVersion"></td>
                  <td v-text="item.user.name" v-if="item.user && item.user.name"></td>
                  <td v-else></td>
                </tr>
                </tbody>
              </table>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
    <el-row class="row">
      <el-col :span="24">
        <pageComponent :resultCount="resultCount" :currentPage='currentPage' @handleCurrentChange="handleCurrentChange"
                       @handleSizeChange="handleSizeChange"></pageComponent>
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
        dateList: [],
        memberDataList: [],
        babyDataList: [],
        deviceDataList: [],
        tableShowList: {
          memberFlag: true,
          babyFlag: false,
          deviceFlag: false
        },
        resultCount: 0,     // 记录总条数
        display: 10,   // 每页显示条数
        currentPage: 1,   // 当前的页数
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
        this.currentPage = 1;
        this.display = 10;
        this.dateList = [];
        this.config();
      },
      showBaby() {
        this.tableShowList.memberFlag = false;
        this.tableShowList.babyFlag = true;
        this.tableShowList.deviceFlag = false;
        this.currentPage = 1;
        this.display = 10;
        this.dateList = [];
        this.config();
      },
      showDevice() {
        this.tableShowList.memberFlag = false;
        this.tableShowList.babyFlag = false;
        this.tableShowList.deviceFlag = true;
        this.currentPage = 1;
        this.display = 10;
        this.dateList = [];
        this.config();
      },
      search() {
        this.currentPage = 1;
        this.display = 10;
        this.config();
      },
      getDate(val) {
        this.dateList = val;
      },
      handleCurrentChange(currentPage) {
        console.log(`当前页:` + currentPage);
        if (currentPage && Number(currentPage)) {
          this.currentPage = currentPage;
          this.config();
        }
      },
      handleSizeChange(pageSize) {
        console.log(`当前记录条数: ` + pageSize);
        if (pageSize && Number(pageSize)) {
          this.display = pageSize;
          this.config();
        }
      },
      config(){
        let memberInfo = this.$route.params.memberInfo;
        if(this.isExist(memberInfo)) {
          let url = '/api/analysis/queryUserAnalysis';
          if(this.tableShowList.memberFlag && !this.tableShowList.babyFlag && !this.tableShowList.deviceFlag){
            url = "/api/analysis/queryUserAnalysis";
          }else if(!this.tableShowList.memberFlag && this.tableShowList.babyFlag && !this.tableShowList.deviceFlag){
            url = "/api/analysis/queryBabyAnalysis";
          }else if(!this.tableShowList.memberFlag && !this.tableShowList.babyFlag && this.tableShowList.deviceFlag){
            url = "/api/analysis/queryBagAnalysis";
          }
          let params = {
            pageIndex : this.currentPage,
            pageSize : this.display,
            token : memberInfo.token,
            startTime : this.dateList[0],
            endTime : this.dateList[1]
          };
          this.$http.post(url, params).then(function (data) {
            if (data.ok) {
              if (data.body.result == 0) {
                console.log(data.body.data);
                this.resultCount = data.body.data.resultCount;
                this.currentPage = data.body.data.pageIndex;
                if(this.tableShowList.memberFlag){
                  this.memberDataList = data.body.data.result;
                }else if(this.tableShowList.deviceFlag){
                  this.deviceDataList = data.body.data.result;
                }else if(this.tableShowList.babyFlag){
                  this.babyDataList = data.body.data.result;
                }else{
                  this.memberDataList = data.body.data.result;
                }
              } else {
                if (data.body.result == 2) {
                  localStorage.removeItem("memberInfo");
                  this.$router.push("/login");
                } else {
                  this.$message.error(data.body.msg);
                }
              }
            }
          }, function (err) {
            console.log("接口错误:", err);
          })
        }
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config", 7);
      this.config();
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {pageComponent},
    filters: {
      formatDateTime: function (inputTime) {
        if ('' != inputTime && 'null' != inputTime && null != inputTime && typeof inputTime != "undefined") {
          let date = new Date(inputTime);
          let y = date.getFullYear();
          let m = date.getMonth() + 1;
          m = m < 10 ? ('0' + m) : m;
          let d = date.getDate();
          d = d < 10 ? ('0' + d) : d;
          let h = date.getHours();
          h = h < 10 ? ('0' + h) : h;
          let minute = date.getMinutes();
          let second = date.getSeconds();
          minute = minute < 10 ? ('0' + minute) : minute;
          second = second < 10 ? ('0' + second) : second;
          return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
        } else {
          return "";
        }
      },
      formatTemperature(val){
        if(!isNaN(val)){
          return val + "℃";
        }else{
          return "";
        }
      },
      getBagStatus(val){
        let status = '正常';
        if(!isNaN(val) && val == 0){
          status = '停用';
        }
        return status;
      },
      formatElectric(val){
        let ele = '';
        if(!isNaN(val)){
          ele = val + '%';
        }
        return ele;
      }
    }
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

  .block {
    margin-right: 1rem;
  }

  .block, table {
    margin-left: 1rem;
  }

  table {
    margin-bottom: 1rem;
  }
</style>
