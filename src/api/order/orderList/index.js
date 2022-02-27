import request from '@/utils/request'

// 订单列表
function findOrdersByPage(start, limit, data) {
  return request({
    url: `/lejuAdmin/order/findOrdersByPage/${start}/${limit}`,
    method: 'post',
    data
  })
}

export { findOrdersByPage }
