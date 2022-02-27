<template>
  <div class="material">
    <el-card class="margin_30">
      <div slot="header" class="clearfix">
        <el-upload
          class="upload-demo"
          action="http://leju.bufan.cloud/lejuAdmin/material/uploadFileOssSave"
          :multiple="false"
          :limit="1"
          :headers="headers"
          :on-success="getImg"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/png文件，且不超过500kb
          </div>
        </el-upload>
      </div>
      <div class="text item">
        <el-row :gutter="10">
          <el-col v-for="item in materialList" :key="item.id" :span="5" style="margin-bottom:10px;width: 20%;">
            <el-card :body-style="{ padding: '10px'}">
              <div slot="header" class="clearfix">
                <span class="time">创建时间:{{ item.createTime }}</span>
              </div>
              <img :src="item.ossUrl" class="image">
              <div style="">
                <div class="bottom">
                  <el-button type="danger" size="mini" style="width:100px" @click="del(item)">删除</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
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
import { findMaterialByPage, delMaterial } from '@/api/content/material'
import { getToken } from '@/utils/MyAuth'
export default {
  data() {
    return {
      materialList: [],
      start: 1,
      limit: 10,
      total: 0,
      headers: {
        // 设置上传的请求头部
        token: getToken()
      }
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
      findMaterialByPage(this.start, this.limit).then(res => {
        console.log(res)
        this.materialList = res.data.rows
        this.total = res.data.total
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
.material{
  .image{
    display: block;
    width: 100%;
    height: 240px;
  }
  .bottom{
    display: flex;
    justify-content: center;
    padding-top: 10px;
  }
}
</style>
