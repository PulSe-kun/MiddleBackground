import request from '@/utils/request'

// 查找地址列表
function addressList() {
  return request({
    url: `/lejuAdmin/companyAddress/addressList`
  })
}

// 设置收货默认
function setReceiveOne(data) {
  return request({
    url: `/lejuAdmin/companyAddress/setReceiveOne`,
    method: 'post',
    data
  })
}

// 设置发货默认
function setSendOne(data) {
  return request({
    url: `/lejuAdmin/companyAddress/setSendOne`,
    method: 'post',
    data
  })
}

// 删除地址
function companyAddress(id) {
  return request({
    url: `/lejuAdmin/companyAddress/${id}`,
    method: 'delete',
    id
  })
}

// 新增地址
function save(data) {
  return request({
    url: `/lejuAdmin/companyAddress/save`,
    method: 'post',
    data
  })
}

// 更新地址
function update(data) {
  return request({
    url: `/lejuAdmin/companyAddress/update`,
    method: 'post',
    data
  })
}
export { addressList, setReceiveOne, setSendOne, companyAddress, save, update }
