"use strict";

(function () {
  var UIBottomPanel = document.querySelector('.ytp-chrome-bottom');
  var UIVideo = document.querySelector('video');
  var iterationState = 'default';

  function wind(vec) {
    try {
      console.log('wind', vec);
      UIVideo.dispatchEvent(new KeyboardEvent('keydown', {
        key: vec === 'right' ? 'ArrowRight' : 'ArrowLeft',
        keyCode: vec === 'right' ? 39 : 37,
        cancelable: false,
        bubbles: true
      }));
    } catch (e) {
      console.log('wind err', e);
    }
  }

  function iteration(key) {
    log("iteration: ".concat(key, " = ").concat(iterationState));

    switch (iterationState) {
      case "default":
        log("default: ".concat(key));
        wind(key);
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
    [topBtns, fullScreenBtn].forEach(function (el) {
      return el === null || el === void 0 ? void 0 : el.remove();
    });
  }

  ;
  window.addEventListener('keydown', function (e) {
    if (!e.isTrusted) return;
    e.preventDefault();
    e.stopPropagation();
    iteration({
      50: 'bottom',
      54: 'right',
      56: 'top',
      52: 'left'
    }[e.keyCode]); // iteration({
    //     50: 'bottom',
    //     39: 'right',
    //     56: 'top',
    //     37: 'left'
    //
    // }[e.keyCode]);

    log("".concat(e.key, ": ").concat(e.keyCode, ", ").concat(iterationState));
  }, {
    capture: true
  });
  document.querySelector('video').click();
  removeItems();
  log('play');
})();