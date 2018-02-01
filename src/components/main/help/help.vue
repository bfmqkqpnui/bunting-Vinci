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
  let editor = new E('#editorElem');
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
      initEditor() {
        // 自定义菜单配置
        editor.customConfig.menus = [
          'head',  // 标题
          'bold',  // 粗体
          'italic',  // 斜体
          'underline',  // 下划线
          'strikeThrough',  // 删除线
          'foreColor',  // 文字颜色
          'backColor',  // 背景颜色
          'justify',  // 对齐方式
          'image',  // 插入图片
        ];
        // 通过 url 参数配置 debug 模式。url 中带有 wangeditor_debug_mode=1 才会开启 debug 模式
        editor.customConfig.debug = location.href.indexOf('wangeditor_debug_mode=1') > 0;

        editor.customConfig.showLinkImg = false;
        editor.customConfig.onchange = (html) => {
          this.editorContent = html
        };
        editor.customConfig.pasteFilterStyle = false;
        editor.customConfig.uploadImgShowBase64 = false;
        editor.customConfig.uploadImgServer = '/api/upload';
        // 将图片大小限制为 50M
        editor.customConfig.uploadImgMaxSize = 50 * 1024 * 1024;
        editor.customConfig.uploadFileName = 'file';


        editor.customConfig.uploadImgHooks = {
          fail: function (xhr, editor, result) {
            // 图片上传并返回结果，但图片插入错误时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
            console.log("fail");
          },
          error: function (xhr, editor) {
            // 图片上传出错时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            console.log("error");
          },
          timeout: function (xhr, editor) {
            // 图片上传超时时触发
            // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
            console.log("timeout");
          },

          // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
          // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
          customInsert: function (insertImg, result, editor) {
            // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
            // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
            console.log("customInsert");
            // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
            let url = result.data.url;
            insertImg(url);

            // result 必须是一个 JSON 格式字符串！！！否则报错
          }
        };

        editor.create();
      },
      insertImg : function(src) {
        let img = document.createElement('img');
        img.onload = function () {
          let html = '<img src="' + src + '" style="max-width:100%;"/>';
          editor.command(null, 'insertHtml', html);

          E.log('已插入图片，地址 ' + src);
          img = null;
        };
        img.onerror = function () {
          E.error('使用返回的结果获取图片，发生错误。请确认以下结果是否正确：' + src);
          img = null;
        };
        img.src = src;
      },
      getContent: function () {
        let member = localStorage.getItem('memberInfo');
        if (this.isExist(member)) {
          let memberJson = JSON.parse(member);
          let url = '/api/help/save';
          let params = {
            body : this.editorContent,
            token : memberJson.token
          };

          this.$http.post(url, params).then(function (data) {
            if (data.ok) {
              if (data.body.result == 0) {
                console.log(data.body);
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
        let member = localStorage.getItem('memberInfo');
        if (this.isExist(member)) {
          let memberJson = JSON.parse(member);
          let url = '/api/help/query';
          let params = {
            token : memberJson.token
          };

          this.$http.post(url, params).then(function (data) {
            if (data.ok) {
              if (data.body.result == 0) {
                console.log(data.body);
                this.editorContent = data.body.data.body;
                editor.txt.html(this.editorContent);
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
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.initEditor();
      this.config();
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
