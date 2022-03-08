<template>
  <div class="list">
    <el-collapse>
      <el-collapse-item title="商品管理介绍" name="1" style="text-indent: 10px;">
        <div style="margin-left: 10px">
          商品管理模块可以对客户端的商品进行增删改查等相关操作,来控制客户端商品的列表展示和商品详情
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-card class="margin_30">
      <el-collapse style="border-top: 0px">
        <el-collapse-item title="条件查询" name="1">
          <el-form
            ref="formInline"
            :inline="true"
            :model="formInline"
            class="demo-form-inline"
            size="mini"
          >
            <el-form-item label="商品名称" prop="name">
              <el-input
                v-model="formInline.name"
                placeholder="商品名称/模糊查询"
              />
            </el-form-item>
            <el-form-item label="商品货号" prop="productSn">
              <el-input v-model="formInline.productSn" placeholder="商品货号" />
            </el-form-item>
            <el-form-item label="品牌" prop="brandId">
              <el-select v-model="formInline.brandId" placeholder="品牌">
                <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </el-form-item>
            <el-form-item label="上架状态" prop="publishStatus">
              <el-select v-model="formInline.publishStatus" placeholder="上架状态">
                <el-option label="上架" value="1" />
                <el-option label="未上架" value="0" />
              </el-select>
            </el-form-item>
            <el-form-item label="审核状态" prop="verifyStatus">
              <el-select v-model="formInline.verifyStatus" placeholder="审核状态">
                <el-option label="审核" value="1" />
                <el-option label="未审核" value="0" />
              </el-select>
            </el-form-item>
            <el-form-item style="margin-right:20px">
              <el-button
                type="primary"
                size="mini"
                plain
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
        </el-collapse-item>
      </el-collapse>
    </el-card>
    <el-card class="margin_30">
      <div slot="header" class="clearfix">
        <el-button
          style="float: left"
          type="primary"
          size="mini"
          @click="addProduct"
        >新增</el-button>
        <el-button
          style="float: left"
          type="primary"
          size="mini"
          :loading="loading"
          @click="exportExcel"
        >导出商品列表excel文件</el-button>
      </div>
      <el-table :data="productList" border style="width: 100%">
        <el-table-column
          type="index"
          fixed="left"
          label="序号"
          align="center"
          width="60"
        />
        <el-table-column
          prop="pic"
          label="商品图片"
          align="center"
          width="180"
        >
          <!-- 具名插槽 -->
          <template v-slot="scope">
            <img
              class="list_img"
              :src="scope.row.pic"
              alt=""
              style="
                width: 100px;
                height: 100px;
                display: block;
                margin: 0 auto;
              "
            >
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="商品名称"
          align="center"
          width="160"
        />
        <el-table-column
          prop="price"
          label="商品价格"
          align="center"
          width="180"
        >
          <template slot-scope="scope">
            <div>原价: {{ scope.row.originalPrice }}</div>
            <div>现价: {{ scope.row.price }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="productCategoryName"
          label="商品类别"
          align="center"
          width="150"
        />
        <el-table-column
          prop="isShow"
          label="标签1"
          align="center"
          width="160"
        >
          <template v-slot="scope">
            <div>
              最新: <el-switch
                v-model="scope.row.newStatus"
                @change="changeNewStatus(scope.row.id)"
              />

            </div>
            <div>
              推荐: <el-switch
                v-model="scope.row.recommendStatus"
                @change="changeRecommandStatus(scope.row.id)"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="isShow"
          label="标签2"
          align="center"
          width="160"
        >
          <template v-slot="scope">
            <div>
              发布: <el-switch
                v-model="scope.row.publishStatus"
                @change="changePublishStatus(scope.row.id)"
              />

            </div>
            <div>
              审核: <el-switch
                v-model="scope.row.verifyStatus"
                @change="changeVerifyStatus(scope.row.id)"
              />
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="Sku"
          align="center"
          width="120"
        >
          <template v-slot="scope">
            <el-button type="text" @click="editSku(scope.row)">编辑sku</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="weight"
          label="重量"
          align="center"
          width="120"
        />
        <el-table-column
          prop="sort"
          label="排序"
          align="center"
          width="120"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="150px"
          align="center"
        >
          <template v-slot="scope">
            <el-button
              type="primary"
              size="small"
              @click="edit(scope.row)"
            >编辑</el-button>
            <el-button
              type="danger"
              size="small"
              @click="del(scope.row)"
            >删除</el-button>
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
    <skuDetail ref="skuDetail" @success="detailSuccess" />
  </div>
</template>

<script>
import { productsByPage, del, switchNewStatus, switchPublishStatus, switchRecommandStatus, switchVerifyStatus, productSkusDetail } from '@/api/product/index'
import { findAllBrand } from '@/api/product/brand'
import skuDetail from '@/views/product/components/skuDetail.vue'
export default {
  components: { skuDetail },
  data() {
    return {
      formInline: {
        product: {
          'albumPics': '',
          'brandId': '',
          'brandName': '',
          'createTime': '',
          'deleteStatus': 0,
          'description': '',
          'detailDesc': '',
          'detailHtml': '',
          'detailMobileHtml': '',
          'detailTitle': '',
          'feightTemplateId': '',
          'giftGrowth': 0,
          'giftPoint': 0,
          'id': '',
          'keywords': '',
          'lowStock': 0,
          'modifyTime': '',
          'name': '',
          'newStatus': '',
          'note': '',
          'originalPrice': 0, // 原价
          'pic': '',
          'previewStatus': 0, // 是否为预告商品：0->不是；1->是 ,
          'price': 0,
          'productAttributeCategoryId': '',
          'productCategoryId': '',
          'productCategoryName': '',
          'productSn': '',
          'promotionEndTime': '',
          'promotionPerLimit': 0,
          'promotionPrice': 0,
          'promotionStartTime': '',
          'promotionType': 0,
          'publishStatus': 0, // 上架状态：0->下架；1->上架 ,
          'recommendStatus': 0, // 推荐状态；0->不推荐；1->推荐 ,
          'sale': 0, // 销量
          'serviceIds': '', // 以逗号分割的产品服务
          'sort': 0,
          'stock': 0, // 库存
          'subTitle': '',
          'unit': '',
          'usePointLimit': 0,
          'verifyStatus': 0, // 审核状态：0->未审核；1->审核通过 ,
          'weight': 0
        }
      },
      productList: [],
      start: 1,
      limit: 10,
      total: 0,
      brandList: [],
      loading: false// 导出excel loading
    }
  },
  computed: {},
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      productsByPage(this.start, this.limit, this.formInline).then(res => {
        console.log(res)
        res.data.rows.forEach((ele) => {
          // 标签1
          ele.newStatus = !!ele.newStatus
          ele.recommendStatus = !!ele.recommendStatus
          // 标签2
          ele.publishStatus = !!ele.publishStatus
          ele.verifyStatus = !!ele.verifyStatus
        })
        this.productList = res.data.rows
        this.total = res.data.total
      })
      findAllBrand().then(res => {
        console.log(res)
        this.brandList = res.data.items
      })
    },
    // 新增
    addProduct() {
      this.$router.push('/product/list/addProduct')
    },
    // excel 导出
    exportExcel() {
      this.loading = true// 下载loading显示1s后,开始导出excel
      setTimeout(() => {
        import('@/vendor/Export2Excel').then((excel) => {
          const tHeader = ['商品名称', '商品品牌', '商品价格']
          const filterVal = ['name', 'brandName', 'price']
          const list = this.productList
          const data = this.formatJson(filterVal, list)
          // console.log('list===',JSON.stringify()list)
          excel.export_json_to_excel({
            header: tHeader,
            data,
            filename: 'product-list',
            autoWidth: true,
            bookType: 'xlsx'
          })
          this.loading = false
        })
      }, 1000)
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) =>
        filterVal.map((j) => {
          return v[j]
        })
      )
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
    // 是否最新
    changeNewStatus(val) {
      console.log(val)
      var item = this.productList.find((ele) => ele.id === val)
      switchNewStatus({
        status: item.newStatus ? 1 : 0,
        productId: val }).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '修改状态成功!'
          })
          this.init() // 修改成功后再刷新
        }
      })
    },
    // 是否推荐
    changeRecommandStatus(val) {
      var item = this.productList.find((ele) => ele.id === val)
      switchRecommandStatus({
        status: item.recommendStatus ? 1 : 0,
        productId: val }).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '修改状态成功!'
          })
          this.init() // 修改成功后再刷新
        }
      })
    },
    // 是否发布
    changePublishStatus(val) {
      var item = this.productList.find((ele) => ele.id === val)
      switchPublishStatus({
        productId: val,
        status: item.publishStatus ? 1 : 0
      }).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '修改状态成功!'
          })
          this.init() // 修改成功后再刷新
        }
      })
    },
    // 是否审核
    changeVerifyStatus(val) {
      var item = this.productList.find((ele) => ele.id === val)
      switchVerifyStatus({
        productId: val,
        status: item.verifyStatus ? 1 : 0
      }).then(res => {
        if (res.success) {
          this.$message({
            type: 'success',
            message: '修改状态成功!'
          })
          this.init() // 修改成功后再刷新
        }
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
    // 编辑
    edit(val) {
      console.log(val)
      this.$router.push(`/product/list/editProduct?id=${val.id}`)
    },
    // 编辑sku
    editSku(val) {
      this.$refs.skuDetail.openDetail(val.id)
    },
    // 编辑成功后的回调函数
    detailSuccess() {
      this.init()
    },
    // 删除
    del(val) {
      this.$confirm('注意 将永久删除该商品!', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false
      }).then((res) => {
        del(val.id).then((res) => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.init() // 删除成功后再刷新
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
.list {
  // ::v-deep .el-collapse-item__header {
  //   //text-indent: 10px;
  // }
  .el-form-item{
    margin-right:40px ;
  }
}
</style>
