// 混入mixin 分发 Vue 组件中的可复用功能
// 定义一个混入对象
import { getToken } from '@/utils/MyAuth'
import { uploadFileOss } from '@/api/content/article'
var myMixin = {
  data() {
    return {
      datalist: [],
      start: 1,
      limit: 10,
      total: 0,
      headers: {
        // 设置上传的请求头部
        token: getToken()
      },
      productData: {
        'pmsSkuStockList': [
          {
            'id': '', // 新增不需要,编辑需要
            'lockStock': 0, // 锁定库存 预留
            'lowStock': 0, // 低库存预警  预留
            'pic': '', // sku封面图片
            'price': 0, // 价格
            'productId': '', // 商品id,新增不需要,后台会自动关联
            'promotionPrice': 0, //  促销价格  预留
            'sale': 0, // 销量 预留
            'skuCode': '', // sku编码
            'spData': '', //   [{"key":"颜色","value":"土豪金"},{"key":"大小","value":"128g"}]
            'stock': 0, // 库存
            'modifyTime': '', // 更新时间 后台维护
            'createTime': '' // 后台自动生成
          }
        ],
        'product': {
          'albumPics': '', // 商品详情页画册图片，连产品图片限制为5张,以英文逗号分割 ,
          'brandId': '', // 品牌id
          'brandName': '', // 品牌名称 需要根据id查询
          'description': '', // 商品基本信息描述信息
          'detailDesc': '', // 商品详情页描述信息
          'detailHtml': '', // 预留 商品明细,一般是后台富文本录入的.但是一个后台需要支持pc和移动端. 展示是不同的.这个是PC端
          'detailMobileHtml': '', // 商品明细,移动端内容
          'detailTitle': '', // 明细页面标题
          'feightTemplateId': '', // 预留 邮寄模板
          'giftGrowth': 0, // 预留 成长值
          'giftPoint': 0, // 预留 成长积分
          'id': '', // 商品id,新增不需要,修改需要
          'keywords': '', // 关键词逗号隔开,比如:  地中海,欧式,桌子
          'lowStock': 0, // 预留 低库存预警
          'name': '', // 商品名称
          'newStatus': 1, // 新品状态:0->不是新品；1->新品.如果是新品,会默认在移动端首页显示
          'note': '', // 备注信息,比如: 小舅子渠道,回扣很多.
          'originalPrice': 1000, // 原价
          'pic': '', // 封面图片
          'previewStatus': 0, // 是否为预告商品：0->不是；1->是 ,
          'price': 0,
          'productAttributeCategoryId': '', // 预留  商品属性
          'productCategoryId': '', // 商品分类id
          'productCategoryName': '', // 商品分类名称
          'productSn': '', // 商品编码
          'promotionPerLimit': 0, // 预留 活动商品限购/人
          'promotionPrice': 0, // 预留 活动价格
          'deleteStatus': 0, // 标记删除,后台使用,前台无效
          'promotionEndTime': '', // 预留 活动结束时间
          'promotionStartTime': '',
          'promotionType': 0, // 预留 促销类型：0->没有促销使用原价;1->使用促销价；2->使用会员价；3->使用阶梯价格；4->使用满减价格；5->限时购 ,
          'modifyTime': '', // 更新时间
          'publishStatus': 0, // 上架状态：0->下架；1->上架
          'recommendStatus': 0, //  推荐状态；0->不推荐；1->推荐 ,
          'sale': 0, // 销量
          'serviceIds': '', // 以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮 ,
          'sort': 19484411, // 排序倒排, 999 越大越靠前
          'stock': 0, // 库存
          'subTitle': '', // 次级标题
          'unit': '', // 单位:  台/辆/斤/个...
          'usePointLimit': 0, // 预留 购买使用积分限制
          'verifyStatus': 0, // 审核状态：0->未审核；1->审核通过 ,
          'weight': 0, // 重量,单位kg
          'createTime': '' // 创建时间,后台生成
        }
      }
    }
  },
  methods: {
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
    $imgAdd(pos, $file) {
      // 将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file', $file)
      uploadFileOss(formdata).then((res) => {
        console.log(res)
        this.$refs.md.$img2Url(pos, res.data.fileUrl)
      })
    }

  }
}
export default myMixin
