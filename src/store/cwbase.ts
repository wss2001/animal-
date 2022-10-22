import { defineStore } from "pinia";
import { reqGetCwBase, reqGetCwBaseInfo } from "@/api/index";
import { ICwBase } from "./typing";
import { calculateDiffTime } from "@/utils/index";
export const cwBaseStore = defineStore('cwBase', {
  state: () => {
    return {
      cwbase: [{
        _id: '',
        notUse: 0,
        baseCw: [],
        phoneNumber: 0,
        address: '',
        intro: '',
        img: '',
        PeopleName: '',
        baseName: ''
      }
      ],
      cwArr: [{
        _id: '',
        name: '',
        alsoFood: '',
        alsoFoodtian:'',
        lovePeople:'',
        state:true,
        img:''
      }
      ]
    }
  },
  getters: {
    handlecwArr:state=>{
      return () => 1
    }
  },
  actions: {
    async getCwBase() {
      let { data } = await reqGetCwBase()
      this.cwbase = data
    },
    async getCwBaseInfo(id: string) {
      let { data } = await reqGetCwBaseInfo(id)
      this.cwArr = data
      // this.cwArr.forEach(item=>{
      //   let date = new Date().getTime()
      // let foodTime = new Date(item.alsoFood).getTime()
      // let result:string = calculateDiffTime(date,foodTime)
      // if(date>foodTime){
      //   result = '0天'
      // }
      //   item.alsoFoodtian = result
      // })
    }
  }
})
