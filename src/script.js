window.Player = class Player {
    constructor(videoId) {
        this.player = null;
        this.loopId = null;
        this.closePanelTimer = null;
        this.ui = {
            wrapper: document.getElementById('wrapper'),
            action_panel: document.getElementById('action-panel'),
            play_button: document.getElementById('panel-play'),
            volume_wrapper: document.getElementById('volume-wrapper'),
            volume_range: document.getElementById('volume-range'),
            volume_ball: document.getElementById('volume-ball'),
            time_current: document.getElementById('time-current'),
            time_duration: document.getElementById('time-duration'),
            toggle_screen_button: document.getElementById('panel-screen'),
            progress_wrapper: document.getElementById('progress-wrapper'),
            progress_ball: document.getElementById('progress-ball'),
            setting_wrapper: document.getElementById('setting-wrapper'),
            setting_dropout: document.getElementById('setting-dropout'),
            quality_dropout: document.getElementById('quality-dropout'),
        };
        this.leafCurrentTime = null;
        this.leafNextAdditionTime = 0;
        this.leafTimerId = null;
        this.iterationKey = 'default';
        this.isSetQuality = false;

        window.onYouTubeIframeAPIReady = function () {
            this.player = new YT.Player('player', {
                height: window.innerHeight,
                width: window.innerWidth,
                videoId,
                suggestedQuality: 'tiny',
                playerVars: {'autoplay': 0, 'controls': 0, start: 0, suggestedQuality: 'tiny',},
                events: {
                    onReady: function () {
                        document.getElementById('loader__wrapper').remove();

                        this.setDuration();
                        // this.play()

                        window.addEventListener('keydown', function (e) {
                            e.preventDefault();
                            const f = ({
                                "ArrowUp": this.controlIterator.bind(this, 'up'),
                                "ArrowRight": this.controlIterator.bind(this, 'right'),
                                "ArrowDown": this.controlIterator.bind(this, 'down'),
                                "ArrowLeft": this.controlIterator.bind(this, 'left'),
                                "Enter": this.controlIterator.bind(this, 'ok'),
                                "Backspace": this.controlIterator.bind(this, 'back'),
                            })[e.key];

                            if (typeof f === 'function') f();
                        }.bind(this))
                    }.bind(this),
                    onStateChange: (playerState) => {
                        console.log(playerState)
                        switch (playerState.data) {
                            case YT.PlayerState.PLAYING:
                                this.ui.play_button.setAttribute('data-status', 'play');
                                this.startLoop();
                                if (!this.isSetQuality) this.renderQuality();
                                // playerState.target.setPlaybackQuality('auto');
                                console.log(playerState.target.setPlaybackQuality)
                                break;
                            case YT.PlayerState.PAUSED:
                                this.ui.play_button.setAttribute('data-status', 'pause');
                                break;

                        }
                        if (playerState.data == YT.PlayerState.BUFFERING) {
                            // playerState.target.setPlaybackQuality('auto');
                        }
                    },
                    onPlaybackQualityChange: (quality) => {
                        console.log('next qual', quality);
                    }
                },
            });
        }.bind(this);

        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        document.body.append(tag);

        window.addEventListener('resize', (event) => {
            this.player.setSize(window.innerWidth, window.innerHeight)
        })
    }

    startLoop = () => {
        clearTimeout(this.loopId);
        this.loopId = setInterval(() => {
            if (this.leafCurrentTime === null) {
                this.updateCurrentTime();
                this.setProgressBallFromTime(this.player.getCurrentTime());
            }
        }, 300)
    }

    convertSecond(sec) {
        let min = Math.floor(sec / 60);
        let hour = Math.floor(min / 60);
        return `${hour ? (hour % 24 + ':') : ""}${('0' + min % 60).slice(-2)}:${('0' + sec % 60).slice(-2)}`
    }

    goTo = (nextEl, prevEl) => {
        if (nextEl) nextEl.setAttribute('data-selected', '');
        if (prevEl) prevEl.removeAttribute('data-selected');
    }

    renderQuality() {
        this.isSetQuality = true;
        const quality = {
            '': '',
            'hd2160': '2160p',
            'hd1440': '1440p',
            'hd1080': '1080p',
            'hd720': '720p',
            'large': '480p',
            'medium': '360p',
            'small': '240p',
            'tiny': '144p',
            'auto': 'auto'
        };
        const available = this.player.getAvailableQualityLevels();
        console.log(available)

        if (available.length) {
           available.forEach((value) => {
               const el = document.createElement('p');
               el.setAttribute('data-value', value);
               el.classList.add('dropout__item');
               el.textContent = quality[value];
               this.ui.quality_dropout.append(el);
           });
        }
    }

    controlIterator = (key) => {
        const {leafNextAdditionTime, iterationKey, ui} = this;
        console.log({iterationKey, key})
        switch (iterationKey) {
            case 'default':
            case 'progress-bar':
                this.iterationKey = 'progress-bar';
                switch (key) {
                    case 'back':
                        this.iterationKey = 'default';
                        this.closePanel();
                        break;
                    case 'ok':
                        this.togglePlayStatus();
                        this.openPanel();
                        break;
                    case 'down':
                        if (iterationKey === 'progress-bar') {
                            this.iterationKey = 'select-setting';
                            this.goTo(ui.setting_wrapper)
                        } else this.openPanel();
                        break;
                    case 'up':
                        this.iterationKey = 'default';
                        this.closePanel();
                        break;
                    case 'left':
                        this.openPanel();
                        this.leaf(leafNextAdditionTime >= 0 ? -15 : Math.max(-Math.abs(leafNextAdditionTime * 2), -120));
                        break;
                    case 'right':
                        this.openPanel();
                        this.leaf(leafNextAdditionTime <= 0 ? 15 : Math.min(leafNextAdditionTime * 2, 120));
                        break;
                }
                break;
            case 'select-setting':
                switch (key) {
                    case 'back':
                    case 'up':
                        this.iterationKey = 'progress-bar';
                        this.goTo(null, ui.setting_wrapper);
                        break;
                    case 'ok':
                        this.iterationKey = 'open-setting';
                        this.openDropout('setting')
                        break;
                }
                break;
            case 'open-setting':
                switch (key) {
                    case "back":
                        ui.setting_dropout.querySelector('.dropout__item[data-selected]').removeAttribute('data-selected');
                        ui.setting_dropout.setAttribute('data-status', 'close');
                        this.iterationKey = 'select-setting';
                        break;
                    case 'down':
                    case 'up':
                        this.changeSelectedValue(key);
                        break;
                    case 'ok':
                        const value = ui.setting_dropout.querySelector('[data-selected]').getAttribute('data-value');
                        this.openDropout(value);
                        this.iterationKey = `open-${value}`;
                        break;
                }
                break;
            case 'open-quality':
                switch (key) {
                    case 'back':
                        this.openDropout('setting');
                        this.iterationKey = 'open-setting';
                    case 'up':
                    case 'down':
                        this.changeSelectedValue(key);
                        break;
                    case 'ok':
                        const value = this.selectSettingValue();
                        console.log(value)
                        this.player.setPlaybackQuality(value);
                        break;
                }
                break;
        }


    }

    selectSettingValue() {
        const item = this.ui.setting_wrapper.querySelector('.dropout[data-status="open"] .dropout__item[data-selected]');
        const value = item?.getAttribute('data-value');
        return value;
    }

    changeSelectedValue(key) {
        const items = Array.from(this.ui.setting_wrapper.querySelectorAll('.dropout[data-status="open"] .dropout__item'));
        const idx = items.findIndex(el => el.hasAttribute('data-selected'));
        const nextIdx = idx + (key === 'up' ? -1 : 1);
        this.goTo(
            (nextIdx) < 0 ? items[items.length - 1] : nextIdx > (items.length - 1) ? items[0] : items[nextIdx],
            items[idx]
        );
    }

    openDropout(key) {
        const id = `${key}-dropout`;
        const items = Array.from(document.querySelectorAll('.dropout'));
        items.forEach(el => {
            if (el.id === id) {
                el.setAttribute('data-status', 'open');
                el.querySelectorAll('.dropout__item')[0].setAttribute('data-selected', '')
            } else {
                el.removeAttribute('data-status')
            }
        });
    }

    //controls

    leaf(additionTime) {
        clearTimeout(this.loopId);
        this.leafNextAdditionTime = additionTime;
        const nextTime = additionTime + (this.leafCurrentTime === null ? this.player.getCurrentTime() : this.leafCurrentTime)
        this.leafCurrentTime = Math.min(Math.max(0, nextTime), this.player.getDuration());

        this.setProgressBallFromTime(this.leafCurrentTime);
        this.setCurrentTime(this.leafCurrentTime);

        clearTimeout(this.leafTimerId);
        this.leafTimerId = setTimeout(() => {
            this.player.seekTo(this.leafCurrentTime);
            this.leafCurrentTime = null;
            this.leafNextAdditionTime = 0;
        }, 700)
    }

    closePanel() {
        const {ui: {action_panel}, closePanelTimer} = this;
        clearTimeout(closePanelTimer);
        action_panel.setAttribute('data-status', 'close')
    }

    openPanel() {
        const {ui: {action_panel}, closePanelTimer} = this;
        this.setVolume(this.player.getVolume());
        action_panel.setAttribute('data-status', 'open');
        clearTimeout(closePanelTimer);
        // this.closePanelTimer = setTimeout(() => {
        //     this.closePanel();
        // }, 3000)
    }

    togglePanel() {
        const {ui: {action_panel}} = this;
        const panelStatus = action_panel.getAttribute('data-status');
        if (panelStatus === 'open') {
            this.closePanel();
        } else {
            this.openPanel();
        }
    }

    exitFullscreen() {
        document.exitFullscreen();
    }

    openFullscreen() {
        const {ui: {wrapper}} = this;
        wrapper.requestFullscreen();
    }

    toggleFullscreen = () => {
        if (document.fullscreenElement) {
            this.exitFullscreen();
        } else {
            this.openFullscreen();
        }
    }

    updateCurrentTime() {
        const {ui: {time_current}} = this;
        time_current.textContent = this.convertSecond(Math.trunc(this.player.getCurrentTime()));
    }

    setCurrentTime(sec) {
        const {ui: {time_current}} = this;
        time_current.textContent = this.convertSecond(Math.trunc(sec));
    }

    setDuration() {
        const {ui: {time_duration}} = this;
        time_duration.textContent = this.convertSecond(Math.trunc(this.player.getDuration()));
    }

    openVolumeRange = () => {
        const {ui: {volume_wrapper}} = this;
        volume_wrapper.setAttribute('data-status', 'open')
    }

    closeVolumeRange = () => {
        const {ui: {volume_wrapper}} = this;
        volume_wrapper.setAttribute('data-status', 'close')
    }

    getSecFromXPos(x) {
        const {player, ui: {progress_wrapper}} = this;
        return (player.getDuration() / 100) * (x / (progress_wrapper.offsetWidth / 100));
    }

    setProgressBallFromTime(time) {
        const {ui: {progress_ball, progress_wrapper}, player} = this;
        const position = (progress_wrapper.offsetWidth / 100) * (time / (player.getDuration() / 100));
        progress_ball.style.left = `${position}px`;
    }

    setVolume(vol) {
        const {ui: {volume_ball}, player} = this;
        const volume = Math.trunc(Math.max(0, Math.min(100, vol)));
        volume_ball.style.left = `${(52 / 100) * volume}px`;
        player.setVolume(volume);
    }

    play() {
        const {ui: {play_button}, player} = this;
        // play_button.setAttribute('data-status', 'play');
        player.playVideo();
    }

    pause() {
        const {ui: {play_button}, player} = this;
        // play_button.setAttribute('data-status', 'pause');
        player.pauseVideo();
    }

    togglePlayStatus = () => {
        const status = this.ui.play_button.getAttribute('data-status')

        if (status === 'pause') {
            this.play();
        } else {
            this.pause();
        }

    }
};

window.p = new window.Player('1fueZCTYkpA');
