<template>
  <div class="addArticle">
    <el-card class="margin_30">
      <div slot="header" class="clearfix">
        <span>{{ id ? '修改' : '新增' }}文章</span>
      </div>
      <el-form
        ref="addForm"
        :inline="true"
        :model="addForm"
        class="demo-form-inline"
        size="small"
        :rules="rules"
        label-width="100px"
      >
        <el-row>
          <el-col :span="8">
            <el-form-item label="作者" prop="author">
              <el-input v-model="addForm.author" placeholder="作者" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="标题" prop="title">
              <el-input v-model="addForm.title" placeholder="标题" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item>
              <span>是否显示 </span>
              <el-switch v-model="addForm.isShow" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="16">
            <el-form-item label="摘要">
              <el-input
                v-model="addForm.summary"
                placeholder="文章摘要"
                type="textarea"
                :rows="3"
                style="width: 480px"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="封面图片" />
            <el-form-item>
              <el-upload
                class="upload-demo"
                action="http://leju.bufan.cloud/lejuAdmin/material/uploadFileOss"
                :multiple="false"
                :limit="1"
                :headers="headers"
                :on-success="getImg"
              >
                <el-button size="small" type="primary">点击上传素材</el-button>
                <div slot="tip" class="el-upload__tip">
                  注意:只能上传jpg/png文件，且不超过500kb
                </div>
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item />
        <el-form-item label="切换富文本类型" label-width="110px">
          <el-radio-group v-model="addForm.editorType">
            <el-radio :label="0">富文本 </el-radio>
            <el-radio :label="1">Markdown </el-radio>
          </el-radio-group>
          <span
            class="icon"
            style="margin-left: 30px; color: #e6a23c; font-size: 10px"
          >
            <el-icon class="el-icon-warning" /> 注意!切换编辑器会清空编辑内容
          </span>
        </el-form-item>
      </el-form>
      <tinymce v-if="addForm.editorType === 0" v-model="addForm.content1" />
      <!-- <markdown-editor v-if="addForm.editorType===1" v-model="addForm.content2" /> -->
      <mavon-editor
        v-if="addForm.editorType === 1"
        ref="md"
        v-model="addForm.content1"
        @imgAdd="$imgAdd"
        @change="getContent2"
      />
      <div class="btn">
        <el-button
          type="primary"
          size="mini"
          @click="goUp()"
        >立即新增</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  addArticle,
  uploadFileOss,
  productArticle,
  updateArticle
} from '@/api/content/article'
import { getToken } from '@/utils/MyAuth'
import tinymce from '@/components/Tinymce'
// import MarkdownEditor from '@/components/MarkdownEditor'

export default {
  components: {
    tinymce
    // MarkdownEditor
  },
  data() {
    return {
      content: '',
      addForm: {
        author: '',
        collectCount: 0,
        content1: '',
        content2: '',
        coverImg: '',
        createTime: '',
        editorType: 0,
        id: '',
        isShow: false,
        modifyTime: '',
        summary: '', // 概要
        title: '',
        viewCount: 0,
        zanCount: 0
      },
      id: '',
      headers: {
        // 设置上传的请求头部
        token: getToken()
      },
      value1: '',
      // 校验规则
      rules: {
        author: [
          { required: true, message: '请输入作者姓名', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  created() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id // 根据有无id来判断页面标题修改还是新增
      productArticle(this.$route.query.id).then((res) => {
        console.log(res)
        this.addForm = res.data.productArticle
        res.data.productArticle.isShow = !!res.data.productArticle.isShow
      })
    }
  },
  mounted() {},
  methods: {
    init() {
      // addArticle().then(res => {})
    },
    getImg(res) {
      // 获取图片路径
      console.log(res)
      this.addForm.coverImg = res.data.fileUrl
    },
    // // 获取md内容 和赋值
    // etMd() {
    //   var html = this.$refs.md.getHtml()
    //   var val = this.$refs.md.getValue()
    //   return {
    //     html,
    //     val
    //   }
    // },
    // setMd(val) {
    //   this.$refs.md.setValue(val)
    // }
    // 绑定@imgAdd event
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file', $file)
      uploadFileOss(formdata).then((res) => {
        console.log(res)
        this.$refs.md.$img2Url(pos, res.data.fileUrl)
      })
      // axios({
      //   url: 'server url',
      //   method: 'post',
      //   data: formdata,
      //   headers: { 'Content-Type': 'multipart/form-data' }
      // }).then((url) => {
      //   // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
      //   /**
      //          * $vm 指为mavonEditor实例，可以通过如下两种方式获取
      //          * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
      //          * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
      //          */
      //   $vm.$img2Url(pos, url)
      // })
    },
    // 立即创建
    goUp() {
      // 注意isShow需要转换类型
      this.addForm.isShow = this.addForm.isShow ? 1 : 0
      if (!this.addForm.content1 || !this.addForm.author) {
        this.$message.warning('作者&文章内容不能为空')
        return false
      }
      if (this.id) {
        updateArticle(this.addForm).then((res) => {
          console.log(res)
        })
        this.$router.go(-1)
        return
      }
      addArticle(this.addForm).then((res) => {
        console.log(res)
      })
      this.$router.go(-1)
    },
    // 得到markdown内容
    getContent2(val, render) {
      console.log(val, render)
      this.addForm.content2 = render // markdown
    }
  }
}
</script>

<style scoped lang="scss">
.addArticle {
  .btn {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
}
</style>
