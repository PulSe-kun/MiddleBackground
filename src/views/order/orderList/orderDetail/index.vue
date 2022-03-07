<template>
  <div class="orderDetail">
    <el-card shadow="always" :body-style="{ padding: '30px' }">
      <div class="step">
        <el-steps :active="active">
          <el-step title="待付款" :description="orderInfo.orderBase && orderInfo.orderBase.createTime" />
          <el-step title="待发货" :description="orderInfo.orderBase && orderInfo.orderBase.paymentTime" />
          <el-step title="已发货" :description="orderInfo.orderBase && orderInfo.orderBase.deliveryTime" />
          <!-- 已退货自动隐藏已完成 -->
          <el-step v-if="active!=5 " title="已完成" :description="orderInfo.orderBase && orderInfo.orderBase.receiveTime" />
          <!-- 已完成自动隐藏已退货 -->
          <el-step v-if="active!=4" title="退货" :description="orderInfo.orderBase && orderInfo.orderBase.finishTime" />
        </el-steps>
      </div>
      <el-divider />
      <div class="content">
        <div class="row">
          <div class="title">订单信息:
            <span>
              <el-tag :type="tagType">{{ orderInfo.orderBase &&orderInfo.orderBase.status|filterVal }}</el-tag>
            </span></div>
          <el-row :gutter="10">
            <el-col :span="6" :offset="0">订单金额: {{ orderInfo.orderBase &&orderInfo.orderBase.totalAmount }}</el-col>
            <el-col :span="6" :offset="0">订单编号: <span>{{ orderInfo.orderBase &&orderInfo.orderBase.orderSn }}</span></el-col>
            <el-col :span="6" :offset="0">用户账号: <span>{{ orderInfo.orderBase &&orderInfo.orderBase.memberUsername }}</span></el-col>
            <el-col :span="6" :offset="0">备注: <span>{{ orderInfo.orderBase &&orderInfo.orderBase.totalAmount }}</span></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6" :offset="0">下单时间: <span>{{ orderInfo.orderBase &&orderInfo.orderBase.createTime }}</span></el-col>
            <el-col :span="6" :offset="0">付款时间: <span>{{ orderInfo.orderBase &&orderInfo.orderBase.paymentTime }}</span></el-col>
            <el-col :span="6" :offset="0">发货时间: <span>{{ orderInfo.orderBase &&orderInfo.orderBase.deliveryTime }}</span></el-col>
            <el-col :span="6" :offset="0">收货时间: <span>{{ orderInfo.orderBase &&orderInfo.orderBase.modifyTime }}</span></el-col>
          </el-row>
        </div>
        <el-divider />
        <div class="row">
          <div class="title">收货人信息:</div>
          <el-row :gutter="10">
            <el-col :span="6" :offset="0">收货人: <span>{{ orderInfo.orderBase &&orderInfo.orderBase.receiverName }}</span></el-col>
            <el-col :span="6" :offset="0">用户姓名: <span>{{ orderInfo.orderBase &&orderInfo.orderBase.memberUsername }}</span></el-col>
            <el-col :span="6" :offset="0">手机号码: <span>{{ orderInfo.orderBase &&orderInfo.orderBase.receiverPhone }}</span></el-col>
            <el-col :span="6" :offset="0">邮政编码: <span>{{ orderInfo.orderBase &&orderInfo.orderBase.receiverPostCode }}</span></el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :span="6" :offset="0">行政地区: <span>{{ orderInfo.orderBase &&orderInfo.orderBase.receiverProvince + ' ' + orderInfo.orderBase.receiverCity }}</span></el-col>
            <el-col :span="6" :offset="0">详细地址: <span>{{ orderInfo.orderBase &&orderInfo.orderBase.receiverDetailAddress }}</span></el-col>
          </el-row>
        </div>
        <el-divider />
        <div class="row">
          <div class="title">商品信息:</div>
          <el-table :data="orderInfo.orderItems" border style="width: 90%">
            <el-table-column
              prop="productName"
              label="商品名称"
              align="center"
              width="240"
            />
            <el-table-column
              prop="productPic "
              label="商品图片"
              align="center"
              width="240"
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
              prop="isReturn"
              label="是否退货"
              align="center"
              width="160"
            />
            <el-table-column
              prop="productBrand"
              label="品牌"
              align="center"
              width="200"
            />
            <el-table-column
              prop="productPrice"
              label="价格"
              align="center"
              width="160"
            />
            <el-table-column
              prop="productQuantity"
              label="商品数量"
              align="center"
              width="160"
            />
            <el-table-column
              fixed="right"
              label="小计"
              width="200px"
              align="center"
              prop="totalPrice"
            />
          </el-table>
        </div>
        <div class="row">
          <div class="title">费用信息:</div>
          <el-row :gutter="10">
            <el-col :span="6" :offset="0">运费金额: <span>0</span></el-col>
            <el-col :span="6" :offset="0">订单总金额: <span>{{ orderInfo.orderBase &&orderInfo.orderBase.totalAmount }}</span></el-col>
            <el-col :span="6" :offset="0">实际金额: <span>{{ orderInfo.orderBase &&orderInfo.orderBase.payAmount }}</span></el-col>
            <el-col :span="6" :offset="0">促销优化金额: <span>0</span></el-col>
          </el-row>
        </div>
        <!-- 快递单号 -->
        <div v-if="active==2" style="padding-top:10px">
          <el-form ref="form" :model="form" :rules="rules" label-width="80px" :inline="false" size="small">
            <el-row :gutter="20">
              <el-col :span="6" :offset="0"><el-form-item label="物流公司" prop="deliveryCompany">
                <el-select v-model="form.deliveryCompany" placeholder="请选择活动区域">
                  <el-option label="中国邮政" value="1" />
                  <el-option label="京东快递" value="2" />
                  <el-option label="顺丰快递" value="3" />
                  <el-option label="中通快递" value="4" />
                  <el-option label="韵达快递" value="5" />
                </el-select>
              </el-form-item>
              </el-col>
              <el-col :span="6" :offset="0"><el-form-item label="快递单号" prop="deliverySn">
                <el-input v-model="form.deliverySn" placeholder="" size="small" clearable />
              </el-form-item>
              </el-col>
            </el-row>
            <div class="btn">
              <el-button type="primary" size="small" @click="onSubmit">确认发货</el-button>
            </div>
          </el-form>
        </div>
        <!-- 物流信息 -->
        <div v-if="active>=3" style="padding-top:10px">
          <el-table
            :data="tableData"
            stripe
            style="width: 100%"
          >
            <el-table-column
              prop="date"
              label="时间"
              width="180"
            />
            <el-table-column
              prop="address"
              label="状态"
              width="500"
            />
            <el-table-column
              prop="name"
              label="备注"
              width="400"
            />
          </el-table>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { orderDetail, sendDone } from '@/api/order/orderList'
export default {
  filters: {
    filterVal(val) {
      var arr = ['待付款', '待发货', '已发货', '已完成', '退货中', '无效订单']
      return arr[val]
    },
    filterPayType(val) {
      var arr = ['未支付', '支付宝', '微信']
      return arr[val]
    }
  },
  data() {
    return {
      active: 1,
      orderInfo: [],
      tagType: '',
      form: {
        orderId: this.$route.query.id, // 订单id
        deliverySn: '', // 物流单号
        deliveryCompany: ''// 物流公司名称
      },
      rules: {
        deliveryCompany: [
          { required: true, message: '请输入物流公司名称', trigger: 'blur' }
        ],
        deliverySn: [
          { required: true, message: '请输入物流单号', trigger: 'blur' }
        ]
      },
      tableData: [{
        date: '2021-03-01',
        name: '揽投员姓名：岳云鹏;联系电话：13883838888',
        address: '深圳市横岗速递营销部已收件'
      }, {
        date: '2021-03-01',
        name: '',
        address: '离开深圳市 发往广州市'
      }, {
        date: '2021-03-02',
        name: '',
        address: '到达广东速递物流公司广航中心处理中心（经转）'
      },
      {
        date: '2021-03-03',
        name: '扫码员:宋小宝',
        address: '到达北京朝阳区物流站'
      }, {
        date: '2021-03-03',
        name: '投递员姓名：沈腾;联系电话：18018000180',
        address: '揽投部安排投递,收件人本人已经签收'
      }]
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
      orderDetail(this.$route.query.id).then((res) => {
        console.log(res)
        res.data.orderDetail.orderItems.forEach((ele) => {
          ele.isReturn = ele.isReturn ? '是' : '否'
        })
        if (res.data.orderDetail.orderBase.status === 0) {
          this.tagType = 'danger'
        } else if (res.data.orderDetail.orderBase.status === 1) {
          this.tagType = 'warning'
        } else if (res.data.orderDetail.orderBase.status === 2) {
          this.tagType = ''
        } else if (res.data.orderDetail.orderBase.status === 3) {
          this.tagType = 'success'
        } else {
          this.tagType = 'info'
        }
        this.orderInfo = res.data.orderDetail
        this.active = res.data.orderDetail.orderBase.status + 1
      })
    },
    // 确认发货
    onSubmit() {
      sendDone(this.form).then(res => {
        console.log(res)
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
  .row {
    //padding: 10px 0;
    .title {
      font-size: 16px;
      font-weight: 600;
      padding: 10px 0;
    }
  }
  .el-col {
    padding: 10px;
    font-size: 12px;
  }
  .btn{
    padding: 20px 0;
    display: flex;
    justify-content: center;
    align-items:center ;
    margin-bottom: 20px;
  }
  margin-bottom: 80px;
}
</style>
