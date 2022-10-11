

(function () {
    function log(str) {
        let wrapper = document.getElementById('log-wrapper');
        if (!wrapper) {
            wrapper = document.createElement('div');
            wrapper.id = 'log-wrapper';
            wrapper.style.cssText = 'position:fixed;z-index:100;width: 300px; display:grid;gap: 10px; top: 0; left: 0';
            document.body.appendChild(wrapper);
        }
        const div = document.createElement('div');
        div.style.cssText = 'border: 1px solid red; padding: 2px 10px; color: red; background: #fff';
        div.textContent = str;
        wrapper.appendChild(div);
        setTimeout(div.remove, 3000);
    }

    function removeItems() {
        const fullScreenBtn = document.querySelector('.ytp-fullscreen-button');
        const topBtns = document.querySelector('.ytp-chrome-top-buttons');

        [topBtns, fullScreenBtn].forEach(el => el?.remove());
    };

    window.addEventListener('keydown', (e) => {
        e.preventDefault();
        e.stopPropagation()
        log(`${e.key}: ${e.keyCode}`);
        log(document.querySelector('.ytp-fullscreen-button')?.toString())
        log(document.querySelector('.ytp-chrome-top-buttons')?.toString())
        removeItems();
    })



})()