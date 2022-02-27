<template>
  <div class="category">
    <el-card class="margin_30">
      <div slot="header" class="clearfix">
        分类管理
      </div>
      <div class="text item">
        <div class="title">
          乐居分类:
        </div>
        <el-row :gutter="20">
          <el-col v-for="item in categoryList" :key="item.id" :span="6">
            <el-card :body-style="{ padding: '10px'}" style="margin:20px 0">
              <div slot="header" class="clearfix">
                <span class="time">{{ item.name }}</span>
              </div>
              <img :src="item.icon" class="image">
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="main">
        <div class="title">
          全部分类
        </div>
        <el-table
          :data="tableData"
          style="width: 100%;margin-bottom: 20px;"
          row-key="id"
          border
          default-expand-all
          :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
        >
          <el-table-column
            prop="name"
            label="菜单名称"
            width="160"
          />
          <el-table-column
            prop="icon"
            label="icon"
            width="180"
            align="center"
          >
            <template v-slot="scoped">
              <img :src="scoped.row.icon" alt="" class="icon">
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            label="分类名字"
            width="180"
            align="center"
          />
          <el-table-column
            prop="sort"
            label="排序"
            width="160"
            align="center"
          />
          <el-table-column
            prop="showStatus"
            label="显示状态"
            width="160"
            align="center"
          />
          <el-table-column
            prop="navStatus"
            label="导航栏显示"
            width="160"
            align="center"
          />
          <el-table-column
            prop="description"
            label="描述"
            width="300"
            align="center"
          />
          <el-table-column
            prop="createTime"
            label="创建时间"
            width="240"
            align="center"
          />
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
import { addCategory, delCategory, getAllCategory, updateCategory } from '@/api/product/category'
export default {
  data() {
    return {
      categoryList: [],
      tableData: []
    }
  },
  computed: {

  },
  created() {
    this.init()
  },
  mounted() {

  },
  methods: {
    init() {
      getAllCategory().then(res => {
        console.log(res)
        this.categoryList = res.data.items.find(ele => { // 查找 name为乐居
          if (ele.category.name === '乐居') {
            return ele
          }
        }).children
        var result = res.data.items.map(ele => { // 创建一个新对象
          var obj = {
            ...ele.category,
            children: ele.children
          }
          return obj
        })
        console.log(result)
        this.tableData = result
      })
    },
    getImg(res) {
      // 获取图片路径
      console.log(res)
      // this.materialList.ossUrl = res.data.ossUrl
      this.init()
    },
    handleSizeChange(val) {
      this.limit = val
      this.init()
    },
    handleCurrentChange(val) {
      this.start = val
      this.init()
    },
    // 手动上传
    // submitUpload() {
    //   this.$refs.upload.submit()
    // },
    // 删除
    del(val) {
      delMaterial(val.id).then(res => {
        console.log(res)
        if (res.success) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          this.init() // 删除成功后再刷新
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
//@import "./index.scss";
.category{
  .image{
    display: block;
    width: 100%;
    height: 300px;
  }
  .title{
    font-size: 12px;
    font-weight: bold;
  }
  .icon{
    width: 60px;
    height: 60px;
  }
}

</style>
