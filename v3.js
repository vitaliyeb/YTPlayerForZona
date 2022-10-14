(function () {
    const UIBottomPanel = document.querySelector('.ytp-chrome-bottom');
    const UIVideo = document.querySelector('video');
    const UIBottomControls = document.querySelector('.ytp-chrome-bottom');
    const UILeftControls = document.querySelector('.ytp-left-controls');
    const UIYTSettingBtn = document.querySelector('.ytp-settings-button');
    const UIPlayBtn = document.querySelector('.ytp-play-button');
    const UISettingPopup = document.querySelector('.ytp-popup.ytp-settings-menu');

    const player = document.getElementById("movie_player");

    let panelTimerID = null;

    let iterationState = 'default';
    const selectClass = 'UISelect';

    const styleEl = document.createElement('style');
    styleEl.type = 'text/css';
    styleEl.innerHTML = `.${selectClass} { outline: solid !important; }; .ytp-panel-header- {display: none}`;
    document.head.appendChild(styleEl);

    UIBottomControls.style.marginBottom = '5px';
    UILeftControls.style.padding = '0px 2px 2px'
    document.querySelector('.ytp-pause-overlay-container').style.display = 'none';

    function goTo(nextEl) {
        resetSelect();
        nextEl.classList.add(selectClass);
    }

    function togglePlayStatus(isTimer = true) {
        openPanel(isTimer);
        if (player.getPlayerState() == 1) {
            player.pauseVideo();
        } else {
            player.playVideo();
        }
    }

    function changeSettingItem(mod = 0) {
        const items = Array.from(document.querySelectorAll('.ytp-menuitem'));
        const selectedIdx = items.findIndex(el => el.classList.contains(selectClass));
        if (~selectedIdx) {
            const nextIdx = selectedIdx + mod;
            const item = nextIdx < 0 ? items[items.length - 1] : nextIdx > (items.length - 1) ? items[0] : items[nextIdx];
            goTo(item);
            item?.scrollIntoView({block: 'center', behavior: "smooth"});
        } else {
            goTo(items[0]);
            items[0]?.scrollIntoView({block: 'center', behavior: "smooth"});
        }
    }

    function openPanel(isTimer) {
        window.clearTimeout(panelTimerID);
        player.classList.remove('ytp-autohide');
        if (true) {
            panelTimerID = setTimeout(closePanel, 3000);
        }
    }

    function resetSelect() {
        Array.from(document.querySelectorAll(`.${selectClass}`)).forEach(el => el.classList.remove(selectClass));
    }

    function closePanel() {
        iterationState = 'default'
        window.clearTimeout(panelTimerID);

        if (UISettingPopup.style.display !== 'none') {
            UIYTSettingBtn.click();
        }
        player.classList.add('ytp-autohide');
    }

    function wind(sec = 0) {
        openPanel(true);
        player.seekTo(player.getCurrentTime() + sec, true);
    }

    function iteration(key) {
        // log(`iteration: ${key} = ${iterationState}`)
        console.log(`iteration: ${key} = ${iterationState}`);
        if(key === 'bottom') {
            openPanel()
        }
        switch (iterationState) {
            case "default":
                switch (key) {
                    case 'right':
                        wind(5);
                        break;
                    case 'left':
                        wind(-5);
                        break;
                    case 'ok':
                        openPanel();
                        togglePlayStatus();
                        break;
                    case 'bottom':
                        iterationState = 'play-button'
                        goTo(UIPlayBtn);
                        openPanel(false);
                        break;
                }
                break;
            case 'play-button':
                switch (key) {
                    case 'top':
                        iterationState = 'default';
                        closePanel();
                        resetSelect();
                        break;
                    case 'ok':
                        togglePlayStatus();
                        break;
                    case 'right':
                        openPanel();
                        iterationState = 'setting-button-selected';
                        goTo(UIYTSettingBtn);
                        break;
                }
                break;
            case 'setting-button-selected':
                switch (key) {
                    case 'top':
                        iterationState = 'default';
                        closePanel();
                        resetSelect();
                        break;
                    case 'ok':
                        openPanel();
                        iterationState = 'open-setting';
                        UIYTSettingBtn.click();
                        // Array.from(document.querySelectorAll('.ytp-menuitem')).slice(0, -1).forEach(el => el.remove());
                        // document.querySelector('.ytp-settings-menu').style.height = '51px';
                        setTimeout(() => {
                            changeSettingItem(0);
                        }, 0)
                        break;
                    case 'left':
                        iterationState = 'play-button';
                        openPanel();
                        goTo(UIPlayBtn);
                        break;
                }
                break;
            case 'open-setting':
                switch (key) {
                    case 'ok':
                        openPanel();
                        const isQuality = !!document.querySelector('.ytp-quality-menu');
                        document.querySelector(`.ytp-menuitem.${selectClass}`)?.click();
                        resetSelect();
                        if (isQuality) {
                            iterationState = 'default'
                            closePanel();
                        } else {
                            setTimeout(() => changeSettingItem(0), 300);
                        }
                        break;
                    case 'top':
                        openPanel();
                        changeSettingItem(-1);
                        break;
                    case 'bottom':
                        openPanel();
                        changeSettingItem(1);
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
        const remoteBtn = document.querySelector('.ytp-remote-button');
        const ytBtn = document.querySelector('.ytp-youtube-button');
        const subBtn = document.querySelector('.ytp-subtitles-button');
        const vol = document.querySelector('.ytp-volume-area');

        [topBtns, fullScreenBtn, remoteBtn, ytBtn, subBtn, vol].forEach(el => el?.remove());
    };

    window.addEventListener('keydown', (e) => {
        if (!e.isTrusted) return;
        e.preventDefault();
        e.stopPropagation();
        iteration({
            40: 'bottom',
            39: 'right',
            38: 'top',
            37: 'left',
            13: 'ok'
        }[e.keyCode]);
        // pla
        // iteration({
        //     50: 'bottom',
        //     54: 'right',
        //     56: 'top',
        //     52: 'left',
        //     32: 'ok'
        // }[e.keyCode]);
        //pc
        // iteration({
        //     40: 'bottom',
        //     39: 'right',
        //     38: 'top',
        //     37: 'left',
        //     32: 'ok'
        // }[e.keyCode]);
        log(`${e.key}: ${e.keyCode}, ${iterationState}`);
    }, {capture: true})

    document.querySelector('video').click();
    removeItems();
    log('play');

})()