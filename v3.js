window.checkElements = function () {
    return Boolean(document.querySelector('#movie_player'));
}

window.runPlayer = function () {
    try {
        function log(str) {
            return;
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

        const UIBottomControls = document.querySelector('.ytp-chrome-bottom');
        const UILeftControls = document.querySelector('.ytp-left-controls');
        const UIYTSettingBtn = document.querySelector('.ytp-settings-button');
        const UIPlayBtn = document.querySelector('.ytp-play-button');
        const UISettingPopup = document.querySelector('.ytp-popup.ytp-settings-menu');
        const UIProgressBar = document.querySelector('.ytp-progress-bar');
        const UICurrentTime = document.querySelector('.ytp-time-current');
        const UICustomCurrentTime = document.createElement('span');
        const UICustomProgressBar = document.createElement('p');

        const player = document.getElementById("movie_player");
        let loopId = null;
        let windNextAdditionalTime = 0;
        let windCurrentTime = null;
        let windTimerId = null;
        let panelTimerID = null;
        let settingTimerId = null;
        let isEnd = false;
        let isEmbedErr = false;

        let iterationState = 'default';
        const selectClass = 'UISelect';

        const styleEl = document.createElement('style');
        styleEl.type = 'text/css';
        styleEl.innerHTML = `
        .${selectClass} { outline: solid !important; }
        .ytp-panel-header- {display: none;}
        .ytp-progress-bar > div {opacity: 0 !important;}
        .ytp-time-current { display: none;}
        #custom-current-time {color: #ddd;}
        .ytp-tooltip {opacity: 0 !important;}
        .ytp-settings-menu .ytp-menuitem[role="menuitemcheckbox"] + .ytp-menuitem {display: none !important;}
        .ytp-pause-overlay-container {display: none !important;}
        .ytp-iv-player-content {display: none !important;}
        .ytp-chrome-bottom {height: 50px !important; margin-bottom: 10px !important;}
        .ytp-left-controls {padding: 2px !important; height: 35px !important; overflow: visible !important;}
        .ytp-progress-bar-container {bottom: auto !important; top: -10px !important;}
        .ytp-progress-bar-container, .ytp-progress-bar {background-color: rgba(255,255,255,.2); max-height: 5px !important; overflow: hidden;}
        #custom-progress-bar-wrapper {position: absolute; left: 0; top: 0; height: 100%; margin: 0; background-color: red;}
        `;
        document.head.appendChild(styleEl);

        UIBottomControls.style.marginBottom = '5px';
        UILeftControls.style.padding = '0px 2px 2px';
        UICustomProgressBar.id = 'custom-progress-bar-wrapper';
        UICustomCurrentTime.id = 'custom-current-time';
        UIProgressBar.appendChild(UICustomProgressBar);
        UICustomCurrentTime.textContent = '0:00';
        UICurrentTime.replaceWith(UICustomCurrentTime);

        player.addEventListener('onError', (state) => {
            if (typeof JSInterface?.playbackError === "function") {
                JSInterface.playbackError(state)
            }
        })
        player.addEventListener('onStateChange', (state) => {
            switch (state) {
                case 1:
                    isEnd = false;
                    break;
                case 0:
                    isEnd = true;
                    if (typeof JSInterface?.playbackEnd === "function") {
                        JSInterface.playbackEnd()
                    }
                    break;
            }
            // console.log('state: ', state);
        })

        setInterval(() => {
            if (!isEmbedErr) {
                if (player.classList.contains('ytp-embed-error')) {
                    if (typeof JSInterface?.playbackError === "function") {
                        JSInterface.playbackError(100)
                    }
                    isEmbedErr = true;
                }
            }
            if (windCurrentTime === null) {
                const currentTime = player.getCurrentTime();
                setTime(isEnd ? player.getDuration() : currentTime);
            }
        }, 500);

        function setTime(sec) {
            const maxSec = player.getDuration();
            const division = sec / (maxSec / 100);
            UICustomProgressBar.style.width = `${division}%`;
            UICustomCurrentTime.textContent = convertSecond(sec);

        }

        function convertSecond(sec) {
            sec = Math.trunc(sec);
            let min = Math.floor(sec / 60);
            let hour = Math.floor(min / 60);
            return `${hour ? (hour % 24 + ':') : ""}${('0' + min % 60).slice(-2)}:${('0' + sec % 60).slice(-2)}`
        };

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
            const items = Array.from(document.querySelectorAll('.ytp-menuitem'))
                .filter(el => getComputedStyle(el).display !== 'none')
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

        function openPanel() {
            window.clearTimeout(panelTimerID);
            player.classList.remove('ytp-autohide');
            // panelTimerID = setTimeout(closePanel, 4000);
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
            player.pauseVideo();
            windNextAdditionalTime = sec;
            const nextTime = windNextAdditionalTime +
                (windCurrentTime === null ?
                    isEnd ? player.getDuration() : player.getCurrentTime()
                    : windCurrentTime)
            windCurrentTime = Math.min(Math.max(0, nextTime), player.getDuration());

            clearTimeout(windTimerId);
            setTime(windCurrentTime);
            isEnd = windCurrentTime >= player.getDuration();
            windTimerId = setTimeout(() => {
                player.seekTo(windCurrentTime, true);
                if (!isEnd) {
                    player.playVideo();
                }
                windNextAdditionalTime = 0;
                windCurrentTime = null;
            }, 700);
            openPanel();
        }

        function iteration(key) {
            log(`iteration: ${key} = ${iterationState}`);
            if (key === 'bottom') {
                openPanel()
            }
            clearTimeout(settingTimerId);
            switch (iterationState) {
                case "default":
                    switch (key) {
                        case 'right':
                        case 'rewind-right':
                            wind(windNextAdditionalTime <= 0 ? 15 : Math.min(windNextAdditionalTime * 2, 120));
                            break;
                        case 'left':
                        case 'rewind-left':
                            wind(windNextAdditionalTime >= 0 ? -15 : Math.max(-Math.abs(windNextAdditionalTime * 2), -120));
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
                            settingTimerId = setTimeout(function () {
                                iterationState = 'default';
                                closePanel();
                            }, 4000);
                            openPanel();
                            iterationState = 'open-setting';
                            UIYTSettingBtn.click();
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
                    settingTimerId = setTimeout(function () {
                        iterationState = 'default';
                        closePanel();
                    }, 4000);
                    switch (key) {
                        case 'right':
                        case 'ok':
                            openPanel();
                            const isQuality = !!document.querySelector('.ytp-quality-menu');
                            document.querySelector(`.ytp-menuitem.${selectClass}`)?.click();
                            resetSelect();
                            if (isQuality) {
                                iterationState = 'default';
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
                        case 'left':
                            const UIBackBtn = document.querySelector('.ytp-button.ytp-panel-back-button');
                            if (UIBackBtn) {
                                UIBackBtn.click();
                                setTimeout(() => {
                                    changeSettingItem(0);
                                }, 300)
                            } else {
                                if (UISettingPopup.style.display !== 'none') {
                                    UIYTSettingBtn.click();
                                }
                                openPanel();
                                iterationState = 'setting-button-selected';
                                goTo(UIYTSettingBtn);
                            }
                            break;
                    }
                    break;
            }
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

            if (e.key === "MediaPause") {
                player.pauseVideo();
            } else if (e.key === "MediaPlay") {
                player.playVideo();
            } else if (e.key === "MediaPlayPause") {
                togglePlayStatus();
            }

            iteration({
                40: 'bottom',
                39: 'right',
                38: 'top',
                37: 'left',
                13: 'ok',
                228: 'rewind-right',
                227: 'rewind-left'
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

    } catch (e) {
        alert(`err: ${e.toString()}`)
    }
}