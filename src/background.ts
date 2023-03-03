

chrome.runtime.onInstalled.addListener(async (details) => {
    console.log('details', details);
    // 感觉用户选中指定接口后，再添加菜单更好一点更好一点，而不是进入页面就直接给右键里添加一个菜单
    chrome.contextMenus.create({
        id: 'transformPage',
        title: '转化当前页接口',
        type: 'normal',
        contexts: ['page']
    });
    chrome.contextMenus.create({
        id: 'transformSelection',
        title: '转化当前选中接口',
        type: 'normal',
        contexts: ['selection']
    });
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
    console.log('chrome.contextMenus.onClicked', item, tab)
    if (tab && tab.id) {
        chrome.tabs.sendMessage(tab.id, { menuInfo: item, tabId: tab.id, title: tab.title }, {}, (res) => {
            console.log('background -> content', res);
        })
    }
    
});

chrome.storage.onChanged.addListener(({ enabledTlds }) => {
    if (typeof enabledTlds === 'undefined') return;

});