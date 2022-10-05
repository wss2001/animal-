import { defineStore } from "pinia";
import { reqGetCwInfo } from "@/api/index";
import { calculateDiffTime } from "@/utils/index";

export const cwStore = defineStore('cw', {
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
    handleFood: state => {
      let date = new Date().getTime()
      let foodTime = new Date(state.cwInfo.alsoFood).getTime()
      let result:string = calculateDiffTime(date,foodTime)
      if(date>foodTime){
        result = '0天'
      }
      return () => result
  },
  },
  actions:{
    async getCwInfo(id:string){
      let {data} = await reqGetCwInfo(id)
      this.cwInfo = data
      this.cwInfo.alsoFoodtian = this.handleFood()
    }
  }
})
