<template>
  <div class="article">
    <el-card class="margin_30">
      <div slot="header" class="clearfix">
        <span>条件查询</span>
      </div>
      <el-form
        ref="formInline"
        :inline="true"
        :model="formInline"
        class="demo-form-inline"
        size="mini"
      >
        <el-form-item label="作者" prop="author">
          <el-input v-model="formInline.author" placeholder="作者" />
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="formInline.title" placeholder="标题" />
        </el-form-item>
        <el-form-item label="编辑类型" prop="editorType">
          <el-select v-model="formInline.editorType" placeholder="编辑类型">
            <el-option label="富文本" value="0" />
            <el-option label="MarkDown" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            plain
            @click="onSearch"
          >查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            size="mini"
            plain
            @click="resetForm('formInline')"
          >重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="margin_30">
      <div slot="header" class="clearfix">
        <el-button
          style="float: left"
          type="primary"
          size="mini"
          @click="addArticle"
        >新增</el-button>
      </div>
      <el-table :data="articleList" border style="width: 100%">
        <el-table-column
          type="index"
          fixed="left"
          label="#"
          align="center"
          width="60"
        />
        <el-table-column
          prop="title"
          label="文章标题"
          align="center"
          width="180"
        />
        <el-table-column
          prop="coverImg"
          label="展示图片"
          align="center"
          width="240"
        >
          <!-- 作用域插槽 -->
          <template v-slot="scope">
            <img
              class="list_img"
              :src="scope.row.coverImg"
              alt=""
              style="
                width: 100px;
                height: 100px;
                display: block;
                margin: 0 auto;
              "
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          align="center"
          width="260"
        />
        <el-table-column
          prop="author"
          label="文章作者"
          align="center"
          width="180"
        />
        <el-table-column
          prop="isShow"
          label="文章是否展示"
          align="center"
          width="180"
        >
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.isShow"
              @change="changeStatus(scope.row.id)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="editorType"
          label="内容"
          align="center"
          width="180"
        >
          <template v-slot="scope">
            <el-button type="primary" size="small" plain>{{
              scope.row.editorType
            }}</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          fixed="right"
          width="250px"
          align="center"
        >
          <template v-slot="scope">
            <el-button
              type="primary"
              size="small"
              @click="edit(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="small"
              @click="del(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        :current-page="start"
        :page-sizes="[5, 10, 20, 25]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script>
import {
  findArticles,
  changeShowStatus,
  delArticle
} from '@/api/content/article'
export default {
  data() {
    return {
      articleList: [],
      start: 1,
      limit: 10,
      total: 0,
      // 表单数据
      formInline: {
        author: '',
        collectCount: 0,
        content1: '',
        content2: '',
        coverImg: '',
        createTime: '',
        editorType: '',
        id: '',
        isShow: 0,
        modifyTime: '',
        summary: '',
        title: '',
        viewCount: 0,
        zanCount: 0
      }
    }
  },
  computed: {},
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      findArticles(this.start, this.limit, this.formInline).then((res) => {
        console.log(res)
        res.data.rows.forEach((ele) => {
          // 文章展示开关
          ele.isShow = !!ele.isShow
        })
        res.data.rows.forEach((ele) => {
          ele.editorType = ele.editorType ? 'Markdown' : '富文本'
        })
        this.articleList = res.data.rows
        this.total = res.data.total
      })
    },
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
    // 查询
    onSearch() {
      // v-model 双向更改 只需要再初始化就行
      this.init()
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    changeStatus(val) {
      console.log(val)
      var item = this.articleList.find((ele) => ele.id === val) // 找到对应的商品
      changeShowStatus({
        // 双向绑定不要再取反
        isShow: item.isShow ? 1 : 0,
        id: val
      }).then((res) => {
        this.init()
      })
    },
    // 新增
    addArticle() {
      this.$router.push('/content/article/addArticle')
    },
    // 编辑按钮
    edit(id) {
      console.log(id)
      this.$router.push(`/content/article/editAticle?id=${id}`)
    },
    // 删除按钮
    del(val) {
      this.$confirm('注意 将永久删除该文章!', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then((res) => {
        delArticle(val.id).then((res) => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.init() // 删除成功后再刷新
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
// 修改 表格高度
// ::v-deep .el-table__header tr,
//   .el-table__header th {
//     padding: 0;
//     height: 40px;
// }
// ::v-deep .el-table__body tr,
//   .el-table__body td {
//     padding: 0;
//     height: 100px;
// }
</style>
