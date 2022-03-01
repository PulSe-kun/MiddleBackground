<template>
  <div class="addProduct">
    <div class="steps">
      <el-steps :active="active" finish-status="success" align-center>
        <el-step title="商品基本信息" />
        <el-step title="添加库存信息" />
        <el-step title="添加移动端详情" />
      </el-steps>
    </div>
    <div class="content">
      <div v-if="active==1" class="basic">
        <el-card class="margin_30">
          <el-form
            ref="productData"
            :model="productData"
            :rules="rules"
            label-width="80px"
            class="demo-productData"
            size="mini"
          >
            <div class="header">
              基本信息
            </div>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="商品名称" prop="name">
                  <el-input v-model="productData.product.name" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="商品编码" prop="productSn">
                  <el-input v-model="productData.product.productSn" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="商品分类" prop="productCategoryId">
                  <el-select v-model="productData.product.productCategoryId" placeholder="商品分类" style="width:100%" @change="getCategoryName">
                    <el-option v-for="item in categoryList" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="品牌" prop="brandId">
                  <el-select
                    v-model="productData.product.brandId"
                    placeholder="品牌"
                    style="width:100%"
                    @change="getBrandName"
                  >
                    <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="17">
                <el-form-item label="商品描述" prop="description">
                  <el-input v-model="productData.product.description" type="textarea" maxlength="24" show-word-limit :rows="3" />
                </el-form-item>
              </el-col>
            </el-row>
            <div class="header">
              商品属性
            </div>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="商品原价" prop="originalPrice">
                  <el-input-number v-model="productData.product.originalPrice" @change="handleChange" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="促销类型" prop="promotionType">
                  <el-select v-model="productData.product.promotionType" placeholder="没有使用促销价格" :disabled="true" style="width:100%" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="活动价格" prop="promotionPrice">
                  <el-input-number v-model="productData.product.promotionPrice" :disabled="true" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="重量" prop="weight">
                  <el-input-number v-model="productData.product.weight" @change="handleChange" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="审核状态" prop="verifyStatus">
                  <el-switch v-model="productData.product.verifyStatus" @change="switchVerifyStatus" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否上架" prop="publishStatus">
                  <el-switch v-model="productData.product.publishStatus" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="缩略图">
                  <el-upload
                    action="http://leju.bufan.cloud/lejuAdmin/material/uploadFileOss"
                    list-type="picture-card"
                    :multiple="false"
                    :limit="1"
                    :headers="headers"
                    :on-success="handleAvatar"
                  >
                    <img v-if="productData.pic" :src="productData.pic" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon" />
                  </el-upload>
                </el-form-item>
              </el-col>
            </el-row>
            <div class="header">
              其他信息
            </div>
            <el-row :gutter="20">
              <el-col :span="8">
                <el-form-item label="推荐状态" prop="recommendStatus">
                  <el-switch v-model="productData.product.recommendStatus" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="新品状态" prop="newStatus">
                  <el-switch v-model="productData.product.newStatus" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="预告商品" prop="delivery">
                  <el-switch v-model="productData.product.previewStatus" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="搜索关键词" prop="keywords ">
                  <el-input v-model="productData.product.keywords" placeholder="关键词" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="库存预警" prop="lowStock">
                  <el-input-number v-model="productData.product.lowStock " @change="handleChange" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="商品排序" prop="sort">
                  <el-input-number v-model="productData.product.sort" @change="handleChange" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="产品服务">
                  <el-checkbox-group
                    v-model="serviceIds"
                    @change="doMore"
                  >
                    <el-checkbox label="1">无忧退货</el-checkbox>
                    <el-checkbox label="2">快速退款</el-checkbox>
                    <el-checkbox label="3">免费包邮</el-checkbox>
                  </el-checkbox-group>
                </el-form-item>
              </el-col>
              <el-col :span="24" :offset="10">
                <el-button size="small" type="primary" @click="next">下一步,填写库存信息</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <div v-else-if="active==2" class="sku">
        <el-card class="margin_30">
          <el-form
            ref="productData"
            :model="productData"
            :rules="rules"
            label-width="80px"
            class="demo-productData"
            size="mini"
          >
            <div class="header">
              商品sku信息
            </div>
            <el-row>
              <el-col :span="12">
                <el-form-item label="标题" prop="detailTitle">
                  <el-input v-model="productData.product.detailTitle" placeholder="标题" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="副标题" prop="detailDesc">
                  <el-input v-model="productData.product.detailDesc" placeholder="副标题" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="画册图片">
                  <el-upload
                    :action="uploadUrl"
                    :headers="headers"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :on-success="imgUploadSuccess"
                    :limit="5"
                    :on-preview="handlePictureCardPreview"
                    list-type="picture-card"
                    :before-upload="beforeAvatarUpload"
                  >
                    <i class="el-icon-plus" />
                    <!-- 超过五个时候 换个不能点击按钮 -->
                    <el-dialog :visible.sync="dialogVisible">
                      <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog>
                    <div slot="tip" class="el-upload__tip">
                      只能上传jpg/png文件，且不超过500kb,文件不超过5个
                    </div>
                  </el-upload>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="sku设置" prop="name">
                  <div class="info">
                    <div v-if="colorList.length>0" class="line">
                      <span style="margin-right:10px;color:orange">颜色:</span><el-checkbox-group v-model="selectedColor">
                        <el-checkbox v-for="item in colorList" :key="item.id" :label="item.value">
                          {{ item.value }}
                          <el-link type="danger" @click="delColor">删除</el-link>
                        </el-checkbox>
                      </el-checkbox-group>
                    </div>
                    <div v-if="sizeList.length>0" class="line">
                      <span style="margin-right:10px;color:orange">大小:</span><el-checkbox-group v-model="selectedSize">
                        <el-checkbox v-for="item in sizeList" :key="item.id" :label="item.value">
                          {{ item.value }}
                          <el-link type="danger" @click="delSize">删除</el-link>
                        </el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>
                  <el-row :gutter="8">
                    <el-col :span="4">
                      <el-input v-model="color" placeholder="颜色选项" size="mini" />
                    </el-col>
                    <el-col :span="4">
                      <el-button size="mini" @click="addColor">创建颜色选项</el-button>
                    </el-col>
                    <el-col :span="4">
                      <el-input v-model="size" placeholder="大小选项" size="mini" />
                    </el-col>
                    <el-col :span="4">
                      <el-button size="mini" @click="addSize">创建大小选项</el-button>
                    </el-col>
                    <el-col :span="3">
                      <el-button type="primary" size="small" @click="buildList">生成sku列表</el-button>
                    </el-col>
                    <el-col :span="3">
                      <el-button type="primary" size="small" @click="addSku">新增sku</el-button>
                    </el-col>
                  </el-row>
                  <div class="sku_table" style="padding-top:10px">
                    <!-- 生成sku的列表 -->
                    <el-table v-if="productData.pmsSkuStockList.length > 0" size="mini" :data="productData.pmsSkuStockList" border stripe>
                      <el-table-column type="index" label="#" fixed="left" align="center" />
                      <el-table-column label="图片" :width="140" align="center">
                        <template v-slot="scope">
                          <el-upload
                            :action="uploadUrl"
                            :headers="headers"
                            :show-file-list="false"
                            :on-success="handleAvatar"
                            @click.native="getTableItem(scope.row)"
                          >
                            <img
                              v-if="scope.row.pic"
                              style="width: 100px; height: 100px"
                              :src="scope.row.pic"
                              class="avatar"
                            >
                            <i
                              v-else
                              class="el-icon-plus avatar-uploader-icon"
                            />
                          </el-upload>
                        </template>
                      </el-table-column>
                      <el-table-column label="颜色" :width="180" align="center">
                        <template v-slot="scope">
                          <el-input v-model="scope.row.spData[0].value" size="mini" />
                        </template>
                      </el-table-column>
                      <el-table-column label="大小" :width="180" align="center">
                        <template v-slot="scope">
                          <!-- 注意这里必须加 v-if，因为有些没有大小， 不加v-if会报错 -->
                          <el-input
                            v-if="scope.row.spData"
                            v-model="scope.row.spData[1].value"
                            size="mini"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column label="库存" :width="120" align="center">
                        <template v-slot="scope">
                          <el-input
                            v-model="scope.row.stock"
                            size="mini"
                            placeholder="自定义库存"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column label="预警库存" :width="120" align="center">
                        <template v-slot="scope">
                          <el-input
                            v-model="scope.row.lowStock"
                            size="mini"
                            placeholder="预警库存"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column label="锁定库存" :width="120" align="center">
                        <template v-slot="scope">
                          <el-input
                            v-model="scope.row.lockStock"
                            size="mini"
                            placeholder="锁定库存"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column label="sku编码" :width="200" align="center">
                        <template v-slot="scope">
                          <el-input
                            v-model="scope.row.skuCode"
                            size="mini"
                            placeholder="自定义sku编码"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column label="价格" :width="120" align="center">
                        <template v-slot="scope">
                          <el-input
                            v-model="scope.row.price"
                            size="mini"
                            placeholder="价格,单位:分"
                          />
                        </template>
                      </el-table-column>
                      <el-table-column label="销量" :width="120" align="center">
                        <template v-slot="scope">
                          <el-input v-model="scope.row.sale" size="mini" />
                        </template>
                      </el-table-column>
                      <el-table-column fixed="right" label="操作" :width="140" align="center">
                        <template v-slot="scope">
                          <el-button
                            style="color: red"
                            size="mini"
                            type="text"
                            @click="removeSku(scope.row)"
                          >删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </el-form-item>
              </el-col>
              <el-col :span="24" :offset="10">
                <el-button size="small" @click="pre">返回上一步</el-button>
                <el-button size="small" type="primary" @click="next">下一步,填写移动端详情</el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
      </div>
      <div v-else class="info">
        <el-card class="margin_30">
          <div class="header">
            详情描述
          </div>
          <div class="main">
            <el-form ref="productData" :model="productData" :rules="rules" label-width="80px" size="mini">
              <el-form-item label="商品详情">
                <tinymce />
              </el-form-item>
              <el-form-item label="备注">
                <el-input
                  v-model="productData.product.note"
                  type="textarea"
                  :rows="2"
                  placeholder="备注"
                />
              </el-form-item>
            </el-form>
          </div>
          <el-row>
            <el-col :span="8" :offset="10">
              <el-button size="small" @click="pre">返回上一步</el-button>
              <el-button size="small" type="primary" @click="submit">提交保存</el-button>
            </el-col>
          </el-row>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import tinymce from '@/components/Tinymce'
import { addProductAndSkus } from '@/api/product/index'
import { findAllBrand } from '@/api/product/brand'
import { getAllCategory } from '@/api/product/category'
import mixin from '@/mixin/index'
import { v4 as uuidv4 } from 'uuid'
export default {
  components: {
    tinymce
  },
  mixins: [mixin],
  data() {
    return {
      brandList: [],
      categoryList: [],
      active: 1, // 下一步激活
      dialogImageUrl: '', // 预览图片
      dialogVisible: false,
      serviceIds: [], // 商品服务
      uploadUrl: 'http://leju.bufan.cloud/lejuAdmin/material/uploadFileOss', // 上传路径
      fileList: [], // 上传的文件列表
      color: '',
      selectedColor: [],
      colorList: [
      ], // 颜色选项
      size: '',
      selectedSize: [],
      sizeList: [
      ], // 大小选项
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
          'lowStock': 10, // 预留 低库存预警
          'name': '', // 商品名称
          'newStatus': false, // 新品状态:0->不是新品；1->新品.如果是新品,会默认在移动端首页显示
          'note': '', // 备注信息,比如: 小舅子渠道,回扣很多.
          'originalPrice': 0, // 原价
          'pic': '', // 封面图片
          'previewStatus': false, // 是否为预告商品：0->不是；1->是 ,
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
          'publishStatus': true, // 上架状态：0->下架；1->上架
          'recommendStatus': false, //  推荐状态；0->不推荐；1->推荐 ,
          'sale': 0, // 销量
          'serviceIds': '', // 以逗号分割的产品服务：1->无忧退货；2->快速退款；3->免费包邮 ,
          'sort': 666, // 排序倒排, 999 越大越靠前
          'stock': 0, // 库存
          'subTitle': '', // 次级标题
          'unit': '', // 单位:  台/辆/斤/个...
          'usePointLimit': 0, // 预留 购买使用积分限制
          'verifyStatus': true, // 审核状态：0->未审核；1->审核通过 ,
          'weight': 0, // 重量,单位kg
          'createTime': '' // 创建时间,后台生成
        }
      },
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      findAllBrand().then(res => {
        console.log(res)
        this.brandList = res.data.items
      })
      getAllCategory().then(res => {
        console.log(res)
        this.categoryList = res.data.items.find(ele => // 查找 name为乐居
          ele.category.name === '乐居'
        ).children
      })
    },
    // 确认新增
    submit() {
      // switch 值改为 0,1
      this.productData.product.newStatus = this.productData.product.newStatus ? 1 : 0
      this.productData.product.previewStatus = this.productData.product.previewStatus ? 1 : 0
      this.productData.product.publishStatus = this.productData.product.publishStatus ? 1 : 0// 上架
      this.productData.product.recommendStatus = this.productData.product.recommendStatus ? 1 : 0
      this.productData.product.verifyStatus = this.productData.product.verifyStatus ? 1 : 0// 审核
      addProductAndSkus().then(res => {
        console.log(res)
      })
    },
    // 获取商品分类名称
    getCategoryName(val) {
      console.log(val)
      // 匹配查找
      this.productData.product.productCategoryName = this.categoryList.find(ele => ele.id === val).name
    },
    // 获取商品分类名称
    getBrandName(val) {
      console.log(val)
      // 匹配查找
      this.productData.product.brandName = this.brandList.find(ele => ele.id === val).name
    },
    // 审核状态
    switchVerifyStatus(res) {
      console.log(res) // 组件的值显示 true和false 新增前需要转成 1,0
    },
    // 移除图片
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 缩略图上传
    handleAvatar(res) {
    // 获取图片路径
      console.log(res)
      this.brandList.logo = res.data.fileUrl
    },
    // 画册上传
    imgUploadSuccess() {

    },
    // 使用 before-upload 限制用户上传的图片格式和大小
    beforeAvatarUpload(file) {
      console.log(file)
      const isJPG = file.type === 'image/jpeg' || 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 1
      if (!isJPG) {
        this.$message.error('上传头像,只能jpg/png格式哦!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
      }
      return isJPG && isLt2M
    },
    // 下一步
    next() {
      if (this.active >= 3) {
        return
      }
      this.active++
    },
    // 返回上一步
    pre() {
      if (this.active <= 1) {
        return
      }
      this.active--
    },
    // 增加颜色
    addColor() {
      this.colorList.push({ id: uuidv4(), value: this.color })
      this.color = ''
    },
    // 增加大小
    addSize() {
      this.sizeList.push({ id: uuidv4(), value: this.size })
      this.size = ''
    },
    // 生成sku列表
    buildList() {
      var arr = []
      // for循坏嵌套 一一对应
      this.selectedColor.forEach(ele => {
        this.selectedSize.forEach(ite => {
          // var obj = {
          //   color: ele,
          //   size: ite
          // }
          var obj = {
            'id': '', // 新增不需要,编辑需要
            'lockStock': 0, // 锁定库存 预留
            'lowStock': 0, // 低库存预警  预留
            'pic': '', // sku封面图片
            'price': 0, // 价格
            'productId': '', // 商品id,新增不需要,后台会自动关联
            'promotionPrice': 0, //  促销价格  预留
            'sale': 0, // 销量 预留
            'skuCode': '', // sku编码
            'spData': [{ 'key': '颜色', 'value': ele }, { 'key': '大小', 'value': ite }], //   [{"key":"颜色","value":"土豪金"},{"key":"大小","value":"128g"}]
            'stock': 0, // 库存
            'modifyTime': '', // 更新时间 后台维护
            'createTime': '' // 后台自动生成
          }
          arr.push(obj)
        })
      })
      console.log(arr)
      this.productData.pmsSkuStockList = arr// 赋值到sku列表中
    },
    // 新增sku
    addSku() {

    },
    // 删除颜色
    delColor() {

    },
    // 删除大小
    delSize() {},
    // 商品服务
    doMore(val) {
      console.log(val)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    handleChange() {

    }
  }
}
</script>

<style scoped lang="scss">
.addProduct {
  .steps {
    width: 100%;
    background-color: #fff;
    margin-bottom: 30px;
  }
  .header {
    font-size: 16px;
    padding: 10px 0;
    border-bottom: 1px solid #e5e5e5;
    margin-bottom: 30px;
  }
  .info{
    display: flex;
    .line{
    display: flex;
    margin-right: 30px;
  }
  }
 .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
}
</style>
