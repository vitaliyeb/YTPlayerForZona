(function () {
    const UIBottomPanel = document.querySelector('.ytp-chrome-bottom');
    const UIVideo = document.querySelector('video');
    const player = document.getElementById("movie_player");

    const iterationState = 'default';


    function togglePlayStatus() {
        if (player.getPlayerState() == 1) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    }

    function iteration(key) {
        log(`iteration: ${key} = ${iterationState}`)
        switch (iterationState) {
            case "default":
                switch (key) {
                    case 'right':
                        player.seekTo(player.getCurrentTime() + 5, true);
                        break;
                    case 'left':
                        player.seekTo(player.getCurrentTime() - 5, true);
                        break;
                    case 'ok':
                        togglePlayStatus();
                        break;
                }
                break;
        }
    }

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
        setTimeout(() => div.remove(), 3000);
    }

    function removeItems() {
        const fullScreenBtn = document.querySelector('.ytp-fullscreen-button');
        const topBtns = document.querySelector('.ytp-chrome-top-buttons');

        [topBtns, fullScreenBtn].forEach(el => el?.remove());
    };

    window.addEventListener('keydown', (e) => {
        if (!e.isTrusted) return;
        e.preventDefault();
        e.stopPropagation();
        iteration({
            50: 'bottom',
            54: 'right',
            56: 'top',
            52: 'left',
            32: 'ok'
        }[e.keyCode]);
        // iteration({
        //     50: 'bottom',
        //     39: 'right',
        //     56: 'top',
        //     37: 'left'
        //
        // }[e.keyCode]);
        log(`${e.key}: ${e.keyCode}, ${iterationState}`);
    }, {capture: true})

    document.querySelector('video').click();
    removeItems();
    log('play');

})()