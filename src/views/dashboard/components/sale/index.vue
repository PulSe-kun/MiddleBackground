<template>
  <div class="sale">
    <div class="title">电商数据 <span>Shell Data</span></div>
    <div class="num">
      <div class="info">
        <p>销售量</p>
        <p class="text">万元</p>
      </div>
      <div class="countNum">
        <countTo
          :start-val="startVal"
          :end-val="endVal"
          :duration="3000"
        ></countTo>
      </div>
    </div>
    <div class="count">
      <p class="text">完成百分比</p>
      <div class="progress">
        <el-progress :stroke-width="15" :percentage="percentage" :text-inside="true"></el-progress>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from 'vue-count-to'
export default {
  components: { countTo },
  data() {
    return {
      startVal: 0,
      endVal: 12073469, // 销售额
      percentage: 10 // 百分比
    }
  },
  computed: {},
  created() {
  },
  mounted() {
    var _this = this
    setTimeout(function() {
      _this.changeProgress()
    }, 1000)
  },
  methods: {
    changeProgress() {
      this.percentage = 86
    }
  }
}
</script>

<style scoped lang="scss">
.sale {
  width: 100%;
  .title {
    font-size: 18px;
    color: #9aa8d4;
    font-weight: 400;
    span {
      font-size: 18px;
      color: #404d69;
      font-weight: 400;
    }
  }
  .num {
    padding-top: 10px;
    .info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 14px;
      color: #9aa8d4;
      font-weight: 400;
      .text {
        font-size: 14px;
        color: #73aae5;
      }
    }
    .countNum {
      letter-spacing: 5px;
      font-size: 48px;
      font-weight: 700;
      color: #fff;
      text-align: center;
    }
  }
  .count {
    .text {
      font-size: 14px;
      color: #9aa8d4;
      font-weight: 400;
      margin-bottom: 30px;
    }
    ::v-deep .el-progress-bar__inner {
      background: linear-gradient(90deg, #24cbff 30%, #9000ff);
    }
  }
}
</style>
