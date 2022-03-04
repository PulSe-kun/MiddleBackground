<template>
  <div class="wordCloud">
    <div class="title">热门搜索词 <span>Top Search</span>
    </div>
    <div id="box" style="width: 100%;height:380px" />
  </div>
</template>

<script>
import * as echarts from 'echarts'
import 'echarts-wordcloud'
export default {
  name: 'VueWordCloud',

  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
      worddata: [
        {
          name: '滕王高阁临江渚',
          value: 250
        },
        {
          name: '佩玉鸣鸾罢歌舞',
          value: 230
        },
        {
          name: '画栋朝飞南浦云',
          value: 200
        },
        {
          name: '珠帘暮卷西山雨',
          value: 190
        },
        {
          name: '小舟从此逝',
          value: 180
        },
        {
          name: '江海寄余生',
          value: 170
        },

        {
          name: '把酒祝东风',
          value: 310
        },
        {
          name: '连雨不知春去',
          value: 215
        },
        {
          name: '一晴方觉夏深',
          value: 20
        },
        {
          name: '我见青山多妩媚',
          value: 114
        },

        {
          name: '料青山见我应如是',
          value: 102
        }

      ]
    }
  },
  created() {},
  mounted() {
    this.initChart(this.id)
  },
  methods: {
    initChart(id) {
      var myChart = echarts.init(document.getElementById('box'))

      const option = {
        title: {
          text: ''

        },
        backgroundColor: '#16223C',
        tooltip: {
          trigger: 'item',
          confine: true,
          backgroundColor: 'rgba(50,50,50,0.7)',
          borderColor: '#333',
          textStyle: {
            color: '#fff'
          }

        },
        series: [
          {
            type: 'wordCloud',
            // 用来调整词之间的距离
            gridSize: 8,
            // 用来调整字的大小范围
            // Text size range which the value in data will be mapped to.
            // Default to have minimum 12px and maximum 60px size.
            sizeRange: [16, 30],
            // Text rotation range and step in degree. Text will be rotated randomly in range [-90,                                                                             90] by rotationStep 45
            // 用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            rotationRange: [-45, 0, 45, 90],
            // rotationRange: [ 0,90],
            // rotationRange: [0, 0],
            // 随机生成字体颜色

            // maskImage: maskImage,
            // textStyle: {
            //   color: "rgb(214,20,15)",
            // },
            textStyle: {
              color: function() {
                return (
                  'rgb(' +
                  Math.round(Math.random() * 255) +
                  ', ' +
                  Math.round(Math.random() * 255) +
                  ', ' +
                  Math.round(Math.random() * 255) +
                  ')'
                )
              }
            },
            // 位置相关设置
            // Folllowing left/top/width/height/right/bottom are used for positioning the word cloud
            // Default to be put in the center and has 75% x 80% size.
            left: 'center',
            top: 'center',
            right: null,
            bottom: null,
            // 数据
            data: this.worddata
          }
        ]
      }
      // myChart.setOption(option);
      // 加载图像，将数据放在图像中
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped lang="scss">
.wordCloud {
  width: 100%;
  padding-top: 40px;
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
  #box{
    // background-color: #fff;
    padding-top: 30px;
  }

}
</style>
