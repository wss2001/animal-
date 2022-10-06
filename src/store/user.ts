import { defineStore } from "pinia";
import {reqGetUserCwInfo} from '@/api/index'
export const userStore = defineStore('user', {
  state: () => {
    return{
      cwInfo:{
        _id:'',
        name:'',
        img:'',
        intro:'',
        state:true,
        alsoFood:'',
        alsoFoodtian:'',
        imgArr:[]
      }
    }
    
  },
  getters: {
  },
  actions:{
    async getCwInfo(id:string){
      let {data} = await reqGetUserCwInfo(id)
      this.cwInfo = data
      // this.cwInfo.alsoFoodtian = this.handleFood()
    }
  }
})