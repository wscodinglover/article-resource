!(function (e) {
  function t(r) {
    if (n[r]) return n[r].exports;
    var i = (n[r] = {
      exports: {},
      id: r,
      loaded: !1,
    });
    return e[r].call(i.exports, i, i.exports, t), (i.loaded = !0), i.exports;
  }
  var n = {};
  return (t.m = e), (t.c = n), (t.p = ""), t(0);
})([
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    var i = n(1),
      o = r(i),
      a = n(4),
      u = n(8),
      l = n(41),
      s = r(l),
      f = n(80),
      c = r(f);
    n(52), n(152);
    var d = n(58);
    (0, d.subscribeRecord)(s.default),
      (0, a.render)(
        o.default.createElement(
          u.Provider,
          {
            store: s.default,
          },
          o.default.createElement(c.default, null)
        ),
        document.getElementById("root")
      );
    var p = function (e) {
      var t = e || window.event,
        n = t.target || t.srcElement;
      n.closest(".ad").remove();
    };
  },
  function (e, t, n) {
    "use strict";
    e.exports = n(2);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      for (
        var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
          n = 1;
        n < arguments.length;
        n++
      )
        t += "&args[]=" + encodeURIComponent(arguments[n]);
      return (
        "Minified React error #" +
        e +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    function i(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = j),
        (this.updater = n || N);
    }
    function o() {}
    function a(e, t, n) {
      (this.props = e),
        (this.context = t),
        (this.refs = j),
        (this.updater = n || N);
    }
    function u(e, t, n) {
      var r,
        i = {},
        o = null,
        a = null;
      if (null != t)
        for (r in (void 0 !== t.ref && (a = t.ref),
        void 0 !== t.key && (o = "" + t.key),
        t))
          B.call(t, r) && !D.hasOwnProperty(r) && (i[r] = t[r]);
      var u = arguments.length - 2;
      if (1 === u) i.children = n;
      else if (1 < u) {
        for (var l = Array(u), s = 0; s < u; s++) l[s] = arguments[s + 2];
        i.children = l;
      }
      if (e && e.defaultProps)
        for (r in (u = e.defaultProps)) void 0 === i[r] && (i[r] = u[r]);
      return {
        $$typeof: E,
        type: e,
        key: o,
        ref: a,
        props: i,
        _owner: U.current,
      };
    }
    function l(e, t) {
      return {
        $$typeof: E,
        type: e.type,
        key: t,
        ref: e.ref,
        props: e.props,
        _owner: e._owner,
      };
    }
    function s(e) {
      return "object" == typeof e && null !== e && e.$$typeof === E;
    }
    function f(e) {
      var t = {
        "=": "=0",
        ":": "=2",
      };
      return (
        "$" +
        ("" + e).replace(/[=:]/g, function (e) {
          return t[e];
        })
      );
    }
    function c(e, t, n, r) {
      if (q.length) {
        var i = q.pop();
        return (
          (i.result = e),
          (i.keyPrefix = t),
          (i.func = n),
          (i.context = r),
          (i.count = 0),
          i
        );
      }
      return {
        result: e,
        keyPrefix: t,
        func: n,
        context: r,
        count: 0,
      };
    }
    function d(e) {
      (e.result = null),
        (e.keyPrefix = null),
        (e.func = null),
        (e.context = null),
        (e.count = 0),
        10 > q.length && q.push(e);
    }
    function p(e, t, n, i) {
      var o = typeof e;
      ("undefined" !== o && "boolean" !== o) || (e = null);
      var a = !1;
      if (null === e) a = !0;
      else
        switch (o) {
          case "string":
          case "number":
            a = !0;
            break;
          case "object":
            switch (e.$$typeof) {
              case E:
              case S:
                a = !0;
            }
        }
      if (a) return n(i, e, "" === t ? "." + v(e, 0) : t), 1;
      if (((a = 0), (t = "" === t ? "." : t + ":"), Array.isArray(e)))
        for (var u = 0; u < e.length; u++) {
          o = e[u];
          var l = t + v(o, u);
          a += p(o, l, n, i);
        }
      else if (
        (null === e || "object" != typeof e
          ? (l = null)
          : ((l = (A && e[A]) || e["@@iterator"]),
            (l = "function" == typeof l ? l : null)),
        "function" == typeof l)
      )
        for (e = l.call(e), u = 0; !(o = e.next()).done; )
          (o = o.value), (l = t + v(o, u++)), (a += p(o, l, n, i));
      else if ("object" === o)
        throw (
          ((n = "" + e),
          Error(
            r(
              31,
              "[object Object]" === n
                ? "object with keys {" + Object.keys(e).join(", ") + "}"
                : n,
              ""
            )
          ))
        );
      return a;
    }
    function h(e, t, n) {
      return null == e ? 0 : p(e, "", t, n);
    }
    function v(e, t) {
      return "object" == typeof e && null !== e && null != e.key
        ? f(e.key)
        : t.toString(36);
    }
    function y(e, t) {
      e.func.call(e.context, t, e.count++);
    }
    function m(e, t, n) {
      var r = e.result,
        i = e.keyPrefix;
      (e = e.func.call(e.context, t, e.count++)),
        Array.isArray(e)
          ? g(e, r, n, function (e) {
              return e;
            })
          : null != e &&
            (s(e) &&
              (e = l(
                e,
                i +
                  (!e.key || (t && t.key === e.key)
                    ? ""
                    : ("" + e.key).replace(F, "$&/") + "/") +
                  n
              )),
            r.push(e));
    }
    function g(e, t, n, r, i) {
      var o = "";
      null != n && (o = ("" + n).replace(F, "$&/") + "/"),
        (t = c(t, o, r, i)),
        h(e, m, t),
        d(t);
    }
    function b() {
      var e = z.current;
      if (null === e) throw Error(r(321));
      return e;
    }
    var _ = n(3),
      w = "function" == typeof Symbol && Symbol.for,
      E = w ? Symbol.for("react.element") : 60103,
      S = w ? Symbol.for("react.portal") : 60106,
      k = w ? Symbol.for("react.fragment") : 60107,
      x = w ? Symbol.for("react.strict_mode") : 60108,
      T = w ? Symbol.for("react.profiler") : 60114,
      P = w ? Symbol.for("react.provider") : 60109,
      O = w ? Symbol.for("react.context") : 60110,
      C = w ? Symbol.for("react.forward_ref") : 60112,
      R = w ? Symbol.for("react.suspense") : 60113;
    w && Symbol.for("react.suspense_list");
    var I = w ? Symbol.for("react.memo") : 60115,
      M = w ? Symbol.for("react.lazy") : 60116;
    w && Symbol.for("react.fundamental"),
      w && Symbol.for("react.responder"),
      w && Symbol.for("react.scope");
    var A = "function" == typeof Symbol && Symbol.iterator,
      N = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      j = {};
    (i.prototype.isReactComponent = {}),
      (i.prototype.setState = function (e, t) {
        if ("object" != typeof e && "function" != typeof e && null != e)
          throw Error(r(85));
        this.updater.enqueueSetState(this, e, t, "setState");
      }),
      (i.prototype.forceUpdate = function (e) {
        this.updater.enqueueForceUpdate(this, e, "forceUpdate");
      }),
      (o.prototype = i.prototype);
    var L = (a.prototype = new o());
    (L.constructor = a), _(L, i.prototype), (L.isPureReactComponent = !0);
    var z = {
        current: null,
      },
      U = {
        current: null,
      },
      B = Object.prototype.hasOwnProperty,
      D = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0,
      },
      F = /\/+/g,
      q = [],
      Y = {
        Children: {
          map: function (e, t, n) {
            if (null == e) return e;
            var r = [];
            return g(e, r, null, t, n), r;
          },
          forEach: function (e, t, n) {
            return null == e
              ? e
              : ((t = c(null, null, t, n)), h(e, y, t), void d(t));
          },
          count: function (e) {
            return h(
              e,
              function () {
                return null;
              },
              null
            );
          },
          toArray: function (e) {
            var t = [];
            return (
              g(e, t, null, function (e) {
                return e;
              }),
              t
            );
          },
          only: function (e) {
            if (!s(e)) throw Error(r(143));
            return e;
          },
        },
        createRef: function () {
          return {
            current: null,
          };
        },
        Component: i,
        PureComponent: a,
        createContext: function (e, t) {
          return (
            void 0 === t && (t = null),
            (e = {
              $$typeof: O,
              _calculateChangedBits: t,
              _currentValue: e,
              _currentValue2: e,
              _threadCount: 0,
              Provider: null,
              Consumer: null,
            }),
            (e.Provider = {
              $$typeof: P,
              _context: e,
            }),
            (e.Consumer = e)
          );
        },
        forwardRef: function (e) {
          return {
            $$typeof: C,
            render: e,
          };
        },
        lazy: function (e) {
          return {
            $$typeof: M,
            _ctor: e,
            _status: -1,
            _result: null,
          };
        },
        memo: function (e, t) {
          return {
            $$typeof: I,
            type: e,
            compare: void 0 === t ? null : t,
          };
        },
        useCallback: function (e, t) {
          return b().useCallback(e, t);
        },
        useContext: function (e, t) {
          return b().useContext(e, t);
        },
        useEffect: function (e, t) {
          return b().useEffect(e, t);
        },
        useImperativeHandle: function (e, t, n) {
          return b().useImperativeHandle(e, t, n);
        },
        useDebugValue: function () {},
        useLayoutEffect: function (e, t) {
          return b().useLayoutEffect(e, t);
        },
        useMemo: function (e, t) {
          return b().useMemo(e, t);
        },
        useReducer: function (e, t, n) {
          return b().useReducer(e, t, n);
        },
        useRef: function (e) {
          return b().useRef(e);
        },
        useState: function (e) {
          return b().useState(e);
        },
        Fragment: k,
        Profiler: T,
        StrictMode: x,
        Suspense: R,
        createElement: u,
        cloneElement: function (e, t, n) {
          if (null === e || void 0 === e) throw Error(r(267, e));
          var i = _({}, e.props),
            o = e.key,
            a = e.ref,
            u = e._owner;
          if (null != t) {
            if (
              (void 0 !== t.ref && ((a = t.ref), (u = U.current)),
              void 0 !== t.key && (o = "" + t.key),
              e.type && e.type.defaultProps)
            )
              var l = e.type.defaultProps;
            for (s in t)
              B.call(t, s) &&
                !D.hasOwnProperty(s) &&
                (i[s] = void 0 === t[s] && void 0 !== l ? l[s] : t[s]);
          }
          var s = arguments.length - 2;
          if (1 === s) i.children = n;
          else if (1 < s) {
            l = Array(s);
            for (var f = 0; f < s; f++) l[f] = arguments[f + 2];
            i.children = l;
          }
          return {
            $$typeof: E,
            type: e.type,
            key: o,
            ref: a,
            props: i,
            _owner: u,
          };
        },
        createFactory: function (e) {
          var t = u.bind(null, e);
          return (t.type = e), t;
        },
        isValidElement: s,
        version: "16.11.0",
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
          ReactCurrentDispatcher: z,
          ReactCurrentBatchConfig: {
            suspense: null,
          },
          ReactCurrentOwner: U,
          IsSomeRendererActing: {
            current: !1,
          },
          assign: _,
        },
      },
      K = {
        default: Y,
      },
      W = (K && Y) || K;
    e.exports = W.default || W;
  },
  function (e, t) {
    "use strict";
    function n(e) {
      if (null === e || void 0 === e)
        throw new TypeError(
          "Object.assign cannot be called with null or undefined"
        );
      return Object(e);
    }
    function r() {
      try {
        if (!Object.assign) return !1;
        var e = new String("abc");
        if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0]))
          return !1;
        for (var t = {}, n = 0; n < 10; n++)
          t["_" + String.fromCharCode(n)] = n;
        var r = Object.getOwnPropertyNames(t).map(function (e) {
          return t[e];
        });
        if ("0123456789" !== r.join("")) return !1;
        var i = {};
        return (
          "abcdefghijklmnopqrst".split("").forEach(function (e) {
            i[e] = e;
          }),
          "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, i)).join("")
        );
      } catch (e) {
        return !1;
      }
    }
    var i = Object.getOwnPropertySymbols,
      o = Object.prototype.hasOwnProperty,
      a = Object.prototype.propertyIsEnumerable;
    e.exports = r()
      ? Object.assign
      : function (e, t) {
          for (var r, u, l = n(e), s = 1; s < arguments.length; s++) {
            r = Object(arguments[s]);
            for (var f in r) o.call(r, f) && (l[f] = r[f]);
            if (i) {
              u = i(r);
              for (var c = 0; c < u.length; c++)
                a.call(r, u[c]) && (l[u[c]] = r[u[c]]);
            }
          }
          return l;
        };
  },
  function (e, t, n) {
    "use strict";
    function r() {
      if (
        "undefined" != typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ &&
        "function" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE
      )
        try {
          __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(r);
        } catch (e) {
          console.error(e);
        }
    }
    r(), (e.exports = n(5));
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      for (
        var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
          n = 1;
        n < arguments.length;
        n++
      )
        t += "&args[]=" + encodeURIComponent(arguments[n]);
      return (
        "Minified React error #" +
        e +
        "; visit " +
        t +
        " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
      );
    }
    function i() {
      if (ji)
        for (var e in Li) {
          var t = Li[e],
            n = ji.indexOf(e);
          if (!(-1 < n)) throw Error(r(96, e));
          if (!zi[n]) {
            if (!t.extractEvents) throw Error(r(97, e));
            (zi[n] = t), (n = t.eventTypes);
            for (var i in n) {
              var a = void 0,
                u = n[i],
                l = t,
                s = i;
              if (Ui.hasOwnProperty(s)) throw Error(r(99, s));
              Ui[s] = u;
              var f = u.phasedRegistrationNames;
              if (f) {
                for (a in f) f.hasOwnProperty(a) && o(f[a], l, s);
                a = !0;
              } else
                u.registrationName
                  ? (o(u.registrationName, l, s), (a = !0))
                  : (a = !1);
              if (!a) throw Error(r(98, i, e));
            }
          }
        }
    }
    function o(e, t, n) {
      if (Bi[e]) throw Error(r(100, e));
      (Bi[e] = t), (Di[e] = t.eventTypes[n].dependencies);
    }
    function a(e, t, n, r, i, o, a, u, l) {
      var s = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(n, s);
      } catch (e) {
        this.onError(e);
      }
    }
    function u(e, t, n, r, i, o, u, l, s) {
      (Fi = !1), (qi = null), a.apply(Wi, arguments);
    }
    function l(e, t, n, i, o, a, l, s, f) {
      if ((u.apply(this, arguments), Fi)) {
        if (!Fi) throw Error(r(198));
        var c = qi;
        (Fi = !1), (qi = null), Yi || ((Yi = !0), (Ki = c));
      }
    }
    function s(e, t, n) {
      var r = e.type || "unknown-event";
      (e.currentTarget = Qi(n)), l(r, t, void 0, e), (e.currentTarget = null);
    }
    function f(e, t) {
      if (null == t) throw Error(r(30));
      return null == e
        ? t
        : Array.isArray(e)
        ? Array.isArray(t)
          ? (e.push.apply(e, t), e)
          : (e.push(t), e)
        : Array.isArray(t)
        ? [e].concat(t)
        : [e, t];
    }
    function c(e, t, n) {
      Array.isArray(e) ? e.forEach(t, n) : e && t.call(n, e);
    }
    function d(e) {
      if (e) {
        var t = e._dispatchListeners,
          n = e._dispatchInstances;
        if (Array.isArray(t))
          for (var r = 0; r < t.length && !e.isPropagationStopped(); r++)
            s(e, t[r], n[r]);
        else t && s(e, t, n);
        (e._dispatchListeners = null),
          (e._dispatchInstances = null),
          e.isPersistent() || e.constructor.release(e);
      }
    }
    function p(e) {
      if ((null !== e && ($i = f($i, e)), (e = $i), ($i = null), e)) {
        if ((c(e, d), $i)) throw Error(r(95));
        if (Yi) throw ((e = Ki), (Yi = !1), (Ki = null), e);
      }
    }
    function h(e, t) {
      var n = e.stateNode;
      if (!n) return null;
      var i = Hi(n);
      if (!i) return null;
      n = i[t];
      e: switch (t) {
        case "onClick":
        case "onClickCapture":
        case "onDoubleClick":
        case "onDoubleClickCapture":
        case "onMouseDown":
        case "onMouseDownCapture":
        case "onMouseMove":
        case "onMouseMoveCapture":
        case "onMouseUp":
        case "onMouseUpCapture":
          (i = !i.disabled) ||
            ((e = e.type),
            (i = !(
              "button" === e ||
              "input" === e ||
              "select" === e ||
              "textarea" === e
            ))),
            (e = !i);
          break e;
        default:
          e = !1;
      }
      if (e) return null;
      if (n && "function" != typeof n) throw Error(r(231, t, typeof n));
      return n;
    }
    function v(e) {
      return null === e || "object" != typeof e
        ? null
        : ((e = (ho && e[ho]) || e["@@iterator"]),
          "function" == typeof e ? e : null);
    }
    function y(e) {
      if (-1 === e._status) {
        e._status = 0;
        var t = e._ctor;
        (t = t()),
          (e._result = t),
          t.then(
            function (t) {
              0 === e._status &&
                ((t = t.default), (e._status = 1), (e._result = t));
            },
            function (t) {
              0 === e._status && ((e._status = 2), (e._result = t));
            }
          );
      }
    }
    function m(e) {
      if (null == e) return null;
      if ("function" == typeof e) return e.displayName || e.name || null;
      if ("string" == typeof e) return e;
      switch (e) {
        case no:
          return "Fragment";
        case to:
          return "Portal";
        case io:
          return "Profiler";
        case ro:
          return "StrictMode";
        case so:
          return "Suspense";
        case fo:
          return "SuspenseList";
      }
      if ("object" == typeof e)
        switch (e.$$typeof) {
          case ao:
            return "Context.Consumer";
          case oo:
            return "Context.Provider";
          case lo:
            var t = e.render;
            return (
              (t = t.displayName || t.name || ""),
              e.displayName ||
                ("" !== t ? "ForwardRef(" + t + ")" : "ForwardRef")
            );
          case co:
            return m(e.type);
          case po:
            if ((e = 1 === e._status ? e._result : null)) return m(e);
        }
      return null;
    }
    function g(e) {
      var t = "";
      do {
        e: switch (e.tag) {
          case 3:
          case 4:
          case 6:
          case 7:
          case 10:
          case 9:
            var n = "";
            break e;
          default:
            var r = e._debugOwner,
              i = e._debugSource,
              o = m(e.type);
            (n = null),
              r && (n = m(r.type)),
              (r = o),
              (o = ""),
              i
                ? (o =
                    " (at " +
                    i.fileName.replace(Gi, "") +
                    ":" +
                    i.lineNumber +
                    ")")
                : n && (o = " (created by " + n + ")"),
              (n = "\n    in " + (r || "Unknown") + o);
        }
        (t += n), (e = e.return);
      } while (e);
      return t;
    }
    function b(e) {
      if ((e = Vi(e))) {
        if ("function" != typeof yo) throw Error(r(280));
        var t = Hi(e.stateNode);
        yo(e.stateNode, e.type, t);
      }
    }
    function _(e) {
      mo ? (go ? go.push(e) : (go = [e])) : (mo = e);
    }
    function w() {
      if (mo) {
        var e = mo,
          t = go;
        if (((go = mo = null), b(e), t)) for (e = 0; e < t.length; e++) b(t[e]);
      }
    }
    function E(e, t) {
      return e(t);
    }
    function S(e, t, n, r) {
      return e(t, n, r);
    }
    function k() {}
    function x() {
      (null === mo && null === go) || (k(), w());
    }
    function T(e) {
      return (
        !!So.call(xo, e) ||
        (!So.call(ko, e) && (Eo.test(e) ? (xo[e] = !0) : ((ko[e] = !0), !1)))
      );
    }
    function P(e, t, n, r) {
      if (null !== n && 0 === n.type) return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean":
          return (
            !r &&
            (null !== n
              ? !n.acceptsBooleans
              : ((e = e.toLowerCase().slice(0, 5)),
                "data-" !== e && "aria-" !== e))
          );
        default:
          return !1;
      }
    }
    function O(e, t, n, r) {
      if (null === t || "undefined" == typeof t || P(e, t, n, r)) return !0;
      if (r) return !1;
      if (null !== n)
        switch (n.type) {
          case 3:
            return !t;
          case 4:
            return !1 === t;
          case 5:
            return isNaN(t);
          case 6:
            return isNaN(t) || 1 > t;
        }
      return !1;
    }
    function C(e, t, n, r, i, o) {
      (this.acceptsBooleans = 2 === t || 3 === t || 4 === t),
        (this.attributeName = r),
        (this.attributeNamespace = i),
        (this.mustUseProperty = n),
        (this.propertyName = e),
        (this.type = t),
        (this.sanitizeURL = o);
    }
    function R(e) {
      return e[1].toUpperCase();
    }
    function I(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "object":
        case "string":
        case "undefined":
          return e;
        default:
          return "";
      }
    }
    function M(e, t, n, r) {
      var i = To.hasOwnProperty(t) ? To[t] : null,
        o =
          null !== i
            ? 0 === i.type
            : !r &&
              2 < t.length &&
              ("o" === t[0] || "O" === t[0]) &&
              ("n" === t[1] || "N" === t[1]);
      o ||
        (O(t, n, i, r) && (n = null),
        r || null === i
          ? T(t) &&
            (null === n ? e.removeAttribute(t) : e.setAttribute(t, "" + n))
          : i.mustUseProperty
          ? (e[i.propertyName] = null === n ? 3 !== i.type && "" : n)
          : ((t = i.attributeName),
            (r = i.attributeNamespace),
            null === n
              ? e.removeAttribute(t)
              : ((i = i.type),
                (n = 3 === i || (4 === i && !0 === n) ? "" : "" + n),
                r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
    }
    function A(e) {
      var t = e.type;
      return (
        (e = e.nodeName) &&
        "input" === e.toLowerCase() &&
        ("checkbox" === t || "radio" === t)
      );
    }
    function N(e) {
      var t = A(e) ? "checked" : "value",
        n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
        r = "" + e[t];
      if (
        !e.hasOwnProperty(t) &&
        "undefined" != typeof n &&
        "function" == typeof n.get &&
        "function" == typeof n.set
      ) {
        var i = n.get,
          o = n.set;
        return (
          Object.defineProperty(e, t, {
            configurable: !0,
            get: function () {
              return i.call(this);
            },
            set: function (e) {
              (r = "" + e), o.call(this, e);
            },
          }),
          Object.defineProperty(e, t, {
            enumerable: n.enumerable,
          }),
          {
            getValue: function () {
              return r;
            },
            setValue: function (e) {
              r = "" + e;
            },
            stopTracking: function () {
              (e._valueTracker = null), delete e[t];
            },
          }
        );
      }
    }
    function j(e) {
      e._valueTracker || (e._valueTracker = N(e));
    }
    function L(e) {
      if (!e) return !1;
      var t = e._valueTracker;
      if (!t) return !0;
      var n = t.getValue(),
        r = "";
      return (
        e && (r = A(e) ? (e.checked ? "true" : "false") : e.value),
        (e = r),
        e !== n && (t.setValue(e), !0)
      );
    }
    function z(e, t) {
      var n = t.checked;
      return Ai({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: null != n ? n : e._wrapperState.initialChecked,
      });
    }
    function U(e, t) {
      var n = null == t.defaultValue ? "" : t.defaultValue,
        r = null != t.checked ? t.checked : t.defaultChecked;
      (n = I(null != t.value ? t.value : n)),
        (e._wrapperState = {
          initialChecked: r,
          initialValue: n,
          controlled:
            "checkbox" === t.type || "radio" === t.type
              ? null != t.checked
              : null != t.value,
        });
    }
    function B(e, t) {
      (t = t.checked), null != t && M(e, "checked", t, !1);
    }
    function D(e, t) {
      B(e, t);
      var n = I(t.value),
        r = t.type;
      if (null != n)
        "number" === r
          ? ((0 === n && "" === e.value) || e.value != n) && (e.value = "" + n)
          : e.value !== "" + n && (e.value = "" + n);
      else if ("submit" === r || "reset" === r)
        return void e.removeAttribute("value");
      t.hasOwnProperty("value")
        ? q(e, t.type, n)
        : t.hasOwnProperty("defaultValue") && q(e, t.type, I(t.defaultValue)),
        null == t.checked &&
          null != t.defaultChecked &&
          (e.defaultChecked = !!t.defaultChecked);
    }
    function F(e, t, n) {
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var r = t.type;
        if (
          !(
            ("submit" !== r && "reset" !== r) ||
            (void 0 !== t.value && null !== t.value)
          )
        )
          return;
        (t = "" + e._wrapperState.initialValue),
          n || t === e.value || (e.value = t),
          (e.defaultValue = t);
      }
      (n = e.name),
        "" !== n && (e.name = ""),
        (e.defaultChecked = !e.defaultChecked),
        (e.defaultChecked = !!e._wrapperState.initialChecked),
        "" !== n && (e.name = n);
    }
    function q(e, t, n) {
      ("number" === t && e.ownerDocument.activeElement === e) ||
        (null == n
          ? (e.defaultValue = "" + e._wrapperState.initialValue)
          : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
    }
    function Y(e) {
      var t = "";
      return (
        Mi.Children.forEach(e, function (e) {
          null != e && (t += e);
        }),
        t
      );
    }
    function K(e, t) {
      return (
        (e = Ai(
          {
            children: void 0,
          },
          t
        )),
        (t = Y(t.children)) && (e.children = t),
        e
      );
    }
    function W(e, t, n, r) {
      if (((e = e.options), t)) {
        t = {};
        for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
        for (n = 0; n < e.length; n++)
          (i = t.hasOwnProperty("$" + e[n].value)),
            e[n].selected !== i && (e[n].selected = i),
            i && r && (e[n].defaultSelected = !0);
      } else {
        for (n = "" + I(n), t = null, i = 0; i < e.length; i++) {
          if (e[i].value === n)
            return (
              (e[i].selected = !0), void (r && (e[i].defaultSelected = !0))
            );
          null !== t || e[i].disabled || (t = e[i]);
        }
        null !== t && (t.selected = !0);
      }
    }
    function H(e, t) {
      if (null != t.dangerouslySetInnerHTML) throw Error(r(91));
      return Ai({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: "" + e._wrapperState.initialValue,
      });
    }
    function V(e, t) {
      var n = t.value;
      if (null == n) {
        if (((n = t.defaultValue), (t = t.children), null != t)) {
          if (null != n) throw Error(r(92));
          if (Array.isArray(t)) {
            if (!(1 >= t.length)) throw Error(r(93));
            t = t[0];
          }
          n = t;
        }
        null == n && (n = "");
      }
      e._wrapperState = {
        initialValue: I(n),
      };
    }
    function Q(e, t) {
      var n = I(t.value),
        r = I(t.defaultValue);
      null != n &&
        ((n = "" + n),
        n !== e.value && (e.value = n),
        null == t.defaultValue && e.defaultValue !== n && (e.defaultValue = n)),
        null != r && (e.defaultValue = "" + r);
    }
    function $(e) {
      var t = e.textContent;
      t === e._wrapperState.initialValue &&
        "" !== t &&
        null !== t &&
        (e.value = t);
    }
    function J(e) {
      switch (e) {
        case "svg":
          return "http://www.w3.org/2000/svg";
        case "math":
          return "http://www.w3.org/1998/Math/MathML";
        default:
          return "http://www.w3.org/1999/xhtml";
      }
    }
    function X(e, t) {
      return null == e || "http://www.w3.org/1999/xhtml" === e
        ? J(t)
        : "http://www.w3.org/2000/svg" === e && "foreignObject" === t
        ? "http://www.w3.org/1999/xhtml"
        : e;
    }
    function G(e, t) {
      if (t) {
        var n = e.firstChild;
        if (n && n === e.lastChild && 3 === n.nodeType)
          return void (n.nodeValue = t);
      }
      e.textContent = t;
    }
    function Z(e, t) {
      var n = {};
      return (
        (n[e.toLowerCase()] = t.toLowerCase()),
        (n["Webkit" + e] = "webkit" + t),
        (n["Moz" + e] = "moz" + t),
        n
      );
    }
    function ee(e) {
      if (Mo[e]) return Mo[e];
      if (!Io[e]) return e;
      var t,
        n = Io[e];
      for (t in n) if (n.hasOwnProperty(t) && t in Ao) return (Mo[e] = n[t]);
      return e;
    }
    function te(e) {
      var t = e,
        n = e;
      if (e.alternate) for (; t.return; ) t = t.return;
      else {
        e = t;
        do
          (t = e), 0 !== (1026 & t.effectTag) && (n = t.return), (e = t.return);
        while (e);
      }
      return 3 === t.tag ? n : null;
    }
    function ne(e) {
      if (13 === e.tag) {
        var t = e.memoizedState;
        if (
          (null === t &&
            ((e = e.alternate), null !== e && (t = e.memoizedState)),
          null !== t)
        )
          return t.dehydrated;
      }
      return null;
    }
    function re(e) {
      if (te(e) !== e) throw Error(r(188));
    }
    function ie(e) {
      var t = e.alternate;
      if (!t) {
        if (((t = te(e)), null === t)) throw Error(r(188));
        return t !== e ? null : e;
      }
      for (var n = e, i = t; ; ) {
        var o = n.return;
        if (null === o) break;
        var a = o.alternate;
        if (null === a) {
          if (((i = o.return), null !== i)) {
            n = i;
            continue;
          }
          break;
        }
        if (o.child === a.child) {
          for (a = o.child; a; ) {
            if (a === n) return re(o), e;
            if (a === i) return re(o), t;
            a = a.sibling;
          }
          throw Error(r(188));
        }
        if (n.return !== i.return) (n = o), (i = a);
        else {
          for (var u = !1, l = o.child; l; ) {
            if (l === n) {
              (u = !0), (n = o), (i = a);
              break;
            }
            if (l === i) {
              (u = !0), (i = o), (n = a);
              break;
            }
            l = l.sibling;
          }
          if (!u) {
            for (l = a.child; l; ) {
              if (l === n) {
                (u = !0), (n = a), (i = o);
                break;
              }
              if (l === i) {
                (u = !0), (i = a), (n = o);
                break;
              }
              l = l.sibling;
            }
            if (!u) throw Error(r(189));
          }
        }
        if (n.alternate !== i) throw Error(r(190));
      }
      if (3 !== n.tag) throw Error(r(188));
      return n.stateNode.current === n ? e : t;
    }
    function oe(e) {
      if (((e = ie(e)), !e)) return null;
      for (var t = e; ; ) {
        if (5 === t.tag || 6 === t.tag) return t;
        if (t.child) (t.child.return = t), (t = t.child);
        else {
          if (t === e) break;
          for (; !t.sibling; ) {
            if (!t.return || t.return === e) return null;
            t = t.return;
          }
          (t.sibling.return = t.return), (t = t.sibling);
        }
      }
      return null;
    }
    function ae(e) {
      var t = qe(e);
      Jo.forEach(function (n) {
        Ye(n, e, t);
      }),
        Xo.forEach(function (n) {
          Ye(n, e, t);
        });
    }
    function ue(e, t, n, r) {
      return {
        blockedOn: e,
        topLevelType: t,
        eventSystemFlags: 32 | n,
        nativeEvent: r,
      };
    }
    function le(e, t) {
      switch (e) {
        case "focus":
        case "blur":
          Ko = null;
          break;
        case "dragenter":
        case "dragleave":
          Wo = null;
          break;
        case "mouseover":
        case "mouseout":
          Ho = null;
          break;
        case "pointerover":
        case "pointerout":
          Vo.delete(t.pointerId);
          break;
        case "gotpointercapture":
        case "lostpointercapture":
          Qo.delete(t.pointerId);
      }
    }
    function se(e, t, n, r, i) {
      return null === e || e.nativeEvent !== i
        ? ((e = ue(t, n, r, i)),
          null !== t && ((t = ut(t)), null !== t && jo(t)),
          e)
        : ((e.eventSystemFlags |= r), e);
    }
    function fe(e, t, n, r) {
      switch (t) {
        case "focus":
          return (Ko = se(Ko, e, t, n, r)), !0;
        case "dragenter":
          return (Wo = se(Wo, e, t, n, r)), !0;
        case "mouseover":
          return (Ho = se(Ho, e, t, n, r)), !0;
        case "pointerover":
          var i = r.pointerId;
          return Vo.set(i, se(Vo.get(i) || null, e, t, n, r)), !0;
        case "gotpointercapture":
          return (
            (i = r.pointerId), Qo.set(i, se(Qo.get(i) || null, e, t, n, r)), !0
          );
      }
      return !1;
    }
    function ce(e) {
      var t = at(e.target);
      if (null !== t) {
        var n = te(t);
        if (null !== n)
          if (((t = n.tag), 13 === t)) {
            if (((t = ne(n)), null !== t))
              return (
                (e.blockedOn = t),
                void Ni.unstable_runWithPriority(e.priority, function () {
                  Lo(n);
                })
              );
          } else if (3 === t && n.stateNode.hydrate)
            return void (e.blockedOn =
              3 === n.tag ? n.stateNode.containerInfo : null);
      }
      e.blockedOn = null;
    }
    function de(e) {
      if (null !== e.blockedOn) return !1;
      var t = De(e.topLevelType, e.eventSystemFlags, e.nativeEvent);
      if (null !== t) {
        var n = ut(t);
        return null !== n && jo(n), (e.blockedOn = t), !1;
      }
      return !0;
    }
    function pe(e, t, n) {
      de(e) && n.delete(t);
    }
    function he() {
      for (qo = !1; 0 < Yo.length; ) {
        var e = Yo[0];
        if (null !== e.blockedOn) {
          (e = ut(e.blockedOn)), null !== e && No(e);
          break;
        }
        var t = De(e.topLevelType, e.eventSystemFlags, e.nativeEvent);
        null !== t ? (e.blockedOn = t) : Yo.shift();
      }
      null !== Ko && de(Ko) && (Ko = null),
        null !== Wo && de(Wo) && (Wo = null),
        null !== Ho && de(Ho) && (Ho = null),
        Vo.forEach(pe),
        Qo.forEach(pe);
    }
    function ve(e, t) {
      e.blockedOn === t &&
        ((e.blockedOn = null),
        qo ||
          ((qo = !0),
          Ni.unstable_scheduleCallback(Ni.unstable_NormalPriority, he)));
    }
    function ye(e) {
      function t(t) {
        return ve(t, e);
      }
      if (0 < Yo.length) {
        ve(Yo[0], e);
        for (var n = 1; n < Yo.length; n++) {
          var r = Yo[n];
          r.blockedOn === e && (r.blockedOn = null);
        }
      }
      for (
        null !== Ko && ve(Ko, e),
          null !== Wo && ve(Wo, e),
          null !== Ho && ve(Ho, e),
          Vo.forEach(t),
          Qo.forEach(t),
          n = 0;
        n < $o.length;
        n++
      )
        (r = $o[n]), r.blockedOn === e && (r.blockedOn = null);
      for (; 0 < $o.length && ((n = $o[0]), null === n.blockedOn); )
        ce(n), null === n.blockedOn && $o.shift();
    }
    function me(e) {
      return (
        (e = e.target || e.srcElement || window),
        e.correspondingUseElement && (e = e.correspondingUseElement),
        3 === e.nodeType ? e.parentNode : e
      );
    }
    function ge(e) {
      do e = e.return;
      while (e && 5 !== e.tag);
      return e ? e : null;
    }
    function be(e, t, n) {
      (t = h(e, n.dispatchConfig.phasedRegistrationNames[t])) &&
        ((n._dispatchListeners = f(n._dispatchListeners, t)),
        (n._dispatchInstances = f(n._dispatchInstances, e)));
    }
    function _e(e) {
      if (e && e.dispatchConfig.phasedRegistrationNames) {
        for (var t = e._targetInst, n = []; t; ) n.push(t), (t = ge(t));
        for (t = n.length; 0 < t--; ) be(n[t], "captured", e);
        for (t = 0; t < n.length; t++) be(n[t], "bubbled", e);
      }
    }
    function we(e, t, n) {
      e &&
        n &&
        n.dispatchConfig.registrationName &&
        (t = h(e, n.dispatchConfig.registrationName)) &&
        ((n._dispatchListeners = f(n._dispatchListeners, t)),
        (n._dispatchInstances = f(n._dispatchInstances, e)));
    }
    function Ee(e) {
      e && e.dispatchConfig.registrationName && we(e._targetInst, null, e);
    }
    function Se(e) {
      c(e, _e);
    }
    function ke() {
      return !0;
    }
    function xe() {
      return !1;
    }
    function Te(e, t, n, r) {
      (this.dispatchConfig = e),
        (this._targetInst = t),
        (this.nativeEvent = n),
        (e = this.constructor.Interface);
      for (var i in e)
        e.hasOwnProperty(i) &&
          ((t = e[i])
            ? (this[i] = t(n))
            : "target" === i
            ? (this.target = r)
            : (this[i] = n[i]));
      return (
        (this.isDefaultPrevented = (
          null != n.defaultPrevented ? n.defaultPrevented : !1 === n.returnValue
        )
          ? ke
          : xe),
        (this.isPropagationStopped = xe),
        this
      );
    }
    function Pe(e, t, n, r) {
      if (this.eventPool.length) {
        var i = this.eventPool.pop();
        return this.call(i, e, t, n, r), i;
      }
      return new this(e, t, n, r);
    }
    function Oe(e) {
      if (!(e instanceof this)) throw Error(r(279));
      e.destructor(), 10 > this.eventPool.length && this.eventPool.push(e);
    }
    function Ce(e) {
      (e.eventPool = []), (e.getPooled = Pe), (e.release = Oe);
    }
    function Re(e) {
      var t = e.keyCode;
      return (
        "charCode" in e
          ? ((e = e.charCode), 0 === e && 13 === t && (e = 13))
          : (e = t),
        10 === e && (e = 13),
        32 <= e || 13 === e ? e : 0
      );
    }
    function Ie(e) {
      var t = this.nativeEvent;
      return t.getModifierState
        ? t.getModifierState(e)
        : !!(e = ia[e]) && !!t[e];
    }
    function Me() {
      return Ie;
    }
    function Ae(e) {
      var t = e.targetInst,
        n = t;
      do {
        if (!n) {
          e.ancestors.push(n);
          break;
        }
        var r = n;
        if (3 === r.tag) r = r.stateNode.containerInfo;
        else {
          for (; r.return; ) r = r.return;
          r = 3 !== r.tag ? null : r.stateNode.containerInfo;
        }
        if (!r) break;
        (t = n.tag), (5 !== t && 6 !== t) || e.ancestors.push(n), (n = at(r));
      } while (n);
      for (n = 0; n < e.ancestors.length; n++) {
        t = e.ancestors[n];
        var i = me(e.nativeEvent);
        r = e.topLevelType;
        for (
          var o = e.nativeEvent, a = e.eventSystemFlags, u = null, l = 0;
          l < zi.length;
          l++
        ) {
          var s = zi[l];
          s && (s = s.extractEvents(r, t, o, i, a)) && (u = f(u, s));
        }
        p(u);
      }
    }
    function Ne(e, t) {
      je(t, e, !1);
    }
    function je(e, t, n) {
      switch (Ca(t)) {
        case 0:
          var r = Le.bind(null, t, 1);
          break;
        case 1:
          r = ze.bind(null, t, 1);
          break;
        default:
          r = Be.bind(null, t, 1);
      }
      n ? e.addEventListener(t, r, !0) : e.addEventListener(t, r, !1);
    }
    function Le(e, t, n) {
      _o || k();
      var r = Be,
        i = _o;
      _o = !0;
      try {
        S(r, e, t, n);
      } finally {
        (_o = i) || x();
      }
    }
    function ze(e, t, n) {
      Oa(Pa, Be.bind(null, e, t, n));
    }
    function Ue(e, t, n, r) {
      if (Ia.length) {
        var i = Ia.pop();
        (i.topLevelType = e),
          (i.eventSystemFlags = t),
          (i.nativeEvent = n),
          (i.targetInst = r),
          (e = i);
      } else
        e = {
          topLevelType: e,
          eventSystemFlags: t,
          nativeEvent: n,
          targetInst: r,
          ancestors: [],
        };
      try {
        if (((t = Ae), (n = e), wo)) t(n, void 0);
        else {
          wo = !0;
          try {
            bo(t, n, void 0);
          } finally {
            (wo = !1), x();
          }
        }
      } finally {
        (e.topLevelType = null),
          (e.nativeEvent = null),
          (e.targetInst = null),
          (e.ancestors.length = 0),
          Ia.length < Ra && Ia.push(e);
      }
    }
    function Be(e, t, n) {
      if (Ma)
        if (0 < Yo.length && -1 < Jo.indexOf(e))
          (e = ue(null, e, t, n)), Yo.push(e);
        else {
          var r = De(e, t, n);
          null === r
            ? le(e, n)
            : -1 < Jo.indexOf(e)
            ? ((e = ue(r, e, t, n)), Yo.push(e))
            : fe(r, e, t, n) || (le(e, n), Ue(e, t, n, null));
        }
    }
    function De(e, t, n) {
      var r = me(n);
      if (((r = at(r)), null !== r)) {
        var i = te(r);
        if (null === i) r = null;
        else {
          var o = i.tag;
          if (13 === o) {
            if (((r = ne(i)), null !== r)) return r;
            r = null;
          } else if (3 === o) {
            if (i.stateNode.hydrate)
              return 3 === i.tag ? i.stateNode.containerInfo : null;
            r = null;
          } else i !== r && (r = null);
        }
      }
      return Ue(e, t, n, r), null;
    }
    function Fe(e) {
      if (!vo) return !1;
      e = "on" + e;
      var t = e in document;
      return (
        t ||
          ((t = document.createElement("div")),
          t.setAttribute(e, "return;"),
          (t = "function" == typeof t[e])),
        t
      );
    }
    function qe(e) {
      var t = Aa.get(e);
      return void 0 === t && ((t = new Set()), Aa.set(e, t)), t;
    }
    function Ye(e, t, n) {
      if (!n.has(e)) {
        switch (e) {
          case "scroll":
            je(t, "scroll", !0);
            break;
          case "focus":
          case "blur":
            je(t, "focus", !0),
              je(t, "blur", !0),
              n.add("blur"),
              n.add("focus");
            break;
          case "cancel":
          case "close":
            Fe(e) && je(t, e, !0);
            break;
          case "invalid":
          case "submit":
          case "reset":
            break;
          default:
            -1 === Fo.indexOf(e) && Ne(e, t);
        }
        n.add(e);
      }
    }
    function Ke(e, t, n) {
      return null == t || "boolean" == typeof t || "" === t
        ? ""
        : n ||
          "number" != typeof t ||
          0 === t ||
          (Na.hasOwnProperty(e) && Na[e])
        ? ("" + t).trim()
        : t + "px";
    }
    function We(e, t) {
      e = e.style;
      for (var n in t)
        if (t.hasOwnProperty(n)) {
          var r = 0 === n.indexOf("--"),
            i = Ke(n, t[n], r);
          "float" === n && (n = "cssFloat"),
            r ? e.setProperty(n, i) : (e[n] = i);
        }
    }
    function He(e, t) {
      if (t) {
        if (La[e] && (null != t.children || null != t.dangerouslySetInnerHTML))
          throw Error(r(137, e, ""));
        if (null != t.dangerouslySetInnerHTML) {
          if (null != t.children) throw Error(r(60));
          if (
            !(
              "object" == typeof t.dangerouslySetInnerHTML &&
              "__html" in t.dangerouslySetInnerHTML
            )
          )
            throw Error(r(61));
        }
        if (null != t.style && "object" != typeof t.style)
          throw Error(r(62, ""));
      }
    }
    function Ve(e, t) {
      if (-1 === e.indexOf("-")) return "string" == typeof t.is;
      switch (e) {
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return !1;
        default:
          return !0;
      }
    }
    function Qe(e, t) {
      e = 9 === e.nodeType || 11 === e.nodeType ? e : e.ownerDocument;
      var n = qe(e);
      t = Di[t];
      for (var r = 0; r < t.length; r++) Ye(t[r], e, n);
    }
    function $e() {}
    function Je(e) {
      if (
        ((e = e || ("undefined" != typeof document ? document : void 0)),
        "undefined" == typeof e)
      )
        return null;
      try {
        return e.activeElement || e.body;
      } catch (t) {
        return e.body;
      }
    }
    function Xe(e) {
      for (; e && e.firstChild; ) e = e.firstChild;
      return e;
    }
    function Ge(e, t) {
      var n = Xe(e);
      e = 0;
      for (var r; n; ) {
        if (3 === n.nodeType) {
          if (((r = e + n.textContent.length), e <= t && r >= t))
            return {
              node: n,
              offset: t - e,
            };
          e = r;
        }
        e: {
          for (; n; ) {
            if (n.nextSibling) {
              n = n.nextSibling;
              break e;
            }
            n = n.parentNode;
          }
          n = void 0;
        }
        n = Xe(n);
      }
    }
    function Ze(e, t) {
      return (
        !(!e || !t) &&
        (e === t ||
          ((!e || 3 !== e.nodeType) &&
            (t && 3 === t.nodeType
              ? Ze(e, t.parentNode)
              : "contains" in e
              ? e.contains(t)
              : !!e.compareDocumentPosition &&
                !!(16 & e.compareDocumentPosition(t)))))
      );
    }
    function et() {
      for (var e = window, t = Je(); t instanceof e.HTMLIFrameElement; ) {
        try {
          var n = "string" == typeof t.contentWindow.location.href;
        } catch (e) {
          n = !1;
        }
        if (!n) break;
        (e = t.contentWindow), (t = Je(e.document));
      }
      return t;
    }
    function tt(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return (
        t &&
        (("input" === t &&
          ("text" === e.type ||
            "search" === e.type ||
            "tel" === e.type ||
            "url" === e.type ||
            "password" === e.type)) ||
          "textarea" === t ||
          "true" === e.contentEditable)
      );
    }
    function nt(e, t) {
      switch (e) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!t.autoFocus;
      }
      return !1;
    }
    function rt(e, t) {
      return (
        "textarea" === e ||
        "option" === e ||
        "noscript" === e ||
        "string" == typeof t.children ||
        "number" == typeof t.children ||
        ("object" == typeof t.dangerouslySetInnerHTML &&
          null !== t.dangerouslySetInnerHTML &&
          null != t.dangerouslySetInnerHTML.__html)
      );
    }
    function it(e) {
      for (; null != e; e = e.nextSibling) {
        var t = e.nodeType;
        if (1 === t || 3 === t) break;
      }
      return e;
    }
    function ot(e) {
      e = e.previousSibling;
      for (var t = 0; e; ) {
        if (8 === e.nodeType) {
          var n = e.data;
          if (n === za || n === Da || n === Ba) {
            if (0 === t) return e;
            t--;
          } else n === Ua && t++;
        }
        e = e.previousSibling;
      }
      return null;
    }
    function at(e) {
      var t = e[Ha];
      if (t) return t;
      for (var n = e.parentNode; n; ) {
        if ((t = n[Qa] || n[Ha])) {
          if (
            ((n = t.alternate),
            null !== t.child || (null !== n && null !== n.child))
          )
            for (e = ot(e); null !== e; ) {
              if ((n = e[Ha])) return n;
              e = ot(e);
            }
          return t;
        }
        (e = n), (n = e.parentNode);
      }
      return null;
    }
    function ut(e) {
      return (
        (e = e[Ha] || e[Qa]),
        !e || (5 !== e.tag && 6 !== e.tag && 13 !== e.tag && 3 !== e.tag)
          ? null
          : e
      );
    }
    function lt(e) {
      if (5 === e.tag || 6 === e.tag) return e.stateNode;
      throw Error(r(33));
    }
    function st(e) {
      return e[Va] || null;
    }
    function ft() {
      if (Xa) return Xa;
      var e,
        t,
        n = Ja,
        r = n.length,
        i = "value" in $a ? $a.value : $a.textContent,
        o = i.length;
      for (e = 0; e < r && n[e] === i[e]; e++);
      var a = r - e;
      for (t = 1; t <= a && n[r - t] === i[o - t]; t++);
      return (Xa = i.slice(e, 1 < t ? 1 - t : void 0));
    }
    function ct(e, t) {
      switch (e) {
        case "keyup":
          return -1 !== eu.indexOf(t.keyCode);
        case "keydown":
          return 229 !== t.keyCode;
        case "keypress":
        case "mousedown":
        case "blur":
          return !0;
        default:
          return !1;
      }
    }
    function dt(e) {
      return (
        (e = e.detail), "object" == typeof e && "data" in e ? e.data : null
      );
    }
    function pt(e, t) {
      switch (e) {
        case "compositionend":
          return dt(t);
        case "keypress":
          return 32 !== t.which ? null : ((uu = !0), ou);
        case "textInput":
          return (e = t.data), e === ou && uu ? null : e;
        default:
          return null;
      }
    }
    function ht(e, t) {
      if (lu)
        return "compositionend" === e || (!tu && ct(e, t))
          ? ((e = ft()), (Xa = Ja = $a = null), (lu = !1), e)
          : null;
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (
            !(t.ctrlKey || t.altKey || t.metaKey) ||
            (t.ctrlKey && t.altKey)
          ) {
            if (t.char && 1 < t.char.length) return t.char;
            if (t.which) return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return iu && "ko" !== t.locale ? null : t.data;
        default:
          return null;
      }
    }
    function vt(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return "input" === t ? !!fu[e.type] : "textarea" === t;
    }
    function yt(e, t, n) {
      return (
        (e = Te.getPooled(cu.change, e, t, n)),
        (e.type = "change"),
        _(n),
        Se(e),
        e
      );
    }
    function mt(e) {
      p(e);
    }
    function gt(e) {
      var t = lt(e);
      if (L(t)) return e;
    }
    function bt(e, t) {
      if ("change" === e) return t;
    }
    function _t() {
      du && (du.detachEvent("onpropertychange", wt), (pu = du = null));
    }
    function wt(e) {
      if ("value" === e.propertyName && gt(pu))
        if (((e = yt(pu, e, me(e))), _o)) p(e);
        else {
          _o = !0;
          try {
            E(mt, e);
          } finally {
            (_o = !1), x();
          }
        }
    }
    function Et(e, t, n) {
      "focus" === e
        ? (_t(), (du = t), (pu = n), du.attachEvent("onpropertychange", wt))
        : "blur" === e && _t();
    }
    function St(e) {
      if ("selectionchange" === e || "keyup" === e || "keydown" === e)
        return gt(pu);
    }
    function kt(e, t) {
      if ("click" === e) return gt(t);
    }
    function xt(e, t) {
      if ("input" === e || "change" === e) return gt(t);
    }
    function Tt(e, t) {
      return (e === t && (0 !== e || 1 / e === 1 / t)) || (e !== e && t !== t);
    }
    function Pt(e, t) {
      if (bu(e, t)) return !0;
      if (
        "object" != typeof e ||
        null === e ||
        "object" != typeof t ||
        null === t
      )
        return !1;
      var n = Object.keys(e),
        r = Object.keys(t);
      if (n.length !== r.length) return !1;
      for (r = 0; r < n.length; r++)
        if (!_u.call(t, n[r]) || !bu(e[n[r]], t[n[r]])) return !1;
      return !0;
    }
    function Ot(e, t) {
      var n =
        t.window === t ? t.document : 9 === t.nodeType ? t : t.ownerDocument;
      return Tu || null == Su || Su !== Je(n)
        ? null
        : ((n = Su),
          "selectionStart" in n && tt(n)
            ? (n = {
                start: n.selectionStart,
                end: n.selectionEnd,
              })
            : ((n = (
                (n.ownerDocument && n.ownerDocument.defaultView) ||
                window
              ).getSelection()),
              (n = {
                anchorNode: n.anchorNode,
                anchorOffset: n.anchorOffset,
                focusNode: n.focusNode,
                focusOffset: n.focusOffset,
              })),
          xu && Pt(xu, n)
            ? null
            : ((xu = n),
              (e = Te.getPooled(Eu.select, ku, e, t)),
              (e.type = "select"),
              (e.target = Su),
              Se(e),
              e));
    }
    function Ct(e) {
      0 > Nu || ((e.current = Au[Nu]), (Au[Nu] = null), Nu--);
    }
    function Rt(e, t) {
      Nu++, (Au[Nu] = e.current), (e.current = t);
    }
    function It(e, t) {
      var n = e.type.contextTypes;
      if (!n) return ju;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i,
        o = {};
      for (i in n) o[i] = t[i];
      return (
        r &&
          ((e = e.stateNode),
          (e.__reactInternalMemoizedUnmaskedChildContext = t),
          (e.__reactInternalMemoizedMaskedChildContext = o)),
        o
      );
    }
    function Mt(e) {
      return (e = e.childContextTypes), null !== e && void 0 !== e;
    }
    function At(e) {
      Ct(zu, e), Ct(Lu, e);
    }
    function Nt(e) {
      Ct(zu, e), Ct(Lu, e);
    }
    function jt(e, t, n) {
      if (Lu.current !== ju) throw Error(r(168));
      Rt(Lu, t, e), Rt(zu, n, e);
    }
    function Lt(e, t, n) {
      var i = e.stateNode;
      if (((e = t.childContextTypes), "function" != typeof i.getChildContext))
        return n;
      i = i.getChildContext();
      for (var o in i) if (!(o in e)) throw Error(r(108, m(t) || "Unknown", o));
      return Ai({}, n, {}, i);
    }
    function zt(e) {
      var t = e.stateNode;
      return (
        (t = (t && t.__reactInternalMemoizedMergedChildContext) || ju),
        (Uu = Lu.current),
        Rt(Lu, t, e),
        Rt(zu, zu.current, e),
        !0
      );
    }
    function Ut(e, t, n) {
      var i = e.stateNode;
      if (!i) throw Error(r(169));
      n
        ? ((t = Lt(e, t, Uu)),
          (i.__reactInternalMemoizedMergedChildContext = t),
          Ct(zu, e),
          Ct(Lu, e),
          Rt(Lu, t, e))
        : Ct(zu, e),
        Rt(zu, n, e);
    }
    function Bt() {
      switch (Wu()) {
        case Hu:
          return 99;
        case Vu:
          return 98;
        case Qu:
          return 97;
        case $u:
          return 96;
        case Ju:
          return 95;
        default:
          throw Error(r(332));
      }
    }
    function Dt(e) {
      switch (e) {
        case 99:
          return Hu;
        case 98:
          return Vu;
        case 97:
          return Qu;
        case 96:
          return $u;
        case 95:
          return Ju;
        default:
          throw Error(r(332));
      }
    }
    function Ft(e, t) {
      return (e = Dt(e)), Bu(e, t);
    }
    function qt(e, t, n) {
      return (e = Dt(e)), Du(e, t, n);
    }
    function Yt(e) {
      return null === Zu ? ((Zu = [e]), (el = Du(Hu, Wt))) : Zu.push(e), Xu;
    }
    function Kt() {
      if (null !== el) {
        var e = el;
        (el = null), Fu(e);
      }
      Wt();
    }
    function Wt() {
      if (!tl && null !== Zu) {
        tl = !0;
        var e = 0;
        try {
          var t = Zu;
          Ft(99, function () {
            for (; e < t.length; e++) {
              var n = t[e];
              do n = n(!0);
              while (null !== n);
            }
          }),
            (Zu = null);
        } catch (t) {
          throw (null !== Zu && (Zu = Zu.slice(e + 1)), Du(Hu, Kt), t);
        } finally {
          tl = !1;
        }
      }
    }
    function Ht(e, t, n) {
      return (
        (n /= 10), 1073741821 - ((((1073741821 - e + t / 10) / n) | 0) + 1) * n
      );
    }
    function Vt(e, t) {
      if (e && e.defaultProps) {
        (t = Ai({}, t)), (e = e.defaultProps);
        for (var n in e) void 0 === t[n] && (t[n] = e[n]);
      }
      return t;
    }
    function Qt() {
      ll = ul = al = null;
    }
    function $t(e, t) {
      var n = e.type._context;
      Rt(ol, n._currentValue, e), (n._currentValue = t);
    }
    function Jt(e) {
      var t = ol.current;
      Ct(ol, e), (e.type._context._currentValue = t);
    }
    function Xt(e, t) {
      for (; null !== e; ) {
        var n = e.alternate;
        if (e.childExpirationTime < t)
          (e.childExpirationTime = t),
            null !== n &&
              n.childExpirationTime < t &&
              (n.childExpirationTime = t);
        else {
          if (!(null !== n && n.childExpirationTime < t)) break;
          n.childExpirationTime = t;
        }
        e = e.return;
      }
    }
    function Gt(e, t) {
      (al = e),
        (ll = ul = null),
        (e = e.dependencies),
        null !== e &&
          null !== e.firstContext &&
          (e.expirationTime >= t && (Yl = !0), (e.firstContext = null));
    }
    function Zt(e, t) {
      if (ll !== e && !1 !== t && 0 !== t)
        if (
          (("number" == typeof t && 1073741823 !== t) ||
            ((ll = e), (t = 1073741823)),
          (t = {
            context: e,
            observedBits: t,
            next: null,
          }),
          null === ul)
        ) {
          if (null === al) throw Error(r(308));
          (ul = t),
            (al.dependencies = {
              expirationTime: 0,
              firstContext: t,
              responders: null,
            });
        } else ul = ul.next = t;
      return e._currentValue;
    }
    function en(e) {
      return {
        baseState: e,
        firstUpdate: null,
        lastUpdate: null,
        firstCapturedUpdate: null,
        lastCapturedUpdate: null,
        firstEffect: null,
        lastEffect: null,
        firstCapturedEffect: null,
        lastCapturedEffect: null,
      };
    }
    function tn(e) {
      return {
        baseState: e.baseState,
        firstUpdate: e.firstUpdate,
        lastUpdate: e.lastUpdate,
        firstCapturedUpdate: null,
        lastCapturedUpdate: null,
        firstEffect: null,
        lastEffect: null,
        firstCapturedEffect: null,
        lastCapturedEffect: null,
      };
    }
    function nn(e, t) {
      return {
        expirationTime: e,
        suspenseConfig: t,
        tag: 0,
        payload: null,
        callback: null,
        next: null,
        nextEffect: null,
      };
    }
    function rn(e, t) {
      null === e.lastUpdate
        ? (e.firstUpdate = e.lastUpdate = t)
        : ((e.lastUpdate.next = t), (e.lastUpdate = t));
    }
    function on(e, t) {
      var n = e.alternate;
      if (null === n) {
        var r = e.updateQueue,
          i = null;
        null === r && (r = e.updateQueue = en(e.memoizedState));
      } else
        (r = e.updateQueue),
          (i = n.updateQueue),
          null === r
            ? null === i
              ? ((r = e.updateQueue = en(e.memoizedState)),
                (i = n.updateQueue = en(n.memoizedState)))
              : (r = e.updateQueue = tn(i))
            : null === i && (i = n.updateQueue = tn(r));
      null === i || r === i
        ? rn(r, t)
        : null === r.lastUpdate || null === i.lastUpdate
        ? (rn(r, t), rn(i, t))
        : (rn(r, t), (i.lastUpdate = t));
    }
    function an(e, t) {
      var n = e.updateQueue;
      (n = null === n ? (e.updateQueue = en(e.memoizedState)) : un(e, n)),
        null === n.lastCapturedUpdate
          ? (n.firstCapturedUpdate = n.lastCapturedUpdate = t)
          : ((n.lastCapturedUpdate.next = t), (n.lastCapturedUpdate = t));
    }
    function un(e, t) {
      var n = e.alternate;
      return (
        null !== n && t === n.updateQueue && (t = e.updateQueue = tn(t)), t
      );
    }
    function ln(e, t, n, r, i, o) {
      switch (n.tag) {
        case 1:
          return (e = n.payload), "function" == typeof e ? e.call(o, r, i) : e;
        case 3:
          e.effectTag = (e.effectTag & -4097) | 64;
        case 0:
          if (
            ((e = n.payload),
            (i = "function" == typeof e ? e.call(o, r, i) : e),
            null === i || void 0 === i)
          )
            break;
          return Ai({}, r, i);
        case 2:
          sl = !0;
      }
      return r;
    }
    function sn(e, t, n, r, i) {
      (sl = !1), (t = un(e, t));
      for (
        var o = t.baseState, a = null, u = 0, l = t.firstUpdate, s = o;
        null !== l;

      ) {
        var f = l.expirationTime;
        f < i
          ? (null === a && ((a = l), (o = s)), u < f && (u = f))
          : (Wr(f, l.suspenseConfig),
            (s = ln(e, t, l, s, n, r)),
            null !== l.callback &&
              ((e.effectTag |= 32),
              (l.nextEffect = null),
              null === t.lastEffect
                ? (t.firstEffect = t.lastEffect = l)
                : ((t.lastEffect.nextEffect = l), (t.lastEffect = l)))),
          (l = l.next);
      }
      for (f = null, l = t.firstCapturedUpdate; null !== l; ) {
        var c = l.expirationTime;
        c < i
          ? (null === f && ((f = l), null === a && (o = s)), u < c && (u = c))
          : ((s = ln(e, t, l, s, n, r)),
            null !== l.callback &&
              ((e.effectTag |= 32),
              (l.nextEffect = null),
              null === t.lastCapturedEffect
                ? (t.firstCapturedEffect = t.lastCapturedEffect = l)
                : ((t.lastCapturedEffect.nextEffect = l),
                  (t.lastCapturedEffect = l)))),
          (l = l.next);
      }
      null === a && (t.lastUpdate = null),
        null === f ? (t.lastCapturedUpdate = null) : (e.effectTag |= 32),
        null === a && null === f && (o = s),
        (t.baseState = o),
        (t.firstUpdate = a),
        (t.firstCapturedUpdate = f),
        Hr(u),
        (e.expirationTime = u),
        (e.memoizedState = s);
    }
    function fn(e, t, n) {
      null !== t.firstCapturedUpdate &&
        (null !== t.lastUpdate &&
          ((t.lastUpdate.next = t.firstCapturedUpdate),
          (t.lastUpdate = t.lastCapturedUpdate)),
        (t.firstCapturedUpdate = t.lastCapturedUpdate = null)),
        cn(t.firstEffect, n),
        (t.firstEffect = t.lastEffect = null),
        cn(t.firstCapturedEffect, n),
        (t.firstCapturedEffect = t.lastCapturedEffect = null);
    }
    function cn(e, t) {
      for (; null !== e; ) {
        var n = e.callback;
        if (null !== n) {
          e.callback = null;
          var i = t;
          if ("function" != typeof n) throw Error(r(191, n));
          n.call(i);
        }
        e = e.nextEffect;
      }
    }
    function dn(e, t, n, r) {
      (t = e.memoizedState),
        (n = n(r, t)),
        (n = null === n || void 0 === n ? t : Ai({}, t, n)),
        (e.memoizedState = n),
        (r = e.updateQueue),
        null !== r && 0 === e.expirationTime && (r.baseState = n);
    }
    function pn(e, t, n, r, i, o, a) {
      return (
        (e = e.stateNode),
        "function" == typeof e.shouldComponentUpdate
          ? e.shouldComponentUpdate(r, o, a)
          : !t.prototype ||
            !t.prototype.isPureReactComponent ||
            !Pt(n, r) ||
            !Pt(i, o)
      );
    }
    function hn(e, t, n) {
      var r = !1,
        i = ju,
        o = t.contextType;
      return (
        "object" == typeof o && null !== o
          ? (o = Zt(o))
          : ((i = Mt(t) ? Uu : Lu.current),
            (r = t.contextTypes),
            (o = (r = null !== r && void 0 !== r) ? It(e, i) : ju)),
        (t = new t(n, o)),
        (e.memoizedState =
          null !== t.state && void 0 !== t.state ? t.state : null),
        (t.updater = dl),
        (e.stateNode = t),
        (t._reactInternalFiber = e),
        r &&
          ((e = e.stateNode),
          (e.__reactInternalMemoizedUnmaskedChildContext = i),
          (e.__reactInternalMemoizedMaskedChildContext = o)),
        t
      );
    }
    function vn(e, t, n, r) {
      (e = t.state),
        "function" == typeof t.componentWillReceiveProps &&
          t.componentWillReceiveProps(n, r),
        "function" == typeof t.UNSAFE_componentWillReceiveProps &&
          t.UNSAFE_componentWillReceiveProps(n, r),
        t.state !== e && dl.enqueueReplaceState(t, t.state, null);
    }
    function yn(e, t, n, r) {
      var i = e.stateNode;
      (i.props = n), (i.state = e.memoizedState), (i.refs = cl);
      var o = t.contextType;
      "object" == typeof o && null !== o
        ? (i.context = Zt(o))
        : ((o = Mt(t) ? Uu : Lu.current), (i.context = It(e, o))),
        (o = e.updateQueue),
        null !== o && (sn(e, o, n, i, r), (i.state = e.memoizedState)),
        (o = t.getDerivedStateFromProps),
        "function" == typeof o && (dn(e, t, o, n), (i.state = e.memoizedState)),
        "function" == typeof t.getDerivedStateFromProps ||
          "function" == typeof i.getSnapshotBeforeUpdate ||
          ("function" != typeof i.UNSAFE_componentWillMount &&
            "function" != typeof i.componentWillMount) ||
          ((t = i.state),
          "function" == typeof i.componentWillMount && i.componentWillMount(),
          "function" == typeof i.UNSAFE_componentWillMount &&
            i.UNSAFE_componentWillMount(),
          t !== i.state && dl.enqueueReplaceState(i, i.state, null),
          (o = e.updateQueue),
          null !== o && (sn(e, o, n, i, r), (i.state = e.memoizedState))),
        "function" == typeof i.componentDidMount && (e.effectTag |= 4);
    }
    function mn(e, t, n) {
      if (
        ((e = n.ref),
        null !== e && "function" != typeof e && "object" != typeof e)
      ) {
        if (n._owner) {
          if ((n = n._owner)) {
            if (1 !== n.tag) throw Error(r(309));
            var i = n.stateNode;
          }
          if (!i) throw Error(r(147, e));
          var o = "" + e;
          return null !== t &&
            null !== t.ref &&
            "function" == typeof t.ref &&
            t.ref._stringRef === o
            ? t.ref
            : ((t = function (e) {
                var t = i.refs;
                t === cl && (t = i.refs = {}),
                  null === e ? delete t[o] : (t[o] = e);
              }),
              (t._stringRef = o),
              t);
        }
        if ("string" != typeof e) throw Error(r(284));
        if (!n._owner) throw Error(r(290, e));
      }
      return e;
    }
    function gn(e, t) {
      if ("textarea" !== e.type)
        throw Error(
          r(
            31,
            "[object Object]" === Object.prototype.toString.call(t)
              ? "object with keys {" + Object.keys(t).join(", ") + "}"
              : t,
            ""
          )
        );
    }
    function bn(e) {
      function t(t, n) {
        if (e) {
          var r = t.lastEffect;
          null !== r
            ? ((r.nextEffect = n), (t.lastEffect = n))
            : (t.firstEffect = t.lastEffect = n),
            (n.nextEffect = null),
            (n.effectTag = 8);
        }
      }
      function n(n, r) {
        if (!e) return null;
        for (; null !== r; ) t(n, r), (r = r.sibling);
        return null;
      }
      function i(e, t) {
        for (e = new Map(); null !== t; )
          null !== t.key ? e.set(t.key, t) : e.set(t.index, t), (t = t.sibling);
        return e;
      }
      function o(e, t, n) {
        return (e = di(e, t, n)), (e.index = 0), (e.sibling = null), e;
      }
      function a(t, n, r) {
        return (
          (t.index = r),
          e
            ? ((r = t.alternate),
              null !== r
                ? ((r = r.index), r < n ? ((t.effectTag = 2), n) : r)
                : ((t.effectTag = 2), n))
            : n
        );
      }
      function u(t) {
        return e && null === t.alternate && (t.effectTag = 2), t;
      }
      function l(e, t, n, r) {
        return null === t || 6 !== t.tag
          ? ((t = vi(n, e.mode, r)), (t.return = e), t)
          : ((t = o(t, n, r)), (t.return = e), t);
      }
      function s(e, t, n, r) {
        return null !== t && t.elementType === n.type
          ? ((r = o(t, n.props, r)), (r.ref = mn(e, t, n)), (r.return = e), r)
          : ((r = pi(n.type, n.key, n.props, null, e.mode, r)),
            (r.ref = mn(e, t, n)),
            (r.return = e),
            r);
      }
      function f(e, t, n, r) {
        return null === t ||
          4 !== t.tag ||
          t.stateNode.containerInfo !== n.containerInfo ||
          t.stateNode.implementation !== n.implementation
          ? ((t = yi(n, e.mode, r)), (t.return = e), t)
          : ((t = o(t, n.children || [], r)), (t.return = e), t);
      }
      function c(e, t, n, r, i) {
        return null === t || 7 !== t.tag
          ? ((t = hi(n, e.mode, r, i)), (t.return = e), t)
          : ((t = o(t, n, r)), (t.return = e), t);
      }
      function d(e, t, n) {
        if ("string" == typeof t || "number" == typeof t)
          return (t = vi("" + t, e.mode, n)), (t.return = e), t;
        if ("object" == typeof t && null !== t) {
          switch (t.$$typeof) {
            case eo:
              return (
                (n = pi(t.type, t.key, t.props, null, e.mode, n)),
                (n.ref = mn(e, null, t)),
                (n.return = e),
                n
              );
            case to:
              return (t = yi(t, e.mode, n)), (t.return = e), t;
          }
          if (pl(t) || v(t))
            return (t = hi(t, e.mode, n, null)), (t.return = e), t;
          gn(e, t);
        }
        return null;
      }
      function p(e, t, n, r) {
        var i = null !== t ? t.key : null;
        if ("string" == typeof n || "number" == typeof n)
          return null !== i ? null : l(e, t, "" + n, r);
        if ("object" == typeof n && null !== n) {
          switch (n.$$typeof) {
            case eo:
              return n.key === i
                ? n.type === no
                  ? c(e, t, n.props.children, r, i)
                  : s(e, t, n, r)
                : null;
            case to:
              return n.key === i ? f(e, t, n, r) : null;
          }
          if (pl(n) || v(n)) return null !== i ? null : c(e, t, n, r, null);
          gn(e, n);
        }
        return null;
      }
      function h(e, t, n, r, i) {
        if ("string" == typeof r || "number" == typeof r)
          return (e = e.get(n) || null), l(t, e, "" + r, i);
        if ("object" == typeof r && null !== r) {
          switch (r.$$typeof) {
            case eo:
              return (
                (e = e.get(null === r.key ? n : r.key) || null),
                r.type === no
                  ? c(t, e, r.props.children, i, r.key)
                  : s(t, e, r, i)
              );
            case to:
              return (
                (e = e.get(null === r.key ? n : r.key) || null), f(t, e, r, i)
              );
          }
          if (pl(r) || v(r)) return (e = e.get(n) || null), c(t, e, r, i, null);
          gn(t, r);
        }
        return null;
      }
      function y(r, o, u, l) {
        for (
          var s = null, f = null, c = o, v = (o = 0), y = null;
          null !== c && v < u.length;
          v++
        ) {
          c.index > v ? ((y = c), (c = null)) : (y = c.sibling);
          var m = p(r, c, u[v], l);
          if (null === m) {
            null === c && (c = y);
            break;
          }
          e && c && null === m.alternate && t(r, c),
            (o = a(m, o, v)),
            null === f ? (s = m) : (f.sibling = m),
            (f = m),
            (c = y);
        }
        if (v === u.length) return n(r, c), s;
        if (null === c) {
          for (; v < u.length; v++)
            (c = d(r, u[v], l)),
              null !== c &&
                ((o = a(c, o, v)),
                null === f ? (s = c) : (f.sibling = c),
                (f = c));
          return s;
        }
        for (c = i(r, c); v < u.length; v++)
          (y = h(c, r, v, u[v], l)),
            null !== y &&
              (e &&
                null !== y.alternate &&
                c.delete(null === y.key ? v : y.key),
              (o = a(y, o, v)),
              null === f ? (s = y) : (f.sibling = y),
              (f = y));
        return (
          e &&
            c.forEach(function (e) {
              return t(r, e);
            }),
          s
        );
      }
      function m(o, u, l, s) {
        var f = v(l);
        if ("function" != typeof f) throw Error(r(150));
        if (((l = f.call(l)), null == l)) throw Error(r(151));
        for (
          var c = (f = null), y = u, m = (u = 0), g = null, b = l.next();
          null !== y && !b.done;
          m++, b = l.next()
        ) {
          y.index > m ? ((g = y), (y = null)) : (g = y.sibling);
          var _ = p(o, y, b.value, s);
          if (null === _) {
            null === y && (y = g);
            break;
          }
          e && y && null === _.alternate && t(o, y),
            (u = a(_, u, m)),
            null === c ? (f = _) : (c.sibling = _),
            (c = _),
            (y = g);
        }
        if (b.done) return n(o, y), f;
        if (null === y) {
          for (; !b.done; m++, b = l.next())
            (b = d(o, b.value, s)),
              null !== b &&
                ((u = a(b, u, m)),
                null === c ? (f = b) : (c.sibling = b),
                (c = b));
          return f;
        }
        for (y = i(o, y); !b.done; m++, b = l.next())
          (b = h(y, o, m, b.value, s)),
            null !== b &&
              (e &&
                null !== b.alternate &&
                y.delete(null === b.key ? m : b.key),
              (u = a(b, u, m)),
              null === c ? (f = b) : (c.sibling = b),
              (c = b));
        return (
          e &&
            y.forEach(function (e) {
              return t(o, e);
            }),
          f
        );
      }
      return function (e, i, a, l) {
        var s =
          "object" == typeof a && null !== a && a.type === no && null === a.key;
        s && (a = a.props.children);
        var f = "object" == typeof a && null !== a;
        if (f)
          switch (a.$$typeof) {
            case eo:
              e: {
                for (f = a.key, s = i; null !== s; ) {
                  if (s.key === f) {
                    if (
                      7 === s.tag ? a.type === no : s.elementType === a.type
                    ) {
                      n(e, s.sibling),
                        (i = o(
                          s,
                          a.type === no ? a.props.children : a.props,
                          l
                        )),
                        (i.ref = mn(e, s, a)),
                        (i.return = e),
                        (e = i);
                      break e;
                    }
                    n(e, s);
                    break;
                  }
                  t(e, s), (s = s.sibling);
                }
                a.type === no
                  ? ((i = hi(a.props.children, e.mode, l, a.key)),
                    (i.return = e),
                    (e = i))
                  : ((l = pi(a.type, a.key, a.props, null, e.mode, l)),
                    (l.ref = mn(e, i, a)),
                    (l.return = e),
                    (e = l));
              }
              return u(e);
            case to:
              e: {
                for (s = a.key; null !== i; ) {
                  if (i.key === s) {
                    if (
                      4 === i.tag &&
                      i.stateNode.containerInfo === a.containerInfo &&
                      i.stateNode.implementation === a.implementation
                    ) {
                      n(e, i.sibling),
                        (i = o(i, a.children || [], l)),
                        (i.return = e),
                        (e = i);
                      break e;
                    }
                    n(e, i);
                    break;
                  }
                  t(e, i), (i = i.sibling);
                }
                (i = yi(a, e.mode, l)), (i.return = e), (e = i);
              }
              return u(e);
          }
        if ("string" == typeof a || "number" == typeof a)
          return (
            (a = "" + a),
            null !== i && 6 === i.tag
              ? (n(e, i.sibling), (i = o(i, a, l)), (i.return = e), (e = i))
              : (n(e, i), (i = vi(a, e.mode, l)), (i.return = e), (e = i)),
            u(e)
          );
        if (pl(a)) return y(e, i, a, l);
        if (v(a)) return m(e, i, a, l);
        if ((f && gn(e, a), "undefined" == typeof a && !s))
          switch (e.tag) {
            case 1:
            case 0:
              throw (
                ((e = e.type),
                Error(r(152, e.displayName || e.name || "Component")))
              );
          }
        return n(e, i);
      };
    }
    function _n(e) {
      if (e === yl) throw Error(r(174));
      return e;
    }
    function wn(e, t) {
      Rt(bl, t, e), Rt(gl, e, e), Rt(ml, yl, e);
      var n = t.nodeType;
      switch (n) {
        case 9:
        case 11:
          t = (t = t.documentElement) ? t.namespaceURI : X(null, "");
          break;
        default:
          (n = 8 === n ? t.parentNode : t),
            (t = n.namespaceURI || null),
            (n = n.tagName),
            (t = X(t, n));
      }
      Ct(ml, e), Rt(ml, t, e);
    }
    function En(e) {
      Ct(ml, e), Ct(gl, e), Ct(bl, e);
    }
    function Sn(e) {
      _n(bl.current);
      var t = _n(ml.current),
        n = X(t, e.type);
      t !== n && (Rt(gl, e, e), Rt(ml, n, e));
    }
    function kn(e) {
      gl.current === e && (Ct(ml, e), Ct(gl, e));
    }
    function xn(e) {
      for (var t = e; null !== t; ) {
        if (13 === t.tag) {
          var n = t.memoizedState;
          if (
            null !== n &&
            ((n = n.dehydrated), null === n || n.data === Ba || n.data === Da)
          )
            return t;
        } else if (19 === t.tag && void 0 !== t.memoizedProps.revealOrder) {
          if (0 !== (64 & t.effectTag)) return t;
        } else if (null !== t.child) {
          (t.child.return = t), (t = t.child);
          continue;
        }
        if (t === e) break;
        for (; null === t.sibling; ) {
          if (null === t.return || t.return === e) return null;
          t = t.return;
        }
        (t.sibling.return = t.return), (t = t.sibling);
      }
      return null;
    }
    function Tn(e, t) {
      return {
        responder: e,
        props: t,
      };
    }
    function Pn() {
      throw Error(r(321));
    }
    function On(e, t) {
      if (null === t) return !1;
      for (var n = 0; n < t.length && n < e.length; n++)
        if (!bu(e[n], t[n])) return !1;
      return !0;
    }
    function Cn(e, t, n, i, o, a) {
      if (
        ((Sl = a),
        (kl = t),
        (Tl = null !== e ? e.memoizedState : null),
        (wl.current = null === Tl ? zl : Ul),
        (t = n(i, o)),
        Al)
      ) {
        do
          (Al = !1),
            (jl += 1),
            (Tl = null !== e ? e.memoizedState : null),
            (Cl = Pl),
            (Il = Ol = xl = null),
            (wl.current = Ul),
            (t = n(i, o));
        while (Al);
        (Nl = null), (jl = 0);
      }
      if (
        ((wl.current = Ll),
        (e = kl),
        (e.memoizedState = Pl),
        (e.expirationTime = Rl),
        (e.updateQueue = Il),
        (e.effectTag |= Ml),
        (e = null !== xl && null !== xl.next),
        (Sl = 0),
        (Cl = Ol = Pl = Tl = xl = kl = null),
        (Rl = 0),
        (Il = null),
        (Ml = 0),
        e)
      )
        throw Error(r(300));
      return t;
    }
    function Rn() {
      (wl.current = Ll),
        (Sl = 0),
        (Cl = Ol = Pl = Tl = xl = kl = null),
        (Rl = 0),
        (Il = null),
        (Ml = 0),
        (Al = !1),
        (Nl = null),
        (jl = 0);
    }
    function In() {
      var e = {
        memoizedState: null,
        baseState: null,
        queue: null,
        baseUpdate: null,
        next: null,
      };
      return null === Ol ? (Pl = Ol = e) : (Ol = Ol.next = e), Ol;
    }
    function Mn() {
      if (null !== Cl)
        (Ol = Cl),
          (Cl = Ol.next),
          (xl = Tl),
          (Tl = null !== xl ? xl.next : null);
      else {
        if (null === Tl) throw Error(r(310));
        xl = Tl;
        var e = {
          memoizedState: xl.memoizedState,
          baseState: xl.baseState,
          queue: xl.queue,
          baseUpdate: xl.baseUpdate,
          next: null,
        };
        (Ol = null === Ol ? (Pl = e) : (Ol.next = e)), (Tl = xl.next);
      }
      return Ol;
    }
    function An(e, t) {
      return "function" == typeof t ? t(e) : t;
    }
    function Nn(e) {
      var t = Mn(),
        n = t.queue;
      if (null === n) throw Error(r(311));
      if (((n.lastRenderedReducer = e), 0 < jl)) {
        var i = n.dispatch;
        if (null !== Nl) {
          var o = Nl.get(n);
          if (void 0 !== o) {
            Nl.delete(n);
            var a = t.memoizedState;
            do (a = e(a, o.action)), (o = o.next);
            while (null !== o);
            return (
              bu(a, t.memoizedState) || (Yl = !0),
              (t.memoizedState = a),
              t.baseUpdate === n.last && (t.baseState = a),
              (n.lastRenderedState = a),
              [a, i]
            );
          }
        }
        return [t.memoizedState, i];
      }
      i = n.last;
      var u = t.baseUpdate;
      if (
        ((a = t.baseState),
        null !== u
          ? (null !== i && (i.next = null), (i = u.next))
          : (i = null !== i ? i.next : null),
        null !== i)
      ) {
        var l = (o = null),
          s = i,
          f = !1;
        do {
          var c = s.expirationTime;
          c < Sl
            ? (f || ((f = !0), (l = u), (o = a)), c > Rl && ((Rl = c), Hr(Rl)))
            : (Wr(c, s.suspenseConfig),
              (a = s.eagerReducer === e ? s.eagerState : e(a, s.action))),
            (u = s),
            (s = s.next);
        } while (null !== s && s !== i);
        f || ((l = u), (o = a)),
          bu(a, t.memoizedState) || (Yl = !0),
          (t.memoizedState = a),
          (t.baseUpdate = l),
          (t.baseState = o),
          (n.lastRenderedState = a);
      }
      return [t.memoizedState, n.dispatch];
    }
    function jn(e) {
      var t = In();
      return (
        "function" == typeof e && (e = e()),
        (t.memoizedState = t.baseState = e),
        (e = t.queue =
          {
            last: null,
            dispatch: null,
            lastRenderedReducer: An,
            lastRenderedState: e,
          }),
        (e = e.dispatch = Hn.bind(null, kl, e)),
        [t.memoizedState, e]
      );
    }
    function Ln(e) {
      return Nn(An, e);
    }
    function zn(e, t, n, r) {
      return (
        (e = {
          tag: e,
          create: t,
          destroy: n,
          deps: r,
          next: null,
        }),
        null === Il
          ? ((Il = {
              lastEffect: null,
            }),
            (Il.lastEffect = e.next = e))
          : ((t = Il.lastEffect),
            null === t
              ? (Il.lastEffect = e.next = e)
              : ((n = t.next),
                (t.next = e),
                (e.next = n),
                (Il.lastEffect = e))),
        e
      );
    }
    function Un(e, t, n, r) {
      var i = In();
      (Ml |= e), (i.memoizedState = zn(t, n, void 0, void 0 === r ? null : r));
    }
    function Bn(e, t, n, r) {
      var i = Mn();
      r = void 0 === r ? null : r;
      var o = void 0;
      if (null !== xl) {
        var a = xl.memoizedState;
        if (((o = a.destroy), null !== r && On(r, a.deps)))
          return void zn(0, n, o, r);
      }
      (Ml |= e), (i.memoizedState = zn(t, n, o, r));
    }
    function Dn(e, t) {
      return Un(516, 192, e, t);
    }
    function Fn(e, t) {
      return Bn(516, 192, e, t);
    }
    function qn(e, t) {
      return "function" == typeof t
        ? ((e = e()),
          t(e),
          function () {
            t(null);
          })
        : null !== t && void 0 !== t
        ? ((e = e()),
          (t.current = e),
          function () {
            t.current = null;
          })
        : void 0;
    }
    function Yn() {}
    function Kn(e, t) {
      return (In().memoizedState = [e, void 0 === t ? null : t]), e;
    }
    function Wn(e, t) {
      var n = Mn();
      t = void 0 === t ? null : t;
      var r = n.memoizedState;
      return null !== r && null !== t && On(t, r[1])
        ? r[0]
        : ((n.memoizedState = [e, t]), e);
    }
    function Hn(e, t, n) {
      if (!(25 > jl)) throw Error(r(301));
      var i = e.alternate;
      if (e === kl || (null !== i && i === kl))
        if (
          ((Al = !0),
          (e = {
            expirationTime: Sl,
            suspenseConfig: null,
            action: n,
            eagerReducer: null,
            eagerState: null,
            next: null,
          }),
          null === Nl && (Nl = new Map()),
          (n = Nl.get(t)),
          void 0 === n)
        )
          Nl.set(t, e);
        else {
          for (t = n; null !== t.next; ) t = t.next;
          t.next = e;
        }
      else {
        var o = Ir(),
          a = fl.suspense;
        (o = Mr(o, e, a)),
          (a = {
            expirationTime: o,
            suspenseConfig: a,
            action: n,
            eagerReducer: null,
            eagerState: null,
            next: null,
          });
        var u = t.last;
        if (null === u) a.next = a;
        else {
          var l = u.next;
          null !== l && (a.next = l), (u.next = a);
        }
        if (
          ((t.last = a),
          0 === e.expirationTime &&
            (null === i || 0 === i.expirationTime) &&
            ((i = t.lastRenderedReducer), null !== i))
        )
          try {
            var s = t.lastRenderedState,
              f = i(s, n);
            if (((a.eagerReducer = i), (a.eagerState = f), bu(f, s))) return;
          } catch (e) {
          } finally {
          }
        Ar(e, o);
      }
    }
    function Vn(e, t) {
      var n = si(5, null, null, 0);
      (n.elementType = "DELETED"),
        (n.type = "DELETED"),
        (n.stateNode = t),
        (n.return = e),
        (n.effectTag = 8),
        null !== e.lastEffect
          ? ((e.lastEffect.nextEffect = n), (e.lastEffect = n))
          : (e.firstEffect = e.lastEffect = n);
    }
    function Qn(e, t) {
      switch (e.tag) {
        case 5:
          var n = e.type;
          return (
            (t =
              1 !== t.nodeType || n.toLowerCase() !== t.nodeName.toLowerCase()
                ? null
                : t),
            null !== t && ((e.stateNode = t), !0)
          );
        case 6:
          return (
            (t = "" === e.pendingProps || 3 !== t.nodeType ? null : t),
            null !== t && ((e.stateNode = t), !0)
          );
        case 13:
          return !1;
        default:
          return !1;
      }
    }
    function $n(e) {
      if (Fl) {
        var t = Dl;
        if (t) {
          var n = t;
          if (!Qn(e, t)) {
            if (((t = it(n.nextSibling)), !t || !Qn(e, t)))
              return (
                (e.effectTag = (e.effectTag & -1025) | 2),
                (Fl = !1),
                void (Bl = e)
              );
            Vn(Bl, n);
          }
          (Bl = e), (Dl = it(t.firstChild));
        } else (e.effectTag = (e.effectTag & -1025) | 2), (Fl = !1), (Bl = e);
      }
    }
    function Jn(e) {
      for (
        e = e.return;
        null !== e && 5 !== e.tag && 3 !== e.tag && 13 !== e.tag;

      )
        e = e.return;
      Bl = e;
    }
    function Xn(e) {
      if (e !== Bl) return !1;
      if (!Fl) return Jn(e), (Fl = !0), !1;
      var t = e.type;
      if (
        5 !== e.tag ||
        ("head" !== t && "body" !== t && !rt(t, e.memoizedProps))
      )
        for (t = Dl; t; ) Vn(e, t), (t = it(t.nextSibling));
      if ((Jn(e), 13 === e.tag)) {
        if (((e = e.memoizedState), (e = null !== e ? e.dehydrated : null), !e))
          throw Error(r(317));
        e: {
          for (e = e.nextSibling, t = 0; e; ) {
            if (8 === e.nodeType) {
              var n = e.data;
              if (n === Ua) {
                if (0 === t) {
                  Dl = it(e.nextSibling);
                  break e;
                }
                t--;
              } else (n !== za && n !== Da && n !== Ba) || t++;
            }
            e = e.nextSibling;
          }
          Dl = null;
        }
      } else Dl = Bl ? it(e.stateNode.nextSibling) : null;
      return !0;
    }
    function Gn() {
      (Dl = Bl = null), (Fl = !1);
    }
    function Zn(e, t, n, r) {
      t.child = null === e ? vl(t, null, n, r) : hl(t, e.child, n, r);
    }
    function er(e, t, n, r, i) {
      n = n.render;
      var o = t.ref;
      return (
        Gt(t, i),
        (r = Cn(e, t, n, r, o, i)),
        null === e || Yl
          ? ((t.effectTag |= 1), Zn(e, t, r, i), t.child)
          : ((t.updateQueue = e.updateQueue),
            (t.effectTag &= -517),
            e.expirationTime <= i && (e.expirationTime = 0),
            dr(e, t, i))
      );
    }
    function tr(e, t, n, r, i, o) {
      if (null === e) {
        var a = n.type;
        return "function" != typeof a ||
          fi(a) ||
          void 0 !== a.defaultProps ||
          null !== n.compare ||
          void 0 !== n.defaultProps
          ? ((e = pi(n.type, null, r, null, t.mode, o)),
            (e.ref = t.ref),
            (e.return = t),
            (t.child = e))
          : ((t.tag = 15), (t.type = a), nr(e, t, a, r, i, o));
      }
      return (
        (a = e.child),
        i < o &&
        ((i = a.memoizedProps),
        (n = n.compare),
        (n = null !== n ? n : Pt),
        n(i, r) && e.ref === t.ref)
          ? dr(e, t, o)
          : ((t.effectTag |= 1),
            (e = di(a, r, o)),
            (e.ref = t.ref),
            (e.return = t),
            (t.child = e))
      );
    }
    function nr(e, t, n, r, i, o) {
      return null !== e &&
        Pt(e.memoizedProps, r) &&
        e.ref === t.ref &&
        ((Yl = !1), i < o)
        ? dr(e, t, o)
        : ir(e, t, n, r, o);
    }
    function rr(e, t) {
      var n = t.ref;
      ((null === e && null !== n) || (null !== e && e.ref !== n)) &&
        (t.effectTag |= 128);
    }
    function ir(e, t, n, r, i) {
      var o = Mt(n) ? Uu : Lu.current;
      return (
        (o = It(t, o)),
        Gt(t, i),
        (n = Cn(e, t, n, r, o, i)),
        null === e || Yl
          ? ((t.effectTag |= 1), Zn(e, t, n, i), t.child)
          : ((t.updateQueue = e.updateQueue),
            (t.effectTag &= -517),
            e.expirationTime <= i && (e.expirationTime = 0),
            dr(e, t, i))
      );
    }
    function or(e, t, n, r, i) {
      if (Mt(n)) {
        var o = !0;
        zt(t);
      } else o = !1;
      if ((Gt(t, i), null === t.stateNode))
        null !== e &&
          ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
          hn(t, n, r, i),
          yn(t, n, r, i),
          (r = !0);
      else if (null === e) {
        var a = t.stateNode,
          u = t.memoizedProps;
        a.props = u;
        var l = a.context,
          s = n.contextType;
        "object" == typeof s && null !== s
          ? (s = Zt(s))
          : ((s = Mt(n) ? Uu : Lu.current), (s = It(t, s)));
        var f = n.getDerivedStateFromProps,
          c =
            "function" == typeof f ||
            "function" == typeof a.getSnapshotBeforeUpdate;
        c ||
          ("function" != typeof a.UNSAFE_componentWillReceiveProps &&
            "function" != typeof a.componentWillReceiveProps) ||
          ((u !== r || l !== s) && vn(t, a, r, s)),
          (sl = !1);
        var d = t.memoizedState;
        l = a.state = d;
        var p = t.updateQueue;
        null !== p && (sn(t, p, r, a, i), (l = t.memoizedState)),
          u !== r || d !== l || zu.current || sl
            ? ("function" == typeof f &&
                (dn(t, n, f, r), (l = t.memoizedState)),
              (u = sl || pn(t, n, u, r, d, l, s))
                ? (c ||
                    ("function" != typeof a.UNSAFE_componentWillMount &&
                      "function" != typeof a.componentWillMount) ||
                    ("function" == typeof a.componentWillMount &&
                      a.componentWillMount(),
                    "function" == typeof a.UNSAFE_componentWillMount &&
                      a.UNSAFE_componentWillMount()),
                  "function" == typeof a.componentDidMount &&
                    (t.effectTag |= 4))
                : ("function" == typeof a.componentDidMount &&
                    (t.effectTag |= 4),
                  (t.memoizedProps = r),
                  (t.memoizedState = l)),
              (a.props = r),
              (a.state = l),
              (a.context = s),
              (r = u))
            : ("function" == typeof a.componentDidMount && (t.effectTag |= 4),
              (r = !1));
      } else
        (a = t.stateNode),
          (u = t.memoizedProps),
          (a.props = t.type === t.elementType ? u : Vt(t.type, u)),
          (l = a.context),
          (s = n.contextType),
          "object" == typeof s && null !== s
            ? (s = Zt(s))
            : ((s = Mt(n) ? Uu : Lu.current), (s = It(t, s))),
          (f = n.getDerivedStateFromProps),
          (c =
            "function" == typeof f ||
            "function" == typeof a.getSnapshotBeforeUpdate) ||
            ("function" != typeof a.UNSAFE_componentWillReceiveProps &&
              "function" != typeof a.componentWillReceiveProps) ||
            ((u !== r || l !== s) && vn(t, a, r, s)),
          (sl = !1),
          (l = t.memoizedState),
          (d = a.state = l),
          (p = t.updateQueue),
          null !== p && (sn(t, p, r, a, i), (d = t.memoizedState)),
          u !== r || l !== d || zu.current || sl
            ? ("function" == typeof f &&
                (dn(t, n, f, r), (d = t.memoizedState)),
              (f = sl || pn(t, n, u, r, l, d, s))
                ? (c ||
                    ("function" != typeof a.UNSAFE_componentWillUpdate &&
                      "function" != typeof a.componentWillUpdate) ||
                    ("function" == typeof a.componentWillUpdate &&
                      a.componentWillUpdate(r, d, s),
                    "function" == typeof a.UNSAFE_componentWillUpdate &&
                      a.UNSAFE_componentWillUpdate(r, d, s)),
                  "function" == typeof a.componentDidUpdate &&
                    (t.effectTag |= 4),
                  "function" == typeof a.getSnapshotBeforeUpdate &&
                    (t.effectTag |= 256))
                : ("function" != typeof a.componentDidUpdate ||
                    (u === e.memoizedProps && l === e.memoizedState) ||
                    (t.effectTag |= 4),
                  "function" != typeof a.getSnapshotBeforeUpdate ||
                    (u === e.memoizedProps && l === e.memoizedState) ||
                    (t.effectTag |= 256),
                  (t.memoizedProps = r),
                  (t.memoizedState = d)),
              (a.props = r),
              (a.state = d),
              (a.context = s),
              (r = f))
            : ("function" != typeof a.componentDidUpdate ||
                (u === e.memoizedProps && l === e.memoizedState) ||
                (t.effectTag |= 4),
              "function" != typeof a.getSnapshotBeforeUpdate ||
                (u === e.memoizedProps && l === e.memoizedState) ||
                (t.effectTag |= 256),
              (r = !1));
      return ar(e, t, n, r, o, i);
    }
    function ar(e, t, n, r, i, o) {
      rr(e, t);
      var a = 0 !== (64 & t.effectTag);
      if (!r && !a) return i && Ut(t, n, !1), dr(e, t, o);
      (r = t.stateNode), (ql.current = t);
      var u =
        a && "function" != typeof n.getDerivedStateFromError
          ? null
          : r.render();
      return (
        (t.effectTag |= 1),
        null !== e && a
          ? ((t.child = hl(t, e.child, null, o)), (t.child = hl(t, null, u, o)))
          : Zn(e, t, u, o),
        (t.memoizedState = r.state),
        i && Ut(t, n, !0),
        t.child
      );
    }
    function ur(e) {
      var t = e.stateNode;
      t.pendingContext
        ? jt(e, t.pendingContext, t.pendingContext !== t.context)
        : t.context && jt(e, t.context, !1),
        wn(e, t.containerInfo);
    }
    function lr(e, t, n) {
      var r,
        i = t.mode,
        o = t.pendingProps,
        a = _l.current,
        u = !1;
      if (
        ((r = 0 !== (64 & t.effectTag)) ||
          (r = 0 !== (2 & a) && (null === e || null !== e.memoizedState)),
        r
          ? ((u = !0), (t.effectTag &= -65))
          : (null !== e && null === e.memoizedState) ||
            void 0 === o.fallback ||
            !0 === o.unstable_avoidThisFallback ||
            (a |= 1),
        Rt(_l, 1 & a, t),
        null === e)
      ) {
        if ((void 0 !== o.fallback && $n(t), u)) {
          if (
            ((u = o.fallback),
            (o = hi(null, i, 0, null)),
            (o.return = t),
            0 === (2 & t.mode))
          )
            for (
              e = null !== t.memoizedState ? t.child.child : t.child,
                o.child = e;
              null !== e;

            )
              (e.return = o), (e = e.sibling);
          return (
            (n = hi(u, i, n, null)),
            (n.return = t),
            (o.sibling = n),
            (t.memoizedState = Kl),
            (t.child = o),
            n
          );
        }
        return (
          (i = o.children),
          (t.memoizedState = null),
          (t.child = vl(t, null, i, n))
        );
      }
      if (null !== e.memoizedState) {
        if (((e = e.child), (i = e.sibling), u)) {
          if (
            ((o = o.fallback),
            (n = di(e, e.pendingProps, 0)),
            (n.return = t),
            0 === (2 & t.mode) &&
              ((u = null !== t.memoizedState ? t.child.child : t.child),
              u !== e.child))
          )
            for (n.child = u; null !== u; ) (u.return = n), (u = u.sibling);
          return (
            (i = di(i, o, i.expirationTime)),
            (i.return = t),
            (n.sibling = i),
            (n.childExpirationTime = 0),
            (t.memoizedState = Kl),
            (t.child = n),
            i
          );
        }
        return (
          (n = hl(t, e.child, o.children, n)),
          (t.memoizedState = null),
          (t.child = n)
        );
      }
      if (((e = e.child), u)) {
        if (
          ((u = o.fallback),
          (o = hi(null, i, 0, null)),
          (o.return = t),
          (o.child = e),
          null !== e && (e.return = o),
          0 === (2 & t.mode))
        )
          for (
            e = null !== t.memoizedState ? t.child.child : t.child, o.child = e;
            null !== e;

          )
            (e.return = o), (e = e.sibling);
        return (
          (n = hi(u, i, n, null)),
          (n.return = t),
          (o.sibling = n),
          (n.effectTag |= 2),
          (o.childExpirationTime = 0),
          (t.memoizedState = Kl),
          (t.child = o),
          n
        );
      }
      return (t.memoizedState = null), (t.child = hl(t, e, o.children, n));
    }
    function sr(e, t) {
      e.expirationTime < t && (e.expirationTime = t);
      var n = e.alternate;
      null !== n && n.expirationTime < t && (n.expirationTime = t),
        Xt(e.return, t);
    }
    function fr(e, t, n, r, i, o) {
      var a = e.memoizedState;
      null === a
        ? (e.memoizedState = {
            isBackwards: t,
            rendering: null,
            last: r,
            tail: n,
            tailExpiration: 0,
            tailMode: i,
            lastEffect: o,
          })
        : ((a.isBackwards = t),
          (a.rendering = null),
          (a.last = r),
          (a.tail = n),
          (a.tailExpiration = 0),
          (a.tailMode = i),
          (a.lastEffect = o));
    }
    function cr(e, t, n) {
      var r = t.pendingProps,
        i = r.revealOrder,
        o = r.tail;
      if ((Zn(e, t, r.children, n), (r = _l.current), 0 !== (2 & r)))
        (r = (1 & r) | 2), (t.effectTag |= 64);
      else {
        if (null !== e && 0 !== (64 & e.effectTag))
          e: for (e = t.child; null !== e; ) {
            if (13 === e.tag) null !== e.memoizedState && sr(e, n);
            else if (19 === e.tag) sr(e, n);
            else if (null !== e.child) {
              (e.child.return = e), (e = e.child);
              continue;
            }
            if (e === t) break e;
            for (; null === e.sibling; ) {
              if (null === e.return || e.return === t) break e;
              e = e.return;
            }
            (e.sibling.return = e.return), (e = e.sibling);
          }
        r &= 1;
      }
      if ((Rt(_l, r, t), 0 === (2 & t.mode))) t.memoizedState = null;
      else
        switch (i) {
          case "forwards":
            for (n = t.child, i = null; null !== n; )
              (e = n.alternate),
                null !== e && null === xn(e) && (i = n),
                (n = n.sibling);
            (n = i),
              null === n
                ? ((i = t.child), (t.child = null))
                : ((i = n.sibling), (n.sibling = null)),
              fr(t, !1, i, n, o, t.lastEffect);
            break;
          case "backwards":
            for (n = null, i = t.child, t.child = null; null !== i; ) {
              if (((e = i.alternate), null !== e && null === xn(e))) {
                t.child = i;
                break;
              }
              (e = i.sibling), (i.sibling = n), (n = i), (i = e);
            }
            fr(t, !0, n, null, o, t.lastEffect);
            break;
          case "together":
            fr(t, !1, null, null, void 0, t.lastEffect);
            break;
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function dr(e, t, n) {
      null !== e && (t.dependencies = e.dependencies);
      var i = t.expirationTime;
      if ((0 !== i && Hr(i), t.childExpirationTime < n)) return null;
      if (null !== e && t.child !== e.child) throw Error(r(153));
      if (null !== t.child) {
        for (
          e = t.child,
            n = di(e, e.pendingProps, e.expirationTime),
            t.child = n,
            n.return = t;
          null !== e.sibling;

        )
          (e = e.sibling),
            (n = n.sibling = di(e, e.pendingProps, e.expirationTime)),
            (n.return = t);
        n.sibling = null;
      }
      return t.child;
    }
    function pr(e) {
      e.effectTag |= 4;
    }
    function hr(e, t) {
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var n = null; null !== t; )
            null !== t.alternate && (n = t), (t = t.sibling);
          null === n ? (e.tail = null) : (n.sibling = null);
          break;
        case "collapsed":
          n = e.tail;
          for (var r = null; null !== n; )
            null !== n.alternate && (r = n), (n = n.sibling);
          null === r
            ? t || null === e.tail
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (r.sibling = null);
      }
    }
    function vr(e) {
      switch (e.tag) {
        case 1:
          Mt(e.type) && At(e);
          var t = e.effectTag;
          return 4096 & t ? ((e.effectTag = (t & -4097) | 64), e) : null;
        case 3:
          if ((En(e), Nt(e), (t = e.effectTag), 0 !== (64 & t)))
            throw Error(r(285));
          return (e.effectTag = (t & -4097) | 64), e;
        case 5:
          return kn(e), null;
        case 13:
          return (
            Ct(_l, e),
            (t = e.effectTag),
            4096 & t ? ((e.effectTag = (t & -4097) | 64), e) : null
          );
        case 19:
          return Ct(_l, e), null;
        case 4:
          return En(e), null;
        case 10:
          return Jt(e), null;
        default:
          return null;
      }
    }
    function yr(e, t) {
      return {
        value: e,
        source: t,
        stack: g(t),
      };
    }
    function mr(e, t) {
      var n = t.source,
        r = t.stack;
      null === r && null !== n && (r = g(n)),
        null !== n && m(n.type),
        (t = t.value),
        null !== e && 1 === e.tag && m(e.type);
      try {
        console.error(t);
      } catch (e) {
        setTimeout(function () {
          throw e;
        });
      }
    }
    function gr(e, t) {
      try {
        (t.props = e.memoizedProps),
          (t.state = e.memoizedState),
          t.componentWillUnmount();
      } catch (t) {
        ii(e, t);
      }
    }
    function br(e) {
      var t = e.ref;
      if (null !== t)
        if ("function" == typeof t)
          try {
            t(null);
          } catch (t) {
            ii(e, t);
          }
        else t.current = null;
    }
    function _r(e, t) {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          wr(2, 0, t);
          break;
        case 1:
          if (256 & t.effectTag && null !== e) {
            var n = e.memoizedProps,
              i = e.memoizedState;
            (e = t.stateNode),
              (t = e.getSnapshotBeforeUpdate(
                t.elementType === t.type ? n : Vt(t.type, n),
                i
              )),
              (e.__reactInternalSnapshotBeforeUpdate = t);
          }
          break;
        case 3:
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(r(163));
      }
    }
    function wr(e, t, n) {
      if (
        ((n = n.updateQueue),
        (n = null !== n ? n.lastEffect : null),
        null !== n)
      ) {
        var r = (n = n.next);
        do {
          if (0 !== (r.tag & e)) {
            var i = r.destroy;
            (r.destroy = void 0), void 0 !== i && i();
          }
          0 !== (r.tag & t) && ((i = r.create), (r.destroy = i())),
            (r = r.next);
        } while (r !== n);
      }
    }
    function Er(e, t, n) {
      switch (("function" == typeof Ms && Ms(t), t.tag)) {
        case 0:
        case 11:
        case 14:
        case 15:
          if (
            ((e = t.updateQueue),
            null !== e && ((e = e.lastEffect), null !== e))
          ) {
            var r = e.next;
            Ft(97 < n ? 97 : n, function () {
              var e = r;
              do {
                var n = e.destroy;
                if (void 0 !== n) {
                  var i = t;
                  try {
                    n();
                  } catch (e) {
                    ii(i, e);
                  }
                }
                e = e.next;
              } while (e !== r);
            });
          }
          break;
        case 1:
          br(t),
            (n = t.stateNode),
            "function" == typeof n.componentWillUnmount && gr(t, n);
          break;
        case 5:
          br(t);
          break;
        case 4:
          Tr(e, t, n);
      }
    }
    function Sr(e) {
      var t = e.alternate;
      (e.return = null),
        (e.child = null),
        (e.memoizedState = null),
        (e.updateQueue = null),
        (e.dependencies = null),
        (e.alternate = null),
        (e.firstEffect = null),
        (e.lastEffect = null),
        (e.pendingProps = null),
        (e.memoizedProps = null),
        null !== t && Sr(t);
    }
    function kr(e) {
      return 5 === e.tag || 3 === e.tag || 4 === e.tag;
    }
    function xr(e) {
      e: {
        for (var t = e.return; null !== t; ) {
          if (kr(t)) {
            var n = t;
            break e;
          }
          t = t.return;
        }
        throw Error(r(160));
      }
      switch (((t = n.stateNode), n.tag)) {
        case 5:
          var i = !1;
          break;
        case 3:
          (t = t.containerInfo), (i = !0);
          break;
        case 4:
          (t = t.containerInfo), (i = !0);
          break;
        default:
          throw Error(r(161));
      }
      16 & n.effectTag && (G(t, ""), (n.effectTag &= -17));
      e: t: for (n = e; ; ) {
        for (; null === n.sibling; ) {
          if (null === n.return || kr(n.return)) {
            n = null;
            break e;
          }
          n = n.return;
        }
        for (
          n.sibling.return = n.return, n = n.sibling;
          5 !== n.tag && 6 !== n.tag && 18 !== n.tag;

        ) {
          if (2 & n.effectTag) continue t;
          if (null === n.child || 4 === n.tag) continue t;
          (n.child.return = n), (n = n.child);
        }
        if (!(2 & n.effectTag)) {
          n = n.stateNode;
          break e;
        }
      }
      for (var o = e; ; ) {
        var a = 5 === o.tag || 6 === o.tag;
        if (a) {
          var u = a ? o.stateNode : o.stateNode.instance;
          if (n)
            if (i) {
              a = t;
              var l = u;
              (u = n),
                8 === a.nodeType
                  ? a.parentNode.insertBefore(l, u)
                  : a.insertBefore(l, u);
            } else t.insertBefore(u, n);
          else
            i
              ? ((l = t),
                8 === l.nodeType
                  ? ((a = l.parentNode), a.insertBefore(u, l))
                  : ((a = l), a.appendChild(u)),
                (l = l._reactRootContainer),
                (null !== l && void 0 !== l) ||
                  null !== a.onclick ||
                  (a.onclick = $e))
              : t.appendChild(u);
        } else if (4 !== o.tag && null !== o.child) {
          (o.child.return = o), (o = o.child);
          continue;
        }
        if (o === e) break;
        for (; null === o.sibling; ) {
          if (null === o.return || o.return === e) return;
          o = o.return;
        }
        (o.sibling.return = o.return), (o = o.sibling);
      }
    }
    function Tr(e, t, n) {
      for (var i, o, a = t, u = !1; ; ) {
        if (!u) {
          u = a.return;
          e: for (;;) {
            if (null === u) throw Error(r(160));
            switch (((i = u.stateNode), u.tag)) {
              case 5:
                o = !1;
                break e;
              case 3:
                (i = i.containerInfo), (o = !0);
                break e;
              case 4:
                (i = i.containerInfo), (o = !0);
                break e;
            }
            u = u.return;
          }
          u = !0;
        }
        if (5 === a.tag || 6 === a.tag) {
          e: for (var l = e, s = a, f = n, c = s; ; )
            if ((Er(l, c, f), null !== c.child && 4 !== c.tag))
              (c.child.return = c), (c = c.child);
            else {
              if (c === s) break;
              for (; null === c.sibling; ) {
                if (null === c.return || c.return === s) break e;
                c = c.return;
              }
              (c.sibling.return = c.return), (c = c.sibling);
            }
          o
            ? ((l = i),
              (s = a.stateNode),
              8 === l.nodeType ? l.parentNode.removeChild(s) : l.removeChild(s))
            : i.removeChild(a.stateNode);
        } else if (4 === a.tag) {
          if (null !== a.child) {
            (i = a.stateNode.containerInfo),
              (o = !0),
              (a.child.return = a),
              (a = a.child);
            continue;
          }
        } else if ((Er(e, a, n), null !== a.child)) {
          (a.child.return = a), (a = a.child);
          continue;
        }
        if (a === t) break;
        for (; null === a.sibling; ) {
          if (null === a.return || a.return === t) return;
          (a = a.return), 4 === a.tag && (u = !1);
        }
        (a.sibling.return = a.return), (a = a.sibling);
      }
    }
    function Pr(e, t) {
      switch (t.tag) {
        case 0:
        case 11:
        case 14:
        case 15:
          wr(4, 8, t);
          break;
        case 1:
          break;
        case 5:
          var n = t.stateNode;
          if (null != n) {
            var i = t.memoizedProps,
              o = null !== e ? e.memoizedProps : i;
            e = t.type;
            var a = t.updateQueue;
            if (((t.updateQueue = null), null !== a)) {
              for (
                n[Va] = i,
                  "input" === e &&
                    "radio" === i.type &&
                    null != i.name &&
                    B(n, i),
                  Ve(e, o),
                  t = Ve(e, i),
                  o = 0;
                o < a.length;
                o += 2
              ) {
                var u = a[o],
                  l = a[o + 1];
                "style" === u
                  ? We(n, l)
                  : "dangerouslySetInnerHTML" === u
                  ? Ro(n, l)
                  : "children" === u
                  ? G(n, l)
                  : M(n, u, l, t);
              }
              switch (e) {
                case "input":
                  D(n, i);
                  break;
                case "textarea":
                  Q(n, i);
                  break;
                case "select":
                  (t = n._wrapperState.wasMultiple),
                    (n._wrapperState.wasMultiple = !!i.multiple),
                    (e = i.value),
                    null != e
                      ? W(n, !!i.multiple, e, !1)
                      : t !== !!i.multiple &&
                        (null != i.defaultValue
                          ? W(n, !!i.multiple, i.defaultValue, !0)
                          : W(n, !!i.multiple, i.multiple ? [] : "", !1));
              }
            }
          }
          break;
        case 6:
          if (null === t.stateNode) throw Error(r(162));
          t.stateNode.nodeValue = t.memoizedProps;
          break;
        case 3:
          (t = t.stateNode),
            t.hydrate && ((t.hydrate = !1), ye(t.containerInfo));
          break;
        case 12:
          break;
        case 13:
          if (
            ((n = t),
            null === t.memoizedState
              ? (i = !1)
              : ((i = !0), (n = t.child), (gs = rl())),
            null !== n)
          )
            e: for (e = n; ; ) {
              if (5 === e.tag)
                (a = e.stateNode),
                  i
                    ? ((a = a.style),
                      "function" == typeof a.setProperty
                        ? a.setProperty("display", "none", "important")
                        : (a.display = "none"))
                    : ((a = e.stateNode),
                      (o = e.memoizedProps.style),
                      (o =
                        void 0 !== o &&
                        null !== o &&
                        o.hasOwnProperty("display")
                          ? o.display
                          : null),
                      (a.style.display = Ke("display", o)));
              else if (6 === e.tag)
                e.stateNode.nodeValue = i ? "" : e.memoizedProps;
              else {
                if (
                  13 === e.tag &&
                  null !== e.memoizedState &&
                  null === e.memoizedState.dehydrated
                ) {
                  (a = e.child.sibling), (a.return = e), (e = a);
                  continue;
                }
                if (null !== e.child) {
                  (e.child.return = e), (e = e.child);
                  continue;
                }
              }
              if (e === n) break e;
              for (; null === e.sibling; ) {
                if (null === e.return || e.return === n) break e;
                e = e.return;
              }
              (e.sibling.return = e.return), (e = e.sibling);
            }
          Or(t);
          break;
        case 19:
          Or(t);
          break;
        case 17:
          break;
        case 20:
          break;
        case 21:
          break;
        default:
          throw Error(r(163));
      }
    }
    function Or(e) {
      var t = e.updateQueue;
      if (null !== t) {
        e.updateQueue = null;
        var n = e.stateNode;
        null === n && (n = e.stateNode = new Hl()),
          t.forEach(function (t) {
            var r = ai.bind(null, e, t);
            n.has(t) || (n.add(t), t.then(r, r));
          });
      }
    }
    function Cr(e, t, n) {
      (n = nn(n, null)),
        (n.tag = 3),
        (n.payload = {
          element: null,
        });
      var r = t.value;
      return (
        (n.callback = function () {
          ws || ((ws = !0), (Es = r)), mr(e, t);
        }),
        n
      );
    }
    function Rr(e, t, n) {
      (n = nn(n, null)), (n.tag = 3);
      var r = e.type.getDerivedStateFromError;
      if ("function" == typeof r) {
        var i = t.value;
        n.payload = function () {
          return mr(e, t), r(i);
        };
      }
      var o = e.stateNode;
      return (
        null !== o &&
          "function" == typeof o.componentDidCatch &&
          (n.callback = function () {
            "function" != typeof r &&
              (null === Ss ? (Ss = new Set([this])) : Ss.add(this), mr(e, t));
            var n = t.stack;
            this.componentDidCatch(t.value, {
              componentStack: null !== n ? n : "",
            });
          }),
        n
      );
    }
    function Ir() {
      return (us & (Zl | es)) !== Xl
        ? 1073741821 - ((rl() / 10) | 0)
        : 0 !== Rs
        ? Rs
        : (Rs = 1073741821 - ((rl() / 10) | 0));
    }
    function Mr(e, t, n) {
      if (((t = t.mode), 0 === (2 & t))) return 1073741823;
      var i = Bt();
      if (0 === (4 & t)) return 99 === i ? 1073741823 : 1073741822;
      if ((us & Zl) !== Xl) return fs;
      if (null !== n) e = Ht(e, 0 | n.timeoutMs || 5e3, 250);
      else
        switch (i) {
          case 99:
            e = 1073741823;
            break;
          case 98:
            e = Ht(e, 150, 100);
            break;
          case 97:
          case 96:
            e = Ht(e, 5e3, 250);
            break;
          case 95:
            e = 2;
            break;
          default:
            throw Error(r(326));
        }
      return null !== ls && e === fs && --e, e;
    }
    function Ar(e, t) {
      if (50 < Os) throw ((Os = 0), (Cs = null), Error(r(185)));
      if (((e = Nr(e, t)), null !== e)) {
        var n = Bt();
        1073741823 === t
          ? (us & Gl) !== Xl && (us & (Zl | es)) === Xl
            ? Ur(e)
            : (Lr(e), us === Xl && Kt())
          : Lr(e),
          (4 & us) === Xl ||
            (98 !== n && 99 !== n) ||
            (null === Ps
              ? (Ps = new Map([[e, t]]))
              : ((n = Ps.get(e)), (void 0 === n || n > t) && Ps.set(e, t)));
      }
    }
    function Nr(e, t) {
      e.expirationTime < t && (e.expirationTime = t);
      var n = e.alternate;
      null !== n && n.expirationTime < t && (n.expirationTime = t);
      var r = e.return,
        i = null;
      if (null === r && 3 === e.tag) i = e.stateNode;
      else
        for (; null !== r; ) {
          if (
            ((n = r.alternate),
            r.childExpirationTime < t && (r.childExpirationTime = t),
            null !== n &&
              n.childExpirationTime < t &&
              (n.childExpirationTime = t),
            null === r.return && 3 === r.tag)
          ) {
            i = r.stateNode;
            break;
          }
          r = r.return;
        }
      return (
        null !== i && (ls === i && (Hr(t), cs === os && bi(i, fs)), _i(i, t)), i
      );
    }
    function jr(e) {
      var t = e.lastExpiredTime;
      return 0 !== t
        ? t
        : ((t = e.firstPendingTime),
          gi(e, t)
            ? ((t = e.lastPingedTime),
              (e = e.nextKnownPendingLevel),
              t > e ? t : e)
            : t);
    }
    function Lr(e) {
      if (0 !== e.lastExpiredTime)
        (e.callbackExpirationTime = 1073741823),
          (e.callbackPriority = 99),
          (e.callbackNode = Yt(Ur.bind(null, e)));
      else {
        var t = jr(e),
          n = e.callbackNode;
        if (0 === t)
          null !== n &&
            ((e.callbackNode = null),
            (e.callbackExpirationTime = 0),
            (e.callbackPriority = 90));
        else {
          var r = Ir();
          if (
            (1073741823 === t
              ? (r = 99)
              : 1 === t || 2 === t
              ? (r = 95)
              : ((r = 10 * (1073741821 - t) - 10 * (1073741821 - r)),
                (r = 0 >= r ? 99 : 250 >= r ? 98 : 5250 >= r ? 97 : 95)),
            null !== n)
          ) {
            var i = e.callbackPriority;
            if (e.callbackExpirationTime === t && i >= r) return;
            n !== Xu && Fu(n);
          }
          (e.callbackExpirationTime = t),
            (e.callbackPriority = r),
            (t =
              1073741823 === t
                ? Yt(Ur.bind(null, e))
                : qt(r, zr.bind(null, e), {
                    timeout: 10 * (1073741821 - t) - rl(),
                  })),
            (e.callbackNode = t);
        }
      }
    }
    function zr(e, t) {
      if (((Rs = 0), t)) return (t = Ir()), wi(e, t), Lr(e), null;
      var n = jr(e);
      if (0 !== n) {
        if (((t = e.callbackNode), (us & (Zl | es)) !== Xl))
          throw Error(r(327));
        if ((ti(), (e === ls && n === fs) || qr(e, n), null !== ss)) {
          var i = us;
          us |= Zl;
          for (var o = Kr(e); ; )
            try {
              Qr();
              break;
            } catch (t) {
              Yr(e, t);
            }
          if ((Qt(), (us = i), ($l.current = o), cs === ns))
            throw ((t = ds), qr(e, n), bi(e, n), Lr(e), t);
          if (null === ss)
            switch (
              ((o = e.finishedWork = e.current.alternate),
              (e.finishedExpirationTime = n),
              (i = cs),
              (ls = null),
              i)
            ) {
              case ts:
              case ns:
                throw Error(r(345));
              case rs:
                wi(e, 2 < n ? 2 : n);
                break;
              case is:
                if (
                  (bi(e, n),
                  (i = e.lastSuspendedTime),
                  n === i && (e.nextKnownPendingLevel = Xr(o)),
                  1073741823 === ps && ((o = gs + bs - rl()), 10 < o))
                ) {
                  if (ms) {
                    var a = e.lastPingedTime;
                    if (0 === a || a >= n) {
                      (e.lastPingedTime = n), qr(e, n);
                      break;
                    }
                  }
                  if (((a = jr(e)), 0 !== a && a !== n)) break;
                  if (0 !== i && i !== n) {
                    e.lastPingedTime = i;
                    break;
                  }
                  e.timeoutHandle = Ya(Gr.bind(null, e), o);
                  break;
                }
                Gr(e);
                break;
              case os:
                if (
                  (bi(e, n),
                  (i = e.lastSuspendedTime),
                  n === i && (e.nextKnownPendingLevel = Xr(o)),
                  ms && ((o = e.lastPingedTime), 0 === o || o >= n))
                ) {
                  (e.lastPingedTime = n), qr(e, n);
                  break;
                }
                if (((o = jr(e)), 0 !== o && o !== n)) break;
                if (0 !== i && i !== n) {
                  e.lastPingedTime = i;
                  break;
                }
                if (
                  (1073741823 !== hs
                    ? (i = 10 * (1073741821 - hs) - rl())
                    : 1073741823 === ps
                    ? (i = 0)
                    : ((i = 10 * (1073741821 - ps) - 5e3),
                      (o = rl()),
                      (n = 10 * (1073741821 - n) - o),
                      (i = o - i),
                      0 > i && (i = 0),
                      (i =
                        (120 > i
                          ? 120
                          : 480 > i
                          ? 480
                          : 1080 > i
                          ? 1080
                          : 1920 > i
                          ? 1920
                          : 3e3 > i
                          ? 3e3
                          : 4320 > i
                          ? 4320
                          : 1960 * Ql(i / 1960)) - i),
                      n < i && (i = n)),
                  10 < i)
                ) {
                  e.timeoutHandle = Ya(Gr.bind(null, e), i);
                  break;
                }
                Gr(e);
                break;
              case as:
                if (1073741823 !== ps && null !== vs) {
                  a = ps;
                  var u = vs;
                  if (
                    ((i = 0 | u.busyMinDurationMs),
                    0 >= i
                      ? (i = 0)
                      : ((o = 0 | u.busyDelayMs),
                        (a =
                          rl() -
                          (10 * (1073741821 - a) - (0 | u.timeoutMs || 5e3))),
                        (i = a <= o ? 0 : o + i - a)),
                    10 < i)
                  ) {
                    bi(e, n), (e.timeoutHandle = Ya(Gr.bind(null, e), i));
                    break;
                  }
                }
                Gr(e);
                break;
              default:
                throw Error(r(329));
            }
          if ((Lr(e), e.callbackNode === t)) return zr.bind(null, e);
        }
      }
      return null;
    }
    function Ur(e) {
      var t = e.lastExpiredTime;
      if (((t = 0 !== t ? t : 1073741823), e.finishedExpirationTime === t))
        Gr(e);
      else {
        if ((us & (Zl | es)) !== Xl) throw Error(r(327));
        if ((ti(), (e === ls && t === fs) || qr(e, t), null !== ss)) {
          var n = us;
          us |= Zl;
          for (var i = Kr(e); ; )
            try {
              Vr();
              break;
            } catch (t) {
              Yr(e, t);
            }
          if ((Qt(), (us = n), ($l.current = i), cs === ns))
            throw ((n = ds), qr(e, t), bi(e, t), Lr(e), n);
          if (null !== ss) throw Error(r(261));
          (e.finishedWork = e.current.alternate),
            (e.finishedExpirationTime = t),
            (ls = null),
            Gr(e),
            Lr(e);
        }
      }
      return null;
    }
    function Br() {
      if (null !== Ps) {
        var e = Ps;
        (Ps = null),
          e.forEach(function (e, t) {
            wi(t, e), Lr(t);
          }),
          Kt();
      }
    }
    function Dr(e, t) {
      var n = us;
      us |= 1;
      try {
        return e(t);
      } finally {
        (us = n), us === Xl && Kt();
      }
    }
    function Fr(e, t) {
      var n = us;
      (us &= -2), (us |= Gl);
      try {
        return e(t);
      } finally {
        (us = n), us === Xl && Kt();
      }
    }
    function qr(e, t) {
      (e.finishedWork = null), (e.finishedExpirationTime = 0);
      var n = e.timeoutHandle;
      if ((-1 !== n && ((e.timeoutHandle = -1), Ka(n)), null !== ss))
        for (n = ss.return; null !== n; ) {
          var r = n;
          switch (r.tag) {
            case 1:
              var i = r.type.childContextTypes;
              null !== i && void 0 !== i && At(r);
              break;
            case 3:
              En(r), Nt(r);
              break;
            case 5:
              kn(r);
              break;
            case 4:
              En(r);
              break;
            case 13:
              Ct(_l, r);
              break;
            case 19:
              Ct(_l, r);
              break;
            case 10:
              Jt(r);
          }
          n = n.return;
        }
      (ls = e),
        (ss = di(e.current, null, t)),
        (fs = t),
        (cs = ts),
        (ds = null),
        (hs = ps = 1073741823),
        (vs = null),
        (ys = 0),
        (ms = !1);
    }
    function Yr(e, t) {
      for (;;) {
        try {
          if ((Qt(), Rn(), null === ss || null === ss.return))
            return (cs = ns), (ds = t), null;
          e: {
            var n = e,
              r = ss.return,
              i = ss,
              o = t;
            if (
              ((t = fs),
              (i.effectTag |= 2048),
              (i.firstEffect = i.lastEffect = null),
              null !== o && "object" == typeof o && "function" == typeof o.then)
            ) {
              var a = o,
                u = 0 !== (1 & _l.current),
                l = r;
              do {
                var s;
                if ((s = 13 === l.tag)) {
                  var f = l.memoizedState;
                  if (null !== f) s = null !== f.dehydrated;
                  else {
                    var c = l.memoizedProps;
                    s =
                      void 0 !== c.fallback &&
                      (!0 !== c.unstable_avoidThisFallback || !u);
                  }
                }
                if (s) {
                  var d = l.updateQueue;
                  if (null === d) {
                    var p = new Set();
                    p.add(a), (l.updateQueue = p);
                  } else d.add(a);
                  if (0 === (2 & l.mode)) {
                    if (
                      ((l.effectTag |= 64), (i.effectTag &= -2981), 1 === i.tag)
                    )
                      if (null === i.alternate) i.tag = 17;
                      else {
                        var h = nn(1073741823, null);
                        (h.tag = 2), on(i, h);
                      }
                    i.expirationTime = 1073741823;
                    break e;
                  }
                  (o = void 0), (i = t);
                  var v = n.pingCache;
                  if (
                    (null === v
                      ? ((v = n.pingCache = new Vl()),
                        (o = new Set()),
                        v.set(a, o))
                      : ((o = v.get(a)),
                        void 0 === o && ((o = new Set()), v.set(a, o))),
                    !o.has(i))
                  ) {
                    o.add(i);
                    var y = oi.bind(null, n, a, i);
                    a.then(y, y);
                  }
                  (l.effectTag |= 4096), (l.expirationTime = t);
                  break e;
                }
                l = l.return;
              } while (null !== l);
              o = Error(
                (m(i.type) || "A React component") +
                  " suspended while rendering, but no fallback UI was specified.\n\nAdd a <Suspense fallback=...> component higher in the tree to provide a loading indicator or placeholder to display." +
                  g(i)
              );
            }
            cs !== as && (cs = rs), (o = yr(o, i)), (l = r);
            do {
              switch (l.tag) {
                case 3:
                  (a = o), (l.effectTag |= 4096), (l.expirationTime = t);
                  var b = Cr(l, a, t);
                  an(l, b);
                  break e;
                case 1:
                  a = o;
                  var _ = l.type,
                    w = l.stateNode;
                  if (
                    0 === (64 & l.effectTag) &&
                    ("function" == typeof _.getDerivedStateFromError ||
                      (null !== w &&
                        "function" == typeof w.componentDidCatch &&
                        (null === Ss || !Ss.has(w))))
                  ) {
                    (l.effectTag |= 4096), (l.expirationTime = t);
                    var E = Rr(l, a, t);
                    an(l, E);
                    break e;
                  }
              }
              l = l.return;
            } while (null !== l);
          }
          ss = Jr(ss);
        } catch (e) {
          t = e;
          continue;
        }
        break;
      }
    }
    function Kr() {
      var e = $l.current;
      return ($l.current = Ll), null === e ? Ll : e;
    }
    function Wr(e, t) {
      e < ps && 2 < e && (ps = e),
        null !== t && e < hs && 2 < e && ((hs = e), (vs = t));
    }
    function Hr(e) {
      e > ys && (ys = e);
    }
    function Vr() {
      for (; null !== ss; ) ss = $r(ss);
    }
    function Qr() {
      for (; null !== ss && !qu(); ) ss = $r(ss);
    }
    function $r(e) {
      var t = Wl(e.alternate, e, fs);
      return (
        (e.memoizedProps = e.pendingProps),
        null === t && (t = Jr(e)),
        (Jl.current = null),
        t
      );
    }
    function Jr(e) {
      ss = e;
      do {
        var t = ss.alternate;
        if (((e = ss.return), 0 === (2048 & ss.effectTag))) {
          e: {
            var n = t;
            t = ss;
            var i = fs,
              o = t.pendingProps;
            switch (t.tag) {
              case 2:
                break;
              case 16:
                break;
              case 15:
              case 0:
                break;
              case 1:
                Mt(t.type) && At(t);
                break;
              case 3:
                En(t),
                  Nt(t),
                  (o = t.stateNode),
                  o.pendingContext &&
                    ((o.context = o.pendingContext), (o.pendingContext = null)),
                  (null === n || null === n.child) && Xn(t) && pr(t),
                  Ru(t);
                break;
              case 5:
                kn(t), (i = _n(bl.current));
                var a = t.type;
                if (null !== n && null != t.stateNode)
                  Iu(n, t, a, o, i), n.ref !== t.ref && (t.effectTag |= 128);
                else if (o) {
                  var u = _n(ml.current);
                  if (Xn(t)) {
                    o = t;
                    var l = o.stateNode;
                    n = o.type;
                    var s = o.memoizedProps,
                      f = i;
                    switch (
                      ((l[Ha] = o), (l[Va] = s), (a = void 0), (i = l), n)
                    ) {
                      case "iframe":
                      case "object":
                      case "embed":
                        Ne("load", i);
                        break;
                      case "video":
                      case "audio":
                        for (l = 0; l < Fo.length; l++) Ne(Fo[l], i);
                        break;
                      case "source":
                        Ne("error", i);
                        break;
                      case "img":
                      case "image":
                      case "link":
                        Ne("error", i), Ne("load", i);
                        break;
                      case "form":
                        Ne("reset", i), Ne("submit", i);
                        break;
                      case "details":
                        Ne("toggle", i);
                        break;
                      case "input":
                        U(i, s), Ne("invalid", i), Qe(f, "onChange");
                        break;
                      case "select":
                        (i._wrapperState = {
                          wasMultiple: !!s.multiple,
                        }),
                          Ne("invalid", i),
                          Qe(f, "onChange");
                        break;
                      case "textarea":
                        V(i, s), Ne("invalid", i), Qe(f, "onChange");
                    }
                    He(n, s), (l = null);
                    for (a in s)
                      s.hasOwnProperty(a) &&
                        ((u = s[a]),
                        "children" === a
                          ? "string" == typeof u
                            ? i.textContent !== u && (l = ["children", u])
                            : "number" == typeof u &&
                              i.textContent !== "" + u &&
                              (l = ["children", "" + u])
                          : Bi.hasOwnProperty(a) && null != u && Qe(f, a));
                    switch (n) {
                      case "input":
                        j(i), F(i, s, !0);
                        break;
                      case "textarea":
                        j(i), $(i, s);
                        break;
                      case "select":
                      case "option":
                        break;
                      default:
                        "function" == typeof s.onClick && (i.onclick = $e);
                    }
                    (a = l), (o.updateQueue = a), (o = null !== a), o && pr(t);
                  } else {
                    (n = t),
                      (f = a),
                      (s = o),
                      (l = 9 === i.nodeType ? i : i.ownerDocument),
                      u === Co.html && (u = J(f)),
                      u === Co.html
                        ? "script" === f
                          ? ((s = l.createElement("div")),
                            (s.innerHTML = "<script></script>"),
                            (l = s.removeChild(s.firstChild)))
                          : "string" == typeof s.is
                          ? (l = l.createElement(f, {
                              is: s.is,
                            }))
                          : ((l = l.createElement(f)),
                            "select" === f &&
                              ((f = l),
                              s.multiple
                                ? (f.multiple = !0)
                                : s.size && (f.size = s.size)))
                        : (l = l.createElementNS(u, f)),
                      (s = l),
                      (s[Ha] = n),
                      (s[Va] = o),
                      Cu(s, t, !1, !1),
                      (t.stateNode = s),
                      (f = a),
                      (n = o);
                    var c = i,
                      d = Ve(f, n);
                    switch (f) {
                      case "iframe":
                      case "object":
                      case "embed":
                        Ne("load", s), (i = n);
                        break;
                      case "video":
                      case "audio":
                        for (i = 0; i < Fo.length; i++) Ne(Fo[i], s);
                        i = n;
                        break;
                      case "source":
                        Ne("error", s), (i = n);
                        break;
                      case "img":
                      case "image":
                      case "link":
                        Ne("error", s), Ne("load", s), (i = n);
                        break;
                      case "form":
                        Ne("reset", s), Ne("submit", s), (i = n);
                        break;
                      case "details":
                        Ne("toggle", s), (i = n);
                        break;
                      case "input":
                        U(s, n),
                          (i = z(s, n)),
                          Ne("invalid", s),
                          Qe(c, "onChange");
                        break;
                      case "option":
                        i = K(s, n);
                        break;
                      case "select":
                        (s._wrapperState = {
                          wasMultiple: !!n.multiple,
                        }),
                          (i = Ai({}, n, {
                            value: void 0,
                          })),
                          Ne("invalid", s),
                          Qe(c, "onChange");
                        break;
                      case "textarea":
                        V(s, n),
                          (i = H(s, n)),
                          Ne("invalid", s),
                          Qe(c, "onChange");
                        break;
                      default:
                        i = n;
                    }
                    He(f, i), (l = void 0), (u = f);
                    var p = s,
                      h = i;
                    for (l in h)
                      if (h.hasOwnProperty(l)) {
                        var v = h[l];
                        "style" === l
                          ? We(p, v)
                          : "dangerouslySetInnerHTML" === l
                          ? ((v = v ? v.__html : void 0), null != v && Ro(p, v))
                          : "children" === l
                          ? "string" == typeof v
                            ? ("textarea" !== u || "" !== v) && G(p, v)
                            : "number" == typeof v && G(p, "" + v)
                          : "suppressContentEditableWarning" !== l &&
                            "suppressHydrationWarning" !== l &&
                            "autoFocus" !== l &&
                            (Bi.hasOwnProperty(l)
                              ? null != v && Qe(c, l)
                              : null != v && M(p, l, v, d));
                      }
                    switch (f) {
                      case "input":
                        j(s), F(s, n, !1);
                        break;
                      case "textarea":
                        j(s), $(s, n);
                        break;
                      case "option":
                        null != n.value &&
                          s.setAttribute("value", "" + I(n.value));
                        break;
                      case "select":
                        (i = s),
                          (i.multiple = !!n.multiple),
                          (s = n.value),
                          null != s
                            ? W(i, !!n.multiple, s, !1)
                            : null != n.defaultValue &&
                              W(i, !!n.multiple, n.defaultValue, !0);
                        break;
                      default:
                        "function" == typeof i.onClick && (s.onclick = $e);
                    }
                    (o = nt(a, o)) && pr(t);
                  }
                  null !== t.ref && (t.effectTag |= 128);
                } else if (null === t.stateNode) throw Error(r(166));
                break;
              case 6:
                if (n && null != t.stateNode) Mu(n, t, n.memoizedProps, o);
                else {
                  if ("string" != typeof o && null === t.stateNode)
                    throw Error(r(166));
                  (i = _n(bl.current)),
                    _n(ml.current),
                    Xn(t)
                      ? ((o = t),
                        (a = o.stateNode),
                        (i = o.memoizedProps),
                        (a[Ha] = o),
                        (o = a.nodeValue !== i) && pr(t))
                      : ((a = t),
                        (o = (
                          9 === i.nodeType ? i : i.ownerDocument
                        ).createTextNode(o)),
                        (o[Ha] = a),
                        (t.stateNode = o));
                }
                break;
              case 11:
                break;
              case 13:
                if (
                  (Ct(_l, t), (o = t.memoizedState), 0 !== (64 & t.effectTag))
                ) {
                  t.expirationTime = i;
                  break e;
                }
                (o = null !== o),
                  (a = !1),
                  null === n
                    ? void 0 !== t.memoizedProps.fallback && Xn(t)
                    : ((i = n.memoizedState),
                      (a = null !== i),
                      o ||
                        null === i ||
                        ((i = n.child.sibling),
                        null !== i &&
                          ((s = t.firstEffect),
                          null !== s
                            ? ((t.firstEffect = i), (i.nextEffect = s))
                            : ((t.firstEffect = t.lastEffect = i),
                              (i.nextEffect = null)),
                          (i.effectTag = 8)))),
                  o &&
                    !a &&
                    0 !== (2 & t.mode) &&
                    ((null === n &&
                      !0 !== t.memoizedProps.unstable_avoidThisFallback) ||
                    0 !== (1 & _l.current)
                      ? cs === ts && (cs = is)
                      : ((cs !== ts && cs !== is) || (cs = os),
                        0 !== ys && null !== ls && (bi(ls, fs), _i(ls, ys)))),
                  (o || a) && (t.effectTag |= 4);
                break;
              case 7:
                break;
              case 8:
                break;
              case 12:
                break;
              case 4:
                En(t), Ru(t);
                break;
              case 10:
                Jt(t);
                break;
              case 9:
                break;
              case 14:
                break;
              case 17:
                Mt(t.type) && At(t);
                break;
              case 19:
                if ((Ct(_l, t), (o = t.memoizedState), null === o)) break;
                if (
                  ((a = 0 !== (64 & t.effectTag)),
                  (s = o.rendering),
                  null === s)
                ) {
                  if (a) hr(o, !1);
                  else if (
                    cs !== ts ||
                    (null !== n && 0 !== (64 & n.effectTag))
                  )
                    for (n = t.child; null !== n; ) {
                      if (((s = xn(n)), null !== s)) {
                        for (
                          t.effectTag |= 64,
                            hr(o, !1),
                            a = s.updateQueue,
                            null !== a &&
                              ((t.updateQueue = a), (t.effectTag |= 4)),
                            null === o.lastEffect && (t.firstEffect = null),
                            t.lastEffect = o.lastEffect,
                            o = i,
                            a = t.child;
                          null !== a;

                        )
                          (i = a),
                            (n = o),
                            (i.effectTag &= 2),
                            (i.nextEffect = null),
                            (i.firstEffect = null),
                            (i.lastEffect = null),
                            (s = i.alternate),
                            null === s
                              ? ((i.childExpirationTime = 0),
                                (i.expirationTime = n),
                                (i.child = null),
                                (i.memoizedProps = null),
                                (i.memoizedState = null),
                                (i.updateQueue = null),
                                (i.dependencies = null))
                              : ((i.childExpirationTime =
                                  s.childExpirationTime),
                                (i.expirationTime = s.expirationTime),
                                (i.child = s.child),
                                (i.memoizedProps = s.memoizedProps),
                                (i.memoizedState = s.memoizedState),
                                (i.updateQueue = s.updateQueue),
                                (n = s.dependencies),
                                (i.dependencies =
                                  null === n
                                    ? null
                                    : {
                                        expirationTime: n.expirationTime,
                                        firstContext: n.firstContext,
                                        responders: n.responders,
                                      })),
                            (a = a.sibling);
                        Rt(_l, (1 & _l.current) | 2, t), (t = t.child);
                        break e;
                      }
                      n = n.sibling;
                    }
                } else {
                  if (!a)
                    if (((n = xn(s)), null !== n)) {
                      if (
                        ((t.effectTag |= 64),
                        (a = !0),
                        (i = n.updateQueue),
                        null !== i && ((t.updateQueue = i), (t.effectTag |= 4)),
                        hr(o, !0),
                        null === o.tail && "hidden" === o.tailMode)
                      ) {
                        (t = t.lastEffect = o.lastEffect),
                          null !== t && (t.nextEffect = null);
                        break;
                      }
                    } else
                      rl() > o.tailExpiration &&
                        1 < i &&
                        ((t.effectTag |= 64),
                        (a = !0),
                        hr(o, !1),
                        (t.expirationTime = t.childExpirationTime = i - 1));
                  o.isBackwards
                    ? ((s.sibling = t.child), (t.child = s))
                    : ((i = o.last),
                      null !== i ? (i.sibling = s) : (t.child = s),
                      (o.last = s));
                }
                if (null !== o.tail) {
                  0 === o.tailExpiration && (o.tailExpiration = rl() + 500),
                    (i = o.tail),
                    (o.rendering = i),
                    (o.tail = i.sibling),
                    (o.lastEffect = t.lastEffect),
                    (i.sibling = null),
                    (o = _l.current),
                    (o = a ? (1 & o) | 2 : 1 & o),
                    Rt(_l, o, t),
                    (t = i);
                  break e;
                }
                break;
              case 20:
                break;
              case 21:
                break;
              default:
                throw Error(r(156, t.tag));
            }
            t = null;
          }
          if (((o = ss), 1 === fs || 1 !== o.childExpirationTime)) {
            for (a = 0, i = o.child; null !== i; )
              (n = i.expirationTime),
                (s = i.childExpirationTime),
                n > a && (a = n),
                s > a && (a = s),
                (i = i.sibling);
            o.childExpirationTime = a;
          }
          if (null !== t) return t;
          null !== e &&
            0 === (2048 & e.effectTag) &&
            (null === e.firstEffect && (e.firstEffect = ss.firstEffect),
            null !== ss.lastEffect &&
              (null !== e.lastEffect &&
                (e.lastEffect.nextEffect = ss.firstEffect),
              (e.lastEffect = ss.lastEffect)),
            1 < ss.effectTag &&
              (null !== e.lastEffect
                ? (e.lastEffect.nextEffect = ss)
                : (e.firstEffect = ss),
              (e.lastEffect = ss)));
        } else {
          if (((t = vr(ss, fs)), null !== t)) return (t.effectTag &= 2047), t;
          null !== e &&
            ((e.firstEffect = e.lastEffect = null), (e.effectTag |= 2048));
        }
        if (((t = ss.sibling), null !== t)) return t;
        ss = e;
      } while (null !== ss);
      return cs === ts && (cs = as), null;
    }
    function Xr(e) {
      var t = e.expirationTime;
      return (e = e.childExpirationTime), t > e ? t : e;
    }
    function Gr(e) {
      var t = Bt();
      return Ft(99, Zr.bind(null, e, t)), null;
    }
    function Zr(e, t) {
      if ((ti(), (us & (Zl | es)) !== Xl)) throw Error(r(327));
      var n = e.finishedWork,
        i = e.finishedExpirationTime;
      if (null === n) return null;
      if (
        ((e.finishedWork = null),
        (e.finishedExpirationTime = 0),
        n === e.current)
      )
        throw Error(r(177));
      (e.callbackNode = null),
        (e.callbackExpirationTime = 0),
        (e.callbackPriority = 90),
        (e.nextKnownPendingLevel = 0);
      var o = Xr(n);
      if (
        ((e.firstPendingTime = o),
        i <= e.lastSuspendedTime
          ? (e.firstSuspendedTime =
              e.lastSuspendedTime =
              e.nextKnownPendingLevel =
                0)
          : i <= e.firstSuspendedTime && (e.firstSuspendedTime = i - 1),
        i <= e.lastPingedTime && (e.lastPingedTime = 0),
        i <= e.lastExpiredTime && (e.lastExpiredTime = 0),
        e === ls && ((ss = ls = null), (fs = 0)),
        1 < n.effectTag
          ? null !== n.lastEffect
            ? ((n.lastEffect.nextEffect = n), (o = n.firstEffect))
            : (o = n)
          : (o = n.firstEffect),
        null !== o)
      ) {
        var a = us;
        (us |= es), (Jl.current = null), (Fa = Ma);
        var u = et();
        if (tt(u)) {
          if ("selectionStart" in u)
            var l = {
              start: u.selectionStart,
              end: u.selectionEnd,
            };
          else
            e: {
              l = ((l = u.ownerDocument) && l.defaultView) || window;
              var s = l.getSelection && l.getSelection();
              if (s && 0 !== s.rangeCount) {
                l = s.anchorNode;
                var f = s.anchorOffset,
                  c = s.focusNode;
                s = s.focusOffset;
                try {
                  l.nodeType, c.nodeType;
                } catch (e) {
                  l = null;
                  break e;
                }
                var d = 0,
                  p = -1,
                  h = -1,
                  v = 0,
                  y = 0,
                  m = u,
                  g = null;
                t: for (;;) {
                  for (
                    var b;
                    m !== l || (0 !== f && 3 !== m.nodeType) || (p = d + f),
                      m !== c || (0 !== s && 3 !== m.nodeType) || (h = d + s),
                      3 === m.nodeType && (d += m.nodeValue.length),
                      null !== (b = m.firstChild);

                  )
                    (g = m), (m = b);
                  for (;;) {
                    if (m === u) break t;
                    if (
                      (g === l && ++v === f && (p = d),
                      g === c && ++y === s && (h = d),
                      null !== (b = m.nextSibling))
                    )
                      break;
                    (m = g), (g = m.parentNode);
                  }
                  m = b;
                }
                l =
                  -1 === p || -1 === h
                    ? null
                    : {
                        start: p,
                        end: h,
                      };
              } else l = null;
            }
          l = l || {
            start: 0,
            end: 0,
          };
        } else l = null;
        (qa = {
          focusedElem: u,
          selectionRange: l,
        }),
          (Ma = !1),
          (_s = o);
        do
          try {
            ei();
          } catch (e) {
            if (null === _s) throw Error(r(330));
            ii(_s, e), (_s = _s.nextEffect);
          }
        while (null !== _s);
        _s = o;
        do
          try {
            for (u = e, l = t; null !== _s; ) {
              var _ = _s.effectTag;
              if ((16 & _ && G(_s.stateNode, ""), 128 & _)) {
                var w = _s.alternate;
                if (null !== w) {
                  var E = w.ref;
                  null !== E &&
                    ("function" == typeof E ? E(null) : (E.current = null));
                }
              }
              switch (1038 & _) {
                case 2:
                  xr(_s), (_s.effectTag &= -3);
                  break;
                case 6:
                  xr(_s), (_s.effectTag &= -3), Pr(_s.alternate, _s);
                  break;
                case 1024:
                  _s.effectTag &= -1025;
                  break;
                case 1028:
                  (_s.effectTag &= -1025), Pr(_s.alternate, _s);
                  break;
                case 4:
                  Pr(_s.alternate, _s);
                  break;
                case 8:
                  (f = _s), Tr(u, f, l), Sr(f);
              }
              _s = _s.nextEffect;
            }
          } catch (e) {
            if (null === _s) throw Error(r(330));
            ii(_s, e), (_s = _s.nextEffect);
          }
        while (null !== _s);
        if (
          ((E = qa),
          (w = et()),
          (_ = E.focusedElem),
          (l = E.selectionRange),
          w !== _ &&
            _ &&
            _.ownerDocument &&
            Ze(_.ownerDocument.documentElement, _))
        ) {
          null !== l &&
            tt(_) &&
            ((w = l.start),
            (E = l.end),
            void 0 === E && (E = w),
            "selectionStart" in _
              ? ((_.selectionStart = w),
                (_.selectionEnd = Math.min(E, _.value.length)))
              : ((E =
                  ((w = _.ownerDocument || document) && w.defaultView) ||
                  window),
                E.getSelection &&
                  ((E = E.getSelection()),
                  (f = _.textContent.length),
                  (u = Math.min(l.start, f)),
                  (l = void 0 === l.end ? u : Math.min(l.end, f)),
                  !E.extend && u > l && ((f = l), (l = u), (u = f)),
                  (f = Ge(_, u)),
                  (c = Ge(_, l)),
                  f &&
                    c &&
                    (1 !== E.rangeCount ||
                      E.anchorNode !== f.node ||
                      E.anchorOffset !== f.offset ||
                      E.focusNode !== c.node ||
                      E.focusOffset !== c.offset) &&
                    ((w = w.createRange()),
                    w.setStart(f.node, f.offset),
                    E.removeAllRanges(),
                    u > l
                      ? (E.addRange(w), E.extend(c.node, c.offset))
                      : (w.setEnd(c.node, c.offset), E.addRange(w)))))),
            (w = []);
          for (E = _; (E = E.parentNode); )
            1 === E.nodeType &&
              w.push({
                element: E,
                left: E.scrollLeft,
                top: E.scrollTop,
              });
          for (
            "function" == typeof _.focus && _.focus(), _ = 0;
            _ < w.length;
            _++
          )
            (E = w[_]),
              (E.element.scrollLeft = E.left),
              (E.element.scrollTop = E.top);
        }
        (qa = null), (Ma = !!Fa), (Fa = null), (e.current = n), (_s = o);
        do
          try {
            for (_ = i; null !== _s; ) {
              var S = _s.effectTag;
              if (36 & S) {
                var k = _s.alternate;
                switch (((w = _s), (E = _), w.tag)) {
                  case 0:
                  case 11:
                  case 15:
                    wr(16, 32, w);
                    break;
                  case 1:
                    var x = w.stateNode;
                    if (4 & w.effectTag)
                      if (null === k) x.componentDidMount();
                      else {
                        var T =
                          w.elementType === w.type
                            ? k.memoizedProps
                            : Vt(w.type, k.memoizedProps);
                        x.componentDidUpdate(
                          T,
                          k.memoizedState,
                          x.__reactInternalSnapshotBeforeUpdate
                        );
                      }
                    var P = w.updateQueue;
                    null !== P && fn(w, P, x, E);
                    break;
                  case 3:
                    var O = w.updateQueue;
                    if (null !== O) {
                      if (((u = null), null !== w.child))
                        switch (w.child.tag) {
                          case 5:
                            u = w.child.stateNode;
                            break;
                          case 1:
                            u = w.child.stateNode;
                        }
                      fn(w, O, u, E);
                    }
                    break;
                  case 5:
                    var C = w.stateNode;
                    null === k &&
                      4 & w.effectTag &&
                      nt(w.type, w.memoizedProps) &&
                      C.focus();
                    break;
                  case 6:
                    break;
                  case 4:
                    break;
                  case 12:
                    break;
                  case 13:
                    if (null === w.memoizedState) {
                      var R = w.alternate;
                      if (null !== R) {
                        var I = R.memoizedState;
                        if (null !== I) {
                          var M = I.dehydrated;
                          null !== M && ye(M);
                        }
                      }
                    }
                    break;
                  case 19:
                  case 17:
                  case 20:
                  case 21:
                    break;
                  default:
                    throw Error(r(163));
                }
              }
              if (128 & S) {
                w = void 0;
                var A = _s.ref;
                if (null !== A) {
                  var N = _s.stateNode;
                  switch (_s.tag) {
                    case 5:
                      w = N;
                      break;
                    default:
                      w = N;
                  }
                  "function" == typeof A ? A(w) : (A.current = w);
                }
              }
              _s = _s.nextEffect;
            }
          } catch (e) {
            if (null === _s) throw Error(r(330));
            ii(_s, e), (_s = _s.nextEffect);
          }
        while (null !== _s);
        (_s = null), Gu(), (us = a);
      } else e.current = n;
      if (ks) (ks = !1), (xs = e), (Ts = t);
      else
        for (_s = o; null !== _s; )
          (t = _s.nextEffect), (_s.nextEffect = null), (_s = t);
      if (
        ((t = e.firstPendingTime),
        0 === t && (Ss = null),
        1073741823 === t ? (e === Cs ? Os++ : ((Os = 0), (Cs = e))) : (Os = 0),
        "function" == typeof Is && Is(n.stateNode, i),
        Lr(e),
        ws)
      )
        throw ((ws = !1), (e = Es), (Es = null), e);
      return (us & Gl) !== Xl ? null : (Kt(), null);
    }
    function ei() {
      for (; null !== _s; ) {
        var e = _s.effectTag;
        0 !== (256 & e) && _r(_s.alternate, _s),
          0 === (512 & e) ||
            ks ||
            ((ks = !0),
            qt(97, function () {
              return ti(), null;
            })),
          (_s = _s.nextEffect);
      }
    }
    function ti() {
      if (90 !== Ts) {
        var e = 97 < Ts ? 97 : Ts;
        return (Ts = 90), Ft(e, ni);
      }
    }
    function ni() {
      if (null === xs) return !1;
      var e = xs;
      if (((xs = null), (us & (Zl | es)) !== Xl)) throw Error(r(331));
      var t = us;
      for (us |= es, e = e.current.firstEffect; null !== e; ) {
        try {
          var n = e;
          if (0 !== (512 & n.effectTag))
            switch (n.tag) {
              case 0:
              case 11:
              case 15:
                wr(128, 0, n), wr(0, 64, n);
            }
        } catch (t) {
          if (null === e) throw Error(r(330));
          ii(e, t);
        }
        (n = e.nextEffect), (e.nextEffect = null), (e = n);
      }
      return (us = t), Kt(), !0;
    }
    function ri(e, t, n) {
      (t = yr(n, t)),
        (t = Cr(e, t, 1073741823)),
        on(e, t),
        (e = Nr(e, 1073741823)),
        null !== e && Lr(e);
    }
    function ii(e, t) {
      if (3 === e.tag) ri(e, e, t);
      else
        for (var n = e.return; null !== n; ) {
          if (3 === n.tag) {
            ri(n, e, t);
            break;
          }
          if (1 === n.tag) {
            var r = n.stateNode;
            if (
              "function" == typeof n.type.getDerivedStateFromError ||
              ("function" == typeof r.componentDidCatch &&
                (null === Ss || !Ss.has(r)))
            ) {
              (e = yr(t, e)),
                (e = Rr(n, e, 1073741823)),
                on(n, e),
                (n = Nr(n, 1073741823)),
                null !== n && Lr(n);
              break;
            }
          }
          n = n.return;
        }
    }
    function oi(e, t, n) {
      var r = e.pingCache;
      null !== r && r.delete(t),
        ls === e && fs === n
          ? cs === os || (cs === is && 1073741823 === ps && rl() - gs < bs)
            ? qr(e, fs)
            : (ms = !0)
          : gi(e, n) &&
            ((t = e.lastPingedTime),
            (0 !== t && t < n) ||
              ((e.lastPingedTime = n),
              e.finishedExpirationTime === n &&
                ((e.finishedExpirationTime = 0), (e.finishedWork = null)),
              Lr(e)));
    }
    function ai(e, t) {
      var n = e.stateNode;
      null !== n && n.delete(t),
        (t = 0),
        0 === t && ((t = Ir()), (t = Mr(t, e, null))),
        (e = Nr(e, t)),
        null !== e && Lr(e);
    }
    function ui(e) {
      if ("undefined" == typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled || !t.supportsFiber) return !0;
      try {
        var n = t.inject(e);
        (Is = function (e) {
          try {
            t.onCommitFiberRoot(
              n,
              e,
              void 0,
              64 === (64 & e.current.effectTag)
            );
          } catch (e) {}
        }),
          (Ms = function (e) {
            try {
              t.onCommitFiberUnmount(n, e);
            } catch (e) {}
          });
      } catch (e) {}
      return !0;
    }
    function li(e, t, n, r) {
      (this.tag = e),
        (this.key = n),
        (this.sibling =
          this.child =
          this.return =
          this.stateNode =
          this.type =
          this.elementType =
            null),
        (this.index = 0),
        (this.ref = null),
        (this.pendingProps = t),
        (this.dependencies =
          this.memoizedState =
          this.updateQueue =
          this.memoizedProps =
            null),
        (this.mode = r),
        (this.effectTag = 0),
        (this.lastEffect = this.firstEffect = this.nextEffect = null),
        (this.childExpirationTime = this.expirationTime = 0),
        (this.alternate = null);
    }
    function si(e, t, n, r) {
      return new li(e, t, n, r);
    }
    function fi(e) {
      return (e = e.prototype), !(!e || !e.isReactComponent);
    }
    function ci(e) {
      if ("function" == typeof e) return fi(e) ? 1 : 0;
      if (void 0 !== e && null !== e) {
        if (((e = e.$$typeof), e === lo)) return 11;
        if (e === co) return 14;
      }
      return 2;
    }
    function di(e, t) {
      var n = e.alternate;
      return (
        null === n
          ? ((n = si(e.tag, t, e.key, e.mode)),
            (n.elementType = e.elementType),
            (n.type = e.type),
            (n.stateNode = e.stateNode),
            (n.alternate = e),
            (e.alternate = n))
          : ((n.pendingProps = t),
            (n.effectTag = 0),
            (n.nextEffect = null),
            (n.firstEffect = null),
            (n.lastEffect = null)),
        (n.childExpirationTime = e.childExpirationTime),
        (n.expirationTime = e.expirationTime),
        (n.child = e.child),
        (n.memoizedProps = e.memoizedProps),
        (n.memoizedState = e.memoizedState),
        (n.updateQueue = e.updateQueue),
        (t = e.dependencies),
        (n.dependencies =
          null === t
            ? null
            : {
                expirationTime: t.expirationTime,
                firstContext: t.firstContext,
                responders: t.responders,
              }),
        (n.sibling = e.sibling),
        (n.index = e.index),
        (n.ref = e.ref),
        n
      );
    }
    function pi(e, t, n, i, o, a) {
      var u = 2;
      if (((i = e), "function" == typeof e)) fi(e) && (u = 1);
      else if ("string" == typeof e) u = 5;
      else
        e: switch (e) {
          case no:
            return hi(n.children, o, a, t);
          case uo:
            (u = 8), (o |= 7);
            break;
          case ro:
            (u = 8), (o |= 1);
            break;
          case io:
            return (
              (e = si(12, n, t, 8 | o)),
              (e.elementType = io),
              (e.type = io),
              (e.expirationTime = a),
              e
            );
          case so:
            return (
              (e = si(13, n, t, o)),
              (e.type = so),
              (e.elementType = so),
              (e.expirationTime = a),
              e
            );
          case fo:
            return (
              (e = si(19, n, t, o)),
              (e.elementType = fo),
              (e.expirationTime = a),
              e
            );
          default:
            if ("object" == typeof e && null !== e)
              switch (e.$$typeof) {
                case oo:
                  u = 10;
                  break e;
                case ao:
                  u = 9;
                  break e;
                case lo:
                  u = 11;
                  break e;
                case co:
                  u = 14;
                  break e;
                case po:
                  (u = 16), (i = null);
                  break e;
              }
            throw Error(r(130, null == e ? e : typeof e, ""));
        }
      return (
        (t = si(u, n, t, o)),
        (t.elementType = e),
        (t.type = i),
        (t.expirationTime = a),
        t
      );
    }
    function hi(e, t, n, r) {
      return (e = si(7, e, r, t)), (e.expirationTime = n), e;
    }
    function vi(e, t, n) {
      return (e = si(6, e, null, t)), (e.expirationTime = n), e;
    }
    function yi(e, t, n) {
      return (
        (t = si(4, null !== e.children ? e.children : [], e.key, t)),
        (t.expirationTime = n),
        (t.stateNode = {
          containerInfo: e.containerInfo,
          pendingChildren: null,
          implementation: e.implementation,
        }),
        t
      );
    }
    function mi(e, t, n) {
      (this.tag = t),
        (this.current = null),
        (this.containerInfo = e),
        (this.pingCache = this.pendingChildren = null),
        (this.finishedExpirationTime = 0),
        (this.finishedWork = null),
        (this.timeoutHandle = -1),
        (this.pendingContext = this.context = null),
        (this.hydrate = n),
        (this.callbackNode = null),
        (this.callbackPriority = 90),
        (this.lastExpiredTime =
          this.lastPingedTime =
          this.nextKnownPendingLevel =
          this.lastSuspendedTime =
          this.firstSuspendedTime =
          this.firstPendingTime =
            0);
    }
    function gi(e, t) {
      var n = e.firstSuspendedTime;
      return (e = e.lastSuspendedTime), 0 !== n && n >= t && e <= t;
    }
    function bi(e, t) {
      var n = e.firstSuspendedTime,
        r = e.lastSuspendedTime;
      n < t && (e.firstSuspendedTime = t),
        (r > t || 0 === n) && (e.lastSuspendedTime = t),
        t <= e.lastPingedTime && (e.lastPingedTime = 0),
        t <= e.lastExpiredTime && (e.lastExpiredTime = 0);
    }
    function _i(e, t) {
      t > e.firstPendingTime && (e.firstPendingTime = t);
      var n = e.firstSuspendedTime;
      0 !== n &&
        (t >= n
          ? (e.firstSuspendedTime =
              e.lastSuspendedTime =
              e.nextKnownPendingLevel =
                0)
          : t >= e.lastSuspendedTime && (e.lastSuspendedTime = t + 1),
        t > e.nextKnownPendingLevel && (e.nextKnownPendingLevel = t));
    }
    function wi(e, t) {
      var n = e.lastExpiredTime;
      (0 === n || n > t) && (e.lastExpiredTime = t);
    }
    function Ei(e, t, n, i) {
      var o = t.current,
        a = Ir(),
        u = fl.suspense;
      a = Mr(a, o, u);
      e: if (n) {
        n = n._reactInternalFiber;
        t: {
          if (te(n) !== n || 1 !== n.tag) throw Error(r(170));
          var l = n;
          do {
            switch (l.tag) {
              case 3:
                l = l.stateNode.context;
                break t;
              case 1:
                if (Mt(l.type)) {
                  l = l.stateNode.__reactInternalMemoizedMergedChildContext;
                  break t;
                }
            }
            l = l.return;
          } while (null !== l);
          throw Error(r(171));
        }
        if (1 === n.tag) {
          var s = n.type;
          if (Mt(s)) {
            n = Lt(n, s, l);
            break e;
          }
        }
        n = l;
      } else n = ju;
      return (
        null === t.context ? (t.context = n) : (t.pendingContext = n),
        (t = nn(a, u)),
        (t.payload = {
          element: e,
        }),
        (i = void 0 === i ? null : i),
        null !== i && (t.callback = i),
        on(o, t),
        Ar(o, a),
        a
      );
    }
    function Si(e) {
      if (((e = e.current), !e.child)) return null;
      switch (e.child.tag) {
        case 5:
          return e.child.stateNode;
        default:
          return e.child.stateNode;
      }
    }
    function ki(e, t) {
      (e = e.memoizedState),
        null !== e &&
          null !== e.dehydrated &&
          e.retryTime < t &&
          (e.retryTime = t);
    }
    function xi(e, t) {
      ki(e, t), (e = e.alternate) && ki(e, t);
    }
    function Ti(e, t, n) {
      var r =
        3 < arguments.length && void 0 !== arguments[3] ? arguments[3] : null;
      return {
        $$typeof: to,
        key: null == r ? null : "" + r,
        children: e,
        containerInfo: t,
        implementation: n,
      };
    }
    function Pi(e, t, n) {
      n = null != n && !0 === n.hydrate;
      var r = new mi(e, t, n),
        i = si(3, null, null, 2 === t ? 7 : 1 === t ? 3 : 0);
      (r.current = i),
        (i.stateNode = r),
        (e[Qa] = r.current),
        n && 0 !== t && ae(9 === e.nodeType ? e : e.ownerDocument),
        (this._internalRoot = r);
    }
    function Oi(e) {
      return !(
        !e ||
        (1 !== e.nodeType &&
          9 !== e.nodeType &&
          11 !== e.nodeType &&
          (8 !== e.nodeType || " react-mount-point-unstable " !== e.nodeValue))
      );
    }
    function Ci(e, t) {
      if (
        (t ||
          ((t = e
            ? 9 === e.nodeType
              ? e.documentElement
              : e.firstChild
            : null),
          (t = !(!t || 1 !== t.nodeType || !t.hasAttribute("data-reactroot")))),
        !t)
      )
        for (var n; (n = e.lastChild); ) e.removeChild(n);
      return new Pi(
        e,
        0,
        t
          ? {
              hydrate: !0,
            }
          : void 0
      );
    }
    function Ri(e, t, n, r, i) {
      var o = n._reactRootContainer;
      if (o) {
        var a = o._internalRoot;
        if ("function" == typeof i) {
          var u = i;
          i = function () {
            var e = Si(a);
            u.call(e);
          };
        }
        Ei(t, a, e, i);
      } else {
        if (
          ((o = n._reactRootContainer = Ci(n, r)),
          (a = o._internalRoot),
          "function" == typeof i)
        ) {
          var l = i;
          i = function () {
            var e = Si(a);
            l.call(e);
          };
        }
        Fr(function () {
          Ei(t, a, e, i);
        });
      }
      return Si(a);
    }
    function Ii(e, t) {
      var n =
        2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null;
      if (!Oi(t)) throw Error(r(200));
      return Ti(e, t, null, n);
    }
    var Mi = n(1),
      Ai = n(3),
      Ni = n(6);
    if (!Mi) throw Error(r(227));
    var ji = null,
      Li = {},
      zi = [],
      Ui = {},
      Bi = {},
      Di = {},
      Fi = !1,
      qi = null,
      Yi = !1,
      Ki = null,
      Wi = {
        onError: function (e) {
          (Fi = !0), (qi = e);
        },
      },
      Hi = null,
      Vi = null,
      Qi = null,
      $i = null,
      Ji = {
        injectEventPluginOrder: function (e) {
          if (ji) throw Error(r(101));
          (ji = Array.prototype.slice.call(e)), i();
        },
        injectEventPluginsByName: function (e) {
          var t,
            n = !1;
          for (t in e)
            if (e.hasOwnProperty(t)) {
              var o = e[t];
              if (!Li.hasOwnProperty(t) || Li[t] !== o) {
                if (Li[t]) throw Error(r(102, t));
                (Li[t] = o), (n = !0);
              }
            }
          n && i();
        },
      },
      Xi = Mi.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    Xi.hasOwnProperty("ReactCurrentDispatcher") ||
      (Xi.ReactCurrentDispatcher = {
        current: null,
      }),
      Xi.hasOwnProperty("ReactCurrentBatchConfig") ||
        (Xi.ReactCurrentBatchConfig = {
          suspense: null,
        });
    var Gi = /^(.*)[\\\/]/,
      Zi = "function" == typeof Symbol && Symbol.for,
      eo = Zi ? Symbol.for("react.element") : 60103,
      to = Zi ? Symbol.for("react.portal") : 60106,
      no = Zi ? Symbol.for("react.fragment") : 60107,
      ro = Zi ? Symbol.for("react.strict_mode") : 60108,
      io = Zi ? Symbol.for("react.profiler") : 60114,
      oo = Zi ? Symbol.for("react.provider") : 60109,
      ao = Zi ? Symbol.for("react.context") : 60110,
      uo = Zi ? Symbol.for("react.concurrent_mode") : 60111,
      lo = Zi ? Symbol.for("react.forward_ref") : 60112,
      so = Zi ? Symbol.for("react.suspense") : 60113,
      fo = Zi ? Symbol.for("react.suspense_list") : 60120,
      co = Zi ? Symbol.for("react.memo") : 60115,
      po = Zi ? Symbol.for("react.lazy") : 60116;
    Zi && Symbol.for("react.fundamental"),
      Zi && Symbol.for("react.responder"),
      Zi && Symbol.for("react.scope");
    var ho = "function" == typeof Symbol && Symbol.iterator,
      vo = !(
        "undefined" == typeof window ||
        "undefined" == typeof window.document ||
        "undefined" == typeof window.document.createElement
      ),
      yo = null,
      mo = null,
      go = null,
      bo = E,
      _o = !1,
      wo = !1;
    new Map();
    var Eo =
        /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
      So = Object.prototype.hasOwnProperty,
      ko = {},
      xo = {},
      To = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
      .split(" ")
      .forEach(function (e) {
        To[e] = new C(e, 0, !1, e, null, !1);
      }),
      [
        ["acceptCharset", "accept-charset"],
        ["className", "class"],
        ["htmlFor", "for"],
        ["httpEquiv", "http-equiv"],
      ].forEach(function (e) {
        var t = e[0];
        To[t] = new C(t, 1, !1, e[1], null, !1);
      }),
      ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (
        e
      ) {
        To[e] = new C(e, 2, !1, e.toLowerCase(), null, !1);
      }),
      [
        "autoReverse",
        "externalResourcesRequired",
        "focusable",
        "preserveAlpha",
      ].forEach(function (e) {
        To[e] = new C(e, 2, !1, e, null, !1);
      }),
      "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
        .split(" ")
        .forEach(function (e) {
          To[e] = new C(e, 3, !1, e.toLowerCase(), null, !1);
        }),
      ["checked", "multiple", "muted", "selected"].forEach(function (e) {
        To[e] = new C(e, 3, !0, e, null, !1);
      }),
      ["capture", "download"].forEach(function (e) {
        To[e] = new C(e, 4, !1, e, null, !1);
      }),
      ["cols", "rows", "size", "span"].forEach(function (e) {
        To[e] = new C(e, 6, !1, e, null, !1);
      }),
      ["rowSpan", "start"].forEach(function (e) {
        To[e] = new C(e, 5, !1, e.toLowerCase(), null, !1);
      });
    var Po = /[\-:]([a-z])/g;
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(Po, R);
        To[t] = new C(t, 1, !1, e, null, !1);
      }),
      "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
        .split(" ")
        .forEach(function (e) {
          var t = e.replace(Po, R);
          To[t] = new C(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1);
        }),
      ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
        var t = e.replace(Po, R);
        To[t] = new C(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1);
      }),
      ["tabIndex", "crossOrigin"].forEach(function (e) {
        To[e] = new C(e, 1, !1, e.toLowerCase(), null, !1);
      }),
      (To.xlinkHref = new C(
        "xlinkHref",
        1,
        !1,
        "xlink:href",
        "http://www.w3.org/1999/xlink",
        !0
      )),
      ["src", "href", "action", "formAction"].forEach(function (e) {
        To[e] = new C(e, 1, !1, e.toLowerCase(), null, !0);
      });
    var Oo,
      Co = {
        html: "http://www.w3.org/1999/xhtml",
        mathml: "http://www.w3.org/1998/Math/MathML",
        svg: "http://www.w3.org/2000/svg",
      },
      Ro = (function (e) {
        return "undefined" != typeof MSApp && MSApp.execUnsafeLocalFunction
          ? function (t, n, r, i) {
              MSApp.execUnsafeLocalFunction(function () {
                return e(t, n, r, i);
              });
            }
          : e;
      })(function (e, t) {
        if (e.namespaceURI !== Co.svg || "innerHTML" in e) e.innerHTML = t;
        else {
          for (
            Oo = Oo || document.createElement("div"),
              Oo.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
              t = Oo.firstChild;
            e.firstChild;

          )
            e.removeChild(e.firstChild);
          for (; t.firstChild; ) e.appendChild(t.firstChild);
        }
      }),
      Io = {
        animationend: Z("Animation", "AnimationEnd"),
        animationiteration: Z("Animation", "AnimationIteration"),
        animationstart: Z("Animation", "AnimationStart"),
        transitionend: Z("Transition", "TransitionEnd"),
      },
      Mo = {},
      Ao = {};
    vo &&
      ((Ao = document.createElement("div").style),
      "AnimationEvent" in window ||
        (delete Io.animationend.animation,
        delete Io.animationiteration.animation,
        delete Io.animationstart.animation),
      "TransitionEvent" in window || delete Io.transitionend.transition);
    var No,
      jo,
      Lo,
      zo = ee("animationend"),
      Uo = ee("animationiteration"),
      Bo = ee("animationstart"),
      Do = ee("transitionend"),
      Fo =
        "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange seeked seeking stalled suspend timeupdate volumechange waiting".split(
          " "
        ),
      qo = !1,
      Yo = [],
      Ko = null,
      Wo = null,
      Ho = null,
      Vo = new Map(),
      Qo = new Map(),
      $o = [],
      Jo =
        "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput close cancel copy cut paste click change contextmenu reset submit".split(
          " "
        ),
      Xo =
        "focus blur dragenter dragleave mouseover mouseout pointerover pointerout gotpointercapture lostpointercapture".split(
          " "
        );
    Ai(Te.prototype, {
      preventDefault: function () {
        this.defaultPrevented = !0;
        var e = this.nativeEvent;
        e &&
          (e.preventDefault
            ? e.preventDefault()
            : "unknown" != typeof e.returnValue && (e.returnValue = !1),
          (this.isDefaultPrevented = ke));
      },
      stopPropagation: function () {
        var e = this.nativeEvent;
        e &&
          (e.stopPropagation
            ? e.stopPropagation()
            : "unknown" != typeof e.cancelBubble && (e.cancelBubble = !0),
          (this.isPropagationStopped = ke));
      },
      persist: function () {
        this.isPersistent = ke;
      },
      isPersistent: xe,
      destructor: function () {
        var e,
          t = this.constructor.Interface;
        for (e in t) this[e] = null;
        (this.nativeEvent = this._targetInst = this.dispatchConfig = null),
          (this.isPropagationStopped = this.isDefaultPrevented = xe),
          (this._dispatchInstances = this._dispatchListeners = null);
      },
    }),
      (Te.Interface = {
        type: null,
        target: null,
        currentTarget: function () {
          return null;
        },
        eventPhase: null,
        bubbles: null,
        cancelable: null,
        timeStamp: function (e) {
          return e.timeStamp || Date.now();
        },
        defaultPrevented: null,
        isTrusted: null,
      }),
      (Te.extend = function (e) {
        function t() {}
        function n() {
          return r.apply(this, arguments);
        }
        var r = this;
        t.prototype = r.prototype;
        var i = new t();
        return (
          Ai(i, n.prototype),
          (n.prototype = i),
          (n.prototype.constructor = n),
          (n.Interface = Ai({}, r.Interface, e)),
          (n.extend = r.extend),
          Ce(n),
          n
        );
      }),
      Ce(Te);
    for (
      var Go = Te.extend({
          animationName: null,
          elapsedTime: null,
          pseudoElement: null,
        }),
        Zo = Te.extend({
          clipboardData: function (e) {
            return ("clipboardData" in e)
              ? e.clipboardData
              : window.clipboardData;
          },
        }),
        ea = Te.extend({
          view: null,
          detail: null,
        }),
        ta = ea.extend({
          relatedTarget: null,
        }),
        na = {
          Esc: "Escape",
          Spacebar: " ",
          Left: "ArrowLeft",
          Up: "ArrowUp",
          Right: "ArrowRight",
          Down: "ArrowDown",
          Del: "Delete",
          Win: "OS",
          Menu: "ContextMenu",
          Apps: "ContextMenu",
          Scroll: "ScrollLock",
          MozPrintableKey: "Unidentified",
        },
        ra = {
          8: "Backspace",
          9: "Tab",
          12: "Clear",
          13: "Enter",
          16: "Shift",
          17: "Control",
          18: "Alt",
          19: "Pause",
          20: "CapsLock",
          27: "Escape",
          32: " ",
          33: "PageUp",
          34: "PageDown",
          35: "End",
          36: "Home",
          37: "ArrowLeft",
          38: "ArrowUp",
          39: "ArrowRight",
          40: "ArrowDown",
          45: "Insert",
          46: "Delete",
          112: "F1",
          113: "F2",
          114: "F3",
          115: "F4",
          116: "F5",
          117: "F6",
          118: "F7",
          119: "F8",
          120: "F9",
          121: "F10",
          122: "F11",
          123: "F12",
          144: "NumLock",
          145: "ScrollLock",
          224: "Meta",
        },
        ia = {
          Alt: "altKey",
          Control: "ctrlKey",
          Meta: "metaKey",
          Shift: "shiftKey",
        },
        oa = ea.extend({
          key: function (e) {
            if (e.key) {
              var t = na[e.key] || e.key;
              if ("Unidentified" !== t) return t;
            }
            return "keypress" === e.type
              ? ((e = Re(e)), 13 === e ? "Enter" : String.fromCharCode(e))
              : "keydown" === e.type || "keyup" === e.type
              ? ra[e.keyCode] || "Unidentified"
              : "";
          },
          location: null,
          ctrlKey: null,
          shiftKey: null,
          altKey: null,
          metaKey: null,
          repeat: null,
          locale: null,
          getModifierState: Me,
          charCode: function (e) {
            return "keypress" === e.type ? Re(e) : 0;
          },
          keyCode: function (e) {
            return "keydown" === e.type || "keyup" === e.type ? e.keyCode : 0;
          },
          which: function (e) {
            return "keypress" === e.type
              ? Re(e)
              : "keydown" === e.type || "keyup" === e.type
              ? e.keyCode
              : 0;
          },
        }),
        aa = 0,
        ua = 0,
        la = !1,
        sa = !1,
        fa = ea.extend({
          screenX: null,
          screenY: null,
          clientX: null,
          clientY: null,
          pageX: null,
          pageY: null,
          ctrlKey: null,
          shiftKey: null,
          altKey: null,
          metaKey: null,
          getModifierState: Me,
          button: null,
          buttons: null,
          relatedTarget: function (e) {
            return (
              e.relatedTarget ||
              (e.fromElement === e.srcElement ? e.toElement : e.fromElement)
            );
          },
          movementX: function (e) {
            if (("movementX" in e)) return e.movementX;
            var t = aa;
            return (
              (aa = e.screenX),
              la ? ("mousemove" === e.type ? e.screenX - t : 0) : ((la = !0), 0)
            );
          },
          movementY: function (e) {
            if (("movementY" in e)) return e.movementY;
            var t = ua;
            return (
              (ua = e.screenY),
              sa ? ("mousemove" === e.type ? e.screenY - t : 0) : ((sa = !0), 0)
            );
          },
        }),
        ca = fa.extend({
          pointerId: null,
          width: null,
          height: null,
          pressure: null,
          tangentialPressure: null,
          tiltX: null,
          tiltY: null,
          twist: null,
          pointerType: null,
          isPrimary: null,
        }),
        da = fa.extend({
          dataTransfer: null,
        }),
        pa = ea.extend({
          touches: null,
          targetTouches: null,
          changedTouches: null,
          altKey: null,
          metaKey: null,
          ctrlKey: null,
          shiftKey: null,
          getModifierState: Me,
        }),
        ha = Te.extend({
          propertyName: null,
          elapsedTime: null,
          pseudoElement: null,
        }),
        va = fa.extend({
          deltaX: function (e) {
            return ("deltaX" in e)
              ? e.deltaX
              : ("wheelDeltaX" in e)
              ? -e.wheelDeltaX
              : 0;
          },
          deltaY: function (e) {
            return ("deltaY" in e)
              ? e.deltaY
              : ("wheelDeltaY" in e)
              ? -e.wheelDeltaY
              : ("wheelDelta" in e)
              ? -e.wheelDelta
              : 0;
          },
          deltaZ: null,
          deltaMode: null,
        }),
        ya = [
          ["blur", "blur", 0],
          ["cancel", "cancel", 0],
          ["click", "click", 0],
          ["close", "close", 0],
          ["contextmenu", "contextMenu", 0],
          ["copy", "copy", 0],
          ["cut", "cut", 0],
          ["auxclick", "auxClick", 0],
          ["dblclick", "doubleClick", 0],
          ["dragend", "dragEnd", 0],
          ["dragstart", "dragStart", 0],
          ["drop", "drop", 0],
          ["focus", "focus", 0],
          ["input", "input", 0],
          ["invalid", "invalid", 0],
          ["keydown", "keyDown", 0],
          ["keypress", "keyPress", 0],
          ["keyup", "keyUp", 0],
          ["mousedown", "mouseDown", 0],
          ["mouseup", "mouseUp", 0],
          ["paste", "paste", 0],
          ["pause", "pause", 0],
          ["play", "play", 0],
          ["pointercancel", "pointerCancel", 0],
          ["pointerdown", "pointerDown", 0],
          ["pointerup", "pointerUp", 0],
          ["ratechange", "rateChange", 0],
          ["reset", "reset", 0],
          ["seeked", "seeked", 0],
          ["submit", "submit", 0],
          ["touchcancel", "touchCancel", 0],
          ["touchend", "touchEnd", 0],
          ["touchstart", "touchStart", 0],
          ["volumechange", "volumeChange", 0],
          ["drag", "drag", 1],
          ["dragenter", "dragEnter", 1],
          ["dragexit", "dragExit", 1],
          ["dragleave", "dragLeave", 1],
          ["dragover", "dragOver", 1],
          ["mousemove", "mouseMove", 1],
          ["mouseout", "mouseOut", 1],
          ["mouseover", "mouseOver", 1],
          ["pointermove", "pointerMove", 1],
          ["pointerout", "pointerOut", 1],
          ["pointerover", "pointerOver", 1],
          ["scroll", "scroll", 1],
          ["toggle", "toggle", 1],
          ["touchmove", "touchMove", 1],
          ["wheel", "wheel", 1],
          ["abort", "abort", 2],
          [zo, "animationEnd", 2],
          [Uo, "animationIteration", 2],
          [Bo, "animationStart", 2],
          ["canplay", "canPlay", 2],
          ["canplaythrough", "canPlayThrough", 2],
          ["durationchange", "durationChange", 2],
          ["emptied", "emptied", 2],
          ["encrypted", "encrypted", 2],
          ["ended", "ended", 2],
          ["error", "error", 2],
          ["gotpointercapture", "gotPointerCapture", 2],
          ["load", "load", 2],
          ["loadeddata", "loadedData", 2],
          ["loadedmetadata", "loadedMetadata", 2],
          ["loadstart", "loadStart", 2],
          ["lostpointercapture", "lostPointerCapture", 2],
          ["playing", "playing", 2],
          ["progress", "progress", 2],
          ["seeking", "seeking", 2],
          ["stalled", "stalled", 2],
          ["suspend", "suspend", 2],
          ["timeupdate", "timeUpdate", 2],
          [Do, "transitionEnd", 2],
          ["waiting", "waiting", 2],
        ],
        ma = {},
        ga = {},
        ba = 0;
      ba < ya.length;
      ba++
    ) {
      var _a = ya[ba],
        wa = _a[0],
        Ea = _a[1],
        Sa = _a[2],
        ka = "on" + (Ea[0].toUpperCase() + Ea.slice(1)),
        xa = {
          phasedRegistrationNames: {
            bubbled: ka,
            captured: ka + "Capture",
          },
          dependencies: [wa],
          eventPriority: Sa,
        };
      (ma[Ea] = xa), (ga[wa] = xa);
    }
    var Ta = {
        eventTypes: ma,
        getEventPriority: function (e) {
          return (e = ga[e]), void 0 !== e ? e.eventPriority : 2;
        },
        extractEvents: function (e, t, n, r) {
          var i = ga[e];
          if (!i) return null;
          switch (e) {
            case "keypress":
              if (0 === Re(n)) return null;
            case "keydown":
            case "keyup":
              e = oa;
              break;
            case "blur":
            case "focus":
              e = ta;
              break;
            case "click":
              if (2 === n.button) return null;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              e = fa;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              e = da;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              e = pa;
              break;
            case zo:
            case Uo:
            case Bo:
              e = Go;
              break;
            case Do:
              e = ha;
              break;
            case "scroll":
              e = ea;
              break;
            case "wheel":
              e = va;
              break;
            case "copy":
            case "cut":
            case "paste":
              e = Zo;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              e = ca;
              break;
            default:
              e = Te;
          }
          return (t = e.getPooled(i, t, n, r)), Se(t), t;
        },
      },
      Pa = Ni.unstable_UserBlockingPriority,
      Oa = Ni.unstable_runWithPriority,
      Ca = Ta.getEventPriority,
      Ra = 10,
      Ia = [],
      Ma = !0,
      Aa = new ("function" == typeof WeakMap ? WeakMap : Map)(),
      Na = {
        animationIterationCount: !0,
        borderImageOutset: !0,
        borderImageSlice: !0,
        borderImageWidth: !0,
        boxFlex: !0,
        boxFlexGroup: !0,
        boxOrdinalGroup: !0,
        columnCount: !0,
        columns: !0,
        flex: !0,
        flexGrow: !0,
        flexPositive: !0,
        flexShrink: !0,
        flexNegative: !0,
        flexOrder: !0,
        gridArea: !0,
        gridRow: !0,
        gridRowEnd: !0,
        gridRowSpan: !0,
        gridRowStart: !0,
        gridColumn: !0,
        gridColumnEnd: !0,
        gridColumnSpan: !0,
        gridColumnStart: !0,
        fontWeight: !0,
        lineClamp: !0,
        lineHeight: !0,
        opacity: !0,
        order: !0,
        orphans: !0,
        tabSize: !0,
        widows: !0,
        zIndex: !0,
        zoom: !0,
        fillOpacity: !0,
        floodOpacity: !0,
        stopOpacity: !0,
        strokeDasharray: !0,
        strokeDashoffset: !0,
        strokeMiterlimit: !0,
        strokeOpacity: !0,
        strokeWidth: !0,
      },
      ja = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Na).forEach(function (e) {
      ja.forEach(function (t) {
        (t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Na[t] = Na[e]);
      });
    });
    var La = Ai(
        {
          menuitem: !0,
        },
        {
          area: !0,
          base: !0,
          br: !0,
          col: !0,
          embed: !0,
          hr: !0,
          img: !0,
          input: !0,
          keygen: !0,
          link: !0,
          meta: !0,
          param: !0,
          source: !0,
          track: !0,
          wbr: !0,
        }
      ),
      za = "$",
      Ua = "/$",
      Ba = "$?",
      Da = "$!",
      Fa = null,
      qa = null,
      Ya = "function" == typeof setTimeout ? setTimeout : void 0,
      Ka = "function" == typeof clearTimeout ? clearTimeout : void 0,
      Wa = Math.random().toString(36).slice(2),
      Ha = "__reactInternalInstance$" + Wa,
      Va = "__reactEventHandlers$" + Wa,
      Qa = "__reactContainere$" + Wa,
      $a = null,
      Ja = null,
      Xa = null,
      Ga = Te.extend({
        data: null,
      }),
      Za = Te.extend({
        data: null,
      }),
      eu = [9, 13, 27, 32],
      tu = vo && "CompositionEvent" in window,
      nu = null;
    vo && "documentMode" in document && (nu = document.documentMode);
    var ru = vo && "TextEvent" in window && !nu,
      iu = vo && (!tu || (nu && 8 < nu && 11 >= nu)),
      ou = String.fromCharCode(32),
      au = {
        beforeInput: {
          phasedRegistrationNames: {
            bubbled: "onBeforeInput",
            captured: "onBeforeInputCapture",
          },
          dependencies: ["compositionend", "keypress", "textInput", "paste"],
        },
        compositionEnd: {
          phasedRegistrationNames: {
            bubbled: "onCompositionEnd",
            captured: "onCompositionEndCapture",
          },
          dependencies:
            "blur compositionend keydown keypress keyup mousedown".split(" "),
        },
        compositionStart: {
          phasedRegistrationNames: {
            bubbled: "onCompositionStart",
            captured: "onCompositionStartCapture",
          },
          dependencies:
            "blur compositionstart keydown keypress keyup mousedown".split(" "),
        },
        compositionUpdate: {
          phasedRegistrationNames: {
            bubbled: "onCompositionUpdate",
            captured: "onCompositionUpdateCapture",
          },
          dependencies:
            "blur compositionupdate keydown keypress keyup mousedown".split(
              " "
            ),
        },
      },
      uu = !1,
      lu = !1,
      su = {
        eventTypes: au,
        extractEvents: function (e, t, n, r) {
          var i;
          if (tu)
            e: {
              switch (e) {
                case "compositionstart":
                  var o = au.compositionStart;
                  break e;
                case "compositionend":
                  o = au.compositionEnd;
                  break e;
                case "compositionupdate":
                  o = au.compositionUpdate;
                  break e;
              }
              o = void 0;
            }
          else
            lu
              ? ct(e, n) && (o = au.compositionEnd)
              : "keydown" === e &&
                229 === n.keyCode &&
                (o = au.compositionStart);
          return (
            o
              ? (iu &&
                  "ko" !== n.locale &&
                  (lu || o !== au.compositionStart
                    ? o === au.compositionEnd && lu && (i = ft())
                    : (($a = r),
                      (Ja = "value" in $a ? $a.value : $a.textContent),
                      (lu = !0))),
                (o = Ga.getPooled(o, t, n, r)),
                i ? (o.data = i) : ((i = dt(n)), null !== i && (o.data = i)),
                Se(o),
                (i = o))
              : (i = null),
            (e = ru ? pt(e, n) : ht(e, n))
              ? ((t = Za.getPooled(au.beforeInput, t, n, r)),
                (t.data = e),
                Se(t))
              : (t = null),
            null === i ? t : null === t ? i : [i, t]
          );
        },
      },
      fu = {
        color: !0,
        date: !0,
        datetime: !0,
        "datetime-local": !0,
        email: !0,
        month: !0,
        number: !0,
        password: !0,
        range: !0,
        search: !0,
        tel: !0,
        text: !0,
        time: !0,
        url: !0,
        week: !0,
      },
      cu = {
        change: {
          phasedRegistrationNames: {
            bubbled: "onChange",
            captured: "onChangeCapture",
          },
          dependencies:
            "blur change click focus input keydown keyup selectionchange".split(
              " "
            ),
        },
      },
      du = null,
      pu = null,
      hu = !1;
    vo &&
      (hu =
        Fe("input") && (!document.documentMode || 9 < document.documentMode));
    var vu,
      yu = {
        eventTypes: cu,
        _isInputEventSupported: hu,
        extractEvents: function (e, t, n, r) {
          var i = t ? lt(t) : window,
            o = i.nodeName && i.nodeName.toLowerCase();
          if ("select" === o || ("input" === o && "file" === i.type))
            var a = bt;
          else if (vt(i))
            if (hu) a = xt;
            else {
              a = St;
              var u = Et;
            }
          else
            (o = i.nodeName) &&
              "input" === o.toLowerCase() &&
              ("checkbox" === i.type || "radio" === i.type) &&
              (a = kt);
          return a && (a = a(e, t))
            ? yt(a, n, r)
            : (u && u(e, i, t),
              void (
                "blur" === e &&
                (e = i._wrapperState) &&
                e.controlled &&
                "number" === i.type &&
                q(i, "number", i.value)
              ));
        },
      },
      mu = {
        mouseEnter: {
          registrationName: "onMouseEnter",
          dependencies: ["mouseout", "mouseover"],
        },
        mouseLeave: {
          registrationName: "onMouseLeave",
          dependencies: ["mouseout", "mouseover"],
        },
        pointerEnter: {
          registrationName: "onPointerEnter",
          dependencies: ["pointerout", "pointerover"],
        },
        pointerLeave: {
          registrationName: "onPointerLeave",
          dependencies: ["pointerout", "pointerover"],
        },
      },
      gu = {
        eventTypes: mu,
        extractEvents: function (e, t, n, r, i) {
          var o = "mouseover" === e || "pointerover" === e,
            a = "mouseout" === e || "pointerout" === e;
          if (
            (o && 0 === (32 & i) && (n.relatedTarget || n.fromElement)) ||
            (!a && !o)
          )
            return null;
          if (
            ((i =
              r.window === r
                ? r
                : (i = r.ownerDocument)
                ? i.defaultView || i.parentWindow
                : window),
            a
              ? ((a = t),
                (t = (t = n.relatedTarget || n.toElement) ? at(t) : null),
                null !== t &&
                  ((o = te(t)), t !== o || (5 !== t.tag && 6 !== t.tag)) &&
                  (t = null))
              : (a = null),
            a === t)
          )
            return null;
          if ("mouseout" === e || "mouseover" === e)
            var u = fa,
              l = mu.mouseLeave,
              s = mu.mouseEnter,
              f = "mouse";
          else
            ("pointerout" !== e && "pointerover" !== e) ||
              ((u = ca),
              (l = mu.pointerLeave),
              (s = mu.pointerEnter),
              (f = "pointer"));
          if (
            ((e = null == a ? i : lt(a)),
            (i = null == t ? i : lt(t)),
            (l = u.getPooled(l, a, n, r)),
            (l.type = f + "leave"),
            (l.target = e),
            (l.relatedTarget = i),
            (r = u.getPooled(s, t, n, r)),
            (r.type = f + "enter"),
            (r.target = i),
            (r.relatedTarget = e),
            (u = a),
            (f = t),
            u && f)
          )
            e: {
              for (s = u, e = f, a = 0, t = s; t; t = ge(t)) a++;
              for (t = 0, i = e; i; i = ge(i)) t++;
              for (; 0 < a - t; ) (s = ge(s)), a--;
              for (; 0 < t - a; ) (e = ge(e)), t--;
              for (; a--; ) {
                if (s === e || s === e.alternate) break e;
                (s = ge(s)), (e = ge(e));
              }
              s = null;
            }
          else s = null;
          for (
            e = s, s = [];
            u && u !== e && ((a = u.alternate), null === a || a !== e);

          )
            s.push(u), (u = ge(u));
          for (
            u = [];
            f && f !== e && ((a = f.alternate), null === a || a !== e);

          )
            u.push(f), (f = ge(f));
          for (f = 0; f < s.length; f++) we(s[f], "bubbled", l);
          for (f = u.length; 0 < f--; ) we(u[f], "captured", r);
          return n === vu ? ((vu = null), [l]) : ((vu = n), [l, r]);
        },
      },
      bu = "function" == typeof Object.is ? Object.is : Tt,
      _u = Object.prototype.hasOwnProperty,
      wu = vo && "documentMode" in document && 11 >= document.documentMode,
      Eu = {
        select: {
          phasedRegistrationNames: {
            bubbled: "onSelect",
            captured: "onSelectCapture",
          },
          dependencies:
            "blur contextmenu dragend focus keydown keyup mousedown mouseup selectionchange".split(
              " "
            ),
        },
      },
      Su = null,
      ku = null,
      xu = null,
      Tu = !1,
      Pu = {
        eventTypes: Eu,
        extractEvents: function (e, t, n, r) {
          var i,
            o =
              r.window === r
                ? r.document
                : 9 === r.nodeType
                ? r
                : r.ownerDocument;
          if (!(i = !o)) {
            e: {
              (o = qe(o)), (i = Di.onSelect);
              for (var a = 0; a < i.length; a++)
                if (!o.has(i[a])) {
                  o = !1;
                  break e;
                }
              o = !0;
            }
            i = !o;
          }
          if (i) return null;
          switch (((o = t ? lt(t) : window), e)) {
            case "focus":
              (vt(o) || "true" === o.contentEditable) &&
                ((Su = o), (ku = t), (xu = null));
              break;
            case "blur":
              xu = ku = Su = null;
              break;
            case "mousedown":
              Tu = !0;
              break;
            case "contextmenu":
            case "mouseup":
            case "dragend":
              return (Tu = !1), Ot(n, r);
            case "selectionchange":
              if (wu) break;
            case "keydown":
            case "keyup":
              return Ot(n, r);
          }
          return null;
        },
      };
    Ji.injectEventPluginOrder(
      "ResponderEventPlugin SimpleEventPlugin EnterLeaveEventPlugin ChangeEventPlugin SelectEventPlugin BeforeInputEventPlugin".split(
        " "
      )
    );
    var Ou = ut;
    (Hi = st),
      (Vi = Ou),
      (Qi = lt),
      Ji.injectEventPluginsByName({
        SimpleEventPlugin: Ta,
        EnterLeaveEventPlugin: gu,
        ChangeEventPlugin: yu,
        SelectEventPlugin: Pu,
        BeforeInputEventPlugin: su,
      }),
      new Set();
    var Cu,
      Ru,
      Iu,
      Mu,
      Au = [],
      Nu = -1,
      ju = {},
      Lu = {
        current: ju,
      },
      zu = {
        current: !1,
      },
      Uu = ju,
      Bu = Ni.unstable_runWithPriority,
      Du = Ni.unstable_scheduleCallback,
      Fu = Ni.unstable_cancelCallback,
      qu = Ni.unstable_shouldYield,
      Yu = Ni.unstable_requestPaint,
      Ku = Ni.unstable_now,
      Wu = Ni.unstable_getCurrentPriorityLevel,
      Hu = Ni.unstable_ImmediatePriority,
      Vu = Ni.unstable_UserBlockingPriority,
      Qu = Ni.unstable_NormalPriority,
      $u = Ni.unstable_LowPriority,
      Ju = Ni.unstable_IdlePriority,
      Xu = {},
      Gu = void 0 !== Yu ? Yu : function () {},
      Zu = null,
      el = null,
      tl = !1,
      nl = Ku(),
      rl =
        1e4 > nl
          ? Ku
          : function () {
              return Ku() - nl;
            },
      il = 3,
      ol = {
        current: null,
      },
      al = null,
      ul = null,
      ll = null,
      sl = !1,
      fl = Xi.ReactCurrentBatchConfig,
      cl = new Mi.Component().refs,
      dl = {
        isMounted: function (e) {
          return !!(e = e._reactInternalFiber) && te(e) === e;
        },
        enqueueSetState: function (e, t, n) {
          e = e._reactInternalFiber;
          var r = Ir(),
            i = fl.suspense;
          (r = Mr(r, e, i)),
            (i = nn(r, i)),
            (i.payload = t),
            void 0 !== n && null !== n && (i.callback = n),
            on(e, i),
            Ar(e, r);
        },
        enqueueReplaceState: function (e, t, n) {
          e = e._reactInternalFiber;
          var r = Ir(),
            i = fl.suspense;
          (r = Mr(r, e, i)),
            (i = nn(r, i)),
            (i.tag = 1),
            (i.payload = t),
            void 0 !== n && null !== n && (i.callback = n),
            on(e, i),
            Ar(e, r);
        },
        enqueueForceUpdate: function (e, t) {
          e = e._reactInternalFiber;
          var n = Ir(),
            r = fl.suspense;
          (n = Mr(n, e, r)),
            (r = nn(n, r)),
            (r.tag = 2),
            void 0 !== t && null !== t && (r.callback = t),
            on(e, r),
            Ar(e, n);
        },
      },
      pl = Array.isArray,
      hl = bn(!0),
      vl = bn(!1),
      yl = {},
      ml = {
        current: yl,
      },
      gl = {
        current: yl,
      },
      bl = {
        current: yl,
      },
      _l = {
        current: 0,
      },
      wl = Xi.ReactCurrentDispatcher,
      El = Xi.ReactCurrentBatchConfig,
      Sl = 0,
      kl = null,
      xl = null,
      Tl = null,
      Pl = null,
      Ol = null,
      Cl = null,
      Rl = 0,
      Il = null,
      Ml = 0,
      Al = !1,
      Nl = null,
      jl = 0,
      Ll = {
        readContext: Zt,
        useCallback: Pn,
        useContext: Pn,
        useEffect: Pn,
        useImperativeHandle: Pn,
        useLayoutEffect: Pn,
        useMemo: Pn,
        useReducer: Pn,
        useRef: Pn,
        useState: Pn,
        useDebugValue: Pn,
        useResponder: Pn,
        useDeferredValue: Pn,
        useTransition: Pn,
      },
      zl = {
        readContext: Zt,
        useCallback: Kn,
        useContext: Zt,
        useEffect: Dn,
        useImperativeHandle: function (e, t, n) {
          return (
            (n = null !== n && void 0 !== n ? n.concat([e]) : null),
            Un(4, 36, qn.bind(null, t, e), n)
          );
        },
        useLayoutEffect: function (e, t) {
          return Un(4, 36, e, t);
        },
        useMemo: function (e, t) {
          var n = In();
          return (
            (t = void 0 === t ? null : t),
            (e = e()),
            (n.memoizedState = [e, t]),
            e
          );
        },
        useReducer: function (e, t, n) {
          var r = In();
          return (
            (t = void 0 !== n ? n(t) : t),
            (r.memoizedState = r.baseState = t),
            (e = r.queue =
              {
                last: null,
                dispatch: null,
                lastRenderedReducer: e,
                lastRenderedState: t,
              }),
            (e = e.dispatch = Hn.bind(null, kl, e)),
            [r.memoizedState, e]
          );
        },
        useRef: function (e) {
          var t = In();
          return (
            (e = {
              current: e,
            }),
            (t.memoizedState = e)
          );
        },
        useState: jn,
        useDebugValue: Yn,
        useResponder: Tn,
        useDeferredValue: function (e, t) {
          var n = jn(e),
            r = n[0],
            i = n[1];
          return (
            Dn(
              function () {
                Ni.unstable_next(function () {
                  var n = El.suspense;
                  El.suspense = void 0 === t ? null : t;
                  try {
                    i(e);
                  } finally {
                    El.suspense = n;
                  }
                });
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = jn(!1),
            n = t[0],
            r = t[1];
          return [
            Kn(
              function (t) {
                r(!0),
                  Ni.unstable_next(function () {
                    var n = El.suspense;
                    El.suspense = void 0 === e ? null : e;
                    try {
                      r(!1), t();
                    } finally {
                      El.suspense = n;
                    }
                  });
              },
              [e, n]
            ),
            n,
          ];
        },
      },
      Ul = {
        readContext: Zt,
        useCallback: Wn,
        useContext: Zt,
        useEffect: Fn,
        useImperativeHandle: function (e, t, n) {
          return (
            (n = null !== n && void 0 !== n ? n.concat([e]) : null),
            Bn(4, 36, qn.bind(null, t, e), n)
          );
        },
        useLayoutEffect: function (e, t) {
          return Bn(4, 36, e, t);
        },
        useMemo: function (e, t) {
          var n = Mn();
          t = void 0 === t ? null : t;
          var r = n.memoizedState;
          return null !== r && null !== t && On(t, r[1])
            ? r[0]
            : ((e = e()), (n.memoizedState = [e, t]), e);
        },
        useReducer: Nn,
        useRef: function () {
          return Mn().memoizedState;
        },
        useState: Ln,
        useDebugValue: Yn,
        useResponder: Tn,
        useDeferredValue: function (e, t) {
          var n = Ln(e),
            r = n[0],
            i = n[1];
          return (
            Fn(
              function () {
                Ni.unstable_next(function () {
                  var n = El.suspense;
                  El.suspense = void 0 === t ? null : t;
                  try {
                    i(e);
                  } finally {
                    El.suspense = n;
                  }
                });
              },
              [e, t]
            ),
            r
          );
        },
        useTransition: function (e) {
          var t = Ln(!1),
            n = t[0],
            r = t[1];
          return [
            Wn(
              function (t) {
                r(!0),
                  Ni.unstable_next(function () {
                    var n = El.suspense;
                    El.suspense = void 0 === e ? null : e;
                    try {
                      r(!1), t();
                    } finally {
                      El.suspense = n;
                    }
                  });
              },
              [e, n]
            ),
            n,
          ];
        },
      },
      Bl = null,
      Dl = null,
      Fl = !1,
      ql = Xi.ReactCurrentOwner,
      Yl = !1,
      Kl = {
        dehydrated: null,
        retryTime: 0,
      };
    (Cu = function (e, t) {
      for (var n = t.child; null !== n; ) {
        if (5 === n.tag || 6 === n.tag) e.appendChild(n.stateNode);
        else if (4 !== n.tag && null !== n.child) {
          (n.child.return = n), (n = n.child);
          continue;
        }
        if (n === t) break;
        for (; null === n.sibling; ) {
          if (null === n.return || n.return === t) return;
          n = n.return;
        }
        (n.sibling.return = n.return), (n = n.sibling);
      }
    }),
      (Ru = function () {}),
      (Iu = function (e, t, n, r, i) {
        var o = e.memoizedProps;
        if (o !== r) {
          var a = t.stateNode;
          switch ((_n(ml.current), (e = null), n)) {
            case "input":
              (o = z(a, o)), (r = z(a, r)), (e = []);
              break;
            case "option":
              (o = K(a, o)), (r = K(a, r)), (e = []);
              break;
            case "select":
              (o = Ai({}, o, {
                value: void 0,
              })),
                (r = Ai({}, r, {
                  value: void 0,
                })),
                (e = []);
              break;
            case "textarea":
              (o = H(a, o)), (r = H(a, r)), (e = []);
              break;
            default:
              "function" != typeof o.onClick &&
                "function" == typeof r.onClick &&
                (a.onclick = $e);
          }
          He(n, r);
          var u, l;
          n = null;
          for (u in o)
            if (!r.hasOwnProperty(u) && o.hasOwnProperty(u) && null != o[u])
              if ("style" === u)
                for (l in (a = o[u]))
                  a.hasOwnProperty(l) && (n || (n = {}), (n[l] = ""));
              else
                "dangerouslySetInnerHTML" !== u &&
                  "children" !== u &&
                  "suppressContentEditableWarning" !== u &&
                  "suppressHydrationWarning" !== u &&
                  "autoFocus" !== u &&
                  (Bi.hasOwnProperty(u)
                    ? e || (e = [])
                    : (e = e || []).push(u, null));
          for (u in r) {
            var s = r[u];
            if (
              ((a = null != o ? o[u] : void 0),
              r.hasOwnProperty(u) && s !== a && (null != s || null != a))
            )
              if ("style" === u)
                if (a) {
                  for (l in a)
                    !a.hasOwnProperty(l) ||
                      (s && s.hasOwnProperty(l)) ||
                      (n || (n = {}), (n[l] = ""));
                  for (l in s)
                    s.hasOwnProperty(l) &&
                      a[l] !== s[l] &&
                      (n || (n = {}), (n[l] = s[l]));
                } else n || (e || (e = []), e.push(u, n)), (n = s);
              else
                "dangerouslySetInnerHTML" === u
                  ? ((s = s ? s.__html : void 0),
                    (a = a ? a.__html : void 0),
                    null != s && a !== s && (e = e || []).push(u, "" + s))
                  : "children" === u
                  ? a === s ||
                    ("string" != typeof s && "number" != typeof s) ||
                    (e = e || []).push(u, "" + s)
                  : "suppressContentEditableWarning" !== u &&
                    "suppressHydrationWarning" !== u &&
                    (Bi.hasOwnProperty(u)
                      ? (null != s && Qe(i, u), e || a === s || (e = []))
                      : (e = e || []).push(u, s));
          }
          n && (e = e || []).push("style", n),
            (i = e),
            (t.updateQueue = i) && pr(t);
        }
      }),
      (Mu = function (e, t, n, r) {
        n !== r && pr(t);
      });
    var Wl,
      Hl = "function" == typeof WeakSet ? WeakSet : Set,
      Vl = "function" == typeof WeakMap ? WeakMap : Map,
      Ql = Math.ceil,
      $l = Xi.ReactCurrentDispatcher,
      Jl = Xi.ReactCurrentOwner,
      Xl = 0,
      Gl = 8,
      Zl = 16,
      es = 32,
      ts = 0,
      ns = 1,
      rs = 2,
      is = 3,
      os = 4,
      as = 5,
      us = Xl,
      ls = null,
      ss = null,
      fs = 0,
      cs = ts,
      ds = null,
      ps = 1073741823,
      hs = 1073741823,
      vs = null,
      ys = 0,
      ms = !1,
      gs = 0,
      bs = 500,
      _s = null,
      ws = !1,
      Es = null,
      Ss = null,
      ks = !1,
      xs = null,
      Ts = 90,
      Ps = null,
      Os = 0,
      Cs = null,
      Rs = 0;
    Wl = function (e, t, n) {
      var i = t.expirationTime;
      if (null !== e) {
        var o = t.pendingProps;
        if (e.memoizedProps !== o || zu.current) Yl = !0;
        else {
          if (i < n) {
            switch (((Yl = !1), t.tag)) {
              case 3:
                ur(t), Gn();
                break;
              case 5:
                if ((Sn(t), 4 & t.mode && 1 !== n && o.hidden))
                  return (t.expirationTime = t.childExpirationTime = 1), null;
                break;
              case 1:
                Mt(t.type) && zt(t);
                break;
              case 4:
                wn(t, t.stateNode.containerInfo);
                break;
              case 10:
                $t(t, t.memoizedProps.value);
                break;
              case 13:
                if (null !== t.memoizedState)
                  return (
                    (i = t.child.childExpirationTime),
                    0 !== i && i >= n
                      ? lr(e, t, n)
                      : (Rt(_l, 1 & _l.current, t),
                        (t = dr(e, t, n)),
                        null !== t ? t.sibling : null)
                  );
                Rt(_l, 1 & _l.current, t);
                break;
              case 19:
                if (
                  ((i = t.childExpirationTime >= n), 0 !== (64 & e.effectTag))
                ) {
                  if (i) return cr(e, t, n);
                  t.effectTag |= 64;
                }
                if (
                  ((o = t.memoizedState),
                  null !== o && ((o.rendering = null), (o.tail = null)),
                  Rt(_l, _l.current, t),
                  !i)
                )
                  return null;
            }
            return dr(e, t, n);
          }
          Yl = !1;
        }
      } else Yl = !1;
      switch (((t.expirationTime = 0), t.tag)) {
        case 2:
          if (
            ((i = t.type),
            null !== e &&
              ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
            (e = t.pendingProps),
            (o = It(t, Lu.current)),
            Gt(t, n),
            (o = Cn(null, t, i, e, o, n)),
            (t.effectTag |= 1),
            "object" == typeof o &&
              null !== o &&
              "function" == typeof o.render &&
              void 0 === o.$$typeof)
          ) {
            if (((t.tag = 1), Rn(), Mt(i))) {
              var a = !0;
              zt(t);
            } else a = !1;
            t.memoizedState =
              null !== o.state && void 0 !== o.state ? o.state : null;
            var u = i.getDerivedStateFromProps;
            "function" == typeof u && dn(t, i, u, e),
              (o.updater = dl),
              (t.stateNode = o),
              (o._reactInternalFiber = t),
              yn(t, i, e, n),
              (t = ar(null, t, i, !0, a, n));
          } else (t.tag = 0), Zn(null, t, o, n), (t = t.child);
          return t;
        case 16:
          if (
            ((o = t.elementType),
            null !== e &&
              ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
            (e = t.pendingProps),
            y(o),
            1 !== o._status)
          )
            throw o._result;
          switch (
            ((o = o._result),
            (t.type = o),
            (a = t.tag = ci(o)),
            (e = Vt(o, e)),
            a)
          ) {
            case 0:
              t = ir(null, t, o, e, n);
              break;
            case 1:
              t = or(null, t, o, e, n);
              break;
            case 11:
              t = er(null, t, o, e, n);
              break;
            case 14:
              t = tr(null, t, o, Vt(o.type, e), i, n);
              break;
            default:
              throw Error(r(306, o, ""));
          }
          return t;
        case 0:
          return (
            (i = t.type),
            (o = t.pendingProps),
            (o = t.elementType === i ? o : Vt(i, o)),
            ir(e, t, i, o, n)
          );
        case 1:
          return (
            (i = t.type),
            (o = t.pendingProps),
            (o = t.elementType === i ? o : Vt(i, o)),
            or(e, t, i, o, n)
          );
        case 3:
          if ((ur(t), (i = t.updateQueue), null === i)) throw Error(r(282));
          if (
            ((o = t.memoizedState),
            (o = null !== o ? o.element : null),
            sn(t, i, t.pendingProps, null, n),
            (i = t.memoizedState.element),
            i === o)
          )
            Gn(), (t = dr(e, t, n));
          else {
            if (
              ((o = t.stateNode.hydrate) &&
                ((Dl = it(t.stateNode.containerInfo.firstChild)),
                (Bl = t),
                (o = Fl = !0)),
              o)
            )
              for (n = vl(t, null, i, n), t.child = n; n; )
                (n.effectTag = (n.effectTag & -3) | 1024), (n = n.sibling);
            else Zn(e, t, i, n), Gn();
            t = t.child;
          }
          return t;
        case 5:
          return (
            Sn(t),
            null === e && $n(t),
            (i = t.type),
            (o = t.pendingProps),
            (a = null !== e ? e.memoizedProps : null),
            (u = o.children),
            rt(i, o)
              ? (u = null)
              : null !== a && rt(i, a) && (t.effectTag |= 16),
            rr(e, t),
            4 & t.mode && 1 !== n && o.hidden
              ? ((t.expirationTime = t.childExpirationTime = 1), (t = null))
              : (Zn(e, t, u, n), (t = t.child)),
            t
          );
        case 6:
          return null === e && $n(t), null;
        case 13:
          return lr(e, t, n);
        case 4:
          return (
            wn(t, t.stateNode.containerInfo),
            (i = t.pendingProps),
            null === e ? (t.child = hl(t, null, i, n)) : Zn(e, t, i, n),
            t.child
          );
        case 11:
          return (
            (i = t.type),
            (o = t.pendingProps),
            (o = t.elementType === i ? o : Vt(i, o)),
            er(e, t, i, o, n)
          );
        case 7:
          return Zn(e, t, t.pendingProps, n), t.child;
        case 8:
          return Zn(e, t, t.pendingProps.children, n), t.child;
        case 12:
          return Zn(e, t, t.pendingProps.children, n), t.child;
        case 10:
          e: {
            if (
              ((i = t.type._context),
              (o = t.pendingProps),
              (u = t.memoizedProps),
              (a = o.value),
              $t(t, a),
              null !== u)
            ) {
              var l = u.value;
              if (
                ((a = bu(l, a)
                  ? 0
                  : 0 |
                    ("function" == typeof i._calculateChangedBits
                      ? i._calculateChangedBits(l, a)
                      : 1073741823)),
                0 === a)
              ) {
                if (u.children === o.children && !zu.current) {
                  t = dr(e, t, n);
                  break e;
                }
              } else
                for (l = t.child, null !== l && (l.return = t); null !== l; ) {
                  var s = l.dependencies;
                  if (null !== s) {
                    u = l.child;
                    for (var f = s.firstContext; null !== f; ) {
                      if (f.context === i && 0 !== (f.observedBits & a)) {
                        1 === l.tag &&
                          ((f = nn(n, null)), (f.tag = 2), on(l, f)),
                          l.expirationTime < n && (l.expirationTime = n),
                          (f = l.alternate),
                          null !== f &&
                            f.expirationTime < n &&
                            (f.expirationTime = n),
                          Xt(l.return, n),
                          s.expirationTime < n && (s.expirationTime = n);
                        break;
                      }
                      f = f.next;
                    }
                  } else u = 10 === l.tag && l.type === t.type ? null : l.child;
                  if (null !== u) u.return = l;
                  else
                    for (u = l; null !== u; ) {
                      if (u === t) {
                        u = null;
                        break;
                      }
                      if (((l = u.sibling), null !== l)) {
                        (l.return = u.return), (u = l);
                        break;
                      }
                      u = u.return;
                    }
                  l = u;
                }
            }
            Zn(e, t, o.children, n), (t = t.child);
          }
          return t;
        case 9:
          return (
            (o = t.type),
            (a = t.pendingProps),
            (i = a.children),
            Gt(t, n),
            (o = Zt(o, a.unstable_observedBits)),
            (i = i(o)),
            (t.effectTag |= 1),
            Zn(e, t, i, n),
            t.child
          );
        case 14:
          return (
            (o = t.type),
            (a = Vt(o, t.pendingProps)),
            (a = Vt(o.type, a)),
            tr(e, t, o, a, i, n)
          );
        case 15:
          return nr(e, t, t.type, t.pendingProps, i, n);
        case 17:
          return (
            (i = t.type),
            (o = t.pendingProps),
            (o = t.elementType === i ? o : Vt(i, o)),
            null !== e &&
              ((e.alternate = null), (t.alternate = null), (t.effectTag |= 2)),
            (t.tag = 1),
            Mt(i) ? ((e = !0), zt(t)) : (e = !1),
            Gt(t, n),
            hn(t, i, o, n),
            yn(t, i, o, n),
            ar(null, t, i, !0, e, n)
          );
        case 19:
          return cr(e, t, n);
      }
      throw Error(r(156, t.tag));
    };
    var Is = null,
      Ms = null;
    (No = function (e) {
      if (13 === e.tag) {
        var t = Ht(Ir(), 150, 100);
        Ar(e, t), xi(e, t);
      }
    }),
      (jo = function (e) {
        if (13 === e.tag) {
          Ir();
          var t = il++;
          Ar(e, t), xi(e, t);
        }
      }),
      (Lo = function (e) {
        if (13 === e.tag) {
          var t = Ir();
          (t = Mr(t, e, null)), Ar(e, t), xi(e, t);
        }
      }),
      (yo = function (e, t, n) {
        switch (t) {
          case "input":
            if ((D(e, n), (t = n.name), "radio" === n.type && null != t)) {
              for (n = e; n.parentNode; ) n = n.parentNode;
              for (
                n = n.querySelectorAll(
                  "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
                ),
                  t = 0;
                t < n.length;
                t++
              ) {
                var i = n[t];
                if (i !== e && i.form === e.form) {
                  var o = st(i);
                  if (!o) throw Error(r(90));
                  L(i), D(i, o);
                }
              }
            }
            break;
          case "textarea":
            Q(e, n);
            break;
          case "select":
            (t = n.value), null != t && W(e, !!n.multiple, t, !1);
        }
      }),
      (Pi.prototype.render = function (e, t) {
        var n = this._internalRoot;
        Ei(e, n, null, void 0 === t ? null : t);
      }),
      (Pi.prototype.unmount = function (e) {
        var t = this._internalRoot;
        Ei(null, t, null, void 0 === e ? null : e);
      }),
      (E = Dr),
      (S = function (e, t, n, r) {
        var i = us;
        us |= 4;
        try {
          return Ft(98, e.bind(null, t, n, r));
        } finally {
          (us = i), us === Xl && Kt();
        }
      }),
      (k = function () {
        (us & (1 | Zl | es)) === Xl && (Br(), ti());
      }),
      (bo = function (e, t) {
        var n = us;
        us |= 2;
        try {
          return e(t);
        } finally {
          (us = n), us === Xl && Kt();
        }
      });
    var As = {
      createPortal: Ii,
      findDOMNode: function (e) {
        if (null == e) return null;
        if (1 === e.nodeType) return e;
        var t = e._reactInternalFiber;
        if (void 0 === t) {
          if ("function" == typeof e.render) throw Error(r(188));
          throw Error(r(268, Object.keys(e)));
        }
        return (e = oe(t)), (e = null === e ? null : e.stateNode);
      },
      hydrate: function (e, t, n) {
        if (!Oi(t)) throw Error(r(200));
        return Ri(null, e, t, !0, n);
      },
      render: function (e, t, n) {
        if (!Oi(t)) throw Error(r(200));
        return Ri(null, e, t, !1, n);
      },
      unstable_renderSubtreeIntoContainer: function (e, t, n, i) {
        if (!Oi(n)) throw Error(r(200));
        if (null == e || void 0 === e._reactInternalFiber) throw Error(r(38));
        return Ri(e, t, n, !1, i);
      },
      unmountComponentAtNode: function (e) {
        if (!Oi(e)) throw Error(r(40));
        return (
          !!e._reactRootContainer &&
          (Fr(function () {
            Ri(null, null, e, !1, function () {
              e._reactRootContainer = null;
            });
          }),
          !0)
        );
      },
      unstable_createPortal: function () {
        return Ii.apply(void 0, arguments);
      },
      unstable_batchedUpdates: Dr,
      flushSync: function (e, t) {
        if ((us & (Zl | es)) !== Xl) throw Error(r(187));
        var n = us;
        us |= 1;
        try {
          return Ft(99, e.bind(null, t));
        } finally {
          (us = n), Kt();
        }
      },
      __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
        Events: [
          ut,
          lt,
          st,
          Ji.injectEventPluginsByName,
          Ui,
          Se,
          function (e) {
            c(e, Ee);
          },
          _,
          w,
          Be,
          p,
          ti,
          {
            current: !1,
          },
        ],
      },
    };
    !(function (e) {
      var t = e.findFiberByHostInstance;
      return ui(
        Ai({}, e, {
          overrideHookState: null,
          overrideProps: null,
          setSuspenseHandler: null,
          scheduleUpdate: null,
          currentDispatcherRef: Xi.ReactCurrentDispatcher,
          findHostInstanceByFiber: function (e) {
            return (e = oe(e)), null === e ? null : e.stateNode;
          },
          findFiberByHostInstance: function (e) {
            return t ? t(e) : null;
          },
          findHostInstancesForRefresh: null,
          scheduleRefresh: null,
          scheduleRoot: null,
          setRefreshHandler: null,
          getCurrentFiber: null,
        })
      );
    })({
      findFiberByHostInstance: at,
      bundleType: 0,
      version: "16.11.0",
      rendererPackageName: "react-dom",
    });
    var Ns = {
        default: As,
      },
      js = (Ns && As) || Ns;
    e.exports = js.default || js;
  },
  function (e, t, n) {
    "use strict";
    e.exports = n(7);
  },
  function (e, t) {
    "use strict";
    function n(e, t) {
      var n = e.length;
      e.push(t);
      e: for (;;) {
        var r = Math.floor((n - 1) / 2),
          i = e[r];
        if (!(void 0 !== i && 0 < o(i, t))) break e;
        (e[r] = t), (e[n] = i), (n = r);
      }
    }
    function r(e) {
      return (e = e[0]), void 0 === e ? null : e;
    }
    function i(e) {
      var t = e[0];
      if (void 0 !== t) {
        var n = e.pop();
        if (n !== t) {
          e[0] = n;
          e: for (var r = 0, i = e.length; r < i; ) {
            var a = 2 * (r + 1) - 1,
              u = e[a],
              l = a + 1,
              s = e[l];
            if (void 0 !== u && 0 > o(u, n))
              void 0 !== s && 0 > o(s, u)
                ? ((e[r] = s), (e[l] = n), (r = l))
                : ((e[r] = u), (e[a] = n), (r = a));
            else {
              if (!(void 0 !== s && 0 > o(s, n))) break e;
              (e[r] = s), (e[l] = n), (r = l);
            }
          }
        }
        return t;
      }
      return null;
    }
    function o(e, t) {
      var n = e.sortIndex - t.sortIndex;
      return 0 !== n ? n : e.id - t.id;
    }
    function a(e) {
      for (var t = r(N); null !== t; ) {
        if (null === t.callback) i(N);
        else {
          if (!(t.startTime <= e)) break;
          i(N), (t.sortIndex = t.expirationTime), n(A, t);
        }
        t = r(N);
      }
    }
    function u(e) {
      if (((D = !1), a(e), !B))
        if (null !== r(A)) (B = !0), f(l);
        else {
          var t = r(N);
          null !== t && c(u, t.startTime - e);
        }
    }
    function l(e, n) {
      (B = !1), D && ((D = !1), d()), (U = !0);
      var o = z;
      try {
        for (
          a(n), L = r(A);
          null !== L && (!(L.expirationTime > n) || (e && !p()));

        ) {
          var l = L.callback;
          if (null !== l) {
            (L.callback = null), (z = L.priorityLevel);
            var s = l(L.expirationTime <= n);
            (n = t.unstable_now()),
              "function" == typeof s ? (L.callback = s) : L === r(A) && i(A),
              a(n);
          } else i(A);
          L = r(A);
        }
        if (null !== L) var f = !0;
        else {
          var h = r(N);
          null !== h && c(u, h.startTime - n), (f = !1);
        }
        return f;
      } finally {
        (L = null), (z = o), (U = !1);
      }
    }
    function s(e) {
      switch (e) {
        case 1:
          return -1;
        case 2:
          return 250;
        case 5:
          return 1073741823;
        case 4:
          return 1e4;
        default:
          return 5e3;
      }
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var f, c, d, p, h;
    if ("undefined" == typeof window || "function" != typeof MessageChannel) {
      var v = null,
        y = null,
        m = function () {
          if (null !== v)
            try {
              var e = t.unstable_now();
              v(!0, e), (v = null);
            } catch (e) {
              throw (setTimeout(m, 0), e);
            }
        },
        g = Date.now();
      (t.unstable_now = function () {
        return Date.now() - g;
      }),
        (f = function (e) {
          null !== v ? setTimeout(f, 0, e) : ((v = e), setTimeout(m, 0));
        }),
        (c = function (e, t) {
          y = setTimeout(e, t);
        }),
        (d = function () {
          clearTimeout(y);
        }),
        (p = function () {
          return !1;
        }),
        (h = t.unstable_forceFrameRate = function () {});
    } else {
      var b = window.performance,
        _ = window.Date,
        w = window.setTimeout,
        E = window.clearTimeout,
        S = window.requestAnimationFrame,
        k = window.cancelAnimationFrame;
      if (
        ("undefined" != typeof console &&
          ("function" != typeof S &&
            console.error(
              "This browser doesn't support requestAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
            ),
          "function" != typeof k &&
            console.error(
              "This browser doesn't support cancelAnimationFrame. Make sure that you load a polyfill in older browsers. https://fb.me/react-polyfills"
            )),
        "object" == typeof b && "function" == typeof b.now)
      )
        t.unstable_now = function () {
          return b.now();
        };
      else {
        var x = _.now();
        t.unstable_now = function () {
          return _.now() - x;
        };
      }
      var T = !1,
        P = null,
        O = -1,
        C = 5,
        R = 0;
      (p = function () {
        return t.unstable_now() >= R;
      }),
        (h = function () {}),
        (t.unstable_forceFrameRate = function (e) {
          0 > e || 125 < e
            ? console.error(
                "forceFrameRate takes a positive int between 0 and 125, forcing framerates higher than 125 fps is not unsupported"
              )
            : (C = 0 < e ? Math.floor(1e3 / e) : 33.33);
        });
      var I = new MessageChannel(),
        M = I.port2;
      (I.port1.onmessage = function () {
        if (null !== P) {
          var e = t.unstable_now();
          R = e + C;
          try {
            P(!0, e) ? M.postMessage(null) : ((T = !1), (P = null));
          } catch (e) {
            throw (M.postMessage(null), e);
          }
        } else T = !1;
      }),
        (f = function (e) {
          (P = e), T || ((T = !0), M.postMessage(null));
        }),
        (c = function (e, n) {
          O = w(function () {
            e(t.unstable_now());
          }, n);
        }),
        (d = function () {
          E(O), (O = -1);
        });
    }
    var A = [],
      N = [],
      j = 1,
      L = null,
      z = 3,
      U = !1,
      B = !1,
      D = !1,
      F = h;
    (t.unstable_ImmediatePriority = 1),
      (t.unstable_UserBlockingPriority = 2),
      (t.unstable_NormalPriority = 3),
      (t.unstable_IdlePriority = 5),
      (t.unstable_LowPriority = 4),
      (t.unstable_runWithPriority = function (e, t) {
        switch (e) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            e = 3;
        }
        var n = z;
        z = e;
        try {
          return t();
        } finally {
          z = n;
        }
      }),
      (t.unstable_next = function (e) {
        switch (z) {
          case 1:
          case 2:
          case 3:
            var t = 3;
            break;
          default:
            t = z;
        }
        var n = z;
        z = t;
        try {
          return e();
        } finally {
          z = n;
        }
      }),
      (t.unstable_scheduleCallback = function (e, i, o) {
        var a = t.unstable_now();
        if ("object" == typeof o && null !== o) {
          var p = o.delay;
          (p = "number" == typeof p && 0 < p ? a + p : a),
            (o = "number" == typeof o.timeout ? o.timeout : s(e));
        } else (o = s(e)), (p = a);
        return (
          (o = p + o),
          (e = {
            id: j++,
            callback: i,
            priorityLevel: e,
            startTime: p,
            expirationTime: o,
            sortIndex: -1,
          }),
          p > a
            ? ((e.sortIndex = p),
              n(N, e),
              null === r(A) && e === r(N) && (D ? d() : (D = !0), c(u, p - a)))
            : ((e.sortIndex = o), n(A, e), B || U || ((B = !0), f(l))),
          e
        );
      }),
      (t.unstable_cancelCallback = function (e) {
        e.callback = null;
      }),
      (t.unstable_wrapCallback = function (e) {
        var t = z;
        return function () {
          var n = z;
          z = t;
          try {
            return e.apply(this, arguments);
          } finally {
            z = n;
          }
        };
      }),
      (t.unstable_getCurrentPriorityLevel = function () {
        return z;
      }),
      (t.unstable_shouldYield = function () {
        var e = t.unstable_now();
        a(e);
        var n = r(A);
        return (
          (n !== L &&
            null !== L &&
            null !== n &&
            null !== n.callback &&
            n.startTime <= e &&
            n.expirationTime < L.expirationTime) ||
          p()
        );
      }),
      (t.unstable_requestPaint = F),
      (t.unstable_continueExecution = function () {
        B || U || ((B = !0), f(l));
      }),
      (t.unstable_pauseExecution = function () {}),
      (t.unstable_getFirstCallbackNode = function () {
        return r(A);
      }),
      (t.unstable_Profiling = null);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    (t.__esModule = !0), (t.connect = t.Provider = void 0);
    var i = n(9),
      o = r(i),
      a = n(15),
      u = r(a);
    (t.Provider = o.default), (t.connect = u.default);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }
    function a(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }
    (t.__esModule = !0), (t.default = void 0);
    var u = n(1),
      l = n(10),
      s = r(l),
      f = n(13),
      c = r(f),
      d = n(14),
      p =
        (r(d),
        (function (e) {
          function t(n, r) {
            i(this, t);
            var a = o(this, e.call(this, n, r));
            return (a.store = n.store), a;
          }
          return (
            a(t, e),
            (t.prototype.getChildContext = function () {
              return {
                store: this.store,
              };
            }),
            (t.prototype.render = function () {
              return u.Children.only(this.props.children);
            }),
            t
          );
        })(u.Component));
    (t.default = p),
      (p.propTypes = {
        store: c.default.isRequired,
        children: s.default.element.isRequired,
      }),
      (p.childContextTypes = {
        store: c.default.isRequired,
      });
  },
  function (e, t, n) {
    e.exports = n(11)();
  },
  function (e, t, n) {
    "use strict";
    function r() {}
    function i() {}
    var o = n(12);
    (i.resetWarningCache = r),
      (e.exports = function () {
        function e(e, t, n, r, i, a) {
          if (a !== o) {
            var u = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw ((u.name = "Invariant Violation"), u);
          }
        }
        function t() {
          return e;
        }
        e.isRequired = e;
        var n = {
          array: e,
          bool: e,
          func: e,
          number: e,
          object: e,
          string: e,
          symbol: e,
          any: e,
          arrayOf: t,
          element: e,
          elementType: e,
          instanceOf: t,
          node: e,
          objectOf: t,
          oneOf: t,
          oneOfType: t,
          shape: t,
          exact: t,
          checkPropTypes: i,
          resetWarningCache: r,
        };
        return (n.PropTypes = n), n;
      });
  },
  function (e, t) {
    "use strict";
    var n = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
    e.exports = n;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    t.__esModule = !0;
    var i = n(10),
      o = r(i);
    t.default = o.default.shape({
      subscribe: o.default.func.isRequired,
      dispatch: o.default.func.isRequired,
      getState: o.default.func.isRequired,
    });
  },
  function (e, t) {
    "use strict";
    function n(e) {
      "undefined" != typeof console &&
        "function" == typeof console.error &&
        console.error(e);
      try {
        throw new Error(e);
      } catch (e) {}
    }
    (t.__esModule = !0), (t.default = n);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }
    function a(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }
    function u(e) {
      return e.displayName || e.name || "Component";
    }
    function l(e, t) {
      try {
        return e.apply(t);
      } catch (e) {
        return (P.value = e), P;
      }
    }
    function s(e, t, n) {
      var r =
          arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {},
        s = Boolean(e),
        d = e || k,
        h = void 0;
      h = "function" == typeof t ? t : t ? (0, m.default)(t) : x;
      var y = n || T,
        g = r.pure,
        b = void 0 === g || g,
        _ = r.withRef,
        E = void 0 !== _ && _,
        C = b && y !== T,
        R = O++;
      return function (e) {
        function t(e, t, n) {
          var r = y(e, t, n);
          return r;
        }
        var n = "Connect(" + u(e) + ")",
          r = (function (r) {
            function u(e, t) {
              i(this, u);
              var a = o(this, r.call(this, e, t));
              (a.version = R),
                (a.store = e.store || t.store),
                (0, S.default)(
                  a.store,
                  'Could not find "store" in either the context or ' +
                    ('props of "' + n + '". ') +
                    "Either wrap the root component in a <Provider>, " +
                    ('or explicitly pass "store" as a prop to "' + n + '".')
                );
              var l = a.store.getState();
              return (
                (a.state = {
                  storeState: l,
                }),
                a.clearCache(),
                a
              );
            }
            return (
              a(u, r),
              (u.prototype.shouldComponentUpdate = function () {
                return (
                  !b || this.haveOwnPropsChanged || this.hasStoreStateChanged
                );
              }),
              (u.prototype.computeStateProps = function (e, t) {
                if (!this.finalMapStateToProps)
                  return this.configureFinalMapState(e, t);
                var n = e.getState(),
                  r = this.doStatePropsDependOnOwnProps
                    ? this.finalMapStateToProps(n, t)
                    : this.finalMapStateToProps(n);
                return r;
              }),
              (u.prototype.configureFinalMapState = function (e, t) {
                var n = d(e.getState(), t),
                  r = "function" == typeof n;
                return (
                  (this.finalMapStateToProps = r ? n : d),
                  (this.doStatePropsDependOnOwnProps =
                    1 !== this.finalMapStateToProps.length),
                  r ? this.computeStateProps(e, t) : n
                );
              }),
              (u.prototype.computeDispatchProps = function (e, t) {
                if (!this.finalMapDispatchToProps)
                  return this.configureFinalMapDispatch(e, t);
                var n = e.dispatch,
                  r = this.doDispatchPropsDependOnOwnProps
                    ? this.finalMapDispatchToProps(n, t)
                    : this.finalMapDispatchToProps(n);
                return r;
              }),
              (u.prototype.configureFinalMapDispatch = function (e, t) {
                var n = h(e.dispatch, t),
                  r = "function" == typeof n;
                return (
                  (this.finalMapDispatchToProps = r ? n : h),
                  (this.doDispatchPropsDependOnOwnProps =
                    1 !== this.finalMapDispatchToProps.length),
                  r ? this.computeDispatchProps(e, t) : n
                );
              }),
              (u.prototype.updateStatePropsIfNeeded = function () {
                var e = this.computeStateProps(this.store, this.props);
                return (
                  (!this.stateProps || !(0, v.default)(e, this.stateProps)) &&
                  ((this.stateProps = e), !0)
                );
              }),
              (u.prototype.updateDispatchPropsIfNeeded = function () {
                var e = this.computeDispatchProps(this.store, this.props);
                return (
                  (!this.dispatchProps ||
                    !(0, v.default)(e, this.dispatchProps)) &&
                  ((this.dispatchProps = e), !0)
                );
              }),
              (u.prototype.updateMergedPropsIfNeeded = function () {
                var e = t(this.stateProps, this.dispatchProps, this.props);
                return (
                  !(
                    this.mergedProps &&
                    C &&
                    (0, v.default)(e, this.mergedProps)
                  ) && ((this.mergedProps = e), !0)
                );
              }),
              (u.prototype.isSubscribed = function () {
                return "function" == typeof this.unsubscribe;
              }),
              (u.prototype.trySubscribe = function () {
                s &&
                  !this.unsubscribe &&
                  ((this.unsubscribe = this.store.subscribe(
                    this.handleChange.bind(this)
                  )),
                  this.handleChange());
              }),
              (u.prototype.tryUnsubscribe = function () {
                this.unsubscribe &&
                  (this.unsubscribe(), (this.unsubscribe = null));
              }),
              (u.prototype.componentDidMount = function () {
                this.trySubscribe();
              }),
              (u.prototype.componentWillReceiveProps = function (e) {
                (b && (0, v.default)(e, this.props)) ||
                  (this.haveOwnPropsChanged = !0);
              }),
              (u.prototype.componentWillUnmount = function () {
                this.tryUnsubscribe(), this.clearCache();
              }),
              (u.prototype.clearCache = function () {
                (this.dispatchProps = null),
                  (this.stateProps = null),
                  (this.mergedProps = null),
                  (this.haveOwnPropsChanged = !0),
                  (this.hasStoreStateChanged = !0),
                  (this.haveStatePropsBeenPrecalculated = !1),
                  (this.statePropsPrecalculationError = null),
                  (this.renderedElement = null),
                  (this.finalMapDispatchToProps = null),
                  (this.finalMapStateToProps = null);
              }),
              (u.prototype.handleChange = function () {
                if (this.unsubscribe) {
                  var e = this.store.getState(),
                    t = this.state.storeState;
                  if (!b || t !== e) {
                    if (b && !this.doStatePropsDependOnOwnProps) {
                      var n = l(this.updateStatePropsIfNeeded, this);
                      if (!n) return;
                      n === P && (this.statePropsPrecalculationError = P.value),
                        (this.haveStatePropsBeenPrecalculated = !0);
                    }
                    (this.hasStoreStateChanged = !0),
                      this.setState({
                        storeState: e,
                      });
                  }
                }
              }),
              (u.prototype.getWrappedInstance = function () {
                return (
                  (0, S.default)(
                    E,
                    "To access the wrapped instance, you need to specify { withRef: true } as the fourth argument of the connect() call."
                  ),
                  this.refs.wrappedInstance
                );
              }),
              (u.prototype.render = function () {
                var t = this.haveOwnPropsChanged,
                  n = this.hasStoreStateChanged,
                  r = this.haveStatePropsBeenPrecalculated,
                  i = this.statePropsPrecalculationError,
                  o = this.renderedElement;
                if (
                  ((this.haveOwnPropsChanged = !1),
                  (this.hasStoreStateChanged = !1),
                  (this.haveStatePropsBeenPrecalculated = !1),
                  (this.statePropsPrecalculationError = null),
                  i)
                )
                  throw i;
                var a = !0,
                  u = !0;
                b &&
                  o &&
                  ((a = n || (t && this.doStatePropsDependOnOwnProps)),
                  (u = t && this.doDispatchPropsDependOnOwnProps));
                var l = !1,
                  s = !1;
                r ? (l = !0) : a && (l = this.updateStatePropsIfNeeded()),
                  u && (s = this.updateDispatchPropsIfNeeded());
                var d = !0;
                return (
                  (d = !!(l || s || t) && this.updateMergedPropsIfNeeded()),
                  !d && o
                    ? o
                    : (E
                        ? (this.renderedElement = (0, c.createElement)(
                            e,
                            f({}, this.mergedProps, {
                              ref: "wrappedInstance",
                            })
                          ))
                        : (this.renderedElement = (0, c.createElement)(
                            e,
                            this.mergedProps
                          )),
                      this.renderedElement)
                );
              }),
              u
            );
          })(c.Component);
        return (
          (r.displayName = n),
          (r.WrappedComponent = e),
          (r.contextTypes = {
            store: p.default,
          }),
          (r.propTypes = {
            store: p.default,
          }),
          (0, w.default)(r, e)
        );
      };
    }
    t.__esModule = !0;
    var f =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
    t.default = s;
    var c = n(1),
      d = n(13),
      p = r(d),
      h = n(16),
      v = r(h),
      y = n(17),
      m = r(y),
      g = n(14),
      b = (r(g), n(20)),
      _ = (r(b), n(39)),
      w = r(_),
      E = n(40),
      S = r(E),
      k = function (e) {
        return {};
      },
      x = function (e) {
        return {
          dispatch: e,
        };
      },
      T = function (e, t, n) {
        return f({}, n, e, t);
      },
      P = {
        value: null,
      },
      O = 0;
  },
  function (e, t) {
    "use strict";
    function n(e, t) {
      if (e === t) return !0;
      var n = Object.keys(e),
        r = Object.keys(t);
      if (n.length !== r.length) return !1;
      for (var i = Object.prototype.hasOwnProperty, o = 0; o < n.length; o++)
        if (!i.call(t, n[o]) || e[n[o]] !== t[n[o]]) return !1;
      return !0;
    }
    (t.__esModule = !0), (t.default = n);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return function (t) {
        return (0, i.bindActionCreators)(e, t);
      };
    }
    (t.__esModule = !0), (t.default = r);
    var i = n(18);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    (t.__esModule = !0),
      (t.compose =
        t.applyMiddleware =
        t.bindActionCreators =
        t.combineReducers =
        t.createStore =
          void 0);
    var i = n(19),
      o = r(i),
      a = n(34),
      u = r(a),
      l = n(36),
      s = r(l),
      f = n(37),
      c = r(f),
      d = n(38),
      p = r(d),
      h = n(35);
    r(h);
    (t.createStore = o.default),
      (t.combineReducers = u.default),
      (t.bindActionCreators = s.default),
      (t.applyMiddleware = c.default),
      (t.compose = p.default);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e, t, n) {
      function r() {
        m === y && (m = y.slice());
      }
      function o() {
        return v;
      }
      function u(e) {
        if ("function" != typeof e)
          throw new Error("Expected listener to be a function.");
        var t = !0;
        return (
          r(),
          m.push(e),
          function () {
            if (t) {
              (t = !1), r();
              var n = m.indexOf(e);
              m.splice(n, 1);
            }
          }
        );
      }
      function f(e) {
        if (!(0, a.default)(e))
          throw new Error(
            "Actions must be plain objects. Use custom middleware for async actions."
          );
        if ("undefined" == typeof e.type)
          throw new Error(
            'Actions may not have an undefined "type" property. Have you misspelled a constant?'
          );
        if (g) throw new Error("Reducers may not dispatch actions.");
        try {
          (g = !0), (v = h(v, e));
        } finally {
          g = !1;
        }
        for (var t = (y = m), n = 0; n < t.length; n++) {
          var r = t[n];
          r();
        }
        return e;
      }
      function c(e) {
        if ("function" != typeof e)
          throw new Error("Expected the nextReducer to be a function.");
        (h = e),
          f({
            type: s.INIT,
          });
      }
      function d() {
        var e,
          t = u;
        return (
          (e = {
            subscribe: function (e) {
              function n() {
                e.next && e.next(o());
              }
              if ("object" != typeof e)
                throw new TypeError("Expected the observer to be an object.");
              n();
              var r = t(n);
              return {
                unsubscribe: r,
              };
            },
          }),
          (e[l.default] = function () {
            return this;
          }),
          e
        );
      }
      var p;
      if (
        ("function" == typeof t &&
          "undefined" == typeof n &&
          ((n = t), (t = void 0)),
        "undefined" != typeof n)
      ) {
        if ("function" != typeof n)
          throw new Error("Expected the enhancer to be a function.");
        return n(i)(e, t);
      }
      if ("function" != typeof e)
        throw new Error("Expected the reducer to be a function.");
      var h = e,
        v = t,
        y = [],
        m = y,
        g = !1;
      return (
        f({
          type: s.INIT,
        }),
        (p = {
          dispatch: f,
          subscribe: u,
          getState: o,
          replaceReducer: c,
        }),
        (p[l.default] = d),
        p
      );
    }
    (t.__esModule = !0), (t.ActionTypes = void 0), (t.default = i);
    var o = n(20),
      a = r(o),
      u = n(30),
      l = r(u),
      s = (t.ActionTypes = {
        INIT: "@@redux/INIT",
      });
  },
  function (e, t, n) {
    function r(e) {
      if (!a(e) || i(e) != u) return !1;
      var t = o(e);
      if (null === t) return !0;
      var n = c.call(t, "constructor") && t.constructor;
      return "function" == typeof n && n instanceof n && f.call(n) == d;
    }
    var i = n(21),
      o = n(27),
      a = n(29),
      u = "[object Object]",
      l = Function.prototype,
      s = Object.prototype,
      f = l.toString,
      c = s.hasOwnProperty,
      d = f.call(Object);
    e.exports = r;
  },
  function (e, t, n) {
    function r(e) {
      return null == e
        ? void 0 === e
          ? l
          : u
        : s && s in Object(e)
        ? o(e)
        : a(e);
    }
    var i = n(22),
      o = n(25),
      a = n(26),
      u = "[object Null]",
      l = "[object Undefined]",
      s = i ? i.toStringTag : void 0;
    e.exports = r;
  },
  function (e, t, n) {
    var r = n(23),
      i = r.Symbol;
    e.exports = i;
  },
  function (e, t, n) {
    var r = n(24),
      i = "object" == typeof self && self && self.Object === Object && self,
      o = r || i || Function("return this")();
    e.exports = o;
  },
  function (e, t) {
    (function (t) {
      var n = "object" == typeof t && t && t.Object === Object && t;
      e.exports = n;
    }).call(
      t,
      (function () {
        return this;
      })()
    );
  },
  function (e, t, n) {
    function r(e) {
      var t = a.call(e, l),
        n = e[l];
      try {
        e[l] = void 0;
        var r = !0;
      } catch (e) {}
      var i = u.call(e);
      return r && (t ? (e[l] = n) : delete e[l]), i;
    }
    var i = n(22),
      o = Object.prototype,
      a = o.hasOwnProperty,
      u = o.toString,
      l = i ? i.toStringTag : void 0;
    e.exports = r;
  },
  function (e, t) {
    function n(e) {
      return i.call(e);
    }
    var r = Object.prototype,
      i = r.toString;
    e.exports = n;
  },
  function (e, t, n) {
    var r = n(28),
      i = r(Object.getPrototypeOf, Object);
    e.exports = i;
  },
  function (e, t) {
    function n(e, t) {
      return function (n) {
        return e(t(n));
      };
    }
    e.exports = n;
  },
  function (e, t) {
    function n(e) {
      return null != e && "object" == typeof e;
    }
    e.exports = n;
  },
  function (e, t, n) {
    e.exports = n(31);
  },
  function (e, t, n) {
    (function (e, r) {
      "use strict";
      function i(e) {
        return e && e.__esModule
          ? e
          : {
              default: e,
            };
      }
      Object.defineProperty(t, "__esModule", {
        value: !0,
      });
      var o,
        a = n(33),
        u = i(a);
      o =
        "undefined" != typeof self
          ? self
          : "undefined" != typeof window
          ? window
          : "undefined" != typeof e
          ? e
          : r;
      var l = (0, u.default)(o);
      t.default = l;
    }).call(
      t,
      (function () {
        return this;
      })(),
      n(32)(e)
    );
  },
  function (e, t) {
    e.exports = function (e) {
      return (
        e.webpackPolyfill ||
          ((e.deprecate = function () {}),
          (e.paths = []),
          (e.children = []),
          (e.webpackPolyfill = 1)),
        e
      );
    };
  },
  function (e, t) {
    "use strict";
    function n(e) {
      var t,
        n = e.Symbol;
      return (
        "function" == typeof n
          ? n.observable
            ? (t = n.observable)
            : ((t = n("observable")), (n.observable = t))
          : (t = "@@observable"),
        t
      );
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    }),
      (t.default = n);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e, t) {
      var n = t && t.type,
        r = (n && '"' + n.toString() + '"') || "an action";
      return (
        "Given action " +
        r +
        ', reducer "' +
        e +
        '" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.'
      );
    }
    function o(e) {
      Object.keys(e).forEach(function (t) {
        var n = e[t],
          r = n(void 0, {
            type: u.ActionTypes.INIT,
          });
        if ("undefined" == typeof r)
          throw new Error(
            'Reducer "' +
              t +
              "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined."
          );
        var i =
          "@@redux/PROBE_UNKNOWN_ACTION_" +
          Math.random().toString(36).substring(7).split("").join(".");
        if (
          "undefined" ==
          typeof n(void 0, {
            type: i,
          })
        )
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when probed with a random type. ' +
              ("Don't try to handle " +
                u.ActionTypes.INIT +
                ' or other actions in "redux/*" ') +
              "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null."
          );
      });
    }
    function a(e) {
      for (var t = Object.keys(e), n = {}, r = 0; r < t.length; r++) {
        var a = t[r];
        "function" == typeof e[a] && (n[a] = e[a]);
      }
      var u = Object.keys(n),
        l = void 0;
      try {
        o(n);
      } catch (e) {
        l = e;
      }
      return function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {},
          t = arguments[1];
        if (l) throw l;
        for (var r = !1, o = {}, a = 0; a < u.length; a++) {
          var s = u[a],
            f = n[s],
            c = e[s],
            d = f(c, t);
          if ("undefined" == typeof d) {
            var p = i(s, t);
            throw new Error(p);
          }
          (o[s] = d), (r = r || d !== c);
        }
        return r ? o : e;
      };
    }
    (t.__esModule = !0), (t.default = a);
    var u = n(19),
      l = n(20),
      s = (r(l), n(35));
    r(s);
  },
  function (e, t) {
    "use strict";
    function n(e) {
      "undefined" != typeof console &&
        "function" == typeof console.error &&
        console.error(e);
      try {
        throw new Error(e);
      } catch (e) {}
    }
    (t.__esModule = !0), (t.default = n);
  },
  function (e, t) {
    "use strict";
    function n(e, t) {
      return function () {
        return t(e.apply(void 0, arguments));
      };
    }
    function r(e, t) {
      if ("function" == typeof e) return n(e, t);
      if ("object" != typeof e || null === e)
        throw new Error(
          "bindActionCreators expected an object or a function, instead received " +
            (null === e ? "null" : typeof e) +
            '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
        );
      for (var r = Object.keys(e), i = {}, o = 0; o < r.length; o++) {
        var a = r[o],
          u = e[a];
        "function" == typeof u && (i[a] = n(u, t));
      }
      return i;
    }
    (t.__esModule = !0), (t.default = r);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return function (e) {
        return function (n, r, i) {
          var a = e(n, r, i),
            l = a.dispatch,
            s = [],
            f = {
              getState: a.getState,
              dispatch: function (e) {
                return l(e);
              },
            };
          return (
            (s = t.map(function (e) {
              return e(f);
            })),
            (l = u.default.apply(void 0, s)(a.dispatch)),
            o({}, a, {
              dispatch: l,
            })
          );
        };
      };
    }
    t.__esModule = !0;
    var o =
      Object.assign ||
      function (e) {
        for (var t = 1; t < arguments.length; t++) {
          var n = arguments[t];
          for (var r in n)
            Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
        }
        return e;
      };
    t.default = i;
    var a = n(38),
      u = r(a);
  },
  function (e, t) {
    "use strict";
    function n() {
      for (var e = arguments.length, t = Array(e), n = 0; n < e; n++)
        t[n] = arguments[n];
      return 0 === t.length
        ? function (e) {
            return e;
          }
        : 1 === t.length
        ? t[0]
        : t.reduce(function (e, t) {
            return function () {
              return e(t.apply(void 0, arguments));
            };
          });
    }
    (t.__esModule = !0), (t.default = n);
  },
  function (e, t) {
    "use strict";
    var n = {
        childContextTypes: !0,
        contextTypes: !0,
        defaultProps: !0,
        displayName: !0,
        getDefaultProps: !0,
        mixins: !0,
        propTypes: !0,
        type: !0,
      },
      r = {
        name: !0,
        length: !0,
        prototype: !0,
        caller: !0,
        arguments: !0,
        arity: !0,
      },
      i = "function" == typeof Object.getOwnPropertySymbols;
    e.exports = function (e, t, o) {
      if ("string" != typeof t) {
        var a = Object.getOwnPropertyNames(t);
        i && (a = a.concat(Object.getOwnPropertySymbols(t)));
        for (var u = 0; u < a.length; ++u)
          if (!(n[a[u]] || r[a[u]] || (o && o[a[u]])))
            try {
              e[a[u]] = t[a[u]];
            } catch (e) {}
      }
      return e;
    };
  },
  function (e, t, n) {
    "use strict";
    var r = function (e, t, n, r, i, o, a, u) {
      if (!e) {
        var l;
        if (void 0 === t)
          l = new Error(
            "Minified exception occurred; use the non-minified dev environment for the full error message and additional helpful warnings."
          );
        else {
          var s = [n, r, i, o, a, u],
            f = 0;
          (l = new Error(
            t.replace(/%s/g, function () {
              return s[f++];
            })
          )),
            (l.name = "Invariant Violation");
        }
        throw ((l.framesToPop = 1), l);
      }
    };
    e.exports = r;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(18),
      o = n(42),
      a = r(o),
      u = (0, i.createStore)(
        a.default,
        window.devToolsExtension && window.devToolsExtension()
      );
    t.default = u;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(43),
      o = n(50),
      a = r(o),
      u = n(54),
      l = r(u),
      s = n(56),
      f = r(s),
      c = n(57),
      d = r(c),
      p = n(59),
      h = r(p),
      v = n(61),
      y = r(v),
      m = n(62),
      g = r(m),
      b = n(63),
      _ = r(b),
      w = n(64),
      E = r(w),
      S = n(65),
      k = r(S),
      x = n(66),
      T = r(x),
      P = n(67),
      O = r(P),
      C = n(68),
      R = r(C),
      I = n(69),
      M = r(I),
      A = n(70),
      N = r(A),
      j = n(79),
      L = r(j),
      z = (0, i.combineReducers)({
        pause: a.default,
        music: l.default,
        matrix: f.default,
        next: d.default,
        cur: h.default,
        startLines: y.default,
        max: g.default,
        points: _.default,
        speedStart: E.default,
        speedRun: k.default,
        lock: T.default,
        clearLines: O.default,
        reset: R.default,
        drop: M.default,
        keyboard: N.default,
        focus: L.default,
      });
    t.default = z;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    }),
      (t.combineReducers = void 0);
    var i = n(44),
      o = r(i);
    t.combineReducers = o.default;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(45),
      o = r(i),
      a = n(46);
    (t.default = function (e) {
      var t =
          arguments.length > 1 && void 0 !== arguments[1]
            ? arguments[1]
            : o.default.Map,
        n = Object.keys(e);
      return function () {
        var r =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : t(),
          i = arguments[1];
        return r.withMutations(function (t) {
          n.forEach(function (n) {
            var r = e[n],
              o = t.get(n),
              u = r(o, i);
            (0, a.validateNextState)(u, n, i), t.set(n, u);
          });
        });
      };
    }),
      (e.exports = t.default);
  },
  function (e, t, n) {
    !(function (t, n) {
      e.exports = n();
    })(this, function () {
      "use strict";
      function e(e, t) {
        t && (e.prototype = Object.create(t.prototype)),
          (e.prototype.constructor = e);
      }
      function t(e) {
        return o(e) ? e : C(e);
      }
      function n(e) {
        return a(e) ? e : R(e);
      }
      function r(e) {
        return u(e) ? e : I(e);
      }
      function i(e) {
        return o(e) && !l(e) ? e : M(e);
      }
      function o(e) {
        return !(!e || !e[sn]);
      }
      function a(e) {
        return !(!e || !e[fn]);
      }
      function u(e) {
        return !(!e || !e[cn]);
      }
      function l(e) {
        return a(e) || u(e);
      }
      function s(e) {
        return !(!e || !e[dn]);
      }
      function f(e) {
        return (e.value = !1), e;
      }
      function c(e) {
        e && (e.value = !0);
      }
      function d() {}
      function p(e, t) {
        t = t || 0;
        for (
          var n = Math.max(0, e.length - t), r = new Array(n), i = 0;
          i < n;
          i++
        )
          r[i] = e[i + t];
        return r;
      }
      function h(e) {
        return void 0 === e.size && (e.size = e.__iterate(y)), e.size;
      }
      function v(e, t) {
        if ("number" != typeof t) {
          var n = t >>> 0;
          if ("" + n !== t || 4294967295 === n) return NaN;
          t = n;
        }
        return t < 0 ? h(e) + t : t;
      }
      function y() {
        return !0;
      }
      function m(e, t, n) {
        return (
          (0 === e || (void 0 !== n && e <= -n)) &&
          (void 0 === t || (void 0 !== n && t >= n))
        );
      }
      function g(e, t) {
        return _(e, t, 0);
      }
      function b(e, t) {
        return _(e, t, t);
      }
      function _(e, t, n) {
        return void 0 === e
          ? n
          : e < 0
          ? Math.max(0, t + e)
          : void 0 === t
          ? e
          : Math.min(t, e);
      }
      function w(e) {
        this.next = e;
      }
      function E(e, t, n, r) {
        var i = 0 === e ? t : 1 === e ? n : [t, n];
        return (
          r
            ? (r.value = i)
            : (r = {
                value: i,
                done: !1,
              }),
          r
        );
      }
      function S() {
        return {
          value: void 0,
          done: !0,
        };
      }
      function k(e) {
        return !!P(e);
      }
      function x(e) {
        return e && "function" == typeof e.next;
      }
      function T(e) {
        var t = P(e);
        return t && t.call(e);
      }
      function P(e) {
        var t = e && ((Sn && e[Sn]) || e[kn]);
        if ("function" == typeof t) return t;
      }
      function O(e) {
        return e && "number" == typeof e.length;
      }
      function C(e) {
        return null === e || void 0 === e ? U() : o(e) ? e.toSeq() : F(e);
      }
      function R(e) {
        return null === e || void 0 === e
          ? U().toKeyedSeq()
          : o(e)
          ? a(e)
            ? e.toSeq()
            : e.fromEntrySeq()
          : B(e);
      }
      function I(e) {
        return null === e || void 0 === e
          ? U()
          : o(e)
          ? a(e)
            ? e.entrySeq()
            : e.toIndexedSeq()
          : D(e);
      }
      function M(e) {
        return (
          null === e || void 0 === e
            ? U()
            : o(e)
            ? a(e)
              ? e.entrySeq()
              : e
            : D(e)
        ).toSetSeq();
      }
      function A(e) {
        (this._array = e), (this.size = e.length);
      }
      function N(e) {
        var t = Object.keys(e);
        (this._object = e), (this._keys = t), (this.size = t.length);
      }
      function j(e) {
        (this._iterable = e), (this.size = e.length || e.size);
      }
      function L(e) {
        (this._iterator = e), (this._iteratorCache = []);
      }
      function z(e) {
        return !(!e || !e[Tn]);
      }
      function U() {
        return Pn || (Pn = new A([]));
      }
      function B(e) {
        var t = Array.isArray(e)
          ? new A(e).fromEntrySeq()
          : x(e)
          ? new L(e).fromEntrySeq()
          : k(e)
          ? new j(e).fromEntrySeq()
          : "object" == typeof e
          ? new N(e)
          : void 0;
        if (!t)
          throw new TypeError(
            "Expected Array or iterable object of [k, v] entries, or keyed object: " +
              e
          );
        return t;
      }
      function D(e) {
        var t = q(e);
        if (!t)
          throw new TypeError(
            "Expected Array or iterable object of values: " + e
          );
        return t;
      }
      function F(e) {
        var t = q(e) || ("object" == typeof e && new N(e));
        if (!t)
          throw new TypeError(
            "Expected Array or iterable object of values, or keyed object: " + e
          );
        return t;
      }
      function q(e) {
        return O(e) ? new A(e) : x(e) ? new L(e) : k(e) ? new j(e) : void 0;
      }
      function Y(e, t, n, r) {
        var i = e._cache;
        if (i) {
          for (var o = i.length - 1, a = 0; a <= o; a++) {
            var u = i[n ? o - a : a];
            if (t(u[1], r ? u[0] : a, e) === !1) return a + 1;
          }
          return a;
        }
        return e.__iterateUncached(t, n);
      }
      function K(e, t, n, r) {
        var i = e._cache;
        if (i) {
          var o = i.length - 1,
            a = 0;
          return new w(function () {
            var e = i[n ? o - a : a];
            return a++ > o ? S() : E(t, r ? e[0] : a - 1, e[1]);
          });
        }
        return e.__iteratorUncached(t, n);
      }
      function W(e, t) {
        return t
          ? H(t, e, "", {
              "": e,
            })
          : V(e);
      }
      function H(e, t, n, r) {
        return Array.isArray(t)
          ? e.call(
              r,
              n,
              I(t).map(function (n, r) {
                return H(e, n, r, t);
              })
            )
          : Q(t)
          ? e.call(
              r,
              n,
              R(t).map(function (n, r) {
                return H(e, n, r, t);
              })
            )
          : t;
      }
      function V(e) {
        return Array.isArray(e)
          ? I(e).map(V).toList()
          : Q(e)
          ? R(e).map(V).toMap()
          : e;
      }
      function Q(e) {
        return e && (e.constructor === Object || void 0 === e.constructor);
      }
      function $(e, t) {
        if (e === t || (e !== e && t !== t)) return !0;
        if (!e || !t) return !1;
        if ("function" == typeof e.valueOf && "function" == typeof t.valueOf) {
          if (
            ((e = e.valueOf()),
            (t = t.valueOf()),
            e === t || (e !== e && t !== t))
          )
            return !0;
          if (!e || !t) return !1;
        }
        return !(
          "function" != typeof e.equals ||
          "function" != typeof t.equals ||
          !e.equals(t)
        );
      }
      function J(e, t) {
        if (e === t) return !0;
        if (
          !o(t) ||
          (void 0 !== e.size && void 0 !== t.size && e.size !== t.size) ||
          (void 0 !== e.__hash &&
            void 0 !== t.__hash &&
            e.__hash !== t.__hash) ||
          a(e) !== a(t) ||
          u(e) !== u(t) ||
          s(e) !== s(t)
        )
          return !1;
        if (0 === e.size && 0 === t.size) return !0;
        var n = !l(e);
        if (s(e)) {
          var r = e.entries();
          return (
            t.every(function (e, t) {
              var i = r.next().value;
              return i && $(i[1], e) && (n || $(i[0], t));
            }) && r.next().done
          );
        }
        var i = !1;
        if (void 0 === e.size)
          if (void 0 === t.size)
            "function" == typeof e.cacheResult && e.cacheResult();
          else {
            i = !0;
            var f = e;
            (e = t), (t = f);
          }
        var c = !0,
          d = t.__iterate(function (t, r) {
            if (n ? !e.has(t) : i ? !$(t, e.get(r, mn)) : !$(e.get(r, mn), t))
              return (c = !1), !1;
          });
        return c && e.size === d;
      }
      function X(e, t) {
        if (!(this instanceof X)) return new X(e, t);
        if (
          ((this._value = e),
          (this.size = void 0 === t ? 1 / 0 : Math.max(0, t)),
          0 === this.size)
        ) {
          if (On) return On;
          On = this;
        }
      }
      function G(e, t) {
        if (!e) throw new Error(t);
      }
      function Z(e, t, n) {
        if (!(this instanceof Z)) return new Z(e, t, n);
        if (
          (G(0 !== n, "Cannot step a Range by 0"),
          (e = e || 0),
          void 0 === t && (t = 1 / 0),
          (n = void 0 === n ? 1 : Math.abs(n)),
          t < e && (n = -n),
          (this._start = e),
          (this._end = t),
          (this._step = n),
          (this.size = Math.max(0, Math.ceil((t - e) / n - 1) + 1)),
          0 === this.size)
        ) {
          if (Cn) return Cn;
          Cn = this;
        }
      }
      function ee() {
        throw TypeError("Abstract");
      }
      function te() {}
      function ne() {}
      function re() {}
      function ie(e) {
        return ((e >>> 1) & 1073741824) | (3221225471 & e);
      }
      function oe(e) {
        if (e === !1 || null === e || void 0 === e) return 0;
        if (
          "function" == typeof e.valueOf &&
          ((e = e.valueOf()), e === !1 || null === e || void 0 === e)
        )
          return 0;
        if (e === !0) return 1;
        var t = typeof e;
        if ("number" === t) {
          if (e !== e || e === 1 / 0) return 0;
          var n = 0 | e;
          for (n !== e && (n ^= 4294967295 * e); e > 4294967295; )
            (e /= 4294967295), (n ^= e);
          return ie(n);
        }
        if ("string" === t) return e.length > zn ? ae(e) : ue(e);
        if ("function" == typeof e.hashCode) return e.hashCode();
        if ("object" === t) return le(e);
        if ("function" == typeof e.toString) return ue(e.toString());
        throw new Error("Value type " + t + " cannot be hashed.");
      }
      function ae(e) {
        var t = Dn[e];
        return (
          void 0 === t &&
            ((t = ue(e)),
            Bn === Un && ((Bn = 0), (Dn = {})),
            Bn++,
            (Dn[e] = t)),
          t
        );
      }
      function ue(e) {
        for (var t = 0, n = 0; n < e.length; n++)
          t = (31 * t + e.charCodeAt(n)) | 0;
        return ie(t);
      }
      function le(e) {
        var t;
        if (Nn && ((t = Rn.get(e)), void 0 !== t)) return t;
        if (((t = e[Ln]), void 0 !== t)) return t;
        if (!An) {
          if (
            ((t = e.propertyIsEnumerable && e.propertyIsEnumerable[Ln]),
            void 0 !== t)
          )
            return t;
          if (((t = se(e)), void 0 !== t)) return t;
        }
        if (((t = ++jn), 1073741824 & jn && (jn = 0), Nn)) Rn.set(e, t);
        else {
          if (void 0 !== Mn && Mn(e) === !1)
            throw new Error("Non-extensible objects are not allowed as keys.");
          if (An)
            Object.defineProperty(e, Ln, {
              enumerable: !1,
              configurable: !1,
              writable: !1,
              value: t,
            });
          else if (
            void 0 !== e.propertyIsEnumerable &&
            e.propertyIsEnumerable ===
              e.constructor.prototype.propertyIsEnumerable
          )
            (e.propertyIsEnumerable = function () {
              return this.constructor.prototype.propertyIsEnumerable.apply(
                this,
                arguments
              );
            }),
              (e.propertyIsEnumerable[Ln] = t);
          else {
            if (void 0 === e.nodeType)
              throw new Error(
                "Unable to set a non-enumerable property on object."
              );
            e[Ln] = t;
          }
        }
        return t;
      }
      function se(e) {
        if (e && e.nodeType > 0)
          switch (e.nodeType) {
            case 1:
              return e.uniqueID;
            case 9:
              return e.documentElement && e.documentElement.uniqueID;
          }
      }
      function fe(e) {
        G(e !== 1 / 0, "Cannot perform this action with an infinite size.");
      }
      function ce(e) {
        return null === e || void 0 === e
          ? Ee()
          : de(e) && !s(e)
          ? e
          : Ee().withMutations(function (t) {
              var r = n(e);
              fe(r.size),
                r.forEach(function (e, n) {
                  return t.set(n, e);
                });
            });
      }
      function de(e) {
        return !(!e || !e[Fn]);
      }
      function pe(e, t) {
        (this.ownerID = e), (this.entries = t);
      }
      function he(e, t, n) {
        (this.ownerID = e), (this.bitmap = t), (this.nodes = n);
      }
      function ve(e, t, n) {
        (this.ownerID = e), (this.count = t), (this.nodes = n);
      }
      function ye(e, t, n) {
        (this.ownerID = e), (this.keyHash = t), (this.entries = n);
      }
      function me(e, t, n) {
        (this.ownerID = e), (this.keyHash = t), (this.entry = n);
      }
      function ge(e, t, n) {
        (this._type = t),
          (this._reverse = n),
          (this._stack = e._root && _e(e._root));
      }
      function be(e, t) {
        return E(e, t[0], t[1]);
      }
      function _e(e, t) {
        return {
          node: e,
          index: 0,
          __prev: t,
        };
      }
      function we(e, t, n, r) {
        var i = Object.create(qn);
        return (
          (i.size = e),
          (i._root = t),
          (i.__ownerID = n),
          (i.__hash = r),
          (i.__altered = !1),
          i
        );
      }
      function Ee() {
        return Yn || (Yn = we(0));
      }
      function Se(e, t, n) {
        var r, i;
        if (e._root) {
          var o = f(gn),
            a = f(bn);
          if (((r = ke(e._root, e.__ownerID, 0, void 0, t, n, o, a)), !a.value))
            return e;
          i = e.size + (o.value ? (n === mn ? -1 : 1) : 0);
        } else {
          if (n === mn) return e;
          (i = 1), (r = new pe(e.__ownerID, [[t, n]]));
        }
        return e.__ownerID
          ? ((e.size = i),
            (e._root = r),
            (e.__hash = void 0),
            (e.__altered = !0),
            e)
          : r
          ? we(i, r)
          : Ee();
      }
      function ke(e, t, n, r, i, o, a, u) {
        return e
          ? e.update(t, n, r, i, o, a, u)
          : o === mn
          ? e
          : (c(u), c(a), new me(t, r, [i, o]));
      }
      function xe(e) {
        return e.constructor === me || e.constructor === ye;
      }
      function Te(e, t, n, r, i) {
        if (e.keyHash === r) return new ye(t, r, [e.entry, i]);
        var o,
          a = (0 === n ? e.keyHash : e.keyHash >>> n) & yn,
          u = (0 === n ? r : r >>> n) & yn,
          l =
            a === u
              ? [Te(e, t, n + hn, r, i)]
              : ((o = new me(t, r, i)), a < u ? [e, o] : [o, e]);
        return new he(t, (1 << a) | (1 << u), l);
      }
      function Pe(e, t, n, r) {
        e || (e = new d());
        for (var i = new me(e, oe(n), [n, r]), o = 0; o < t.length; o++) {
          var a = t[o];
          i = i.update(e, 0, void 0, a[0], a[1]);
        }
        return i;
      }
      function Oe(e, t, n, r) {
        for (
          var i = 0, o = 0, a = new Array(n), u = 0, l = 1, s = t.length;
          u < s;
          u++, l <<= 1
        ) {
          var f = t[u];
          void 0 !== f && u !== r && ((i |= l), (a[o++] = f));
        }
        return new he(e, i, a);
      }
      function Ce(e, t, n, r, i) {
        for (var o = 0, a = new Array(vn), u = 0; 0 !== n; u++, n >>>= 1)
          a[u] = 1 & n ? t[o++] : void 0;
        return (a[r] = i), new ve(e, o + 1, a);
      }
      function Re(e, t, r) {
        for (var i = [], a = 0; a < r.length; a++) {
          var u = r[a],
            l = n(u);
          o(u) ||
            (l = l.map(function (e) {
              return W(e);
            })),
            i.push(l);
        }
        return Ae(e, t, i);
      }
      function Ie(e, t, n) {
        return e && e.mergeDeep && o(t) ? e.mergeDeep(t) : $(e, t) ? e : t;
      }
      function Me(e) {
        return function (t, n, r) {
          if (t && t.mergeDeepWith && o(n)) return t.mergeDeepWith(e, n);
          var i = e(t, n, r);
          return $(t, i) ? t : i;
        };
      }
      function Ae(e, t, n) {
        return (
          (n = n.filter(function (e) {
            return 0 !== e.size;
          })),
          0 === n.length
            ? e
            : 0 !== e.size || e.__ownerID || 1 !== n.length
            ? e.withMutations(function (e) {
                for (
                  var r = t
                      ? function (n, r) {
                          e.update(r, mn, function (e) {
                            return e === mn ? n : t(e, n, r);
                          });
                        }
                      : function (t, n) {
                          e.set(n, t);
                        },
                    i = 0;
                  i < n.length;
                  i++
                )
                  n[i].forEach(r);
              })
            : e.constructor(n[0])
        );
      }
      function Ne(e, t, n, r) {
        var i = e === mn,
          o = t.next();
        if (o.done) {
          var a = i ? n : e,
            u = r(a);
          return u === a ? e : u;
        }
        G(i || (e && e.set), "invalid keyPath");
        var l = o.value,
          s = i ? mn : e.get(l, mn),
          f = Ne(s, t, n, r);
        return f === s ? e : f === mn ? e.remove(l) : (i ? Ee() : e).set(l, f);
      }
      function je(e) {
        return (
          (e -= (e >> 1) & 1431655765),
          (e = (858993459 & e) + ((e >> 2) & 858993459)),
          (e = (e + (e >> 4)) & 252645135),
          (e += e >> 8),
          (e += e >> 16),
          127 & e
        );
      }
      function Le(e, t, n, r) {
        var i = r ? e : p(e);
        return (i[t] = n), i;
      }
      function ze(e, t, n, r) {
        var i = e.length + 1;
        if (r && t + 1 === i) return (e[t] = n), e;
        for (var o = new Array(i), a = 0, u = 0; u < i; u++)
          u === t ? ((o[u] = n), (a = -1)) : (o[u] = e[u + a]);
        return o;
      }
      function Ue(e, t, n) {
        var r = e.length - 1;
        if (n && t === r) return e.pop(), e;
        for (var i = new Array(r), o = 0, a = 0; a < r; a++)
          a === t && (o = 1), (i[a] = e[a + o]);
        return i;
      }
      function Be(e) {
        var t = Ke();
        if (null === e || void 0 === e) return t;
        if (De(e)) return e;
        var n = r(e),
          i = n.size;
        return 0 === i
          ? t
          : (fe(i),
            i > 0 && i < vn
              ? Ye(0, i, hn, null, new Fe(n.toArray()))
              : t.withMutations(function (e) {
                  e.setSize(i),
                    n.forEach(function (t, n) {
                      return e.set(n, t);
                    });
                }));
      }
      function De(e) {
        return !(!e || !e[Vn]);
      }
      function Fe(e, t) {
        (this.array = e), (this.ownerID = t);
      }
      function qe(e, t) {
        function n(e, t, n) {
          return 0 === t ? r(e, n) : i(e, t, n);
        }
        function r(e, n) {
          var r = n === u ? l && l.array : e && e.array,
            i = n > o ? 0 : o - n,
            s = a - n;
          return (
            s > vn && (s = vn),
            function () {
              if (i === s) return Jn;
              var e = t ? --s : i++;
              return r && r[e];
            }
          );
        }
        function i(e, r, i) {
          var u,
            l = e && e.array,
            s = i > o ? 0 : (o - i) >> r,
            f = ((a - i) >> r) + 1;
          return (
            f > vn && (f = vn),
            function () {
              for (;;) {
                if (u) {
                  var e = u();
                  if (e !== Jn) return e;
                  u = null;
                }
                if (s === f) return Jn;
                var o = t ? --f : s++;
                u = n(l && l[o], r - hn, i + (o << r));
              }
            }
          );
        }
        var o = e._origin,
          a = e._capacity,
          u = Xe(a),
          l = e._tail;
        return n(e._root, e._level, 0);
      }
      function Ye(e, t, n, r, i, o, a) {
        var u = Object.create(Qn);
        return (
          (u.size = t - e),
          (u._origin = e),
          (u._capacity = t),
          (u._level = n),
          (u._root = r),
          (u._tail = i),
          (u.__ownerID = o),
          (u.__hash = a),
          (u.__altered = !1),
          u
        );
      }
      function Ke() {
        return $n || ($n = Ye(0, 0, hn));
      }
      function We(e, t, n) {
        if (((t = v(e, t)), t !== t)) return e;
        if (t >= e.size || t < 0)
          return e.withMutations(function (e) {
            t < 0 ? $e(e, t).set(0, n) : $e(e, 0, t + 1).set(t, n);
          });
        t += e._origin;
        var r = e._tail,
          i = e._root,
          o = f(bn);
        return (
          t >= Xe(e._capacity)
            ? (r = He(r, e.__ownerID, 0, t, n, o))
            : (i = He(i, e.__ownerID, e._level, t, n, o)),
          o.value
            ? e.__ownerID
              ? ((e._root = i),
                (e._tail = r),
                (e.__hash = void 0),
                (e.__altered = !0),
                e)
              : Ye(e._origin, e._capacity, e._level, i, r)
            : e
        );
      }
      function He(e, t, n, r, i, o) {
        var a = (r >>> n) & yn,
          u = e && a < e.array.length;
        if (!u && void 0 === i) return e;
        var l;
        if (n > 0) {
          var s = e && e.array[a],
            f = He(s, t, n - hn, r, i, o);
          return f === s ? e : ((l = Ve(e, t)), (l.array[a] = f), l);
        }
        return u && e.array[a] === i
          ? e
          : (c(o),
            (l = Ve(e, t)),
            void 0 === i && a === l.array.length - 1
              ? l.array.pop()
              : (l.array[a] = i),
            l);
      }
      function Ve(e, t) {
        return t && e && t === e.ownerID
          ? e
          : new Fe(e ? e.array.slice() : [], t);
      }
      function Qe(e, t) {
        if (t >= Xe(e._capacity)) return e._tail;
        if (t < 1 << (e._level + hn)) {
          for (var n = e._root, r = e._level; n && r > 0; )
            (n = n.array[(t >>> r) & yn]), (r -= hn);
          return n;
        }
      }
      function $e(e, t, n) {
        void 0 !== t && (t |= 0), void 0 !== n && (n |= 0);
        var r = e.__ownerID || new d(),
          i = e._origin,
          o = e._capacity,
          a = i + t,
          u = void 0 === n ? o : n < 0 ? o + n : i + n;
        if (a === i && u === o) return e;
        if (a >= u) return e.clear();
        for (var l = e._level, s = e._root, f = 0; a + f < 0; )
          (s = new Fe(s && s.array.length ? [void 0, s] : [], r)),
            (l += hn),
            (f += 1 << l);
        f && ((a += f), (i += f), (u += f), (o += f));
        for (var c = Xe(o), p = Xe(u); p >= 1 << (l + hn); )
          (s = new Fe(s && s.array.length ? [s] : [], r)), (l += hn);
        var h = e._tail,
          v = p < c ? Qe(e, u - 1) : p > c ? new Fe([], r) : h;
        if (h && p > c && a < o && h.array.length) {
          s = Ve(s, r);
          for (var y = s, m = l; m > hn; m -= hn) {
            var g = (c >>> m) & yn;
            y = y.array[g] = Ve(y.array[g], r);
          }
          y.array[(c >>> hn) & yn] = h;
        }
        if ((u < o && (v = v && v.removeAfter(r, 0, u)), a >= p))
          (a -= p),
            (u -= p),
            (l = hn),
            (s = null),
            (v = v && v.removeBefore(r, 0, a));
        else if (a > i || p < c) {
          for (f = 0; s; ) {
            var b = (a >>> l) & yn;
            if ((b !== p >>> l) & yn) break;
            b && (f += (1 << l) * b), (l -= hn), (s = s.array[b]);
          }
          s && a > i && (s = s.removeBefore(r, l, a - f)),
            s && p < c && (s = s.removeAfter(r, l, p - f)),
            f && ((a -= f), (u -= f));
        }
        return e.__ownerID
          ? ((e.size = u - a),
            (e._origin = a),
            (e._capacity = u),
            (e._level = l),
            (e._root = s),
            (e._tail = v),
            (e.__hash = void 0),
            (e.__altered = !0),
            e)
          : Ye(a, u, l, s, v);
      }
      function Je(e, t, n) {
        for (var i = [], a = 0, u = 0; u < n.length; u++) {
          var l = n[u],
            s = r(l);
          s.size > a && (a = s.size),
            o(l) ||
              (s = s.map(function (e) {
                return W(e);
              })),
            i.push(s);
        }
        return a > e.size && (e = e.setSize(a)), Ae(e, t, i);
      }
      function Xe(e) {
        return e < vn ? 0 : ((e - 1) >>> hn) << hn;
      }
      function Ge(e) {
        return null === e || void 0 === e
          ? tt()
          : Ze(e)
          ? e
          : tt().withMutations(function (t) {
              var r = n(e);
              fe(r.size),
                r.forEach(function (e, n) {
                  return t.set(n, e);
                });
            });
      }
      function Ze(e) {
        return de(e) && s(e);
      }
      function et(e, t, n, r) {
        var i = Object.create(Ge.prototype);
        return (
          (i.size = e ? e.size : 0),
          (i._map = e),
          (i._list = t),
          (i.__ownerID = n),
          (i.__hash = r),
          i
        );
      }
      function tt() {
        return Xn || (Xn = et(Ee(), Ke()));
      }
      function nt(e, t, n) {
        var r,
          i,
          o = e._map,
          a = e._list,
          u = o.get(t),
          l = void 0 !== u;
        if (n === mn) {
          if (!l) return e;
          a.size >= vn && a.size >= 2 * o.size
            ? ((i = a.filter(function (e, t) {
                return void 0 !== e && u !== t;
              })),
              (r = i
                .toKeyedSeq()
                .map(function (e) {
                  return e[0];
                })
                .flip()
                .toMap()),
              e.__ownerID && (r.__ownerID = i.__ownerID = e.__ownerID))
            : ((r = o.remove(t)),
              (i = u === a.size - 1 ? a.pop() : a.set(u, void 0)));
        } else if (l) {
          if (n === a.get(u)[1]) return e;
          (r = o), (i = a.set(u, [t, n]));
        } else (r = o.set(t, a.size)), (i = a.set(a.size, [t, n]));
        return e.__ownerID
          ? ((e.size = r.size),
            (e._map = r),
            (e._list = i),
            (e.__hash = void 0),
            e)
          : et(r, i);
      }
      function rt(e, t) {
        (this._iter = e), (this._useKeys = t), (this.size = e.size);
      }
      function it(e) {
        (this._iter = e), (this.size = e.size);
      }
      function ot(e) {
        (this._iter = e), (this.size = e.size);
      }
      function at(e) {
        (this._iter = e), (this.size = e.size);
      }
      function ut(e) {
        var t = Ot(e);
        return (
          (t._iter = e),
          (t.size = e.size),
          (t.flip = function () {
            return e;
          }),
          (t.reverse = function () {
            var t = e.reverse.apply(this);
            return (
              (t.flip = function () {
                return e.reverse();
              }),
              t
            );
          }),
          (t.has = function (t) {
            return e.includes(t);
          }),
          (t.includes = function (t) {
            return e.has(t);
          }),
          (t.cacheResult = Ct),
          (t.__iterateUncached = function (t, n) {
            var r = this;
            return e.__iterate(function (e, n) {
              return t(n, e, r) !== !1;
            }, n);
          }),
          (t.__iteratorUncached = function (t, n) {
            if (t === En) {
              var r = e.__iterator(t, n);
              return new w(function () {
                var e = r.next();
                if (!e.done) {
                  var t = e.value[0];
                  (e.value[0] = e.value[1]), (e.value[1] = t);
                }
                return e;
              });
            }
            return e.__iterator(t === wn ? _n : wn, n);
          }),
          t
        );
      }
      function lt(e, t, n) {
        var r = Ot(e);
        return (
          (r.size = e.size),
          (r.has = function (t) {
            return e.has(t);
          }),
          (r.get = function (r, i) {
            var o = e.get(r, mn);
            return o === mn ? i : t.call(n, o, r, e);
          }),
          (r.__iterateUncached = function (r, i) {
            var o = this;
            return e.__iterate(function (e, i, a) {
              return r(t.call(n, e, i, a), i, o) !== !1;
            }, i);
          }),
          (r.__iteratorUncached = function (r, i) {
            var o = e.__iterator(En, i);
            return new w(function () {
              var i = o.next();
              if (i.done) return i;
              var a = i.value,
                u = a[0];
              return E(r, u, t.call(n, a[1], u, e), i);
            });
          }),
          r
        );
      }
      function st(e, t) {
        var n = Ot(e);
        return (
          (n._iter = e),
          (n.size = e.size),
          (n.reverse = function () {
            return e;
          }),
          e.flip &&
            (n.flip = function () {
              var t = ut(e);
              return (
                (t.reverse = function () {
                  return e.flip();
                }),
                t
              );
            }),
          (n.get = function (n, r) {
            return e.get(t ? n : -1 - n, r);
          }),
          (n.has = function (n) {
            return e.has(t ? n : -1 - n);
          }),
          (n.includes = function (t) {
            return e.includes(t);
          }),
          (n.cacheResult = Ct),
          (n.__iterate = function (t, n) {
            var r = this;
            return e.__iterate(function (e, n) {
              return t(e, n, r);
            }, !n);
          }),
          (n.__iterator = function (t, n) {
            return e.__iterator(t, !n);
          }),
          n
        );
      }
      function ft(e, t, n, r) {
        var i = Ot(e);
        return (
          r &&
            ((i.has = function (r) {
              var i = e.get(r, mn);
              return i !== mn && !!t.call(n, i, r, e);
            }),
            (i.get = function (r, i) {
              var o = e.get(r, mn);
              return o !== mn && t.call(n, o, r, e) ? o : i;
            })),
          (i.__iterateUncached = function (i, o) {
            var a = this,
              u = 0;
            return (
              e.__iterate(function (e, o, l) {
                if (t.call(n, e, o, l)) return u++, i(e, r ? o : u - 1, a);
              }, o),
              u
            );
          }),
          (i.__iteratorUncached = function (i, o) {
            var a = e.__iterator(En, o),
              u = 0;
            return new w(function () {
              for (;;) {
                var o = a.next();
                if (o.done) return o;
                var l = o.value,
                  s = l[0],
                  f = l[1];
                if (t.call(n, f, s, e)) return E(i, r ? s : u++, f, o);
              }
            });
          }),
          i
        );
      }
      function ct(e, t, n) {
        var r = ce().asMutable();
        return (
          e.__iterate(function (i, o) {
            r.update(t.call(n, i, o, e), 0, function (e) {
              return e + 1;
            });
          }),
          r.asImmutable()
        );
      }
      function dt(e, t, n) {
        var r = a(e),
          i = (s(e) ? Ge() : ce()).asMutable();
        e.__iterate(function (o, a) {
          i.update(t.call(n, o, a, e), function (e) {
            return (e = e || []), e.push(r ? [a, o] : o), e;
          });
        });
        var o = Pt(e);
        return i.map(function (t) {
          return kt(e, o(t));
        });
      }
      function pt(e, t, n, r) {
        var i = e.size;
        if (
          (void 0 !== t && (t |= 0),
          void 0 !== n && (n === 1 / 0 ? (n = i) : (n |= 0)),
          m(t, n, i))
        )
          return e;
        var o = g(t, i),
          a = b(n, i);
        if (o !== o || a !== a) return pt(e.toSeq().cacheResult(), t, n, r);
        var u,
          l = a - o;
        l === l && (u = l < 0 ? 0 : l);
        var s = Ot(e);
        return (
          (s.size = 0 === u ? u : (e.size && u) || void 0),
          !r &&
            z(e) &&
            u >= 0 &&
            (s.get = function (t, n) {
              return (t = v(this, t)), t >= 0 && t < u ? e.get(t + o, n) : n;
            }),
          (s.__iterateUncached = function (t, n) {
            var i = this;
            if (0 === u) return 0;
            if (n) return this.cacheResult().__iterate(t, n);
            var a = 0,
              l = !0,
              s = 0;
            return (
              e.__iterate(function (e, n) {
                if (!l || !(l = a++ < o))
                  return s++, t(e, r ? n : s - 1, i) !== !1 && s !== u;
              }),
              s
            );
          }),
          (s.__iteratorUncached = function (t, n) {
            if (0 !== u && n) return this.cacheResult().__iterator(t, n);
            var i = 0 !== u && e.__iterator(t, n),
              a = 0,
              l = 0;
            return new w(function () {
              for (; a++ < o; ) i.next();
              if (++l > u) return S();
              var e = i.next();
              return r || t === wn
                ? e
                : t === _n
                ? E(t, l - 1, void 0, e)
                : E(t, l - 1, e.value[1], e);
            });
          }),
          s
        );
      }
      function ht(e, t, n) {
        var r = Ot(e);
        return (
          (r.__iterateUncached = function (r, i) {
            var o = this;
            if (i) return this.cacheResult().__iterate(r, i);
            var a = 0;
            return (
              e.__iterate(function (e, i, u) {
                return t.call(n, e, i, u) && ++a && r(e, i, o);
              }),
              a
            );
          }),
          (r.__iteratorUncached = function (r, i) {
            var o = this;
            if (i) return this.cacheResult().__iterator(r, i);
            var a = e.__iterator(En, i),
              u = !0;
            return new w(function () {
              if (!u) return S();
              var e = a.next();
              if (e.done) return e;
              var i = e.value,
                l = i[0],
                s = i[1];
              return t.call(n, s, l, o)
                ? r === En
                  ? e
                  : E(r, l, s, e)
                : ((u = !1), S());
            });
          }),
          r
        );
      }
      function vt(e, t, n, r) {
        var i = Ot(e);
        return (
          (i.__iterateUncached = function (i, o) {
            var a = this;
            if (o) return this.cacheResult().__iterate(i, o);
            var u = !0,
              l = 0;
            return (
              e.__iterate(function (e, o, s) {
                if (!u || !(u = t.call(n, e, o, s)))
                  return l++, i(e, r ? o : l - 1, a);
              }),
              l
            );
          }),
          (i.__iteratorUncached = function (i, o) {
            var a = this;
            if (o) return this.cacheResult().__iterator(i, o);
            var u = e.__iterator(En, o),
              l = !0,
              s = 0;
            return new w(function () {
              var e, o, f;
              do {
                if (((e = u.next()), e.done))
                  return r || i === wn
                    ? e
                    : i === _n
                    ? E(i, s++, void 0, e)
                    : E(i, s++, e.value[1], e);
                var c = e.value;
                (o = c[0]), (f = c[1]), l && (l = t.call(n, f, o, a));
              } while (l);
              return i === En ? e : E(i, o, f, e);
            });
          }),
          i
        );
      }
      function yt(e, t) {
        var r = a(e),
          i = [e]
            .concat(t)
            .map(function (e) {
              return (
                o(e)
                  ? r && (e = n(e))
                  : (e = r ? B(e) : D(Array.isArray(e) ? e : [e])),
                e
              );
            })
            .filter(function (e) {
              return 0 !== e.size;
            });
        if (0 === i.length) return e;
        if (1 === i.length) {
          var l = i[0];
          if (l === e || (r && a(l)) || (u(e) && u(l))) return l;
        }
        var s = new A(i);
        return (
          r ? (s = s.toKeyedSeq()) : u(e) || (s = s.toSetSeq()),
          (s = s.flatten(!0)),
          (s.size = i.reduce(function (e, t) {
            if (void 0 !== e) {
              var n = t.size;
              if (void 0 !== n) return e + n;
            }
          }, 0)),
          s
        );
      }
      function mt(e, t, n) {
        var r = Ot(e);
        return (
          (r.__iterateUncached = function (r, i) {
            function a(e, s) {
              var f = this;
              e.__iterate(function (e, i) {
                return (
                  (!t || s < t) && o(e)
                    ? a(e, s + 1)
                    : r(e, n ? i : u++, f) === !1 && (l = !0),
                  !l
                );
              }, i);
            }
            var u = 0,
              l = !1;
            return a(e, 0), u;
          }),
          (r.__iteratorUncached = function (r, i) {
            var a = e.__iterator(r, i),
              u = [],
              l = 0;
            return new w(function () {
              for (; a; ) {
                var e = a.next();
                if (e.done === !1) {
                  var s = e.value;
                  if ((r === En && (s = s[1]), (t && !(u.length < t)) || !o(s)))
                    return n ? e : E(r, l++, s, e);
                  u.push(a), (a = s.__iterator(r, i));
                } else a = u.pop();
              }
              return S();
            });
          }),
          r
        );
      }
      function gt(e, t, n) {
        var r = Pt(e);
        return e
          .toSeq()
          .map(function (i, o) {
            return r(t.call(n, i, o, e));
          })
          .flatten(!0);
      }
      function bt(e, t) {
        var n = Ot(e);
        return (
          (n.size = e.size && 2 * e.size - 1),
          (n.__iterateUncached = function (n, r) {
            var i = this,
              o = 0;
            return (
              e.__iterate(function (e, r) {
                return (!o || n(t, o++, i) !== !1) && n(e, o++, i) !== !1;
              }, r),
              o
            );
          }),
          (n.__iteratorUncached = function (n, r) {
            var i,
              o = e.__iterator(wn, r),
              a = 0;
            return new w(function () {
              return (!i || a % 2) && ((i = o.next()), i.done)
                ? i
                : a % 2
                ? E(n, a++, t)
                : E(n, a++, i.value, i);
            });
          }),
          n
        );
      }
      function _t(e, t, n) {
        t || (t = Rt);
        var r = a(e),
          i = 0,
          o = e
            .toSeq()
            .map(function (t, r) {
              return [r, t, i++, n ? n(t, r, e) : t];
            })
            .toArray();
        return (
          o
            .sort(function (e, n) {
              return t(e[3], n[3]) || e[2] - n[2];
            })
            .forEach(
              r
                ? function (e, t) {
                    o[t].length = 2;
                  }
                : function (e, t) {
                    o[t] = e[1];
                  }
            ),
          r ? R(o) : u(e) ? I(o) : M(o)
        );
      }
      function wt(e, t, n) {
        if ((t || (t = Rt), n)) {
          var r = e
            .toSeq()
            .map(function (t, r) {
              return [t, n(t, r, e)];
            })
            .reduce(function (e, n) {
              return Et(t, e[1], n[1]) ? n : e;
            });
          return r && r[0];
        }
        return e.reduce(function (e, n) {
          return Et(t, e, n) ? n : e;
        });
      }
      function Et(e, t, n) {
        var r = e(n, t);
        return (
          (0 === r && n !== t && (void 0 === n || null === n || n !== n)) ||
          r > 0
        );
      }
      function St(e, n, r) {
        var i = Ot(e);
        return (
          (i.size = new A(r)
            .map(function (e) {
              return e.size;
            })
            .min()),
          (i.__iterate = function (e, t) {
            for (
              var n, r = this.__iterator(wn, t), i = 0;
              !(n = r.next()).done && e(n.value, i++, this) !== !1;

            );
            return i;
          }),
          (i.__iteratorUncached = function (e, i) {
            var o = r.map(function (e) {
                return (e = t(e)), T(i ? e.reverse() : e);
              }),
              a = 0,
              u = !1;
            return new w(function () {
              var t;
              return (
                u ||
                  ((t = o.map(function (e) {
                    return e.next();
                  })),
                  (u = t.some(function (e) {
                    return e.done;
                  }))),
                u
                  ? S()
                  : E(
                      e,
                      a++,
                      n.apply(
                        null,
                        t.map(function (e) {
                          return e.value;
                        })
                      )
                    )
              );
            });
          }),
          i
        );
      }
      function kt(e, t) {
        return z(e) ? t : e.constructor(t);
      }
      function xt(e) {
        if (e !== Object(e)) throw new TypeError("Expected [K, V] tuple: " + e);
      }
      function Tt(e) {
        return fe(e.size), h(e);
      }
      function Pt(e) {
        return a(e) ? n : u(e) ? r : i;
      }
      function Ot(e) {
        return Object.create((a(e) ? R : u(e) ? I : M).prototype);
      }
      function Ct() {
        return this._iter.cacheResult
          ? (this._iter.cacheResult(), (this.size = this._iter.size), this)
          : C.prototype.cacheResult.call(this);
      }
      function Rt(e, t) {
        return e > t ? 1 : e < t ? -1 : 0;
      }
      function It(e) {
        var n = T(e);
        if (!n) {
          if (!O(e))
            throw new TypeError("Expected iterable or array-like: " + e);
          n = T(t(e));
        }
        return n;
      }
      function Mt(e, t) {
        var n,
          r = function (o) {
            if (o instanceof r) return o;
            if (!(this instanceof r)) return new r(o);
            if (!n) {
              n = !0;
              var a = Object.keys(e);
              jt(i, a),
                (i.size = a.length),
                (i._name = t),
                (i._keys = a),
                (i._defaultValues = e);
            }
            this._map = ce(o);
          },
          i = (r.prototype = Object.create(Gn));
        return (i.constructor = r), r;
      }
      function At(e, t, n) {
        var r = Object.create(Object.getPrototypeOf(e));
        return (r._map = t), (r.__ownerID = n), r;
      }
      function Nt(e) {
        return e._name || e.constructor.name || "Record";
      }
      function jt(e, t) {
        try {
          t.forEach(Lt.bind(void 0, e));
        } catch (e) {}
      }
      function Lt(e, t) {
        Object.defineProperty(e, t, {
          get: function () {
            return this.get(t);
          },
          set: function (e) {
            G(this.__ownerID, "Cannot set on an immutable record."),
              this.set(t, e);
          },
        });
      }
      function zt(e) {
        return null === e || void 0 === e
          ? Ft()
          : Ut(e) && !s(e)
          ? e
          : Ft().withMutations(function (t) {
              var n = i(e);
              fe(n.size),
                n.forEach(function (e) {
                  return t.add(e);
                });
            });
      }
      function Ut(e) {
        return !(!e || !e[Zn]);
      }
      function Bt(e, t) {
        return e.__ownerID
          ? ((e.size = t.size), (e._map = t), e)
          : t === e._map
          ? e
          : 0 === t.size
          ? e.__empty()
          : e.__make(t);
      }
      function Dt(e, t) {
        var n = Object.create(er);
        return (n.size = e ? e.size : 0), (n._map = e), (n.__ownerID = t), n;
      }
      function Ft() {
        return tr || (tr = Dt(Ee()));
      }
      function qt(e) {
        return null === e || void 0 === e
          ? Wt()
          : Yt(e)
          ? e
          : Wt().withMutations(function (t) {
              var n = i(e);
              fe(n.size),
                n.forEach(function (e) {
                  return t.add(e);
                });
            });
      }
      function Yt(e) {
        return Ut(e) && s(e);
      }
      function Kt(e, t) {
        var n = Object.create(nr);
        return (n.size = e ? e.size : 0), (n._map = e), (n.__ownerID = t), n;
      }
      function Wt() {
        return rr || (rr = Kt(tt()));
      }
      function Ht(e) {
        return null === e || void 0 === e
          ? $t()
          : Vt(e)
          ? e
          : $t().unshiftAll(e);
      }
      function Vt(e) {
        return !(!e || !e[ir]);
      }
      function Qt(e, t, n, r) {
        var i = Object.create(or);
        return (
          (i.size = e),
          (i._head = t),
          (i.__ownerID = n),
          (i.__hash = r),
          (i.__altered = !1),
          i
        );
      }
      function $t() {
        return ar || (ar = Qt(0));
      }
      function Jt(e, t) {
        var n = function (n) {
          e.prototype[n] = t[n];
        };
        return (
          Object.keys(t).forEach(n),
          Object.getOwnPropertySymbols &&
            Object.getOwnPropertySymbols(t).forEach(n),
          e
        );
      }
      function Xt(e, t) {
        return t;
      }
      function Gt(e, t) {
        return [t, e];
      }
      function Zt(e) {
        return function () {
          return !e.apply(this, arguments);
        };
      }
      function en(e) {
        return function () {
          return -e.apply(this, arguments);
        };
      }
      function tn(e) {
        return "string" == typeof e ? JSON.stringify(e) : String(e);
      }
      function nn() {
        return p(arguments);
      }
      function rn(e, t) {
        return e < t ? 1 : e > t ? -1 : 0;
      }
      function on(e) {
        if (e.size === 1 / 0) return 0;
        var t = s(e),
          n = a(e),
          r = t ? 1 : 0,
          i = e.__iterate(
            n
              ? t
                ? function (e, t) {
                    r = (31 * r + un(oe(e), oe(t))) | 0;
                  }
                : function (e, t) {
                    r = (r + un(oe(e), oe(t))) | 0;
                  }
              : t
              ? function (e) {
                  r = (31 * r + oe(e)) | 0;
                }
              : function (e) {
                  r = (r + oe(e)) | 0;
                }
          );
        return an(i, r);
      }
      function an(e, t) {
        return (
          (t = In(t, 3432918353)),
          (t = In((t << 15) | (t >>> -15), 461845907)),
          (t = In((t << 13) | (t >>> -13), 5)),
          (t = ((t + 3864292196) | 0) ^ e),
          (t = In(t ^ (t >>> 16), 2246822507)),
          (t = In(t ^ (t >>> 13), 3266489909)),
          (t = ie(t ^ (t >>> 16)))
        );
      }
      function un(e, t) {
        return (e ^ (t + 2654435769 + (e << 6) + (e >> 2))) | 0;
      }
      var ln = Array.prototype.slice;
      e(n, t),
        e(r, t),
        e(i, t),
        (t.isIterable = o),
        (t.isKeyed = a),
        (t.isIndexed = u),
        (t.isAssociative = l),
        (t.isOrdered = s),
        (t.Keyed = n),
        (t.Indexed = r),
        (t.Set = i);
      var sn = "@@__IMMUTABLE_ITERABLE__@@",
        fn = "@@__IMMUTABLE_KEYED__@@",
        cn = "@@__IMMUTABLE_INDEXED__@@",
        dn = "@@__IMMUTABLE_ORDERED__@@",
        pn = "delete",
        hn = 5,
        vn = 1 << hn,
        yn = vn - 1,
        mn = {},
        gn = {
          value: !1,
        },
        bn = {
          value: !1,
        },
        _n = 0,
        wn = 1,
        En = 2,
        Sn = "function" == typeof Symbol && Symbol.iterator,
        kn = "@@iterator",
        xn = Sn || kn;
      (w.prototype.toString = function () {
        return "[Iterator]";
      }),
        (w.KEYS = _n),
        (w.VALUES = wn),
        (w.ENTRIES = En),
        (w.prototype.inspect = w.prototype.toSource =
          function () {
            return this.toString();
          }),
        (w.prototype[xn] = function () {
          return this;
        }),
        e(C, t),
        (C.of = function () {
          return C(arguments);
        }),
        (C.prototype.toSeq = function () {
          return this;
        }),
        (C.prototype.toString = function () {
          return this.__toString("Seq {", "}");
        }),
        (C.prototype.cacheResult = function () {
          return (
            !this._cache &&
              this.__iterateUncached &&
              ((this._cache = this.entrySeq().toArray()),
              (this.size = this._cache.length)),
            this
          );
        }),
        (C.prototype.__iterate = function (e, t) {
          return Y(this, e, t, !0);
        }),
        (C.prototype.__iterator = function (e, t) {
          return K(this, e, t, !0);
        }),
        e(R, C),
        (R.prototype.toKeyedSeq = function () {
          return this;
        }),
        e(I, C),
        (I.of = function () {
          return I(arguments);
        }),
        (I.prototype.toIndexedSeq = function () {
          return this;
        }),
        (I.prototype.toString = function () {
          return this.__toString("Seq [", "]");
        }),
        (I.prototype.__iterate = function (e, t) {
          return Y(this, e, t, !1);
        }),
        (I.prototype.__iterator = function (e, t) {
          return K(this, e, t, !1);
        }),
        e(M, C),
        (M.of = function () {
          return M(arguments);
        }),
        (M.prototype.toSetSeq = function () {
          return this;
        }),
        (C.isSeq = z),
        (C.Keyed = R),
        (C.Set = M),
        (C.Indexed = I);
      var Tn = "@@__IMMUTABLE_SEQ__@@";
      (C.prototype[Tn] = !0),
        e(A, I),
        (A.prototype.get = function (e, t) {
          return this.has(e) ? this._array[v(this, e)] : t;
        }),
        (A.prototype.__iterate = function (e, t) {
          for (var n = this._array, r = n.length - 1, i = 0; i <= r; i++)
            if (e(n[t ? r - i : i], i, this) === !1) return i + 1;
          return i;
        }),
        (A.prototype.__iterator = function (e, t) {
          var n = this._array,
            r = n.length - 1,
            i = 0;
          return new w(function () {
            return i > r ? S() : E(e, i, n[t ? r - i++ : i++]);
          });
        }),
        e(N, R),
        (N.prototype.get = function (e, t) {
          return void 0 === t || this.has(e) ? this._object[e] : t;
        }),
        (N.prototype.has = function (e) {
          return this._object.hasOwnProperty(e);
        }),
        (N.prototype.__iterate = function (e, t) {
          for (
            var n = this._object, r = this._keys, i = r.length - 1, o = 0;
            o <= i;
            o++
          ) {
            var a = r[t ? i - o : o];
            if (e(n[a], a, this) === !1) return o + 1;
          }
          return o;
        }),
        (N.prototype.__iterator = function (e, t) {
          var n = this._object,
            r = this._keys,
            i = r.length - 1,
            o = 0;
          return new w(function () {
            var a = r[t ? i - o : o];
            return o++ > i ? S() : E(e, a, n[a]);
          });
        }),
        (N.prototype[dn] = !0),
        e(j, I),
        (j.prototype.__iterateUncached = function (e, t) {
          if (t) return this.cacheResult().__iterate(e, t);
          var n = this._iterable,
            r = T(n),
            i = 0;
          if (x(r))
            for (var o; !(o = r.next()).done && e(o.value, i++, this) !== !1; );
          return i;
        }),
        (j.prototype.__iteratorUncached = function (e, t) {
          if (t) return this.cacheResult().__iterator(e, t);
          var n = this._iterable,
            r = T(n);
          if (!x(r)) return new w(S);
          var i = 0;
          return new w(function () {
            var t = r.next();
            return t.done ? t : E(e, i++, t.value);
          });
        }),
        e(L, I),
        (L.prototype.__iterateUncached = function (e, t) {
          if (t) return this.cacheResult().__iterate(e, t);
          for (
            var n = this._iterator, r = this._iteratorCache, i = 0;
            i < r.length;

          )
            if (e(r[i], i++, this) === !1) return i;
          for (var o; !(o = n.next()).done; ) {
            var a = o.value;
            if (((r[i] = a), e(a, i++, this) === !1)) break;
          }
          return i;
        }),
        (L.prototype.__iteratorUncached = function (e, t) {
          if (t) return this.cacheResult().__iterator(e, t);
          var n = this._iterator,
            r = this._iteratorCache,
            i = 0;
          return new w(function () {
            if (i >= r.length) {
              var t = n.next();
              if (t.done) return t;
              r[i] = t.value;
            }
            return E(e, i, r[i++]);
          });
        });
      var Pn;
      e(X, I),
        (X.prototype.toString = function () {
          return 0 === this.size
            ? "Repeat []"
            : "Repeat [ " + this._value + " " + this.size + " times ]";
        }),
        (X.prototype.get = function (e, t) {
          return this.has(e) ? this._value : t;
        }),
        (X.prototype.includes = function (e) {
          return $(this._value, e);
        }),
        (X.prototype.slice = function (e, t) {
          var n = this.size;
          return m(e, t, n) ? this : new X(this._value, b(t, n) - g(e, n));
        }),
        (X.prototype.reverse = function () {
          return this;
        }),
        (X.prototype.indexOf = function (e) {
          return $(this._value, e) ? 0 : -1;
        }),
        (X.prototype.lastIndexOf = function (e) {
          return $(this._value, e) ? this.size : -1;
        }),
        (X.prototype.__iterate = function (e, t) {
          for (var n = 0; n < this.size; n++)
            if (e(this._value, n, this) === !1) return n + 1;
          return n;
        }),
        (X.prototype.__iterator = function (e, t) {
          var n = this,
            r = 0;
          return new w(function () {
            return r < n.size ? E(e, r++, n._value) : S();
          });
        }),
        (X.prototype.equals = function (e) {
          return e instanceof X ? $(this._value, e._value) : J(e);
        });
      var On;
      e(Z, I),
        (Z.prototype.toString = function () {
          return 0 === this.size
            ? "Range []"
            : "Range [ " +
                this._start +
                "..." +
                this._end +
                (1 !== this._step ? " by " + this._step : "") +
                " ]";
        }),
        (Z.prototype.get = function (e, t) {
          return this.has(e) ? this._start + v(this, e) * this._step : t;
        }),
        (Z.prototype.includes = function (e) {
          var t = (e - this._start) / this._step;
          return t >= 0 && t < this.size && t === Math.floor(t);
        }),
        (Z.prototype.slice = function (e, t) {
          return m(e, t, this.size)
            ? this
            : ((e = g(e, this.size)),
              (t = b(t, this.size)),
              t <= e
                ? new Z(0, 0)
                : new Z(
                    this.get(e, this._end),
                    this.get(t, this._end),
                    this._step
                  ));
        }),
        (Z.prototype.indexOf = function (e) {
          var t = e - this._start;
          if (t % this._step === 0) {
            var n = t / this._step;
            if (n >= 0 && n < this.size) return n;
          }
          return -1;
        }),
        (Z.prototype.lastIndexOf = function (e) {
          return this.indexOf(e);
        }),
        (Z.prototype.__iterate = function (e, t) {
          for (
            var n = this.size - 1,
              r = this._step,
              i = t ? this._start + n * r : this._start,
              o = 0;
            o <= n;
            o++
          ) {
            if (e(i, o, this) === !1) return o + 1;
            i += t ? -r : r;
          }
          return o;
        }),
        (Z.prototype.__iterator = function (e, t) {
          var n = this.size - 1,
            r = this._step,
            i = t ? this._start + n * r : this._start,
            o = 0;
          return new w(function () {
            var a = i;
            return (i += t ? -r : r), o > n ? S() : E(e, o++, a);
          });
        }),
        (Z.prototype.equals = function (e) {
          return e instanceof Z
            ? this._start === e._start &&
                this._end === e._end &&
                this._step === e._step
            : J(this, e);
        });
      var Cn;
      e(ee, t),
        e(te, ee),
        e(ne, ee),
        e(re, ee),
        (ee.Keyed = te),
        (ee.Indexed = ne),
        (ee.Set = re);
      var Rn,
        In =
          "function" == typeof Math.imul && Math.imul(4294967295, 2) === -2
            ? Math.imul
            : function (e, t) {
                (e |= 0), (t |= 0);
                var n = 65535 & e,
                  r = 65535 & t;
                return (
                  (n * r + ((((e >>> 16) * r + n * (t >>> 16)) << 16) >>> 0)) |
                  0
                );
              },
        Mn = Object.isExtensible,
        An = (function () {
          try {
            return Object.defineProperty({}, "@", {}), !0;
          } catch (e) {
            return !1;
          }
        })(),
        Nn = "function" == typeof WeakMap;
      Nn && (Rn = new WeakMap());
      var jn = 0,
        Ln = "__immutablehash__";
      "function" == typeof Symbol && (Ln = Symbol(Ln));
      var zn = 16,
        Un = 255,
        Bn = 0,
        Dn = {};
      e(ce, te),
        (ce.of = function () {
          var e = ln.call(arguments, 0);
          return Ee().withMutations(function (t) {
            for (var n = 0; n < e.length; n += 2) {
              if (n + 1 >= e.length)
                throw new Error("Missing value for key: " + e[n]);
              t.set(e[n], e[n + 1]);
            }
          });
        }),
        (ce.prototype.toString = function () {
          return this.__toString("Map {", "}");
        }),
        (ce.prototype.get = function (e, t) {
          return this._root ? this._root.get(0, void 0, e, t) : t;
        }),
        (ce.prototype.set = function (e, t) {
          return Se(this, e, t);
        }),
        (ce.prototype.setIn = function (e, t) {
          return this.updateIn(e, mn, function () {
            return t;
          });
        }),
        (ce.prototype.remove = function (e) {
          return Se(this, e, mn);
        }),
        (ce.prototype.deleteIn = function (e) {
          return this.updateIn(e, function () {
            return mn;
          });
        }),
        (ce.prototype.update = function (e, t, n) {
          return 1 === arguments.length ? e(this) : this.updateIn([e], t, n);
        }),
        (ce.prototype.updateIn = function (e, t, n) {
          n || ((n = t), (t = void 0));
          var r = Ne(this, It(e), t, n);
          return r === mn ? void 0 : r;
        }),
        (ce.prototype.clear = function () {
          return 0 === this.size
            ? this
            : this.__ownerID
            ? ((this.size = 0),
              (this._root = null),
              (this.__hash = void 0),
              (this.__altered = !0),
              this)
            : Ee();
        }),
        (ce.prototype.merge = function () {
          return Re(this, void 0, arguments);
        }),
        (ce.prototype.mergeWith = function (e) {
          var t = ln.call(arguments, 1);
          return Re(this, e, t);
        }),
        (ce.prototype.mergeIn = function (e) {
          var t = ln.call(arguments, 1);
          return this.updateIn(e, Ee(), function (e) {
            return "function" == typeof e.merge
              ? e.merge.apply(e, t)
              : t[t.length - 1];
          });
        }),
        (ce.prototype.mergeDeep = function () {
          return Re(this, Ie, arguments);
        }),
        (ce.prototype.mergeDeepWith = function (e) {
          var t = ln.call(arguments, 1);
          return Re(this, Me(e), t);
        }),
        (ce.prototype.mergeDeepIn = function (e) {
          var t = ln.call(arguments, 1);
          return this.updateIn(e, Ee(), function (e) {
            return "function" == typeof e.mergeDeep
              ? e.mergeDeep.apply(e, t)
              : t[t.length - 1];
          });
        }),
        (ce.prototype.sort = function (e) {
          return Ge(_t(this, e));
        }),
        (ce.prototype.sortBy = function (e, t) {
          return Ge(_t(this, t, e));
        }),
        (ce.prototype.withMutations = function (e) {
          var t = this.asMutable();
          return e(t), t.wasAltered() ? t.__ensureOwner(this.__ownerID) : this;
        }),
        (ce.prototype.asMutable = function () {
          return this.__ownerID ? this : this.__ensureOwner(new d());
        }),
        (ce.prototype.asImmutable = function () {
          return this.__ensureOwner();
        }),
        (ce.prototype.wasAltered = function () {
          return this.__altered;
        }),
        (ce.prototype.__iterator = function (e, t) {
          return new ge(this, e, t);
        }),
        (ce.prototype.__iterate = function (e, t) {
          var n = this,
            r = 0;
          return (
            this._root &&
              this._root.iterate(function (t) {
                return r++, e(t[1], t[0], n);
              }, t),
            r
          );
        }),
        (ce.prototype.__ensureOwner = function (e) {
          return e === this.__ownerID
            ? this
            : e
            ? we(this.size, this._root, e, this.__hash)
            : ((this.__ownerID = e), (this.__altered = !1), this);
        }),
        (ce.isMap = de);
      var Fn = "@@__IMMUTABLE_MAP__@@",
        qn = ce.prototype;
      (qn[Fn] = !0),
        (qn[pn] = qn.remove),
        (qn.removeIn = qn.deleteIn),
        (pe.prototype.get = function (e, t, n, r) {
          for (var i = this.entries, o = 0, a = i.length; o < a; o++)
            if ($(n, i[o][0])) return i[o][1];
          return r;
        }),
        (pe.prototype.update = function (e, t, n, r, i, o, a) {
          for (
            var u = i === mn, l = this.entries, s = 0, f = l.length;
            s < f && !$(r, l[s][0]);
            s++
          );
          var d = s < f;
          if (d ? l[s][1] === i : u) return this;
          if ((c(a), (u || !d) && c(o), !u || 1 !== l.length)) {
            if (!d && !u && l.length >= Kn) return Pe(e, l, r, i);
            var h = e && e === this.ownerID,
              v = h ? l : p(l);
            return (
              d
                ? u
                  ? s === f - 1
                    ? v.pop()
                    : (v[s] = v.pop())
                  : (v[s] = [r, i])
                : v.push([r, i]),
              h ? ((this.entries = v), this) : new pe(e, v)
            );
          }
        }),
        (he.prototype.get = function (e, t, n, r) {
          void 0 === t && (t = oe(n));
          var i = 1 << ((0 === e ? t : t >>> e) & yn),
            o = this.bitmap;
          return 0 === (o & i)
            ? r
            : this.nodes[je(o & (i - 1))].get(e + hn, t, n, r);
        }),
        (he.prototype.update = function (e, t, n, r, i, o, a) {
          void 0 === n && (n = oe(r));
          var u = (0 === t ? n : n >>> t) & yn,
            l = 1 << u,
            s = this.bitmap,
            f = 0 !== (s & l);
          if (!f && i === mn) return this;
          var c = je(s & (l - 1)),
            d = this.nodes,
            p = f ? d[c] : void 0,
            h = ke(p, e, t + hn, n, r, i, o, a);
          if (h === p) return this;
          if (!f && h && d.length >= Wn) return Ce(e, d, s, u, h);
          if (f && !h && 2 === d.length && xe(d[1 ^ c])) return d[1 ^ c];
          if (f && h && 1 === d.length && xe(h)) return h;
          var v = e && e === this.ownerID,
            y = f ? (h ? s : s ^ l) : s | l,
            m = f ? (h ? Le(d, c, h, v) : Ue(d, c, v)) : ze(d, c, h, v);
          return v
            ? ((this.bitmap = y), (this.nodes = m), this)
            : new he(e, y, m);
        }),
        (ve.prototype.get = function (e, t, n, r) {
          void 0 === t && (t = oe(n));
          var i = (0 === e ? t : t >>> e) & yn,
            o = this.nodes[i];
          return o ? o.get(e + hn, t, n, r) : r;
        }),
        (ve.prototype.update = function (e, t, n, r, i, o, a) {
          void 0 === n && (n = oe(r));
          var u = (0 === t ? n : n >>> t) & yn,
            l = i === mn,
            s = this.nodes,
            f = s[u];
          if (l && !f) return this;
          var c = ke(f, e, t + hn, n, r, i, o, a);
          if (c === f) return this;
          var d = this.count;
          if (f) {
            if (!c && (d--, d < Hn)) return Oe(e, s, d, u);
          } else d++;
          var p = e && e === this.ownerID,
            h = Le(s, u, c, p);
          return p
            ? ((this.count = d), (this.nodes = h), this)
            : new ve(e, d, h);
        }),
        (ye.prototype.get = function (e, t, n, r) {
          for (var i = this.entries, o = 0, a = i.length; o < a; o++)
            if ($(n, i[o][0])) return i[o][1];
          return r;
        }),
        (ye.prototype.update = function (e, t, n, r, i, o, a) {
          void 0 === n && (n = oe(r));
          var u = i === mn;
          if (n !== this.keyHash)
            return u ? this : (c(a), c(o), Te(this, e, t, n, [r, i]));
          for (
            var l = this.entries, s = 0, f = l.length;
            s < f && !$(r, l[s][0]);
            s++
          );
          var d = s < f;
          if (d ? l[s][1] === i : u) return this;
          if ((c(a), (u || !d) && c(o), u && 2 === f))
            return new me(e, this.keyHash, l[1 ^ s]);
          var h = e && e === this.ownerID,
            v = h ? l : p(l);
          return (
            d
              ? u
                ? s === f - 1
                  ? v.pop()
                  : (v[s] = v.pop())
                : (v[s] = [r, i])
              : v.push([r, i]),
            h ? ((this.entries = v), this) : new ye(e, this.keyHash, v)
          );
        }),
        (me.prototype.get = function (e, t, n, r) {
          return $(n, this.entry[0]) ? this.entry[1] : r;
        }),
        (me.prototype.update = function (e, t, n, r, i, o, a) {
          var u = i === mn,
            l = $(r, this.entry[0]);
          return (l ? i === this.entry[1] : u)
            ? this
            : (c(a),
              u
                ? void c(o)
                : l
                ? e && e === this.ownerID
                  ? ((this.entry[1] = i), this)
                  : new me(e, this.keyHash, [r, i])
                : (c(o), Te(this, e, t, oe(r), [r, i])));
        }),
        (pe.prototype.iterate = ye.prototype.iterate =
          function (e, t) {
            for (var n = this.entries, r = 0, i = n.length - 1; r <= i; r++)
              if (e(n[t ? i - r : r]) === !1) return !1;
          }),
        (he.prototype.iterate = ve.prototype.iterate =
          function (e, t) {
            for (var n = this.nodes, r = 0, i = n.length - 1; r <= i; r++) {
              var o = n[t ? i - r : r];
              if (o && o.iterate(e, t) === !1) return !1;
            }
          }),
        (me.prototype.iterate = function (e, t) {
          return e(this.entry);
        }),
        e(ge, w),
        (ge.prototype.next = function () {
          for (var e = this._type, t = this._stack; t; ) {
            var n,
              r = t.node,
              i = t.index++;
            if (r.entry) {
              if (0 === i) return be(e, r.entry);
            } else if (r.entries) {
              if (((n = r.entries.length - 1), i <= n))
                return be(e, r.entries[this._reverse ? n - i : i]);
            } else if (((n = r.nodes.length - 1), i <= n)) {
              var o = r.nodes[this._reverse ? n - i : i];
              if (o) {
                if (o.entry) return be(e, o.entry);
                t = this._stack = _e(o, t);
              }
              continue;
            }
            t = this._stack = this._stack.__prev;
          }
          return S();
        });
      var Yn,
        Kn = vn / 4,
        Wn = vn / 2,
        Hn = vn / 4;
      e(Be, ne),
        (Be.of = function () {
          return this(arguments);
        }),
        (Be.prototype.toString = function () {
          return this.__toString("List [", "]");
        }),
        (Be.prototype.get = function (e, t) {
          if (((e = v(this, e)), e >= 0 && e < this.size)) {
            e += this._origin;
            var n = Qe(this, e);
            return n && n.array[e & yn];
          }
          return t;
        }),
        (Be.prototype.set = function (e, t) {
          return We(this, e, t);
        }),
        (Be.prototype.remove = function (e) {
          return this.has(e)
            ? 0 === e
              ? this.shift()
              : e === this.size - 1
              ? this.pop()
              : this.splice(e, 1)
            : this;
        }),
        (Be.prototype.insert = function (e, t) {
          return this.splice(e, 0, t);
        }),
        (Be.prototype.clear = function () {
          return 0 === this.size
            ? this
            : this.__ownerID
            ? ((this.size = this._origin = this._capacity = 0),
              (this._level = hn),
              (this._root = this._tail = null),
              (this.__hash = void 0),
              (this.__altered = !0),
              this)
            : Ke();
        }),
        (Be.prototype.push = function () {
          var e = arguments,
            t = this.size;
          return this.withMutations(function (n) {
            $e(n, 0, t + e.length);
            for (var r = 0; r < e.length; r++) n.set(t + r, e[r]);
          });
        }),
        (Be.prototype.pop = function () {
          return $e(this, 0, -1);
        }),
        (Be.prototype.unshift = function () {
          var e = arguments;
          return this.withMutations(function (t) {
            $e(t, -e.length);
            for (var n = 0; n < e.length; n++) t.set(n, e[n]);
          });
        }),
        (Be.prototype.shift = function () {
          return $e(this, 1);
        }),
        (Be.prototype.merge = function () {
          return Je(this, void 0, arguments);
        }),
        (Be.prototype.mergeWith = function (e) {
          var t = ln.call(arguments, 1);
          return Je(this, e, t);
        }),
        (Be.prototype.mergeDeep = function () {
          return Je(this, Ie, arguments);
        }),
        (Be.prototype.mergeDeepWith = function (e) {
          var t = ln.call(arguments, 1);
          return Je(this, Me(e), t);
        }),
        (Be.prototype.setSize = function (e) {
          return $e(this, 0, e);
        }),
        (Be.prototype.slice = function (e, t) {
          var n = this.size;
          return m(e, t, n) ? this : $e(this, g(e, n), b(t, n));
        }),
        (Be.prototype.__iterator = function (e, t) {
          var n = 0,
            r = qe(this, t);
          return new w(function () {
            var t = r();
            return t === Jn ? S() : E(e, n++, t);
          });
        }),
        (Be.prototype.__iterate = function (e, t) {
          for (
            var n, r = 0, i = qe(this, t);
            (n = i()) !== Jn && e(n, r++, this) !== !1;

          );
          return r;
        }),
        (Be.prototype.__ensureOwner = function (e) {
          return e === this.__ownerID
            ? this
            : e
            ? Ye(
                this._origin,
                this._capacity,
                this._level,
                this._root,
                this._tail,
                e,
                this.__hash
              )
            : ((this.__ownerID = e), this);
        }),
        (Be.isList = De);
      var Vn = "@@__IMMUTABLE_LIST__@@",
        Qn = Be.prototype;
      (Qn[Vn] = !0),
        (Qn[pn] = Qn.remove),
        (Qn.setIn = qn.setIn),
        (Qn.deleteIn = Qn.removeIn = qn.removeIn),
        (Qn.update = qn.update),
        (Qn.updateIn = qn.updateIn),
        (Qn.mergeIn = qn.mergeIn),
        (Qn.mergeDeepIn = qn.mergeDeepIn),
        (Qn.withMutations = qn.withMutations),
        (Qn.asMutable = qn.asMutable),
        (Qn.asImmutable = qn.asImmutable),
        (Qn.wasAltered = qn.wasAltered),
        (Fe.prototype.removeBefore = function (e, t, n) {
          if (n === t ? 1 << t : 0 === this.array.length) return this;
          var r = (n >>> t) & yn;
          if (r >= this.array.length) return new Fe([], e);
          var i,
            o = 0 === r;
          if (t > 0) {
            var a = this.array[r];
            if (((i = a && a.removeBefore(e, t - hn, n)), i === a && o))
              return this;
          }
          if (o && !i) return this;
          var u = Ve(this, e);
          if (!o) for (var l = 0; l < r; l++) u.array[l] = void 0;
          return i && (u.array[r] = i), u;
        }),
        (Fe.prototype.removeAfter = function (e, t, n) {
          if (n === (t ? 1 << t : 0) || 0 === this.array.length) return this;
          var r = ((n - 1) >>> t) & yn;
          if (r >= this.array.length) return this;
          var i;
          if (t > 0) {
            var o = this.array[r];
            if (
              ((i = o && o.removeAfter(e, t - hn, n)),
              i === o && r === this.array.length - 1)
            )
              return this;
          }
          var a = Ve(this, e);
          return a.array.splice(r + 1), i && (a.array[r] = i), a;
        });
      var $n,
        Jn = {};
      e(Ge, ce),
        (Ge.of = function () {
          return this(arguments);
        }),
        (Ge.prototype.toString = function () {
          return this.__toString("OrderedMap {", "}");
        }),
        (Ge.prototype.get = function (e, t) {
          var n = this._map.get(e);
          return void 0 !== n ? this._list.get(n)[1] : t;
        }),
        (Ge.prototype.clear = function () {
          return 0 === this.size
            ? this
            : this.__ownerID
            ? ((this.size = 0), this._map.clear(), this._list.clear(), this)
            : tt();
        }),
        (Ge.prototype.set = function (e, t) {
          return nt(this, e, t);
        }),
        (Ge.prototype.remove = function (e) {
          return nt(this, e, mn);
        }),
        (Ge.prototype.wasAltered = function () {
          return this._map.wasAltered() || this._list.wasAltered();
        }),
        (Ge.prototype.__iterate = function (e, t) {
          var n = this;
          return this._list.__iterate(function (t) {
            return t && e(t[1], t[0], n);
          }, t);
        }),
        (Ge.prototype.__iterator = function (e, t) {
          return this._list.fromEntrySeq().__iterator(e, t);
        }),
        (Ge.prototype.__ensureOwner = function (e) {
          if (e === this.__ownerID) return this;
          var t = this._map.__ensureOwner(e),
            n = this._list.__ensureOwner(e);
          return e
            ? et(t, n, e, this.__hash)
            : ((this.__ownerID = e), (this._map = t), (this._list = n), this);
        }),
        (Ge.isOrderedMap = Ze),
        (Ge.prototype[dn] = !0),
        (Ge.prototype[pn] = Ge.prototype.remove);
      var Xn;
      e(rt, R),
        (rt.prototype.get = function (e, t) {
          return this._iter.get(e, t);
        }),
        (rt.prototype.has = function (e) {
          return this._iter.has(e);
        }),
        (rt.prototype.valueSeq = function () {
          return this._iter.valueSeq();
        }),
        (rt.prototype.reverse = function () {
          var e = this,
            t = st(this, !0);
          return (
            this._useKeys ||
              (t.valueSeq = function () {
                return e._iter.toSeq().reverse();
              }),
            t
          );
        }),
        (rt.prototype.map = function (e, t) {
          var n = this,
            r = lt(this, e, t);
          return (
            this._useKeys ||
              (r.valueSeq = function () {
                return n._iter.toSeq().map(e, t);
              }),
            r
          );
        }),
        (rt.prototype.__iterate = function (e, t) {
          var n,
            r = this;
          return this._iter.__iterate(
            this._useKeys
              ? function (t, n) {
                  return e(t, n, r);
                }
              : ((n = t ? Tt(this) : 0),
                function (i) {
                  return e(i, t ? --n : n++, r);
                }),
            t
          );
        }),
        (rt.prototype.__iterator = function (e, t) {
          if (this._useKeys) return this._iter.__iterator(e, t);
          var n = this._iter.__iterator(wn, t),
            r = t ? Tt(this) : 0;
          return new w(function () {
            var i = n.next();
            return i.done ? i : E(e, t ? --r : r++, i.value, i);
          });
        }),
        (rt.prototype[dn] = !0),
        e(it, I),
        (it.prototype.includes = function (e) {
          return this._iter.includes(e);
        }),
        (it.prototype.__iterate = function (e, t) {
          var n = this,
            r = 0;
          return this._iter.__iterate(function (t) {
            return e(t, r++, n);
          }, t);
        }),
        (it.prototype.__iterator = function (e, t) {
          var n = this._iter.__iterator(wn, t),
            r = 0;
          return new w(function () {
            var t = n.next();
            return t.done ? t : E(e, r++, t.value, t);
          });
        }),
        e(ot, M),
        (ot.prototype.has = function (e) {
          return this._iter.includes(e);
        }),
        (ot.prototype.__iterate = function (e, t) {
          var n = this;
          return this._iter.__iterate(function (t) {
            return e(t, t, n);
          }, t);
        }),
        (ot.prototype.__iterator = function (e, t) {
          var n = this._iter.__iterator(wn, t);
          return new w(function () {
            var t = n.next();
            return t.done ? t : E(e, t.value, t.value, t);
          });
        }),
        e(at, R),
        (at.prototype.entrySeq = function () {
          return this._iter.toSeq();
        }),
        (at.prototype.__iterate = function (e, t) {
          var n = this;
          return this._iter.__iterate(function (t) {
            if (t) {
              xt(t);
              var r = o(t);
              return e(r ? t.get(1) : t[1], r ? t.get(0) : t[0], n);
            }
          }, t);
        }),
        (at.prototype.__iterator = function (e, t) {
          var n = this._iter.__iterator(wn, t);
          return new w(function () {
            for (;;) {
              var t = n.next();
              if (t.done) return t;
              var r = t.value;
              if (r) {
                xt(r);
                var i = o(r);
                return E(e, i ? r.get(0) : r[0], i ? r.get(1) : r[1], t);
              }
            }
          });
        }),
        (it.prototype.cacheResult =
          rt.prototype.cacheResult =
          ot.prototype.cacheResult =
          at.prototype.cacheResult =
            Ct),
        e(Mt, te),
        (Mt.prototype.toString = function () {
          return this.__toString(Nt(this) + " {", "}");
        }),
        (Mt.prototype.has = function (e) {
          return this._defaultValues.hasOwnProperty(e);
        }),
        (Mt.prototype.get = function (e, t) {
          if (!this.has(e)) return t;
          var n = this._defaultValues[e];
          return this._map ? this._map.get(e, n) : n;
        }),
        (Mt.prototype.clear = function () {
          if (this.__ownerID) return this._map && this._map.clear(), this;
          var e = this.constructor;
          return e._empty || (e._empty = At(this, Ee()));
        }),
        (Mt.prototype.set = function (e, t) {
          if (!this.has(e))
            throw new Error(
              'Cannot set unknown key "' + e + '" on ' + Nt(this)
            );
          if (this._map && !this._map.has(e)) {
            var n = this._defaultValues[e];
            if (t === n) return this;
          }
          var r = this._map && this._map.set(e, t);
          return this.__ownerID || r === this._map ? this : At(this, r);
        }),
        (Mt.prototype.remove = function (e) {
          if (!this.has(e)) return this;
          var t = this._map && this._map.remove(e);
          return this.__ownerID || t === this._map ? this : At(this, t);
        }),
        (Mt.prototype.wasAltered = function () {
          return this._map.wasAltered();
        }),
        (Mt.prototype.__iterator = function (e, t) {
          var r = this;
          return n(this._defaultValues)
            .map(function (e, t) {
              return r.get(t);
            })
            .__iterator(e, t);
        }),
        (Mt.prototype.__iterate = function (e, t) {
          var r = this;
          return n(this._defaultValues)
            .map(function (e, t) {
              return r.get(t);
            })
            .__iterate(e, t);
        }),
        (Mt.prototype.__ensureOwner = function (e) {
          if (e === this.__ownerID) return this;
          var t = this._map && this._map.__ensureOwner(e);
          return e
            ? At(this, t, e)
            : ((this.__ownerID = e), (this._map = t), this);
        });
      var Gn = Mt.prototype;
      (Gn[pn] = Gn.remove),
        (Gn.deleteIn = Gn.removeIn = qn.removeIn),
        (Gn.merge = qn.merge),
        (Gn.mergeWith = qn.mergeWith),
        (Gn.mergeIn = qn.mergeIn),
        (Gn.mergeDeep = qn.mergeDeep),
        (Gn.mergeDeepWith = qn.mergeDeepWith),
        (Gn.mergeDeepIn = qn.mergeDeepIn),
        (Gn.setIn = qn.setIn),
        (Gn.update = qn.update),
        (Gn.updateIn = qn.updateIn),
        (Gn.withMutations = qn.withMutations),
        (Gn.asMutable = qn.asMutable),
        (Gn.asImmutable = qn.asImmutable),
        e(zt, re),
        (zt.of = function () {
          return this(arguments);
        }),
        (zt.fromKeys = function (e) {
          return this(n(e).keySeq());
        }),
        (zt.prototype.toString = function () {
          return this.__toString("Set {", "}");
        }),
        (zt.prototype.has = function (e) {
          return this._map.has(e);
        }),
        (zt.prototype.add = function (e) {
          return Bt(this, this._map.set(e, !0));
        }),
        (zt.prototype.remove = function (e) {
          return Bt(this, this._map.remove(e));
        }),
        (zt.prototype.clear = function () {
          return Bt(this, this._map.clear());
        }),
        (zt.prototype.union = function () {
          var e = ln.call(arguments, 0);
          return (
            (e = e.filter(function (e) {
              return 0 !== e.size;
            })),
            0 === e.length
              ? this
              : 0 !== this.size || this.__ownerID || 1 !== e.length
              ? this.withMutations(function (t) {
                  for (var n = 0; n < e.length; n++)
                    i(e[n]).forEach(function (e) {
                      return t.add(e);
                    });
                })
              : this.constructor(e[0])
          );
        }),
        (zt.prototype.intersect = function () {
          var e = ln.call(arguments, 0);
          if (0 === e.length) return this;
          e = e.map(function (e) {
            return i(e);
          });
          var t = this;
          return this.withMutations(function (n) {
            t.forEach(function (t) {
              e.every(function (e) {
                return e.includes(t);
              }) || n.remove(t);
            });
          });
        }),
        (zt.prototype.subtract = function () {
          var e = ln.call(arguments, 0);
          if (0 === e.length) return this;
          e = e.map(function (e) {
            return i(e);
          });
          var t = this;
          return this.withMutations(function (n) {
            t.forEach(function (t) {
              e.some(function (e) {
                return e.includes(t);
              }) && n.remove(t);
            });
          });
        }),
        (zt.prototype.merge = function () {
          return this.union.apply(this, arguments);
        }),
        (zt.prototype.mergeWith = function (e) {
          var t = ln.call(arguments, 1);
          return this.union.apply(this, t);
        }),
        (zt.prototype.sort = function (e) {
          return qt(_t(this, e));
        }),
        (zt.prototype.sortBy = function (e, t) {
          return qt(_t(this, t, e));
        }),
        (zt.prototype.wasAltered = function () {
          return this._map.wasAltered();
        }),
        (zt.prototype.__iterate = function (e, t) {
          var n = this;
          return this._map.__iterate(function (t, r) {
            return e(r, r, n);
          }, t);
        }),
        (zt.prototype.__iterator = function (e, t) {
          return this._map
            .map(function (e, t) {
              return t;
            })
            .__iterator(e, t);
        }),
        (zt.prototype.__ensureOwner = function (e) {
          if (e === this.__ownerID) return this;
          var t = this._map.__ensureOwner(e);
          return e
            ? this.__make(t, e)
            : ((this.__ownerID = e), (this._map = t), this);
        }),
        (zt.isSet = Ut);
      var Zn = "@@__IMMUTABLE_SET__@@",
        er = zt.prototype;
      (er[Zn] = !0),
        (er[pn] = er.remove),
        (er.mergeDeep = er.merge),
        (er.mergeDeepWith = er.mergeWith),
        (er.withMutations = qn.withMutations),
        (er.asMutable = qn.asMutable),
        (er.asImmutable = qn.asImmutable),
        (er.__empty = Ft),
        (er.__make = Dt);
      var tr;
      e(qt, zt),
        (qt.of = function () {
          return this(arguments);
        }),
        (qt.fromKeys = function (e) {
          return this(n(e).keySeq());
        }),
        (qt.prototype.toString = function () {
          return this.__toString("OrderedSet {", "}");
        }),
        (qt.isOrderedSet = Yt);
      var nr = qt.prototype;
      (nr[dn] = !0), (nr.__empty = Wt), (nr.__make = Kt);
      var rr;
      e(Ht, ne),
        (Ht.of = function () {
          return this(arguments);
        }),
        (Ht.prototype.toString = function () {
          return this.__toString("Stack [", "]");
        }),
        (Ht.prototype.get = function (e, t) {
          var n = this._head;
          for (e = v(this, e); n && e--; ) n = n.next;
          return n ? n.value : t;
        }),
        (Ht.prototype.peek = function () {
          return this._head && this._head.value;
        }),
        (Ht.prototype.push = function () {
          if (0 === arguments.length) return this;
          for (
            var e = this.size + arguments.length,
              t = this._head,
              n = arguments.length - 1;
            n >= 0;
            n--
          )
            t = {
              value: arguments[n],
              next: t,
            };
          return this.__ownerID
            ? ((this.size = e),
              (this._head = t),
              (this.__hash = void 0),
              (this.__altered = !0),
              this)
            : Qt(e, t);
        }),
        (Ht.prototype.pushAll = function (e) {
          if (((e = r(e)), 0 === e.size)) return this;
          fe(e.size);
          var t = this.size,
            n = this._head;
          return (
            e.reverse().forEach(function (e) {
              t++,
                (n = {
                  value: e,
                  next: n,
                });
            }),
            this.__ownerID
              ? ((this.size = t),
                (this._head = n),
                (this.__hash = void 0),
                (this.__altered = !0),
                this)
              : Qt(t, n)
          );
        }),
        (Ht.prototype.pop = function () {
          return this.slice(1);
        }),
        (Ht.prototype.unshift = function () {
          return this.push.apply(this, arguments);
        }),
        (Ht.prototype.unshiftAll = function (e) {
          return this.pushAll(e);
        }),
        (Ht.prototype.shift = function () {
          return this.pop.apply(this, arguments);
        }),
        (Ht.prototype.clear = function () {
          return 0 === this.size
            ? this
            : this.__ownerID
            ? ((this.size = 0),
              (this._head = void 0),
              (this.__hash = void 0),
              (this.__altered = !0),
              this)
            : $t();
        }),
        (Ht.prototype.slice = function (e, t) {
          if (m(e, t, this.size)) return this;
          var n = g(e, this.size),
            r = b(t, this.size);
          if (r !== this.size) return ne.prototype.slice.call(this, e, t);
          for (var i = this.size - n, o = this._head; n--; ) o = o.next;
          return this.__ownerID
            ? ((this.size = i),
              (this._head = o),
              (this.__hash = void 0),
              (this.__altered = !0),
              this)
            : Qt(i, o);
        }),
        (Ht.prototype.__ensureOwner = function (e) {
          return e === this.__ownerID
            ? this
            : e
            ? Qt(this.size, this._head, e, this.__hash)
            : ((this.__ownerID = e), (this.__altered = !1), this);
        }),
        (Ht.prototype.__iterate = function (e, t) {
          if (t) return this.reverse().__iterate(e);
          for (var n = 0, r = this._head; r && e(r.value, n++, this) !== !1; )
            r = r.next;
          return n;
        }),
        (Ht.prototype.__iterator = function (e, t) {
          if (t) return this.reverse().__iterator(e);
          var n = 0,
            r = this._head;
          return new w(function () {
            if (r) {
              var t = r.value;
              return (r = r.next), E(e, n++, t);
            }
            return S();
          });
        }),
        (Ht.isStack = Vt);
      var ir = "@@__IMMUTABLE_STACK__@@",
        or = Ht.prototype;
      (or[ir] = !0),
        (or.withMutations = qn.withMutations),
        (or.asMutable = qn.asMutable),
        (or.asImmutable = qn.asImmutable),
        (or.wasAltered = qn.wasAltered);
      var ar;
      (t.Iterator = w),
        Jt(t, {
          toArray: function () {
            fe(this.size);
            var e = new Array(this.size || 0);
            return (
              this.valueSeq().__iterate(function (t, n) {
                e[n] = t;
              }),
              e
            );
          },
          toIndexedSeq: function () {
            return new it(this);
          },
          toJS: function () {
            return this.toSeq()
              .map(function (e) {
                return e && "function" == typeof e.toJS ? e.toJS() : e;
              })
              .__toJS();
          },
          toJSON: function () {
            return this.toSeq()
              .map(function (e) {
                return e && "function" == typeof e.toJSON ? e.toJSON() : e;
              })
              .__toJS();
          },
          toKeyedSeq: function () {
            return new rt(this, !0);
          },
          toMap: function () {
            return ce(this.toKeyedSeq());
          },
          toObject: function () {
            fe(this.size);
            var e = {};
            return (
              this.__iterate(function (t, n) {
                e[n] = t;
              }),
              e
            );
          },
          toOrderedMap: function () {
            return Ge(this.toKeyedSeq());
          },
          toOrderedSet: function () {
            return qt(a(this) ? this.valueSeq() : this);
          },
          toSet: function () {
            return zt(a(this) ? this.valueSeq() : this);
          },
          toSetSeq: function () {
            return new ot(this);
          },
          toSeq: function () {
            return u(this)
              ? this.toIndexedSeq()
              : a(this)
              ? this.toKeyedSeq()
              : this.toSetSeq();
          },
          toStack: function () {
            return Ht(a(this) ? this.valueSeq() : this);
          },
          toList: function () {
            return Be(a(this) ? this.valueSeq() : this);
          },
          toString: function () {
            return "[Iterable]";
          },
          __toString: function (e, t) {
            return 0 === this.size
              ? e + t
              : e +
                  " " +
                  this.toSeq().map(this.__toStringMapper).join(", ") +
                  " " +
                  t;
          },
          concat: function () {
            var e = ln.call(arguments, 0);
            return kt(this, yt(this, e));
          },
          includes: function (e) {
            return this.some(function (t) {
              return $(t, e);
            });
          },
          entries: function () {
            return this.__iterator(En);
          },
          every: function (e, t) {
            fe(this.size);
            var n = !0;
            return (
              this.__iterate(function (r, i, o) {
                if (!e.call(t, r, i, o)) return (n = !1), !1;
              }),
              n
            );
          },
          filter: function (e, t) {
            return kt(this, ft(this, e, t, !0));
          },
          find: function (e, t, n) {
            var r = this.findEntry(e, t);
            return r ? r[1] : n;
          },
          forEach: function (e, t) {
            return fe(this.size), this.__iterate(t ? e.bind(t) : e);
          },
          join: function (e) {
            fe(this.size), (e = void 0 !== e ? "" + e : ",");
            var t = "",
              n = !0;
            return (
              this.__iterate(function (r) {
                n ? (n = !1) : (t += e),
                  (t += null !== r && void 0 !== r ? r.toString() : "");
              }),
              t
            );
          },
          keys: function () {
            return this.__iterator(_n);
          },
          map: function (e, t) {
            return kt(this, lt(this, e, t));
          },
          reduce: function (e, t, n) {
            fe(this.size);
            var r, i;
            return (
              arguments.length < 2 ? (i = !0) : (r = t),
              this.__iterate(function (t, o, a) {
                i ? ((i = !1), (r = t)) : (r = e.call(n, r, t, o, a));
              }),
              r
            );
          },
          reduceRight: function (e, t, n) {
            var r = this.toKeyedSeq().reverse();
            return r.reduce.apply(r, arguments);
          },
          reverse: function () {
            return kt(this, st(this, !0));
          },
          slice: function (e, t) {
            return kt(this, pt(this, e, t, !0));
          },
          some: function (e, t) {
            return !this.every(Zt(e), t);
          },
          sort: function (e) {
            return kt(this, _t(this, e));
          },
          values: function () {
            return this.__iterator(wn);
          },
          butLast: function () {
            return this.slice(0, -1);
          },
          isEmpty: function () {
            return void 0 !== this.size
              ? 0 === this.size
              : !this.some(function () {
                  return !0;
                });
          },
          count: function (e, t) {
            return h(e ? this.toSeq().filter(e, t) : this);
          },
          countBy: function (e, t) {
            return ct(this, e, t);
          },
          equals: function (e) {
            return J(this, e);
          },
          entrySeq: function () {
            var e = this;
            if (e._cache) return new A(e._cache);
            var t = e.toSeq().map(Gt).toIndexedSeq();
            return (
              (t.fromEntrySeq = function () {
                return e.toSeq();
              }),
              t
            );
          },
          filterNot: function (e, t) {
            return this.filter(Zt(e), t);
          },
          findEntry: function (e, t, n) {
            var r = n;
            return (
              this.__iterate(function (n, i, o) {
                if (e.call(t, n, i, o)) return (r = [i, n]), !1;
              }),
              r
            );
          },
          findKey: function (e, t) {
            var n = this.findEntry(e, t);
            return n && n[0];
          },
          findLast: function (e, t, n) {
            return this.toKeyedSeq().reverse().find(e, t, n);
          },
          findLastEntry: function (e, t, n) {
            return this.toKeyedSeq().reverse().findEntry(e, t, n);
          },
          findLastKey: function (e, t) {
            return this.toKeyedSeq().reverse().findKey(e, t);
          },
          first: function () {
            return this.find(y);
          },
          flatMap: function (e, t) {
            return kt(this, gt(this, e, t));
          },
          flatten: function (e) {
            return kt(this, mt(this, e, !0));
          },
          fromEntrySeq: function () {
            return new at(this);
          },
          get: function (e, t) {
            return this.find(
              function (t, n) {
                return $(n, e);
              },
              void 0,
              t
            );
          },
          getIn: function (e, t) {
            for (var n, r = this, i = It(e); !(n = i.next()).done; ) {
              var o = n.value;
              if (((r = r && r.get ? r.get(o, mn) : mn), r === mn)) return t;
            }
            return r;
          },
          groupBy: function (e, t) {
            return dt(this, e, t);
          },
          has: function (e) {
            return this.get(e, mn) !== mn;
          },
          hasIn: function (e) {
            return this.getIn(e, mn) !== mn;
          },
          isSubset: function (e) {
            return (
              (e = "function" == typeof e.includes ? e : t(e)),
              this.every(function (t) {
                return e.includes(t);
              })
            );
          },
          isSuperset: function (e) {
            return (
              (e = "function" == typeof e.isSubset ? e : t(e)), e.isSubset(this)
            );
          },
          keyOf: function (e) {
            return this.findKey(function (t) {
              return $(t, e);
            });
          },
          keySeq: function () {
            return this.toSeq().map(Xt).toIndexedSeq();
          },
          last: function () {
            return this.toSeq().reverse().first();
          },
          lastKeyOf: function (e) {
            return this.toKeyedSeq().reverse().keyOf(e);
          },
          max: function (e) {
            return wt(this, e);
          },
          maxBy: function (e, t) {
            return wt(this, t, e);
          },
          min: function (e) {
            return wt(this, e ? en(e) : rn);
          },
          minBy: function (e, t) {
            return wt(this, t ? en(t) : rn, e);
          },
          rest: function () {
            return this.slice(1);
          },
          skip: function (e) {
            return this.slice(Math.max(0, e));
          },
          skipLast: function (e) {
            return kt(this, this.toSeq().reverse().skip(e).reverse());
          },
          skipWhile: function (e, t) {
            return kt(this, vt(this, e, t, !0));
          },
          skipUntil: function (e, t) {
            return this.skipWhile(Zt(e), t);
          },
          sortBy: function (e, t) {
            return kt(this, _t(this, t, e));
          },
          take: function (e) {
            return this.slice(0, Math.max(0, e));
          },
          takeLast: function (e) {
            return kt(this, this.toSeq().reverse().take(e).reverse());
          },
          takeWhile: function (e, t) {
            return kt(this, ht(this, e, t));
          },
          takeUntil: function (e, t) {
            return this.takeWhile(Zt(e), t);
          },
          valueSeq: function () {
            return this.toIndexedSeq();
          },
          hashCode: function () {
            return this.__hash || (this.__hash = on(this));
          },
        });
      var ur = t.prototype;
      (ur[sn] = !0),
        (ur[xn] = ur.values),
        (ur.__toJS = ur.toArray),
        (ur.__toStringMapper = tn),
        (ur.inspect = ur.toSource =
          function () {
            return this.toString();
          }),
        (ur.chain = ur.flatMap),
        (ur.contains = ur.includes),
        Jt(n, {
          flip: function () {
            return kt(this, ut(this));
          },
          mapEntries: function (e, t) {
            var n = this,
              r = 0;
            return kt(
              this,
              this.toSeq()
                .map(function (i, o) {
                  return e.call(t, [o, i], r++, n);
                })
                .fromEntrySeq()
            );
          },
          mapKeys: function (e, t) {
            var n = this;
            return kt(
              this,
              this.toSeq()
                .flip()
                .map(function (r, i) {
                  return e.call(t, r, i, n);
                })
                .flip()
            );
          },
        });
      var lr = n.prototype;
      (lr[fn] = !0),
        (lr[xn] = ur.entries),
        (lr.__toJS = ur.toObject),
        (lr.__toStringMapper = function (e, t) {
          return JSON.stringify(t) + ": " + tn(e);
        }),
        Jt(r, {
          toKeyedSeq: function () {
            return new rt(this, !1);
          },
          filter: function (e, t) {
            return kt(this, ft(this, e, t, !1));
          },
          findIndex: function (e, t) {
            var n = this.findEntry(e, t);
            return n ? n[0] : -1;
          },
          indexOf: function (e) {
            var t = this.keyOf(e);
            return void 0 === t ? -1 : t;
          },
          lastIndexOf: function (e) {
            var t = this.lastKeyOf(e);
            return void 0 === t ? -1 : t;
          },
          reverse: function () {
            return kt(this, st(this, !1));
          },
          slice: function (e, t) {
            return kt(this, pt(this, e, t, !1));
          },
          splice: function (e, t) {
            var n = arguments.length;
            if (((t = Math.max(0 | t, 0)), 0 === n || (2 === n && !t)))
              return this;
            e = g(e, e < 0 ? this.count() : this.size);
            var r = this.slice(0, e);
            return kt(
              this,
              1 === n ? r : r.concat(p(arguments, 2), this.slice(e + t))
            );
          },
          findLastIndex: function (e, t) {
            var n = this.findLastEntry(e, t);
            return n ? n[0] : -1;
          },
          first: function () {
            return this.get(0);
          },
          flatten: function (e) {
            return kt(this, mt(this, e, !1));
          },
          get: function (e, t) {
            return (
              (e = v(this, e)),
              e < 0 ||
              this.size === 1 / 0 ||
              (void 0 !== this.size && e > this.size)
                ? t
                : this.find(
                    function (t, n) {
                      return n === e;
                    },
                    void 0,
                    t
                  )
            );
          },
          has: function (e) {
            return (
              (e = v(this, e)),
              e >= 0 &&
                (void 0 !== this.size
                  ? this.size === 1 / 0 || e < this.size
                  : this.indexOf(e) !== -1)
            );
          },
          interpose: function (e) {
            return kt(this, bt(this, e));
          },
          interleave: function () {
            var e = [this].concat(p(arguments)),
              t = St(this.toSeq(), I.of, e),
              n = t.flatten(!0);
            return t.size && (n.size = t.size * e.length), kt(this, n);
          },
          keySeq: function () {
            return Z(0, this.size);
          },
          last: function () {
            return this.get(-1);
          },
          skipWhile: function (e, t) {
            return kt(this, vt(this, e, t, !1));
          },
          zip: function () {
            var e = [this].concat(p(arguments));
            return kt(this, St(this, nn, e));
          },
          zipWith: function (e) {
            var t = p(arguments);
            return (t[0] = this), kt(this, St(this, e, t));
          },
        }),
        (r.prototype[cn] = !0),
        (r.prototype[dn] = !0),
        Jt(i, {
          get: function (e, t) {
            return this.has(e) ? e : t;
          },
          includes: function (e) {
            return this.has(e);
          },
          keySeq: function () {
            return this.valueSeq();
          },
        }),
        (i.prototype.has = ur.includes),
        (i.prototype.contains = i.prototype.includes),
        Jt(R, n.prototype),
        Jt(I, r.prototype),
        Jt(M, i.prototype),
        Jt(te, n.prototype),
        Jt(ne, r.prototype),
        Jt(re, i.prototype);
      var sr = {
        Iterable: t,
        Seq: C,
        Collection: ee,
        Map: ce,
        OrderedMap: Ge,
        List: Be,
        Stack: Ht,
        Set: zt,
        OrderedSet: qt,
        Record: Mt,
        Range: Z,
        Repeat: X,
        is: $,
        fromJS: W,
      };
      return sr;
    });
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    }),
      (t.validateNextState =
        t.getUnexpectedInvocationParameterMessage =
        t.getStateName =
          void 0);
    var i = n(47),
      o = r(i),
      a = n(48),
      u = r(a),
      l = n(49),
      s = r(l);
    (t.getStateName = o.default),
      (t.getUnexpectedInvocationParameterMessage = u.default),
      (t.validateNextState = s.default);
  },
  function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    }),
      (t.default = function (e) {
        return e && "@@redux/INIT" === e.type
          ? "initialState argument passed to createStore"
          : "previous state received by the reducer";
      }),
      (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(45),
      o = r(i),
      a = n(47),
      u = r(a);
    (t.default = function (e, t, n) {
      var r = Object.keys(t);
      if (!r.length)
        return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
      var i = (0, u.default)(n);
      if (!o.default.Iterable.isIterable(e))
        return (
          "The " +
          i +
          ' is of unexpected type. Expected argument to be an instance of Immutable.Iterable with the following properties: "' +
          r.join('", "') +
          '".'
        );
      var a = e
        .keySeq()
        .toArray()
        .filter(function (e) {
          return !t.hasOwnProperty(e);
        });
      return a.length > 0
        ? "Unexpected " +
            (1 === a.length ? "property" : "properties") +
            ' "' +
            a.join('", "') +
            '" found in ' +
            i +
            '. Expected to find one of the known reducer property names instead: "' +
            r.join('", "') +
            '". Unexpected properties will be ignored.'
        : null;
    }),
      (e.exports = t.default);
  },
  function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    }),
      (t.default = function (e, t, n) {
        if (void 0 === e)
          throw new Error(
            'Reducer "' +
              t +
              '" returned undefined when handling "' +
              n.type +
              '" action. To ignore an action, you must explicitly return the previous state.'
          );
      }),
      (e.exports = t.default);
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = n(52),
      u =
        !(!a.lastRecord || void 0 === a.lastRecord.pause) &&
        !!a.lastRecord.pause,
      l = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u,
          t = arguments[1];
        switch (t.type) {
          case o.PAUSE:
            return t.data;
          default:
            return e;
        }
      };
    t.default = l;
  },
  function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    (t.PAUSE = "PAUSE"),
      (t.MUSIC = "MUSIC"),
      (t.MATRIX = "MATRIX"),
      (t.NEXT_BLOCK = "NEXT_BLOCK"),
      (t.MOVE_BLOCK = "MOVE_BLOCK"),
      (t.START_LINES = "START_LINES"),
      (t.MAX = "MAX"),
      (t.POINTS = "POINTS"),
      (t.SPEED_START = "SPEED_START"),
      (t.SPEED_RUN = "SPEED_RUN"),
      (t.LOCK = "LOCK"),
      (t.CLEAR_LINES = "CLEAR_LINES"),
      (t.RESET = "RESET"),
      (t.DROP = "DROP"),
      (t.KEY_DROP = "KEY_DROP"),
      (t.KEY_DOWN = "KEY_DOWN"),
      (t.KEY_LEFT = "KEY_LEFT"),
      (t.KEY_RIGHT = "KEY_RIGHT"),
      (t.KEY_ROTATE = "KEY_ROTATE"),
      (t.KEY_RESET = "KEY_RESET"),
      (t.KEY_MUSIC = "KEY_MUSIC"),
      (t.KEY_PAUSE = "KEY_PAUSE"),
      (t.FOCUS = "FOCUS");
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    var i = n(45),
      o = n(53),
      a = r(o),
      u = {
        I: [[1, 1, 1, 1]],
        L: [
          [0, 0, 1],
          [1, 1, 1],
        ],
        J: [
          [1, 0, 0],
          [1, 1, 1],
        ],
        Z: [
          [1, 1, 0],
          [0, 1, 1],
        ],
        S: [
          [0, 1, 1],
          [1, 1, 0],
        ],
        O: [
          [1, 1],
          [1, 1],
        ],
        T: [
          [0, 1, 0],
          [1, 1, 1],
        ],
      },
      l = {
        I: [
          [-1, 1],
          [1, -1],
        ],
        L: [[0, 0]],
        J: [[0, 0]],
        Z: [[0, 0]],
        S: [[0, 0]],
        O: [[0, 0]],
        T: [
          [0, 0],
          [1, 0],
          [-1, 1],
          [0, -1],
        ],
      },
      s = Object.keys(u),
      f = [800, 650, 500, 370, 250, 160],
      c = [50, 60, 70, 80, 90, 100],
      d = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      p = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      h = (function () {
        for (var e = [], t = 0; t < 20; t++) e.push((0, i.List)(p));
        return (0, i.List)(e);
      })(),
      v = [100, 300, 700, 1500],
      y = "REACT_TETRIS",
      m = (function () {
        var e = localStorage.getItem(y);
        if (!e) return !1;
        try {
          window.btoa && (e = atob(e)),
            (e = decodeURIComponent(e)),
            (e = JSON.parse(e));
        } catch (e) {
          return (
            (window.console || window.console.error) &&
              window.console.error("读取记录错误:", e),
            !1
          );
        }
        return e;
      })(),
      g = 999999,
      b = (function () {
        var e = [
            "transform",
            "webkitTransform",
            "msTransform",
            "mozTransform",
            "oTransform",
          ],
          t = document.body;
        return e.filter(function (e) {
          return void 0 !== t.style[e];
        })[0];
      })(),
      _ = 20,
      w = function (e) {
        var t = new RegExp("\\?(?:.+&)?" + e + "=(.*?)(?:&.*)?$"),
          n = window.location.toString().match(t);
        return n ? decodeURI(n[1]) : "";
      },
      E = (function () {
        var e = w("lan").toLowerCase();
        return (e = a.default.lan.indexOf(e) === -1 ? a.default.default : e);
      })();
    e.exports = {
      blockShape: u,
      origin: l,
      blockType: s,
      speeds: f,
      delays: c,
      fillLine: d,
      blankLine: p,
      blankMatrix: h,
      clearPoints: v,
      StorageKey: y,
      lastRecord: m,
      maxPoint: g,
      eachLines: _,
      transform: b,
      lan: E,
      i18n: a.default.data,
    };
  },
  function (e, t) {
    e.exports = {
      lan: [
        "eo",
        "zh",
        "tw",
        "ja",
        "ko",
        "id",
        "hi",
        "de",
        "ru",
        "la",
        "en",
        "fr",
        "fa",
      ],
      default: "en",
      data: {
        title: {
          eo: "Tetriso",
          zh: "俄罗斯方块",
          tw: "俄羅斯方塊",
          ja: "テトリソ",
          ko: "테트리스",
          id: "Tetris",
          hi: "टेट्रिस",
          de: "Tetris",
          ru: "Tetris",
          la: "Tetris",
          en: "Tetris123.com",
          fr: "Tetris123.com",
          fa: "خانه سازی",
        },
        seoTitle: {
          eo: "Tetriso",
          zh: "俄罗斯方块",
          tw: "俄羅斯方塊",
          ja: "テトリソ",
          ko: "테트리스",
          id: "Tetris",
          hi: "टेट्रिस",
          de: "Tetris",
          ru: "Tetris",
          la: "Tetris",
          en: "Tetris Online - Play Tetris123 free & online",
          fr: "Tetris Online - Play Tetris123 free & online",
          fa: "خانه سازی",
        },
        github: {
          eo: "GitHub",
          zh: "GitHub",
          tw: "GitHub",
          ja: "GitHub",
          ko: "GitHub",
          id: "GitHub",
          hi: "GitHub",
          de: "GitHub",
          ru: "GitHub",
          la: "GitHub",
          en: "GitHub",
          fr: "GitHub",
          fa: "گیت‌هاب",
        },
        linkTitle: {
          eo: "Vidu datumfonton",
          zh: "查看源代码",
          tw: "查看源代码",
          ja: "データソースを表示",
          ko: "데이터 소스 보기",
          id: "Lihat sumber data",
          hi: "डेटा स्रोत देखें",
          de: "Datenquelle anzeigen",
          ru: "Просмотр источника данных",
          la: "Visum data fonte",
          en: "View data source",
          fr: "Afficher la source des données",
          fa: "مشاهده سورس پروژه",
        },
        QRCode: {
          eo: "QR-kodo",
          zh: "二维码",
          tw: "二維碼",
          ja: "QRコード",
          ko: "QR 코드",
          id: "Kode QR",
          hi: "क्यूआर कोड",
          de: "QR-Code",
          ru: "QR код",
          la: "QR code",
          en: "QR code",
          fr: "QR code",
          fa: "کیوآر کد",
        },
        titleCenter: {
          eo: "TERISO<br />TETRIS123.com",
          zh: "俄罗斯方块<br />TETRIS123.com",
          tw: "俄羅斯方塊<br />TETRIS123.com",
          ja: "テトリス",
          ko: "테트리스",
          id: "TETRIS",
          hi: "टेट्रिस",
          de: "TETRIS",
          ru: "ТЕТРИС",
          la: "TETRIS",
          en: "TETRIS",
          fr: "TETRIS",
          fa: "خانه سازی",
        },
        point: {
          eo: "Punkto",
          zh: "得分",
          tw: "得分",
          ja: "点",
          ko: "가리키다",
          id: "Titik",
          hi: "बिंदु",
          de: "Punkt",
          ru: "Точка",
          la: "Punctum",
          en: "Point",
          fr: "Score",
          fa: "امتیاز",
        },
        highestScore: {
          eo: "Maks",
          zh: "最高分",
          tw: "最高分",
          ja: "マックス",
          ko: "최대",
          id: "Maks",
          hi: "मैक्स",
          de: "Max",
          ru: "Максимум",
          la: "Max",
          en: "Max",
          fr: "Max",
          fa: "حداکثر",
        },
        lastRound: {
          eo: "Lasta Rondo",
          zh: "上轮得分",
          tw: "上輪得分",
          ja: "最終ラウンド",
          ko: "마지막 라운드",
          id: "Ronde terakhir",
          hi: "आखिरी दौर",
          de: "Letzte Runde",
          ru: "Последний раунд",
          la: "Last round",
          en: "Last Round",
          fr: "Dernier Tour",
          fa: "آخرین دور",
        },
        cleans: {
          eo: "Purigas",
          zh: "消除行",
          tw: "消除行",
          ja: "掃除",
          ko: "청소",
          id: "Membersihkan",
          hi: "साफ",
          de: "Reinigt",
          ru: "Очищает",
          la: "Cleans",
          en: "Cleans",
          fr: "Lignes",
          fa: "پاک کرد",
        },
        level: {
          eo: "Nivelo",
          zh: "级别",
          tw: "級別",
          ja: "レベル",
          ko: "수준",
          id: "Tingkat",
          hi: "स्तर",
          de: "Eben",
          ru: "Уровень",
          la: "Level",
          en: "Level",
          fr: "Difficulté",
          fa: "سطح",
        },
        startLine: {
          eo: "Komenca Linio",
          zh: "起始行",
          tw: "起始行",
          ja: "スタートライン",
          ko: "출발선",
          id: "Garis awal",
          hi: "शुरू लाइन",
          de: "Startlinie",
          ru: "Стартовая линия",
          la: "Satus Line",
          en: "Start Line",
          fr: "Ligne Départ",
          fa: "خط شروع",
        },
        next: {
          eo: "Poste",
          zh: "下一个",
          tw: "下一個",
          ja: "次",
          ko: "다음",
          id: "Berikutnya",
          hi: "अगला",
          de: "Nächste",
          ru: "Следующий",
          la: "deinde",
          en: "Next",
          fr: "Prochain",
          fa: "بعدی",
        },
        pause: {
          eo: "Paŭzo",
          zh: "暂停",
          tw: "暫停",
          ja: "一時停止",
          ko: "정지시키다",
          id: "Berhenti sebentar",
          hi: "ठहराव",
          de: "Pause",
          ru: "Пауза",
          la: "Pause",
          en: "Pause",
          fr: "Pause",
          fa: "مکث",
        },
        sound: {
          eo: "Sono",
          zh: "音效",
          tw: "音效",
          ja: "音",
          ko: "소리",
          id: "Suara",
          hi: "ध्वनि",
          de: "Klang",
          ru: "Звук",
          la: "Sonus",
          en: "Sound",
          fr: "Sonore",
          fa: "صدا",
        },
        reset: {
          eo: "Restarigi",
          zh: "重玩",
          tw: "重玩",
          ja: "リセット",
          ko: "초기화",
          id: "Mengatur ulang",
          hi: "रीसेट",
          de: "Zurücksetzen",
          ru: "Перезагрузить",
          la: "Reset",
          en: "Reset",
          fr: "Réinitialiser",
          fa: "ریست",
        },
        rotation: {
          eo: "Rotacio",
          zh: "旋转",
          tw: "旋轉",
          ja: "回転",
          ko: "회전",
          id: "Rotasi",
          hi: "रोटेशन",
          de: "Drehung",
          ru: "Вращение",
          la: "Rotatione",
          en: "Rotation",
          fr: "Rotation",
          fa: "چرخش",
        },
        left: {
          eo: "Maldekstre",
          zh: "左移",
          tw: "左移",
          ja: "左",
          ko: "왼쪽",
          id: "Kiri",
          hi: "बाएं",
          de: "Links",
          ru: "Левый",
          la: "left",
          en: "Left",
          fr: "Gauche",
          fa: "چپ",
        },
        right: {
          eo: "Ĝuste",
          zh: "右移",
          tw: "右移",
          ja: "右",
          ko: "오른쪽",
          id: "Benar",
          hi: "सही",
          de: "Richtig",
          ru: "Правильно",
          la: "ius",
          en: "Right",
          fr: "Droite",
          fa: "راست",
        },
        down: {
          eo: "Malsupren",
          zh: "下移",
          tw: "下移",
          ja: "下",
          ko: "아래에",
          id: "Turun",
          hi: "नीचे",
          de: "Runter",
          ru: "Вниз",
          la: "Descende",
          en: "Down",
          fr: "Bas",
          fa: "پایین",
        },
        drop: {
          eo: "Drop",
          zh: "掉落",
          tw: "掉落",
          ja: "落とす",
          ko: "하락",
          id: "Menjatuhkan",
          hi: "बूंद",
          de: "Fallen",
          ru: "Уронить",
          la: "Occumbo",
          en: "Drop",
          fr: "Tomber",
          fa: "سقوط",
        },
      },
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = n(52),
      u = n(55),
      l =
        !a.lastRecord || void 0 === a.lastRecord.music || !!a.lastRecord.music;
    u.hasWebAudioAPI.data || (l = !1);
    var s = function () {
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l,
        t = arguments[1];
      switch (t.type) {
        case o.MUSIC:
          return !!u.hasWebAudioAPI.data && t.data;
        default:
          return e;
      }
    };
    t.default = s;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    var i = n(41),
      o = r(i),
      a =
        window.AudioContext ||
        window.webkitAudioContext ||
        window.mozAudioContext ||
        window.oAudioContext ||
        window.msAudioContext,
      u = {
        data: !!a && location.protocol.indexOf("http") !== -1,
      },
      l = {};
    !(function () {
      if (u.data) {
        var e = "./music.mp3",
          t = new a(),
          n = new XMLHttpRequest();
        n.open("GET", e, !0),
          (n.responseType = "arraybuffer"),
          (n.onload = function () {
            t.decodeAudioData(
              n.response,
              function (e) {
                var n = function () {
                  var n = t.createBufferSource();
                  return (n.buffer = e), n.connect(t.destination), n;
                };
                (l.killStart = function () {
                  l.start = function () {};
                }),
                  (l.start = function () {
                    l.killStart(),
                      o.default.getState().get("music") &&
                        n().start(0, 3.7202, 3.6224);
                  }),
                  (l.clear = function () {
                    o.default.getState().get("music") &&
                      n().start(0, 0, 0.7675);
                  }),
                  (l.fall = function () {
                    o.default.getState().get("music") &&
                      n().start(0, 1.2558, 0.3546);
                  }),
                  (l.gameover = function () {
                    o.default.getState().get("music") &&
                      n().start(0, 8.1276, 1.1437);
                  }),
                  (l.rotate = function () {
                    o.default.getState().get("music") &&
                      n().start(0, 2.2471, 0.0807);
                  }),
                  (l.move = function () {
                    o.default.getState().get("music") &&
                      n().start(0, 2.9088, 0.1437);
                  });
              },
              function (t) {
                window.console &&
                  window.console.error &&
                  (window.console.error("音频: " + e + " 读取错误", t),
                  (u.data = !1));
              }
            );
          }),
          n.send();
      }
    })(),
      (e.exports = {
        hasWebAudioAPI: u,
        music: l,
      });
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(45),
      o = n(51),
      a = r(o),
      u = n(52),
      l =
        u.lastRecord && Array.isArray(u.lastRecord.matrix)
          ? (0, i.List)(
              u.lastRecord.matrix.map(function (e) {
                return (0, i.List)(e);
              })
            )
          : u.blankMatrix,
      s = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l,
          t = arguments[1];
        switch (t.type) {
          case a.MATRIX:
            return t.data;
          default:
            return e;
        }
      };
    t.default = s;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(58),
      o = n(51),
      a = r(o),
      u = n(52),
      l =
        u.lastRecord && u.blockType.indexOf(u.lastRecord.next) !== -1
          ? u.lastRecord.next
          : (0, i.getNextType)(),
      s = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : l,
          t = arguments[1];
        switch (t.type) {
          case a.NEXT_BLOCK:
            return t.data;
          default:
            return e;
        }
      };
    t.default = s;
  },
  function (e, t, n) {
    "use strict";
    var r = n(52),
      i = (function () {
        var e = ["hidden", "webkitHidden", "mozHidden", "msHidden"];
        return (
          (e = e.filter(function (e) {
            return e in document;
          })),
          e.length > 0 && e[0]
        );
      })(),
      o = (function () {
        return !!i && i.replace(/hidden/i, "visibilitychange");
      })(),
      a = function () {
        return !i || !document[i];
      },
      u = {
        getNextType: function () {
          var e = r.blockType.length;
          return r.blockType[Math.floor(Math.random() * e)];
        },
        want: function (e, t) {
          var n = e.xy,
            r = e.shape,
            i = r.get(0).size;
          return r.every(function (e, r) {
            return e.every(function (e, o) {
              return (
                !(n[1] < 0) &&
                !(n[1] + i > 10) &&
                (n[0] + r < 0 ||
                  (!(n[0] + r >= 20) && (!e || !t.get(n[0] + r).get(n[1] + o))))
              );
            });
          });
        },
        isClear: function (e) {
          var t = [];
          return (
            e.forEach(function (e, n) {
              e.every(function (e) {
                return !!e;
              }) && t.push(n);
            }),
            0 !== t.length && t
          );
        },
        isOver: function (e) {
          return e.get(0).some(function (e) {
            return !!e;
          });
        },
        subscribeRecord: function (e) {
          e.subscribe(function () {
            var t = e.getState().toJS();
            t.lock ||
              ((t = JSON.stringify(t)),
              (t = encodeURIComponent(t)),
              window.btoa && (t = btoa(t)),
              localStorage.setItem(r.StorageKey, t));
          });
        },
        isMobile: function () {
          var e = navigator.userAgent,
            t = /Android (\d+\.\d+)/.test(e),
            n = e.indexOf("iPhone") > -1,
            r = e.indexOf("iPod") > -1,
            i = e.indexOf("iPad") > -1,
            o = e.indexOf("NokiaN") > -1;
          return t || n || r || i || o;
        },
        visibilityChangeEvent: o,
        isFocus: a,
      };
    e.exports = u;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var o = n(45),
      a = n(51),
      u = i(a),
      l = n(52),
      s = n(60),
      f = r(s),
      c = (function () {
        if (!l.lastRecord || !l.lastRecord.cur) return null;
        var e = l.lastRecord.cur,
          t = {
            type: e.type,
            rotateIndex: e.rotateIndex,
            shape: (0, o.List)(
              e.shape.map(function (e) {
                return (0, o.List)(e);
              })
            ),
            xy: e.xy,
          };
        return new f.default(t);
      })(),
      d = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : c,
          t = arguments[1];
        switch (t.type) {
          case u.MOVE_BLOCK:
            return t.data;
          default:
            return e;
        }
      };
    t.default = d;
  },
  function (e, t, n) {
    "use strict";
    function r(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      o = n(45),
      a = n(52),
      u = (function () {
        function e(t) {
          if (
            (r(this, e),
            (this.type = t.type),
            t.rotateIndex
              ? (this.rotateIndex = t.rotateIndex)
              : (this.rotateIndex = 0),
            t.timeStamp
              ? (this.timeStamp = t.timeStamp)
              : (this.timeStamp = Date.now()),
            t.shape
              ? (this.shape = t.shape)
              : (this.shape = (0, o.List)(
                  a.blockShape[t.type].map(function (e) {
                    return (0, o.List)(e);
                  })
                )),
            t.xy)
          )
            this.xy = (0, o.List)(t.xy);
          else
            switch (t.type) {
              case "I":
                this.xy = (0, o.List)([0, 3]);
                break;
              case "L":
                this.xy = (0, o.List)([-1, 4]);
                break;
              case "J":
                this.xy = (0, o.List)([-1, 4]);
                break;
              case "Z":
                this.xy = (0, o.List)([-1, 4]);
                break;
              case "S":
                this.xy = (0, o.List)([-1, 4]);
                break;
              case "O":
                this.xy = (0, o.List)([-1, 4]);
                break;
              case "T":
                this.xy = (0, o.List)([-1, 4]);
            }
        }
        return (
          i(e, [
            {
              key: "rotate",
              value: function () {
                var e = this.shape,
                  t = (0, o.List)([]);
                e.forEach(function (e) {
                  return e.forEach(function (n, r) {
                    var i = e.size - r - 1;
                    void 0 === t.get(i) && (t = t.set(i, (0, o.List)([])));
                    var a = t.get(i).push(n);
                    t = t.set(i, a);
                  });
                });
                var n = [
                    this.xy.get(0) + a.origin[this.type][this.rotateIndex][0],
                    this.xy.get(1) + a.origin[this.type][this.rotateIndex][1],
                  ],
                  r =
                    this.rotateIndex + 1 >= a.origin[this.type].length
                      ? 0
                      : this.rotateIndex + 1;
                return {
                  shape: t,
                  type: this.type,
                  xy: n,
                  rotateIndex: r,
                  timeStamp: this.timeStamp,
                };
              },
            },
            {
              key: "fall",
              value: function () {
                var e =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : 1;
                return {
                  shape: this.shape,
                  type: this.type,
                  xy: [this.xy.get(0) + e, this.xy.get(1)],
                  rotateIndex: this.rotateIndex,
                  timeStamp: Date.now(),
                };
              },
            },
            {
              key: "right",
              value: function () {
                return {
                  shape: this.shape,
                  type: this.type,
                  xy: [this.xy.get(0), this.xy.get(1) + 1],
                  rotateIndex: this.rotateIndex,
                  timeStamp: this.timeStamp,
                };
              },
            },
            {
              key: "left",
              value: function () {
                return {
                  shape: this.shape,
                  type: this.type,
                  xy: [this.xy.get(0), this.xy.get(1) - 1],
                  rotateIndex: this.rotateIndex,
                  timeStamp: this.timeStamp,
                };
              },
            },
          ]),
          e
        );
      })();
    t.default = u;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = n(52),
      u =
        a.lastRecord && !isNaN(parseInt(a.lastRecord.startLines, 10))
          ? parseInt(a.lastRecord.startLines, 10)
          : 0;
    (u < 0 || u > 10) && (u = 0);
    var l = function () {
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u,
        t = arguments[1];
      switch (t.type) {
        case o.START_LINES:
          return t.data;
        default:
          return e;
      }
    };
    t.default = l;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = n(52),
      u =
        a.lastRecord && !isNaN(parseInt(a.lastRecord.max, 10))
          ? parseInt(a.lastRecord.max, 10)
          : 0;
    u < 0 ? (u = 0) : u > a.maxPoint && (u = a.maxPoint);
    var l = function () {
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u,
        t = arguments[1];
      switch (t.type) {
        case o.MAX:
          return t.data > 999999 ? 999999 : t.data;
        default:
          return e;
      }
    };
    t.default = l;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = n(52),
      u =
        a.lastRecord && !isNaN(parseInt(a.lastRecord.points, 10))
          ? parseInt(a.lastRecord.points, 10)
          : 0;
    u < 0 ? (u = 0) : u > a.maxPoint && (u = a.maxPoint);
    var l = function () {
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u,
        t = arguments[1];
      switch (t.type) {
        case o.POINTS:
          return t.data > a.maxPoint ? a.maxPoint : t.data;
        default:
          return e;
      }
    };
    t.default = l;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = n(52),
      u =
        a.lastRecord && !isNaN(parseInt(a.lastRecord.speedStart, 10))
          ? parseInt(a.lastRecord.speedStart, 10)
          : 1;
    (u < 1 || u > 6) && (u = 1);
    var l = function () {
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u,
        t = arguments[1];
      switch (t.type) {
        case o.SPEED_START:
          return t.data;
        default:
          return e;
      }
    };
    t.default = l;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = n(52),
      u =
        a.lastRecord && !isNaN(parseInt(a.lastRecord.speedRun, 10))
          ? parseInt(a.lastRecord.speedRun, 10)
          : 1;
    (u < 1 || u > 6) && (u = 1);
    var l = function () {
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u,
        t = arguments[1];
      switch (t.type) {
        case o.SPEED_RUN:
          return t.data;
        default:
          return e;
      }
    };
    t.default = l;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = n(52),
      u =
        !(!a.lastRecord || void 0 === a.lastRecord.lock) && !!a.lastRecord.lock,
      l = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u,
          t = arguments[1];
        switch (t.type) {
          case o.LOCK:
            return t.data;
          default:
            return e;
        }
      };
    t.default = l;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = n(52),
      u =
        a.lastRecord && !isNaN(parseInt(a.lastRecord.clearLines, 10))
          ? parseInt(a.lastRecord.clearLines, 10)
          : 0;
    u < 0 && (u = 0);
    var l = function () {
      var e =
          arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u,
        t = arguments[1];
      switch (t.type) {
        case o.CLEAR_LINES:
          return t.data;
        default:
          return e;
      }
    };
    t.default = l;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = n(52),
      u = !(!a.lastRecord || !a.lastRecord.reset) && !!a.lastRecord.reset,
      l = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u,
          t = arguments[1];
        switch (t.type) {
          case o.RESET:
            return t.data;
          default:
            return e;
        }
      };
    t.default = l;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = n(52),
      u =
        !(!a.lastRecord || void 0 === a.lastRecord.drop) && !!a.lastRecord.drop,
      l = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u,
          t = arguments[1];
        switch (t.type) {
          case o.DROP:
            return t.data;
          default:
            return e;
        }
      };
    t.default = l;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(43),
      o = n(71),
      a = r(o),
      u = n(72),
      l = r(u),
      s = n(73),
      f = r(s),
      c = n(74),
      d = r(c),
      p = n(75),
      h = r(p),
      v = n(76),
      y = r(v),
      m = n(77),
      g = r(m),
      b = n(78),
      _ = r(b),
      w = (0, i.combineReducers)({
        drop: a.default,
        down: l.default,
        left: f.default,
        right: d.default,
        rotate: h.default,
        reset: y.default,
        music: g.default,
        pause: _.default,
      });
    t.default = w;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = !1,
      u = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a,
          t = arguments[1];
        switch (t.type) {
          case o.KEY_DROP:
            return t.data;
          default:
            return e;
        }
      };
    t.default = u;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = !1,
      u = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a,
          t = arguments[1];
        switch (t.type) {
          case o.KEY_DOWN:
            return t.data;
          default:
            return e;
        }
      };
    t.default = u;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = !1,
      u = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a,
          t = arguments[1];
        switch (t.type) {
          case o.KEY_LEFT:
            return t.data;
          default:
            return e;
        }
      };
    t.default = u;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = !1,
      u = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a,
          t = arguments[1];
        switch (t.type) {
          case o.KEY_RIGHT:
            return t.data;
          default:
            return e;
        }
      };
    t.default = u;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = !1,
      u = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a,
          t = arguments[1];
        switch (t.type) {
          case o.KEY_ROTATE:
            return t.data;
          default:
            return e;
        }
      };
    t.default = u;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = !1,
      u = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a,
          t = arguments[1];
        switch (t.type) {
          case o.KEY_RESET:
            return t.data;
          default:
            return e;
        }
      };
    t.default = u;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = !1,
      u = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a,
          t = arguments[1];
        switch (t.type) {
          case o.KEY_MUSIC:
            return t.data;
          default:
            return e;
        }
      };
    t.default = u;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = !1,
      u = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : a,
          t = arguments[1];
        switch (t.type) {
          case o.KEY_PAUSE:
            return t.data;
          default:
            return e;
        }
      };
    t.default = u;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(51),
      o = r(i),
      a = n(58),
      u = (0, a.isFocus)(),
      l = function () {
        var e =
            arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : u,
          t = arguments[1];
        switch (t.type) {
          case o.FOCUS:
            return t.data;
          default:
            return e;
        }
      };
    t.default = l;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function o(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function a(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }
    function u(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var l = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      s = n(1),
      f = r(s),
      c = n(8),
      d = n(81),
      p = r(d),
      h = n(10),
      v = r(h),
      y = n(82),
      m = r(y),
      g = n(83),
      b = r(g),
      _ = n(88),
      w = r(_),
      E = n(90),
      S = r(E),
      k = n(92),
      x = r(k),
      T = n(94),
      P = r(T),
      O = n(96),
      C = r(O),
      R = n(98),
      I = r(R),
      M = n(99),
      A = r(M),
      N = n(101),
      j = r(N),
      L = n(115),
      z = r(L),
      U = n(52),
      B = n(58),
      D = n(85),
      F = r(D),
      q = (function (e) {
        function t() {
          o(this, t);
          var e = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return (
            (e.state = {
              w: document.documentElement.clientWidth,
              h: document.documentElement.clientHeight,
            }),
            e
          );
        }
        return (
          u(t, e),
          l(t, [
            {
              key: "componentWillMount",
              value: function () {
                window.addEventListener("resize", this.resize.bind(this), !0);
              },
            },
            {
              key: "componentDidMount",
              value: function () {
                if (
                  (B.visibilityChangeEvent &&
                    document.addEventListener(
                      B.visibilityChangeEvent,
                      function () {
                        F.default.focus((0, B.isFocus)());
                      },
                      !1
                    ),
                  U.lastRecord)
                ) {
                  if (U.lastRecord.cur && !U.lastRecord.pause) {
                    var e = this.props.speedRun,
                      t = U.speeds[e - 1] / 2;
                    (t =
                      e < U.speeds[U.speeds.length - 1]
                        ? U.speeds[U.speeds.length - 1]
                        : e),
                      F.default.auto(t);
                  }
                  U.lastRecord.cur || F.default.overStart();
                } else F.default.overStart();
              },
            },
            {
              key: "resize",
              value: function () {
                this.setState({
                  w: document.documentElement.clientWidth,
                  h: document.documentElement.clientHeight,
                });
              },
            },
            {
              key: "render",
              value: function () {
                var e,
                  t = this,
                  n = 0,
                  r = (function () {
                    var e = t.state.w,
                      r = t.state.h,
                      i = r / e,
                      o = void 0,
                      a = {};
                    return (
                      i < 1.5
                        ? (o = r / 960)
                        : ((o = e / 640),
                          (n = (r - 960 * o) / o / 3),
                          (a = {
                            paddingTop: Math.floor(n) + 42,
                            paddingBottom: Math.floor(n),
                            marginTop: Math.floor(-480 - 1.5 * n),
                          })),
                      (a[U.transform] = "scale(" + o + ")"),
                      a
                    );
                  })();
                return f.default.createElement(
                  "div",
                  {
                    className: m.default.app,
                    style: r,
                  },
                  f.default.createElement(
                    "div",
                    {
                      className: (0, p.default)(
                        ((e = {}),
                        i(e, m.default.rect, !0),
                        i(e, m.default.drop, this.props.drop),
                        e)
                      ),
                    },
                    f.default.createElement(w.default, null),
                    f.default.createElement(
                      "div",
                      {
                        className: m.default.screen,
                      },
                      f.default.createElement(
                        "div",
                        {
                          className: m.default.panel,
                        },
                        f.default.createElement(b.default, {
                          matrix: this.props.matrix,
                          cur: this.props.cur,
                          reset: this.props.reset,
                        }),
                        f.default.createElement(A.default, {
                          cur: !!this.props.cur,
                          reset: this.props.reset,
                        }),
                        f.default.createElement(
                          "div",
                          {
                            className: m.default.state,
                          },
                          f.default.createElement(I.default, {
                            cur: !!this.props.cur,
                            point: this.props.points,
                            max: this.props.max,
                          }),
                          f.default.createElement(
                            "p",
                            null,
                            this.props.cur
                              ? U.i18n.cleans[U.lan]
                              : U.i18n.startLine[U.lan]
                          ),
                          f.default.createElement(S.default, {
                            number: this.props.cur
                              ? this.props.clearLines
                              : this.props.startLines,
                          }),
                          f.default.createElement(
                            "p",
                            null,
                            U.i18n.level[U.lan]
                          ),
                          f.default.createElement(S.default, {
                            number: this.props.cur
                              ? this.props.speedRun
                              : this.props.speedStart,
                            length: 1,
                          }),
                          f.default.createElement(
                            "p",
                            null,
                            U.i18n.next[U.lan]
                          ),
                          f.default.createElement(x.default, {
                            data: this.props.next,
                          }),
                          f.default.createElement(
                            "div",
                            {
                              className: m.default.bottom,
                            },
                            f.default.createElement(P.default, {
                              data: this.props.music,
                            }),
                            f.default.createElement(C.default, {
                              data: this.props.pause,
                            }),
                            f.default.createElement(S.default, {
                              time: !0,
                            })
                          )
                        )
                      )
                    )
                  ),
                  f.default.createElement(j.default, {
                    filling: n,
                    keyboard: this.props.keyboard,
                  }),
                  f.default.createElement(z.default, null)
                );
              },
            },
          ]),
          t
        );
      })(f.default.Component);
    q.propTypes = {
      music: v.default.bool.isRequired,
      pause: v.default.bool.isRequired,
      matrix: v.default.object.isRequired,
      next: v.default.string.isRequired,
      cur: v.default.object,
      dispatch: v.default.func.isRequired,
      speedStart: v.default.number.isRequired,
      speedRun: v.default.number.isRequired,
      startLines: v.default.number.isRequired,
      clearLines: v.default.number.isRequired,
      points: v.default.number.isRequired,
      max: v.default.number.isRequired,
      reset: v.default.bool.isRequired,
      drop: v.default.bool.isRequired,
      keyboard: v.default.object.isRequired,
    };
    var Y = function (e) {
      return {
        pause: e.get("pause"),
        music: e.get("music"),
        matrix: e.get("matrix"),
        next: e.get("next"),
        cur: e.get("cur"),
        speedStart: e.get("speedStart"),
        speedRun: e.get("speedRun"),
        startLines: e.get("startLines"),
        clearLines: e.get("clearLines"),
        points: e.get("points"),
        max: e.get("max"),
        reset: e.get("reset"),
        drop: e.get("drop"),
        keyboard: e.get("keyboard"),
      };
    };
    t.default = (0, c.connect)(Y)(q);
  },
  function (e, t, n) {
    var r, i;
    !(function () {
      "use strict";
      function n() {
        for (var e = [], t = 0; t < arguments.length; t++) {
          var r = arguments[t];
          if (r) {
            var i = typeof r;
            if ("string" === i || "number" === i) e.push(r);
            else if (Array.isArray(r) && r.length) {
              var a = n.apply(null, r);
              a && e.push(a);
            } else if ("object" === i)
              for (var u in r) o.call(r, u) && r[u] && e.push(u);
          }
        }
        return e.join(" ");
      }
      var o = {}.hasOwnProperty;
      "undefined" != typeof e && e.exports
        ? ((n.default = n), (e.exports = n))
        : ((r = []),
          (i = function () {
            return n;
          }.apply(t, r)),
          !(void 0 !== i && (e.exports = i)));
    })();
  },
  function (e, t) {
    e.exports = {
      app: "_3Lk6",
      rect: "_1fjB",
      drop: "_3YUe",
      screen: "_2iZA",
      panel: "_2lJh",
      state: "_1deS",
      bottom: "_8hag",
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }
    function a(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var u = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      l = n(1),
      s = r(l),
      f = n(45),
      c = r(f),
      d = n(81),
      p = r(d),
      h = n(10),
      v = r(h),
      y = n(84),
      m = r(y),
      g = n(58),
      b = n(52),
      _ = n(85),
      w = r(_),
      E = setTimeout,
      S = (function (e) {
        function t() {
          i(this, t);
          var e = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return (
            (e.state = {
              clearLines: !1,
              animateColor: 2,
              isOver: !1,
              overState: null,
            }),
            e
          );
        }
        return (
          a(t, e),
          u(t, [
            {
              key: "componentWillReceiveProps",
              value: function () {
                var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {},
                  t = (0, g.isClear)(e.matrix),
                  n = e.reset;
                this.setState({
                  clearLines: t,
                  isOver: n,
                }),
                  t && !this.state.clearLines && this.clearAnimate(t),
                  t || !n || this.state.isOver || this.over(e);
              },
            },
            {
              key: "shouldComponentUpdate",
              value: function () {
                var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : {},
                  t = this.props;
                return (
                  !(
                    c.default.is(e.matrix, t.matrix) &&
                    c.default.is(e.cur && e.cur.shape, t.cur && t.cur.shape) &&
                    c.default.is(e.cur && e.cur.xy, t.cur && t.cur.xy)
                  ) ||
                  this.state.clearLines ||
                  this.state.isOver
                );
              },
            },
            {
              key: "getResult",
              value: function () {
                var e =
                    arguments.length > 0 && void 0 !== arguments[0]
                      ? arguments[0]
                      : this.props,
                  t = e.cur,
                  n = t && t.shape,
                  r = t && t.xy,
                  i = e.matrix,
                  o = this.state.clearLines;
                if (o) {
                  var a = this.state.animateColor;
                  o.forEach(function (e) {
                    i = i.set(e, (0, f.List)([a, a, a, a, a, a, a, a, a, a]));
                  });
                } else
                  n &&
                    n.forEach(function (e, t) {
                      return e.forEach(function (e, n) {
                        if (e && r.get(0) + t >= 0) {
                          var a = i.get(r.get(0) + t),
                            u = void 0;
                          (u = 1 !== a.get(r.get(1) + n) || o ? 1 : 2),
                            (a = a.set(r.get(1) + n, u)),
                            (i = i.set(r.get(0) + t, a));
                        }
                      });
                    });
                return i;
              },
            },
            {
              key: "clearAnimate",
              value: function () {
                var e = this,
                  t = function (t) {
                    E(function () {
                      e.setState({
                        animateColor: 0,
                      }),
                        E(function () {
                          e.setState({
                            animateColor: 2,
                          }),
                            "function" == typeof t && t();
                        }, 100);
                    }, 100);
                  };
                t(function () {
                  t(function () {
                    t(function () {
                      E(function () {
                        w.default.clearLines(
                          e.props.matrix,
                          e.state.clearLines
                        );
                      }, 100);
                    });
                  });
                });
              },
            },
            {
              key: "over",
              value: function (e) {
                var t = this,
                  n = this.getResult(e);
                this.setState({
                  overState: n,
                });
                for (
                  var r = function (e) {
                      if (e <= 19) n = n.set(19 - e, (0, f.List)(b.fillLine));
                      else {
                        if (!(e >= 20 && e <= 39))
                          return void w.default.overEnd();
                        n = n.set(e - 20, (0, f.List)(b.blankLine));
                      }
                      t.setState({
                        overState: n,
                      });
                    },
                    i = 0;
                  i <= 40;
                  i++
                )
                  E(r.bind(null, i), 40 * (i + 1));
              },
            },
            {
              key: "render",
              value: function () {
                var e = void 0;
                return (
                  (e = this.state.isOver
                    ? this.state.overState
                    : this.getResult()),
                  s.default.createElement(
                    "div",
                    {
                      className: m.default.matrix,
                    },
                    e.map(function (e, t) {
                      return s.default.createElement(
                        "p",
                        {
                          key: t,
                        },
                        e.map(function (e, t) {
                          return s.default.createElement("b", {
                            className: (0, p.default)({
                              c: 1 === e,
                              d: 2 === e,
                            }),
                            key: t,
                          });
                        })
                      );
                    })
                  )
                );
              },
            },
          ]),
          t
        );
      })(s.default.Component);
    (t.default = S),
      (S.propTypes = {
        matrix: v.default.object.isRequired,
        cur: v.default.object,
        reset: v.default.bool.isRequired,
      });
  },
  function (e, t) {
    e.exports = {
      matrix: "_6pVK",
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(45),
      o = n(41),
      a = r(o),
      u = n(58),
      l = n(86),
      s = r(l),
      f = n(52),
      c = n(55),
      d = function (e) {
        for (
          var t = function (e, t) {
              for (
                var n = parseInt((t - e + 1) * Math.random() + e, 10),
                  r = [],
                  o = 0;
                o < n;
                o++
              )
                r.push(1);
              for (var a = 0, u = 10 - n; a < u; a++) {
                var l = parseInt((r.length + 1) * Math.random(), 10);
                r.splice(l, 0, 0);
              }
              return (0, i.List)(r);
            },
            n = (0, i.List)([]),
            r = 0;
          r < e;
          r++
        )
          n =
            r <= 2
              ? n.push(t(5, 8))
              : r <= 6
              ? n.push(t(4, 9))
              : n.push(t(3, 9));
        for (var o = 0, a = 20 - e; o < a; o++)
          n = n.unshift((0, i.List)(f.blankLine));
        return n;
      },
      p = {
        fallInterval: null,
        start: function () {
          c.music.start && c.music.start();
          var e = a.default.getState();
          p.dispatchPoints(0),
            a.default.dispatch(s.default.speedRun(e.get("speedStart")));
          var t = e.get("startLines"),
            n = d(t);
          a.default.dispatch(s.default.matrix(n)),
            a.default.dispatch(
              s.default.moveBlock({
                type: e.get("next"),
              })
            ),
            a.default.dispatch(s.default.nextBlock()),
            p.auto();
        },
        auto: function (e) {
          var t = e < 0 ? 0 : e,
            n = a.default.getState(),
            r = n.get("cur"),
            i = function e() {
              (n = a.default.getState()), (r = n.get("cur"));
              var t = r.fall();
              if ((0, u.want)(t, n.get("matrix")))
                a.default.dispatch(s.default.moveBlock(t)),
                  (p.fallInterval = setTimeout(
                    e,
                    f.speeds[n.get("speedRun") - 1]
                  ));
              else {
                var i = n.get("matrix"),
                  o = r && r.shape,
                  l = r && r.xy;
                o.forEach(function (e, t) {
                  return e.forEach(function (e, n) {
                    if (e && l.get(0) + t >= 0) {
                      var r = i.get(l.get(0) + t);
                      (r = r.set(l.get(1) + n, 1)),
                        (i = i.set(l.get(0) + t, r));
                    }
                  });
                }),
                  p.nextAround(i);
              }
            };
          clearTimeout(p.fallInterval),
            (p.fallInterval = setTimeout(
              i,
              void 0 === t ? f.speeds[n.get("speedRun") - 1] : t
            ));
        },
        nextAround: function (e, t) {
          clearTimeout(p.fallInterval),
            a.default.dispatch(s.default.lock(!0)),
            a.default.dispatch(s.default.matrix(e)),
            "function" == typeof t && t();
          var n =
            a.default.getState().get("points") +
            10 +
            2 * (a.default.getState().get("speedRun") - 1);
          return (
            p.dispatchPoints(n),
            (0, u.isClear)(e)
              ? void (c.music.clear && c.music.clear())
              : (0, u.isOver)(e)
              ? (c.music.gameover && c.music.gameover(), void p.overStart())
              : void setTimeout(function () {
                  a.default.dispatch(s.default.lock(!1)),
                    a.default.dispatch(
                      s.default.moveBlock({
                        type: a.default.getState().get("next"),
                      })
                    ),
                    a.default.dispatch(s.default.nextBlock()),
                    p.auto();
                }, 100)
          );
        },
        focus: function (e) {
          if ((a.default.dispatch(s.default.focus(e)), !e))
            return void clearTimeout(p.fallInterval);
          var t = a.default.getState();
          !t.get("cur") || t.get("reset") || t.get("pause") || p.auto();
        },
        pause: function (e) {
          return (
            a.default.dispatch(s.default.pause(e)),
            e ? void clearTimeout(p.fallInterval) : void p.auto()
          );
        },
        clearLines: function e(t, n) {
          var r = a.default.getState(),
            o = t;
          n.forEach(function (e) {
            (o = o.splice(e, 1)), (o = o.unshift((0, i.List)(f.blankLine)));
          }),
            a.default.dispatch(s.default.matrix(o)),
            a.default.dispatch(
              s.default.moveBlock({
                type: r.get("next"),
              })
            ),
            a.default.dispatch(s.default.nextBlock()),
            p.auto(),
            a.default.dispatch(s.default.lock(!1));
          var e = r.get("clearLines") + n.length;
          a.default.dispatch(s.default.clearLines(e));
          var u =
            a.default.getState().get("points") + f.clearPoints[n.length - 1];
          p.dispatchPoints(u);
          var l = Math.floor(e / f.eachLines),
            c = r.get("speedStart") + l;
          (c = c > 6 ? 6 : c), a.default.dispatch(s.default.speedRun(c));
        },
        overStart: function () {
          clearTimeout(p.fallInterval),
            a.default.dispatch(s.default.lock(!0)),
            a.default.dispatch(s.default.reset(!0)),
            a.default.dispatch(s.default.pause(!1));
        },
        overEnd: function () {
          a.default.dispatch(s.default.matrix(f.blankMatrix)),
            a.default.dispatch(
              s.default.moveBlock({
                reset: !0,
              })
            ),
            a.default.dispatch(s.default.reset(!1)),
            a.default.dispatch(s.default.lock(!1)),
            a.default.dispatch(s.default.clearLines(0));
        },
        dispatchPoints: function (e) {
          a.default.dispatch(s.default.points(e)),
            e > 0 &&
              e > a.default.getState().get("max") &&
              a.default.dispatch(s.default.max(e));
        },
      };
    t.default = p;
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    function o() {
      var e =
        arguments.length > 0 && void 0 !== arguments[0]
          ? arguments[0]
          : (0, _.getNextType)();
      return {
        type: E.NEXT_BLOCK,
        data: e,
      };
    }
    function a(e) {
      return {
        type: E.MOVE_BLOCK,
        data: e.reset === !0 ? null : new k.default(e),
      };
    }
    function u(e) {
      return {
        type: E.SPEED_START,
        data: e,
      };
    }
    function l(e) {
      return {
        type: E.SPEED_RUN,
        data: e,
      };
    }
    function s(e) {
      return {
        type: E.START_LINES,
        data: e,
      };
    }
    function f(e) {
      return {
        type: E.MATRIX,
        data: e,
      };
    }
    function c(e) {
      return {
        type: E.LOCK,
        data: e,
      };
    }
    function d(e) {
      return {
        type: E.CLEAR_LINES,
        data: e,
      };
    }
    function p(e) {
      return {
        type: E.POINTS,
        data: e,
      };
    }
    function h(e) {
      return {
        type: E.MAX,
        data: e,
      };
    }
    function v(e) {
      return {
        type: E.RESET,
        data: e,
      };
    }
    function y(e) {
      return {
        type: E.DROP,
        data: e,
      };
    }
    function m(e) {
      return {
        type: E.PAUSE,
        data: e,
      };
    }
    function g(e) {
      return {
        type: E.MUSIC,
        data: e,
      };
    }
    function b(e) {
      return {
        type: E.FOCUS,
        data: e,
      };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var _ = n(58),
      w = n(51),
      E = i(w),
      S = n(60),
      k = r(S),
      x = n(87),
      T = r(x);
    t.default = {
      nextBlock: o,
      moveBlock: a,
      speedStart: u,
      speedRun: l,
      startLines: s,
      matrix: f,
      lock: c,
      clearLines: d,
      points: p,
      reset: v,
      max: h,
      drop: y,
      pause: m,
      keyboard: T.default,
      music: g,
      focus: b,
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      if (e && e.__esModule) return e;
      var t = {};
      if (null != e)
        for (var n in e)
          Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
      return (t.default = e), t;
    }
    function i(e) {
      return {
        type: p.KEY_DROP,
        data: e,
      };
    }
    function o(e) {
      return {
        type: p.KEY_DOWN,
        data: e,
      };
    }
    function a(e) {
      return {
        type: p.KEY_LEFT,
        data: e,
      };
    }
    function u(e) {
      return {
        type: p.KEY_RIGHT,
        data: e,
      };
    }
    function l(e) {
      return {
        type: p.KEY_ROTATE,
        data: e,
      };
    }
    function s(e) {
      return {
        type: p.KEY_RESET,
        data: e,
      };
    }
    function f(e) {
      return {
        type: p.KEY_MUSIC,
        data: e,
      };
    }
    function c(e) {
      return {
        type: p.KEY_PAUSE,
        data: e,
      };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var d = n(51),
      p = r(d);
    t.default = {
      drop: i,
      down: o,
      left: a,
      right: u,
      rotate: l,
      reset: s,
      music: f,
      pause: c,
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }
    function a(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var u = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      l = n(1),
      s = r(l),
      f = n(81),
      c = r(f),
      d = n(52),
      p = n(89),
      h = r(p),
      v = (function (e) {
        function t() {
          return (
            i(this, t),
            o(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
          );
        }
        return (
          a(t, e),
          u(t, [
            {
              key: "shouldComponentUpdate",
              value: function () {
                return !1;
              },
            },
            {
              key: "render",
              value: function () {
                return s.default.createElement(
                  "div",
                  {
                    className: h.default.decorate,
                  },
                  s.default.createElement(
                    "div",
                    {
                      className: h.default.topBorder,
                    },
                    s.default.createElement("span", {
                      className: (0, c.default)(["l", h.default.mr]),
                      style: {
                        width: 40,
                      },
                    }),
                    s.default.createElement("span", {
                      className: (0, c.default)(["l", h.default.mr]),
                    }),
                    s.default.createElement("span", {
                      className: (0, c.default)(["l", h.default.mr]),
                    }),
                    s.default.createElement("span", {
                      className: (0, c.default)(["l", h.default.mr]),
                    }),
                    s.default.createElement("span", {
                      className: (0, c.default)(["l", h.default.mr]),
                    }),
                    s.default.createElement("span", {
                      className: (0, c.default)(["r", h.default.ml]),
                      style: {
                        width: 40,
                      },
                    }),
                    s.default.createElement("span", {
                      className: (0, c.default)(["r", h.default.ml]),
                    }),
                    s.default.createElement("span", {
                      className: (0, c.default)(["r", h.default.ml]),
                    }),
                    s.default.createElement("span", {
                      className: (0, c.default)(["r", h.default.ml]),
                    }),
                    s.default.createElement("span", {
                      className: (0, c.default)(["r", h.default.ml]),
                    })
                  ),
                  s.default.createElement("h1", null, d.i18n.title[d.lan]),
                  s.default.createElement(
                    "div",
                    {
                      className: h.default.view,
                    },
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("em", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("p", null),
                    s.default.createElement("em", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("em", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("p", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("p", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("p", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("p", null),
                    s.default.createElement("em", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("em", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("em", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("em", null),
                    s.default.createElement("b", {
                      className: "c",
                    })
                  ),
                  s.default.createElement(
                    "div",
                    {
                      className: (0, c.default)([h.default.view, h.default.l]),
                    },
                    s.default.createElement("em", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("p", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("p", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("p", null),
                    s.default.createElement("em", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("em", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("p", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("em", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("em", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("p", null),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    }),
                    s.default.createElement("div", {
                      className: "clear",
                    }),
                    s.default.createElement("b", {
                      className: "c",
                    })
                  )
                );
              },
            },
          ]),
          t
        );
      })(s.default.Component);
    t.default = v;
  },
  function (e, t) {
    e.exports = {
      decorate: "_2OLA",
      topBorder: "DOXx",
      mr: "_1xND",
      ml: "_1cYd",
      view: "nVeA",
      l: "_395z",
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }
    function a(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var u = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      l = n(1),
      s = r(l),
      f = n(81),
      c = r(f),
      d = n(10),
      p = r(d),
      h = n(91),
      v = r(h),
      y = function (e) {
        return s.default.createElement(
          "div",
          {
            className: v.default.number,
          },
          e.map(function (e, t) {
            return s.default.createElement("span", {
              className: (0, c.default)(["bg", v.default["s_" + e]]),
              key: t,
            });
          })
        );
      },
      m = function (e) {
        return e < 10 ? ("0" + e).split("") : ("" + e).split("");
      },
      g = (function (e) {
        function t() {
          i(this, t);
          var e = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return (
            (e.state = {
              time_count: !1,
              time: new Date(),
            }),
            e
          );
        }
        return (
          a(t, e),
          u(t, [
            {
              key: "componentWillMount",
              value: function () {
                var e = this;
                if (this.props.time) {
                  var n = function n() {
                    var r = +t.timeInterval;
                    t.timeInterval = setTimeout(function () {
                      e.setState({
                        time: new Date(),
                        time_count: r,
                      }),
                        n();
                    }, 1e3);
                  };
                  n();
                }
              },
            },
            {
              key: "shouldComponentUpdate",
              value: function (e) {
                var n = e.number;
                return this.props.time
                  ? this.state.time_count !== t.time_count &&
                      (this.state.time_count !== !1 &&
                        (t.time_count = this.state.time_count),
                      !0)
                  : this.props.number !== n;
              },
            },
            {
              key: "componentWillUnmount",
              value: function () {
                this.props.time && clearTimeout(t.timeInterval);
              },
            },
            {
              key: "render",
              value: function () {
                if (this.props.time) {
                  var e = this.state.time,
                    t = m(e.getHours()),
                    n = m(e.getMinutes()),
                    r = e.getSeconds() % 2,
                    i = t.concat(r ? "d" : "d_c", n);
                  return y(i);
                }
                for (
                  var o = ("" + this.props.number).split(""),
                    a = 0,
                    u = this.props.length - o.length;
                  a < u;
                  a++
                )
                  o.unshift("n");
                return y(o);
              },
            },
          ]),
          t
        );
      })(s.default.Component);
    (t.default = g),
      (g.statics = {
        timeInterval: null,
        time_count: null,
      }),
      (g.propTypes = {
        number: p.default.number,
        length: p.default.number,
        time: p.default.bool,
      }),
      (g.defaultProps = {
        length: 6,
      });
  },
  function (e, t) {
    e.exports = {
      number: "iHKP",
      s_0: "_2hru",
      s_1: "_2B-l",
      s_2: "ShGQ",
      s_3: "_2V1K",
      s_4: "_3bYF",
      s_5: "_1Z7B",
      s_6: "_1-BZ",
      s_7: "_3_id",
      s_8: "_3_Z_",
      s_9: "bNJM",
      s_n: "_2kln",
      s_d: "hOfM",
      s_d_c: "_2tuY",
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e) {
      if (Array.isArray(e)) {
        for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
        return n;
      }
      return Array.from(e);
    }
    function o(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function a(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }
    function u(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var l = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      s = n(1),
      f = r(s),
      c = n(10),
      d = r(c),
      p = n(93),
      h = r(p),
      v = n(52),
      y = {
        I: [1, 0],
        L: [0, 0],
        J: [0, 0],
        Z: [0, 0],
        S: [0, 0],
        O: [0, 1],
        T: [0, 0],
      },
      m = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
      g = (function (e) {
        function t() {
          o(this, t);
          var e = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return (
            (e.state = {
              block: m,
            }),
            e
          );
        }
        return (
          u(t, e),
          l(t, [
            {
              key: "componentWillMount",
              value: function () {
                this.build(this.props.data);
              },
            },
            {
              key: "componentWillReceiveProps",
              value: function (e) {
                this.build(e.data);
              },
            },
            {
              key: "shouldComponentUpdate",
              value: function (e) {
                return e.data !== this.props.data;
              },
            },
            {
              key: "build",
              value: function (e) {
                var t = v.blockShape[e],
                  n = m.map(function (e) {
                    return [].concat(i(e));
                  });
                t.forEach(function (t, r) {
                  t.forEach(function (t, i) {
                    t && (n[r + y[e][0]][i + y[e][1]] = 1);
                  });
                }),
                  this.setState({
                    block: n,
                  });
              },
            },
            {
              key: "render",
              value: function () {
                return f.default.createElement(
                  "div",
                  {
                    className: h.default.next,
                  },
                  this.state.block.map(function (e, t) {
                    return f.default.createElement(
                      "div",
                      {
                        key: t,
                      },
                      e.map(function (e, t) {
                        return f.default.createElement("b", {
                          className: e ? "c" : "",
                          key: t,
                        });
                      })
                    );
                  })
                );
              },
            },
          ]),
          t
        );
      })(f.default.Component);
    (t.default = g),
      (g.propTypes = {
        data: d.default.string,
      });
  },
  function (e, t) {
    e.exports = {
      next: "_3Wmt",
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function o(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function a(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }
    function u(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var l = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      s = n(1),
      f = r(s),
      c = n(81),
      d = r(c),
      p = n(10),
      h = r(p),
      v = n(95),
      y = r(v),
      m = (function (e) {
        function t() {
          return (
            o(this, t),
            a(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
          );
        }
        return (
          u(t, e),
          l(t, [
            {
              key: "shouldComponentUpdate",
              value: function (e) {
                var t = e.data;
                return t !== this.props.data;
              },
            },
            {
              key: "render",
              value: function () {
                var e;
                return f.default.createElement("div", {
                  className: (0, d.default)(
                    ((e = {
                      bg: !0,
                    }),
                    i(e, y.default.music, !0),
                    i(e, y.default.c, !this.props.data),
                    e)
                  ),
                });
              },
            },
          ]),
          t
        );
      })(f.default.Component);
    (t.default = m),
      (m.propTypes = {
        data: h.default.bool.isRequired,
      });
  },
  function (e, t) {
    e.exports = {
      music: "EHci",
      c: "TTF4",
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function o(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function a(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }
    function u(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var l = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      s = n(1),
      f = r(s),
      c = n(81),
      d = r(c),
      p = n(10),
      h = r(p),
      v = n(97),
      y = r(v),
      m = (function (e) {
        function t() {
          o(this, t);
          var e = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return (
            (e.state = {
              showPause: !1,
            }),
            e
          );
        }
        return (
          u(t, e),
          l(t, [
            {
              key: "componentDidMount",
              value: function () {
                this.setShake(this.props.data);
              },
            },
            {
              key: "componentWillReceiveProps",
              value: function (e) {
                var t = e.data;
                this.setShake(t);
              },
            },
            {
              key: "shouldComponentUpdate",
              value: function (e) {
                var t = e.data;
                return !!t || t !== this.props.data;
              },
            },
            {
              key: "setShake",
              value: function (e) {
                var n = this;
                e &&
                  !t.timeout &&
                  (t.timeout = setInterval(function () {
                    n.setState({
                      showPause: !n.state.showPause,
                    });
                  }, 250)),
                  !e &&
                    t.timeout &&
                    (clearInterval(t.timeout),
                    this.setState({
                      showPause: !1,
                    }),
                    (t.timeout = null));
              },
            },
            {
              key: "render",
              value: function () {
                var e;
                return f.default.createElement("div", {
                  className: (0, d.default)(
                    ((e = {
                      bg: !0,
                    }),
                    i(e, y.default.pause, !0),
                    i(e, y.default.c, this.state.showPause),
                    e)
                  ),
                });
              },
            },
          ]),
          t
        );
      })(f.default.Component);
    (t.default = m),
      (m.statics = {
        timeout: null,
      }),
      (m.propTypes = {
        data: h.default.bool.isRequired,
      }),
      (m.defaultProps = {
        data: !1,
      });
  },
  function (e, t) {
    e.exports = {
      pause: "_37mu",
      c: "_1vhq",
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }
    function a(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var u = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      l = n(1),
      s = r(l),
      f = n(10),
      c = r(f),
      d = n(90),
      p = r(d),
      h = n(52),
      v = h.i18n.point[h.lan],
      y = h.i18n.highestScore[h.lan],
      m = h.i18n.lastRound[h.lan],
      g = (function (e) {
        function t() {
          i(this, t);
          var e = o(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return (
            (e.state = {
              label: "",
              number: 0,
            }),
            e
          );
        }
        return (
          a(t, e),
          u(t, [
            {
              key: "componentWillMount",
              value: function () {
                this.onChange(this.props);
              },
            },
            {
              key: "componentWillReceiveProps",
              value: function (e) {
                this.onChange(e);
              },
            },
            {
              key: "shouldComponentUpdate",
              value: function (e) {
                var t = e.cur,
                  n = e.point,
                  r = e.max,
                  i = this.props;
                return t !== i.cur || n !== i.point || r !== i.max || !i.cur;
              },
            },
            {
              key: "onChange",
              value: function (e) {
                var n = this,
                  r = e.cur,
                  i = e.point,
                  o = e.max;
                if ((clearInterval(t.timeout), r))
                  this.setState({
                    label: i >= o ? y : v,
                    number: i,
                  });
                else {
                  var a = function e() {
                    n.setState({
                      label: m,
                      number: i,
                    }),
                      (t.timeout = setTimeout(function () {
                        n.setState({
                          label: y,
                          number: o,
                        }),
                          (t.timeout = setTimeout(e, 3e3));
                      }, 3e3));
                  };
                  0 !== i
                    ? a()
                    : this.setState({
                        label: y,
                        number: o,
                      });
                }
              },
            },
            {
              key: "render",
              value: function () {
                return s.default.createElement(
                  "div",
                  null,
                  s.default.createElement("p", null, this.state.label),
                  s.default.createElement(p.default, {
                    number: this.state.number,
                  })
                );
              },
            },
          ]),
          t
        );
      })(s.default.Component);
    (t.default = g),
      (g.statics = {
        timeout: null,
      }),
      (g.propTypes = {
        cur: c.default.bool,
        max: c.default.number.isRequired,
        point: c.default.number.isRequired,
      });
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function o(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function a(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }
    function u(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var l = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      s = n(1),
      f = r(s),
      c = n(81),
      d = r(c),
      p = n(10),
      h = r(p),
      v = n(100),
      y = r(v),
      m = n(52),
      g = (function (e) {
        function t() {
          o(this, t);
          var e = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return (
            (e.state = {
              style: y.default.r1,
              display: "none",
            }),
            e
          );
        }
        return (
          u(t, e),
          l(t, [
            {
              key: "componentWillMount",
              value: function () {
                this.animate(this.props);
              },
            },
            {
              key: "componentWillReceiveProps",
              value: function (e) {
                (([this.props.cur, e.cur].indexOf(!1) !== -1 &&
                  this.props.cur !== e.cur) ||
                  this.props.reset !== e.reset) &&
                  this.animate(e);
              },
            },
            {
              key: "shouldComponentUpdate",
              value: function (e) {
                var t = e.cur,
                  n = e.reset;
                return t !== this.props.cur || n !== this.props.reset || !t;
              },
            },
            {
              key: "animate",
              value: function (e) {
                var n = this,
                  r = e.cur,
                  i = e.reset;
                if (
                  (clearTimeout(t.timeout),
                  this.setState({
                    style: y.default.r1,
                    display: "none",
                  }),
                  r || i)
                )
                  return void this.setState({
                    display: "none",
                  });
                var o = "r",
                  a = 0,
                  u = function (e, n) {
                    e && (t.timeout = setTimeout(e, n));
                  },
                  l = function (e) {
                    u(function () {
                      n.setState({
                        display: "block",
                      }),
                        e && e();
                    }, 150);
                  },
                  s = function (e) {
                    u(function () {
                      n.setState({
                        display: "none",
                      }),
                        e && e();
                    }, 150);
                  },
                  f = function (e, t, r) {
                    u(function () {
                      n.setState({
                        style: y.default[o + 2],
                      }),
                        u(function () {
                          n.setState({
                            style: y.default[o + 1],
                          }),
                            e && e();
                        }, r);
                    }, t);
                  },
                  c = function e(t) {
                    u(function () {
                      n.setState({
                        style: y.default[o + 4],
                      }),
                        u(function () {
                          return (
                            n.setState({
                              style: y.default[o + 3],
                            }),
                            a++,
                            (10 !== a && 20 !== a && 30 !== a) ||
                              (o = "r" === o ? "l" : "r"),
                            a < 40
                              ? void e(t)
                              : (n.setState({
                                  style: y.default[o + 1],
                                }),
                                void (t && u(t, 4e3)))
                          );
                        }, 100);
                    }, 100);
                  },
                  d = function e() {
                    (a = 0),
                      f(
                        function () {
                          f(
                            function () {
                              f(
                                function () {
                                  n.setState({
                                    style: y.default[o + 2],
                                  }),
                                    c(e);
                                },
                                150,
                                150
                              );
                            },
                            150,
                            150
                          );
                        },
                        1e3,
                        1500
                      );
                  };
                l(function () {
                  s(function () {
                    l(function () {
                      s(function () {
                        l(function () {
                          d();
                        });
                      });
                    });
                  });
                });
              },
            },
            {
              key: "render",
              value: function () {
                var e;
                return this.props.cur
                  ? null
                  : f.default.createElement(
                      "div",
                      {
                        className: y.default.logo,
                        style: {
                          display: this.state.display,
                        },
                      },
                      f.default.createElement("div", {
                        className: (0, d.default)(
                          ((e = {
                            bg: !0,
                          }),
                          i(e, y.default.dragon, !0),
                          i(e, this.state.style, !0),
                          e)
                        ),
                      }),
                      f.default.createElement("p", {
                        dangerouslySetInnerHTML: {
                          __html: m.i18n.titleCenter[m.lan],
                        },
                      })
                    );
              },
            },
          ]),
          t
        );
      })(f.default.Component);
    (t.default = g),
      (g.propTypes = {
        cur: h.default.bool,
        reset: h.default.bool.isRequired,
      }),
      (g.statics = {
        timeout: null,
      });
  },
  function (e, t) {
    e.exports = {
      logo: "_20Jp",
      dragon: "AFTs",
      r1: "_3j_b",
      l1: "_26pe",
      r2: "_1Fxd",
      l2: "_7ELJ",
      r3: "_9lMe",
      l3: "_1JBw",
      r4: "_3aQ-",
      l4: "_2aGx",
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function o(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }
    function a(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var u = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      l = n(1),
      s = r(l),
      f = n(45),
      c = r(f),
      d = n(10),
      p = r(d),
      h = n(102),
      v = r(h),
      y = n(103),
      m = r(y),
      g = n(41),
      b = r(g),
      _ = n(105),
      w = r(_),
      E = n(52),
      S = (function (e) {
        function t() {
          return (
            i(this, t),
            o(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
          );
        }
        return (
          a(t, e),
          u(t, [
            {
              key: "componentDidMount",
              value: function () {
                var e = this,
                  t = {},
                  n = {};
                document.addEventListener(
                  "touchstart",
                  function (e) {
                    e.preventDefault && e.preventDefault();
                  },
                  !0
                ),
                  document.addEventListener(
                    "touchend",
                    function (e) {
                      e.preventDefault && e.preventDefault();
                    },
                    !0
                  ),
                  document.addEventListener("gesturestart", function (e) {
                    e.preventDefault && event.preventDefault();
                  }),
                  document.addEventListener(
                    "mousedown",
                    function (e) {
                      e.preventDefault && e.preventDefault();
                    },
                    !0
                  ),
                  Object.keys(w.default).forEach(function (r) {
                    e["dom_" + r].dom.addEventListener(
                      "mousedown",
                      function () {
                        t[r] !== !0 &&
                          (w.default[r].down(b.default), (n[r] = !0));
                      },
                      !0
                    ),
                      e["dom_" + r].dom.addEventListener(
                        "mouseup",
                        function () {
                          return t[r] === !0
                            ? void (t[r] = !1)
                            : (w.default[r].up(b.default), void (n[r] = !1));
                        },
                        !0
                      ),
                      e["dom_" + r].dom.addEventListener(
                        "mouseout",
                        function () {
                          n[r] === !0 && w.default[r].up(b.default);
                        },
                        !0
                      ),
                      e["dom_" + r].dom.addEventListener(
                        "touchstart",
                        function () {
                          (t[r] = !0), w.default[r].down(b.default);
                        },
                        !0
                      ),
                      e["dom_" + r].dom.addEventListener(
                        "touchend",
                        function () {
                          w.default[r].up(b.default);
                        },
                        !0
                      );
                  });
              },
            },
            {
              key: "shouldComponentUpdate",
              value: function (e) {
                var t = e.keyboard,
                  n = e.filling;
                return (
                  !c.default.is(t, this.props.keyboard) ||
                  n !== this.props.filling
                );
              },
            },
            {
              key: "render",
              value: function () {
                var e = this,
                  t = this.props.keyboard;
                return s.default.createElement(
                  "div",
                  {
                    className: v.default.keyboard,
                    style: {
                      marginTop: 20 + this.props.filling,
                    },
                  },
                  s.default.createElement(m.default, {
                    color: "blue",
                    size: "s1",
                    top: 0,
                    left: 374,
                    label: E.i18n.rotation[E.lan],
                    arrow: "translate(0, 63px)",
                    position: !0,
                    active: t.get("rotate"),
                    ref: function (t) {
                      e.dom_rotate = t;
                    },
                  }),
                  s.default.createElement(m.default, {
                    color: "blue",
                    size: "s1",
                    top: 180,
                    left: 374,
                    label: E.i18n.down[E.lan],
                    arrow: "translate(0,-71px) rotate(180deg)",
                    active: t.get("down"),
                    ref: function (t) {
                      e.dom_down = t;
                    },
                  }),
                  s.default.createElement(m.default, {
                    color: "blue",
                    size: "s1",
                    top: 90,
                    left: 284,
                    label: E.i18n.left[E.lan],
                    arrow: "translate(60px, -12px) rotate(270deg)",
                    active: t.get("left"),
                    ref: function (t) {
                      e.dom_left = t;
                    },
                  }),
                  s.default.createElement(m.default, {
                    color: "blue",
                    size: "s1",
                    top: 90,
                    left: 464,
                    label: E.i18n.right[E.lan],
                    arrow: "translate(-60px, -12px) rotate(90deg)",
                    active: t.get("right"),
                    ref: function (t) {
                      e.dom_right = t;
                    },
                  }),
                  s.default.createElement(m.default, {
                    color: "blue",
                    size: "s0",
                    top: 100,
                    left: 52,
                    label: E.i18n.drop[E.lan] + " (SPACE)",
                    active: t.get("drop"),
                    ref: function (t) {
                      e.dom_space = t;
                    },
                  }),
                  s.default.createElement(m.default, {
                    color: "red",
                    size: "s2",
                    top: 0,
                    left: 196,
                    label: E.i18n.reset[E.lan] + "(R)",
                    active: t.get("reset"),
                    ref: function (t) {
                      e.dom_r = t;
                    },
                  }),
                  s.default.createElement(m.default, {
                    color: "green",
                    size: "s2",
                    top: 0,
                    left: 106,
                    label: E.i18n.sound[E.lan] + "(S)",
                    active: t.get("music"),
                    ref: function (t) {
                      e.dom_s = t;
                    },
                  }),
                  s.default.createElement(m.default, {
                    color: "green",
                    size: "s2",
                    top: 0,
                    left: 16,
                    label: E.i18n.pause[E.lan] + "(P)",
                    active: t.get("pause"),
                    ref: function (t) {
                      e.dom_p = t;
                    },
                  })
                );
              },
            },
          ]),
          t
        );
      })(s.default.Component);
    (t.default = S),
      (S.propTypes = {
        filling: p.default.number.isRequired,
        keyboard: p.default.object.isRequired,
      });
  },
  function (e, t) {
    e.exports = {
      keyboard: "J9SA",
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function o(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function a(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }
    function u(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var l = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      s = n(1),
      f = r(s),
      c = n(81),
      d = r(c),
      p = n(10),
      h = r(p),
      v = n(104),
      y = r(v),
      m = n(52),
      g = (function (e) {
        function t() {
          return (
            o(this, t),
            a(
              this,
              (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments)
            )
          );
        }
        return (
          u(t, e),
          l(t, [
            {
              key: "shouldComponentUpdate",
              value: function (e) {
                return e.active !== this.props.active;
              },
            },
            {
              key: "render",
              value: function () {
                var e,
                  t = this,
                  n = this.props,
                  r = n.active,
                  o = n.color,
                  a = n.size,
                  u = n.top,
                  l = n.left,
                  s = n.label,
                  c = n.position,
                  p = n.arrow;
                return f.default.createElement(
                  "div",
                  {
                    className: (0, d.default)(
                      ((e = {}),
                      i(e, y.default.button, !0),
                      i(e, y.default[o], !0),
                      i(e, y.default[a], !0),
                      e)
                    ),
                    style: {
                      top: u,
                      left: l,
                    },
                  },
                  f.default.createElement("i", {
                    className: (0, d.default)(i({}, y.default.active, r)),
                    ref: function (e) {
                      t.dom = e;
                    },
                  }),
                  "s1" === a &&
                    f.default.createElement("em", {
                      style: i({}, m.transform, p + " scale(1,2)"),
                    }),
                  f.default.createElement(
                    "span",
                    {
                      className: (0, d.default)(i({}, y.default.position, c)),
                    },
                    s
                  )
                );
              },
            },
          ]),
          t
        );
      })(f.default.Component);
    (t.default = g),
      (g.propTypes = {
        color: h.default.string.isRequired,
        size: h.default.string.isRequired,
        top: h.default.number.isRequired,
        left: h.default.number.isRequired,
        label: h.default.string.isRequired,
        position: h.default.bool,
        arrow: h.default.string,
        active: h.default.bool.isRequired,
      });
  },
  function (e, t) {
    e.exports = {
      button: "_1pg0",
      s2: "oW6K",
      position: "_1zCL",
      active: "_23aw",
      blue: "_23pZ",
      green: "RBZg",
      red: "_3kg_",
      s0: "p4fG",
      s1: "_2TvZ",
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(106),
      o = r(i),
      a = n(108),
      u = r(a),
      l = n(109),
      s = r(l),
      f = n(110),
      c = r(f),
      d = n(111),
      p = r(d),
      h = n(112),
      v = r(h),
      y = n(113),
      m = r(y),
      g = n(114),
      b = r(g);
    t.default = {
      left: o.default,
      down: s.default,
      rotate: c.default,
      right: u.default,
      space: p.default,
      r: m.default,
      p: b.default,
      s: v.default,
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(58),
      o = n(107),
      a = r(o),
      u = n(86),
      l = r(u),
      s = n(85),
      f = r(s),
      c = n(52),
      d = n(55),
      p = function (e) {
        e.dispatch(l.default.keyboard.left(!0)),
          a.default.down({
            key: "left",
            begin: 200,
            interval: 100,
            callback: function () {
              var t = e.getState();
              if (!t.get("lock")) {
                d.music.move && d.music.move();
                var n = t.get("cur");
                if (null !== n) {
                  if (t.get("pause")) return void f.default.pause(!1);
                  var r = n.left(),
                    o = c.delays[t.get("speedRun") - 1],
                    a = void 0;
                  (0, i.want)(r, t.get("matrix"))
                    ? ((r.timeStamp += parseInt(o, 10)),
                      e.dispatch(l.default.moveBlock(r)),
                      (a = r.timeStamp))
                    : ((n.timeStamp += parseInt(parseInt(o, 10) / 1.5, 10)),
                      e.dispatch(l.default.moveBlock(n)),
                      (a = n.timeStamp));
                  var u = c.speeds[t.get("speedRun") - 1] - (Date.now() - a);
                  f.default.auto(u);
                } else {
                  var s = t.get("speedStart");
                  (s = s - 1 < 1 ? 6 : s - 1),
                    e.dispatch(l.default.speedStart(s));
                }
              }
            },
          });
      },
      h = function (e) {
        e.dispatch(l.default.keyboard.left(!1)),
          a.default.up({
            key: "left",
          });
      };
    t.default = {
      down: p,
      up: h,
    };
  },
  function (e, t) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var n = {},
      r = function (e) {
        var t = Object.keys(n);
        if (
          (t.forEach(function (e) {
            clearTimeout(n[e]), (n[e] = null);
          }),
          e.callback)
        ) {
          var r = function () {
            clearTimeout(n[e.key]);
          };
          if ((e.callback(r), e.once !== !0)) {
            var i = e.begin || 100,
              o = e.interval || 50,
              a = function t() {
                n[e.key] = setTimeout(function () {
                  (i = null), t(), e.callback(r);
                }, i || o);
              };
            a();
          }
        }
      },
      i = function (e) {
        clearTimeout(n[e.key]), (n[e.key] = null), e.callback && e.callback();
      },
      o = function () {
        var e = Object.keys(n);
        e.forEach(function (e) {
          clearTimeout(n[e]), (n[e] = null);
        });
      };
    t.default = {
      down: r,
      up: i,
      clearAll: o,
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(58),
      o = n(107),
      a = r(o),
      u = n(86),
      l = r(u),
      s = n(85),
      f = r(s),
      c = n(52),
      d = n(55),
      p = function (e) {
        e.dispatch(l.default.keyboard.right(!0)),
          a.default.down({
            key: "right",
            begin: 200,
            interval: 100,
            callback: function () {
              var t = e.getState();
              if (!t.get("lock")) {
                d.music.move && d.music.move();
                var n = t.get("cur");
                if (null !== n) {
                  if (t.get("pause")) return void f.default.pause(!1);
                  var r = n.right(),
                    o = c.delays[t.get("speedRun") - 1],
                    a = void 0;
                  (0, i.want)(r, t.get("matrix"))
                    ? ((r.timeStamp += parseInt(o, 10)),
                      e.dispatch(l.default.moveBlock(r)),
                      (a = r.timeStamp))
                    : ((n.timeStamp += parseInt(parseInt(o, 10) / 1.5, 10)),
                      e.dispatch(l.default.moveBlock(n)),
                      (a = n.timeStamp));
                  var u = c.speeds[t.get("speedRun") - 1] - (Date.now() - a);
                  f.default.auto(u);
                } else {
                  var s = t.get("speedStart");
                  (s = s + 1 > 6 ? 1 : s + 1),
                    e.dispatch(l.default.speedStart(s));
                }
              }
            },
          });
      },
      h = function (e) {
        e.dispatch(l.default.keyboard.right(!1)),
          a.default.up({
            key: "right",
          });
      };
    t.default = {
      down: p,
      up: h,
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(58),
      o = n(107),
      a = r(o),
      u = n(86),
      l = r(u),
      s = n(85),
      f = r(s),
      c = n(55),
      d = function (e) {
        e.dispatch(l.default.keyboard.down(!0)),
          null !== e.getState().get("cur")
            ? a.default.down({
                key: "down",
                begin: 40,
                interval: 40,
                callback: function (t) {
                  var n = e.getState();
                  if (!n.get("lock")) {
                    c.music.move && c.music.move();
                    var r = n.get("cur");
                    if (null !== r) {
                      if (n.get("pause")) return void f.default.pause(!1);
                      var o = r.fall();
                      if ((0, i.want)(o, n.get("matrix")))
                        e.dispatch(l.default.moveBlock(o)), f.default.auto();
                      else {
                        var a = n.get("matrix"),
                          u = r.shape,
                          s = r.xy;
                        u.forEach(function (e, t) {
                          return e.forEach(function (e, n) {
                            if (e && s.get(0) + t >= 0) {
                              var r = a.get(s.get(0) + t);
                              (r = r.set(s.get(1) + n, 1)),
                                (a = a.set(s.get(0) + t, r));
                            }
                          });
                        }),
                          f.default.nextAround(a, t);
                      }
                    }
                  }
                },
              })
            : a.default.down({
                key: "down",
                begin: 200,
                interval: 100,
                callback: function () {
                  if (!e.getState().get("lock")) {
                    var t = e.getState(),
                      n = t.get("cur");
                    if (!n) {
                      c.music.move && c.music.move();
                      var r = t.get("startLines");
                      (r = r - 1 < 0 ? 10 : r - 1),
                        e.dispatch(l.default.startLines(r));
                    }
                  }
                },
              });
      },
      p = function (e) {
        e.dispatch(l.default.keyboard.down(!1)),
          a.default.up({
            key: "down",
          });
      };
    t.default = {
      down: d,
      up: p,
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(58),
      o = n(107),
      a = r(o),
      u = n(86),
      l = r(u),
      s = n(85),
      f = r(s),
      c = n(55),
      d = function (e) {
        e.dispatch(l.default.keyboard.rotate(!0)),
          null !== e.getState().get("cur")
            ? a.default.down({
                key: "rotate",
                once: !0,
                callback: function () {
                  var t = e.getState();
                  if (!t.get("lock")) {
                    t.get("pause") && f.default.pause(!1);
                    var n = t.get("cur");
                    if (null !== n) {
                      c.music.rotate && c.music.rotate();
                      var r = n.rotate();
                      (0, i.want)(r, t.get("matrix")) &&
                        e.dispatch(l.default.moveBlock(r));
                    }
                  }
                },
              })
            : a.default.down({
                key: "rotate",
                begin: 200,
                interval: 100,
                callback: function () {
                  if (!e.getState().get("lock")) {
                    c.music.move && c.music.move();
                    var t = e.getState(),
                      n = t.get("cur");
                    if (!n) {
                      var r = t.get("startLines");
                      (r = r + 1 > 10 ? 0 : r + 1),
                        e.dispatch(l.default.startLines(r));
                    }
                  }
                },
              });
      },
      p = function (e) {
        e.dispatch(l.default.keyboard.rotate(!1)),
          a.default.up({
            key: "rotate",
          });
      };
    t.default = {
      down: d,
      up: p,
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(58),
      o = n(107),
      a = r(o),
      u = n(86),
      l = r(u),
      s = n(85),
      f = r(s),
      c = n(55),
      d = function (e) {
        e.dispatch(l.default.keyboard.drop(!0)),
          a.default.down({
            key: "space",
            once: !0,
            callback: function () {
              var t = e.getState();
              if (!t.get("lock")) {
                var n = t.get("cur");
                if (null !== n) {
                  if (t.get("pause")) return void f.default.pause(!1);
                  c.music.fall && c.music.fall();
                  for (
                    var r = 0, o = n.fall(r);
                    (0, i.want)(o, t.get("matrix"));

                  )
                    (o = n.fall(r)), r++;
                  var a = t.get("matrix");
                  (o = n.fall(r - 2)), e.dispatch(l.default.moveBlock(o));
                  var u = o.shape,
                    s = o.xy;
                  u.forEach(function (e, t) {
                    return e.forEach(function (e, n) {
                      if (e && s[0] + t >= 0) {
                        var r = a.get(s[0] + t);
                        (r = r.set(s[1] + n, 1)), (a = a.set(s[0] + t, r));
                      }
                    });
                  }),
                    e.dispatch(l.default.drop(!0)),
                    setTimeout(function () {
                      e.dispatch(l.default.drop(!1));
                    }, 100),
                    f.default.nextAround(a);
                } else f.default.start();
              }
            },
          });
      },
      p = function (e) {
        e.dispatch(l.default.keyboard.drop(!1)),
          a.default.up({
            key: "space",
          });
      };
    t.default = {
      down: d,
      up: p,
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(107),
      o = r(i),
      a = n(86),
      u = r(a),
      l = function (e) {
        e.dispatch(u.default.keyboard.music(!0)),
          e.getState().get("lock") ||
            o.default.down({
              key: "s",
              once: !0,
              callback: function () {
                e.getState().get("lock") ||
                  e.dispatch(u.default.music(!e.getState().get("music")));
              },
            });
      },
      s = function (e) {
        e.dispatch(u.default.keyboard.music(!1)),
          o.default.up({
            key: "s",
          });
      };
    t.default = {
      down: l,
      up: s,
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(107),
      o = r(i),
      a = n(85),
      u = r(a),
      l = n(86),
      s = r(l),
      f = function (e) {
        e.dispatch(s.default.keyboard.reset(!0)),
          e.getState().get("lock") ||
            (null !== e.getState().get("cur")
              ? o.default.down({
                  key: "r",
                  once: !0,
                  callback: function () {
                    u.default.overStart();
                  },
                })
              : o.default.down({
                  key: "r",
                  once: !0,
                  callback: function () {
                    e.getState().get("lock") || u.default.start();
                  },
                }));
      },
      c = function (e) {
        e.dispatch(s.default.keyboard.reset(!1)),
          o.default.up({
            key: "r",
          });
      };
    t.default = {
      down: f,
      up: c,
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var i = n(107),
      o = r(i),
      a = n(85),
      u = r(a),
      l = n(86),
      s = r(l),
      f = function (e) {
        e.dispatch(s.default.keyboard.pause(!0)),
          o.default.down({
            key: "p",
            once: !0,
            callback: function () {
              var t = e.getState();
              if (!t.get("lock")) {
                var n = t.get("cur"),
                  r = t.get("pause");
                null !== n ? u.default.pause(!r) : u.default.start();
              }
            },
          });
      },
      c = function (e) {
        e.dispatch(s.default.keyboard.pause(!1)),
          o.default.up({
            key: "p",
          });
      };
    t.default = {
      down: f,
      up: c,
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    function i(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    function o(e, t) {
      if (!(e instanceof t))
        throw new TypeError("Cannot call a class as a function");
    }
    function a(e, t) {
      if (!e)
        throw new ReferenceError(
          "this hasn't been initialised - super() hasn't been called"
        );
      return !t || ("object" != typeof t && "function" != typeof t) ? e : t;
    }
    function u(e, t) {
      if ("function" != typeof t && null !== t)
        throw new TypeError(
          "Super expression must either be null or a function, not " + typeof t
        );
      (e.prototype = Object.create(t && t.prototype, {
        constructor: {
          value: e,
          enumerable: !1,
          writable: !0,
          configurable: !0,
        },
      })),
        t &&
          (Object.setPrototypeOf
            ? Object.setPrototypeOf(e, t)
            : (e.__proto__ = t));
    }
    Object.defineProperty(t, "__esModule", {
      value: !0,
    });
    var l = (function () {
        function e(e, t) {
          for (var n = 0; n < t.length; n++) {
            var r = t[n];
            (r.enumerable = r.enumerable || !1),
              (r.configurable = !0),
              "value" in r && (r.writable = !0),
              Object.defineProperty(e, r.key, r);
          }
        }
        return function (t, n, r) {
          return n && e(t.prototype, n), r && e(t, r), t;
        };
      })(),
      s = n(1),
      f = r(s),
      c = n(116),
      d = r(c),
      p = n(151),
      h = r(p),
      v = n(52),
      y = n(58),
      m = (function (e) {
        function t() {
          o(this, t);
          var e = a(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
          return (
            (e.state = {
              isMobile: (0, y.isMobile)(),
              QRCode: "",
            }),
            e
          );
        }
        return (
          u(t, e),
          l(t, [
            {
              key: "componentWillMount",
              value: function () {
                var e = this;
                this.state.isMobile ||
                  d.default
                    .toDataURL(location.href, {
                      margin: 1,
                    })
                    .then(function (t) {
                      return e.setState({
                        QRCode: t,
                      });
                    });
              },
            },
            {
              key: "shouldComponentUpdate",
              value: function (e) {
                return e.QRCode !== this.state.QRCode;
              },
            },
            {
              key: "render",
              value: function () {
                return this.state.isMobile
                  ? null
                  : f.default.createElement(
                      "div",
                      {
                        style: {
                          display: this.state.isMobile ? "none" : "block",
                        },
                      },
                      f.default.createElement(
                        "div",
                        {
                          className:
                            "side-nav-arrows " +
                            h.default.guide +
                            " " +
                            h.default.right,
                        },
                        f.default.createElement(
                          "div",
                          {
                            className: h.default.up,
                          },
                          f.default.createElement("em", {
                            style: i(
                              {},
                              v.transform,
                              "translate(0,-3px) scale(1,2)"
                            ),
                          })
                        ),
                        f.default.createElement(
                          "div",
                          {
                            className: h.default.left,
                          },
                          f.default.createElement("em", {
                            style: i(
                              {},
                              v.transform,
                              "translate(-7px,3px) rotate(-90deg) scale(1,2)"
                            ),
                          })
                        ),
                        f.default.createElement(
                          "div",
                          {
                            className: h.default.down,
                          },
                          f.default.createElement("em", {
                            style: i(
                              {},
                              v.transform,
                              "translate(0,9px) rotate(180deg) scale(1,2)"
                            ),
                          })
                        ),
                        f.default.createElement(
                          "div",
                          {
                            className: h.default.right,
                          },
                          f.default.createElement("em", {
                            style: i(
                              {},
                              v.transform,
                              "translate(7px,3px)rotate(90deg) scale(1,2)"
                            ),
                          })
                        )
                      ),
                      f.default.createElement(
                        "div",
                        {
                          className: h.default.guide + " " + h.default.left,
                        },
                        f.default.createElement(
                          "div",
                          {
                            className: "side-btn " + h.default.space,
                          },
                          "SPACE"
                        )
                      ),
                      f.default.createElement(
                        "div",
                        {
                          className:
                            "side-help " + h.default.guide + " " + h.default.qr,
                        },
                        f.default.createElement(
                          "h2",
                          null,
                          "language:",
                          f.default.createElement(
                            "a",
                            {
                              href: "/?lan=eo",
                            },
                            "EO"
                          ),
                          " ",
                          f.default.createElement(
                            "a",
                            {
                              href: "/?lan=en",
                            },
                            "EN"
                          ),
                          " ",
                          f.default.createElement(
                            "a",
                            {
                              href: "/?lan=fr",
                            },
                            "FR"
                          ),
                          " ",
                          f.default.createElement(
                            "a",
                            {
                              href: "/?lan=fa",
                            },
                            "FA"
                          ),
                          " ",
                          f.default.createElement(
                            "a",
                            {
                              href: "/?lan=zh",
                            },
                            "ZH"
                          ),
                          " ",
                          f.default.createElement(
                            "a",
                            {
                              href: "/?lan=tw",
                            },
                            "TW"
                          ),
                          " ",
                          f.default.createElement(
                            "a",
                            {
                              href: "/?lan=ko",
                            },
                            "KO"
                          ),
                          " ",
                          f.default.createElement(
                            "a",
                            {
                              href: "/?lan=ja",
                            },
                            "JA"
                          ),
                          " ",
                          f.default.createElement(
                            "a",
                            {
                              href: "/?lan=id",
                            },
                            "ID"
                          ),
                          " ",
                          f.default.createElement(
                            "a",
                            {
                              href: "/?lan=ru",
                            },
                            "RU"
                          ),
                          " ",
                          f.default.createElement(
                            "a",
                            {
                              href: "/?lan=de",
                            },
                            "DE"
                          ),
                          " ",
                          f.default.createElement(
                            "a",
                            {
                              href: "/?lan=la",
                            },
                            "LA"
                          ),
                          " ",
                          f.default.createElement(
                            "a",
                            {
                              href: "/?lan=hi",
                            },
                            "HI"
                          ),
                          " ",
                          " "
                        ),
                        f.default.createElement("br", null),
                        f.default.createElement("h2", null, "👾 Link 👾"),
                        f.default.createElement("br", null),
                        f.default.createElement(
                          "p",
                          null,
                          " ",
                          f.default.createElement(
                            "a",
                            {
                              href: "https://www.saolei123.com",
                              target: "_blank",
                            },
                            "Mine Sweeper"
                          ),
                          " ",
                          f.default.createElement(
                            "a",
                            {
                              href: "https://www.tafang123.com",
                              target: "_blank",
                            },
                            "Tower Defense"
                          ),
                          " ",
                          f.default.createElement(
                            "a",
                            {
                              href: "https://www.shudu123.com",
                              target: "_blank",
                            },
                            "sudoku"
                          ),
                          " ",
                          f.default.createElement(
                            "a",
                            {
                              href: "https://www.wuziqi123.com",
                              target: "_blank",
                            },
                            "gobang"
                          ),
                          " ",
                          f.default.createElement(
                            "a",
                            {
                              href: "https://www.heibaiqi123.com",
                              target: "_blank",
                            },
                            "Othello"
                          ),
                          " ",
                          " "
                        ),
                        f.default.createElement(
                          "div",
                          {
                            id: "promo-left",
                          },
                          f.default.createElement(
                            "a",
                            {
                              href: "https://www.2048123.com/",
                              target: "_blank",
                            },
                            "You may also enjoy",
                            f.default.createElement("br", null),
                            "the 2048 Game",
                            f.default.createElement("br", null),
                            f.default.createElement("br", null),
                            f.default.createElement("img", {
                              src: "/2048-icon.png",
                              alt: "2048 Game Icon",
                            })
                          )
                        ),
                        f.default.createElement("br", null),
                        f.default.createElement("br", null),
                        f.default.createElement(
                          "h2",
                          null,
                          "👾 Free Tetris Online 👾"
                        ),
                        f.default.createElement("br", null),
                        f.default.createElement(
                          "p",
                          null,
                          '"Tetris123" is a tribute to the tetris game, and it is not an affiliate to the TETRIS company. This game is ',
                          f.default.createElement(
                            "a",
                            {
                              href: "https://github.com/chvin/react-tetris",
                            },
                            "Open Source . "
                          ),
                          " As being open source, you can ",
                          f.default.createElement(
                            "strong",
                            null,
                            "play online tetris free and unblocked"
                          ),
                          " here."
                        )
                      )
                    );
              },
            },
          ]),
          t
        );
      })(f.default.Component);
    t.default = m;
  },
  function (e, t, n) {
    function r(e, t, n, r, a) {
      var u = [].slice.call(arguments, 1),
        l = u.length,
        s = "function" == typeof u[l - 1];
      if (!s && !i()) throw new Error("Callback required as last argument");
      if (!s) {
        if (l < 1) throw new Error("Too few arguments provided");
        return (
          1 === l
            ? ((n = t), (t = r = void 0))
            : 2 !== l || t.getContext || ((r = n), (n = t), (t = void 0)),
          new Promise(function (i, a) {
            try {
              var u = o.create(n, r);
              i(e(u, t, r));
            } catch (e) {
              a(e);
            }
          })
        );
      }
      if (l < 2) throw new Error("Too few arguments provided");
      2 === l
        ? ((a = n), (n = t), (t = r = void 0))
        : 3 === l &&
          (t.getContext && "undefined" == typeof a
            ? ((a = r), (r = void 0))
            : ((a = r), (r = n), (n = t), (t = void 0)));
      try {
        var f = o.create(n, r);
        a(null, e(f, t, r));
      } catch (e) {
        a(e);
      }
    }
    var i = n(117),
      o = n(118),
      a = n(148),
      u = n(150);
    (t.create = o.create),
      (t.toCanvas = r.bind(null, a.render)),
      (t.toDataURL = r.bind(null, a.renderToDataURL)),
      (t.toString = r.bind(null, function (e, t, n) {
        return u.render(e, n);
      }));
  },
  function (e, t) {
    e.exports = function () {
      return (
        "function" == typeof Promise &&
        Promise.prototype &&
        Promise.prototype.then
      );
    };
  },
  function (e, t, n) {
    function r(e, t) {
      for (var n = e.size, r = g.getPositions(t), i = 0; i < r.length; i++)
        for (var o = r[i][0], a = r[i][1], u = -1; u <= 7; u++)
          if (!(o + u <= -1 || n <= o + u))
            for (var l = -1; l <= 7; l++)
              a + l <= -1 ||
                n <= a + l ||
                ((u >= 0 && u <= 6 && (0 === l || 6 === l)) ||
                (l >= 0 && l <= 6 && (0 === u || 6 === u)) ||
                (u >= 2 && u <= 4 && l >= 2 && l <= 4)
                  ? e.set(o + u, a + l, !0, !0)
                  : e.set(o + u, a + l, !1, !0));
    }
    function i(e) {
      for (var t = e.size, n = 8; n < t - 8; n++) {
        var r = n % 2 === 0;
        e.set(n, 6, r, !0), e.set(6, n, r, !0);
      }
    }
    function o(e, t) {
      for (var n = m.getPositions(t), r = 0; r < n.length; r++)
        for (var i = n[r][0], o = n[r][1], a = -2; a <= 2; a++)
          for (var u = -2; u <= 2; u++)
            a === -2 || 2 === a || u === -2 || 2 === u || (0 === a && 0 === u)
              ? e.set(i + a, o + u, !0, !0)
              : e.set(i + a, o + u, !1, !0);
    }
    function a(e, t) {
      for (var n, r, i, o = e.size, a = E.getEncodedBits(t), u = 0; u < 18; u++)
        (n = Math.floor(u / 3)),
          (r = (u % 3) + o - 8 - 3),
          (i = 1 === ((a >> u) & 1)),
          e.set(n, r, i, !0),
          e.set(r, n, i, !0);
    }
    function u(e, t, n) {
      var r,
        i,
        o = e.size,
        a = S.getEncodedBits(t, n);
      for (r = 0; r < 15; r++)
        (i = 1 === ((a >> r) & 1)),
          r < 6
            ? e.set(r, 8, i, !0)
            : r < 8
            ? e.set(r + 1, 8, i, !0)
            : e.set(o - 15 + r, 8, i, !0),
          r < 8
            ? e.set(8, o - r - 1, i, !0)
            : r < 9
            ? e.set(8, 15 - r - 1 + 1, i, !0)
            : e.set(8, 15 - r - 1, i, !0);
      e.set(o - 8, 8, 1, !0);
    }
    function l(e, t) {
      for (
        var n = e.size, r = -1, i = n - 1, o = 7, a = 0, u = n - 1;
        u > 0;
        u -= 2
      )
        for (6 === u && u--; ; ) {
          for (var l = 0; l < 2; l++)
            if (!e.isReserved(i, u - l)) {
              var s = !1;
              a < t.length && (s = 1 === ((t[a] >>> o) & 1)),
                e.set(i, u - l, s),
                o--,
                o === -1 && (a++, (o = 7));
            }
          if (((i += r), i < 0 || n <= i)) {
            (i -= r), (r = -r);
            break;
          }
        }
    }
    function s(e, t, n) {
      var r = new v();
      n.forEach(function (t) {
        r.put(t.mode.bit, 4),
          r.put(t.getLength(), k.getCharCountIndicator(t.mode, e)),
          t.write(r);
      });
      var i = p.getSymbolTotalCodewords(e),
        o = _.getTotalCodewordsCount(e, t),
        a = 8 * (i - o);
      for (
        r.getLengthInBits() + 4 <= a && r.put(0, 4);
        r.getLengthInBits() % 8 !== 0;

      )
        r.putBit(0);
      for (var u = (a - r.getLengthInBits()) / 8, l = 0; l < u; l++)
        r.put(l % 2 ? 17 : 236, 8);
      return f(r, e, t);
    }
    function f(e, t, n) {
      for (
        var r = p.getSymbolTotalCodewords(t),
          i = _.getTotalCodewordsCount(t, n),
          o = r - i,
          a = _.getBlocksCount(t, n),
          u = r % a,
          l = a - u,
          s = Math.floor(r / a),
          f = Math.floor(o / a),
          c = f + 1,
          h = s - f,
          v = new w(h),
          y = 0,
          m = new Array(a),
          g = new Array(a),
          b = 0,
          E = d.from(e.buffer),
          S = 0;
        S < a;
        S++
      ) {
        var k = S < l ? f : c;
        (m[S] = E.slice(y, y + k)),
          (g[S] = v.encode(m[S])),
          (y += k),
          (b = Math.max(b, k));
      }
      var x,
        T,
        P = d.alloc(r),
        O = 0;
      for (x = 0; x < b; x++)
        for (T = 0; T < a; T++) x < m[T].length && (P[O++] = m[T][x]);
      for (x = 0; x < h; x++) for (T = 0; T < a; T++) P[O++] = g[T][x];
      return P;
    }
    function c(e, t, n, f) {
      var c;
      if (T(e)) c = x.fromArray(e);
      else {
        if ("string" != typeof e) throw new Error("Invalid data");
        var d = t;
        if (!d) {
          var h = x.rawSplit(e);
          d = E.getBestVersionForData(h, n);
        }
        c = x.fromString(e, d || 40);
      }
      var v = E.getBestVersionForData(c, n);
      if (!v)
        throw new Error(
          "The amount of data is too big to be stored in a QR Code"
        );
      if (t) {
        if (t < v)
          throw new Error(
            "\nThe chosen QR Code version cannot contain this amount of data.\nMinimum version required to store current data is: " +
              v +
              ".\n"
          );
      } else t = v;
      var m = s(t, n, c),
        g = p.getSymbolSize(t),
        _ = new y(g);
      return (
        r(_, t),
        i(_),
        o(_, t),
        u(_, n, 0),
        t >= 7 && a(_, t),
        l(_, m),
        isNaN(f) && (f = b.getBestMask(_, u.bind(null, _, n))),
        b.applyMask(f, _),
        u(_, n, f),
        {
          modules: _,
          version: t,
          errorCorrectionLevel: n,
          maskPattern: f,
          segments: c,
        }
      );
    }
    var d = n(119),
      p = n(125),
      h = n(126),
      v = n(127),
      y = n(128),
      m = n(129),
      g = n(130),
      b = n(131),
      _ = n(132),
      w = n(133),
      E = n(137),
      S = n(141),
      k = n(138),
      x = n(142),
      T = n(124);
    t.create = function (e, t) {
      if ("undefined" == typeof e || "" === e) throw new Error("No input text");
      var n,
        r,
        i = h.M;
      return (
        "undefined" != typeof t &&
          ((i = h.from(t.errorCorrectionLevel, h.M)),
          (n = E.from(t.version)),
          (r = b.from(t.maskPattern)),
          t.toSJISFunc && p.setToSJISFunction(t.toSJISFunc)),
        c(e, n, i, r)
      );
    };
  },
  function (e, t, n) {
    (function (t) {
      "use strict";
      function r() {
        try {
          var e = new Uint8Array(1);
          return (
            (e.__proto__ = {
              __proto__: Uint8Array.prototype,
              foo: function () {
                return 42;
              },
            }),
            42 === e.foo()
          );
        } catch (e) {
          return !1;
        }
      }
      function t(e, n, r) {
        return t.TYPED_ARRAY_SUPPORT || this instanceof t
          ? "number" == typeof e
            ? u(this, e)
            : y(this, e, n, r)
          : new t(e, n, r);
      }
      function i(e) {
        if (e >= g)
          throw new RangeError(
            "Attempt to allocate Buffer larger than maximum size: 0x" +
              g.toString(16) +
              " bytes"
          );
        return 0 | e;
      }
      function o(e) {
        return e !== e;
      }
      function a(e, n) {
        var r;
        return (
          t.TYPED_ARRAY_SUPPORT
            ? ((r = new Uint8Array(n)), (r.__proto__ = t.prototype))
            : ((r = e), null === r && (r = new t(n)), (r.length = n)),
          r
        );
      }
      function u(e, n) {
        var r = a(e, n < 0 ? 0 : 0 | i(n));
        if (!t.TYPED_ARRAY_SUPPORT) for (var o = 0; o < n; ++o) r[o] = 0;
        return r;
      }
      function l(e, t) {
        var n = 0 | p(t),
          r = a(e, n),
          i = r.write(t);
        return i !== n && (r = r.slice(0, i)), r;
      }
      function s(e, t) {
        for (
          var n = t.length < 0 ? 0 : 0 | i(t.length), r = a(e, n), o = 0;
          o < n;
          o += 1
        )
          r[o] = 255 & t[o];
        return r;
      }
      function f(e, n, r, i) {
        if (r < 0 || n.byteLength < r)
          throw new RangeError("'offset' is out of bounds");
        if (n.byteLength < r + (i || 0))
          throw new RangeError("'length' is out of bounds");
        var o;
        return (
          (o =
            void 0 === r && void 0 === i
              ? new Uint8Array(n)
              : void 0 === i
              ? new Uint8Array(n, r)
              : new Uint8Array(n, r, i)),
          t.TYPED_ARRAY_SUPPORT ? (o.__proto__ = t.prototype) : (o = s(e, o)),
          o
        );
      }
      function c(e, n) {
        if (t.isBuffer(n)) {
          var r = 0 | i(n.length),
            u = a(e, r);
          return 0 === u.length ? u : (n.copy(u, 0, 0, r), u);
        }
        if (n) {
          if (
            ("undefined" != typeof ArrayBuffer &&
              n.buffer instanceof ArrayBuffer) ||
            "length" in n
          )
            return "number" != typeof n.length || o(n.length)
              ? a(e, 0)
              : s(e, n);
          if ("Buffer" === n.type && Array.isArray(n.data)) return s(e, n.data);
        }
        throw new TypeError(
          "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
        );
      }
      function d(e, t) {
        t = t || 1 / 0;
        for (var n, r = e.length, i = null, o = [], a = 0; a < r; ++a) {
          if (((n = e.charCodeAt(a)), n > 55295 && n < 57344)) {
            if (!i) {
              if (n > 56319) {
                (t -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              if (a + 1 === r) {
                (t -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              i = n;
              continue;
            }
            if (n < 56320) {
              (t -= 3) > -1 && o.push(239, 191, 189), (i = n);
              continue;
            }
            n = (((i - 55296) << 10) | (n - 56320)) + 65536;
          } else i && (t -= 3) > -1 && o.push(239, 191, 189);
          if (((i = null), n < 128)) {
            if ((t -= 1) < 0) break;
            o.push(n);
          } else if (n < 2048) {
            if ((t -= 2) < 0) break;
            o.push((n >> 6) | 192, (63 & n) | 128);
          } else if (n < 65536) {
            if ((t -= 3) < 0) break;
            o.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
          } else {
            if (!(n < 1114112)) throw new Error("Invalid code point");
            if ((t -= 4) < 0) break;
            o.push(
              (n >> 18) | 240,
              ((n >> 12) & 63) | 128,
              ((n >> 6) & 63) | 128,
              (63 & n) | 128
            );
          }
        }
        return o;
      }
      function p(e) {
        if (t.isBuffer(e)) return e.length;
        if (
          "undefined" != typeof ArrayBuffer &&
          "function" == typeof ArrayBuffer.isView &&
          (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
        )
          return e.byteLength;
        "string" != typeof e && (e = "" + e);
        var n = e.length;
        return 0 === n ? 0 : d(e).length;
      }
      function h(e, t, n, r) {
        for (var i = 0; i < r && !(i + n >= t.length || i >= e.length); ++i)
          t[i + n] = e[i];
        return i;
      }
      function v(e, t, n, r) {
        return h(d(t, e.length - n), e, n, r);
      }
      function y(e, t, n, r) {
        if ("number" == typeof t)
          throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer
          ? f(e, t, n, r)
          : "string" == typeof t
          ? l(e, t, n)
          : c(e, t);
      }
      var m = n(124);
      t.TYPED_ARRAY_SUPPORT = r();
      var g = t.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      t.TYPED_ARRAY_SUPPORT &&
        ((t.prototype.__proto__ = Uint8Array.prototype),
        (t.__proto__ = Uint8Array),
        "undefined" != typeof Symbol &&
          Symbol.species &&
          t[Symbol.species] === t &&
          Object.defineProperty(t, Symbol.species, {
            value: null,
            configurable: !0,
            enumerable: !1,
            writable: !1,
          })),
        (t.prototype.write = function (e, t, n) {
          void 0 === t
            ? ((n = this.length), (t = 0))
            : void 0 === n && "string" == typeof t
            ? ((n = this.length), (t = 0))
            : isFinite(t) && ((t |= 0), isFinite(n) ? (n |= 0) : (n = void 0));
          var r = this.length - t;
          if (
            ((void 0 === n || n > r) && (n = r),
            (e.length > 0 && (n < 0 || t < 0)) || t > this.length)
          )
            throw new RangeError("Attempt to write outside buffer bounds");
          return v(this, e, t, n);
        }),
        (t.prototype.slice = function (e, n) {
          var r = this.length;
          (e = ~~e),
            (n = void 0 === n ? r : ~~n),
            e < 0 ? ((e += r), e < 0 && (e = 0)) : e > r && (e = r),
            n < 0 ? ((n += r), n < 0 && (n = 0)) : n > r && (n = r),
            n < e && (n = e);
          var i;
          if (t.TYPED_ARRAY_SUPPORT)
            (i = this.subarray(e, n)), (i.__proto__ = t.prototype);
          else {
            var o = n - e;
            i = new t(o, void 0);
            for (var a = 0; a < o; ++a) i[a] = this[a + e];
          }
          return i;
        }),
        (t.prototype.copy = function (e, n, r, i) {
          if (
            (r || (r = 0),
            i || 0 === i || (i = this.length),
            n >= e.length && (n = e.length),
            n || (n = 0),
            i > 0 && i < r && (i = r),
            i === r)
          )
            return 0;
          if (0 === e.length || 0 === this.length) return 0;
          if (n < 0) throw new RangeError("targetStart out of bounds");
          if (r < 0 || r >= this.length)
            throw new RangeError("sourceStart out of bounds");
          if (i < 0) throw new RangeError("sourceEnd out of bounds");
          i > this.length && (i = this.length),
            e.length - n < i - r && (i = e.length - n + r);
          var o,
            a = i - r;
          if (this === e && r < n && n < i)
            for (o = a - 1; o >= 0; --o) e[o + n] = this[o + r];
          else if (a < 1e3 || !t.TYPED_ARRAY_SUPPORT)
            for (o = 0; o < a; ++o) e[o + n] = this[o + r];
          else Uint8Array.prototype.set.call(e, this.subarray(r, r + a), n);
          return a;
        }),
        (t.prototype.fill = function (e, n, r) {
          if ("string" == typeof e) {
            if (
              ("string" == typeof n
                ? ((n = 0), (r = this.length))
                : "string" == typeof r && (r = this.length),
              1 === e.length)
            ) {
              var i = e.charCodeAt(0);
              i < 256 && (e = i);
            }
          } else "number" == typeof e && (e &= 255);
          if (n < 0 || this.length < n || this.length < r)
            throw new RangeError("Out of range index");
          if (r <= n) return this;
          (n >>>= 0), (r = void 0 === r ? this.length : r >>> 0), e || (e = 0);
          var o;
          if ("number" == typeof e) for (o = n; o < r; ++o) this[o] = e;
          else {
            var a = t.isBuffer(e) ? e : new t(e),
              u = a.length;
            for (o = 0; o < r - n; ++o) this[o + n] = a[o % u];
          }
          return this;
        }),
        (t.concat = function (e, n) {
          if (!m(e))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === e.length) return a(null, 0);
          var r;
          if (void 0 === n)
            for (n = 0, r = 0; r < e.length; ++r) n += e[r].length;
          var i = u(null, n),
            o = 0;
          for (r = 0; r < e.length; ++r) {
            var l = e[r];
            if (!t.isBuffer(l))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            l.copy(i, o), (o += l.length);
          }
          return i;
        }),
        (t.byteLength = p),
        (t.prototype._isBuffer = !0),
        (t.isBuffer = function (e) {
          return !(null == e || !e._isBuffer);
        }),
        (e.exports.alloc = function (e) {
          var n = new t(e);
          return n.fill(0), n;
        }),
        (e.exports.from = function (e) {
          return new t(e);
        });
    }).call(t, n(120).Buffer);
  },
  function (e, t, n) {
    (function (e) {
      "use strict";
      function r() {
        try {
          var e = new Uint8Array(1);
          return (
            (e.__proto__ = {
              __proto__: Uint8Array.prototype,
              foo: function () {
                return 42;
              },
            }),
            42 === e.foo() &&
              "function" == typeof e.subarray &&
              0 === e.subarray(1, 1).byteLength
          );
        } catch (e) {
          return !1;
        }
      }
      function i() {
        return a.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
      }
      function o(e, t) {
        if (i() < t) throw new RangeError("Invalid typed array length");
        return (
          a.TYPED_ARRAY_SUPPORT
            ? ((e = new Uint8Array(t)), (e.__proto__ = a.prototype))
            : (null === e && (e = new a(t)), (e.length = t)),
          e
        );
      }
      function a(e, t, n) {
        if (!(a.TYPED_ARRAY_SUPPORT || this instanceof a))
          return new a(e, t, n);
        if ("number" == typeof e) {
          if ("string" == typeof t)
            throw new Error(
              "If encoding is specified then the first argument must be a string"
            );
          return f(this, e);
        }
        return u(this, e, t, n);
      }
      function u(e, t, n, r) {
        if ("number" == typeof t)
          throw new TypeError('"value" argument must not be a number');
        return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer
          ? p(e, t, n, r)
          : "string" == typeof t
          ? c(e, t, n)
          : h(e, t);
      }
      function l(e) {
        if ("number" != typeof e)
          throw new TypeError('"size" argument must be a number');
        if (e < 0) throw new RangeError('"size" argument must not be negative');
      }
      function s(e, t, n, r) {
        return (
          l(t),
          t <= 0
            ? o(e, t)
            : void 0 !== n
            ? "string" == typeof r
              ? o(e, t).fill(n, r)
              : o(e, t).fill(n)
            : o(e, t)
        );
      }
      function f(e, t) {
        if ((l(t), (e = o(e, t < 0 ? 0 : 0 | v(t))), !a.TYPED_ARRAY_SUPPORT))
          for (var n = 0; n < t; ++n) e[n] = 0;
        return e;
      }
      function c(e, t, n) {
        if (
          (("string" == typeof n && "" !== n) || (n = "utf8"), !a.isEncoding(n))
        )
          throw new TypeError('"encoding" must be a valid string encoding');
        var r = 0 | m(t, n);
        e = o(e, r);
        var i = e.write(t, n);
        return i !== r && (e = e.slice(0, i)), e;
      }
      function d(e, t) {
        var n = t.length < 0 ? 0 : 0 | v(t.length);
        e = o(e, n);
        for (var r = 0; r < n; r += 1) e[r] = 255 & t[r];
        return e;
      }
      function p(e, t, n, r) {
        if ((t.byteLength, n < 0 || t.byteLength < n))
          throw new RangeError("'offset' is out of bounds");
        if (t.byteLength < n + (r || 0))
          throw new RangeError("'length' is out of bounds");
        return (
          (t =
            void 0 === n && void 0 === r
              ? new Uint8Array(t)
              : void 0 === r
              ? new Uint8Array(t, n)
              : new Uint8Array(t, n, r)),
          a.TYPED_ARRAY_SUPPORT
            ? ((e = t), (e.__proto__ = a.prototype))
            : (e = d(e, t)),
          e
        );
      }
      function h(e, t) {
        if (a.isBuffer(t)) {
          var n = 0 | v(t.length);
          return (e = o(e, n)), 0 === e.length ? e : (t.copy(e, 0, 0, n), e);
        }
        if (t) {
          if (
            ("undefined" != typeof ArrayBuffer &&
              t.buffer instanceof ArrayBuffer) ||
            "length" in t
          )
            return "number" != typeof t.length || J(t.length)
              ? o(e, 0)
              : d(e, t);
          if ("Buffer" === t.type && Z(t.data)) return d(e, t.data);
        }
        throw new TypeError(
          "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
        );
      }
      function v(e) {
        if (e >= i())
          throw new RangeError(
            "Attempt to allocate Buffer larger than maximum size: 0x" +
              i().toString(16) +
              " bytes"
          );
        return 0 | e;
      }
      function y(e) {
        return +e != e && (e = 0), a.alloc(+e);
      }
      function m(e, t) {
        if (a.isBuffer(e)) return e.length;
        if (
          "undefined" != typeof ArrayBuffer &&
          "function" == typeof ArrayBuffer.isView &&
          (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)
        )
          return e.byteLength;
        "string" != typeof e && (e = "" + e);
        var n = e.length;
        if (0 === n) return 0;
        for (var r = !1; ; )
          switch (t) {
            case "ascii":
            case "latin1":
            case "binary":
              return n;
            case "utf8":
            case "utf-8":
            case void 0:
              return W(e).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * n;
            case "hex":
              return n >>> 1;
            case "base64":
              return Q(e).length;
            default:
              if (r) return W(e).length;
              (t = ("" + t).toLowerCase()), (r = !0);
          }
      }
      function g(e, t, n) {
        var r = !1;
        if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return "";
        if (((void 0 === n || n > this.length) && (n = this.length), n <= 0))
          return "";
        if (((n >>>= 0), (t >>>= 0), n <= t)) return "";
        for (e || (e = "utf8"); ; )
          switch (e) {
            case "hex":
              return A(this, t, n);
            case "utf8":
            case "utf-8":
              return C(this, t, n);
            case "ascii":
              return I(this, t, n);
            case "latin1":
            case "binary":
              return M(this, t, n);
            case "base64":
              return O(this, t, n);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return N(this, t, n);
            default:
              if (r) throw new TypeError("Unknown encoding: " + e);
              (e = (e + "").toLowerCase()), (r = !0);
          }
      }
      function b(e, t, n) {
        var r = e[t];
        (e[t] = e[n]), (e[n] = r);
      }
      function _(e, t, n, r, i) {
        if (0 === e.length) return -1;
        if (
          ("string" == typeof n
            ? ((r = n), (n = 0))
            : n > 2147483647
            ? (n = 2147483647)
            : n < -2147483648 && (n = -2147483648),
          (n = +n),
          isNaN(n) && (n = i ? 0 : e.length - 1),
          n < 0 && (n = e.length + n),
          n >= e.length)
        ) {
          if (i) return -1;
          n = e.length - 1;
        } else if (n < 0) {
          if (!i) return -1;
          n = 0;
        }
        if (("string" == typeof t && (t = a.from(t, r)), a.isBuffer(t)))
          return 0 === t.length ? -1 : w(e, t, n, r, i);
        if ("number" == typeof t)
          return (
            (t &= 255),
            a.TYPED_ARRAY_SUPPORT &&
            "function" == typeof Uint8Array.prototype.indexOf
              ? i
                ? Uint8Array.prototype.indexOf.call(e, t, n)
                : Uint8Array.prototype.lastIndexOf.call(e, t, n)
              : w(e, [t], n, r, i)
          );
        throw new TypeError("val must be string, number or Buffer");
      }
      function w(e, t, n, r, i) {
        function o(e, t) {
          return 1 === a ? e[t] : e.readUInt16BE(t * a);
        }
        var a = 1,
          u = e.length,
          l = t.length;
        if (
          void 0 !== r &&
          ((r = String(r).toLowerCase()),
          "ucs2" === r || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)
        ) {
          if (e.length < 2 || t.length < 2) return -1;
          (a = 2), (u /= 2), (l /= 2), (n /= 2);
        }
        var s;
        if (i) {
          var f = -1;
          for (s = n; s < u; s++)
            if (o(e, s) === o(t, f === -1 ? 0 : s - f)) {
              if ((f === -1 && (f = s), s - f + 1 === l)) return f * a;
            } else f !== -1 && (s -= s - f), (f = -1);
        } else
          for (n + l > u && (n = u - l), s = n; s >= 0; s--) {
            for (var c = !0, d = 0; d < l; d++)
              if (o(e, s + d) !== o(t, d)) {
                c = !1;
                break;
              }
            if (c) return s;
          }
        return -1;
      }
      function E(e, t, n, r) {
        n = Number(n) || 0;
        var i = e.length - n;
        r ? ((r = Number(r)), r > i && (r = i)) : (r = i);
        var o = t.length;
        if (o % 2 !== 0) throw new TypeError("Invalid hex string");
        r > o / 2 && (r = o / 2);
        for (var a = 0; a < r; ++a) {
          var u = parseInt(t.substr(2 * a, 2), 16);
          if (isNaN(u)) return a;
          e[n + a] = u;
        }
        return a;
      }
      function S(e, t, n, r) {
        return $(W(t, e.length - n), e, n, r);
      }
      function k(e, t, n, r) {
        return $(H(t), e, n, r);
      }
      function x(e, t, n, r) {
        return k(e, t, n, r);
      }
      function T(e, t, n, r) {
        return $(Q(t), e, n, r);
      }
      function P(e, t, n, r) {
        return $(V(t, e.length - n), e, n, r);
      }
      function O(e, t, n) {
        return 0 === t && n === e.length
          ? X.fromByteArray(e)
          : X.fromByteArray(e.slice(t, n));
      }
      function C(e, t, n) {
        n = Math.min(e.length, n);
        for (var r = [], i = t; i < n; ) {
          var o = e[i],
            a = null,
            u = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
          if (i + u <= n) {
            var l, s, f, c;
            switch (u) {
              case 1:
                o < 128 && (a = o);
                break;
              case 2:
                (l = e[i + 1]),
                  128 === (192 & l) &&
                    ((c = ((31 & o) << 6) | (63 & l)), c > 127 && (a = c));
                break;
              case 3:
                (l = e[i + 1]),
                  (s = e[i + 2]),
                  128 === (192 & l) &&
                    128 === (192 & s) &&
                    ((c = ((15 & o) << 12) | ((63 & l) << 6) | (63 & s)),
                    c > 2047 && (c < 55296 || c > 57343) && (a = c));
                break;
              case 4:
                (l = e[i + 1]),
                  (s = e[i + 2]),
                  (f = e[i + 3]),
                  128 === (192 & l) &&
                    128 === (192 & s) &&
                    128 === (192 & f) &&
                    ((c =
                      ((15 & o) << 18) |
                      ((63 & l) << 12) |
                      ((63 & s) << 6) |
                      (63 & f)),
                    c > 65535 && c < 1114112 && (a = c));
            }
          }
          null === a
            ? ((a = 65533), (u = 1))
            : a > 65535 &&
              ((a -= 65536),
              r.push(((a >>> 10) & 1023) | 55296),
              (a = 56320 | (1023 & a))),
            r.push(a),
            (i += u);
        }
        return R(r);
      }
      function R(e) {
        var t = e.length;
        if (t <= ee) return String.fromCharCode.apply(String, e);
        for (var n = "", r = 0; r < t; )
          n += String.fromCharCode.apply(String, e.slice(r, (r += ee)));
        return n;
      }
      function I(e, t, n) {
        var r = "";
        n = Math.min(e.length, n);
        for (var i = t; i < n; ++i) r += String.fromCharCode(127 & e[i]);
        return r;
      }
      function M(e, t, n) {
        var r = "";
        n = Math.min(e.length, n);
        for (var i = t; i < n; ++i) r += String.fromCharCode(e[i]);
        return r;
      }
      function A(e, t, n) {
        var r = e.length;
        (!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
        for (var i = "", o = t; o < n; ++o) i += K(e[o]);
        return i;
      }
      function N(e, t, n) {
        for (var r = e.slice(t, n), i = "", o = 0; o < r.length; o += 2)
          i += String.fromCharCode(r[o] + 256 * r[o + 1]);
        return i;
      }
      function j(e, t, n) {
        if (e % 1 !== 0 || e < 0) throw new RangeError("offset is not uint");
        if (e + t > n)
          throw new RangeError("Trying to access beyond buffer length");
      }
      function L(e, t, n, r, i, o) {
        if (!a.isBuffer(e))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (t > i || t < o)
          throw new RangeError('"value" argument is out of bounds');
        if (n + r > e.length) throw new RangeError("Index out of range");
      }
      function z(e, t, n, r) {
        t < 0 && (t = 65535 + t + 1);
        for (var i = 0, o = Math.min(e.length - n, 2); i < o; ++i)
          e[n + i] =
            (t & (255 << (8 * (r ? i : 1 - i)))) >>> (8 * (r ? i : 1 - i));
      }
      function U(e, t, n, r) {
        t < 0 && (t = 4294967295 + t + 1);
        for (var i = 0, o = Math.min(e.length - n, 4); i < o; ++i)
          e[n + i] = (t >>> (8 * (r ? i : 3 - i))) & 255;
      }
      function B(e, t, n, r, i, o) {
        if (n + r > e.length) throw new RangeError("Index out of range");
        if (n < 0) throw new RangeError("Index out of range");
      }
      function D(e, t, n, r, i) {
        return (
          i || B(e, t, n, 4, 3.4028234663852886e38, -3.4028234663852886e38),
          G.write(e, t, n, r, 23, 4),
          n + 4
        );
      }
      function F(e, t, n, r, i) {
        return (
          i || B(e, t, n, 8, 1.7976931348623157e308, -1.7976931348623157e308),
          G.write(e, t, n, r, 52, 8),
          n + 8
        );
      }
      function q(e) {
        if (((e = Y(e).replace(te, "")), e.length < 2)) return "";
        for (; e.length % 4 !== 0; ) e += "=";
        return e;
      }
      function Y(e) {
        return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
      }
      function K(e) {
        return e < 16 ? "0" + e.toString(16) : e.toString(16);
      }
      function W(e, t) {
        t = t || 1 / 0;
        for (var n, r = e.length, i = null, o = [], a = 0; a < r; ++a) {
          if (((n = e.charCodeAt(a)), n > 55295 && n < 57344)) {
            if (!i) {
              if (n > 56319) {
                (t -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              if (a + 1 === r) {
                (t -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              i = n;
              continue;
            }
            if (n < 56320) {
              (t -= 3) > -1 && o.push(239, 191, 189), (i = n);
              continue;
            }
            n = (((i - 55296) << 10) | (n - 56320)) + 65536;
          } else i && (t -= 3) > -1 && o.push(239, 191, 189);
          if (((i = null), n < 128)) {
            if ((t -= 1) < 0) break;
            o.push(n);
          } else if (n < 2048) {
            if ((t -= 2) < 0) break;
            o.push((n >> 6) | 192, (63 & n) | 128);
          } else if (n < 65536) {
            if ((t -= 3) < 0) break;
            o.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
          } else {
            if (!(n < 1114112)) throw new Error("Invalid code point");
            if ((t -= 4) < 0) break;
            o.push(
              (n >> 18) | 240,
              ((n >> 12) & 63) | 128,
              ((n >> 6) & 63) | 128,
              (63 & n) | 128
            );
          }
        }
        return o;
      }
      function H(e) {
        for (var t = [], n = 0; n < e.length; ++n)
          t.push(255 & e.charCodeAt(n));
        return t;
      }
      function V(e, t) {
        for (var n, r, i, o = [], a = 0; a < e.length && !((t -= 2) < 0); ++a)
          (n = e.charCodeAt(a)),
            (r = n >> 8),
            (i = n % 256),
            o.push(i),
            o.push(r);
        return o;
      }
      function Q(e) {
        return X.toByteArray(q(e));
      }
      function $(e, t, n, r) {
        for (var i = 0; i < r && !(i + n >= t.length || i >= e.length); ++i)
          t[i + n] = e[i];
        return i;
      }
      function J(e) {
        return e !== e;
      }
      var X = n(121),
        G = n(122),
        Z = n(123);
      (t.Buffer = a),
        (t.SlowBuffer = y),
        (t.INSPECT_MAX_BYTES = 50),
        (a.TYPED_ARRAY_SUPPORT =
          void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : r()),
        (t.kMaxLength = i()),
        (a.poolSize = 8192),
        (a._augment = function (e) {
          return (e.__proto__ = a.prototype), e;
        }),
        (a.from = function (e, t, n) {
          return u(null, e, t, n);
        }),
        a.TYPED_ARRAY_SUPPORT &&
          ((a.prototype.__proto__ = Uint8Array.prototype),
          (a.__proto__ = Uint8Array),
          "undefined" != typeof Symbol &&
            Symbol.species &&
            a[Symbol.species] === a &&
            Object.defineProperty(a, Symbol.species, {
              value: null,
              configurable: !0,
            })),
        (a.alloc = function (e, t, n) {
          return s(null, e, t, n);
        }),
        (a.allocUnsafe = function (e) {
          return f(null, e);
        }),
        (a.allocUnsafeSlow = function (e) {
          return f(null, e);
        }),
        (a.isBuffer = function (e) {
          return !(null == e || !e._isBuffer);
        }),
        (a.compare = function (e, t) {
          if (!a.isBuffer(e) || !a.isBuffer(t))
            throw new TypeError("Arguments must be Buffers");
          if (e === t) return 0;
          for (
            var n = e.length, r = t.length, i = 0, o = Math.min(n, r);
            i < o;
            ++i
          )
            if (e[i] !== t[i]) {
              (n = e[i]), (r = t[i]);
              break;
            }
          return n < r ? -1 : r < n ? 1 : 0;
        }),
        (a.isEncoding = function (e) {
          switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }),
        (a.concat = function (e, t) {
          if (!Z(e))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === e.length) return a.alloc(0);
          var n;
          if (void 0 === t)
            for (t = 0, n = 0; n < e.length; ++n) t += e[n].length;
          var r = a.allocUnsafe(t),
            i = 0;
          for (n = 0; n < e.length; ++n) {
            var o = e[n];
            if (!a.isBuffer(o))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            o.copy(r, i), (i += o.length);
          }
          return r;
        }),
        (a.byteLength = m),
        (a.prototype._isBuffer = !0),
        (a.prototype.swap16 = function () {
          var e = this.length;
          if (e % 2 !== 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var t = 0; t < e; t += 2) b(this, t, t + 1);
          return this;
        }),
        (a.prototype.swap32 = function () {
          var e = this.length;
          if (e % 4 !== 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var t = 0; t < e; t += 4)
            b(this, t, t + 3), b(this, t + 1, t + 2);
          return this;
        }),
        (a.prototype.swap64 = function () {
          var e = this.length;
          if (e % 8 !== 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var t = 0; t < e; t += 8)
            b(this, t, t + 7),
              b(this, t + 1, t + 6),
              b(this, t + 2, t + 5),
              b(this, t + 3, t + 4);
          return this;
        }),
        (a.prototype.toString = function () {
          var e = 0 | this.length;
          return 0 === e
            ? ""
            : 0 === arguments.length
            ? C(this, 0, e)
            : g.apply(this, arguments);
        }),
        (a.prototype.equals = function (e) {
          if (!a.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
          return this === e || 0 === a.compare(this, e);
        }),
        (a.prototype.inspect = function () {
          var e = "",
            n = t.INSPECT_MAX_BYTES;
          return (
            this.length > 0 &&
              ((e = this.toString("hex", 0, n).match(/.{2}/g).join(" ")),
              this.length > n && (e += " ... ")),
            "<Buffer " + e + ">"
          );
        }),
        (a.prototype.compare = function (e, t, n, r, i) {
          if (!a.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
          if (
            (void 0 === t && (t = 0),
            void 0 === n && (n = e ? e.length : 0),
            void 0 === r && (r = 0),
            void 0 === i && (i = this.length),
            t < 0 || n > e.length || r < 0 || i > this.length)
          )
            throw new RangeError("out of range index");
          if (r >= i && t >= n) return 0;
          if (r >= i) return -1;
          if (t >= n) return 1;
          if (((t >>>= 0), (n >>>= 0), (r >>>= 0), (i >>>= 0), this === e))
            return 0;
          for (
            var o = i - r,
              u = n - t,
              l = Math.min(o, u),
              s = this.slice(r, i),
              f = e.slice(t, n),
              c = 0;
            c < l;
            ++c
          )
            if (s[c] !== f[c]) {
              (o = s[c]), (u = f[c]);
              break;
            }
          return o < u ? -1 : u < o ? 1 : 0;
        }),
        (a.prototype.includes = function (e, t, n) {
          return this.indexOf(e, t, n) !== -1;
        }),
        (a.prototype.indexOf = function (e, t, n) {
          return _(this, e, t, n, !0);
        }),
        (a.prototype.lastIndexOf = function (e, t, n) {
          return _(this, e, t, n, !1);
        }),
        (a.prototype.write = function (e, t, n, r) {
          if (void 0 === t) (r = "utf8"), (n = this.length), (t = 0);
          else if (void 0 === n && "string" == typeof t)
            (r = t), (n = this.length), (t = 0);
          else {
            if (!isFinite(t))
              throw new Error(
                "Buffer.write(string, encoding, offset[, length]) is no longer supported"
              );
            (t |= 0),
              isFinite(n)
                ? ((n |= 0), void 0 === r && (r = "utf8"))
                : ((r = n), (n = void 0));
          }
          var i = this.length - t;
          if (
            ((void 0 === n || n > i) && (n = i),
            (e.length > 0 && (n < 0 || t < 0)) || t > this.length)
          )
            throw new RangeError("Attempt to write outside buffer bounds");
          r || (r = "utf8");
          for (var o = !1; ; )
            switch (r) {
              case "hex":
                return E(this, e, t, n);
              case "utf8":
              case "utf-8":
                return S(this, e, t, n);
              case "ascii":
                return k(this, e, t, n);
              case "latin1":
              case "binary":
                return x(this, e, t, n);
              case "base64":
                return T(this, e, t, n);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return P(this, e, t, n);
              default:
                if (o) throw new TypeError("Unknown encoding: " + r);
                (r = ("" + r).toLowerCase()), (o = !0);
            }
        }),
        (a.prototype.toJSON = function () {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0),
          };
        });
      var ee = 4096;
      (a.prototype.slice = function (e, t) {
        var n = this.length;
        (e = ~~e),
          (t = void 0 === t ? n : ~~t),
          e < 0 ? ((e += n), e < 0 && (e = 0)) : e > n && (e = n),
          t < 0 ? ((t += n), t < 0 && (t = 0)) : t > n && (t = n),
          t < e && (t = e);
        var r;
        if (a.TYPED_ARRAY_SUPPORT)
          (r = this.subarray(e, t)), (r.__proto__ = a.prototype);
        else {
          var i = t - e;
          r = new a(i, void 0);
          for (var o = 0; o < i; ++o) r[o] = this[o + e];
        }
        return r;
      }),
        (a.prototype.readUIntLE = function (e, t, n) {
          (e |= 0), (t |= 0), n || j(e, t, this.length);
          for (var r = this[e], i = 1, o = 0; ++o < t && (i *= 256); )
            r += this[e + o] * i;
          return r;
        }),
        (a.prototype.readUIntBE = function (e, t, n) {
          (e |= 0), (t |= 0), n || j(e, t, this.length);
          for (var r = this[e + --t], i = 1; t > 0 && (i *= 256); )
            r += this[e + --t] * i;
          return r;
        }),
        (a.prototype.readUInt8 = function (e, t) {
          return t || j(e, 1, this.length), this[e];
        }),
        (a.prototype.readUInt16LE = function (e, t) {
          return t || j(e, 2, this.length), this[e] | (this[e + 1] << 8);
        }),
        (a.prototype.readUInt16BE = function (e, t) {
          return t || j(e, 2, this.length), (this[e] << 8) | this[e + 1];
        }),
        (a.prototype.readUInt32LE = function (e, t) {
          return (
            t || j(e, 4, this.length),
            (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
              16777216 * this[e + 3]
          );
        }),
        (a.prototype.readUInt32BE = function (e, t) {
          return (
            t || j(e, 4, this.length),
            16777216 * this[e] +
              ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
          );
        }),
        (a.prototype.readIntLE = function (e, t, n) {
          (e |= 0), (t |= 0), n || j(e, t, this.length);
          for (var r = this[e], i = 1, o = 0; ++o < t && (i *= 256); )
            r += this[e + o] * i;
          return (i *= 128), r >= i && (r -= Math.pow(2, 8 * t)), r;
        }),
        (a.prototype.readIntBE = function (e, t, n) {
          (e |= 0), (t |= 0), n || j(e, t, this.length);
          for (var r = t, i = 1, o = this[e + --r]; r > 0 && (i *= 256); )
            o += this[e + --r] * i;
          return (i *= 128), o >= i && (o -= Math.pow(2, 8 * t)), o;
        }),
        (a.prototype.readInt8 = function (e, t) {
          return (
            t || j(e, 1, this.length),
            128 & this[e] ? (255 - this[e] + 1) * -1 : this[e]
          );
        }),
        (a.prototype.readInt16LE = function (e, t) {
          t || j(e, 2, this.length);
          var n = this[e] | (this[e + 1] << 8);
          return 32768 & n ? 4294901760 | n : n;
        }),
        (a.prototype.readInt16BE = function (e, t) {
          t || j(e, 2, this.length);
          var n = this[e + 1] | (this[e] << 8);
          return 32768 & n ? 4294901760 | n : n;
        }),
        (a.prototype.readInt32LE = function (e, t) {
          return (
            t || j(e, 4, this.length),
            this[e] |
              (this[e + 1] << 8) |
              (this[e + 2] << 16) |
              (this[e + 3] << 24)
          );
        }),
        (a.prototype.readInt32BE = function (e, t) {
          return (
            t || j(e, 4, this.length),
            (this[e] << 24) |
              (this[e + 1] << 16) |
              (this[e + 2] << 8) |
              this[e + 3]
          );
        }),
        (a.prototype.readFloatLE = function (e, t) {
          return t || j(e, 4, this.length), G.read(this, e, !0, 23, 4);
        }),
        (a.prototype.readFloatBE = function (e, t) {
          return t || j(e, 4, this.length), G.read(this, e, !1, 23, 4);
        }),
        (a.prototype.readDoubleLE = function (e, t) {
          return t || j(e, 8, this.length), G.read(this, e, !0, 52, 8);
        }),
        (a.prototype.readDoubleBE = function (e, t) {
          return t || j(e, 8, this.length), G.read(this, e, !1, 52, 8);
        }),
        (a.prototype.writeUIntLE = function (e, t, n, r) {
          if (((e = +e), (t |= 0), (n |= 0), !r)) {
            var i = Math.pow(2, 8 * n) - 1;
            L(this, e, t, n, i, 0);
          }
          var o = 1,
            a = 0;
          for (this[t] = 255 & e; ++a < n && (o *= 256); )
            this[t + a] = (e / o) & 255;
          return t + n;
        }),
        (a.prototype.writeUIntBE = function (e, t, n, r) {
          if (((e = +e), (t |= 0), (n |= 0), !r)) {
            var i = Math.pow(2, 8 * n) - 1;
            L(this, e, t, n, i, 0);
          }
          var o = n - 1,
            a = 1;
          for (this[t + o] = 255 & e; --o >= 0 && (a *= 256); )
            this[t + o] = (e / a) & 255;
          return t + n;
        }),
        (a.prototype.writeUInt8 = function (e, t, n) {
          return (
            (e = +e),
            (t |= 0),
            n || L(this, e, t, 1, 255, 0),
            a.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
            (this[t] = 255 & e),
            t + 1
          );
        }),
        (a.prototype.writeUInt16LE = function (e, t, n) {
          return (
            (e = +e),
            (t |= 0),
            n || L(this, e, t, 2, 65535, 0),
            a.TYPED_ARRAY_SUPPORT
              ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
              : z(this, e, t, !0),
            t + 2
          );
        }),
        (a.prototype.writeUInt16BE = function (e, t, n) {
          return (
            (e = +e),
            (t |= 0),
            n || L(this, e, t, 2, 65535, 0),
            a.TYPED_ARRAY_SUPPORT
              ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
              : z(this, e, t, !1),
            t + 2
          );
        }),
        (a.prototype.writeUInt32LE = function (e, t, n) {
          return (
            (e = +e),
            (t |= 0),
            n || L(this, e, t, 4, 4294967295, 0),
            a.TYPED_ARRAY_SUPPORT
              ? ((this[t + 3] = e >>> 24),
                (this[t + 2] = e >>> 16),
                (this[t + 1] = e >>> 8),
                (this[t] = 255 & e))
              : U(this, e, t, !0),
            t + 4
          );
        }),
        (a.prototype.writeUInt32BE = function (e, t, n) {
          return (
            (e = +e),
            (t |= 0),
            n || L(this, e, t, 4, 4294967295, 0),
            a.TYPED_ARRAY_SUPPORT
              ? ((this[t] = e >>> 24),
                (this[t + 1] = e >>> 16),
                (this[t + 2] = e >>> 8),
                (this[t + 3] = 255 & e))
              : U(this, e, t, !1),
            t + 4
          );
        }),
        (a.prototype.writeIntLE = function (e, t, n, r) {
          if (((e = +e), (t |= 0), !r)) {
            var i = Math.pow(2, 8 * n - 1);
            L(this, e, t, n, i - 1, -i);
          }
          var o = 0,
            a = 1,
            u = 0;
          for (this[t] = 255 & e; ++o < n && (a *= 256); )
            e < 0 && 0 === u && 0 !== this[t + o - 1] && (u = 1),
              (this[t + o] = (((e / a) >> 0) - u) & 255);
          return t + n;
        }),
        (a.prototype.writeIntBE = function (e, t, n, r) {
          if (((e = +e), (t |= 0), !r)) {
            var i = Math.pow(2, 8 * n - 1);
            L(this, e, t, n, i - 1, -i);
          }
          var o = n - 1,
            a = 1,
            u = 0;
          for (this[t + o] = 255 & e; --o >= 0 && (a *= 256); )
            e < 0 && 0 === u && 0 !== this[t + o + 1] && (u = 1),
              (this[t + o] = (((e / a) >> 0) - u) & 255);
          return t + n;
        }),
        (a.prototype.writeInt8 = function (e, t, n) {
          return (
            (e = +e),
            (t |= 0),
            n || L(this, e, t, 1, 127, -128),
            a.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)),
            e < 0 && (e = 255 + e + 1),
            (this[t] = 255 & e),
            t + 1
          );
        }),
        (a.prototype.writeInt16LE = function (e, t, n) {
          return (
            (e = +e),
            (t |= 0),
            n || L(this, e, t, 2, 32767, -32768),
            a.TYPED_ARRAY_SUPPORT
              ? ((this[t] = 255 & e), (this[t + 1] = e >>> 8))
              : z(this, e, t, !0),
            t + 2
          );
        }),
        (a.prototype.writeInt16BE = function (e, t, n) {
          return (
            (e = +e),
            (t |= 0),
            n || L(this, e, t, 2, 32767, -32768),
            a.TYPED_ARRAY_SUPPORT
              ? ((this[t] = e >>> 8), (this[t + 1] = 255 & e))
              : z(this, e, t, !1),
            t + 2
          );
        }),
        (a.prototype.writeInt32LE = function (e, t, n) {
          return (
            (e = +e),
            (t |= 0),
            n || L(this, e, t, 4, 2147483647, -2147483648),
            a.TYPED_ARRAY_SUPPORT
              ? ((this[t] = 255 & e),
                (this[t + 1] = e >>> 8),
                (this[t + 2] = e >>> 16),
                (this[t + 3] = e >>> 24))
              : U(this, e, t, !0),
            t + 4
          );
        }),
        (a.prototype.writeInt32BE = function (e, t, n) {
          return (
            (e = +e),
            (t |= 0),
            n || L(this, e, t, 4, 2147483647, -2147483648),
            e < 0 && (e = 4294967295 + e + 1),
            a.TYPED_ARRAY_SUPPORT
              ? ((this[t] = e >>> 24),
                (this[t + 1] = e >>> 16),
                (this[t + 2] = e >>> 8),
                (this[t + 3] = 255 & e))
              : U(this, e, t, !1),
            t + 4
          );
        }),
        (a.prototype.writeFloatLE = function (e, t, n) {
          return D(this, e, t, !0, n);
        }),
        (a.prototype.writeFloatBE = function (e, t, n) {
          return D(this, e, t, !1, n);
        }),
        (a.prototype.writeDoubleLE = function (e, t, n) {
          return F(this, e, t, !0, n);
        }),
        (a.prototype.writeDoubleBE = function (e, t, n) {
          return F(this, e, t, !1, n);
        }),
        (a.prototype.copy = function (e, t, n, r) {
          if (
            (n || (n = 0),
            r || 0 === r || (r = this.length),
            t >= e.length && (t = e.length),
            t || (t = 0),
            r > 0 && r < n && (r = n),
            r === n)
          )
            return 0;
          if (0 === e.length || 0 === this.length) return 0;
          if (t < 0) throw new RangeError("targetStart out of bounds");
          if (n < 0 || n >= this.length)
            throw new RangeError("sourceStart out of bounds");
          if (r < 0) throw new RangeError("sourceEnd out of bounds");
          r > this.length && (r = this.length),
            e.length - t < r - n && (r = e.length - t + n);
          var i,
            o = r - n;
          if (this === e && n < t && t < r)
            for (i = o - 1; i >= 0; --i) e[i + t] = this[i + n];
          else if (o < 1e3 || !a.TYPED_ARRAY_SUPPORT)
            for (i = 0; i < o; ++i) e[i + t] = this[i + n];
          else Uint8Array.prototype.set.call(e, this.subarray(n, n + o), t);
          return o;
        }),
        (a.prototype.fill = function (e, t, n, r) {
          if ("string" == typeof e) {
            if (
              ("string" == typeof t
                ? ((r = t), (t = 0), (n = this.length))
                : "string" == typeof n && ((r = n), (n = this.length)),
              1 === e.length)
            ) {
              var i = e.charCodeAt(0);
              i < 256 && (e = i);
            }
            if (void 0 !== r && "string" != typeof r)
              throw new TypeError("encoding must be a string");
            if ("string" == typeof r && !a.isEncoding(r))
              throw new TypeError("Unknown encoding: " + r);
          } else "number" == typeof e && (e &= 255);
          if (t < 0 || this.length < t || this.length < n)
            throw new RangeError("Out of range index");
          if (n <= t) return this;
          (t >>>= 0), (n = void 0 === n ? this.length : n >>> 0), e || (e = 0);
          var o;
          if ("number" == typeof e) for (o = t; o < n; ++o) this[o] = e;
          else {
            var u = a.isBuffer(e) ? e : W(new a(e, r).toString()),
              l = u.length;
            for (o = 0; o < n - t; ++o) this[o + t] = u[o % l];
          }
          return this;
        });
      var te = /[^+\/0-9A-Za-z-_]/g;
    }).call(
      t,
      (function () {
        return this;
      })()
    );
  },
  function (e, t) {
    "use strict";
    function n(e) {
      var t = e.length;
      if (t % 4 > 0)
        throw new Error("Invalid string. Length must be a multiple of 4");
      return "=" === e[t - 2] ? 2 : "=" === e[t - 1] ? 1 : 0;
    }
    function r(e) {
      return (3 * e.length) / 4 - n(e);
    }
    function i(e) {
      var t,
        r,
        i,
        o,
        a,
        u = e.length;
      (o = n(e)), (a = new f((3 * u) / 4 - o)), (r = o > 0 ? u - 4 : u);
      var l = 0;
      for (t = 0; t < r; t += 4)
        (i =
          (s[e.charCodeAt(t)] << 18) |
          (s[e.charCodeAt(t + 1)] << 12) |
          (s[e.charCodeAt(t + 2)] << 6) |
          s[e.charCodeAt(t + 3)]),
          (a[l++] = (i >> 16) & 255),
          (a[l++] = (i >> 8) & 255),
          (a[l++] = 255 & i);
      return (
        2 === o
          ? ((i = (s[e.charCodeAt(t)] << 2) | (s[e.charCodeAt(t + 1)] >> 4)),
            (a[l++] = 255 & i))
          : 1 === o &&
            ((i =
              (s[e.charCodeAt(t)] << 10) |
              (s[e.charCodeAt(t + 1)] << 4) |
              (s[e.charCodeAt(t + 2)] >> 2)),
            (a[l++] = (i >> 8) & 255),
            (a[l++] = 255 & i)),
        a
      );
    }
    function o(e) {
      return (
        l[(e >> 18) & 63] + l[(e >> 12) & 63] + l[(e >> 6) & 63] + l[63 & e]
      );
    }
    function a(e, t, n) {
      for (var r, i = [], a = t; a < n; a += 3)
        (r = (e[a] << 16) + (e[a + 1] << 8) + e[a + 2]), i.push(o(r));
      return i.join("");
    }
    function u(e) {
      for (
        var t,
          n = e.length,
          r = n % 3,
          i = "",
          o = [],
          u = 16383,
          s = 0,
          f = n - r;
        s < f;
        s += u
      )
        o.push(a(e, s, s + u > f ? f : s + u));
      return (
        1 === r
          ? ((t = e[n - 1]),
            (i += l[t >> 2]),
            (i += l[(t << 4) & 63]),
            (i += "=="))
          : 2 === r &&
            ((t = (e[n - 2] << 8) + e[n - 1]),
            (i += l[t >> 10]),
            (i += l[(t >> 4) & 63]),
            (i += l[(t << 2) & 63]),
            (i += "=")),
        o.push(i),
        o.join("")
      );
    }
    (t.byteLength = r), (t.toByteArray = i), (t.fromByteArray = u);
    for (
      var l = [],
        s = [],
        f = "undefined" != typeof Uint8Array ? Uint8Array : Array,
        c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
        d = 0,
        p = c.length;
      d < p;
      ++d
    )
      (l[d] = c[d]), (s[c.charCodeAt(d)] = d);
    (s["-".charCodeAt(0)] = 62), (s["_".charCodeAt(0)] = 63);
  },
  function (e, t) {
    (t.read = function (e, t, n, r, i) {
      var o,
        a,
        u = 8 * i - r - 1,
        l = (1 << u) - 1,
        s = l >> 1,
        f = -7,
        c = n ? i - 1 : 0,
        d = n ? -1 : 1,
        p = e[t + c];
      for (
        c += d, o = p & ((1 << -f) - 1), p >>= -f, f += u;
        f > 0;
        o = 256 * o + e[t + c], c += d, f -= 8
      );
      for (
        a = o & ((1 << -f) - 1), o >>= -f, f += r;
        f > 0;
        a = 256 * a + e[t + c], c += d, f -= 8
      );
      if (0 === o) o = 1 - s;
      else {
        if (o === l) return a ? NaN : (p ? -1 : 1) * (1 / 0);
        (a += Math.pow(2, r)), (o -= s);
      }
      return (p ? -1 : 1) * a * Math.pow(2, o - r);
    }),
      (t.write = function (e, t, n, r, i, o) {
        var a,
          u,
          l,
          s = 8 * o - i - 1,
          f = (1 << s) - 1,
          c = f >> 1,
          d = 23 === i ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
          p = r ? 0 : o - 1,
          h = r ? 1 : -1,
          v = t < 0 || (0 === t && 1 / t < 0) ? 1 : 0;
        for (
          t = Math.abs(t),
            isNaN(t) || t === 1 / 0
              ? ((u = isNaN(t) ? 1 : 0), (a = f))
              : ((a = Math.floor(Math.log(t) / Math.LN2)),
                t * (l = Math.pow(2, -a)) < 1 && (a--, (l *= 2)),
                (t += a + c >= 1 ? d / l : d * Math.pow(2, 1 - c)),
                t * l >= 2 && (a++, (l /= 2)),
                a + c >= f
                  ? ((u = 0), (a = f))
                  : a + c >= 1
                  ? ((u = (t * l - 1) * Math.pow(2, i)), (a += c))
                  : ((u = t * Math.pow(2, c - 1) * Math.pow(2, i)), (a = 0)));
          i >= 8;
          e[n + p] = 255 & u, p += h, u /= 256, i -= 8
        );
        for (
          a = (a << i) | u, s += i;
          s > 0;
          e[n + p] = 255 & a, p += h, a /= 256, s -= 8
        );
        e[n + p - h] |= 128 * v;
      });
  },
  function (e, t) {
    var n = {}.toString;
    e.exports =
      Array.isArray ||
      function (e) {
        return "[object Array]" == n.call(e);
      };
  },
  function (e, t) {
    var n = {}.toString;
    e.exports =
      Array.isArray ||
      function (e) {
        return "[object Array]" == n.call(e);
      };
  },
  function (e, t) {
    var n,
      r = [
        0, 26, 44, 70, 100, 134, 172, 196, 242, 292, 346, 404, 466, 532, 581,
        655, 733, 815, 901, 991, 1085, 1156, 1258, 1364, 1474, 1588, 1706, 1828,
        1921, 2051, 2185, 2323, 2465, 2611, 2761, 2876, 3034, 3196, 3362, 3532,
        3706,
      ];
    (t.getSymbolSize = function (e) {
      if (!e) throw new Error('"version" cannot be null or undefined');
      if (e < 1 || e > 40)
        throw new Error('"version" should be in range from 1 to 40');
      return 4 * e + 17;
    }),
      (t.getSymbolTotalCodewords = function (e) {
        return r[e];
      }),
      (t.getBCHDigit = function (e) {
        for (var t = 0; 0 !== e; ) t++, (e >>>= 1);
        return t;
      }),
      (t.setToSJISFunction = function (e) {
        if ("function" != typeof e)
          throw new Error('"toSJISFunc" is not a valid function.');
        n = e;
      }),
      (t.isKanjiModeEnabled = function () {
        return "undefined" != typeof n;
      }),
      (t.toSJIS = function (e) {
        return n(e);
      });
  },
  function (e, t) {
    function n(e) {
      if ("string" != typeof e) throw new Error("Param is not a string");
      var n = e.toLowerCase();
      switch (n) {
        case "l":
        case "low":
          return t.L;
        case "m":
        case "medium":
          return t.M;
        case "q":
        case "quartile":
          return t.Q;
        case "h":
        case "high":
          return t.H;
        default:
          throw new Error("Unknown EC Level: " + e);
      }
    }
    (t.L = {
      bit: 1,
    }),
      (t.M = {
        bit: 0,
      }),
      (t.Q = {
        bit: 3,
      }),
      (t.H = {
        bit: 2,
      }),
      (t.isValid = function (e) {
        return e && "undefined" != typeof e.bit && e.bit >= 0 && e.bit < 4;
      }),
      (t.from = function (e, r) {
        if (t.isValid(e)) return e;
        try {
          return n(e);
        } catch (e) {
          return r;
        }
      });
  },
  function (e, t) {
    function n() {
      (this.buffer = []), (this.length = 0);
    }
    (n.prototype = {
      get: function (e) {
        var t = Math.floor(e / 8);
        return 1 === ((this.buffer[t] >>> (7 - (e % 8))) & 1);
      },
      put: function (e, t) {
        for (var n = 0; n < t; n++)
          this.putBit(1 === ((e >>> (t - n - 1)) & 1));
      },
      getLengthInBits: function () {
        return this.length;
      },
      putBit: function (e) {
        var t = Math.floor(this.length / 8);
        this.buffer.length <= t && this.buffer.push(0),
          e && (this.buffer[t] |= 128 >>> this.length % 8),
          this.length++;
      },
    }),
      (e.exports = n);
  },
  function (e, t, n) {
    function r(e) {
      if (!e || e < 1)
        throw new Error("BitMatrix size must be defined and greater than 0");
      (this.size = e),
        (this.data = i.alloc(e * e)),
        (this.reservedBit = i.alloc(e * e));
    }
    var i = n(119);
    (r.prototype.set = function (e, t, n, r) {
      var i = e * this.size + t;
      (this.data[i] = n), r && (this.reservedBit[i] = !0);
    }),
      (r.prototype.get = function (e, t) {
        return this.data[e * this.size + t];
      }),
      (r.prototype.xor = function (e, t, n) {
        this.data[e * this.size + t] ^= n;
      }),
      (r.prototype.isReserved = function (e, t) {
        return this.reservedBit[e * this.size + t];
      }),
      (e.exports = r);
  },
  function (e, t, n) {
    var r = n(125).getSymbolSize;
    (t.getRowColCoords = function (e) {
      if (1 === e) return [];
      for (
        var t = Math.floor(e / 7) + 2,
          n = r(e),
          i = 145 === n ? 26 : 2 * Math.ceil((n - 13) / (2 * t - 2)),
          o = [n - 7],
          a = 1;
        a < t - 1;
        a++
      )
        o[a] = o[a - 1] - i;
      return o.push(6), o.reverse();
    }),
      (t.getPositions = function (e) {
        for (
          var n = [], r = t.getRowColCoords(e), i = r.length, o = 0;
          o < i;
          o++
        )
          for (var a = 0; a < i; a++)
            (0 === o && 0 === a) ||
              (0 === o && a === i - 1) ||
              (o === i - 1 && 0 === a) ||
              n.push([r[o], r[a]]);
        return n;
      });
  },
  function (e, t, n) {
    var r = n(125).getSymbolSize,
      i = 7;
    t.getPositions = function (e) {
      var t = r(e);
      return [
        [0, 0],
        [t - i, 0],
        [0, t - i],
      ];
    };
  },
  function (e, t) {
    function n(e, n, r) {
      switch (e) {
        case t.Patterns.PATTERN000:
          return (n + r) % 2 === 0;
        case t.Patterns.PATTERN001:
          return n % 2 === 0;
        case t.Patterns.PATTERN010:
          return r % 3 === 0;
        case t.Patterns.PATTERN011:
          return (n + r) % 3 === 0;
        case t.Patterns.PATTERN100:
          return (Math.floor(n / 2) + Math.floor(r / 3)) % 2 === 0;
        case t.Patterns.PATTERN101:
          return ((n * r) % 2) + ((n * r) % 3) === 0;
        case t.Patterns.PATTERN110:
          return (((n * r) % 2) + ((n * r) % 3)) % 2 === 0;
        case t.Patterns.PATTERN111:
          return (((n * r) % 3) + ((n + r) % 2)) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + e);
      }
    }
    t.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7,
    };
    var r = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10,
    };
    (t.isValid = function (e) {
      return null != e && "" !== e && !isNaN(e) && e >= 0 && e <= 7;
    }),
      (t.from = function (e) {
        return t.isValid(e) ? parseInt(e, 10) : void 0;
      }),
      (t.getPenaltyN1 = function (e) {
        for (
          var t = e.size, n = 0, i = 0, o = 0, a = null, u = null, l = 0;
          l < t;
          l++
        ) {
          (i = o = 0), (a = u = null);
          for (var s = 0; s < t; s++) {
            var f = e.get(l, s);
            f === a ? i++ : (i >= 5 && (n += r.N1 + (i - 5)), (a = f), (i = 1)),
              (f = e.get(s, l)),
              f === u
                ? o++
                : (o >= 5 && (n += r.N1 + (o - 5)), (u = f), (o = 1));
          }
          i >= 5 && (n += r.N1 + (i - 5)), o >= 5 && (n += r.N1 + (o - 5));
        }
        return n;
      }),
      (t.getPenaltyN2 = function (e) {
        for (var t = e.size, n = 0, i = 0; i < t - 1; i++)
          for (var o = 0; o < t - 1; o++) {
            var a =
              e.get(i, o) +
              e.get(i, o + 1) +
              e.get(i + 1, o) +
              e.get(i + 1, o + 1);
            (4 !== a && 0 !== a) || n++;
          }
        return n * r.N2;
      }),
      (t.getPenaltyN3 = function (e) {
        for (var t = e.size, n = 0, i = 0, o = 0, a = 0; a < t; a++) {
          i = o = 0;
          for (var u = 0; u < t; u++)
            (i = ((i << 1) & 2047) | e.get(a, u)),
              u >= 10 && (1488 === i || 93 === i) && n++,
              (o = ((o << 1) & 2047) | e.get(u, a)),
              u >= 10 && (1488 === o || 93 === o) && n++;
        }
        return n * r.N3;
      }),
      (t.getPenaltyN4 = function (e) {
        for (var t = 0, n = e.data.length, i = 0; i < n; i++) t += e.data[i];
        var o = Math.abs(Math.ceil((100 * t) / n / 5) - 10);
        return o * r.N4;
      }),
      (t.applyMask = function (e, t) {
        for (var r = t.size, i = 0; i < r; i++)
          for (var o = 0; o < r; o++)
            t.isReserved(o, i) || t.xor(o, i, n(e, o, i));
      }),
      (t.getBestMask = function (e, n) {
        for (
          var r = Object.keys(t.Patterns).length, i = 0, o = 1 / 0, a = 0;
          a < r;
          a++
        ) {
          n(a), t.applyMask(a, e);
          var u =
            t.getPenaltyN1(e) +
            t.getPenaltyN2(e) +
            t.getPenaltyN3(e) +
            t.getPenaltyN4(e);
          t.applyMask(a, e), u < o && ((o = u), (i = a));
        }
        return i;
      });
  },
  function (e, t, n) {
    var r = n(126),
      i = [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 4, 1, 2, 4, 4, 2, 4, 4, 4,
        2, 4, 6, 5, 2, 4, 6, 6, 2, 5, 8, 8, 4, 5, 8, 8, 4, 5, 8, 11, 4, 8, 10,
        11, 4, 9, 12, 16, 4, 9, 16, 16, 6, 10, 12, 18, 6, 10, 17, 16, 6, 11, 16,
        19, 6, 13, 18, 21, 7, 14, 21, 25, 8, 16, 20, 25, 8, 17, 23, 25, 9, 17,
        23, 34, 9, 18, 25, 30, 10, 20, 27, 32, 12, 21, 29, 35, 12, 23, 34, 37,
        12, 25, 34, 40, 13, 26, 35, 42, 14, 28, 38, 45, 15, 29, 40, 48, 16, 31,
        43, 51, 17, 33, 45, 54, 18, 35, 48, 57, 19, 37, 51, 60, 19, 38, 53, 63,
        20, 40, 56, 66, 21, 43, 59, 70, 22, 45, 62, 74, 24, 47, 65, 77, 25, 49,
        68, 81,
      ],
      o = [
        7, 10, 13, 17, 10, 16, 22, 28, 15, 26, 36, 44, 20, 36, 52, 64, 26, 48,
        72, 88, 36, 64, 96, 112, 40, 72, 108, 130, 48, 88, 132, 156, 60, 110,
        160, 192, 72, 130, 192, 224, 80, 150, 224, 264, 96, 176, 260, 308, 104,
        198, 288, 352, 120, 216, 320, 384, 132, 240, 360, 432, 144, 280, 408,
        480, 168, 308, 448, 532, 180, 338, 504, 588, 196, 364, 546, 650, 224,
        416, 600, 700, 224, 442, 644, 750, 252, 476, 690, 816, 270, 504, 750,
        900, 300, 560, 810, 960, 312, 588, 870, 1050, 336, 644, 952, 1110, 360,
        700, 1020, 1200, 390, 728, 1050, 1260, 420, 784, 1140, 1350, 450, 812,
        1200, 1440, 480, 868, 1290, 1530, 510, 924, 1350, 1620, 540, 980, 1440,
        1710, 570, 1036, 1530, 1800, 570, 1064, 1590, 1890, 600, 1120, 1680,
        1980, 630, 1204, 1770, 2100, 660, 1260, 1860, 2220, 720, 1316, 1950,
        2310, 750, 1372, 2040, 2430,
      ];
    (t.getBlocksCount = function (e, t) {
      switch (t) {
        case r.L:
          return i[4 * (e - 1) + 0];
        case r.M:
          return i[4 * (e - 1) + 1];
        case r.Q:
          return i[4 * (e - 1) + 2];
        case r.H:
          return i[4 * (e - 1) + 3];
        default:
          return;
      }
    }),
      (t.getTotalCodewordsCount = function (e, t) {
        switch (t) {
          case r.L:
            return o[4 * (e - 1) + 0];
          case r.M:
            return o[4 * (e - 1) + 1];
          case r.Q:
            return o[4 * (e - 1) + 2];
          case r.H:
            return o[4 * (e - 1) + 3];
          default:
            return;
        }
      });
  },
  function (e, t, n) {
    function r(e) {
      (this.genPoly = void 0),
        (this.degree = e),
        this.degree && this.initialize(this.degree);
    }
    var i = n(119),
      o = n(134),
      a = n(136).Buffer;
    (r.prototype.initialize = function (e) {
      (this.degree = e), (this.genPoly = o.generateECPolynomial(this.degree));
    }),
      (r.prototype.encode = function (e) {
        if (!this.genPoly) throw new Error("Encoder not initialized");
        var t = i.alloc(this.degree),
          n = a.concat([e, t], e.length + this.degree),
          r = o.mod(n, this.genPoly),
          u = this.degree - r.length;
        if (u > 0) {
          var l = i.alloc(this.degree);
          return r.copy(l, u), l;
        }
        return r;
      }),
      (e.exports = r);
  },
  function (e, t, n) {
    var r = n(119),
      i = n(135);
    (t.mul = function (e, t) {
      for (var n = r.alloc(e.length + t.length - 1), o = 0; o < e.length; o++)
        for (var a = 0; a < t.length; a++) n[o + a] ^= i.mul(e[o], t[a]);
      return n;
    }),
      (t.mod = function (e, t) {
        for (var n = r.from(e); n.length - t.length >= 0; ) {
          for (var o = n[0], a = 0; a < t.length; a++) n[a] ^= i.mul(t[a], o);
          for (var u = 0; u < n.length && 0 === n[u]; ) u++;
          n = n.slice(u);
        }
        return n;
      }),
      (t.generateECPolynomial = function (e) {
        for (var n = r.from([1]), o = 0; o < e; o++)
          n = t.mul(n, [1, i.exp(o)]);
        return n;
      });
  },
  function (e, t, n) {
    var r = n(119),
      i = r.alloc(512),
      o = r.alloc(256);
    !(function () {
      for (var e = 1, t = 0; t < 255; t++)
        (i[t] = e), (o[e] = t), (e <<= 1), 256 & e && (e ^= 285);
      for (t = 255; t < 512; t++) i[t] = i[t - 255];
    })(),
      (t.log = function (e) {
        if (e < 1) throw new Error("log(" + e + ")");
        return o[e];
      }),
      (t.exp = function (e) {
        return i[e];
      }),
      (t.mul = function (e, t) {
        return 0 === e || 0 === t ? 0 : i[o[e] + o[t]];
      });
  },
  function (e, t, n) {
    (function (e) {
      "use strict";
      function r() {
        try {
          var e = new Uint8Array(1),
            t = {
              foo: function () {
                return 42;
              },
            };
          return (
            Object.setPrototypeOf(t, Uint8Array.prototype),
            Object.setPrototypeOf(e, t),
            42 === e.foo()
          );
        } catch (e) {
          return !1;
        }
      }
      function i(t) {
        if (t > $)
          throw new RangeError(
            'The value "' + t + '" is invalid for option "size"'
          );
        var n = new Uint8Array(t);
        return Object.setPrototypeOf(n, e.prototype), n;
      }
      function e(e, t, n) {
        if ("number" == typeof e) {
          if ("string" == typeof t)
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          return l(e);
        }
        return o(e, t, n);
      }
      function o(t, n, r) {
        if ("string" == typeof t) return s(t, n);
        if (ArrayBuffer.isView(t)) return f(t);
        if (null == t)
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
              typeof t
          );
        if (K(t, ArrayBuffer) || (t && K(t.buffer, ArrayBuffer)))
          return c(t, n, r);
        if ("number" == typeof t)
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        var i = t.valueOf && t.valueOf();
        if (null != i && i !== t) return e.from(i, n, r);
        var o = d(t);
        if (o) return o;
        if (
          "undefined" != typeof Symbol &&
          null != Symbol.toPrimitive &&
          "function" == typeof t[Symbol.toPrimitive]
        )
          return e.from(t[Symbol.toPrimitive]("string"), n, r);
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " +
            typeof t
        );
      }
      function a(e) {
        if ("number" != typeof e)
          throw new TypeError('"size" argument must be of type number');
        if (e < 0)
          throw new RangeError(
            'The value "' + e + '" is invalid for option "size"'
          );
      }
      function u(e, t, n) {
        return (
          a(e),
          e <= 0
            ? i(e)
            : void 0 !== t
            ? "string" == typeof n
              ? i(e).fill(t, n)
              : i(e).fill(t)
            : i(e)
        );
      }
      function l(e) {
        return a(e), i(e < 0 ? 0 : 0 | p(e));
      }
      function s(t, n) {
        if (
          (("string" == typeof n && "" !== n) || (n = "utf8"), !e.isEncoding(n))
        )
          throw new TypeError("Unknown encoding: " + n);
        var r = 0 | v(t, n),
          o = i(r),
          a = o.write(t, n);
        return a !== r && (o = o.slice(0, a)), o;
      }
      function f(e) {
        for (
          var t = e.length < 0 ? 0 : 0 | p(e.length), n = i(t), r = 0;
          r < t;
          r += 1
        )
          n[r] = 255 & e[r];
        return n;
      }
      function c(t, n, r) {
        if (n < 0 || t.byteLength < n)
          throw new RangeError('"offset" is outside of buffer bounds');
        if (t.byteLength < n + (r || 0))
          throw new RangeError('"length" is outside of buffer bounds');
        var i;
        return (
          (i =
            void 0 === n && void 0 === r
              ? new Uint8Array(t)
              : void 0 === r
              ? new Uint8Array(t, n)
              : new Uint8Array(t, n, r)),
          Object.setPrototypeOf(i, e.prototype),
          i
        );
      }
      function d(t) {
        if (e.isBuffer(t)) {
          var n = 0 | p(t.length),
            r = i(n);
          return 0 === r.length ? r : (t.copy(r, 0, 0, n), r);
        }
        return void 0 !== t.length
          ? "number" != typeof t.length || W(t.length)
            ? i(0)
            : f(t)
          : "Buffer" === t.type && Array.isArray(t.data)
          ? f(t.data)
          : void 0;
      }
      function p(e) {
        if (e >= $)
          throw new RangeError(
            "Attempt to allocate Buffer larger than maximum size: 0x" +
              $.toString(16) +
              " bytes"
          );
        return 0 | e;
      }
      function h(t) {
        return +t != t && (t = 0), e.alloc(+t);
      }
      function v(t, n) {
        if (e.isBuffer(t)) return t.length;
        if (ArrayBuffer.isView(t) || K(t, ArrayBuffer)) return t.byteLength;
        if ("string" != typeof t)
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' +
              typeof t
          );
        var r = t.length,
          i = arguments.length > 2 && arguments[2] === !0;
        if (!i && 0 === r) return 0;
        for (var o = !1; ; )
          switch (n) {
            case "ascii":
            case "latin1":
            case "binary":
              return r;
            case "utf8":
            case "utf-8":
              return B(t).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return 2 * r;
            case "hex":
              return r >>> 1;
            case "base64":
              return q(t).length;
            default:
              if (o) return i ? -1 : B(t).length;
              (n = ("" + n).toLowerCase()), (o = !0);
          }
      }
      function y(e, t, n) {
        var r = !1;
        if (((void 0 === t || t < 0) && (t = 0), t > this.length)) return "";
        if (((void 0 === n || n > this.length) && (n = this.length), n <= 0))
          return "";
        if (((n >>>= 0), (t >>>= 0), n <= t)) return "";
        for (e || (e = "utf8"); ; )
          switch (e) {
            case "hex":
              return I(this, t, n);
            case "utf8":
            case "utf-8":
              return P(this, t, n);
            case "ascii":
              return C(this, t, n);
            case "latin1":
            case "binary":
              return R(this, t, n);
            case "base64":
              return T(this, t, n);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return M(this, t, n);
            default:
              if (r) throw new TypeError("Unknown encoding: " + e);
              (e = (e + "").toLowerCase()), (r = !0);
          }
      }
      function m(e, t, n) {
        var r = e[t];
        (e[t] = e[n]), (e[n] = r);
      }
      function g(t, n, r, i, o) {
        if (0 === t.length) return -1;
        if (
          ("string" == typeof r
            ? ((i = r), (r = 0))
            : r > 2147483647
            ? (r = 2147483647)
            : r < -2147483648 && (r = -2147483648),
          (r = +r),
          W(r) && (r = o ? 0 : t.length - 1),
          r < 0 && (r = t.length + r),
          r >= t.length)
        ) {
          if (o) return -1;
          r = t.length - 1;
        } else if (r < 0) {
          if (!o) return -1;
          r = 0;
        }
        if (("string" == typeof n && (n = e.from(n, i)), e.isBuffer(n)))
          return 0 === n.length ? -1 : b(t, n, r, i, o);
        if ("number" == typeof n)
          return (
            (n &= 255),
            "function" == typeof Uint8Array.prototype.indexOf
              ? o
                ? Uint8Array.prototype.indexOf.call(t, n, r)
                : Uint8Array.prototype.lastIndexOf.call(t, n, r)
              : b(t, [n], r, i, o)
          );
        throw new TypeError("val must be string, number or Buffer");
      }
      function b(e, t, n, r, i) {
        function o(e, t) {
          return 1 === a ? e[t] : e.readUInt16BE(t * a);
        }
        var a = 1,
          u = e.length,
          l = t.length;
        if (
          void 0 !== r &&
          ((r = String(r).toLowerCase()),
          "ucs2" === r || "ucs-2" === r || "utf16le" === r || "utf-16le" === r)
        ) {
          if (e.length < 2 || t.length < 2) return -1;
          (a = 2), (u /= 2), (l /= 2), (n /= 2);
        }
        var s;
        if (i) {
          var f = -1;
          for (s = n; s < u; s++)
            if (o(e, s) === o(t, f === -1 ? 0 : s - f)) {
              if ((f === -1 && (f = s), s - f + 1 === l)) return f * a;
            } else f !== -1 && (s -= s - f), (f = -1);
        } else
          for (n + l > u && (n = u - l), s = n; s >= 0; s--) {
            for (var c = !0, d = 0; d < l; d++)
              if (o(e, s + d) !== o(t, d)) {
                c = !1;
                break;
              }
            if (c) return s;
          }
        return -1;
      }
      function _(e, t, n, r) {
        n = Number(n) || 0;
        var i = e.length - n;
        r ? ((r = Number(r)), r > i && (r = i)) : (r = i);
        var o = t.length;
        r > o / 2 && (r = o / 2);
        for (var a = 0; a < r; ++a) {
          var u = parseInt(t.substr(2 * a, 2), 16);
          if (W(u)) return a;
          e[n + a] = u;
        }
        return a;
      }
      function w(e, t, n, r) {
        return Y(B(t, e.length - n), e, n, r);
      }
      function E(e, t, n, r) {
        return Y(D(t), e, n, r);
      }
      function S(e, t, n, r) {
        return E(e, t, n, r);
      }
      function k(e, t, n, r) {
        return Y(q(t), e, n, r);
      }
      function x(e, t, n, r) {
        return Y(F(t, e.length - n), e, n, r);
      }
      function T(e, t, n) {
        return 0 === t && n === e.length
          ? H.fromByteArray(e)
          : H.fromByteArray(e.slice(t, n));
      }
      function P(e, t, n) {
        n = Math.min(e.length, n);
        for (var r = [], i = t; i < n; ) {
          var o = e[i],
            a = null,
            u = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
          if (i + u <= n) {
            var l, s, f, c;
            switch (u) {
              case 1:
                o < 128 && (a = o);
                break;
              case 2:
                (l = e[i + 1]),
                  128 === (192 & l) &&
                    ((c = ((31 & o) << 6) | (63 & l)), c > 127 && (a = c));
                break;
              case 3:
                (l = e[i + 1]),
                  (s = e[i + 2]),
                  128 === (192 & l) &&
                    128 === (192 & s) &&
                    ((c = ((15 & o) << 12) | ((63 & l) << 6) | (63 & s)),
                    c > 2047 && (c < 55296 || c > 57343) && (a = c));
                break;
              case 4:
                (l = e[i + 1]),
                  (s = e[i + 2]),
                  (f = e[i + 3]),
                  128 === (192 & l) &&
                    128 === (192 & s) &&
                    128 === (192 & f) &&
                    ((c =
                      ((15 & o) << 18) |
                      ((63 & l) << 12) |
                      ((63 & s) << 6) |
                      (63 & f)),
                    c > 65535 && c < 1114112 && (a = c));
            }
          }
          null === a
            ? ((a = 65533), (u = 1))
            : a > 65535 &&
              ((a -= 65536),
              r.push(((a >>> 10) & 1023) | 55296),
              (a = 56320 | (1023 & a))),
            r.push(a),
            (i += u);
        }
        return O(r);
      }
      function O(e) {
        var t = e.length;
        if (t <= J) return String.fromCharCode.apply(String, e);
        for (var n = "", r = 0; r < t; )
          n += String.fromCharCode.apply(String, e.slice(r, (r += J)));
        return n;
      }
      function C(e, t, n) {
        var r = "";
        n = Math.min(e.length, n);
        for (var i = t; i < n; ++i) r += String.fromCharCode(127 & e[i]);
        return r;
      }
      function R(e, t, n) {
        var r = "";
        n = Math.min(e.length, n);
        for (var i = t; i < n; ++i) r += String.fromCharCode(e[i]);
        return r;
      }
      function I(e, t, n) {
        var r = e.length;
        (!t || t < 0) && (t = 0), (!n || n < 0 || n > r) && (n = r);
        for (var i = "", o = t; o < n; ++o) i += G[e[o]];
        return i;
      }
      function M(e, t, n) {
        for (var r = e.slice(t, n), i = "", o = 0; o < r.length; o += 2)
          i += String.fromCharCode(r[o] + 256 * r[o + 1]);
        return i;
      }
      function A(e, t, n) {
        if (e % 1 !== 0 || e < 0) throw new RangeError("offset is not uint");
        if (e + t > n)
          throw new RangeError("Trying to access beyond buffer length");
      }
      function N(t, n, r, i, o, a) {
        if (!e.isBuffer(t))
          throw new TypeError('"buffer" argument must be a Buffer instance');
        if (n > o || n < a)
          throw new RangeError('"value" argument is out of bounds');
        if (r + i > t.length) throw new RangeError("Index out of range");
      }
      function j(e, t, n, r, i, o) {
        if (n + r > e.length) throw new RangeError("Index out of range");
        if (n < 0) throw new RangeError("Index out of range");
      }
      function L(e, t, n, r, i) {
        return (
          (t = +t),
          (n >>>= 0),
          i || j(e, t, n, 4, 3.4028234663852886e38, -3.4028234663852886e38),
          V.write(e, t, n, r, 23, 4),
          n + 4
        );
      }
      function z(e, t, n, r, i) {
        return (
          (t = +t),
          (n >>>= 0),
          i || j(e, t, n, 8, 1.7976931348623157e308, -1.7976931348623157e308),
          V.write(e, t, n, r, 52, 8),
          n + 8
        );
      }
      function U(e) {
        if (
          ((e = e.split("=")[0]), (e = e.trim().replace(X, "")), e.length < 2)
        )
          return "";
        for (; e.length % 4 !== 0; ) e += "=";
        return e;
      }
      function B(e, t) {
        t = t || 1 / 0;
        for (var n, r = e.length, i = null, o = [], a = 0; a < r; ++a) {
          if (((n = e.charCodeAt(a)), n > 55295 && n < 57344)) {
            if (!i) {
              if (n > 56319) {
                (t -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              if (a + 1 === r) {
                (t -= 3) > -1 && o.push(239, 191, 189);
                continue;
              }
              i = n;
              continue;
            }
            if (n < 56320) {
              (t -= 3) > -1 && o.push(239, 191, 189), (i = n);
              continue;
            }
            n = (((i - 55296) << 10) | (n - 56320)) + 65536;
          } else i && (t -= 3) > -1 && o.push(239, 191, 189);
          if (((i = null), n < 128)) {
            if ((t -= 1) < 0) break;
            o.push(n);
          } else if (n < 2048) {
            if ((t -= 2) < 0) break;
            o.push((n >> 6) | 192, (63 & n) | 128);
          } else if (n < 65536) {
            if ((t -= 3) < 0) break;
            o.push((n >> 12) | 224, ((n >> 6) & 63) | 128, (63 & n) | 128);
          } else {
            if (!(n < 1114112)) throw new Error("Invalid code point");
            if ((t -= 4) < 0) break;
            o.push(
              (n >> 18) | 240,
              ((n >> 12) & 63) | 128,
              ((n >> 6) & 63) | 128,
              (63 & n) | 128
            );
          }
        }
        return o;
      }
      function D(e) {
        for (var t = [], n = 0; n < e.length; ++n)
          t.push(255 & e.charCodeAt(n));
        return t;
      }
      function F(e, t) {
        for (var n, r, i, o = [], a = 0; a < e.length && !((t -= 2) < 0); ++a)
          (n = e.charCodeAt(a)),
            (r = n >> 8),
            (i = n % 256),
            o.push(i),
            o.push(r);
        return o;
      }
      function q(e) {
        return H.toByteArray(U(e));
      }
      function Y(e, t, n, r) {
        for (var i = 0; i < r && !(i + n >= t.length || i >= e.length); ++i)
          t[i + n] = e[i];
        return i;
      }
      function K(e, t) {
        return (
          e instanceof t ||
          (null != e &&
            null != e.constructor &&
            null != e.constructor.name &&
            e.constructor.name === t.name)
        );
      }
      function W(e) {
        return e !== e;
      }
      var H = n(121),
        V = n(122),
        Q =
          "function" == typeof Symbol && "function" == typeof Symbol.for
            ? Symbol.for("nodejs.util.inspect.custom")
            : null;
      (t.Buffer = e), (t.SlowBuffer = h), (t.INSPECT_MAX_BYTES = 50);
      var $ = 2147483647;
      (t.kMaxLength = $),
        (e.TYPED_ARRAY_SUPPORT = r()),
        e.TYPED_ARRAY_SUPPORT ||
          "undefined" == typeof console ||
          "function" != typeof console.error ||
          console.error(
            "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
          ),
        Object.defineProperty(e.prototype, "parent", {
          enumerable: !0,
          get: function () {
            if (e.isBuffer(this)) return this.buffer;
          },
        }),
        Object.defineProperty(e.prototype, "offset", {
          enumerable: !0,
          get: function () {
            if (e.isBuffer(this)) return this.byteOffset;
          },
        }),
        "undefined" != typeof Symbol &&
          null != Symbol.species &&
          e[Symbol.species] === e &&
          Object.defineProperty(e, Symbol.species, {
            value: null,
            configurable: !0,
            enumerable: !1,
            writable: !1,
          }),
        (e.poolSize = 8192),
        (e.from = function (e, t, n) {
          return o(e, t, n);
        }),
        Object.setPrototypeOf(e.prototype, Uint8Array.prototype),
        Object.setPrototypeOf(e, Uint8Array),
        (e.alloc = function (e, t, n) {
          return u(e, t, n);
        }),
        (e.allocUnsafe = function (e) {
          return l(e);
        }),
        (e.allocUnsafeSlow = function (e) {
          return l(e);
        }),
        (e.isBuffer = function (t) {
          return null != t && t._isBuffer === !0 && t !== e.prototype;
        }),
        (e.compare = function (t, n) {
          if (
            (K(t, Uint8Array) && (t = e.from(t, t.offset, t.byteLength)),
            K(n, Uint8Array) && (n = e.from(n, n.offset, n.byteLength)),
            !e.isBuffer(t) || !e.isBuffer(n))
          )
            throw new TypeError(
              'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
            );
          if (t === n) return 0;
          for (
            var r = t.length, i = n.length, o = 0, a = Math.min(r, i);
            o < a;
            ++o
          )
            if (t[o] !== n[o]) {
              (r = t[o]), (i = n[o]);
              break;
            }
          return r < i ? -1 : i < r ? 1 : 0;
        }),
        (e.isEncoding = function (e) {
          switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "latin1":
            case "binary":
            case "base64":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return !0;
            default:
              return !1;
          }
        }),
        (e.concat = function (t, n) {
          if (!Array.isArray(t))
            throw new TypeError('"list" argument must be an Array of Buffers');
          if (0 === t.length) return e.alloc(0);
          var r;
          if (void 0 === n)
            for (n = 0, r = 0; r < t.length; ++r) n += t[r].length;
          var i = e.allocUnsafe(n),
            o = 0;
          for (r = 0; r < t.length; ++r) {
            var a = t[r];
            if ((K(a, Uint8Array) && (a = e.from(a)), !e.isBuffer(a)))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            a.copy(i, o), (o += a.length);
          }
          return i;
        }),
        (e.byteLength = v),
        (e.prototype._isBuffer = !0),
        (e.prototype.swap16 = function () {
          var e = this.length;
          if (e % 2 !== 0)
            throw new RangeError("Buffer size must be a multiple of 16-bits");
          for (var t = 0; t < e; t += 2) m(this, t, t + 1);
          return this;
        }),
        (e.prototype.swap32 = function () {
          var e = this.length;
          if (e % 4 !== 0)
            throw new RangeError("Buffer size must be a multiple of 32-bits");
          for (var t = 0; t < e; t += 4)
            m(this, t, t + 3), m(this, t + 1, t + 2);
          return this;
        }),
        (e.prototype.swap64 = function () {
          var e = this.length;
          if (e % 8 !== 0)
            throw new RangeError("Buffer size must be a multiple of 64-bits");
          for (var t = 0; t < e; t += 8)
            m(this, t, t + 7),
              m(this, t + 1, t + 6),
              m(this, t + 2, t + 5),
              m(this, t + 3, t + 4);
          return this;
        }),
        (e.prototype.toString = function () {
          var e = this.length;
          return 0 === e
            ? ""
            : 0 === arguments.length
            ? P(this, 0, e)
            : y.apply(this, arguments);
        }),
        (e.prototype.toLocaleString = e.prototype.toString),
        (e.prototype.equals = function (t) {
          if (!e.isBuffer(t)) throw new TypeError("Argument must be a Buffer");
          return this === t || 0 === e.compare(this, t);
        }),
        (e.prototype.inspect = function () {
          var e = "",
            n = t.INSPECT_MAX_BYTES;
          return (
            (e = this.toString("hex", 0, n)
              .replace(/(.{2})/g, "$1 ")
              .trim()),
            this.length > n && (e += " ... "),
            "<Buffer " + e + ">"
          );
        }),
        Q && (e.prototype[Q] = e.prototype.inspect),
        (e.prototype.compare = function (t, n, r, i, o) {
          if (
            (K(t, Uint8Array) && (t = e.from(t, t.offset, t.byteLength)),
            !e.isBuffer(t))
          )
            throw new TypeError(
              'The "target" argument must be one of type Buffer or Uint8Array. Received type ' +
                typeof t
            );
          if (
            (void 0 === n && (n = 0),
            void 0 === r && (r = t ? t.length : 0),
            void 0 === i && (i = 0),
            void 0 === o && (o = this.length),
            n < 0 || r > t.length || i < 0 || o > this.length)
          )
            throw new RangeError("out of range index");
          if (i >= o && n >= r) return 0;
          if (i >= o) return -1;
          if (n >= r) return 1;
          if (((n >>>= 0), (r >>>= 0), (i >>>= 0), (o >>>= 0), this === t))
            return 0;
          for (
            var a = o - i,
              u = r - n,
              l = Math.min(a, u),
              s = this.slice(i, o),
              f = t.slice(n, r),
              c = 0;
            c < l;
            ++c
          )
            if (s[c] !== f[c]) {
              (a = s[c]), (u = f[c]);
              break;
            }
          return a < u ? -1 : u < a ? 1 : 0;
        }),
        (e.prototype.includes = function (e, t, n) {
          return this.indexOf(e, t, n) !== -1;
        }),
        (e.prototype.indexOf = function (e, t, n) {
          return g(this, e, t, n, !0);
        }),
        (e.prototype.lastIndexOf = function (e, t, n) {
          return g(this, e, t, n, !1);
        }),
        (e.prototype.write = function (e, t, n, r) {
          if (void 0 === t) (r = "utf8"), (n = this.length), (t = 0);
          else if (void 0 === n && "string" == typeof t)
            (r = t), (n = this.length), (t = 0);
          else {
            if (!isFinite(t))
              throw new Error(
                "Buffer.write(string, encoding, offset[, length]) is no longer supported"
              );
            (t >>>= 0),
              isFinite(n)
                ? ((n >>>= 0), void 0 === r && (r = "utf8"))
                : ((r = n), (n = void 0));
          }
          var i = this.length - t;
          if (
            ((void 0 === n || n > i) && (n = i),
            (e.length > 0 && (n < 0 || t < 0)) || t > this.length)
          )
            throw new RangeError("Attempt to write outside buffer bounds");
          r || (r = "utf8");
          for (var o = !1; ; )
            switch (r) {
              case "hex":
                return _(this, e, t, n);
              case "utf8":
              case "utf-8":
                return w(this, e, t, n);
              case "ascii":
                return E(this, e, t, n);
              case "latin1":
              case "binary":
                return S(this, e, t, n);
              case "base64":
                return k(this, e, t, n);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return x(this, e, t, n);
              default:
                if (o) throw new TypeError("Unknown encoding: " + r);
                (r = ("" + r).toLowerCase()), (o = !0);
            }
        }),
        (e.prototype.toJSON = function () {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0),
          };
        });
      var J = 4096;
      (e.prototype.slice = function (t, n) {
        var r = this.length;
        (t = ~~t),
          (n = void 0 === n ? r : ~~n),
          t < 0 ? ((t += r), t < 0 && (t = 0)) : t > r && (t = r),
          n < 0 ? ((n += r), n < 0 && (n = 0)) : n > r && (n = r),
          n < t && (n = t);
        var i = this.subarray(t, n);
        return Object.setPrototypeOf(i, e.prototype), i;
      }),
        (e.prototype.readUIntLE = function (e, t, n) {
          (e >>>= 0), (t >>>= 0), n || A(e, t, this.length);
          for (var r = this[e], i = 1, o = 0; ++o < t && (i *= 256); )
            r += this[e + o] * i;
          return r;
        }),
        (e.prototype.readUIntBE = function (e, t, n) {
          (e >>>= 0), (t >>>= 0), n || A(e, t, this.length);
          for (var r = this[e + --t], i = 1; t > 0 && (i *= 256); )
            r += this[e + --t] * i;
          return r;
        }),
        (e.prototype.readUInt8 = function (e, t) {
          return (e >>>= 0), t || A(e, 1, this.length), this[e];
        }),
        (e.prototype.readUInt16LE = function (e, t) {
          return (
            (e >>>= 0), t || A(e, 2, this.length), this[e] | (this[e + 1] << 8)
          );
        }),
        (e.prototype.readUInt16BE = function (e, t) {
          return (
            (e >>>= 0), t || A(e, 2, this.length), (this[e] << 8) | this[e + 1]
          );
        }),
        (e.prototype.readUInt32LE = function (e, t) {
          return (
            (e >>>= 0),
            t || A(e, 4, this.length),
            (this[e] | (this[e + 1] << 8) | (this[e + 2] << 16)) +
              16777216 * this[e + 3]
          );
        }),
        (e.prototype.readUInt32BE = function (e, t) {
          return (
            (e >>>= 0),
            t || A(e, 4, this.length),
            16777216 * this[e] +
              ((this[e + 1] << 16) | (this[e + 2] << 8) | this[e + 3])
          );
        }),
        (e.prototype.readIntLE = function (e, t, n) {
          (e >>>= 0), (t >>>= 0), n || A(e, t, this.length);
          for (var r = this[e], i = 1, o = 0; ++o < t && (i *= 256); )
            r += this[e + o] * i;
          return (i *= 128), r >= i && (r -= Math.pow(2, 8 * t)), r;
        }),
        (e.prototype.readIntBE = function (e, t, n) {
          (e >>>= 0), (t >>>= 0), n || A(e, t, this.length);
          for (var r = t, i = 1, o = this[e + --r]; r > 0 && (i *= 256); )
            o += this[e + --r] * i;
          return (i *= 128), o >= i && (o -= Math.pow(2, 8 * t)), o;
        }),
        (e.prototype.readInt8 = function (e, t) {
          return (
            (e >>>= 0),
            t || A(e, 1, this.length),
            128 & this[e] ? (255 - this[e] + 1) * -1 : this[e]
          );
        }),
        (e.prototype.readInt16LE = function (e, t) {
          (e >>>= 0), t || A(e, 2, this.length);
          var n = this[e] | (this[e + 1] << 8);
          return 32768 & n ? 4294901760 | n : n;
        }),
        (e.prototype.readInt16BE = function (e, t) {
          (e >>>= 0), t || A(e, 2, this.length);
          var n = this[e + 1] | (this[e] << 8);
          return 32768 & n ? 4294901760 | n : n;
        }),
        (e.prototype.readInt32LE = function (e, t) {
          return (
            (e >>>= 0),
            t || A(e, 4, this.length),
            this[e] |
              (this[e + 1] << 8) |
              (this[e + 2] << 16) |
              (this[e + 3] << 24)
          );
        }),
        (e.prototype.readInt32BE = function (e, t) {
          return (
            (e >>>= 0),
            t || A(e, 4, this.length),
            (this[e] << 24) |
              (this[e + 1] << 16) |
              (this[e + 2] << 8) |
              this[e + 3]
          );
        }),
        (e.prototype.readFloatLE = function (e, t) {
          return (
            (e >>>= 0), t || A(e, 4, this.length), V.read(this, e, !0, 23, 4)
          );
        }),
        (e.prototype.readFloatBE = function (e, t) {
          return (
            (e >>>= 0), t || A(e, 4, this.length), V.read(this, e, !1, 23, 4)
          );
        }),
        (e.prototype.readDoubleLE = function (e, t) {
          return (
            (e >>>= 0), t || A(e, 8, this.length), V.read(this, e, !0, 52, 8)
          );
        }),
        (e.prototype.readDoubleBE = function (e, t) {
          return (
            (e >>>= 0), t || A(e, 8, this.length), V.read(this, e, !1, 52, 8)
          );
        }),
        (e.prototype.writeUIntLE = function (e, t, n, r) {
          if (((e = +e), (t >>>= 0), (n >>>= 0), !r)) {
            var i = Math.pow(2, 8 * n) - 1;
            N(this, e, t, n, i, 0);
          }
          var o = 1,
            a = 0;
          for (this[t] = 255 & e; ++a < n && (o *= 256); )
            this[t + a] = (e / o) & 255;
          return t + n;
        }),
        (e.prototype.writeUIntBE = function (e, t, n, r) {
          if (((e = +e), (t >>>= 0), (n >>>= 0), !r)) {
            var i = Math.pow(2, 8 * n) - 1;
            N(this, e, t, n, i, 0);
          }
          var o = n - 1,
            a = 1;
          for (this[t + o] = 255 & e; --o >= 0 && (a *= 256); )
            this[t + o] = (e / a) & 255;
          return t + n;
        }),
        (e.prototype.writeUInt8 = function (e, t, n) {
          return (
            (e = +e),
            (t >>>= 0),
            n || N(this, e, t, 1, 255, 0),
            (this[t] = 255 & e),
            t + 1
          );
        }),
        (e.prototype.writeUInt16LE = function (e, t, n) {
          return (
            (e = +e),
            (t >>>= 0),
            n || N(this, e, t, 2, 65535, 0),
            (this[t] = 255 & e),
            (this[t + 1] = e >>> 8),
            t + 2
          );
        }),
        (e.prototype.writeUInt16BE = function (e, t, n) {
          return (
            (e = +e),
            (t >>>= 0),
            n || N(this, e, t, 2, 65535, 0),
            (this[t] = e >>> 8),
            (this[t + 1] = 255 & e),
            t + 2
          );
        }),
        (e.prototype.writeUInt32LE = function (e, t, n) {
          return (
            (e = +e),
            (t >>>= 0),
            n || N(this, e, t, 4, 4294967295, 0),
            (this[t + 3] = e >>> 24),
            (this[t + 2] = e >>> 16),
            (this[t + 1] = e >>> 8),
            (this[t] = 255 & e),
            t + 4
          );
        }),
        (e.prototype.writeUInt32BE = function (e, t, n) {
          return (
            (e = +e),
            (t >>>= 0),
            n || N(this, e, t, 4, 4294967295, 0),
            (this[t] = e >>> 24),
            (this[t + 1] = e >>> 16),
            (this[t + 2] = e >>> 8),
            (this[t + 3] = 255 & e),
            t + 4
          );
        }),
        (e.prototype.writeIntLE = function (e, t, n, r) {
          if (((e = +e), (t >>>= 0), !r)) {
            var i = Math.pow(2, 8 * n - 1);
            N(this, e, t, n, i - 1, -i);
          }
          var o = 0,
            a = 1,
            u = 0;
          for (this[t] = 255 & e; ++o < n && (a *= 256); )
            e < 0 && 0 === u && 0 !== this[t + o - 1] && (u = 1),
              (this[t + o] = (((e / a) >> 0) - u) & 255);
          return t + n;
        }),
        (e.prototype.writeIntBE = function (e, t, n, r) {
          if (((e = +e), (t >>>= 0), !r)) {
            var i = Math.pow(2, 8 * n - 1);
            N(this, e, t, n, i - 1, -i);
          }
          var o = n - 1,
            a = 1,
            u = 0;
          for (this[t + o] = 255 & e; --o >= 0 && (a *= 256); )
            e < 0 && 0 === u && 0 !== this[t + o + 1] && (u = 1),
              (this[t + o] = (((e / a) >> 0) - u) & 255);
          return t + n;
        }),
        (e.prototype.writeInt8 = function (e, t, n) {
          return (
            (e = +e),
            (t >>>= 0),
            n || N(this, e, t, 1, 127, -128),
            e < 0 && (e = 255 + e + 1),
            (this[t] = 255 & e),
            t + 1
          );
        }),
        (e.prototype.writeInt16LE = function (e, t, n) {
          return (
            (e = +e),
            (t >>>= 0),
            n || N(this, e, t, 2, 32767, -32768),
            (this[t] = 255 & e),
            (this[t + 1] = e >>> 8),
            t + 2
          );
        }),
        (e.prototype.writeInt16BE = function (e, t, n) {
          return (
            (e = +e),
            (t >>>= 0),
            n || N(this, e, t, 2, 32767, -32768),
            (this[t] = e >>> 8),
            (this[t + 1] = 255 & e),
            t + 2
          );
        }),
        (e.prototype.writeInt32LE = function (e, t, n) {
          return (
            (e = +e),
            (t >>>= 0),
            n || N(this, e, t, 4, 2147483647, -2147483648),
            (this[t] = 255 & e),
            (this[t + 1] = e >>> 8),
            (this[t + 2] = e >>> 16),
            (this[t + 3] = e >>> 24),
            t + 4
          );
        }),
        (e.prototype.writeInt32BE = function (e, t, n) {
          return (
            (e = +e),
            (t >>>= 0),
            n || N(this, e, t, 4, 2147483647, -2147483648),
            e < 0 && (e = 4294967295 + e + 1),
            (this[t] = e >>> 24),
            (this[t + 1] = e >>> 16),
            (this[t + 2] = e >>> 8),
            (this[t + 3] = 255 & e),
            t + 4
          );
        }),
        (e.prototype.writeFloatLE = function (e, t, n) {
          return L(this, e, t, !0, n);
        }),
        (e.prototype.writeFloatBE = function (e, t, n) {
          return L(this, e, t, !1, n);
        }),
        (e.prototype.writeDoubleLE = function (e, t, n) {
          return z(this, e, t, !0, n);
        }),
        (e.prototype.writeDoubleBE = function (e, t, n) {
          return z(this, e, t, !1, n);
        }),
        (e.prototype.copy = function (t, n, r, i) {
          if (!e.isBuffer(t))
            throw new TypeError("argument should be a Buffer");
          if (
            (r || (r = 0),
            i || 0 === i || (i = this.length),
            n >= t.length && (n = t.length),
            n || (n = 0),
            i > 0 && i < r && (i = r),
            i === r)
          )
            return 0;
          if (0 === t.length || 0 === this.length) return 0;
          if (n < 0) throw new RangeError("targetStart out of bounds");
          if (r < 0 || r >= this.length)
            throw new RangeError("Index out of range");
          if (i < 0) throw new RangeError("sourceEnd out of bounds");
          i > this.length && (i = this.length),
            t.length - n < i - r && (i = t.length - n + r);
          var o = i - r;
          if (
            this === t &&
            "function" == typeof Uint8Array.prototype.copyWithin
          )
            this.copyWithin(n, r, i);
          else if (this === t && r < n && n < i)
            for (var a = o - 1; a >= 0; --a) t[a + n] = this[a + r];
          else Uint8Array.prototype.set.call(t, this.subarray(r, i), n);
          return o;
        }),
        (e.prototype.fill = function (t, n, r, i) {
          if ("string" == typeof t) {
            if (
              ("string" == typeof n
                ? ((i = n), (n = 0), (r = this.length))
                : "string" == typeof r && ((i = r), (r = this.length)),
              void 0 !== i && "string" != typeof i)
            )
              throw new TypeError("encoding must be a string");
            if ("string" == typeof i && !e.isEncoding(i))
              throw new TypeError("Unknown encoding: " + i);
            if (1 === t.length) {
              var o = t.charCodeAt(0);
              (("utf8" === i && o < 128) || "latin1" === i) && (t = o);
            }
          } else
            "number" == typeof t
              ? (t &= 255)
              : "boolean" == typeof t && (t = Number(t));
          if (n < 0 || this.length < n || this.length < r)
            throw new RangeError("Out of range index");
          if (r <= n) return this;
          (n >>>= 0), (r = void 0 === r ? this.length : r >>> 0), t || (t = 0);
          var a;
          if ("number" == typeof t) for (a = n; a < r; ++a) this[a] = t;
          else {
            var u = e.isBuffer(t) ? t : e.from(t, i),
              l = u.length;
            if (0 === l)
              throw new TypeError(
                'The value "' + t + '" is invalid for argument "value"'
              );
            for (a = 0; a < r - n; ++a) this[a + n] = u[a % l];
          }
          return this;
        });
      var X = /[^+\/0-9A-Za-z-_]/g,
        G = (function () {
          for (
            var e = "0123456789abcdef", t = new Array(256), n = 0;
            n < 16;
            ++n
          )
            for (var r = 16 * n, i = 0; i < 16; ++i) t[r + i] = e[n] + e[i];
          return t;
        })();
    }).call(t, n(120).Buffer);
  },
  function (e, t, n) {
    function r(e, n, r) {
      for (var i = 1; i <= 40; i++) if (n <= t.getCapacity(i, r, e)) return i;
    }
    function i(e, t) {
      return f.getCharCountIndicator(e, t) + 4;
    }
    function o(e, t) {
      var n = 0;
      return (
        e.forEach(function (e) {
          var r = i(e.mode, t);
          n += r + e.getBitsLength();
        }),
        n
      );
    }
    function a(e, n) {
      for (var r = 1; r <= 40; r++) {
        var i = o(e, r);
        if (i <= t.getCapacity(r, n, f.MIXED)) return r;
      }
    }
    var u = n(125),
      l = n(132),
      s = n(126),
      f = n(138),
      c = n(139),
      d = n(124),
      p = 7973,
      h = u.getBCHDigit(p);
    (t.from = function (e, t) {
      return c.isValid(e) ? parseInt(e, 10) : t;
    }),
      (t.getCapacity = function (e, t, n) {
        if (!c.isValid(e)) throw new Error("Invalid QR Code version");
        "undefined" == typeof n && (n = f.BYTE);
        var r = u.getSymbolTotalCodewords(e),
          o = l.getTotalCodewordsCount(e, t),
          a = 8 * (r - o);
        if (n === f.MIXED) return a;
        var s = a - i(n, e);
        switch (n) {
          case f.NUMERIC:
            return Math.floor((s / 10) * 3);
          case f.ALPHANUMERIC:
            return Math.floor((s / 11) * 2);
          case f.KANJI:
            return Math.floor(s / 13);
          case f.BYTE:
          default:
            return Math.floor(s / 8);
        }
      }),
      (t.getBestVersionForData = function (e, t) {
        var n,
          i = s.from(t, s.M);
        if (d(e)) {
          if (e.length > 1) return a(e, i);
          if (0 === e.length) return 1;
          n = e[0];
        } else n = e;
        return r(n.mode, n.getLength(), i);
      }),
      (t.getEncodedBits = function (e) {
        if (!c.isValid(e) || e < 7) throw new Error("Invalid QR Code version");
        for (var t = e << 12; u.getBCHDigit(t) - h >= 0; )
          t ^= p << (u.getBCHDigit(t) - h);
        return (e << 12) | t;
      });
  },
  function (e, t, n) {
    function r(e) {
      if ("string" != typeof e) throw new Error("Param is not a string");
      var n = e.toLowerCase();
      switch (n) {
        case "numeric":
          return t.NUMERIC;
        case "alphanumeric":
          return t.ALPHANUMERIC;
        case "kanji":
          return t.KANJI;
        case "byte":
          return t.BYTE;
        default:
          throw new Error("Unknown mode: " + e);
      }
    }
    var i = n(139),
      o = n(140);
    (t.NUMERIC = {
      id: "Numeric",
      bit: 1,
      ccBits: [10, 12, 14],
    }),
      (t.ALPHANUMERIC = {
        id: "Alphanumeric",
        bit: 2,
        ccBits: [9, 11, 13],
      }),
      (t.BYTE = {
        id: "Byte",
        bit: 4,
        ccBits: [8, 16, 16],
      }),
      (t.KANJI = {
        id: "Kanji",
        bit: 8,
        ccBits: [8, 10, 12],
      }),
      (t.MIXED = {
        bit: -1,
      }),
      (t.getCharCountIndicator = function (e, t) {
        if (!e.ccBits) throw new Error("Invalid mode: " + e);
        if (!i.isValid(t)) throw new Error("Invalid version: " + t);
        return t >= 1 && t < 10
          ? e.ccBits[0]
          : t < 27
          ? e.ccBits[1]
          : e.ccBits[2];
      }),
      (t.getBestModeForData = function (e) {
        return o.testNumeric(e)
          ? t.NUMERIC
          : o.testAlphanumeric(e)
          ? t.ALPHANUMERIC
          : o.testKanji(e)
          ? t.KANJI
          : t.BYTE;
      }),
      (t.toString = function (e) {
        if (e && e.id) return e.id;
        throw new Error("Invalid mode");
      }),
      (t.isValid = function (e) {
        return e && e.bit && e.ccBits;
      }),
      (t.from = function (e, n) {
        if (t.isValid(e)) return e;
        try {
          return r(e);
        } catch (e) {
          return n;
        }
      });
  },
  function (e, t) {
    t.isValid = function (e) {
      return !isNaN(e) && e >= 1 && e <= 40;
    };
  },
  function (e, t) {
    var n = "[0-9]+",
      r = "[A-Z $%*+\\-./:]+",
      i =
        "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
    i = i.replace(/u/g, "\\u");
    var o = "(?:(?![A-Z0-9 $%*+\\-./:]|" + i + ")(?:.|[\r\n]))+";
    (t.KANJI = new RegExp(i, "g")),
      (t.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g")),
      (t.BYTE = new RegExp(o, "g")),
      (t.NUMERIC = new RegExp(n, "g")),
      (t.ALPHANUMERIC = new RegExp(r, "g"));
    var a = new RegExp("^" + i + "$"),
      u = new RegExp("^" + n + "$"),
      l = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
    (t.testKanji = function (e) {
      return a.test(e);
    }),
      (t.testNumeric = function (e) {
        return u.test(e);
      }),
      (t.testAlphanumeric = function (e) {
        return l.test(e);
      });
  },
  function (e, t, n) {
    var r = n(125),
      i = 1335,
      o = 21522,
      a = r.getBCHDigit(i);
    t.getEncodedBits = function (e, t) {
      for (var n = (e.bit << 3) | t, u = n << 10; r.getBCHDigit(u) - a >= 0; )
        u ^= i << (r.getBCHDigit(u) - a);
      return ((n << 10) | u) ^ o;
    };
  },
  function (e, t, n) {
    function r(e) {
      return unescape(encodeURIComponent(e)).length;
    }
    function i(e, t, n) {
      for (var r, i = []; null !== (r = e.exec(n)); )
        i.push({
          data: r[0],
          index: r.index,
          mode: t,
          length: r[0].length,
        });
      return i;
    }
    function o(e) {
      var t,
        n,
        r = i(y.NUMERIC, c.NUMERIC, e),
        o = i(y.ALPHANUMERIC, c.ALPHANUMERIC, e);
      m.isKanjiModeEnabled()
        ? ((t = i(y.BYTE, c.BYTE, e)), (n = i(y.KANJI, c.KANJI, e)))
        : ((t = i(y.BYTE_KANJI, c.BYTE, e)), (n = []));
      var a = r.concat(o, t, n);
      return a
        .sort(function (e, t) {
          return e.index - t.index;
        })
        .map(function (e) {
          return {
            data: e.data,
            mode: e.mode,
            length: e.length,
          };
        });
    }
    function a(e, t) {
      switch (t) {
        case c.NUMERIC:
          return d.getBitsLength(e);
        case c.ALPHANUMERIC:
          return p.getBitsLength(e);
        case c.KANJI:
          return v.getBitsLength(e);
        case c.BYTE:
          return h.getBitsLength(e);
      }
    }
    function u(e) {
      return e.reduce(function (e, t) {
        var n = e.length - 1 >= 0 ? e[e.length - 1] : null;
        return n && n.mode === t.mode
          ? ((e[e.length - 1].data += t.data), e)
          : (e.push(t), e);
      }, []);
    }
    function l(e) {
      for (var t = [], n = 0; n < e.length; n++) {
        var i = e[n];
        switch (i.mode) {
          case c.NUMERIC:
            t.push([
              i,
              {
                data: i.data,
                mode: c.ALPHANUMERIC,
                length: i.length,
              },
              {
                data: i.data,
                mode: c.BYTE,
                length: i.length,
              },
            ]);
            break;
          case c.ALPHANUMERIC:
            t.push([
              i,
              {
                data: i.data,
                mode: c.BYTE,
                length: i.length,
              },
            ]);
            break;
          case c.KANJI:
            t.push([
              i,
              {
                data: i.data,
                mode: c.BYTE,
                length: r(i.data),
              },
            ]);
            break;
          case c.BYTE:
            t.push([
              {
                data: i.data,
                mode: c.BYTE,
                length: r(i.data),
              },
            ]);
        }
      }
      return t;
    }
    function s(e, t) {
      for (
        var n = {},
          r = {
            start: {},
          },
          i = ["start"],
          o = 0;
        o < e.length;
        o++
      ) {
        for (var u = e[o], l = [], s = 0; s < u.length; s++) {
          var f = u[s],
            d = "" + o + s;
          l.push(d),
            (n[d] = {
              node: f,
              lastCount: 0,
            }),
            (r[d] = {});
          for (var p = 0; p < i.length; p++) {
            var h = i[p];
            n[h] && n[h].node.mode === f.mode
              ? ((r[h][d] =
                  a(n[h].lastCount + f.length, f.mode) -
                  a(n[h].lastCount, f.mode)),
                (n[h].lastCount += f.length))
              : (n[h] && (n[h].lastCount = f.length),
                (r[h][d] =
                  a(f.length, f.mode) +
                  4 +
                  c.getCharCountIndicator(f.mode, t)));
          }
        }
        i = l;
      }
      for (p = 0; p < i.length; p++) r[i[p]].end = 0;
      return {
        map: r,
        table: n,
      };
    }
    function f(e, t) {
      var n,
        r = c.getBestModeForData(e);
      if (((n = c.from(t, r)), n !== c.BYTE && n.bit < r.bit))
        throw new Error(
          '"' +
            e +
            '" cannot be encoded with mode ' +
            c.toString(n) +
            ".\n Suggested mode is: " +
            c.toString(r)
        );
      switch ((n !== c.KANJI || m.isKanjiModeEnabled() || (n = c.BYTE), n)) {
        case c.NUMERIC:
          return new d(e);
        case c.ALPHANUMERIC:
          return new p(e);
        case c.KANJI:
          return new v(e);
        case c.BYTE:
          return new h(e);
      }
    }
    var c = n(138),
      d = n(143),
      p = n(144),
      h = n(145),
      v = n(146),
      y = n(140),
      m = n(125),
      g = n(147);
    (t.fromArray = function (e) {
      return e.reduce(function (e, t) {
        return (
          "string" == typeof t
            ? e.push(f(t, null))
            : t.data && e.push(f(t.data, t.mode)),
          e
        );
      }, []);
    }),
      (t.fromString = function (e, n) {
        for (
          var r = o(e, m.isKanjiModeEnabled()),
            i = l(r),
            a = s(i, n),
            f = g.find_path(a.map, "start", "end"),
            c = [],
            d = 1;
          d < f.length - 1;
          d++
        )
          c.push(a.table[f[d]].node);
        return t.fromArray(u(c));
      }),
      (t.rawSplit = function (e) {
        return t.fromArray(o(e, m.isKanjiModeEnabled()));
      });
  },
  function (e, t, n) {
    function r(e) {
      (this.mode = i.NUMERIC), (this.data = e.toString());
    }
    var i = n(138);
    (r.getBitsLength = function (e) {
      return 10 * Math.floor(e / 3) + (e % 3 ? (e % 3) * 3 + 1 : 0);
    }),
      (r.prototype.getLength = function () {
        return this.data.length;
      }),
      (r.prototype.getBitsLength = function () {
        return r.getBitsLength(this.data.length);
      }),
      (r.prototype.write = function (e) {
        var t, n, r;
        for (t = 0; t + 3 <= this.data.length; t += 3)
          (n = this.data.substr(t, 3)), (r = parseInt(n, 10)), e.put(r, 10);
        var i = this.data.length - t;
        i > 0 &&
          ((n = this.data.substr(t)),
          (r = parseInt(n, 10)),
          e.put(r, 3 * i + 1));
      }),
      (e.exports = r);
  },
  function (e, t, n) {
    function r(e) {
      (this.mode = i.ALPHANUMERIC), (this.data = e);
    }
    var i = n(138),
      o = [
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
        " ",
        "$",
        "%",
        "*",
        "+",
        "-",
        ".",
        "/",
        ":",
      ];
    (r.getBitsLength = function (e) {
      return 11 * Math.floor(e / 2) + 6 * (e % 2);
    }),
      (r.prototype.getLength = function () {
        return this.data.length;
      }),
      (r.prototype.getBitsLength = function () {
        return r.getBitsLength(this.data.length);
      }),
      (r.prototype.write = function (e) {
        var t;
        for (t = 0; t + 2 <= this.data.length; t += 2) {
          var n = 45 * o.indexOf(this.data[t]);
          (n += o.indexOf(this.data[t + 1])), e.put(n, 11);
        }
        this.data.length % 2 && e.put(o.indexOf(this.data[t]), 6);
      }),
      (e.exports = r);
  },
  function (e, t, n) {
    function r(e) {
      (this.mode = o.BYTE), (this.data = i.from(e));
    }
    var i = n(119),
      o = n(138);
    (r.getBitsLength = function (e) {
      return 8 * e;
    }),
      (r.prototype.getLength = function () {
        return this.data.length;
      }),
      (r.prototype.getBitsLength = function () {
        return r.getBitsLength(this.data.length);
      }),
      (r.prototype.write = function (e) {
        for (var t = 0, n = this.data.length; t < n; t++)
          e.put(this.data[t], 8);
      }),
      (e.exports = r);
  },
  function (e, t, n) {
    function r(e) {
      (this.mode = i.KANJI), (this.data = e);
    }
    var i = n(138),
      o = n(125);
    (r.getBitsLength = function (e) {
      return 13 * e;
    }),
      (r.prototype.getLength = function () {
        return this.data.length;
      }),
      (r.prototype.getBitsLength = function () {
        return r.getBitsLength(this.data.length);
      }),
      (r.prototype.write = function (e) {
        var t;
        for (t = 0; t < this.data.length; t++) {
          var n = o.toSJIS(this.data[t]);
          if (n >= 33088 && n <= 40956) n -= 33088;
          else {
            if (!(n >= 57408 && n <= 60351))
              throw new Error(
                "Invalid SJIS character: " +
                  this.data[t] +
                  "\nMake sure your charset is UTF-8"
              );
            n -= 49472;
          }
          (n = 192 * ((n >>> 8) & 255) + (255 & n)), e.put(n, 13);
        }
      }),
      (e.exports = r);
  },
  function (e, t, n) {
    "use strict";
    var r = {
      single_source_shortest_paths: function (e, t, n) {
        var i = {},
          o = {};
        o[t] = 0;
        var a = r.PriorityQueue.make();
        a.push(t, 0);
        for (var u, l, s, f, c, d, p, h, v; !a.empty(); ) {
          (u = a.pop()), (l = u.value), (f = u.cost), (c = e[l] || {});
          for (s in c)
            c.hasOwnProperty(s) &&
              ((d = c[s]),
              (p = f + d),
              (h = o[s]),
              (v = "undefined" == typeof o[s]),
              (v || h > p) && ((o[s] = p), a.push(s, p), (i[s] = l)));
        }
        if ("undefined" != typeof n && "undefined" == typeof o[n]) {
          var y = ["Could not find a path from ", t, " to ", n, "."].join("");
          throw new Error(y);
        }
        return i;
      },
      extract_shortest_path_from_predecessor_list: function (e, t) {
        for (var n, r = [], i = t; i; ) r.push(i), (n = e[i]), (i = e[i]);
        return r.reverse(), r;
      },
      find_path: function (e, t, n) {
        var i = r.single_source_shortest_paths(e, t, n);
        return r.extract_shortest_path_from_predecessor_list(i, n);
      },
      PriorityQueue: {
        make: function (e) {
          var t,
            n = r.PriorityQueue,
            i = {};
          e = e || {};
          for (t in n) n.hasOwnProperty(t) && (i[t] = n[t]);
          return (i.queue = []), (i.sorter = e.sorter || n.default_sorter), i;
        },
        default_sorter: function (e, t) {
          return e.cost - t.cost;
        },
        push: function (e, t) {
          var n = {
            value: e,
            cost: t,
          };
          this.queue.push(n), this.queue.sort(this.sorter);
        },
        pop: function () {
          return this.queue.shift();
        },
        empty: function () {
          return 0 === this.queue.length;
        },
      },
    };
    e.exports = r;
  },
  function (e, t, n) {
    function r(e, t, n) {
      e.clearRect(0, 0, t.width, t.height),
        t.style || (t.style = {}),
        (t.height = n),
        (t.width = n),
        (t.style.height = n + "px"),
        (t.style.width = n + "px");
    }
    function i() {
      try {
        return document.createElement("canvas");
      } catch (e) {
        throw new Error("You need to specify a canvas element");
      }
    }
    var o = n(149);
    (t.render = function (e, t, n) {
      var a = n,
        u = t;
      "undefined" != typeof a || (t && t.getContext) || ((a = t), (t = void 0)),
        t || (u = i()),
        (a = o.getOptions(a));
      var l = o.getImageWidth(e.modules.size, a),
        s = u.getContext("2d"),
        f = s.createImageData(l, l);
      return (
        o.qrToImageData(f.data, e, a), r(s, u, l), s.putImageData(f, 0, 0), u
      );
    }),
      (t.renderToDataURL = function (e, n, r) {
        var i = r;
        "undefined" != typeof i ||
          (n && n.getContext) ||
          ((i = n), (n = void 0)),
          i || (i = {});
        var o = t.render(e, n, i),
          a = i.type || "image/png",
          u = i.rendererOpts || {};
        return o.toDataURL(a, u.quality);
      });
  },
  function (e, t) {
    function n(e) {
      if (("number" == typeof e && (e = e.toString()), "string" != typeof e))
        throw new Error("Color should be defined as hex string");
      var t = e.slice().replace("#", "").split("");
      if (t.length < 3 || 5 === t.length || t.length > 8)
        throw new Error("Invalid hex color: " + e);
      (3 !== t.length && 4 !== t.length) ||
        (t = Array.prototype.concat.apply(
          [],
          t.map(function (e) {
            return [e, e];
          })
        )),
        6 === t.length && t.push("F", "F");
      var n = parseInt(t.join(""), 16);
      return {
        r: (n >> 24) & 255,
        g: (n >> 16) & 255,
        b: (n >> 8) & 255,
        a: 255 & n,
        hex: "#" + t.slice(0, 6).join(""),
      };
    }
    (t.getOptions = function (e) {
      e || (e = {}), e.color || (e.color = {});
      var t =
          "undefined" == typeof e.margin || null === e.margin || e.margin < 0
            ? 4
            : e.margin,
        r = e.width && e.width >= 21 ? e.width : void 0,
        i = e.scale || 4;
      return {
        width: r,
        scale: r ? 4 : i,
        margin: t,
        color: {
          dark: n(e.color.dark || "#000000ff"),
          light: n(e.color.light || "#ffffffff"),
        },
        type: e.type,
        rendererOpts: e.rendererOpts || {},
      };
    }),
      (t.getScale = function (e, t) {
        return t.width && t.width >= e + 2 * t.margin
          ? t.width / (e + 2 * t.margin)
          : t.scale;
      }),
      (t.getImageWidth = function (e, n) {
        var r = t.getScale(e, n);
        return Math.floor((e + 2 * n.margin) * r);
      }),
      (t.qrToImageData = function (e, n, r) {
        for (
          var i = n.modules.size,
            o = n.modules.data,
            a = t.getScale(i, r),
            u = Math.floor((i + 2 * r.margin) * a),
            l = r.margin * a,
            s = [r.color.light, r.color.dark],
            f = 0;
          f < u;
          f++
        )
          for (var c = 0; c < u; c++) {
            var d = 4 * (f * u + c),
              p = r.color.light;
            if (f >= l && c >= l && f < u - l && c < u - l) {
              var h = Math.floor((f - l) / a),
                v = Math.floor((c - l) / a);
              p = s[o[h * i + v] ? 1 : 0];
            }
            (e[d++] = p.r), (e[d++] = p.g), (e[d++] = p.b), (e[d] = p.a);
          }
      });
  },
  function (e, t, n) {
    function r(e, t) {
      var n = e.a / 255,
        r = t + '="' + e.hex + '"';
      return n < 1
        ? r + " " + t + '-opacity="' + n.toFixed(2).slice(1) + '"'
        : r;
    }
    function i(e, t, n) {
      var r = e + t;
      return "undefined" != typeof n && (r += " " + n), r;
    }
    function o(e, t, n) {
      for (var r = "", o = 0, a = !1, u = 0, l = 0; l < e.length; l++) {
        var s = Math.floor(l % t),
          f = Math.floor(l / t);
        s || a || (a = !0),
          e[l]
            ? (u++,
              (l > 0 && s > 0 && e[l - 1]) ||
                ((r += a ? i("M", s + n, 0.5 + f + n) : i("m", o, 0)),
                (o = 0),
                (a = !1)),
              (s + 1 < t && e[l + 1]) || ((r += i("h", u)), (u = 0)))
            : o++;
      }
      return r;
    }
    var a = n(149);
    t.render = function (e, t, n) {
      var i = a.getOptions(t),
        u = e.modules.size,
        l = e.modules.data,
        s = u + 2 * i.margin,
        f = i.color.light.a
          ? "<path " +
            r(i.color.light, "fill") +
            ' d="M0 0h' +
            s +
            "v" +
            s +
            'H0z"/>'
          : "",
        c =
          "<path " +
          r(i.color.dark, "stroke") +
          ' d="' +
          o(l, u, i.margin) +
          '"/>',
        d = 'viewBox="0 0 ' + s + " " + s + '"',
        p = i.width ? 'width="' + i.width + '" height="' + i.width + '" ' : "",
        h =
          '<svg xmlns="http://www.w3.org/2000/svg" ' +
          p +
          d +
          ' shape-rendering="crispEdges">' +
          f +
          c +
          "</svg>\n";
      return "function" == typeof n && n(null, h), h;
    };
  },
  function (e, t) {
    e.exports = {
      guide: "_2iIk",
      right: "_15Dj",
      left: "_I0Q",
      qr: "_111n",
      up: "_2fH-",
      down: "_1Pbk",
      space: "_3qj_",
    };
  },
  function (e, t, n) {
    "use strict";
    function r(e) {
      return e && e.__esModule
        ? e
        : {
            default: e,
          };
    }
    var i = n(41),
      o = r(i),
      a = n(105),
      u = r(a),
      l = {
        37: "left",
        38: "rotate",
        39: "right",
        40: "down",
        32: "space",
        83: "s",
        82: "r",
        80: "p",
      },
      s = void 0,
      f = Object.keys(l).map(function (e) {
        return parseInt(e, 10);
      }),
      c = function (e) {
        if (e.metaKey !== !0 && f.indexOf(e.keyCode) !== -1) {
          var t = l[e.keyCode];
          t !== s && ((s = t), u.default[t].down(o.default));
        }
      },
      d = function (e) {
        if (e.metaKey !== !0 && f.indexOf(e.keyCode) !== -1) {
          var t = l[e.keyCode];
          t === s && (s = ""), u.default[t].up(o.default);
        }
      };
    document.addEventListener("keydown", c, !0),
      document.addEventListener("keyup", d, !0);
  },
]);
