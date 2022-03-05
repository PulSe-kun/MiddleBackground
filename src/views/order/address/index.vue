<template>
  <div class="article">
    <el-card class="margin_30">
      <div slot="header" class="clearfix">
        <el-button
          style="float: left"
          type="primary"
          size="mini"
          @click="addAddress"
        >新增</el-button>
      </div>
      <el-table :data="addressList" border style="width: 100%">
        <el-table-column
          type="index"
          fixed="left"
          label="#"
          align="center"
          width="40"
        />
        <el-table-column
          prop="addressName"
          label="地址名称"
          align="center"
          width="200"
        />
        <el-table-column
          prop="sendStatus"
          label="默认发货地址"
          align="center"
          width="220"
        >
          <template v-slot="scope">
            <span style="margin-right: 10px">默认发货地址</span>
            <el-switch
              v-model="scope.row.sendStatus"
              @change="changeStatus(scope.row.id)"
            />
          </template>
        </el-table-column>
        <span />
        <el-table-column
          prop="name"
          label="收货人姓名"
          align="center"
          width="160"
        />
        <el-table-column
          prop="phone"
          label="收货人电话"
          align="center"
          width="160"
        />
        <el-table-column label="收货人地址" align="center" width="200">
          <template v-slot="scope">
            <p>
              {{ scope.row.province }}-{{ scope.row.city }}-{{
                scope.row.region
              }}
            </p>
          </template>
        </el-table-column>
        <el-table-column
          prop="receiveStatus"
          label="默认收货地址"
          align="center"
          width="220"
        >
          <template v-slot="scope">
            <span style="margin-right: 10px">默认收货地址</span>
            <el-switch
              v-model="scope.row.receiveStatus"
              @change="receiveStatus(scope.row.id)"
            />
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          width="200"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="150px"
          align="center"
        >
          <template v-slot="scope">
            <el-link
              type="primary"
              :underline="false"
              style="padding: 0 10px"
              @click="edit(scope.row)"
            >编辑</el-link>
            <el-link
              type="danger"
              :underline="false"
              @click="del(scope.row)"
            >删除</el-link>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 弹窗 -->
    <el-dialog
      title="地址详情"
      :visible.sync="dialogFormVisible"
      :close-on-click-modal="false"
      @close="closed"
    >
      <el-form ref="formInline" :model="formInline" :rules="rules">
        <el-form-item label="发货地址" :label-width="formLabelWidth" prop="addressName">
          <el-input
            v-model="formInline.addressName"
            autocomplete="off"
            placeholder="发货地址"
          />
        </el-form-item>
        <el-form-item
          label="
            发货人姓名"
          :label-width="formLabelWidth"
          prop="name"
        >
          <el-input
            v-model="formInline.name"
            autocomplete="off"
            placeholder="发货人姓名"
          /></el-form-item>
        <el-form-item label="发货人手机号" :label-width="formLabelWidth" prop="phone">
          <el-input
            v-model="formInline.phone"
            autocomplete="off"
            placeholder="发货人手机号"
          />
        </el-form-item>
        <el-form-item label="邮政编码" :label-width="formLabelWidth">
          <el-input
            v-model="formInline.cityCode"
            autocomplete="off"
            placeholder="邮政编码"
          />
        </el-form-item>
        <el-form-item label="收货地址" :label-width="formLabelWidth">
          <el-cascader
            v-model="selectedOptions"
            size="large"
            :options="options"
            @change="handleChange"
          />
        </el-form-item>
        <el-form-item label="详细地址" :label-width="formLabelWidth">
          <el-input
            v-model="formInline.detailAddress"
            autocomplete="off"
            placeholder="详细地址"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="sure"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addressList,
  setReceiveOne,
  setSendOne,
  companyAddress,
  save,
  update
} from '@/api/order/address'
import {
  regionDataPlus,
  CodeToText
} from 'element-china-area-data'
export default {
  data() {
    return {
      addressList: [],
      formLabelWidth: '100px',
      dialogFormVisible: false,
      formInline: {
        addressName: '',
        city: '',
        cityCode: '',
        createTime: '',
        detailAddress: '',
        id: '',
        modifyTime: '', // 更新时间
        name: '',
        phone: '',
        postCode: '',
        province: '',
        receiveStatus: 0, // 是否默认收货地址：0->否；1->是
        region: '',
        sendStatus: 0 // 默认发货地址：0->否；1->是
      },
      options: regionDataPlus, // 省市三级联动
      selectedOptions: [],
      rules: {
        addressName: [
          { required: true, message: '请输入发货地址', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入发货人姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入发货人手机号', trigger: 'blur' },
          { min: 5, max: 11, message: '长度在 5 到 11个字符', trigger: 'blur' }
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
      addressList().then((res) => {
        console.log(res)
        res.data.items.forEach((ele) => {
          // 默认发货开关
          ele.sendStatus = !!ele.sendStatus
          // 默认收获开关
          ele.receiveStatus = !!ele.receiveStatus
        })
        this.addressList = res.data.items
      })
    },
    // 修改默认发货地址
    changeStatus(id) {
      console.log(id)
      setSendOne({
        id: id
      }).then((res) => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '设置默认发货地址成功!'
          })
          this.init() // 修改成功后再刷新
        }
      })
    },
    // 修改默认收货地址
    receiveStatus(val) {
      console.log(val)
      // 找到对应的商品
      // var item = this.addressList.find(ele => ele.id === val)
      setReceiveOne({
        // receiveStatus: item.sendStatus ? 1 : 0,
        id: val
      }).then((res) => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '设置默认收货地址成功!'
          })
          this.init() // 修改成功后再刷新
        }
      })
    },
    // 新增
    addAddress() {
      this.dialogFormVisible = !this.dialogFormVisible
    },
    // 区域选择
    handleChange(val) {
      console.log(val, CodeToText[val[0]])
      this.formInline.province = CodeToText[val[0]] // 省
      this.formInline.city = CodeToText[val[1]] // 市
      this.formInline.region = CodeToText[val[2]]// 区
      this.formInline.cityCode = val.join(',')
    },
    // 添加确定
    sure() {
      if (this.formInline.id) {
        this.formInline.sendStatus = this.formInline.sendStatus ? 1 : 0
        this.formInline.receiveStatus = this.formInline.receiveStatus ? 1 : 0
        update(this.formInline).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '修改地址成功!'
          })
          this.dialogFormVisible = false
          this.init()
        })
      } else {
        save(this.formInline).then(res => {
          console.log(res)
          this.$message({
            type: 'success',
            message: '新增地址成功!'
          })
          this.dialogFormVisible = false
          this.init() // 修改成功后再刷新
        })
      }
    },
    // 弹窗关闭
    closed() {
      this.selectedOptions = []
      this.formInline = {
        addressName: '',
        city: '',
        cityCode: '',
        createTime: '',
        detailAddress: '',
        id: '',
        modifyTime: '', // 更新时间
        name: '',
        phone: '',
        postCode: '',
        province: '',
        receiveStatus: 0, // 是否默认收货地址：0->否；1->是
        region: '',
        sendStatus: 0 // 默认发货地址：0->否；1->是
      }
    },
    // 编辑按钮
    edit(item) {
      this.dialogFormVisible = true
      // 地区数据回显
      console.log(item)
      this.selectedOptions = item.cityCode.split(',')// 将字符串分割为数组
      this.formInline = item
    },
    // 删除按钮
    del(val) {
      this.$confirm('注意 将永久删除该地址!', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then((res) => {
          companyAddress(val.id).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.init() // 删除成功后再刷新
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss">
.el-link {
  font-size: 12px;
}
</style>
