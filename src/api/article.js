import request from '@/utils/request'

//获取文章分类列表
export function getArticleChannelList() {
  return request({
    url: '/my/cate/list'
  })
}
//添加文章分类
export function addArticleChannel(data) {
  return request({
    url: '/my/cate/add',
    method: 'post',
    data
  })
}
//更新文章分类
export function updateArticleChannel(data) {
  return request({
    url: '/my/cate/info',
    method: 'put',
    data
  })
}
//删除文章分类
export function deleteArticleChannel(id) {
  return request({
    url: '/my/cate/del',
    method: 'delete',
    params: {
      id
    }
  })
}