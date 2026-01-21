import request from '@/utils/request'

//分类:获取文章分类列表
export function getArticleChannelList() {
  return request({
    url: '/my/cate/list'
  })
}
//分类:添加文章分类
export function addArticleChannel(data) {
  return request({
    url: '/my/cate/add',
    method: 'post',
    data
  })
}
//分类:更新文章分类
export function updateArticleChannel(data) {
  return request({
    url: '/my/cate/info',
    method: 'put',
    data
  })
}
//分类:删除文章分类
export function deleteArticleChannel(id) {
  return request({
    url: '/my/cate/del',
    method: 'delete',
    params: {
      id
    }
  })
}

//文章:获取文章列表
export function getArticleList(params) {
  return request({
    url: '/my/article/list',
    params
  })
}
//文章:添加文章
export function artPublishService(data) {
  return request({
    url: '/my/article/add',
    method: 'post',
    data
  })
}
//文章:获取文章详情
export function updateArticleService(id) {
  return request({
    url: '/my/article/info',
    params: {
      id
    }
  })
}

//文章:更新文章
export function ArtEditService(data) {
  return request({
    url: '/my/article/info',
    method: 'put',
    data
  })
}