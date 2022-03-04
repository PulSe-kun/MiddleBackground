<template>
  <div>
    <!-- echarts的挂在对象 -->
    <div ref="barChart" style="width: 720px; height: 340px" class="barChart" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {
    var options = {
      title: {
        text: '订单退单柱状图',
        textStyle: {
          color: '#9aa8d4'
        }
      },
      // 提示框组件
      tooltip: {
        backgroundColor: 'rgba(50,50,50,0.7)',
        borderColor: '#333',
        textStyle: {
          color: '#fff'
        }
      },
      // xAxis 直角坐标系 grid 中的 x 轴
      legend: {
        bottom: 20,
        // 字体样式
        textStyle: {
          color: '#A8AAB3', // 坐标值得具体的颜色
          fontSize: 12
        }
      },
      xAxis: {
        splitLine: {
          show: false
        },
        axisLabel: {
          //   刻度标签旋转的角度，在类目轴的类目标签显示不下的时候可以通过旋转防止标签之间重叠。
          // 旋转的角度从 -90 度到 90 度。
          // rotate: 0
        },
        data: []
      },
      yAxis: {
        // 纵轴的竖线
        axisLine: {
          show: true
        },
        axisTick: { show: true },
        // 分割线去除
        splitLine: {
          show: false
        }
      },
      // 一组数值以及他们映射成的图
      series: [
        {
          name: '订单',
          type: 'bar',
          data: [], // 数据
          // barWidth: '20%', //柱子的宽度
          itemStyle: {
            color: {
              // 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#7D05E2' },
                { offset: 0.5, color: '#B600FF' },
                { offset: 1, color: '#BC04E2' }
              ] // 柱图渐变色
            }
          }
        },
        {
          name: '退单',
          type: 'bar',
          data: [],
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#24CBFF' },
              { offset: 0.5, color: '#24A3FF' },
              { offset: 1, color: '#2492FF' }
            ])
          }
        }
      ]
    }
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(this.$refs.barChart) //, 'dark'
    // 模拟数据
    for (var i = 1; i <= 30; i++) {
      options.series[0].data.push(Math.ceil(Math.random() * 100))
      options.series[1].data.push(Math.ceil(Math.random() * 30))
      options.xAxis.data.push(`day${i}`)
    }
    // 绘制图表
    myChart.setOption(options)
  },
  methods: {}
}
</script>

<style scoped lang="scss">
.barChart {
  background-color: #0a1631;
}
</style>
