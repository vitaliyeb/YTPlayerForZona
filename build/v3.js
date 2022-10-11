"use strict";

(function () {
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
    e.preventDefault();
    e.stopPropagation();
    console.log("".concat(e.key, ": ").concat(e.keyCode));
  });
})();