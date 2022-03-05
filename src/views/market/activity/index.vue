<template>
  <div class="activity">
    <el-card class="margin_30">
      <div slot="header" class="clearfix">
        <el-button
          style="float: left"
          type="primary"
          size="mini"
          @click="addAddress"
        >新增</el-button>
      </div>
      <el-table :data="activityList" border style="width: 100%">
        <el-table-column
          type="index"
          fixed="left"
          label="序号"
          align="center"
          width="60"
        />
        <el-table-column prop="pic" label="商品图片" align="center" width="160">
          <!-- 作用域插槽 -->
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
        <el-table-column label="活动时间" align="center" width="260">
          <template slot-scope="scope">
            <div>开始时间: {{ scope.row.promotionStartTime }}</div>
            <div>结束时间: {{ scope.row.promotionEndTime }}</div>
          </template>
        </el-table-column>
        <el-table-column
          prop="publishStatus"
          label="是否过期"
          align="center"
          width="160"
        />
        <el-table-column
          prop="name"
          label="商品名称"
          align="center"
          width="200"
        />
        <el-table-column
          prop="brandName"
          label="品牌名称"
          align="center"
          width="200"
        />
        <el-table-column
          prop="price"
          label="商品价格"
          align="center"
          width="160"
        />
        <el-table-column
          prop="productCategoryName"
          label="商品类型"
          align="center"
          width="160"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
          align="center"
          width="200"
        />
        <el-table-column
          fixed="right"
          label="操作"
          width="150px"
          align="center"
        >
          <template v-slot="scope">
            <el-button
              type="danger"
              size="small"
              @click="del(scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 弹窗 -->
    <el-dialog
      title="热销详情"
      :visible.sync="dialogFormVisible"
      width="70%"
      :close-on-click-modal="false"
      @close="closed"
    >
      <div class="main">
        <el-card class="margin_30" shadow="never">
          <div slot="header" class="clearfix">
            <span>条件查询</span>
          </div>
          <el-form
            ref="searchData"
            :inline="true"
            :model="searchData"
            class="demo-form-inline"
            size="mini"
          >
            <el-row>
              <el-col :span="4" :offset="0">
                <el-form-item prop="name">
                  <el-input
                    v-model="searchData.name"
                    placeholder="商品名称/模糊查询"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="0">
                <el-form-item prop="productSn">
                  <el-input
                    v-model="searchData.productSn"
                    placeholder="商品货号"
                  />
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="0">
                <el-form-item prop="brandId">
                  <el-select v-model="searchData.brandId" placeholder="品牌">
                    <el-option
                      v-for="item in brandList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="0">
                <el-form-item prop="publishStatus">
                  <el-select
                    v-model="searchData.publishStatus"
                    placeholder="上架状态"
                  >
                    <el-option label="上架" value="1" />
                    <el-option label="未上架" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="0">
                <el-form-item prop="verifyStatus">
                  <el-select
                    v-model="searchData.verifyStatus"
                    placeholder="审核状态"
                  >
                    <el-option label="审核" value="1" />
                    <el-option label="未审核" value="0" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="4" :offset="0">
                <el-form-item>
                  <el-button
                    type="primary"
                    size="mini"
                    plain
                    @click="onSearch"
                  >查询</el-button>
                  <el-button
                    size="mini"
                    plain
                    @click="resetForm('searchData')"
                  >重置</el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>
        <el-card class="margin_30" shadow="never">
          <div slot="header" class="clearfix">
            <span>商品列表</span>
          </div>
          <el-table :data="productList" border style="width: 100%">
            <el-table-column
              type="index"
              label="序号"
              align="center"
              width="60"
            />
            <el-table-column prop="name" label="选择" align="center" width="60">
              <template v-slot="scope">
                <el-radio
                  v-model="selectGoods"
                  :label="scope.row.id"
                  style="margin-left: 10px"
                  @change="radioEvent"
                ><span></span></el-radio>
              </template>
            </el-table-column>
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
              width="260"
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
            <el-table-column prop="weight" label="重量" align="center" />
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
      </div>
    </el-dialog>
    <!-- 第二次弹框 -->
    <el-dialog
      title="编辑限时活动"
      :visible.sync="selectDialog"
      width="50%"
      @close="closed"
    >
      <el-form
        ref="form"
        :model="form"
        label-width="100px"
        :inline="false"
        size="small"
      >
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="商品原价">
              <span>{{ form.price }}</span>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="商品名称">
              <span>{{ form.name }}</span>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="促销价格">
              <el-input-number
                v-model="form.promotionPrice"
                style="width: 100%"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="排序">
              <el-input-number
                v-model="form.sort"
                style="width: 100%"
              ></el-input-number>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="开始时间">
              <div class="block">
                <el-date-picker
                  v-model="form.promotionStartTime"
                  type="datetime"
                  placeholder="选择日期时间"
                  value-format="yyyy-MM-dd HH:MM:ss"
                  style="width: 100%"
                >
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="结束时间">
              <div class="block">
                <el-date-picker
                  v-model="form.promotionEndTime"
                  type="datetime"
                  style="width: 100%"
                  value-format="yyyy-MM-dd HH:MM:ss"
                  placeholder="选择日期时间"
                >
                </el-date-picker>
              </div>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12" :offset="0">
            <el-form-item label="活动限购数量">
              <el-input-number
                v-model="form.sort"
                style="width: 100%"
              ></el-input-number>
            </el-form-item>
          </el-col>
          <el-col :span="12" :offset="0">
            <el-form-item label="商品图片" prop="pic">
              <img
                :src="form.pic"
                alt=""
                style="
                  width: 120px;
                  height: 120px;
                  display: block;
                  margin: 0 auto;
                "
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="sure">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  findAllRecommends,
  delRecommend,
  addRecommend
} from '@/api/market/index'
import { productsByPage } from '@/api/product/index'
import { findAllBrand } from '@/api/product/brand'
import mixin from '@/mixin/index'
export default {
  mixins: [mixin],
  data() {
    return {
      activityList: [], // 活动列表
      brandList: [], // 品牌列表
      productList: [], // 商品列表
      selectGoods: '', // 选中的商品
      formLabelWidth: '100px',
      dialogFormVisible: false,
      selectDialog: false, // 单选选中dialog
      searchData: {
        name: '',
        productSn: '',
        brandId: '',
        publishStatus: '',
        verifyStatus: ''
      },
      form: {
        brandName: '',
        createTime: '',
        modifyTime: '',
        name: '',
        pic: '',
        price: '',
        productCategoryName: '',
        productId: '',
        productSn: '',
        promotionEndTime: '',
        promotionPerLimit: '',
        promotionPrice: '', // 促销价格
        promotionStartTime: '',
        publishStatus: '',
        recommendId: '', // 推荐条目id
        sort: '',
        type: ''
      }
    }
  },
  computed: {},
  created() {
    this.init()
  },
  mounted() {},
  methods: {
    init() {
      findAllRecommends().then((res) => {
        console.log(res)
        res.data.items.forEach((ele) => {
          ele.publishStatus = ele.publishStatus ? '是' : '否'
        })
        this.activityList = res.data.items
      })
      productsByPage(this.start, this.limit, this.searchData).then((res) => {
        console.log(res)
        this.productList = res.data.rows
        this.total = res.data.total
      })
      findAllBrand().then((res) => {
        console.log(res)
        this.brandList = res.data.items
      })
    },
    // 新增
    addAddress() {
      this.dialogFormVisible = !this.dialogFormVisible
    },
    // 弹窗关闭
    closed() {
      this.searchData = {}
    },
    // 查询
    onSearch() {
      this.init()
    },
    // 重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.init()
    },
    // 当单选框发生变化 针对第二次dialog
    radioEvent(val) {
      console.log(val)
      this.selectDialog = !this.selectDialog
      var item = this.productList.find((ele) => ele.id === val)
      this.form = item
      this.form.productId = item.id
      this.form.recommendId = ''
      this.form.type = ''
    },
    // 确定
    sure() {
      addRecommend(this.form).then((res) => {
        console.log(res)
        this.$message({
          type: 'success',
          message: '修改活动商品成功!'
        })
        this.dialogFormVisible = !this.dialogFormVisible
        this.selectDialog = !this.selectDialog
        this.init()
      })
    },
    // 取消
    cancel() {},
    // 删除按钮
    del(val) {
      this.$confirm('注意 将永久删除该活动!', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then((res) => {
          delRecommend(val.recommendId).then((res) => {
            if (res.success) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.init() // 删除成功后再刷新
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<style lang="scss">
.el-link {
  font-size: 12px;
}
.main{
  height: 550px;
  overflow: auto;
}
</style>
