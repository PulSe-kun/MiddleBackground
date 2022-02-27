import request from '@/utils/request'

// 查找素材列表
function findMaterialByPage(start, limit) {
  return request({
    url: `/lejuAdmin/material/findMaterialByPage/${start}/${limit}`
  })
}

// 删除素材
function delMaterial(id) {
  return request({
    url: `/lejuAdmin/material/delMaterial/${id}`,
    method: 'delete'
  })
}

// 素材上传接口
function uploadFileOssSave(data) {
  return request({
    url: `/lejuAdmin/material/uploadFileOssSave`,
    method: 'post',
    data
  })
}

export { findMaterialByPage, delMaterial, uploadFileOssSave }
