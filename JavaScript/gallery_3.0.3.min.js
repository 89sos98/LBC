(function(a, b, c, d) {
    function g(a, b, c) {
        var a = parseInt(a, 10) || 0,
        b = parseInt(b, 10) || 0,
        d = parseInt(c, 10) || 8;
        if (1 > b || 1 > a || a > b) return ! 1;
        var e = [],
        f = "",
        g = d - 4,
        h = d - 2,
        i = Math.ceil(g / 2) - 1,
        j = g - (i + 1);
        if (d >= b) for (var k = 1; b >= k; k += 1) e.push(k);
        else if (g >= a) {
            for (var k = 1; h >= k; k += 1) e.push(k);
            e.push("...", b)
        } else if (a >= b - g) {
            e.push(1, "...");
            for (var k = b - h + 1; b >= k; k += 1) e.push(k)
        } else {
            e.push(1, "...");
            for (var k = a - i; a + j >= k; k += 1) e.push(k);
            e.push("...", b)
        }
        for (var k = 0; e.length > k; k += 1) f += "..." != e[k] ? e[k] == a ? '<li class="active"><span>' + e[k] + "</span></li>": "<li><span>" + e[k] + "</span></li>": "<li>" + e[k] + "</li>";
        return f
    }
    function h(a, b) {
        var c,
        d,
        e,
        f,
        g,
        h,
        j = i(function() {
            g = f = !1
        },
        b);
        return function() {
            c = this,
            d = arguments;
            var i = function() {
                e = null,
                g && (h = a.apply(c, d)),
                j()
            };
            return e || (e = setTimeout(i, b)),
            f ? g = !0: (f = !0, h = a.apply(c, d)),
            j(),
            h
        }
    }
    function i(a, b, c) {
        var d,
        e;
        return function() {
            var f = this,
            g = arguments,
            h = function() {
                d = null,
                c || (e = a.apply(f, g))
            },
            i = c && !d;
            return clearTimeout(d),
            d = setTimeout(h, b),
            i && (e = a.apply(f, g)),
            e
        }
    }
    function j(a, b) {
        var c,
        d,
        e = Function.prototype.bind,
        f = Array.prototype.slice,
        g = function() {};
        if (a.bind === e && e) return e.apply(a, f.call(arguments, 1));
        if ("function" != typeof a) throw new TypeError;
        return d = f.call(arguments, 2),
        c = function() {
            if (! (this instanceof c)) return a.apply(b, d.concat(f.call(arguments)));
            g.prototype = a.prototype;
            var e = new g,
            h = a.apply(e, d.concat(f.call(arguments)));
            return Object(h) === h ? h: e
        }
    }
    function k(a) {
        if (!a || "string" != typeof a) throw new TypeError;
        var b = a.match(/[^\x00-\xff]/gi);
        return a.length + (null == b ? 0: b.length)
    }
    function l(a, b) {
        for (var c = 0, d = "", e = 0; a.length > e; e++) if (a.charCodeAt(e) > 128 ? c += 2: c++, d += a.charAt(e), c >= b) return d;
        return d
    }
    var e = {
        create: function() {
            return function() {
                this.initialize.apply(this, arguments)
            }
        }
    },
    f = e.create();
    f.prototype = {
        initialize: function() {
            var d = this;
            this._initElements(),
            this._initData(),
            this._initSetInfo(),
            this._initThumbPaging(),
            this._initProgress(),
            a(b).on("resize", j(i(this.resetViewSize, 200), this)),
            a(c).ready(function() {
                d.resetViewSize(function() {
                    d.show(d._getInitPhotoIndex())
                })
            }),
            a(b).on("load", 
            function() {
                d._scrollToTop()
            }),
            this._initSwitchAround(),
            this._initSwitchMode(),
            b.commentData && this.el.$commentCount.text(b.commentData.joincount),
            b.twitteData && this.el.$shareCount.text(b.twitteData.retweetcount);
            var e = null;
            a(".actions .share, .share-more, .share-more-list").hover(function() {
                e && clearTimeout(e),
                a(".share-more").addClass("share-more-hover"),
                a(".share-more-list").show(),
                d._toggleDuilianAd("hide")
            },
            function() {
                e && clearTimeout(e),
                e = setTimeout(function() {
                    a(".share-more").removeClass("share-more-hover"),
                    a(".share-more-list").hide(),
                    d._toggleDuilianAd("show")
                },
                200)
            });
            var f = {
                lines: 11,
                length: 11,
                width: 5,
                radius: 13,
                corners: .9,
                rotate: 0,
                color: "#666",
                speed: 1,
                trail: 60,
                shadow: !1,
                hwaccel: !1,
                className: "spinner",
                zIndex: 2e9,
                top: "auto",
                left: "auto"
            };
            if (Spinner) {
                var g = new Spinner(f).spin();
                this.el.$loader.append(g.el)
            }
        },
        _initElements: function() {
            var c = a(".gallery");
            this.el = function(b) {
                var c = a(b),
                d = c.find("textarea[name='gallery-data']"),
                e = c.find(".thumb"),
                f = c.find(".main"),
                g = f.find(".sidebar"),
                h = c.find(".top"),
                i = c.find(".endpage");
                return {
                    $root: c,
                    $data: d,
                    $thumb: e,
                    $thumbIndex: e.find(".thumb-index"),
                    $thumbImgWrap: e.find(".thumb-img-wrap"),
                    $thumbImg: e.find(".thumb-img-wrap img"),
                    $thumbFold: e.find(".fold"),
                    $main: f,
                    $photoArea: f.find(".photoarea"),
                    $photoA: f.find(".photo-a"),
                    $photoB: f.find(".photo-b"),
                    $loader: f.find(".loader"),
                    $modeswitch: f.find(".modeswitch"),
                    $headlineWrap: h.find(".headline"),
                    $headline: h.find(".headline h1"),
                    $posttime: h.find(".headline span"),
                    $sidebar: g,
                    $tag: g.find(".tag"),
                    $prevue: g.find(".prevue"),
                    $prevueText: g.find(".prevue span"),
                    $prevueFold: g.find(".prevue .fold"),
                    $picinfo: g.find(".picinfo"),
                    $picinfoText: g.find(".picinfo p"),
                    $progressNum: g.find(".progress .numerator"),
                    $progressDen: g.find(".progress .denominator"),
                    $commentBtn: c.find(".comment"),
                    $commentCount: c.find(".comment b"),
                    $shareCount: c.find(".share a.t163 b"),
                    $top: h,
                    $topActions: h.find(".actions"),
                    $endpage: i
                }
            } (c)
        },
        _initData: function() {
            try {
                this.data = a.parseJSON(this.el.$data.text())
            } catch(b) {
                throw Error("Photoset Data Error!")
            }
        },
        _initSetInfo: function() {
            var c = this.data.info,
            d = c.setname;
            this.el.$headline.html(d.replace(/(\u00b7)/g, "<em style='font-family: sans-serif;'>$1</em>")),
            this.el.$headline.attr("title", d + " \n" + c.lmodify),
            1200 >= a(b).width() && (this.el.$headline.css("font-size", "15px"), this.el.$posttime.text(function(a, b) {
                return b.substr(0, 10)
            }), this.el.$top.find(".actions .share>p").hide()),
            this.el.$picinfo.tinyscrollbar();
            var e = this,
            f = this.el.$prevue,
            g = this.el.$prevueText,
            h = this.el.$prevueFold;
            "" == c.prevue ? f.hide() : (g.html(c.prevue), 38 > k(c.prevue) && h.hide(), f.delegate(".fold-close", "click", 
            function() {
                e._togglePrevue("fold")
            }), f.delegate(".fold-open, span", "click", 
            function() {
                e._togglePrevue("unfold")
            }))
        },
        _togglePrevue: function(a) {
            var b = this.el.$prevueText,
            c = this.el.$prevueFold,
            d = this.data.info;
            if ("fold" == a) b.html(l(d.prevue, 38) + "..."),
            c.removeClass("fold-close").addClass("fold-open");
            else {
                if ("unfold" != a) return ! 1;
                b.html(d.prevue),
                c.removeClass("fold-open").addClass("fold-close")
            }
            this._picinfoScrollUpdate()
        },
        _initThumbPaging: function() {
            var c = this.el.$thumb,
            e = this.el.$thumbIndex,
            f = this.el.$thumbImgWrap,
            g = this.el.$thumbImg,
            h = this.el.$thumbFold,
            j = parseInt(this.data.info.imgsum, 10);
            j = "0001" == this.data.info.channelid || "0003" == this.data.info.channelid ? j + 1: j,
            e.data("nodeslen", 7),
            this._updateThumbPaging(this._getInitPhotoIndex() + 1);
            var k = this,
            l = function() {
                f.stop().hide(),
                k._toggleDuilianAd("show")
            };
            e.delegate("li:has(span)", "mouseenter click", 
            function(b) {
                var c = parseInt(a(this).text(), 10) - 1;
                if (c == j - 1 && ("0001" == k.data.info.channelid || "0003" == k.data.info.channelid)) return l(),
                "click" == b.type && k.openEndpage(),
                !1;
                g.attr("src", k._getPhotoInfo(c).simg);
                var d = a(this).offset().left + a(this).width() / 2 - f.width() / 2;
                d = 0 > d ? 0: Math.round(d),
                f[0 == c ? "addClass": "removeClass"]("thumb-img-wrap-first"),
                3 > c && k._toggleDuilianAd("hide"),
                f.css("left", d).fadeIn("fast"),
                "click" == b.type && k.show(c)
            }),
            e.delegate("li:contains('...')", "mouseenter", l),
            e.live("mouseleave", l),
            c.live("mouseleave", l);
            var m = function() {
                h.removeClass("fold-open").addClass("fold-close"),
                k._largePaging()
            },
            n = function() {
                h.removeClass("fold-close").addClass("fold-open"),
                k._smallPaging()
            };
            e.delegate("li:contains('...')", "click", m),
            c.delegate(".fold-open", "click", m),
            c.delegate(".fold-close", "click", n),
            a(b).on("resize", i(function() {
                return 7 == e.data("nodeslen") ? !1: (k._largePaging(), d)
            },
            500)),
            7 >= j && h.hide()
        },
        _largePaging: function() {
            var a = 29,
            b = Math.floor((this.el.$top.width() - this.el.$topActions.width() - 35) / a);
            this.el.$thumbIndex.data("nodeslen", b),
            this._updateThumbPaging();
            var c = parseInt(this.data.info.imgsum, 10),
            c = "0001" == this.data.info.channelid || "0003" == this.data.info.channelid ? c + 1: c,
            b = b >= c ? c: b;
            6 == m.IEversion ? (this.el.$headlineWrap.hide(), this.el.$thumbIndex.css("width", b * a)) : (this.el.$headlineWrap.fadeOut(), this.el.$thumbIndex.animate({
                width: b * a
            },
            300))
        },
        _smallPaging: function() {
            var a = 29,
            b = 7,
            c = b * a;
            this.el.$thumbIndex.data("nodeslen", b);
            var d = this;
            6 == m.IEversion ? (this.el.$headlineWrap.show(), this.el.$thumbIndex.css("width", c), this._updateThumbPaging()) : (this.el.$headlineWrap.fadeIn(), this.el.$thumbIndex.animate({
                width: c
            },
            300, 
            function() {
                d._updateThumbPaging()
            }))
        },
        _updateThumbPaging: function(a, b) {
            var a = a || this.getCurrentPhotoInfo().index + 1,
            b = b || this.el.$thumbIndex.data("nodeslen"),
            c = parseInt(this.data.info.imgsum, 10);
            c = "0001" == this.data.info.channelid || "0003" == this.data.info.channelid ? c + 1: c;
            var d = g(parseInt(a, 10), c, b);
            this.el.$thumbIndex.html(d)
        },
        _initProgress: function() {
            this._updateProgress(this._getInitPhotoIndex() + 1)
        },
        _updateProgress: function(a) {
            this.el.$progressNum.text(a),
            this.el.$progressDen.text("0001" == this.data.info.channelid || "0003" == this.data.info.channelid ? parseInt(this.data.info.imgsum, 10) + 1: this.data.info.imgsum)
        },
        _initSwitchAround: function() {
            var b = this,
            e = this.el.$photoArea,
            f = function(a) {
                var b = Math.round(a.pageX - e.offset().left),
                c = e.width(),
                d = "default";
                return d = c / 2 > b ? "left": b >= c - 25 ? "default": "right"
            };
            e.on("mousemove", h(function(b) {
                var c = f(b),
                e = a(this).data("cursor"); (e === d || e != c) && a(this).data("cursor", c).removeClass("cursor-" + e).addClass("cursor-" + c)
            },
            100)),
            e.on("click", 
            function(a) {
                var c = f(a);
                "left" == c && b.prev(),
                "right" == c && b.next()
            });
            var g = /^(?:button|input|object|select|textarea)$/i;
            a(c).on("keydown", 
            function(a) {
                if (!g.test(a.target.nodeName)) switch (a.keyCode) {
                case 37:
                    b.prev();
                    break;
                case 39:
                    b.next()
                }
            })
        },
        _initSwitchMode: function() {
            var b = this,
            c = this.el.$main,
            d = this.el.$photoArea,
            e = this.el.$sidebar,
            g = (this.el.$top, this.el.$modeswitch),
            h = g.find(".open"),
            i = g.find(".close");
            g.on("mousemove click", 
            function(a) {
                a.stopPropagation()
            }),
            h.click(function(a) {
                c.data("viewmode", "wide"),
                e.fadeOut("fast", 
                function() {
                    c.animate({
                        "padding-right": 30
                    },
                    "fast", 
                    function() {
                        b.resetViewSize(),
                        h.hide(),
                        i.show(),
                        b._scrollToTop()
                    })
                }),
                d.find(".click-receiver").hide(),
                a.isTrigger || b._addPhotoInfoOverPic(),
                -1 != location.hash.indexOf("from=tj_wide") || a.isTrigger || (location.hash += "&from=tj_wide"),
                b._toggleDuilianAd("hide")
            }),
            i.click(function() {
                c.data("viewmode", "normal"),
                a("body").css("overflow", "hidden"),
                c.animate({
                    "padding-right": 360
                },
                0, 
                function() {
                    e.fadeIn("fast"),
                    b.resetViewSize(function() {
                        a("body").css("overflow", "visible")
                    }),
                    h.show(),
                    i.hide(),
                    b._scrollToTop()
                }),
                d.find(".picinfo").hide(),
                d.find(".click-receiver").show(),
                -1 != location.hash.indexOf("from=tj_wide") && (location.hash = location.hash.replace("&from=tj_wide", "")),
                b._toggleDuilianAd("show")
            })
        },
        _addPhotoInfoOverPic: function(a, b) {
            var c = a || this._getPhotoTurn().front,
            b = b || this.getCurrentPhotoInfo(),
            d = parseInt(this.data.info.imgsum, 10),
            e = "wide" == this.el.$main.data("viewmode"),
            f = "";
            if (d = "0001" == this.data.info.channelid || "0003" == this.data.info.channelid ? d + 1: d, !e) return ! 1;
            var g = b.index / 100 >= 1 ? 40: 15,
            h = b.newsurl && "#" != b.newsurl ? b.newsurl: "";
            f += '<div class="picinfo"><div class="progress" style="margin-left:' + g + 'px;">' + '<div class="numerator">' + (b.index + 1) + '</div><div class="denominator">' + d + "</div>" + "</div>" + '<div class="picinfo-text-wrap cf">' + '<div class="picinfo-text">' + "<p>" + (b.title && '<span style="font-size:14px;line-height:20px;">' + b.title + "</span><br>") + "<span>" + b.note + "</span>" + (h && '<a href="' + h + '">[\u8be6\u7ec6]</a>') + "</p>" + "</div>" + "</div>" + "</div>",
            c.find(".picinfo").remove(),
            c.append(f),
            setTimeout(function() {
                var a = c.find(".picinfo"),
                b = c.find(".picinfo-text"),
                d = c.find(".picinfo-text p"),
                e = 500,
                f = 2 * parseInt(d.css("line-height"), 10),
                g = function() {
                    return d.height()
                },
                h = function() {
                    b.stop().animate({
                        height: g()
                    },
                    e, "easeOutCubic")
                },
                i = function() {
                    b.stop().animate({
                        height: f
                    },
                    e, "easeOutCubic")
                };
                g() > f + 5 && (a.append('<div class="more-icon"></div>'), a.hover(h, i)),
                a.click(function(a) {
                    a.stopPropagation()
                })
            },
            100)
        },
        _getPhotoUrl: function(a) {
            var e,
            c = "number" == typeof a ? a: 0,
            d = this.data.list[c],
            f = parseInt(d.oimg.match(/\d{4}-\d{2}-\d{2}/).pop().replace(/-/g, ""), 10);
            return e = 0 == c || b.screen.width > 1366 || "0007" == this.data.info.channelid ? d.oimg: f > 20121224 ? d.oimg.replace(/(\d{4}-\d{2}-\d{2})\/(\w{12}\d{4})/, "$1/900x600_$2") : d.img
        },
        _getPhotoIndexById: function(a) {
            if ("string" != typeof a) throw new TypeError("Photo ID requires a string.");
            for (var b = this.data.list, c = b.length - 1; c >= 0; c--) if (a == b[c].id) return c;
            return ! 1
        },
        _getInitPhotoIndex: function() {
            var a = this._getPhotoIdFromHash(),
            b = 0;
            return this.cache.initPhotoIndex ? b = this.cache.initPhotoIndex: a && (b = this._getPhotoIndexById(a) || 0, this.cache.initPhotoIndex = b),
            b
        },
        _getPhotoInfo: function(b) {
            var c;
            return a.isNumeric(b) ? c = parseInt(b, 10) : "string" == typeof b && (c = this._getPhotoIndexById(b)),
            this.data.list[c] || null
        },
        _getPhotoIdFromHash: function() {
            var a = location.hash.match(/(p=)(\w{12}\d{4})/);
            return a ? a.pop() : null
        },
        _setPhotoIdToHash: function(a) {
            var b = /(p=)\w{12}\d{4}/,
            c = location.hash; - 1 == c.search(b) ? location.hash += ("" == c ? "": "&") + "p=" + a: location.hash = c.replace(b, "$1" + a)
        },
        _getPhotoTurn: function() {
            var a = this.el.$photoA,
            b = this.el.$photoB,
            c = parseInt(a.css("zIndex"), 10),
            d = parseInt(b.css("zIndex"), 10),
            e = [a, b];
            return e = c >= d ? e: e.reverse(),
            {
                front: e[0],
                behind: e[1]
            }
        },
        _picinfoScrollUpdate: function(a) {
            var b = this.el.$sidebar,
            c = a && a.height || b.height(),
            d = b.find(".ad300x250").height() || 0,
            e = c - this.el.$picinfo.position().top - d - 30 - 20;
            this.el.$picinfo.find(".viewport").height(e),
            this.el.$picinfo.tinyscrollbar_update()
        },
        _scrollToTop: function() {
            if ("0001" == this.data.info.channelid) return ! 1;
            var b = a("html").scrollTop() || a("body").scrollTop(),
            c = this.el.$root.offset().top;
            b != c && a("html, body").animate({
                scrollTop: c
            },
            "normal")
        },
        _sendStatistics: function() {
            location.hash = location.hash.replace(/(#|&)[a-z]{2}wz[ab]{1}_\d{4}(&|$)/g, ""),
            "function" == typeof b.neteaseTracker && setTimeout(function() {
                b.neteaseTracker(!0)
            },
            0),
            "function" == typeof b.vjEventTrack && setTimeout(b.vjEventTrack, 0)
        },
        getCurrentPhotoInfo: function() {
            return this.cache.currPhoto || null
        },
        getRightBlankWidth: function() {
            var a = this.el.$main,
            c = a.width() + parseInt(a.css("padding-left"), 10) + parseInt(a.css("padding-right"), 10);
            return Math.floor((jQuery(b).width() - c) / 2)
        },
        _maxPicSize: function() {
            if ("object" == typeof this.cache.maxPicSize) return this.cache.maxPicSize;
            var b = 0,
            c = 0,
            d = {};
            return a.each(this.data.list, 
            function(a, d) {
                var e = d.osize && d.osize.w ? d.osize.w: 900,
                f = d.osize && d.osize.h ? d.osize.h: 600;
                e > b && (b = e),
                f > c && (c = f)
            }),
            d = {
                width: b,
                height: c
            },
            this.cache.maxPicSize = d,
            d
        },
        _toggleDuilianAd: function(b) {
            var c = a("div[id^=couplet]"),
            d = "wide" == this.el.$main.data("viewmode"),
            e = this.cache.endpageOpened;
            if ("hide" == b) c.css({
                top: -999,
                opacity: 0
            });
            else {
                if (d || e) return ! 1;
                c.css({
                    top: 86,
                    opacity: 1
                })
            }
        },
        prev: function() {
            var a = this.getCurrentPhotoInfo().index - 1; - 1 == a ? this.show(this.data.list.length - 1) : this.show(a)
        },
        next: function() {
            var a = this.getCurrentPhotoInfo().index + 1;
            a == this.data.list.length ? this.openEndpage() : this.show(a)
        }
    },
    f.prototype.cache = {},
    f.prototype.show = function(b) {
        var c = this._getPhotoInfo(b);
        if (!c) return ! 1;
        this.getCurrentPhotoInfo(),
        c.index = this._getPhotoIndexById(c.id);
        var e = c.index == this._getInitPhotoIndex();
        e || this._togglePrevue("fold"),
        this.el.$loader.show();
        var f = this,
        g = this._getPhotoUrl(c.index);
        n(g, null, 
        function() {
            var b = this,
            d = b.width,
            g = b.height,
            h = f._getPhotoTurn();
            h.behind.data("size", {
                width: d,
                height: g
            }),
            f._resetPhotoWrapSize(h.behind),
            h.behind.empty().append(b),
            f._addPhotoInfoOverPic(h.behind, c);
            var i = c.newsurl && "#" != c.newsurl ? c.newsurl: "",
            j = (c.title && '<div class="ptitle">' + c.title + "</div>") + c.note + (i && '<a href="' + i + '">[\u8be6\u7ec6]</a>');
            f.el.$picinfoText.html(j),
            f._picinfoScrollUpdate(),
            f.el.$loader.hide();
            var k = m.isMobileDevice ? 0: 500;
            h.front.fadeOut(k, 
            function() {
                a(this).css("zIndex", 8)
            }),
            h.behind.hide().fadeIn(k, 
            function() {
                a(this).css("zIndex", 9)
            }),
            f._updateThumbPaging(c.index + 1),
            f._updateProgress(c.index + 1),
            f._setPhotoIdToHash(c.id),
            e || f._sendStatistics(),
            f.el.$top.find(".vieworigin").attr("href", c.oimg),
            f.smartPreload(c.index),
            f.cache.currPhoto = c
        })
    },
    f.prototype.smartPreload = function(b, c, e) {
        this.cache.preload === d && (this.cache.preload = []);
        for (var c = c || 0, e = e || 2, f = [], g = this.data.list, h = g.length, i = b - c; b + e >= i; i += 1) 0 > i || i > h - 1 || -1 != a.inArray(this._getPhotoUrl(i), this.cache.preload) || f.push(this._getPhotoUrl(i));
        for (var i = 0; f.length > i; i += 1) n(f[i]),
        this.cache.preload.push(f[i])
    },
    f.prototype.resetViewSize = function(c) {
        var d = this.el.$main,
        e = 2,
        f = {
            width: a(b).width(),
            height: a(b).height() + this.el.$root.offset().top - d.offset().top - 10
        },
        g = parseInt(d.css("padding-right"), 10) + parseInt(d.css("padding-left"), 10),
        h = 1624,
        i = 990,
        j = Math.floor(h / e),
        k = Math.floor(i / e),
        l = this._maxPicSize(),
        m = l.width + g + 20 < f.width ? l.width + g + 20: f.width,
        n = l.height + 20 < f.height ? l.height + 20: f.height;
        m = "wide" == this.el.$main.data("viewmode") ? f.width: m,
        m = i >= m ? i: m > h ? h: m,
        n = k >= n ? k: n > j ? j: n;
        var o = {
            width: m - g - 2,
            height: n
        };
        d.animate(o, 253, 
        function() {
            c && "function" == typeof c && c()
        }),
        this.el.$sidebar.css("height", o.height),
        this._resetPhotoWrapSize(null, o),
        this._picinfoScrollUpdate(o)
    },
    f.prototype._resetPhotoWrapSize = function(b, c) {
        var d = b ? a(b) : this._getPhotoTurn().front,
        e = d.data("size");
        if (!e) return ! 1;
        var k,
        l,
        f = e.width,
        g = e.height,
        h = (c ? c.width: this.el.$photoArea.width()) - 10,
        i = (c ? c.height: this.el.$photoArea.height()) - 10,
        j = {
            img: f / g,
            wrap: h / i
        };
        h >= f && i >= g ? (k = f, l = g) : j.img >= j.wrap ? (k = h, l = Math.round(k / j.img)) : j.img < j.wrap && (l = i, k = Math.round(l * j.img));
        var m = {
            width: k,
            height: l,
            top: "50%",
            marginTop: 0 - Math.round(l / 2),
            left: "50%",
            marginLeft: 0 - Math.round(k / 2)
        };
        b ? d.css(m) : d.animate(m, 250)
    },
    f.prototype._initEndpage = function() {
        var d = this.el.$endpage;
        if (d.data("initialized")) return ! 1;
        var e = this;
        if (6 == m.IEversion || 535 > m.webkitVersion) {
            var f = function() {
                d.height(e.el.$root.height())
            };
            f(),
            a(b).on("resize", 
            function() {
                var a = 453;
                setTimeout(f, a)
            })
        }
        d.find(".replay").click(function(a) {
            a.preventDefault(),
            e.closeEndpage(),
            e._getPhotoTurn().front.empty(),
            -1 == location.hash.indexOf("from=tj_review") && (location.hash += "&from=tj_review"),
            e.show(0)
        });
        var g = c.getElementById("htpGG");
        g && !m.isMobileDevice && (d.find(".endpage-btm").addClass("endpage-btm-ad"), d.find(".endpage-btm-right").empty().append(g).insertBefore(".endpage-btm-left"), g.style.display = "block");
        for (var k, h = d.find(".endpage-related-tab"), i = d.find(".endpage-related"), j = [], l = i.parent().width(), n = Math.ceil(i.width() / l), o = 0, p = null, q = 5e3, r = function(b) {
            i.css("margin-left", 0 - l * b),
            o = b,
            a.each(j, 
            function(a, c) {
                c.data("tabIndex") == b ? c.removeClass("bg-gray").addClass("bg-red") : c.removeClass("bg-red").addClass("bg-gray")
            })
        },
        s = 0; n > s; s += 1) k = 0 == s ? a('<div class="tab-dot bg-red"></div>') : a('<div class="tab-dot bg-gray"></div>'),
        k.data("tabIndex", s),
        k.on("mouseenter click", 
        function() {
            var b = a(this).data("tabIndex");
            r(b)
        }),
        h.append(k),
        j.push(k);
        h.css("padding-left", (h.parent().width() - 16 * n) / 2);
        var t = function(a) {
            clearInterval(p),
            p = setInterval(function() {
                var a = o == n - 1 ? 0: o + 1;
                r(a)
            },
            a)
        };
        t(q),
        i.parent().hover(function() {
            clearInterval(p)
        },
        function() {
            t(q)
        }),
        d.data("initialized", !0)
    },
    f.prototype.openEndpage = function() {
        this._initEndpage();
        var c = this.el.$endpage;
        c.fadeIn("fast"),
        this.el.$main.css("visibility", "hidden"),
        8 > m.IEversion && (a(b).width() > 1050 ? c.find(".tiptext").show().css({
            display: "inline-block",
            zoom: 1,
            display: "inline"
        }) : c.find(".tiptext").hide()),
        this.cache.endpageOpened = !0,
        this._toggleDuilianAd("hide")
    },
    f.prototype.closeEndpage = function() {
        this.el.$endpage.hide(),
        this.el.$main.css("visibility", "visible"),
        this.cache.endpageOpened = !1,
        this._toggleDuilianAd("show")
    };
    var m = function() {
        function a() {
            var b,
            e,
            a = c.createElement("div"),
            f = ["ms", "O", "Webkit", "Moz"];
            for (b in f) if (a.style[f[b] + "Transition"] !== d) {
                e = f[b];
                break
            }
            try {
                delete a
            } catch(g) {
                a = null
            }
            return e ? e.toLowerCase() : !1
        }
        function e() {
            for (var a, b = 3, d = c.createElement("div"), e = d.getElementsByTagName("i"); d.innerHTML = "<!--[if gt IE " + ++b + "]><i></i><![endif]-->", e[0];);
            return b > 4 ? b: a
        }
        function f() {
            return ! - [1] && !b.XMLHttpRequest
        }
        function g() {
            var a = /AppleWebKit\/([\d.]+)/.exec(navigator.userAgent);
            return a ? parseFloat(a[1]) : 0
        }
        function h() {
            return /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)
        }
        return {
            cssTransitions: a(),
            IEversion: e(),
            isIE6: f(),
            webkitVersion: g(),
            isMobileDevice: h()
        }
    } (),
    n = function() {
        var a = [],
        b = null,
        c = function() {
            for (var b = 0; a.length > b; b++) a[b].end ? a.splice(b--, 1) : a[b](); ! a.length && e()
        },
        e = function() {
            clearInterval(b),
            b = null
        };
        return function(e, f, g, h) {
            var i,
            j,
            k,
            l,
            m,
            n = new Image;
            return n.src = e,
            n.complete ? (f && f.call(n), g && g.call(n), d) : (j = n.width, k = n.height, n.onerror = function() {
                h && h.call(n),
                i.end = !0,
                n = n.onload = n.onerror = null
            },
            i = function() {
                l = n.width,
                m = n.height,
                (l !== j || m !== k || l * m > 1024) && (f && f.call(n), i.end = !0)
            },
            i(), n.onload = function() { ! i.end && i(),
                g && g.call(n),
                n = n.onload = n.onerror = null
            },
            i.end || (a.push(i), null === b && (b = setInterval(c, 40))), d)
        }
    } ();
    jQuery.extend(jQuery.easing, {
        easeOutCubic: function(a, b, c, d, e) {
            return d * ((b = b / e - 1) * b * b + 1) + c
        }
    });
    try {
        b.NTESgallery = new f
    } catch(o) {
        throw Error(o)
    }
})(jQuery, window, document);
