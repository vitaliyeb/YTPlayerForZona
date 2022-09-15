window.addEventListener('DOMContentLoaded', () => {
    class Player {
        constructor(videoId) {
            this.player = null;
            this.loopId = null;
            this.ui = {
                wrapper: document.getElementById('wrapper'),
                action_panel: document.getElementById('action-panel'),
                play_button: document.getElementById('panel-play'),
                volume_wrapper: document.getElementById('volume-wrapper'),
                volume_range: document.getElementById('volume-range'),
                volume_ball: document.getElementById('volume-ball'),
                time_current: document.getElementById('time-current'),
                time_duration: document.getElementById('time-duration'),
                toggle_screen_button: document.getElementById('panel-screen')
            };

            const tag = document.createElement('script');
            tag.src = 'https://www.youtube.com/iframe_api';
            document.body.append(tag);

            window.onYouTubeIframeAPIReady = () => {
                this.player = new YT.Player('player', {
                    height: window.innerHeight,
                    width: window.innerWidth,
                    videoId,
                    playerVars: {
                        controls: 1,
                    },
                    events: {
                        onReady: () => {
                            this.setDuration();
                            this.loopId = setInterval(() => {
                                this.updateCurrentTime();
                                this.setVolume(this.player.getVolume());
                            }, 100)
                        },
                        onStateChange: (playerState) => {
                            switch (playerState.data) {
                                case YT.PlayerState.PLAYING:

                                    break;
                            }
                        }
                    },
                });
            };
            this.initEvents();

            window.addEventListener('click', () => {
                // let iframe = document.getElementById('player');
                // console.log(iframe)
                // var requestFullScreen = iframe.requestFullScreen || iframe.mozRequestFullScreen || iframe.webkitRequestFullScreen;
                // if (requestFullScreen) {
                //     requestFullScreen.bind(iframe)();
                // }
            })
        }

        //init
        initEvents() {
            const {ui: {volume_wrapper, volume_ball, play_button, toggle_screen_button}} = this;
            play_button.addEventListener('click', this.togglePlayStatus)
            volume_wrapper.addEventListener('mouseenter', this.openVolumeRange);
            volume_wrapper.addEventListener('mouseleave', this.closeVolumeRange)
            volume_ball.addEventListener('mousedown', this.downVolumeBall);
            toggle_screen_button.addEventListener('click', this.toggleFullscreen);
            window.addEventListener('resize', (event) => {
                const {ui: {wrapper}, player} = this;
                player.setSize(window.innerWidth, window.innerHeight)
            })

        }

        convertSecond(sec) {
            let min = Math.floor(sec / 60);
            let hour = Math.floor(min / 60);
            return `${hour ? (hour % 24 + ':') : ""}${('0' + min % 60).slice(-2)}:${('0' + sec % 60).slice(-2)}`
        }


        //controls
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

        downVolumeBall = (e) => {
            const {ui: {volume_wrapper, volume_range}} = this;
            const rect = volume_range.getBoundingClientRect();
            const rangeWidth = 52;
            this.setVolume((e.clientX - rect.x - 6) / ((rangeWidth) / 100));

            const moveVolumeBall = (e) => {
                this.setVolume((e.clientX - rect.x - 6) / ((rangeWidth) / 100))
            }

            const mouseUp = () => {
                window.removeEventListener('mousemove', moveVolumeBall);
                window.removeEventListener('mouseup', mouseUp);
                volume_wrapper.addEventListener('mouseenter', this.openVolumeRange);
                volume_wrapper.addEventListener('mouseleave', this.closeVolumeRange)
            };

            window.addEventListener('mousemove', moveVolumeBall);
            window.addEventListener("mouseup", mouseUp)
            volume_wrapper.removeEventListener('mouseenter', this.openVolumeRange);
            volume_wrapper.removeEventListener('mouseleave', this.closeVolumeRange)
        }

        setVolume(vol) {
            const {ui: {volume_ball}, player} = this;
            const volume = Math.trunc(Math.max(0, Math.min(100, vol)));
            volume_ball.style.left = `${(52 / 100) * volume}px`;
            player.setVolume(volume);
        }

        play() {
            const {ui: {play_button}, player} = this;
            play_button.setAttribute('data-status', 'play');
            player.playVideo();
        }

        pause() {
            const {ui: {play_button}, player} = this;
            play_button.setAttribute('data-status', 'pause');
            player.pauseVideo();
        }

        togglePlayStatus = () => {
            console.log('click')
            const status = this.ui.play_button.getAttribute('data-status')

            if (status === 'pause') {
                this.play();
            } else {
                this.pause();
            }

        }
    }

    window.p = new Player('1fueZCTYkpA')
});
