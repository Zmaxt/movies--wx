// const formatTime = date => {
//   const year = date.getFullYear()
//   const month = date.getMonth() + 1
//   const day = date.getDate()
//   const hour = date.getHours()
//   const minute = date.getMinutes()
//   const second = date.getSeconds()

//   return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
// }

// const formatNumber = n => {
//   n = n.toString()
//   return n[1] ? n : '0' + n
// }

// module.exports = {
//   formatTime: formatTime
// }
function converToStarsArray(stars){
  // 将星级分数转换成几个整星
  let num = parseInt(stars.toString().substr(0,1));
  let arr = [],temp = 0;
  for(let i = 0;i<5;i++){
    temp = i>=num?0:1;//后边没星的写0
    arr.push(temp);
  }
  return arr;
};
// 请求数据
function http(url,callBack){
  let that = this;
  wx.request({
    url:url,
    header:{"Content-Type":"json"},
    success(res){
      callBack(res.data);
    },
    fail(err){
      console.log(err)
    }
  })
}
function convertToCastString(casts) {
  var castsjoin = "";
  for (var idx in casts) {
    castsjoin = castsjoin + casts[idx].name + " / ";
  }
  return castsjoin.substring(0, castsjoin.length - 2);
}

function convertToCastInfos(casts) {
  var castsArray = []
  for (var idx in casts) {
    var cast = {
      img: casts[idx].avatars ? casts[idx].avatars.large : "",
      name: casts[idx].name
    }
    castsArray.push(cast);
  }
  return castsArray;
}

module.exports = {
  converToStarsArray: converToStarsArray,
  http: http,
  convertToCastString: convertToCastString,
  convertToCastInfos: convertToCastInfos
}