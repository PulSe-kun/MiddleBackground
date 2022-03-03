import request from '@/utils/request'

// 同意退货
function agreeApply(id) {
  return request({
    url: `/lejuAdmin/orderReturn/agreeApply/${id}`,
    method: 'post'
  })
}

// 退单列表
function findReturnApply(start, limit, data) {
  return request({
    url: `/lejuAdmin/orderReturn/findReturnApply/${start}/${limit}`,
    method: 'post',
    data
  })
}

// 收到退货
function receiveProduct(id) {
  return request({
    url: `/lejuAdmin/orderReturn/receiveProduct/${id}`,
    method: 'post'
  })
}

// 拒绝退货
function rejectApply(id) {
  return request({
    url: `/lejuAdmin/orderReturn/rejectApply/${id}`,
    method: 'post'
  })
}

// 退单明细
function orderReturn(id) {
  return request({
    url: `/lejuAdmin/orderReturn/${id}`,
    method: 'post'
  })
}
export { agreeApply, findReturnApply, receiveProduct, rejectApply, orderReturn }
