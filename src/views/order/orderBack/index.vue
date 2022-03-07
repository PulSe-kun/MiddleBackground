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
        <el-form-item label="订单编号" prop="orderSn">
          <el-input v-model="formInline.orderSn" placeholder="订单编号" />
        </el-form-item>
        <el-form-item label="退单状态" prop="status">
          <el-select v-model="formInline.status" placeholder="订单状态">
            <el-option label="待处理" value="0" />
            <el-option label="退货中" value="1" />
            <el-option label="已发货" value="2" />
            <el-option label="已拒绝" value="3" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            size="mini"
            plain
            style="margin-left:10px"
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
      <el-table :data="chargeBack" border style="width: 100%">
        <el-table-column
          type="index"
          fixed="left"
          label="#"
          align="center"
          width="40"
        />
        <el-table-column
          prop="orderSn"
          label="订单编号"
          align="center"
          width="200"
        />
        <el-table-column
          prop="status"
          label="退单状态"
          align="center"
          width="160"
        >
          <template v-slot="scope">
            <el-button v-if="scope.row.status==3" type="success" size="small">已拒绝</el-button>
            <el-button v-if="scope.row.status==2" type="primary" size="small" plain>已完成</el-button>
            <el-button v-if="scope.row.status==1" type="warning" size="small">退货中</el-button>
            <el-button v-if="scope.row.status==0" type="danger" size="small">待处理</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="productName"
          label="商品名称"
          align="center"
          width="150"
        />
        <el-table-column
          prop="productAttr"
          label="商品属性"
          align="center"
          width="200"
        >
          <template v-slot="scope">
            <div style="font-size:12px">{{ scope.row.productAttr | filterGoods }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="description"
          label="描述"
          align="center"
          width="180"
        />
        <el-table-column
          prop="reason"
          label="退单原因"
          align="center"
          width="150"
        />

        <el-table-column
          prop="handleNote"
          label="商家备注"
          align="center"
          width="150"
        />
        <el-table-column
          prop="createTime"
          label="添加时间"
          align="center"
          width="180"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="200px"
          align="center"
        >
          <template v-slot="scope">
            <el-button type="primary" icon="el-icon-view" size="small" style="width:150px" @click="checkOrder(scope.row.id)">查看订单</el-button>
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
import { findReturnApply } from '@/api/order/orderBack'
export default {
  // 商品属性格式更改
  // 1.使用filters筛选
  // 2.将JSON格式的字符串转换成对象格式
  filters: {
    filterGoods(val) {
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
      chargeBack: [],
      start: 1,
      limit: 10,
      total: 0,
      // 表单数据
      formInline: {
        'createTime': '',
        'handleTime': '', // 处理时间
        'memberUsername': '',
        'orderId': '',
        'orderSn': '',
        'status': ''// 申请状态：0->待处理；1->退货中；2->已完成；3->已拒绝
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
      findReturnApply(this.start, this.limit, this.formInline).then((res) => {
        console.log(res)
        this.chargeBack = res.data.rows
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
    checkOrder(id) {
      this.$router.push(`/order/orderBack/backDetail?id=${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
// ::v-deep .cell{
//   font-size: 12px;
// }
</style>
