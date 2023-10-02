const sheetUrl = document.getElementById('sheetUrl')
const column = document.getElementById('column')
const getData = document.getElementById('getData')

sheetUrl.addEventListener('keyup', () => {
  chrome.storage.local.set({ getSheetUrl: sheetUrl.value })
})
column.addEventListener('keyup', () => {
  chrome.storage.local.set({ getColumn: column.value })
})

chrome.storage.local.get(['getSheetUrl', 'getColumn'], ({ getSheetUrl, getColumn }) => {
  sheetUrl.value = getSheetUrl || ''
  column.value = getColumn || ''
})

getData.addEventListener('click', async () => {
  getData.innerText = '获取中'
  const obj = {
    sheetID: sheetUrl.value.match(/(?<=\/d\/).*?(?=\/)/g)[0],
    gid: sheetUrl.value.match(/(?<=#gid=).*\d/g)[0],
    column: column.value
  }
  const json = await fetch(`https://script.google.com/macros/s/AKfycbyvzgy_FtMOk1p9aH3v3YIAehFu5G4dc2WE_2p0iYmUWdvj2kHG0YrqbCKm0KpiXA4BgQ/exec?${new URLSearchParams(obj)}`).then(response => response.json())
  chrome.storage.local.set({ urlList: json.result })
  getData.innerText = '完成'
  setTimeout(() => getData.innerText = '更新列表', 3000)
})