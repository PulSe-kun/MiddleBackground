<template>
  <div class="advertising">
    <el-card class="margin_30">
      <div slot="header" class="clearfix">
        <el-button
          style="float: left"
          type="primary"
          size="small"
          @click="add"
        >新增</el-button>
      </div>
      <el-table :data="adsList" border style="width: 100%">
        <el-table-column
          type="index"
          fixed="left"
          label="序号"
          align="center"
          width="60"
        />
        <el-table-column prop="pic" label="广告图片" align="center" width="160">
          <!-- 作用域插槽 -->
          <template v-slot="scope">
            <img
              class="list_img"
              :src="scope.row.pic"
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
        <el-table-column label="活动时间" align="center" width="260">
          <template slot-scope="scope">
            <div>开始时间: {{ scope.row.startTime }}</div>
            <div>结束时间: {{ scope.row.endTime }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="广告名称"
          align="center"
          width="200"
        />
        <el-table-column
          prop="clickCount"
          label="点击数"
          align="center"
          width="160"
        />
        <el-table-column
          prop="orderCount"
          label="下单数"
          align="center"
          width="160"
        />
        <el-table-column
          prop="type"
          label="轮播位置"
          align="center"
          width="160"
        ><template v-slot="scope">
          <p>{{ scope.row.type === 0 ? "首页轮播" : "其他" }}</p>
        </template>
        </el-table-column>
        <el-table-column
          prop="url"
          label="链接地址"
          align="center"
          width="200"
        />
        <el-table-column prop="note" label="备注" align="center" width="160" />
        <el-table-column
          prop="status"
          label="上下线状态"
          align="center"
          width="160"
        >
          <template v-slot="scope">
            <p>{{ scope.row.status === 1 ? "上线" : "下线" }}</p>
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="200px"
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
    </el-card>
    <el-dialog
      title="广告详情"
      :visible.sync="adsDialog"
      width="50%"
      @close="closed"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        :inline="false"
        size="normal"
        :rules="rules"
      >
        <el-row :gutter="10">
          <el-col :span="12" :offset="0">
            <el-form-item label="广告名称" prop="name">
              <el-input v-model="form.name" placeholder="广告名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="备注">
              <el-input v-model="form.note" placeholder="备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12" :offset="0">
            <el-form-item label="排序">
              <el-input v-model="form.sort" placeholder="排序"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="产品数量">
              <el-input
                v-model="form.orderCount"
                placeholder="产品数量"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12" :offset="0">
            <el-form-item label="链接">
              <el-input v-model="form.url" placeholder="链接"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="首页轮播位置">
              <el-select v-model="form.type" placeholder="请选择轮播位置" clearable="true">
                <el-option label="首页轮播" value="0"></el-option>
                <el-option label="其他" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12" :offset="0">
            <el-form-item label="开始时间">
              <div class="block">
                <el-date-picker
                  v-model="form.startTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd HH:MM:ss"
                  style="width: 100%"
                >
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="结束时间">
              <div class="block">
                <el-date-picker
                  v-model="form.endTime"
                  type="datetime"
                  style="width: 100%"
                  value-format="yyyy-MM-dd HH:MM:ss"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12" :offset="0">
            <el-form-item label="上下线状态">
              <el-switch
                v-model="form.status"
                @change="changeStatus"
              ></el-switch>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="图片">
              <el-upload
                action="http://leju.bufan.cloud/lejuAdmin/material/uploadFileOss"
                class="avatar-uploader"
                :show-file-list="false"
                :multiple="false"
                :limit="1"
                :headers="headers"
                :on-success="handleAvatar"
              >
                <img
                  v-if="form.pic"
                  :src="form.pic"
                  class="avatar"
                  style="width: 140px; height: 140px"
                >
                <i v-else class="el-icon-plus avatar-uploader-icon" />
              </el-upload>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div class="item">
        <el-button size="normal" @click="cancel">取消</el-button>
        <el-button
          type="primary"
          size="normal"
          @click="onSubmit"
        >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { adsList, addAds, delAds, updateAds } from '@/api/market/index'
import mixin from '@/mixin'
export default {
  mixins: [mixin],
  data() {
    return {
      adsList: [],
      adsDialog: false,
      form: {
        clickCount: '',
        createTime: '',
        endTime: '',
        id: '',
        modifyTime: '',
        name: '',
        note: '',
        orderCount: '',
        pic: '',
        productId: '',
        sort: '',
        startTime: '',
        status: true,
        type: '',
        url: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入广告名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10个字符', trigger: 'blur' }
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
      adsList().then((res) => {
        console.log(res)
        this.adsList = res.data.items
      })
    },
    add() {
      this.adsDialog = !this.adsDialog
    },
    // 图上传成功
    handleAvatar(res) {
      // 获取图片路径
      console.log(res)
      this.form.pic = res.data.fileUrl
    },
    cancel() {
      this.adsDialog = !this.adsDialog
    },
    // 上下线状态
    changeStatus(val) {
      console.log(val)
    },
    edit(val) {
      console.log(val)
      // ⚡回显前更改数据类型
      val.status = !!val.status
      val.type = ''
      this.form = val // 数据回显
      this.adsDialog = !this.adsDialog
    },
    del(val) {
      this.$confirm('注意 将永久删除该信息!', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false
      }).then((res) => {
        delAds(val.id).then((res) => {
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
    },
    // Dialog 关闭的回调
    closed() {
      this.form = {
        clickCount: '',
        createTime: '',
        endTime: '',
        id: '',
        modifyTime: '',
        name: '',
        note: '',
        orderCount: '',
        pic: '',
        productId: '',
        sort: '',
        startTime: '',
        status: true,
        type: '',
        url: ''
      }
      this.init()
    },
    // 提交
    onSubmit() {
      this.form.status = this.form.status ? 1 : 0
      if (!this.form.name) { // this.form.name==='' ()里面为布尔值 true 再执行后续代码
        this.$message.warning('广告名称不能为空!')
        return false
      }
      if (this.form.id) {
        this.$confirm('注意 将更新该信息!', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          lockScroll: false
        }).then((res) => {
          updateAds(this.form).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '更新成功!'
              })
              this.adsDialog = !this.adsDialog
              this.init() // 删除成功后再刷新
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消更新'
          })
        })
      } else {
        this.$confirm('注意 是否新增商品广告!', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          lockScroll: false
        }).then((res) => {
          addAds(this.form).then(res => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '添加成功!'
              })
              // ⚡注意添加数据后再关闭弹窗 不然双向绑定数值添加为空值
              this.adsDialog = !this.adsDialog
              this.init() // 删除成功后再刷新
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消添加'
          })
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.item {
  display: flex;
  justify-content: flex-end;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
</style>
