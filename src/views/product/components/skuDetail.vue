<template>
  <div class="sku">
    <el-dialog title="sku列表" :visible.sync="dialogTableVisible" width="70%">
      <div class="btn">
        <el-button type="primary" size="small" @click="addSku">新增sku</el-button>
      </div>
      <el-table size="mini" :data="productData.pmsSkuStockList" border stripe>
        <el-table-column type="index" label="#" fixed="left" align="center" />
        <el-table-column label="图片" :width="140" align="center" prop="pic">
          <!-- @click.native="getSkuPic(scope.row.ids)" -->
          <template v-slot="scope">
            <el-upload
              :action="uploadUrl"
              :headers="headers"
              :show-file-list="false"
              :on-success="el=>handleSkuPic(el,scope.row.ids)"
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
        <el-table-column label="颜色" :width="180" align="center" prop="spData[0].value">
          <template v-slot="scope">
            <el-input v-model="scope.row.spData[0].value" size="mini" />
          </template>
        </el-table-column>
        <el-table-column label="大小" :width="180" align="center" prop="spData[1].value">
          <template v-slot="scope">
            <!-- 注意这里必须加 v-if，因为有些没有大小， 不加v-if会报错 -->
            <el-input
              v-if="scope.row.spData"
              v-model="scope.row.spData[1].value"
              size="mini"
            />
          </template>
        </el-table-column>
        <el-table-column label="库存" :width="120" align="center" prop="stock">
          <template v-slot="scope">
            <el-input
              v-model="scope.row.stock"
              size="mini"
              placeholder="自定义库存"
            />
          </template>
        </el-table-column>
        <el-table-column label="预警库存" :width="120" align="center" prop="lowStock">
          <template v-slot="scope">
            <el-input
              v-model="scope.row.lowStock"
              size="mini"
              placeholder="预警库存"
            />
          </template>
        </el-table-column>
        <el-table-column label="锁定库存" :width="120" align="center" prop="lockStock">
          <template v-slot="scope">
            <el-input
              v-model="scope.row.lockStock"
              size="mini"
              placeholder="锁定库存"
            />
          </template>
        </el-table-column>
        <el-table-column label="sku编码" :width="200" align="center" prop="skuCode">
          <template v-slot="scope">
            <el-input
              v-model="scope.row.skuCode"
              size="mini"
              placeholder="自定义sku编码"
            />
          </template>
        </el-table-column>
        <el-table-column label="价格" :width="120" align="center" prop="price">
          <template v-slot="scope">
            <el-input
              v-model="scope.row.price"
              size="mini"
              placeholder="价格,单位:分"
            />
          </template>
        </el-table-column>
        <el-table-column label="销量" :width="120" align="center" prop="sale">
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
            <el-button
              size="mini"
              type="text"
              @click="submitSku(scope.row)"
            >修改编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="btn">
        <el-button type="info" size="small" style="margin-top:20px" @click="cancel">取消编辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addProductSkus, delSku, getSkusByProductId, updateSkuInfo } from '@/api/product/sku'
import { v4 as uuidv4 } from 'uuid'
import mixin from '@/mixin/index'
export default {
  mixins: [mixin],
  data() {
    return {
      uploadUrl: 'http://leju.bufan.cloud/lejuAdmin/material/uploadFileOss', // 上传路径
      dialogTableVisible: false,
      skuList: [],
      productData: {
        'pmsSkuStockList': [{ 'id': '', // 新增不需要,编辑需要
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
        }]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      getSkusByProductId(this.productId).then(res => {
        console.log(res)
        if (res.success) {
          res.data.items.forEach((item) => {
            this.productData.pmsSkuStockList.push({
              ...item,
              spData: JSON.parse(item.spData)
            })
          })
        }
      })
    },
    // 对应list 里面openDetail方法
    openDetail(productId) {
      this.dialogTableVisible = true
      this.productId = productId
      this.productData.pmsSkuStockList = []
      this.init()
    },
    // 新增sku
    addSku() {
      var newObj = {
        ids: uuidv4(), // 唯一的标识
        'id': '', // 新增不需要,编辑需要
        'lockStock': 10, // 锁定库存 预留
        'lowStock': 20, // 低库存预警  预留
        'pic': '', // sku封面图片
        'price': 0, // 价格
        'productId': '', // 商品id,新增不需要,后台会自动关联
        'promotionPrice': 0, //  促销价格  预留
        'sale': 0, // 销量 预留
        'skuCode': '', // sku编码
        'spData': [{ 'key': '颜色', 'value': '' }, { 'key': '大小', 'value': '' }], //   [{"key":"颜色","value":"土豪金"},{"key":"大小","value":"128g"}]
        'stock': 100, // 库存
        'modifyTime': '', // 更新时间 后台维护
        'createTime': '' // 后台自动生成
      }
      this.productData.pmsSkuStockList.push(newObj)
    },
    // sku 图片上传成功
    handleSkuPic(res, val) {
      console.log(res, val)
      var item = this.productData.pmsSkuStockList.find(ele => ele.ids === val)
      item.pic = res.data.fileUrl
    },
    // 提交编辑
    submitSku() {
      updateSkuInfo({
        skuStock: {
          'createTime': '',
          'id': '',
          'lockStock': 0,
          'lowStock': 0,
          'modifyTime': '',
          'pic': '',
          'price': 0,
          'productId': '',
          'promotionPrice': 0,
          'sale': 0,
          'skuCode': '',
          'spData': '',
          'stock': 0
        }
      }).then(res => {
        console.log(res)
      })
    },
    // 取消编辑
    cancel() {
      this.dialogTableVisible = !this.dialogTableVisible
    },
    // 删除某一个sku
    removeSku(val) {
      console.log(val)
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        lockScroll: false
      }).then(() => {
        delSku(val.id).then(res => {
          if (res.success) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.init()
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
.sku{
  .btn{
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
  }
}
</style>
