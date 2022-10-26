"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return generator._invoke = function (innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; }(innerFn, self, context), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; this._invoke = function (method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); }; } function maybeInvokeDelegate(delegate, context) { var method = delegate.iterator[context.method]; if (undefined === method) { if (context.delegate = null, "throw" === context.method) { if (delegate.iterator["return"] && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel; context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method"); } return ContinueSentinel; } var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) { if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; } return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (object) { var keys = []; for (var key in object) { keys.push(key); } return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) { "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); } }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, "catch": function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

window.addEventListener('DOMContentLoaded', /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
  var waitForElBySelector, _waitForElBySelector, setTime, convertSecond, goTo, togglePlayStatus, changeSettingItem, openPanel, resetSelect, closePanel, wind, iteration, log, removeItems, UIBottomPanel, UIVideo, UIBottomControls, UILeftControls, UIYTSettingBtn, UIPlayBtn, UISettingPopup, UIProgressBar, UICurrentTime, UICustomCurrentTime, UICustomProgressBar, UIPauseOverlay, player, loopId, windNextAdditionalTime, windCurrentTime, windTimerId, panelTimerID, isEnd, isEmbedErr, iterationState, selectClass, styleEl;

  return _regeneratorRuntime().wrap(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _waitForElBySelector = function _waitForElBySelector3() {
            _waitForElBySelector = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(selector) {
              var timerId;
              return _regeneratorRuntime().wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      timerId = null;
                      _context.next = 3;
                      return new Promise(function (resolve, rej) {
                        timerId = setInterval(function () {
                          if (document.querySelector(selector)) {
                            clearInterval(timerId);
                            resolve();
                          }
                        }, 100);
                      });

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee);
            }));
            return _waitForElBySelector.apply(this, arguments);
          };

          waitForElBySelector = function _waitForElBySelector2(_x) {
            return _waitForElBySelector.apply(this, arguments);
          };

          _context2.prev = 2;

          setTime = function setTime(sec) {
            var maxSec = player.getDuration();
            var division = sec / (maxSec / 100);
            UICustomProgressBar.style.width = "".concat(division, "%");
            UICustomCurrentTime.textContent = convertSecond(sec);
          };

          convertSecond = function convertSecond(sec) {
            sec = Math.trunc(sec);
            var min = Math.floor(sec / 60);
            var hour = Math.floor(min / 60);
            return "".concat(hour ? hour % 24 + ':' : "").concat(('0' + min % 60).slice(-2), ":").concat(('0' + sec % 60).slice(-2));
          };

          goTo = function goTo(nextEl) {
            resetSelect();
            nextEl.classList.add(selectClass);
          };

          togglePlayStatus = function togglePlayStatus() {
            var isTimer = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
            openPanel(isTimer);

            if (player.getPlayerState() == 1) {
              player.pauseVideo();
            } else {
              player.playVideo();
            }
          };

          changeSettingItem = function changeSettingItem() {
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
          };

          openPanel = function openPanel() {
            window.clearTimeout(panelTimerID);
            player.classList.remove('ytp-autohide'); // panelTimerID = setTimeout(closePanel, 4000);
          };

          resetSelect = function resetSelect() {
            Array.from(document.querySelectorAll(".".concat(selectClass))).forEach(function (el) {
              return el.classList.remove(selectClass);
            });
          };

          closePanel = function closePanel() {
            iterationState = 'default';
            window.clearTimeout(panelTimerID);

            if (UISettingPopup.style.display !== 'none') {
              UIYTSettingBtn.click();
            }

            player.classList.add('ytp-autohide');
          };

          wind = function wind() {
            var sec = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            player.pauseVideo();
            windNextAdditionalTime = sec;
            var nextTime = windNextAdditionalTime + (windCurrentTime === null ? isEnd ? player.getDuration() : player.getCurrentTime() : windCurrentTime);
            windCurrentTime = Math.min(Math.max(0, nextTime), player.getDuration());
            clearTimeout(windTimerId);
            setTime(windCurrentTime);
            isEnd = windCurrentTime >= player.getDuration();
            windTimerId = setTimeout(function () {
              player.seekTo(windCurrentTime, true);

              if (!isEnd) {
                player.playVideo();
              }

              windNextAdditionalTime = 0;
              windCurrentTime = null;
            }, 700);
            openPanel();
          };

          iteration = function iteration(key) {
            var _document$querySelect;

            log("iteration: ".concat(key, " = ").concat(iterationState));
            console.log("iteration: ".concat(key, " = ").concat(iterationState));

            if (key === 'bottom') {
              openPanel();
            }

            switch (iterationState) {
              case "default":
                switch (key) {
                  case 'right':
                    wind(windNextAdditionalTime <= 0 ? 15 : Math.min(windNextAdditionalTime * 2, 120));
                    break;

                  case 'left':
                    wind(windNextAdditionalTime >= 0 ? -15 : Math.max(-Math.abs(windNextAdditionalTime * 2), -120));
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
                    UIYTSettingBtn.click();
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
          };

          log = function log(str) {
            return;
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
          };

          removeItems = function removeItems() {
            var fullScreenBtn = document.querySelector('.ytp-fullscreen-button');
            var topBtns = document.querySelector('.ytp-chrome-top-buttons');
            var remoteBtn = document.querySelector('.ytp-remote-button');
            var ytBtn = document.querySelector('.ytp-youtube-button');
            var subBtn = document.querySelector('.ytp-subtitles-button');
            var vol = document.querySelector('.ytp-volume-area');
            [topBtns, fullScreenBtn, remoteBtn, ytBtn, subBtn, vol].forEach(function (el) {
              return el === null || el === void 0 ? void 0 : el.remove();
            });
          };

          alert('two  DOMContentLoaded !!!', navigator.userAgent);
          _context2.next = 18;
          return waitForElBySelector('#movie_player');

        case 18:
          UIBottomPanel = document.querySelector('.ytp-chrome-bottom');
          UIVideo = document.querySelector('video');
          UIBottomControls = document.querySelector('.ytp-chrome-bottom');
          UILeftControls = document.querySelector('.ytp-left-controls');
          UIYTSettingBtn = document.querySelector('.ytp-settings-button');
          UIPlayBtn = document.querySelector('.ytp-play-button');
          UISettingPopup = document.querySelector('.ytp-popup.ytp-settings-menu');
          UIProgressBar = document.querySelector('.ytp-progress-bar');
          UICurrentTime = document.querySelector('.ytp-time-current');
          UICustomCurrentTime = document.createElement('span');
          UICustomProgressBar = document.createElement('p');
          UIPauseOverlay = document.querySelector('.ytp-pause-overlay-container');
          player = document.getElementById("movie_player");
          loopId = null;
          windNextAdditionalTime = 0;
          windCurrentTime = null;
          windTimerId = null;
          panelTimerID = null;
          isEnd = false;
          isEmbedErr = false;
          alert('player:', player === null || player === void 0 ? void 0 : player.toString());
          iterationState = 'default';
          selectClass = 'UISelect';
          styleEl = document.createElement('style');
          styleEl.type = 'text/css';
          styleEl.innerHTML = "\n        .".concat(selectClass, " { outline: solid !important; }\n        .ytp-panel-header- {display: none;}\n        .ytp-progress-bar > div {opacity: 0 !important;}\n        .ytp-time-current { display: none;}\n        #custom-current-time {color: #ddd;}\n        .ytp-chrome-bottom {height: 50px !important; margin-bottom: 10px !important;}\n        .ytp-left-controls {padding: 2px !important; height: 35px !important; overflow: visible !important;}\n        .ytp-progress-bar-container {bottom: auto !important; top: -10px !important;}\n        .ytp-progress-bar-container, .ytp-progress-bar {background-color: rgba(255,255,255,.2); max-height: 5px !important; overflow: hidden;}\n        #custom-progress-bar-wrapper {position: absolute; left: 0; top: 0; height: 100%; margin: 0; background-color: red;}\n        ");
          document.head.appendChild(styleEl);
          UIBottomControls.style.marginBottom = '5px';
          UILeftControls.style.padding = '0px 2px 2px';
          if (UIPauseOverlay) UIPauseOverlay.style.display = 'none'; // alert('ytp-pause-overlay-container');

          UICustomProgressBar.id = 'custom-progress-bar-wrapper';
          UICustomCurrentTime.id = 'custom-current-time';
          UIProgressBar.appendChild(UICustomProgressBar);
          UICustomCurrentTime.textContent = '0:00';
          UICurrentTime.replaceWith(UICustomCurrentTime);
          player.addEventListener('onError', function (state) {
            var _JSInterface;

            if (typeof ((_JSInterface = JSInterface) === null || _JSInterface === void 0 ? void 0 : _JSInterface.playbackError) === "function") {
              JSInterface.playbackError(state);
            }
          });
          player.addEventListener('onStateChange', function (state) {
            var _JSInterface2;

            switch (state) {
              case 1:
                isEnd = false;
                break;

              case 0:
                isEnd = true;

                if (typeof ((_JSInterface2 = JSInterface) === null || _JSInterface2 === void 0 ? void 0 : _JSInterface2.playbackEnd) === "function") {
                  JSInterface.playbackEnd();
                }

                break;
            } // console.log('state: ', state);

          });
          alert('events init');
          setInterval(function () {
            if (!isEmbedErr) {
              if (player.classList.contains('ytp-embed-error')) {
                var _JSInterface3;

                if (typeof ((_JSInterface3 = JSInterface) === null || _JSInterface3 === void 0 ? void 0 : _JSInterface3.playbackError) === "function") {
                  JSInterface.playbackError(100);
                }

                isEmbedErr = true;
              }
            }

            if (windCurrentTime === null) {
              var currentTime = player.getCurrentTime();
              setTime(isEnd ? player.getDuration() : currentTime);
            }
          }, 500);
          ;
          ;
          window.addEventListener('keydown', function (e) {
            if (!e.isTrusted) return;
            e.preventDefault();
            e.stopPropagation();
            iteration({
              40: 'bottom',
              39: 'right',
              38: 'top',
              37: 'left',
              13: 'ok'
            }[e.keyCode]); // pla
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

            log("".concat(e.key, ": ").concat(e.keyCode, ", ").concat(iterationState));
          }, {
            capture: true
          });
          document.querySelector('video').click();
          removeItems();
          alert('play');
          _context2.next = 68;
          break;

        case 65:
          _context2.prev = 65;
          _context2.t0 = _context2["catch"](2);
          console.log(_context2.t0.toString());

        case 68:
        case "end":
          return _context2.stop();
      }
    }
  }, _callee2, null, [[2, 65]]);
})));