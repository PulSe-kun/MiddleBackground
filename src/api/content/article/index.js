import request from '@/utils/request'

// 查找文章列表
function findArticles(start, limit, data) {
  return request({
    url: `/lejuAdmin/productArticle/findArticles/${start}/${limit}`,
    method: 'post',
    data
  })
}
// 更新文章显示状态
function changeShowStatus(data) {
  return request({
    url: `/lejuAdmin/productArticle/changeShowStatus`,
    method: 'post',
    data
  })
}
// 更新文章
function updateArticle(data) {
  return request({
    url: `/lejuAdmin/productArticle/updateArticle`,
    method: 'post',
    data
  })
}

// 删除文章
function delArticle(id) {
  return request({
    url: `/lejuAdmin/productArticle/del/${id}`,
    method: 'delete'
  })
}
// 上传文章
function addArticle(data) {
  return request({
    url: `/lejuAdmin/productArticle/addArticle`,
    method: 'post',
    data
  })
}
// 通用素材上传接口
function uploadFileOss(data) {
  return request({
    url: `/lejuAdmin/material/uploadFileOss`,
    method: 'post',
    data
  })
}

// 文章明细
function productArticle(id) {
  return request({
    url: `/lejuAdmin/productArticle/productArticle/${id}`
  })
}
export { findArticles, updateArticle, delArticle, changeShowStatus, addArticle, uploadFileOss, productArticle }
