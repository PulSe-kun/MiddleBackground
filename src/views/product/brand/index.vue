<template>
  <div class="article">
    <el-card class="margin_30">
      <div slot="header" class="clearfix">
        <el-button
          style="float: left"
          type="primary"
          size="mini"
          @click="add"
        >新增</el-button>
      </div>
      <el-table :data="datalist" border style="width: 100%">
        <el-table-column
          type="index"
          fixed="left"
          label="序号"
          align="center"
          width="60"
        />
        <el-table-column
          prop="name"
          label="品牌名称"
          align="center"
          width="160"
        />
        <el-table-column
          prop="showStatus "
          label="展示状态"
          align="center"
          width="160"
        >
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.showStatus"
              @change="changeStatus(scope.row.id)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="logo " label="logo" align="center" width="200">
          <!-- 作用域插槽 -->
          <template v-slot="scope">
            <img
              class="list_img"
              :src="scope.row.logo"
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
          prop="bigPic"
          label="专区大图"
          align="center"
          width="200"
        >
          <!-- 作用域插槽 -->
          <template v-slot="scope">
            <img
              class="list_img"
              :src="scope.row.bigPic"
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
          prop="brandStory"
          label="品牌故事"
          align="center"
          width="160"
        />

        <el-table-column
          prop="createTime"
          label="添加时间"
          align="center"
          width="240"
        />
        <el-table-column prop="sort" label="排序" align="center" width="120" />
        <el-table-column
          prop="productCount"
          label="产品数量"
          align="center"
          width="120"
        />
        <el-table-column
          prop="productCommentCount"
          label="产品评论数量"
          align="center"
          width="120"
        />
        <el-table-column
          prop="factoryStatus"
          label="是否品牌制造商"
          align="center"
          width="120"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="160px"
          align="center"
        >
          <template v-slot="scope">
            <el-button
              type="primary"
              size="small"
              @click="edit(scope.row)"
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
    <el-dialog title="品牌详情" :visible.sync="dialogFormVisible" @close="closed">
      <el-form ref="brandList" :model="brandList" :rules="rules">
        <el-row>
          <el-col :span="12">
            <el-form-item label="品牌名称" :label-width="formLabelWidth" prop="name">
              <el-input v-model="brandList.name" autocomplete="off" placeholder="品牌名称" />
            </el-form-item>
          </el-col>
          <el-col
            :span="12"
          ><el-form-item label="首字母" :label-width="formLabelWidth">
            <el-input
              v-model="brandList.firstLetter"
              autocomplete="off"
              placeholder="首字母"
            /> </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input v-model="brandList.sort" autocomplete="off" placeholder="排序" />
            </el-form-item>
          </el-col>
          <el-col
            :span="12"
          ><el-form-item label="产品数量" :label-width="formLabelWidth">
            <el-input
              v-model="brandList.productCount"
              autocomplete="off"
              placeholder="产品数量"
            /> </el-form-item></el-col>
          <el-col
            :span="12"
          ><el-form-item label="是否展示" :label-width="formLabelWidth">
            <el-switch v-model="brandList.showStatus" />
          </el-form-item>
          </el-col>
          <el-col
            :span="12"
          ><el-form-item
            label="是否为品牌制造商"
            :label-width="formLabelWidth"
          >
            <el-switch v-model="brandList.factoryStatus" /> </el-form-item></el-col>
          <el-col :span="12">
            <el-form-item label="上传专区大图" :label-width="formLabelWidth">
              <el-upload
                action="http://leju.bufan.cloud/lejuAdmin/material/uploadFileOss"
                list-type="picture-card"
                :multiple="false"
                :limit="1"
                :headers="headers"
                :on-success="getBigPic"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="brandList.bigPic" :src="brandList.bigPic" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="上传logo" :label-width="formLabelWidth">
              <el-upload
                action="http://leju.bufan.cloud/lejuAdmin/material/uploadFileOss"
                list-type="picture-card"
                :multiple="false"
                :limit="1"
                :headers="headers"
                :on-success="getLogo"
                :before-upload="beforeAvatarUpload"
              >
                <img v-if="brandList.logo" :src="brandList.logo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="sure">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addBrand,
  delBrand,
  findBrandByPage,
  switchShowStatus,
  updateBrand
} from '@/api/product/brand'
import mixin from '@/mixin'
export default {
  mixins: [mixin],
  data() {
    return {
      brandList: {
        bigPic: '',
        brandStory: '',
        createTime: '',
        factoryStatus: 0, // 是否品牌商
        firstLetter: '',
        id: '',
        logo: '',
        modifyTime: '',
        name: '',
        productCommentCount: '',
        productCount: '',
        showStatus: 0, // 是否展示
        sort: ''
      },
      dialogFormVisible: false,
      formLabelWidth: '110px',
      dialogVisible: false,
      rules: {
        name: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
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
      findBrandByPage(this.start, this.limit).then((res) => {
        console.log(res)
        res.data.rows.forEach((ele) => {
          // 展示开关
          ele.showStatus = !!ele.showStatus
          ele.factoryStatus = !!ele.factoryStatus
        })
        this.datalist = res.data.rows
        this.total = res.data.total
      })
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
    // 是否展示: 0-> 否 , 1-> 是 ,
    changeStatus(val) {
      console.log(val)
      var item = this.datalist.find((ele) => ele.id === val) // 找到对应的商品
      switchShowStatus({
        status: item.showStatus ? 1 : 0,
        id: val
      }).then((res) => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '修改状态成功!'
          })
          this.init()
        }
      })
    },
    // 新增
    add() {
      this.dialogFormVisible = true
    },
    // 编辑按钮
    edit(item) {
      this.dialogFormVisible = !this.dialogFormVisible
      console.log(item)
      this.brandList = item // 数据回显
    },
    // 删除按钮
    del(val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delBrand(val.id).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.init()
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 专区大图上传
    getBigPic(res) {
    // 获取图片路径
      console.log(res)
      this.brandList.bigPic = res.data.fileUrl
    },
    // logo上传
    getLogo(res) {
    // 获取图片路径
      console.log(res)
      this.brandList.logo = res.data.fileUrl
    },
    // 使用 before-upload 限制用户上传的图片格式和大小
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg' || 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isJPG) {
        this.$message.error('上传头像,只能jpg/png格式哦!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isJPG && isLt2M
    },
    // 添加确定
    sure() {
      if (!this.brandList.name) {
        this.$message.warning('标记* 内容不能为空')
        return false
      }
      if (this.brandList.id) { // 根据有无id 判断 有就是编辑;无就是新增
        this.$confirm('是否确认修改品牌?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.brandList.showStatus = this.brandList.showStatus ? 1 : 0
          this.brandList.factoryStatus = this.brandList.factoryStatus ? 1 : 0
          updateBrand(this.brandList).then(res => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '修改成功!'
              })
              this.dialogFormVisible = false // 关闭对话框
              // this.init() // 修改成功后再刷新 双向绑定可以不刷新
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消修改'
          })
          this.dialogFormVisible = false // 关闭对话框
        })
      } else {
        this.$confirm('是否确认新增品牌?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.brandList.showStatus = this.brandList.showStatus ? 1 : 0
          this.brandList.factoryStatus = this.brandList.factoryStatus ? 1 : 0
          addBrand(this.brandList).then(res => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '新增成功!'
              })
              this.dialogFormVisible = false // 关闭对话框
              this.init()
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消新增'
          })
          this.dialogFormVisible = false // 关闭对话框
        })
      }
    },
    // 弹窗关闭
    closed() {
      this.brandList = {
        bigPic: '',
        brandStory: '',
        createTime: '',
        factoryStatus: 0,
        firstLetter: '',
        id: '',
        logo: '',
        modifyTime: '',
        name: '',
        productCommentCount: '',
        productCount: '',
        showStatus: 0,
        sort: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar {
    width: 147px;
    height: 147px;
    display: block;
  }
</style>
