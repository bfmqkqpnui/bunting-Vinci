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
        <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
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
          <tr align="center" v-for="(item,index) in tableList">
            <td>
              <el-checkbox v-model="checkedList" :label="item.bagId" :key="index">{{index+1}}</el-checkbox>
            </td>
            <td v-text="item.user.name" v-if="item.user"></td>
            <td v-else></td>
            <td v-text="item.user.nickname" v-if="item.user"></td>
            <td v-else></td>
            <td v-text="item.user.userName" v-if="item.user"></td>
            <td v-else></td>
            <td v-text="item.user.identity" v-if="item.user"></td>
            <td v-else></td>
            <td>{{item.bindingStatus | getDeviceStatus}}</td>
            <td v-text="item.bag.deviceCode"></td>
            <td>
              <router-link :to="{name:'deviceData'}">查看</router-link>
              <a href="javascript:void(0)" @click="delById(item.bagId)">删除</a>
            </td>
          </tr>
          </tbody>
        </table>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <pageComponent :resultCount="resultCount" :currentPage='currentPage' @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange"></pageComponent>
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
        tableList : []
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      delAll() {
        let memberInfo = this.$route.params.memberInfo;
        if(this.isExist(memberInfo)) {
          console.log(this.checkedList);
          let url = '/api/bag/multiDelete';
          let params = {
            id : this.checkedList.toString(),
            token: memberInfo.token
          };

          this.$http.post(url, params).then(function (data) {
            if (data.ok) {
              if (data.body.result == 0) {
                console.log(data.body);
                alert(data.body.msg);
                this.config();
              } else {
                if (data.body.result == 2) {
                  localStorage.removeItem("memberInfo");
                  this.$router.push("/login");
                } else {
                  alert(data.body.msg);
                }
              }
            }
          }, function (err) {
            console.log("接口错误:", err);
          })

        }
      },
      delById(id){
        let memberInfo = this.$route.params.memberInfo;
        if(this.isExist(memberInfo)) {
          console.log(id);

          let url = '/api/bag/multiDelete';
          let params = {
            id : id,
            token: memberInfo.token
          };

          this.$http.post(url, params).then(function (data) {
            if (data.ok) {
              if (data.body.result == 0) {
                console.log(data.body);
                alert(data.body.msg);
                this.config();
              } else {
                if (data.body.result == 2) {
                  localStorage.removeItem("memberInfo");
                  this.$router.push("/login");
                } else {
                  alert(data.body.msg);
                }
              }
            }
          }, function (err) {
            console.log("接口错误:", err);
          })
        }
      },
      config(){
        let memberInfo = this.$route.params.memberInfo;
        if(this.isExist(memberInfo)) {
          let url = '/api/bag/queryAll';
          let params = {
            pageIndex: this.currentPage,
            pageSize : this.display,
            token: memberInfo.token
          };
          if(this.isExist(this.deviceNum)){
            params.deviceCode = this.deviceNum;
          }
          if(this.isExist(this.selStatus)){
            params.bindingStatus = this.selStatus;
          }

          this.$http.post(url, params).then(function (data) {
            if (data.ok) {
              if (data.body.result == 0) {
                console.log(data.body);
                this.tableList = data.body.data.result;
                this.resultCount = data.body.data.resultCount;
                this.currentPage = data.body.data.pageIndex;
              } else {
                if (data.body.result == 2) {
                  localStorage.removeItem("memberInfo");
                  this.$router.push("/login");
                } else {
                  alert(data.body.msg);
                }
              }
            }
          }, function (err) {
            console.log("接口错误:", err);
          })
        }
      },
      handleCurrentChange(currentPage){
        console.log(`当前页:`+currentPage);
        if(currentPage && Number(currentPage)){
          this.currentPage = currentPage;
          this.config();
        }
      },
      handleSizeChange(pageSize){
        console.log(`当前记录条数: `+pageSize);
        if(pageSize && Number(pageSize)){
          this.display = pageSize;
          this.config();
        }
      },
      search(){
        let memberInfo = this.$route.params.memberInfo;
        if(this.isExist(memberInfo)) {
          console.log("搜索触发条件:设备号["+this.deviceNum+"],设备状态["+this.selStatus+"],查询当前页码数["+this.currentPage+"],查询每页展示的记录条数["+this.display+"]");
        }
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.$emit("config", 4);
      this.config();
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {pageComponent},
    filters:{
      getDeviceStatus(status){
        var strStatus = '未绑定';
        if(status == 1){
          strStatus = '已绑定';
        }
        return strStatus;
      }
    }
  }
</script>

<style>
  .discount {
    margin: 0 1rem;
  }
</style>
