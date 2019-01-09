function Language(lang) {
    var __construct = function() {
        "undefined" == eval("typeof " + lang) && (lang = "en")
    }();
    this.getStr = function(str, defaultStr) {
        var retStr = eval("eval(lang)." + str);
        return "undefined" != typeof retStr ? retStr : "undefined" != typeof defaultStr ? defaultStr : eval("en." + str)
    }
}

function includeJS(t) {
    document.write('<script type="text/javascript" src="' + base_url + "js/" + t + '"></script>')
}
function setLocalStorage(t, e) {
    function i(t, e, i) {
        if (i) {
            var n = new Date;
            n.setTime(n.getTime() + 24 * i * 60 * 60 * 1e3);
            var o = "; expires=" + n.toGMTString()
        } else var o = "";
        document.cookie = t + "=" + e + o + "; path=/"
    }
    i(t, e)
}

function getLocalStorage(t) {
    function e(t) {
        for (var e = t + "=", i = document.cookie.split(";"), n = 0; n < i.length; n++) {
            for (var o = i[n];
                " " == o.charAt(0);) o = o.substring(1, o.length);
            if (0 == o.indexOf(e)) return o.substring(e.length, o.length)
        }
        return null
    }
    return e(t)
}

function selectedItems(t, e) {
    var i = $(t).length,
        n = 0;
    $(t).each(function() {
        n += $(this).width()
    }), $(t).each(function() {
        $(this).removeClass().addClass("search-choice"), 2 == i && n < e ? ($(this).removeClass().addClass("search-choice"), $(this).addClass("multi-1")) : $(this).addClass("multi-" + i)
    })
}

function workerUpdaloadCv() {
    var t = (new Language(lang), $('meta[name="csrf-token"]').attr("content")),
        e = $(".resume-upload-cv"),
        i = base_url + "/apply",
        n = document.getElementById("resumeFile"),
        o = n.files[0],
        s = $(n).data("jobid"),
        r = $("#sid").val(),
        a = $("#token").val(),
        l = new FormData;
    l.append("uploadFile", o), l.append("id", s), l.append("sid", r), l.append("token", a), $.ajax({
        url: i,
        data: l,
        enctype: "multipart/form-data",
        type: "POST",
        processData: !1,
        contentType: !1,
        headers: {
            "X-CSRF-TOKEN": t
        },
        xhr: function() {
            $("#applySendProcessBtn").hide(), $("#applySendingProcessBtn").show();
            var t = new window.XMLHttpRequest;
            return t.upload.addEventListener("progress", function(t) {
                if (t.lengthComputable) {
                    var i = e.find(".progress-bar-status");
                    i.show();
                    var n = parseInt(t.loaded / t.total * 100);
                    i.html('<div class="progress progress-striped " style="margin-bottom:0;"><div class="progress-bar" style="width: ' + n + '%"></div></div>')
                }
            }, !1), t
        },
        success: function(t) {
            var e = $.parseJSON(t),
                i = $(".resume-upload-cv").find(".progress-bar-status");
            200 == e.status ? (i.html('<span id="errorAppSystem" class="success-message">' + e.message + "</span>").show(), setTimeout(function() {
                window.location.reload(1)
            }, 2e3)) : ($("#applySendProcessBtn").show(), $("#applySendingProcessBtn").hide(), i.html('<span id="errorAppSystem" class="error-message">' + e.message + "</span>").show())
        }
    })
}

function ApplyJobButton() {
    var t = document.getElementById("resumeFile");
    0 == t.files.length && $(".progress-bar-status").html('<span id="errorAppSystem" class="error-message">Vui lòng chọn hồ sơ đính kèm. </span>').show()
}

function initApplyForm() {
    var t = new Language(lang),
        e = $(".apply-form-modal").attr("aria-hidden");
    e && ($(".group-file-upload").find('input[type="text"]').attr("placeholder", t.getStr("placeholder_upload")), document.getElementById("resumeFile").value = "", $(".progress-bar-status").html("").hide(), $("#applySendProcessBtn").attr("onClick", "return ApplyJobButton()")), $(".modal-apply").modal("show")
}

function isValidEmailAddress(t) {
    var e = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return e.test(t)
}

function checkValidFormJobReferral() {
    var t = document.jobReferralFrm,
        e = !1;
    return $("#jobReferralFrm").find("div.error-message").attr("hidden", "hidden"), $("#jobReferralFrm").find(".has-error").removeClass("has-error"), 0 == t.emailJR.value.length ? ($("#errEmailJR").removeAttr("hidden").parent().addClass("has-error"), e = !0) : isValidEmailAddress(t.emailJR.value) || ($("#errValidEmailJR").removeAttr("hidden").parent().addClass("has-error"), e = !0), !e
}

function submitJobReferralFrm() {
    var t = $('meta[name="csrf-token"]').attr("content"),
        e = base_url + "/jobseekers/jobReferral",
        i = document.jobReferralFrm;
    return $.ajax({
        url: e,
        type: "POST",
        headers: {
            "X-CSRF-TOKEN": t
        },
        data: {
            email: i.emailJR.value,
            jobid: i.jobId.value
        }
    }), !1
}

function initMap() {
    var t = {
            lat: 10.793579,
            lng: 106.673727
        },
        e = new google.maps.Map(document.getElementById("maps"), {
            zoom: 16,
            center: t
        });
    new google.maps.Marker({
        position: t,
        map: e
    })
}
if (function(t, e) {
        function i(t) {
            var e = t.length,
                i = ut.type(t);
            return !ut.isWindow(t) && (!(1 !== t.nodeType || !e) || ("array" === i || "function" !== i && (0 === e || "number" == typeof e && e > 0 && e - 1 in t)))
        }

        function n(t) {
            var e = kt[t] = {};
            return ut.each(t.match(dt) || [], function(t, i) {
                e[i] = !0
            }), e
        }

        function o(t, i, n, o) {
            if (ut.acceptData(t)) {
                var s, r, a = ut.expando,
                    l = t.nodeType,
                    c = l ? ut.cache : t,
                    u = l ? t[a] : t[a] && a;
                if (u && c[u] && (o || c[u].data) || n !== e || "string" != typeof i) return u || (u = l ? t[a] = et.pop() || ut.guid++ : a), c[u] || (c[u] = l ? {} : {
                    toJSON: ut.noop
                }), ("object" == typeof i || "function" == typeof i) && (o ? c[u] = ut.extend(c[u], i) : c[u].data = ut.extend(c[u].data, i)), r = c[u], o || (r.data || (r.data = {}), r = r.data), n !== e && (r[ut.camelCase(i)] = n), "string" == typeof i ? (s = r[i], null == s && (s = r[ut.camelCase(i)])) : s = r, s
            }
        }

        function s(t, e, i) {
            if (ut.acceptData(t)) {
                var n, o, s = t.nodeType,
                    r = s ? ut.cache : t,
                    l = s ? t[ut.expando] : ut.expando;
                if (r[l]) {
                    if (e && (n = i ? r[l] : r[l].data)) {
                        ut.isArray(e) ? e = e.concat(ut.map(e, ut.camelCase)) : e in n ? e = [e] : (e = ut.camelCase(e), e = e in n ? [e] : e.split(" ")), o = e.length;
                        for (; o--;) delete n[e[o]];
                        if (i ? !a(n) : !ut.isEmptyObject(n)) return
                    }(i || (delete r[l].data, a(r[l]))) && (s ? ut.cleanData([t], !0) : ut.support.deleteExpando || r != r.window ? delete r[l] : r[l] = null)
                }
            }
        }

        function r(t, i, n) {
            if (n === e && 1 === t.nodeType) {
                var o = "data-" + i.replace(Dt, "-$1").toLowerCase();
                if (n = t.getAttribute(o), "string" == typeof n) {
                    try {
                        n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Tt.test(n) ? ut.parseJSON(n) : n)
                    } catch (s) {}
                    ut.data(t, i, n)
                } else n = e
            }
            return n
        }

        function a(t) {
            var e;
            for (e in t)
                if (("data" !== e || !ut.isEmptyObject(t[e])) && "toJSON" !== e) return !1;
            return !0
        }

        function l() {
            return !0
        }

        function c() {
            return !1
        }

        function u() {
            try {
                return X.activeElement
            } catch (t) {}
        }

        function h(t, e) {
            do t = t[e]; while (t && 1 !== t.nodeType);
            return t
        }

        function d(t, e, i) {
            if (ut.isFunction(e)) return ut.grep(t, function(t, n) {
                return !!e.call(t, n, t) !== i
            });
            if (e.nodeType) return ut.grep(t, function(t) {
                return t === e !== i
            });
            if ("string" == typeof e) {
                if (Wt.test(e)) return ut.filter(e, t, i);
                e = ut.filter(e, t)
            }
            return ut.grep(t, function(t) {
                return ut.inArray(t, e) >= 0 !== i
            })
        }

        function p(t) {
            var e = Kt.split("|"),
                i = t.createDocumentFragment();
            if (i.createElement)
                for (; e.length;) i.createElement(e.pop());
            return i
        }

        function f(t, e) {
            return ut.nodeName(t, "table") && ut.nodeName(1 === e.nodeType ? e : e.firstChild, "tr") ? t.getElementsByTagName("tbody")[0] || t.appendChild(t.ownerDocument.createElement("tbody")) : t
        }

        function m(t) {
            return t.type = (null !== ut.find.attr(t, "type")) + "/" + t.type, t
        }

        function g(t) {
            var e = oe.exec(t.type);
            return e ? t.type = e[1] : t.removeAttribute("type"), t
        }

        function v(t, e) {
            for (var i, n = 0; null != (i = t[n]); n++) ut._data(i, "globalEval", !e || ut._data(e[n], "globalEval"))
        }

        function y(t, e) {
            if (1 === e.nodeType && ut.hasData(t)) {
                var i, n, o, s = ut._data(t),
                    r = ut._data(e, s),
                    a = s.events;
                if (a) {
                    delete r.handle, r.events = {};
                    for (i in a)
                        for (n = 0, o = a[i].length; o > n; n++) ut.event.add(e, i, a[i][n])
                }
                r.data && (r.data = ut.extend({}, r.data))
            }
        }

        function b(t, e) {
            var i, n, o;
            if (1 === e.nodeType) {
                if (i = e.nodeName.toLowerCase(), !ut.support.noCloneEvent && e[ut.expando]) {
                    o = ut._data(e);
                    for (n in o.events) ut.removeEvent(e, n, o.handle);
                    e.removeAttribute(ut.expando)
                }
                "script" === i && e.text !== t.text ? (m(e).text = t.text, g(e)) : "object" === i ? (e.parentNode && (e.outerHTML = t.outerHTML), ut.support.html5Clone && t.innerHTML && !ut.trim(e.innerHTML) && (e.innerHTML = t.innerHTML)) : "input" === i && ee.test(t.type) ? (e.defaultChecked = e.checked = t.checked, e.value !== t.value && (e.value = t.value)) : "option" === i ? e.defaultSelected = e.selected = t.defaultSelected : ("input" === i || "textarea" === i) && (e.defaultValue = t.defaultValue)
            }
        }

        function w(t, i) {
            var n, o, s = 0,
                r = typeof t.getElementsByTagName !== V ? t.getElementsByTagName(i || "*") : typeof t.querySelectorAll !== V ? t.querySelectorAll(i || "*") : e;
            if (!r)
                for (r = [], n = t.childNodes || t; null != (o = n[s]); s++) !i || ut.nodeName(o, i) ? r.push(o) : ut.merge(r, w(o, i));
            return i === e || i && ut.nodeName(t, i) ? ut.merge([t], r) : r
        }

        function _(t) {
            ee.test(t.type) && (t.defaultChecked = t.checked)
        }

        function x(t, e) {
            if (e in t) return e;
            for (var i = e.charAt(0).toUpperCase() + e.slice(1), n = e, o = Se.length; o--;)
                if (e = Se[o] + i, e in t) return e;
            return n
        }

        function C(t, e) {
            return t = e || t, "none" === ut.css(t, "display") || !ut.contains(t.ownerDocument, t)
        }

        function S(t, e) {
            for (var i, n, o, s = [], r = 0, a = t.length; a > r; r++) n = t[r], n.style && (s[r] = ut._data(n, "olddisplay"), i = n.style.display, e ? (s[r] || "none" !== i || (n.style.display = ""), "" === n.style.display && C(n) && (s[r] = ut._data(n, "olddisplay", E(n.nodeName)))) : s[r] || (o = C(n), (i && "none" !== i || !o) && ut._data(n, "olddisplay", o ? i : ut.css(n, "display"))));
            for (r = 0; a > r; r++) n = t[r], n.style && (e && "none" !== n.style.display && "" !== n.style.display || (n.style.display = e ? s[r] || "" : "none"));
            return t
        }

        function k(t, e, i) {
            var n = ve.exec(e);
            return n ? Math.max(0, n[1] - (i || 0)) + (n[2] || "px") : e
        }

        function T(t, e, i, n, o) {
            for (var s = i === (n ? "border" : "content") ? 4 : "width" === e ? 1 : 0, r = 0; 4 > s; s += 2) "margin" === i && (r += ut.css(t, i + Ce[s], !0, o)), n ? ("content" === i && (r -= ut.css(t, "padding" + Ce[s], !0, o)), "margin" !== i && (r -= ut.css(t, "border" + Ce[s] + "Width", !0, o))) : (r += ut.css(t, "padding" + Ce[s], !0, o), "padding" !== i && (r += ut.css(t, "border" + Ce[s] + "Width", !0, o)));
            return r
        }

        function D(t, e, i) {
            var n = !0,
                o = "width" === e ? t.offsetWidth : t.offsetHeight,
                s = ue(t),
                r = ut.support.boxSizing && "border-box" === ut.css(t, "boxSizing", !1, s);
            if (0 >= o || null == o) {
                if (o = he(t, e, s), (0 > o || null == o) && (o = t.style[e]), ye.test(o)) return o;
                n = r && (ut.support.boxSizingReliable || o === t.style[e]), o = parseFloat(o) || 0
            }
            return o + T(t, e, i || (r ? "border" : "content"), n, s) + "px"
        }

        function E(t) {
            var e = X,
                i = we[t];
            return i || (i = A(t, e), "none" !== i && i || (ce = (ce || ut("<iframe frameborder='0' width='0' height='0'/>").css("cssText", "display:block !important")).appendTo(e.documentElement), e = (ce[0].contentWindow || ce[0].contentDocument).document, e.write("<!doctype html><html><body>"), e.close(), i = A(t, e), ce.detach()), we[t] = i), i
        }

        function A(t, e) {
            var i = ut(e.createElement(t)).appendTo(e.body),
                n = ut.css(i[0], "display");
            return i.remove(), n
        }

        function I(t, e, i, n) {
            var o;
            if (ut.isArray(e)) ut.each(e, function(e, o) {
                i || Te.test(t) ? n(t, o) : I(t + "[" + ("object" == typeof o ? e : "") + "]", o, i, n)
            });
            else if (i || "object" !== ut.type(e)) n(t, e);
            else
                for (o in e) I(t + "[" + o + "]", e[o], i, n)
        }

        function M(t) {
            return function(e, i) {
                "string" != typeof e && (i = e, e = "*");
                var n, o = 0,
                    s = e.toLowerCase().match(dt) || [];
                if (ut.isFunction(i))
                    for (; n = s[o++];) "+" === n[0] ? (n = n.slice(1) || "*", (t[n] = t[n] || []).unshift(i)) : (t[n] = t[n] || []).push(i)
            }
        }

        function j(t, i, n, o) {
            function s(l) {
                var c;
                return r[l] = !0, ut.each(t[l] || [], function(t, l) {
                    var u = l(i, n, o);
                    return "string" != typeof u || a || r[u] ? a ? !(c = u) : e : (i.dataTypes.unshift(u), s(u), !1)
                }), c
            }
            var r = {},
                a = t === qe;
            return s(i.dataTypes[0]) || !r["*"] && s("*")
        }

        function $(t, i) {
            var n, o, s = ut.ajaxSettings.flatOptions || {};
            for (o in i) i[o] !== e && ((s[o] ? t : n || (n = {}))[o] = i[o]);
            return n && ut.extend(!0, t, n), t
        }

        function P(t, i, n) {
            for (var o, s, r, a, l = t.contents, c = t.dataTypes;
                "*" === c[0];) c.shift(), s === e && (s = t.mimeType || i.getResponseHeader("Content-Type"));
            if (s)
                for (a in l)
                    if (l[a] && l[a].test(s)) {
                        c.unshift(a);
                        break
                    }
            if (c[0] in n) r = c[0];
            else {
                for (a in n) {
                    if (!c[0] || t.converters[a + " " + c[0]]) {
                        r = a;
                        break
                    }
                    o || (o = a)
                }
                r = r || o
            }
            return r ? (r !== c[0] && c.unshift(r), n[r]) : e
        }

        function N(t, e, i, n) {
            var o, s, r, a, l, c = {},
                u = t.dataTypes.slice();
            if (u[1])
                for (r in t.converters) c[r.toLowerCase()] = t.converters[r];
            for (s = u.shift(); s;)
                if (t.responseFields[s] && (i[t.responseFields[s]] = e), !l && n && t.dataFilter && (e = t.dataFilter(e, t.dataType)), l = s, s = u.shift())
                    if ("*" === s) s = l;
                    else if ("*" !== l && l !== s) {
                if (r = c[l + " " + s] || c["* " + s], !r)
                    for (o in c)
                        if (a = o.split(" "), a[1] === s && (r = c[l + " " + a[0]] || c["* " + a[0]])) {
                            r === !0 ? r = c[o] : c[o] !== !0 && (s = a[0], u.unshift(a[1]));
                            break
                        }
                if (r !== !0)
                    if (r && t["throws"]) e = r(e);
                    else try {
                        e = r(e)
                    } catch (h) {
                        return {
                            state: "parsererror",
                            error: r ? h : "No conversion from " + l + " to " + s
                        }
                    }
            }
            return {
                state: "success",
                data: e
            }
        }

        function O() {
            try {
                return new t.XMLHttpRequest
            } catch (e) {}
        }

        function F() {
            try {
                return new t.ActiveXObject("Microsoft.XMLHTTP")
            } catch (e) {}
        }

        function L() {
            return setTimeout(function() {
                Ge = e
            }), Ge = ut.now()
        }

        function H(t, e, i) {
            for (var n, o = (oi[e] || []).concat(oi["*"]), s = 0, r = o.length; r > s; s++)
                if (n = o[s].call(i, e, t)) return n
        }

        function R(t, e, i) {
            var n, o, s = 0,
                r = ni.length,
                a = ut.Deferred().always(function() {
                    delete l.elem
                }),
                l = function() {
                    if (o) return !1;
                    for (var e = Ge || L(), i = Math.max(0, c.startTime + c.duration - e), n = i / c.duration || 0, s = 1 - n, r = 0, l = c.tweens.length; l > r; r++) c.tweens[r].run(s);
                    return a.notifyWith(t, [c, s, i]), 1 > s && l ? i : (a.resolveWith(t, [c]), !1)
                },
                c = a.promise({
                    elem: t,
                    props: ut.extend({}, e),
                    opts: ut.extend(!0, {
                        specialEasing: {}
                    }, i),
                    originalProperties: e,
                    originalOptions: i,
                    startTime: Ge || L(),
                    duration: i.duration,
                    tweens: [],
                    createTween: function(e, i) {
                        var n = ut.Tween(t, c.opts, e, i, c.opts.specialEasing[e] || c.opts.easing);
                        return c.tweens.push(n), n
                    },
                    stop: function(e) {
                        var i = 0,
                            n = e ? c.tweens.length : 0;
                        if (o) return this;
                        for (o = !0; n > i; i++) c.tweens[i].run(1);
                        return e ? a.resolveWith(t, [c, e]) : a.rejectWith(t, [c, e]), this
                    }
                }),
                u = c.props;
            for (B(u, c.opts.specialEasing); r > s; s++)
                if (n = ni[s].call(c, t, u, c.opts)) return n;
            return ut.map(u, H, c), ut.isFunction(c.opts.start) && c.opts.start.call(t, c), ut.fx.timer(ut.extend(l, {
                elem: t,
                anim: c,
                queue: c.opts.queue
            })), c.progress(c.opts.progress).done(c.opts.done, c.opts.complete).fail(c.opts.fail).always(c.opts.always)
        }

        function B(t, e) {
            var i, n, o, s, r;
            for (i in t)
                if (n = ut.camelCase(i), o = e[n], s = t[i], ut.isArray(s) && (o = s[1], s = t[i] = s[0]), i !== n && (t[n] = s, delete t[i]), r = ut.cssHooks[n], r && "expand" in r) {
                    s = r.expand(s), delete t[n];
                    for (i in s) i in t || (t[i] = s[i], e[i] = o)
                } else e[n] = o
        }

        function W(t, e, i) {
            var n, o, s, r, a, l, c = this,
                u = {},
                h = t.style,
                d = t.nodeType && C(t),
                p = ut._data(t, "fxshow");
            i.queue || (a = ut._queueHooks(t, "fx"), null == a.unqueued && (a.unqueued = 0, l = a.empty.fire, a.empty.fire = function() {
                a.unqueued || l()
            }), a.unqueued++, c.always(function() {
                c.always(function() {
                    a.unqueued--, ut.queue(t, "fx").length || a.empty.fire()
                })
            })), 1 === t.nodeType && ("height" in e || "width" in e) && (i.overflow = [h.overflow, h.overflowX, h.overflowY], "inline" === ut.css(t, "display") && "none" === ut.css(t, "float") && (ut.support.inlineBlockNeedsLayout && "inline" !== E(t.nodeName) ? h.zoom = 1 : h.display = "inline-block")), i.overflow && (h.overflow = "hidden", ut.support.shrinkWrapBlocks || c.always(function() {
                h.overflow = i.overflow[0], h.overflowX = i.overflow[1], h.overflowY = i.overflow[2]
            }));
            for (n in e)
                if (o = e[n], ti.exec(o)) {
                    if (delete e[n], s = s || "toggle" === o, o === (d ? "hide" : "show")) continue;
                    u[n] = p && p[n] || ut.style(t, n)
                }
            if (!ut.isEmptyObject(u)) {
                p ? "hidden" in p && (d = p.hidden) : p = ut._data(t, "fxshow", {}), s && (p.hidden = !d), d ? ut(t).show() : c.done(function() {
                    ut(t).hide()
                }), c.done(function() {
                    var e;
                    ut._removeData(t, "fxshow");
                    for (e in u) ut.style(t, e, u[e])
                });
                for (n in u) r = H(d ? p[n] : 0, n, c), n in p || (p[n] = r.start, d && (r.end = r.start, r.start = "width" === n || "height" === n ? 1 : 0))
            }
        }

        function q(t, e, i, n, o) {
            return new q.prototype.init(t, e, i, n, o)
        }

        function z(t, e) {
            var i, n = {
                    height: t
                },
                o = 0;
            for (e = e ? 1 : 0; 4 > o; o += 2 - e) i = Ce[o], n["margin" + i] = n["padding" + i] = t;
            return e && (n.opacity = n.width = t), n
        }

        function U(t) {
            return ut.isWindow(t) ? t : 9 === t.nodeType && (t.defaultView || t.parentWindow)
        }
        var K, Y, V = typeof e,
            Q = t.location,
            X = t.document,
            J = X.documentElement,
            G = t.jQuery,
            Z = t.$,
            tt = {},
            et = [],
            it = "1.10.2",
            nt = et.concat,
            ot = et.push,
            st = et.slice,
            rt = et.indexOf,
            at = tt.toString,
            lt = tt.hasOwnProperty,
            ct = it.trim,
            ut = function(t, e) {
                return new ut.fn.init(t, e, Y)
            },
            ht = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
            dt = /\S+/g,
            pt = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
            ft = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
            mt = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
            gt = /^[\],:{}\s]*$/,
            vt = /(?:^|:|,)(?:\s*\[)+/g,
            yt = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
            bt = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,
            wt = /^-ms-/,
            _t = /-([\da-z])/gi,
            xt = function(t, e) {
                return e.toUpperCase()
            },
            Ct = function(t) {
                (X.addEventListener || "load" === t.type || "complete" === X.readyState) && (St(), ut.ready())
            },
            St = function() {
                X.addEventListener ? (X.removeEventListener("DOMContentLoaded", Ct, !1), t.removeEventListener("load", Ct, !1)) : (X.detachEvent("onreadystatechange", Ct), t.detachEvent("onload", Ct))
            };
        ut.fn = ut.prototype = {
                jquery: it,
                constructor: ut,
                init: function(t, i, n) {
                    var o, s;
                    if (!t) return this;
                    if ("string" == typeof t) {
                        if (o = "<" === t.charAt(0) && ">" === t.charAt(t.length - 1) && t.length >= 3 ? [null, t, null] : ft.exec(t), !o || !o[1] && i) return !i || i.jquery ? (i || n).find(t) : this.constructor(i).find(t);
                        if (o[1]) {
                            if (i = i instanceof ut ? i[0] : i, ut.merge(this, ut.parseHTML(o[1], i && i.nodeType ? i.ownerDocument || i : X, !0)), mt.test(o[1]) && ut.isPlainObject(i))
                                for (o in i) ut.isFunction(this[o]) ? this[o](i[o]) : this.attr(o, i[o]);
                            return this
                        }
                        if (s = X.getElementById(o[2]), s && s.parentNode) {
                            if (s.id !== o[2]) return n.find(t);
                            this.length = 1, this[0] = s
                        }
                        return this.context = X, this.selector = t, this
                    }
                    return t.nodeType ? (this.context = this[0] = t, this.length = 1, this) : ut.isFunction(t) ? n.ready(t) : (t.selector !== e && (this.selector = t.selector, this.context = t.context), ut.makeArray(t, this))
                },
                selector: "",
                length: 0,
                toArray: function() {
                    return st.call(this)
                },
                get: function(t) {
                    return null == t ? this.toArray() : 0 > t ? this[this.length + t] : this[t]
                },
                pushStack: function(t) {
                    var e = ut.merge(this.constructor(), t);
                    return e.prevObject = this, e.context = this.context, e
                },
                each: function(t, e) {
                    return ut.each(this, t, e)
                },
                ready: function(t) {
                    return ut.ready.promise().done(t), this
                },
                slice: function() {
                    return this.pushStack(st.apply(this, arguments))
                },
                first: function() {
                    return this.eq(0)
                },
                last: function() {
                    return this.eq(-1)
                },
                eq: function(t) {
                    var e = this.length,
                        i = +t + (0 > t ? e : 0);
                    return this.pushStack(i >= 0 && e > i ? [this[i]] : [])
                },
                map: function(t) {
                    return this.pushStack(ut.map(this, function(e, i) {
                        return t.call(e, i, e)
                    }))
                },
                end: function() {
                    return this.prevObject || this.constructor(null)
                },
                push: ot,
                sort: [].sort,
                splice: [].splice
            }, ut.fn.init.prototype = ut.fn, ut.extend = ut.fn.extend = function() {
                var t, i, n, o, s, r, a = arguments[0] || {},
                    l = 1,
                    c = arguments.length,
                    u = !1;
                for ("boolean" == typeof a && (u = a, a = arguments[1] || {}, l = 2), "object" == typeof a || ut.isFunction(a) || (a = {}), c === l && (a = this, --l); c > l; l++)
                    if (null != (s = arguments[l]))
                        for (o in s) t = a[o], n = s[o], a !== n && (u && n && (ut.isPlainObject(n) || (i = ut.isArray(n))) ? (i ? (i = !1, r = t && ut.isArray(t) ? t : []) : r = t && ut.isPlainObject(t) ? t : {}, a[o] = ut.extend(u, r, n)) : n !== e && (a[o] = n));
                return a
            }, ut.extend({
                expando: "jQuery" + (it + Math.random()).replace(/\D/g, ""),
                noConflict: function(e) {
                    return t.$ === ut && (t.$ = Z), e && t.jQuery === ut && (t.jQuery = G), ut
                },
                isReady: !1,
                readyWait: 1,
                holdReady: function(t) {
                    t ? ut.readyWait++ : ut.ready(!0)
                },
                ready: function(t) {
                    if (t === !0 ? !--ut.readyWait : !ut.isReady) {
                        if (!X.body) return setTimeout(ut.ready);
                        ut.isReady = !0, t !== !0 && --ut.readyWait > 0 || (K.resolveWith(X, [ut]), ut.fn.trigger && ut(X).trigger("ready").off("ready"))
                    }
                },
                isFunction: function(t) {
                    return "function" === ut.type(t)
                },
                isArray: Array.isArray || function(t) {
                    return "array" === ut.type(t)
                },
                isWindow: function(t) {
                    return null != t && t == t.window
                },
                isNumeric: function(t) {
                    return !isNaN(parseFloat(t)) && isFinite(t)
                },
                type: function(t) {
                    return null == t ? t + "" : "object" == typeof t || "function" == typeof t ? tt[at.call(t)] || "object" : typeof t
                },
                isPlainObject: function(t) {
                    var i;
                    if (!t || "object" !== ut.type(t) || t.nodeType || ut.isWindow(t)) return !1;
                    try {
                        if (t.constructor && !lt.call(t, "constructor") && !lt.call(t.constructor.prototype, "isPrototypeOf")) return !1
                    } catch (n) {
                        return !1
                    }
                    if (ut.support.ownLast)
                        for (i in t) return lt.call(t, i);
                    for (i in t);
                    return i === e || lt.call(t, i)
                },
                isEmptyObject: function(t) {
                    var e;
                    for (e in t) return !1;
                    return !0
                },
                error: function(t) {
                    throw Error(t)
                },
                parseHTML: function(t, e, i) {
                    if (!t || "string" != typeof t) return null;
                    "boolean" == typeof e && (i = e, e = !1), e = e || X;
                    var n = mt.exec(t),
                        o = !i && [];
                    return n ? [e.createElement(n[1])] : (n = ut.buildFragment([t], e, o), o && ut(o).remove(), ut.merge([], n.childNodes))
                },
                parseJSON: function(i) {
                    return t.JSON && t.JSON.parse ? t.JSON.parse(i) : null === i ? i : "string" == typeof i && (i = ut.trim(i), i && gt.test(i.replace(yt, "@").replace(bt, "]").replace(vt, ""))) ? Function("return " + i)() : (ut.error("Invalid JSON: " + i), e)
                },
                parseXML: function(i) {
                    var n, o;
                    if (!i || "string" != typeof i) return null;
                    try {
                        t.DOMParser ? (o = new DOMParser, n = o.parseFromString(i, "text/xml")) : (n = new ActiveXObject("Microsoft.XMLDOM"), n.async = "false", n.loadXML(i))
                    } catch (s) {
                        n = e
                    }
                    return n && n.documentElement && !n.getElementsByTagName("parsererror").length || ut.error("Invalid XML: " + i), n
                },
                noop: function() {},
                globalEval: function(e) {
                    e && ut.trim(e) && (t.execScript || function(e) {
                        t.eval.call(t, e)
                    })(e)
                },
                camelCase: function(t) {
                    return t.replace(wt, "ms-").replace(_t, xt)
                },
                nodeName: function(t, e) {
                    return t.nodeName && t.nodeName.toLowerCase() === e.toLowerCase()
                },
                each: function(t, e, n) {
                    var o, s = 0,
                        r = t.length,
                        a = i(t);
                    if (n) {
                        if (a)
                            for (; r > s && (o = e.apply(t[s], n), o !== !1); s++);
                        else
                            for (s in t)
                                if (o = e.apply(t[s], n), o === !1) break
                    } else if (a)
                        for (; r > s && (o = e.call(t[s], s, t[s]), o !== !1); s++);
                    else
                        for (s in t)
                            if (o = e.call(t[s], s, t[s]), o === !1) break;
                    return t
                },
                trim: ct && !ct.call("\ufeff ") ? function(t) {
                    return null == t ? "" : ct.call(t)
                } : function(t) {
                    return null == t ? "" : (t + "").replace(pt, "")
                },
                makeArray: function(t, e) {
                    var n = e || [];
                    return null != t && (i(Object(t)) ? ut.merge(n, "string" == typeof t ? [t] : t) : ot.call(n, t)), n
                },
                inArray: function(t, e, i) {
                    var n;
                    if (e) {
                        if (rt) return rt.call(e, t, i);
                        for (n = e.length, i = i ? 0 > i ? Math.max(0, n + i) : i : 0; n > i; i++)
                            if (i in e && e[i] === t) return i
                    }
                    return -1
                },
                merge: function(t, i) {
                    var n = i.length,
                        o = t.length,
                        s = 0;
                    if ("number" == typeof n)
                        for (; n > s; s++) t[o++] = i[s];
                    else
                        for (; i[s] !== e;) t[o++] = i[s++];
                    return t.length = o, t
                },
                grep: function(t, e, i) {
                    var n, o = [],
                        s = 0,
                        r = t.length;
                    for (i = !!i; r > s; s++) n = !!e(t[s], s), i !== n && o.push(t[s]);
                    return o
                },
                map: function(t, e, n) {
                    var o, s = 0,
                        r = t.length,
                        a = i(t),
                        l = [];
                    if (a)
                        for (; r > s; s++) o = e(t[s], s, n), null != o && (l[l.length] = o);
                    else
                        for (s in t) o = e(t[s], s, n), null != o && (l[l.length] = o);
                    return nt.apply([], l)
                },
                guid: 1,
                proxy: function(t, i) {
                    var n, o, s;
                    return "string" == typeof i && (s = t[i], i = t, t = s), ut.isFunction(t) ? (n = st.call(arguments, 2), o = function() {
                        return t.apply(i || this, n.concat(st.call(arguments)))
                    }, o.guid = t.guid = t.guid || ut.guid++, o) : e
                },
                access: function(t, i, n, o, s, r, a) {
                    var l = 0,
                        c = t.length,
                        u = null == n;
                    if ("object" === ut.type(n)) {
                        s = !0;
                        for (l in n) ut.access(t, i, l, n[l], !0, r, a)
                    } else if (o !== e && (s = !0, ut.isFunction(o) || (a = !0), u && (a ? (i.call(t, o), i = null) : (u = i, i = function(t, e, i) {
                            return u.call(ut(t), i)
                        })), i))
                        for (; c > l; l++) i(t[l], n, a ? o : o.call(t[l], l, i(t[l], n)));
                    return s ? t : u ? i.call(t) : c ? i(t[0], n) : r
                },
                now: function() {
                    return (new Date).getTime()
                },
                swap: function(t, e, i, n) {
                    var o, s, r = {};
                    for (s in e) r[s] = t.style[s], t.style[s] = e[s];
                    o = i.apply(t, n || []);
                    for (s in e) t.style[s] = r[s];
                    return o
                }
            }), ut.ready.promise = function(e) {
                if (!K)
                    if (K = ut.Deferred(), "complete" === X.readyState) setTimeout(ut.ready);
                    else if (X.addEventListener) X.addEventListener("DOMContentLoaded", Ct, !1), t.addEventListener("load", Ct, !1);
                else {
                    X.attachEvent("onreadystatechange", Ct), t.attachEvent("onload", Ct);
                    var i = !1;
                    try {
                        i = null == t.frameElement && X.documentElement
                    } catch (n) {}
                    i && i.doScroll && function o() {
                        if (!ut.isReady) {
                            try {
                                i.doScroll("left")
                            } catch (t) {
                                return setTimeout(o, 50)
                            }
                            St(), ut.ready()
                        }
                    }()
                }
                return K.promise(e)
            }, ut.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(t, e) {
                tt["[object " + e + "]"] = e.toLowerCase()
            }), Y = ut(X),
            function(t, e) {
                function i(t, e, i, n) {
                    var o, s, r, a, l, c, u, h, f, m;
                    if ((e ? e.ownerDocument || e : R) !== j && M(e), e = e || j, i = i || [], !t || "string" != typeof t) return i;
                    if (1 !== (a = e.nodeType) && 9 !== a) return [];
                    if (P && !n) {
                        if (o = bt.exec(t))
                            if (r = o[1]) {
                                if (9 === a) {
                                    if (s = e.getElementById(r), !s || !s.parentNode) return i;
                                    if (s.id === r) return i.push(s), i
                                } else if (e.ownerDocument && (s = e.ownerDocument.getElementById(r)) && L(e, s) && s.id === r) return i.push(s), i
                            } else {
                                if (o[2]) return tt.apply(i, e.getElementsByTagName(t)), i;
                                if ((r = o[3]) && C.getElementsByClassName && e.getElementsByClassName) return tt.apply(i, e.getElementsByClassName(r)), i
                            }
                        if (C.qsa && (!N || !N.test(t))) {
                            if (h = u = H, f = e, m = 9 === a && t, 1 === a && "object" !== e.nodeName.toLowerCase()) {
                                for (c = d(t), (u = e.getAttribute("id")) ? h = u.replace(xt, "\\$&") : e.setAttribute("id", h), h = "[id='" + h + "'] ", l = c.length; l--;) c[l] = h + p(c[l]);
                                f = pt.test(t) && e.parentNode || e, m = c.join(",")
                            }
                            if (m) try {
                                return tt.apply(i, f.querySelectorAll(m)), i
                            } catch (g) {} finally {
                                u || e.removeAttribute("id")
                            }
                        }
                    }
                    return _(t.replace(ct, "$1"), e, i, n)
                }

                function n() {
                    function t(i, n) {
                        return e.push(i += " ") > k.cacheLength && delete t[e.shift()], t[i] = n
                    }
                    var e = [];
                    return t
                }

                function o(t) {
                    return t[H] = !0, t
                }

                function s(t) {
                    var e = j.createElement("div");
                    try {
                        return !!t(e)
                    } catch (i) {
                        return !1
                    } finally {
                        e.parentNode && e.parentNode.removeChild(e), e = null
                    }
                }

                function r(t, e) {
                    for (var i = t.split("|"), n = t.length; n--;) k.attrHandle[i[n]] = e
                }

                function a(t, e) {
                    var i = e && t,
                        n = i && 1 === t.nodeType && 1 === e.nodeType && (~e.sourceIndex || Q) - (~t.sourceIndex || Q);
                    if (n) return n;
                    if (i)
                        for (; i = i.nextSibling;)
                            if (i === e) return -1;
                    return t ? 1 : -1
                }

                function l(t) {
                    return function(e) {
                        var i = e.nodeName.toLowerCase();
                        return "input" === i && e.type === t
                    }
                }

                function c(t) {
                    return function(e) {
                        var i = e.nodeName.toLowerCase();
                        return ("input" === i || "button" === i) && e.type === t
                    }
                }

                function u(t) {
                    return o(function(e) {
                        return e = +e, o(function(i, n) {
                            for (var o, s = t([], i.length, e), r = s.length; r--;) i[o = s[r]] && (i[o] = !(n[o] = i[o]))
                        })
                    })
                }

                function h() {}

                function d(t, e) {
                    var n, o, s, r, a, l, c, u = z[t + " "];
                    if (u) return e ? 0 : u.slice(0);
                    for (a = t, l = [], c = k.preFilter; a;) {
                        (!n || (o = ht.exec(a))) && (o && (a = a.slice(o[0].length) || a), l.push(s = [])), n = !1, (o = dt.exec(a)) && (n = o.shift(), s.push({
                            value: n,
                            type: o[0].replace(ct, " ")
                        }), a = a.slice(n.length));
                        for (r in k.filter) !(o = vt[r].exec(a)) || c[r] && !(o = c[r](o)) || (n = o.shift(), s.push({
                            value: n,
                            type: r,
                            matches: o
                        }), a = a.slice(n.length));
                        if (!n) break
                    }
                    return e ? a.length : a ? i.error(t) : z(t, l).slice(0)
                }

                function p(t) {
                    for (var e = 0, i = t.length, n = ""; i > e; e++) n += t[e].value;
                    return n
                }

                function f(t, e, i) {
                    var n = e.dir,
                        o = i && "parentNode" === n,
                        s = W++;
                    return e.first ? function(e, i, s) {
                        for (; e = e[n];)
                            if (1 === e.nodeType || o) return t(e, i, s)
                    } : function(e, i, r) {
                        var a, l, c, u = B + " " + s;
                        if (r) {
                            for (; e = e[n];)
                                if ((1 === e.nodeType || o) && t(e, i, r)) return !0
                        } else
                            for (; e = e[n];)
                                if (1 === e.nodeType || o)
                                    if (c = e[H] || (e[H] = {}), (l = c[n]) && l[0] === u) {
                                        if ((a = l[1]) === !0 || a === S) return a === !0
                                    } else if (l = c[n] = [u], l[1] = t(e, i, r) || S, l[1] === !0) return !0
                    }
                }

                function m(t) {
                    return t.length > 1 ? function(e, i, n) {
                        for (var o = t.length; o--;)
                            if (!t[o](e, i, n)) return !1;
                        return !0
                    } : t[0]
                }

                function g(t, e, i, n, o) {
                    for (var s, r = [], a = 0, l = t.length, c = null != e; l > a; a++)(s = t[a]) && (!i || i(s, n, o)) && (r.push(s), c && e.push(a));
                    return r
                }

                function v(t, e, i, n, s, r) {
                    return n && !n[H] && (n = v(n)), s && !s[H] && (s = v(s, r)), o(function(o, r, a, l) {
                        var c, u, h, d = [],
                            p = [],
                            f = r.length,
                            m = o || w(e || "*", a.nodeType ? [a] : a, []),
                            v = !t || !o && e ? m : g(m, d, t, a, l),
                            y = i ? s || (o ? t : f || n) ? [] : r : v;
                        if (i && i(v, y, a, l), n)
                            for (c = g(y, p), n(c, [], a, l), u = c.length; u--;)(h = c[u]) && (y[p[u]] = !(v[p[u]] = h));
                        if (o) {
                            if (s || t) {
                                if (s) {
                                    for (c = [], u = y.length; u--;)(h = y[u]) && c.push(v[u] = h);
                                    s(null, y = [], c, l)
                                }
                                for (u = y.length; u--;)(h = y[u]) && (c = s ? it.call(o, h) : d[u]) > -1 && (o[c] = !(r[c] = h))
                            }
                        } else y = g(y === r ? y.splice(f, y.length) : y), s ? s(null, r, y, l) : tt.apply(r, y)
                    })
                }

                function y(t) {
                    for (var e, i, n, o = t.length, s = k.relative[t[0].type], r = s || k.relative[" "], a = s ? 1 : 0, l = f(function(t) {
                            return t === e
                        }, r, !0), c = f(function(t) {
                            return it.call(e, t) > -1
                        }, r, !0), u = [function(t, i, n) {
                            return !s && (n || i !== A) || ((e = i).nodeType ? l(t, i, n) : c(t, i, n))
                        }]; o > a; a++)
                        if (i = k.relative[t[a].type]) u = [f(m(u), i)];
                        else {
                            if (i = k.filter[t[a].type].apply(null, t[a].matches), i[H]) {
                                for (n = ++a; o > n && !k.relative[t[n].type]; n++);
                                return v(a > 1 && m(u), a > 1 && p(t.slice(0, a - 1).concat({
                                    value: " " === t[a - 2].type ? "*" : ""
                                })).replace(ct, "$1"), i, n > a && y(t.slice(a, n)), o > n && y(t = t.slice(n)), o > n && p(t))
                            }
                            u.push(i)
                        }
                    return m(u)
                }

                function b(t, e) {
                    var n = 0,
                        s = e.length > 0,
                        r = t.length > 0,
                        a = function(o, a, l, c, u) {
                            var h, d, p, f = [],
                                m = 0,
                                v = "0",
                                y = o && [],
                                b = null != u,
                                w = A,
                                _ = o || r && k.find.TAG("*", u && a.parentNode || a),
                                x = B += null == w ? 1 : Math.random() || .1;
                            for (b && (A = a !== j && a, S = n); null != (h = _[v]); v++) {
                                if (r && h) {
                                    for (d = 0; p = t[d++];)
                                        if (p(h, a, l)) {
                                            c.push(h);
                                            break
                                        }
                                    b && (B = x, S = ++n)
                                }
                                s && ((h = !p && h) && m--, o && y.push(h))
                            }
                            if (m += v, s && v !== m) {
                                for (d = 0; p = e[d++];) p(y, f, a, l);
                                if (o) {
                                    if (m > 0)
                                        for (; v--;) y[v] || f[v] || (f[v] = G.call(c));
                                    f = g(f)
                                }
                                tt.apply(c, f), b && !o && f.length > 0 && m + e.length > 1 && i.uniqueSort(c)
                            }
                            return b && (B = x, A = w), y
                        };
                    return s ? o(a) : a
                }

                function w(t, e, n) {
                    for (var o = 0, s = e.length; s > o; o++) i(t, e[o], n);
                    return n
                }

                function _(t, e, i, n) {
                    var o, s, r, a, l, c = d(t);
                    if (!n && 1 === c.length) {
                        if (s = c[0] = c[0].slice(0), s.length > 2 && "ID" === (r = s[0]).type && C.getById && 9 === e.nodeType && P && k.relative[s[1].type]) {
                            if (e = (k.find.ID(r.matches[0].replace(Ct, St), e) || [])[0], !e) return i;
                            t = t.slice(s.shift().value.length)
                        }
                        for (o = vt.needsContext.test(t) ? 0 : s.length; o-- && (r = s[o], !k.relative[a = r.type]);)
                            if ((l = k.find[a]) && (n = l(r.matches[0].replace(Ct, St), pt.test(s[0].type) && e.parentNode || e))) {
                                if (s.splice(o, 1), t = n.length && p(s), !t) return tt.apply(i, n), i;
                                break
                            }
                    }
                    return E(t, c)(n, e, !P, i, pt.test(t)), i
                }
                var x, C, S, k, T, D, E, A, I, M, j, $, P, N, O, F, L, H = "sizzle" + -new Date,
                    R = t.document,
                    B = 0,
                    W = 0,
                    q = n(),
                    z = n(),
                    U = n(),
                    K = !1,
                    Y = function(t, e) {
                        return t === e ? (K = !0, 0) : 0
                    },
                    V = typeof e,
                    Q = 1 << 31,
                    X = {}.hasOwnProperty,
                    J = [],
                    G = J.pop,
                    Z = J.push,
                    tt = J.push,
                    et = J.slice,
                    it = J.indexOf || function(t) {
                        for (var e = 0, i = this.length; i > e; e++)
                            if (this[e] === t) return e;
                        return -1
                    },
                    nt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
                    ot = "[\\x20\\t\\r\\n\\f]",
                    st = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
                    rt = st.replace("w", "w#"),
                    at = "\\[" + ot + "*(" + st + ")" + ot + "*(?:([*^$|!~]?=)" + ot + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + rt + ")|)|)" + ot + "*\\]",
                    lt = ":(" + st + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + at.replace(3, 8) + ")*)|.*)\\)|)",
                    ct = RegExp("^" + ot + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ot + "+$", "g"),
                    ht = RegExp("^" + ot + "*," + ot + "*"),
                    dt = RegExp("^" + ot + "*([>+~]|" + ot + ")" + ot + "*"),
                    pt = RegExp(ot + "*[+~]"),
                    ft = RegExp("=" + ot + "*([^\\]'\"]*)" + ot + "*\\]", "g"),
                    mt = RegExp(lt),
                    gt = RegExp("^" + rt + "$"),
                    vt = {
                        ID: RegExp("^#(" + st + ")"),
                        CLASS: RegExp("^\\.(" + st + ")"),
                        TAG: RegExp("^(" + st.replace("w", "w*") + ")"),
                        ATTR: RegExp("^" + at),
                        PSEUDO: RegExp("^" + lt),
                        CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ot + "*(even|odd|(([+-]|)(\\d*)n|)" + ot + "*(?:([+-]|)" + ot + "*(\\d+)|))" + ot + "*\\)|)", "i"),
                        bool: RegExp("^(?:" + nt + ")$", "i"),
                        needsContext: RegExp("^" + ot + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ot + "*((?:-\\d)?\\d*)" + ot + "*\\)|)(?=[^-]|$)", "i")
                    },
                    yt = /^[^{]+\{\s*\[native \w/,
                    bt = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
                    wt = /^(?:input|select|textarea|button)$/i,
                    _t = /^h\d$/i,
                    xt = /'|\\/g,
                    Ct = RegExp("\\\\([\\da-f]{1,6}" + ot + "?|(" + ot + ")|.)", "ig"),
                    St = function(t, e, i) {
                        var n = "0x" + e - 65536;
                        return n !== n || i ? e : 0 > n ? String.fromCharCode(n + 65536) : String.fromCharCode(55296 | n >> 10, 56320 | 1023 & n)
                    };
                try {
                    tt.apply(J = et.call(R.childNodes), R.childNodes), J[R.childNodes.length].nodeType
                } catch (kt) {
                    tt = {
                        apply: J.length ? function(t, e) {
                            Z.apply(t, et.call(e))
                        } : function(t, e) {
                            for (var i = t.length, n = 0; t[i++] = e[n++];);
                            t.length = i - 1
                        }
                    }
                }
                D = i.isXML = function(t) {
                    var e = t && (t.ownerDocument || t).documentElement;
                    return !!e && "HTML" !== e.nodeName
                }, C = i.support = {}, M = i.setDocument = function(t) {
                    var i = t ? t.ownerDocument || t : R,
                        n = i.defaultView;
                    return i !== j && 9 === i.nodeType && i.documentElement ? (j = i, $ = i.documentElement, P = !D(i), n && n.attachEvent && n !== n.top && n.attachEvent("onbeforeunload", function() {
                        M()
                    }), C.attributes = s(function(t) {
                        return t.className = "i", !t.getAttribute("className")
                    }), C.getElementsByTagName = s(function(t) {
                        return t.appendChild(i.createComment("")), !t.getElementsByTagName("*").length
                    }), C.getElementsByClassName = s(function(t) {
                        return t.innerHTML = "<div class='a'></div><div class='a i'></div>", t.firstChild.className = "i", 2 === t.getElementsByClassName("i").length
                    }), C.getById = s(function(t) {
                        return $.appendChild(t).id = H, !i.getElementsByName || !i.getElementsByName(H).length
                    }), C.getById ? (k.find.ID = function(t, e) {
                        if (typeof e.getElementById !== V && P) {
                            var i = e.getElementById(t);
                            return i && i.parentNode ? [i] : []
                        }
                    }, k.filter.ID = function(t) {
                        var e = t.replace(Ct, St);
                        return function(t) {
                            return t.getAttribute("id") === e
                        }
                    }) : (delete k.find.ID, k.filter.ID = function(t) {
                        var e = t.replace(Ct, St);
                        return function(t) {
                            var i = typeof t.getAttributeNode !== V && t.getAttributeNode("id");
                            return i && i.value === e
                        }
                    }), k.find.TAG = C.getElementsByTagName ? function(t, i) {
                        return typeof i.getElementsByTagName !== V ? i.getElementsByTagName(t) : e
                    } : function(t, e) {
                        var i, n = [],
                            o = 0,
                            s = e.getElementsByTagName(t);
                        if ("*" === t) {
                            for (; i = s[o++];) 1 === i.nodeType && n.push(i);
                            return n
                        }
                        return s
                    }, k.find.CLASS = C.getElementsByClassName && function(t, i) {
                        return typeof i.getElementsByClassName !== V && P ? i.getElementsByClassName(t) : e;
                    }, O = [], N = [], (C.qsa = yt.test(i.querySelectorAll)) && (s(function(t) {
                        t.innerHTML = "<select><option selected=''></option></select>", t.querySelectorAll("[selected]").length || N.push("\\[" + ot + "*(?:value|" + nt + ")"), t.querySelectorAll(":checked").length || N.push(":checked")
                    }), s(function(t) {
                        var e = i.createElement("input");
                        e.setAttribute("type", "hidden"), t.appendChild(e).setAttribute("t", ""), t.querySelectorAll("[t^='']").length && N.push("[*^$]=" + ot + "*(?:''|\"\")"), t.querySelectorAll(":enabled").length || N.push(":enabled", ":disabled"), t.querySelectorAll("*,:x"), N.push(",.*:")
                    })), (C.matchesSelector = yt.test(F = $.webkitMatchesSelector || $.mozMatchesSelector || $.oMatchesSelector || $.msMatchesSelector)) && s(function(t) {
                        C.disconnectedMatch = F.call(t, "div"), F.call(t, "[s!='']:x"), O.push("!=", lt)
                    }), N = N.length && RegExp(N.join("|")), O = O.length && RegExp(O.join("|")), L = yt.test($.contains) || $.compareDocumentPosition ? function(t, e) {
                        var i = 9 === t.nodeType ? t.documentElement : t,
                            n = e && e.parentNode;
                        return t === n || !(!n || 1 !== n.nodeType || !(i.contains ? i.contains(n) : t.compareDocumentPosition && 16 & t.compareDocumentPosition(n)))
                    } : function(t, e) {
                        if (e)
                            for (; e = e.parentNode;)
                                if (e === t) return !0;
                        return !1
                    }, Y = $.compareDocumentPosition ? function(t, e) {
                        if (t === e) return K = !0, 0;
                        var n = e.compareDocumentPosition && t.compareDocumentPosition && t.compareDocumentPosition(e);
                        return n ? 1 & n || !C.sortDetached && e.compareDocumentPosition(t) === n ? t === i || L(R, t) ? -1 : e === i || L(R, e) ? 1 : I ? it.call(I, t) - it.call(I, e) : 0 : 4 & n ? -1 : 1 : t.compareDocumentPosition ? -1 : 1
                    } : function(t, e) {
                        var n, o = 0,
                            s = t.parentNode,
                            r = e.parentNode,
                            l = [t],
                            c = [e];
                        if (t === e) return K = !0, 0;
                        if (!s || !r) return t === i ? -1 : e === i ? 1 : s ? -1 : r ? 1 : I ? it.call(I, t) - it.call(I, e) : 0;
                        if (s === r) return a(t, e);
                        for (n = t; n = n.parentNode;) l.unshift(n);
                        for (n = e; n = n.parentNode;) c.unshift(n);
                        for (; l[o] === c[o];) o++;
                        return o ? a(l[o], c[o]) : l[o] === R ? -1 : c[o] === R ? 1 : 0
                    }, i) : j
                }, i.matches = function(t, e) {
                    return i(t, null, null, e)
                }, i.matchesSelector = function(t, e) {
                    if ((t.ownerDocument || t) !== j && M(t), e = e.replace(ft, "='$1']"), !(!C.matchesSelector || !P || O && O.test(e) || N && N.test(e))) try {
                        var n = F.call(t, e);
                        if (n || C.disconnectedMatch || t.document && 11 !== t.document.nodeType) return n
                    } catch (o) {}
                    return i(e, j, null, [t]).length > 0
                }, i.contains = function(t, e) {
                    return (t.ownerDocument || t) !== j && M(t), L(t, e)
                }, i.attr = function(t, i) {
                    (t.ownerDocument || t) !== j && M(t);
                    var n = k.attrHandle[i.toLowerCase()],
                        o = n && X.call(k.attrHandle, i.toLowerCase()) ? n(t, i, !P) : e;
                    return o === e ? C.attributes || !P ? t.getAttribute(i) : (o = t.getAttributeNode(i)) && o.specified ? o.value : null : o
                }, i.error = function(t) {
                    throw Error("Syntax error, unrecognized expression: " + t)
                }, i.uniqueSort = function(t) {
                    var e, i = [],
                        n = 0,
                        o = 0;
                    if (K = !C.detectDuplicates, I = !C.sortStable && t.slice(0), t.sort(Y), K) {
                        for (; e = t[o++];) e === t[o] && (n = i.push(o));
                        for (; n--;) t.splice(i[n], 1)
                    }
                    return t
                }, T = i.getText = function(t) {
                    var e, i = "",
                        n = 0,
                        o = t.nodeType;
                    if (o) {
                        if (1 === o || 9 === o || 11 === o) {
                            if ("string" == typeof t.textContent) return t.textContent;
                            for (t = t.firstChild; t; t = t.nextSibling) i += T(t)
                        } else if (3 === o || 4 === o) return t.nodeValue
                    } else
                        for (; e = t[n]; n++) i += T(e);
                    return i
                }, k = i.selectors = {
                    cacheLength: 50,
                    createPseudo: o,
                    match: vt,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": {
                            dir: "parentNode",
                            first: !0
                        },
                        " ": {
                            dir: "parentNode"
                        },
                        "+": {
                            dir: "previousSibling",
                            first: !0
                        },
                        "~": {
                            dir: "previousSibling"
                        }
                    },
                    preFilter: {
                        ATTR: function(t) {
                            return t[1] = t[1].replace(Ct, St), t[3] = (t[4] || t[5] || "").replace(Ct, St), "~=" === t[2] && (t[3] = " " + t[3] + " "), t.slice(0, 4)
                        },
                        CHILD: function(t) {
                            return t[1] = t[1].toLowerCase(), "nth" === t[1].slice(0, 3) ? (t[3] || i.error(t[0]), t[4] = +(t[4] ? t[5] + (t[6] || 1) : 2 * ("even" === t[3] || "odd" === t[3])), t[5] = +(t[7] + t[8] || "odd" === t[3])) : t[3] && i.error(t[0]), t
                        },
                        PSEUDO: function(t) {
                            var i, n = !t[5] && t[2];
                            return vt.CHILD.test(t[0]) ? null : (t[3] && t[4] !== e ? t[2] = t[4] : n && mt.test(n) && (i = d(n, !0)) && (i = n.indexOf(")", n.length - i) - n.length) && (t[0] = t[0].slice(0, i), t[2] = n.slice(0, i)), t.slice(0, 3))
                        }
                    },
                    filter: {
                        TAG: function(t) {
                            var e = t.replace(Ct, St).toLowerCase();
                            return "*" === t ? function() {
                                return !0
                            } : function(t) {
                                return t.nodeName && t.nodeName.toLowerCase() === e
                            }
                        },
                        CLASS: function(t) {
                            var e = q[t + " "];
                            return e || (e = RegExp("(^|" + ot + ")" + t + "(" + ot + "|$)")) && q(t, function(t) {
                                return e.test("string" == typeof t.className && t.className || typeof t.getAttribute !== V && t.getAttribute("class") || "")
                            })
                        },
                        ATTR: function(t, e, n) {
                            return function(o) {
                                var s = i.attr(o, t);
                                return null == s ? "!=" === e : !e || (s += "", "=" === e ? s === n : "!=" === e ? s !== n : "^=" === e ? n && 0 === s.indexOf(n) : "*=" === e ? n && s.indexOf(n) > -1 : "$=" === e ? n && s.slice(-n.length) === n : "~=" === e ? (" " + s + " ").indexOf(n) > -1 : "|=" === e && (s === n || s.slice(0, n.length + 1) === n + "-"))
                            }
                        },
                        CHILD: function(t, e, i, n, o) {
                            var s = "nth" !== t.slice(0, 3),
                                r = "last" !== t.slice(-4),
                                a = "of-type" === e;
                            return 1 === n && 0 === o ? function(t) {
                                return !!t.parentNode
                            } : function(e, i, l) {
                                var c, u, h, d, p, f, m = s !== r ? "nextSibling" : "previousSibling",
                                    g = e.parentNode,
                                    v = a && e.nodeName.toLowerCase(),
                                    y = !l && !a;
                                if (g) {
                                    if (s) {
                                        for (; m;) {
                                            for (h = e; h = h[m];)
                                                if (a ? h.nodeName.toLowerCase() === v : 1 === h.nodeType) return !1;
                                            f = m = "only" === t && !f && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (f = [r ? g.firstChild : g.lastChild], r && y) {
                                        for (u = g[H] || (g[H] = {}), c = u[t] || [], p = c[0] === B && c[1], d = c[0] === B && c[2], h = p && g.childNodes[p]; h = ++p && h && h[m] || (d = p = 0) || f.pop();)
                                            if (1 === h.nodeType && ++d && h === e) {
                                                u[t] = [B, p, d];
                                                break
                                            }
                                    } else if (y && (c = (e[H] || (e[H] = {}))[t]) && c[0] === B) d = c[1];
                                    else
                                        for (;
                                            (h = ++p && h && h[m] || (d = p = 0) || f.pop()) && ((a ? h.nodeName.toLowerCase() !== v : 1 !== h.nodeType) || !++d || (y && ((h[H] || (h[H] = {}))[t] = [B, d]), h !== e)););
                                    return d -= o, d === n || 0 === d % n && d / n >= 0
                                }
                            }
                        },
                        PSEUDO: function(t, e) {
                            var n, s = k.pseudos[t] || k.setFilters[t.toLowerCase()] || i.error("unsupported pseudo: " + t);
                            return s[H] ? s(e) : s.length > 1 ? (n = [t, t, "", e], k.setFilters.hasOwnProperty(t.toLowerCase()) ? o(function(t, i) {
                                for (var n, o = s(t, e), r = o.length; r--;) n = it.call(t, o[r]), t[n] = !(i[n] = o[r])
                            }) : function(t) {
                                return s(t, 0, n)
                            }) : s
                        }
                    },
                    pseudos: {
                        not: o(function(t) {
                            var e = [],
                                i = [],
                                n = E(t.replace(ct, "$1"));
                            return n[H] ? o(function(t, e, i, o) {
                                for (var s, r = n(t, null, o, []), a = t.length; a--;)(s = r[a]) && (t[a] = !(e[a] = s))
                            }) : function(t, o, s) {
                                return e[0] = t, n(e, null, s, i), !i.pop()
                            }
                        }),
                        has: o(function(t) {
                            return function(e) {
                                return i(t, e).length > 0
                            }
                        }),
                        contains: o(function(t) {
                            return function(e) {
                                return (e.textContent || e.innerText || T(e)).indexOf(t) > -1
                            }
                        }),
                        lang: o(function(t) {
                            return gt.test(t || "") || i.error("unsupported lang: " + t), t = t.replace(Ct, St).toLowerCase(),
                                function(e) {
                                    var i;
                                    do
                                        if (i = P ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang")) return i = i.toLowerCase(), i === t || 0 === i.indexOf(t + "-"); while ((e = e.parentNode) && 1 === e.nodeType);
                                    return !1
                                }
                        }),
                        target: function(e) {
                            var i = t.location && t.location.hash;
                            return i && i.slice(1) === e.id
                        },
                        root: function(t) {
                            return t === $
                        },
                        focus: function(t) {
                            return t === j.activeElement && (!j.hasFocus || j.hasFocus()) && !!(t.type || t.href || ~t.tabIndex)
                        },
                        enabled: function(t) {
                            return t.disabled === !1
                        },
                        disabled: function(t) {
                            return t.disabled === !0
                        },
                        checked: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && !!t.checked || "option" === e && !!t.selected
                        },
                        selected: function(t) {
                            return t.parentNode && t.parentNode.selectedIndex, t.selected === !0
                        },
                        empty: function(t) {
                            for (t = t.firstChild; t; t = t.nextSibling)
                                if (t.nodeName > "@" || 3 === t.nodeType || 4 === t.nodeType) return !1;
                            return !0
                        },
                        parent: function(t) {
                            return !k.pseudos.empty(t)
                        },
                        header: function(t) {
                            return _t.test(t.nodeName)
                        },
                        input: function(t) {
                            return wt.test(t.nodeName)
                        },
                        button: function(t) {
                            var e = t.nodeName.toLowerCase();
                            return "input" === e && "button" === t.type || "button" === e
                        },
                        text: function(t) {
                            var e;
                            return "input" === t.nodeName.toLowerCase() && "text" === t.type && (null == (e = t.getAttribute("type")) || e.toLowerCase() === t.type)
                        },
                        first: u(function() {
                            return [0]
                        }),
                        last: u(function(t, e) {
                            return [e - 1]
                        }),
                        eq: u(function(t, e, i) {
                            return [0 > i ? i + e : i]
                        }),
                        even: u(function(t, e) {
                            for (var i = 0; e > i; i += 2) t.push(i);
                            return t
                        }),
                        odd: u(function(t, e) {
                            for (var i = 1; e > i; i += 2) t.push(i);
                            return t
                        }),
                        lt: u(function(t, e, i) {
                            for (var n = 0 > i ? i + e : i; --n >= 0;) t.push(n);
                            return t
                        }),
                        gt: u(function(t, e, i) {
                            for (var n = 0 > i ? i + e : i; e > ++n;) t.push(n);
                            return t
                        })
                    }
                }, k.pseudos.nth = k.pseudos.eq;
                for (x in {
                        radio: !0,
                        checkbox: !0,
                        file: !0,
                        password: !0,
                        image: !0
                    }) k.pseudos[x] = l(x);
                for (x in {
                        submit: !0,
                        reset: !0
                    }) k.pseudos[x] = c(x);
                h.prototype = k.filters = k.pseudos, k.setFilters = new h, E = i.compile = function(t, e) {
                    var i, n = [],
                        o = [],
                        s = U[t + " "];
                    if (!s) {
                        for (e || (e = d(t)), i = e.length; i--;) s = y(e[i]), s[H] ? n.push(s) : o.push(s);
                        s = U(t, b(o, n))
                    }
                    return s
                }, C.sortStable = H.split("").sort(Y).join("") === H, C.detectDuplicates = K, M(), C.sortDetached = s(function(t) {
                    return 1 & t.compareDocumentPosition(j.createElement("div"))
                }), s(function(t) {
                    return t.innerHTML = "<a href='#'></a>", "#" === t.firstChild.getAttribute("href")
                }) || r("type|href|height|width", function(t, i, n) {
                    return n ? e : t.getAttribute(i, "type" === i.toLowerCase() ? 1 : 2)
                }), C.attributes && s(function(t) {
                    return t.innerHTML = "<input/>", t.firstChild.setAttribute("value", ""), "" === t.firstChild.getAttribute("value")
                }) || r("value", function(t, i, n) {
                    return n || "input" !== t.nodeName.toLowerCase() ? e : t.defaultValue
                }), s(function(t) {
                    return null == t.getAttribute("disabled")
                }) || r(nt, function(t, i, n) {
                    var o;
                    return n ? e : (o = t.getAttributeNode(i)) && o.specified ? o.value : t[i] === !0 ? i.toLowerCase() : null
                }), ut.find = i, ut.expr = i.selectors, ut.expr[":"] = ut.expr.pseudos, ut.unique = i.uniqueSort, ut.text = i.getText, ut.isXMLDoc = i.isXML, ut.contains = i.contains
            }(t);
        var kt = {};
        ut.Callbacks = function(t) {
            t = "string" == typeof t ? kt[t] || n(t) : ut.extend({}, t);
            var i, o, s, r, a, l, c = [],
                u = !t.once && [],
                h = function(e) {
                    for (o = t.memory && e, s = !0, a = l || 0, l = 0, r = c.length, i = !0; c && r > a; a++)
                        if (c[a].apply(e[0], e[1]) === !1 && t.stopOnFalse) {
                            o = !1;
                            break
                        }
                    i = !1, c && (u ? u.length && h(u.shift()) : o ? c = [] : d.disable())
                },
                d = {
                    add: function() {
                        if (c) {
                            var e = c.length;
                            ! function n(e) {
                                ut.each(e, function(e, i) {
                                    var o = ut.type(i);
                                    "function" === o ? t.unique && d.has(i) || c.push(i) : i && i.length && "string" !== o && n(i)
                                })
                            }(arguments), i ? r = c.length : o && (l = e, h(o))
                        }
                        return this
                    },
                    remove: function() {
                        return c && ut.each(arguments, function(t, e) {
                            for (var n;
                                (n = ut.inArray(e, c, n)) > -1;) c.splice(n, 1), i && (r >= n && r--, a >= n && a--)
                        }), this
                    },
                    has: function(t) {
                        return t ? ut.inArray(t, c) > -1 : !(!c || !c.length)
                    },
                    empty: function() {
                        return c = [], r = 0, this
                    },
                    disable: function() {
                        return c = u = o = e, this
                    },
                    disabled: function() {
                        return !c
                    },
                    lock: function() {
                        return u = e, o || d.disable(), this
                    },
                    locked: function() {
                        return !u
                    },
                    fireWith: function(t, e) {
                        return !c || s && !u || (e = e || [], e = [t, e.slice ? e.slice() : e], i ? u.push(e) : h(e)), this
                    },
                    fire: function() {
                        return d.fireWith(this, arguments), this
                    },
                    fired: function() {
                        return !!s
                    }
                };
            return d
        }, ut.extend({
            Deferred: function(t) {
                var e = [
                        ["resolve", "done", ut.Callbacks("once memory"), "resolved"],
                        ["reject", "fail", ut.Callbacks("once memory"), "rejected"],
                        ["notify", "progress", ut.Callbacks("memory")]
                    ],
                    i = "pending",
                    n = {
                        state: function() {
                            return i
                        },
                        always: function() {
                            return o.done(arguments).fail(arguments), this
                        },
                        then: function() {
                            var t = arguments;
                            return ut.Deferred(function(i) {
                                ut.each(e, function(e, s) {
                                    var r = s[0],
                                        a = ut.isFunction(t[e]) && t[e];
                                    o[s[1]](function() {
                                        var t = a && a.apply(this, arguments);
                                        t && ut.isFunction(t.promise) ? t.promise().done(i.resolve).fail(i.reject).progress(i.notify) : i[r + "With"](this === n ? i.promise() : this, a ? [t] : arguments)
                                    })
                                }), t = null
                            }).promise()
                        },
                        promise: function(t) {
                            return null != t ? ut.extend(t, n) : n
                        }
                    },
                    o = {};
                return n.pipe = n.then, ut.each(e, function(t, s) {
                    var r = s[2],
                        a = s[3];
                    n[s[1]] = r.add, a && r.add(function() {
                        i = a
                    }, e[1 ^ t][2].disable, e[2][2].lock), o[s[0]] = function() {
                        return o[s[0] + "With"](this === o ? n : this, arguments), this
                    }, o[s[0] + "With"] = r.fireWith
                }), n.promise(o), t && t.call(o, o), o
            },
            when: function(t) {
                var e, i, n, o = 0,
                    s = st.call(arguments),
                    r = s.length,
                    a = 1 !== r || t && ut.isFunction(t.promise) ? r : 0,
                    l = 1 === a ? t : ut.Deferred(),
                    c = function(t, i, n) {
                        return function(o) {
                            i[t] = this, n[t] = arguments.length > 1 ? st.call(arguments) : o, n === e ? l.notifyWith(i, n) : --a || l.resolveWith(i, n)
                        }
                    };
                if (r > 1)
                    for (e = Array(r), i = Array(r), n = Array(r); r > o; o++) s[o] && ut.isFunction(s[o].promise) ? s[o].promise().done(c(o, n, s)).fail(l.reject).progress(c(o, i, e)) : --a;
                return a || l.resolveWith(n, s), l.promise()
            }
        }), ut.support = function(e) {
            var i, n, o, s, r, a, l, c, u, h = X.createElement("div");
            if (h.setAttribute("className", "t"), h.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", i = h.getElementsByTagName("*") || [], n = h.getElementsByTagName("a")[0], !n || !n.style || !i.length) return e;
            s = X.createElement("select"), a = s.appendChild(X.createElement("option")), o = h.getElementsByTagName("input")[0], n.style.cssText = "top:1px;float:left;opacity:.5", e.getSetAttribute = "t" !== h.className, e.leadingWhitespace = 3 === h.firstChild.nodeType, e.tbody = !h.getElementsByTagName("tbody").length, e.htmlSerialize = !!h.getElementsByTagName("link").length, e.style = /top/.test(n.getAttribute("style")), e.hrefNormalized = "/a" === n.getAttribute("href"), e.opacity = /^0.5/.test(n.style.opacity), e.cssFloat = !!n.style.cssFloat, e.checkOn = !!o.value, e.optSelected = a.selected, e.enctype = !!X.createElement("form").enctype, e.html5Clone = "<:nav></:nav>" !== X.createElement("nav").cloneNode(!0).outerHTML, e.inlineBlockNeedsLayout = !1, e.shrinkWrapBlocks = !1, e.pixelPosition = !1, e.deleteExpando = !0, e.noCloneEvent = !0, e.reliableMarginRight = !0, e.boxSizingReliable = !0, o.checked = !0, e.noCloneChecked = o.cloneNode(!0).checked, s.disabled = !0, e.optDisabled = !a.disabled;
            try {
                delete h.test
            } catch (d) {
                e.deleteExpando = !1
            }
            o = X.createElement("input"), o.setAttribute("value", ""), e.input = "" === o.getAttribute("value"), o.value = "t", o.setAttribute("type", "radio"), e.radioValue = "t" === o.value, o.setAttribute("checked", "t"), o.setAttribute("name", "t"), r = X.createDocumentFragment(), r.appendChild(o), e.appendChecked = o.checked, e.checkClone = r.cloneNode(!0).cloneNode(!0).lastChild.checked, h.attachEvent && (h.attachEvent("onclick", function() {
                e.noCloneEvent = !1
            }), h.cloneNode(!0).click());
            for (u in {
                    submit: !0,
                    change: !0,
                    focusin: !0
                }) h.setAttribute(l = "on" + u, "t"), e[u + "Bubbles"] = l in t || h.attributes[l].expando === !1;
            h.style.backgroundClip = "content-box", h.cloneNode(!0).style.backgroundClip = "", e.clearCloneStyle = "content-box" === h.style.backgroundClip;
            for (u in ut(e)) break;
            return e.ownLast = "0" !== u, ut(function() {
                var i, n, o, s = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
                    r = X.getElementsByTagName("body")[0];
                r && (i = X.createElement("div"), i.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px", r.appendChild(i).appendChild(h), h.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", o = h.getElementsByTagName("td"), o[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = 0 === o[0].offsetHeight, o[0].style.display = "", o[1].style.display = "none", e.reliableHiddenOffsets = c && 0 === o[0].offsetHeight, h.innerHTML = "", h.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", ut.swap(r, null != r.style.zoom ? {
                    zoom: 1
                } : {}, function() {
                    e.boxSizing = 4 === h.offsetWidth
                }), t.getComputedStyle && (e.pixelPosition = "1%" !== (t.getComputedStyle(h, null) || {}).top, e.boxSizingReliable = "4px" === (t.getComputedStyle(h, null) || {
                    width: "4px"
                }).width, n = h.appendChild(X.createElement("div")), n.style.cssText = h.style.cssText = s, n.style.marginRight = n.style.width = "0", h.style.width = "1px", e.reliableMarginRight = !parseFloat((t.getComputedStyle(n, null) || {}).marginRight)), typeof h.style.zoom !== V && (h.innerHTML = "", h.style.cssText = s + "width:1px;padding:1px;display:inline;zoom:1", e.inlineBlockNeedsLayout = 3 === h.offsetWidth, h.style.display = "block", h.innerHTML = "<div></div>", h.firstChild.style.width = "5px", e.shrinkWrapBlocks = 3 !== h.offsetWidth, e.inlineBlockNeedsLayout && (r.style.zoom = 1)), r.removeChild(i), i = h = o = n = null)
            }), i = s = r = a = n = o = null, e
        }({});
        var Tt = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
            Dt = /([A-Z])/g;
        ut.extend({
            cache: {},
            noData: {
                applet: !0,
                embed: !0,
                object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
            },
            hasData: function(t) {
                return t = t.nodeType ? ut.cache[t[ut.expando]] : t[ut.expando], !!t && !a(t)
            },
            data: function(t, e, i) {
                return o(t, e, i)
            },
            removeData: function(t, e) {
                return s(t, e)
            },
            _data: function(t, e, i) {
                return o(t, e, i, !0)
            },
            _removeData: function(t, e) {
                return s(t, e, !0)
            },
            acceptData: function(t) {
                if (t.nodeType && 1 !== t.nodeType && 9 !== t.nodeType) return !1;
                var e = t.nodeName && ut.noData[t.nodeName.toLowerCase()];
                return !e || e !== !0 && t.getAttribute("classid") === e
            }
        }), ut.fn.extend({
            data: function(t, i) {
                var n, o, s = null,
                    a = 0,
                    l = this[0];
                if (t === e) {
                    if (this.length && (s = ut.data(l), 1 === l.nodeType && !ut._data(l, "parsedAttrs"))) {
                        for (n = l.attributes; n.length > a; a++) o = n[a].name, 0 === o.indexOf("data-") && (o = ut.camelCase(o.slice(5)), r(l, o, s[o]));
                        ut._data(l, "parsedAttrs", !0)
                    }
                    return s
                }
                return "object" == typeof t ? this.each(function() {
                    ut.data(this, t)
                }) : arguments.length > 1 ? this.each(function() {
                    ut.data(this, t, i)
                }) : l ? r(l, t, ut.data(l, t)) : null
            },
            removeData: function(t) {
                return this.each(function() {
                    ut.removeData(this, t)
                })
            }
        }), ut.extend({
            queue: function(t, i, n) {
                var o;
                return t ? (i = (i || "fx") + "queue", o = ut._data(t, i), n && (!o || ut.isArray(n) ? o = ut._data(t, i, ut.makeArray(n)) : o.push(n)), o || []) : e
            },
            dequeue: function(t, e) {
                e = e || "fx";
                var i = ut.queue(t, e),
                    n = i.length,
                    o = i.shift(),
                    s = ut._queueHooks(t, e),
                    r = function() {
                        ut.dequeue(t, e)
                    };
                "inprogress" === o && (o = i.shift(), n--), o && ("fx" === e && i.unshift("inprogress"), delete s.stop, o.call(t, r, s)), !n && s && s.empty.fire()
            },
            _queueHooks: function(t, e) {
                var i = e + "queueHooks";
                return ut._data(t, i) || ut._data(t, i, {
                    empty: ut.Callbacks("once memory").add(function() {
                        ut._removeData(t, e + "queue"), ut._removeData(t, i)
                    })
                })
            }
        }), ut.fn.extend({
            queue: function(t, i) {
                var n = 2;
                return "string" != typeof t && (i = t, t = "fx", n--), n > arguments.length ? ut.queue(this[0], t) : i === e ? this : this.each(function() {
                    var e = ut.queue(this, t, i);
                    ut._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && ut.dequeue(this, t)
                })
            },
            dequeue: function(t) {
                return this.each(function() {
                    ut.dequeue(this, t)
                })
            },
            delay: function(t, e) {
                return t = ut.fx ? ut.fx.speeds[t] || t : t, e = e || "fx", this.queue(e, function(e, i) {
                    var n = setTimeout(e, t);
                    i.stop = function() {
                        clearTimeout(n)
                    }
                })
            },
            clearQueue: function(t) {
                return this.queue(t || "fx", [])
            },
            promise: function(t, i) {
                var n, o = 1,
                    s = ut.Deferred(),
                    r = this,
                    a = this.length,
                    l = function() {
                        --o || s.resolveWith(r, [r])
                    };
                for ("string" != typeof t && (i = t, t = e), t = t || "fx"; a--;) n = ut._data(r[a], t + "queueHooks"), n && n.empty && (o++, n.empty.add(l));
                return l(), s.promise(i)
            }
        });
        var Et, At, It = /[\t\r\n\f]/g,
            Mt = /\r/g,
            jt = /^(?:input|select|textarea|button|object)$/i,
            $t = /^(?:a|area)$/i,
            Pt = /^(?:checked|selected)$/i,
            Nt = ut.support.getSetAttribute,
            Ot = ut.support.input;
        ut.fn.extend({
            attr: function(t, e) {
                return ut.access(this, ut.attr, t, e, arguments.length > 1)
            },
            removeAttr: function(t) {
                return this.each(function() {
                    ut.removeAttr(this, t)
                })
            },
            prop: function(t, e) {
                return ut.access(this, ut.prop, t, e, arguments.length > 1)
            },
            removeProp: function(t) {
                return t = ut.propFix[t] || t, this.each(function() {
                    try {
                        this[t] = e, delete this[t]
                    } catch (i) {}
                })
            },
            addClass: function(t) {
                var e, i, n, o, s, r = 0,
                    a = this.length,
                    l = "string" == typeof t && t;
                if (ut.isFunction(t)) return this.each(function(e) {
                    ut(this).addClass(t.call(this, e, this.className))
                });
                if (l)
                    for (e = (t || "").match(dt) || []; a > r; r++)
                        if (i = this[r], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(It, " ") : " ")) {
                            for (s = 0; o = e[s++];) 0 > n.indexOf(" " + o + " ") && (n += o + " ");
                            i.className = ut.trim(n)
                        }
                return this
            },
            removeClass: function(t) {
                var e, i, n, o, s, r = 0,
                    a = this.length,
                    l = 0 === arguments.length || "string" == typeof t && t;
                if (ut.isFunction(t)) return this.each(function(e) {
                    ut(this).removeClass(t.call(this, e, this.className))
                });
                if (l)
                    for (e = (t || "").match(dt) || []; a > r; r++)
                        if (i = this[r], n = 1 === i.nodeType && (i.className ? (" " + i.className + " ").replace(It, " ") : "")) {
                            for (s = 0; o = e[s++];)
                                for (; n.indexOf(" " + o + " ") >= 0;) n = n.replace(" " + o + " ", " ");
                            i.className = t ? ut.trim(n) : ""
                        }
                return this
            },
            toggleClass: function(t, e) {
                var i = typeof t;
                return "boolean" == typeof e && "string" === i ? e ? this.addClass(t) : this.removeClass(t) : ut.isFunction(t) ? this.each(function(i) {
                    ut(this).toggleClass(t.call(this, i, this.className, e), e)
                }) : this.each(function() {
                    if ("string" === i)
                        for (var e, n = 0, o = ut(this), s = t.match(dt) || []; e = s[n++];) o.hasClass(e) ? o.removeClass(e) : o.addClass(e);
                    else(i === V || "boolean" === i) && (this.className && ut._data(this, "__className__", this.className), this.className = this.className || t === !1 ? "" : ut._data(this, "__className__") || "")
                })
            },
            hasClass: function(t) {
                for (var e = " " + t + " ", i = 0, n = this.length; n > i; i++)
                    if (1 === this[i].nodeType && (" " + this[i].className + " ").replace(It, " ").indexOf(e) >= 0) return !0;
                return !1
            },
            val: function(t) {
                var i, n, o, s = this[0];
                return arguments.length ? (o = ut.isFunction(t), this.each(function(i) {
                    var s;
                    1 === this.nodeType && (s = o ? t.call(this, i, ut(this).val()) : t, null == s ? s = "" : "number" == typeof s ? s += "" : ut.isArray(s) && (s = ut.map(s, function(t) {
                        return null == t ? "" : t + ""
                    })), n = ut.valHooks[this.type] || ut.valHooks[this.nodeName.toLowerCase()], n && "set" in n && n.set(this, s, "value") !== e || (this.value = s))
                })) : s ? (n = ut.valHooks[s.type] || ut.valHooks[s.nodeName.toLowerCase()], n && "get" in n && (i = n.get(s, "value")) !== e ? i : (i = s.value, "string" == typeof i ? i.replace(Mt, "") : null == i ? "" : i)) : void 0
            }
        }), ut.extend({
            valHooks: {
                option: {
                    get: function(t) {
                        var e = ut.find.attr(t, "value");
                        return null != e ? e : t.text
                    }
                },
                select: {
                    get: function(t) {
                        for (var e, i, n = t.options, o = t.selectedIndex, s = "select-one" === t.type || 0 > o, r = s ? null : [], a = s ? o + 1 : n.length, l = 0 > o ? a : s ? o : 0; a > l; l++)
                            if (i = n[l], !(!i.selected && l !== o || (ut.support.optDisabled ? i.disabled : null !== i.getAttribute("disabled")) || i.parentNode.disabled && ut.nodeName(i.parentNode, "optgroup"))) {
                                if (e = ut(i).val(), s) return e;
                                r.push(e)
                            }
                        return r
                    },
                    set: function(t, e) {
                        for (var i, n, o = t.options, s = ut.makeArray(e), r = o.length; r--;) n = o[r], (n.selected = ut.inArray(ut(n).val(), s) >= 0) && (i = !0);
                        return i || (t.selectedIndex = -1), s
                    }
                }
            },
            attr: function(t, i, n) {
                var o, s, r = t.nodeType;
                if (t && 3 !== r && 8 !== r && 2 !== r) return typeof t.getAttribute === V ? ut.prop(t, i, n) : (1 === r && ut.isXMLDoc(t) || (i = i.toLowerCase(), o = ut.attrHooks[i] || (ut.expr.match.bool.test(i) ? At : Et)), n === e ? o && "get" in o && null !== (s = o.get(t, i)) ? s : (s = ut.find.attr(t, i), null == s ? e : s) : null !== n ? o && "set" in o && (s = o.set(t, n, i)) !== e ? s : (t.setAttribute(i, n + ""), n) : (ut.removeAttr(t, i), e))
            },
            removeAttr: function(t, e) {
                var i, n, o = 0,
                    s = e && e.match(dt);
                if (s && 1 === t.nodeType)
                    for (; i = s[o++];) n = ut.propFix[i] || i, ut.expr.match.bool.test(i) ? Ot && Nt || !Pt.test(i) ? t[n] = !1 : t[ut.camelCase("default-" + i)] = t[n] = !1 : ut.attr(t, i, ""), t.removeAttribute(Nt ? i : n)
            },
            attrHooks: {
                type: {
                    set: function(t, e) {
                        if (!ut.support.radioValue && "radio" === e && ut.nodeName(t, "input")) {
                            var i = t.value;
                            return t.setAttribute("type", e), i && (t.value = i), e
                        }
                    }
                }
            },
            propFix: {
                "for": "htmlFor",
                "class": "className"
            },
            prop: function(t, i, n) {
                var o, s, r, a = t.nodeType;
                if (t && 3 !== a && 8 !== a && 2 !== a) return r = 1 !== a || !ut.isXMLDoc(t), r && (i = ut.propFix[i] || i, s = ut.propHooks[i]), n !== e ? s && "set" in s && (o = s.set(t, n, i)) !== e ? o : t[i] = n : s && "get" in s && null !== (o = s.get(t, i)) ? o : t[i]
            },
            propHooks: {
                tabIndex: {
                    get: function(t) {
                        var e = ut.find.attr(t, "tabindex");
                        return e ? parseInt(e, 10) : jt.test(t.nodeName) || $t.test(t.nodeName) && t.href ? 0 : -1
                    }
                }
            }
        }), At = {
            set: function(t, e, i) {
                return e === !1 ? ut.removeAttr(t, i) : Ot && Nt || !Pt.test(i) ? t.setAttribute(!Nt && ut.propFix[i] || i, i) : t[ut.camelCase("default-" + i)] = t[i] = !0, i
            }
        }, ut.each(ut.expr.match.bool.source.match(/\w+/g), function(t, i) {
            var n = ut.expr.attrHandle[i] || ut.find.attr;
            ut.expr.attrHandle[i] = Ot && Nt || !Pt.test(i) ? function(t, i, o) {
                var s = ut.expr.attrHandle[i],
                    r = o ? e : (ut.expr.attrHandle[i] = e) != n(t, i, o) ? i.toLowerCase() : null;
                return ut.expr.attrHandle[i] = s, r
            } : function(t, i, n) {
                return n ? e : t[ut.camelCase("default-" + i)] ? i.toLowerCase() : null
            }
        }), Ot && Nt || (ut.attrHooks.value = {
            set: function(t, i, n) {
                return ut.nodeName(t, "input") ? (t.defaultValue = i, e) : Et && Et.set(t, i, n)
            }
        }), Nt || (Et = {
            set: function(t, i, n) {
                var o = t.getAttributeNode(n);
                return o || t.setAttributeNode(o = t.ownerDocument.createAttribute(n)), o.value = i += "", "value" === n || i === t.getAttribute(n) ? i : e
            }
        }, ut.expr.attrHandle.id = ut.expr.attrHandle.name = ut.expr.attrHandle.coords = function(t, i, n) {
            var o;
            return n ? e : (o = t.getAttributeNode(i)) && "" !== o.value ? o.value : null
        }, ut.valHooks.button = {
            get: function(t, i) {
                var n = t.getAttributeNode(i);
                return n && n.specified ? n.value : e
            },
            set: Et.set
        }, ut.attrHooks.contenteditable = {
            set: function(t, e, i) {
                Et.set(t, "" !== e && e, i)
            }
        }, ut.each(["width", "height"], function(t, i) {
            ut.attrHooks[i] = {
                set: function(t, n) {
                    return "" === n ? (t.setAttribute(i, "auto"), n) : e
                }
            }
        })), ut.support.hrefNormalized || ut.each(["href", "src"], function(t, e) {
            ut.propHooks[e] = {
                get: function(t) {
                    return t.getAttribute(e, 4)
                }
            }
        }), ut.support.style || (ut.attrHooks.style = {
            get: function(t) {
                return t.style.cssText || e
            },
            set: function(t, e) {
                return t.style.cssText = e + ""
            }
        }), ut.support.optSelected || (ut.propHooks.selected = {
            get: function(t) {
                var e = t.parentNode;
                return e && (e.selectedIndex, e.parentNode && e.parentNode.selectedIndex), null
            }
        }), ut.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
            ut.propFix[this.toLowerCase()] = this
        }), ut.support.enctype || (ut.propFix.enctype = "encoding"), ut.each(["radio", "checkbox"], function() {
            ut.valHooks[this] = {
                set: function(t, i) {
                    return ut.isArray(i) ? t.checked = ut.inArray(ut(t).val(), i) >= 0 : e
                }
            }, ut.support.checkOn || (ut.valHooks[this].get = function(t) {
                return null === t.getAttribute("value") ? "on" : t.value
            })
        });
        var Ft = /^(?:input|select|textarea)$/i,
            Lt = /^key/,
            Ht = /^(?:mouse|contextmenu)|click/,
            Rt = /^(?:focusinfocus|focusoutblur)$/,
            Bt = /^([^.]*)(?:\.(.+)|)$/;
        ut.event = {
                global: {},
                add: function(t, i, n, o, s) {
                    var r, a, l, c, u, h, d, p, f, m, g, v = ut._data(t);
                    if (v) {
                        for (n.handler && (c = n, n = c.handler, s = c.selector), n.guid || (n.guid = ut.guid++), (a = v.events) || (a = v.events = {}), (h = v.handle) || (h = v.handle = function(t) {
                                return typeof ut === V || t && ut.event.triggered === t.type ? e : ut.event.dispatch.apply(h.elem, arguments)
                            }, h.elem = t), i = (i || "").match(dt) || [""], l = i.length; l--;) r = Bt.exec(i[l]) || [], f = g = r[1], m = (r[2] || "").split(".").sort(), f && (u = ut.event.special[f] || {}, f = (s ? u.delegateType : u.bindType) || f, u = ut.event.special[f] || {}, d = ut.extend({
                            type: f,
                            origType: g,
                            data: o,
                            handler: n,
                            guid: n.guid,
                            selector: s,
                            needsContext: s && ut.expr.match.needsContext.test(s),
                            namespace: m.join(".")
                        }, c), (p = a[f]) || (p = a[f] = [], p.delegateCount = 0, u.setup && u.setup.call(t, o, m, h) !== !1 || (t.addEventListener ? t.addEventListener(f, h, !1) : t.attachEvent && t.attachEvent("on" + f, h))), u.add && (u.add.call(t, d), d.handler.guid || (d.handler.guid = n.guid)), s ? p.splice(p.delegateCount++, 0, d) : p.push(d), ut.event.global[f] = !0);
                        t = null
                    }
                },
                remove: function(t, e, i, n, o) {
                    var s, r, a, l, c, u, h, d, p, f, m, g = ut.hasData(t) && ut._data(t);
                    if (g && (u = g.events)) {
                        for (e = (e || "").match(dt) || [""], c = e.length; c--;)
                            if (a = Bt.exec(e[c]) || [], p = m = a[1], f = (a[2] || "").split(".").sort(), p) {
                                for (h = ut.event.special[p] || {}, p = (n ? h.delegateType : h.bindType) || p, d = u[p] || [], a = a[2] && RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)"), l = s = d.length; s--;) r = d[s], !o && m !== r.origType || i && i.guid !== r.guid || a && !a.test(r.namespace) || n && n !== r.selector && ("**" !== n || !r.selector) || (d.splice(s, 1), r.selector && d.delegateCount--, h.remove && h.remove.call(t, r));
                                l && !d.length && (h.teardown && h.teardown.call(t, f, g.handle) !== !1 || ut.removeEvent(t, p, g.handle), delete u[p])
                            } else
                                for (p in u) ut.event.remove(t, p + e[c], i, n, !0);
                        ut.isEmptyObject(u) && (delete g.handle, ut._removeData(t, "events"))
                    }
                },
                trigger: function(i, n, o, s) {
                    var r, a, l, c, u, h, d, p = [o || X],
                        f = lt.call(i, "type") ? i.type : i,
                        m = lt.call(i, "namespace") ? i.namespace.split(".") : [];
                    if (l = h = o = o || X, 3 !== o.nodeType && 8 !== o.nodeType && !Rt.test(f + ut.event.triggered) && (f.indexOf(".") >= 0 && (m = f.split("."), f = m.shift(), m.sort()), a = 0 > f.indexOf(":") && "on" + f, i = i[ut.expando] ? i : new ut.Event(f, "object" == typeof i && i), i.isTrigger = s ? 2 : 3, i.namespace = m.join("."), i.namespace_re = i.namespace ? RegExp("(^|\\.)" + m.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, i.result = e, i.target || (i.target = o), n = null == n ? [i] : ut.makeArray(n, [i]), u = ut.event.special[f] || {}, s || !u.trigger || u.trigger.apply(o, n) !== !1)) {
                        if (!s && !u.noBubble && !ut.isWindow(o)) {
                            for (c = u.delegateType || f, Rt.test(c + f) || (l = l.parentNode); l; l = l.parentNode) p.push(l), h = l;
                            h === (o.ownerDocument || X) && p.push(h.defaultView || h.parentWindow || t)
                        }
                        for (d = 0;
                            (l = p[d++]) && !i.isPropagationStopped();) i.type = d > 1 ? c : u.bindType || f, r = (ut._data(l, "events") || {})[i.type] && ut._data(l, "handle"), r && r.apply(l, n), r = a && l[a], r && ut.acceptData(l) && r.apply && r.apply(l, n) === !1 && i.preventDefault();
                        if (i.type = f, !s && !i.isDefaultPrevented() && (!u._default || u._default.apply(p.pop(), n) === !1) && ut.acceptData(o) && a && o[f] && !ut.isWindow(o)) {
                            h = o[a], h && (o[a] = null), ut.event.triggered = f;
                            try {
                                o[f]()
                            } catch (g) {}
                            ut.event.triggered = e, h && (o[a] = h)
                        }
                        return i.result
                    }
                },
                dispatch: function(t) {
                    t = ut.event.fix(t);
                    var i, n, o, s, r, a = [],
                        l = st.call(arguments),
                        c = (ut._data(this, "events") || {})[t.type] || [],
                        u = ut.event.special[t.type] || {};
                    if (l[0] = t, t.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, t) !== !1) {
                        for (a = ut.event.handlers.call(this, t, c), i = 0;
                            (s = a[i++]) && !t.isPropagationStopped();)
                            for (t.currentTarget = s.elem, r = 0;
                                (o = s.handlers[r++]) && !t.isImmediatePropagationStopped();)(!t.namespace_re || t.namespace_re.test(o.namespace)) && (t.handleObj = o, t.data = o.data, n = ((ut.event.special[o.origType] || {}).handle || o.handler).apply(s.elem, l), n !== e && (t.result = n) === !1 && (t.preventDefault(), t.stopPropagation()));
                        return u.postDispatch && u.postDispatch.call(this, t), t.result
                    }
                },
                handlers: function(t, i) {
                    var n, o, s, r, a = [],
                        l = i.delegateCount,
                        c = t.target;
                    if (l && c.nodeType && (!t.button || "click" !== t.type))
                        for (; c != this; c = c.parentNode || this)
                            if (1 === c.nodeType && (c.disabled !== !0 || "click" !== t.type)) {
                                for (s = [], r = 0; l > r; r++) o = i[r], n = o.selector + " ", s[n] === e && (s[n] = o.needsContext ? ut(n, this).index(c) >= 0 : ut.find(n, this, null, [c]).length), s[n] && s.push(o);
                                s.length && a.push({
                                    elem: c,
                                    handlers: s
                                })
                            }
                    return i.length > l && a.push({
                        elem: this,
                        handlers: i.slice(l)
                    }), a
                },
                fix: function(t) {
                    if (t[ut.expando]) return t;
                    var e, i, n, o = t.type,
                        s = t,
                        r = this.fixHooks[o];
                    for (r || (this.fixHooks[o] = r = Ht.test(o) ? this.mouseHooks : Lt.test(o) ? this.keyHooks : {}), n = r.props ? this.props.concat(r.props) : this.props, t = new ut.Event(s), e = n.length; e--;) i = n[e], t[i] = s[i];
                    return t.target || (t.target = s.srcElement || X), 3 === t.target.nodeType && (t.target = t.target.parentNode), t.metaKey = !!t.metaKey, r.filter ? r.filter(t, s) : t
                },
                props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
                fixHooks: {},
                keyHooks: {
                    props: "char charCode key keyCode".split(" "),
                    filter: function(t, e) {
                        return null == t.which && (t.which = null != e.charCode ? e.charCode : e.keyCode), t
                    }
                },
                mouseHooks: {
                    props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
                    filter: function(t, i) {
                        var n, o, s, r = i.button,
                            a = i.fromElement;
                        return null == t.pageX && null != i.clientX && (o = t.target.ownerDocument || X, s = o.documentElement, n = o.body, t.pageX = i.clientX + (s && s.scrollLeft || n && n.scrollLeft || 0) - (s && s.clientLeft || n && n.clientLeft || 0), t.pageY = i.clientY + (s && s.scrollTop || n && n.scrollTop || 0) - (s && s.clientTop || n && n.clientTop || 0)), !t.relatedTarget && a && (t.relatedTarget = a === t.target ? i.toElement : a), t.which || r === e || (t.which = 1 & r ? 1 : 2 & r ? 3 : 4 & r ? 2 : 0), t
                    }
                },
                special: {
                    load: {
                        noBubble: !0
                    },
                    focus: {
                        trigger: function() {
                            if (this !== u() && this.focus) try {
                                return this.focus(), !1
                            } catch (t) {}
                        },
                        delegateType: "focusin"
                    },
                    blur: {
                        trigger: function() {
                            return this === u() && this.blur ? (this.blur(), !1) : e
                        },
                        delegateType: "focusout"
                    },
                    click: {
                        trigger: function() {
                            return ut.nodeName(this, "input") && "checkbox" === this.type && this.click ? (this.click(), !1) : e
                        },
                        _default: function(t) {
                            return ut.nodeName(t.target, "a")
                        }
                    },
                    beforeunload: {
                        postDispatch: function(t) {
                            t.result !== e && (t.originalEvent.returnValue = t.result)
                        }
                    }
                },
                simulate: function(t, e, i, n) {
                    var o = ut.extend(new ut.Event, i, {
                        type: t,
                        isSimulated: !0,
                        originalEvent: {}
                    });
                    n ? ut.event.trigger(o, null, e) : ut.event.dispatch.call(e, o), o.isDefaultPrevented() && i.preventDefault()
                }
            }, ut.removeEvent = X.removeEventListener ? function(t, e, i) {
                t.removeEventListener && t.removeEventListener(e, i, !1)
            } : function(t, e, i) {
                var n = "on" + e;
                t.detachEvent && (typeof t[n] === V && (t[n] = null), t.detachEvent(n, i))
            }, ut.Event = function(t, i) {
                return this instanceof ut.Event ? (t && t.type ? (this.originalEvent = t, this.type = t.type, this.isDefaultPrevented = t.defaultPrevented || t.returnValue === !1 || t.getPreventDefault && t.getPreventDefault() ? l : c) : this.type = t, i && ut.extend(this, i), this.timeStamp = t && t.timeStamp || ut.now(), this[ut.expando] = !0, e) : new ut.Event(t, i)
            }, ut.Event.prototype = {
                isDefaultPrevented: c,
                isPropagationStopped: c,
                isImmediatePropagationStopped: c,
                preventDefault: function() {
                    var t = this.originalEvent;
                    this.isDefaultPrevented = l, t && (t.preventDefault ? t.preventDefault() : t.returnValue = !1)
                },
                stopPropagation: function() {
                    var t = this.originalEvent;
                    this.isPropagationStopped = l, t && (t.stopPropagation && t.stopPropagation(), t.cancelBubble = !0)
                },
                stopImmediatePropagation: function() {
                    this.isImmediatePropagationStopped = l, this.stopPropagation()
                }
            }, ut.each({
                mouseenter: "mouseover",
                mouseleave: "mouseout"
            }, function(t, e) {
                ut.event.special[t] = {
                    delegateType: e,
                    bindType: e,
                    handle: function(t) {
                        var i, n = this,
                            o = t.relatedTarget,
                            s = t.handleObj;
                        return (!o || o !== n && !ut.contains(n, o)) && (t.type = s.origType, i = s.handler.apply(this, arguments), t.type = e), i
                    }
                }
            }),
            ut.support.submitBubbles || (ut.event.special.submit = {
                setup: function() {
                    return !ut.nodeName(this, "form") && (ut.event.add(this, "click._submit keypress._submit", function(t) {
                        var i = t.target,
                            n = ut.nodeName(i, "input") || ut.nodeName(i, "button") ? i.form : e;
                        n && !ut._data(n, "submitBubbles") && (ut.event.add(n, "submit._submit", function(t) {
                            t._submit_bubble = !0
                        }), ut._data(n, "submitBubbles", !0))
                    }), e)
                },
                postDispatch: function(t) {
                    t._submit_bubble && (delete t._submit_bubble, this.parentNode && !t.isTrigger && ut.event.simulate("submit", this.parentNode, t, !0))
                },
                teardown: function() {
                    return !ut.nodeName(this, "form") && (ut.event.remove(this, "._submit"), e)
                }
            }), ut.support.changeBubbles || (ut.event.special.change = {
                setup: function() {
                    return Ft.test(this.nodeName) ? (("checkbox" === this.type || "radio" === this.type) && (ut.event.add(this, "propertychange._change", function(t) {
                        "checked" === t.originalEvent.propertyName && (this._just_changed = !0)
                    }), ut.event.add(this, "click._change", function(t) {
                        this._just_changed && !t.isTrigger && (this._just_changed = !1), ut.event.simulate("change", this, t, !0)
                    })), !1) : (ut.event.add(this, "beforeactivate._change", function(t) {
                        var e = t.target;
                        Ft.test(e.nodeName) && !ut._data(e, "changeBubbles") && (ut.event.add(e, "change._change", function(t) {
                            !this.parentNode || t.isSimulated || t.isTrigger || ut.event.simulate("change", this.parentNode, t, !0)
                        }), ut._data(e, "changeBubbles", !0))
                    }), e)
                },
                handle: function(t) {
                    var i = t.target;
                    return this !== i || t.isSimulated || t.isTrigger || "radio" !== i.type && "checkbox" !== i.type ? t.handleObj.handler.apply(this, arguments) : e
                },
                teardown: function() {
                    return ut.event.remove(this, "._change"), !Ft.test(this.nodeName)
                }
            }), ut.support.focusinBubbles || ut.each({
                focus: "focusin",
                blur: "focusout"
            }, function(t, e) {
                var i = 0,
                    n = function(t) {
                        ut.event.simulate(e, t.target, ut.event.fix(t), !0)
                    };
                ut.event.special[e] = {
                    setup: function() {
                        0 === i++ && X.addEventListener(t, n, !0)
                    },
                    teardown: function() {
                        0 === --i && X.removeEventListener(t, n, !0)
                    }
                }
            }), ut.fn.extend({
                on: function(t, i, n, o, s) {
                    var r, a;
                    if ("object" == typeof t) {
                        "string" != typeof i && (n = n || i, i = e);
                        for (r in t) this.on(r, i, n, t[r], s);
                        return this
                    }
                    if (null == n && null == o ? (o = i, n = i = e) : null == o && ("string" == typeof i ? (o = n, n = e) : (o = n, n = i, i = e)), o === !1) o = c;
                    else if (!o) return this;
                    return 1 === s && (a = o, o = function(t) {
                        return ut().off(t), a.apply(this, arguments)
                    }, o.guid = a.guid || (a.guid = ut.guid++)), this.each(function() {
                        ut.event.add(this, t, o, n, i)
                    })
                },
                one: function(t, e, i, n) {
                    return this.on(t, e, i, n, 1)
                },
                off: function(t, i, n) {
                    var o, s;
                    if (t && t.preventDefault && t.handleObj) return o = t.handleObj, ut(t.delegateTarget).off(o.namespace ? o.origType + "." + o.namespace : o.origType, o.selector, o.handler), this;
                    if ("object" == typeof t) {
                        for (s in t) this.off(s, i, t[s]);
                        return this
                    }
                    return (i === !1 || "function" == typeof i) && (n = i, i = e), n === !1 && (n = c), this.each(function() {
                        ut.event.remove(this, t, n, i)
                    })
                },
                trigger: function(t, e) {
                    return this.each(function() {
                        ut.event.trigger(t, e, this)
                    })
                },
                triggerHandler: function(t, i) {
                    var n = this[0];
                    return n ? ut.event.trigger(t, i, n, !0) : e
                }
            });
        var Wt = /^.[^:#\[\.,]*$/,
            qt = /^(?:parents|prev(?:Until|All))/,
            zt = ut.expr.match.needsContext,
            Ut = {
                children: !0,
                contents: !0,
                next: !0,
                prev: !0
            };
        ut.fn.extend({
            find: function(t) {
                var e, i = [],
                    n = this,
                    o = n.length;
                if ("string" != typeof t) return this.pushStack(ut(t).filter(function() {
                    for (e = 0; o > e; e++)
                        if (ut.contains(n[e], this)) return !0
                }));
                for (e = 0; o > e; e++) ut.find(t, n[e], i);
                return i = this.pushStack(o > 1 ? ut.unique(i) : i), i.selector = this.selector ? this.selector + " " + t : t, i
            },
            has: function(t) {
                var e, i = ut(t, this),
                    n = i.length;
                return this.filter(function() {
                    for (e = 0; n > e; e++)
                        if (ut.contains(this, i[e])) return !0
                })
            },
            not: function(t) {
                return this.pushStack(d(this, t || [], !0))
            },
            filter: function(t) {
                return this.pushStack(d(this, t || [], !1))
            },
            is: function(t) {
                return !!d(this, "string" == typeof t && zt.test(t) ? ut(t) : t || [], !1).length
            },
            closest: function(t, e) {
                for (var i, n = 0, o = this.length, s = [], r = zt.test(t) || "string" != typeof t ? ut(t, e || this.context) : 0; o > n; n++)
                    for (i = this[n]; i && i !== e; i = i.parentNode)
                        if (11 > i.nodeType && (r ? r.index(i) > -1 : 1 === i.nodeType && ut.find.matchesSelector(i, t))) {
                            i = s.push(i);
                            break
                        }
                return this.pushStack(s.length > 1 ? ut.unique(s) : s)
            },
            index: function(t) {
                return t ? "string" == typeof t ? ut.inArray(this[0], ut(t)) : ut.inArray(t.jquery ? t[0] : t, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
            },
            add: function(t, e) {
                var i = "string" == typeof t ? ut(t, e) : ut.makeArray(t && t.nodeType ? [t] : t),
                    n = ut.merge(this.get(), i);
                return this.pushStack(ut.unique(n))
            },
            addBack: function(t) {
                return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
            }
        }), ut.each({
            parent: function(t) {
                var e = t.parentNode;
                return e && 11 !== e.nodeType ? e : null
            },
            parents: function(t) {
                return ut.dir(t, "parentNode")
            },
            parentsUntil: function(t, e, i) {
                return ut.dir(t, "parentNode", i)
            },
            next: function(t) {
                return h(t, "nextSibling")
            },
            prev: function(t) {
                return h(t, "previousSibling")
            },
            nextAll: function(t) {
                return ut.dir(t, "nextSibling")
            },
            prevAll: function(t) {
                return ut.dir(t, "previousSibling")
            },
            nextUntil: function(t, e, i) {
                return ut.dir(t, "nextSibling", i)
            },
            prevUntil: function(t, e, i) {
                return ut.dir(t, "previousSibling", i)
            },
            siblings: function(t) {
                return ut.sibling((t.parentNode || {}).firstChild, t)
            },
            children: function(t) {
                return ut.sibling(t.firstChild)
            },
            contents: function(t) {
                return ut.nodeName(t, "iframe") ? t.contentDocument || t.contentWindow.document : ut.merge([], t.childNodes)
            }
        }, function(t, e) {
            ut.fn[t] = function(i, n) {
                var o = ut.map(this, e, i);
                return "Until" !== t.slice(-5) && (n = i), n && "string" == typeof n && (o = ut.filter(n, o)), this.length > 1 && (Ut[t] || (o = ut.unique(o)), qt.test(t) && (o = o.reverse())), this.pushStack(o)
            }
        }), ut.extend({
            filter: function(t, e, i) {
                var n = e[0];
                return i && (t = ":not(" + t + ")"), 1 === e.length && 1 === n.nodeType ? ut.find.matchesSelector(n, t) ? [n] : [] : ut.find.matches(t, ut.grep(e, function(t) {
                    return 1 === t.nodeType
                }))
            },
            dir: function(t, i, n) {
                for (var o = [], s = t[i]; s && 9 !== s.nodeType && (n === e || 1 !== s.nodeType || !ut(s).is(n));) 1 === s.nodeType && o.push(s), s = s[i];
                return o
            },
            sibling: function(t, e) {
                for (var i = []; t; t = t.nextSibling) 1 === t.nodeType && t !== e && i.push(t);
                return i
            }
        });
        var Kt = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            Yt = / jQuery\d+="(?:null|\d+)"/g,
            Vt = RegExp("<(?:" + Kt + ")[\\s/>]", "i"),
            Qt = /^\s+/,
            Xt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            Jt = /<([\w:]+)/,
            Gt = /<tbody/i,
            Zt = /<|&#?\w+;/,
            te = /<(?:script|style|link)/i,
            ee = /^(?:checkbox|radio)$/i,
            ie = /checked\s*(?:[^=]|=\s*.checked.)/i,
            ne = /^$|\/(?:java|ecma)script/i,
            oe = /^true\/(.*)/,
            se = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
            re = {
                option: [1, "<select multiple='multiple'>", "</select>"],
                legend: [1, "<fieldset>", "</fieldset>"],
                area: [1, "<map>", "</map>"],
                param: [1, "<object>", "</object>"],
                thead: [1, "<table>", "</table>"],
                tr: [2, "<table><tbody>", "</tbody></table>"],
                col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
                td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
                _default: ut.support.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
            },
            ae = p(X),
            le = ae.appendChild(X.createElement("div"));
        re.optgroup = re.option, re.tbody = re.tfoot = re.colgroup = re.caption = re.thead, re.th = re.td, ut.fn.extend({
            text: function(t) {
                return ut.access(this, function(t) {
                    return t === e ? ut.text(this) : this.empty().append((this[0] && this[0].ownerDocument || X).createTextNode(t))
                }, null, t, arguments.length)
            },
            append: function() {
                return this.domManip(arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = f(this, t);
                        e.appendChild(t)
                    }
                })
            },
            prepend: function() {
                return this.domManip(arguments, function(t) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var e = f(this, t);
                        e.insertBefore(t, e.firstChild)
                    }
                })
            },
            before: function() {
                return this.domManip(arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this)
                })
            },
            after: function() {
                return this.domManip(arguments, function(t) {
                    this.parentNode && this.parentNode.insertBefore(t, this.nextSibling)
                })
            },
            remove: function(t, e) {
                for (var i, n = t ? ut.filter(t, this) : this, o = 0; null != (i = n[o]); o++) e || 1 !== i.nodeType || ut.cleanData(w(i)), i.parentNode && (e && ut.contains(i.ownerDocument, i) && v(w(i, "script")), i.parentNode.removeChild(i));
                return this
            },
            empty: function() {
                for (var t, e = 0; null != (t = this[e]); e++) {
                    for (1 === t.nodeType && ut.cleanData(w(t, !1)); t.firstChild;) t.removeChild(t.firstChild);
                    t.options && ut.nodeName(t, "select") && (t.options.length = 0)
                }
                return this
            },
            clone: function(t, e) {
                return t = null != t && t, e = null == e ? t : e, this.map(function() {
                    return ut.clone(this, t, e)
                })
            },
            html: function(t) {
                return ut.access(this, function(t) {
                    var i = this[0] || {},
                        n = 0,
                        o = this.length;
                    if (t === e) return 1 === i.nodeType ? i.innerHTML.replace(Yt, "") : e;
                    if (!("string" != typeof t || te.test(t) || !ut.support.htmlSerialize && Vt.test(t) || !ut.support.leadingWhitespace && Qt.test(t) || re[(Jt.exec(t) || ["", ""])[1].toLowerCase()])) {
                        t = t.replace(Xt, "<$1></$2>");
                        try {
                            for (; o > n; n++) i = this[n] || {}, 1 === i.nodeType && (ut.cleanData(w(i, !1)), i.innerHTML = t);
                            i = 0
                        } catch (s) {}
                    }
                    i && this.empty().append(t)
                }, null, t, arguments.length)
            },
            replaceWith: function() {
                var t = ut.map(this, function(t) {
                        return [t.nextSibling, t.parentNode]
                    }),
                    e = 0;
                return this.domManip(arguments, function(i) {
                    var n = t[e++],
                        o = t[e++];
                    o && (n && n.parentNode !== o && (n = this.nextSibling), ut(this).remove(), o.insertBefore(i, n))
                }, !0), e ? this : this.remove()
            },
            detach: function(t) {
                return this.remove(t, !0)
            },
            domManip: function(t, e, i) {
                t = nt.apply([], t);
                var n, o, s, r, a, l, c = 0,
                    u = this.length,
                    h = this,
                    d = u - 1,
                    p = t[0],
                    f = ut.isFunction(p);
                if (f || !(1 >= u || "string" != typeof p || ut.support.checkClone) && ie.test(p)) return this.each(function(n) {
                    var o = h.eq(n);
                    f && (t[0] = p.call(this, n, o.html())), o.domManip(t, e, i)
                });
                if (u && (l = ut.buildFragment(t, this[0].ownerDocument, !1, !i && this), n = l.firstChild, 1 === l.childNodes.length && (l = n), n)) {
                    for (r = ut.map(w(l, "script"), m), s = r.length; u > c; c++) o = l, c !== d && (o = ut.clone(o, !0, !0), s && ut.merge(r, w(o, "script"))), e.call(this[c], o, c);
                    if (s)
                        for (a = r[r.length - 1].ownerDocument, ut.map(r, g), c = 0; s > c; c++) o = r[c], ne.test(o.type || "") && !ut._data(o, "globalEval") && ut.contains(a, o) && (o.src ? ut._evalUrl(o.src) : ut.globalEval((o.text || o.textContent || o.innerHTML || "").replace(se, "")));
                    l = n = null
                }
                return this
            }
        }), ut.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, function(t, e) {
            ut.fn[t] = function(t) {
                for (var i, n = 0, o = [], s = ut(t), r = s.length - 1; r >= n; n++) i = n === r ? this : this.clone(!0), ut(s[n])[e](i), ot.apply(o, i.get());
                return this.pushStack(o)
            }
        }), ut.extend({
            clone: function(t, e, i) {
                var n, o, s, r, a, l = ut.contains(t.ownerDocument, t);
                if (ut.support.html5Clone || ut.isXMLDoc(t) || !Vt.test("<" + t.nodeName + ">") ? s = t.cloneNode(!0) : (le.innerHTML = t.outerHTML, le.removeChild(s = le.firstChild)), !(ut.support.noCloneEvent && ut.support.noCloneChecked || 1 !== t.nodeType && 11 !== t.nodeType || ut.isXMLDoc(t)))
                    for (n = w(s), a = w(t), r = 0; null != (o = a[r]); ++r) n[r] && b(o, n[r]);
                if (e)
                    if (i)
                        for (a = a || w(t), n = n || w(s), r = 0; null != (o = a[r]); r++) y(o, n[r]);
                    else y(t, s);
                return n = w(s, "script"), n.length > 0 && v(n, !l && w(t, "script")), n = a = o = null, s
            },
            buildFragment: function(t, e, i, n) {
                for (var o, s, r, a, l, c, u, h = t.length, d = p(e), f = [], m = 0; h > m; m++)
                    if (s = t[m], s || 0 === s)
                        if ("object" === ut.type(s)) ut.merge(f, s.nodeType ? [s] : s);
                        else if (Zt.test(s)) {
                    for (a = a || d.appendChild(e.createElement("div")), l = (Jt.exec(s) || ["", ""])[1].toLowerCase(), u = re[l] || re._default, a.innerHTML = u[1] + s.replace(Xt, "<$1></$2>") + u[2], o = u[0]; o--;) a = a.lastChild;
                    if (!ut.support.leadingWhitespace && Qt.test(s) && f.push(e.createTextNode(Qt.exec(s)[0])), !ut.support.tbody)
                        for (s = "table" !== l || Gt.test(s) ? "<table>" !== u[1] || Gt.test(s) ? 0 : a : a.firstChild, o = s && s.childNodes.length; o--;) ut.nodeName(c = s.childNodes[o], "tbody") && !c.childNodes.length && s.removeChild(c);
                    for (ut.merge(f, a.childNodes), a.textContent = ""; a.firstChild;) a.removeChild(a.firstChild);
                    a = d.lastChild
                } else f.push(e.createTextNode(s));
                for (a && d.removeChild(a), ut.support.appendChecked || ut.grep(w(f, "input"), _), m = 0; s = f[m++];)
                    if ((!n || -1 === ut.inArray(s, n)) && (r = ut.contains(s.ownerDocument, s), a = w(d.appendChild(s), "script"), r && v(a), i))
                        for (o = 0; s = a[o++];) ne.test(s.type || "") && i.push(s);
                return a = null, d
            },
            cleanData: function(t, e) {
                for (var i, n, o, s, r = 0, a = ut.expando, l = ut.cache, c = ut.support.deleteExpando, u = ut.event.special; null != (i = t[r]); r++)
                    if ((e || ut.acceptData(i)) && (o = i[a], s = o && l[o])) {
                        if (s.events)
                            for (n in s.events) u[n] ? ut.event.remove(i, n) : ut.removeEvent(i, n, s.handle);
                        l[o] && (delete l[o], c ? delete i[a] : typeof i.removeAttribute !== V ? i.removeAttribute(a) : i[a] = null, et.push(o))
                    }
            },
            _evalUrl: function(t) {
                return ut.ajax({
                    url: t,
                    type: "GET",
                    dataType: "script",
                    async: !1,
                    global: !1,
                    "throws": !0
                })
            }
        }), ut.fn.extend({
            wrapAll: function(t) {
                if (ut.isFunction(t)) return this.each(function(e) {
                    ut(this).wrapAll(t.call(this, e))
                });
                if (this[0]) {
                    var e = ut(t, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && e.insertBefore(this[0]), e.map(function() {
                        for (var t = this; t.firstChild && 1 === t.firstChild.nodeType;) t = t.firstChild;
                        return t
                    }).append(this)
                }
                return this
            },
            wrapInner: function(t) {
                return ut.isFunction(t) ? this.each(function(e) {
                    ut(this).wrapInner(t.call(this, e))
                }) : this.each(function() {
                    var e = ut(this),
                        i = e.contents();
                    i.length ? i.wrapAll(t) : e.append(t)
                })
            },
            wrap: function(t) {
                var e = ut.isFunction(t);
                return this.each(function(i) {
                    ut(this).wrapAll(e ? t.call(this, i) : t)
                })
            },
            unwrap: function() {
                return this.parent().each(function() {
                    ut.nodeName(this, "body") || ut(this).replaceWith(this.childNodes)
                }).end()
            }
        });
        var ce, ue, he, de = /alpha\([^)]*\)/i,
            pe = /opacity\s*=\s*([^)]*)/,
            fe = /^(top|right|bottom|left)$/,
            me = /^(none|table(?!-c[ea]).+)/,
            ge = /^margin/,
            ve = RegExp("^(" + ht + ")(.*)$", "i"),
            ye = RegExp("^(" + ht + ")(?!px)[a-z%]+$", "i"),
            be = RegExp("^([+-])=(" + ht + ")", "i"),
            we = {
                BODY: "block"
            },
            _e = {
                position: "absolute",
                visibility: "hidden",
                display: "block"
            },
            xe = {
                letterSpacing: 0,
                fontWeight: 400
            },
            Ce = ["Top", "Right", "Bottom", "Left"],
            Se = ["Webkit", "O", "Moz", "ms"];
        ut.fn.extend({
            css: function(t, i) {
                return ut.access(this, function(t, i, n) {
                    var o, s, r = {},
                        a = 0;
                    if (ut.isArray(i)) {
                        for (s = ue(t), o = i.length; o > a; a++) r[i[a]] = ut.css(t, i[a], !1, s);
                        return r
                    }
                    return n !== e ? ut.style(t, i, n) : ut.css(t, i)
                }, t, i, arguments.length > 1)
            },
            show: function() {
                return S(this, !0)
            },
            hide: function() {
                return S(this)
            },
            toggle: function(t) {
                return "boolean" == typeof t ? t ? this.show() : this.hide() : this.each(function() {
                    C(this) ? ut(this).show() : ut(this).hide()
                })
            }
        }), ut.extend({
            cssHooks: {
                opacity: {
                    get: function(t, e) {
                        if (e) {
                            var i = he(t, "opacity");
                            return "" === i ? "1" : i
                        }
                    }
                }
            },
            cssNumber: {
                columnCount: !0,
                fillOpacity: !0,
                fontWeight: !0,
                lineHeight: !0,
                opacity: !0,
                order: !0,
                orphans: !0,
                widows: !0,
                zIndex: !0,
                zoom: !0
            },
            cssProps: {
                "float": ut.support.cssFloat ? "cssFloat" : "styleFloat"
            },
            style: function(t, i, n, o) {
                if (t && 3 !== t.nodeType && 8 !== t.nodeType && t.style) {
                    var s, r, a, l = ut.camelCase(i),
                        c = t.style;
                    if (i = ut.cssProps[l] || (ut.cssProps[l] = x(c, l)), a = ut.cssHooks[i] || ut.cssHooks[l], n === e) return a && "get" in a && (s = a.get(t, !1, o)) !== e ? s : c[i];
                    if (r = typeof n, "string" === r && (s = be.exec(n)) && (n = (s[1] + 1) * s[2] + parseFloat(ut.css(t, i)), r = "number"), !(null == n || "number" === r && isNaN(n) || ("number" !== r || ut.cssNumber[l] || (n += "px"), ut.support.clearCloneStyle || "" !== n || 0 !== i.indexOf("background") || (c[i] = "inherit"), a && "set" in a && (n = a.set(t, n, o)) === e))) try {
                        c[i] = n
                    } catch (u) {}
                }
            },
            css: function(t, i, n, o) {
                var s, r, a, l = ut.camelCase(i);
                return i = ut.cssProps[l] || (ut.cssProps[l] = x(t.style, l)), a = ut.cssHooks[i] || ut.cssHooks[l], a && "get" in a && (r = a.get(t, !0, n)), r === e && (r = he(t, i, o)), "normal" === r && i in xe && (r = xe[i]), "" === n || n ? (s = parseFloat(r), n === !0 || ut.isNumeric(s) ? s || 0 : r) : r
            }
        }), t.getComputedStyle ? (ue = function(e) {
            return t.getComputedStyle(e, null)
        }, he = function(t, i, n) {
            var o, s, r, a = n || ue(t),
                l = a ? a.getPropertyValue(i) || a[i] : e,
                c = t.style;
            return a && ("" !== l || ut.contains(t.ownerDocument, t) || (l = ut.style(t, i)), ye.test(l) && ge.test(i) && (o = c.width, s = c.minWidth, r = c.maxWidth, c.minWidth = c.maxWidth = c.width = l, l = a.width, c.width = o, c.minWidth = s, c.maxWidth = r)), l
        }) : X.documentElement.currentStyle && (ue = function(t) {
            return t.currentStyle
        }, he = function(t, i, n) {
            var o, s, r, a = n || ue(t),
                l = a ? a[i] : e,
                c = t.style;
            return null == l && c && c[i] && (l = c[i]), ye.test(l) && !fe.test(i) && (o = c.left, s = t.runtimeStyle, r = s && s.left, r && (s.left = t.currentStyle.left), c.left = "fontSize" === i ? "1em" : l, l = c.pixelLeft + "px", c.left = o, r && (s.left = r)), "" === l ? "auto" : l
        }), ut.each(["height", "width"], function(t, i) {
            ut.cssHooks[i] = {
                get: function(t, n, o) {
                    return n ? 0 === t.offsetWidth && me.test(ut.css(t, "display")) ? ut.swap(t, _e, function() {
                        return D(t, i, o)
                    }) : D(t, i, o) : e
                },
                set: function(t, e, n) {
                    var o = n && ue(t);
                    return k(t, e, n ? T(t, i, n, ut.support.boxSizing && "border-box" === ut.css(t, "boxSizing", !1, o), o) : 0)
                }
            }
        }), ut.support.opacity || (ut.cssHooks.opacity = {
            get: function(t, e) {
                return pe.test((e && t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : e ? "1" : ""
            },
            set: function(t, e) {
                var i = t.style,
                    n = t.currentStyle,
                    o = ut.isNumeric(e) ? "alpha(opacity=" + 100 * e + ")" : "",
                    s = n && n.filter || i.filter || "";
                i.zoom = 1, (e >= 1 || "" === e) && "" === ut.trim(s.replace(de, "")) && i.removeAttribute && (i.removeAttribute("filter"), "" === e || n && !n.filter) || (i.filter = de.test(s) ? s.replace(de, o) : s + " " + o)
            }
        }), ut(function() {
            ut.support.reliableMarginRight || (ut.cssHooks.marginRight = {
                get: function(t, i) {
                    return i ? ut.swap(t, {
                        display: "inline-block"
                    }, he, [t, "marginRight"]) : e
                }
            }), !ut.support.pixelPosition && ut.fn.position && ut.each(["top", "left"], function(t, i) {
                ut.cssHooks[i] = {
                    get: function(t, n) {
                        return n ? (n = he(t, i), ye.test(n) ? ut(t).position()[i] + "px" : n) : e
                    }
                }
            })
        }), ut.expr && ut.expr.filters && (ut.expr.filters.hidden = function(t) {
            return 0 >= t.offsetWidth && 0 >= t.offsetHeight || !ut.support.reliableHiddenOffsets && "none" === (t.style && t.style.display || ut.css(t, "display"))
        }, ut.expr.filters.visible = function(t) {
            return !ut.expr.filters.hidden(t)
        }), ut.each({
            margin: "",
            padding: "",
            border: "Width"
        }, function(t, e) {
            ut.cssHooks[t + e] = {
                expand: function(i) {
                    for (var n = 0, o = {}, s = "string" == typeof i ? i.split(" ") : [i]; 4 > n; n++) o[t + Ce[n] + e] = s[n] || s[n - 2] || s[0];
                    return o
                }
            }, ge.test(t) || (ut.cssHooks[t + e].set = k)
        });
        var ke = /%20/g,
            Te = /\[\]$/,
            De = /\r?\n/g,
            Ee = /^(?:submit|button|image|reset|file)$/i,
            Ae = /^(?:input|select|textarea|keygen)/i;
        ut.fn.extend({
            serialize: function() {
                return ut.param(this.serializeArray())
            },
            serializeArray: function() {
                return this.map(function() {
                    var t = ut.prop(this, "elements");
                    return t ? ut.makeArray(t) : this
                }).filter(function() {
                    var t = this.type;
                    return this.name && !ut(this).is(":disabled") && Ae.test(this.nodeName) && !Ee.test(t) && (this.checked || !ee.test(t))
                }).map(function(t, e) {
                    var i = ut(this).val();
                    return null == i ? null : ut.isArray(i) ? ut.map(i, function(t) {
                        return {
                            name: e.name,
                            value: t.replace(De, "\r\n")
                        }
                    }) : {
                        name: e.name,
                        value: i.replace(De, "\r\n")
                    }
                }).get()
            }
        }), ut.param = function(t, i) {
            var n, o = [],
                s = function(t, e) {
                    e = ut.isFunction(e) ? e() : null == e ? "" : e, o[o.length] = encodeURIComponent(t) + "=" + encodeURIComponent(e)
                };
            if (i === e && (i = ut.ajaxSettings && ut.ajaxSettings.traditional), ut.isArray(t) || t.jquery && !ut.isPlainObject(t)) ut.each(t, function() {
                s(this.name, this.value)
            });
            else
                for (n in t) I(n, t[n], i, s);
            return o.join("&").replace(ke, "+")
        }, ut.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(t, e) {
            ut.fn[e] = function(t, i) {
                return arguments.length > 0 ? this.on(e, null, t, i) : this.trigger(e)
            }
        }), ut.fn.extend({
            hover: function(t, e) {
                return this.mouseenter(t).mouseleave(e || t)
            },
            bind: function(t, e, i) {
                return this.on(t, null, e, i)
            },
            unbind: function(t, e) {
                return this.off(t, null, e)
            },
            delegate: function(t, e, i, n) {
                return this.on(e, t, i, n)
            },
            undelegate: function(t, e, i) {
                return 1 === arguments.length ? this.off(t, "**") : this.off(e, t || "**", i)
            }
        });
        var Ie, Me, je = ut.now(),
            $e = /\?/,
            Pe = /#.*$/,
            Ne = /([?&])_=[^&]*/,
            Oe = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
            Fe = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
            Le = /^(?:GET|HEAD)$/,
            He = /^\/\//,
            Re = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
            Be = ut.fn.load,
            We = {},
            qe = {},
            ze = "*/".concat("*");
        try {
            Me = Q.href
        } catch (Ue) {
            Me = X.createElement("a"), Me.href = "", Me = Me.href
        }
        Ie = Re.exec(Me.toLowerCase()) || [], ut.fn.load = function(t, i, n) {
            if ("string" != typeof t && Be) return Be.apply(this, arguments);
            var o, s, r, a = this,
                l = t.indexOf(" ");
            return l >= 0 && (o = t.slice(l, t.length), t = t.slice(0, l)), ut.isFunction(i) ? (n = i, i = e) : i && "object" == typeof i && (r = "POST"), a.length > 0 && ut.ajax({
                url: t,
                type: r,
                dataType: "html",
                data: i
            }).done(function(t) {
                s = arguments, a.html(o ? ut("<div>").append(ut.parseHTML(t)).find(o) : t)
            }).complete(n && function(t, e) {
                a.each(n, s || [t.responseText, e, t])
            }), this
        }, ut.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(t, e) {
            ut.fn[e] = function(t) {
                return this.on(e, t)
            }
        }), ut.extend({
            active: 0,
            lastModified: {},
            etag: {},
            ajaxSettings: {
                url: Me,
                type: "GET",
                isLocal: Fe.test(Ie[1]),
                global: !0,
                processData: !0,
                async: !0,
                contentType: "application/x-www-form-urlencoded; charset=UTF-8",
                accepts: {
                    "*": ze,
                    text: "text/plain",
                    html: "text/html",
                    xml: "application/xml, text/xml",
                    json: "application/json, text/javascript"
                },
                contents: {
                    xml: /xml/,
                    html: /html/,
                    json: /json/
                },
                responseFields: {
                    xml: "responseXML",
                    text: "responseText",
                    json: "responseJSON"
                },
                converters: {
                    "* text": String,
                    "text html": !0,
                    "text json": ut.parseJSON,
                    "text xml": ut.parseXML
                },
                flatOptions: {
                    url: !0,
                    context: !0
                }
            },
            ajaxSetup: function(t, e) {
                return e ? $($(t, ut.ajaxSettings), e) : $(ut.ajaxSettings, t)
            },
            ajaxPrefilter: M(We),
            ajaxTransport: M(qe),
            ajax: function(t, i) {
                function n(t, i, n, o) {
                    var s, h, y, b, _, C = i;
                    2 !== w && (w = 2, l && clearTimeout(l), u = e, a = o || "", x.readyState = t > 0 ? 4 : 0, s = t >= 200 && 300 > t || 304 === t, n && (b = P(d, x, n)), b = N(d, b, x, s), s ? (d.ifModified && (_ = x.getResponseHeader("Last-Modified"), _ && (ut.lastModified[r] = _), _ = x.getResponseHeader("etag"), _ && (ut.etag[r] = _)), 204 === t || "HEAD" === d.type ? C = "nocontent" : 304 === t ? C = "notmodified" : (C = b.state, h = b.data, y = b.error, s = !y)) : (y = C, (t || !C) && (C = "error", 0 > t && (t = 0))), x.status = t, x.statusText = (i || C) + "", s ? m.resolveWith(p, [h, C, x]) : m.rejectWith(p, [x, C, y]), x.statusCode(v), v = e, c && f.trigger(s ? "ajaxSuccess" : "ajaxError", [x, d, s ? h : y]), g.fireWith(p, [x, C]), c && (f.trigger("ajaxComplete", [x, d]), --ut.active || ut.event.trigger("ajaxStop")))
                }
                "object" == typeof t && (i = t, t = e), i = i || {};
                var o, s, r, a, l, c, u, h, d = ut.ajaxSetup({}, i),
                    p = d.context || d,
                    f = d.context && (p.nodeType || p.jquery) ? ut(p) : ut.event,
                    m = ut.Deferred(),
                    g = ut.Callbacks("once memory"),
                    v = d.statusCode || {},
                    y = {},
                    b = {},
                    w = 0,
                    _ = "canceled",
                    x = {
                        readyState: 0,
                        getResponseHeader: function(t) {
                            var e;
                            if (2 === w) {
                                if (!h)
                                    for (h = {}; e = Oe.exec(a);) h[e[1].toLowerCase()] = e[2];
                                e = h[t.toLowerCase()]
                            }
                            return null == e ? null : e
                        },
                        getAllResponseHeaders: function() {
                            return 2 === w ? a : null
                        },
                        setRequestHeader: function(t, e) {
                            var i = t.toLowerCase();
                            return w || (t = b[i] = b[i] || t, y[t] = e), this
                        },
                        overrideMimeType: function(t) {
                            return w || (d.mimeType = t), this
                        },
                        statusCode: function(t) {
                            var e;
                            if (t)
                                if (2 > w)
                                    for (e in t) v[e] = [v[e], t[e]];
                                else x.always(t[x.status]);
                            return this
                        },
                        abort: function(t) {
                            var e = t || _;
                            return u && u.abort(e), n(0, e), this
                        }
                    };
                if (m.promise(x).complete = g.add, x.success = x.done, x.error = x.fail, d.url = ((t || d.url || Me) + "").replace(Pe, "").replace(He, Ie[1] + "//"), d.type = i.method || i.type || d.method || d.type, d.dataTypes = ut.trim(d.dataType || "*").toLowerCase().match(dt) || [""], null == d.crossDomain && (o = Re.exec(d.url.toLowerCase()), d.crossDomain = !(!o || o[1] === Ie[1] && o[2] === Ie[2] && (o[3] || ("http:" === o[1] ? "80" : "443")) === (Ie[3] || ("http:" === Ie[1] ? "80" : "443")))), d.data && d.processData && "string" != typeof d.data && (d.data = ut.param(d.data, d.traditional)), j(We, d, i, x), 2 === w) return x;
                c = d.global, c && 0 === ut.active++ && ut.event.trigger("ajaxStart"), d.type = d.type.toUpperCase(), d.hasContent = !Le.test(d.type), r = d.url, d.hasContent || (d.data && (r = d.url += ($e.test(r) ? "&" : "?") + d.data, delete d.data), d.cache === !1 && (d.url = Ne.test(r) ? r.replace(Ne, "$1_=" + je++) : r + ($e.test(r) ? "&" : "?") + "_=" + je++)), d.ifModified && (ut.lastModified[r] && x.setRequestHeader("If-Modified-Since", ut.lastModified[r]), ut.etag[r] && x.setRequestHeader("If-None-Match", ut.etag[r])), (d.data && d.hasContent && d.contentType !== !1 || i.contentType) && x.setRequestHeader("Content-Type", d.contentType), x.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + ze + "; q=0.01" : "") : d.accepts["*"]);
                for (s in d.headers) x.setRequestHeader(s, d.headers[s]);
                if (d.beforeSend && (d.beforeSend.call(p, x, d) === !1 || 2 === w)) return x.abort();
                _ = "abort";
                for (s in {
                        success: 1,
                        error: 1,
                        complete: 1
                    }) x[s](d[s]);
                if (u = j(qe, d, i, x)) {
                    x.readyState = 1, c && f.trigger("ajaxSend", [x, d]), d.async && d.timeout > 0 && (l = setTimeout(function() {
                        x.abort("timeout")
                    }, d.timeout));
                    try {
                        w = 1, u.send(y, n)
                    } catch (C) {
                        if (!(2 > w)) throw C;
                        n(-1, C)
                    }
                } else n(-1, "No Transport");
                return x
            },
            getJSON: function(t, e, i) {
                return ut.get(t, e, i, "json")
            },
            getScript: function(t, i) {
                return ut.get(t, e, i, "script")
            }
        }), ut.each(["get", "post"], function(t, i) {
            ut[i] = function(t, n, o, s) {
                return ut.isFunction(n) && (s = s || o, o = n, n = e), ut.ajax({
                    url: t,
                    type: i,
                    dataType: s,
                    data: n,
                    success: o
                })
            }
        }), ut.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /(?:java|ecma)script/
            },
            converters: {
                "text script": function(t) {
                    return ut.globalEval(t), t
                }
            }
        }), ut.ajaxPrefilter("script", function(t) {
            t.cache === e && (t.cache = !1), t.crossDomain && (t.type = "GET", t.global = !1)
        }), ut.ajaxTransport("script", function(t) {
            if (t.crossDomain) {
                var i, n = X.head || ut("head")[0] || X.documentElement;
                return {
                    send: function(e, o) {
                        i = X.createElement("script"), i.async = !0, t.scriptCharset && (i.charset = t.scriptCharset), i.src = t.url, i.onload = i.onreadystatechange = function(t, e) {
                            (e || !i.readyState || /loaded|complete/.test(i.readyState)) && (i.onload = i.onreadystatechange = null, i.parentNode && i.parentNode.removeChild(i), i = null, e || o(200, "success"))
                        }, n.insertBefore(i, n.firstChild)
                    },
                    abort: function() {
                        i && i.onload(e, !0)
                    }
                }
            }
        });
        var Ke = [],
            Ye = /(=)\?(?=&|$)|\?\?/;
        ut.ajaxSetup({
            jsonp: "callback",
            jsonpCallback: function() {
                var t = Ke.pop() || ut.expando + "_" + je++;
                return this[t] = !0, t
            }
        }), ut.ajaxPrefilter("json jsonp", function(i, n, o) {
            var s, r, a, l = i.jsonp !== !1 && (Ye.test(i.url) ? "url" : "string" == typeof i.data && !(i.contentType || "").indexOf("application/x-www-form-urlencoded") && Ye.test(i.data) && "data");
            return l || "jsonp" === i.dataTypes[0] ? (s = i.jsonpCallback = ut.isFunction(i.jsonpCallback) ? i.jsonpCallback() : i.jsonpCallback, l ? i[l] = i[l].replace(Ye, "$1" + s) : i.jsonp !== !1 && (i.url += ($e.test(i.url) ? "&" : "?") + i.jsonp + "=" + s), i.converters["script json"] = function() {
                return a || ut.error(s + " was not called"), a[0]
            }, i.dataTypes[0] = "json", r = t[s], t[s] = function() {
                a = arguments
            }, o.always(function() {
                t[s] = r, i[s] && (i.jsonpCallback = n.jsonpCallback, Ke.push(s)), a && ut.isFunction(r) && r(a[0]), a = r = e
            }), "script") : e
        });
        var Ve, Qe, Xe = 0,
            Je = t.ActiveXObject && function() {
                var t;
                for (t in Ve) Ve[t](e, !0)
            };
        ut.ajaxSettings.xhr = t.ActiveXObject ? function() {
            return !this.isLocal && O() || F()
        } : O, Qe = ut.ajaxSettings.xhr(), ut.support.cors = !!Qe && "withCredentials" in Qe, Qe = ut.support.ajax = !!Qe, Qe && ut.ajaxTransport(function(i) {
            if (!i.crossDomain || ut.support.cors) {
                var n;
                return {
                    send: function(o, s) {
                        var r, a, l = i.xhr();
                        if (i.username ? l.open(i.type, i.url, i.async, i.username, i.password) : l.open(i.type, i.url, i.async), i.xhrFields)
                            for (a in i.xhrFields) l[a] = i.xhrFields[a];
                        i.mimeType && l.overrideMimeType && l.overrideMimeType(i.mimeType), i.crossDomain || o["X-Requested-With"] || (o["X-Requested-With"] = "XMLHttpRequest");
                        try {
                            for (a in o) l.setRequestHeader(a, o[a])
                        } catch (c) {}
                        l.send(i.hasContent && i.data || null), n = function(t, o) {
                            var a, c, u, h;
                            try {
                                if (n && (o || 4 === l.readyState))
                                    if (n = e, r && (l.onreadystatechange = ut.noop, Je && delete Ve[r]), o) 4 !== l.readyState && l.abort();
                                    else {
                                        h = {}, a = l.status, c = l.getAllResponseHeaders(), "string" == typeof l.responseText && (h.text = l.responseText);
                                        try {
                                            u = l.statusText
                                        } catch (d) {
                                            u = ""
                                        }
                                        a || !i.isLocal || i.crossDomain ? 1223 === a && (a = 204) : a = h.text ? 200 : 404
                                    }
                            } catch (p) {
                                o || s(-1, p)
                            }
                            h && s(a, u, h, c)
                        }, i.async ? 4 === l.readyState ? setTimeout(n) : (r = ++Xe, Je && (Ve || (Ve = {}, ut(t).unload(Je)), Ve[r] = n), l.onreadystatechange = n) : n()
                    },
                    abort: function() {
                        n && n(e, !0)
                    }
                }
            }
        });
        var Ge, Ze, ti = /^(?:toggle|show|hide)$/,
            ei = RegExp("^(?:([+-])=|)(" + ht + ")([a-z%]*)$", "i"),
            ii = /queueHooks$/,
            ni = [W],
            oi = {
                "*": [function(t, e) {
                    var i = this.createTween(t, e),
                        n = i.cur(),
                        o = ei.exec(e),
                        s = o && o[3] || (ut.cssNumber[t] ? "" : "px"),
                        r = (ut.cssNumber[t] || "px" !== s && +n) && ei.exec(ut.css(i.elem, t)),
                        a = 1,
                        l = 20;
                    if (r && r[3] !== s) {
                        s = s || r[3], o = o || [], r = +n || 1;
                        do a = a || ".5", r /= a, ut.style(i.elem, t, r + s); while (a !== (a = i.cur() / n) && 1 !== a && --l)
                    }
                    return o && (r = i.start = +r || +n || 0, i.unit = s, i.end = o[1] ? r + (o[1] + 1) * o[2] : +o[2]), i
                }]
            };
        ut.Animation = ut.extend(R, {
            tweener: function(t, e) {
                ut.isFunction(t) ? (e = t, t = ["*"]) : t = t.split(" ");
                for (var i, n = 0, o = t.length; o > n; n++) i = t[n], oi[i] = oi[i] || [], oi[i].unshift(e)
            },
            prefilter: function(t, e) {
                e ? ni.unshift(t) : ni.push(t)
            }
        }), ut.Tween = q, q.prototype = {
            constructor: q,
            init: function(t, e, i, n, o, s) {
                this.elem = t, this.prop = i, this.easing = o || "swing", this.options = e, this.start = this.now = this.cur(), this.end = n, this.unit = s || (ut.cssNumber[i] ? "" : "px")
            },
            cur: function() {
                var t = q.propHooks[this.prop];
                return t && t.get ? t.get(this) : q.propHooks._default.get(this)
            },
            run: function(t) {
                var e, i = q.propHooks[this.prop];
                return this.pos = e = this.options.duration ? ut.easing[this.easing](t, this.options.duration * t, 0, 1, this.options.duration) : t, this.now = (this.end - this.start) * e + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), i && i.set ? i.set(this) : q.propHooks._default.set(this), this
            }
        }, q.prototype.init.prototype = q.prototype, q.propHooks = {
            _default: {
                get: function(t) {
                    var e;
                    return null == t.elem[t.prop] || t.elem.style && null != t.elem.style[t.prop] ? (e = ut.css(t.elem, t.prop, ""), e && "auto" !== e ? e : 0) : t.elem[t.prop]
                },
                set: function(t) {
                    ut.fx.step[t.prop] ? ut.fx.step[t.prop](t) : t.elem.style && (null != t.elem.style[ut.cssProps[t.prop]] || ut.cssHooks[t.prop]) ? ut.style(t.elem, t.prop, t.now + t.unit) : t.elem[t.prop] = t.now
                }
            }
        }, q.propHooks.scrollTop = q.propHooks.scrollLeft = {
            set: function(t) {
                t.elem.nodeType && t.elem.parentNode && (t.elem[t.prop] = t.now)
            }
        }, ut.each(["toggle", "show", "hide"], function(t, e) {
            var i = ut.fn[e];
            ut.fn[e] = function(t, n, o) {
                return null == t || "boolean" == typeof t ? i.apply(this, arguments) : this.animate(z(e, !0), t, n, o)
            }
        }), ut.fn.extend({
            fadeTo: function(t, e, i, n) {
                return this.filter(C).css("opacity", 0).show().end().animate({
                    opacity: e
                }, t, i, n)
            },
            animate: function(t, e, i, n) {
                var o = ut.isEmptyObject(t),
                    s = ut.speed(e, i, n),
                    r = function() {
                        var e = R(this, ut.extend({}, t), s);
                        (o || ut._data(this, "finish")) && e.stop(!0)
                    };
                return r.finish = r, o || s.queue === !1 ? this.each(r) : this.queue(s.queue, r)
            },
            stop: function(t, i, n) {
                var o = function(t) {
                    var e = t.stop;
                    delete t.stop, e(n)
                };
                return "string" != typeof t && (n = i, i = t, t = e), i && t !== !1 && this.queue(t || "fx", []), this.each(function() {
                    var e = !0,
                        i = null != t && t + "queueHooks",
                        s = ut.timers,
                        r = ut._data(this);
                    if (i) r[i] && r[i].stop && o(r[i]);
                    else
                        for (i in r) r[i] && r[i].stop && ii.test(i) && o(r[i]);
                    for (i = s.length; i--;) s[i].elem !== this || null != t && s[i].queue !== t || (s[i].anim.stop(n), e = !1, s.splice(i, 1));
                    (e || !n) && ut.dequeue(this, t)
                })
            },
            finish: function(t) {
                return t !== !1 && (t = t || "fx"), this.each(function() {
                    var e, i = ut._data(this),
                        n = i[t + "queue"],
                        o = i[t + "queueHooks"],
                        s = ut.timers,
                        r = n ? n.length : 0;
                    for (i.finish = !0, ut.queue(this, t, []), o && o.stop && o.stop.call(this, !0), e = s.length; e--;) s[e].elem === this && s[e].queue === t && (s[e].anim.stop(!0), s.splice(e, 1));
                    for (e = 0; r > e; e++) n[e] && n[e].finish && n[e].finish.call(this);
                    delete i.finish
                })
            }
        }), ut.each({
            slideDown: z("show"),
            slideUp: z("hide"),
            slideToggle: z("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, function(t, e) {
            ut.fn[t] = function(t, i, n) {
                return this.animate(e, t, i, n)
            }
        }), ut.speed = function(t, e, i) {
            var n = t && "object" == typeof t ? ut.extend({}, t) : {
                complete: i || !i && e || ut.isFunction(t) && t,
                duration: t,
                easing: i && e || e && !ut.isFunction(e) && e
            };
            return n.duration = ut.fx.off ? 0 : "number" == typeof n.duration ? n.duration : n.duration in ut.fx.speeds ? ut.fx.speeds[n.duration] : ut.fx.speeds._default, (null == n.queue || n.queue === !0) && (n.queue = "fx"), n.old = n.complete, n.complete = function() {
                ut.isFunction(n.old) && n.old.call(this), n.queue && ut.dequeue(this, n.queue)
            }, n
        }, ut.easing = {
            linear: function(t) {
                return t
            },
            swing: function(t) {
                return .5 - Math.cos(t * Math.PI) / 2
            }
        }, ut.timers = [], ut.fx = q.prototype.init, ut.fx.tick = function() {
            var t, i = ut.timers,
                n = 0;
            for (Ge = ut.now(); i.length > n; n++) t = i[n], t() || i[n] !== t || i.splice(n--, 1);
            i.length || ut.fx.stop(), Ge = e
        }, ut.fx.timer = function(t) {
            t() && ut.timers.push(t) && ut.fx.start()
        }, ut.fx.interval = 13, ut.fx.start = function() {
            Ze || (Ze = setInterval(ut.fx.tick, ut.fx.interval))
        }, ut.fx.stop = function() {
            clearInterval(Ze), Ze = null
        }, ut.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        }, ut.fx.step = {}, ut.expr && ut.expr.filters && (ut.expr.filters.animated = function(t) {
            return ut.grep(ut.timers, function(e) {
                return t === e.elem
            }).length
        }), ut.fn.offset = function(t) {
            if (arguments.length) return t === e ? this : this.each(function(e) {
                ut.offset.setOffset(this, t, e)
            });
            var i, n, o = {
                    top: 0,
                    left: 0
                },
                s = this[0],
                r = s && s.ownerDocument;
            return r ? (i = r.documentElement, ut.contains(i, s) ? (typeof s.getBoundingClientRect !== V && (o = s.getBoundingClientRect()), n = U(r), {
                top: o.top + (n.pageYOffset || i.scrollTop) - (i.clientTop || 0),
                left: o.left + (n.pageXOffset || i.scrollLeft) - (i.clientLeft || 0)
            }) : o) : void 0
        }, ut.offset = {
            setOffset: function(t, e, i) {
                var n = ut.css(t, "position");
                "static" === n && (t.style.position = "relative");
                var o, s, r = ut(t),
                    a = r.offset(),
                    l = ut.css(t, "top"),
                    c = ut.css(t, "left"),
                    u = ("absolute" === n || "fixed" === n) && ut.inArray("auto", [l, c]) > -1,
                    h = {},
                    d = {};
                u ? (d = r.position(), o = d.top, s = d.left) : (o = parseFloat(l) || 0, s = parseFloat(c) || 0), ut.isFunction(e) && (e = e.call(t, i, a)), null != e.top && (h.top = e.top - a.top + o), null != e.left && (h.left = e.left - a.left + s), "using" in e ? e.using.call(t, h) : r.css(h)
            }
        }, ut.fn.extend({
            position: function() {
                if (this[0]) {
                    var t, e, i = {
                            top: 0,
                            left: 0
                        },
                        n = this[0];
                    return "fixed" === ut.css(n, "position") ? e = n.getBoundingClientRect() : (t = this.offsetParent(), e = this.offset(), ut.nodeName(t[0], "html") || (i = t.offset()), i.top += ut.css(t[0], "borderTopWidth", !0), i.left += ut.css(t[0], "borderLeftWidth", !0)), {
                        top: e.top - i.top - ut.css(n, "marginTop", !0),
                        left: e.left - i.left - ut.css(n, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function() {
                return this.map(function() {
                    for (var t = this.offsetParent || J; t && !ut.nodeName(t, "html") && "static" === ut.css(t, "position");) t = t.offsetParent;
                    return t || J
                })
            }
        }), ut.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, function(t, i) {
            var n = /Y/.test(i);
            ut.fn[t] = function(o) {
                return ut.access(this, function(t, o, s) {
                    var r = U(t);
                    return s === e ? r ? i in r ? r[i] : r.document.documentElement[o] : t[o] : (r ? r.scrollTo(n ? ut(r).scrollLeft() : s, n ? s : ut(r).scrollTop()) : t[o] = s, e)
                }, t, o, arguments.length, null)
            }
        }), ut.each({
            Height: "height",
            Width: "width"
        }, function(t, i) {
            ut.each({
                padding: "inner" + t,
                content: i,
                "": "outer" + t
            }, function(n, o) {
                ut.fn[o] = function(o, s) {
                    var r = arguments.length && (n || "boolean" != typeof o),
                        a = n || (o === !0 || s === !0 ? "margin" : "border");
                    return ut.access(this, function(i, n, o) {
                        var s;
                        return ut.isWindow(i) ? i.document.documentElement["client" + t] : 9 === i.nodeType ? (s = i.documentElement, Math.max(i.body["scroll" + t], s["scroll" + t], i.body["offset" + t], s["offset" + t], s["client" + t])) : o === e ? ut.css(i, n, a) : ut.style(i, n, o, a)
                    }, i, r ? o : e, r, null)
                }
            })
        }), ut.fn.size = function() {
            return this.length
        }, ut.fn.andSelf = ut.fn.addBack, "object" == typeof module && module && "object" == typeof module.exports ? module.exports = ut : (t.jQuery = t.$ = ut, "function" == typeof define && define.amd && define("jquery", [], function() {
            return ut
        }))
    }(window), "undefined" == typeof jQuery) throw new Error("Bootstrap requires jQuery"); + function(t) {
    "use strict";

    function e() {
        var t = document.createElement("bootstrap"),
            e = {
                WebkitTransition: "webkitTransitionEnd",
                MozTransition: "transitionend",
                OTransition: "oTransitionEnd otransitionend",
                transition: "transitionend"
            };
        for (var i in e)
            if (void 0 !== t.style[i]) return {
                end: e[i]
            }
    }
    t.fn.emulateTransitionEnd = function(e) {
        var i = !1,
            n = this;
        t(this).one(t.support.transition.end, function() {
            i = !0
        });
        var o = function() {
            i || t(n).trigger(t.support.transition.end)
        };
        return setTimeout(o, e), this
    }, t(function() {
        t.support.transition = e()
    })
}(window.jQuery), + function(t) {
    "use strict";
    var e = '[data-dismiss="alert"]',
        i = function(i) {
            t(i).on("click", e, this.close)
        };
    i.prototype.close = function(e) {
        function i() {
            s.trigger("closed.bs.alert").remove()
        }
        var n = t(this),
            o = n.attr("data-target");
        o || (o = n.attr("href"), o = o && o.replace(/.*(?=#[^\s]*$)/, ""));
        var s = t(o);
        e && e.preventDefault(), s.length || (s = n.hasClass("alert") ? n : n.parent()), s.trigger(e = t.Event("close.bs.alert")), e.isDefaultPrevented() || (s.removeClass("in"), t.support.transition && s.hasClass("fade") ? s.one(t.support.transition.end, i).emulateTransitionEnd(150) : i())
    };
    var n = t.fn.alert;
    t.fn.alert = function(e) {
        return this.each(function() {
            var n = t(this),
                o = n.data("bs.alert");
            o || n.data("bs.alert", o = new i(this)), "string" == typeof e && o[e].call(n)
        })
    }, t.fn.alert.Constructor = i, t.fn.alert.noConflict = function() {
        return t.fn.alert = n, this
    }, t(document).on("click.bs.alert.data-api", e, i.prototype.close)
}(window.jQuery), + function(t) {
    "use strict";
    var e = function(i, n) {
        this.$element = t(i), this.options = t.extend({}, e.DEFAULTS, n)
    };
    e.DEFAULTS = {
        loadingText: "loading..."
    }, e.prototype.setState = function(t) {
        var e = "disabled",
            i = this.$element,
            n = i.is("input") ? "val" : "html",
            o = i.data();
        t += "Text", o.resetText || i.data("resetText", i[n]()), i[n](o[t] || this.options[t]), setTimeout(function() {
            "loadingText" == t ? i.addClass(e).attr(e, e) : i.removeClass(e).removeAttr(e)
        }, 0)
    }, e.prototype.toggle = function() {
        var t = this.$element.closest('[data-toggle="buttons"]');
        if (t.length) {
            var e = this.$element.find("input").prop("checked", !this.$element.hasClass("active")).trigger("change");
            "radio" === e.prop("type") && t.find(".active").removeClass("active")
        }
        this.$element.toggleClass("active")
    };
    var i = t.fn.button;
    t.fn.button = function(i) {
        return this.each(function() {
            var n = t(this),
                o = n.data("bs.button"),
                s = "object" == typeof i && i;
            o || n.data("bs.button", o = new e(this, s)), "toggle" == i ? o.toggle() : i && o.setState(i)
        })
    }, t.fn.button.Constructor = e, t.fn.button.noConflict = function() {
        return t.fn.button = i, this
    }, t(document).on("click.bs.button.data-api", "[data-toggle^=button]", function(e) {
        var i = t(e.target);
        i.hasClass("btn") || (i = i.closest(".btn")), i.button("toggle"), e.preventDefault()
    })
}(window.jQuery), + function(t) {
    "use strict";
    var e = function(e, i) {
        this.$element = t(e), this.$indicators = this.$element.find(".carousel-indicators"), this.options = i, this.paused = this.sliding = this.interval = this.$active = this.$items = null, "hover" == this.options.pause && this.$element.on("mouseenter", t.proxy(this.pause, this)).on("mouseleave", t.proxy(this.cycle, this))
    };
    e.DEFAULTS = {
        interval: 5e3,
        pause: "hover",
        wrap: !0
    }, e.prototype.cycle = function(e) {
        return e || (this.paused = !1), this.interval && clearInterval(this.interval), this.options.interval && !this.paused && (this.interval = setInterval(t.proxy(this.next, this), this.options.interval)), this
    }, e.prototype.getActiveIndex = function() {
        return this.$active = this.$element.find(".item.active"), this.$items = this.$active.parent().children(), this.$items.index(this.$active)
    }, e.prototype.to = function(e) {
        var i = this,
            n = this.getActiveIndex();
        return e > this.$items.length - 1 || 0 > e ? void 0 : this.sliding ? this.$element.one("slid", function() {
            i.to(e)
        }) : n == e ? this.pause().cycle() : this.slide(e > n ? "next" : "prev", t(this.$items[e]))
    }, e.prototype.pause = function(e) {
        return e || (this.paused = !0), this.$element.find(".next, .prev").length && t.support.transition.end && (this.$element.trigger(t.support.transition.end), this.cycle(!0)), this.interval = clearInterval(this.interval), this
    }, e.prototype.next = function() {
        return this.sliding ? void 0 : this.slide("next")
    }, e.prototype.prev = function() {
        return this.sliding ? void 0 : this.slide("prev")
    }, e.prototype.slide = function(e, i) {
        var n = this.$element.find(".item.active"),
            o = i || n[e](),
            s = this.interval,
            r = "next" == e ? "left" : "right",
            a = "next" == e ? "first" : "last",
            l = this;
        if (!o.length) {
            if (!this.options.wrap) return;
            o = this.$element.find(".item")[a]()
        }
        this.sliding = !0, s && this.pause();
        var c = t.Event("slide.bs.carousel", {
            relatedTarget: o[0],
            direction: r
        });
        if (!o.hasClass("active")) {
            if (this.$indicators.length && (this.$indicators.find(".active").removeClass("active"), this.$element.one("slid", function() {
                    var e = t(l.$indicators.children()[l.getActiveIndex()]);
                    e && e.addClass("active")
                })), t.support.transition && this.$element.hasClass("slide")) {
                if (this.$element.trigger(c), c.isDefaultPrevented()) return;
                o.addClass(e), o[0].offsetWidth, n.addClass(r), o.addClass(r), n.one(t.support.transition.end, function() {
                    o.removeClass([e, r].join(" ")).addClass("active"), n.removeClass(["active", r].join(" ")), l.sliding = !1, setTimeout(function() {
                        l.$element.trigger("slid")
                    }, 0)
                }).emulateTransitionEnd(600)
            } else {
                if (this.$element.trigger(c), c.isDefaultPrevented()) return;
                n.removeClass("active"), o.addClass("active"), this.sliding = !1, this.$element.trigger("slid")
            }
            return s && this.cycle(), this
        }
    };
    var i = t.fn.carousel;
    t.fn.carousel = function(i) {
        return this.each(function() {
            var n = t(this),
                o = n.data("bs.carousel"),
                s = t.extend({}, e.DEFAULTS, n.data(), "object" == typeof i && i),
                r = "string" == typeof i ? i : s.slide;
            o || n.data("bs.carousel", o = new e(this, s)), "number" == typeof i ? o.to(i) : r ? o[r]() : s.interval && o.pause().cycle()
        })
    }, t.fn.carousel.Constructor = e, t.fn.carousel.noConflict = function() {
        return t.fn.carousel = i, this
    }, t(document).on("click.bs.carousel.data-api", "[data-slide], [data-slide-to]", function(e) {
        var i, n = t(this),
            o = t(n.attr("data-target") || (i = n.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, "")),
            s = t.extend({}, o.data(), n.data()),
            r = n.attr("data-slide-to");
        r && (s.interval = !1), o.carousel(s), (r = n.attr("data-slide-to")) && o.data("bs.carousel").to(r), e.preventDefault()
    }), t(window).on("load", function() {
        t('[data-ride="carousel"]').each(function() {
            var e = t(this);
            e.carousel(e.data())
        })
    })
}(window.jQuery), + function(t) {
    "use strict";
    var e = function(i, n) {
        this.$element = t(i), this.options = t.extend({}, e.DEFAULTS, n), this.transitioning = null, this.options.parent && (this.$parent = t(this.options.parent)), this.options.toggle && this.toggle()
    };
    e.DEFAULTS = {
        toggle: !0
    }, e.prototype.dimension = function() {
        var t = this.$element.hasClass("width");
        return t ? "width" : "height"
    }, e.prototype.show = function() {
        if (!this.transitioning && !this.$element.hasClass("in")) {
            var e = t.Event("show.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.$parent && this.$parent.find("> .panel > .in");
                if (i && i.length) {
                    var n = i.data("bs.collapse");
                    if (n && n.transitioning) return;
                    i.collapse("hide"), n || i.data("bs.collapse", null)
                }
                var o = this.dimension();
                this.$element.removeClass("collapse").addClass("collapsing")[o](0), this.transitioning = 1;
                var s = function() {
                    this.$element.removeClass("collapsing").addClass("in")[o]("auto"), this.transitioning = 0, this.$element.trigger("shown.bs.collapse")
                };
                if (!t.support.transition) return s.call(this);
                var r = t.camelCase(["scroll", o].join("-"));
                this.$element.one(t.support.transition.end, t.proxy(s, this)).emulateTransitionEnd(350)[o](this.$element[0][r])
            }
        }
    }, e.prototype.hide = function() {
        if (!this.transitioning && this.$element.hasClass("in")) {
            var e = t.Event("hide.bs.collapse");
            if (this.$element.trigger(e), !e.isDefaultPrevented()) {
                var i = this.dimension();
                this.$element[i](this.$element[i]())[0].offsetHeight, this.$element.addClass("collapsing").removeClass("collapse").removeClass("in"), this.transitioning = 1;
                var n = function() {
                    this.transitioning = 0, this.$element.trigger("hidden.bs.collapse").removeClass("collapsing").addClass("collapse")
                };
                return t.support.transition ? void this.$element[i](0).one(t.support.transition.end, t.proxy(n, this)).emulateTransitionEnd(350) : n.call(this)
            }
        }
    }, e.prototype.toggle = function() {
        this[this.$element.hasClass("in") ? "hide" : "show"]()
    };
    var i = t.fn.collapse;
    t.fn.collapse = function(i) {
        return this.each(function() {
            var n = t(this),
                o = n.data("bs.collapse"),
                s = t.extend({}, e.DEFAULTS, n.data(), "object" == typeof i && i);
            o || n.data("bs.collapse", o = new e(this, s)), "string" == typeof i && o[i]()
        })
    }, t.fn.collapse.Constructor = e, t.fn.collapse.noConflict = function() {
        return t.fn.collapse = i, this
    }, t(document).on("click.bs.collapse.data-api", "[data-toggle=collapse]", function(e) {
        var i, n = t(this),
            o = n.attr("data-target") || e.preventDefault() || (i = n.attr("href")) && i.replace(/.*(?=#[^\s]+$)/, ""),
            s = t(o),
            r = s.data("bs.collapse"),
            a = r ? "toggle" : n.data(),
            l = n.attr("data-parent"),
            c = l && t(l);
        r && r.transitioning || (c && c.find('[data-toggle=collapse][data-parent="' + l + '"]').not(n).addClass("collapsed"), n[s.hasClass("in") ? "addClass" : "removeClass"]("collapsed")), s.collapse(a)
    })
}(window.jQuery), + function(t) {
    "use strict";

    function e() {
        t(n).remove(), t(o).each(function(e) {
            var n = i(t(this));
            n.hasClass("open") && (n.trigger(e = t.Event("hide.bs.dropdown")), e.isDefaultPrevented() || n.removeClass("open").trigger("hidden.bs.dropdown"))
        })
    }

    function i(e) {
        var i = e.attr("data-target");
        i || (i = e.attr("href"), i = i && /#/.test(i) && i.replace(/.*(?=#[^\s]*$)/, ""));
        var n = i && t(i);
        return n && n.length ? n : e.parent()
    }
    var n = ".dropdown-backdrop",
        o = "[data-toggle=dropdown]",
        s = function(e) {
            t(e).on("click.bs.dropdown", this.toggle)
        };
    s.prototype.toggle = function(n) {
        var o = t(this);
        if (!o.is(".disabled, :disabled")) {
            var s = i(o),
                r = s.hasClass("open");
            if (e(), !r) {
                if ("ontouchstart" in document.documentElement && !s.closest(".navbar-nav").length && t('<div class="dropdown-backdrop"/>').insertAfter(t(this)).on("click", e), s.trigger(n = t.Event("show.bs.dropdown")), n.isDefaultPrevented()) return;
                s.toggleClass("open").trigger("shown.bs.dropdown"), o.focus()
            }
            return !1
        }
    }, s.prototype.keydown = function(e) {
        if (/(38|40|27)/.test(e.keyCode)) {
            var n = t(this);
            if (e.preventDefault(), e.stopPropagation(), !n.is(".disabled, :disabled")) {
                var s = i(n),
                    r = s.hasClass("open");
                if (!r || r && 27 == e.keyCode) return 27 == e.which && s.find(o).focus(), n.click();
                var a = t("[role=menu] li:not(.divider):visible a", s);
                if (a.length) {
                    var l = a.index(a.filter(":focus"));
                    38 == e.keyCode && l > 0 && l--, 40 == e.keyCode && l < a.length - 1 && l++, ~l || (l = 0), a.eq(l).focus()
                }
            }
        }
    };
    var r = t.fn.dropdown;
    t.fn.dropdown = function(e) {
        return this.each(function() {
            var i = t(this),
                n = i.data("dropdown");
            n || i.data("dropdown", n = new s(this)), "string" == typeof e && n[e].call(i)
        })
    }, t.fn.dropdown.Constructor = s, t.fn.dropdown.noConflict = function() {
        return t.fn.dropdown = r, this
    }, t(document).on("click.bs.dropdown.data-api", e).on("click.bs.dropdown.data-api", ".dropdown form", function(t) {
        t.stopPropagation()
    }).on("click.bs.dropdown.data-api", o, s.prototype.toggle).on("keydown.bs.dropdown.data-api", o + ", [role=menu]", s.prototype.keydown)
}(window.jQuery), + function(t) {
    "use strict";
    var e = function(e, i) {
        this.options = i, this.$element = t(e), this.$backdrop = this.isShown = null, this.options.remote && this.$element.load(this.options.remote)
    };
    e.DEFAULTS = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, e.prototype.toggle = function(t) {
        return this[this.isShown ? "hide" : "show"](t)
    }, e.prototype.show = function(e) {
        var i = this,
            n = t.Event("show.bs.modal", {
                relatedTarget: e
            });
        this.$element.trigger(n), this.isShown || n.isDefaultPrevented() || (this.isShown = !0, this.escape(), this.$element.on("click.dismiss.modal", '[data-dismiss="modal"]', t.proxy(this.hide, this)), this.backdrop(function() {
            var n = t.support.transition && i.$element.hasClass("fade");
            i.$element.parent().length || i.$element.appendTo(document.body), i.$element.show(), n && i.$element[0].offsetWidth, i.$element.addClass("in").attr("aria-hidden", !1), i.enforceFocus();
            var o = t.Event("shown.bs.modal", {
                relatedTarget: e
            });
            n ? i.$element.find(".modal-dialog").one(t.support.transition.end, function() {
                i.$element.focus().trigger(o)
            }).emulateTransitionEnd(300) : i.$element.focus().trigger(o)
        }))
    }, e.prototype.hide = function(e) {
        e && e.preventDefault(), e = t.Event("hide.bs.modal"), this.$element.trigger(e), this.isShown && !e.isDefaultPrevented() && (this.isShown = !1, this.escape(), t(document).off("focusin.bs.modal"), this.$element.removeClass("in").attr("aria-hidden", !0).off("click.dismiss.modal"), t.support.transition && this.$element.hasClass("fade") ? this.$element.one(t.support.transition.end, t.proxy(this.hideModal, this)).emulateTransitionEnd(300) : this.hideModal())
    }, e.prototype.enforceFocus = function() {
        t(document).off("focusin.bs.modal").on("focusin.bs.modal", t.proxy(function(t) {
            this.$element[0] === t.target || this.$element.has(t.target).length || this.$element.focus()
        }, this))
    }, e.prototype.escape = function() {
        this.isShown && this.options.keyboard ? this.$element.on("keyup.dismiss.bs.modal", t.proxy(function(t) {
            27 == t.which && this.hide()
        }, this)) : this.isShown || this.$element.off("keyup.dismiss.bs.modal")
    }, e.prototype.hideModal = function() {
        var t = this;
        this.$element.hide(), this.backdrop(function() {
            t.removeBackdrop(), t.$element.trigger("hidden.bs.modal")
        })
    }, e.prototype.removeBackdrop = function() {
        this.$backdrop && this.$backdrop.remove(), this.$backdrop = null
    }, e.prototype.backdrop = function(e) {
        var i = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var n = t.support.transition && i;
            if (this.$backdrop = t('<div class="modal-backdrop ' + i + '" />').appendTo(document.body), this.$element.on("click.dismiss.modal", t.proxy(function(t) {
                    t.target === t.currentTarget && ("static" == this.options.backdrop ? this.$element[0].focus.call(this.$element[0]) : this.hide.call(this))
                }, this)), n && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), !e) return;
            n ? this.$backdrop.one(t.support.transition.end, e).emulateTransitionEnd(150) : e()
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), t.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(t.support.transition.end, e).emulateTransitionEnd(150) : e()) : e && e()
    };
    var i = t.fn.modal;
    t.fn.modal = function(i, n) {
        return this.each(function() {
            var o = t(this),
                s = o.data("bs.modal"),
                r = t.extend({}, e.DEFAULTS, o.data(), "object" == typeof i && i);
            s || o.data("bs.modal", s = new e(this, r)), "string" == typeof i ? s[i](n) : r.show && s.show(n)
        })
    }, t.fn.modal.Constructor = e, t.fn.modal.noConflict = function() {
        return t.fn.modal = i, this
    }, t(document).on("click.bs.modal.data-api", '[data-toggle="modal"]', function(e) {
        var i = t(this),
            n = i.attr("href"),
            o = t(i.attr("data-target") || n && n.replace(/.*(?=#[^\s]+$)/, "")),
            s = o.data("modal") ? "toggle" : t.extend({
                remote: !/#/.test(n) && n
            }, o.data(), i.data());
        e.preventDefault(), o.modal(s, this).one("hide", function() {
            i.is(":visible") && i.focus()
        })
    }), t(document).on("show.bs.modal", ".modal", function() {
        t(document.body).addClass("modal-open")
    }).on("hidden.bs.modal", ".modal", function() {
        t(document.body).removeClass("modal-open")
    })
}(window.jQuery), + function(t) {
    "use strict";
    var e = function(t, e) {
        this.type = this.options = this.enabled = this.timeout = this.hoverState = this.$element = null, this.init("tooltip", t, e)
    };
    e.DEFAULTS = {
        animation: !0,
        placement: "top",
        selector: !1,
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
        trigger: "hover focus",
        title: "",
        delay: 0,
        html: !1,
        container: !1
    }, e.prototype.init = function(e, i, n) {
        this.enabled = !0, this.type = e, this.$element = t(i), this.options = this.getOptions(n);
        for (var o = this.options.trigger.split(" "), s = o.length; s--;) {
            var r = o[s];
            if ("click" == r) this.$element.on("click." + this.type, this.options.selector, t.proxy(this.toggle, this));
            else if ("manual" != r) {
                var a = "hover" == r ? "mouseenter" : "focus",
                    l = "hover" == r ? "mouseleave" : "blur";
                this.$element.on(a + "." + this.type, this.options.selector, t.proxy(this.enter, this)), this.$element.on(l + "." + this.type, this.options.selector, t.proxy(this.leave, this))
            }
        }
        this.options.selector ? this._options = t.extend({}, this.options, {
            trigger: "manual",
            selector: ""
        }) : this.fixTitle()
    }, e.prototype.getDefaults = function() {
        return e.DEFAULTS
    }, e.prototype.getOptions = function(e) {
        return e = t.extend({}, this.getDefaults(), this.$element.data(), e), e.delay && "number" == typeof e.delay && (e.delay = {
            show: e.delay,
            hide: e.delay
        }), e
    }, e.prototype.getDelegateOptions = function() {
        var e = {},
            i = this.getDefaults();
        return this._options && t.each(this._options, function(t, n) {
            i[t] != n && (e[t] = n)
        }), e
    }, e.prototype.enter = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(i.timeout), i.hoverState = "in", i.options.delay && i.options.delay.show ? void(i.timeout = setTimeout(function() {
            "in" == i.hoverState && i.show()
        }, i.options.delay.show)) : i.show()
    }, e.prototype.leave = function(e) {
        var i = e instanceof this.constructor ? e : t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type);
        return clearTimeout(i.timeout), i.hoverState = "out", i.options.delay && i.options.delay.hide ? void(i.timeout = setTimeout(function() {
            "out" == i.hoverState && i.hide()
        }, i.options.delay.hide)) : i.hide()
    }, e.prototype.show = function() {
        var e = t.Event("show.bs." + this.type);
        if (this.hasContent() && this.enabled) {
            if (this.$element.trigger(e), e.isDefaultPrevented()) return;
            var i = this.tip();
            this.setContent(), this.options.animation && i.addClass("fade");
            var n = "function" == typeof this.options.placement ? this.options.placement.call(this, i[0], this.$element[0]) : this.options.placement,
                o = /\s?auto?\s?/i,
                s = o.test(n);
            s && (n = n.replace(o, "") || "top"), i.detach().css({
                top: 0,
                left: 0,
                display: "block"
            }).addClass(n), this.options.container ? i.appendTo(this.options.container) : i.insertAfter(this.$element);
            var r = this.getPosition(),
                a = i[0].offsetWidth,
                l = i[0].offsetHeight;
            if (s) {
                var c = this.$element.parent(),
                    u = n,
                    h = document.documentElement.scrollTop || document.body.scrollTop,
                    d = "body" == this.options.container ? window.innerWidth : c.outerWidth(),
                    p = "body" == this.options.container ? window.innerHeight : c.outerHeight(),
                    f = "body" == this.options.container ? 0 : c.offset().left;
                n = "bottom" == n && r.top + r.height + l - h > p ? "top" : "top" == n && r.top - h - l < 0 ? "bottom" : "right" == n && r.right + a > d ? "left" : "left" == n && r.left - a < f ? "right" : n, i.removeClass(u).addClass(n)
            }
            var m = this.getCalculatedOffset(n, r, a, l);
            this.applyPlacement(m, n), this.$element.trigger("shown.bs." + this.type)
        }
    }, e.prototype.applyPlacement = function(t, e) {
        var i, n = this.tip(),
            o = n[0].offsetWidth,
            s = n[0].offsetHeight,
            r = parseInt(n.css("margin-top"), 10),
            a = parseInt(n.css("margin-left"), 10);
        isNaN(r) && (r = 0), isNaN(a) && (a = 0), t.top = t.top + r, t.left = t.left + a, n.offset(t).addClass("in");
        var l = n[0].offsetWidth,
            c = n[0].offsetHeight;
        if ("top" == e && c != s && (i = !0, t.top = t.top + s - c), /bottom|top/.test(e)) {
            var u = 0;
            t.left < 0 && (u = -2 * t.left, t.left = 0, n.offset(t), l = n[0].offsetWidth, c = n[0].offsetHeight), this.replaceArrow(u - o + l, l, "left")
        } else this.replaceArrow(c - s, c, "top");
        i && n.offset(t)
    }, e.prototype.replaceArrow = function(t, e, i) {
        this.arrow().css(i, t ? 50 * (1 - t / e) + "%" : "")
    }, e.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle();
        t.find(".tooltip-inner")[this.options.html ? "html" : "text"](e), t.removeClass("fade in top bottom left right")
    }, e.prototype.hide = function() {
        function e() {
            "in" != i.hoverState && n.detach()
        }
        var i = this,
            n = this.tip(),
            o = t.Event("hide.bs." + this.type);
        return this.$element.trigger(o), o.isDefaultPrevented() ? void 0 : (n.removeClass("in"), t.support.transition && this.$tip.hasClass("fade") ? n.one(t.support.transition.end, e).emulateTransitionEnd(150) : e(), this.$element.trigger("hidden.bs." + this.type), this)
    }, e.prototype.fixTitle = function() {
        var t = this.$element;
        (t.attr("title") || "string" != typeof t.attr("data-original-title")) && t.attr("data-original-title", t.attr("title") || "").attr("title", "")
    }, e.prototype.hasContent = function() {
        return this.getTitle()
    }, e.prototype.getPosition = function() {
        var e = this.$element[0];
        return t.extend({}, "function" == typeof e.getBoundingClientRect ? e.getBoundingClientRect() : {
            width: e.offsetWidth,
            height: e.offsetHeight
        }, this.$element.offset())
    }, e.prototype.getCalculatedOffset = function(t, e, i, n) {
        return "bottom" == t ? {
            top: e.top + e.height,
            left: e.left + e.width / 2 - i / 2
        } : "top" == t ? {
            top: e.top - n,
            left: e.left + e.width / 2 - i / 2
        } : "left" == t ? {
            top: e.top + e.height / 2 - n / 2,
            left: e.left - i
        } : {
            top: e.top + e.height / 2 - n / 2,
            left: e.left + e.width
        }
    }, e.prototype.getTitle = function() {
        var t, e = this.$element,
            i = this.options;
        return t = e.attr("data-original-title") || ("function" == typeof i.title ? i.title.call(e[0]) : i.title)
    }, e.prototype.tip = function() {
        return this.$tip = this.$tip || t(this.options.template)
    }, e.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".tooltip-arrow")
    }, e.prototype.validate = function() {
        this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null)
    }, e.prototype.enable = function() {
        this.enabled = !0
    }, e.prototype.disable = function() {
        this.enabled = !1
    }, e.prototype.toggleEnabled = function() {
        this.enabled = !this.enabled
    }, e.prototype.toggle = function(e) {
        var i = e ? t(e.currentTarget)[this.type](this.getDelegateOptions()).data("bs." + this.type) : this;
        i.tip().hasClass("in") ? i.leave(i) : i.enter(i)
    }, e.prototype.destroy = function() {
        this.hide().$element.off("." + this.type).removeData("bs." + this.type)
    };
    var i = t.fn.tooltip;
    t.fn.tooltip = function(i) {
        return this.each(function() {
            var n = t(this),
                o = n.data("bs.tooltip"),
                s = "object" == typeof i && i;
            o || n.data("bs.tooltip", o = new e(this, s)), "string" == typeof i && o[i]()
        })
    }, t.fn.tooltip.Constructor = e, t.fn.tooltip.noConflict = function() {
        return t.fn.tooltip = i, this
    }
}(window.jQuery), + function(t) {
    "use strict";
    var e = function(t, e) {
        this.init("popover", t, e)
    };
    if (!t.fn.tooltip) throw new Error("Popover requires tooltip.js");
    e.DEFAULTS = t.extend({}, t.fn.tooltip.Constructor.DEFAULTS, {
        placement: "right",
        trigger: "click",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
    }), e.prototype = t.extend({}, t.fn.tooltip.Constructor.prototype), e.prototype.constructor = e, e.prototype.getDefaults = function() {
        return e.DEFAULTS
    }, e.prototype.setContent = function() {
        var t = this.tip(),
            e = this.getTitle(),
            i = this.getContent();
        t.find(".popover-title")[this.options.html ? "html" : "text"](e), t.find(".popover-content")[this.options.html ? "html" : "text"](i), t.removeClass("fade top bottom left right in"), t.find(".popover-title").html() || t.find(".popover-title").hide()
    }, e.prototype.hasContent = function() {
        return this.getTitle() || this.getContent()
    }, e.prototype.getContent = function() {
        var t = this.$element,
            e = this.options;
        return t.attr("data-content") || ("function" == typeof e.content ? e.content.call(t[0]) : e.content)
    }, e.prototype.arrow = function() {
        return this.$arrow = this.$arrow || this.tip().find(".arrow")
    }, e.prototype.tip = function() {
        return this.$tip || (this.$tip = t(this.options.template)), this.$tip
    };
    var i = t.fn.popover;
    t.fn.popover = function(i) {
        return this.each(function() {
            var n = t(this),
                o = n.data("bs.popover"),
                s = "object" == typeof i && i;
            o || n.data("bs.popover", o = new e(this, s)), "string" == typeof i && o[i]()
        })
    }, t.fn.popover.Constructor = e, t.fn.popover.noConflict = function() {
        return t.fn.popover = i, this
    }
}(window.jQuery), + function(t) {
    "use strict";

    function e(i, n) {
        var o, s = t.proxy(this.process, this);
        this.$element = t(t(i).is("body") ? window : i), this.$body = t("body"), this.$scrollElement = this.$element.on("scroll.bs.scroll-spy.data-api", s), this.options = t.extend({}, e.DEFAULTS, n), this.selector = (this.options.target || (o = t(i).attr("href")) && o.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.offsets = t([]), this.targets = t([]), this.activeTarget = null, this.refresh(), this.process()
    }
    e.DEFAULTS = {
        offset: 10
    }, e.prototype.refresh = function() {
        var e = this.$element[0] == window ? "offset" : "position";
        this.offsets = t([]), this.targets = t([]);
        var i = this;
        this.$body.find(this.selector).map(function() {
            var n = t(this),
                o = n.data("target") || n.attr("href"),
                s = /^#\w/.test(o) && t(o);
            return s && s.length && [
                [s[e]().top + (!t.isWindow(i.$scrollElement.get(0)) && i.$scrollElement.scrollTop()), o]
            ] || null
        }).sort(function(t, e) {
            return t[0] - e[0]
        }).each(function() {
            i.offsets.push(this[0]), i.targets.push(this[1])
        })
    }, e.prototype.process = function() {
        var t, e = this.$scrollElement.scrollTop() + this.options.offset,
            i = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
            n = i - this.$scrollElement.height(),
            o = this.offsets,
            s = this.targets,
            r = this.activeTarget;
        if (e >= n) return r != (t = s.last()[0]) && this.activate(t);
        for (t = o.length; t--;) r != s[t] && e >= o[t] && (!o[t + 1] || e <= o[t + 1]) && this.activate(s[t])
    }, e.prototype.activate = function(e) {
        this.activeTarget = e, t(this.selector).parents(".active").removeClass("active");
        var i = this.selector + '[data-target="' + e + '"],' + this.selector + '[href="' + e + '"]',
            n = t(i).parents("li").addClass("active");
        n.parent(".dropdown-menu").length && (n = n.closest("li.dropdown").addClass("active")), n.trigger("activate")
    };
    var i = t.fn.scrollspy;
    t.fn.scrollspy = function(i) {
        return this.each(function() {
            var n = t(this),
                o = n.data("bs.scrollspy"),
                s = "object" == typeof i && i;
            o || n.data("bs.scrollspy", o = new e(this, s)), "string" == typeof i && o[i]()
        })
    }, t.fn.scrollspy.Constructor = e, t.fn.scrollspy.noConflict = function() {
        return t.fn.scrollspy = i, this
    }, t(window).on("load", function() {
        t('[data-spy="scroll"]').each(function() {
            var e = t(this);
            e.scrollspy(e.data())
        })
    })
}(window.jQuery), + function(t) {
    "use strict";
    var e = function(e) {
        this.element = t(e)
    };
    e.prototype.show = function() {
        var e = this.element,
            i = e.closest("ul:not(.dropdown-menu)"),
            n = e.data("target");
        if (n || (n = e.attr("href"), n = n && n.replace(/.*(?=#[^\s]*$)/, "")), !e.parent("li").hasClass("active")) {
            var o = i.find(".active:last a")[0],
                s = t.Event("show.bs.tab", {
                    relatedTarget: o
                });
            if (e.trigger(s), !s.isDefaultPrevented()) {
                var r = t(n);
                this.activate(e.parent("li"), i), this.activate(r, r.parent(), function() {
                    e.trigger({
                        type: "shown.bs.tab",
                        relatedTarget: o
                    })
                })
            }
        }
    }, e.prototype.activate = function(e, i, n) {
        function o() {
            s.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), e.addClass("active"), r ? (e[0].offsetWidth, e.addClass("in")) : e.removeClass("fade"), e.parent(".dropdown-menu") && e.closest("li.dropdown").addClass("active"), n && n()
        }
        var s = i.find("> .active"),
            r = n && t.support.transition && s.hasClass("fade");
        r ? s.one(t.support.transition.end, o).emulateTransitionEnd(150) : o(), s.removeClass("in")
    };
    var i = t.fn.tab;
    t.fn.tab = function(i) {
        return this.each(function() {
            var n = t(this),
                o = n.data("bs.tab");
            o || n.data("bs.tab", o = new e(this)), "string" == typeof i && o[i]()
        })
    }, t.fn.tab.Constructor = e, t.fn.tab.noConflict = function() {
        return t.fn.tab = i, this
    }, t(document).on("click.bs.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(e) {
        e.preventDefault(), t(this).tab("show")
    })
}(window.jQuery), + function(t) {
    "use strict";
    var e = function(i, n) {
        this.options = t.extend({}, e.DEFAULTS, n), this.$window = t(window).on("scroll.bs.affix.data-api", t.proxy(this.checkPosition, this)).on("click.bs.affix.data-api", t.proxy(this.checkPositionWithEventLoop, this)), this.$element = t(i), this.affixed = this.unpin = null, this.checkPosition()
    };
    e.RESET = "affix affix-top affix-bottom", e.DEFAULTS = {
        offset: 0
    }, e.prototype.checkPositionWithEventLoop = function() {
        setTimeout(t.proxy(this.checkPosition, this), 1)
    }, e.prototype.checkPosition = function() {
        if (this.$element.is(":visible")) {
            var i = t(document).height(),
                n = this.$window.scrollTop(),
                o = this.$element.offset(),
                s = this.options.offset,
                r = s.top,
                a = s.bottom;
            "object" != typeof s && (a = r = s), "function" == typeof r && (r = s.top()), "function" == typeof a && (a = s.bottom());
            var l = !(null != this.unpin && n + this.unpin <= o.top) && (null != a && o.top + this.$element.height() >= i - a ? "bottom" : null != r && r >= n && "top");
            this.affixed !== l && (this.unpin && this.$element.css("top", ""), this.affixed = l, this.unpin = "bottom" == l ? o.top - n : null, this.$element.removeClass(e.RESET).addClass("affix" + (l ? "-" + l : "")), "bottom" == l && this.$element.offset({
                top: document.body.offsetHeight - a - this.$element.height()
            }))
        }
    };
    var i = t.fn.affix;
    t.fn.affix = function(i) {
        return this.each(function() {
            var n = t(this),
                o = n.data("bs.affix"),
                s = "object" == typeof i && i;
            o || n.data("bs.affix", o = new e(this, s)), "string" == typeof i && o[i]()
        })
    }, t.fn.affix.Constructor = e, t.fn.affix.noConflict = function() {
        return t.fn.affix = i, this
    }, t(window).on("load", function() {
        t('[data-spy="affix"]').each(function() {
            var e = t(this),
                i = e.data();
            i.offset = i.offset || {}, i.offsetBottom && (i.offset.bottom = i.offsetBottom), i.offsetTop && (i.offset.top = i.offsetTop), e.affix(i)
        })
    })
}(window.jQuery), ! function(t) {
    "use strict";
    var e = t.jCarousel = {};
    e.version = "0.3.4";
    var i = /^([+\-]=)?(.+)$/;
    e.parseTarget = function(t) {
        var e = !1,
            n = "object" != typeof t ? i.exec(t) : null;
        return n ? (t = parseInt(n[2], 10) || 0, n[1] && (e = !0, "-=" === n[1] && (t *= -1))) : "object" != typeof t && (t = parseInt(t, 10) || 0), {
            target: t,
            relative: e
        }
    }, e.detectCarousel = function(t) {
        for (var e; t.length > 0;) {
            if (e = t.filter("[data-jcarousel]"), e.length > 0) return e;
            if (e = t.find("[data-jcarousel]"), e.length > 0) return e;
            t = t.parent()
        }
        return null
    }, e.base = function(i) {
        return {
            version: e.version,
            _options: {},
            _element: null,
            _carousel: null,
            _init: t.noop,
            _create: t.noop,
            _destroy: t.noop,
            _reload: t.noop,
            create: function() {
                return this._element.attr("data-" + i.toLowerCase(), !0).data(i, this), !1 === this._trigger("create") ? this : (this._create(), this._trigger("createend"), this)
            },
            destroy: function() {
                return !1 === this._trigger("destroy") ? this : (this._destroy(), this._trigger("destroyend"), this._element.removeData(i).removeAttr("data-" + i.toLowerCase()), this)
            },
            reload: function(t) {
                return !1 === this._trigger("reload") ? this : (t && this.options(t), this._reload(), this._trigger("reloadend"), this)
            },
            element: function() {
                return this._element
            },
            options: function(e, i) {
                if (0 === arguments.length) return t.extend({}, this._options);
                if ("string" == typeof e) {
                    if ("undefined" == typeof i) return "undefined" == typeof this._options[e] ? null : this._options[e];
                    this._options[e] = i
                } else this._options = t.extend({}, this._options, e);
                return this
            },
            carousel: function() {
                return this._carousel || (this._carousel = e.detectCarousel(this.options("carousel") || this._element), this._carousel || t.error('Could not detect carousel for plugin "' + i + '"')), this._carousel
            },
            _trigger: function(e, n, o) {
                var s, r = !1;
                return o = [this].concat(o || []), (n || this._element).each(function() {
                    s = t.Event((i + ":" + e).toLowerCase()), t(this).trigger(s, o), s.isDefaultPrevented() && (r = !0)
                }), !r
            }
        }
    }, e.plugin = function(i, n) {
        var o = t[i] = function(e, i) {
            this._element = t(e), this.options(i), this._init(), this.create()
        };
        return o.fn = o.prototype = t.extend({}, e.base(i), n), t.fn[i] = function(e) {
            var n = Array.prototype.slice.call(arguments, 1),
                s = this;
            return this.each("string" == typeof e ? function() {
                var o = t(this).data(i);
                if (!o) return t.error("Cannot call methods on " + i + ' prior to initialization; attempted to call method "' + e + '"');
                if (!t.isFunction(o[e]) || "_" === e.charAt(0)) return t.error('No such method "' + e + '" for ' + i + " instance");
                var r = o[e].apply(o, n);
                return r !== o && "undefined" != typeof r ? (s = r, !1) : void 0
            } : function() {
                var n = t(this).data(i);
                n instanceof o ? n.reload(e) : new o(this, e)
            }), s
        }, o
    }
}(jQuery),
function(t, e) {
    "use strict";
    var i = function(t) {
        return parseFloat(t) || 0
    };
    t.jCarousel.plugin("jcarousel", {
        animating: !1,
        tail: 0,
        inTail: !1,
        resizeTimer: null,
        lt: null,
        vertical: !1,
        rtl: !1,
        circular: !1,
        underflow: !1,
        relative: !1,
        _options: {
            list: function() {
                return this.element().children().eq(0)
            },
            items: function() {
                return this.list().children()
            },
            animation: 400,
            transitions: !1,
            wrap: null,
            vertical: null,
            rtl: null,
            center: !1
        },
        _list: null,
        _items: null,
        _target: t(),
        _first: t(),
        _last: t(),
        _visible: t(),
        _fullyvisible: t(),
        _init: function() {
            var t = this;
            return this.onWindowResize = function() {
                t.resizeTimer && clearTimeout(t.resizeTimer), t.resizeTimer = setTimeout(function() {
                    t.reload()
                }, 100)
            }, this
        },
        _create: function() {
            this._reload(), t(e).on("resize.jcarousel", this.onWindowResize)
        },
        _destroy: function() {
            t(e).off("resize.jcarousel", this.onWindowResize)
        },
        _reload: function() {
            this.vertical = this.options("vertical"), null == this.vertical && (this.vertical = this.list().height() > this.list().width()), this.rtl = this.options("rtl"), null == this.rtl && (this.rtl = function(e) {
                if ("rtl" === ("" + e.attr("dir")).toLowerCase()) return !0;
                var i = !1;
                return e.parents("[dir]").each(function() {
                    return /rtl/i.test(t(this).attr("dir")) ? (i = !0, !1) : void 0
                }), i
            }(this._element)), this.lt = this.vertical ? "top" : "left", this.relative = "relative" === this.list().css("position"), this._list = null, this._items = null;
            var e = this.index(this._target) >= 0 ? this._target : this.closest();
            this.circular = "circular" === this.options("wrap"), this.underflow = !1;
            var i = {
                left: 0,
                top: 0
            };
            return e.length > 0 && (this._prepare(e), this.list().find("[data-jcarousel-clone]").remove(), this._items = null, this.underflow = this._fullyvisible.length >= this.items().length, this.circular = this.circular && !this.underflow, i[this.lt] = this._position(e) + "px"), this.move(i), this
        },
        list: function() {
            if (null === this._list) {
                var e = this.options("list");
                this._list = t.isFunction(e) ? e.call(this) : this._element.find(e)
            }
            return this._list
        },
        items: function() {
            if (null === this._items) {
                var e = this.options("items");
                this._items = (t.isFunction(e) ? e.call(this) : this.list().find(e)).not("[data-jcarousel-clone]")
            }
            return this._items
        },
        index: function(t) {
            return this.items().index(t)
        },
        closest: function() {
            var e, n = this,
                o = this.list().position()[this.lt],
                s = t(),
                r = !1,
                a = this.vertical ? "bottom" : this.rtl && !this.relative ? "left" : "right";
            return this.rtl && this.relative && !this.vertical && (o += this.list().width() - this.clipping()), this.items().each(function() {
                if (s = t(this), r) return !1;
                var l = n.dimension(s);
                if (o += l, o >= 0) {
                    if (e = l - i(s.css("margin-" + a)), !(Math.abs(o) - l + e / 2 <= 0)) return !1;
                    r = !0
                }
            }), s
        },
        target: function() {
            return this._target
        },
        first: function() {
            return this._first
        },
        last: function() {
            return this._last
        },
        visible: function() {
            return this._visible
        },
        fullyvisible: function() {
            return this._fullyvisible
        },
        hasNext: function() {
            if (!1 === this._trigger("hasnext")) return !0;
            var t = this.options("wrap"),
                e = this.items().length - 1,
                i = this.options("center") ? this._target : this._last;
            return !!(e >= 0 && !this.underflow && (t && "first" !== t || this.index(i) < e || this.tail && !this.inTail))
        },
        hasPrev: function() {
            if (!1 === this._trigger("hasprev")) return !0;
            var t = this.options("wrap");
            return !!(this.items().length > 0 && !this.underflow && (t && "last" !== t || this.index(this._first) > 0 || this.tail && this.inTail))
        },
        clipping: function() {
            return this._element["inner" + (this.vertical ? "Height" : "Width")]()
        },
        dimension: function(t) {
            return t["outer" + (this.vertical ? "Height" : "Width")](!0)
        },
        scroll: function(e, i, n) {
            if (this.animating) return this;
            if (!1 === this._trigger("scroll", null, [e, i])) return this;
            t.isFunction(i) && (n = i, i = !0);
            var o = t.jCarousel.parseTarget(e);
            if (o.relative) {
                var s, r, a, l, c, u, h, d, p = this.items().length - 1,
                    f = Math.abs(o.target),
                    m = this.options("wrap");
                if (o.target > 0) {
                    var g = this.index(this._last);
                    if (g >= p && this.tail) this.inTail ? "both" === m || "last" === m ? this._scroll(0, i, n) : t.isFunction(n) && n.call(this, !1) : this._scrollTail(i, n);
                    else if (s = this.index(this._target), this.underflow && s === p && ("circular" === m || "both" === m || "last" === m) || !this.underflow && g === p && ("both" === m || "last" === m)) this._scroll(0, i, n);
                    else if (a = s + f, this.circular && a > p) {
                        for (d = p, c = this.items().get(-1); d++ < a;) c = this.items().eq(0), u = this._visible.index(c) >= 0, u && c.after(c.clone(!0).attr("data-jcarousel-clone", !0)), this.list().append(c), u || (h = {}, h[this.lt] = this.dimension(c), this.moveBy(h)), this._items = null;
                        this._scroll(c, i, n)
                    } else this._scroll(Math.min(a, p), i, n)
                } else if (this.inTail) this._scroll(Math.max(this.index(this._first) - f + 1, 0), i, n);
                else if (r = this.index(this._first), s = this.index(this._target), l = this.underflow ? s : r, a = l - f, 0 >= l && (this.underflow && "circular" === m || "both" === m || "first" === m)) this._scroll(p, i, n);
                else if (this.circular && 0 > a) {
                    for (d = a, c = this.items().get(0); d++ < 0;) {
                        c = this.items().eq(-1), u = this._visible.index(c) >= 0, u && c.after(c.clone(!0).attr("data-jcarousel-clone", !0)), this.list().prepend(c), this._items = null;
                        var v = this.dimension(c);
                        h = {}, h[this.lt] = -v, this.moveBy(h)
                    }
                    this._scroll(c, i, n)
                } else this._scroll(Math.max(a, 0), i, n)
            } else this._scroll(o.target, i, n);
            return this._trigger("scrollend"), this
        },
        moveBy: function(t, e) {
            var n = this.list().position(),
                o = 1,
                s = 0;
            return this.rtl && !this.vertical && (o = -1, this.relative && (s = this.list().width() - this.clipping())), t.left && (t.left = n.left + s + i(t.left) * o + "px"), t.top && (t.top = n.top + s + i(t.top) * o + "px"), this.move(t, e)
        },
        move: function(e, i) {
            i = i || {};
            var n = this.options("transitions"),
                o = !!n,
                s = !!n.transforms,
                r = !!n.transforms3d,
                a = i.duration || 0,
                l = this.list();
            if (!o && a > 0) return void l.animate(e, i);
            var c = i.complete || t.noop,
                u = {};
            if (o) {
                var h = {
                        transitionDuration: l.css("transitionDuration"),
                        transitionTimingFunction: l.css("transitionTimingFunction"),
                        transitionProperty: l.css("transitionProperty")
                    },
                    d = c;
                c = function() {
                    t(this).css(h), d.call(this)
                }, u = {
                    transitionDuration: (a > 0 ? a / 1e3 : 0) + "s",
                    transitionTimingFunction: n.easing || i.easing,
                    transitionProperty: a > 0 ? function() {
                        return s || r ? "all" : e.left ? "left" : "top"
                    }() : "none",
                    transform: "none"
                }
            }
            r ? u.transform = "translate3d(" + (e.left || 0) + "," + (e.top || 0) + ",0)" : s ? u.transform = "translate(" + (e.left || 0) + "," + (e.top || 0) + ")" : t.extend(u, e), o && a > 0 && l.one("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", c), l.css(u), 0 >= a && l.each(function() {
                c.call(this)
            })
        },
        _scroll: function(e, i, n) {
            if (this.animating) return t.isFunction(n) && n.call(this, !1), this;
            if ("object" != typeof e ? e = this.items().eq(e) : "undefined" == typeof e.jquery && (e = t(e)), 0 === e.length) return t.isFunction(n) && n.call(this, !1), this;
            this.inTail = !1, this._prepare(e);
            var o = this._position(e),
                s = this.list().position()[this.lt];
            if (o === s) return t.isFunction(n) && n.call(this, !1), this;
            var r = {};
            return r[this.lt] = o + "px", this._animate(r, i, n), this
        },
        _scrollTail: function(e, i) {
            if (this.animating || !this.tail) return t.isFunction(i) && i.call(this, !1), this;
            var n = this.list().position()[this.lt];
            this.rtl && this.relative && !this.vertical && (n += this.list().width() - this.clipping()), this.rtl && !this.vertical ? n += this.tail : n -= this.tail, this.inTail = !0;
            var o = {};
            return o[this.lt] = n + "px", this._update({
                target: this._target.next(),
                fullyvisible: this._fullyvisible.slice(1).add(this._visible.last())
            }), this._animate(o, e, i), this
        },
        _animate: function(e, i, n) {
            if (n = n || t.noop, !1 === this._trigger("animate")) return n.call(this, !1), this;
            this.animating = !0;
            var o = this.options("animation"),
                s = t.proxy(function() {
                    this.animating = !1;
                    var t = this.list().find("[data-jcarousel-clone]");
                    t.length > 0 && (t.remove(), this._reload()), this._trigger("animateend"), n.call(this, !0)
                }, this),
                r = "object" == typeof o ? t.extend({}, o) : {
                    duration: o
                },
                a = r.complete || t.noop;
            return i === !1 ? r.duration = 0 : "undefined" != typeof t.fx.speeds[r.duration] && (r.duration = t.fx.speeds[r.duration]), r.complete = function() {
                s(), a.call(this)
            }, this.move(e, r), this
        },
        _prepare: function(e) {
            var n, o, s, r, a = this.index(e),
                l = a,
                c = this.dimension(e),
                u = this.clipping(),
                h = this.vertical ? "bottom" : this.rtl ? "left" : "right",
                d = this.options("center"),
                p = {
                    target: e,
                    first: e,
                    last: e,
                    visible: e,
                    fullyvisible: u >= c ? e : t()
                };
            if (d && (c /= 2, u /= 2), u > c)
                for (;;) {
                    if (n = this.items().eq(++l), 0 === n.length) {
                        if (!this.circular) break;
                        if (n = this.items().eq(0), e.get(0) === n.get(0)) break;
                        if (o = this._visible.index(n) >= 0, o && n.after(n.clone(!0).attr("data-jcarousel-clone", !0)), this.list().append(n), !o) {
                            var f = {};
                            f[this.lt] = this.dimension(n), this.moveBy(f)
                        }
                        this._items = null
                    }
                    if (r = this.dimension(n), 0 === r) break;
                    if (c += r, p.last = n, p.visible = p.visible.add(n), s = i(n.css("margin-" + h)), u >= c - s && (p.fullyvisible = p.fullyvisible.add(n)), c >= u) break
                }
            if (!this.circular && !d && u > c)
                for (l = a; !(--l < 0) && (n = this.items().eq(l), 0 !== n.length) && (r = this.dimension(n), 0 !== r) && (c += r, p.first = n, p.visible = p.visible.add(n), s = i(n.css("margin-" + h)), u >= c - s && (p.fullyvisible = p.fullyvisible.add(n)), !(c >= u)););
            return this._update(p), this.tail = 0, d || "circular" === this.options("wrap") || "custom" === this.options("wrap") || this.index(p.last) !== this.items().length - 1 || (c -= i(p.last.css("margin-" + h)), c > u && (this.tail = c - u)), this
        },
        _position: function(t) {
            var e = this._first,
                i = e.position()[this.lt],
                n = this.options("center"),
                o = n ? this.clipping() / 2 - this.dimension(e) / 2 : 0;
            return this.rtl && !this.vertical ? (i -= this.relative ? this.list().width() - this.dimension(e) : this.clipping() - this.dimension(e), i += o) : i -= o, !n && (this.index(t) > this.index(e) || this.inTail) && this.tail ? (i = this.rtl && !this.vertical ? i - this.tail : i + this.tail, this.inTail = !0) : this.inTail = !1, -i
        },
        _update: function(e) {
            var i, n = this,
                o = {
                    target: this._target,
                    first: this._first,
                    last: this._last,
                    visible: this._visible,
                    fullyvisible: this._fullyvisible
                },
                s = this.index(e.first || o.first) < this.index(o.first),
                r = function(i) {
                    var r = [],
                        a = [];
                    e[i].each(function() {
                        o[i].index(this) < 0 && r.push(this)
                    }), o[i].each(function() {
                        e[i].index(this) < 0 && a.push(this)
                    }), s ? r = r.reverse() : a = a.reverse(), n._trigger(i + "in", t(r)), n._trigger(i + "out", t(a)), n["_" + i] = e[i]
                };
            for (i in e) r(i);
            return this
        }
    })
}(jQuery, window),
function(t) {
    "use strict";
    t.jcarousel.fn.scrollIntoView = function(e, i, n) {
        var o, s = t.jCarousel.parseTarget(e),
            r = this.index(this._fullyvisible.first()),
            a = this.index(this._fullyvisible.last());
        if (o = s.relative ? s.target < 0 ? Math.max(0, r + s.target) : a + s.target : "object" != typeof s.target ? s.target : this.index(s.target), r > o) return this.scroll(o, i, n);
        if (o >= r && a >= o) return t.isFunction(n) && n.call(this, !1), this;
        for (var l, c = this.items(), u = this.clipping(), h = this.vertical ? "bottom" : this.rtl ? "left" : "right", d = 0; l = c.eq(o), 0 !== l.length;) {
            if (d += this.dimension(l), d >= u) {
                var p = parseFloat(l.css("margin-" + h)) || 0;
                d - p !== u && o++;
                break
            }
            if (0 >= o) break;
            o--
        }
        return this.scroll(o, i, n)
    }
}(jQuery),
function(t) {
    "use strict";
    t.jCarousel.plugin("jcarouselControl", {
        _options: {
            target: "+=1",
            event: "click",
            method: "scroll"
        },
        _active: null,
        _init: function() {
            this.onDestroy = t.proxy(function() {
                this._destroy(), this.carousel().one("jcarousel:createend", t.proxy(this._create, this))
            }, this), this.onReload = t.proxy(this._reload, this), this.onEvent = t.proxy(function(e) {
                e.preventDefault();
                var i = this.options("method");
                t.isFunction(i) ? i.call(this) : this.carousel().jcarousel(this.options("method"), this.options("target"))
            }, this)
        },
        _create: function() {
            this.carousel().one("jcarousel:destroy", this.onDestroy).on("jcarousel:reloadend jcarousel:scrollend", this.onReload), this._element.on(this.options("event") + ".jcarouselcontrol", this.onEvent), this._reload()
        },
        _destroy: function() {
            this._element.off(".jcarouselcontrol", this.onEvent), this.carousel().off("jcarousel:destroy", this.onDestroy).off("jcarousel:reloadend jcarousel:scrollend", this.onReload)
        },
        _reload: function() {
            var e, i = t.jCarousel.parseTarget(this.options("target")),
                n = this.carousel();
            if (i.relative) e = n.jcarousel(i.target > 0 ? "hasNext" : "hasPrev");
            else {
                var o = "object" != typeof i.target ? n.jcarousel("items").eq(i.target) : i.target;
                e = n.jcarousel("target").index(o) >= 0
            }
            return this._active !== e && (this._trigger(e ? "active" : "inactive"), this._active = e), this
        }
    })
}(jQuery),
function(t) {
    "use strict";
    t.jCarousel.plugin("jcarouselPagination", {
        _options: {
            perPage: null,
            item: function(t) {
                return '<a href="#' + t + '">' + t + "</a>"
            },
            event: "click",
            method: "scroll"
        },
        _carouselItems: null,
        _pages: {},
        _items: {},
        _currentPage: null,
        _init: function() {
            this.onDestroy = t.proxy(function() {
                this._destroy(), this.carousel().one("jcarousel:createend", t.proxy(this._create, this))
            }, this), this.onReload = t.proxy(this._reload, this), this.onScroll = t.proxy(this._update, this)
        },
        _create: function() {
            this.carousel().one("jcarousel:destroy", this.onDestroy).on("jcarousel:reloadend", this.onReload).on("jcarousel:scrollend", this.onScroll), this._reload()
        },
        _destroy: function() {
            this._clear(), this.carousel().off("jcarousel:destroy", this.onDestroy).off("jcarousel:reloadend", this.onReload).off("jcarousel:scrollend", this.onScroll), this._carouselItems = null
        },
        _reload: function() {
            var e = this.options("perPage");
            if (this._pages = {}, this._items = {}, t.isFunction(e) && (e = e.call(this)), null == e) this._pages = this._calculatePages();
            else
                for (var i, n = parseInt(e, 10) || 0, o = this._getCarouselItems(), s = 1, r = 0; i = o.eq(r++), 0 !== i.length;) this._pages[s] = this._pages[s] ? this._pages[s].add(i) : i, r % n === 0 && s++;
            this._clear();
            var a = this,
                l = this.carousel().data("jcarousel"),
                c = this._element,
                u = this.options("item"),
                h = this._getCarouselItems().length;
            t.each(this._pages, function(e, i) {
                var n = a._items[e] = t(u.call(a, e, i));
                n.on(a.options("event") + ".jcarouselpagination", t.proxy(function() {
                    var t = i.eq(0);
                    if (l.circular) {
                        var n = l.index(l.target()),
                            o = l.index(t);
                        parseFloat(e) > parseFloat(a._currentPage) ? n > o && (t = "+=" + (h - n + o)) : o > n && (t = "-=" + (n + (h - o)))
                    }
                    l[this.options("method")](t)
                }, a)), c.append(n)
            }), this._update()
        },
        _update: function() {
            var e, i = this.carousel().jcarousel("target");
            t.each(this._pages, function(t, n) {
                return n.each(function() {
                    return i.is(this) ? (e = t, !1) : void 0
                }), !e && void 0
            }), this._currentPage !== e && (this._trigger("inactive", this._items[this._currentPage]), this._trigger("active", this._items[e])), this._currentPage = e
        },
        items: function() {
            return this._items
        },
        reloadCarouselItems: function() {
            return this._carouselItems = null, this
        },
        _clear: function() {
            this._element.empty(), this._currentPage = null
        },
        _calculatePages: function() {
            for (var t, e, i = this.carousel().data("jcarousel"), n = this._getCarouselItems(), o = i.clipping(), s = 0, r = 0, a = 1, l = {}; t = n.eq(r++), 0 !== t.length;) e = i.dimension(t), s + e > o && (a++, s = 0), s += e, l[a] = l[a] ? l[a].add(t) : t;
            return l
        },
        _getCarouselItems: function() {
            return this._carouselItems || (this._carouselItems = this.carousel().jcarousel("items")), this._carouselItems
        }
    })
}(jQuery),
function(t, e) {
    "use strict";
    var i, n, o = {
        hidden: "visibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange",
        webkitHidden: "webkitvisibilitychange"
    };
    t.each(o, function(t, o) {
        return "undefined" != typeof e[t] ? (i = t, n = o, !1) : void 0
    }), t.jCarousel.plugin("jcarouselAutoscroll", {
        _options: {
            target: "+=1",
            interval: 3e3,
            autostart: !0
        },
        _timer: null,
        _started: !1,
        _init: function() {
            this.onDestroy = t.proxy(function() {
                this._destroy(), this.carousel().one("jcarousel:createend", t.proxy(this._create, this))
            }, this), this.onAnimateEnd = t.proxy(this._start, this), this.onVisibilityChange = t.proxy(function() {
                e[i] ? this._stop() : this._start()
            }, this)
        },
        _create: function() {
            this.carousel().one("jcarousel:destroy", this.onDestroy), t(e).on(n, this.onVisibilityChange), this.options("autostart") && this.start()
        },
        _destroy: function() {
            this._stop(), this.carousel().off("jcarousel:destroy", this.onDestroy), t(e).off(n, this.onVisibilityChange)
        },
        _start: function() {
            return this._stop(), this._started ? (this.carousel().one("jcarousel:animateend", this.onAnimateEnd), this._timer = setTimeout(t.proxy(function() {
                this.carousel().jcarousel("scroll", this.options("target"))
            }, this), this.options("interval")), this) : void 0
        },
        _stop: function() {
            return this._timer && (this._timer = clearTimeout(this._timer)), this.carousel().off("jcarousel:animateend", this.onAnimateEnd), this
        },
        start: function() {
            return this._started = !0, this._start(), this
        },
        stop: function() {
            return this._started = !1, this._stop(), this
        }
    })
}(jQuery, document),
function(t) {
    "undefined" == typeof t.fn.each2 && t.extend(t.fn, {
        each2: function(e) {
            for (var i = t([0]), n = -1, o = this.length; ++n < o && (i.context = i[0] = this[n]) && e.call(i[0], n, i) !== !1;);
            return this
        }
    })
}(jQuery),
function(t, e) {
    "use strict";

    function i(e) {
        var i = t(document.createTextNode(""));
        e.before(i), i.before(e), i.remove()
    }

    function n(t) {
        function e(t) {
            return R[t] || t
        }
        return t.replace(/[^\u0000-\u007E]/g, e)
    }

    function o(t, e) {
        for (var i = 0, n = e.length; i < n; i += 1)
            if (r(t, e[i])) return i;
        return -1
    }

    function s() {
        var e = t(H);
        e.appendTo(document.body);
        var i = {
            width: e.width() - e[0].clientWidth,
            height: e.height() - e[0].clientHeight
        };
        return e.remove(), i
    }

    function r(t, i) {
        return t === i || t !== e && i !== e && (null !== t && null !== i && (t.constructor === String ? t + "" == i + "" : i.constructor === String && i + "" == t + ""))
    }

    function a(t, e, i) {
        var n, o, s;
        if (null === t || t.length < 1) return [];
        for (n = t.split(e), o = 0, s = n.length; o < s; o += 1) n[o] = i(n[o]);
        return n
    }

    function l(t) {
        return t.outerWidth(!1) - t.width()
    }

    function c(i) {
        var n = "keyup-change-value";
        i.on("keydown", function() {
            t.data(i, n) === e && t.data(i, n, i.val())
        }), i.on("keyup", function() {
            var o = t.data(i, n);
            o !== e && i.val() !== o && (t.removeData(i, n), i.trigger("keyup-change"))
        })
    }

    function u(i) {
        i.on("mousemove", function(i) {
            var n = F;
            n !== e && n.x === i.pageX && n.y === i.pageY || t(i.target).trigger("mousemove-filtered", i)
        })
    }

    function h(t, i, n) {
        n = n || e;
        var o;
        return function() {
            var e = arguments;
            window.clearTimeout(o), o = window.setTimeout(function() {
                i.apply(n, e)
            }, t)
        }
    }

    function d(t, e) {
        var i = h(t, function(t) {
            e.trigger("scroll-debounced", t)
        });
        e.on("scroll", function(t) {
            o(t.target, e.get()) >= 0 && i(t)
        })
    }

    function p(t) {
        t[0] !== document.activeElement && window.setTimeout(function() {
            var e, i = t[0],
                n = t.val().length;
            t.focus();
            var o = i.offsetWidth > 0 || i.offsetHeight > 0;
            o && i === document.activeElement && (i.setSelectionRange ? i.setSelectionRange(n, n) : i.createTextRange && (e = i.createTextRange(), e.collapse(!1), e.select()))
        }, 0)
    }

    function f(e) {
        e = t(e)[0];
        var i = 0,
            n = 0;
        if ("selectionStart" in e) i = e.selectionStart, n = e.selectionEnd - i;
        else if ("selection" in document) {
            e.focus();
            var o = document.selection.createRange();
            n = document.selection.createRange().text.length, o.moveStart("character", -e.value.length), i = o.text.length - n
        }
        return {
            offset: i,
            length: n
        }
    }

    function m(t) {
        t.preventDefault(), t.stopPropagation()
    }

    function g(t) {
        t.preventDefault(), t.stopImmediatePropagation()
    }

    function v(e) {
        if (!P) {
            var i = e[0].currentStyle || window.getComputedStyle(e[0], null);
            P = t(document.createElement("div")).css({
                position: "absolute",
                left: "-10000px",
                top: "-10000px",
                display: "none",
                fontSize: i.fontSize,
                fontFamily: i.fontFamily,
                fontStyle: i.fontStyle,
                fontWeight: i.fontWeight,
                letterSpacing: i.letterSpacing,
                textTransform: i.textTransform,
                whiteSpace: "nowrap"
            }), P.attr("class", "select2-sizer"), t(document.body).append(P)
        }
        return P.text(e.val()), P.width()
    }

    function y(e, i, n) {
        var o, s, r = [];
        o = t.trim(e.attr("class")), o && (o = "" + o, t(o.split(/\s+/)).each2(function() {
            0 === this.indexOf("select2-") && r.push(this)
        })), o = t.trim(i.attr("class")), o && (o = "" + o, t(o.split(/\s+/)).each2(function() {
            0 !== this.indexOf("select2-") && (s = n(this), s && r.push(s))
        })), e.attr("class", r.join(" "))
    }

    function b(t, e, i, o) {
        var s = n(t.toUpperCase()).indexOf(n(e.toUpperCase())),
            r = e.length;
        return s < 0 ? void i.push(o(t)) : (i.push(o(t.substring(0, s))), i.push("<span class='select2-match'>"), i.push(o(t.substring(s, s + r))), i.push("</span>"), void i.push(o(t.substring(s + r, t.length))))
    }

    function w(t) {
        var e = {
            "\\": "&#92;",
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#47;"
        };
        return String(t).replace(/[&<>"'\/\\]/g, function(t) {
            return e[t]
        })
    }

    function _(i) {
        var n, o = null,
            s = i.quietMillis || 100,
            r = i.url,
            a = this;
        return function(l) {
            window.clearTimeout(n), n = window.setTimeout(function() {
                var n = i.data,
                    s = r,
                    c = i.transport || t.fn.select2.ajaxDefaults.transport,
                    u = {
                        type: i.type || "GET",
                        cache: i.cache || !1,
                        jsonpCallback: i.jsonpCallback || e,
                        dataType: i.dataType || "json"
                    },
                    h = t.extend({}, t.fn.select2.ajaxDefaults.params, u);
                n = n ? n.call(a, l.term, l.page, l.context) : null, s = "function" == typeof s ? s.call(a, l.term, l.page, l.context) : s, o && "function" == typeof o.abort && o.abort(), i.params && (t.isFunction(i.params) ? t.extend(h, i.params.call(a)) : t.extend(h, i.params)), t.extend(h, {
                    url: s,
                    dataType: i.dataType,
                    data: n,
                    success: function(t) {
                        var e = i.results(t, l.page, l);
                        l.callback(e)
                    },
                    error: function(t, e, i) {
                        var n = {
                            hasError: !0,
                            jqXHR: t,
                            textStatus: e,
                            errorThrown: i
                        };
                        l.callback(n)
                    }
                }), o = c.call(a, h)
            }, s)
        }
    }

    function x(e) {
        var i, n, o = e,
            s = function(t) {
                return "" + t.text
            };
        t.isArray(o) && (n = o, o = {
            results: n
        }), t.isFunction(o) === !1 && (n = o, o = function() {
            return n
        });
        var r = o();
        return r.text && (s = r.text, t.isFunction(s) || (i = r.text, s = function(t) {
                return t[i]
            })),
            function(e) {
                var i, n = e.term,
                    r = {
                        results: []
                    };
                return "" === n ? void e.callback(o()) : (i = function(o, r) {
                    var a, l;
                    if (o = o[0], o.children) {
                        a = {};
                        for (l in o) o.hasOwnProperty(l) && (a[l] = o[l]);
                        a.children = [], t(o.children).each2(function(t, e) {
                            i(e, a.children)
                        }), (a.children.length || e.matcher(n, s(a), o)) && r.push(a)
                    } else e.matcher(n, s(o), o) && r.push(o)
                }, t(o().results).each2(function(t, e) {
                    i(e, r.results)
                }), void e.callback(r))
            }
    }

    function C(i) {
        var n = t.isFunction(i);
        return function(o) {
            var s = o.term,
                r = {
                    results: []
                },
                a = n ? i(o) : i;
            t.isArray(a) && (t(a).each(function() {
                var t = this.text !== e,
                    i = t ? this.text : this;
                ("" === s || o.matcher(s, i)) && r.results.push(t ? this : {
                    id: this,
                    text: this
                })
            }), o.callback(r))
        }
    }

    function S(e, i) {
        if (t.isFunction(e)) return !0;
        if (!e) return !1;
        if ("string" == typeof e) return !0;
        throw new Error(i + " must be a string, function, or falsy value")
    }

    function k(e, i) {
        if (t.isFunction(e)) {
            var n = Array.prototype.slice.call(arguments, 2);
            return e.apply(i, n)
        }
        return e
    }

    function T(e) {
        var i = 0;
        return t.each(e, function(t, e) {
            e.children ? i += T(e.children) : i++
        }), i
    }

    function D(t, i, n, o) {
        var s, a, l, c, u, h = t,
            d = !1;
        if (!o.createSearchChoice || !o.tokenSeparators || o.tokenSeparators.length < 1) return e;
        for (;;) {
            for (a = -1, l = 0, c = o.tokenSeparators.length; l < c && (u = o.tokenSeparators[l], a = t.indexOf(u), !(a >= 0)); l++);
            if (a < 0) break;
            if (s = t.substring(0, a), t = t.substring(a + u.length), s.length > 0 && (s = o.createSearchChoice.call(this, s, i), s !== e && null !== s && o.id(s) !== e && null !== o.id(s))) {
                for (d = !1, l = 0, c = i.length; l < c; l++)
                    if (r(o.id(s), o.id(i[l]))) {
                        d = !0;
                        break
                    }
                d || n(s)
            }
        }
        return h !== t ? t : void 0
    }

    function E() {
        var e = this;
        t.each(arguments, function(t, i) {
            e[i].remove(), e[i] = null
        })
    }

    function A(e, i) {
        var n = function() {};
        return n.prototype = new e, n.prototype.constructor = n, n.prototype.parent = e.prototype, n.prototype = t.extend(n.prototype, i), n
    }
    if (window.Select2 === e) {
        var I, M, j, $, P, N, O, F = {
                x: 0,
                y: 0
            },
            L = {
                TAB: 9,
                ENTER: 13,
                ESC: 27,
                SPACE: 32,
                LEFT: 37,
                UP: 38,
                RIGHT: 39,
                DOWN: 40,
                SHIFT: 16,
                CTRL: 17,
                ALT: 18,
                PAGE_UP: 33,
                PAGE_DOWN: 34,
                HOME: 36,
                END: 35,
                BACKSPACE: 8,
                DELETE: 46,
                isArrow: function(t) {
                    switch (t = t.which ? t.which : t) {
                        case L.LEFT:
                        case L.RIGHT:
                        case L.UP:
                        case L.DOWN:
                            return !0
                    }
                    return !1
                },
                isControl: function(t) {
                    var e = t.which;
                    switch (e) {
                        case L.SHIFT:
                        case L.CTRL:
                        case L.ALT:
                            return !0
                    }
                    return !!t.metaKey
                },
                isFunctionKey: function(t) {
                    return t = t.which ? t.which : t, t >= 112 && t <= 123
                }
            },
            H = "<div class='select2-measure-scrollbar'></div>",
            R = {
                "Ⓐ": "A",
                "Ａ": "A",
                "À": "A",
                "Á": "A",
                "Â": "A",
                "Ầ": "A",
                "Ấ": "A",
                "Ẫ": "A",
                "Ẩ": "A",
                "Ã": "A",
                "Ā": "A",
                "Ă": "A",
                "Ằ": "A",
                "Ắ": "A",
                "Ẵ": "A",
                "Ẳ": "A",
                "Ȧ": "A",
                "Ǡ": "A",
                "Ä": "A",
                "Ǟ": "A",
                "Ả": "A",
                "Å": "A",
                "Ǻ": "A",
                "Ǎ": "A",
                "Ȁ": "A",
                "Ȃ": "A",
                "Ạ": "A",
                "Ậ": "A",
                "Ặ": "A",
                "Ḁ": "A",
                "Ą": "A",
                "Ⱥ": "A",
                "Ɐ": "A",
                "Ꜳ": "AA",
                "Æ": "AE",
                "Ǽ": "AE",
                "Ǣ": "AE",
                "Ꜵ": "AO",
                "Ꜷ": "AU",
                "Ꜹ": "AV",
                "Ꜻ": "AV",
                "Ꜽ": "AY",
                "Ⓑ": "B",
                "Ｂ": "B",
                "Ḃ": "B",
                "Ḅ": "B",
                "Ḇ": "B",
                "Ƀ": "B",
                "Ƃ": "B",
                "Ɓ": "B",
                "Ⓒ": "C",
                "Ｃ": "C",
                "Ć": "C",
                "Ĉ": "C",
                "Ċ": "C",
                "Č": "C",
                "Ç": "C",
                "Ḉ": "C",
                "Ƈ": "C",
                "Ȼ": "C",
                "Ꜿ": "C",
                "Ⓓ": "D",
                "Ｄ": "D",
                "Ḋ": "D",
                "Ď": "D",
                "Ḍ": "D",
                "Ḑ": "D",
                "Ḓ": "D",
                "Ḏ": "D",
                "Đ": "D",
                "Ƌ": "D",
                "Ɗ": "D",
                "Ɖ": "D",
                "Ꝺ": "D",
                "Ǳ": "DZ",
                "Ǆ": "DZ",
                "ǲ": "Dz",
                "ǅ": "Dz",
                "Ⓔ": "E",
                "Ｅ": "E",
                "È": "E",
                "É": "E",
                "Ê": "E",
                "Ề": "E",
                "Ế": "E",
                "Ễ": "E",
                "Ể": "E",
                "Ẽ": "E",
                "Ē": "E",
                "Ḕ": "E",
                "Ḗ": "E",
                "Ĕ": "E",
                "Ė": "E",
                "Ë": "E",
                "Ẻ": "E",
                "Ě": "E",
                "Ȅ": "E",
                "Ȇ": "E",
                "Ẹ": "E",
                "Ệ": "E",
                "Ȩ": "E",
                "Ḝ": "E",
                "Ę": "E",
                "Ḙ": "E",
                "Ḛ": "E",
                "Ɛ": "E",
                "Ǝ": "E",
                "Ⓕ": "F",
                "Ｆ": "F",
                "Ḟ": "F",
                "Ƒ": "F",
                "Ꝼ": "F",
                "Ⓖ": "G",
                "Ｇ": "G",
                "Ǵ": "G",
                "Ĝ": "G",
                "Ḡ": "G",
                "Ğ": "G",
                "Ġ": "G",
                "Ǧ": "G",
                "Ģ": "G",
                "Ǥ": "G",
                "Ɠ": "G",
                "Ꞡ": "G",
                "Ᵹ": "G",
                "Ꝿ": "G",
                "Ⓗ": "H",
                "Ｈ": "H",
                "Ĥ": "H",
                "Ḣ": "H",
                "Ḧ": "H",
                "Ȟ": "H",
                "Ḥ": "H",
                "Ḩ": "H",
                "Ḫ": "H",
                "Ħ": "H",
                "Ⱨ": "H",
                "Ⱶ": "H",
                "Ɥ": "H",
                "Ⓘ": "I",
                "Ｉ": "I",
                "Ì": "I",
                "Í": "I",
                "Î": "I",
                "Ĩ": "I",
                "Ī": "I",
                "Ĭ": "I",
                "İ": "I",
                "Ï": "I",
                "Ḯ": "I",
                "Ỉ": "I",
                "Ǐ": "I",
                "Ȉ": "I",
                "Ȋ": "I",
                "Ị": "I",
                "Į": "I",
                "Ḭ": "I",
                "Ɨ": "I",
                "Ⓙ": "J",
                "Ｊ": "J",
                "Ĵ": "J",
                "Ɉ": "J",
                "Ⓚ": "K",
                "Ｋ": "K",
                "Ḱ": "K",
                "Ǩ": "K",
                "Ḳ": "K",
                "Ķ": "K",
                "Ḵ": "K",
                "Ƙ": "K",
                "Ⱪ": "K",
                "Ꝁ": "K",
                "Ꝃ": "K",
                "Ꝅ": "K",
                "Ꞣ": "K",
                "Ⓛ": "L",
                "Ｌ": "L",
                "Ŀ": "L",
                "Ĺ": "L",
                "Ľ": "L",
                "Ḷ": "L",
                "Ḹ": "L",
                "Ļ": "L",
                "Ḽ": "L",
                "Ḻ": "L",
                "Ł": "L",
                "Ƚ": "L",
                "Ɫ": "L",
                "Ⱡ": "L",
                "Ꝉ": "L",
                "Ꝇ": "L",
                "Ꞁ": "L",
                "Ǉ": "LJ",
                "ǈ": "Lj",
                "Ⓜ": "M",
                "Ｍ": "M",
                "Ḿ": "M",
                "Ṁ": "M",
                "Ṃ": "M",
                "Ɱ": "M",
                "Ɯ": "M",
                "Ⓝ": "N",
                "Ｎ": "N",
                "Ǹ": "N",
                "Ń": "N",
                "Ñ": "N",
                "Ṅ": "N",
                "Ň": "N",
                "Ṇ": "N",
                "Ņ": "N",
                "Ṋ": "N",
                "Ṉ": "N",
                "Ƞ": "N",
                "Ɲ": "N",
                "Ꞑ": "N",
                "Ꞥ": "N",
                "Ǌ": "NJ",
                "ǋ": "Nj",
                "Ⓞ": "O",
                "Ｏ": "O",
                "Ò": "O",
                "Ó": "O",
                "Ô": "O",
                "Ồ": "O",
                "Ố": "O",
                "Ỗ": "O",
                "Ổ": "O",
                "Õ": "O",
                "Ṍ": "O",
                "Ȭ": "O",
                "Ṏ": "O",
                "Ō": "O",
                "Ṑ": "O",
                "Ṓ": "O",
                "Ŏ": "O",
                "Ȯ": "O",
                "Ȱ": "O",
                "Ö": "O",
                "Ȫ": "O",
                "Ỏ": "O",
                "Ő": "O",
                "Ǒ": "O",
                "Ȍ": "O",
                "Ȏ": "O",
                "Ơ": "O",
                "Ờ": "O",
                "Ớ": "O",
                "Ỡ": "O",
                "Ở": "O",
                "Ợ": "O",
                "Ọ": "O",
                "Ộ": "O",
                "Ǫ": "O",
                "Ǭ": "O",
                "Ø": "O",
                "Ǿ": "O",
                "Ɔ": "O",
                "Ɵ": "O",
                "Ꝋ": "O",
                "Ꝍ": "O",
                "Ƣ": "OI",
                "Ꝏ": "OO",
                "Ȣ": "OU",
                "Ⓟ": "P",
                "Ｐ": "P",
                "Ṕ": "P",
                "Ṗ": "P",
                "Ƥ": "P",
                "Ᵽ": "P",
                "Ꝑ": "P",
                "Ꝓ": "P",
                "Ꝕ": "P",
                "Ⓠ": "Q",
                "Ｑ": "Q",
                "Ꝗ": "Q",
                "Ꝙ": "Q",
                "Ɋ": "Q",
                "Ⓡ": "R",
                "Ｒ": "R",
                "Ŕ": "R",
                "Ṙ": "R",
                "Ř": "R",
                "Ȑ": "R",
                "Ȓ": "R",
                "Ṛ": "R",
                "Ṝ": "R",
                "Ŗ": "R",
                "Ṟ": "R",
                "Ɍ": "R",
                "Ɽ": "R",
                "Ꝛ": "R",
                "Ꞧ": "R",
                "Ꞃ": "R",
                "Ⓢ": "S",
                "Ｓ": "S",
                "ẞ": "S",
                "Ś": "S",
                "Ṥ": "S",
                "Ŝ": "S",
                "Ṡ": "S",
                "Š": "S",
                "Ṧ": "S",
                "Ṣ": "S",
                "Ṩ": "S",
                "Ș": "S",
                "Ş": "S",
                "Ȿ": "S",
                "Ꞩ": "S",
                "Ꞅ": "S",
                "Ⓣ": "T",
                "Ｔ": "T",
                "Ṫ": "T",
                "Ť": "T",
                "Ṭ": "T",
                "Ț": "T",
                "Ţ": "T",
                "Ṱ": "T",
                "Ṯ": "T",
                "Ŧ": "T",
                "Ƭ": "T",
                "Ʈ": "T",
                "Ⱦ": "T",
                "Ꞇ": "T",
                "Ꜩ": "TZ",
                "Ⓤ": "U",
                "Ｕ": "U",
                "Ù": "U",
                "Ú": "U",
                "Û": "U",
                "Ũ": "U",
                "Ṹ": "U",
                "Ū": "U",
                "Ṻ": "U",
                "Ŭ": "U",
                "Ü": "U",
                "Ǜ": "U",
                "Ǘ": "U",
                "Ǖ": "U",
                "Ǚ": "U",
                "Ủ": "U",
                "Ů": "U",
                "Ű": "U",
                "Ǔ": "U",
                "Ȕ": "U",
                "Ȗ": "U",
                "Ư": "U",
                "Ừ": "U",
                "Ứ": "U",
                "Ữ": "U",
                "Ử": "U",
                "Ự": "U",
                "Ụ": "U",
                "Ṳ": "U",
                "Ų": "U",
                "Ṷ": "U",
                "Ṵ": "U",
                "Ʉ": "U",
                "Ⓥ": "V",
                "Ｖ": "V",
                "Ṽ": "V",
                "Ṿ": "V",
                "Ʋ": "V",
                "Ꝟ": "V",
                "Ʌ": "V",
                "Ꝡ": "VY",
                "Ⓦ": "W",
                "Ｗ": "W",
                "Ẁ": "W",
                "Ẃ": "W",
                "Ŵ": "W",
                "Ẇ": "W",
                "Ẅ": "W",
                "Ẉ": "W",
                "Ⱳ": "W",
                "Ⓧ": "X",
                "Ｘ": "X",
                "Ẋ": "X",
                "Ẍ": "X",
                "Ⓨ": "Y",
                "Ｙ": "Y",
                "Ỳ": "Y",
                "Ý": "Y",
                "Ŷ": "Y",
                "Ỹ": "Y",
                "Ȳ": "Y",
                "Ẏ": "Y",
                "Ÿ": "Y",
                "Ỷ": "Y",
                "Ỵ": "Y",
                "Ƴ": "Y",
                "Ɏ": "Y",
                "Ỿ": "Y",
                "Ⓩ": "Z",
                "Ｚ": "Z",
                "Ź": "Z",
                "Ẑ": "Z",
                "Ż": "Z",
                "Ž": "Z",
                "Ẓ": "Z",
                "Ẕ": "Z",
                "Ƶ": "Z",
                "Ȥ": "Z",
                "Ɀ": "Z",
                "Ⱬ": "Z",
                "Ꝣ": "Z",
                "ⓐ": "a",
                "ａ": "a",
                "ẚ": "a",
                "à": "a",
                "á": "a",
                "â": "a",
                "ầ": "a",
                "ấ": "a",
                "ẫ": "a",
                "ẩ": "a",
                "ã": "a",
                "ā": "a",
                "ă": "a",
                "ằ": "a",
                "ắ": "a",
                "ẵ": "a",
                "ẳ": "a",
                "ȧ": "a",
                "ǡ": "a",
                "ä": "a",
                "ǟ": "a",
                "ả": "a",
                "å": "a",
                "ǻ": "a",
                "ǎ": "a",
                "ȁ": "a",
                "ȃ": "a",
                "ạ": "a",
                "ậ": "a",
                "ặ": "a",
                "ḁ": "a",
                "ą": "a",
                "ⱥ": "a",
                "ɐ": "a",
                "ꜳ": "aa",
                "æ": "ae",
                "ǽ": "ae",
                "ǣ": "ae",
                "ꜵ": "ao",
                "ꜷ": "au",
                "ꜹ": "av",
                "ꜻ": "av",
                "ꜽ": "ay",
                "ⓑ": "b",
                "ｂ": "b",
                "ḃ": "b",
                "ḅ": "b",
                "ḇ": "b",
                "ƀ": "b",
                "ƃ": "b",
                "ɓ": "b",
                "ⓒ": "c",
                "ｃ": "c",
                "ć": "c",
                "ĉ": "c",
                "ċ": "c",
                "č": "c",
                "ç": "c",
                "ḉ": "c",
                "ƈ": "c",
                "ȼ": "c",
                "ꜿ": "c",
                "ↄ": "c",
                "ⓓ": "d",
                "ｄ": "d",
                "ḋ": "d",
                "ď": "d",
                "ḍ": "d",
                "ḑ": "d",
                "ḓ": "d",
                "ḏ": "d",
                "đ": "d",
                "ƌ": "d",
                "ɖ": "d",
                "ɗ": "d",
                "ꝺ": "d",
                "ǳ": "dz",
                "ǆ": "dz",
                "ⓔ": "e",
                "ｅ": "e",
                "è": "e",
                "é": "e",
                "ê": "e",
                "ề": "e",
                "ế": "e",
                "ễ": "e",
                "ể": "e",
                "ẽ": "e",
                "ē": "e",
                "ḕ": "e",
                "ḗ": "e",
                "ĕ": "e",
                "ė": "e",
                "ë": "e",
                "ẻ": "e",
                "ě": "e",
                "ȅ": "e",
                "ȇ": "e",
                "ẹ": "e",
                "ệ": "e",
                "ȩ": "e",
                "ḝ": "e",
                "ę": "e",
                "ḙ": "e",
                "ḛ": "e",
                "ɇ": "e",
                "ɛ": "e",
                "ǝ": "e",
                "ⓕ": "f",
                "ｆ": "f",
                "ḟ": "f",
                "ƒ": "f",
                "ꝼ": "f",
                "ⓖ": "g",
                "ｇ": "g",
                "ǵ": "g",
                "ĝ": "g",
                "ḡ": "g",
                "ğ": "g",
                "ġ": "g",
                "ǧ": "g",
                "ģ": "g",
                "ǥ": "g",
                "ɠ": "g",
                "ꞡ": "g",
                "ᵹ": "g",
                "ꝿ": "g",
                "ⓗ": "h",
                "ｈ": "h",
                "ĥ": "h",
                "ḣ": "h",
                "ḧ": "h",
                "ȟ": "h",
                "ḥ": "h",
                "ḩ": "h",
                "ḫ": "h",
                "ẖ": "h",
                "ħ": "h",
                "ⱨ": "h",
                "ⱶ": "h",
                "ɥ": "h",
                "ƕ": "hv",
                "ⓘ": "i",
                "ｉ": "i",
                "ì": "i",
                "í": "i",
                "î": "i",
                "ĩ": "i",
                "ī": "i",
                "ĭ": "i",
                "ï": "i",
                "ḯ": "i",
                "ỉ": "i",
                "ǐ": "i",
                "ȉ": "i",
                "ȋ": "i",
                "ị": "i",
                "į": "i",
                "ḭ": "i",
                "ɨ": "i",
                "ı": "i",
                "ⓙ": "j",
                "ｊ": "j",
                "ĵ": "j",
                "ǰ": "j",
                "ɉ": "j",
                "ⓚ": "k",
                "ｋ": "k",
                "ḱ": "k",
                "ǩ": "k",
                "ḳ": "k",
                "ķ": "k",
                "ḵ": "k",
                "ƙ": "k",
                "ⱪ": "k",
                "ꝁ": "k",
                "ꝃ": "k",
                "ꝅ": "k",
                "ꞣ": "k",
                "ⓛ": "l",
                "ｌ": "l",
                "ŀ": "l",
                "ĺ": "l",
                "ľ": "l",
                "ḷ": "l",
                "ḹ": "l",
                "ļ": "l",
                "ḽ": "l",
                "ḻ": "l",
                "ſ": "l",
                "ł": "l",
                "ƚ": "l",
                "ɫ": "l",
                "ⱡ": "l",
                "ꝉ": "l",
                "ꞁ": "l",
                "ꝇ": "l",
                "ǉ": "lj",
                "ⓜ": "m",
                "ｍ": "m",
                "ḿ": "m",
                "ṁ": "m",
                "ṃ": "m",
                "ɱ": "m",
                "ɯ": "m",
                "ⓝ": "n",
                "ｎ": "n",
                "ǹ": "n",
                "ń": "n",
                "ñ": "n",
                "ṅ": "n",
                "ň": "n",
                "ṇ": "n",
                "ņ": "n",
                "ṋ": "n",
                "ṉ": "n",
                "ƞ": "n",
                "ɲ": "n",
                "ŉ": "n",
                "ꞑ": "n",
                "ꞥ": "n",
                "ǌ": "nj",
                "ⓞ": "o",
                "ｏ": "o",
                "ò": "o",
                "ó": "o",
                "ô": "o",
                "ồ": "o",
                "ố": "o",
                "ỗ": "o",
                "ổ": "o",
                "õ": "o",
                "ṍ": "o",
                "ȭ": "o",
                "ṏ": "o",
                "ō": "o",
                "ṑ": "o",
                "ṓ": "o",
                "ŏ": "o",
                "ȯ": "o",
                "ȱ": "o",
                "ö": "o",
                "ȫ": "o",
                "ỏ": "o",
                "ő": "o",
                "ǒ": "o",
                "ȍ": "o",
                "ȏ": "o",
                "ơ": "o",
                "ờ": "o",
                "ớ": "o",
                "ỡ": "o",
                "ở": "o",
                "ợ": "o",
                "ọ": "o",
                "ộ": "o",
                "ǫ": "o",
                "ǭ": "o",
                "ø": "o",
                "ǿ": "o",
                "ɔ": "o",
                "ꝋ": "o",
                "ꝍ": "o",
                "ɵ": "o",
                "ƣ": "oi",
                "ȣ": "ou",
                "ꝏ": "oo",
                "ⓟ": "p",
                "ｐ": "p",
                "ṕ": "p",
                "ṗ": "p",
                "ƥ": "p",
                "ᵽ": "p",
                "ꝑ": "p",
                "ꝓ": "p",
                "ꝕ": "p",
                "ⓠ": "q",
                "ｑ": "q",
                "ɋ": "q",
                "ꝗ": "q",
                "ꝙ": "q",
                "ⓡ": "r",
                "ｒ": "r",
                "ŕ": "r",
                "ṙ": "r",
                "ř": "r",
                "ȑ": "r",
                "ȓ": "r",
                "ṛ": "r",
                "ṝ": "r",
                "ŗ": "r",
                "ṟ": "r",
                "ɍ": "r",
                "ɽ": "r",
                "ꝛ": "r",
                "ꞧ": "r",
                "ꞃ": "r",
                "ⓢ": "s",
                "ｓ": "s",
                "ß": "s",
                "ś": "s",
                "ṥ": "s",
                "ŝ": "s",
                "ṡ": "s",
                "š": "s",
                "ṧ": "s",
                "ṣ": "s",
                "ṩ": "s",
                "ș": "s",
                "ş": "s",
                "ȿ": "s",
                "ꞩ": "s",
                "ꞅ": "s",
                "ẛ": "s",
                "ⓣ": "t",
                "ｔ": "t",
                "ṫ": "t",
                "ẗ": "t",
                "ť": "t",
                "ṭ": "t",
                "ț": "t",
                "ţ": "t",
                "ṱ": "t",
                "ṯ": "t",
                "ŧ": "t",
                "ƭ": "t",
                "ʈ": "t",
                "ⱦ": "t",
                "ꞇ": "t",
                "ꜩ": "tz",
                "ⓤ": "u",
                "ｕ": "u",
                "ù": "u",
                "ú": "u",
                "û": "u",
                "ũ": "u",
                "ṹ": "u",
                "ū": "u",
                "ṻ": "u",
                "ŭ": "u",
                "ü": "u",
                "ǜ": "u",
                "ǘ": "u",
                "ǖ": "u",
                "ǚ": "u",
                "ủ": "u",
                "ů": "u",
                "ű": "u",
                "ǔ": "u",
                "ȕ": "u",
                "ȗ": "u",
                "ư": "u",
                "ừ": "u",
                "ứ": "u",
                "ữ": "u",
                "ử": "u",
                "ự": "u",
                "ụ": "u",
                "ṳ": "u",
                "ų": "u",
                "ṷ": "u",
                "ṵ": "u",
                "ʉ": "u",
                "ⓥ": "v",
                "ｖ": "v",
                "ṽ": "v",
                "ṿ": "v",
                "ʋ": "v",
                "ꝟ": "v",
                "ʌ": "v",
                "ꝡ": "vy",
                "ⓦ": "w",
                "ｗ": "w",
                "ẁ": "w",
                "ẃ": "w",
                "ŵ": "w",
                "ẇ": "w",
                "ẅ": "w",
                "ẘ": "w",
                "ẉ": "w",
                "ⱳ": "w",
                "ⓧ": "x",
                "ｘ": "x",
                "ẋ": "x",
                "ẍ": "x",
                "ⓨ": "y",
                "ｙ": "y",
                "ỳ": "y",
                "ý": "y",
                "ŷ": "y",
                "ỹ": "y",
                "ȳ": "y",
                "ẏ": "y",
                "ÿ": "y",
                "ỷ": "y",
                "ẙ": "y",
                "ỵ": "y",
                "ƴ": "y",
                "ɏ": "y",
                "ỿ": "y",
                "ⓩ": "z",
                "ｚ": "z",
                "ź": "z",
                "ẑ": "z",
                "ż": "z",
                "ž": "z",
                "ẓ": "z",
                "ẕ": "z",
                "ƶ": "z",
                "ȥ": "z",
                "ɀ": "z",
                "ⱬ": "z",
                "ꝣ": "z",
                "Ά": "Α",
                "Έ": "Ε",
                "Ή": "Η",
                "Ί": "Ι",
                "Ϊ": "Ι",
                "Ό": "Ο",
                "Ύ": "Υ",
                "Ϋ": "Υ",
                "Ώ": "Ω",
                "ά": "α",
                "έ": "ε",
                "ή": "η",
                "ί": "ι",
                "ϊ": "ι",
                "ΐ": "ι",
                "ό": "ο",
                "ύ": "υ",
                "ϋ": "υ",
                "ΰ": "υ",
                "ω": "ω",
                "ς": "σ"
            };
        N = t(document), $ = function() {
            var t = 1;
            return function() {
                return t++
            }
        }(), I = A(Object, {
            bind: function(t) {
                var e = this;
                return function() {
                    t.apply(e, arguments)
                }
            },
            init: function(i) {
                var n, o, r = ".select2-results";
                this.opts = i = this.prepareOpts(i), this.id = i.id, i.element.data("select2") !== e && null !== i.element.data("select2") && i.element.data("select2").destroy(), this.container = this.createContainer(), this.liveRegion = t(".select2-hidden-accessible"), 0 == this.liveRegion.length && (this.liveRegion = t("<span>", {
                        role: "status",
                        "aria-live": "polite"
                    }).addClass("select2-hidden-accessible").appendTo(document.body)), this.containerId = "s2id_" + (i.element.attr("id") || "autogen" + $()), this.containerEventName = this.containerId.replace(/([.])/g, "_").replace(/([;&,\-\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, "\\$1"), this.container.attr("id", this.containerId), this.container.attr("title", i.element.attr("title")), this.body = t(document.body), y(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.attr("style", i.element.attr("style")), this.container.css(k(i.containerCss, this.opts.element)), this.container.addClass(k(i.containerCssClass, this.opts.element)), this.elementTabIndex = this.opts.element.attr("tabindex"), this.opts.element.data("select2", this).attr("tabindex", "-1").before(this.container).on("click.select2", m), this.container.data("select2", this), this.dropdown = this.container.find(".select2-drop"), y(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), this.dropdown.addClass(k(i.dropdownCssClass, this.opts.element)), this.dropdown.data("select2", this), this.dropdown.on("click", m), this.results = n = this.container.find(r), this.search = o = this.container.find("input.select2-input"), this.queryCount = 0, this.resultsPage = 0, this.context = null, this.initContainer(), this.container.on("click", m), u(this.results), this.dropdown.on("mousemove-filtered", r, this.bind(this.highlightUnderEvent)), this.dropdown.on("touchstart touchmove touchend", r, this.bind(function(t) {
                        this._touchEvent = !0, this.highlightUnderEvent(t)
                    })), this.dropdown.on("touchmove", r, this.bind(this.touchMoved)), this.dropdown.on("touchstart touchend", r, this.bind(this.clearTouchMoved)), this.dropdown.on("click", this.bind(function(t) {
                        this._touchEvent && (this._touchEvent = !1, this.selectHighlighted())
                    })), d(80, this.results), this.dropdown.on("scroll-debounced", r, this.bind(this.loadMoreIfNeeded)), t(this.container).on("change", ".select2-input", function(t) {
                        t.stopPropagation()
                    }), t(this.dropdown).on("change", ".select2-input", function(t) {
                        t.stopPropagation()
                    }), t.fn.mousewheel && n.mousewheel(function(t, e, i, o) {
                        var s = n.scrollTop();
                        o > 0 && s - o <= 0 ? (n.scrollTop(0), m(t)) : o < 0 && n.get(0).scrollHeight - n.scrollTop() + o <= n.height() && (n.scrollTop(n.get(0).scrollHeight - n.height()), m(t))
                    }), c(o), o.on("keyup-change input paste", this.bind(this.updateResults)),
                    o.on("focus", function() {
                        o.addClass("select2-focused")
                    }), o.on("blur", function() {
                        o.removeClass("select2-focused")
                    }), this.dropdown.on("click", r, this.bind(function(e) {
                        t(e.target).closest(".select2-result-selectable").length > 0 && (this.highlightUnderEvent(e), this.selectHighlighted(e))
                    })), this.dropdown.on("click mouseup mousedown touchstart touchend focusin", function(t) {
                        t.stopPropagation()
                    }), this.nextSearchTerm = e, t.isFunction(this.opts.initSelection) && (this.initSelection(), this.monitorSource()), null !== i.maximumInputLength && this.search.attr("maxlength", i.maximumInputLength);
                var a = i.element.prop("disabled");
                a === e && (a = !1), this.enable(!a);
                var l = i.element.prop("readonly");
                l === e && (l = !1), this.readonly(l), O = O || s(), this.autofocus = i.element.prop("autofocus"), i.element.prop("autofocus", !1), this.autofocus && this.focus(), this.search.attr("placeholder", i.searchInputPlaceholder)
            },
            destroy: function() {
                var t = this.opts.element,
                    i = t.data("select2"),
                    n = this;
                this.close(), t.length && t[0].detachEvent && n._sync && t.each(function() {
                    n._sync && this.detachEvent("onpropertychange", n._sync)
                }), this.propertyObserver && (this.propertyObserver.disconnect(), this.propertyObserver = null), this._sync = null, i !== e && (i.container.remove(), i.liveRegion.remove(), i.dropdown.remove(), t.show().removeData("select2").off(".select2").prop("autofocus", this.autofocus || !1), this.elementTabIndex ? t.attr({
                    tabindex: this.elementTabIndex
                }) : t.removeAttr("tabindex"), t.show()), E.call(this, "container", "liveRegion", "dropdown", "results", "search")
            },
            optionToData: function(t) {
                return t.is("option") ? {
                    id: t.prop("value"),
                    text: t.text(),
                    element: t.get(),
                    css: t.attr("class"),
                    disabled: t.prop("disabled"),
                    locked: r(t.attr("locked"), "locked") || r(t.data("locked"), !0)
                } : t.is("optgroup") ? {
                    text: t.attr("label"),
                    children: [],
                    element: t.get(),
                    css: t.attr("class")
                } : void 0
            },
            prepareOpts: function(i) {
                var n, o, s, l, c = this;
                if (n = i.element, "select" === n.get(0).tagName.toLowerCase() && (this.select = o = i.element), o && t.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function() {
                        if (this in i) throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.")
                    }), i = t.extend({}, {
                        populateResults: function(n, o, s) {
                            var r, a = this.opts.id,
                                l = this.liveRegion;
                            (r = function(n, o, u) {
                                var h, d, p, f, m, g, v, y, b, w;
                                n = i.sortResults(n, o, s);
                                var _ = [];
                                for (h = 0, d = n.length; h < d; h += 1) p = n[h], m = p.disabled === !0, f = !m && a(p) !== e, g = p.children && p.children.length > 0, v = t("<li></li>"), v.addClass("select2-results-dept-" + u), v.addClass("select2-result"), v.addClass(f ? "select2-result-selectable" : "select2-result-unselectable"), m && v.addClass("select2-disabled"), g && v.addClass("select2-result-with-children"), v.addClass(c.opts.formatResultCssClass(p)), v.attr("role", "presentation"), y = t(document.createElement("div")), y.addClass("select2-result-label"), y.attr("id", "select2-result-label-" + $()), y.attr("role", "option"), w = i.formatResult(p, y, s, c.opts.escapeMarkup), w !== e && (y.html(w), v.append(y)), g && (b = t("<ul></ul>"), b.addClass("select2-result-sub"), r(p.children, b, u + 1), v.append(b)), v.data("select2-data", p), _.push(v[0]);
                                o.append(_), l.text(i.formatMatches(n.length))
                            })(o, n, 0)
                        }
                    }, t.fn.select2.defaults, i), "function" != typeof i.id && (s = i.id, i.id = function(t) {
                        return t[s]
                    }), t.isArray(i.element.data("select2Tags"))) {
                    if ("tags" in i) throw "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + i.element.attr("id");
                    i.tags = i.element.data("select2Tags")
                }
                if (o ? (i.query = this.bind(function(t) {
                        var i, o, s, r = {
                                results: [],
                                more: !1
                            },
                            a = t.term;
                        s = function(e, i) {
                            var n;
                            e.is("option") ? t.matcher(a, e.text(), e) && i.push(c.optionToData(e)) : e.is("optgroup") && (n = c.optionToData(e), e.children().each2(function(t, e) {
                                s(e, n.children)
                            }), n.children.length > 0 && i.push(n))
                        }, i = n.children(), this.getPlaceholder() !== e && i.length > 0 && (o = this.getPlaceholderOption(), o && (i = i.not(o))), i.each2(function(t, e) {
                            s(e, r.results)
                        }), t.callback(r)
                    }), i.id = function(t) {
                        return t.id
                    }) : "query" in i || ("ajax" in i ? (l = i.element.data("ajax-url"), l && l.length > 0 && (i.ajax.url = l), i.query = _.call(i.element, i.ajax)) : "data" in i ? i.query = x(i.data) : "tags" in i && (i.query = C(i.tags), i.createSearchChoice === e && (i.createSearchChoice = function(e) {
                        return {
                            id: t.trim(e),
                            text: t.trim(e)
                        }
                    }), i.initSelection === e && (i.initSelection = function(e, n) {
                        var o = [];
                        t(a(e.val(), i.separator, i.transformVal)).each(function() {
                            var e = {
                                    id: this,
                                    text: this
                                },
                                n = i.tags;
                            t.isFunction(n) && (n = n()), t(n).each(function() {
                                if (r(this.id, e.id)) return e = this, !1
                            }), o.push(e)
                        }), n(o)
                    }))), "function" != typeof i.query) throw "query function not defined for Select2 " + i.element.attr("id");
                if ("top" === i.createSearchChoicePosition) i.createSearchChoicePosition = function(t, e) {
                    t.unshift(e)
                };
                else if ("bottom" === i.createSearchChoicePosition) i.createSearchChoicePosition = function(t, e) {
                    t.push(e)
                };
                else if ("function" != typeof i.createSearchChoicePosition) throw "invalid createSearchChoicePosition option must be 'top', 'bottom' or a custom function";
                return i
            },
            monitorSource: function() {
                var i, n = this.opts.element,
                    o = this;
                n.on("change.select2", this.bind(function(t) {
                    this.opts.element.data("select2-change-triggered") !== !0 && this.initSelection()
                })), this._sync = this.bind(function() {
                    var t = n.prop("disabled");
                    t === e && (t = !1), this.enable(!t);
                    var i = n.prop("readonly");
                    i === e && (i = !1), this.readonly(i), this.container && (y(this.container, this.opts.element, this.opts.adaptContainerCssClass), this.container.addClass(k(this.opts.containerCssClass, this.opts.element))), this.dropdown && (y(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass), this.dropdown.addClass(k(this.opts.dropdownCssClass, this.opts.element)))
                }), n.length && n[0].attachEvent && n.each(function() {
                    this.attachEvent("onpropertychange", o._sync)
                }), i = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver, i !== e && (this.propertyObserver && (delete this.propertyObserver, this.propertyObserver = null), this.propertyObserver = new i(function(e) {
                    t.each(e, o._sync)
                }), this.propertyObserver.observe(n.get(0), {
                    attributes: !0,
                    subtree: !1
                }))
            },
            triggerSelect: function(e) {
                var i = t.Event("select2-selecting", {
                    val: this.id(e),
                    object: e,
                    choice: e
                });
                return this.opts.element.trigger(i), !i.isDefaultPrevented()
            },
            triggerChange: function(e) {
                e = e || {}, e = t.extend({}, e, {
                    type: "change",
                    val: this.val()
                }), this.opts.element.data("select2-change-triggered", !0), this.opts.element.trigger(e), this.opts.element.data("select2-change-triggered", !1), this.opts.element.click(), this.opts.blurOnChange && this.opts.element.blur()
            },
            isInterfaceEnabled: function() {
                return this.enabledInterface === !0
            },
            enableInterface: function() {
                var t = this._enabled && !this._readonly,
                    e = !t;
                return t !== this.enabledInterface && (this.container.toggleClass("select2-container-disabled", e), this.close(), this.enabledInterface = t, !0)
            },
            enable: function(t) {
                t === e && (t = !0), this._enabled !== t && (this._enabled = t, this.opts.element.prop("disabled", !t), this.enableInterface())
            },
            disable: function() {
                this.enable(!1)
            },
            readonly: function(t) {
                t === e && (t = !1), this._readonly !== t && (this._readonly = t, this.opts.element.prop("readonly", t), this.enableInterface())
            },
            opened: function() {
                return !!this.container && this.container.hasClass("select2-dropdown-open")
            },
            positionDropdown: function() {
                var e, i, n, o, s, r = this.dropdown,
                    a = this.container,
                    l = a.offset(),
                    c = a.outerHeight(!1),
                    u = a.outerWidth(!1),
                    h = r.outerHeight(!1),
                    d = t(window),
                    p = d.width(),
                    f = d.height(),
                    m = d.scrollLeft() + p,
                    g = d.scrollTop() + f,
                    v = l.top + c,
                    y = l.left,
                    b = v + h <= g,
                    w = l.top - h >= d.scrollTop(),
                    _ = r.outerWidth(!1),
                    x = function() {
                        return y + _ <= m
                    },
                    C = function() {
                        return l.left + m + a.outerWidth(!1) > _
                    },
                    S = r.hasClass("select2-drop-above");
                S ? (i = !0, !w && b && (n = !0, i = !1)) : (i = !1, !b && w && (n = !0, i = !0)), n && (r.hide(), l = this.container.offset(), c = this.container.outerHeight(!1), u = this.container.outerWidth(!1), h = r.outerHeight(!1), m = d.scrollLeft() + p, g = d.scrollTop() + f, v = l.top + c, y = l.left, _ = r.outerWidth(!1), r.show(), this.focusSearch()), this.opts.dropdownAutoWidth ? (s = t(".select2-results", r)[0], r.addClass("select2-drop-auto-width"), r.css("width", ""), _ = r.outerWidth(!1) + (s.scrollHeight === s.clientHeight ? 0 : O.width), _ > u ? u = _ : _ = u, h = r.outerHeight(!1)) : this.container.removeClass("select2-drop-auto-width"), "static" !== this.body.css("position") && (e = this.body.offset(), v -= e.top, y -= e.left), !x() && C() && (y = l.left + this.container.outerWidth(!1) - _), o = {
                    left: y,
                    width: u
                }, i ? (o.top = l.top - h, o.bottom = "auto", this.container.addClass("select2-drop-above"), r.addClass("select2-drop-above")) : (o.top = v, o.bottom = "auto", this.container.removeClass("select2-drop-above"), r.removeClass("select2-drop-above")), o = t.extend(o, k(this.opts.dropdownCss, this.opts.element)), r.css(o)
            },
            shouldOpen: function() {
                var e;
                return !this.opened() && (this._enabled !== !1 && this._readonly !== !0 && (e = t.Event("select2-opening"), this.opts.element.trigger(e), !e.isDefaultPrevented()))
            },
            clearDropdownAlignmentPreference: function() {
                this.container.removeClass("select2-drop-above"), this.dropdown.removeClass("select2-drop-above")
            },
            open: function() {
                return !!this.shouldOpen() && (this.opening(), N.on("mousemove.select2Event", function(t) {
                    F.x = t.pageX, F.y = t.pageY
                }), !0)
            },
            opening: function() {
                var e, n = this.containerEventName,
                    o = "scroll." + n,
                    s = "resize." + n,
                    r = "orientationchange." + n;
                this.container.addClass("select2-dropdown-open").addClass("select2-container-active"), this.clearDropdownAlignmentPreference(), this.dropdown[0] !== this.body.children().last()[0] && this.dropdown.detach().appendTo(this.body), e = t("#select2-drop-mask"), 0 === e.length && (e = t(document.createElement("div")), e.attr("id", "select2-drop-mask").attr("class", "select2-drop-mask"), e.hide(), e.appendTo(this.body), e.on("mousedown touchstart click", function(n) {
                    i(e);
                    var o, s = t("#select2-drop");
                    s.length > 0 && (o = s.data("select2"), o.opts.selectOnBlur && o.selectHighlighted({
                        noFocus: !0
                    }), o.close(), n.preventDefault(), n.stopPropagation())
                })), this.dropdown.prev()[0] !== e[0] && this.dropdown.before(e), t("#select2-drop").removeAttr("id"), this.dropdown.attr("id", "select2-drop"), e.show(), this.positionDropdown(), this.dropdown.show(), this.positionDropdown(), this.dropdown.addClass("select2-drop-active");
                var a = this;
                this.container.parents().add(window).each(function() {
                    t(this).on(s + " " + o + " " + r, function(t) {
                        a.opened() && a.positionDropdown()
                    })
                })
            },
            close: function() {
                if (this.opened()) {
                    var e = this.containerEventName,
                        i = "scroll." + e,
                        n = "resize." + e,
                        o = "orientationchange." + e;
                    this.container.parents().add(window).each(function() {
                        t(this).off(i).off(n).off(o)
                    }), this.clearDropdownAlignmentPreference(), t("#select2-drop-mask").hide(), this.dropdown.removeAttr("id"), this.dropdown.hide(), this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"), this.results.empty(), N.off("mousemove.select2Event"), this.clearSearch(), this.search.removeClass("select2-active"), this.opts.element.trigger(t.Event("select2-close"))
                }
            },
            externalSearch: function(t) {
                this.open(), this.search.val(t), this.updateResults(!1)
            },
            clearSearch: function() {},
            getMaximumSelectionSize: function() {
                return k(this.opts.maximumSelectionSize, this.opts.element)
            },
            ensureHighlightVisible: function() {
                var e, i, n, o, s, r, a, l, c = this.results;
                if (i = this.highlight(), !(i < 0)) {
                    if (0 == i) return void c.scrollTop(0);
                    e = this.findHighlightableChoices().find(".select2-result-label"), n = t(e[i]), l = (n.offset() || {}).top || 0, o = l + n.outerHeight(!0), i === e.length - 1 && (a = c.find("li.select2-more-results"), a.length > 0 && (o = a.offset().top + a.outerHeight(!0))), s = c.offset().top + c.outerHeight(!1), o > s && c.scrollTop(c.scrollTop() + (o - s)), r = l - c.offset().top, r < 0 && "none" != n.css("display") && c.scrollTop(c.scrollTop() + r)
                }
            },
            findHighlightableChoices: function() {
                return this.results.find(".select2-result-selectable:not(.select2-disabled):not(.select2-selected)")
            },
            moveHighlight: function(e) {
                for (var i = this.findHighlightableChoices(), n = this.highlight(); n > -1 && n < i.length;) {
                    n += e;
                    var o = t(i[n]);
                    if (o.hasClass("select2-result-selectable") && !o.hasClass("select2-disabled") && !o.hasClass("select2-selected")) {
                        this.highlight(n);
                        break
                    }
                }
            },
            highlight: function(e) {
                var i, n, s = this.findHighlightableChoices();
                return 0 === arguments.length ? o(s.filter(".select2-highlighted")[0], s.get()) : (e >= s.length && (e = s.length - 1), e < 0 && (e = 0), this.removeHighlight(), i = t(s[e]), i.addClass("select2-highlighted"), this.search.attr("aria-activedescendant", i.find(".select2-result-label").attr("id")), this.ensureHighlightVisible(), this.liveRegion.text(i.text()), n = i.data("select2-data"), void(n && this.opts.element.trigger({
                    type: "select2-highlight",
                    val: this.id(n),
                    choice: n
                })))
            },
            removeHighlight: function() {
                this.results.find(".select2-highlighted").removeClass("select2-highlighted")
            },
            touchMoved: function() {
                this._touchMoved = !0
            },
            clearTouchMoved: function() {
                this._touchMoved = !1
            },
            countSelectableResults: function() {
                return this.findHighlightableChoices().length
            },
            highlightUnderEvent: function(e) {
                var i = t(e.target).closest(".select2-result-selectable");
                if (i.length > 0 && !i.is(".select2-highlighted")) {
                    var n = this.findHighlightableChoices();
                    this.highlight(n.index(i))
                } else 0 == i.length && this.removeHighlight()
            },
            loadMoreIfNeeded: function() {
                var t, e = this.results,
                    i = e.find("li.select2-more-results"),
                    n = this.resultsPage + 1,
                    o = this,
                    s = this.search.val(),
                    r = this.context;
                0 !== i.length && (t = i.offset().top - e.offset().top - e.height(), t <= this.opts.loadMorePadding && (i.addClass("select2-active"), this.opts.query({
                    element: this.opts.element,
                    term: s,
                    page: n,
                    context: r,
                    matcher: this.opts.matcher,
                    callback: this.bind(function(t) {
                        o.opened() && (o.opts.populateResults.call(this, e, t.results, {
                            term: s,
                            page: n,
                            context: r
                        }), o.postprocessResults(t, !1, !1), t.more === !0 ? (i.detach().appendTo(e).html(o.opts.escapeMarkup(k(o.opts.formatLoadMore, o.opts.element, n + 1))), window.setTimeout(function() {
                            o.loadMoreIfNeeded()
                        }, 10)) : i.remove(), o.positionDropdown(), o.resultsPage = n, o.context = t.context, this.opts.element.trigger({
                            type: "select2-loaded",
                            items: t
                        }))
                    })
                })))
            },
            tokenize: function() {},
            updateResults: function(i) {
                function n() {
                    c.removeClass("select2-active"), d.positionDropdown(), u.find(".select2-no-results,.select2-selection-limit,.select2-searching").length ? d.liveRegion.text(u.text()) : d.liveRegion.text(d.opts.formatMatches(u.find('.select2-result-selectable:not(".select2-selected")').length))
                }

                function o(t) {
                    u.html(t), n()
                }
                var s, a, l, c = this.search,
                    u = this.results,
                    h = this.opts,
                    d = this,
                    p = c.val(),
                    f = t.data(this.container, "select2-last-term");
                if ((i === !0 || !f || !r(p, f)) && (t.data(this.container, "select2-last-term", p), i === !0 || this.showSearchInput !== !1 && this.opened())) {
                    l = ++this.queryCount;
                    var m = this.getMaximumSelectionSize();
                    if (m >= 1 && (s = this.data(), t.isArray(s) && s.length >= m && S(h.formatSelectionTooBig, "formatSelectionTooBig"))) return void o("<li class='select2-selection-limit'>" + k(h.formatSelectionTooBig, h.element, m) + "</li>");
                    if (c.val().length < h.minimumInputLength) return o(S(h.formatInputTooShort, "formatInputTooShort") ? "<li class='select2-no-results'>" + k(h.formatInputTooShort, h.element, c.val(), h.minimumInputLength) + "</li>" : ""), void(i && this.showSearch && this.showSearch(!0));
                    if (h.maximumInputLength && c.val().length > h.maximumInputLength) return void o(S(h.formatInputTooLong, "formatInputTooLong") ? "<li class='select2-no-results'>" + k(h.formatInputTooLong, h.element, c.val(), h.maximumInputLength) + "</li>" : "");
                    h.formatSearching && 0 === this.findHighlightableChoices().length && o("<li class='select2-searching'>" + k(h.formatSearching, h.element) + "</li>"), c.addClass("select2-active"), this.removeHighlight(), a = this.tokenize(), a != e && null != a && c.val(a), this.resultsPage = 1, h.query({
                        element: h.element,
                        term: c.val(),
                        page: this.resultsPage,
                        context: null,
                        matcher: h.matcher,
                        callback: this.bind(function(s) {
                            var a;
                            if (l == this.queryCount) {
                                if (!this.opened()) return void this.search.removeClass("select2-active");
                                if (s.hasError !== e && S(h.formatAjaxError, "formatAjaxError")) return void o("<li class='select2-ajax-error'>" + k(h.formatAjaxError, h.element, s.jqXHR, s.textStatus, s.errorThrown) + "</li>");
                                if (this.context = s.context === e ? null : s.context, this.opts.createSearchChoice && "" !== c.val() && (a = this.opts.createSearchChoice.call(d, c.val(), s.results), a !== e && null !== a && d.id(a) !== e && null !== d.id(a) && 0 === t(s.results).filter(function() {
                                        return r(d.id(this), d.id(a))
                                    }).length && this.opts.createSearchChoicePosition(s.results, a)), 0 === s.results.length && S(h.formatNoMatches, "formatNoMatches")) return void o("<li class='select2-no-results'>" + k(h.formatNoMatches, h.element, c.val()) + "</li>");
                                u.empty(), d.opts.populateResults.call(this, u, s.results, {
                                    term: c.val(),
                                    page: this.resultsPage,
                                    context: null
                                }), s.more === !0 && S(h.formatLoadMore, "formatLoadMore") && (u.append("<li class='select2-more-results'>" + h.escapeMarkup(k(h.formatLoadMore, h.element, this.resultsPage)) + "</li>"), window.setTimeout(function() {
                                    d.loadMoreIfNeeded()
                                }, 10)), this.postprocessResults(s, i), n(), this.opts.element.trigger({
                                    type: "select2-loaded",
                                    items: s
                                })
                            }
                        })
                    })
                }
            },
            cancel: function() {
                this.close()
            },
            blur: function() {
                this.opts.selectOnBlur && this.selectHighlighted({
                    noFocus: !0
                }), this.close(), this.container.removeClass("select2-container-active"), this.search[0] === document.activeElement && this.search.blur(), this.clearSearch(), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")
            },
            focusSearch: function() {
                p(this.search)
            },
            selectHighlighted: function(t) {
                if (this._touchMoved) return void this.clearTouchMoved();
                var e = this.highlight(),
                    i = this.results.find(".select2-highlighted"),
                    n = i.closest(".select2-result").data("select2-data");
                n ? (this.highlight(e), this.onSelect(n, t)) : t && t.noFocus && this.close()
            },
            getPlaceholder: function() {
                var t;
                return this.opts.element.attr("placeholder") || this.opts.element.attr("data-placeholder") || this.opts.element.data("placeholder") || this.opts.placeholder || ((t = this.getPlaceholderOption()) !== e ? t.text() : e)
            },
            getPlaceholderOption: function() {
                if (this.select) {
                    var i = this.select.children("option").first();
                    if (this.opts.placeholderOption !== e) return "first" === this.opts.placeholderOption && i || "function" == typeof this.opts.placeholderOption && this.opts.placeholderOption(this.select);
                    if ("" === t.trim(i.text()) && "" === i.val()) return i
                }
            },
            initContainerWidth: function() {
                function i() {
                    var i, n, o, s, r, a;
                    if ("off" === this.opts.width) return null;
                    if ("element" === this.opts.width) return 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px";
                    if ("copy" === this.opts.width || "resolve" === this.opts.width) {
                        if (i = this.opts.element.attr("style"), i !== e)
                            for (n = i.split(";"), s = 0, r = n.length; s < r; s += 1)
                                if (a = n[s].replace(/\s/g, ""), o = a.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i), null !== o && o.length >= 1) return o[1];
                        return "resolve" === this.opts.width ? (i = this.opts.element.css("width"), i.indexOf("%") > 0 ? i : 0 === this.opts.element.outerWidth(!1) ? "auto" : this.opts.element.outerWidth(!1) + "px") : null
                    }
                    return t.isFunction(this.opts.width) ? this.opts.width() : this.opts.width
                }
                var n = i.call(this);
                null !== n && this.container.css("width", n)
            }
        }), M = A(I, {
            createContainer: function() {
                var e = t(document.createElement("div")).attr({
                    "class": "select2-container"
                }).html(["<a href='javascript:void(0)' class='select2-choice' tabindex='-1'>", "   <span class='select2-chosen'>&#160;</span><abbr class='select2-search-choice-close'></abbr>", "   <span class='select2-arrow' role='presentation'><b role='presentation'></b></span>", "</a>", "<label for='' class='select2-offscreen'></label>", "<input class='select2-focusser select2-offscreen' type='text' aria-haspopup='true' role='button' />", "<div class='select2-drop select2-display-none'>", "   <div class='select2-search'>", "       <label for='' class='select2-offscreen'></label>", "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input' role='combobox' aria-expanded='true'", "       aria-autocomplete='list' />", "   </div>", "   <ul class='select2-results' role='listbox'>", "   </ul>", "</div>"].join(""));
                return e
            },
            enableInterface: function() {
                this.parent.enableInterface.apply(this, arguments) && this.focusser.prop("disabled", !this.isInterfaceEnabled())
            },
            opening: function() {
                var i, n, o;
                this.opts.minimumResultsForSearch >= 0 && this.showSearch(!0), this.parent.opening.apply(this, arguments), this.showSearchInput !== !1 && this.search.val(this.focusser.val()), this.opts.shouldFocusInput(this) && (this.search.focus(), i = this.search.get(0), i.createTextRange ? (n = i.createTextRange(), n.collapse(!1), n.select()) : i.setSelectionRange && (o = this.search.val().length, i.setSelectionRange(o, o))), "" === this.search.val() && this.nextSearchTerm != e && (this.search.val(this.nextSearchTerm), this.search.select()), this.focusser.prop("disabled", !0).val(""), this.updateResults(!0), this.opts.element.trigger(t.Event("select2-open"))
            },
            close: function() {
                this.opened() && (this.parent.close.apply(this, arguments), this.focusser.prop("disabled", !1), this.opts.shouldFocusInput(this) && this.focusser.focus())
            },
            focus: function() {
                this.opened() ? this.close() : (this.focusser.prop("disabled", !1), this.opts.shouldFocusInput(this) && this.focusser.focus())
            },
            isFocused: function() {
                return this.container.hasClass("select2-container-active")
            },
            cancel: function() {
                this.parent.cancel.apply(this, arguments), this.focusser.prop("disabled", !1), this.opts.shouldFocusInput(this) && this.focusser.focus()
            },
            destroy: function() {
                t("label[for='" + this.focusser.attr("id") + "']").attr("for", this.opts.element.attr("id")), this.parent.destroy.apply(this, arguments), E.call(this, "selection", "focusser")
            },
            initContainer: function() {
                var e, n, o = this.container,
                    s = this.dropdown,
                    r = $();
                this.opts.minimumResultsForSearch < 0 ? this.showSearch(!1) : this.showSearch(!0), this.selection = e = o.find(".select2-choice"), this.focusser = o.find(".select2-focusser"), e.find(".select2-chosen").attr("id", "select2-chosen-" + r), this.focusser.attr("aria-labelledby", "select2-chosen-" + r), this.results.attr("id", "select2-results-" + r), this.search.attr("aria-owns", "select2-results-" + r), this.focusser.attr("id", "s2id_autogen" + r), n = t("label[for='" + this.opts.element.attr("id") + "']"), this.opts.element.focus(this.bind(function() {
                    this.focus()
                })), this.focusser.prev().text(n.text()).attr("for", this.focusser.attr("id"));
                var a = this.opts.element.attr("title");
                this.opts.element.attr("title", a || n.text()), this.focusser.attr("tabindex", this.elementTabIndex), this.search.attr("id", this.focusser.attr("id") + "_search"), this.search.prev().text(t("label[for='" + this.focusser.attr("id") + "']").text()).attr("for", this.search.attr("id")), this.search.on("keydown", this.bind(function(t) {
                    if (this.isInterfaceEnabled() && 229 != t.keyCode) {
                        if (t.which === L.PAGE_UP || t.which === L.PAGE_DOWN) return void m(t);
                        switch (t.which) {
                            case L.UP:
                            case L.DOWN:
                                return this.moveHighlight(t.which === L.UP ? -1 : 1), void m(t);
                            case L.ENTER:
                                return this.selectHighlighted(), void m(t);
                            case L.TAB:
                                return void this.selectHighlighted({
                                    noFocus: !0
                                });
                            case L.ESC:
                                return this.cancel(t), void m(t)
                        }
                    }
                })), this.search.on("blur", this.bind(function(t) {
                    document.activeElement === this.body.get(0) && window.setTimeout(this.bind(function() {
                        this.opened() && this.search.focus()
                    }), 0)
                })), this.focusser.on("keydown", this.bind(function(t) {
                    if (this.isInterfaceEnabled() && t.which !== L.TAB && !L.isControl(t) && !L.isFunctionKey(t) && t.which !== L.ESC) {
                        if (this.opts.openOnEnter === !1 && t.which === L.ENTER) return void m(t);
                        if (t.which == L.DOWN || t.which == L.UP || t.which == L.ENTER && this.opts.openOnEnter) {
                            if (t.altKey || t.ctrlKey || t.shiftKey || t.metaKey) return;
                            return this.open(), void m(t)
                        }
                        return t.which == L.DELETE || t.which == L.BACKSPACE ? (this.opts.allowClear && this.clear(), void m(t)) : void 0
                    }
                })), c(this.focusser), this.focusser.on("keyup-change input", this.bind(function(t) {
                    if (this.opts.minimumResultsForSearch >= 0) {
                        if (t.stopPropagation(), this.opened()) return;
                        this.open()
                    }
                })), e.on("click touchstart", "abbr", this.bind(function(t) {
                    this.isInterfaceEnabled() && (this.clear(), g(t), this.close(), this.selection && this.selection.focus())
                })), e.on("click touchstart", this.bind(function(n) {
                    i(e), this.container.hasClass("select2-container-active") || this.opts.element.trigger(t.Event("select2-focus")), this.opened() ? this.close() : this.isInterfaceEnabled() && this.open(), m(n)
                })), s.on("click touchstart", this.bind(function() {
                    this.opts.shouldFocusInput(this) && this.search.focus()
                })), e.on("focus", this.bind(function(t) {
                    m(t)
                })), this.focusser.on("focus", this.bind(function() {
                    this.container.hasClass("select2-container-active") || this.opts.element.trigger(t.Event("select2-focus")), this.container.addClass("select2-container-active")
                })).on("blur", this.bind(function() {
                    this.opened() || (this.container.removeClass("select2-container-active"), this.opts.element.trigger(t.Event("select2-blur")))
                })), this.search.on("focus", this.bind(function() {
                    this.container.hasClass("select2-container-active") || this.opts.element.trigger(t.Event("select2-focus")), this.container.addClass("select2-container-active")
                })), this.initContainerWidth(), this.opts.element.hide(), this.setPlaceholder()
            },
            clear: function(e) {
                var i = this.selection.data("select2-data");
                if (i) {
                    var n = t.Event("select2-clearing");
                    if (this.opts.element.trigger(n), n.isDefaultPrevented()) return;
                    var o = this.getPlaceholderOption();
                    this.opts.element.val(o ? o.val() : ""), this.selection.find(".select2-chosen").empty(), this.selection.removeData("select2-data"), this.setPlaceholder(), e !== !1 && (this.opts.element.trigger({
                        type: "select2-removed",
                        val: this.id(i),
                        choice: i
                    }), this.triggerChange({
                        removed: i
                    }))
                }
            },
            initSelection: function() {
                if (this.isPlaceholderOptionSelected()) this.updateSelection(null), this.close(), this.setPlaceholder();
                else {
                    var t = this;
                    this.opts.initSelection.call(null, this.opts.element, function(i) {
                        i !== e && null !== i && (t.updateSelection(i), t.close(), t.setPlaceholder(), t.nextSearchTerm = t.opts.nextSearchTerm(i, t.search.val()))
                    })
                }
            },
            isPlaceholderOptionSelected: function() {
                var t;
                return this.getPlaceholder() !== e && ((t = this.getPlaceholderOption()) !== e && t.prop("selected") || "" === this.opts.element.val() || this.opts.element.val() === e || null === this.opts.element.val())
            },
            prepareOpts: function() {
                var e = this.parent.prepareOpts.apply(this, arguments),
                    i = this;
                return "select" === e.element.get(0).tagName.toLowerCase() ? e.initSelection = function(t, e) {
                    var n = t.find("option").filter(function() {
                        return this.selected && !this.disabled
                    });
                    e(i.optionToData(n))
                } : "data" in e && (e.initSelection = e.initSelection || function(i, n) {
                    var o = i.val(),
                        s = null;
                    e.query({
                        matcher: function(t, i, n) {
                            var a = r(o, e.id(n));
                            return a && (s = n), a
                        },
                        callback: t.isFunction(n) ? function() {
                            n(s)
                        } : t.noop
                    })
                }), e
            },
            getPlaceholder: function() {
                return this.select && this.getPlaceholderOption() === e ? e : this.parent.getPlaceholder.apply(this, arguments)
            },
            setPlaceholder: function() {
                var t = this.getPlaceholder();
                if (this.isPlaceholderOptionSelected() && t !== e) {
                    if (this.select && this.getPlaceholderOption() === e) return;
                    this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(t)), this.selection.addClass("select2-default"), this.container.removeClass("select2-allowclear")
                }
            },
            postprocessResults: function(t, e, i) {
                var n = 0,
                    o = this;
                if (this.findHighlightableChoices().each2(function(t, e) {
                        if (r(o.id(e.data("select2-data")), o.opts.element.val())) return n = t, !1
                    }), i !== !1 && (e === !0 && n >= 0 ? this.highlight(n) : this.highlight(0)), e === !0) {
                    var s = this.opts.minimumResultsForSearch;
                    s >= 0 && this.showSearch(T(t.results) >= s)
                }
            },
            showSearch: function(e) {
                this.showSearchInput !== e && (this.showSearchInput = e, this.dropdown.find(".select2-search").toggleClass("select2-search-hidden", !e), this.dropdown.find(".select2-search").toggleClass("select2-offscreen", !e), t(this.dropdown, this.container).toggleClass("select2-with-searchbox", e))
            },
            onSelect: function(t, e) {
                if (this.triggerSelect(t)) {
                    var i = this.opts.element.val(),
                        n = this.data();
                    this.opts.element.val(this.id(t)), this.updateSelection(t), this.opts.element.trigger({
                        type: "select2-selected",
                        val: this.id(t),
                        choice: t
                    }), this.nextSearchTerm = this.opts.nextSearchTerm(t, this.search.val()), this.close(), e && e.noFocus || !this.opts.shouldFocusInput(this) || this.focusser.focus(), r(i, this.id(t)) || this.triggerChange({
                        added: t,
                        removed: n
                    })
                }
            },
            updateSelection: function(t) {
                var i, n, o = this.selection.find(".select2-chosen");
                this.selection.data("select2-data", t), o.empty(), null !== t && (i = this.opts.formatSelection(t, o, this.opts.escapeMarkup)), i !== e && o.append(i), n = this.opts.formatSelectionCssClass(t, o), n !== e && o.addClass(n), this.selection.removeClass("select2-default"), this.opts.allowClear && this.getPlaceholder() !== e && this.container.addClass("select2-allowclear")
            },
            val: function() {
                var t, i = !1,
                    n = null,
                    o = this,
                    s = this.data();
                if (0 === arguments.length) return this.opts.element.val();
                if (t = arguments[0], arguments.length > 1 && (i = arguments[1]), this.select) this.select.val(t).find("option").filter(function() {
                    return this.selected
                }).each2(function(t, e) {
                    return n = o.optionToData(e), !1
                }), this.updateSelection(n), this.setPlaceholder(), i && this.triggerChange({
                    added: n,
                    removed: s
                });
                else {
                    if (!t && 0 !== t) return void this.clear(i);
                    if (this.opts.initSelection === e) throw new Error("cannot call val() if initSelection() is not defined");
                    this.opts.element.val(t), this.opts.initSelection(this.opts.element, function(t) {
                        o.opts.element.val(t ? o.id(t) : ""), o.updateSelection(t), o.setPlaceholder(), i && o.triggerChange({
                            added: t,
                            removed: s
                        })
                    })
                }
            },
            clearSearch: function() {
                this.search.val(""), this.focusser.val("")
            },
            data: function(t) {
                var i, n = !1;
                return 0 === arguments.length ? (i = this.selection.data("select2-data"), i == e && (i = null), i) : (arguments.length > 1 && (n = arguments[1]), void(t ? (i = this.data(), this.opts.element.val(t ? this.id(t) : ""), this.updateSelection(t), n && this.triggerChange({
                    added: t,
                    removed: i
                })) : this.clear(n)))
            }
        }), j = A(I, {
            createContainer: function() {
                var e = t(document.createElement("div")).attr({
                    "class": "select2-container select2-container-multi"
                }).html(["<ul class='select2-choices'>", "  <li class='select2-search-field'>", "    <label for='' class='select2-offscreen'></label>", "    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>", "  </li>", "</ul>", "<div class='select2-drop select2-drop-multi select2-display-none'>", "   <ul class='select2-results'>", "   </ul>", "</div>"].join(""));
                return e
            },
            prepareOpts: function() {
                var e = this.parent.prepareOpts.apply(this, arguments),
                    i = this;
                return "select" === e.element.get(0).tagName.toLowerCase() ? e.initSelection = function(t, e) {
                    var n = [];
                    t.find("option").filter(function() {
                        return this.selected && !this.disabled
                    }).each2(function(t, e) {
                        n.push(i.optionToData(e))
                    }), e(n)
                } : "data" in e && (e.initSelection = e.initSelection || function(i, n) {
                    var o = a(i.val(), e.separator, e.transformVal),
                        s = [];
                    e.query({
                        matcher: function(i, n, a) {
                            var l = t.grep(o, function(t) {
                                return r(t, e.id(a))
                            }).length;
                            return l && s.push(a), l
                        },
                        callback: t.isFunction(n) ? function() {
                            for (var t = [], i = 0; i < o.length; i++)
                                for (var a = o[i], l = 0; l < s.length; l++) {
                                    var c = s[l];
                                    if (r(a, e.id(c))) {
                                        t.push(c), s.splice(l, 1);
                                        break
                                    }
                                }
                            n(t)
                        } : t.noop
                    })
                }), e
            },
            selectChoice: function(t) {
                var e = this.container.find(".select2-search-choice-focus");
                e.length && t && t[0] == e[0] || (e.length && this.opts.element.trigger("choice-deselected", e), e.removeClass("select2-search-choice-focus"), t && t.length && (this.close(), t.addClass("select2-search-choice-focus"), this.opts.element.trigger("choice-selected", t)))
            },
            destroy: function() {
                t("label[for='" + this.search.attr("id") + "']").attr("for", this.opts.element.attr("id")), this.parent.destroy.apply(this, arguments), E.call(this, "searchContainer", "selection")
            },
            initContainer: function() {
                var e, i = ".select2-choices";
                this.searchContainer = this.container.find(".select2-search-field"), this.selection = e = this.container.find(i);
                var n = this;
                this.selection.on("click", ".select2-container:not(.select2-container-disabled) .select2-search-choice:not(.select2-locked)", function(e) {
                    n.search[0].focus(), n.selectChoice(t(this))
                }), this.search.attr("id", "s2id_autogen" + $()), this.search.prev().text(t("label[for='" + this.opts.element.attr("id") + "']").text()).attr("for", this.search.attr("id")), this.opts.element.focus(this.bind(function() {
                    this.focus()
                })), this.search.on("input paste", this.bind(function() {
                    this.search.attr("placeholder") && 0 == this.search.val().length || this.isInterfaceEnabled() && (this.opened() || this.open())
                })), this.search.attr("tabindex", this.elementTabIndex), this.keydowns = 0, this.search.on("keydown", this.bind(function(t) {
                    if (this.isInterfaceEnabled()) {
                        ++this.keydowns;
                        var i = e.find(".select2-search-choice-focus"),
                            n = i.prev(".select2-search-choice:not(.select2-locked)"),
                            o = i.next(".select2-search-choice:not(.select2-locked)"),
                            s = f(this.search);
                        if (i.length && (t.which == L.LEFT || t.which == L.RIGHT || t.which == L.BACKSPACE || t.which == L.DELETE || t.which == L.ENTER)) {
                            var r = i;
                            return t.which == L.LEFT && n.length ? r = n : t.which == L.RIGHT ? r = o.length ? o : null : t.which === L.BACKSPACE ? this.unselect(i.first()) && (this.search.width(10), r = n.length ? n : o) : t.which == L.DELETE ? this.unselect(i.first()) && (this.search.width(10),
                                r = o.length ? o : null) : t.which == L.ENTER && (r = null), this.selectChoice(r), m(t), void(r && r.length || this.open())
                        }
                        if ((t.which === L.BACKSPACE && 1 == this.keydowns || t.which == L.LEFT) && 0 == s.offset && !s.length) return this.selectChoice(e.find(".select2-search-choice:not(.select2-locked)").last()), void m(t);
                        if (this.selectChoice(null), this.opened()) switch (t.which) {
                            case L.UP:
                            case L.DOWN:
                                return this.moveHighlight(t.which === L.UP ? -1 : 1), void m(t);
                            case L.ENTER:
                                return this.selectHighlighted(), void m(t);
                            case L.TAB:
                                return this.selectHighlighted({
                                    noFocus: !0
                                }), void this.close();
                            case L.ESC:
                                return this.cancel(t), void m(t)
                        }
                        if (t.which !== L.TAB && !L.isControl(t) && !L.isFunctionKey(t) && t.which !== L.BACKSPACE && t.which !== L.ESC) {
                            if (t.which === L.ENTER) {
                                if (this.opts.openOnEnter === !1) return;
                                if (t.altKey || t.ctrlKey || t.shiftKey || t.metaKey) return
                            }
                            this.open(), t.which !== L.PAGE_UP && t.which !== L.PAGE_DOWN || m(t), t.which === L.ENTER && m(t)
                        }
                    }
                })), this.search.on("keyup", this.bind(function(t) {
                    this.keydowns = 0, this.resizeSearch()
                })), this.search.on("blur", this.bind(function(e) {
                    this.container.removeClass("select2-container-active"), this.search.removeClass("select2-focused"), this.selectChoice(null), this.opened() || this.clearSearch(), e.stopImmediatePropagation(), this.opts.element.trigger(t.Event("select2-blur"))
                })), this.container.on("click", i, this.bind(function(e) {
                    this.isInterfaceEnabled() && (t(e.target).closest(".select2-search-choice").length > 0 || (this.selectChoice(null), this.clearPlaceholder(), this.container.hasClass("select2-container-active") || this.opts.element.trigger(t.Event("select2-focus")), this.open(), this.focusSearch(), e.preventDefault()))
                })), this.container.on("focus", i, this.bind(function() {
                    this.isInterfaceEnabled() && (this.container.hasClass("select2-container-active") || this.opts.element.trigger(t.Event("select2-focus")), this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"), this.clearPlaceholder())
                })), this.initContainerWidth(), this.opts.element.hide(), this.clearSearch()
            },
            enableInterface: function() {
                this.parent.enableInterface.apply(this, arguments) && this.search.prop("disabled", !this.isInterfaceEnabled())
            },
            initSelection: function() {
                if ("" === this.opts.element.val() && "" === this.opts.element.text() && (this.updateSelection([]), this.close(), this.clearSearch()), this.select || "" !== this.opts.element.val()) {
                    var t = this;
                    this.opts.initSelection.call(null, this.opts.element, function(i) {
                        i !== e && null !== i && (t.updateSelection(i), t.close(), t.clearSearch())
                    })
                }
            },
            clearSearch: function() {
                var t = this.getPlaceholder(),
                    i = this.getMaxSearchWidth();
                t !== e && 0 === this.getVal().length && this.search.hasClass("select2-focused") === !1 ? (this.search.val(t).addClass("select2-default"), this.search.width(i > 0 ? i : this.container.css("width"))) : this.search.val("").width(10)
            },
            clearPlaceholder: function() {
                this.search.hasClass("select2-default") && this.search.val("").removeClass("select2-default")
            },
            opening: function() {
                this.clearPlaceholder(), this.resizeSearch(), this.parent.opening.apply(this, arguments), this.focusSearch(), "" === this.search.val() && this.nextSearchTerm != e && (this.search.val(this.nextSearchTerm), this.search.select()), this.updateResults(!0), this.opts.shouldFocusInput(this) && this.search.focus(), this.opts.element.trigger(t.Event("select2-open"))
            },
            close: function() {
                this.opened() && this.parent.close.apply(this, arguments)
            },
            focus: function() {
                this.close(), this.search.focus()
            },
            isFocused: function() {
                return this.search.hasClass("select2-focused")
            },
            updateSelection: function(e) {
                var i = [],
                    n = [],
                    s = this;
                t(e).each(function() {
                    o(s.id(this), i) < 0 && (i.push(s.id(this)), n.push(this))
                }), e = n, this.selection.find(".select2-search-choice").remove(), t(e).each(function() {
                    s.addSelectedChoice(this)
                }), s.postprocessResults()
            },
            tokenize: function() {
                var t = this.search.val();
                t = this.opts.tokenizer.call(this, t, this.data(), this.bind(this.onSelect), this.opts), null != t && t != e && (this.search.val(t), t.length > 0 && this.open())
            },
            onSelect: function(t, i) {
                this.triggerSelect(t) && "" !== t.text && (this.addSelectedChoice(t), this.opts.element.trigger({
                    type: "selected",
                    val: this.id(t),
                    choice: t
                }), this.nextSearchTerm = this.opts.nextSearchTerm(t, this.search.val()), this.clearSearch(), this.updateResults(), !this.select && this.opts.closeOnSelect || this.postprocessResults(t, !1, this.opts.closeOnSelect === !0), this.opts.closeOnSelect ? (this.close(), this.search.width(10)) : this.countSelectableResults() > 0 ? (this.search.width(10), this.resizeSearch(), this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize() ? this.updateResults(!0) : this.nextSearchTerm != e && (this.search.val(this.nextSearchTerm), this.updateResults(), this.search.select()), this.positionDropdown()) : (this.close(), this.search.width(10)), this.triggerChange({
                    added: t
                }), i && i.noFocus || this.focusSearch())
            },
            cancel: function() {
                this.close(), this.focusSearch()
            },
            addSelectedChoice: function(i) {
                var n, o, s = !i.locked,
                    r = t("<li class='select2-search-choice'>    <div></div>    <a href='#' class='select2-search-choice-close' tabindex='-1'></a></li>"),
                    a = t("<li class='select2-search-choice select2-locked'><div></div></li>"),
                    l = s ? r : a,
                    c = this.id(i),
                    u = this.getVal();
                n = this.opts.formatSelection(i, l.find("div"), this.opts.escapeMarkup), n != e && l.find("div").replaceWith(t("<div></div>").html(n)), o = this.opts.formatSelectionCssClass(i, l.find("div")), o != e && l.addClass(o), s && l.find(".select2-search-choice-close").on("mousedown", m).on("click dblclick", this.bind(function(e) {
                    this.isInterfaceEnabled() && (this.unselect(t(e.target)), this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"), m(e), this.close(), this.focusSearch())
                })).on("focus", this.bind(function() {
                    this.isInterfaceEnabled() && (this.container.addClass("select2-container-active"), this.dropdown.addClass("select2-drop-active"))
                })), l.data("select2-data", i), l.insertBefore(this.searchContainer), u.push(c), this.setVal(u)
            },
            unselect: function(e) {
                var i, n, s = this.getVal();
                if (e = e.closest(".select2-search-choice"), 0 === e.length) throw "Invalid argument: " + e + ". Must be .select2-search-choice";
                if (i = e.data("select2-data")) {
                    var r = t.Event("select2-removing");
                    if (r.val = this.id(i), r.choice = i, this.opts.element.trigger(r), r.isDefaultPrevented()) return !1;
                    for (;
                        (n = o(this.id(i), s)) >= 0;) s.splice(n, 1), this.setVal(s), this.select && this.postprocessResults();
                    return e.remove(), this.opts.element.trigger({
                        type: "select2-removed",
                        val: this.id(i),
                        choice: i
                    }), this.triggerChange({
                        removed: i
                    }), !0
                }
            },
            postprocessResults: function(t, e, i) {
                var n = this.getVal(),
                    s = this.results.find(".select2-result"),
                    r = this.results.find(".select2-result-with-children"),
                    a = this;
                s.each2(function(t, e) {
                    var i = a.id(e.data("select2-data"));
                    o(i, n) >= 0 && (e.addClass("select2-selected"), e.find(".select2-result-selectable").addClass("select2-selected"))
                }), r.each2(function(t, e) {
                    e.is(".select2-result-selectable") || 0 !== e.find(".select2-result-selectable:not(.select2-selected)").length || e.addClass("select2-selected")
                }), this.highlight() == -1 && i !== !1 && this.opts.closeOnSelect === !0 && a.highlight(0), !this.opts.createSearchChoice && !s.filter(".select2-result:not(.select2-selected)").length > 0 && (!t || t && !t.more && 0 === this.results.find(".select2-no-results").length) && S(a.opts.formatNoMatches, "formatNoMatches") && this.results.append("<li class='select2-no-results'>" + k(a.opts.formatNoMatches, a.opts.element, a.search.val()) + "</li>")
            },
            getMaxSearchWidth: function() {
                return this.selection.width() - l(this.search)
            },
            resizeSearch: function() {
                var t, e, i, n, o, s = l(this.search);
                t = v(this.search) + 10, e = this.search.offset().left, i = this.selection.width(), n = this.selection.offset().left, o = i - (e - n) - s, o < t && (o = i - s), o < 40 && (o = i - s), o <= 0 && (o = t), this.search.width(Math.floor(o))
            },
            getVal: function() {
                var t;
                return this.select ? (t = this.select.val(), null === t ? [] : t) : (t = this.opts.element.val(), a(t, this.opts.separator, this.opts.transformVal))
            },
            setVal: function(e) {
                var i;
                this.select ? this.select.val(e) : (i = [], t(e).each(function() {
                    o(this, i) < 0 && i.push(this)
                }), this.opts.element.val(0 === i.length ? "" : i.join(this.opts.separator)))
            },
            buildChangeDetails: function(t, e) {
                for (var e = e.slice(0), t = t.slice(0), i = 0; i < e.length; i++)
                    for (var n = 0; n < t.length; n++) r(this.opts.id(e[i]), this.opts.id(t[n])) && (e.splice(i, 1), i > 0 && i--, t.splice(n, 1), n--);
                return {
                    added: e,
                    removed: t
                }
            },
            val: function(i, n) {
                var o, s = this;
                if (0 === arguments.length) return this.getVal();
                if (o = this.data(), o.length || (o = []), !i && 0 !== i) return this.opts.element.val(""), this.updateSelection([]), this.clearSearch(), void(n && this.triggerChange({
                    added: this.data(),
                    removed: o
                }));
                if (this.setVal(i), this.select) this.opts.initSelection(this.select, this.bind(this.updateSelection)), n && this.triggerChange(this.buildChangeDetails(o, this.data()));
                else {
                    if (this.opts.initSelection === e) throw new Error("val() cannot be called if initSelection() is not defined");
                    this.opts.initSelection(this.opts.element, function(e) {
                        var i = t.map(e, s.id);
                        s.setVal(i), s.updateSelection(e), s.clearSearch(), n && s.triggerChange(s.buildChangeDetails(o, s.data()))
                    })
                }
                this.clearSearch()
            },
            onSortStart: function() {
                if (this.select) throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
                this.search.width(0), this.searchContainer.hide()
            },
            onSortEnd: function() {
                var e = [],
                    i = this;
                this.searchContainer.show(), this.searchContainer.appendTo(this.searchContainer.parent()), this.resizeSearch(), this.selection.find(".select2-search-choice").each(function() {
                    e.push(i.opts.id(t(this).data("select2-data")))
                }), this.setVal(e), this.triggerChange()
            },
            data: function(e, i) {
                var n, o, s = this;
                return 0 === arguments.length ? this.selection.children(".select2-search-choice").map(function() {
                    return t(this).data("select2-data")
                }).get() : (o = this.data(), e || (e = []), n = t.map(e, function(t) {
                    return s.opts.id(t)
                }), this.setVal(n), this.updateSelection(e), this.clearSearch(), i && this.triggerChange(this.buildChangeDetails(o, this.data())), void 0)
            }
        }), t.fn.select2 = function() {
            var i, n, s, r, a, l = Array.prototype.slice.call(arguments, 0),
                c = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "dropdown", "onSortStart", "onSortEnd", "enable", "disable", "readonly", "positionDropdown", "data", "search"],
                u = ["opened", "isFocused", "container", "dropdown"],
                h = ["val", "data"],
                d = {
                    search: "externalSearch"
                };
            return this.each(function() {
                if (0 === l.length || "object" == typeof l[0]) i = 0 === l.length ? {} : t.extend({}, l[0]), i.element = t(this), "select" === i.element.get(0).tagName.toLowerCase() ? a = i.element.prop("multiple") : (a = i.multiple || !1, "tags" in i && (i.multiple = a = !0)), n = a ? new window.Select2["class"].multi : new window.Select2["class"].single, n.init(i);
                else {
                    if ("string" != typeof l[0]) throw "Invalid arguments to select2 plugin: " + l;
                    if (o(l[0], c) < 0) throw "Unknown method: " + l[0];
                    if (r = e, n = t(this).data("select2"), n === e) return;
                    if (s = l[0], "container" === s ? r = n.container : "dropdown" === s ? r = n.dropdown : (d[s] && (s = d[s]), r = n[s].apply(n, l.slice(1))), o(l[0], u) >= 0 || o(l[0], h) >= 0 && 1 == l.length) return !1
                }
            }), r === e ? this : r
        }, t.fn.select2.defaults = {
            width: "copy",
            loadMorePadding: 0,
            closeOnSelect: !0,
            doNotFocusInput: !1,
            openOnEnter: !0,
            containerCss: {},
            dropdownCss: {},
            containerCssClass: "",
            dropdownCssClass: "",
            formatResult: function(t, e, i, n) {
                var o = [];
                return b(this.text(t), i.term, o, n), o.join("")
            },
            transformVal: function(e) {
                return t.trim(e)
            },
            formatSelection: function(t, i, n) {
                return t ? n(this.text(t)) : e
            },
            sortResults: function(t, e, i) {
                return t
            },
            formatResultCssClass: function(t) {
                return t.css
            },
            formatSelectionCssClass: function(t, i) {
                return e
            },
            minimumResultsForSearch: 0,
            minimumInputLength: 0,
            maximumInputLength: null,
            maximumSelectionSize: 0,
            id: function(t) {
                return t == e ? null : t.id
            },
            text: function(e) {
                return e && this.data && this.data.text ? t.isFunction(this.data.text) ? this.data.text(e) : e[this.data.text] : e.text
            },
            matcher: function(t, e) {
                return n("" + e).toUpperCase().indexOf(n("" + t).toUpperCase()) >= 0
            },
            separator: ",",
            tokenSeparators: [],
            tokenizer: D,
            escapeMarkup: w,
            blurOnChange: !1,
            selectOnBlur: !1,
            adaptContainerCssClass: function(t) {
                return t
            },
            adaptDropdownCssClass: function(t) {
                return null
            },
            nextSearchTerm: function(t, i) {
                return e
            },
            searchInputPlaceholder: "",
            createSearchChoicePosition: "top",
            shouldFocusInput: function(t) {
                if (t.opts.doNotFocusInput) return !1;
                var e = "ontouchstart" in window || navigator.msMaxTouchPoints > 0;
                return !e || !(t.opts.minimumResultsForSearch < 0)
            }
        }, t.fn.select2.locales = [], t.fn.select2.locales.en = {
            formatMatches: function(t) {
                return 1 === t ? "One result is available, press enter to select it." : t + " results are available, use up and down arrow keys to navigate."
            },
            formatNoMatches: function() {
                return "No matches found"
            },
            formatAjaxError: function(t, e, i) {
                return "Loading failed"
            },
            formatInputTooShort: function(t, e) {
                var i = e - t.length;
                return "Please enter " + i + " or more character" + (1 == i ? "" : "s")
            },
            formatInputTooLong: function(t, e) {
                var i = t.length - e;
                return "Please delete " + i + " character" + (1 == i ? "" : "s")
            },
            formatSelectionTooBig: function(t) {
                return "You can only select " + t + " item" + (1 == t ? "" : "s")
            },
            formatLoadMore: function(t) {
                return "Loading more resultsâ€¦"
            },
            formatSearching: function() {
                return "Searchingâ€¦"
            }
        }, t.extend(t.fn.select2.defaults, t.fn.select2.locales.en), t.fn.select2.ajaxDefaults = {
            transport: t.ajax,
            params: {
                type: "GET",
                cache: !1,
                dataType: "json"
            }
        }, window.Select2 = {
            query: {
                ajax: _,
                local: x,
                tags: C
            },
            util: {
                debounce: h,
                markMatch: b,
                escapeMarkup: w,
                stripDiacritics: n
            },
            "class": {
                "abstract": I,
                single: M,
                multi: j
            }
        }
    }
}(jQuery), $.fn.Select2SelectAll = function() {
        var t = $(this),
            e = t.find("option"),
            i = t.find("option:first-child"),
            n = t.select2("container");
        t.on("select2-opening", function() {
            var i = t.find("option:selected"),
                n = t.find('option:not(":selected"):not(":first-child")'),
                o = i.length,
                s = 3;
            "undefined" != typeof t.data("max-lengh") && "0" != t.data("max-lengh") && (s = t.data("max-lengh")), o == s ? n.attr("disabled", !0) : e.removeAttr("disabled"), t.trigger("change")
        }), t.on("change", function() {
            var e = t.find("option:selected").length;
            2 == e ? (n.find(".select2-search-choice").addClass("multi-2").removeClass("multi-3"), n.find(".select2-search-field").removeClass("full")) : 3 == e ? (n.find(".select2-search-choice").addClass("multi-3").removeClass("multi-2"), n.find(".select2-search-field").addClass("full")) : (n.find(".select2-search-choice").removeClass("multi-2 multi-3"), n.find(".select2-search-field").removeClass("full")), t.select2("container").find(".select2-search-choice").each(function() {
                $(this).attr("title", $(this).find("div").text())
            })
        }), $(document).on("ready", function() {
            var e = t.find("option:selected").length;
            2 == e ? (n.find(".select2-search-choice").addClass("multi-2").removeClass("multi-3"), n.find(".select2-search-field").removeClass("full")) : 3 == e ? (n.find(".select2-search-choice").addClass("multi-3").removeClass("multi-2"), n.find(".select2-search-field").addClass("full")) : (n.find(".select2-search-choice").removeClass("multi-2 multi-3"), n.find(".select2-search-field").removeClass("full")), t.select2("container").find(".select2-search-choice").each(function() {
                $(this).attr("title", $(this).find("div").text())
            })
        }), t.on("select2-close", function() {
            i.is(":checked") && t.select2("val", "-1")
        }), t.on("select2-open", function() {
            i.is(":checked") && t.select2("val", "")
        })
    }, $.fn.select2FullScreen = function() {
        var t = $(this);
        if (t.siblings(".select2-container").find(".select2-search-field input").attr("autocomplete", "new-password"), t.on("change", function(e) {
                "undefined" != typeof e.added && t.select2("val", e.added.id), setTimeout(function() {
                    t.siblings(".select2-container").find(":focus").blur()
                }, 10)
            }), $("body, html").on("touchmove", ".select2-drop", function(t) {
                $("body").hasClass("touchmove-locked") && t.preventDefault()
            }), $("body, html").on("touchmove", ".select2-results", function(t) {
                $("body").hasClass("touchmove-locked") && t.stopPropagation()
            }), $("body").width() < 768) {
            var e = 0,
                i = $("#search-widget-wrapper").offset().top;
            t.on("select2-opening", function() {
                $("body").addClass("touchmove-locked "), $("body,html").animate({
                    scrollTop: e
                }, 300), setTimeout(function() {
                    $(".close-search-dropdown").fadeIn("fast")
                }, 300), $("html,body").css({
                    overflow: "hidden"
                })
            }), t.on("select2-close", function() {
                $("html,body").css({
                    overflow: "auto"
                }), $("body").removeClass("touchmove-locked"), $("body,html").animate({
                    scrollTop: i
                }, 300), $(".close-search-dropdown").hide(), $(".select2-drop__close").length > 0 && $(".select2-drop__close").remove()
            }), t.on("select2-open", function(e) {
                var i = t.select2("data").id,
                    n = $(".select2-result"),
                    o = $(".select2-drop");
                n.each(function() {
                    var t = $(this),
                        e = t.data("select2Data").id;
                    e === i ? t.addClass("selected") : t.removeClass("selected")
                }), o.append('<i class="fa fa-long-arrow-left select2-drop__close"></i>'), $(".select2-drop__close").click(function() {
                    t.select2("close")
                })
            }), $(".select2-search").click(function() {
                $(this).find(".select2-input").focus()
            });
            var n = $(window).outerHeight(),
                o = n - 60;
            $(".select2-drop-multi").css({
                height: n,
                marginTop: -52
            }), $(".select2-drop-multi .select2-results").css({
                maxHeight: o
            })
        }
    },
    function(t) {
        var e = function() {
                "use strict";
                return {
                    isMsie: function() {
                        return !!/(msie|trident)/i.test(navigator.userAgent) && navigator.userAgent.match(/(msie |rv:)(\d+(.\d+)?)/i)[2]
                    },
                    isBlankString: function(t) {
                        return !t || /^\s*$/.test(t)
                    },
                    escapeRegExChars: function(t) {
                        return t.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                    },
                    isString: function(t) {
                        return "string" == typeof t
                    },
                    isNumber: function(t) {
                        return "number" == typeof t
                    },
                    isArray: t.isArray,
                    isFunction: t.isFunction,
                    isObject: t.isPlainObject,
                    isUndefined: function(t) {
                        return "undefined" == typeof t
                    },
                    toStr: function(t) {
                        return e.isUndefined(t) || null === t ? "" : t + ""
                    },
                    bind: t.proxy,
                    each: function(e, i) {
                        function n(t, e) {
                            return i(e, t)
                        }
                        t.each(e, n)
                    },
                    map: t.map,
                    filter: t.grep,
                    every: function(e, i) {
                        var n = !0;
                        return e ? (t.each(e, function(t, o) {
                            if (!(n = i.call(null, o, t, e))) return !1
                        }), !!n) : n
                    },
                    some: function(e, i) {
                        var n = !1;
                        return e ? (t.each(e, function(t, o) {
                            if (n = i.call(null, o, t, e)) return !1
                        }), !!n) : n
                    },
                    mixin: t.extend,
                    getUniqueId: function() {
                        var t = 0;
                        return function() {
                            return t++
                        }
                    }(),
                    templatify: function(e) {
                        function i() {
                            return String(e)
                        }
                        return t.isFunction(e) ? e : i
                    },
                    defer: function(t) {
                        setTimeout(t, 0)
                    },
                    debounce: function(t, e, i) {
                        var n, o;
                        return function() {
                            var s, r, a = this,
                                l = arguments;
                            return s = function() {
                                n = null, i || (o = t.apply(a, l))
                            }, r = i && !n, clearTimeout(n), n = setTimeout(s, e), r && (o = t.apply(a, l)), o
                        }
                    },
                    throttle: function(t, e) {
                        var i, n, o, s, r, a;
                        return r = 0, a = function() {
                                r = new Date, o = null, s = t.apply(i, n)
                            },
                            function() {
                                var l = new Date,
                                    c = e - (l - r);
                                return i = this, n = arguments, c <= 0 ? (clearTimeout(o), o = null, r = l, s = t.apply(i, n)) : o || (o = setTimeout(a, c)), s
                            }
                    },
                    noop: function() {}
                }
            }(),
            i = "0.10.5",
            n = function() {
                "use strict";

                function t(t) {
                    return t = e.toStr(t), t ? t.split(/\s+/) : []
                }

                function i(t) {
                    return t = e.toStr(t), t ? t.split(/\W+/) : []
                }

                function n(t) {
                    return function() {
                        var i = [].slice.call(arguments, 0);
                        return function(n) {
                            var o = [];
                            return e.each(i, function(i) {
                                o = o.concat(t(e.toStr(n[i])))
                            }), o
                        }
                    }
                }
                return {
                    nonword: i,
                    whitespace: t,
                    obj: {
                        nonword: n(i),
                        whitespace: n(t)
                    }
                }
            }(),
            o = function() {
                "use strict";

                function i(i) {
                    this.maxSize = e.isNumber(i) ? i : 100, this.reset(), this.maxSize <= 0 && (this.set = this.get = t.noop)
                }

                function n() {
                    this.head = this.tail = null
                }

                function o(t, e) {
                    this.key = t, this.val = e, this.prev = this.next = null
                }
                return e.mixin(i.prototype, {
                    set: function(t, e) {
                        var i, n = this.list.tail;
                        this.size >= this.maxSize && (this.list.remove(n), delete this.hash[n.key]), (i = this.hash[t]) ? (i.val = e, this.list.moveToFront(i)) : (i = new o(t, e), this.list.add(i), this.hash[t] = i, this.size++)
                    },
                    get: function(t) {
                        var e = this.hash[t];
                        if (e) return this.list.moveToFront(e), e.val
                    },
                    reset: function() {
                        this.size = 0, this.hash = {}, this.list = new n
                    }
                }), e.mixin(n.prototype, {
                    add: function(t) {
                        this.head && (t.next = this.head, this.head.prev = t), this.head = t, this.tail = this.tail || t
                    },
                    remove: function(t) {
                        t.prev ? t.prev.next = t.next : this.head = t.next, t.next ? t.next.prev = t.prev : this.tail = t.prev
                    },
                    moveToFront: function(t) {
                        this.remove(t), this.add(t)
                    }
                }), i
            }(),
            s = function() {
                "use strict";

                function t(t) {
                    this.prefix = ["__", t, "__"].join(""), this.ttlKey = "__ttl__", this.keyMatcher = new RegExp("^" + e.escapeRegExChars(this.prefix))
                }

                function i() {
                    return (new Date).getTime()
                }

                function n(t) {
                    return JSON.stringify(e.isUndefined(t) ? null : t)
                }

                function o(t) {
                    return JSON.parse(t)
                }
                var s, r;
                try {
                    s = window.localStorage, s.setItem("~~~", "!"), s.removeItem("~~~")
                } catch (a) {
                    s = null
                }
                return r = s && window.JSON ? {
                    _prefix: function(t) {
                        return this.prefix + t
                    },
                    _ttlKey: function(t) {
                        return this._prefix(t) + this.ttlKey
                    },
                    get: function(t) {
                        return this.isExpired(t) && this.remove(t), o(s.getItem(this._prefix(t)))
                    },
                    set: function(t, o, r) {
                        return e.isNumber(r) ? s.setItem(this._ttlKey(t), n(i() + r)) : s.removeItem(this._ttlKey(t)), s.setItem(this._prefix(t), n(o))
                    },
                    remove: function(t) {
                        return s.removeItem(this._ttlKey(t)), s.removeItem(this._prefix(t)), this
                    },
                    clear: function() {
                        var t, e, i = [],
                            n = s.length;
                        for (t = 0; t < n; t++)(e = s.key(t)).match(this.keyMatcher) && i.push(e.replace(this.keyMatcher, ""));
                        for (t = i.length; t--;) this.remove(i[t]);
                        return this
                    },
                    isExpired: function(t) {
                        var n = o(s.getItem(this._ttlKey(t)));
                        return !!(e.isNumber(n) && i() > n)
                    }
                } : {
                    get: e.noop,
                    set: e.noop,
                    remove: e.noop,
                    clear: e.noop,
                    isExpired: e.noop
                }, e.mixin(t.prototype, r), t
            }(),
            r = function() {
                "use strict";

                function i(e) {
                    e = e || {}, this.cancelled = !1, this.lastUrl = null, this._send = e.transport ? n(e.transport) : t.ajax, this._get = e.rateLimiter ? e.rateLimiter(this._get) : this._get, this._cache = e.cache === !1 ? new o(0) : l
                }

                function n(i) {
                    return function(n, o) {
                        function s(t) {
                            e.defer(function() {
                                a.resolve(t)
                            })
                        }

                        function r(t) {
                            e.defer(function() {
                                a.reject(t)
                            })
                        }
                        var a = t.Deferred();
                        return i(n, o, s, r), a
                    }
                }
                var s = 0,
                    r = {},
                    a = 6,
                    l = new o(10);
                return i.setMaxPendingRequests = function(t) {
                    a = t
                }, i.resetCache = function() {
                    l.reset()
                }, e.mixin(i.prototype, {
                    _get: function(t, e, i) {
                        function n(e) {
                            i && i(null, e), u._cache.set(t, e)
                        }

                        function o() {
                            i && i(!0)
                        }

                        function l() {
                            s--, delete r[t], u.onDeckRequestArgs && (u._get.apply(u, u.onDeckRequestArgs), u.onDeckRequestArgs = null)
                        }
                        var c, u = this;
                        this.cancelled || t !== this.lastUrl || ((c = r[t]) ? c.done(n).fail(o) : s < a ? (s++, r[t] = this._send(t, e).done(n).fail(o).always(l)) : this.onDeckRequestArgs = [].slice.call(arguments, 0))
                    },
                    get: function(t, i, n) {
                        var o;
                        return e.isFunction(i) && (n = i, i = {}), this.cancelled = !1, this.lastUrl = t, (o = this._cache.get(t)) ? e.defer(function() {
                            n && n(null, o)
                        }) : this._get(t, i, n), !!o
                    },
                    cancel: function() {
                        this.cancelled = !0
                    }
                }), i
            }(),
            a = function() {
                "use strict";

                function i(e) {
                    e = e || {}, e.datumTokenizer && e.queryTokenizer || t.error("datumTokenizer and queryTokenizer are both required"), this.datumTokenizer = e.datumTokenizer, this.queryTokenizer = e.queryTokenizer, this.reset()
                }

                function n(t) {
                    return t = e.filter(t, function(t) {
                        return !!t
                    }), t = e.map(t, function(t) {
                        return t.toLowerCase()
                    })
                }

                function o() {
                    return {
                        ids: [],
                        children: {}
                    }
                }

                function s(t) {
                    for (var e = {}, i = [], n = 0, o = t.length; n < o; n++) e[t[n]] || (e[t[n]] = !0, i.push(t[n]));
                    return i
                }

                function r(t, e) {
                    function i(t, e) {
                        return t - e
                    }
                    var n = 0,
                        o = 0,
                        s = [];
                    t = t.sort(i), e = e.sort(i);
                    for (var r = t.length, a = e.length; n < r && o < a;) t[n] < e[o] ? n++ : t[n] > e[o] ? o++ : (s.push(t[n]), n++, o++);
                    return s
                }
                return e.mixin(i.prototype, {
                    bootstrap: function(t) {
                        this.datums = t.datums, this.trie = t.trie
                    },
                    add: function(t) {
                        var i = this;
                        t = e.isArray(t) ? t : [t], e.each(t, function(t) {
                            var s, r;
                            s = i.datums.push(t) - 1, r = n(i.datumTokenizer(t)), e.each(r, function(t) {
                                var e, n, r;
                                for (e = i.trie, n = t.split(""); r = n.shift();) e = e.children[r] || (e.children[r] = o()), e.ids.push(s)
                            })
                        })
                    },
                    get: function(t) {
                        var i, o, a = this;
                        return i = n(this.queryTokenizer(t)), e.each(i, function(t) {
                            var e, i, n, s;
                            if (o && 0 === o.length) return !1;
                            for (e = a.trie, i = t.split(""); e && (n = i.shift());) e = e.children[n];
                            return e && 0 === i.length ? (s = e.ids.slice(0), void(o = o ? r(o, s) : s)) : (o = [], !1)
                        }), o ? e.map(s(o), function(t) {
                            return a.datums[t]
                        }) : []
                    },
                    reset: function() {
                        this.datums = [], this.trie = o()
                    },
                    serialize: function() {
                        return {
                            datums: this.datums,
                            trie: this.trie
                        }
                    }
                }), i
            }(),
            l = function() {
                "use strict";

                function n(t) {
                    return t.local || null
                }

                function o(n) {
                    var o, s;
                    return s = {
                        url: null,
                        thumbprint: "",
                        ttl: 864e5,
                        filter: null,
                        ajax: {}
                    }, (o = n.prefetch || null) && (o = e.isString(o) ? {
                        url: o
                    } : o, o = e.mixin(s, o), o.thumbprint = i + o.thumbprint, o.ajax.type = o.ajax.type || "GET", o.ajax.dataType = o.ajax.dataType || "json", !o.url && t.error("prefetch requires url to be set")), o
                }

                function s(i) {
                    function n(t) {
                        return function(i) {
                            return e.debounce(i, t)
                        }
                    }

                    function o(t) {
                        return function(i) {
                            return e.throttle(i, t)
                        }
                    }
                    var s, r;
                    return r = {
                        url: null,
                        cache: !0,
                        wildcard: "%QUERY",
                        replace: null,
                        rateLimitBy: "debounce",
                        rateLimitWait: 300,
                        send: null,
                        filter: null,
                        ajax: {}
                    }, (s = i.remote || null) && (s = e.isString(s) ? {
                        url: s
                    } : s, s = e.mixin(r, s), s.rateLimiter = /^throttle$/i.test(s.rateLimitBy) ? o(s.rateLimitWait) : n(s.rateLimitWait), s.ajax.type = s.ajax.type || "GET", s.ajax.dataType = s.ajax.dataType || "json", delete s.rateLimitBy, delete s.rateLimitWait, !s.url && t.error("remote requires url to be set")), s
                }
                return {
                    local: n,
                    prefetch: o,
                    remote: s
                }
            }();
        ! function(i) {
            "use strict";

            function o(e) {
                e && (e.local || e.prefetch || e.remote) || t.error("one of local, prefetch, or remote is required"), this.limit = e.limit || 5, this.sorter = c(e.sorter), this.dupDetector = e.dupDetector || u, this.local = l.local(e), this.prefetch = l.prefetch(e), this.remote = l.remote(e), this.cacheKey = this.prefetch ? this.prefetch.cacheKey || this.prefetch.url : null, this.index = new a({
                    datumTokenizer: e.datumTokenizer,
                    queryTokenizer: e.queryTokenizer
                }), this.storage = this.cacheKey ? new s(this.cacheKey) : null
            }

            function c(t) {
                function i(e) {
                    return e.sort(t)
                }

                function n(t) {
                    return t
                }
                return e.isFunction(t) ? i : n
            }

            function u() {
                return !1
            }
            var h, d;
            return h = i.Bloodhound, d = {
                data: "data",
                protocol: "protocol",
                thumbprint: "thumbprint"
            }, i.Bloodhound = o, o.noConflict = function() {
                return i.Bloodhound = h, o
            }, o.tokenizers = n, e.mixin(o.prototype, {
                _loadPrefetch: function(e) {
                    function i(t) {
                        s.clear(), s.add(e.filter ? e.filter(t) : t), s._saveToStorage(s.index.serialize(), e.thumbprint, e.ttl)
                    }
                    var n, o, s = this;
                    return (n = this._readFromStorage(e.thumbprint)) ? (this.index.bootstrap(n), o = t.Deferred().resolve()) : o = t.ajax(e.url, e.ajax).done(i), o
                },
                _getFromRemote: function(t, e) {
                    function i(t, i) {
                        e(t ? [] : s.remote.filter ? s.remote.filter(i) : i)
                    }
                    var n, o, s = this;
                    if (this.transport) return t = t || "", o = encodeURIComponent(t), n = this.remote.replace ? this.remote.replace(this.remote.url, t) : this.remote.url.replace(this.remote.wildcard, o), this.transport.get(n, this.remote.ajax, i)
                },
                _cancelLastRemoteRequest: function() {
                    this.transport && this.transport.cancel()
                },
                _saveToStorage: function(t, e, i) {
                    this.storage && (this.storage.set(d.data, t, i), this.storage.set(d.protocol, location.protocol, i), this.storage.set(d.thumbprint, e, i))
                },
                _readFromStorage: function(t) {
                    var e, i = {};
                    return this.storage && (i.data = this.storage.get(d.data), i.protocol = this.storage.get(d.protocol), i.thumbprint = this.storage.get(d.thumbprint)), e = i.thumbprint !== t || i.protocol !== location.protocol, i.data && !e ? i.data : null
                },
                _initialize: function() {
                    function i() {
                        o.add(e.isFunction(s) ? s() : s)
                    }
                    var n, o = this,
                        s = this.local;
                    return n = this.prefetch ? this._loadPrefetch(this.prefetch) : t.Deferred().resolve(), s && n.done(i), this.transport = this.remote ? new r(this.remote) : null, this.initPromise = n.promise()
                },
                initialize: function(t) {
                    return !this.initPromise || t ? this._initialize() : this.initPromise
                },
                add: function(t) {
                    this.index.add(t)
                },
                get: function(t, i) {
                    function n(t) {
                        var n = s.slice(0);
                        e.each(t, function(t) {
                            var i;
                            return i = e.some(n, function(e) {
                                return o.dupDetector(t, e)
                            }), !i && n.push(t), n.length < o.limit
                        }), i && i(o.sorter(n))
                    }
                    var o = this,
                        s = [],
                        r = !1;
                    s = this.index.get(t), s = this.sorter(s).slice(0, this.limit), s.length < this.limit ? r = this._getFromRemote(t, n) : this._cancelLastRemoteRequest(), r || (s.length > 0 || !this.transport) && i && i(s)
                },
                clear: function() {
                    this.index.reset()
                },
                clearPrefetchCache: function() {
                    this.storage && this.storage.clear()
                },
                clearRemoteCache: function() {
                    this.transport && r.resetCache()
                },
                ttAdapter: function() {
                    return e.bind(this.get, this)
                }
            }), o
        }(this);
        var c = function() {
                return {
                    wrapper: '<span class="twitter-typeahead"></span>',
                    dropdown: '<span class="tt-dropdown-menu"></span>',
                    dataset: '<div class="tt-dataset-%CLASS%"></div>',
                    suggestions: '<span class="tt-suggestions"></span>',
                    suggestion: '<div class="tt-suggestion"></div>'
                }
            }(),
            u = function() {
                "use strict";
                var t = {
                    wrapper: {
                        position: "relative",
                        display: "block"
                    },
                    hint: {
                        position: "absolute",
                        top: "0",
                        left: "0",
                        borderColor: "transparent",
                        boxShadow: "none",
                        opacity: "1"
                    },
                    input: {
                        position: "relative",
                        verticalAlign: "top",
                        backgroundColor: "transparent"
                    },
                    inputWithNoHint: {
                        position: "relative",
                        verticalAlign: "top"
                    },
                    dropdown: {
                        position: "absolute",
                        top: "100%",
                        left: "0",
                        zIndex: "100",
                        display: "none"
                    },
                    suggestions: {
                        display: "block"
                    },
                    suggestion: {
                        whiteSpace: "nowrap",
                        cursor: "pointer"
                    },
                    suggestionChild: {
                        whiteSpace: "normal"
                    },
                    ltr: {
                        left: "0",
                        right: "auto"
                    },
                    rtl: {
                        left: "auto",
                        right: " 0"
                    }
                };
                return e.isMsie() && e.mixin(t.input, {
                    backgroundImage: "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7)"
                }), e.isMsie() && e.isMsie() <= 7 && e.mixin(t.input, {
                    marginTop: "-1px"
                }), t
            }(),
            h = function() {
                "use strict";

                function i(e) {
                    e && e.el || t.error("EventBus initialized without el"), this.$el = t(e.el)
                }
                var n = "typeahead:";
                return e.mixin(i.prototype, {
                    trigger: function(t) {
                        var e = [].slice.call(arguments, 1);
                        this.$el.trigger(n + t, e)
                    }
                }), i
            }(),
            d = function() {
                "use strict";

                function t(t, e, i, n) {
                    var o;
                    if (!i) return this;
                    for (e = e.split(l), i = n ? a(i, n) : i, this._callbacks = this._callbacks || {}; o = e.shift();) this._callbacks[o] = this._callbacks[o] || {
                        sync: [],
                        async: []
                    }, this._callbacks[o][t].push(i);
                    return this
                }

                function e(e, i, n) {
                    return t.call(this, "async", e, i, n)
                }

                function i(e, i, n) {
                    return t.call(this, "sync", e, i, n)
                }

                function n(t) {
                    var e;
                    if (!this._callbacks) return this;
                    for (t = t.split(l); e = t.shift();) delete this._callbacks[e];
                    return this
                }

                function o(t) {
                    var e, i, n, o, r;
                    if (!this._callbacks) return this;
                    for (t = t.split(l), n = [].slice.call(arguments, 1);
                        (e = t.shift()) && (i = this._callbacks[e]);) o = s(i.sync, this, [e].concat(n)), r = s(i.async, this, [e].concat(n)), o() && c(r);
                    return this
                }

                function s(t, e, i) {
                    function n() {
                        for (var n, o = 0, s = t.length; !n && o < s; o += 1) n = t[o].apply(e, i) === !1;
                        return !n
                    }
                    return n
                }

                function r() {
                    var t;
                    return t = window.setImmediate ? function(t) {
                        setImmediate(function() {
                            t()
                        })
                    } : function(t) {
                        setTimeout(function() {
                            t()
                        }, 0)
                    }
                }

                function a(t, e) {
                    return t.bind ? t.bind(e) : function() {
                        t.apply(e, [].slice.call(arguments, 0))
                    }
                }
                var l = /\s+/,
                    c = r();
                return {
                    onSync: i,
                    onAsync: e,
                    off: n,
                    trigger: o
                }
            }(),
            p = function(t) {
                "use strict";

                function i(t, i, n) {
                    for (var o, s = [], r = 0, a = t.length; r < a; r++) s.push(e.escapeRegExChars(t[r]));
                    return o = n ? "\\b(" + s.join("|") + ")\\b" : "(" + s.join("|") + ")", i ? new RegExp(o) : new RegExp(o, "i")
                }
                var n = {
                    node: null,
                    pattern: null,
                    tagName: "strong",
                    className: null,
                    wordsOnly: !1,
                    caseSensitive: !1
                };
                return function(o) {
                    function s(e) {
                        var i, n, s;
                        return (i = a.exec(e.data)) && (s = t.createElement(o.tagName), o.className && (s.className = o.className), n = e.splitText(i.index), n.splitText(i[0].length), s.appendChild(n.cloneNode(!0)), e.parentNode.replaceChild(s, n)), !!i
                    }

                    function r(t, e) {
                        for (var i, n = 3, o = 0; o < t.childNodes.length; o++) i = t.childNodes[o], i.nodeType === n ? o += e(i) ? 1 : 0 : r(i, e)
                    }
                    var a;
                    o = e.mixin({}, n, o), o.node && o.pattern && (o.pattern = e.isArray(o.pattern) ? o.pattern : [o.pattern], a = i(o.pattern, o.caseSensitive, o.wordsOnly), r(o.node, s))
                }
            }(window.document),
            f = function() {
                "use strict";

                function i(i) {
                    var o, s, a, l, c = this;
                    i = i || {}, i.input || t.error("input is missing"), o = e.bind(this._onBlur, this), s = e.bind(this._onFocus, this), a = e.bind(this._onKeydown, this), l = e.bind(this._onInput, this), this.$hint = t(i.hint), this.$input = t(i.input).on("blur.tt", o).on("focus.tt", s).on("keydown.tt", a), 0 === this.$hint.length && (this.setHint = this.getHint = this.clearHint = this.clearHintIfInvalid = e.noop), e.isMsie() ? this.$input.on("keydown.tt keypress.tt cut.tt paste.tt", function(t) {
                        r[t.which || t.keyCode] || e.defer(e.bind(c._onInput, c, t))
                    }) : this.$input.on("input.tt", l), this.query = this.$input.val(), this.$overflowHelper = n(this.$input)
                }

                function n(e) {
                    return t('<pre aria-hidden="true"></pre>').css({
                        position: "absolute",
                        visibility: "hidden",
                        whiteSpace: "pre",
                        fontFamily: e.css("font-family"),
                        fontSize: e.css("font-size"),
                        fontStyle: e.css("font-style"),
                        fontVariant: e.css("font-variant"),
                        fontWeight: e.css("font-weight"),
                        wordSpacing: e.css("word-spacing"),
                        letterSpacing: e.css("letter-spacing"),
                        textIndent: e.css("text-indent"),
                        textRendering: e.css("text-rendering"),
                        textTransform: e.css("text-transform")
                    }).insertAfter(e)
                }

                function o(t, e) {
                    return i.normalizeQuery(t) === i.normalizeQuery(e)
                }

                function s(t) {
                    return t.altKey || t.ctrlKey || t.metaKey || t.shiftKey
                }
                var r;
                return r = {
                    9: "tab",
                    27: "esc",
                    37: "left",
                    39: "right",
                    13: "enter",
                    38: "up",
                    40: "down"
                }, i.normalizeQuery = function(t) {
                    return (t || "").replace(/^\s*/g, "").replace(/\s{2,}/g, " ")
                }, e.mixin(i.prototype, d, {
                    _onBlur: function() {
                        this.resetInputValue(), this.trigger("blurred")
                    },
                    _onFocus: function() {
                        this.trigger("focused")
                    },
                    _onKeydown: function(t) {
                        var e = r[t.which || t.keyCode];
                        this._managePreventDefault(e, t), e && this._shouldTrigger(e, t) && this.trigger(e + "Keyed", t)
                    },
                    _onInput: function() {
                        this._checkInputValue()
                    },
                    _managePreventDefault: function(t, e) {
                        var i, n, o;
                        switch (t) {
                            case "tab":
                                n = this.getHint(), o = this.getInputValue(), i = n && n !== o && !s(e);
                                break;
                            case "up":
                            case "down":
                                i = !s(e);
                                break;
                            default:
                                i = !1
                        }
                        i && e.preventDefault()
                    },
                    _shouldTrigger: function(t, e) {
                        var i;
                        switch (t) {
                            case "tab":
                                i = !s(e);
                                break;
                            default:
                                i = !0
                        }
                        return i
                    },
                    _checkInputValue: function() {
                        var t, e, i;
                        t = this.getInputValue(), e = o(t, this.query), i = !!e && this.query.length !== t.length, this.query = t, e ? i && this.trigger("whitespaceChanged", this.query) : this.trigger("queryChanged", this.query)
                    },
                    focus: function() {
                        this.$input.focus()
                    },
                    blur: function() {
                        this.$input.blur()
                    },
                    getQuery: function() {
                        return this.query
                    },
                    setQuery: function(t) {
                        this.query = t
                    },
                    getInputValue: function() {
                        return this.$input.val()
                    },
                    setInputValue: function(t, e) {
                        this.$input.val(t), e ? this.clearHint() : this._checkInputValue()
                    },
                    resetInputValue: function() {
                        this.setInputValue(this.query, !0)
                    },
                    getHint: function() {
                        return this.$hint.val()
                    },
                    setHint: function(t) {
                        this.$hint.val(t)
                    },
                    clearHint: function() {
                        this.setHint("")
                    },
                    clearHintIfInvalid: function() {
                        var t, e, i, n;
                        t = this.getInputValue(), e = this.getHint(), i = t !== e && 0 === e.indexOf(t), n = "" !== t && i && !this.hasOverflow(), !n && this.clearHint()
                    },
                    getLanguageDirection: function() {
                        return (this.$input.css("direction") || "ltr").toLowerCase()
                    },
                    hasOverflow: function() {
                        var t = this.$input.width() - 2;
                        return this.$overflowHelper.text(this.getInputValue()), this.$overflowHelper.width() >= t
                    },
                    isCursorAtEnd: function() {
                        var t, i, n;
                        return t = this.$input.val().length, i = this.$input[0].selectionStart, e.isNumber(i) ? i === t : !document.selection || (n = document.selection.createRange(), n.moveStart("character", -t), t === n.text.length)
                    },
                    destroy: function() {
                        this.$hint.off(".tt"), this.$input.off(".tt"), this.$hint = this.$input = this.$overflowHelper = null
                    }
                }), i
            }(),
            m = function() {
                "use strict";

                function i(i) {
                    i = i || {}, i.templates = i.templates || {}, i.source || t.error("missing source"), i.name && !s(i.name) && t.error("invalid dataset name: " + i.name), this.query = null, this.highlight = !!i.highlight, this.name = i.name || e.getUniqueId(), this.source = i.source, this.displayFn = n(i.display || i.displayKey), this.templates = o(i.templates, this.displayFn), this.$el = t(c.dataset.replace("%CLASS%", this.name))
                }

                function n(t) {
                    function i(e) {
                        return e[t]
                    }
                    return t = t || "value", e.isFunction(t) ? t : i
                }

                function o(t, i) {
                    function n(t) {
                        return "<p>" + i(t) + "</p>"
                    }
                    return {
                        empty: t.empty && e.templatify(t.empty),
                        header: t.header && e.templatify(t.header),
                        footer: t.footer && e.templatify(t.footer),
                        suggestion: t.suggestion || n
                    }
                }

                function s(t) {
                    return /^[_a-zA-Z0-9-]+$/.test(t)
                }
                var r = "ttDataset",
                    a = "ttValue",
                    l = "ttDatum";
                return i.extractDatasetName = function(e) {
                    return t(e).data(r)
                }, i.extractValue = function(e) {
                    return t(e).data(a)
                }, i.extractDatum = function(e) {
                    return t(e).data(l)
                }, e.mixin(i.prototype, d, {
                    _render: function(i, n) {
                        function o() {
                            return m.templates.empty({
                                query: i,
                                isEmpty: !0
                            })
                        }

                        function s() {
                            function o(e) {
                                var i;
                                return i = t(c.suggestion).append(m.templates.suggestion(e)).data(r, m.name).data(a, m.displayFn(e)).data(l, e), i.children().each(function() {
                                    t(this).css(u.suggestionChild)
                                }), i
                            }
                            var s, h;
                            return s = t(c.suggestions).css(u.suggestions), h = e.map(n, o), s.append.apply(s, h), m.highlight && p({
                                className: "tt-highlight",
                                node: s[0],
                                pattern: i
                            }), s
                        }

                        function h() {
                            return m.templates.header({
                                query: i,
                                isEmpty: !f
                            })
                        }

                        function d() {
                            return m.templates.footer({
                                query: i,
                                isEmpty: !f
                            })
                        }
                        if (this.$el) {
                            var f, m = this;
                            this.$el.empty(), f = n && n.length, !f && this.templates.empty ? this.$el.html(o()).prepend(m.templates.header ? h() : null).append(m.templates.footer ? d() : null) : f && this.$el.html(s()).prepend(m.templates.header ? h() : null).append(m.templates.footer ? d() : null), this.trigger("rendered")
                        }
                    },
                    getRoot: function() {
                        return this.$el
                    },
                    update: function(t) {
                        function e(e) {
                            i.canceled || t !== i.query || i._render(t, e)
                        }
                        var i = this;
                        this.query = t, this.canceled = !1, this.source(t, e)
                    },
                    cancel: function() {
                        this.canceled = !0
                    },
                    clear: function() {
                        this.cancel(), this.$el.empty(), this.trigger("rendered")
                    },
                    isEmpty: function() {
                        return this.$el.is(":empty")
                    },
                    destroy: function() {
                        this.$el = null
                    }
                }), i
            }(),
            g = function() {
                "use strict";

                function i(i) {
                    var o, s, r, a = this;
                    i = i || {}, i.menu || t.error("menu is required"), this.isOpen = !1, this.isEmpty = !0, this.datasets = e.map(i.datasets, n), o = e.bind(this._onSuggestionClick, this), s = e.bind(this._onSuggestionMouseEnter, this), r = e.bind(this._onSuggestionMouseLeave, this), this.$menu = t(i.menu).on("click.tt", ".tt-suggestion", o).on("mouseenter.tt", ".tt-suggestion", s).on("mouseleave.tt", ".tt-suggestion", r), e.each(this.datasets, function(t) {
                        a.$menu.append(t.getRoot()), t.onSync("rendered", a._onRendered, a)
                    })
                }

                function n(t) {
                    return new m(t)
                }
                return e.mixin(i.prototype, d, {
                    _onSuggestionClick: function(e) {
                        this.trigger("suggestionClicked", t(e.currentTarget))
                    },
                    _onSuggestionMouseEnter: function(e) {
                        this._removeCursor(), this._setCursor(t(e.currentTarget), !0)
                    },
                    _onSuggestionMouseLeave: function() {
                        this._removeCursor()
                    },
                    _onRendered: function() {
                        function t(t) {
                            return t.isEmpty()
                        }
                        this.isEmpty = e.every(this.datasets, t), this.isEmpty ? this._hide() : this.isOpen && this._show(), this.trigger("datasetRendered")
                    },
                    _hide: function() {
                        this.$menu.hide()
                    },
                    _show: function() {
                        this.$menu.css("display", "block")
                    },
                    _getSuggestions: function() {
                        return this.$menu.find(".tt-suggestion")
                    },
                    _getCursor: function() {
                        return this.$menu.find(".tt-cursor").first()
                    },
                    _setCursor: function(t, e) {
                        t.first().addClass("tt-cursor"), !e && this.trigger("cursorMoved")
                    },
                    _removeCursor: function() {
                        this._getCursor().removeClass("tt-cursor")
                    },
                    _moveCursor: function(t) {
                        var e, i, n, o;
                        if (this.isOpen) {
                            if (i = this._getCursor(), e = this._getSuggestions(), this._removeCursor(), n = e.index(i) + t, n = (n + 1) % (e.length + 1) - 1, n === -1) return void this.trigger("cursorRemoved");
                            n < -1 && (n = e.length - 1), this._setCursor(o = e.eq(n)), this._ensureVisible(o)
                        }
                    },
                    _ensureVisible: function(t) {
                        var e, i, n, o;
                        e = t.position().top, i = e + t.outerHeight(!0), n = this.$menu.scrollTop(), o = this.$menu.height() + parseInt(this.$menu.css("paddingTop"), 10) + parseInt(this.$menu.css("paddingBottom"), 10), e < 0 ? this.$menu.scrollTop(n + e) : o < i && this.$menu.scrollTop(n + (i - o))
                    },
                    close: function() {
                        this.isOpen && (this.isOpen = !1, this._removeCursor(), this._hide(), this.trigger("closed"))
                    },
                    open: function() {
                        this.isOpen || (this.isOpen = !0, !this.isEmpty && this._show(), this.trigger("opened"))
                    },
                    setLanguageDirection: function(t) {
                        this.$menu.css("ltr" === t ? u.ltr : u.rtl)
                    },
                    moveCursorUp: function() {
                        this._moveCursor(-1)
                    },
                    moveCursorDown: function() {
                        this._moveCursor(1)
                    },
                    getDatumForSuggestion: function(t) {
                        var e = null;
                        return t.length && (e = {
                            raw: m.extractDatum(t),
                            value: m.extractValue(t),
                            datasetName: m.extractDatasetName(t)
                        }), e
                    },
                    getDatumForCursor: function() {
                        return this.getDatumForSuggestion(this._getCursor().first())
                    },
                    getDatumForTopSuggestion: function() {
                        return this.getDatumForSuggestion(this._getSuggestions().first())
                    },
                    update: function(t) {
                        function i(e) {
                            e.update(t)
                        }
                        e.each(this.datasets, i)
                    },
                    empty: function() {
                        function t(t) {
                            t.clear()
                        }
                        e.each(this.datasets, t), this.isEmpty = !0
                    },
                    isVisible: function() {
                        return this.isOpen && !this.isEmpty
                    },
                    destroy: function() {
                        function t(t) {
                            t.destroy()
                        }
                        this.$menu.off(".tt"), this.$menu = null, e.each(this.datasets, t)
                    }
                }), i
            }(),
            v = function() {
                "use strict";

                function i(i) {
                    var o, s, r;
                    i = i || {}, i.input || t.error("missing input"), this.isActivated = !1, this.autoselect = !!i.autoselect, this.minLength = e.isNumber(i.minLength) ? i.minLength : 1, this.$node = n(i.input, i.withHint), o = this.$node.find(".tt-dropdown-menu"), s = this.$node.find(".tt-input"), r = this.$node.find(".tt-hint"), s.on("blur.tt", function(t) {
                        var i, n, r;
                        i = document.activeElement, n = o.is(i), r = o.has(i).length > 0, e.isMsie() && (n || r) && (t.preventDefault(), t.stopImmediatePropagation(), e.defer(function() {
                            s.focus()
                        }))
                    }), o.on("mousedown.tt", function(t) {
                        t.preventDefault()
                    }), this.eventBus = i.eventBus || new h({
                        el: s
                    }), this.dropdown = new g({
                        menu: o,
                        datasets: i.datasets
                    }).onSync("suggestionClicked", this._onSuggestionClicked, this).onSync("cursorMoved", this._onCursorMoved, this).onSync("cursorRemoved", this._onCursorRemoved, this).onSync("opened", this._onOpened, this).onSync("closed", this._onClosed, this).onAsync("datasetRendered", this._onDatasetRendered, this), this.input = new f({
                        input: s,
                        hint: r
                    }).onSync("focused", this._onFocused, this).onSync("blurred", this._onBlurred, this).onSync("enterKeyed", this._onEnterKeyed, this).onSync("tabKeyed", this._onTabKeyed, this).onSync("escKeyed", this._onEscKeyed, this).onSync("upKeyed", this._onUpKeyed, this).onSync("downKeyed", this._onDownKeyed, this).onSync("leftKeyed", this._onLeftKeyed, this).onSync("rightKeyed", this._onRightKeyed, this).onSync("queryChanged", this._onQueryChanged, this).onSync("whitespaceChanged", this._onWhitespaceChanged, this), this._setLanguageDirection()
                }

                function n(e, i) {
                    var n, s, a, l;
                    n = t(e), s = t(c.wrapper).css(u.wrapper), a = t(c.dropdown).css(u.dropdown), l = n.clone().css(u.hint).css(o(n)), l.val("").removeData().addClass("tt-hint").removeAttr("id name placeholder required").prop("readonly", !0).attr({
                        autocomplete: "off",
                        spellcheck: "false",
                        tabindex: -1
                    }), n.data(r, {
                        dir: n.attr("dir"),
                        autocomplete: n.attr("autocomplete"),
                        spellcheck: n.attr("spellcheck"),
                        style: n.attr("style")
                    }), n.addClass("tt-input").attr({
                        autocomplete: "off",
                        spellcheck: !1
                    }).css(i ? u.input : u.inputWithNoHint);
                    try {
                        !n.attr("dir") && n.attr("dir", "auto")
                    } catch (h) {}
                    return n.wrap(s).parent().prepend(i ? l : null).append(a)
                }

                function o(t) {
                    return {
                        backgroundAttachment: t.css("background-attachment"),
                        backgroundClip: t.css("background-clip"),
                        backgroundColor: t.css("background-color"),
                        backgroundImage: t.css("background-image"),
                        backgroundOrigin: t.css("background-origin"),
                        backgroundPosition: t.css("background-position"),
                        backgroundRepeat: t.css("background-repeat"),
                        backgroundSize: t.css("background-size")
                    }
                }

                function s(t) {
                    var i = t.find(".tt-input");
                    e.each(i.data(r), function(t, n) {
                        e.isUndefined(t) ? i.removeAttr(n) : i.attr(n, t)
                    }), i.detach().removeData(r).removeClass("tt-input").insertAfter(t), t.remove()
                }
                var r = "ttAttrs";
                return e.mixin(i.prototype, {
                    _onSuggestionClicked: function(t, e) {
                        var i;
                        (i = this.dropdown.getDatumForSuggestion(e)) && this._select(i)
                    },
                    _onCursorMoved: function() {
                        var t = this.dropdown.getDatumForCursor();
                        this.input.setInputValue(t.value, !0), this.eventBus.trigger("cursorchanged", t.raw, t.datasetName)
                    },
                    _onCursorRemoved: function() {
                        this.input.resetInputValue(), this._updateHint()
                    },
                    _onDatasetRendered: function() {
                        this._updateHint()
                    },
                    _onOpened: function() {
                        this._updateHint(), this.eventBus.trigger("opened")
                    },
                    _onClosed: function() {
                        this.input.clearHint(), this.eventBus.trigger("closed")
                    },
                    _onFocused: function() {
                        this.isActivated = !0, this.dropdown.open()
                    },
                    _onBlurred: function() {
                        this.isActivated = !1, this.dropdown.empty(), this.dropdown.close()
                    },
                    _onEnterKeyed: function(t, e) {
                        var i, n;
                        i = this.dropdown.getDatumForCursor(), n = this.dropdown.getDatumForTopSuggestion(), i ? (this._select(i), e.preventDefault()) : this.autoselect && n && (this._select(n), e.preventDefault())
                    },
                    _onTabKeyed: function(t, e) {
                        var i;
                        (i = this.dropdown.getDatumForCursor()) ? (this._select(i), e.preventDefault()) : this._autocomplete(!0)
                    },
                    _onEscKeyed: function() {
                        this.dropdown.close(), this.input.resetInputValue()
                    },
                    _onUpKeyed: function() {
                        var t = this.input.getQuery();
                        this.dropdown.isEmpty && t.length >= this.minLength ? this.dropdown.update(t) : this.dropdown.moveCursorUp(), this.dropdown.open()
                    },
                    _onDownKeyed: function() {
                        var t = this.input.getQuery();
                        this.dropdown.isEmpty && t.length >= this.minLength ? this.dropdown.update(t) : this.dropdown.moveCursorDown(), this.dropdown.open()
                    },
                    _onLeftKeyed: function() {
                        "rtl" === this.dir && this._autocomplete()
                    },
                    _onRightKeyed: function() {
                        "ltr" === this.dir && this._autocomplete()
                    },
                    _onQueryChanged: function(t, e) {
                        this.input.clearHintIfInvalid(), e.length >= this.minLength ? this.dropdown.update(e) : this.dropdown.empty(), this.dropdown.open(), this._setLanguageDirection()
                    },
                    _onWhitespaceChanged: function() {
                        this._updateHint(), this.dropdown.open()
                    },
                    _setLanguageDirection: function() {
                        var t;
                        this.dir !== (t = this.input.getLanguageDirection()) && (this.dir = t, this.$node.css("direction", t), this.dropdown.setLanguageDirection(t))
                    },
                    _updateHint: function() {
                        var t, i, n, o, s, r;
                        t = this.dropdown.getDatumForTopSuggestion(), t && this.dropdown.isVisible() && !this.input.hasOverflow() ? (i = this.input.getInputValue(), n = f.normalizeQuery(i), o = e.escapeRegExChars(n), s = new RegExp("^(?:" + o + ")(.+$)", "i"), r = s.exec(t.value), r ? this.input.setHint(i + r[1]) : this.input.clearHint()) : this.input.clearHint()
                    },
                    _autocomplete: function(t) {
                        var e, i, n, o;
                        e = this.input.getHint(), i = this.input.getQuery(), n = t || this.input.isCursorAtEnd(), e && i !== e && n && (o = this.dropdown.getDatumForTopSuggestion(), o && this.input.setInputValue(o.value), this.eventBus.trigger("autocompleted", o.raw, o.datasetName))
                    },
                    _select: function(t) {
                        this.input.setQuery(t.value), this.input.setInputValue(t.value, !0), this._setLanguageDirection(), this.eventBus.trigger("selected", t.raw, t.datasetName), this.dropdown.close(), e.defer(e.bind(this.dropdown.empty, this.dropdown))
                    },
                    open: function() {
                        this.dropdown.open()
                    },
                    close: function() {
                        this.dropdown.close()
                    },
                    setVal: function(t) {
                        t = e.toStr(t), this.isActivated ? this.input.setInputValue(t) : (this.input.setQuery(t), this.input.setInputValue(t, !0)), this._setLanguageDirection()
                    },
                    getVal: function() {
                        return this.input.getQuery()
                    },
                    destroy: function() {
                        this.input.destroy(), this.dropdown.destroy(), s(this.$node), this.$node = null
                    }
                }), i
            }();
        ! function() {
            "use strict";
            var i, n, o;
            i = t.fn.typeahead, n = "ttTypeahead", o = {
                initialize: function(i, o) {
                    function s() {
                        var s, r, a = t(this);
                        e.each(o, function(t) {
                            t.highlight = !!i.highlight
                        }), r = new v({
                            input: a,
                            eventBus: s = new h({
                                el: a
                            }),
                            withHint: !!e.isUndefined(i.hint) || !!i.hint,
                            minLength: i.minLength,
                            autoselect: i.autoselect,
                            datasets: o
                        }), a.data(n, r)
                    }
                    return o = e.isArray(o) ? o : [].slice.call(arguments, 1), i = i || {}, this.each(s)
                },
                open: function() {
                    function e() {
                        var e, i = t(this);
                        (e = i.data(n)) && e.open()
                    }
                    return this.each(e)
                },
                close: function() {
                    function e() {
                        var e, i = t(this);
                        (e = i.data(n)) && e.close()
                    }
                    return this.each(e)
                },
                val: function(e) {
                    function i() {
                        var i, o = t(this);
                        (i = o.data(n)) && i.setVal(e)
                    }

                    function o(t) {
                        var e, i;
                        return (e = t.data(n)) && (i = e.getVal()), i
                    }
                    return arguments.length ? this.each(i) : o(this.first())
                },
                destroy: function() {
                    function e() {
                        var e, i = t(this);
                        (e = i.data(n)) && (e.destroy(), i.removeData(n))
                    }
                    return this.each(e)
                }
            }, t.fn.typeahead = function(e) {
                var i;
                return o[e] && "initialize" !== e ? (i = this.filter(function() {
                    return !!t(this).data(n)
                }), o[e].apply(i, [].slice.call(arguments, 1))) : o.initialize.apply(this, arguments)
            }, t.fn.typeahead.noConflict = function() {
                return t.fn.typeahead = i, this
            }
        }()
    }(window.jQuery),
    function(t) {
        function e(e) {
            var i = e || window.event,
                n = [].slice.call(arguments, 1),
                o = 0,
                s = 0,
                r = 0;
            return e = t.event.fix(i), e.type = "mousewheel", i.wheelDelta && (o = i.wheelDelta / 120), i.detail && (o = -i.detail / 3), r = o, void 0 !== i.axis && i.axis === i.HORIZONTAL_AXIS && (r = 0, s = -1 * o), void 0 !== i.wheelDeltaY && (r = i.wheelDeltaY / 120), void 0 !== i.wheelDeltaX && (s = -1 * i.wheelDeltaX / 120), n.unshift(e, o, s, r), (t.event.dispatch || t.event.handle).apply(this, n)
        }
        var i = ["DOMMouseScroll", "mousewheel"];
        if (t.event.fixHooks)
            for (var n = i.length; n;) t.event.fixHooks[i[--n]] = t.event.mouseHooks;
        t.event.special.mousewheel = {
            setup: function() {
                if (this.addEventListener)
                    for (var t = i.length; t;) this.addEventListener(i[--t], e, !1);
                else this.onmousewheel = e
            },
            teardown: function() {
                if (this.removeEventListener)
                    for (var t = i.length; t;) this.removeEventListener(i[--t], e, !1);
                else this.onmousewheel = null
            }
        }, t.fn.extend({
            mousewheel: function(t) {
                return t ? this.bind("mousewheel", t) : this.trigger("mousewheel")
            },
            unmousewheel: function(t) {
                return this.unbind("mousewheel", t)
            }
        })
    }(jQuery);
var en = {
        updated: "Updated",
        not_found_job: "We could not find jobs for this search at the moment. Please try with a more general keyword.",
        required_file: "Please attach .doc, .docx, .pdf, .png, .jpg files that are less than 2M in size",
        placeholder_update: "Upload .doc, .docx, .pdf, .png, .jpg files that are less than 2M in size",
        negotiable: "Negotiable",
        salary_from: "From",
        up_to: "Up to",
        btn_job_alert: "Email me jobs like these",
        job_alert_title: "Grab your next best jobs!",
        email_me_similar_jobs: "Email me similar jobs"
    },
    vi = {
        updated: "Cập nhật",
        not_found_job: "Hiện không có công việc nào theo tiêu chí này. Bạn hãy thử tìm lại với từ khoá rộng hơn",
        required_file: "Vui lòng chọn file .doc, .docx, .pdf, .png, .jpg và kích thước nhỏ hơn 2M",
        placeholder_update: "Hỗ trợ định dạng .doc, .docx, .pdf, .png, .jpg nhỏ hơn 2M",
        negotiable: "Negotiable",
        salary_from: "From",
        up_to: "Up to",
        btn_job_alert: "Email me jobs like these",
        job_alert_title: "Grab your next best jobs!",
        email_me_similar_jobs: "Email me similar jobs"
    };
! function(t, e) {
    function i(t, e, i) {
        var n = t.children(),
            o = !1;
        t.empty();
        for (var r = 0, a = n.length; a > r; r++) {
            var l = n.eq(r);
            if (t.append(l), i && t.append(i), s(t, e)) {
                l.remove(), o = !0;
                break
            }
            i && i.detach()
        }
        return o
    }

    function n(e, i, r, a, l) {
        var c = !1,
            u = "table, thead, tbody, tfoot, tr, col, colgroup, object, embed, param, ol, ul, dl, blockquote, select, optgroup, option, textarea, script, style",
            h = "script";
        return e.contents().detach().each(function() {
            var d = this,
                p = t(d);
            if ("undefined" == typeof d || 3 == d.nodeType && 0 == t.trim(d.data).length) return !0;
            if (p.is(h)) e.append(p);
            else {
                if (c) return !0;
                e.append(p), l && e[e.is(u) ? "after" : "append"](l), s(r, a) && (c = 3 == d.nodeType ? o(p, i, r, a, l) : n(p, i, r, a, l), c || (p.detach(), c = !0)), c || l && l.detach()
            }
        }), c
    }

    function o(e, i, n, o, a) {
        var u = e[0];
        if (!u) return !1;
        var d = c(u),
            p = -1 !== d.indexOf(" ") ? " " : "　",
            f = "letter" == o.wrap ? "" : p,
            m = d.split(f),
            g = -1,
            v = -1,
            y = 0,
            b = m.length - 1;
        for (o.fallbackToLetter && 0 == y && 0 == b && (f = "", m = d.split(f), b = m.length - 1); b >= y && (0 != y || 0 != b);) {
            var w = Math.floor((y + b) / 2);
            if (w == v) break;
            v = w, l(u, m.slice(0, v + 1).join(f) + o.ellipsis), s(n, o) ? (b = v, o.fallbackToLetter && 0 == y && 0 == b && (f = "", m = m[0].split(f), g = -1, v = -1, y = 0, b = m.length - 1)) : (g = v, y = v)
        }
        if (-1 == g || 1 == m.length && 0 == m[0].length) {
            var _ = e.parent();
            e.detach();
            var x = a && a.closest(_).length ? a.length : 0;
            _.contents().length > x ? u = h(_.contents().eq(-1 - x), i) : (u = h(_, i, !0), x || _.detach()), u && (d = r(c(u), o), l(u, d), x && a && t(u).parent().append(a))
        } else d = r(m.slice(0, g + 1).join(f), o), l(u, d);
        return !0
    }

    function s(t, e) {
        return t.innerHeight() > e.maxHeight
    }

    function r(e, i) {
        for (; t.inArray(e.slice(-1), i.lastCharacter.remove) > -1;) e = e.slice(0, -1);
        return t.inArray(e.slice(-1), i.lastCharacter.noEllipsis) < 0 && (e += i.ellipsis), e
    }

    function a(t) {
        return {
            width: t.innerWidth(),
            height: t.innerHeight()
        }
    }

    function l(t, e) {
        t.innerText ? t.innerText = e : t.nodeValue ? t.nodeValue = e : t.textContent && (t.textContent = e)
    }

    function c(t) {
        return t.innerText ? t.innerText : t.nodeValue ? t.nodeValue : t.textContent ? t.textContent : ""
    }

    function u(t) {
        do t = t.previousSibling; while (t && 1 !== t.nodeType && 3 !== t.nodeType);
        return t
    }

    function h(e, i, n) {
        var o, s = e && e[0];
        if (s) {
            if (!n) {
                if (3 === s.nodeType) return s;
                if (t.trim(e.text())) return h(e.contents().last(), i)
            }
            for (o = u(s); !o;) {
                if (e = e.parent(), e.is(i) || !e.length) return !1;
                o = u(e[0])
            }
            if (o) return h(t(o), i)
        }
        return !1
    }

    function d(e, i) {
        return !!e && ("string" == typeof e ? (e = t(e, i), !!e.length && e) : !!e.jquery && e)
    }

    function p(t) {
        for (var e = t.innerHeight(), i = ["paddingTop", "paddingBottom"], n = 0, o = i.length; o > n; n++) {
            var s = parseInt(t.css(i[n]), 10);
            isNaN(s) && (s = 0), e -= s
        }
        return e
    }
    if (!t.fn.dotdotdot) {
        t.fn.dotdotdot = function(e) {
            if (0 == this.length) return t.fn.dotdotdot.debug('No element found for "' + this.selector + '".'), this;
            if (this.length > 1) return this.each(function() {
                t(this).dotdotdot(e)
            });
            var o = this;
            o.data("dotdotdot") && o.trigger("destroy.dot"), o.data("dotdotdot-style", o.attr("style") || ""), o.css("word-wrap", "break-word"), "nowrap" === o.css("white-space") && o.css("white-space", "normal"), o.bind_events = function() {
                return o.bind("update.dot", function(e, a) {
                    e.preventDefault(), e.stopPropagation(), l.maxHeight = "number" == typeof l.height ? l.height : p(o), l.maxHeight += l.tolerance, "undefined" != typeof a && (("string" == typeof a || a instanceof HTMLElement) && (a = t("<div />").append(a).contents()), a instanceof t && (r = a)), m = o.wrapInner('<div class="dotdotdot" />').children(), m.contents().detach().end().append(r.clone(!0)).find("br").replaceWith("  <br />  ").end().css({
                        height: "auto",
                        width: "auto",
                        border: "none",
                        padding: 0,
                        margin: 0
                    });
                    var u = !1,
                        h = !1;
                    return c.afterElement && (u = c.afterElement.clone(!0), u.show(), c.afterElement.detach()), s(m, l) && (h = "children" == l.wrap ? i(m, l, u) : n(m, o, m, l, u)), m.replaceWith(m.contents()), m = null, t.isFunction(l.callback) && l.callback.call(o[0], h, r), c.isTruncated = h, h
                }).bind("isTruncated.dot", function(t, e) {
                    return t.preventDefault(), t.stopPropagation(), "function" == typeof e && e.call(o[0], c.isTruncated), c.isTruncated
                }).bind("originalContent.dot", function(t, e) {
                    return t.preventDefault(), t.stopPropagation(), "function" == typeof e && e.call(o[0], r), r
                }).bind("destroy.dot", function(t) {
                    t.preventDefault(), t.stopPropagation(), o.unwatch().unbind_events().contents().detach().end().append(r).attr("style", o.data("dotdotdot-style") || "").data("dotdotdot", !1)
                }), o
            }, o.unbind_events = function() {
                return o.unbind(".dot"), o
            }, o.watch = function() {
                if (o.unwatch(), "window" == l.watch) {
                    var e = t(window),
                        i = e.width(),
                        n = e.height();
                    e.bind("resize.dot" + c.dotId, function() {
                        i == e.width() && n == e.height() && l.windowResizeFix || (i = e.width(), n = e.height(), h && clearInterval(h), h = setTimeout(function() {
                            o.trigger("update.dot")
                        }, 100))
                    })
                } else u = a(o), h = setInterval(function() {
                    if (o.is(":visible")) {
                        var t = a(o);
                        (u.width != t.width || u.height != t.height) && (o.trigger("update.dot"), u = t)
                    }
                }, 500);
                return o
            }, o.unwatch = function() {
                return t(window).unbind("resize.dot" + c.dotId), h && clearInterval(h), o
            };
            var r = o.contents(),
                l = t.extend(!0, {}, t.fn.dotdotdot.defaults, e),
                c = {},
                u = {},
                h = null,
                m = null;
            return l.lastCharacter.remove instanceof Array || (l.lastCharacter.remove = t.fn.dotdotdot.defaultArrays.lastCharacter.remove), l.lastCharacter.noEllipsis instanceof Array || (l.lastCharacter.noEllipsis = t.fn.dotdotdot.defaultArrays.lastCharacter.noEllipsis), c.afterElement = d(l.after, o), c.isTruncated = !1, c.dotId = f++, o.data("dotdotdot", !0).bind_events().trigger("update.dot"), l.watch && o.watch(), o
        }, t.fn.dotdotdot.defaults = {
            ellipsis: "... ",
            wrap: "word",
            fallbackToLetter: !0,
            lastCharacter: {},
            tolerance: 0,
            callback: null,
            after: null,
            height: null,
            watch: !1,
            windowResizeFix: !0
        }, t.fn.dotdotdot.defaultArrays = {
            lastCharacter: {
                remove: [" ", "　", ",", ";", ".", "!", "?"],
                noEllipsis: []
            }
        }, t.fn.dotdotdot.debug = function() {};
        var f = 1,
            m = t.fn.html;
        t.fn.html = function(i) {
            return i != e && !t.isFunction(i) && this.data("dotdotdot") ? this.trigger("update", [i]) : m.apply(this, arguments)
        };
        var g = t.fn.text;
        t.fn.text = function(i) {
            return i != e && !t.isFunction(i) && this.data("dotdotdot") ? (i = t("<div />").text(i).html(), this.trigger("update", [i])) : g.apply(this, arguments)
        }
    }
}(jQuery),
function(t, e) {
    function i(e) {
        var i, n = t(e.ownerDocument);
        return e = t(e), i = e.offset(), {
            x: i.left + e.outerWidth() / 2 - n.scrollLeft(),
            y: i.top + e.outerHeight() / 2 - n.scrollTop()
        }
    }

    function n(e) {
        var i, n = t(e.ownerDocument);
        return e = t(e), i = e.offset(), {
            x: i.left - n.scrollLeft(),
            y: i.top - n.scrollTop()
        }
    }
    var o = /^key/,
        s = /^(?:mouse|contextmenu)|click/;
    t.fn.simulate = function(e, i) {
        return this.each(function() {
            new t.simulate(this, e, i)
        })
    }, t.simulate = function(e, i, n) {
        var o = t.camelCase("simulate-" + i);
        this.target = e, this.options = n, this[o] ? this[o]() : this.simulateEvent(e, i, n)
    }, t.extend(t.simulate, {
        keyCode: {
            BACKSPACE: 8,
            COMMA: 188,
            DELETE: 46,
            DOWN: 40,
            END: 35,
            ENTER: 13,
            ESCAPE: 27,
            HOME: 36,
            LEFT: 37,
            NUMPAD_ADD: 107,
            NUMPAD_DECIMAL: 110,
            NUMPAD_DIVIDE: 111,
            NUMPAD_ENTER: 108,
            NUMPAD_MULTIPLY: 106,
            NUMPAD_SUBTRACT: 109,
            PAGE_DOWN: 34,
            PAGE_UP: 33,
            PERIOD: 190,
            RIGHT: 39,
            SPACE: 32,
            TAB: 9,
            UP: 38
        },
        buttonCode: {
            LEFT: 0,
            MIDDLE: 1,
            RIGHT: 2
        }
    }), t.extend(t.simulate.prototype, {
        simulateEvent: function(t, e, i) {
            var n = this.createEvent(e, i);
            this.dispatchEvent(t, e, n, i)
        },
        createEvent: function(t, e) {
            return o.test(t) ? this.keyEvent(t, e) : s.test(t) ? this.mouseEvent(t, e) : void 0
        },
        mouseEvent: function(i, n) {
            var o, s, r, a;
            return n = t.extend({
                bubbles: !0,
                cancelable: "mousemove" !== i,
                view: window,
                detail: 0,
                screenX: 0,
                screenY: 0,
                clientX: 1,
                clientY: 1,
                ctrlKey: !1,
                altKey: !1,
                shiftKey: !1,
                metaKey: !1,
                button: 0,
                relatedTarget: e
            }, n), document.createEvent ? (o = document.createEvent("MouseEvents"), o.initMouseEvent(i, n.bubbles, n.cancelable, n.view, n.detail, n.screenX, n.screenY, n.clientX, n.clientY, n.ctrlKey, n.altKey, n.shiftKey, n.metaKey, n.button, n.relatedTarget || document.body.parentNode), 0 === o.pageX && 0 === o.pageY && Object.defineProperty && (s = o.relatedTarget.ownerDocument || document, r = s.documentElement, a = s.body, Object.defineProperty(o, "pageX", {
                get: function() {
                    return n.clientX + (r && r.scrollLeft || a && a.scrollLeft || 0) - (r && r.clientLeft || a && a.clientLeft || 0)
                }
            }), Object.defineProperty(o, "pageY", {
                get: function() {
                    return n.clientY + (r && r.scrollTop || a && a.scrollTop || 0) - (r && r.clientTop || a && a.clientTop || 0)
                }
            }))) : document.createEventObject && (o = document.createEventObject(), t.extend(o, n), o.button = {
                0: 1,
                1: 4,
                2: 2
            }[o.button] || (o.button === -1 ? 0 : o.button)), o
        },
        keyEvent: function(i, n) {
            var o;
            if (n = t.extend({
                    bubbles: !0,
                    cancelable: !0,
                    view: window,
                    ctrlKey: !1,
                    altKey: !1,
                    shiftKey: !1,
                    metaKey: !1,
                    keyCode: 0,
                    charCode: e
                }, n), document.createEvent) try {
                o = document.createEvent("KeyEvents"), o.initKeyEvent(i, n.bubbles, n.cancelable, n.view, n.ctrlKey, n.altKey, n.shiftKey, n.metaKey, n.keyCode, n.charCode)
            } catch (s) {
                o = document.createEvent("Events"), o.initEvent(i, n.bubbles, n.cancelable), t.extend(o, {
                    view: n.view,
                    ctrlKey: n.ctrlKey,
                    altKey: n.altKey,
                    shiftKey: n.shiftKey,
                    metaKey: n.metaKey,
                    keyCode: n.keyCode,
                    charCode: n.charCode
                })
            } else document.createEventObject && (o = document.createEventObject(), t.extend(o, n));
            return (/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()) || "[object Opera]" === {}.toString.call(window.opera)) && (o.keyCode = n.charCode > 0 ? n.charCode : n.keyCode, o.charCode = e), o
        },
        dispatchEvent: function(t, e, i) {
            t[e] ? t[e]() : t.dispatchEvent ? t.dispatchEvent(i) : t.fireEvent && t.fireEvent("on" + e, i)
        },
        simulateFocus: function() {
            function e() {
                n = !0
            }
            var i, n = !1,
                o = t(this.target);
            o.bind("focus", e), o[0].focus(), n || (i = t.Event("focusin"), i.preventDefault(), o.trigger(i), o.triggerHandler("focus")), o.unbind("focus", e)
        },
        simulateBlur: function() {
            function e() {
                n = !0
            }
            var i, n = !1,
                o = t(this.target);
            o.bind("blur", e), o[0].blur(), setTimeout(function() {
                o[0].ownerDocument.activeElement === o[0] && o[0].ownerDocument.body.focus(), n || (i = t.Event("focusout"), i.preventDefault(), o.trigger(i), o.triggerHandler("blur")), o.unbind("blur", e)
            }, 1)
        }
    }), t.extend(t.simulate.prototype, {
        simulateDrag: function() {
            var o = 0,
                s = this.target,
                r = s.ownerDocument,
                a = this.options,
                l = "corner" === a.handle ? n(s) : i(s),
                c = Math.floor(l.x),
                u = Math.floor(l.y),
                h = {
                    clientX: c,
                    clientY: u
                },
                d = a.dx || (a.x !== e ? a.x - c : 0),
                p = a.dy || (a.y !== e ? a.y - u : 0),
                f = a.moves || 3;
            for (this.simulateEvent(s, "mousedown", h); o < f; o++) c += d / f, u += p / f, h = {
                clientX: Math.round(c),
                clientY: Math.round(u)
            }, this.simulateEvent(r, "mousemove", h);
            t.contains(r, s) ? (this.simulateEvent(s, "mouseup", h), this.simulateEvent(s, "click", h)) : this.simulateEvent(r, "mouseup", h)
        }
    })
}(jQuery), ! function(t, e, i) {
    "use strict";
    ! function n(t, e, i) {
        function o(r, a) {
            if (!e[r]) {
                if (!t[r]) {
                    var l = "function" == typeof require && require;
                    if (!a && l) return l(r, !0);
                    if (s) return s(r, !0);
                    var c = new Error("Cannot find module '" + r + "'");
                    throw c.code = "MODULE_NOT_FOUND", c
                }
                var u = e[r] = {
                    exports: {}
                };
                t[r][0].call(u.exports, function(e) {
                    var i = t[r][1][e];
                    return o(i ? i : e)
                }, u, u.exports, n, t, e, i)
            }
            return e[r].exports
        }
        for (var s = "function" == typeof require && require, r = 0; r < i.length; r++) o(i[r]);
        return o
    }({
        1: [function(n, o, s) {
            function r(t) {
                return t && t.__esModule ? t : {
                    "default": t
                }
            }
            Object.defineProperty(s, "__esModule", {
                value: !0
            });
            var a, l, c, u, h = n("./modules/handle-dom"),
                d = n("./modules/utils"),
                p = n("./modules/handle-swal-dom"),
                f = n("./modules/handle-click"),
                m = n("./modules/handle-key"),
                g = r(m),
                v = n("./modules/default-params"),
                y = r(v),
                b = n("./modules/set-params"),
                w = r(b);
            s["default"] = c = u = function() {
                function n(t) {
                    var e = o;
                    return e[t] === i ? y["default"][t] : e[t]
                }
                var o = arguments[0];
                if ((0, h.addClass)(e.body, "stop-scrolling"), (0, p.resetInput)(), o === i) return (0, d.logStr)("SweetAlert expects at least 1 attribute!"), !1;
                var s = (0, d.extend)({}, y["default"]);
                switch (typeof o) {
                    case "string":
                        s.title = o, s.text = arguments[1] || "", s.type = arguments[2] || "";
                        break;
                    case "object":
                        if (o.title === i) return (0, d.logStr)('Missing "title" argument!'), !1;
                        s.title = o.title;
                        for (var r in y["default"]) s[r] = n(r);
                        s.confirmButtonText = s.showCancelButton ? "Confirm" : y["default"].confirmButtonText, s.confirmButtonText = n("confirmButtonText"), s.doneFunction = arguments[1] || null;
                        break;
                    default:
                        return (0, d.logStr)('Unexpected type of argument! Expected "string" or "object", got ' + typeof o), !1
                }(0, w["default"])(s), (0, p.fixVerticalPosition)(), (0, p.openModal)(arguments[1]);
                for (var c = (0, p.getModal)(), m = c.querySelectorAll("button"), v = ["onclick", "onmouseover", "onmouseout", "onmousedown", "onmouseup", "onfocus"], b = function(t) {
                        return (0, f.handleButton)(t, s, c)
                    }, _ = 0; _ < m.length; _++)
                    for (var x = 0; x < v.length; x++) {
                        var C = v[x];
                        m[_][C] = b
                    }(0, p.getOverlay)().onclick = b, a = t.onkeydown;
                var S = function(t) {
                    return (0, g["default"])(t, s, c)
                };
                t.onkeydown = S, t.onfocus = function() {
                    setTimeout(function() {
                        l !== i && (l.focus(), l = i)
                    }, 0)
                }, u.enableButtons()
            }, c.setDefaults = u.setDefaults = function(t) {
                if (!t) throw new Error("userParams is required");
                if ("object" != typeof t) throw new Error("userParams has to be a object");
                (0, d.extend)(y["default"], t)
            }, c.close = u.close = function() {
                var n = (0, p.getModal)();
                (0, h.fadeOut)((0, p.getOverlay)(), 5), (0, h.fadeOut)(n, 5), (0, h.removeClass)(n, "showSweetAlert"), (0, h.addClass)(n, "hideSweetAlert"), (0, h.removeClass)(n, "visible");
                var o = n.querySelector(".sa-icon.sa-success");
                (0, h.removeClass)(o, "animate"), (0, h.removeClass)(o.querySelector(".sa-tip"), "animateSuccessTip"), (0, h.removeClass)(o.querySelector(".sa-long"), "animateSuccessLong");
                var s = n.querySelector(".sa-icon.sa-error");
                (0, h.removeClass)(s, "animateErrorIcon"), (0, h.removeClass)(s.querySelector(".sa-x-mark"), "animateXMark");
                var r = n.querySelector(".sa-icon.sa-warning");
                return (0, h.removeClass)(r, "pulseWarning"), (0, h.removeClass)(r.querySelector(".sa-body"), "pulseWarningIns"), (0, h.removeClass)(r.querySelector(".sa-dot"), "pulseWarningIns"), setTimeout(function() {
                    var t = n.getAttribute("data-custom-class");
                    (0, h.removeClass)(n, t)
                }, 300), (0, h.removeClass)(e.body, "stop-scrolling"), t.onkeydown = a, t.previousActiveElement && t.previousActiveElement.focus(), l = i, clearTimeout(n.timeout), !0
            }, c.showInputError = u.showInputError = function(t) {
                var e = (0, p.getModal)(),
                    i = e.querySelector(".sa-input-error");
                (0, h.addClass)(i, "show");
                var n = e.querySelector(".sa-error-container");
                (0, h.addClass)(n, "show"), n.querySelector("p").innerHTML = t, setTimeout(function() {
                    c.enableButtons()
                }, 1), e.querySelector("input").focus()
            }, c.resetInputError = u.resetInputError = function(t) {
                if (t && 13 === t.keyCode) return !1;
                var e = (0, p.getModal)(),
                    i = e.querySelector(".sa-input-error");
                (0, h.removeClass)(i, "show");
                var n = e.querySelector(".sa-error-container");
                (0, h.removeClass)(n, "show")
            }, c.disableButtons = u.disableButtons = function(t) {
                var e = (0, p.getModal)(),
                    i = e.querySelector("button.confirm"),
                    n = e.querySelector("button.cancel");
                i.disabled = !0, n.disabled = !0
            }, c.enableButtons = u.enableButtons = function(t) {
                var e = (0, p.getModal)(),
                    i = e.querySelector("button.confirm"),
                    n = e.querySelector("button.cancel");
                i.disabled = !1, n.disabled = !1
            }, "undefined" != typeof t ? t.sweetAlert = t.swal = c : (0, d.logStr)("SweetAlert is a frontend module!"), o.exports = s["default"]
        }, {
            "./modules/default-params": 2,
            "./modules/handle-click": 3,
            "./modules/handle-dom": 4,
            "./modules/handle-key": 5,
            "./modules/handle-swal-dom": 6,
            "./modules/set-params": 8,
            "./modules/utils": 9
        }],
        2: [function(t, e, i) {
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var n = {
                title: "",
                text: "",
                type: null,
                allowOutsideClick: !1,
                showConfirmButton: !0,
                showCancelButton: !1,
                closeOnConfirm: !0,
                closeOnCancel: !0,
                confirmButtonText: "OK",
                confirmButtonColor: "#8CD4F5",
                cancelButtonText: "Cancel",
                imageUrl: null,
                imageSize: null,
                timer: null,
                customClass: "",
                html: !1,
                animation: !0,
                allowEscapeKey: !0,
                inputType: "text",
                inputPlaceholder: "",
                inputValue: "",
                showLoaderOnConfirm: !1
            };
            i["default"] = n, e.exports = i["default"]
        }, {}],
        3: [function(e, i, n) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = e("./utils"),
                s = (e("./handle-swal-dom"), e("./handle-dom")),
                r = function(e, i, n) {
                    function r(t) {
                        f && i.confirmButtonColor && (p.style.backgroundColor = t)
                    }
                    var c, u, h, d = e || t.event,
                        p = d.target || d.srcElement,
                        f = -1 !== p.className.indexOf("confirm"),
                        m = -1 !== p.className.indexOf("sweet-overlay"),
                        g = (0, s.hasClass)(n, "visible"),
                        v = i.doneFunction && "true" === n.getAttribute("data-has-done-function");
                    switch (f && i.confirmButtonColor && (c = i.confirmButtonColor, u = (0, o.colorLuminance)(c, -.04), h = (0, o.colorLuminance)(c, -.14)), d.type) {
                        case "mouseover":
                            r(u);
                            break;
                        case "mouseout":
                            r(c);
                            break;
                        case "mousedown":
                            r(h);
                            break;
                        case "mouseup":
                            r(u);
                            break;
                        case "focus":
                            var y = n.querySelector("button.confirm"),
                                b = n.querySelector("button.cancel");
                            f ? b.style.boxShadow = "none" : y.style.boxShadow = "none";
                            break;
                        case "click":
                            var w = n === p,
                                _ = (0, s.isDescendant)(n, p);
                            if (!w && !_ && g && !i.allowOutsideClick) break;
                            f && v && g ? a(n, i) : v && g || m ? l(n, i) : (0, s.isDescendant)(n, p) && "BUTTON" === p.tagName && sweetAlert.close()
                    }
                },
                a = function(t, e) {
                    var i = !0;
                    (0, s.hasClass)(t, "show-input") && (i = t.querySelector("input").value,
                        i || (i = "")), e.doneFunction(i), e.closeOnConfirm && sweetAlert.close(), e.showLoaderOnConfirm && sweetAlert.disableButtons()
                },
                l = function(t, e) {
                    var i = String(e.doneFunction).replace(/\s/g, ""),
                        n = "function(" === i.substring(0, 9) && ")" !== i.substring(9, 10);
                    n && e.doneFunction(!1), e.closeOnCancel && sweetAlert.close()
                };
            n["default"] = {
                handleButton: r,
                handleConfirm: a,
                handleCancel: l
            }, i.exports = n["default"]
        }, {
            "./handle-dom": 4,
            "./handle-swal-dom": 6,
            "./utils": 9
        }],
        4: [function(i, n, o) {
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            var s = function(t, e) {
                    return new RegExp(" " + e + " ").test(" " + t.className + " ")
                },
                r = function(t, e) {
                    s(t, e) || (t.className += " " + e)
                },
                a = function(t, e) {
                    var i = " " + t.className.replace(/[\t\r\n]/g, " ") + " ";
                    if (s(t, e)) {
                        for (; i.indexOf(" " + e + " ") >= 0;) i = i.replace(" " + e + " ", " ");
                        t.className = i.replace(/^\s+|\s+$/g, "")
                    }
                },
                l = function(t) {
                    var i = e.createElement("div");
                    return i.appendChild(e.createTextNode(t)), i.innerHTML
                },
                c = function(t) {
                    t.style.opacity = "", t.style.display = "block"
                },
                u = function(t) {
                    if (t && !t.length) return c(t);
                    for (var e = 0; e < t.length; ++e) c(t[e])
                },
                h = function(t) {
                    t.style.opacity = "", t.style.display = "none"
                },
                d = function(t) {
                    if (t && !t.length) return h(t);
                    for (var e = 0; e < t.length; ++e) h(t[e])
                },
                p = function(t, e) {
                    for (var i = e.parentNode; null !== i;) {
                        if (i === t) return !0;
                        i = i.parentNode
                    }
                    return !1
                },
                f = function(t) {
                    t.style.left = "-9999px", t.style.display = "block";
                    var e, i = t.clientHeight;
                    return e = "undefined" != typeof getComputedStyle ? parseInt(getComputedStyle(t).getPropertyValue("padding-top"), 10) : parseInt(t.currentStyle.padding), t.style.left = "", t.style.display = "none", "-" + parseInt((i + e) / 2) + "px"
                },
                m = function(t, e) {
                    if (+t.style.opacity < 1) {
                        e = e || 16, t.style.opacity = 0, t.style.display = "block";
                        var i = +new Date,
                            n = function o() {
                                t.style.opacity = +t.style.opacity + (new Date - i) / 100, i = +new Date, +t.style.opacity < 1 && setTimeout(o, e)
                            };
                        n()
                    }
                    t.style.display = "block"
                },
                g = function(t, e) {
                    e = e || 16, t.style.opacity = 1;
                    var i = +new Date,
                        n = function o() {
                            t.style.opacity = +t.style.opacity - (new Date - i) / 100, i = +new Date, +t.style.opacity > 0 ? setTimeout(o, e) : t.style.display = "none"
                        };
                    n()
                },
                v = function(i) {
                    if ("function" == typeof MouseEvent) {
                        var n = new MouseEvent("click", {
                            view: t,
                            bubbles: !1,
                            cancelable: !0
                        });
                        i.dispatchEvent(n)
                    } else if (e.createEvent) {
                        var o = e.createEvent("MouseEvents");
                        o.initEvent("click", !1, !1), i.dispatchEvent(o)
                    } else e.createEventObject ? i.fireEvent("onclick") : "function" == typeof i.onclick && i.onclick()
                },
                y = function(e) {
                    "function" == typeof e.stopPropagation ? (e.stopPropagation(), e.preventDefault()) : t.event && t.event.hasOwnProperty("cancelBubble") && (t.event.cancelBubble = !0)
                };
            o.hasClass = s, o.addClass = r, o.removeClass = a, o.escapeHtml = l, o._show = c, o.show = u, o._hide = h, o.hide = d, o.isDescendant = p, o.getTopMargin = f, o.fadeIn = m, o.fadeOut = g, o.fireClick = v, o.stopEventPropagation = y
        }, {}],
        5: [function(e, n, o) {
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            var s = e("./handle-dom"),
                r = e("./handle-swal-dom"),
                a = function(e, n, o) {
                    var a = e || t.event,
                        l = a.keyCode || a.which,
                        c = o.querySelector("button.confirm"),
                        u = o.querySelector("button.cancel"),
                        h = o.querySelectorAll("button[tabindex]");
                    if (-1 !== [9, 13, 32, 27].indexOf(l)) {
                        for (var d = a.target || a.srcElement, p = -1, f = 0; f < h.length; f++)
                            if (d === h[f]) {
                                p = f;
                                break
                            }
                        9 === l ? (d = -1 === p ? c : p === h.length - 1 ? h[0] : h[p + 1], (0, s.stopEventPropagation)(a), d.focus(), n.confirmButtonColor && (0, r.setFocusStyle)(d, n.confirmButtonColor)) : 13 === l ? ("INPUT" === d.tagName && (d = c, c.focus()), d = -1 === p ? c : i) : 27 === l && n.allowEscapeKey === !0 ? (d = u, (0, s.fireClick)(d, a)) : d = i
                    }
                };
            o["default"] = a, n.exports = o["default"]
        }, {
            "./handle-dom": 4,
            "./handle-swal-dom": 6
        }],
        6: [function(i, n, o) {
            function s(t) {
                return t && t.__esModule ? t : {
                    "default": t
                }
            }
            Object.defineProperty(o, "__esModule", {
                value: !0
            });
            var r = i("./utils"),
                a = i("./handle-dom"),
                l = i("./default-params"),
                c = s(l),
                u = i("./injected-html"),
                h = s(u),
                d = ".sweet-alert",
                p = ".sweet-overlay",
                f = function() {
                    var t = e.createElement("div");
                    for (t.innerHTML = h["default"]; t.firstChild;) e.body.appendChild(t.firstChild)
                },
                m = function C() {
                    var t = e.querySelector(d);
                    return t || (f(), t = C()), t
                },
                g = function() {
                    var t = m();
                    return t ? t.querySelector("input") : void 0
                },
                v = function() {
                    return e.querySelector(p)
                },
                y = function(t, e) {
                    var i = (0, r.hexToRgb)(e);
                    t.style.boxShadow = "0 0 2px rgba(" + i + ", 0.8), inset 0 0 0 1px rgba(0, 0, 0, 0.05)"
                },
                b = function(i) {
                    var n = m();
                    (0, a.fadeIn)(v(), 10), (0, a.show)(n), (0, a.addClass)(n, "showSweetAlert"), (0, a.removeClass)(n, "hideSweetAlert"), t.previousActiveElement = e.activeElement;
                    var o = n.querySelector("button.confirm");
                    o.focus(), setTimeout(function() {
                        (0, a.addClass)(n, "visible")
                    }, 500);
                    var s = n.getAttribute("data-timer");
                    if ("null" !== s && "" !== s) {
                        var r = i;
                        n.timeout = setTimeout(function() {
                            var t = (r || null) && "true" === n.getAttribute("data-has-done-function");
                            t ? r(null) : sweetAlert.close()
                        }, s)
                    }
                },
                w = function() {
                    var t = m(),
                        e = g();
                    (0, a.removeClass)(t, "show-input"), e.value = c["default"].inputValue, e.setAttribute("type", c["default"].inputType), e.setAttribute("placeholder", c["default"].inputPlaceholder), _()
                },
                _ = function(t) {
                    if (t && 13 === t.keyCode) return !1;
                    var e = m(),
                        i = e.querySelector(".sa-input-error");
                    (0, a.removeClass)(i, "show");
                    var n = e.querySelector(".sa-error-container");
                    (0, a.removeClass)(n, "show")
                },
                x = function() {
                    var t = m();
                    t.style.marginTop = (0, a.getTopMargin)(m())
                };
            o.sweetAlertInitialize = f, o.getModal = m, o.getOverlay = v, o.getInput = g, o.setFocusStyle = y, o.openModal = b, o.resetInput = w, o.resetInputError = _, o.fixVerticalPosition = x
        }, {
            "./default-params": 2,
            "./handle-dom": 4,
            "./injected-html": 7,
            "./utils": 9
        }],
        7: [function(t, e, i) {
            Object.defineProperty(i, "__esModule", {
                value: !0
            });
            var n = '<div class="sweet-overlay" tabIndex="-1"></div><div class="sweet-alert"><div class="sa-icon sa-error">\n      <span class="sa-x-mark">\n        <span class="sa-line sa-left"></span>\n        <span class="sa-line sa-right"></span>\n      </span>\n    </div><div class="sa-icon sa-warning">\n      <span class="sa-body"></span>\n      <span class="sa-dot"></span>\n    </div><div class="sa-icon sa-info"></div><div class="sa-icon sa-success">\n      <span class="sa-line sa-tip"></span>\n      <span class="sa-line sa-long"></span>\n\n      <div class="sa-placeholder"></div>\n      <div class="sa-fix"></div>\n    </div><div class="sa-icon sa-custom"></div><h2>Title</h2>\n    <p>Text</p>\n    <fieldset>\n      <input type="text" tabIndex="3" />\n      <div class="sa-input-error"></div>\n    </fieldset><div class="sa-error-container">\n      <div class="icon">!</div>\n      <p>Not valid!</p>\n    </div><div class="sa-button-container">\n      <button class="cancel" tabIndex="2">Cancel</button>\n      <div class="sa-confirm-button-container">\n        <button class="confirm" tabIndex="1">OK</button><div class="la-ball-fall">\n          <div></div>\n          <div></div>\n          <div></div>\n        </div>\n      </div>\n    </div></div>';
            i["default"] = n, e.exports = i["default"]
        }, {}],
        8: [function(t, e, n) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = t("./utils"),
                s = t("./handle-swal-dom"),
                r = t("./handle-dom"),
                a = ["error", "warning", "info", "success", "input", "prompt"],
                l = function(t) {
                    var e = (0, s.getModal)(),
                        n = e.querySelector("h2"),
                        l = e.querySelector("p"),
                        c = e.querySelector("button.cancel"),
                        u = e.querySelector("button.confirm");
                    if (n.innerHTML = t.html ? t.title : (0, r.escapeHtml)(t.title).split("\n").join("<br>"), l.innerHTML = t.html ? t.text : (0, r.escapeHtml)(t.text || "").split("\n").join("<br>"), t.text && (0, r.show)(l), t.customClass)(0, r.addClass)(e, t.customClass), e.setAttribute("data-custom-class", t.customClass);
                    else {
                        var h = e.getAttribute("data-custom-class");
                        (0, r.removeClass)(e, h), e.setAttribute("data-custom-class", "")
                    }
                    if ((0, r.hide)(e.querySelectorAll(".sa-icon")), t.type && !(0, o.isIE8)()) {
                        var d = function() {
                            for (var n = !1, o = 0; o < a.length; o++)
                                if (t.type === a[o]) {
                                    n = !0;
                                    break
                                }
                            if (!n) return logStr("Unknown alert type: " + t.type), {
                                v: !1
                            };
                            var l = ["success", "error", "warning", "info"],
                                c = i; - 1 !== l.indexOf(t.type) && (c = e.querySelector(".sa-icon.sa-" + t.type), (0, r.show)(c));
                            var u = (0, s.getInput)();
                            switch (t.type) {
                                case "success":
                                    (0, r.addClass)(c, "animate"), (0, r.addClass)(c.querySelector(".sa-tip"), "animateSuccessTip"), (0, r.addClass)(c.querySelector(".sa-long"), "animateSuccessLong");
                                    break;
                                case "error":
                                    (0, r.addClass)(c, "animateErrorIcon"), (0, r.addClass)(c.querySelector(".sa-x-mark"), "animateXMark");
                                    break;
                                case "warning":
                                    (0, r.addClass)(c, "pulseWarning"), (0, r.addClass)(c.querySelector(".sa-body"), "pulseWarningIns"), (0, r.addClass)(c.querySelector(".sa-dot"), "pulseWarningIns");
                                    break;
                                case "input":
                                case "prompt":
                                    u.setAttribute("type", t.inputType), u.value = t.inputValue, u.setAttribute("placeholder", t.inputPlaceholder), (0, r.addClass)(e, "show-input"), setTimeout(function() {
                                        u.focus(), u.addEventListener("keyup", swal.resetInputError)
                                    }, 400)
                            }
                        }();
                        if ("object" == typeof d) return d.v
                    }
                    if (t.imageUrl) {
                        var p = e.querySelector(".sa-icon.sa-custom");
                        p.style.backgroundImage = "url(" + t.imageUrl + ")", (0, r.show)(p);
                        var f = 80,
                            m = 80;
                        if (t.imageSize) {
                            var g = t.imageSize.toString().split("x"),
                                v = g[0],
                                y = g[1];
                            v && y ? (f = v, m = y) : logStr("Parameter imageSize expects value with format WIDTHxHEIGHT, got " + t.imageSize)
                        }
                        p.setAttribute("style", p.getAttribute("style") + "width:" + f + "px; height:" + m + "px")
                    }
                    e.setAttribute("data-has-cancel-button", t.showCancelButton), t.showCancelButton ? c.style.display = "inline-block" : (0, r.hide)(c), e.setAttribute("data-has-confirm-button", t.showConfirmButton), t.showConfirmButton ? u.style.display = "inline-block" : (0, r.hide)(u), t.cancelButtonText && (c.innerHTML = (0, r.escapeHtml)(t.cancelButtonText)), t.confirmButtonText && (u.innerHTML = (0, r.escapeHtml)(t.confirmButtonText)), t.confirmButtonColor && (u.style.backgroundColor = t.confirmButtonColor, u.style.borderLeftColor = t.confirmLoadingButtonColor, u.style.borderRightColor = t.confirmLoadingButtonColor, (0, s.setFocusStyle)(u, t.confirmButtonColor)), e.setAttribute("data-allow-outside-click", t.allowOutsideClick);
                    var b = !!t.doneFunction;
                    e.setAttribute("data-has-done-function", b), t.animation ? "string" == typeof t.animation ? e.setAttribute("data-animation", t.animation) : e.setAttribute("data-animation", "pop") : e.setAttribute("data-animation", "none"), e.setAttribute("data-timer", t.timer)
                };
            n["default"] = l, e.exports = n["default"]
        }, {
            "./handle-dom": 4,
            "./handle-swal-dom": 6,
            "./utils": 9
        }],
        9: [function(e, i, n) {
            Object.defineProperty(n, "__esModule", {
                value: !0
            });
            var o = function(t, e) {
                    for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
                    return t
                },
                s = function(t) {
                    var e = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(t);
                    return e ? parseInt(e[1], 16) + ", " + parseInt(e[2], 16) + ", " + parseInt(e[3], 16) : null
                },
                r = function() {
                    return t.attachEvent && !t.addEventListener
                },
                a = function(e) {
                    "undefined" != typeof t && t.console && t.console.log("SweetAlert: " + e)
                },
                l = function(t, e) {
                    t = String(t).replace(/[^0-9a-f]/gi, ""), t.length < 6 && (t = t[0] + t[0] + t[1] + t[1] + t[2] + t[2]), e = e || 0;
                    var i, n, o = "#";
                    for (n = 0; 3 > n; n++) i = parseInt(t.substr(2 * n, 2), 16), i = Math.round(Math.min(Math.max(0, i + i * e), 255)).toString(16), o += ("00" + i).substr(i.length);
                    return o
                };
            n.extend = o, n.hexToRgb = s, n.isIE8 = r, n.logStr = a, n.colorLuminance = l
        }, {}]
    }, {}, [1]), "function" == typeof define && define.amd ? define(function() {
        return sweetAlert
    }) : "undefined" != typeof module && module.exports && (module.exports = sweetAlert)
}(window, document), $(function() {
        ({
            initSelect2: function() {
                ($(".select-location").length > 0 || $(".select-category").length > 0) && $(".select-location, .select-category").each(function() {
                    var t = $(this);
                    $(this).select2({
                        width: "100%",
                        adaptContainerCssClass: function(t) {
                            return null
                        },
                        maximumSelectionSize: 2,
                        doNotFocusInput: !0,
                        dropdownCssClass: "select2-drop_full-screen",
                        searchInputPlaceholder: t.data("search-input-placeholder")
                    }).select2FullScreen()
                })
            },
            initClearKeywordBtn: function() {
                var t = $(".clear-keyword"),
                    e = $("#keywordMainSearch"),
                    i = function() {
                        $.trim(e.val()) ? t.show() : t.hide()
                    };
                i(), $(".search-form").on("change keyup", "#keywordMainSearch", function() {
                    i()
                }).on("click", ".clear-keyword", function() {
                    var t = e.data("ttTypeahead");
                    t.input.query = "", e.data(t), e.val(""), $(this).hide()
                })
            },
            makeKeywordDropdownFullScreen: function() {
                768 > $("body").width() && $("#keywordMainSearch").on("typeahead:opened", function() {
                    $(".keyword-search").addClass("opened"), $("html,body").css({
                        overflow: "hidden"
                    }), $(".twitter-typeahead").prepend('<span class="keywordMainSearch__background"><span>'), $("#search-widget").find(".tt-dropdown-menu").css({
                        width: $("body").width(),
                        height: $(window).height()
                    }), $(window).resize(function() {
                        $("#search-widget").find(".tt-dropdown-menu").height($(window).height())
                    });
                    var t = $(".search-tabs").offset().top - 15;
                    $("body,html").animate({
                        scrollTop: t
                    }, 200)
                }).on("typeahead:closed", function() {
                    $(".keyword-search").removeClass("opened"), $("html,body").css({
                        overflow: "auto"
                    }), $(".keywordMainSearch__background").remove()
                })
            },
            toggleNewProfileNotification: function() {
                setTimeout(function() {
                    $(".profile-is-available p").addClass("fadeInRight").show()
                }, 200), $(".alert-notifications").popover({
                    placement: "bottom",
                    html: "true",
                    content: function() {
                        return $(".notification-popover").find(".popover-content").html()
                    },
                    viewport: {
                        selector: "body",
                        padding: 0
                    },
                    trigger: "click",
                    title: "Notifications",
                    template: '<div class="popover notification-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
                }).click(function(t) {
                    t.stopPropagation()
                }), $(document).click(function() {
                    $(".notifications").popover("hide")
                })
            },
            makeDropdownUnique: function() {
                var t = $(".alert-notifications"),
                    e = $(".dropdown.user-account");
                t.on("shown.bs.popover", function() {
                    e.removeClass("open")
                }), e.on("shown.bs.dropdown", function() {
                    t.popover("hide")
                })
            },
            init: function() {
                this.initSelect2(), this.initClearKeywordBtn(), this.makeKeywordDropdownFullScreen(), this.toggleNewProfileNotification(), this.makeDropdownUnique()
            }
        }).init()
    }), $(function() {
        $(".menu-toggler").click(function() {
            $("#modal-menu").modal("show")
        }), $(".toolbox-toggler").click(function() {
            $("#modal-toolbox").modal("show")
        });
        var t = $(".alert-notifications .number");
        $(".alert-notifications").popover({
            placement: "bottom",
            html: "true",
            content: function() {
                return $(".notification-popover").find(".popover-content").html()
            },
            viewport: {
                selector: "body",
                padding: 0
            },
            trigger: "click",
            title: function() {
                return $(".notification-popover").find(".popover-title").html()
            },
            template: '<div class="popover notification-popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
        }).click(function(e) {
            setLocalStorage("number_isviewed", !0), t.hide(), e.stopPropagation()
        });
        var e = document.getElementById("activate"),
            i = null == e || 1 != e.value,
            n = getLocalStorage("number_isviewed");
        i && n ? t.hide() : t.show(), $(document).click(function() {
            $(".notifications").popover("hide")
        })
    }),
    function(t, e) {
        function i(e, i) {
            var o, s, r, a = e.nodeName.toLowerCase();
            return "area" === a ? (o = e.parentNode, s = o.name, !(!e.href || !s || "map" !== o.nodeName.toLowerCase()) && (r = t("img[usemap=#" + s + "]")[0], !!r && n(r))) : (/input|select|textarea|button|object/.test(a) ? !e.disabled : "a" === a ? e.href || i : i) && n(e)
        }

        function n(e) {
            return t.expr.filters.visible(e) && !t(e).parents().addBack().filter(function() {
                return "hidden" === t.css(this, "visibility")
            }).length
        }
        var o = 0,
            s = /^ui-id-\d+$/;
        t.ui = t.ui || {}, t.extend(t.ui, {
            version: "1.10.4",
            keyCode: {
                BACKSPACE: 8,
                COMMA: 188,
                DELETE: 46,
                DOWN: 40,
                END: 35,
                ENTER: 13,
                ESCAPE: 27,
                HOME: 36,
                LEFT: 37,
                NUMPAD_ADD: 107,
                NUMPAD_DECIMAL: 110,
                NUMPAD_DIVIDE: 111,
                NUMPAD_ENTER: 108,
                NUMPAD_MULTIPLY: 106,
                NUMPAD_SUBTRACT: 109,
                PAGE_DOWN: 34,
                PAGE_UP: 33,
                PERIOD: 190,
                RIGHT: 39,
                SPACE: 32,
                TAB: 9,
                UP: 38
            }
        }), t.fn.extend({
            focus: function(e) {
                return function(i, n) {
                    return "number" == typeof i ? this.each(function() {
                        var e = this;
                        setTimeout(function() {
                            t(e).focus(), n && n.call(e)
                        }, i)
                    }) : e.apply(this, arguments)
                }
            }(t.fn.focus),
            scrollParent: function() {
                var e;
                return e = t.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
                    return /(relative|absolute|fixed)/.test(t.css(this, "position")) && /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
                }).eq(0) : this.parents().filter(function() {
                    return /(auto|scroll)/.test(t.css(this, "overflow") + t.css(this, "overflow-y") + t.css(this, "overflow-x"))
                }).eq(0), /fixed/.test(this.css("position")) || !e.length ? t(document) : e
            },
            zIndex: function(i) {
                if (i !== e) return this.css("zIndex", i);
                if (this.length)
                    for (var n, o, s = t(this[0]); s.length && s[0] !== document;) {
                        if (n = s.css("position"), ("absolute" === n || "relative" === n || "fixed" === n) && (o = parseInt(s.css("zIndex"), 10), !isNaN(o) && 0 !== o)) return o;
                        s = s.parent()
                    }
                return 0
            },
            uniqueId: function() {
                return this.each(function() {
                    this.id || (this.id = "ui-id-" + ++o)
                })
            },
            removeUniqueId: function() {
                return this.each(function() {
                    s.test(this.id) && t(this).removeAttr("id")
                })
            }
        }), t.extend(t.expr[":"], {
            data: t.expr.createPseudo ? t.expr.createPseudo(function(e) {
                return function(i) {
                    return !!t.data(i, e)
                }
            }) : function(e, i, n) {
                return !!t.data(e, n[3])
            },
            focusable: function(e) {
                return i(e, !isNaN(t.attr(e, "tabindex")))
            },
            tabbable: function(e) {
                var n = t.attr(e, "tabindex"),
                    o = isNaN(n);
                return (o || n >= 0) && i(e, !o)
            }
        }), t("<a>").outerWidth(1).jquery || t.each(["Width", "Height"], function(i, n) {
            function o(e, i, n, o) {
                return t.each(s, function() {
                    i -= parseFloat(t.css(e, "padding" + this)) || 0, n && (i -= parseFloat(t.css(e, "border" + this + "Width")) || 0), o && (i -= parseFloat(t.css(e, "margin" + this)) || 0)
                }), i
            }
            var s = "Width" === n ? ["Left", "Right"] : ["Top", "Bottom"],
                r = n.toLowerCase(),
                a = {
                    innerWidth: t.fn.innerWidth,
                    innerHeight: t.fn.innerHeight,
                    outerWidth: t.fn.outerWidth,
                    outerHeight: t.fn.outerHeight
                };
            t.fn["inner" + n] = function(i) {
                return i === e ? a["inner" + n].call(this) : this.each(function() {
                    t(this).css(r, o(this, i) + "px")
                })
            }, t.fn["outer" + n] = function(e, i) {
                return "number" != typeof e ? a["outer" + n].call(this, e) : this.each(function() {
                    t(this).css(r, o(this, e, !0, i) + "px")
                })
            }
        }), t.fn.addBack || (t.fn.addBack = function(t) {
            return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
        }), t("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (t.fn.removeData = function(e) {
            return function(i) {
                return arguments.length ? e.call(this, t.camelCase(i)) : e.call(this)
            }
        }(t.fn.removeData)), t.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), t.support.selectstart = "onselectstart" in document.createElement("div"), t.fn.extend({
            disableSelection: function() {
                return this.bind((t.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(t) {
                    t.preventDefault()
                })
            },
            enableSelection: function() {
                return this.unbind(".ui-disableSelection")
            }
        }), t.extend(t.ui, {
            plugin: {
                add: function(e, i, n) {
                    var o, s = t.ui[e].prototype;
                    for (o in n) s.plugins[o] = s.plugins[o] || [], s.plugins[o].push([i, n[o]])
                },
                call: function(t, e, i) {
                    var n, o = t.plugins[e];
                    if (o && t.element[0].parentNode && 11 !== t.element[0].parentNode.nodeType)
                        for (n = 0; o.length > n; n++) t.options[o[n][0]] && o[n][1].apply(t.element, i)
                }
            },
            hasScroll: function(e, i) {
                if ("hidden" === t(e).css("overflow")) return !1;
                var n = i && "left" === i ? "scrollLeft" : "scrollTop",
                    o = !1;
                return e[n] > 0 || (e[n] = 1, o = e[n] > 0, e[n] = 0, o)
            }
        })
    }(jQuery),
    function(t, e) {
        var i = 0,
            n = Array.prototype.slice,
            o = t.cleanData;
        t.cleanData = function(e) {
            for (var i, n = 0; null != (i = e[n]); n++) try {
                t(i).triggerHandler("remove")
            } catch (s) {}
            o(e)
        }, t.widget = function(i, n, o) {
            var s, r, a, l, c = {},
                u = i.split(".")[0];
            i = i.split(".")[1], s = u + "-" + i, o || (o = n, n = t.Widget), t.expr[":"][s.toLowerCase()] = function(e) {
                return !!t.data(e, s)
            }, t[u] = t[u] || {}, r = t[u][i], a = t[u][i] = function(t, i) {
                return this._createWidget ? (arguments.length && this._createWidget(t, i), e) : new a(t, i)
            }, t.extend(a, r, {
                version: o.version,
                _proto: t.extend({}, o),
                _childConstructors: []
            }), l = new n, l.options = t.widget.extend({}, l.options), t.each(o, function(i, o) {
                return t.isFunction(o) ? (c[i] = function() {
                    var t = function() {
                            return n.prototype[i].apply(this, arguments)
                        },
                        e = function(t) {
                            return n.prototype[i].apply(this, t)
                        };
                    return function() {
                        var i, n = this._super,
                            s = this._superApply;
                        return this._super = t, this._superApply = e, i = o.apply(this, arguments), this._super = n, this._superApply = s, i
                    }
                }(), e) : (c[i] = o, e)
            }), a.prototype = t.widget.extend(l, {
                widgetEventPrefix: r ? l.widgetEventPrefix || i : i
            }, c, {
                constructor: a,
                namespace: u,
                widgetName: i,
                widgetFullName: s
            }), r ? (t.each(r._childConstructors, function(e, i) {
                var n = i.prototype;
                t.widget(n.namespace + "." + n.widgetName, a, i._proto)
            }), delete r._childConstructors) : n._childConstructors.push(a), t.widget.bridge(i, a)
        }, t.widget.extend = function(i) {
            for (var o, s, r = n.call(arguments, 1), a = 0, l = r.length; l > a; a++)
                for (o in r[a]) s = r[a][o], r[a].hasOwnProperty(o) && s !== e && (i[o] = t.isPlainObject(s) ? t.isPlainObject(i[o]) ? t.widget.extend({}, i[o], s) : t.widget.extend({}, s) : s);
            return i
        }, t.widget.bridge = function(i, o) {
            var s = o.prototype.widgetFullName || i;
            t.fn[i] = function(r) {
                var a = "string" == typeof r,
                    l = n.call(arguments, 1),
                    c = this;
                return r = !a && l.length ? t.widget.extend.apply(null, [r].concat(l)) : r, a ? this.each(function() {
                    var n, o = t.data(this, s);
                    return o ? t.isFunction(o[r]) && "_" !== r.charAt(0) ? (n = o[r].apply(o, l), n !== o && n !== e ? (c = n && n.jquery ? c.pushStack(n.get()) : n, !1) : e) : t.error("no such method '" + r + "' for " + i + " widget instance") : t.error("cannot call methods on " + i + " prior to initialization; attempted to call method '" + r + "'")
                }) : this.each(function() {
                    var e = t.data(this, s);
                    e ? e.option(r || {})._init() : t.data(this, s, new o(r, this))
                }), c
            }
        }, t.Widget = function() {}, t.Widget._childConstructors = [], t.Widget.prototype = {
            widgetName: "widget",
            widgetEventPrefix: "",
            defaultElement: "<div>",
            options: {
                disabled: !1,
                create: null
            },
            _createWidget: function(e, n) {
                n = t(n || this.defaultElement || this)[0], this.element = t(n), this.uuid = i++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = t.widget.extend({}, this.options, this._getCreateOptions(), e), this.bindings = t(), this.hoverable = t(), this.focusable = t(), n !== this && (t.data(n, this.widgetFullName, this), this._on(!0, this.element, {
                    remove: function(t) {
                        t.target === n && this.destroy()
                    }
                }), this.document = t(n.style ? n.ownerDocument : n.document || n), this.window = t(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
            },
            _getCreateOptions: t.noop,
            _getCreateEventData: t.noop,
            _create: t.noop,
            _init: t.noop,
            destroy: function() {
                this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(t.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
            },
            _destroy: t.noop,
            widget: function() {
                return this.element
            },
            option: function(i, n) {
                var o, s, r, a = i;
                if (0 === arguments.length) return t.widget.extend({}, this.options);
                if ("string" == typeof i)
                    if (a = {}, o = i.split("."), i = o.shift(), o.length) {
                        for (s = a[i] = t.widget.extend({}, this.options[i]), r = 0; o.length - 1 > r; r++) s[o[r]] = s[o[r]] || {}, s = s[o[r]];
                        if (i = o.pop(), 1 === arguments.length) return s[i] === e ? null : s[i];
                        s[i] = n
                    } else {
                        if (1 === arguments.length) return this.options[i] === e ? null : this.options[i];
                        a[i] = n
                    }
                return this._setOptions(a), this
            },
            _setOptions: function(t) {
                var e;
                for (e in t) this._setOption(e, t[e]);
                return this
            },
            _setOption: function(t, e) {
                return this.options[t] = e, "disabled" === t && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!e).attr("aria-disabled", e), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
            },
            enable: function() {
                return this._setOption("disabled", !1)
            },
            disable: function() {
                return this._setOption("disabled", !0)
            },
            _on: function(i, n, o) {
                var s, r = this;
                "boolean" != typeof i && (o = n, n = i, i = !1), o ? (n = s = t(n), this.bindings = this.bindings.add(n)) : (o = n, n = this.element, s = this.widget()), t.each(o, function(o, a) {
                    function l() {
                        return i || r.options.disabled !== !0 && !t(this).hasClass("ui-state-disabled") ? ("string" == typeof a ? r[a] : a).apply(r, arguments) : e
                    }
                    "string" != typeof a && (l.guid = a.guid = a.guid || l.guid || t.guid++);
                    var c = o.match(/^(\w+)\s*(.*)$/),
                        u = c[1] + r.eventNamespace,
                        h = c[2];
                    h ? s.delegate(h, u, l) : n.bind(u, l)
                })
            },
            _off: function(t, e) {
                e = (e || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, t.unbind(e).undelegate(e)
            },
            _delay: function(t, e) {
                function i() {
                    return ("string" == typeof t ? n[t] : t).apply(n, arguments)
                }
                var n = this;
                return setTimeout(i, e || 0)
            },
            _hoverable: function(e) {
                this.hoverable = this.hoverable.add(e), this._on(e, {
                    mouseenter: function(e) {
                        t(e.currentTarget).addClass("ui-state-hover")
                    },
                    mouseleave: function(e) {
                        t(e.currentTarget).removeClass("ui-state-hover")
                    }
                })
            },
            _focusable: function(e) {
                this.focusable = this.focusable.add(e), this._on(e, {
                    focusin: function(e) {
                        t(e.currentTarget).addClass("ui-state-focus")
                    },
                    focusout: function(e) {
                        t(e.currentTarget).removeClass("ui-state-focus")
                    }
                })
            },
            _trigger: function(e, i, n) {
                var o, s, r = this.options[e];
                if (n = n || {}, i = t.Event(i), i.type = (e === this.widgetEventPrefix ? e : this.widgetEventPrefix + e).toLowerCase(), i.target = this.element[0], s = i.originalEvent)
                    for (o in s) o in i || (i[o] = s[o]);
                return this.element.trigger(i, n), !(t.isFunction(r) && r.apply(this.element[0], [i].concat(n)) === !1 || i.isDefaultPrevented())
            }
        }, t.each({
            show: "fadeIn",
            hide: "fadeOut"
        }, function(e, i) {
            t.Widget.prototype["_" + e] = function(n, o, s) {
                "string" == typeof o && (o = {
                    effect: o
                });
                var r, a = o ? o === !0 || "number" == typeof o ? i : o.effect || i : e;
                o = o || {}, "number" == typeof o && (o = {
                    duration: o
                }), r = !t.isEmptyObject(o), o.complete = s, o.delay && n.delay(o.delay), r && t.effects && t.effects.effect[a] ? n[e](o) : a !== e && n[a] ? n[a](o.duration, o.easing, s) : n.queue(function(i) {
                    t(this)[e](), s && s.call(n[0]), i()
                })
            }
        })
    }(jQuery),
    function(t) {
        var e = !1;
        t(document).mouseup(function() {
            e = !1
        }), t.widget("ui.mouse", {
            version: "1.10.4",
            options: {
                cancel: "input,textarea,button,select,option",
                distance: 1,
                delay: 0
            },
            _mouseInit: function() {
                var e = this;
                this.element.bind("mousedown." + this.widgetName, function(t) {
                    return e._mouseDown(t)
                }).bind("click." + this.widgetName, function(i) {
                    return !0 === t.data(i.target, e.widgetName + ".preventClickEvent") ? (t.removeData(i.target, e.widgetName + ".preventClickEvent"), i.stopImmediatePropagation(), !1) : void 0
                }), this.started = !1
            },
            _mouseDestroy: function() {
                this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
            },
            _mouseDown: function(i) {
                if (!e) {
                    this._mouseStarted && this._mouseUp(i), this._mouseDownEvent = i;
                    var n = this,
                        o = 1 === i.which,
                        s = !("string" != typeof this.options.cancel || !i.target.nodeName) && t(i.target).closest(this.options.cancel).length;
                    return !(o && !s && this._mouseCapture(i)) || (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
                        n.mouseDelayMet = !0
                    }, this.options.delay)), this._mouseDistanceMet(i) && this._mouseDelayMet(i) && (this._mouseStarted = this._mouseStart(i) !== !1, !this._mouseStarted) ? (i.preventDefault(), !0) : (!0 === t.data(i.target, this.widgetName + ".preventClickEvent") && t.removeData(i.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(t) {
                        return n._mouseMove(t)
                    }, this._mouseUpDelegate = function(t) {
                        return n._mouseUp(t)
                    }, t(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), i.preventDefault(), e = !0, !0))
                }
            },
            _mouseMove: function(e) {
                return t.ui.ie && (!document.documentMode || 9 > document.documentMode) && !e.button ? this._mouseUp(e) : this._mouseStarted ? (this._mouseDrag(e), e.preventDefault()) : (this._mouseDistanceMet(e) && this._mouseDelayMet(e) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, e) !== !1, this._mouseStarted ? this._mouseDrag(e) : this._mouseUp(e)), !this._mouseStarted)
            },
            _mouseUp: function(e) {
                return t(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, e.target === this._mouseDownEvent.target && t.data(e.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(e)), !1
            },
            _mouseDistanceMet: function(t) {
                return Math.max(Math.abs(this._mouseDownEvent.pageX - t.pageX), Math.abs(this._mouseDownEvent.pageY - t.pageY)) >= this.options.distance
            },
            _mouseDelayMet: function() {
                return this.mouseDelayMet
            },
            _mouseStart: function() {},
            _mouseDrag: function() {},
            _mouseStop: function() {},
            _mouseCapture: function() {
                return !0
            }
        })
    }(jQuery),
    function(t, e) {
        function i(t, e, i) {
            return [parseFloat(t[0]) * (p.test(t[0]) ? e / 100 : 1), parseFloat(t[1]) * (p.test(t[1]) ? i / 100 : 1)]
        }

        function n(e, i) {
            return parseInt(t.css(e, i), 10) || 0
        }

        function o(e) {
            var i = e[0];
            return 9 === i.nodeType ? {
                width: e.width(),
                height: e.height(),
                offset: {
                    top: 0,
                    left: 0
                }
            } : t.isWindow(i) ? {
                width: e.width(),
                height: e.height(),
                offset: {
                    top: e.scrollTop(),
                    left: e.scrollLeft()
                }
            } : i.preventDefault ? {
                width: 0,
                height: 0,
                offset: {
                    top: i.pageY,
                    left: i.pageX
                }
            } : {
                width: e.outerWidth(),
                height: e.outerHeight(),
                offset: e.offset()
            }
        }
        t.ui = t.ui || {};
        var s, r = Math.max,
            a = Math.abs,
            l = Math.round,
            c = /left|center|right/,
            u = /top|center|bottom/,
            h = /[\+\-]\d+(\.[\d]+)?%?/,
            d = /^\w+/,
            p = /%$/,
            f = t.fn.position;
        t.position = {
                scrollbarWidth: function() {
                    if (s !== e) return s;
                    var i, n, o = t("<div style='display:block;position:absolute;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
                        r = o.children()[0];
                    return t("body").append(o), i = r.offsetWidth, o.css("overflow", "scroll"), n = r.offsetWidth, i === n && (n = o[0].clientWidth), o.remove(), s = i - n
                },
                getScrollInfo: function(e) {
                    var i = e.isWindow || e.isDocument ? "" : e.element.css("overflow-x"),
                        n = e.isWindow || e.isDocument ? "" : e.element.css("overflow-y"),
                        o = "scroll" === i || "auto" === i && e.width < e.element[0].scrollWidth,
                        s = "scroll" === n || "auto" === n && e.height < e.element[0].scrollHeight;
                    return {
                        width: s ? t.position.scrollbarWidth() : 0,
                        height: o ? t.position.scrollbarWidth() : 0
                    }
                },
                getWithinInfo: function(e) {
                    var i = t(e || window),
                        n = t.isWindow(i[0]),
                        o = !!i[0] && 9 === i[0].nodeType;
                    return {
                        element: i,
                        isWindow: n,
                        isDocument: o,
                        offset: i.offset() || {
                            left: 0,
                            top: 0
                        },
                        scrollLeft: i.scrollLeft(),
                        scrollTop: i.scrollTop(),
                        width: n ? i.width() : i.outerWidth(),
                        height: n ? i.height() : i.outerHeight()
                    }
                }
            }, t.fn.position = function(e) {
                if (!e || !e.of) return f.apply(this, arguments);
                e = t.extend({}, e);
                var s, p, m, g, v, y, b = t(e.of),
                    w = t.position.getWithinInfo(e.within),
                    _ = t.position.getScrollInfo(w),
                    x = (e.collision || "flip").split(" "),
                    C = {};
                return y = o(b), b[0].preventDefault && (e.at = "left top"), p = y.width, m = y.height, g = y.offset, v = t.extend({}, g), t.each(["my", "at"], function() {
                    var t, i, n = (e[this] || "").split(" ");
                    1 === n.length && (n = c.test(n[0]) ? n.concat(["center"]) : u.test(n[0]) ? ["center"].concat(n) : ["center", "center"]), n[0] = c.test(n[0]) ? n[0] : "center", n[1] = u.test(n[1]) ? n[1] : "center", t = h.exec(n[0]), i = h.exec(n[1]), C[this] = [t ? t[0] : 0, i ? i[0] : 0], e[this] = [d.exec(n[0])[0], d.exec(n[1])[0]]
                }), 1 === x.length && (x[1] = x[0]), "right" === e.at[0] ? v.left += p : "center" === e.at[0] && (v.left += p / 2), "bottom" === e.at[1] ? v.top += m : "center" === e.at[1] && (v.top += m / 2), s = i(C.at, p, m), v.left += s[0], v.top += s[1], this.each(function() {
                    var o, c, u = t(this),
                        h = u.outerWidth(),
                        d = u.outerHeight(),
                        f = n(this, "marginLeft"),
                        y = n(this, "marginTop"),
                        S = h + f + n(this, "marginRight") + _.width,
                        k = d + y + n(this, "marginBottom") + _.height,
                        T = t.extend({}, v),
                        D = i(C.my, u.outerWidth(), u.outerHeight());
                    "right" === e.my[0] ? T.left -= h : "center" === e.my[0] && (T.left -= h / 2), "bottom" === e.my[1] ? T.top -= d : "center" === e.my[1] && (T.top -= d / 2), T.left += D[0], T.top += D[1], t.support.offsetFractions || (T.left = l(T.left), T.top = l(T.top)), o = {
                        marginLeft: f,
                        marginTop: y
                    }, t.each(["left", "top"], function(i, n) {
                        t.ui.position[x[i]] && t.ui.position[x[i]][n](T, {
                            targetWidth: p,
                            targetHeight: m,
                            elemWidth: h,
                            elemHeight: d,
                            collisionPosition: o,
                            collisionWidth: S,
                            collisionHeight: k,
                            offset: [s[0] + D[0], s[1] + D[1]],
                            my: e.my,
                            at: e.at,
                            within: w,
                            elem: u
                        })
                    }), e.using && (c = function(t) {
                        var i = g.left - T.left,
                            n = i + p - h,
                            o = g.top - T.top,
                            s = o + m - d,
                            l = {
                                target: {
                                    element: b,
                                    left: g.left,
                                    top: g.top,
                                    width: p,
                                    height: m
                                },
                                element: {
                                    element: u,
                                    left: T.left,
                                    top: T.top,
                                    width: h,
                                    height: d
                                },
                                horizontal: 0 > n ? "left" : i > 0 ? "right" : "center",
                                vertical: 0 > s ? "top" : o > 0 ? "bottom" : "middle"
                            };
                        h > p && p > a(i + n) && (l.horizontal = "center"), d > m && m > a(o + s) && (l.vertical = "middle"), l.important = r(a(i), a(n)) > r(a(o), a(s)) ? "horizontal" : "vertical", e.using.call(this, t, l)
                    }), u.offset(t.extend(T, {
                        using: c
                    }))
                })
            }, t.ui.position = {
                fit: {
                    left: function(t, e) {
                        var i, n = e.within,
                            o = n.isWindow ? n.scrollLeft : n.offset.left,
                            s = n.width,
                            a = t.left - e.collisionPosition.marginLeft,
                            l = o - a,
                            c = a + e.collisionWidth - s - o;
                        e.collisionWidth > s ? l > 0 && 0 >= c ? (i = t.left + l + e.collisionWidth - s - o, t.left += l - i) : t.left = c > 0 && 0 >= l ? o : l > c ? o + s - e.collisionWidth : o : l > 0 ? t.left += l : c > 0 ? t.left -= c : t.left = r(t.left - a, t.left)
                    },
                    top: function(t, e) {
                        var i, n = e.within,
                            o = n.isWindow ? n.scrollTop : n.offset.top,
                            s = e.within.height,
                            a = t.top - e.collisionPosition.marginTop,
                            l = o - a,
                            c = a + e.collisionHeight - s - o;
                        e.collisionHeight > s ? l > 0 && 0 >= c ? (i = t.top + l + e.collisionHeight - s - o, t.top += l - i) : t.top = c > 0 && 0 >= l ? o : l > c ? o + s - e.collisionHeight : o : l > 0 ? t.top += l : c > 0 ? t.top -= c : t.top = r(t.top - a, t.top)
                    }
                },
                flip: {
                    left: function(t, e) {
                        var i, n, o = e.within,
                            s = o.offset.left + o.scrollLeft,
                            r = o.width,
                            l = o.isWindow ? o.scrollLeft : o.offset.left,
                            c = t.left - e.collisionPosition.marginLeft,
                            u = c - l,
                            h = c + e.collisionWidth - r - l,
                            d = "left" === e.my[0] ? -e.elemWidth : "right" === e.my[0] ? e.elemWidth : 0,
                            p = "left" === e.at[0] ? e.targetWidth : "right" === e.at[0] ? -e.targetWidth : 0,
                            f = -2 * e.offset[0];
                        0 > u ? (i = t.left + d + p + f + e.collisionWidth - r - s, (0 > i || a(u) > i) && (t.left += d + p + f)) : h > 0 && (n = t.left - e.collisionPosition.marginLeft + d + p + f - l, (n > 0 || h > a(n)) && (t.left += d + p + f))
                    },
                    top: function(t, e) {
                        var i, n, o = e.within,
                            s = o.offset.top + o.scrollTop,
                            r = o.height,
                            l = o.isWindow ? o.scrollTop : o.offset.top,
                            c = t.top - e.collisionPosition.marginTop,
                            u = c - l,
                            h = c + e.collisionHeight - r - l,
                            d = "top" === e.my[1],
                            p = d ? -e.elemHeight : "bottom" === e.my[1] ? e.elemHeight : 0,
                            f = "top" === e.at[1] ? e.targetHeight : "bottom" === e.at[1] ? -e.targetHeight : 0,
                            m = -2 * e.offset[1];
                        0 > u ? (n = t.top + p + f + m + e.collisionHeight - r - s, t.top + p + f + m > u && (0 > n || a(u) > n) && (t.top += p + f + m)) : h > 0 && (i = t.top - e.collisionPosition.marginTop + p + f + m - l, t.top + p + f + m > h && (i > 0 || h > a(i)) && (t.top += p + f + m))
                    }
                },
                flipfit: {
                    left: function() {
                        t.ui.position.flip.left.apply(this, arguments), t.ui.position.fit.left.apply(this, arguments)
                    },
                    top: function() {
                        t.ui.position.flip.top.apply(this, arguments), t.ui.position.fit.top.apply(this, arguments)
                    }
                }
            },
            function() {
                var e, i, n, o, s, r = document.getElementsByTagName("body")[0],
                    a = document.createElement("div");
                e = document.createElement(r ? "div" : "body"), n = {
                    visibility: "hidden",
                    width: 0,
                    height: 0,
                    border: 0,
                    margin: 0,
                    background: "none"
                }, r && t.extend(n, {
                    position: "absolute",
                    left: "-1000px",
                    top: "-1000px"
                });
                for (s in n) e.style[s] = n[s];
                e.appendChild(a), i = r || document.documentElement, i.insertBefore(e, i.firstChild), a.style.cssText = "position: absolute; left: 10.7432222px;", o = t(a).offset().left, t.support.offsetFractions = o > 10 && 11 > o, e.innerHTML = "", i.removeChild(e)
            }()
    }(jQuery),
    function(t) {
        function e(t, e, i) {
            return t > e && e + i > t
        }

        function i(t) {
            return /left|right/.test(t.css("float")) || /inline|table-cell/.test(t.css("display"))
        }
        t.widget("ui.sortable", t.ui.mouse, {
            version: "1.10.4",
            widgetEventPrefix: "sort",
            ready: !1,
            options: {
                appendTo: "parent",
                axis: !1,
                connectWith: !1,
                containment: !1,
                cursor: "auto",
                cursorAt: !1,
                dropOnEmpty: !0,
                forcePlaceholderSize: !1,
                forceHelperSize: !1,
                grid: !1,
                handle: !1,
                helper: "original",
                items: "> *",
                opacity: !1,
                placeholder: !1,
                revert: !1,
                scroll: !0,
                scrollSensitivity: 20,
                scrollSpeed: 20,
                scope: "default",
                tolerance: "intersect",
                zIndex: 1e3,
                activate: null,
                beforeStop: null,
                change: null,
                deactivate: null,
                out: null,
                over: null,
                receive: null,
                remove: null,
                sort: null,
                start: null,
                stop: null,
                update: null
            },
            _create: function() {
                var t = this.options;
                this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = !!this.items.length && ("x" === t.axis || i(this.items[0].item)), this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
            },
            _destroy: function() {
                this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
                for (var t = this.items.length - 1; t >= 0; t--) this.items[t].item.removeData(this.widgetName + "-item");
                return this
            },
            _setOption: function(e, i) {
                "disabled" === e ? (this.options[e] = i, this.widget().toggleClass("ui-sortable-disabled", !!i)) : t.Widget.prototype._setOption.apply(this, arguments)
            },
            _mouseCapture: function(e, i) {
                var n = null,
                    o = !1,
                    s = this;
                return !this.reverting && (!this.options.disabled && "static" !== this.options.type && (this._refreshItems(e), t(e.target).parents().each(function() {
                    return t.data(this, s.widgetName + "-item") === s ? (n = t(this), !1) : void 0
                }), t.data(e.target, s.widgetName + "-item") === s && (n = t(e.target)), !!n && (!(this.options.handle && !i && (t(this.options.handle, n).find("*").addBack().each(function() {
                    this === e.target && (o = !0)
                }), !o)) && (this.currentItem = n, this._removeCurrentsFromItems(), !0))))
            },
            _mouseStart: function(e, i, n) {
                var o, s, r = this.options;
                if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(e), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
                        top: this.offset.top - this.margins.top,
                        left: this.offset.left - this.margins.left
                    }, t.extend(this.offset, {
                        click: {
                            left: e.pageX - this.offset.left,
                            top: e.pageY - this.offset.top
                        },
                        parent: this._getParentOffset(),
                        relative: this._getRelativeOffset()
                    }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(e), this.originalPageX = e.pageX, this.originalPageY = e.pageY, r.cursorAt && this._adjustOffsetFromHelper(r.cursorAt), this.domPosition = {
                        prev: this.currentItem.prev()[0],
                        parent: this.currentItem.parent()[0]
                    }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), r.containment && this._setContainment(), r.cursor && "auto" !== r.cursor && (s = this.document.find("body"), this.storedCursor = s.css("cursor"), s.css("cursor", r.cursor), this.storedStylesheet = t("<style>*{ cursor: " + r.cursor + " !important; }</style>").appendTo(s)), r.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", r.opacity)), r.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", r.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", e, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !n)
                    for (o = this.containers.length - 1; o >= 0; o--) this.containers[o]._trigger("activate", e, this._uiHash(this));
                return t.ui.ddmanager && (t.ui.ddmanager.current = this), t.ui.ddmanager && !r.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(e), !0
            },
            _mouseDrag: function(e) {
                var i, n, o, s, r = this.options,
                    a = !1;
                for (this.position = this._generatePosition(e), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - e.pageY < r.scrollSensitivity ? this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop + r.scrollSpeed : e.pageY - this.overflowOffset.top < r.scrollSensitivity && (this.scrollParent[0].scrollTop = a = this.scrollParent[0].scrollTop - r.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - e.pageX < r.scrollSensitivity ? this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft + r.scrollSpeed : e.pageX - this.overflowOffset.left < r.scrollSensitivity && (this.scrollParent[0].scrollLeft = a = this.scrollParent[0].scrollLeft - r.scrollSpeed)) : (e.pageY - t(document).scrollTop() < r.scrollSensitivity ? a = t(document).scrollTop(t(document).scrollTop() - r.scrollSpeed) : t(window).height() - (e.pageY - t(document).scrollTop()) < r.scrollSensitivity && (a = t(document).scrollTop(t(document).scrollTop() + r.scrollSpeed)), e.pageX - t(document).scrollLeft() < r.scrollSensitivity ? a = t(document).scrollLeft(t(document).scrollLeft() - r.scrollSpeed) : t(window).width() - (e.pageX - t(document).scrollLeft()) < r.scrollSensitivity && (a = t(document).scrollLeft(t(document).scrollLeft() + r.scrollSpeed))), a !== !1 && t.ui.ddmanager && !r.dropBehaviour && t.ui.ddmanager.prepareOffsets(this, e)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), i = this.items.length - 1; i >= 0; i--)
                    if (n = this.items[i], o = n.item[0], s = this._intersectsWithPointer(n), s && n.instance === this.currentContainer && o !== this.currentItem[0] && this.placeholder[1 === s ? "next" : "prev"]()[0] !== o && !t.contains(this.placeholder[0], o) && ("semi-dynamic" !== this.options.type || !t.contains(this.element[0], o))) {
                        if (this.direction = 1 === s ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(n)) break;
                        this._rearrange(e, n), this._trigger("change", e, this._uiHash());
                        break
                    }
                return this._contactContainers(e), t.ui.ddmanager && t.ui.ddmanager.drag(this, e), this._trigger("sort", e, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
            },
            _mouseStop: function(e, i) {
                if (e) {
                    if (t.ui.ddmanager && !this.options.dropBehaviour && t.ui.ddmanager.drop(this, e), this.options.revert) {
                        var n = this,
                            o = this.placeholder.offset(),
                            s = this.options.axis,
                            r = {};
                        s && "x" !== s || (r.left = o.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), s && "y" !== s || (r.top = o.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, t(this.helper).animate(r, parseInt(this.options.revert, 10) || 500, function() {
                            n._clear(e)
                        })
                    } else this._clear(e, i);
                    return !1
                }
            },
            cancel: function() {
                if (this.dragging) {
                    this._mouseUp({
                        target: null
                    }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
                    for (var e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("deactivate", null, this._uiHash(this)), this.containers[e].containerCache.over && (this.containers[e]._trigger("out", null, this._uiHash(this)), this.containers[e].containerCache.over = 0)
                }
                return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), t.extend(this, {
                    helper: null,
                    dragging: !1,
                    reverting: !1,
                    _noFinalSort: null
                }), this.domPosition.prev ? t(this.domPosition.prev).after(this.currentItem) : t(this.domPosition.parent).prepend(this.currentItem)), this
            },
            serialize: function(e) {
                var i = this._getItemsAsjQuery(e && e.connected),
                    n = [];
                return e = e || {}, t(i).each(function() {
                    var i = (t(e.item || this).attr(e.attribute || "id") || "").match(e.expression || /(.+)[\-=_](.+)/);
                    i && n.push((e.key || i[1] + "[]") + "=" + (e.key && e.expression ? i[1] : i[2]))
                }), !n.length && e.key && n.push(e.key + "="), n.join("&")
            },
            toArray: function(e) {
                var i = this._getItemsAsjQuery(e && e.connected),
                    n = [];
                return e = e || {}, i.each(function() {
                    n.push(t(e.item || this).attr(e.attribute || "id") || "")
                }), n
            },
            _intersectsWith: function(t) {
                var e = this.positionAbs.left,
                    i = e + this.helperProportions.width,
                    n = this.positionAbs.top,
                    o = n + this.helperProportions.height,
                    s = t.left,
                    r = s + t.width,
                    a = t.top,
                    l = a + t.height,
                    c = this.offset.click.top,
                    u = this.offset.click.left,
                    h = "x" === this.options.axis || n + c > a && l > n + c,
                    d = "y" === this.options.axis || e + u > s && r > e + u,
                    p = h && d;
                return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > t[this.floating ? "width" : "height"] ? p : e + this.helperProportions.width / 2 > s && r > i - this.helperProportions.width / 2 && n + this.helperProportions.height / 2 > a && l > o - this.helperProportions.height / 2
            },
            _intersectsWithPointer: function(t) {
                var i = "x" === this.options.axis || e(this.positionAbs.top + this.offset.click.top, t.top, t.height),
                    n = "y" === this.options.axis || e(this.positionAbs.left + this.offset.click.left, t.left, t.width),
                    o = i && n,
                    s = this._getDragVerticalDirection(),
                    r = this._getDragHorizontalDirection();
                return !!o && (this.floating ? r && "right" === r || "down" === s ? 2 : 1 : s && ("down" === s ? 2 : 1))
            },
            _intersectsWithSides: function(t) {
                var i = e(this.positionAbs.top + this.offset.click.top, t.top + t.height / 2, t.height),
                    n = e(this.positionAbs.left + this.offset.click.left, t.left + t.width / 2, t.width),
                    o = this._getDragVerticalDirection(),
                    s = this._getDragHorizontalDirection();
                return this.floating && s ? "right" === s && n || "left" === s && !n : o && ("down" === o && i || "up" === o && !i)
            },
            _getDragVerticalDirection: function() {
                var t = this.positionAbs.top - this.lastPositionAbs.top;
                return 0 !== t && (t > 0 ? "down" : "up")
            },
            _getDragHorizontalDirection: function() {
                var t = this.positionAbs.left - this.lastPositionAbs.left;
                return 0 !== t && (t > 0 ? "right" : "left")
            },
            refresh: function(t) {
                return this._refreshItems(t), this.refreshPositions(), this
            },
            _connectWith: function() {
                var t = this.options;
                return t.connectWith.constructor === String ? [t.connectWith] : t.connectWith
            },
            _getItemsAsjQuery: function(e) {
                function i() {
                    a.push(this)
                }
                var n, o, s, r, a = [],
                    l = [],
                    c = this._connectWith();
                if (c && e)
                    for (n = c.length - 1; n >= 0; n--)
                        for (s = t(c[n]), o = s.length - 1; o >= 0; o--) r = t.data(s[o], this.widgetFullName), r && r !== this && !r.options.disabled && l.push([t.isFunction(r.options.items) ? r.options.items.call(r.element) : t(r.options.items, r.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), r]);
                for (l.push([t.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
                        options: this.options,
                        item: this.currentItem
                    }) : t(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), n = l.length - 1; n >= 0; n--) l[n][0].each(i);
                return t(a)
            },
            _removeCurrentsFromItems: function() {
                var e = this.currentItem.find(":data(" + this.widgetName + "-item)");
                this.items = t.grep(this.items, function(t) {
                    for (var i = 0; e.length > i; i++)
                        if (e[i] === t.item[0]) return !1;
                    return !0
                })
            },
            _refreshItems: function(e) {
                this.items = [], this.containers = [this];
                var i, n, o, s, r, a, l, c, u = this.items,
                    h = [
                        [t.isFunction(this.options.items) ? this.options.items.call(this.element[0], e, {
                            item: this.currentItem
                        }) : t(this.options.items, this.element), this]
                    ],
                    d = this._connectWith();
                if (d && this.ready)
                    for (i = d.length - 1; i >= 0; i--)
                        for (o = t(d[i]), n = o.length - 1; n >= 0; n--) s = t.data(o[n], this.widgetFullName), s && s !== this && !s.options.disabled && (h.push([t.isFunction(s.options.items) ? s.options.items.call(s.element[0], e, {
                            item: this.currentItem
                        }) : t(s.options.items, s.element), s]), this.containers.push(s));
                for (i = h.length - 1; i >= 0; i--)
                    for (r = h[i][1], a = h[i][0], n = 0, c = a.length; c > n; n++) l = t(a[n]), l.data(this.widgetName + "-item", r), u.push({
                        item: l,
                        instance: r,
                        width: 0,
                        height: 0,
                        left: 0,
                        top: 0
                    })
            },
            refreshPositions: function(e) {
                this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
                var i, n, o, s;
                for (i = this.items.length - 1; i >= 0; i--) n = this.items[i], n.instance !== this.currentContainer && this.currentContainer && n.item[0] !== this.currentItem[0] || (o = this.options.toleranceElement ? t(this.options.toleranceElement, n.item) : n.item, e || (n.width = o.outerWidth(), n.height = o.outerHeight()), s = o.offset(), n.left = s.left, n.top = s.top);
                if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
                else
                    for (i = this.containers.length - 1; i >= 0; i--) s = this.containers[i].element.offset(), this.containers[i].containerCache.left = s.left, this.containers[i].containerCache.top = s.top, this.containers[i].containerCache.width = this.containers[i].element.outerWidth(), this.containers[i].containerCache.height = this.containers[i].element.outerHeight();
                return this
            },
            _createPlaceholder: function(e) {
                e = e || this;
                var i, n = e.options;
                n.placeholder && n.placeholder.constructor !== String || (i = n.placeholder, n.placeholder = {
                    element: function() {
                        var n = e.currentItem[0].nodeName.toLowerCase(),
                            o = t("<" + n + ">", e.document[0]).addClass(i || e.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
                        return "tr" === n ? e.currentItem.children().each(function() {
                            t("<td>&#160;</td>", e.document[0]).attr("colspan", t(this).attr("colspan") || 1).appendTo(o)
                        }) : "img" === n && o.attr("src", e.currentItem.attr("src")), i || o.css("visibility", "hidden"), o
                    },
                    update: function(t, o) {
                        (!i || n.forcePlaceholderSize) && (o.height() || o.height(e.currentItem.innerHeight() - parseInt(e.currentItem.css("paddingTop") || 0, 10) - parseInt(e.currentItem.css("paddingBottom") || 0, 10)), o.width() || o.width(e.currentItem.innerWidth() - parseInt(e.currentItem.css("paddingLeft") || 0, 10) - parseInt(e.currentItem.css("paddingRight") || 0, 10)))
                    }
                }), e.placeholder = t(n.placeholder.element.call(e.element, e.currentItem)), e.currentItem.after(e.placeholder), n.placeholder.update(e, e.placeholder)
            },
            _contactContainers: function(n) {
                var o, s, r, a, l, c, u, h, d, p, f = null,
                    m = null;
                for (o = this.containers.length - 1; o >= 0; o--)
                    if (!t.contains(this.currentItem[0], this.containers[o].element[0]))
                        if (this._intersectsWith(this.containers[o].containerCache)) {
                            if (f && t.contains(this.containers[o].element[0], f.element[0])) continue;
                            f = this.containers[o], m = o
                        } else this.containers[o].containerCache.over && (this.containers[o]._trigger("out", n, this._uiHash(this)), this.containers[o].containerCache.over = 0);
                if (f)
                    if (1 === this.containers.length) this.containers[m].containerCache.over || (this.containers[m]._trigger("over", n, this._uiHash(this)), this.containers[m].containerCache.over = 1);
                    else {
                        for (r = 1e4, a = null, p = f.floating || i(this.currentItem), l = p ? "left" : "top", c = p ? "width" : "height", u = this.positionAbs[l] + this.offset.click[l], s = this.items.length - 1; s >= 0; s--) t.contains(this.containers[m].element[0], this.items[s].item[0]) && this.items[s].item[0] !== this.currentItem[0] && (!p || e(this.positionAbs.top + this.offset.click.top, this.items[s].top, this.items[s].height)) && (h = this.items[s].item.offset()[l], d = !1, Math.abs(h - u) > Math.abs(h + this.items[s][c] - u) && (d = !0, h += this.items[s][c]), r > Math.abs(h - u) && (r = Math.abs(h - u), a = this.items[s], this.direction = d ? "up" : "down"));
                        if (!a && !this.options.dropOnEmpty) return;
                        if (this.currentContainer === this.containers[m]) return;
                        a ? this._rearrange(n, a, null, !0) : this._rearrange(n, null, this.containers[m].element, !0), this._trigger("change", n, this._uiHash()), this.containers[m]._trigger("change", n, this._uiHash(this)), this.currentContainer = this.containers[m], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[m]._trigger("over", n, this._uiHash(this)), this.containers[m].containerCache.over = 1
                    }
            },
            _createHelper: function(e) {
                var i = this.options,
                    n = t.isFunction(i.helper) ? t(i.helper.apply(this.element[0], [e, this.currentItem])) : "clone" === i.helper ? this.currentItem.clone() : this.currentItem;
                return n.parents("body").length || t("parent" !== i.appendTo ? i.appendTo : this.currentItem[0].parentNode)[0].appendChild(n[0]), n[0] === this.currentItem[0] && (this._storedCSS = {
                    width: this.currentItem[0].style.width,
                    height: this.currentItem[0].style.height,
                    position: this.currentItem.css("position"),
                    top: this.currentItem.css("top"),
                    left: this.currentItem.css("left")
                }), (!n[0].style.width || i.forceHelperSize) && n.width(this.currentItem.width()), (!n[0].style.height || i.forceHelperSize) && n.height(this.currentItem.height()), n
            },
            _adjustOffsetFromHelper: function(e) {
                "string" == typeof e && (e = e.split(" ")), t.isArray(e) && (e = {
                    left: +e[0],
                    top: +e[1] || 0
                }), "left" in e && (this.offset.click.left = e.left + this.margins.left), "right" in e && (this.offset.click.left = this.helperProportions.width - e.right + this.margins.left), "top" in e && (this.offset.click.top = e.top + this.margins.top), "bottom" in e && (this.offset.click.top = this.helperProportions.height - e.bottom + this.margins.top)
            },
            _getParentOffset: function() {
                this.offsetParent = this.helper.offsetParent();
                var e = this.offsetParent.offset();
                return "absolute" === this.cssPosition && this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) && (e.left += this.scrollParent.scrollLeft(), e.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && t.ui.ie) && (e = {
                    top: 0,
                    left: 0
                }), {
                    top: e.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
                    left: e.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
                }
            },
            _getRelativeOffset: function() {
                if ("relative" === this.cssPosition) {
                    var t = this.currentItem.position();
                    return {
                        top: t.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
                        left: t.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
                    }
                }
                return {
                    top: 0,
                    left: 0
                }
            },
            _cacheMargins: function() {
                this.margins = {
                    left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
                    top: parseInt(this.currentItem.css("marginTop"), 10) || 0
                }
            },
            _cacheHelperProportions: function() {
                this.helperProportions = {
                    width: this.helper.outerWidth(),
                    height: this.helper.outerHeight()
                }
            },
            _setContainment: function() {
                var e, i, n, o = this.options;
                "parent" === o.containment && (o.containment = this.helper[0].parentNode), ("document" === o.containment || "window" === o.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, t("document" === o.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (t("document" === o.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(o.containment) || (e = t(o.containment)[0], i = t(o.containment).offset(), n = "hidden" !== t(e).css("overflow"), this.containment = [i.left + (parseInt(t(e).css("borderLeftWidth"), 10) || 0) + (parseInt(t(e).css("paddingLeft"), 10) || 0) - this.margins.left, i.top + (parseInt(t(e).css("borderTopWidth"), 10) || 0) + (parseInt(t(e).css("paddingTop"), 10) || 0) - this.margins.top, i.left + (n ? Math.max(e.scrollWidth, e.offsetWidth) : e.offsetWidth) - (parseInt(t(e).css("borderLeftWidth"), 10) || 0) - (parseInt(t(e).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, i.top + (n ? Math.max(e.scrollHeight, e.offsetHeight) : e.offsetHeight) - (parseInt(t(e).css("borderTopWidth"), 10) || 0) - (parseInt(t(e).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
            },
            _convertPositionTo: function(e, i) {
                i || (i = this.position);
                var n = "absolute" === e ? 1 : -1,
                    o = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    s = /(html|body)/i.test(o[0].tagName);
                return {
                    top: i.top + this.offset.relative.top * n + this.offset.parent.top * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : s ? 0 : o.scrollTop()) * n,
                    left: i.left + this.offset.relative.left * n + this.offset.parent.left * n - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : s ? 0 : o.scrollLeft()) * n
                }
            },
            _generatePosition: function(e) {
                var i, n, o = this.options,
                    s = e.pageX,
                    r = e.pageY,
                    a = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && t.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
                    l = /(html|body)/i.test(a[0].tagName);
                return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (e.pageX - this.offset.click.left < this.containment[0] && (s = this.containment[0] + this.offset.click.left), e.pageY - this.offset.click.top < this.containment[1] && (r = this.containment[1] + this.offset.click.top), e.pageX - this.offset.click.left > this.containment[2] && (s = this.containment[2] + this.offset.click.left), e.pageY - this.offset.click.top > this.containment[3] && (r = this.containment[3] + this.offset.click.top)), o.grid && (i = this.originalPageY + Math.round((r - this.originalPageY) / o.grid[1]) * o.grid[1], r = this.containment ? i - this.offset.click.top >= this.containment[1] && i - this.offset.click.top <= this.containment[3] ? i : i - this.offset.click.top >= this.containment[1] ? i - o.grid[1] : i + o.grid[1] : i, n = this.originalPageX + Math.round((s - this.originalPageX) / o.grid[0]) * o.grid[0], s = this.containment ? n - this.offset.click.left >= this.containment[0] && n - this.offset.click.left <= this.containment[2] ? n : n - this.offset.click.left >= this.containment[0] ? n - o.grid[0] : n + o.grid[0] : n)), {
                    top: r - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : l ? 0 : a.scrollTop()),
                    left: s - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : l ? 0 : a.scrollLeft())
                }
            },
            _rearrange: function(t, e, i, n) {
                i ? i[0].appendChild(this.placeholder[0]) : e.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? e.item[0] : e.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
                var o = this.counter;
                this._delay(function() {
                    o === this.counter && this.refreshPositions(!n)
                })
            },
            _clear: function(t, e) {
                function i(t, e, i) {
                    return function(n) {
                        i._trigger(t, n, e._uiHash(e))
                    }
                }
                this.reverting = !1;
                var n, o = [];
                if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
                    for (n in this._storedCSS)("auto" === this._storedCSS[n] || "static" === this._storedCSS[n]) && (this._storedCSS[n] = "");
                    this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
                } else this.currentItem.show();
                for (this.fromOutside && !e && o.push(function(t) {
                        this._trigger("receive", t, this._uiHash(this.fromOutside))
                    }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || e || o.push(function(t) {
                        this._trigger("update", t, this._uiHash())
                    }), this !== this.currentContainer && (e || (o.push(function(t) {
                        this._trigger("remove", t, this._uiHash())
                    }), o.push(function(t) {
                        return function(e) {
                            t._trigger("receive", e, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer)), o.push(function(t) {
                        return function(e) {
                            t._trigger("update", e, this._uiHash(this))
                        }
                    }.call(this, this.currentContainer)))), n = this.containers.length - 1; n >= 0; n--) e || o.push(i("deactivate", this, this.containers[n])), this.containers[n].containerCache.over && (o.push(i("out", this, this.containers[n])), this.containers[n].containerCache.over = 0);
                if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
                    if (!e) {
                        for (this._trigger("beforeStop", t, this._uiHash()), n = 0; o.length > n; n++) o[n].call(this, t);
                        this._trigger("stop", t, this._uiHash())
                    }
                    return this.fromOutside = !1, !1
                }
                if (e || this._trigger("beforeStop", t, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !e) {
                    for (n = 0; o.length > n; n++) o[n].call(this, t);
                    this._trigger("stop", t, this._uiHash())
                }
                return this.fromOutside = !1, !0
            },
            _trigger: function() {
                t.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
            },
            _uiHash: function(e) {
                var i = e || this;
                return {
                    helper: i.helper,
                    placeholder: i.placeholder || t([]),
                    position: i.position,
                    originalPosition: i.originalPosition,
                    offset: i.positionAbs,
                    item: i.currentItem,
                    sender: e ? e.element : null
                }
            }
        })
    }(jQuery),
    function(t) {
        t.widget("ui.autocomplete", {
            version: "1.10.4",
            defaultElement: "<input>",
            options: {
                appendTo: null,
                autoFocus: !1,
                delay: 300,
                minLength: 1,
                position: {
                    my: "left top",
                    at: "left bottom",
                    collision: "none"
                },
                source: null,
                change: null,
                close: null,
                focus: null,
                open: null,
                response: null,
                search: null,
                select: null
            },
            requestIndex: 0,
            pending: 0,
            _create: function() {
                var e, i, n, o = this.element[0].nodeName.toLowerCase(),
                    s = "textarea" === o,
                    r = "input" === o;
                this.isMultiLine = !!s || !r && this.element.prop("isContentEditable"), this.valueMethod = this.element[s || r ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
                    keydown: function(o) {
                        if (this.element.prop("readOnly")) return e = !0, n = !0, void(i = !0);
                        e = !1, n = !1, i = !1;
                        var s = t.ui.keyCode;
                        switch (o.keyCode) {
                            case s.PAGE_UP:
                                e = !0, this._move("previousPage", o);
                                break;
                            case s.PAGE_DOWN:
                                e = !0, this._move("nextPage", o);
                                break;
                            case s.UP:
                                e = !0, this._keyEvent("previous", o);
                                break;
                            case s.DOWN:
                                e = !0, this._keyEvent("next", o);
                                break;
                            case s.ENTER:
                            case s.NUMPAD_ENTER:
                                this.menu.active && (e = !0, o.preventDefault(), this.menu.select(o));
                                break;
                            case s.TAB:
                                this.menu.active && this.menu.select(o);
                                break;
                            case s.ESCAPE:
                                this.menu.element.is(":visible") && (this._value(this.term), this.close(o), o.preventDefault());
                                break;
                            default:
                                i = !0, this._searchTimeout(o)
                        }
                    },
                    keypress: function(n) {
                        if (e) return e = !1, void((!this.isMultiLine || this.menu.element.is(":visible")) && n.preventDefault());
                        if (!i) {
                            var o = t.ui.keyCode;
                            switch (n.keyCode) {
                                case o.PAGE_UP:
                                    this._move("previousPage", n);
                                    break;
                                case o.PAGE_DOWN:
                                    this._move("nextPage", n);
                                    break;
                                case o.UP:
                                    this._keyEvent("previous", n);
                                    break;
                                case o.DOWN:
                                    this._keyEvent("next", n)
                            }
                        }
                    },
                    input: function(t) {
                        return n ? (n = !1, void t.preventDefault()) : void this._searchTimeout(t)
                    },
                    focus: function() {
                        this.selectedItem = null, this.previous = this._value()
                    },
                    blur: function(t) {
                        return this.cancelBlur ? void delete this.cancelBlur : (clearTimeout(this.searching), this.close(t), void this._change(t))
                    }
                }), this._initSource(), this.menu = t("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
                    role: null
                }).hide().data("ui-menu"), this._on(this.menu.element, {
                    mousedown: function(e) {
                        e.preventDefault(), this.cancelBlur = !0, this._delay(function() {
                            delete this.cancelBlur
                        });
                        var i = this.menu.element[0];
                        t(e.target).closest(".ui-menu-item").length || this._delay(function() {
                            var e = this;
                            this.document.one("mousedown", function(n) {
                                n.target === e.element[0] || n.target === i || t.contains(i, n.target) || e.close()
                            })
                        })
                    },
                    menufocus: function(e, i) {
                        if (this.isNewMenu && (this.isNewMenu = !1, e.originalEvent && /^mouse/.test(e.originalEvent.type))) return this.menu.blur(), void this.document.one("mousemove", function() {
                            t(e.target).trigger(e.originalEvent)
                        });
                        var n = i.item.data("ui-autocomplete-item");
                        !1 !== this._trigger("focus", e, {
                            item: n
                        }) ? e.originalEvent && /^key/.test(e.originalEvent.type) && this._value(n.value) : this.liveRegion.text(n.value)
                    },
                    menuselect: function(t, e) {
                        var i = e.item.data("ui-autocomplete-item"),
                            n = this.previous;
                        this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = n, this._delay(function() {
                            this.previous = n, this.selectedItem = i
                        })), !1 !== this._trigger("select", t, {
                            item: i
                        }) && this._value(i.value), this.term = this._value(), this.close(t), this.selectedItem = i
                    }
                }), this.liveRegion = t("<span>", {
                    role: "status",
                    "aria-live": "polite"
                }).addClass("ui-helper-hidden-accessible").insertBefore(this.element), this._on(this.window, {
                    beforeunload: function() {
                        this.element.removeAttr("autocomplete")
                    }
                })
            },
            _destroy: function() {
                clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
            },
            _setOption: function(t, e) {
                this._super(t, e), "source" === t && this._initSource(), "appendTo" === t && this.menu.element.appendTo(this._appendTo()), "disabled" === t && e && this.xhr && this.xhr.abort()
            },
            _appendTo: function() {
                var e = this.options.appendTo;
                return e && (e = e.jquery || e.nodeType ? t(e) : this.document.find(e).eq(0)), e || (e = this.element.closest(".ui-front")), e.length || (e = this.document[0].body), e
            },
            _initSource: function() {
                var e, i, n = this;
                t.isArray(this.options.source) ? (e = this.options.source, this.source = function(i, n) {
                    n(t.ui.autocomplete.filter(e, i.term))
                }) : "string" == typeof this.options.source ? (i = this.options.source, this.source = function(e, o) {
                    n.xhr && n.xhr.abort(), n.xhr = t.ajax({
                        url: i,
                        data: e,
                        dataType: "json",
                        success: function(t) {
                            o(t)
                        },
                        error: function() {
                            o([])
                        }
                    })
                }) : this.source = this.options.source
            },
            _searchTimeout: function(t) {
                clearTimeout(this.searching), this.searching = this._delay(function() {
                    this.term !== this._value() && (this.selectedItem = null, this.search(null, t))
                }, this.options.delay)
            },
            search: function(t, e) {
                return t = null != t ? t : this._value(), this.term = this._value(), t.length < this.options.minLength ? this.close(e) : this._trigger("search", e) !== !1 ? this._search(t) : void 0
            },
            _search: function(t) {
                this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
                    term: t
                }, this._response())
            },
            _response: function() {
                var e = ++this.requestIndex;
                return t.proxy(function(t) {
                    e === this.requestIndex && this.__response(t), this.pending--, this.pending || this.element.removeClass("ui-autocomplete-loading")
                }, this)
            },
            __response: function(t) {
                t && (t = this._normalize(t)), this._trigger("response", null, {
                    content: t
                }), !this.options.disabled && t && t.length && !this.cancelSearch ? (this._suggest(t), this._trigger("open")) : this._close()
            },
            close: function(t) {
                this.cancelSearch = !0, this._close(t)
            },
            _close: function(t) {
                this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", t))
            },
            _change: function(t) {
                this.previous !== this._value() && this._trigger("change", t, {
                    item: this.selectedItem
                })
            },
            _normalize: function(e) {
                return e.length && e[0].label && e[0].value ? e : t.map(e, function(e) {
                    return "string" == typeof e ? {
                        label: e,
                        value: e
                    } : t.extend({
                        label: e.label || e.value,
                        value: e.value || e.label
                    }, e)
                })
            },
            _suggest: function(e) {
                var i = this.menu.element.empty();
                this._renderMenu(i, e), this.isNewMenu = !0, this.menu.refresh(), i.show(), this._resizeMenu(), i.position(t.extend({ of: this.element
                }, this.options.position)), this.options.autoFocus && this.menu.next()
            },
            _resizeMenu: function() {
                var t = this.menu.element;
                t.outerWidth(Math.max(t.width("").outerWidth() + 1, this.element.outerWidth()))
            },
            _renderMenu: function(e, i) {
                var n = this;
                t.each(i, function(t, i) {
                    n._renderItemData(e, i)
                })
            },
            _renderItemData: function(t, e) {
                return this._renderItem(t, e).data("ui-autocomplete-item", e)
            },
            _renderItem: function(e, i) {
                return t("<li>").append(t("<a>").text(i.label)).appendTo(e)
            },
            _move: function(t, e) {
                return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(t) || this.menu.isLastItem() && /^next/.test(t) ? (this._value(this.term), void this.menu.blur()) : void this.menu[t](e) : void this.search(null, e)
            },
            widget: function() {
                return this.menu.element
            },
            _value: function() {
                return this.valueMethod.apply(this.element, arguments)
            },
            _keyEvent: function(t, e) {
                (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(t, e), e.preventDefault())
            }
        }), t.extend(t.ui.autocomplete, {
            escapeRegex: function(t) {
                return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
            },
            filter: function(e, i) {
                var n = RegExp(t.ui.autocomplete.escapeRegex(i), "i");
                return t.grep(e, function(t) {
                    return n.test(t.label || t.value || t)
                })
            }
        }), t.widget("ui.autocomplete", t.ui.autocomplete, {
            options: {
                messages: {
                    noResults: "No search results.",
                    results: function(t) {
                        return t + (t > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
                    }
                }
            },
            __response: function(t) {
                var e;
                this._superApply(arguments), this.options.disabled || this.cancelSearch || (e = t && t.length ? this.options.messages.results(t.length) : this.options.messages.noResults, this.liveRegion.text(e))
            }
        })
    }(jQuery),
    function(t, e) {
        function i() {
            this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
                closeText: "Done",
                prevText: "Prev",
                nextText: "Next",
                currentText: "Today",
                monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
                dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
                weekHeader: "Wk",
                dateFormat: "mm/dd/yy",
                firstDay: 0,
                isRTL: !1,
                showMonthAfterYear: !1,
                yearSuffix: ""
            }, this._defaults = {
                showOn: "focus",
                showAnim: "fadeIn",
                showOptions: {},
                defaultDate: null,
                appendText: "",
                buttonText: "...",
                buttonImage: "",
                buttonImageOnly: !1,
                hideIfNoPrevNext: !1,
                navigationAsDateFormat: !1,
                gotoCurrent: !1,
                changeMonth: !1,
                changeYear: !1,
                yearRange: "c-10:c+10",
                showOtherMonths: !1,
                selectOtherMonths: !1,
                showWeek: !1,
                calculateWeek: this.iso8601Week,
                shortYearCutoff: "+10",
                minDate: null,
                maxDate: null,
                duration: "fast",
                beforeShowDay: null,
                beforeShow: null,
                onSelect: null,
                onChangeMonthYear: null,
                onClose: null,
                numberOfMonths: 1,
                showCurrentAtPos: 0,
                stepMonths: 1,
                stepBigMonths: 12,
                altField: "",
                altFormat: "",
                constrainInput: !0,
                showButtonPanel: !1,
                autoSize: !1,
                disabled: !1
            }, t.extend(this._defaults, this.regional[""]), this.dpDiv = n(t("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
        }

        function n(e) {
            var i = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
            return e.delegate(i, "mouseout", function() {
                t(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).removeClass("ui-datepicker-next-hover")
            }).delegate(i, "mouseover", function() {
                t.datepicker._isDisabledDatepicker(s.inline ? e.parent()[0] : s.input[0]) || (t(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), t(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && t(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && t(this).addClass("ui-datepicker-next-hover"))
            })
        }

        function o(e, i) {
            t.extend(e, i);
            for (var n in i) null == i[n] && (e[n] = i[n]);
            return e
        }
        t.extend(t.ui, {
            datepicker: {
                version: "1.10.4"
            }
        });
        var s, r = "datepicker";
        t.extend(i.prototype, {
            markerClassName: "hasDatepicker",
            maxRows: 4,
            _widgetDatepicker: function() {
                return this.dpDiv
            },
            setDefaults: function(t) {
                return o(this._defaults, t || {}), this
            },
            _attachDatepicker: function(e, i) {
                var n, o, s;
                n = e.nodeName.toLowerCase(), o = "div" === n || "span" === n, e.id || (this.uuid += 1, e.id = "dp" + this.uuid), s = this._newInst(t(e), o), s.settings = t.extend({}, i || {}), "input" === n ? this._connectDatepicker(e, s) : o && this._inlineDatepicker(e, s)
            },
            _newInst: function(e, i) {
                var o = e[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
                return {
                    id: o,
                    input: e,
                    selectedDay: 0,
                    selectedMonth: 0,
                    selectedYear: 0,
                    drawMonth: 0,
                    drawYear: 0,
                    inline: i,
                    dpDiv: i ? n(t("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
                }
            },
            _connectDatepicker: function(e, i) {
                var n = t(e);
                i.append = t([]), i.trigger = t([]), n.hasClass(this.markerClassName) || (this._attachments(n, i), n.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(i), t.data(e, r, i), i.settings.disabled && this._disableDatepicker(e))
            },
            _attachments: function(e, i) {
                var n, o, s, r = this._get(i, "appendText"),
                    a = this._get(i, "isRTL");
                i.append && i.append.remove(), r && (i.append = t("<span class='" + this._appendClass + "'>" + r + "</span>"), e[a ? "before" : "after"](i.append)), e.unbind("focus", this._showDatepicker), i.trigger && i.trigger.remove(), n = this._get(i, "showOn"), ("focus" === n || "both" === n) && e.focus(this._showDatepicker), ("button" === n || "both" === n) && (o = this._get(i, "buttonText"), s = this._get(i, "buttonImage"), i.trigger = t(this._get(i, "buttonImageOnly") ? t("<img/>").addClass(this._triggerClass).attr({
                    src: s,
                    alt: o,
                    title: o
                }) : t("<button type='button'></button>").addClass(this._triggerClass).html(s ? t("<img/>").attr({
                    src: s,
                    alt: o,
                    title: o
                }) : o)), e[a ? "before" : "after"](i.trigger), i.trigger.click(function() {
                    return t.datepicker._datepickerShowing && t.datepicker._lastInput === e[0] ? t.datepicker._hideDatepicker() : t.datepicker._datepickerShowing && t.datepicker._lastInput !== e[0] ? (t.datepicker._hideDatepicker(), t.datepicker._showDatepicker(e[0])) : t.datepicker._showDatepicker(e[0]), !1
                }))
            },
            _autoSize: function(t) {
                if (this._get(t, "autoSize") && !t.inline) {
                    var e, i, n, o, s = new Date(2009, 11, 20),
                        r = this._get(t, "dateFormat");
                    r.match(/[DM]/) && (e = function(t) {
                        for (i = 0, n = 0, o = 0; t.length > o; o++) t[o].length > i && (i = t[o].length, n = o);
                        return n
                    }, s.setMonth(e(this._get(t, r.match(/MM/) ? "monthNames" : "monthNamesShort"))), s.setDate(e(this._get(t, r.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - s.getDay())), t.input.attr("size", this._formatDate(t, s).length)
                }
            },
            _inlineDatepicker: function(e, i) {
                var n = t(e);
                n.hasClass(this.markerClassName) || (n.addClass(this.markerClassName).append(i.dpDiv), t.data(e, r, i), this._setDate(i, this._getDefaultDate(i), !0), this._updateDatepicker(i), this._updateAlternate(i), i.settings.disabled && this._disableDatepicker(e), i.dpDiv.css("display", "block"))
            },
            _dialogDatepicker: function(e, i, n, s, a) {
                var l, c, u, h, d, p = this._dialogInst;
                return p || (this.uuid += 1, l = "dp" + this.uuid, this._dialogInput = t("<input type='text' id='" + l + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), t("body").append(this._dialogInput), p = this._dialogInst = this._newInst(this._dialogInput, !1), p.settings = {}, t.data(this._dialogInput[0], r, p)), o(p.settings, s || {}), i = i && i.constructor === Date ? this._formatDate(p, i) : i, this._dialogInput.val(i), this._pos = a ? a.length ? a : [a.pageX, a.pageY] : null, this._pos || (c = document.documentElement.clientWidth, u = document.documentElement.clientHeight, h = document.documentElement.scrollLeft || document.body.scrollLeft, d = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [c / 2 - 100 + h, u / 2 - 150 + d]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), p.settings.onSelect = n, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), t.blockUI && t.blockUI(this.dpDiv), t.data(this._dialogInput[0], r, p), this
            },
            _destroyDatepicker: function(e) {
                var i, n = t(e),
                    o = t.data(e, r);
                n.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), t.removeData(e, r), "input" === i ? (o.append.remove(), o.trigger.remove(), n.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === i || "span" === i) && n.removeClass(this.markerClassName).empty())
            },
            _enableDatepicker: function(e) {
                var i, n, o = t(e),
                    s = t.data(e, r);
                o.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !1, s.trigger.filter("button").each(function() {
                    this.disabled = !1
                }).end().filter("img").css({
                    opacity: "1.0",
                    cursor: ""
                })) : ("div" === i || "span" === i) && (n = o.children("." + this._inlineClass), n.children().removeClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                    return t === e ? null : t
                }))
            },
            _disableDatepicker: function(e) {
                var i, n, o = t(e),
                    s = t.data(e, r);
                o.hasClass(this.markerClassName) && (i = e.nodeName.toLowerCase(), "input" === i ? (e.disabled = !0, s.trigger.filter("button").each(function() {
                    this.disabled = !0
                }).end().filter("img").css({
                    opacity: "0.5",
                    cursor: "default"
                })) : ("div" === i || "span" === i) && (n = o.children("." + this._inlineClass), n.children().addClass("ui-state-disabled"), n.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = t.map(this._disabledInputs, function(t) {
                    return t === e ? null : t
                }), this._disabledInputs[this._disabledInputs.length] = e)
            },
            _isDisabledDatepicker: function(t) {
                if (!t) return !1;
                for (var e = 0; this._disabledInputs.length > e; e++)
                    if (this._disabledInputs[e] === t) return !0;
                return !1
            },
            _getInst: function(e) {
                try {
                    return t.data(e, r)
                } catch (i) {
                    throw "Missing instance data for this datepicker"
                }
            },
            _optionDatepicker: function(i, n, s) {
                var r, a, l, c, u = this._getInst(i);
                return 2 === arguments.length && "string" == typeof n ? "defaults" === n ? t.extend({}, t.datepicker._defaults) : u ? "all" === n ? t.extend({}, u.settings) : this._get(u, n) : null : (r = n || {}, "string" == typeof n && (r = {}, r[n] = s), u && (this._curInst === u && this._hideDatepicker(), a = this._getDateDatepicker(i, !0), l = this._getMinMaxDate(u, "min"), c = this._getMinMaxDate(u, "max"), o(u.settings, r), null !== l && r.dateFormat !== e && r.minDate === e && (u.settings.minDate = this._formatDate(u, l)), null !== c && r.dateFormat !== e && r.maxDate === e && (u.settings.maxDate = this._formatDate(u, c)), "disabled" in r && (r.disabled ? this._disableDatepicker(i) : this._enableDatepicker(i)), this._attachments(t(i), u), this._autoSize(u), this._setDate(u, a), this._updateAlternate(u), this._updateDatepicker(u)), e)
            },
            _changeDatepicker: function(t, e, i) {
                this._optionDatepicker(t, e, i)
            },
            _refreshDatepicker: function(t) {
                var e = this._getInst(t);
                e && this._updateDatepicker(e)
            },
            _setDateDatepicker: function(t, e) {
                var i = this._getInst(t);
                i && (this._setDate(i, e), this._updateDatepicker(i), this._updateAlternate(i))
            },
            _getDateDatepicker: function(t, e) {
                var i = this._getInst(t);
                return i && !i.inline && this._setDateFromField(i, e), i ? this._getDate(i) : null
            },
            _doKeyDown: function(e) {
                var i, n, o, s = t.datepicker._getInst(e.target),
                    r = !0,
                    a = s.dpDiv.is(".ui-datepicker-rtl");
                if (s._keyEvent = !0, t.datepicker._datepickerShowing) switch (e.keyCode) {
                    case 9:
                        t.datepicker._hideDatepicker(), r = !1;
                        break;
                    case 13:
                        return o = t("td." + t.datepicker._dayOverClass + ":not(." + t.datepicker._currentClass + ")", s.dpDiv), o[0] && t.datepicker._selectDay(e.target, s.selectedMonth, s.selectedYear, o[0]), i = t.datepicker._get(s, "onSelect"), i ? (n = t.datepicker._formatDate(s), i.apply(s.input ? s.input[0] : null, [n, s])) : t.datepicker._hideDatepicker(), !1;
                    case 27:
                        t.datepicker._hideDatepicker();
                        break;
                    case 33:
                        t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(s, "stepBigMonths") : -t.datepicker._get(s, "stepMonths"), "M");
                        break;
                    case 34:
                        t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(s, "stepBigMonths") : +t.datepicker._get(s, "stepMonths"), "M");
                        break;
                    case 35:
                        (e.ctrlKey || e.metaKey) && t.datepicker._clearDate(e.target), r = e.ctrlKey || e.metaKey;
                        break;
                    case 36:
                        (e.ctrlKey || e.metaKey) && t.datepicker._gotoToday(e.target), r = e.ctrlKey || e.metaKey;
                        break;
                    case 37:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, a ? 1 : -1, "D"), r = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? -t.datepicker._get(s, "stepBigMonths") : -t.datepicker._get(s, "stepMonths"), "M");
                        break;
                    case 38:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, -7, "D"), r = e.ctrlKey || e.metaKey;
                        break;
                    case 39:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, a ? -1 : 1, "D"), r = e.ctrlKey || e.metaKey, e.originalEvent.altKey && t.datepicker._adjustDate(e.target, e.ctrlKey ? +t.datepicker._get(s, "stepBigMonths") : +t.datepicker._get(s, "stepMonths"), "M");
                        break;
                    case 40:
                        (e.ctrlKey || e.metaKey) && t.datepicker._adjustDate(e.target, 7, "D"), r = e.ctrlKey || e.metaKey;
                        break;
                    default:
                        r = !1
                } else 36 === e.keyCode && e.ctrlKey ? t.datepicker._showDatepicker(this) : r = !1;
                r && (e.preventDefault(), e.stopPropagation())
            },
            _doKeyPress: function(i) {
                var n, o, s = t.datepicker._getInst(i.target);
                return t.datepicker._get(s, "constrainInput") ? (n = t.datepicker._possibleChars(t.datepicker._get(s, "dateFormat")), o = String.fromCharCode(null == i.charCode ? i.keyCode : i.charCode), i.ctrlKey || i.metaKey || " " > o || !n || n.indexOf(o) > -1) : e
            },
            _doKeyUp: function(e) {
                var i, n = t.datepicker._getInst(e.target);
                if (n.input.val() !== n.lastVal) try {
                    i = t.datepicker.parseDate(t.datepicker._get(n, "dateFormat"), n.input ? n.input.val() : null, t.datepicker._getFormatConfig(n)), i && (t.datepicker._setDateFromField(n), t.datepicker._updateAlternate(n), t.datepicker._updateDatepicker(n))
                } catch (o) {}
                return !0
            },
            _showDatepicker: function(e) {
                if (e = e.target || e, "input" !== e.nodeName.toLowerCase() && (e = t("input", e.parentNode)[0]), !t.datepicker._isDisabledDatepicker(e) && t.datepicker._lastInput !== e) {
                    var i, n, s, r, a, l, c;
                    i = t.datepicker._getInst(e), t.datepicker._curInst && t.datepicker._curInst !== i && (t.datepicker._curInst.dpDiv.stop(!0, !0), i && t.datepicker._datepickerShowing && t.datepicker._hideDatepicker(t.datepicker._curInst.input[0])), n = t.datepicker._get(i, "beforeShow"), s = n ? n.apply(e, [e, i]) : {}, s !== !1 && (o(i.settings, s), i.lastVal = null, t.datepicker._lastInput = e, t.datepicker._setDateFromField(i), t.datepicker._inDialog && (e.value = ""), t.datepicker._pos || (t.datepicker._pos = t.datepicker._findPos(e), t.datepicker._pos[1] += e.offsetHeight), r = !1, t(e).parents().each(function() {
                        return r |= "fixed" === t(this).css("position"), !r
                    }), a = {
                        left: t.datepicker._pos[0],
                        top: t.datepicker._pos[1]
                    }, t.datepicker._pos = null, i.dpDiv.empty(), i.dpDiv.css({
                        position: "absolute",
                        display: "block",
                        top: "-1000px"
                    }), t.datepicker._updateDatepicker(i), a = t.datepicker._checkOffset(i, a, r), i.dpDiv.css({
                        position: t.datepicker._inDialog && t.blockUI ? "static" : r ? "fixed" : "absolute",
                        display: "none",
                        left: a.left + "px",
                        top: a.top + "px"
                    }), i.inline || (l = t.datepicker._get(i, "showAnim"), c = t.datepicker._get(i, "duration"), i.dpDiv.zIndex(t(e).zIndex() + 1), t.datepicker._datepickerShowing = !0, t.effects && t.effects.effect[l] ? i.dpDiv.show(l, t.datepicker._get(i, "showOptions"), c) : i.dpDiv[l || "show"](l ? c : null), t.datepicker._shouldFocusInput(i) && i.input.focus(), t.datepicker._curInst = i))
                }
            },
            _updateDatepicker: function(e) {
                this.maxRows = 4, s = e, e.dpDiv.empty().append(this._generateHTML(e)), this._attachHandlers(e), e.dpDiv.find("." + this._dayOverClass + " a").mouseover();
                var i, n = this._getNumberOfMonths(e),
                    o = n[1],
                    r = 17;
                e.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), o > 1 && e.dpDiv.addClass("ui-datepicker-multi-" + o).css("width", r * o + "em"), e.dpDiv[(1 !== n[0] || 1 !== n[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), e.dpDiv[(this._get(e, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), e === t.datepicker._curInst && t.datepicker._datepickerShowing && t.datepicker._shouldFocusInput(e) && e.input.focus(), e.yearshtml && (i = e.yearshtml, setTimeout(function() {
                    i === e.yearshtml && e.yearshtml && e.dpDiv.find("select.ui-datepicker-year:first").replaceWith(e.yearshtml), i = e.yearshtml = null
                }, 0))
            },
            _shouldFocusInput: function(t) {
                return t.input && t.input.is(":visible") && !t.input.is(":disabled") && !t.input.is(":focus")
            },
            _checkOffset: function(e, i, n) {
                var o = e.dpDiv.outerWidth(),
                    s = e.dpDiv.outerHeight(),
                    r = e.input ? e.input.outerWidth() : 0,
                    a = e.input ? e.input.outerHeight() : 0,
                    l = document.documentElement.clientWidth + (n ? 0 : t(document).scrollLeft()),
                    c = document.documentElement.clientHeight + (n ? 0 : t(document).scrollTop());
                return i.left -= this._get(e, "isRTL") ? o - r : 0, i.left -= n && i.left === e.input.offset().left ? t(document).scrollLeft() : 0, i.top -= n && i.top === e.input.offset().top + a ? t(document).scrollTop() : 0, i.left -= Math.min(i.left, i.left + o > l && l > o ? Math.abs(i.left + o - l) : 0), i.top -= Math.min(i.top, i.top + s > c && c > s ? Math.abs(s + a) : 0), i
            },
            _findPos: function(e) {
                for (var i, n = this._getInst(e), o = this._get(n, "isRTL"); e && ("hidden" === e.type || 1 !== e.nodeType || t.expr.filters.hidden(e));) e = e[o ? "previousSibling" : "nextSibling"];
                return i = t(e).offset(), [i.left, i.top]
            },
            _hideDatepicker: function(e) {
                var i, n, o, s, a = this._curInst;
                !a || e && a !== t.data(e, r) || this._datepickerShowing && (i = this._get(a, "showAnim"), n = this._get(a, "duration"), o = function() {
                    t.datepicker._tidyDialog(a)
                }, t.effects && (t.effects.effect[i] || t.effects[i]) ? a.dpDiv.hide(i, t.datepicker._get(a, "showOptions"), n, o) : a.dpDiv["slideDown" === i ? "slideUp" : "fadeIn" === i ? "fadeOut" : "hide"](i ? n : null, o), i || o(), this._datepickerShowing = !1, s = this._get(a, "onClose"), s && s.apply(a.input ? a.input[0] : null, [a.input ? a.input.val() : "", a]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
                    position: "absolute",
                    left: "0",
                    top: "-100px"
                }), t.blockUI && (t.unblockUI(), t("body").append(this.dpDiv))), this._inDialog = !1)
            },
            _tidyDialog: function(t) {
                t.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
            },
            _checkExternalClick: function(e) {
                if (t.datepicker._curInst) {
                    var i = t(e.target),
                        n = t.datepicker._getInst(i[0]);
                    (i[0].id !== t.datepicker._mainDivId && 0 === i.parents("#" + t.datepicker._mainDivId).length && !i.hasClass(t.datepicker.markerClassName) && !i.closest("." + t.datepicker._triggerClass).length && t.datepicker._datepickerShowing && (!t.datepicker._inDialog || !t.blockUI) || i.hasClass(t.datepicker.markerClassName) && t.datepicker._curInst !== n) && t.datepicker._hideDatepicker()
                }
            },
            _adjustDate: function(e, i, n) {
                var o = t(e),
                    s = this._getInst(o[0]);
                this._isDisabledDatepicker(o[0]) || (this._adjustInstDate(s, i + ("M" === n ? this._get(s, "showCurrentAtPos") : 0), n), this._updateDatepicker(s))
            },
            _gotoToday: function(e) {
                var i, n = t(e),
                    o = this._getInst(n[0]);
                this._get(o, "gotoCurrent") && o.currentDay ? (o.selectedDay = o.currentDay, o.drawMonth = o.selectedMonth = o.currentMonth, o.drawYear = o.selectedYear = o.currentYear) : (i = new Date, o.selectedDay = i.getDate(), o.drawMonth = o.selectedMonth = i.getMonth(), o.drawYear = o.selectedYear = i.getFullYear()), this._notifyChange(o), this._adjustDate(n)
            },
            _selectMonthYear: function(e, i, n) {
                var o = t(e),
                    s = this._getInst(o[0]);
                s["selected" + ("M" === n ? "Month" : "Year")] = s["draw" + ("M" === n ? "Month" : "Year")] = parseInt(i.options[i.selectedIndex].value, 10), this._notifyChange(s), this._adjustDate(o)
            },
            _selectDay: function(e, i, n, o) {
                var s, r = t(e);
                t(o).hasClass(this._unselectableClass) || this._isDisabledDatepicker(r[0]) || (s = this._getInst(r[0]), s.selectedDay = s.currentDay = t("a", o).html(), s.selectedMonth = s.currentMonth = i, s.selectedYear = s.currentYear = n, this._selectDate(e, this._formatDate(s, s.currentDay, s.currentMonth, s.currentYear)))
            },
            _clearDate: function(e) {
                var i = t(e);
                this._selectDate(i, "")
            },
            _selectDate: function(e, i) {
                var n, o = t(e),
                    s = this._getInst(o[0]);
                i = null != i ? i : this._formatDate(s), s.input && s.input.val(i), this._updateAlternate(s), n = this._get(s, "onSelect"), n ? n.apply(s.input ? s.input[0] : null, [i, s]) : s.input && s.input.trigger("change"), s.inline ? this._updateDatepicker(s) : (this._hideDatepicker(), this._lastInput = s.input[0], "object" != typeof s.input[0] && s.input.focus(), this._lastInput = null)
            },
            _updateAlternate: function(e) {
                var i, n, o, s = this._get(e, "altField");
                s && (i = this._get(e, "altFormat") || this._get(e, "dateFormat"), n = this._getDate(e), o = this.formatDate(i, n, this._getFormatConfig(e)), t(s).each(function() {
                    t(this).val(o)
                }))
            },
            noWeekends: function(t) {
                var e = t.getDay();
                return [e > 0 && 6 > e, ""]
            },
            iso8601Week: function(t) {
                var e, i = new Date(t.getTime());
                return i.setDate(i.getDate() + 4 - (i.getDay() || 7)), e = i.getTime(), i.setMonth(0), i.setDate(1), Math.floor(Math.round((e - i) / 864e5) / 7) + 1
            },
            parseDate: function(i, n, o) {
                if (null == i || null == n) throw "Invalid arguments";
                if (n = "object" == typeof n ? "" + n : n + "", "" === n) return null;
                var s, r, a, l, c = 0,
                    u = (o ? o.shortYearCutoff : null) || this._defaults.shortYearCutoff,
                    h = "string" != typeof u ? u : (new Date).getFullYear() % 100 + parseInt(u, 10),
                    d = (o ? o.dayNamesShort : null) || this._defaults.dayNamesShort,
                    p = (o ? o.dayNames : null) || this._defaults.dayNames,
                    f = (o ? o.monthNamesShort : null) || this._defaults.monthNamesShort,
                    m = (o ? o.monthNames : null) || this._defaults.monthNames,
                    g = -1,
                    v = -1,
                    y = -1,
                    b = -1,
                    w = !1,
                    _ = function(t) {
                        var e = i.length > s + 1 && i.charAt(s + 1) === t;
                        return e && s++, e
                    },
                    x = function(t) {
                        var e = _(t),
                            i = "@" === t ? 14 : "!" === t ? 20 : "y" === t && e ? 4 : "o" === t ? 3 : 2,
                            o = RegExp("^\\d{1," + i + "}"),
                            s = n.substring(c).match(o);
                        if (!s) throw "Missing number at position " + c;
                        return c += s[0].length, parseInt(s[0], 10)
                    },
                    C = function(i, o, s) {
                        var r = -1,
                            a = t.map(_(i) ? s : o, function(t, e) {
                                return [
                                    [e, t]
                                ]
                            }).sort(function(t, e) {
                                return -(t[1].length - e[1].length)
                            });
                        if (t.each(a, function(t, i) {
                                var o = i[1];
                                return n.substr(c, o.length).toLowerCase() === o.toLowerCase() ? (r = i[0], c += o.length, !1) : e
                            }), -1 !== r) return r + 1;
                        throw "Unknown name at position " + c
                    },
                    S = function() {
                        if (n.charAt(c) !== i.charAt(s)) throw "Unexpected literal at position " + c;
                        c++
                    };
                for (s = 0; i.length > s; s++)
                    if (w) "'" !== i.charAt(s) || _("'") ? S() : w = !1;
                    else switch (i.charAt(s)) {
                        case "d":
                            y = x("d");
                            break;
                        case "D":
                            C("D", d, p);
                            break;
                        case "o":
                            b = x("o");
                            break;
                        case "m":
                            v = x("m");
                            break;
                        case "M":
                            v = C("M", f, m);
                            break;
                        case "y":
                            g = x("y");
                            break;
                        case "@":
                            l = new Date(x("@")), g = l.getFullYear(), v = l.getMonth() + 1, y = l.getDate();
                            break;
                        case "!":
                            l = new Date((x("!") - this._ticksTo1970) / 1e4), g = l.getFullYear(), v = l.getMonth() + 1, y = l.getDate();
                            break;
                        case "'":
                            _("'") ? S() : w = !0;
                            break;
                        default:
                            S()
                    }
                if (n.length > c && (a = n.substr(c), !/^\s+/.test(a))) throw "Extra/unparsed characters found in date: " + a;
                if (-1 === g ? g = (new Date).getFullYear() : 100 > g && (g += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (h >= g ? 0 : -100)), b > -1)
                    for (v = 1, y = b; r = this._getDaysInMonth(g, v - 1), !(r >= y);) v++, y -= r;
                if (l = this._daylightSavingAdjust(new Date(g, v - 1, y)), l.getFullYear() !== g || l.getMonth() + 1 !== v || l.getDate() !== y) throw "Invalid date";
                return l
            },
            ATOM: "yy-mm-dd",
            COOKIE: "D, dd M yy",
            ISO_8601: "yy-mm-dd",
            RFC_822: "D, d M y",
            RFC_850: "DD, dd-M-y",
            RFC_1036: "D, d M y",
            RFC_1123: "D, d M yy",
            RFC_2822: "D, d M yy",
            RSS: "D, d M y",
            TICKS: "!",
            TIMESTAMP: "@",
            W3C: "yy-mm-dd",
            _ticksTo1970: 864e9 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
            formatDate: function(t, e, i) {
                if (!e) return "";
                var n, o = (i ? i.dayNamesShort : null) || this._defaults.dayNamesShort,
                    s = (i ? i.dayNames : null) || this._defaults.dayNames,
                    r = (i ? i.monthNamesShort : null) || this._defaults.monthNamesShort,
                    a = (i ? i.monthNames : null) || this._defaults.monthNames,
                    l = function(e) {
                        var i = t.length > n + 1 && t.charAt(n + 1) === e;
                        return i && n++, i
                    },
                    c = function(t, e, i) {
                        var n = "" + e;
                        if (l(t))
                            for (; i > n.length;) n = "0" + n;
                        return n
                    },
                    u = function(t, e, i, n) {
                        return l(t) ? n[e] : i[e]
                    },
                    h = "",
                    d = !1;
                if (e)
                    for (n = 0; t.length > n; n++)
                        if (d) "'" !== t.charAt(n) || l("'") ? h += t.charAt(n) : d = !1;
                        else switch (t.charAt(n)) {
                            case "d":
                                h += c("d", e.getDate(), 2);
                                break;
                            case "D":
                                h += u("D", e.getDay(), o, s);
                                break;
                            case "o":
                                h += c("o", Math.round((new Date(e.getFullYear(), e.getMonth(), e.getDate()).getTime() - new Date(e.getFullYear(), 0, 0).getTime()) / 864e5), 3);
                                break;
                            case "m":
                                h += c("m", e.getMonth() + 1, 2);
                                break;
                            case "M":
                                h += u("M", e.getMonth(), r, a);
                                break;
                            case "y":
                                h += l("y") ? e.getFullYear() : (10 > e.getYear() % 100 ? "0" : "") + e.getYear() % 100;
                                break;
                            case "@":
                                h += e.getTime();
                                break;
                            case "!":
                                h += 1e4 * e.getTime() + this._ticksTo1970;
                                break;
                            case "'":
                                l("'") ? h += "'" : d = !0;
                                break;
                            default:
                                h += t.charAt(n)
                        }
                return h
            },
            _possibleChars: function(t) {
                var e, i = "",
                    n = !1,
                    o = function(i) {
                        var n = t.length > e + 1 && t.charAt(e + 1) === i;
                        return n && e++, n
                    };
                for (e = 0; t.length > e; e++)
                    if (n) "'" !== t.charAt(e) || o("'") ? i += t.charAt(e) : n = !1;
                    else switch (t.charAt(e)) {
                        case "d":
                        case "m":
                        case "y":
                        case "@":
                            i += "0123456789";
                            break;
                        case "D":
                        case "M":
                            return null;
                        case "'":
                            o("'") ? i += "'" : n = !0;
                            break;
                        default:
                            i += t.charAt(e)
                    }
                return i
            },
            _get: function(t, i) {
                return t.settings[i] !== e ? t.settings[i] : this._defaults[i]
            },
            _setDateFromField: function(t, e) {
                if (t.input.val() !== t.lastVal) {
                    var i = this._get(t, "dateFormat"),
                        n = t.lastVal = t.input ? t.input.val() : null,
                        o = this._getDefaultDate(t),
                        s = o,
                        r = this._getFormatConfig(t);
                    try {
                        s = this.parseDate(i, n, r) || o
                    } catch (a) {
                        n = e ? "" : n
                    }
                    t.selectedDay = s.getDate(), t.drawMonth = t.selectedMonth = s.getMonth(), t.drawYear = t.selectedYear = s.getFullYear(), t.currentDay = n ? s.getDate() : 0, t.currentMonth = n ? s.getMonth() : 0, t.currentYear = n ? s.getFullYear() : 0, this._adjustInstDate(t)
                }
            },
            _getDefaultDate: function(t) {
                return this._restrictMinMax(t, this._determineDate(t, this._get(t, "defaultDate"), new Date))
            },
            _determineDate: function(e, i, n) {
                var o = function(t) {
                        var e = new Date;
                        return e.setDate(e.getDate() + t), e
                    },
                    s = function(i) {
                        try {
                            return t.datepicker.parseDate(t.datepicker._get(e, "dateFormat"), i, t.datepicker._getFormatConfig(e))
                        } catch (n) {}
                        for (var o = (i.toLowerCase().match(/^c/) ? t.datepicker._getDate(e) : null) || new Date, s = o.getFullYear(), r = o.getMonth(), a = o.getDate(), l = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, c = l.exec(i); c;) {
                            switch (c[2] || "d") {
                                case "d":
                                case "D":
                                    a += parseInt(c[1], 10);
                                    break;
                                case "w":
                                case "W":
                                    a += 7 * parseInt(c[1], 10);
                                    break;
                                case "m":
                                case "M":
                                    r += parseInt(c[1], 10), a = Math.min(a, t.datepicker._getDaysInMonth(s, r));
                                    break;
                                case "y":
                                case "Y":
                                    s += parseInt(c[1], 10), a = Math.min(a, t.datepicker._getDaysInMonth(s, r))
                            }
                            c = l.exec(i)
                        }
                        return new Date(s, r, a)
                    },
                    r = null == i || "" === i ? n : "string" == typeof i ? s(i) : "number" == typeof i ? isNaN(i) ? n : o(i) : new Date(i.getTime());
                return r = r && "Invalid Date" == "" + r ? n : r, r && (r.setHours(0), r.setMinutes(0), r.setSeconds(0), r.setMilliseconds(0)), this._daylightSavingAdjust(r)
            },
            _daylightSavingAdjust: function(t) {
                return t ? (t.setHours(t.getHours() > 12 ? t.getHours() + 2 : 0), t) : null
            },
            _setDate: function(t, e, i) {
                var n = !e,
                    o = t.selectedMonth,
                    s = t.selectedYear,
                    r = this._restrictMinMax(t, this._determineDate(t, e, new Date));
                t.selectedDay = t.currentDay = r.getDate(), t.drawMonth = t.selectedMonth = t.currentMonth = r.getMonth(), t.drawYear = t.selectedYear = t.currentYear = r.getFullYear(), o === t.selectedMonth && s === t.selectedYear || i || this._notifyChange(t), this._adjustInstDate(t), t.input && t.input.val(n ? "" : this._formatDate(t))
            },
            _getDate: function(t) {
                var e = !t.currentYear || t.input && "" === t.input.val() ? null : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                return e
            },
            _attachHandlers: function(e) {
                var i = this._get(e, "stepMonths"),
                    n = "#" + e.id.replace(/\\\\/g, "\\");
                e.dpDiv.find("[data-handler]").map(function() {
                    var e = {
                        prev: function() {
                            t.datepicker._adjustDate(n, -i, "M")
                        },
                        next: function() {
                            t.datepicker._adjustDate(n, +i, "M")
                        },
                        hide: function() {
                            t.datepicker._hideDatepicker()
                        },
                        today: function() {
                            t.datepicker._gotoToday(n)
                        },
                        selectDay: function() {
                            return t.datepicker._selectDay(n, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
                        },
                        selectMonth: function() {
                            return t.datepicker._selectMonthYear(n, this, "M"), !1
                        },
                        selectYear: function() {
                            return t.datepicker._selectMonthYear(n, this, "Y"), !1
                        }
                    };
                    t(this).bind(this.getAttribute("data-event"), e[this.getAttribute("data-handler")])
                })
            },
            _generateHTML: function(t) {
                var e, i, n, o, s, r, a, l, c, u, h, d, p, f, m, g, v, y, b, w, _, x, C, S, k, T, D, E, A, I, M, j, $, P, N, O, F, L, H, R = new Date,
                    B = this._daylightSavingAdjust(new Date(R.getFullYear(), R.getMonth(), R.getDate())),
                    W = this._get(t, "isRTL"),
                    q = this._get(t, "showButtonPanel"),
                    z = this._get(t, "hideIfNoPrevNext"),
                    U = this._get(t, "navigationAsDateFormat"),
                    K = this._getNumberOfMonths(t),
                    Y = this._get(t, "showCurrentAtPos"),
                    V = this._get(t, "stepMonths"),
                    Q = 1 !== K[0] || 1 !== K[1],
                    X = this._daylightSavingAdjust(t.currentDay ? new Date(t.currentYear, t.currentMonth, t.currentDay) : new Date(9999, 9, 9)),
                    J = this._getMinMaxDate(t, "min"),
                    G = this._getMinMaxDate(t, "max"),
                    Z = t.drawMonth - Y,
                    tt = t.drawYear;
                if (0 > Z && (Z += 12, tt--), G)
                    for (e = this._daylightSavingAdjust(new Date(G.getFullYear(), G.getMonth() - K[0] * K[1] + 1, G.getDate())), e = J && J > e ? J : e; this._daylightSavingAdjust(new Date(tt, Z, 1)) > e;) Z--, 0 > Z && (Z = 11, tt--);
                for (t.drawMonth = Z, t.drawYear = tt, i = this._get(t, "prevText"), i = U ? this.formatDate(i, this._daylightSavingAdjust(new Date(tt, Z - V, 1)), this._getFormatConfig(t)) : i, n = this._canAdjustMonth(t, -1, tt, Z) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (W ? "e" : "w") + "'>" + i + "</span></a>" : z ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + i + "'><span class='ui-icon ui-icon-circle-triangle-" + (W ? "e" : "w") + "'>" + i + "</span></a>", o = this._get(t, "nextText"), o = U ? this.formatDate(o, this._daylightSavingAdjust(new Date(tt, Z + V, 1)), this._getFormatConfig(t)) : o, s = this._canAdjustMonth(t, 1, tt, Z) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + o + "'><span class='ui-icon ui-icon-circle-triangle-" + (W ? "w" : "e") + "'>" + o + "</span></a>" : z ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + o + "'><span class='ui-icon ui-icon-circle-triangle-" + (W ? "w" : "e") + "'>" + o + "</span></a>", r = this._get(t, "currentText"), a = this._get(t, "gotoCurrent") && t.currentDay ? X : B, r = U ? this.formatDate(r, a, this._getFormatConfig(t)) : r, l = t.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(t, "closeText") + "</button>", c = q ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (W ? l : "") + (this._isInRange(t, a) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + r + "</button>" : "") + (W ? "" : l) + "</div>" : "", u = parseInt(this._get(t, "firstDay"), 10), u = isNaN(u) ? 0 : u, h = this._get(t, "showWeek"), d = this._get(t, "dayNames"), p = this._get(t, "dayNamesMin"), f = this._get(t, "monthNames"), m = this._get(t, "monthNamesShort"), g = this._get(t, "beforeShowDay"), v = this._get(t, "showOtherMonths"), y = this._get(t, "selectOtherMonths"), b = this._getDefaultDate(t), w = "", x = 0; K[0] > x; x++) {
                    for (C = "", this.maxRows = 4, S = 0; K[1] > S; S++) {
                        if (k = this._daylightSavingAdjust(new Date(tt, Z, t.selectedDay)), T = " ui-corner-all", D = "", Q) {
                            if (D += "<div class='ui-datepicker-group", K[1] > 1) switch (S) {
                                case 0:
                                    D += " ui-datepicker-group-first", T = " ui-corner-" + (W ? "right" : "left");
                                    break;
                                case K[1] - 1:
                                    D += " ui-datepicker-group-last", T = " ui-corner-" + (W ? "left" : "right");
                                    break;
                                default:
                                    D += " ui-datepicker-group-middle", T = ""
                            }
                            D += "'>"
                        }
                        for (D += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + T + "'>" + (/all|left/.test(T) && 0 === x ? W ? s : n : "") + (/all|right/.test(T) && 0 === x ? W ? n : s : "") + this._generateMonthYearHeader(t, Z, tt, J, G, x > 0 || S > 0, f, m) + "</div><table class='ui-datepicker-calendar'><thead><tr>", E = h ? "<th class='ui-datepicker-week-col'>" + this._get(t, "weekHeader") + "</th>" : "", _ = 0; 7 > _; _++) A = (_ + u) % 7, E += "<th" + ((_ + u + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + "><span title='" + d[A] + "'>" + p[A] + "</span></th>";
                        for (D += E + "</tr></thead><tbody>", I = this._getDaysInMonth(tt, Z), tt === t.selectedYear && Z === t.selectedMonth && (t.selectedDay = Math.min(t.selectedDay, I)), M = (this._getFirstDayOfMonth(tt, Z) - u + 7) % 7, j = Math.ceil((M + I) / 7), $ = Q && this.maxRows > j ? this.maxRows : j, this.maxRows = $, P = this._daylightSavingAdjust(new Date(tt, Z, 1 - M)), N = 0; $ > N; N++) {
                            for (D += "<tr>", O = h ? "<td class='ui-datepicker-week-col'>" + this._get(t, "calculateWeek")(P) + "</td>" : "", _ = 0; 7 > _; _++) F = g ? g.apply(t.input ? t.input[0] : null, [P]) : [!0, ""], L = P.getMonth() !== Z, H = L && !y || !F[0] || J && J > P || G && P > G, O += "<td class='" + ((_ + u + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (L ? " ui-datepicker-other-month" : "") + (P.getTime() === k.getTime() && Z === t.selectedMonth && t._keyEvent || b.getTime() === P.getTime() && b.getTime() === k.getTime() ? " " + this._dayOverClass : "") + (H ? " " + this._unselectableClass + " ui-state-disabled" : "") + (L && !v ? "" : " " + F[1] + (P.getTime() === X.getTime() ? " " + this._currentClass : "") + (P.getTime() === B.getTime() ? " ui-datepicker-today" : "")) + "'" + (L && !v || !F[2] ? "" : " title='" + F[2].replace(/'/g, "&#39;") + "'") + (H ? "" : " data-handler='selectDay' data-event='click' data-month='" + P.getMonth() + "' data-year='" + P.getFullYear() + "'") + ">" + (L && !v ? "&#xa0;" : H ? "<span class='ui-state-default'>" + P.getDate() + "</span>" : "<a class='ui-state-default" + (P.getTime() === B.getTime() ? " ui-state-highlight" : "") + (P.getTime() === X.getTime() ? " ui-state-active" : "") + (L ? " ui-priority-secondary" : "") + "' href='#'>" + P.getDate() + "</a>") + "</td>",
                                P.setDate(P.getDate() + 1), P = this._daylightSavingAdjust(P);
                            D += O + "</tr>"
                        }
                        Z++, Z > 11 && (Z = 0, tt++), D += "</tbody></table>" + (Q ? "</div>" + (K[0] > 0 && S === K[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), C += D
                    }
                    w += C
                }
                return w += c, t._keyEvent = !1, w
            },
            _generateMonthYearHeader: function(t, e, i, n, o, s, r, a) {
                var l, c, u, h, d, p, f, m, g = this._get(t, "changeMonth"),
                    v = this._get(t, "changeYear"),
                    y = this._get(t, "showMonthAfterYear"),
                    b = "<div class='ui-datepicker-title'>",
                    w = "";
                if (s || !g) w += "<span class='ui-datepicker-month'>" + r[e] + "</span>";
                else {
                    for (l = n && n.getFullYear() === i, c = o && o.getFullYear() === i, w += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", u = 0; 12 > u; u++)(!l || u >= n.getMonth()) && (!c || o.getMonth() >= u) && (w += "<option value='" + u + "'" + (u === e ? " selected='selected'" : "") + ">" + a[u] + "</option>");
                    w += "</select>"
                }
                if (y || (b += w + (!s && g && v ? "" : "&#xa0;")), !t.yearshtml)
                    if (t.yearshtml = "", s || !v) b += "<span class='ui-datepicker-year'>" + i + "</span>";
                    else {
                        for (h = this._get(t, "yearRange").split(":"), d = (new Date).getFullYear(), p = function(t) {
                                var e = t.match(/c[+\-].*/) ? i + parseInt(t.substring(1), 10) : t.match(/[+\-].*/) ? d + parseInt(t, 10) : parseInt(t, 10);
                                return isNaN(e) ? d : e
                            }, f = p(h[0]), m = Math.max(f, p(h[1] || "")), f = n ? Math.max(f, n.getFullYear()) : f, m = o ? Math.min(m, o.getFullYear()) : m, t.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; m >= f; f++) t.yearshtml += "<option value='" + f + "'" + (f === i ? " selected='selected'" : "") + ">" + f + "</option>";
                        t.yearshtml += "</select>", b += t.yearshtml, t.yearshtml = null
                    }
                return b += this._get(t, "yearSuffix"), y && (b += (!s && g && v ? "" : "&#xa0;") + w), b += "</div>"
            },
            _adjustInstDate: function(t, e, i) {
                var n = t.drawYear + ("Y" === i ? e : 0),
                    o = t.drawMonth + ("M" === i ? e : 0),
                    s = Math.min(t.selectedDay, this._getDaysInMonth(n, o)) + ("D" === i ? e : 0),
                    r = this._restrictMinMax(t, this._daylightSavingAdjust(new Date(n, o, s)));
                t.selectedDay = r.getDate(), t.drawMonth = t.selectedMonth = r.getMonth(), t.drawYear = t.selectedYear = r.getFullYear(), ("M" === i || "Y" === i) && this._notifyChange(t)
            },
            _restrictMinMax: function(t, e) {
                var i = this._getMinMaxDate(t, "min"),
                    n = this._getMinMaxDate(t, "max"),
                    o = i && i > e ? i : e;
                return n && o > n ? n : o
            },
            _notifyChange: function(t) {
                var e = this._get(t, "onChangeMonthYear");
                e && e.apply(t.input ? t.input[0] : null, [t.selectedYear, t.selectedMonth + 1, t])
            },
            _getNumberOfMonths: function(t) {
                var e = this._get(t, "numberOfMonths");
                return null == e ? [1, 1] : "number" == typeof e ? [1, e] : e
            },
            _getMinMaxDate: function(t, e) {
                return this._determineDate(t, this._get(t, e + "Date"), null)
            },
            _getDaysInMonth: function(t, e) {
                return 32 - this._daylightSavingAdjust(new Date(t, e, 32)).getDate()
            },
            _getFirstDayOfMonth: function(t, e) {
                return new Date(t, e, 1).getDay()
            },
            _canAdjustMonth: function(t, e, i, n) {
                var o = this._getNumberOfMonths(t),
                    s = this._daylightSavingAdjust(new Date(i, n + (0 > e ? e : o[0] * o[1]), 1));
                return 0 > e && s.setDate(this._getDaysInMonth(s.getFullYear(), s.getMonth())), this._isInRange(t, s)
            },
            _isInRange: function(t, e) {
                var i, n, o = this._getMinMaxDate(t, "min"),
                    s = this._getMinMaxDate(t, "max"),
                    r = null,
                    a = null,
                    l = this._get(t, "yearRange");
                return l && (i = l.split(":"), n = (new Date).getFullYear(), r = parseInt(i[0], 10), a = parseInt(i[1], 10), i[0].match(/[+\-].*/) && (r += n), i[1].match(/[+\-].*/) && (a += n)), (!o || e.getTime() >= o.getTime()) && (!s || e.getTime() <= s.getTime()) && (!r || e.getFullYear() >= r) && (!a || a >= e.getFullYear())
            },
            _getFormatConfig: function(t) {
                var e = this._get(t, "shortYearCutoff");
                return e = "string" != typeof e ? e : (new Date).getFullYear() % 100 + parseInt(e, 10), {
                    shortYearCutoff: e,
                    dayNamesShort: this._get(t, "dayNamesShort"),
                    dayNames: this._get(t, "dayNames"),
                    monthNamesShort: this._get(t, "monthNamesShort"),
                    monthNames: this._get(t, "monthNames")
                }
            },
            _formatDate: function(t, e, i, n) {
                e || (t.currentDay = t.selectedDay, t.currentMonth = t.selectedMonth, t.currentYear = t.selectedYear);
                var o = e ? "object" == typeof e ? e : this._daylightSavingAdjust(new Date(n, i, e)) : this._daylightSavingAdjust(new Date(t.currentYear, t.currentMonth, t.currentDay));
                return this.formatDate(this._get(t, "dateFormat"), o, this._getFormatConfig(t))
            }
        }), t.fn.datepicker = function(e) {
            if (!this.length) return this;
            t.datepicker.initialized || (t(document).mousedown(t.datepicker._checkExternalClick), t.datepicker.initialized = !0), 0 === t("#" + t.datepicker._mainDivId).length && t("body").append(t.datepicker.dpDiv);
            var i = Array.prototype.slice.call(arguments, 1);
            return "string" != typeof e || "isDisabled" !== e && "getDate" !== e && "widget" !== e ? "option" === e && 2 === arguments.length && "string" == typeof arguments[1] ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i)) : this.each(function() {
                "string" == typeof e ? t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this].concat(i)) : t.datepicker._attachDatepicker(this, e)
            }) : t.datepicker["_" + e + "Datepicker"].apply(t.datepicker, [this[0]].concat(i))
        }, t.datepicker = new i, t.datepicker.initialized = !1, t.datepicker.uuid = (new Date).getTime(), t.datepicker.version = "1.10.4"
    }(jQuery),
    function(t, e) {
        var i = "ui-effects-";
        t.effects = {
                effect: {}
            },
            function(t, e) {
                function i(t, e, i) {
                    var n = h[e.type] || {};
                    return null == t ? i || !e.def ? null : e.def : (t = n.floor ? ~~t : parseFloat(t), isNaN(t) ? e.def : n.mod ? (t + n.mod) % n.mod : 0 > t ? 0 : t > n.max ? n.max : t)
                }

                function n(i) {
                    var n = c(),
                        o = n._rgba = [];
                    return i = i.toLowerCase(), f(l, function(t, s) {
                        var r, a = s.re.exec(i),
                            l = a && s.parse(a),
                            c = s.space || "rgba";
                        return l ? (r = n[c](l), n[u[c].cache] = r[u[c].cache], o = n._rgba = r._rgba, !1) : e
                    }), o.length ? ("0,0,0,0" === o.join() && t.extend(o, s.transparent), n) : s[i]
                }

                function o(t, e, i) {
                    return i = (i + 1) % 1, 1 > 6 * i ? t + 6 * (e - t) * i : 1 > 2 * i ? e : 2 > 3 * i ? t + 6 * (e - t) * (2 / 3 - i) : t
                }
                var s, r = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
                    a = /^([\-+])=\s*(\d+\.?\d*)/,
                    l = [{
                        re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function(t) {
                            return [t[1], t[2], t[3], t[4]]
                        }
                    }, {
                        re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        parse: function(t) {
                            return [2.55 * t[1], 2.55 * t[2], 2.55 * t[3], t[4]]
                        }
                    }, {
                        re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                        parse: function(t) {
                            return [parseInt(t[1], 16), parseInt(t[2], 16), parseInt(t[3], 16)]
                        }
                    }, {
                        re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                        parse: function(t) {
                            return [parseInt(t[1] + t[1], 16), parseInt(t[2] + t[2], 16), parseInt(t[3] + t[3], 16)]
                        }
                    }, {
                        re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                        space: "hsla",
                        parse: function(t) {
                            return [t[1], t[2] / 100, t[3] / 100, t[4]]
                        }
                    }],
                    c = t.Color = function(e, i, n, o) {
                        return new t.Color.fn.parse(e, i, n, o)
                    },
                    u = {
                        rgba: {
                            props: {
                                red: {
                                    idx: 0,
                                    type: "byte"
                                },
                                green: {
                                    idx: 1,
                                    type: "byte"
                                },
                                blue: {
                                    idx: 2,
                                    type: "byte"
                                }
                            }
                        },
                        hsla: {
                            props: {
                                hue: {
                                    idx: 0,
                                    type: "degrees"
                                },
                                saturation: {
                                    idx: 1,
                                    type: "percent"
                                },
                                lightness: {
                                    idx: 2,
                                    type: "percent"
                                }
                            }
                        }
                    },
                    h = {
                        "byte": {
                            floor: !0,
                            max: 255
                        },
                        percent: {
                            max: 1
                        },
                        degrees: {
                            mod: 360,
                            floor: !0
                        }
                    },
                    d = c.support = {},
                    p = t("<p>")[0],
                    f = t.each;
                p.style.cssText = "background-color:rgba(1,1,1,.5)", d.rgba = p.style.backgroundColor.indexOf("rgba") > -1, f(u, function(t, e) {
                    e.cache = "_" + t, e.props.alpha = {
                        idx: 3,
                        type: "percent",
                        def: 1
                    }
                }), c.fn = t.extend(c.prototype, {
                    parse: function(o, r, a, l) {
                        if (o === e) return this._rgba = [null, null, null, null], this;
                        (o.jquery || o.nodeType) && (o = t(o).css(r), r = e);
                        var h = this,
                            d = t.type(o),
                            p = this._rgba = [];
                        return r !== e && (o = [o, r, a, l], d = "array"), "string" === d ? this.parse(n(o) || s._default) : "array" === d ? (f(u.rgba.props, function(t, e) {
                            p[e.idx] = i(o[e.idx], e)
                        }), this) : "object" === d ? (o instanceof c ? f(u, function(t, e) {
                            o[e.cache] && (h[e.cache] = o[e.cache].slice())
                        }) : f(u, function(e, n) {
                            var s = n.cache;
                            f(n.props, function(t, e) {
                                if (!h[s] && n.to) {
                                    if ("alpha" === t || null == o[t]) return;
                                    h[s] = n.to(h._rgba)
                                }
                                h[s][e.idx] = i(o[t], e, !0)
                            }), h[s] && 0 > t.inArray(null, h[s].slice(0, 3)) && (h[s][3] = 1, n.from && (h._rgba = n.from(h[s])))
                        }), this) : e
                    },
                    is: function(t) {
                        var i = c(t),
                            n = !0,
                            o = this;
                        return f(u, function(t, s) {
                            var r, a = i[s.cache];
                            return a && (r = o[s.cache] || s.to && s.to(o._rgba) || [], f(s.props, function(t, i) {
                                return null != a[i.idx] ? n = a[i.idx] === r[i.idx] : e
                            })), n
                        }), n
                    },
                    _space: function() {
                        var t = [],
                            e = this;
                        return f(u, function(i, n) {
                            e[n.cache] && t.push(i)
                        }), t.pop()
                    },
                    transition: function(t, e) {
                        var n = c(t),
                            o = n._space(),
                            s = u[o],
                            r = 0 === this.alpha() ? c("transparent") : this,
                            a = r[s.cache] || s.to(r._rgba),
                            l = a.slice();
                        return n = n[s.cache], f(s.props, function(t, o) {
                            var s = o.idx,
                                r = a[s],
                                c = n[s],
                                u = h[o.type] || {};
                            null !== c && (null === r ? l[s] = c : (u.mod && (c - r > u.mod / 2 ? r += u.mod : r - c > u.mod / 2 && (r -= u.mod)), l[s] = i((c - r) * e + r, o)))
                        }), this[o](l)
                    },
                    blend: function(e) {
                        if (1 === this._rgba[3]) return this;
                        var i = this._rgba.slice(),
                            n = i.pop(),
                            o = c(e)._rgba;
                        return c(t.map(i, function(t, e) {
                            return (1 - n) * o[e] + n * t
                        }))
                    },
                    toRgbaString: function() {
                        var e = "rgba(",
                            i = t.map(this._rgba, function(t, e) {
                                return null == t ? e > 2 ? 1 : 0 : t
                            });
                        return 1 === i[3] && (i.pop(), e = "rgb("), e + i.join() + ")"
                    },
                    toHslaString: function() {
                        var e = "hsla(",
                            i = t.map(this.hsla(), function(t, e) {
                                return null == t && (t = e > 2 ? 1 : 0), e && 3 > e && (t = Math.round(100 * t) + "%"), t
                            });
                        return 1 === i[3] && (i.pop(), e = "hsl("), e + i.join() + ")"
                    },
                    toHexString: function(e) {
                        var i = this._rgba.slice(),
                            n = i.pop();
                        return e && i.push(~~(255 * n)), "#" + t.map(i, function(t) {
                            return t = (t || 0).toString(16), 1 === t.length ? "0" + t : t
                        }).join("")
                    },
                    toString: function() {
                        return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                    }
                }), c.fn.parse.prototype = c.fn, u.hsla.to = function(t) {
                    if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                    var e, i, n = t[0] / 255,
                        o = t[1] / 255,
                        s = t[2] / 255,
                        r = t[3],
                        a = Math.max(n, o, s),
                        l = Math.min(n, o, s),
                        c = a - l,
                        u = a + l,
                        h = .5 * u;
                    return e = l === a ? 0 : n === a ? 60 * (o - s) / c + 360 : o === a ? 60 * (s - n) / c + 120 : 60 * (n - o) / c + 240, i = 0 === c ? 0 : .5 >= h ? c / u : c / (2 - u), [Math.round(e) % 360, i, h, null == r ? 1 : r]
                }, u.hsla.from = function(t) {
                    if (null == t[0] || null == t[1] || null == t[2]) return [null, null, null, t[3]];
                    var e = t[0] / 360,
                        i = t[1],
                        n = t[2],
                        s = t[3],
                        r = .5 >= n ? n * (1 + i) : n + i - n * i,
                        a = 2 * n - r;
                    return [Math.round(255 * o(a, r, e + 1 / 3)), Math.round(255 * o(a, r, e)), Math.round(255 * o(a, r, e - 1 / 3)), s]
                }, f(u, function(n, o) {
                    var s = o.props,
                        r = o.cache,
                        l = o.to,
                        u = o.from;
                    c.fn[n] = function(n) {
                        if (l && !this[r] && (this[r] = l(this._rgba)), n === e) return this[r].slice();
                        var o, a = t.type(n),
                            h = "array" === a || "object" === a ? n : arguments,
                            d = this[r].slice();
                        return f(s, function(t, e) {
                            var n = h["object" === a ? t : e.idx];
                            null == n && (n = d[e.idx]), d[e.idx] = i(n, e)
                        }), u ? (o = c(u(d)), o[r] = d, o) : c(d)
                    }, f(s, function(e, i) {
                        c.fn[e] || (c.fn[e] = function(o) {
                            var s, r = t.type(o),
                                l = "alpha" === e ? this._hsla ? "hsla" : "rgba" : n,
                                c = this[l](),
                                u = c[i.idx];
                            return "undefined" === r ? u : ("function" === r && (o = o.call(this, u), r = t.type(o)), null == o && i.empty ? this : ("string" === r && (s = a.exec(o), s && (o = u + parseFloat(s[2]) * ("+" === s[1] ? 1 : -1))), c[i.idx] = o, this[l](c)))
                        })
                    })
                }), c.hook = function(e) {
                    var i = e.split(" ");
                    f(i, function(e, i) {
                        t.cssHooks[i] = {
                            set: function(e, o) {
                                var s, r, a = "";
                                if ("transparent" !== o && ("string" !== t.type(o) || (s = n(o)))) {
                                    if (o = c(s || o), !d.rgba && 1 !== o._rgba[3]) {
                                        for (r = "backgroundColor" === i ? e.parentNode : e;
                                            ("" === a || "transparent" === a) && r && r.style;) try {
                                            a = t.css(r, "backgroundColor"), r = r.parentNode
                                        } catch (l) {}
                                        o = o.blend(a && "transparent" !== a ? a : "_default")
                                    }
                                    o = o.toRgbaString()
                                }
                                try {
                                    e.style[i] = o
                                } catch (l) {}
                            }
                        }, t.fx.step[i] = function(e) {
                            e.colorInit || (e.start = c(e.elem, i), e.end = c(e.end), e.colorInit = !0), t.cssHooks[i].set(e.elem, e.start.transition(e.end, e.pos))
                        }
                    })
                }, c.hook(r), t.cssHooks.borderColor = {
                    expand: function(t) {
                        var e = {};
                        return f(["Top", "Right", "Bottom", "Left"], function(i, n) {
                            e["border" + n + "Color"] = t
                        }), e
                    }
                }, s = t.Color.names = {
                    aqua: "#00ffff",
                    black: "#000000",
                    blue: "#0000ff",
                    fuchsia: "#ff00ff",
                    gray: "#808080",
                    green: "#008000",
                    lime: "#00ff00",
                    maroon: "#800000",
                    navy: "#000080",
                    olive: "#808000",
                    purple: "#800080",
                    red: "#ff0000",
                    silver: "#c0c0c0",
                    teal: "#008080",
                    white: "#ffffff",
                    yellow: "#ffff00",
                    transparent: [null, null, null, 0],
                    _default: "#ffffff"
                }
            }(jQuery),
            function() {
                function i(e) {
                    var i, n, o = e.ownerDocument.defaultView ? e.ownerDocument.defaultView.getComputedStyle(e, null) : e.currentStyle,
                        s = {};
                    if (o && o.length && o[0] && o[o[0]])
                        for (n = o.length; n--;) i = o[n], "string" == typeof o[i] && (s[t.camelCase(i)] = o[i]);
                    else
                        for (i in o) "string" == typeof o[i] && (s[i] = o[i]);
                    return s
                }

                function n(e, i) {
                    var n, o, r = {};
                    for (n in i) o = i[n], e[n] !== o && (s[n] || (t.fx.step[n] || !isNaN(parseFloat(o))) && (r[n] = o));
                    return r
                }
                var o = ["add", "remove", "toggle"],
                    s = {
                        border: 1,
                        borderBottom: 1,
                        borderColor: 1,
                        borderLeft: 1,
                        borderRight: 1,
                        borderTop: 1,
                        borderWidth: 1,
                        margin: 1,
                        padding: 1
                    };
                t.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(e, i) {
                    t.fx.step[i] = function(t) {
                        ("none" !== t.end && !t.setAttr || 1 === t.pos && !t.setAttr) && (jQuery.style(t.elem, i, t.end), t.setAttr = !0)
                    }
                }), t.fn.addBack || (t.fn.addBack = function(t) {
                    return this.add(null == t ? this.prevObject : this.prevObject.filter(t))
                }), t.effects.animateClass = function(e, s, r, a) {
                    var l = t.speed(s, r, a);
                    return this.queue(function() {
                        var s, r = t(this),
                            a = r.attr("class") || "",
                            c = l.children ? r.find("*").addBack() : r;
                        c = c.map(function() {
                            var e = t(this);
                            return {
                                el: e,
                                start: i(this)
                            }
                        }), s = function() {
                            t.each(o, function(t, i) {
                                e[i] && r[i + "Class"](e[i])
                            })
                        }, s(), c = c.map(function() {
                            return this.end = i(this.el[0]), this.diff = n(this.start, this.end), this
                        }), r.attr("class", a), c = c.map(function() {
                            var e = this,
                                i = t.Deferred(),
                                n = t.extend({}, l, {
                                    queue: !1,
                                    complete: function() {
                                        i.resolve(e)
                                    }
                                });
                            return this.el.animate(this.diff, n), i.promise()
                        }), t.when.apply(t, c.get()).done(function() {
                            s(), t.each(arguments, function() {
                                var e = this.el;
                                t.each(this.diff, function(t) {
                                    e.css(t, "")
                                })
                            }), l.complete.call(r[0])
                        })
                    })
                }, t.fn.extend({
                    addClass: function(e) {
                        return function(i, n, o, s) {
                            return n ? t.effects.animateClass.call(this, {
                                add: i
                            }, n, o, s) : e.apply(this, arguments)
                        }
                    }(t.fn.addClass),
                    removeClass: function(e) {
                        return function(i, n, o, s) {
                            return arguments.length > 1 ? t.effects.animateClass.call(this, {
                                remove: i
                            }, n, o, s) : e.apply(this, arguments)
                        }
                    }(t.fn.removeClass),
                    toggleClass: function(i) {
                        return function(n, o, s, r, a) {
                            return "boolean" == typeof o || o === e ? s ? t.effects.animateClass.call(this, o ? {
                                add: n
                            } : {
                                remove: n
                            }, s, r, a) : i.apply(this, arguments) : t.effects.animateClass.call(this, {
                                toggle: n
                            }, o, s, r)
                        }
                    }(t.fn.toggleClass),
                    switchClass: function(e, i, n, o, s) {
                        return t.effects.animateClass.call(this, {
                            add: i,
                            remove: e
                        }, n, o, s)
                    }
                })
            }(),
            function() {
                function n(e, i, n, o) {
                    return t.isPlainObject(e) && (i = e, e = e.effect), e = {
                        effect: e
                    }, null == i && (i = {}), t.isFunction(i) && (o = i, n = null, i = {}), ("number" == typeof i || t.fx.speeds[i]) && (o = n, n = i, i = {}), t.isFunction(n) && (o = n, n = null), i && t.extend(e, i), n = n || i.duration, e.duration = t.fx.off ? 0 : "number" == typeof n ? n : n in t.fx.speeds ? t.fx.speeds[n] : t.fx.speeds._default, e.complete = o || i.complete, e
                }

                function o(e) {
                    return !(e && "number" != typeof e && !t.fx.speeds[e]) || ("string" == typeof e && !t.effects.effect[e] || (!!t.isFunction(e) || "object" == typeof e && !e.effect))
                }
                t.extend(t.effects, {
                    version: "1.10.4",
                    save: function(t, e) {
                        for (var n = 0; e.length > n; n++) null !== e[n] && t.data(i + e[n], t[0].style[e[n]])
                    },
                    restore: function(t, n) {
                        var o, s;
                        for (s = 0; n.length > s; s++) null !== n[s] && (o = t.data(i + n[s]), o === e && (o = ""), t.css(n[s], o))
                    },
                    setMode: function(t, e) {
                        return "toggle" === e && (e = t.is(":hidden") ? "show" : "hide"), e
                    },
                    getBaseline: function(t, e) {
                        var i, n;
                        switch (t[0]) {
                            case "top":
                                i = 0;
                                break;
                            case "middle":
                                i = .5;
                                break;
                            case "bottom":
                                i = 1;
                                break;
                            default:
                                i = t[0] / e.height
                        }
                        switch (t[1]) {
                            case "left":
                                n = 0;
                                break;
                            case "center":
                                n = .5;
                                break;
                            case "right":
                                n = 1;
                                break;
                            default:
                                n = t[1] / e.width
                        }
                        return {
                            x: n,
                            y: i
                        }
                    },
                    createWrapper: function(e) {
                        if (e.parent().is(".ui-effects-wrapper")) return e.parent();
                        var i = {
                                width: e.outerWidth(!0),
                                height: e.outerHeight(!0),
                                "float": e.css("float")
                            },
                            n = t("<div></div>").addClass("ui-effects-wrapper").css({
                                fontSize: "100%",
                                background: "transparent",
                                border: "none",
                                margin: 0,
                                padding: 0
                            }),
                            o = {
                                width: e.width(),
                                height: e.height()
                            },
                            s = document.activeElement;
                        try {
                            s.id
                        } catch (r) {
                            s = document.body
                        }
                        return e.wrap(n), (e[0] === s || t.contains(e[0], s)) && t(s).focus(), n = e.parent(), "static" === e.css("position") ? (n.css({
                            position: "relative"
                        }), e.css({
                            position: "relative"
                        })) : (t.extend(i, {
                            position: e.css("position"),
                            zIndex: e.css("z-index")
                        }), t.each(["top", "left", "bottom", "right"], function(t, n) {
                            i[n] = e.css(n), isNaN(parseInt(i[n], 10)) && (i[n] = "auto")
                        }), e.css({
                            position: "relative",
                            top: 0,
                            left: 0,
                            right: "auto",
                            bottom: "auto"
                        })), e.css(o), n.css(i).show()
                    },
                    removeWrapper: function(e) {
                        var i = document.activeElement;
                        return e.parent().is(".ui-effects-wrapper") && (e.parent().replaceWith(e), (e[0] === i || t.contains(e[0], i)) && t(i).focus()), e
                    },
                    setTransition: function(e, i, n, o) {
                        return o = o || {}, t.each(i, function(t, i) {
                            var s = e.cssUnit(i);
                            s[0] > 0 && (o[i] = s[0] * n + s[1])
                        }), o
                    }
                }), t.fn.extend({
                    effect: function() {
                        function e(e) {
                            function n() {
                                t.isFunction(s) && s.call(o[0]), t.isFunction(e) && e()
                            }
                            var o = t(this),
                                s = i.complete,
                                a = i.mode;
                            (o.is(":hidden") ? "hide" === a : "show" === a) ? (o[a](), n()) : r.call(o[0], i, n)
                        }
                        var i = n.apply(this, arguments),
                            o = i.mode,
                            s = i.queue,
                            r = t.effects.effect[i.effect];
                        return t.fx.off || !r ? o ? this[o](i.duration, i.complete) : this.each(function() {
                            i.complete && i.complete.call(this)
                        }) : s === !1 ? this.each(e) : this.queue(s || "fx", e)
                    },
                    show: function(t) {
                        return function(e) {
                            if (o(e)) return t.apply(this, arguments);
                            var i = n.apply(this, arguments);
                            return i.mode = "show", this.effect.call(this, i)
                        }
                    }(t.fn.show),
                    hide: function(t) {
                        return function(e) {
                            if (o(e)) return t.apply(this, arguments);
                            var i = n.apply(this, arguments);
                            return i.mode = "hide", this.effect.call(this, i)
                        }
                    }(t.fn.hide),
                    toggle: function(t) {
                        return function(e) {
                            if (o(e) || "boolean" == typeof e) return t.apply(this, arguments);
                            var i = n.apply(this, arguments);
                            return i.mode = "toggle", this.effect.call(this, i)
                        }
                    }(t.fn.toggle),
                    cssUnit: function(e) {
                        var i = this.css(e),
                            n = [];
                        return t.each(["em", "px", "%", "pt"], function(t, e) {
                            i.indexOf(e) > 0 && (n = [parseFloat(i), e])
                        }), n
                    }
                })
            }(),
            function() {
                var e = {};
                t.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(t, i) {
                    e[i] = function(e) {
                        return Math.pow(e, t + 2)
                    }
                }), t.extend(e, {
                    Sine: function(t) {
                        return 1 - Math.cos(t * Math.PI / 2)
                    },
                    Circ: function(t) {
                        return 1 - Math.sqrt(1 - t * t)
                    },
                    Elastic: function(t) {
                        return 0 === t || 1 === t ? t : -Math.pow(2, 8 * (t - 1)) * Math.sin((80 * (t - 1) - 7.5) * Math.PI / 15)
                    },
                    Back: function(t) {
                        return t * t * (3 * t - 2)
                    },
                    Bounce: function(t) {
                        for (var e, i = 4;
                            ((e = Math.pow(2, --i)) - 1) / 11 > t;);
                        return 1 / Math.pow(4, 3 - i) - 7.5625 * Math.pow((3 * e - 2) / 22 - t, 2)
                    }
                }), t.each(e, function(e, i) {
                    t.easing["easeIn" + e] = i, t.easing["easeOut" + e] = function(t) {
                        return 1 - i(1 - t)
                    }, t.easing["easeInOut" + e] = function(t) {
                        return .5 > t ? i(2 * t) / 2 : 1 - i(-2 * t + 2) / 2
                    }
                })
            }()
    }(jQuery),
    function(t) {
        var e = /up|down|vertical/,
            i = /up|left|vertical|horizontal/;
        t.effects.effect.blind = function(n, o) {
            var s, r, a, l = t(this),
                c = ["position", "top", "bottom", "left", "right", "height", "width"],
                u = t.effects.setMode(l, n.mode || "hide"),
                h = n.direction || "up",
                d = e.test(h),
                p = d ? "height" : "width",
                f = d ? "top" : "left",
                m = i.test(h),
                g = {},
                v = "show" === u;
            l.parent().is(".ui-effects-wrapper") ? t.effects.save(l.parent(), c) : t.effects.save(l, c), l.show(), s = t.effects.createWrapper(l).css({
                overflow: "hidden"
            }), r = s[p](), a = parseFloat(s.css(f)) || 0, g[p] = v ? r : 0, m || (l.css(d ? "bottom" : "right", 0).css(d ? "top" : "left", "auto").css({
                position: "absolute"
            }), g[f] = v ? a : r + a), v && (s.css(p, 0), m || s.css(f, a + r)), s.animate(g, {
                duration: n.duration,
                easing: n.easing,
                queue: !1,
                complete: function() {
                    "hide" === u && l.hide(), t.effects.restore(l, c), t.effects.removeWrapper(l), o()
                }
            })
        }
    }(jQuery),
    function(t) {
        t.effects.effect.bounce = function(e, i) {
            var n, o, s, r = t(this),
                a = ["position", "top", "bottom", "left", "right", "height", "width"],
                l = t.effects.setMode(r, e.mode || "effect"),
                c = "hide" === l,
                u = "show" === l,
                h = e.direction || "up",
                d = e.distance,
                p = e.times || 5,
                f = 2 * p + (u || c ? 1 : 0),
                m = e.duration / f,
                g = e.easing,
                v = "up" === h || "down" === h ? "top" : "left",
                y = "up" === h || "left" === h,
                b = r.queue(),
                w = b.length;
            for ((u || c) && a.push("opacity"), t.effects.save(r, a), r.show(), t.effects.createWrapper(r), d || (d = r["top" === v ? "outerHeight" : "outerWidth"]() / 3), u && (s = {
                    opacity: 1
                }, s[v] = 0, r.css("opacity", 0).css(v, y ? 2 * -d : 2 * d).animate(s, m, g)), c && (d /= Math.pow(2, p - 1)), s = {}, s[v] = 0, n = 0; p > n; n++) o = {}, o[v] = (y ? "-=" : "+=") + d, r.animate(o, m, g).animate(s, m, g), d = c ? 2 * d : d / 2;
            c && (o = {
                opacity: 0
            }, o[v] = (y ? "-=" : "+=") + d, r.animate(o, m, g)), r.queue(function() {
                c && r.hide(), t.effects.restore(r, a), t.effects.removeWrapper(r), i()
            }), w > 1 && b.splice.apply(b, [1, 0].concat(b.splice(w, f + 1))), r.dequeue()
        }
    }(jQuery),
    function(t) {
        t.effects.effect.clip = function(e, i) {
            var n, o, s, r = t(this),
                a = ["position", "top", "bottom", "left", "right", "height", "width"],
                l = t.effects.setMode(r, e.mode || "hide"),
                c = "show" === l,
                u = e.direction || "vertical",
                h = "vertical" === u,
                d = h ? "height" : "width",
                p = h ? "top" : "left",
                f = {};
            t.effects.save(r, a), r.show(), n = t.effects.createWrapper(r).css({
                overflow: "hidden"
            }), o = "IMG" === r[0].tagName ? n : r, s = o[d](), c && (o.css(d, 0), o.css(p, s / 2)), f[d] = c ? s : 0, f[p] = c ? 0 : s / 2, o.animate(f, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: function() {
                    c || r.hide(), t.effects.restore(r, a), t.effects.removeWrapper(r), i()
                }
            })
        }
    }(jQuery),
    function(t) {
        t.effects.effect.drop = function(e, i) {
            var n, o = t(this),
                s = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
                r = t.effects.setMode(o, e.mode || "hide"),
                a = "show" === r,
                l = e.direction || "left",
                c = "up" === l || "down" === l ? "top" : "left",
                u = "up" === l || "left" === l ? "pos" : "neg",
                h = {
                    opacity: a ? 1 : 0
                };
            t.effects.save(o, s), o.show(), t.effects.createWrapper(o), n = e.distance || o["top" === c ? "outerHeight" : "outerWidth"](!0) / 2, a && o.css("opacity", 0).css(c, "pos" === u ? -n : n), h[c] = (a ? "pos" === u ? "+=" : "-=" : "pos" === u ? "-=" : "+=") + n, o.animate(h, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: function() {
                    "hide" === r && o.hide(), t.effects.restore(o, s), t.effects.removeWrapper(o), i()
                }
            })
        }
    }(jQuery),
    function(t) {
        t.effects.effect.explode = function(e, i) {
            function n() {
                b.push(this), b.length === h * d && o()
            }

            function o() {
                p.css({
                    visibility: "visible"
                }), t(b).remove(), m || p.hide(), i()
            }
            var s, r, a, l, c, u, h = e.pieces ? Math.round(Math.sqrt(e.pieces)) : 3,
                d = h,
                p = t(this),
                f = t.effects.setMode(p, e.mode || "hide"),
                m = "show" === f,
                g = p.show().css("visibility", "hidden").offset(),
                v = Math.ceil(p.outerWidth() / d),
                y = Math.ceil(p.outerHeight() / h),
                b = [];
            for (s = 0; h > s; s++)
                for (l = g.top + s * y, u = s - (h - 1) / 2, r = 0; d > r; r++) a = g.left + r * v, c = r - (d - 1) / 2, p.clone().appendTo("body").wrap("<div></div>").css({
                    position: "absolute",
                    visibility: "visible",
                    left: -r * v,
                    top: -s * y
                }).parent().addClass("ui-effects-explode").css({
                    position: "absolute",
                    overflow: "hidden",
                    width: v,
                    height: y,
                    left: a + (m ? c * v : 0),
                    top: l + (m ? u * y : 0),
                    opacity: m ? 0 : 1
                }).animate({
                    left: a + (m ? 0 : c * v),
                    top: l + (m ? 0 : u * y),
                    opacity: m ? 1 : 0
                }, e.duration || 500, e.easing, n)
        }
    }(jQuery),
    function(t) {
        t.effects.effect.fade = function(e, i) {
            var n = t(this),
                o = t.effects.setMode(n, e.mode || "toggle");
            n.animate({
                opacity: o
            }, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: i
            })
        }
    }(jQuery),
    function(t) {
        t.effects.effect.fold = function(e, i) {
            var n, o, s = t(this),
                r = ["position", "top", "bottom", "left", "right", "height", "width"],
                a = t.effects.setMode(s, e.mode || "hide"),
                l = "show" === a,
                c = "hide" === a,
                u = e.size || 15,
                h = /([0-9]+)%/.exec(u),
                d = !!e.horizFirst,
                p = l !== d,
                f = p ? ["width", "height"] : ["height", "width"],
                m = e.duration / 2,
                g = {},
                v = {};
            t.effects.save(s, r), s.show(), n = t.effects.createWrapper(s).css({
                overflow: "hidden"
            }), o = p ? [n.width(), n.height()] : [n.height(), n.width()], h && (u = parseInt(h[1], 10) / 100 * o[c ? 0 : 1]), l && n.css(d ? {
                height: 0,
                width: u
            } : {
                height: u,
                width: 0
            }), g[f[0]] = l ? o[0] : u, v[f[1]] = l ? o[1] : 0, n.animate(g, m, e.easing).animate(v, m, e.easing, function() {
                c && s.hide(), t.effects.restore(s, r), t.effects.removeWrapper(s), i()
            })
        }
    }(jQuery),
    function(t) {
        t.effects.effect.highlight = function(e, i) {
            var n = t(this),
                o = ["backgroundImage", "backgroundColor", "opacity"],
                s = t.effects.setMode(n, e.mode || "show"),
                r = {
                    backgroundColor: n.css("backgroundColor")
                };
            "hide" === s && (r.opacity = 0), t.effects.save(n, o), n.show().css({
                backgroundImage: "none",
                backgroundColor: e.color || "#ffff99"
            }).animate(r, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: function() {
                    "hide" === s && n.hide(), t.effects.restore(n, o), i()
                }
            })
        }
    }(jQuery),
    function(t) {
        t.effects.effect.pulsate = function(e, i) {
            var n, o = t(this),
                s = t.effects.setMode(o, e.mode || "show"),
                r = "show" === s,
                a = "hide" === s,
                l = r || "hide" === s,
                c = 2 * (e.times || 5) + (l ? 1 : 0),
                u = e.duration / c,
                h = 0,
                d = o.queue(),
                p = d.length;
            for ((r || !o.is(":visible")) && (o.css("opacity", 0).show(), h = 1), n = 1; c > n; n++) o.animate({
                opacity: h
            }, u, e.easing), h = 1 - h;
            o.animate({
                opacity: h
            }, u, e.easing), o.queue(function() {
                a && o.hide(), i()
            }), p > 1 && d.splice.apply(d, [1, 0].concat(d.splice(p, c + 1))), o.dequeue()
        }
    }(jQuery),
    function(t) {
        t.effects.effect.puff = function(e, i) {
            var n = t(this),
                o = t.effects.setMode(n, e.mode || "hide"),
                s = "hide" === o,
                r = parseInt(e.percent, 10) || 150,
                a = r / 100,
                l = {
                    height: n.height(),
                    width: n.width(),
                    outerHeight: n.outerHeight(),
                    outerWidth: n.outerWidth()
                };
            t.extend(e, {
                effect: "scale",
                queue: !1,
                fade: !0,
                mode: o,
                complete: i,
                percent: s ? r : 100,
                from: s ? l : {
                    height: l.height * a,
                    width: l.width * a,
                    outerHeight: l.outerHeight * a,
                    outerWidth: l.outerWidth * a
                }
            }), n.effect(e)
        }, t.effects.effect.scale = function(e, i) {
            var n = t(this),
                o = t.extend(!0, {}, e),
                s = t.effects.setMode(n, e.mode || "effect"),
                r = parseInt(e.percent, 10) || (0 === parseInt(e.percent, 10) ? 0 : "hide" === s ? 0 : 100),
                a = e.direction || "both",
                l = e.origin,
                c = {
                    height: n.height(),
                    width: n.width(),
                    outerHeight: n.outerHeight(),
                    outerWidth: n.outerWidth()
                },
                u = {
                    y: "horizontal" !== a ? r / 100 : 1,
                    x: "vertical" !== a ? r / 100 : 1
                };
            o.effect = "size", o.queue = !1, o.complete = i, "effect" !== s && (o.origin = l || ["middle", "center"], o.restore = !0), o.from = e.from || ("show" === s ? {
                height: 0,
                width: 0,
                outerHeight: 0,
                outerWidth: 0
            } : c), o.to = {
                height: c.height * u.y,
                width: c.width * u.x,
                outerHeight: c.outerHeight * u.y,
                outerWidth: c.outerWidth * u.x
            }, o.fade && ("show" === s && (o.from.opacity = 0, o.to.opacity = 1), "hide" === s && (o.from.opacity = 1, o.to.opacity = 0)), n.effect(o)
        }, t.effects.effect.size = function(e, i) {
            var n, o, s, r = t(this),
                a = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
                l = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
                c = ["width", "height", "overflow"],
                u = ["fontSize"],
                h = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
                d = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
                p = t.effects.setMode(r, e.mode || "effect"),
                f = e.restore || "effect" !== p,
                m = e.scale || "both",
                g = e.origin || ["middle", "center"],
                v = r.css("position"),
                y = f ? a : l,
                b = {
                    height: 0,
                    width: 0,
                    outerHeight: 0,
                    outerWidth: 0
                };
            "show" === p && r.show(), n = {
                height: r.height(),
                width: r.width(),
                outerHeight: r.outerHeight(),
                outerWidth: r.outerWidth()
            }, "toggle" === e.mode && "show" === p ? (r.from = e.to || b, r.to = e.from || n) : (r.from = e.from || ("show" === p ? b : n), r.to = e.to || ("hide" === p ? b : n)), s = {
                from: {
                    y: r.from.height / n.height,
                    x: r.from.width / n.width
                },
                to: {
                    y: r.to.height / n.height,
                    x: r.to.width / n.width
                }
            }, ("box" === m || "both" === m) && (s.from.y !== s.to.y && (y = y.concat(h), r.from = t.effects.setTransition(r, h, s.from.y, r.from), r.to = t.effects.setTransition(r, h, s.to.y, r.to)), s.from.x !== s.to.x && (y = y.concat(d), r.from = t.effects.setTransition(r, d, s.from.x, r.from), r.to = t.effects.setTransition(r, d, s.to.x, r.to))), ("content" === m || "both" === m) && s.from.y !== s.to.y && (y = y.concat(u).concat(c), r.from = t.effects.setTransition(r, u, s.from.y, r.from), r.to = t.effects.setTransition(r, u, s.to.y, r.to)), t.effects.save(r, y), r.show(), t.effects.createWrapper(r), r.css("overflow", "hidden").css(r.from), g && (o = t.effects.getBaseline(g, n), r.from.top = (n.outerHeight - r.outerHeight()) * o.y, r.from.left = (n.outerWidth - r.outerWidth()) * o.x, r.to.top = (n.outerHeight - r.to.outerHeight) * o.y, r.to.left = (n.outerWidth - r.to.outerWidth) * o.x), r.css(r.from), ("content" === m || "both" === m) && (h = h.concat(["marginTop", "marginBottom"]).concat(u), d = d.concat(["marginLeft", "marginRight"]), c = a.concat(h).concat(d), r.find("*[width]").each(function() {
                var i = t(this),
                    n = {
                        height: i.height(),
                        width: i.width(),
                        outerHeight: i.outerHeight(),
                        outerWidth: i.outerWidth()
                    };
                f && t.effects.save(i, c), i.from = {
                    height: n.height * s.from.y,
                    width: n.width * s.from.x,
                    outerHeight: n.outerHeight * s.from.y,
                    outerWidth: n.outerWidth * s.from.x
                }, i.to = {
                    height: n.height * s.to.y,
                    width: n.width * s.to.x,
                    outerHeight: n.height * s.to.y,
                    outerWidth: n.width * s.to.x
                }, s.from.y !== s.to.y && (i.from = t.effects.setTransition(i, h, s.from.y, i.from), i.to = t.effects.setTransition(i, h, s.to.y, i.to)), s.from.x !== s.to.x && (i.from = t.effects.setTransition(i, d, s.from.x, i.from), i.to = t.effects.setTransition(i, d, s.to.x, i.to)), i.css(i.from), i.animate(i.to, e.duration, e.easing, function() {
                    f && t.effects.restore(i, c)
                })
            })), r.animate(r.to, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: function() {
                    0 === r.to.opacity && r.css("opacity", r.from.opacity), "hide" === p && r.hide(), t.effects.restore(r, y), f || ("static" === v ? r.css({
                        position: "relative",
                        top: r.to.top,
                        left: r.to.left
                    }) : t.each(["top", "left"], function(t, e) {
                        r.css(e, function(e, i) {
                            var n = parseInt(i, 10),
                                o = t ? r.to.left : r.to.top;
                            return "auto" === i ? o + "px" : n + o + "px"
                        })
                    })), t.effects.removeWrapper(r), i()
                }
            })
        }
    }(jQuery),
    function(t) {
        t.effects.effect.shake = function(e, i) {
            var n, o = t(this),
                s = ["position", "top", "bottom", "left", "right", "height", "width"],
                r = t.effects.setMode(o, e.mode || "effect"),
                a = e.direction || "left",
                l = e.distance || 20,
                c = e.times || 3,
                u = 2 * c + 1,
                h = Math.round(e.duration / u),
                d = "up" === a || "down" === a ? "top" : "left",
                p = "up" === a || "left" === a,
                f = {},
                m = {},
                g = {},
                v = o.queue(),
                y = v.length;
            for (t.effects.save(o, s), o.show(), t.effects.createWrapper(o), f[d] = (p ? "-=" : "+=") + l, m[d] = (p ? "+=" : "-=") + 2 * l, g[d] = (p ? "-=" : "+=") + 2 * l, o.animate(f, h, e.easing), n = 1; c > n; n++) o.animate(m, h, e.easing).animate(g, h, e.easing);
            o.animate(m, h, e.easing).animate(f, h / 2, e.easing).queue(function() {
                "hide" === r && o.hide(), t.effects.restore(o, s), t.effects.removeWrapper(o), i()
            }), y > 1 && v.splice.apply(v, [1, 0].concat(v.splice(y, u + 1))), o.dequeue()
        }
    }(jQuery),
    function(t) {
        t.effects.effect.slide = function(e, i) {
            var n, o = t(this),
                s = ["position", "top", "bottom", "left", "right", "width", "height"],
                r = t.effects.setMode(o, e.mode || "show"),
                a = "show" === r,
                l = e.direction || "left",
                c = "up" === l || "down" === l ? "top" : "left",
                u = "up" === l || "left" === l,
                h = {};
            t.effects.save(o, s), o.show(), n = e.distance || o["top" === c ? "outerHeight" : "outerWidth"](!0), t.effects.createWrapper(o).css({
                overflow: "hidden"
            }), a && o.css(c, u ? isNaN(n) ? "-" + n : -n : n), h[c] = (a ? u ? "+=" : "-=" : u ? "-=" : "+=") + n, o.animate(h, {
                queue: !1,
                duration: e.duration,
                easing: e.easing,
                complete: function() {
                    "hide" === r && o.hide(), t.effects.restore(o, s), t.effects.removeWrapper(o), i()
                }
            })
        }
    }(jQuery),
    function(t) {
        t.effects.effect.transfer = function(e, i) {
            var n = t(this),
                o = t(e.to),
                s = "fixed" === o.css("position"),
                r = t("body"),
                a = s ? r.scrollTop() : 0,
                l = s ? r.scrollLeft() : 0,
                c = o.offset(),
                u = {
                    top: c.top - a,
                    left: c.left - l,
                    height: o.innerHeight(),
                    width: o.innerWidth()
                },
                h = n.offset(),
                d = t("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(e.className).css({
                    top: h.top - a,
                    left: h.left - l,
                    height: n.innerHeight(),
                    width: n.innerWidth(),
                    position: s ? "fixed" : "absolute"
                }).animate(u, e.duration, e.easing, function() {
                    d.remove(), i()
                })
        }
    }(jQuery),
    function(t, e, i, n) {
        "use strict";
        var o = i("html"),
            s = i(t),
            r = i(e),
            a = i.fancybox = function() {
                a.open.apply(this, arguments)
            },
            l = navigator.userAgent.match(/msie/i),
            c = null,
            u = e.createTouch !== n,
            h = function(t) {
                return t && t.hasOwnProperty && t instanceof i
            },
            d = function(t) {
                return t && "string" === i.type(t)
            },
            p = function(t) {
                return d(t) && t.indexOf("%") > 0
            },
            f = function(t) {
                return t && !(t.style.overflow && "hidden" === t.style.overflow) && (t.clientWidth && t.scrollWidth > t.clientWidth || t.clientHeight && t.scrollHeight > t.clientHeight)
            },
            m = function(t, e) {
                var i = parseInt(t, 10) || 0;
                return e && p(t) && (i = a.getViewport()[e] / 100 * i), Math.ceil(i)
            },
            g = function(t, e) {
                return m(t, e) + "px"
            };
        i.extend(a, {
            version: "2.1.5",
            defaults: {
                padding: 15,
                margin: 70,
                width: 800,
                height: 600,
                minWidth: 100,
                minHeight: 100,
                maxWidth: 9999,
                maxHeight: 9999,
                pixelRatio: 1,
                autoSize: !0,
                autoHeight: !1,
                autoWidth: !1,
                autoResize: !0,
                autoCenter: !u,
                fitToView: !0,
                aspectRatio: !1,
                topRatio: .5,
                leftRatio: .5,
                scrolling: "auto",
                wrapCSS: "",
                arrows: !0,
                closeBtn: !0,
                closeClick: !1,
                nextClick: !1,
                mouseWheel: !0,
                autoPlay: !1,
                playSpeed: 3e3,
                preload: 3,
                modal: !1,
                loop: !0,
                ajax: {
                    dataType: "html",
                    headers: {
                        "X-fancyBox": !0
                    }
                },
                iframe: {
                    scrolling: "auto",
                    preload: !0
                },
                swf: {
                    wmode: "transparent",
                    allowfullscreen: "true",
                    allowscriptaccess: "always"
                },
                keys: {
                    next: {
                        13: "left",
                        34: "up",
                        39: "left",
                        40: "up"
                    },
                    prev: {
                        8: "right",
                        33: "down",
                        37: "right",
                        38: "down"
                    },
                    close: [27],
                    play: [32],
                    toggle: [70]
                },
                direction: {
                    next: "left",
                    prev: "right"
                },
                scrollOutside: !0,
                index: 0,
                type: null,
                href: null,
                content: null,
                title: null,
                tpl: {
                    wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
                    image: '<img class="fancybox-image" src="{href}" alt="" />',
                    iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (l ? ' allowtransparency="true"' : "") + "></iframe>",
                    error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
                    closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
                    next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
                    prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
                },
                openEffect: "fade",
                openSpeed: 250,
                openEasing: "swing",
                openOpacity: !0,
                openMethod: "zoomIn",
                closeEffect: "fade",
                closeSpeed: 250,
                closeEasing: "swing",
                closeOpacity: !0,
                closeMethod: "zoomOut",
                nextEffect: "elastic",
                nextSpeed: 250,
                nextEasing: "swing",
                nextMethod: "changeIn",
                prevEffect: "elastic",
                prevSpeed: 250,
                prevEasing: "swing",
                prevMethod: "changeOut",
                helpers: {
                    overlay: !0,
                    title: !0
                },
                onCancel: i.noop,
                beforeLoad: i.noop,
                afterLoad: i.noop,
                beforeShow: i.noop,
                afterShow: i.noop,
                beforeChange: i.noop,
                beforeClose: i.noop,
                afterClose: i.noop
            },
            group: {},
            opts: {},
            previous: null,
            coming: null,
            current: null,
            isActive: !1,
            isOpen: !1,
            isOpened: !1,
            wrap: null,
            skin: null,
            outer: null,
            inner: null,
            player: {
                timer: null,
                isActive: !1
            },
            ajaxLoad: null,
            imgPreload: null,
            transitions: {},
            helpers: {},
            open: function(t, e) {
                if (t && (i.isPlainObject(e) || (e = {}), !1 !== a.close(!0))) return i.isArray(t) || (t = h(t) ? i(t).get() : [t]), i.each(t, function(o, s) {
                    var r, l, c, u, p, f, m, g = {};
                    "object" === i.type(s) && (s.nodeType && (s = i(s)), h(s) ? (g = {
                        href: s.data("fancybox-href") || s.attr("href"),
                        title: s.data("fancybox-title") || s.attr("title"),
                        isDom: !0,
                        element: s
                    }, i.metadata && i.extend(!0, g, s.metadata())) : g = s), r = e.href || g.href || (d(s) ? s : null), l = e.title !== n ? e.title : g.title || "", c = e.content || g.content, u = c ? "html" : e.type || g.type, !u && g.isDom && (u = s.data("fancybox-type"), u || (p = s.prop("class").match(/fancybox\.(\w+)/), u = p ? p[1] : null)), d(r) && (u || (a.isImage(r) ? u = "image" : a.isSWF(r) ? u = "swf" : "#" === r.charAt(0) ? u = "inline" : d(s) && (u = "html", c = s)), "ajax" === u && (f = r.split(/\s+/, 2), r = f.shift(), m = f.shift())), c || ("inline" === u ? r ? c = i(d(r) ? r.replace(/.*(?=#[^\s]+$)/, "") : r) : g.isDom && (c = s) : "html" === u ? c = r : u || r || !g.isDom || (u = "inline", c = s)), i.extend(g, {
                        href: r,
                        type: u,
                        content: c,
                        title: l,
                        selector: m
                    }), t[o] = g
                }), a.opts = i.extend(!0, {}, a.defaults, e), e.keys !== n && (a.opts.keys = !!e.keys && i.extend({}, a.defaults.keys, e.keys)), a.group = t, a._start(a.opts.index)
            },
            cancel: function() {
                var t = a.coming;
                t && !1 !== a.trigger("onCancel") && (a.hideLoading(), a.ajaxLoad && a.ajaxLoad.abort(), a.ajaxLoad = null, a.imgPreload && (a.imgPreload.onload = a.imgPreload.onerror = null), t.wrap && t.wrap.stop(!0, !0).trigger("onReset").remove(), a.coming = null, a.current || a._afterZoomOut(t))
            },
            close: function(t) {
                a.cancel(), !1 !== a.trigger("beforeClose") && (a.unbindEvents(), a.isActive && (a.isOpen && t !== !0 ? (a.isOpen = a.isOpened = !1, a.isClosing = !0, i(".fancybox-item, .fancybox-nav").remove(), a.wrap.stop(!0, !0).removeClass("fancybox-opened"), a.transitions[a.current.closeMethod]()) : (i(".fancybox-wrap").stop(!0).trigger("onReset").remove(), a._afterZoomOut())))
            },
            play: function(t) {
                var e = function() {
                        clearTimeout(a.player.timer)
                    },
                    i = function() {
                        e(), a.current && a.player.isActive && (a.player.timer = setTimeout(a.next, a.current.playSpeed))
                    },
                    n = function() {
                        e(), r.unbind(".player"), a.player.isActive = !1, a.trigger("onPlayEnd")
                    },
                    o = function() {
                        a.current && (a.current.loop || a.current.index < a.group.length - 1) && (a.player.isActive = !0, r.bind({
                            "onCancel.player beforeClose.player": n,
                            "onUpdate.player": i,
                            "beforeLoad.player": e
                        }), i(), a.trigger("onPlayStart"))
                    };
                t === !0 || !a.player.isActive && t !== !1 ? o() : n()
            },
            next: function(t) {
                var e = a.current;
                e && (d(t) || (t = e.direction.next), a.jumpto(e.index + 1, t, "next"))
            },
            prev: function(t) {
                var e = a.current;
                e && (d(t) || (t = e.direction.prev), a.jumpto(e.index - 1, t, "prev"))
            },
            jumpto: function(t, e, i) {
                var o = a.current;
                o && (t = m(t), a.direction = e || o.direction[t >= o.index ? "next" : "prev"], a.router = i || "jumpto", o.loop && (t < 0 && (t = o.group.length + t % o.group.length), t %= o.group.length), o.group[t] !== n && (a.cancel(), a._start(t)))
            },
            reposition: function(t, e) {
                var n, o = a.current,
                    s = o ? o.wrap : null;
                s && (n = a._getPosition(e), t && "scroll" === t.type ? (delete n.position, s.stop(!0, !0).animate(n, 200)) : (s.css(n), o.pos = i.extend({}, o.dim, n)))
            },
            update: function(t) {
                var e = t && t.type,
                    i = !e || "orientationchange" === e;
                i && (clearTimeout(c), c = null), a.isOpen && !c && (c = setTimeout(function() {
                    var n = a.current;
                    n && !a.isClosing && (a.wrap.removeClass("fancybox-tmp"), (i || "load" === e || "resize" === e && n.autoResize) && a._setDimension(), "scroll" === e && n.canShrink || a.reposition(t), a.trigger("onUpdate"), c = null)
                }, i && !u ? 0 : 300))
            },
            toggle: function(t) {
                a.isOpen && (a.current.fitToView = "boolean" === i.type(t) ? t : !a.current.fitToView, u && (a.wrap.removeAttr("style").addClass("fancybox-tmp"), a.trigger("onUpdate")), a.update())
            },
            hideLoading: function() {
                r.unbind(".loading"), i("#fancybox-loading").remove()
            },
            showLoading: function() {
                var t, e;
                a.hideLoading(), t = i('<div id="fancybox-loading"><div></div></div>').click(a.cancel).appendTo("body"), r.bind("keydown.loading", function(t) {
                    27 === (t.which || t.keyCode) && (t.preventDefault(), a.cancel())
                }), a.defaults.fixed || (e = a.getViewport(), t.css({
                    position: "absolute",
                    top: .5 * e.h + e.y,
                    left: .5 * e.w + e.x
                }))
            },
            getViewport: function() {
                var e = a.current && a.current.locked || !1,
                    i = {
                        x: s.scrollLeft(),
                        y: s.scrollTop()
                    };
                return e ? (i.w = e[0].clientWidth, i.h = e[0].clientHeight) : (i.w = u && t.innerWidth ? t.innerWidth : s.width(), i.h = u && t.innerHeight ? t.innerHeight : s.height()), i
            },
            unbindEvents: function() {
                a.wrap && h(a.wrap) && a.wrap.unbind(".fb"), r.unbind(".fb"), s.unbind(".fb")
            },
            bindEvents: function() {
                var t, e = a.current;
                e && (s.bind("orientationchange.fb" + (u ? "" : " resize.fb") + (e.autoCenter && !e.locked ? " scroll.fb" : ""), a.update), t = e.keys, t && r.bind("keydown.fb", function(o) {
                    var s = o.which || o.keyCode,
                        r = o.target || o.srcElement;
                    return (27 !== s || !a.coming) && void(o.ctrlKey || o.altKey || o.shiftKey || o.metaKey || r && (r.type || i(r).is("[contenteditable]")) || i.each(t, function(t, r) {
                        return e.group.length > 1 && r[s] !== n ? (a[t](r[s]), o.preventDefault(), !1) : i.inArray(s, r) > -1 ? (a[t](), o.preventDefault(), !1) : void 0
                    }))
                }), i.fn.mousewheel && e.mouseWheel && a.wrap.bind("mousewheel.fb", function(t, n, o, s) {
                    for (var r = t.target || null, l = i(r), c = !1; l.length && !(c || l.is(".fancybox-skin") || l.is(".fancybox-wrap"));) c = f(l[0]), l = i(l).parent();
                    0 === n || c || a.group.length > 1 && !e.canShrink && (s > 0 || o > 0 ? a.prev(s > 0 ? "down" : "left") : (s < 0 || o < 0) && a.next(s < 0 ? "up" : "right"), t.preventDefault())
                }))
            },
            trigger: function(t, e) {
                var n, o = e || a.coming || a.current;
                if (o) {
                    if (i.isFunction(o[t]) && (n = o[t].apply(o, Array.prototype.slice.call(arguments, 1))), n === !1) return !1;
                    o.helpers && i.each(o.helpers, function(e, n) {
                        n && a.helpers[e] && i.isFunction(a.helpers[e][t]) && a.helpers[e][t](i.extend(!0, {}, a.helpers[e].defaults, n), o)
                    }), r.trigger(t)
                }
            },
            isImage: function(t) {
                return d(t) && t.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
            },
            isSWF: function(t) {
                return d(t) && t.match(/\.(swf)((\?|#).*)?$/i)
            },
            _start: function(t) {
                var e, n, o, s, r, l = {};
                if (t = m(t), e = a.group[t] || null, !e) return !1;
                if (l = i.extend(!0, {}, a.opts, e), s = l.margin, r = l.padding, "number" === i.type(s) && (l.margin = [s, s, s, s]), "number" === i.type(r) && (l.padding = [r, r, r, r]), l.modal && i.extend(!0, l, {
                        closeBtn: !1,
                        closeClick: !1,
                        nextClick: !1,
                        arrows: !1,
                        mouseWheel: !1,
                        keys: null,
                        helpers: {
                            overlay: {
                                closeClick: !1
                            }
                        }
                    }), l.autoSize && (l.autoWidth = l.autoHeight = !0), "auto" === l.width && (l.autoWidth = !0), "auto" === l.height && (l.autoHeight = !0), l.group = a.group, l.index = t, a.coming = l, !1 === a.trigger("beforeLoad")) return void(a.coming = null);
                if (o = l.type, n = l.href, !o) return a.coming = null, !(!a.current || !a.router || "jumpto" === a.router) && (a.current.index = t, a[a.router](a.direction));
                if (a.isActive = !0, "image" !== o && "swf" !== o || (l.autoHeight = l.autoWidth = !1, l.scrolling = "visible"), "image" === o && (l.aspectRatio = !0), "iframe" === o && u && (l.scrolling = "scroll"), l.wrap = i(l.tpl.wrap).addClass("fancybox-" + (u ? "mobile" : "desktop") + " fancybox-type-" + o + " fancybox-tmp " + l.wrapCSS).appendTo(l.parent || "body"), i.extend(l, {
                        skin: i(".fancybox-skin", l.wrap),
                        outer: i(".fancybox-outer", l.wrap),
                        inner: i(".fancybox-inner", l.wrap)
                    }), i.each(["Top", "Right", "Bottom", "Left"], function(t, e) {
                        l.skin.css("padding" + e, g(l.padding[t]))
                    }), a.trigger("onReady"), "inline" === o || "html" === o) {
                    if (!l.content || !l.content.length) return a._error("content")
                } else if (!n) return a._error("href");
                "image" === o ? a._loadImage() : "ajax" === o ? a._loadAjax() : "iframe" === o ? a._loadIframe() : a._afterLoad()
            },
            _error: function(t) {
                i.extend(a.coming, {
                    type: "html",
                    autoWidth: !0,
                    autoHeight: !0,
                    minWidth: 0,
                    minHeight: 0,
                    scrolling: "no",
                    hasError: t,
                    content: a.coming.tpl.error
                }), a._afterLoad()
            },
            _loadImage: function() {
                var t = a.imgPreload = new Image;
                t.onload = function() {
                    this.onload = this.onerror = null, a.coming.width = this.width / a.opts.pixelRatio, a.coming.height = this.height / a.opts.pixelRatio, a._afterLoad()
                }, t.onerror = function() {
                    this.onload = this.onerror = null, a._error("image")
                }, t.src = a.coming.href, t.complete !== !0 && a.showLoading()
            },
            _loadAjax: function() {
                var t = a.coming;
                a.showLoading(), a.ajaxLoad = i.ajax(i.extend({}, t.ajax, {
                    url: t.href,
                    error: function(t, e) {
                        a.coming && "abort" !== e ? a._error("ajax", t) : a.hideLoading()
                    },
                    success: function(e, i) {
                        "success" === i && (t.content = e, a._afterLoad())
                    }
                }))
            },
            _loadIframe: function() {
                var t = a.coming,
                    e = i(t.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", u ? "auto" : t.iframe.scrolling).attr("src", t.href);
                i(t.wrap).bind("onReset", function() {
                    try {
                        i(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
                    } catch (t) {}
                }), t.iframe.preload && (a.showLoading(), e.one("load", function() {
                    i(this).data("ready", 1), u || i(this).bind("load.fb", a.update), i(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), a._afterLoad()
                })), t.content = e.appendTo(t.inner), t.iframe.preload || a._afterLoad()
            },
            _preloadImages: function() {
                var t, e, i = a.group,
                    n = a.current,
                    o = i.length,
                    s = n.preload ? Math.min(n.preload, o - 1) : 0;
                for (e = 1; e <= s; e += 1) t = i[(n.index + e) % o], "image" === t.type && t.href && ((new Image).src = t.href)
            },
            _afterLoad: function() {
                var t, e, n, o, s, r, l = a.coming,
                    c = a.current,
                    u = "fancybox-placeholder";
                if (a.hideLoading(), l && a.isActive !== !1) {
                    if (!1 === a.trigger("afterLoad", l, c)) return l.wrap.stop(!0).trigger("onReset").remove(), void(a.coming = null);
                    switch (c && (a.trigger("beforeChange", c), c.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), a.unbindEvents(), t = l, e = l.content, n = l.type, o = l.scrolling, i.extend(a, {
                        wrap: t.wrap,
                        skin: t.skin,
                        outer: t.outer,
                        inner: t.inner,
                        current: t,
                        previous: c
                    }), s = t.href, n) {
                        case "inline":
                        case "ajax":
                        case "html":
                            t.selector ? e = i("<div>").html(e).find(t.selector) : h(e) && (e.data(u) || e.data(u, i('<div class="' + u + '"></div>').insertAfter(e).hide()), e = e.show().detach(), t.wrap.bind("onReset", function() {
                                i(this).find(e).length && e.hide().replaceAll(e.data(u)).data(u, !1)
                            }));
                            break;
                        case "image":
                            e = t.tpl.image.replace("{href}", s);
                            break;
                        case "swf":
                            e = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + s + '"></param>', r = "", i.each(t.swf, function(t, i) {
                                e += '<param name="' + t + '" value="' + i + '"></param>', r += " " + t + '="' + i + '"'
                            }), e += '<embed src="' + s + '" type="application/x-shockwave-flash" width="100%" height="100%"' + r + "></embed></object>"
                    }
                    h(e) && e.parent().is(t.inner) || t.inner.append(e), a.trigger("beforeShow"), t.inner.css("overflow", "yes" === o ? "scroll" : "no" === o ? "hidden" : o), a._setDimension(), a.reposition(), a.isOpen = !1, a.coming = null, a.bindEvents(), a.isOpened ? c.prevMethod && a.transitions[c.prevMethod]() : i(".fancybox-wrap").not(t.wrap).stop(!0).trigger("onReset").remove(), a.transitions[a.isOpened ? t.nextMethod : t.openMethod](), a._preloadImages()
                }
            },
            _setDimension: function() {
                var t, e, n, o, s, r, l, c, u, h, d, f, v, y, b, w = a.getViewport(),
                    _ = 0,
                    x = !1,
                    C = !1,
                    S = a.wrap,
                    k = a.skin,
                    T = a.inner,
                    D = a.current,
                    E = D.width,
                    A = D.height,
                    I = D.minWidth,
                    M = D.minHeight,
                    j = D.maxWidth,
                    $ = D.maxHeight,
                    P = D.scrolling,
                    N = D.scrollOutside ? D.scrollbarWidth : 0,
                    O = D.margin,
                    F = m(O[1] + O[3]),
                    L = m(O[0] + O[2]);
                if (S.add(k).add(T).width("auto").height("auto").removeClass("fancybox-tmp"), t = m(k.outerWidth(!0) - k.width()), e = m(k.outerHeight(!0) - k.height()), n = F + t, o = L + e, s = p(E) ? (w.w - n) * m(E) / 100 : E, r = p(A) ? (w.h - o) * m(A) / 100 : A, "iframe" === D.type) {
                    if (y = D.content, D.autoHeight && 1 === y.data("ready")) try {
                        y[0].contentWindow.document.location && (T.width(s).height(9999), b = y.contents().find("body"), N && b.css("overflow-x", "hidden"), r = b.outerHeight(!0))
                    } catch (H) {}
                } else(D.autoWidth || D.autoHeight) && (T.addClass("fancybox-tmp"), D.autoWidth || T.width(s), D.autoHeight || T.height(r), D.autoWidth && (s = T.width()), D.autoHeight && (r = T.height()), T.removeClass("fancybox-tmp"));
                if (E = m(s), A = m(r), u = s / r, I = m(p(I) ? m(I, "w") - n : I), j = m(p(j) ? m(j, "w") - n : j), M = m(p(M) ? m(M, "h") - o : M), $ = m(p($) ? m($, "h") - o : $), l = j, c = $, D.fitToView && (j = Math.min(w.w - n, j), $ = Math.min(w.h - o, $)), f = w.w - F, v = w.h - L, D.aspectRatio ? (E > j && (E = j, A = m(E / u)), A > $ && (A = $, E = m(A * u)), E < I && (E = I, A = m(E / u)), A < M && (A = M, E = m(A * u))) : (E = Math.max(I, Math.min(E, j)), D.autoHeight && "iframe" !== D.type && (T.width(E), A = T.height()), A = Math.max(M, Math.min(A, $))), D.fitToView)
                    if (T.width(E).height(A), S.width(E + t), h = S.width(), d = S.height(), D.aspectRatio)
                        for (;
                            (h > f || d > v) && E > I && A > M && !(_++ > 19);) A = Math.max(M, Math.min($, A - 10)), E = m(A * u), E < I && (E = I, A = m(E / u)), E > j && (E = j, A = m(E / u)), T.width(E).height(A), S.width(E + t), h = S.width(), d = S.height();
                    else E = Math.max(I, Math.min(E, E - (h - f))), A = Math.max(M, Math.min(A, A - (d - v)));
                N && "auto" === P && A < r && E + t + N < f && (E += N), T.width(E).height(A), S.width(E + t), h = S.width(), d = S.height(), x = (h > f || d > v) && E > I && A > M, C = D.aspectRatio ? E < l && A < c && E < s && A < r : (E < l || A < c) && (E < s || A < r), i.extend(D, {
                    dim: {
                        width: g(h),
                        height: g(d)
                    },
                    origWidth: s,
                    origHeight: r,
                    canShrink: x,
                    canExpand: C,
                    wPadding: t,
                    hPadding: e,
                    wrapSpace: d - k.outerHeight(!0),
                    skinSpace: k.height() - A
                }), !y && D.autoHeight && A > M && A < $ && !C && T.height("auto")
            },
            _getPosition: function(t) {
                var e = a.current,
                    i = a.getViewport(),
                    n = e.margin,
                    o = a.wrap.width() + n[1] + n[3],
                    s = a.wrap.height() + n[0] + n[2],
                    r = {
                        position: "absolute",
                        top: n[0],
                        left: n[3]
                    };
                return e.autoCenter && e.fixed && !t && s <= i.h && o <= i.w ? r.position = "fixed" : e.locked || (r.top += i.y, r.left += i.x), r.top = g(Math.max(r.top, r.top + (i.h - s) * e.topRatio)), r.left = g(Math.max(r.left, r.left + (i.w - o) * e.leftRatio)), r
            },
            _afterZoomIn: function() {
                var t = a.current;
                t && (a.isOpen = a.isOpened = !0, a.wrap.css("overflow", "visible").addClass("fancybox-opened"), a.update(), (t.closeClick || t.nextClick && a.group.length > 1) && a.inner.css("cursor", "pointer").bind("click.fb", function(e) {
                    i(e.target).is("a") || i(e.target).parent().is("a") || (e.preventDefault(), a[t.closeClick ? "close" : "next"]())
                }), t.closeBtn && i(t.tpl.closeBtn).appendTo(a.skin).bind("click.fb", function(t) {
                    t.preventDefault(), a.close()
                }), t.arrows && a.group.length > 1 && ((t.loop || t.index > 0) && i(t.tpl.prev).appendTo(a.outer).bind("click.fb", a.prev), (t.loop || t.index < a.group.length - 1) && i(t.tpl.next).appendTo(a.outer).bind("click.fb", a.next)), a.trigger("afterShow"), t.loop || t.index !== t.group.length - 1 ? a.opts.autoPlay && !a.player.isActive && (a.opts.autoPlay = !1, a.play()) : a.play(!1))
            },
            _afterZoomOut: function(t) {
                t = t || a.current, i(".fancybox-wrap").trigger("onReset").remove(), i.extend(a, {
                    group: {},
                    opts: {},
                    router: !1,
                    current: null,
                    isActive: !1,
                    isOpened: !1,
                    isOpen: !1,
                    isClosing: !1,
                    wrap: null,
                    skin: null,
                    outer: null,
                    inner: null
                }), a.trigger("afterClose", t)
            }
        }), a.transitions = {
            getOrigPosition: function() {
                var t = a.current,
                    e = t.element,
                    i = t.orig,
                    n = {},
                    o = 50,
                    s = 50,
                    r = t.hPadding,
                    l = t.wPadding,
                    c = a.getViewport();
                return !i && t.isDom && e.is(":visible") && (i = e.find("img:first"), i.length || (i = e)), h(i) ? (n = i.offset(), i.is("img") && (o = i.outerWidth(), s = i.outerHeight())) : (n.top = c.y + (c.h - s) * t.topRatio, n.left = c.x + (c.w - o) * t.leftRatio), ("fixed" === a.wrap.css("position") || t.locked) && (n.top -= c.y, n.left -= c.x), n = {
                    top: g(n.top - r * t.topRatio),
                    left: g(n.left - l * t.leftRatio),
                    width: g(o + l),
                    height: g(s + r)
                }
            },
            step: function(t, e) {
                var i, n, o, s = e.prop,
                    r = a.current,
                    l = r.wrapSpace,
                    c = r.skinSpace;
                "width" !== s && "height" !== s || (i = e.end === e.start ? 1 : (t - e.start) / (e.end - e.start), a.isClosing && (i = 1 - i), n = "width" === s ? r.wPadding : r.hPadding, o = t - n, a.skin[s](m("width" === s ? o : o - l * i)), a.inner[s](m("width" === s ? o : o - l * i - c * i)))
            },
            zoomIn: function() {
                var t = a.current,
                    e = t.pos,
                    n = t.openEffect,
                    o = "elastic" === n,
                    s = i.extend({
                        opacity: 1
                    }, e);
                delete s.position, o ? (e = this.getOrigPosition(), t.openOpacity && (e.opacity = .1)) : "fade" === n && (e.opacity = .1), a.wrap.css(e).animate(s, {
                    duration: "none" === n ? 0 : t.openSpeed,
                    easing: t.openEasing,
                    step: o ? this.step : null,
                    complete: a._afterZoomIn
                })
            },
            zoomOut: function() {
                var t = a.current,
                    e = t.closeEffect,
                    i = "elastic" === e,
                    n = {
                        opacity: .1
                    };
                i && (n = this.getOrigPosition(), t.closeOpacity && (n.opacity = .1)), a.wrap.animate(n, {
                    duration: "none" === e ? 0 : t.closeSpeed,
                    easing: t.closeEasing,
                    step: i ? this.step : null,
                    complete: a._afterZoomOut
                })
            },
            changeIn: function() {
                var t, e = a.current,
                    i = e.nextEffect,
                    n = e.pos,
                    o = {
                        opacity: 1
                    },
                    s = a.direction,
                    r = 200;
                n.opacity = .1, "elastic" === i && (t = "down" === s || "up" === s ? "top" : "left", "down" === s || "right" === s ? (n[t] = g(m(n[t]) - r), o[t] = "+=" + r + "px") : (n[t] = g(m(n[t]) + r), o[t] = "-=" + r + "px")), "none" === i ? a._afterZoomIn() : a.wrap.css(n).animate(o, {
                    duration: e.nextSpeed,
                    easing: e.nextEasing,
                    complete: a._afterZoomIn
                })
            },
            changeOut: function() {
                var t = a.previous,
                    e = t.prevEffect,
                    n = {
                        opacity: .1
                    },
                    o = a.direction,
                    s = 200;
                "elastic" === e && (n["down" === o || "up" === o ? "top" : "left"] = ("up" === o || "left" === o ? "-" : "+") + "=" + s + "px"), t.wrap.animate(n, {
                    duration: "none" === e ? 0 : t.prevSpeed,
                    easing: t.prevEasing,
                    complete: function() {
                        i(this).trigger("onReset").remove()
                    }
                })
            }
        }, a.helpers.overlay = {
            defaults: {
                closeClick: !0,
                speedOut: 200,
                showEarly: !0,
                css: {},
                locked: !u,
                fixed: !0
            },
            overlay: null,
            fixed: !1,
            el: i("html"),
            create: function(t) {
                t = i.extend({}, this.defaults, t), this.overlay && this.close(), this.overlay = i('<div class="fancybox-overlay"></div>').appendTo(a.coming ? a.coming.parent : t.parent), this.fixed = !1, t.fixed && a.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
            },
            open: function(t) {
                var e = this;
                t = i.extend({}, this.defaults, t), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(t), this.fixed || (s.bind("resize.overlay", i.proxy(this.update, this)), this.update()), t.closeClick && this.overlay.bind("click.overlay", function(t) {
                    if (i(t.target).hasClass("fancybox-overlay")) return a.isActive ? a.close() : e.close(), !1
                }), this.overlay.css(t.css).show()
            },
            close: function() {
                var t, e;
                s.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (i(".fancybox-margin").removeClass("fancybox-margin"), t = s.scrollTop(), e = s.scrollLeft(), this.el.removeClass("fancybox-lock"), s.scrollTop(t).scrollLeft(e)), i(".fancybox-overlay").remove().hide(), i.extend(this, {
                    overlay: null,
                    fixed: !1
                })
            },
            update: function() {
                var t, i = "100%";
                this.overlay.width(i).height("100%"), l ? (t = Math.max(e.documentElement.offsetWidth, e.body.offsetWidth), r.width() > t && (i = r.width())) : r.width() > s.width() && (i = r.width()), this.overlay.width(i).height(r.height())
            },
            onReady: function(t, e) {
                var n = this.overlay;
                i(".fancybox-overlay").stop(!0, !0), n || this.create(t), t.locked && this.fixed && e.fixed && (n || (this.margin = r.height() > s.height() && i("html").css("margin-right").replace("px", "")), e.locked = this.overlay.append(e.wrap), e.fixed = !1), t.showEarly === !0 && this.beforeShow.apply(this, arguments)
            },
            beforeShow: function(t, e) {
                var n, o;
                e.locked && (this.margin !== !1 && (i("*").filter(function() {
                    return "fixed" === i(this).css("position") && !i(this).hasClass("fancybox-overlay") && !i(this).hasClass("fancybox-wrap")
                }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), n = s.scrollTop(), o = s.scrollLeft(), this.el.addClass("fancybox-lock"), s.scrollTop(n).scrollLeft(o)), this.open(t)
            },
            onUpdate: function() {
                this.fixed || this.update()
            },
            afterClose: function(t) {
                this.overlay && !a.coming && this.overlay.fadeOut(t.speedOut, i.proxy(this.close, this))
            }
        }, a.helpers.title = {
            defaults: {
                type: "float",
                position: "bottom"
            },
            beforeShow: function(t) {
                var e, n, o = a.current,
                    s = o.title,
                    r = t.type;
                if (i.isFunction(s) && (s = s.call(o.element, o)), d(s) && "" !== i.trim(s)) {
                    switch (e = i('<div class="fancybox-title fancybox-title-' + r + '-wrap">' + s + "</div>"), r) {
                        case "inside":
                            n = a.skin;
                            break;
                        case "outside":
                            n = a.wrap;
                            break;
                        case "over":
                            n = a.inner;
                            break;
                        default:
                            n = a.skin, e.appendTo("body"), l && e.width(e.width()), e.wrapInner('<span class="child"></span>'), a.current.margin[2] += Math.abs(m(e.css("margin-bottom")))
                    }
                    e["top" === t.position ? "prependTo" : "appendTo"](n)
                }
            }
        }, i.fn.fancybox = function(t) {
            var e, n = i(this),
                o = this.selector || "",
                s = function(s) {
                    var r, l, c = i(this).blur(),
                        u = e;
                    s.ctrlKey || s.altKey || s.shiftKey || s.metaKey || c.is(".fancybox-wrap") || (r = t.groupAttr || "data-fancybox-group", l = c.attr(r), l || (r = "rel", l = c.get(0)[r]), l && "" !== l && "nofollow" !== l && (c = o.length ? i(o) : n, c = c.filter("[" + r + '="' + l + '"]'), u = c.index(this)), t.index = u, a.open(c, t) !== !1 && s.preventDefault())
                };
            return t = t || {}, e = t.index || 0, o && t.live !== !1 ? r.undelegate(o, "click.fb-start").delegate(o + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", s) : n.unbind("click.fb-start").bind("click.fb-start", s), this.filter("[data-fancybox-start=1]").trigger("click"), this
        }, r.ready(function() {
            var e, s;
            i.scrollbarWidth === n && (i.scrollbarWidth = function() {
                var t = i('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
                    e = t.children(),
                    n = e.innerWidth() - e.height(99).innerWidth();
                return t.remove(), n
            }), i.support.fixedPosition === n && (i.support.fixedPosition = function() {
                var t = i('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
                    e = 20 === t[0].offsetTop || 15 === t[0].offsetTop;
                return t.remove(), e
            }()), i.extend(a.defaults, {
                scrollbarWidth: i.scrollbarWidth(),
                fixed: i.support.fixedPosition,
                parent: i("body")
            }), e = i(t).width(), o.addClass("fancybox-lock-test"), s = i(t).width(), o.removeClass("fancybox-lock-test"), i("<style type='text/css'>.fancybox-margin{margin-right:" + (s - e) + "px;}</style>").appendTo("head")
        })
    }(window, document, jQuery),
    function(t) {
        "use strict";
        var e = t.fancybox,
            i = function(e, i, n) {
                return n = n || "", "object" === t.type(n) && (n = t.param(n, !0)), t.each(i, function(t, i) {
                    e = e.replace("$" + t, i || "")
                }), n.length && (e += (e.indexOf("?") > 0 ? "&" : "?") + n), e
            };
        e.helpers.media = {
            defaults: {
                youtube: {
                    matcher: /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
                    params: {
                        autoplay: 1,
                        autohide: 1,
                        fs: 1,
                        rel: 0,
                        hd: 1,
                        wmode: "opaque",
                        enablejsapi: 1
                    },
                    type: "iframe",
                    url: "//www.youtube.com/embed/$3"
                },
                vimeo: {
                    matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
                    params: {
                        autoplay: 1,
                        hd: 1,
                        show_title: 1,
                        show_byline: 1,
                        show_portrait: 0,
                        fullscreen: 1
                    },
                    type: "iframe",
                    url: "//player.vimeo.com/video/$1"
                },
                metacafe: {
                    matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
                    params: {
                        autoPlay: "yes"
                    },
                    type: "swf",
                    url: function(e, i, n) {
                        return n.swf.flashVars = "playerVars=" + t.param(i, !0), "//www.metacafe.com/fplayer/" + e[1] + "/.swf"
                    }
                },
                dailymotion: {
                    matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
                    params: {
                        additionalInfos: 0,
                        autoStart: 1
                    },
                    type: "swf",
                    url: "//www.dailymotion.com/swf/video/$1"
                },
                twitvid: {
                    matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
                    params: {
                        autoplay: 0
                    },
                    type: "iframe",
                    url: "//www.twitvid.com/embed.php?guid=$1"
                },
                twitpic: {
                    matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
                    type: "image",
                    url: "//twitpic.com/show/full/$1/"
                },
                instagram: {
                    matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
                    type: "image",
                    url: "//$1/p/$2/media/?size=l"
                },
                google_maps: {
                    matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
                    type: "iframe",
                    url: function(t) {
                        return "//maps.google." + t[1] + "/" + t[3] + t[4] + "&output=" + (t[4].indexOf("layer=c") > 0 ? "svembed" : "embed")
                    }
                }
            },
            beforeLoad: function(e, n) {
                var o, s, r, a, l = n.href || "",
                    c = !1;
                for (o in e)
                    if (e.hasOwnProperty(o) && (s = e[o], r = l.match(s.matcher))) {
                        c = s.type, a = t.extend(!0, {}, s.params, n[o] || (t.isPlainObject(e[o]) ? e[o].params : null)), l = "function" === t.type(s.url) ? s.url.call(this, r, a, n) : i(s.url, r, a);
                        break
                    }
                c && (n.href = l, n.type = c, n.autoHeight = !1)
            }
        }
    }(jQuery),
    function(t) {
        var e = {
                init: function(e) {
                    var i = {
                            set_width: !1,
                            set_height: !1,
                            horizontalScroll: !1,
                            scrollInertia: 950,
                            mouseWheel: !0,
                            mouseWheelPixels: "auto",
                            autoDraggerLength: !0,
                            autoHideScrollbar: !1,
                            alwaysShowScrollbar: !1,
                            snapAmount: null,
                            snapOffset: 0,
                            scrollButtons: {
                                enable: !1,
                                scrollType: "continuous",
                                scrollSpeed: "auto",
                                scrollAmount: 40
                            },
                            advanced: {
                                updateOnBrowserResize: !0,
                                updateOnContentResize: !1,
                                autoExpandHorizontalScroll: !1,
                                autoScrollOnFocus: !0,
                                normalizeMouseWheelDelta: !1
                            },
                            contentTouchScroll: !0,
                            callbacks: {
                                onScrollStart: function() {},
                                onScroll: function() {},
                                onTotalScroll: function() {},
                                onTotalScrollBack: function() {},
                                onTotalScrollOffset: 0,
                                onTotalScrollBackOffset: 0,
                                whileScrolling: function() {}
                            },
                            theme: "light"
                        },
                        e = t.extend(!0, i, e);
                    return this.each(function() {
                        var i = t(this);
                        if (e.set_width && i.css("width", e.set_width), e.set_height && i.css("height", e.set_height), t(document).data("mCustomScrollbar-index")) {
                            var n = parseInt(t(document).data("mCustomScrollbar-index"));
                            t(document).data("mCustomScrollbar-index", n + 1)
                        } else t(document).data("mCustomScrollbar-index", "1");
                        i.wrapInner("<div class='mCustomScrollBox mCS-" + e.theme + "' id='mCSB_" + t(document).data("mCustomScrollbar-index") + "' style='position:relative; height:100%; overflow:hidden; max-width:100%;' />").addClass("mCustomScrollbar _mCS_" + t(document).data("mCustomScrollbar-index"));
                        var o = i.children(".mCustomScrollBox");
                        if (e.horizontalScroll) {
                            o.addClass("mCSB_horizontal").wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");
                            var s = o.children(".mCSB_h_wrapper");
                            s.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />").children(".mCSB_container").css({
                                width: s.children().outerWidth(),
                                position: "relative"
                            }).unwrap()
                        } else o.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />");
                        var r = o.children(".mCSB_container");
                        t.support.touch && r.addClass("mCS_touch"), r.after("<div class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer'><div class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");
                        var a = o.children(".mCSB_scrollTools"),
                            l = a.children(".mCSB_draggerContainer"),
                            c = l.children(".mCSB_dragger");
                        if (e.horizontalScroll ? c.data("minDraggerWidth", c.width()) : c.data("minDraggerHeight", c.height()), e.scrollButtons.enable && (e.horizontalScroll ? a.prepend("<a class='mCSB_buttonLeft' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonRight' oncontextmenu='return false;'></a>") : a.prepend("<a class='mCSB_buttonUp' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonDown' oncontextmenu='return false;'></a>")), o.bind("scroll", function() {
                                i.is(".mCS_disabled") || o.scrollTop(0).scrollLeft(0)
                            }), i.data({
                                mCS_Init: !0,
                                mCustomScrollbarIndex: t(document).data("mCustomScrollbar-index"),
                                horizontalScroll: e.horizontalScroll,
                                scrollInertia: e.scrollInertia,
                                scrollEasing: "mcsEaseOut",
                                mouseWheel: e.mouseWheel,
                                mouseWheelPixels: e.mouseWheelPixels,
                                autoDraggerLength: e.autoDraggerLength,
                                autoHideScrollbar: e.autoHideScrollbar,
                                alwaysShowScrollbar: e.alwaysShowScrollbar,
                                snapAmount: e.snapAmount,
                                snapOffset: e.snapOffset,
                                scrollButtons_enable: e.scrollButtons.enable,
                                scrollButtons_scrollType: e.scrollButtons.scrollType,
                                scrollButtons_scrollSpeed: e.scrollButtons.scrollSpeed,
                                scrollButtons_scrollAmount: e.scrollButtons.scrollAmount,
                                autoExpandHorizontalScroll: e.advanced.autoExpandHorizontalScroll,
                                autoScrollOnFocus: e.advanced.autoScrollOnFocus,
                                normalizeMouseWheelDelta: e.advanced.normalizeMouseWheelDelta,
                                contentTouchScroll: e.contentTouchScroll,
                                onScrollStart_Callback: e.callbacks.onScrollStart,
                                onScroll_Callback: e.callbacks.onScroll,
                                onTotalScroll_Callback: e.callbacks.onTotalScroll,
                                onTotalScrollBack_Callback: e.callbacks.onTotalScrollBack,
                                onTotalScroll_Offset: e.callbacks.onTotalScrollOffset,
                                onTotalScrollBack_Offset: e.callbacks.onTotalScrollBackOffset,
                                whileScrolling_Callback: e.callbacks.whileScrolling,
                                bindEvent_scrollbar_drag: !1,
                                bindEvent_content_touch: !1,
                                bindEvent_scrollbar_click: !1,
                                bindEvent_mousewheel: !1,
                                bindEvent_buttonsContinuous_y: !1,
                                bindEvent_buttonsContinuous_x: !1,
                                bindEvent_buttonsPixels_y: !1,
                                bindEvent_buttonsPixels_x: !1,
                                bindEvent_focusin: !1,
                                bindEvent_autoHideScrollbar: !1,
                                mCSB_buttonScrollRight: !1,
                                mCSB_buttonScrollLeft: !1,
                                mCSB_buttonScrollDown: !1,
                                mCSB_buttonScrollUp: !1
                            }), e.horizontalScroll) "none" !== i.css("max-width") && (e.advanced.updateOnContentResize || (e.advanced.updateOnContentResize = !0));
                        else if ("none" !== i.css("max-height")) {
                            var u = !1,
                                h = parseInt(i.css("max-height"));
                            i.css("max-height").indexOf("%") >= 0 && (u = h, h = i.parent().height() * u / 100), i.css("overflow", "hidden"), o.css("max-height", h)
                        }
                        if (i.mCustomScrollbar("update"), e.advanced.updateOnBrowserResize) {
                            var d, p = t(window).width(),
                                f = t(window).height();
                            t(window).bind("resize." + i.data("mCustomScrollbarIndex"), function() {
                                d && clearTimeout(d), d = setTimeout(function() {
                                    if (!i.is(".mCS_disabled") && !i.is(".mCS_destroyed")) {
                                        var e = t(window).width(),
                                            n = t(window).height();
                                        p === e && f === n || ("none" !== i.css("max-height") && u && o.css("max-height", i.parent().height() * u / 100), i.mCustomScrollbar("update"), p = e, f = n)
                                    }
                                }, 150)
                            })
                        }
                        if (e.advanced.updateOnContentResize) {
                            var m;
                            if (e.horizontalScroll) var g = r.outerWidth();
                            else var g = r.outerHeight();
                            m = setInterval(function() {
                                if (e.horizontalScroll) {
                                    e.advanced.autoExpandHorizontalScroll && r.css({
                                        position: "absolute",
                                        width: "auto"
                                    }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                                        width: r.outerWidth(),
                                        position: "relative"
                                    }).unwrap();
                                    var t = r.outerWidth()
                                } else var t = r.outerHeight();
                                t != g && (i.mCustomScrollbar("update"), g = t)
                            }, 300)
                        }
                    })
                },
                update: function() {
                    var e = t(this),
                        i = e.children(".mCustomScrollBox"),
                        n = i.children(".mCSB_container");
                    n.removeClass("mCS_no_scrollbar"), e.removeClass("mCS_disabled mCS_destroyed"), i.scrollTop(0).scrollLeft(0);
                    var o = i.children(".mCSB_scrollTools"),
                        s = o.children(".mCSB_draggerContainer"),
                        r = s.children(".mCSB_dragger");
                    if (e.data("horizontalScroll")) {
                        var a = o.children(".mCSB_buttonLeft"),
                            l = o.children(".mCSB_buttonRight"),
                            c = i.width();
                        e.data("autoExpandHorizontalScroll") && n.css({
                            position: "absolute",
                            width: "auto"
                        }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                            width: n.outerWidth(),
                            position: "relative"
                        }).unwrap();
                        var u = n.outerWidth()
                    } else var h = o.children(".mCSB_buttonUp"),
                        d = o.children(".mCSB_buttonDown"),
                        p = i.height(),
                        f = n.outerHeight();
                    if (f > p && !e.data("horizontalScroll")) {
                        o.css("display", "block");
                        var m = s.height();
                        if (e.data("autoDraggerLength")) {
                            var g = Math.round(p / f * m),
                                v = r.data("minDraggerHeight");
                            if (g <= v) r.css({
                                height: v
                            });
                            else if (g >= m - 10) {
                                var y = m - 10;
                                r.css({
                                    height: y
                                })
                            } else r.css({
                                height: g
                            });
                            r.children(".mCSB_dragger_bar").css({
                                "line-height": r.height() + "px"
                            })
                        }
                        var b = r.height(),
                            w = (f - p) / (m - b);
                        e.data("scrollAmount", w).mCustomScrollbar("scrolling", i, n, s, r, h, d, a, l);
                        var _ = Math.abs(n.position().top);
                        e.mCustomScrollbar("scrollTo", _, {
                            scrollInertia: 0,
                            trigger: "internal"
                        })
                    } else if (u > c && e.data("horizontalScroll")) {
                        o.css("display", "block");
                        var x = s.width();
                        if (e.data("autoDraggerLength")) {
                            var C = Math.round(c / u * x),
                                S = r.data("minDraggerWidth");
                            if (C <= S) r.css({
                                width: S
                            });
                            else if (C >= x - 10) {
                                var k = x - 10;
                                r.css({
                                    width: k
                                })
                            } else r.css({
                                width: C
                            })
                        }
                        var T = r.width(),
                            w = (u - c) / (x - T);
                        e.data("scrollAmount", w).mCustomScrollbar("scrolling", i, n, s, r, h, d, a, l);
                        var _ = Math.abs(n.position().left);
                        e.mCustomScrollbar("scrollTo", _, {
                            scrollInertia: 0,
                            trigger: "internal"
                        })
                    } else i.unbind("mousewheel focusin"), e.data("horizontalScroll") ? r.add(n).css("left", 0) : r.add(n).css("top", 0), e.data("alwaysShowScrollbar") ? e.data("horizontalScroll") ? e.data("horizontalScroll") && r.css({
                        width: s.width()
                    }) : r.css({
                        height: s.height()
                    }) : (o.css("display", "none"), n.addClass("mCS_no_scrollbar")), e.data({
                        bindEvent_mousewheel: !1,
                        bindEvent_focusin: !1
                    })
                },
                scrolling: function(e, n, o, s, r, a, l, c) {
                    function u(t, e, i, n) {
                        p.data("horizontalScroll") ? p.mCustomScrollbar("scrollTo", s.position().left - e + n, {
                            moveDragger: !0,
                            trigger: "internal"
                        }) : p.mCustomScrollbar("scrollTo", s.position().top - t + i, {
                            moveDragger: !0,
                            trigger: "internal"
                        })
                    }

                    function h(t) {
                        s.data("preventAction") || (s.data("preventAction", !0), p.mCustomScrollbar("scrollTo", t, {
                            trigger: "internal"
                        }))
                    }

                    function d() {
                        var t = p.data("scrollButtons_scrollSpeed");
                        return "auto" === p.data("scrollButtons_scrollSpeed") && (t = Math.round((p.data("scrollInertia") + 100) / 40)), t
                    }
                    var p = t(this);
                    if (!p.data("bindEvent_scrollbar_drag")) {
                        var f, m, g, v, y;
                        t.support.pointer ? (g = "pointerdown", v = "pointermove", y = "pointerup") : t.support.msPointer && (g = "MSPointerDown", v = "MSPointerMove", y = "MSPointerUp"), t.support.pointer || t.support.msPointer ? (s.bind(g, function(e) {
                            e.preventDefault(), p.data({
                                on_drag: !0
                            }), s.addClass("mCSB_dragger_onDrag");
                            var i = t(this),
                                n = i.offset(),
                                o = e.originalEvent.pageX - n.left,
                                r = e.originalEvent.pageY - n.top;
                            o < i.width() && o > 0 && r < i.height() && r > 0 && (f = r, m = o)
                        }), t(document).bind(v + "." + p.data("mCustomScrollbarIndex"), function(t) {
                            if (t.preventDefault(), p.data("on_drag")) {
                                var e = s,
                                    i = e.offset(),
                                    n = t.originalEvent.pageX - i.left,
                                    o = t.originalEvent.pageY - i.top;
                                u(f, m, o, n)
                            }
                        }).bind(y + "." + p.data("mCustomScrollbarIndex"), function(t) {
                            p.data({
                                on_drag: !1
                            }), s.removeClass("mCSB_dragger_onDrag")
                        })) : (s.bind("mousedown touchstart", function(e) {
                            e.preventDefault(), e.stopImmediatePropagation();
                            var i, n, o = t(this),
                                r = o.offset();
                            if ("touchstart" === e.type) {
                                var a = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];
                                i = a.pageX - r.left, n = a.pageY - r.top
                            } else p.data({
                                on_drag: !0
                            }), s.addClass("mCSB_dragger_onDrag"), i = e.pageX - r.left, n = e.pageY - r.top;
                            i < o.width() && i > 0 && n < o.height() && n > 0 && (f = n, m = i)
                        }).bind("touchmove", function(e) {
                            e.preventDefault(), e.stopImmediatePropagation();
                            var i = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
                                n = t(this),
                                o = n.offset(),
                                s = i.pageX - o.left,
                                r = i.pageY - o.top;
                            u(f, m, r, s)
                        }), t(document).bind("mousemove." + p.data("mCustomScrollbarIndex"), function(t) {
                            if (p.data("on_drag")) {
                                var e = s,
                                    i = e.offset(),
                                    n = t.pageX - i.left,
                                    o = t.pageY - i.top;
                                u(f, m, o, n)
                            }
                        }).bind("mouseup." + p.data("mCustomScrollbarIndex"), function(t) {
                            p.data({
                                on_drag: !1
                            }), s.removeClass("mCSB_dragger_onDrag")
                        })), p.data({
                            bindEvent_scrollbar_drag: !0
                        })
                    }
                    if (t.support.touch && p.data("contentTouchScroll") && !p.data("bindEvent_content_touch")) {
                        var b, w, _, x, C, S, k;
                        n.bind("touchstart", function(e) {
                            e.stopImmediatePropagation(), b = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0], w = t(this), _ = w.offset(), C = b.pageX - _.left, x = b.pageY - _.top, S = x, k = C
                        }), n.bind("touchmove", function(e) {
                            e.preventDefault(), e.stopImmediatePropagation(), b = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0], w = t(this).parent(), _ = w.offset(), C = b.pageX - _.left, x = b.pageY - _.top, p.data("horizontalScroll") ? p.mCustomScrollbar("scrollTo", k - C, {
                                trigger: "internal"
                            }) : p.mCustomScrollbar("scrollTo", S - x, {
                                trigger: "internal"
                            })
                        })
                    }
                    if (p.data("bindEvent_scrollbar_click") || (o.bind("click", function(e) {
                            var i = (e.pageY - o.offset().top) * p.data("scrollAmount"),
                                n = t(e.target);
                            p.data("horizontalScroll") && (i = (e.pageX - o.offset().left) * p.data("scrollAmount")), (n.hasClass("mCSB_draggerContainer") || n.hasClass("mCSB_draggerRail")) && p.mCustomScrollbar("scrollTo", i, {
                                trigger: "internal",
                                scrollEasing: "draggerRailEase"
                            })
                        }), p.data({
                            bindEvent_scrollbar_click: !0
                        })), p.data("mouseWheel") && (p.data("bindEvent_mousewheel") || (e.bind("mousewheel", function(t, e) {
                            var i, r = p.data("mouseWheelPixels"),
                                a = Math.abs(n.position().top),
                                l = s.position().top,
                                c = o.height() - s.height();
                            p.data("normalizeMouseWheelDelta") && (e = e < 0 ? -1 : 1), "auto" === r && (r = 100 + Math.round(p.data("scrollAmount") / 2)), p.data("horizontalScroll") && (l = s.position().left, c = o.width() - s.width(), a = Math.abs(n.position().left)), (e > 0 && 0 !== l || e < 0 && l !== c) && (t.preventDefault(), t.stopImmediatePropagation()), i = a - e * r, p.mCustomScrollbar("scrollTo", i, {
                                trigger: "internal"
                            })
                        }), p.data({
                            bindEvent_mousewheel: !0
                        }))), p.data("scrollButtons_enable"))
                        if ("pixels" === p.data("scrollButtons_scrollType")) p.data("horizontalScroll") ? (c.add(l).unbind("mousedown touchstart MSPointerDown pointerdown mouseup MSPointerUp pointerup mouseout MSPointerOut pointerout touchend", T, D), p.data({
                            bindEvent_buttonsContinuous_x: !1
                        }), p.data("bindEvent_buttonsPixels_x") || (c.bind("click", function(t) {
                            t.preventDefault(), h(Math.abs(n.position().left) + p.data("scrollButtons_scrollAmount"))
                        }), l.bind("click", function(t) {
                            t.preventDefault(), h(Math.abs(n.position().left) - p.data("scrollButtons_scrollAmount"))
                        }), p.data({
                            bindEvent_buttonsPixels_x: !0
                        }))) : (a.add(r).unbind("mousedown touchstart MSPointerDown pointerdown mouseup MSPointerUp pointerup mouseout MSPointerOut pointerout touchend", T, D), p.data({
                            bindEvent_buttonsContinuous_y: !1
                        }), p.data("bindEvent_buttonsPixels_y") || (a.bind("click", function(t) {
                            t.preventDefault(), h(Math.abs(n.position().top) + p.data("scrollButtons_scrollAmount"))
                        }), r.bind("click", function(t) {
                            t.preventDefault(), h(Math.abs(n.position().top) - p.data("scrollButtons_scrollAmount"))
                        }), p.data({
                            bindEvent_buttonsPixels_y: !0
                        })));
                        else if (p.data("horizontalScroll")) {
                        if (c.add(l).unbind("click"), p.data({
                                bindEvent_buttonsPixels_x: !1
                            }), !p.data("bindEvent_buttonsContinuous_x")) {
                            c.bind("mousedown touchstart MSPointerDown pointerdown", function(t) {
                                t.preventDefault();
                                var e = d();
                                p.data({
                                    mCSB_buttonScrollRight: setInterval(function() {
                                        p.mCustomScrollbar("scrollTo", Math.abs(n.position().left) + e, {
                                            trigger: "internal",
                                            scrollEasing: "easeOutCirc"
                                        })
                                    }, 17)
                                })
                            });
                            var T = function(t) {
                                t.preventDefault(), clearInterval(p.data("mCSB_buttonScrollRight"))
                            };
                            c.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout", T), l.bind("mousedown touchstart MSPointerDown pointerdown", function(t) {
                                t.preventDefault();
                                var e = d();
                                p.data({
                                    mCSB_buttonScrollLeft: setInterval(function() {
                                        p.mCustomScrollbar("scrollTo", Math.abs(n.position().left) - e, {
                                            trigger: "internal",
                                            scrollEasing: "easeOutCirc"
                                        })
                                    }, 17)
                                })
                            });
                            var D = function(t) {
                                t.preventDefault(), clearInterval(p.data("mCSB_buttonScrollLeft"))
                            };
                            l.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout", D), p.data({
                                bindEvent_buttonsContinuous_x: !0
                            })
                        }
                    } else if (a.add(r).unbind("click"), p.data({
                            bindEvent_buttonsPixels_y: !1
                        }), !p.data("bindEvent_buttonsContinuous_y")) {
                        a.bind("mousedown touchstart MSPointerDown pointerdown", function(t) {
                            t.preventDefault();
                            var e = d();
                            p.data({
                                mCSB_buttonScrollDown: setInterval(function() {
                                    p.mCustomScrollbar("scrollTo", Math.abs(n.position().top) + e, {
                                        trigger: "internal",
                                        scrollEasing: "easeOutCirc"
                                    })
                                }, 17)
                            })
                        });
                        var E = function(t) {
                            t.preventDefault(), clearInterval(p.data("mCSB_buttonScrollDown"))
                        };
                        a.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout", E), r.bind("mousedown touchstart MSPointerDown pointerdown", function(t) {
                            t.preventDefault();
                            var e = d();
                            p.data({
                                mCSB_buttonScrollUp: setInterval(function() {
                                    p.mCustomScrollbar("scrollTo", Math.abs(n.position().top) - e, {
                                        trigger: "internal",
                                        scrollEasing: "easeOutCirc"
                                    })
                                }, 17)
                            })
                        });
                        var A = function(t) {
                            t.preventDefault(), clearInterval(p.data("mCSB_buttonScrollUp"))
                        };
                        r.bind("mouseup touchend MSPointerUp pointerup mouseout MSPointerOut pointerout", A), p.data({
                            bindEvent_buttonsContinuous_y: !0
                        })
                    }
                    p.data("autoScrollOnFocus") && (p.data("bindEvent_focusin") || (e.bind("focusin", function() {
                        e.scrollTop(0).scrollLeft(0);
                        var i = t(document.activeElement);
                        if (i.is("input,textarea,select,button,a[tabindex],area,object")) {
                            var o = n.position().top,
                                s = i.position().top,
                                r = e.height() - i.outerHeight();
                            p.data("horizontalScroll") && (o = n.position().left, s = i.position().left, r = e.width() - i.outerWidth()), (o + s < 0 || o + s > r) && p.mCustomScrollbar("scrollTo", s, {
                                trigger: "internal"
                            })
                        }
                    }), p.data({
                        bindEvent_focusin: !0
                    }))), p.data("autoHideScrollbar") && !p.data("alwaysShowScrollbar") && (p.data("bindEvent_autoHideScrollbar") || (e.bind("mouseenter", function(t) {
                        e.addClass("mCS-mouse-over"), i.showScrollbar.call(e.children(".mCSB_scrollTools"))
                    }).bind("mouseleave touchend", function(t) {
                        e.removeClass("mCS-mouse-over"), "mouseleave" === t.type && i.hideScrollbar.call(e.children(".mCSB_scrollTools"))
                    }), p.data({
                        bindEvent_autoHideScrollbar: !0
                    })))
                },
                scrollTo: function(e, n) {
                    function o(t) {
                        if (u.data("mCustomScrollbarIndex")) switch (this.mcs = {
                            top: p.position().top,
                            left: p.position().left,
                            draggerTop: g.position().top,
                            draggerLeft: g.position().left,
                            topPct: Math.round(100 * Math.abs(p.position().top) / Math.abs(p.outerHeight() - d.height())),
                            leftPct: Math.round(100 * Math.abs(p.position().left) / Math.abs(p.outerWidth() - d.width()))
                        }, t) {
                            case "onScrollStart":
                                u.data("mCS_tweenRunning", !0).data("onScrollStart_Callback").call(u, this.mcs);
                                break;
                            case "whileScrolling":
                                u.data("whileScrolling_Callback").call(u, this.mcs);
                                break;
                            case "onScroll":
                                u.data("onScroll_Callback").call(u, this.mcs);
                                break;
                            case "onTotalScrollBack":
                                u.data("onTotalScrollBack_Callback").call(u, this.mcs);
                                break;
                            case "onTotalScroll":
                                u.data("onTotalScroll_Callback").call(u, this.mcs)
                        }
                    }
                    var s, r, a, l, c, u = t(this),
                        h = {
                            moveDragger: !1,
                            trigger: "external",
                            callbacks: !0,
                            scrollInertia: u.data("scrollInertia"),
                            scrollEasing: u.data("scrollEasing")
                        },
                        n = t.extend(h, n),
                        d = u.children(".mCustomScrollBox"),
                        p = d.children(".mCSB_container"),
                        f = d.children(".mCSB_scrollTools"),
                        m = f.children(".mCSB_draggerContainer"),
                        g = m.children(".mCSB_dragger"),
                        v = draggerSpeed = n.scrollInertia;
                    if (!p.hasClass("mCS_no_scrollbar") && (u.data({
                            mCS_trigger: n.trigger
                        }), u.data("mCS_Init") && (n.callbacks = !1), e || 0 === e)) {
                        if ("number" == typeof e) n.moveDragger ? (s = e, e = u.data("horizontalScroll") ? g.position().left * u.data("scrollAmount") : g.position().top * u.data("scrollAmount"), draggerSpeed = 0) : s = e / u.data("scrollAmount");
                        else if ("string" == typeof e) {
                            var y;
                            y = "top" === e ? 0 : "bottom" !== e || u.data("horizontalScroll") ? "left" === e ? 0 : "right" === e && u.data("horizontalScroll") ? p.outerWidth() - d.width() : "first" === e ? u.find(".mCSB_container").find(":first") : "last" === e ? u.find(".mCSB_container").find(":last") : u.find(e) : p.outerHeight() - d.height(), 1 === y.length ? (e = u.data("horizontalScroll") ? y.position().left : y.position().top, s = e / u.data("scrollAmount")) : s = e = y
                        }
                        if (u.data("horizontalScroll")) {
                            u.data("onTotalScrollBack_Offset") && (a = -u.data("onTotalScrollBack_Offset")), u.data("onTotalScroll_Offset") && (c = d.width() - p.outerWidth() + u.data("onTotalScroll_Offset")), s < 0 ? (s = e = 0, clearInterval(u.data("mCSB_buttonScrollLeft")), a || (r = !0)) : s >= m.width() - g.width() ? (s = m.width() - g.width(), e = d.width() - p.outerWidth(), clearInterval(u.data("mCSB_buttonScrollRight")), c || (l = !0)) : e = -e;
                            var b = u.data("snapAmount");
                            b && (e = Math.round(e / b) * b - u.data("snapOffset")), i.mTweenAxis.call(this, g[0], "left", Math.round(s), draggerSpeed, n.scrollEasing), i.mTweenAxis.call(this, p[0], "left", Math.round(e), v, n.scrollEasing, {
                                onStart: function() {
                                    n.callbacks && !u.data("mCS_tweenRunning") && o("onScrollStart"), u.data("autoHideScrollbar") && !u.data("alwaysShowScrollbar") && i.showScrollbar.call(f)
                                },
                                onUpdate: function() {
                                    n.callbacks && o("whileScrolling")
                                },
                                onComplete: function() {
                                    n.callbacks && (o("onScroll"), (r || a && p.position().left >= a) && o("onTotalScrollBack"), (l || c && p.position().left <= c) && o("onTotalScroll")), g.data("preventAction", !1), u.data("mCS_tweenRunning", !1), u.data("autoHideScrollbar") && !u.data("alwaysShowScrollbar") && (d.hasClass("mCS-mouse-over") || i.hideScrollbar.call(f))
                                }
                            })
                        } else {
                            u.data("onTotalScrollBack_Offset") && (a = -u.data("onTotalScrollBack_Offset")), u.data("onTotalScroll_Offset") && (c = d.height() - p.outerHeight() + u.data("onTotalScroll_Offset")), s < 0 ? (s = e = 0, clearInterval(u.data("mCSB_buttonScrollUp")), a || (r = !0)) : s >= m.height() - g.height() ? (s = m.height() - g.height(), e = d.height() - p.outerHeight(), clearInterval(u.data("mCSB_buttonScrollDown")), c || (l = !0)) : e = -e;
                            var b = u.data("snapAmount");
                            b && (e = Math.round(e / b) * b - u.data("snapOffset")), i.mTweenAxis.call(this, g[0], "top", Math.round(s), draggerSpeed, n.scrollEasing), i.mTweenAxis.call(this, p[0], "top", Math.round(e), v, n.scrollEasing, {
                                onStart: function() {
                                    n.callbacks && !u.data("mCS_tweenRunning") && o("onScrollStart"), u.data("autoHideScrollbar") && !u.data("alwaysShowScrollbar") && i.showScrollbar.call(f)
                                },
                                onUpdate: function() {
                                    n.callbacks && o("whileScrolling")
                                },
                                onComplete: function() {
                                    n.callbacks && (o("onScroll"), (r || a && p.position().top >= a) && o("onTotalScrollBack"), (l || c && p.position().top <= c) && o("onTotalScroll")), g.data("preventAction", !1), u.data("mCS_tweenRunning", !1), u.data("autoHideScrollbar") && !u.data("alwaysShowScrollbar") && (d.hasClass("mCS-mouse-over") || i.hideScrollbar.call(f))
                                }
                            })
                        }
                        u.data("mCS_Init") && u.data({
                            mCS_Init: !1
                        })
                    }
                },
                stop: function() {
                    var e = t(this),
                        n = e.children().children(".mCSB_container"),
                        o = e.children().children().children().children(".mCSB_dragger");
                    i.mTweenAxisStop.call(this, n[0]), i.mTweenAxisStop.call(this, o[0])
                },
                disable: function(e) {
                    var i = t(this),
                        n = i.children(".mCustomScrollBox"),
                        o = n.children(".mCSB_container"),
                        s = n.children(".mCSB_scrollTools"),
                        r = s.children().children(".mCSB_dragger");
                    n.unbind("mousewheel focusin mouseenter mouseleave touchend"), o.unbind("touchstart touchmove"), e && (i.data("horizontalScroll") ? r.add(o).css("left", 0) : r.add(o).css("top", 0)), s.css("display", "none"), o.addClass("mCS_no_scrollbar"), i.data({
                        bindEvent_mousewheel: !1,
                        bindEvent_focusin: !1,
                        bindEvent_content_touch: !1,
                        bindEvent_autoHideScrollbar: !1
                    }).addClass("mCS_disabled")
                },
                destroy: function() {
                    var e = t(this);
                    e.removeClass("mCustomScrollbar _mCS_" + e.data("mCustomScrollbarIndex")).addClass("mCS_destroyed").children().children(".mCSB_container").unwrap().children().unwrap().siblings(".mCSB_scrollTools").remove(), t(document).unbind("mousemove." + e.data("mCustomScrollbarIndex") + " mouseup." + e.data("mCustomScrollbarIndex") + " MSPointerMove." + e.data("mCustomScrollbarIndex") + " MSPointerUp." + e.data("mCustomScrollbarIndex")), t(window).unbind("resize." + e.data("mCustomScrollbarIndex"))
                }
            },
            i = {
                showScrollbar: function() {
                    this.stop().animate({
                        opacity: 1
                    }, "fast")
                },
                hideScrollbar: function() {
                    this.stop().animate({
                        opacity: 0
                    }, "fast")
                },
                mTweenAxis: function(t, e, i, n, o, s) {
                    function r() {
                        return window.performance && window.performance.now ? window.performance.now() : window.performance && window.performance.webkitNow ? window.performance.webkitNow() : Date.now ? Date.now() : (new Date).getTime()
                    }

                    function a() {
                        v || p.call(), v = r() - g, l(), v >= t._time && (t._time = v > t._time ? v + d - (v - t._time) : v + d - 1, t._time < v + 1 && (t._time = v + 1)), t._time < n ? t._id = _request(a) : m.call()
                    }

                    function l() {
                        n > 0 ? (t.currVal = h(t._time, y, w, n, o), b[e] = Math.round(t.currVal) + "px") : b[e] = i + "px", f.call()
                    }

                    function c() {
                        d = 1e3 / 60, t._time = v + d, _request = window.requestAnimationFrame ? window.requestAnimationFrame : function(t) {
                            return l(), setTimeout(t, .01)
                        }, t._id = _request(a)
                    }

                    function u() {
                        null != t._id && (window.requestAnimationFrame ? window.cancelAnimationFrame(t._id) : clearTimeout(t._id), t._id = null)
                    }

                    function h(t, e, i, n, o) {
                        switch (o) {
                            case "linear":
                                return i * t / n + e;
                            case "easeOutQuad":
                                return t /= n, -i * t * (t - 2) + e;
                            case "easeInOutQuad":
                                return t /= n / 2, t < 1 ? i / 2 * t * t + e : (t--, -i / 2 * (t * (t - 2) - 1) + e);
                            case "easeOutCubic":
                                return t /= n, t--, i * (t * t * t + 1) + e;
                            case "easeOutQuart":
                                return t /= n, t--, -i * (t * t * t * t - 1) + e;
                            case "easeOutQuint":
                                return t /= n, t--, i * (t * t * t * t * t + 1) + e;
                            case "easeOutCirc":
                                return t /= n, t--, i * Math.sqrt(1 - t * t) + e;
                            case "easeOutSine":
                                return i * Math.sin(t / n * (Math.PI / 2)) + e;
                            case "easeOutExpo":
                                return i * (-Math.pow(2, -10 * t / n) + 1) + e;
                            case "mcsEaseOut":
                                var s = (t /= n) * t,
                                    r = s * t;
                                return e + i * (.499999999999997 * r * s + -2.5 * s * s + 5.5 * r + -6.5 * s + 4 * t);
                            case "draggerRailEase":
                                return t /= n / 2, t < 1 ? i / 2 * t * t * t + e : (t -= 2, i / 2 * (t * t * t + 2) + e)
                        }
                    }
                    var d, s = s || {},
                        p = s.onStart || function() {},
                        f = s.onUpdate || function() {},
                        m = s.onComplete || function() {},
                        g = r(),
                        v = 0,
                        y = t.offsetTop,
                        b = t.style;
                    "left" === e && (y = t.offsetLeft);
                    var w = i - y;
                    u(), c()
                },
                mTweenAxisStop: function(t) {
                    null != t._id && (window.requestAnimationFrame ? window.cancelAnimationFrame(t._id) : clearTimeout(t._id), t._id = null)
                },
                rafPolyfill: function() {
                    for (var t = ["ms", "moz", "webkit", "o"], e = t.length; --e > -1 && !window.requestAnimationFrame;) window.requestAnimationFrame = window[t[e] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[e] + "CancelAnimationFrame"] || window[t[e] + "CancelRequestAnimationFrame"]
                }
            };
        i.rafPolyfill.call(), t.support.touch = !!("ontouchstart" in window), t.support.pointer = window.navigator.pointerEnabled, t.support.msPointer = window.navigator.msPointerEnabled;
        "https:" == document.location.protocol ? "https:" : "http:";
        t.event.special.mousewheel || document.write('<script src="/js/jquery/jquery.mousewheel.min.3.0.6.js"></script>'), t.fn.mCustomScrollbar = function(i) {
            return e[i] ? e[i].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof i && i ? void t.error("Method " + i + " does not exist") : e.init.apply(this, arguments)
        }
    }(jQuery), ! function(t) {
        "use strict";

        function e(t, e, i) {
            return t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent ? t.attachEvent("on" + e, i) : void 0
        }

        function i(t, e) {
            var i, n;
            for (i = 0, n = t.length; n > i; i++)
                if (t[i] === e) return !0;
            return !1
        }

        function n(t, e) {
            var i;
            t.createTextRange ? (i = t.createTextRange(), i.move("character", e), i.select()) : t.selectionStart && (t.focus(), t.setSelectionRange(e, e))
        }

        function o(t, e) {
            try {
                return t.type = e, !0
            } catch (i) {
                return !1
            }
        }
        t.Placeholders = {
            Utils: {
                addEventListener: e,
                inArray: i,
                moveCaret: n,
                changeType: o
            }
        }
    }(this),
    function(t) {
        "use strict";

        function e() {}

        function i(t) {
            var e;
            return t.value === t.getAttribute(j) && "true" === t.getAttribute($) && (t.setAttribute($, "false"), t.value = "", t.className = t.className.replace(M, ""), e = t.getAttribute(P), e && (t.type = e), !0)
        }

        function n(t) {
            var e, i = t.getAttribute(j);
            return !("" !== t.value || !i) && (t.setAttribute($, "true"), t.value = i, t.className += " " + I, e = t.getAttribute(P), e ? t.type = "text" : "password" === t.type && q.changeType(t, "text") && t.setAttribute(P, "password"), !0)
        }

        function o(t, e) {
            var i, n, o, s, r;
            if (t && t.getAttribute(j)) e(t);
            else
                for (i = t ? t.getElementsByTagName("input") : f, n = t ? t.getElementsByTagName("textarea") : m, r = 0, s = i.length + n.length; s > r; r++) o = r < i.length ? i[r] : n[r - i.length], e(o)
        }

        function s(t) {
            o(t, i)
        }

        function r(t) {
            o(t, n)
        }

        function a(t) {
            return function() {
                g && t.value === t.getAttribute(j) && "true" === t.getAttribute($) ? q.moveCaret(t, 0) : i(t)
            }
        }

        function l(t) {
            return function() {
                n(t)
            }
        }

        function c(t) {
            return function(e) {
                return y = t.value, "true" === t.getAttribute($) && y === t.getAttribute(j) && q.inArray(E, e.keyCode) ? (e.preventDefault && e.preventDefault(), !1) : void 0
            }
        }

        function u(t) {
            return function() {
                var e;
                "true" === t.getAttribute($) && t.value !== y && (t.className = t.className.replace(M, ""), t.value = t.value.replace(t.getAttribute(j), ""), t.setAttribute($, !1), e = t.getAttribute(P), e && (t.type = e)), "" === t.value && (t.blur(), q.moveCaret(t, 0))
            }
        }

        function h(t) {
            return function() {
                t === document.activeElement && t.value === t.getAttribute(j) && "true" === t.getAttribute($) && q.moveCaret(t, 0)
            }
        }

        function d(t) {
            return function() {
                s(t)
            }
        }

        function p(t) {
            t.form && (C = t.form, C.getAttribute(N) || (q.addEventListener(C, "submit", d(C)), C.setAttribute(N, "true"))), q.addEventListener(t, "focus", a(t)), q.addEventListener(t, "blur", l(t)), g && (q.addEventListener(t, "keydown", c(t)), q.addEventListener(t, "keyup", u(t)), q.addEventListener(t, "click", h(t))), t.setAttribute(O, "true"), t.setAttribute(j, _), n(t)
        }
        var f, m, g, v, y, b, w, _, x, C, S, k, T, D = ["text", "search", "url", "tel", "email", "password", "number", "textarea"],
            E = [27, 33, 34, 35, 36, 37, 38, 39, 40, 8, 46],
            A = "#ccc",
            I = "placeholdersjs",
            M = new RegExp("(?:^|\\s)" + I + "(?!\\S)"),
            j = "data-placeholder-value",
            $ = "data-placeholder-active",
            P = "data-placeholder-type",
            N = "data-placeholder-submit",
            O = "data-placeholder-bound",
            F = "data-placeholder-focus",
            L = "data-placeholder-live",
            H = document.createElement("input"),
            R = document.getElementsByTagName("head")[0],
            B = document.documentElement,
            W = t.Placeholders,
            q = W.Utils;
        if (W.nativeSupport = void 0 !== H.placeholder, !W.nativeSupport) {
            for (f = document.getElementsByTagName("input"), m = document.getElementsByTagName("textarea"), g = "false" === B.getAttribute(F), v = "false" !== B.getAttribute(L), b = document.createElement("style"), b.type = "text/css", w = document.createTextNode("." + I + " { color:" + A + "; }"), b.styleSheet ? b.styleSheet.cssText = w.nodeValue : b.appendChild(w), R.insertBefore(b, R.firstChild), T = 0, k = f.length + m.length; k > T; T++) S = T < f.length ? f[T] : m[T - f.length], _ = S.attributes.placeholder, _ && (_ = _.nodeValue, _ && q.inArray(D, S.type) && p(S));
            x = setInterval(function() {
                for (T = 0, k = f.length + m.length; k > T; T++) S = T < f.length ? f[T] : m[T - f.length], _ = S.attributes.placeholder, _ && (_ = _.nodeValue, _ && q.inArray(D, S.type) && (S.getAttribute(O) || p(S), (_ !== S.getAttribute(j) || "password" === S.type && !S.getAttribute(P)) && ("password" === S.type && !S.getAttribute(P) && q.changeType(S, "text") && S.setAttribute(P, "password"), S.value === S.getAttribute(j) && (S.value = _), S.setAttribute(j, _))));
                v || clearInterval(x)
            }, 100)
        }
        W.disable = W.nativeSupport ? e : s, W.enable = W.nativeSupport ? e : r
    }(this), $(".navbar-toggle").click(function() {
        setTimeout(function() {
            $(".dropdown").addClass("open")
        }, 1)
    });
var easing_method = "easeInOutBack",
    animation_duration = "slow",
    animating = !1;
$(".search-toggle, .sm-search-toggle").click(function() {
    var t = $("#search-widget").innerHeight();
    $("#search-widget").hasClass("in") || 0 != animating ? $("#search-widget").hasClass("in") && 0 == animating && (animating = !0, $("#search-widget-wrapper").css({
        height: t
    }), $(".search-toggle").removeClass("active"), $("#search-widget").toggle({
        effect: "drop",
        direction: "up",
        easing: easing_method,
        duration: animation_duration
    }), $("#search-widget-wrapper").animate({
        height: 0
    }, {
        easing: easing_method,
        duration: animation_duration
    }).promise().done(function() {
        $("#search-widget").removeClass("in"), setTimeout(function() {
            animating = !1
        }, animation_duration + 300)
    })) : (animating = !0, $(".search-toggle").addClass("active"), $("#search-widget-wrapper").animate({
        height: t
    }, {
        easing: easing_method,
        duration: animation_duration
    }).promise().done(function() {
        $("#search-widget").toggle({
            effect: "drop",
            easing: easing_method,
            direction: "up",
            duration: animation_duration
        })
    }).promise().done(function() {
        $("#search-widget-wrapper").removeAttr("style"), $("#search-widget").addClass("in"), setTimeout(function() {
            animating = !1
        }, animation_duration + 300)
    }))
}), $(".close-square").click(function() {
    $(".search-toggle").trigger("click")
}), $("a[href='#top']").click(function() {
    return $("html, body").animate({
        scrollTop: 0
    }, "slow"), !1
}), $(document).on("ready", function() {
    var t = 20;
    $(".text-dot").each(function() {
        $(this).outerHeight() > t && $(this).dotdotdot({
            height: t
        })
    })
}), $(document).on("ready", function() {
    function t() {
        var t, e = $(".multi-carousel");
        t = e.find("img:first-child").height(), e.find("img").each(function() {
            t - $(this).height() > 0 && (t = $(this).height()), t < 100 && (t = 100)
        }), e.find("a").css({
            height: t
        }), e.find("img").each(function() {
            var e = $(this).height();
            $(this).css({
                "margin-top": -((e - t) / 2)
            })
        })
    }
    var e, i = ($(".summary-box"), $("body")),
        n = $("#section-job-detail"),
        o = $(".job-info");
    $(".dynamic-navbar") && $(document).scroll(function() {
        if ($("#what-we-offer").length > 0) {
            var t = $("#what-we-offer").offset().top,
                s = $(window).scrollTop();
            e = i.width() >= 992 ? n.offset().top + n.outerHeight() : o.offset().top + o.outerHeight(), s > t ? $(".dynamic-navbar").addClass("navbar-fixed-top").fadeIn(200).removeClass("hide") : $(".dynamic-navbar").fadeOut(200).promise().done(function() {
                $(this).removeClass("navbar-fixed-top")
            })
        }
    }), $(".multi-carousel a").fancybox({
        helpers: {
            media: !0
        }
    });
    var s = $(".multi-carousel");
    s.on("jcarousel:createend jcarousel:reload", function() {
        var t = $(this),
            e = t.innerWidth(),
            i = $(".multi-carousel li").length;
        2 === i ? e /= 2 : 1 === i ? e = t.innerWidth() : e > 400 ? e /= 3 : e > 300 ? e /= 2 : e = t.innerWidth(), t.jcarousel("items").each(function() {
            $(this).css({
                width: e + "px"
            })
        }), i > 1 ? ($(".jcarousel-control-prev").jcarouselControl({
            target: "-=1"
        }), $(".jcarousel-control-next").jcarouselControl({
            target: "+=1"
        }), $(".jcarousel-pagination").on("jcarouselpagination:active", "a", function() {
            $(this).addClass("active")
        }).on("jcarouselpagination:inactive", "a", function() {
            $(this).removeClass("active")
        }).on("click", function(t) {
            t.preventDefault()
        }).jcarouselPagination({
            perPage: 1,
            item: function(t) {
                return '<a href="#' + t + '">' + t + "</a>"
            }
        })) : $(".jcarousel-pagination,.jcarousel-control-prev,.jcarousel-control-next").remove()
    }), s.on("jcarousel:createend jcarousel:reloadend", function() {
        t()
    }), s.jcarousel({
        wrap: "circular",
        animation: "fast"
    }), $(".fade-in-on-page-loaded").fadeIn().addClass("in"), $(".multi-carousel").jcarousel("reload"), $(window).load(function() {
        $(".multi-carousel").jcarousel("reload")
    });
    var r = {
        duration: 500,
        start_top: 200,
        btn: $(".go-top:first")
    };
    $(document).scroll(function() {
        var t = $(window).scrollTop();
        t > r.start_top ? r.btn.removeClass("hide").fadeIn(r.duration) : r.btn.fadeOut(r.duration)
    });
    var a = $(".float-sidebar"),
        l = $(".selected-table-wrapper"),
        c = $("footer").offset().top;
    a.length > 0 ? (a.addClass("animated fadeInUp").show(), $(document).scroll(function() {
        var t, e, n, o = i.width();
        o >= 768 && o <= 1600 ? (t = a.offset().top, c <= t ? (a.addClass("animated fadeOutDown").removeClass("fadeInUp"), $(".selected-table-wrapper").addClass("animated fadeOutDown").removeClass("fadeInUp")) : (a.addClass("animated fadeInUp").removeClass("fadeOutDown"), l.find("tbody tr").length > 1 && $(".selected-table-wrapper").addClass("animated fadeInUp").removeClass("fadeOutDown"))) : o < 768 && (e = $(window).scrollTop(), t = a.offset().top, c = $("footer").offset().top, n = $("#job-detail").offset().top, c >= t && e >= n ? a.hasClass("in") || a.stop().addClass("in").slideDown().promise().done(function() {
            $("#suggested-job-carousel").jcarousel("reload")
        }) : a.slideUp().removeClass("in"))
    })) : l.length > 0 && (l.addClass("no-suggested-job"), $(document).scroll(function() {
        var t, e = i.width();
        e >= 768 && e <= 1600 && (t = l.offset().top, c = $("footer").offset().top, c <= t ? l.find("tbody tr").length > 1 && l.addClass("anmiated fadeOutDown").removeClass("fadeInUp") : l.addClass("animated fadeInUp").removeClass("fadeOutDown"))
    }))
}), $('[data-toggle="popover"]').each(function() {
    $(this).popover({
        container: this,
        delay: 200
    })
}), $(function() {
    if ($(".initial").length) {
        var t, e = $(".job-header-info").find(".company-name").text().trim(),
            i = e.substring(0, 1).toUpperCase();
        $(".no-company-logo, .with-company-logo").attr("data-target-value", "false"), t = $.inArray(i, ["A", "B", "C", "D"]) > -1 ? "#00b9f2" : $.inArray(i, ["E", "F", "G"]) > -1 ? "#0085bb" : $.inArray(i, ["H", "I", "J", "K"]) > -1 ? "#ba6000" : $.inArray(i, ["L", "M", "N"]) > -1 ? "#ff9900" : $.inArray(i, ["O", "P", "Q", "R"]) > -1 ? "#20832a" : $.inArray(i, ["S", "T", "U"]) > -1 ? "#5cb85c" : "#c9c9c9", $(".initial").css({
            "background-color": t
        }).text(i)
    }
}), $(document).ready(function() {
    var t = new Language(lang);
    $("input#resumeFile").bind("change", function(e) {
        e.preventDefault();
        var i = 2,
            n = ["pdf", "doc", "docx", "png", "jpg"],
            o = $(this).val(),
            s = o.split("\\").pop(),
            r = o.split(".").pop().toLowerCase(),
            a = this.files[0].size / 1024 / 1024,
            l = $(this).closest(".resume-upload-cv").find(".progress-bar-status"),
            c = $(this).closest(".group-file-upload").find('input[type="text"]');
        0 != this.files.length ? (l.html("").hide(), n.indexOf(r) != -1 && a <= i ? (c.attr("placeholder", s), $("#applySendProcessBtn").attr("onClick", "return workerUpdaloadCv()"), c.css("box-shadow", "")) : (c.css("box-shadow", "0 0 6px rgba(255, 3, 3, 0.9"), l.html('<span id="errorAppSystem" class="error-message">' + t.getStr("required_file") + "</span>").show())) : l.html('<span id="errorAppSystem" class="error-message">' + t.getStr("required_file") + " </span>").show()
    })
}), $(document).on("click", ".btn-refer", function() {
    checkValidFormJobReferral() && $("#jobReferralFrm").submit()
}), $(function() {
    $(".popover-refer").each(function() {
        var t = $(this);
        t.popover({
            html: !0,
            trigger: "manual",
            content: '<form id="jobReferralFrm" onsubmit="return submitJobReferralFrm();" name="jobReferralFrm" method="post" action="#"><input type="hidden" name="jobId" value="' + t.attr("data-jobid") + '"/><div class="form-group"><input class="form-control" name="emailJR" type="text" placeholder="Email" /><div id="errEmailJR" hidden="hidden" class="error-message">' + t.attr("lerrEmailJR") + '</div><div id="errValidEmailJR" hidden="hidden" class="error-message">' + t.attr("lerrValidEmailJR") + '</div></div><div class="form-group pull-right"><button type="button" class="btn btn-sm btn-primary btn-refer">' + t.attr("lrefer") + '</button></div></form><button type="button" class="close close-refer-popover" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
            placement: "bottom",
            container: t
        });
        var e, i, n = !1;
        t.on("mouseenter", function() {
            clearTimeout(i), 0 == n && (e = setTimeout(function() {
                t.popover("show"), n = !0
            }, 400))
        }).on("mouseleave", function() {
            clearTimeout(e), i = setTimeout(function() {
                var e;
                t.find("input[name=emailJR]").each(function() {
                    if ("" == !$(this).val().trim()) return e = !0, !1
                }), e || (t.popover("hide"), n = !1)
            }, 400)
        })
    }), $(document).on("click", ".close-refer-popover", function() {
        $(this).parents(".popover-refer").popover("hide")
    })
}), $(function() {
    language = $("html").attr("lang"), "vi" == language ? language = 1 : language = 2, $("#keywordCompanySearch,#keywordMainSearch").each(function() {
        $(this).data("this-value", $(this).val())
    });
    var t = 0,
        e = $(".job-typeahead"),
        i = $("#keywordMainSearch"),
        n = function(t, i) {
            $.ajax({
                url: "/jobseekers/job_title_auto_completed_ajax.php",
                type: "POST",
                dataType: "JSON",
                data: {
                    query: t,
                    lang: language
                },
                success: function(t) {
                    var n = [],
                        o = [];
                    void 0 != t.jobTitle && $.each(t.jobTitle, function(t, e) {
                        t < 20 && n.push({
                            value: {
                                id: "",
                                jobTitle: e,
                                alias: "",
                                city: "",
                                companyId: "",
                                companyLogoURL: "",
                                isSalaryVisible: !1,
                                salaryMax: 0,
                                salaryMin: 0
                            }
                        })
                    }), void 0 != t.job ? ($.each(t.job, function(t, e) {
                        t < 5 && o.push({
                            value: {
                                id: e.jobId,
                                jobTitle: e.jobTitle,
                                alias: e.jobAlias,
                                city: e.jobLocation,
                                companyId: e.companyId,
                                companyLogoURL: e.companyLogoURL,
                                isSalaryVisible: e.isSalaryVisible,
                                salaryMax: e.salaryMax,
                                salaryMin: e.salaryMin,
                                salary: e.salary,
                                url: "/" + e.jobAlias + "-" + e.jobId + "-jd"
                            }
                        })
                    }), t.job.length > 5 ? c.show() : c.hide()) : c.hide(), i(n), e.data("suggestions", o).trigger("suggestion.received")
                }
            })
        },
        o = function(i, n) {
            e.on("suggestion.received", function() {
                var i = e.data("suggestions");
                t = i.length, n(i)
            })
        },
        s = "Keywords",
        r = "Top",
        a = "Matching Jobs",
        l = "View all";
    "1" == language && (s = "Từ khoá", r = "", a = "Công Việc Phù Hợp Nhất", l = "Xem tất cả"), i.typeahead({
        hint: !1,
        highlight: !0,
        minLength: 1,
        maxLength: 20
    }, {
        name: "keywords",
        display: function(t) {
            return t.value.jobTitle
        },
        source: n,
        templates: {
            suggestion: function(t) {
                return '<div class="matched-keyword">' + t.value.jobTitle + "</div>"
            }
        }
    }, {
        name: "jobTitle",
        source: o,
        templates: {
            suggestion: function(t) {
                var e = '<img class="img-responsive company-logo-placeholder" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAABICAMAAADcZRsoAAAAM1BMVEXe3t7////Z2dnb29v8/PzY2Njg4ODl5eXi4uLv7+/6+vr39/fs7Ozz8/Pn5+fx8fHp6emIWecFAAAAAXRSTlP+GuMHfQAAAgJJREFUWMPt2etuo0AMBWDvXGzPhYH3f9qtte1OW+ZQSCFSVc7fRP44wUwihdjT9fFMFJ4RenH+XJ/buZ3b+TVOyPlyJyQh/xJJ4UonkX8L1XCVk9m/D+drnEz+Y6hc4QT2n0P5Aqf5deR8p/hRptOdNnTkdMePE052CnCmk50ZOOlkJwGn/lDnWZ9bBk45e695yNBDz08p+LU6dJZHnNnRvHlarzM8SKdtJzli1nxk4+qQ8ZtOUo7RCSf0Btl3uiXmLacJRediZNGyE9LRsIUpYieIuugs0alHlerXO9DUR9cdyJjEgu5SkV6mDOeIzUHOxBr/M1ZJqKK1S01ZWsrDF1VsDnIm5n9Kl0i5HP/uYPtUoDOvGKukVgkHXi50qlBnvlEpGYOdxkPGKjEt+5lqc7DTbEFAIglPePJ6n6GTFTD9LrWwQ8lqDHSK184AaU+lzHa50JmIodIl5ha+3Gebg5y+INuQF9qslOxygdMXZI+kLGGbwc4ifsXgSgq/AatSdNAJogMGQ5FV8ogRMQY5eJ9xJeE0YGwOdIpKRAyWiD9XymJzoDOzYGX7qf1QaUJzzOkL8oDEqr3SbHOwk/btMzxb0xtjc7DTBDN7JHqttKi1gY6CE+3IXbKfba/PBXQYMMcqSf/dApxDCr5LPH4uuuNOy+3czu1YbufXOU/6X/Mvk6Y0mMmj9FwAAAAASUVORK5CYII="/>',
                    i = "",
                    n = "",
                    o = "";
                return t.value.companyLogoURL && (e = '<img class="img-responsive" src="' + t.value.companyLogoURL + '" />'), t.value.jobTitle && (n = '<p class="text-clip suggest-job-title">' + t.value.jobTitle + "</p>"), t.value.city && (o = '<span class="gray-light text-clip suggest-location">' + t.value.city + "</span>"), i = 1 == t.value.isSalaryVisible ? '<span class="gray-light text-clip suggest-salary">' + t.value.salary + "</span>" : '<span class="gray-light text-clip suggest-salary">Negotiable</span>', '<div class="row real-time-job">                                             <div class="col-xs-4 col-sm-2 suggestion-logo">' + e + '</div>                                             <div class="col-xs-8 col-sm-10"><div>' + n + "<br/> " + o + i + "</div></div></div>"
            }
        },
        display: function(t) {
            return t.value.jobTitle
        }
    }).siblings(".tt-dropdown-menu").append("<a class='view-all' href='#' hidden> " + l + " </a>"), i.on("typeahead:selected", function(t, e, i) {
        "keywords" !== i && window.open(e.value.url + "/?sb=yes", "_self"), $(this).data("this-value", $(this).val())
    });
    var c = i.closest(".keyword-search").find(".tt-dropdown-menu").find(".view-all");
    i.on("keyup", function() {
        var t = "";
        t = "en" === $("html").attr("lang") ? "/" + $.trim($(this).val()).split(/\s+/).join("-") + "-kw/?service_code=sb&sb=yes" : "/" + $.trim($(this).val()).split(/\s+/).join("-") + "-kv/?service_code=sb&sb=yes", c.attr("href", t)
    }), $("#keywordMainSearch, #keywordCompanySearch").keyup(function() {
        $(this).data("this-value", $(this).val())
    }).blur(function() {
        $(this).typeahead("val", $(this).data("this-value"))
    }), $(".job-typeahead").focus(function() {
        var t = $.Event("keydown");
        t.keyCode = t.which = 40, $(this).trigger(t)
    });
    var u = function(t, e) {
        $.ajax({
            url: "/jobseekers/company_auto_completed_ajax.php",
            type: "POST",
            dataType: "JSON",
            data: {
                query: t
            },
            success: function(t) {
                var i = [];
                $.each(t, function(t, e) {
                    t < 10 && i.push({
                        value: {
                            id: e.companyId,
                            name: e.companyName,
                            logo: e.companyLogoURL,
                            location: e.address
                        }
                    })
                }), e(i)
            }
        })
    };
    $("#keywordCompanySearch").typeahead({
        hint: !0,
        highlight: !0,
        minLength: 1,
        maxLength: 10
    }, {
        name: "companies",
        source: u,
        templates: {
            suggestion: function(t) {
                var e = '<img class="img-responsive company-logo-placeholder" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGcAAABICAMAAADcZRsoAAAAM1BMVEXe3t7////Z2dnb29v8/PzY2Njg4ODl5eXi4uLv7+/6+vr39/fs7Ozz8/Pn5+fx8fHp6emIWecFAAAAAXRSTlP+GuMHfQAAAgJJREFUWMPt2etuo0AMBWDvXGzPhYH3f9qtte1OW+ZQSCFSVc7fRP44wUwihdjT9fFMFJ4RenH+XJ/buZ3b+TVOyPlyJyQh/xJJ4UonkX8L1XCVk9m/D+drnEz+Y6hc4QT2n0P5Aqf5deR8p/hRptOdNnTkdMePE052CnCmk50ZOOlkJwGn/lDnWZ9bBk45e695yNBDz08p+LU6dJZHnNnRvHlarzM8SKdtJzli1nxk4+qQ8ZtOUo7RCSf0Btl3uiXmLacJRediZNGyE9LRsIUpYieIuugs0alHlerXO9DUR9cdyJjEgu5SkV6mDOeIzUHOxBr/M1ZJqKK1S01ZWsrDF1VsDnIm5n9Kl0i5HP/uYPtUoDOvGKukVgkHXi50qlBnvlEpGYOdxkPGKjEt+5lqc7DTbEFAIglPePJ6n6GTFTD9LrWwQ8lqDHSK184AaU+lzHa50JmIodIl5ha+3Gebg5y+INuQF9qslOxygdMXZI+kLGGbwc4ifsXgSgq/AatSdNAJogMGQ5FV8ogRMQY5eJ9xJeE0YGwOdIpKRAyWiD9XymJzoDOzYGX7qf1QaUJzzOkL8oDEqr3SbHOwk/btMzxb0xtjc7DTBDN7JHqttKi1gY6CE+3IXbKfba/PBXQYMMcqSf/dApxDCr5LPH4uuuNOy+3czu1YbufXOU/6X/Mvk6Y0mMmj9FwAAAAASUVORK5CYII="/>',
                    i = "",
                    n = " m-t-sm";
                return t.value.logo && (e = '<img class="img-responsive" src="' + t.value.logo + '" />'), t.value.location && (i = '<br/> <p class="gray-light text-clip">' + t.value.location + "</p>", n = ""), '<div class="row">                                             <div class="col-xs-4 col-sm-2 suggestion-logo">' + e + '</div>                                             <div class="col-xs-8 col-sm-10 ' + n + '">                                                <p class="text-clip"><strong>' + t.value.name + "</strong></p>" + i + "                                            </div>                                         </div>";
            }
        },
        display: function(t) {
            return t.value.name
        }
    }).on("typeahead:selected", function(t, e) {
        $("#companyName").val(e.value.name), $("#companyId").val(e.value.id), $(this).data("this-value", $(this).val())
    }), $('a[data-toggle="tab"]').on("shown.bs.tab", function(t) {
        "jobs-tab" == t.target.id ? i.focus() : "companies-tab" == t.target.id && $("#keywordCompanySearch").focus()
    }), $("#keywordMainSearch, #salaryMinMainSearch, .job-typeahead.tt-input, .company-typeahead.tt-input").keyup(function(t) {
        13 === t.keyCode && searchPremiumJob(0), 27 === t.keyCode && $(this).blur()
    });
    var h = $(document).width() < 768,
        d = "" === $.trim(i.val());
    !h && d && i.focus()
});
var busy = !1,
    Search = {
        init: function() {
            this.search_skill(), this.search_location(), this.search_salary(), this.pagination()
        },
        search_skill: function() {
            if (Search.exists("#categories")) {
                var t = base_url + "/ajax-search/?",
                    e = Search.get_param();
                $(".checkbox-skill").on("change", function() {
                    var i = $(this).val(),
                        n = "undefined" != typeof e.sid ? e.sid.split(",") : [];
                    if ($(this).is(":checked")) Search.isEmpty(e.sid) ? e.sid = i : n.indexOf(i) < 0 && (e.sid += e.sid.length > 0 ? "," + i : e.sid);
                    else {
                        var o = n.indexOf(i);
                        o >= 0 && (n.splice(o, 1), e.sid = n.join())
                    }
                    var s = decodeURIComponent(jQuery.param(e));
                    window.history.replaceState({}, "", base_url + "/search/?" + s), Search.exec_request(t + s, "filter"), Search.display_clear_filter(), Search.refreshPaginator(), Search.updateFormAlert()
                })
            }
        },
        search_salary: function() {
            if (Search.exists("#salaryRange")) {
                var t = base_url + "/ajax-search/?",
                    e = Search.get_param();
                $(".rd-salary").on("change", function() {
                    var i = $(this).val();
                    e.salary = i;
                    var n = decodeURIComponent(jQuery.param(e));
                    window.history.replaceState({}, "", base_url + "/search/?" + n), Search.exec_request(t + n, "filter"), Search.display_clear_filter(), Search.refreshPaginator(), Search.updateFormAlert()
                })
            }
        },
        search_location: function() {
            if (Search.exists("#locations")) {
                var t = base_url + "/ajax-search/?",
                    e = Search.get_param();
                $(".checkbox-location").on("change", function() {
                    var i = $(this).val(),
                        n = "undefined" != typeof e.cid ? e.cid.split(",") : [];
                    if ($(this).is(":checked")) Search.isEmpty(e.cid) ? e.cid = i : n.indexOf(i) < 0 && (e.cid += e.cid.length > 0 ? "," + i : e.cid);
                    else {
                        var o = n.indexOf(i);
                        o >= 0 && (n.splice(o, 1), e.cid = n.join())
                    }
                    var s = decodeURIComponent(jQuery.param(e));
                    window.history.replaceState({}, "", base_url + "/search/?" + s), Search.exec_request(t + s, "filter"), Search.display_clear_filter(), Search.refreshPaginator(), Search.updateFormAlert()
                })
            }
        },
        pagination: function() {
            $(window).scroll(function() {
                var t = base_url + "/ajax-search/?",
                    e = Search.get_param();
                if ($(window).scrollTop() + $(window).height() > $("#job-list").height() - 200 && !busy) {
                    busy = !0;
                    var i = $(".job-list").attr("data-page"),
                        n = $(".job-list").attr("data-uid");
                    "undefined" != typeof n && (e.uid = n), e.page = parseInt(i) + 1;
                    var o = decodeURIComponent(jQuery.param(e));
                    $(".job-list").attr("data-page", e.page), setTimeout(function() {
                        Search.exec_request(t + o, "search")
                    }, 500)
                }
            })
        },
        display_clear_filter: function() {
            var t = this.get_param();
            Search.isEmpty(t.sid) && Search.isEmpty(t.cid) && Search.isEmpty(t.q) ? $("#current-refined-values").hide() : $("#current-refined-values").show()
        },
        get_param: function(t) {
            var e, i = /\+/g,
                n = /([^&=]+)=?([^&]*)/g,
                o = function(t) {
                    return decodeURIComponent(t.replace(i, " "))
                },
                s = window.location.search.substring(1);
            for (urlParams = {}; e = n.exec(s);) urlParams[o(e[1])] = o(e[2]);
            return "undefined" != typeof urlParams[t] ? urlParams[t] : urlParams
        },
        exec_request: function(t, e) {
            var i = $("#job-list");
            jQuery.ajax({
                url: t,
                headers: {
                    "X-CSRF-TOKEN": $('meta[name="_token"]').attr("content")
                },
                type: "GET",
                dataType: "json",
                beforeSend: function() {
                    "filter" == e || $(".loading-bar").show()
                },
                success: function(t) {
                    200 == t.status && ("undefined" != typeof t.data.items && (Search.render_view(i, t.data, e), busy = !1), $(".loading-bar").hide())
                }
            })
        },
        render_view: function(t, e, i) {
            var n = new Language(lang);
            if ($(".ais-stats--body").find(".text-primary").html(e.total), "filter" == i && e.total <= 0) {
                var o = '<div id="no-results-message"><h2 class="text-center text-lg">' + n.getStr("not_found_job") + "</h2></div>";
                return void t.html(o)
            }
            var s = this.render_item(e.items);
            "filter" == i ? t.html(s).fadeIn(500) : t.append(s).fadeIn(500)
        },
        render_item: function(t) {
            for (var e = new Language(lang), i = "", n = 0, o = Search.get_param(), s = Object.keys(t).length, r = 0; r < s; r++) {
                n++;
                var a = t[r],
                    l = "";
                l = a.isTop ? '<div class="box-top-level clearfix">' : '<div class="job-normal clearfix">', l += '<div class="job-item"><div class="relative "><div class="row">';
                var c = '<div class="col-xs-3 col-sm-4 col-md-3"><div class="logo">';
                c += '<a target="_blank" href="' + a.link_job + '" title="' + a.title + '">', c += '<img title="' + a.title + '" class="img-responsive" src="' + a.logo + '"></a>', c += "</div></div>";
                var u = '<div class="col-xs-9 col-sm-7 col-md-8"><div class="job-item-info relative">';
                u += a.isBoldRed ? '<h3 class="bold-red">' : "<h3>", u += '<a href="' + a.link + '" class="job-title" target="_blank">' + a.title + "</a>", a.isNew && (u += '<span class="new-tag">(New)</span>'), u += "</h3>", u += '<div class="company"> ' + a.company_name + "</div>", u += '<div class="extra-info location text-clip">', u += '<span class="circle-xs border"><i class="fa fa-fw fa-1x fa-map-marker"></i></span> ', u += a.location + "</a></div>", u += '<div class="extra-info salary">', u += '<span class="circle-xs border"><i class="fa fa-fw fa-dollar"></i></span>', u += '<a href="#"> ' + a.salary + "</a></div>", u += '<div class="posted"><small> ' + e.getStr("updated") + ": " + a.date_updated + "</small></div>", u += '<div class="extra-info visible-xs">', u += '<div class="item-icon" onclick="jobAlert.onClick2(this);" data-sid="' + a.skill_ids + '" data-cid="' + a.city_ids + '">', u += '<span class="fa-stack fa-1x">', u += '<i class="fa fa-circle fa-stack-2x fa-gray"></i> <i class="fa fa-envelope fa-stack-1x"></i>', u += "</span>" + e.getStr("email_me_similar_jobs") + "</div>", u += "</div>", u += "</div></div>";
                var h = '<div class="col-xs-1 col-sm-1 col-md-1 hidden-xs">';
                h += '<div class="item-icon">', h += '<span class="fa-stack fa-1x tooltips" onclick="jobAlert.onClick2(this);" data-sid="' + a.skill_ids + '" data-cid="' + a.city_ids + '" data-title="' + e.getStr("email_me_similar_jobs") + '">', h += '<i class="fa fa-circle fa-stack-2x fa-gray"></i> <i class="fa fa-envelope fa-stack-1x"></i>', h += "</span>", h += "</div>", h += "</div>", l += c + u + h + "</div></div></div></div>", n % 10 == 0 && (l += '<div class="job-alert-search" hidden="" style="display: block;"><div class="job-alert-title"><h2>' + e.getStr("job_alert_title") + '</h2></div><form action="" method="post" role="form" onsubmit="return jobAlert.modal(this);"><input type="hidden" name="skill_ids" value="' + o.sid + '"><input type="hidden" name="location" value="' + o.cid + '"><div class="form-group hidden-xs"><div class="col-sm-1 col-sm-offset-1"><img class="pull-left" src="/assets/img/icon-email.png" width="39" alt=""></div><div class="col-sm-5"><input type="text" class="form-control" name="email" id="email" placeholder="example@gmail.com"></div><div class="col-sm-4"><button type="submit" name="action" class="btn btn-primary">' + e.getStr("btn_job_alert") + '</button></div></div></form><form action="" method="post" role="form" onsubmit="return jobAlert.modal(this);"><input type="hidden" name="skill_ids" value="' + o.sid + '"><input type="hidden" name="location" value="' + o.cid + '"><div class="col-lg-12 visible-xs" style="padding: 10px 20px 0 20px;"><div class="form-group"><input type="text" class="form-control" name="email" id="email" placeholder="example@gmail.com"></div><div class="form-group"><button type="submit" name="action" class="btn btn-primary col-xs-12">' + e.getStr("btn_job_alert") + "</button></div></div></form></div>"), i += l
            }
            return i
        },
        refreshPaginator: function() {
            busy = !1, $(".job-list").attr("data-page", 1)
        },
        updateFormAlert: function() {
            var t = Search.get_param();
            if ("undefined" != typeof t.cid) {
                var e = t.cid.split(",");
                $.each(e, function(t, e) {
                    $('#new-job-alert select[name="location"]').val(e).trigger("change")
                })
            }
            if ("undefined" != typeof t.sid) {
                var i = t.sid.split(",");
                $.each(i, function(t, e) {
                    $('#new-job-alert select[name="skill_ids[]"]').find('option[value="' + e + '"]').attr("selected", !0).trigger("change")
                })
            }
            $(".job-alert-banner").find("#skill_ids").val(t.sid), $(".job-alert-banner").find("#location").val(t.cid)
        },
        isEmpty: function(t) {
            return "undefined" == typeof t || 0 == t.length
        },
        exists: function(t) {
            return jQuery(t).length > 0
        }
    };
jQuery(function() {
    Search.init()
});
var ads_url = "http://localhost/Shipcom/",
    HeroBanner = {
        initCarousel: function() {
            var t = jQuery(".hero-carousel"),
                e = jQuery(".hero-carousel__pagination"),
                i = t.jcarousel({
                    wrap: "circular",
                    transitions: !0
                }),
                n = t.jcarousel("items").length;
            1 === n && e.addClass("hidden"), e.on("jcarouselpagination:active", "a", function() {
                jQuery(this).addClass("active")
            }).on("jcarouselpagination:inactive", "a", function() {
                jQuery(this).removeClass("active")
            }).jcarouselPagination({
                carousel: i
            }), t.addClass("hero-carousel_loaded")
        },
        setHeroBannerItemWidth: function() {
            var t = $(window).width();
            jQuery(".hero-banner-item").width(t)
        },
        autoScroll: function(t) {
            var e, i;
            i = function() {
                jQuery(".hero-carousel").jcarousel("scroll", "+=1")
            }, e = setInterval(function() {
                i()
            }, t), jQuery(".hero-carousel__pagination").on("click", "a", function() {
                clearInterval(e), e = setInterval(function() {
                    i()
                }, t)
            })
        },
        setHeroBannerBg: function() {
            jQuery(".hero-banner-item").each(function() {
                var t = encodeURI(jQuery(this).find("img").attr("src"));
                jQuery(this).css({
                    "background-image": "url(" + t + ")",
                    "background-size": "cover"
                }).fadeTo(1e3, 1)
            })
        },
        initBanner: function() {
            HeroBanner.initCarousel(), HeroBanner.setHeroBannerBg(), HeroBanner.setHeroBannerItemWidth(), HeroBanner.resizeWindow()
        },
        resizeWindow: function() {
            jQuery(window).resize(function() {
                HeroBanner.setHeroBannerItemWidth()
            })
        },
        exec_request: function() {
            var t = ads_url + "td&g&cFU0SkZyZmNoeTA9&10",
                e = jQuery(".hero-banner-list");
            jQuery.ajax({
                url: t,
                success: function(t) {
                    200 == t.code && (HeroBanner.render_ads(e, t.data.result), HeroBanner.initBanner(), t.data.result.length > 1 && HeroBanner.autoScroll(t.data.rotate_time))
                }
            })
        },
        render_ads: function(t, e) {
            var i = e.length;
            if (!(i <= 0)) {
                for (var n = "", o = 0; o < i; o++) {
                    var s = e[o],
                        r = '<div class="hero-banner-item" style="width: 1440px; background-size: cover;">',
                        a = '<div class="hero-banner-item__overlay"></div>';
                    a += '<img src="' + s.imageURL + '" alt="" class="img-responsive" style="opacity: 0;">',
                            /*' + s.imageURL + '  */ 
                     /* a += '<a class="hot-corner hidden-xs" target="_blank" href="#">',/* ' + s.destinationURL + ' 
                     
                      /*a += '<div class="col-sm-4 hot-corner__logo">',
                       a += '<img class="img-responsive" src="#" alt=""> </div>',/* ' + s.subimageURL + '
                      
                      
                       //a += '<div class="col-sm-8">',
                        /*a += '<div class="hot-corner__description no-break-out">' + s.textLine1 + "</div>",
                        a += '<div class="hot-corner__description no-break-out">' + s.textLine2 + "</div>",
                        a += '<div class="hot-corner__view-link">',
                        
                        //a += "</a>",//</div></div> hai the dung truoc the </a>
                        //a += '<img src="' + s.linkTracking + '" style="width: 1px;opacity: 0;margin: 0;padding: 0;display: inline-block;height: 1px;border: none;">',
                         */
			r += a + "</div>",
                          n += r
                }
                t.html(n)
            }
        },
        exists: function() {
            return jQuery(".hero-carousel").length > 0
        }
    },
    VipLogo = {
        exec_request: function() {
            var t = ads_url + "td&g&c1VVS29KVFVIaWc9&12",
                e = jQuery("#ads_TOP_COMPANIES_HORISONTAL");
            VipLogo.display_animation(e, !0), jQuery.ajax({
                url: t,
                success: function(t) {
                    VipLogo.display_animation(e, !1), 200 == t.code && VipLogo.render_ads(e, t.data.result)
                }
            })
        },
        display_animation: function(t, e) {
            if (!e) return void t.empty();
            var i = '<div class="text-center m-t-md m-b-md"><i class="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i></div>';
            t.html(i)
        },
        render_ads: function(t, e) {
            var i = e.length;
            if (!(i <= 0)) {
                for (var n = '<div id="adc_TOP_COMPANIES_HORISONTAL">', o = 0; o < i; o++) {
                    var s = e[o],
                        r = '<div class="col-md-2 col-sm-2 col-xs-4">';
                    r += '<a class="single-ad" target="_blank" href="' + s.destinationURL + '">',
					r += '<img class="salesLogoImage" src="' + s.imageURL + '" width="88" height="43">',
					r += '<span class="ad-slogan">' + s.textLine1 + "</span></a></div>", 
					r += '<img src="' + s.linkTracking + '" style="width: 1px;opacity: 0;margin: 0;padding: 0;display: inline-block;height: 1px;border: none;">',
					n += r
                }
                n += "</div>", t.html(n)
            }
        },
        exists: function() {
            return jQuery("#ads_TOP_COMPANIES_HORISONTAL").length > 0
        }
    },
    TopCompanies = {
        exec_request: function() {
            var t = ads_url + "td&g&b1FUNlhKNm9GMWs9&16",
                e = jQuery("#ads_TOP_COMPANIES");
            TopCompanies.display_animation(e, !0), jQuery.ajax({
                url: t,
                success: function(t) {
                    TopCompanies.display_animation(e, !1), 200 == t.code && TopCompanies.render_ads(e, t.data.result)
                }
            })
        },
        display_animation: function(t, e) {
            if (!e) return void t.empty();
            var i = '<div class="text-center m-t-md m-b-md"><i class="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i></div>';
            t.html(i)
        },
        render_ads: function(t, e) {
            var i = e.length;
            if (!(i <= 0)) {
                for (var n = '<div id="adc_TOP_COMPANIES">', o = 0; o < i; o++) {
                    var s = e[o],
                        r = "";
						r += '<a class="cusLogo" target="_blank" href="' + s.destinationURL + '">', 
						r += '<img class="salesLogoImage img-responsive" src="' + s.imageURL + '" width="88" height="43">', 
						r += "</a>", 
						r += '<img src="' + s.linkTracking + '" style="width: 1px;opacity: 0;margin: 0;padding: 0;display: inline-block;height: 1px;border: none;">',
						n += r
                }
                n += "</div>", t.html(n)
            }
        },
        exists: function() {
            return jQuery("#ads_TOP_COMPANIES").length > 0
        }
    },
    Square1 = {
        rotateSquareBanner: function(t, e) {
            t.each(function() {
                var t = $(this),
                    i = $(this).find("a:first");
                setInterval(function() {
                    var e = t.find("a:visible"),
                        n = e.next("a");
                    e.hide().promise().done(function() {
                        n.length > 0 ? n.css("display", "block") : i.css("display", "block")
                    })
                }, e)
            })
        },
        exec_request: function() {
            var t = ads_url + "td&g&ZVRPRWVDZi9pTlU9&4",
                e = jQuery("#ads_square");
            jQuery.ajax({
                url: t,
                success: function(t) {
                    200 == t.code && Square1.render_ads(e, t.data.result)
                }
            })
        },
        display_animation: function(t, e) {
            if (!e) return void t.empty();
            var i = '<div class="text-center m-t-md m-b-md"><i class="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"></i></div>';
            t.html(i)
        },
        render_ads: function(t, e) {
            var i = e.length;
            if (!(i <= 0)) {
                for (var n = "", o = 0; o < i; o++) {
                    var s = e[o],
                        r = '<div class="col-md-3 col-sm-3 col-xs-6 b-item" align="center" border="0" cellpadding="0" cellspacing="0">';
                    r += '<a class="cusLogo" target="_blank" href="' + s.destinationURL + '">', r += '<img class="salesLogoImage img-responsive" src="' + s.imageURL + '" width="234" height="234">', r += "</a>", r += '<img src="' + s.linkTracking + '" style="width: 1px;opacity: 0;margin: 0;padding: 0;display: inline-block;height: 1px;border: none;">', r += "</div>", n += r
                }
                n += "</div>", t.html(n)
            }
        },
        exists: function() {
            return jQuery("#ads_square").length > 0
        }
    },
    HomeBottom = {
        exec_request: function() {
            var t = ads_url + "td&g&UEoxbHZkSHdhdWc9&4",
                e = jQuery("#ads_home_bottom");
            jQuery.ajax({
                url: t,
                success: function(t) {
                    200 == t.code && HomeBottom.render_ads(e, t.data.result)
                }
            })
        },
        render_ads: function(t, e) {
            var i = e.length;
            if (!(i <= 0)) {
                for (var n = "<div>", o = 0; o < i; o++) {
                    var s = e[o];
                    if (i > 1) var r = '<div class="col-ads col-md-6 col-sm-6 col-xs-12" align="center">';
                    else var r = '<div class="col-ads col-md-12 col-sm-12 col-xs-12" align="center">';
                    r += '<a target="_blank" href="' + s.destinationURL + '">', r += '<img class="img-responsive" src="' + s.imageURL + '">', r += '<img src="' + s.linkTracking + '" style="width: 1px;opacity: 0;margin: 0;padding: 0;display: inline-block;height: 1px;border: none;"></a></div>', n += r
                }
                n += "</div>", t.html(n)
            }
        },
        exists: function() {
            return jQuery("#ads_home_bottom").length > 0
        }
    },
    JobsRight = {
        exec_request: function() {
            var t = ads_url + "td&g&U3U5d0xmNGVkUnc9&0",
                e = jQuery("#ads-jobs-right");
            jQuery.ajax({
                url: t,
                success: function(t) {
                    200 == t.code && JobsRight.render_ads(e, t.data.result)
                }
            })
        },
        render_ads: function(t, e) {
            var i = e.length;
            if (!(i <= 0)) {
                for (var n = "<div>", o = 0; o < i; o++) {
                    var s = e[o],
                        r = '<div class="col-md-12 col-sm-12 col-xs-12" align="center">';
                    r += '<a target="_blank" href="' + s.destinationURL + '">', r += '<img class="img-responsive" src="' + s.imageURL + '">', r += '<img src="' + s.linkTracking + '" style="width: 1px;opacity: 0;margin: 0;padding: 0;display: inline-block;height: 1px;border: none;"></a></div>', n += r
                }
                n += "</div>", t.html(n)
            }
        },
        exists: function() {
            return jQuery("#ads-jobs-right").length > 0
        }
    },
    DetailRight = {
        exec_request: function() {
            var t = ads_url + "td&g&R1pzTks1T1llMnc9&0",
                e = jQuery("#ads-detail-right");
            jQuery.ajax({
                url: t,
                success: function(t) {
                    200 == t.code && DetailRight.render_ads(e, t.data.result)
                }
            })
        },
        render_ads: function(t, e) {
            var i = e.length;
            if (!(i <= 0)) {
                for (var n = '<div class="box box-md">', o = 0; o < i; o++) {
                    var s = e[o],
                        r = '<div class="col-md-12 col-sm-12 col-xs-12" align="center">';
                    r += '<a target="_blank" href="' + s.destinationURL + '">', r += '<img class="img-responsive" src="' + s.imageURL + '">', r += '<img src="' + s.linkTracking + '" style="width: 1px;opacity: 0;margin: 0;padding: 0;display: inline-block;height: 1px;border: none;"></a></div>', n += r
                }
                n += "</div>", t.html(n)
            }
        },
        exists: function() {
            return jQuery("#ads-detail-right").length > 0
        }
    };
jQuery(function() {
    HeroBanner.exists() && HeroBanner.exec_request(), VipLogo.exists() && VipLogo.exec_request(), TopCompanies.exists() && TopCompanies.exec_request(), Square1.exists() && Square1.exec_request(), HomeBottom.exists() && HomeBottom.exec_request(), JobsRight.exists() && JobsRight.exec_request(), DetailRight.exists() && DetailRight.exec_request()
});
var jobAlert = {
    onClick: function() {
        $("#new-job-alert").modal("show")
    },
    onClick2: function(t) {
        var e = $(t).attr("data-sid"),
            i = $(t).attr("data-cid");
        if ($('#new-job-alert select[name="location"]').val("").trigger("change"), $('#new-job-alert select[name="skill_ids[]"]').val("").trigger("change"), "undefined" != typeof i) {
            var n = i.split(",");
            $.each(n, function(t, e) {
                $('#new-job-alert select[name="location"]').val(e).trigger("change")
            })
        }
        if ("undefined" != typeof e) {
            var o = e.split(",");
            $.each(o, function(t, e) {
                $('#new-job-alert select[name="skill_ids[]"]').find('option[value="' + e + '"]').attr("selected", !0).trigger("change")
            })
        }
        $("#new-job-alert").modal("show")
    },
    modal: function(t) {
        var e = new FormData(t);
        return jobAlert.execRequest(t, e), !1
    },
    execRequest: function(t, e) {
        var i = base_url + "/jalert",
            n = $('meta[name="csrf-token"]').attr("content"),
            o = new Language(lang);
        $.ajax({
            url: i,
            type: "POST",
            data: e,
            processData: !1,
            contentType: !1,
            headers: {
                "X-CSRF-TOKEN": n
            },
            beforeSend: function() {
                $(t).find("button[name='action']").prop("disabled", !0).html('<i class="fa fa-spinner fa-pulse fa-fw"></i> Loading...')
            },
            error: function(e) {
                var i = e.responseJSON;
                $.each(i, function(e, i) {
                    $("#" + e);
                    $(t).find(".form-group").addClass("has-error"), $(t).find(".form-group").find(".help-block").remove(), $(t).find("#" + e).after('<span class="help-block">' + i[0] + "</span>")
                }), $(t).find("button[name='action']").prop("disabled", !1).html(o.getStr("btn_job_alert"))
            },
            success: function(e) {
                var i = e;
                200 == i.code && ($("#new-job-alert").modal("hide"), swal({
                    title: "Confirmed!",
                    text: "Your preference is saved.<br/> We will email you when there are new jobs matched.",
                    type: "success",
                    html: !0
                })), $(t).find("button[name='action']").prop("disabled", !1).html(o.getStr("btn_job_alert"))
            }
        })
    }
};
$(document).ready(function() {
    $(".menu-toggler").click(function() {
        $("#modal-menu").modal("show")
    });
    new Language(lang);
    $(".btn-close-ja").click(function() {
        setTimeout(function() {
            $(".ja-popover").popover("show")
        }, 500), setTimeout(function() {
            $(".ja-popover").popover("hide")
        }, 5e3)
    }), $(document).click(function() {
        $(".ja-popover").popover("hide")
    }), $(".tooltips").tooltip(), $(".btn-filter").click(function() {
        $(".side-column").slideDown()
    }), $(".share-on").on("click", function(t) {
        $(this).sharePopup(t)
    }), $(".scrollbar").mCustomScrollbar({
        theme: "home-vnw",
        mouseWheelPixels: 300,
        scrollButtons: {
            enable: !0,
            scrollSpeed: "auto"
        },
        advanced: {
            updateOnBrowserResize: !0,
            updateOnContentResize: !0
        }
    }), $(".dropdown").hover(function() {
        $(".dropdown-menu", this).stop(!0, !0).fadeIn("fast"), $(this).toggleClass("open"), $("b", this).toggleClass("caret caret-up")
    }, function() {
        $(".dropdown-menu", this).stop(!0, !0).fadeOut("fast"), $(this).toggleClass("open"), $("b", this).toggleClass("caret caret-up")
    }), $(".btn-close-filter").on("click", function() {
        $(this).parents("#facets").slideUp()
    }), $("#maps").length > 0 && initMap(), $("#myModal2").length > 0 && $("#myModal2").modal("show"), $(".select2-classic").select2({
        width: "100%"
    }), $(".facet-title").on("click", function() {
        $(this).hasClass("open") ? ($(this).removeClass("open"), $(this).find(".fa-angle-right").removeClass("fa-angle-right").addClass("fa-angle-down"), $(this).parent().find(".ais-body").stop().slideDown()) : ($(this).addClass("open"), $(this).find(".fa-angle-down").removeClass("fa-angle-down").addClass("fa-angle-right"), $(this).parent().find(".ais-body").stop().slideUp())
    }), $(".com_show_more").on("click", function() {
        $(this).hasClass("less") ? ($(".des_short").hide(), $(".des_full").fadeIn()) : ($(".des_short").fadeIn(), $(".des_full").hide())
    }), $("#is_negotiable").change(function() {
        $(this).is(":checked") ? ($(this).parents(".form-group").find("#salary_min").prop("disabled", !0), $(this).parents(".form-group").find("#salary_max").prop("disabled", !0)) : ($(this).parents(".form-group").find("#salary_min").prop("disabled", !1), $(this).parents(".form-group").find("#salary_max").prop("disabled", !1))
    })
}), $.fn.sharePopup = function(t, e, i, n) {
    t.preventDefault(), e = e || "500", i = i || "400", strResize = n ? "yes" : "no";
    var o = "undefined" != typeof this.attr("title") ? this.attr("title") : "Social Share",
        s = "width=" + e + ",height=" + i + ",resizable=" + strResize;
    window.open(this.attr("data-href"), o, s).focus()
};




