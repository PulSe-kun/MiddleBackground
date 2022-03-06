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
    method: 'delete'
  })
}

// 活动明细
function homeRecommend(recommendId) {
  return request({
    url: `/lejuAdmin/homeRecommend/${recommendId}`
  })
}

// 新增广告
function addAds(data) {
  return request({
    url: `/lejuAdmin/advertise/addAds`,
    method: 'post',
    data
  })
}

// 查看广告列表
function adsList() {
  return request({
    url: `/lejuAdmin/advertise/adsList`
  })
}

// 删除广告
function delAds(adsId) {
  return request({
    url: `/lejuAdmin/advertise/delAds/${adsId}`,
    method: 'delete'
  })
}

// 更新广告
function updateAds(data) {
  return request({
    url: `/lejuAdmin/advertise/updateAds`,
    method: 'post',
    data
  })
}
export {
  addRecommend,
  findAllRecommends,
  updateRecommend,
  delRecommend,
  homeRecommend,
  addAds, adsList, delAds, updateAds
}
