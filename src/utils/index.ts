import { JSEncrypt } from "JSEncrypt";
/**
 * @description 通过前后俩个时间戳获取其中相差几天
 * @param startTime 
 * @param endTime 
 * @returns 
 */
export const calculateDiffTime = function (startTime: number, endTime: number) {
  // let startTime = '1629100469000' //2021-08-16 17:51
  //     let endTime = '1876262719000' //2032-08-16 17:51
  // let endTime = parseInt(eTime)
  // let startTime = parseInt(sTime)
  let a = ((endTime - startTime) / 1000).toString()
  let runTime = parseInt(a);
  var year = Math.floor(runTime / 86400 / 365);
  runTime = runTime % (86400 * 365);
  var month = Math.floor(runTime / 86400 / 30);
  runTime = runTime % (86400 * 30);
  var day = Math.floor(runTime / 86400);
  runTime = runTime % 86400;
  var hour = Math.floor(runTime / 3600);
  runTime = runTime % 3600;
  var minute = Math.floor(runTime / 60);
  runTime = runTime % 60;
  var second = runTime;
  // console.log(`相差${year}年${month}月${day}天${hour}小时${minute}分${second}秒`);
  // return year + ',' + month + ',' + day + ',' + hour + ',' + minute + ',' + second;
  return `${month}月${day}天`
}
export const createRandomChinese = function (count: number) {
  const start = parseInt('4e00', 16)
  const end = parseInt('9fa5', 16)
  let name = ''
  for (let i = 0; i < count; i++) {
    const cha = Math.floor(Math.random() * (end - start))
    name += '\\u' + (start + cha).toString(16)
  }
  return eval(`'${name}'`)
}
/**
 * @description 获取俩个范围内的随机数
 * @param Min 
 * @param Max 
 * @returns 
 */
export function RandomNumBoth(Min: number, Max: number) {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range); //四舍五入
  return num;
}
/**
 * @description 获取指定名称的cookie的值
 * @param objname {string}
 * @returns 
 */
export function getcookie(objname: string) {
  var arrstr = document.cookie.split("; ");
  for (var i = 0; i < arrstr.length; i++) {
    var temp = arrstr[i].split("=");
    if (temp[0] == objname) return unescape(temp[1]);
  }
}

/**
 * @description 时间格式化
 * @param { date | string | number | undefined } date 时间戳，时间对象，时间字符串，（undefied | 0 | NaN | '' - 代表当前时间）
 * @param { string } format 格式化形式参考 http://momentjs.cn/docs/ 年份、月份、日期的令牌 eg. YYYY-MM-DD HH:mm:ss
 * @param { boolean | undefined} addZero  true - 数字不足10时补0，如：2020-6-8 —— 2020-06-08
 */
export const formatDate = (date?: Date | string | number, addZero?: boolean, format = 'YYYY-MM-DD', addTimeZero?: boolean) => {
  let result = ''
  let tempDate: Date

  if (typeof date === 'object') {
    tempDate = date
  } else {
    tempDate = !date ? new Date() : new Date(date)
  }

  if (/(Y+)/.test(format)) {
    result = format.replace(RegExp.$1, `${tempDate.getFullYear()}`)
  } else {
    result = format
  }

  const month = tempDate.getMonth() + 1
  const day = tempDate.getDate()
  const hours = tempDate.getHours()
  const minutes = tempDate.getMinutes()
  const seconds = tempDate.getSeconds()
  const prefix = addZero ? '0' : ''
  const timePreFix = addTimeZero ? '0' : ''
  const tokens: Record<string, string> = {
    'M+': `${month < 10 ? `${prefix}${month}` : month}`,
    'D+': `${day < 10 ? `${prefix}${day}` : day}`,
    'H+': `${hours < 10 ? `${prefix || timePreFix}${hours}` : hours}`,
    'm+': `${minutes < 10 ? `${prefix || timePreFix}${minutes}` : minutes}`,
    's+': `${seconds < 10 ? `${prefix || timePreFix}${seconds}` : seconds}`
  }

  Object.keys(tokens).forEach(key => {
    if (new RegExp(`(${key})`).test(format)) {
      result = result.replace(RegExp.$1, (tokens)[key])
    }
  })

  return result
}

const PUBLIC_KEY = 'MIGeMA0GCSqGSIb3DQEBAQUAA4GMADCBiAKBgHhRji4xQbxS0KwXJm8Ud/orrwxadH/VR7/uLlJ6ayNGsAqm1+ohAobgzqj6yDWdAaK1GwEpO+ACTBUEhMYiMuugxEO79iYtlEXKCHbqiR0ua7w8oZPQp6i+pIcO/OgDJTEIA38spnqmPvfnz4UKFQSmt3SFLx8rjzDhyYw+T3P/AgMBAAE=';
export const jiami = (data:any)=>{
  // 使用公钥加密
  const encrypt = new JSEncrypt() //new
  encrypt.setPublicKey(PUBLIC_KEY) //公钥赋值
  let result = encrypt.encrypt(data) //加密字段
  return result
}
export function deCode(str:string) {
  var encrypt = new JSEncrypt()
  const key = `-----BEGIN RSA PRIVATE KEY-----
  MIICXAIBAAKBgHhRji4xQbxS0KwXJm8Ud/orrwxadH/VR7/uLlJ6ayNGsAqm1+oh
  Aobgzqj6yDWdAaK1GwEpO+ACTBUEhMYiMuugxEO79iYtlEXKCHbqiR0ua7w8oZPQ
  p6i+pIcO/OgDJTEIA38spnqmPvfnz4UKFQSmt3SFLx8rjzDhyYw+T3P/AgMBAAEC
  gYASbbtvS9AbvjuEAE+8t8/gm4xGQhyR7+L7fMnPjDyYvJz+JKvxinjOm+RLcY30
  2EWF3GN0fBJVr0Rj+7sydc6CnITZ5cM6zewkvtvQwDf74D6PRRr8vAtKpHb2UKrY
  Zk5KHg9WH8HC1Fb7QUBeY00XTKbAs7N9pF+15Edc88bpkQJBAOxlTN60+rproZTp
  AND5bn+32Rp2YvdBy8dJlRd7WSAn9dyK6DStW8Vu1lVfuBcJxuiCmw3Np9YBFBlp
  YQ0k5D0CQQCCS+2q4fpNL5y8LEYaJ5OKlEaao4S6Yq7p82H8X4KDif9UpZ+cn74q
  +xazpr5RrHTWE3T4+4WEckGcBPAzKLDrAkEAiu7aZ8Vr2mZpd7AdR7RhCfUORqwv
  a+wijMSlOEDJV8nEiNKmuFbuqbGDjHeOJRQc8AfagxlMO800d97kKCp3bQJAOqr/
  j9MChiCrHRt+USaCy4IqLFT2XYozognBlAZZWOsY+b89mCNhWC8IsMmiplnVndLS
  940hOFrN6fdbRF3NEwJBAMjjojzOi2eqtMjFerB10/ers03mCZSuXJhGITi5eUCg
  tACGxjLPBnKWxdyIN11XxL4xSDR9KLRzmFBb2wzkQ54=
  -----END RSA PRIVATE KEY-----`
  encrypt.setPrivateKey(key)
  var data = encrypt.decrypt(str)
  return data
}
// export const jiemi = (data:any)=>{
//   const nodersa2 = new NodeRSA(privateKey);
//     const decrypted2 = nodersa2.decryptPublic(decrypted, "utf8");
//     console.log(decrypted2);
// }