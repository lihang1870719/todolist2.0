  
var getFormatDate = function (time) {  
  var year = time.getFullYear();
  var month = time.getMonth();
  var day = time.getDay();
  var hour = time.getHours();
  var minutes = time.getMinutes();
  var second = time.getSeconds();
  var result = year + "年" + month + "月" + day + "日" + hour + "时" + minutes + "分" + second + "秒";
  return result;
}

exports.getFormatDate = getFormatDate;
