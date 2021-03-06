! function (t) {
    if ("object" == typeof exports) module.exports = t();
    else if ("function" == typeof define && define.amd) define(t);
    else {
        var e;
        "undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.PF = t()
    }
}(function () {
    return function t(e, i, n) {
        function r(a, s) {
            if (!i[a]) {
                if (!e[a]) {
                    var l = "function" == typeof require && require;
                    if (!s && l) return l(a, !0);
                    if (o) return o(a, !0);
                    throw new Error("Cannot find module '" + a + "'")
                }
                var h = i[a] = {
                    exports: {}
                };
                e[a][0].call(h.exports, function (t) {
                    var i = e[a][1][t];
                    return r(i ? i : t)
                }, h, h.exports, t, e, i, n)
            }
            return i[a].exports
        }
        for (var o = "function" == typeof require && require, a = 0; a < n.length; a++) r(n[a]);
        return r
    }({
        1: [function (t, e) {
            e.exports = t("./lib/heap")
        }, {
            "./lib/heap": 2
        }],
        2: [function (t, e) {
            (function () {
                var t, i, n, r, o, a, s, l, h, u, p, c, f, d, g;
                n = Math.floor, u = Math.min, i = function (t, e) {
                    return e > t ? -1 : t > e ? 1 : 0
                }, h = function (t, e, r, o, a) {
                    var s;
                    if (null == r && (r = 0), null == a && (a = i), 0 > r) throw new Error("lo must be non-negative");
                    for (null == o && (o = t.length); o > r;) s = n((r + o) / 2), a(e, t[s]) < 0 ? o = s : r = s + 1;
                    return [].splice.apply(t, [r, r - r].concat(e)), e
                }, a = function (t, e, n) {
                    return null == n && (n = i), t.push(e), d(t, 0, t.length - 1, n)
                }, o = function (t, e) {
                    var n, r;
                    return null == e && (e = i), n = t.pop(), t.length ? (r = t[0], t[0] = n, g(t, 0, e)) : r = n, r
                }, l = function (t, e, n) {
                    var r;
                    return null == n && (n = i), r = t[0], t[0] = e, g(t, 0, n), r
                }, s = function (t, e, n) {
                    var r;
                    return null == n && (n = i), t.length && n(t[0], e) < 0 && (r = [t[0], e], e = r[0], t[0] = r[1], g(t, 0, n)), e
                }, r = function (t, e) {
                    var r, o, a, s, l, h;
                    for (null == e && (e = i), s = function () {
                            h = [];
                            for (var e = 0, i = n(t.length / 2); i >= 0 ? i > e : e > i; i >= 0 ? e++ : e--) h.push(e);
                            return h
                        }.apply(this).reverse(), l = [], o = 0, a = s.length; a > o; o++) r = s[o], l.push(g(t, r, e));
                    return l
                }, f = function (t, e, n) {
                    var r;
                    return null == n && (n = i), r = t.indexOf(e), -1 !== r ? (d(t, 0, r, n), g(t, r, n)) : void 0
                }, p = function (t, e, n) {
                    var o, a, l, h, u;
                    if (null == n && (n = i), a = t.slice(0, e), !a.length) return a;
                    for (r(a, n), u = t.slice(e), l = 0, h = u.length; h > l; l++) o = u[l], s(a, o, n);
                    return a.sort(n).reverse()
                }, c = function (t, e, n) {
                    var a, s, l, p, c, f, d, g, b, v;
                    if (null == n && (n = i), 10 * e <= t.length) {
                        if (p = t.slice(0, e).sort(n), !p.length) return p;
                        for (l = p[p.length - 1], g = t.slice(e), c = 0, d = g.length; d > c; c++) a = g[c], n(a, l) < 0 && (h(p, a, 0, null, n), p.pop(), l = p[p.length - 1]);
                        return p
                    }
                    for (r(t, n), v = [], s = f = 0, b = u(e, t.length); b >= 0 ? b > f : f > b; s = b >= 0 ? ++f : --f) v.push(o(t, n));
                    return v
                }, d = function (t, e, n, r) {
                    var o, a, s;
                    for (null == r && (r = i), o = t[n]; n > e && (s = n - 1 >> 1, a = t[s], r(o, a) < 0);) t[n] = a, n = s;
                    return t[n] = o
                }, g = function (t, e, n) {
                    var r, o, a, s, l;
                    for (null == n && (n = i), o = t.length, l = e, a = t[e], r = 2 * e + 1; o > r;) s = r + 1, o > s && !(n(t[r], t[s]) < 0) && (r = s), t[e] = t[r], e = r, r = 2 * e + 1;
                    return t[e] = a, d(t, l, e, n)
                }, t = function () {
                    function t(t) {
                        this.cmp = null != t ? t : i, this.nodes = []
                    }
                    return t.push = a, t.pop = o, t.replace = l, t.pushpop = s, t.heapify = r, t.updateItem = f, t.nlargest = p, t.nsmallest = c, t.prototype.push = function (t) {
                        return a(this.nodes, t, this.cmp)
                    }, t.prototype.pop = function () {
                        return o(this.nodes, this.cmp)
                    }, t.prototype.peek = function () {
                        return this.nodes[0]
                    }, t.prototype.contains = function (t) {
                        return -1 !== this.nodes.indexOf(t)
                    }, t.prototype.replace = function (t) {
                        return l(this.nodes, t, this.cmp)
                    }, t.prototype.pushpop = function (t) {
                        return s(this.nodes, t, this.cmp)
                    }, t.prototype.heapify = function () {
                        return r(this.nodes, this.cmp)
                    }, t.prototype.updateItem = function (t) {
                        return f(this.nodes, t, this.cmp)
                    }, t.prototype.clear = function () {
                        return this.nodes = []
                    }, t.prototype.empty = function () {
                        return 0 === this.nodes.length
                    }, t.prototype.size = function () {
                        return this.nodes.length
                    }, t.prototype.clone = function () {
                        var e;
                        return e = new t, e.nodes = this.nodes.slice(0), e
                    }, t.prototype.toArray = function () {
                        return this.nodes.slice(0)
                    }, t.prototype.insert = t.prototype.push, t.prototype.top = t.prototype.peek, t.prototype.front = t.prototype.peek, t.prototype.has = t.prototype.contains, t.prototype.copy = t.prototype.clone, t
                }(), ("undefined" != typeof e && null !== e ? e.exports : void 0) ? e.exports = t : window.Heap = t
            }).call(this)
        }, {}],
        3: [function (t, e) {
            var i = {
                Always: 1,
                Never: 2,
                IfAtMostOneObstacle: 3,
                OnlyWhenNoObstacles: 4
            };
            e.exports = i
        }, {}],
        4: [function (t, e) {
            function i(t, e, i) {
                var n;
                "object" != typeof t ? n = t : (e = t.length, n = t[0].length, i = t), this.width = n, this.height = e, this.nodes = this._buildNodes(n, e, i)
            }
            var n = t("./Node"),
                r = t("./DiagonalMovement");
            i.prototype._buildNodes = function (t, e, i) {
                var r, o, a = new Array(e);
                for (r = 0; e > r; ++r)
                    for (a[r] = new Array(t), o = 0; t > o; ++o) a[r][o] = new n(o, r);
                if (void 0 === i) return a;
                if (i.length !== e || i[0].length !== t) throw new Error("Matrix size does not fit");
                for (r = 0; e > r; ++r)
                    for (o = 0; t > o; ++o) i[r][o] && (a[r][o].walkable = !1);
                return a
            }, i.prototype.getNodeAt = function (t, e) {
                return this.nodes[e][t]
            }, i.prototype.isWalkableAt = function (t, e) {
                return this.isInside(t, e) && this.nodes[e][t].walkable
            }, i.prototype.isInside = function (t, e) {
                return t >= 0 && t < this.width && e >= 0 && e < this.height
            }, i.prototype.setWalkableAt = function (t, e, i) {
                this.nodes[e][t].walkable = i
            }, i.prototype.getNeighbors = function (t, e) {
                var i = t.x,
                    n = t.y,
                    o = [],
                    a = !1,
                    s = !1,
                    l = !1,
                    h = !1,
                    u = !1,
                    p = !1,
                    c = !1,
                    f = !1,
                    d = this.nodes;
                if (this.isWalkableAt(i, n - 1) && (o.push(d[n - 1][i]), a = !0), this.isWalkableAt(i + 1, n) && (o.push(d[n][i + 1]), l = !0), this.isWalkableAt(i, n + 1) && (o.push(d[n + 1][i]), u = !0), this.isWalkableAt(i - 1, n) && (o.push(d[n][i - 1]), c = !0), e === r.Never) return o;
                if (e === r.OnlyWhenNoObstacles) s = c && a, h = a && l, p = l && u, f = u && c;
                else if (e === r.IfAtMostOneObstacle) s = c || a, h = a || l, p = l || u, f = u || c;
                else {
                    if (e !== r.Always) throw new Error("Incorrect value of diagonalMovement");
                    s = !0, h = !0, p = !0, f = !0
                }
                return s && this.isWalkableAt(i - 1, n - 1) && o.push(d[n - 1][i - 1]), h && this.isWalkableAt(i + 1, n - 1) && o.push(d[n - 1][i + 1]), p && this.isWalkableAt(i + 1, n + 1) && o.push(d[n + 1][i + 1]), f && this.isWalkableAt(i - 1, n + 1) && o.push(d[n + 1][i - 1]), o
            }, i.prototype.clone = function () {
                var t, e, r = this.width,
                    o = this.height,
                    a = this.nodes,
                    s = new i(r, o),
                    l = new Array(o);
                for (t = 0; o > t; ++t)
                    for (l[t] = new Array(r), e = 0; r > e; ++e) l[t][e] = new n(e, t, a[t][e].walkable);
                return s.nodes = l, s
            }, e.exports = i
        }, {
            "./DiagonalMovement": 3,
            "./Node": 6
        }],
        5: [function (t, e) {
            e.exports = {
                manhattan: function (t, e) {
                    return t + e
                },
                euclidean: function (t, e) {
                    return Math.sqrt(t * t + e * e)
                },
                octile: function (t, e) {
                    var i = Math.SQRT2 - 1;
                    return e > t ? i * t + e : i * e + t
                },
                chebyshev: function (t, e) {
                    return Math.max(t, e)
                }
            }
        }, {}],
        6: [function (t, e) {
            function i(t, e, i) {
                this.x = t, this.y = e, this.walkable = void 0 === i ? !0 : i
            }
            e.exports = i
        }, {}],
        7: [function (t, e, i) {
            function n(t) {
                for (var e = [
                        [t.x, t.y]
                    ]; t.parent;) t = t.parent, e.push([t.x, t.y]);
                return e.reverse()
            }

            function r(t, e) {
                var i = n(t),
                    r = n(e);
                return i.concat(r.reverse())
            }

            function o(t) {
                var e, i, n, r, o, a = 0;
                for (e = 1; e < t.length; ++e) i = t[e - 1], n = t[e], r = i[0] - n[0], o = i[1] - n[1], a += Math.sqrt(r * r + o * o);
                return a
            }

            function a(t, e, i, n) {
                var r, o, a, s, l, h, u = Math.abs,
                    p = [];
                for (a = u(i - t), s = u(n - e), r = i > t ? 1 : -1, o = n > e ? 1 : -1, l = a - s;;) {
                    if (p.push([t, e]), t === i && e === n) break;
                    h = 2 * l, h > -s && (l -= s, t += r), a > h && (l += a, e += o)
                }
                return p
            }

            function s(t) {
                var e, i, n, r, o, s, l = [],
                    h = t.length;
                if (2 > h) return l;
                for (o = 0; h - 1 > o; ++o)
                    for (e = t[o], i = t[o + 1], n = a(e[0], e[1], i[0], i[1]), r = n.length, s = 0; r - 1 > s; ++s) l.push(n[s]);
                return l.push(t[h - 1]), l
            }

            function l(t, e) {
                var i, n, r, o, s, l, h, u, p, c, f, d = e.length,
                    g = e[0][0],
                    b = e[0][1],
                    v = e[d - 1][0],
                    A = e[d - 1][1];
                for (i = g, n = b, s = [
                        [i, n]
                    ], l = 2; d > l; ++l) {
                    for (u = e[l], r = u[0], o = u[1], p = a(i, n, r, o), f = !1, h = 1; h < p.length; ++h)
                        if (c = p[h], !t.isWalkableAt(c[0], c[1])) {
                            f = !0;
                            break
                        }
                    f && (lastValidCoord = e[l - 1], s.push(lastValidCoord), i = lastValidCoord[0], n = lastValidCoord[1])
                }
                return s.push([v, A]), s
            }

            function h(t) {
                if (t.length < 3) return t;
                var e, i, n, r, o, a, s = [],
                    l = t[0][0],
                    h = t[0][1],
                    u = t[1][0],
                    p = t[1][1],
                    c = u - l,
                    f = p - h;
                for (o = Math.sqrt(c * c + f * f), c /= o, f /= o, s.push([l, h]), a = 2; a < t.length; a++) e = u, i = p, n = c, r = f, u = t[a][0], p = t[a][1], c = u - e, f = p - i, o = Math.sqrt(c * c + f * f), c /= o, f /= o, (c !== n || f !== r) && s.push([e, i]);
                return s.push([u, p]), s
            }
            i.backtrace = n, i.biBacktrace = r, i.pathLength = o, i.interpolate = a, i.expandPath = s, i.smoothenPath = l, i.compressPath = h
        }, {}],
        8: [function (t, e) {
            e.exports = {
                Heap: t("heap"),
                Node: t("./core/Node"),
                Grid: t("./core/Grid"),
                Util: t("./core/Util"),
                DiagonalMovement: t("./core/DiagonalMovement"),
                Heuristic: t("./core/Heuristic"),
                AStarFinder: t("./finders/AStarFinder"),
                BestFirstFinder: t("./finders/BestFirstFinder"),
                BreadthFirstFinder: t("./finders/BreadthFirstFinder"),
                DijkstraFinder: t("./finders/DijkstraFinder"),
                BiAStarFinder: t("./finders/BiAStarFinder"),
                BiBestFirstFinder: t("./finders/BiBestFirstFinder"),
                BiBreadthFirstFinder: t("./finders/BiBreadthFirstFinder"),
                BiDijkstraFinder: t("./finders/BiDijkstraFinder"),
                IDAStarFinder: t("./finders/IDAStarFinder"),
                JumpPointFinder: t("./finders/JumpPointFinder")
            }
        }, {
            "./core/DiagonalMovement": 3,
            "./core/Grid": 4,
            "./core/Heuristic": 5,
            "./core/Node": 6,
            "./core/Util": 7,
            "./finders/AStarFinder": 9,
            "./finders/BestFirstFinder": 10,
            "./finders/BiAStarFinder": 11,
            "./finders/BiBestFirstFinder": 12,
            "./finders/BiBreadthFirstFinder": 13,
            "./finders/BiDijkstraFinder": 14,
            "./finders/BreadthFirstFinder": 15,
            "./finders/DijkstraFinder": 16,
            "./finders/IDAStarFinder": 17,
            "./finders/JumpPointFinder": 22,
            heap: 1
        }],
        9: [function (t, e) {
            function i(t) {
                t = t || {}, this.allowDiagonal = t.allowDiagonal, this.dontCrossCorners = t.dontCrossCorners, this.heuristic = t.heuristic || o.manhattan, this.weight = t.weight || 1, this.diagonalMovement = t.diagonalMovement, this.diagonalMovement || (this.diagonalMovement = this.allowDiagonal ? this.dontCrossCorners ? a.OnlyWhenNoObstacles : a.IfAtMostOneObstacle : a.Never), this.heuristic = this.diagonalMovement === a.Never ? t.heuristic || o.manhattan : t.heuristic || o.octile
            }
            var n = t("heap"),
                r = t("../core/Util"),
                o = t("../core/Heuristic"),
                a = t("../core/DiagonalMovement");
            i.prototype.findPath = function (t, e, i, o, a) {
                var s, l, h, u, p, c, f, d, g = new n(function (t, e) {
                        return t.f - e.f
                    }),
                    b = a.getNodeAt(t, e),
                    v = a.getNodeAt(i, o),
                    A = this.heuristic,
                    m = this.diagonalMovement,
                    y = this.weight,
                    k = Math.abs,
                    M = Math.SQRT2;
                for (b.g = 0, b.f = 0, g.push(b), b.opened = !0; !g.empty();) {
                    if (s = g.pop(), s.closed = !0, s === v) return r.backtrace(v);
                    for (l = a.getNeighbors(s, m), u = 0, p = l.length; p > u; ++u) h = l[u], h.closed || (c = h.x, f = h.y, d = s.g + (c - s.x === 0 || f - s.y === 0 ? 1 : M), (!h.opened || d < h.g) && (h.g = d, h.h = h.h || y * A(k(c - i), k(f - o)), h.f = h.g + h.h, h.parent = s, h.opened ? g.updateItem(h) : (g.push(h), h.opened = !0)))
                }
                return []
            }, e.exports = i
        }, {
            "../core/DiagonalMovement": 3,
            "../core/Heuristic": 5,
            "../core/Util": 7,
            heap: 1
        }],
        10: [function (t, e) {
            function i(t) {
                n.call(this, t);
                var e = this.heuristic;
                this.heuristic = function (t, i) {
                    return 1e6 * e(t, i)
                }
            }
            var n = t("./AStarFinder");
            i.prototype = new n, i.prototype.constructor = i, e.exports = i
        }, {
            "./AStarFinder": 9
        }],
        11: [function (t, e) {
            function i(t) {
                t = t || {}, this.allowDiagonal = t.allowDiagonal, this.dontCrossCorners = t.dontCrossCorners, this.diagonalMovement = t.diagonalMovement, this.heuristic = t.heuristic || o.manhattan, this.weight = t.weight || 1, this.diagonalMovement || (this.diagonalMovement = this.allowDiagonal ? this.dontCrossCorners ? a.OnlyWhenNoObstacles : a.IfAtMostOneObstacle : a.Never), this.heuristic = this.diagonalMovement === a.Never ? t.heuristic || o.manhattan : t.heuristic || o.octile
            }
            var n = t("heap"),
                r = t("../core/Util"),
                o = t("../core/Heuristic"),
                a = t("../core/DiagonalMovement");
            i.prototype.findPath = function (t, e, i, o, a) {
                var s, l, h, u, p, c, f, d, g = function (t, e) {
                        return t.f - e.f
                    },
                    b = new n(g),
                    v = new n(g),
                    A = a.getNodeAt(t, e),
                    m = a.getNodeAt(i, o),
                    y = this.heuristic,
                    k = this.diagonalMovement,
                    M = this.weight,
                    W = Math.abs,
                    w = Math.SQRT2,
                    N = 1,
                    x = 2;
                for (A.g = 0, A.f = 0, b.push(A), A.opened = N, m.g = 0, m.f = 0, v.push(m), m.opened = x; !b.empty() && !v.empty();) {
                    for (s = b.pop(), s.closed = !0, l = a.getNeighbors(s, k), u = 0, p = l.length; p > u; ++u)
                        if (h = l[u], !h.closed) {
                            if (h.opened === x) return r.biBacktrace(s, h);
                            c = h.x, f = h.y, d = s.g + (c - s.x === 0 || f - s.y === 0 ? 1 : w), (!h.opened || d < h.g) && (h.g = d, h.h = h.h || M * y(W(c - i), W(f - o)), h.f = h.g + h.h, h.parent = s, h.opened ? b.updateItem(h) : (b.push(h), h.opened = N))
                        }
                    for (s = v.pop(), s.closed = !0, l = a.getNeighbors(s, k), u = 0, p = l.length; p > u; ++u)
                        if (h = l[u], !h.closed) {
                            if (h.opened === N) return r.biBacktrace(h, s);
                            c = h.x, f = h.y, d = s.g + (c - s.x === 0 || f - s.y === 0 ? 1 : w), (!h.opened || d < h.g) && (h.g = d, h.h = h.h || M * y(W(c - t), W(f - e)), h.f = h.g + h.h, h.parent = s, h.opened ? v.updateItem(h) : (v.push(h), h.opened = x))
                        }
                }
                return []
            }, e.exports = i
        }, {
            "../core/DiagonalMovement": 3,
            "../core/Heuristic": 5,
            "../core/Util": 7,
            heap: 1
        }],
        12: [function (t, e) {
            function i(t) {
                n.call(this, t);
                var e = this.heuristic;
                this.heuristic = function (t, i) {
                    return 1e6 * e(t, i)
                }
            }
            var n = t("./BiAStarFinder");
            i.prototype = new n, i.prototype.constructor = i, e.exports = i
        }, {
            "./BiAStarFinder": 11
        }],
        13: [function (t, e) {
            function i(t) {
                t = t || {}, this.allowDiagonal = t.allowDiagonal, this.dontCrossCorners = t.dontCrossCorners, this.diagonalMovement = t.diagonalMovement, this.diagonalMovement || (this.diagonalMovement = this.allowDiagonal ? this.dontCrossCorners ? r.OnlyWhenNoObstacles : r.IfAtMostOneObstacle : r.Never)
            }
            var n = t("../core/Util"),
                r = t("../core/DiagonalMovement");
            i.prototype.findPath = function (t, e, i, r, o) {
                var a, s, l, h, u, p = o.getNodeAt(t, e),
                    c = o.getNodeAt(i, r),
                    f = [],
                    d = [],
                    g = this.diagonalMovement,
                    b = 0,
                    v = 1;
                for (f.push(p), p.opened = !0, p.by = b, d.push(c), c.opened = !0, c.by = v; f.length && d.length;) {
                    for (l = f.shift(), l.closed = !0, a = o.getNeighbors(l, g), h = 0, u = a.length; u > h; ++h)
                        if (s = a[h], !s.closed)
                            if (s.opened) {
                                if (s.by === v) return n.biBacktrace(l, s)
                            } else f.push(s), s.parent = l, s.opened = !0, s.by = b;
                    for (l = d.shift(), l.closed = !0, a = o.getNeighbors(l, g), h = 0, u = a.length; u > h; ++h)
                        if (s = a[h], !s.closed)
                            if (s.opened) {
                                if (s.by === b) return n.biBacktrace(s, l)
                            } else d.push(s), s.parent = l, s.opened = !0, s.by = v
                }
                return []
            }, e.exports = i
        }, {
            "../core/DiagonalMovement": 3,
            "../core/Util": 7
        }],
        14: [function (t, e) {
            function i(t) {
                n.call(this, t), this.heuristic = function () {
                    return 0
                }
            }
            var n = t("./BiAStarFinder");
            i.prototype = new n, i.prototype.constructor = i, e.exports = i
        }, {
            "./BiAStarFinder": 11
        }],
        15: [function (t, e) {
            function i(t) {
                t = t || {}, this.allowDiagonal = t.allowDiagonal, this.dontCrossCorners = t.dontCrossCorners, this.diagonalMovement = t.diagonalMovement, this.diagonalMovement || (this.diagonalMovement = this.allowDiagonal ? this.dontCrossCorners ? r.OnlyWhenNoObstacles : r.IfAtMostOneObstacle : r.Never)
            }
            var n = t("../core/Util"),
                r = t("../core/DiagonalMovement");
            i.prototype.findPath = function (t, e, i, r, o) {
                var a, s, l, h, u, p = [],
                    c = this.diagonalMovement,
                    f = o.getNodeAt(t, e),
                    d = o.getNodeAt(i, r);
                for (p.push(f), f.opened = !0; p.length;) {
                    if (l = p.shift(), l.closed = !0, l === d) return n.backtrace(d);
                    for (a = o.getNeighbors(l, c), h = 0, u = a.length; u > h; ++h) s = a[h], s.closed || s.opened || (p.push(s), s.opened = !0, s.parent = l)
                }
                return []
            }, e.exports = i
        }, {
            "../core/DiagonalMovement": 3,
            "../core/Util": 7
        }],
        16: [function (t, e) {
            function i(t) {
                n.call(this, t), this.heuristic = function () {
                    return 0
                }
            }
            var n = t("./AStarFinder");
            i.prototype = new n, i.prototype.constructor = i, e.exports = i
        }, {
            "./AStarFinder": 9
        }],
        17: [function (t, e) {
            function i(t) {
                t = t || {}, this.allowDiagonal = t.allowDiagonal, this.dontCrossCorners = t.dontCrossCorners, this.diagonalMovement = t.diagonalMovement, this.heuristic = t.heuristic || n.manhattan, this.weight = t.weight || 1, this.trackRecursion = t.trackRecursion || !1, this.timeLimit = t.timeLimit || 1 / 0, this.diagonalMovement || (this.diagonalMovement = this.allowDiagonal ? this.dontCrossCorners ? o.OnlyWhenNoObstacles : o.IfAtMostOneObstacle : o.Never), this.heuristic = this.diagonalMovement === o.Never ? t.heuristic || n.manhattan : t.heuristic || n.octile
            }
            var n = (t("../core/Util"), t("../core/Heuristic")),
                r = t("../core/Node"),
                o = t("../core/DiagonalMovement");
            i.prototype.findPath = function (t, e, i, n, o) {
                var a, s, l, h = 0,
                    u = (new Date).getTime(),
                    p = function (t, e) {
                        return this.heuristic(Math.abs(e.x - t.x), Math.abs(e.y - t.y))
                    }.bind(this),
                    c = function (t, e) {
                        return t.x === e.x || t.y === e.y ? 1 : Math.SQRT2
                    },
                    f = function (t, e, i, n, a) {
                        if (h++, this.timeLimit > 0 && (new Date).getTime() - u > 1e3 * this.timeLimit) return 1 / 0;
                        var s = e + p(t, g) * this.weight;
                        if (s > i) return s;
                        if (t == g) return n[a] = [t.x, t.y], t;
                        var l, d, b, v, A = o.getNeighbors(t, this.diagonalMovement);
                        for (b = 0, l = 1 / 0; v = A[b]; ++b) {
                            if (this.trackRecursion && (v.retainCount = v.retainCount + 1 || 1, v.tested !== !0 && (v.tested = !0)), d = f(v, e + c(t, v), i, n, a + 1), d instanceof r) return n[a] = [t.x, t.y], d;
                            this.trackRecursion && 0 === --v.retainCount && (v.tested = !1), l > d && (l = d)
                        }
                        return l
                    }.bind(this),
                    d = o.getNodeAt(t, e),
                    g = o.getNodeAt(i, n),
                    b = p(d, g);
                for (a = 0; !0; ++a) {
                    if (s = [], l = f(d, 0, b, s, 0), 1 / 0 === l) return [];
                    if (l instanceof r) return s;
                    b = l
                }
                return []
            }, e.exports = i
        }, {
            "../core/DiagonalMovement": 3,
            "../core/Heuristic": 5,
            "../core/Node": 6,
            "../core/Util": 7
        }],
        18: [function (t, e) {
            function i(t) {
                n.call(this, t)
            }
            var n = t("./JumpPointFinderBase"),
                r = t("../core/DiagonalMovement");
            i.prototype = new n, i.prototype.constructor = i, i.prototype._jump = function (t, e, i, n) {
                var r = this.grid,
                    o = t - i,
                    a = e - n;
                if (!r.isWalkableAt(t, e)) return null;
                if (this.trackJumpRecursion === !0 && (r.getNodeAt(t, e).tested = !0), r.getNodeAt(t, e) === this.endNode) return [t, e];
                if (0 !== o && 0 !== a) {
                    if (r.isWalkableAt(t - o, e + a) && !r.isWalkableAt(t - o, e) || r.isWalkableAt(t + o, e - a) && !r.isWalkableAt(t, e - a)) return [t, e];
                    if (this._jump(t + o, e, t, e) || this._jump(t, e + a, t, e)) return [t, e]
                } else if (0 !== o) {
                    if (r.isWalkableAt(t + o, e + 1) && !r.isWalkableAt(t, e + 1) || r.isWalkableAt(t + o, e - 1) && !r.isWalkableAt(t, e - 1)) return [t, e]
                } else if (r.isWalkableAt(t + 1, e + a) && !r.isWalkableAt(t + 1, e) || r.isWalkableAt(t - 1, e + a) && !r.isWalkableAt(t - 1, e)) return [t, e];
                return this._jump(t + o, e + a, t, e)
            }, i.prototype._findNeighbors = function (t) {
                var e, i, n, o, a, s, l, h, u = t.parent,
                    p = t.x,
                    c = t.y,
                    f = this.grid,
                    d = [];
                if (u) e = u.x, i = u.y, n = (p - e) / Math.max(Math.abs(p - e), 1), o = (c - i) / Math.max(Math.abs(c - i), 1), 0 !== n && 0 !== o ? (f.isWalkableAt(p, c + o) && d.push([p, c + o]), f.isWalkableAt(p + n, c) && d.push([p + n, c]), f.isWalkableAt(p + n, c + o) && d.push([p + n, c + o]), f.isWalkableAt(p - n, c) || d.push([p - n, c + o]), f.isWalkableAt(p, c - o) || d.push([p + n, c - o])) : 0 === n ? (f.isWalkableAt(p, c + o) && d.push([p, c + o]), f.isWalkableAt(p + 1, c) || d.push([p + 1, c + o]), f.isWalkableAt(p - 1, c) || d.push([p - 1, c + o])) : (f.isWalkableAt(p + n, c) && d.push([p + n, c]), f.isWalkableAt(p, c + 1) || d.push([p + n, c + 1]), f.isWalkableAt(p, c - 1) || d.push([p + n, c - 1]));
                else
                    for (a = f.getNeighbors(t, r.Always), l = 0, h = a.length; h > l; ++l) s = a[l], d.push([s.x, s.y]);
                return d
            }, e.exports = i
        }, {
            "../core/DiagonalMovement": 3,
            "./JumpPointFinderBase": 23
        }],
        19: [function (t, e) {
            function i(t) {
                n.call(this, t)
            }
            var n = t("./JumpPointFinderBase"),
                r = t("../core/DiagonalMovement");
            i.prototype = new n, i.prototype.constructor = i, i.prototype._jump = function (t, e, i, n) {
                var r = this.grid,
                    o = t - i,
                    a = e - n;
                if (!r.isWalkableAt(t, e)) return null;
                if (this.trackJumpRecursion === !0 && (r.getNodeAt(t, e).tested = !0), r.getNodeAt(t, e) === this.endNode) return [t, e];
                if (0 !== o && 0 !== a) {
                    if (r.isWalkableAt(t - o, e + a) && !r.isWalkableAt(t - o, e) || r.isWalkableAt(t + o, e - a) && !r.isWalkableAt(t, e - a)) return [t, e];
                    if (this._jump(t + o, e, t, e) || this._jump(t, e + a, t, e)) return [t, e]
                } else if (0 !== o) {
                    if (r.isWalkableAt(t + o, e + 1) && !r.isWalkableAt(t, e + 1) || r.isWalkableAt(t + o, e - 1) && !r.isWalkableAt(t, e - 1)) return [t, e]
                } else if (r.isWalkableAt(t + 1, e + a) && !r.isWalkableAt(t + 1, e) || r.isWalkableAt(t - 1, e + a) && !r.isWalkableAt(t - 1, e)) return [t, e];
                return r.isWalkableAt(t + o, e) || r.isWalkableAt(t, e + a) ? this._jump(t + o, e + a, t, e) : null
            }, i.prototype._findNeighbors = function (t) {
                var e, i, n, o, a, s, l, h, u = t.parent,
                    p = t.x,
                    c = t.y,
                    f = this.grid,
                    d = [];
                if (u) e = u.x, i = u.y, n = (p - e) / Math.max(Math.abs(p - e), 1), o = (c - i) / Math.max(Math.abs(c - i), 1), 0 !== n && 0 !== o ? (f.isWalkableAt(p, c + o) && d.push([p, c + o]), f.isWalkableAt(p + n, c) && d.push([p + n, c]), (f.isWalkableAt(p, c + o) || f.isWalkableAt(p + n, c)) && d.push([p + n, c + o]), !f.isWalkableAt(p - n, c) && f.isWalkableAt(p, c + o) && d.push([p - n, c + o]), !f.isWalkableAt(p, c - o) && f.isWalkableAt(p + n, c) && d.push([p + n, c - o])) : 0 === n ? f.isWalkableAt(p, c + o) && (d.push([p, c + o]), f.isWalkableAt(p + 1, c) || d.push([p + 1, c + o]), f.isWalkableAt(p - 1, c) || d.push([p - 1, c + o])) : f.isWalkableAt(p + n, c) && (d.push([p + n, c]), f.isWalkableAt(p, c + 1) || d.push([p + n, c + 1]), f.isWalkableAt(p, c - 1) || d.push([p + n, c - 1]));
                else
                    for (a = f.getNeighbors(t, r.IfAtMostOneObstacle), l = 0, h = a.length; h > l; ++l) s = a[l], d.push([s.x, s.y]);
                return d
            }, e.exports = i
        }, {
            "../core/DiagonalMovement": 3,
            "./JumpPointFinderBase": 23
        }],
        20: [function (t, e) {
            function i(t) {
                n.call(this, t)
            }
            var n = t("./JumpPointFinderBase"),
                r = t("../core/DiagonalMovement");
            i.prototype = new n, i.prototype.constructor = i, i.prototype._jump = function (t, e, i, n) {
                var r = this.grid,
                    o = t - i,
                    a = e - n;
                if (!r.isWalkableAt(t, e)) return null;
                if (this.trackJumpRecursion === !0 && (r.getNodeAt(t, e).tested = !0), r.getNodeAt(t, e) === this.endNode) return [t, e];
                if (0 !== o && 0 !== a) {
                    if (this._jump(t + o, e, t, e) || this._jump(t, e + a, t, e)) return [t, e]
                } else if (0 !== o) {
                    if (r.isWalkableAt(t, e - 1) && !r.isWalkableAt(t - o, e - 1) || r.isWalkableAt(t, e + 1) && !r.isWalkableAt(t - o, e + 1)) return [t, e]
                } else if (0 !== a && (r.isWalkableAt(t - 1, e) && !r.isWalkableAt(t - 1, e - a) || r.isWalkableAt(t + 1, e) && !r.isWalkableAt(t + 1, e - a))) return [t, e];
                return r.isWalkableAt(t + o, e) && r.isWalkableAt(t, e + a) ? this._jump(t + o, e + a, t, e) : null
            }, i.prototype._findNeighbors = function (t) {
                var e, i, n, o, a, s, l, h, u = t.parent,
                    p = t.x,
                    c = t.y,
                    f = this.grid,
                    d = [];
                if (u)
                    if (e = u.x, i = u.y, n = (p - e) / Math.max(Math.abs(p - e), 1), o = (c - i) / Math.max(Math.abs(c - i), 1), 0 !== n && 0 !== o) f.isWalkableAt(p, c + o) && d.push([p, c + o]), f.isWalkableAt(p + n, c) && d.push([p + n, c]), f.isWalkableAt(p, c + o) && f.isWalkableAt(p + n, c) && d.push([p + n, c + o]);
                    else {
                        var g;
                        if (0 !== n) {
                            g = f.isWalkableAt(p + n, c);
                            var b = f.isWalkableAt(p, c + 1),
                                v = f.isWalkableAt(p, c - 1);
                            g && (d.push([p + n, c]), b && d.push([p + n, c + 1]), v && d.push([p + n, c - 1])), b && d.push([p, c + 1]), v && d.push([p, c - 1])
                        } else if (0 !== o) {
                            g = f.isWalkableAt(p, c + o);
                            var A = f.isWalkableAt(p + 1, c),
                                m = f.isWalkableAt(p - 1, c);
                            g && (d.push([p, c + o]), A && d.push([p + 1, c + o]), m && d.push([p - 1, c + o])), A && d.push([p + 1, c]), m && d.push([p - 1, c])
                        }
                    }
                else
                    for (a = f.getNeighbors(t, r.OnlyWhenNoObstacles), l = 0, h = a.length; h > l; ++l) s = a[l], d.push([s.x, s.y]);
                return d
            }, e.exports = i
        }, {
            "../core/DiagonalMovement": 3,
            "./JumpPointFinderBase": 23
        }],
        21: [function (t, e) {
            function i(t) {
                n.call(this, t)
            }
            var n = t("./JumpPointFinderBase"),
                r = t("../core/DiagonalMovement");
            i.prototype = new n, i.prototype.constructor = i, i.prototype._jump = function (t, e, i, n) {
                var r = this.grid,
                    o = t - i,
                    a = e - n;
                if (!r.isWalkableAt(t, e)) return null;
                if (this.trackJumpRecursion === !0 && (r.getNodeAt(t, e).tested = !0), r.getNodeAt(t, e) === this.endNode) return [t, e];
                if (0 !== o) {
                    if (r.isWalkableAt(t, e - 1) && !r.isWalkableAt(t - o, e - 1) || r.isWalkableAt(t, e + 1) && !r.isWalkableAt(t - o, e + 1)) return [t, e]
                } else {
                    if (0 === a) throw new Error("Only horizontal and vertical movements are allowed");
                    if (r.isWalkableAt(t - 1, e) && !r.isWalkableAt(t - 1, e - a) || r.isWalkableAt(t + 1, e) && !r.isWalkableAt(t + 1, e - a)) return [t, e];
                    if (this._jump(t + 1, e, t, e) || this._jump(t - 1, e, t, e)) return [t, e]
                }
                return this._jump(t + o, e + a, t, e)
            }, i.prototype._findNeighbors = function (t) {
                var e, i, n, o, a, s, l, h, u = t.parent,
                    p = t.x,
                    c = t.y,
                    f = this.grid,
                    d = [];
                if (u) e = u.x, i = u.y, n = (p - e) / Math.max(Math.abs(p - e), 1), o = (c - i) / Math.max(Math.abs(c - i), 1), 0 !== n ? (f.isWalkableAt(p, c - 1) && d.push([p, c - 1]), f.isWalkableAt(p, c + 1) && d.push([p, c + 1]), f.isWalkableAt(p + n, c) && d.push([p + n, c])) : 0 !== o && (f.isWalkableAt(p - 1, c) && d.push([p - 1, c]), f.isWalkableAt(p + 1, c) && d.push([p + 1, c]), f.isWalkableAt(p, c + o) && d.push([p, c + o]));
                else
                    for (a = f.getNeighbors(t, r.Never), l = 0, h = a.length; h > l; ++l) s = a[l], d.push([s.x, s.y]);
                return d
            }, e.exports = i
        }, {
            "../core/DiagonalMovement": 3,
            "./JumpPointFinderBase": 23
        }],
        22: [function (t, e) {
            function i(t) {
                return t = t || {}, t.diagonalMovement === n.Never ? new r(t) : t.diagonalMovement === n.Always ? new o(t) : t.diagonalMovement === n.OnlyWhenNoObstacles ? new a(t) : new s(t)
            }
            var n = t("../core/DiagonalMovement"),
                r = t("./JPFNeverMoveDiagonally"),
                o = t("./JPFAlwaysMoveDiagonally"),
                a = t("./JPFMoveDiagonallyIfNoObstacles"),
                s = t("./JPFMoveDiagonallyIfAtMostOneObstacle");
            e.exports = i
        }, {
            "../core/DiagonalMovement": 3,
            "./JPFAlwaysMoveDiagonally": 18,
            "./JPFMoveDiagonallyIfAtMostOneObstacle": 19,
            "./JPFMoveDiagonallyIfNoObstacles": 20,
            "./JPFNeverMoveDiagonally": 21
        }],
        23: [function (t, e) {
            function i(t) {
                t = t || {}, this.heuristic = t.heuristic || o.manhattan, this.trackJumpRecursion = t.trackJumpRecursion || !1
            } {
                var n = t("heap"),
                    r = t("../core/Util"),
                    o = t("../core/Heuristic");
                t("../core/DiagonalMovement")
            }
            i.prototype.findPath = function (t, e, i, o, a) {
                var s, l = this.openList = new n(function (t, e) {
                        return t.f - e.f
                    }),
                    h = this.startNode = a.getNodeAt(t, e),
                    u = this.endNode = a.getNodeAt(i, o);
                for (this.grid = a, h.g = 0, h.f = 0, l.push(h), h.opened = !0; !l.empty();) {
                    if (s = l.pop(), s.closed = !0, s === u) return r.expandPath(r.backtrace(u));
                    this._identifySuccessors(s)
                }
                return []
            }, i.prototype._identifySuccessors = function (t) {
                {
                    var e, i, n, r, a, s, l, h, u, p, c = this.grid,
                        f = this.heuristic,
                        d = this.openList,
                        g = this.endNode.x,
                        b = this.endNode.y,
                        v = t.x,
                        A = t.y,
                        m = Math.abs;
                    Math.max
                }
                for (e = this._findNeighbors(t), r = 0, a = e.length; a > r; ++r)
                    if (i = e[r], n = this._jump(i[0], i[1], v, A)) {
                        if (s = n[0], l = n[1], p = c.getNodeAt(s, l), p.closed) continue;
                        h = o.octile(m(s - v), m(l - A)), u = t.g + h, (!p.opened || u < p.g) && (p.g = u, p.h = p.h || f(m(s - g), m(l - b)), p.f = p.g + p.h, p.parent = t, p.opened ? d.updateItem(p) : (d.push(p), p.opened = !0))
                    }
            }, e.exports = i
        }, {
            "../core/DiagonalMovement": 3,
            "../core/Heuristic": 5,
            "../core/Util": 7,
            heap: 1
        }]
    }, {}, [8])(8)
});