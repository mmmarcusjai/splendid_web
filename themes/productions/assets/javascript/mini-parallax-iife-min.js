/*!
 * mini-parallax v0.3.1
 * https://github.com/ko-yelie/mini-parallax#readme
 *
 * @license
 * Copyright (c) 2018 Ko.Yelie
 * Released under the MIT License.
 */
var MiniParallax = function(t) {
    "use strict";

    function e() {}

    function o(t) {
        return t ? Array.prototype.slice.call(t, 0) : []
    }
    var i = function(t, i) {
        var n = this;
        if (void 0 === i && (i = {}), this._els = function(t, e) {
                return void 0 === e && (e = document), "string" == typeof t ? o(e.querySelectorAll(t)) : t.length ? t.map ? t : o(t) : [t]
            }(t), 0 !== this._els.length) {
            var r = i.onResize;
            void 0 === r && (r = e);
            var s = i.onScroll;
            void 0 === s && (s = e);
            var a = i.isRound;
            void 0 === a && (a = !1);
            var p = i.autoRun;
            void 0 === p && (p = !0), this._onResize = r, this._onScroll = s, this._fTansform = "_getTransform" + (a ? "Round" : ""), this._scrollTarget = document.scrollingElement || document.documentElement, window.addEventListener("resize", function() {
                n.update(), n._onResize(n._windowHeight)
            }), window.addEventListener("load", function() {
                n.update()
            }), p && this.run()
        } else this._disabled = !0
    };
    i.prototype.run = function() {
        var t = this;
        this._disabled || (this._cache(), requestAnimationFrame(function() {
            t._tick()
        }))
    }, i.prototype.update = function() {
        this._disabled || (this._cache(), this._update())
    }, i.prototype._cache = function() {
        var t = this;
        this._windowHeight = window.innerHeight;
        var e = window.scrollY || window.pageYOffset;
        this._items = this._els.map(function(o) {
            return o.style.transform = "none", o.style.willChange = "transform", t._cacheElementPos(o, e)
        }).filter(function(t) {
            return t
        })
    }, i.prototype._tick = function() {
        var t = this,
            e = this._scrollTarget.scrollTop;
        e !== this._scrollTop && (this._scrollTop = e, this._update()), requestAnimationFrame(function() {
            t._tick()
        })
    }, i.prototype._update = function() {
        var t = this;
        this._items.forEach(function(e) {
            return t._updateElement(e)
        }), this._onScroll(this._scrollTop)
    }, i.prototype._getTransform = function(t) {
        return "translate3d(0, " + t + "px, 0) rotate(" + t/20 + "deg)"
    }, i.prototype._getTransformRound = function(t) {
        return "translate3d(0, " + Math.round(t) + "px, 0) rotate(" + Math.round(t)/20 + "deg)"
    };
    var n = function(t) {
            function o(o, i) {
                void 0 === i && (i = {});
                var n = i.speed;
                void 0 === n && (n = .1);
                var r = i.speedSp;
                void 0 === r && (r = n);
                var s = i.isSP;
                void 0 === s && (s = e);
                var a = i.autoRun;
                void 0 === a && (a = !0), i.autoRun = !1, t.call(this, o, i), this._speedPc = n, this._speedSp = r, this._isSP = s, a && this.run()
            }
            return t && (o.__proto__ = t), o.prototype = Object.create(t && t.prototype), o.prototype.constructor = o, o.prototype._cache = function() {
                this._isSpCurrent = this._isSP(), this._speed = this._isSpCurrent ? this._speedSp : this._speedPc, this._speed *= window.innerWidth / window.innerHeight, t.prototype._cache.call(this)
            }, o.prototype._cacheElementPos = function(t, e) {
                if (!this._isSpCurrent || "false" !== t.dataset.sp) {
                    var o = t.getBoundingClientRect(),
                        i = o.top + e;
                    return {
                        el: t,
                        top: i,
                        center: i + o.height / 2,
                        speed: parseFloat(t.dataset.speed, 10) || this._speed,
                        inPos: i - this._windowHeight,
                        outPos: o.bottom + e
                    }
                }
            }, o.prototype._update = function() {
                this._centerViewport = this._scrollTop + this._windowHeight / 2, t.prototype._update.call(this)
            }, o.prototype._updateElement = function(t) {
                if (this._scrollTop > t.outPos);
                else if (this._scrollTop > t.inPos) {
                    var e = (t.center - this._centerViewport) * t.speed;
                    t.el.style.transform = this[this._fTansform](e)
                }
            }, o
        }(i),
        r = function(t) {
            function e(e, o) {
                t.call(this, e, o)
            }
            return t && (e.__proto__ = t), e.prototype = Object.create(t && t.prototype), e.prototype.constructor = e, e.prototype._cacheElementPos = function(t, e) {
                var o = t.getBoundingClientRect(),
                    i = t.parentNode.getBoundingClientRect(),
                    n = i.top + e - this._windowHeight,
                    r = i.bottom + e;
                return {
                    el: t,
                    max: i.height - o.height,
                    inPos: n,
                    outPos: r,
                    distance: r - n,
                    offset: i.top - o.top
                }
            }, e.prototype._updateElement = function(t) {
                if (this._scrollTop > t.outPos);
                else {
                    var e = this._scrollTop - t.inPos;
                    if (e > 0) {
                        var o = e / t.distance,
                            i = t.offset + t.max - t.max * o;
                        t.el.style.transform = this[this._fTansform](i)
                    }
                }
            }, e
        }(i);
    return t.NormalParallax = n, t.BackgroundParallax = r, t
}({});
