import request from '@/utils/request'

// 添加品牌
function addBrand(data) {
  return request({
    url: `/lejuAdmin/brand/addBrand`,
    method: 'post',
    data
  })
}

// 删除品牌
function delBrand(id) {
  return request({
    url: `/lejuAdmin/brand/delBrand/${id}`,
    method: 'delete'
  })
}

// 品牌列表
function findAllBrand() {
  return request({
    url: `/lejuAdmin/brand/findAllBrand`
  })
}

// 品牌列表分页
function findBrandByPage(start, limit) {
  return request({
    url: `/lejuAdmin/brand/findBrandByPage/${start}/${limit}`
  })
}

// 显示隐藏
function switchShowStatus(data) {
  return request({
    url: `/lejuAdmin/brand/switchShowStatus`,
    method: 'post',
    data
  })
}

// 更新品牌
function updateBrand(data) {
  return request({
    url: `/lejuAdmin/brand/updateBrand`,
    method: 'post',
    data
  })
}
export { addBrand, delBrand, findAllBrand, findBrandByPage, switchShowStatus, updateBrand }
