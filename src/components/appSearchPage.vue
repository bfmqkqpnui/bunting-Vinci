<!-- vue模板 -->
<template>
  <div >
    <div v-html="editorContent"></div>
    <!--<div>
      <el-upload
        class="upload-demo"
        action="/localApi/excelUpload"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
        <el-button size="small" type="primary">点击上传</el-button>
      </el-upload>
    </div>-->
  </div>
</template>

<script>
  //Js部分尽量采用ES6语法，webpack babel插件会转义兼容
  export default {
    //组件私有数据（必须是function，而且要return对象类型）
    data() {
      return {
        editorContent: '',
        fileList : []
      }
    },
    //计算属性
    computed: {},
    //函数集，自己封装，便于开发使用
    methods: {
      config() {
        let url = '/api/help/appQuery';
        let params = {
          //token : memberJson.token
        };
        this.$http.post(url, params).then(function (data) {
          console.log(data.body);
          if (data.ok) {
            if (data.body.result == 0) {
              console.log(data.body);
              this.editorContent = data.body.data.body;
            } else {
              this.$message.error(data.body.msg);
            }
          }
        }, function (err) {
          console.log("接口错误:", err);
        })
      },

      handleRemove(file, fileList) {
        console.log("<<<<<<<<<<"+file, fileList);
      },
      handlePreview(file) {
        console.log(file+"<<<<<<<<<<");
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
      }
    },
    //生命周期钩子：组件实例渲染完成时调用
    mounted() {
      this.config();
    },
    //要用到哪些子组件（如果组件已是最小粒度，那么可省略该属性）
    components: {}
  }
</script>

<style>

</style>
