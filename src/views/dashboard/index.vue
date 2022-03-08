<template>
  <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
  <div ref="dashboard_main" class="board">
    <div class="header">
      <div class="icon" @click="fullScreen"><i class="el-icon-full-screen"></i></div>
      <div class="title">
        <span class="text">数据大屏展示</span>
      </div>
      <div class="time">{{ nowDate }} {{ nowTime }}</div>
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
import screenfull from 'screenfull'
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
      timer: null,
      // nowWeek: '',
      nowDate: '',
      nowTime: ''
    }
  },
  created() {},
  mounted() {
    // 循环定时器
    this.timer = setInterval(() => {
      this.setNowTimes()
    }, 1000)
  },
  methods: {
    setNowTimes() {
      const myDate = new Date()
      // console.log(myDate)
      // const wk = myDate.getDay()
      const yy = String(myDate.getFullYear())
      const mm = myDate.getMonth() + 1
      const dd = String(
        myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate()
      )
      const hou = String(
        myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours()
      )
      const min = String(
        myDate.getMinutes() < 10
          ? '0' + myDate.getMinutes()
          : myDate.getMinutes()
      )
      const sec = String(
        myDate.getSeconds() < 10
          ? '0' + myDate.getSeconds()
          : myDate.getSeconds()
      )
      // const weeks = [
      //   '星期日',
      //   '星期一',
      //   '星期二',
      //   '星期三',
      //   '星期四',
      //   '星期五',
      //   '星期六'
      // ]
      // const week = weeks[wk]
      this.nowDate = yy + '-' + mm + '-' + dd
      this.nowTime = hou + ':' + min + ':' + sec
      // this.nowWeek = week
    },
    // 全屏
    fullScreen() {
      if (screenfull.isEnabled) {
        // 控制是否全屏的按钮
        screenfull.toggle(this.$refs.dashboard_main)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.board {
  width: 100%;
  background-color: #0a1631;
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    margin-bottom: 20px;
    padding-top: 10px;
    .title {
      background: url("~@/assets/titleBG.png");
      background-size: 100% 100%;
      background-position: 50%;
      width: 60%;
      height: 100px;
      text-align: center;
      line-height: 80px;
      .text {
        font-size: 32px;
        color: #fff;
        text-shadow: #fff 0 0 15px;
        font-weight: 700;
      }
    }
    .icon {
      width: 20%;
    }
    .time {
      width: 20%;
      font-size: 20px;
      color: #fff;
    }
  }
  .main {
    display: flex;
    justify-content: space-around;
    width: 100%;
    padding-bottom: 50px;
    overflow: hidden;
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
  .bg-animate {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20%;
    overflow: hidden;
  }
  .el-icon-full-screen{
    font-size: 28px;
    color: #9aa8d4;
    margin-left: 10px;
  }
}
</style>
