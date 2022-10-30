import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
// import {reqGetCwBaseInfo} from '@/api/index'
import {getcookie} from './index'

export function useSignOut(type:string) {
  const router = useRouter()
  // let myCookie = getcookie(type) as string

  onMounted(async () => {
    //检查登陆状态
    if (!document.cookie.includes(type)) {
      console.log(`${type=='cwBaseAdminToken'?'cwBaseAdminLogin':'userLogin'}`)
      router.push({ name: `${type=='cwBaseAdminToken'?'cwBaseAdminLogin':'userLogin'}`})
      console.log('时间过久退出登陆状态')
    } 
  })
}