<template>
  <div class="orderDetail">
    <el-card shadow="always" :body-style="{ padding: '30px' }">
      <div class="content">
        <div class="row">
          <div class="title">
            订单信息:
            <span>
              <el-tag :type="tagType">{{
                backDetail.status | filterVal
              }}</el-tag>
            </span>
          </div>
          <el-row :gutter="10">
            <el-col
              :span="6"
              :offset="0"
            >订单编号: {{ backDetail.orderSn }}</el-col>
            <el-col
              :span="6"
              :offset="0"
            >退单人姓名: <span>{{ backDetail.receiveMan }}</span></el-col>
            <el-col
              :span="6"
              :offset="0"
            >退单理由: <span>{{ backDetail.reason }}</span></el-col>
            <el-col
              :span="6"
              :offset="0"
            >退单描述: <span>{{ backDetail.description }}</span></el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col
              :span="12"
              :offset="0"
            >申请时间: {{ backDetail.createTime }}</el-col>
          </el-row>
        </div>
        <el-divider />
        <div class="row">
          <div class="title">退货商品:</div>
          <el-table :data="backList" border>
            <el-table-column
              prop="productPic"
              label="商品图片"
              align="center"
              width="160"
            >
              <template v-slot="scope">
                <img
                  class="list_img"
                  :src="scope.row.productPic"
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
              prop="productName"
              label="商品描述"
              align="center"
              width="200"
            />
            <el-table-column
              prop="productRealPrice"
              label="商品价格"
              align="center"
              width="160"
            />
            <el-table-column prop="productAttr" label="商品属性" align="center">
              <template v-slot="scope">
                <div style="font-size: 12px">
                  {{ scope.row.productAttr | filterGoods }}
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="productCount"
              label="商品数量"
              align="center"
              width="160"
            />
            <el-table-column
              label="总计"
              width="160px"
              align="center"
              prop="productRealPrice"
            />
          </el-table>
        </div>
        <el-divider />
        <div class="title">
          用户信息:
        </div>
        <el-row :gutter="20">
          <el-col
            :span="6"
          >联系人: {{ backDetail.returnName }}</el-col>
          <el-col
            :span="6"
          >联系电话: <span>{{ backDetail.returnPhone }}</span></el-col>
        </el-row>
        <el-divider />
        <div class="title">
          费用信息:
        </div>
        <el-row :gutter="20">
          <el-col
            :span="6"
          >退单金额: <span :class="backDetail.status == 2?'':'active'">{{ backDetail.returnAmount }}</span></el-col>
          <el-col
            :span="6"
          >运费金额: <span>0</span></el-col>
        </el-row>
        <el-divider />
        <!-- 退款 -->
        <div v-if="backDetail.status == 0" style="padding-top: 10px">
          <el-form
            ref="handleForm"
            :model="handleForm"
            :rules="handleRules"
            size="mini"
            label-position="left"
          >
            <el-row :gutter="20">
              <el-col :span="6" :offset="0">
                <el-form-item prop="returnAmount" label="退款金额">
                  <el-input-number
                    v-model="handleForm.returnAmount"
                    class="myInput"
                    placeholder=""
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  prop="handleMan"
                  label="处理人"
                  label-width="80px"
                >
                  <el-input
                    v-model="handleForm.handleMan"
                    class="myInput"
                    type="text"
                    placeholder=""
                    size="mini"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item
                  prop="handleNote"
                  label="处理备注"
                  label-width="80px"
                >
                  <el-input
                    v-model="handleForm.handleNote"
                    class="myInput"
                    type="text"
                    placeholder=""
                    size="mini"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <!-- 收货 -->
        <div v-if="backDetail.status == 1">
          <div class="row">
            <div class="title">处理结果:</div>
            <el-row :gutter="20">
              <el-col :span="6">处理人: {{ backDetail.handleMan }}</el-col>
              <el-col
                :span="6"
              >处理备注: <span>{{ backDetail.handleNote }}</span></el-col>
              <el-col
                :span="6"
              >处理时间: <span>{{ backDetail.handleTime }}</span></el-col>
            </el-row>
            <div style="padding-top: 10px">
              <el-form
                ref="handleForm"
                :model="handleForm"
                :rules="receiveRules"
                size="mini"
                label-position="left"
              >
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-form-item
                      prop="receiveMan"
                      label="收货人"
                      label-width="80px"
                    >
                      <el-input
                        v-model="handleForm.receiveMan"
                        class="myInput"
                        type="text"
                        placeholder=""
                        size="mini"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                    <el-form-item
                      prop="receiveNote"
                      label="收货备注"
                      label-width="80px"
                    >
                      <el-input
                        v-model="handleForm.receiveNote"
                        class="myInput"
                        type="text"
                        placeholder=""
                        size="mini"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>
            </div>
          </div>
        </div>
        <!-- 完成 -->
        <div v-if="backDetail.status >=2" class="row">
          <div class="title">
            处理结果:
          </div>
          <el-row :gutter="20">
            <el-col
              :span="6"
            >处理人: {{ backDetail.handleMan }}</el-col>
            <el-col
              :span="6"
            >处理备注: <span>{{ backDetail.handleNote }}</span></el-col>
            <el-col
              :span="6"
            >处理时间: <span>{{ backDetail.handleTime }}</span></el-col>
          </el-row>
        </div>
        <div class="btn">
          <el-button
            v-if="backDetail.status === 0"
            type="primary"
            style="width: 150px"
            size="small"
            @click="agreeReturn"
          >同意退款
          </el-button>
          <el-button
            v-if="backDetail.status === 1"
            type="primary"
            style="width: 150px"
            size="small"
            @click="receiveReturn"
          >确认收货
          </el-button>
          <el-button
            v-if="backDetail.status === 0"
            style="width: 150px"
            size="small"
            @click="rejectReturn"
          >拒绝退款
          </el-button>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import {
  agreeApply,
  receiveProduct,
  rejectApply,
  orderReturn
} from '@/api/order/orderBack/index'
export default {
  filters: {
    filterVal(val) {
      var arr = ['待处理', '退货中', '已完成', '已拒绝']
      return arr[val]
    },
    filterGoods(val) {
      // 检测 字符串类型
      // 将JSON格式的字符串转换回对象
      if (typeof val === 'string') {
        var arr = JSON.parse(val)
        return arr.reduce((total, current) => {
          return total + current.key + ':' + current.value + '   '
        }, '')
      } else {
        return val.reduce((total, current) => {
          return total + current.key + ':' + current.value + '   '
        }, '')
      }
    }
  },
  data() {
    return {
      backDetail: {}, // 单个退货商品详情
      backList: [], // ⚡el-table元素中注入data对象数组 所以需要将backDetail塞入一个数组中
      tagType: '',
      handleForm: {
        // 退款/收货表单
        id: this.$route.query.id,
        returnAmount: 0, // 退款金额
        handleNote: '', // 退款备注
        handleMan: '', // 处理人
        receiveNote: '', // 收货备注
        receiveMan: '' // 收货人
      },
      handleRules: {
        handleMan: [{ required: true, message: '处理人姓名', trigger: 'blur' }],
        handleNote: [
          { required: true, message: '处理人备注', trigger: 'blur' }
        ]
      },
      receiveRules: {
        receiveMan: [
          { required: true, message: '收货人姓名', trigger: 'blur' }
        ],
        receiveNote: [
          { required: true, message: '收货人备注', trigger: 'blur' }
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
      // query传参
      orderReturn(this.$route.query.id).then((res) => {
        console.log(res)
        if (res.data.orderReturnApply.status === 0) {
          this.tagType = 'danger'
        } else if (res.data.orderReturnApply.status === 1) {
          this.tagType = 'warning'
        } else if (res.data.orderReturnApply.status === 2) {
          this.tagType = ''
        } else {
          this.tagType = 'info'
        }
        this.backDetail = res.data.orderReturnApply
        var obj = {
          productPic: this.backDetail.productPic,
          productName: this.backDetail.productName,
          productAttr: this.backDetail.productAttr, // 属性
          productCount: this.backDetail.productCount,
          productBrand: this.backDetail.productBrand,
          productRealPrice: this.backDetail.productRealPrice,
          returnAmount: this.backDetail.returnAmount // 总计
        }
        this.backList.push(obj)
      })
    },
    // 同意退款
    agreeReturn() {
      this.$confirm('注意 同意退款操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false
      }).then((res) => {
        agreeApply(this.backDetail.id, this.handleForm).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.init() // 成功后再刷新
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 确认收货
    receiveReturn() {
      this.$confirm('注意 已收取客户退回商品?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false
      }).then((res) => {
        receiveProduct(this.backDetail.id, this.handleForm).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.init() // 删除成功后再刷新
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    },
    // 拒绝退款
    rejectReturn() {
      this.$confirm('注意 拒绝退款?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false
      }).then((res) => {
        rejectApply(this.backDetail.id, this.handleForm).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '操作成功!'
            })
            this.init() // 删除成功后再刷新
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.orderDetail {
  background-color: #fff;
  margin: 30px;
  .steps {
    width: 100%;
    background-color: #fff;
    margin-bottom: 10px;
  }

  .title {
      font-size: 16px;
      font-weight: 600;
      padding: 10px 0;
  }
  }
  .active{
    color: red;
  }
  .el-col {
    padding: 10px;
    font-size: 12px;
  }
  .btn {
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
  }

</style>
