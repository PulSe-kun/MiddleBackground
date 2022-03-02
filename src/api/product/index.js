import request from '@/utils/request'

// 查找商品列表
function productsByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/product/productsByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}

// 添加商品信息
function addProductAndSkus(data) {
  return request({
    url: `/lejuAdmin/product/addProductAndSkus`,
    method: 'post',
    data
  })
}

// 删除商品信息
function del(id) {
  return request({
    url: `/lejuAdmin/product/del/${id}`,
    method: 'delete'
  })
}

// 用于编辑
function productSkusDetail(id) {
  return request({
    url: `/lejuAdmin/product/productSkusDetail/${id}`
  })
}
// 是否最新
function switchNewStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchNewStatus`,
    method: 'post',
    data
  })
}

// 是否预告
function switchPreviewStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchPreviewStatus`,
    method: 'post',
    data
  })
}

// 是否发布
function switchPublishStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchPublishStatus`,
    method: 'post',
    data
  })
}

// 是否推荐
function switchRecommandStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchRecommandStatus`,
    method: 'post',
    data
  })
}
// 是否审核
function switchVerifyStatus(data) {
  return request({
    url: `/lejuAdmin/product/switchVerifyStatus`,
    method: 'post',
    data
  })
}

// 更新商品
function updateProductAndSkus(data) {
  return request({
    url: `/lejuAdmin/product/updateProductAndSkus`,
    method: 'post',
    data
  })
}
export { productsByPage, addProductAndSkus, del, switchNewStatus, switchPreviewStatus, switchPublishStatus, switchRecommandStatus, switchVerifyStatus, productSkusDetail, updateProductAndSkus }
