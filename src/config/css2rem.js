((doc,win) => {
  let docEle = doc.documentElement
  let resizeEve = 'orientationchange' in window ? 'orientationchange' :'resize'
  let calrHandler = () => {
  	const clientWidth = docEle.clientWidth
  	if(!clientWidth) {
  		return false
  	}
  	docEle.style.fontSize = 100 * (clientWidth/750) + 'px'
  }
  if(!doc.addEventListener){
  	return false
  }
  win.addEventListener(resizeEve, calrHandler, false)
  doc.addEventListener('DOMContentLoaded', calrHandler, false)
})(document,window)
