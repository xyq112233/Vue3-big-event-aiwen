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
//更新用户信息
export function userUpdateInfoService(data){
  return request({
    url: '/my/userinfo',
    method: 'PUT',
    data
  })
}

//上传用户头像
export const userUploadAvatarService = ({avatar})=> 
request.patch('/my/update/avatar', { avatar })
//更新用户密码
export const userUpdatePasswordService = ({old_pwd, new_pwd, re_pwd})=> 
request.patch('/my/updatepwd', {old_pwd, new_pwd, re_pwd})
