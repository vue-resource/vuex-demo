export default (type='get', url='', data={}, async=true ) => {
  type = type.toUpperCase()
  return new Promise((resolve,reject) => {
  	let requestObj 
  	// 1、创建ajax对象
  	if(window.XMLHttpRequest){
  	  requestObj = new XMLHttpRequest()
  	}else {
  	  requestObj = new ActiveXObject('Microsoft.XMLHTTP')
  	}

  	// 2、创建请求体
  	if(type === 'GET'){
  	  data._t = Date.now()
  	  let param = Object.keys(data).map(key => {return key+'='+data[key]}).join('&')
  	  url = url +"?"+param
  	  requestObj.open(type, url, async) //设置请求方法，路径，是否异步
  	  requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
  	  requestObj.send()
  	}else if(type === 'POST'){
  	  requestObj.open(type, url, async)
  	  requestObj.setRequestHeader('Content-type', 'application/json')
  	  requestObj.send(JSON.stringify(data))
  	}else {
  		reject('error type')
  	}

  	// 3、处理响应
  	requestObj.onreadystatechange = () => {
  	  if(requestObj.readyState === 4  && requestObj.status === 200){
  	  	let response = requestObj.response
  	  	if(typeof response !== 'object'){
  	  	  response = JSON.parse(response)
  	  	}
  	  	resolve(response)
  	  }else{
  	  	reject(requestObj)
  	  }
  	} 

  })

}
