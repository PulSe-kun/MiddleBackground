import request from '@/utils/request'

// 订单列表
function findOrdersByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/order/findOrdersByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}

// 关闭订单
function finishOrder(orderId) {
  return request({
    url: `/lejuAdmin/order/finishOrder/${orderId}`,
    method: 'post'
  })
}

// 查看订单明细
function orderDetail(orderId) {
  return request({
    url: `/lejuAdmin/order/orderDetail/${orderId}`
  })
}

// 强制确认收货
function receiveProductsForce(orderId) {
  return request({
    url: `/lejuAdmin/order/receiveProductsForce/${orderId}`,
    method: 'post'
  })
}

// 确认发货
function sendDone(data) {
  return request({
    url: `/lejuAdmin/order/sendDone`,
    method: 'post',
    data
  })
}
export { findOrdersByPage, finishOrder, orderDetail, receiveProductsForce, sendDone }
