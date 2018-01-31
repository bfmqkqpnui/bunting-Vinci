<template>
  <div>
    <el-row class="row">
      <el-col :span="6">
        <el-breadcrumb separator-class="el-icon-d-arrow-right">
          <el-breadcrumb-item :to="{ path: '/index/user' }">达芬奇睡袋</el-breadcrumb-item>
          <el-breadcrumb-item>帮助文档</el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <div class="configPwd">
          <span class="title">帮助文档</span>
        </div>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <div id="editorElem" style="text-align:left"></div>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <div class="configPwd">
          <span class="title">演示</span>
        </div>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <div class="configPwd">
          <img src="/static/images/u496.png" alt="" width="128">
        </div>
      </el-col>
    </el-row>

    <el-row class="row">
      <el-col :span="24">
        <el-button type="danger" @click="getContent" class="btn_release">确认发布</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import E from 'wangeditor'
  //Js部分尽量采用ES6语法，webpack babel插件会转义兼容
  export default {
    //组件私有数据（必须是function，而且要return对象类型）
    data() {
      return {
        editorContent: '',
        editorOption: {}
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      initEditor(){
        let editor = new E('#editorElem');
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        };
        editor.customConfig.uploadImgShowBase64 = true;
        editor.create();
      },
      getContent: function () {
        alert(this.editorContent);
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.initEditor();
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>
<style scoped>
  .configPwd .title {
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    border: 1px solid rgba(223, 74, 130, 1);
    -webkit-appearance: none;
    text-align: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    outline: 0;
    margin: 0;
    -webkit-transition: .1s;
    transition: .1s;
    font-weight: 500;
    padding: 5px 10px;
    color: #fff;
    background-color: rgba(223, 74, 130, 1);
    border-radius: 20px;
    font-size: 12px;
    cursor: default;
    width: 4.375rem;
  }

  .btn_release {
  }

</style>
