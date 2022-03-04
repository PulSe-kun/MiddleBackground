<template>

  <div id="map" style="width: 100%;height:100%" />

</template>
<script>
import * as echarts from 'echarts'
// 注意  在echart4中内置了中国地图数据 但是目前最新版本是5 并没有内置 需要手动导入
import '@/utils/china'
export default {
  name: 'VueWordCloud',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  created() {},
  mounted() {
    this.initChart()
  },
  methods: {
    initChart() {
      // if (myChart != null && myChart !== '' && myChart !== undefined) {
      //   myChart.dispose()// 销毁
      // }
      var myChart = echarts.init(document.getElementById('map'))
      var outname = [
        '南海诸岛',
        '北京',
        '天津',
        '上海',
        '重庆',
        '河北',
        '河南',
        '云南',
        '辽宁',
        '黑龙江',
        '湖南',
        '安徽',
        '山东',
        '新疆',
        '江苏',
        '浙江',
        '江西',
        '湖北',
        '广西',
        '甘肃',
        '山西',
        '内蒙古',
        '陕西',
        '吉林',
        '福建',
        '贵州',
        '广东',
        '青海',
        '西藏',
        '四川',
        '宁夏',
        '海南',
        '台湾',
        '香港',
        '澳门'
      ]
      var outvalue = [
        2,
        524,
        13,
        140,
        75,
        13,
        83,
        11,
        19,
        15,
        69,
        260,
        39,
        4,
        31,
        104,
        36,
        1052,
        33,
        347,
        9,
        157,
        22,
        4,
        18,
        5,
        2398,
        41,
        1,
        484,
        404,
        22,
        3,
        5,
        225
      ]
      var outdata = []

      var max = 6000
      var min = 10
      var maxSize4Pin = 50
      var minSize4Pin = 10

      for (var i = 0; i < outname.length; i++) {
        outdata.push({
          name: outname[i],
          value: outvalue[i]
        })
      }

      var geoCoordMap = {}
      /* 获取地图数据*/
      var mapFeatures = echarts.getMap('china').geoJson.features
      //  console.log(mapFeatures)
      mapFeatures.forEach(function(v) {
        // console.info(v)
        // 地区名称
        var name = v.properties.name
        // 地区经纬度
        geoCoordMap[name] = v.properties.cp
      })
      var convertData = function(outdata) {
        var res = []
        for (var i = 0; i < outdata.length; i++) {
          var geoCoord = geoCoordMap[outdata[i].name]
          if (geoCoord) {
            res.push({
              name: outdata[i].name,
              value: geoCoord.concat(outdata[i].value)
            })
          }
        }
        return res
      }

      var option = {
        // backgroundColor: '#0F1C3C',
        title: {
          text: '全国订单人数分布图',
          textStyle: {
            color: '#9aa8d4'
          }
        },
        tooltip: {
          backgroundColor: 'rgba(50,50,50,0.7)',
          borderColor: '#333',
          textStyle: {
            color: '#fff'
          },
          show: true,
          formatter: function(params) {
            if (params.value.length > 1) {
              return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + params.value[2] + '人&nbsp;&nbsp;'
            } else {
              return '&nbsp;&nbsp;' + params.name + '&nbsp;&nbsp;&nbsp;' + params.value + '人&nbsp;&nbsp;'
            }
          }
        },

        geo: {
          map: 'china',
          show: true,
          roam: false,
          label: {
            emphasis: {
              show: false
            }
          },
          layoutSize: '100%',
          itemStyle: {

            borderColor: new echarts.graphic.LinearGradient(
              0,
              0,
              0,
              1,
              [
                {
                  offset: 0,
                  color: '#00F6FF'
                },
                {
                  offset: 1,
                  color: '#53D9FF'
                }
              ],
              false
            ),
            borderWidth: 3,
            shadowColor: 'rgba(10,76,139,1)',
            shadowOffsetY: 0,
            shadowBlur: 54

          }
        },
        series: [
          {
            type: 'map',
            map: 'china',
            aspectScale: 0.75,
            // zoom:1.1,
            label: {

              show: false,

              emphasis: {
                show: false
              }
            },
            itemStyle: {

              areaColor: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#073684' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#061E3D' // 100% 处的颜色
                  }
                ]
              },
              borderColor: '#215495',
              borderWidth: 1
            },
            emphasis: {
              areaColor: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: '#073684' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#061E3D' // 100% 处的颜色
                  }
                ]
              }

            },
            data: outdata
          },
          {
            type: 'effectScatter',
            coordinateSystem: 'geo',
            rippleEffect: {
              brushType: 'stroke'
            },
            showEffectOn: 'render',
            itemStyle: {

              color: {
                type: 'radial',
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(5,80,151,0.2)'
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(5,80,151,0.8)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(0,108,255,0.7)'
                  }
                ],
                global: false // 缺省为 false
              }

            },
            label: {

              // show: true,
              color: '#fff',
              fontWeight: 'bold',
              position: 'inside',
              formatter: function(para) {
                return '{cnNum|' + para.data.value[2] + '}'
              },
              rich: {
                cnNum: {
                  fontSize: 10,
                  color: '#D4EEFF'
                }
              }

            },
            symbol: 'circle',
            symbolSize: function(val) {
              if (val[2] === 0) {
                return 0
              }
              var a = (maxSize4Pin - minSize4Pin) / (max - min)
              var b = maxSize4Pin - a * max
              return a * val[2] + b * 1.2
            },
            data: convertData(outdata),
            zlevel: 1
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>
