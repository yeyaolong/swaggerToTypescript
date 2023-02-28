

chrome.runtime.onInstalled.addListener(async (details) => {
    console.log('details', details);
    chrome.contextMenus.create({
        id: 'transform',
        title: '转化当前接口',
        type: 'normal',
        contexts: ['page']
    });
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
    console.log('chrome.contextMenus.onClicked', item, tab)
    if (tab && tab.id) {
        chrome.tabs.sendMessage(tab.id, { info: '转化当前接口' }, {}, (res) => {
            console.log('background -> content', res);
        })
    }
    
});