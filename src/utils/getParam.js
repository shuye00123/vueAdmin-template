/**
 * Created by Administrator on 2017/7/31.
 */
export default() => {
  var params = window.location.search
  if (params.length > 0) {
    params = params.slice(1)
    var arr = []
    if (params.indexOf('&') > 0) {
      arr = params.split('&')
    } else {
      arr[0] = params
    }
    var options = {}
    if (arr[0].length > 0) {
      for (var i = 0; i < arr.length; i++) {
        var a = arr[i].split('=')
        var a0 = decodeURI(a[0])
        var a1 = decodeURI(a[1])
        options[a0] = a1
      }
    }
    return options
  }
  return undefined
}
