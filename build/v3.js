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
    var _document$querySelect, _document$querySelect2;

    e.preventDefault();
    e.stopPropagation();
    log("".concat(e.key, ": ").concat(e.keyCode));
    log((_document$querySelect = document.querySelector('.ytp-fullscreen-button')) === null || _document$querySelect === void 0 ? void 0 : _document$querySelect.toString());
    log((_document$querySelect2 = document.querySelector('.ytp-chrome-top-buttons')) === null || _document$querySelect2 === void 0 ? void 0 : _document$querySelect2.toString());
  });
  document.querySelector('video').click();
  removeItems();
  log('play');
})();