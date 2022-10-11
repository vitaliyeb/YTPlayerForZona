function removeItems() {
    const fullScreenBtn = document.querySelector('.ytp-fullscreen-button');
    const topBtns = document.querySelector('.ytp-chrome-top-buttons');

    [topBtns, fullScreenBtn].forEach(el => el?.remove());
};
removeItems();

(() => {

    // (() => {
    //     const btn = document.querySelector('.ytp-cued-thumbnail-overlay');
    //     btn.click();
    //     alert(btn)
    // })()
    //remove unnecessary
    // const removeAllNodes = (node) => {
    //     const parentNode = node.parentNode;
    //     if (node === document.body) return;
    //     for (let childNode of Array.from(parentNode.childNodes)) {
    //         if (childNode !== node) {
    //             childNode.remove?.();
    //         }
    //     }
    //     removeAllNodes(parentNode);
    // };

    window.addEventListener('keydown', (e) => {
        console.log(e);
        e.preventDefault();
        e.stopPropagation();
    }, {capture: true})
    const fullScreenButton = document.querySelector('.ytp-fullscreen-button');
    fullScreenButton.click();
    fullScreenButton.remove();

    // function exitHandler(e) {
    //     if (!document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
    //         setTimeout(() => {
    //             document.querySelector('.ytp-fullscreen-button').click();
    //         }, 10);
    //     }
    // }
    // ['webkitfullscreenchange', 'mozfullscreenchange', 'fullscreenchange', 'MSFullscreenChange']
    //     .forEach(eventType => document.addEventListener(eventType, exitHandler, {capture: true}));

    // removeAllNodes(document.getElementById('player'));
})()