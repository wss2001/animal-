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
export const reqUserLogin = (form:any)=>{
  return requests({url:'/user/login',data:{form:form},method:'POST'})
}
export const reqGetUserCwInfo=(id:string)=>{
  return requests({url:`/user/getCwBaseInfo?id=${id}`,method:'GET'})
}
export const reqGetUserInfo=(id:string)=>{
  return requests({url:`/user/getUserInfo?id=${id}`,method:'GET'})
}
export const reqUploadtx=(id:string,url:string)=>{
  return requests({url:`/user/uploadtx`,method:'POST',data:{id:id,url:url}})
}


