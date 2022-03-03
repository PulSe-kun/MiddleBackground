import request from '@/utils/request'

// 根据商品添加库存信息
function addProductSkus(data) {
  return request({
    url: `/lejuAdmin/sku/addProductSkus`,
    method: 'post',
    data
  })
}

// 删除库存信息
function delSku(skuId) {
  return request({
    url: `/lejuAdmin/sku/delSku/${skuId}`,
    method: 'delete'
  })
}

// 根据商品id查询库存
function getSkusByProductId(productId) {
  return request({
    url: `/lejuAdmin/sku/getSkusByProductId/${productId}`
  })
}
// 更新库存信息
function updateSkuInfo(data) {
  return request({
    url: `/lejuAdmin/sku/updateSkuInfo`,
    method: 'post',
    data
  })
}

export { addProductSkus, delSku, getSkusByProductId, updateSkuInfo }
