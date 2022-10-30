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
// 获取用户的消息数组
export const reqGetUserMsg=(id:string)=>{
  return requests({url:`/user/getUserMsg?id=${id}`,method:'GET'})
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
//基地管理修改宠物
export const reqCwAdminEditPet = (form:any)=>{
  return requests({url:'/cwbase/updatepet',data:{form:form},method:'POST'})
}

//后台管理登录
export const reqAdminLogin = (form:any)=>{
  return requests({url:'/admin/login',data:{form:form},method:'POST'})
}
//后台管理获取消息
export const reqAdminGetMessage = ()=>{
  return requests({url:'/admin/getMessage',method:'GET'})
}
//通过cwid获取基地其他一个宠物信息
export const reqGetBrother = (id:string)=>{
  return requests({url:`/cw/getbrother?id=${id}`,method:'GET'})
}
//获取评论
export const reqGetComment = (id:string)=>{
  return requests({url:`/comment/getComment?id=${id}`,method:'GET'})
}
//提交评论
export const reqSubmitComment = (form:any)=>{
  return requests({url:`/comment/submitComment`,data:{form},method:'POST'})
}

//获取新闻信息
export const reqGetNews = ()=>{
  return requests({url:`/admin/getnews`,method:'GET'})
}
//获取单个新闻信息
export const reqGetNewsById = (id:string)=>{
  return requests({url:`/admin/getnewsbyid?id=${id}`,method:'GET'})
}
//获取单个新闻信息
export const reqAddNews = (form:any)=>{
  return requests({url:`/admin/addNews`,method:'POST',data:{form}})
}

//给人留言
export const reqLeaveMessage = (form:any)=>{
  return requests({url:`/user/leavemessage`,method:'POST',data:{form}})
}
//发送好友请求
export const reqAddFriend = (form:any)=>{
  return requests({url:`/user/addfriend`,method:'POST',data:{form}})
}
//确认好友请求
export const reqSureAddFriend = (form:any)=>{
  return requests({url:`/user/sureAddFriend`,method:'POST',data:{form}})
}
//获取好友请求数组
export const reqGetFriendRequest = (id:string)=>{
  return requests({url:`/user/getfriendrequest?id=${id}`,method:'GET'})
}
//获取好友数组
export const reqGetFriendList = (id:string)=>{
  return requests({url:`/user/getfriends?id=${id}`,method:'GET'})
}
//请求注册宠物基地
export const reqRegisterCwAdmin = (form:any)=>{
  return requests({url:`/admin/registercwadmin`,method:'POST',data:{form}})
}
//同意注册宠物基地
export const reqAgree = (form:any)=>{
  return requests({url:`/admin/agree`,method:'POST',data:{form}})
}
//拒绝注册宠物基地
export const reqRefuse = (form:any)=>{
  return requests({url:`/admin/refuse`,method:'POST',data:{form}})
}

//删除宠物基地
export const reqRemoveCwBase = (id:any)=>{
  return requests({url:`/admin/removecwbase`,method:'POST',data:{id}})
}




