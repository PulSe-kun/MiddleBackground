// 混入mixin 分发 Vue 组件中的可复用功能
// 定义一个混入对象
import { getToken } from '@/utils/MyAuth'
import { uploadFileOss } from '@/api/content/article'
var myMixin = {
  data() {
    return {
      datalist: [],
      start: 1,
      limit: 10,
      total: 0,
      headers: {
        // 设置上传的请求头部
        token: getToken()
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      // 每页条数
      this.limit = val
      this.init()
    },
    handleCurrentChange(val) {
      // 当前点击页
      this.start = val
      this.init()
    },
    $imgAdd(pos, $file) {
      // 将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file', $file)
      uploadFileOss(formdata).then((res) => {
        console.log(res)
        this.$refs.md.$img2Url(pos, res.data.fileUrl)
      })
    }

  }
}
export default myMixin
