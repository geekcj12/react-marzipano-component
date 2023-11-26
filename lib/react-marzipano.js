import Jn, { useRef as Ut, useState as bo, useEffect as Oe, createContext as ea, useCallback as Si, useContext as ta, useMemo as Co } from "react";
function So(e, t) {
  for (var r = 0; r < t.length; r++) {
    const i = t[r];
    if (typeof i != "string" && !Array.isArray(i)) {
      for (const n in i)
        if (n !== "default" && !(n in e)) {
          const a = Object.getOwnPropertyDescriptor(i, n);
          a && Object.defineProperty(e, n, a.get ? a : {
            enumerable: !0,
            get: () => i[n]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
var Wi = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Po(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Lo(e) {
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
function Gt() {
}
Gt.prototype.addEventListener = function(e, t) {
  var r = this.__events = this.__events || {}, i = r[e] = r[e] || [];
  i.indexOf(t) < 0 && i.push(t);
};
Gt.prototype.removeEventListener = function(e, t) {
  var r = this.__events = this.__events || {}, i = r[e];
  if (i) {
    var n = i.indexOf(t);
    n >= 0 && i.splice(n, 1);
  }
};
Gt.prototype.emit = function(e, t) {
  var r = this.__events = this.__events || {}, i = r[e], n = Array.prototype.slice.call(arguments, 1);
  if (i)
    for (var a = 0; a < i.length; a++) {
      var s = i[a];
      s.apply(this, n);
    }
};
function $o(e) {
  for (var t in Gt.prototype)
    Gt.prototype.hasOwnProperty(t) && (e.prototype[t] = Gt.prototype[t]);
}
var ce = $o;
function Ro() {
  return typeof performance < "u" && performance.now ? function() {
    return performance.now();
  } : function() {
    return Date.now();
  };
}
var Ot = Ro(), ra = Ot;
function Ao(e, t) {
  this.fn = e, this.cb = t, this.cfn = null;
}
function nt(e) {
  this._queue = [], this._delay = e && e.delay || 0, this._paused = e && !!e.paused || !1, this._currentTask = null, this._lastFinished = null;
}
nt.prototype.length = function() {
  return this._queue.length;
};
nt.prototype.push = function(e, t) {
  var r = new Ao(e, t), i = this._cancel.bind(this, r);
  return this._queue.push(r), this._next(), i;
};
nt.prototype.pause = function() {
  this._paused || (this._paused = !0);
};
nt.prototype.resume = function() {
  this._paused && (this._paused = !1, this._next());
};
nt.prototype._start = function(e) {
  if (this._currentTask)
    throw new Error("WorkQueue: called start while running task");
  this._currentTask = e;
  var t = this._finish.bind(this, e);
  if (e.cfn = e.fn(t), typeof e.cfn != "function")
    throw new Error("WorkQueue: function is not cancellable");
};
nt.prototype._finish = function(e) {
  var t = Array.prototype.slice.call(arguments, 1);
  if (this._currentTask !== e)
    throw new Error("WorkQueue: called finish on wrong task");
  e.cb.apply(null, t), this._currentTask = null, this._lastFinished = ra(), this._next();
};
nt.prototype._cancel = function(e) {
  var t = Array.prototype.slice.call(arguments, 1);
  if (this._currentTask === e)
    e.cfn.apply(null, t);
  else {
    var r = this._queue.indexOf(e);
    r >= 0 && (this._queue.splice(r, 1), e.cb.apply(null, t));
  }
};
nt.prototype._next = function() {
  if (!this._paused && this._queue.length && !this._currentTask) {
    if (this._lastFinished != null) {
      var e = ra() - this._lastFinished, t = this._delay - e;
      if (t > 0) {
        setTimeout(this._next.bind(this), t);
        return;
      }
    }
    var r = this._queue.shift();
    this._start(r);
  }
};
var ia = nt;
function zo(e, t, r, i) {
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
var na = zo;
function Oo(e) {
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
var aa = Oo;
function Io(e) {
  var t = !1, r;
  return function() {
    return t || (t = !0, r = e.apply(null, arguments)), r;
  };
}
var Gi = Io, Do = Gi;
function Ho(e) {
  return function() {
    if (!arguments.length)
      throw new Error("cancelized: expected at least one argument");
    var r = Array.prototype.slice.call(arguments, 0), i = r[r.length - 1] = Do(r[r.length - 1]);
    function n() {
      i.apply(null, arguments);
    }
    return e.apply(null, r), n;
  };
}
var sa = Ho;
function Fo(e) {
  for (var t in e)
    e.hasOwnProperty(t) && (e[t] = void 0);
}
var he = Fo;
function Zi() {
  this._renderers = {};
}
Zi.prototype.set = function(e, t, r) {
  this._renderers[e] || (this._renderers[e] = {}), this._renderers[e][t] = r;
};
Zi.prototype.get = function(e, t) {
  var r = this._renderers[e] && this._renderers[e][t];
  return r || null;
};
var No = Zi, Vo = ce, ko = ia, jo = na, Wo = aa, Yo = sa, qo = he, Xo = No;
function Uo(e, t) {
  return e.cmp(t);
}
function Bo(e, t) {
  return -e.cmp(t);
}
function ne(e) {
  this._progressive = !!(e && e.progressive), this._layers = [], this._renderers = [], this._tilesToLoad = [], this._tilesToRender = [], this._tmpVisible = [], this._tmpChildren = [], this._width = 0, this._height = 0, this._tmpRect = {}, this._tmpSize = {}, this._createTextureWorkQueue = new ko(), this._emitRenderInvalid = this._emitRenderInvalid.bind(this), this._rendererRegistry = new Xo();
}
Vo(ne);
ne.prototype.destroy = function() {
  this.removeAllLayers(), qo(this);
};
ne.prototype.registerRenderer = function(e, t, r) {
  return this._rendererRegistry.set(e, t, r);
};
ne.prototype.domElement = function() {
  throw new Error("Stage implementation must override domElement");
};
ne.prototype.width = function() {
  return this._width;
};
ne.prototype.height = function() {
  return this._height;
};
ne.prototype.size = function(e) {
  return e = e || {}, e.width = this._width, e.height = this._height, e;
};
ne.prototype.setSize = function(e) {
  this._width = e.width, this._height = e.height, this.setSizeForType(), this.emit("resize"), this._emitRenderInvalid();
};
ne.prototype.setSizeForType = function(e) {
  throw new Error("Stage implementation must override setSizeForType");
};
ne.prototype.loadImage = function() {
  throw new Error("Stage implementation must override loadImage");
};
ne.prototype._emitRenderInvalid = function() {
  this.emit("renderInvalid");
};
ne.prototype.validateLayer = function(e) {
  throw new Error("Stage implementation must override validateLayer");
};
ne.prototype.listLayers = function() {
  return [].concat(this._layers);
};
ne.prototype.hasLayer = function(e) {
  return this._layers.indexOf(e) >= 0;
};
ne.prototype.addLayer = function(e, t) {
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
ne.prototype.moveLayer = function(e, t) {
  var r = this._layers.indexOf(e);
  if (r < 0)
    throw new Error("No such layer in stage");
  if (t < 0 || t >= this._layers.length)
    throw new Error("Invalid layer position");
  e = this._layers.splice(r, 1)[0];
  var i = this._renderers.splice(r, 1)[0];
  this._layers.splice(t, 0, e), this._renderers.splice(t, 0, i), this._emitRenderInvalid();
};
ne.prototype.removeLayer = function(e) {
  var t = this._layers.indexOf(e);
  if (t < 0)
    throw new Error("No such layer in stage");
  var r = this._layers.splice(t, 1)[0], i = this._renderers.splice(t, 1)[0];
  this.destroyRenderer(i), r.removeEventListener("viewChange", this._emitRenderInvalid), r.removeEventListener("effectsChange", this._emitRenderInvalid), r.removeEventListener("fixedLevelChange", this._emitRenderInvalid), r.removeEventListener("textureStoreChange", this._emitRenderInvalid), this._emitRenderInvalid();
};
ne.prototype.removeAllLayers = function() {
  for (; this._layers.length > 0; )
    this.removeLayer(this._layers[0]);
};
ne.prototype.startFrame = function() {
  throw new Error("Stage implementation must override startFrame");
};
ne.prototype.endFrame = function() {
  throw new Error("Stage implementation must override endFrame");
};
ne.prototype.render = function() {
  var e, t, r = this._tilesToLoad, i = this._tilesToRender, n = !0, a, s = this._width, o = this._height, h = this._tmpRect, l = this._tmpSize;
  if (!(s <= 0 || o <= 0)) {
    for (this.startFrame(), e = 0; e < this._layers.length; e++)
      this._layers[e].textureStore().startFrame();
    for (e = 0; e < this._layers.length; e++) {
      var c = this._layers[e], f = c.effects(), u = c.view(), p = c.textureStore(), _ = this._renderers[e], w = this._layers.length - e, y, M;
      if (jo(s, o, f && f.rect, h), !(h.width <= 0 || h.height <= 0)) {
        for (l.width = h.width * this._width, l.height = h.height * this._height, u.setSize(l), _.startLayer(c, h), a = this._collectTiles(c, p), t = 0; t < r.length; t++)
          y = r[t], p.markTile(y);
        for (t = 0; t < i.length; t++)
          y = i[t], M = p.texture(y), _.renderTile(y, M, c, w);
        c.emit("renderComplete", a), a || (n = !1), _.endLayer(c, h);
      }
    }
    for (e = 0; e < this._layers.length; e++)
      this._layers[e].textureStore().endFrame();
    this.endFrame(), this.emit("renderComplete", n);
  }
};
ne.prototype._collectTiles = function(e, t) {
  var r = this._tilesToLoad, i = this._tilesToRender, n = this._tmpVisible;
  r.length = 0, i.length = 0, n.length = 0, e.visibleTiles(n);
  for (var a = !0, s = 0; s < n.length; s++) {
    var o = n[s], h;
    this._collectTileToLoad(o), t.texture(o) ? (h = !1, this._collectTileToRender(o)) : (h = this._collectChildren(o, t), a = !1), this._collectParents(o, t, h);
  }
  return r.sort(Uo), i.sort(Bo), a;
};
ne.prototype._collectChildren = function(e, t) {
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
ne.prototype._collectParents = function(e, t, r) {
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
ne.prototype._collectTileToLoad = function(e) {
  return this._collectTileIntoList(e, this._tilesToLoad);
};
ne.prototype._collectTileToRender = function(e) {
  return this._collectTileIntoList(e, this._tilesToRender);
};
ne.prototype._collectTileIntoList = function(e, t) {
  for (var r = !1, i = 0; i < t.length; i++)
    if (e.equals(t[i])) {
      r = !0;
      break;
    }
  return r || t.push(e), !r;
};
ne.prototype.createTexture = function(e, t, r) {
  var i = this;
  function n() {
    return new i.TextureClass(i, e, t);
  }
  var a = Yo(Wo(n));
  return this._createTextureWorkQueue.push(a, function(s, o) {
    r(s, e, t, o);
  });
};
var Go = ne, Zo = function() {
  return typeof window < "u" ? window : typeof self < "u" ? self : typeof Wi < "u" ? Wi : null;
}(), oa = Zo, En = oa, Ko = ce, Qo = he, Pi = {
  HTMLImageElement: ["naturalWidth", "naturalHeight"],
  HTMLCanvasElement: ["width", "height"],
  ImageBitmap: ["width", "height"]
};
function mt(e) {
  var t = !1;
  for (var r in Pi)
    if (En[r] && e instanceof En[r]) {
      t = !0, this._widthProp = Pi[r][0], this._heightProp = Pi[r][1];
      break;
    }
  if (!t)
    throw new Error("Unsupported pixel source");
  this._element = e;
}
Ko(mt);
mt.prototype.destroy = function() {
  Qo(this);
};
mt.prototype.element = function() {
  return this._element;
};
mt.prototype.width = function() {
  return this._element[this._widthProp];
};
mt.prototype.height = function() {
  return this._element[this._heightProp];
};
mt.prototype.timestamp = function() {
  return 0;
};
mt.prototype.isDynamic = function() {
  return !1;
};
var Ki = mt;
function Jo(e, t) {
  e.super_ = t;
  var r = function() {
  };
  r.prototype = t.prototype, e.prototype = new r(), e.prototype.constructor = e;
}
var Ge = Jo, eh = Ge;
function ha(e) {
  this.constructor.super_.apply(this, arguments), this.message = e;
}
eh(ha, Error);
var la = ha, ca = { exports: {} };
/*!
 * Bowser - a browser detector
 * https://github.com/ded/bowser
 * MIT License | (c) Dustin Diaz 2015
 */
(function(e) {
  (function(t, r, i) {
    e.exports ? e.exports = i() : t[r] = i();
  })(Wi, "bowser", function() {
    var t = !0;
    function r(l) {
      function c(ge) {
        var ue = l.match(ge);
        return ue && ue.length > 1 && ue[1] || "";
      }
      function f(ge) {
        var ue = l.match(ge);
        return ue && ue.length > 1 && ue[2] || "";
      }
      var u = c(/(ipod|iphone|ipad)/i).toLowerCase(), p = /like android/i.test(l), _ = !p && /android/i.test(l), w = /nexus\s*[0-6]\s*/i.test(l), y = !w && /nexus\s*[0-9]+/i.test(l), M = /CrOS/.test(l), b = /silk/i.test(l), L = /sailfish/i.test(l), $ = /tizen/i.test(l), R = /(web|hpw)(o|0)s/i.test(l), S = /windows phone/i.test(l), V = !S && /windows/i.test(l), q = !u && !b && /macintosh/i.test(l), k = !_ && !L && !$ && !R && /linux/i.test(l), W = f(/edg([ea]|ios)\/(\d+(\.\d+)?)/i), O = c(/version\/(\d+(\.\d+)?)/i), X = /tablet/i.test(l) && !/tablet pc/i.test(l), Y = !X && /[^-]mobi/i.test(l), z = /xbox/i.test(l), x;
      /opera/i.test(l) ? x = {
        name: "Opera",
        opera: t,
        version: O || c(/(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
      } : /opr\/|opios/i.test(l) ? x = {
        name: "Opera",
        opera: t,
        version: c(/(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || O
      } : /SamsungBrowser/i.test(l) ? x = {
        name: "Samsung Internet for Android",
        samsungBrowser: t,
        version: O || c(/(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
      } : /Whale/i.test(l) ? x = {
        name: "NAVER Whale browser",
        whale: t,
        version: c(/(?:whale)[\s\/](\d+(?:\.\d+)+)/i)
      } : /MZBrowser/i.test(l) ? x = {
        name: "MZ Browser",
        mzbrowser: t,
        version: c(/(?:MZBrowser)[\s\/](\d+(?:\.\d+)+)/i)
      } : /coast/i.test(l) ? x = {
        name: "Opera Coast",
        coast: t,
        version: O || c(/(?:coast)[\s\/](\d+(\.\d+)?)/i)
      } : /focus/i.test(l) ? x = {
        name: "Focus",
        focus: t,
        version: c(/(?:focus)[\s\/](\d+(?:\.\d+)+)/i)
      } : /yabrowser/i.test(l) ? x = {
        name: "Yandex Browser",
        yandexbrowser: t,
        version: O || c(/(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
      } : /ucbrowser/i.test(l) ? x = {
        name: "UC Browser",
        ucbrowser: t,
        version: c(/(?:ucbrowser)[\s\/](\d+(?:\.\d+)+)/i)
      } : /mxios/i.test(l) ? x = {
        name: "Maxthon",
        maxthon: t,
        version: c(/(?:mxios)[\s\/](\d+(?:\.\d+)+)/i)
      } : /epiphany/i.test(l) ? x = {
        name: "Epiphany",
        epiphany: t,
        version: c(/(?:epiphany)[\s\/](\d+(?:\.\d+)+)/i)
      } : /puffin/i.test(l) ? x = {
        name: "Puffin",
        puffin: t,
        version: c(/(?:puffin)[\s\/](\d+(?:\.\d+)?)/i)
      } : /sleipnir/i.test(l) ? x = {
        name: "Sleipnir",
        sleipnir: t,
        version: c(/(?:sleipnir)[\s\/](\d+(?:\.\d+)+)/i)
      } : /k-meleon/i.test(l) ? x = {
        name: "K-Meleon",
        kMeleon: t,
        version: c(/(?:k-meleon)[\s\/](\d+(?:\.\d+)+)/i)
      } : S ? (x = {
        name: "Windows Phone",
        osname: "Windows Phone",
        windowsphone: t
      }, W ? (x.msedge = t, x.version = W) : (x.msie = t, x.version = c(/iemobile\/(\d+(\.\d+)?)/i))) : /msie|trident/i.test(l) ? x = {
        name: "Internet Explorer",
        msie: t,
        version: c(/(?:msie |rv:)(\d+(\.\d+)?)/i)
      } : M ? x = {
        name: "Chrome",
        osname: "Chrome OS",
        chromeos: t,
        chromeBook: t,
        chrome: t,
        version: c(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      } : /edg([ea]|ios)/i.test(l) ? x = {
        name: "Microsoft Edge",
        msedge: t,
        version: W
      } : /vivaldi/i.test(l) ? x = {
        name: "Vivaldi",
        vivaldi: t,
        version: c(/vivaldi\/(\d+(\.\d+)?)/i) || O
      } : L ? x = {
        name: "Sailfish",
        osname: "Sailfish OS",
        sailfish: t,
        version: c(/sailfish\s?browser\/(\d+(\.\d+)?)/i)
      } : /seamonkey\//i.test(l) ? x = {
        name: "SeaMonkey",
        seamonkey: t,
        version: c(/seamonkey\/(\d+(\.\d+)?)/i)
      } : /firefox|iceweasel|fxios/i.test(l) ? (x = {
        name: "Firefox",
        firefox: t,
        version: c(/(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
      }, /\((mobile|tablet);[^\)]*rv:[\d\.]+\)/i.test(l) && (x.firefoxos = t, x.osname = "Firefox OS")) : b ? x = {
        name: "Amazon Silk",
        silk: t,
        version: c(/silk\/(\d+(\.\d+)?)/i)
      } : /phantom/i.test(l) ? x = {
        name: "PhantomJS",
        phantom: t,
        version: c(/phantomjs\/(\d+(\.\d+)?)/i)
      } : /slimerjs/i.test(l) ? x = {
        name: "SlimerJS",
        slimer: t,
        version: c(/slimerjs\/(\d+(\.\d+)?)/i)
      } : /blackberry|\bbb\d+/i.test(l) || /rim\stablet/i.test(l) ? x = {
        name: "BlackBerry",
        osname: "BlackBerry OS",
        blackberry: t,
        version: O || c(/blackberry[\d]+\/(\d+(\.\d+)?)/i)
      } : R ? (x = {
        name: "WebOS",
        osname: "WebOS",
        webos: t,
        version: O || c(/w(?:eb)?osbrowser\/(\d+(\.\d+)?)/i)
      }, /touchpad\//i.test(l) && (x.touchpad = t)) : /bada/i.test(l) ? x = {
        name: "Bada",
        osname: "Bada",
        bada: t,
        version: c(/dolfin\/(\d+(\.\d+)?)/i)
      } : $ ? x = {
        name: "Tizen",
        osname: "Tizen",
        tizen: t,
        version: c(/(?:tizen\s?)?browser\/(\d+(\.\d+)?)/i) || O
      } : /qupzilla/i.test(l) ? x = {
        name: "QupZilla",
        qupzilla: t,
        version: c(/(?:qupzilla)[\s\/](\d+(?:\.\d+)+)/i) || O
      } : /chromium/i.test(l) ? x = {
        name: "Chromium",
        chromium: t,
        version: c(/(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || O
      } : /chrome|crios|crmo/i.test(l) ? x = {
        name: "Chrome",
        chrome: t,
        version: c(/(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
      } : _ ? x = {
        name: "Android",
        version: O
      } : /safari|applewebkit/i.test(l) ? (x = {
        name: "Safari",
        safari: t
      }, O && (x.version = O)) : u ? (x = {
        name: u == "iphone" ? "iPhone" : u == "ipad" ? "iPad" : "iPod"
      }, O && (x.version = O)) : /googlebot/i.test(l) ? x = {
        name: "Googlebot",
        googlebot: t,
        version: c(/googlebot\/(\d+(\.\d+))/i) || O
      } : x = {
        name: c(/^(.*)\/(.*) /),
        version: f(/^(.*)\/(.*) /)
      }, !x.msedge && /(apple)?webkit/i.test(l) ? (/(apple)?webkit\/537\.36/i.test(l) ? (x.name = x.name || "Blink", x.blink = t) : (x.name = x.name || "Webkit", x.webkit = t), !x.version && O && (x.version = O)) : !x.opera && /gecko\//i.test(l) && (x.name = x.name || "Gecko", x.gecko = t, x.version = x.version || c(/gecko\/(\d+(\.\d+)?)/i)), !x.windowsphone && (_ || x.silk) ? (x.android = t, x.osname = "Android") : !x.windowsphone && u ? (x[u] = t, x.ios = t, x.osname = "iOS") : q ? (x.mac = t, x.osname = "macOS") : z ? (x.xbox = t, x.osname = "Xbox") : V ? (x.windows = t, x.osname = "Windows") : k && (x.linux = t, x.osname = "Linux");
      function Te(ge) {
        switch (ge) {
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
      var K = "";
      x.windows ? K = Te(c(/Windows ((NT|XP)( \d\d?.\d)?)/i)) : x.windowsphone ? K = c(/windows phone (?:os)?\s?(\d+(\.\d+)*)/i) : x.mac ? (K = c(/Mac OS X (\d+([_\.\s]\d+)*)/i), K = K.replace(/[_\s]/g, ".")) : u ? (K = c(/os (\d+([_\s]\d+)*) like mac os x/i), K = K.replace(/[_\s]/g, ".")) : _ ? K = c(/android[ \/-](\d+(\.\d+)*)/i) : x.webos ? K = c(/(?:web|hpw)os\/(\d+(\.\d+)*)/i) : x.blackberry ? K = c(/rim\stablet\sos\s(\d+(\.\d+)*)/i) : x.bada ? K = c(/bada\/(\d+(\.\d+)*)/i) : x.tizen && (K = c(/tizen[\/\s](\d+(\.\d+)*)/i)), K && (x.osversion = K);
      var $e = !x.windows && K.split(".")[0];
      return X || y || u == "ipad" || _ && ($e == 3 || $e >= 4 && !Y) || x.silk ? x.tablet = t : (Y || u == "iphone" || u == "ipod" || _ || w || x.blackberry || x.webos || x.bada) && (x.mobile = t), x.msedge || x.msie && x.version >= 10 || x.yandexbrowser && x.version >= 15 || x.vivaldi && x.version >= 1 || x.chrome && x.version >= 20 || x.samsungBrowser && x.version >= 4 || x.whale && s([x.version, "1.0"]) === 1 || x.mzbrowser && s([x.version, "6.0"]) === 1 || x.focus && s([x.version, "1.0"]) === 1 || x.firefox && x.version >= 20 || x.safari && x.version >= 6 || x.opera && x.version >= 10 || x.ios && x.osversion && x.osversion.split(".")[0] >= 6 || x.blackberry && x.version >= 10.1 || x.chromium && x.version >= 20 ? x.a = t : x.msie && x.version < 10 || x.chrome && x.version < 20 || x.firefox && x.version < 20 || x.safari && x.version < 6 || x.opera && x.version < 10 || x.ios && x.osversion && x.osversion.split(".")[0] < 6 || x.chromium && x.version < 20 ? x.c = t : x.x = t, x;
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
        return u = u + new Array(p + 1).join(".0"), a(u.split("."), function(_) {
          return new Array(20 - _.length).join("0") + _;
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
      for (var _ in l)
        if (l.hasOwnProperty(_) && u[_]) {
          if (typeof l[_] != "string")
            throw new Error("Browser version in the minVersion map should be a string: " + _ + ": " + String(l));
          return s([p, l[_]]) < 0;
        }
      return c;
    }
    function h(l, c, f) {
      return !o(l, c, f);
    }
    return i.isUnsupportedBrowser = o, i.compareVersions = s, i.check = h, i._detect = r, i.detect = r, i;
  });
})(ca);
var Qi = ca.exports, Li = Ki, th = la, rh = Qi, va = oa, ih = Gi, nh = !!va.createImageBitmap && !rh.firefox, ah = {
  imageOrientation: "flipY",
  premultiplyAlpha: "premultiply"
};
function ei(e) {
  this._stage = e;
}
ei.prototype.loadImage = function(e, t, r) {
  var i = this, n = new Image();
  n.crossOrigin = "anonymous";
  var a = t && t.x || 0, s = t && t.y || 0, o = t && t.width || 1, h = t && t.height || 1;
  r = ih(r), n.onload = function() {
    i._handleLoad(n, a, s, o, h, r);
  }, n.onerror = function() {
    i._handleError(e, r);
  }, n.src = e;
  function l() {
    n.onload = n.onerror = null, n.src = "", r.apply(null, arguments);
  }
  return l;
};
ei.prototype._handleLoad = function(e, t, r, i, n, a) {
  if (t === 0 && r === 0 && i === 1 && n === 1) {
    a(null, new Li(e));
    return;
  }
  if (t *= e.naturalWidth, r *= e.naturalHeight, i *= e.naturalWidth, n *= e.naturalHeight, nh)
    va.createImageBitmap(e, t, r, i, n, ah).then(function(h) {
      a(null, new Li(h));
    });
  else {
    var s = document.createElement("canvas");
    s.width = i, s.height = n;
    var o = s.getContext("2d");
    o.drawImage(e, t, r, i, n, 0, 0, i, n), a(null, new Li(s));
  }
};
ei.prototype._handleError = function(e, t) {
  t(new th("Network error: " + e));
};
var sh = ei, oh = 1;
function hh() {
  if (typeof window < "u") {
    if (window.devicePixelRatio)
      return window.devicePixelRatio;
    var e = window.screen;
    if (e && e.deviceXDPI && e.logicalXDPI)
      return e.deviceXDPI / e.logicalXDPI;
    if (e && e.systemXDPI && e.logicalXDPI)
      return e.systemXDPI / e.logicalXDPI;
  }
  return oh;
}
var ti = hh;
function lh(e) {
  return (e & e - 1) == 0;
}
var ch = lh;
function Ji(e) {
  for (var t = document.documentElement.style, r = ["Moz", "Webkit", "Khtml", "O", "ms"], i = 0; i < r.length; i++) {
    var n = r[i], a = e[0].toUpperCase() + e.slice(1), s = n + a;
    if (s in t)
      return s;
  }
  return e;
}
function vh(e) {
  var t = Ji(e);
  return function(i) {
    return i.style[t];
  };
}
function en(e) {
  var t = Ji(e);
  return function(i, n) {
    return i.style[t] = n;
  };
}
var fa = en("transform"), ua = en("transformOrigin");
function fh(e) {
  fa(e, "translateZ(0)");
}
function uh(e) {
  ua(e, "0 0 0");
}
function dh(e) {
  e.style.position = "absolute";
}
function ph(e, t, r) {
  e.style.left = t + "px", e.style.top = r + "px";
}
function mh(e, t, r) {
  e.style.width = t + "px", e.style.height = r + "px";
}
function _h(e) {
  e.style.width = e.style.height = 0;
}
function yh(e) {
  e.style.width = e.style.height = "100%";
}
function gh(e) {
  e.style.overflow = "hidden";
}
function wh(e) {
  e.style.overflow = "visible";
}
function xh(e) {
  e.style.pointerEvents = "none";
}
var Ae = {
  prefixProperty: Ji,
  getWithVendorPrefix: vh,
  setWithVendorPrefix: en,
  setTransform: fa,
  setTransformOrigin: ua,
  setNullTransform: fh,
  setNullTransformOrigin: uh,
  setAbsolute: dh,
  setPixelPosition: ph,
  setPixelSize: mh,
  setNullSize: _h,
  setFullSize: yh,
  setOverflowHidden: gh,
  setOverflowVisible: wh,
  setNoPointerEvents: xh
}, Mh = Go, Eh = sh, Th = Qi, bh = Ge, Ch = ti, Tn = ch, Sh = Ae.setAbsolute, Ph = Ae.setFullSize, Lh = he, $h = {
  // Whether to use texImage2D instead of texSubImage2D when repainting an
  // existing texture from a video element. On most browsers texSubImage2D is
  // faster, but on Chrome the performance degrades significantly. See:
  // https://bugs.chromium.org/p/chromium/issues/detail?id=612542
  videoUseTexImage2D: Th.chrome
};
function Rh(e, t) {
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
function me(e) {
  e = e || {};
  var t = this;
  this.constructor.super_.call(this, e), this._generateMipmaps = e.generateMipmaps != null ? e.generateMipmaps : !1, this._loader = new Eh(this), this._domElement = document.createElement("canvas"), Sh(this._domElement), Ph(this._domElement), this._gl = Rh(this._domElement, e), this._handleContextLoss = function() {
    t.emit("webglcontextlost"), t._gl = null;
  }, this._domElement.addEventListener("webglcontextlost", this._handleContextLoss), this._rendererInstances = [];
}
bh(me, Mh);
me.prototype.destroy = function() {
  this._domElement.removeEventListener("webglcontextlost", this._handleContextLoss), this.constructor.super_.prototype.destroy.call(this);
};
me.prototype.domElement = function() {
  return this._domElement;
};
me.prototype.webGlContext = function() {
  return this._gl;
};
me.prototype.setSizeForType = function() {
  var e = Ch();
  this._domElement.width = e * this._width, this._domElement.height = e * this._height;
};
me.prototype.loadImage = function(e, t, r) {
  return this._loader.loadImage(e, t, r);
};
me.prototype.maxTextureSize = function() {
  return this._gl.getParameter(this._gl.MAX_TEXTURE_SIZE);
};
me.prototype.validateLayer = function(e) {
  var t = e.geometry().maxTileSize(), r = this.maxTextureSize();
  if (t > r)
    throw new Error("Layer has level with tile size larger than maximum texture size (" + t + " vs. " + r + ")");
};
me.prototype.createRenderer = function(e) {
  for (var t = this._rendererInstances, r = 0; r < t.length; r++)
    if (t[r] instanceof e)
      return t[r];
  var i = new e(this._gl);
  return t.push(i), i;
};
me.prototype.destroyRenderer = function(e) {
  var t = this._rendererInstances;
  if (this._renderers.indexOf(e) < 0) {
    e.destroy();
    var r = t.indexOf(e);
    r >= 0 && t.splice(r, 1);
  }
};
me.prototype.startFrame = function() {
  var e = this._gl;
  if (!e)
    throw new Error("Bad WebGL context - maybe context was lost?");
  e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight), e.clearColor(0, 0, 0, 0), e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT), e.enable(e.DEPTH_TEST), e.enable(e.BLEND), e.blendFunc(e.ONE, e.ONE_MINUS_SRC_ALPHA);
};
me.prototype.endFrame = function() {
};
me.prototype.takeSnapshot = function(e) {
  (typeof e != "object" || e == null) && (e = {});
  var t = e.quality;
  if (typeof t > "u" && (t = 75), typeof t != "number" || t < 0 || t > 100)
    throw new Error("WebGLStage: Snapshot quality needs to be a number between 0 and 100");
  return this.render(), this._domElement.toDataURL("image/jpeg", t / 100);
};
me.type = me.prototype.type = "webgl";
function tn(e, t, r) {
  this._stage = e, this._gl = e._gl, this._texture = null, this._timestamp = null, this._width = this._height = null, this.refresh(t, r);
}
tn.prototype.refresh = function(e, t) {
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
      n = this._texture, r.bindTexture(r.TEXTURE_2D, n), r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL, !0), r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0), s instanceof HTMLVideoElement && $h.videoUseTexImage2D ? r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, r.UNSIGNED_BYTE, s) : r.texSubImage2D(r.TEXTURE_2D, 0, 0, 0, r.RGBA, r.UNSIGNED_BYTE, s);
    i._generateMipmaps && Tn(o) && Tn(h) ? (r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR_MIPMAP_LINEAR), r.generateMipmap(r.TEXTURE_2D)) : (r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MAG_FILTER, r.LINEAR), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_MIN_FILTER, r.LINEAR)), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_S, r.CLAMP_TO_EDGE), r.texParameteri(r.TEXTURE_2D, r.TEXTURE_WRAP_T, r.CLAMP_TO_EDGE), r.bindTexture(r.TEXTURE_2D, null), this._timestamp = a, this._width = o, this._height = h;
  }
};
tn.prototype.destroy = function() {
  this._texture && this._gl.deleteTexture(this._texture), Lh(this);
};
me.TextureClass = me.prototype.TextureClass = tn;
var da = me, A = 1e-6, U = typeof Float32Array < "u" ? Float32Array : Array, We = Math.random;
function Ah(e) {
  U = e;
}
var zh = Math.PI / 180;
function Oh(e) {
  return e * zh;
}
function Ih(e, t) {
  return Math.abs(e - t) <= A * Math.max(1, Math.abs(e), Math.abs(t));
}
Math.hypot || (Math.hypot = function() {
  for (var e = 0, t = arguments.length; t--; )
    e += arguments[t] * arguments[t];
  return Math.sqrt(e);
});
const Dh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  get ARRAY_TYPE() {
    return U;
  },
  EPSILON: A,
  RANDOM: We,
  equals: Ih,
  setMatrixArrayType: Ah,
  toRadian: Oh
}, Symbol.toStringTag, { value: "Module" }));
function Hh() {
  var e = new U(4);
  return U != Float32Array && (e[1] = 0, e[2] = 0), e[0] = 1, e[3] = 1, e;
}
function Fh(e) {
  var t = new U(4);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t;
}
function Nh(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e;
}
function Vh(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e;
}
function kh(e, t, r, i) {
  var n = new U(4);
  return n[0] = e, n[1] = t, n[2] = r, n[3] = i, n;
}
function jh(e, t, r, i, n) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e;
}
function Wh(e, t) {
  if (e === t) {
    var r = t[1];
    e[1] = t[2], e[2] = r;
  } else
    e[0] = t[0], e[1] = t[2], e[2] = t[1], e[3] = t[3];
  return e;
}
function Yh(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = r * a - n * i;
  return s ? (s = 1 / s, e[0] = a * s, e[1] = -i * s, e[2] = -n * s, e[3] = r * s, e) : null;
}
function qh(e, t) {
  var r = t[0];
  return e[0] = t[3], e[1] = -t[1], e[2] = -t[2], e[3] = r, e;
}
function Xh(e) {
  return e[0] * e[3] - e[2] * e[1];
}
function pa(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = r[0], h = r[1], l = r[2], c = r[3];
  return e[0] = i * o + a * h, e[1] = n * o + s * h, e[2] = i * l + a * c, e[3] = n * l + s * c, e;
}
function Uh(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = Math.sin(r), h = Math.cos(r);
  return e[0] = i * h + a * o, e[1] = n * h + s * o, e[2] = i * -o + a * h, e[3] = n * -o + s * h, e;
}
function Bh(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = r[0], h = r[1];
  return e[0] = i * o, e[1] = n * o, e[2] = a * h, e[3] = s * h, e;
}
function Gh(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = i, e[1] = r, e[2] = -r, e[3] = i, e;
}
function Zh(e, t) {
  return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = t[1], e;
}
function Kh(e) {
  return "mat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
}
function Qh(e) {
  return Math.hypot(e[0], e[1], e[2], e[3]);
}
function Jh(e, t, r, i) {
  return e[2] = i[2] / i[0], r[0] = i[0], r[1] = i[1], r[3] = i[3] - e[2] * r[1], [e, t, r];
}
function el(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e;
}
function ma(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e;
}
function tl(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3];
}
function rl(e, t) {
  var r = e[0], i = e[1], n = e[2], a = e[3], s = t[0], o = t[1], h = t[2], l = t[3];
  return Math.abs(r - s) <= A * Math.max(1, Math.abs(r), Math.abs(s)) && Math.abs(i - o) <= A * Math.max(1, Math.abs(i), Math.abs(o)) && Math.abs(n - h) <= A * Math.max(1, Math.abs(n), Math.abs(h)) && Math.abs(a - l) <= A * Math.max(1, Math.abs(a), Math.abs(l));
}
function il(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e;
}
function nl(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e;
}
var al = pa, sl = ma;
const ol = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  LDU: Jh,
  add: el,
  adjoint: qh,
  clone: Fh,
  copy: Nh,
  create: Hh,
  determinant: Xh,
  equals: rl,
  exactEquals: tl,
  frob: Qh,
  fromRotation: Gh,
  fromScaling: Zh,
  fromValues: kh,
  identity: Vh,
  invert: Yh,
  mul: al,
  multiply: pa,
  multiplyScalar: il,
  multiplyScalarAndAdd: nl,
  rotate: Uh,
  scale: Bh,
  set: jh,
  str: Kh,
  sub: sl,
  subtract: ma,
  transpose: Wh
}, Symbol.toStringTag, { value: "Module" }));
function hl() {
  var e = new U(6);
  return U != Float32Array && (e[1] = 0, e[2] = 0, e[4] = 0, e[5] = 0), e[0] = 1, e[3] = 1, e;
}
function ll(e) {
  var t = new U(6);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t;
}
function cl(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e;
}
function vl(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e;
}
function fl(e, t, r, i, n, a) {
  var s = new U(6);
  return s[0] = e, s[1] = t, s[2] = r, s[3] = i, s[4] = n, s[5] = a, s;
}
function ul(e, t, r, i, n, a, s) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e[4] = a, e[5] = s, e;
}
function dl(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = t[4], o = t[5], h = r * a - i * n;
  return h ? (h = 1 / h, e[0] = a * h, e[1] = -i * h, e[2] = -n * h, e[3] = r * h, e[4] = (n * o - a * s) * h, e[5] = (i * s - r * o) * h, e) : null;
}
function pl(e) {
  return e[0] * e[3] - e[1] * e[2];
}
function _a(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = t[4], h = t[5], l = r[0], c = r[1], f = r[2], u = r[3], p = r[4], _ = r[5];
  return e[0] = i * l + a * c, e[1] = n * l + s * c, e[2] = i * f + a * u, e[3] = n * f + s * u, e[4] = i * p + a * _ + o, e[5] = n * p + s * _ + h, e;
}
function ml(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = t[4], h = t[5], l = Math.sin(r), c = Math.cos(r);
  return e[0] = i * c + a * l, e[1] = n * c + s * l, e[2] = i * -l + a * c, e[3] = n * -l + s * c, e[4] = o, e[5] = h, e;
}
function _l(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = t[4], h = t[5], l = r[0], c = r[1];
  return e[0] = i * l, e[1] = n * l, e[2] = a * c, e[3] = s * c, e[4] = o, e[5] = h, e;
}
function yl(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = t[4], h = t[5], l = r[0], c = r[1];
  return e[0] = i, e[1] = n, e[2] = a, e[3] = s, e[4] = i * l + a * c + o, e[5] = n * l + s * c + h, e;
}
function gl(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = i, e[1] = r, e[2] = -r, e[3] = i, e[4] = 0, e[5] = 0, e;
}
function wl(e, t) {
  return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = t[1], e[4] = 0, e[5] = 0, e;
}
function xl(e, t) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = t[0], e[5] = t[1], e;
}
function Ml(e) {
  return "mat2d(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ")";
}
function El(e) {
  return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], 1);
}
function Tl(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e[4] = t[4] + r[4], e[5] = t[5] + r[5], e;
}
function ya(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e[4] = t[4] - r[4], e[5] = t[5] - r[5], e;
}
function bl(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * r, e[5] = t[5] * r, e;
}
function Cl(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e[4] = t[4] + r[4] * i, e[5] = t[5] + r[5] * i, e;
}
function Sl(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5];
}
function Pl(e, t) {
  var r = e[0], i = e[1], n = e[2], a = e[3], s = e[4], o = e[5], h = t[0], l = t[1], c = t[2], f = t[3], u = t[4], p = t[5];
  return Math.abs(r - h) <= A * Math.max(1, Math.abs(r), Math.abs(h)) && Math.abs(i - l) <= A * Math.max(1, Math.abs(i), Math.abs(l)) && Math.abs(n - c) <= A * Math.max(1, Math.abs(n), Math.abs(c)) && Math.abs(a - f) <= A * Math.max(1, Math.abs(a), Math.abs(f)) && Math.abs(s - u) <= A * Math.max(1, Math.abs(s), Math.abs(u)) && Math.abs(o - p) <= A * Math.max(1, Math.abs(o), Math.abs(p));
}
var Ll = _a, $l = ya;
const Rl = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Tl,
  clone: ll,
  copy: cl,
  create: hl,
  determinant: pl,
  equals: Pl,
  exactEquals: Sl,
  frob: El,
  fromRotation: gl,
  fromScaling: wl,
  fromTranslation: xl,
  fromValues: fl,
  identity: vl,
  invert: dl,
  mul: Ll,
  multiply: _a,
  multiplyScalar: bl,
  multiplyScalarAndAdd: Cl,
  rotate: ml,
  scale: _l,
  set: ul,
  str: Ml,
  sub: $l,
  subtract: ya,
  translate: yl
}, Symbol.toStringTag, { value: "Module" }));
function ga() {
  var e = new U(9);
  return U != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[5] = 0, e[6] = 0, e[7] = 0), e[0] = 1, e[4] = 1, e[8] = 1, e;
}
function Al(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[4], e[4] = t[5], e[5] = t[6], e[6] = t[8], e[7] = t[9], e[8] = t[10], e;
}
function zl(e) {
  var t = new U(9);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t;
}
function Ol(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e;
}
function Il(e, t, r, i, n, a, s, o, h) {
  var l = new U(9);
  return l[0] = e, l[1] = t, l[2] = r, l[3] = i, l[4] = n, l[5] = a, l[6] = s, l[7] = o, l[8] = h, l;
}
function Dl(e, t, r, i, n, a, s, o, h, l) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e[4] = a, e[5] = s, e[6] = o, e[7] = h, e[8] = l, e;
}
function Hl(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e;
}
function Fl(e, t) {
  if (e === t) {
    var r = t[1], i = t[2], n = t[5];
    e[1] = t[3], e[2] = t[6], e[3] = r, e[5] = t[7], e[6] = i, e[7] = n;
  } else
    e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8];
  return e;
}
function Nl(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = t[4], o = t[5], h = t[6], l = t[7], c = t[8], f = c * s - o * l, u = -c * a + o * h, p = l * a - s * h, _ = r * f + i * u + n * p;
  return _ ? (_ = 1 / _, e[0] = f * _, e[1] = (-c * i + n * l) * _, e[2] = (o * i - n * s) * _, e[3] = u * _, e[4] = (c * r - n * h) * _, e[5] = (-o * r + n * a) * _, e[6] = p * _, e[7] = (-l * r + i * h) * _, e[8] = (s * r - i * a) * _, e) : null;
}
function Vl(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = t[4], o = t[5], h = t[6], l = t[7], c = t[8];
  return e[0] = s * c - o * l, e[1] = n * l - i * c, e[2] = i * o - n * s, e[3] = o * h - a * c, e[4] = r * c - n * h, e[5] = n * a - r * o, e[6] = a * l - s * h, e[7] = i * h - r * l, e[8] = r * s - i * a, e;
}
function kl(e) {
  var t = e[0], r = e[1], i = e[2], n = e[3], a = e[4], s = e[5], o = e[6], h = e[7], l = e[8];
  return t * (l * a - s * h) + r * (-l * n + s * o) + i * (h * n - a * o);
}
function wa(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = t[8], u = r[0], p = r[1], _ = r[2], w = r[3], y = r[4], M = r[5], b = r[6], L = r[7], $ = r[8];
  return e[0] = u * i + p * s + _ * l, e[1] = u * n + p * o + _ * c, e[2] = u * a + p * h + _ * f, e[3] = w * i + y * s + M * l, e[4] = w * n + y * o + M * c, e[5] = w * a + y * h + M * f, e[6] = b * i + L * s + $ * l, e[7] = b * n + L * o + $ * c, e[8] = b * a + L * h + $ * f, e;
}
function jl(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = t[8], u = r[0], p = r[1];
  return e[0] = i, e[1] = n, e[2] = a, e[3] = s, e[4] = o, e[5] = h, e[6] = u * i + p * s + l, e[7] = u * n + p * o + c, e[8] = u * a + p * h + f, e;
}
function Wl(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = t[8], u = Math.sin(r), p = Math.cos(r);
  return e[0] = p * i + u * s, e[1] = p * n + u * o, e[2] = p * a + u * h, e[3] = p * s - u * i, e[4] = p * o - u * n, e[5] = p * h - u * a, e[6] = l, e[7] = c, e[8] = f, e;
}
function Yl(e, t, r) {
  var i = r[0], n = r[1];
  return e[0] = i * t[0], e[1] = i * t[1], e[2] = i * t[2], e[3] = n * t[3], e[4] = n * t[4], e[5] = n * t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e;
}
function ql(e, t) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 1, e[5] = 0, e[6] = t[0], e[7] = t[1], e[8] = 1, e;
}
function Xl(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = i, e[1] = r, e[2] = 0, e[3] = -r, e[4] = i, e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e;
}
function Ul(e, t) {
  return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = 0, e[4] = t[1], e[5] = 0, e[6] = 0, e[7] = 0, e[8] = 1, e;
}
function Bl(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = 0, e[3] = t[2], e[4] = t[3], e[5] = 0, e[6] = t[4], e[7] = t[5], e[8] = 1, e;
}
function Gl(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = r + r, o = i + i, h = n + n, l = r * s, c = i * s, f = i * o, u = n * s, p = n * o, _ = n * h, w = a * s, y = a * o, M = a * h;
  return e[0] = 1 - f - _, e[3] = c - M, e[6] = u + y, e[1] = c + M, e[4] = 1 - l - _, e[7] = p - w, e[2] = u - y, e[5] = p + w, e[8] = 1 - l - f, e;
}
function Zl(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = t[4], o = t[5], h = t[6], l = t[7], c = t[8], f = t[9], u = t[10], p = t[11], _ = t[12], w = t[13], y = t[14], M = t[15], b = r * o - i * s, L = r * h - n * s, $ = r * l - a * s, R = i * h - n * o, S = i * l - a * o, V = n * l - a * h, q = c * w - f * _, k = c * y - u * _, W = c * M - p * _, O = f * y - u * w, X = f * M - p * w, Y = u * M - p * y, z = b * Y - L * X + $ * O + R * W - S * k + V * q;
  return z ? (z = 1 / z, e[0] = (o * Y - h * X + l * O) * z, e[1] = (h * W - s * Y - l * k) * z, e[2] = (s * X - o * W + l * q) * z, e[3] = (n * X - i * Y - a * O) * z, e[4] = (r * Y - n * W + a * k) * z, e[5] = (i * W - r * X - a * q) * z, e[6] = (w * V - y * S + M * R) * z, e[7] = (y * $ - _ * V - M * L) * z, e[8] = (_ * S - w * $ + M * b) * z, e) : null;
}
function Kl(e, t, r) {
  return e[0] = 2 / t, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = -2 / r, e[5] = 0, e[6] = -1, e[7] = 1, e[8] = 1, e;
}
function Ql(e) {
  return "mat3(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ")";
}
function Jl(e) {
  return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8]);
}
function ec(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e[4] = t[4] + r[4], e[5] = t[5] + r[5], e[6] = t[6] + r[6], e[7] = t[7] + r[7], e[8] = t[8] + r[8], e;
}
function xa(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e[4] = t[4] - r[4], e[5] = t[5] - r[5], e[6] = t[6] - r[6], e[7] = t[7] - r[7], e[8] = t[8] - r[8], e;
}
function tc(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e[8] = t[8] * r, e;
}
function rc(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e[4] = t[4] + r[4] * i, e[5] = t[5] + r[5] * i, e[6] = t[6] + r[6] * i, e[7] = t[7] + r[7] * i, e[8] = t[8] + r[8] * i, e;
}
function ic(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8];
}
function nc(e, t) {
  var r = e[0], i = e[1], n = e[2], a = e[3], s = e[4], o = e[5], h = e[6], l = e[7], c = e[8], f = t[0], u = t[1], p = t[2], _ = t[3], w = t[4], y = t[5], M = t[6], b = t[7], L = t[8];
  return Math.abs(r - f) <= A * Math.max(1, Math.abs(r), Math.abs(f)) && Math.abs(i - u) <= A * Math.max(1, Math.abs(i), Math.abs(u)) && Math.abs(n - p) <= A * Math.max(1, Math.abs(n), Math.abs(p)) && Math.abs(a - _) <= A * Math.max(1, Math.abs(a), Math.abs(_)) && Math.abs(s - w) <= A * Math.max(1, Math.abs(s), Math.abs(w)) && Math.abs(o - y) <= A * Math.max(1, Math.abs(o), Math.abs(y)) && Math.abs(h - M) <= A * Math.max(1, Math.abs(h), Math.abs(M)) && Math.abs(l - b) <= A * Math.max(1, Math.abs(l), Math.abs(b)) && Math.abs(c - L) <= A * Math.max(1, Math.abs(c), Math.abs(L));
}
var ac = wa, sc = xa;
const oc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: ec,
  adjoint: Vl,
  clone: zl,
  copy: Ol,
  create: ga,
  determinant: kl,
  equals: nc,
  exactEquals: ic,
  frob: Jl,
  fromMat2d: Bl,
  fromMat4: Al,
  fromQuat: Gl,
  fromRotation: Xl,
  fromScaling: Ul,
  fromTranslation: ql,
  fromValues: Il,
  identity: Hl,
  invert: Nl,
  mul: ac,
  multiply: wa,
  multiplyScalar: tc,
  multiplyScalarAndAdd: rc,
  normalFromMat4: Zl,
  projection: Kl,
  rotate: Wl,
  scale: Yl,
  set: Dl,
  str: Ql,
  sub: sc,
  subtract: xa,
  translate: jl,
  transpose: Fl
}, Symbol.toStringTag, { value: "Module" }));
function hc() {
  var e = new U(16);
  return U != Float32Array && (e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0), e[0] = 1, e[5] = 1, e[10] = 1, e[15] = 1, e;
}
function lc(e) {
  var t = new U(16);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15], t;
}
function cc(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e;
}
function vc(e, t, r, i, n, a, s, o, h, l, c, f, u, p, _, w) {
  var y = new U(16);
  return y[0] = e, y[1] = t, y[2] = r, y[3] = i, y[4] = n, y[5] = a, y[6] = s, y[7] = o, y[8] = h, y[9] = l, y[10] = c, y[11] = f, y[12] = u, y[13] = p, y[14] = _, y[15] = w, y;
}
function fc(e, t, r, i, n, a, s, o, h, l, c, f, u, p, _, w, y) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e[4] = a, e[5] = s, e[6] = o, e[7] = h, e[8] = l, e[9] = c, e[10] = f, e[11] = u, e[12] = p, e[13] = _, e[14] = w, e[15] = y, e;
}
function Ma(e) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function uc(e, t) {
  if (e === t) {
    var r = t[1], i = t[2], n = t[3], a = t[6], s = t[7], o = t[11];
    e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = r, e[6] = t[9], e[7] = t[13], e[8] = i, e[9] = a, e[11] = t[14], e[12] = n, e[13] = s, e[14] = o;
  } else
    e[0] = t[0], e[1] = t[4], e[2] = t[8], e[3] = t[12], e[4] = t[1], e[5] = t[5], e[6] = t[9], e[7] = t[13], e[8] = t[2], e[9] = t[6], e[10] = t[10], e[11] = t[14], e[12] = t[3], e[13] = t[7], e[14] = t[11], e[15] = t[15];
  return e;
}
function dc(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = t[4], o = t[5], h = t[6], l = t[7], c = t[8], f = t[9], u = t[10], p = t[11], _ = t[12], w = t[13], y = t[14], M = t[15], b = r * o - i * s, L = r * h - n * s, $ = r * l - a * s, R = i * h - n * o, S = i * l - a * o, V = n * l - a * h, q = c * w - f * _, k = c * y - u * _, W = c * M - p * _, O = f * y - u * w, X = f * M - p * w, Y = u * M - p * y, z = b * Y - L * X + $ * O + R * W - S * k + V * q;
  return z ? (z = 1 / z, e[0] = (o * Y - h * X + l * O) * z, e[1] = (n * X - i * Y - a * O) * z, e[2] = (w * V - y * S + M * R) * z, e[3] = (u * S - f * V - p * R) * z, e[4] = (h * W - s * Y - l * k) * z, e[5] = (r * Y - n * W + a * k) * z, e[6] = (y * $ - _ * V - M * L) * z, e[7] = (c * V - u * $ + p * L) * z, e[8] = (s * X - o * W + l * q) * z, e[9] = (i * W - r * X - a * q) * z, e[10] = (_ * S - w * $ + M * b) * z, e[11] = (f * $ - c * S - p * b) * z, e[12] = (o * k - s * O - h * q) * z, e[13] = (r * O - i * k + n * q) * z, e[14] = (w * L - _ * R - y * b) * z, e[15] = (c * R - f * L + u * b) * z, e) : null;
}
function pc(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = t[4], o = t[5], h = t[6], l = t[7], c = t[8], f = t[9], u = t[10], p = t[11], _ = t[12], w = t[13], y = t[14], M = t[15];
  return e[0] = o * (u * M - p * y) - f * (h * M - l * y) + w * (h * p - l * u), e[1] = -(i * (u * M - p * y) - f * (n * M - a * y) + w * (n * p - a * u)), e[2] = i * (h * M - l * y) - o * (n * M - a * y) + w * (n * l - a * h), e[3] = -(i * (h * p - l * u) - o * (n * p - a * u) + f * (n * l - a * h)), e[4] = -(s * (u * M - p * y) - c * (h * M - l * y) + _ * (h * p - l * u)), e[5] = r * (u * M - p * y) - c * (n * M - a * y) + _ * (n * p - a * u), e[6] = -(r * (h * M - l * y) - s * (n * M - a * y) + _ * (n * l - a * h)), e[7] = r * (h * p - l * u) - s * (n * p - a * u) + c * (n * l - a * h), e[8] = s * (f * M - p * w) - c * (o * M - l * w) + _ * (o * p - l * f), e[9] = -(r * (f * M - p * w) - c * (i * M - a * w) + _ * (i * p - a * f)), e[10] = r * (o * M - l * w) - s * (i * M - a * w) + _ * (i * l - a * o), e[11] = -(r * (o * p - l * f) - s * (i * p - a * f) + c * (i * l - a * o)), e[12] = -(s * (f * y - u * w) - c * (o * y - h * w) + _ * (o * u - h * f)), e[13] = r * (f * y - u * w) - c * (i * y - n * w) + _ * (i * u - n * f), e[14] = -(r * (o * y - h * w) - s * (i * y - n * w) + _ * (i * h - n * o)), e[15] = r * (o * u - h * f) - s * (i * u - n * f) + c * (i * h - n * o), e;
}
function mc(e) {
  var t = e[0], r = e[1], i = e[2], n = e[3], a = e[4], s = e[5], o = e[6], h = e[7], l = e[8], c = e[9], f = e[10], u = e[11], p = e[12], _ = e[13], w = e[14], y = e[15], M = t * s - r * a, b = t * o - i * a, L = t * h - n * a, $ = r * o - i * s, R = r * h - n * s, S = i * h - n * o, V = l * _ - c * p, q = l * w - f * p, k = l * y - u * p, W = c * w - f * _, O = c * y - u * _, X = f * y - u * w;
  return M * X - b * O + L * W + $ * k - R * q + S * V;
}
function Ea(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = t[8], u = t[9], p = t[10], _ = t[11], w = t[12], y = t[13], M = t[14], b = t[15], L = r[0], $ = r[1], R = r[2], S = r[3];
  return e[0] = L * i + $ * o + R * f + S * w, e[1] = L * n + $ * h + R * u + S * y, e[2] = L * a + $ * l + R * p + S * M, e[3] = L * s + $ * c + R * _ + S * b, L = r[4], $ = r[5], R = r[6], S = r[7], e[4] = L * i + $ * o + R * f + S * w, e[5] = L * n + $ * h + R * u + S * y, e[6] = L * a + $ * l + R * p + S * M, e[7] = L * s + $ * c + R * _ + S * b, L = r[8], $ = r[9], R = r[10], S = r[11], e[8] = L * i + $ * o + R * f + S * w, e[9] = L * n + $ * h + R * u + S * y, e[10] = L * a + $ * l + R * p + S * M, e[11] = L * s + $ * c + R * _ + S * b, L = r[12], $ = r[13], R = r[14], S = r[15], e[12] = L * i + $ * o + R * f + S * w, e[13] = L * n + $ * h + R * u + S * y, e[14] = L * a + $ * l + R * p + S * M, e[15] = L * s + $ * c + R * _ + S * b, e;
}
function _c(e, t, r) {
  var i = r[0], n = r[1], a = r[2], s, o, h, l, c, f, u, p, _, w, y, M;
  return t === e ? (e[12] = t[0] * i + t[4] * n + t[8] * a + t[12], e[13] = t[1] * i + t[5] * n + t[9] * a + t[13], e[14] = t[2] * i + t[6] * n + t[10] * a + t[14], e[15] = t[3] * i + t[7] * n + t[11] * a + t[15]) : (s = t[0], o = t[1], h = t[2], l = t[3], c = t[4], f = t[5], u = t[6], p = t[7], _ = t[8], w = t[9], y = t[10], M = t[11], e[0] = s, e[1] = o, e[2] = h, e[3] = l, e[4] = c, e[5] = f, e[6] = u, e[7] = p, e[8] = _, e[9] = w, e[10] = y, e[11] = M, e[12] = s * i + c * n + _ * a + t[12], e[13] = o * i + f * n + w * a + t[13], e[14] = h * i + u * n + y * a + t[14], e[15] = l * i + p * n + M * a + t[15]), e;
}
function yc(e, t, r) {
  var i = r[0], n = r[1], a = r[2];
  return e[0] = t[0] * i, e[1] = t[1] * i, e[2] = t[2] * i, e[3] = t[3] * i, e[4] = t[4] * n, e[5] = t[5] * n, e[6] = t[6] * n, e[7] = t[7] * n, e[8] = t[8] * a, e[9] = t[9] * a, e[10] = t[10] * a, e[11] = t[11] * a, e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15], e;
}
function gc(e, t, r, i) {
  var n = i[0], a = i[1], s = i[2], o = Math.hypot(n, a, s), h, l, c, f, u, p, _, w, y, M, b, L, $, R, S, V, q, k, W, O, X, Y, z, x;
  return o < A ? null : (o = 1 / o, n *= o, a *= o, s *= o, h = Math.sin(r), l = Math.cos(r), c = 1 - l, f = t[0], u = t[1], p = t[2], _ = t[3], w = t[4], y = t[5], M = t[6], b = t[7], L = t[8], $ = t[9], R = t[10], S = t[11], V = n * n * c + l, q = a * n * c + s * h, k = s * n * c - a * h, W = n * a * c - s * h, O = a * a * c + l, X = s * a * c + n * h, Y = n * s * c + a * h, z = a * s * c - n * h, x = s * s * c + l, e[0] = f * V + w * q + L * k, e[1] = u * V + y * q + $ * k, e[2] = p * V + M * q + R * k, e[3] = _ * V + b * q + S * k, e[4] = f * W + w * O + L * X, e[5] = u * W + y * O + $ * X, e[6] = p * W + M * O + R * X, e[7] = _ * W + b * O + S * X, e[8] = f * Y + w * z + L * x, e[9] = u * Y + y * z + $ * x, e[10] = p * Y + M * z + R * x, e[11] = _ * Y + b * z + S * x, t !== e && (e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e);
}
function wc(e, t, r) {
  var i = Math.sin(r), n = Math.cos(r), a = t[4], s = t[5], o = t[6], h = t[7], l = t[8], c = t[9], f = t[10], u = t[11];
  return t !== e && (e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[4] = a * n + l * i, e[5] = s * n + c * i, e[6] = o * n + f * i, e[7] = h * n + u * i, e[8] = l * n - a * i, e[9] = c * n - s * i, e[10] = f * n - o * i, e[11] = u * n - h * i, e;
}
function xc(e, t, r) {
  var i = Math.sin(r), n = Math.cos(r), a = t[0], s = t[1], o = t[2], h = t[3], l = t[8], c = t[9], f = t[10], u = t[11];
  return t !== e && (e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = a * n - l * i, e[1] = s * n - c * i, e[2] = o * n - f * i, e[3] = h * n - u * i, e[8] = a * i + l * n, e[9] = s * i + c * n, e[10] = o * i + f * n, e[11] = h * i + u * n, e;
}
function Mc(e, t, r) {
  var i = Math.sin(r), n = Math.cos(r), a = t[0], s = t[1], o = t[2], h = t[3], l = t[4], c = t[5], f = t[6], u = t[7];
  return t !== e && (e[8] = t[8], e[9] = t[9], e[10] = t[10], e[11] = t[11], e[12] = t[12], e[13] = t[13], e[14] = t[14], e[15] = t[15]), e[0] = a * n + l * i, e[1] = s * n + c * i, e[2] = o * n + f * i, e[3] = h * n + u * i, e[4] = l * n - a * i, e[5] = c * n - s * i, e[6] = f * n - o * i, e[7] = u * n - h * i, e;
}
function Ec(e, t) {
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = t[0], e[13] = t[1], e[14] = t[2], e[15] = 1, e;
}
function Tc(e, t) {
  return e[0] = t[0], e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = t[1], e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = t[2], e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function bc(e, t, r) {
  var i = r[0], n = r[1], a = r[2], s = Math.hypot(i, n, a), o, h, l;
  return s < A ? null : (s = 1 / s, i *= s, n *= s, a *= s, o = Math.sin(t), h = Math.cos(t), l = 1 - h, e[0] = i * i * l + h, e[1] = n * i * l + a * o, e[2] = a * i * l - n * o, e[3] = 0, e[4] = i * n * l - a * o, e[5] = n * n * l + h, e[6] = a * n * l + i * o, e[7] = 0, e[8] = i * a * l + n * o, e[9] = n * a * l - i * o, e[10] = a * a * l + h, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e);
}
function Cc(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = 1, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = i, e[6] = r, e[7] = 0, e[8] = 0, e[9] = -r, e[10] = i, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function Sc(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = i, e[1] = 0, e[2] = -r, e[3] = 0, e[4] = 0, e[5] = 1, e[6] = 0, e[7] = 0, e[8] = r, e[9] = 0, e[10] = i, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function Pc(e, t) {
  var r = Math.sin(t), i = Math.cos(t);
  return e[0] = i, e[1] = r, e[2] = 0, e[3] = 0, e[4] = -r, e[5] = i, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 1, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function Ta(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = i + i, h = n + n, l = a + a, c = i * o, f = i * h, u = i * l, p = n * h, _ = n * l, w = a * l, y = s * o, M = s * h, b = s * l;
  return e[0] = 1 - (p + w), e[1] = f + b, e[2] = u - M, e[3] = 0, e[4] = f - b, e[5] = 1 - (c + w), e[6] = _ + y, e[7] = 0, e[8] = u + M, e[9] = _ - y, e[10] = 1 - (c + p), e[11] = 0, e[12] = r[0], e[13] = r[1], e[14] = r[2], e[15] = 1, e;
}
function Lc(e, t) {
  var r = new U(3), i = -t[0], n = -t[1], a = -t[2], s = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = i * i + n * n + a * a + s * s;
  return f > 0 ? (r[0] = (o * s + c * i + h * a - l * n) * 2 / f, r[1] = (h * s + c * n + l * i - o * a) * 2 / f, r[2] = (l * s + c * a + o * n - h * i) * 2 / f) : (r[0] = (o * s + c * i + h * a - l * n) * 2, r[1] = (h * s + c * n + l * i - o * a) * 2, r[2] = (l * s + c * a + o * n - h * i) * 2), Ta(e, t, r), e;
}
function ba(e, t) {
  return e[0] = t[12], e[1] = t[13], e[2] = t[14], e;
}
function Ca(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[4], s = t[5], o = t[6], h = t[8], l = t[9], c = t[10];
  return e[0] = Math.hypot(r, i, n), e[1] = Math.hypot(a, s, o), e[2] = Math.hypot(h, l, c), e;
}
function Sa(e, t) {
  var r = new U(3);
  Ca(r, t);
  var i = 1 / r[0], n = 1 / r[1], a = 1 / r[2], s = t[0] * i, o = t[1] * n, h = t[2] * a, l = t[4] * i, c = t[5] * n, f = t[6] * a, u = t[8] * i, p = t[9] * n, _ = t[10] * a, w = s + c + _, y = 0;
  return w > 0 ? (y = Math.sqrt(w + 1) * 2, e[3] = 0.25 * y, e[0] = (f - p) / y, e[1] = (u - h) / y, e[2] = (o - l) / y) : s > c && s > _ ? (y = Math.sqrt(1 + s - c - _) * 2, e[3] = (f - p) / y, e[0] = 0.25 * y, e[1] = (o + l) / y, e[2] = (u + h) / y) : c > _ ? (y = Math.sqrt(1 + c - s - _) * 2, e[3] = (u - h) / y, e[0] = (o + l) / y, e[1] = 0.25 * y, e[2] = (f + p) / y) : (y = Math.sqrt(1 + _ - s - c) * 2, e[3] = (o - l) / y, e[0] = (u + h) / y, e[1] = (f + p) / y, e[2] = 0.25 * y), e;
}
function $c(e, t, r, i) {
  var n = t[0], a = t[1], s = t[2], o = t[3], h = n + n, l = a + a, c = s + s, f = n * h, u = n * l, p = n * c, _ = a * l, w = a * c, y = s * c, M = o * h, b = o * l, L = o * c, $ = i[0], R = i[1], S = i[2];
  return e[0] = (1 - (_ + y)) * $, e[1] = (u + L) * $, e[2] = (p - b) * $, e[3] = 0, e[4] = (u - L) * R, e[5] = (1 - (f + y)) * R, e[6] = (w + M) * R, e[7] = 0, e[8] = (p + b) * S, e[9] = (w - M) * S, e[10] = (1 - (f + _)) * S, e[11] = 0, e[12] = r[0], e[13] = r[1], e[14] = r[2], e[15] = 1, e;
}
function Rc(e, t, r, i, n) {
  var a = t[0], s = t[1], o = t[2], h = t[3], l = a + a, c = s + s, f = o + o, u = a * l, p = a * c, _ = a * f, w = s * c, y = s * f, M = o * f, b = h * l, L = h * c, $ = h * f, R = i[0], S = i[1], V = i[2], q = n[0], k = n[1], W = n[2], O = (1 - (w + M)) * R, X = (p + $) * R, Y = (_ - L) * R, z = (p - $) * S, x = (1 - (u + M)) * S, Te = (y + b) * S, K = (_ + L) * V, $e = (y - b) * V, ge = (1 - (u + w)) * V;
  return e[0] = O, e[1] = X, e[2] = Y, e[3] = 0, e[4] = z, e[5] = x, e[6] = Te, e[7] = 0, e[8] = K, e[9] = $e, e[10] = ge, e[11] = 0, e[12] = r[0] + q - (O * q + z * k + K * W), e[13] = r[1] + k - (X * q + x * k + $e * W), e[14] = r[2] + W - (Y * q + Te * k + ge * W), e[15] = 1, e;
}
function Ac(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = r + r, o = i + i, h = n + n, l = r * s, c = i * s, f = i * o, u = n * s, p = n * o, _ = n * h, w = a * s, y = a * o, M = a * h;
  return e[0] = 1 - f - _, e[1] = c + M, e[2] = u - y, e[3] = 0, e[4] = c - M, e[5] = 1 - l - _, e[6] = p + w, e[7] = 0, e[8] = u + y, e[9] = p - w, e[10] = 1 - l - f, e[11] = 0, e[12] = 0, e[13] = 0, e[14] = 0, e[15] = 1, e;
}
function zc(e, t, r, i, n, a, s) {
  var o = 1 / (r - t), h = 1 / (n - i), l = 1 / (a - s);
  return e[0] = a * 2 * o, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = a * 2 * h, e[6] = 0, e[7] = 0, e[8] = (r + t) * o, e[9] = (n + i) * h, e[10] = (s + a) * l, e[11] = -1, e[12] = 0, e[13] = 0, e[14] = s * a * 2 * l, e[15] = 0, e;
}
function Oc(e, t, r, i, n) {
  var a = 1 / Math.tan(t / 2), s;
  return e[0] = a / r, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = a, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[11] = -1, e[12] = 0, e[13] = 0, e[15] = 0, n != null && n !== 1 / 0 ? (s = 1 / (i - n), e[10] = (n + i) * s, e[14] = 2 * n * i * s) : (e[10] = -1, e[14] = -2 * i), e;
}
function Ic(e, t, r, i) {
  var n = Math.tan(t.upDegrees * Math.PI / 180), a = Math.tan(t.downDegrees * Math.PI / 180), s = Math.tan(t.leftDegrees * Math.PI / 180), o = Math.tan(t.rightDegrees * Math.PI / 180), h = 2 / (s + o), l = 2 / (n + a);
  return e[0] = h, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = l, e[6] = 0, e[7] = 0, e[8] = -((s - o) * h * 0.5), e[9] = (n - a) * l * 0.5, e[10] = i / (r - i), e[11] = -1, e[12] = 0, e[13] = 0, e[14] = i * r / (r - i), e[15] = 0, e;
}
function Dc(e, t, r, i, n, a, s) {
  var o = 1 / (t - r), h = 1 / (i - n), l = 1 / (a - s);
  return e[0] = -2 * o, e[1] = 0, e[2] = 0, e[3] = 0, e[4] = 0, e[5] = -2 * h, e[6] = 0, e[7] = 0, e[8] = 0, e[9] = 0, e[10] = 2 * l, e[11] = 0, e[12] = (t + r) * o, e[13] = (n + i) * h, e[14] = (s + a) * l, e[15] = 1, e;
}
function Hc(e, t, r, i) {
  var n, a, s, o, h, l, c, f, u, p, _ = t[0], w = t[1], y = t[2], M = i[0], b = i[1], L = i[2], $ = r[0], R = r[1], S = r[2];
  return Math.abs(_ - $) < A && Math.abs(w - R) < A && Math.abs(y - S) < A ? Ma(e) : (c = _ - $, f = w - R, u = y - S, p = 1 / Math.hypot(c, f, u), c *= p, f *= p, u *= p, n = b * u - L * f, a = L * c - M * u, s = M * f - b * c, p = Math.hypot(n, a, s), p ? (p = 1 / p, n *= p, a *= p, s *= p) : (n = 0, a = 0, s = 0), o = f * s - u * a, h = u * n - c * s, l = c * a - f * n, p = Math.hypot(o, h, l), p ? (p = 1 / p, o *= p, h *= p, l *= p) : (o = 0, h = 0, l = 0), e[0] = n, e[1] = o, e[2] = c, e[3] = 0, e[4] = a, e[5] = h, e[6] = f, e[7] = 0, e[8] = s, e[9] = l, e[10] = u, e[11] = 0, e[12] = -(n * _ + a * w + s * y), e[13] = -(o * _ + h * w + l * y), e[14] = -(c * _ + f * w + u * y), e[15] = 1, e);
}
function Fc(e, t, r, i) {
  var n = t[0], a = t[1], s = t[2], o = i[0], h = i[1], l = i[2], c = n - r[0], f = a - r[1], u = s - r[2], p = c * c + f * f + u * u;
  p > 0 && (p = 1 / Math.sqrt(p), c *= p, f *= p, u *= p);
  var _ = h * u - l * f, w = l * c - o * u, y = o * f - h * c;
  return p = _ * _ + w * w + y * y, p > 0 && (p = 1 / Math.sqrt(p), _ *= p, w *= p, y *= p), e[0] = _, e[1] = w, e[2] = y, e[3] = 0, e[4] = f * y - u * w, e[5] = u * _ - c * y, e[6] = c * w - f * _, e[7] = 0, e[8] = c, e[9] = f, e[10] = u, e[11] = 0, e[12] = n, e[13] = a, e[14] = s, e[15] = 1, e;
}
function Nc(e) {
  return "mat4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ", " + e[9] + ", " + e[10] + ", " + e[11] + ", " + e[12] + ", " + e[13] + ", " + e[14] + ", " + e[15] + ")";
}
function Vc(e) {
  return Math.hypot(e[0], e[1], e[2], e[3], e[4], e[5], e[6], e[7], e[8], e[9], e[10], e[11], e[12], e[13], e[14], e[15]);
}
function kc(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e[4] = t[4] + r[4], e[5] = t[5] + r[5], e[6] = t[6] + r[6], e[7] = t[7] + r[7], e[8] = t[8] + r[8], e[9] = t[9] + r[9], e[10] = t[10] + r[10], e[11] = t[11] + r[11], e[12] = t[12] + r[12], e[13] = t[13] + r[13], e[14] = t[14] + r[14], e[15] = t[15] + r[15], e;
}
function Pa(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e[4] = t[4] - r[4], e[5] = t[5] - r[5], e[6] = t[6] - r[6], e[7] = t[7] - r[7], e[8] = t[8] - r[8], e[9] = t[9] - r[9], e[10] = t[10] - r[10], e[11] = t[11] - r[11], e[12] = t[12] - r[12], e[13] = t[13] - r[13], e[14] = t[14] - r[14], e[15] = t[15] - r[15], e;
}
function jc(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e[8] = t[8] * r, e[9] = t[9] * r, e[10] = t[10] * r, e[11] = t[11] * r, e[12] = t[12] * r, e[13] = t[13] * r, e[14] = t[14] * r, e[15] = t[15] * r, e;
}
function Wc(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e[4] = t[4] + r[4] * i, e[5] = t[5] + r[5] * i, e[6] = t[6] + r[6] * i, e[7] = t[7] + r[7] * i, e[8] = t[8] + r[8] * i, e[9] = t[9] + r[9] * i, e[10] = t[10] + r[10] * i, e[11] = t[11] + r[11] * i, e[12] = t[12] + r[12] * i, e[13] = t[13] + r[13] * i, e[14] = t[14] + r[14] * i, e[15] = t[15] + r[15] * i, e;
}
function Yc(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7] && e[8] === t[8] && e[9] === t[9] && e[10] === t[10] && e[11] === t[11] && e[12] === t[12] && e[13] === t[13] && e[14] === t[14] && e[15] === t[15];
}
function qc(e, t) {
  var r = e[0], i = e[1], n = e[2], a = e[3], s = e[4], o = e[5], h = e[6], l = e[7], c = e[8], f = e[9], u = e[10], p = e[11], _ = e[12], w = e[13], y = e[14], M = e[15], b = t[0], L = t[1], $ = t[2], R = t[3], S = t[4], V = t[5], q = t[6], k = t[7], W = t[8], O = t[9], X = t[10], Y = t[11], z = t[12], x = t[13], Te = t[14], K = t[15];
  return Math.abs(r - b) <= A * Math.max(1, Math.abs(r), Math.abs(b)) && Math.abs(i - L) <= A * Math.max(1, Math.abs(i), Math.abs(L)) && Math.abs(n - $) <= A * Math.max(1, Math.abs(n), Math.abs($)) && Math.abs(a - R) <= A * Math.max(1, Math.abs(a), Math.abs(R)) && Math.abs(s - S) <= A * Math.max(1, Math.abs(s), Math.abs(S)) && Math.abs(o - V) <= A * Math.max(1, Math.abs(o), Math.abs(V)) && Math.abs(h - q) <= A * Math.max(1, Math.abs(h), Math.abs(q)) && Math.abs(l - k) <= A * Math.max(1, Math.abs(l), Math.abs(k)) && Math.abs(c - W) <= A * Math.max(1, Math.abs(c), Math.abs(W)) && Math.abs(f - O) <= A * Math.max(1, Math.abs(f), Math.abs(O)) && Math.abs(u - X) <= A * Math.max(1, Math.abs(u), Math.abs(X)) && Math.abs(p - Y) <= A * Math.max(1, Math.abs(p), Math.abs(Y)) && Math.abs(_ - z) <= A * Math.max(1, Math.abs(_), Math.abs(z)) && Math.abs(w - x) <= A * Math.max(1, Math.abs(w), Math.abs(x)) && Math.abs(y - Te) <= A * Math.max(1, Math.abs(y), Math.abs(Te)) && Math.abs(M - K) <= A * Math.max(1, Math.abs(M), Math.abs(K));
}
var Xc = Ea, Uc = Pa;
const Bc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: kc,
  adjoint: pc,
  clone: lc,
  copy: cc,
  create: hc,
  determinant: mc,
  equals: qc,
  exactEquals: Yc,
  frob: Vc,
  fromQuat: Ac,
  fromQuat2: Lc,
  fromRotation: bc,
  fromRotationTranslation: Ta,
  fromRotationTranslationScale: $c,
  fromRotationTranslationScaleOrigin: Rc,
  fromScaling: Tc,
  fromTranslation: Ec,
  fromValues: vc,
  fromXRotation: Cc,
  fromYRotation: Sc,
  fromZRotation: Pc,
  frustum: zc,
  getRotation: Sa,
  getScaling: Ca,
  getTranslation: ba,
  identity: Ma,
  invert: dc,
  lookAt: Hc,
  mul: Xc,
  multiply: Ea,
  multiplyScalar: jc,
  multiplyScalarAndAdd: Wc,
  ortho: Dc,
  perspective: Oc,
  perspectiveFromFieldOfView: Ic,
  rotate: gc,
  rotateX: wc,
  rotateY: xc,
  rotateZ: Mc,
  scale: yc,
  set: fc,
  str: Nc,
  sub: Uc,
  subtract: Pa,
  targetTo: Fc,
  translate: _c,
  transpose: uc
}, Symbol.toStringTag, { value: "Module" }));
function rn() {
  var e = new U(3);
  return U != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e;
}
function Gc(e) {
  var t = new U(3);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t;
}
function La(e) {
  var t = e[0], r = e[1], i = e[2];
  return Math.hypot(t, r, i);
}
function Yi(e, t, r) {
  var i = new U(3);
  return i[0] = e, i[1] = t, i[2] = r, i;
}
function Zc(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e;
}
function Kc(e, t, r, i) {
  return e[0] = t, e[1] = r, e[2] = i, e;
}
function Qc(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e;
}
function $a(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e;
}
function Ra(e, t, r) {
  return e[0] = t[0] * r[0], e[1] = t[1] * r[1], e[2] = t[2] * r[2], e;
}
function Aa(e, t, r) {
  return e[0] = t[0] / r[0], e[1] = t[1] / r[1], e[2] = t[2] / r[2], e;
}
function Jc(e, t) {
  return e[0] = Math.ceil(t[0]), e[1] = Math.ceil(t[1]), e[2] = Math.ceil(t[2]), e;
}
function ev(e, t) {
  return e[0] = Math.floor(t[0]), e[1] = Math.floor(t[1]), e[2] = Math.floor(t[2]), e;
}
function tv(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e[2] = Math.min(t[2], r[2]), e;
}
function rv(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e[2] = Math.max(t[2], r[2]), e;
}
function iv(e, t) {
  return e[0] = Math.round(t[0]), e[1] = Math.round(t[1]), e[2] = Math.round(t[2]), e;
}
function nv(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e;
}
function av(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e;
}
function za(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1], n = t[2] - e[2];
  return Math.hypot(r, i, n);
}
function Oa(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1], n = t[2] - e[2];
  return r * r + i * i + n * n;
}
function Ia(e) {
  var t = e[0], r = e[1], i = e[2];
  return t * t + r * r + i * i;
}
function sv(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e;
}
function ov(e, t) {
  return e[0] = 1 / t[0], e[1] = 1 / t[1], e[2] = 1 / t[2], e;
}
function Da(e, t) {
  var r = t[0], i = t[1], n = t[2], a = r * r + i * i + n * n;
  return a > 0 && (a = 1 / Math.sqrt(a)), e[0] = t[0] * a, e[1] = t[1] * a, e[2] = t[2] * a, e;
}
function nn(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2];
}
function Ur(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = r[0], o = r[1], h = r[2];
  return e[0] = n * h - a * o, e[1] = a * s - i * h, e[2] = i * o - n * s, e;
}
function hv(e, t, r, i) {
  var n = t[0], a = t[1], s = t[2];
  return e[0] = n + i * (r[0] - n), e[1] = a + i * (r[1] - a), e[2] = s + i * (r[2] - s), e;
}
function lv(e, t, r, i, n, a) {
  var s = a * a, o = s * (2 * a - 3) + 1, h = s * (a - 2) + a, l = s * (a - 1), c = s * (3 - 2 * a);
  return e[0] = t[0] * o + r[0] * h + i[0] * l + n[0] * c, e[1] = t[1] * o + r[1] * h + i[1] * l + n[1] * c, e[2] = t[2] * o + r[2] * h + i[2] * l + n[2] * c, e;
}
function cv(e, t, r, i, n, a) {
  var s = 1 - a, o = s * s, h = a * a, l = o * s, c = 3 * a * o, f = 3 * h * s, u = h * a;
  return e[0] = t[0] * l + r[0] * c + i[0] * f + n[0] * u, e[1] = t[1] * l + r[1] * c + i[1] * f + n[1] * u, e[2] = t[2] * l + r[2] * c + i[2] * f + n[2] * u, e;
}
function vv(e, t) {
  t = t || 1;
  var r = We() * 2 * Math.PI, i = We() * 2 - 1, n = Math.sqrt(1 - i * i) * t;
  return e[0] = Math.cos(r) * n, e[1] = Math.sin(r) * n, e[2] = i * t, e;
}
function fv(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = r[3] * i + r[7] * n + r[11] * a + r[15];
  return s = s || 1, e[0] = (r[0] * i + r[4] * n + r[8] * a + r[12]) / s, e[1] = (r[1] * i + r[5] * n + r[9] * a + r[13]) / s, e[2] = (r[2] * i + r[6] * n + r[10] * a + r[14]) / s, e;
}
function uv(e, t, r) {
  var i = t[0], n = t[1], a = t[2];
  return e[0] = i * r[0] + n * r[3] + a * r[6], e[1] = i * r[1] + n * r[4] + a * r[7], e[2] = i * r[2] + n * r[5] + a * r[8], e;
}
function dv(e, t, r) {
  var i = r[0], n = r[1], a = r[2], s = r[3], o = t[0], h = t[1], l = t[2], c = n * l - a * h, f = a * o - i * l, u = i * h - n * o, p = n * u - a * f, _ = a * c - i * u, w = i * f - n * c, y = s * 2;
  return c *= y, f *= y, u *= y, p *= 2, _ *= 2, w *= 2, e[0] = o + c + p, e[1] = h + f + _, e[2] = l + u + w, e;
}
function pv(e, t, r, i) {
  var n = [], a = [];
  return n[0] = t[0] - r[0], n[1] = t[1] - r[1], n[2] = t[2] - r[2], a[0] = n[0], a[1] = n[1] * Math.cos(i) - n[2] * Math.sin(i), a[2] = n[1] * Math.sin(i) + n[2] * Math.cos(i), e[0] = a[0] + r[0], e[1] = a[1] + r[1], e[2] = a[2] + r[2], e;
}
function mv(e, t, r, i) {
  var n = [], a = [];
  return n[0] = t[0] - r[0], n[1] = t[1] - r[1], n[2] = t[2] - r[2], a[0] = n[2] * Math.sin(i) + n[0] * Math.cos(i), a[1] = n[1], a[2] = n[2] * Math.cos(i) - n[0] * Math.sin(i), e[0] = a[0] + r[0], e[1] = a[1] + r[1], e[2] = a[2] + r[2], e;
}
function _v(e, t, r, i) {
  var n = [], a = [];
  return n[0] = t[0] - r[0], n[1] = t[1] - r[1], n[2] = t[2] - r[2], a[0] = n[0] * Math.cos(i) - n[1] * Math.sin(i), a[1] = n[0] * Math.sin(i) + n[1] * Math.cos(i), a[2] = n[2], e[0] = a[0] + r[0], e[1] = a[1] + r[1], e[2] = a[2] + r[2], e;
}
function yv(e, t) {
  var r = e[0], i = e[1], n = e[2], a = t[0], s = t[1], o = t[2], h = Math.sqrt(r * r + i * i + n * n), l = Math.sqrt(a * a + s * s + o * o), c = h * l, f = c && nn(e, t) / c;
  return Math.acos(Math.min(Math.max(f, -1), 1));
}
function gv(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e;
}
function wv(e) {
  return "vec3(" + e[0] + ", " + e[1] + ", " + e[2] + ")";
}
function xv(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2];
}
function Mv(e, t) {
  var r = e[0], i = e[1], n = e[2], a = t[0], s = t[1], o = t[2];
  return Math.abs(r - a) <= A * Math.max(1, Math.abs(r), Math.abs(a)) && Math.abs(i - s) <= A * Math.max(1, Math.abs(i), Math.abs(s)) && Math.abs(n - o) <= A * Math.max(1, Math.abs(n), Math.abs(o));
}
var Ev = $a, Tv = Ra, bv = Aa, Cv = za, Sv = Oa, Ha = La, Pv = Ia, Lv = function() {
  var e = rn();
  return function(t, r, i, n, a, s) {
    var o, h;
    for (r || (r = 3), i || (i = 0), n ? h = Math.min(n * r + i, t.length) : h = t.length, o = i; o < h; o += r)
      e[0] = t[o], e[1] = t[o + 1], e[2] = t[o + 2], a(e, e, s), t[o] = e[0], t[o + 1] = e[1], t[o + 2] = e[2];
    return t;
  };
}();
const $v = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Qc,
  angle: yv,
  bezier: cv,
  ceil: Jc,
  clone: Gc,
  copy: Zc,
  create: rn,
  cross: Ur,
  dist: Cv,
  distance: za,
  div: bv,
  divide: Aa,
  dot: nn,
  equals: Mv,
  exactEquals: xv,
  floor: ev,
  forEach: Lv,
  fromValues: Yi,
  hermite: lv,
  inverse: ov,
  len: Ha,
  length: La,
  lerp: hv,
  max: rv,
  min: tv,
  mul: Tv,
  multiply: Ra,
  negate: sv,
  normalize: Da,
  random: vv,
  rotateX: pv,
  rotateY: mv,
  rotateZ: _v,
  round: iv,
  scale: nv,
  scaleAndAdd: av,
  set: Kc,
  sqrDist: Sv,
  sqrLen: Pv,
  squaredDistance: Oa,
  squaredLength: Ia,
  str: wv,
  sub: Ev,
  subtract: $a,
  transformMat3: uv,
  transformMat4: fv,
  transformQuat: dv,
  zero: gv
}, Symbol.toStringTag, { value: "Module" }));
function Fa() {
  var e = new U(4);
  return U != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0), e;
}
function Na(e) {
  var t = new U(4);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t;
}
function Va(e, t, r, i) {
  var n = new U(4);
  return n[0] = e, n[1] = t, n[2] = r, n[3] = i, n;
}
function ka(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e;
}
function ja(e, t, r, i, n) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e;
}
function Wa(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e;
}
function Ya(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e[2] = t[2] - r[2], e[3] = t[3] - r[3], e;
}
function qa(e, t, r) {
  return e[0] = t[0] * r[0], e[1] = t[1] * r[1], e[2] = t[2] * r[2], e[3] = t[3] * r[3], e;
}
function Xa(e, t, r) {
  return e[0] = t[0] / r[0], e[1] = t[1] / r[1], e[2] = t[2] / r[2], e[3] = t[3] / r[3], e;
}
function Rv(e, t) {
  return e[0] = Math.ceil(t[0]), e[1] = Math.ceil(t[1]), e[2] = Math.ceil(t[2]), e[3] = Math.ceil(t[3]), e;
}
function Av(e, t) {
  return e[0] = Math.floor(t[0]), e[1] = Math.floor(t[1]), e[2] = Math.floor(t[2]), e[3] = Math.floor(t[3]), e;
}
function zv(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e[2] = Math.min(t[2], r[2]), e[3] = Math.min(t[3], r[3]), e;
}
function Ov(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e[2] = Math.max(t[2], r[2]), e[3] = Math.max(t[3], r[3]), e;
}
function Iv(e, t) {
  return e[0] = Math.round(t[0]), e[1] = Math.round(t[1]), e[2] = Math.round(t[2]), e[3] = Math.round(t[3]), e;
}
function Ua(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e;
}
function Dv(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e[2] = t[2] + r[2] * i, e[3] = t[3] + r[3] * i, e;
}
function Ba(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1], n = t[2] - e[2], a = t[3] - e[3];
  return Math.hypot(r, i, n, a);
}
function Ga(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1], n = t[2] - e[2], a = t[3] - e[3];
  return r * r + i * i + n * n + a * a;
}
function an(e) {
  var t = e[0], r = e[1], i = e[2], n = e[3];
  return Math.hypot(t, r, i, n);
}
function sn(e) {
  var t = e[0], r = e[1], i = e[2], n = e[3];
  return t * t + r * r + i * i + n * n;
}
function Hv(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = -t[3], e;
}
function Fv(e, t) {
  return e[0] = 1 / t[0], e[1] = 1 / t[1], e[2] = 1 / t[2], e[3] = 1 / t[3], e;
}
function Za(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = r * r + i * i + n * n + a * a;
  return s > 0 && (s = 1 / Math.sqrt(s)), e[0] = r * s, e[1] = i * s, e[2] = n * s, e[3] = a * s, e;
}
function Ka(e, t) {
  return e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3];
}
function Nv(e, t, r, i) {
  var n = r[0] * i[1] - r[1] * i[0], a = r[0] * i[2] - r[2] * i[0], s = r[0] * i[3] - r[3] * i[0], o = r[1] * i[2] - r[2] * i[1], h = r[1] * i[3] - r[3] * i[1], l = r[2] * i[3] - r[3] * i[2], c = t[0], f = t[1], u = t[2], p = t[3];
  return e[0] = f * l - u * h + p * o, e[1] = -(c * l) + u * s - p * a, e[2] = c * h - f * s + p * n, e[3] = -(c * o) + f * a - u * n, e;
}
function Qa(e, t, r, i) {
  var n = t[0], a = t[1], s = t[2], o = t[3];
  return e[0] = n + i * (r[0] - n), e[1] = a + i * (r[1] - a), e[2] = s + i * (r[2] - s), e[3] = o + i * (r[3] - o), e;
}
function Vv(e, t) {
  t = t || 1;
  var r, i, n, a, s, o;
  do
    r = We() * 2 - 1, i = We() * 2 - 1, s = r * r + i * i;
  while (s >= 1);
  do
    n = We() * 2 - 1, a = We() * 2 - 1, o = n * n + a * a;
  while (o >= 1);
  var h = Math.sqrt((1 - s) / o);
  return e[0] = t * r, e[1] = t * i, e[2] = t * n * h, e[3] = t * a * h, e;
}
function kv(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3];
  return e[0] = r[0] * i + r[4] * n + r[8] * a + r[12] * s, e[1] = r[1] * i + r[5] * n + r[9] * a + r[13] * s, e[2] = r[2] * i + r[6] * n + r[10] * a + r[14] * s, e[3] = r[3] * i + r[7] * n + r[11] * a + r[15] * s, e;
}
function jv(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = r[0], o = r[1], h = r[2], l = r[3], c = l * i + o * a - h * n, f = l * n + h * i - s * a, u = l * a + s * n - o * i, p = -s * i - o * n - h * a;
  return e[0] = c * l + p * -s + f * -h - u * -o, e[1] = f * l + p * -o + u * -s - c * -h, e[2] = u * l + p * -h + c * -o - f * -s, e[3] = t[3], e;
}
function Wv(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 0, e;
}
function Yv(e) {
  return "vec4(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
}
function Ja(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3];
}
function es(e, t) {
  var r = e[0], i = e[1], n = e[2], a = e[3], s = t[0], o = t[1], h = t[2], l = t[3];
  return Math.abs(r - s) <= A * Math.max(1, Math.abs(r), Math.abs(s)) && Math.abs(i - o) <= A * Math.max(1, Math.abs(i), Math.abs(o)) && Math.abs(n - h) <= A * Math.max(1, Math.abs(n), Math.abs(h)) && Math.abs(a - l) <= A * Math.max(1, Math.abs(a), Math.abs(l));
}
var qv = Ya, Xv = qa, Uv = Xa, Bv = Ba, Gv = Ga, Zv = an, Kv = sn, Qv = function() {
  var e = Fa();
  return function(t, r, i, n, a, s) {
    var o, h;
    for (r || (r = 4), i || (i = 0), n ? h = Math.min(n * r + i, t.length) : h = t.length, o = i; o < h; o += r)
      e[0] = t[o], e[1] = t[o + 1], e[2] = t[o + 2], e[3] = t[o + 3], a(e, e, s), t[o] = e[0], t[o + 1] = e[1], t[o + 2] = e[2], t[o + 3] = e[3];
    return t;
  };
}();
const Jv = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Wa,
  ceil: Rv,
  clone: Na,
  copy: ka,
  create: Fa,
  cross: Nv,
  dist: Bv,
  distance: Ba,
  div: Uv,
  divide: Xa,
  dot: Ka,
  equals: es,
  exactEquals: Ja,
  floor: Av,
  forEach: Qv,
  fromValues: Va,
  inverse: Fv,
  len: Zv,
  length: an,
  lerp: Qa,
  max: Ov,
  min: zv,
  mul: Xv,
  multiply: qa,
  negate: Hv,
  normalize: Za,
  random: Vv,
  round: Iv,
  scale: Ua,
  scaleAndAdd: Dv,
  set: ja,
  sqrDist: Gv,
  sqrLen: Kv,
  squaredDistance: Ga,
  squaredLength: sn,
  str: Yv,
  sub: qv,
  subtract: Ya,
  transformMat4: kv,
  transformQuat: jv,
  zero: Wv
}, Symbol.toStringTag, { value: "Module" }));
function Gr() {
  var e = new U(4);
  return U != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0), e[3] = 1, e;
}
function ef(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e;
}
function ts(e, t, r) {
  r = r * 0.5;
  var i = Math.sin(r);
  return e[0] = i * t[0], e[1] = i * t[1], e[2] = i * t[2], e[3] = Math.cos(r), e;
}
function tf(e, t) {
  var r = Math.acos(t[3]) * 2, i = Math.sin(r / 2);
  return i > A ? (e[0] = t[0] / i, e[1] = t[1] / i, e[2] = t[2] / i) : (e[0] = 1, e[1] = 0, e[2] = 0), r;
}
function rf(e, t) {
  var r = hn(e, t);
  return Math.acos(2 * r * r - 1);
}
function rs(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = r[0], h = r[1], l = r[2], c = r[3];
  return e[0] = i * c + s * o + n * l - a * h, e[1] = n * c + s * h + a * o - i * l, e[2] = a * c + s * l + i * h - n * o, e[3] = s * c - i * o - n * h - a * l, e;
}
function is(e, t, r) {
  r *= 0.5;
  var i = t[0], n = t[1], a = t[2], s = t[3], o = Math.sin(r), h = Math.cos(r);
  return e[0] = i * h + s * o, e[1] = n * h + a * o, e[2] = a * h - n * o, e[3] = s * h - i * o, e;
}
function ns(e, t, r) {
  r *= 0.5;
  var i = t[0], n = t[1], a = t[2], s = t[3], o = Math.sin(r), h = Math.cos(r);
  return e[0] = i * h - a * o, e[1] = n * h + s * o, e[2] = a * h + i * o, e[3] = s * h - n * o, e;
}
function as(e, t, r) {
  r *= 0.5;
  var i = t[0], n = t[1], a = t[2], s = t[3], o = Math.sin(r), h = Math.cos(r);
  return e[0] = i * h + n * o, e[1] = n * h - i * o, e[2] = a * h + s * o, e[3] = s * h - a * o, e;
}
function nf(e, t) {
  var r = t[0], i = t[1], n = t[2];
  return e[0] = r, e[1] = i, e[2] = n, e[3] = Math.sqrt(Math.abs(1 - r * r - i * i - n * n)), e;
}
function ss(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = Math.sqrt(r * r + i * i + n * n), o = Math.exp(a), h = s > 0 ? o * Math.sin(s) / s : 0;
  return e[0] = r * h, e[1] = i * h, e[2] = n * h, e[3] = o * Math.cos(s), e;
}
function os(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = Math.sqrt(r * r + i * i + n * n), o = s > 0 ? Math.atan2(s, a) / s : 0;
  return e[0] = r * o, e[1] = i * o, e[2] = n * o, e[3] = 0.5 * Math.log(r * r + i * i + n * n + a * a), e;
}
function af(e, t, r) {
  return os(e, t), ls(e, e, r), ss(e, e), e;
}
function Br(e, t, r, i) {
  var n = t[0], a = t[1], s = t[2], o = t[3], h = r[0], l = r[1], c = r[2], f = r[3], u, p, _, w, y;
  return p = n * h + a * l + s * c + o * f, p < 0 && (p = -p, h = -h, l = -l, c = -c, f = -f), 1 - p > A ? (u = Math.acos(p), _ = Math.sin(u), w = Math.sin((1 - i) * u) / _, y = Math.sin(i * u) / _) : (w = 1 - i, y = i), e[0] = w * n + y * h, e[1] = w * a + y * l, e[2] = w * s + y * c, e[3] = w * o + y * f, e;
}
function sf(e) {
  var t = We(), r = We(), i = We(), n = Math.sqrt(1 - t), a = Math.sqrt(t);
  return e[0] = n * Math.sin(2 * Math.PI * r), e[1] = n * Math.cos(2 * Math.PI * r), e[2] = a * Math.sin(2 * Math.PI * i), e[3] = a * Math.cos(2 * Math.PI * i), e;
}
function of(e, t) {
  var r = t[0], i = t[1], n = t[2], a = t[3], s = r * r + i * i + n * n + a * a, o = s ? 1 / s : 0;
  return e[0] = -r * o, e[1] = -i * o, e[2] = -n * o, e[3] = a * o, e;
}
function hf(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e;
}
function hs(e, t) {
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
function lf(e, t, r, i) {
  var n = 0.5 * Math.PI / 180;
  t *= n, r *= n, i *= n;
  var a = Math.sin(t), s = Math.cos(t), o = Math.sin(r), h = Math.cos(r), l = Math.sin(i), c = Math.cos(i);
  return e[0] = a * h * c - s * o * l, e[1] = s * o * c + a * h * l, e[2] = s * h * l - a * o * c, e[3] = s * h * c + a * o * l, e;
}
function cf(e) {
  return "quat(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ")";
}
var vf = Na, ff = Va, on = ka, uf = ja, df = Wa, pf = rs, ls = Ua, hn = Ka, mf = Qa, ln = an, _f = ln, cn = sn, yf = cn, vn = Za, gf = Ja, wf = es, xf = function() {
  var e = rn(), t = Yi(1, 0, 0), r = Yi(0, 1, 0);
  return function(i, n, a) {
    var s = nn(n, a);
    return s < -0.999999 ? (Ur(e, t, n), Ha(e) < 1e-6 && Ur(e, r, n), Da(e, e), ts(i, e, Math.PI), i) : s > 0.999999 ? (i[0] = 0, i[1] = 0, i[2] = 0, i[3] = 1, i) : (Ur(e, n, a), i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = 1 + s, vn(i, i));
  };
}(), Mf = function() {
  var e = Gr(), t = Gr();
  return function(r, i, n, a, s, o) {
    return Br(e, i, s, o), Br(t, n, a, o), Br(r, e, t, 2 * o * (1 - o)), r;
  };
}(), Ef = function() {
  var e = ga();
  return function(t, r, i, n) {
    return e[0] = i[0], e[3] = i[1], e[6] = i[2], e[1] = n[0], e[4] = n[1], e[7] = n[2], e[2] = -r[0], e[5] = -r[1], e[8] = -r[2], vn(t, hs(t, e));
  };
}();
const Tf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: df,
  calculateW: nf,
  clone: vf,
  conjugate: hf,
  copy: on,
  create: Gr,
  dot: hn,
  equals: wf,
  exactEquals: gf,
  exp: ss,
  fromEuler: lf,
  fromMat3: hs,
  fromValues: ff,
  getAngle: rf,
  getAxisAngle: tf,
  identity: ef,
  invert: of,
  len: _f,
  length: ln,
  lerp: mf,
  ln: os,
  mul: pf,
  multiply: rs,
  normalize: vn,
  pow: af,
  random: sf,
  rotateX: is,
  rotateY: ns,
  rotateZ: as,
  rotationTo: xf,
  scale: ls,
  set: uf,
  setAxes: Ef,
  setAxisAngle: ts,
  slerp: Br,
  sqlerp: Mf,
  sqrLen: yf,
  squaredLength: cn,
  str: cf
}, Symbol.toStringTag, { value: "Module" }));
function bf() {
  var e = new U(8);
  return U != Float32Array && (e[0] = 0, e[1] = 0, e[2] = 0, e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0), e[3] = 1, e;
}
function Cf(e) {
  var t = new U(8);
  return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t;
}
function Sf(e, t, r, i, n, a, s, o) {
  var h = new U(8);
  return h[0] = e, h[1] = t, h[2] = r, h[3] = i, h[4] = n, h[5] = a, h[6] = s, h[7] = o, h;
}
function Pf(e, t, r, i, n, a, s) {
  var o = new U(8);
  o[0] = e, o[1] = t, o[2] = r, o[3] = i;
  var h = n * 0.5, l = a * 0.5, c = s * 0.5;
  return o[4] = h * i + l * r - c * t, o[5] = l * i + c * e - h * r, o[6] = c * i + h * t - l * e, o[7] = -h * e - l * t - c * r, o;
}
function cs(e, t, r) {
  var i = r[0] * 0.5, n = r[1] * 0.5, a = r[2] * 0.5, s = t[0], o = t[1], h = t[2], l = t[3];
  return e[0] = s, e[1] = o, e[2] = h, e[3] = l, e[4] = i * l + n * h - a * o, e[5] = n * l + a * s - i * h, e[6] = a * l + i * o - n * s, e[7] = -i * s - n * o - a * h, e;
}
function Lf(e, t) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = t[0] * 0.5, e[5] = t[1] * 0.5, e[6] = t[2] * 0.5, e[7] = 0, e;
}
function $f(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0, e;
}
function Rf(e, t) {
  var r = Gr();
  Sa(r, t);
  var i = new U(3);
  return ba(i, t), cs(e, r, i), e;
}
function vs(e, t) {
  return e[0] = t[0], e[1] = t[1], e[2] = t[2], e[3] = t[3], e[4] = t[4], e[5] = t[5], e[6] = t[6], e[7] = t[7], e;
}
function Af(e) {
  return e[0] = 0, e[1] = 0, e[2] = 0, e[3] = 1, e[4] = 0, e[5] = 0, e[6] = 0, e[7] = 0, e;
}
function zf(e, t, r, i, n, a, s, o, h) {
  return e[0] = t, e[1] = r, e[2] = i, e[3] = n, e[4] = a, e[5] = s, e[6] = o, e[7] = h, e;
}
var Of = on;
function If(e, t) {
  return e[0] = t[4], e[1] = t[5], e[2] = t[6], e[3] = t[7], e;
}
var Df = on;
function Hf(e, t) {
  return e[4] = t[0], e[5] = t[1], e[6] = t[2], e[7] = t[3], e;
}
function Ff(e, t) {
  var r = t[4], i = t[5], n = t[6], a = t[7], s = -t[0], o = -t[1], h = -t[2], l = t[3];
  return e[0] = (r * l + a * s + i * h - n * o) * 2, e[1] = (i * l + a * o + n * s - r * h) * 2, e[2] = (n * l + a * h + r * o - i * s) * 2, e;
}
function Nf(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = r[0] * 0.5, h = r[1] * 0.5, l = r[2] * 0.5, c = t[4], f = t[5], u = t[6], p = t[7];
  return e[0] = i, e[1] = n, e[2] = a, e[3] = s, e[4] = s * o + n * l - a * h + c, e[5] = s * h + a * o - i * l + f, e[6] = s * l + i * h - n * o + u, e[7] = -i * o - n * h - a * l + p, e;
}
function Vf(e, t, r) {
  var i = -t[0], n = -t[1], a = -t[2], s = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = o * s + c * i + h * a - l * n, u = h * s + c * n + l * i - o * a, p = l * s + c * a + o * n - h * i, _ = c * s - o * i - h * n - l * a;
  return is(e, t, r), i = e[0], n = e[1], a = e[2], s = e[3], e[4] = f * s + _ * i + u * a - p * n, e[5] = u * s + _ * n + p * i - f * a, e[6] = p * s + _ * a + f * n - u * i, e[7] = _ * s - f * i - u * n - p * a, e;
}
function kf(e, t, r) {
  var i = -t[0], n = -t[1], a = -t[2], s = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = o * s + c * i + h * a - l * n, u = h * s + c * n + l * i - o * a, p = l * s + c * a + o * n - h * i, _ = c * s - o * i - h * n - l * a;
  return ns(e, t, r), i = e[0], n = e[1], a = e[2], s = e[3], e[4] = f * s + _ * i + u * a - p * n, e[5] = u * s + _ * n + p * i - f * a, e[6] = p * s + _ * a + f * n - u * i, e[7] = _ * s - f * i - u * n - p * a, e;
}
function jf(e, t, r) {
  var i = -t[0], n = -t[1], a = -t[2], s = t[3], o = t[4], h = t[5], l = t[6], c = t[7], f = o * s + c * i + h * a - l * n, u = h * s + c * n + l * i - o * a, p = l * s + c * a + o * n - h * i, _ = c * s - o * i - h * n - l * a;
  return as(e, t, r), i = e[0], n = e[1], a = e[2], s = e[3], e[4] = f * s + _ * i + u * a - p * n, e[5] = u * s + _ * n + p * i - f * a, e[6] = p * s + _ * a + f * n - u * i, e[7] = _ * s - f * i - u * n - p * a, e;
}
function Wf(e, t, r) {
  var i = r[0], n = r[1], a = r[2], s = r[3], o = t[0], h = t[1], l = t[2], c = t[3];
  return e[0] = o * s + c * i + h * a - l * n, e[1] = h * s + c * n + l * i - o * a, e[2] = l * s + c * a + o * n - h * i, e[3] = c * s - o * i - h * n - l * a, o = t[4], h = t[5], l = t[6], c = t[7], e[4] = o * s + c * i + h * a - l * n, e[5] = h * s + c * n + l * i - o * a, e[6] = l * s + c * a + o * n - h * i, e[7] = c * s - o * i - h * n - l * a, e;
}
function Yf(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = r[0], h = r[1], l = r[2], c = r[3];
  return e[0] = i * c + s * o + n * l - a * h, e[1] = n * c + s * h + a * o - i * l, e[2] = a * c + s * l + i * h - n * o, e[3] = s * c - i * o - n * h - a * l, o = r[4], h = r[5], l = r[6], c = r[7], e[4] = i * c + s * o + n * l - a * h, e[5] = n * c + s * h + a * o - i * l, e[6] = a * c + s * l + i * h - n * o, e[7] = s * c - i * o - n * h - a * l, e;
}
function qf(e, t, r, i) {
  if (Math.abs(i) < A)
    return vs(e, t);
  var n = Math.hypot(r[0], r[1], r[2]);
  i = i * 0.5;
  var a = Math.sin(i), s = a * r[0] / n, o = a * r[1] / n, h = a * r[2] / n, l = Math.cos(i), c = t[0], f = t[1], u = t[2], p = t[3];
  e[0] = c * l + p * s + f * h - u * o, e[1] = f * l + p * o + u * s - c * h, e[2] = u * l + p * h + c * o - f * s, e[3] = p * l - c * s - f * o - u * h;
  var _ = t[4], w = t[5], y = t[6], M = t[7];
  return e[4] = _ * l + M * s + w * h - y * o, e[5] = w * l + M * o + y * s - _ * h, e[6] = y * l + M * h + _ * o - w * s, e[7] = M * l - _ * s - w * o - y * h, e;
}
function Xf(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e[2] = t[2] + r[2], e[3] = t[3] + r[3], e[4] = t[4] + r[4], e[5] = t[5] + r[5], e[6] = t[6] + r[6], e[7] = t[7] + r[7], e;
}
function fs(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3], o = r[4], h = r[5], l = r[6], c = r[7], f = t[4], u = t[5], p = t[6], _ = t[7], w = r[0], y = r[1], M = r[2], b = r[3];
  return e[0] = i * b + s * w + n * M - a * y, e[1] = n * b + s * y + a * w - i * M, e[2] = a * b + s * M + i * y - n * w, e[3] = s * b - i * w - n * y - a * M, e[4] = i * c + s * o + n * l - a * h + f * b + _ * w + u * M - p * y, e[5] = n * c + s * h + a * o - i * l + u * b + _ * y + p * w - f * M, e[6] = a * c + s * l + i * h - n * o + p * b + _ * M + f * y - u * w, e[7] = s * c - i * o - n * h - a * l + _ * b - f * w - u * y - p * M, e;
}
var Uf = fs;
function Bf(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e[2] = t[2] * r, e[3] = t[3] * r, e[4] = t[4] * r, e[5] = t[5] * r, e[6] = t[6] * r, e[7] = t[7] * r, e;
}
var us = hn;
function Gf(e, t, r, i) {
  var n = 1 - i;
  return us(t, r) < 0 && (i = -i), e[0] = t[0] * n + r[0] * i, e[1] = t[1] * n + r[1] * i, e[2] = t[2] * n + r[2] * i, e[3] = t[3] * n + r[3] * i, e[4] = t[4] * n + r[4] * i, e[5] = t[5] * n + r[5] * i, e[6] = t[6] * n + r[6] * i, e[7] = t[7] * n + r[7] * i, e;
}
function Zf(e, t) {
  var r = ri(t);
  return e[0] = -t[0] / r, e[1] = -t[1] / r, e[2] = -t[2] / r, e[3] = t[3] / r, e[4] = -t[4] / r, e[5] = -t[5] / r, e[6] = -t[6] / r, e[7] = t[7] / r, e;
}
function Kf(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e[2] = -t[2], e[3] = t[3], e[4] = -t[4], e[5] = -t[5], e[6] = -t[6], e[7] = t[7], e;
}
var ds = ln, Qf = ds, ri = cn, Jf = ri;
function eu(e, t) {
  var r = ri(t);
  if (r > 0) {
    r = Math.sqrt(r);
    var i = t[0] / r, n = t[1] / r, a = t[2] / r, s = t[3] / r, o = t[4], h = t[5], l = t[6], c = t[7], f = i * o + n * h + a * l + s * c;
    e[0] = i, e[1] = n, e[2] = a, e[3] = s, e[4] = (o - i * f) / r, e[5] = (h - n * f) / r, e[6] = (l - a * f) / r, e[7] = (c - s * f) / r;
  }
  return e;
}
function tu(e) {
  return "quat2(" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ")";
}
function ru(e, t) {
  return e[0] === t[0] && e[1] === t[1] && e[2] === t[2] && e[3] === t[3] && e[4] === t[4] && e[5] === t[5] && e[6] === t[6] && e[7] === t[7];
}
function iu(e, t) {
  var r = e[0], i = e[1], n = e[2], a = e[3], s = e[4], o = e[5], h = e[6], l = e[7], c = t[0], f = t[1], u = t[2], p = t[3], _ = t[4], w = t[5], y = t[6], M = t[7];
  return Math.abs(r - c) <= A * Math.max(1, Math.abs(r), Math.abs(c)) && Math.abs(i - f) <= A * Math.max(1, Math.abs(i), Math.abs(f)) && Math.abs(n - u) <= A * Math.max(1, Math.abs(n), Math.abs(u)) && Math.abs(a - p) <= A * Math.max(1, Math.abs(a), Math.abs(p)) && Math.abs(s - _) <= A * Math.max(1, Math.abs(s), Math.abs(_)) && Math.abs(o - w) <= A * Math.max(1, Math.abs(o), Math.abs(w)) && Math.abs(h - y) <= A * Math.max(1, Math.abs(h), Math.abs(y)) && Math.abs(l - M) <= A * Math.max(1, Math.abs(l), Math.abs(M));
}
const nu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: Xf,
  clone: Cf,
  conjugate: Kf,
  copy: vs,
  create: bf,
  dot: us,
  equals: iu,
  exactEquals: ru,
  fromMat4: Rf,
  fromRotation: $f,
  fromRotationTranslation: cs,
  fromRotationTranslationValues: Pf,
  fromTranslation: Lf,
  fromValues: Sf,
  getDual: If,
  getReal: Of,
  getTranslation: Ff,
  identity: Af,
  invert: Zf,
  len: Qf,
  length: ds,
  lerp: Gf,
  mul: Uf,
  multiply: fs,
  normalize: eu,
  rotateAroundAxis: qf,
  rotateByQuatAppend: Wf,
  rotateByQuatPrepend: Yf,
  rotateX: Vf,
  rotateY: kf,
  rotateZ: jf,
  scale: Bf,
  set: zf,
  setDual: Hf,
  setReal: Df,
  sqrLen: Jf,
  squaredLength: ri,
  str: tu,
  translate: Nf
}, Symbol.toStringTag, { value: "Module" }));
function ps() {
  var e = new U(2);
  return U != Float32Array && (e[0] = 0, e[1] = 0), e;
}
function au(e) {
  var t = new U(2);
  return t[0] = e[0], t[1] = e[1], t;
}
function su(e, t) {
  var r = new U(2);
  return r[0] = e, r[1] = t, r;
}
function ou(e, t) {
  return e[0] = t[0], e[1] = t[1], e;
}
function hu(e, t, r) {
  return e[0] = t, e[1] = r, e;
}
function lu(e, t, r) {
  return e[0] = t[0] + r[0], e[1] = t[1] + r[1], e;
}
function ms(e, t, r) {
  return e[0] = t[0] - r[0], e[1] = t[1] - r[1], e;
}
function _s(e, t, r) {
  return e[0] = t[0] * r[0], e[1] = t[1] * r[1], e;
}
function ys(e, t, r) {
  return e[0] = t[0] / r[0], e[1] = t[1] / r[1], e;
}
function cu(e, t) {
  return e[0] = Math.ceil(t[0]), e[1] = Math.ceil(t[1]), e;
}
function vu(e, t) {
  return e[0] = Math.floor(t[0]), e[1] = Math.floor(t[1]), e;
}
function fu(e, t, r) {
  return e[0] = Math.min(t[0], r[0]), e[1] = Math.min(t[1], r[1]), e;
}
function uu(e, t, r) {
  return e[0] = Math.max(t[0], r[0]), e[1] = Math.max(t[1], r[1]), e;
}
function du(e, t) {
  return e[0] = Math.round(t[0]), e[1] = Math.round(t[1]), e;
}
function pu(e, t, r) {
  return e[0] = t[0] * r, e[1] = t[1] * r, e;
}
function mu(e, t, r, i) {
  return e[0] = t[0] + r[0] * i, e[1] = t[1] + r[1] * i, e;
}
function gs(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1];
  return Math.hypot(r, i);
}
function ws(e, t) {
  var r = t[0] - e[0], i = t[1] - e[1];
  return r * r + i * i;
}
function xs(e) {
  var t = e[0], r = e[1];
  return Math.hypot(t, r);
}
function Ms(e) {
  var t = e[0], r = e[1];
  return t * t + r * r;
}
function _u(e, t) {
  return e[0] = -t[0], e[1] = -t[1], e;
}
function yu(e, t) {
  return e[0] = 1 / t[0], e[1] = 1 / t[1], e;
}
function gu(e, t) {
  var r = t[0], i = t[1], n = r * r + i * i;
  return n > 0 && (n = 1 / Math.sqrt(n)), e[0] = t[0] * n, e[1] = t[1] * n, e;
}
function wu(e, t) {
  return e[0] * t[0] + e[1] * t[1];
}
function xu(e, t, r) {
  var i = t[0] * r[1] - t[1] * r[0];
  return e[0] = e[1] = 0, e[2] = i, e;
}
function Mu(e, t, r, i) {
  var n = t[0], a = t[1];
  return e[0] = n + i * (r[0] - n), e[1] = a + i * (r[1] - a), e;
}
function Eu(e, t) {
  t = t || 1;
  var r = We() * 2 * Math.PI;
  return e[0] = Math.cos(r) * t, e[1] = Math.sin(r) * t, e;
}
function Tu(e, t, r) {
  var i = t[0], n = t[1];
  return e[0] = r[0] * i + r[2] * n, e[1] = r[1] * i + r[3] * n, e;
}
function bu(e, t, r) {
  var i = t[0], n = t[1];
  return e[0] = r[0] * i + r[2] * n + r[4], e[1] = r[1] * i + r[3] * n + r[5], e;
}
function Cu(e, t, r) {
  var i = t[0], n = t[1];
  return e[0] = r[0] * i + r[3] * n + r[6], e[1] = r[1] * i + r[4] * n + r[7], e;
}
function Su(e, t, r) {
  var i = t[0], n = t[1];
  return e[0] = r[0] * i + r[4] * n + r[12], e[1] = r[1] * i + r[5] * n + r[13], e;
}
function Pu(e, t, r, i) {
  var n = t[0] - r[0], a = t[1] - r[1], s = Math.sin(i), o = Math.cos(i);
  return e[0] = n * o - a * s + r[0], e[1] = n * s + a * o + r[1], e;
}
function Lu(e, t) {
  var r = e[0], i = e[1], n = t[0], a = t[1], s = Math.sqrt(r * r + i * i) * Math.sqrt(n * n + a * a), o = s && (r * n + i * a) / s;
  return Math.acos(Math.min(Math.max(o, -1), 1));
}
function $u(e) {
  return e[0] = 0, e[1] = 0, e;
}
function Ru(e) {
  return "vec2(" + e[0] + ", " + e[1] + ")";
}
function Au(e, t) {
  return e[0] === t[0] && e[1] === t[1];
}
function zu(e, t) {
  var r = e[0], i = e[1], n = t[0], a = t[1];
  return Math.abs(r - n) <= A * Math.max(1, Math.abs(r), Math.abs(n)) && Math.abs(i - a) <= A * Math.max(1, Math.abs(i), Math.abs(a));
}
var Ou = xs, Iu = ms, Du = _s, Hu = ys, Fu = gs, Nu = ws, Vu = Ms, ku = function() {
  var e = ps();
  return function(t, r, i, n, a, s) {
    var o, h;
    for (r || (r = 2), i || (i = 0), n ? h = Math.min(n * r + i, t.length) : h = t.length, o = i; o < h; o += r)
      e[0] = t[o], e[1] = t[o + 1], a(e, e, s), t[o] = e[0], t[o + 1] = e[1];
    return t;
  };
}();
const ju = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  add: lu,
  angle: Lu,
  ceil: cu,
  clone: au,
  copy: ou,
  create: ps,
  cross: xu,
  dist: Fu,
  distance: gs,
  div: Hu,
  divide: ys,
  dot: wu,
  equals: zu,
  exactEquals: Au,
  floor: vu,
  forEach: ku,
  fromValues: su,
  inverse: yu,
  len: Ou,
  length: xs,
  lerp: Mu,
  max: uu,
  min: fu,
  mul: Du,
  multiply: _s,
  negate: _u,
  normalize: gu,
  random: Eu,
  rotate: Pu,
  round: du,
  scale: pu,
  scaleAndAdd: mu,
  set: hu,
  sqrDist: Nu,
  sqrLen: Vu,
  squaredDistance: ws,
  squaredLength: Ms,
  str: Ru,
  sub: Iu,
  subtract: ms,
  transformMat2: Tu,
  transformMat2d: bu,
  transformMat3: Cu,
  transformMat4: Su,
  zero: $u
}, Symbol.toStringTag, { value: "Module" })), Wu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  glMatrix: Dh,
  mat2: ol,
  mat2d: Rl,
  mat3: oc,
  mat4: Bc,
  quat: Tf,
  quat2: nu,
  vec2: ju,
  vec3: $v,
  vec4: Jv
}, Symbol.toStringTag, { value: "Module" })), Ee = /* @__PURE__ */ Lo(Wu);
function Yu(e, t, r) {
  return Math.min(Math.max(e, t), r);
}
var Kt = Yu, qu = 256, bn = 256, Yr = Kt, Xu = Ee.vec4, Zr = Ee.vec3, Bt = Ee.mat4;
function Cn(e, t, r) {
  var i = e.createShader(t);
  if (e.shaderSource(i, r), e.compileShader(i), !e.getShaderParameter(i, e.COMPILE_STATUS))
    throw e.getShaderInfoLog(i);
  return i;
}
function Uu(e, t, r, i, n) {
  var a = Cn(e, e.VERTEX_SHADER, t), s = Cn(e, e.FRAGMENT_SHADER, r), o = e.createProgram();
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
function Bu(e, t) {
  for (var r = e.getAttachedShaders(t), i = 0; i < r.length; i++) {
    var n = r[i];
    e.detachShader(t, n), e.deleteShader(n);
  }
  e.deleteProgram(t);
}
function $i(e, t, r, i) {
  var n = e.createBuffer();
  return e.bindBuffer(t, n), e.bufferData(t, i, r), n;
}
function Gu(e, t, r, i) {
  return {
    vertexIndices: $i(e, e.ELEMENT_ARRAY_BUFFER, e.STATIC_DRAW, new Uint16Array(t)),
    vertexPositions: $i(e, e.ARRAY_BUFFER, e.STATIC_DRAW, new Float32Array(r)),
    textureCoords: $i(e, e.ARRAY_BUFFER, e.STATIC_DRAW, new Float32Array(i))
  };
}
function Zu(e, t) {
  e.deleteBuffer(t.vertexIndices), e.deleteBuffer(t.vertexPositions), e.deleteBuffer(t.textureCoords);
}
function Ku(e, t) {
  for (var r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), i = 0; i < r; i++)
    e.enableVertexAttribArray(i);
}
function Qu(e, t) {
  for (var r = e.getProgramParameter(t, e.ACTIVE_ATTRIBUTES), i = 0; i < r; i++)
    e.disableVertexAttribArray(i);
}
function Ju(e, t, r) {
  e.activeTexture(e.TEXTURE0), e.bindTexture(e.TEXTURE_2D, r._texture), e.uniform1i(t.uSampler, 0);
}
function ed(e, t, r, i) {
  var n = ((r + 1) * bn - i) / (bn * qu);
  e.uniform1f(t.uDepth, n);
}
var td = 1, rd = Xu.create(), Es = Bt.create();
Bt.identity(Es);
function id(e, t, r) {
  var i = td;
  t && t.opacity != null && (i = t.opacity), e.uniform1f(r.opacity, i);
  var n = rd;
  t && t.colorOffset && (n = t.colorOffset), e.uniform4fv(r.colorOffset, n);
  var a = Es;
  t && t.colorMatrix && (a = t.colorMatrix), e.uniformMatrix4fv(r.colorMatrix, !1, a);
}
var Sn = Zr.create(), Pn = Zr.create();
function nd(e, t, r, i) {
  if (r.x === 0 && r.width === 1 && r.y === 0 && r.height === 1) {
    e.viewport(0, 0, e.drawingBufferWidth, e.drawingBufferHeight), Bt.identity(i);
    return;
  }
  var n = r.x, a = Yr(n, 0, 1), s = a - n, o = 1 - a, h = Yr(r.width - s, 0, o), l = r.width - h, c = 1 - r.height - r.y, f = Yr(c, 0, 1), u = f - c, p = 1 - f, _ = Yr(r.height - u, 0, p), w = r.height - _;
  Zr.set(
    Pn,
    r.width / h,
    r.height / _,
    1
  ), Zr.set(
    Sn,
    (l - s) / h,
    (w - u) / _,
    0
  ), Bt.identity(i), Bt.translate(i, i, Sn), Bt.scale(i, i, Pn), e.viewport(
    e.drawingBufferWidth * a,
    e.drawingBufferHeight * f,
    e.drawingBufferWidth * h,
    e.drawingBufferHeight * _
  );
}
var Ts = {
  createShaderProgram: Uu,
  destroyShaderProgram: Bu,
  createConstantBuffers: Gu,
  destroyConstantBuffers: Zu,
  enableAttributes: Ku,
  disableAttributes: Qu,
  setTexture: Ju,
  setDepth: ed,
  setViewport: nd,
  setupPixelEffectUniforms: id
}, ad = [
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
`), sd = [
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
`), Rt = Ee.mat4, Ln = Ee.vec3, od = he, Ze = Ts, hd = Ze.createConstantBuffers, ld = Ze.destroyConstantBuffers, cd = Ze.createShaderProgram, vd = Ze.destroyShaderProgram, fd = Ze.enableAttributes, ud = Ze.disableAttributes, dd = Ze.setViewport, pd = Ze.setupPixelEffectUniforms, md = Ze.setDepth, _d = Ze.setTexture, yd = ad, gd = sd, bs = [0, 1, 2, 0, 2, 3], wd = [-0.5, -0.5, 0, 0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0], xd = [0, 0, 1, 0, 1, 1, 0, 1], Md = ["aVertexPosition", "aTextureCoord"], Ed = [
  "uDepth",
  "uOpacity",
  "uSampler",
  "uProjMatrix",
  "uViewportMatrix",
  "uColorOffset",
  "uColorMatrix"
];
function wr(e) {
  this.gl = e, this.projMatrix = Rt.create(), this.viewportMatrix = Rt.create(), this.translateVector = Ln.create(), this.scaleVector = Ln.create(), this.constantBuffers = hd(e, bs, wd, xd), this.shaderProgram = cd(e, yd, gd, Md, Ed);
}
wr.prototype.destroy = function() {
  ld(this.gl, this.constantBuffers), vd(this.gl, this.shaderProgram), od(this);
};
wr.prototype.startLayer = function(e, t) {
  var r = this.gl, i = this.shaderProgram, n = this.constantBuffers, a = this.viewportMatrix;
  r.useProgram(i), fd(r, i), dd(r, e, t, a), r.uniformMatrix4fv(i.uViewportMatrix, !1, a), r.bindBuffer(r.ARRAY_BUFFER, n.vertexPositions), r.vertexAttribPointer(i.aVertexPosition, 3, r.FLOAT, r.FALSE, 0, 0), r.bindBuffer(r.ARRAY_BUFFER, n.textureCoords), r.vertexAttribPointer(i.aTextureCoord, 2, r.FLOAT, r.FALSE, 0, 0), pd(r, e.effects(), {
    opacity: i.uOpacity,
    colorOffset: i.uColorOffset,
    colorMatrix: i.uColorMatrix
  });
};
wr.prototype.endLayer = function(e, t) {
  var r = this.gl, i = this.shaderProgram;
  ud(r, i);
};
wr.prototype.renderTile = function(e, t, r, i) {
  var n = this.gl, a = this.shaderProgram, s = this.constantBuffers, o = this.projMatrix, h = this.translateVector, l = this.scaleVector;
  h[0] = e.centerX(), h[1] = e.centerY(), h[2] = -0.5, l[0] = e.scaleX(), l[1] = e.scaleY(), l[2] = 1, Rt.copy(o, r.view().projection()), Rt.rotateX(o, o, e.rotX()), Rt.rotateY(o, o, e.rotY()), Rt.translate(o, o, h), Rt.scale(o, o, l), n.uniformMatrix4fv(a.uProjMatrix, !1, o), md(n, a, i, e.z), _d(n, a, t), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, s.vertexIndices), n.drawElements(n.TRIANGLES, bs.length, n.UNSIGNED_SHORT, 0);
};
var Cs = wr, Td = Cs, bd = Ge;
function Ss() {
  this.constructor.super_.apply(this, arguments);
}
bd(Ss, Td);
var Ps = Ss, Cd = Cs, Sd = Ge;
function Ls() {
  this.constructor.super_.apply(this, arguments);
}
Sd(Ls, Cd);
var $s = Ls, Pd = [
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
`), Ld = [
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
`), Kr = Ee.mat4, $d = he, Ke = Ts, Rd = Ke.createConstantBuffers, Ad = Ke.destroyConstantBuffers, zd = Ke.createShaderProgram, Od = Ke.destroyShaderProgram, Id = Ke.enableAttributes, Dd = Ke.disableAttributes, Hd = Ke.setViewport, Fd = Ke.setupPixelEffectUniforms, Nd = Ke.setDepth, Vd = Ke.setTexture, kd = Pd, jd = Ld, Rs = [0, 1, 2, 0, 2, 3], Wd = [-1, -1, 0, 1, -1, 0, 1, 1, 0, -1, 1, 0], Yd = [0, 0, 1, 0, 1, 1, 0, 1], qd = ["aVertexPosition"], Xd = [
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
function xr(e) {
  this.gl = e, this.invProjMatrix = Kr.create(), this.viewportMatrix = Kr.create(), this.constantBuffers = Rd(e, Rs, Wd, Yd), this.shaderProgram = zd(e, kd, jd, qd, Xd);
}
xr.prototype.destroy = function() {
  Ad(this.gl, this.constantBuffers), Od(this.gl, this.shaderProgram), $d(this);
};
xr.prototype.startLayer = function(e, t) {
  var r = this.gl, i = this.shaderProgram, n = this.constantBuffers, a = this.invProjMatrix, s = this.viewportMatrix;
  r.useProgram(i), Id(r, i), Hd(r, e, t, s), r.uniformMatrix4fv(i.uViewportMatrix, !1, s), r.bindBuffer(r.ARRAY_BUFFER, n.vertexPositions), r.vertexAttribPointer(i.aVertexPosition, 3, r.FLOAT, r.FALSE, 0, 0), r.bindBuffer(r.ARRAY_BUFFER, n.textureCoords), Kr.copy(a, e.view().projection()), Kr.invert(a, a), r.uniformMatrix4fv(i.uInvProjMatrix, !1, a);
  var o = e.effects().textureCrop || {}, h = o.x != null ? o.x : 0, l = o.y != null ? o.y : 0, c = o.width != null ? o.width : 1, f = o.height != null ? o.height : 1;
  r.uniform1f(i.uTextureX, h), r.uniform1f(i.uTextureY, l), r.uniform1f(i.uTextureWidth, c), r.uniform1f(i.uTextureHeight, f), Fd(r, e.effects(), {
    opacity: i.uOpacity,
    colorOffset: i.uColorOffset,
    colorMatrix: i.uColorMatrix
  });
};
xr.prototype.endLayer = function(e, t) {
  var r = this.gl, i = this.shaderProgram;
  Dd(r, i);
};
xr.prototype.renderTile = function(e, t, r, i) {
  var n = this.gl, a = this.shaderProgram, s = this.constantBuffers;
  Nd(n, a, i, e.z), Vd(n, a, t), n.bindBuffer(n.ELEMENT_ARRAY_BUFFER, s.vertexIndices), n.drawElements(n.TRIANGLES, Rs.length, n.UNSIGNED_SHORT, 0);
};
var As = xr, Ud = Ps, Bd = $s, Gd = As;
function Zd(e) {
  switch (e.type) {
    case "webgl":
      e.registerRenderer("flat", "flat", Bd), e.registerRenderer("cube", "rectilinear", Ud), e.registerRenderer("equirect", "rectilinear", Gd);
      break;
    default:
      throw new Error("Unknown stage type: " + e.type);
  }
}
var zs = Zd;
function Kd() {
  for (var e = 0, t = 0; t < arguments.length; t++) {
    var r = arguments[t];
    e += r, e += r << 10, e ^= r >> 6;
  }
  return e += e << 3, e ^= e >> 11, e += e << 15, e >= 0 ? e : -e;
}
var ii = Kd;
function Qd(e, t) {
  return (+e % (t = +t) + t) % t;
}
var _t = Qd, fn = _t, Jd = 64;
function It(e) {
  if (e != null && (!isFinite(e) || Math.floor(e) !== e || e < 1))
    throw new Error("Set: invalid capacity");
  this._capacity = this._capacity || Jd, this._buckets = [];
  for (var t = 0; t < this._capacity; t++)
    this._buckets.push([]);
  this._size = 0;
}
It.prototype.add = function(e) {
  for (var t = fn(e.hash(), this._capacity), r = this._buckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n))
      return r[i] = e, n;
  }
  return r.push(e), this._size++, null;
};
It.prototype.remove = function(e) {
  for (var t = fn(e.hash(), this._capacity), r = this._buckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n)) {
      for (var a = i; a < r.length - 1; a++)
        r[a] = r[a + 1];
      return r.length = r.length - 1, this._size--, n;
    }
  }
  return null;
};
It.prototype.has = function(e) {
  for (var t = fn(e.hash(), this._capacity), r = this._buckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n))
      return !0;
  }
  return !1;
};
It.prototype.size = function() {
  return this._size;
};
It.prototype.clear = function() {
  for (var e = 0; e < this._capacity; e++)
    this._buckets[e].length = 0;
  this._size = 0;
};
It.prototype.forEach = function(e) {
  for (var t = 0, r = 0; r < this._capacity; r++)
    for (var i = this._buckets[r], n = 0; n < i.length; n++)
      e(i[n]), t += 1;
  return t;
};
var Os = It, ep = Os;
function un() {
  this._stack = [], this._visited = new ep(), this._vertices = null;
}
un.prototype.search = function(e, t, r) {
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
un.prototype._clear = function() {
  this._stack.length = 0, this._visited.clear();
};
var Is = un, tp = _t;
function at(e) {
  if (!isFinite(e) || Math.floor(e) !== e || e < 0)
    throw new Error("LruMap: invalid capacity");
  this._capacity = e, this._keys = new Array(this._capacity), this._values = new Array(this._capacity), this._start = 0, this._size = 0;
}
at.prototype._index = function(e) {
  return tp(this._start + e, this._capacity);
};
at.prototype.get = function(e) {
  for (var t = 0; t < this._size; t++) {
    var r = this._keys[this._index(t)];
    if (e.equals(r))
      return this._values[this._index(t)];
  }
  return null;
};
at.prototype.set = function(e, t) {
  if (this._capacity === 0)
    return e;
  this.del(e);
  var r = this._size === this._capacity ? this._keys[this._index(0)] : null;
  return this._keys[this._index(this._size)] = e, this._values[this._index(this._size)] = t, this._size < this._capacity ? this._size++ : this._start = this._index(1), r;
};
at.prototype.del = function(e) {
  for (var t = 0; t < this._size; t++)
    if (e.equals(this._keys[this._index(t)])) {
      for (var r = this._values[this._index(t)], i = t; i < this._size - 1; i++)
        this._keys[this._index(i)] = this._keys[this._index(i + 1)], this._values[this._index(i)] = this._values[this._index(i + 1)];
      return this._size--, r;
    }
  return null;
};
at.prototype.has = function(e) {
  for (var t = 0; t < this._size; t++)
    if (e.equals(this._keys[this._index(t)]))
      return !0;
  return !1;
};
at.prototype.size = function() {
  return this._size;
};
at.prototype.clear = function() {
  this._keys.length = 0, this._values.length = 0, this._start = 0, this._size = 0;
};
at.prototype.forEach = function(e) {
  for (var t = 0, r = 0; r < this._size; r++)
    e(this._keys[this._index(r)], this._values[this._index(r)]), t += 1;
  return t;
};
var Ds = at;
function ni(e) {
  this._fallbackOnly = !!e.fallbackOnly;
}
ni.prototype.numHorizontalTiles = function() {
  return Math.ceil(this.width() / this.tileWidth());
};
ni.prototype.numVerticalTiles = function() {
  return Math.ceil(this.height() / this.tileHeight());
};
ni.prototype.fallbackOnly = function() {
  return this._fallbackOnly;
};
var dn = ni;
function rp(e, t) {
  return e < t ? -1 : e > t ? 1 : 0;
}
var Mr = rp, ip = Mr;
function np(e, t) {
  for (var r = [], i = 0; i < e.length; i++)
    r.push(new t(e[i]));
  return r.sort(function(n, a) {
    return ip(n.width(), a.width());
  }), r;
}
function ap(e) {
  for (var t = [], r = 0; r < e.length; r++)
    e[r]._fallbackOnly || t.push(e[r]);
  if (!t.length)
    throw new Error("No selectable levels in list");
  return t;
}
var Er = {
  makeLevelList: np,
  makeSelectableLevelList: ap
};
function sp(e) {
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
var Tr = sp, op = Ge, hp = ii, lp = Is, cp = Ds, vp = dn, fp = Er.makeLevelList, up = Er.makeSelectableLevelList, Qr = Kt, qr = Mr, dp = Tr, Le = Ee.vec3, qi = Ee.vec4, pp = 64, At = "fudlrb", zt = {
  f: { x: 0, y: 0 },
  b: { x: 0, y: Math.PI },
  l: { x: 0, y: Math.PI / 2 },
  r: { x: 0, y: -Math.PI / 2 },
  u: { x: Math.PI / 2, y: 0 },
  d: { x: -Math.PI / 2, y: 0 }
}, Ri = Le.create();
function mr(e, t, r, i) {
  t && Le.rotateZ(e, e, Ri, t), r && Le.rotateX(e, e, Ri, r), i && Le.rotateY(e, e, Ri, i);
}
var Xi = {};
for (var Ai = 0; Ai < At.length; Ai++) {
  var $n = At[Ai], Rn = zt[$n], An = Le.fromValues(0, 0, -1);
  mr(An, 0, Rn.x, Rn.y), Xi[$n] = An;
}
var Xr = {
  f: ["l", "r", "u", "d"],
  b: ["r", "l", "u", "d"],
  l: ["b", "f", "u", "d"],
  r: ["f", "b", "u", "d"],
  u: ["l", "r", "b", "f"],
  d: ["l", "r", "f", "b"]
}, zi = [
  [0, 1],
  // top
  [1, 0],
  // right
  [0, -1],
  // bottom
  [-1, 0]
  // left
];
function fe(e, t, r, i, n) {
  this.face = e, this.x = t, this.y = r, this.z = i, this._geometry = n, this._level = n.levelList[i];
}
fe.prototype.rotX = function() {
  return zt[this.face].x;
};
fe.prototype.rotY = function() {
  return zt[this.face].y;
};
fe.prototype.centerX = function() {
  return (this.x + 0.5) / this._level.numHorizontalTiles() - 0.5;
};
fe.prototype.centerY = function() {
  return 0.5 - (this.y + 0.5) / this._level.numVerticalTiles();
};
fe.prototype.scaleX = function() {
  return 1 / this._level.numHorizontalTiles();
};
fe.prototype.scaleY = function() {
  return 1 / this._level.numVerticalTiles();
};
fe.prototype.vertices = function(e) {
  e || (e = [Le.create(), Le.create(), Le.create(), Le.create()]);
  var t = zt[this.face];
  function r(o, h, l) {
    Le.set(o, h, l, -0.5), mr(o, 0, t.x, t.y);
  }
  var i = this.centerX() - this.scaleX() / 2, n = this.centerX() + this.scaleX() / 2, a = this.centerY() - this.scaleY() / 2, s = this.centerY() + this.scaleY() / 2;
  return r(e[0], i, s), r(e[1], n, s), r(e[2], n, a), r(e[3], i, a), e;
};
fe.prototype.parent = function() {
  if (this.z === 0)
    return null;
  var e = this.face, t = this.z, r = this.x, i = this.y, n = this._geometry, a = n.levelList[t], s = n.levelList[t - 1], o = Math.floor(r / a.numHorizontalTiles() * s.numHorizontalTiles()), h = Math.floor(i / a.numVerticalTiles() * s.numVerticalTiles()), l = t - 1;
  return new fe(e, o, h, l, n);
};
fe.prototype.children = function(e) {
  if (this.z === this._geometry.levelList.length - 1)
    return null;
  var t = this.face, r = this.z, i = this.x, n = this.y, a = this._geometry, s = a.levelList[r], o = a.levelList[r + 1], h = o.numHorizontalTiles() / s.numHorizontalTiles(), l = o.numVerticalTiles() / s.numVerticalTiles();
  e = e || [];
  for (var c = 0; c < h; c++)
    for (var f = 0; f < l; f++) {
      var u = h * i + c, p = l * n + f, _ = r + 1;
      e.push(new fe(t, u, p, _, a));
    }
  return e;
};
fe.prototype.neighbors = function() {
  var e = this._geometry, t = e._neighborsCache, r = t.get(this);
  if (r)
    return r;
  for (var i = e._vec, n = this.face, a = this.x, s = this.y, o = this.z, h = this._level, l = h.numHorizontalTiles(), c = h.numVerticalTiles(), f = [], u = 0; u < zi.length; u++) {
    var p = zi[u][0], _ = zi[u][1], w = a + p, y = s + _, M = o, b = n;
    if (w < 0 || w >= l || y < 0 || y >= c) {
      var L = this.centerX(), $ = this.centerY();
      w < 0 ? (Le.set(i, -0.5, $, -0.5), b = Xr[n][0]) : w >= l ? (Le.set(i, 0.5, $, -0.5), b = Xr[n][1]) : y < 0 ? (Le.set(i, L, 0.5, -0.5), b = Xr[n][2]) : y >= c && (Le.set(i, L, -0.5, -0.5), b = Xr[n][3]);
      var R;
      R = zt[n], mr(i, 0, R.x, R.y), R = zt[b], mr(i, 0, -R.x, -R.y), w = Qr(Math.floor((0.5 + i[0]) * l), 0, l - 1), y = Qr(Math.floor((0.5 - i[1]) * c), 0, c - 1);
    }
    f.push(new fe(b, w, y, M, e));
  }
  return t.set(this, f), f;
};
fe.prototype.hash = function() {
  return hp(At.indexOf(this.face), this.z, this.y, this.x);
};
fe.prototype.equals = function(e) {
  return this._geometry === e._geometry && this.face === e.face && this.z === e.z && this.y === e.y && this.x === e.x;
};
fe.prototype.cmp = function(e) {
  return qr(this.z, e.z) || qr(At.indexOf(this.face), At.indexOf(e.face)) || qr(this.y, e.y) || qr(this.x, e.x);
};
fe.prototype.str = function() {
  return "CubeTile(" + tile.face + ", " + tile.x + ", " + tile.y + ", " + tile.z + ")";
};
function Dt(e) {
  if (this.constructor.super_.call(this, e), this._size = e.size, this._tileSize = e.tileSize, this._size % this._tileSize !== 0)
    throw new Error("Level size is not multiple of tile size: " + this._size + " " + this._tileSize);
}
op(Dt, vp);
Dt.prototype.width = function() {
  return this._size;
};
Dt.prototype.height = function() {
  return this._size;
};
Dt.prototype.tileWidth = function() {
  return this._tileSize;
};
Dt.prototype.tileHeight = function() {
  return this._tileSize;
};
Dt.prototype._validateWithParentLevel = function(e) {
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
function tt(e) {
  if (dp(e) !== "array")
    throw new Error("Level list must be an array");
  this.levelList = fp(e, Dt), this.selectableLevelList = up(this.levelList);
  for (var t = 1; t < this.levelList.length; t++)
    this.levelList[t]._validateWithParentLevel(this.levelList[t - 1]);
  this._tileSearcher = new lp(), this._neighborsCache = new cp(pp), this._vec = qi.create(), this._viewSize = {};
}
tt.prototype.maxTileSize = function() {
  for (var e = 0, t = 0; t < this.levelList.length; t++) {
    var r = this.levelList[t];
    e = Math.max(e, r.tileWidth, r.tileHeight);
  }
  return e;
};
tt.prototype.levelTiles = function(e, t) {
  var r = this.levelList.indexOf(e), i = e.numHorizontalTiles() - 1, n = e.numVerticalTiles() - 1;
  t = t || [];
  for (var a = 0; a < At.length; a++)
    for (var s = At[a], o = 0; o <= i; o++)
      for (var h = 0; h <= n; h++)
        t.push(new fe(s, o, h, r, this));
  return t;
};
tt.prototype._closestTile = function(e, t) {
  var r = this._vec;
  qi.set(r, 0, 0, 1, 1), qi.transformMat4(r, r, e.inverseProjection());
  var i = 1 / 0, n = null;
  for (var a in Xi) {
    var s = Xi[a], o = 1 - Le.dot(s, r);
    o < i && (i = o, n = a);
  }
  for (var h = Math.max(Math.abs(r[0]), Math.abs(r[1]), Math.abs(r[2])) / 0.5, l = 0; l < 3; l++)
    r[l] = r[l] / h;
  var c = zt[n];
  mr(r, 0, -c.x, -c.y);
  var f = this.levelList.indexOf(t), u = t.numHorizontalTiles(), p = t.numVerticalTiles(), _ = Qr(Math.floor((0.5 + r[0]) * u), 0, u - 1), w = Qr(Math.floor((0.5 - r[1]) * p), 0, p - 1);
  return new fe(n, _, w, f, this);
};
tt.prototype.visibleTiles = function(e, t, r) {
  var i = this._viewSize, n = this._tileSearcher;
  if (r = r || [], e.size(i), i.width === 0 || i.height === 0)
    return r;
  var a = this._closestTile(e, t), s = n.search(e, a, r);
  if (!s)
    throw new Error("Starting tile is not visible");
  return r;
};
tt.Tile = tt.prototype.Tile = fe;
tt.type = tt.prototype.type = "cube";
fe.type = fe.prototype.type = "cube";
var mp = tt, _p = Ge, yp = ii, gp = Is, wp = Ds, xp = dn, Mp = Er.makeLevelList, Ep = Er.makeSelectableLevelList, zn = Kt, Hs = _t, Oi = Mr, Tp = Tr, vt = Ee.vec2, Ui = Ee.vec4, bp = 64, Ii = [
  [0, 1],
  // top
  [1, 0],
  // right
  [0, -1],
  // bottom
  [-1, 0]
  // left
];
function ie(e, t, r, i) {
  this.x = e, this.y = t, this.z = r, this._geometry = i, this._level = i.levelList[r];
}
ie.prototype.rotX = function() {
  return 0;
};
ie.prototype.rotY = function() {
  return 0;
};
ie.prototype.centerX = function() {
  var e = this._level.width(), t = this._level.tileWidth();
  return (this.x * t + 0.5 * this.width()) / e - 0.5;
};
ie.prototype.centerY = function() {
  var e = this._level.height(), t = this._level.tileHeight();
  return 0.5 - (this.y * t + 0.5 * this.height()) / e;
};
ie.prototype.scaleX = function() {
  var e = this._level.width();
  return this.width() / e;
};
ie.prototype.scaleY = function() {
  var e = this._level.height();
  return this.height() / e;
};
ie.prototype.width = function() {
  var e = this._level.width(), t = this._level.tileWidth();
  if (this.x === this._level.numHorizontalTiles() - 1) {
    var r = Hs(e, t);
    return r || t;
  } else
    return t;
};
ie.prototype.height = function() {
  var e = this._level.height(), t = this._level.tileHeight();
  if (this.y === this._level.numVerticalTiles() - 1) {
    var r = Hs(e, t);
    return r || t;
  } else
    return t;
};
ie.prototype.levelWidth = function() {
  return this._level.width();
};
ie.prototype.levelHeight = function() {
  return this._level.height();
};
ie.prototype.vertices = function(e) {
  e || (e = [vt.create(), vt.create(), vt.create(), vt.create()]);
  var t = this.centerX() - this.scaleX() / 2, r = this.centerX() + this.scaleX() / 2, i = this.centerY() - this.scaleY() / 2, n = this.centerY() + this.scaleY() / 2;
  return vt.set(e[0], t, n), vt.set(e[1], r, n), vt.set(e[2], r, i), vt.set(e[3], t, i), e;
};
ie.prototype.parent = function() {
  if (this.z === 0)
    return null;
  var e = this._geometry, t = this.z - 1, r = Math.floor(this.x / 2), i = Math.floor(this.y / 2);
  return new ie(r, i, t, e);
};
ie.prototype.children = function(e) {
  if (this.z === this._geometry.levelList.length - 1)
    return null;
  var t = this._geometry, r = this.z + 1;
  return e = e || [], e.push(new ie(2 * this.x, 2 * this.y, r, t)), e.push(new ie(2 * this.x, 2 * this.y + 1, r, t)), e.push(new ie(2 * this.x + 1, 2 * this.y, r, t)), e.push(new ie(2 * this.x + 1, 2 * this.y + 1, r, t)), e;
};
ie.prototype.neighbors = function() {
  var e = this._geometry, t = e._neighborsCache, r = t.get(this);
  if (r)
    return r;
  for (var i = this.x, n = this.y, a = this.z, s = this._level, o = s.numHorizontalTiles() - 1, h = s.numVerticalTiles() - 1, l = [], c = 0; c < Ii.length; c++) {
    var f = Ii[c][0], u = Ii[c][1], p = i + f, _ = n + u, w = a;
    0 <= p && p <= o && 0 <= _ && _ <= h && l.push(new ie(p, _, w, e));
  }
  return t.set(this, l), l;
};
ie.prototype.hash = function() {
  return yp(this.z, this.y, this.x);
};
ie.prototype.equals = function(e) {
  return this._geometry === e._geometry && this.z === e.z && this.y === e.y && this.x === e.x;
};
ie.prototype.cmp = function(e) {
  return Oi(this.z, e.z) || Oi(this.y, e.y) || Oi(this.x, e.x);
};
ie.prototype.str = function() {
  return "FlatTile(" + tile.x + ", " + tile.y + ", " + tile.z + ")";
};
function Ht(e) {
  this.constructor.super_.call(this, e), this._width = e.width, this._height = e.height, this._tileWidth = e.tileWidth, this._tileHeight = e.tileHeight;
}
_p(Ht, xp);
Ht.prototype.width = function() {
  return this._width;
};
Ht.prototype.height = function() {
  return this._height;
};
Ht.prototype.tileWidth = function() {
  return this._tileWidth;
};
Ht.prototype.tileHeight = function() {
  return this._tileHeight;
};
Ht.prototype._validateWithParentLevel = function(e) {
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
function rt(e) {
  if (Tp(e) !== "array")
    throw new Error("Level list must be an array");
  this.levelList = Mp(e, Ht), this.selectableLevelList = Ep(this.levelList);
  for (var t = 1; t < this.levelList.length; t++)
    this.levelList[t]._validateWithParentLevel(this.levelList[t - 1]);
  this._tileSearcher = new gp(), this._neighborsCache = new wp(bp), this._vec = Ui.create(), this._viewSize = {};
}
rt.prototype.maxTileSize = function() {
  for (var e = 0, t = 0; t < this.levelList.length; t++) {
    var r = this.levelList[t];
    e = Math.max(e, r.tileWidth, r.tileHeight);
  }
  return e;
};
rt.prototype.levelTiles = function(e, t) {
  var r = this.levelList.indexOf(e), i = e.numHorizontalTiles() - 1, n = e.numVerticalTiles() - 1;
  t || (t = []);
  for (var a = 0; a <= i; a++)
    for (var s = 0; s <= n; s++)
      t.push(new ie(a, s, r, this));
  return t;
};
rt.prototype._closestTile = function(e, t) {
  var r = this._vec;
  Ui.set(r, 0, 0, 1, 1), Ui.transformMat4(r, r, e.inverseProjection());
  var i = 0.5 + r[0], n = 0.5 - r[1], a = this.levelList.indexOf(t), s = t.width(), o = t.height(), h = t.tileWidth(), l = t.tileHeight(), c = t.numHorizontalTiles(), f = t.numVerticalTiles(), u = zn(Math.floor(i * s / h), 0, c - 1), p = zn(Math.floor(n * o / l), 0, f - 1);
  return new ie(u, p, a, this);
};
rt.prototype.visibleTiles = function(e, t, r) {
  var i = this._viewSize, n = this._tileSearcher;
  if (r = r || [], e.size(i), i.width === 0 || i.height === 0)
    return r;
  var a = this._closestTile(e, t), s = n.search(e, a, r);
  if (!s)
    throw new Error("Starting tile is not visible");
  return r;
};
rt.Tile = rt.prototype.Tile = ie;
rt.type = rt.prototype.type = "flat";
ie.type = ie.prototype.type = "flat";
var Cp = rt, Sp = Ge, Pp = ii, Lp = Mr, On = Er, $p = dn, Rp = Tr;
function de(e, t) {
  this.z = e, this._geometry = t, this._level = t.levelList[e];
}
de.prototype.rotX = function() {
  return 0;
};
de.prototype.rotY = function() {
  return 0;
};
de.prototype.centerX = function() {
  return 0.5;
};
de.prototype.centerY = function() {
  return 0.5;
};
de.prototype.scaleX = function() {
  return 1;
};
de.prototype.scaleY = function() {
  return 1;
};
de.prototype.parent = function() {
  return this.z === 0 ? null : new de(this.z - 1, this._geometry);
};
de.prototype.children = function(e) {
  return this.z === this._geometry.levelList.length - 1 ? null : (e = e || [], e.push(new de(this.z + 1, this._geometry)), e);
};
de.prototype.neighbors = function() {
  return [];
};
de.prototype.hash = function() {
  return Pp(this.z);
};
de.prototype.equals = function(e) {
  return this._geometry === e._geometry && this.z === e.z;
};
de.prototype.cmp = function(e) {
  return Lp(this.z, e.z);
};
de.prototype.str = function() {
  return "EquirectTile(" + tile.z + ")";
};
function Qt(e) {
  this.constructor.super_.call(this, e), this._width = e.width;
}
Sp(Qt, $p);
Qt.prototype.width = function() {
  return this._width;
};
Qt.prototype.height = function() {
  return this._width / 2;
};
Qt.prototype.tileWidth = function() {
  return this._width;
};
Qt.prototype.tileHeight = function() {
  return this._width / 2;
};
function pt(e) {
  if (Rp(e) !== "array")
    throw new Error("Level list must be an array");
  this.levelList = On.makeLevelList(e, Qt), this.selectableLevelList = On.makeSelectableLevelList(this.levelList);
}
pt.prototype.maxTileSize = function() {
  for (var e = 0, t = 0; t < this.levelList.length; t++) {
    var r = this.levelList[t];
    e = Math.max(e, r.tileWidth, r.tileHeight);
  }
  return e;
};
pt.prototype.levelTiles = function(e, t) {
  var r = this.levelList.indexOf(e);
  return t = t || [], t.push(new de(r, this)), t;
};
pt.prototype.visibleTiles = function(e, t, r) {
  var i = new de(this.levelList.indexOf(t), this);
  r = r || [], r.length = 0, r.push(i);
};
pt.Tile = pt.prototype.Tile = de;
pt.type = pt.prototype.type = "equirect";
de.type = de.prototype.type = "equirect";
var Ap = pt;
function Ft(e, t, r) {
  return 2 * Math.atan(r * Math.tan(e / 2) / t);
}
function zp(e, t, r) {
  return Ft(e, t, r);
}
function Op(e, t, r) {
  return Ft(e, t, Math.sqrt(t * t + r * r));
}
function Ip(e, t, r) {
  return Ft(e, r, t);
}
function Dp(e, t, r) {
  return Ft(e, r, Math.sqrt(t * t + r * r));
}
function Hp(e, t, r) {
  return Ft(e, Math.sqrt(t * t + r * r), t);
}
function Fp(e, t, r) {
  return Ft(e, Math.sqrt(t * t + r * r), r);
}
var Fs = {
  convert: Ft,
  htov: zp,
  htod: Op,
  vtoh: Ip,
  vtod: Dp,
  dtoh: Hp,
  dtov: Fp
};
function Np(e) {
  return typeof e == "number" && isFinite(e);
}
var pn = Np;
function Vp(e) {
  return e.toPrecision(15);
}
var mn = Vp;
function kp() {
  var e = arguments;
  return function(r) {
    for (var i = r, n = 0; n < e.length; n++) {
      var a = e[n];
      i = a.call(null, i);
    }
    return i;
  };
}
var Ns = kp, jp = ce, ut = Ee.mat4, xe = Ee.vec4, Vs = ti, _r = Fs, Di = _t, ft = pn, $t = Kt, Be = mn, Wp = Ns, Yp = he, qp = 0, Xp = 0, Up = 0, Bp = 0, Gp = 0, Zp = Math.PI / 4, Kp = 0, Qp = 0, In = 1e-6;
function D(e, t) {
  this._yaw = e && e.yaw != null ? e.yaw : Up, this._pitch = e && e.pitch != null ? e.pitch : Bp, this._roll = e && e.roll != null ? e.roll : Gp, this._fov = e && e.fov != null ? e.fov : Zp, this._width = e && e.width != null ? e.width : qp, this._height = e && e.height != null ? e.height : Xp, this._projectionCenterX = e && e.projectionCenterX != null ? e.projectionCenterX : Kp, this._projectionCenterY = e && e.projectionCenterY != null ? e.projectionCenterY : Qp, this._limiter = t || null, this._projMatrix = ut.create(), this._invProjMatrix = ut.create(), this._frustum = [
    xe.create(),
    // left
    xe.create(),
    // right
    xe.create(),
    // bottom
    xe.create(),
    // top
    xe.create()
    // camera
  ], this._projectionChanged = !0, this._params = {}, this._fovs = {}, this._tmpVec = xe.create(), this._update();
}
jp(D);
D.prototype.destroy = function() {
  Yp(this);
};
D.prototype.yaw = function() {
  return this._yaw;
};
D.prototype.pitch = function() {
  return this._pitch;
};
D.prototype.roll = function() {
  return this._roll;
};
D.prototype.projectionCenterX = function() {
  return this._projectionCenterX;
};
D.prototype.projectionCenterY = function() {
  return this._projectionCenterY;
};
D.prototype.fov = function() {
  return this._fov;
};
D.prototype.width = function() {
  return this._width;
};
D.prototype.height = function() {
  return this._height;
};
D.prototype.size = function(e) {
  return e = e || {}, e.width = this._width, e.height = this._height, e;
};
D.prototype.parameters = function(e) {
  return e = e || {}, e.yaw = this._yaw, e.pitch = this._pitch, e.roll = this._roll, e.fov = this._fov, e;
};
D.prototype.limiter = function() {
  return this._limiter;
};
D.prototype.setYaw = function(e) {
  this._resetParams(), this._params.yaw = e, this._update(this._params);
};
D.prototype.setPitch = function(e) {
  this._resetParams(), this._params.pitch = e, this._update(this._params);
};
D.prototype.setRoll = function(e) {
  this._resetParams(), this._params.roll = e, this._update(this._params);
};
D.prototype.setFov = function(e) {
  this._resetParams(), this._params.fov = e, this._update(this._params);
};
D.prototype.setProjectionCenterX = function(e) {
  this._resetParams(), this._params.projectionCenterX = e, this._update(this._params);
};
D.prototype.setProjectionCenterY = function(e) {
  this._resetParams(), this._params.projectionCenterY = e, this._update(this._params);
};
D.prototype.offsetYaw = function(e) {
  this.setYaw(this._yaw + e);
};
D.prototype.offsetPitch = function(e) {
  this.setPitch(this._pitch + e);
};
D.prototype.offsetRoll = function(e) {
  this.setRoll(this._roll + e);
};
D.prototype.offsetFov = function(e) {
  this.setFov(this._fov + e);
};
D.prototype.setSize = function(e) {
  this._resetParams(), this._params.width = e.width, this._params.height = e.height, this._update(this._params);
};
D.prototype.setParameters = function(e) {
  this._resetParams(), this._params.yaw = e.yaw, this._params.pitch = e.pitch, this._params.roll = e.roll, this._params.fov = e.fov, this._params.projectionCenterX = e.projectionCenterX, this._params.projectionCenterY = e.projectionCenterY, this._update(this._params);
};
D.prototype.setLimiter = function(e) {
  this._limiter = e || null, this._update();
};
D.prototype._resetParams = function() {
  var e = this._params;
  e.yaw = null, e.pitch = null, e.roll = null, e.fov = null, e.width = null, e.height = null;
};
D.prototype._update = function(e) {
  e == null && (this._resetParams(), e = this._params);
  var t = this._yaw, r = this._pitch, i = this._roll, n = this._fov, a = this._projectionCenterX, s = this._projectionCenterY, o = this._width, h = this._height;
  if (e.yaw = e.yaw != null ? e.yaw : t, e.pitch = e.pitch != null ? e.pitch : r, e.roll = e.roll != null ? e.roll : i, e.fov = e.fov != null ? e.fov : n, e.width = e.width != null ? e.width : o, e.height = e.height != null ? e.height : h, e.projectionCenterX = e.projectionCenterX != null ? e.projectionCenterX : a, e.projectionCenterY = e.projectionCenterY != null ? e.projectionCenterY : s, this._limiter && (e = this._limiter(e), !e))
    throw new Error("Bad view limiter");
  e = this._normalize(e);
  var l = e.yaw, c = e.pitch, f = e.roll, u = e.fov, p = e.width, _ = e.height, w = e.projectionCenterX, y = e.projectionCenterY;
  if (!ft(l) || !ft(c) || !ft(f) || !ft(u) || !ft(p) || !ft(_) || !ft(w) || !ft(y))
    throw new Error("Bad view - suspect a broken limiter");
  this._yaw = l, this._pitch = c, this._roll = f, this._fov = u, this._width = p, this._height = _, this._projectionCenterX = w, this._projectionCenterY = y, (l !== t || c !== r || f !== i || u !== n || p !== o || _ !== h || w !== a || y !== s) && (this._projectionChanged = !0, this.emit("change")), (p !== o || _ !== h) && this.emit("resize");
};
D.prototype._normalize = function(e) {
  this._normalizeCoordinates(e);
  var t = _r.htov(Math.PI, e.width, e.height), r = isNaN(t) ? Math.PI : Math.min(Math.PI, t);
  return e.fov = $t(e.fov, In, r - In), e;
};
D.prototype._normalizeCoordinates = function(e) {
  return "yaw" in e && (e.yaw = Di(e.yaw - Math.PI, -2 * Math.PI) + Math.PI), "pitch" in e && (e.pitch = Di(e.pitch - Math.PI, -2 * Math.PI) + Math.PI), "roll" in e && (e.roll = Di(e.roll - Math.PI, -2 * Math.PI) + Math.PI), e;
};
D.prototype.normalizeToClosest = function(e, t) {
  var r = this._yaw, i = this._pitch, n = e.yaw, a = e.pitch, s = n - 2 * Math.PI, o = n + 2 * Math.PI;
  Math.abs(s - r) < Math.abs(n - r) ? n = s : Math.abs(o - r) < Math.abs(n - r) && (n = o);
  var h = a - 2 * Math.PI, l = a + 2 * Math.PI;
  return Math.abs(h - i) < Math.abs(a - i) ? a = h : Math.abs(h - i) < Math.abs(a - i) && (a = l), t = t || {}, t.yaw = n, t.pitch = a, t;
};
D.prototype.updateWithControlParameters = function(e) {
  var t = this._fov, r = _r.vtoh(t, this._width, this._height);
  isNaN(r) && (r = t), this.offsetYaw(e.axisScaledX * r + e.x * 2 * r + e.yaw), this.offsetPitch(e.axisScaledY * t + e.y * 2 * r + e.pitch), this.offsetRoll(-e.roll), this.offsetFov(e.zoom * t);
};
D.prototype._updateProjection = function() {
  var e = this._projMatrix, t = this._invProjMatrix, r = this._frustum;
  if (this._projectionChanged) {
    var i = this._width, n = this._height, a = this._fov, s = _r.vtoh(a, i, n), o = i / n, h = this._projectionCenterX, l = this._projectionCenterY;
    if (h !== 0 || l !== 0) {
      var c = Math.atan(h * 2 * Math.tan(s / 2)), f = Math.atan(l * 2 * Math.tan(a / 2)), u = this._fovs;
      u.leftDegrees = (s / 2 + c) * 180 / Math.PI, u.rightDegrees = (s / 2 - c) * 180 / Math.PI, u.upDegrees = (a / 2 + f) * 180 / Math.PI, u.downDegrees = (a / 2 - f) * 180 / Math.PI, ut.perspectiveFromFieldOfView(e, u, -1, 1);
    } else
      ut.perspective(e, a, o, -1, 1);
    ut.rotateZ(e, e, this._roll), ut.rotateX(e, e, this._pitch), ut.rotateY(e, e, this._yaw), ut.invert(t, e), this._matrixToFrustum(e, r), this._projectionChanged = !1;
  }
};
D.prototype._matrixToFrustum = function(e, t) {
  xe.set(t[0], e[3] + e[0], e[7] + e[4], e[11] + e[8], 0), xe.set(t[1], e[3] - e[0], e[7] - e[4], e[11] - e[8], 0), xe.set(t[2], e[3] + e[1], e[7] + e[5], e[11] + e[9], 0), xe.set(t[3], e[3] - e[1], e[7] - e[5], e[11] - e[9], 0), xe.set(t[4], e[3] + e[2], e[7] + e[6], e[11] + e[10], 0);
};
D.prototype.projection = function() {
  return this._updateProjection(), this._projMatrix;
};
D.prototype.inverseProjection = function() {
  return this._updateProjection(), this._invProjMatrix;
};
D.prototype.intersects = function(e) {
  this._updateProjection();
  for (var t = this._frustum, r = this._tmpVec, i = 0; i < t.length; i++) {
    for (var n = t[i], a = !1, s = 0; s < e.length; s++) {
      var o = e[s];
      xe.set(r, o[0], o[1], o[2], 0), xe.dot(n, r) >= 0 && (a = !0);
    }
    if (!a)
      return !1;
  }
  return !0;
};
D.prototype.selectLevel = function(e) {
  for (var t = Vs() * this._height, r = Math.tan(0.5 * this._fov), i = 0; i < e.length; i++) {
    var n = e[i];
    if (r * n.height() >= t)
      return n;
  }
  return e[e.length - 1];
};
D.prototype.coordinatesToScreen = function(e, t) {
  var r = this._tmpVec;
  t || (t = {});
  var i = this._width, n = this._height;
  if (i <= 0 || n <= 0)
    return t.x = null, t.y = null, null;
  var a = e.yaw, s = e.pitch, o = Math.sin(a) * Math.cos(s), h = -Math.sin(s), l = -Math.cos(a) * Math.cos(s);
  if (xe.set(r, o, h, l, 1), xe.transformMat4(r, r, this.projection()), r[3] >= 0)
    t.x = i * (r[0] / r[3] + 1) / 2, t.y = n * (1 - r[1] / r[3]) / 2;
  else
    return t.x = null, t.y = null, null;
  return t;
};
D.prototype.screenToCoordinates = function(e, t) {
  var r = this._tmpVec;
  t || (t = {});
  var i = this._width, n = this._height, a = 2 * e.x / i - 1, s = 1 - 2 * e.y / n;
  xe.set(r, a, s, 1, 1), xe.transformMat4(r, r, this.inverseProjection());
  var o = Math.sqrt(r[0] * r[0] + r[1] * r[1] + r[2] * r[2]);
  return t.yaw = Math.atan2(r[0], -r[2]), t.pitch = Math.acos(r[1] / o) - Math.PI / 2, this._normalizeCoordinates(t), t;
};
D.prototype.coordinatesToPerspectiveTransform = function(e, t, r) {
  r = r || "";
  var i = this._height, n = this._width, a = this._fov, s = 0.5 * i / Math.tan(a / 2), o = "";
  return o += "translateX(" + Be(n / 2) + "px) ", o += "translateY(" + Be(i / 2) + "px) ", o += "translateX(-50%) translateY(-50%) ", o += "perspective(" + Be(s) + "px) ", o += "translateZ(" + Be(s) + "px) ", o += "rotateZ(" + Be(-this._roll) + "rad) ", o += "rotateX(" + Be(-this._pitch) + "rad) ", o += "rotateY(" + Be(this._yaw) + "rad) ", o += "rotateY(" + Be(-e.yaw) + "rad) ", o += "rotateX(" + Be(e.pitch) + "rad) ", o += "translateZ(" + Be(-t) + "px) ", o += r + " ", o;
};
D.limit = {
  /**
   * Returns a view limiter that constrains the yaw angle.
   * @param {number} min The minimum yaw value.
   * @param {number} max The maximum yaw value.
   * @return {RectilinearViewLimiter}
   */
  yaw: function(e, t) {
    return function(i) {
      return i.yaw = $t(i.yaw, e, t), i;
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
      return i.pitch = $t(i.pitch, e, t), i;
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
      return i.roll = $t(i.roll, e, t), i;
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
        var s = _r.htov(e, n, a), o = _r.htov(t, n, a);
        i.fov = $t(i.fov, s, o);
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
      return i.fov = $t(i.fov, e, t), i;
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
        var n = Vs() * i, a = 2 * Math.atan(n / e);
        r.fov = $t(r.fov, a, 1 / 0);
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
    return r = r ?? t, Wp(
      D.limit.resolution(e),
      D.limit.vfov(0, t),
      D.limit.hfov(0, r),
      D.limit.pitch(-Math.PI / 2, Math.PI / 2)
    );
  }
};
D.type = D.prototype.type = "rectilinear";
var Jp = D, em = ce, Jr = Ee.mat4, yr = Ee.vec4, ks = ti, qt = pn, et = Kt, tm = he, rm = 0, im = 0, js = 0.5, Ws = 0.5, nm = 1, am = [
  1,
  // top
  0,
  // right
  1,
  // bottom
  0
  // left
], sm = [
  -1,
  // top
  -1,
  // right
  1,
  // bottom
  1
  // left
], om = 1e-6;
function B(e, t) {
  if (!(e && e.mediaAspectRatio != null))
    throw new Error("mediaAspectRatio must be defined");
  this._x = e && e.x != null ? e.x : js, this._y = e && e.y != null ? e.y : Ws, this._zoom = e && e.zoom != null ? e.zoom : nm, this._mediaAspectRatio = e.mediaAspectRatio, this._width = e && e.width != null ? e.width : rm, this._height = e && e.height != null ? e.height : im, this._limiter = t || null, this._projMatrix = Jr.create(), this._invProjMatrix = Jr.create(), this._frustum = [
    0,
    // top
    0,
    // right
    0,
    // bottom
    0
    // left
  ], this._projectionChanged = !0, this._params = {}, this._vec = yr.create(), this._update();
}
em(B);
B.prototype.destroy = function() {
  tm(this);
};
B.prototype.x = function() {
  return this._x;
};
B.prototype.y = function() {
  return this._y;
};
B.prototype.zoom = function() {
  return this._zoom;
};
B.prototype.mediaAspectRatio = function() {
  return this._mediaAspectRatio;
};
B.prototype.width = function() {
  return this._width;
};
B.prototype.height = function() {
  return this._height;
};
B.prototype.size = function(e) {
  return e = e || {}, e.width = this._width, e.height = this._height, e;
};
B.prototype.parameters = function(e) {
  return e = e || {}, e.x = this._x, e.y = this._y, e.zoom = this._zoom, e.mediaAspectRatio = this._mediaAspectRatio, e;
};
B.prototype.limiter = function() {
  return this._limiter;
};
B.prototype.setX = function(e) {
  this._resetParams(), this._params.x = e, this._update(this._params);
};
B.prototype.setY = function(e) {
  this._resetParams(), this._params.y = e, this._update(this._params);
};
B.prototype.setZoom = function(e) {
  this._resetParams(), this._params.zoom = e, this._update(this._params);
};
B.prototype.offsetX = function(e) {
  this.setX(this._x + e);
};
B.prototype.offsetY = function(e) {
  this.setY(this._y + e);
};
B.prototype.offsetZoom = function(e) {
  this.setZoom(this._zoom + e);
};
B.prototype.setMediaAspectRatio = function(e) {
  this._resetParams(), this._params.mediaAspectRatio = e, this._update(this._params);
};
B.prototype.setSize = function(e) {
  this._resetParams(), this._params.width = e.width, this._params.height = e.height, this._update(this._params);
};
B.prototype.setParameters = function(e) {
  this._resetParams(), this._params.x = e.x, this._params.y = e.y, this._params.zoom = e.zoom, this._params.mediaAspectRatio = e.mediaAspectRatio, this._update(this._params);
};
B.prototype.setLimiter = function(e) {
  this._limiter = e || null, this._update();
};
B.prototype._resetParams = function() {
  var e = this._params;
  e.x = null, e.y = null, e.zoom = null, e.mediaAspectRatio = null, e.width = null, e.height = null;
};
B.prototype._update = function(e) {
  e == null && (this._resetParams(), e = this._params);
  var t = this._x, r = this._y, i = this._zoom, n = this._mediaAspectRatio, a = this._width, s = this._height;
  if (e.x = e.x != null ? e.x : t, e.y = e.y != null ? e.y : r, e.zoom = e.zoom != null ? e.zoom : i, e.mediaAspectRatio = e.mediaAspectRatio != null ? e.mediaAspectRatio : n, e.width = e.width != null ? e.width : a, e.height = e.height != null ? e.height : s, this._limiter && (e = this._limiter(e), !e))
    throw new Error("Bad view limiter");
  var o = e.x, h = e.y, l = e.zoom, c = e.mediaAspectRatio, f = e.width, u = e.height;
  if (!qt(o) || !qt(h) || !qt(l) || !qt(c) || !qt(f) || !qt(u))
    throw new Error("Bad view - suspect a broken limiter");
  l = et(l, om, 1 / 0), this._x = o, this._y = h, this._zoom = l, this._mediaAspectRatio = c, this._width = f, this._height = u, (o !== t || h !== r || l !== i || c !== n || f !== a || u !== s) && (this._projectionChanged = !0, this.emit("change")), (f !== a || u !== s) && this.emit("resize");
};
B.prototype._zoomX = function() {
  return this._zoom;
};
B.prototype._zoomY = function() {
  var e = this._mediaAspectRatio, t = this._width / this._height, r = this._zoom, i = r * e / t;
  return isNaN(i) && (i = r), i;
};
B.prototype.updateWithControlParameters = function(e) {
  var t = this.zoom(), r = this._zoomX(), i = this._zoomY();
  this.offsetX(e.axisScaledX * r + e.x * t), this.offsetY(e.axisScaledY * i + e.y * t), this.offsetZoom(e.zoom * t);
};
B.prototype._updateProjection = function() {
  var e = this._projMatrix, t = this._invProjMatrix, r = this._frustum;
  if (this._projectionChanged) {
    var i = this._x, n = this._y, a = this._zoomX(), s = this._zoomY(), o = r[0] = 0.5 - n + 0.5 * s, h = r[1] = i - 0.5 + 0.5 * a, l = r[2] = 0.5 - n - 0.5 * s, c = r[3] = i - 0.5 - 0.5 * a;
    Jr.ortho(e, c, h, l, o, -1, 1), Jr.invert(t, e), this._projectionChanged = !1;
  }
};
B.prototype.projection = function() {
  return this._updateProjection(), this._projMatrix;
};
B.prototype.inverseProjection = function() {
  return this._updateProjection(), this._invProjMatrix;
};
B.prototype.intersects = function(e) {
  this._updateProjection();
  for (var t = this._frustum, r = 0; r < t.length; r++) {
    for (var i = t[r], n = am[r], a = sm[r], s = !1, o = 0; o < e.length; o++) {
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
B.prototype.selectLevel = function(e) {
  for (var t = ks() * this.width(), r = this._zoom, i = 0; i < e.length; i++) {
    var n = e[i];
    if (r * n.width() >= t)
      return n;
  }
  return e[e.length - 1];
};
B.prototype.coordinatesToScreen = function(e, t) {
  var r = this._vec;
  t || (t = {});
  var i = this._width, n = this._height;
  if (i <= 0 || n <= 0)
    return t.x = null, t.y = null, null;
  var a = e && e.x != null ? e.x : js, s = e && e.y != null ? e.y : Ws;
  yr.set(r, a - 0.5, 0.5 - s, -1, 1), yr.transformMat4(r, r, this.projection());
  for (var o = 0; o < 3; o++)
    r[o] /= r[3];
  return t.x = i * (r[0] + 1) / 2, t.y = n * (1 - r[1]) / 2, t;
};
B.prototype.screenToCoordinates = function(e, t) {
  var r = this._vec;
  t || (t = {});
  var i = this._width, n = this._height, a = 2 * e.x / i - 1, s = 1 - 2 * e.y / n;
  return yr.set(r, a, s, 1, 1), yr.transformMat4(r, r, this.inverseProjection()), t.x = 0.5 + r[0], t.y = 0.5 - r[1], t;
};
B.limit = {
  /**
   * Returns a view limiter that constrains the x parameter.
   * @param {number} min The minimum x value.
   * @param {number} max The maximum y value.
   * @return {FlatViewLimiter}
   */
  x: function(e, t) {
    return function(i) {
      return i.x = et(i.x, e, t), i;
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
      return i.y = et(i.y, e, t), i;
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
      return i.zoom = et(i.zoom, e, t), i;
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
      var i = r.width, n = ks() * i / e;
      return r.zoom = et(r.zoom, n, 1 / 0), r;
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
      return i.x = et(i.x, a, s), i;
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
      return i.y = et(i.y, o, h), i;
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
      return t.zoom > n ? o = h = 0.5 : (o = 0 + 0.5 * t.zoom / n, h = 1 - 0.5 * t.zoom / n), t.x = et(t.x, a, s), t.y = et(t.y, o, h), t;
    };
  }
};
B.type = B.prototype.type = "flat";
var hm = B, lm = ia, cm = _t;
function br(e) {
  this._concurrency = e && e.concurrency || 1, this._paused = e && !!e.paused || !1, this._pool = [];
  for (var t = 0; t < this._concurrency; t++)
    this._pool.push(new lm(e));
  this._next = 0;
}
br.prototype.length = function() {
  for (var e = 0, t = 0; t < this._pool.length; t++)
    e += this._pool[t].length();
  return e;
};
br.prototype.push = function(e, t) {
  var r = this._next, i = this._pool[r].push(e, t);
  return this._next = cm(this._next + 1, this._concurrency), i;
};
br.prototype.pause = function() {
  if (!this._paused) {
    this._paused = !0;
    for (var e = 0; e < this._concurrency; e++)
      this._pool[e].pause();
  }
};
br.prototype.resume = function() {
  if (this._paused) {
    this._paused = !1;
    for (var e = 0; e < this._concurrency; e++)
      this._pool[e].resume();
  }
};
var vm = br;
function fm() {
}
var Cr = fm, um = Cr;
function dm() {
  var e = Array.prototype.slice.call(arguments, 0);
  return function() {
    var r = e.slice(0), i = null, n = null, a = arguments.length ? Array.prototype.slice.call(arguments, 0, arguments.length - 1) : [], s = arguments.length ? arguments[arguments.length - 1] : um;
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
var _n = dm;
function pm(e, t) {
  var r = null;
  function i() {
    r != null && (r = null, t(null));
  }
  function n() {
    r != null && (clearTimeout(r), r = null, t.apply(null, arguments));
  }
  return r = setTimeout(i, e), n;
}
var Ys = pm, mm = ce, _m = la, ym = vm, gm = _n, wm = Ys, Dn = Ot, Hn = {
  x: "x",
  y: "y",
  z: "z",
  f: "face"
}, xm = "bdflru", Mm = 4, Em = 1e4;
function gr(e, t) {
  t = t || {}, this._loadPool = new ym({
    concurrency: t.concurrency || Mm
  }), this._retryDelay = t.retryDelay || Em, this._retryMap = {}, this._sourceFromTile = e;
}
mm(gr);
gr.prototype.loadAsset = function(e, t, r) {
  var i = this, n = this._retryDelay, a = this._retryMap, s = this._sourceFromTile(t), o = s.url, h = s.rect, l = e.loadImage.bind(e, o, h), c = function(y) {
    return i._loadPool.push(l, function(M, b) {
      M ? (M instanceof _m && (a[o] = Dn(), i.emit("networkError", M, t)), y(M, t)) : (delete a[o], y(null, t, b));
    });
  }, f, u = a[o];
  if (u != null) {
    var p = Dn(), _ = p - u;
    _ < n ? f = n - _ : (f = 0, delete a[o]);
  }
  var w = wm.bind(null, f);
  return gm(w, c)(r);
};
gr.fromString = function(e, t) {
  t = t || {};
  var r = t && t.cubeMapPreviewFaceOrder || xm, i = t.cubeMapPreviewUrl ? a : n;
  return new gr(i, t);
  function n(o) {
    var h = e;
    for (var l in Hn) {
      var c = Hn[l], f = Tm(l), u = o.hasOwnProperty(c) ? o[c] : "";
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
function Tm(e) {
  var t = "\\{(" + e + ")\\}";
  return new RegExp(t, "g");
}
var bm = gr;
function yn(e) {
  this._asset = e;
}
yn.prototype.asset = function() {
  return this._asset;
};
yn.prototype.loadAsset = function(e, t, r) {
  var i = this, n = setTimeout(function() {
    r(null, t, i._asset);
  }, 0);
  function a() {
    clearTimeout(n), r.apply(null, arguments);
  }
  return a;
};
var Cm = yn, Sm = Ki, Pm = Ge, Lm = ce, $m = he;
function Nt(e) {
  this.constructor.super_.call(this, e), this._timestamp = 0;
}
Pm(Nt, Sm);
Lm(Nt);
Nt.prototype.destroy = function() {
  $m(this);
};
Nt.prototype.timestamp = function() {
  return this._timestamp;
};
Nt.prototype.isDynamic = function() {
  return !0;
};
Nt.prototype.markDirty = function() {
  this._timestamp++, this.emit("change");
};
var Rm = Nt, ai = _t, Am = 64;
function yt(e) {
  if (e != null && (!isFinite(e) || Math.floor(e) !== e || e < 1))
    throw new Error("Map: invalid capacity");
  this._capacity = e || Am, this._keyBuckets = [], this._valBuckets = [];
  for (var t = 0; t < this._capacity; t++)
    this._keyBuckets.push([]), this._valBuckets.push([]);
  this._size = 0;
}
yt.prototype.get = function(e) {
  for (var t = ai(e.hash(), this._capacity), r = this._keyBuckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n)) {
      var a = this._valBuckets[t], s = a[i];
      return s;
    }
  }
  return null;
};
yt.prototype.set = function(e, t) {
  for (var r = ai(e.hash(), this._capacity), i = this._keyBuckets[r], n = this._valBuckets[r], a = 0; a < i.length; a++) {
    var s = i[a];
    if (e.equals(s)) {
      var o = n[a];
      return i[a] = e, n[a] = t, o;
    }
  }
  return i.push(e), n.push(t), this._size++, null;
};
yt.prototype.del = function(e) {
  for (var t = ai(e.hash(), this._capacity), r = this._keyBuckets[t], i = this._valBuckets[t], n = 0; n < r.length; n++) {
    var a = r[n];
    if (e.equals(a)) {
      for (var s = i[n], o = n; o < r.length - 1; o++)
        r[o] = r[o + 1], i[o] = i[o + 1];
      return r.length = r.length - 1, i.length = i.length - 1, this._size--, s;
    }
  }
  return null;
};
yt.prototype.has = function(e) {
  for (var t = ai(e.hash(), this._capacity), r = this._keyBuckets[t], i = 0; i < r.length; i++) {
    var n = r[i];
    if (e.equals(n))
      return !0;
  }
  return !1;
};
yt.prototype.size = function() {
  return this._size;
};
yt.prototype.clear = function() {
  for (var e = 0; e < this._capacity; e++)
    this._keyBuckets[e].length = 0, this._valBuckets[e].length = 0;
  this._size = 0;
};
yt.prototype.forEach = function(e) {
  for (var t = 0, r = 0; r < this._capacity; r++)
    for (var i = this._keyBuckets[r], n = this._valBuckets[r], a = 0; a < i.length; a++)
      e(i[a], n[a]), t += 1;
  return t;
};
var zm = yt, Om = _t;
function gt(e) {
  if (!isFinite(e) || Math.floor(e) !== e || e < 0)
    throw new Error("LruSet: invalid capacity");
  this._capacity = e, this._elements = new Array(this._capacity), this._start = 0, this._size = 0;
}
gt.prototype._index = function(e) {
  return Om(this._start + e, this._capacity);
};
gt.prototype.add = function(e) {
  if (this._capacity === 0)
    return e;
  this.remove(e);
  var t = this._size === this._capacity ? this._elements[this._index(0)] : null;
  return this._elements[this._index(this._size)] = e, this._size < this._capacity ? this._size++ : this._start = this._index(1), t;
};
gt.prototype.remove = function(e) {
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
gt.prototype.has = function(e) {
  for (var t = 0; t < this._size; t++)
    if (e.equals(this._elements[this._index(t)]))
      return !0;
  return !1;
};
gt.prototype.size = function() {
  return this._size;
};
gt.prototype.clear = function() {
  this._elements.length = 0, this._start = 0, this._size = 0;
};
gt.prototype.forEach = function(e) {
  for (var t = 0, r = 0; r < this._size; r++)
    e(this._elements[this._index(r)]), t += 1;
  return t;
};
var Im = gt;
function Dm(e, t) {
  for (var r in t)
    r in e || (e[r] = t[r]);
  return e;
}
var Qe = Dm, Hm = Cr;
function Fm(e) {
  return function() {
    var r = arguments.length ? Array.prototype.slice.call(arguments, 0, arguments.length - 1) : [], i = arguments.length ? arguments[arguments.length - 1] : Hm, n = null, a = !1;
    function s() {
      var o = arguments[0];
      !o || a ? i.apply(null, arguments) : n = e.apply(null, r);
    }
    return r.push(s), s(!0), function() {
      a = !0, n.apply(null, arguments);
    };
  };
}
var qs = Fm, Fn = zm, Nn = Os, Nm = Im, Xs = ce, Vm = Qe, km = qs, jm = _n, Wm = Ge, Us = he, pr = typeof MARZIPANODEBUG < "u" && MARZIPANODEBUG.textureStore, ke = {
  IDLE: 0,
  START: 1,
  MARK: 2,
  END: 3
}, Ym = {
  // Maximum number of cached textures for previously visible tiles.
  previouslyVisibleCacheSize: 512
}, qm = 0;
function gn() {
}
Wm(gn, Error);
function Sr(e, t) {
  var r = this, i = qm++;
  r._id = i, r._store = e, r._tile = t, r._asset = null, r._texture = null, r._changeHandler = function() {
    e.emit("textureInvalid", t);
  };
  var n = e.source(), a = e.stage(), s = n.loadAsset.bind(n), o = a.createTexture.bind(a), h = jm(km(s), o);
  e.emit("textureStartLoad", t), pr && console.log("loading", i, t), r._cancel = h(a, t, function(l, c, f, u) {
    if (r._cancel = null, l) {
      f && f.destroy(), u && u.destroy(), l instanceof gn ? (e.emit("textureCancel", t), pr && console.log("cancel", i, t)) : (e.emit("textureError", t, l), pr && console.log("error", i, t));
      return;
    }
    r._texture = u, f.isDynamic() ? (r._asset = f, f.addEventListener("change", r._changeHandler)) : f.destroy(), e.emit("textureLoad", t), pr && console.log("load", i, t);
  });
}
Sr.prototype.asset = function() {
  return this._asset;
};
Sr.prototype.texture = function() {
  return this._texture;
};
Sr.prototype.destroy = function() {
  var e = this._id, t = this._store, r = this._tile, i = this._asset, n = this._texture, a = this._cancel;
  if (a) {
    a(new gn());
    return;
  }
  i && (i.removeEventListener("change", this._changeHandler), i.destroy()), n && n.destroy(), t.emit("textureUnload", r), pr && console.log("unload", e, r), Us(this);
};
Xs(Sr);
function _e(e, t, r) {
  r = Vm(r || {}, Ym), this._source = e, this._stage = t, this._state = ke.IDLE, this._delimCount = 0, this._itemMap = new Fn(), this._visible = new Nn(), this._previouslyVisible = new Nm(r.previouslyVisibleCacheSize), this._pinMap = new Fn(), this._newVisible = new Nn(), this._noLongerVisible = [], this._visibleAgain = [], this._evicted = [];
}
Xs(_e);
_e.prototype.destroy = function() {
  this.clear(), Us(this);
};
_e.prototype.stage = function() {
  return this._stage;
};
_e.prototype.source = function() {
  return this._source;
};
_e.prototype.clear = function() {
  var e = this;
  e._evicted.length = 0, e._itemMap.forEach(function(t) {
    e._evicted.push(t);
  }), e._evicted.forEach(function(t) {
    e._unloadTile(t);
  }), e._itemMap.clear(), e._visible.clear(), e._previouslyVisible.clear(), e._pinMap.clear(), e._newVisible.clear(), e._noLongerVisible.length = 0, e._visibleAgain.length = 0, e._evicted.length = 0;
};
_e.prototype.clearNotPinned = function() {
  var e = this;
  e._evicted.length = 0, e._itemMap.forEach(function(t) {
    e._pinMap.has(t) || e._evicted.push(t);
  }), e._evicted.forEach(function(t) {
    e._unloadTile(t);
  }), e._visible.clear(), e._previouslyVisible.clear(), e._evicted.length = 0;
};
_e.prototype.startFrame = function() {
  if (this._state !== ke.IDLE && this._state !== ke.START)
    throw new Error("TextureStore: startFrame called out of sequence");
  this._state = ke.START, this._delimCount++;
};
_e.prototype.markTile = function(e) {
  if (this._state !== ke.START && this._state !== ke.MARK)
    throw new Error("TextureStore: markTile called out of sequence");
  this._state = ke.MARK;
  var t = this._itemMap.get(e), r = t && t.texture(), i = t && t.asset();
  r && i && r.refresh(e, i), this._newVisible.add(e);
};
_e.prototype.endFrame = function() {
  if (this._state !== ke.START && this._state !== ke.MARK && this._state !== ke.END)
    throw new Error("TextureStore: endFrame called out of sequence");
  this._state = ke.END, this._delimCount--, this._delimCount || (this._update(), this._state = ke.IDLE);
};
_e.prototype._update = function() {
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
_e.prototype._loadTile = function(e) {
  if (this._itemMap.has(e))
    throw new Error("TextureStore: loading texture already in cache");
  var t = new Sr(this, e);
  this._itemMap.set(e, t);
};
_e.prototype._unloadTile = function(e) {
  var t = this._itemMap.del(e);
  if (!t)
    throw new Error("TextureStore: unloading texture not in cache");
  t.destroy();
};
_e.prototype.asset = function(e) {
  var t = this._itemMap.get(e);
  return t ? t.asset() : null;
};
_e.prototype.texture = function(e) {
  var t = this._itemMap.get(e);
  return t ? t.texture() : null;
};
_e.prototype.pin = function(e) {
  var t = (this._pinMap.get(e) || 0) + 1;
  return this._pinMap.set(e, t), this._itemMap.has(e) || this._loadTile(e), t;
};
_e.prototype.unpin = function(e) {
  var t = this._pinMap.get(e);
  if (t)
    t--, t > 0 ? this._pinMap.set(e, t) : (this._pinMap.del(e), !this._visible.has(e) && !this._previouslyVisible.has(e) && this._unloadTile(e));
  else
    throw new Error("TextureStore: unpin when not pinned");
  return t;
};
_e.prototype.query = function(e) {
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
var Bs = _e;
function Xm(e, t) {
  for (var r in t)
    e[r] = t[r];
  return e;
}
var Gs = Xm, Um = ce, Bm = Gs, Gm = he;
function ye(e, t, r, i, n) {
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
Um(ye);
ye.prototype.destroy = function() {
  this._view.removeEventListener("change", this._viewChangeHandler), this._textureStore.removeEventListener(
    "textureLoad",
    this._textureStoreChangeHandler
  ), this._textureStore.removeEventListener(
    "textureError",
    this._textureStoreChangeHandler
  ), this._textureStore.removeEventListener(
    "textureInvalid",
    this._textureStoreChangeHandler
  ), Gm(this);
};
ye.prototype.source = function() {
  return this._source;
};
ye.prototype.geometry = function() {
  return this._geometry;
};
ye.prototype.view = function() {
  return this._view;
};
ye.prototype.textureStore = function() {
  return this._textureStore;
};
ye.prototype.effects = function() {
  return this._effects;
};
ye.prototype.setEffects = function(e) {
  this._effects = e, this.emit("effectsChange", this._effects);
};
ye.prototype.mergeEffects = function(e) {
  Bm(this._effects, e), this.emit("effectsChange", this._effects);
};
ye.prototype.fixedLevel = function() {
  return this._fixedLevelIndex;
};
ye.prototype.setFixedLevel = function(e) {
  if (e !== this._fixedLevelIndex) {
    if (e != null && (e >= this._geometry.levelList.length || e < 0))
      throw new Error("Level index out of range: " + e);
    this._fixedLevelIndex = e, this.emit("fixedLevelChange", this._fixedLevelIndex);
  }
};
ye.prototype._selectLevel = function() {
  var e;
  return this._fixedLevelIndex != null ? e = this._geometry.levelList[this._fixedLevelIndex] : e = this._view.selectLevel(this._geometry.selectableLevelList), e;
};
ye.prototype.visibleTiles = function(e) {
  var t = this._selectLevel();
  return this._geometry.visibleTiles(this._view, t, e);
};
ye.prototype.pinLevel = function(e) {
  for (var t = this._geometry.levelList[e], r = this._geometry.levelTiles(t), i = 0; i < r.length; i++)
    this._textureStore.pin(r[i]);
};
ye.prototype.unpinLevel = function(e) {
  for (var t = this._geometry.levelList[e], r = this._geometry.levelTiles(t), i = 0; i < r.length; i++)
    this._textureStore.unpin(r[i]);
};
ye.prototype.pinFirstLevel = function() {
  return this.pinLevel(0);
};
ye.prototype.unpinFirstLevel = function() {
  return this.unpinLevel(0);
};
var Zs = ye, Zm = ce, Km = he;
function wt(e) {
  var t = this;
  this._stage = e, this._running = !1, this._rendering = !1, this._requestHandle = null, this._boundLoop = this._loop.bind(this), this._renderInvalidHandler = function() {
    t._rendering || t.renderOnNextFrame();
  }, this._stage.addEventListener("renderInvalid", this._renderInvalidHandler);
}
Zm(wt);
wt.prototype.destroy = function() {
  this.stop(), this._stage.removeEventListener("renderInvalid", this._renderInvalidHandler), Km(this);
};
wt.prototype.stage = function() {
  return this._stage;
};
wt.prototype.start = function() {
  this._running = !0, this.renderOnNextFrame();
};
wt.prototype.stop = function() {
  this._requestHandle && (window.cancelAnimationFrame(this._requestHandle), this._requestHandle = null), this._running = !1;
};
wt.prototype.renderOnNextFrame = function() {
  this._running && !this._requestHandle && (this._requestHandle = window.requestAnimationFrame(this._boundLoop));
};
wt.prototype._loop = function() {
  if (!this._running)
    throw new Error("Render loop running while in stopped state");
  this._requestHandle = null, this._rendering = !0, this.emit("beforeRender"), this._rendering = !1, this._stage.render(), this.emit("afterRender");
};
var Ks = wt;
function it() {
  this.velocity = null, this.friction = null, this.offset = null;
}
it.equals = function(e, t) {
  return e.velocity === t.velocity && e.friction === t.friction && e.offset === t.offset;
};
it.prototype.equals = function(e) {
  return it.equals(this, e);
};
it.prototype.update = function(e, t) {
  e.offset && (this.offset = this.offset || 0, this.offset += e.offset);
  var r = this.offsetFromVelocity(t);
  r && (this.offset = this.offset || 0, this.offset += r), this.velocity = e.velocity, this.friction = e.friction;
};
it.prototype.reset = function() {
  this.velocity = null, this.friction = null, this.offset = null;
};
it.prototype.velocityAfter = function(e) {
  return this.velocity ? this.friction ? Qm(this.velocity, this.friction * e) : this.velocity : null;
};
it.prototype.offsetFromVelocity = function(e) {
  e = Math.min(e, this.nullVelocityTime());
  var t = this.velocityAfter(e), r = (this.velocity + t) / 2;
  return r * e;
};
it.prototype.nullVelocityTime = function() {
  return this.velocity == null ? 0 : this.velocity && !this.friction ? 1 / 0 : Math.abs(this.velocity / this.friction);
};
function Qm(e, t) {
  return e < 0 ? Math.min(0, e + t) : e > 0 ? Math.max(0, e - t) : 0;
}
var st = it, Jm = ce, e_ = st, t_ = he;
function Jt(e, t, r, i, n) {
  if (!e)
    throw new Error("KeyControlMethod: keyCode must be defined");
  if (!t)
    throw new Error("KeyControlMethod: parameter must be defined");
  if (!r)
    throw new Error("KeyControlMethod: velocity must be defined");
  if (!i)
    throw new Error("KeyControlMethod: friction must be defined");
  n = n || document, this._keyCode = e, this._parameter = t, this._velocity = r, this._friction = i, this._element = n, this._keydownHandler = this._handlePress.bind(this), this._keyupHandler = this._handleRelease.bind(this), this._blurHandler = this._handleBlur.bind(this), this._element.addEventListener("keydown", this._keydownHandler), this._element.addEventListener("keyup", this._keyupHandler), window.addEventListener("blur", this._blurHandler), this._dynamics = new e_(), this._pressing = !1;
}
Jm(Jt);
Jt.prototype.destroy = function() {
  this._element.removeEventListener("keydown", this._keydownHandler), this._element.removeEventListener("keyup", this._keyupHandler), window.removeEventListener("blur", this._blurHandler), t_(this);
};
Jt.prototype._handlePress = function(e) {
  e.keyCode === this._keyCode && (this._pressing = !0, this._dynamics.velocity = this._velocity, this._dynamics.friction = 0, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("active"));
};
Jt.prototype._handleRelease = function(e) {
  e.keyCode === this._keyCode && (this._pressing && (this._dynamics.friction = this._friction, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("inactive")), this._pressing = !1);
};
Jt.prototype._handleBlur = function() {
  this._dynamics.velocity = 0, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("inactive"), this._pressing = !1;
};
var Qs = Jt, Js = { exports: {} };
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
    function _(v, d, g) {
      for (var E = Object.keys(d), C = 0; C < E.length; )
        (!g || g && v[E[C]] === n) && (v[E[C]] = d[E[C]]), C++;
      return v;
    }
    function w(v, d) {
      return _(v, d, !0);
    }
    function y(v, d, g) {
      var E = d.prototype, C;
      C = v.prototype = Object.create(E), C.constructor = v, C._super = E, g && _(C, g);
    }
    function M(v, d) {
      return function() {
        return v.apply(d, arguments);
      };
    }
    function b(v, d) {
      return typeof v == o ? v.apply(d && d[0] || n, d) : v;
    }
    function L(v, d) {
      return v === n ? d : v;
    }
    function $(v, d, g) {
      p(q(d), function(E) {
        v.addEventListener(E, g, !1);
      });
    }
    function R(v, d, g) {
      p(q(d), function(E) {
        v.removeEventListener(E, g, !1);
      });
    }
    function S(v, d) {
      for (; v; ) {
        if (v == d)
          return !0;
        v = v.parentNode;
      }
      return !1;
    }
    function V(v, d) {
      return v.indexOf(d) > -1;
    }
    function q(v) {
      return v.trim().split(/\s+/g);
    }
    function k(v, d, g) {
      if (v.indexOf && !g)
        return v.indexOf(d);
      for (var E = 0; E < v.length; ) {
        if (g && v[E][g] == d || !g && v[E] === d)
          return E;
        E++;
      }
      return -1;
    }
    function W(v) {
      return Array.prototype.slice.call(v, 0);
    }
    function O(v, d, g) {
      for (var E = [], C = [], F = 0; F < v.length; ) {
        var ee = d ? v[F][d] : v[F];
        k(C, ee) < 0 && E.push(v[F]), C[F] = ee, F++;
      }
      return g && (d ? E = E.sort(function(Pe, Ue) {
        return Pe[d] > Ue[d];
      }) : E = E.sort()), E;
    }
    function X(v, d) {
      for (var g, E, C = d[0].toUpperCase() + d.slice(1), F = 0; F < a.length; ) {
        if (g = a[F], E = g ? g + C : d, E in v)
          return E;
        F++;
      }
      return n;
    }
    var Y = 1;
    function z() {
      return Y++;
    }
    function x(v) {
      var d = v.ownerDocument;
      return d.defaultView || d.parentWindow;
    }
    var Te = /mobile|tablet|ip(ad|hone|od)|android/i, K = "ontouchstart" in t, $e = X(t, "PointerEvent") !== n, ge = K && Te.test(navigator.userAgent), ue = "touch", ht = "pen", Se = "mouse", xt = "kinect", N = 25, G = 1, ze = 2, se = 4, re = 8, Re = 1, qe = 2, Mt = 4, lt = 8, Et = 16, He = qe | Mt, Fe = lt | Et, Tt = He | Fe, rr = ["x", "y"], bt = ["clientX", "clientY"];
    function we(v, d) {
      var g = this;
      this.manager = v, this.callback = d, this.element = v.element, this.target = v.options.inputTarget, this.domHandler = function(E) {
        b(v.options.enable, [v]) && g.handler(E);
      }, this.init();
    }
    we.prototype = {
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
        this.evEl && $(this.element, this.evEl, this.domHandler), this.evTarget && $(this.target, this.evTarget, this.domHandler), this.evWin && $(x(this.element), this.evWin, this.domHandler);
      },
      /**
       * unbind the events
       */
      destroy: function() {
        this.evEl && R(this.element, this.evEl, this.domHandler), this.evTarget && R(this.target, this.evTarget, this.domHandler), this.evWin && R(x(this.element), this.evWin, this.domHandler);
      }
    };
    function ci(v) {
      var d, g = v.options.inputClass;
      return g ? d = g : $e ? d = Xe : ge ? d = Pt : K ? d = cr : d = jt, new d(v, vi);
    }
    function vi(v, d, g) {
      var E = g.pointers.length, C = g.changedPointers.length, F = d & G && E - C === 0, ee = d & (se | re) && E - C === 0;
      g.isFirst = !!F, g.isFinal = !!ee, F && (v.session = {}), g.eventType = d, ir(v, g), v.emit("hammer.input", g), v.recognize(g), v.session.prevInput = g;
    }
    function ir(v, d) {
      var g = v.session, E = d.pointers, C = E.length;
      g.firstInput || (g.firstInput = nr(d)), C > 1 && !g.firstMultiple ? g.firstMultiple = nr(d) : C === 1 && (g.firstMultiple = !1);
      var F = g.firstInput, ee = g.firstMultiple, Ce = ee ? ee.center : F.center, Pe = d.center = ar(E);
      d.timeStamp = c(), d.deltaTime = d.timeStamp - F.timeStamp, d.angle = kt(Ce, Pe), d.distance = St(Ce, Pe), fi(g, d), d.offsetDirection = Ar(d.deltaX, d.deltaY), d.scale = ee ? di(ee.pointers, E) : 1, d.rotation = ee ? sr(ee.pointers, E) : 0, ui(g, d);
      var Ue = v.element;
      S(d.srcEvent.target, Ue) && (Ue = d.srcEvent.target), d.target = Ue;
    }
    function fi(v, d) {
      var g = d.center, E = v.offsetDelta || {}, C = v.prevDelta || {}, F = v.prevInput || {};
      (d.eventType === G || F.eventType === se) && (C = v.prevDelta = {
        x: F.deltaX || 0,
        y: F.deltaY || 0
      }, E = v.offsetDelta = {
        x: g.x,
        y: g.y
      }), d.deltaX = C.x + (g.x - E.x), d.deltaY = C.y + (g.y - E.y);
    }
    function ui(v, d) {
      var g = v.lastInterval || d, E = d.timeStamp - g.timeStamp, C, F, ee, Ce;
      if (d.eventType != re && (E > N || g.velocity === n)) {
        var Pe = g.deltaX - d.deltaX, Ue = g.deltaY - d.deltaY, Yt = Ct(E, Pe, Ue);
        F = Yt.x, ee = Yt.y, C = l(Yt.x) > l(Yt.y) ? Yt.x : Yt.y, Ce = Ar(Pe, Ue), v.lastInterval = d;
      } else
        C = g.velocity, F = g.velocityX, ee = g.velocityY, Ce = g.direction;
      d.velocity = C, d.velocityX = F, d.velocityY = ee, d.direction = Ce;
    }
    function nr(v) {
      for (var d = [], g = 0; g < v.pointers.length; )
        d[g] = {
          clientX: h(v.pointers[g].clientX),
          clientY: h(v.pointers[g].clientY)
        }, g++;
      return {
        timeStamp: c(),
        pointers: d,
        center: ar(d),
        deltaX: v.deltaX,
        deltaY: v.deltaY
      };
    }
    function ar(v) {
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
    function Ct(v, d, g) {
      return {
        x: d / v || 0,
        y: g / v || 0
      };
    }
    function Ar(v, d) {
      return v === d ? Re : l(v) >= l(d) ? v > 0 ? qe : Mt : d > 0 ? lt : Et;
    }
    function St(v, d, g) {
      g || (g = rr);
      var E = d[g[0]] - v[g[0]], C = d[g[1]] - v[g[1]];
      return Math.sqrt(E * E + C * C);
    }
    function kt(v, d, g) {
      g || (g = rr);
      var E = d[g[0]] - v[g[0]], C = d[g[1]] - v[g[1]];
      return Math.atan2(C, E) * 180 / Math.PI;
    }
    function sr(v, d) {
      return kt(d[1], d[0], bt) - kt(v[1], v[0], bt);
    }
    function di(v, d) {
      return St(d[0], d[1], bt) / St(v[0], v[1], bt);
    }
    var pi = {
      mousedown: G,
      mousemove: ze,
      mouseup: se
    }, mi = "mousedown", _i = "mousemove mouseup";
    function jt() {
      this.evEl = mi, this.evWin = _i, this.allow = !0, this.pressed = !1, we.apply(this, arguments);
    }
    y(jt, we, {
      /**
       * handle mouse events
       * @param {Object} ev
       */
      handler: function(d) {
        var g = pi[d.type];
        g & G && d.button === 0 && (this.pressed = !0), g & ze && d.which !== 1 && (g = se), !(!this.pressed || !this.allow) && (g & se && (this.pressed = !1), this.callback(this.manager, g, {
          pointers: [d],
          changedPointers: [d],
          pointerType: Se,
          srcEvent: d
        }));
      }
    });
    var yi = {
      pointerdown: G,
      pointermove: ze,
      pointerup: se,
      pointercancel: re,
      pointerout: re
    }, gi = {
      2: ue,
      3: ht,
      4: Se,
      5: xt
      // see https://twitter.com/jacobrossi/status/480596438489890816
    }, Wt = "pointerdown", or = "pointermove pointerup pointercancel";
    t.MSPointerEvent && (Wt = "MSPointerDown", or = "MSPointerMove MSPointerUp MSPointerCancel");
    function Xe() {
      this.evEl = Wt, this.evWin = or, we.apply(this, arguments), this.store = this.manager.session.pointerEvents = [];
    }
    y(Xe, we, {
      /**
       * handle mouse events
       * @param {Object} ev
       */
      handler: function(d) {
        var g = this.store, E = !1, C = d.type.toLowerCase().replace("ms", ""), F = yi[C], ee = gi[d.pointerType] || d.pointerType, Ce = ee == ue, Pe = k(g, d.pointerId, "pointerId");
        F & G && (d.button === 0 || Ce) ? Pe < 0 && (g.push(d), Pe = g.length - 1) : F & (se | re) && (E = !0), !(Pe < 0) && (g[Pe] = d, this.callback(this.manager, F, {
          pointers: g,
          changedPointers: [d],
          pointerType: ee,
          srcEvent: d
        }), E && g.splice(Pe, 1));
      }
    });
    var hr = {
      touchstart: G,
      touchmove: ze,
      touchend: se,
      touchcancel: re
    }, lr = "touchstart", zr = "touchstart touchmove touchend touchcancel";
    function Or() {
      this.evTarget = lr, this.evWin = zr, this.started = !1, we.apply(this, arguments);
    }
    y(Or, we, {
      handler: function(d) {
        var g = hr[d.type];
        if (g === G && (this.started = !0), !!this.started) {
          var E = Ir.call(this, d, g);
          g & (se | re) && E[0].length - E[1].length === 0 && (this.started = !1), this.callback(this.manager, g, {
            pointers: E[0],
            changedPointers: E[1],
            pointerType: ue,
            srcEvent: d
          });
        }
      }
    });
    function Ir(v, d) {
      var g = W(v.touches), E = W(v.changedTouches);
      return d & (se | re) && (g = O(g.concat(E), "identifier", !0)), [g, E];
    }
    var wi = {
      touchstart: G,
      touchmove: ze,
      touchend: se,
      touchcancel: re
    }, Dr = "touchstart touchmove touchend touchcancel";
    function Pt() {
      this.evTarget = Dr, this.targetIds = {}, we.apply(this, arguments);
    }
    y(Pt, we, {
      handler: function(d) {
        var g = wi[d.type], E = xi.call(this, d, g);
        E && this.callback(this.manager, g, {
          pointers: E[0],
          changedPointers: E[1],
          pointerType: ue,
          srcEvent: d
        });
      }
    });
    function xi(v, d) {
      var g = W(v.touches), E = this.targetIds;
      if (d & (G | ze) && g.length === 1)
        return E[g[0].identifier] = !0, [g, g];
      var C, F, ee = W(v.changedTouches), Ce = [], Pe = this.target;
      if (F = g.filter(function(Ue) {
        return S(Ue.target, Pe);
      }), d === G)
        for (C = 0; C < F.length; )
          E[F[C].identifier] = !0, C++;
      for (C = 0; C < ee.length; )
        E[ee[C].identifier] && Ce.push(ee[C]), d & (se | re) && delete E[ee[C].identifier], C++;
      if (Ce.length)
        return [
          // merge targetTouches with changedTargetTouches so it contains ALL touches, including 'end' and 'cancel'
          O(F.concat(Ce), "identifier", !0),
          Ce
        ];
    }
    function cr() {
      we.apply(this, arguments);
      var v = M(this.handler, this);
      this.touch = new Pt(this.manager, v), this.mouse = new jt(this.manager, v);
    }
    y(cr, we, {
      /**
       * handle mouse and touch events
       * @param {Hammer} manager
       * @param {String} inputEvent
       * @param {Object} inputData
       */
      handler: function(d, g, E) {
        var C = E.pointerType == ue, F = E.pointerType == Se;
        if (C)
          this.mouse.allow = !1;
        else if (F && !this.mouse.allow)
          return;
        g & (se | re) && (this.mouse.allow = !0), this.callback(d, g, E);
      },
      /**
       * remove the event listeners
       */
      destroy: function() {
        this.touch.destroy(), this.mouse.destroy();
      }
    });
    var vr = X(s.style, "touchAction"), Hr = vr !== n, Fr = "compute", Nr = "auto", fr = "manipulation", m = "none", T = "pan-x", P = "pan-y";
    function I(v, d) {
      this.manager = v, this.set(d);
    }
    I.prototype = {
      /**
       * set the touchAction value on the element or enable the polyfill
       * @param {String} value
       */
      set: function(v) {
        v == Fr && (v = this.compute()), Hr && (this.manager.element.style[vr] = v), this.actions = v.toLowerCase().trim();
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
        }), Z(v.join(" "));
      },
      /**
       * this method is called on each input cycle and provides the preventing of the browser behavior
       * @param {Object} input
       */
      preventDefaults: function(v) {
        if (!Hr) {
          var d = v.srcEvent, g = v.offsetDirection;
          if (this.manager.session.prevented) {
            d.preventDefault();
            return;
          }
          var E = this.actions, C = V(E, m), F = V(E, P), ee = V(E, T);
          if (C || F && g & He || ee && g & Fe)
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
    function Z(v) {
      if (V(v, m))
        return m;
      var d = V(v, T), g = V(v, P);
      return d && g ? T + " " + P : d || g ? d ? T : P : V(v, fr) ? fr : Nr;
    }
    var Q = 1, H = 2, j = 4, le = 8, J = le, oe = 16, ve = 32;
    function be(v) {
      this.id = z(), this.manager = null, this.options = w(v || {}, this.defaults), this.options.enable = L(this.options.enable, !0), this.state = Q, this.simultaneous = {}, this.requireFail = [];
    }
    be.prototype = {
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
        return _(this.options, v), this.manager && this.manager.touchAction.update(), this;
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
        return v = kr(v, this), d[v.id] || (d[v.id] = v, v.recognizeWith(this)), this;
      },
      /**
       * drop the simultaneous link. it doesnt remove the link on the other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      dropRecognizeWith: function(v) {
        return u(v, "dropRecognizeWith", this) ? this : (v = kr(v, this), delete this.simultaneous[v.id], this);
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
        return v = kr(v, this), k(d, v) === -1 && (d.push(v), v.requireFailure(this)), this;
      },
      /**
       * drop the requireFailure link. it does not remove the link on the other recognizer.
       * @param {Recognizer} otherRecognizer
       * @returns {Recognizer} this
       */
      dropRequireFailure: function(v) {
        if (u(v, "dropRequireFailure", this))
          return this;
        v = kr(v, this);
        var d = k(this.requireFail, v);
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
          d.manager.emit(d.options.event + (C ? Vr(g) : ""), v);
        }
        g < le && E(!0), E(), g >= le && E(!0);
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
        this.state = ve;
      },
      /**
       * can we emit?
       * @returns {boolean}
       */
      canEmit: function() {
        for (var v = 0; v < this.requireFail.length; ) {
          if (!(this.requireFail[v].state & (ve | Q)))
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
        var d = _({}, v);
        if (!b(this.options.enable, [this, d])) {
          this.reset(), this.state = ve;
          return;
        }
        this.state & (J | oe | ve) && (this.state = Q), this.state = this.process(d), this.state & (H | j | le | oe) && this.tryEmit(d);
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
    function Vr(v) {
      return v & oe ? "cancel" : v & le ? "end" : v & j ? "move" : v & H ? "start" : "";
    }
    function Ne(v) {
      return v == Et ? "down" : v == lt ? "up" : v == qe ? "left" : v == Mt ? "right" : "";
    }
    function kr(v, d) {
      var g = d.manager;
      return g ? g.get(v) : v;
    }
    function je() {
      be.apply(this, arguments);
    }
    y(je, be, {
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
        var d = this.state, g = v.eventType, E = d & (H | j), C = this.attrTest(v);
        return E && (g & re || !C) ? d | oe : E || C ? g & se ? d | le : d & H ? d | j : H : ve;
      }
    });
    function jr() {
      je.apply(this, arguments), this.pX = null, this.pY = null;
    }
    y(jr, je, {
      /**
       * @namespace
       * @memberof PanRecognizer
       */
      defaults: {
        event: "pan",
        threshold: 10,
        pointers: 1,
        direction: Tt
      },
      getTouchAction: function() {
        var v = this.options.direction, d = [];
        return v & He && d.push(P), v & Fe && d.push(T), d;
      },
      directionTest: function(v) {
        var d = this.options, g = !0, E = v.distance, C = v.direction, F = v.deltaX, ee = v.deltaY;
        return C & d.direction || (d.direction & He ? (C = F === 0 ? Re : F < 0 ? qe : Mt, g = F != this.pX, E = Math.abs(v.deltaX)) : (C = ee === 0 ? Re : ee < 0 ? lt : Et, g = ee != this.pY, E = Math.abs(v.deltaY))), v.direction = C, g && E > d.threshold && C & d.direction;
      },
      attrTest: function(v) {
        return je.prototype.attrTest.call(this, v) && (this.state & H || !(this.state & H) && this.directionTest(v));
      },
      emit: function(v) {
        this.pX = v.deltaX, this.pY = v.deltaY;
        var d = Ne(v.direction);
        d && this.manager.emit(this.options.event + d, v), this._super.emit.call(this, v);
      }
    });
    function Mi() {
      je.apply(this, arguments);
    }
    y(Mi, je, {
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
        return [m];
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
    function Ei() {
      be.apply(this, arguments), this._timer = null, this._input = null;
    }
    y(Ei, be, {
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
        return [Nr];
      },
      process: function(v) {
        var d = this.options, g = v.pointers.length === d.pointers, E = v.distance < d.threshold, C = v.deltaTime > d.time;
        if (this._input = v, !E || !g || v.eventType & (se | re) && !C)
          this.reset();
        else if (v.eventType & G)
          this.reset(), this._timer = f(function() {
            this.state = J, this.tryEmit();
          }, d.time, this);
        else if (v.eventType & se)
          return J;
        return ve;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function(v) {
        this.state === J && (v && v.eventType & se ? this.manager.emit(this.options.event + "up", v) : (this._input.timeStamp = c(), this.manager.emit(this.options.event, this._input)));
      }
    });
    function Ti() {
      je.apply(this, arguments);
    }
    y(Ti, je, {
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
        return [m];
      },
      attrTest: function(v) {
        return this._super.attrTest.call(this, v) && (Math.abs(v.rotation) > this.options.threshold || this.state & H);
      }
    });
    function bi() {
      je.apply(this, arguments);
    }
    y(bi, je, {
      /**
       * @namespace
       * @memberof SwipeRecognizer
       */
      defaults: {
        event: "swipe",
        threshold: 10,
        velocity: 0.65,
        direction: He | Fe,
        pointers: 1
      },
      getTouchAction: function() {
        return jr.prototype.getTouchAction.call(this);
      },
      attrTest: function(v) {
        var d = this.options.direction, g;
        return d & (He | Fe) ? g = v.velocity : d & He ? g = v.velocityX : d & Fe && (g = v.velocityY), this._super.attrTest.call(this, v) && d & v.direction && v.distance > this.options.threshold && l(g) > this.options.velocity && v.eventType & se;
      },
      emit: function(v) {
        var d = Ne(v.direction);
        d && this.manager.emit(this.options.event + d, v), this.manager.emit(this.options.event, v);
      }
    });
    function Wr() {
      be.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0;
    }
    y(Wr, be, {
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
        return [fr];
      },
      process: function(v) {
        var d = this.options, g = v.pointers.length === d.pointers, E = v.distance < d.threshold, C = v.deltaTime < d.time;
        if (this.reset(), v.eventType & G && this.count === 0)
          return this.failTimeout();
        if (E && C && g) {
          if (v.eventType != se)
            return this.failTimeout();
          var F = this.pTime ? v.timeStamp - this.pTime < d.interval : !0, ee = !this.pCenter || St(this.pCenter, v.center) < d.posThreshold;
          this.pTime = v.timeStamp, this.pCenter = v.center, !ee || !F ? this.count = 1 : this.count += 1, this._input = v;
          var Ce = this.count % d.taps;
          if (Ce === 0)
            return this.hasRequireFailures() ? (this._timer = f(function() {
              this.state = J, this.tryEmit();
            }, d.interval, this), H) : J;
        }
        return ve;
      },
      failTimeout: function() {
        return this._timer = f(function() {
          this.state = ve;
        }, this.options.interval, this), ve;
      },
      reset: function() {
        clearTimeout(this._timer);
      },
      emit: function() {
        this.state == J && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input));
      }
    });
    function ct(v, d) {
      return d = d || {}, d.recognizers = L(d.recognizers, ct.defaults.preset), new Ci(v, d);
    }
    ct.VERSION = "2.0.4", ct.defaults = {
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
      touchAction: Fr,
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
        [Ti, { enable: !1 }],
        [Mi, { enable: !1 }, ["rotate"]],
        [bi, { direction: He }],
        [jr, { direction: He }, ["swipe"]],
        [Wr],
        [Wr, { event: "doubletap", taps: 2 }, ["tap"]],
        [Ei]
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
    var Eo = 1, xn = 2;
    function Ci(v, d) {
      d = d || {}, this.options = w(d, ct.defaults), this.options.inputTarget = this.options.inputTarget || v, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = v, this.input = ci(this), this.touchAction = new I(this, this.options.touchAction), Mn(this, !0), p(d.recognizers, function(g) {
        var E = this.add(new g[0](g[1]));
        g[2] && E.recognizeWith(g[2]), g[3] && E.requireFailure(g[3]);
      }, this);
    }
    Ci.prototype = {
      /**
       * set options
       * @param {Object} options
       * @returns {Manager}
       */
      set: function(v) {
        return _(this.options, v), v.touchAction && this.touchAction.update(), v.inputTarget && (this.input.destroy(), this.input.target = v.inputTarget, this.input.init()), this;
      },
      /**
       * stop recognizing for this session.
       * This session will be discarded, when a new [input]start event is fired.
       * When forced, the recognizer cycle is stopped immediately.
       * @param {Boolean} [force]
       */
      stop: function(v) {
        this.session.stopped = v ? xn : Eo;
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
          (!C || C && C.state & J) && (C = d.curRecognizer = null);
          for (var F = 0; F < E.length; )
            g = E[F], d.stopped !== xn && // 1
            (!C || g == C || // 2
            g.canRecognizeWith(C)) ? g.recognize(v) : g.reset(), !C && g.state & (H | j | le) && (C = d.curRecognizer = g), F++;
        }
      },
      /**
       * get a recognizer by its event name.
       * @param {Recognizer|String} recognizer
       * @returns {Recognizer|Null}
       */
      get: function(v) {
        if (v instanceof be)
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
        return v = this.get(v), d.splice(k(d, v), 1), this.touchAction.update(), this;
      },
      /**
       * bind event
       * @param {String} events
       * @param {Function} handler
       * @returns {EventEmitter} this
       */
      on: function(v, d) {
        var g = this.handlers;
        return p(q(v), function(E) {
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
        return p(q(v), function(E) {
          d ? g[E].splice(k(g[E], d), 1) : delete g[E];
        }), this;
      },
      /**
       * emit event to the listeners
       * @param {String} event
       * @param {Object} data
       */
      emit: function(v, d) {
        this.options.domEvents && To(v, d);
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
        this.element && Mn(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null;
      }
    };
    function Mn(v, d) {
      var g = v.element;
      p(v.options.cssProps, function(E, C) {
        g.style[X(g.style, C)] = d ? E : "";
      });
    }
    function To(v, d) {
      var g = r.createEvent("Event");
      g.initEvent(v, !0, !0), g.gesture = d, d.target.dispatchEvent(g);
    }
    _(ct, {
      INPUT_START: G,
      INPUT_MOVE: ze,
      INPUT_END: se,
      INPUT_CANCEL: re,
      STATE_POSSIBLE: Q,
      STATE_BEGAN: H,
      STATE_CHANGED: j,
      STATE_ENDED: le,
      STATE_RECOGNIZED: J,
      STATE_CANCELLED: oe,
      STATE_FAILED: ve,
      DIRECTION_NONE: Re,
      DIRECTION_LEFT: qe,
      DIRECTION_RIGHT: Mt,
      DIRECTION_UP: lt,
      DIRECTION_DOWN: Et,
      DIRECTION_HORIZONTAL: He,
      DIRECTION_VERTICAL: Fe,
      DIRECTION_ALL: Tt,
      Manager: Ci,
      Input: we,
      TouchAction: I,
      TouchInput: Pt,
      MouseInput: jt,
      PointerEventInput: Xe,
      TouchMouseInput: cr,
      SingleTouchInput: Or,
      Recognizer: be,
      AttrRecognizer: je,
      Tap: Wr,
      Pan: jr,
      Swipe: bi,
      Pinch: Mi,
      Rotate: Ti,
      Press: Ei,
      on: $,
      off: R,
      each: p,
      merge: w,
      extend: _,
      inherit: y,
      bindFn: M,
      prefixed: X
    }), typeof n == o && n.amd ? n(function() {
      return ct;
    }) : e.exports ? e.exports = ct : t[i] = ct;
  })(window, document, "Hammer");
})(Js);
var eo = Js.exports, Xt = eo, r_ = 1, Hi = "MarzipanoHammerElementId";
function to(e, t) {
  return e[Hi] || (e[Hi] = r_++), t + e[Hi];
}
function si() {
  this._managers = {}, this._refCount = {};
}
si.prototype.get = function(e, t) {
  var r = to(e, t);
  return this._managers[r] || (this._managers[r] = this._createManager(e, t), this._refCount[r] = 0), this._refCount[r]++, new oi(this, this._managers[r], e, t);
};
si.prototype._createManager = function(e, t) {
  var r = new Xt.Manager(e);
  return t === "mouse" ? r.add(new Xt.Pan({ direction: Xt.DIRECTION_ALL, threshold: 0 })) : (t === "touch" || t === "pen" || t === "kinect") && (r.add(new Xt.Pan({ direction: Xt.DIRECTION_ALL, threshold: 20, pointers: 1 })), r.add(new Xt.Pinch())), r;
};
si.prototype._releaseHandle = function(e, t) {
  var r = to(e, t);
  this._refCount[r] && (this._refCount[r]--, this._refCount[r] || (this._managers[r].destroy(), delete this._managers[r], delete this._refCount[r]));
};
function oi(e, t, r, i) {
  this._manager = t, this._element = r, this._type = i, this._hammerGestures = e, this._eventHandlers = [];
}
oi.prototype.on = function(e, t) {
  var r = this._type, i = function(n) {
    r === n.pointerType && t(n);
  };
  this._eventHandlers.push({ events: e, handler: i }), this._manager.on(e, i);
};
oi.prototype.release = function() {
  for (var e = 0; e < this._eventHandlers.length; e++) {
    var t = this._eventHandlers[e];
    this._manager.off(t.events, t.handler);
  }
  this._hammerGestures._releaseHandle(this._element, this._type), this._manager = null, this._element = null, this._type = null, this._hammerGestures = null;
};
oi.prototype.manager = function() {
  return this._manager;
};
var hi = new si();
function i_(e, t, r, i, n) {
  var a = Math.sqrt(Math.pow(t, 2) + Math.pow(r, 2));
  e = Math.max(e, a / i), ro(t, r, e, n), n[0] = Math.abs(n[0]), n[1] = Math.abs(n[1]);
}
function ro(e, t, r, i) {
  var n = Math.atan(t / e);
  i[0] = r * Math.cos(n), i[1] = r * Math.sin(n);
}
var io = {
  maxFriction: i_,
  changeVectorNorm: ro
}, n_ = ce, Vn = st, a_ = hi, s_ = Qe, o_ = io.maxFriction, h_ = he, l_ = {
  friction: 6,
  maxFrictionTime: 0.3,
  hammerEvent: "pan"
}, kn = typeof MARZIPANODEBUG < "u" && MARZIPANODEBUG.controls;
function ot(e, t, r) {
  if (this._element = e, this._opts = s_(r || {}, l_), this._startEvent = null, this._lastEvent = null, this._active = !1, this._dynamics = {
    x: new Vn(),
    y: new Vn()
  }, this._hammer = a_.get(e, t), this._hammer.on("hammer.input", this._handleHammerEvent.bind(this)), this._opts.hammerEvent != "pan" && this._opts.hammerEvent != "pinch")
    throw new Error(this._opts.hammerEvent + " is not a hammerEvent managed in DragControlMethod");
  this._hammer.on(this._opts.hammerEvent + "start", this._handleStart.bind(this)), this._hammer.on(this._opts.hammerEvent + "move", this._handleMove.bind(this)), this._hammer.on(this._opts.hammerEvent + "end", this._handleEnd.bind(this)), this._hammer.on(this._opts.hammerEvent + "cancel", this._handleEnd.bind(this));
}
n_(ot);
ot.prototype.destroy = function() {
  this._hammer.release(), h_(this);
};
ot.prototype._handleHammerEvent = function(e) {
  if (e.isFirst) {
    if (kn && this._active)
      throw new Error("DragControlMethod active detected when already active");
    this._active = !0, this.emit("active");
  }
  if (e.isFinal) {
    if (kn && !this._active)
      throw new Error("DragControlMethod inactive detected when already inactive");
    this._active = !1, this.emit("inactive");
  }
};
ot.prototype._handleStart = function(e) {
  e.preventDefault(), this._startEvent = e;
};
ot.prototype._handleMove = function(e) {
  e.preventDefault(), this._startEvent && (this._updateDynamicsMove(e), this.emit("parameterDynamics", "axisScaledX", this._dynamics.x), this.emit("parameterDynamics", "axisScaledY", this._dynamics.y));
};
ot.prototype._handleEnd = function(e) {
  e.preventDefault(), this._startEvent && (this._updateDynamicsRelease(e), this.emit("parameterDynamics", "axisScaledX", this._dynamics.x), this.emit("parameterDynamics", "axisScaledY", this._dynamics.y)), this._startEvent = !1, this._lastEvent = !1;
};
ot.prototype._updateDynamicsMove = function(e) {
  var t = e.deltaX, r = e.deltaY, i = this._lastEvent || this._startEvent;
  i && (t -= i.deltaX, r -= i.deltaY);
  var n = this._element.getBoundingClientRect(), a = n.right - n.left, s = n.bottom - n.top;
  t /= a, r /= s, this._dynamics.x.reset(), this._dynamics.y.reset(), this._dynamics.x.offset = -t, this._dynamics.y.offset = -r, this._lastEvent = e;
};
var Fi = [null, null];
ot.prototype._updateDynamicsRelease = function(e) {
  var t = this._element.getBoundingClientRect(), r = t.right - t.left, i = t.bottom - t.top, n = 1e3 * e.velocityX / r, a = 1e3 * e.velocityY / i;
  this._dynamics.x.reset(), this._dynamics.y.reset(), this._dynamics.x.velocity = n, this._dynamics.y.velocity = a, o_(this._opts.friction, this._dynamics.x.velocity, this._dynamics.y.velocity, this._opts.maxFrictionTime, Fi), this._dynamics.x.friction = Fi[0], this._dynamics.y.friction = Fi[1];
};
var no = ot, c_ = ce, jn = st, v_ = hi, f_ = Qe, u_ = io.maxFriction, d_ = he, p_ = {
  speed: 8,
  friction: 6,
  maxFrictionTime: 0.3
};
function Vt(e, t, r) {
  this._element = e, this._opts = f_(r || {}, p_), this._active = !1, this._hammer = v_.get(e, t), this._dynamics = {
    x: new jn(),
    y: new jn()
  }, this._hammer.on("panstart", this._handleStart.bind(this)), this._hammer.on("panmove", this._handleMove.bind(this)), this._hammer.on("panend", this._handleRelease.bind(this)), this._hammer.on("pancancel", this._handleRelease.bind(this));
}
c_(Vt);
Vt.prototype.destroy = function() {
  this._hammer.release(), d_(this);
};
Vt.prototype._handleStart = function(e) {
  e.preventDefault(), this._active || (this._active = !0, this.emit("active"));
};
Vt.prototype._handleMove = function(e) {
  e.preventDefault(), this._updateDynamics(e, !1);
};
Vt.prototype._handleRelease = function(e) {
  e.preventDefault(), this._updateDynamics(e, !0), this._active && (this._active = !1, this.emit("inactive"));
};
var Ni = [null, null];
Vt.prototype._updateDynamics = function(e, t) {
  var r = this._element.getBoundingClientRect(), i = r.right - r.left, n = r.bottom - r.top, a = Math.max(i, n), s = e.deltaX / a * this._opts.speed, o = e.deltaY / a * this._opts.speed;
  this._dynamics.x.reset(), this._dynamics.y.reset(), this._dynamics.x.velocity = s, this._dynamics.y.velocity = o, t && (u_(this._opts.friction, this._dynamics.x.velocity, this._dynamics.y.velocity, this._opts.maxFrictionTime, Ni), this._dynamics.x.friction = Ni[0], this._dynamics.y.friction = Ni[1]), this.emit("parameterDynamics", "x", this._dynamics.x), this.emit("parameterDynamics", "y", this._dynamics.y);
};
var ao = Vt, m_ = ce, __ = st, y_ = Qe, g_ = he, w_ = {
  frictionTime: 0.2,
  zoomDelta: 1e-3
};
function Pr(e, t) {
  this._element = e, this._opts = y_(t || {}, w_), this._dynamics = new __(), this._eventList = [];
  var r = this._opts.frictionTime ? this.withSmoothing : this.withoutSmoothing;
  this._wheelListener = r.bind(this), e.addEventListener("wheel", this._wheelListener);
}
m_(Pr);
Pr.prototype.destroy = function() {
  this._element.removeEventListener("wheel", this._wheelListener), g_(this);
};
Pr.prototype.withoutSmoothing = function(e) {
  this._dynamics.offset = so(e) * this._opts.zoomDelta, this.emit("parameterDynamics", "zoom", this._dynamics), e.preventDefault(), this.emit("active"), this.emit("inactive");
};
Pr.prototype.withSmoothing = function(e) {
  var t = e.timeStamp;
  for (this._eventList.push(e); this._eventList[0].timeStamp < t - this._opts.frictionTime * 1e3; )
    this._eventList.shift(0);
  for (var r = 0, i = 0; i < this._eventList.length; i++) {
    var n = so(this._eventList[i]) * this._opts.zoomDelta;
    r += n / this._opts.frictionTime;
  }
  this._dynamics.velocity = r, this._dynamics.friction = Math.abs(r) / this._opts.frictionTime, this.emit("parameterDynamics", "zoom", this._dynamics), e.preventDefault(), this.emit("active"), this.emit("inactive");
};
function so(e) {
  var t = e.deltaMode == 1 ? 20 : 1;
  return e.deltaY * t;
}
var oo = Pr, x_ = ce, M_ = st, E_ = hi, T_ = he;
function er(e, t, r) {
  this._hammer = E_.get(e, t), this._lastEvent = null, this._active = !1, this._dynamics = new M_(), this._hammer.on("pinchstart", this._handleStart.bind(this)), this._hammer.on("pinch", this._handleEvent.bind(this)), this._hammer.on("pinchend", this._handleEnd.bind(this)), this._hammer.on("pinchcancel", this._handleEnd.bind(this));
}
x_(er);
er.prototype.destroy = function() {
  this._hammer.release(), T_(this);
};
er.prototype._handleStart = function() {
  this._active || (this._active = !0, this.emit("active"));
};
er.prototype._handleEnd = function() {
  this._lastEvent = null, this._active && (this._active = !1, this.emit("inactive"));
};
er.prototype._handleEvent = function(e) {
  var t = e.scale;
  this._lastEvent && (t /= this._lastEvent.scale), this._dynamics.offset = (t - 1) * -1, this.emit("parameterDynamics", "zoom", this._dynamics), this._lastEvent = e;
};
var ho = er, b_ = ce, C_ = st, S_ = he;
function Lr(e) {
  if (!e)
    throw new Error("VelocityControlMethod: parameter must be defined");
  this._parameter = e, this._dynamics = new C_();
}
b_(Lr);
Lr.prototype.destroy = function() {
  S_(this);
};
Lr.prototype.setVelocity = function(e) {
  this._dynamics.velocity = e, this.emit("parameterDynamics", this._parameter, this._dynamics);
};
Lr.prototype.setFriction = function(e) {
  this._dynamics.friction = e, this.emit("parameterDynamics", this._parameter, this._dynamics);
};
var P_ = Lr, L_ = ce, $_ = st, R_ = he;
function $r(e, t, r, i) {
  if (!e)
    throw new Error("ElementPressControlMethod: element must be defined");
  if (!t)
    throw new Error("ElementPressControlMethod: parameter must be defined");
  if (!r)
    throw new Error("ElementPressControlMethod: velocity must be defined");
  if (!i)
    throw new Error("ElementPressControlMethod: friction must be defined");
  this._element = e, this._pressHandler = this._handlePress.bind(this), this._releaseHandler = this._handleRelease.bind(this), e.addEventListener("mousedown", this._pressHandler), e.addEventListener("mouseup", this._releaseHandler), e.addEventListener("mouseleave", this._releaseHandler), e.addEventListener("touchstart", this._pressHandler), e.addEventListener("touchmove", this._releaseHandler), e.addEventListener("touchend", this._releaseHandler), this._parameter = t, this._velocity = r, this._friction = i, this._dynamics = new $_(), this._pressing = !1;
}
L_($r);
$r.prototype.destroy = function() {
  this._element.removeEventListener("mousedown", this._pressHandler), this._element.removeEventListener("mouseup", this._releaseHandler), this._element.removeEventListener("mouseleave", this._releaseHandler), this._element.removeEventListener("touchstart", this._pressHandler), this._element.removeEventListener("touchmove", this._releaseHandler), this._element.removeEventListener("touchend", this._releaseHandler), R_(this);
};
$r.prototype._handlePress = function() {
  this._pressing = !0, this._dynamics.velocity = this._velocity, this._dynamics.friction = 0, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("active");
};
$r.prototype._handleRelease = function() {
  this._pressing && (this._dynamics.friction = this._friction, this.emit("parameterDynamics", this._parameter, this._dynamics), this.emit("inactive")), this._pressing = !1;
};
var A_ = $r, z_ = ce, O_ = st, I_ = Ot, D_ = he;
function Ye(e) {
  e = e || {}, this._methods = [], this._parameters = ["x", "y", "axisScaledX", "axisScaledY", "zoom", "yaw", "pitch", "roll"], this._now = e.nowForTesting || I_, this._composedOffsets = {}, this._composeReturn = { offsets: this._composedOffsets, changing: null };
}
z_(Ye);
Ye.prototype.add = function(e) {
  if (!this.has(e)) {
    var t = {};
    this._parameters.forEach(function(n) {
      t[n] = {
        dynamics: new O_(),
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
Ye.prototype.remove = function(e) {
  var t = this._indexOfInstance(e);
  if (t >= 0) {
    var r = this._methods.splice(t, 1)[0];
    r.instance.removeEventListener("parameterDynamics", r.parameterDynamicsHandler);
  }
};
Ye.prototype.has = function(e) {
  return this._indexOfInstance(e) >= 0;
};
Ye.prototype._indexOfInstance = function(e) {
  for (var t = 0; t < this._methods.length; t++)
    if (this._methods[t].instance === e)
      return t;
  return -1;
};
Ye.prototype.list = function() {
  for (var e = [], t = 0; t < this._methods.length; t++)
    e.push(this._methods[t].instance);
  return e;
};
Ye.prototype._updateDynamics = function(e, t, r) {
  var i = e[t];
  if (!i)
    throw new Error("Unknown control parameter " + t);
  var n = this._now();
  i.dynamics.update(r, (n - i.time) / 1e3), i.time = n, this.emit("change");
};
Ye.prototype._resetComposedOffsets = function() {
  for (var e = 0; e < this._parameters.length; e++)
    this._composedOffsets[this._parameters[e]] = 0;
};
Ye.prototype.offsets = function() {
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
Ye.prototype.destroy = function() {
  for (var e = this.list(), t = 0; t < e.length; t++)
    this.remove(e[t]);
  D_(this);
};
var H_ = Ye, F_ = ce, N_ = H_, V_ = he, lo = typeof MARZIPANODEBUG < "u" && MARZIPANODEBUG.controls;
function ae(e) {
  e = e || {}, this._methods = {}, this._methodGroups = {}, this._composer = new N_(), this._enabled = e && e.enabled ? !!e.enabled : !0, this._activeCount = 0, this.updatedViews_ = [], this._attachedRenderLoop = null;
}
F_(ae);
ae.prototype.destroy = function() {
  this.detach(), this._composer.destroy(), V_(this);
};
ae.prototype.methods = function() {
  var e = {};
  for (var t in this._methods)
    e[t] = this._methods[t];
  return e;
};
ae.prototype.method = function(e) {
  return this._methods[e];
};
ae.prototype.registerMethod = function(e, t, r) {
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
ae.prototype.unregisterMethod = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("No control method registered with id " + e);
  t.enabled && this.disableMethod(e), delete this._methods[e];
};
ae.prototype.enableMethod = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("No control method registered with id " + e);
  t.enabled || (t.enabled = !0, t.active && this._incrementActiveCount(), this._listen(e), this._updateComposer(), this.emit("methodEnabled", e));
};
ae.prototype.disableMethod = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("No control method registered with id " + e);
  t.enabled && (t.enabled = !1, t.active && this._decrementActiveCount(), this._unlisten(e), this._updateComposer(), this.emit("methodDisabled", e));
};
ae.prototype.addMethodGroup = function(e, t) {
  this._methodGroups[e] = t;
};
ae.prototype.removeMethodGroup = function(e) {
  delete this._methodGroups[e];
};
ae.prototype.methodGroups = function() {
  var e = {};
  for (var t in this._methodGroups)
    e[t] = this._methodGroups[t];
  return e;
};
ae.prototype.enableMethodGroup = function(e) {
  var t = this;
  t._methodGroups[e].forEach(function(r) {
    t.enableMethod(r);
  });
};
ae.prototype.disableMethodGroup = function(e) {
  var t = this;
  t._methodGroups[e].forEach(function(r) {
    t.disableMethod(r);
  });
};
ae.prototype.enabled = function() {
  return this._enabled;
};
ae.prototype.enable = function() {
  this._enabled || (this._enabled = !0, this._activeCount > 0 && this.emit("active"), this.emit("enabled"), this._updateComposer());
};
ae.prototype.disable = function() {
  this._enabled && (this._enabled = !1, this._activeCount > 0 && this.emit("inactive"), this.emit("disabled"), this._updateComposer());
};
ae.prototype.attach = function(e) {
  this._attachedRenderLoop && this.detach(), this._attachedRenderLoop = e, this._beforeRenderHandler = this._updateViewsWithControls.bind(this), this._changeHandler = e.renderOnNextFrame.bind(e), this._attachedRenderLoop.addEventListener("beforeRender", this._beforeRenderHandler), this._composer.addEventListener("change", this._changeHandler);
};
ae.prototype.detach = function() {
  this._attachedRenderLoop && (this._attachedRenderLoop.removeEventListener("beforeRender", this._beforeRenderHandler), this._composer.removeEventListener("change", this._changeHandler), this._beforeRenderHandler = null, this._changeHandler = null, this._attachedRenderLoop = null);
};
ae.prototype.attached = function() {
  return this._attachedRenderLoop != null;
};
ae.prototype._listen = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("Bad method id");
  t.instance.addEventListener("active", t.activeHandler), t.instance.addEventListener("inactive", t.inactiveHandler);
};
ae.prototype._unlisten = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("Bad method id");
  t.instance.removeEventListener("active", t.activeHandler), t.instance.removeEventListener("inactive", t.inactiveHandler);
};
ae.prototype._handleActive = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("Bad method id");
  if (!t.enabled)
    throw new Error("Should not receive event from disabled control method");
  t.active || (t.active = !0, this._incrementActiveCount());
};
ae.prototype._handleInactive = function(e) {
  var t = this._methods[e];
  if (!t)
    throw new Error("Bad method id");
  if (!t.enabled)
    throw new Error("Should not receive event from disabled control method");
  t.active && (t.active = !1, this._decrementActiveCount());
};
ae.prototype._incrementActiveCount = function() {
  this._activeCount++, lo && this._checkActiveCount(), this._enabled && this._activeCount === 1 && this.emit("active");
};
ae.prototype._decrementActiveCount = function() {
  this._activeCount--, lo && this._checkActiveCount(), this._enabled && this._activeCount === 0 && this.emit("inactive");
};
ae.prototype._checkActiveCount = function() {
  var e = 0;
  for (var t in this._methods) {
    var r = this._methods[t];
    r.enabled && r.active && e++;
  }
  if (e != this._activeCount)
    throw new Error("Bad control state");
};
ae.prototype._updateComposer = function() {
  var e = this._composer;
  for (var t in this._methods) {
    var r = this._methods[t], i = this._enabled && r.enabled;
    i && !e.has(r.instance) && e.add(r.instance), !i && e.has(r.instance) && e.remove(r.instance);
  }
};
ae.prototype._updateViewsWithControls = function() {
  var e = this._composer.offsets();
  e.changing && this._attachedRenderLoop.renderOnNextFrame(), this.updatedViews_.length = 0;
  for (var t = this._attachedRenderLoop.stage().listLayers(), r = 0; r < t.length; r++) {
    var i = t[r].view();
    this.updatedViews_.indexOf(i) < 0 && (t[r].view().updateWithControlParameters(e.offsets), this.updatedViews_.push(i));
  }
};
var co = ae, k_ = Ae.setTransform, Wn = mn;
function j_(e, t, r, i) {
  i = i || "";
  var n = "translateX(" + Wn(t) + "px) translateY(" + Wn(r) + "px) translateZ(0) " + i;
  k_(e, n);
}
var vo = j_, W_ = ce, Y_ = vo, q_ = Ae.setTransform, X_ = he;
function Ie(e, t, r, i, n) {
  n = n || {}, n.perspective = n.perspective || {}, n.perspective.extraTransforms = n.perspective.extraTransforms != null ? n.perspective.extraTransforms : "", this._domElement = e, this._parentDomElement = t, this._view = r, this._coords = {}, this._perspective = {}, this.setPosition(i), this._parentDomElement.appendChild(this._domElement), this.setPerspective(n.perspective), this._visible = !0, this._position = { x: 0, y: 0 };
}
W_(Ie);
Ie.prototype.destroy = function() {
  this._parentDomElement.removeChild(this._domElement), X_(this);
};
Ie.prototype.domElement = function() {
  return this._domElement;
};
Ie.prototype.position = function() {
  return this._coords;
};
Ie.prototype.setPosition = function(e) {
  for (var t in e)
    this._coords[t] = e[t];
  this._update();
};
Ie.prototype.perspective = function() {
  return this._perspective;
};
Ie.prototype.setPerspective = function(e) {
  for (var t in e)
    this._perspective[t] = e[t];
  this._update();
};
Ie.prototype.show = function() {
  this._visible || (this._visible = !0, this._update());
};
Ie.prototype.hide = function() {
  this._visible && (this._visible = !1, this._update());
};
Ie.prototype._update = function() {
  var e = this._domElement, t = this._coords, r = this._position, i, n, a = !1;
  if (this._visible) {
    var s = this._view;
    this._perspective.radius ? (a = !0, this._setEmbeddedPosition(s, t)) : (s.coordinatesToScreen(t, r), i = r.x, n = r.y, i != null && n != null && (a = !0, this._setPosition(i, n)));
  }
  a ? (e.style.display = "block", e.style.position = "absolute") : (e.style.display = "none", e.style.position = "");
};
Ie.prototype._setEmbeddedPosition = function(e, t) {
  var r = e.coordinatesToPerspectiveTransform(
    t,
    this._perspective.radius,
    this._perspective.extraTransforms
  );
  q_(this._domElement, r);
};
Ie.prototype._setPosition = function(e, t) {
  Y_(this._domElement, e, t, this._perspective.extraTransforms);
};
var fo = Ie, U_ = ce, B_ = fo, G_ = na, Yn = vo, qn = Ae.setAbsolute, Z_ = Ae.setOverflowHidden, K_ = Ae.setOverflowVisible, Q_ = Ae.setNullSize, J_ = Ae.setPixelSize, Xn = Ae.setWithVendorPrefix("pointer-events"), e0 = he;
function De(e, t, r, i, n) {
  n = n || {}, this._parentDomElement = e, this._stage = t, this._view = r, this._renderLoop = i, this._hotspots = [], this._visible = !0, this._rect = n.rect, this._visibilityOrRectChanged = !0, this._stageWidth = null, this._stageHeight = null, this._tmpRect = {}, this._hotspotContainerWrapper = document.createElement("div"), qn(this._hotspotContainerWrapper), Xn(this._hotspotContainerWrapper, "none"), this._parentDomElement.appendChild(this._hotspotContainerWrapper), this._hotspotContainer = document.createElement("div"), qn(this._hotspotContainer), Xn(this._hotspotContainer, "all"), this._hotspotContainerWrapper.appendChild(this._hotspotContainer), this._updateHandler = this._update.bind(this), this._renderLoop.addEventListener("afterRender", this._updateHandler);
}
U_(De);
De.prototype.destroy = function() {
  for (; this._hotspots.length; )
    this.destroyHotspot(this._hotspots[0]);
  this._parentDomElement.removeChild(this._hotspotContainerWrapper), this._renderLoop.removeEventListener("afterRender", this._updateHandler), e0(this);
};
De.prototype.domElement = function() {
  return this._hotspotContainer;
};
De.prototype.setRect = function(e) {
  this._rect = e, this._visibilityOrRectChanged = !0;
};
De.prototype.rect = function() {
  return this._rect;
};
De.prototype.createHotspot = function(e, t, r) {
  t = t || {};
  var i = new B_(
    e,
    this._hotspotContainer,
    this._view,
    t,
    r
  );
  return this._hotspots.push(i), i._update(), this.emit("hotspotsChange"), i;
};
De.prototype.hasHotspot = function(e) {
  return this._hotspots.indexOf(e) >= 0;
};
De.prototype.listHotspots = function() {
  return [].concat(this._hotspots);
};
De.prototype.destroyHotspot = function(e) {
  var t = this._hotspots.indexOf(e);
  if (t < 0)
    throw new Error("No such hotspot");
  this._hotspots.splice(t, 1), e.destroy(), this.emit("hotspotsChange");
};
De.prototype.hide = function() {
  this._visible && (this._visible = !1, this._visibilityOrRectChanged = !0, this._update());
};
De.prototype.show = function() {
  this._visible || (this._visible = !0, this._visibilityOrRectChanged = !0, this._update());
};
De.prototype._update = function() {
  var e = this._hotspotContainerWrapper, t = this._stage.width(), r = this._stage.height(), i = this._tmpRect;
  if (this._visibilityOrRectChanged || this._rect && (t !== this._stageWidth || r !== this._stageHeight)) {
    var n = this._visible;
    e.style.display = n ? "block" : "none", n && (this._rect ? (G_(t, r, this._rect, i), Yn(e, t * i.x, r * i.y), J_(e, t * i.width, r * i.height), Z_(e)) : (Yn(e, 0, 0), Q_(e), K_(e))), this._stageWidth = t, this._stageHeight = r, this._visibilityOrRectChanged = !1;
  }
  for (var a = 0; a < this._hotspots.length; a++)
    this._hotspots[a]._update();
};
var uo = De, t0 = Zs, r0 = Bs, i0 = uo, n0 = ce, po = Ot, a0 = Cr, s0 = Tr, Un = Qe, o0 = he;
function pe(e, t) {
  this._viewer = e, this._view = t, this._layers = [], this._hotspotContainer = new i0(
    e._controlContainer,
    e.stage(),
    this._view,
    e.renderLoop()
  ), this._movement = null, this._movementStartTime = null, this._movementStep = null, this._movementParams = null, this._movementCallback = null, this._updateMovementHandler = this._updateMovement.bind(this), this._updateHotspotContainerHandler = this._updateHotspotContainer.bind(this), this._viewer.addEventListener("sceneChange", this._updateHotspotContainerHandler), this._viewChangeHandler = this.emit.bind(this, "viewChange"), this._view.addEventListener("change", this._viewChangeHandler), this._updateHotspotContainer();
}
n0(pe);
pe.prototype.destroy = function() {
  this._view.removeEventListener("change", this._viewChangeHandler), this._viewer.removeEventListener("sceneChange", this._updateHotspotContainerHandler), this._movement && this.stopMovement(), this._hotspotContainer.destroy(), this.destroyAllLayers(), o0(this);
};
pe.prototype.hotspotContainer = function() {
  return this._hotspotContainer;
};
pe.prototype.layer = function() {
  return this._layers[0];
};
pe.prototype.listLayers = function() {
  return [].concat(this._layers);
};
pe.prototype.view = function() {
  return this._view;
};
pe.prototype.viewer = function() {
  return this._viewer;
};
pe.prototype.visible = function() {
  return this._viewer.scene() === this;
};
pe.prototype.createLayer = function(e) {
  e = e || {};
  var t = e.textureStoreOpts || {}, r = e.layerOpts || {}, i = e.source, n = e.geometry, a = this._view, s = this._viewer.stage(), o = new r0(i, s, t), h = new t0(i, n, a, o, r);
  return this._layers.push(h), e.pinFirstLevel && h.pinFirstLevel(), this.emit("layerChange"), h;
};
pe.prototype.destroyLayer = function(e) {
  var t = this._layers.indexOf(e);
  if (t < 0)
    throw new Error("No such layer in scene");
  this._layers.splice(t, 1), this.emit("layerChange"), e.textureStore().destroy(), e.destroy();
};
pe.prototype.destroyAllLayers = function() {
  for (; this._layers.length > 0; )
    this.destroyLayer(this._layers[0]);
};
pe.prototype.switchTo = function(e, t) {
  return this._viewer.switchScene(this, e, t);
};
pe.prototype.lookTo = function(e, t, r) {
  var i = this;
  if (t = t || {}, r = r || a0, s0(e) !== "object")
    throw new Error("Target view parameters must be an object");
  var n = function(_) {
    return (_ *= 2) < 1 ? 0.5 * _ * _ : -0.5 * (--_ * (_ - 2) - 1);
  }, a = t.ease != null ? t.ease : n, s = t.controlsInterrupt != null ? t.controlsInterrupt : !1, o = t.transitionDuration != null ? t.transitionDuration : 1e3, h = t.shortest != null ? t.shortest : !0, l = this._view, c = l.parameters(), f = {};
  Un(f, e), Un(f, c), h && l.normalizeToClosest && l.normalizeToClosest(f, f);
  var u = function() {
    var _ = !1;
    return function(w, y) {
      if (y >= o && _)
        return null;
      var M = Math.min(y / o, 1);
      for (var b in w) {
        var L = c[b], $ = f[b];
        w[b] = L + a(M) * ($ - L);
      }
      return _ = y >= o, w;
    };
  }, p = this._viewer.controls().enabled();
  s || this._viewer.controls().disable(), this.startMovement(u, function() {
    p && i._viewer.controls().enable(), r();
  });
};
pe.prototype.startMovement = function(e, t) {
  var r = this._viewer.renderLoop();
  this._movement && this.stopMovement();
  var i = e();
  if (typeof i != "function")
    throw new Error("Bad movement");
  this._movement = e, this._movementStep = i, this._movementStartTime = po(), this._movementParams = {}, this._movementCallback = t, r.addEventListener("beforeRender", this._updateMovementHandler), r.renderOnNextFrame();
};
pe.prototype.stopMovement = function() {
  var e = this._movementCallback, t = this._viewer.renderLoop();
  this._movement && (this._movement = null, this._movementStep = null, this._movementStartTime = null, this._movementParams = null, this._movementCallback = null, t.removeEventListener("beforeRender", this._updateMovementHandler), e && e());
};
pe.prototype.movement = function() {
  return this._movement;
};
pe.prototype._updateMovement = function() {
  if (!this._movement)
    throw new Error("Should not call update");
  var e = this._viewer.renderLoop(), t = this._view, r = po() - this._movementStartTime, i = this._movementStep, n = this._movementParams;
  n = t.parameters(n), n = i(n, r), n == null ? this.stopMovement() : (t.setParameters(n), e.renderOnNextFrame());
};
pe.prototype._updateHotspotContainer = function() {
  this.visible() ? this._hotspotContainer.show() : this._hotspotContainer.hide();
};
var mo = pe, h0 = ce, l0 = Qe, _o = Ot, c0 = {
  duration: 1 / 0
};
function Je(e) {
  e = l0(e || {}, c0), this._duration = e.duration, this._startTime = null, this._handle = null, this._check = this._check.bind(this);
}
h0(Je);
Je.prototype.start = function() {
  this._startTime = _o(), this._handle == null && this._duration < 1 / 0 && this._setup(this._duration);
};
Je.prototype.started = function() {
  return this._startTime != null;
};
Je.prototype.stop = function() {
  this._startTime = null, this._handle != null && (clearTimeout(this._handle), this._handle = null);
};
Je.prototype._setup = function(e) {
  this._handle = setTimeout(this._check, e);
};
Je.prototype._teardown = function() {
  clearTimeout(this._handle), this._handle = null;
};
Je.prototype._check = function() {
  var e = _o(), t = e - this._startTime, r = this._duration - t;
  this._teardown(), r <= 0 ? (this.emit("timeout"), this._startTime = null) : r < 1 / 0 && this._setup(r);
};
Je.prototype.duration = function() {
  return this._duration;
};
Je.prototype.setDuration = function(e) {
  this._duration = e, this._startTime != null && this._check();
};
var v0 = Je, f0 = Qe, u0 = he, d0 = {
  active: "move",
  inactive: "default",
  disabled: "default"
};
function tr(e, t, r, i) {
  i = f0(i || {}, d0), this._element = r, this._controls = e, this._id = t, this._attached = !1, this._setActiveCursor = this._setCursor.bind(this, i.active), this._setInactiveCursor = this._setCursor.bind(this, i.inactive), this._setDisabledCursor = this._setCursor.bind(this, i.disabled), this._setOriginalCursor = this._setCursor.bind(this, this._element.style.cursor), this._updateAttachmentHandler = this._updateAttachment.bind(this), e.addEventListener("methodEnabled", this._updateAttachmentHandler), e.addEventListener("methodDisabled", this._updateAttachmentHandler), e.addEventListener("enabled", this._updateAttachmentHandler), e.addEventListener("disabled", this._updateAttachmentHandler), this._updateAttachment();
}
tr.prototype.destroy = function() {
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
  ), u0(this);
};
tr.prototype._updateAttachment = function() {
  var e = this._controls, t = this._id;
  e.enabled() && e.method(t).enabled ? this._attachToControlMethod(e.method(t)) : this._detachFromControlMethod(e.method(t));
};
tr.prototype._attachToControlMethod = function(e) {
  this._attached || (e.instance.addEventListener("active", this._setActiveCursor), e.instance.addEventListener("inactive", this._setInactiveCursor), e.active ? this._setActiveCursor() : this._setInactiveCursor(), this._attached = !0);
};
tr.prototype._detachFromControlMethod = function(e) {
  this._attached && (e.instance.removeEventListener("active", this._setActiveCursor), e.instance.removeEventListener("inactive", this._setInactiveCursor), this._setDisabledCursor(), this._attached = !1);
};
tr.prototype._setCursor = function(e) {
  this._element.style.cursor = e;
};
var p0 = tr, m0 = Qe, Vi = no, _0 = ao, y0 = oo, g0 = ho, Ve = Qs, w0 = {
  mouseViewMode: "drag",
  dragMode: "pan"
};
function x0(e, t, r) {
  r = m0(r || {}, w0);
  var i = {
    mouseViewDrag: new Vi(t, "mouse"),
    mouseViewQtvr: new _0(t, "mouse"),
    leftArrowKey: new Ve(37, "x", -0.7, 3),
    rightArrowKey: new Ve(39, "x", 0.7, 3),
    upArrowKey: new Ve(38, "y", -0.7, 3),
    downArrowKey: new Ve(40, "y", 0.7, 3),
    plusKey: new Ve(107, "zoom", -0.7, 3),
    minusKey: new Ve(109, "zoom", 0.7, 3),
    wKey: new Ve(87, "y", -0.7, 3),
    aKey: new Ve(65, "x", -0.7, 3),
    sKey: new Ve(83, "y", 0.7, 3),
    dKey: new Ve(68, "x", 0.7, 3),
    qKey: new Ve(81, "roll", 0.7, 3),
    eKey: new Ve(69, "roll", -0.7, 3)
  }, n = ["scrollZoom", "touchView", "pinch"];
  r.scrollZoom !== !1 && (i.scrollZoom = new y0(t));
  var a = {
    arrowKeys: ["leftArrowKey", "rightArrowKey", "upArrowKey", "downArrowKey"],
    plusMinusKeys: ["plusKey", "minusKey"],
    wasdKeys: ["wKey", "aKey", "sKey", "dKey"],
    qeKeys: ["qKey", "eKey"]
  };
  switch (r.dragMode) {
    case "pinch":
      i.pinch = new Vi(t, "touch", { hammerEvent: "pinch" });
      break;
    case "pan":
      i.touchView = new Vi(t, "touch"), i.pinch = new g0(t, "touch");
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
var yo = x0, Bn = Ot;
function M0(e, t, r) {
  var i = !1, n = Bn();
  function a() {
    if (!i) {
      var s = (Bn() - n) / e;
      s < 1 ? (t(s), requestAnimationFrame(a)) : (t(1), r());
    }
  }
  return t(0), requestAnimationFrame(a), function() {
    i = !0, r.apply(null, arguments);
  };
}
var go = M0, E0 = ce, T0 = Ks, b0 = co, C0 = mo, S0 = v0, P0 = da, L0 = p0, Gn = hi, $0 = yo, R0 = zs, A0 = Ae.setOverflowHidden, z0 = Ae.setAbsolute, O0 = Ae.setFullSize, I0 = go, D0 = Cr, H0 = he;
function te(e, t) {
  t = t || {}, this._domElement = e, A0(e), this._stage = new P0(t.stage), R0(this._stage), this._domElement.appendChild(this._stage.domElement()), this._controlContainer = document.createElement("div"), z0(this._controlContainer), O0(this._controlContainer), e.appendChild(this._controlContainer), this._size = {}, this.updateSize(), this._updateSizeListener = this.updateSize.bind(this), window.addEventListener("resize", this._updateSizeListener), this._renderLoop = new T0(this._stage), this._controls = new b0(), this._controlMethods = $0(this._controls, this._controlContainer, t.controls), this._controls.attach(this._renderLoop), this._hammerManagerTouch = Gn.get(this._controlContainer, "touch"), this._hammerManagerMouse = Gn.get(this._controlContainer, "mouse"), this._dragCursor = new L0(this._controls, "mouseViewDrag", e, t.cursors && t.cursors.drag || {}), this._renderLoop.start(), this._scenes = [], this._currentScene = null, this._replacedScene = null, this._cancelCurrentTween = null, this._layerChangeHandler = this._updateSceneLayers.bind(this), this._viewChangeHandler = this.emit.bind(this, "viewChange"), this._idleTimer = new S0(), this._idleTimer.start(), this._resetIdleTimerHandler = this._resetIdleTimer.bind(this), this.addEventListener("viewChange", this._resetIdleTimerHandler), this._triggerIdleTimerHandler = this._triggerIdleTimer.bind(this), this._idleTimer.addEventListener("timeout", this._triggerIdleTimerHandler), this._stopMovementHandler = this.stopMovement.bind(this), this._controls.addEventListener("active", this._stopMovementHandler), this.addEventListener("sceneChange", this._stopMovementHandler), this._idleMovement = null;
}
E0(te);
te.prototype.destroy = function() {
  window.removeEventListener("resize", this._updateSizeListener), this._currentScene && this._removeSceneEventListeners(this._currentScene), this._replacedScene && this._removeSceneEventListeners(this._replacedScene), this._dragCursor.destroy();
  for (var e in this._controlMethods)
    this._controlMethods[e].destroy();
  for (; this._scenes.length; )
    this.destroyScene(this._scenes[0]);
  this._domElement.removeChild(this._stage.domElement()), this._stage.destroy(), this._renderLoop.destroy(), this._controls.destroy(), this._controls = null, this._cancelCurrentTween && this._cancelCurrentTween(), H0(this);
};
te.prototype.updateSize = function() {
  var e = this._size;
  e.width = this._domElement.clientWidth, e.height = this._domElement.clientHeight, this._stage.setSize(e);
};
te.prototype.stage = function() {
  return this._stage;
};
te.prototype.renderLoop = function() {
  return this._renderLoop;
};
te.prototype.controls = function() {
  return this._controls;
};
te.prototype.domElement = function() {
  return this._domElement;
};
te.prototype.createScene = function(e) {
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
te.prototype.createEmptyScene = function(e) {
  e = e || {};
  var t = new C0(this, e.view);
  return this._scenes.push(t), t;
};
te.prototype._updateSceneLayers = function() {
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
te.prototype._addLayerToStage = function(e, t) {
  e.pinFirstLevel(), this._stage.addLayer(e, t);
};
te.prototype._removeLayerFromStage = function(e) {
  this._stage.removeLayer(e), e.unpinFirstLevel(), e.textureStore().clearNotPinned();
};
te.prototype._addSceneEventListeners = function(e) {
  e.addEventListener("layerChange", this._layerChangeHandler), e.addEventListener("viewChange", this._viewChangeHandler);
};
te.prototype._removeSceneEventListeners = function(e) {
  e.removeEventListener("layerChange", this._layerChangeHandler), e.removeEventListener("viewChange", this._viewChangeHandler);
};
te.prototype.destroyScene = function(e) {
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
te.prototype.destroyAllScenes = function() {
  for (; this._scenes.length > 0; )
    this.destroyScene(this._scenes[0]);
};
te.prototype.hasScene = function(e) {
  return this._scenes.indexOf(e) >= 0;
};
te.prototype.listScenes = function() {
  return [].concat(this._scenes);
};
te.prototype.scene = function() {
  return this._currentScene;
};
te.prototype.view = function() {
  var e = this._currentScene;
  return e ? e.view() : null;
};
te.prototype.lookTo = function(e, t, r) {
  var i = this._currentScene;
  i && i.lookTo(e, t, r);
};
te.prototype.startMovement = function(e, t) {
  var r = this._currentScene;
  r && r.startMovement(e, t);
};
te.prototype.stopMovement = function() {
  var e = this._currentScene;
  e && e.stopMovement();
};
te.prototype.movement = function() {
  var e = this._currentScene;
  if (e)
    return e.movement();
};
te.prototype.setIdleMovement = function(e, t) {
  this._idleTimer.setDuration(e), this._idleMovement = t;
};
te.prototype.breakIdleMovement = function() {
  this.stopMovement(), this._resetIdleTimer();
};
te.prototype._resetIdleTimer = function() {
  this._idleTimer.start();
};
te.prototype._triggerIdleTimer = function() {
  var e = this._idleMovement;
  e && this.startMovement(e);
};
var F0 = 1e3;
function N0(e, t, r) {
  var i = t.listLayers();
  i.forEach(function(n) {
    n.mergeEffects({ opacity: e });
  }), t._hotspotContainer.domElement().style.opacity = e;
}
te.prototype.switchScene = function(e, t, r) {
  var i = this;
  t = t || {}, r = r || D0;
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
  for (var l = t.transitionDuration != null ? t.transitionDuration : F0, c = t.transitionUpdate != null ? t.transitionUpdate : N0, f = 0; f < o.length; f++)
    this._addLayerToStage(o[f]);
  function u(_) {
    c(_, e, a);
  }
  function p() {
    if (i._replacedScene) {
      i._removeSceneEventListeners(i._replacedScene), s = i._replacedScene.listLayers();
      for (var _ = 0; _ < s.length; _++)
        i._removeLayerFromStage(s[_]);
      i._replacedScene = null;
    }
    i._cancelCurrentTween = null, r();
  }
  this._cancelCurrentTween = I0(l, u, p), this._currentScene = e, this._replacedScene = a, this.emit("sceneChange"), this.emit("viewChange"), this._addSceneEventListeners(e);
};
var V0 = te, li = Ee.vec4, k0 = Ee.mat4;
function j0(e) {
  var t = e || {};
  return t.colorOffset = t.colorOffset || li.create(), t.colorMatrix = t.colorMatrix || k0.create(), t;
}
function wo(e, t, r) {
  W0(r, e, t.colorMatrix), li.add(r, r, t.colorOffset);
}
function W0(e, t, r) {
  var i = t[0], n = t[1], a = t[2], s = t[3];
  return e[0] = r[0] * i + r[1] * n + r[2] * a + r[3] * s, e[1] = r[4] * i + r[5] * n + r[6] * a + r[7] * s, e[2] = r[8] * i + r[9] * n + r[10] * a + r[11] * s, e[3] = r[12] * i + r[13] * n + r[14] * a + r[15] * s, e;
}
var Lt = li.create();
function Y0(e, t) {
  for (var r = e.width, i = e.height, n = e.data, a = 0; a < r * i; a++)
    li.set(Lt, n[a * 4 + 0] / 255, n[a * 4 + 1] / 255, n[a * 4 + 2] / 255, n[a * 4 + 3] / 255), wo(Lt, t, Lt), n[a * 4 + 0] = Lt[0] * 255, n[a * 4 + 1] = Lt[1] * 255, n[a * 4 + 2] = Lt[2] * 255, n[a * 4 + 3] = Lt[3] * 255;
}
var q0 = {
  identity: j0,
  applyToPixel: wo,
  applyToImageData: Y0
}, X0 = Qe, ki = 0.1, ji = 0.01, U0 = {
  yawSpeed: ki,
  pitchSpeed: ki,
  fovSpeed: ki,
  yawAccel: ji,
  pitchAccel: ji,
  fovAccel: ji,
  targetPitch: 0,
  targetFov: null
};
function B0(e) {
  e = X0(e || {}, U0);
  var t = e.yawSpeed, r = e.pitchSpeed, i = e.fovSpeed, n = e.yawAccel, a = e.pitchAccel, s = e.fovAccel, o = e.targetPitch, h = e.targetFov;
  return function() {
    var c = 0, f = 0, u = 0, p = 0, _ = 0, w = 0, y = 0, M, b, L, $;
    return function(S, V) {
      if (M = (V - c) / 1e3, _ = Math.min(f + M * n, t), b = _ * M, S.yaw = S.yaw + b, o != null && S.pitch !== o) {
        var q = 0.5 * u * u / a;
        Math.abs(o - S.pitch) > q ? w = Math.min(u + M * a, r) : w = Math.max(u - M * a, 0), L = w * M, o < S.pitch && (S.pitch = Math.max(o, S.pitch - L)), o > S.pitch && (S.pitch = Math.min(o, S.pitch + L));
      }
      if (h != null && S.fov !== o) {
        var k = 0.5 * p * p / s;
        Math.abs(h - S.fov) > k ? y = Math.min(p + M * s, i) : y = Math.max(p - M * s, 0), $ = y * M, h < S.fov && (S.fov = Math.max(h, S.fov - $)), h > S.fov && (S.fov = Math.min(h, S.fov + $));
      }
      return c = V, f = _, u = w, p = y, S;
    };
  };
}
var G0 = B0;
function Z0(e, t) {
  function r() {
    t && t.length > 0 ? e.apply(null, t) : e();
  }
  setTimeout(r, 0);
}
var K0 = Z0;
function Q0(e) {
  return e * Math.PI / 180;
}
var J0 = Q0;
function e1(e) {
  return e * 180 / Math.PI;
}
var t1 = e1, Me = {
  // Stages.
  WebGlStage: da,
  // Renderers.
  WebGlCubeRenderer: Ps,
  WebGlFlatRenderer: $s,
  WebGlEquirectRenderer: As,
  registerDefaultRenderers: zs,
  // Geometries.
  CubeGeometry: mp,
  FlatGeometry: Cp,
  EquirectGeometry: Ap,
  // Views.
  RectilinearView: Jp,
  FlatView: hm,
  // Sources.
  ImageUrlSource: bm,
  SingleAssetSource: Cm,
  // Assets.
  StaticAsset: Ki,
  DynamicAsset: Rm,
  // Texture store.
  TextureStore: Bs,
  // Layer.
  Layer: Zs,
  // Render loop.
  RenderLoop: Ks,
  // Controls.
  KeyControlMethod: Qs,
  DragControlMethod: no,
  QtvrControlMethod: ao,
  ScrollZoomControlMethod: oo,
  PinchZoomControlMethod: ho,
  VelocityControlMethod: P_,
  ElementPressControlMethod: A_,
  Controls: co,
  Dynamics: st,
  // High-level API.
  Viewer: V0,
  Scene: mo,
  // Hotspots.
  Hotspot: fo,
  HotspotContainer: uo,
  // Effects.
  colorEffects: q0,
  // Miscellaneous functions.
  registerDefaultControls: yo,
  autorotate: G0,
  // Utility functions.
  util: {
    async: aa,
    cancelize: sa,
    chain: _n,
    clamp: Kt,
    clearOwnProperties: he,
    cmp: Mr,
    compose: Ns,
    convertFov: Fs,
    decimal: mn,
    defaults: Qe,
    defer: K0,
    degToRad: J0,
    delay: Ys,
    dom: Ae,
    extend: Gs,
    hash: ii,
    inherits: Ge,
    mod: _t,
    noop: Cr,
    now: Ot,
    once: Gi,
    pixelRatio: ti,
    radToDeg: t1,
    real: pn,
    retry: qs,
    tween: go,
    type: Tr
  },
  // Expose dependencies for clients to use.
  dependencies: {
    bowser: Qi,
    glMatrix: Ee,
    eventEmitter: ce,
    hammerjs: eo
  }
};
const r1 = /* @__PURE__ */ Po(Me), _1 = /* @__PURE__ */ So({
  __proto__: null,
  default: r1
}, [Me]);
var Zt = function() {
  return Zt = Object.assign || function(t) {
    for (var r, i = 1, n = arguments.length; i < n; i++) {
      r = arguments[i];
      for (var a in r)
        Object.prototype.hasOwnProperty.call(r, a) && (t[a] = r[a]);
    }
    return t;
  }, Zt.apply(this, arguments);
};
var Bi = { exports: {} }, ur = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Zn;
function i1() {
  if (Zn)
    return ur;
  Zn = 1;
  var e = Jn, t = Symbol.for("react.element"), r = Symbol.for("react.fragment"), i = Object.prototype.hasOwnProperty, n = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, a = { key: !0, ref: !0, __self: !0, __source: !0 };
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
  return ur.Fragment = r, ur.jsx = s, ur.jsxs = s, ur;
}
var dr = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Kn;
function n1() {
  return Kn || (Kn = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Jn, t = Symbol.for("react.element"), r = Symbol.for("react.portal"), i = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), s = Symbol.for("react.provider"), o = Symbol.for("react.context"), h = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), u = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), _ = Symbol.iterator, w = "@@iterator";
    function y(m) {
      if (m === null || typeof m != "object")
        return null;
      var T = _ && m[_] || m[w];
      return typeof T == "function" ? T : null;
    }
    var M = e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function b(m) {
      {
        for (var T = arguments.length, P = new Array(T > 1 ? T - 1 : 0), I = 1; I < T; I++)
          P[I - 1] = arguments[I];
        L("error", m, P);
      }
    }
    function L(m, T, P) {
      {
        var I = M.ReactDebugCurrentFrame, Z = I.getStackAddendum();
        Z !== "" && (T += "%s", P = P.concat([Z]));
        var Q = P.map(function(H) {
          return String(H);
        });
        Q.unshift("Warning: " + T), Function.prototype.apply.call(console[m], console, Q);
      }
    }
    var $ = !1, R = !1, S = !1, V = !1, q = !1, k;
    k = Symbol.for("react.module.reference");
    function W(m) {
      return !!(typeof m == "string" || typeof m == "function" || m === i || m === a || q || m === n || m === l || m === c || V || m === p || $ || R || S || typeof m == "object" && m !== null && (m.$$typeof === u || m.$$typeof === f || m.$$typeof === s || m.$$typeof === o || m.$$typeof === h || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      m.$$typeof === k || m.getModuleId !== void 0));
    }
    function O(m, T, P) {
      var I = m.displayName;
      if (I)
        return I;
      var Z = T.displayName || T.name || "";
      return Z !== "" ? P + "(" + Z + ")" : P;
    }
    function X(m) {
      return m.displayName || "Context";
    }
    function Y(m) {
      if (m == null)
        return null;
      if (typeof m.tag == "number" && b("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof m == "function")
        return m.displayName || m.name || null;
      if (typeof m == "string")
        return m;
      switch (m) {
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
      if (typeof m == "object")
        switch (m.$$typeof) {
          case o:
            var T = m;
            return X(T) + ".Consumer";
          case s:
            var P = m;
            return X(P._context) + ".Provider";
          case h:
            return O(m, m.render, "ForwardRef");
          case f:
            var I = m.displayName || null;
            return I !== null ? I : Y(m.type) || "Memo";
          case u: {
            var Z = m, Q = Z._payload, H = Z._init;
            try {
              return Y(H(Q));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var z = Object.assign, x = 0, Te, K, $e, ge, ue, ht, Se;
    function xt() {
    }
    xt.__reactDisabledLog = !0;
    function N() {
      {
        if (x === 0) {
          Te = console.log, K = console.info, $e = console.warn, ge = console.error, ue = console.group, ht = console.groupCollapsed, Se = console.groupEnd;
          var m = {
            configurable: !0,
            enumerable: !0,
            value: xt,
            writable: !0
          };
          Object.defineProperties(console, {
            info: m,
            log: m,
            warn: m,
            error: m,
            group: m,
            groupCollapsed: m,
            groupEnd: m
          });
        }
        x++;
      }
    }
    function G() {
      {
        if (x--, x === 0) {
          var m = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: z({}, m, {
              value: Te
            }),
            info: z({}, m, {
              value: K
            }),
            warn: z({}, m, {
              value: $e
            }),
            error: z({}, m, {
              value: ge
            }),
            group: z({}, m, {
              value: ue
            }),
            groupCollapsed: z({}, m, {
              value: ht
            }),
            groupEnd: z({}, m, {
              value: Se
            })
          });
        }
        x < 0 && b("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ze = M.ReactCurrentDispatcher, se;
    function re(m, T, P) {
      {
        if (se === void 0)
          try {
            throw Error();
          } catch (Z) {
            var I = Z.stack.trim().match(/\n( *(at )?)/);
            se = I && I[1] || "";
          }
        return `
` + se + m;
      }
    }
    var Re = !1, qe;
    {
      var Mt = typeof WeakMap == "function" ? WeakMap : Map;
      qe = new Mt();
    }
    function lt(m, T) {
      if (!m || Re)
        return "";
      {
        var P = qe.get(m);
        if (P !== void 0)
          return P;
      }
      var I;
      Re = !0;
      var Z = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Q;
      Q = ze.current, ze.current = null, N();
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
            } catch (Ne) {
              I = Ne;
            }
            Reflect.construct(m, [], H);
          } else {
            try {
              H.call();
            } catch (Ne) {
              I = Ne;
            }
            m.call(H.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Ne) {
            I = Ne;
          }
          m();
        }
      } catch (Ne) {
        if (Ne && I && typeof Ne.stack == "string") {
          for (var j = Ne.stack.split(`
`), le = I.stack.split(`
`), J = j.length - 1, oe = le.length - 1; J >= 1 && oe >= 0 && j[J] !== le[oe]; )
            oe--;
          for (; J >= 1 && oe >= 0; J--, oe--)
            if (j[J] !== le[oe]) {
              if (J !== 1 || oe !== 1)
                do
                  if (J--, oe--, oe < 0 || j[J] !== le[oe]) {
                    var ve = `
` + j[J].replace(" at new ", " at ");
                    return m.displayName && ve.includes("<anonymous>") && (ve = ve.replace("<anonymous>", m.displayName)), typeof m == "function" && qe.set(m, ve), ve;
                  }
                while (J >= 1 && oe >= 0);
              break;
            }
        }
      } finally {
        Re = !1, ze.current = Q, G(), Error.prepareStackTrace = Z;
      }
      var be = m ? m.displayName || m.name : "", Vr = be ? re(be) : "";
      return typeof m == "function" && qe.set(m, Vr), Vr;
    }
    function Et(m, T, P) {
      return lt(m, !1);
    }
    function He(m) {
      var T = m.prototype;
      return !!(T && T.isReactComponent);
    }
    function Fe(m, T, P) {
      if (m == null)
        return "";
      if (typeof m == "function")
        return lt(m, He(m));
      if (typeof m == "string")
        return re(m);
      switch (m) {
        case l:
          return re("Suspense");
        case c:
          return re("SuspenseList");
      }
      if (typeof m == "object")
        switch (m.$$typeof) {
          case h:
            return Et(m.render);
          case f:
            return Fe(m.type, T, P);
          case u: {
            var I = m, Z = I._payload, Q = I._init;
            try {
              return Fe(Q(Z), T, P);
            } catch {
            }
          }
        }
      return "";
    }
    var Tt = Object.prototype.hasOwnProperty, rr = {}, bt = M.ReactDebugCurrentFrame;
    function we(m) {
      if (m) {
        var T = m._owner, P = Fe(m.type, m._source, T ? T.type : null);
        bt.setExtraStackFrame(P);
      } else
        bt.setExtraStackFrame(null);
    }
    function ci(m, T, P, I, Z) {
      {
        var Q = Function.call.bind(Tt);
        for (var H in m)
          if (Q(m, H)) {
            var j = void 0;
            try {
              if (typeof m[H] != "function") {
                var le = Error((I || "React class") + ": " + P + " type `" + H + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof m[H] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw le.name = "Invariant Violation", le;
              }
              j = m[H](T, H, I, P, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (J) {
              j = J;
            }
            j && !(j instanceof Error) && (we(Z), b("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", I || "React class", P, H, typeof j), we(null)), j instanceof Error && !(j.message in rr) && (rr[j.message] = !0, we(Z), b("Failed %s type: %s", P, j.message), we(null));
          }
      }
    }
    var vi = Array.isArray;
    function ir(m) {
      return vi(m);
    }
    function fi(m) {
      {
        var T = typeof Symbol == "function" && Symbol.toStringTag, P = T && m[Symbol.toStringTag] || m.constructor.name || "Object";
        return P;
      }
    }
    function ui(m) {
      try {
        return nr(m), !1;
      } catch {
        return !0;
      }
    }
    function nr(m) {
      return "" + m;
    }
    function ar(m) {
      if (ui(m))
        return b("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", fi(m)), nr(m);
    }
    var Ct = M.ReactCurrentOwner, Ar = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, St, kt, sr;
    sr = {};
    function di(m) {
      if (Tt.call(m, "ref")) {
        var T = Object.getOwnPropertyDescriptor(m, "ref").get;
        if (T && T.isReactWarning)
          return !1;
      }
      return m.ref !== void 0;
    }
    function pi(m) {
      if (Tt.call(m, "key")) {
        var T = Object.getOwnPropertyDescriptor(m, "key").get;
        if (T && T.isReactWarning)
          return !1;
      }
      return m.key !== void 0;
    }
    function mi(m, T) {
      if (typeof m.ref == "string" && Ct.current && T && Ct.current.stateNode !== T) {
        var P = Y(Ct.current.type);
        sr[P] || (b('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', Y(Ct.current.type), m.ref), sr[P] = !0);
      }
    }
    function _i(m, T) {
      {
        var P = function() {
          St || (St = !0, b("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", T));
        };
        P.isReactWarning = !0, Object.defineProperty(m, "key", {
          get: P,
          configurable: !0
        });
      }
    }
    function jt(m, T) {
      {
        var P = function() {
          kt || (kt = !0, b("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", T));
        };
        P.isReactWarning = !0, Object.defineProperty(m, "ref", {
          get: P,
          configurable: !0
        });
      }
    }
    var yi = function(m, T, P, I, Z, Q, H) {
      var j = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: t,
        // Built-in properties that belong on the element
        type: m,
        key: T,
        ref: P,
        props: H,
        // Record the component responsible for creating this element.
        _owner: Q
      };
      return j._store = {}, Object.defineProperty(j._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(j, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: I
      }), Object.defineProperty(j, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Z
      }), Object.freeze && (Object.freeze(j.props), Object.freeze(j)), j;
    };
    function gi(m, T, P, I, Z) {
      {
        var Q, H = {}, j = null, le = null;
        P !== void 0 && (ar(P), j = "" + P), pi(T) && (ar(T.key), j = "" + T.key), di(T) && (le = T.ref, mi(T, Z));
        for (Q in T)
          Tt.call(T, Q) && !Ar.hasOwnProperty(Q) && (H[Q] = T[Q]);
        if (m && m.defaultProps) {
          var J = m.defaultProps;
          for (Q in J)
            H[Q] === void 0 && (H[Q] = J[Q]);
        }
        if (j || le) {
          var oe = typeof m == "function" ? m.displayName || m.name || "Unknown" : m;
          j && _i(H, oe), le && jt(H, oe);
        }
        return yi(m, j, le, Z, I, Ct.current, H);
      }
    }
    var Wt = M.ReactCurrentOwner, or = M.ReactDebugCurrentFrame;
    function Xe(m) {
      if (m) {
        var T = m._owner, P = Fe(m.type, m._source, T ? T.type : null);
        or.setExtraStackFrame(P);
      } else
        or.setExtraStackFrame(null);
    }
    var hr;
    hr = !1;
    function lr(m) {
      return typeof m == "object" && m !== null && m.$$typeof === t;
    }
    function zr() {
      {
        if (Wt.current) {
          var m = Y(Wt.current.type);
          if (m)
            return `

Check the render method of \`` + m + "`.";
        }
        return "";
      }
    }
    function Or(m) {
      {
        if (m !== void 0) {
          var T = m.fileName.replace(/^.*[\\\/]/, ""), P = m.lineNumber;
          return `

Check your code at ` + T + ":" + P + ".";
        }
        return "";
      }
    }
    var Ir = {};
    function wi(m) {
      {
        var T = zr();
        if (!T) {
          var P = typeof m == "string" ? m : m.displayName || m.name;
          P && (T = `

Check the top-level render call using <` + P + ">.");
        }
        return T;
      }
    }
    function Dr(m, T) {
      {
        if (!m._store || m._store.validated || m.key != null)
          return;
        m._store.validated = !0;
        var P = wi(T);
        if (Ir[P])
          return;
        Ir[P] = !0;
        var I = "";
        m && m._owner && m._owner !== Wt.current && (I = " It was passed a child from " + Y(m._owner.type) + "."), Xe(m), b('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', P, I), Xe(null);
      }
    }
    function Pt(m, T) {
      {
        if (typeof m != "object")
          return;
        if (ir(m))
          for (var P = 0; P < m.length; P++) {
            var I = m[P];
            lr(I) && Dr(I, T);
          }
        else if (lr(m))
          m._store && (m._store.validated = !0);
        else if (m) {
          var Z = y(m);
          if (typeof Z == "function" && Z !== m.entries)
            for (var Q = Z.call(m), H; !(H = Q.next()).done; )
              lr(H.value) && Dr(H.value, T);
        }
      }
    }
    function xi(m) {
      {
        var T = m.type;
        if (T == null || typeof T == "string")
          return;
        var P;
        if (typeof T == "function")
          P = T.propTypes;
        else if (typeof T == "object" && (T.$$typeof === h || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        T.$$typeof === f))
          P = T.propTypes;
        else
          return;
        if (P) {
          var I = Y(T);
          ci(P, m.props, "prop", I, m);
        } else if (T.PropTypes !== void 0 && !hr) {
          hr = !0;
          var Z = Y(T);
          b("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Z || "Unknown");
        }
        typeof T.getDefaultProps == "function" && !T.getDefaultProps.isReactClassApproved && b("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function cr(m) {
      {
        for (var T = Object.keys(m.props), P = 0; P < T.length; P++) {
          var I = T[P];
          if (I !== "children" && I !== "key") {
            Xe(m), b("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", I), Xe(null);
            break;
          }
        }
        m.ref !== null && (Xe(m), b("Invalid attribute `ref` supplied to `React.Fragment`."), Xe(null));
      }
    }
    function vr(m, T, P, I, Z, Q) {
      {
        var H = W(m);
        if (!H) {
          var j = "";
          (m === void 0 || typeof m == "object" && m !== null && Object.keys(m).length === 0) && (j += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var le = Or(Z);
          le ? j += le : j += zr();
          var J;
          m === null ? J = "null" : ir(m) ? J = "array" : m !== void 0 && m.$$typeof === t ? (J = "<" + (Y(m.type) || "Unknown") + " />", j = " Did you accidentally export a JSX literal instead of a component?") : J = typeof m, b("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", J, j);
        }
        var oe = gi(m, T, P, Z, Q);
        if (oe == null)
          return oe;
        if (H) {
          var ve = T.children;
          if (ve !== void 0)
            if (I)
              if (ir(ve)) {
                for (var be = 0; be < ve.length; be++)
                  Pt(ve[be], m);
                Object.freeze && Object.freeze(ve);
              } else
                b("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              Pt(ve, m);
        }
        return m === i ? cr(oe) : xi(oe), oe;
      }
    }
    function Hr(m, T, P) {
      return vr(m, T, P, !0);
    }
    function Fr(m, T, P) {
      return vr(m, T, P, !1);
    }
    var Nr = Fr, fr = Hr;
    dr.Fragment = i, dr.jsx = Nr, dr.jsxs = fr;
  }()), dr;
}
process.env.NODE_ENV === "production" ? Bi.exports = i1() : Bi.exports = n1();
var dt = Bi.exports, a1 = {
  controls: {
    mouseViewMode: "drag",
    scrollZoom: !0
  }
};
function s1(e) {
  var t = e.viewerOpts, r = t === void 0 ? a1 : t, i = Ut(null), n = bo(null), a = n[0], s = n[1];
  return Oe(function() {
    if (i.current && !a) {
      var o = new Me.Viewer(i.current, r);
      s(o);
    }
  }, [a, r]), {
    viewerRef: i,
    viewer: a
  };
}
var o1 = {
  viewerRef: null,
  viewer: null
}, xo = ea(o1);
function h1(e) {
  var t = e.children, r = e.opts, i = e.className, n = e.style, a = e.onLoaded, s = s1({ viewerOpts: r }), o = s.viewerRef, h = s.viewer;
  return Oe(function() {
    !o.current || !h || a && a(h);
  }, [o, h, a]), dt.jsx("div", Zt({ ref: o, className: i, style: n }, { children: dt.jsx(xo.Provider, Zt({ value: { viewerRef: o, viewer: h } }, { children: t })) }));
}
var Mo = ea({
  setSource: function() {
  },
  setGeometry: function() {
  },
  setView: function() {
  }
});
function l1(e) {
  var t = e.children, r = e.pinFirstLevel, i = r === void 0 ? !0 : r, n = e.onLoaded, a = v1(), s = a.viewerRef, o = a.viewer, h = Ut(null), l = Ut(null), c = Ut(null), f = Ut(null), u = Si(function(w) {
    l.current = w;
  }, []), p = Si(function(w) {
    c.current = w;
  }, []), _ = Si(function(w) {
    f.current = w;
  }, []);
  return Oe(function() {
    var w = l.current, y = c.current, M = f.current;
    !s || !o || !w || !y || !M || (h.current = o.createScene({
      source: w,
      geometry: y,
      view: M,
      pinFirstLevel: i
    }), h.current.switchTo(), n && n(h.current));
  }, [s, o, i, n]), dt.jsx(Mo.Provider, Zt({ value: { setSource: u, setGeometry: p, setView: _ } }, { children: t }));
}
var c1 = {
  cube: Me.CubeGeometry,
  equirect: Me.EquirectGeometry,
  flat: Me.FlatGeometry
};
function wn(e) {
  var t = e.type, r = e.levelPropertiesList, i = Rr().setGeometry;
  Oe(function() {
    var n = new c1[t](r);
    i(n);
  }, [r, t, i]);
}
var v1 = function() {
  return ta(xo);
}, Rr = function() {
  return ta(Mo);
};
function y1(e) {
  var t = e.source, r = e.options, i = Rr().setSource;
  return Oe(function() {
    i(typeof t == "string" ? Me.ImageUrlSource.fromString(t, r) : new Me.ImageUrlSource(t, r));
  }, [t, r, i]), null;
}
function f1(e) {
  var t = e.asset, r = Rr().setSource;
  return Oe(function() {
    r(new Me.SingleAssetSource(t));
  }, [t, r]), null;
}
function u1(e) {
  var t = e.levelPropertiesList;
  return wn({
    type: "equirect",
    levelPropertiesList: t
  }), null;
}
function g1(e) {
  var t = e.levelPropertiesList;
  return wn({
    type: "flat",
    levelPropertiesList: t
  }), null;
}
function w1(e) {
  var t = e.levelPropertiesList;
  return wn({
    type: "cube",
    levelPropertiesList: t
  }), null;
}
function d1(e) {
  var t = e.params, r = e.limiters, i = Rr().setView;
  return Oe(function() {
    var n = null;
    r && (n = Me.util.compose.apply(Me.util, r(Me.RectilinearView.limit)));
    var a = new Me.RectilinearView(t, n ?? void 0);
    i(a);
  }, [t, r, i]), null;
}
function x1(e) {
  var t = e.params, r = e.limiters, i = Rr().setView;
  return Oe(function() {
    var n = null;
    r && (n = Me.util.compose.apply(Me.util, r(Me.FlatView.limit)));
    var a = new Me.FlatView(t ?? {}, n ?? void 0);
    i(a);
  }, [t, r, i]), null;
}
var p1 = (
  /** @class */
  function() {
    function e(t) {
      Object.defineProperty(this, "_videoElement", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "_destroyed", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "_emitChange", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "_lastTimestamp", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "_emptyCanvas", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "_emitChangeIfPlayingLoop", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), Object.defineProperty(this, "__events", {
        enumerable: !0,
        configurable: !0,
        writable: !0,
        value: void 0
      }), this._videoElement = null, this._destroyed = !1, this._emitChange = this.emit.bind(this, "change"), this._lastTimestamp = -1, this._emptyCanvas = document.createElement("canvas"), this._emptyCanvas.width = 1, this._emptyCanvas.height = 1, t && this.setVideo(t);
    }
    return Object.defineProperty(e.prototype, "setVideo", {
      enumerable: !1,
      configurable: !0,
      writable: !0,
      value: function(t) {
        var r = this;
        if (this._videoElement && this._videoElement.removeEventListener("timeupdate", this._emitChange), this._videoElement = t, !this._videoElement)
          return;
        this._videoElement.addEventListener("timeupdate", this._emitChange), this._emitChangeIfPlayingLoop && (cancelAnimationFrame(this._emitChangeIfPlayingLoop), this._emitChangeIfPlayingLoop = null);
        function i() {
          r._videoElement && !r._videoElement.paused && r.emit("change"), r._destroyed || (r._emitChangeIfPlayingLoop = requestAnimationFrame(i));
        }
        i(), this.emit("change");
      }
    }), Object.defineProperty(e.prototype, "width", {
      enumerable: !1,
      configurable: !0,
      writable: !0,
      value: function() {
        return this._videoElement ? this._videoElement.videoWidth : this._emptyCanvas.width;
      }
    }), Object.defineProperty(e.prototype, "height", {
      enumerable: !1,
      configurable: !0,
      writable: !0,
      value: function() {
        return this._videoElement ? this._videoElement.videoHeight : this._emptyCanvas.height;
      }
    }), Object.defineProperty(e.prototype, "element", {
      enumerable: !1,
      configurable: !0,
      writable: !0,
      value: function() {
        return this._videoElement ? this._videoElement : this._emptyCanvas;
      }
    }), Object.defineProperty(e.prototype, "isDynamic", {
      enumerable: !1,
      configurable: !0,
      writable: !0,
      value: function() {
        return !0;
      }
    }), Object.defineProperty(e.prototype, "timestamp", {
      enumerable: !1,
      configurable: !0,
      writable: !0,
      value: function() {
        return this._videoElement && (this._lastTimestamp = this._videoElement.currentTime), this._lastTimestamp;
      }
    }), Object.defineProperty(e.prototype, "destroy", {
      enumerable: !1,
      configurable: !0,
      writable: !0,
      value: function() {
        this._destroyed = !0, this._videoElement && this._videoElement.removeEventListener("timeupdate", this._emitChange), this._emitChangeIfPlayingLoop && (cancelAnimationFrame(this._emitChangeIfPlayingLoop), this._emitChangeIfPlayingLoop = null);
      }
    }), Object.defineProperty(e.prototype, "addEventListener", {
      enumerable: !1,
      configurable: !0,
      writable: !0,
      value: function(t, r) {
        var i = this.__events = this.__events || {}, n = i[t] = i[t] || [];
        n.push(r);
      }
    }), Object.defineProperty(e.prototype, "removeEventListener", {
      enumerable: !1,
      configurable: !0,
      writable: !0,
      value: function(t, r) {
        var i = this.__events = this.__events || {}, n = i[t];
        if (n) {
          var a = n.indexOf(r);
          a >= 0 && n.splice(a, 1);
        }
      }
    }), Object.defineProperty(e.prototype, "emit", {
      enumerable: !1,
      configurable: !0,
      writable: !0,
      value: function(t, r, i, n, a, s) {
        var o = this.__events = this.__events || {}, h = o[t];
        if (h)
          for (var l = 0; l < h.length; l++) {
            var c = h[l];
            c.call(this, r, i, n, a, s);
          }
      }
    }), e;
  }()
);
function Qn(e, t, r, i) {
  var n = setInterval(function() {
    e.readyState >= t && (clearInterval(n), i(null, !0));
  }, r);
}
function M1(e) {
  var t = e.source, r = e.paused, i = r === void 0 ? !1 : r, n = e.muted, a = n === void 0 ? !0 : n, s = e.currentTime, o = s === void 0 ? 0 : s, h = e.volume, l = h === void 0 ? 0 : h, c = e.className, f = e.style, u = e.levelPropertiesList, p = u === void 0 ? [{ width: 1 }] : u, _ = e.params, w = _ === void 0 ? { fov: Math.PI / 2 } : _, y = e.limiters, M = y === void 0 ? function(N) {
    return [
      N.vfov(90 * Math.PI / 180, 90 * Math.PI / 180)
    ];
  } : y, b = e.onAbort, L = e.onCanPlay, $ = e.onCanPlayThrough, R = e.onDurationChange, S = e.onEmptied, V = e.onEncrypted, q = e.onPlay, k = e.onPause, W = e.onTimeUpdate, O = e.onLoaded, X = e.onEnded, Y = e.onError, z = e.onLoadedData, x = e.onLoadedMetadata, Te = e.onSeeked, K = e.onSeeking, $e = e.onStalled, ge = e.onSuspend, ue = e.onVolumeChange, ht = e.onWaiting, Se = Ut(null), xt = Co(function() {
    if (!t)
      return null;
    var N = new p1();
    Se.current = document.createElement("video");
    var G = Se.current;
    return G.src = t, G.playsInline = !0, G.crossOrigin = "anonymous", G.muted = a, G.currentTime = o, G.volume = l, G.load(), Qn(G, G.HAVE_METADATA, 100, function() {
      Qn(G, G.HAVE_ENOUGH_DATA, 100, function() {
        N.setVideo(G);
      });
    }), N;
  }, [t]);
  return Oe(function() {
    if (Se.current) {
      var N = Se.current, G = {
        abort: function() {
          return b && b(N);
        },
        canplay: function() {
          return L && L(N);
        },
        canplaythrough: function() {
          return $ && $(N);
        },
        durationchange: function() {
          return R && R(N);
        },
        emptied: function() {
          return S && S(N);
        },
        encrypted: function() {
          return V && V(N);
        },
        play: function() {
          return q && q(N);
        },
        pause: function() {
          return k && k(N);
        },
        timeupdate: function() {
          return W && W(N);
        },
        loaded: function() {
          return O && O(N);
        },
        ended: function() {
          return X && X(N);
        },
        error: function(re) {
          return Y && Y(N, re);
        },
        loadeddata: function() {
          return z && z(N);
        },
        loadedmetadata: function() {
          return x && x(N);
        },
        seeked: function() {
          return Te && Te(N);
        },
        seeking: function() {
          return K && K(N);
        },
        stalled: function() {
          return $e && $e(N);
        },
        suspend: function() {
          return ge && ge(N);
        },
        volumechange: function() {
          return ue && ue(N);
        },
        waiting: function() {
          return ht && ht(N);
        }
      }, ze = function(re, Re) {
        Re && N.addEventListener(re, Re);
      }, se = function() {
        Object.keys(G).forEach(function(re) {
          var Re = G[re];
          Re && N.removeEventListener(re, Re);
        });
      };
      return Object.keys(G).forEach(function(re) {
        return ze(re, G[re]);
      }), se;
    }
  }, [
    b,
    L,
    $,
    R,
    S,
    V,
    X,
    Y,
    O,
    z,
    x,
    k,
    q,
    Te,
    K,
    $e,
    ge,
    W,
    ue,
    ht
  ]), Oe(function() {
    var N = Se.current;
    N && (i ? N.pause() : N.play());
  }, [i]), Oe(function() {
    var N = Se.current;
    N && (N.muted = a);
  }, [a]), Oe(function() {
    var N = Se.current;
    N && (N.currentTime = o);
  }, [o]), Oe(function() {
    var N = Se.current;
    N && (N.volume = l);
  }, [l]), xt ? dt.jsx(h1, Zt({ className: c, style: f }, { children: dt.jsxs(l1, { children: [dt.jsx(f1, { asset: xt }), dt.jsx(u1, { levelPropertiesList: p }), dt.jsx(d1, { params: w, limiters: M })] }) })) : null;
}
export {
  w1 as CubeGeometry,
  u1 as EquirectGeometry,
  g1 as FlatGeometry,
  x1 as FlatView,
  y1 as ImageUrlSource,
  _1 as Marzipano,
  d1 as RectilinearView,
  l1 as Scene,
  f1 as SingleAssetSource,
  p1 as VideoAsset,
  M1 as VideoViewer,
  h1 as Viewer,
  wn as useCreateGeometry,
  Rr as useSceneContext,
  s1 as useViewer,
  v1 as useViewerContext
};
