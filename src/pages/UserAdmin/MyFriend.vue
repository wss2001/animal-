<template>
  <div class="container">
    <div class="friends">
      <h2>我的好友</h2>
      <div class="item">
        <div class="left_img">
          <img src="http://127.0.0.1:3007/public/img/cw1.jpg" alt="">
        </div>
        <div class="intro">
          <p class="name">用户名：ppapap</p>
          <p class="cwLength">宠物数量为：5</p>
        </div>
      </div>
    </div>
    <div class="right">
      <h2>新的朋友</h2>
      <div class="qingqiu" v-for="item in ff.friendRequest">
        <div class="content_left">
          <div class="content_img">
            <img :src="item.img" alt="">
          </div>
          <div class="content_intro">
            <p class="name">{{item.name}}</p>
            <p class="pl">{{item.content}}</p>
          </div>
        </div>
        <div class="state">
          <p class="sure" v-if="item.state">已添加</p>
          <p class="nosure" @click="sureAddFriend(item.fid)" v-if="!item.state">接受</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { reqSureAddFriend, reqGetFriendRequest,reqGetFriendList } from '@/api/index'
import { open2, open4 } from '@/utils/message'
let myCookie = document.cookie.replace(/(?:(?:^|.*;\s*)userToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
let ff = reactive({
  friendRequest:[{name:"",img:"",content:'',state:false,fid:''}],
  friends:[{username:'',img:'',cw:[]}]
})
onMounted(async () => {
  if (myCookie == '') {
    return
  } else {
    try {
      let { data, status } = await reqGetFriendRequest(myCookie)
      if (status == 200) {
        ff.friendRequest = data
      }
    } catch (error) {
      console.log(error)
    }
  }
})
onMounted(async ()=>{
  try {
    let {data,status} = await reqGetFriendList(myCookie);
    console.log(data,status)
    if(status==200){
      ff.friends = data;
    }
  } catch (error) {
    console.log(error)
  }
  
})
const sureAddFriend = async (id:string) => {
  if (myCookie == '') {
    open4('未登录')
    return
  }
  let form = {
    myid: myCookie,
    userid:id
  }
  try {
    let {data,status} = await reqSureAddFriend(form)
    console.log(status)
    if(status==200){
      open2('添加成功')
    }
  } catch (error) {
    console.log(error)
  }
  

}
</script>
<style lang="less" scoped>
.container {
  h2 {
    font-size: 20px;
    text-align: center;
  }

  display: grid;
  grid-template-columns: 32.981rem 22.3206rem;
  // grid-template-rows: 400px;
  min-height: 400px;
  column-gap: 70px;

  .friends {
    border-right: 5px solid #414242;
    // background-color: red;
    .item {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid rgb(201, 196, 196);
      width: 80%;
      height: 120px;
      padding: 0 10px;
      img{
        width: 80px;
        height: 80px;
        border-radius: 10px;
      }
      .intro{
        font-size: 16px;
      }
    }
  }

  .right {
    max-height: 800px;
  }

  .qingqiu {
    margin-right: 10px;
    // background-color: blue;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgb(201, 196, 196);
    width: 100%;
    height: 120px;
    padding: 0 10px;

    .content_left {
      display: flex;
      flex-wrap: nowrap;

      .content_img {
        height: 60px;
        width: 60px;
        background-color: aqua;
        margin-right: 5px;
        img{
          height: 60px;
          width: 60px;
        }
      }

      .content_intro {
        padding: 5px 0;

        .name {
          font-weight: 700;
          font-size: 14px;
          margin-bottom: 20px;
        }

        .pl {
          width: 16rem;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }

    .state {
      p {
        width: 70px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        border-radius: 10px;
      }

      .sure {
        color: #414242;
      }

      .nosure {
        background-color: green;
        color: white;
        &:hover{
          cursor: pointer;
        }
      }
    }
  }
}
</style>