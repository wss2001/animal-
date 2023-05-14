import requests from './request'

export const reqGetCwBase=()=>{
  return requests({url:'/cwbase/getbase',method:'GET'})
}
// 根据id获取宠物基地信息
export const reqGetCwBaseById=(id:string)=>{
  return requests({url:`/cwbase/getbaseByid?id=${id}`,method:'GET'})
}
//获取基地的宠物列表
export const reqGetCwBaseInfo=(id:string)=>{
  return requests({url:`/cwbase/getCwBaseInfo?id=${id}`,method:'GET'})
}
// 根据查询条件/获取基地的宠物列表
export const reqPostCwBaseInfo=(id:string,data:any)=>{
  return requests({url:`/cwbase/postCwBaseInfo?id=${id}`,method:'POST',data})
}
// 更改宠物基地基本信息
export const reqChangeInfo=(data:any)=>{
  return requests({url:`/cwbase/changeBaseInfo`,method:'POST',data})
}
// 获取宠物详情信息
export const reqGetCwInfo=(id:string)=>{
  return requests({url:`/cw/getcw?id=${id}`,method:'GET'})
}
// export const reqAddFood = (form:any)=>{
//   return requests({url:'/cw/addfood',data:{form:form},method:'POST'})
// }
//更新宠物食物天数
export const reqUpdateFood = (id:string)=>{
  return requests({url:`/cw/updatefood?id=${id}`,method:'GET'})
}

// 用户登录
export const reqUserLogin = (form:any)=>{
  return requests({url:'/user/login',data:{form:form},method:'POST'})
}
// 获取用户的宠物列表
export const reqGetUserCwInfo=(id:string)=>{
  return requests({url:`/user/getCwBaseInfo?id=${id}`,method:'GET',headers:{'Authorization':window.localStorage.getItem("userToken") || ''}})
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
//转让宠物第一版未用
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
export const reqCwAdminEditPet = (data:any)=>{
  return requests({url:'/cwbase/updatepet',data,method:'POST'})
}
//获取消息中的投喂领养数据从而获取利益
export const reqGetMsgMoney = (form:any)=>{
  return requests({url:'/cwbase/getmoney',data:{form:form},method:'POST'})
}
// 更新基地热度
export const reqUpdateHot = (id:string)=>{
  return requests({url:'/cwbase/updateHot',data:{id},method:'POST'})
}

//通过cwid获取基地其他一个宠物信息
export const reqGetBrother = (id:string)=>{
  return requests({url:`/cw/getbrother?id=${id}`,method:'GET'})
}
//通过cwid获取基地的信息
export const reqGetFBase = (id:string)=>{
  return requests({url:`/cw/fBase?id=${id}`,method:'GET'})
}
//获取评论
export const reqGetComment = (id:string)=>{
  return requests({url:`/comment/getComment?id=${id}`,method:'GET'})
}
//提交评论
export const reqSubmitComment = (form:any)=>{
  return requests({url:`/comment/submitComment`,data:{form},method:'POST'})
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
//获取好友转增宠物数组
export const reqGetFriendShare = (id:string)=>{
  return requests({url:`/user/getfriendshare?id=${id}`,method:'GET'})
}
//发送好友转增宠物数组
export const reqFindFriendToShare = (form:any)=>{
  return requests({url:`/user/findshare`,method:'POST',data:{form}})
}
//同意接受宠物转增
export const reqAgreeZZ = (form:any)=>{
  return requests({url:`/user/agreezz`,method:'POST',data:{form}})
}
//拒绝注册宠物转增
export const reqRefuseZZ = (form:any)=>{
  return requests({url:`/user/refusezz`,method:'POST',data:{form}})
}
//收藏
export const reqCollect = (form:any)=>{
  return requests({url:`/user/collect`,method:'POST',data:{form}})
}
//查找密码
export const reqFindPass = (data:any)=>{
  return requests({url:`/user/findChangePass`,method:'POST',data})
}
//查找密码
export const reqSendEmail = (data:any)=>{
  return requests({url:`/user/sendEmail`,method:'POST',data})
}

// 更改密码
export const reqChangePass = (form:any)=>{
  return requests({url:`/user/changepass`,method:'POST',data:{form}})
}

//支付测试
export const reqPay = (form:any)=>{
  return requests({url:'/pay/api/payment',method:'POST',data:{form}})
}
//获取宠物证书
export const reqGetCertificate = (form:any)=>{
  return requests({url:'/user/getcertificate',method:'POST',data:{form}})
}


//后台管理登录
export const reqAdminLogin = (form:any)=>{
  return requests({url:'/admin/login',data:{form:form},method:'POST'})
}
//后台管理获取消息
export const reqAdminGetMessage = ()=>{
  return requests({url:'/admin/getMessage',method:'GET'})
}
//获取新闻信息
export const reqGetNews = ()=>{
  return requests({url:`/admin/getnews`,method:'GET'})
}
//获取单个新闻信息
export const reqGetNewsById = (id:string)=>{
  return requests({url:`/admin/getnewsbyid?id=${id}`,method:'GET'})
}
//添加新闻信息
export const reqAddNews = (form:any)=>{
  return requests({url:`/admin/addNews`,method:'POST',data:{form}})
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
//获取收益
export const reqGetIncome = ()=>{
  return requests({url:`/admin/getIncome`,method:'GET'})
}





