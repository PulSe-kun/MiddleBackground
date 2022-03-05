import request from '@/utils/request'

// 添加限时活动
function addRecommend(data) {
  return request({
    url: `/lejuAdmin/homeRecommend/addRecommend`,
    method: 'post',
    data
  })
}

// 活动列表
function findAllRecommends() {
  return request({
    url: `/lejuAdmin/homeRecommend/findAllRecommends`
  })
}

// 修改限时活动
function updateRecommend(data) {
  return request({
    url: `/lejuAdmin/homeRecommend/updateRecommend`,
    method: 'post',
    data
  })
}

// 删除地址
function delRecommend(recommendId) {
  return request({
    url: `/lejuAdmin/homeRecommend/delRecommend/${recommendId}`,
    method: 'delete',
    recommendId
  })
}

// 活动明细
function homeRecommend(recommendId) {
  return request({
    url: `/lejuAdmin/homeRecommend/${recommendId}`
  })
}

export {
  addRecommend,
  findAllRecommends,
  updateRecommend,
  delRecommend,
  homeRecommend
}
