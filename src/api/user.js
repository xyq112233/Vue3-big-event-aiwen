import request from '@/utils/request'

// 注册
export function userRegisterService(data){
  return request({
    url: '/api/reg',
    method: 'POST',
    data
  })
}
//登录
export function userLoginService(data){
  return request({
    url: '/api/login',
    method: 'POST',
    data
  })
}
//获取用户信息
export function userGetInfoService(){
  return request({
    url: '/my/userinfo'
  })
}