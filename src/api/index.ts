import requests from './request'

export const reqGetCwBase=()=>{
  return requests({url:'/cwbase/getbase',method:'GET'})
}
export const reqGetCwBaseInfo=(id:string)=>{
  return requests({url:`/cwbase/getCwBaseInfo?id=${id}`,method:'GET'})
}
export const reqGetCwInfo=(id:string)=>{
  return requests({url:`/cw/getcw?id=${id}`,method:'GET'})
}
export const reqAddFood = (form:any)=>{
  return requests({url:'/cw/addfood',data:{form:form},method:'POST'})
}
// 用户登录
export const reqUserLogin = (form:any)=>{
  return requests({url:'/user/login',data:{form:form},method:'POST'})
}
// 获取用户的宠物列表
export const reqGetUserCwInfo=(id:string)=>{
  return requests({url:`/user/getCwBaseInfo?id=${id}`,method:'GET'})
}
// 获取用户信息
export const reqGetUserInfo=(id:string)=>{
  return requests({url:`/user/getUserInfo?id=${id}`,method:'GET'})
}
// 上传头像照片
export const reqUploadtx=(id:string,url:string)=>{
  return requests({url:`/user/uploadtx`,method:'POST',data:{id:id,url:url}})
}
// 用户注册
export const reqUserRegister = (form:any)=>{
  return requests({url:'/user/register',data:{form:form},method:'POST'})
}
//转让宠物
export const reqChangepet = (form:any)=>{
  return requests({url:'/user/changepet',data:{form:form},method:'POST'})
}

//基地管理登录
export const reqCwAdminLogin = (form:any)=>{
  return requests({url:'/cwbase/login',data:{form:form},method:'POST'})
}

//基地管理新增宠物
export const reqCwAdminAddPet = (form:any)=>{
  return requests({url:'/cwbase/addpet',data:{form:form},method:'POST'})
}
//基地管理删除宠物
export const reqCwAdminDeletePet = (form:any)=>{
  return requests({url:'/cwbase/removePet',data:{form:form},method:'POST'})
}


