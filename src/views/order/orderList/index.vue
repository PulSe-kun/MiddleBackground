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
        <el-form-item label="订单类型" prop="orderType">
          <el-select v-model="formInline.orderType" placeholder="订单类型">
            <el-option label="正常订单" value="0" />
            <el-option label="秒杀订单" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="支付方式" prop="payType">
          <el-select v-model="formInline.payType" placeholder="支付方式">
            <el-option label="未支付" value="0" />
            <el-option label="支付宝" value="1" />
            <el-option label="微信" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-select v-model="formInline.status" placeholder="订单状态">
            <el-option label="待付款" value="0" />
            <el-option label="待发货" value="1" />
            <el-option label="已发货" value="2" />
            <el-option label="已完成" value="3" />
            <el-option label="退货" value="4" />
            <el-option label="无效订单" value="5" />
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
      <el-table :data="orderList" border style="width: 100%">
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
          prop="payType"
          label="支付方式"
          align="center"
          width="120"
        >
          <template v-slot="scope">
            <svg-icon v-if="scope.row.payType==1" icon-class="zfb" style="font-size: 30px;" />
            <svg-icon v-if="scope.row.payType==2" icon-class="wx" style="font-size: 30px;" />
            <svg-icon v-if="scope.row.payType==0" icon-class="nopay" style="font-size: 30px;" />
          </template>
        </el-table-column>
        <el-table-column
          prop="status"
          label="订单状态"
          align="center"
          width="160"
        >
          <template v-slot="scope">
            <el-button v-if="scope.row.status==5" size="small">无效订单</el-button>
            <el-button v-if="scope.row.status==4" type="info" size="small">退货</el-button>
            <el-button v-if="scope.row.status==3" type="success" size="small">已完成</el-button>
            <el-button v-if="scope.row.status==2" type="primary" size="small" plain>已发货</el-button>
            <el-button v-if="scope.row.status==1" type="warning" size="small">待发货</el-button>
            <el-button v-if="scope.row.status==0" type="danger" size="small">待付款</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="添加时间"
          align="center"
          width="240"
        />
        <el-table-column
          prop="memberUsername"
          label="用户账号"
          align="center"
          width="150"
        />
        <el-table-column
          prop="orderType"
          label="订单类型"
          align="center"
          width="180"
        >
          <template v-slot="scope">
            <el-button v-if="scope.row.status==0" type="success" size="small" plain>正常订单</el-button>
            <el-button v-if="scope.row.status==1" type="warning" size="small" plain>秒杀订单</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="note"
          label="备注"
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
import { findOrdersByPage } from '@/api/order/orderList'
export default {
  data() {
    return {
      orderList: [],
      start: 1,
      limit: 10,
      total: 0,
      // 表单数据
      formInline: {
        deliverySn: '', // 物流单号
        id: '',
        memberUsername: '', // 用户帐号 ,
        orderSn: '',
        orderType: '',
        payType: '',
        sourceType: '', // 订单来源：0->PC订单；1->app订单 ,
        status: ''
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
      findOrdersByPage(this.start, this.limit, this.formInline).then((res) => {
        console.log(res)
        /*  res.data.rows.forEach((ele) => {
          ele.orderType = ele.orderType ? '秒杀订单' : '正常订单'
          if (ele.payType) {
            ele.payType = '支付宝'
          } else if (ele.payType === 2) {
            ele.payType = '微信'
          } else {
            ele.payType = '未支付'
          }
        }) */
        this.orderList = res.data.rows
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
    // 查看订单
    checkOrder(id) {
      this.$router.push(`/order/orderList/orderDetail?id=${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.orderList{
  .custom-class{
    font-size: 20px;
  }
}
</style>
