<template>
  <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
  <div class="board">
    <div class="header">
      <p class="title"><span class="text">数据大屏展示</span></p>
    </div>
    <div class="main">
      <div class="left">
        <div class="sale"><sale></sale></div>
        <div><wordCloud></wordCloud></div>
      </div>
      <div class="center">
        <div class="order">
          <order></order>
        </div>
        <div class="content">
          <div class="c-left">
            <cMap></cMap>
          </div>
          <div class="c-right">
            <pie></pie>
          </div>
        </div>
      </div>
      <div class="right">
        <tableBox></tableBox>
      </div>
    </div>
    <div class="bg-animate">
      <BgAnimate />
    </div>
  </div>
</template>

<script>
import order from '@/views/dashboard/components/order'
import sale from '@/views/dashboard/components/sale'
import wordCloud from '@/views/dashboard/components/wordcloud'
import cMap from '@/views/dashboard/components/map'
import pie from '@/views/dashboard/components/pie'
import tableBox from '@/views/dashboard/components/table'
import BgAnimate from '@/views/dashboard/components/bg/BgAnimate.vue'
export default {
  components: {
    order,
    sale,
    wordCloud,
    cMap,
    pie,
    tableBox,
    BgAnimate
  },
  data() {
    return {
      timeText: '' // 时间显示
    }
  },
  created() {
    // 初始化时间
    this.timeText = this.formatDate(new Date())
  }
}
</script>

<style lang="scss" scoped>
.board {
  width: 100%;
  background-color: #0a1631;
  .header {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100px;
    margin-bottom: 20px;
    .title {
      margin: 0 auto;
      background: url("~@/assets/titleBG.png");
      background-size: 100% 100%;
      background-position: 50%;
      width: 70%;
      height: 122px;
      text-align: center;
      line-height: 100px;
      font-size: 36px;
      .text {
        font-size: 36px;
        color: #fff;
        text-shadow: #fff 0 0 15px;
        font-weight: 700;
      }
    }
  }
  .main {
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding-bottom: 50px;
    .left {
      width: 25%;
      .sale {
        margin-bottom: 10px;
      }
    }
    .center {
      width: 45%;
      .content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .c-left {
          width: 50%;
          height: 360px;
        }
        .c-right {
          width: 50%;
          height: 360px;
        }
      }
    }
    .right {
      width: 25%;
    }
  }
  .bg-animate{
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20%;
  }
}
</style>
