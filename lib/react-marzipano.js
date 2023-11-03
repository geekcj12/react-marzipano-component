import Gn, { useRef as Mo, useState as Ni, useEffect as dr, createContext as Zn, useContext as Kn } from "react";
var Vi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Eo(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function i() {
      return this instanceof i ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else
    r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(i) {
    var n = Object.getOwnPropertyDescriptor(e, i);
    Object.defineProperty(r, i, n.get ? n : {
      enumerable: !0,
      get: function() {
        return e[i];
      }
    });
  }), r;
}
function Yt() {
}
Yt.prototype.addEventListener = function(e, t) {
  var r = this.__events = this.__events || {}, i = r[e] = r[e] || [];
  i.indexOf(t) < 0 && i.push(t);
};
Yt.prototype.removeEventListener = function(e, t) {
  var r = this.__events = this.__events || {}, i = r[e];
  if (i) {
    var n = i.indexOf(t);
    n >= 0 && i.splice(n, 1);
  }
};
Yt.prototype.emit = function(e, t) {
  var r = this.__events = this.__events || {}, i = r[e], n = Array.prototype.slice.call(arguments, 1);
  if (i)
    for (var a = 0; a < i.length; a++) {
      var s = i[a];
      s.apply(this, n);
    }
};
function To(e) {
  for (var t in Yt.prototype)
    Yt.prototype.hasOwnProperty(t) && (e.prototype[t] = Yt.prototype[t]);
}
var oe = To;
function bo() {
  return typeof performance < "u" && performance.now ? function() {
    return performance.now();
  } : function() {
    return Date.now();
  };
}
var Pt = bo(), Qn = Pt;
function Co(e, t) {
  this.fn = e, this.cb = t, this.cfn = null;
}
function Je(e) {
  this._queue = [], this._delay = e && e.delay || 0, this._paused = e && !!e.paused || !1, this._currentTask = null, this._lastFinished = null;
}
Je.prototype.length = function() {
  return this._queue.length;
};
Je.prototype.push = function(e, t) {
  var r = new Co(e, t), i = this._cancel.bind(this, r);
  return this._queue.push(r), this._next(), i;
};
Je.prototype.pause = function() {
  this._paused || (this._paused = !0);
};
Je.prototype.resume = function() {
  this._paused && (this._paused = !1, this._next());
};
Je.prototype._start = function(e) {
  if (this._currentTask)
    throw new Error("WorkQueue: called start while running task");
  this._currentTask = e;
  var t = this._finish.bind(this, e);
  if (e.cfn = e.fn(t), typeof e.cfn != "function")
    throw new Error("WorkQueue: function is not cancellable");
};
Je.prototype._finish = function(e) {
  var t = Array.prototype.slice.call(arguments, 1);
  if (this._currentTask !== e)
    throw new Error("WorkQueue: called finish on wrong task");
  e.cb.apply(null, t), this._currentTask = null, this._lastFinished = Qn(), this._next();
};
Je.prototype._cancel = function(e) {
  var t = Array.prototype.slice.call(arguments, 1);
  if (this._currentTask === e)
    e.cfn.apply(null, t);
  else {
    var r = this._queue.indexOf(e);
    r >= 0 && (this._queue.splice(r, 1), e.cb.apply(null, t));
  }
};
Je.prototype._next = function() {
  if (!this._paused && this._queue.length && !this._currentTask) {
    if (this._lastFinished != null) {
      var e = Qn() - this._lastFinished, t = this._delay - e;
      if (t > 0) {
        setTimeout(this._next.bind(this), t);
        return;
      }
    }
    var r = this._queue.shift();
    this._start(r);
  }
};
var Jn = Je;
function So(e, t, r, i) {
  i = i || {};
  var n;
  r != null && r.absoluteWidth != null ? n = r.absoluteWidth / e : r != null && r.relativeWidth != null ? n = r.relativeWidth : n = 1;
  var a;
  r && r.absoluteHeight != null ? a = r.absoluteHeight / t : r != null && r.relativeHeight != null ? a = r.relativeHeight : a = 1;
  var s;
  r != null && r.absoluteX != null ? s = r.absoluteX / e : r != null && r.relativeX != null ? s = r.relativeX : s = 0;
  var o;
  return r != null && r.absoluteY != null ? o = r.absoluteY / t : r != null && r.relativeY != null ? o = r.relativeY : o = 0, i.x = s, i.y = o, i.width = n, i.height = a, i;
}
var ea = So;
function Po(e) {
  return function(r) {
    var i, n;
    try {
      n = e();
    } catch (a) {
      i = a;
    } finally {
      i ? r(i) : r(null, n);
    }
  };
}
var ta = Po;
function $o(e) {
  var t = !1, r;
  return function() {
    return t || (t = !0, r = e.apply(null, arguments)), r;
  };
}
var Ui = $o, Lo = Ui;
function Ro(e) {
  return function() {
    if (!arguments.length)
      throw new Error("cancelized: expected at least one argument");
    var r = Array.prototype.slice.call(arguments, 0), i = r[r.length - 1] = Lo(r[r.length - 1]);
    function n() {
      i.apply(null, arguments);
    }
    return e.apply(null, r), n;
  };
}
var ra = Ro;
function Ao(e) {
  for (var t in e)
    e.hasOwnProperty(t) && (e[t] = void 0);
}
var ne = Ao;
function Bi() {
  this._renderers = {};
}
Bi.prototype.set = function(e, t, r) {
  this._renderers[e] || (this._renderers[e] = {}), this._renderers[e][t] = r;
};
Bi.prototype.get = function(e, t) {
  var r = this._renderers[e] && this._renderers[e][t];
  return r || null;
};
var zo = Bi, Oo = oe, Io = Jn, Do = ea, Ho = ta, Fo = ra, No = ne, Vo = zo;
function ko(e, t) {
  return e.cmp(t);
}
function Wo(e, t) {
  return -e.cmp(t);
}
function ee(e) {
  this._progressive = !!(e && e.progressive), this._layers = [], this._renderers = [], this._tilesToLoad = [], this._tilesToRender = [], this._tmpVisible = [], this._tmpChildren = [], this._width = 0, this._height = 0, this._tmpRect = {}, this._tmpSize = {}, this._createTextureWorkQueue = new Io(), this._emitRenderInvalid = this._emitRenderInvalid.bind(this), this._rendererRegistry = new Vo();
}
Oo(ee);
ee.prototype.destroy = function() {
  this.removeAllLayers(), No(this);
};
ee.prototype.registerRenderer = function(e, t, r) {
  return this._rendererRegistry.set(e, t, r);
};
ee.prototype.domElement = function() {
  throw new Error("Stage implementation must override domElement");
};
ee.prototype.width = function() {
  return this._width;
};
ee.prototype.height = function() {
  return this._height;
};
ee.prototype.size = function(e) {
  return e = e || {}, e.width = this._width, e.height = this._height, e;
};
ee.prototype.setSize = function(e) {
  this._width = e.width, this._height = e.height, this.setSizeForType(), this.emit("resize"), this._emitRenderInvalid();
};
ee.prototype.setSizeForType = function(e) {
  throw new Error("Stage implementation must override setSizeForType");
};
ee.prototype.loadImage = function() {
  throw new Error("Stage implementation must override loadImage");
};
ee.prototype._emitRenderInvalid = function() {
  this.emit("renderInvalid");
};
ee.prototype.validateLayer = function(e) {
  throw new Error("Stage implementation must override validateLayer");
};
ee.prototype.listLayers = function() {
  return [].concat(this._layers);
};
ee.prototype.hasLayer = function(e) {
  return this._layers.indexOf(e) >= 0;
};
ee.prototype.addLayer = function(e, t) {
  if (this._layers.indexOf(e) >= 0)
    throw new Error("Layer already in stage");
  if (t == null && (t = this._layers.length), t < 0 || t > this._layers.length)
    throw new Error("Invalid layer position");
  this.validateLayer(e);
  var r = e.geometry().type, i = e.view().type, n = this._rendererRegistry.get(r, i);
  if (!n)
    throw new Error("No " + this.type + " renderer avaiable for " + r + " geometry and " + i + " view");
  var a = this.createRenderer(n);
  this._layers.splice(t, 0, e), this._renderers.splice(t, 0, a), e.addEventListener("viewChange", this._emitRenderInvalid), e.addEventListener("effectsChange", this._emitRenderInvalid), e.addEventListener("fixedLevelChange", this._emitRenderInvalid), e.addEventListener("textureStoreChange", this._emitRenderInvalid), this._emitRenderInvalid();
};
ee.prototype.moveLayer = function(e, t) {
  var r = this._layers.indexOf(e);
  if (r < 0)
    throw new Error("No such layer in stage");
  if (t < 0 || t >= this._layers.length)
    throw new Error("Invalid layer position");
  e = this._layers.splice(r, 1)[0];
  var i = this._renderers.splice(r, 1)[0];
  this._layers.splice(t, 0, e), this._renderers.splice(t, 0, i), this._emitRenderInvalid();
};
ee.prototype.removeLayer = function(e) {
  var t = this._layers.indexOf(e);
  if (t < 0)
    throw new Error("No such layer in stage");
  var r = this._layers.splice(t, 1)[0], i = this._renderers.splice(t, 1)[0];
  this.destroyRenderer(i), r.removeEventListener("viewChange", this._emitRenderInvalid), r.removeEventListener("effectsChange", this._emitRenderInvalid), r.removeEventListener("fixedLevelChange", this._emitRenderInvalid), r.removeEventListener("textureStoreChange", this._emitRenderInvalid), this._emitRenderInvalid();
};
ee.prototype.removeAllLayers = function() {
  for (; this._layers.length > 0; )
    this.removeLayer(this._layers[0]);
};
ee.prototype.startFrame = function() {
  throw new Error("Stage implementation must override startFrame");
};
ee.prototype.endFrame = function() {
  throw new Error("Stage implementation must override endFrame");
};
ee.prototype.render = function() {
  var e, t, r = this._tilesToLoad, i = this._tilesToRender, n = !0, a, s = this._width, o = this._height, h = this._tmpRect, l = this._tmpSize;
  if (!(s <= 0 || o <= 0)) {
    for (this.startFrame(), e = 0; e < this._layers.length; e++)
      this._layers[e].textureStore().startFrame();
    for (e = 0; e < this._layers.length; e++) {
      var c = this._layers[e], f = c.effects(), u = c.view(), p = c.textureStore(), m = this._renderers[e], x = this._layers.length - e, y, M;
      if (Do(s, o, f && f.rect, h), !(h.width <= 0 || h.height <= 0)) {
        for (l.width = h.width * this._width, l.height = h.height * this._height, u.setSize(l), m.startLayer(c, h), a = this._collectTiles(c, p), t = 0; t < r.length; t++)
          y = r[t], p.markTile(y);
        for (t = 0; t < i.length; t++)
          y = i[t], M = p.texture(y), m.renderTile(y, M, c, x);
        c.emit("renderComplete", a), a || (n = !1), m.endLayer(c, h);
      }
    }
    for (e = 0; e < this._layers.length; e++)
      this._layers[e].textureStore().endFrame();
    this.endFrame(), this.emit("renderComplete", n);
  }
};
ee.prototype._collectTiles = function(e, t) {
  var r = this._tilesToLoad, i = this._tilesToRender, n = this._tmpVisible;
  r.length = 0, i.length = 0, n.length = 0, e.visibleTiles(n);
  for (var a = !0, s = 0; s < n.length; s++) {
    var o = n[s], h;
    this._collectTileToLoad(o), t.texture(o) ? (h = !1, this._collectTileToRender(o)) : (h = this._collectChildren(o, t), a = !1), this._collectParents(o, t, h);
  }
  return r.sort(ko), i.sort(Wo), a;
};
ee.prototype._collectChildren = function(e, t) {
  var r = this._tmpChildren, i = !0;
  do {
    if (r.length = 0, !e.children(r))
      break;
    i = !1;
    for (var n = 0; n < r.length; n++)
      e = r[n], t.texture(e) ? (this._collectTileToLoad(e), this._collectTileToRender(e)) : i = !0;
  } while (i && r.length === 1);
  return i;
};
ee.prototype._collectParents = function(e, t, r) {
  for (var i = this._progressive; (i || r) && (e = e.parent()) != null; ) {
    if (r) {
      if (t.texture(e))
        this._collectTileToRender(e), r = !1;
      else if (!this._progressive)
        continue;
    }
    this._collectTileToLoad(e) || (i = !1);
  }
  return r;
};
ee.prototype._collectTileToLoad = function(e) {
  return this._collectTileIntoList(e, this._tilesToLoad);
};
ee.prototype._collectTileToRender = function(e) {
  return this._collectTileIntoList(e, this._tilesToRender);
};
ee.prototype._collectTileIntoList = function(e, t) {
  for (var r = !1, i = 0; i < t.length; i++)
    if (e.equals(t[i])) {
      r = !0;
      break;
    }
  return r || t.push(e), !r;
};
ee.prototype.createTexture = function(e, t, r) {
  var i = this;
  function n() {
    return new i.TextureClass(i, e, t);
  }
  var a = Fo(Ho(n));
  return this._createTextureWorkQueue.push(a, function(s, o) {
    r(s, e, t, o);
  });
};
var Yo = ee, qo = function() {
  return typeof window < "u" ? window : typeof self < "u" ? self : typeof Vi < "u" ? Vi : null;
}(), ia = qo, wn = ia, jo = oe, Xo = ne, Ti = {
  HTMLImageElement: ["naturalWidth", "naturalHeight"],
  HTMLCanvasElement: ["width", "height"],
  ImageBitmap: ["width", "height"]
};
function ct(e) {
  var t = !1;
  for (var r in Ti)
    if (wn[r] && e instanceof wn[r]) {
      t = !0, this._widthProp = Ti[r][0], this._heightProp = Ti[r][1];
      break;
    }
  if (!t)
    throw new Error("Unsupported pixel source");
  this._element = e;
}
jo(ct);
ct.prototype.destroy = function() {
  Xo(this);
};
ct.prototype.element = function() {
  return this._element;
};
ct.prototype.width = function() {
  return this._element[this._widthProp];
};
ct.prototype.height = function() {
  return this._element[this._heightProp];
};
ct.prototype.timestamp = function() {
  return 0;
};
ct.prototype.isDynamic = function() {
  return !1;
};
var Gi = ct;
function Uo(e, t) {
  e.super_ = t;
  var r = function() {
  };
  r.prototype = t.prototype, e.prototype = new r(), e.prototype.constructor = e;
}
var qe = Uo, Bo = qe;
function na(e) {
  this.constructor.super_.apply(this, arguments), this.message = e;
}
Bo(na, Error);
var aa = na, sa = { exports: {} };
/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */
(function(e) {
  (function(t, r, i) {
    e.exports ? e.exports = i() : t[r] = i();
  })(Vi, "bowser", function() {
    var t = !0;
    function r(l) {
      function c(Ce) {
        var ge = l.match(Ce);
        return ge && ge.length > 1 && ge[1] || "";
      }
      function f(Ce) {
        var ge = l.match(Ce);
        return ge && ge.length > 1 && ge[2] || "";
      }
      var u = c(/(ipod|iphone|ipad)/i).toLowerCase(), p = /like android/i.test(l), m = !p && /android/i.test(l), x = /nexus\s*[0-6]\s*/i.test(l), y = !x && /nexus\s*[0-9]+/i.test(l), M = /CrOS/.test(l), b = /silk/i.test(l), $ = /sailfish/i.test(l), L = /tizen/i.test(l), R = /(web|hpw)(o|0)s/i.test(l), P = /windows phone/i.test(l), k = !P && /windows/i.test(l), X = !u && !b && /macintosh/i.test(l), W = !m && !$ && !L && !R && /linux/i.test(l), Y = f(/edg([ea]|ios)\/(\d+(\.\d+)?)/i), D = c(/version\/(\d+(\.\d+)?)/i), U = /tablet/i.test(l) && !/tablet pc/i.test(l), q = !U && /[^-]mobi/i.test(l), z = /xbox/i.test(l), w;
      /opera/i.test(l) ? w = {
        name: "Opera",
        opera: t,
        version: D || c(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      } : /opr\/|opios/i.test(l) ? w = {
        name: "Opera",
        opera: t,
        version: c(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || D
      } : /SamsungBrowser/i.test(l) ? w = {
        name: "Samsung Internet for Android",
        samsungBrowser: t,
        version: D || c(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      } : /Whale/i.test(l) ? w = {
        name: "NAVER Whale browser",
        whale: t,
        version: c(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i)
      } : /MZBrowser/i.test(l) ? w = {
        name: "MZ Browser",
        mzbrowser: t,
        version: c(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i)
      } : /coast/i.test(l) ? w = {
        name: "Opera Coast",
        coast: t,
        version: D || c(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      } : /focus/i.test(l) ? w = {
        name: "Focus",
        focus: t,
        version: c(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i)
      } : /yabrowser/i.test(l) ? w = {
        name: "Yandex Browser",
        yandexbrowser: t,
        version: D || c(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      } : /ucbrowser/i.test(l) ? w = {
        name: "UC Browser",
        ucbrowser: t,
        version: c(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      } : /mxios/i.test(l) ? w = {
        name: "Maxthon",
        maxthon: t,
        version: c(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      } : /epiphany/i.test(l) ? w = {
        name: "Epiphany",
        epiphany: t,
        version: c(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      } : /puffin/i.test(l) ? w = {
        name: "Puffin",
        puffin: t,
        version: c(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      } : /sleipnir/i.test(l) ? w = {
        name: "Sleipnir",
        sleipnir: t,
        version: c(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      } : /k-meleon/i.test(l) ? w = {
        name: "K-Meleon",
        kMeleon: t,
        version: c(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      } : P ? (w = {
        name: "Windows Phone",
        osname: "Windows Phone",
        windowsphone: t
      }, Y ? (w.msedge = t, w.version = Y) : (w.msie = t, w.version = c(/iemobile\/(\d+(\.\d+)?)/i))) : /msie|trident/i.test(l) ? w = {
        name: "Internet Explorer",
        msie: t,
        version: c(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      } : M ? w = {
        name: "Chrome",
        osname: "Chrome OS",
        chromeos: t,
        chromeBook: t,
        chrome: t,
        version: c(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      } : /edg([ea]|ios)/i.test(l) ? w = {
        name: "Microsoft Edge",
        msedge: t,
        version: Y
      } : /vivaldi/i.test(l) ? w = {
        name: "Vivaldi",
        vivaldi: t,
        version: c(/vivaldi\/(\d+(\.\d+)?)/i) || D
      } : $ ? w = {
        name: "Sailfish",
        osname: "Sailfish OS",
        sailfish: t,
        version: c(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      } : /seamonkey\//i.test(l) ? w = {
        name: "SeaMonkey",
        seamonkey: t,
        version: c(/seamonkey\/(\d+(\.\d+)?)/i)
      } : /firefox|iceweasel|fxios/i.test(l) ? (w = {
        name: "Firefox",
        firefox: t,
        version: c(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }, /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(l) && (w.firefoxos = t, w.osname = "Firefox OS")) : b ? w = {
        name: "Amazon Silk",
        silk: t,
        version: c(/silk\/(\d+(\.\d+)?)/i)
      } : /phantom/i.test(l) ? w = {
        name: "PhantomJS",
        phantom: t,
        version: c(/phantomjs\/(\d+(\.\d+)?)/i)
      } : /slimerjs/i.test(l) ? w = {
        name: "SlimerJS",
        slimer: t,
        version: c(/slimerjs\/(\d+(\.\d+)?)/i)
      } : /blackberry|\bbb\d+/i.test(l) || /rim\stablet/i.test(l) ? w = {
        name: "BlackBerry",
        osname: "BlackBerry OS",
        blackberry: t,
        version: D || c(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      } : R ? (w = {
        name: "WebOS",
        osname: "WebOS",
        webos: t,
        version: D || c(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      }, /touchpad\//i.test(l) && (w.touchpad = t)) : /bada/i.test(l) ? w = {
        name: "Bada",
        osname: "Bada",
        bada: t,
        version: c(/dolfin\/(\d+(\.\d+)?)/i)
      } : L ? w = {
        name: "Tizen",
        osname: "Tizen",
        tizen: t,
        version: c(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || D
      } : /qupzilla/i.test(l) ? w = {
        name: "QupZilla",
        qupzilla: t,
        version: c(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || D
      } : /chromium/i.test(l) ? w = {
        name: "Chromium",
        chromium: t,
        version: c(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || D
      } : /chrome|crios|crmo/i.test(l) ? w = {
        name: "Chrome",
        chrome: t,
        version: c(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      } : m ? w = {
        name: "Android",
        version: D
      } : /safari|applewebkit/i.test(l) ? (w = {
        name: "Safari",
        safari: t
      }, D && (w.version = D)) : u ? (w = {
        name: u == "iphone" ? "iPhone" : u == "ipad" ? "iPad" : "iPod"
      }, D && (w.version = D)) : /googlebot/i.test(l) ? w = {
        name: "Googlebot",
        googlebot: t,
        version: c(/googlebot\/(\d+(\.\d+))/i) || D
      } : w = {
        name: c(/^(.*)\/(.*) /),
        version: f(/^(.*)\/(.*) /)
      }, !w.msedge && /(apple)?webkit/i.test(l) ? (/(apple)?webkit\/537\.36/i.test(l) ? (w.name = w.name || "Blink", w.blink = t) : (w.name = w.name || "Webkit", w.webkit = t), !w.version && D && (w.version = D)) : !w.opera && /gecko\//i.test(l) && (w.name = w.name || "Gecko", w.gecko = t, w.version = w.version || c(/gecko\/(\d+(\.\d+)?)/i)), !w.windowsphone && (m || w.silk) ? (w.android = t, w.osname = "Android") : !w.windowsphone && u ? (w[u] = t, w.ios = t, w.osname = "iOS") : X ? (w.mac = t, w.osname = "macOS") : z ? (w.xbox = t, w.osname = "Xbox") : k ? (w.windows = t, w.osname = "Windows") : W && (w.linux = t, w.osname = "Linux");
      function $e(Ce) {
        switch (Ce) {
          case "NT":
            return "NT";
          case "XP":
            return "XP";
          case "NT 5.0":
            return "2000";
          case "NT 5.1":
            return "XP";
          case "NT 5.2":
            return "2003";
          case "NT 6.0":
            return "Vista";
          case "NT 6.1":
            return "7";
          case "NT 6.2":
            return "8";
          case "NT 6.3":
            return "8.1";
          case "NT 10.0":
            return "10";
          default:
            return;
        }
      }
      var re = "";
      w.windows ? re = $e(c(/Windows ((NT|XP)( \d\d?.\d)?)/i)) : w.windowsphone ? re = c(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i) : w.mac ? (re = c(/Mac OS X (\d+([_\.\s]\d+)*)/i), re = re.replace(/[_\s]/g, ".")) : u ? (re = c(/os (\d+([_\s]\d+)*) like mac os x/i), re = re.replace(/[_\s]/g, ".")) : m ? re = c(/android[ \/-](\d+(\.\d+)*)/i) : w.webos ? re = c(/(?:web|hpw)os\/(\d+(\.\d+)*)/i) : w.blackberry ? re = c(/rim\stablet\sos\s(\d+(\.\d+)*)/i) : w.bada ? re = c(/bada\/(\d+(\.\d+)*)/i) : w.tizen && (re = c(/tizen[\/\s](\d+(\.\d+)*)/i)), re && (w.osversion = re);
      var Ne = !w.windows && re.split(".")[0];
      return U || y || u == "ipad" || m && (Ne == 3 || Ne >= 4 && !q) || w.silk ? w.tablet = t : (q || u == "iphone" || u == "ipod" || m || x || w.blackberry || w.webos || w.bada) && (w.mobile = t), w.msedge || w.msie && w.version >= 10 || w.yandexbrowser && w.version >= 15 || w.vivaldi && w.version >= 1 || w.chrome && w.version >= 20 || w.samsungBrowser && w.version >= 4 || w.whale && s([w.version, "1.0"]) === 1 || w.mzbrowser && s([w.version, "6.0"]) === 1 || w.focus && s([w.version, "1.0"]) === 1 || w.firefox && w.version >= 20 || w.safari && w.version >= 6 || w.opera && w.version >= 10 || w.ios && w.osversion && w.osversion.split(".")[0] >= 6 || w.blackberry && w.version >= 10.1 || w.chromium && w.version >= 20 ? w.a = t : w.msie && w.version < 10 || w.chrome && w.version < 20 || w.firefox && w.version < 20 || w.safari && w.version < 6 || w.opera && w.version < 10 || w.ios && w.osversion && w.osversion.split(".")[0] < 6 || w.chromium && w.version < 20 ? w.c = t : w.x = t, w;
    }
    var i = r(typeof navigator < "u" && navigator.userAgent || "");
    i.test = function(l) {
      for (var c = 0; c < l.length; ++c) {
        var f = l[c];
        if (typeof f == "string" && f in i)
          return !0;
      }
      return !1;
    };
    function n(l) {
      return l.split(".").length;
    }
    function a(l, c) {
      var f = [], u;
      if (Array.prototype.map)
        return Array.prototype.map.call(l, c);
      for (u = 0; u < l.length; u++)
        f.push(c(l[u]));
      return f;
    }
    function s(l) {
      for (var c = Math.max(n(l[0]), n(l[1])), f = a(l, function(u) {
        var p = c - n(u);
        return u = u + new Array(p + 1).join(".0"), a(u.split("."), function(m) {
          return new Array(20 - m.length).join("0") + m;
        }).reverse();
      }); --c >= 0; ) {
        if (f[0][c] > f[1][c])
          return 1;
        if (f[0][c] === f[1][c]) {
          if (c === 0)
            return 0;
        } else
          return -1;
      }
    }
    function o(l, c, f) {
      var u = i;
      typeof c == "string" && (f = c, c = void 0), c === void 0 && (c = !1), f && (u = r(f));
      var p = "" + u.version;
      for (var m in l)
        if (l.hasOwnProperty(m) && u[m]) {
          if (typeof l[m] != "string")
            throw new Error("Browser version in the minVersion map should be a string: " + m + ": " + String(l));
          return s([p, l[m]]) < 0;
        }
      return c;
    }
    function h(l, c, f) {
      return !o(l, c, f);
    }
    return i.isUnsupportedBrowser = o, i.compareVersions = s, i.check = h, i._detect = r, i.detect = r, i;
  });
})(sa);
var Zi = sa.exports, bi = Gi, Go = aa, Zo = Zi, oa = ia, Ko = Ui, Qo = !!oa.createImageBitmap && !Zo.firefox, Jo = {
  imageOrientation: "flipY",
  premultiplyAlpha: "premultiply"
};
function Zr(e) {
  this._stage = e;
}
Zr.prototype.loadImage = function(e, t, r) {
  var i = this, n = new Image();
  n.crossOrigin = "anonymous";
  var a = t && t.x || 0, s = t && t.y || 0, o = t && t.width || 1, h = t && t.height || 1;
  r = Ko(r), n.onload = function() {
    i._handleLoad(n, a, s, o, h, r);
  }, n.onerror = function() {
    i._handleError(e, r);
  }, n.src = e;
  function l() {
    n.onload = n.onerror = null, n.src = "", r.apply(null, arguments);
  }
  return l;
};
Zr.prototype._handleLoad = function(e, t, r, i, n, a) {
  if (t === 0 && r === 0 && i === 1 && n === 1) {
    a(null, new bi(e));
    return;
  }
  if (t *= e.naturalWidth, r *= e.naturalHeight, i *= e.naturalWidth, n *= e.naturalHeight, Qo)
    oa.createImageBitmap(e, t, r, i, n, Jo).then(function(h) {
      a(null, new bi(h));
    });
  else {
    var s = document.createElement("canvas");
    s.width = i, s.height = n;
    var o = s.getContext("2d");
    o.drawImage(e, t, r, i, n, 0, 0, i, n), a(null, new bi(s));
  }
};
Zr.prototype._handleError = function(e, t) {
  t(new Go("Network error: " + e));
};
var eh = Zr, th = 1;
function rh() {
  if (typeof window < "u") {
    if (window.devicePixelRatio)
      return window.devicePixelRatio;
    var e = window.screen;
    if (e && e.deviceXDPI && e.logicalXDPI)
      return e.deviceXDPI / e.logicalXDPI;
    if (e && e.systemXDPI && e.logicalXDPI)
      return e.systemXDPI / e.logicalXDPI;
  }
  return th;
}
var Kr = rh;
function ih(e) {
  return (e & e - 1) == 0;
}
var nh = ih;
function Ki(e) {
  for (var t = document.documentElement.style, r = ["Moz", "Webkit", "Khtml", "O", "ms"], i = 0; i < r.length; i++) {
    var n = r[i], a = e[0].toUpperCase() + e.slice(1), s = n + a;
    if (s in t)
      return s;
  }
  return e;
}
function ah(e) {
  var t = Ki(e);
  return function(i) {
    return i.style[t];
  };
}
function Qi(e) {
  var t = Ki(e);
  return function(i, n) {
    return i.style[t] = n;
  };
}
var ha = Qi("transform"), la = Qi("transformOrigin");
function sh(e) {
  ha(e, "translateZ(0)");
}
function oh(e) {
  la(e, "0 0 0");
}
function hh(e) {
  e.style.position = "absolute";
}
function lh(e, t, r) {
  e.style.left = t + "px", e.style.top = r + "px";
}
function ch(e, t, r) {
  e.style.width = t + "px", e.style.height = r + "px";
}
function vh(e) {
  e.style.width = e.style.height = 0;
}
function fh(e) {
  e.style.width = e.style.height = "100%";
}
function uh(e) {
  e.style.overflow = "hidden";
}
function dh(e) {
  e.style.overflow = "visible";
}
function ph(e) {
  e.style.pointerEvents = "none";
}
var be = {
  prefixProperty: Ki,
  getWithVendorPrefix: ah,
  setWithVendorPrefix: Qi,
  setTransform: ha,
  setTransformOrigin: la,
  setNullTransform: sh,
  setNullTransformOrigin: oh,
  setAbsolute: hh,
  setPixelPosition: lh,
  setPixelSize: ch,
  setNullSize: vh,
  setFullSize: fh,
  setOverflowHidden: uh,
  setOverflowVisible: dh,
  setNoPointerEvents: ph
}, _h = Yo, mh = eh, yh = Zi, gh = qe, wh = Kr, xn = nh, xh = be.setAbsolute, Mh = be.setFullSize, Eh = ne, Th = {
  // Whether to use texImage2D instead of texSubImage2D when repainting an
  // existing texture from a video element. On most browsers texSubImage2D is
  // faster, but on Chrome the performance degrades significantly. See:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=612542
  videoUseTexImage2D: yh.chrome
};
function bh(e, t) {
  var r = {
    alpha: !0,
    premultipliedAlpha: !0,
    antialias: !!(t && t.antialias),
    preserveDrawingBuffer: !!(t && t.preserveDrawingBuffer)
  }, i = e.getContext && (e.getContext("webgl", r) || e.getContext("experimental-webgl", r));
  if (!i)
    throw new Error("Could not get WebGL context");
  return t.wrapContext && (i = t.wrapContext(i)), i;
}
function ue(e) {
  e = e || {};
  var t = this;
  this.constructor.super_.call(this, e), this._generateMipmaps = e.generateMipmaps != null ? e.generateMipmaps : !1, this._loader = new mh(this), this._domElement = document.createElement("canvas"), xh(this._domElement), Mh(this._domElement), this._gl = bh(this._domElement, e), this._handleContextLoss = function() {
    t.emit("webglcontextlost"), t._gl = null;
  }, this._domElement.addEventListener("webglcontextlost", this._handleContextLoss), this._rendererInstances = [];
}
gh(ue, _h);
ue.prototype.destroy = function() {
  this._domElement.removeEventListener("webglcontextlost", this._handleContextLoss), this.constructor.super_.prototype.destroy.call(this);
};
ue.prototype.domElement = function() {
  return this._domElement;
};
ue.prototype.webGlContext = function() {
  return this._gl;
};
ue.prototype.setSizeForType = function() {
  var e = wh();
  this._domElement.width = e * this._width, this._domElement.height = e * this._height;
};
ue.prototype.loadImage = function(e, t, r) {
  return this._loader.loadImage(e, t, r);
};
ue.prototype.maxTextureSize = function() {
  return this._gl.getParameter(this._gl.MAX_TEXTURE_SIZE);
};
ue.prototype.validateLayer = function(e) {
  var t = e.geometry().maxTileSize(), r = this.maxTextureSize();
  if (t > r)
    throw new Error("Layer has level with tile size larger than maximum texture size (" + t + " vs. " + r + ")");
};
ue.prototype.createRenderer = function(e) {
  for (var t = this._rendererInstances, r = 0; r < t.length; r++)
    if (t[r] instanceof e)
      return t[r];
  var i = new e(this._gl);
  return t.push(i), i;
};
ue.prototype.destroyRenderer = function(e) {
  var t = this._rendererInstances;
  if (this._renderers.indexOf(e) < 0) {
    e.destroy();
    var r = t.indexOf(e);
    r >= 0 && t.splice(r, 1);
  }
};
ue.prototype.startFrame = function() {
  var e = this._gl;
  if (!e)
    throw new Error("Bad WebGL context - maybe context was lost?");
  e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight), e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), e.enable(e.DEPTH_TEST), e.enable(e.BLEND), e.blendFunc(e.ONE, e.ONE_MINUS_SRC_ALPHA);
};
ue.prototype.endFrame = function() {
};
ue.prototype.takeSnapshot = function(e) {
  (typeof e != "object" || e == null) && (e = {});
  var t = e.quality;
  if (typeof t > "u" && (t = 75), typeof t != "number" || t < 0 || t > 100)
    throw new Error("WebGLStage: Snapshot quality needs to be a number between 0 and 100");
  return this.render(), this._domElement.toDataURL("image/jpeg", t / 100);
};
ue.type = ue.prototype.type = "webgl";
function Ji(e, t, r) {
  this._stage = e, this._gl = e._gl, this._texture = null, this._timestamp = null, this._width = this._height = null, this.refresh(t, r);
}
Ji.prototype.refresh = function(e, t) {
  var r = this._gl, i = this._stage, n, a = t.timestamp();
  if (a !== this._timestamp) {
    var s = t.element(), o = t.width(), h = t.height();
    if (o !== this._width || h !== this._height) {
      var l = i.maxTextureSize();
      if (o > l)
        throw new Error("Texture width larger than max size (" + o + " vs. " + l + ")");
      if (h > l)
        throw new Error("Texture height larger than max size (" + h + " vs. " + l + ")");
      this._texture && r.deleteTexture(n), n = this._texture = r.createTexture(), r.bindTexture(r.TEXTURE_2D, n), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !0), r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, s);
    } else
      n = this._texture, r.bindTexture(r.TEXTURE_2D, n), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !0), r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), s instanceof HTMLVideoElement && Th.videoUseTexImage2D ? r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, s) : r.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, r.RGBA, r.UNSIGNED_BYTE, s);
    i._generateMipmaps && xn(o) && xn(h) ? (r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR_MIPMAP_LINEAR), r.generateMipmap(r.TEXTURE_2D)) : (r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR)), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.bindTexture(r.TEXTURE_2D, null), this._timestamp = a, this._width = o, this._height = h;
  }
};
Ji.prototype.destroy = function() {
  this._texture && this._gl.deleteTexture(this._texture), Eh(this);
};
ue.TextureClass = ue.prototype.TextureClass = Ji;
var ca = ue, A = 1e-6, V = typeof Float32Array < "u" ? Float32Array : Array, He = Math.random;
function Ch(e) {
  V = e;
}
var Sh = Math.PI / 180;
function Ph(e) {
  return e * Sh;
}
function $h(e, t) {
  return Math.abs(e - t) <= A * Math.max(1, Math.abs(e), Math.abs(t));
}
Math.hypot || (Math.hypot = function() {
  for (var e = 0, t = arguments.length; t--; )
    e += arguments[t] * arguments[t];
  return Math.sqrt(e);
});
const Lh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ARRAY_TYPE() {
    return V;
  },
  EPSILON: A,
  RANDOM: He,
  equals: $h,
  setMatrixArrayType: Ch,
  toRadian: Ph
}, Symbol.toStringTag, { value: "Module" }));
function Rh() {
  var e = new V(4);
  return V != Float32Array && (e[1] = 0, e[2] = 0), e[0] = 1, e[3] = 1, e;
}
function Ah(e) {
  var t = new V(4);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t;
}
function zh(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e;
}
function Oh(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e;
}
function Ih(e, t, r, i) {
  var n = new V(4);
  return n[0] = e, n[1] = t, n[2] = r, n[3] = i, n;
}
function Dh(e, t, r, i, n) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e;
}
function Hh(e, t) {
  if (e === t) {
    var r = t[1];
    e[1] = t[2], e[2] = r;
  } else
    e[0] = t[0], e[1] = t[2], e[2] = t[1], e[3] = t[3];
  return e;
}
function Fh(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = r * a - n * i;
  return s ? (s = 1 / s, e[0] = a * s, e[1] = -i * s, e[2] = -n * s, e[3] = r * s, e) : null;
}
function Nh(e, t) {
  var r = t[0];
  return e[0] = t[3], e[1] = -t[1], e[2] = -t[2], e[3] = r, e;
}
function Vh(e) {
  return e[0] * e[3] - e[2] * e[1];
}
function va(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = r[0], h = r[1], l = r[2], c = r[3];
  return e[0] = i * o + a * h, e[1] = n * o + s * h, e[2] = i * l + a * c, e[3] = n * l + s * c, e;
}
function kh(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = Math.sin(r), h = Math.cos(r);
  return e[0] = i * h + a * o, e[1] = n * h + s * o, e[2] = i * -o + a * h, e[3] = n * -o + s * h, e;
}
function Wh(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = r[0], h = r[1];
  return e[0] = i * o, e[1] = n * o, e[2] = a * h, e[3] = s * h, e;
}
function Yh(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = i, e[1] = r, e[2] = -r, e[3] = i, e;
}
function qh(e, t) {
  return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = t[1], e;
}
function jh(e) {
  return "mat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
}
function Xh(e) {
  return Math.hypot(e[0], e[1], e[2], e[3]);
}
function Uh(e, t, r, i) {
  return e[2] = i[2] / i[0], r[0] = i[0], r[1] = i[1], r[3] = i[3] - e[2] * r[1], [e, t, r];
}
function Bh(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e;
}
function fa(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e;
}
function Gh(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3];
}
function Zh(e, t) {
  var r = e[0], i = e[1], n = e[2], a = e[3], s = t[0], o = t[1], h = t[2], l = t[3];
  return Math.abs(r - s) <= A * Math.max(1, Math.abs(r), Math.abs(s)) && Math.abs(i - o) <= A * Math.max(1, Math.abs(i), Math.abs(o)) && Math.abs(n - h) <= A * Math.max(1, Math.abs(n), Math.abs(h)) && Math.abs(a - l) <= A * Math.max(1, Math.abs(a), Math.abs(l));
}
function Kh(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e;
}
function Qh(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e;
}
var Jh = va, el = fa;
const tl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LDU: Uh,
  add: Bh,
  adjoint: Nh,
  clone: Ah,
  copy: zh,
  create: Rh,
  determinant: Vh,
  equals: Zh,
  exactEquals: Gh,
  frob: Xh,
  fromRotation: Yh,
  fromScaling: qh,
  fromValues: Ih,
  identity: Oh,
  invert: Fh,
  mul: Jh,
  multiply: va,
  multiplyScalar: Kh,
  multiplyScalarAndAdd: Qh,
  rotate: kh,
  scale: Wh,
  set: Dh,
  str: jh,
  sub: el,
  subtract: fa,
  transpose: Hh
}, Symbol.toStringTag, { value: "Module" }));
function rl() {
  var e = new V(6);
  return V != Float32Array && (e[1] = 0, e[2] = 0, e[4] = 0, e[5] = 0), e[0] = 1, e[3] = 1, e;
}
function il(e) {
  var t = new V(6);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t;
}
function nl(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e;
}
function al(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e;
}
function sl(e, t, r, i, n, a) {
  var s = new V(6);
  return s[0] = e, s[1] = t, s[2] = r, s[3] = i, s[4] = n, s[5] = a, s;
}
function ol(e, t, r, i, n, a, s) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e[4] = a, e[5] = s, e;
}
function hl(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = t[4], o = t[5], h = r * a - i * n;
  return h ? (h = 1 / h, e[0] = a * h, e[1] = -i * h, e[2] = -n * h, e[3] = r * h, e[4] = (n * o - a * s) * h, e[5] = (i * s - r * o) * h, e) : null;
}
function ll(e) {
  return e[0] * e[3] - e[1] * e[2];
}
function ua(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = t[4], h = t[5], l = r[0], c = r[1], f = r[2], u = r[3], p = r[4], m = r[5];
  return e[0] = i * l + a * c, e[1] = n * l + s * c, e[2] = i * f + a * u, e[3] = n * f + s * u, e[4] = i * p + a * m + o, e[5] = n * p + s * m + h, e;
}
function cl(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = t[4], h = t[5], l = Math.sin(r), c = Math.cos(r);
  return e[0] = i * c + a * l, e[1] = n * c + s * l, e[2] = i * -l + a * c, e[3] = n * -l + s * c, e[4] = o, e[5] = h, e;
}
function vl(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = t[4], h = t[5], l = r[0], c = r[1];
  return e[0] = i * l, e[1] = n * l, e[2] = a * c, e[3] = s * c, e[4] = o, e[5] = h, e;
}
function fl(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = t[4], h = t[5], l = r[0], c = r[1];
  return e[0] = i, e[1] = n, e[2] = a, e[3] = s, e[4] = i * l + a * c + o, e[5] = n * l + s * c + h, e;
}
function ul(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = i, e[1] = r, e[2] = -r, e[3] = i, e[4] = 0, e[5] = 0, e;
}
function dl(e, t) {
  return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = t[1], e[4] = 0, e[5] = 0, e;
}
function pl(e, t) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = t[0], e[5] = t[1], e;
}
function _l(e) {
  return "mat2d(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ")";
}
function ml(e) {
  return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], 1);
}
function yl(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e[4] = t[4] + r[4], e[5] = t[5] + r[5], e;
}
function da(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e[4] = t[4] - r[4], e[5] = t[5] - r[5], e;
}
function gl(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * r, e[5] = t[5] * r, e;
}
function wl(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e[4] = t[4] + r[4] * i, e[5] = t[5] + r[5] * i, e;
}
function xl(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5];
}
function Ml(e, t) {
  var r = e[0], i = e[1], n = e[2], a = e[3], s = e[4], o = e[5], h = t[0], l = t[1], c = t[2], f = t[3], u = t[4], p = t[5];
  return Math.abs(r - h) <= A * Math.max(1, Math.abs(r), Math.abs(h)) && Math.abs(i - l) <= A * Math.max(1, Math.abs(i), Math.abs(l)) && Math.abs(n - c) <= A * Math.max(1, Math.abs(n), Math.abs(c)) && Math.abs(a - f) <= A * Math.max(1, Math.abs(a), Math.abs(f)) && Math.abs(s - u) <= A * Math.max(1, Math.abs(s), Math.abs(u)) && Math.abs(o - p) <= A * Math.max(1, Math.abs(o), Math.abs(p));
}
var El = ua, Tl = da;
const bl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: yl,
  clone: il,
  copy: nl,
  create: rl,
  determinant: ll,
  equals: Ml,
  exactEquals: xl,
  frob: ml,
  fromRotation: ul,
  fromScaling: dl,
  fromTranslation: pl,
  fromValues: sl,
  identity: al,
  invert: hl,
  mul: El,
  multiply: ua,
  multiplyScalar: gl,
  multiplyScalarAndAdd: wl,
  rotate: cl,
  scale: vl,
  set: ol,
  str: _l,
  sub: Tl,
  subtract: da,
  translate: fl
}, Symbol.toStringTag, { value: "Module" }));
function pa() {
  var e = new V(9);
  return V != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[5] = 0, e[6] = 0, e[7] = 0), e[0] = 1, e[4] = 1, e[8] = 1, e;
}
function Cl(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[4], e[4] = t[5], e[5] = t[6], e[6] = t[8], e[7] = t[9], e[8] = t[10], e;
}
function Sl(e) {
  var t = new V(9);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t;
}
function Pl(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e;
}
function $l(e, t, r, i, n, a, s, o, h) {
  var l = new V(9);
  return l[0] = e, l[1] = t, l[2] = r, l[3] = i, l[4] = n, l[5] = a, l[6] = s, l[7] = o, l[8] = h, l;
}
function Ll(e, t, r, i, n, a, s, o, h, l) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e[4] = a, e[5] = s, e[6] = o, e[7] = h, e[8] = l, e;
}
function Rl(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e;
}
function Al(e, t) {
  if (e === t) {
    var r = t[1], i = t[2], n = t[5];
    e[1] = t[3], e[2] = t[6], e[3] = r, e[5] = t[7], e[6] = i, e[7] = n;
  } else
    e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8];
  return e;
}
function zl(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = t[4], o = t[5], h = t[6], l = t[7], c = t[8], f = c * s - o * l, u = -c * a + o * h, p = l * a - s * h, m = r * f + i * u + n * p;
  return m ? (m = 1 / m, e[0] = f * m, e[1] = (-c * i + n * l) * m, e[2] = (o * i - n * s) * m, e[3] = u * m, e[4] = (c * r - n * h) * m, e[5] = (-o * r + n * a) * m, e[6] = p * m, e[7] = (-l * r + i * h) * m, e[8] = (s * r - i * a) * m, e) : null;
}
function Ol(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = t[4], o = t[5], h = t[6], l = t[7], c = t[8];
  return e[0] = s * c - o * l, e[1] = n * l - i * c, e[2] = i * o - n * s, e[3] = o * h - a * c, e[4] = r * c - n * h, e[5] = n * a - r * o, e[6] = a * l - s * h, e[7] = i * h - r * l, e[8] = r * s - i * a, e;
}
function Il(e) {
  var t = e[0], r = e[1], i = e[2], n = e[3], a = e[4], s = e[5], o = e[6], h = e[7], l = e[8];
  return t * (l * a - s * h) + r * (-l * n + s * o) + i * (h * n - a * o);
}
function _a(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = t[8], u = r[0], p = r[1], m = r[2], x = r[3], y = r[4], M = r[5], b = r[6], $ = r[7], L = r[8];
  return e[0] = u * i + p * s + m * l, e[1] = u * n + p * o + m * c, e[2] = u * a + p * h + m * f, e[3] = x * i + y * s + M * l, e[4] = x * n + y * o + M * c, e[5] = x * a + y * h + M * f, e[6] = b * i + $ * s + L * l, e[7] = b * n + $ * o + L * c, e[8] = b * a + $ * h + L * f, e;
}
function Dl(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = t[8], u = r[0], p = r[1];
  return e[0] = i, e[1] = n, e[2] = a, e[3] = s, e[4] = o, e[5] = h, e[6] = u * i + p * s + l, e[7] = u * n + p * o + c, e[8] = u * a + p * h + f, e;
}
function Hl(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = t[8], u = Math.sin(r), p = Math.cos(r);
  return e[0] = p * i + u * s, e[1] = p * n + u * o, e[2] = p * a + u * h, e[3] = p * s - u * i, e[4] = p * o - u * n, e[5] = p * h - u * a, e[6] = l, e[7] = c, e[8] = f, e;
}
function Fl(e, t, r) {
  var i = r[0], n = r[1];
  return e[0] = i * t[0], e[1] = i * t[1], e[2] = i * t[2], e[3] = n * t[3], e[4] = n * t[4], e[5] = n * t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e;
}
function Nl(e, t) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = t[0], e[7] = t[1], e[8] = 1, e;
}
function Vl(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = i, e[1] = r, e[2] = 0, e[3] = -r, e[4] = i, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e;
}
function kl(e, t) {
  return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = 0, e[4] = t[1], e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e;
}
function Wl(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = 0, e[3] = t[2], e[4] = t[3], e[5] = 0, e[6] = t[4], e[7] = t[5], e[8] = 1, e;
}
function Yl(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = r + r, o = i + i, h = n + n, l = r * s, c = i * s, f = i * o, u = n * s, p = n * o, m = n * h, x = a * s, y = a * o, M = a * h;
  return e[0] = 1 - f - m, e[3] = c - M, e[6] = u + y, e[1] = c + M, e[4] = 1 - l - m, e[7] = p - x, e[2] = u - y, e[5] = p + x, e[8] = 1 - l - f, e;
}
function ql(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = t[4], o = t[5], h = t[6], l = t[7], c = t[8], f = t[9], u = t[10], p = t[11], m = t[12], x = t[13], y = t[14], M = t[15], b = r * o - i * s, $ = r * h - n * s, L = r * l - a * s, R = i * h - n * o, P = i * l - a * o, k = n * l - a * h, X = c * x - f * m, W = c * y - u * m, Y = c * M - p * m, D = f * y - u * x, U = f * M - p * x, q = u * M - p * y, z = b * q - $ * U + L * D + R * Y - P * W + k * X;
  return z ? (z = 1 / z, e[0] = (o * q - h * U + l * D) * z, e[1] = (h * Y - s * q - l * W) * z, e[2] = (s * U - o * Y + l * X) * z, e[3] = (n * U - i * q - a * D) * z, e[4] = (r * q - n * Y + a * W) * z, e[5] = (i * Y - r * U - a * X) * z, e[6] = (x * k - y * P + M * R) * z, e[7] = (y * L - m * k - M * $) * z, e[8] = (m * P - x * L + M * b) * z, e) : null;
}
function jl(e, t, r) {
  return e[0] = 2 / t, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = -2 / r, e[5] = 0, e[6] = -1, e[7] = 1, e[8] = 1, e;
}
function Xl(e) {
  return "mat3(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ")";
}
function Ul(e) {
  return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]);
}
function Bl(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e[4] = t[4] + r[4], e[5] = t[5] + r[5], e[6] = t[6] + r[6], e[7] = t[7] + r[7], e[8] = t[8] + r[8], e;
}
function ma(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e[4] = t[4] - r[4], e[5] = t[5] - r[5], e[6] = t[6] - r[6], e[7] = t[7] - r[7], e[8] = t[8] - r[8], e;
}
function Gl(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e[8] = t[8] * r, e;
}
function Zl(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e[4] = t[4] + r[4] * i, e[5] = t[5] + r[5] * i, e[6] = t[6] + r[6] * i, e[7] = t[7] + r[7] * i, e[8] = t[8] + r[8] * i, e;
}
function Kl(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8];
}
function Ql(e, t) {
  var r = e[0], i = e[1], n = e[2], a = e[3], s = e[4], o = e[5], h = e[6], l = e[7], c = e[8], f = t[0], u = t[1], p = t[2], m = t[3], x = t[4], y = t[5], M = t[6], b = t[7], $ = t[8];
  return Math.abs(r - f) <= A * Math.max(1, Math.abs(r), Math.abs(f)) && Math.abs(i - u) <= A * Math.max(1, Math.abs(i), Math.abs(u)) && Math.abs(n - p) <= A * Math.max(1, Math.abs(n), Math.abs(p)) && Math.abs(a - m) <= A * Math.max(1, Math.abs(a), Math.abs(m)) && Math.abs(s - x) <= A * Math.max(1, Math.abs(s), Math.abs(x)) && Math.abs(o - y) <= A * Math.max(1, Math.abs(o), Math.abs(y)) && Math.abs(h - M) <= A * Math.max(1, Math.abs(h), Math.abs(M)) && Math.abs(l - b) <= A * Math.max(1, Math.abs(l), Math.abs(b)) && Math.abs(c - $) <= A * Math.max(1, Math.abs(c), Math.abs($));
}
var Jl = _a, ec = ma;
const tc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Bl,
  adjoint: Ol,
  clone: Sl,
  copy: Pl,
  create: pa,
  determinant: Il,
  equals: Ql,
  exactEquals: Kl,
  frob: Ul,
  fromMat2d: Wl,
  fromMat4: Cl,
  fromQuat: Yl,
  fromRotation: Vl,
  fromScaling: kl,
  fromTranslation: Nl,
  fromValues: $l,
  identity: Rl,
  invert: zl,
  mul: Jl,
  multiply: _a,
  multiplyScalar: Gl,
  multiplyScalarAndAdd: Zl,
  normalFromMat4: ql,
  projection: jl,
  rotate: Hl,
  scale: Fl,
  set: Ll,
  str: Xl,
  sub: ec,
  subtract: ma,
  translate: Dl,
  transpose: Al
}, Symbol.toStringTag, { value: "Module" }));
function rc() {
  var e = new V(16);
  return V != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0), e[0] = 1, e[5] = 1, e[10] = 1, e[15] = 1, e;
}
function ic(e) {
  var t = new V(16);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t;
}
function nc(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e;
}
function ac(e, t, r, i, n, a, s, o, h, l, c, f, u, p, m, x) {
  var y = new V(16);
  return y[0] = e, y[1] = t, y[2] = r, y[3] = i, y[4] = n, y[5] = a, y[6] = s, y[7] = o, y[8] = h, y[9] = l, y[10] = c, y[11] = f, y[12] = u, y[13] = p, y[14] = m, y[15] = x, y;
}
function sc(e, t, r, i, n, a, s, o, h, l, c, f, u, p, m, x, y) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e[4] = a, e[5] = s, e[6] = o, e[7] = h, e[8] = l, e[9] = c, e[10] = f, e[11] = u, e[12] = p, e[13] = m, e[14] = x, e[15] = y, e;
}
function ya(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function oc(e, t) {
  if (e === t) {
    var r = t[1], i = t[2], n = t[3], a = t[6], s = t[7], o = t[11];
    e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = r, e[6] = t[9], e[7] = t[13], e[8] = i, e[9] = a, e[11] = t[14], e[12] = n, e[13] = s, e[14] = o;
  } else
    e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = t[1], e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = t[2], e[9] = t[6], e[10] = t[10], e[11] = t[14], e[12] = t[3], e[13] = t[7], e[14] = t[11], e[15] = t[15];
  return e;
}
function hc(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = t[4], o = t[5], h = t[6], l = t[7], c = t[8], f = t[9], u = t[10], p = t[11], m = t[12], x = t[13], y = t[14], M = t[15], b = r * o - i * s, $ = r * h - n * s, L = r * l - a * s, R = i * h - n * o, P = i * l - a * o, k = n * l - a * h, X = c * x - f * m, W = c * y - u * m, Y = c * M - p * m, D = f * y - u * x, U = f * M - p * x, q = u * M - p * y, z = b * q - $ * U + L * D + R * Y - P * W + k * X;
  return z ? (z = 1 / z, e[0] = (o * q - h * U + l * D) * z, e[1] = (n * U - i * q - a * D) * z, e[2] = (x * k - y * P + M * R) * z, e[3] = (u * P - f * k - p * R) * z, e[4] = (h * Y - s * q - l * W) * z, e[5] = (r * q - n * Y + a * W) * z, e[6] = (y * L - m * k - M * $) * z, e[7] = (c * k - u * L + p * $) * z, e[8] = (s * U - o * Y + l * X) * z, e[9] = (i * Y - r * U - a * X) * z, e[10] = (m * P - x * L + M * b) * z, e[11] = (f * L - c * P - p * b) * z, e[12] = (o * W - s * D - h * X) * z, e[13] = (r * D - i * W + n * X) * z, e[14] = (x * $ - m * R - y * b) * z, e[15] = (c * R - f * $ + u * b) * z, e) : null;
}
function lc(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = t[4], o = t[5], h = t[6], l = t[7], c = t[8], f = t[9], u = t[10], p = t[11], m = t[12], x = t[13], y = t[14], M = t[15];
  return e[0] = o * (u * M - p * y) - f * (h * M - l * y) + x * (h * p - l * u), e[1] = -(i * (u * M - p * y) - f * (n * M - a * y) + x * (n * p - a * u)), e[2] = i * (h * M - l * y) - o * (n * M - a * y) + x * (n * l - a * h), e[3] = -(i * (h * p - l * u) - o * (n * p - a * u) + f * (n * l - a * h)), e[4] = -(s * (u * M - p * y) - c * (h * M - l * y) + m * (h * p - l * u)), e[5] = r * (u * M - p * y) - c * (n * M - a * y) + m * (n * p - a * u), e[6] = -(r * (h * M - l * y) - s * (n * M - a * y) + m * (n * l - a * h)), e[7] = r * (h * p - l * u) - s * (n * p - a * u) + c * (n * l - a * h), e[8] = s * (f * M - p * x) - c * (o * M - l * x) + m * (o * p - l * f), e[9] = -(r * (f * M - p * x) - c * (i * M - a * x) + m * (i * p - a * f)), e[10] = r * (o * M - l * x) - s * (i * M - a * x) + m * (i * l - a * o), e[11] = -(r * (o * p - l * f) - s * (i * p - a * f) + c * (i * l - a * o)), e[12] = -(s * (f * y - u * x) - c * (o * y - h * x) + m * (o * u - h * f)), e[13] = r * (f * y - u * x) - c * (i * y - n * x) + m * (i * u - n * f), e[14] = -(r * (o * y - h * x) - s * (i * y - n * x) + m * (i * h - n * o)), e[15] = r * (o * u - h * f) - s * (i * u - n * f) + c * (i * h - n * o), e;
}
function cc(e) {
  var t = e[0], r = e[1], i = e[2], n = e[3], a = e[4], s = e[5], o = e[6], h = e[7], l = e[8], c = e[9], f = e[10], u = e[11], p = e[12], m = e[13], x = e[14], y = e[15], M = t * s - r * a, b = t * o - i * a, $ = t * h - n * a, L = r * o - i * s, R = r * h - n * s, P = i * h - n * o, k = l * m - c * p, X = l * x - f * p, W = l * y - u * p, Y = c * x - f * m, D = c * y - u * m, U = f * y - u * x;
  return M * U - b * D + $ * Y + L * W - R * X + P * k;
}
function ga(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = t[8], u = t[9], p = t[10], m = t[11], x = t[12], y = t[13], M = t[14], b = t[15], $ = r[0], L = r[1], R = r[2], P = r[3];
  return e[0] = $ * i + L * o + R * f + P * x, e[1] = $ * n + L * h + R * u + P * y, e[2] = $ * a + L * l + R * p + P * M, e[3] = $ * s + L * c + R * m + P * b, $ = r[4], L = r[5], R = r[6], P = r[7], e[4] = $ * i + L * o + R * f + P * x, e[5] = $ * n + L * h + R * u + P * y, e[6] = $ * a + L * l + R * p + P * M, e[7] = $ * s + L * c + R * m + P * b, $ = r[8], L = r[9], R = r[10], P = r[11], e[8] = $ * i + L * o + R * f + P * x, e[9] = $ * n + L * h + R * u + P * y, e[10] = $ * a + L * l + R * p + P * M, e[11] = $ * s + L * c + R * m + P * b, $ = r[12], L = r[13], R = r[14], P = r[15], e[12] = $ * i + L * o + R * f + P * x, e[13] = $ * n + L * h + R * u + P * y, e[14] = $ * a + L * l + R * p + P * M, e[15] = $ * s + L * c + R * m + P * b, e;
}
function vc(e, t, r) {
  var i = r[0], n = r[1], a = r[2], s, o, h, l, c, f, u, p, m, x, y, M;
  return t === e ? (e[12] = t[0] * i + t[4] * n + t[8] * a + t[12], e[13] = t[1] * i + t[5] * n + t[9] * a + t[13], e[14] = t[2] * i + t[6] * n + t[10] * a + t[14], e[15] = t[3] * i + t[7] * n + t[11] * a + t[15]) : (s = t[0], o = t[1], h = t[2], l = t[3], c = t[4], f = t[5], u = t[6], p = t[7], m = t[8], x = t[9], y = t[10], M = t[11], e[0] = s, e[1] = o, e[2] = h, e[3] = l, e[4] = c, e[5] = f, e[6] = u, e[7] = p, e[8] = m, e[9] = x, e[10] = y, e[11] = M, e[12] = s * i + c * n + m * a + t[12], e[13] = o * i + f * n + x * a + t[13], e[14] = h * i + u * n + y * a + t[14], e[15] = l * i + p * n + M * a + t[15]), e;
}
function fc(e, t, r) {
  var i = r[0], n = r[1], a = r[2];
  return e[0] = t[0] * i, e[1] = t[1] * i, e[2] = t[2] * i, e[3] = t[3] * i, e[4] = t[4] * n, e[5] = t[5] * n, e[6] = t[6] * n, e[7] = t[7] * n, e[8] = t[8] * a, e[9] = t[9] * a, e[10] = t[10] * a, e[11] = t[11] * a, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e;
}
function uc(e, t, r, i) {
  var n = i[0], a = i[1], s = i[2], o = Math.hypot(n, a, s), h, l, c, f, u, p, m, x, y, M, b, $, L, R, P, k, X, W, Y, D, U, q, z, w;
  return o < A ? null : (o = 1 / o, n *= o, a *= o, s *= o, h = Math.sin(r), l = Math.cos(r), c = 1 - l, f = t[0], u = t[1], p = t[2], m = t[3], x = t[4], y = t[5], M = t[6], b = t[7], $ = t[8], L = t[9], R = t[10], P = t[11], k = n * n * c + l, X = a * n * c + s * h, W = s * n * c - a * h, Y = n * a * c - s * h, D = a * a * c + l, U = s * a * c + n * h, q = n * s * c + a * h, z = a * s * c - n * h, w = s * s * c + l, e[0] = f * k + x * X + $ * W, e[1] = u * k + y * X + L * W, e[2] = p * k + M * X + R * W, e[3] = m * k + b * X + P * W, e[4] = f * Y + x * D + $ * U, e[5] = u * Y + y * D + L * U, e[6] = p * Y + M * D + R * U, e[7] = m * Y + b * D + P * U, e[8] = f * q + x * z + $ * w, e[9] = u * q + y * z + L * w, e[10] = p * q + M * z + R * w, e[11] = m * q + b * z + P * w, t !== e && (e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e);
}
function dc(e, t, r) {
  var i = Math.sin(r), n = Math.cos(r), a = t[4], s = t[5], o = t[6], h = t[7], l = t[8], c = t[9], f = t[10], u = t[11];
  return t !== e && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[4] = a * n + l * i, e[5] = s * n + c * i, e[6] = o * n + f * i, e[7] = h * n + u * i, e[8] = l * n - a * i, e[9] = c * n - s * i, e[10] = f * n - o * i, e[11] = u * n - h * i, e;
}
function pc(e, t, r) {
  var i = Math.sin(r), n = Math.cos(r), a = t[0], s = t[1], o = t[2], h = t[3], l = t[8], c = t[9], f = t[10], u = t[11];
  return t !== e && (e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = a * n - l * i, e[1] = s * n - c * i, e[2] = o * n - f * i, e[3] = h * n - u * i, e[8] = a * i + l * n, e[9] = s * i + c * n, e[10] = o * i + f * n, e[11] = h * i + u * n, e;
}
function _c(e, t, r) {
  var i = Math.sin(r), n = Math.cos(r), a = t[0], s = t[1], o = t[2], h = t[3], l = t[4], c = t[5], f = t[6], u = t[7];
  return t !== e && (e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = a * n + l * i, e[1] = s * n + c * i, e[2] = o * n + f * i, e[3] = h * n + u * i, e[4] = l * n - a * i, e[5] = c * n - s * i, e[6] = f * n - o * i, e[7] = u * n - h * i, e;
}
function mc(e, t) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = t[0], e[13] = t[1], e[14] = t[2], e[15] = 1, e;
}
function yc(e, t) {
  return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = t[1], e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = t[2], e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function gc(e, t, r) {
  var i = r[0], n = r[1], a = r[2], s = Math.hypot(i, n, a), o, h, l;
  return s < A ? null : (s = 1 / s, i *= s, n *= s, a *= s, o = Math.sin(t), h = Math.cos(t), l = 1 - h, e[0] = i * i * l + h, e[1] = n * i * l + a * o, e[2] = a * i * l - n * o, e[3] = 0, e[4] = i * n * l - a * o, e[5] = n * n * l + h, e[6] = a * n * l + i * o, e[7] = 0, e[8] = i * a * l + n * o, e[9] = n * a * l - i * o, e[10] = a * a * l + h, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e);
}
function wc(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = i, e[6] = r, e[7] = 0, e[8] = 0, e[9] = -r, e[10] = i, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function xc(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = i, e[1] = 0, e[2] = -r, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = r, e[9] = 0, e[10] = i, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function Mc(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = i, e[1] = r, e[2] = 0, e[3] = 0, e[4] = -r, e[5] = i, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function wa(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = i + i, h = n + n, l = a + a, c = i * o, f = i * h, u = i * l, p = n * h, m = n * l, x = a * l, y = s * o, M = s * h, b = s * l;
  return e[0] = 1 - (p + x), e[1] = f + b, e[2] = u - M, e[3] = 0, e[4] = f - b, e[5] = 1 - (c + x), e[6] = m + y, e[7] = 0, e[8] = u + M, e[9] = m - y, e[10] = 1 - (c + p), e[11] = 0, e[12] = r[0], e[13] = r[1], e[14] = r[2], e[15] = 1, e;
}
function Ec(e, t) {
  var r = new V(3), i = -t[0], n = -t[1], a = -t[2], s = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = i * i + n * n + a * a + s * s;
  return f > 0 ? (r[0] = (o * s + c * i + h * a - l * n) * 2 / f, r[1] = (h * s + c * n + l * i - o * a) * 2 / f, r[2] = (l * s + c * a + o * n - h * i) * 2 / f) : (r[0] = (o * s + c * i + h * a - l * n) * 2, r[1] = (h * s + c * n + l * i - o * a) * 2, r[2] = (l * s + c * a + o * n - h * i) * 2), wa(e, t, r), e;
}
function xa(e, t) {
  return e[0] = t[12], e[1] = t[13], e[2] = t[14], e;
}
function Ma(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[4], s = t[5], o = t[6], h = t[8], l = t[9], c = t[10];
  return e[0] = Math.hypot(r, i, n), e[1] = Math.hypot(a, s, o), e[2] = Math.hypot(h, l, c), e;
}
function Ea(e, t) {
  var r = new V(3);
  Ma(r, t);
  var i = 1 / r[0], n = 1 / r[1], a = 1 / r[2], s = t[0] * i, o = t[1] * n, h = t[2] * a, l = t[4] * i, c = t[5] * n, f = t[6] * a, u = t[8] * i, p = t[9] * n, m = t[10] * a, x = s + c + m, y = 0;
  return x > 0 ? (y = Math.sqrt(x + 1) * 2, e[3] = 0.25 * y, e[0] = (f - p) / y, e[1] = (u - h) / y, e[2] = (o - l) / y) : s > c && s > m ? (y = Math.sqrt(1 + s - c - m) * 2, e[3] = (f - p) / y, e[0] = 0.25 * y, e[1] = (o + l) / y, e[2] = (u + h) / y) : c > m ? (y = Math.sqrt(1 + c - s - m) * 2, e[3] = (u - h) / y, e[0] = (o + l) / y, e[1] = 0.25 * y, e[2] = (f + p) / y) : (y = Math.sqrt(1 + m - s - c) * 2, e[3] = (o - l) / y, e[0] = (u + h) / y, e[1] = (f + p) / y, e[2] = 0.25 * y), e;
}
function Tc(e, t, r, i) {
  var n = t[0], a = t[1], s = t[2], o = t[3], h = n + n, l = a + a, c = s + s, f = n * h, u = n * l, p = n * c, m = a * l, x = a * c, y = s * c, M = o * h, b = o * l, $ = o * c, L = i[0], R = i[1], P = i[2];
  return e[0] = (1 - (m + y)) * L, e[1] = (u + $) * L, e[2] = (p - b) * L, e[3] = 0, e[4] = (u - $) * R, e[5] = (1 - (f + y)) * R, e[6] = (x + M) * R, e[7] = 0, e[8] = (p + b) * P, e[9] = (x - M) * P, e[10] = (1 - (f + m)) * P, e[11] = 0, e[12] = r[0], e[13] = r[1], e[14] = r[2], e[15] = 1, e;
}
function bc(e, t, r, i, n) {
  var a = t[0], s = t[1], o = t[2], h = t[3], l = a + a, c = s + s, f = o + o, u = a * l, p = a * c, m = a * f, x = s * c, y = s * f, M = o * f, b = h * l, $ = h * c, L = h * f, R = i[0], P = i[1], k = i[2], X = n[0], W = n[1], Y = n[2], D = (1 - (x + M)) * R, U = (p + L) * R, q = (m - $) * R, z = (p - L) * P, w = (1 - (u + M)) * P, $e = (y + b) * P, re = (m + $) * k, Ne = (y - b) * k, Ce = (1 - (u + x)) * k;
  return e[0] = D, e[1] = U, e[2] = q, e[3] = 0, e[4] = z, e[5] = w, e[6] = $e, e[7] = 0, e[8] = re, e[9] = Ne, e[10] = Ce, e[11] = 0, e[12] = r[0] + X - (D * X + z * W + re * Y), e[13] = r[1] + W - (U * X + w * W + Ne * Y), e[14] = r[2] + Y - (q * X + $e * W + Ce * Y), e[15] = 1, e;
}
function Cc(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = r + r, o = i + i, h = n + n, l = r * s, c = i * s, f = i * o, u = n * s, p = n * o, m = n * h, x = a * s, y = a * o, M = a * h;
  return e[0] = 1 - f - m, e[1] = c + M, e[2] = u - y, e[3] = 0, e[4] = c - M, e[5] = 1 - l - m, e[6] = p + x, e[7] = 0, e[8] = u + y, e[9] = p - x, e[10] = 1 - l - f, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function Sc(e, t, r, i, n, a, s) {
  var o = 1 / (r - t), h = 1 / (n - i), l = 1 / (a - s);
  return e[0] = a * 2 * o, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = a * 2 * h, e[6] = 0, e[7] = 0, e[8] = (r + t) * o, e[9] = (n + i) * h, e[10] = (s + a) * l, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = s * a * 2 * l, e[15] = 0, e;
}
function Pc(e, t, r, i, n) {
  var a = 1 / Math.tan(t / 2), s;
  return e[0] = a / r, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = a, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = -1, e[12] = 0, e[13] = 0, e[15] = 0, n != null && n !== 1 / 0 ? (s = 1 / (i - n), e[10] = (n + i) * s, e[14] = 2 * n * i * s) : (e[10] = -1, e[14] = -2 * i), e;
}
function $c(e, t, r, i) {
  var n = Math.tan(t.upDegrees * Math.PI / 180), a = Math.tan(t.downDegrees * Math.PI / 180), s = Math.tan(t.leftDegrees * Math.PI / 180), o = Math.tan(t.rightDegrees * Math.PI / 180), h = 2 / (s + o), l = 2 / (n + a);
  return e[0] = h, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = l, e[6] = 0, e[7] = 0, e[8] = -((s - o) * h * 0.5), e[9] = (n - a) * l * 0.5, e[10] = i / (r - i), e[11] = -1, e[12] = 0, e[13] = 0, e[14] = i * r / (r - i), e[15] = 0, e;
}
function Lc(e, t, r, i, n, a, s) {
  var o = 1 / (t - r), h = 1 / (i - n), l = 1 / (a - s);
  return e[0] = -2 * o, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = -2 * h, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 2 * l, e[11] = 0, e[12] = (t + r) * o, e[13] = (n + i) * h, e[14] = (s + a) * l, e[15] = 1, e;
}
function Rc(e, t, r, i) {
  var n, a, s, o, h, l, c, f, u, p, m = t[0], x = t[1], y = t[2], M = i[0], b = i[1], $ = i[2], L = r[0], R = r[1], P = r[2];
  return Math.abs(m - L) < A && Math.abs(x - R) < A && Math.abs(y - P) < A ? ya(e) : (c = m - L, f = x - R, u = y - P, p = 1 / Math.hypot(c, f, u), c *= p, f *= p, u *= p, n = b * u - $ * f, a = $ * c - M * u, s = M * f - b * c, p = Math.hypot(n, a, s), p ? (p = 1 / p, n *= p, a *= p, s *= p) : (n = 0, a = 0, s = 0), o = f * s - u * a, h = u * n - c * s, l = c * a - f * n, p = Math.hypot(o, h, l), p ? (p = 1 / p, o *= p, h *= p, l *= p) : (o = 0, h = 0, l = 0), e[0] = n, e[1] = o, e[2] = c, e[3] = 0, e[4] = a, e[5] = h, e[6] = f, e[7] = 0, e[8] = s, e[9] = l, e[10] = u, e[11] = 0, e[12] = -(n * m + a * x + s * y), e[13] = -(o * m + h * x + l * y), e[14] = -(c * m + f * x + u * y), e[15] = 1, e);
}
function Ac(e, t, r, i) {
  var n = t[0], a = t[1], s = t[2], o = i[0], h = i[1], l = i[2], c = n - r[0], f = a - r[1], u = s - r[2], p = c * c + f * f + u * u;
  p > 0 && (p = 1 / Math.sqrt(p), c *= p, f *= p, u *= p);
  var m = h * u - l * f, x = l * c - o * u, y = o * f - h * c;
  return p = m * m + x * x + y * y, p > 0 && (p = 1 / Math.sqrt(p), m *= p, x *= p, y *= p), e[0] = m, e[1] = x, e[2] = y, e[3] = 0, e[4] = f * y - u * x, e[5] = u * m - c * y, e[6] = c * x - f * m, e[7] = 0, e[8] = c, e[9] = f, e[10] = u, e[11] = 0, e[12] = n, e[13] = a, e[14] = s, e[15] = 1, e;
}
function zc(e) {
  return "mat4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ", " + e[9] + ", " + e[10] + ", " + e[11] + ", " + e[12] + ", " + e[13] + ", " + e[14] + ", " + e[15] + ")";
}
function Oc(e) {
  return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]);
}
function Ic(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e[4] = t[4] + r[4], e[5] = t[5] + r[5], e[6] = t[6] + r[6], e[7] = t[7] + r[7], e[8] = t[8] + r[8], e[9] = t[9] + r[9], e[10] = t[10] + r[10], e[11] = t[11] + r[11], e[12] = t[12] + r[12], e[13] = t[13] + r[13], e[14] = t[14] + r[14], e[15] = t[15] + r[15], e;
}
function Ta(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e[4] = t[4] - r[4], e[5] = t[5] - r[5], e[6] = t[6] - r[6], e[7] = t[7] - r[7], e[8] = t[8] - r[8], e[9] = t[9] - r[9], e[10] = t[10] - r[10], e[11] = t[11] - r[11], e[12] = t[12] - r[12], e[13] = t[13] - r[13], e[14] = t[14] - r[14], e[15] = t[15] - r[15], e;
}
function Dc(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e[8] = t[8] * r, e[9] = t[9] * r, e[10] = t[10] * r, e[11] = t[11] * r, e[12] = t[12] * r, e[13] = t[13] * r, e[14] = t[14] * r, e[15] = t[15] * r, e;
}
function Hc(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e[4] = t[4] + r[4] * i, e[5] = t[5] + r[5] * i, e[6] = t[6] + r[6] * i, e[7] = t[7] + r[7] * i, e[8] = t[8] + r[8] * i, e[9] = t[9] + r[9] * i, e[10] = t[10] + r[10] * i, e[11] = t[11] + r[11] * i, e[12] = t[12] + r[12] * i, e[13] = t[13] + r[13] * i, e[14] = t[14] + r[14] * i, e[15] = t[15] + r[15] * i, e;
}
function Fc(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8] && e[9] === t[9] && e[10] === t[10] && e[11] === t[11] && e[12] === t[12] && e[13] === t[13] && e[14] === t[14] && e[15] === t[15];
}
function Nc(e, t) {
  var r = e[0], i = e[1], n = e[2], a = e[3], s = e[4], o = e[5], h = e[6], l = e[7], c = e[8], f = e[9], u = e[10], p = e[11], m = e[12], x = e[13], y = e[14], M = e[15], b = t[0], $ = t[1], L = t[2], R = t[3], P = t[4], k = t[5], X = t[6], W = t[7], Y = t[8], D = t[9], U = t[10], q = t[11], z = t[12], w = t[13], $e = t[14], re = t[15];
  return Math.abs(r - b) <= A * Math.max(1, Math.abs(r), Math.abs(b)) && Math.abs(i - $) <= A * Math.max(1, Math.abs(i), Math.abs($)) && Math.abs(n - L) <= A * Math.max(1, Math.abs(n), Math.abs(L)) && Math.abs(a - R) <= A * Math.max(1, Math.abs(a), Math.abs(R)) && Math.abs(s - P) <= A * Math.max(1, Math.abs(s), Math.abs(P)) && Math.abs(o - k) <= A * Math.max(1, Math.abs(o), Math.abs(k)) && Math.abs(h - X) <= A * Math.max(1, Math.abs(h), Math.abs(X)) && Math.abs(l - W) <= A * Math.max(1, Math.abs(l), Math.abs(W)) && Math.abs(c - Y) <= A * Math.max(1, Math.abs(c), Math.abs(Y)) && Math.abs(f - D) <= A * Math.max(1, Math.abs(f), Math.abs(D)) && Math.abs(u - U) <= A * Math.max(1, Math.abs(u), Math.abs(U)) && Math.abs(p - q) <= A * Math.max(1, Math.abs(p), Math.abs(q)) && Math.abs(m - z) <= A * Math.max(1, Math.abs(m), Math.abs(z)) && Math.abs(x - w) <= A * Math.max(1, Math.abs(x), Math.abs(w)) && Math.abs(y - $e) <= A * Math.max(1, Math.abs(y), Math.abs($e)) && Math.abs(M - re) <= A * Math.max(1, Math.abs(M), Math.abs(re));
}
var Vc = ga, kc = Ta;
const Wc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Ic,
  adjoint: lc,
  clone: ic,
  copy: nc,
  create: rc,
  determinant: cc,
  equals: Nc,
  exactEquals: Fc,
  frob: Oc,
  fromQuat: Cc,
  fromQuat2: Ec,
  fromRotation: gc,
  fromRotationTranslation: wa,
  fromRotationTranslationScale: Tc,
  fromRotationTranslationScaleOrigin: bc,
  fromScaling: yc,
  fromTranslation: mc,
  fromValues: ac,
  fromXRotation: wc,
  fromYRotation: xc,
  fromZRotation: Mc,
  frustum: Sc,
  getRotation: Ea,
  getScaling: Ma,
  getTranslation: xa,
  identity: ya,
  invert: hc,
  lookAt: Rc,
  mul: Vc,
  multiply: ga,
  multiplyScalar: Dc,
  multiplyScalarAndAdd: Hc,
  ortho: Lc,
  perspective: Pc,
  perspectiveFromFieldOfView: $c,
  rotate: uc,
  rotateX: dc,
  rotateY: pc,
  rotateZ: _c,
  scale: fc,
  set: sc,
  str: zc,
  sub: kc,
  subtract: Ta,
  targetTo: Ac,
  translate: vc,
  transpose: oc
}, Symbol.toStringTag, { value: "Module" }));
function en() {
  var e = new V(3);
  return V != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e;
}
function Yc(e) {
  var t = new V(3);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t;
}
function ba(e) {
  var t = e[0], r = e[1], i = e[2];
  return Math.hypot(t, r, i);
}
function ki(e, t, r) {
  var i = new V(3);
  return i[0] = e, i[1] = t, i[2] = r, i;
}
function qc(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e;
}
function jc(e, t, r, i) {
  return e[0] = t, e[1] = r, e[2] = i, e;
}
function Xc(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e;
}
function Ca(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e;
}
function Sa(e, t, r) {
  return e[0] = t[0] * r[0], e[1] = t[1] * r[1], e[2] = t[2] * r[2], e;
}
function Pa(e, t, r) {
  return e[0] = t[0] / r[0], e[1] = t[1] / r[1], e[2] = t[2] / r[2], e;
}
function Uc(e, t) {
  return e[0] = Math.ceil(t[0]), e[1] = Math.ceil(t[1]), e[2] = Math.ceil(t[2]), e;
}
function Bc(e, t) {
  return e[0] = Math.floor(t[0]), e[1] = Math.floor(t[1]), e[2] = Math.floor(t[2]), e;
}
function Gc(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e[2] = Math.min(t[2], r[2]), e;
}
function Zc(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e[2] = Math.max(t[2], r[2]), e;
}
function Kc(e, t) {
  return e[0] = Math.round(t[0]), e[1] = Math.round(t[1]), e[2] = Math.round(t[2]), e;
}
function Qc(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e;
}
function Jc(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e;
}
function $a(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1], n = t[2] - e[2];
  return Math.hypot(r, i, n);
}
function La(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1], n = t[2] - e[2];
  return r * r + i * i + n * n;
}
function Ra(e) {
  var t = e[0], r = e[1], i = e[2];
  return t * t + r * r + i * i;
}
function ev(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e;
}
function tv(e, t) {
  return e[0] = 1 / t[0], e[1] = 1 / t[1], e[2] = 1 / t[2], e;
}
function Aa(e, t) {
  var r = t[0], i = t[1], n = t[2], a = r * r + i * i + n * n;
  return a > 0 && (a = 1 / Math.sqrt(a)), e[0] = t[0] * a, e[1] = t[1] * a, e[2] = t[2] * a, e;
}
function tn(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
}
function Yr(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = r[0], o = r[1], h = r[2];
  return e[0] = n * h - a * o, e[1] = a * s - i * h, e[2] = i * o - n * s, e;
}
function rv(e, t, r, i) {
  var n = t[0], a = t[1], s = t[2];
  return e[0] = n + i * (r[0] - n), e[1] = a + i * (r[1] - a), e[2] = s + i * (r[2] - s), e;
}
function iv(e, t, r, i, n, a) {
  var s = a * a, o = s * (2 * a - 3) + 1, h = s * (a - 2) + a, l = s * (a - 1), c = s * (3 - 2 * a);
  return e[0] = t[0] * o + r[0] * h + i[0] * l + n[0] * c, e[1] = t[1] * o + r[1] * h + i[1] * l + n[1] * c, e[2] = t[2] * o + r[2] * h + i[2] * l + n[2] * c, e;
}
function nv(e, t, r, i, n, a) {
  var s = 1 - a, o = s * s, h = a * a, l = o * s, c = 3 * a * o, f = 3 * h * s, u = h * a;
  return e[0] = t[0] * l + r[0] * c + i[0] * f + n[0] * u, e[1] = t[1] * l + r[1] * c + i[1] * f + n[1] * u, e[2] = t[2] * l + r[2] * c + i[2] * f + n[2] * u, e;
}
function av(e, t) {
  t = t || 1;
  var r = He() * 2 * Math.PI, i = He() * 2 - 1, n = Math.sqrt(1 - i * i) * t;
  return e[0] = Math.cos(r) * n, e[1] = Math.sin(r) * n, e[2] = i * t, e;
}
function sv(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = r[3] * i + r[7] * n + r[11] * a + r[15];
  return s = s || 1, e[0] = (r[0] * i + r[4] * n + r[8] * a + r[12]) / s, e[1] = (r[1] * i + r[5] * n + r[9] * a + r[13]) / s, e[2] = (r[2] * i + r[6] * n + r[10] * a + r[14]) / s, e;
}
function ov(e, t, r) {
  var i = t[0], n = t[1], a = t[2];
  return e[0] = i * r[0] + n * r[3] + a * r[6], e[1] = i * r[1] + n * r[4] + a * r[7], e[2] = i * r[2] + n * r[5] + a * r[8], e;
}
function hv(e, t, r) {
  var i = r[0], n = r[1], a = r[2], s = r[3], o = t[0], h = t[1], l = t[2], c = n * l - a * h, f = a * o - i * l, u = i * h - n * o, p = n * u - a * f, m = a * c - i * u, x = i * f - n * c, y = s * 2;
  return c *= y, f *= y, u *= y, p *= 2, m *= 2, x *= 2, e[0] = o + c + p, e[1] = h + f + m, e[2] = l + u + x, e;
}
function lv(e, t, r, i) {
  var n = [], a = [];
  return n[0] = t[0] - r[0], n[1] = t[1] - r[1], n[2] = t[2] - r[2], a[0] = n[0], a[1] = n[1] * Math.cos(i) - n[2] * Math.sin(i), a[2] = n[1] * Math.sin(i) + n[2] * Math.cos(i), e[0] = a[0] + r[0], e[1] = a[1] + r[1], e[2] = a[2] + r[2], e;
}
function cv(e, t, r, i) {
  var n = [], a = [];
  return n[0] = t[0] - r[0], n[1] = t[1] - r[1], n[2] = t[2] - r[2], a[0] = n[2] * Math.sin(i) + n[0] * Math.cos(i), a[1] = n[1], a[2] = n[2] * Math.cos(i) - n[0] * Math.sin(i), e[0] = a[0] + r[0], e[1] = a[1] + r[1], e[2] = a[2] + r[2], e;
}
function vv(e, t, r, i) {
  var n = [], a = [];
  return n[0] = t[0] - r[0], n[1] = t[1] - r[1], n[2] = t[2] - r[2], a[0] = n[0] * Math.cos(i) - n[1] * Math.sin(i), a[1] = n[0] * Math.sin(i) + n[1] * Math.cos(i), a[2] = n[2], e[0] = a[0] + r[0], e[1] = a[1] + r[1], e[2] = a[2] + r[2], e;
}
function fv(e, t) {
  var r = e[0], i = e[1], n = e[2], a = t[0], s = t[1], o = t[2], h = Math.sqrt(r * r + i * i + n * n), l = Math.sqrt(a * a + s * s + o * o), c = h * l, f = c && tn(e, t) / c;
  return Math.acos(Math.min(Math.max(f, -1), 1));
}
function uv(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e;
}
function dv(e) {
  return "vec3(" + e[0] + ", " + e[1] + ", " + e[2] + ")";
}
function pv(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2];
}
function _v(e, t) {
  var r = e[0], i = e[1], n = e[2], a = t[0], s = t[1], o = t[2];
  return Math.abs(r - a) <= A * Math.max(1, Math.abs(r), Math.abs(a)) && Math.abs(i - s) <= A * Math.max(1, Math.abs(i), Math.abs(s)) && Math.abs(n - o) <= A * Math.max(1, Math.abs(n), Math.abs(o));
}
var mv = Ca, yv = Sa, gv = Pa, wv = $a, xv = La, za = ba, Mv = Ra, Ev = function() {
  var e = en();
  return function(t, r, i, n, a, s) {
    var o, h;
    for (r || (r = 3), i || (i = 0), n ? h = Math.min(n * r + i, t.length) : h = t.length, o = i; o < h; o += r)
      e[0] = t[o], e[1] = t[o + 1], e[2] = t[o + 2], a(e, e, s), t[o] = e[0], t[o + 1] = e[1], t[o + 2] = e[2];
    return t;
  };
}();
const Tv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Xc,
  angle: fv,
  bezier: nv,
  ceil: Uc,
  clone: Yc,
  copy: qc,
  create: en,
  cross: Yr,
  dist: wv,
  distance: $a,
  div: gv,
  divide: Pa,
  dot: tn,
  equals: _v,
  exactEquals: pv,
  floor: Bc,
  forEach: Ev,
  fromValues: ki,
  hermite: iv,
  inverse: tv,
  len: za,
  length: ba,
  lerp: rv,
  max: Zc,
  min: Gc,
  mul: yv,
  multiply: Sa,
  negate: ev,
  normalize: Aa,
  random: av,
  rotateX: lv,
  rotateY: cv,
  rotateZ: vv,
  round: Kc,
  scale: Qc,
  scaleAndAdd: Jc,
  set: jc,
  sqrDist: xv,
  sqrLen: Mv,
  squaredDistance: La,
  squaredLength: Ra,
  str: dv,
  sub: mv,
  subtract: Ca,
  transformMat3: ov,
  transformMat4: sv,
  transformQuat: hv,
  zero: uv
}, Symbol.toStringTag, { value: "Module" }));
function Oa() {
  var e = new V(4);
  return V != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0), e;
}
function Ia(e) {
  var t = new V(4);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t;
}
function Da(e, t, r, i) {
  var n = new V(4);
  return n[0] = e, n[1] = t, n[2] = r, n[3] = i, n;
}
function Ha(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e;
}
function Fa(e, t, r, i, n) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e;
}
function Na(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e;
}
function Va(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e;
}
function ka(e, t, r) {
  return e[0] = t[0] * r[0], e[1] = t[1] * r[1], e[2] = t[2] * r[2], e[3] = t[3] * r[3], e;
}
function Wa(e, t, r) {
  return e[0] = t[0] / r[0], e[1] = t[1] / r[1], e[2] = t[2] / r[2], e[3] = t[3] / r[3], e;
}
function bv(e, t) {
  return e[0] = Math.ceil(t[0]), e[1] = Math.ceil(t[1]), e[2] = Math.ceil(t[2]), e[3] = Math.ceil(t[3]), e;
}
function Cv(e, t) {
  return e[0] = Math.floor(t[0]), e[1] = Math.floor(t[1]), e[2] = Math.floor(t[2]), e[3] = Math.floor(t[3]), e;
}
function Sv(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e[2] = Math.min(t[2], r[2]), e[3] = Math.min(t[3], r[3]), e;
}
function Pv(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e[2] = Math.max(t[2], r[2]), e[3] = Math.max(t[3], r[3]), e;
}
function $v(e, t) {
  return e[0] = Math.round(t[0]), e[1] = Math.round(t[1]), e[2] = Math.round(t[2]), e[3] = Math.round(t[3]), e;
}
function Ya(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e;
}
function Lv(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e;
}
function qa(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1], n = t[2] - e[2], a = t[3] - e[3];
  return Math.hypot(r, i, n, a);
}
function ja(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1], n = t[2] - e[2], a = t[3] - e[3];
  return r * r + i * i + n * n + a * a;
}
function rn(e) {
  var t = e[0], r = e[1], i = e[2], n = e[3];
  return Math.hypot(t, r, i, n);
}
function nn(e) {
  var t = e[0], r = e[1], i = e[2], n = e[3];
  return t * t + r * r + i * i + n * n;
}
function Rv(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = -t[3], e;
}
function Av(e, t) {
  return e[0] = 1 / t[0], e[1] = 1 / t[1], e[2] = 1 / t[2], e[3] = 1 / t[3], e;
}
function Xa(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = r * r + i * i + n * n + a * a;
  return s > 0 && (s = 1 / Math.sqrt(s)), e[0] = r * s, e[1] = i * s, e[2] = n * s, e[3] = a * s, e;
}
function Ua(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3];
}
function zv(e, t, r, i) {
  var n = r[0] * i[1] - r[1] * i[0], a = r[0] * i[2] - r[2] * i[0], s = r[0] * i[3] - r[3] * i[0], o = r[1] * i[2] - r[2] * i[1], h = r[1] * i[3] - r[3] * i[1], l = r[2] * i[3] - r[3] * i[2], c = t[0], f = t[1], u = t[2], p = t[3];
  return e[0] = f * l - u * h + p * o, e[1] = -(c * l) + u * s - p * a, e[2] = c * h - f * s + p * n, e[3] = -(c * o) + f * a - u * n, e;
}
function Ba(e, t, r, i) {
  var n = t[0], a = t[1], s = t[2], o = t[3];
  return e[0] = n + i * (r[0] - n), e[1] = a + i * (r[1] - a), e[2] = s + i * (r[2] - s), e[3] = o + i * (r[3] - o), e;
}
function Ov(e, t) {
  t = t || 1;
  var r, i, n, a, s, o;
  do
    r = He() * 2 - 1, i = He() * 2 - 1, s = r * r + i * i;
  while (s >= 1);
  do
    n = He() * 2 - 1, a = He() * 2 - 1, o = n * n + a * a;
  while (o >= 1);
  var h = Math.sqrt((1 - s) / o);
  return e[0] = t * r, e[1] = t * i, e[2] = t * n * h, e[3] = t * a * h, e;
}
function Iv(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3];
  return e[0] = r[0] * i + r[4] * n + r[8] * a + r[12] * s, e[1] = r[1] * i + r[5] * n + r[9] * a + r[13] * s, e[2] = r[2] * i + r[6] * n + r[10] * a + r[14] * s, e[3] = r[3] * i + r[7] * n + r[11] * a + r[15] * s, e;
}
function Dv(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = r[0], o = r[1], h = r[2], l = r[3], c = l * i + o * a - h * n, f = l * n + h * i - s * a, u = l * a + s * n - o * i, p = -s * i - o * n - h * a;
  return e[0] = c * l + p * -s + f * -h - u * -o, e[1] = f * l + p * -o + u * -s - c * -h, e[2] = u * l + p * -h + c * -o - f * -s, e[3] = t[3], e;
}
function Hv(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0, e;
}
function Fv(e) {
  return "vec4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
}
function Ga(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3];
}
function Za(e, t) {
  var r = e[0], i = e[1], n = e[2], a = e[3], s = t[0], o = t[1], h = t[2], l = t[3];
  return Math.abs(r - s) <= A * Math.max(1, Math.abs(r), Math.abs(s)) && Math.abs(i - o) <= A * Math.max(1, Math.abs(i), Math.abs(o)) && Math.abs(n - h) <= A * Math.max(1, Math.abs(n), Math.abs(h)) && Math.abs(a - l) <= A * Math.max(1, Math.abs(a), Math.abs(l));
}
var Nv = Va, Vv = ka, kv = Wa, Wv = qa, Yv = ja, qv = rn, jv = nn, Xv = function() {
  var e = Oa();
  return function(t, r, i, n, a, s) {
    var o, h;
    for (r || (r = 4), i || (i = 0), n ? h = Math.min(n * r + i, t.length) : h = t.length, o = i; o < h; o += r)
      e[0] = t[o], e[1] = t[o + 1], e[2] = t[o + 2], e[3] = t[o + 3], a(e, e, s), t[o] = e[0], t[o + 1] = e[1], t[o + 2] = e[2], t[o + 3] = e[3];
    return t;
  };
}();
const Uv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Na,
  ceil: bv,
  clone: Ia,
  copy: Ha,
  create: Oa,
  cross: zv,
  dist: Wv,
  distance: qa,
  div: kv,
  divide: Wa,
  dot: Ua,
  equals: Za,
  exactEquals: Ga,
  floor: Cv,
  forEach: Xv,
  fromValues: Da,
  inverse: Av,
  len: qv,
  length: rn,
  lerp: Ba,
  max: Pv,
  min: Sv,
  mul: Vv,
  multiply: ka,
  negate: Rv,
  normalize: Xa,
  random: Ov,
  round: $v,
  scale: Ya,
  scaleAndAdd: Lv,
  set: Fa,
  sqrDist: Yv,
  sqrLen: jv,
  squaredDistance: ja,
  squaredLength: nn,
  str: Fv,
  sub: Nv,
  subtract: Va,
  transformMat4: Iv,
  transformQuat: Dv,
  zero: Hv
}, Symbol.toStringTag, { value: "Module" }));
function jr() {
  var e = new V(4);
  return V != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e[3] = 1, e;
}
function Bv(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e;
}
function Ka(e, t, r) {
  r = r * 0.5;
  var i = Math.sin(r);
  return e[0] = i * t[0], e[1] = i * t[1], e[2] = i * t[2], e[3] = Math.cos(r), e;
}
function Gv(e, t) {
  var r = Math.acos(t[3]) * 2, i = Math.sin(r / 2);
  return i > A ? (e[0] = t[0] / i, e[1] = t[1] / i, e[2] = t[2] / i) : (e[0] = 1, e[1] = 0, e[2] = 0), r;
}
function Zv(e, t) {
  var r = sn(e, t);
  return Math.acos(2 * r * r - 1);
}
function Qa(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = r[0], h = r[1], l = r[2], c = r[3];
  return e[0] = i * c + s * o + n * l - a * h, e[1] = n * c + s * h + a * o - i * l, e[2] = a * c + s * l + i * h - n * o, e[3] = s * c - i * o - n * h - a * l, e;
}
function Ja(e, t, r) {
  r *= 0.5;
  var i = t[0], n = t[1], a = t[2], s = t[3], o = Math.sin(r), h = Math.cos(r);
  return e[0] = i * h + s * o, e[1] = n * h + a * o, e[2] = a * h - n * o, e[3] = s * h - i * o, e;
}
function es(e, t, r) {
  r *= 0.5;
  var i = t[0], n = t[1], a = t[2], s = t[3], o = Math.sin(r), h = Math.cos(r);
  return e[0] = i * h - a * o, e[1] = n * h + s * o, e[2] = a * h + i * o, e[3] = s * h - n * o, e;
}
function ts(e, t, r) {
  r *= 0.5;
  var i = t[0], n = t[1], a = t[2], s = t[3], o = Math.sin(r), h = Math.cos(r);
  return e[0] = i * h + n * o, e[1] = n * h - i * o, e[2] = a * h + s * o, e[3] = s * h - a * o, e;
}
function Kv(e, t) {
  var r = t[0], i = t[1], n = t[2];
  return e[0] = r, e[1] = i, e[2] = n, e[3] = Math.sqrt(Math.abs(1 - r * r - i * i - n * n)), e;
}
function rs(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = Math.sqrt(r * r + i * i + n * n), o = Math.exp(a), h = s > 0 ? o * Math.sin(s) / s : 0;
  return e[0] = r * h, e[1] = i * h, e[2] = n * h, e[3] = o * Math.cos(s), e;
}
function is(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = Math.sqrt(r * r + i * i + n * n), o = s > 0 ? Math.atan2(s, a) / s : 0;
  return e[0] = r * o, e[1] = i * o, e[2] = n * o, e[3] = 0.5 * Math.log(r * r + i * i + n * n + a * a), e;
}
function Qv(e, t, r) {
  return is(e, t), as(e, e, r), rs(e, e), e;
}
function qr(e, t, r, i) {
  var n = t[0], a = t[1], s = t[2], o = t[3], h = r[0], l = r[1], c = r[2], f = r[3], u, p, m, x, y;
  return p = n * h + a * l + s * c + o * f, p < 0 && (p = -p, h = -h, l = -l, c = -c, f = -f), 1 - p > A ? (u = Math.acos(p), m = Math.sin(u), x = Math.sin((1 - i) * u) / m, y = Math.sin(i * u) / m) : (x = 1 - i, y = i), e[0] = x * n + y * h, e[1] = x * a + y * l, e[2] = x * s + y * c, e[3] = x * o + y * f, e;
}
function Jv(e) {
  var t = He(), r = He(), i = He(), n = Math.sqrt(1 - t), a = Math.sqrt(t);
  return e[0] = n * Math.sin(2 * Math.PI * r), e[1] = n * Math.cos(2 * Math.PI * r), e[2] = a * Math.sin(2 * Math.PI * i), e[3] = a * Math.cos(2 * Math.PI * i), e;
}
function ef(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = r * r + i * i + n * n + a * a, o = s ? 1 / s : 0;
  return e[0] = -r * o, e[1] = -i * o, e[2] = -n * o, e[3] = a * o, e;
}
function tf(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e;
}
function ns(e, t) {
  var r = t[0] + t[4] + t[8], i;
  if (r > 0)
    i = Math.sqrt(r + 1), e[3] = 0.5 * i, i = 0.5 / i, e[0] = (t[5] - t[7]) * i, e[1] = (t[6] - t[2]) * i, e[2] = (t[1] - t[3]) * i;
  else {
    var n = 0;
    t[4] > t[0] && (n = 1), t[8] > t[n * 3 + n] && (n = 2);
    var a = (n + 1) % 3, s = (n + 2) % 3;
    i = Math.sqrt(t[n * 3 + n] - t[a * 3 + a] - t[s * 3 + s] + 1), e[n] = 0.5 * i, i = 0.5 / i, e[3] = (t[a * 3 + s] - t[s * 3 + a]) * i, e[a] = (t[a * 3 + n] + t[n * 3 + a]) * i, e[s] = (t[s * 3 + n] + t[n * 3 + s]) * i;
  }
  return e;
}
function rf(e, t, r, i) {
  var n = 0.5 * Math.PI / 180;
  t *= n, r *= n, i *= n;
  var a = Math.sin(t), s = Math.cos(t), o = Math.sin(r), h = Math.cos(r), l = Math.sin(i), c = Math.cos(i);
  return e[0] = a * h * c - s * o * l, e[1] = s * o * c + a * h * l, e[2] = s * h * l - a * o * c, e[3] = s * h * c + a * o * l, e;
}
function nf(e) {
  return "quat(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
}
var af = Ia, sf = Da, an = Ha, of = Fa, hf = Na, lf = Qa, as = Ya, sn = Ua, cf = Ba, on = rn, vf = on, hn = nn, ff = hn, ln = Xa, uf = Ga, df = Za, pf = function() {
  var e = en(), t = ki(1, 0, 0), r = ki(0, 1, 0);
  return function(i, n, a) {
    var s = tn(n, a);
    return s < -0.999999 ? (Yr(e, t, n), za(e) < 1e-6 && Yr(e, r, n), Aa(e, e), Ka(i, e, Math.PI), i) : s > 0.999999 ? (i[0] = 0, i[1] = 0, i[2] = 0, i[3] = 1, i) : (Yr(e, n, a), i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = 1 + s, ln(i, i));
  };
}(), _f = function() {
  var e = jr(), t = jr();
  return function(r, i, n, a, s, o) {
    return qr(e, i, s, o), qr(t, n, a, o), qr(r, e, t, 2 * o * (1 - o)), r;
  };
}(), mf = function() {
  var e = pa();
  return function(t, r, i, n) {
    return e[0] = i[0], e[3] = i[1], e[6] = i[2], e[1] = n[0], e[4] = n[1], e[7] = n[2], e[2] = -r[0], e[5] = -r[1], e[8] = -r[2], ln(t, ns(t, e));
  };
}();
const yf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: hf,
  calculateW: Kv,
  clone: af,
  conjugate: tf,
  copy: an,
  create: jr,
  dot: sn,
  equals: df,
  exactEquals: uf,
  exp: rs,
  fromEuler: rf,
  fromMat3: ns,
  fromValues: sf,
  getAngle: Zv,
  getAxisAngle: Gv,
  identity: Bv,
  invert: ef,
  len: vf,
  length: on,
  lerp: cf,
  ln: is,
  mul: lf,
  multiply: Qa,
  normalize: ln,
  pow: Qv,
  random: Jv,
  rotateX: Ja,
  rotateY: es,
  rotateZ: ts,
  rotationTo: pf,
  scale: as,
  set: of,
  setAxes: mf,
  setAxisAngle: Ka,
  slerp: qr,
  sqlerp: _f,
  sqrLen: ff,
  squaredLength: hn,
  str: nf
}, Symbol.toStringTag, { value: "Module" }));
function gf() {
  var e = new V(8);
  return V != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0, e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0), e[3] = 1, e;
}
function wf(e) {
  var t = new V(8);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t;
}
function xf(e, t, r, i, n, a, s, o) {
  var h = new V(8);
  return h[0] = e, h[1] = t, h[2] = r, h[3] = i, h[4] = n, h[5] = a, h[6] = s, h[7] = o, h;
}
function Mf(e, t, r, i, n, a, s) {
  var o = new V(8);
  o[0] = e, o[1] = t, o[2] = r, o[3] = i;
  var h = n * 0.5, l = a * 0.5, c = s * 0.5;
  return o[4] = h * i + l * r - c * t, o[5] = l * i + c * e - h * r, o[6] = c * i + h * t - l * e, o[7] = -h * e - l * t - c * r, o;
}
function ss(e, t, r) {
  var i = r[0] * 0.5, n = r[1] * 0.5, a = r[2] * 0.5, s = t[0], o = t[1], h = t[2], l = t[3];
  return e[0] = s, e[1] = o, e[2] = h, e[3] = l, e[4] = i * l + n * h - a * o, e[5] = n * l + a * s - i * h, e[6] = a * l + i * o - n * s, e[7] = -i * s - n * o - a * h, e;
}
function Ef(e, t) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = t[0] * 0.5, e[5] = t[1] * 0.5, e[6] = t[2] * 0.5, e[7] = 0, e;
}
function Tf(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0, e;
}
function bf(e, t) {
  var r = jr();
  Ea(r, t);
  var i = new V(3);
  return xa(i, t), ss(e, r, i), e;
}
function os(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e;
}
function Cf(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0, e;
}
function Sf(e, t, r, i, n, a, s, o, h) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e[4] = a, e[5] = s, e[6] = o, e[7] = h, e;
}
var Pf = an;
function $f(e, t) {
  return e[0] = t[4], e[1] = t[5], e[2] = t[6], e[3] = t[7], e;
}
var Lf = an;
function Rf(e, t) {
  return e[4] = t[0], e[5] = t[1], e[6] = t[2], e[7] = t[3], e;
}
function Af(e, t) {
  var r = t[4], i = t[5], n = t[6], a = t[7], s = -t[0], o = -t[1], h = -t[2], l = t[3];
  return e[0] = (r * l + a * s + i * h - n * o) * 2, e[1] = (i * l + a * o + n * s - r * h) * 2, e[2] = (n * l + a * h + r * o - i * s) * 2, e;
}
function zf(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = r[0] * 0.5, h = r[1] * 0.5, l = r[2] * 0.5, c = t[4], f = t[5], u = t[6], p = t[7];
  return e[0] = i, e[1] = n, e[2] = a, e[3] = s, e[4] = s * o + n * l - a * h + c, e[5] = s * h + a * o - i * l + f, e[6] = s * l + i * h - n * o + u, e[7] = -i * o - n * h - a * l + p, e;
}
function Of(e, t, r) {
  var i = -t[0], n = -t[1], a = -t[2], s = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = o * s + c * i + h * a - l * n, u = h * s + c * n + l * i - o * a, p = l * s + c * a + o * n - h * i, m = c * s - o * i - h * n - l * a;
  return Ja(e, t, r), i = e[0], n = e[1], a = e[2], s = e[3], e[4] = f * s + m * i + u * a - p * n, e[5] = u * s + m * n + p * i - f * a, e[6] = p * s + m * a + f * n - u * i, e[7] = m * s - f * i - u * n - p * a, e;
}
function If(e, t, r) {
  var i = -t[0], n = -t[1], a = -t[2], s = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = o * s + c * i + h * a - l * n, u = h * s + c * n + l * i - o * a, p = l * s + c * a + o * n - h * i, m = c * s - o * i - h * n - l * a;
  return es(e, t, r), i = e[0], n = e[1], a = e[2], s = e[3], e[4] = f * s + m * i + u * a - p * n, e[5] = u * s + m * n + p * i - f * a, e[6] = p * s + m * a + f * n - u * i, e[7] = m * s - f * i - u * n - p * a, e;
}
function Df(e, t, r) {
  var i = -t[0], n = -t[1], a = -t[2], s = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = o * s + c * i + h * a - l * n, u = h * s + c * n + l * i - o * a, p = l * s + c * a + o * n - h * i, m = c * s - o * i - h * n - l * a;
  return ts(e, t, r), i = e[0], n = e[1], a = e[2], s = e[3], e[4] = f * s + m * i + u * a - p * n, e[5] = u * s + m * n + p * i - f * a, e[6] = p * s + m * a + f * n - u * i, e[7] = m * s - f * i - u * n - p * a, e;
}
function Hf(e, t, r) {
  var i = r[0], n = r[1], a = r[2], s = r[3], o = t[0], h = t[1], l = t[2], c = t[3];
  return e[0] = o * s + c * i + h * a - l * n, e[1] = h * s + c * n + l * i - o * a, e[2] = l * s + c * a + o * n - h * i, e[3] = c * s - o * i - h * n - l * a, o = t[4], h = t[5], l = t[6], c = t[7], e[4] = o * s + c * i + h * a - l * n, e[5] = h * s + c * n + l * i - o * a, e[6] = l * s + c * a + o * n - h * i, e[7] = c * s - o * i - h * n - l * a, e;
}
function Ff(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = r[0], h = r[1], l = r[2], c = r[3];
  return e[0] = i * c + s * o + n * l - a * h, e[1] = n * c + s * h + a * o - i * l, e[2] = a * c + s * l + i * h - n * o, e[3] = s * c - i * o - n * h - a * l, o = r[4], h = r[5], l = r[6], c = r[7], e[4] = i * c + s * o + n * l - a * h, e[5] = n * c + s * h + a * o - i * l, e[6] = a * c + s * l + i * h - n * o, e[7] = s * c - i * o - n * h - a * l, e;
}
function Nf(e, t, r, i) {
  if (Math.abs(i) < A)
    return os(e, t);
  var n = Math.hypot(r[0], r[1], r[2]);
  i = i * 0.5;
  var a = Math.sin(i), s = a * r[0] / n, o = a * r[1] / n, h = a * r[2] / n, l = Math.cos(i), c = t[0], f = t[1], u = t[2], p = t[3];
  e[0] = c * l + p * s + f * h - u * o, e[1] = f * l + p * o + u * s - c * h, e[2] = u * l + p * h + c * o - f * s, e[3] = p * l - c * s - f * o - u * h;
  var m = t[4], x = t[5], y = t[6], M = t[7];
  return e[4] = m * l + M * s + x * h - y * o, e[5] = x * l + M * o + y * s - m * h, e[6] = y * l + M * h + m * o - x * s, e[7] = M * l - m * s - x * o - y * h, e;
}
function Vf(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e[4] = t[4] + r[4], e[5] = t[5] + r[5], e[6] = t[6] + r[6], e[7] = t[7] + r[7], e;
}
function hs(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = r[4], h = r[5], l = r[6], c = r[7], f = t[4], u = t[5], p = t[6], m = t[7], x = r[0], y = r[1], M = r[2], b = r[3];
  return e[0] = i * b + s * x + n * M - a * y, e[1] = n * b + s * y + a * x - i * M, e[2] = a * b + s * M + i * y - n * x, e[3] = s * b - i * x - n * y - a * M, e[4] = i * c + s * o + n * l - a * h + f * b + m * x + u * M - p * y, e[5] = n * c + s * h + a * o - i * l + u * b + m * y + p * x - f * M, e[6] = a * c + s * l + i * h - n * o + p * b + m * M + f * y - u * x, e[7] = s * c - i * o - n * h - a * l + m * b - f * x - u * y - p * M, e;
}
var kf = hs;
function Wf(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e;
}
var ls = sn;
function Yf(e, t, r, i) {
  var n = 1 - i;
  return ls(t, r) < 0 && (i = -i), e[0] = t[0] * n + r[0] * i, e[1] = t[1] * n + r[1] * i, e[2] = t[2] * n + r[2] * i, e[3] = t[3] * n + r[3] * i, e[4] = t[4] * n + r[4] * i, e[5] = t[5] * n + r[5] * i, e[6] = t[6] * n + r[6] * i, e[7] = t[7] * n + r[7] * i, e;
}
function qf(e, t) {
  var r = Qr(t);
  return e[0] = -t[0] / r, e[1] = -t[1] / r, e[2] = -t[2] / r, e[3] = t[3] / r, e[4] = -t[4] / r, e[5] = -t[5] / r, e[6] = -t[6] / r, e[7] = t[7] / r, e;
}
function jf(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e[4] = -t[4], e[5] = -t[5], e[6] = -t[6], e[7] = t[7], e;
}
var cs = on, Xf = cs, Qr = hn, Uf = Qr;
function Bf(e, t) {
  var r = Qr(t);
  if (r > 0) {
    r = Math.sqrt(r);
    var i = t[0] / r, n = t[1] / r, a = t[2] / r, s = t[3] / r, o = t[4], h = t[5], l = t[6], c = t[7], f = i * o + n * h + a * l + s * c;
    e[0] = i, e[1] = n, e[2] = a, e[3] = s, e[4] = (o - i * f) / r, e[5] = (h - n * f) / r, e[6] = (l - a * f) / r, e[7] = (c - s * f) / r;
  }
  return e;
}
function Gf(e) {
  return "quat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ")";
}
function Zf(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7];
}
function Kf(e, t) {
  var r = e[0], i = e[1], n = e[2], a = e[3], s = e[4], o = e[5], h = e[6], l = e[7], c = t[0], f = t[1], u = t[2], p = t[3], m = t[4], x = t[5], y = t[6], M = t[7];
  return Math.abs(r - c) <= A * Math.max(1, Math.abs(r), Math.abs(c)) && Math.abs(i - f) <= A * Math.max(1, Math.abs(i), Math.abs(f)) && Math.abs(n - u) <= A * Math.max(1, Math.abs(n), Math.abs(u)) && Math.abs(a - p) <= A * Math.max(1, Math.abs(a), Math.abs(p)) && Math.abs(s - m) <= A * Math.max(1, Math.abs(s), Math.abs(m)) && Math.abs(o - x) <= A * Math.max(1, Math.abs(o), Math.abs(x)) && Math.abs(h - y) <= A * Math.max(1, Math.abs(h), Math.abs(y)) && Math.abs(l - M) <= A * Math.max(1, Math.abs(l), Math.abs(M));
}
const Qf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Vf,
  clone: wf,
  conjugate: jf,
  copy: os,
  create: gf,
  dot: ls,
  equals: Kf,
  exactEquals: Zf,
  fromMat4: bf,
  fromRotation: Tf,
  fromRotationTranslation: ss,
  fromRotationTranslationValues: Mf,
  fromTranslation: Ef,
  fromValues: xf,
  getDual: $f,
  getReal: Pf,
  getTranslation: Af,
  identity: Cf,
  invert: qf,
  len: Xf,
  length: cs,
  lerp: Yf,
  mul: kf,
  multiply: hs,
  normalize: Bf,
  rotateAroundAxis: Nf,
  rotateByQuatAppend: Hf,
  rotateByQuatPrepend: Ff,
  rotateX: Of,
  rotateY: If,
  rotateZ: Df,
  scale: Wf,
  set: Sf,
  setDual: Rf,
  setReal: Lf,
  sqrLen: Uf,
  squaredLength: Qr,
  str: Gf,
  translate: zf
}, Symbol.toStringTag, { value: "Module" }));
function vs() {
  var e = new V(2);
  return V != Float32Array && (e[0] = 0, e[1] = 0), e;
}
function Jf(e) {
  var t = new V(2);
  return t[0] = e[0], t[1] = e[1], t;
}
function eu(e, t) {
  var r = new V(2);
  return r[0] = e, r[1] = t, r;
}
function tu(e, t) {
  return e[0] = t[0], e[1] = t[1], e;
}
function ru(e, t, r) {
  return e[0] = t, e[1] = r, e;
}
function iu(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e;
}
function fs(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e;
}
function us(e, t, r) {
  return e[0] = t[0] * r[0], e[1] = t[1] * r[1], e;
}
function ds(e, t, r) {
  return e[0] = t[0] / r[0], e[1] = t[1] / r[1], e;
}
function nu(e, t) {
  return e[0] = Math.ceil(t[0]), e[1] = Math.ceil(t[1]), e;
}
function au(e, t) {
  return e[0] = Math.floor(t[0]), e[1] = Math.floor(t[1]), e;
}
function su(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e;
}
function ou(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e;
}
function hu(e, t) {
  return e[0] = Math.round(t[0]), e[1] = Math.round(t[1]), e;
}
function lu(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e;
}
function cu(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e;
}
function ps(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1];
  return Math.hypot(r, i);
}
function _s(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1];
  return r * r + i * i;
}
function ms(e) {
  var t = e[0], r = e[1];
  return Math.hypot(t, r);
}
function ys(e) {
  var t = e[0], r = e[1];
  return t * t + r * r;
}
function vu(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e;
}
function fu(e, t) {
  return e[0] = 1 / t[0], e[1] = 1 / t[1], e;
}
function uu(e, t) {
  var r = t[0], i = t[1], n = r * r + i * i;
  return n > 0 && (n = 1 / Math.sqrt(n)), e[0] = t[0] * n, e[1] = t[1] * n, e;
}
function du(e, t) {
  return e[0] * t[0] + e[1] * t[1];
}
function pu(e, t, r) {
  var i = t[0] * r[1] - t[1] * r[0];
  return e[0] = e[1] = 0, e[2] = i, e;
}
function _u(e, t, r, i) {
  var n = t[0], a = t[1];
  return e[0] = n + i * (r[0] - n), e[1] = a + i * (r[1] - a), e;
}
function mu(e, t) {
  t = t || 1;
  var r = He() * 2 * Math.PI;
  return e[0] = Math.cos(r) * t, e[1] = Math.sin(r) * t, e;
}
function yu(e, t, r) {
  var i = t[0], n = t[1];
  return e[0] = r[0] * i + r[2] * n, e[1] = r[1] * i + r[3] * n, e;
}
function gu(e, t, r) {
  var i = t[0], n = t[1];
  return e[0] = r[0] * i + r[2] * n + r[4], e[1] = r[1] * i + r[3] * n + r[5], e;
}
function wu(e, t, r) {
  var i = t[0], n = t[1];
  return e[0] = r[0] * i + r[3] * n + r[6], e[1] = r[1] * i + r[4] * n + r[7], e;
}
function xu(e, t, r) {
  var i = t[0], n = t[1];
  return e[0] = r[0] * i + r[4] * n + r[12], e[1] = r[1] * i + r[5] * n + r[13], e;
}
function Mu(e, t, r, i) {
  var n = t[0] - r[0], a = t[1] - r[1], s = Math.sin(i), o = Math.cos(i);
  return e[0] = n * o - a * s + r[0], e[1] = n * s + a * o + r[1], e;
}
function Eu(e, t) {
  var r = e[0], i = e[1], n = t[0], a = t[1], s = Math.sqrt(r * r + i * i) * Math.sqrt(n * n + a * a), o = s && (r * n + i * a) / s;
  return Math.acos(Math.min(Math.max(o, -1), 1));
}
function Tu(e) {
  return e[0] = 0, e[1] = 0, e;
}
function bu(e) {
  return "vec2(" + e[0] + ", " + e[1] + ")";
}
function Cu(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}
function Su(e, t) {
  var r = e[0], i = e[1], n = t[0], a = t[1];
  return Math.abs(r - n) <= A * Math.max(1, Math.abs(r), Math.abs(n)) && Math.abs(i - a) <= A * Math.max(1, Math.abs(i), Math.abs(a));
}
var Pu = ms, $u = fs, Lu = us, Ru = ds, Au = ps, zu = _s, Ou = ys, Iu = function() {
  var e = vs();
  return function(t, r, i, n, a, s) {
    var o, h;
    for (r || (r = 2), i || (i = 0), n ? h = Math.min(n * r + i, t.length) : h = t.length, o = i; o < h; o += r)
      e[0] = t[o], e[1] = t[o + 1], a(e, e, s), t[o] = e[0], t[o + 1] = e[1];
    return t;
  };
}();
const Du = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: iu,
  angle: Eu,
  ceil: nu,
  clone: Jf,
  copy: tu,
  create: vs,
  cross: pu,
  dist: Au,
  distance: ps,
  div: Ru,
  divide: ds,
  dot: du,
  equals: Su,
  exactEquals: Cu,
  floor: au,
  forEach: Iu,
  fromValues: eu,
  inverse: fu,
  len: Pu,
  length: ms,
  lerp: _u,
  max: ou,
  min: su,
  mul: Lu,
  multiply: us,
  negate: vu,
  normalize: uu,
  random: mu,
  rotate: Mu,
  round: hu,
  scale: lu,
  scaleAndAdd: cu,
  set: ru,
  sqrDist: zu,
  sqrLen: Ou,
  squaredDistance: _s,
  squaredLength: ys,
  str: bu,
  sub: $u,
  subtract: fs,
  transformMat2: yu,
  transformMat2d: gu,
  transformMat3: wu,
  transformMat4: xu,
  zero: Tu
}, Symbol.toStringTag, { value: "Module" })), Hu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  glMatrix: Lh,
  mat2: tl,
  mat2d: bl,
  mat3: tc,
  mat4: Wc,
  quat: yf,
  quat2: Qf,
  vec2: Du,
  vec3: Tv,
  vec4: Uv
}, Symbol.toStringTag, { value: "Module" })), ye = /* @__PURE__ */ Eo(Hu);
function Fu(e, t, r) {
  return Math.min(Math.max(e, t), r);
}
var qt = Fu, Nu = 256, Mn = 256, Vr = qt, Vu = ye.vec4, Xr = ye.vec3, Wt = ye.mat4;
function En(e, t, r) {
  var i = e.createShader(t);
  if (e.shaderSource(i, r), e.compileShader(i), !e.getShaderParameter(i, e.COMPILE_STATUS))
    throw e.getShaderInfoLog(i);
  return i;
}
function ku(e, t, r, i, n) {
  var a = En(e, e.VERTEX_SHADER, t), s = En(e, e.FRAGMENT_SHADER, r), o = e.createProgram();
  if (e.attachShader(o, a), e.attachShader(o, s), e.linkProgram(o), !e.getProgramParameter(o, e.LINK_STATUS))
    throw e.getProgramInfoLog(o);
  for (var h = 0; h < i.length; h++) {
    var l = i[h];
    if (o[l] = e.getAttribLocation(o, l), o[l] === -1)
      throw new Error("Shader program has no " + l + " attribute");
  }
  for (var c = 0; c < n.length; c++) {
    var f = n[c];
    if (o[f] = e.getUniformLocation(o, f), o[f] === -1)
      throw new Error("Shader program has no " + f + " uniform");
  }
  return o;
}
function Wu(e, t) {
  for (var r = e.getAttachedShaders(t), i = 0; i < r.length; i++) {
    var n = r[i];
    e.detachShader(t, n), e.deleteShader(n);
  }
  e.deleteProgram(t);
}
function Ci(e, t, r, i) {
  var n = e.createBuffer();
  return e.bindBuffer(t, n), e.bufferData(t, i, r), n;
}
function Yu(e, t, r, i) {
  return {
    vertexIndices: Ci(e, e.ELEMENT_ARRAY_BUFFER, e.STATIC_DRAW, new Uint16Array(t)),
    vertexPositions: Ci(e, e.ARRAY_BUFFER, e.STATIC_DRAW, new Float32Array(r)),
    textureCoords: Ci(e, e.ARRAY_BUFFER, e.STATIC_DRAW, new Float32Array(i))
  };
}
function qu(e, t) {
  e.deleteBuffer(t.vertexIndices), e.deleteBuffer(t.vertexPositions), e.deleteBuffer(t.textureCoords);
}
function ju(e, t) {
  for (var r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), i = 0; i < r; i++)
    e.enableVertexAttribArray(i);
}
function Xu(e, t) {
  for (var r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), i = 0; i < r; i++)
    e.disableVertexAttribArray(i);
}
function Uu(e, t, r) {
  e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, r._texture), e.uniform1i(t.uSampler, 0);
}
function Bu(e, t, r, i) {
  var n = ((r + 1) * Mn - i) / (Mn * Nu);
  e.uniform1f(t.uDepth, n);
}
var Gu = 1, Zu = Vu.create(), gs = Wt.create();
Wt.identity(gs);
function Ku(e, t, r) {
  var i = Gu;
  t && t.opacity != null && (i = t.opacity), e.uniform1f(r.opacity, i);
  var n = Zu;
  t && t.colorOffset && (n = t.colorOffset), e.uniform4fv(r.colorOffset, n);
  var a = gs;
  t && t.colorMatrix && (a = t.colorMatrix), e.uniformMatrix4fv(r.colorMatrix, !1, a);
}
var Tn = Xr.create(), bn = Xr.create();
function Qu(e, t, r, i) {
  if (r.x === 0 && r.width === 1 && r.y === 0 && r.height === 1) {
    e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight), Wt.identity(i);
    return;
  }
  var n = r.x, a = Vr(n, 0, 1), s = a - n, o = 1 - a, h = Vr(r.width - s, 0, o), l = r.width - h, c = 1 - r.height - r.y, f = Vr(c, 0, 1), u = f - c, p = 1 - f, m = Vr(r.height - u, 0, p), x = r.height - m;
  Xr.set(
    bn,
    r.width / h,
    r.height / m,
    1
  ), Xr.set(
    Tn,
    (l - s) / h,
    (x - u) / m,
    0
  ), Wt.identity(i), Wt.translate(i, i, Tn), Wt.scale(i, i, bn), e.viewport(
    e.drawingBufferWidth * a,
    e.drawingBufferHeight * f,
    e.drawingBufferWidth * h,
    e.drawingBufferHeight * m
  );
}
var ws = {
  createShaderProgram: ku,
  destroyShaderProgram: Wu,
  createConstantBuffers: Yu,
  destroyConstantBuffers: qu,
  enableAttributes: ju,
  disableAttributes: Xu,
  setTexture: Uu,
  setDepth: Bu,
  setViewport: Qu,
  setupPixelEffectUniforms: Ku
}, Ju = [
  "attribute vec3 aVertexPosition;",
  "attribute vec2 aTextureCoord;",
  "uniform float uDepth;",
  "uniform mat4 uViewportMatrix;",
  "uniform mat4 uProjMatrix;",
  "varying vec2 vTextureCoord;",
  "void main(void) {",
  "  gl_Position = uViewportMatrix * uProjMatrix * vec4(aVertexPosition.xy, 0.0, 1.0);",
  "  gl_Position.z = uDepth * gl_Position.w;",
  "  vTextureCoord = aTextureCoord;",
  "}"
].join(`
`), ed = [
  "#ifdef GL_FRAGMENT_PRECISION_HIGH",
  "precision highp float;",
  "#else",
  "precision mediump float;",
  "#endif",
  "uniform sampler2D uSampler;",
  "uniform float uOpacity;",
  "uniform vec4 uColorOffset;",
  "uniform mat4 uColorMatrix;",
  "varying vec2 vTextureCoord;",
  "void main(void) {",
  "  vec4 color = texture2D(uSampler, vTextureCoord) * uColorMatrix + uColorOffset;",
  "  gl_FragColor = vec4(color.rgba * uOpacity);",
  "}"
].join(`
`), Tt = ye.mat4, Cn = ye.vec3, td = ne, je = ws, rd = je.createConstantBuffers, id = je.destroyConstantBuffers, nd = je.createShaderProgram, ad = je.destroyShaderProgram, sd = je.enableAttributes, od = je.disableAttributes, hd = je.setViewport, ld = je.setupPixelEffectUniforms, cd = je.setDepth, vd = je.setTexture, fd = Ju, ud = ed, xs = [0, 1, 2, 0, 2, 3], dd = [-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0], pd = [0, 0, 1, 0, 1, 1, 0, 1], _d = ["aVertexPosition", "aTextureCoord"], md = [
  "uDepth",
  "uOpacity",
  "uSampler",
  "uProjMatrix",
  "uViewportMatrix",
  "uColorOffset",
  "uColorMatrix"
];
function pr(e) {
  this.gl = e, this.projMatrix = Tt.create(), this.viewportMatrix = Tt.create(), this.translateVector = Cn.create(), this.scaleVector = Cn.create(), this.constantBuffers = rd(e, xs, dd, pd), this.shaderProgram = nd(e, fd, ud, _d, md);
}
pr.prototype.destroy = function() {
  id(this.gl, this.constantBuffers), ad(this.gl, this.shaderProgram), td(this);
};
pr.prototype.startLayer = function(e, t) {
  var r = this.gl, i = this.shaderProgram, n = this.constantBuffers, a = this.viewportMatrix;
  r.useProgram(i), sd(r, i), hd(r, e, t, a), r.uniformMatrix4fv(i.uViewportMatrix, !1, a), r.bindBuffer(r.ARRAY_BUFFER, n.vertexPositions), r.vertexAttribPointer(i.aVertexPosition, 3, r.FLOAT, r.FALSE, 0, 0), r.bindBuffer(r.ARRAY_BUFFER, n.textureCoords), r.vertexAttribPointer(i.aTextureCoord, 2, r.FLOAT, r.FALSE, 0, 0), ld(r, e.effects(), {
    opacity: i.uOpacity,
    colorOffset: i.uColorOffset,
    colorMatrix: i.uColorMatrix
  });
};
pr.prototype.endLayer = function(e, t) {
  var r = this.gl, i = this.shaderProgram;
  od(r, i);
};
pr.prototype.renderTile = function(e, t, r, i) {
  var n = this.gl, a = this.shaderProgram, s = this.constantBuffers, o = this.projMatrix, h = this.translateVector, l = this.scaleVector;
  h[0] = e.centerX(), h[1] = e.centerY(), h[2] = -0.5, l[0] = e.scaleX(), l[1] = e.scaleY(), l[2] = 1, Tt.copy(o, r.view().projection()), Tt.rotateX(o, o, e.rotX()), Tt.rotateY(o, o, e.rotY()), Tt.translate(o, o, h), Tt.scale(o, o, l), n.uniformMatrix4fv(a.uProjMatrix, !1, o), cd(n, a, i, e.z), vd(n, a, t), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, s.vertexIndices), n.drawElements(n.TRIANGLES, xs.length, n.UNSIGNED_SHORT, 0);
};
var Ms = pr, yd = Ms, gd = qe;
function Es() {
  this.constructor.super_.apply(this, arguments);
}
gd(Es, yd);
var Ts = Es, wd = Ms, xd = qe;
function bs() {
  this.constructor.super_.apply(this, arguments);
}
xd(bs, wd);
var Cs = bs, Md = [
  "attribute vec3 aVertexPosition;",
  "uniform float uDepth;",
  "uniform mat4 uViewportMatrix;",
  "uniform mat4 uInvProjMatrix;",
  "varying vec4 vRay;",
  "void main(void) {",
  "  vRay = uInvProjMatrix * vec4(aVertexPosition.xy, 1.0, 1.0);",
  "  gl_Position = uViewportMatrix * vec4(aVertexPosition.xy, uDepth, 1.0);",
  "}"
].join(`
`), Ed = [
  "#ifdef GL_FRAGMENT_PRECISION_HIGH",
  "precision highp float;",
  "#else",
  "precision mediump float",
  "#endif",
  "uniform sampler2D uSampler;",
  "uniform float uOpacity;",
  "uniform float uTextureX;",
  "uniform float uTextureY;",
  "uniform float uTextureWidth;",
  "uniform float uTextureHeight;",
  "uniform vec4 uColorOffset;",
  "uniform mat4 uColorMatrix;",
  "varying vec4 vRay;",
  "const float PI = 3.14159265358979323846264;",
  "void main(void) {",
  "  float r = inversesqrt(vRay.x * vRay.x + vRay.y * vRay.y + vRay.z * vRay.z);",
  "  float phi  = acos(vRay.y * r);",
  "  float theta = atan(vRay.x, -1.0*vRay.z);",
  "  float s = 0.5 + 0.5 * theta / PI;",
  "  float t = 1.0 - phi / PI;",
  "  s = s * uTextureWidth + uTextureX;",
  "  t = t * uTextureHeight + uTextureY;",
  "  vec4 color = texture2D(uSampler, vec2(s, t)) * uColorMatrix + uColorOffset;",
  "  gl_FragColor = vec4(color.rgba * uOpacity);",
  "}"
].join(`
`), Ur = ye.mat4, Td = ne, Xe = ws, bd = Xe.createConstantBuffers, Cd = Xe.destroyConstantBuffers, Sd = Xe.createShaderProgram, Pd = Xe.destroyShaderProgram, $d = Xe.enableAttributes, Ld = Xe.disableAttributes, Rd = Xe.setViewport, Ad = Xe.setupPixelEffectUniforms, zd = Xe.setDepth, Od = Xe.setTexture, Id = Md, Dd = Ed, Ss = [0, 1, 2, 0, 2, 3], Hd = [-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0], Fd = [0, 0, 1, 0, 1, 1, 0, 1], Nd = ["aVertexPosition"], Vd = [
  "uDepth",
  "uOpacity",
  "uSampler",
  "uInvProjMatrix",
  "uViewportMatrix",
  "uColorOffset",
  "uColorMatrix",
  "uTextureX",
  "uTextureY",
  "uTextureWidth",
  "uTextureHeight"
];
function _r(e) {
  this.gl = e, this.invProjMatrix = Ur.create(), this.viewportMatrix = Ur.create(), this.constantBuffers = bd(e, Ss, Hd, Fd), this.shaderProgram = Sd(e, Id, Dd, Nd, Vd);
}
_r.prototype.destroy = function() {
  Cd(this.gl, this.constantBuffers), Pd(this.gl, this.shaderProgram), Td(this);
};
_r.prototype.startLayer = function(e, t) {
  var r = this.gl, i = this.shaderProgram, n = this.constantBuffers, a = this.invProjMatrix, s = this.viewportMatrix;
  r.useProgram(i), $d(r, i), Rd(r, e, t, s), r.uniformMatrix4fv(i.uViewportMatrix, !1, s), r.bindBuffer(r.ARRAY_BUFFER, n.vertexPositions), r.vertexAttribPointer(i.aVertexPosition, 3, r.FLOAT, r.FALSE, 0, 0), r.bindBuffer(r.ARRAY_BUFFER, n.textureCoords), Ur.copy(a, e.view().projection()), Ur.invert(a, a), r.uniformMatrix4fv(i.uInvProjMatrix, !1, a);
  var o = e.effects().textureCrop || {}, h = o.x != null ? o.x : 0, l = o.y != null ? o.y : 0, c = o.width != null ? o.width : 1, f = o.height != null ? o.height : 1;
  r.uniform1f(i.uTextureX, h), r.uniform1f(i.uTextureY, l), r.uniform1f(i.uTextureWidth, c), r.uniform1f(i.uTextureHeight, f), Ad(r, e.effects(), {
    opacity: i.uOpacity,
    colorOffset: i.uColorOffset,
    colorMatrix: i.uColorMatrix
  });
};
_r.prototype.endLayer = function(e, t) {
  var r = this.gl, i = this.shaderProgram;
  Ld(r, i);
};
_r.prototype.renderTile = function(e, t, r, i) {
  var n = this.gl, a = this.shaderProgram, s = this.constantBuffers;
  zd(n, a, i, e.z), Od(n, a, t), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, s.vertexIndices), n.drawElements(n.TRIANGLES, Ss.length, n.UNSIGNED_SHORT, 0);
};
var Ps = _r, kd = Ts, Wd = Cs, Yd = Ps;
function qd(e) {
  switch (e.type) {
    case "webgl":
      e.registerRenderer("flat", "flat", Wd), e.registerRenderer("cube", "rectilinear", kd), e.registerRenderer("equirect", "rectilinear", Yd);
      break;
    default:
      throw new Error("Unknown stage type: " + e.type);
  }
}
var $s = qd;
function jd() {
  for (var e = 0, t = 0; t < arguments.length; t++) {
    var r = arguments[t];
    e += r, e += r << 10, e ^= r >> 6;
  }
  return e += e << 3, e ^= e >> 11, e += e << 15, e >= 0 ? e : -e;
}
var Jr = jd;
function Xd(e, t) {
  return (+e % (t = +t) + t) % t;
}
var vt = Xd, cn = vt, Ud = 64;
function $t(e) {
  if (e != null && (!isFinite(e) || Math.floor(e) !== e || e < 1))
    throw new Error("Set: invalid capacity");
  this._capacity = this._capacity || Ud, this._buckets = [];
  for (var t = 0; t < this._capacity; t++)
    this._buckets.push([]);
  this._size = 0;
}
$t.prototype.add = function(e) {
  for (var t = cn(e.hash(), this._capacity), r = this._buckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n))
      return r[i] = e, n;
  }
  return r.push(e), this._size++, null;
};
$t.prototype.remove = function(e) {
  for (var t = cn(e.hash(), this._capacity), r = this._buckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n)) {
      for (var a = i; a < r.length - 1; a++)
        r[a] = r[a + 1];
      return r.length = r.length - 1, this._size--, n;
    }
  }
  return null;
};
$t.prototype.has = function(e) {
  for (var t = cn(e.hash(), this._capacity), r = this._buckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n))
      return !0;
  }
  return !1;
};
$t.prototype.size = function() {
  return this._size;
};
$t.prototype.clear = function() {
  for (var e = 0; e < this._capacity; e++)
    this._buckets[e].length = 0;
  this._size = 0;
};
$t.prototype.forEach = function(e) {
  for (var t = 0, r = 0; r < this._capacity; r++)
    for (var i = this._buckets[r], n = 0; n < i.length; n++)
      e(i[n]), t += 1;
  return t;
};
var Ls = $t, Bd = Ls;
function vn() {
  this._stack = [], this._visited = new Bd(), this._vertices = null;
}
vn.prototype.search = function(e, t, r) {
  var i = this._stack, n = this._visited, a = this._vertices, s = 0;
  for (this._clear(), i.push(t); i.length > 0; ) {
    var o = i.pop();
    if (!n.has(o) && e.intersects(o.vertices(a))) {
      n.add(o);
      for (var h = o.neighbors(), l = 0; l < h.length; l++)
        i.push(h[l]);
      r.push(o), s++;
    }
  }
  return this._vertices = a, this._clear(), s;
};
vn.prototype._clear = function() {
  this._stack.length = 0, this._visited.clear();
};
var Rs = vn, Gd = vt;
function et(e) {
  if (!isFinite(e) || Math.floor(e) !== e || e < 0)
    throw new Error("LruMap: invalid capacity");
  this._capacity = e, this._keys = new Array(this._capacity), this._values = new Array(this._capacity), this._start = 0, this._size = 0;
}
et.prototype._index = function(e) {
  return Gd(this._start + e, this._capacity);
};
et.prototype.get = function(e) {
  for (var t = 0; t < this._size; t++) {
    var r = this._keys[this._index(t)];
    if (e.equals(r))
      return this._values[this._index(t)];
  }
  return null;
};
et.prototype.set = function(e, t) {
  if (this._capacity === 0)
    return e;
  this.del(e);
  var r = this._size === this._capacity ? this._keys[this._index(0)] : null;
  return this._keys[this._index(this._size)] = e, this._values[this._index(this._size)] = t, this._size < this._capacity ? this._size++ : this._start = this._index(1), r;
};
et.prototype.del = function(e) {
  for (var t = 0; t < this._size; t++)
    if (e.equals(this._keys[this._index(t)])) {
      for (var r = this._values[this._index(t)], i = t; i < this._size - 1; i++)
        this._keys[this._index(i)] = this._keys[this._index(i + 1)], this._values[this._index(i)] = this._values[this._index(i + 1)];
      return this._size--, r;
    }
  return null;
};
et.prototype.has = function(e) {
  for (var t = 0; t < this._size; t++)
    if (e.equals(this._keys[this._index(t)]))
      return !0;
  return !1;
};
et.prototype.size = function() {
  return this._size;
};
et.prototype.clear = function() {
  this._keys.length = 0, this._values.length = 0, this._start = 0, this._size = 0;
};
et.prototype.forEach = function(e) {
  for (var t = 0, r = 0; r < this._size; r++)
    e(this._keys[this._index(r)], this._values[this._index(r)]), t += 1;
  return t;
};
var As = et;
function ei(e) {
  this._fallbackOnly = !!e.fallbackOnly;
}
ei.prototype.numHorizontalTiles = function() {
  return Math.ceil(this.width() / this.tileWidth());
};
ei.prototype.numVerticalTiles = function() {
  return Math.ceil(this.height() / this.tileHeight());
};
ei.prototype.fallbackOnly = function() {
  return this._fallbackOnly;
};
var fn = ei;
function Zd(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
var mr = Zd, Kd = mr;
function Qd(e, t) {
  for (var r = [], i = 0; i < e.length; i++)
    r.push(new t(e[i]));
  return r.sort(function(n, a) {
    return Kd(n.width(), a.width());
  }), r;
}
function Jd(e) {
  for (var t = [], r = 0; r < e.length; r++)
    e[r]._fallbackOnly || t.push(e[r]);
  if (!t.length)
    throw new Error("No selectable levels in list");
  return t;
}
var yr = {
  makeLevelList: Qd,
  makeSelectableLevelList: Jd
};
function ep(e) {
  var t = typeof e;
  if (t === "object") {
    if (e === null)
      return "null";
    if (Object.prototype.toString.call(e) === "[object Array]")
      return "array";
    if (Object.prototype.toString.call(e) === "[object RegExp]")
      return "regexp";
  }
  return t;
}
var gr = ep, tp = qe, rp = Jr, ip = Rs, np = As, ap = fn, sp = yr.makeLevelList, op = yr.makeSelectableLevelList, Br = qt, kr = mr, hp = gr, Te = ye.vec3, Wi = ye.vec4, lp = 64, Ct = "fudlrb", St = {
  f: { x: 0, y: 0 },
  b: { x: 0, y: Math.PI },
  l: { x: 0, y: Math.PI / 2 },
  r: { x: 0, y: -Math.PI / 2 },
  u: { x: Math.PI / 2, y: 0 },
  d: { x: -Math.PI / 2, y: 0 }
}, Si = Te.create();
function lr(e, t, r, i) {
  t && Te.rotateZ(e, e, Si, t), r && Te.rotateX(e, e, Si, r), i && Te.rotateY(e, e, Si, i);
}
var Yi = {};
for (var Pi = 0; Pi < Ct.length; Pi++) {
  var Sn = Ct[Pi], Pn = St[Sn], $n = Te.fromValues(0, 0, -1);
  lr($n, 0, Pn.x, Pn.y), Yi[Sn] = $n;
}
var Wr = {
  f: ["l", "r", "u", "d"],
  b: ["r", "l", "u", "d"],
  l: ["b", "f", "u", "d"],
  r: ["f", "b", "u", "d"],
  u: ["l", "r", "b", "f"],
  d: ["l", "r", "f", "b"]
}, $i = [
  [0, 1],
  // top
  [1, 0],
  // right
  [0, -1],
  // bottom
  [-1, 0]
  // left
];
function le(e, t, r, i, n) {
  this.face = e, this.x = t, this.y = r, this.z = i, this._geometry = n, this._level = n.levelList[i];
}
le.prototype.rotX = function() {
  return St[this.face].x;
};
le.prototype.rotY = function() {
  return St[this.face].y;
};
le.prototype.centerX = function() {
  return (this.x + 0.5) / this._level.numHorizontalTiles() - 0.5;
};
le.prototype.centerY = function() {
  return 0.5 - (this.y + 0.5) / this._level.numVerticalTiles();
};
le.prototype.scaleX = function() {
  return 1 / this._level.numHorizontalTiles();
};
le.prototype.scaleY = function() {
  return 1 / this._level.numVerticalTiles();
};
le.prototype.vertices = function(e) {
  e || (e = [Te.create(), Te.create(), Te.create(), Te.create()]);
  var t = St[this.face];
  function r(o, h, l) {
    Te.set(o, h, l, -0.5), lr(o, 0, t.x, t.y);
  }
  var i = this.centerX() - this.scaleX() / 2, n = this.centerX() + this.scaleX() / 2, a = this.centerY() - this.scaleY() / 2, s = this.centerY() + this.scaleY() / 2;
  return r(e[0], i, s), r(e[1], n, s), r(e[2], n, a), r(e[3], i, a), e;
};
le.prototype.parent = function() {
  if (this.z === 0)
    return null;
  var e = this.face, t = this.z, r = this.x, i = this.y, n = this._geometry, a = n.levelList[t], s = n.levelList[t - 1], o = Math.floor(r / a.numHorizontalTiles() * s.numHorizontalTiles()), h = Math.floor(i / a.numVerticalTiles() * s.numVerticalTiles()), l = t - 1;
  return new le(e, o, h, l, n);
};
le.prototype.children = function(e) {
  if (this.z === this._geometry.levelList.length - 1)
    return null;
  var t = this.face, r = this.z, i = this.x, n = this.y, a = this._geometry, s = a.levelList[r], o = a.levelList[r + 1], h = o.numHorizontalTiles() / s.numHorizontalTiles(), l = o.numVerticalTiles() / s.numVerticalTiles();
  e = e || [];
  for (var c = 0; c < h; c++)
    for (var f = 0; f < l; f++) {
      var u = h * i + c, p = l * n + f, m = r + 1;
      e.push(new le(t, u, p, m, a));
    }
  return e;
};
le.prototype.neighbors = function() {
  var e = this._geometry, t = e._neighborsCache, r = t.get(this);
  if (r)
    return r;
  for (var i = e._vec, n = this.face, a = this.x, s = this.y, o = this.z, h = this._level, l = h.numHorizontalTiles(), c = h.numVerticalTiles(), f = [], u = 0; u < $i.length; u++) {
    var p = $i[u][0], m = $i[u][1], x = a + p, y = s + m, M = o, b = n;
    if (x < 0 || x >= l || y < 0 || y >= c) {
      var $ = this.centerX(), L = this.centerY();
      x < 0 ? (Te.set(i, -0.5, L, -0.5), b = Wr[n][0]) : x >= l ? (Te.set(i, 0.5, L, -0.5), b = Wr[n][1]) : y < 0 ? (Te.set(i, $, 0.5, -0.5), b = Wr[n][2]) : y >= c && (Te.set(i, $, -0.5, -0.5), b = Wr[n][3]);
      var R;
      R = St[n], lr(i, 0, R.x, R.y), R = St[b], lr(i, 0, -R.x, -R.y), x = Br(Math.floor((0.5 + i[0]) * l), 0, l - 1), y = Br(Math.floor((0.5 - i[1]) * c), 0, c - 1);
    }
    f.push(new le(b, x, y, M, e));
  }
  return t.set(this, f), f;
};
le.prototype.hash = function() {
  return rp(Ct.indexOf(this.face), this.z, this.y, this.x);
};
le.prototype.equals = function(e) {
  return this._geometry === e._geometry && this.face === e.face && this.z === e.z && this.y === e.y && this.x === e.x;
};
le.prototype.cmp = function(e) {
  return kr(this.z, e.z) || kr(Ct.indexOf(this.face), Ct.indexOf(e.face)) || kr(this.y, e.y) || kr(this.x, e.x);
};
le.prototype.str = function() {
  return "CubeTile(" + tile.face + ", " + tile.x + ", " + tile.y + ", " + tile.z + ")";
};
function Lt(e) {
  if (this.constructor.super_.call(this, e), this._size = e.size, this._tileSize = e.tileSize, this._size % this._tileSize !== 0)
    throw new Error("Level size is not multiple of tile size: " + this._size + " " + this._tileSize);
}
tp(Lt, ap);
Lt.prototype.width = function() {
  return this._size;
};
Lt.prototype.height = function() {
  return this._size;
};
Lt.prototype.tileWidth = function() {
  return this._tileSize;
};
Lt.prototype.tileHeight = function() {
  return this._tileSize;
};
Lt.prototype._validateWithParentLevel = function(e) {
  var t = this.width(), r = this.height(), i = this.tileWidth(), n = this.tileHeight(), a = this.numHorizontalTiles(), s = this.numVerticalTiles(), o = e.width(), h = e.height(), l = e.tileWidth(), c = e.tileHeight(), f = e.numHorizontalTiles(), u = e.numVerticalTiles();
  if (t % o !== 0)
    throw new Error("Level width must be multiple of parent level: " + t + " vs. " + o);
  if (r % h !== 0)
    throw new Error("Level height must be multiple of parent level: " + r + " vs. " + h);
  if (a % f !== 0)
    throw new Error("Number of horizontal tiles must be multiple of parent level: " + a + " (" + t + "/" + i + ") vs. " + f + " (" + o + "/" + l + ")");
  if (s % u !== 0)
    throw new Error("Number of vertical tiles must be multiple of parent level: " + s + " (" + r + "/" + n + ") vs. " + u + " (" + h + "/" + c + ")");
};
function Ze(e) {
  if (hp(e) !== "array")
    throw new Error("Level list must be an array");
  this.levelList = sp(e, Lt), this.selectableLevelList = op(this.levelList);
  for (var t = 1; t < this.levelList.length; t++)
    this.levelList[t]._validateWithParentLevel(this.levelList[t - 1]);
  this._tileSearcher = new ip(), this._neighborsCache = new np(lp), this._vec = Wi.create(), this._viewSize = {};
}
Ze.prototype.maxTileSize = function() {
  for (var e = 0, t = 0; t < this.levelList.length; t++) {
    var r = this.levelList[t];
    e = Math.max(e, r.tileWidth, r.tileHeight);
  }
  return e;
};
Ze.prototype.levelTiles = function(e, t) {
  var r = this.levelList.indexOf(e), i = e.numHorizontalTiles() - 1, n = e.numVerticalTiles() - 1;
  t = t || [];
  for (var a = 0; a < Ct.length; a++)
    for (var s = Ct[a], o = 0; o <= i; o++)
      for (var h = 0; h <= n; h++)
        t.push(new le(s, o, h, r, this));
  return t;
};
Ze.prototype._closestTile = function(e, t) {
  var r = this._vec;
  Wi.set(r, 0, 0, 1, 1), Wi.transformMat4(r, r, e.inverseProjection());
  var i = 1 / 0, n = null;
  for (var a in Yi) {
    var s = Yi[a], o = 1 - Te.dot(s, r);
    o < i && (i = o, n = a);
  }
  for (var h = Math.max(Math.abs(r[0]), Math.abs(r[1]), Math.abs(r[2])) / 0.5, l = 0; l < 3; l++)
    r[l] = r[l] / h;
  var c = St[n];
  lr(r, 0, -c.x, -c.y);
  var f = this.levelList.indexOf(t), u = t.numHorizontalTiles(), p = t.numVerticalTiles(), m = Br(Math.floor((0.5 + r[0]) * u), 0, u - 1), x = Br(Math.floor((0.5 - r[1]) * p), 0, p - 1);
  return new le(n, m, x, f, this);
};
Ze.prototype.visibleTiles = function(e, t, r) {
  var i = this._viewSize, n = this._tileSearcher;
  if (r = r || [], e.size(i), i.width === 0 || i.height === 0)
    return r;
  var a = this._closestTile(e, t), s = n.search(e, a, r);
  if (!s)
    throw new Error("Starting tile is not visible");
  return r;
};
Ze.Tile = Ze.prototype.Tile = le;
Ze.type = Ze.prototype.type = "cube";
le.type = le.prototype.type = "cube";
var cp = Ze, vp = qe, fp = Jr, up = Rs, dp = As, pp = fn, _p = yr.makeLevelList, mp = yr.makeSelectableLevelList, Ln = qt, zs = vt, Li = mr, yp = gr, st = ye.vec2, qi = ye.vec4, gp = 64, Ri = [
  [0, 1],
  // top
  [1, 0],
  // right
  [0, -1],
  // bottom
  [-1, 0]
  // left
];
function J(e, t, r, i) {
  this.x = e, this.y = t, this.z = r, this._geometry = i, this._level = i.levelList[r];
}
J.prototype.rotX = function() {
  return 0;
};
J.prototype.rotY = function() {
  return 0;
};
J.prototype.centerX = function() {
  var e = this._level.width(), t = this._level.tileWidth();
  return (this.x * t + 0.5 * this.width()) / e - 0.5;
};
J.prototype.centerY = function() {
  var e = this._level.height(), t = this._level.tileHeight();
  return 0.5 - (this.y * t + 0.5 * this.height()) / e;
};
J.prototype.scaleX = function() {
  var e = this._level.width();
  return this.width() / e;
};
J.prototype.scaleY = function() {
  var e = this._level.height();
  return this.height() / e;
};
J.prototype.width = function() {
  var e = this._level.width(), t = this._level.tileWidth();
  if (this.x === this._level.numHorizontalTiles() - 1) {
    var r = zs(e, t);
    return r || t;
  } else
    return t;
};
J.prototype.height = function() {
  var e = this._level.height(), t = this._level.tileHeight();
  if (this.y === this._level.numVerticalTiles() - 1) {
    var r = zs(e, t);
    return r || t;
  } else
    return t;
};
J.prototype.levelWidth = function() {
  return this._level.width();
};
J.prototype.levelHeight = function() {
  return this._level.height();
};
J.prototype.vertices = function(e) {
  e || (e = [st.create(), st.create(), st.create(), st.create()]);
  var t = this.centerX() - this.scaleX() / 2, r = this.centerX() + this.scaleX() / 2, i = this.centerY() - this.scaleY() / 2, n = this.centerY() + this.scaleY() / 2;
  return st.set(e[0], t, n), st.set(e[1], r, n), st.set(e[2], r, i), st.set(e[3], t, i), e;
};
J.prototype.parent = function() {
  if (this.z === 0)
    return null;
  var e = this._geometry, t = this.z - 1, r = Math.floor(this.x / 2), i = Math.floor(this.y / 2);
  return new J(r, i, t, e);
};
J.prototype.children = function(e) {
  if (this.z === this._geometry.levelList.length - 1)
    return null;
  var t = this._geometry, r = this.z + 1;
  return e = e || [], e.push(new J(2 * this.x, 2 * this.y, r, t)), e.push(new J(2 * this.x, 2 * this.y + 1, r, t)), e.push(new J(2 * this.x + 1, 2 * this.y, r, t)), e.push(new J(2 * this.x + 1, 2 * this.y + 1, r, t)), e;
};
J.prototype.neighbors = function() {
  var e = this._geometry, t = e._neighborsCache, r = t.get(this);
  if (r)
    return r;
  for (var i = this.x, n = this.y, a = this.z, s = this._level, o = s.numHorizontalTiles() - 1, h = s.numVerticalTiles() - 1, l = [], c = 0; c < Ri.length; c++) {
    var f = Ri[c][0], u = Ri[c][1], p = i + f, m = n + u, x = a;
    0 <= p && p <= o && 0 <= m && m <= h && l.push(new J(p, m, x, e));
  }
  return t.set(this, l), l;
};
J.prototype.hash = function() {
  return fp(this.z, this.y, this.x);
};
J.prototype.equals = function(e) {
  return this._geometry === e._geometry && this.z === e.z && this.y === e.y && this.x === e.x;
};
J.prototype.cmp = function(e) {
  return Li(this.z, e.z) || Li(this.y, e.y) || Li(this.x, e.x);
};
J.prototype.str = function() {
  return "FlatTile(" + tile.x + ", " + tile.y + ", " + tile.z + ")";
};
function Rt(e) {
  this.constructor.super_.call(this, e), this._width = e.width, this._height = e.height, this._tileWidth = e.tileWidth, this._tileHeight = e.tileHeight;
}
vp(Rt, pp);
Rt.prototype.width = function() {
  return this._width;
};
Rt.prototype.height = function() {
  return this._height;
};
Rt.prototype.tileWidth = function() {
  return this._tileWidth;
};
Rt.prototype.tileHeight = function() {
  return this._tileHeight;
};
Rt.prototype._validateWithParentLevel = function(e) {
  var t = this.width(), r = this.height(), i = this.tileWidth(), n = this.tileHeight(), a = e.width(), s = e.height(), o = e.tileWidth(), h = e.tileHeight();
  if (t % a !== 0)
    return new Error("Level width must be multiple of parent level: " + t + " vs. " + a);
  if (r % s !== 0)
    return new Error("Level height must be multiple of parent level: " + r + " vs. " + s);
  if (i % o !== 0)
    return new Error("Level tile width must be multiple of parent level: " + i + " vs. " + o);
  if (n % h !== 0)
    return new Error("Level tile height must be multiple of parent level: " + n + " vs. " + h);
};
function Ke(e) {
  if (yp(e) !== "array")
    throw new Error("Level list must be an array");
  this.levelList = _p(e, Rt), this.selectableLevelList = mp(this.levelList);
  for (var t = 1; t < this.levelList.length; t++)
    this.levelList[t]._validateWithParentLevel(this.levelList[t - 1]);
  this._tileSearcher = new up(), this._neighborsCache = new dp(gp), this._vec = qi.create(), this._viewSize = {};
}
Ke.prototype.maxTileSize = function() {
  for (var e = 0, t = 0; t < this.levelList.length; t++) {
    var r = this.levelList[t];
    e = Math.max(e, r.tileWidth, r.tileHeight);
  }
  return e;
};
Ke.prototype.levelTiles = function(e, t) {
  var r = this.levelList.indexOf(e), i = e.numHorizontalTiles() - 1, n = e.numVerticalTiles() - 1;
  t || (t = []);
  for (var a = 0; a <= i; a++)
    for (var s = 0; s <= n; s++)
      t.push(new J(a, s, r, this));
  return t;
};
Ke.prototype._closestTile = function(e, t) {
  var r = this._vec;
  qi.set(r, 0, 0, 1, 1), qi.transformMat4(r, r, e.inverseProjection());
  var i = 0.5 + r[0], n = 0.5 - r[1], a = this.levelList.indexOf(t), s = t.width(), o = t.height(), h = t.tileWidth(), l = t.tileHeight(), c = t.numHorizontalTiles(), f = t.numVerticalTiles(), u = Ln(Math.floor(i * s / h), 0, c - 1), p = Ln(Math.floor(n * o / l), 0, f - 1);
  return new J(u, p, a, this);
};
Ke.prototype.visibleTiles = function(e, t, r) {
  var i = this._viewSize, n = this._tileSearcher;
  if (r = r || [], e.size(i), i.width === 0 || i.height === 0)
    return r;
  var a = this._closestTile(e, t), s = n.search(e, a, r);
  if (!s)
    throw new Error("Starting tile is not visible");
  return r;
};
Ke.Tile = Ke.prototype.Tile = J;
Ke.type = Ke.prototype.type = "flat";
J.type = J.prototype.type = "flat";
var wp = Ke, xp = qe, Mp = Jr, Ep = mr, Rn = yr, Tp = fn, bp = gr;
function ce(e, t) {
  this.z = e, this._geometry = t, this._level = t.levelList[e];
}
ce.prototype.rotX = function() {
  return 0;
};
ce.prototype.rotY = function() {
  return 0;
};
ce.prototype.centerX = function() {
  return 0.5;
};
ce.prototype.centerY = function() {
  return 0.5;
};
ce.prototype.scaleX = function() {
  return 1;
};
ce.prototype.scaleY = function() {
  return 1;
};
ce.prototype.parent = function() {
  return this.z === 0 ? null : new ce(this.z - 1, this._geometry);
};
ce.prototype.children = function(e) {
  return this.z === this._geometry.levelList.length - 1 ? null : (e = e || [], e.push(new ce(this.z + 1, this._geometry)), e);
};
ce.prototype.neighbors = function() {
  return [];
};
ce.prototype.hash = function() {
  return Mp(this.z);
};
ce.prototype.equals = function(e) {
  return this._geometry === e._geometry && this.z === e.z;
};
ce.prototype.cmp = function(e) {
  return Ep(this.z, e.z);
};
ce.prototype.str = function() {
  return "EquirectTile(" + tile.z + ")";
};
function jt(e) {
  this.constructor.super_.call(this, e), this._width = e.width;
}
xp(jt, Tp);
jt.prototype.width = function() {
  return this._width;
};
jt.prototype.height = function() {
  return this._width / 2;
};
jt.prototype.tileWidth = function() {
  return this._width;
};
jt.prototype.tileHeight = function() {
  return this._width / 2;
};
function lt(e) {
  if (bp(e) !== "array")
    throw new Error("Level list must be an array");
  this.levelList = Rn.makeLevelList(e, jt), this.selectableLevelList = Rn.makeSelectableLevelList(this.levelList);
}
lt.prototype.maxTileSize = function() {
  for (var e = 0, t = 0; t < this.levelList.length; t++) {
    var r = this.levelList[t];
    e = Math.max(e, r.tileWidth, r.tileHeight);
  }
  return e;
};
lt.prototype.levelTiles = function(e, t) {
  var r = this.levelList.indexOf(e);
  return t = t || [], t.push(new ce(r, this)), t;
};
lt.prototype.visibleTiles = function(e, t, r) {
  var i = new ce(this.levelList.indexOf(t), this);
  r = r || [], r.length = 0, r.push(i);
};
lt.Tile = lt.prototype.Tile = ce;
lt.type = lt.prototype.type = "equirect";
ce.type = ce.prototype.type = "equirect";
var Cp = lt;
function At(e, t, r) {
  return 2 * Math.atan(r * Math.tan(e / 2) / t);
}
function Sp(e, t, r) {
  return At(e, t, r);
}
function Pp(e, t, r) {
  return At(e, t, Math.sqrt(t * t + r * r));
}
function $p(e, t, r) {
  return At(e, r, t);
}
function Lp(e, t, r) {
  return At(e, r, Math.sqrt(t * t + r * r));
}
function Rp(e, t, r) {
  return At(e, Math.sqrt(t * t + r * r), t);
}
function Ap(e, t, r) {
  return At(e, Math.sqrt(t * t + r * r), r);
}
var Os = {
  convert: At,
  htov: Sp,
  htod: Pp,
  vtoh: $p,
  vtod: Lp,
  dtoh: Rp,
  dtov: Ap
};
function zp(e) {
  return typeof e == "number" && isFinite(e);
}
var un = zp;
function Op(e) {
  return e.toPrecision(15);
}
var dn = Op;
function Ip() {
  var e = arguments;
  return function(r) {
    for (var i = r, n = 0; n < e.length; n++) {
      var a = e[n];
      i = a.call(null, i);
    }
    return i;
  };
}
var Is = Ip, Dp = oe, ht = ye.mat4, me = ye.vec4, Ds = Kr, cr = Os, Ai = vt, ot = un, Et = qt, Ye = dn, Hp = Is, Fp = ne, Np = 0, Vp = 0, kp = 0, Wp = 0, Yp = 0, qp = Math.PI / 4, jp = 0, Xp = 0, An = 1e-6;
function I(e, t) {
  this._yaw = e && e.yaw != null ? e.yaw : kp, this._pitch = e && e.pitch != null ? e.pitch : Wp, this._roll = e && e.roll != null ? e.roll : Yp, this._fov = e && e.fov != null ? e.fov : qp, this._width = e && e.width != null ? e.width : Np, this._height = e && e.height != null ? e.height : Vp, this._projectionCenterX = e && e.projectionCenterX != null ? e.projectionCenterX : jp, this._projectionCenterY = e && e.projectionCenterY != null ? e.projectionCenterY : Xp, this._limiter = t || null, this._projMatrix = ht.create(), this._invProjMatrix = ht.create(), this._frustum = [
    me.create(),
    // left
    me.create(),
    // right
    me.create(),
    // bottom
    me.create(),
    // top
    me.create()
    // camera
  ], this._projectionChanged = !0, this._params = {}, this._fovs = {}, this._tmpVec = me.create(), this._update();
}
Dp(I);
I.prototype.destroy = function() {
  Fp(this);
};
I.prototype.yaw = function() {
  return this._yaw;
};
I.prototype.pitch = function() {
  return this._pitch;
};
I.prototype.roll = function() {
  return this._roll;
};
I.prototype.projectionCenterX = function() {
  return this._projectionCenterX;
};
I.prototype.projectionCenterY = function() {
  return this._projectionCenterY;
};
I.prototype.fov = function() {
  return this._fov;
};
I.prototype.width = function() {
  return this._width;
};
I.prototype.height = function() {
  return this._height;
};
I.prototype.size = function(e) {
  return e = e || {}, e.width = this._width, e.height = this._height, e;
};
I.prototype.parameters = function(e) {
  return e = e || {}, e.yaw = this._yaw, e.pitch = this._pitch, e.roll = this._roll, e.fov = this._fov, e;
};
I.prototype.limiter = function() {
  return this._limiter;
};
I.prototype.setYaw = function(e) {
  this._resetParams(), this._params.yaw = e, this._update(this._params);
};
I.prototype.setPitch = function(e) {
  this._resetParams(), this._params.pitch = e, this._update(this._params);
};
I.prototype.setRoll = function(e) {
  this._resetParams(), this._params.roll = e, this._update(this._params);
};
I.prototype.setFov = function(e) {
  this._resetParams(), this._params.fov = e, this._update(this._params);
};
I.prototype.setProjectionCenterX = function(e) {
  this._resetParams(), this._params.projectionCenterX = e, this._update(this._params);
};
I.prototype.setProjectionCenterY = function(e) {
  this._resetParams(), this._params.projectionCenterY = e, this._update(this._params);
};
I.prototype.offsetYaw = function(e) {
  this.setYaw(this._yaw + e);
};
I.prototype.offsetPitch = function(e) {
  this.setPitch(this._pitch + e);
};
I.prototype.offsetRoll = function(e) {
  this.setRoll(this._roll + e);
};
I.prototype.offsetFov = function(e) {
  this.setFov(this._fov + e);
};
I.prototype.setSize = function(e) {
  this._resetParams(), this._params.width = e.width, this._params.height = e.height, this._update(this._params);
};
I.prototype.setParameters = function(e) {
  this._resetParams(), this._params.yaw = e.yaw, this._params.pitch = e.pitch, this._params.roll = e.roll, this._params.fov = e.fov, this._params.projectionCenterX = e.projectionCenterX, this._params.projectionCenterY = e.projectionCenterY, this._update(this._params);
};
I.prototype.setLimiter = function(e) {
  this._limiter = e || null, this._update();
};
I.prototype._resetParams = function() {
  var e = this._params;
  e.yaw = null, e.pitch = null, e.roll = null, e.fov = null, e.width = null, e.height = null;
};
I.prototype._update = function(e) {
  e == null && (this._resetParams(), e = this._params);
  var t = this._yaw, r = this._pitch, i = this._roll, n = this._fov, a = this._projectionCenterX, s = this._projectionCenterY, o = this._width, h = this._height;
  if (e.yaw = e.yaw != null ? e.yaw : t, e.pitch = e.pitch != null ? e.pitch : r, e.roll = e.roll != null ? e.roll : i, e.fov = e.fov != null ? e.fov : n, e.width = e.width != null ? e.width : o, e.height = e.height != null ? e.height : h, e.projectionCenterX = e.projectionCenterX != null ? e.projectionCenterX : a, e.projectionCenterY = e.projectionCenterY != null ? e.projectionCenterY : s, this._limiter && (e = this._limiter(e), !e))
    throw new Error("Bad view limiter");
  e = this._normalize(e);
  var l = e.yaw, c = e.pitch, f = e.roll, u = e.fov, p = e.width, m = e.height, x = e.projectionCenterX, y = e.projectionCenterY;
  if (!ot(l) || !ot(c) || !ot(f) || !ot(u) || !ot(p) || !ot(m) || !ot(x) || !ot(y))
    throw new Error("Bad view - suspect a broken limiter");
  this._yaw = l, this._pitch = c, this._roll = f, this._fov = u, this._width = p, this._height = m, this._projectionCenterX = x, this._projectionCenterY = y, (l !== t || c !== r || f !== i || u !== n || p !== o || m !== h || x !== a || y !== s) && (this._projectionChanged = !0, this.emit("change")), (p !== o || m !== h) && this.emit("resize");
};
I.prototype._normalize = function(e) {
  this._normalizeCoordinates(e);
  var t = cr.htov(Math.PI, e.width, e.height), r = isNaN(t) ? Math.PI : Math.min(Math.PI, t);
  return e.fov = Et(e.fov, An, r - An), e;
};
I.prototype._normalizeCoordinates = function(e) {
  return "yaw" in e && (e.yaw = Ai(e.yaw - Math.PI, -2 * Math.PI) + Math.PI), "pitch" in e && (e.pitch = Ai(e.pitch - Math.PI, -2 * Math.PI) + Math.PI), "roll" in e && (e.roll = Ai(e.roll - Math.PI, -2 * Math.PI) + Math.PI), e;
};
I.prototype.normalizeToClosest = function(e, t) {
  var r = this._yaw, i = this._pitch, n = e.yaw, a = e.pitch, s = n - 2 * Math.PI, o = n + 2 * Math.PI;
  Math.abs(s - r) < Math.abs(n - r) ? n = s : Math.abs(o - r) < Math.abs(n - r) && (n = o);
  var h = a - 2 * Math.PI, l = a + 2 * Math.PI;
  return Math.abs(h - i) < Math.abs(a - i) ? a = h : Math.abs(h - i) < Math.abs(a - i) && (a = l), t = t || {}, t.yaw = n, t.pitch = a, t;
};
I.prototype.updateWithControlParameters = function(e) {
  var t = this._fov, r = cr.vtoh(t, this._width, this._height);
  isNaN(r) && (r = t), this.offsetYaw(e.axisScaledX * r + e.x * 2 * r + e.yaw), this.offsetPitch(e.axisScaledY * t + e.y * 2 * r + e.pitch), this.offsetRoll(-e.roll), this.offsetFov(e.zoom * t);
};
I.prototype._updateProjection = function() {
  var e = this._projMatrix, t = this._invProjMatrix, r = this._frustum;
  if (this._projectionChanged) {
    var i = this._width, n = this._height, a = this._fov, s = cr.vtoh(a, i, n), o = i / n, h = this._projectionCenterX, l = this._projectionCenterY;
    if (h !== 0 || l !== 0) {
      var c = Math.atan(h * 2 * Math.tan(s / 2)), f = Math.atan(l * 2 * Math.tan(a / 2)), u = this._fovs;
      u.leftDegrees = (s / 2 + c) * 180 / Math.PI, u.rightDegrees = (s / 2 - c) * 180 / Math.PI, u.upDegrees = (a / 2 + f) * 180 / Math.PI, u.downDegrees = (a / 2 - f) * 180 / Math.PI, ht.perspectiveFromFieldOfView(e, u, -1, 1);
    } else
      ht.perspective(e, a, o, -1, 1);
    ht.rotateZ(e, e, this._roll), ht.rotateX(e, e, this._pitch), ht.rotateY(e, e, this._yaw), ht.invert(t, e), this._matrixToFrustum(e, r), this._projectionChanged = !1;
  }
};
I.prototype._matrixToFrustum = function(e, t) {
  me.set(t[0], e[3] + e[0], e[7] + e[4], e[11] + e[8], 0), me.set(t[1], e[3] - e[0], e[7] - e[4], e[11] - e[8], 0), me.set(t[2], e[3] + e[1], e[7] + e[5], e[11] + e[9], 0), me.set(t[3], e[3] - e[1], e[7] - e[5], e[11] - e[9], 0), me.set(t[4], e[3] + e[2], e[7] + e[6], e[11] + e[10], 0);
};
I.prototype.projection = function() {
  return this._updateProjection(), this._projMatrix;
};
I.prototype.inverseProjection = function() {
  return this._updateProjection(), this._invProjMatrix;
};
I.prototype.intersects = function(e) {
  this._updateProjection();
  for (var t = this._frustum, r = this._tmpVec, i = 0; i < t.length; i++) {
    for (var n = t[i], a = !1, s = 0; s < e.length; s++) {
      var o = e[s];
      me.set(r, o[0], o[1], o[2], 0), me.dot(n, r) >= 0 && (a = !0);
    }
    if (!a)
      return !1;
  }
  return !0;
};
I.prototype.selectLevel = function(e) {
  for (var t = Ds() * this._height, r = Math.tan(0.5 * this._fov), i = 0; i < e.length; i++) {
    var n = e[i];
    if (r * n.height() >= t)
      return n;
  }
  return e[e.length - 1];
};
I.prototype.coordinatesToScreen = function(e, t) {
  var r = this._tmpVec;
  t || (t = {});
  var i = this._width, n = this._height;
  if (i <= 0 || n <= 0)
    return t.x = null, t.y = null, null;
  var a = e.yaw, s = e.pitch, o = Math.sin(a) * Math.cos(s), h = -Math.sin(s), l = -Math.cos(a) * Math.cos(s);
  if (me.set(r, o, h, l, 1), me.transformMat4(r, r, this.projection()), r[3] >= 0)
    t.x = i * (r[0] / r[3] + 1) / 2, t.y = n * (1 - r[1] / r[3]) / 2;
  else
    return t.x = null, t.y = null, null;
  return t;
};
I.prototype.screenToCoordinates = function(e, t) {
  var r = this._tmpVec;
  t || (t = {});
  var i = this._width, n = this._height, a = 2 * e.x / i - 1, s = 1 - 2 * e.y / n;
  me.set(r, a, s, 1, 1), me.transformMat4(r, r, this.inverseProjection());
  var o = Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2]);
  return t.yaw = Math.atan2(r[0], -r[2]), t.pitch = Math.acos(r[1] / o) - Math.PI / 2, this._normalizeCoordinates(t), t;
};
I.prototype.coordinatesToPerspectiveTransform = function(e, t, r) {
  r = r || "";
  var i = this._height, n = this._width, a = this._fov, s = 0.5 * i / Math.tan(a / 2), o = "";
  return o += "translateX(" + Ye(n / 2) + "px) ", o += "translateY(" + Ye(i / 2) + "px) ", o += "translateX(-50%) translateY(-50%) ", o += "perspective(" + Ye(s) + "px) ", o += "translateZ(" + Ye(s) + "px) ", o += "rotateZ(" + Ye(-this._roll) + "rad) ", o += "rotateX(" + Ye(-this._pitch) + "rad) ", o += "rotateY(" + Ye(this._yaw) + "rad) ", o += "rotateY(" + Ye(-e.yaw) + "rad) ", o += "rotateX(" + Ye(e.pitch) + "rad) ", o += "translateZ(" + Ye(-t) + "px) ", o += r + " ", o;
};
I.limit = {
  /**
   * Returns a view limiter that constrains the yaw angle.
   * @param {number} min The minimum yaw value.
   * @param {number} max The maximum yaw value.
   * @return {RectilinearViewLimiter}
   */
  yaw: function(e, t) {
    return function(i) {
      return i.yaw = Et(i.yaw, e, t), i;
    };
  },
  /**
   * Returns a view limiter that constrains the pitch angle.
   * @param {number} min The minimum pitch value.
   * @param {number} max The maximum pitch value.
   * @return {RectilinearViewLimiter}
   */
  pitch: function(e, t) {
    return function(i) {
      return i.pitch = Et(i.pitch, e, t), i;
    };
  },
  /**
   * Returns a view limiter that constrains the roll angle.
   * @param {number} min The minimum roll value.
   * @param {number} max The maximum roll value.
   * @return {RectilinearViewLimiter}
   */
  roll: function(e, t) {
    return function(i) {
      return i.roll = Et(i.roll, e, t), i;
    };
  },
  /**
   * Returns a view limiter that constrains the horizontal field of view.
   * @param {number} min The minimum horizontal field of view.
   * @param {number} max The maximum horizontal field of view.
   * @return {RectilinearViewLimiter}
   */
  hfov: function(e, t) {
    return function(i) {
      var n = i.width, a = i.height;
      if (n > 0 && a > 0) {
        var s = cr.htov(e, n, a), o = cr.htov(t, n, a);
        i.fov = Et(i.fov, s, o);
      }
      return i;
    };
  },
  /**
   * Returns a view limiter that constrains the vertical field of view.
   * @param {number} min The minimum vertical field of view.
   * @param {number} max The maximum vertical field of view.
   * @return {RectilinearViewLimiter}
   */
  vfov: function(e, t) {
    return function(i) {
      return i.fov = Et(i.fov, e, t), i;
    };
  },
  /**
   * Returns a view limiter that prevents zooming in beyond the given
   * resolution.
   * @param {number} size The cube face width in pixels or, equivalently, one
   *     fourth of the equirectangular width in pixels.
   * @return {RectilinearViewLimiter}
   */
  resolution: function(e) {
    return function(r) {
      var i = r.height;
      if (i) {
        var n = Ds() * i, a = 2 * Math.atan(n / e);
        r.fov = Et(r.fov, a, 1 / 0);
      }
      return r;
    };
  },
  /**
   * Returns a view limiter that limits the horizontal and vertical field of
   * view, prevents zooming in past the image resolution, and limits the pitch
   * range to prevent the camera wrapping around at the poles. These are the
   * most common view constraints for a 360° panorama.
   * @param {number} maxResolution The cube face width in pixels or,
   *     equivalently, one fourth of the equirectangular width in pixels.
   * @param {number} maxVFov The maximum vertical field of view.
   * @param {number} [maxHFov=maxVFov] The maximum horizontal field of view.
   * @return {RectilinearViewLimiter}
   */
  traditional: function(e, t, r) {
    return r = r ?? t, Hp(
      I.limit.resolution(e),
      I.limit.vfov(0, t),
      I.limit.hfov(0, r),
      I.limit.pitch(-Math.PI / 2, Math.PI / 2)
    );
  }
};
I.type = I.prototype.type = "rectilinear";
var Up = I, Bp = oe, Gr = ye.mat4, vr = ye.vec4, Hs = Kr, Vt = un, Ge = qt, Gp = ne, Zp = 0, Kp = 0, Fs = 0.5, Ns = 0.5, Qp = 1, Jp = [
  1,
  // top
  0,
  // right
  1,
  // bottom
  0
  // left
], e_ = [
  -1,
  // top
  -1,
  // right
  1,
  // bottom
  1
  // left
], t_ = 1e-6;
function j(e, t) {
  if (!(e && e.mediaAspectRatio != null))
    throw new Error("mediaAspectRatio must be defined");
  this._x = e && e.x != null ? e.x : Fs, this._y = e && e.y != null ? e.y : Ns, this._zoom = e && e.zoom != null ? e.zoom : Qp, this._mediaAspectRatio = e.mediaAspectRatio, this._width = e && e.width != null ? e.width : Zp, this._height = e && e.height != null ? e.height : Kp, this._limiter = t || null, this._projMatrix = Gr.create(), this._invProjMatrix = Gr.create(), this._frustum = [
    0,
    // top
    0,
    // right
    0,
    // bottom
    0
    // left
  ], this._projectionChanged = !0, this._params = {}, this._vec = vr.create(), this._update();
}
Bp(j);
j.prototype.destroy = function() {
  Gp(this);
};
j.prototype.x = function() {
  return this._x;
};
j.prototype.y = function() {
  return this._y;
};
j.prototype.zoom = function() {
  return this._zoom;
};
j.prototype.mediaAspectRatio = function() {
  return this._mediaAspectRatio;
};
j.prototype.width = function() {
  return this._width;
};
j.prototype.height = function() {
  return this._height;
};
j.prototype.size = function(e) {
  return e = e || {}, e.width = this._width, e.height = this._height, e;
};
j.prototype.parameters = function(e) {
  return e = e || {}, e.x = this._x, e.y = this._y, e.zoom = this._zoom, e.mediaAspectRatio = this._mediaAspectRatio, e;
};
j.prototype.limiter = function() {
  return this._limiter;
};
j.prototype.setX = function(e) {
  this._resetParams(), this._params.x = e, this._update(this._params);
};
j.prototype.setY = function(e) {
  this._resetParams(), this._params.y = e, this._update(this._params);
};
j.prototype.setZoom = function(e) {
  this._resetParams(), this._params.zoom = e, this._update(this._params);
};
j.prototype.offsetX = function(e) {
  this.setX(this._x + e);
};
j.prototype.offsetY = function(e) {
  this.setY(this._y + e);
};
j.prototype.offsetZoom = function(e) {
  this.setZoom(this._zoom + e);
};
j.prototype.setMediaAspectRatio = function(e) {
  this._resetParams(), this._params.mediaAspectRatio = e, this._update(this._params);
};
j.prototype.setSize = function(e) {
  this._resetParams(), this._params.width = e.width, this._params.height = e.height, this._update(this._params);
};
j.prototype.setParameters = function(e) {
  this._resetParams(), this._params.x = e.x, this._params.y = e.y, this._params.zoom = e.zoom, this._params.mediaAspectRatio = e.mediaAspectRatio, this._update(this._params);
};
j.prototype.setLimiter = function(e) {
  this._limiter = e || null, this._update();
};
j.prototype._resetParams = function() {
  var e = this._params;
  e.x = null, e.y = null, e.zoom = null, e.mediaAspectRatio = null, e.width = null, e.height = null;
};
j.prototype._update = function(e) {
  e == null && (this._resetParams(), e = this._params);
  var t = this._x, r = this._y, i = this._zoom, n = this._mediaAspectRatio, a = this._width, s = this._height;
  if (e.x = e.x != null ? e.x : t, e.y = e.y != null ? e.y : r, e.zoom = e.zoom != null ? e.zoom : i, e.mediaAspectRatio = e.mediaAspectRatio != null ? e.mediaAspectRatio : n, e.width = e.width != null ? e.width : a, e.height = e.height != null ? e.height : s, this._limiter && (e = this._limiter(e), !e))
    throw new Error("Bad view limiter");
  var o = e.x, h = e.y, l = e.zoom, c = e.mediaAspectRatio, f = e.width, u = e.height;
  if (!Vt(o) || !Vt(h) || !Vt(l) || !Vt(c) || !Vt(f) || !Vt(u))
    throw new Error("Bad view - suspect a broken limiter");
  l = Ge(l, t_, 1 / 0), this._x = o, this._y = h, this._zoom = l, this._mediaAspectRatio = c, this._width = f, this._height = u, (o !== t || h !== r || l !== i || c !== n || f !== a || u !== s) && (this._projectionChanged = !0, this.emit("change")), (f !== a || u !== s) && this.emit("resize");
};
j.prototype._zoomX = function() {
  return this._zoom;
};
j.prototype._zoomY = function() {
  var e = this._mediaAspectRatio, t = this._width / this._height, r = this._zoom, i = r * e / t;
  return isNaN(i) && (i = r), i;
};
j.prototype.updateWithControlParameters = function(e) {
  var t = this.zoom(), r = this._zoomX(), i = this._zoomY();
  this.offsetX(e.axisScaledX * r + e.x * t), this.offsetY(e.axisScaledY * i + e.y * t), this.offsetZoom(e.zoom * t);
};
j.prototype._updateProjection = function() {
  var e = this._projMatrix, t = this._invProjMatrix, r = this._frustum;
  if (this._projectionChanged) {
    var i = this._x, n = this._y, a = this._zoomX(), s = this._zoomY(), o = r[0] = 0.5 - n + 0.5 * s, h = r[1] = i - 0.5 + 0.5 * a, l = r[2] = 0.5 - n - 0.5 * s, c = r[3] = i - 0.5 - 0.5 * a;
    Gr.ortho(e, c, h, l, o, -1, 1), Gr.invert(t, e), this._projectionChanged = !1;
  }
};
j.prototype.projection = function() {
  return this._updateProjection(), this._projMatrix;
};
j.prototype.inverseProjection = function() {
  return this._updateProjection(), this._invProjMatrix;
};
j.prototype.intersects = function(e) {
  this._updateProjection();
  for (var t = this._frustum, r = 0; r < t.length; r++) {
    for (var i = t[r], n = Jp[r], a = e_[r], s = !1, o = 0; o < e.length; o++) {
      var h = e[o];
      if (a < 0 && h[n] < i || a > 0 && h[n] > i) {
        s = !0;
        break;
      }
    }
    if (!s)
      return !1;
  }
  return !0;
};
j.prototype.selectLevel = function(e) {
  for (var t = Hs() * this.width(), r = this._zoom, i = 0; i < e.length; i++) {
    var n = e[i];
    if (r * n.width() >= t)
      return n;
  }
  return e[e.length - 1];
};
j.prototype.coordinatesToScreen = function(e, t) {
  var r = this._vec;
  t || (t = {});
  var i = this._width, n = this._height;
  if (i <= 0 || n <= 0)
    return t.x = null, t.y = null, null;
  var a = e && e.x != null ? e.x : Fs, s = e && e.y != null ? e.y : Ns;
  vr.set(r, a - 0.5, 0.5 - s, -1, 1), vr.transformMat4(r, r, this.projection());
  for (var o = 0; o < 3; o++)
    r[o] /= r[3];
  return t.x = i * (r[0] + 1) / 2, t.y = n * (1 - r[1]) / 2, t;
};
j.prototype.screenToCoordinates = function(e, t) {
  var r = this._vec;
  t || (t = {});
  var i = this._width, n = this._height, a = 2 * e.x / i - 1, s = 1 - 2 * e.y / n;
  return vr.set(r, a, s, 1, 1), vr.transformMat4(r, r, this.inverseProjection()), t.x = 0.5 + r[0], t.y = 0.5 - r[1], t;
};
j.limit = {
  /**
   * Returns a view limiter that constrains the x parameter.
   * @param {number} min The minimum x value.
   * @param {number} max The maximum y value.
   * @return {FlatViewLimiter}
   */
  x: function(e, t) {
    return function(i) {
      return i.x = Ge(i.x, e, t), i;
    };
  },
  /**
   * Return a view limiter that constrains the y parameter.
   * @param {number} min The minimum y value.
   * @param {number} max The maximum y value.
   * @return {FlatViewLimiter}
   */
  y: function(e, t) {
    return function(i) {
      return i.y = Ge(i.y, e, t), i;
    };
  },
  /**
   * Returns a view limiter than constrains the zoom parameter.
   * @param {number} min The minimum zoom value.
   * @param {number} max The maximum zoom value.
   * @return {FlatViewLimiter}
   */
  zoom: function(e, t) {
    return function(i) {
      return i.zoom = Ge(i.zoom, e, t), i;
    };
  },
  /**
   * Returns a view limiter that prevents zooming in beyond the given
   * resolution.
   * @param {number} size The image width in pixels.
   * @return {FlatViewLimiter}
   */
  resolution: function(e) {
    return function(r) {
      if (r.width <= 0 || r.height <= 0)
        return r;
      var i = r.width, n = Hs() * i / e;
      return r.zoom = Ge(r.zoom, n, 1 / 0), r;
    };
  },
  /**
   * Returns a view limiter that constrains the values of the x parameter that
   * are inside the viewport.
   * @param {number} min The minimum x value.
   * @param {number} max The maximum x value.
   * @return {FlatViewLimiter}
   */
  visibleX: function(e, t) {
    return function(i) {
      var n = t - e;
      i.zoom > n && (i.zoom = n);
      var a = e + 0.5 * i.zoom, s = t - 0.5 * i.zoom;
      return i.x = Ge(i.x, a, s), i;
    };
  },
  /**
   * Returns a view limiter that constrains the values of the y parameter that
   * are inside the viewport.
   * @param {number} min The minimum y value.
   * @param {number} max The maximum y value.
   * @return {FlatViewLimiter}
   */
  visibleY: function(e, t) {
    return function(i) {
      if (i.width <= 0 || i.height <= 0)
        return i;
      var n = i.width / i.height, a = n / i.mediaAspectRatio, s = (t - e) * a;
      i.zoom > s && (i.zoom = s);
      var o = e + 0.5 * i.zoom / a, h = t - 0.5 * i.zoom / a;
      return i.y = Ge(i.y, o, h), i;
    };
  },
  /**
   * Returns a view limiter that constrains the zoom parameter such that
   * zooming out is prevented beyond the point at which the image is fully
   * visible. Unless the image and the viewport have the same aspect ratio,
   * this will cause bands to appear around the image.
   * @return {FlatViewLimiter}
   */
  letterbox: function() {
    return function(t) {
      if (t.width <= 0 || t.height <= 0)
        return t;
      var r = t.width / t.height, i = 1, n = r / t.mediaAspectRatio;
      t.mediaAspectRatio >= r && (t.zoom = Math.min(t.zoom, i)), t.mediaAspectRatio <= r && (t.zoom = Math.min(t.zoom, n));
      var a, s;
      t.zoom > i ? a = s = 0.5 : (a = 0 + 0.5 * t.zoom / i, s = 1 - 0.5 * t.zoom / i);
      var o, h;
      return t.zoom > n ? o = h = 0.5 : (o = 0 + 0.5 * t.zoom / n, h = 1 - 0.5 * t.zoom / n), t.x = Ge(t.x, a, s), t.y = Ge(t.y, o, h), t;
    };
  }
};
j.type = j.prototype.type = "flat";
var r_ = j, i_ = Jn, n_ = vt;
function wr(e) {
  this._concurrency = e && e.concurrency || 1, this._paused = e && !!e.paused || !1, this._pool = [];
  for (var t = 0; t < this._concurrency; t++)
    this._pool.push(new i_(e));
  this._next = 0;
}
wr.prototype.length = function() {
  for (var e = 0, t = 0; t < this._pool.length; t++)
    e += this._pool[t].length();
  return e;
};
wr.prototype.push = function(e, t) {
  var r = this._next, i = this._pool[r].push(e, t);
  return this._next = n_(this._next + 1, this._concurrency), i;
};
wr.prototype.pause = function() {
  if (!this._paused) {
    this._paused = !0;
    for (var e = 0; e < this._concurrency; e++)
      this._pool[e].pause();
  }
};
wr.prototype.resume = function() {
  if (this._paused) {
    this._paused = !1;
    for (var e = 0; e < this._concurrency; e++)
      this._pool[e].resume();
  }
};
var a_ = wr;
function s_() {
}
var xr = s_, o_ = xr;
function h_() {
  var e = Array.prototype.slice.call(arguments, 0);
  return function() {
    var r = e.slice(0), i = null, n = null, a = arguments.length ? Array.prototype.slice.call(arguments, 0, arguments.length - 1) : [], s = arguments.length ? arguments[arguments.length - 1] : o_;
    function o() {
      var l = arguments[0];
      if (l) {
        i = n = null, s.apply(null, arguments);
        return;
      }
      if (!r.length) {
        i = n = null, s.apply(null, arguments);
        return;
      }
      i = r.shift();
      var c = i, f = Array.prototype.slice.call(arguments, 1);
      f.push(o);
      var u = i.apply(null, f);
      if (c === i) {
        if (typeof u != "function")
          throw new Error("chain: chaining on non-cancellable function");
        n = u;
      }
    }
    function h() {
      n && n.apply(null, arguments);
    }
    return a.unshift(null), o.apply(null, a), h;
  };
}
var pn = h_;
function l_(e, t) {
  var r = null;
  function i() {
    r != null && (r = null, t(null));
  }
  function n() {
    r != null && (clearTimeout(r), r = null, t.apply(null, arguments));
  }
  return r = setTimeout(i, e), n;
}
var Vs = l_, c_ = oe, v_ = aa, f_ = a_, u_ = pn, d_ = Vs, zn = Pt, On = {
  x: "x",
  y: "y",
  z: "z",
  f: "face"
}, p_ = "bdflru", __ = 4, m_ = 1e4;
function fr(e, t) {
  t = t || {}, this._loadPool = new f_({
    concurrency: t.concurrency || __
  }), this._retryDelay = t.retryDelay || m_, this._retryMap = {}, this._sourceFromTile = e;
}
c_(fr);
fr.prototype.loadAsset = function(e, t, r) {
  var i = this, n = this._retryDelay, a = this._retryMap, s = this._sourceFromTile(t), o = s.url, h = s.rect, l = e.loadImage.bind(e, o, h), c = function(y) {
    return i._loadPool.push(l, function(M, b) {
      M ? (M instanceof v_ && (a[o] = zn(), i.emit("networkError", M, t)), y(M, t)) : (delete a[o], y(null, t, b));
    });
  }, f, u = a[o];
  if (u != null) {
    var p = zn(), m = p - u;
    m < n ? f = n - m : (f = 0, delete a[o]);
  }
  var x = d_.bind(null, f);
  return u_(x, c)(r);
};
fr.fromString = function(e, t) {
  t = t || {};
  var r = t && t.cubeMapPreviewFaceOrder || p_, i = t.cubeMapPreviewUrl ? a : n;
  return new fr(i, t);
  function n(o) {
    var h = e;
    for (var l in On) {
      var c = On[l], f = y_(l), u = o.hasOwnProperty(c) ? o[c] : "";
      h = h.replace(f, u);
    }
    return { url: h };
  }
  function a(o) {
    return o.z === 0 ? s(o) : n(o);
  }
  function s(o) {
    var h = r.indexOf(o.face) / 6;
    return {
      url: t.cubeMapPreviewUrl,
      rect: { x: 0, y: h, width: 1, height: 1 / 6 }
    };
  }
};
function y_(e) {
  var t = "\\{(" + e + ")\\}";
  return new RegExp(t, "g");
}
var g_ = fr;
function _n(e) {
  this._asset = e;
}
_n.prototype.asset = function() {
  return this._asset;
};
_n.prototype.loadAsset = function(e, t, r) {
  var i = this, n = setTimeout(function() {
    r(null, t, i._asset);
  }, 0);
  function a() {
    clearTimeout(n), r.apply(null, arguments);
  }
  return a;
};
var w_ = _n, x_ = Gi, M_ = qe, E_ = oe, T_ = ne;
function zt(e) {
  this.constructor.super_.call(this, e), this._timestamp = 0;
}
M_(zt, x_);
E_(zt);
zt.prototype.destroy = function() {
  T_(this);
};
zt.prototype.timestamp = function() {
  return this._timestamp;
};
zt.prototype.isDynamic = function() {
  return !0;
};
zt.prototype.markDirty = function() {
  this._timestamp++, this.emit("change");
};
var b_ = zt, ti = vt, C_ = 64;
function ft(e) {
  if (e != null && (!isFinite(e) || Math.floor(e) !== e || e < 1))
    throw new Error("Map: invalid capacity");
  this._capacity = e || C_, this._keyBuckets = [], this._valBuckets = [];
  for (var t = 0; t < this._capacity; t++)
    this._keyBuckets.push([]), this._valBuckets.push([]);
  this._size = 0;
}
ft.prototype.get = function(e) {
  for (var t = ti(e.hash(), this._capacity), r = this._keyBuckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n)) {
      var a = this._valBuckets[t], s = a[i];
      return s;
    }
  }
  return null;
};
ft.prototype.set = function(e, t) {
  for (var r = ti(e.hash(), this._capacity), i = this._keyBuckets[r], n = this._valBuckets[r], a = 0; a < i.length; a++) {
    var s = i[a];
    if (e.equals(s)) {
      var o = n[a];
      return i[a] = e, n[a] = t, o;
    }
  }
  return i.push(e), n.push(t), this._size++, null;
};
ft.prototype.del = function(e) {
  for (var t = ti(e.hash(), this._capacity), r = this._keyBuckets[t], i = this._valBuckets[t], n = 0; n < r.length; n++) {
    var a = r[n];
    if (e.equals(a)) {
      for (var s = i[n], o = n; o < r.length - 1; o++)
        r[o] = r[o + 1], i[o] = i[o + 1];
      return r.length = r.length - 1, i.length = i.length - 1, this._size--, s;
    }
  }
  return null;
};
ft.prototype.has = function(e) {
  for (var t = ti(e.hash(), this._capacity), r = this._keyBuckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n))
      return !0;
  }
  return !1;
};
ft.prototype.size = function() {
  return this._size;
};
ft.prototype.clear = function() {
  for (var e = 0; e < this._capacity; e++)
    this._keyBuckets[e].length = 0, this._valBuckets[e].length = 0;
  this._size = 0;
};
ft.prototype.forEach = function(e) {
  for (var t = 0, r = 0; r < this._capacity; r++)
    for (var i = this._keyBuckets[r], n = this._valBuckets[r], a = 0; a < i.length; a++)
      e(i[a], n[a]), t += 1;
  return t;
};
var S_ = ft, P_ = vt;
function ut(e) {
  if (!isFinite(e) || Math.floor(e) !== e || e < 0)
    throw new Error("LruSet: invalid capacity");
  this._capacity = e, this._elements = new Array(this._capacity), this._start = 0, this._size = 0;
}
ut.prototype._index = function(e) {
  return P_(this._start + e, this._capacity);
};
ut.prototype.add = function(e) {
  if (this._capacity === 0)
    return e;
  this.remove(e);
  var t = this._size === this._capacity ? this._elements[this._index(0)] : null;
  return this._elements[this._index(this._size)] = e, this._size < this._capacity ? this._size++ : this._start = this._index(1), t;
};
ut.prototype.remove = function(e) {
  for (var t = 0; t < this._size; t++) {
    var r = this._elements[this._index(t)];
    if (e.equals(r)) {
      for (var i = t; i < this._size - 1; i++)
        this._elements[this._index(i)] = this._elements[this._index(i + 1)];
      return this._size--, r;
    }
  }
  return null;
};
ut.prototype.has = function(e) {
  for (var t = 0; t < this._size; t++)
    if (e.equals(this._elements[this._index(t)]))
      return !0;
  return !1;
};
ut.prototype.size = function() {
  return this._size;
};
ut.prototype.clear = function() {
  this._elements.length = 0, this._start = 0, this._size = 0;
};
ut.prototype.forEach = function(e) {
  for (var t = 0, r = 0; r < this._size; r++)
    e(this._elements[this._index(r)]), t += 1;
  return t;
};
var $_ = ut;
function L_(e, t) {
  for (var r in t)
    r in e || (e[r] = t[r]);
  return e;
}
var Ue = L_, R_ = xr;
function A_(e) {
  return function() {
    var r = arguments.length ? Array.prototype.slice.call(arguments, 0, arguments.length - 1) : [], i = arguments.length ? arguments[arguments.length - 1] : R_, n = null, a = !1;
    function s() {
      var o = arguments[0];
      !o || a ? i.apply(null, arguments) : n = e.apply(null, r);
    }
    return r.push(s), s(!0), function() {
      a = !0, n.apply(null, arguments);
    };
  };
}
var ks = A_, In = S_, Dn = Ls, z_ = $_, Ws = oe, O_ = Ue, I_ = ks, D_ = pn, H_ = qe, Ys = ne, hr = typeof MARZIPANODEBUG < "u" && MARZIPANODEBUG.textureStore, Oe = {
  IDLE: 0,
  START: 1,
  MARK: 2,
  END: 3
}, F_ = {
  // Maximum number of cached textures for previously visible tiles.
  previouslyVisibleCacheSize: 512
}, N_ = 0;
function mn() {
}
H_(mn, Error);
function Mr(e, t) {
  var r = this, i = N_++;
  r._id = i, r._store = e, r._tile = t, r._asset = null, r._texture = null, r._changeHandler = function() {
    e.emit("textureInvalid", t);
  };
  var n = e.source(), a = e.stage(), s = n.loadAsset.bind(n), o = a.createTexture.bind(a), h = D_(I_(s), o);
  e.emit("textureStartLoad", t), hr && console.log("loading", i, t), r._cancel = h(a, t, function(l, c, f, u) {
    if (r._cancel = null, l) {
      f && f.destroy(), u && u.destroy(), l instanceof mn ? (e.emit("textureCancel", t), hr && console.log("cancel", i, t)) : (e.emit("textureError", t, l), hr && console.log("error", i, t));
      return;
    }
    r._texture = u, f.isDynamic() ? (r._asset = f, f.addEventListener("change", r._changeHandler)) : f.destroy(), e.emit("textureLoad", t), hr && console.log("load", i, t);
  });
}
Mr.prototype.asset = function() {
  return this._asset;
};
Mr.prototype.texture = function() {
  return this._texture;
};
Mr.prototype.destroy = function() {
  var e = this._id, t = this._store, r = this._tile, i = this._asset, n = this._texture, a = this._cancel;
  if (a) {
    a(new mn());
    return;
  }
  i && (i.removeEventListener("change", this._changeHandler), i.destroy()), n && n.destroy(), t.emit("textureUnload", r), hr && console.log("unload", e, r), Ys(this);
};
Ws(Mr);
function de(e, t, r) {
  r = O_(r || {}, F_), this._source = e, this._stage = t, this._state = Oe.IDLE, this._delimCount = 0, this._itemMap = new In(), this._visible = new Dn(), this._previouslyVisible = new z_(r.previouslyVisibleCacheSize), this._pinMap = new In(), this._newVisible = new Dn(), this._noLongerVisible = [], this._visibleAgain = [], this._evicted = [];
}
Ws(de);
de.prototype.destroy = function() {
  this.clear(), Ys(this);
};
de.prototype.stage = function() {
  return this._stage;
};
de.prototype.source = function() {
  return this._source;
};
de.prototype.clear = function() {
  var e = this;
  e._evicted.length = 0, e._itemMap.forEach(function(t) {
    e._evicted.push(t);
  }), e._evicted.forEach(function(t) {
    e._unloadTile(t);
  }), e._itemMap.clear(), e._visible.clear(), e._previouslyVisible.clear(), e._pinMap.clear(), e._newVisible.clear(), e._noLongerVisible.length = 0, e._visibleAgain.length = 0, e._evicted.length = 0;
};
de.prototype.clearNotPinned = function() {
  var e = this;
  e._evicted.length = 0, e._itemMap.forEach(function(t) {
    e._pinMap.has(t) || e._evicted.push(t);
  }), e._evicted.forEach(function(t) {
    e._unloadTile(t);
  }), e._visible.clear(), e._previouslyVisible.clear(), e._evicted.length = 0;
};
de.prototype.startFrame = function() {
  if (this._state !== Oe.IDLE && this._state !== Oe.START)
    throw new Error("TextureStore: startFrame called out of sequence");
  this._state = Oe.START, this._delimCount++;
};
de.prototype.markTile = function(e) {
  if (this._state !== Oe.START && this._state !== Oe.MARK)
    throw new Error("TextureStore: markTile called out of sequence");
  this._state = Oe.MARK;
  var t = this._itemMap.get(e), r = t && t.texture(), i = t && t.asset();
  r && i && r.refresh(e, i), this._newVisible.add(e);
};
de.prototype.endFrame = function() {
  if (this._state !== Oe.START && this._state !== Oe.MARK && this._state !== Oe.END)
    throw new Error("TextureStore: endFrame called out of sequence");
  this._state = Oe.END, this._delimCount--, this._delimCount || (this._update(), this._state = Oe.IDLE);
};
de.prototype._update = function() {
  var e = this;
  e._noLongerVisible.length = 0, e._visible.forEach(function(r) {
    e._newVisible.has(r) || e._noLongerVisible.push(r);
  }), e._visibleAgain.length = 0, e._newVisible.forEach(function(r) {
    e._previouslyVisible.has(r) && e._visibleAgain.push(r);
  }), e._visibleAgain.forEach(function(r) {
    e._previouslyVisible.remove(r);
  }), e._evicted.length = 0, e._noLongerVisible.forEach(function(r) {
    var i = e._itemMap.get(r), n = i && i.texture();
    if (n) {
      var a = e._previouslyVisible.add(r);
      a != null && e._evicted.push(a);
    } else
      i && e._unloadTile(r);
  }), e._evicted.forEach(function(r) {
    e._pinMap.has(r) || e._unloadTile(r);
  }), e._newVisible.forEach(function(r) {
    var i = e._itemMap.get(r);
    i || e._loadTile(r);
  });
  var t = e._visible;
  e._visible = e._newVisible, e._newVisible = t, e._newVisible.clear(), e._noLongerVisible.length = 0, e._visibleAgain.length = 0, e._evicted.length = 0;
};
de.prototype._loadTile = function(e) {
  if (this._itemMap.has(e))
    throw new Error("TextureStore: loading texture already in cache");
  var t = new Mr(this, e);
  this._itemMap.set(e, t);
};
de.prototype._unloadTile = function(e) {
  var t = this._itemMap.del(e);
  if (!t)
    throw new Error("TextureStore: unloading texture not in cache");
  t.destroy();
};
de.prototype.asset = function(e) {
  var t = this._itemMap.get(e);
  return t ? t.asset() : null;
};
de.prototype.texture = function(e) {
  var t = this._itemMap.get(e);
  return t ? t.texture() : null;
};
de.prototype.pin = function(e) {
  var t = (this._pinMap.get(e) || 0) + 1;
  return this._pinMap.set(e, t), this._itemMap.has(e) || this._loadTile(e), t;
};
de.prototype.unpin = function(e) {
  var t = this._pinMap.get(e);
  if (t)
    t--, t > 0 ? this._pinMap.set(e, t) : (this._pinMap.del(e), !this._visible.has(e) && !this._previouslyVisible.has(e) && this._unloadTile(e));
  else
    throw new Error("TextureStore: unpin when not pinned");
  return t;
};
de.prototype.query = function(e) {
  var t = this._itemMap.get(e), r = this._pinMap.get(e) || 0;
  return {
    visible: this._visible.has(e),
    previouslyVisible: this._previouslyVisible.has(e),
    hasAsset: t != null && t.asset() != null,
    hasTexture: t != null && t.texture() != null,
    pinned: r !== 0,
    pinCount: r
  };
};
var qs = de;
function V_(e, t) {
  for (var r in t)
    e[r] = t[r];
  return e;
}
var js = V_, k_ = oe, W_ = js, Y_ = ne;
function pe(e, t, r, i, n) {
  n = n || {};
  var a = this;
  this._source = e, this._geometry = t, this._view = r, this._textureStore = i, this._effects = n.effects || {}, this._fixedLevelIndex = null, this._viewChangeHandler = function() {
    a.emit("viewChange", a.view());
  }, this._view.addEventListener("change", this._viewChangeHandler), this._textureStoreChangeHandler = function() {
    a.emit("textureStoreChange", a.textureStore());
  }, this._textureStore.addEventListener(
    "textureLoad",
    this._textureStoreChangeHandler
  ), this._textureStore.addEventListener(
    "textureError",
    this._textureStoreChangeHandler
  ), this._textureStore.addEventListener(
    "textureInvalid",
    this._textureStoreChangeHandler
  );
}
k_(pe);
pe.prototype.destroy = function() {
  this._view.removeEventListener("change", this._viewChangeHandler), this._textureStore.removeEventListener(
    "textureLoad",
    this._textureStoreChangeHandler
  ), this._textureStore.removeEventListener(
    "textureError",
    this._textureStoreChangeHandler
  ), this._textureStore.removeEventListener(
    "textureInvalid",
    this._textureStoreChangeHandler
  ), Y_(this);
};
pe.prototype.source = function() {
  return this._source;
};
pe.prototype.geometry = function() {
  return this._geometry;
};
pe.prototype.view = function() {
  return this._view;
};
pe.prototype.textureStore = function() {
  return this._textureStore;
};
pe.prototype.effects = function() {
  return this._effects;
};
pe.prototype.setEffects = function(e) {
  this._effects = e, this.emit("effectsChange", this._effects);
};
pe.prototype.mergeEffects = function(e) {
  W_(this._effects, e), this.emit("effectsChange", this._effects);
};
pe.prototype.fixedLevel = function() {
  return this._fixedLevelIndex;
};
pe.prototype.setFixedLevel = function(e) {
  if (e !== this._fixedLevelIndex) {
    if (e != null && (e >= this._geometry.levelList.length || e < 0))
      throw new Error("Level index out of range: " + e);
    this._fixedLevelIndex = e, this.emit("fixedLevelChange", this._fixedLevelIndex);
  }
};
pe.prototype._selectLevel = function() {
  var e;
  return this._fixedLevelIndex != null ? e = this._geometry.levelList[this._fixedLevelIndex] : e = this._view.selectLevel(this._geometry.selectableLevelList), e;
};
pe.prototype.visibleTiles = function(e) {
  var t = this._selectLevel();
  return this._geometry.visibleTiles(this._view, t, e);
};
pe.prototype.pinLevel = function(e) {
  for (var t = this._geometry.levelList[e], r = this._geometry.levelTiles(t), i = 0; i < r.length; i++)
    this._textureStore.pin(r[i]);
};
pe.prototype.unpinLevel = function(e) {
  for (var t = this._geometry.levelList[e], r = this._geometry.levelTiles(t), i = 0; i < r.length; i++)
    this._textureStore.unpin(r[i]);
};
pe.prototype.pinFirstLevel = function() {
  return this.pinLevel(0);
};
pe.prototype.unpinFirstLevel = function() {
  return this.unpinLevel(0);
};
var Xs = pe, q_ = oe, j_ = ne;
function dt(e) {
  var t = this;
  this._stage = e, this._running = !1, this._rendering = !1, this._requestHandle = null, this._boundLoop = this._loop.bind(this), this._renderInvalidHandler = function() {
    t._rendering || t.renderOnNextFrame();
  }, this._stage.addEventListener("renderInvalid", this._renderInvalidHandler);
}
q_(dt);
dt.prototype.destroy = function() {
  this.stop(), this._stage.removeEventListener("renderInvalid", this._renderInvalidHandler), j_(this);
};
dt.prototype.stage = function() {
  return this._stage;
};
dt.prototype.start = function() {
  this._running = !0, this.renderOnNextFrame();
};
dt.prototype.stop = function() {
  this._requestHandle && (window.cancelAnimationFrame(this._requestHandle), this._requestHandle = null), this._running = !1;
};
dt.prototype.renderOnNextFrame = function() {
  this._running && !this._requestHandle && (this._requestHandle = window.requestAnimationFrame(this._boundLoop));
};
dt.prototype._loop = function() {
  if (!this._running)
    throw new Error("Render loop running while in stopped state");
  this._requestHandle = null, this._rendering = !0, this.emit("beforeRender"), this._rendering = !1, this._stage.render(), this.emit("afterRender");
};
var Us = dt;
function Qe() {
  this.velocity = null, this.friction = null, this.offset = null;
}
Qe.equals = function(e, t) {
  return e.velocity === t.velocity && e.friction === t.friction && e.offset === t.offset;
};
Qe.prototype.equals = function(e) {
  return Qe.equals(this, e);
};
Qe.prototype.update = function(e, t) {
  e.offset && (this.offset = this.offset || 0, this.offset += e.offset);
  var r = this.offsetFromVelocity(t);
  r && (this.offset = this.offset || 0, this.offset += r), this.velocity = e.velocity, this.friction = e.friction;
};
Qe.prototype.reset = function() {
  this.velocity = null, this.friction = null, this.offset = null;
};
Qe.prototype.velocityAfter = function(e) {
  return this.velocity ? this.friction ? X_(this.velocity, this.friction * e) : this.velocity : null;
};
Qe.prototype.offsetFromVelocity = function(e) {
  e = Math.min(e, this.nullVelocityTime());
  var t = this.velocityAfter(e), r = (this.velocity + t) / 2;
  return r * e;
};
Qe.prototype.nullVelocityTime = function() {
  return this.velocity == null ? 0 : this.velocity && !this.friction ? 1 / 0 : Math.abs(this.velocity / this.friction);
};
function X_(e, t) {
  return e < 0 ? Math.min(0, e + t) : e > 0 ? Math.max(0, e - t) : 0;
}
var tt = Qe, U_ = oe, B_ = tt, G_ = ne;
function Xt(e, t, r, i, n) {
  if (!e)
    throw new Error("KeyControlMethod: keyCode must be defined");
  if (!t)
    throw new Error("KeyControlMethod: parameter must be defined");
  if (!r)
    throw new Error("KeyControlMethod: velocity must be defined");
  if (!i)
    throw new Error("KeyControlMethod: friction must be defined");
  n = n || document, this._keyCode = e, this._parameter = t, this._velocity = r, this._friction = i, this._element = n, this._keydownHandler = this._handlePress.bind(this), this._keyupHandler = this._handleRelease.bind(this), this._blurHandler = this._handleBlur.bind(this), this._element.addEventListener("keydown", this._keydownHandler), this._element.addEventListener("keyup", this._keyupHandler), window.addEventListener("blur", this._blurHandler), this._dynamics = new B_(), this._pressing = !1;
}
U_(Xt);
Xt.prototype.destroy = function() {
  this._element.removeEventListener("keydown", this._keydownHandler), this._element.removeEventListener("keyup", this._keyupHandler), window.removeEventListener("blur", this._blurHandler), G_(this);
};
Xt.prototype._handlePress = function(e) {
  e.keyCode === this._keyCode && (this._pressing = !0, this._dynamics.velocity = this._velocity, this._dynamics.friction = 0, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("active"));
};
Xt.prototype._handleRelease = function(e) {
  e.keyCode === this._keyCode && (this._pressing && (this._dynamics.friction = this._friction, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("inactive")), this._pressing = !1);
};
Xt.prototype._handleBlur = function() {
  this._dynamics.velocity = 0, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("inactive"), this._pressing = !1;
};
var Bs = Xt, Gs = { exports: {} };
/*! Hammer.JS - v2.0.4 - 2014-09-28
 * http://hammerjs.github.io/
 *
 * Copyright (c) 2014 Jorik Tangelder;
 * Licensed under the MIT license */
(function(e) {
  (function(t, r, i, n) {
    var a = ["", "webkit", "moz", "MS", "ms", "o"], s = r.createElement("div"), o = "function", h = Math.round, l = Math.abs, c = Date.now;
    function f(v, d, g) {
      return setTimeout(M(v, g), d);
    }
    function u(v, d, g) {
      return Array.isArray(v) ? (p(v, g[d], g), !0) : !1;
    }
    function p(v, d, g) {
      var E;
      if (v)
        if (v.forEach)
          v.forEach(d, g);
        else if (v.length !== n)
          for (E = 0; E < v.length; )
            d.call(g, v[E], E, v), E++;
        else
          for (E in v)
            v.hasOwnProperty(E) && d.call(g, v[E], E, v);
    }
    function m(v, d, g) {
      for (var E = Object.keys(d), C = 0; C < E.length; )
        (!g || g && v[E[C]] === n) && (v[E[C]] = d[E[C]]), C++;
      return v;
    }
    function x(v, d) {
      return m(v, d, !0);
    }
    function y(v, d, g) {
      var E = d.prototype, C;
      C = v.prototype = Object.create(E), C.constructor = v, C._super = E, g && m(C, g);
    }
    function M(v, d) {
      return function() {
        return v.apply(d, arguments);
      };
    }
    function b(v, d) {
      return typeof v == o ? v.apply(d && d[0] || n, d) : v;
    }
    function $(v, d) {
      return v === n ? d : v;
    }
    function L(v, d, g) {
      p(X(d), function(E) {
        v.addEventListener(E, g, !1);
      });
    }
    function R(v, d, g) {
      p(X(d), function(E) {
        v.removeEventListener(E, g, !1);
      });
    }
    function P(v, d) {
      for (; v; ) {
        if (v == d)
          return !0;
        v = v.parentNode;
      }
      return !1;
    }
    function k(v, d) {
      return v.indexOf(d) > -1;
    }
    function X(v) {
      return v.trim().split(/\s+/g);
    }
    function W(v, d, g) {
      if (v.indexOf && !g)
        return v.indexOf(d);
      for (var E = 0; E < v.length; ) {
        if (g && v[E][g] == d || !g && v[E] === d)
          return E;
        E++;
      }
      return -1;
    }
    function Y(v) {
      return Array.prototype.slice.call(v, 0);
    }
    function D(v, d, g) {
      for (var E = [], C = [], F = 0; F < v.length; ) {
        var K = d ? v[F][d] : v[F];
        W(C, K) < 0 && E.push(v[F]), C[F] = K, F++;
      }
      return g && (d ? E = E.sort(function(Ee, We) {
        return Ee[d] > We[d];
      }) : E = E.sort()), E;
    }
    function U(v, d) {
      for (var g, E, C = d[0].toUpperCase() + d.slice(1), F = 0; F < a.length; ) {
        if (g = a[F], E = g ? g + C : d, E in v)
          return E;
        F++;
      }
      return n;
    }
    var q = 1;
    function z() {
      return q++;
    }
    function w(v) {
      var d = v.ownerDocument;
      return d.defaultView || d.parentWindow;
    }
    var $e = /mobile|tablet|ip(ad|hone|od)|android/i, re = "ontouchstart" in t, Ne = U(t, "PointerEvent") !== n, Ce = re && $e.test(navigator.userAgent), ge = "touch", Cr = "pen", It = "mouse", Sr = "kinect", si = 25, we = 1, Ie = 2, ae = 4, ve = 8, it = 1, Ve = 2, pt = 4, nt = 8, _t = 16, Le = Ve | pt, Re = nt | _t, mt = Le | Re, Gt = ["x", "y"], yt = ["clientX", "clientY"];
    function _e(v, d) {
      var g = this;
      this.manager = v, this.callback = d, this.element = v.element, this.target = v.options.inputTarget, this.domHandler = function(E) {
        b(v.options.enable, [v]) && g.handler(E);
      }, this.init();
    }
    _e.prototype = {
      /**
       * should handle the inputEvent data and trigger the callback
       * @virtual
       */
      handler: function() {
      },
      /**
       * bind the events
       */
      init: function() {
        this.evEl && L(this.element, this.evEl, this.domHandler), this.evTarget && L(this.target, this.evTarget, this.domHandler), this.evWin && L(w(this.element), this.evWin, this.domHandler);
      },
      /**
       * unbind the events
       */
      destroy: function() {
        this.evEl && R(this.element, this.evEl, this.domHandler), this.evTarget && R(this.target, this.evTarget, this.domHandler), this.evWin && R(w(this.element), this.evWin, this.domHandler);
      }
    };
    function oi(v) {
      var d, g = v.options.inputClass;
      return g ? d = g : Ne ? d = ke : Ce ? d = xt : re ? d = ir : d = Ht, new d(v, hi);
    }
    function hi(v, d, g) {
      var E = g.pointers.length, C = g.changedPointers.length, F = d & we && E - C === 0, K = d & (ae | ve) && E - C === 0;
      g.isFirst = !!F, g.isFinal = !!K, F && (v.session = {}), g.eventType = d, Zt(v, g), v.emit("hammer.input", g), v.recognize(g), v.session.prevInput = g;
    }
    function Zt(v, d) {
      var g = v.session, E = d.pointers, C = E.length;
      g.firstInput || (g.firstInput = Kt(d)), C > 1 && !g.firstMultiple ? g.firstMultiple = Kt(d) : C === 1 && (g.firstMultiple = !1);
      var F = g.firstInput, K = g.firstMultiple, Me = K ? K.center : F.center, Ee = d.center = Qt(E);
      d.timeStamp = c(), d.deltaTime = d.timeStamp - F.timeStamp, d.angle = Dt(Me, Ee), d.distance = wt(Me, Ee), li(g, d), d.offsetDirection = Pr(d.deltaX, d.deltaY), d.scale = K ? vi(K.pointers, E) : 1, d.rotation = K ? Jt(K.pointers, E) : 0, ci(g, d);
      var We = v.element;
      P(d.srcEvent.target, We) && (We = d.srcEvent.target), d.target = We;
    }
    function li(v, d) {
      var g = d.center, E = v.offsetDelta || {}, C = v.prevDelta || {}, F = v.prevInput || {};
      (d.eventType === we || F.eventType === ae) && (C = v.prevDelta = {
        x: F.deltaX || 0,
        y: F.deltaY || 0
      }, E = v.offsetDelta = {
        x: g.x,
        y: g.y
      }), d.deltaX = C.x + (g.x - E.x), d.deltaY = C.y + (g.y - E.y);
    }
    function ci(v, d) {
      var g = v.lastInterval || d, E = d.timeStamp - g.timeStamp, C, F, K, Me;
      if (d.eventType != ve && (E > si || g.velocity === n)) {
        var Ee = g.deltaX - d.deltaX, We = g.deltaY - d.deltaY, Nt = gt(E, Ee, We);
        F = Nt.x, K = Nt.y, C = l(Nt.x) > l(Nt.y) ? Nt.x : Nt.y, Me = Pr(Ee, We), v.lastInterval = d;
      } else
        C = g.velocity, F = g.velocityX, K = g.velocityY, Me = g.direction;
      d.velocity = C, d.velocityX = F, d.velocityY = K, d.direction = Me;
    }
    function Kt(v) {
      for (var d = [], g = 0; g < v.pointers.length; )
        d[g] = {
          clientX: h(v.pointers[g].clientX),
          clientY: h(v.pointers[g].clientY)
        }, g++;
      return {
        timeStamp: c(),
        pointers: d,
        center: Qt(d),
        deltaX: v.deltaX,
        deltaY: v.deltaY
      };
    }
    function Qt(v) {
      var d = v.length;
      if (d === 1)
        return {
          x: h(v[0].clientX),
          y: h(v[0].clientY)
        };
      for (var g = 0, E = 0, C = 0; C < d; )
        g += v[C].clientX, E += v[C].clientY, C++;
      return {
        x: h(g / d),
        y: h(E / d)
      };
    }
    function gt(v, d, g) {
      return {
        x: d / v || 0,
        y: g / v || 0
      };
    }
    function Pr(v, d) {
      return v === d ? it : l(v) >= l(d) ? v > 0 ? Ve : pt : d > 0 ? nt : _t;
    }
    function wt(v, d, g) {
      g || (g = Gt);
      var E = d[g[0]] - v[g[0]], C = d[g[1]] - v[g[1]];
      return Math.sqrt(E * E + C * C);
    }
    function Dt(v, d, g) {
      g || (g = Gt);
      var E = d[g[0]] - v[g[0]], C = d[g[1]] - v[g[1]];
      return Math.atan2(C, E) * 180 / Math.PI;
    }
    function Jt(v, d) {
      return Dt(d[1], d[0], yt) - Dt(v[1], v[0], yt);
    }
    function vi(v, d) {
      return wt(d[0], d[1], yt) / wt(v[0], v[1], yt);
    }
    var fi = {
      mousedown: we,
      mousemove: Ie,
      mouseup: ae
    }, ui = "mousedown", di = "mousemove mouseup";
    function Ht() {
      this.evEl = ui, this.evWin = di, this.allow = !0, this.pressed = !1, _e.apply(this, arguments);
    }
    y(Ht, _e, {
      /**
       * handle mouse events
       * @param {Object} ev
       */
      handler: function(d) {
        var g = fi[d.type];
        g & we && d.button === 0 && (this.pressed = !0), g & Ie && d.which !== 1 && (g = ae), !(!this.pressed || !this.allow) && (g & ae && (this.pressed = !1), this.callback(this.manager, g, {
          pointers: [d],
          changedPointers: [d],
          pointerType: It,
          srcEvent: d
        }));
      }
    });
    var pi = {
      pointerdown: we,
      pointermove: Ie,
      pointerup: ae,
      pointercancel: ve,
      pointerout: ve
    }, _i = {
      2: ge,
      3: Cr,
      4: It,
      5: Sr
      // see https://twitter.com/jacobrossi/status/480596438489890816
    }, Ft = "pointerdown", er = "pointermove pointerup pointercancel";
    t.MSPointerEvent && (Ft = "MSPointerDown", er = "MSPointerMove MSPointerUp MSPointerCancel");
    function ke() {
      this.evEl = Ft, this.evWin = er, _e.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    y(ke, _e, {
      /**
       * handle mouse events
       * @param {Object} ev
       */
      handler: function(d) {
        var g = this.store, E = !1, C = d.type.toLowerCase().replace("ms", ""), F = pi[C], K = _i[d.pointerType] || d.pointerType, Me = K == ge, Ee = W(g, d.pointerId, "pointerId");
        F & we && (d.button === 0 || Me) ? Ee < 0 && (g.push(d), Ee = g.length - 1) : F & (ae | ve) && (E = !0), !(Ee < 0) && (g[Ee] = d, this.callback(this.manager, F, {
          pointers: g,
          changedPointers: [d],
          pointerType: K,
          srcEvent: d
        }), E && g.splice(Ee, 1));
      }
    });
    var tr = {
      touchstart: we,
      touchmove: Ie,
      touchend: ae,
      touchcancel: ve
    }, rr = "touchstart", $r = "touchstart touchmove touchend touchcancel";
    function Lr() {
      this.evTarget = rr, this.evWin = $r, this.started = !1, _e.apply(this, arguments);
    }
    y(Lr, _e, {
      handler: function(d) {
        var g = tr[d.type];
        if (g === we && (this.started = !0), !!this.started) {
          var E = Rr.call(this, d, g);
          g & (ae | ve) && E[0].length - E[1].length === 0 && (this.started = !1), this.callback(this.manager, g, {
            pointers: E[0],
            changedPointers: E[1],
            pointerType: ge,
            srcEvent: d
          });
        }
      }
    });
    function Rr(v, d) {
      var g = Y(v.touches), E = Y(v.changedTouches);
      return d & (ae | ve) && (g = D(g.concat(E), "identifier", !0)), [g, E];
    }
    var mi = {
      touchstart: we,
      touchmove: Ie,
      touchend: ae,
      touchcancel: ve
    }, Ar = "touchstart touchmove touchend touchcancel";
    function xt() {
      this.evTarget = Ar, this.targetIds = {}, _e.apply(this, arguments);
    }
    y(xt, _e, {
      handler: function(d) {
        var g = mi[d.type], E = yi.call(this, d, g);
        E && this.callback(this.manager, g, {
          pointers: E[0],
          changedPointers: E[1],
          pointerType: ge,
          srcEvent: d
        });
      }
    });
    function yi(v, d) {
      var g = Y(v.touches), E = this.targetIds;
      if (d & (we | Ie) && g.length === 1)
        return E[g[0].identifier] = !0, [g, g];
      var C, F, K = Y(v.changedTouches), Me = [], Ee = this.target;
      if (F = g.filter(function(We) {
        return P(We.target, Ee);
      }), d === we)
        for (C = 0; C < F.length; )
          E[F[C].identifier] = !0, C++;
      for (C = 0; C < K.length; )
        E[K[C].identifier] && Me.push(K[C]), d & (ae | ve) && delete E[K[C].identifier], C++;
      if (Me.length)
        return [
          // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
          D(F.concat(Me), "identifier", !0),
          Me
        ];
    }
    function ir() {
      _e.apply(this, arguments);
      var v = M(this.handler, this);
      this.touch = new xt(this.manager, v), this.mouse = new Ht(this.manager, v);
    }
    y(ir, _e, {
      /**
       * handle mouse and touch events
       * @param {Hammer} manager
       * @param {String} inputEvent
       * @param {Object} inputData
       */
      handler: function(d, g, E) {
        var C = E.pointerType == ge, F = E.pointerType == It;
        if (C)
          this.mouse.allow = !1;
        else if (F && !this.mouse.allow)
          return;
        g & (ae | ve) && (this.mouse.allow = !0), this.callback(d, g, E);
      },
      /**
       * remove the event listeners
       */
      destroy: function() {
        this.touch.destroy(), this.mouse.destroy();
      }
    });
    var nr = U(s.style, "touchAction"), zr = nr !== n, Or = "compute", Ir = "auto", ar = "manipulation", _ = "none", T = "pan-x", S = "pan-y";
    function O(v, d) {
      this.manager = v, this.set(d);
    }
    O.prototype = {
      /**
       * set the touchAction value on the element or enable the polyfill
       * @param {String} value
       */
      set: function(v) {
        v == Or && (v = this.compute()), zr && (this.manager.element.style[nr] = v), this.actions = v.toLowerCase().trim();
      },
      /**
       * just re-set the touchAction value
       */
      update: function() {
        this.set(this.manager.options.touchAction);
      },
      /**
       * compute the value for the touchAction property based on the recognizer's settings
       * @returns {String} value
       */
      compute: function() {
        var v = [];
        return p(this.manager.recognizers, function(d) {
          b(d.options.enable, [d]) && (v = v.concat(d.getTouchAction()));
        }), B(v.join(" "));
      },
      /**
       * this method is called on each input cycle and provides the preventing of the browser behavior
       * @param {Object} input
       */
      preventDefaults: function(v) {
        if (!zr) {
          var d = v.srcEvent, g = v.offsetDirection;
          if (this.manager.session.prevented) {
            d.preventDefault();
            return;
          }
          var E = this.actions, C = k(E, _), F = k(E, S), K = k(E, T);
          if (C || F && g & Le || K && g & Re)
            return this.preventSrc(d);
        }
      },
      /**
       * call preventDefault to prevent the browser's default behavior (scrolling in most cases)
       * @param {Object} srcEvent
       */
      preventSrc: function(v) {
        this.manager.session.prevented = !0, v.preventDefault();
      }
    };
    function B(v) {
      if (k(v, _))
        return _;
      var d = k(v, T), g = k(v, S);
      return d && g ? T + " " + S : d || g ? d ? T : S : k(v, ar) ? ar : Ir;
    }
    var G = 1, H = 2, N = 4, se = 8, Z = se, ie = 16, he = 32;
    function xe(v) {
      this.id = z(), this.manager = null, this.options = x(v || {}, this.defaults), this.options.enable = $(this.options.enable, !0), this.state = G, this.simultaneous = {}, this.requireFail = [];
    }
    xe.prototype = {
      /**
       * @virtual
       * @type {Object}
       */
      defaults: {},
      /**
       * set options
       * @param {Object} options
       * @return {Recognizer}
       */
      set: function(v) {
        return m(this.options, v), this.manager && this.manager.touchAction.update(), this;
      },
      /**
       * recognize simultaneous with an other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      recognizeWith: function(v) {
        if (u(v, "recognizeWith", this))
          return this;
        var d = this.simultaneous;
        return v = Hr(v, this), d[v.id] || (d[v.id] = v, v.recognizeWith(this)), this;
      },
      /**
       * drop the simultaneous link. it doesnt remove the link on the other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      dropRecognizeWith: function(v) {
        return u(v, "dropRecognizeWith", this) ? this : (v = Hr(v, this), delete this.simultaneous[v.id], this);
      },
      /**
       * recognizer can only run when an other is failing
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      requireFailure: function(v) {
        if (u(v, "requireFailure", this))
          return this;
        var d = this.requireFail;
        return v = Hr(v, this), W(d, v) === -1 && (d.push(v), v.requireFailure(this)), this;
      },
      /**
       * drop the requireFailure link. it does not remove the link on the other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      dropRequireFailure: function(v) {
        if (u(v, "dropRequireFailure", this))
          return this;
        v = Hr(v, this);
        var d = W(this.requireFail, v);
        return d > -1 && this.requireFail.splice(d, 1), this;
      },
      /**
       * has require failures boolean
       * @returns {boolean}
       */
      hasRequireFailures: function() {
        return this.requireFail.length > 0;
      },
      /**
       * if the recognizer can recognize simultaneous with an other recognizer
       * @param {Recognizer} otherRecognizer
       * @returns {Boolean}
       */
      canRecognizeWith: function(v) {
        return !!this.simultaneous[v.id];
      },
      /**
       * You should use `tryEmit` instead of `emit` directly to check
       * that all the needed recognizers has failed before emitting.
       * @param {Object} input
       */
      emit: function(v) {
        var d = this, g = this.state;
        function E(C) {
          d.manager.emit(d.options.event + (C ? Dr(g) : ""), v);
        }
        g < se && E(!0), E(), g >= se && E(!0);
      },
      /**
       * Check that all the require failure recognizers has failed,
       * if true, it emits a gesture event,
       * otherwise, setup the state to FAILED.
       * @param {Object} input
       */
      tryEmit: function(v) {
        if (this.canEmit())
          return this.emit(v);
        this.state = he;
      },
      /**
       * can we emit?
       * @returns {boolean}
       */
      canEmit: function() {
        for (var v = 0; v < this.requireFail.length; ) {
          if (!(this.requireFail[v].state & (he | G)))
            return !1;
          v++;
        }
        return !0;
      },
      /**
       * update the recognizer
       * @param {Object} inputData
       */
      recognize: function(v) {
        var d = m({}, v);
        if (!b(this.options.enable, [this, d])) {
          this.reset(), this.state = he;
          return;
        }
        this.state & (Z | ie | he) && (this.state = G), this.state = this.process(d), this.state & (H | N | se | ie) && this.tryEmit(d);
      },
      /**
       * return the state of the recognizer
       * the actual recognizing happens in this method
       * @virtual
       * @param {Object} inputData
       * @returns {Const} STATE
       */
      process: function(v) {
      },
      // jshint ignore:line
      /**
       * return the preferred touch-action
       * @virtual
       * @returns {Array}
       */
      getTouchAction: function() {
      },
      /**
       * called when the gesture isn't allowed to recognize
       * like when another is being recognized or it is disabled
       * @virtual
       */
      reset: function() {
      }
    };
    function Dr(v) {
      return v & ie ? "cancel" : v & se ? "end" : v & N ? "move" : v & H ? "start" : "";
    }
    function Ae(v) {
      return v == _t ? "down" : v == nt ? "up" : v == Ve ? "left" : v == pt ? "right" : "";
    }
    function Hr(v, d) {
      var g = d.manager;
      return g ? g.get(v) : v;
    }
    function De() {
      xe.apply(this, arguments);
    }
    y(De, xe, {
      /**
       * @namespace
       * @memberof AttrRecognizer
       */
      defaults: {
        /**
         * @type {Number}
         * @default 1
         */
        pointers: 1
      },
      /**
       * Used to check if it the recognizer receives valid input, like input.distance > 10.
       * @memberof AttrRecognizer
       * @param {Object} input
       * @returns {Boolean} recognized
       */
      attrTest: function(v) {
        var d = this.options.pointers;
        return d === 0 || v.pointers.length === d;
      },
      /**
       * Process the input and return the state for the recognizer
       * @memberof AttrRecognizer
       * @param {Object} input
       * @returns {*} State
       */
      process: function(v) {
        var d = this.state, g = v.eventType, E = d & (H | N), C = this.attrTest(v);
        return E && (g & ve || !C) ? d | ie : E || C ? g & ae ? d | se : d & H ? d | N : H : he;
      }
    });
    function Fr() {
      De.apply(this, arguments), this.pX = null, this.pY = null;
    }
    y(Fr, De, {
      /**
       * @namespace
       * @memberof PanRecognizer
       */
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: mt
      },
      getTouchAction: function() {
        var v = this.options.direction, d = [];
        return v & Le && d.push(S), v & Re && d.push(T), d;
      },
      directionTest: function(v) {
        var d = this.options, g = !0, E = v.distance, C = v.direction, F = v.deltaX, K = v.deltaY;
        return C & d.direction || (d.direction & Le ? (C = F === 0 ? it : F < 0 ? Ve : pt, g = F != this.pX, E = Math.abs(v.deltaX)) : (C = K === 0 ? it : K < 0 ? nt : _t, g = K != this.pY, E = Math.abs(v.deltaY))), v.direction = C, g && E > d.threshold && C & d.direction;
      },
      attrTest: function(v) {
        return De.prototype.attrTest.call(this, v) && (this.state & H || !(this.state & H) && this.directionTest(v));
      },
      emit: function(v) {
        this.pX = v.deltaX, this.pY = v.deltaY;
        var d = Ae(v.direction);
        d && this.manager.emit(this.options.event + d, v), this._super.emit.call(this, v);
      }
    });
    function gi() {
      De.apply(this, arguments);
    }
    y(gi, De, {
      /**
       * @namespace
       * @memberof PinchRecognizer
       */
      defaults: {
        event: "pinch",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [_];
      },
      attrTest: function(v) {
        return this._super.attrTest.call(this, v) && (Math.abs(v.scale - 1) > this.options.threshold || this.state & H);
      },
      emit: function(v) {
        if (this._super.emit.call(this, v), v.scale !== 1) {
          var d = v.scale < 1 ? "in" : "out";
          this.manager.emit(this.options.event + d, v);
        }
      }
    });
    function wi() {
      xe.apply(this, arguments), this._timer = null, this._input = null;
    }
    y(wi, xe, {
      /**
       * @namespace
       * @memberof PressRecognizer
       */
      defaults: {
        event: "press",
        pointers: 1,
        time: 500,
        // minimal time of the pointer to be pressed
        threshold: 5
        // a minimal movement is ok, but keep it low
      },
      getTouchAction: function() {
        return [Ir];
      },
      process: function(v) {
        var d = this.options, g = v.pointers.length === d.pointers, E = v.distance < d.threshold, C = v.deltaTime > d.time;
        if (this._input = v, !E || !g || v.eventType & (ae | ve) && !C)
          this.reset();
        else if (v.eventType & we)
          this.reset(), this._timer = f(function() {
            this.state = Z, this.tryEmit();
          }, d.time, this);
        else if (v.eventType & ae)
          return Z;
        return he;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function(v) {
        this.state === Z && (v && v.eventType & ae ? this.manager.emit(this.options.event + "up", v) : (this._input.timeStamp = c(), this.manager.emit(this.options.event, this._input)));
      }
    });
    function xi() {
      De.apply(this, arguments);
    }
    y(xi, De, {
      /**
       * @namespace
       * @memberof RotateRecognizer
       */
      defaults: {
        event: "rotate",
        threshold: 0,
        pointers: 2
      },
      getTouchAction: function() {
        return [_];
      },
      attrTest: function(v) {
        return this._super.attrTest.call(this, v) && (Math.abs(v.rotation) > this.options.threshold || this.state & H);
      }
    });
    function Mi() {
      De.apply(this, arguments);
    }
    y(Mi, De, {
      /**
       * @namespace
       * @memberof SwipeRecognizer
       */
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.65,
        direction: Le | Re,
        pointers: 1
      },
      getTouchAction: function() {
        return Fr.prototype.getTouchAction.call(this);
      },
      attrTest: function(v) {
        var d = this.options.direction, g;
        return d & (Le | Re) ? g = v.velocity : d & Le ? g = v.velocityX : d & Re && (g = v.velocityY), this._super.attrTest.call(this, v) && d & v.direction && v.distance > this.options.threshold && l(g) > this.options.velocity && v.eventType & ae;
      },
      emit: function(v) {
        var d = Ae(v.direction);
        d && this.manager.emit(this.options.event + d, v), this.manager.emit(this.options.event, v);
      }
    });
    function Nr() {
      xe.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }
    y(Nr, xe, {
      /**
       * @namespace
       * @memberof PinchRecognizer
       */
      defaults: {
        event: "tap",
        pointers: 1,
        taps: 1,
        interval: 300,
        // max time between the multi-tap taps
        time: 250,
        // max time of the pointer to be down (like finger on the screen)
        threshold: 2,
        // a minimal movement is ok, but keep it low
        posThreshold: 10
        // a multi-tap can be a bit off the initial position
      },
      getTouchAction: function() {
        return [ar];
      },
      process: function(v) {
        var d = this.options, g = v.pointers.length === d.pointers, E = v.distance < d.threshold, C = v.deltaTime < d.time;
        if (this.reset(), v.eventType & we && this.count === 0)
          return this.failTimeout();
        if (E && C && g) {
          if (v.eventType != ae)
            return this.failTimeout();
          var F = this.pTime ? v.timeStamp - this.pTime < d.interval : !0, K = !this.pCenter || wt(this.pCenter, v.center) < d.posThreshold;
          this.pTime = v.timeStamp, this.pCenter = v.center, !K || !F ? this.count = 1 : this.count += 1, this._input = v;
          var Me = this.count % d.taps;
          if (Me === 0)
            return this.hasRequireFailures() ? (this._timer = f(function() {
              this.state = Z, this.tryEmit();
            }, d.interval, this), H) : Z;
        }
        return he;
      },
      failTimeout: function() {
        return this._timer = f(function() {
          this.state = he;
        }, this.options.interval, this), he;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function() {
        this.state == Z && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
      }
    });
    function at(v, d) {
      return d = d || {}, d.recognizers = $(d.recognizers, at.defaults.preset), new Ei(v, d);
    }
    at.VERSION = "2.0.4", at.defaults = {
      /**
       * set if DOM events are being triggered.
       * But this is slower and unused by simple implementations, so disabled by default.
       * @type {Boolean}
       * @default false
       */
      domEvents: !1,
      /**
       * The value for the touchAction property/fallback.
       * When set to `compute` it will magically set the correct value based on the added recognizers.
       * @type {String}
       * @default compute
       */
      touchAction: Or,
      /**
       * @type {Boolean}
       * @default true
       */
      enable: !0,
      /**
       * EXPERIMENTAL FEATURE -- can be removed/changed
       * Change the parent input target element.
       * If Null, then it is being set the to main element.
       * @type {Null|EventTarget}
       * @default null
       */
      inputTarget: null,
      /**
       * force an input class
       * @type {Null|Function}
       * @default null
       */
      inputClass: null,
      /**
       * Default recognizer setup when calling `Hammer()`
       * When creating a new Manager these will be skipped.
       * @type {Array}
       */
      preset: [
        // RecognizerClass, options, [recognizeWith, ...], [requireFailure, ...]
        [xi, { enable: !1 }],
        [gi, { enable: !1 }, ["rotate"]],
        [Mi, { direction: Le }],
        [Fr, { direction: Le }, ["swipe"]],
        [Nr],
        [Nr, { event: "doubletap", taps: 2 }, ["tap"]],
        [wi]
      ],
      /**
       * Some CSS properties can be used to improve the working of Hammer.
       * Add them to this method and they will be set when creating a new Manager.
       * @namespace
       */
      cssProps: {
        /**
         * Disables text selection to improve the dragging gesture. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userSelect: "none",
        /**
         * Disable the Windows Phone grippers when pressing an element.
         * @type {String}
         * @default 'none'
         */
        touchSelect: "none",
        /**
         * Disables the default callout shown when you touch and hold a touch target.
         * On iOS, when you touch and hold a touch target such as a link, Safari displays
         * a callout containing information about the link. This property allows you to disable that callout.
         * @type {String}
         * @default 'none'
         */
        touchCallout: "none",
        /**
         * Specifies whether zooming is enabled. Used by IE10>
         * @type {String}
         * @default 'none'
         */
        contentZooming: "none",
        /**
         * Specifies that an entire element should be draggable instead of its contents. Mainly for desktop browsers.
         * @type {String}
         * @default 'none'
         */
        userDrag: "none",
        /**
         * Overrides the highlight color shown when the user taps a link or a JavaScript
         * clickable element in iOS. This property obeys the alpha value, if specified.
         * @type {String}
         * @default 'rgba(0,0,0,0)'
         */
        tapHighlightColor: "rgba(0,0,0,0)"
      }
    };
    var wo = 1, yn = 2;
    function Ei(v, d) {
      d = d || {}, this.options = x(d, at.defaults), this.options.inputTarget = this.options.inputTarget || v, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = v, this.input = oi(this), this.touchAction = new O(this, this.options.touchAction), gn(this, !0), p(d.recognizers, function(g) {
        var E = this.add(new g[0](g[1]));
        g[2] && E.recognizeWith(g[2]), g[3] && E.requireFailure(g[3]);
      }, this);
    }
    Ei.prototype = {
      /**
       * set options
       * @param {Object} options
       * @returns {Manager}
       */
      set: function(v) {
        return m(this.options, v), v.touchAction && this.touchAction.update(), v.inputTarget && (this.input.destroy(), this.input.target = v.inputTarget, this.input.init()), this;
      },
      /**
       * stop recognizing for this session.
       * This session will be discarded, when a new [input]start event is fired.
       * When forced, the recognizer cycle is stopped immediately.
       * @param {Boolean} [force]
       */
      stop: function(v) {
        this.session.stopped = v ? yn : wo;
      },
      /**
       * run the recognizers!
       * called by the inputHandler function on every movement of the pointers (touches)
       * it walks through all the recognizers and tries to detect the gesture that is being made
       * @param {Object} inputData
       */
      recognize: function(v) {
        var d = this.session;
        if (!d.stopped) {
          this.touchAction.preventDefaults(v);
          var g, E = this.recognizers, C = d.curRecognizer;
          (!C || C && C.state & Z) && (C = d.curRecognizer = null);
          for (var F = 0; F < E.length; )
            g = E[F], d.stopped !== yn && // 1
            (!C || g == C || // 2
            g.canRecognizeWith(C)) ? g.recognize(v) : g.reset(), !C && g.state & (H | N | se) && (C = d.curRecognizer = g), F++;
        }
      },
      /**
       * get a recognizer by its event name.
       * @param {Recognizer|String} recognizer
       * @returns {Recognizer|Null}
       */
      get: function(v) {
        if (v instanceof xe)
          return v;
        for (var d = this.recognizers, g = 0; g < d.length; g++)
          if (d[g].options.event == v)
            return d[g];
        return null;
      },
      /**
       * add a recognizer to the manager
       * existing recognizers with the same event name will be removed
       * @param {Recognizer} recognizer
       * @returns {Recognizer|Manager}
       */
      add: function(v) {
        if (u(v, "add", this))
          return this;
        var d = this.get(v.options.event);
        return d && this.remove(d), this.recognizers.push(v), v.manager = this, this.touchAction.update(), v;
      },
      /**
       * remove a recognizer by name or instance
       * @param {Recognizer|String} recognizer
       * @returns {Manager}
       */
      remove: function(v) {
        if (u(v, "remove", this))
          return this;
        var d = this.recognizers;
        return v = this.get(v), d.splice(W(d, v), 1), this.touchAction.update(), this;
      },
      /**
       * bind event
       * @param {String} events
       * @param {Function} handler
       * @returns {EventEmitter} this
       */
      on: function(v, d) {
        var g = this.handlers;
        return p(X(v), function(E) {
          g[E] = g[E] || [], g[E].push(d);
        }), this;
      },
      /**
       * unbind event, leave emit blank to remove all handlers
       * @param {String} events
       * @param {Function} [handler]
       * @returns {EventEmitter} this
       */
      off: function(v, d) {
        var g = this.handlers;
        return p(X(v), function(E) {
          d ? g[E].splice(W(g[E], d), 1) : delete g[E];
        }), this;
      },
      /**
       * emit event to the listeners
       * @param {String} event
       * @param {Object} data
       */
      emit: function(v, d) {
        this.options.domEvents && xo(v, d);
        var g = this.handlers[v] && this.handlers[v].slice();
        if (!(!g || !g.length)) {
          d.type = v, d.preventDefault = function() {
            d.srcEvent.preventDefault();
          };
          for (var E = 0; E < g.length; )
            g[E](d), E++;
        }
      },
      /**
       * destroy the manager and unbinds all events
       * it doesn't unbind dom events, that is the user own responsibility
       */
      destroy: function() {
        this.element && gn(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
      }
    };
    function gn(v, d) {
      var g = v.element;
      p(v.options.cssProps, function(E, C) {
        g.style[U(g.style, C)] = d ? E : "";
      });
    }
    function xo(v, d) {
      var g = r.createEvent("Event");
      g.initEvent(v, !0, !0), g.gesture = d, d.target.dispatchEvent(g);
    }
    m(at, {
      INPUT_START: we,
      INPUT_MOVE: Ie,
      INPUT_END: ae,
      INPUT_CANCEL: ve,
      STATE_POSSIBLE: G,
      STATE_BEGAN: H,
      STATE_CHANGED: N,
      STATE_ENDED: se,
      STATE_RECOGNIZED: Z,
      STATE_CANCELLED: ie,
      STATE_FAILED: he,
      DIRECTION_NONE: it,
      DIRECTION_LEFT: Ve,
      DIRECTION_RIGHT: pt,
      DIRECTION_UP: nt,
      DIRECTION_DOWN: _t,
      DIRECTION_HORIZONTAL: Le,
      DIRECTION_VERTICAL: Re,
      DIRECTION_ALL: mt,
      Manager: Ei,
      Input: _e,
      TouchAction: O,
      TouchInput: xt,
      MouseInput: Ht,
      PointerEventInput: ke,
      TouchMouseInput: ir,
      SingleTouchInput: Lr,
      Recognizer: xe,
      AttrRecognizer: De,
      Tap: Nr,
      Pan: Fr,
      Swipe: Mi,
      Pinch: gi,
      Rotate: xi,
      Press: wi,
      on: L,
      off: R,
      each: p,
      merge: x,
      extend: m,
      inherit: y,
      bindFn: M,
      prefixed: U
    }), typeof n == o && n.amd ? n(function() {
      return at;
    }) : e.exports ? e.exports = at : t[i] = at;
  })(window, document, "Hammer");
})(Gs);
var Zs = Gs.exports, kt = Zs, Z_ = 1, zi = "MarzipanoHammerElementId";
function Ks(e, t) {
  return e[zi] || (e[zi] = Z_++), t + e[zi];
}
function ri() {
  this._managers = {}, this._refCount = {};
}
ri.prototype.get = function(e, t) {
  var r = Ks(e, t);
  return this._managers[r] || (this._managers[r] = this._createManager(e, t), this._refCount[r] = 0), this._refCount[r]++, new ii(this, this._managers[r], e, t);
};
ri.prototype._createManager = function(e, t) {
  var r = new kt.Manager(e);
  return t === "mouse" ? r.add(new kt.Pan({ direction: kt.DIRECTION_ALL, threshold: 0 })) : (t === "touch" || t === "pen" || t === "kinect") && (r.add(new kt.Pan({ direction: kt.DIRECTION_ALL, threshold: 20, pointers: 1 })), r.add(new kt.Pinch())), r;
};
ri.prototype._releaseHandle = function(e, t) {
  var r = Ks(e, t);
  this._refCount[r] && (this._refCount[r]--, this._refCount[r] || (this._managers[r].destroy(), delete this._managers[r], delete this._refCount[r]));
};
function ii(e, t, r, i) {
  this._manager = t, this._element = r, this._type = i, this._hammerGestures = e, this._eventHandlers = [];
}
ii.prototype.on = function(e, t) {
  var r = this._type, i = function(n) {
    r === n.pointerType && t(n);
  };
  this._eventHandlers.push({ events: e, handler: i }), this._manager.on(e, i);
};
ii.prototype.release = function() {
  for (var e = 0; e < this._eventHandlers.length; e++) {
    var t = this._eventHandlers[e];
    this._manager.off(t.events, t.handler);
  }
  this._hammerGestures._releaseHandle(this._element, this._type), this._manager = null, this._element = null, this._type = null, this._hammerGestures = null;
};
ii.prototype.manager = function() {
  return this._manager;
};
var ni = new ri();
function K_(e, t, r, i, n) {
  var a = Math.sqrt(Math.pow(t, 2) + Math.pow(r, 2));
  e = Math.max(e, a / i), Qs(t, r, e, n), n[0] = Math.abs(n[0]), n[1] = Math.abs(n[1]);
}
function Qs(e, t, r, i) {
  var n = Math.atan(t / e);
  i[0] = r * Math.cos(n), i[1] = r * Math.sin(n);
}
var Js = {
  maxFriction: K_,
  changeVectorNorm: Qs
}, Q_ = oe, Hn = tt, J_ = ni, e1 = Ue, t1 = Js.maxFriction, r1 = ne, i1 = {
  friction: 6,
  maxFrictionTime: 0.3,
  hammerEvent: "pan"
}, Fn = typeof MARZIPANODEBUG < "u" && MARZIPANODEBUG.controls;
function rt(e, t, r) {
  if (this._element = e, this._opts = e1(r || {}, i1), this._startEvent = null, this._lastEvent = null, this._active = !1, this._dynamics = {
    x: new Hn(),
    y: new Hn()
  }, this._hammer = J_.get(e, t), this._hammer.on("hammer.input", this._handleHammerEvent.bind(this)), this._opts.hammerEvent != "pan" && this._opts.hammerEvent != "pinch")
    throw new Error(this._opts.hammerEvent + " is not a hammerEvent managed in DragControlMethod");
  this._hammer.on(this._opts.hammerEvent + "start", this._handleStart.bind(this)), this._hammer.on(this._opts.hammerEvent + "move", this._handleMove.bind(this)), this._hammer.on(this._opts.hammerEvent + "end", this._handleEnd.bind(this)), this._hammer.on(this._opts.hammerEvent + "cancel", this._handleEnd.bind(this));
}
Q_(rt);
rt.prototype.destroy = function() {
  this._hammer.release(), r1(this);
};
rt.prototype._handleHammerEvent = function(e) {
  if (e.isFirst) {
    if (Fn && this._active)
      throw new Error("DragControlMethod active detected when already active");
    this._active = !0, this.emit("active");
  }
  if (e.isFinal) {
    if (Fn && !this._active)
      throw new Error("DragControlMethod inactive detected when already inactive");
    this._active = !1, this.emit("inactive");
  }
};
rt.prototype._handleStart = function(e) {
  e.preventDefault(), this._startEvent = e;
};
rt.prototype._handleMove = function(e) {
  e.preventDefault(), this._startEvent && (this._updateDynamicsMove(e), this.emit("parameterDynamics", "axisScaledX", this._dynamics.x), this.emit("parameterDynamics", "axisScaledY", this._dynamics.y));
};
rt.prototype._handleEnd = function(e) {
  e.preventDefault(), this._startEvent && (this._updateDynamicsRelease(e), this.emit("parameterDynamics", "axisScaledX", this._dynamics.x), this.emit("parameterDynamics", "axisScaledY", this._dynamics.y)), this._startEvent = !1, this._lastEvent = !1;
};
rt.prototype._updateDynamicsMove = function(e) {
  var t = e.deltaX, r = e.deltaY, i = this._lastEvent || this._startEvent;
  i && (t -= i.deltaX, r -= i.deltaY);
  var n = this._element.getBoundingClientRect(), a = n.right - n.left, s = n.bottom - n.top;
  t /= a, r /= s, this._dynamics.x.reset(), this._dynamics.y.reset(), this._dynamics.x.offset = -t, this._dynamics.y.offset = -r, this._lastEvent = e;
};
var Oi = [null, null];
rt.prototype._updateDynamicsRelease = function(e) {
  var t = this._element.getBoundingClientRect(), r = t.right - t.left, i = t.bottom - t.top, n = 1e3 * e.velocityX / r, a = 1e3 * e.velocityY / i;
  this._dynamics.x.reset(), this._dynamics.y.reset(), this._dynamics.x.velocity = n, this._dynamics.y.velocity = a, t1(this._opts.friction, this._dynamics.x.velocity, this._dynamics.y.velocity, this._opts.maxFrictionTime, Oi), this._dynamics.x.friction = Oi[0], this._dynamics.y.friction = Oi[1];
};
var eo = rt, n1 = oe, Nn = tt, a1 = ni, s1 = Ue, o1 = Js.maxFriction, h1 = ne, l1 = {
  speed: 8,
  friction: 6,
  maxFrictionTime: 0.3
};
function Ot(e, t, r) {
  this._element = e, this._opts = s1(r || {}, l1), this._active = !1, this._hammer = a1.get(e, t), this._dynamics = {
    x: new Nn(),
    y: new Nn()
  }, this._hammer.on("panstart", this._handleStart.bind(this)), this._hammer.on("panmove", this._handleMove.bind(this)), this._hammer.on("panend", this._handleRelease.bind(this)), this._hammer.on("pancancel", this._handleRelease.bind(this));
}
n1(Ot);
Ot.prototype.destroy = function() {
  this._hammer.release(), h1(this);
};
Ot.prototype._handleStart = function(e) {
  e.preventDefault(), this._active || (this._active = !0, this.emit("active"));
};
Ot.prototype._handleMove = function(e) {
  e.preventDefault(), this._updateDynamics(e, !1);
};
Ot.prototype._handleRelease = function(e) {
  e.preventDefault(), this._updateDynamics(e, !0), this._active && (this._active = !1, this.emit("inactive"));
};
var Ii = [null, null];
Ot.prototype._updateDynamics = function(e, t) {
  var r = this._element.getBoundingClientRect(), i = r.right - r.left, n = r.bottom - r.top, a = Math.max(i, n), s = e.deltaX / a * this._opts.speed, o = e.deltaY / a * this._opts.speed;
  this._dynamics.x.reset(), this._dynamics.y.reset(), this._dynamics.x.velocity = s, this._dynamics.y.velocity = o, t && (o1(this._opts.friction, this._dynamics.x.velocity, this._dynamics.y.velocity, this._opts.maxFrictionTime, Ii), this._dynamics.x.friction = Ii[0], this._dynamics.y.friction = Ii[1]), this.emit("parameterDynamics", "x", this._dynamics.x), this.emit("parameterDynamics", "y", this._dynamics.y);
};
var to = Ot, c1 = oe, v1 = tt, f1 = Ue, u1 = ne, d1 = {
  frictionTime: 0.2,
  zoomDelta: 1e-3
};
function Er(e, t) {
  this._element = e, this._opts = f1(t || {}, d1), this._dynamics = new v1(), this._eventList = [];
  var r = this._opts.frictionTime ? this.withSmoothing : this.withoutSmoothing;
  this._wheelListener = r.bind(this), e.addEventListener("wheel", this._wheelListener);
}
c1(Er);
Er.prototype.destroy = function() {
  this._element.removeEventListener("wheel", this._wheelListener), u1(this);
};
Er.prototype.withoutSmoothing = function(e) {
  this._dynamics.offset = ro(e) * this._opts.zoomDelta, this.emit("parameterDynamics", "zoom", this._dynamics), e.preventDefault(), this.emit("active"), this.emit("inactive");
};
Er.prototype.withSmoothing = function(e) {
  var t = e.timeStamp;
  for (this._eventList.push(e); this._eventList[0].timeStamp < t - this._opts.frictionTime * 1e3; )
    this._eventList.shift(0);
  for (var r = 0, i = 0; i < this._eventList.length; i++) {
    var n = ro(this._eventList[i]) * this._opts.zoomDelta;
    r += n / this._opts.frictionTime;
  }
  this._dynamics.velocity = r, this._dynamics.friction = Math.abs(r) / this._opts.frictionTime, this.emit("parameterDynamics", "zoom", this._dynamics), e.preventDefault(), this.emit("active"), this.emit("inactive");
};
function ro(e) {
  var t = e.deltaMode == 1 ? 20 : 1;
  return e.deltaY * t;
}
var io = Er, p1 = oe, _1 = tt, m1 = ni, y1 = ne;
function Ut(e, t, r) {
  this._hammer = m1.get(e, t), this._lastEvent = null, this._active = !1, this._dynamics = new _1(), this._hammer.on("pinchstart", this._handleStart.bind(this)), this._hammer.on("pinch", this._handleEvent.bind(this)), this._hammer.on("pinchend", this._handleEnd.bind(this)), this._hammer.on("pinchcancel", this._handleEnd.bind(this));
}
p1(Ut);
Ut.prototype.destroy = function() {
  this._hammer.release(), y1(this);
};
Ut.prototype._handleStart = function() {
  this._active || (this._active = !0, this.emit("active"));
};
Ut.prototype._handleEnd = function() {
  this._lastEvent = null, this._active && (this._active = !1, this.emit("inactive"));
};
Ut.prototype._handleEvent = function(e) {
  var t = e.scale;
  this._lastEvent && (t /= this._lastEvent.scale), this._dynamics.offset = (t - 1) * -1, this.emit("parameterDynamics", "zoom", this._dynamics), this._lastEvent = e;
};
var no = Ut, g1 = oe, w1 = tt, x1 = ne;
function Tr(e) {
  if (!e)
    throw new Error("VelocityControlMethod: parameter must be defined");
  this._parameter = e, this._dynamics = new w1();
}
g1(Tr);
Tr.prototype.destroy = function() {
  x1(this);
};
Tr.prototype.setVelocity = function(e) {
  this._dynamics.velocity = e, this.emit("parameterDynamics", this._parameter, this._dynamics);
};
Tr.prototype.setFriction = function(e) {
  this._dynamics.friction = e, this.emit("parameterDynamics", this._parameter, this._dynamics);
};
var M1 = Tr, E1 = oe, T1 = tt, b1 = ne;
function br(e, t, r, i) {
  if (!e)
    throw new Error("ElementPressControlMethod: element must be defined");
  if (!t)
    throw new Error("ElementPressControlMethod: parameter must be defined");
  if (!r)
    throw new Error("ElementPressControlMethod: velocity must be defined");
  if (!i)
    throw new Error("ElementPressControlMethod: friction must be defined");
  this._element = e, this._pressHandler = this._handlePress.bind(this), this._releaseHandler = this._handleRelease.bind(this), e.addEventListener("mousedown", this._pressHandler), e.addEventListener("mouseup", this._releaseHandler), e.addEventListener("mouseleave", this._releaseHandler), e.addEventListener("touchstart", this._pressHandler), e.addEventListener("touchmove", this._releaseHandler), e.addEventListener("touchend", this._releaseHandler), this._parameter = t, this._velocity = r, this._friction = i, this._dynamics = new T1(), this._pressing = !1;
}
E1(br);
br.prototype.destroy = function() {
  this._element.removeEventListener("mousedown", this._pressHandler), this._element.removeEventListener("mouseup", this._releaseHandler), this._element.removeEventListener("mouseleave", this._releaseHandler), this._element.removeEventListener("touchstart", this._pressHandler), this._element.removeEventListener("touchmove", this._releaseHandler), this._element.removeEventListener("touchend", this._releaseHandler), b1(this);
};
br.prototype._handlePress = function() {
  this._pressing = !0, this._dynamics.velocity = this._velocity, this._dynamics.friction = 0, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("active");
};
br.prototype._handleRelease = function() {
  this._pressing && (this._dynamics.friction = this._friction, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("inactive")), this._pressing = !1;
};
var C1 = br, S1 = oe, P1 = tt, $1 = Pt, L1 = ne;
function Fe(e) {
  e = e || {}, this._methods = [], this._parameters = ["x", "y", "axisScaledX", "axisScaledY", "zoom", "yaw", "pitch", "roll"], this._now = e.nowForTesting || $1, this._composedOffsets = {}, this._composeReturn = { offsets: this._composedOffsets, changing: null };
}
S1(Fe);
Fe.prototype.add = function(e) {
  if (!this.has(e)) {
    var t = {};
    this._parameters.forEach(function(n) {
      t[n] = {
        dynamics: new P1(),
        time: null
      };
    });
    var r = this._updateDynamics.bind(this, t), i = {
      instance: e,
      dynamics: t,
      parameterDynamicsHandler: r
    };
    e.addEventListener("parameterDynamics", r), this._methods.push(i);
  }
};
Fe.prototype.remove = function(e) {
  var t = this._indexOfInstance(e);
  if (t >= 0) {
    var r = this._methods.splice(t, 1)[0];
    r.instance.removeEventListener("parameterDynamics", r.parameterDynamicsHandler);
  }
};
Fe.prototype.has = function(e) {
  return this._indexOfInstance(e) >= 0;
};
Fe.prototype._indexOfInstance = function(e) {
  for (var t = 0; t < this._methods.length; t++)
    if (this._methods[t].instance === e)
      return t;
  return -1;
};
Fe.prototype.list = function() {
  for (var e = [], t = 0; t < this._methods.length; t++)
    e.push(this._methods[t].instance);
  return e;
};
Fe.prototype._updateDynamics = function(e, t, r) {
  var i = e[t];
  if (!i)
    throw new Error("Unknown control parameter " + t);
  var n = this._now();
  i.dynamics.update(r, (n - i.time) / 1e3), i.time = n, this.emit("change");
};
Fe.prototype._resetComposedOffsets = function() {
  for (var e = 0; e < this._parameters.length; e++)
    this._composedOffsets[this._parameters[e]] = 0;
};
Fe.prototype.offsets = function() {
  var e, t = !1, r = this._now();
  this._resetComposedOffsets();
  for (var i = 0; i < this._methods.length; i++)
    for (var n = this._methods[i].dynamics, a = 0; a < this._parameters.length; a++) {
      e = this._parameters[a];
      var s = n[e], o = s.dynamics;
      o.offset != null && (this._composedOffsets[e] += o.offset, o.offset = null);
      var h = (r - s.time) / 1e3, l = o.offsetFromVelocity(h);
      l && (this._composedOffsets[e] += l);
      var c = o.velocityAfter(h);
      o.velocity = c, c && (t = !0), s.time = r;
    }
  return this._composeReturn.changing = t, this._composeReturn;
};
Fe.prototype.destroy = function() {
  for (var e = this.list(), t = 0; t < e.length; t++)
    this.remove(e[t]);
  L1(this);
};
var R1 = Fe, A1 = oe, z1 = R1, O1 = ne, ao = typeof MARZIPANODEBUG < "u" && MARZIPANODEBUG.controls;
function te(e) {
  e = e || {}, this._methods = {}, this._methodGroups = {}, this._composer = new z1(), this._enabled = e && e.enabled ? !!e.enabled : !0, this._activeCount = 0, this.updatedViews_ = [], this._attachedRenderLoop = null;
}
A1(te);
te.prototype.destroy = function() {
  this.detach(), this._composer.destroy(), O1(this);
};
te.prototype.methods = function() {
  var e = {};
  for (var t in this._methods)
    e[t] = this._methods[t];
  return e;
};
te.prototype.method = function(e) {
  return this._methods[e];
};
te.prototype.registerMethod = function(e, t, r) {
  if (this._methods[e])
    throw new Error("Control method already registered with id " + e);
  this._methods[e] = {
    instance: t,
    enabled: !1,
    active: !1,
    activeHandler: this._handleActive.bind(this, e),
    inactiveHandler: this._handleInactive.bind(this, e)
  }, r && this.enableMethod(e, t);
};
te.prototype.unregisterMethod = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("No control method registered with id " + e);
  t.enabled && this.disableMethod(e), delete this._methods[e];
};
te.prototype.enableMethod = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("No control method registered with id " + e);
  t.enabled || (t.enabled = !0, t.active && this._incrementActiveCount(), this._listen(e), this._updateComposer(), this.emit("methodEnabled", e));
};
te.prototype.disableMethod = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("No control method registered with id " + e);
  t.enabled && (t.enabled = !1, t.active && this._decrementActiveCount(), this._unlisten(e), this._updateComposer(), this.emit("methodDisabled", e));
};
te.prototype.addMethodGroup = function(e, t) {
  this._methodGroups[e] = t;
};
te.prototype.removeMethodGroup = function(e) {
  delete this._methodGroups[e];
};
te.prototype.methodGroups = function() {
  var e = {};
  for (var t in this._methodGroups)
    e[t] = this._methodGroups[t];
  return e;
};
te.prototype.enableMethodGroup = function(e) {
  var t = this;
  t._methodGroups[e].forEach(function(r) {
    t.enableMethod(r);
  });
};
te.prototype.disableMethodGroup = function(e) {
  var t = this;
  t._methodGroups[e].forEach(function(r) {
    t.disableMethod(r);
  });
};
te.prototype.enabled = function() {
  return this._enabled;
};
te.prototype.enable = function() {
  this._enabled || (this._enabled = !0, this._activeCount > 0 && this.emit("active"), this.emit("enabled"), this._updateComposer());
};
te.prototype.disable = function() {
  this._enabled && (this._enabled = !1, this._activeCount > 0 && this.emit("inactive"), this.emit("disabled"), this._updateComposer());
};
te.prototype.attach = function(e) {
  this._attachedRenderLoop && this.detach(), this._attachedRenderLoop = e, this._beforeRenderHandler = this._updateViewsWithControls.bind(this), this._changeHandler = e.renderOnNextFrame.bind(e), this._attachedRenderLoop.addEventListener("beforeRender", this._beforeRenderHandler), this._composer.addEventListener("change", this._changeHandler);
};
te.prototype.detach = function() {
  this._attachedRenderLoop && (this._attachedRenderLoop.removeEventListener("beforeRender", this._beforeRenderHandler), this._composer.removeEventListener("change", this._changeHandler), this._beforeRenderHandler = null, this._changeHandler = null, this._attachedRenderLoop = null);
};
te.prototype.attached = function() {
  return this._attachedRenderLoop != null;
};
te.prototype._listen = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("Bad method id");
  t.instance.addEventListener("active", t.activeHandler), t.instance.addEventListener("inactive", t.inactiveHandler);
};
te.prototype._unlisten = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("Bad method id");
  t.instance.removeEventListener("active", t.activeHandler), t.instance.removeEventListener("inactive", t.inactiveHandler);
};
te.prototype._handleActive = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("Bad method id");
  if (!t.enabled)
    throw new Error("Should not receive event from disabled control method");
  t.active || (t.active = !0, this._incrementActiveCount());
};
te.prototype._handleInactive = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("Bad method id");
  if (!t.enabled)
    throw new Error("Should not receive event from disabled control method");
  t.active && (t.active = !1, this._decrementActiveCount());
};
te.prototype._incrementActiveCount = function() {
  this._activeCount++, ao && this._checkActiveCount(), this._enabled && this._activeCount === 1 && this.emit("active");
};
te.prototype._decrementActiveCount = function() {
  this._activeCount--, ao && this._checkActiveCount(), this._enabled && this._activeCount === 0 && this.emit("inactive");
};
te.prototype._checkActiveCount = function() {
  var e = 0;
  for (var t in this._methods) {
    var r = this._methods[t];
    r.enabled && r.active && e++;
  }
  if (e != this._activeCount)
    throw new Error("Bad control state");
};
te.prototype._updateComposer = function() {
  var e = this._composer;
  for (var t in this._methods) {
    var r = this._methods[t], i = this._enabled && r.enabled;
    i && !e.has(r.instance) && e.add(r.instance), !i && e.has(r.instance) && e.remove(r.instance);
  }
};
te.prototype._updateViewsWithControls = function() {
  var e = this._composer.offsets();
  e.changing && this._attachedRenderLoop.renderOnNextFrame(), this.updatedViews_.length = 0;
  for (var t = this._attachedRenderLoop.stage().listLayers(), r = 0; r < t.length; r++) {
    var i = t[r].view();
    this.updatedViews_.indexOf(i) < 0 && (t[r].view().updateWithControlParameters(e.offsets), this.updatedViews_.push(i));
  }
};
var so = te, I1 = be.setTransform, Vn = dn;
function D1(e, t, r, i) {
  i = i || "";
  var n = "translateX(" + Vn(t) + "px) translateY(" + Vn(r) + "px) translateZ(0) " + i;
  I1(e, n);
}
var oo = D1, H1 = oe, F1 = oo, N1 = be.setTransform, V1 = ne;
function Se(e, t, r, i, n) {
  n = n || {}, n.perspective = n.perspective || {}, n.perspective.extraTransforms = n.perspective.extraTransforms != null ? n.perspective.extraTransforms : "", this._domElement = e, this._parentDomElement = t, this._view = r, this._coords = {}, this._perspective = {}, this.setPosition(i), this._parentDomElement.appendChild(this._domElement), this.setPerspective(n.perspective), this._visible = !0, this._position = { x: 0, y: 0 };
}
H1(Se);
Se.prototype.destroy = function() {
  this._parentDomElement.removeChild(this._domElement), V1(this);
};
Se.prototype.domElement = function() {
  return this._domElement;
};
Se.prototype.position = function() {
  return this._coords;
};
Se.prototype.setPosition = function(e) {
  for (var t in e)
    this._coords[t] = e[t];
  this._update();
};
Se.prototype.perspective = function() {
  return this._perspective;
};
Se.prototype.setPerspective = function(e) {
  for (var t in e)
    this._perspective[t] = e[t];
  this._update();
};
Se.prototype.show = function() {
  this._visible || (this._visible = !0, this._update());
};
Se.prototype.hide = function() {
  this._visible && (this._visible = !1, this._update());
};
Se.prototype._update = function() {
  var e = this._domElement, t = this._coords, r = this._position, i, n, a = !1;
  if (this._visible) {
    var s = this._view;
    this._perspective.radius ? (a = !0, this._setEmbeddedPosition(s, t)) : (s.coordinatesToScreen(t, r), i = r.x, n = r.y, i != null && n != null && (a = !0, this._setPosition(i, n)));
  }
  a ? (e.style.display = "block", e.style.position = "absolute") : (e.style.display = "none", e.style.position = "");
};
Se.prototype._setEmbeddedPosition = function(e, t) {
  var r = e.coordinatesToPerspectiveTransform(
    t,
    this._perspective.radius,
    this._perspective.extraTransforms
  );
  N1(this._domElement, r);
};
Se.prototype._setPosition = function(e, t) {
  F1(this._domElement, e, t, this._perspective.extraTransforms);
};
var ho = Se, k1 = oe, W1 = ho, Y1 = ea, kn = oo, Wn = be.setAbsolute, q1 = be.setOverflowHidden, j1 = be.setOverflowVisible, X1 = be.setNullSize, U1 = be.setPixelSize, Yn = be.setWithVendorPrefix("pointer-events"), B1 = ne;
function Pe(e, t, r, i, n) {
  n = n || {}, this._parentDomElement = e, this._stage = t, this._view = r, this._renderLoop = i, this._hotspots = [], this._visible = !0, this._rect = n.rect, this._visibilityOrRectChanged = !0, this._stageWidth = null, this._stageHeight = null, this._tmpRect = {}, this._hotspotContainerWrapper = document.createElement("div"), Wn(this._hotspotContainerWrapper), Yn(this._hotspotContainerWrapper, "none"), this._parentDomElement.appendChild(this._hotspotContainerWrapper), this._hotspotContainer = document.createElement("div"), Wn(this._hotspotContainer), Yn(this._hotspotContainer, "all"), this._hotspotContainerWrapper.appendChild(this._hotspotContainer), this._updateHandler = this._update.bind(this), this._renderLoop.addEventListener("afterRender", this._updateHandler);
}
k1(Pe);
Pe.prototype.destroy = function() {
  for (; this._hotspots.length; )
    this.destroyHotspot(this._hotspots[0]);
  this._parentDomElement.removeChild(this._hotspotContainerWrapper), this._renderLoop.removeEventListener("afterRender", this._updateHandler), B1(this);
};
Pe.prototype.domElement = function() {
  return this._hotspotContainer;
};
Pe.prototype.setRect = function(e) {
  this._rect = e, this._visibilityOrRectChanged = !0;
};
Pe.prototype.rect = function() {
  return this._rect;
};
Pe.prototype.createHotspot = function(e, t, r) {
  t = t || {};
  var i = new W1(
    e,
    this._hotspotContainer,
    this._view,
    t,
    r
  );
  return this._hotspots.push(i), i._update(), this.emit("hotspotsChange"), i;
};
Pe.prototype.hasHotspot = function(e) {
  return this._hotspots.indexOf(e) >= 0;
};
Pe.prototype.listHotspots = function() {
  return [].concat(this._hotspots);
};
Pe.prototype.destroyHotspot = function(e) {
  var t = this._hotspots.indexOf(e);
  if (t < 0)
    throw new Error("No such hotspot");
  this._hotspots.splice(t, 1), e.destroy(), this.emit("hotspotsChange");
};
Pe.prototype.hide = function() {
  this._visible && (this._visible = !1, this._visibilityOrRectChanged = !0, this._update());
};
Pe.prototype.show = function() {
  this._visible || (this._visible = !0, this._visibilityOrRectChanged = !0, this._update());
};
Pe.prototype._update = function() {
  var e = this._hotspotContainerWrapper, t = this._stage.width(), r = this._stage.height(), i = this._tmpRect;
  if (this._visibilityOrRectChanged || this._rect && (t !== this._stageWidth || r !== this._stageHeight)) {
    var n = this._visible;
    e.style.display = n ? "block" : "none", n && (this._rect ? (Y1(t, r, this._rect, i), kn(e, t * i.x, r * i.y), U1(e, t * i.width, r * i.height), q1(e)) : (kn(e, 0, 0), X1(e), j1(e))), this._stageWidth = t, this._stageHeight = r, this._visibilityOrRectChanged = !1;
  }
  for (var a = 0; a < this._hotspots.length; a++)
    this._hotspots[a]._update();
};
var lo = Pe, G1 = Xs, Z1 = qs, K1 = lo, Q1 = oe, co = Pt, J1 = xr, em = gr, qn = Ue, tm = ne;
function fe(e, t) {
  this._viewer = e, this._view = t, this._layers = [], this._hotspotContainer = new K1(
    e._controlContainer,
    e.stage(),
    this._view,
    e.renderLoop()
  ), this._movement = null, this._movementStartTime = null, this._movementStep = null, this._movementParams = null, this._movementCallback = null, this._updateMovementHandler = this._updateMovement.bind(this), this._updateHotspotContainerHandler = this._updateHotspotContainer.bind(this), this._viewer.addEventListener("sceneChange", this._updateHotspotContainerHandler), this._viewChangeHandler = this.emit.bind(this, "viewChange"), this._view.addEventListener("change", this._viewChangeHandler), this._updateHotspotContainer();
}
Q1(fe);
fe.prototype.destroy = function() {
  this._view.removeEventListener("change", this._viewChangeHandler), this._viewer.removeEventListener("sceneChange", this._updateHotspotContainerHandler), this._movement && this.stopMovement(), this._hotspotContainer.destroy(), this.destroyAllLayers(), tm(this);
};
fe.prototype.hotspotContainer = function() {
  return this._hotspotContainer;
};
fe.prototype.layer = function() {
  return this._layers[0];
};
fe.prototype.listLayers = function() {
  return [].concat(this._layers);
};
fe.prototype.view = function() {
  return this._view;
};
fe.prototype.viewer = function() {
  return this._viewer;
};
fe.prototype.visible = function() {
  return this._viewer.scene() === this;
};
fe.prototype.createLayer = function(e) {
  e = e || {};
  var t = e.textureStoreOpts || {}, r = e.layerOpts || {}, i = e.source, n = e.geometry, a = this._view, s = this._viewer.stage(), o = new Z1(i, s, t), h = new G1(i, n, a, o, r);
  return this._layers.push(h), e.pinFirstLevel && h.pinFirstLevel(), this.emit("layerChange"), h;
};
fe.prototype.destroyLayer = function(e) {
  var t = this._layers.indexOf(e);
  if (t < 0)
    throw new Error("No such layer in scene");
  this._layers.splice(t, 1), this.emit("layerChange"), e.textureStore().destroy(), e.destroy();
};
fe.prototype.destroyAllLayers = function() {
  for (; this._layers.length > 0; )
    this.destroyLayer(this._layers[0]);
};
fe.prototype.switchTo = function(e, t) {
  return this._viewer.switchScene(this, e, t);
};
fe.prototype.lookTo = function(e, t, r) {
  var i = this;
  if (t = t || {}, r = r || J1, em(e) !== "object")
    throw new Error("Target view parameters must be an object");
  var n = function(m) {
    return (m *= 2) < 1 ? 0.5 * m * m : -0.5 * (--m * (m - 2) - 1);
  }, a = t.ease != null ? t.ease : n, s = t.controlsInterrupt != null ? t.controlsInterrupt : !1, o = t.transitionDuration != null ? t.transitionDuration : 1e3, h = t.shortest != null ? t.shortest : !0, l = this._view, c = l.parameters(), f = {};
  qn(f, e), qn(f, c), h && l.normalizeToClosest && l.normalizeToClosest(f, f);
  var u = function() {
    var m = !1;
    return function(x, y) {
      if (y >= o && m)
        return null;
      var M = Math.min(y / o, 1);
      for (var b in x) {
        var $ = c[b], L = f[b];
        x[b] = $ + a(M) * (L - $);
      }
      return m = y >= o, x;
    };
  }, p = this._viewer.controls().enabled();
  s || this._viewer.controls().disable(), this.startMovement(u, function() {
    p && i._viewer.controls().enable(), r();
  });
};
fe.prototype.startMovement = function(e, t) {
  var r = this._viewer.renderLoop();
  this._movement && this.stopMovement();
  var i = e();
  if (typeof i != "function")
    throw new Error("Bad movement");
  this._movement = e, this._movementStep = i, this._movementStartTime = co(), this._movementParams = {}, this._movementCallback = t, r.addEventListener("beforeRender", this._updateMovementHandler), r.renderOnNextFrame();
};
fe.prototype.stopMovement = function() {
  var e = this._movementCallback, t = this._viewer.renderLoop();
  this._movement && (this._movement = null, this._movementStep = null, this._movementStartTime = null, this._movementParams = null, this._movementCallback = null, t.removeEventListener("beforeRender", this._updateMovementHandler), e && e());
};
fe.prototype.movement = function() {
  return this._movement;
};
fe.prototype._updateMovement = function() {
  if (!this._movement)
    throw new Error("Should not call update");
  var e = this._viewer.renderLoop(), t = this._view, r = co() - this._movementStartTime, i = this._movementStep, n = this._movementParams;
  n = t.parameters(n), n = i(n, r), n == null ? this.stopMovement() : (t.setParameters(n), e.renderOnNextFrame());
};
fe.prototype._updateHotspotContainer = function() {
  this.visible() ? this._hotspotContainer.show() : this._hotspotContainer.hide();
};
var vo = fe, rm = oe, im = Ue, fo = Pt, nm = {
  duration: 1 / 0
};
function Be(e) {
  e = im(e || {}, nm), this._duration = e.duration, this._startTime = null, this._handle = null, this._check = this._check.bind(this);
}
rm(Be);
Be.prototype.start = function() {
  this._startTime = fo(), this._handle == null && this._duration < 1 / 0 && this._setup(this._duration);
};
Be.prototype.started = function() {
  return this._startTime != null;
};
Be.prototype.stop = function() {
  this._startTime = null, this._handle != null && (clearTimeout(this._handle), this._handle = null);
};
Be.prototype._setup = function(e) {
  this._handle = setTimeout(this._check, e);
};
Be.prototype._teardown = function() {
  clearTimeout(this._handle), this._handle = null;
};
Be.prototype._check = function() {
  var e = fo(), t = e - this._startTime, r = this._duration - t;
  this._teardown(), r <= 0 ? (this.emit("timeout"), this._startTime = null) : r < 1 / 0 && this._setup(r);
};
Be.prototype.duration = function() {
  return this._duration;
};
Be.prototype.setDuration = function(e) {
  this._duration = e, this._startTime != null && this._check();
};
var am = Be, sm = Ue, om = ne, hm = {
  active: "move",
  inactive: "default",
  disabled: "default"
};
function Bt(e, t, r, i) {
  i = sm(i || {}, hm), this._element = r, this._controls = e, this._id = t, this._attached = !1, this._setActiveCursor = this._setCursor.bind(this, i.active), this._setInactiveCursor = this._setCursor.bind(this, i.inactive), this._setDisabledCursor = this._setCursor.bind(this, i.disabled), this._setOriginalCursor = this._setCursor.bind(this, this._element.style.cursor), this._updateAttachmentHandler = this._updateAttachment.bind(this), e.addEventListener("methodEnabled", this._updateAttachmentHandler), e.addEventListener("methodDisabled", this._updateAttachmentHandler), e.addEventListener("enabled", this._updateAttachmentHandler), e.addEventListener("disabled", this._updateAttachmentHandler), this._updateAttachment();
}
Bt.prototype.destroy = function() {
  this._detachFromControlMethod(this._controls.method(this._id)), this._setOriginalCursor(), this._controls.removeEventListener(
    "methodEnabled",
    this._updateAttachmentHandler
  ), this._controls.removeEventListener(
    "methodDisabled",
    this._updateAttachmentHandler
  ), this._controls.removeEventListener(
    "enabled",
    this._updateAttachmentHandler
  ), this._controls.removeEventListener(
    "disabled",
    this._updateAttachmentHandler
  ), om(this);
};
Bt.prototype._updateAttachment = function() {
  var e = this._controls, t = this._id;
  e.enabled() && e.method(t).enabled ? this._attachToControlMethod(e.method(t)) : this._detachFromControlMethod(e.method(t));
};
Bt.prototype._attachToControlMethod = function(e) {
  this._attached || (e.instance.addEventListener("active", this._setActiveCursor), e.instance.addEventListener("inactive", this._setInactiveCursor), e.active ? this._setActiveCursor() : this._setInactiveCursor(), this._attached = !0);
};
Bt.prototype._detachFromControlMethod = function(e) {
  this._attached && (e.instance.removeEventListener("active", this._setActiveCursor), e.instance.removeEventListener("inactive", this._setInactiveCursor), this._setDisabledCursor(), this._attached = !1);
};
Bt.prototype._setCursor = function(e) {
  this._element.style.cursor = e;
};
var lm = Bt, cm = Ue, Di = eo, vm = to, fm = io, um = no, ze = Bs, dm = {
  mouseViewMode: "drag",
  dragMode: "pan"
};
function pm(e, t, r) {
  r = cm(r || {}, dm);
  var i = {
    mouseViewDrag: new Di(t, "mouse"),
    mouseViewQtvr: new vm(t, "mouse"),
    leftArrowKey: new ze(37, "x", -0.7, 3),
    rightArrowKey: new ze(39, "x", 0.7, 3),
    upArrowKey: new ze(38, "y", -0.7, 3),
    downArrowKey: new ze(40, "y", 0.7, 3),
    plusKey: new ze(107, "zoom", -0.7, 3),
    minusKey: new ze(109, "zoom", 0.7, 3),
    wKey: new ze(87, "y", -0.7, 3),
    aKey: new ze(65, "x", -0.7, 3),
    sKey: new ze(83, "y", 0.7, 3),
    dKey: new ze(68, "x", 0.7, 3),
    qKey: new ze(81, "roll", 0.7, 3),
    eKey: new ze(69, "roll", -0.7, 3)
  }, n = ["scrollZoom", "touchView", "pinch"];
  r.scrollZoom !== !1 && (i.scrollZoom = new fm(t));
  var a = {
    arrowKeys: ["leftArrowKey", "rightArrowKey", "upArrowKey", "downArrowKey"],
    plusMinusKeys: ["plusKey", "minusKey"],
    wasdKeys: ["wKey", "aKey", "sKey", "dKey"],
    qeKeys: ["qKey", "eKey"]
  };
  switch (r.dragMode) {
    case "pinch":
      i.pinch = new Di(t, "touch", { hammerEvent: "pinch" });
      break;
    case "pan":
      i.touchView = new Di(t, "touch"), i.pinch = new um(t, "touch");
      break;
    default:
      throw new Error("Unknown drag mode: " + r.dragMode);
  }
  switch (r.mouseViewMode) {
    case "drag":
      n.push("mouseViewDrag");
      break;
    case "qtvr":
      n.push("mouseViewQtvr");
      break;
    default:
      throw new Error("Unknown mouse view mode: " + r.mouseViewMode);
  }
  for (var s in i) {
    var o = i[s];
    e.registerMethod(s, o), n.indexOf(s) >= 0 && e.enableMethod(s);
  }
  for (var h in a) {
    var l = a[h];
    e.addMethodGroup(h, l);
  }
  return i;
}
var uo = pm, jn = Pt;
function _m(e, t, r) {
  var i = !1, n = jn();
  function a() {
    if (!i) {
      var s = (jn() - n) / e;
      s < 1 ? (t(s), requestAnimationFrame(a)) : (t(1), r());
    }
  }
  return t(0), requestAnimationFrame(a), function() {
    i = !0, r.apply(null, arguments);
  };
}
var po = _m, mm = oe, ym = Us, gm = so, wm = vo, xm = am, Mm = ca, Em = lm, Xn = ni, Tm = uo, bm = $s, Cm = be.setOverflowHidden, Sm = be.setAbsolute, Pm = be.setFullSize, $m = po, Lm = xr, Rm = ne;
function Q(e, t) {
  t = t || {}, this._domElement = e, Cm(e), this._stage = new Mm(t.stage), bm(this._stage), this._domElement.appendChild(this._stage.domElement()), this._controlContainer = document.createElement("div"), Sm(this._controlContainer), Pm(this._controlContainer), e.appendChild(this._controlContainer), this._size = {}, this.updateSize(), this._updateSizeListener = this.updateSize.bind(this), window.addEventListener("resize", this._updateSizeListener), this._renderLoop = new ym(this._stage), this._controls = new gm(), this._controlMethods = Tm(this._controls, this._controlContainer, t.controls), this._controls.attach(this._renderLoop), this._hammerManagerTouch = Xn.get(this._controlContainer, "touch"), this._hammerManagerMouse = Xn.get(this._controlContainer, "mouse"), this._dragCursor = new Em(this._controls, "mouseViewDrag", e, t.cursors && t.cursors.drag || {}), this._renderLoop.start(), this._scenes = [], this._currentScene = null, this._replacedScene = null, this._cancelCurrentTween = null, this._layerChangeHandler = this._updateSceneLayers.bind(this), this._viewChangeHandler = this.emit.bind(this, "viewChange"), this._idleTimer = new xm(), this._idleTimer.start(), this._resetIdleTimerHandler = this._resetIdleTimer.bind(this), this.addEventListener("viewChange", this._resetIdleTimerHandler), this._triggerIdleTimerHandler = this._triggerIdleTimer.bind(this), this._idleTimer.addEventListener("timeout", this._triggerIdleTimerHandler), this._stopMovementHandler = this.stopMovement.bind(this), this._controls.addEventListener("active", this._stopMovementHandler), this.addEventListener("sceneChange", this._stopMovementHandler), this._idleMovement = null;
}
mm(Q);
Q.prototype.destroy = function() {
  window.removeEventListener("resize", this._updateSizeListener), this._currentScene && this._removeSceneEventListeners(this._currentScene), this._replacedScene && this._removeSceneEventListeners(this._replacedScene), this._dragCursor.destroy();
  for (var e in this._controlMethods)
    this._controlMethods[e].destroy();
  for (; this._scenes.length; )
    this.destroyScene(this._scenes[0]);
  this._domElement.removeChild(this._stage.domElement()), this._stage.destroy(), this._renderLoop.destroy(), this._controls.destroy(), this._controls = null, this._cancelCurrentTween && this._cancelCurrentTween(), Rm(this);
};
Q.prototype.updateSize = function() {
  var e = this._size;
  e.width = this._domElement.clientWidth, e.height = this._domElement.clientHeight, this._stage.setSize(e);
};
Q.prototype.stage = function() {
  return this._stage;
};
Q.prototype.renderLoop = function() {
  return this._renderLoop;
};
Q.prototype.controls = function() {
  return this._controls;
};
Q.prototype.domElement = function() {
  return this._domElement;
};
Q.prototype.createScene = function(e) {
  e = e || {};
  var t = this.createEmptyScene({ view: e.view });
  return t.createLayer({
    source: e.source,
    geometry: e.geometry,
    pinFirstLevel: e.pinFirstLevel,
    textureStoreOpts: e.textureStoreOpts,
    layerOpts: e.layerOpts
  }), t;
};
Q.prototype.createEmptyScene = function(e) {
  e = e || {};
  var t = new wm(this, e.view);
  return this._scenes.push(t), t;
};
Q.prototype._updateSceneLayers = function() {
  var e, t, r = this._stage, i = this._currentScene, n = this._replacedScene, a = r.listLayers(), s = [];
  if (n && (s = s.concat(n.listLayers())), i && (s = s.concat(i.listLayers())), Math.abs(a.length - s.length) !== 1)
    throw new Error("Stage and scene out of sync");
  if (s.length < a.length) {
    for (e = 0; e < a.length; e++)
      if (t = a[e], s.indexOf(t) < 0) {
        this._removeLayerFromStage(t);
        break;
      }
  }
  if (s.length > a.length)
    for (e = 0; e < s.length; e++)
      t = s[e], a.indexOf(t) < 0 && this._addLayerToStage(t, e);
};
Q.prototype._addLayerToStage = function(e, t) {
  e.pinFirstLevel(), this._stage.addLayer(e, t);
};
Q.prototype._removeLayerFromStage = function(e) {
  this._stage.removeLayer(e), e.unpinFirstLevel(), e.textureStore().clearNotPinned();
};
Q.prototype._addSceneEventListeners = function(e) {
  e.addEventListener("layerChange", this._layerChangeHandler), e.addEventListener("viewChange", this._viewChangeHandler);
};
Q.prototype._removeSceneEventListeners = function(e) {
  e.removeEventListener("layerChange", this._layerChangeHandler), e.removeEventListener("viewChange", this._viewChangeHandler);
};
Q.prototype.destroyScene = function(e) {
  var t = this._scenes.indexOf(e);
  if (t < 0)
    throw new Error("No such scene in viewer");
  var r, i;
  if (this._currentScene === e) {
    for (this._removeSceneEventListeners(e), i = e.listLayers(), r = 0; r < i.length; r++)
      this._removeLayerFromStage(i[r]);
    this._cancelCurrentTween && (this._cancelCurrentTween(), this._cancelCurrentTween = null), this._currentScene = null, this.emit("sceneChange");
  }
  if (this._replacedScene === e) {
    for (this._removeSceneEventListeners(e), i = e.listLayers(), r = 0; r < i.length; r++)
      this._removeLayerFromStage(i[r]);
    this._replacedScene = null;
  }
  this._scenes.splice(t, 1), e.destroy();
};
Q.prototype.destroyAllScenes = function() {
  for (; this._scenes.length > 0; )
    this.destroyScene(this._scenes[0]);
};
Q.prototype.hasScene = function(e) {
  return this._scenes.indexOf(e) >= 0;
};
Q.prototype.listScenes = function() {
  return [].concat(this._scenes);
};
Q.prototype.scene = function() {
  return this._currentScene;
};
Q.prototype.view = function() {
  var e = this._currentScene;
  return e ? e.view() : null;
};
Q.prototype.lookTo = function(e, t, r) {
  var i = this._currentScene;
  i && i.lookTo(e, t, r);
};
Q.prototype.startMovement = function(e, t) {
  var r = this._currentScene;
  r && r.startMovement(e, t);
};
Q.prototype.stopMovement = function() {
  var e = this._currentScene;
  e && e.stopMovement();
};
Q.prototype.movement = function() {
  var e = this._currentScene;
  if (e)
    return e.movement();
};
Q.prototype.setIdleMovement = function(e, t) {
  this._idleTimer.setDuration(e), this._idleMovement = t;
};
Q.prototype.breakIdleMovement = function() {
  this.stopMovement(), this._resetIdleTimer();
};
Q.prototype._resetIdleTimer = function() {
  this._idleTimer.start();
};
Q.prototype._triggerIdleTimer = function() {
  var e = this._idleMovement;
  e && this.startMovement(e);
};
var Am = 1e3;
function zm(e, t, r) {
  var i = t.listLayers();
  i.forEach(function(n) {
    n.mergeEffects({ opacity: e });
  }), t._hotspotContainer.domElement().style.opacity = e;
}
Q.prototype.switchScene = function(e, t, r) {
  var i = this;
  t = t || {}, r = r || Lm;
  var n = this._stage, a = this._currentScene;
  if (a === e) {
    r();
    return;
  }
  if (this._scenes.indexOf(e) < 0)
    throw new Error("No such scene in viewer");
  this._cancelCurrentTween && (this._cancelCurrentTween(), this._cancelCurrentTween = null);
  var s = a ? a.listLayers() : [], o = e.listLayers(), h = n.listLayers();
  if (a && (h.length !== s.length || h.length > 1 && h[0] != s[0]))
    throw new Error("Stage not in sync with viewer");
  for (var l = t.transitionDuration != null ? t.transitionDuration : Am, c = t.transitionUpdate != null ? t.transitionUpdate : zm, f = 0; f < o.length; f++)
    this._addLayerToStage(o[f]);
  function u(m) {
    c(m, e, a);
  }
  function p() {
    if (i._replacedScene) {
      i._removeSceneEventListeners(i._replacedScene), s = i._replacedScene.listLayers();
      for (var m = 0; m < s.length; m++)
        i._removeLayerFromStage(s[m]);
      i._replacedScene = null;
    }
    i._cancelCurrentTween = null, r();
  }
  this._cancelCurrentTween = $m(l, u, p), this._currentScene = e, this._replacedScene = a, this.emit("sceneChange"), this.emit("viewChange"), this._addSceneEventListeners(e);
};
var Om = Q, ai = ye.vec4, Im = ye.mat4;
function Dm(e) {
  var t = e || {};
  return t.colorOffset = t.colorOffset || ai.create(), t.colorMatrix = t.colorMatrix || Im.create(), t;
}
function _o(e, t, r) {
  Hm(r, e, t.colorMatrix), ai.add(r, r, t.colorOffset);
}
function Hm(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3];
  return e[0] = r[0] * i + r[1] * n + r[2] * a + r[3] * s, e[1] = r[4] * i + r[5] * n + r[6] * a + r[7] * s, e[2] = r[8] * i + r[9] * n + r[10] * a + r[11] * s, e[3] = r[12] * i + r[13] * n + r[14] * a + r[15] * s, e;
}
var Mt = ai.create();
function Fm(e, t) {
  for (var r = e.width, i = e.height, n = e.data, a = 0; a < r * i; a++)
    ai.set(Mt, n[a * 4 + 0] / 255, n[a * 4 + 1] / 255, n[a * 4 + 2] / 255, n[a * 4 + 3] / 255), _o(Mt, t, Mt), n[a * 4 + 0] = Mt[0] * 255, n[a * 4 + 1] = Mt[1] * 255, n[a * 4 + 2] = Mt[2] * 255, n[a * 4 + 3] = Mt[3] * 255;
}
var Nm = {
  identity: Dm,
  applyToPixel: _o,
  applyToImageData: Fm
}, Vm = Ue, Hi = 0.1, Fi = 0.01, km = {
  yawSpeed: Hi,
  pitchSpeed: Hi,
  fovSpeed: Hi,
  yawAccel: Fi,
  pitchAccel: Fi,
  fovAccel: Fi,
  targetPitch: 0,
  targetFov: null
};
function Wm(e) {
  e = Vm(e || {}, km);
  var t = e.yawSpeed, r = e.pitchSpeed, i = e.fovSpeed, n = e.yawAccel, a = e.pitchAccel, s = e.fovAccel, o = e.targetPitch, h = e.targetFov;
  return function() {
    var c = 0, f = 0, u = 0, p = 0, m = 0, x = 0, y = 0, M, b, $, L;
    return function(P, k) {
      if (M = (k - c) / 1e3, m = Math.min(f + M * n, t), b = m * M, P.yaw = P.yaw + b, o != null && P.pitch !== o) {
        var X = 0.5 * u * u / a;
        Math.abs(o - P.pitch) > X ? x = Math.min(u + M * a, r) : x = Math.max(u - M * a, 0), $ = x * M, o < P.pitch && (P.pitch = Math.max(o, P.pitch - $)), o > P.pitch && (P.pitch = Math.min(o, P.pitch + $));
      }
      if (h != null && P.fov !== o) {
        var W = 0.5 * p * p / s;
        Math.abs(h - P.fov) > W ? y = Math.min(p + M * s, i) : y = Math.max(p - M * s, 0), L = y * M, h < P.fov && (P.fov = Math.max(h, P.fov - L)), h > P.fov && (P.fov = Math.min(h, P.fov + L));
      }
      return c = k, f = m, u = x, p = y, P;
    };
  };
}
var Ym = Wm;
function qm(e, t) {
  function r() {
    t && t.length > 0 ? e.apply(null, t) : e();
  }
  setTimeout(r, 0);
}
var jm = qm;
function Xm(e) {
  return e * Math.PI / 180;
}
var Um = Xm;
function Bm(e) {
  return e * 180 / Math.PI;
}
var Gm = Bm, bt = {
  // Stages.
  WebGlStage: ca,
  // Renderers.
  WebGlCubeRenderer: Ts,
  WebGlFlatRenderer: Cs,
  WebGlEquirectRenderer: Ps,
  registerDefaultRenderers: $s,
  // Geometries.
  CubeGeometry: cp,
  FlatGeometry: wp,
  EquirectGeometry: Cp,
  // Views.
  RectilinearView: Up,
  FlatView: r_,
  // Sources.
  ImageUrlSource: g_,
  SingleAssetSource: w_,
  // Assets.
  StaticAsset: Gi,
  DynamicAsset: b_,
  // Texture store.
  TextureStore: qs,
  // Layer.
  Layer: Xs,
  // Render loop.
  RenderLoop: Us,
  // Controls.
  KeyControlMethod: Bs,
  DragControlMethod: eo,
  QtvrControlMethod: to,
  ScrollZoomControlMethod: io,
  PinchZoomControlMethod: no,
  VelocityControlMethod: M1,
  ElementPressControlMethod: C1,
  Controls: so,
  Dynamics: tt,
  // High-level API.
  Viewer: Om,
  Scene: vo,
  // Hotspots.
  Hotspot: ho,
  HotspotContainer: lo,
  // Effects.
  colorEffects: Nm,
  // Miscellaneous functions.
  registerDefaultControls: uo,
  autorotate: Ym,
  // Utility functions.
  util: {
    async: ta,
    cancelize: ra,
    chain: pn,
    clamp: qt,
    clearOwnProperties: ne,
    cmp: mr,
    compose: Is,
    convertFov: Os,
    decimal: dn,
    defaults: Ue,
    defer: jm,
    degToRad: Um,
    delay: Vs,
    dom: be,
    extend: js,
    hash: Jr,
    inherits: qe,
    mod: vt,
    noop: xr,
    now: Pt,
    once: Ui,
    pixelRatio: Kr,
    radToDeg: Gm,
    real: un,
    retry: ks,
    tween: po,
    type: gr
  },
  // Expose dependencies for clients to use.
  dependencies: {
    bowser: Zi,
    glMatrix: ye,
    eventEmitter: oe,
    hammerjs: Zs
  }
}, ur = function() {
  return ur = Object.assign || function(t) {
    for (var r, i = 1, n = arguments.length; i < n; i++) {
      r = arguments[i];
      for (var a in r)
        Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
  }, ur.apply(this, arguments);
};
var ji = { exports: {} }, sr = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Un;
function Zm() {
  if (Un)
    return sr;
  Un = 1;
  var e = Gn, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, n = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
  function s(o, h, l) {
    var c, f = {}, u = null, p = null;
    l !== void 0 && (u = "" + l), h.key !== void 0 && (u = "" + h.key), h.ref !== void 0 && (p = h.ref);
    for (c in h)
      i.call(h, c) && !a.hasOwnProperty(c) && (f[c] = h[c]);
    if (o && o.defaultProps)
      for (c in h = o.defaultProps, h)
        f[c] === void 0 && (f[c] = h[c]);
    return { $$typeof: t, type: o, key: u, ref: p, props: f, _owner: n.current };
  }
  return sr.Fragment = r, sr.jsx = s, sr.jsxs = s, sr;
}
var or = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Bn;
function Km() {
  return Bn || (Bn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Gn, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), s = Symbol.for("react.provider"), o = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), u = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), m = Symbol.iterator, x = "@@iterator";
    function y(_) {
      if (_ === null || typeof _ != "object")
        return null;
      var T = m && _[m] || _[x];
      return typeof T == "function" ? T : null;
    }
    var M = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function b(_) {
      {
        for (var T = arguments.length, S = new Array(T > 1 ? T - 1 : 0), O = 1; O < T; O++)
          S[O - 1] = arguments[O];
        $("error", _, S);
      }
    }
    function $(_, T, S) {
      {
        var O = M.ReactDebugCurrentFrame, B = O.getStackAddendum();
        B !== "" && (T += "%s", S = S.concat([B]));
        var G = S.map(function(H) {
          return String(H);
        });
        G.unshift("Warning: " + T), Function.prototype.apply.call(console[_], console, G);
      }
    }
    var L = !1, R = !1, P = !1, k = !1, X = !1, W;
    W = Symbol.for("react.module.reference");
    function Y(_) {
      return !!(typeof _ == "string" || typeof _ == "function" || _ === i || _ === a || X || _ === n || _ === l || _ === c || k || _ === p || L || R || P || typeof _ == "object" && _ !== null && (_.$$typeof === u || _.$$typeof === f || _.$$typeof === s || _.$$typeof === o || _.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      _.$$typeof === W || _.getModuleId !== void 0));
    }
    function D(_, T, S) {
      var O = _.displayName;
      if (O)
        return O;
      var B = T.displayName || T.name || "";
      return B !== "" ? S + "(" + B + ")" : S;
    }
    function U(_) {
      return _.displayName || "Context";
    }
    function q(_) {
      if (_ == null)
        return null;
      if (typeof _.tag == "number" && b("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof _ == "function")
        return _.displayName || _.name || null;
      if (typeof _ == "string")
        return _;
      switch (_) {
        case i:
          return "Fragment";
        case r:
          return "Portal";
        case a:
          return "Profiler";
        case n:
          return "StrictMode";
        case l:
          return "Suspense";
        case c:
          return "SuspenseList";
      }
      if (typeof _ == "object")
        switch (_.$$typeof) {
          case o:
            var T = _;
            return U(T) + ".Consumer";
          case s:
            var S = _;
            return U(S._context) + ".Provider";
          case h:
            return D(_, _.render, "ForwardRef");
          case f:
            var O = _.displayName || null;
            return O !== null ? O : q(_.type) || "Memo";
          case u: {
            var B = _, G = B._payload, H = B._init;
            try {
              return q(H(G));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var z = Object.assign, w = 0, $e, re, Ne, Ce, ge, Cr, It;
    function Sr() {
    }
    Sr.__reactDisabledLog = !0;
    function si() {
      {
        if (w === 0) {
          $e = console.log, re = console.info, Ne = console.warn, Ce = console.error, ge = console.group, Cr = console.groupCollapsed, It = console.groupEnd;
          var _ = {
            configurable: !0,
            enumerable: !0,
            value: Sr,
            writable: !0
          };
          Object.defineProperties(console, {
            info: _,
            log: _,
            warn: _,
            error: _,
            group: _,
            groupCollapsed: _,
            groupEnd: _
          });
        }
        w++;
      }
    }
    function we() {
      {
        if (w--, w === 0) {
          var _ = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: z({}, _, {
              value: $e
            }),
            info: z({}, _, {
              value: re
            }),
            warn: z({}, _, {
              value: Ne
            }),
            error: z({}, _, {
              value: Ce
            }),
            group: z({}, _, {
              value: ge
            }),
            groupCollapsed: z({}, _, {
              value: Cr
            }),
            groupEnd: z({}, _, {
              value: It
            })
          });
        }
        w < 0 && b("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ie = M.ReactCurrentDispatcher, ae;
    function ve(_, T, S) {
      {
        if (ae === void 0)
          try {
            throw Error();
          } catch (B) {
            var O = B.stack.trim().match(/\n( *(at )?)/);
            ae = O && O[1] || "";
          }
        return `
` + ae + _;
      }
    }
    var it = !1, Ve;
    {
      var pt = typeof WeakMap == "function" ? WeakMap : Map;
      Ve = new pt();
    }
    function nt(_, T) {
      if (!_ || it)
        return "";
      {
        var S = Ve.get(_);
        if (S !== void 0)
          return S;
      }
      var O;
      it = !0;
      var B = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var G;
      G = Ie.current, Ie.current = null, si();
      try {
        if (T) {
          var H = function() {
            throw Error();
          };
          if (Object.defineProperty(H.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(H, []);
            } catch (Ae) {
              O = Ae;
            }
            Reflect.construct(_, [], H);
          } else {
            try {
              H.call();
            } catch (Ae) {
              O = Ae;
            }
            _.call(H.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ae) {
            O = Ae;
          }
          _();
        }
      } catch (Ae) {
        if (Ae && O && typeof Ae.stack == "string") {
          for (var N = Ae.stack.split(`
`), se = O.stack.split(`
`), Z = N.length - 1, ie = se.length - 1; Z >= 1 && ie >= 0 && N[Z] !== se[ie]; )
            ie--;
          for (; Z >= 1 && ie >= 0; Z--, ie--)
            if (N[Z] !== se[ie]) {
              if (Z !== 1 || ie !== 1)
                do
                  if (Z--, ie--, ie < 0 || N[Z] !== se[ie]) {
                    var he = `
` + N[Z].replace(" at new ", " at ");
                    return _.displayName && he.includes("<anonymous>") && (he = he.replace("<anonymous>", _.displayName)), typeof _ == "function" && Ve.set(_, he), he;
                  }
                while (Z >= 1 && ie >= 0);
              break;
            }
        }
      } finally {
        it = !1, Ie.current = G, we(), Error.prepareStackTrace = B;
      }
      var xe = _ ? _.displayName || _.name : "", Dr = xe ? ve(xe) : "";
      return typeof _ == "function" && Ve.set(_, Dr), Dr;
    }
    function _t(_, T, S) {
      return nt(_, !1);
    }
    function Le(_) {
      var T = _.prototype;
      return !!(T && T.isReactComponent);
    }
    function Re(_, T, S) {
      if (_ == null)
        return "";
      if (typeof _ == "function")
        return nt(_, Le(_));
      if (typeof _ == "string")
        return ve(_);
      switch (_) {
        case l:
          return ve("Suspense");
        case c:
          return ve("SuspenseList");
      }
      if (typeof _ == "object")
        switch (_.$$typeof) {
          case h:
            return _t(_.render);
          case f:
            return Re(_.type, T, S);
          case u: {
            var O = _, B = O._payload, G = O._init;
            try {
              return Re(G(B), T, S);
            } catch {
            }
          }
        }
      return "";
    }
    var mt = Object.prototype.hasOwnProperty, Gt = {}, yt = M.ReactDebugCurrentFrame;
    function _e(_) {
      if (_) {
        var T = _._owner, S = Re(_.type, _._source, T ? T.type : null);
        yt.setExtraStackFrame(S);
      } else
        yt.setExtraStackFrame(null);
    }
    function oi(_, T, S, O, B) {
      {
        var G = Function.call.bind(mt);
        for (var H in _)
          if (G(_, H)) {
            var N = void 0;
            try {
              if (typeof _[H] != "function") {
                var se = Error((O || "React class") + ": " + S + " type `" + H + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof _[H] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw se.name = "Invariant Violation", se;
              }
              N = _[H](T, H, O, S, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (Z) {
              N = Z;
            }
            N && !(N instanceof Error) && (_e(B), b("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", O || "React class", S, H, typeof N), _e(null)), N instanceof Error && !(N.message in Gt) && (Gt[N.message] = !0, _e(B), b("Failed %s type: %s", S, N.message), _e(null));
          }
      }
    }
    var hi = Array.isArray;
    function Zt(_) {
      return hi(_);
    }
    function li(_) {
      {
        var T = typeof Symbol == "function" && Symbol.toStringTag, S = T && _[Symbol.toStringTag] || _.constructor.name || "Object";
        return S;
      }
    }
    function ci(_) {
      try {
        return Kt(_), !1;
      } catch {
        return !0;
      }
    }
    function Kt(_) {
      return "" + _;
    }
    function Qt(_) {
      if (ci(_))
        return b("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", li(_)), Kt(_);
    }
    var gt = M.ReactCurrentOwner, Pr = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, wt, Dt, Jt;
    Jt = {};
    function vi(_) {
      if (mt.call(_, "ref")) {
        var T = Object.getOwnPropertyDescriptor(_, "ref").get;
        if (T && T.isReactWarning)
          return !1;
      }
      return _.ref !== void 0;
    }
    function fi(_) {
      if (mt.call(_, "key")) {
        var T = Object.getOwnPropertyDescriptor(_, "key").get;
        if (T && T.isReactWarning)
          return !1;
      }
      return _.key !== void 0;
    }
    function ui(_, T) {
      if (typeof _.ref == "string" && gt.current && T && gt.current.stateNode !== T) {
        var S = q(gt.current.type);
        Jt[S] || (b('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', q(gt.current.type), _.ref), Jt[S] = !0);
      }
    }
    function di(_, T) {
      {
        var S = function() {
          wt || (wt = !0, b("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", T));
        };
        S.isReactWarning = !0, Object.defineProperty(_, "key", {
          get: S,
          configurable: !0
        });
      }
    }
    function Ht(_, T) {
      {
        var S = function() {
          Dt || (Dt = !0, b("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", T));
        };
        S.isReactWarning = !0, Object.defineProperty(_, "ref", {
          get: S,
          configurable: !0
        });
      }
    }
    var pi = function(_, T, S, O, B, G, H) {
      var N = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: _,
        key: T,
        ref: S,
        props: H,
        // Record the component responsible for creating this element.
        _owner: G
      };
      return N._store = {}, Object.defineProperty(N._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(N, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: O
      }), Object.defineProperty(N, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: B
      }), Object.freeze && (Object.freeze(N.props), Object.freeze(N)), N;
    };
    function _i(_, T, S, O, B) {
      {
        var G, H = {}, N = null, se = null;
        S !== void 0 && (Qt(S), N = "" + S), fi(T) && (Qt(T.key), N = "" + T.key), vi(T) && (se = T.ref, ui(T, B));
        for (G in T)
          mt.call(T, G) && !Pr.hasOwnProperty(G) && (H[G] = T[G]);
        if (_ && _.defaultProps) {
          var Z = _.defaultProps;
          for (G in Z)
            H[G] === void 0 && (H[G] = Z[G]);
        }
        if (N || se) {
          var ie = typeof _ == "function" ? _.displayName || _.name || "Unknown" : _;
          N && di(H, ie), se && Ht(H, ie);
        }
        return pi(_, N, se, B, O, gt.current, H);
      }
    }
    var Ft = M.ReactCurrentOwner, er = M.ReactDebugCurrentFrame;
    function ke(_) {
      if (_) {
        var T = _._owner, S = Re(_.type, _._source, T ? T.type : null);
        er.setExtraStackFrame(S);
      } else
        er.setExtraStackFrame(null);
    }
    var tr;
    tr = !1;
    function rr(_) {
      return typeof _ == "object" && _ !== null && _.$$typeof === t;
    }
    function $r() {
      {
        if (Ft.current) {
          var _ = q(Ft.current.type);
          if (_)
            return `

Check the render method of \`` + _ + "`.";
        }
        return "";
      }
    }
    function Lr(_) {
      {
        if (_ !== void 0) {
          var T = _.fileName.replace(/^.*[\\\/]/, ""), S = _.lineNumber;
          return `

Check your code at ` + T + ":" + S + ".";
        }
        return "";
      }
    }
    var Rr = {};
    function mi(_) {
      {
        var T = $r();
        if (!T) {
          var S = typeof _ == "string" ? _ : _.displayName || _.name;
          S && (T = `

Check the top-level render call using <` + S + ">.");
        }
        return T;
      }
    }
    function Ar(_, T) {
      {
        if (!_._store || _._store.validated || _.key != null)
          return;
        _._store.validated = !0;
        var S = mi(T);
        if (Rr[S])
          return;
        Rr[S] = !0;
        var O = "";
        _ && _._owner && _._owner !== Ft.current && (O = " It was passed a child from " + q(_._owner.type) + "."), ke(_), b('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', S, O), ke(null);
      }
    }
    function xt(_, T) {
      {
        if (typeof _ != "object")
          return;
        if (Zt(_))
          for (var S = 0; S < _.length; S++) {
            var O = _[S];
            rr(O) && Ar(O, T);
          }
        else if (rr(_))
          _._store && (_._store.validated = !0);
        else if (_) {
          var B = y(_);
          if (typeof B == "function" && B !== _.entries)
            for (var G = B.call(_), H; !(H = G.next()).done; )
              rr(H.value) && Ar(H.value, T);
        }
      }
    }
    function yi(_) {
      {
        var T = _.type;
        if (T == null || typeof T == "string")
          return;
        var S;
        if (typeof T == "function")
          S = T.propTypes;
        else if (typeof T == "object" && (T.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        T.$$typeof === f))
          S = T.propTypes;
        else
          return;
        if (S) {
          var O = q(T);
          oi(S, _.props, "prop", O, _);
        } else if (T.PropTypes !== void 0 && !tr) {
          tr = !0;
          var B = q(T);
          b("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", B || "Unknown");
        }
        typeof T.getDefaultProps == "function" && !T.getDefaultProps.isReactClassApproved && b("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function ir(_) {
      {
        for (var T = Object.keys(_.props), S = 0; S < T.length; S++) {
          var O = T[S];
          if (O !== "children" && O !== "key") {
            ke(_), b("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", O), ke(null);
            break;
          }
        }
        _.ref !== null && (ke(_), b("Invalid attribute `ref` supplied to `React.Fragment`."), ke(null));
      }
    }
    function nr(_, T, S, O, B, G) {
      {
        var H = Y(_);
        if (!H) {
          var N = "";
          (_ === void 0 || typeof _ == "object" && _ !== null && Object.keys(_).length === 0) && (N += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var se = Lr(B);
          se ? N += se : N += $r();
          var Z;
          _ === null ? Z = "null" : Zt(_) ? Z = "array" : _ !== void 0 && _.$$typeof === t ? (Z = "<" + (q(_.type) || "Unknown") + " />", N = " Did you accidentally export a JSX literal instead of a component?") : Z = typeof _, b("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Z, N);
        }
        var ie = _i(_, T, S, B, G);
        if (ie == null)
          return ie;
        if (H) {
          var he = T.children;
          if (he !== void 0)
            if (O)
              if (Zt(he)) {
                for (var xe = 0; xe < he.length; xe++)
                  xt(he[xe], _);
                Object.freeze && Object.freeze(he);
              } else
                b("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              xt(he, _);
        }
        return _ === i ? ir(ie) : yi(ie), ie;
      }
    }
    function zr(_, T, S) {
      return nr(_, T, S, !0);
    }
    function Or(_, T, S) {
      return nr(_, T, S, !1);
    }
    var Ir = Or, ar = zr;
    or.Fragment = i, or.jsx = Ir, or.jsxs = ar;
  }()), or;
}
process.env.NODE_ENV === "production" ? ji.exports = Zm() : ji.exports = Km();
var Xi = ji.exports, Qm = {
  controls: {
    mouseViewMode: "drag",
    scrollZoom: !0
  }
};
function Jm(e) {
  var t = e.viewerOpts, r = t === void 0 ? Qm : t, i = Mo(null), n = Ni(null), a = n[0], s = n[1];
  return dr(function() {
    if (i.current) {
      var o = new bt.Viewer(i.current, r);
      s(o);
    }
    return function() {
      a && (a == null || a.destroy());
    };
  }, []), {
    viewerRef: i,
    viewer: a
  };
}
var e0 = {
  viewerRef: null,
  viewer: null
}, mo = Zn(e0), t0 = function() {
  return Kn(mo);
};
function i0(e) {
  var t = e.children, r = e.opts, i = e.className, n = e.style, a = e.onLoaded, s = Jm({ viewerOpts: r }), o = s.viewerRef, h = s.viewer;
  return dr(function() {
    !o.current || !h || a && a(h);
  }, []), Xi.jsx("div", ur({ ref: o, className: i, style: n }, { children: Xi.jsx(mo.Provider, ur({ value: { viewerRef: o, viewer: h } }, { children: t })) }));
}
var yo = Zn({
  setGeometry: function() {
  },
  setView: function() {
  }
}), go = function() {
  return Kn(yo);
};
function n0(e) {
  var t = e.children, r = e.source, i = e.onLoaded, n = t0(), a = n.viewerRef, s = n.viewer, o = Ni(null), h = o[0], l = o[1], c = Ni(null), f = c[0], u = c[1];
  return dr(function() {
    if (!(!a || !s || !h || !f)) {
      var p;
      typeof r == "string" ? p = bt.ImageUrlSource.fromString(r, {}) : p = r;
      var m = s.createScene({
        source: p,
        geometry: h,
        view: f,
        pinFirstLevel: !0
      });
      return m.switchTo(), i && i(m), function() {
        m.destroy();
      };
    }
  }, [a, s, i]), Xi.jsx(yo.Provider, ur({ value: { setGeometry: l, setView: u } }, { children: t }));
}
function a0(e) {
  var t = e.levelPropertiesList, r = go().setGeometry;
  return dr(function() {
    var i = new bt.EquirectGeometry(t);
    r(i);
  }, [t, r]), null;
}
function s0(e) {
  var t = e.params, r = go().setView;
  return dr(function() {
    var i = new bt.RectilinearView(t);
    r(i);
  }, [t, r]), null;
}
function o0() {
  return {
    CubeGeometry: function(e) {
      return new bt.CubeGeometry(e);
    },
    EquirectGeometry: function(e) {
      return new bt.EquirectGeometry(e);
    },
    FlatGeometry: function(e) {
      return new bt.FlatGeometry(e);
    }
  };
}
export {
  a0 as EquirectGeometry,
  s0 as RectilinearView,
  n0 as Scene,
  i0 as Viewer,
  o0 as useGeometry,
  Jm as useMarzipano
};
