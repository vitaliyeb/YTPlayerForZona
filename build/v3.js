"use strict";

(function () {
  var UIBottomPanel = document.querySelector('.ytp-chrome-bottom');
  var UIVideo = document.querySelector('video');
  var UIBottomControls = document.querySelector('.ytp-chrome-bottom');
  var UILeftControls = document.querySelector('.ytp-left-controls');
  var UIYTSettingBtn = document.querySelector('.ytp-settings-button');
  var UIPlayBtn = document.querySelector('.ytp-play-button');
  var UISettingPopup = document.querySelector('.ytp-popup.ytp-settings-menu');
  var player = document.getElementById("movie_player");
  var panelTimerID = null;
  var iterationState = 'default';
  var selectClass = 'UISelect';
  var styleEl = document.createElement('style');
  styleEl.type = 'text/css';
  styleEl.innerHTML = ".".concat(selectClass, " { outline: solid !important; }; .ytp-panel-header- {display: none}");
  document.head.appendChild(styleEl);
  UIBottomControls.style.marginBottom = '5px';
  UILeftControls.style.padding = '0px 2px 2px';
  document.querySelector('.ytp-pause-overlay-container').style.display = 'none';

  function goTo(nextEl) {
    resetSelect();
    nextEl.classList.add(selectClass);
  }

  function togglePlayStatus() {
    var isTimer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    openPanel(isTimer);

    if (player.getPlayerState() == 1) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  }

  function changeSettingItem() {
    var mod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    var items = Array.from(document.querySelectorAll('.ytp-menuitem'));
    var selectedIdx = items.findIndex(function (el) {
      return el.classList.contains(selectClass);
    });

    if (~selectedIdx) {
      var nextIdx = selectedIdx + mod;
      var item = nextIdx < 0 ? items[items.length - 1] : nextIdx > items.length - 1 ? items[0] : items[nextIdx];
      goTo(item);
      item === null || item === void 0 ? void 0 : item.scrollIntoView({
        block: 'center',
        behavior: "smooth"
      });
    } else {
      var _items$;

      goTo(items[0]);
      (_items$ = items[0]) === null || _items$ === void 0 ? void 0 : _items$.scrollIntoView({
        block: 'center',
        behavior: "smooth"
      });
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
    Array.from(document.querySelectorAll(".".concat(selectClass))).forEach(function (el) {
      return el.classList.remove(selectClass);
    });
  }

  function closePanel() {
    iterationState = 'default';
    window.clearTimeout(panelTimerID);

    if (UISettingPopup.style.display !== 'none') {
      UIYTSettingBtn.click();
    }

    player.classList.add('ytp-autohide');
  }

  function wind() {
    var sec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    openPanel(true);
    player.seekTo(player.getCurrentTime() + sec, true);
  }

  function iteration(key) {
    var _document$querySelect;

    // log(`iteration: ${key} = ${iterationState}`)
    console.log("iteration: ".concat(key, " = ").concat(iterationState));

    if (key === 'bottom') {
      openPanel();
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
            iterationState = 'play-button';
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
            UIYTSettingBtn.click(); // Array.from(document.querySelectorAll('.ytp-menuitem')).slice(0, -1).forEach(el => el.remove());
            // document.querySelector('.ytp-settings-menu').style.height = '51px';

            setTimeout(function () {
              changeSettingItem(0);
            }, 0);
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
            var isQuality = !!document.querySelector('.ytp-quality-menu');
            (_document$querySelect = document.querySelector(".ytp-menuitem.".concat(selectClass))) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.click();
            resetSelect();

            if (isQuality) {
              iterationState = 'default';
              closePanel();
            } else {
              setTimeout(function () {
                return changeSettingItem(0);
              }, 300);
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
    var wrapper = document.getElementById('log-wrapper');

    if (!wrapper) {
      wrapper = document.createElement('div');
      wrapper.id = 'log-wrapper';
      wrapper.style.cssText = 'position:fixed;z-index:100;width: 300px; display:grid;gap: 10px; top: 0; left: 0';
      document.body.appendChild(wrapper);
    }

    var div = document.createElement('div');
    div.style.cssText = 'border: 1px solid red; padding: 2px 10px; color: red; background: #fff';
    div.textContent = str;
    wrapper.appendChild(div);
    setTimeout(function () {
      return div.remove();
    }, 3000);
  }

  function removeItems() {
    var fullScreenBtn = document.querySelector('.ytp-fullscreen-button');
    var topBtns = document.querySelector('.ytp-chrome-top-buttons');
    var remoteBtn = document.querySelector('.ytp-remote-button');
    var ytBtn = document.querySelector('.ytp-youtube-button');
    var subBtn = document.querySelector('.ytp-subtitles-button');
    var vol = document.querySelector('.ytp-volume-area');
    [topBtns, fullScreenBtn, remoteBtn, ytBtn, subBtn, vol].forEach(function (el) {
      return el === null || el === void 0 ? void 0 : el.remove();
    });
  }

  ;
  window.addEventListener('keydown', function (e) {
    if (!e.isTrusted) return;
    e.preventDefault();
    e.stopPropagation(); // iteration({
    //     40: 'bottom',
    //     39: 'right',
    //     38: 'top',
    //     37: 'left',
    //     13: 'ok'
    // }[e.keyCode]);
    // pla

    iteration({
      50: 'bottom',
      54: 'right',
      56: 'top',
      52: 'left',
      32: 'ok'
    }[e.keyCode]); //pc
    // iteration({
    //     40: 'bottom',
    //     39: 'right',
    //     38: 'top',
    //     37: 'left',
    //     32: 'ok'
    // }[e.keyCode]);

    log("".concat(e.key, ": ").concat(e.keyCode, ", ").concat(iterationState));
  }, {
    capture: true
  });
  document.querySelector('video').click();
  removeItems();
  log('play');
})();