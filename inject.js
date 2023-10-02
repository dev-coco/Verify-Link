
(async () => {
  const url = location.host
  const extensionID = document.getElementById('verifyLink').outerText
  const sendBackground = data => {
    return new Promise(resolve => {
      chrome.runtime.sendMessage(extensionID, data, res => { resolve(res) })
    })
  }
  let list = await sendBackground(['getInput']).then(r => r.urlList)
  try {
    const para = document.createElement('div')
    const element = document.querySelector('body')
    element.appendChild(para);
    para.setAttribute('id', 'verifyLink_mark');
    para.setAttribute('style', `border:1px solid;padding:25px 50px;border-radius:10px;color:#fff;background-color:${list.includes(url) ? '#46bd62' : 'red'};bottom:auto;left:auto;top:40px;right:30px;auto;z-index:9999;position:fixed;font-size:16px;`)
    para.setAttribute('ondblclick', "document.getElementById('verifyLink_mark').style.display='none'");
  } catch (error) {
    console.log('加载失败', error)
  }
})()

