export const calculateDiffTime = function (startTime: number, endTime: number) {
  // let startTime = '1629100469000' //2021-08-16 17:51
  //     let endTime = '1876262719000' //2032-08-16 17:51
  // let endTime = parseInt(eTime)
  // let startTime = parseInt(sTime)
  let a = ((endTime - startTime) / 1000 ).toString()
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