/**
 * Legacy browser fixture
 * ES5 polyfills, vendor prefixes, and old-style constructors.
 */

var LEGACY_VERSION = '1.0.0';

function LegacyWidget(element, options) {
  this.element = element;
  this.options = options || {};
  this.active = false;
}

LegacyWidget.prototype.render = function render() {
  this.element.innerHTML = '<div class="legacy-widget">Legacy Widget</div>';
  this.active = true;
};

LegacyWidget.prototype.destroy = function destroy() {
  this.element.innerHTML = '';
  this.active = false;
};

var LegacyWidget = LegacyWidget;

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function forEach(callback, thisArg) {
    if (this == null) throw new TypeError('Array.prototype.forEach called on null or undefined');
    var array = Object(this);
    var length = array.length >>> 0;
    for (var i = 0; i < length; i++) {
      if (i in array) callback.call(thisArg, array[i], i, array);
    }
  };
}

if (!String.prototype.trim) {
  String.prototype.trim = function trim() {
    return this.replace(/^\s+|\s+$/g, '');
  };
}

function addEvent(element, event, handler) {
  if (element.addEventListener) {
    element.addEventListener(event, handler, false);
  } else if (element.attachEvent) {
    element.attachEvent('on' + event, handler);
  } else {
    element['on' + event] = handler;
  }
}

function removeEvent(element, event, handler) {
  if (element.removeEventListener) {
    element.removeEventListener(event, handler, false);
  } else if (element.detachEvent) {
    element.detachEvent('on' + event, handler);
  } else {
    element['on' + event] = null;
  }
}

function getComputedStyleValue(element, property) {
  if (window.getComputedStyle) {
    return window.getComputedStyle(element, null).getPropertyValue(property);
  }
  return element.currentStyle ? element.currentStyle[property] : null;
}

function requestAnimFrame(callback) {
  return window.requestAnimationFrame
    || window.webkitRequestAnimationFrame
    || window.mozRequestAnimationFrame
    || function fallback(callback) {
      window.setTimeout(callback, 1000 / 60);
    };
}

function throttle(fn, wait) {
  var last = 0;
  return function () {
    var now = Date.now();
    if (now - last >= wait) {
      last = now;
      fn.apply(this, arguments);
    }
  };
}

function debounce(fn, wait) {
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, wait);
  };
}

var legacyUtils = {
  addEvent: addEvent,
  removeEvent: removeEvent,
  getComputedStyleValue: getComputedStyleValue,
  requestAnimFrame: requestAnimFrame,
  throttle: throttle,
  debounce: debounce,
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LegacyWidget: LegacyWidget, legacyUtils: legacyUtils };
}
