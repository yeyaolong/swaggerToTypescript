

chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: 'transform',
        title: '转化当前接口',
        type: 'normal',
        contexts: ['page']
    });
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
    if (tab && tab.id) {
        chrome.tabs.sendMessage(tab.id, { info: '转化当前接口' }, {}, (res) => {
            console.log('background -> content', res);
        })
    }
    
});