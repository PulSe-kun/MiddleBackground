<template>
  <div class="table">
    <div class="header">
      <div class="title">统计数据<span>Statistics Data</span></div>
      <div class="content">
        <div class="pic">
          <div>
            <img src="~@/assets/staImg1.png" alt="">
          </div>
          <div class="info">
            82.4
            <div class="text">订单总数(万)</div>
          </div>
        </div>
        <div class="pic">
          <div>
            <img src="~@/assets/staImg2.png" alt="">
          </div>
          <div class="info">
            35
            <div class="text">销售总量(万元)</div>
          </div>
        </div>
        <div class="pic">
          <div>
            <img src="~@/assets/staImg3.png" alt="">
          </div>
          <div class="info">
            110
            <div class="text">人均消费</div>
          </div>
        </div>
        <div class="pic">
          <div>
            <img src="~@/assets/staImg4.png" alt="">
          </div>
          <div class="info">
            46
            <div class="text">近十分钟新增订单数量</div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="title">大额订单Top<span>Supper Orders</span></div>
      <div class="orderNum">
        <el-table
          :data="tableData"
          border
          style="width: 90%"
          size="mini"
          :header-cell-style="{
            background: '#0a1631',
            color: '#9aa8d4',
          }"
        >
          <el-table-column prop="date" label="时间" align="center">
          </el-table-column>
          <el-table-column prop="name" label="物品" width="100" align="center">
          </el-table-column>
          <el-table-column
            prop="address"
            label="数量"
            width="80"
            align="center"
          >
          </el-table-column>
          <el-table-column prop="money" label="金额" width="100" align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2021-05-02',
          name: '物品1',
          address: Math.ceil(Math.random() * 100),
          money: Math.ceil(Math.random() * 100000)
        },
        {
          date: '2021-05-04',
          name: '物品2',
          address: Math.ceil(Math.random() * 100),
          money: Math.ceil(Math.random() * 100000)
        },
        {
          date: '2021-06-01',
          name: '物品3',
          address: Math.ceil(Math.random() * 100),
          money: Math.ceil(Math.random() * 100000)
        },
        {
          date: '2021-07-03',
          name: '物品4',
          address: Math.ceil(Math.random() * 100),
          money: Math.ceil(Math.random() * 100000)
        },
        {
          date: '2021-10-04',
          name: '物品5',
          address: Math.ceil(Math.random() * 100),
          money: Math.ceil(Math.random() * 100000)
        },
        {
          date: '2021-12-07',
          name: '物品6',
          address: Math.ceil(Math.random() * 100),
          money: Math.ceil(Math.random() * 100000)
        },
        {
          date: '2021-12-07',
          name: '物品6',
          address: Math.ceil(Math.random() * 100),
          money: Math.ceil(Math.random() * 100000)
        },
        {
          date: '2021-12-07',
          name: '物品6',
          address: Math.ceil(Math.random() * 100),
          money: Math.ceil(Math.random() * 100000)
        },
        {
          date: '2021-12-07',
          name: '物品6',
          address: Math.ceil(Math.random() * 100),
          money: Math.ceil(Math.random() * 100000)
        }
      ]
    }
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    // cellStyle({ row, column, rowIndex, columnIndex }) {
    //   return 'height:35px!important; border-color:#9aa8d4!important; color:#9aa8d4!important; padding:0px!important; height:40px!important'
    // }
  }
}
</script>

<style scoped lang="scss">
.table {
  width: 100%;
  .header {
    .title {
      font-size: 18px;
      color: #9aa8d4;
      font-weight: 400;
      span {
        font-size: 18px;
        color: #404d69;
        font-weight: 400;
        margin-left: 5px;
      }
    }
    .content {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .pic {
        width: 50%;
        display: flex;
        align-items: center;
        padding-top: 30px;
        img {
          width: 80%;
          display: block;
        }
        .info {
          font-size: 24px;
          font-weight: 700;
          color: #fff;
          .text {
            font-size: 10px;
            color: #b0c2f9;
            margin-top: 4px;
            font-weight: 400;
          }
        }
      }
    }
  }
  .footer {
    margin-top: 50px;
    .title {
      font-size: 18px;
      color: #9aa8d4;
      font-weight: 400;
      span {
        font-size: 18px;
        color: #404d69;
        font-weight: 400;
        margin-left: 5px;
      }
    }
    .orderNum {
      margin-top: 20px;
    }
    ::v-deep .el-table__body tr,
    .el-table__body td {
      background-color: #0a1631;
    }
    ::v-deep.el-table--enable-row-hover .el-table__body tr:hover > td {
      background: none;
    }
    ::v-deep .el-table--border th,
    td {
      border: 1px solid #9aa8d4 !important;
      border-right: none;
    }

    ::v-deep .el-table__row td {
      border: 1px solid #9aa8d4 !important;
      border-right: none;
    }

    ::v-deep .el-table::before {
      height: 0;
    }
    ::v-deep .el-table td,
    .el-table th.is-leaf,
    .el-table--border,
    .el-table--group {
      border-color: #9aa8d4;
    }
    ::v-deep .el-table--border::after,
    .el-table--group::after,
    .el-table::before {
      background-color: #9aa8d4;
    }
  }
}
</style>
