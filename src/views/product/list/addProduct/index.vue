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
                <el-form-item label="商品分类" prop="region">
                  <el-select v-model="productData.product.region" placeholder="商品分类" style="width:100%">
                    <el-option label="区域一" value="shanghai" />
                    <el-option label="区域二" value="beijing" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="商品品牌" prop="brandName">
                  <el-select v-model="productData.product.brandName" placeholder="品牌" style="width:100%">
                    <el-option label="区域一" value="shanghai" />
                    <el-option label="区域二" value="beijing" />
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
                  <el-input-number v-model="productData.product.originalPrice" :min="1" :max="10" @change="handleChange" />
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
                  <el-input-number v-model="productData.product.weight" :min="1" :max="10" @change="handleChange" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="审核状态" prop="verifyStatus">
                  <el-switch v-model="productData.product.verifyStatus" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="是否上架" prop="publishStatus">
                  <el-switch v-model="productData.product.publishStatus" />
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
                  <el-input-number v-model="productData.product.lowStock " :min="1" :max="10" @change="handleChange" />
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="商品排序" prop="sort">
                  <el-input-number v-model="productData.product.sort" :min="1" :max="10" @change="handleChange" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="产品服务" prop="serviceIds">
                  <el-checkbox-group v-model="productData.product.serviceIds">
                    <el-checkbox label="无忧退货" name="type" />
                    <el-checkbox label="快速退款" name="type" />
                    <el-checkbox label="免费包邮" name="type" />
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
            <el-row :gutter="20">
              <el-col :span="12">
                <el-form-item label="商品名称" prop="name">
                  <el-input v-model="productData.name" placeholder="标题" />
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="副标题" prop="name">
                  <el-input v-model="productData.name" placeholder="副标题" />
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="商品品牌" prop="region">
                  画册图片
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="副标题" prop="name">
                  sku设置
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
                  v-model="textarea"
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
              <el-button size="small" type="primary" @click="next">提交保存</el-button>
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
import mixin from '@/mixin/index'
export default {
  components: {
    tinymce
  },
  mixins: [mixin],
  data() {
    return {
      active: 1,
      rules: {
        name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
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
}
</style>
