

chrome.runtime.onInstalled.addListener(async () => {
    chrome.contextMenus.create({
        id: 'transform',
        title: '转化当前接口',
        type: 'normal',
        contexts: ['page']
    });
});

chrome.contextMenus.onClicked.addListener((item, tab) => {
    console.log('chrome.contextMenus.onClicked', item, tab);
});