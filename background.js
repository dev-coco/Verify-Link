chrome.runtime.onMessageExternal.addListener(function (message, sender, sendResponse) {
  const action = message[0]
  if (action === 'getInput') getInput().then(data => sendResponse(data))
  return true
})

// 获取配置信息
async function getInput () {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get('urlList', async ({ urlList }) => resolve({ urlList }) )
  })
}
