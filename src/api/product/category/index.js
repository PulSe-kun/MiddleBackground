import request from '@/utils/request'

// 添加分类
function addCategory(data) {
  return request({
    url: `/lejuAdmin/category/addCategory`,
    method: 'post',
    data
  })
}

// 删除分类
function delCategory(id) {
  return request({
    url: `/lejuAdmin/category/delCategory/${id}`,
    method: 'delete'
  })
}

// 查询一二级分类
function getAllCategory() {
  return request({
    url: `/lejuAdmin/category/getAllCategory`
  })
}

// 品牌列表分页
function updateCategory(data) {
  return request({
    url: `/lejuAdmin/category/updateCategory`,
    method: 'post',
    data
  })
}

export { addCategory, delCategory, getAllCategory, updateCategory }
