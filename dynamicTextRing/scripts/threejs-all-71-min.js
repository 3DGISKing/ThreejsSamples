var THREE = {
    REVISION: "71"
};
"object" == typeof module && (module.exports = THREE),
void 0 === Math.sign && (Math.sign = function(t) {
    return t < 0 ? -1 : t > 0 ? 1 : +t
}
),
THREE.log = function() {
    console.log.apply(console, arguments)
}
,
THREE.warn = function() {
    console.warn.apply(console, arguments)
}
,
THREE.error = function() {
    console.error.apply(console, arguments)
}
,
THREE.MOUSE = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
},
THREE.CullFaceNone = 0,
THREE.CullFaceBack = 1,
THREE.CullFaceFront = 2,
THREE.CullFaceFrontBack = 3,
THREE.FrontFaceDirectionCW = 0,
THREE.FrontFaceDirectionCCW = 1,
THREE.BasicShadowMap = 0,
THREE.PCFShadowMap = 1,
THREE.PCFSoftShadowMap = 2,
THREE.FrontSide = 0,
THREE.BackSide = 1,
THREE.DoubleSide = 2,
THREE.NoShading = 0,
THREE.FlatShading = 1,
THREE.SmoothShading = 2,
THREE.NoColors = 0,
THREE.FaceColors = 1,
THREE.VertexColors = 2,
THREE.NoBlending = 0,
THREE.NormalBlending = 1,
THREE.AdditiveBlending = 2,
THREE.SubtractiveBlending = 3,
THREE.MultiplyBlending = 4,
THREE.CustomBlending = 5,
THREE.AddEquation = 100,
THREE.SubtractEquation = 101,
THREE.ReverseSubtractEquation = 102,
THREE.MinEquation = 103,
THREE.MaxEquation = 104,
THREE.ZeroFactor = 200,
THREE.OneFactor = 201,
THREE.SrcColorFactor = 202,
THREE.OneMinusSrcColorFactor = 203,
THREE.SrcAlphaFactor = 204,
THREE.OneMinusSrcAlphaFactor = 205,
THREE.DstAlphaFactor = 206,
THREE.OneMinusDstAlphaFactor = 207,
THREE.DstColorFactor = 208,
THREE.OneMinusDstColorFactor = 209,
THREE.SrcAlphaSaturateFactor = 210,
THREE.MultiplyOperation = 0,
THREE.MixOperation = 1,
THREE.AddOperation = 2,
THREE.UVMapping = 300,
THREE.CubeReflectionMapping = 301,
THREE.CubeRefractionMapping = 302,
THREE.EquirectangularReflectionMapping = 303,
THREE.EquirectangularRefractionMapping = 304,
THREE.SphericalReflectionMapping = 305,
THREE.RepeatWrapping = 1e3,
THREE.ClampToEdgeWrapping = 1001,
THREE.MirroredRepeatWrapping = 1002,
THREE.NearestFilter = 1003,
THREE.NearestMipMapNearestFilter = 1004,
THREE.NearestMipMapLinearFilter = 1005,
THREE.LinearFilter = 1006,
THREE.LinearMipMapNearestFilter = 1007,
THREE.LinearMipMapLinearFilter = 1008,
THREE.UnsignedByteType = 1009,
THREE.ByteType = 1010,
THREE.ShortType = 1011,
THREE.UnsignedShortType = 1012,
THREE.IntType = 1013,
THREE.UnsignedIntType = 1014,
THREE.FloatType = 1015,
THREE.HalfFloatType = 1025,
THREE.UnsignedShort4444Type = 1016,
THREE.UnsignedShort5551Type = 1017,
THREE.UnsignedShort565Type = 1018,
THREE.AlphaFormat = 1019,
THREE.RGBFormat = 1020,
THREE.RGBAFormat = 1021,
THREE.LuminanceFormat = 1022,
THREE.LuminanceAlphaFormat = 1023,
THREE.RGBEFormat = THREE.RGBAFormat,
THREE.RGB_S3TC_DXT1_Format = 2001,
THREE.RGBA_S3TC_DXT1_Format = 2002,
THREE.RGBA_S3TC_DXT3_Format = 2003,
THREE.RGBA_S3TC_DXT5_Format = 2004,
THREE.RGB_PVRTC_4BPPV1_Format = 2100,
THREE.RGB_PVRTC_2BPPV1_Format = 2101,
THREE.RGBA_PVRTC_4BPPV1_Format = 2102,
THREE.RGBA_PVRTC_2BPPV1_Format = 2103,
THREE.Projector = function() {
    THREE.error("THREE.Projector has been moved to /examples/js/renderers/Projector.js."),
    this.projectVector = function(t, e) {
        THREE.warn("THREE.Projector: .projectVector() is now vector.project()."),
        t.project(e)
    }
    ,
    this.unprojectVector = function(t, e) {
        THREE.warn("THREE.Projector: .unprojectVector() is now vector.unproject()."),
        t.unproject(e)
    }
    ,
    this.pickingRay = function(t, e) {
        THREE.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")
    }
}
,
THREE.CanvasRenderer = function() {
    THREE.error("THREE.CanvasRenderer has been moved to /examples/js/renderers/CanvasRenderer.js"),
    this.domElement = document.createElement("canvas"),
    this.clear = function() {}
    ,
    this.render = function() {}
    ,
    this.setClearColor = function() {}
    ,
    this.setSize = function() {}
}
,
THREE.Color = function(t) {
    return 3 === arguments.length ? this.setRGB(arguments[0], arguments[1], arguments[2]) : this.set(t)
}
,
THREE.Color.prototype = {
    constructor: THREE.Color,
    r: 1,
    g: 1,
    b: 1,
    set: function(t) {
        return t instanceof THREE.Color ? this.copy(t) : "number" == typeof t ? this.setHex(t) : "string" == typeof t && this.setStyle(t),
        this
    },
    setHex: function(t) {
        return t = Math.floor(t),
        this.r = (t >> 16 & 255) / 255,
        this.g = (t >> 8 & 255) / 255,
        this.b = (255 & t) / 255,
        this
    },
    setRGB: function(t, e, r) {
        return this.r = t,
        this.g = e,
        this.b = r,
        this
    },
    setHSL: function(t, e, r) {
        if (0 === e)
            this.r = this.g = this.b = r;
        else {
            var i = function(t, e, r) {
                return r < 0 && (r += 1),
                r > 1 && (r -= 1),
                r < 1 / 6 ? t + 6 * (e - t) * r : r < .5 ? e : r < 2 / 3 ? t + 6 * (e - t) * (2 / 3 - r) : t
            }
              , n = r <= .5 ? r * (1 + e) : r + e - r * e
              , o = 2 * r - n;
            this.r = i(o, n, t + 1 / 3),
            this.g = i(o, n, t),
            this.b = i(o, n, t - 1 / 3)
        }
        return this
    },
    setStyle: function(t) {
        if (/^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.test(t)) {
            var e = /^rgb\((\d+), ?(\d+), ?(\d+)\)$/i.exec(t);
            return this.r = Math.min(255, parseInt(e[1], 10)) / 255,
            this.g = Math.min(255, parseInt(e[2], 10)) / 255,
            this.b = Math.min(255, parseInt(e[3], 10)) / 255,
            this
        }
        if (/^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.test(t)) {
            e = /^rgb\((\d+)\%, ?(\d+)\%, ?(\d+)\%\)$/i.exec(t);
            return this.r = Math.min(100, parseInt(e[1], 10)) / 100,
            this.g = Math.min(100, parseInt(e[2], 10)) / 100,
            this.b = Math.min(100, parseInt(e[3], 10)) / 100,
            this
        }
        if (/^\#([0-9a-f]{6})$/i.test(t)) {
            e = /^\#([0-9a-f]{6})$/i.exec(t);
            return this.setHex(parseInt(e[1], 16)),
            this
        }
        if (/^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.test(t)) {
            e = /^\#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(t);
            return this.setHex(parseInt(e[1] + e[1] + e[2] + e[2] + e[3] + e[3], 16)),
            this
        }
        if (/^(\w+)$/i.test(t))
            return this.setHex(THREE.ColorKeywords[t]),
            this
    },
    copy: function(t) {
        return this.r = t.r,
        this.g = t.g,
        this.b = t.b,
        this
    },
    copyGammaToLinear: function(t, e) {
        return void 0 === e && (e = 2),
        this.r = Math.pow(t.r, e),
        this.g = Math.pow(t.g, e),
        this.b = Math.pow(t.b, e),
        this
    },
    copyLinearToGamma: function(t, e) {
        void 0 === e && (e = 2);
        var r = e > 0 ? 1 / e : 1;
        return this.r = Math.pow(t.r, r),
        this.g = Math.pow(t.g, r),
        this.b = Math.pow(t.b, r),
        this
    },
    convertGammaToLinear: function() {
        var t = this.r
          , e = this.g
          , r = this.b;
        return this.r = t * t,
        this.g = e * e,
        this.b = r * r,
        this
    },
    convertLinearToGamma: function() {
        return this.r = Math.sqrt(this.r),
        this.g = Math.sqrt(this.g),
        this.b = Math.sqrt(this.b),
        this
    },
    getHex: function() {
        return 255 * this.r << 16 ^ 255 * this.g << 8 ^ 255 * this.b << 0
    },
    getHexString: function() {
        return ("000000" + this.getHex().toString(16)).slice(-6)
    },
    getHSL: function(t) {
        var e, r, i = t || {
            h: 0,
            s: 0,
            l: 0
        }, n = this.r, o = this.g, a = this.b, s = Math.max(n, o, a), h = Math.min(n, o, a), c = (h + s) / 2;
        if (h === s)
            e = 0,
            r = 0;
        else {
            var l = s - h;
            switch (r = c <= .5 ? l / (s + h) : l / (2 - s - h),
            s) {
            case n:
                e = (o - a) / l + (o < a ? 6 : 0);
                break;
            case o:
                e = (a - n) / l + 2;
                break;
            case a:
                e = (n - o) / l + 4
            }
            e /= 6
        }
        return i.h = e,
        i.s = r,
        i.l = c,
        i
    },
    getStyle: function() {
        return "rgb(" + (255 * this.r | 0) + "," + (255 * this.g | 0) + "," + (255 * this.b | 0) + ")"
    },
    offsetHSL: function(t, e, r) {
        var i = this.getHSL();
        return i.h += t,
        i.s += e,
        i.l += r,
        this.setHSL(i.h, i.s, i.l),
        this
    },
    add: function(t) {
        return this.r += t.r,
        this.g += t.g,
        this.b += t.b,
        this
    },
    addColors: function(t, e) {
        return this.r = t.r + e.r,
        this.g = t.g + e.g,
        this.b = t.b + e.b,
        this
    },
    addScalar: function(t) {
        return this.r += t,
        this.g += t,
        this.b += t,
        this
    },
    multiply: function(t) {
        return this.r *= t.r,
        this.g *= t.g,
        this.b *= t.b,
        this
    },
    multiplyScalar: function(t) {
        return this.r *= t,
        this.g *= t,
        this.b *= t,
        this
    },
    lerp: function(t, e) {
        return this.r += (t.r - this.r) * e,
        this.g += (t.g - this.g) * e,
        this.b += (t.b - this.b) * e,
        this
    },
    equals: function(t) {
        return t.r === this.r && t.g === this.g && t.b === this.b
    },
    fromArray: function(t) {
        return this.r = t[0],
        this.g = t[1],
        this.b = t[2],
        this
    },
    toArray: function(t, e) {
        return void 0 === t && (t = []),
        void 0 === e && (e = 0),
        t[e] = this.r,
        t[e + 1] = this.g,
        t[e + 2] = this.b,
        t
    },
    clone: function() {
        return (new THREE.Color).setRGB(this.r, this.g, this.b)
    }
},
THREE.ColorKeywords = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
},
THREE.Quaternion = function(t, e, r, i) {
    this._x = t || 0,
    this._y = e || 0,
    this._z = r || 0,
    this._w = void 0 !== i ? i : 1
}
,
THREE.Quaternion.prototype = {
    constructor: THREE.Quaternion,
    _x: 0,
    _y: 0,
    _z: 0,
    _w: 0,
    get x() {
        return this._x
    },
    set x(t) {
        this._x = t,
        this.onChangeCallback()
    },
    get y() {
        return this._y
    },
    set y(t) {
        this._y = t,
        this.onChangeCallback()
    },
    get z() {
        return this._z
    },
    set z(t) {
        this._z = t,
        this.onChangeCallback()
    },
    get w() {
        return this._w
    },
    set w(t) {
        this._w = t,
        this.onChangeCallback()
    },
    set: function(t, e, r, i) {
        return this._x = t,
        this._y = e,
        this._z = r,
        this._w = i,
        this.onChangeCallback(),
        this
    },
    copy: function(t) {
        return this._x = t.x,
        this._y = t.y,
        this._z = t.z,
        this._w = t.w,
        this.onChangeCallback(),
        this
    },
    setFromEuler: function(t, e) {
        if (t instanceof THREE.Euler == !1)
            throw new Error("THREE.Quaternion: .setFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
        var r = Math.cos(t._x / 2)
          , i = Math.cos(t._y / 2)
          , n = Math.cos(t._z / 2)
          , o = Math.sin(t._x / 2)
          , a = Math.sin(t._y / 2)
          , s = Math.sin(t._z / 2);
        return "XYZ" === t.order ? (this._x = o * i * n + r * a * s,
        this._y = r * a * n - o * i * s,
        this._z = r * i * s + o * a * n,
        this._w = r * i * n - o * a * s) : "YXZ" === t.order ? (this._x = o * i * n + r * a * s,
        this._y = r * a * n - o * i * s,
        this._z = r * i * s - o * a * n,
        this._w = r * i * n + o * a * s) : "ZXY" === t.order ? (this._x = o * i * n - r * a * s,
        this._y = r * a * n + o * i * s,
        this._z = r * i * s + o * a * n,
        this._w = r * i * n - o * a * s) : "ZYX" === t.order ? (this._x = o * i * n - r * a * s,
        this._y = r * a * n + o * i * s,
        this._z = r * i * s - o * a * n,
        this._w = r * i * n + o * a * s) : "YZX" === t.order ? (this._x = o * i * n + r * a * s,
        this._y = r * a * n + o * i * s,
        this._z = r * i * s - o * a * n,
        this._w = r * i * n - o * a * s) : "XZY" === t.order && (this._x = o * i * n - r * a * s,
        this._y = r * a * n - o * i * s,
        this._z = r * i * s + o * a * n,
        this._w = r * i * n + o * a * s),
        !1 !== e && this.onChangeCallback(),
        this
    },
    setFromAxisAngle: function(t, e) {
        var r = e / 2
          , i = Math.sin(r);
        return this._x = t.x * i,
        this._y = t.y * i,
        this._z = t.z * i,
        this._w = Math.cos(r),
        this.onChangeCallback(),
        this
    },
    setFromRotationMatrix: function(t) {
        var e, r = t.elements, i = r[0], n = r[4], o = r[8], a = r[1], s = r[5], h = r[9], c = r[2], l = r[6], u = r[10], E = i + s + u;
        return E > 0 ? (e = .5 / Math.sqrt(E + 1),
        this._w = .25 / e,
        this._x = (l - h) * e,
        this._y = (o - c) * e,
        this._z = (a - n) * e) : i > s && i > u ? (e = 2 * Math.sqrt(1 + i - s - u),
        this._w = (l - h) / e,
        this._x = .25 * e,
        this._y = (n + a) / e,
        this._z = (o + c) / e) : s > u ? (e = 2 * Math.sqrt(1 + s - i - u),
        this._w = (o - c) / e,
        this._x = (n + a) / e,
        this._y = .25 * e,
        this._z = (h + l) / e) : (e = 2 * Math.sqrt(1 + u - i - s),
        this._w = (a - n) / e,
        this._x = (o + c) / e,
        this._y = (h + l) / e,
        this._z = .25 * e),
        this.onChangeCallback(),
        this
    },
    setFromUnitVectors: function() {
        var t, e;
        return function(r, i) {
            return void 0 === t && (t = new THREE.Vector3),
            (e = r.dot(i) + 1) < 1e-6 ? (e = 0,
            Math.abs(r.x) > Math.abs(r.z) ? t.set(-r.y, r.x, 0) : t.set(0, -r.z, r.y)) : t.crossVectors(r, i),
            this._x = t.x,
            this._y = t.y,
            this._z = t.z,
            this._w = e,
            this.normalize(),
            this
        }
    }(),
    inverse: function() {
        return this.conjugate().normalize(),
        this
    },
    conjugate: function() {
        return this._x *= -1,
        this._y *= -1,
        this._z *= -1,
        this.onChangeCallback(),
        this
    },
    dot: function(t) {
        return this._x * t._x + this._y * t._y + this._z * t._z + this._w * t._w
    },
    lengthSq: function() {
        return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w
    },
    length: function() {
        return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w)
    },
    normalize: function() {
        var t = this.length();
        return 0 === t ? (this._x = 0,
        this._y = 0,
        this._z = 0,
        this._w = 1) : (t = 1 / t,
        this._x = this._x * t,
        this._y = this._y * t,
        this._z = this._z * t,
        this._w = this._w * t),
        this.onChangeCallback(),
        this
    },
    multiply: function(t, e) {
        return void 0 !== e ? (THREE.warn("THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead."),
        this.multiplyQuaternions(t, e)) : this.multiplyQuaternions(this, t)
    },
    multiplyQuaternions: function(t, e) {
        var r = t._x
          , i = t._y
          , n = t._z
          , o = t._w
          , a = e._x
          , s = e._y
          , h = e._z
          , c = e._w;
        return this._x = r * c + o * a + i * h - n * s,
        this._y = i * c + o * s + n * a - r * h,
        this._z = n * c + o * h + r * s - i * a,
        this._w = o * c - r * a - i * s - n * h,
        this.onChangeCallback(),
        this
    },
    multiplyVector3: function(t) {
        return THREE.warn("THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead."),
        t.applyQuaternion(this)
    },
    slerp: function(t, e) {
        if (0 === e)
            return this;
        if (1 === e)
            return this.copy(t);
        var r = this._x
          , i = this._y
          , n = this._z
          , o = this._w
          , a = o * t._w + r * t._x + i * t._y + n * t._z;
        if (a < 0 ? (this._w = -t._w,
        this._x = -t._x,
        this._y = -t._y,
        this._z = -t._z,
        a = -a) : this.copy(t),
        a >= 1)
            return this._w = o,
            this._x = r,
            this._y = i,
            this._z = n,
            this;
        var s = Math.acos(a)
          , h = Math.sqrt(1 - a * a);
        if (Math.abs(h) < .001)
            return this._w = .5 * (o + this._w),
            this._x = .5 * (r + this._x),
            this._y = .5 * (i + this._y),
            this._z = .5 * (n + this._z),
            this;
        var c = Math.sin((1 - e) * s) / h
          , l = Math.sin(e * s) / h;
        return this._w = o * c + this._w * l,
        this._x = r * c + this._x * l,
        this._y = i * c + this._y * l,
        this._z = n * c + this._z * l,
        this.onChangeCallback(),
        this
    },
    equals: function(t) {
        return t._x === this._x && t._y === this._y && t._z === this._z && t._w === this._w
    },
    fromArray: function(t, e) {
        return void 0 === e && (e = 0),
        this._x = t[e],
        this._y = t[e + 1],
        this._z = t[e + 2],
        this._w = t[e + 3],
        this.onChangeCallback(),
        this
    },
    toArray: function(t, e) {
        return void 0 === t && (t = []),
        void 0 === e && (e = 0),
        t[e] = this._x,
        t[e + 1] = this._y,
        t[e + 2] = this._z,
        t[e + 3] = this._w,
        t
    },
    onChange: function(t) {
        return this.onChangeCallback = t,
        this
    },
    onChangeCallback: function() {},
    clone: function() {
        return new THREE.Quaternion(this._x,this._y,this._z,this._w)
    }
},
THREE.Quaternion.slerp = function(t, e, r, i) {
    return r.copy(t).slerp(e, i)
}
,
THREE.Vector2 = function(t, e) {
    this.x = t || 0,
    this.y = e || 0
}
,
THREE.Vector2.prototype = {
    constructor: THREE.Vector2,
    set: function(t, e) {
        return this.x = t,
        this.y = e,
        this
    },
    setX: function(t) {
        return this.x = t,
        this
    },
    setY: function(t) {
        return this.y = t,
        this
    },
    setComponent: function(t, e) {
        switch (t) {
        case 0:
            this.x = e;
            break;
        case 1:
            this.y = e;
            break;
        default:
            throw new Error("index is out of range: " + t)
        }
    },
    getComponent: function(t) {
        switch (t) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        default:
            throw new Error("index is out of range: " + t)
        }
    },
    copy: function(t) {
        return this.x = t.x,
        this.y = t.y,
        this
    },
    add: function(t, e) {
        return void 0 !== e ? (THREE.warn("THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
        this.addVectors(t, e)) : (this.x += t.x,
        this.y += t.y,
        this)
    },
    addScalar: function(t) {
        return this.x += t,
        this.y += t,
        this
    },
    addVectors: function(t, e) {
        return this.x = t.x + e.x,
        this.y = t.y + e.y,
        this
    },
    sub: function(t, e) {
        return void 0 !== e ? (THREE.warn("THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
        this.subVectors(t, e)) : (this.x -= t.x,
        this.y -= t.y,
        this)
    },
    subScalar: function(t) {
        return this.x -= t,
        this.y -= t,
        this
    },
    subVectors: function(t, e) {
        return this.x = t.x - e.x,
        this.y = t.y - e.y,
        this
    },
    multiply: function(t) {
        return this.x *= t.x,
        this.y *= t.y,
        this
    },
    multiplyScalar: function(t) {
        return this.x *= t,
        this.y *= t,
        this
    },
    divide: function(t) {
        return this.x /= t.x,
        this.y /= t.y,
        this
    },
    divideScalar: function(t) {
        if (0 !== t) {
            var e = 1 / t;
            this.x *= e,
            this.y *= e
        } else
            this.x = 0,
            this.y = 0;
        return this
    },
    min: function(t) {
        return this.x > t.x && (this.x = t.x),
        this.y > t.y && (this.y = t.y),
        this
    },
    max: function(t) {
        return this.x < t.x && (this.x = t.x),
        this.y < t.y && (this.y = t.y),
        this
    },
    clamp: function(t, e) {
        return this.x < t.x ? this.x = t.x : this.x > e.x && (this.x = e.x),
        this.y < t.y ? this.y = t.y : this.y > e.y && (this.y = e.y),
        this
    },
    clampScalar: function() {
        var t, e;
        return function(r, i) {
            return void 0 === t && (t = new THREE.Vector2,
            e = new THREE.Vector2),
            t.set(r, r),
            e.set(i, i),
            this.clamp(t, e)
        }
    }(),
    floor: function() {
        return this.x = Math.floor(this.x),
        this.y = Math.floor(this.y),
        this
    },
    ceil: function() {
        return this.x = Math.ceil(this.x),
        this.y = Math.ceil(this.y),
        this
    },
    round: function() {
        return this.x = Math.round(this.x),
        this.y = Math.round(this.y),
        this
    },
    roundToZero: function() {
        return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x),
        this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y),
        this
    },
    negate: function() {
        return this.x = -this.x,
        this.y = -this.y,
        this
    },
    dot: function(t) {
        return this.x * t.x + this.y * t.y
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y)
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    distanceTo: function(t) {
        return Math.sqrt(this.distanceToSquared(t))
    },
    distanceToSquared: function(t) {
        var e = this.x - t.x
          , r = this.y - t.y;
        return e * e + r * r
    },
    setLength: function(t) {
        var e = this.length();
        return 0 !== e && t !== e && this.multiplyScalar(t / e),
        this
    },
    lerp: function(t, e) {
        return this.x += (t.x - this.x) * e,
        this.y += (t.y - this.y) * e,
        this
    },
    lerpVectors: function(t, e, r) {
        return this.subVectors(e, t).multiplyScalar(r).add(t),
        this
    },
    equals: function(t) {
        return t.x === this.x && t.y === this.y
    },
    fromArray: function(t, e) {
        return void 0 === e && (e = 0),
        this.x = t[e],
        this.y = t[e + 1],
        this
    },
    toArray: function(t, e) {
        return void 0 === t && (t = []),
        void 0 === e && (e = 0),
        t[e] = this.x,
        t[e + 1] = this.y,
        t
    },
    fromAttribute: function(t, e, r) {
        return void 0 === r && (r = 0),
        e = e * t.itemSize + r,
        this.x = t.array[e],
        this.y = t.array[e + 1],
        this
    },
    clone: function() {
        return new THREE.Vector2(this.x,this.y)
    }
},
THREE.Vector3 = function(t, e, r) {
    this.x = t || 0,
    this.y = e || 0,
    this.z = r || 0
}
,
THREE.Vector3.prototype = {
    constructor: THREE.Vector3,
    set: function(t, e, r) {
        return this.x = t,
        this.y = e,
        this.z = r,
        this
    },
    setX: function(t) {
        return this.x = t,
        this
    },
    setY: function(t) {
        return this.y = t,
        this
    },
    setZ: function(t) {
        return this.z = t,
        this
    },
    setComponent: function(t, e) {
        switch (t) {
        case 0:
            this.x = e;
            break;
        case 1:
            this.y = e;
            break;
        case 2:
            this.z = e;
            break;
        default:
            throw new Error("index is out of range: " + t)
        }
    },
    getComponent: function(t) {
        switch (t) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        case 2:
            return this.z;
        default:
            throw new Error("index is out of range: " + t)
        }
    },
    copy: function(t) {
        return this.x = t.x,
        this.y = t.y,
        this.z = t.z,
        this
    },
    add: function(t, e) {
        return void 0 !== e ? (THREE.warn("THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
        this.addVectors(t, e)) : (this.x += t.x,
        this.y += t.y,
        this.z += t.z,
        this)
    },
    addScalar: function(t) {
        return this.x += t,
        this.y += t,
        this.z += t,
        this
    },
    addVectors: function(t, e) {
        return this.x = t.x + e.x,
        this.y = t.y + e.y,
        this.z = t.z + e.z,
        this
    },
    sub: function(t, e) {
        return void 0 !== e ? (THREE.warn("THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
        this.subVectors(t, e)) : (this.x -= t.x,
        this.y -= t.y,
        this.z -= t.z,
        this)
    },
    subScalar: function(t) {
        return this.x -= t,
        this.y -= t,
        this.z -= t,
        this
    },
    subVectors: function(t, e) {
        return this.x = t.x - e.x,
        this.y = t.y - e.y,
        this.z = t.z - e.z,
        this
    },
    multiply: function(t, e) {
        return void 0 !== e ? (THREE.warn("THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead."),
        this.multiplyVectors(t, e)) : (this.x *= t.x,
        this.y *= t.y,
        this.z *= t.z,
        this)
    },
    multiplyScalar: function(t) {
        return this.x *= t,
        this.y *= t,
        this.z *= t,
        this
    },
    multiplyVectors: function(t, e) {
        return this.x = t.x * e.x,
        this.y = t.y * e.y,
        this.z = t.z * e.z,
        this
    },
    applyEuler: function() {
        var t;
        return function(e) {
            return e instanceof THREE.Euler == !1 && THREE.error("THREE.Vector3: .applyEuler() now expects a Euler rotation rather than a Vector3 and order."),
            void 0 === t && (t = new THREE.Quaternion),
            this.applyQuaternion(t.setFromEuler(e)),
            this
        }
    }(),
    applyAxisAngle: function() {
        var t;
        return function(e, r) {
            return void 0 === t && (t = new THREE.Quaternion),
            this.applyQuaternion(t.setFromAxisAngle(e, r)),
            this
        }
    }(),
    applyMatrix3: function(t) {
        var e = this.x
          , r = this.y
          , i = this.z
          , n = t.elements;
        return this.x = n[0] * e + n[3] * r + n[6] * i,
        this.y = n[1] * e + n[4] * r + n[7] * i,
        this.z = n[2] * e + n[5] * r + n[8] * i,
        this
    },
    applyMatrix4: function(t) {
        var e = this.x
          , r = this.y
          , i = this.z
          , n = t.elements;
        return this.x = n[0] * e + n[4] * r + n[8] * i + n[12],
        this.y = n[1] * e + n[5] * r + n[9] * i + n[13],
        this.z = n[2] * e + n[6] * r + n[10] * i + n[14],
        this
    },
    applyProjection: function(t) {
        var e = this.x
          , r = this.y
          , i = this.z
          , n = t.elements
          , o = 1 / (n[3] * e + n[7] * r + n[11] * i + n[15]);
        return this.x = (n[0] * e + n[4] * r + n[8] * i + n[12]) * o,
        this.y = (n[1] * e + n[5] * r + n[9] * i + n[13]) * o,
        this.z = (n[2] * e + n[6] * r + n[10] * i + n[14]) * o,
        this
    },
    applyQuaternion: function(t) {
        var e = this.x
          , r = this.y
          , i = this.z
          , n = t.x
          , o = t.y
          , a = t.z
          , s = t.w
          , h = s * e + o * i - a * r
          , c = s * r + a * e - n * i
          , l = s * i + n * r - o * e
          , u = -n * e - o * r - a * i;
        return this.x = h * s + u * -n + c * -a - l * -o,
        this.y = c * s + u * -o + l * -n - h * -a,
        this.z = l * s + u * -a + h * -o - c * -n,
        this
    },
    project: function() {
        var t;
        return function(e) {
            return void 0 === t && (t = new THREE.Matrix4),
            t.multiplyMatrices(e.projectionMatrix, t.getInverse(e.matrixWorld)),
            this.applyProjection(t)
        }
    }(),
    unproject: function() {
        var t;
        return function(e) {
            return void 0 === t && (t = new THREE.Matrix4),
            t.multiplyMatrices(e.matrixWorld, t.getInverse(e.projectionMatrix)),
            this.applyProjection(t)
        }
    }(),
    transformDirection: function(t) {
        var e = this.x
          , r = this.y
          , i = this.z
          , n = t.elements;
        return this.x = n[0] * e + n[4] * r + n[8] * i,
        this.y = n[1] * e + n[5] * r + n[9] * i,
        this.z = n[2] * e + n[6] * r + n[10] * i,
        this.normalize(),
        this
    },
    divide: function(t) {
        return this.x /= t.x,
        this.y /= t.y,
        this.z /= t.z,
        this
    },
    divideScalar: function(t) {
        if (0 !== t) {
            var e = 1 / t;
            this.x *= e,
            this.y *= e,
            this.z *= e
        } else
            this.x = 0,
            this.y = 0,
            this.z = 0;
        return this
    },
    min: function(t) {
        return this.x > t.x && (this.x = t.x),
        this.y > t.y && (this.y = t.y),
        this.z > t.z && (this.z = t.z),
        this
    },
    max: function(t) {
        return this.x < t.x && (this.x = t.x),
        this.y < t.y && (this.y = t.y),
        this.z < t.z && (this.z = t.z),
        this
    },
    clamp: function(t, e) {
        return this.x < t.x ? this.x = t.x : this.x > e.x && (this.x = e.x),
        this.y < t.y ? this.y = t.y : this.y > e.y && (this.y = e.y),
        this.z < t.z ? this.z = t.z : this.z > e.z && (this.z = e.z),
        this
    },
    clampScalar: function() {
        var t, e;
        return function(r, i) {
            return void 0 === t && (t = new THREE.Vector3,
            e = new THREE.Vector3),
            t.set(r, r, r),
            e.set(i, i, i),
            this.clamp(t, e)
        }
    }(),
    floor: function() {
        return this.x = Math.floor(this.x),
        this.y = Math.floor(this.y),
        this.z = Math.floor(this.z),
        this
    },
    ceil: function() {
        return this.x = Math.ceil(this.x),
        this.y = Math.ceil(this.y),
        this.z = Math.ceil(this.z),
        this
    },
    round: function() {
        return this.x = Math.round(this.x),
        this.y = Math.round(this.y),
        this.z = Math.round(this.z),
        this
    },
    roundToZero: function() {
        return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x),
        this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y),
        this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z),
        this
    },
    negate: function() {
        return this.x = -this.x,
        this.y = -this.y,
        this.z = -this.z,
        this
    },
    dot: function(t) {
        return this.x * t.x + this.y * t.y + this.z * t.z
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    },
    lengthManhattan: function() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(t) {
        var e = this.length();
        return 0 !== e && t !== e && this.multiplyScalar(t / e),
        this
    },
    lerp: function(t, e) {
        return this.x += (t.x - this.x) * e,
        this.y += (t.y - this.y) * e,
        this.z += (t.z - this.z) * e,
        this
    },
    lerpVectors: function(t, e, r) {
        return this.subVectors(e, t).multiplyScalar(r).add(t),
        this
    },
    cross: function(t, e) {
        if (void 0 !== e)
            return THREE.warn("THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead."),
            this.crossVectors(t, e);
        var r = this.x
          , i = this.y
          , n = this.z;
        return this.x = i * t.z - n * t.y,
        this.y = n * t.x - r * t.z,
        this.z = r * t.y - i * t.x,
        this
    },
    crossVectors: function(t, e) {
        var r = t.x
          , i = t.y
          , n = t.z
          , o = e.x
          , a = e.y
          , s = e.z;
        return this.x = i * s - n * a,
        this.y = n * o - r * s,
        this.z = r * a - i * o,
        this
    },
    projectOnVector: function() {
        var t, e;
        return function(r) {
            return void 0 === t && (t = new THREE.Vector3),
            t.copy(r).normalize(),
            e = this.dot(t),
            this.copy(t).multiplyScalar(e)
        }
    }(),
    projectOnPlane: function() {
        var t;
        return function(e) {
            return void 0 === t && (t = new THREE.Vector3),
            t.copy(this).projectOnVector(e),
            this.sub(t)
        }
    }(),
    reflect: function() {
        var t;
        return function(e) {
            return void 0 === t && (t = new THREE.Vector3),
            this.sub(t.copy(e).multiplyScalar(2 * this.dot(e)))
        }
    }(),
    angleTo: function(t) {
        var e = this.dot(t) / (this.length() * t.length());
        return Math.acos(THREE.Math.clamp(e, -1, 1))
    },
    distanceTo: function(t) {
        return Math.sqrt(this.distanceToSquared(t))
    },
    distanceToSquared: function(t) {
        var e = this.x - t.x
          , r = this.y - t.y
          , i = this.z - t.z;
        return e * e + r * r + i * i
    },
    setEulerFromRotationMatrix: function(t, e) {
        THREE.error("THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.")
    },
    setEulerFromQuaternion: function(t, e) {
        THREE.error("THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.")
    },
    getPositionFromMatrix: function(t) {
        return THREE.warn("THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition()."),
        this.setFromMatrixPosition(t)
    },
    getScaleFromMatrix: function(t) {
        return THREE.warn("THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale()."),
        this.setFromMatrixScale(t)
    },
    getColumnFromMatrix: function(t, e) {
        return THREE.warn("THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn()."),
        this.setFromMatrixColumn(t, e)
    },
    setFromMatrixPosition: function(t) {
        return this.x = t.elements[12],
        this.y = t.elements[13],
        this.z = t.elements[14],
        this
    },
    setFromMatrixScale: function(t) {
        var e = this.set(t.elements[0], t.elements[1], t.elements[2]).length()
          , r = this.set(t.elements[4], t.elements[5], t.elements[6]).length()
          , i = this.set(t.elements[8], t.elements[9], t.elements[10]).length();
        return this.x = e,
        this.y = r,
        this.z = i,
        this
    },
    setFromMatrixColumn: function(t, e) {
        var r = 4 * t
          , i = e.elements;
        return this.x = i[r],
        this.y = i[r + 1],
        this.z = i[r + 2],
        this
    },
    equals: function(t) {
        return t.x === this.x && t.y === this.y && t.z === this.z
    },
    fromArray: function(t, e) {
        return void 0 === e && (e = 0),
        this.x = t[e],
        this.y = t[e + 1],
        this.z = t[e + 2],
        this
    },
    toArray: function(t, e) {
        return void 0 === t && (t = []),
        void 0 === e && (e = 0),
        t[e] = this.x,
        t[e + 1] = this.y,
        t[e + 2] = this.z,
        t
    },
    fromAttribute: function(t, e, r) {
        return void 0 === r && (r = 0),
        e = e * t.itemSize + r,
        this.x = t.array[e],
        this.y = t.array[e + 1],
        this.z = t.array[e + 2],
        this
    },
    clone: function() {
        return new THREE.Vector3(this.x,this.y,this.z)
    }
},
THREE.Vector4 = function(t, e, r, i) {
    this.x = t || 0,
    this.y = e || 0,
    this.z = r || 0,
    this.w = void 0 !== i ? i : 1
}
,
THREE.Vector4.prototype = {
    constructor: THREE.Vector4,
    set: function(t, e, r, i) {
        return this.x = t,
        this.y = e,
        this.z = r,
        this.w = i,
        this
    },
    setX: function(t) {
        return this.x = t,
        this
    },
    setY: function(t) {
        return this.y = t,
        this
    },
    setZ: function(t) {
        return this.z = t,
        this
    },
    setW: function(t) {
        return this.w = t,
        this
    },
    setComponent: function(t, e) {
        switch (t) {
        case 0:
            this.x = e;
            break;
        case 1:
            this.y = e;
            break;
        case 2:
            this.z = e;
            break;
        case 3:
            this.w = e;
            break;
        default:
            throw new Error("index is out of range: " + t)
        }
    },
    getComponent: function(t) {
        switch (t) {
        case 0:
            return this.x;
        case 1:
            return this.y;
        case 2:
            return this.z;
        case 3:
            return this.w;
        default:
            throw new Error("index is out of range: " + t)
        }
    },
    copy: function(t) {
        return this.x = t.x,
        this.y = t.y,
        this.z = t.z,
        this.w = void 0 !== t.w ? t.w : 1,
        this
    },
    add: function(t, e) {
        return void 0 !== e ? (THREE.warn("THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead."),
        this.addVectors(t, e)) : (this.x += t.x,
        this.y += t.y,
        this.z += t.z,
        this.w += t.w,
        this)
    },
    addScalar: function(t) {
        return this.x += t,
        this.y += t,
        this.z += t,
        this.w += t,
        this
    },
    addVectors: function(t, e) {
        return this.x = t.x + e.x,
        this.y = t.y + e.y,
        this.z = t.z + e.z,
        this.w = t.w + e.w,
        this
    },
    sub: function(t, e) {
        return void 0 !== e ? (THREE.warn("THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead."),
        this.subVectors(t, e)) : (this.x -= t.x,
        this.y -= t.y,
        this.z -= t.z,
        this.w -= t.w,
        this)
    },
    subScalar: function(t) {
        return this.x -= t,
        this.y -= t,
        this.z -= t,
        this.w -= t,
        this
    },
    subVectors: function(t, e) {
        return this.x = t.x - e.x,
        this.y = t.y - e.y,
        this.z = t.z - e.z,
        this.w = t.w - e.w,
        this
    },
    multiplyScalar: function(t) {
        return this.x *= t,
        this.y *= t,
        this.z *= t,
        this.w *= t,
        this
    },
    applyMatrix4: function(t) {
        var e = this.x
          , r = this.y
          , i = this.z
          , n = this.w
          , o = t.elements;
        return this.x = o[0] * e + o[4] * r + o[8] * i + o[12] * n,
        this.y = o[1] * e + o[5] * r + o[9] * i + o[13] * n,
        this.z = o[2] * e + o[6] * r + o[10] * i + o[14] * n,
        this.w = o[3] * e + o[7] * r + o[11] * i + o[15] * n,
        this
    },
    divideScalar: function(t) {
        if (0 !== t) {
            var e = 1 / t;
            this.x *= e,
            this.y *= e,
            this.z *= e,
            this.w *= e
        } else
            this.x = 0,
            this.y = 0,
            this.z = 0,
            this.w = 1;
        return this
    },
    setAxisAngleFromQuaternion: function(t) {
        this.w = 2 * Math.acos(t.w);
        var e = Math.sqrt(1 - t.w * t.w);
        return e < 1e-4 ? (this.x = 1,
        this.y = 0,
        this.z = 0) : (this.x = t.x / e,
        this.y = t.y / e,
        this.z = t.z / e),
        this
    },
    setAxisAngleFromRotationMatrix: function(t) {
        var e, r, i, n, o = t.elements, a = o[0], s = o[4], h = o[8], c = o[1], l = o[5], u = o[9], E = o[2], p = o[6], d = o[10];
        if (Math.abs(s - c) < .01 && Math.abs(h - E) < .01 && Math.abs(u - p) < .01) {
            if (Math.abs(s + c) < .1 && Math.abs(h + E) < .1 && Math.abs(u + p) < .1 && Math.abs(a + l + d - 3) < .1)
                return this.set(1, 0, 0, 0),
                this;
            e = Math.PI;
            var f = (a + 1) / 2
              , m = (l + 1) / 2
              , T = (d + 1) / 2
              , g = (s + c) / 4
              , v = (h + E) / 4
              , R = (u + p) / 4;
            return f > m && f > T ? f < .01 ? (r = 0,
            i = .707106781,
            n = .707106781) : (i = g / (r = Math.sqrt(f)),
            n = v / r) : m > T ? m < .01 ? (r = .707106781,
            i = 0,
            n = .707106781) : (r = g / (i = Math.sqrt(m)),
            n = R / i) : T < .01 ? (r = .707106781,
            i = .707106781,
            n = 0) : (r = v / (n = Math.sqrt(T)),
            i = R / n),
            this.set(r, i, n, e),
            this
        }
        var y = Math.sqrt((p - u) * (p - u) + (h - E) * (h - E) + (c - s) * (c - s));
        return Math.abs(y) < .001 && (y = 1),
        this.x = (p - u) / y,
        this.y = (h - E) / y,
        this.z = (c - s) / y,
        this.w = Math.acos((a + l + d - 1) / 2),
        this
    },
    min: function(t) {
        return this.x > t.x && (this.x = t.x),
        this.y > t.y && (this.y = t.y),
        this.z > t.z && (this.z = t.z),
        this.w > t.w && (this.w = t.w),
        this
    },
    max: function(t) {
        return this.x < t.x && (this.x = t.x),
        this.y < t.y && (this.y = t.y),
        this.z < t.z && (this.z = t.z),
        this.w < t.w && (this.w = t.w),
        this
    },
    clamp: function(t, e) {
        return this.x < t.x ? this.x = t.x : this.x > e.x && (this.x = e.x),
        this.y < t.y ? this.y = t.y : this.y > e.y && (this.y = e.y),
        this.z < t.z ? this.z = t.z : this.z > e.z && (this.z = e.z),
        this.w < t.w ? this.w = t.w : this.w > e.w && (this.w = e.w),
        this
    },
    clampScalar: function() {
        var t, e;
        return function(r, i) {
            return void 0 === t && (t = new THREE.Vector4,
            e = new THREE.Vector4),
            t.set(r, r, r, r),
            e.set(i, i, i, i),
            this.clamp(t, e)
        }
    }(),
    floor: function() {
        return this.x = Math.floor(this.x),
        this.y = Math.floor(this.y),
        this.z = Math.floor(this.z),
        this.w = Math.floor(this.w),
        this
    },
    ceil: function() {
        return this.x = Math.ceil(this.x),
        this.y = Math.ceil(this.y),
        this.z = Math.ceil(this.z),
        this.w = Math.ceil(this.w),
        this
    },
    round: function() {
        return this.x = Math.round(this.x),
        this.y = Math.round(this.y),
        this.z = Math.round(this.z),
        this.w = Math.round(this.w),
        this
    },
    roundToZero: function() {
        return this.x = this.x < 0 ? Math.ceil(this.x) : Math.floor(this.x),
        this.y = this.y < 0 ? Math.ceil(this.y) : Math.floor(this.y),
        this.z = this.z < 0 ? Math.ceil(this.z) : Math.floor(this.z),
        this.w = this.w < 0 ? Math.ceil(this.w) : Math.floor(this.w),
        this
    },
    negate: function() {
        return this.x = -this.x,
        this.y = -this.y,
        this.z = -this.z,
        this.w = -this.w,
        this
    },
    dot: function(t) {
        return this.x * t.x + this.y * t.y + this.z * t.z + this.w * t.w
    },
    lengthSq: function() {
        return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
    },
    length: function() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w)
    },
    lengthManhattan: function() {
        return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w)
    },
    normalize: function() {
        return this.divideScalar(this.length())
    },
    setLength: function(t) {
        var e = this.length();
        return 0 !== e && t !== e && this.multiplyScalar(t / e),
        this
    },
    lerp: function(t, e) {
        return this.x += (t.x - this.x) * e,
        this.y += (t.y - this.y) * e,
        this.z += (t.z - this.z) * e,
        this.w += (t.w - this.w) * e,
        this
    },
    lerpVectors: function(t, e, r) {
        return this.subVectors(e, t).multiplyScalar(r).add(t),
        this
    },
    equals: function(t) {
        return t.x === this.x && t.y === this.y && t.z === this.z && t.w === this.w
    },
    fromArray: function(t, e) {
        return void 0 === e && (e = 0),
        this.x = t[e],
        this.y = t[e + 1],
        this.z = t[e + 2],
        this.w = t[e + 3],
        this
    },
    toArray: function(t, e) {
        return void 0 === t && (t = []),
        void 0 === e && (e = 0),
        t[e] = this.x,
        t[e + 1] = this.y,
        t[e + 2] = this.z,
        t[e + 3] = this.w,
        t
    },
    fromAttribute: function(t, e, r) {
        return void 0 === r && (r = 0),
        e = e * t.itemSize + r,
        this.x = t.array[e],
        this.y = t.array[e + 1],
        this.z = t.array[e + 2],
        this.w = t.array[e + 3],
        this
    },
    clone: function() {
        return new THREE.Vector4(this.x,this.y,this.z,this.w)
    }
},
THREE.Euler = function(t, e, r, i) {
    this._x = t || 0,
    this._y = e || 0,
    this._z = r || 0,
    this._order = i || THREE.Euler.DefaultOrder
}
,
THREE.Euler.RotationOrders = ["XYZ", "YZX", "ZXY", "XZY", "YXZ", "ZYX"],
THREE.Euler.DefaultOrder = "XYZ",
THREE.Euler.prototype = {
    constructor: THREE.Euler,
    _x: 0,
    _y: 0,
    _z: 0,
    _order: THREE.Euler.DefaultOrder,
    get x() {
        return this._x
    },
    set x(t) {
        this._x = t,
        this.onChangeCallback()
    },
    get y() {
        return this._y
    },
    set y(t) {
        this._y = t,
        this.onChangeCallback()
    },
    get z() {
        return this._z
    },
    set z(t) {
        this._z = t,
        this.onChangeCallback()
    },
    get order() {
        return this._order
    },
    set order(t) {
        this._order = t,
        this.onChangeCallback()
    },
    set: function(t, e, r, i) {
        return this._x = t,
        this._y = e,
        this._z = r,
        this._order = i || this._order,
        this.onChangeCallback(),
        this
    },
    copy: function(t) {
        return this._x = t._x,
        this._y = t._y,
        this._z = t._z,
        this._order = t._order,
        this.onChangeCallback(),
        this
    },
    setFromRotationMatrix: function(t, e, r) {
        var i = THREE.Math.clamp
          , n = t.elements
          , o = n[0]
          , a = n[4]
          , s = n[8]
          , h = n[1]
          , c = n[5]
          , l = n[9]
          , u = n[2]
          , E = n[6]
          , p = n[10];
        return "XYZ" === (e = e || this._order) ? (this._y = Math.asin(i(s, -1, 1)),
        Math.abs(s) < .99999 ? (this._x = Math.atan2(-l, p),
        this._z = Math.atan2(-a, o)) : (this._x = Math.atan2(E, c),
        this._z = 0)) : "YXZ" === e ? (this._x = Math.asin(-i(l, -1, 1)),
        Math.abs(l) < .99999 ? (this._y = Math.atan2(s, p),
        this._z = Math.atan2(h, c)) : (this._y = Math.atan2(-u, o),
        this._z = 0)) : "ZXY" === e ? (this._x = Math.asin(i(E, -1, 1)),
        Math.abs(E) < .99999 ? (this._y = Math.atan2(-u, p),
        this._z = Math.atan2(-a, c)) : (this._y = 0,
        this._z = Math.atan2(h, o))) : "ZYX" === e ? (this._y = Math.asin(-i(u, -1, 1)),
        Math.abs(u) < .99999 ? (this._x = Math.atan2(E, p),
        this._z = Math.atan2(h, o)) : (this._x = 0,
        this._z = Math.atan2(-a, c))) : "YZX" === e ? (this._z = Math.asin(i(h, -1, 1)),
        Math.abs(h) < .99999 ? (this._x = Math.atan2(-l, c),
        this._y = Math.atan2(-u, o)) : (this._x = 0,
        this._y = Math.atan2(s, p))) : "XZY" === e ? (this._z = Math.asin(-i(a, -1, 1)),
        Math.abs(a) < .99999 ? (this._x = Math.atan2(E, c),
        this._y = Math.atan2(s, o)) : (this._x = Math.atan2(-l, p),
        this._y = 0)) : THREE.warn("THREE.Euler: .setFromRotationMatrix() given unsupported order: " + e),
        this._order = e,
        !1 !== r && this.onChangeCallback(),
        this
    },
    setFromQuaternion: function() {
        var t;
        return function(e, r, i) {
            return void 0 === t && (t = new THREE.Matrix4),
            t.makeRotationFromQuaternion(e),
            this.setFromRotationMatrix(t, r, i),
            this
        }
    }(),
    setFromVector3: function(t, e) {
        return this.set(t.x, t.y, t.z, e || this._order)
    },
    reorder: function() {
        var t = new THREE.Quaternion;
        return function(e) {
            t.setFromEuler(this),
            this.setFromQuaternion(t, e)
        }
    }(),
    equals: function(t) {
        return t._x === this._x && t._y === this._y && t._z === this._z && t._order === this._order
    },
    fromArray: function(t) {
        return this._x = t[0],
        this._y = t[1],
        this._z = t[2],
        void 0 !== t[3] && (this._order = t[3]),
        this.onChangeCallback(),
        this
    },
    toArray: function(t, e) {
        return void 0 === t && (t = []),
        void 0 === e && (e = 0),
        t[e] = this._x,
        t[e + 1] = this._y,
        t[e + 2] = this._z,
        t[e + 3] = this._order,
        t
    },
    toVector3: function(t) {
        return t ? t.set(this._x, this._y, this._z) : new THREE.Vector3(this._x,this._y,this._z)
    },
    onChange: function(t) {
        return this.onChangeCallback = t,
        this
    },
    onChangeCallback: function() {},
    clone: function() {
        return new THREE.Euler(this._x,this._y,this._z,this._order)
    }
},
THREE.Line3 = function(t, e) {
    this.start = void 0 !== t ? t : new THREE.Vector3,
    this.end = void 0 !== e ? e : new THREE.Vector3
}
,
THREE.Line3.prototype = {
    constructor: THREE.Line3,
    set: function(t, e) {
        return this.start.copy(t),
        this.end.copy(e),
        this
    },
    copy: function(t) {
        return this.start.copy(t.start),
        this.end.copy(t.end),
        this
    },
    center: function(t) {
        return (t || new THREE.Vector3).addVectors(this.start, this.end).multiplyScalar(.5)
    },
    delta: function(t) {
        return (t || new THREE.Vector3).subVectors(this.end, this.start)
    },
    distanceSq: function() {
        return this.start.distanceToSquared(this.end)
    },
    distance: function() {
        return this.start.distanceTo(this.end)
    },
    at: function(t, e) {
        var r = e || new THREE.Vector3;
        return this.delta(r).multiplyScalar(t).add(this.start)
    },
    closestPointToPointParameter: function() {
        var t = new THREE.Vector3
          , e = new THREE.Vector3;
        return function(r, i) {
            t.subVectors(r, this.start),
            e.subVectors(this.end, this.start);
            var n = e.dot(e)
              , o = e.dot(t) / n;
            return i && (o = THREE.Math.clamp(o, 0, 1)),
            o
        }
    }(),
    closestPointToPoint: function(t, e, r) {
        var i = this.closestPointToPointParameter(t, e)
          , n = r || new THREE.Vector3;
        return this.delta(n).multiplyScalar(i).add(this.start)
    },
    applyMatrix4: function(t) {
        return this.start.applyMatrix4(t),
        this.end.applyMatrix4(t),
        this
    },
    equals: function(t) {
        return t.start.equals(this.start) && t.end.equals(this.end)
    },
    clone: function() {
        return (new THREE.Line3).copy(this)
    }
},
THREE.Box2 = function(t, e) {
    this.min = void 0 !== t ? t : new THREE.Vector2(1 / 0,1 / 0),
    this.max = void 0 !== e ? e : new THREE.Vector2(-1 / 0,-1 / 0)
}
,
THREE.Box2.prototype = {
    constructor: THREE.Box2,
    set: function(t, e) {
        return this.min.copy(t),
        this.max.copy(e),
        this
    },
    setFromPoints: function(t) {
        this.makeEmpty();
        for (var e = 0, r = t.length; e < r; e++)
            this.expandByPoint(t[e]);
        return this
    },
    setFromCenterAndSize: function() {
        var t = new THREE.Vector2;
        return function(e, r) {
            var i = t.copy(r).multiplyScalar(.5);
            return this.min.copy(e).sub(i),
            this.max.copy(e).add(i),
            this
        }
    }(),
    copy: function(t) {
        return this.min.copy(t.min),
        this.max.copy(t.max),
        this
    },
    makeEmpty: function() {
        return this.min.x = this.min.y = 1 / 0,
        this.max.x = this.max.y = -1 / 0,
        this
    },
    empty: function() {
        return this.max.x < this.min.x || this.max.y < this.min.y
    },
    center: function(t) {
        return (t || new THREE.Vector2).addVectors(this.min, this.max).multiplyScalar(.5)
    },
    size: function(t) {
        return (t || new THREE.Vector2).subVectors(this.max, this.min)
    },
    expandByPoint: function(t) {
        return this.min.min(t),
        this.max.max(t),
        this
    },
    expandByVector: function(t) {
        return this.min.sub(t),
        this.max.add(t),
        this
    },
    expandByScalar: function(t) {
        return this.min.addScalar(-t),
        this.max.addScalar(t),
        this
    },
    containsPoint: function(t) {
        return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y)
    },
    containsBox: function(t) {
        return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y
    },
    getParameter: function(t, e) {
        return (e || new THREE.Vector2).set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y))
    },
    isIntersectionBox: function(t) {
        return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y)
    },
    clampPoint: function(t, e) {
        return (e || new THREE.Vector2).copy(t).clamp(this.min, this.max)
    },
    distanceToPoint: function() {
        var t = new THREE.Vector2;
        return function(e) {
            return t.copy(e).clamp(this.min, this.max).sub(e).length()
        }
    }(),
    intersect: function(t) {
        return this.min.max(t.min),
        this.max.min(t.max),
        this
    },
    union: function(t) {
        return this.min.min(t.min),
        this.max.max(t.max),
        this
    },
    translate: function(t) {
        return this.min.add(t),
        this.max.add(t),
        this
    },
    equals: function(t) {
        return t.min.equals(this.min) && t.max.equals(this.max)
    },
    clone: function() {
        return (new THREE.Box2).copy(this)
    }
},
THREE.Box3 = function(t, e) {
    this.min = void 0 !== t ? t : new THREE.Vector3(1 / 0,1 / 0,1 / 0),
    this.max = void 0 !== e ? e : new THREE.Vector3(-1 / 0,-1 / 0,-1 / 0)
}
,
THREE.Box3.prototype = {
    constructor: THREE.Box3,
    set: function(t, e) {
        return this.min.copy(t),
        this.max.copy(e),
        this
    },
    setFromPoints: function(t) {
        this.makeEmpty();
        for (var e = 0, r = t.length; e < r; e++)
            this.expandByPoint(t[e]);
        return this
    },
    setFromCenterAndSize: function() {
        var t = new THREE.Vector3;
        return function(e, r) {
            var i = t.copy(r).multiplyScalar(.5);
            return this.min.copy(e).sub(i),
            this.max.copy(e).add(i),
            this
        }
    }(),
    setFromObject: function() {
        var t = new THREE.Vector3;
        return function(e) {
            var r = this;
            return e.updateMatrixWorld(!0),
            this.makeEmpty(),
            e.traverse(function(e) {
                var i = e.geometry;
                if (void 0 !== i)
                    if (i instanceof THREE.Geometry)
                        for (var n = i.vertices, o = 0, a = n.length; o < a; o++)
                            t.copy(n[o]),
                            t.applyMatrix4(e.matrixWorld),
                            r.expandByPoint(t);
                    else if (i instanceof THREE.BufferGeometry && void 0 !== i.attributes.position) {
                        var s = i.attributes.position.array;
                        for (o = 0,
                        a = s.length; o < a; o += 3)
                            t.set(s[o], s[o + 1], s[o + 2]),
                            t.applyMatrix4(e.matrixWorld),
                            r.expandByPoint(t)
                    }
            }),
            this
        }
    }(),
    copy: function(t) {
        return this.min.copy(t.min),
        this.max.copy(t.max),
        this
    },
    makeEmpty: function() {
        return this.min.x = this.min.y = this.min.z = 1 / 0,
        this.max.x = this.max.y = this.max.z = -1 / 0,
        this
    },
    empty: function() {
        return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z
    },
    center: function(t) {
        return (t || new THREE.Vector3).addVectors(this.min, this.max).multiplyScalar(.5)
    },
    size: function(t) {
        return (t || new THREE.Vector3).subVectors(this.max, this.min)
    },
    expandByPoint: function(t) {
        return this.min.min(t),
        this.max.max(t),
        this
    },
    expandByVector: function(t) {
        return this.min.sub(t),
        this.max.add(t),
        this
    },
    expandByScalar: function(t) {
        return this.min.addScalar(-t),
        this.max.addScalar(t),
        this
    },
    containsPoint: function(t) {
        return !(t.x < this.min.x || t.x > this.max.x || t.y < this.min.y || t.y > this.max.y || t.z < this.min.z || t.z > this.max.z)
    },
    containsBox: function(t) {
        return this.min.x <= t.min.x && t.max.x <= this.max.x && this.min.y <= t.min.y && t.max.y <= this.max.y && this.min.z <= t.min.z && t.max.z <= this.max.z
    },
    getParameter: function(t, e) {
        return (e || new THREE.Vector3).set((t.x - this.min.x) / (this.max.x - this.min.x), (t.y - this.min.y) / (this.max.y - this.min.y), (t.z - this.min.z) / (this.max.z - this.min.z))
    },
    isIntersectionBox: function(t) {
        return !(t.max.x < this.min.x || t.min.x > this.max.x || t.max.y < this.min.y || t.min.y > this.max.y || t.max.z < this.min.z || t.min.z > this.max.z)
    },
    clampPoint: function(t, e) {
        return (e || new THREE.Vector3).copy(t).clamp(this.min, this.max)
    },
    distanceToPoint: function() {
        var t = new THREE.Vector3;
        return function(e) {
            return t.copy(e).clamp(this.min, this.max).sub(e).length()
        }
    }(),
    getBoundingSphere: function() {
        var t = new THREE.Vector3;
        return function(e) {
            var r = e || new THREE.Sphere;
            return r.center = this.center(),
            r.radius = .5 * this.size(t).length(),
            r
        }
    }(),
    intersect: function(t) {
        return this.min.max(t.min),
        this.max.min(t.max),
        this
    },
    union: function(t) {
        return this.min.min(t.min),
        this.max.max(t.max),
        this
    },
    applyMatrix4: function() {
        var t = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3, new THREE.Vector3];
        return function(e) {
            return t[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e),
            t[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e),
            t[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e),
            t[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e),
            t[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e),
            t[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e),
            t[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e),
            t[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e),
            this.makeEmpty(),
            this.setFromPoints(t),
            this
        }
    }(),
    translate: function(t) {
        return this.min.add(t),
        this.max.add(t),
        this
    },
    equals: function(t) {
        return t.min.equals(this.min) && t.max.equals(this.max)
    },
    clone: function() {
        return (new THREE.Box3).copy(this)
    }
},
THREE.Matrix3 = function() {
    this.elements = new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]),
    arguments.length > 0 && THREE.error("THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.")
}
,
THREE.Matrix3.prototype = {
    constructor: THREE.Matrix3,
    set: function(t, e, r, i, n, o, a, s, h) {
        var c = this.elements;
        return c[0] = t,
        c[3] = e,
        c[6] = r,
        c[1] = i,
        c[4] = n,
        c[7] = o,
        c[2] = a,
        c[5] = s,
        c[8] = h,
        this
    },
    identity: function() {
        return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1),
        this
    },
    copy: function(t) {
        var e = t.elements;
        return this.set(e[0], e[3], e[6], e[1], e[4], e[7], e[2], e[5], e[8]),
        this
    },
    multiplyVector3: function(t) {
        return THREE.warn("THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead."),
        t.applyMatrix3(this)
    },
    multiplyVector3Array: function(t) {
        return THREE.warn("THREE.Matrix3: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."),
        this.applyToVector3Array(t)
    },
    applyToVector3Array: function() {
        var t = new THREE.Vector3;
        return function(e, r, i) {
            void 0 === r && (r = 0),
            void 0 === i && (i = e.length);
            for (var n = 0, o = r; n < i; n += 3,
            o += 3)
                t.x = e[o],
                t.y = e[o + 1],
                t.z = e[o + 2],
                t.applyMatrix3(this),
                e[o] = t.x,
                e[o + 1] = t.y,
                e[o + 2] = t.z;
            return e
        }
    }(),
    multiplyScalar: function(t) {
        var e = this.elements;
        return e[0] *= t,
        e[3] *= t,
        e[6] *= t,
        e[1] *= t,
        e[4] *= t,
        e[7] *= t,
        e[2] *= t,
        e[5] *= t,
        e[8] *= t,
        this
    },
    determinant: function() {
        var t = this.elements
          , e = t[0]
          , r = t[1]
          , i = t[2]
          , n = t[3]
          , o = t[4]
          , a = t[5]
          , s = t[6]
          , h = t[7]
          , c = t[8];
        return e * o * c - e * a * h - r * n * c + r * a * s + i * n * h - i * o * s
    },
    getInverse: function(t, e) {
        var r = t.elements
          , i = this.elements;
        i[0] = r[10] * r[5] - r[6] * r[9],
        i[1] = -r[10] * r[1] + r[2] * r[9],
        i[2] = r[6] * r[1] - r[2] * r[5],
        i[3] = -r[10] * r[4] + r[6] * r[8],
        i[4] = r[10] * r[0] - r[2] * r[8],
        i[5] = -r[6] * r[0] + r[2] * r[4],
        i[6] = r[9] * r[4] - r[5] * r[8],
        i[7] = -r[9] * r[0] + r[1] * r[8],
        i[8] = r[5] * r[0] - r[1] * r[4];
        var n = r[0] * i[0] + r[1] * i[3] + r[2] * i[6];
        if (0 === n) {
            var o = "Matrix3.getInverse(): can't invert matrix, determinant is 0";
            if (e)
                throw new Error(o);
            return THREE.warn(o),
            this.identity(),
            this
        }
        return this.multiplyScalar(1 / n),
        this
    },
    transpose: function() {
        var t, e = this.elements;
        return t = e[1],
        e[1] = e[3],
        e[3] = t,
        t = e[2],
        e[2] = e[6],
        e[6] = t,
        t = e[5],
        e[5] = e[7],
        e[7] = t,
        this
    },
    flattenToArrayOffset: function(t, e) {
        var r = this.elements;
        return t[e] = r[0],
        t[e + 1] = r[1],
        t[e + 2] = r[2],
        t[e + 3] = r[3],
        t[e + 4] = r[4],
        t[e + 5] = r[5],
        t[e + 6] = r[6],
        t[e + 7] = r[7],
        t[e + 8] = r[8],
        t
    },
    getNormalMatrix: function(t) {
        return this.getInverse(t).transpose(),
        this
    },
    transposeIntoArray: function(t) {
        var e = this.elements;
        return t[0] = e[0],
        t[1] = e[3],
        t[2] = e[6],
        t[3] = e[1],
        t[4] = e[4],
        t[5] = e[7],
        t[6] = e[2],
        t[7] = e[5],
        t[8] = e[8],
        this
    },
    fromArray: function(t) {
        return this.elements.set(t),
        this
    },
    toArray: function() {
        var t = this.elements;
        return [t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8]]
    },
    clone: function() {
        return (new THREE.Matrix3).fromArray(this.elements)
    }
},
THREE.Matrix4 = function() {
    this.elements = new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
    arguments.length > 0 && THREE.error("THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.")
}
,
THREE.Matrix4.prototype = {
    constructor: THREE.Matrix4,
    set: function(t, e, r, i, n, o, a, s, h, c, l, u, E, p, d, f) {
        var m = this.elements;
        return m[0] = t,
        m[4] = e,
        m[8] = r,
        m[12] = i,
        m[1] = n,
        m[5] = o,
        m[9] = a,
        m[13] = s,
        m[2] = h,
        m[6] = c,
        m[10] = l,
        m[14] = u,
        m[3] = E,
        m[7] = p,
        m[11] = d,
        m[15] = f,
        this
    },
    identity: function() {
        return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
        this
    },
    copy: function(t) {
        return this.elements.set(t.elements),
        this
    },
    extractPosition: function(t) {
        return THREE.warn("THREE.Matrix4: .extractPosition() has been renamed to .copyPosition()."),
        this.copyPosition(t)
    },
    copyPosition: function(t) {
        var e = this.elements
          , r = t.elements;
        return e[12] = r[12],
        e[13] = r[13],
        e[14] = r[14],
        this
    },
    extractBasis: function(t, e, r) {
        var i = this.elements;
        return t.set(i[0], i[1], i[2]),
        e.set(i[4], i[5], i[6]),
        r.set(i[8], i[9], i[10]),
        this
    },
    makeBasis: function(t, e, r) {
        return this.set(t.x, e.x, r.x, 0, t.y, e.y, r.y, 0, t.z, e.z, r.z, 0, 0, 0, 0, 1),
        this
    },
    extractRotation: function() {
        var t = new THREE.Vector3;
        return function(e) {
            var r = this.elements
              , i = e.elements
              , n = 1 / t.set(i[0], i[1], i[2]).length()
              , o = 1 / t.set(i[4], i[5], i[6]).length()
              , a = 1 / t.set(i[8], i[9], i[10]).length();
            return r[0] = i[0] * n,
            r[1] = i[1] * n,
            r[2] = i[2] * n,
            r[4] = i[4] * o,
            r[5] = i[5] * o,
            r[6] = i[6] * o,
            r[8] = i[8] * a,
            r[9] = i[9] * a,
            r[10] = i[10] * a,
            this
        }
    }(),
    makeRotationFromEuler: function(t) {
        t instanceof THREE.Euler == !1 && THREE.error("THREE.Matrix: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.");
        var e = this.elements
          , r = t.x
          , i = t.y
          , n = t.z
          , o = Math.cos(r)
          , a = Math.sin(r)
          , s = Math.cos(i)
          , h = Math.sin(i)
          , c = Math.cos(n)
          , l = Math.sin(n);
        if ("XYZ" === t.order) {
            var u = o * c
              , E = o * l
              , p = a * c
              , d = a * l;
            e[0] = s * c,
            e[4] = -s * l,
            e[8] = h,
            e[1] = E + p * h,
            e[5] = u - d * h,
            e[9] = -a * s,
            e[2] = d - u * h,
            e[6] = p + E * h,
            e[10] = o * s
        } else if ("YXZ" === t.order) {
            var f = s * c
              , m = s * l
              , T = h * c
              , g = h * l;
            e[0] = f + g * a,
            e[4] = T * a - m,
            e[8] = o * h,
            e[1] = o * l,
            e[5] = o * c,
            e[9] = -a,
            e[2] = m * a - T,
            e[6] = g + f * a,
            e[10] = o * s
        } else if ("ZXY" === t.order) {
            f = s * c,
            m = s * l,
            T = h * c,
            g = h * l;
            e[0] = f - g * a,
            e[4] = -o * l,
            e[8] = T + m * a,
            e[1] = m + T * a,
            e[5] = o * c,
            e[9] = g - f * a,
            e[2] = -o * h,
            e[6] = a,
            e[10] = o * s
        } else if ("ZYX" === t.order) {
            u = o * c,
            E = o * l,
            p = a * c,
            d = a * l;
            e[0] = s * c,
            e[4] = p * h - E,
            e[8] = u * h + d,
            e[1] = s * l,
            e[5] = d * h + u,
            e[9] = E * h - p,
            e[2] = -h,
            e[6] = a * s,
            e[10] = o * s
        } else if ("YZX" === t.order) {
            var v = o * s
              , R = o * h
              , y = a * s
              , H = a * h;
            e[0] = s * c,
            e[4] = H - v * l,
            e[8] = y * l + R,
            e[1] = l,
            e[5] = o * c,
            e[9] = -a * c,
            e[2] = -h * c,
            e[6] = R * l + y,
            e[10] = v - H * l
        } else if ("XZY" === t.order) {
            v = o * s,
            R = o * h,
            y = a * s,
            H = a * h;
            e[0] = s * c,
            e[4] = -l,
            e[8] = h * c,
            e[1] = v * l + H,
            e[5] = o * c,
            e[9] = R * l - y,
            e[2] = y * l - R,
            e[6] = a * c,
            e[10] = H * l + v
        }
        return e[3] = 0,
        e[7] = 0,
        e[11] = 0,
        e[12] = 0,
        e[13] = 0,
        e[14] = 0,
        e[15] = 1,
        this
    },
    setRotationFromQuaternion: function(t) {
        return THREE.warn("THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion()."),
        this.makeRotationFromQuaternion(t)
    },
    makeRotationFromQuaternion: function(t) {
        var e = this.elements
          , r = t.x
          , i = t.y
          , n = t.z
          , o = t.w
          , a = r + r
          , s = i + i
          , h = n + n
          , c = r * a
          , l = r * s
          , u = r * h
          , E = i * s
          , p = i * h
          , d = n * h
          , f = o * a
          , m = o * s
          , T = o * h;
        return e[0] = 1 - (E + d),
        e[4] = l - T,
        e[8] = u + m,
        e[1] = l + T,
        e[5] = 1 - (c + d),
        e[9] = p - f,
        e[2] = u - m,
        e[6] = p + f,
        e[10] = 1 - (c + E),
        e[3] = 0,
        e[7] = 0,
        e[11] = 0,
        e[12] = 0,
        e[13] = 0,
        e[14] = 0,
        e[15] = 1,
        this
    },
    lookAt: function() {
        var t = new THREE.Vector3
          , e = new THREE.Vector3
          , r = new THREE.Vector3;
        return function(i, n, o) {
            var a = this.elements;
            return r.subVectors(i, n).normalize(),
            0 === r.length() && (r.z = 1),
            t.crossVectors(o, r).normalize(),
            0 === t.length() && (r.x += 1e-4,
            t.crossVectors(o, r).normalize()),
            e.crossVectors(r, t),
            a[0] = t.x,
            a[4] = e.x,
            a[8] = r.x,
            a[1] = t.y,
            a[5] = e.y,
            a[9] = r.y,
            a[2] = t.z,
            a[6] = e.z,
            a[10] = r.z,
            this
        }
    }(),
    multiply: function(t, e) {
        return void 0 !== e ? (THREE.warn("THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead."),
        this.multiplyMatrices(t, e)) : this.multiplyMatrices(this, t)
    },
    multiplyMatrices: function(t, e) {
        var r = t.elements
          , i = e.elements
          , n = this.elements
          , o = r[0]
          , a = r[4]
          , s = r[8]
          , h = r[12]
          , c = r[1]
          , l = r[5]
          , u = r[9]
          , E = r[13]
          , p = r[2]
          , d = r[6]
          , f = r[10]
          , m = r[14]
          , T = r[3]
          , g = r[7]
          , v = r[11]
          , R = r[15]
          , y = i[0]
          , H = i[4]
          , x = i[8]
          , w = i[12]
          , b = i[1]
          , M = i[5]
          , _ = i[9]
          , S = i[13]
          , C = i[2]
          , A = i[6]
          , L = i[10]
          , P = i[14]
          , F = i[3]
          , B = i[7]
          , U = i[11]
          , V = i[15];
        return n[0] = o * y + a * b + s * C + h * F,
        n[4] = o * H + a * M + s * A + h * B,
        n[8] = o * x + a * _ + s * L + h * U,
        n[12] = o * w + a * S + s * P + h * V,
        n[1] = c * y + l * b + u * C + E * F,
        n[5] = c * H + l * M + u * A + E * B,
        n[9] = c * x + l * _ + u * L + E * U,
        n[13] = c * w + l * S + u * P + E * V,
        n[2] = p * y + d * b + f * C + m * F,
        n[6] = p * H + d * M + f * A + m * B,
        n[10] = p * x + d * _ + f * L + m * U,
        n[14] = p * w + d * S + f * P + m * V,
        n[3] = T * y + g * b + v * C + R * F,
        n[7] = T * H + g * M + v * A + R * B,
        n[11] = T * x + g * _ + v * L + R * U,
        n[15] = T * w + g * S + v * P + R * V,
        this
    },
    multiplyToArray: function(t, e, r) {
        var i = this.elements;
        return this.multiplyMatrices(t, e),
        r[0] = i[0],
        r[1] = i[1],
        r[2] = i[2],
        r[3] = i[3],
        r[4] = i[4],
        r[5] = i[5],
        r[6] = i[6],
        r[7] = i[7],
        r[8] = i[8],
        r[9] = i[9],
        r[10] = i[10],
        r[11] = i[11],
        r[12] = i[12],
        r[13] = i[13],
        r[14] = i[14],
        r[15] = i[15],
        this
    },
    multiplyScalar: function(t) {
        var e = this.elements;
        return e[0] *= t,
        e[4] *= t,
        e[8] *= t,
        e[12] *= t,
        e[1] *= t,
        e[5] *= t,
        e[9] *= t,
        e[13] *= t,
        e[2] *= t,
        e[6] *= t,
        e[10] *= t,
        e[14] *= t,
        e[3] *= t,
        e[7] *= t,
        e[11] *= t,
        e[15] *= t,
        this
    },
    multiplyVector3: function(t) {
        return THREE.warn("THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) or vector.applyProjection( matrix ) instead."),
        t.applyProjection(this)
    },
    multiplyVector4: function(t) {
        return THREE.warn("THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead."),
        t.applyMatrix4(this)
    },
    multiplyVector3Array: function(t) {
        return THREE.warn("THREE.Matrix4: .multiplyVector3Array() has been renamed. Use matrix.applyToVector3Array( array ) instead."),
        this.applyToVector3Array(t)
    },
    applyToVector3Array: function() {
        var t = new THREE.Vector3;
        return function(e, r, i) {
            void 0 === r && (r = 0),
            void 0 === i && (i = e.length);
            for (var n = 0, o = r; n < i; n += 3,
            o += 3)
                t.x = e[o],
                t.y = e[o + 1],
                t.z = e[o + 2],
                t.applyMatrix4(this),
                e[o] = t.x,
                e[o + 1] = t.y,
                e[o + 2] = t.z;
            return e
        }
    }(),
    rotateAxis: function(t) {
        THREE.warn("THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead."),
        t.transformDirection(this)
    },
    crossVector: function(t) {
        return THREE.warn("THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead."),
        t.applyMatrix4(this)
    },
    determinant: function() {
        var t = this.elements
          , e = t[0]
          , r = t[4]
          , i = t[8]
          , n = t[12]
          , o = t[1]
          , a = t[5]
          , s = t[9]
          , h = t[13]
          , c = t[2]
          , l = t[6]
          , u = t[10]
          , E = t[14];
        return t[3] * (+n * s * l - i * h * l - n * a * u + r * h * u + i * a * E - r * s * E) + t[7] * (+e * s * E - e * h * u + n * o * u - i * o * E + i * h * c - n * s * c) + t[11] * (+e * h * l - e * a * E - n * o * l + r * o * E + n * a * c - r * h * c) + t[15] * (-i * a * c - e * s * l + e * a * u + i * o * l - r * o * u + r * s * c)
    },
    transpose: function() {
        var t, e = this.elements;
        return t = e[1],
        e[1] = e[4],
        e[4] = t,
        t = e[2],
        e[2] = e[8],
        e[8] = t,
        t = e[6],
        e[6] = e[9],
        e[9] = t,
        t = e[3],
        e[3] = e[12],
        e[12] = t,
        t = e[7],
        e[7] = e[13],
        e[13] = t,
        t = e[11],
        e[11] = e[14],
        e[14] = t,
        this
    },
    flattenToArrayOffset: function(t, e) {
        var r = this.elements;
        return t[e] = r[0],
        t[e + 1] = r[1],
        t[e + 2] = r[2],
        t[e + 3] = r[3],
        t[e + 4] = r[4],
        t[e + 5] = r[5],
        t[e + 6] = r[6],
        t[e + 7] = r[7],
        t[e + 8] = r[8],
        t[e + 9] = r[9],
        t[e + 10] = r[10],
        t[e + 11] = r[11],
        t[e + 12] = r[12],
        t[e + 13] = r[13],
        t[e + 14] = r[14],
        t[e + 15] = r[15],
        t
    },
    getPosition: function() {
        var t = new THREE.Vector3;
        return function() {
            THREE.warn("THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.");
            var e = this.elements;
            return t.set(e[12], e[13], e[14])
        }
    }(),
    setPosition: function(t) {
        var e = this.elements;
        return e[12] = t.x,
        e[13] = t.y,
        e[14] = t.z,
        this
    },
    getInverse: function(t, e) {
        var r = this.elements
          , i = t.elements
          , n = i[0]
          , o = i[4]
          , a = i[8]
          , s = i[12]
          , h = i[1]
          , c = i[5]
          , l = i[9]
          , u = i[13]
          , E = i[2]
          , p = i[6]
          , d = i[10]
          , f = i[14]
          , m = i[3]
          , T = i[7]
          , g = i[11]
          , v = i[15];
        r[0] = l * f * T - u * d * T + u * p * g - c * f * g - l * p * v + c * d * v,
        r[4] = s * d * T - a * f * T - s * p * g + o * f * g + a * p * v - o * d * v,
        r[8] = a * u * T - s * l * T + s * c * g - o * u * g - a * c * v + o * l * v,
        r[12] = s * l * p - a * u * p - s * c * d + o * u * d + a * c * f - o * l * f,
        r[1] = u * d * m - l * f * m - u * E * g + h * f * g + l * E * v - h * d * v,
        r[5] = a * f * m - s * d * m + s * E * g - n * f * g - a * E * v + n * d * v,
        r[9] = s * l * m - a * u * m - s * h * g + n * u * g + a * h * v - n * l * v,
        r[13] = a * u * E - s * l * E + s * h * d - n * u * d - a * h * f + n * l * f,
        r[2] = c * f * m - u * p * m + u * E * T - h * f * T - c * E * v + h * p * v,
        r[6] = s * p * m - o * f * m - s * E * T + n * f * T + o * E * v - n * p * v,
        r[10] = o * u * m - s * c * m + s * h * T - n * u * T - o * h * v + n * c * v,
        r[14] = s * c * E - o * u * E - s * h * p + n * u * p + o * h * f - n * c * f,
        r[3] = l * p * m - c * d * m - l * E * T + h * d * T + c * E * g - h * p * g,
        r[7] = o * d * m - a * p * m + a * E * T - n * d * T - o * E * g + n * p * g,
        r[11] = a * c * m - o * l * m - a * h * T + n * l * T + o * h * g - n * c * g,
        r[15] = o * l * E - a * c * E + a * h * p - n * l * p - o * h * d + n * c * d;
        var R = n * r[0] + h * r[4] + E * r[8] + m * r[12];
        if (0 == R) {
            var y = "THREE.Matrix4.getInverse(): can't invert matrix, determinant is 0";
            if (e)
                throw new Error(y);
            return THREE.warn(y),
            this.identity(),
            this
        }
        return this.multiplyScalar(1 / R),
        this
    },
    translate: function(t) {
        THREE.error("THREE.Matrix4: .translate() has been removed.")
    },
    rotateX: function(t) {
        THREE.error("THREE.Matrix4: .rotateX() has been removed.")
    },
    rotateY: function(t) {
        THREE.error("THREE.Matrix4: .rotateY() has been removed.")
    },
    rotateZ: function(t) {
        THREE.error("THREE.Matrix4: .rotateZ() has been removed.")
    },
    rotateByAxis: function(t, e) {
        THREE.error("THREE.Matrix4: .rotateByAxis() has been removed.")
    },
    scale: function(t) {
        var e = this.elements
          , r = t.x
          , i = t.y
          , n = t.z;
        return e[0] *= r,
        e[4] *= i,
        e[8] *= n,
        e[1] *= r,
        e[5] *= i,
        e[9] *= n,
        e[2] *= r,
        e[6] *= i,
        e[10] *= n,
        e[3] *= r,
        e[7] *= i,
        e[11] *= n,
        this
    },
    getMaxScaleOnAxis: function() {
        var t = this.elements
          , e = t[0] * t[0] + t[1] * t[1] + t[2] * t[2]
          , r = t[4] * t[4] + t[5] * t[5] + t[6] * t[6]
          , i = t[8] * t[8] + t[9] * t[9] + t[10] * t[10];
        return Math.sqrt(Math.max(e, Math.max(r, i)))
    },
    makeTranslation: function(t, e, r) {
        return this.set(1, 0, 0, t, 0, 1, 0, e, 0, 0, 1, r, 0, 0, 0, 1),
        this
    },
    makeRotationX: function(t) {
        var e = Math.cos(t)
          , r = Math.sin(t);
        return this.set(1, 0, 0, 0, 0, e, -r, 0, 0, r, e, 0, 0, 0, 0, 1),
        this
    },
    makeRotationY: function(t) {
        var e = Math.cos(t)
          , r = Math.sin(t);
        return this.set(e, 0, r, 0, 0, 1, 0, 0, -r, 0, e, 0, 0, 0, 0, 1),
        this
    },
    makeRotationZ: function(t) {
        var e = Math.cos(t)
          , r = Math.sin(t);
        return this.set(e, -r, 0, 0, r, e, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1),
        this
    },
    makeRotationAxis: function(t, e) {
        var r = Math.cos(e)
          , i = Math.sin(e)
          , n = 1 - r
          , o = t.x
          , a = t.y
          , s = t.z
          , h = n * o
          , c = n * a;
        return this.set(h * o + r, h * a - i * s, h * s + i * a, 0, h * a + i * s, c * a + r, c * s - i * o, 0, h * s - i * a, c * s + i * o, n * s * s + r, 0, 0, 0, 0, 1),
        this
    },
    makeScale: function(t, e, r) {
        return this.set(t, 0, 0, 0, 0, e, 0, 0, 0, 0, r, 0, 0, 0, 0, 1),
        this
    },
    compose: function(t, e, r) {
        return this.makeRotationFromQuaternion(e),
        this.scale(r),
        this.setPosition(t),
        this
    },
    decompose: function() {
        var t = new THREE.Vector3
          , e = new THREE.Matrix4;
        return function(r, i, n) {
            var o = this.elements
              , a = t.set(o[0], o[1], o[2]).length()
              , s = t.set(o[4], o[5], o[6]).length()
              , h = t.set(o[8], o[9], o[10]).length();
            this.determinant() < 0 && (a = -a),
            r.x = o[12],
            r.y = o[13],
            r.z = o[14],
            e.elements.set(this.elements);
            var c = 1 / a
              , l = 1 / s
              , u = 1 / h;
            return e.elements[0] *= c,
            e.elements[1] *= c,
            e.elements[2] *= c,
            e.elements[4] *= l,
            e.elements[5] *= l,
            e.elements[6] *= l,
            e.elements[8] *= u,
            e.elements[9] *= u,
            e.elements[10] *= u,
            i.setFromRotationMatrix(e),
            n.x = a,
            n.y = s,
            n.z = h,
            this
        }
    }(),
    makeFrustum: function(t, e, r, i, n, o) {
        var a = this.elements
          , s = 2 * n / (e - t)
          , h = 2 * n / (i - r)
          , c = (e + t) / (e - t)
          , l = (i + r) / (i - r)
          , u = -(o + n) / (o - n)
          , E = -2 * o * n / (o - n);
        return a[0] = s,
        a[4] = 0,
        a[8] = c,
        a[12] = 0,
        a[1] = 0,
        a[5] = h,
        a[9] = l,
        a[13] = 0,
        a[2] = 0,
        a[6] = 0,
        a[10] = u,
        a[14] = E,
        a[3] = 0,
        a[7] = 0,
        a[11] = -1,
        a[15] = 0,
        this
    },
    makePerspective: function(t, e, r, i) {
        var n = r * Math.tan(THREE.Math.degToRad(.5 * t))
          , o = -n
          , a = o * e
          , s = n * e;
        return this.makeFrustum(a, s, o, n, r, i)
    },
    makeOrthographic: function(t, e, r, i, n, o) {
        var a = this.elements
          , s = e - t
          , h = r - i
          , c = o - n
          , l = (e + t) / s
          , u = (r + i) / h
          , E = (o + n) / c;
        return a[0] = 2 / s,
        a[4] = 0,
        a[8] = 0,
        a[12] = -l,
        a[1] = 0,
        a[5] = 2 / h,
        a[9] = 0,
        a[13] = -u,
        a[2] = 0,
        a[6] = 0,
        a[10] = -2 / c,
        a[14] = -E,
        a[3] = 0,
        a[7] = 0,
        a[11] = 0,
        a[15] = 1,
        this
    },
    fromArray: function(t) {
        return this.elements.set(t),
        this
    },
    toArray: function() {
        var t = this.elements;
        return [t[0], t[1], t[2], t[3], t[4], t[5], t[6], t[7], t[8], t[9], t[10], t[11], t[12], t[13], t[14], t[15]]
    },
    clone: function() {
        return (new THREE.Matrix4).fromArray(this.elements)
    }
},
THREE.Ray = function(t, e) {
    this.origin = void 0 !== t ? t : new THREE.Vector3,
    this.direction = void 0 !== e ? e : new THREE.Vector3
}
,
THREE.Ray.prototype = {
    constructor: THREE.Ray,
    set: function(t, e) {
        return this.origin.copy(t),
        this.direction.copy(e),
        this
    },
    copy: function(t) {
        return this.origin.copy(t.origin),
        this.direction.copy(t.direction),
        this
    },
    at: function(t, e) {
        return (e || new THREE.Vector3).copy(this.direction).multiplyScalar(t).add(this.origin)
    },
    recast: function() {
        var t = new THREE.Vector3;
        return function(e) {
            return this.origin.copy(this.at(e, t)),
            this
        }
    }(),
    closestPointToPoint: function(t, e) {
        var r = e || new THREE.Vector3;
        r.subVectors(t, this.origin);
        var i = r.dot(this.direction);
        return i < 0 ? r.copy(this.origin) : r.copy(this.direction).multiplyScalar(i).add(this.origin)
    },
    distanceToPoint: function() {
        var t = new THREE.Vector3;
        return function(e) {
            var r = t.subVectors(e, this.origin).dot(this.direction);
            return r < 0 ? this.origin.distanceTo(e) : (t.copy(this.direction).multiplyScalar(r).add(this.origin),
            t.distanceTo(e))
        }
    }(),
    distanceSqToSegment: function() {
        var t = new THREE.Vector3
          , e = new THREE.Vector3
          , r = new THREE.Vector3;
        return function(i, n, o, a) {
            t.copy(i).add(n).multiplyScalar(.5),
            e.copy(n).sub(i).normalize(),
            r.copy(this.origin).sub(t);
            var s, h, c, l, u = .5 * i.distanceTo(n), E = -this.direction.dot(e), p = r.dot(this.direction), d = -r.dot(e), f = r.lengthSq(), m = Math.abs(1 - E * E);
            if (m > 0)
                if (h = E * p - d,
                l = u * m,
                (s = E * d - p) >= 0)
                    if (h >= -l)
                        if (h <= l) {
                            var T = 1 / m;
                            c = (s *= T) * (s + E * (h *= T) + 2 * p) + h * (E * s + h + 2 * d) + f
                        } else
                            h = u,
                            c = -(s = Math.max(0, -(E * h + p))) * s + h * (h + 2 * d) + f;
                    else
                        h = -u,
                        c = -(s = Math.max(0, -(E * h + p))) * s + h * (h + 2 * d) + f;
                else
                    h <= -l ? c = -(s = Math.max(0, -(-E * u + p))) * s + (h = s > 0 ? -u : Math.min(Math.max(-u, -d), u)) * (h + 2 * d) + f : h <= l ? (s = 0,
                    c = (h = Math.min(Math.max(-u, -d), u)) * (h + 2 * d) + f) : c = -(s = Math.max(0, -(E * u + p))) * s + (h = s > 0 ? u : Math.min(Math.max(-u, -d), u)) * (h + 2 * d) + f;
            else
                h = E > 0 ? -u : u,
                c = -(s = Math.max(0, -(E * h + p))) * s + h * (h + 2 * d) + f;
            return o && o.copy(this.direction).multiplyScalar(s).add(this.origin),
            a && a.copy(e).multiplyScalar(h).add(t),
            c
        }
    }(),
    isIntersectionSphere: function(t) {
        return this.distanceToPoint(t.center) <= t.radius
    },
    intersectSphere: function() {
        var t = new THREE.Vector3;
        return function(e, r) {
            t.subVectors(e.center, this.origin);
            var i = t.dot(this.direction)
              , n = t.dot(t) - i * i
              , o = e.radius * e.radius;
            if (n > o)
                return null;
            var a = Math.sqrt(o - n)
              , s = i - a
              , h = i + a;
            return s < 0 && h < 0 ? null : s < 0 ? this.at(h, r) : this.at(s, r)
        }
    }(),
    isIntersectionPlane: function(t) {
        var e = t.distanceToPoint(this.origin);
        return 0 === e || t.normal.dot(this.direction) * e < 0
    },
    distanceToPlane: function(t) {
        var e = t.normal.dot(this.direction);
        if (0 == e)
            return 0 == t.distanceToPoint(this.origin) ? 0 : null;
        var r = -(this.origin.dot(t.normal) + t.constant) / e;
        return r >= 0 ? r : null
    },
    intersectPlane: function(t, e) {
        var r = this.distanceToPlane(t);
        return null === r ? null : this.at(r, e)
    },
    isIntersectionBox: function() {
        var t = new THREE.Vector3;
        return function(e) {
            return null !== this.intersectBox(e, t)
        }
    }(),
    intersectBox: function(t, e) {
        var r, i, n, o, a, s, h = 1 / this.direction.x, c = 1 / this.direction.y, l = 1 / this.direction.z, u = this.origin;
        return h >= 0 ? (r = (t.min.x - u.x) * h,
        i = (t.max.x - u.x) * h) : (r = (t.max.x - u.x) * h,
        i = (t.min.x - u.x) * h),
        c >= 0 ? (n = (t.min.y - u.y) * c,
        o = (t.max.y - u.y) * c) : (n = (t.max.y - u.y) * c,
        o = (t.min.y - u.y) * c),
        r > o || n > i ? null : ((n > r || r != r) && (r = n),
        (o < i || i != i) && (i = o),
        l >= 0 ? (a = (t.min.z - u.z) * l,
        s = (t.max.z - u.z) * l) : (a = (t.max.z - u.z) * l,
        s = (t.min.z - u.z) * l),
        r > s || a > i ? null : ((a > r || r != r) && (r = a),
        (s < i || i != i) && (i = s),
        i < 0 ? null : this.at(r >= 0 ? r : i, e)))
    },
    intersectTriangle: function() {
        var t = new THREE.Vector3
          , e = new THREE.Vector3
          , r = new THREE.Vector3
          , i = new THREE.Vector3;
        return function(n, o, a, s, h) {
            e.subVectors(o, n),
            r.subVectors(a, n),
            i.crossVectors(e, r);
            var c, l = this.direction.dot(i);
            if (l > 0) {
                if (s)
                    return null;
                c = 1
            } else {
                if (!(l < 0))
                    return null;
                c = -1,
                l = -l
            }
            t.subVectors(this.origin, n);
            var u = c * this.direction.dot(r.crossVectors(t, r));
            if (u < 0)
                return null;
            var E = c * this.direction.dot(e.cross(t));
            if (E < 0)
                return null;
            if (u + E > l)
                return null;
            var p = -c * t.dot(i);
            return p < 0 ? null : this.at(p / l, h)
        }
    }(),
    applyMatrix4: function(t) {
        return this.direction.add(this.origin).applyMatrix4(t),
        this.origin.applyMatrix4(t),
        this.direction.sub(this.origin),
        this.direction.normalize(),
        this
    },
    equals: function(t) {
        return t.origin.equals(this.origin) && t.direction.equals(this.direction)
    },
    clone: function() {
        return (new THREE.Ray).copy(this)
    }
},
THREE.Sphere = function(t, e) {
    this.center = void 0 !== t ? t : new THREE.Vector3,
    this.radius = void 0 !== e ? e : 0
}
,
THREE.Sphere.prototype = {
    constructor: THREE.Sphere,
    set: function(t, e) {
        return this.center.copy(t),
        this.radius = e,
        this
    },
    setFromPoints: function() {
        var t = new THREE.Box3;
        return function(e, r) {
            var i = this.center;
            void 0 !== r ? i.copy(r) : t.setFromPoints(e).center(i);
            for (var n = 0, o = 0, a = e.length; o < a; o++)
                n = Math.max(n, i.distanceToSquared(e[o]));
            return this.radius = Math.sqrt(n),
            this
        }
    }(),
    copy: function(t) {
        return this.center.copy(t.center),
        this.radius = t.radius,
        this
    },
    empty: function() {
        return this.radius <= 0
    },
    containsPoint: function(t) {
        return t.distanceToSquared(this.center) <= this.radius * this.radius
    },
    distanceToPoint: function(t) {
        return t.distanceTo(this.center) - this.radius
    },
    intersectsSphere: function(t) {
        var e = this.radius + t.radius;
        return t.center.distanceToSquared(this.center) <= e * e
    },
    clampPoint: function(t, e) {
        var r = this.center.distanceToSquared(t)
          , i = e || new THREE.Vector3;
        return i.copy(t),
        r > this.radius * this.radius && (i.sub(this.center).normalize(),
        i.multiplyScalar(this.radius).add(this.center)),
        i
    },
    getBoundingBox: function(t) {
        var e = t || new THREE.Box3;
        return e.set(this.center, this.center),
        e.expandByScalar(this.radius),
        e
    },
    applyMatrix4: function(t) {
        return this.center.applyMatrix4(t),
        this.radius = this.radius * t.getMaxScaleOnAxis(),
        this
    },
    translate: function(t) {
        return this.center.add(t),
        this
    },
    equals: function(t) {
        return t.center.equals(this.center) && t.radius === this.radius
    },
    clone: function() {
        return (new THREE.Sphere).copy(this)
    }
},
THREE.Frustum = function(t, e, r, i, n, o) {
    this.planes = [void 0 !== t ? t : new THREE.Plane, void 0 !== e ? e : new THREE.Plane, void 0 !== r ? r : new THREE.Plane, void 0 !== i ? i : new THREE.Plane, void 0 !== n ? n : new THREE.Plane, void 0 !== o ? o : new THREE.Plane]
}
,
THREE.Frustum.prototype = {
    constructor: THREE.Frustum,
    set: function(t, e, r, i, n, o) {
        var a = this.planes;
        return a[0].copy(t),
        a[1].copy(e),
        a[2].copy(r),
        a[3].copy(i),
        a[4].copy(n),
        a[5].copy(o),
        this
    },
    copy: function(t) {
        for (var e = this.planes, r = 0; r < 6; r++)
            e[r].copy(t.planes[r]);
        return this
    },
    setFromMatrix: function(t) {
        var e = this.planes
          , r = t.elements
          , i = r[0]
          , n = r[1]
          , o = r[2]
          , a = r[3]
          , s = r[4]
          , h = r[5]
          , c = r[6]
          , l = r[7]
          , u = r[8]
          , E = r[9]
          , p = r[10]
          , d = r[11]
          , f = r[12]
          , m = r[13]
          , T = r[14]
          , g = r[15];
        return e[0].setComponents(a - i, l - s, d - u, g - f).normalize(),
        e[1].setComponents(a + i, l + s, d + u, g + f).normalize(),
        e[2].setComponents(a + n, l + h, d + E, g + m).normalize(),
        e[3].setComponents(a - n, l - h, d - E, g - m).normalize(),
        e[4].setComponents(a - o, l - c, d - p, g - T).normalize(),
        e[5].setComponents(a + o, l + c, d + p, g + T).normalize(),
        this
    },
    intersectsObject: function() {
        var t = new THREE.Sphere;
        return function(e) {
            var r = e.geometry;
            return null === r.boundingSphere && r.computeBoundingSphere(),
            t.copy(r.boundingSphere),
            t.applyMatrix4(e.matrixWorld),
            this.intersectsSphere(t)
        }
    }(),
    intersectsSphere: function(t) {
        for (var e = this.planes, r = t.center, i = -t.radius, n = 0; n < 6; n++) {
            if (e[n].distanceToPoint(r) < i)
                return !1
        }
        return !0
    },
    intersectsBox: function() {
        var t = new THREE.Vector3
          , e = new THREE.Vector3;
        return function(r) {
            for (var i = this.planes, n = 0; n < 6; n++) {
                var o = i[n];
                t.x = o.normal.x > 0 ? r.min.x : r.max.x,
                e.x = o.normal.x > 0 ? r.max.x : r.min.x,
                t.y = o.normal.y > 0 ? r.min.y : r.max.y,
                e.y = o.normal.y > 0 ? r.max.y : r.min.y,
                t.z = o.normal.z > 0 ? r.min.z : r.max.z,
                e.z = o.normal.z > 0 ? r.max.z : r.min.z;
                var a = o.distanceToPoint(t)
                  , s = o.distanceToPoint(e);
                if (a < 0 && s < 0)
                    return !1
            }
            return !0
        }
    }(),
    containsPoint: function(t) {
        for (var e = this.planes, r = 0; r < 6; r++)
            if (e[r].distanceToPoint(t) < 0)
                return !1;
        return !0
    },
    clone: function() {
        return (new THREE.Frustum).copy(this)
    }
},
THREE.Plane = function(t, e) {
    this.normal = void 0 !== t ? t : new THREE.Vector3(1,0,0),
    this.constant = void 0 !== e ? e : 0
}
,
THREE.Plane.prototype = {
    constructor: THREE.Plane,
    set: function(t, e) {
        return this.normal.copy(t),
        this.constant = e,
        this
    },
    setComponents: function(t, e, r, i) {
        return this.normal.set(t, e, r),
        this.constant = i,
        this
    },
    setFromNormalAndCoplanarPoint: function(t, e) {
        return this.normal.copy(t),
        this.constant = -e.dot(this.normal),
        this
    },
    setFromCoplanarPoints: function() {
        var t = new THREE.Vector3
          , e = new THREE.Vector3;
        return function(r, i, n) {
            var o = t.subVectors(n, i).cross(e.subVectors(r, i)).normalize();
            return this.setFromNormalAndCoplanarPoint(o, r),
            this
        }
    }(),
    copy: function(t) {
        return this.normal.copy(t.normal),
        this.constant = t.constant,
        this
    },
    normalize: function() {
        var t = 1 / this.normal.length();
        return this.normal.multiplyScalar(t),
        this.constant *= t,
        this
    },
    negate: function() {
        return this.constant *= -1,
        this.normal.negate(),
        this
    },
    distanceToPoint: function(t) {
        return this.normal.dot(t) + this.constant
    },
    distanceToSphere: function(t) {
        return this.distanceToPoint(t.center) - t.radius
    },
    projectPoint: function(t, e) {
        return this.orthoPoint(t, e).sub(t).negate()
    },
    orthoPoint: function(t, e) {
        var r = this.distanceToPoint(t);
        return (e || new THREE.Vector3).copy(this.normal).multiplyScalar(r)
    },
    isIntersectionLine: function(t) {
        var e = this.distanceToPoint(t.start)
          , r = this.distanceToPoint(t.end);
        return e < 0 && r > 0 || r < 0 && e > 0
    },
    intersectLine: function() {
        var t = new THREE.Vector3;
        return function(e, r) {
            var i = r || new THREE.Vector3
              , n = e.delta(t)
              , o = this.normal.dot(n);
            if (0 == o)
                return 0 == this.distanceToPoint(e.start) ? i.copy(e.start) : void 0;
            var a = -(e.start.dot(this.normal) + this.constant) / o;
            return a < 0 || a > 1 ? void 0 : i.copy(n).multiplyScalar(a).add(e.start)
        }
    }(),
    coplanarPoint: function(t) {
        return (t || new THREE.Vector3).copy(this.normal).multiplyScalar(-this.constant)
    },
    applyMatrix4: function() {
        var t = new THREE.Vector3
          , e = new THREE.Vector3
          , r = new THREE.Matrix3;
        return function(i, n) {
            var o = n || r.getNormalMatrix(i)
              , a = t.copy(this.normal).applyMatrix3(o)
              , s = this.coplanarPoint(e);
            return s.applyMatrix4(i),
            this.setFromNormalAndCoplanarPoint(a, s),
            this
        }
    }(),
    translate: function(t) {
        return this.constant = this.constant - t.dot(this.normal),
        this
    },
    equals: function(t) {
        return t.normal.equals(this.normal) && t.constant == this.constant
    },
    clone: function() {
        return (new THREE.Plane).copy(this)
    }
},
THREE.Math = {
    generateUUID: function() {
        var t, e = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""), r = new Array(36), i = 0;
        return function() {
            for (var n = 0; n < 36; n++)
                8 == n || 13 == n || 18 == n || 23 == n ? r[n] = "-" : 14 == n ? r[n] = "4" : (i <= 2 && (i = 33554432 + 16777216 * Math.random() | 0),
                t = 15 & i,
                i >>= 4,
                r[n] = e[19 == n ? 3 & t | 8 : t]);
            return r.join("")
        }
    }(),
    clamp: function(t, e, r) {
        return t < e ? e : t > r ? r : t
    },
    clampBottom: function(t, e) {
        return t < e ? e : t
    },
    mapLinear: function(t, e, r, i, n) {
        return i + (t - e) * (n - i) / (r - e)
    },
    smoothstep: function(t, e, r) {
        return t <= e ? 0 : t >= r ? 1 : (t = (t - e) / (r - e)) * t * (3 - 2 * t)
    },
    smootherstep: function(t, e, r) {
        return t <= e ? 0 : t >= r ? 1 : (t = (t - e) / (r - e)) * t * t * (t * (6 * t - 15) + 10)
    },
    random16: function() {
        return (65280 * Math.random() + 255 * Math.random()) / 65535
    },
    randInt: function(t, e) {
        return Math.floor(this.randFloat(t, e))
    },
    randFloat: function(t, e) {
        return t + Math.random() * (e - t)
    },
    randFloatSpread: function(t) {
        return t * (.5 - Math.random())
    },
    degToRad: function() {
        var t = Math.PI / 180;
        return function(e) {
            return e * t
        }
    }(),
    radToDeg: function() {
        var t = 180 / Math.PI;
        return function(e) {
            return e * t
        }
    }(),
    isPowerOfTwo: function(t) {
        return 0 == (t & t - 1) && 0 !== t
    },
    nextPowerOfTwo: function(t) {
        return t--,
        t |= t >> 1,
        t |= t >> 2,
        t |= t >> 4,
        t |= t >> 8,
        t |= t >> 16,
        ++t
    }
},
THREE.Spline = function(t) {
    this.points = t;
    var e, r, i, n, o, a, s, h, c, l = [], u = {
        x: 0,
        y: 0,
        z: 0
    };
    function E(t, e, r, i, n, o, a) {
        var s = .5 * (r - t)
          , h = .5 * (i - e);
        return (2 * (e - r) + s + h) * a + (-3 * (e - r) - 2 * s - h) * o + s * n + e
    }
    this.initFromArray = function(t) {
        this.points = [];
        for (var e = 0; e < t.length; e++)
            this.points[e] = {
                x: t[e][0],
                y: t[e][1],
                z: t[e][2]
            }
    }
    ,
    this.getPoint = function(t) {
        return e = (this.points.length - 1) * t,
        r = Math.floor(e),
        i = e - r,
        l[0] = 0 === r ? r : r - 1,
        l[1] = r,
        l[2] = r > this.points.length - 2 ? this.points.length - 1 : r + 1,
        l[3] = r > this.points.length - 3 ? this.points.length - 1 : r + 2,
        a = this.points[l[0]],
        s = this.points[l[1]],
        h = this.points[l[2]],
        c = this.points[l[3]],
        o = i * (n = i * i),
        u.x = E(a.x, s.x, h.x, c.x, i, n, o),
        u.y = E(a.y, s.y, h.y, c.y, i, n, o),
        u.z = E(a.z, s.z, h.z, c.z, i, n, o),
        u
    }
    ,
    this.getControlPointsArray = function() {
        var t, e, r = this.points.length, i = [];
        for (t = 0; t < r; t++)
            e = this.points[t],
            i[t] = [e.x, e.y, e.z];
        return i
    }
    ,
    this.getLength = function(t) {
        var e, r, i, n, o = 0, a = 0, s = 0, h = new THREE.Vector3, c = new THREE.Vector3, l = [], u = 0;
        for (l[0] = 0,
        t || (t = 100),
        i = this.points.length * t,
        h.copy(this.points[0]),
        e = 1; e < i; e++)
            r = e / i,
            n = this.getPoint(r),
            c.copy(n),
            u += c.distanceTo(h),
            h.copy(n),
            o = (this.points.length - 1) * r,
            (a = Math.floor(o)) != s && (l[a] = u,
            s = a);
        return l[l.length] = u,
        {
            chunks: l,
            total: u
        }
    }
    ,
    this.reparametrizeByArcLength = function(t) {
        var e, r, i, n, o, a, s, h, c = [], l = new THREE.Vector3, u = this.getLength();
        for (c.push(l.copy(this.points[0]).clone()),
        e = 1; e < this.points.length; e++) {
            for (a = u.chunks[e] - u.chunks[e - 1],
            s = Math.ceil(t * a / u.total),
            n = (e - 1) / (this.points.length - 1),
            o = e / (this.points.length - 1),
            r = 1; r < s - 1; r++)
                i = n + r * (1 / s) * (o - n),
                h = this.getPoint(i),
                c.push(l.copy(h).clone());
            c.push(l.copy(this.points[e]).clone())
        }
        this.points = c
    }
}
,
THREE.Triangle = function(t, e, r) {
    this.a = void 0 !== t ? t : new THREE.Vector3,
    this.b = void 0 !== e ? e : new THREE.Vector3,
    this.c = void 0 !== r ? r : new THREE.Vector3
}
,
THREE.Triangle.normal = function() {
    var t = new THREE.Vector3;
    return function(e, r, i, n) {
        var o = n || new THREE.Vector3;
        o.subVectors(i, r),
        t.subVectors(e, r),
        o.cross(t);
        var a = o.lengthSq();
        return a > 0 ? o.multiplyScalar(1 / Math.sqrt(a)) : o.set(0, 0, 0)
    }
}(),
THREE.Triangle.barycoordFromPoint = function() {
    var t = new THREE.Vector3
      , e = new THREE.Vector3
      , r = new THREE.Vector3;
    return function(i, n, o, a, s) {
        t.subVectors(a, n),
        e.subVectors(o, n),
        r.subVectors(i, n);
        var h = t.dot(t)
          , c = t.dot(e)
          , l = t.dot(r)
          , u = e.dot(e)
          , E = e.dot(r)
          , p = h * u - c * c
          , d = s || new THREE.Vector3;
        if (0 == p)
            return d.set(-2, -1, -1);
        var f = 1 / p
          , m = (u * l - c * E) * f
          , T = (h * E - c * l) * f;
        return d.set(1 - m - T, T, m)
    }
}(),
THREE.Triangle.containsPoint = function() {
    var t = new THREE.Vector3;
    return function(e, r, i, n) {
        var o = THREE.Triangle.barycoordFromPoint(e, r, i, n, t);
        return o.x >= 0 && o.y >= 0 && o.x + o.y <= 1
    }
}(),
THREE.Triangle.prototype = {
    constructor: THREE.Triangle,
    set: function(t, e, r) {
        return this.a.copy(t),
        this.b.copy(e),
        this.c.copy(r),
        this
    },
    setFromPointsAndIndices: function(t, e, r, i) {
        return this.a.copy(t[e]),
        this.b.copy(t[r]),
        this.c.copy(t[i]),
        this
    },
    copy: function(t) {
        return this.a.copy(t.a),
        this.b.copy(t.b),
        this.c.copy(t.c),
        this
    },
    area: function() {
        var t = new THREE.Vector3
          , e = new THREE.Vector3;
        return function() {
            return t.subVectors(this.c, this.b),
            e.subVectors(this.a, this.b),
            .5 * t.cross(e).length()
        }
    }(),
    midpoint: function(t) {
        return (t || new THREE.Vector3).addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3)
    },
    normal: function(t) {
        return THREE.Triangle.normal(this.a, this.b, this.c, t)
    },
    plane: function(t) {
        return (t || new THREE.Plane).setFromCoplanarPoints(this.a, this.b, this.c)
    },
    barycoordFromPoint: function(t, e) {
        return THREE.Triangle.barycoordFromPoint(t, this.a, this.b, this.c, e)
    },
    containsPoint: function(t) {
        return THREE.Triangle.containsPoint(t, this.a, this.b, this.c)
    },
    equals: function(t) {
        return t.a.equals(this.a) && t.b.equals(this.b) && t.c.equals(this.c)
    },
    clone: function() {
        return (new THREE.Triangle).copy(this)
    }
},
THREE.Clock = function(t) {
    this.autoStart = void 0 === t || t,
    this.startTime = 0,
    this.oldTime = 0,
    this.elapsedTime = 0,
    this.running = !1
}
,
THREE.Clock.prototype = {
    constructor: THREE.Clock,
    start: function() {
        this.startTime = void 0 !== self.performance && void 0 !== self.performance.now ? self.performance.now() : Date.now(),
        this.oldTime = this.startTime,
        this.running = !0
    },
    stop: function() {
        this.getElapsedTime(),
        this.running = !1
    },
    getElapsedTime: function() {
        return this.getDelta(),
        this.elapsedTime
    },
    getDelta: function() {
        var t = 0;
        if (this.autoStart && !this.running && this.start(),
        this.running) {
            var e = void 0 !== self.performance && void 0 !== self.performance.now ? self.performance.now() : Date.now();
            t = .001 * (e - this.oldTime),
            this.oldTime = e,
            this.elapsedTime += t
        }
        return t
    }
},
THREE.EventDispatcher = function() {}
,
THREE.EventDispatcher.prototype = {
    constructor: THREE.EventDispatcher,
    apply: function(t) {
        t.addEventListener = THREE.EventDispatcher.prototype.addEventListener,
        t.hasEventListener = THREE.EventDispatcher.prototype.hasEventListener,
        t.removeEventListener = THREE.EventDispatcher.prototype.removeEventListener,
        t.dispatchEvent = THREE.EventDispatcher.prototype.dispatchEvent
    },
    addEventListener: function(t, e) {
        void 0 === this._listeners && (this._listeners = {});
        var r = this._listeners;
        void 0 === r[t] && (r[t] = []),
        -1 === r[t].indexOf(e) && r[t].push(e)
    },
    hasEventListener: function(t, e) {
        if (void 0 === this._listeners)
            return !1;
        var r = this._listeners;
        return void 0 !== r[t] && -1 !== r[t].indexOf(e)
    },
    removeEventListener: function(t, e) {
        if (void 0 !== this._listeners) {
            var r = this._listeners[t];
            if (void 0 !== r) {
                var i = r.indexOf(e);
                -1 !== i && r.splice(i, 1)
            }
        }
    },
    dispatchEvent: function(t) {
        if (void 0 !== this._listeners) {
            var e = this._listeners[t.type];
            if (void 0 !== e) {
                t.target = this;
                for (var r = [], i = e.length, n = 0; n < i; n++)
                    r[n] = e[n];
                for (n = 0; n < i; n++)
                    r[n].call(this, t)
            }
        }
    }
},
function(t) {
    t.Raycaster = function(e, r, i, n) {
        this.ray = new t.Ray(e,r),
        this.near = i || 0,
        this.far = n || 1 / 0,
        this.params = {
            Sprite: {},
            Mesh: {},
            PointCloud: {
                threshold: 1
            },
            LOD: {},
            Line: {}
        }
    }
    ;
    var e = function(t, e) {
        return t.distance - e.distance
    }
      , r = function(t, e, i, n) {
        if (t.raycast(e, i),
        !0 === n)
            for (var o = t.children, a = 0, s = o.length; a < s; a++)
                r(o[a], e, i, !0)
    };
    t.Raycaster.prototype = {
        constructor: t.Raycaster,
        precision: 1e-4,
        linePrecision: 1,
        set: function(t, e) {
            this.ray.set(t, e)
        },
        setFromCamera: function(e, r) {
            r instanceof t.PerspectiveCamera ? (this.ray.origin.copy(r.position),
            this.ray.direction.set(e.x, e.y, .5).unproject(r).sub(r.position).normalize()) : r instanceof t.OrthographicCamera ? (this.ray.origin.set(e.x, e.y, -1).unproject(r),
            this.ray.direction.set(0, 0, -1).transformDirection(r.matrixWorld)) : t.error("THREE.Raycaster: Unsupported camera type.")
        },
        intersectObject: function(t, i) {
            var n = [];
            return r(t, this, n, i),
            n.sort(e),
            n
        },
        intersectObjects: function(i, n) {
            var o = [];
            if (i instanceof Array == !1)
                return t.warn("THREE.Raycaster.intersectObjects: objects is not an Array."),
                o;
            for (var a = 0, s = i.length; a < s; a++)
                r(i[a], this, o, n);
            return o.sort(e),
            o
        }
    }
}(THREE),
THREE.Object3D = function() {
    Object.defineProperty(this, "id", {
        value: THREE.Object3DIdCount++
    }),
    this.uuid = THREE.Math.generateUUID(),
    this.name = "",
    this.type = "Object3D",
    this.parent = void 0,
    this.children = [],
    this.up = THREE.Object3D.DefaultUp.clone();
    var t = new THREE.Vector3
      , e = new THREE.Euler
      , r = new THREE.Quaternion
      , i = new THREE.Vector3(1,1,1);
    e.onChange(function() {
        r.setFromEuler(e, !1)
    }),
    r.onChange(function() {
        e.setFromQuaternion(r, void 0, !1)
    }),
    Object.defineProperties(this, {
        position: {
            enumerable: !0,
            value: t
        },
        rotation: {
            enumerable: !0,
            value: e
        },
        quaternion: {
            enumerable: !0,
            value: r
        },
        scale: {
            enumerable: !0,
            value: i
        }
    }),
    this.rotationAutoUpdate = !0,
    this.matrix = new THREE.Matrix4,
    this.matrixWorld = new THREE.Matrix4,
    this.matrixAutoUpdate = !0,
    this.matrixWorldNeedsUpdate = !1,
    this.visible = !0,
    this.castShadow = !1,
    this.receiveShadow = !1,
    this.frustumCulled = !0,
    this.renderOrder = 0,
    this.userData = {}
}
,
THREE.Object3D.DefaultUp = new THREE.Vector3(0,1,0),
THREE.Object3D.prototype = {
    constructor: THREE.Object3D,
    get eulerOrder() {
        return THREE.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order."),
        this.rotation.order
    },
    set eulerOrder(t) {
        THREE.warn("THREE.Object3D: .eulerOrder has been moved to .rotation.order."),
        this.rotation.order = t
    },
    get useQuaternion() {
        THREE.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
    },
    set useQuaternion(t) {
        THREE.warn("THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.")
    },
    applyMatrix: function(t) {
        this.matrix.multiplyMatrices(t, this.matrix),
        this.matrix.decompose(this.position, this.quaternion, this.scale)
    },
    setRotationFromAxisAngle: function(t, e) {
        this.quaternion.setFromAxisAngle(t, e)
    },
    setRotationFromEuler: function(t) {
        this.quaternion.setFromEuler(t, !0)
    },
    setRotationFromMatrix: function(t) {
        this.quaternion.setFromRotationMatrix(t)
    },
    setRotationFromQuaternion: function(t) {
        this.quaternion.copy(t)
    },
    rotateOnAxis: function() {
        var t = new THREE.Quaternion;
        return function(e, r) {
            return t.setFromAxisAngle(e, r),
            this.quaternion.multiply(t),
            this
        }
    }(),
    rotateX: function() {
        var t = new THREE.Vector3(1,0,0);
        return function(e) {
            return this.rotateOnAxis(t, e)
        }
    }(),
    rotateY: function() {
        var t = new THREE.Vector3(0,1,0);
        return function(e) {
            return this.rotateOnAxis(t, e)
        }
    }(),
    rotateZ: function() {
        var t = new THREE.Vector3(0,0,1);
        return function(e) {
            return this.rotateOnAxis(t, e)
        }
    }(),
    translateOnAxis: function() {
        var t = new THREE.Vector3;
        return function(e, r) {
            return t.copy(e).applyQuaternion(this.quaternion),
            this.position.add(t.multiplyScalar(r)),
            this
        }
    }(),
    translate: function(t, e) {
        return THREE.warn("THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead."),
        this.translateOnAxis(e, t)
    },
    translateX: function() {
        var t = new THREE.Vector3(1,0,0);
        return function(e) {
            return this.translateOnAxis(t, e)
        }
    }(),
    translateY: function() {
        var t = new THREE.Vector3(0,1,0);
        return function(e) {
            return this.translateOnAxis(t, e)
        }
    }(),
    translateZ: function() {
        var t = new THREE.Vector3(0,0,1);
        return function(e) {
            return this.translateOnAxis(t, e)
        }
    }(),
    localToWorld: function(t) {
        return t.applyMatrix4(this.matrixWorld)
    },
    worldToLocal: function() {
        var t = new THREE.Matrix4;
        return function(e) {
            return e.applyMatrix4(t.getInverse(this.matrixWorld))
        }
    }(),
    lookAt: function() {
        var t = new THREE.Matrix4;
        return function(e) {
            t.lookAt(e, this.position, this.up),
            this.quaternion.setFromRotationMatrix(t)
        }
    }(),
    add: function(t) {
        if (arguments.length > 1) {
            for (var e = 0; e < arguments.length; e++)
                this.add(arguments[e]);
            return this
        }
        return t === this ? (THREE.error("THREE.Object3D.add: object can't be added as a child of itself.", t),
        this) : (t instanceof THREE.Object3D ? (void 0 !== t.parent && t.parent.remove(t),
        t.parent = this,
        t.dispatchEvent({
            type: "added"
        }),
        this.children.push(t)) : THREE.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", t),
        this)
    },
    remove: function(t) {
        if (arguments.length > 1)
            for (var e = 0; e < arguments.length; e++)
                this.remove(arguments[e]);
        var r = this.children.indexOf(t);
        -1 !== r && (t.parent = void 0,
        t.dispatchEvent({
            type: "removed"
        }),
        this.children.splice(r, 1))
    },
    getChildByName: function(t) {
        return THREE.warn("THREE.Object3D: .getChildByName() has been renamed to .getObjectByName()."),
        this.getObjectByName(t)
    },
    getObjectById: function(t) {
        return this.getObjectByProperty("id", t)
    },
    getObjectByName: function(t) {
        return this.getObjectByProperty("name", t)
    },
    getObjectByProperty: function(t, e) {
        if (this[t] === e)
            return this;
        for (var r = 0, i = this.children.length; r < i; r++) {
            var n = this.children[r].getObjectByProperty(t, e);
            if (void 0 !== n)
                return n
        }
    },
    getWorldPosition: function(t) {
        var e = t || new THREE.Vector3;
        return this.updateMatrixWorld(!0),
        e.setFromMatrixPosition(this.matrixWorld)
    },
    getWorldQuaternion: function() {
        var t = new THREE.Vector3
          , e = new THREE.Vector3;
        return function(r) {
            var i = r || new THREE.Quaternion;
            return this.updateMatrixWorld(!0),
            this.matrixWorld.decompose(t, i, e),
            i
        }
    }(),
    getWorldRotation: function() {
        var t = new THREE.Quaternion;
        return function(e) {
            var r = e || new THREE.Euler;
            return this.getWorldQuaternion(t),
            r.setFromQuaternion(t, this.rotation.order, !1)
        }
    }(),
    getWorldScale: function() {
        var t = new THREE.Vector3
          , e = new THREE.Quaternion;
        return function(r) {
            var i = r || new THREE.Vector3;
            return this.updateMatrixWorld(!0),
            this.matrixWorld.decompose(t, e, i),
            i
        }
    }(),
    getWorldDirection: function() {
        var t = new THREE.Quaternion;
        return function(e) {
            var r = e || new THREE.Vector3;
            return this.getWorldQuaternion(t),
            r.set(0, 0, 1).applyQuaternion(t)
        }
    }(),
    raycast: function() {},
    traverse: function(t) {
        t(this);
        for (var e = 0, r = this.children.length; e < r; e++)
            this.children[e].traverse(t)
    },
    traverseVisible: function(t) {
        if (!1 !== this.visible) {
            t(this);
            for (var e = 0, r = this.children.length; e < r; e++)
                this.children[e].traverseVisible(t)
        }
    },
    traverseAncestors: function(t) {
        this.parent && (t(this.parent),
        this.parent.traverseAncestors(t))
    },
    updateMatrix: function() {
        this.matrix.compose(this.position, this.quaternion, this.scale),
        this.matrixWorldNeedsUpdate = !0
    },
    updateMatrixWorld: function(t) {
        !0 === this.matrixAutoUpdate && this.updateMatrix(),
        !0 !== this.matrixWorldNeedsUpdate && !0 !== t || (void 0 === this.parent ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
        this.matrixWorldNeedsUpdate = !1,
        t = !0);
        for (var e = 0, r = this.children.length; e < r; e++)
            this.children[e].updateMatrixWorld(t)
    },
    toJSON: function() {
        var t = {
            metadata: {
                version: 4.3,
                type: "Object",
                generator: "ObjectExporter"
            }
        }
          , e = {}
          , r = {}
          , i = function(e) {
            if (void 0 === t.materials && (t.materials = []),
            void 0 === r[e.uuid]) {
                var i = e.toJSON();
                delete i.metadata,
                r[e.uuid] = i,
                t.materials.push(i)
            }
            return e.uuid
        }
          , n = function(r) {
            var o = {};
            if (o.uuid = r.uuid,
            o.type = r.type,
            "" !== r.name && (o.name = r.name),
            "{}" !== JSON.stringify(r.userData) && (o.userData = r.userData),
            !0 !== r.visible && (o.visible = r.visible),
            r instanceof THREE.PerspectiveCamera ? (o.fov = r.fov,
            o.aspect = r.aspect,
            o.near = r.near,
            o.far = r.far) : r instanceof THREE.OrthographicCamera ? (o.left = r.left,
            o.right = r.right,
            o.top = r.top,
            o.bottom = r.bottom,
            o.near = r.near,
            o.far = r.far) : r instanceof THREE.AmbientLight ? o.color = r.color.getHex() : r instanceof THREE.DirectionalLight ? (o.color = r.color.getHex(),
            o.intensity = r.intensity) : r instanceof THREE.PointLight ? (o.color = r.color.getHex(),
            o.intensity = r.intensity,
            o.distance = r.distance,
            o.decay = r.decay) : r instanceof THREE.SpotLight ? (o.color = r.color.getHex(),
            o.intensity = r.intensity,
            o.distance = r.distance,
            o.angle = r.angle,
            o.exponent = r.exponent,
            o.decay = r.decay) : r instanceof THREE.HemisphereLight ? (o.color = r.color.getHex(),
            o.groundColor = r.groundColor.getHex()) : r instanceof THREE.Mesh || r instanceof THREE.Line || r instanceof THREE.PointCloud ? (o.geometry = function(r) {
                if (void 0 === t.geometries && (t.geometries = []),
                void 0 === e[r.uuid]) {
                    var i = r.toJSON();
                    delete i.metadata,
                    e[r.uuid] = i,
                    t.geometries.push(i)
                }
                return r.uuid
            }(r.geometry),
            o.material = i(r.material),
            r instanceof THREE.Line && (o.mode = r.mode)) : r instanceof THREE.Sprite && (o.material = i(r.material)),
            o.matrix = r.matrix.toArray(),
            r.children.length > 0) {
                o.children = [];
                for (var a = 0; a < r.children.length; a++)
                    o.children.push(n(r.children[a]))
            }
            return o
        };
        return t.object = n(this),
        t
    },
    clone: function(t, e) {
        if (void 0 === t && (t = new THREE.Object3D),
        void 0 === e && (e = !0),
        t.name = this.name,
        t.up.copy(this.up),
        t.position.copy(this.position),
        t.quaternion.copy(this.quaternion),
        t.scale.copy(this.scale),
        t.rotationAutoUpdate = this.rotationAutoUpdate,
        t.matrix.copy(this.matrix),
        t.matrixWorld.copy(this.matrixWorld),
        t.matrixAutoUpdate = this.matrixAutoUpdate,
        t.matrixWorldNeedsUpdate = this.matrixWorldNeedsUpdate,
        t.visible = this.visible,
        t.castShadow = this.castShadow,
        t.receiveShadow = this.receiveShadow,
        t.frustumCulled = this.frustumCulled,
        t.userData = JSON.parse(JSON.stringify(this.userData)),
        !0 === e)
            for (var r = 0; r < this.children.length; r++) {
                var i = this.children[r];
                t.add(i.clone())
            }
        return t
    }
},
THREE.EventDispatcher.prototype.apply(THREE.Object3D.prototype),
THREE.Object3DIdCount = 0,
THREE.Face3 = function(t, e, r, i, n, o) {
    this.a = t,
    this.b = e,
    this.c = r,
    this.normal = i instanceof THREE.Vector3 ? i : new THREE.Vector3,
    this.vertexNormals = i instanceof Array ? i : [],
    this.color = n instanceof THREE.Color ? n : new THREE.Color,
    this.vertexColors = n instanceof Array ? n : [],
    this.vertexTangents = [],
    this.materialIndex = void 0 !== o ? o : 0
}
,
THREE.Face3.prototype = {
    constructor: THREE.Face3,
    clone: function() {
        var t = new THREE.Face3(this.a,this.b,this.c);
        t.normal.copy(this.normal),
        t.color.copy(this.color),
        t.materialIndex = this.materialIndex;
        for (var e = 0, r = this.vertexNormals.length; e < r; e++)
            t.vertexNormals[e] = this.vertexNormals[e].clone();
        for (e = 0,
        r = this.vertexColors.length; e < r; e++)
            t.vertexColors[e] = this.vertexColors[e].clone();
        for (e = 0,
        r = this.vertexTangents.length; e < r; e++)
            t.vertexTangents[e] = this.vertexTangents[e].clone();
        return t
    }
},
THREE.Face4 = function(t, e, r, i, n, o, a) {
    return THREE.warn("THREE.Face4 has been removed. A THREE.Face3 will be created instead."),
    new THREE.Face3(t,e,r,n,o,a)
}
,
THREE.BufferAttribute = function(t, e) {
    this.array = t,
    this.itemSize = e,
    this.needsUpdate = !1
}
,
THREE.BufferAttribute.prototype = {
    constructor: THREE.BufferAttribute,
    get length() {
        return this.array.length
    },
    copyAt: function(t, e, r) {
        t *= this.itemSize,
        r *= e.itemSize;
        for (var i = 0, n = this.itemSize; i < n; i++)
            this.array[t + i] = e.array[r + i];
        return this
    },
    set: function(t, e) {
        return void 0 === e && (e = 0),
        this.array.set(t, e),
        this
    },
    setX: function(t, e) {
        return this.array[t * this.itemSize] = e,
        this
    },
    setY: function(t, e) {
        return this.array[t * this.itemSize + 1] = e,
        this
    },
    setZ: function(t, e) {
        return this.array[t * this.itemSize + 2] = e,
        this
    },
    setXY: function(t, e, r) {
        return t *= this.itemSize,
        this.array[t] = e,
        this.array[t + 1] = r,
        this
    },
    setXYZ: function(t, e, r, i) {
        return t *= this.itemSize,
        this.array[t] = e,
        this.array[t + 1] = r,
        this.array[t + 2] = i,
        this
    },
    setXYZW: function(t, e, r, i, n) {
        return t *= this.itemSize,
        this.array[t] = e,
        this.array[t + 1] = r,
        this.array[t + 2] = i,
        this.array[t + 3] = n,
        this
    },
    clone: function() {
        return new THREE.BufferAttribute(new this.array.constructor(this.array),this.itemSize)
    }
},
THREE.Int8Attribute = function(t, e) {
    return THREE.warn("THREE.Int8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),
    new THREE.BufferAttribute(t,e)
}
,
THREE.Uint8Attribute = function(t, e) {
    return THREE.warn("THREE.Uint8Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),
    new THREE.BufferAttribute(t,e)
}
,
THREE.Uint8ClampedAttribute = function(t, e) {
    return THREE.warn("THREE.Uint8ClampedAttribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),
    new THREE.BufferAttribute(t,e)
}
,
THREE.Int16Attribute = function(t, e) {
    return THREE.warn("THREE.Int16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),
    new THREE.BufferAttribute(t,e)
}
,
THREE.Uint16Attribute = function(t, e) {
    return THREE.warn("THREE.Uint16Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),
    new THREE.BufferAttribute(t,e)
}
,
THREE.Int32Attribute = function(t, e) {
    return THREE.warn("THREE.Int32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),
    new THREE.BufferAttribute(t,e)
}
,
THREE.Uint32Attribute = function(t, e) {
    return THREE.warn("THREE.Uint32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),
    new THREE.BufferAttribute(t,e)
}
,
THREE.Float32Attribute = function(t, e) {
    return THREE.warn("THREE.Float32Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),
    new THREE.BufferAttribute(t,e)
}
,
THREE.Float64Attribute = function(t, e) {
    return THREE.warn("THREE.Float64Attribute has been removed. Use THREE.BufferAttribute( array, itemSize ) instead."),
    new THREE.BufferAttribute(t,e)
}
,
THREE.DynamicBufferAttribute = function(t, e) {
    THREE.BufferAttribute.call(this, t, e),
    this.updateRange = {
        offset: 0,
        count: -1
    }
}
,
THREE.DynamicBufferAttribute.prototype = Object.create(THREE.BufferAttribute.prototype),
THREE.DynamicBufferAttribute.prototype.constructor = THREE.DynamicBufferAttribute,
THREE.DynamicBufferAttribute.prototype.clone = function() {
    return new THREE.DynamicBufferAttribute(new this.array.constructor(this.array),this.itemSize)
}
,
THREE.BufferGeometry = function() {
    Object.defineProperty(this, "id", {
        value: THREE.GeometryIdCount++
    }),
    this.uuid = THREE.Math.generateUUID(),
    this.name = "",
    this.type = "BufferGeometry",
    this.attributes = {},
    this.attributesKeys = [],
    this.drawcalls = [],
    this.offsets = this.drawcalls,
    this.boundingBox = null,
    this.boundingSphere = null
}
,
THREE.BufferGeometry.prototype = {
    constructor: THREE.BufferGeometry,
    addAttribute: function(t, e) {
        if (e instanceof THREE.BufferAttribute == !1)
            return THREE.warn("THREE.BufferGeometry: .addAttribute() now expects ( name, attribute )."),
            void (this.attributes[t] = {
                array: arguments[1],
                itemSize: arguments[2]
            });
        this.attributes[t] = e,
        this.attributesKeys = Object.keys(this.attributes)
    },
    getAttribute: function(t) {
        return this.attributes[t]
    },
    addDrawCall: function(t, e, r) {
        this.drawcalls.push({
            start: t,
            count: e,
            index: void 0 !== r ? r : 0
        })
    },
    applyMatrix: function(t) {
        var e = this.attributes.position;
        void 0 !== e && (t.applyToVector3Array(e.array),
        e.needsUpdate = !0);
        var r = this.attributes.normal;
        void 0 !== r && ((new THREE.Matrix3).getNormalMatrix(t).applyToVector3Array(r.array),
        r.needsUpdate = !0);
        null !== this.boundingBox && this.computeBoundingBox(),
        null !== this.boundingSphere && this.computeBoundingSphere()
    },
    center: function() {
        this.computeBoundingBox();
        var t = this.boundingBox.center().negate();
        return this.applyMatrix((new THREE.Matrix4).setPosition(t)),
        t
    },
    fromGeometry: function(t, e) {
        e = e || {
            vertexColors: THREE.NoColors
        };
        var r = t.vertices
          , i = t.faces
          , n = t.faceVertexUvs
          , o = e.vertexColors
          , a = n[0].length > 0
          , s = 3 == i[0].vertexNormals.length
          , h = new Float32Array(3 * i.length * 3);
        this.addAttribute("position", new THREE.BufferAttribute(h,3));
        var c = new Float32Array(3 * i.length * 3);
        if (this.addAttribute("normal", new THREE.BufferAttribute(c,3)),
        o !== THREE.NoColors) {
            var l = new Float32Array(3 * i.length * 3);
            this.addAttribute("color", new THREE.BufferAttribute(l,3))
        }
        if (!0 === a) {
            var u = new Float32Array(3 * i.length * 2);
            this.addAttribute("uv", new THREE.BufferAttribute(u,2))
        }
        for (var E = 0, p = 0, d = 0; E < i.length; E++,
        p += 6,
        d += 9) {
            var f = i[E]
              , m = r[f.a]
              , T = r[f.b]
              , g = r[f.c];
            if (h[d] = m.x,
            h[d + 1] = m.y,
            h[d + 2] = m.z,
            h[d + 3] = T.x,
            h[d + 4] = T.y,
            h[d + 5] = T.z,
            h[d + 6] = g.x,
            h[d + 7] = g.y,
            h[d + 8] = g.z,
            !0 === s) {
                var v = f.vertexNormals[0]
                  , R = f.vertexNormals[1]
                  , y = f.vertexNormals[2];
                c[d] = v.x,
                c[d + 1] = v.y,
                c[d + 2] = v.z,
                c[d + 3] = R.x,
                c[d + 4] = R.y,
                c[d + 5] = R.z,
                c[d + 6] = y.x,
                c[d + 7] = y.y,
                c[d + 8] = y.z
            } else {
                var H = f.normal;
                c[d] = H.x,
                c[d + 1] = H.y,
                c[d + 2] = H.z,
                c[d + 3] = H.x,
                c[d + 4] = H.y,
                c[d + 5] = H.z,
                c[d + 6] = H.x,
                c[d + 7] = H.y,
                c[d + 8] = H.z
            }
            if (o === THREE.FaceColors) {
                var x = f.color;
                l[d] = x.r,
                l[d + 1] = x.g,
                l[d + 2] = x.b,
                l[d + 3] = x.r,
                l[d + 4] = x.g,
                l[d + 5] = x.b,
                l[d + 6] = x.r,
                l[d + 7] = x.g,
                l[d + 8] = x.b
            } else if (o === THREE.VertexColors) {
                var w = f.vertexColors[0]
                  , b = f.vertexColors[1]
                  , M = f.vertexColors[2];
                l[d] = w.r,
                l[d + 1] = w.g,
                l[d + 2] = w.b,
                l[d + 3] = b.r,
                l[d + 4] = b.g,
                l[d + 5] = b.b,
                l[d + 6] = M.r,
                l[d + 7] = M.g,
                l[d + 8] = M.b
            }
            if (!0 === a) {
                var _ = n[0][E][0]
                  , S = n[0][E][1]
                  , C = n[0][E][2];
                u[p] = _.x,
                u[p + 1] = _.y,
                u[p + 2] = S.x,
                u[p + 3] = S.y,
                u[p + 4] = C.x,
                u[p + 5] = C.y
            }
        }
        return this.computeBoundingSphere(),
        this
    },
    computeBoundingBox: function() {
        var t = new THREE.Vector3;
        return function() {
            null === this.boundingBox && (this.boundingBox = new THREE.Box3);
            var e = this.attributes.position.array;
            if (e) {
                var r = this.boundingBox;
                r.makeEmpty();
                for (var i = 0, n = e.length; i < n; i += 3)
                    t.set(e[i], e[i + 1], e[i + 2]),
                    r.expandByPoint(t)
            }
            void 0 !== e && 0 !== e.length || (this.boundingBox.min.set(0, 0, 0),
            this.boundingBox.max.set(0, 0, 0)),
            (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && THREE.error('THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.')
        }
    }(),
    computeBoundingSphere: function() {
        var t = new THREE.Box3
          , e = new THREE.Vector3;
        return function() {
            null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere);
            var r = this.attributes.position.array;
            if (r) {
                t.makeEmpty();
                for (var i = this.boundingSphere.center, n = 0, o = r.length; n < o; n += 3)
                    e.set(r[n], r[n + 1], r[n + 2]),
                    t.expandByPoint(e);
                t.center(i);
                var a = 0;
                for (n = 0,
                o = r.length; n < o; n += 3)
                    e.set(r[n], r[n + 1], r[n + 2]),
                    a = Math.max(a, i.distanceToSquared(e));
                this.boundingSphere.radius = Math.sqrt(a),
                isNaN(this.boundingSphere.radius) && THREE.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.')
            }
        }
    }(),
    computeFaceNormals: function() {},
    computeVertexNormals: function() {
        var t = this.attributes;
        if (t.position) {
            var e = t.position.array;
            if (void 0 === t.normal)
                this.addAttribute("normal", new THREE.BufferAttribute(new Float32Array(e.length),3));
            else
                for (var r = 0, i = (s = t.normal.array).length; r < i; r++)
                    s[r] = 0;
            var n, o, a, s = t.normal.array, h = new THREE.Vector3, c = new THREE.Vector3, l = new THREE.Vector3, u = new THREE.Vector3, E = new THREE.Vector3;
            if (t.index)
                for (var p = t.index.array, d = this.offsets.length > 0 ? this.offsets : [{
                    start: 0,
                    count: p.length,
                    index: 0
                }], f = 0, m = d.length; f < m; ++f) {
                    var T = d[f].start
                      , g = d[f].count
                      , v = d[f].index;
                    for (r = T,
                    i = T + g; r < i; r += 3)
                        n = 3 * (v + p[r]),
                        o = 3 * (v + p[r + 1]),
                        a = 3 * (v + p[r + 2]),
                        h.fromArray(e, n),
                        c.fromArray(e, o),
                        l.fromArray(e, a),
                        u.subVectors(l, c),
                        E.subVectors(h, c),
                        u.cross(E),
                        s[n] += u.x,
                        s[n + 1] += u.y,
                        s[n + 2] += u.z,
                        s[o] += u.x,
                        s[o + 1] += u.y,
                        s[o + 2] += u.z,
                        s[a] += u.x,
                        s[a + 1] += u.y,
                        s[a + 2] += u.z
                }
            else
                for (r = 0,
                i = e.length; r < i; r += 9)
                    h.fromArray(e, r),
                    c.fromArray(e, r + 3),
                    l.fromArray(e, r + 6),
                    u.subVectors(l, c),
                    E.subVectors(h, c),
                    u.cross(E),
                    s[r] = u.x,
                    s[r + 1] = u.y,
                    s[r + 2] = u.z,
                    s[r + 3] = u.x,
                    s[r + 4] = u.y,
                    s[r + 5] = u.z,
                    s[r + 6] = u.x,
                    s[r + 7] = u.y,
                    s[r + 8] = u.z;
            this.normalizeNormals(),
            t.normal.needsUpdate = !0
        }
    },
    computeTangents: function() {
        if (void 0 !== this.attributes.index && void 0 !== this.attributes.position && void 0 !== this.attributes.normal && void 0 !== this.attributes.uv) {
            var t = this.attributes.index.array
              , e = this.attributes.position.array
              , r = this.attributes.normal.array
              , i = this.attributes.uv.array
              , n = e.length / 3;
            void 0 === this.attributes.tangent && this.addAttribute("tangent", new THREE.BufferAttribute(new Float32Array(4 * n),4));
            for (var o = this.attributes.tangent.array, a = [], s = [], h = 0; h < n; h++)
                a[h] = new THREE.Vector3,
                s[h] = new THREE.Vector3;
            var c, l, u, E, p, d, f, m, T, g, v, R, y, H, x, w, b, M, _ = new THREE.Vector3, S = new THREE.Vector3, C = new THREE.Vector3, A = new THREE.Vector2, L = new THREE.Vector2, P = new THREE.Vector2, F = new THREE.Vector3, B = new THREE.Vector3;
            0 === this.drawcalls.length && this.addDrawCall(0, t.length, 0);
            var U, V, D, z = this.drawcalls;
            for (H = 0,
            x = z.length; H < x; ++H) {
                var k = z[H].start
                  , N = z[H].count
                  , O = z[H].index;
                for (R = k,
                y = k + N; R < y; R += 3)
                    w = O + t[R],
                    b = O + t[R + 1],
                    M = O + t[R + 2],
                    U = w,
                    V = b,
                    D = M,
                    _.fromArray(e, 3 * U),
                    S.fromArray(e, 3 * V),
                    C.fromArray(e, 3 * D),
                    A.fromArray(i, 2 * U),
                    L.fromArray(i, 2 * V),
                    P.fromArray(i, 2 * D),
                    c = S.x - _.x,
                    l = C.x - _.x,
                    u = S.y - _.y,
                    E = C.y - _.y,
                    p = S.z - _.z,
                    d = C.z - _.z,
                    f = L.x - A.x,
                    m = P.x - A.x,
                    T = L.y - A.y,
                    g = P.y - A.y,
                    v = 1 / (f * g - m * T),
                    F.set((g * c - T * l) * v, (g * u - T * E) * v, (g * p - T * d) * v),
                    B.set((f * l - m * c) * v, (f * E - m * u) * v, (f * d - m * p) * v),
                    a[U].add(F),
                    a[V].add(F),
                    a[D].add(F),
                    s[U].add(B),
                    s[V].add(B),
                    s[D].add(B)
            }
            var G, I, W, j = new THREE.Vector3, X = new THREE.Vector3, Y = new THREE.Vector3, q = new THREE.Vector3;
            for (H = 0,
            x = z.length; H < x; ++H) {
                k = z[H].start,
                N = z[H].count,
                O = z[H].index;
                for (R = k,
                y = k + N; R < y; R += 3)
                    w = O + t[R],
                    b = O + t[R + 1],
                    M = O + t[R + 2],
                    Z(w),
                    Z(b),
                    Z(M)
            }
        } else
            THREE.warn("THREE.BufferGeometry: Missing required attributes (index, position, normal or uv) in BufferGeometry.computeTangents()");
        function Z(t) {
            Y.fromArray(r, 3 * t),
            q.copy(Y),
            I = a[t],
            j.copy(I),
            j.sub(Y.multiplyScalar(Y.dot(I))).normalize(),
            X.crossVectors(q, I),
            W = X.dot(s[t]),
            G = W < 0 ? -1 : 1,
            o[4 * t] = j.x,
            o[4 * t + 1] = j.y,
            o[4 * t + 2] = j.z,
            o[4 * t + 3] = G
        }
    },
    computeOffsets: function(t) {
        void 0 === t && (t = 65535);
        for (var e = this.attributes.index.array, r = this.attributes.position.array, i = e.length / 3, n = new Uint16Array(e.length), o = 0, a = 0, s = [{
            start: 0,
            count: 0,
            index: 0
        }], h = s[0], c = 0, l = new Int32Array(6), u = new Int32Array(r.length), E = new Int32Array(r.length), p = 0; p < r.length; p++)
            u[p] = -1,
            E[p] = -1;
        for (var d = 0; d < i; d++) {
            c = 0;
            for (var f = 0; f < 3; f++) {
                -1 == u[v = e[3 * d + f]] ? (l[2 * f] = v,
                l[2 * f + 1] = -1,
                c++) : u[v] < h.index ? (l[2 * f] = v,
                l[2 * f + 1] = -1,
                0) : (l[2 * f] = v,
                l[2 * f + 1] = u[v])
            }
            if (a + c > h.index + t) {
                var m = {
                    start: o,
                    count: 0,
                    index: a
                };
                s.push(m),
                h = m;
                for (var T = 0; T < 6; T += 2) {
                    (g = l[T + 1]) > -1 && g < h.index && (l[T + 1] = -1)
                }
            }
            for (T = 0; T < 6; T += 2) {
                var g, v = l[T];
                -1 === (g = l[T + 1]) && (g = a++),
                u[v] = g,
                E[g] = v,
                n[o++] = g - h.index,
                h.count++
            }
        }
        return this.reorderBuffers(n, E, a),
        this.offsets = s,
        this.drawcalls = s,
        s
    },
    merge: function(t, e) {
        if (t instanceof THREE.BufferGeometry != !1) {
            void 0 === e && (e = 0);
            var r = this.attributes;
            for (var i in r)
                if (void 0 !== t.attributes[i])
                    for (var n = r[i].array, o = t.attributes[i], a = o.array, s = 0, h = o.itemSize * e; s < a.length; s++,
                    h++)
                        n[h] = a[s];
            return this
        }
        THREE.error("THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.", t)
    },
    normalizeNormals: function() {
        for (var t, e, r, i, n = this.attributes.normal.array, o = 0, a = n.length; o < a; o += 3)
            t = n[o],
            e = n[o + 1],
            r = n[o + 2],
            i = 1 / Math.sqrt(t * t + e * e + r * r),
            n[o] *= i,
            n[o + 1] *= i,
            n[o + 2] *= i
    },
    reorderBuffers: function(t, e, r) {
        var i = {};
        for (var n in this.attributes)
            if ("index" != n) {
                var o = this.attributes[n].array;
                i[n] = new o.constructor(this.attributes[n].itemSize * r)
            }
        for (var a = 0; a < r; a++) {
            var s = e[a];
            for (var n in this.attributes)
                if ("index" != n)
                    for (var h = this.attributes[n].array, c = this.attributes[n].itemSize, l = i[n], u = 0; u < c; u++)
                        l[a * c + u] = h[s * c + u]
        }
        this.attributes.index.array = t;
        for (var n in this.attributes)
            "index" != n && (this.attributes[n].array = i[n],
            this.attributes[n].numItems = this.attributes[n].itemSize * r)
    },
    toJSON: function() {
        var t = {
            metadata: {
                version: 4,
                type: "BufferGeometry",
                generator: "BufferGeometryExporter"
            },
            uuid: this.uuid,
            type: this.type,
            data: {
                attributes: {}
            }
        }
          , e = this.attributes
          , r = this.offsets
          , i = this.boundingSphere;
        for (var n in e) {
            var o = e[n]
              , a = Array.prototype.slice.call(o.array);
            t.data.attributes[n] = {
                itemSize: o.itemSize,
                type: o.array.constructor.name,
                array: a
            }
        }
        return r.length > 0 && (t.data.offsets = JSON.parse(JSON.stringify(r))),
        null !== i && (t.data.boundingSphere = {
            center: i.center.toArray(),
            radius: i.radius
        }),
        t
    },
    clone: function() {
        var t = new THREE.BufferGeometry;
        for (var e in this.attributes) {
            var r = this.attributes[e];
            t.addAttribute(e, r.clone())
        }
        for (var i = 0, n = this.offsets.length; i < n; i++) {
            var o = this.offsets[i];
            t.offsets.push({
                start: o.start,
                index: o.index,
                count: o.count
            })
        }
        return t
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
},
THREE.EventDispatcher.prototype.apply(THREE.BufferGeometry.prototype),
THREE.Geometry = function() {
    Object.defineProperty(this, "id", {
        value: THREE.GeometryIdCount++
    }),
    this.uuid = THREE.Math.generateUUID(),
    this.name = "",
    this.type = "Geometry",
    this.vertices = [],
    this.colors = [],
    this.faces = [],
    this.faceVertexUvs = [[]],
    this.morphTargets = [],
    this.morphColors = [],
    this.morphNormals = [],
    this.skinWeights = [],
    this.skinIndices = [],
    this.lineDistances = [],
    this.boundingBox = null,
    this.boundingSphere = null,
    this.hasTangents = !1,
    this.dynamic = !0,
    this.verticesNeedUpdate = !1,
    this.elementsNeedUpdate = !1,
    this.uvsNeedUpdate = !1,
    this.normalsNeedUpdate = !1,
    this.tangentsNeedUpdate = !1,
    this.colorsNeedUpdate = !1,
    this.lineDistancesNeedUpdate = !1,
    this.groupsNeedUpdate = !1
}
,
THREE.Geometry.prototype = {
    constructor: THREE.Geometry,
    applyMatrix: function(t) {
        for (var e = (new THREE.Matrix3).getNormalMatrix(t), r = 0, i = this.vertices.length; r < i; r++) {
            this.vertices[r].applyMatrix4(t)
        }
        for (r = 0,
        i = this.faces.length; r < i; r++) {
            var n = this.faces[r];
            n.normal.applyMatrix3(e).normalize();
            for (var o = 0, a = n.vertexNormals.length; o < a; o++)
                n.vertexNormals[o].applyMatrix3(e).normalize()
        }
        null !== this.boundingBox && this.computeBoundingBox(),
        null !== this.boundingSphere && this.computeBoundingSphere(),
        this.verticesNeedUpdate = !0,
        this.normalsNeedUpdate = !0
    },
    fromBufferGeometry: function(t) {
        for (var e = this, r = t.attributes, i = r.position.array, n = void 0 !== r.index ? r.index.array : void 0, o = void 0 !== r.normal ? r.normal.array : void 0, a = void 0 !== r.color ? r.color.array : void 0, s = void 0 !== r.uv ? r.uv.array : void 0, h = [], c = [], l = 0, u = 0; l < i.length; l += 3,
        u += 2)
            e.vertices.push(new THREE.Vector3(i[l],i[l + 1],i[l + 2])),
            void 0 !== o && h.push(new THREE.Vector3(o[l],o[l + 1],o[l + 2])),
            void 0 !== a && e.colors.push(new THREE.Color(a[l],a[l + 1],a[l + 2])),
            void 0 !== s && c.push(new THREE.Vector2(s[u],s[u + 1]));
        var E = function(t, r, i) {
            var n = void 0 !== o ? [h[t].clone(), h[r].clone(), h[i].clone()] : []
              , l = void 0 !== a ? [e.colors[t].clone(), e.colors[r].clone(), e.colors[i].clone()] : [];
            e.faces.push(new THREE.Face3(t,r,i,n,l)),
            void 0 !== s && e.faceVertexUvs[0].push([c[t].clone(), c[r].clone(), c[i].clone()])
        };
        if (void 0 !== n) {
            var p = t.drawcalls;
            if (p.length > 0)
                for (l = 0; l < p.length; l++)
                    for (var d = p[l], f = d.start, m = d.count, T = d.index, g = (u = f,
                    f + m); u < g; u += 3)
                        E(T + n[u], T + n[u + 1], T + n[u + 2]);
            else
                for (l = 0; l < n.length; l += 3)
                    E(n[l], n[l + 1], n[l + 2])
        } else
            for (l = 0; l < i.length / 3; l += 3)
                E(l, l + 1, l + 2);
        return this.computeFaceNormals(),
        null !== t.boundingBox && (this.boundingBox = t.boundingBox.clone()),
        null !== t.boundingSphere && (this.boundingSphere = t.boundingSphere.clone()),
        this
    },
    center: function() {
        this.computeBoundingBox();
        var t = this.boundingBox.center().negate();
        return this.applyMatrix((new THREE.Matrix4).setPosition(t)),
        t
    },
    computeFaceNormals: function() {
        for (var t = new THREE.Vector3, e = new THREE.Vector3, r = 0, i = this.faces.length; r < i; r++) {
            var n = this.faces[r]
              , o = this.vertices[n.a]
              , a = this.vertices[n.b]
              , s = this.vertices[n.c];
            t.subVectors(s, a),
            e.subVectors(o, a),
            t.cross(e),
            t.normalize(),
            n.normal.copy(t)
        }
    },
    computeVertexNormals: function(t) {
        var e, r, i, n, o, a;
        for (a = new Array(this.vertices.length),
        e = 0,
        r = this.vertices.length; e < r; e++)
            a[e] = new THREE.Vector3;
        if (t) {
            var s, h, c, l = new THREE.Vector3, u = new THREE.Vector3;
            for (i = 0,
            n = this.faces.length; i < n; i++)
                o = this.faces[i],
                s = this.vertices[o.a],
                h = this.vertices[o.b],
                c = this.vertices[o.c],
                l.subVectors(c, h),
                u.subVectors(s, h),
                l.cross(u),
                a[o.a].add(l),
                a[o.b].add(l),
                a[o.c].add(l)
        } else
            for (i = 0,
            n = this.faces.length; i < n; i++)
                a[(o = this.faces[i]).a].add(o.normal),
                a[o.b].add(o.normal),
                a[o.c].add(o.normal);
        for (e = 0,
        r = this.vertices.length; e < r; e++)
            a[e].normalize();
        for (i = 0,
        n = this.faces.length; i < n; i++)
            (o = this.faces[i]).vertexNormals[0] = a[o.a].clone(),
            o.vertexNormals[1] = a[o.b].clone(),
            o.vertexNormals[2] = a[o.c].clone()
    },
    computeMorphNormals: function() {
        var t, e, r, i, n;
        for (r = 0,
        i = this.faces.length; r < i; r++)
            for ((n = this.faces[r]).__originalFaceNormal ? n.__originalFaceNormal.copy(n.normal) : n.__originalFaceNormal = n.normal.clone(),
            n.__originalVertexNormals || (n.__originalVertexNormals = []),
            t = 0,
            e = n.vertexNormals.length; t < e; t++)
                n.__originalVertexNormals[t] ? n.__originalVertexNormals[t].copy(n.vertexNormals[t]) : n.__originalVertexNormals[t] = n.vertexNormals[t].clone();
        var o = new THREE.Geometry;
        for (o.faces = this.faces,
        t = 0,
        e = this.morphTargets.length; t < e; t++) {
            if (!this.morphNormals[t]) {
                this.morphNormals[t] = {},
                this.morphNormals[t].faceNormals = [],
                this.morphNormals[t].vertexNormals = [];
                var a = this.morphNormals[t].faceNormals
                  , s = this.morphNormals[t].vertexNormals;
                for (r = 0,
                i = this.faces.length; r < i; r++)
                    h = new THREE.Vector3,
                    c = {
                        a: new THREE.Vector3,
                        b: new THREE.Vector3,
                        c: new THREE.Vector3
                    },
                    a.push(h),
                    s.push(c)
            }
            var h, c, l = this.morphNormals[t];
            for (o.vertices = this.morphTargets[t].vertices,
            o.computeFaceNormals(),
            o.computeVertexNormals(),
            r = 0,
            i = this.faces.length; r < i; r++)
                n = this.faces[r],
                h = l.faceNormals[r],
                c = l.vertexNormals[r],
                h.copy(n.normal),
                c.a.copy(n.vertexNormals[0]),
                c.b.copy(n.vertexNormals[1]),
                c.c.copy(n.vertexNormals[2])
        }
        for (r = 0,
        i = this.faces.length; r < i; r++)
            (n = this.faces[r]).normal = n.__originalFaceNormal,
            n.vertexNormals = n.__originalVertexNormals
    },
    computeTangents: function() {
        var t, e, r, i, n, o, a, s, h, c, l, u, E, p, d, f, m, T, g, v, R, y, H, x, w, b, M, _, S, C, A, L, P, F, B = [], U = [], V = new THREE.Vector3, D = new THREE.Vector3, z = new THREE.Vector3, k = new THREE.Vector3, N = new THREE.Vector3;
        for (r = 0,
        i = this.vertices.length; r < i; r++)
            B[r] = new THREE.Vector3,
            U[r] = new THREE.Vector3;
        for (t = 0,
        e = this.faces.length; t < e; t++)
            a = this.faces[t],
            s = this.faceVertexUvs[0][t],
            _ = this,
            S = a.a,
            C = a.b,
            A = a.c,
            L = 0,
            P = 1,
            F = 2,
            h = _.vertices[S],
            c = _.vertices[C],
            l = _.vertices[A],
            u = s[L],
            E = s[P],
            p = s[F],
            d = c.x - h.x,
            f = l.x - h.x,
            m = c.y - h.y,
            T = l.y - h.y,
            g = c.z - h.z,
            v = l.z - h.z,
            R = E.x - u.x,
            y = p.x - u.x,
            H = E.y - u.y,
            x = p.y - u.y,
            w = 1 / (R * x - y * H),
            V.set((x * d - H * f) * w, (x * m - H * T) * w, (x * g - H * v) * w),
            D.set((R * f - y * d) * w, (R * T - y * m) * w, (R * v - y * g) * w),
            B[S].add(V),
            B[C].add(V),
            B[A].add(V),
            U[S].add(D),
            U[C].add(D),
            U[A].add(D);
        var O = ["a", "b", "c", "d"];
        for (t = 0,
        e = this.faces.length; t < e; t++)
            for (a = this.faces[t],
            n = 0; n < Math.min(a.vertexNormals.length, 3); n++)
                N.copy(a.vertexNormals[n]),
                o = a[O[n]],
                b = B[o],
                z.copy(b),
                z.sub(N.multiplyScalar(N.dot(b))).normalize(),
                k.crossVectors(a.vertexNormals[n], b),
                M = k.dot(U[o]) < 0 ? -1 : 1,
                a.vertexTangents[n] = new THREE.Vector4(z.x,z.y,z.z,M);
        this.hasTangents = !0
    },
    computeLineDistances: function() {
        for (var t = 0, e = this.vertices, r = 0, i = e.length; r < i; r++)
            r > 0 && (t += e[r].distanceTo(e[r - 1])),
            this.lineDistances[r] = t
    },
    computeBoundingBox: function() {
        null === this.boundingBox && (this.boundingBox = new THREE.Box3),
        this.boundingBox.setFromPoints(this.vertices)
    },
    computeBoundingSphere: function() {
        null === this.boundingSphere && (this.boundingSphere = new THREE.Sphere),
        this.boundingSphere.setFromPoints(this.vertices)
    },
    merge: function(t, e, r) {
        if (t instanceof THREE.Geometry != !1) {
            var i, n = this.vertices.length, o = this.vertices, a = t.vertices, s = this.faces, h = t.faces, c = this.faceVertexUvs[0], l = t.faceVertexUvs[0];
            void 0 === r && (r = 0),
            void 0 !== e && (i = (new THREE.Matrix3).getNormalMatrix(e));
            for (var u = 0, E = a.length; u < E; u++) {
                var p = a[u]
                  , d = new THREE.Vector3(p.x,p.y,p.z);
                void 0 !== e && d.applyMatrix4(e),
                o.push(d)
            }
            for (u = 0,
            E = h.length; u < E; u++) {
                var f, m, T, g = h[u], v = g.vertexNormals, R = g.vertexColors;
                (f = new THREE.Face3(g.a + n,g.b + n,g.c + n)).normal.copy(g.normal),
                void 0 !== i && f.normal.applyMatrix3(i).normalize();
                for (var y = 0, H = v.length; y < H; y++)
                    m = v[y].clone(),
                    void 0 !== i && m.applyMatrix3(i).normalize(),
                    f.vertexNormals.push(m);
                f.color.copy(g.color);
                for (y = 0,
                H = R.length; y < H; y++)
                    T = R[y],
                    f.vertexColors.push(T.clone());
                f.materialIndex = g.materialIndex + r,
                s.push(f)
            }
            for (u = 0,
            E = l.length; u < E; u++) {
                var x = l[u]
                  , w = [];
                if (void 0 !== x) {
                    for (y = 0,
                    H = x.length; y < H; y++)
                        w.push(x[y].clone());
                    c.push(w)
                }
            }
        } else
            THREE.error("THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.", t)
    },
    mergeMesh: function(t) {
        t instanceof THREE.Mesh != !1 ? (t.matrixAutoUpdate && t.updateMatrix(),
        this.merge(t.geometry, t.matrix)) : THREE.error("THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.", t)
    },
    mergeVertices: function() {
        var t, e, r, i, n, o, a, s, h = {}, c = [], l = [], u = Math.pow(10, 4);
        for (r = 0,
        i = this.vertices.length; r < i; r++)
            t = this.vertices[r],
            void 0 === h[e = Math.round(t.x * u) + "_" + Math.round(t.y * u) + "_" + Math.round(t.z * u)] ? (h[e] = r,
            c.push(this.vertices[r]),
            l[r] = c.length - 1) : l[r] = l[h[e]];
        var E = [];
        for (r = 0,
        i = this.faces.length; r < i; r++) {
            (n = this.faces[r]).a = l[n.a],
            n.b = l[n.b],
            n.c = l[n.c],
            o = [n.a, n.b, n.c];
            for (var p = 0; p < 3; p++)
                if (o[p] == o[(p + 1) % 3]) {
                    p,
                    E.push(r);
                    break
                }
        }
        for (r = E.length - 1; r >= 0; r--) {
            var d = E[r];
            for (this.faces.splice(d, 1),
            a = 0,
            s = this.faceVertexUvs.length; a < s; a++)
                this.faceVertexUvs[a].splice(d, 1)
        }
        var f = this.vertices.length - c.length;
        return this.vertices = c,
        f
    },
    toJSON: function() {
        var t = {
            metadata: {
                version: 4,
                type: "BufferGeometry",
                generator: "BufferGeometryExporter"
            },
            uuid: this.uuid,
            type: this.type
        };
        if ("" !== this.name && (t.name = this.name),
        void 0 !== this.parameters) {
            var e = this.parameters;
            for (var r in e)
                void 0 !== e[r] && (t[r] = e[r]);
            return t
        }
        for (var i = [], n = 0; n < this.vertices.length; n++) {
            var o = this.vertices[n];
            i.push(o.x, o.y, o.z)
        }
        var a = []
          , s = []
          , h = {}
          , c = []
          , l = {}
          , u = []
          , E = {};
        for (n = 0; n < this.faces.length; n++) {
            var p = this.faces[n]
              , d = void 0 !== this.faceVertexUvs[0][n]
              , f = p.normal.length() > 0
              , m = p.vertexNormals.length > 0
              , T = 1 !== p.color.r || 1 !== p.color.g || 1 !== p.color.b
              , g = p.vertexColors.length > 0
              , v = 0;
            if (v = x(v = x(v = x(v = x(v = x(v = x(v = x(v = x(v, 0, 0), 1, !1), 2, !1), 3, d), 4, f), 5, m), 6, T), 7, g),
            a.push(v),
            a.push(p.a, p.b, p.c),
            d) {
                var R = this.faceVertexUvs[0][n];
                a.push(M(R[0]), M(R[1]), M(R[2]))
            }
            if (f && a.push(w(p.normal)),
            m) {
                var y = p.vertexNormals;
                a.push(w(y[0]), w(y[1]), w(y[2]))
            }
            if (T && a.push(b(p.color)),
            g) {
                var H = p.vertexColors;
                a.push(b(H[0]), b(H[1]), b(H[2]))
            }
        }
        function x(t, e, r) {
            return r ? t | 1 << e : t & ~(1 << e)
        }
        function w(t) {
            var e = t.x.toString() + t.y.toString() + t.z.toString();
            return void 0 !== h[e] ? h[e] : (h[e] = s.length / 3,
            s.push(t.x, t.y, t.z),
            h[e])
        }
        function b(t) {
            var e = t.r.toString() + t.g.toString() + t.b.toString();
            return void 0 !== l[e] ? l[e] : (l[e] = c.length,
            c.push(t.getHex()),
            l[e])
        }
        function M(t) {
            var e = t.x.toString() + t.y.toString();
            return void 0 !== E[e] ? E[e] : (E[e] = u.length / 2,
            u.push(t.x, t.y),
            E[e])
        }
        return t.data = {},
        t.data.vertices = i,
        t.data.normals = s,
        c.length > 0 && (t.data.colors = c),
        u.length > 0 && (t.data.uvs = [u]),
        t.data.faces = a,
        t
    },
    clone: function() {
        for (var t = new THREE.Geometry, e = this.vertices, r = 0, i = e.length; r < i; r++)
            t.vertices.push(e[r].clone());
        var n = this.faces;
        for (r = 0,
        i = n.length; r < i; r++)
            t.faces.push(n[r].clone());
        for (r = 0,
        i = this.faceVertexUvs.length; r < i; r++) {
            var o = this.faceVertexUvs[r];
            void 0 === t.faceVertexUvs[r] && (t.faceVertexUvs[r] = []);
            for (var a = 0, s = o.length; a < s; a++) {
                for (var h = o[a], c = [], l = 0, u = h.length; l < u; l++) {
                    var E = h[l];
                    c.push(E.clone())
                }
                t.faceVertexUvs[r].push(c)
            }
        }
        return t
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
},
THREE.EventDispatcher.prototype.apply(THREE.Geometry.prototype),
THREE.GeometryIdCount = 0,
THREE.Camera = function() {
    THREE.Object3D.call(this),
    this.type = "Camera",
    this.matrixWorldInverse = new THREE.Matrix4,
    this.projectionMatrix = new THREE.Matrix4
}
,
THREE.Camera.prototype = Object.create(THREE.Object3D.prototype),
THREE.Camera.prototype.constructor = THREE.Camera,
THREE.Camera.prototype.getWorldDirection = function() {
    var t = new THREE.Quaternion;
    return function(e) {
        var r = e || new THREE.Vector3;
        return this.getWorldQuaternion(t),
        r.set(0, 0, -1).applyQuaternion(t)
    }
}(),
THREE.Camera.prototype.lookAt = function() {
    var t = new THREE.Matrix4;
    return function(e) {
        t.lookAt(this.position, e, this.up),
        this.quaternion.setFromRotationMatrix(t)
    }
}(),
THREE.Camera.prototype.clone = function(t) {
    return void 0 === t && (t = new THREE.Camera),
    THREE.Object3D.prototype.clone.call(this, t),
    t.matrixWorldInverse.copy(this.matrixWorldInverse),
    t.projectionMatrix.copy(this.projectionMatrix),
    t
}
,
THREE.CubeCamera = function(t, e, r) {
    THREE.Object3D.call(this),
    this.type = "CubeCamera";
    var i = new THREE.PerspectiveCamera(90,1,t,e);
    i.up.set(0, -1, 0),
    i.lookAt(new THREE.Vector3(1,0,0)),
    this.add(i);
    var n = new THREE.PerspectiveCamera(90,1,t,e);
    n.up.set(0, -1, 0),
    n.lookAt(new THREE.Vector3(-1,0,0)),
    this.add(n);
    var o = new THREE.PerspectiveCamera(90,1,t,e);
    o.up.set(0, 0, 1),
    o.lookAt(new THREE.Vector3(0,1,0)),
    this.add(o);
    var a = new THREE.PerspectiveCamera(90,1,t,e);
    a.up.set(0, 0, -1),
    a.lookAt(new THREE.Vector3(0,-1,0)),
    this.add(a);
    var s = new THREE.PerspectiveCamera(90,1,t,e);
    s.up.set(0, -1, 0),
    s.lookAt(new THREE.Vector3(0,0,1)),
    this.add(s);
    var h = new THREE.PerspectiveCamera(90,1,t,e);
    h.up.set(0, -1, 0),
    h.lookAt(new THREE.Vector3(0,0,-1)),
    this.add(h),
    this.renderTarget = new THREE.WebGLRenderTargetCube(r,r,{
        format: THREE.RGBFormat,
        magFilter: THREE.LinearFilter,
        minFilter: THREE.LinearFilter
    }),
    this.updateCubeMap = function(t, e) {
        var r = this.renderTarget
          , c = r.generateMipmaps;
        r.generateMipmaps = !1,
        r.activeCubeFace = 0,
        t.render(e, i, r),
        r.activeCubeFace = 1,
        t.render(e, n, r),
        r.activeCubeFace = 2,
        t.render(e, o, r),
        r.activeCubeFace = 3,
        t.render(e, a, r),
        r.activeCubeFace = 4,
        t.render(e, s, r),
        r.generateMipmaps = c,
        r.activeCubeFace = 5,
        t.render(e, h, r)
    }
}
,
THREE.CubeCamera.prototype = Object.create(THREE.Object3D.prototype),
THREE.CubeCamera.prototype.constructor = THREE.CubeCamera,
THREE.OrthographicCamera = function(t, e, r, i, n, o) {
    THREE.Camera.call(this),
    this.type = "OrthographicCamera",
    this.zoom = 1,
    this.left = t,
    this.right = e,
    this.top = r,
    this.bottom = i,
    this.near = void 0 !== n ? n : .1,
    this.far = void 0 !== o ? o : 2e3,
    this.updateProjectionMatrix()
}
,
THREE.OrthographicCamera.prototype = Object.create(THREE.Camera.prototype),
THREE.OrthographicCamera.prototype.constructor = THREE.OrthographicCamera,
THREE.OrthographicCamera.prototype.updateProjectionMatrix = function() {
    var t = (this.right - this.left) / (2 * this.zoom)
      , e = (this.top - this.bottom) / (2 * this.zoom)
      , r = (this.right + this.left) / 2
      , i = (this.top + this.bottom) / 2;
    this.projectionMatrix.makeOrthographic(r - t, r + t, i + e, i - e, this.near, this.far)
}
,
THREE.OrthographicCamera.prototype.clone = function() {
    var t = new THREE.OrthographicCamera;
    return THREE.Camera.prototype.clone.call(this, t),
    t.zoom = this.zoom,
    t.left = this.left,
    t.right = this.right,
    t.top = this.top,
    t.bottom = this.bottom,
    t.near = this.near,
    t.far = this.far,
    t.projectionMatrix.copy(this.projectionMatrix),
    t
}
,
THREE.PerspectiveCamera = function(t, e, r, i) {
    THREE.Camera.call(this),
    this.type = "PerspectiveCamera",
    this.zoom = 1,
    this.fov = void 0 !== t ? t : 50,
    this.aspect = void 0 !== e ? e : 1,
    this.near = void 0 !== r ? r : .1,
    this.far = void 0 !== i ? i : 2e3,
    this.updateProjectionMatrix()
}
,
THREE.PerspectiveCamera.prototype = Object.create(THREE.Camera.prototype),
THREE.PerspectiveCamera.prototype.constructor = THREE.PerspectiveCamera,
THREE.PerspectiveCamera.prototype.setLens = function(t, e) {
    void 0 === e && (e = 24),
    this.fov = 2 * THREE.Math.radToDeg(Math.atan(e / (2 * t))),
    this.updateProjectionMatrix()
}
,
THREE.PerspectiveCamera.prototype.setViewOffset = function(t, e, r, i, n, o) {
    this.fullWidth = t,
    this.fullHeight = e,
    this.x = r,
    this.y = i,
    this.width = n,
    this.height = o,
    this.updateProjectionMatrix()
}
,
THREE.PerspectiveCamera.prototype.updateProjectionMatrix = function() {
    var t = THREE.Math.radToDeg(2 * Math.atan(Math.tan(.5 * THREE.Math.degToRad(this.fov)) / this.zoom));
    if (this.fullWidth) {
        var e = this.fullWidth / this.fullHeight
          , r = Math.tan(THREE.Math.degToRad(.5 * t)) * this.near
          , i = -r
          , n = e * i
          , o = e * r
          , a = Math.abs(o - n)
          , s = Math.abs(r - i);
        this.projectionMatrix.makeFrustum(n + this.x * a / this.fullWidth, n + (this.x + this.width) * a / this.fullWidth, r - (this.y + this.height) * s / this.fullHeight, r - this.y * s / this.fullHeight, this.near, this.far)
    } else
        this.projectionMatrix.makePerspective(t, this.aspect, this.near, this.far)
}
,
THREE.PerspectiveCamera.prototype.clone = function() {
    var t = new THREE.PerspectiveCamera;
    return THREE.Camera.prototype.clone.call(this, t),
    t.zoom = this.zoom,
    t.fov = this.fov,
    t.aspect = this.aspect,
    t.near = this.near,
    t.far = this.far,
    t.projectionMatrix.copy(this.projectionMatrix),
    t
}
,
THREE.Light = function(t) {
    THREE.Object3D.call(this),
    this.type = "Light",
    this.color = new THREE.Color(t)
}
,
THREE.Light.prototype = Object.create(THREE.Object3D.prototype),
THREE.Light.prototype.constructor = THREE.Light,
THREE.Light.prototype.clone = function(t) {
    return void 0 === t && (t = new THREE.Light),
    THREE.Object3D.prototype.clone.call(this, t),
    t.color.copy(this.color),
    t
}
,
THREE.AmbientLight = function(t) {
    THREE.Light.call(this, t),
    this.type = "AmbientLight"
}
,
THREE.AmbientLight.prototype = Object.create(THREE.Light.prototype),
THREE.AmbientLight.prototype.constructor = THREE.AmbientLight,
THREE.AmbientLight.prototype.clone = function() {
    var t = new THREE.AmbientLight;
    return THREE.Light.prototype.clone.call(this, t),
    t
}
,
THREE.AreaLight = function(t, e) {
    THREE.Light.call(this, t),
    this.type = "AreaLight",
    this.normal = new THREE.Vector3(0,-1,0),
    this.right = new THREE.Vector3(1,0,0),
    this.intensity = void 0 !== e ? e : 1,
    this.width = 1,
    this.height = 1,
    this.constantAttenuation = 1.5,
    this.linearAttenuation = .5,
    this.quadraticAttenuation = .1
}
,
THREE.AreaLight.prototype = Object.create(THREE.Light.prototype),
THREE.AreaLight.prototype.constructor = THREE.AreaLight,
THREE.DirectionalLight = function(t, e) {
    THREE.Light.call(this, t),
    this.type = "DirectionalLight",
    this.position.set(0, 1, 0),
    this.target = new THREE.Object3D,
    this.intensity = void 0 !== e ? e : 1,
    this.castShadow = !1,
    this.onlyShadow = !1,
    this.shadowCameraNear = 50,
    this.shadowCameraFar = 5e3,
    this.shadowCameraLeft = -500,
    this.shadowCameraRight = 500,
    this.shadowCameraTop = 500,
    this.shadowCameraBottom = -500,
    this.shadowCameraVisible = !1,
    this.shadowBias = 0,
    this.shadowDarkness = .5,
    this.shadowMapWidth = 512,
    this.shadowMapHeight = 512,
    this.shadowCascade = !1,
    this.shadowCascadeOffset = new THREE.Vector3(0,0,-1e3),
    this.shadowCascadeCount = 2,
    this.shadowCascadeBias = [0, 0, 0],
    this.shadowCascadeWidth = [512, 512, 512],
    this.shadowCascadeHeight = [512, 512, 512],
    this.shadowCascadeNearZ = [-1, .99, .998],
    this.shadowCascadeFarZ = [.99, .998, 1],
    this.shadowCascadeArray = [],
    this.shadowMap = null,
    this.shadowMapSize = null,
    this.shadowCamera = null,
    this.shadowMatrix = null
}
,
THREE.DirectionalLight.prototype = Object.create(THREE.Light.prototype),
THREE.DirectionalLight.prototype.constructor = THREE.DirectionalLight,
THREE.DirectionalLight.prototype.clone = function() {
    var t = new THREE.DirectionalLight;
    return THREE.Light.prototype.clone.call(this, t),
    t.target = this.target.clone(),
    t.intensity = this.intensity,
    t.castShadow = this.castShadow,
    t.onlyShadow = this.onlyShadow,
    t.shadowCameraNear = this.shadowCameraNear,
    t.shadowCameraFar = this.shadowCameraFar,
    t.shadowCameraLeft = this.shadowCameraLeft,
    t.shadowCameraRight = this.shadowCameraRight,
    t.shadowCameraTop = this.shadowCameraTop,
    t.shadowCameraBottom = this.shadowCameraBottom,
    t.shadowCameraVisible = this.shadowCameraVisible,
    t.shadowBias = this.shadowBias,
    t.shadowDarkness = this.shadowDarkness,
    t.shadowMapWidth = this.shadowMapWidth,
    t.shadowMapHeight = this.shadowMapHeight,
    t.shadowCascade = this.shadowCascade,
    t.shadowCascadeOffset.copy(this.shadowCascadeOffset),
    t.shadowCascadeCount = this.shadowCascadeCount,
    t.shadowCascadeBias = this.shadowCascadeBias.slice(0),
    t.shadowCascadeWidth = this.shadowCascadeWidth.slice(0),
    t.shadowCascadeHeight = this.shadowCascadeHeight.slice(0),
    t.shadowCascadeNearZ = this.shadowCascadeNearZ.slice(0),
    t.shadowCascadeFarZ = this.shadowCascadeFarZ.slice(0),
    t
}
,
THREE.HemisphereLight = function(t, e, r) {
    THREE.Light.call(this, t),
    this.type = "HemisphereLight",
    this.position.set(0, 100, 0),
    this.groundColor = new THREE.Color(e),
    this.intensity = void 0 !== r ? r : 1
}
,
THREE.HemisphereLight.prototype = Object.create(THREE.Light.prototype),
THREE.HemisphereLight.prototype.constructor = THREE.HemisphereLight,
THREE.HemisphereLight.prototype.clone = function() {
    var t = new THREE.HemisphereLight;
    return THREE.Light.prototype.clone.call(this, t),
    t.groundColor.copy(this.groundColor),
    t.intensity = this.intensity,
    t
}
,
THREE.PointLight = function(t, e, r, i) {
    THREE.Light.call(this, t),
    this.type = "PointLight",
    this.intensity = void 0 !== e ? e : 1,
    this.distance = void 0 !== r ? r : 0,
    this.decay = void 0 !== i ? i : 1
}
,
THREE.PointLight.prototype = Object.create(THREE.Light.prototype),
THREE.PointLight.prototype.constructor = THREE.PointLight,
THREE.PointLight.prototype.clone = function() {
    var t = new THREE.PointLight;
    return THREE.Light.prototype.clone.call(this, t),
    t.intensity = this.intensity,
    t.distance = this.distance,
    t.decay = this.decay,
    t
}
,
THREE.SpotLight = function(t, e, r, i, n, o) {
    THREE.Light.call(this, t),
    this.type = "SpotLight",
    this.position.set(0, 1, 0),
    this.target = new THREE.Object3D,
    this.intensity = void 0 !== e ? e : 1,
    this.distance = void 0 !== r ? r : 0,
    this.angle = void 0 !== i ? i : Math.PI / 3,
    this.exponent = void 0 !== n ? n : 10,
    this.decay = void 0 !== o ? o : 1,
    this.castShadow = !1,
    this.onlyShadow = !1,
    this.shadowCameraNear = 50,
    this.shadowCameraFar = 5e3,
    this.shadowCameraFov = 50,
    this.shadowCameraVisible = !1,
    this.shadowBias = 0,
    this.shadowDarkness = .5,
    this.shadowMapWidth = 512,
    this.shadowMapHeight = 512,
    this.shadowMap = null,
    this.shadowMapSize = null,
    this.shadowCamera = null,
    this.shadowMatrix = null
}
,
THREE.SpotLight.prototype = Object.create(THREE.Light.prototype),
THREE.SpotLight.prototype.constructor = THREE.SpotLight,
THREE.SpotLight.prototype.clone = function() {
    var t = new THREE.SpotLight;
    return THREE.Light.prototype.clone.call(this, t),
    t.target = this.target.clone(),
    t.intensity = this.intensity,
    t.distance = this.distance,
    t.angle = this.angle,
    t.exponent = this.exponent,
    t.decay = this.decay,
    t.castShadow = this.castShadow,
    t.onlyShadow = this.onlyShadow,
    t.shadowCameraNear = this.shadowCameraNear,
    t.shadowCameraFar = this.shadowCameraFar,
    t.shadowCameraFov = this.shadowCameraFov,
    t.shadowCameraVisible = this.shadowCameraVisible,
    t.shadowBias = this.shadowBias,
    t.shadowDarkness = this.shadowDarkness,
    t.shadowMapWidth = this.shadowMapWidth,
    t.shadowMapHeight = this.shadowMapHeight,
    t
}
,
THREE.Cache = {
    files: {},
    add: function(t, e) {
        this.files[t] = e
    },
    get: function(t) {
        return this.files[t]
    },
    remove: function(t) {
        delete this.files[t]
    },
    clear: function() {
        this.files = {}
    }
},
THREE.Loader = function(t) {
    this.showStatus = t,
    this.statusDomElement = t ? THREE.Loader.prototype.addStatusElement() : null,
    this.imageLoader = new THREE.ImageLoader,
    this.onLoadStart = function() {}
    ,
    this.onLoadProgress = function() {}
    ,
    this.onLoadComplete = function() {}
}
,
THREE.Loader.prototype = {
    constructor: THREE.Loader,
    crossOrigin: void 0,
    addStatusElement: function() {
        var t = document.createElement("div");
        return t.style.position = "absolute",
        t.style.right = "0px",
        t.style.top = "0px",
        t.style.fontSize = "0.8em",
        t.style.textAlign = "left",
        t.style.background = "rgba(0,0,0,0.25)",
        t.style.color = "#fff",
        t.style.width = "120px",
        t.style.padding = "0.5em 0.5em 0.5em 0.5em",
        t.style.zIndex = 1e3,
        t.innerHTML = "Loading ...",
        t
    },
    updateProgress: function(t) {
        var e = "Loaded ";
        t.total ? e += (100 * t.loaded / t.total).toFixed(0) + "%" : e += (t.loaded / 1024).toFixed(2) + " KB",
        this.statusDomElement.innerHTML = e
    },
    extractUrlBase: function(t) {
        var e = t.split("/");
        return 1 === e.length ? "./" : (e.pop(),
        e.join("/") + "/")
    },
    initMaterials: function(t, e) {
        for (var r = [], i = 0; i < t.length; ++i)
            r[i] = this.createMaterial(t[i], e);
        return r
    },
    needsTangents: function(t) {
        for (var e = 0, r = t.length; e < r; e++) {
            if (t[e]instanceof THREE.ShaderMaterial)
                return !0
        }
        return !1
    },
    createMaterial: function(t, e) {
        var r = this;
        function i(t) {
            var e = Math.log(t) / Math.LN2;
            return Math.pow(2, Math.round(e))
        }
        function n(t, n, o, a, s, h, c) {
            var l, u = e + o, E = THREE.Loader.Handlers.get(u);
            if (null !== E ? l = E.load(u) : (l = new THREE.Texture,
            (E = r.imageLoader).crossOrigin = r.crossOrigin,
            E.load(u, function(t) {
                if (!1 === THREE.Math.isPowerOfTwo(t.width) || !1 === THREE.Math.isPowerOfTwo(t.height)) {
                    var e = i(t.width)
                      , r = i(t.height)
                      , n = document.createElement("canvas");
                    n.width = e,
                    n.height = r,
                    n.getContext("2d").drawImage(t, 0, 0, e, r),
                    l.image = n
                } else
                    l.image = t;
                l.needsUpdate = !0
            })),
            l.sourceFile = o,
            a && (l.repeat.set(a[0], a[1]),
            1 !== a[0] && (l.wrapS = THREE.RepeatWrapping),
            1 !== a[1] && (l.wrapT = THREE.RepeatWrapping)),
            s && l.offset.set(s[0], s[1]),
            h) {
                var p = {
                    repeat: THREE.RepeatWrapping,
                    mirror: THREE.MirroredRepeatWrapping
                };
                void 0 !== p[h[0]] && (l.wrapS = p[h[0]]),
                void 0 !== p[h[1]] && (l.wrapT = p[h[1]])
            }
            c && (l.anisotropy = c),
            t[n] = l
        }
        function o(t) {
            return (255 * t[0] << 16) + (255 * t[1] << 8) + 255 * t[2]
        }
        var a = "MeshLambertMaterial"
          , s = {
            color: 15658734,
            opacity: 1,
            map: null,
            lightMap: null,
            normalMap: null,
            bumpMap: null,
            wireframe: !1
        };
        if (t.shading) {
            var h = t.shading.toLowerCase();
            "phong" === h ? a = "MeshPhongMaterial" : "basic" === h && (a = "MeshBasicMaterial")
        }
        void 0 !== t.blending && void 0 !== THREE[t.blending] && (s.blending = THREE[t.blending]),
        void 0 !== t.transparent && (s.transparent = t.transparent),
        void 0 !== t.opacity && t.opacity < 1 && (s.transparent = !0),
        void 0 !== t.depthTest && (s.depthTest = t.depthTest),
        void 0 !== t.depthWrite && (s.depthWrite = t.depthWrite),
        void 0 !== t.visible && (s.visible = t.visible),
        void 0 !== t.flipSided && (s.side = THREE.BackSide),
        void 0 !== t.doubleSided && (s.side = THREE.DoubleSide),
        void 0 !== t.wireframe && (s.wireframe = t.wireframe),
        void 0 !== t.vertexColors && ("face" === t.vertexColors ? s.vertexColors = THREE.FaceColors : t.vertexColors && (s.vertexColors = THREE.VertexColors)),
        t.colorDiffuse ? s.color = o(t.colorDiffuse) : t.DbgColor && (s.color = t.DbgColor),
        t.colorSpecular && (s.specular = o(t.colorSpecular)),
        t.colorEmissive && (s.emissive = o(t.colorEmissive)),
        void 0 !== t.transparency && (console.warn("THREE.Loader: transparency has been renamed to opacity"),
        t.opacity = t.transparency),
        void 0 !== t.opacity && (s.opacity = t.opacity),
        t.specularCoef && (s.shininess = t.specularCoef),
        t.mapDiffuse && e && n(s, "map", t.mapDiffuse, t.mapDiffuseRepeat, t.mapDiffuseOffset, t.mapDiffuseWrap, t.mapDiffuseAnisotropy),
        t.mapLight && e && n(s, "lightMap", t.mapLight, t.mapLightRepeat, t.mapLightOffset, t.mapLightWrap, t.mapLightAnisotropy),
        t.mapBump && e && n(s, "bumpMap", t.mapBump, t.mapBumpRepeat, t.mapBumpOffset, t.mapBumpWrap, t.mapBumpAnisotropy),
        t.mapNormal && e && n(s, "normalMap", t.mapNormal, t.mapNormalRepeat, t.mapNormalOffset, t.mapNormalWrap, t.mapNormalAnisotropy),
        t.mapSpecular && e && n(s, "specularMap", t.mapSpecular, t.mapSpecularRepeat, t.mapSpecularOffset, t.mapSpecularWrap, t.mapSpecularAnisotropy),
        t.mapAlpha && e && n(s, "alphaMap", t.mapAlpha, t.mapAlphaRepeat, t.mapAlphaOffset, t.mapAlphaWrap, t.mapAlphaAnisotropy),
        t.mapBumpScale && (s.bumpScale = t.mapBumpScale),
        t.mapNormalFactor && (s.normalScale = new THREE.Vector2(t.mapNormalFactor,t.mapNormalFactor));
        var c = new THREE[a](s);
        return void 0 !== t.DbgName && (c.name = t.DbgName),
        c
    }
},
THREE.Loader.Handlers = {
    handlers: [],
    add: function(t, e) {
        this.handlers.push(t, e)
    },
    get: function(t) {
        for (var e = 0, r = this.handlers.length; e < r; e += 2) {
            var i = this.handlers[e]
              , n = this.handlers[e + 1];
            if (i.test(t))
                return n
        }
        return null
    }
},
THREE.XHRLoader = function(t) {
    this.manager = void 0 !== t ? t : THREE.DefaultLoadingManager
}
,
THREE.XHRLoader.prototype = {
    constructor: THREE.XHRLoader,
    load: function(t, e, r, i) {
        var n = this
          , o = THREE.Cache.get(t);
        if (void 0 === o) {
            var a = new XMLHttpRequest;
            a.open("GET", t, !0),
            a.addEventListener("load", function(r) {
                THREE.Cache.add(t, this.response),
                e && e(this.response),
                n.manager.itemEnd(t)
            }, !1),
            void 0 !== r && a.addEventListener("progress", function(t) {
                r(t)
            }, !1),
            void 0 !== i && a.addEventListener("error", function(t) {
                i(t)
            }, !1),
            void 0 !== this.crossOrigin && (a.crossOrigin = this.crossOrigin),
            void 0 !== this.responseType && (a.responseType = this.responseType),
            a.send(null),
            n.manager.itemStart(t)
        } else
            e && e(o)
    },
    setResponseType: function(t) {
        this.responseType = t
    },
    setCrossOrigin: function(t) {
        this.crossOrigin = t
    }
},
THREE.ImageLoader = function(t) {
    this.manager = void 0 !== t ? t : THREE.DefaultLoadingManager
}
,
THREE.ImageLoader.prototype = {
    constructor: THREE.ImageLoader,
    load: function(t, e, r, i) {
        var n = this
          , o = THREE.Cache.get(t);
        if (void 0 === o) {
            var a = document.createElement("img");
            return a.addEventListener("load", function(r) {
                THREE.Cache.add(t, this),
                e && e(this),
                n.manager.itemEnd(t)
            }, !1),
            void 0 !== r && a.addEventListener("progress", function(t) {
                r(t)
            }, !1),
            void 0 !== i && a.addEventListener("error", function(t) {
                i(t)
            }, !1),
            void 0 !== this.crossOrigin && (a.crossOrigin = this.crossOrigin),
            a.src = t,
            n.manager.itemStart(t),
            a
        }
        e(o)
    },
    setCrossOrigin: function(t) {
        this.crossOrigin = t
    }
},
THREE.JSONLoader = function(t) {
    THREE.Loader.call(this, t),
    this.withCredentials = !1
}
,
THREE.JSONLoader.prototype = Object.create(THREE.Loader.prototype),
THREE.JSONLoader.prototype.constructor = THREE.JSONLoader,
THREE.JSONLoader.prototype.load = function(t, e, r) {
    r = r && "string" == typeof r ? r : this.extractUrlBase(t),
    this.onLoadStart(),
    this.loadAjaxJSON(this, t, e, r)
}
,
THREE.JSONLoader.prototype.loadAjaxJSON = function(t, e, r, i, n) {
    var o = new XMLHttpRequest
      , a = 0;
    o.onreadystatechange = function() {
        if (o.readyState === o.DONE)
            if (200 === o.status || 0 === o.status) {
                if (o.responseText) {
                    var s = JSON.parse(o.responseText)
                      , h = s.metadata;
                    if (void 0 !== h) {
                        if ("object" === h.type)
                            return void THREE.error("THREE.JSONLoader: " + e + " should be loaded with THREE.ObjectLoader instead.");
                        if ("scene" === h.type)
                            return void THREE.error("THREE.JSONLoader: " + e + " seems to be a Scene. Use THREE.SceneLoader instead.")
                    }
                    var c = t.parse(s, i);
                    r(c.geometry, c.materials)
                } else
                    THREE.error("THREE.JSONLoader: " + e + " seems to be unreachable or the file is empty.");
                t.onLoadComplete()
            } else
                THREE.error("THREE.JSONLoader: Couldn't load " + e + " (" + o.status + ")");
        else
            o.readyState === o.LOADING ? n && (0 === a && (a = o.getResponseHeader("Content-Length")),
            n({
                total: a,
                loaded: o.responseText.length
            })) : o.readyState === o.HEADERS_RECEIVED && void 0 !== n && (a = o.getResponseHeader("Content-Length"))
    }
    ,
    o.open("GET", e, !0),
    o.withCredentials = this.withCredentials,
    o.send(null)
}
,
THREE.JSONLoader.prototype.parse = function(t, e) {
    var r = new THREE.Geometry
      , i = void 0 !== t.scale ? 1 / t.scale : 1;
    if (function(e) {
        function i(t, e) {
            return t & 1 << e
        }
        var n, o, a, s, h, c, l, u, E, p, d, f, m, T, g, v, R, y, H, x, w, b, M, _, S, C, A, L = t.faces, P = t.vertices, F = t.normals, B = t.colors, U = 0;
        if (void 0 !== t.uvs) {
            for (n = 0; n < t.uvs.length; n++)
                t.uvs[n].length && U++;
            for (n = 0; n < U; n++)
                r.faceVertexUvs[n] = []
        }
        s = 0,
        h = P.length;
        for (; s < h; )
            (y = new THREE.Vector3).x = P[s++] * e,
            y.y = P[s++] * e,
            y.z = P[s++] * e,
            r.vertices.push(y);
        s = 0,
        h = L.length;
        for (; s < h; )
            if (p = L[s++],
            d = i(p, 0),
            f = i(p, 1),
            m = i(p, 3),
            T = i(p, 4),
            g = i(p, 5),
            v = i(p, 6),
            R = i(p, 7),
            d) {
                if ((x = new THREE.Face3).a = L[s],
                x.b = L[s + 1],
                x.c = L[s + 3],
                (w = new THREE.Face3).a = L[s + 1],
                w.b = L[s + 2],
                w.c = L[s + 3],
                s += 4,
                f && (E = L[s++],
                x.materialIndex = E,
                w.materialIndex = E),
                a = r.faces.length,
                m)
                    for (n = 0; n < U; n++)
                        for (_ = t.uvs[n],
                        r.faceVertexUvs[n][a] = [],
                        r.faceVertexUvs[n][a + 1] = [],
                        o = 0; o < 4; o++)
                            u = L[s++],
                            C = _[2 * u],
                            A = _[2 * u + 1],
                            S = new THREE.Vector2(C,A),
                            2 !== o && r.faceVertexUvs[n][a].push(S),
                            0 !== o && r.faceVertexUvs[n][a + 1].push(S);
                if (T && (l = 3 * L[s++],
                x.normal.set(F[l++], F[l++], F[l]),
                w.normal.copy(x.normal)),
                g)
                    for (n = 0; n < 4; n++)
                        l = 3 * L[s++],
                        M = new THREE.Vector3(F[l++],F[l++],F[l]),
                        2 !== n && x.vertexNormals.push(M),
                        0 !== n && w.vertexNormals.push(M);
                if (v && (c = L[s++],
                b = B[c],
                x.color.setHex(b),
                w.color.setHex(b)),
                R)
                    for (n = 0; n < 4; n++)
                        c = L[s++],
                        b = B[c],
                        2 !== n && x.vertexColors.push(new THREE.Color(b)),
                        0 !== n && w.vertexColors.push(new THREE.Color(b));
                r.faces.push(x),
                r.faces.push(w)
            } else {
                if ((H = new THREE.Face3).a = L[s++],
                H.b = L[s++],
                H.c = L[s++],
                f && (E = L[s++],
                H.materialIndex = E),
                a = r.faces.length,
                m)
                    for (n = 0; n < U; n++)
                        for (_ = t.uvs[n],
                        r.faceVertexUvs[n][a] = [],
                        o = 0; o < 3; o++)
                            u = L[s++],
                            C = _[2 * u],
                            A = _[2 * u + 1],
                            S = new THREE.Vector2(C,A),
                            r.faceVertexUvs[n][a].push(S);
                if (T && (l = 3 * L[s++],
                H.normal.set(F[l++], F[l++], F[l])),
                g)
                    for (n = 0; n < 3; n++)
                        l = 3 * L[s++],
                        M = new THREE.Vector3(F[l++],F[l++],F[l]),
                        H.vertexNormals.push(M);
                if (v && (c = L[s++],
                H.color.setHex(B[c])),
                R)
                    for (n = 0; n < 3; n++)
                        c = L[s++],
                        H.vertexColors.push(new THREE.Color(B[c]));
                r.faces.push(H)
            }
    }(i),
    function() {
        var e = void 0 !== t.influencesPerVertex ? t.influencesPerVertex : 2;
        if (t.skinWeights)
            for (var i = 0, n = t.skinWeights.length; i < n; i += e) {
                var o = t.skinWeights[i]
                  , a = e > 1 ? t.skinWeights[i + 1] : 0
                  , s = e > 2 ? t.skinWeights[i + 2] : 0
                  , h = e > 3 ? t.skinWeights[i + 3] : 0;
                r.skinWeights.push(new THREE.Vector4(o,a,s,h))
            }
        if (t.skinIndices)
            for (var i = 0, n = t.skinIndices.length; i < n; i += e) {
                var c = t.skinIndices[i]
                  , l = e > 1 ? t.skinIndices[i + 1] : 0
                  , u = e > 2 ? t.skinIndices[i + 2] : 0
                  , E = e > 3 ? t.skinIndices[i + 3] : 0;
                r.skinIndices.push(new THREE.Vector4(c,l,u,E))
            }
        r.bones = t.bones,
        r.bones && r.bones.length > 0 && (r.skinWeights.length !== r.skinIndices.length || r.skinIndices.length !== r.vertices.length) && THREE.warn("THREE.JSONLoader: When skinning, number of vertices (" + r.vertices.length + "), skinIndices (" + r.skinIndices.length + "), and skinWeights (" + r.skinWeights.length + ") should match.");
        r.animation = t.animation,
        r.animations = t.animations
    }(),
    function(e) {
        var i, n, o, a, s, h, c, l, u, E, p;
        if (void 0 !== t.morphTargets)
            for (s = 0,
            h = t.morphTargets.length; s < h; s++)
                for (r.morphTargets[s] = {},
                r.morphTargets[s].name = t.morphTargets[s].name,
                r.morphTargets[s].vertices = [],
                o = r.morphTargets[s].vertices,
                a = t.morphTargets[s].vertices,
                i = 0,
                n = a.length; i < n; i += 3) {
                    var d = new THREE.Vector3;
                    d.x = a[i] * e,
                    d.y = a[i + 1] * e,
                    d.z = a[i + 2] * e,
                    o.push(d)
                }
        if (void 0 !== t.morphColors)
            for (s = 0,
            h = t.morphColors.length; s < h; s++)
                for (r.morphColors[s] = {},
                r.morphColors[s].name = t.morphColors[s].name,
                r.morphColors[s].colors = [],
                u = r.morphColors[s].colors,
                E = t.morphColors[s].colors,
                c = 0,
                l = E.length; c < l; c += 3)
                    (p = new THREE.Color(16755200)).setRGB(E[c], E[c + 1], E[c + 2]),
                    u.push(p)
    }(i),
    r.computeFaceNormals(),
    r.computeBoundingSphere(),
    void 0 === t.materials || 0 === t.materials.length)
        return {
            geometry: r
        };
    var n = this.initMaterials(t.materials, e);
    return this.needsTangents(n) && r.computeTangents(),
    {
        geometry: r,
        materials: n
    }
}
,
THREE.LoadingManager = function(t, e, r) {
    var i = this
      , n = 0
      , o = 0;
    this.onLoad = t,
    this.onProgress = e,
    this.onError = r,
    this.itemStart = function(t) {
        o++
    }
    ,
    this.itemEnd = function(t) {
        n++,
        void 0 !== i.onProgress && i.onProgress(t, n, o),
        n === o && void 0 !== i.onLoad && i.onLoad()
    }
}
,
THREE.DefaultLoadingManager = new THREE.LoadingManager,
THREE.BufferGeometryLoader = function(t) {
    this.manager = void 0 !== t ? t : THREE.DefaultLoadingManager
}
,
THREE.BufferGeometryLoader.prototype = {
    constructor: THREE.BufferGeometryLoader,
    load: function(t, e, r, i) {
        var n = this
          , o = new THREE.XHRLoader(n.manager);
        o.setCrossOrigin(this.crossOrigin),
        o.load(t, function(t) {
            e(n.parse(JSON.parse(t)))
        }, r, i)
    },
    setCrossOrigin: function(t) {
        this.crossOrigin = t
    },
    parse: function(t) {
        var e = new THREE.BufferGeometry
          , r = t.data.attributes;
        for (var i in r) {
            var n = r[i]
              , o = new self[n.type](n.array);
            e.addAttribute(i, new THREE.BufferAttribute(o,n.itemSize))
        }
        var a = t.data.offsets;
        void 0 !== a && (e.offsets = JSON.parse(JSON.stringify(a)));
        var s = t.data.boundingSphere;
        if (void 0 !== s) {
            var h = new THREE.Vector3;
            void 0 !== s.center && h.fromArray(s.center),
            e.boundingSphere = new THREE.Sphere(h,s.radius)
        }
        return e
    }
},
THREE.MaterialLoader = function(t) {
    this.manager = void 0 !== t ? t : THREE.DefaultLoadingManager
}
,
THREE.MaterialLoader.prototype = {
    constructor: THREE.MaterialLoader,
    load: function(t, e, r, i) {
        var n = this
          , o = new THREE.XHRLoader(n.manager);
        o.setCrossOrigin(this.crossOrigin),
        o.load(t, function(t) {
            e(n.parse(JSON.parse(t)))
        }, r, i)
    },
    setCrossOrigin: function(t) {
        this.crossOrigin = t
    },
    parse: function(t) {
        var e = new THREE[t.type];
        if (void 0 !== t.color && e.color.setHex(t.color),
        void 0 !== t.emissive && e.emissive.setHex(t.emissive),
        void 0 !== t.specular && e.specular.setHex(t.specular),
        void 0 !== t.shininess && (e.shininess = t.shininess),
        void 0 !== t.uniforms && (e.uniforms = t.uniforms),
        void 0 !== t.vertexShader && (e.vertexShader = t.vertexShader),
        void 0 !== t.fragmentShader && (e.fragmentShader = t.fragmentShader),
        void 0 !== t.vertexColors && (e.vertexColors = t.vertexColors),
        void 0 !== t.shading && (e.shading = t.shading),
        void 0 !== t.blending && (e.blending = t.blending),
        void 0 !== t.side && (e.side = t.side),
        void 0 !== t.opacity && (e.opacity = t.opacity),
        void 0 !== t.transparent && (e.transparent = t.transparent),
        void 0 !== t.wireframe && (e.wireframe = t.wireframe),
        void 0 !== t.size && (e.size = t.size),
        void 0 !== t.sizeAttenuation && (e.sizeAttenuation = t.sizeAttenuation),
        void 0 !== t.materials)
            for (var r = 0, i = t.materials.length; r < i; r++)
                e.materials.push(this.parse(t.materials[r]));
        return e
    }
},
THREE.ObjectLoader = function(t) {
    this.manager = void 0 !== t ? t : THREE.DefaultLoadingManager,
    this.texturePath = ""
}
,
THREE.ObjectLoader.prototype = {
    constructor: THREE.ObjectLoader,
    load: function(t, e, r, i) {
        "" === this.texturePath && (this.texturePath = t.substring(0, t.lastIndexOf("/") + 1));
        var n = this
          , o = new THREE.XHRLoader(n.manager);
        o.setCrossOrigin(this.crossOrigin),
        o.load(t, function(t) {
            n.parse(JSON.parse(t), e)
        }, r, i)
    },
    setTexturePath: function(t) {
        this.texturePath = t
    },
    setCrossOrigin: function(t) {
        this.crossOrigin = t
    },
    parse: function(t, e) {
        var r = this.parseGeometries(t.geometries)
          , i = this.parseImages(t.images, function() {
            void 0 !== e && e(a)
        })
          , n = this.parseTextures(t.textures, i)
          , o = this.parseMaterials(t.materials, n)
          , a = this.parseObject(t.object, r, o);
        return void 0 !== t.images && 0 !== t.images.length || void 0 !== e && e(a),
        a
    },
    parseGeometries: function(t) {
        var e = {};
        if (void 0 !== t)
            for (var r = new THREE.JSONLoader, i = new THREE.BufferGeometryLoader, n = 0, o = t.length; n < o; n++) {
                var a, s = t[n];
                switch (s.type) {
                case "PlaneGeometry":
                case "PlaneBufferGeometry":
                    a = new THREE[s.type](s.width,s.height,s.widthSegments,s.heightSegments);
                    break;
                case "BoxGeometry":
                case "CubeGeometry":
                    a = new THREE.BoxGeometry(s.width,s.height,s.depth,s.widthSegments,s.heightSegments,s.depthSegments);
                    break;
                case "CircleGeometry":
                    a = new THREE.CircleGeometry(s.radius,s.segments);
                    break;
                case "CylinderGeometry":
                    a = new THREE.CylinderGeometry(s.radiusTop,s.radiusBottom,s.height,s.radialSegments,s.heightSegments,s.openEnded);
                    break;
                case "SphereGeometry":
                    a = new THREE.SphereGeometry(s.radius,s.widthSegments,s.heightSegments,s.phiStart,s.phiLength,s.thetaStart,s.thetaLength);
                    break;
                case "IcosahedronGeometry":
                    a = new THREE.IcosahedronGeometry(s.radius,s.detail);
                    break;
                case "TorusGeometry":
                    a = new THREE.TorusGeometry(s.radius,s.tube,s.radialSegments,s.tubularSegments,s.arc);
                    break;
                case "TorusKnotGeometry":
                    a = new THREE.TorusKnotGeometry(s.radius,s.tube,s.radialSegments,s.tubularSegments,s.p,s.q,s.heightScale);
                    break;
                case "BufferGeometry":
                    a = i.parse(s);
                    break;
                case "Geometry":
                    a = r.parse(s.data).geometry
                }
                a.uuid = s.uuid,
                void 0 !== s.name && (a.name = s.name),
                e[s.uuid] = a
            }
        return e
    },
    parseMaterials: function(t, e) {
        var r = {};
        if (void 0 !== t)
            for (var i = function(t) {
                return void 0 === e[t] && THREE.warn("THREE.ObjectLoader: Undefined texture", t),
                e[t]
            }, n = new THREE.MaterialLoader, o = 0, a = t.length; o < a; o++) {
                var s = t[o]
                  , h = n.parse(s);
                h.uuid = s.uuid,
                void 0 !== s.name && (h.name = s.name),
                void 0 !== s.map && (h.map = i(s.map)),
                void 0 !== s.bumpMap && (h.bumpMap = i(s.bumpMap),
                s.bumpScale && (h.bumpScale = new THREE.Vector2(s.bumpScale,s.bumpScale))),
                void 0 !== s.alphaMap && (h.alphaMap = i(s.alphaMap)),
                void 0 !== s.envMap && (h.envMap = i(s.envMap)),
                void 0 !== s.normalMap && (h.normalMap = i(s.normalMap),
                s.normalScale && (h.normalScale = new THREE.Vector2(s.normalScale,s.normalScale))),
                void 0 !== s.lightMap && (h.lightMap = i(s.lightMap)),
                void 0 !== s.specularMap && (h.specularMap = i(s.specularMap)),
                r[s.uuid] = h
            }
        return r
    },
    parseImages: function(t, e) {
        var r = this
          , i = {};
        if (void 0 !== t && t.length > 0) {
            var n = new THREE.LoadingManager(e)
              , o = new THREE.ImageLoader(n);
            o.setCrossOrigin(this.crossOrigin);
            for (var a = function(t) {
                return r.manager.itemStart(t),
                o.load(t, function() {
                    r.manager.itemEnd(t)
                })
            }, s = 0, h = t.length; s < h; s++) {
                var c = t[s]
                  , l = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(c.url) ? c.url : r.texturePath + c.url;
                i[c.uuid] = a(l)
            }
        }
        return i
    },
    parseTextures: function(t, e) {
        var r = {};
        if (void 0 !== t)
            for (var i = 0, n = t.length; i < n; i++) {
                var o = t[i];
                void 0 === o.image && THREE.warn('THREE.ObjectLoader: No "image" speficied for', o.uuid),
                void 0 === e[o.image] && THREE.warn("THREE.ObjectLoader: Undefined image", o.image);
                var a = new THREE.Texture(e[o.image]);
                a.needsUpdate = !0,
                a.uuid = o.uuid,
                void 0 !== o.name && (a.name = o.name),
                void 0 !== o.repeat && (a.repeat = new THREE.Vector2(o.repeat[0],o.repeat[1])),
                void 0 !== o.minFilter && (a.minFilter = THREE[o.minFilter]),
                void 0 !== o.magFilter && (a.magFilter = THREE[o.magFilter]),
                void 0 !== o.anisotropy && (a.anisotropy = o.anisotropy),
                o.wrap instanceof Array && (a.wrapS = THREE[o.wrap[0]],
                a.wrapT = THREE[o.wrap[1]]),
                r[o.uuid] = a
            }
        return r
    },
    parseObject: function() {
        var t = new THREE.Matrix4;
        return function(e, r, i) {
            var n, o = function(t) {
                return void 0 === r[t] && THREE.warn("THREE.ObjectLoader: Undefined geometry", t),
                r[t]
            }, a = function(t) {
                return void 0 === i[t] && THREE.warn("THREE.ObjectLoader: Undefined material", t),
                i[t]
            };
            switch (e.type) {
            case "Scene":
                n = new THREE.Scene;
                break;
            case "PerspectiveCamera":
                n = new THREE.PerspectiveCamera(e.fov,e.aspect,e.near,e.far);
                break;
            case "OrthographicCamera":
                n = new THREE.OrthographicCamera(e.left,e.right,e.top,e.bottom,e.near,e.far);
                break;
            case "AmbientLight":
                n = new THREE.AmbientLight(e.color);
                break;
            case "DirectionalLight":
                n = new THREE.DirectionalLight(e.color,e.intensity);
                break;
            case "PointLight":
                n = new THREE.PointLight(e.color,e.intensity,e.distance,e.decay);
                break;
            case "SpotLight":
                n = new THREE.SpotLight(e.color,e.intensity,e.distance,e.angle,e.exponent,e.decay);
                break;
            case "HemisphereLight":
                n = new THREE.HemisphereLight(e.color,e.groundColor,e.intensity);
                break;
            case "Mesh":
                n = new THREE.Mesh(o(e.geometry),a(e.material));
                break;
            case "Line":
                n = new THREE.Line(o(e.geometry),a(e.material),e.mode);
                break;
            case "PointCloud":
                n = new THREE.PointCloud(o(e.geometry),a(e.material));
                break;
            case "Sprite":
                n = new THREE.Sprite(a(e.material));
                break;
            case "Group":
                n = new THREE.Group;
                break;
            default:
                n = new THREE.Object3D
            }
            if (n.uuid = e.uuid,
            void 0 !== e.name && (n.name = e.name),
            void 0 !== e.matrix ? (t.fromArray(e.matrix),
            t.decompose(n.position, n.quaternion, n.scale)) : (void 0 !== e.position && n.position.fromArray(e.position),
            void 0 !== e.rotation && n.rotation.fromArray(e.rotation),
            void 0 !== e.scale && n.scale.fromArray(e.scale)),
            void 0 !== e.visible && (n.visible = e.visible),
            void 0 !== e.userData && (n.userData = e.userData),
            void 0 !== e.children)
                for (var s in e.children)
                    n.add(this.parseObject(e.children[s], r, i));
            return n
        }
    }()
},
THREE.TextureLoader = function(t) {
    this.manager = void 0 !== t ? t : THREE.DefaultLoadingManager
}
,
THREE.TextureLoader.prototype = {
    constructor: THREE.TextureLoader,
    load: function(t, e, r, i) {
        var n = new THREE.ImageLoader(this.manager);
        n.setCrossOrigin(this.crossOrigin),
        n.load(t, function(t) {
            var r = new THREE.Texture(t);
            r.needsUpdate = !0,
            void 0 !== e && e(r)
        }, r, i)
    },
    setCrossOrigin: function(t) {
        this.crossOrigin = t
    }
},
THREE.DataTextureLoader = THREE.BinaryTextureLoader = function() {
    this._parser = null
}
,
THREE.BinaryTextureLoader.prototype = {
    constructor: THREE.BinaryTextureLoader,
    load: function(t, e, r, i) {
        var n = this
          , o = new THREE.DataTexture
          , a = new THREE.XHRLoader;
        return a.setResponseType("arraybuffer"),
        a.load(t, function(t) {
            var r = n._parser(t);
            r && (void 0 !== r.image ? o.image = r.image : void 0 !== r.data && (o.image.width = r.width,
            o.image.height = r.height,
            o.image.data = r.data),
            o.wrapS = void 0 !== r.wrapS ? r.wrapS : THREE.ClampToEdgeWrapping,
            o.wrapT = void 0 !== r.wrapT ? r.wrapT : THREE.ClampToEdgeWrapping,
            o.magFilter = void 0 !== r.magFilter ? r.magFilter : THREE.LinearFilter,
            o.minFilter = void 0 !== r.minFilter ? r.minFilter : THREE.LinearMipMapLinearFilter,
            o.anisotropy = void 0 !== r.anisotropy ? r.anisotropy : 1,
            void 0 !== r.format && (o.format = r.format),
            void 0 !== r.type && (o.type = r.type),
            void 0 !== r.mipmaps && (o.mipmaps = r.mipmaps),
            1 === r.mipmapCount && (o.minFilter = THREE.LinearFilter),
            o.needsUpdate = !0,
            e && e(o, r))
        }, r, i),
        o
    }
},
THREE.CompressedTextureLoader = function() {
    this._parser = null
}
,
THREE.CompressedTextureLoader.prototype = {
    constructor: THREE.CompressedTextureLoader,
    load: function(t, e, r) {
        var i = this
          , n = []
          , o = new THREE.CompressedTexture;
        o.image = n;
        var a = new THREE.XHRLoader;
        if (a.setResponseType("arraybuffer"),
        t instanceof Array)
            for (var s = 0, h = function(r) {
                a.load(t[r], function(t) {
                    var a = i._parser(t, !0);
                    n[r] = {
                        width: a.width,
                        height: a.height,
                        format: a.format,
                        mipmaps: a.mipmaps
                    },
                    6 === (s += 1) && (1 == a.mipmapCount && (o.minFilter = THREE.LinearFilter),
                    o.format = a.format,
                    o.needsUpdate = !0,
                    e && e(o))
                })
            }, c = 0, l = t.length; c < l; ++c)
                h(c);
        else
            a.load(t, function(t) {
                var r = i._parser(t, !0);
                if (r.isCubemap)
                    for (var a = r.mipmaps.length / r.mipmapCount, s = 0; s < a; s++) {
                        n[s] = {
                            mipmaps: []
                        };
                        for (var h = 0; h < r.mipmapCount; h++)
                            n[s].mipmaps.push(r.mipmaps[s * r.mipmapCount + h]),
                            n[s].format = r.format,
                            n[s].width = r.width,
                            n[s].height = r.height
                    }
                else
                    o.image.width = r.width,
                    o.image.height = r.height,
                    o.mipmaps = r.mipmaps;
                1 === r.mipmapCount && (o.minFilter = THREE.LinearFilter),
                o.format = r.format,
                o.needsUpdate = !0,
                e && e(o)
            });
        return o
    }
},
THREE.Material = function() {
    Object.defineProperty(this, "id", {
        value: THREE.MaterialIdCount++
    }),
    this.uuid = THREE.Math.generateUUID(),
    this.name = "",
    this.type = "Material",
    this.side = THREE.FrontSide,
    this.opacity = 1,
    this.transparent = !1,
    this.blending = THREE.NormalBlending,
    this.blendSrc = THREE.SrcAlphaFactor,
    this.blendDst = THREE.OneMinusSrcAlphaFactor,
    this.blendEquation = THREE.AddEquation,
    this.blendSrcAlpha = null,
    this.blendDstAlpha = null,
    this.blendEquationAlpha = null,
    this.depthTest = !0,
    this.depthWrite = !0,
    this.colorWrite = !0,
    this.polygonOffset = !1,
    this.polygonOffsetFactor = 0,
    this.polygonOffsetUnits = 0,
    this.alphaTest = 0,
    this.overdraw = 0,
    this.visible = !0,
    this._needsUpdate = !0
}
,
THREE.Material.prototype = {
    constructor: THREE.Material,
    get needsUpdate() {
        return this._needsUpdate
    },
    set needsUpdate(t) {
        !0 === t && this.update(),
        this._needsUpdate = t
    },
    setValues: function(t) {
        if (void 0 !== t)
            for (var e in t) {
                var r = t[e];
                if (void 0 !== r) {
                    if (e in this) {
                        var i = this[e];
                        i instanceof THREE.Color ? i.set(r) : i instanceof THREE.Vector3 && r instanceof THREE.Vector3 ? i.copy(r) : this[e] = "overdraw" == e ? Number(r) : r
                    }
                } else
                    THREE.warn("THREE.Material: '" + e + "' parameter is undefined.")
            }
    },
    toJSON: function() {
        var t = {
            metadata: {
                version: 4.2,
                type: "material",
                generator: "MaterialExporter"
            },
            uuid: this.uuid,
            type: this.type
        };
        return "" !== this.name && (t.name = this.name),
        this instanceof THREE.MeshBasicMaterial ? (t.color = this.color.getHex(),
        this.vertexColors !== THREE.NoColors && (t.vertexColors = this.vertexColors),
        this.blending !== THREE.NormalBlending && (t.blending = this.blending),
        this.side !== THREE.FrontSide && (t.side = this.side)) : this instanceof THREE.MeshLambertMaterial ? (t.color = this.color.getHex(),
        t.emissive = this.emissive.getHex(),
        this.vertexColors !== THREE.NoColors && (t.vertexColors = this.vertexColors),
        this.shading !== THREE.SmoothShading && (t.shading = this.shading),
        this.blending !== THREE.NormalBlending && (t.blending = this.blending),
        this.side !== THREE.FrontSide && (t.side = this.side)) : this instanceof THREE.MeshPhongMaterial ? (t.color = this.color.getHex(),
        t.emissive = this.emissive.getHex(),
        t.specular = this.specular.getHex(),
        t.shininess = this.shininess,
        this.vertexColors !== THREE.NoColors && (t.vertexColors = this.vertexColors),
        this.shading !== THREE.SmoothShading && (t.shading = this.shading),
        this.blending !== THREE.NormalBlending && (t.blending = this.blending),
        this.side !== THREE.FrontSide && (t.side = this.side)) : this instanceof THREE.MeshNormalMaterial ? (this.blending !== THREE.NormalBlending && (t.blending = this.blending),
        this.side !== THREE.FrontSide && (t.side = this.side)) : this instanceof THREE.MeshDepthMaterial ? (this.blending !== THREE.NormalBlending && (t.blending = this.blending),
        this.side !== THREE.FrontSide && (t.side = this.side)) : this instanceof THREE.PointCloudMaterial ? (t.size = this.size,
        t.sizeAttenuation = this.sizeAttenuation,
        t.color = this.color.getHex(),
        this.vertexColors !== THREE.NoColors && (t.vertexColors = this.vertexColors),
        this.blending !== THREE.NormalBlending && (t.blending = this.blending)) : this instanceof THREE.ShaderMaterial ? (t.uniforms = this.uniforms,
        t.vertexShader = this.vertexShader,
        t.fragmentShader = this.fragmentShader) : this instanceof THREE.SpriteMaterial && (t.color = this.color.getHex()),
        this.opacity < 1 && (t.opacity = this.opacity),
        !1 !== this.transparent && (t.transparent = this.transparent),
        !1 !== this.wireframe && (t.wireframe = this.wireframe),
        t
    },
    clone: function(t) {
        return void 0 === t && (t = new THREE.Material),
        t.name = this.name,
        t.side = this.side,
        t.opacity = this.opacity,
        t.transparent = this.transparent,
        t.blending = this.blending,
        t.blendSrc = this.blendSrc,
        t.blendDst = this.blendDst,
        t.blendEquation = this.blendEquation,
        t.blendSrcAlpha = this.blendSrcAlpha,
        t.blendDstAlpha = this.blendDstAlpha,
        t.blendEquationAlpha = this.blendEquationAlpha,
        t.depthTest = this.depthTest,
        t.depthWrite = this.depthWrite,
        t.polygonOffset = this.polygonOffset,
        t.polygonOffsetFactor = this.polygonOffsetFactor,
        t.polygonOffsetUnits = this.polygonOffsetUnits,
        t.alphaTest = this.alphaTest,
        t.overdraw = this.overdraw,
        t.visible = this.visible,
        t
    },
    update: function() {
        this.dispatchEvent({
            type: "update"
        })
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
},
THREE.EventDispatcher.prototype.apply(THREE.Material.prototype),
THREE.MaterialIdCount = 0,
THREE.LineBasicMaterial = function(t) {
    THREE.Material.call(this),
    this.type = "LineBasicMaterial",
    this.color = new THREE.Color(16777215),
    this.linewidth = 1,
    this.linecap = "round",
    this.linejoin = "round",
    this.vertexColors = THREE.NoColors,
    this.fog = !0,
    this.setValues(t)
}
,
THREE.LineBasicMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.LineBasicMaterial.prototype.constructor = THREE.LineBasicMaterial,
THREE.LineBasicMaterial.prototype.clone = function() {
    var t = new THREE.LineBasicMaterial;
    return THREE.Material.prototype.clone.call(this, t),
    t.color.copy(this.color),
    t.linewidth = this.linewidth,
    t.linecap = this.linecap,
    t.linejoin = this.linejoin,
    t.vertexColors = this.vertexColors,
    t.fog = this.fog,
    t
}
,
THREE.LineDashedMaterial = function(t) {
    THREE.Material.call(this),
    this.type = "LineDashedMaterial",
    this.color = new THREE.Color(16777215),
    this.linewidth = 1,
    this.scale = 1,
    this.dashSize = 3,
    this.gapSize = 1,
    this.vertexColors = !1,
    this.fog = !0,
    this.setValues(t)
}
,
THREE.LineDashedMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.LineDashedMaterial.prototype.constructor = THREE.LineDashedMaterial,
THREE.LineDashedMaterial.prototype.clone = function() {
    var t = new THREE.LineDashedMaterial;
    return THREE.Material.prototype.clone.call(this, t),
    t.color.copy(this.color),
    t.linewidth = this.linewidth,
    t.scale = this.scale,
    t.dashSize = this.dashSize,
    t.gapSize = this.gapSize,
    t.vertexColors = this.vertexColors,
    t.fog = this.fog,
    t
}
,
THREE.MeshBasicMaterial = function(t) {
    THREE.Material.call(this),
    this.type = "MeshBasicMaterial",
    this.color = new THREE.Color(16777215),
    this.map = null,
    this.lightMap = null,
    this.specularMap = null,
    this.alphaMap = null,
    this.envMap = null,
    this.combine = THREE.MultiplyOperation,
    this.reflectivity = 1,
    this.refractionRatio = .98,
    this.fog = !0,
    this.shading = THREE.SmoothShading,
    this.wireframe = !1,
    this.wireframeLinewidth = 1,
    this.wireframeLinecap = "round",
    this.wireframeLinejoin = "round",
    this.vertexColors = THREE.NoColors,
    this.skinning = !1,
    this.morphTargets = !1,
    this.setValues(t)
}
,
THREE.MeshBasicMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.MeshBasicMaterial.prototype.constructor = THREE.MeshBasicMaterial,
THREE.MeshBasicMaterial.prototype.clone = function() {
    var t = new THREE.MeshBasicMaterial;
    return THREE.Material.prototype.clone.call(this, t),
    t.color.copy(this.color),
    t.map = this.map,
    t.lightMap = this.lightMap,
    t.specularMap = this.specularMap,
    t.alphaMap = this.alphaMap,
    t.envMap = this.envMap,
    t.combine = this.combine,
    t.reflectivity = this.reflectivity,
    t.refractionRatio = this.refractionRatio,
    t.fog = this.fog,
    t.shading = this.shading,
    t.wireframe = this.wireframe,
    t.wireframeLinewidth = this.wireframeLinewidth,
    t.wireframeLinecap = this.wireframeLinecap,
    t.wireframeLinejoin = this.wireframeLinejoin,
    t.vertexColors = this.vertexColors,
    t.skinning = this.skinning,
    t.morphTargets = this.morphTargets,
    t
}
,
THREE.MeshLambertMaterial = function(t) {
    THREE.Material.call(this),
    this.type = "MeshLambertMaterial",
    this.color = new THREE.Color(16777215),
    this.emissive = new THREE.Color(0),
    this.wrapAround = !1,
    this.wrapRGB = new THREE.Vector3(1,1,1),
    this.map = null,
    this.lightMap = null,
    this.specularMap = null,
    this.alphaMap = null,
    this.envMap = null,
    this.combine = THREE.MultiplyOperation,
    this.reflectivity = 1,
    this.refractionRatio = .98,
    this.fog = !0,
    this.shading = THREE.SmoothShading,
    this.wireframe = !1,
    this.wireframeLinewidth = 1,
    this.wireframeLinecap = "round",
    this.wireframeLinejoin = "round",
    this.vertexColors = THREE.NoColors,
    this.skinning = !1,
    this.morphTargets = !1,
    this.morphNormals = !1,
    this.setValues(t)
}
,
THREE.MeshLambertMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.MeshLambertMaterial.prototype.constructor = THREE.MeshLambertMaterial,
THREE.MeshLambertMaterial.prototype.clone = function() {
    var t = new THREE.MeshLambertMaterial;
    return THREE.Material.prototype.clone.call(this, t),
    t.color.copy(this.color),
    t.emissive.copy(this.emissive),
    t.wrapAround = this.wrapAround,
    t.wrapRGB.copy(this.wrapRGB),
    t.map = this.map,
    t.lightMap = this.lightMap,
    t.specularMap = this.specularMap,
    t.alphaMap = this.alphaMap,
    t.envMap = this.envMap,
    t.combine = this.combine,
    t.reflectivity = this.reflectivity,
    t.refractionRatio = this.refractionRatio,
    t.fog = this.fog,
    t.shading = this.shading,
    t.wireframe = this.wireframe,
    t.wireframeLinewidth = this.wireframeLinewidth,
    t.wireframeLinecap = this.wireframeLinecap,
    t.wireframeLinejoin = this.wireframeLinejoin,
    t.vertexColors = this.vertexColors,
    t.skinning = this.skinning,
    t.morphTargets = this.morphTargets,
    t.morphNormals = this.morphNormals,
    t
}
,
THREE.MeshPhongMaterial = function(t) {
    THREE.Material.call(this),
    this.type = "MeshPhongMaterial",
    this.color = new THREE.Color(16777215),
    this.emissive = new THREE.Color(0),
    this.specular = new THREE.Color(1118481),
    this.shininess = 30,
    this.metal = !1,
    this.wrapAround = !1,
    this.wrapRGB = new THREE.Vector3(1,1,1),
    this.map = null,
    this.lightMap = null,
    this.bumpMap = null,
    this.bumpScale = 1,
    this.normalMap = null,
    this.normalScale = new THREE.Vector2(1,1),
    this.specularMap = null,
    this.alphaMap = null,
    this.envMap = null,
    this.combine = THREE.MultiplyOperation,
    this.reflectivity = 1,
    this.refractionRatio = .98,
    this.fog = !0,
    this.shading = THREE.SmoothShading,
    this.wireframe = !1,
    this.wireframeLinewidth = 1,
    this.wireframeLinecap = "round",
    this.wireframeLinejoin = "round",
    this.vertexColors = THREE.NoColors,
    this.skinning = !1,
    this.morphTargets = !1,
    this.morphNormals = !1,
    this.setValues(t)
}
,
THREE.MeshPhongMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.MeshPhongMaterial.prototype.constructor = THREE.MeshPhongMaterial,
THREE.MeshPhongMaterial.prototype.clone = function() {
    var t = new THREE.MeshPhongMaterial;
    return THREE.Material.prototype.clone.call(this, t),
    t.color.copy(this.color),
    t.emissive.copy(this.emissive),
    t.specular.copy(this.specular),
    t.shininess = this.shininess,
    t.metal = this.metal,
    t.wrapAround = this.wrapAround,
    t.wrapRGB.copy(this.wrapRGB),
    t.map = this.map,
    t.lightMap = this.lightMap,
    t.bumpMap = this.bumpMap,
    t.bumpScale = this.bumpScale,
    t.normalMap = this.normalMap,
    t.normalScale.copy(this.normalScale),
    t.specularMap = this.specularMap,
    t.alphaMap = this.alphaMap,
    t.envMap = this.envMap,
    t.combine = this.combine,
    t.reflectivity = this.reflectivity,
    t.refractionRatio = this.refractionRatio,
    t.fog = this.fog,
    t.shading = this.shading,
    t.wireframe = this.wireframe,
    t.wireframeLinewidth = this.wireframeLinewidth,
    t.wireframeLinecap = this.wireframeLinecap,
    t.wireframeLinejoin = this.wireframeLinejoin,
    t.vertexColors = this.vertexColors,
    t.skinning = this.skinning,
    t.morphTargets = this.morphTargets,
    t.morphNormals = this.morphNormals,
    t
}
,
THREE.MeshDepthMaterial = function(t) {
    THREE.Material.call(this),
    this.type = "MeshDepthMaterial",
    this.morphTargets = !1,
    this.wireframe = !1,
    this.wireframeLinewidth = 1,
    this.setValues(t)
}
,
THREE.MeshDepthMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.MeshDepthMaterial.prototype.constructor = THREE.MeshDepthMaterial,
THREE.MeshDepthMaterial.prototype.clone = function() {
    var t = new THREE.MeshDepthMaterial;
    return THREE.Material.prototype.clone.call(this, t),
    t.wireframe = this.wireframe,
    t.wireframeLinewidth = this.wireframeLinewidth,
    t
}
,
THREE.MeshNormalMaterial = function(t) {
    THREE.Material.call(this, t),
    this.type = "MeshNormalMaterial",
    this.wireframe = !1,
    this.wireframeLinewidth = 1,
    this.morphTargets = !1,
    this.setValues(t)
}
,
THREE.MeshNormalMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.MeshNormalMaterial.prototype.constructor = THREE.MeshNormalMaterial,
THREE.MeshNormalMaterial.prototype.clone = function() {
    var t = new THREE.MeshNormalMaterial;
    return THREE.Material.prototype.clone.call(this, t),
    t.wireframe = this.wireframe,
    t.wireframeLinewidth = this.wireframeLinewidth,
    t
}
,
THREE.MeshFaceMaterial = function(t) {
    this.uuid = THREE.Math.generateUUID(),
    this.type = "MeshFaceMaterial",
    this.materials = t instanceof Array ? t : []
}
,
THREE.MeshFaceMaterial.prototype = {
    constructor: THREE.MeshFaceMaterial,
    toJSON: function() {
        for (var t = {
            metadata: {
                version: 4.2,
                type: "material",
                generator: "MaterialExporter"
            },
            uuid: this.uuid,
            type: this.type,
            materials: []
        }, e = 0, r = this.materials.length; e < r; e++)
            t.materials.push(this.materials[e].toJSON());
        return t
    },
    clone: function() {
        for (var t = new THREE.MeshFaceMaterial, e = 0; e < this.materials.length; e++)
            t.materials.push(this.materials[e].clone());
        return t
    }
},
THREE.PointCloudMaterial = function(t) {
    THREE.Material.call(this),
    this.type = "PointCloudMaterial",
    this.color = new THREE.Color(16777215),
    this.map = null,
    this.size = 1,
    this.sizeAttenuation = !0,
    this.vertexColors = THREE.NoColors,
    this.fog = !0,
    this.setValues(t)
}
,
THREE.PointCloudMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.PointCloudMaterial.prototype.constructor = THREE.PointCloudMaterial,
THREE.PointCloudMaterial.prototype.clone = function() {
    var t = new THREE.PointCloudMaterial;
    return THREE.Material.prototype.clone.call(this, t),
    t.color.copy(this.color),
    t.map = this.map,
    t.size = this.size,
    t.sizeAttenuation = this.sizeAttenuation,
    t.vertexColors = this.vertexColors,
    t.fog = this.fog,
    t
}
,
THREE.ParticleBasicMaterial = function(t) {
    return THREE.warn("THREE.ParticleBasicMaterial has been renamed to THREE.PointCloudMaterial."),
    new THREE.PointCloudMaterial(t)
}
,
THREE.ParticleSystemMaterial = function(t) {
    return THREE.warn("THREE.ParticleSystemMaterial has been renamed to THREE.PointCloudMaterial."),
    new THREE.PointCloudMaterial(t)
}
,
THREE.ShaderMaterial = function(t) {
    THREE.Material.call(this),
    this.type = "ShaderMaterial",
    this.defines = {},
    this.uniforms = {},
    this.attributes = null,
    this.vertexShader = "void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}",
    this.fragmentShader = "void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}",
    this.shading = THREE.SmoothShading,
    this.linewidth = 1,
    this.wireframe = !1,
    this.wireframeLinewidth = 1,
    this.fog = !1,
    this.lights = !1,
    this.vertexColors = THREE.NoColors,
    this.skinning = !1,
    this.morphTargets = !1,
    this.morphNormals = !1,
    this.defaultAttributeValues = {
        color: [1, 1, 1],
        uv: [0, 0],
        uv2: [0, 0]
    },
    this.index0AttributeName = void 0,
    this.setValues(t)
}
,
THREE.ShaderMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.ShaderMaterial.prototype.constructor = THREE.ShaderMaterial,
THREE.ShaderMaterial.prototype.clone = function() {
    var t = new THREE.ShaderMaterial;
    return THREE.Material.prototype.clone.call(this, t),
    t.fragmentShader = this.fragmentShader,
    t.vertexShader = this.vertexShader,
    t.uniforms = THREE.UniformsUtils.clone(this.uniforms),
    t.attributes = this.attributes,
    t.defines = this.defines,
    t.shading = this.shading,
    t.wireframe = this.wireframe,
    t.wireframeLinewidth = this.wireframeLinewidth,
    t.fog = this.fog,
    t.lights = this.lights,
    t.vertexColors = this.vertexColors,
    t.skinning = this.skinning,
    t.morphTargets = this.morphTargets,
    t.morphNormals = this.morphNormals,
    t
}
,
THREE.RawShaderMaterial = function(t) {
    THREE.ShaderMaterial.call(this, t),
    this.type = "RawShaderMaterial"
}
,
THREE.RawShaderMaterial.prototype = Object.create(THREE.ShaderMaterial.prototype),
THREE.RawShaderMaterial.prototype.constructor = THREE.RawShaderMaterial,
THREE.RawShaderMaterial.prototype.clone = function() {
    var t = new THREE.RawShaderMaterial;
    return THREE.ShaderMaterial.prototype.clone.call(this, t),
    t
}
,
THREE.SpriteMaterial = function(t) {
    THREE.Material.call(this),
    this.type = "SpriteMaterial",
    this.color = new THREE.Color(16777215),
    this.map = null,
    this.rotation = 0,
    this.fog = !1,
    this.setValues(t)
}
,
THREE.SpriteMaterial.prototype = Object.create(THREE.Material.prototype),
THREE.SpriteMaterial.prototype.constructor = THREE.SpriteMaterial,
THREE.SpriteMaterial.prototype.clone = function() {
    var t = new THREE.SpriteMaterial;
    return THREE.Material.prototype.clone.call(this, t),
    t.color.copy(this.color),
    t.map = this.map,
    t.rotation = this.rotation,
    t.fog = this.fog,
    t
}
,
THREE.Texture = function(t, e, r, i, n, o, a, s, h) {
    Object.defineProperty(this, "id", {
        value: THREE.TextureIdCount++
    }),
    this.uuid = THREE.Math.generateUUID(),
    this.name = "",
    this.sourceFile = "",
    this.image = void 0 !== t ? t : THREE.Texture.DEFAULT_IMAGE,
    this.mipmaps = [],
    this.mapping = void 0 !== e ? e : THREE.Texture.DEFAULT_MAPPING,
    this.wrapS = void 0 !== r ? r : THREE.ClampToEdgeWrapping,
    this.wrapT = void 0 !== i ? i : THREE.ClampToEdgeWrapping,
    this.magFilter = void 0 !== n ? n : THREE.LinearFilter,
    this.minFilter = void 0 !== o ? o : THREE.LinearMipMapLinearFilter,
    this.anisotropy = void 0 !== h ? h : 1,
    this.format = void 0 !== a ? a : THREE.RGBAFormat,
    this.type = void 0 !== s ? s : THREE.UnsignedByteType,
    this.offset = new THREE.Vector2(0,0),
    this.repeat = new THREE.Vector2(1,1),
    this.generateMipmaps = !0,
    this.premultiplyAlpha = !1,
    this.flipY = !0,
    this.unpackAlignment = 4,
    this._needsUpdate = !1,
    this.onUpdate = null
}
,
THREE.Texture.DEFAULT_IMAGE = void 0,
THREE.Texture.DEFAULT_MAPPING = THREE.UVMapping,
THREE.Texture.prototype = {
    constructor: THREE.Texture,
    get needsUpdate() {
        return this._needsUpdate
    },
    set needsUpdate(t) {
        !0 === t && this.update(),
        this._needsUpdate = t
    },
    clone: function(t) {
        return void 0 === t && (t = new THREE.Texture),
        t.image = this.image,
        t.mipmaps = this.mipmaps.slice(0),
        t.mapping = this.mapping,
        t.wrapS = this.wrapS,
        t.wrapT = this.wrapT,
        t.magFilter = this.magFilter,
        t.minFilter = this.minFilter,
        t.anisotropy = this.anisotropy,
        t.format = this.format,
        t.type = this.type,
        t.offset.copy(this.offset),
        t.repeat.copy(this.repeat),
        t.generateMipmaps = this.generateMipmaps,
        t.premultiplyAlpha = this.premultiplyAlpha,
        t.flipY = this.flipY,
        t.unpackAlignment = this.unpackAlignment,
        t
    },
    update: function() {
        this.dispatchEvent({
            type: "update"
        })
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
},
THREE.EventDispatcher.prototype.apply(THREE.Texture.prototype),
THREE.TextureIdCount = 0,
THREE.CubeTexture = function(t, e, r, i, n, o, a, s, h) {
    e = void 0 !== e ? e : THREE.CubeReflectionMapping,
    THREE.Texture.call(this, t, e, r, i, n, o, a, s, h),
    this.images = t
}
,
THREE.CubeTexture.prototype = Object.create(THREE.Texture.prototype),
THREE.CubeTexture.prototype.constructor = THREE.CubeTexture,
THREE.CubeTexture.clone = function(t) {
    return void 0 === t && (t = new THREE.CubeTexture),
    THREE.Texture.prototype.clone.call(this, t),
    t.images = this.images,
    t
}
,
THREE.CompressedTexture = function(t, e, r, i, n, o, a, s, h, c, l) {
    THREE.Texture.call(this, null, o, a, s, h, c, i, n, l),
    this.image = {
        width: e,
        height: r
    },
    this.mipmaps = t,
    this.flipY = !1,
    this.generateMipmaps = !1
}
,
THREE.CompressedTexture.prototype = Object.create(THREE.Texture.prototype),
THREE.CompressedTexture.prototype.constructor = THREE.CompressedTexture,
THREE.CompressedTexture.prototype.clone = function() {
    var t = new THREE.CompressedTexture;
    return THREE.Texture.prototype.clone.call(this, t),
    t
}
,
THREE.DataTexture = function(t, e, r, i, n, o, a, s, h, c, l) {
    THREE.Texture.call(this, null, o, a, s, h, c, i, n, l),
    this.image = {
        data: t,
        width: e,
        height: r
    }
}
,
THREE.DataTexture.prototype = Object.create(THREE.Texture.prototype),
THREE.DataTexture.prototype.constructor = THREE.DataTexture,
THREE.DataTexture.prototype.clone = function() {
    var t = new THREE.DataTexture;
    return THREE.Texture.prototype.clone.call(this, t),
    t
}
,
THREE.VideoTexture = function(t, e, r, i, n, o, a, s, h) {
    THREE.Texture.call(this, t, e, r, i, n, o, a, s, h),
    this.generateMipmaps = !1;
    var c = this
      , l = function() {
        requestAnimationFrame(l),
        t.readyState === t.HAVE_ENOUGH_DATA && (c.needsUpdate = !0)
    };
    l()
}
,
THREE.VideoTexture.prototype = Object.create(THREE.Texture.prototype),
THREE.VideoTexture.prototype.constructor = THREE.VideoTexture,
THREE.Group = function() {
    THREE.Object3D.call(this),
    this.type = "Group"
}
,
THREE.Group.prototype = Object.create(THREE.Object3D.prototype),
THREE.Group.prototype.constructor = THREE.Group,
THREE.PointCloud = function(t, e) {
    THREE.Object3D.call(this),
    this.type = "PointCloud",
    this.geometry = void 0 !== t ? t : new THREE.Geometry,
    this.material = void 0 !== e ? e : new THREE.PointCloudMaterial({
        color: 16777215 * Math.random()
    })
}
,
THREE.PointCloud.prototype = Object.create(THREE.Object3D.prototype),
THREE.PointCloud.prototype.constructor = THREE.PointCloud,
THREE.PointCloud.prototype.raycast = function() {
    var t = new THREE.Matrix4
      , e = new THREE.Ray;
    return function(r, i) {
        var n = this
          , o = n.geometry
          , a = r.params.PointCloud.threshold;
        if (t.getInverse(this.matrixWorld),
        e.copy(r.ray).applyMatrix4(t),
        null === o.boundingBox || !1 !== e.isIntersectionBox(o.boundingBox)) {
            var s = a / ((this.scale.x + this.scale.y + this.scale.z) / 3)
              , h = new THREE.Vector3
              , c = function(t, o) {
                var a = e.distanceToPoint(t);
                if (a < s) {
                    var h = e.closestPointToPoint(t);
                    h.applyMatrix4(n.matrixWorld);
                    var c = r.ray.origin.distanceTo(h);
                    i.push({
                        distance: c,
                        distanceToRay: a,
                        point: h.clone(),
                        index: o,
                        face: null,
                        object: n
                    })
                }
            };
            if (o instanceof THREE.BufferGeometry) {
                var l = o.attributes
                  , u = l.position.array;
                if (void 0 !== l.index) {
                    var E = l.index.array
                      , p = o.offsets;
                    if (0 === p.length)
                        p = [{
                            start: 0,
                            count: E.length,
                            index: 0
                        }];
                    for (var d = 0, f = p.length; d < f; ++d)
                        for (var m = p[d].start, T = p[d].count, g = p[d].index, v = m, R = m + T; v < R; v++) {
                            var y = g + E[v];
                            h.fromArray(u, 3 * y),
                            c(h, y)
                        }
                } else {
                    var H = u.length / 3;
                    for (v = 0; v < H; v++)
                        h.set(u[3 * v], u[3 * v + 1], u[3 * v + 2]),
                        c(h, v)
                }
            } else {
                var x = this.geometry.vertices;
                for (v = 0; v < x.length; v++)
                    c(x[v], v)
            }
        }
    }
}(),
THREE.PointCloud.prototype.clone = function(t) {
    return void 0 === t && (t = new THREE.PointCloud(this.geometry,this.material)),
    THREE.Object3D.prototype.clone.call(this, t),
    t
}
,
THREE.ParticleSystem = function(t, e) {
    return THREE.warn("THREE.ParticleSystem has been renamed to THREE.PointCloud."),
    new THREE.PointCloud(t,e)
}
,
THREE.Line = function(t, e, r) {
    THREE.Object3D.call(this),
    this.type = "Line",
    this.geometry = void 0 !== t ? t : new THREE.Geometry,
    this.material = void 0 !== e ? e : new THREE.LineBasicMaterial({
        color: 16777215 * Math.random()
    }),
    this.mode = void 0 !== r ? r : THREE.LineStrip
}
,
THREE.LineStrip = 0,
THREE.LinePieces = 1,
THREE.Line.prototype = Object.create(THREE.Object3D.prototype),
THREE.Line.prototype.constructor = THREE.Line,
THREE.Line.prototype.raycast = function() {
    var t = new THREE.Matrix4
      , e = new THREE.Ray
      , r = new THREE.Sphere;
    return function(i, n) {
        var o = i.linePrecision
          , a = o * o
          , s = this.geometry;
        if (null === s.boundingSphere && s.computeBoundingSphere(),
        r.copy(s.boundingSphere),
        r.applyMatrix4(this.matrixWorld),
        !1 !== i.ray.isIntersectionSphere(r)) {
            t.getInverse(this.matrixWorld),
            e.copy(i.ray).applyMatrix4(t);
            var h = new THREE.Vector3
              , c = new THREE.Vector3
              , l = new THREE.Vector3
              , u = new THREE.Vector3
              , E = this.mode === THREE.LineStrip ? 1 : 2;
            if (s instanceof THREE.BufferGeometry) {
                var p = s.attributes;
                if (void 0 !== p.index) {
                    var d = p.index.array
                      , f = p.position.array
                      , m = s.offsets;
                    0 === m.length && (m = [{
                        start: 0,
                        count: d.length,
                        index: 0
                    }]);
                    for (var T = 0; T < m.length; T++)
                        for (var g = m[T].start, v = m[T].count, R = m[T].index, y = g; y < g + v - 1; y += E) {
                            var H = R + d[y]
                              , x = R + d[y + 1];
                            if (h.fromArray(f, 3 * H),
                            c.fromArray(f, 3 * x),
                            !(e.distanceSqToSegment(h, c, u, l) > a))
                                (M = e.origin.distanceTo(u)) < i.near || M > i.far || n.push({
                                    distance: M,
                                    point: l.clone().applyMatrix4(this.matrixWorld),
                                    index: y,
                                    offsetIndex: T,
                                    face: null,
                                    faceIndex: null,
                                    object: this
                                })
                        }
                } else
                    for (f = p.position.array,
                    y = 0; y < f.length / 3 - 1; y += E) {
                        if (h.fromArray(f, 3 * y),
                        c.fromArray(f, 3 * y + 3),
                        !(e.distanceSqToSegment(h, c, u, l) > a))
                            (M = e.origin.distanceTo(u)) < i.near || M > i.far || n.push({
                                distance: M,
                                point: l.clone().applyMatrix4(this.matrixWorld),
                                index: y,
                                face: null,
                                faceIndex: null,
                                object: this
                            })
                    }
            } else if (s instanceof THREE.Geometry) {
                var w = s.vertices
                  , b = w.length;
                for (y = 0; y < b - 1; y += E) {
                    var M;
                    if (!(e.distanceSqToSegment(w[y], w[y + 1], u, l) > a))
                        (M = e.origin.distanceTo(u)) < i.near || M > i.far || n.push({
                            distance: M,
                            point: l.clone().applyMatrix4(this.matrixWorld),
                            index: y,
                            face: null,
                            faceIndex: null,
                            object: this
                        })
                }
            }
        }
    }
}(),
THREE.Line.prototype.clone = function(t) {
    return void 0 === t && (t = new THREE.Line(this.geometry,this.material,this.mode)),
    THREE.Object3D.prototype.clone.call(this, t),
    t
}
,
THREE.Mesh = function(t, e) {
    THREE.Object3D.call(this),
    this.type = "Mesh",
    this.geometry = void 0 !== t ? t : new THREE.Geometry,
    this.material = void 0 !== e ? e : new THREE.MeshBasicMaterial({
        color: 16777215 * Math.random()
    }),
    this.updateMorphTargets()
}
,
THREE.Mesh.prototype = Object.create(THREE.Object3D.prototype),
THREE.Mesh.prototype.constructor = THREE.Mesh,
THREE.Mesh.prototype.updateMorphTargets = function() {
    if (void 0 !== this.geometry.morphTargets && this.geometry.morphTargets.length > 0) {
        this.morphTargetBase = -1,
        this.morphTargetForcedOrder = [],
        this.morphTargetInfluences = [],
        this.morphTargetDictionary = {};
        for (var t = 0, e = this.geometry.morphTargets.length; t < e; t++)
            this.morphTargetInfluences.push(0),
            this.morphTargetDictionary[this.geometry.morphTargets[t].name] = t
    }
}
,
THREE.Mesh.prototype.getMorphTargetIndexByName = function(t) {
    return void 0 !== this.morphTargetDictionary[t] ? this.morphTargetDictionary[t] : (THREE.warn("THREE.Mesh.getMorphTargetIndexByName: morph target " + t + " does not exist. Returning 0."),
    0)
}
,
THREE.Mesh.prototype.raycast = function() {
    var t = new THREE.Matrix4
      , e = new THREE.Ray
      , r = new THREE.Sphere
      , i = new THREE.Vector3
      , n = new THREE.Vector3
      , o = new THREE.Vector3;
    return function(a, s) {
        var h = this.geometry;
        if (null === h.boundingSphere && h.computeBoundingSphere(),
        r.copy(h.boundingSphere),
        r.applyMatrix4(this.matrixWorld),
        !1 !== a.ray.isIntersectionSphere(r) && (t.getInverse(this.matrixWorld),
        e.copy(a.ray).applyMatrix4(t),
        null === h.boundingBox || !1 !== e.isIntersectionBox(h.boundingBox)))
            if (h instanceof THREE.BufferGeometry) {
                if (void 0 === (L = this.material))
                    return;
                var c = h.attributes
                  , l = a.precision;
                if (void 0 !== c.index) {
                    var u = c.index.array
                      , E = c.position.array
                      , p = h.offsets;
                    0 === p.length && (p = [{
                        start: 0,
                        count: u.length,
                        index: 0
                    }]);
                    for (var d = 0, f = p.length; d < f; ++d)
                        for (var m = p[d].start, T = p[d].count, g = p[d].index, v = m, R = m + T; v < R; v += 3) {
                            if (x = g + u[v],
                            w = g + u[v + 1],
                            b = g + u[v + 2],
                            i.fromArray(E, 3 * x),
                            n.fromArray(E, 3 * w),
                            o.fromArray(E, 3 * b),
                            L.side === THREE.BackSide)
                                var y = e.intersectTriangle(o, n, i, !0);
                            else
                                y = e.intersectTriangle(i, n, o, L.side !== THREE.DoubleSide);
                            if (null !== y)
                                y.applyMatrix4(this.matrixWorld),
                                (k = a.ray.origin.distanceTo(y)) < l || k < a.near || k > a.far || s.push({
                                    distance: k,
                                    point: y,
                                    face: new THREE.Face3(x,w,b,THREE.Triangle.normal(i, n, o)),
                                    faceIndex: null,
                                    object: this
                                })
                        }
                } else {
                    v = 0;
                    var H = 0;
                    for (R = (E = c.position.array).length; v < R; v += 3,
                    H += 9) {
                        if (x = v,
                        w = v + 1,
                        b = v + 2,
                        i.fromArray(E, H),
                        n.fromArray(E, H + 3),
                        o.fromArray(E, H + 6),
                        L.side === THREE.BackSide)
                            y = e.intersectTriangle(o, n, i, !0);
                        else
                            y = e.intersectTriangle(i, n, o, L.side !== THREE.DoubleSide);
                        if (null !== y)
                            y.applyMatrix4(this.matrixWorld),
                            (k = a.ray.origin.distanceTo(y)) < l || k < a.near || k > a.far || s.push({
                                distance: k,
                                point: y,
                                face: new THREE.Face3(x,w,b,THREE.Triangle.normal(i, n, o)),
                                faceIndex: null,
                                object: this
                            })
                    }
                }
            } else if (h instanceof THREE.Geometry)
                for (var x, w, b, M = this.material instanceof THREE.MeshFaceMaterial, _ = !0 === M ? this.material.materials : null, S = (l = a.precision,
                h.vertices), C = 0, A = h.faces.length; C < A; C++) {
                    var L, P = h.faces[C];
                    if (void 0 !== (L = !0 === M ? _[P.materialIndex] : this.material)) {
                        if (x = S[P.a],
                        w = S[P.b],
                        b = S[P.c],
                        !0 === L.morphTargets) {
                            var F = h.morphTargets
                              , B = this.morphTargetInfluences;
                            i.set(0, 0, 0),
                            n.set(0, 0, 0),
                            o.set(0, 0, 0);
                            for (var U = 0, V = F.length; U < V; U++) {
                                var D = B[U];
                                if (0 !== D) {
                                    var z = F[U].vertices;
                                    i.x += (z[P.a].x - x.x) * D,
                                    i.y += (z[P.a].y - x.y) * D,
                                    i.z += (z[P.a].z - x.z) * D,
                                    n.x += (z[P.b].x - w.x) * D,
                                    n.y += (z[P.b].y - w.y) * D,
                                    n.z += (z[P.b].z - w.z) * D,
                                    o.x += (z[P.c].x - b.x) * D,
                                    o.y += (z[P.c].y - b.y) * D,
                                    o.z += (z[P.c].z - b.z) * D
                                }
                            }
                            i.add(x),
                            n.add(w),
                            o.add(b),
                            x = i,
                            w = n,
                            b = o
                        }
                        if (L.side === THREE.BackSide)
                            y = e.intersectTriangle(b, w, x, !0);
                        else
                            y = e.intersectTriangle(x, w, b, L.side !== THREE.DoubleSide);
                        var k;
                        if (null !== y)
                            y.applyMatrix4(this.matrixWorld),
                            (k = a.ray.origin.distanceTo(y)) < l || k < a.near || k > a.far || s.push({
                                distance: k,
                                point: y,
                                face: P,
                                faceIndex: C,
                                object: this
                            })
                    }
                }
    }
}(),
THREE.Mesh.prototype.clone = function(t, e) {
    return void 0 === t && (t = new THREE.Mesh(this.geometry,this.material)),
    THREE.Object3D.prototype.clone.call(this, t, e),
    t
}
,
THREE.Bone = function(t) {
    THREE.Object3D.call(this),
    this.type = "Bone",
    this.skin = t
}
,
THREE.Bone.prototype = Object.create(THREE.Object3D.prototype),
THREE.Bone.prototype.constructor = THREE.Bone,
THREE.Skeleton = function(t, e, r) {
    var i;
    (this.useVertexTexture = void 0 === r || r,
    this.identityMatrix = new THREE.Matrix4,
    t = t || [],
    this.bones = t.slice(0),
    this.useVertexTexture) ? (i = this.bones.length > 256 ? 64 : this.bones.length > 64 ? 32 : this.bones.length > 16 ? 16 : 8,
    this.boneTextureWidth = i,
    this.boneTextureHeight = i,
    this.boneMatrices = new Float32Array(this.boneTextureWidth * this.boneTextureHeight * 4),
    this.boneTexture = new THREE.DataTexture(this.boneMatrices,this.boneTextureWidth,this.boneTextureHeight,THREE.RGBAFormat,THREE.FloatType),
    this.boneTexture.minFilter = THREE.NearestFilter,
    this.boneTexture.magFilter = THREE.NearestFilter,
    this.boneTexture.generateMipmaps = !1,
    this.boneTexture.flipY = !1) : this.boneMatrices = new Float32Array(16 * this.bones.length);
    if (void 0 === e)
        this.calculateInverses();
    else if (this.bones.length === e.length)
        this.boneInverses = e.slice(0);
    else {
        THREE.warn("THREE.Skeleton bonInverses is the wrong length."),
        this.boneInverses = [];
        for (var n = 0, o = this.bones.length; n < o; n++)
            this.boneInverses.push(new THREE.Matrix4)
    }
}
,
THREE.Skeleton.prototype.calculateInverses = function() {
    this.boneInverses = [];
    for (var t = 0, e = this.bones.length; t < e; t++) {
        var r = new THREE.Matrix4;
        this.bones[t] && r.getInverse(this.bones[t].matrixWorld),
        this.boneInverses.push(r)
    }
}
,
THREE.Skeleton.prototype.pose = function() {
    for (var t, e = 0, r = this.bones.length; e < r; e++)
        (t = this.bones[e]) && t.matrixWorld.getInverse(this.boneInverses[e]);
    for (e = 0,
    r = this.bones.length; e < r; e++)
        (t = this.bones[e]) && (t.parent ? (t.matrix.getInverse(t.parent.matrixWorld),
        t.matrix.multiply(t.matrixWorld)) : t.matrix.copy(t.matrixWorld),
        t.matrix.decompose(t.position, t.quaternion, t.scale))
}
,
THREE.Skeleton.prototype.update = function() {
    var t = new THREE.Matrix4;
    return function() {
        for (var e = 0, r = this.bones.length; e < r; e++) {
            var i = this.bones[e] ? this.bones[e].matrixWorld : this.identityMatrix;
            t.multiplyMatrices(i, this.boneInverses[e]),
            t.flattenToArrayOffset(this.boneMatrices, 16 * e)
        }
        this.useVertexTexture && (this.boneTexture.needsUpdate = !0)
    }
}(),
THREE.SkinnedMesh = function(t, e, r) {
    THREE.Mesh.call(this, t, e),
    this.type = "SkinnedMesh",
    this.bindMode = "attached",
    this.bindMatrix = new THREE.Matrix4,
    this.bindMatrixInverse = new THREE.Matrix4;
    var i = [];
    if (this.geometry && void 0 !== this.geometry.bones) {
        for (var n, o, a, s, h, c = 0, l = this.geometry.bones.length; c < l; ++c)
            a = (o = this.geometry.bones[c]).pos,
            s = o.rotq,
            h = o.scl,
            n = new THREE.Bone(this),
            i.push(n),
            n.name = o.name,
            n.position.set(a[0], a[1], a[2]),
            n.quaternion.set(s[0], s[1], s[2], s[3]),
            void 0 !== h ? n.scale.set(h[0], h[1], h[2]) : n.scale.set(1, 1, 1);
        for (c = 0,
        l = this.geometry.bones.length; c < l; ++c)
            -1 !== (o = this.geometry.bones[c]).parent ? i[o.parent].add(i[c]) : this.add(i[c])
    }
    this.normalizeSkinWeights(),
    this.updateMatrixWorld(!0),
    this.bind(new THREE.Skeleton(i,void 0,r))
}
,
THREE.SkinnedMesh.prototype = Object.create(THREE.Mesh.prototype),
THREE.SkinnedMesh.prototype.constructor = THREE.SkinnedMesh,
THREE.SkinnedMesh.prototype.bind = function(t, e) {
    this.skeleton = t,
    void 0 === e && (this.updateMatrixWorld(!0),
    e = this.matrixWorld),
    this.bindMatrix.copy(e),
    this.bindMatrixInverse.getInverse(e)
}
,
THREE.SkinnedMesh.prototype.pose = function() {
    this.skeleton.pose()
}
,
THREE.SkinnedMesh.prototype.normalizeSkinWeights = function() {
    if (this.geometry instanceof THREE.Geometry)
        for (var t = 0; t < this.geometry.skinIndices.length; t++) {
            var e = this.geometry.skinWeights[t]
              , r = 1 / e.lengthManhattan();
            r !== 1 / 0 ? e.multiplyScalar(r) : e.set(1)
        }
}
,
THREE.SkinnedMesh.prototype.updateMatrixWorld = function(t) {
    THREE.Mesh.prototype.updateMatrixWorld.call(this, !0),
    "attached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.matrixWorld) : "detached" === this.bindMode ? this.bindMatrixInverse.getInverse(this.bindMatrix) : THREE.warn("THREE.SkinnedMesh unreckognized bindMode: " + this.bindMode)
}
,
THREE.SkinnedMesh.prototype.clone = function(t) {
    return void 0 === t && (t = new THREE.SkinnedMesh(this.geometry,this.material,this.useVertexTexture)),
    THREE.Mesh.prototype.clone.call(this, t),
    t
}
,
THREE.MorphAnimMesh = function(t, e) {
    THREE.Mesh.call(this, t, e),
    this.type = "MorphAnimMesh",
    this.duration = 1e3,
    this.mirroredLoop = !1,
    this.time = 0,
    this.lastKeyframe = 0,
    this.currentKeyframe = 0,
    this.direction = 1,
    this.directionBackwards = !1,
    this.setFrameRange(0, this.geometry.morphTargets.length - 1)
}
,
THREE.MorphAnimMesh.prototype = Object.create(THREE.Mesh.prototype),
THREE.MorphAnimMesh.prototype.constructor = THREE.MorphAnimMesh,
THREE.MorphAnimMesh.prototype.setFrameRange = function(t, e) {
    this.startKeyframe = t,
    this.endKeyframe = e,
    this.length = this.endKeyframe - this.startKeyframe + 1
}
,
THREE.MorphAnimMesh.prototype.setDirectionForward = function() {
    this.direction = 1,
    this.directionBackwards = !1
}
,
THREE.MorphAnimMesh.prototype.setDirectionBackward = function() {
    this.direction = -1,
    this.directionBackwards = !0
}
,
THREE.MorphAnimMesh.prototype.parseAnimations = function() {
    var t = this.geometry;
    t.animations || (t.animations = {});
    for (var e, r = t.animations, i = /([a-z]+)_?(\d+)/, n = 0, o = t.morphTargets.length; n < o; n++) {
        var a = t.morphTargets[n].name.match(i);
        if (a && a.length > 1) {
            var s = a[1];
            r[s] || (r[s] = {
                start: 1 / 0,
                end: -1 / 0
            });
            var h = r[s];
            n < h.start && (h.start = n),
            n > h.end && (h.end = n),
            e || (e = s)
        }
    }
    t.firstAnimation = e
}
,
THREE.MorphAnimMesh.prototype.setAnimationLabel = function(t, e, r) {
    this.geometry.animations || (this.geometry.animations = {}),
    this.geometry.animations[t] = {
        start: e,
        end: r
    }
}
,
THREE.MorphAnimMesh.prototype.playAnimation = function(t, e) {
    var r = this.geometry.animations[t];
    r ? (this.setFrameRange(r.start, r.end),
    this.duration = (r.end - r.start) / e * 1e3,
    this.time = 0) : THREE.warn("THREE.MorphAnimMesh: animation[" + t + "] undefined in .playAnimation()")
}
,
THREE.MorphAnimMesh.prototype.updateAnimation = function(t) {
    var e = this.duration / this.length;
    this.time += this.direction * t,
    this.mirroredLoop ? (this.time > this.duration || this.time < 0) && (this.direction *= -1,
    this.time > this.duration && (this.time = this.duration,
    this.directionBackwards = !0),
    this.time < 0 && (this.time = 0,
    this.directionBackwards = !1)) : (this.time = this.time % this.duration,
    this.time < 0 && (this.time += this.duration));
    var r = this.startKeyframe + THREE.Math.clamp(Math.floor(this.time / e), 0, this.length - 1);
    r !== this.currentKeyframe && (this.morphTargetInfluences[this.lastKeyframe] = 0,
    this.morphTargetInfluences[this.currentKeyframe] = 1,
    this.morphTargetInfluences[r] = 0,
    this.lastKeyframe = this.currentKeyframe,
    this.currentKeyframe = r);
    var i = this.time % e / e;
    this.directionBackwards && (i = 1 - i),
    this.morphTargetInfluences[this.currentKeyframe] = i,
    this.morphTargetInfluences[this.lastKeyframe] = 1 - i
}
,
THREE.MorphAnimMesh.prototype.interpolateTargets = function(t, e, r) {
    for (var i = this.morphTargetInfluences, n = 0, o = i.length; n < o; n++)
        i[n] = 0;
    t > -1 && (i[t] = 1 - r),
    e > -1 && (i[e] = r)
}
,
THREE.MorphAnimMesh.prototype.clone = function(t) {
    return void 0 === t && (t = new THREE.MorphAnimMesh(this.geometry,this.material)),
    t.duration = this.duration,
    t.mirroredLoop = this.mirroredLoop,
    t.time = this.time,
    t.lastKeyframe = this.lastKeyframe,
    t.currentKeyframe = this.currentKeyframe,
    t.direction = this.direction,
    t.directionBackwards = this.directionBackwards,
    THREE.Mesh.prototype.clone.call(this, t),
    t
}
,
THREE.LOD = function() {
    THREE.Object3D.call(this),
    this.objects = []
}
,
THREE.LOD.prototype = Object.create(THREE.Object3D.prototype),
THREE.LOD.prototype.constructor = THREE.LOD,
THREE.LOD.prototype.addLevel = function(t, e) {
    void 0 === e && (e = 0),
    e = Math.abs(e);
    for (var r = 0; r < this.objects.length && !(e < this.objects[r].distance); r++)
        ;
    this.objects.splice(r, 0, {
        distance: e,
        object: t
    }),
    this.add(t)
}
,
THREE.LOD.prototype.getObjectForDistance = function(t) {
    for (var e = 1, r = this.objects.length; e < r && !(t < this.objects[e].distance); e++)
        ;
    return this.objects[e - 1].object
}
,
THREE.LOD.prototype.raycast = function() {
    var t = new THREE.Vector3;
    return function(e, r) {
        t.setFromMatrixPosition(this.matrixWorld);
        var i = e.ray.origin.distanceTo(t);
        this.getObjectForDistance(i).raycast(e, r)
    }
}(),
THREE.LOD.prototype.update = function() {
    var t = new THREE.Vector3
      , e = new THREE.Vector3;
    return function(r) {
        if (this.objects.length > 1) {
            t.setFromMatrixPosition(r.matrixWorld),
            e.setFromMatrixPosition(this.matrixWorld);
            var i = t.distanceTo(e);
            this.objects[0].object.visible = !0;
            for (var n = 1, o = this.objects.length; n < o && i >= this.objects[n].distance; n++)
                this.objects[n - 1].object.visible = !1,
                this.objects[n].object.visible = !0;
            for (; n < o; n++)
                this.objects[n].object.visible = !1
        }
    }
}(),
THREE.LOD.prototype.clone = function(t) {
    void 0 === t && (t = new THREE.LOD),
    THREE.Object3D.prototype.clone.call(this, t);
    for (var e = 0, r = this.objects.length; e < r; e++) {
        var i = this.objects[e].object.clone();
        i.visible = 0 === e,
        t.addLevel(i, this.objects[e].distance)
    }
    return t
}
,
THREE.Sprite = function() {
    var t = new Uint16Array([0, 1, 2, 0, 2, 3])
      , e = new Float32Array([-.5, -.5, 0, .5, -.5, 0, .5, .5, 0, -.5, .5, 0])
      , r = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1])
      , i = new THREE.BufferGeometry;
    return i.addAttribute("index", new THREE.BufferAttribute(t,1)),
    i.addAttribute("position", new THREE.BufferAttribute(e,3)),
    i.addAttribute("uv", new THREE.BufferAttribute(r,2)),
    function(t) {
        THREE.Object3D.call(this),
        this.type = "Sprite",
        this.geometry = i,
        this.material = void 0 !== t ? t : new THREE.SpriteMaterial
    }
}(),
THREE.Sprite.prototype = Object.create(THREE.Object3D.prototype),
THREE.Sprite.prototype.constructor = THREE.Sprite,
THREE.Sprite.prototype.raycast = function() {
    var t = new THREE.Vector3;
    return function(e, r) {
        t.setFromMatrixPosition(this.matrixWorld);
        var i = e.ray.distanceToPoint(t);
        i > this.scale.x || r.push({
            distance: i,
            point: this.position,
            face: null,
            object: this
        })
    }
}(),
THREE.Sprite.prototype.clone = function(t) {
    return void 0 === t && (t = new THREE.Sprite(this.material)),
    THREE.Object3D.prototype.clone.call(this, t),
    t
}
,
THREE.Particle = THREE.Sprite,
THREE.LensFlare = function(t, e, r, i, n) {
    THREE.Object3D.call(this),
    this.lensFlares = [],
    this.positionScreen = new THREE.Vector3,
    this.customUpdateCallback = void 0,
    void 0 !== t && this.add(t, e, r, i, n)
}
,
THREE.LensFlare.prototype = Object.create(THREE.Object3D.prototype),
THREE.LensFlare.prototype.constructor = THREE.LensFlare,
THREE.LensFlare.prototype.add = function(t, e, r, i, n, o) {
    void 0 === e && (e = -1),
    void 0 === r && (r = 0),
    void 0 === o && (o = 1),
    void 0 === n && (n = new THREE.Color(16777215)),
    void 0 === i && (i = THREE.NormalBlending),
    r = Math.min(r, Math.max(0, r)),
    this.lensFlares.push({
        texture: t,
        size: e,
        distance: r,
        x: 0,
        y: 0,
        z: 0,
        scale: 1,
        rotation: 1,
        opacity: o,
        color: n,
        blending: i
    })
}
,
THREE.LensFlare.prototype.updateLensFlares = function() {
    var t, e, r = this.lensFlares.length, i = 2 * -this.positionScreen.x, n = 2 * -this.positionScreen.y;
    for (t = 0; t < r; t++)
        (e = this.lensFlares[t]).x = this.positionScreen.x + i * e.distance,
        e.y = this.positionScreen.y + n * e.distance,
        e.wantedRotation = e.x * Math.PI * .25,
        e.rotation += .25 * (e.wantedRotation - e.rotation)
}
,
THREE.Scene = function() {
    THREE.Object3D.call(this),
    this.type = "Scene",
    this.fog = null,
    this.overrideMaterial = null,
    this.autoUpdate = !0
}
,
THREE.Scene.prototype = Object.create(THREE.Object3D.prototype),
THREE.Scene.prototype.constructor = THREE.Scene,
THREE.Scene.prototype.clone = function(t) {
    return void 0 === t && (t = new THREE.Scene),
    THREE.Object3D.prototype.clone.call(this, t),
    null !== this.fog && (t.fog = this.fog.clone()),
    null !== this.overrideMaterial && (t.overrideMaterial = this.overrideMaterial.clone()),
    t.autoUpdate = this.autoUpdate,
    t.matrixAutoUpdate = this.matrixAutoUpdate,
    t
}
,
THREE.Fog = function(t, e, r) {
    this.name = "",
    this.color = new THREE.Color(t),
    this.near = void 0 !== e ? e : 1,
    this.far = void 0 !== r ? r : 1e3
}
,
THREE.Fog.prototype.clone = function() {
    return new THREE.Fog(this.color.getHex(),this.near,this.far)
}
,
THREE.FogExp2 = function(t, e) {
    this.name = "",
    this.color = new THREE.Color(t),
    this.density = void 0 !== e ? e : 25e-5
}
,
THREE.FogExp2.prototype.clone = function() {
    return new THREE.FogExp2(this.color.getHex(),this.density)
}
,
THREE.ShaderChunk = {},
THREE.ShaderChunk.common = "#define PI 3.14159\n#define PI2 6.28318\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n\nfloat square( in float a ) { return a*a; }\nvec2  square( in vec2 a )  { return vec2( a.x*a.x, a.y*a.y ); }\nvec3  square( in vec3 a )  { return vec3( a.x*a.x, a.y*a.y, a.z*a.z ); }\nvec4  square( in vec4 a )  { return vec4( a.x*a.x, a.y*a.y, a.z*a.z, a.w*a.w ); }\nfloat saturate( in float a ) { return clamp( a, 0.0, 1.0 ); }\nvec2  saturate( in vec2 a )  { return clamp( a, 0.0, 1.0 ); }\nvec3  saturate( in vec3 a )  { return clamp( a, 0.0, 1.0 ); }\nvec4  saturate( in vec4 a )  { return clamp( a, 0.0, 1.0 ); }\nfloat average( in float a ) { return a; }\nfloat average( in vec2 a )  { return ( a.x + a.y) * 0.5; }\nfloat average( in vec3 a )  { return ( a.x + a.y + a.z) / 3.0; }\nfloat average( in vec4 a )  { return ( a.x + a.y + a.z + a.w) * 0.25; }\nfloat whiteCompliment( in float a ) { return saturate( 1.0 - a ); }\nvec2  whiteCompliment( in vec2 a )  { return saturate( vec2(1.0) - a ); }\nvec3  whiteCompliment( in vec3 a )  { return saturate( vec3(1.0) - a ); }\nvec4  whiteCompliment( in vec4 a )  { return saturate( vec4(1.0) - a ); }\nvec3 transformDirection( in vec3 normal, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( normal, 0.0 ) ).xyz );\n}\n// http://en.wikibooks.org/wiki/GLSL_Programming/Applying_Matrix_Transformations\nvec3 inverseTransformDirection( in vec3 normal, in mat4 matrix ) {\n\treturn normalize( ( vec4( normal, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal) {\n\tfloat distance = dot( planeNormal, point-pointOnPlane );\n\treturn point - distance * planeNormal;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn pointOnLine + lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) );\n}\nfloat calcLightAttenuation( float lightDistance, float cutoffDistance, float decayExponent ) {\n\tif ( decayExponent > 0.0 ) {\n\t  return pow( saturate( 1.0 - lightDistance / cutoffDistance ), decayExponent );\n\t}\n\treturn 1.0;\n}\n\nvec3 inputToLinear( in vec3 a ) {\n#ifdef GAMMA_INPUT\n\treturn pow( a, vec3( float( GAMMA_FACTOR ) ) );\n#else\n\treturn a;\n#endif\n}\nvec3 linearToOutput( in vec3 a ) {\n#ifdef GAMMA_OUTPUT\n\treturn pow( a, vec3( 1.0 / float( GAMMA_FACTOR ) ) );\n#else\n\treturn a;\n#endif\n}\n",
THREE.ShaderChunk.alphatest_fragment = "#ifdef ALPHATEST\n\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n\n#endif\n",
THREE.ShaderChunk.lights_lambert_vertex = "vLightFront = vec3( 0.0 );\n\n#ifdef DOUBLE_SIDED\n\n\tvLightBack = vec3( 0.0 );\n\n#endif\n\ntransformedNormal = normalize( transformedNormal );\n\n#if MAX_DIR_LIGHTS > 0\n\nfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n\tvec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\n\tfloat dotProduct = dot( transformedNormal, dirVector );\n\tvec3 directionalLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tvec3 directionalLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n\t\t#ifdef WRAP_AROUND\n\n\t\t\tvec3 directionalLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n\t\t#endif\n\n\t#endif\n\n\t#ifdef WRAP_AROUND\n\n\t\tvec3 directionalLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n\t\tdirectionalLightWeighting = mix( directionalLightWeighting, directionalLightWeightingHalf, wrapRGB );\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tdirectionalLightWeightingBack = mix( directionalLightWeightingBack, directionalLightWeightingHalfBack, wrapRGB );\n\n\t\t#endif\n\n\t#endif\n\n\tvLightFront += directionalLightColor[ i ] * directionalLightWeighting;\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tvLightBack += directionalLightColor[ i ] * directionalLightWeightingBack;\n\n\t#endif\n\n}\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n\tfor( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n\t\tvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n\t\tvec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n\t\tfloat attenuation = calcLightAttenuation( length( lVector ), pointLightDistance[ i ], pointLightDecay[ i ] );\n\n\t\tlVector = normalize( lVector );\n\t\tfloat dotProduct = dot( transformedNormal, lVector );\n\n\t\tvec3 pointLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvec3 pointLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n\t\t\t#ifdef WRAP_AROUND\n\n\t\t\t\tvec3 pointLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n\t\t\t#endif\n\n\t\t#endif\n\n\t\t#ifdef WRAP_AROUND\n\n\t\t\tvec3 pointLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n\t\t\tpointLightWeighting = mix( pointLightWeighting, pointLightWeightingHalf, wrapRGB );\n\n\t\t\t#ifdef DOUBLE_SIDED\n\n\t\t\t\tpointLightWeightingBack = mix( pointLightWeightingBack, pointLightWeightingHalfBack, wrapRGB );\n\n\t\t\t#endif\n\n\t\t#endif\n\n\t\tvLightFront += pointLightColor[ i ] * pointLightWeighting * attenuation;\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += pointLightColor[ i ] * pointLightWeightingBack * attenuation;\n\n\t\t#endif\n\n\t}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n\tfor( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n\t\tvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n\t\tvec3 lVector = lPosition.xyz - mvPosition.xyz;\n\n\t\tfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - worldPosition.xyz ) );\n\n\t\tif ( spotEffect > spotLightAngleCos[ i ] ) {\n\n\t\t\tspotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n\t\t\tfloat attenuation = calcLightAttenuation( length( lVector ), spotLightDistance[ i ], spotLightDecay[ i ] );\n\n\t\t\tlVector = normalize( lVector );\n\n\t\t\tfloat dotProduct = dot( transformedNormal, lVector );\n\t\t\tvec3 spotLightWeighting = vec3( max( dotProduct, 0.0 ) );\n\n\t\t\t#ifdef DOUBLE_SIDED\n\n\t\t\t\tvec3 spotLightWeightingBack = vec3( max( -dotProduct, 0.0 ) );\n\n\t\t\t\t#ifdef WRAP_AROUND\n\n\t\t\t\t\tvec3 spotLightWeightingHalfBack = vec3( max( -0.5 * dotProduct + 0.5, 0.0 ) );\n\n\t\t\t\t#endif\n\n\t\t\t#endif\n\n\t\t\t#ifdef WRAP_AROUND\n\n\t\t\t\tvec3 spotLightWeightingHalf = vec3( max( 0.5 * dotProduct + 0.5, 0.0 ) );\n\t\t\t\tspotLightWeighting = mix( spotLightWeighting, spotLightWeightingHalf, wrapRGB );\n\n\t\t\t\t#ifdef DOUBLE_SIDED\n\n\t\t\t\t\tspotLightWeightingBack = mix( spotLightWeightingBack, spotLightWeightingHalfBack, wrapRGB );\n\n\t\t\t\t#endif\n\n\t\t\t#endif\n\n\t\t\tvLightFront += spotLightColor[ i ] * spotLightWeighting * attenuation * spotEffect;\n\n\t\t\t#ifdef DOUBLE_SIDED\n\n\t\t\t\tvLightBack += spotLightColor[ i ] * spotLightWeightingBack * attenuation * spotEffect;\n\n\t\t\t#endif\n\n\t\t}\n\n\t}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n\tfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n\t\tvec3 lVector = transformDirection( hemisphereLightDirection[ i ], viewMatrix );\n\n\t\tfloat dotProduct = dot( transformedNormal, lVector );\n\n\t\tfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\t\tfloat hemiDiffuseWeightBack = -0.5 * dotProduct + 0.5;\n\n\t\tvLightFront += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n\t\t#ifdef DOUBLE_SIDED\n\n\t\t\tvLightBack += mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeightBack );\n\n\t\t#endif\n\n\t}\n\n#endif\n\nvLightFront += ambientLightColor;\n\n#ifdef DOUBLE_SIDED\n\n\tvLightBack += ambientLightColor;\n\n#endif\n",
THREE.ShaderChunk.map_particle_pars_fragment = "#ifdef USE_MAP\n\n\tuniform vec4 offsetRepeat;\n\tuniform sampler2D map;\n\n#endif\n",
THREE.ShaderChunk.default_vertex = "#ifdef USE_SKINNING\n\n\tvec4 mvPosition = modelViewMatrix * skinned;\n\n#elif defined( USE_MORPHTARGETS )\n\n\tvec4 mvPosition = modelViewMatrix * vec4( morphed, 1.0 );\n\n#else\n\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\n#endif\n\ngl_Position = projectionMatrix * mvPosition;\n",
THREE.ShaderChunk.map_pars_fragment = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n\tvarying vec2 vUv;\n\n#endif\n\n#ifdef USE_MAP\n\n\tuniform sampler2D map;\n\n#endif",
THREE.ShaderChunk.skinnormal_vertex = "#ifdef USE_SKINNING\n\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\n\t#ifdef USE_MORPHNORMALS\n\n\tvec4 skinnedNormal = skinMatrix * vec4( morphedNormal, 0.0 );\n\n\t#else\n\n\tvec4 skinnedNormal = skinMatrix * vec4( normal, 0.0 );\n\n\t#endif\n\n#endif\n",
THREE.ShaderChunk.logdepthbuf_pars_vertex = "#ifdef USE_LOGDEPTHBUF\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tvarying float vFragDepth;\n\n\t#endif\n\n\tuniform float logDepthBufFC;\n\n#endif",
THREE.ShaderChunk.lightmap_pars_vertex = "#ifdef USE_LIGHTMAP\n\n\tvarying vec2 vUv2;\n\n#endif",
THREE.ShaderChunk.lights_phong_fragment = "#ifndef FLAT_SHADED\n\n\tvec3 normal = normalize( vNormal );\n\n\t#ifdef DOUBLE_SIDED\n\n\t\tnormal = normal * ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\n\t#endif\n\n#else\n\n\tvec3 fdx = dFdx( vViewPosition );\n\tvec3 fdy = dFdy( vViewPosition );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n\n#endif\n\nvec3 viewPosition = normalize( vViewPosition );\n\n#ifdef USE_NORMALMAP\n\n\tnormal = perturbNormal2Arb( -vViewPosition, normal );\n\n#elif defined( USE_BUMPMAP )\n\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n\n#endif\n\nvec3 totalDiffuseLight = vec3( 0.0 );\nvec3 totalSpecularLight = vec3( 0.0 );\n\n#if MAX_POINT_LIGHTS > 0\n\n\tfor ( int i = 0; i < MAX_POINT_LIGHTS; i ++ ) {\n\n\t\tvec4 lPosition = viewMatrix * vec4( pointLightPosition[ i ], 1.0 );\n\t\tvec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n\t\tfloat attenuation = calcLightAttenuation( length( lVector ), pointLightDistance[ i ], pointLightDecay[ i ] );\n\n\t\tlVector = normalize( lVector );\n\n\t\t// diffuse\n\n\t\tfloat dotProduct = dot( normal, lVector );\n\n\t\t#ifdef WRAP_AROUND\n\n\t\t\tfloat pointDiffuseWeightFull = max( dotProduct, 0.0 );\n\t\t\tfloat pointDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n\t\t\tvec3 pointDiffuseWeight = mix( vec3( pointDiffuseWeightFull ), vec3( pointDiffuseWeightHalf ), wrapRGB );\n\n\t\t#else\n\n\t\t\tfloat pointDiffuseWeight = max( dotProduct, 0.0 );\n\n\t\t#endif\n\n\t\ttotalDiffuseLight += pointLightColor[ i ] * pointDiffuseWeight * attenuation;\n\n\t\t\t\t// specular\n\n\t\tvec3 pointHalfVector = normalize( lVector + viewPosition );\n\t\tfloat pointDotNormalHalf = max( dot( normal, pointHalfVector ), 0.0 );\n\t\tfloat pointSpecularWeight = specularStrength * max( pow( pointDotNormalHalf, shininess ), 0.0 );\n\n\t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, pointHalfVector ), 0.0 ), 5.0 );\n\t\ttotalSpecularLight += schlick * pointLightColor[ i ] * pointSpecularWeight * pointDiffuseWeight * attenuation * specularNormalization;\n\n\t}\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n\tfor ( int i = 0; i < MAX_SPOT_LIGHTS; i ++ ) {\n\n\t\tvec4 lPosition = viewMatrix * vec4( spotLightPosition[ i ], 1.0 );\n\t\tvec3 lVector = lPosition.xyz + vViewPosition.xyz;\n\n\t\tfloat attenuation = calcLightAttenuation( length( lVector ), spotLightDistance[ i ], spotLightDecay[ i ] );\n\n\t\tlVector = normalize( lVector );\n\n\t\tfloat spotEffect = dot( spotLightDirection[ i ], normalize( spotLightPosition[ i ] - vWorldPosition ) );\n\n\t\tif ( spotEffect > spotLightAngleCos[ i ] ) {\n\n\t\t\tspotEffect = max( pow( max( spotEffect, 0.0 ), spotLightExponent[ i ] ), 0.0 );\n\n\t\t\t// diffuse\n\n\t\t\tfloat dotProduct = dot( normal, lVector );\n\n\t\t\t#ifdef WRAP_AROUND\n\n\t\t\t\tfloat spotDiffuseWeightFull = max( dotProduct, 0.0 );\n\t\t\t\tfloat spotDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n\t\t\t\tvec3 spotDiffuseWeight = mix( vec3( spotDiffuseWeightFull ), vec3( spotDiffuseWeightHalf ), wrapRGB );\n\n\t\t\t#else\n\n\t\t\t\tfloat spotDiffuseWeight = max( dotProduct, 0.0 );\n\n\t\t\t#endif\n\n\t\t\ttotalDiffuseLight += spotLightColor[ i ] * spotDiffuseWeight * attenuation * spotEffect;\n\n\t\t\t// specular\n\n\t\t\tvec3 spotHalfVector = normalize( lVector + viewPosition );\n\t\t\tfloat spotDotNormalHalf = max( dot( normal, spotHalfVector ), 0.0 );\n\t\t\tfloat spotSpecularWeight = specularStrength * max( pow( spotDotNormalHalf, shininess ), 0.0 );\n\n\t\t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, spotHalfVector ), 0.0 ), 5.0 );\n\t\t\ttotalSpecularLight += schlick * spotLightColor[ i ] * spotSpecularWeight * spotDiffuseWeight * attenuation * specularNormalization * spotEffect;\n\n\t\t}\n\n\t}\n\n#endif\n\n#if MAX_DIR_LIGHTS > 0\n\n\tfor( int i = 0; i < MAX_DIR_LIGHTS; i ++ ) {\n\n\t\tvec3 dirVector = transformDirection( directionalLightDirection[ i ], viewMatrix );\n\n\t\t// diffuse\n\n\t\tfloat dotProduct = dot( normal, dirVector );\n\n\t\t#ifdef WRAP_AROUND\n\n\t\t\tfloat dirDiffuseWeightFull = max( dotProduct, 0.0 );\n\t\t\tfloat dirDiffuseWeightHalf = max( 0.5 * dotProduct + 0.5, 0.0 );\n\n\t\t\tvec3 dirDiffuseWeight = mix( vec3( dirDiffuseWeightFull ), vec3( dirDiffuseWeightHalf ), wrapRGB );\n\n\t\t#else\n\n\t\t\tfloat dirDiffuseWeight = max( dotProduct, 0.0 );\n\n\t\t#endif\n\n\t\ttotalDiffuseLight += directionalLightColor[ i ] * dirDiffuseWeight;\n\n\t\t// specular\n\n\t\tvec3 dirHalfVector = normalize( dirVector + viewPosition );\n\t\tfloat dirDotNormalHalf = max( dot( normal, dirHalfVector ), 0.0 );\n\t\tfloat dirSpecularWeight = specularStrength * max( pow( dirDotNormalHalf, shininess ), 0.0 );\n\n\t\t/*\n\t\t// fresnel term from skin shader\n\t\tconst float F0 = 0.128;\n\n\t\tfloat base = 1.0 - dot( viewPosition, dirHalfVector );\n\t\tfloat exponential = pow( base, 5.0 );\n\n\t\tfloat fresnel = exponential + F0 * ( 1.0 - exponential );\n\t\t*/\n\n\t\t/*\n\t\t// fresnel term from fresnel shader\n\t\tconst float mFresnelBias = 0.08;\n\t\tconst float mFresnelScale = 0.3;\n\t\tconst float mFresnelPower = 5.0;\n\n\t\tfloat fresnel = mFresnelBias + mFresnelScale * pow( 1.0 + dot( normalize( -viewPosition ), normal ), mFresnelPower );\n\t\t*/\n\n\t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t\t// \t\tdirSpecular += specular * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization * fresnel;\n\n\t\tvec3 schlick = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( dirVector, dirHalfVector ), 0.0 ), 5.0 );\n\t\ttotalSpecularLight += schlick * directionalLightColor[ i ] * dirSpecularWeight * dirDiffuseWeight * specularNormalization;\n\n\n\t}\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n\tfor( int i = 0; i < MAX_HEMI_LIGHTS; i ++ ) {\n\n\t\tvec3 lVector = transformDirection( hemisphereLightDirection[ i ], viewMatrix );\n\n\t\t// diffuse\n\n\t\tfloat dotProduct = dot( normal, lVector );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotProduct + 0.5;\n\n\t\tvec3 hemiColor = mix( hemisphereLightGroundColor[ i ], hemisphereLightSkyColor[ i ], hemiDiffuseWeight );\n\n\t\ttotalDiffuseLight += hemiColor;\n\n\t\t// specular (sky light)\n\n\t\tvec3 hemiHalfVectorSky = normalize( lVector + viewPosition );\n\t\tfloat hemiDotNormalHalfSky = 0.5 * dot( normal, hemiHalfVectorSky ) + 0.5;\n\t\tfloat hemiSpecularWeightSky = specularStrength * max( pow( max( hemiDotNormalHalfSky, 0.0 ), shininess ), 0.0 );\n\n\t\t// specular (ground light)\n\n\t\tvec3 lVectorGround = -lVector;\n\n\t\tvec3 hemiHalfVectorGround = normalize( lVectorGround + viewPosition );\n\t\tfloat hemiDotNormalHalfGround = 0.5 * dot( normal, hemiHalfVectorGround ) + 0.5;\n\t\tfloat hemiSpecularWeightGround = specularStrength * max( pow( max( hemiDotNormalHalfGround, 0.0 ), shininess ), 0.0 );\n\n\t\tfloat dotProductGround = dot( normal, lVectorGround );\n\n\t\tfloat specularNormalization = ( shininess + 2.0 ) / 8.0;\n\n\t\tvec3 schlickSky = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVector, hemiHalfVectorSky ), 0.0 ), 5.0 );\n\t\tvec3 schlickGround = specular + vec3( 1.0 - specular ) * pow( max( 1.0 - dot( lVectorGround, hemiHalfVectorGround ), 0.0 ), 5.0 );\n\t\ttotalSpecularLight += hemiColor * specularNormalization * ( schlickSky * hemiSpecularWeightSky * max( dotProduct, 0.0 ) + schlickGround * hemiSpecularWeightGround * max( dotProductGround, 0.0 ) );\n\n\t}\n\n#endif\n\n#ifdef METAL\n\n\toutgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) * specular + totalSpecularLight + emissive;\n\n#else\n\n\toutgoingLight += diffuseColor.rgb * ( totalDiffuseLight + ambientLightColor ) + totalSpecularLight + emissive;\n\n#endif\n",
THREE.ShaderChunk.fog_pars_fragment = "#ifdef USE_FOG\n\n\tuniform vec3 fogColor;\n\n\t#ifdef FOG_EXP2\n\n\t\tuniform float fogDensity;\n\n\t#else\n\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n\n#endif",
THREE.ShaderChunk.morphnormal_vertex = "#ifdef USE_MORPHNORMALS\n\n\tvec3 morphedNormal = vec3( 0.0 );\n\n\tmorphedNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tmorphedNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tmorphedNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tmorphedNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n\n\tmorphedNormal += normal;\n\n#endif",
THREE.ShaderChunk.envmap_pars_fragment = "#ifdef USE_ENVMAP\n\n\tuniform float reflectivity;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\tuniform float flipEnvMap;\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n\t\tuniform float refractionRatio;\n\n\t#else\n\n\t\tvarying vec3 vReflect;\n\n\t#endif\n\n#endif\n",
THREE.ShaderChunk.logdepthbuf_fragment = "#if defined(USE_LOGDEPTHBUF) && defined(USE_LOGDEPTHBUF_EXT)\n\n\tgl_FragDepthEXT = log2(vFragDepth) * logDepthBufFC * 0.5;\n\n#endif",
THREE.ShaderChunk.normalmap_pars_fragment = "#ifdef USE_NORMALMAP\n\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n\n\t// Per-Pixel Tangent Space Normal Mapping\n\t// http://hacksoflife.blogspot.ch/2009/11/per-pixel-tangent-space-normal-mapping.html\n\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm ) {\n\n\t\tvec3 q0 = dFdx( eye_pos.xyz );\n\t\tvec3 q1 = dFdy( eye_pos.xyz );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\n\t\tvec3 S = normalize( q0 * st1.t - q1 * st0.t );\n\t\tvec3 T = normalize( -q0 * st1.s + q1 * st0.s );\n\t\tvec3 N = normalize( surf_norm );\n\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\n\t}\n\n#endif\n",
THREE.ShaderChunk.lights_phong_pars_vertex = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n\tvarying vec3 vWorldPosition;\n\n#endif\n",
THREE.ShaderChunk.lightmap_pars_fragment = "#ifdef USE_LIGHTMAP\n\n\tvarying vec2 vUv2;\n\tuniform sampler2D lightMap;\n\n#endif",
THREE.ShaderChunk.shadowmap_vertex = "#ifdef USE_SHADOWMAP\n\n\tfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n\t\tvShadowCoord[ i ] = shadowMatrix[ i ] * worldPosition;\n\n\t}\n\n#endif",
THREE.ShaderChunk.lights_phong_vertex = "#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n\tvWorldPosition = worldPosition.xyz;\n\n#endif",
THREE.ShaderChunk.map_fragment = "#ifdef USE_MAP\n\n\tvec4 texelColor = texture2D( map, vUv );\n\n\ttexelColor.xyz = inputToLinear( texelColor.xyz );\n\n\tdiffuseColor *= texelColor;\n\n#endif",
THREE.ShaderChunk.lightmap_vertex = "#ifdef USE_LIGHTMAP\n\n\tvUv2 = uv2;\n\n#endif",
THREE.ShaderChunk.map_particle_fragment = "#ifdef USE_MAP\n\n\tdiffuseColor *= texture2D( map, vec2( gl_PointCoord.x, 1.0 - gl_PointCoord.y ) * offsetRepeat.zw + offsetRepeat.xy );\n\n#endif\n",
THREE.ShaderChunk.color_pars_fragment = "#ifdef USE_COLOR\n\n\tvarying vec3 vColor;\n\n#endif\n",
THREE.ShaderChunk.color_vertex = "#ifdef USE_COLOR\n\n\tvColor.xyz = inputToLinear( color.xyz );\n\n#endif",
THREE.ShaderChunk.skinning_vertex = "#ifdef USE_SKINNING\n\n\t#ifdef USE_MORPHTARGETS\n\n\tvec4 skinVertex = bindMatrix * vec4( morphed, 1.0 );\n\n\t#else\n\n\tvec4 skinVertex = bindMatrix * vec4( position, 1.0 );\n\n\t#endif\n\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\tskinned  = bindMatrixInverse * skinned;\n\n#endif\n",
THREE.ShaderChunk.envmap_pars_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n\tvarying vec3 vReflect;\n\n\tuniform float refractionRatio;\n\n#endif\n",
THREE.ShaderChunk.linear_to_gamma_fragment = "\n\toutgoingLight = linearToOutput( outgoingLight );\n",
THREE.ShaderChunk.color_pars_vertex = "#ifdef USE_COLOR\n\n\tvarying vec3 vColor;\n\n#endif",
THREE.ShaderChunk.lights_lambert_pars_vertex = "uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n\tuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n\tuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n\tuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n\tuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\tuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n\tuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n\tuniform float pointLightDecay[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n\tuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightDecay[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#ifdef WRAP_AROUND\n\n\tuniform vec3 wrapRGB;\n\n#endif\n",
THREE.ShaderChunk.map_pars_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n\tvarying vec2 vUv;\n\tuniform vec4 offsetRepeat;\n\n#endif\n",
THREE.ShaderChunk.envmap_fragment = "#ifdef USE_ENVMAP\n\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\n\t\tvec3 cameraToVertex = normalize( vWorldPosition - cameraPosition );\n\n\t\t// Transforming Normal Vectors with the Inverse Transformation\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\t\tvec3 reflectVec = reflect( cameraToVertex, worldNormal );\n\n\t\t#else\n\n\t\t\tvec3 reflectVec = refract( cameraToVertex, worldNormal, refractionRatio );\n\n\t\t#endif\n\n\t#else\n\n\t\tvec3 reflectVec = vReflect;\n\n\t#endif\n\n\t#ifdef DOUBLE_SIDED\n\t\tfloat flipNormal = ( -1.0 + 2.0 * float( gl_FrontFacing ) );\n\t#else\n\t\tfloat flipNormal = 1.0;\n\t#endif\n\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, flipNormal * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\tsampleUV.y = saturate( flipNormal * reflectVec.y * 0.5 + 0.5 );\n\t\tsampleUV.x = atan( flipNormal * reflectVec.z, flipNormal * reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\tvec3 reflectView = flipNormal * normalize((viewMatrix * vec4( reflectVec, 0.0 )).xyz + vec3(0.0,0.0,1.0));\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#endif\n\n\tenvColor.xyz = inputToLinear( envColor.xyz );\n\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\n\t#endif\n\n#endif\n",
THREE.ShaderChunk.specularmap_pars_fragment = "#ifdef USE_SPECULARMAP\n\n\tuniform sampler2D specularMap;\n\n#endif",
THREE.ShaderChunk.logdepthbuf_vertex = "#ifdef USE_LOGDEPTHBUF\n\n\tgl_Position.z = log2(max( EPSILON, gl_Position.w + 1.0 )) * logDepthBufFC;\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\n#else\n\n\t\tgl_Position.z = (gl_Position.z - 1.0) * gl_Position.w;\n\n\t#endif\n\n#endif",
THREE.ShaderChunk.morphtarget_pars_vertex = "#ifdef USE_MORPHTARGETS\n\n\t#ifndef USE_MORPHNORMALS\n\n\tuniform float morphTargetInfluences[ 8 ];\n\n\t#else\n\n\tuniform float morphTargetInfluences[ 4 ];\n\n\t#endif\n\n#endif",
THREE.ShaderChunk.specularmap_fragment = "float specularStrength;\n\n#ifdef USE_SPECULARMAP\n\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n\n#else\n\n\tspecularStrength = 1.0;\n\n#endif",
THREE.ShaderChunk.fog_fragment = "#ifdef USE_FOG\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\tfloat depth = gl_FragDepthEXT / gl_FragCoord.w;\n\n\t#else\n\n\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;\n\n\t#endif\n\n\t#ifdef FOG_EXP2\n\n\t\tfloat fogFactor = exp2( - square( fogDensity ) * square( depth ) * LOG2 );\n\t\tfogFactor = whiteCompliment( fogFactor );\n\n\t#else\n\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, depth );\n\n\t#endif\n\t\n\toutgoingLight = mix( outgoingLight, fogColor, fogFactor );\n\n#endif",
THREE.ShaderChunk.bumpmap_pars_fragment = "#ifdef USE_BUMPMAP\n\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\n\t// Derivative maps - bump mapping unparametrized surfaces by Morten Mikkelsen\n\t// http://mmikkelsen3d.blogspot.sk/2011/07/derivative-maps.html\n\n\t// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)\n\n\tvec2 dHdxy_fwd() {\n\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\n\t\treturn vec2( dBx, dBy );\n\n\t}\n\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\n\t\tvec3 vSigmaX = dFdx( surf_pos );\n\t\tvec3 vSigmaY = dFdy( surf_pos );\n\t\tvec3 vN = surf_norm;\t\t// normalized\n\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\n\t}\n\n#endif\n",
THREE.ShaderChunk.defaultnormal_vertex = "#ifdef USE_SKINNING\n\n\tvec3 objectNormal = skinnedNormal.xyz;\n\n#elif defined( USE_MORPHNORMALS )\n\n\tvec3 objectNormal = morphedNormal;\n\n#else\n\n\tvec3 objectNormal = normal;\n\n#endif\n\n#ifdef FLIP_SIDED\n\n\tobjectNormal = -objectNormal;\n\n#endif\n\nvec3 transformedNormal = normalMatrix * objectNormal;\n",
THREE.ShaderChunk.lights_phong_pars_fragment = "uniform vec3 ambientLightColor;\n\n#if MAX_DIR_LIGHTS > 0\n\n\tuniform vec3 directionalLightColor[ MAX_DIR_LIGHTS ];\n\tuniform vec3 directionalLightDirection[ MAX_DIR_LIGHTS ];\n\n#endif\n\n#if MAX_HEMI_LIGHTS > 0\n\n\tuniform vec3 hemisphereLightSkyColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightGroundColor[ MAX_HEMI_LIGHTS ];\n\tuniform vec3 hemisphereLightDirection[ MAX_HEMI_LIGHTS ];\n\n#endif\n\n#if MAX_POINT_LIGHTS > 0\n\n\tuniform vec3 pointLightColor[ MAX_POINT_LIGHTS ];\n\n\tuniform vec3 pointLightPosition[ MAX_POINT_LIGHTS ];\n\tuniform float pointLightDistance[ MAX_POINT_LIGHTS ];\n\tuniform float pointLightDecay[ MAX_POINT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0\n\n\tuniform vec3 spotLightColor[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightPosition[ MAX_SPOT_LIGHTS ];\n\tuniform vec3 spotLightDirection[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightAngleCos[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightExponent[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightDistance[ MAX_SPOT_LIGHTS ];\n\tuniform float spotLightDecay[ MAX_SPOT_LIGHTS ];\n\n#endif\n\n#if MAX_SPOT_LIGHTS > 0 || defined( USE_BUMPMAP ) || defined( USE_ENVMAP )\n\n\tvarying vec3 vWorldPosition;\n\n#endif\n\n#ifdef WRAP_AROUND\n\n\tuniform vec3 wrapRGB;\n\n#endif\n\nvarying vec3 vViewPosition;\n\n#ifndef FLAT_SHADED\n\n\tvarying vec3 vNormal;\n\n#endif\n",
THREE.ShaderChunk.skinbase_vertex = "#ifdef USE_SKINNING\n\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n\n#endif",
THREE.ShaderChunk.map_vertex = "#if defined( USE_MAP ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( USE_SPECULARMAP ) || defined( USE_ALPHAMAP )\n\n\tvUv = uv * offsetRepeat.zw + offsetRepeat.xy;\n\n#endif",
THREE.ShaderChunk.lightmap_fragment = "#ifdef USE_LIGHTMAP\n\n\toutgoingLight *= diffuseColor.xyz * texture2D( lightMap, vUv2 ).xyz;\n\n#endif",
THREE.ShaderChunk.shadowmap_pars_vertex = "#ifdef USE_SHADOWMAP\n\n\tvarying vec4 vShadowCoord[ MAX_SHADOWS ];\n\tuniform mat4 shadowMatrix[ MAX_SHADOWS ];\n\n#endif",
THREE.ShaderChunk.color_fragment = "#ifdef USE_COLOR\n\n\tdiffuseColor.rgb *= vColor;\n\n#endif",
THREE.ShaderChunk.morphtarget_vertex = "#ifdef USE_MORPHTARGETS\n\n\tvec3 morphed = vec3( 0.0 );\n\tmorphed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\tmorphed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\tmorphed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\tmorphed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\n\t#ifndef USE_MORPHNORMALS\n\n\tmorphed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\tmorphed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\tmorphed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\tmorphed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\n\t#endif\n\n\tmorphed += position;\n\n#endif",
THREE.ShaderChunk.envmap_vertex = "#if defined( USE_ENVMAP ) && ! defined( USE_BUMPMAP ) && ! defined( USE_NORMALMAP ) && ! defined( PHONG )\n\n\tvec3 worldNormal = transformDirection( objectNormal, modelMatrix );\n\n\tvec3 cameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\n\t#ifdef ENVMAP_MODE_REFLECTION\n\n\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\n\t#else\n\n\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\n\t#endif\n\n#endif\n",
THREE.ShaderChunk.shadowmap_fragment = "#ifdef USE_SHADOWMAP\n\n\t#ifdef SHADOWMAP_DEBUG\n\n\t\tvec3 frustumColors[3];\n\t\tfrustumColors[0] = vec3( 1.0, 0.5, 0.0 );\n\t\tfrustumColors[1] = vec3( 0.0, 1.0, 0.8 );\n\t\tfrustumColors[2] = vec3( 0.0, 0.5, 1.0 );\n\n\t#endif\n\n\t#ifdef SHADOWMAP_CASCADE\n\n\t\tint inFrustumCount = 0;\n\n\t#endif\n\n\tfloat fDepth;\n\tvec3 shadowColor = vec3( 1.0 );\n\n\tfor( int i = 0; i < MAX_SHADOWS; i ++ ) {\n\n\t\tvec3 shadowCoord = vShadowCoord[ i ].xyz / vShadowCoord[ i ].w;\n\n\t\t\t\t// if ( something && something ) breaks ATI OpenGL shader compiler\n\t\t\t\t// if ( all( something, something ) ) using this instead\n\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\n\t\t\t\t// don't shadow pixels outside of light frustum\n\t\t\t\t// use just first frustum (for cascades)\n\t\t\t\t// don't shadow pixels behind far plane of light frustum\n\n\t\t#ifdef SHADOWMAP_CASCADE\n\n\t\t\tinFrustumCount += int( inFrustum );\n\t\t\tbvec3 frustumTestVec = bvec3( inFrustum, inFrustumCount == 1, shadowCoord.z <= 1.0 );\n\n\t\t#else\n\n\t\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\n\t\t#endif\n\n\t\tbool frustumTest = all( frustumTestVec );\n\n\t\tif ( frustumTest ) {\n\n\t\t\tshadowCoord.z += shadowBias[ i ];\n\n\t\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\n\t\t\t\t\t\t// Percentage-close filtering\n\t\t\t\t\t\t// (9 pixel kernel)\n\t\t\t\t\t\t// http://fabiensanglard.net/shadowmappingPCF/\n\n\t\t\t\tfloat shadow = 0.0;\n\n\t\t/*\n\t\t\t\t\t\t// nested loops breaks shader compiler / validator on some ATI cards when using OpenGL\n\t\t\t\t\t\t// must enroll loop manually\n\n\t\t\t\tfor ( float y = -1.25; y <= 1.25; y += 1.25 )\n\t\t\t\t\tfor ( float x = -1.25; x <= 1.25; x += 1.25 ) {\n\n\t\t\t\t\t\tvec4 rgbaDepth = texture2D( shadowMap[ i ], vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy );\n\n\t\t\t\t\t\t\t\t// doesn't seem to produce any noticeable visual difference compared to simple texture2D lookup\n\t\t\t\t\t\t\t\t//vec4 rgbaDepth = texture2DProj( shadowMap[ i ], vec4( vShadowCoord[ i ].w * ( vec2( x * xPixelOffset, y * yPixelOffset ) + shadowCoord.xy ), 0.05, vShadowCoord[ i ].w ) );\n\n\t\t\t\t\t\tfloat fDepth = unpackDepth( rgbaDepth );\n\n\t\t\t\t\t\tif ( fDepth < shadowCoord.z )\n\t\t\t\t\t\t\tshadow += 1.0;\n\n\t\t\t\t}\n\n\t\t\t\tshadow /= 9.0;\n\n\t\t*/\n\n\t\t\t\tconst float shadowDelta = 1.0 / 9.0;\n\n\t\t\t\tfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n\t\t\t\tfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n\t\t\t\tfloat dx0 = -1.25 * xPixelOffset;\n\t\t\t\tfloat dy0 = -1.25 * yPixelOffset;\n\t\t\t\tfloat dx1 = 1.25 * xPixelOffset;\n\t\t\t\tfloat dy1 = 1.25 * yPixelOffset;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tfDepth = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\t\t\t\tif ( fDepth < shadowCoord.z ) shadow += shadowDelta;\n\n\t\t\t\tshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n\t\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\n\t\t\t\t\t\t// Percentage-close filtering\n\t\t\t\t\t\t// (9 pixel kernel)\n\t\t\t\t\t\t// http://fabiensanglard.net/shadowmappingPCF/\n\n\t\t\t\tfloat shadow = 0.0;\n\n\t\t\t\tfloat xPixelOffset = 1.0 / shadowMapSize[ i ].x;\n\t\t\t\tfloat yPixelOffset = 1.0 / shadowMapSize[ i ].y;\n\n\t\t\t\tfloat dx0 = -1.0 * xPixelOffset;\n\t\t\t\tfloat dy0 = -1.0 * yPixelOffset;\n\t\t\t\tfloat dx1 = 1.0 * xPixelOffset;\n\t\t\t\tfloat dy1 = 1.0 * yPixelOffset;\n\n\t\t\t\tmat3 shadowKernel;\n\t\t\t\tmat3 depthKernel;\n\n\t\t\t\tdepthKernel[0][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy0 ) ) );\n\t\t\t\tdepthKernel[0][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, 0.0 ) ) );\n\t\t\t\tdepthKernel[0][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx0, dy1 ) ) );\n\t\t\t\tdepthKernel[1][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy0 ) ) );\n\t\t\t\tdepthKernel[1][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy ) );\n\t\t\t\tdepthKernel[1][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( 0.0, dy1 ) ) );\n\t\t\t\tdepthKernel[2][0] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy0 ) ) );\n\t\t\t\tdepthKernel[2][1] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, 0.0 ) ) );\n\t\t\t\tdepthKernel[2][2] = unpackDepth( texture2D( shadowMap[ i ], shadowCoord.xy + vec2( dx1, dy1 ) ) );\n\n\t\t\t\tvec3 shadowZ = vec3( shadowCoord.z );\n\t\t\t\tshadowKernel[0] = vec3(lessThan(depthKernel[0], shadowZ ));\n\t\t\t\tshadowKernel[0] *= vec3(0.25);\n\n\t\t\t\tshadowKernel[1] = vec3(lessThan(depthKernel[1], shadowZ ));\n\t\t\t\tshadowKernel[1] *= vec3(0.25);\n\n\t\t\t\tshadowKernel[2] = vec3(lessThan(depthKernel[2], shadowZ ));\n\t\t\t\tshadowKernel[2] *= vec3(0.25);\n\n\t\t\t\tvec2 fractionalCoord = 1.0 - fract( shadowCoord.xy * shadowMapSize[i].xy );\n\n\t\t\t\tshadowKernel[0] = mix( shadowKernel[1], shadowKernel[0], fractionalCoord.x );\n\t\t\t\tshadowKernel[1] = mix( shadowKernel[2], shadowKernel[1], fractionalCoord.x );\n\n\t\t\t\tvec4 shadowValues;\n\t\t\t\tshadowValues.x = mix( shadowKernel[0][1], shadowKernel[0][0], fractionalCoord.y );\n\t\t\t\tshadowValues.y = mix( shadowKernel[0][2], shadowKernel[0][1], fractionalCoord.y );\n\t\t\t\tshadowValues.z = mix( shadowKernel[1][1], shadowKernel[1][0], fractionalCoord.y );\n\t\t\t\tshadowValues.w = mix( shadowKernel[1][2], shadowKernel[1][1], fractionalCoord.y );\n\n\t\t\t\tshadow = dot( shadowValues, vec4( 1.0 ) );\n\n\t\t\t\tshadowColor = shadowColor * vec3( ( 1.0 - shadowDarkness[ i ] * shadow ) );\n\n\t\t\t#else\n\n\t\t\t\tvec4 rgbaDepth = texture2D( shadowMap[ i ], shadowCoord.xy );\n\t\t\t\tfloat fDepth = unpackDepth( rgbaDepth );\n\n\t\t\t\tif ( fDepth < shadowCoord.z )\n\n\t\t// spot with multiple shadows is darker\n\n\t\t\t\t\tshadowColor = shadowColor * vec3( 1.0 - shadowDarkness[ i ] );\n\n\t\t// spot with multiple shadows has the same color as single shadow spot\n\n\t\t// \t\t\t\t\tshadowColor = min( shadowColor, vec3( shadowDarkness[ i ] ) );\n\n\t\t\t#endif\n\n\t\t}\n\n\n\t\t#ifdef SHADOWMAP_DEBUG\n\n\t\t\t#ifdef SHADOWMAP_CASCADE\n\n\t\t\t\tif ( inFrustum && inFrustumCount == 1 ) outgoingLight *= frustumColors[ i ];\n\n\t\t\t#else\n\n\t\t\t\tif ( inFrustum ) outgoingLight *= frustumColors[ i ];\n\n\t\t\t#endif\n\n\t\t#endif\n\n\t}\n\n\t// NOTE: I am unsure if this is correct in linear space.  -bhouston, Dec 29, 2014\n\tshadowColor = inputToLinear( shadowColor );\n\n\toutgoingLight = outgoingLight * shadowColor;\n\n#endif\n",
THREE.ShaderChunk.worldpos_vertex = "#if defined( USE_ENVMAP ) || defined( PHONG ) || defined( LAMBERT ) || defined ( USE_SHADOWMAP )\n\n\t#ifdef USE_SKINNING\n\n\t\tvec4 worldPosition = modelMatrix * skinned;\n\n\t#elif defined( USE_MORPHTARGETS )\n\n\t\tvec4 worldPosition = modelMatrix * vec4( morphed, 1.0 );\n\n\t#else\n\n\t\tvec4 worldPosition = modelMatrix * vec4( position, 1.0 );\n\n\t#endif\n\n#endif\n",
THREE.ShaderChunk.shadowmap_pars_fragment = "#ifdef USE_SHADOWMAP\n\n\tuniform sampler2D shadowMap[ MAX_SHADOWS ];\n\tuniform vec2 shadowMapSize[ MAX_SHADOWS ];\n\n\tuniform float shadowDarkness[ MAX_SHADOWS ];\n\tuniform float shadowBias[ MAX_SHADOWS ];\n\n\tvarying vec4 vShadowCoord[ MAX_SHADOWS ];\n\n\tfloat unpackDepth( const in vec4 rgba_depth ) {\n\n\t\tconst vec4 bit_shift = vec4( 1.0 / ( 256.0 * 256.0 * 256.0 ), 1.0 / ( 256.0 * 256.0 ), 1.0 / 256.0, 1.0 );\n\t\tfloat depth = dot( rgba_depth, bit_shift );\n\t\treturn depth;\n\n\t}\n\n#endif",
THREE.ShaderChunk.skinning_pars_vertex = "#ifdef USE_SKINNING\n\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\n\t#ifdef BONE_TEXTURE\n\n\t\tuniform sampler2D boneTexture;\n\t\tuniform int boneTextureWidth;\n\t\tuniform int boneTextureHeight;\n\n\t\tmat4 getBoneMatrix( const in float i ) {\n\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureWidth ) );\n\t\t\tfloat y = floor( j / float( boneTextureWidth ) );\n\n\t\t\tfloat dx = 1.0 / float( boneTextureWidth );\n\t\t\tfloat dy = 1.0 / float( boneTextureHeight );\n\n\t\t\ty = dy * ( y + 0.5 );\n\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\n\t\t\treturn bone;\n\n\t\t}\n\n\t#else\n\n\t\tuniform mat4 boneGlobalMatrices[ MAX_BONES ];\n\n\t\tmat4 getBoneMatrix( const in float i ) {\n\n\t\t\tmat4 bone = boneGlobalMatrices[ int(i) ];\n\t\t\treturn bone;\n\n\t\t}\n\n\t#endif\n\n#endif\n",
THREE.ShaderChunk.logdepthbuf_pars_fragment = "#ifdef USE_LOGDEPTHBUF\n\n\tuniform float logDepthBufFC;\n\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\n\t\t#extension GL_EXT_frag_depth : enable\n\t\tvarying float vFragDepth;\n\n\t#endif\n\n#endif",
THREE.ShaderChunk.alphamap_fragment = "#ifdef USE_ALPHAMAP\n\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n\n#endif\n",
THREE.ShaderChunk.alphamap_pars_fragment = "#ifdef USE_ALPHAMAP\n\n\tuniform sampler2D alphaMap;\n\n#endif\n",
THREE.UniformsUtils = {
    merge: function(t) {
        for (var e = {}, r = 0; r < t.length; r++) {
            var i = this.clone(t[r]);
            for (var n in i)
                e[n] = i[n]
        }
        return e
    },
    clone: function(t) {
        var e = {};
        for (var r in t) {
            e[r] = {};
            for (var i in t[r]) {
                var n = t[r][i];
                n instanceof THREE.Color || n instanceof THREE.Vector2 || n instanceof THREE.Vector3 || n instanceof THREE.Vector4 || n instanceof THREE.Matrix4 || n instanceof THREE.Texture ? e[r][i] = n.clone() : n instanceof Array ? e[r][i] = n.slice() : e[r][i] = n
            }
        }
        return e
    }
},
THREE.UniformsLib = {
    common: {
        diffuse: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: null
        },
        offsetRepeat: {
            type: "v4",
            value: new THREE.Vector4(0,0,1,1)
        },
        lightMap: {
            type: "t",
            value: null
        },
        specularMap: {
            type: "t",
            value: null
        },
        alphaMap: {
            type: "t",
            value: null
        },
        envMap: {
            type: "t",
            value: null
        },
        flipEnvMap: {
            type: "f",
            value: -1
        },
        reflectivity: {
            type: "f",
            value: 1
        },
        refractionRatio: {
            type: "f",
            value: .98
        },
        morphTargetInfluences: {
            type: "f",
            value: 0
        }
    },
    bump: {
        bumpMap: {
            type: "t",
            value: null
        },
        bumpScale: {
            type: "f",
            value: 1
        }
    },
    normalmap: {
        normalMap: {
            type: "t",
            value: null
        },
        normalScale: {
            type: "v2",
            value: new THREE.Vector2(1,1)
        }
    },
    fog: {
        fogDensity: {
            type: "f",
            value: 25e-5
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2e3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    },
    lights: {
        ambientLightColor: {
            type: "fv",
            value: []
        },
        directionalLightDirection: {
            type: "fv",
            value: []
        },
        directionalLightColor: {
            type: "fv",
            value: []
        },
        hemisphereLightDirection: {
            type: "fv",
            value: []
        },
        hemisphereLightSkyColor: {
            type: "fv",
            value: []
        },
        hemisphereLightGroundColor: {
            type: "fv",
            value: []
        },
        pointLightColor: {
            type: "fv",
            value: []
        },
        pointLightPosition: {
            type: "fv",
            value: []
        },
        pointLightDistance: {
            type: "fv1",
            value: []
        },
        pointLightDecay: {
            type: "fv1",
            value: []
        },
        spotLightColor: {
            type: "fv",
            value: []
        },
        spotLightPosition: {
            type: "fv",
            value: []
        },
        spotLightDirection: {
            type: "fv",
            value: []
        },
        spotLightDistance: {
            type: "fv1",
            value: []
        },
        spotLightAngleCos: {
            type: "fv1",
            value: []
        },
        spotLightExponent: {
            type: "fv1",
            value: []
        },
        spotLightDecay: {
            type: "fv1",
            value: []
        }
    },
    particle: {
        psColor: {
            type: "c",
            value: new THREE.Color(15658734)
        },
        opacity: {
            type: "f",
            value: 1
        },
        size: {
            type: "f",
            value: 1
        },
        scale: {
            type: "f",
            value: 1
        },
        map: {
            type: "t",
            value: null
        },
        offsetRepeat: {
            type: "v4",
            value: new THREE.Vector4(0,0,1,1)
        },
        fogDensity: {
            type: "f",
            value: 25e-5
        },
        fogNear: {
            type: "f",
            value: 1
        },
        fogFar: {
            type: "f",
            value: 2e3
        },
        fogColor: {
            type: "c",
            value: new THREE.Color(16777215)
        }
    },
    shadowmap: {
        shadowMap: {
            type: "tv",
            value: []
        },
        shadowMapSize: {
            type: "v2v",
            value: []
        },
        shadowBias: {
            type: "fv1",
            value: []
        },
        shadowDarkness: {
            type: "fv1",
            value: []
        },
        shadowMatrix: {
            type: "m4v",
            value: []
        }
    }
},
THREE.ShaderLib = {
    basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.shadowmap]),
        vertexShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.skinbase_vertex, "\t#ifdef USE_ENVMAP", THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "\t#endif", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.alphamap_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "\tvec3 outgoingLight = vec3( 0.0 );", "\tvec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphamap_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, "\toutgoingLight = diffuseColor.rgb;", THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
    },
    lambert: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1,1,1)
            }
        }]),
        vertexShader: ["#define LAMBERT", "varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", "\tvarying vec3 vLightBack;", "#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_lambert_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_lambert_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;", "uniform vec3 emissive;", "uniform float opacity;", "varying vec3 vLightFront;", "#ifdef DOUBLE_SIDED", "\tvarying vec3 vLightBack;", "#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.alphamap_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "\tvec3 outgoingLight = vec3( 0.0 );", "\tvec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphamap_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, "\t#ifdef DOUBLE_SIDED", "\t\tif ( gl_FrontFacing )", "\t\t\toutgoingLight += diffuseColor.rgb * vLightFront + emissive;", "\t\telse", "\t\t\toutgoingLight += diffuseColor.rgb * vLightBack + emissive;", "\t#else", "\t\toutgoingLight += diffuseColor.rgb * vLightFront + emissive;", "\t#endif", THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
    },
    phong: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.bump, THREE.UniformsLib.normalmap, THREE.UniformsLib.fog, THREE.UniformsLib.lights, THREE.UniformsLib.shadowmap, {
            emissive: {
                type: "c",
                value: new THREE.Color(0)
            },
            specular: {
                type: "c",
                value: new THREE.Color(1118481)
            },
            shininess: {
                type: "f",
                value: 30
            },
            wrapRGB: {
                type: "v3",
                value: new THREE.Vector3(1,1,1)
            }
        }]),
        vertexShader: ["#define PHONG", "varying vec3 vViewPosition;", "#ifndef FLAT_SHADED", "\tvarying vec3 vNormal;", "#endif", THREE.ShaderChunk.common, THREE.ShaderChunk.map_pars_vertex, THREE.ShaderChunk.lightmap_pars_vertex, THREE.ShaderChunk.envmap_pars_vertex, THREE.ShaderChunk.lights_phong_pars_vertex, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.map_vertex, THREE.ShaderChunk.lightmap_vertex, THREE.ShaderChunk.color_vertex, THREE.ShaderChunk.morphnormal_vertex, THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.skinnormal_vertex, THREE.ShaderChunk.defaultnormal_vertex, "#ifndef FLAT_SHADED", "\tvNormal = normalize( transformedNormal );", "#endif", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "\tvViewPosition = -mvPosition.xyz;", THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.envmap_vertex, THREE.ShaderChunk.lights_phong_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["#define PHONG", "uniform vec3 diffuse;", "uniform vec3 emissive;", "uniform vec3 specular;", "uniform float shininess;", "uniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_pars_fragment, THREE.ShaderChunk.alphamap_pars_fragment, THREE.ShaderChunk.lightmap_pars_fragment, THREE.ShaderChunk.envmap_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.lights_phong_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.bumpmap_pars_fragment, THREE.ShaderChunk.normalmap_pars_fragment, THREE.ShaderChunk.specularmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "\tvec3 outgoingLight = vec3( 0.0 );", "\tvec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphamap_fragment, THREE.ShaderChunk.alphatest_fragment, THREE.ShaderChunk.specularmap_fragment, THREE.ShaderChunk.lights_phong_fragment, THREE.ShaderChunk.lightmap_fragment, THREE.ShaderChunk.envmap_fragment, THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.linear_to_gamma_fragment, THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
    },
    particle_basic: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.particle, THREE.UniformsLib.shadowmap]),
        vertexShader: ["uniform float size;", "uniform float scale;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.shadowmap_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "\t#ifdef USE_SIZEATTENUATION", "\t\tgl_PointSize = size * ( scale / length( mvPosition.xyz ) );", "\t#else", "\t\tgl_PointSize = size;", "\t#endif", "\tgl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.logdepthbuf_vertex, THREE.ShaderChunk.worldpos_vertex, THREE.ShaderChunk.shadowmap_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 psColor;", "uniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.map_particle_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.shadowmap_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "\tvec3 outgoingLight = vec3( 0.0 );", "\tvec4 diffuseColor = vec4( psColor, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.map_particle_fragment, THREE.ShaderChunk.color_fragment, THREE.ShaderChunk.alphatest_fragment, "\toutgoingLight = diffuseColor.rgb;", THREE.ShaderChunk.shadowmap_fragment, THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
    },
    dashed: {
        uniforms: THREE.UniformsUtils.merge([THREE.UniformsLib.common, THREE.UniformsLib.fog, {
            scale: {
                type: "f",
                value: 1
            },
            dashSize: {
                type: "f",
                value: 1
            },
            totalSize: {
                type: "f",
                value: 2
            }
        }]),
        vertexShader: ["uniform float scale;", "attribute float lineDistance;", "varying float vLineDistance;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.color_vertex, "\tvLineDistance = scale * lineDistance;", "\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );", "\tgl_Position = projectionMatrix * mvPosition;", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: ["uniform vec3 diffuse;", "uniform float opacity;", "uniform float dashSize;", "uniform float totalSize;", "varying float vLineDistance;", THREE.ShaderChunk.common, THREE.ShaderChunk.color_pars_fragment, THREE.ShaderChunk.fog_pars_fragment, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "\tif ( mod( vLineDistance, totalSize ) > dashSize ) {", "\t\tdiscard;", "\t}", "\tvec3 outgoingLight = vec3( 0.0 );", "\tvec4 diffuseColor = vec4( diffuse, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, THREE.ShaderChunk.color_fragment, "\toutgoingLight = diffuseColor.rgb;", THREE.ShaderChunk.fog_fragment, "\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );", "}"].join("\n")
    },
    depth: {
        uniforms: {
            mNear: {
                type: "f",
                value: 1
            },
            mFar: {
                type: "f",
                value: 2e3
            },
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: ["uniform float mNear;", "uniform float mFar;", "uniform float opacity;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", THREE.ShaderChunk.logdepthbuf_fragment, "\t#ifdef USE_LOGDEPTHBUF_EXT", "\t\tfloat depth = gl_FragDepthEXT / gl_FragCoord.w;", "\t#else", "\t\tfloat depth = gl_FragCoord.z / gl_FragCoord.w;", "\t#endif", "\tfloat color = 1.0 - smoothstep( mNear, mFar, depth );", "\tgl_FragColor = vec4( vec3( color ), opacity );", "}"].join("\n")
    },
    normal: {
        uniforms: {
            opacity: {
                type: "f",
                value: 1
            }
        },
        vertexShader: ["varying vec3 vNormal;", THREE.ShaderChunk.common, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", "\tvNormal = normalize( normalMatrix * normal );", THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: ["uniform float opacity;", "varying vec3 vNormal;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "\tgl_FragColor = vec4( 0.5 * normalize( vNormal ) + 0.5, opacity );", THREE.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
    },
    cube: {
        uniforms: {
            tCube: {
                type: "t",
                value: null
            },
            tFlip: {
                type: "f",
                value: -1
            }
        },
        vertexShader: ["varying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", "\tvWorldPosition = transformDirection( position, modelMatrix );", "\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: ["uniform samplerCube tCube;", "uniform float tFlip;", "varying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "\tgl_FragColor = textureCube( tCube, vec3( tFlip * vWorldPosition.x, vWorldPosition.yz ) );", THREE.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
    },
    equirect: {
        uniforms: {
            tEquirect: {
                type: "t",
                value: null
            },
            tFlip: {
                type: "f",
                value: -1
            }
        },
        vertexShader: ["varying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", "\tvWorldPosition = transformDirection( position, modelMatrix );", "\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );", THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: ["uniform sampler2D tEquirect;", "uniform float tFlip;", "varying vec3 vWorldPosition;", THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "void main() {", "vec3 direction = normalize( vWorldPosition );", "vec2 sampleUV;", "sampleUV.y = saturate( tFlip * direction.y * -0.5 + 0.5 );", "sampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;", "gl_FragColor = texture2D( tEquirect, sampleUV );", THREE.ShaderChunk.logdepthbuf_fragment, "}"].join("\n")
    },
    depthRGBA: {
        uniforms: {},
        vertexShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.morphtarget_pars_vertex, THREE.ShaderChunk.skinning_pars_vertex, THREE.ShaderChunk.logdepthbuf_pars_vertex, "void main() {", THREE.ShaderChunk.skinbase_vertex, THREE.ShaderChunk.morphtarget_vertex, THREE.ShaderChunk.skinning_vertex, THREE.ShaderChunk.default_vertex, THREE.ShaderChunk.logdepthbuf_vertex, "}"].join("\n"),
        fragmentShader: [THREE.ShaderChunk.common, THREE.ShaderChunk.logdepthbuf_pars_fragment, "vec4 pack_depth( const in float depth ) {", "\tconst vec4 bit_shift = vec4( 256.0 * 256.0 * 256.0, 256.0 * 256.0, 256.0, 1.0 );", "\tconst vec4 bit_mask = vec4( 0.0, 1.0 / 256.0, 1.0 / 256.0, 1.0 / 256.0 );", "\tvec4 res = mod( depth * bit_shift * vec4( 255 ), vec4( 256 ) ) / vec4( 255 );", "\tres -= res.xxyz * bit_mask;", "\treturn res;", "}", "void main() {", THREE.ShaderChunk.logdepthbuf_fragment, "\t#ifdef USE_LOGDEPTHBUF_EXT", "\t\tgl_FragData[ 0 ] = pack_depth( gl_FragDepthEXT );", "\t#else", "\t\tgl_FragData[ 0 ] = pack_depth( gl_FragCoord.z );", "\t#endif", "}"].join("\n")
    }
},
THREE.WebGLRenderer = function(t) {
    console.log("THREE.WebGLRenderer", THREE.REVISION);
    var e = void 0 !== (t = t || {}).canvas ? t.canvas : document.createElement("canvas")
      , r = void 0 !== t.context ? t.context : null
      , i = 1
      , n = void 0 !== t.precision ? t.precision : "highp"
      , o = void 0 !== t.alpha && t.alpha
      , a = void 0 === t.depth || t.depth
      , s = void 0 === t.stencil || t.stencil
      , h = void 0 !== t.antialias && t.antialias
      , c = void 0 === t.premultipliedAlpha || t.premultipliedAlpha
      , l = void 0 !== t.preserveDrawingBuffer && t.preserveDrawingBuffer
      , u = void 0 !== t.logarithmicDepthBuffer && t.logarithmicDepthBuffer
      , E = new THREE.Color(0)
      , p = 0
      , d = []
      , f = {}
      , m = []
      , T = []
      , g = []
      , v = []
      , R = [];
    this.domElement = e,
    this.context = null,
    this.autoClear = !0,
    this.autoClearColor = !0,
    this.autoClearDepth = !0,
    this.autoClearStencil = !0,
    this.sortObjects = !0,
    this.gammaFactor = 2,
    this.gammaInput = !1,
    this.gammaOutput = !1,
    this.shadowMapEnabled = !1,
    this.shadowMapType = THREE.PCFShadowMap,
    this.shadowMapCullFace = THREE.CullFaceFront,
    this.shadowMapDebug = !1,
    this.shadowMapCascade = !1,
    this.maxMorphTargets = 8,
    this.maxMorphNormals = 4,
    this.autoScaleCubemaps = !0,
    this.info = {
        memory: {
            programs: 0,
            geometries: 0,
            textures: 0
        },
        render: {
            calls: 0,
            vertices: 0,
            faces: 0,
            points: 0
        }
    };
    var y, H = this, x = [], w = null, b = null, M = -1, _ = "", S = null, C = 0, A = 0, L = 0, P = e.width, F = e.height, B = 0, U = 0, V = new THREE.Frustum, D = new THREE.Matrix4, z = new THREE.Vector3, k = new THREE.Vector3, N = !0, O = {
        ambient: [0, 0, 0],
        directional: {
            length: 0,
            colors: [],
            positions: []
        },
        point: {
            length: 0,
            colors: [],
            positions: [],
            distances: [],
            decays: []
        },
        spot: {
            length: 0,
            colors: [],
            positions: [],
            distances: [],
            directions: [],
            anglesCos: [],
            exponents: [],
            decays: []
        },
        hemi: {
            length: 0,
            skyColors: [],
            groundColors: [],
            positions: []
        }
    };
    try {
        var G = {
            alpha: o,
            depth: a,
            stencil: s,
            antialias: h,
            premultipliedAlpha: c,
            preserveDrawingBuffer: l
        };
        if (null === (y = r || e.getContext("webgl", G) || e.getContext("experimental-webgl", G)))
            throw null !== e.getContext("webgl") ? "Error creating WebGL context with your selected attributes." : "Error creating WebGL context.";
        e.addEventListener("webglcontextlost", function(t) {
            t.preventDefault(),
            Y(),
            X(),
            f = {}
        }, !1)
    } catch (t) {
        THREE.error("THREE.WebGLRenderer: " + t)
    }
    var I = new THREE.WebGLState(y,ne);
    void 0 === y.getShaderPrecisionFormat && (y.getShaderPrecisionFormat = function() {
        return {
            rangeMin: 1,
            rangeMax: 1,
            precision: 1
        }
    }
    );
    var W = new THREE.WebGLExtensions(y);
    W.get("OES_texture_float"),
    W.get("OES_texture_float_linear"),
    W.get("OES_texture_half_float"),
    W.get("OES_texture_half_float_linear"),
    W.get("OES_standard_derivatives"),
    u && W.get("EXT_frag_depth");
    var j = function(t, e, r, i) {
        !0 === c && (t *= i,
        e *= i,
        r *= i),
        y.clearColor(t, e, r, i)
    }
      , X = function() {
        y.clearColor(0, 0, 0, 1),
        y.clearDepth(1),
        y.clearStencil(0),
        y.enable(y.DEPTH_TEST),
        y.depthFunc(y.LEQUAL),
        y.frontFace(y.CCW),
        y.cullFace(y.BACK),
        y.enable(y.CULL_FACE),
        y.enable(y.BLEND),
        y.blendEquation(y.FUNC_ADD),
        y.blendFunc(y.SRC_ALPHA, y.ONE_MINUS_SRC_ALPHA),
        y.viewport(A, L, P, F),
        j(E.r, E.g, E.b, p)
    }
      , Y = function() {
        w = null,
        S = null,
        _ = "",
        M = -1,
        N = !0,
        I.reset()
    };
    X(),
    this.context = y,
    this.state = I;
    var q, Z = y.getParameter(y.MAX_TEXTURE_IMAGE_UNITS), K = y.getParameter(y.MAX_VERTEX_TEXTURE_IMAGE_UNITS), Q = y.getParameter(y.MAX_TEXTURE_SIZE), J = y.getParameter(y.MAX_CUBE_MAP_TEXTURE_SIZE), $ = K > 0, tt = $ && W.get("OES_texture_float"), et = y.getShaderPrecisionFormat(y.VERTEX_SHADER, y.HIGH_FLOAT), rt = y.getShaderPrecisionFormat(y.VERTEX_SHADER, y.MEDIUM_FLOAT), it = y.getShaderPrecisionFormat(y.FRAGMENT_SHADER, y.HIGH_FLOAT), nt = y.getShaderPrecisionFormat(y.FRAGMENT_SHADER, y.MEDIUM_FLOAT), ot = function() {
        if (void 0 !== q)
            return q;
        if (q = [],
        W.get("WEBGL_compressed_texture_pvrtc") || W.get("WEBGL_compressed_texture_s3tc"))
            for (var t = y.getParameter(y.COMPRESSED_TEXTURE_FORMATS), e = 0; e < t.length; e++)
                q.push(t[e]);
        return q
    }, at = et.precision > 0 && it.precision > 0, st = rt.precision > 0 && nt.precision > 0;
    "highp" !== n || at || (st ? (n = "mediump",
    THREE.warn("THREE.WebGLRenderer: highp not supported, using mediump.")) : (n = "lowp",
    THREE.warn("THREE.WebGLRenderer: highp and mediump not supported, using lowp."))),
    "mediump" !== n || st || (n = "lowp",
    THREE.warn("THREE.WebGLRenderer: mediump not supported, using lowp."));
    var ht, ct = new THREE.ShadowMapPlugin(this,d,f,m), lt = new THREE.SpritePlugin(this,v), ut = new THREE.LensFlarePlugin(this,R);
    function Et(t) {
        t.__webglVertexBuffer = y.createBuffer(),
        t.__webglNormalBuffer = y.createBuffer(),
        t.__webglTangentBuffer = y.createBuffer(),
        t.__webglColorBuffer = y.createBuffer(),
        t.__webglUVBuffer = y.createBuffer(),
        t.__webglUV2Buffer = y.createBuffer(),
        t.__webglSkinIndicesBuffer = y.createBuffer(),
        t.__webglSkinWeightsBuffer = y.createBuffer(),
        t.__webglFaceBuffer = y.createBuffer(),
        t.__webglLineBuffer = y.createBuffer();
        var e = t.numMorphTargets;
        if (e) {
            t.__webglMorphTargetsBuffers = [];
            for (var r = 0, i = e; r < i; r++)
                t.__webglMorphTargetsBuffers.push(y.createBuffer())
        }
        var n = t.numMorphNormals;
        if (n) {
            t.__webglMorphNormalsBuffers = [];
            for (r = 0,
            i = n; r < i; r++)
                t.__webglMorphNormalsBuffers.push(y.createBuffer())
        }
        H.info.memory.geometries++
    }
    this.getContext = function() {
        return y
    }
    ,
    this.forceContextLoss = function() {
        W.get("WEBGL_lose_context").loseContext()
    }
    ,
    this.supportsVertexTextures = function() {
        return $
    }
    ,
    this.supportsFloatTextures = function() {
        return W.get("OES_texture_float")
    }
    ,
    this.supportsHalfFloatTextures = function() {
        return W.get("OES_texture_half_float")
    }
    ,
    this.supportsStandardDerivatives = function() {
        return W.get("OES_standard_derivatives")
    }
    ,
    this.supportsCompressedTextureS3TC = function() {
        return W.get("WEBGL_compressed_texture_s3tc")
    }
    ,
    this.supportsCompressedTexturePVRTC = function() {
        return W.get("WEBGL_compressed_texture_pvrtc")
    }
    ,
    this.supportsBlendMinMax = function() {
        return W.get("EXT_blend_minmax")
    }
    ,
    this.getMaxAnisotropy = function() {
        if (void 0 !== ht)
            return ht;
        var t = W.get("EXT_texture_filter_anisotropic");
        return ht = null !== t ? y.getParameter(t.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0
    }
    ,
    this.getPrecision = function() {
        return n
    }
    ,
    this.getPixelRatio = function() {
        return i
    }
    ,
    this.setPixelRatio = function(t) {
        i = t
    }
    ,
    this.setSize = function(t, r, n) {
        e.width = t * i,
        e.height = r * i,
        !1 !== n && (e.style.width = t + "px",
        e.style.height = r + "px"),
        this.setViewport(0, 0, t, r)
    }
    ,
    this.setViewport = function(t, e, r, n) {
        A = t * i,
        L = e * i,
        P = r * i,
        F = n * i,
        y.viewport(A, L, P, F)
    }
    ,
    this.setScissor = function(t, e, r, n) {
        y.scissor(t * i, e * i, r * i, n * i)
    }
    ,
    this.enableScissorTest = function(t) {
        t ? y.enable(y.SCISSOR_TEST) : y.disable(y.SCISSOR_TEST)
    }
    ,
    this.getClearColor = function() {
        return E
    }
    ,
    this.setClearColor = function(t, e) {
        E.set(t),
        p = void 0 !== e ? e : 1,
        j(E.r, E.g, E.b, p)
    }
    ,
    this.getClearAlpha = function() {
        return p
    }
    ,
    this.setClearAlpha = function(t) {
        p = t,
        j(E.r, E.g, E.b, p)
    }
    ,
    this.clear = function(t, e, r) {
        var i = 0;
        (void 0 === t || t) && (i |= y.COLOR_BUFFER_BIT),
        (void 0 === e || e) && (i |= y.DEPTH_BUFFER_BIT),
        (void 0 === r || r) && (i |= y.STENCIL_BUFFER_BIT),
        y.clear(i)
    }
    ,
    this.clearColor = function() {
        y.clear(y.COLOR_BUFFER_BIT)
    }
    ,
    this.clearDepth = function() {
        y.clear(y.DEPTH_BUFFER_BIT)
    }
    ,
    this.clearStencil = function() {
        y.clear(y.STENCIL_BUFFER_BIT)
    }
    ,
    this.clearTarget = function(t, e, r, i) {
        this.setRenderTarget(t),
        this.clear(e, r, i)
    }
    ,
    this.resetGLState = Y;
    var pt = function(t) {
        t.target.traverse(function(t) {
            t.removeEventListener("remove", pt),
            function(t) {
                t instanceof THREE.Mesh || t instanceof THREE.PointCloud || t instanceof THREE.Line ? delete f[t.id] : (t instanceof THREE.ImmediateRenderObject || t.immediateRenderCallback) && function(t, e) {
                    for (var r = t.length - 1; r >= 0; r--)
                        t[r].object === e && t.splice(r, 1)
                }(m, t);
                delete t.__webglInit,
                delete t._modelViewMatrix,
                delete t._normalMatrix,
                delete t.__webglActive
            }(t)
        })
    }
      , dt = function(t) {
        var e = t.target;
        e.removeEventListener("dispose", dt),
        vt(e)
    }
      , ft = function(t) {
        var e = t.target;
        e.removeEventListener("dispose", ft),
        Rt(e),
        H.info.memory.textures--
    }
      , mt = function(t) {
        var e = t.target;
        e.removeEventListener("dispose", mt),
        yt(e),
        H.info.memory.textures--
    }
      , Tt = function(t) {
        var e = t.target;
        e.removeEventListener("dispose", Tt),
        Ht(e)
    }
      , gt = function(t) {
        for (var e = ["__webglVertexBuffer", "__webglNormalBuffer", "__webglTangentBuffer", "__webglColorBuffer", "__webglUVBuffer", "__webglUV2Buffer", "__webglSkinIndicesBuffer", "__webglSkinWeightsBuffer", "__webglFaceBuffer", "__webglLineBuffer", "__webglLineDistanceBuffer"], r = 0, i = e.length; r < i; r++) {
            void 0 !== t[n = e[r]] && (y.deleteBuffer(t[n]),
            delete t[n])
        }
        if (void 0 !== t.__webglCustomAttributesList) {
            for (var n in t.__webglCustomAttributesList)
                y.deleteBuffer(t.__webglCustomAttributesList[n].buffer);
            delete t.__webglCustomAttributesList
        }
        H.info.memory.geometries--
    }
      , vt = function(t) {
        if (delete t.__webglInit,
        t instanceof THREE.BufferGeometry) {
            for (var e in t.attributes) {
                var r = t.attributes[e];
                void 0 !== r.buffer && (y.deleteBuffer(r.buffer),
                delete r.buffer)
            }
            H.info.memory.geometries--
        } else {
            var i = Ut[t.id];
            if (void 0 !== i) {
                for (var n = 0, o = i.length; n < o; n++) {
                    var a = i[n];
                    if (void 0 !== a.numMorphTargets) {
                        for (var s = 0, h = a.numMorphTargets; s < h; s++)
                            y.deleteBuffer(a.__webglMorphTargetsBuffers[s]);
                        delete a.__webglMorphTargetsBuffers
                    }
                    if (void 0 !== a.numMorphNormals) {
                        for (s = 0,
                        h = a.numMorphNormals; s < h; s++)
                            y.deleteBuffer(a.__webglMorphNormalsBuffers[s]);
                        delete a.__webglMorphNormalsBuffers
                    }
                    gt(a)
                }
                delete Ut[t.id]
            } else
                gt(t)
        }
        _ = ""
    }
      , Rt = function(t) {
        if (t.image && t.image.__webglTextureCube)
            y.deleteTexture(t.image.__webglTextureCube),
            delete t.image.__webglTextureCube;
        else {
            if (void 0 === t.__webglInit)
                return;
            y.deleteTexture(t.__webglTexture),
            delete t.__webglTexture,
            delete t.__webglInit
        }
    }
      , yt = function(t) {
        if (t && void 0 !== t.__webglTexture) {
            if (y.deleteTexture(t.__webglTexture),
            delete t.__webglTexture,
            t instanceof THREE.WebGLRenderTargetCube)
                for (var e = 0; e < 6; e++)
                    y.deleteFramebuffer(t.__webglFramebuffer[e]),
                    y.deleteRenderbuffer(t.__webglRenderbuffer[e]);
            else
                y.deleteFramebuffer(t.__webglFramebuffer),
                y.deleteRenderbuffer(t.__webglRenderbuffer);
            delete t.__webglFramebuffer,
            delete t.__webglRenderbuffer
        }
    }
      , Ht = function(t) {
        var e = t.program.program;
        if (void 0 !== e) {
            var r, i, n;
            t.program = void 0;
            var o = !1;
            for (r = 0,
            i = x.length; r < i; r++)
                if ((n = x[r]).program === e) {
                    n.usedTimes--,
                    0 === n.usedTimes && (o = !0);
                    break
                }
            if (!0 === o) {
                var a = [];
                for (r = 0,
                i = x.length; r < i; r++)
                    (n = x[r]).program !== e && a.push(n);
                x = a,
                y.deleteProgram(e),
                H.info.memory.programs--
            }
        }
    };
    function xt(t) {
        var e = t.geometry
          , r = t.material
          , i = e.vertices.length;
        if (r.attributes) {
            void 0 === e.__webglCustomAttributesList && (e.__webglCustomAttributesList = []);
            for (var n in r.attributes) {
                var o = r.attributes[n];
                if (!o.__webglInitialized || o.createUniqueBuffers) {
                    o.__webglInitialized = !0;
                    var a = 1;
                    "v2" === o.type ? a = 2 : "v3" === o.type ? a = 3 : "v4" === o.type ? a = 4 : "c" === o.type && (a = 3),
                    o.size = a,
                    o.array = new Float32Array(i * a),
                    o.buffer = y.createBuffer(),
                    o.buffer.belongsToAttribute = n,
                    o.needsUpdate = !0
                }
                e.__webglCustomAttributesList.push(o)
            }
        }
    }
    function wt(t, e) {
        var r = e.geometry
          , i = t.faces3
          , n = 3 * i.length
          , o = 1 * i.length
          , a = 3 * i.length
          , s = bt(e, t);
        t.__vertexArray = new Float32Array(3 * n),
        t.__normalArray = new Float32Array(3 * n),
        t.__colorArray = new Float32Array(3 * n),
        t.__uvArray = new Float32Array(2 * n),
        r.faceVertexUvs.length > 1 && (t.__uv2Array = new Float32Array(2 * n)),
        r.hasTangents && (t.__tangentArray = new Float32Array(4 * n)),
        e.geometry.skinWeights.length && e.geometry.skinIndices.length && (t.__skinIndexArray = new Float32Array(4 * n),
        t.__skinWeightArray = new Float32Array(4 * n));
        var h = null !== W.get("OES_element_index_uint") && o > 21845 ? Uint32Array : Uint16Array;
        t.__typeArray = h,
        t.__faceArray = new h(3 * o),
        t.__lineArray = new h(2 * a);
        var c = t.numMorphTargets;
        if (c) {
            t.__morphTargetsArrays = [];
            for (var l = 0, u = c; l < u; l++)
                t.__morphTargetsArrays.push(new Float32Array(3 * n))
        }
        var E = t.numMorphNormals;
        if (E) {
            t.__morphNormalsArrays = [];
            for (l = 0,
            u = E; l < u; l++)
                t.__morphNormalsArrays.push(new Float32Array(3 * n))
        }
        if (t.__webglFaceCount = 3 * o,
        t.__webglLineCount = 2 * a,
        s.attributes) {
            void 0 === t.__webglCustomAttributesList && (t.__webglCustomAttributesList = []);
            for (var p in s.attributes) {
                var d = s.attributes[p]
                  , f = {};
                for (var m in d)
                    f[m] = d[m];
                if (!f.__webglInitialized || f.createUniqueBuffers) {
                    f.__webglInitialized = !0;
                    var T = 1;
                    "v2" === f.type ? T = 2 : "v3" === f.type ? T = 3 : "v4" === f.type ? T = 4 : "c" === f.type && (T = 3),
                    f.size = T,
                    f.array = new Float32Array(n * T),
                    f.buffer = y.createBuffer(),
                    f.buffer.belongsToAttribute = p,
                    d.needsUpdate = !0,
                    f.__original = d
                }
                t.__webglCustomAttributesList.push(f)
            }
        }
        t.__inittedArrays = !0
    }
    function bt(t, e) {
        return t.material instanceof THREE.MeshFaceMaterial ? t.material.materials[e.materialIndex] : t.material
    }
    function Mt(t, e, r, i, n) {
        if (t.__inittedArrays) {
            var o, a, s, h, c, l, u, E, p, d, f, m, T, g, v, R, H, x, w, b, M, _, S, C, A, L, P, F, B, U, V, D, z, k, N, O, G, I, W, j, X, Y, q = (o = n)instanceof THREE.MeshPhongMaterial == 0 && o.shading === THREE.FlatShading, Z = 0, K = 0, Q = 0, J = 0, $ = 0, tt = 0, et = 0, rt = 0, it = 0, nt = 0, ot = 0, at = 0, st = t.__vertexArray, ht = t.__uvArray, ct = t.__uv2Array, lt = t.__normalArray, ut = t.__tangentArray, Et = t.__colorArray, pt = t.__skinIndexArray, dt = t.__skinWeightArray, ft = t.__morphTargetsArrays, mt = t.__morphNormalsArrays, Tt = t.__webglCustomAttributesList, gt = t.__faceArray, vt = t.__lineArray, Rt = e.geometry, yt = Rt.verticesNeedUpdate, Ht = Rt.elementsNeedUpdate, xt = Rt.uvsNeedUpdate, wt = Rt.normalsNeedUpdate, bt = Rt.tangentsNeedUpdate, Mt = Rt.colorsNeedUpdate, _t = Rt.morphTargetsNeedUpdate, St = Rt.vertices, Ct = t.faces3, At = Rt.faces, Lt = Rt.faceVertexUvs[0], Pt = Rt.faceVertexUvs[1], Ft = Rt.skinIndices, Bt = Rt.skinWeights, Ut = Rt.morphTargets, Vt = Rt.morphNormals;
            if (yt) {
                for (a = 0,
                s = Ct.length; a < s; a++)
                    m = St[(h = At[Ct[a]]).a],
                    T = St[h.b],
                    g = St[h.c],
                    st[K] = m.x,
                    st[K + 1] = m.y,
                    st[K + 2] = m.z,
                    st[K + 3] = T.x,
                    st[K + 4] = T.y,
                    st[K + 5] = T.z,
                    st[K + 6] = g.x,
                    st[K + 7] = g.y,
                    st[K + 8] = g.z,
                    K += 9;
                y.bindBuffer(y.ARRAY_BUFFER, t.__webglVertexBuffer),
                y.bufferData(y.ARRAY_BUFFER, st, r)
            }
            if (_t)
                for (N = 0,
                O = Ut.length; N < O; N++) {
                    for (ot = 0,
                    a = 0,
                    s = Ct.length; a < s; a++)
                        h = At[W = Ct[a]],
                        m = Ut[N].vertices[h.a],
                        T = Ut[N].vertices[h.b],
                        g = Ut[N].vertices[h.c],
                        (G = ft[N])[ot] = m.x,
                        G[ot + 1] = m.y,
                        G[ot + 2] = m.z,
                        G[ot + 3] = T.x,
                        G[ot + 4] = T.y,
                        G[ot + 5] = T.z,
                        G[ot + 6] = g.x,
                        G[ot + 7] = g.y,
                        G[ot + 8] = g.z,
                        n.morphNormals && (q ? (w = x = Vt[N].faceNormals[W],
                        b = x) : (x = (j = Vt[N].vertexNormals[W]).a,
                        w = j.b,
                        b = j.c),
                        (I = mt[N])[ot] = x.x,
                        I[ot + 1] = x.y,
                        I[ot + 2] = x.z,
                        I[ot + 3] = w.x,
                        I[ot + 4] = w.y,
                        I[ot + 5] = w.z,
                        I[ot + 6] = b.x,
                        I[ot + 7] = b.y,
                        I[ot + 8] = b.z),
                        ot += 9;
                    y.bindBuffer(y.ARRAY_BUFFER, t.__webglMorphTargetsBuffers[N]),
                    y.bufferData(y.ARRAY_BUFFER, ft[N], r),
                    n.morphNormals && (y.bindBuffer(y.ARRAY_BUFFER, t.__webglMorphNormalsBuffers[N]),
                    y.bufferData(y.ARRAY_BUFFER, mt[N], r))
                }
            if (Bt.length) {
                for (a = 0,
                s = Ct.length; a < s; a++)
                    C = Bt[(h = At[Ct[a]]).a],
                    A = Bt[h.b],
                    L = Bt[h.c],
                    dt[nt] = C.x,
                    dt[nt + 1] = C.y,
                    dt[nt + 2] = C.z,
                    dt[nt + 3] = C.w,
                    dt[nt + 4] = A.x,
                    dt[nt + 5] = A.y,
                    dt[nt + 6] = A.z,
                    dt[nt + 7] = A.w,
                    dt[nt + 8] = L.x,
                    dt[nt + 9] = L.y,
                    dt[nt + 10] = L.z,
                    dt[nt + 11] = L.w,
                    P = Ft[h.a],
                    F = Ft[h.b],
                    B = Ft[h.c],
                    pt[nt] = P.x,
                    pt[nt + 1] = P.y,
                    pt[nt + 2] = P.z,
                    pt[nt + 3] = P.w,
                    pt[nt + 4] = F.x,
                    pt[nt + 5] = F.y,
                    pt[nt + 6] = F.z,
                    pt[nt + 7] = F.w,
                    pt[nt + 8] = B.x,
                    pt[nt + 9] = B.y,
                    pt[nt + 10] = B.z,
                    pt[nt + 11] = B.w,
                    nt += 12;
                nt > 0 && (y.bindBuffer(y.ARRAY_BUFFER, t.__webglSkinIndicesBuffer),
                y.bufferData(y.ARRAY_BUFFER, pt, r),
                y.bindBuffer(y.ARRAY_BUFFER, t.__webglSkinWeightsBuffer),
                y.bufferData(y.ARRAY_BUFFER, dt, r))
            }
            if (Mt) {
                for (a = 0,
                s = Ct.length; a < s; a++)
                    u = (h = At[Ct[a]]).vertexColors,
                    E = h.color,
                    3 === u.length && n.vertexColors === THREE.VertexColors ? (M = u[0],
                    _ = u[1],
                    S = u[2]) : (M = E,
                    _ = E,
                    S = E),
                    Et[it] = M.r,
                    Et[it + 1] = M.g,
                    Et[it + 2] = M.b,
                    Et[it + 3] = _.r,
                    Et[it + 4] = _.g,
                    Et[it + 5] = _.b,
                    Et[it + 6] = S.r,
                    Et[it + 7] = S.g,
                    Et[it + 8] = S.b,
                    it += 9;
                it > 0 && (y.bindBuffer(y.ARRAY_BUFFER, t.__webglColorBuffer),
                y.bufferData(y.ARRAY_BUFFER, Et, r))
            }
            if (bt && Rt.hasTangents) {
                for (a = 0,
                s = Ct.length; a < s; a++)
                    v = (p = (h = At[Ct[a]]).vertexTangents)[0],
                    R = p[1],
                    H = p[2],
                    ut[et] = v.x,
                    ut[et + 1] = v.y,
                    ut[et + 2] = v.z,
                    ut[et + 3] = v.w,
                    ut[et + 4] = R.x,
                    ut[et + 5] = R.y,
                    ut[et + 6] = R.z,
                    ut[et + 7] = R.w,
                    ut[et + 8] = H.x,
                    ut[et + 9] = H.y,
                    ut[et + 10] = H.z,
                    ut[et + 11] = H.w,
                    et += 12;
                y.bindBuffer(y.ARRAY_BUFFER, t.__webglTangentBuffer),
                y.bufferData(y.ARRAY_BUFFER, ut, r)
            }
            if (wt) {
                for (a = 0,
                s = Ct.length; a < s; a++)
                    if (c = (h = At[Ct[a]]).vertexNormals,
                    l = h.normal,
                    3 === c.length && !1 === q)
                        for (U = 0; U < 3; U++)
                            D = c[U],
                            lt[tt] = D.x,
                            lt[tt + 1] = D.y,
                            lt[tt + 2] = D.z,
                            tt += 3;
                    else
                        for (U = 0; U < 3; U++)
                            lt[tt] = l.x,
                            lt[tt + 1] = l.y,
                            lt[tt + 2] = l.z,
                            tt += 3;
                y.bindBuffer(y.ARRAY_BUFFER, t.__webglNormalBuffer),
                y.bufferData(y.ARRAY_BUFFER, lt, r)
            }
            if (xt && Lt) {
                for (a = 0,
                s = Ct.length; a < s; a++)
                    if (void 0 !== (d = Lt[Ct[a]]))
                        for (U = 0; U < 3; U++)
                            z = d[U],
                            ht[Q] = z.x,
                            ht[Q + 1] = z.y,
                            Q += 2;
                Q > 0 && (y.bindBuffer(y.ARRAY_BUFFER, t.__webglUVBuffer),
                y.bufferData(y.ARRAY_BUFFER, ht, r))
            }
            if (xt && Pt) {
                for (a = 0,
                s = Ct.length; a < s; a++)
                    if (void 0 !== (f = Pt[Ct[a]]))
                        for (U = 0; U < 3; U++)
                            k = f[U],
                            ct[J] = k.x,
                            ct[J + 1] = k.y,
                            J += 2;
                J > 0 && (y.bindBuffer(y.ARRAY_BUFFER, t.__webglUV2Buffer),
                y.bufferData(y.ARRAY_BUFFER, ct, r))
            }
            if (Ht) {
                for (a = 0,
                s = Ct.length; a < s; a++)
                    gt[$] = Z,
                    gt[$ + 1] = Z + 1,
                    gt[$ + 2] = Z + 2,
                    $ += 3,
                    vt[rt] = Z,
                    vt[rt + 1] = Z + 1,
                    vt[rt + 2] = Z,
                    vt[rt + 3] = Z + 2,
                    vt[rt + 4] = Z + 1,
                    vt[rt + 5] = Z + 2,
                    rt += 6,
                    Z += 3;
                y.bindBuffer(y.ELEMENT_ARRAY_BUFFER, t.__webglFaceBuffer),
                y.bufferData(y.ELEMENT_ARRAY_BUFFER, gt, r),
                y.bindBuffer(y.ELEMENT_ARRAY_BUFFER, t.__webglLineBuffer),
                y.bufferData(y.ELEMENT_ARRAY_BUFFER, vt, r)
            }
            if (Tt)
                for (U = 0,
                V = Tt.length; U < V; U++)
                    if ((Y = Tt[U]).__original.needsUpdate) {
                        if (at = 0,
                        1 === Y.size) {
                            if (void 0 === Y.boundTo || "vertices" === Y.boundTo)
                                for (a = 0,
                                s = Ct.length; a < s; a++)
                                    h = At[Ct[a]],
                                    Y.array[at] = Y.value[h.a],
                                    Y.array[at + 1] = Y.value[h.b],
                                    Y.array[at + 2] = Y.value[h.c],
                                    at += 3;
                            else if ("faces" === Y.boundTo)
                                for (a = 0,
                                s = Ct.length; a < s; a++)
                                    X = Y.value[Ct[a]],
                                    Y.array[at] = X,
                                    Y.array[at + 1] = X,
                                    Y.array[at + 2] = X,
                                    at += 3
                        } else if (2 === Y.size) {
                            if (void 0 === Y.boundTo || "vertices" === Y.boundTo)
                                for (a = 0,
                                s = Ct.length; a < s; a++)
                                    h = At[Ct[a]],
                                    m = Y.value[h.a],
                                    T = Y.value[h.b],
                                    g = Y.value[h.c],
                                    Y.array[at] = m.x,
                                    Y.array[at + 1] = m.y,
                                    Y.array[at + 2] = T.x,
                                    Y.array[at + 3] = T.y,
                                    Y.array[at + 4] = g.x,
                                    Y.array[at + 5] = g.y,
                                    at += 6;
                            else if ("faces" === Y.boundTo)
                                for (a = 0,
                                s = Ct.length; a < s; a++)
                                    m = X = Y.value[Ct[a]],
                                    T = X,
                                    g = X,
                                    Y.array[at] = m.x,
                                    Y.array[at + 1] = m.y,
                                    Y.array[at + 2] = T.x,
                                    Y.array[at + 3] = T.y,
                                    Y.array[at + 4] = g.x,
                                    Y.array[at + 5] = g.y,
                                    at += 6
                        } else if (3 === Y.size) {
                            var Dt;
                            if (Dt = "c" === Y.type ? ["r", "g", "b"] : ["x", "y", "z"],
                            void 0 === Y.boundTo || "vertices" === Y.boundTo)
                                for (a = 0,
                                s = Ct.length; a < s; a++)
                                    h = At[Ct[a]],
                                    m = Y.value[h.a],
                                    T = Y.value[h.b],
                                    g = Y.value[h.c],
                                    Y.array[at] = m[Dt[0]],
                                    Y.array[at + 1] = m[Dt[1]],
                                    Y.array[at + 2] = m[Dt[2]],
                                    Y.array[at + 3] = T[Dt[0]],
                                    Y.array[at + 4] = T[Dt[1]],
                                    Y.array[at + 5] = T[Dt[2]],
                                    Y.array[at + 6] = g[Dt[0]],
                                    Y.array[at + 7] = g[Dt[1]],
                                    Y.array[at + 8] = g[Dt[2]],
                                    at += 9;
                            else if ("faces" === Y.boundTo)
                                for (a = 0,
                                s = Ct.length; a < s; a++)
                                    m = X = Y.value[Ct[a]],
                                    T = X,
                                    g = X,
                                    Y.array[at] = m[Dt[0]],
                                    Y.array[at + 1] = m[Dt[1]],
                                    Y.array[at + 2] = m[Dt[2]],
                                    Y.array[at + 3] = T[Dt[0]],
                                    Y.array[at + 4] = T[Dt[1]],
                                    Y.array[at + 5] = T[Dt[2]],
                                    Y.array[at + 6] = g[Dt[0]],
                                    Y.array[at + 7] = g[Dt[1]],
                                    Y.array[at + 8] = g[Dt[2]],
                                    at += 9;
                            else if ("faceVertices" === Y.boundTo)
                                for (a = 0,
                                s = Ct.length; a < s; a++)
                                    m = (X = Y.value[Ct[a]])[0],
                                    T = X[1],
                                    g = X[2],
                                    Y.array[at] = m[Dt[0]],
                                    Y.array[at + 1] = m[Dt[1]],
                                    Y.array[at + 2] = m[Dt[2]],
                                    Y.array[at + 3] = T[Dt[0]],
                                    Y.array[at + 4] = T[Dt[1]],
                                    Y.array[at + 5] = T[Dt[2]],
                                    Y.array[at + 6] = g[Dt[0]],
                                    Y.array[at + 7] = g[Dt[1]],
                                    Y.array[at + 8] = g[Dt[2]],
                                    at += 9
                        } else if (4 === Y.size)
                            if (void 0 === Y.boundTo || "vertices" === Y.boundTo)
                                for (a = 0,
                                s = Ct.length; a < s; a++)
                                    h = At[Ct[a]],
                                    m = Y.value[h.a],
                                    T = Y.value[h.b],
                                    g = Y.value[h.c],
                                    Y.array[at] = m.x,
                                    Y.array[at + 1] = m.y,
                                    Y.array[at + 2] = m.z,
                                    Y.array[at + 3] = m.w,
                                    Y.array[at + 4] = T.x,
                                    Y.array[at + 5] = T.y,
                                    Y.array[at + 6] = T.z,
                                    Y.array[at + 7] = T.w,
                                    Y.array[at + 8] = g.x,
                                    Y.array[at + 9] = g.y,
                                    Y.array[at + 10] = g.z,
                                    Y.array[at + 11] = g.w,
                                    at += 12;
                            else if ("faces" === Y.boundTo)
                                for (a = 0,
                                s = Ct.length; a < s; a++)
                                    m = X = Y.value[Ct[a]],
                                    T = X,
                                    g = X,
                                    Y.array[at] = m.x,
                                    Y.array[at + 1] = m.y,
                                    Y.array[at + 2] = m.z,
                                    Y.array[at + 3] = m.w,
                                    Y.array[at + 4] = T.x,
                                    Y.array[at + 5] = T.y,
                                    Y.array[at + 6] = T.z,
                                    Y.array[at + 7] = T.w,
                                    Y.array[at + 8] = g.x,
                                    Y.array[at + 9] = g.y,
                                    Y.array[at + 10] = g.z,
                                    Y.array[at + 11] = g.w,
                                    at += 12;
                            else if ("faceVertices" === Y.boundTo)
                                for (a = 0,
                                s = Ct.length; a < s; a++)
                                    m = (X = Y.value[Ct[a]])[0],
                                    T = X[1],
                                    g = X[2],
                                    Y.array[at] = m.x,
                                    Y.array[at + 1] = m.y,
                                    Y.array[at + 2] = m.z,
                                    Y.array[at + 3] = m.w,
                                    Y.array[at + 4] = T.x,
                                    Y.array[at + 5] = T.y,
                                    Y.array[at + 6] = T.z,
                                    Y.array[at + 7] = T.w,
                                    Y.array[at + 8] = g.x,
                                    Y.array[at + 9] = g.y,
                                    Y.array[at + 10] = g.z,
                                    Y.array[at + 11] = g.w,
                                    at += 12;
                        y.bindBuffer(y.ARRAY_BUFFER, Y.buffer),
                        y.bufferData(y.ARRAY_BUFFER, Y.array, r)
                    }
            i && (delete t.__inittedArrays,
            delete t.__colorArray,
            delete t.__normalArray,
            delete t.__tangentArray,
            delete t.__uvArray,
            delete t.__uv2Array,
            delete t.__faceArray,
            delete t.__vertexArray,
            delete t.__lineArray,
            delete t.__skinIndexArray,
            delete t.__skinWeightArray)
        }
    }
    function _t(t, e, r, i) {
        for (var n = r.attributes, o = e.attributes, a = e.attributesKeys, s = 0, h = a.length; s < h; s++) {
            var c = a[s]
              , l = o[c];
            if (l >= 0) {
                var u = n[c];
                if (void 0 !== u) {
                    var E = u.itemSize;
                    y.bindBuffer(y.ARRAY_BUFFER, u.buffer),
                    I.enableAttribute(l),
                    y.vertexAttribPointer(l, E, y.FLOAT, !1, 0, i * E * 4)
                } else
                    void 0 !== t.defaultAttributeValues && (2 === t.defaultAttributeValues[c].length ? y.vertexAttrib2fv(l, t.defaultAttributeValues[c]) : 3 === t.defaultAttributeValues[c].length && y.vertexAttrib3fv(l, t.defaultAttributeValues[c]))
            }
        }
        I.disableUnusedAttributes()
    }
    function St(t, e) {
        return t.object.renderOrder !== e.object.renderOrder ? t.object.renderOrder - e.object.renderOrder : t.material.id !== e.material.id ? t.material.id - e.material.id : t.z !== e.z ? t.z - e.z : t.id - e.id
    }
    function Ct(t, e) {
        return t.object.renderOrder !== e.object.renderOrder ? t.object.renderOrder - e.object.renderOrder : t.z !== e.z ? e.z - t.z : t.id - e.id
    }
    function At(t, e) {
        return e[0] - t[0]
    }
    function Lt(t, e, r, i, n) {
        for (var o, a = 0, s = t.length; a < s; a++) {
            var h = t[a]
              , c = h.object
              , l = h.buffer;
            if (Zt(c, e),
            n)
                o = n;
            else {
                if (!(o = h.material))
                    continue;
                Wt(o)
            }
            H.setMaterialFaces(o),
            l instanceof THREE.BufferGeometry ? H.renderBufferDirect(e, r, i, o, l, c) : H.renderBuffer(e, r, i, o, l, c)
        }
    }
    function Pt(t, e, r, i, n, o) {
        for (var a, s = 0, h = t.length; s < h; s++) {
            var c = t[s]
              , l = c.object;
            if (l.visible) {
                if (o)
                    a = o;
                else {
                    if (!(a = c[e]))
                        continue;
                    Wt(a)
                }
                H.renderImmediateObject(r, i, n, a, l)
            }
        }
    }
    function Ft(t) {
        var e = t.object.material;
        e.transparent ? (t.transparent = e,
        t.opaque = null) : (t.opaque = e,
        t.transparent = null)
    }
    function Bt(t) {
        var e = t.object
          , r = t.buffer
          , i = e.geometry
          , n = e.material;
        if (n instanceof THREE.MeshFaceMaterial) {
            var o = i instanceof THREE.BufferGeometry ? 0 : r.materialIndex;
            n = n.materials[o],
            t.material = n,
            n.transparent ? g.push(t) : T.push(t)
        } else
            n && (t.material = n,
            n.transparent ? g.push(t) : T.push(t))
    }
    this.renderBufferImmediate = function(t, e, r) {
        if (I.initAttributes(),
        t.hasPositions && !t.__webglVertexBuffer && (t.__webglVertexBuffer = y.createBuffer()),
        t.hasNormals && !t.__webglNormalBuffer && (t.__webglNormalBuffer = y.createBuffer()),
        t.hasUvs && !t.__webglUvBuffer && (t.__webglUvBuffer = y.createBuffer()),
        t.hasColors && !t.__webglColorBuffer && (t.__webglColorBuffer = y.createBuffer()),
        t.hasPositions && (y.bindBuffer(y.ARRAY_BUFFER, t.__webglVertexBuffer),
        y.bufferData(y.ARRAY_BUFFER, t.positionArray, y.DYNAMIC_DRAW),
        I.enableAttribute(e.attributes.position),
        y.vertexAttribPointer(e.attributes.position, 3, y.FLOAT, !1, 0, 0)),
        t.hasNormals) {
            if (y.bindBuffer(y.ARRAY_BUFFER, t.__webglNormalBuffer),
            r instanceof THREE.MeshPhongMaterial == !1 && r.shading === THREE.FlatShading) {
                var i, n, o, a, s, h, c, l, u, E, p, d = 3 * t.count;
                for (p = 0; p < d; p += 9)
                    a = (E = t.normalArray)[p],
                    h = E[p + 1],
                    l = E[p + 2],
                    s = E[p + 3],
                    c = E[p + 4],
                    u = E[p + 5],
                    i = (a + s + E[p + 6]) / 3,
                    n = (h + c + E[p + 7]) / 3,
                    o = (l + u + E[p + 8]) / 3,
                    E[p] = i,
                    E[p + 1] = n,
                    E[p + 2] = o,
                    E[p + 3] = i,
                    E[p + 4] = n,
                    E[p + 5] = o,
                    E[p + 6] = i,
                    E[p + 7] = n,
                    E[p + 8] = o
            }
            y.bufferData(y.ARRAY_BUFFER, t.normalArray, y.DYNAMIC_DRAW),
            I.enableAttribute(e.attributes.normal),
            y.vertexAttribPointer(e.attributes.normal, 3, y.FLOAT, !1, 0, 0)
        }
        t.hasUvs && r.map && (y.bindBuffer(y.ARRAY_BUFFER, t.__webglUvBuffer),
        y.bufferData(y.ARRAY_BUFFER, t.uvArray, y.DYNAMIC_DRAW),
        I.enableAttribute(e.attributes.uv),
        y.vertexAttribPointer(e.attributes.uv, 2, y.FLOAT, !1, 0, 0)),
        t.hasColors && r.vertexColors !== THREE.NoColors && (y.bindBuffer(y.ARRAY_BUFFER, t.__webglColorBuffer),
        y.bufferData(y.ARRAY_BUFFER, t.colorArray, y.DYNAMIC_DRAW),
        I.enableAttribute(e.attributes.color),
        y.vertexAttribPointer(e.attributes.color, 3, y.FLOAT, !1, 0, 0)),
        I.disableUnusedAttributes(),
        y.drawArrays(y.TRIANGLES, 0, t.count),
        t.count = 0
    }
    ,
    this.renderBufferDirect = function(t, e, r, n, o, a) {
        if (!1 !== n.visible) {
            kt(a);
            var s = jt(t, e, r, n, a)
              , h = !1
              , c = n.wireframe ? 1 : 0
              , l = "direct_" + o.id + "_" + s.id + "_" + c;
            if (l !== _ && (_ = l,
            h = !0),
            h && I.initAttributes(),
            a instanceof THREE.Mesh) {
                var u = !0 === n.wireframe ? y.LINES : y.TRIANGLES;
                if (m = o.attributes.index) {
                    if (m.array instanceof Uint32Array && W.get("OES_element_index_uint") ? (T = y.UNSIGNED_INT,
                    g = 4) : (T = y.UNSIGNED_SHORT,
                    g = 2),
                    0 === (v = o.offsets).length)
                        h && (_t(n, s, o, 0),
                        y.bindBuffer(y.ELEMENT_ARRAY_BUFFER, m.buffer)),
                        y.drawElements(u, m.array.length, T, 0),
                        H.info.render.calls++,
                        H.info.render.vertices += m.array.length,
                        H.info.render.faces += m.array.length / 3;
                    else {
                        h = !0;
                        for (var E = 0, p = v.length; E < p; E++) {
                            var d = v[E].index;
                            h && (_t(n, s, o, d),
                            y.bindBuffer(y.ELEMENT_ARRAY_BUFFER, m.buffer)),
                            y.drawElements(u, v[E].count, T, v[E].start * g),
                            H.info.render.calls++,
                            H.info.render.vertices += v[E].count,
                            H.info.render.faces += v[E].count / 3
                        }
                    }
                } else {
                    h && _t(n, s, o, 0);
                    var f = o.attributes.position;
                    y.drawArrays(u, 0, f.array.length / f.itemSize),
                    H.info.render.calls++,
                    H.info.render.vertices += f.array.length / f.itemSize,
                    H.info.render.faces += f.array.length / (3 * f.itemSize)
                }
            } else if (a instanceof THREE.PointCloud) {
                u = y.POINTS;
                if (m = o.attributes.index) {
                    if (m.array instanceof Uint32Array && W.get("OES_element_index_uint") ? (T = y.UNSIGNED_INT,
                    g = 4) : (T = y.UNSIGNED_SHORT,
                    g = 2),
                    0 === (v = o.offsets).length)
                        h && (_t(n, s, o, 0),
                        y.bindBuffer(y.ELEMENT_ARRAY_BUFFER, m.buffer)),
                        y.drawElements(u, m.array.length, T, 0),
                        H.info.render.calls++,
                        H.info.render.points += m.array.length;
                    else {
                        v.length > 1 && (h = !0);
                        for (E = 0,
                        p = v.length; E < p; E++) {
                            d = v[E].index;
                            h && (_t(n, s, o, d),
                            y.bindBuffer(y.ELEMENT_ARRAY_BUFFER, m.buffer)),
                            y.drawElements(u, v[E].count, T, v[E].start * g),
                            H.info.render.calls++,
                            H.info.render.points += v[E].count
                        }
                    }
                } else {
                    h && _t(n, s, o, 0);
                    f = o.attributes.position;
                    if (0 === (v = o.offsets).length)
                        y.drawArrays(u, 0, f.array.length / 3),
                        H.info.render.calls++,
                        H.info.render.points += f.array.length / 3;
                    else
                        for (E = 0,
                        p = v.length; E < p; E++)
                            y.drawArrays(u, v[E].index, v[E].count),
                            H.info.render.calls++,
                            H.info.render.points += v[E].count
                }
            } else if (a instanceof THREE.Line) {
                var m;
                u = a.mode === THREE.LineStrip ? y.LINE_STRIP : y.LINES;
                if (I.setLineWidth(n.linewidth * i),
                m = o.attributes.index) {
                    var T, g;
                    if (m.array instanceof Uint32Array ? (T = y.UNSIGNED_INT,
                    g = 4) : (T = y.UNSIGNED_SHORT,
                    g = 2),
                    0 === (v = o.offsets).length)
                        h && (_t(n, s, o, 0),
                        y.bindBuffer(y.ELEMENT_ARRAY_BUFFER, m.buffer)),
                        y.drawElements(u, m.array.length, T, 0),
                        H.info.render.calls++,
                        H.info.render.vertices += m.array.length;
                    else {
                        v.length > 1 && (h = !0);
                        for (E = 0,
                        p = v.length; E < p; E++) {
                            d = v[E].index;
                            h && (_t(n, s, o, d),
                            y.bindBuffer(y.ELEMENT_ARRAY_BUFFER, m.buffer)),
                            y.drawElements(u, v[E].count, T, v[E].start * g),
                            H.info.render.calls++,
                            H.info.render.vertices += v[E].count
                        }
                    }
                } else {
                    h && _t(n, s, o, 0);
                    var v;
                    f = o.attributes.position;
                    if (0 === (v = o.offsets).length)
                        y.drawArrays(u, 0, f.array.length / 3),
                        H.info.render.calls++,
                        H.info.render.vertices += f.array.length / 3;
                    else
                        for (E = 0,
                        p = v.length; E < p; E++)
                            y.drawArrays(u, v[E].index, v[E].count),
                            H.info.render.calls++,
                            H.info.render.vertices += v[E].count
                }
            }
        }
    }
    ,
    this.renderBuffer = function(t, e, r, n, o, a) {
        if (!1 !== n.visible) {
            kt(a);
            var s = jt(t, e, r, n, a)
              , h = s.attributes
              , c = !1
              , l = n.wireframe ? 1 : 0
              , u = o.id + "_" + s.id + "_" + l;
            if (u !== _ && (_ = u,
            c = !0),
            c && I.initAttributes(),
            !n.morphTargets && h.position >= 0 ? c && (y.bindBuffer(y.ARRAY_BUFFER, o.__webglVertexBuffer),
            I.enableAttribute(h.position),
            y.vertexAttribPointer(h.position, 3, y.FLOAT, !1, 0, 0)) : a.morphTargetBase && function(t, e, r) {
                var i = t.program.attributes;
                -1 !== r.morphTargetBase && i.position >= 0 ? (y.bindBuffer(y.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[r.morphTargetBase]),
                I.enableAttribute(i.position),
                y.vertexAttribPointer(i.position, 3, y.FLOAT, !1, 0, 0)) : i.position >= 0 && (y.bindBuffer(y.ARRAY_BUFFER, e.__webglVertexBuffer),
                I.enableAttribute(i.position),
                y.vertexAttribPointer(i.position, 3, y.FLOAT, !1, 0, 0));
                if (r.morphTargetForcedOrder.length)
                    for (var n = 0, o = r.morphTargetForcedOrder, a = r.morphTargetInfluences; n < t.numSupportedMorphTargets && n < o.length; )
                        (s = i["morphTarget" + n]) >= 0 && (y.bindBuffer(y.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[o[n]]),
                        I.enableAttribute(s),
                        y.vertexAttribPointer(s, 3, y.FLOAT, !1, 0, 0)),
                        (s = i["morphNormal" + n]) >= 0 && t.morphNormals && (y.bindBuffer(y.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[o[n]]),
                        I.enableAttribute(s),
                        y.vertexAttribPointer(s, 3, y.FLOAT, !1, 0, 0)),
                        r.__webglMorphTargetInfluences[n] = a[o[n]],
                        n++;
                else {
                    var s, h = [], a = r.morphTargetInfluences, c = r.geometry.morphTargets;
                    a.length > c.length && (console.warn("THREE.WebGLRenderer: Influences array is bigger than morphTargets array."),
                    a.length = c.length);
                    for (var l = 0, u = a.length; l < u; l++) {
                        var E = a[l];
                        h.push([E, l])
                    }
                    h.length > t.numSupportedMorphTargets ? (h.sort(At),
                    h.length = t.numSupportedMorphTargets) : h.length > t.numSupportedMorphNormals ? h.sort(At) : 0 === h.length && h.push([0, 0]);
                    for (var n = 0, p = t.numSupportedMorphTargets; n < p; n++)
                        if (h[n]) {
                            var d = h[n][1];
                            (s = i["morphTarget" + n]) >= 0 && (y.bindBuffer(y.ARRAY_BUFFER, e.__webglMorphTargetsBuffers[d]),
                            I.enableAttribute(s),
                            y.vertexAttribPointer(s, 3, y.FLOAT, !1, 0, 0)),
                            (s = i["morphNormal" + n]) >= 0 && t.morphNormals && (y.bindBuffer(y.ARRAY_BUFFER, e.__webglMorphNormalsBuffers[d]),
                            I.enableAttribute(s),
                            y.vertexAttribPointer(s, 3, y.FLOAT, !1, 0, 0)),
                            r.__webglMorphTargetInfluences[n] = a[d]
                        } else
                            r.__webglMorphTargetInfluences[n] = 0
                }
                null !== t.program.uniforms.morphTargetInfluences && y.uniform1fv(t.program.uniforms.morphTargetInfluences, r.__webglMorphTargetInfluences)
            }(n, o, a),
            c) {
                if (o.__webglCustomAttributesList)
                    for (var E = 0, p = o.__webglCustomAttributesList.length; E < p; E++) {
                        var d = o.__webglCustomAttributesList[E];
                        h[d.buffer.belongsToAttribute] >= 0 && (y.bindBuffer(y.ARRAY_BUFFER, d.buffer),
                        I.enableAttribute(h[d.buffer.belongsToAttribute]),
                        y.vertexAttribPointer(h[d.buffer.belongsToAttribute], d.size, y.FLOAT, !1, 0, 0))
                    }
                h.color >= 0 && (a.geometry.colors.length > 0 || a.geometry.faces.length > 0 ? (y.bindBuffer(y.ARRAY_BUFFER, o.__webglColorBuffer),
                I.enableAttribute(h.color),
                y.vertexAttribPointer(h.color, 3, y.FLOAT, !1, 0, 0)) : void 0 !== n.defaultAttributeValues && y.vertexAttrib3fv(h.color, n.defaultAttributeValues.color)),
                h.normal >= 0 && (y.bindBuffer(y.ARRAY_BUFFER, o.__webglNormalBuffer),
                I.enableAttribute(h.normal),
                y.vertexAttribPointer(h.normal, 3, y.FLOAT, !1, 0, 0)),
                h.tangent >= 0 && (y.bindBuffer(y.ARRAY_BUFFER, o.__webglTangentBuffer),
                I.enableAttribute(h.tangent),
                y.vertexAttribPointer(h.tangent, 4, y.FLOAT, !1, 0, 0)),
                h.uv >= 0 && (a.geometry.faceVertexUvs[0] ? (y.bindBuffer(y.ARRAY_BUFFER, o.__webglUVBuffer),
                I.enableAttribute(h.uv),
                y.vertexAttribPointer(h.uv, 2, y.FLOAT, !1, 0, 0)) : void 0 !== n.defaultAttributeValues && y.vertexAttrib2fv(h.uv, n.defaultAttributeValues.uv)),
                h.uv2 >= 0 && (a.geometry.faceVertexUvs[1] ? (y.bindBuffer(y.ARRAY_BUFFER, o.__webglUV2Buffer),
                I.enableAttribute(h.uv2),
                y.vertexAttribPointer(h.uv2, 2, y.FLOAT, !1, 0, 0)) : void 0 !== n.defaultAttributeValues && y.vertexAttrib2fv(h.uv2, n.defaultAttributeValues.uv2)),
                n.skinning && h.skinIndex >= 0 && h.skinWeight >= 0 && (y.bindBuffer(y.ARRAY_BUFFER, o.__webglSkinIndicesBuffer),
                I.enableAttribute(h.skinIndex),
                y.vertexAttribPointer(h.skinIndex, 4, y.FLOAT, !1, 0, 0),
                y.bindBuffer(y.ARRAY_BUFFER, o.__webglSkinWeightsBuffer),
                I.enableAttribute(h.skinWeight),
                y.vertexAttribPointer(h.skinWeight, 4, y.FLOAT, !1, 0, 0)),
                h.lineDistance >= 0 && (y.bindBuffer(y.ARRAY_BUFFER, o.__webglLineDistanceBuffer),
                I.enableAttribute(h.lineDistance),
                y.vertexAttribPointer(h.lineDistance, 1, y.FLOAT, !1, 0, 0))
            }
            if (I.disableUnusedAttributes(),
            a instanceof THREE.Mesh) {
                var f = o.__typeArray === Uint32Array ? y.UNSIGNED_INT : y.UNSIGNED_SHORT;
                n.wireframe ? (I.setLineWidth(n.wireframeLinewidth * i),
                c && y.bindBuffer(y.ELEMENT_ARRAY_BUFFER, o.__webglLineBuffer),
                y.drawElements(y.LINES, o.__webglLineCount, f, 0)) : (c && y.bindBuffer(y.ELEMENT_ARRAY_BUFFER, o.__webglFaceBuffer),
                y.drawElements(y.TRIANGLES, o.__webglFaceCount, f, 0)),
                H.info.render.calls++,
                H.info.render.vertices += o.__webglFaceCount,
                H.info.render.faces += o.__webglFaceCount / 3
            } else if (a instanceof THREE.Line) {
                var m = a.mode === THREE.LineStrip ? y.LINE_STRIP : y.LINES;
                I.setLineWidth(n.linewidth * i),
                y.drawArrays(m, 0, o.__webglLineCount),
                H.info.render.calls++
            } else
                a instanceof THREE.PointCloud && (y.drawArrays(y.POINTS, 0, o.__webglParticleCount),
                H.info.render.calls++,
                H.info.render.points += o.__webglParticleCount)
        }
    }
    ,
    this.render = function(t, e, r, i) {
        if (e instanceof THREE.Camera != !1) {
            var n, o = t.fog;
            _ = "",
            M = -1,
            S = null,
            N = !0,
            !0 === t.autoUpdate && t.updateMatrixWorld(),
            void 0 === e.parent && e.updateMatrixWorld(),
            t.traverse(function(t) {
                t instanceof THREE.SkinnedMesh && t.skeleton.update()
            }),
            e.matrixWorldInverse.getInverse(e.matrixWorld),
            D.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse),
            V.setFromMatrix(D),
            d.length = 0,
            T.length = 0,
            g.length = 0,
            v.length = 0,
            R.length = 0,
            function t(e) {
                if (!1 === e.visible)
                    return;
                if (e instanceof THREE.Scene || e instanceof THREE.Group)
                    ;
                else if (function(t) {
                    void 0 === t.__webglInit && (t.__webglInit = !0,
                    t._modelViewMatrix = new THREE.Matrix4,
                    t._normalMatrix = new THREE.Matrix3,
                    t.addEventListener("removed", pt));
                    var e = t.geometry;
                    void 0 === e || void 0 === e.__webglInit && (e.__webglInit = !0,
                    e.addEventListener("dispose", dt),
                    e instanceof THREE.BufferGeometry ? H.info.memory.geometries++ : t instanceof THREE.Mesh ? Dt(t, e) : t instanceof THREE.Line ? void 0 === e.__webglVertexBuffer && ((c = e).__webglVertexBuffer = y.createBuffer(),
                    c.__webglColorBuffer = y.createBuffer(),
                    c.__webglLineDistanceBuffer = y.createBuffer(),
                    H.info.memory.geometries++,
                    s = t,
                    h = (a = e).vertices.length,
                    a.__vertexArray = new Float32Array(3 * h),
                    a.__colorArray = new Float32Array(3 * h),
                    a.__lineDistanceArray = new Float32Array(1 * h),
                    a.__webglLineCount = h,
                    xt(s),
                    e.verticesNeedUpdate = !0,
                    e.colorsNeedUpdate = !0,
                    e.lineDistancesNeedUpdate = !0) : t instanceof THREE.PointCloud && void 0 === e.__webglVertexBuffer && ((o = e).__webglVertexBuffer = y.createBuffer(),
                    o.__webglColorBuffer = y.createBuffer(),
                    H.info.memory.geometries++,
                    i = t,
                    n = (r = e).vertices.length,
                    r.__vertexArray = new Float32Array(3 * n),
                    r.__colorArray = new Float32Array(3 * n),
                    r.__webglParticleCount = n,
                    xt(i),
                    e.verticesNeedUpdate = !0,
                    e.colorsNeedUpdate = !0));
                    var r, i, n;
                    var o;
                    var a, s, h;
                    var c;
                    if (void 0 === t.__webglActive)
                        if (t.__webglActive = !0,
                        t instanceof THREE.Mesh) {
                            if (e instanceof THREE.BufferGeometry)
                                zt(f, e, t);
                            else if (e instanceof THREE.Geometry)
                                for (var l = Ut[e.id], u = 0, E = l.length; u < E; u++)
                                    zt(f, l[u], t)
                        } else
                            t instanceof THREE.Line || t instanceof THREE.PointCloud ? zt(f, e, t) : (t instanceof THREE.ImmediateRenderObject || t.immediateRenderCallback) && (p = t,
                            m.push({
                                id: null,
                                object: p,
                                opaque: null,
                                transparent: null,
                                z: 0
                            }));
                    var p
                }(e),
                e instanceof THREE.Light)
                    d.push(e);
                else if (e instanceof THREE.Sprite)
                    v.push(e);
                else if (e instanceof THREE.LensFlare)
                    R.push(e);
                else {
                    var r = f[e.id];
                    if (r && (!1 === e.frustumCulled || !0 === V.intersectsObject(e)))
                        for (var i = 0, n = r.length; i < n; i++) {
                            var o = r[i];
                            Bt(o),
                            o.render = !0,
                            !0 === H.sortObjects && (z.setFromMatrixPosition(e.matrixWorld),
                            z.applyProjection(D),
                            o.z = z.z)
                        }
                }
                for (var i = 0, n = e.children.length; i < n; i++)
                    t(e.children[i])
            }(t),
            !0 === H.sortObjects && (T.sort(St),
            g.sort(Ct)),
            ct.render(t, e),
            H.info.render.calls = 0,
            H.info.render.vertices = 0,
            H.info.render.faces = 0,
            H.info.render.points = 0,
            this.setRenderTarget(r),
            (this.autoClear || i) && this.clear(this.autoClearColor, this.autoClearDepth, this.autoClearStencil);
            for (var a = 0, s = m.length; a < s; a++) {
                var h = m[a]
                  , c = h.object;
                c.visible && (Zt(c, e),
                Ft(h))
            }
            if (t.overrideMaterial) {
                var l = t.overrideMaterial;
                Wt(l),
                Lt(T, e, d, o, l),
                Lt(g, e, d, o, l),
                Pt(m, "", e, d, o, l)
            } else
                I.setBlending(THREE.NoBlending),
                Lt(T, e, d, o, null),
                Pt(m, "opaque", e, d, o, null),
                Lt(g, e, d, o, null),
                Pt(m, "transparent", e, d, o, null);
            lt.render(t, e),
            ut.render(t, e, B, U),
            r && r.generateMipmaps && r.minFilter !== THREE.NearestFilter && r.minFilter !== THREE.LinearFilter && ((n = r)instanceof THREE.WebGLRenderTargetCube ? (y.bindTexture(y.TEXTURE_CUBE_MAP, n.__webglTexture),
            y.generateMipmap(y.TEXTURE_CUBE_MAP),
            y.bindTexture(y.TEXTURE_CUBE_MAP, null)) : (y.bindTexture(y.TEXTURE_2D, n.__webglTexture),
            y.generateMipmap(y.TEXTURE_2D),
            y.bindTexture(y.TEXTURE_2D, null))),
            I.setDepthTest(!0),
            I.setDepthWrite(!0),
            I.setColorWrite(!0)
        } else
            THREE.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.")
    }
    ,
    this.renderImmediateObject = function(t, e, r, i, n) {
        var o = jt(t, e, r, i, n);
        _ = "",
        H.setMaterialFaces(i),
        n.immediateRenderCallback ? n.immediateRenderCallback(o, y, V) : n.render(function(t) {
            H.renderBufferImmediate(t, o, i)
        })
    }
    ;
    var Ut = {}
      , Vt = 0;
    function Dt(t, e) {
        var r = t.material
          , i = !1;
        void 0 !== Ut[e.id] && !0 !== e.groupsNeedUpdate || (delete f[t.id],
        Ut[e.id] = function(t, e) {
            for (var r, i, n = W.get("OES_element_index_uint") ? 4294967296 : 65535, o = {}, a = t.morphTargets.length, s = t.morphNormals.length, h = {}, c = [], l = 0, u = t.faces.length; l < u; l++) {
                var E = t.faces[l]
                  , p = e ? E.materialIndex : 0;
                p in o || (o[p] = {
                    hash: p,
                    counter: 0
                }),
                (r = o[p].hash + "_" + o[p].counter)in h || (i = {
                    id: Vt++,
                    faces3: [],
                    materialIndex: p,
                    vertices: 0,
                    numMorphTargets: a,
                    numMorphNormals: s
                },
                h[r] = i,
                c.push(i)),
                h[r].vertices + 3 > n && (o[p].counter += 1,
                (r = o[p].hash + "_" + o[p].counter)in h || (i = {
                    id: Vt++,
                    faces3: [],
                    materialIndex: p,
                    vertices: 0,
                    numMorphTargets: a,
                    numMorphNormals: s
                },
                h[r] = i,
                c.push(i))),
                h[r].faces3.push(l),
                h[r].vertices += 3
            }
            return c
        }(e, r instanceof THREE.MeshFaceMaterial),
        e.groupsNeedUpdate = !1);
        for (var n = Ut[e.id], o = 0, a = n.length; o < a; o++) {
            var s = n[o];
            void 0 === s.__webglVertexBuffer ? (Et(s),
            wt(s, t),
            e.verticesNeedUpdate = !0,
            e.morphTargetsNeedUpdate = !0,
            e.elementsNeedUpdate = !0,
            e.uvsNeedUpdate = !0,
            e.normalsNeedUpdate = !0,
            e.tangentsNeedUpdate = !0,
            e.colorsNeedUpdate = !0,
            i = !0) : i = !1,
            (i || void 0 === t.__webglActive) && zt(f, s, t)
        }
        t.__webglActive = !0
    }
    function zt(t, e, r) {
        var i = r.id;
        t[i] = t[i] || [],
        t[i].push({
            id: i,
            buffer: e,
            object: r,
            material: null,
            z: 0
        })
    }
    function kt(t) {
        var e = t.geometry;
        if (e instanceof THREE.BufferGeometry)
            for (var r = e.attributes, i = e.attributesKeys, n = 0, o = i.length; n < o; n++) {
                var a = i[n]
                  , s = r[a]
                  , h = "index" === a ? y.ELEMENT_ARRAY_BUFFER : y.ARRAY_BUFFER;
                void 0 === s.buffer ? (s.buffer = y.createBuffer(),
                y.bindBuffer(h, s.buffer),
                y.bufferData(h, s.array, s instanceof THREE.DynamicBufferAttribute ? y.DYNAMIC_DRAW : y.STATIC_DRAW),
                s.needsUpdate = !1) : !0 === s.needsUpdate && (y.bindBuffer(h, s.buffer),
                void 0 === s.updateRange || -1 === s.updateRange.count ? y.bufferSubData(h, 0, s.array) : 0 === s.updateRange.count ? console.error("THREE.WebGLRenderer.updateObject: using updateRange for THREE.DynamicBufferAttribute and marked as needsUpdate but count is 0, ensure you are using set methods or updating manually.") : (y.bufferSubData(h, s.updateRange.offset * s.array.BYTES_PER_ELEMENT, s.array.subarray(s.updateRange.offset, s.updateRange.offset + s.updateRange.count)),
                s.updateRange.count = 0),
                s.needsUpdate = !1)
            }
        else if (t instanceof THREE.Mesh) {
            !0 === e.groupsNeedUpdate && Dt(t, e);
            for (var c = Ut[e.id], l = (n = 0,
            c.length); n < l; n++) {
                var u = c[n]
                  , E = (p = bt(t, u)).attributes && Nt(p);
                (e.verticesNeedUpdate || e.morphTargetsNeedUpdate || e.elementsNeedUpdate || e.uvsNeedUpdate || e.normalsNeedUpdate || e.colorsNeedUpdate || e.tangentsNeedUpdate || E) && Mt(u, t, y.DYNAMIC_DRAW, !e.dynamic, p)
            }
            e.verticesNeedUpdate = !1,
            e.morphTargetsNeedUpdate = !1,
            e.elementsNeedUpdate = !1,
            e.uvsNeedUpdate = !1,
            e.normalsNeedUpdate = !1,
            e.colorsNeedUpdate = !1,
            e.tangentsNeedUpdate = !1,
            p.attributes && Ot(p)
        } else if (t instanceof THREE.Line) {
            E = (p = bt(t, e)).attributes && Nt(p);
            (e.verticesNeedUpdate || e.colorsNeedUpdate || e.lineDistancesNeedUpdate || E) && function(t, e) {
                var r, i, n, o, a, s, h, c, l, u, E, p, d = t.vertices, f = t.colors, m = t.lineDistances, T = d.length, g = f.length, v = m.length, R = t.__vertexArray, H = t.__colorArray, x = t.__lineDistanceArray, w = t.verticesNeedUpdate, b = t.colorsNeedUpdate, M = t.lineDistancesNeedUpdate, _ = t.__webglCustomAttributesList;
                if (w) {
                    for (r = 0; r < T; r++)
                        o = d[r],
                        R[a = 3 * r] = o.x,
                        R[a + 1] = o.y,
                        R[a + 2] = o.z;
                    y.bindBuffer(y.ARRAY_BUFFER, t.__webglVertexBuffer),
                    y.bufferData(y.ARRAY_BUFFER, R, e)
                }
                if (b) {
                    for (i = 0; i < g; i++)
                        s = f[i],
                        H[a = 3 * i] = s.r,
                        H[a + 1] = s.g,
                        H[a + 2] = s.b;
                    y.bindBuffer(y.ARRAY_BUFFER, t.__webglColorBuffer),
                    y.bufferData(y.ARRAY_BUFFER, H, e)
                }
                if (M) {
                    for (n = 0; n < v; n++)
                        x[n] = m[n];
                    y.bindBuffer(y.ARRAY_BUFFER, t.__webglLineDistanceBuffer),
                    y.bufferData(y.ARRAY_BUFFER, x, e)
                }
                if (_)
                    for (h = 0,
                    c = _.length; h < c; h++)
                        if ((p = _[h]).needsUpdate && (void 0 === p.boundTo || "vertices" === p.boundTo)) {
                            if (a = 0,
                            u = p.value.length,
                            1 === p.size)
                                for (l = 0; l < u; l++)
                                    p.array[l] = p.value[l];
                            else if (2 === p.size)
                                for (l = 0; l < u; l++)
                                    E = p.value[l],
                                    p.array[a] = E.x,
                                    p.array[a + 1] = E.y,
                                    a += 2;
                            else if (3 === p.size)
                                if ("c" === p.type)
                                    for (l = 0; l < u; l++)
                                        E = p.value[l],
                                        p.array[a] = E.r,
                                        p.array[a + 1] = E.g,
                                        p.array[a + 2] = E.b,
                                        a += 3;
                                else
                                    for (l = 0; l < u; l++)
                                        E = p.value[l],
                                        p.array[a] = E.x,
                                        p.array[a + 1] = E.y,
                                        p.array[a + 2] = E.z,
                                        a += 3;
                            else if (4 === p.size)
                                for (l = 0; l < u; l++)
                                    E = p.value[l],
                                    p.array[a] = E.x,
                                    p.array[a + 1] = E.y,
                                    p.array[a + 2] = E.z,
                                    p.array[a + 3] = E.w,
                                    a += 4;
                            y.bindBuffer(y.ARRAY_BUFFER, p.buffer),
                            y.bufferData(y.ARRAY_BUFFER, p.array, e),
                            p.needsUpdate = !1
                        }
            }(e, y.DYNAMIC_DRAW),
            e.verticesNeedUpdate = !1,
            e.colorsNeedUpdate = !1,
            e.lineDistancesNeedUpdate = !1,
            p.attributes && Ot(p)
        } else if (t instanceof THREE.PointCloud) {
            var p;
            E = (p = bt(t, e)).attributes && Nt(p);
            (e.verticesNeedUpdate || e.colorsNeedUpdate || E) && function(t, e, r) {
                var i, n, o, a, s, h, c, l, u, E, p, d = t.vertices, f = d.length, m = t.colors, T = m.length, g = t.__vertexArray, v = t.__colorArray, R = t.verticesNeedUpdate, H = t.colorsNeedUpdate, x = t.__webglCustomAttributesList;
                if (R) {
                    for (i = 0; i < f; i++)
                        o = d[i],
                        g[a = 3 * i] = o.x,
                        g[a + 1] = o.y,
                        g[a + 2] = o.z;
                    y.bindBuffer(y.ARRAY_BUFFER, t.__webglVertexBuffer),
                    y.bufferData(y.ARRAY_BUFFER, g, e)
                }
                if (H) {
                    for (n = 0; n < T; n++)
                        s = m[n],
                        v[a = 3 * n] = s.r,
                        v[a + 1] = s.g,
                        v[a + 2] = s.b;
                    y.bindBuffer(y.ARRAY_BUFFER, t.__webglColorBuffer),
                    y.bufferData(y.ARRAY_BUFFER, v, e)
                }
                if (x)
                    for (h = 0,
                    c = x.length; h < c; h++) {
                        if ((p = x[h]).needsUpdate && (void 0 === p.boundTo || "vertices" === p.boundTo))
                            if (u = p.value.length,
                            a = 0,
                            1 === p.size)
                                for (l = 0; l < u; l++)
                                    p.array[l] = p.value[l];
                            else if (2 === p.size)
                                for (l = 0; l < u; l++)
                                    E = p.value[l],
                                    p.array[a] = E.x,
                                    p.array[a + 1] = E.y,
                                    a += 2;
                            else if (3 === p.size)
                                if ("c" === p.type)
                                    for (l = 0; l < u; l++)
                                        E = p.value[l],
                                        p.array[a] = E.r,
                                        p.array[a + 1] = E.g,
                                        p.array[a + 2] = E.b,
                                        a += 3;
                                else
                                    for (l = 0; l < u; l++)
                                        E = p.value[l],
                                        p.array[a] = E.x,
                                        p.array[a + 1] = E.y,
                                        p.array[a + 2] = E.z,
                                        a += 3;
                            else if (4 === p.size)
                                for (l = 0; l < u; l++)
                                    E = p.value[l],
                                    p.array[a] = E.x,
                                    p.array[a + 1] = E.y,
                                    p.array[a + 2] = E.z,
                                    p.array[a + 3] = E.w,
                                    a += 4;
                        y.bindBuffer(y.ARRAY_BUFFER, p.buffer),
                        y.bufferData(y.ARRAY_BUFFER, p.array, e),
                        p.needsUpdate = !1
                    }
            }(e, y.DYNAMIC_DRAW),
            e.verticesNeedUpdate = !1,
            e.colorsNeedUpdate = !1,
            p.attributes && Ot(p)
        }
    }
    function Nt(t) {
        for (var e in t.attributes)
            if (t.attributes[e].needsUpdate)
                return !0;
        return !1
    }
    function Ot(t) {
        for (var e in t.attributes)
            t.attributes[e].needsUpdate = !1
    }
    var Gt = {
        MeshDepthMaterial: "depth",
        MeshNormalMaterial: "normal",
        MeshBasicMaterial: "basic",
        MeshLambertMaterial: "lambert",
        MeshPhongMaterial: "phong",
        LineBasicMaterial: "basic",
        LineDashedMaterial: "dashed",
        PointCloudMaterial: "particle_basic"
    };
    function It(t, e, r, i) {
        t.addEventListener("dispose", Tt);
        var o = Gt[t.type];
        if (o) {
            var a = THREE.ShaderLib[o];
            t.__webglShader = {
                uniforms: THREE.UniformsUtils.clone(a.uniforms),
                vertexShader: a.vertexShader,
                fragmentShader: a.fragmentShader
            }
        } else
            t.__webglShader = {
                uniforms: t.uniforms,
                vertexShader: t.vertexShader,
                fragmentShader: t.fragmentShader
            };
        var s = function(t) {
            for (var e = 0, r = 0, i = 0, n = 0, o = 0, a = t.length; o < a; o++) {
                var s = t[o];
                s.onlyShadow || !1 === s.visible || (s instanceof THREE.DirectionalLight && e++,
                s instanceof THREE.PointLight && r++,
                s instanceof THREE.SpotLight && i++,
                s instanceof THREE.HemisphereLight && n++)
            }
            return {
                directional: e,
                point: r,
                spot: i,
                hemi: n
            }
        }(e)
          , h = function(t) {
            for (var e = 0, r = 0, i = t.length; r < i; r++) {
                var n = t[r];
                n.castShadow && (n instanceof THREE.SpotLight && e++,
                n instanceof THREE.DirectionalLight && !n.shadowCascade && e++)
            }
            return e
        }(e)
          , c = function(t) {
            {
                if (tt && t && t.skeleton && t.skeleton.useVertexTexture)
                    return 1024;
                var e = y.getParameter(y.MAX_VERTEX_UNIFORM_VECTORS)
                  , r = Math.floor((e - 20) / 4)
                  , i = r;
                return void 0 !== t && t instanceof THREE.SkinnedMesh && (i = Math.min(t.skeleton.bones.length, i)) < t.skeleton.bones.length && THREE.warn("WebGLRenderer: too many bones - " + t.skeleton.bones.length + ", this GPU supports just " + i + " (try OpenGL instead of ANGLE)"),
                i
            }
        }(i)
          , l = {
            precision: n,
            supportsVertexTextures: $,
            map: !!t.map,
            envMap: !!t.envMap,
            envMapMode: t.envMap && t.envMap.mapping,
            lightMap: !!t.lightMap,
            bumpMap: !!t.bumpMap,
            normalMap: !!t.normalMap,
            specularMap: !!t.specularMap,
            alphaMap: !!t.alphaMap,
            combine: t.combine,
            vertexColors: t.vertexColors,
            fog: r,
            useFog: t.fog,
            fogExp: r instanceof THREE.FogExp2,
            flatShading: t.shading === THREE.FlatShading,
            sizeAttenuation: t.sizeAttenuation,
            logarithmicDepthBuffer: u,
            skinning: t.skinning,
            maxBones: c,
            useVertexTexture: tt && i && i.skeleton && i.skeleton.useVertexTexture,
            morphTargets: t.morphTargets,
            morphNormals: t.morphNormals,
            maxMorphTargets: H.maxMorphTargets,
            maxMorphNormals: H.maxMorphNormals,
            maxDirLights: s.directional,
            maxPointLights: s.point,
            maxSpotLights: s.spot,
            maxHemiLights: s.hemi,
            maxShadows: h,
            shadowMapEnabled: H.shadowMapEnabled && i.receiveShadow && h > 0,
            shadowMapType: H.shadowMapType,
            shadowMapDebug: H.shadowMapDebug,
            shadowMapCascade: H.shadowMapCascade,
            alphaTest: t.alphaTest,
            metal: t.metal,
            wrapAround: t.wrapAround,
            doubleSided: t.side === THREE.DoubleSide,
            flipSided: t.side === THREE.BackSide
        }
          , E = [];
        if (o ? E.push(o) : (E.push(t.fragmentShader),
        E.push(t.vertexShader)),
        void 0 !== t.defines)
            for (var p in t.defines)
                E.push(p),
                E.push(t.defines[p]);
        for (var p in l)
            E.push(p),
            E.push(l[p]);
        for (var d, f = E.join(), m = 0, T = x.length; m < T; m++) {
            var g = x[m];
            if (g.code === f) {
                (d = g).usedTimes++;
                break
            }
        }
        void 0 === d && (d = new THREE.WebGLProgram(H,f,t,l),
        x.push(d),
        H.info.memory.programs = x.length),
        t.program = d;
        var v = d.attributes;
        if (t.morphTargets) {
            t.numSupportedMorphTargets = 0;
            for (var R = "morphTarget", w = 0; w < H.maxMorphTargets; w++)
                v[R + w] >= 0 && t.numSupportedMorphTargets++
        }
        if (t.morphNormals) {
            t.numSupportedMorphNormals = 0;
            R = "morphNormal";
            for (w = 0; w < H.maxMorphNormals; w++)
                v[R + w] >= 0 && t.numSupportedMorphNormals++
        }
        t.uniformsList = [];
        for (var b in t.__webglShader.uniforms) {
            var M = t.program.uniforms[b];
            M && t.uniformsList.push([t.__webglShader.uniforms[b], M])
        }
    }
    function Wt(t) {
        !0 === t.transparent ? I.setBlending(t.blending, t.blendEquation, t.blendSrc, t.blendDst, t.blendEquationAlpha, t.blendSrcAlpha, t.blendDstAlpha) : I.setBlending(THREE.NoBlending),
        I.setDepthTest(t.depthTest),
        I.setDepthWrite(t.depthWrite),
        I.setColorWrite(t.colorWrite),
        I.setPolygonOffset(t.polygonOffset, t.polygonOffsetFactor, t.polygonOffsetUnits)
    }
    function jt(t, r, i, n, o) {
        C = 0,
        n.needsUpdate && (n.program && Ht(n),
        It(n, r, i, o),
        n.needsUpdate = !1),
        n.morphTargets && (o.__webglMorphTargetInfluences || (o.__webglMorphTargetInfluences = new Float32Array(H.maxMorphTargets)));
        var a, s, h, c, l, E, p, d, f, m, T, g, v = !1, R = !1, x = !1, b = n.program, _ = b.uniforms, A = n.__webglShader.uniforms;
        if (b.id !== w && (y.useProgram(b.program),
        w = b.id,
        v = !0,
        R = !0,
        x = !0),
        n.id !== M && (-1 === M && (x = !0),
        M = n.id,
        R = !0),
        (v || t !== S) && (y.uniformMatrix4fv(_.projectionMatrix, !1, t.projectionMatrix.elements),
        u && y.uniform1f(_.logDepthBufFC, 2 / (Math.log(t.far + 1) / Math.LN2)),
        t !== S && (S = t),
        (n instanceof THREE.ShaderMaterial || n instanceof THREE.MeshPhongMaterial || n.envMap) && null !== _.cameraPosition && (z.setFromMatrixPosition(t.matrixWorld),
        y.uniform3f(_.cameraPosition, z.x, z.y, z.z)),
        (n instanceof THREE.MeshPhongMaterial || n instanceof THREE.MeshLambertMaterial || n instanceof THREE.MeshBasicMaterial || n instanceof THREE.ShaderMaterial || n.skinning) && null !== _.viewMatrix && y.uniformMatrix4fv(_.viewMatrix, !1, t.matrixWorldInverse.elements)),
        n.skinning)
            if (o.bindMatrix && null !== _.bindMatrix && y.uniformMatrix4fv(_.bindMatrix, !1, o.bindMatrix.elements),
            o.bindMatrixInverse && null !== _.bindMatrixInverse && y.uniformMatrix4fv(_.bindMatrixInverse, !1, o.bindMatrixInverse.elements),
            tt && o.skeleton && o.skeleton.useVertexTexture) {
                if (null !== _.boneTexture) {
                    var L = qt();
                    y.uniform1i(_.boneTexture, L),
                    H.setTexture(o.skeleton.boneTexture, L)
                }
                null !== _.boneTextureWidth && y.uniform1i(_.boneTextureWidth, o.skeleton.boneTextureWidth),
                null !== _.boneTextureHeight && y.uniform1i(_.boneTextureHeight, o.skeleton.boneTextureHeight)
            } else
                o.skeleton && o.skeleton.boneMatrices && null !== _.boneGlobalMatrices && y.uniformMatrix4fv(_.boneGlobalMatrices, !1, o.skeleton.boneMatrices);
        return R && (i && n.fog && (m = i,
        (f = A).fogColor.value = m.color,
        m instanceof THREE.Fog ? (f.fogNear.value = m.near,
        f.fogFar.value = m.far) : m instanceof THREE.FogExp2 && (f.fogDensity.value = m.density)),
        (n instanceof THREE.MeshPhongMaterial || n instanceof THREE.MeshLambertMaterial || n.lights) && (N && (x = !0,
        function(t) {
            var e, r, i, n, o, a, s, h, c = 0, l = 0, u = 0, E = O, p = E.directional.colors, d = E.directional.positions, f = E.point.colors, m = E.point.positions, T = E.point.distances, g = E.point.decays, v = E.spot.colors, R = E.spot.positions, y = E.spot.distances, H = E.spot.directions, x = E.spot.anglesCos, w = E.spot.exponents, b = E.spot.decays, M = E.hemi.skyColors, _ = E.hemi.groundColors, S = E.hemi.positions, C = 0, A = 0, L = 0, P = 0, F = 0, B = 0, U = 0, V = 0, D = 0, N = 0, G = 0, I = 0;
            for (e = 0,
            r = t.length; e < r; e++)
                if (!(i = t[e]).onlyShadow)
                    if (n = i.color,
                    s = i.intensity,
                    h = i.distance,
                    i instanceof THREE.AmbientLight) {
                        if (!i.visible)
                            continue;
                        c += n.r,
                        l += n.g,
                        u += n.b
                    } else if (i instanceof THREE.DirectionalLight) {
                        if (F += 1,
                        !i.visible)
                            continue;
                        k.setFromMatrixPosition(i.matrixWorld),
                        z.setFromMatrixPosition(i.target.matrixWorld),
                        k.sub(z),
                        k.normalize(),
                        d[D = 3 * C] = k.x,
                        d[D + 1] = k.y,
                        d[D + 2] = k.z,
                        Kt(p, D, n, s),
                        C += 1
                    } else if (i instanceof THREE.PointLight) {
                        if (B += 1,
                        !i.visible)
                            continue;
                        Kt(f, N = 3 * A, n, s),
                        z.setFromMatrixPosition(i.matrixWorld),
                        m[N] = z.x,
                        m[N + 1] = z.y,
                        m[N + 2] = z.z,
                        T[A] = h,
                        g[A] = 0 === i.distance ? 0 : i.decay,
                        A += 1
                    } else if (i instanceof THREE.SpotLight) {
                        if (U += 1,
                        !i.visible)
                            continue;
                        Kt(v, G = 3 * L, n, s),
                        k.setFromMatrixPosition(i.matrixWorld),
                        R[G] = k.x,
                        R[G + 1] = k.y,
                        R[G + 2] = k.z,
                        y[L] = h,
                        z.setFromMatrixPosition(i.target.matrixWorld),
                        k.sub(z),
                        k.normalize(),
                        H[G] = k.x,
                        H[G + 1] = k.y,
                        H[G + 2] = k.z,
                        x[L] = Math.cos(i.angle),
                        w[L] = i.exponent,
                        b[L] = 0 === i.distance ? 0 : i.decay,
                        L += 1
                    } else if (i instanceof THREE.HemisphereLight) {
                        if (V += 1,
                        !i.visible)
                            continue;
                        k.setFromMatrixPosition(i.matrixWorld),
                        k.normalize(),
                        S[I = 3 * P] = k.x,
                        S[I + 1] = k.y,
                        S[I + 2] = k.z,
                        o = i.color,
                        a = i.groundColor,
                        Kt(M, I, o, s),
                        Kt(_, I, a, s),
                        P += 1
                    }
            for (e = 3 * C,
            r = Math.max(p.length, 3 * F); e < r; e++)
                p[e] = 0;
            for (e = 3 * A,
            r = Math.max(f.length, 3 * B); e < r; e++)
                f[e] = 0;
            for (e = 3 * L,
            r = Math.max(v.length, 3 * U); e < r; e++)
                v[e] = 0;
            for (e = 3 * P,
            r = Math.max(M.length, 3 * V); e < r; e++)
                M[e] = 0;
            for (e = 3 * P,
            r = Math.max(_.length, 3 * V); e < r; e++)
                _[e] = 0;
            E.directional.length = C,
            E.point.length = A,
            E.spot.length = L,
            E.hemi.length = P,
            E.ambient[0] = c,
            E.ambient[1] = l,
            E.ambient[2] = u
        }(r),
        N = !1),
        x ? (d = O,
        (p = A).ambientLightColor.value = d.ambient,
        p.directionalLightColor.value = d.directional.colors,
        p.directionalLightDirection.value = d.directional.positions,
        p.pointLightColor.value = d.point.colors,
        p.pointLightPosition.value = d.point.positions,
        p.pointLightDistance.value = d.point.distances,
        p.pointLightDecay.value = d.point.decays,
        p.spotLightColor.value = d.spot.colors,
        p.spotLightPosition.value = d.spot.positions,
        p.spotLightDistance.value = d.spot.distances,
        p.spotLightDirection.value = d.spot.directions,
        p.spotLightAngleCos.value = d.spot.anglesCos,
        p.spotLightExponent.value = d.spot.exponents,
        p.spotLightDecay.value = d.spot.decays,
        p.hemisphereLightSkyColor.value = d.hemi.skyColors,
        p.hemisphereLightGroundColor.value = d.hemi.groundColors,
        p.hemisphereLightDirection.value = d.hemi.positions,
        Yt(A, !0)) : Yt(A, !1)),
        (n instanceof THREE.MeshBasicMaterial || n instanceof THREE.MeshLambertMaterial || n instanceof THREE.MeshPhongMaterial) && function(t, e) {
            t.opacity.value = e.opacity,
            t.diffuse.value = e.color,
            t.map.value = e.map,
            t.lightMap.value = e.lightMap,
            t.specularMap.value = e.specularMap,
            t.alphaMap.value = e.alphaMap,
            e.bumpMap && (t.bumpMap.value = e.bumpMap,
            t.bumpScale.value = e.bumpScale);
            e.normalMap && (t.normalMap.value = e.normalMap,
            t.normalScale.value.copy(e.normalScale));
            var r;
            e.map ? r = e.map : e.specularMap ? r = e.specularMap : e.normalMap ? r = e.normalMap : e.bumpMap ? r = e.bumpMap : e.alphaMap && (r = e.alphaMap);
            if (void 0 !== r) {
                var i = r.offset
                  , n = r.repeat;
                t.offsetRepeat.value.set(i.x, i.y, n.x, n.y)
            }
            t.envMap.value = e.envMap,
            t.flipEnvMap.value = e.envMap instanceof THREE.WebGLRenderTargetCube ? 1 : -1,
            t.reflectivity.value = e.reflectivity,
            t.refractionRatio.value = e.refractionRatio
        }(A, n),
        n instanceof THREE.LineBasicMaterial ? Xt(A, n) : n instanceof THREE.LineDashedMaterial ? (Xt(A, n),
        E = n,
        (l = A).dashSize.value = E.dashSize,
        l.totalSize.value = E.dashSize + E.gapSize,
        l.scale.value = E.scale) : n instanceof THREE.PointCloudMaterial ? function(t, r) {
            if (t.psColor.value = r.color,
            t.opacity.value = r.opacity,
            t.size.value = r.size,
            t.scale.value = e.height / 2,
            t.map.value = r.map,
            null !== r.map) {
                var i = r.map.offset
                  , n = r.map.repeat;
                t.offsetRepeat.value.set(i.x, i.y, n.x, n.y)
            }
        }(A, n) : n instanceof THREE.MeshPhongMaterial ? (c = n,
        (h = A).shininess.value = c.shininess,
        h.emissive.value = c.emissive,
        h.specular.value = c.specular,
        c.wrapAround && h.wrapRGB.value.copy(c.wrapRGB)) : n instanceof THREE.MeshLambertMaterial ? (s = n,
        (a = A).emissive.value = s.emissive,
        s.wrapAround && a.wrapRGB.value.copy(s.wrapRGB)) : n instanceof THREE.MeshDepthMaterial ? (A.mNear.value = t.near,
        A.mFar.value = t.far,
        A.opacity.value = n.opacity) : n instanceof THREE.MeshNormalMaterial && (A.opacity.value = n.opacity),
        o.receiveShadow && !n._shadowPass && function(t, e) {
            if (t.shadowMatrix)
                for (var r = 0, i = 0, n = e.length; i < n; i++) {
                    var o = e[i];
                    o.castShadow && ((o instanceof THREE.SpotLight || o instanceof THREE.DirectionalLight && !o.shadowCascade) && (t.shadowMap.value[r] = o.shadowMap,
                    t.shadowMapSize.value[r] = o.shadowMapSize,
                    t.shadowMatrix.value[r] = o.shadowMatrix,
                    t.shadowDarkness.value[r] = o.shadowDarkness,
                    t.shadowBias.value[r] = o.shadowBias,
                    r++))
                }
        }(A, r),
        function(t) {
            for (var e, r, i, n = 0, o = t.length; n < o; n++) {
                var a = t[n][0];
                if (!1 !== a.needsUpdate) {
                    var s = a.type
                      , h = a.value
                      , c = t[n][1];
                    switch (s) {
                    case "1i":
                        y.uniform1i(c, h);
                        break;
                    case "1f":
                        y.uniform1f(c, h);
                        break;
                    case "2f":
                        y.uniform2f(c, h[0], h[1]);
                        break;
                    case "3f":
                        y.uniform3f(c, h[0], h[1], h[2]);
                        break;
                    case "4f":
                        y.uniform4f(c, h[0], h[1], h[2], h[3]);
                        break;
                    case "1iv":
                        y.uniform1iv(c, h);
                        break;
                    case "3iv":
                        y.uniform3iv(c, h);
                        break;
                    case "1fv":
                        y.uniform1fv(c, h);
                        break;
                    case "2fv":
                        y.uniform2fv(c, h);
                        break;
                    case "3fv":
                        y.uniform3fv(c, h);
                        break;
                    case "4fv":
                        y.uniform4fv(c, h);
                        break;
                    case "Matrix3fv":
                        y.uniformMatrix3fv(c, !1, h);
                        break;
                    case "Matrix4fv":
                        y.uniformMatrix4fv(c, !1, h);
                        break;
                    case "i":
                        y.uniform1i(c, h);
                        break;
                    case "f":
                        y.uniform1f(c, h);
                        break;
                    case "v2":
                        y.uniform2f(c, h.x, h.y);
                        break;
                    case "v3":
                        y.uniform3f(c, h.x, h.y, h.z);
                        break;
                    case "v4":
                        y.uniform4f(c, h.x, h.y, h.z, h.w);
                        break;
                    case "c":
                        y.uniform3f(c, h.r, h.g, h.b);
                        break;
                    case "iv1":
                        y.uniform1iv(c, h);
                        break;
                    case "iv":
                        y.uniform3iv(c, h);
                        break;
                    case "fv1":
                        y.uniform1fv(c, h);
                        break;
                    case "fv":
                        y.uniform3fv(c, h);
                        break;
                    case "v2v":
                        void 0 === a._array && (a._array = new Float32Array(2 * h.length));
                        for (var l = 0, u = h.length; l < u; l++)
                            i = 2 * l,
                            a._array[i] = h[l].x,
                            a._array[i + 1] = h[l].y;
                        y.uniform2fv(c, a._array);
                        break;
                    case "v3v":
                        void 0 === a._array && (a._array = new Float32Array(3 * h.length));
                        for (var l = 0, u = h.length; l < u; l++)
                            i = 3 * l,
                            a._array[i] = h[l].x,
                            a._array[i + 1] = h[l].y,
                            a._array[i + 2] = h[l].z;
                        y.uniform3fv(c, a._array);
                        break;
                    case "v4v":
                        void 0 === a._array && (a._array = new Float32Array(4 * h.length));
                        for (var l = 0, u = h.length; l < u; l++)
                            i = 4 * l,
                            a._array[i] = h[l].x,
                            a._array[i + 1] = h[l].y,
                            a._array[i + 2] = h[l].z,
                            a._array[i + 3] = h[l].w;
                        y.uniform4fv(c, a._array);
                        break;
                    case "m3":
                        y.uniformMatrix3fv(c, !1, h.elements);
                        break;
                    case "m3v":
                        void 0 === a._array && (a._array = new Float32Array(9 * h.length));
                        for (var l = 0, u = h.length; l < u; l++)
                            h[l].flattenToArrayOffset(a._array, 9 * l);
                        y.uniformMatrix3fv(c, !1, a._array);
                        break;
                    case "m4":
                        y.uniformMatrix4fv(c, !1, h.elements);
                        break;
                    case "m4v":
                        void 0 === a._array && (a._array = new Float32Array(16 * h.length));
                        for (var l = 0, u = h.length; l < u; l++)
                            h[l].flattenToArrayOffset(a._array, 16 * l);
                        y.uniformMatrix4fv(c, !1, a._array);
                        break;
                    case "t":
                        if (e = h,
                        r = qt(),
                        y.uniform1i(c, r),
                        !e)
                            continue;
                        e instanceof THREE.CubeTexture || e.image instanceof Array && 6 === e.image.length ? $t(e, r) : e instanceof THREE.WebGLRenderTargetCube ? te(e, r) : H.setTexture(e, r);
                        break;
                    case "tv":
                        void 0 === a._array && (a._array = []);
                        for (var l = 0, u = a.value.length; l < u; l++)
                            a._array[l] = qt();
                        y.uniform1iv(c, a._array);
                        for (var l = 0, u = a.value.length; l < u; l++)
                            e = a.value[l],
                            r = a._array[l],
                            e && H.setTexture(e, r);
                        break;
                    default:
                        THREE.warn("THREE.WebGLRenderer: Unknown uniform type: " + s)
                    }
                }
            }
        }(n.uniformsList)),
        T = _,
        g = o,
        y.uniformMatrix4fv(T.modelViewMatrix, !1, g._modelViewMatrix.elements),
        T.normalMatrix && y.uniformMatrix3fv(T.normalMatrix, !1, g._normalMatrix.elements),
        null !== _.modelMatrix && y.uniformMatrix4fv(_.modelMatrix, !1, o.matrixWorld.elements),
        b
    }
    function Xt(t, e) {
        t.diffuse.value = e.color,
        t.opacity.value = e.opacity
    }
    function Yt(t, e) {
        t.ambientLightColor.needsUpdate = e,
        t.directionalLightColor.needsUpdate = e,
        t.directionalLightDirection.needsUpdate = e,
        t.pointLightColor.needsUpdate = e,
        t.pointLightPosition.needsUpdate = e,
        t.pointLightDistance.needsUpdate = e,
        t.pointLightDecay.needsUpdate = e,
        t.spotLightColor.needsUpdate = e,
        t.spotLightPosition.needsUpdate = e,
        t.spotLightDistance.needsUpdate = e,
        t.spotLightDirection.needsUpdate = e,
        t.spotLightAngleCos.needsUpdate = e,
        t.spotLightExponent.needsUpdate = e,
        t.spotLightDecay.needsUpdate = e,
        t.hemisphereLightSkyColor.needsUpdate = e,
        t.hemisphereLightGroundColor.needsUpdate = e,
        t.hemisphereLightDirection.needsUpdate = e
    }
    function qt() {
        var t = C;
        return t >= Z && THREE.warn("WebGLRenderer: trying to use " + t + " texture units while this GPU supports only " + Z),
        C += 1,
        t
    }
    function Zt(t, e) {
        t._modelViewMatrix.multiplyMatrices(e.matrixWorldInverse, t.matrixWorld),
        t._normalMatrix.getNormalMatrix(t._modelViewMatrix)
    }
    function Kt(t, e, r, i) {
        t[e] = r.r * i,
        t[e + 1] = r.g * i,
        t[e + 2] = r.b * i
    }
    function Qt(t, e, r) {
        var i;
        r ? (y.texParameteri(t, y.TEXTURE_WRAP_S, ne(e.wrapS)),
        y.texParameteri(t, y.TEXTURE_WRAP_T, ne(e.wrapT)),
        y.texParameteri(t, y.TEXTURE_MAG_FILTER, ne(e.magFilter)),
        y.texParameteri(t, y.TEXTURE_MIN_FILTER, ne(e.minFilter))) : (y.texParameteri(t, y.TEXTURE_WRAP_S, y.CLAMP_TO_EDGE),
        y.texParameteri(t, y.TEXTURE_WRAP_T, y.CLAMP_TO_EDGE),
        e.wrapS === THREE.ClampToEdgeWrapping && e.wrapT === THREE.ClampToEdgeWrapping || THREE.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping. ( " + e.sourceFile + " )"),
        y.texParameteri(t, y.TEXTURE_MAG_FILTER, ie(e.magFilter)),
        y.texParameteri(t, y.TEXTURE_MIN_FILTER, ie(e.minFilter)),
        e.minFilter !== THREE.NearestFilter && e.minFilter !== THREE.LinearFilter && THREE.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter. ( " + e.sourceFile + " )")),
        (i = W.get("EXT_texture_filter_anisotropic")) && e.type !== THREE.FloatType && e.type !== THREE.HalfFloatType && (e.anisotropy > 1 || e.__currentAnisotropy) && (y.texParameterf(t, i.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(e.anisotropy, H.getMaxAnisotropy())),
        e.__currentAnisotropy = e.anisotropy)
    }
    function Jt(t, e) {
        if (t.width > e || t.height > e) {
            var r = e / Math.max(t.width, t.height)
              , i = document.createElement("canvas");
            return i.width = Math.floor(t.width * r),
            i.height = Math.floor(t.height * r),
            i.getContext("2d").drawImage(t, 0, 0, t.width, t.height, 0, 0, i.width, i.height),
            THREE.warn("THREE.WebGLRenderer: image is too big (" + t.width + "x" + t.height + "). Resized to " + i.width + "x" + i.height, t),
            i
        }
        return t
    }
    function $t(t, e) {
        if (6 === t.image.length)
            if (t.needsUpdate) {
                t.image.__webglTextureCube || (t.addEventListener("dispose", ft),
                t.image.__webglTextureCube = y.createTexture(),
                H.info.memory.textures++),
                y.activeTexture(y.TEXTURE0 + e),
                y.bindTexture(y.TEXTURE_CUBE_MAP, t.image.__webglTextureCube),
                y.pixelStorei(y.UNPACK_FLIP_Y_WEBGL, t.flipY);
                for (var r = t instanceof THREE.CompressedTexture, i = t.image[0]instanceof THREE.DataTexture, n = [], o = 0; o < 6; o++)
                    !H.autoScaleCubemaps || r || i ? n[o] = i ? t.image[o].image : t.image[o] : n[o] = Jt(t.image[o], J);
                var a = n[0]
                  , s = THREE.Math.isPowerOfTwo(a.width) && THREE.Math.isPowerOfTwo(a.height)
                  , h = ne(t.format)
                  , c = ne(t.type);
                Qt(y.TEXTURE_CUBE_MAP, t, s);
                for (o = 0; o < 6; o++)
                    if (r)
                        for (var l, u = n[o].mipmaps, E = 0, p = u.length; E < p; E++)
                            l = u[E],
                            t.format !== THREE.RGBAFormat && t.format !== THREE.RGBFormat ? ot().indexOf(h) > -1 ? y.compressedTexImage2D(y.TEXTURE_CUBE_MAP_POSITIVE_X + o, E, h, l.width, l.height, 0, l.data) : THREE.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setCubeTexture()") : y.texImage2D(y.TEXTURE_CUBE_MAP_POSITIVE_X + o, E, h, l.width, l.height, 0, h, c, l.data);
                    else
                        i ? y.texImage2D(y.TEXTURE_CUBE_MAP_POSITIVE_X + o, 0, h, n[o].width, n[o].height, 0, h, c, n[o].data) : y.texImage2D(y.TEXTURE_CUBE_MAP_POSITIVE_X + o, 0, h, h, c, n[o]);
                t.generateMipmaps && s && y.generateMipmap(y.TEXTURE_CUBE_MAP),
                t.needsUpdate = !1,
                t.onUpdate && t.onUpdate()
            } else
                y.activeTexture(y.TEXTURE0 + e),
                y.bindTexture(y.TEXTURE_CUBE_MAP, t.image.__webglTextureCube)
    }
    function te(t, e) {
        y.activeTexture(y.TEXTURE0 + e),
        y.bindTexture(y.TEXTURE_CUBE_MAP, t.__webglTexture)
    }
    function ee(t, e, r) {
        y.bindFramebuffer(y.FRAMEBUFFER, t),
        y.framebufferTexture2D(y.FRAMEBUFFER, y.COLOR_ATTACHMENT0, r, e.__webglTexture, 0)
    }
    function re(t, e) {
        y.bindRenderbuffer(y.RENDERBUFFER, t),
        e.depthBuffer && !e.stencilBuffer ? (y.renderbufferStorage(y.RENDERBUFFER, y.DEPTH_COMPONENT16, e.width, e.height),
        y.framebufferRenderbuffer(y.FRAMEBUFFER, y.DEPTH_ATTACHMENT, y.RENDERBUFFER, t)) : e.depthBuffer && e.stencilBuffer ? (y.renderbufferStorage(y.RENDERBUFFER, y.DEPTH_STENCIL, e.width, e.height),
        y.framebufferRenderbuffer(y.FRAMEBUFFER, y.DEPTH_STENCIL_ATTACHMENT, y.RENDERBUFFER, t)) : y.renderbufferStorage(y.RENDERBUFFER, y.RGBA4, e.width, e.height)
    }
    function ie(t) {
        return t === THREE.NearestFilter || t === THREE.NearestMipMapNearestFilter || t === THREE.NearestMipMapLinearFilter ? y.NEAREST : y.LINEAR
    }
    function ne(t) {
        var e;
        if (t === THREE.RepeatWrapping)
            return y.REPEAT;
        if (t === THREE.ClampToEdgeWrapping)
            return y.CLAMP_TO_EDGE;
        if (t === THREE.MirroredRepeatWrapping)
            return y.MIRRORED_REPEAT;
        if (t === THREE.NearestFilter)
            return y.NEAREST;
        if (t === THREE.NearestMipMapNearestFilter)
            return y.NEAREST_MIPMAP_NEAREST;
        if (t === THREE.NearestMipMapLinearFilter)
            return y.NEAREST_MIPMAP_LINEAR;
        if (t === THREE.LinearFilter)
            return y.LINEAR;
        if (t === THREE.LinearMipMapNearestFilter)
            return y.LINEAR_MIPMAP_NEAREST;
        if (t === THREE.LinearMipMapLinearFilter)
            return y.LINEAR_MIPMAP_LINEAR;
        if (t === THREE.UnsignedByteType)
            return y.UNSIGNED_BYTE;
        if (t === THREE.UnsignedShort4444Type)
            return y.UNSIGNED_SHORT_4_4_4_4;
        if (t === THREE.UnsignedShort5551Type)
            return y.UNSIGNED_SHORT_5_5_5_1;
        if (t === THREE.UnsignedShort565Type)
            return y.UNSIGNED_SHORT_5_6_5;
        if (t === THREE.ByteType)
            return y.BYTE;
        if (t === THREE.ShortType)
            return y.SHORT;
        if (t === THREE.UnsignedShortType)
            return y.UNSIGNED_SHORT;
        if (t === THREE.IntType)
            return y.INT;
        if (t === THREE.UnsignedIntType)
            return y.UNSIGNED_INT;
        if (t === THREE.FloatType)
            return y.FLOAT;
        if (null !== (e = W.get("OES_texture_half_float")) && t === THREE.HalfFloatType)
            return e.HALF_FLOAT_OES;
        if (t === THREE.AlphaFormat)
            return y.ALPHA;
        if (t === THREE.RGBFormat)
            return y.RGB;
        if (t === THREE.RGBAFormat)
            return y.RGBA;
        if (t === THREE.LuminanceFormat)
            return y.LUMINANCE;
        if (t === THREE.LuminanceAlphaFormat)
            return y.LUMINANCE_ALPHA;
        if (t === THREE.AddEquation)
            return y.FUNC_ADD;
        if (t === THREE.SubtractEquation)
            return y.FUNC_SUBTRACT;
        if (t === THREE.ReverseSubtractEquation)
            return y.FUNC_REVERSE_SUBTRACT;
        if (t === THREE.ZeroFactor)
            return y.ZERO;
        if (t === THREE.OneFactor)
            return y.ONE;
        if (t === THREE.SrcColorFactor)
            return y.SRC_COLOR;
        if (t === THREE.OneMinusSrcColorFactor)
            return y.ONE_MINUS_SRC_COLOR;
        if (t === THREE.SrcAlphaFactor)
            return y.SRC_ALPHA;
        if (t === THREE.OneMinusSrcAlphaFactor)
            return y.ONE_MINUS_SRC_ALPHA;
        if (t === THREE.DstAlphaFactor)
            return y.DST_ALPHA;
        if (t === THREE.OneMinusDstAlphaFactor)
            return y.ONE_MINUS_DST_ALPHA;
        if (t === THREE.DstColorFactor)
            return y.DST_COLOR;
        if (t === THREE.OneMinusDstColorFactor)
            return y.ONE_MINUS_DST_COLOR;
        if (t === THREE.SrcAlphaSaturateFactor)
            return y.SRC_ALPHA_SATURATE;
        if (null !== (e = W.get("WEBGL_compressed_texture_s3tc"))) {
            if (t === THREE.RGB_S3TC_DXT1_Format)
                return e.COMPRESSED_RGB_S3TC_DXT1_EXT;
            if (t === THREE.RGBA_S3TC_DXT1_Format)
                return e.COMPRESSED_RGBA_S3TC_DXT1_EXT;
            if (t === THREE.RGBA_S3TC_DXT3_Format)
                return e.COMPRESSED_RGBA_S3TC_DXT3_EXT;
            if (t === THREE.RGBA_S3TC_DXT5_Format)
                return e.COMPRESSED_RGBA_S3TC_DXT5_EXT
        }
        if (null !== (e = W.get("WEBGL_compressed_texture_pvrtc"))) {
            if (t === THREE.RGB_PVRTC_4BPPV1_Format)
                return e.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
            if (t === THREE.RGB_PVRTC_2BPPV1_Format)
                return e.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
            if (t === THREE.RGBA_PVRTC_4BPPV1_Format)
                return e.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
            if (t === THREE.RGBA_PVRTC_2BPPV1_Format)
                return e.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
        }
        if (null !== (e = W.get("EXT_blend_minmax"))) {
            if (t === THREE.MinEquation)
                return e.MIN_EXT;
            if (t === THREE.MaxEquation)
                return e.MAX_EXT
        }
        return 0
    }
    this.setFaceCulling = function(t, e) {
        t === THREE.CullFaceNone ? y.disable(y.CULL_FACE) : (e === THREE.FrontFaceDirectionCW ? y.frontFace(y.CW) : y.frontFace(y.CCW),
        t === THREE.CullFaceBack ? y.cullFace(y.BACK) : t === THREE.CullFaceFront ? y.cullFace(y.FRONT) : y.cullFace(y.FRONT_AND_BACK),
        y.enable(y.CULL_FACE))
    }
    ,
    this.setMaterialFaces = function(t) {
        I.setDoubleSided(t.side === THREE.DoubleSide),
        I.setFlipSided(t.side === THREE.BackSide)
    }
    ,
    this.uploadTexture = function(t) {
        void 0 === t.__webglInit && (t.__webglInit = !0,
        t.addEventListener("dispose", ft),
        t.__webglTexture = y.createTexture(),
        H.info.memory.textures++),
        y.bindTexture(y.TEXTURE_2D, t.__webglTexture),
        y.pixelStorei(y.UNPACK_FLIP_Y_WEBGL, t.flipY),
        y.pixelStorei(y.UNPACK_PREMULTIPLY_ALPHA_WEBGL, t.premultiplyAlpha),
        y.pixelStorei(y.UNPACK_ALIGNMENT, t.unpackAlignment),
        t.image = Jt(t.image, Q);
        var e = t.image
          , r = THREE.Math.isPowerOfTwo(e.width) && THREE.Math.isPowerOfTwo(e.height)
          , i = ne(t.format)
          , n = ne(t.type);
        Qt(y.TEXTURE_2D, t, r);
        var o, a = t.mipmaps;
        if (t instanceof THREE.DataTexture)
            if (a.length > 0 && r) {
                for (var s = 0, h = a.length; s < h; s++)
                    o = a[s],
                    y.texImage2D(y.TEXTURE_2D, s, i, o.width, o.height, 0, i, n, o.data);
                t.generateMipmaps = !1
            } else
                y.texImage2D(y.TEXTURE_2D, 0, i, e.width, e.height, 0, i, n, e.data);
        else if (t instanceof THREE.CompressedTexture)
            for (s = 0,
            h = a.length; s < h; s++)
                o = a[s],
                t.format !== THREE.RGBAFormat && t.format !== THREE.RGBFormat ? ot().indexOf(i) > -1 ? y.compressedTexImage2D(y.TEXTURE_2D, s, i, o.width, o.height, 0, o.data) : THREE.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : y.texImage2D(y.TEXTURE_2D, s, i, o.width, o.height, 0, i, n, o.data);
        else if (a.length > 0 && r) {
            for (s = 0,
            h = a.length; s < h; s++)
                o = a[s],
                y.texImage2D(y.TEXTURE_2D, s, i, i, n, o);
            t.generateMipmaps = !1
        } else
            y.texImage2D(y.TEXTURE_2D, 0, i, i, n, t.image);
        t.generateMipmaps && r && y.generateMipmap(y.TEXTURE_2D),
        t.needsUpdate = !1,
        t.onUpdate && t.onUpdate()
    }
    ,
    this.setTexture = function(t, e) {
        y.activeTexture(y.TEXTURE0 + e),
        t.needsUpdate ? H.uploadTexture(t) : y.bindTexture(y.TEXTURE_2D, t.__webglTexture)
    }
    ,
    this.setRenderTarget = function(t) {
        var e, r, i, n, o, a = t instanceof THREE.WebGLRenderTargetCube;
        if (t && void 0 === t.__webglFramebuffer) {
            void 0 === t.depthBuffer && (t.depthBuffer = !0),
            void 0 === t.stencilBuffer && (t.stencilBuffer = !0),
            t.addEventListener("dispose", mt),
            t.__webglTexture = y.createTexture(),
            H.info.memory.textures++;
            var s = THREE.Math.isPowerOfTwo(t.width) && THREE.Math.isPowerOfTwo(t.height)
              , h = ne(t.format)
              , c = ne(t.type);
            if (a) {
                t.__webglFramebuffer = [],
                t.__webglRenderbuffer = [],
                y.bindTexture(y.TEXTURE_CUBE_MAP, t.__webglTexture),
                Qt(y.TEXTURE_CUBE_MAP, t, s);
                for (var l = 0; l < 6; l++)
                    t.__webglFramebuffer[l] = y.createFramebuffer(),
                    t.__webglRenderbuffer[l] = y.createRenderbuffer(),
                    y.texImage2D(y.TEXTURE_CUBE_MAP_POSITIVE_X + l, 0, h, t.width, t.height, 0, h, c, null),
                    ee(t.__webglFramebuffer[l], t, y.TEXTURE_CUBE_MAP_POSITIVE_X + l),
                    re(t.__webglRenderbuffer[l], t);
                s && y.generateMipmap(y.TEXTURE_CUBE_MAP)
            } else
                t.__webglFramebuffer = y.createFramebuffer(),
                t.shareDepthFrom ? t.__webglRenderbuffer = t.shareDepthFrom.__webglRenderbuffer : t.__webglRenderbuffer = y.createRenderbuffer(),
                y.bindTexture(y.TEXTURE_2D, t.__webglTexture),
                Qt(y.TEXTURE_2D, t, s),
                y.texImage2D(y.TEXTURE_2D, 0, h, t.width, t.height, 0, h, c, null),
                ee(t.__webglFramebuffer, t, y.TEXTURE_2D),
                t.shareDepthFrom ? t.depthBuffer && !t.stencilBuffer ? y.framebufferRenderbuffer(y.FRAMEBUFFER, y.DEPTH_ATTACHMENT, y.RENDERBUFFER, t.__webglRenderbuffer) : t.depthBuffer && t.stencilBuffer && y.framebufferRenderbuffer(y.FRAMEBUFFER, y.DEPTH_STENCIL_ATTACHMENT, y.RENDERBUFFER, t.__webglRenderbuffer) : re(t.__webglRenderbuffer, t),
                s && y.generateMipmap(y.TEXTURE_2D);
            a ? y.bindTexture(y.TEXTURE_CUBE_MAP, null) : y.bindTexture(y.TEXTURE_2D, null),
            y.bindRenderbuffer(y.RENDERBUFFER, null),
            y.bindFramebuffer(y.FRAMEBUFFER, null)
        }
        t ? (e = a ? t.__webglFramebuffer[t.activeCubeFace] : t.__webglFramebuffer,
        r = t.width,
        i = t.height,
        n = 0,
        o = 0) : (e = null,
        r = P,
        i = F,
        n = A,
        o = L),
        e !== b && (y.bindFramebuffer(y.FRAMEBUFFER, e),
        y.viewport(n, o, r, i),
        b = e),
        B = r,
        U = i
    }
    ,
    this.readRenderTargetPixels = function(t, e, r, i, n, o) {
        if (t instanceof THREE.WebGLRenderTarget) {
            if (t.__webglFramebuffer) {
                if (t.format !== THREE.RGBAFormat)
                    return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA format. readPixels can read only RGBA format.");
                var a = !1;
                t.__webglFramebuffer !== b && (y.bindFramebuffer(y.FRAMEBUFFER, t.__webglFramebuffer),
                a = !0),
                y.checkFramebufferStatus(y.FRAMEBUFFER) === y.FRAMEBUFFER_COMPLETE ? y.readPixels(e, r, i, n, y.RGBA, y.UNSIGNED_BYTE, o) : console.error("THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete."),
                a && y.bindFramebuffer(y.FRAMEBUFFER, b)
            }
        } else
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.")
    }
    ,
    this.initMaterial = function() {
        THREE.warn("THREE.WebGLRenderer: .initMaterial() has been removed.")
    }
    ,
    this.addPrePlugin = function() {
        THREE.warn("THREE.WebGLRenderer: .addPrePlugin() has been removed.")
    }
    ,
    this.addPostPlugin = function() {
        THREE.warn("THREE.WebGLRenderer: .addPostPlugin() has been removed.")
    }
    ,
    this.updateShadowMap = function() {
        THREE.warn("THREE.WebGLRenderer: .updateShadowMap() has been removed.")
    }
}
,
THREE.WebGLRenderTarget = function(t, e, r) {
    this.width = t,
    this.height = e,
    r = r || {},
    this.wrapS = void 0 !== r.wrapS ? r.wrapS : THREE.ClampToEdgeWrapping,
    this.wrapT = void 0 !== r.wrapT ? r.wrapT : THREE.ClampToEdgeWrapping,
    this.magFilter = void 0 !== r.magFilter ? r.magFilter : THREE.LinearFilter,
    this.minFilter = void 0 !== r.minFilter ? r.minFilter : THREE.LinearMipMapLinearFilter,
    this.anisotropy = void 0 !== r.anisotropy ? r.anisotropy : 1,
    this.offset = new THREE.Vector2(0,0),
    this.repeat = new THREE.Vector2(1,1),
    this.format = void 0 !== r.format ? r.format : THREE.RGBAFormat,
    this.type = void 0 !== r.type ? r.type : THREE.UnsignedByteType,
    this.depthBuffer = void 0 === r.depthBuffer || r.depthBuffer,
    this.stencilBuffer = void 0 === r.stencilBuffer || r.stencilBuffer,
    this.generateMipmaps = !0,
    this.shareDepthFrom = void 0 !== r.shareDepthFrom ? r.shareDepthFrom : null
}
,
THREE.WebGLRenderTarget.prototype = {
    constructor: THREE.WebGLRenderTarget,
    setSize: function(t, e) {
        this.width = t,
        this.height = e
    },
    clone: function() {
        var t = new THREE.WebGLRenderTarget(this.width,this.height);
        return t.wrapS = this.wrapS,
        t.wrapT = this.wrapT,
        t.magFilter = this.magFilter,
        t.minFilter = this.minFilter,
        t.anisotropy = this.anisotropy,
        t.offset.copy(this.offset),
        t.repeat.copy(this.repeat),
        t.format = this.format,
        t.type = this.type,
        t.depthBuffer = this.depthBuffer,
        t.stencilBuffer = this.stencilBuffer,
        t.generateMipmaps = this.generateMipmaps,
        t.shareDepthFrom = this.shareDepthFrom,
        t
    },
    dispose: function() {
        this.dispatchEvent({
            type: "dispose"
        })
    }
},
THREE.EventDispatcher.prototype.apply(THREE.WebGLRenderTarget.prototype),
THREE.WebGLRenderTargetCube = function(t, e, r) {
    THREE.WebGLRenderTarget.call(this, t, e, r),
    this.activeCubeFace = 0
}
,
THREE.WebGLRenderTargetCube.prototype = Object.create(THREE.WebGLRenderTarget.prototype),
THREE.WebGLRenderTargetCube.prototype.constructor = THREE.WebGLRenderTargetCube,
THREE.WebGLExtensions = function(t) {
    var e = {};
    this.get = function(r) {
        if (void 0 !== e[r])
            return e[r];
        var i;
        switch (r) {
        case "EXT_texture_filter_anisotropic":
            i = t.getExtension("EXT_texture_filter_anisotropic") || t.getExtension("MOZ_EXT_texture_filter_anisotropic") || t.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
            break;
        case "WEBGL_compressed_texture_s3tc":
            i = t.getExtension("WEBGL_compressed_texture_s3tc") || t.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
            break;
        case "WEBGL_compressed_texture_pvrtc":
            i = t.getExtension("WEBGL_compressed_texture_pvrtc") || t.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
            break;
        default:
            i = t.getExtension(r)
        }
        return null === i && THREE.warn("THREE.WebGLRenderer: " + r + " extension not supported."),
        e[r] = i,
        i
    }
}
,
THREE.WebGLProgram = function() {
    var t = 0;
    return function(e, r, i, n) {
        var o = e
          , a = o.context
          , s = i.defines
          , h = i.__webglShader.uniforms
          , c = i.attributes
          , l = i.__webglShader.vertexShader
          , u = i.__webglShader.fragmentShader
          , E = i.index0AttributeName;
        void 0 === E && !0 === n.morphTargets && (E = "position");
        var p = "SHADOWMAP_TYPE_BASIC";
        n.shadowMapType === THREE.PCFShadowMap ? p = "SHADOWMAP_TYPE_PCF" : n.shadowMapType === THREE.PCFSoftShadowMap && (p = "SHADOWMAP_TYPE_PCF_SOFT");
        var d = "ENVMAP_TYPE_CUBE"
          , f = "ENVMAP_MODE_REFLECTION"
          , m = "ENVMAP_BLENDING_MULTIPLY";
        if (n.envMap) {
            switch (i.envMap.mapping) {
            case THREE.CubeReflectionMapping:
            case THREE.CubeRefractionMapping:
                d = "ENVMAP_TYPE_CUBE";
                break;
            case THREE.EquirectangularReflectionMapping:
            case THREE.EquirectangularRefractionMapping:
                d = "ENVMAP_TYPE_EQUIREC";
                break;
            case THREE.SphericalReflectionMapping:
                d = "ENVMAP_TYPE_SPHERE"
            }
            switch (i.envMap.mapping) {
            case THREE.CubeRefractionMapping:
            case THREE.EquirectangularRefractionMapping:
                f = "ENVMAP_MODE_REFRACTION"
            }
            switch (i.combine) {
            case THREE.MultiplyOperation:
                m = "ENVMAP_BLENDING_MULTIPLY";
                break;
            case THREE.MixOperation:
                m = "ENVMAP_BLENDING_MIX";
                break;
            case THREE.AddOperation:
                m = "ENVMAP_BLENDING_ADD"
            }
        }
        var T, g, v = e.gammaFactor > 0 ? e.gammaFactor : 1, R = function(t) {
            var e, r, i = [];
            for (var n in t)
                !1 !== (e = t[n]) && (r = "#define " + n + " " + e,
                i.push(r));
            return i.join("\n")
        }(s), y = a.createProgram();
        i instanceof THREE.RawShaderMaterial ? (T = "",
        g = "") : (T = ["precision " + n.precision + " float;", "precision " + n.precision + " int;", R, n.supportsVertexTextures ? "#define VERTEX_TEXTURES" : "", o.gammaInput ? "#define GAMMA_INPUT" : "", o.gammaOutput ? "#define GAMMA_OUTPUT" : "", "#define GAMMA_FACTOR " + v, "#define MAX_DIR_LIGHTS " + n.maxDirLights, "#define MAX_POINT_LIGHTS " + n.maxPointLights, "#define MAX_SPOT_LIGHTS " + n.maxSpotLights, "#define MAX_HEMI_LIGHTS " + n.maxHemiLights, "#define MAX_SHADOWS " + n.maxShadows, "#define MAX_BONES " + n.maxBones, n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + f : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.vertexColors ? "#define USE_COLOR" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.skinning ? "#define USE_SKINNING" : "", n.useVertexTexture ? "#define BONE_TEXTURE" : "", n.morphTargets ? "#define USE_MORPHTARGETS" : "", n.morphNormals ? "#define USE_MORPHNORMALS" : "", n.wrapAround ? "#define WRAP_AROUND" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + p : "", n.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", n.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", n.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "attribute vec2 uv2;", "#ifdef USE_COLOR", "\tattribute vec3 color;", "#endif", "#ifdef USE_MORPHTARGETS", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", ""].join("\n"),
        g = ["precision " + n.precision + " float;", "precision " + n.precision + " int;", n.bumpMap || n.normalMap || n.flatShading ? "#extension GL_OES_standard_derivatives : enable" : "", R, "#define MAX_DIR_LIGHTS " + n.maxDirLights, "#define MAX_POINT_LIGHTS " + n.maxPointLights, "#define MAX_SPOT_LIGHTS " + n.maxSpotLights, "#define MAX_HEMI_LIGHTS " + n.maxHemiLights, "#define MAX_SHADOWS " + n.maxShadows, n.alphaTest ? "#define ALPHATEST " + n.alphaTest : "", o.gammaInput ? "#define GAMMA_INPUT" : "", o.gammaOutput ? "#define GAMMA_OUTPUT" : "", "#define GAMMA_FACTOR " + v, n.useFog && n.fog ? "#define USE_FOG" : "", n.useFog && n.fogExp ? "#define FOG_EXP2" : "", n.map ? "#define USE_MAP" : "", n.envMap ? "#define USE_ENVMAP" : "", n.envMap ? "#define " + d : "", n.envMap ? "#define " + f : "", n.envMap ? "#define " + m : "", n.lightMap ? "#define USE_LIGHTMAP" : "", n.bumpMap ? "#define USE_BUMPMAP" : "", n.normalMap ? "#define USE_NORMALMAP" : "", n.specularMap ? "#define USE_SPECULARMAP" : "", n.alphaMap ? "#define USE_ALPHAMAP" : "", n.vertexColors ? "#define USE_COLOR" : "", n.flatShading ? "#define FLAT_SHADED" : "", n.metal ? "#define METAL" : "", n.wrapAround ? "#define WRAP_AROUND" : "", n.doubleSided ? "#define DOUBLE_SIDED" : "", n.flipSided ? "#define FLIP_SIDED" : "", n.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", n.shadowMapEnabled ? "#define " + p : "", n.shadowMapDebug ? "#define SHADOWMAP_DEBUG" : "", n.shadowMapCascade ? "#define SHADOWMAP_CASCADE" : "", n.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", ""].join("\n"));
        var H = new THREE.WebGLShader(a,a.VERTEX_SHADER,T + l)
          , x = new THREE.WebGLShader(a,a.FRAGMENT_SHADER,g + u);
        a.attachShader(y, H),
        a.attachShader(y, x),
        void 0 !== E && a.bindAttribLocation(y, 0, E),
        a.linkProgram(y);
        var w = a.getProgramInfoLog(y);
        !1 === a.getProgramParameter(y, a.LINK_STATUS) && THREE.error("THREE.WebGLProgram: shader error: " + a.getError(), "gl.VALIDATE_STATUS", a.getProgramParameter(y, a.VALIDATE_STATUS), "gl.getPRogramInfoLog", w),
        "" !== w && THREE.warn("THREE.WebGLProgram: gl.getProgramInfoLog()" + w),
        a.deleteShader(H),
        a.deleteShader(x);
        var b = ["viewMatrix", "modelViewMatrix", "projectionMatrix", "normalMatrix", "modelMatrix", "cameraPosition", "morphTargetInfluences", "bindMatrix", "bindMatrixInverse"];
        n.useVertexTexture ? (b.push("boneTexture"),
        b.push("boneTextureWidth"),
        b.push("boneTextureHeight")) : b.push("boneGlobalMatrices"),
        n.logarithmicDepthBuffer && b.push("logDepthBufFC");
        for (var M in h)
            b.push(M);
        this.uniforms = function(t, e, r) {
            for (var i = {}, n = 0, o = r.length; n < o; n++) {
                var a = r[n];
                i[a] = t.getUniformLocation(e, a)
            }
            return i
        }(a, y, b),
        b = ["position", "normal", "uv", "uv2", "tangent", "color", "skinIndex", "skinWeight", "lineDistance"];
        for (var _ = 0; _ < n.maxMorphTargets; _++)
            b.push("morphTarget" + _);
        for (_ = 0; _ < n.maxMorphNormals; _++)
            b.push("morphNormal" + _);
        for (var S in c)
            b.push(S);
        return this.attributes = function(t, e, r) {
            for (var i = {}, n = 0, o = r.length; n < o; n++) {
                var a = r[n];
                i[a] = t.getAttribLocation(e, a)
            }
            return i
        }(a, y, b),
        this.attributesKeys = Object.keys(this.attributes),
        this.id = t++,
        this.code = r,
        this.usedTimes = 1,
        this.program = y,
        this.vertexShader = H,
        this.fragmentShader = x,
        this
    }
}(),
THREE.WebGLShader = function(t, e, r) {
    var i = t.createShader(e);
    return t.shaderSource(i, r),
    t.compileShader(i),
    !1 === t.getShaderParameter(i, t.COMPILE_STATUS) && THREE.error("THREE.WebGLShader: Shader couldn't compile."),
    "" !== t.getShaderInfoLog(i) && THREE.warn("THREE.WebGLShader: gl.getShaderInfoLog()", t.getShaderInfoLog(i), function(t) {
        for (var e = t.split("\n"), r = 0; r < e.length; r++)
            e[r] = r + 1 + ": " + e[r];
        return e.join("\n")
    }(r)),
    i
}
,
THREE.WebGLState = function(t, e) {
    var r = new Uint8Array(16)
      , i = new Uint8Array(16)
      , n = null
      , o = null
      , a = null
      , s = null
      , h = null
      , c = null
      , l = null
      , u = null
      , E = null
      , p = null
      , d = null
      , f = null
      , m = null
      , T = null
      , g = null
      , v = null;
    this.initAttributes = function() {
        for (var t = 0, e = r.length; t < e; t++)
            r[t] = 0
    }
    ,
    this.enableAttribute = function(e) {
        r[e] = 1,
        0 === i[e] && (t.enableVertexAttribArray(e),
        i[e] = 1)
    }
    ,
    this.disableUnusedAttributes = function() {
        for (var e = 0, n = i.length; e < n; e++)
            i[e] !== r[e] && (t.disableVertexAttribArray(e),
            i[e] = 0)
    }
    ,
    this.setBlending = function(r, i, u, E, p, d, f) {
        r !== n && (r === THREE.NoBlending ? t.disable(t.BLEND) : r === THREE.AdditiveBlending ? (t.enable(t.BLEND),
        t.blendEquation(t.FUNC_ADD),
        t.blendFunc(t.SRC_ALPHA, t.ONE)) : r === THREE.SubtractiveBlending ? (t.enable(t.BLEND),
        t.blendEquation(t.FUNC_ADD),
        t.blendFunc(t.ZERO, t.ONE_MINUS_SRC_COLOR)) : r === THREE.MultiplyBlending ? (t.enable(t.BLEND),
        t.blendEquation(t.FUNC_ADD),
        t.blendFunc(t.ZERO, t.SRC_COLOR)) : r === THREE.CustomBlending ? t.enable(t.BLEND) : (t.enable(t.BLEND),
        t.blendEquationSeparate(t.FUNC_ADD, t.FUNC_ADD),
        t.blendFuncSeparate(t.SRC_ALPHA, t.ONE_MINUS_SRC_ALPHA, t.ONE, t.ONE_MINUS_SRC_ALPHA)),
        n = r),
        r === THREE.CustomBlending ? (p = p || i,
        d = d || u,
        f = f || E,
        i === o && p === h || (t.blendEquationSeparate(e(i), e(p)),
        o = i,
        h = p),
        u === a && E === s && d === c && f === l || (t.blendFuncSeparate(e(u), e(E), e(d), e(f)),
        a = u,
        s = E,
        c = d,
        l = f)) : (o = null,
        a = null,
        s = null,
        h = null,
        c = null,
        l = null)
    }
    ,
    this.setDepthTest = function(e) {
        u !== e && (e ? t.enable(t.DEPTH_TEST) : t.disable(t.DEPTH_TEST),
        u = e)
    }
    ,
    this.setDepthWrite = function(e) {
        E !== e && (t.depthMask(e),
        E = e)
    }
    ,
    this.setColorWrite = function(e) {
        p !== e && (t.colorMask(e, e, e, e),
        p = e)
    }
    ,
    this.setDoubleSided = function(e) {
        d !== e && (e ? t.disable(t.CULL_FACE) : t.enable(t.CULL_FACE),
        d = e)
    }
    ,
    this.setFlipSided = function(e) {
        f !== e && (e ? t.frontFace(t.CW) : t.frontFace(t.CCW),
        f = e)
    }
    ,
    this.setLineWidth = function(e) {
        e !== m && (t.lineWidth(e),
        m = e)
    }
    ,
    this.setPolygonOffset = function(e, r, i) {
        T !== e && (e ? t.enable(t.POLYGON_OFFSET_FILL) : t.disable(t.POLYGON_OFFSET_FILL),
        T = e),
        !e || g === r && v === i || (t.polygonOffset(r, i),
        g = r,
        v = i)
    }
    ,
    this.reset = function() {
        for (var t = 0; t < i.length; t++)
            i[t] = 0;
        n = null,
        u = null,
        E = null,
        p = null,
        d = null,
        f = null
    }
}
,
THREE.LensFlarePlugin = function(t, e) {
    var r, i, n, o, a, s, h, c, l = t.context, u = function() {
        var e, u, E, p, d, f, m = new Float32Array([-1, -1, 0, 0, 1, -1, 1, 0, 1, 1, 1, 1, -1, 1, 0, 1]), T = new Uint16Array([0, 1, 2, 0, 2, 3]);
        r = l.createBuffer(),
        i = l.createBuffer(),
        l.bindBuffer(l.ARRAY_BUFFER, r),
        l.bufferData(l.ARRAY_BUFFER, m, l.STATIC_DRAW),
        l.bindBuffer(l.ELEMENT_ARRAY_BUFFER, i),
        l.bufferData(l.ELEMENT_ARRAY_BUFFER, T, l.STATIC_DRAW),
        h = l.createTexture(),
        c = l.createTexture(),
        l.bindTexture(l.TEXTURE_2D, h),
        l.texImage2D(l.TEXTURE_2D, 0, l.RGB, 16, 16, 0, l.RGB, l.UNSIGNED_BYTE, null),
        l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, l.CLAMP_TO_EDGE),
        l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, l.CLAMP_TO_EDGE),
        l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, l.NEAREST),
        l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, l.NEAREST),
        l.bindTexture(l.TEXTURE_2D, c),
        l.texImage2D(l.TEXTURE_2D, 0, l.RGBA, 16, 16, 0, l.RGBA, l.UNSIGNED_BYTE, null),
        l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_S, l.CLAMP_TO_EDGE),
        l.texParameteri(l.TEXTURE_2D, l.TEXTURE_WRAP_T, l.CLAMP_TO_EDGE),
        l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MAG_FILTER, l.NEAREST),
        l.texParameteri(l.TEXTURE_2D, l.TEXTURE_MIN_FILTER, l.NEAREST),
        e = (s = l.getParameter(l.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0) ? {
            vertexShader: ["uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "uniform sampler2D occlusionMap;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "vUV = uv;", "vec2 pos = position;", "if( renderType == 2 ) {", "vec4 visibility = texture2D( occlusionMap, vec2( 0.1, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.1 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.9 ) );", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) );", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.5 ) );", "vVisibility =        visibility.r / 9.0;", "vVisibility *= 1.0 - visibility.g / 9.0;", "vVisibility *=       visibility.b / 9.0;", "vVisibility *= 1.0 - visibility.a / 9.0;", "pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "}", "gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}"].join("\n"),
            fragmentShader: ["uniform lowp int renderType;", "uniform sampler2D map;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "varying float vVisibility;", "void main() {", "if( renderType == 0 ) {", "gl_FragColor = vec4( 1.0, 0.0, 1.0, 0.0 );", "} else if( renderType == 1 ) {", "gl_FragColor = texture2D( map, vUV );", "} else {", "vec4 texture = texture2D( map, vUV );", "texture.a *= opacity * vVisibility;", "gl_FragColor = texture;", "gl_FragColor.rgb *= color;", "}", "}"].join("\n")
        } : {
            vertexShader: ["uniform lowp int renderType;", "uniform vec3 screenPosition;", "uniform vec2 scale;", "uniform float rotation;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uv;", "vec2 pos = position;", "if( renderType == 2 ) {", "pos.x = cos( rotation ) * position.x - sin( rotation ) * position.y;", "pos.y = sin( rotation ) * position.x + cos( rotation ) * position.y;", "}", "gl_Position = vec4( ( pos * scale + screenPosition.xy ).xy, screenPosition.z, 1.0 );", "}"].join("\n"),
            fragmentShader: ["precision mediump float;", "uniform lowp int renderType;", "uniform sampler2D map;", "uniform sampler2D occlusionMap;", "uniform float opacity;", "uniform vec3 color;", "varying vec2 vUV;", "void main() {", "if( renderType == 0 ) {", "gl_FragColor = vec4( texture2D( map, vUV ).rgb, 0.0 );", "} else if( renderType == 1 ) {", "gl_FragColor = texture2D( map, vUV );", "} else {", "float visibility = texture2D( occlusionMap, vec2( 0.5, 0.1 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.9, 0.5 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.5, 0.9 ) ).a;", "visibility += texture2D( occlusionMap, vec2( 0.1, 0.5 ) ).a;", "visibility = ( 1.0 - visibility / 4.0 );", "vec4 texture = texture2D( map, vUV );", "texture.a *= opacity * visibility;", "gl_FragColor = texture;", "gl_FragColor.rgb *= color;", "}", "}"].join("\n")
        },
        u = e,
        E = l.createProgram(),
        p = l.createShader(l.FRAGMENT_SHADER),
        d = l.createShader(l.VERTEX_SHADER),
        f = "precision " + t.getPrecision() + " float;\n",
        l.shaderSource(p, f + u.fragmentShader),
        l.shaderSource(d, f + u.vertexShader),
        l.compileShader(p),
        l.compileShader(d),
        l.attachShader(E, p),
        l.attachShader(E, d),
        l.linkProgram(E),
        n = E,
        o = {
            vertex: l.getAttribLocation(n, "position"),
            uv: l.getAttribLocation(n, "uv")
        },
        a = {
            renderType: l.getUniformLocation(n, "renderType"),
            map: l.getUniformLocation(n, "map"),
            occlusionMap: l.getUniformLocation(n, "occlusionMap"),
            opacity: l.getUniformLocation(n, "opacity"),
            color: l.getUniformLocation(n, "color"),
            scale: l.getUniformLocation(n, "scale"),
            rotation: l.getUniformLocation(n, "rotation"),
            screenPosition: l.getUniformLocation(n, "screenPosition")
        }
    };
    this.render = function(E, p, d, f) {
        if (0 !== e.length) {
            var m = new THREE.Vector3
              , T = f / d
              , g = .5 * d
              , v = .5 * f
              , R = 16 / f
              , y = new THREE.Vector2(R * T,R)
              , H = new THREE.Vector3(1,1,0)
              , x = new THREE.Vector2(1,1);
            void 0 === n && u(),
            l.useProgram(n),
            l.enableVertexAttribArray(o.vertex),
            l.enableVertexAttribArray(o.uv),
            l.uniform1i(a.occlusionMap, 0),
            l.uniform1i(a.map, 1),
            l.bindBuffer(l.ARRAY_BUFFER, r),
            l.vertexAttribPointer(o.vertex, 2, l.FLOAT, !1, 16, 0),
            l.vertexAttribPointer(o.uv, 2, l.FLOAT, !1, 16, 8),
            l.bindBuffer(l.ELEMENT_ARRAY_BUFFER, i),
            l.disable(l.CULL_FACE),
            l.depthMask(!1);
            for (var w = 0, b = e.length; w < b; w++) {
                R = 16 / f,
                y.set(R * T, R);
                var M = e[w];
                if (m.set(M.matrixWorld.elements[12], M.matrixWorld.elements[13], M.matrixWorld.elements[14]),
                m.applyMatrix4(p.matrixWorldInverse),
                m.applyProjection(p.projectionMatrix),
                H.copy(m),
                x.x = H.x * g + g,
                x.y = H.y * v + v,
                s || x.x > 0 && x.x < d && x.y > 0 && x.y < f) {
                    l.activeTexture(l.TEXTURE1),
                    l.bindTexture(l.TEXTURE_2D, h),
                    l.copyTexImage2D(l.TEXTURE_2D, 0, l.RGB, x.x - 8, x.y - 8, 16, 16, 0),
                    l.uniform1i(a.renderType, 0),
                    l.uniform2f(a.scale, y.x, y.y),
                    l.uniform3f(a.screenPosition, H.x, H.y, H.z),
                    l.disable(l.BLEND),
                    l.enable(l.DEPTH_TEST),
                    l.drawElements(l.TRIANGLES, 6, l.UNSIGNED_SHORT, 0),
                    l.activeTexture(l.TEXTURE0),
                    l.bindTexture(l.TEXTURE_2D, c),
                    l.copyTexImage2D(l.TEXTURE_2D, 0, l.RGBA, x.x - 8, x.y - 8, 16, 16, 0),
                    l.uniform1i(a.renderType, 1),
                    l.disable(l.DEPTH_TEST),
                    l.activeTexture(l.TEXTURE1),
                    l.bindTexture(l.TEXTURE_2D, h),
                    l.drawElements(l.TRIANGLES, 6, l.UNSIGNED_SHORT, 0),
                    M.positionScreen.copy(H),
                    M.customUpdateCallback ? M.customUpdateCallback(M) : M.updateLensFlares(),
                    l.uniform1i(a.renderType, 2),
                    l.enable(l.BLEND);
                    for (var _ = 0, S = M.lensFlares.length; _ < S; _++) {
                        var C = M.lensFlares[_];
                        C.opacity > .001 && C.scale > .001 && (H.x = C.x,
                        H.y = C.y,
                        H.z = C.z,
                        R = C.size * C.scale / f,
                        y.x = R * T,
                        y.y = R,
                        l.uniform3f(a.screenPosition, H.x, H.y, H.z),
                        l.uniform2f(a.scale, y.x, y.y),
                        l.uniform1f(a.rotation, C.rotation),
                        l.uniform1f(a.opacity, C.opacity),
                        l.uniform3f(a.color, C.color.r, C.color.g, C.color.b),
                        t.state.setBlending(C.blending, C.blendEquation, C.blendSrc, C.blendDst),
                        t.setTexture(C.texture, 1),
                        l.drawElements(l.TRIANGLES, 6, l.UNSIGNED_SHORT, 0))
                    }
                }
            }
            l.enable(l.CULL_FACE),
            l.enable(l.DEPTH_TEST),
            l.depthMask(!0),
            t.resetGLState()
        }
    }
}
,
THREE.ShadowMapPlugin = function(t, e, r, i) {
    var n, o, a, s, h = t.context, c = new THREE.Frustum, l = new THREE.Matrix4, u = new THREE.Vector3, E = new THREE.Vector3, p = new THREE.Vector3, d = [], f = THREE.ShaderLib.depthRGBA, m = THREE.UniformsUtils.clone(f.uniforms);
    function T(t, e, i) {
        if (e.visible) {
            var n = r[e.id];
            if (n && e.castShadow && (!1 === e.frustumCulled || !0 === c.intersectsObject(e)))
                for (var o = 0, a = n.length; o < a; o++) {
                    var s = n[o];
                    e._modelViewMatrix.multiplyMatrices(i.matrixWorldInverse, e.matrixWorld),
                    d.push(s)
                }
            for (o = 0,
            a = e.children.length; o < a; o++)
                T(t, e.children[o], i)
        }
    }
    function g(t, e) {
        var r = new THREE.DirectionalLight;
        r.isVirtual = !0,
        r.onlyShadow = !0,
        r.castShadow = !0,
        r.shadowCameraNear = t.shadowCameraNear,
        r.shadowCameraFar = t.shadowCameraFar,
        r.shadowCameraLeft = t.shadowCameraLeft,
        r.shadowCameraRight = t.shadowCameraRight,
        r.shadowCameraBottom = t.shadowCameraBottom,
        r.shadowCameraTop = t.shadowCameraTop,
        r.shadowCameraVisible = t.shadowCameraVisible,
        r.shadowDarkness = t.shadowDarkness,
        r.shadowBias = t.shadowCascadeBias[e],
        r.shadowMapWidth = t.shadowCascadeWidth[e],
        r.shadowMapHeight = t.shadowCascadeHeight[e],
        r.pointsWorld = [],
        r.pointsFrustum = [];
        for (var i = r.pointsWorld, n = r.pointsFrustum, o = 0; o < 8; o++)
            i[o] = new THREE.Vector3,
            n[o] = new THREE.Vector3;
        var a = t.shadowCascadeNearZ[e]
          , s = t.shadowCascadeFarZ[e];
        return n[0].set(-1, -1, a),
        n[1].set(1, -1, a),
        n[2].set(-1, 1, a),
        n[3].set(1, 1, a),
        n[4].set(-1, -1, s),
        n[5].set(1, -1, s),
        n[6].set(-1, 1, s),
        n[7].set(1, 1, s),
        r
    }
    function v(t, e) {
        var r = t.shadowCascadeArray[e];
        r.position.copy(t.position),
        r.target.position.copy(t.target.position),
        r.lookAt(r.target),
        r.shadowCameraVisible = t.shadowCameraVisible,
        r.shadowDarkness = t.shadowDarkness,
        r.shadowBias = t.shadowCascadeBias[e];
        var i = t.shadowCascadeNearZ[e]
          , n = t.shadowCascadeFarZ[e]
          , o = r.pointsFrustum;
        o[0].z = i,
        o[1].z = i,
        o[2].z = i,
        o[3].z = i,
        o[4].z = n,
        o[5].z = n,
        o[6].z = n,
        o[7].z = n
    }
    function R(t, e) {
        var r = e.shadowCamera
          , i = e.pointsFrustum
          , n = e.pointsWorld;
        u.set(1 / 0, 1 / 0, 1 / 0),
        E.set(-1 / 0, -1 / 0, -1 / 0);
        for (var o = 0; o < 8; o++) {
            var a = n[o];
            a.copy(i[o]),
            a.unproject(t),
            a.applyMatrix4(r.matrixWorldInverse),
            a.x < u.x && (u.x = a.x),
            a.x > E.x && (E.x = a.x),
            a.y < u.y && (u.y = a.y),
            a.y > E.y && (E.y = a.y),
            a.z < u.z && (u.z = a.z),
            a.z > E.z && (E.z = a.z)
        }
        r.left = u.x,
        r.right = E.x,
        r.top = E.y,
        r.bottom = u.y,
        r.updateProjectionMatrix()
    }
    n = new THREE.ShaderMaterial({
        uniforms: m,
        vertexShader: f.vertexShader,
        fragmentShader: f.fragmentShader
    }),
    o = new THREE.ShaderMaterial({
        uniforms: m,
        vertexShader: f.vertexShader,
        fragmentShader: f.fragmentShader,
        morphTargets: !0
    }),
    a = new THREE.ShaderMaterial({
        uniforms: m,
        vertexShader: f.vertexShader,
        fragmentShader: f.fragmentShader,
        skinning: !0
    }),
    s = new THREE.ShaderMaterial({
        uniforms: m,
        vertexShader: f.vertexShader,
        fragmentShader: f.fragmentShader,
        morphTargets: !0,
        skinning: !0
    }),
    n._shadowPass = !0,
    o._shadowPass = !0,
    a._shadowPass = !0,
    s._shadowPass = !0,
    this.render = function(r, u) {
        if (!1 !== t.shadowMapEnabled) {
            var E, f, m, y, H, x, w, b, M, _, S, C, A, L, P = [], F = 0;
            for (h.clearColor(1, 1, 1, 1),
            h.disable(h.BLEND),
            h.enable(h.CULL_FACE),
            h.frontFace(h.CCW),
            t.shadowMapCullFace === THREE.CullFaceFront ? h.cullFace(h.FRONT) : h.cullFace(h.BACK),
            t.state.setDepthTest(!0),
            E = 0,
            f = e.length; E < f; E++)
                if ((A = e[E]).castShadow)
                    if (A instanceof THREE.DirectionalLight && A.shadowCascade)
                        for (H = 0; H < A.shadowCascadeCount; H++) {
                            var B;
                            if (A.shadowCascadeArray[H])
                                B = A.shadowCascadeArray[H];
                            else {
                                (B = g(A, H)).originalCamera = u;
                                var U = new THREE.Gyroscope;
                                U.position.copy(A.shadowCascadeOffset),
                                U.add(B),
                                U.add(B.target),
                                u.add(U),
                                A.shadowCascadeArray[H] = B
                            }
                            v(A, H),
                            P[F] = B,
                            F++
                        }
                    else
                        P[F] = A,
                        F++;
            for (E = 0,
            f = P.length; E < f; E++) {
                if (!(A = P[E]).shadowMap) {
                    var V = THREE.LinearFilter;
                    t.shadowMapType === THREE.PCFSoftShadowMap && (V = THREE.NearestFilter);
                    var D = {
                        minFilter: V,
                        magFilter: V,
                        format: THREE.RGBAFormat
                    };
                    A.shadowMap = new THREE.WebGLRenderTarget(A.shadowMapWidth,A.shadowMapHeight,D),
                    A.shadowMapSize = new THREE.Vector2(A.shadowMapWidth,A.shadowMapHeight),
                    A.shadowMatrix = new THREE.Matrix4
                }
                if (!A.shadowCamera) {
                    if (A instanceof THREE.SpotLight)
                        A.shadowCamera = new THREE.PerspectiveCamera(A.shadowCameraFov,A.shadowMapWidth / A.shadowMapHeight,A.shadowCameraNear,A.shadowCameraFar);
                    else {
                        if (!(A instanceof THREE.DirectionalLight)) {
                            THREE.error("THREE.ShadowMapPlugin: Unsupported light type for shadow", A);
                            continue
                        }
                        A.shadowCamera = new THREE.OrthographicCamera(A.shadowCameraLeft,A.shadowCameraRight,A.shadowCameraTop,A.shadowCameraBottom,A.shadowCameraNear,A.shadowCameraFar)
                    }
                    r.add(A.shadowCamera),
                    !0 === r.autoUpdate && r.updateMatrixWorld()
                }
                var z, k, N;
                for (A.shadowCameraVisible && !A.cameraHelper && (A.cameraHelper = new THREE.CameraHelper(A.shadowCamera),
                r.add(A.cameraHelper)),
                A.isVirtual && B.originalCamera == u && R(u, A),
                x = A.shadowMap,
                w = A.shadowMatrix,
                (b = A.shadowCamera).position.setFromMatrixPosition(A.matrixWorld),
                p.setFromMatrixPosition(A.target.matrixWorld),
                b.lookAt(p),
                b.updateMatrixWorld(),
                b.matrixWorldInverse.getInverse(b.matrixWorld),
                A.cameraHelper && (A.cameraHelper.visible = A.shadowCameraVisible),
                A.shadowCameraVisible && A.cameraHelper.update(),
                w.set(.5, 0, 0, .5, 0, .5, 0, .5, 0, 0, .5, .5, 0, 0, 0, 1),
                w.multiply(b.projectionMatrix),
                w.multiply(b.matrixWorldInverse),
                l.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse),
                c.setFromMatrix(l),
                t.setRenderTarget(x),
                t.clear(),
                d.length = 0,
                T(r, r, b),
                m = 0,
                y = d.length; m < y; m++)
                    C = (S = d[m]).object,
                    M = S.buffer,
                    z = (L = C).material instanceof THREE.MeshFaceMaterial ? L.material.materials[0] : L.material,
                    k = void 0 !== C.geometry.morphTargets && C.geometry.morphTargets.length > 0 && z.morphTargets,
                    N = C instanceof THREE.SkinnedMesh && z.skinning,
                    _ = C.customDepthMaterial ? C.customDepthMaterial : N ? k ? s : a : k ? o : n,
                    t.setMaterialFaces(z),
                    M instanceof THREE.BufferGeometry ? t.renderBufferDirect(b, e, null, _, M, C) : t.renderBuffer(b, e, null, _, M, C);
                for (m = 0,
                y = i.length; m < y; m++)
                    (C = (S = i[m]).object).visible && C.castShadow && (C._modelViewMatrix.multiplyMatrices(b.matrixWorldInverse, C.matrixWorld),
                    t.renderImmediateObject(b, e, null, n, C))
            }
            var O = t.getClearColor()
              , G = t.getClearAlpha();
            h.clearColor(O.r, O.g, O.b, G),
            h.enable(h.BLEND),
            t.shadowMapCullFace === THREE.CullFaceFront && h.cullFace(h.BACK),
            t.resetGLState()
        }
    }
}
,
THREE.SpritePlugin = function(t, e) {
    var r, i, n, o, a, s, h = t.context, c = new THREE.Vector3, l = new THREE.Quaternion, u = new THREE.Vector3, E = function() {
        var e, c, l, u = new Float32Array([-.5, -.5, 0, 0, .5, -.5, 1, 0, .5, .5, 1, 1, -.5, .5, 0, 1]), E = new Uint16Array([0, 1, 2, 0, 2, 3]);
        r = h.createBuffer(),
        i = h.createBuffer(),
        h.bindBuffer(h.ARRAY_BUFFER, r),
        h.bufferData(h.ARRAY_BUFFER, u, h.STATIC_DRAW),
        h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, i),
        h.bufferData(h.ELEMENT_ARRAY_BUFFER, E, h.STATIC_DRAW),
        e = h.createProgram(),
        c = h.createShader(h.VERTEX_SHADER),
        l = h.createShader(h.FRAGMENT_SHADER),
        h.shaderSource(c, ["precision " + t.getPrecision() + " float;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform float rotation;", "uniform vec2 scale;", "uniform vec2 uvOffset;", "uniform vec2 uvScale;", "attribute vec2 position;", "attribute vec2 uv;", "varying vec2 vUV;", "void main() {", "vUV = uvOffset + uv * uvScale;", "vec2 alignedPosition = position * scale;", "vec2 rotatedPosition;", "rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;", "rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;", "vec4 finalPosition;", "finalPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );", "finalPosition.xy += rotatedPosition;", "finalPosition = projectionMatrix * finalPosition;", "gl_Position = finalPosition;", "}"].join("\n")),
        h.shaderSource(l, ["precision " + t.getPrecision() + " float;", "uniform vec3 color;", "uniform sampler2D map;", "uniform float opacity;", "uniform int fogType;", "uniform vec3 fogColor;", "uniform float fogDensity;", "uniform float fogNear;", "uniform float fogFar;", "uniform float alphaTest;", "varying vec2 vUV;", "void main() {", "vec4 texture = texture2D( map, vUV );", "if ( texture.a < alphaTest ) discard;", "gl_FragColor = vec4( color * texture.xyz, texture.a * opacity );", "if ( fogType > 0 ) {", "float depth = gl_FragCoord.z / gl_FragCoord.w;", "float fogFactor = 0.0;", "if ( fogType == 1 ) {", "fogFactor = smoothstep( fogNear, fogFar, depth );", "} else {", "const float LOG2 = 1.442695;", "float fogFactor = exp2( - fogDensity * fogDensity * depth * depth * LOG2 );", "fogFactor = 1.0 - clamp( fogFactor, 0.0, 1.0 );", "}", "gl_FragColor = mix( gl_FragColor, vec4( fogColor, gl_FragColor.w ), fogFactor );", "}", "}"].join("\n")),
        h.compileShader(c),
        h.compileShader(l),
        h.attachShader(e, c),
        h.attachShader(e, l),
        h.linkProgram(e),
        n = e,
        o = {
            position: h.getAttribLocation(n, "position"),
            uv: h.getAttribLocation(n, "uv")
        },
        a = {
            uvOffset: h.getUniformLocation(n, "uvOffset"),
            uvScale: h.getUniformLocation(n, "uvScale"),
            rotation: h.getUniformLocation(n, "rotation"),
            scale: h.getUniformLocation(n, "scale"),
            color: h.getUniformLocation(n, "color"),
            map: h.getUniformLocation(n, "map"),
            opacity: h.getUniformLocation(n, "opacity"),
            modelViewMatrix: h.getUniformLocation(n, "modelViewMatrix"),
            projectionMatrix: h.getUniformLocation(n, "projectionMatrix"),
            fogType: h.getUniformLocation(n, "fogType"),
            fogDensity: h.getUniformLocation(n, "fogDensity"),
            fogNear: h.getUniformLocation(n, "fogNear"),
            fogFar: h.getUniformLocation(n, "fogFar"),
            fogColor: h.getUniformLocation(n, "fogColor"),
            alphaTest: h.getUniformLocation(n, "alphaTest")
        };
        var p = document.createElement("canvas");
        p.width = 8,
        p.height = 8;
        var d = p.getContext("2d");
        d.fillStyle = "white",
        d.fillRect(0, 0, 8, 8),
        (s = new THREE.Texture(p)).needsUpdate = !0
    };
    function p(t, e) {
        return t.z !== e.z ? e.z - t.z : e.id - t.id
    }
    this.render = function(d, f) {
        if (0 !== e.length) {
            void 0 === n && E(),
            h.useProgram(n),
            h.enableVertexAttribArray(o.position),
            h.enableVertexAttribArray(o.uv),
            h.disable(h.CULL_FACE),
            h.enable(h.BLEND),
            h.bindBuffer(h.ARRAY_BUFFER, r),
            h.vertexAttribPointer(o.position, 2, h.FLOAT, !1, 16, 0),
            h.vertexAttribPointer(o.uv, 2, h.FLOAT, !1, 16, 8),
            h.bindBuffer(h.ELEMENT_ARRAY_BUFFER, i),
            h.uniformMatrix4fv(a.projectionMatrix, !1, f.projectionMatrix.elements),
            h.activeTexture(h.TEXTURE0),
            h.uniform1i(a.map, 0);
            var m = 0
              , T = 0
              , g = d.fog;
            g ? (h.uniform3f(a.fogColor, g.color.r, g.color.g, g.color.b),
            g instanceof THREE.Fog ? (h.uniform1f(a.fogNear, g.near),
            h.uniform1f(a.fogFar, g.far),
            h.uniform1i(a.fogType, 1),
            m = 1,
            T = 1) : g instanceof THREE.FogExp2 && (h.uniform1f(a.fogDensity, g.density),
            h.uniform1i(a.fogType, 2),
            m = 2,
            T = 2)) : (h.uniform1i(a.fogType, 0),
            m = 0,
            T = 0);
            for (var v = 0, R = e.length; v < R; v++) {
                (H = e[v])._modelViewMatrix.multiplyMatrices(f.matrixWorldInverse, H.matrixWorld),
                H.z = -H._modelViewMatrix.elements[14]
            }
            e.sort(p);
            var y = [];
            for (v = 0,
            R = e.length; v < R; v++) {
                var H, x = (H = e[v]).material;
                h.uniform1f(a.alphaTest, x.alphaTest),
                h.uniformMatrix4fv(a.modelViewMatrix, !1, H._modelViewMatrix.elements),
                H.matrixWorld.decompose(c, l, u),
                y[0] = u.x,
                y[1] = u.y;
                var w = 0;
                d.fog && x.fog && (w = T),
                m !== w && (h.uniform1i(a.fogType, w),
                m = w),
                null !== x.map ? (h.uniform2f(a.uvOffset, x.map.offset.x, x.map.offset.y),
                h.uniform2f(a.uvScale, x.map.repeat.x, x.map.repeat.y)) : (h.uniform2f(a.uvOffset, 0, 0),
                h.uniform2f(a.uvScale, 1, 1)),
                h.uniform1f(a.opacity, x.opacity),
                h.uniform3f(a.color, x.color.r, x.color.g, x.color.b),
                h.uniform1f(a.rotation, x.rotation),
                h.uniform2fv(a.scale, y),
                t.state.setBlending(x.blending, x.blendEquation, x.blendSrc, x.blendDst),
                t.state.setDepthTest(x.depthTest),
                t.state.setDepthWrite(x.depthWrite),
                x.map && x.map.image && x.map.image.width ? t.setTexture(x.map, 0) : t.setTexture(s, 0),
                h.drawElements(h.TRIANGLES, 6, h.UNSIGNED_SHORT, 0)
            }
            h.enable(h.CULL_FACE),
            t.resetGLState()
        }
    }
}
,
THREE.GeometryUtils = {
    merge: function(t, e, r) {
        var i;
        e instanceof THREE.Mesh && (e.matrixAutoUpdate && e.updateMatrix(),
        i = e.matrix,
        e = e.geometry),
        t.merge(e, i, r)
    },
    center: function(t) {
        return THREE.warn("THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead."),
        t.center()
    }
},
THREE.ImageUtils = {
    crossOrigin: void 0,
    loadTexture: function(t, e, r, i) {
        var n = new THREE.ImageLoader;
        n.crossOrigin = this.crossOrigin;
        var o = new THREE.Texture(void 0,e);
        return n.load(t, function(t) {
            o.image = t,
            o.needsUpdate = !0,
            r && r(o)
        }, void 0, function(t) {
            i && i(t)
        }),
        o.sourceFile = t,
        o
    },
    loadTextureCube: function(t, e, r, i) {
        var n = new THREE.ImageLoader;
        n.crossOrigin = this.crossOrigin;
        var o = new THREE.CubeTexture([],e);
        o.flipY = !1;
        for (var a = 0, s = function(e) {
            n.load(t[e], function(t) {
                o.images[e] = t,
                6 === (a += 1) && (o.needsUpdate = !0,
                r && r(o))
            }, void 0, i)
        }, h = 0, c = t.length; h < c; ++h)
            s(h);
        return o
    },
    loadCompressedTexture: function() {
        THREE.error("THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.")
    },
    loadCompressedTextureCube: function() {
        THREE.error("THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.")
    },
    getNormalMap: function(t, e) {
        var r = function(t, e) {
            return [t[0] - e[0], t[1] - e[1], t[2] - e[2]]
        };
        e |= 1;
        var i = t.width
          , n = t.height
          , o = document.createElement("canvas");
        o.width = i,
        o.height = n;
        var a = o.getContext("2d");
        a.drawImage(t, 0, 0);
        for (var s, h, c, l, u = a.getImageData(0, 0, i, n).data, E = a.createImageData(i, n), p = E.data, d = 0; d < i; d++)
            for (var f = 0; f < n; f++) {
                var m = f - 1 < 0 ? 0 : f - 1
                  , T = f + 1 > n - 1 ? n - 1 : f + 1
                  , g = d - 1 < 0 ? 0 : d - 1
                  , v = d + 1 > i - 1 ? i - 1 : d + 1
                  , R = []
                  , y = [0, 0, u[4 * (f * i + d)] / 255 * e];
                R.push([-1, 0, u[4 * (f * i + g)] / 255 * e]),
                R.push([-1, -1, u[4 * (m * i + g)] / 255 * e]),
                R.push([0, -1, u[4 * (m * i + d)] / 255 * e]),
                R.push([1, -1, u[4 * (m * i + v)] / 255 * e]),
                R.push([1, 0, u[4 * (f * i + v)] / 255 * e]),
                R.push([1, 1, u[4 * (T * i + v)] / 255 * e]),
                R.push([0, 1, u[4 * (T * i + d)] / 255 * e]),
                R.push([-1, 1, u[4 * (T * i + g)] / 255 * e]);
                for (var H = [], x = R.length, w = 0; w < x; w++) {
                    var b = R[w]
                      , M = R[(w + 1) % x];
                    b = r(b, y),
                    M = r(M, y),
                    H.push((l = M,
                    s = [(c = b)[1] * l[2] - c[2] * l[1], c[2] * l[0] - c[0] * l[2], c[0] * l[1] - c[1] * l[0]],
                    void 0,
                    h = Math.sqrt(s[0] * s[0] + s[1] * s[1] + s[2] * s[2]),
                    [s[0] / h, s[1] / h, s[2] / h]))
                }
                var _ = [0, 0, 0];
                for (w = 0; w < H.length; w++)
                    _[0] += H[w][0],
                    _[1] += H[w][1],
                    _[2] += H[w][2];
                _[0] /= H.length,
                _[1] /= H.length,
                _[2] /= H.length;
                var S = 4 * (f * i + d);
                p[S] = (_[0] + 1) / 2 * 255 | 0,
                p[S + 1] = (_[1] + 1) / 2 * 255 | 0,
                p[S + 2] = 255 * _[2] | 0,
                p[S + 3] = 255
            }
        return a.putImageData(E, 0, 0),
        o
    },
    generateDataTexture: function(t, e, r) {
        for (var i = t * e, n = new Uint8Array(3 * i), o = Math.floor(255 * r.r), a = Math.floor(255 * r.g), s = Math.floor(255 * r.b), h = 0; h < i; h++)
            n[3 * h] = o,
            n[3 * h + 1] = a,
            n[3 * h + 2] = s;
        var c = new THREE.DataTexture(n,t,e,THREE.RGBFormat);
        return c.needsUpdate = !0,
        c
    }
},
THREE.SceneUtils = {
    createMultiMaterialObject: function(t, e) {
        for (var r = new THREE.Object3D, i = 0, n = e.length; i < n; i++)
            r.add(new THREE.Mesh(t,e[i]));
        return r
    },
    detach: function(t, e, r) {
        t.applyMatrix(e.matrixWorld),
        e.remove(t),
        r.add(t)
    },
    attach: function(t, e, r) {
        var i = new THREE.Matrix4;
        i.getInverse(r.matrixWorld),
        t.applyMatrix(i),
        e.remove(t),
        r.add(t)
    }
},
THREE.FontUtils = {
    faces: {},
    face: "helvetiker",
    weight: "normal",
    style: "normal",
    size: 150,
    divisions: 10,
    getFace: function() {
        try {
            return this.faces[this.face][this.weight][this.style]
        } catch (t) {
            throw "The font " + this.face + " with " + this.weight + " weight and " + this.style + " style is missing."
        }
    },
    loadFace: function(t) {
        var e = t.familyName.toLowerCase();
        return this.faces[e] = this.faces[e] || {},
        this.faces[e][t.cssFontWeight] = this.faces[e][t.cssFontWeight] || {},
        this.faces[e][t.cssFontWeight][t.cssFontStyle] = t,
        this.faces[e][t.cssFontWeight][t.cssFontStyle] = t,
        t
    },
    drawText: function(t) {
        var e, r = this.getFace(), i = this.size / r.resolution, n = 0, o = String(t).split(""), a = o.length, s = [];
        for (e = 0; e < a; e++) {
            var h = new THREE.Path
              , c = this.extractGlyphPoints(o[e], r, i, n, h);
            n += c.offset,
            s.push(c.path)
        }
        return {
            paths: s,
            offset: n / 2
        }
    },
    extractGlyphPoints: function(t, e, r, i, n) {
        var o, a, s, h, c, l, u, E, p, d, f, m, T, g, v, R, y, H, x = [], w = e.glyphs[t] || e.glyphs["?"];
        if (w) {
            if (w.o)
                for (c = (h = w._cachedOutline || (w._cachedOutline = w.o.split(" "))).length,
                l = r,
                u = r,
                o = 0; o < c; )
                    switch (h[o++]) {
                    case "m":
                        E = h[o++] * l + i,
                        p = h[o++] * u,
                        n.moveTo(E, p);
                        break;
                    case "l":
                        E = h[o++] * l + i,
                        p = h[o++] * u,
                        n.lineTo(E, p);
                        break;
                    case "q":
                        if (d = h[o++] * l + i,
                        f = h[o++] * u,
                        g = h[o++] * l + i,
                        v = h[o++] * u,
                        n.quadraticCurveTo(g, v, d, f),
                        H = x[x.length - 1])
                            for (m = H.x,
                            T = H.y,
                            a = 1,
                            s = this.divisions; a <= s; a++) {
                                var b = a / s;
                                THREE.Shape.Utils.b2(b, m, g, d),
                                THREE.Shape.Utils.b2(b, T, v, f)
                            }
                        break;
                    case "b":
                        if (d = h[o++] * l + i,
                        f = h[o++] * u,
                        g = h[o++] * l + i,
                        v = h[o++] * u,
                        R = h[o++] * l + i,
                        y = h[o++] * u,
                        n.bezierCurveTo(g, v, R, y, d, f),
                        H = x[x.length - 1])
                            for (m = H.x,
                            T = H.y,
                            a = 1,
                            s = this.divisions; a <= s; a++) {
                                b = a / s;
                                THREE.Shape.Utils.b3(b, m, g, R, d),
                                THREE.Shape.Utils.b3(b, T, v, y, f)
                            }
                    }
            return {
                offset: w.ha * r,
                path: n
            }
        }
    }
},
THREE.FontUtils.generateShapes = function(t, e) {
    var r = void 0 !== (e = e || {}).size ? e.size : 100
      , i = void 0 !== e.curveSegments ? e.curveSegments : 4
      , n = void 0 !== e.font ? e.font : "helvetiker"
      , o = void 0 !== e.weight ? e.weight : "normal"
      , a = void 0 !== e.style ? e.style : "normal";
    THREE.FontUtils.size = r,
    THREE.FontUtils.divisions = i,
    THREE.FontUtils.face = n,
    THREE.FontUtils.weight = o,
    THREE.FontUtils.style = a;
    for (var s = THREE.FontUtils.drawText(t).paths, h = [], c = 0, l = s.length; c < l; c++)
        Array.prototype.push.apply(h, s[c].toShapes());
    return h
}
,
function(t) {
    var e = function(t) {
        for (var e = t.length, r = 0, i = e - 1, n = 0; n < e; i = n++)
            r += t[i].x * t[n].y - t[n].x * t[i].y;
        return .5 * r
    }
      , r = function(t, e, r, i, n, o) {
        var a, s, h, c, l, u, E, p, d, f, m, T, g, v, R;
        if (s = t[o[e]].x,
        h = t[o[e]].y,
        c = t[o[r]].x,
        l = t[o[r]].y,
        u = t[o[i]].x,
        1e-10 > (c - s) * ((E = t[o[i]].y) - h) - (l - h) * (u - s))
            return !1;
        for (f = u - c,
        m = E - l,
        T = s - u,
        g = h - E,
        v = c - s,
        R = l - h,
        a = 0; a < n; a++)
            if (p = t[o[a]].x,
            d = t[o[a]].y,
            !(p === s && d === h || p === c && d === l || p === u && d === E) && f * (d - l) - m * (p - c) >= -1e-10 && T * (d - E) - g * (p - u) >= -1e-10 && v * (d - h) - R * (p - s) >= -1e-10)
                return !1;
        return !0
    };
    t.Triangulate = function(t, i) {
        var n = t.length;
        if (n < 3)
            return null;
        var o, a, s, h = [], c = [], l = [];
        if (e(t) > 0)
            for (a = 0; a < n; a++)
                c[a] = a;
        else
            for (a = 0; a < n; a++)
                c[a] = n - 1 - a;
        var u = n
          , E = 2 * u;
        for (a = u - 1; u > 2; ) {
            if (E-- <= 0)
                return THREE.warn("THREE.FontUtils: Warning, unable to triangulate polygon! in Triangulate.process()"),
                i ? l : h;
            if (u <= (o = a) && (o = 0),
            u <= (a = o + 1) && (a = 0),
            u <= (s = a + 1) && (s = 0),
            r(t, o, a, s, u, c)) {
                var p, d, f, m, T;
                for (p = c[o],
                d = c[a],
                f = c[s],
                h.push([t[p], t[d], t[f]]),
                l.push([c[o], c[a], c[s]]),
                m = a,
                T = a + 1; T < u; m++,
                T++)
                    c[m] = c[T];
                E = 2 * --u
            }
        }
        return i ? l : h
    }
    ,
    t.Triangulate.area = e
}(THREE.FontUtils),
self._typeface_js = {
    faces: THREE.FontUtils.faces,
    loadFace: THREE.FontUtils.loadFace
},
THREE.typeface_js = self._typeface_js,
THREE.Audio = function(t) {
    THREE.Object3D.call(this),
    this.type = "Audio",
    this.context = t.context,
    this.source = this.context.createBufferSource(),
    this.source.onended = this.onEnded.bind(this),
    this.gain = this.context.createGain(),
    this.gain.connect(this.context.destination),
    this.panner = this.context.createPanner(),
    this.panner.connect(this.gain),
    this.autoplay = !1,
    this.startTime = 0,
    this.isPlaying = !1
}
,
THREE.Audio.prototype = Object.create(THREE.Object3D.prototype),
THREE.Audio.prototype.constructor = THREE.Audio,
THREE.Audio.prototype.load = function(t) {
    var e = this
      , r = new XMLHttpRequest;
    return r.open("GET", t, !0),
    r.responseType = "arraybuffer",
    r.onload = function(t) {
        e.context.decodeAudioData(this.response, function(t) {
            e.source.buffer = t,
            e.autoplay && e.play()
        })
    }
    ,
    r.send(),
    this
}
,
THREE.Audio.prototype.play = function() {
    if (!0 !== this.isPlaying) {
        var t = this.context.createBufferSource();
        t.buffer = this.source.buffer,
        t.loop = this.source.loop,
        t.onended = this.source.onended,
        t.connect(this.panner),
        t.start(0, this.startTime),
        this.isPlaying = !0,
        this.source = t
    } else
        THREE.warn("THREE.Audio: Audio is already playing.")
}
,
THREE.Audio.prototype.pause = function() {
    this.source.stop(),
    this.startTime = this.context.currentTime
}
,
THREE.Audio.prototype.stop = function() {
    this.source.stop(),
    this.startTime = 0
}
,
THREE.Audio.prototype.onEnded = function() {
    this.isPlaying = !1
}
,
THREE.Audio.prototype.setLoop = function(t) {
    this.source.loop = t
}
,
THREE.Audio.prototype.setRefDistance = function(t) {
    this.panner.refDistance = t
}
,
THREE.Audio.prototype.setRolloffFactor = function(t) {
    this.panner.rolloffFactor = t
}
,
THREE.Audio.prototype.setVolume = function(t) {
    this.gain.gain.value = t
}
,
THREE.Audio.prototype.updateMatrixWorld = function() {
    var t = new THREE.Vector3;
    return function(e) {
        THREE.Object3D.prototype.updateMatrixWorld.call(this, e),
        t.setFromMatrixPosition(this.matrixWorld),
        this.panner.setPosition(t.x, t.y, t.z)
    }
}(),
THREE.AudioListener = function() {
    THREE.Object3D.call(this),
    this.type = "AudioListener",
    this.context = new (window.AudioContext || window.webkitAudioContext)
}
,
THREE.AudioListener.prototype = Object.create(THREE.Object3D.prototype),
THREE.AudioListener.prototype.constructor = THREE.AudioListener,
THREE.AudioListener.prototype.updateMatrixWorld = function() {
    var t = new THREE.Vector3
      , e = new THREE.Quaternion
      , r = new THREE.Vector3
      , i = new THREE.Vector3
      , n = new THREE.Vector3
      , o = new THREE.Vector3;
    return function(a) {
        THREE.Object3D.prototype.updateMatrixWorld.call(this, a);
        var s = this.context.listener
          , h = this.up;
        this.matrixWorld.decompose(t, e, r),
        i.set(0, 0, -1).applyQuaternion(e),
        n.subVectors(t, o),
        s.setPosition(t.x, t.y, t.z),
        s.setOrientation(i.x, i.y, i.z, h.x, h.y, h.z),
        s.setVelocity(n.x, n.y, n.z),
        o.copy(t)
    }
}(),
THREE.Curve = function() {}
,
THREE.Curve.prototype.getPoint = function(t) {
    return THREE.warn("THREE.Curve: Warning, getPoint() not implemented!"),
    null
}
,
THREE.Curve.prototype.getPointAt = function(t) {
    var e = this.getUtoTmapping(t);
    return this.getPoint(e)
}
,
THREE.Curve.prototype.getPoints = function(t) {
    t || (t = 5);
    var e, r = [];
    for (e = 0; e <= t; e++)
        r.push(this.getPoint(e / t));
    return r
}
,
THREE.Curve.prototype.getSpacedPoints = function(t) {
    t || (t = 5);
    var e, r = [];
    for (e = 0; e <= t; e++)
        r.push(this.getPointAt(e / t));
    return r
}
,
THREE.Curve.prototype.getLength = function() {
    var t = this.getLengths();
    return t[t.length - 1]
}
,
THREE.Curve.prototype.getLengths = function(t) {
    if (t || (t = this.__arcLengthDivisions ? this.__arcLengthDivisions : 200),
    this.cacheArcLengths && this.cacheArcLengths.length == t + 1 && !this.needsUpdate)
        return this.cacheArcLengths;
    this.needsUpdate = !1;
    var e, r, i = [], n = this.getPoint(0), o = 0;
    for (i.push(0),
    r = 1; r <= t; r++)
        o += (e = this.getPoint(r / t)).distanceTo(n),
        i.push(o),
        n = e;
    return this.cacheArcLengths = i,
    i
}
,
THREE.Curve.prototype.updateArcLengths = function() {
    this.needsUpdate = !0,
    this.getLengths()
}
,
THREE.Curve.prototype.getUtoTmapping = function(t, e) {
    var r, i = this.getLengths(), n = 0, o = i.length;
    r = e || t * i[o - 1];
    for (var a, s = 0, h = o - 1; s <= h; )
        if ((a = i[n = Math.floor(s + (h - s) / 2)] - r) < 0)
            s = n + 1;
        else {
            if (!(a > 0)) {
                h = n;
                break
            }
            h = n - 1
        }
    if (i[n = h] == r)
        return n / (o - 1);
    var c = i[n];
    return (n + (r - c) / (i[n + 1] - c)) / (o - 1)
}
,
THREE.Curve.prototype.getTangent = function(t) {
    var e = t - 1e-4
      , r = t + 1e-4;
    e < 0 && (e = 0),
    r > 1 && (r = 1);
    var i = this.getPoint(e);
    return this.getPoint(r).clone().sub(i).normalize()
}
,
THREE.Curve.prototype.getTangentAt = function(t) {
    var e = this.getUtoTmapping(t);
    return this.getTangent(e)
}
,
THREE.Curve.Utils = {
    tangentQuadraticBezier: function(t, e, r, i) {
        return 2 * (1 - t) * (r - e) + 2 * t * (i - r)
    },
    tangentCubicBezier: function(t, e, r, i, n) {
        return -3 * e * (1 - t) * (1 - t) + 3 * r * (1 - t) * (1 - t) - 6 * t * r * (1 - t) + 6 * t * i * (1 - t) - 3 * t * t * i + 3 * t * t * n
    },
    tangentSpline: function(t, e, r, i, n) {
        return 6 * t * t - 6 * t + (3 * t * t - 4 * t + 1) + (-6 * t * t + 6 * t) + (3 * t * t - 2 * t)
    },
    interpolate: function(t, e, r, i, n) {
        var o = .5 * (r - t)
          , a = .5 * (i - e)
          , s = n * n;
        return (2 * e - 2 * r + o + a) * (n * s) + (-3 * e + 3 * r - 2 * o - a) * s + o * n + e
    }
},
THREE.Curve.create = function(t, e) {
    return t.prototype = Object.create(THREE.Curve.prototype),
    t.prototype.constructor = t,
    t.prototype.getPoint = e,
    t
}
,
THREE.CurvePath = function() {
    this.curves = [],
    this.bends = [],
    this.autoClose = !1
}
,
THREE.CurvePath.prototype = Object.create(THREE.Curve.prototype),
THREE.CurvePath.prototype.constructor = THREE.CurvePath,
THREE.CurvePath.prototype.add = function(t) {
    this.curves.push(t)
}
,
THREE.CurvePath.prototype.checkConnection = function() {}
,
THREE.CurvePath.prototype.closePath = function() {
    var t = this.curves[0].getPoint(0)
      , e = this.curves[this.curves.length - 1].getPoint(1);
    t.equals(e) || this.curves.push(new THREE.LineCurve(e,t))
}
,
THREE.CurvePath.prototype.getPoint = function(t) {
    for (var e, r = t * this.getLength(), i = this.getCurveLengths(), n = 0; n < i.length; ) {
        if (i[n] >= r) {
            var o = 1 - (i[n] - r) / (e = this.curves[n]).getLength();
            return e.getPointAt(o)
        }
        n++
    }
    return null
}
,
THREE.CurvePath.prototype.getLength = function() {
    var t = this.getCurveLengths();
    return t[t.length - 1]
}
,
THREE.CurvePath.prototype.getCurveLengths = function() {
    if (this.cacheLengths && this.cacheLengths.length == this.curves.length)
        return this.cacheLengths;
    var t, e = [], r = 0, i = this.curves.length;
    for (t = 0; t < i; t++)
        r += this.curves[t].getLength(),
        e.push(r);
    return this.cacheLengths = e,
    e
}
,
THREE.CurvePath.prototype.getBoundingBox = function() {
    var t, e, r, i, n, o, a, s, h, c, l = this.getPoints();
    t = e = Number.NEGATIVE_INFINITY,
    i = n = Number.POSITIVE_INFINITY;
    var u = l[0]instanceof THREE.Vector3;
    for (c = u ? new THREE.Vector3 : new THREE.Vector2,
    s = 0,
    h = l.length; s < h; s++)
        (a = l[s]).x > t ? t = a.x : a.x < i && (i = a.x),
        a.y > e ? e = a.y : a.y < n && (n = a.y),
        u && (a.z > r ? r = a.z : a.z < o && (o = a.z)),
        c.add(a);
    var E = {
        minX: i,
        minY: n,
        maxX: t,
        maxY: e
    };
    return u && (E.maxZ = r,
    E.minZ = o),
    E
}
,
THREE.CurvePath.prototype.createPointsGeometry = function(t) {
    var e = this.getPoints(t, !0);
    return this.createGeometry(e)
}
,
THREE.CurvePath.prototype.createSpacedPointsGeometry = function(t) {
    var e = this.getSpacedPoints(t, !0);
    return this.createGeometry(e)
}
,
THREE.CurvePath.prototype.createGeometry = function(t) {
    for (var e = new THREE.Geometry, r = 0; r < t.length; r++)
        e.vertices.push(new THREE.Vector3(t[r].x,t[r].y,t[r].z || 0));
    return e
}
,
THREE.CurvePath.prototype.addWrapPath = function(t) {
    this.bends.push(t)
}
,
THREE.CurvePath.prototype.getTransformedPoints = function(t, e) {
    var r, i, n = this.getPoints(t);
    for (e || (e = this.bends),
    r = 0,
    i = e.length; r < i; r++)
        n = this.getWrapPoints(n, e[r]);
    return n
}
,
THREE.CurvePath.prototype.getTransformedSpacedPoints = function(t, e) {
    var r, i, n = this.getSpacedPoints(t);
    for (e || (e = this.bends),
    r = 0,
    i = e.length; r < i; r++)
        n = this.getWrapPoints(n, e[r]);
    return n
}
,
THREE.CurvePath.prototype.getWrapPoints = function(t, e) {
    var r, i, n, o, a, s, h = this.getBoundingBox();
    for (r = 0,
    i = t.length; r < i; r++) {
        o = (n = t[r]).x,
        a = n.y,
        s = o / h.maxX,
        s = e.getUtoTmapping(s, o);
        var c = e.getPoint(s)
          , l = e.getTangent(s);
        l.set(-l.y, l.x).multiplyScalar(a),
        n.x = c.x + l.x,
        n.y = c.y + l.y
    }
    return t
}
,
THREE.Gyroscope = function() {
    THREE.Object3D.call(this)
}
,
THREE.Gyroscope.prototype = Object.create(THREE.Object3D.prototype),
THREE.Gyroscope.prototype.constructor = THREE.Gyroscope,
THREE.Gyroscope.prototype.updateMatrixWorld = function() {
    var t = new THREE.Vector3
      , e = new THREE.Quaternion
      , r = new THREE.Vector3
      , i = new THREE.Vector3
      , n = new THREE.Quaternion
      , o = new THREE.Vector3;
    return function(a) {
        this.matrixAutoUpdate && this.updateMatrix(),
        (this.matrixWorldNeedsUpdate || a) && (this.parent ? (this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix),
        this.matrixWorld.decompose(i, n, o),
        this.matrix.decompose(t, e, r),
        this.matrixWorld.compose(i, e, o)) : this.matrixWorld.copy(this.matrix),
        this.matrixWorldNeedsUpdate = !1,
        a = !0);
        for (var s = 0, h = this.children.length; s < h; s++)
            this.children[s].updateMatrixWorld(a)
    }
}(),
THREE.Path = function(t) {
    THREE.CurvePath.call(this),
    this.actions = [],
    t && this.fromPoints(t)
}
,
THREE.Path.prototype = Object.create(THREE.CurvePath.prototype),
THREE.Path.prototype.constructor = THREE.Path,
THREE.PathActions = {
    MOVE_TO: "moveTo",
    LINE_TO: "lineTo",
    QUADRATIC_CURVE_TO: "quadraticCurveTo",
    BEZIER_CURVE_TO: "bezierCurveTo",
    CSPLINE_THRU: "splineThru",
    ARC: "arc",
    ELLIPSE: "ellipse"
},
THREE.Path.prototype.fromPoints = function(t) {
    this.moveTo(t[0].x, t[0].y);
    for (var e = 1, r = t.length; e < r; e++)
        this.lineTo(t[e].x, t[e].y)
}
,
THREE.Path.prototype.moveTo = function(t, e) {
    var r = Array.prototype.slice.call(arguments);
    this.actions.push({
        action: THREE.PathActions.MOVE_TO,
        args: r
    })
}
,
THREE.Path.prototype.lineTo = function(t, e) {
    var r = Array.prototype.slice.call(arguments)
      , i = this.actions[this.actions.length - 1].args
      , n = i[i.length - 2]
      , o = i[i.length - 1]
      , a = new THREE.LineCurve(new THREE.Vector2(n,o),new THREE.Vector2(t,e));
    this.curves.push(a),
    this.actions.push({
        action: THREE.PathActions.LINE_TO,
        args: r
    })
}
,
THREE.Path.prototype.quadraticCurveTo = function(t, e, r, i) {
    var n = Array.prototype.slice.call(arguments)
      , o = this.actions[this.actions.length - 1].args
      , a = o[o.length - 2]
      , s = o[o.length - 1]
      , h = new THREE.QuadraticBezierCurve(new THREE.Vector2(a,s),new THREE.Vector2(t,e),new THREE.Vector2(r,i));
    this.curves.push(h),
    this.actions.push({
        action: THREE.PathActions.QUADRATIC_CURVE_TO,
        args: n
    })
}
,
THREE.Path.prototype.bezierCurveTo = function(t, e, r, i, n, o) {
    var a = Array.prototype.slice.call(arguments)
      , s = this.actions[this.actions.length - 1].args
      , h = s[s.length - 2]
      , c = s[s.length - 1]
      , l = new THREE.CubicBezierCurve(new THREE.Vector2(h,c),new THREE.Vector2(t,e),new THREE.Vector2(r,i),new THREE.Vector2(n,o));
    this.curves.push(l),
    this.actions.push({
        action: THREE.PathActions.BEZIER_CURVE_TO,
        args: a
    })
}
,
THREE.Path.prototype.splineThru = function(t) {
    var e = Array.prototype.slice.call(arguments)
      , r = this.actions[this.actions.length - 1].args
      , i = r[r.length - 2]
      , n = r[r.length - 1]
      , o = [new THREE.Vector2(i,n)];
    Array.prototype.push.apply(o, t);
    var a = new THREE.SplineCurve(o);
    this.curves.push(a),
    this.actions.push({
        action: THREE.PathActions.CSPLINE_THRU,
        args: e
    })
}
,
THREE.Path.prototype.arc = function(t, e, r, i, n, o) {
    var a = this.actions[this.actions.length - 1].args
      , s = a[a.length - 2]
      , h = a[a.length - 1];
    this.absarc(t + s, e + h, r, i, n, o)
}
,
THREE.Path.prototype.absarc = function(t, e, r, i, n, o) {
    this.absellipse(t, e, r, r, i, n, o)
}
,
THREE.Path.prototype.ellipse = function(t, e, r, i, n, o, a) {
    var s = this.actions[this.actions.length - 1].args
      , h = s[s.length - 2]
      , c = s[s.length - 1];
    this.absellipse(t + h, e + c, r, i, n, o, a)
}
,
THREE.Path.prototype.absellipse = function(t, e, r, i, n, o, a) {
    var s = Array.prototype.slice.call(arguments)
      , h = new THREE.EllipseCurve(t,e,r,i,n,o,a);
    this.curves.push(h);
    var c = h.getPoint(1);
    s.push(c.x),
    s.push(c.y),
    this.actions.push({
        action: THREE.PathActions.ELLIPSE,
        args: s
    })
}
,
THREE.Path.prototype.getSpacedPoints = function(t, e) {
    t || (t = 40);
    for (var r = [], i = 0; i < t; i++)
        r.push(this.getPoint(i / t));
    return r
}
,
THREE.Path.prototype.getPoints = function(t, e) {
    if (this.useSpacedPoints)
        return console.log("tata"),
        this.getSpacedPoints(t, e);
    t = t || 12;
    var r, i, n, o, a, s, h, c, l, u, E, p, d, f, m, T, g, v, R = [];
    for (r = 0,
    i = this.actions.length; r < i; r++)
        switch (o = (n = this.actions[r]).action,
        a = n.args,
        o) {
        case THREE.PathActions.MOVE_TO:
        case THREE.PathActions.LINE_TO:
            R.push(new THREE.Vector2(a[0],a[1]));
            break;
        case THREE.PathActions.QUADRATIC_CURVE_TO:
            for (s = a[2],
            h = a[3],
            u = a[0],
            E = a[1],
            R.length > 0 ? (p = (f = R[R.length - 1]).x,
            d = f.y) : (p = (f = this.actions[r - 1].args)[f.length - 2],
            d = f[f.length - 1]),
            m = 1; m <= t; m++)
                T = m / t,
                g = THREE.Shape.Utils.b2(T, p, u, s),
                v = THREE.Shape.Utils.b2(T, d, E, h),
                R.push(new THREE.Vector2(g,v));
            break;
        case THREE.PathActions.BEZIER_CURVE_TO:
            for (s = a[4],
            h = a[5],
            u = a[0],
            E = a[1],
            c = a[2],
            l = a[3],
            R.length > 0 ? (p = (f = R[R.length - 1]).x,
            d = f.y) : (p = (f = this.actions[r - 1].args)[f.length - 2],
            d = f[f.length - 1]),
            m = 1; m <= t; m++)
                T = m / t,
                g = THREE.Shape.Utils.b3(T, p, u, c, s),
                v = THREE.Shape.Utils.b3(T, d, E, l, h),
                R.push(new THREE.Vector2(g,v));
            break;
        case THREE.PathActions.CSPLINE_THRU:
            f = this.actions[r - 1].args;
            var y = [new THREE.Vector2(f[f.length - 2],f[f.length - 1])]
              , H = t * a[0].length;
            y = y.concat(a[0]);
            var x = new THREE.SplineCurve(y);
            for (m = 1; m <= H; m++)
                R.push(x.getPointAt(m / H));
            break;
        case THREE.PathActions.ARC:
            var w = a[0]
              , b = a[1]
              , M = a[2]
              , _ = a[3]
              , S = a[4]
              , C = !!a[5]
              , A = S - _
              , L = 2 * t;
            for (m = 1; m <= L; m++)
                T = m / L,
                C || (T = 1 - T),
                P = _ + T * A,
                g = w + M * Math.cos(P),
                v = b + M * Math.sin(P),
                R.push(new THREE.Vector2(g,v));
            break;
        case THREE.PathActions.ELLIPSE:
            w = a[0],
            b = a[1];
            var P, F = a[2], B = a[3];
            _ = a[4],
            S = a[5],
            C = !!a[6],
            A = S - _,
            L = 2 * t;
            for (m = 1; m <= L; m++)
                T = m / L,
                C || (T = 1 - T),
                P = _ + T * A,
                g = w + F * Math.cos(P),
                v = b + B * Math.sin(P),
                R.push(new THREE.Vector2(g,v))
        }
    var U = R[R.length - 1];
    return Math.abs(U.x - R[0].x) < 1e-10 && Math.abs(U.y - R[0].y) < 1e-10 && R.splice(R.length - 1, 1),
    e && R.push(R[0]),
    R
}
,
THREE.Path.prototype.toShapes = function(t, e) {
    function r(t) {
        for (var e = [], r = 0, i = t.length; r < i; r++) {
            var n = t[r]
              , o = new THREE.Shape;
            o.actions = n.actions,
            o.curves = n.curves,
            e.push(o)
        }
        return e
    }
    function i(t, e) {
        for (var r = e.length, i = !1, n = r - 1, o = 0; o < r; n = o++) {
            var a = e[n]
              , s = e[o]
              , h = s.x - a.x
              , c = s.y - a.y;
            if (Math.abs(c) > 1e-10) {
                if (c < 0 && (a = e[o],
                h = -h,
                s = e[n],
                c = -c),
                t.y < a.y || t.y > s.y)
                    continue;
                if (t.y == a.y) {
                    if (t.x == a.x)
                        return !0
                } else {
                    var l = c * (t.x - a.x) - h * (t.y - a.y);
                    if (0 == l)
                        return !0;
                    if (l < 0)
                        continue;
                    i = !i
                }
            } else {
                if (t.y != a.y)
                    continue;
                if (s.x <= t.x && t.x <= a.x || a.x <= t.x && t.x <= s.x)
                    return !0
            }
        }
        return i
    }
    var n = function(t) {
        var e, r, i, n, o, a = [], s = new THREE.Path;
        for (e = 0,
        r = t.length; e < r; e++)
            o = (i = t[e]).args,
            (n = i.action) == THREE.PathActions.MOVE_TO && 0 != s.actions.length && (a.push(s),
            s = new THREE.Path),
            s[n].apply(s, o);
        return 0 != s.actions.length && a.push(s),
        a
    }(this.actions);
    if (0 == n.length)
        return [];
    if (!0 === e)
        return r(n);
    var o, a, s, h = [];
    if (1 == n.length)
        return a = n[0],
        (s = new THREE.Shape).actions = a.actions,
        s.curves = a.curves,
        h.push(s),
        h;
    var c = !THREE.Shape.Utils.isClockWise(n[0].getPoints());
    c = t ? !c : c;
    var l, u, E, p, d, f, m = [], T = [], g = [], v = 0;
    for (T[v] = void 0,
    g[v] = [],
    u = 0,
    E = n.length; u < E; u++)
        l = (a = n[u]).getPoints(),
        o = THREE.Shape.Utils.isClockWise(l),
        (o = t ? !o : o) ? (!c && T[v] && v++,
        T[v] = {
            s: new THREE.Shape,
            p: l
        },
        T[v].s.actions = a.actions,
        T[v].s.curves = a.curves,
        c && v++,
        g[v] = []) : g[v].push({
            h: a,
            p: l[0]
        });
    if (!T[0])
        return r(n);
    if (T.length > 1) {
        for (var R = !1, y = [], H = 0, x = T.length; H < x; H++)
            m[H] = [];
        for (H = 0,
        x = T.length; H < x; H++)
            for (var w = g[H], b = 0; b < w.length; b++) {
                for (var M = w[b], _ = !0, S = 0; S < T.length; S++)
                    i(M.p, T[S].p) && (H != S && y.push({
                        froms: H,
                        tos: S,
                        hole: b
                    }),
                    _ ? (_ = !1,
                    m[S].push(M)) : R = !0);
                _ && m[H].push(M)
            }
        y.length > 0 && (R || (g = m))
    }
    for (u = 0,
    E = T.length; u < E; u++)
        for (s = T[u].s,
        h.push(s),
        d = 0,
        f = (p = g[u]).length; d < f; d++)
            s.holes.push(p[d].h);
    return h
}
,
THREE.Shape = function() {
    THREE.Path.apply(this, arguments),
    this.holes = []
}
,
THREE.Shape.prototype = Object.create(THREE.Path.prototype),
THREE.Shape.prototype.constructor = THREE.Shape,
THREE.Shape.prototype.extrude = function(t) {
    return new THREE.ExtrudeGeometry(this,t)
}
,
THREE.Shape.prototype.makeGeometry = function(t) {
    return new THREE.ShapeGeometry(this,t)
}
,
THREE.Shape.prototype.getPointsHoles = function(t) {
    var e, r = this.holes.length, i = [];
    for (e = 0; e < r; e++)
        i[e] = this.holes[e].getTransformedPoints(t, this.bends);
    return i
}
,
THREE.Shape.prototype.getSpacedPointsHoles = function(t) {
    var e, r = this.holes.length, i = [];
    for (e = 0; e < r; e++)
        i[e] = this.holes[e].getTransformedSpacedPoints(t, this.bends);
    return i
}
,
THREE.Shape.prototype.extractAllPoints = function(t) {
    return {
        shape: this.getTransformedPoints(t),
        holes: this.getPointsHoles(t)
    }
}
,
THREE.Shape.prototype.extractPoints = function(t) {
    return this.useSpacedPoints ? this.extractAllSpacedPoints(t) : this.extractAllPoints(t)
}
,
THREE.Shape.prototype.extractAllSpacedPoints = function(t) {
    return {
        shape: this.getTransformedSpacedPoints(t),
        holes: this.getSpacedPointsHoles(t)
    }
}
,
THREE.Shape.Utils = {
    triangulateShape: function(t, e) {
        function r(t, e, r) {
            return t.x != e.x ? t.x < e.x ? t.x <= r.x && r.x <= e.x : e.x <= r.x && r.x <= t.x : t.y < e.y ? t.y <= r.y && r.y <= e.y : e.y <= r.y && r.y <= t.y
        }
        function i(t, e, i, n, o) {
            var a = e.x - t.x
              , s = e.y - t.y
              , h = n.x - i.x
              , c = n.y - i.y
              , l = t.x - i.x
              , u = t.y - i.y
              , E = s * h - a * c
              , p = s * l - a * u;
            if (Math.abs(E) > 1e-10) {
                var d;
                if (E > 0) {
                    if (p < 0 || p > E)
                        return [];
                    if ((d = c * l - h * u) < 0 || d > E)
                        return []
                } else {
                    if (p > 0 || p < E)
                        return [];
                    if ((d = c * l - h * u) > 0 || d < E)
                        return []
                }
                if (0 == d)
                    return !o || 0 != p && p != E ? [t] : [];
                if (d == E)
                    return !o || 0 != p && p != E ? [e] : [];
                if (0 == p)
                    return [i];
                if (p == E)
                    return [n];
                var f = d / E;
                return [{
                    x: t.x + f * a,
                    y: t.y + f * s
                }]
            }
            if (0 != p || c * l != h * u)
                return [];
            var m, T, g, v, R, y, H, x, w = 0 == a && 0 == s, b = 0 == h && 0 == c;
            return w && b ? t.x != i.x || t.y != i.y ? [] : [t] : w ? r(i, n, t) ? [t] : [] : b ? r(t, e, i) ? [i] : [] : (0 != a ? (t.x < e.x ? (m = t,
            g = t.x,
            T = e,
            v = e.x) : (m = e,
            g = e.x,
            T = t,
            v = t.x),
            i.x < n.x ? (R = i,
            H = i.x,
            y = n,
            x = n.x) : (R = n,
            H = n.x,
            y = i,
            x = i.x)) : (t.y < e.y ? (m = t,
            g = t.y,
            T = e,
            v = e.y) : (m = e,
            g = e.y,
            T = t,
            v = t.y),
            i.y < n.y ? (R = i,
            H = i.y,
            y = n,
            x = n.y) : (R = n,
            H = n.y,
            y = i,
            x = i.y)),
            g <= H ? v < H ? [] : v == H ? o ? [] : [R] : v <= x ? [R, T] : [R, y] : g > x ? [] : g == x ? o ? [] : [m] : v <= x ? [m, T] : [m, y])
        }
        function n(t, e, r, i) {
            var n = e.x - t.x
              , o = e.y - t.y
              , a = r.x - t.x
              , s = r.y - t.y
              , h = i.x - t.x
              , c = i.y - t.y
              , l = n * s - o * a
              , u = n * c - o * h;
            if (Math.abs(l) > 1e-10) {
                var E = h * s - c * a;
                return l > 0 ? u >= 0 && E >= 0 : u >= 0 || E >= 0
            }
            return u > 0
        }
        for (var o, a, s, h, c, l, u = {}, E = t.concat(), p = 0, d = e.length; p < d; p++)
            Array.prototype.push.apply(E, e[p]);
        for (o = 0,
        a = E.length; o < a; o++)
            void 0 !== u[c = E[o].x + ":" + E[o].y] && THREE.warn("THREE.Shape: Duplicate point", c),
            u[c] = o;
        var f = function(t, e) {
            var r, o = t.concat();
            function a(t, e) {
                var i = o.length - 1
                  , a = t - 1;
                a < 0 && (a = i);
                var s = t + 1;
                s > i && (s = 0);
                var h = n(o[t], o[a], o[s], r[e]);
                if (!h)
                    return !1;
                var c = r.length - 1
                  , l = e - 1;
                l < 0 && (l = c);
                var u = e + 1;
                return u > c && (u = 0),
                !!(h = n(r[e], r[l], r[u], o[t]))
            }
            function s(t, e) {
                var r, n;
                for (r = 0; r < o.length; r++)
                    if (n = r + 1,
                    n %= o.length,
                    i(t, e, o[r], o[n], !0).length > 0)
                        return !0;
                return !1
            }
            var h = [];
            function c(t, r) {
                var n, o, a, s;
                for (n = 0; n < h.length; n++)
                    for (o = e[h[n]],
                    a = 0; a < o.length; a++)
                        if (s = a + 1,
                        s %= o.length,
                        i(t, r, o[a], o[s], !0).length > 0)
                            return !0;
                return !1
            }
            for (var l, u, E, p, d, f, m, T, g, v, R = [], y = 0, H = e.length; y < H; y++)
                h.push(y);
            for (var x = 0, w = 2 * h.length; h.length > 0; ) {
                if (--w < 0) {
                    console.log("Infinite Loop! Holes left:" + h.length + ", Probably Hole outside Shape!");
                    break
                }
                for (u = x; u < o.length; u++) {
                    for (E = o[u],
                    l = -1,
                    y = 0; y < h.length; y++)
                        if (d = h[y],
                        void 0 === R[f = E.x + ":" + E.y + ":" + d]) {
                            r = e[d];
                            for (var b = 0; b < r.length; b++)
                                if (p = r[b],
                                a(u, b) && !s(E, p) && !c(E, p)) {
                                    l = b,
                                    h.splice(y, 1),
                                    m = o.slice(0, u + 1),
                                    T = o.slice(u),
                                    g = r.slice(l),
                                    v = r.slice(0, l + 1),
                                    o = m.concat(g).concat(v).concat(T),
                                    x = u;
                                    break
                                }
                            if (l >= 0)
                                break;
                            R[f] = !0
                        }
                    if (l >= 0)
                        break
                }
            }
            return o
        }(t, e)
          , m = THREE.FontUtils.Triangulate(f, !1);
        for (o = 0,
        a = m.length; o < a; o++)
            for (h = m[o],
            s = 0; s < 3; s++)
                void 0 !== (l = u[c = h[s].x + ":" + h[s].y]) && (h[s] = l);
        return m.concat()
    },
    isClockWise: function(t) {
        return THREE.FontUtils.Triangulate.area(t) < 0
    },
    b2p0: function(t, e) {
        var r = 1 - t;
        return r * r * e
    },
    b2p1: function(t, e) {
        return 2 * (1 - t) * t * e
    },
    b2p2: function(t, e) {
        return t * t * e
    },
    b2: function(t, e, r, i) {
        return this.b2p0(t, e) + this.b2p1(t, r) + this.b2p2(t, i)
    },
    b3p0: function(t, e) {
        var r = 1 - t;
        return r * r * r * e
    },
    b3p1: function(t, e) {
        var r = 1 - t;
        return 3 * r * r * t * e
    },
    b3p2: function(t, e) {
        return 3 * (1 - t) * t * t * e
    },
    b3p3: function(t, e) {
        return t * t * t * e
    },
    b3: function(t, e, r, i, n) {
        return this.b3p0(t, e) + this.b3p1(t, r) + this.b3p2(t, i) + this.b3p3(t, n)
    }
},
THREE.LineCurve = function(t, e) {
    this.v1 = t,
    this.v2 = e
}
,
THREE.LineCurve.prototype = Object.create(THREE.Curve.prototype),
THREE.LineCurve.prototype.constructor = THREE.LineCurve,
THREE.LineCurve.prototype.getPoint = function(t) {
    var e = this.v2.clone().sub(this.v1);
    return e.multiplyScalar(t).add(this.v1),
    e
}
,
THREE.LineCurve.prototype.getPointAt = function(t) {
    return this.getPoint(t)
}
,
THREE.LineCurve.prototype.getTangent = function(t) {
    return this.v2.clone().sub(this.v1).normalize()
}
,
THREE.QuadraticBezierCurve = function(t, e, r) {
    this.v0 = t,
    this.v1 = e,
    this.v2 = r
}
,
THREE.QuadraticBezierCurve.prototype = Object.create(THREE.Curve.prototype),
THREE.QuadraticBezierCurve.prototype.constructor = THREE.QuadraticBezierCurve,
THREE.QuadraticBezierCurve.prototype.getPoint = function(t) {
    var e = new THREE.Vector2;
    return e.x = THREE.Shape.Utils.b2(t, this.v0.x, this.v1.x, this.v2.x),
    e.y = THREE.Shape.Utils.b2(t, this.v0.y, this.v1.y, this.v2.y),
    e
}
,
THREE.QuadraticBezierCurve.prototype.getTangent = function(t) {
    var e = new THREE.Vector2;
    return e.x = THREE.Curve.Utils.tangentQuadraticBezier(t, this.v0.x, this.v1.x, this.v2.x),
    e.y = THREE.Curve.Utils.tangentQuadraticBezier(t, this.v0.y, this.v1.y, this.v2.y),
    e.normalize()
}
,
THREE.CubicBezierCurve = function(t, e, r, i) {
    this.v0 = t,
    this.v1 = e,
    this.v2 = r,
    this.v3 = i
}
,
THREE.CubicBezierCurve.prototype = Object.create(THREE.Curve.prototype),
THREE.CubicBezierCurve.prototype.constructor = THREE.CubicBezierCurve,
THREE.CubicBezierCurve.prototype.getPoint = function(t) {
    var e, r;
    return e = THREE.Shape.Utils.b3(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x),
    r = THREE.Shape.Utils.b3(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y),
    new THREE.Vector2(e,r)
}
,
THREE.CubicBezierCurve.prototype.getTangent = function(t) {
    var e, r;
    e = THREE.Curve.Utils.tangentCubicBezier(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x),
    r = THREE.Curve.Utils.tangentCubicBezier(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y);
    var i = new THREE.Vector2(e,r);
    return i.normalize(),
    i
}
,
THREE.SplineCurve = function(t) {
    this.points = void 0 == t ? [] : t
}
,
THREE.SplineCurve.prototype = Object.create(THREE.Curve.prototype),
THREE.SplineCurve.prototype.constructor = THREE.SplineCurve,
THREE.SplineCurve.prototype.getPoint = function(t) {
    var e = this.points
      , r = (e.length - 1) * t
      , i = Math.floor(r)
      , n = r - i
      , o = e[0 == i ? i : i - 1]
      , a = e[i]
      , s = e[i > e.length - 2 ? e.length - 1 : i + 1]
      , h = e[i > e.length - 3 ? e.length - 1 : i + 2]
      , c = new THREE.Vector2;
    return c.x = THREE.Curve.Utils.interpolate(o.x, a.x, s.x, h.x, n),
    c.y = THREE.Curve.Utils.interpolate(o.y, a.y, s.y, h.y, n),
    c
}
,
THREE.EllipseCurve = function(t, e, r, i, n, o, a) {
    this.aX = t,
    this.aY = e,
    this.xRadius = r,
    this.yRadius = i,
    this.aStartAngle = n,
    this.aEndAngle = o,
    this.aClockwise = a
}
,
THREE.EllipseCurve.prototype = Object.create(THREE.Curve.prototype),
THREE.EllipseCurve.prototype.constructor = THREE.EllipseCurve,
THREE.EllipseCurve.prototype.getPoint = function(t) {
    var e, r = this.aEndAngle - this.aStartAngle;
    r < 0 && (r += 2 * Math.PI),
    r > 2 * Math.PI && (r -= 2 * Math.PI),
    e = !0 === this.aClockwise ? this.aEndAngle + (1 - t) * (2 * Math.PI - r) : this.aStartAngle + t * r;
    var i = new THREE.Vector2;
    return i.x = this.aX + this.xRadius * Math.cos(e),
    i.y = this.aY + this.yRadius * Math.sin(e),
    i
}
,
THREE.ArcCurve = function(t, e, r, i, n, o) {
    THREE.EllipseCurve.call(this, t, e, r, r, i, n, o)
}
,
THREE.ArcCurve.prototype = Object.create(THREE.EllipseCurve.prototype),
THREE.ArcCurve.prototype.constructor = THREE.ArcCurve,
THREE.LineCurve3 = THREE.Curve.create(function(t, e) {
    this.v1 = t,
    this.v2 = e
}, function(t) {
    var e = new THREE.Vector3;
    return e.subVectors(this.v2, this.v1),
    e.multiplyScalar(t),
    e.add(this.v1),
    e
}),
THREE.QuadraticBezierCurve3 = THREE.Curve.create(function(t, e, r) {
    this.v0 = t,
    this.v1 = e,
    this.v2 = r
}, function(t) {
    var e = new THREE.Vector3;
    return e.x = THREE.Shape.Utils.b2(t, this.v0.x, this.v1.x, this.v2.x),
    e.y = THREE.Shape.Utils.b2(t, this.v0.y, this.v1.y, this.v2.y),
    e.z = THREE.Shape.Utils.b2(t, this.v0.z, this.v1.z, this.v2.z),
    e
}),
THREE.CubicBezierCurve3 = THREE.Curve.create(function(t, e, r, i) {
    this.v0 = t,
    this.v1 = e,
    this.v2 = r,
    this.v3 = i
}, function(t) {
    var e = new THREE.Vector3;
    return e.x = THREE.Shape.Utils.b3(t, this.v0.x, this.v1.x, this.v2.x, this.v3.x),
    e.y = THREE.Shape.Utils.b3(t, this.v0.y, this.v1.y, this.v2.y, this.v3.y),
    e.z = THREE.Shape.Utils.b3(t, this.v0.z, this.v1.z, this.v2.z, this.v3.z),
    e
}),
THREE.SplineCurve3 = THREE.Curve.create(function(t) {
    this.points = void 0 == t ? [] : t
}, function(t) {
    var e = this.points
      , r = (e.length - 1) * t
      , i = Math.floor(r)
      , n = r - i
      , o = e[0 == i ? i : i - 1]
      , a = e[i]
      , s = e[i > e.length - 2 ? e.length - 1 : i + 1]
      , h = e[i > e.length - 3 ? e.length - 1 : i + 2]
      , c = new THREE.Vector3;
    return c.x = THREE.Curve.Utils.interpolate(o.x, a.x, s.x, h.x, n),
    c.y = THREE.Curve.Utils.interpolate(o.y, a.y, s.y, h.y, n),
    c.z = THREE.Curve.Utils.interpolate(o.z, a.z, s.z, h.z, n),
    c
}),
THREE.ClosedSplineCurve3 = THREE.Curve.create(function(t) {
    this.points = void 0 == t ? [] : t
}, function(t) {
    var e = this.points
      , r = (e.length - 0) * t
      , i = Math.floor(r)
      , n = r - i
      , o = e[((i += i > 0 ? 0 : (Math.floor(Math.abs(i) / e.length) + 1) * e.length) - 1) % e.length]
      , a = e[i % e.length]
      , s = e[(i + 1) % e.length]
      , h = e[(i + 2) % e.length]
      , c = new THREE.Vector3;
    return c.x = THREE.Curve.Utils.interpolate(o.x, a.x, s.x, h.x, n),
    c.y = THREE.Curve.Utils.interpolate(o.y, a.y, s.y, h.y, n),
    c.z = THREE.Curve.Utils.interpolate(o.z, a.z, s.z, h.z, n),
    c
}),
THREE.AnimationHandler = {
    LINEAR: 0,
    CATMULLROM: 1,
    CATMULLROM_FORWARD: 2,
    add: function() {
        THREE.warn("THREE.AnimationHandler.add() has been deprecated.")
    },
    get: function() {
        THREE.warn("THREE.AnimationHandler.get() has been deprecated.")
    },
    remove: function() {
        THREE.warn("THREE.AnimationHandler.remove() has been deprecated.")
    },
    animations: [],
    init: function(t) {
        if (!0 === t.initialized)
            return t;
        for (var e = 0; e < t.hierarchy.length; e++) {
            for (var r = 0; r < t.hierarchy[e].keys.length; r++)
                if (t.hierarchy[e].keys[r].time < 0 && (t.hierarchy[e].keys[r].time = 0),
                void 0 !== t.hierarchy[e].keys[r].rot && !(t.hierarchy[e].keys[r].rot instanceof THREE.Quaternion)) {
                    var i = t.hierarchy[e].keys[r].rot;
                    t.hierarchy[e].keys[r].rot = (new THREE.Quaternion).fromArray(i)
                }
            if (t.hierarchy[e].keys.length && void 0 !== t.hierarchy[e].keys[0].morphTargets) {
                var n = {};
                for (r = 0; r < t.hierarchy[e].keys.length; r++)
                    for (var o = 0; o < t.hierarchy[e].keys[r].morphTargets.length; o++) {
                        n[s = t.hierarchy[e].keys[r].morphTargets[o]] = -1
                    }
                t.hierarchy[e].usedMorphTargets = n;
                for (r = 0; r < t.hierarchy[e].keys.length; r++) {
                    var a = {};
                    for (var s in n) {
                        for (o = 0; o < t.hierarchy[e].keys[r].morphTargets.length; o++)
                            if (t.hierarchy[e].keys[r].morphTargets[o] === s) {
                                a[s] = t.hierarchy[e].keys[r].morphTargetsInfluences[o];
                                break
                            }
                        o === t.hierarchy[e].keys[r].morphTargets.length && (a[s] = 0)
                    }
                    t.hierarchy[e].keys[r].morphTargetsInfluences = a
                }
            }
            for (r = 1; r < t.hierarchy[e].keys.length; r++)
                t.hierarchy[e].keys[r].time === t.hierarchy[e].keys[r - 1].time && (t.hierarchy[e].keys.splice(r, 1),
                r--);
            for (r = 0; r < t.hierarchy[e].keys.length; r++)
                t.hierarchy[e].keys[r].index = r
        }
        return t.initialized = !0,
        t
    },
    parse: function(t) {
        var e = function(t, r) {
            r.push(t);
            for (var i = 0; i < t.children.length; i++)
                e(t.children[i], r)
        }
          , r = [];
        if (t instanceof THREE.SkinnedMesh)
            for (var i = 0; i < t.skeleton.bones.length; i++)
                r.push(t.skeleton.bones[i]);
        else
            e(t, r);
        return r
    },
    play: function(t) {
        -1 === this.animations.indexOf(t) && this.animations.push(t)
    },
    stop: function(t) {
        var e = this.animations.indexOf(t);
        -1 !== e && this.animations.splice(e, 1)
    },
    update: function(t) {
        for (var e = 0; e < this.animations.length; e++)
            this.animations[e].resetBlendWeights();
        for (e = 0; e < this.animations.length; e++)
            this.animations[e].update(t)
    }
},
THREE.Animation = function(t, e) {
    this.root = t,
    this.data = THREE.AnimationHandler.init(e),
    this.hierarchy = THREE.AnimationHandler.parse(t),
    this.currentTime = 0,
    this.timeScale = 1,
    this.isPlaying = !1,
    this.loop = !0,
    this.weight = 0,
    this.interpolationType = THREE.AnimationHandler.LINEAR
}
,
THREE.Animation.prototype = {
    constructor: THREE.Animation,
    keyTypes: ["pos", "rot", "scl"],
    play: function(t, e) {
        this.currentTime = void 0 !== t ? t : 0,
        this.weight = void 0 !== e ? e : 1,
        this.isPlaying = !0,
        this.reset(),
        THREE.AnimationHandler.play(this)
    },
    stop: function() {
        this.isPlaying = !1,
        THREE.AnimationHandler.stop(this)
    },
    reset: function() {
        for (var t = 0, e = this.hierarchy.length; t < e; t++) {
            var r = this.hierarchy[t];
            void 0 === r.animationCache && (r.animationCache = {
                animations: {},
                blending: {
                    positionWeight: 0,
                    quaternionWeight: 0,
                    scaleWeight: 0
                }
            });
            var i = this.data.name
              , n = r.animationCache.animations
              , o = n[i];
            void 0 === o && (o = {
                prevKey: {
                    pos: 0,
                    rot: 0,
                    scl: 0
                },
                nextKey: {
                    pos: 0,
                    rot: 0,
                    scl: 0
                },
                originalMatrix: r.matrix
            },
            n[i] = o);
            for (var a = 0; a < 3; a++) {
                for (var s = this.keyTypes[a], h = this.data.hierarchy[t].keys[0], c = this.getNextKeyWith(s, t, 1); c.time < this.currentTime && c.index > h.index; )
                    h = c,
                    c = this.getNextKeyWith(s, t, c.index + 1);
                o.prevKey[s] = h,
                o.nextKey[s] = c
            }
        }
    },
    resetBlendWeights: function() {
        for (var t = 0, e = this.hierarchy.length; t < e; t++) {
            var r = this.hierarchy[t].animationCache;
            if (void 0 !== r) {
                var i = r.blending;
                i.positionWeight = 0,
                i.quaternionWeight = 0,
                i.scaleWeight = 0
            }
        }
    },
    update: function() {
        var t = []
          , e = new THREE.Vector3
          , r = new THREE.Vector3
          , i = new THREE.Quaternion
          , n = function(t, e) {
            var r, i, n, a, s, h, c, l, u, E = [], p = [];
            return n = (r = (t.length - 1) * e) - (i = Math.floor(r)),
            E[0] = 0 === i ? i : i - 1,
            E[1] = i,
            E[2] = i > t.length - 2 ? i : i + 1,
            E[3] = i > t.length - 3 ? i : i + 2,
            h = t[E[0]],
            c = t[E[1]],
            l = t[E[2]],
            u = t[E[3]],
            s = n * (a = n * n),
            p[0] = o(h[0], c[0], l[0], u[0], n, a, s),
            p[1] = o(h[1], c[1], l[1], u[1], n, a, s),
            p[2] = o(h[2], c[2], l[2], u[2], n, a, s),
            p
        }
          , o = function(t, e, r, i, n, o, a) {
            var s = .5 * (r - t)
              , h = .5 * (i - e);
            return (2 * (e - r) + s + h) * a + (-3 * (e - r) - 2 * s - h) * o + s * n + e
        };
        return function(o) {
            if (!1 !== this.isPlaying && (this.currentTime += o * this.timeScale,
            0 !== this.weight)) {
                var a = this.data.length;
                (this.currentTime > a || this.currentTime < 0) && (this.loop ? (this.currentTime %= a,
                this.currentTime < 0 && (this.currentTime += a),
                this.reset()) : this.stop());
                for (var s = 0, h = this.hierarchy.length; s < h; s++)
                    for (var c = this.hierarchy[s], l = c.animationCache.animations[this.data.name], u = c.animationCache.blending, E = 0; E < 3; E++) {
                        var p = this.keyTypes[E]
                          , d = l.prevKey[p]
                          , f = l.nextKey[p];
                        if (this.timeScale > 0 && f.time <= this.currentTime || this.timeScale < 0 && d.time >= this.currentTime) {
                            for (d = this.data.hierarchy[s].keys[0],
                            f = this.getNextKeyWith(p, s, 1); f.time < this.currentTime && f.index > d.index; )
                                d = f,
                                f = this.getNextKeyWith(p, s, f.index + 1);
                            l.prevKey[p] = d,
                            l.nextKey[p] = f
                        }
                        var m = (this.currentTime - d.time) / (f.time - d.time)
                          , T = d[p]
                          , g = f[p];
                        if (m < 0 && (m = 0),
                        m > 1 && (m = 1),
                        "pos" === p) {
                            if (this.interpolationType === THREE.AnimationHandler.LINEAR) {
                                r.x = T[0] + (g[0] - T[0]) * m,
                                r.y = T[1] + (g[1] - T[1]) * m,
                                r.z = T[2] + (g[2] - T[2]) * m;
                                var v = this.weight / (this.weight + u.positionWeight);
                                c.position.lerp(r, v),
                                u.positionWeight += this.weight
                            } else if (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) {
                                t[0] = this.getPrevKeyWith("pos", s, d.index - 1).pos,
                                t[1] = T,
                                t[2] = g,
                                t[3] = this.getNextKeyWith("pos", s, f.index + 1).pos;
                                var R = n(t, m = .33 * m + .33);
                                v = this.weight / (this.weight + u.positionWeight);
                                u.positionWeight += this.weight;
                                var y = c.position;
                                if (y.x = y.x + (R[0] - y.x) * v,
                                y.y = y.y + (R[1] - y.y) * v,
                                y.z = y.z + (R[2] - y.z) * v,
                                this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD) {
                                    var H = n(t, 1.01 * m);
                                    e.set(H[0], H[1], H[2]),
                                    e.sub(y),
                                    e.y = 0,
                                    e.normalize();
                                    var x = Math.atan2(e.x, e.z);
                                    c.rotation.set(0, x, 0)
                                }
                            }
                        } else if ("rot" === p)
                            if (THREE.Quaternion.slerp(T, g, i, m),
                            0 === u.quaternionWeight)
                                c.quaternion.copy(i),
                                u.quaternionWeight = this.weight;
                            else {
                                v = this.weight / (this.weight + u.quaternionWeight);
                                THREE.Quaternion.slerp(c.quaternion, i, c.quaternion, v),
                                u.quaternionWeight += this.weight
                            }
                        else if ("scl" === p) {
                            r.x = T[0] + (g[0] - T[0]) * m,
                            r.y = T[1] + (g[1] - T[1]) * m,
                            r.z = T[2] + (g[2] - T[2]) * m;
                            v = this.weight / (this.weight + u.scaleWeight);
                            c.scale.lerp(r, v),
                            u.scaleWeight += this.weight
                        }
                    }
                return !0
            }
        }
    }(),
    getNextKeyWith: function(t, e, r) {
        var i = this.data.hierarchy[e].keys;
        for (this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? r = r < i.length - 1 ? r : i.length - 1 : r %= i.length; r < i.length; r++)
            if (void 0 !== i[r][t])
                return i[r];
        return this.data.hierarchy[e].keys[0]
    },
    getPrevKeyWith: function(t, e, r) {
        var i = this.data.hierarchy[e].keys;
        for (r = this.interpolationType === THREE.AnimationHandler.CATMULLROM || this.interpolationType === THREE.AnimationHandler.CATMULLROM_FORWARD ? r > 0 ? r : 0 : r >= 0 ? r : r + i.length; r >= 0; r--)
            if (void 0 !== i[r][t])
                return i[r];
        return this.data.hierarchy[e].keys[i.length - 1]
    }
},
THREE.KeyFrameAnimation = function(t) {
    this.root = t.node,
    this.data = THREE.AnimationHandler.init(t),
    this.hierarchy = THREE.AnimationHandler.parse(this.root),
    this.currentTime = 0,
    this.timeScale = .001,
    this.isPlaying = !1,
    this.isPaused = !0,
    this.loop = !0;
    for (var e = 0, r = this.hierarchy.length; e < r; e++) {
        var i = this.data.hierarchy[e].keys
          , n = this.data.hierarchy[e].sids
          , o = this.hierarchy[e];
        if (i.length && n) {
            for (var a = 0; a < n.length; a++) {
                var s = n[a]
                  , h = this.getNextKeyWith(s, e, 0);
                h && h.apply(s)
            }
            o.matrixAutoUpdate = !1,
            this.data.hierarchy[e].node.updateMatrix(),
            o.matrixWorldNeedsUpdate = !0
        }
    }
}
,
THREE.KeyFrameAnimation.prototype = {
    constructor: THREE.KeyFrameAnimation,
    play: function(t) {
        if (this.currentTime = void 0 !== t ? t : 0,
        !1 === this.isPlaying) {
            this.isPlaying = !0;
            var e, r, i, n = this.hierarchy.length;
            for (e = 0; e < n; e++) {
                r = this.hierarchy[e],
                void 0 === (i = this.data.hierarchy[e]).animationCache && (i.animationCache = {},
                i.animationCache.prevKey = null,
                i.animationCache.nextKey = null,
                i.animationCache.originalMatrix = r.matrix);
                var o = this.data.hierarchy[e].keys;
                o.length && (i.animationCache.prevKey = o[0],
                i.animationCache.nextKey = o[1],
                this.startTime = Math.min(o[0].time, this.startTime),
                this.endTime = Math.max(o[o.length - 1].time, this.endTime))
            }
            this.update(0)
        }
        this.isPaused = !1,
        THREE.AnimationHandler.play(this)
    },
    stop: function() {
        this.isPlaying = !1,
        this.isPaused = !1,
        THREE.AnimationHandler.stop(this);
        for (var t = 0; t < this.data.hierarchy.length; t++) {
            var e = this.hierarchy[t]
              , r = this.data.hierarchy[t];
            if (void 0 !== r.animationCache) {
                var i = r.animationCache.originalMatrix;
                i.copy(e.matrix),
                e.matrix = i,
                delete r.animationCache
            }
        }
    },
    update: function(t) {
        if (!1 !== this.isPlaying) {
            this.currentTime += t * this.timeScale;
            var e = this.data.length;
            !0 === this.loop && this.currentTime > e && (this.currentTime %= e),
            this.currentTime = Math.min(this.currentTime, e);
            for (var r = 0, i = this.hierarchy.length; r < i; r++) {
                var n = this.hierarchy[r]
                  , o = this.data.hierarchy[r]
                  , a = o.keys
                  , s = o.animationCache;
                if (a.length) {
                    var h = s.prevKey
                      , c = s.nextKey;
                    if (c.time <= this.currentTime) {
                        for (; c.time < this.currentTime && c.index > h.index; )
                            c = a[(h = c).index + 1];
                        s.prevKey = h,
                        s.nextKey = c
                    }
                    c.time >= this.currentTime ? h.interpolate(c, this.currentTime) : h.interpolate(c, c.time),
                    this.data.hierarchy[r].node.updateMatrix(),
                    n.matrixWorldNeedsUpdate = !0
                }
            }
        }
    },
    getNextKeyWith: function(t, e, r) {
        var i = this.data.hierarchy[e].keys;
        for (r %= i.length; r < i.length; r++)
            if (i[r].hasTarget(t))
                return i[r];
        return i[0]
    },
    getPrevKeyWith: function(t, e, r) {
        var i = this.data.hierarchy[e].keys;
        for (r = r >= 0 ? r : r + i.length; r >= 0; r--)
            if (i[r].hasTarget(t))
                return i[r];
        return i[i.length - 1]
    }
},
THREE.MorphAnimation = function(t) {
    this.mesh = t,
    this.frames = t.morphTargetInfluences.length,
    this.currentTime = 0,
    this.duration = 1e3,
    this.loop = !0,
    this.lastFrame = 0,
    this.currentFrame = 0,
    this.isPlaying = !1
}
,
THREE.MorphAnimation.prototype = {
    constructor: THREE.MorphAnimation,
    play: function() {
        this.isPlaying = !0
    },
    pause: function() {
        this.isPlaying = !1
    },
    update: function(t) {
        if (!1 !== this.isPlaying) {
            this.currentTime += t,
            !0 === this.loop && this.currentTime > this.duration && (this.currentTime %= this.duration),
            this.currentTime = Math.min(this.currentTime, this.duration);
            var e = this.duration / this.frames
              , r = Math.floor(this.currentTime / e)
              , i = this.mesh.morphTargetInfluences;
            r != this.currentFrame && (i[this.lastFrame] = 0,
            i[this.currentFrame] = 1,
            i[r] = 0,
            this.lastFrame = this.currentFrame,
            this.currentFrame = r),
            i[r] = this.currentTime % e / e,
            i[this.lastFrame] = 1 - i[r]
        }
    }
},
THREE.BoxGeometry = function(t, e, r, i, n, o) {
    THREE.Geometry.call(this),
    this.type = "BoxGeometry",
    this.parameters = {
        width: t,
        height: e,
        depth: r,
        widthSegments: i,
        heightSegments: n,
        depthSegments: o
    },
    this.widthSegments = i || 1,
    this.heightSegments = n || 1,
    this.depthSegments = o || 1;
    var a = this
      , s = t / 2
      , h = e / 2
      , c = r / 2;
    function l(t, e, r, i, n, o, s, h) {
        var c, l, u, E = a.widthSegments, p = a.heightSegments, d = n / 2, f = o / 2, m = a.vertices.length;
        "x" === t && "y" === e || "y" === t && "x" === e ? c = "z" : "x" === t && "z" === e || "z" === t && "x" === e ? (c = "y",
        p = a.depthSegments) : ("z" === t && "y" === e || "y" === t && "z" === e) && (c = "x",
        E = a.depthSegments);
        var T = E + 1
          , g = p + 1
          , v = n / E
          , R = o / p
          , y = new THREE.Vector3;
        for (y[c] = s > 0 ? 1 : -1,
        u = 0; u < g; u++)
            for (l = 0; l < T; l++) {
                var H = new THREE.Vector3;
                H[t] = (l * v - d) * r,
                H[e] = (u * R - f) * i,
                H[c] = s,
                a.vertices.push(H)
            }
        for (u = 0; u < p; u++)
            for (l = 0; l < E; l++) {
                var x = l + T * u
                  , w = l + T * (u + 1)
                  , b = l + 1 + T * (u + 1)
                  , M = l + 1 + T * u
                  , _ = new THREE.Vector2(l / E,1 - u / p)
                  , S = new THREE.Vector2(l / E,1 - (u + 1) / p)
                  , C = new THREE.Vector2((l + 1) / E,1 - (u + 1) / p)
                  , A = new THREE.Vector2((l + 1) / E,1 - u / p)
                  , L = new THREE.Face3(x + m,w + m,M + m);
                L.normal.copy(y),
                L.vertexNormals.push(y.clone(), y.clone(), y.clone()),
                L.materialIndex = h,
                a.faces.push(L),
                a.faceVertexUvs[0].push([_, S, A]),
                (L = new THREE.Face3(w + m,b + m,M + m)).normal.copy(y),
                L.vertexNormals.push(y.clone(), y.clone(), y.clone()),
                L.materialIndex = h,
                a.faces.push(L),
                a.faceVertexUvs[0].push([S.clone(), C, A.clone()])
            }
    }
    l("z", "y", -1, -1, r, e, s, 0),
    l("z", "y", 1, -1, r, e, -s, 1),
    l("x", "z", 1, 1, t, r, h, 2),
    l("x", "z", 1, -1, t, r, -h, 3),
    l("x", "y", 1, -1, t, e, c, 4),
    l("x", "y", -1, -1, t, e, -c, 5),
    this.mergeVertices()
}
,
THREE.BoxGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.BoxGeometry.prototype.constructor = THREE.BoxGeometry,
THREE.CircleGeometry = function(t, e, r, i) {
    THREE.Geometry.call(this),
    this.type = "CircleGeometry",
    this.parameters = {
        radius: t,
        segments: e,
        thetaStart: r,
        thetaLength: i
    },
    t = t || 50,
    e = void 0 !== e ? Math.max(3, e) : 8,
    r = void 0 !== r ? r : 0,
    i = void 0 !== i ? i : 2 * Math.PI;
    var n, o = [], a = new THREE.Vector3, s = new THREE.Vector2(.5,.5);
    for (this.vertices.push(a),
    o.push(s),
    n = 0; n <= e; n++) {
        var h = new THREE.Vector3
          , c = r + n / e * i;
        h.x = t * Math.cos(c),
        h.y = t * Math.sin(c),
        this.vertices.push(h),
        o.push(new THREE.Vector2((h.x / t + 1) / 2,(h.y / t + 1) / 2))
    }
    var l = new THREE.Vector3(0,0,1);
    for (n = 1; n <= e; n++)
        this.faces.push(new THREE.Face3(n,n + 1,0,[l.clone(), l.clone(), l.clone()])),
        this.faceVertexUvs[0].push([o[n].clone(), o[n + 1].clone(), s.clone()]);
    this.computeFaceNormals(),
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3,t)
}
,
THREE.CircleGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.CircleGeometry.prototype.constructor = THREE.CircleGeometry,
THREE.CubeGeometry = function(t, e, r, i, n, o) {
    return new THREE.BoxGeometry(t,e,r,i,n,o)
}
,
THREE.CylinderGeometry = function(t, e, r, i, n, o, a, s) {
    THREE.Geometry.call(this),
    this.type = "CylinderGeometry",
    this.parameters = {
        radiusTop: t,
        radiusBottom: e,
        height: r,
        radialSegments: i,
        heightSegments: n,
        openEnded: o,
        thetaStart: a,
        thetaLength: s
    },
    t = void 0 !== t ? t : 20,
    e = void 0 !== e ? e : 20,
    r = void 0 !== r ? r : 100,
    i = i || 8,
    n = n || 1,
    o = void 0 !== o && o,
    a = void 0 !== a ? a : 0,
    s = void 0 !== s ? s : 2 * Math.PI;
    var h, c, l = r / 2, u = [], E = [];
    for (c = 0; c <= n; c++) {
        var p = []
          , d = []
          , f = c / n
          , m = f * (e - t) + t;
        for (h = 0; h <= i; h++) {
            var T = h / i
              , g = new THREE.Vector3;
            g.x = m * Math.sin(T * s + a),
            g.y = -f * r + l,
            g.z = m * Math.cos(T * s + a),
            this.vertices.push(g),
            p.push(this.vertices.length - 1),
            d.push(new THREE.Vector2(T,1 - f))
        }
        u.push(p),
        E.push(d)
    }
    var v, R, y = (e - t) / r;
    for (h = 0; h < i; h++)
        for (0 !== t ? (v = this.vertices[u[0][h]].clone(),
        R = this.vertices[u[0][h + 1]].clone()) : (v = this.vertices[u[1][h]].clone(),
        R = this.vertices[u[1][h + 1]].clone()),
        v.setY(Math.sqrt(v.x * v.x + v.z * v.z) * y).normalize(),
        R.setY(Math.sqrt(R.x * R.x + R.z * R.z) * y).normalize(),
        c = 0; c < n; c++) {
            var H = u[c][h]
              , x = u[c + 1][h]
              , w = u[c + 1][h + 1]
              , b = u[c][h + 1]
              , M = v.clone()
              , _ = v.clone()
              , S = R.clone()
              , C = R.clone()
              , A = E[c][h].clone()
              , L = E[c + 1][h].clone()
              , P = E[c + 1][h + 1].clone()
              , F = E[c][h + 1].clone();
            this.faces.push(new THREE.Face3(H,x,b,[M, _, C])),
            this.faceVertexUvs[0].push([A, L, F]),
            this.faces.push(new THREE.Face3(x,w,b,[_.clone(), S, C.clone()])),
            this.faceVertexUvs[0].push([L.clone(), P, F.clone()])
        }
    if (!1 === o && t > 0)
        for (this.vertices.push(new THREE.Vector3(0,l,0)),
        h = 0; h < i; h++) {
            H = u[0][h],
            x = u[0][h + 1],
            w = this.vertices.length - 1,
            M = new THREE.Vector3(0,1,0),
            _ = new THREE.Vector3(0,1,0),
            S = new THREE.Vector3(0,1,0),
            A = E[0][h].clone(),
            L = E[0][h + 1].clone(),
            P = new THREE.Vector2(L.x,0);
            this.faces.push(new THREE.Face3(H,x,w,[M, _, S])),
            this.faceVertexUvs[0].push([A, L, P])
        }
    if (!1 === o && e > 0)
        for (this.vertices.push(new THREE.Vector3(0,-l,0)),
        h = 0; h < i; h++) {
            H = u[n][h + 1],
            x = u[n][h],
            w = this.vertices.length - 1,
            M = new THREE.Vector3(0,-1,0),
            _ = new THREE.Vector3(0,-1,0),
            S = new THREE.Vector3(0,-1,0),
            A = E[n][h + 1].clone(),
            L = E[n][h].clone(),
            P = new THREE.Vector2(L.x,1);
            this.faces.push(new THREE.Face3(H,x,w,[M, _, S])),
            this.faceVertexUvs[0].push([A, L, P])
        }
    this.computeFaceNormals()
}
,
THREE.CylinderGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.CylinderGeometry.prototype.constructor = THREE.CylinderGeometry,
THREE.ExtrudeGeometry = function(t, e) {
    void 0 !== t ? (THREE.Geometry.call(this),
    this.type = "ExtrudeGeometry",
    t = t instanceof Array ? t : [t],
    this.addShapeList(t, e),
    this.computeFaceNormals()) : t = []
}
,
THREE.ExtrudeGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.ExtrudeGeometry.prototype.constructor = THREE.ExtrudeGeometry,
THREE.ExtrudeGeometry.prototype.addShapeList = function(t, e) {
    for (var r = t.length, i = 0; i < r; i++) {
        var n = t[i];
        this.addShape(n, e)
    }
}
,
THREE.ExtrudeGeometry.prototype.addShape = function(t, e) {
    var r, i, n, o, a, s, h, c, l = void 0 !== e.amount ? e.amount : 100, u = void 0 !== e.bevelThickness ? e.bevelThickness : 6, E = void 0 !== e.bevelSize ? e.bevelSize : u - 2, p = void 0 !== e.bevelSegments ? e.bevelSegments : 3, d = void 0 === e.bevelEnabled || e.bevelEnabled, f = void 0 !== e.curveSegments ? e.curveSegments : 12, m = void 0 !== e.steps ? e.steps : 1, T = e.extrudePath, g = !1, v = e.material, R = e.extrudeMaterial, y = void 0 !== e.UVGenerator ? e.UVGenerator : THREE.ExtrudeGeometry.WorldUVGenerator;
    T && (r = T.getSpacedPoints(m),
    g = !0,
    d = !1,
    i = void 0 !== e.frames ? e.frames : new THREE.TubeGeometry.FrenetFrames(T,m,!1),
    n = new THREE.Vector3,
    o = new THREE.Vector3,
    a = new THREE.Vector3),
    d || (p = 0,
    u = 0,
    E = 0);
    var H = this
      , x = this.vertices.length
      , w = t.extractPoints(f)
      , b = w.shape
      , M = w.holes
      , _ = !THREE.Shape.Utils.isClockWise(b);
    if (_) {
        for (b = b.reverse(),
        h = 0,
        c = M.length; h < c; h++)
            s = M[h],
            THREE.Shape.Utils.isClockWise(s) && (M[h] = s.reverse());
        _ = !1
    }
    var S = THREE.Shape.Utils.triangulateShape(b, M)
      , C = b;
    for (h = 0,
    c = M.length; h < c; h++)
        s = M[h],
        b = b.concat(s);
    function A(t, e, r) {
        return e || THREE.error("THREE.ExtrudeGeometry: vec does not exist"),
        e.clone().multiplyScalar(r).add(t)
    }
    var L, P, F, B, U, V, D = b.length, z = S.length;
    function k(t, e, r) {
        var i, n, o = 1, a = t.x - e.x, s = t.y - e.y, h = r.x - t.x, c = r.y - t.y, l = a * a + s * s, u = a * c - s * h;
        if (Math.abs(u) > 1e-10) {
            var E = Math.sqrt(l)
              , p = Math.sqrt(h * h + c * c)
              , d = e.x - s / E
              , f = e.y + a / E
              , m = ((r.x - c / p - d) * c - (r.y + h / p - f) * h) / (a * c - s * h)
              , T = (i = d + a * m - t.x) * i + (n = f + s * m - t.y) * n;
            if (T <= 2)
                return new THREE.Vector2(i,n);
            o = Math.sqrt(T / 2)
        } else {
            var g = !1;
            a > 1e-10 ? h > 1e-10 && (g = !0) : a < -1e-10 ? h < -1e-10 && (g = !0) : Math.sign(s) == Math.sign(c) && (g = !0),
            g ? (i = -s,
            n = a,
            o = Math.sqrt(l)) : (i = a,
            n = s,
            o = Math.sqrt(l / 2))
        }
        return new THREE.Vector2(i / o,n / o)
    }
    for (var N = [], O = 0, G = C.length, I = G - 1, W = O + 1; O < G; O++,
    I++,
    W++)
        I === G && (I = 0),
        W === G && (W = 0),
        N[O] = k(C[O], C[I], C[W]);
    var j, X, Y = [], q = N.concat();
    for (h = 0,
    c = M.length; h < c; h++) {
        for (s = M[h],
        j = [],
        O = 0,
        I = (G = s.length) - 1,
        W = O + 1; O < G; O++,
        I++,
        W++)
            I === G && (I = 0),
            W === G && (W = 0),
            j[O] = k(s[O], s[I], s[W]);
        Y.push(j),
        q = q.concat(j)
    }
    for (L = 0; L < p; L++) {
        for (B = u * (1 - (F = L / p)),
        P = E * Math.sin(F * Math.PI / 2),
        O = 0,
        G = C.length; O < G; O++)
            K((U = A(C[O], N[O], P)).x, U.y, -B);
        for (h = 0,
        c = M.length; h < c; h++)
            for (s = M[h],
            j = Y[h],
            O = 0,
            G = s.length; O < G; O++)
                K((U = A(s[O], j[O], P)).x, U.y, -B)
    }
    for (P = E,
    O = 0; O < D; O++)
        U = d ? A(b[O], q[O], P) : b[O],
        g ? (o.copy(i.normals[0]).multiplyScalar(U.x),
        n.copy(i.binormals[0]).multiplyScalar(U.y),
        a.copy(r[0]).add(o).add(n),
        K(a.x, a.y, a.z)) : K(U.x, U.y, 0);
    for (X = 1; X <= m; X++)
        for (O = 0; O < D; O++)
            U = d ? A(b[O], q[O], P) : b[O],
            g ? (o.copy(i.normals[X]).multiplyScalar(U.x),
            n.copy(i.binormals[X]).multiplyScalar(U.y),
            a.copy(r[X]).add(o).add(n),
            K(a.x, a.y, a.z)) : K(U.x, U.y, l / m * X);
    for (L = p - 1; L >= 0; L--) {
        for (B = u * (1 - (F = L / p)),
        P = E * Math.sin(F * Math.PI / 2),
        O = 0,
        G = C.length; O < G; O++)
            K((U = A(C[O], N[O], P)).x, U.y, l + B);
        for (h = 0,
        c = M.length; h < c; h++)
            for (s = M[h],
            j = Y[h],
            O = 0,
            G = s.length; O < G; O++)
                U = A(s[O], j[O], P),
                g ? K(U.x, U.y + r[m - 1].y, r[m - 1].x + B) : K(U.x, U.y, l + B)
    }
    function Z(t, e) {
        var r, i;
        for (O = t.length; --O >= 0; ) {
            r = O,
            (i = O - 1) < 0 && (i = t.length - 1);
            var n = 0
              , o = m + 2 * p;
            for (n = 0; n < o; n++) {
                var a = D * n
                  , s = D * (n + 1);
                J(e + r + a, e + i + a, e + i + s, e + r + s, t, n, o, r, i)
            }
        }
    }
    function K(t, e, r) {
        H.vertices.push(new THREE.Vector3(t,e,r))
    }
    function Q(t, e, r) {
        t += x,
        e += x,
        r += x,
        H.faces.push(new THREE.Face3(t,e,r,null,null,v));
        var i = y.generateTopUV(H, t, e, r);
        H.faceVertexUvs[0].push(i)
    }
    function J(t, e, r, i, n, o, a, s, h) {
        t += x,
        e += x,
        r += x,
        i += x,
        H.faces.push(new THREE.Face3(t,e,i,null,null,R)),
        H.faces.push(new THREE.Face3(e,r,i,null,null,R));
        var c = y.generateSideWallUV(H, t, e, r, i);
        H.faceVertexUvs[0].push([c[0], c[1], c[3]]),
        H.faceVertexUvs[0].push([c[1], c[2], c[3]])
    }
    !function() {
        if (d) {
            var t = 0
              , e = D * t;
            for (O = 0; O < z; O++)
                Q((V = S[O])[2] + e, V[1] + e, V[0] + e);
            for (e = D * (t = m + 2 * p),
            O = 0; O < z; O++)
                Q((V = S[O])[0] + e, V[1] + e, V[2] + e)
        } else {
            for (O = 0; O < z; O++)
                Q((V = S[O])[2], V[1], V[0]);
            for (O = 0; O < z; O++)
                Q((V = S[O])[0] + D * m, V[1] + D * m, V[2] + D * m)
        }
    }(),
    function() {
        var t = 0;
        for (Z(C, t),
        t += C.length,
        h = 0,
        c = M.length; h < c; h++)
            Z(s = M[h], t),
            t += s.length
    }()
}
,
THREE.ExtrudeGeometry.WorldUVGenerator = {
    generateTopUV: function(t, e, r, i) {
        var n = t.vertices
          , o = n[e]
          , a = n[r]
          , s = n[i];
        return [new THREE.Vector2(o.x,o.y), new THREE.Vector2(a.x,a.y), new THREE.Vector2(s.x,s.y)]
    },
    generateSideWallUV: function(t, e, r, i, n) {
        var o = t.vertices
          , a = o[e]
          , s = o[r]
          , h = o[i]
          , c = o[n];
        return Math.abs(a.y - s.y) < .01 ? [new THREE.Vector2(a.x,1 - a.z), new THREE.Vector2(s.x,1 - s.z), new THREE.Vector2(h.x,1 - h.z), new THREE.Vector2(c.x,1 - c.z)] : [new THREE.Vector2(a.y,1 - a.z), new THREE.Vector2(s.y,1 - s.z), new THREE.Vector2(h.y,1 - h.z), new THREE.Vector2(c.y,1 - c.z)]
    }
},
THREE.ShapeGeometry = function(t, e) {
    THREE.Geometry.call(this),
    this.type = "ShapeGeometry",
    t instanceof Array == !1 && (t = [t]),
    this.addShapeList(t, e),
    this.computeFaceNormals()
}
,
THREE.ShapeGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.ShapeGeometry.prototype.constructor = THREE.ShapeGeometry,
THREE.ShapeGeometry.prototype.addShapeList = function(t, e) {
    for (var r = 0, i = t.length; r < i; r++)
        this.addShape(t[r], e);
    return this
}
,
THREE.ShapeGeometry.prototype.addShape = function(t, e) {
    void 0 === e && (e = {});
    var r, i, n, o = void 0 !== e.curveSegments ? e.curveSegments : 12, a = e.material, s = void 0 === e.UVGenerator ? THREE.ExtrudeGeometry.WorldUVGenerator : e.UVGenerator, h = this.vertices.length, c = t.extractPoints(o), l = c.shape, u = c.holes, E = !THREE.Shape.Utils.isClockWise(l);
    if (E) {
        for (l = l.reverse(),
        r = 0,
        i = u.length; r < i; r++)
            n = u[r],
            THREE.Shape.Utils.isClockWise(n) && (u[r] = n.reverse());
        E = !1
    }
    var p = THREE.Shape.Utils.triangulateShape(l, u);
    for (r = 0,
    i = u.length; r < i; r++)
        n = u[r],
        l = l.concat(n);
    var d, f, m = l.length, T = p.length;
    for (r = 0; r < m; r++)
        d = l[r],
        this.vertices.push(new THREE.Vector3(d.x,d.y,0));
    for (r = 0; r < T; r++) {
        var g = (f = p[r])[0] + h
          , v = f[1] + h
          , R = f[2] + h;
        this.faces.push(new THREE.Face3(g,v,R,null,null,a)),
        this.faceVertexUvs[0].push(s.generateTopUV(this, g, v, R))
    }
}
,
THREE.LatheGeometry = function(t, e, r, i) {
    THREE.Geometry.call(this),
    this.type = "LatheGeometry",
    this.parameters = {
        points: t,
        segments: e,
        phiStart: r,
        phiLength: i
    },
    e = e || 12,
    r = r || 0,
    i = i || 2 * Math.PI;
    for (var n = 1 / (t.length - 1), o = 1 / e, a = 0, s = e; a <= s; a++)
        for (var h = r + a * o * i, c = Math.cos(h), l = Math.sin(h), u = 0, E = t.length; u < E; u++) {
            var p = t[u]
              , d = new THREE.Vector3;
            d.x = c * p.x - l * p.y,
            d.y = l * p.x + c * p.y,
            d.z = p.z,
            this.vertices.push(d)
        }
    var f = t.length;
    for (a = 0,
    s = e; a < s; a++)
        for (u = 0,
        E = t.length - 1; u < E; u++) {
            var m = u + f * a
              , T = m
              , g = m + f
              , v = (c = m + 1 + f,
            m + 1)
              , R = a * o
              , y = u * n
              , H = R + o
              , x = y + n;
            this.faces.push(new THREE.Face3(T,g,v)),
            this.faceVertexUvs[0].push([new THREE.Vector2(R,y), new THREE.Vector2(H,y), new THREE.Vector2(R,x)]),
            this.faces.push(new THREE.Face3(g,c,v)),
            this.faceVertexUvs[0].push([new THREE.Vector2(H,y), new THREE.Vector2(H,x), new THREE.Vector2(R,x)])
        }
    this.mergeVertices(),
    this.computeFaceNormals(),
    this.computeVertexNormals()
}
,
THREE.LatheGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.LatheGeometry.prototype.constructor = THREE.LatheGeometry,
THREE.PlaneGeometry = function(t, e, r, i) {
    THREE.Geometry.call(this),
    this.type = "PlaneGeometry",
    this.parameters = {
        width: t,
        height: e,
        widthSegments: r,
        heightSegments: i
    },
    this.fromBufferGeometry(new THREE.PlaneBufferGeometry(t,e,r,i))
}
,
THREE.PlaneGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.PlaneGeometry.prototype.constructor = THREE.PlaneGeometry,
THREE.PlaneBufferGeometry = function(t, e, r, i) {
    THREE.BufferGeometry.call(this),
    this.type = "PlaneBufferGeometry",
    this.parameters = {
        width: t,
        height: e,
        widthSegments: r,
        heightSegments: i
    };
    for (var n = t / 2, o = e / 2, a = r || 1, s = i || 1, h = a + 1, c = s + 1, l = t / a, u = e / s, E = new Float32Array(h * c * 3), p = new Float32Array(h * c * 3), d = new Float32Array(h * c * 2), f = 0, m = 0, T = 0; T < c; T++)
        for (var g = T * u - o, v = 0; v < h; v++) {
            var R = v * l - n;
            E[f] = R,
            E[f + 1] = -g,
            p[f + 2] = 1,
            d[m] = v / a,
            d[m + 1] = 1 - T / s,
            f += 3,
            m += 2
        }
    f = 0;
    var y = new (E.length / 3 > 65535 ? Uint32Array : Uint16Array)(a * s * 6);
    for (T = 0; T < s; T++)
        for (v = 0; v < a; v++) {
            var H = v + h * T
              , x = v + h * (T + 1)
              , w = v + 1 + h * (T + 1)
              , b = v + 1 + h * T;
            y[f] = H,
            y[f + 1] = x,
            y[f + 2] = b,
            y[f + 3] = x,
            y[f + 4] = w,
            y[f + 5] = b,
            f += 6
        }
    this.addAttribute("index", new THREE.BufferAttribute(y,1)),
    this.addAttribute("position", new THREE.BufferAttribute(E,3)),
    this.addAttribute("normal", new THREE.BufferAttribute(p,3)),
    this.addAttribute("uv", new THREE.BufferAttribute(d,2))
}
,
THREE.PlaneBufferGeometry.prototype = Object.create(THREE.BufferGeometry.prototype),
THREE.PlaneBufferGeometry.prototype.constructor = THREE.PlaneBufferGeometry,
THREE.RingGeometry = function(t, e, r, i, n, o) {
    THREE.Geometry.call(this),
    this.type = "RingGeometry",
    this.parameters = {
        innerRadius: t,
        outerRadius: e,
        thetaSegments: r,
        phiSegments: i,
        thetaStart: n,
        thetaLength: o
    },
    t = t || 0,
    e = e || 50,
    n = void 0 !== n ? n : 0,
    o = void 0 !== o ? o : 2 * Math.PI,
    r = void 0 !== r ? Math.max(3, r) : 8;
    var a, s, h = [], c = t, l = (e - t) / (i = void 0 !== i ? Math.max(1, i) : 8);
    for (a = 0; a < i + 1; a++) {
        for (s = 0; s < r + 1; s++) {
            var u = new THREE.Vector3
              , E = n + s / r * o;
            u.x = c * Math.cos(E),
            u.y = c * Math.sin(E),
            this.vertices.push(u),
            h.push(new THREE.Vector2((u.x / e + 1) / 2,(u.y / e + 1) / 2))
        }
        c += l
    }
    var p = new THREE.Vector3(0,0,1);
    for (a = 0; a < i; a++) {
        var d = a * (r + 1);
        for (s = 0; s < r; s++) {
            var f = E = s + d
              , m = E + r + 1
              , T = E + r + 2;
            this.faces.push(new THREE.Face3(f,m,T,[p.clone(), p.clone(), p.clone()])),
            this.faceVertexUvs[0].push([h[f].clone(), h[m].clone(), h[T].clone()]),
            f = E,
            m = E + r + 2,
            T = E + 1,
            this.faces.push(new THREE.Face3(f,m,T,[p.clone(), p.clone(), p.clone()])),
            this.faceVertexUvs[0].push([h[f].clone(), h[m].clone(), h[T].clone()])
        }
    }
    this.computeFaceNormals(),
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3,c)
}
,
THREE.RingGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.RingGeometry.prototype.constructor = THREE.RingGeometry,
THREE.SphereGeometry = function(t, e, r, i, n, o, a) {
    THREE.Geometry.call(this),
    this.type = "SphereGeometry",
    this.parameters = {
        radius: t,
        widthSegments: e,
        heightSegments: r,
        phiStart: i,
        phiLength: n,
        thetaStart: o,
        thetaLength: a
    },
    t = t || 50,
    e = Math.max(3, Math.floor(e) || 8),
    r = Math.max(2, Math.floor(r) || 6),
    i = void 0 !== i ? i : 0,
    n = void 0 !== n ? n : 2 * Math.PI,
    o = void 0 !== o ? o : 0,
    a = void 0 !== a ? a : Math.PI;
    var s, h, c = [], l = [];
    for (h = 0; h <= r; h++) {
        var u = []
          , E = [];
        for (s = 0; s <= e; s++) {
            var p = s / e
              , d = h / r
              , f = new THREE.Vector3;
            f.x = -t * Math.cos(i + p * n) * Math.sin(o + d * a),
            f.y = t * Math.cos(o + d * a),
            f.z = t * Math.sin(i + p * n) * Math.sin(o + d * a),
            this.vertices.push(f),
            u.push(this.vertices.length - 1),
            E.push(new THREE.Vector2(p,1 - d))
        }
        c.push(u),
        l.push(E)
    }
    for (h = 0; h < r; h++)
        for (s = 0; s < e; s++) {
            var m = c[h][s + 1]
              , T = c[h][s]
              , g = c[h + 1][s]
              , v = c[h + 1][s + 1]
              , R = this.vertices[m].clone().normalize()
              , y = this.vertices[T].clone().normalize()
              , H = this.vertices[g].clone().normalize()
              , x = this.vertices[v].clone().normalize()
              , w = l[h][s + 1].clone()
              , b = l[h][s].clone()
              , M = l[h + 1][s].clone()
              , _ = l[h + 1][s + 1].clone();
            Math.abs(this.vertices[m].y) === t ? (w.x = (w.x + b.x) / 2,
            this.faces.push(new THREE.Face3(m,g,v,[R, H, x])),
            this.faceVertexUvs[0].push([w, M, _])) : Math.abs(this.vertices[g].y) === t ? (M.x = (M.x + _.x) / 2,
            this.faces.push(new THREE.Face3(m,T,g,[R, y, H])),
            this.faceVertexUvs[0].push([w, b, M])) : (this.faces.push(new THREE.Face3(m,T,v,[R, y, x])),
            this.faceVertexUvs[0].push([w, b, _]),
            this.faces.push(new THREE.Face3(T,g,v,[y.clone(), H, x.clone()])),
            this.faceVertexUvs[0].push([b.clone(), M, _.clone()]))
        }
    this.computeFaceNormals(),
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3,t)
}
,
THREE.SphereGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.SphereGeometry.prototype.constructor = THREE.SphereGeometry,
THREE.TextGeometry = function(t, e) {
    e = e || {};
    var r = THREE.FontUtils.generateShapes(t, e);
    e.amount = void 0 !== e.height ? e.height : 50,
    void 0 === e.bevelThickness && (e.bevelThickness = 10),
    void 0 === e.bevelSize && (e.bevelSize = 8),
    void 0 === e.bevelEnabled && (e.bevelEnabled = !1),
    THREE.ExtrudeGeometry.call(this, r, e),
    this.type = "TextGeometry"
}
,
THREE.TextGeometry.prototype = Object.create(THREE.ExtrudeGeometry.prototype),
THREE.TextGeometry.prototype.constructor = THREE.TextGeometry,
THREE.TorusGeometry = function(t, e, r, i, n) {
    THREE.Geometry.call(this),
    this.type = "TorusGeometry",
    this.parameters = {
        radius: t,
        tube: e,
        radialSegments: r,
        tubularSegments: i,
        arc: n
    },
    t = t || 100,
    e = e || 40,
    r = r || 8,
    i = i || 6,
    n = n || 2 * Math.PI;
    for (var o = new THREE.Vector3, a = [], s = [], h = 0; h <= r; h++)
        for (var c = 0; c <= i; c++) {
            var l = c / i * n
              , u = h / r * Math.PI * 2;
            o.x = t * Math.cos(l),
            o.y = t * Math.sin(l);
            var E = new THREE.Vector3;
            E.x = (t + e * Math.cos(u)) * Math.cos(l),
            E.y = (t + e * Math.cos(u)) * Math.sin(l),
            E.z = e * Math.sin(u),
            this.vertices.push(E),
            a.push(new THREE.Vector2(c / i,h / r)),
            s.push(E.clone().sub(o).normalize())
        }
    for (h = 1; h <= r; h++)
        for (c = 1; c <= i; c++) {
            var p = (i + 1) * h + c - 1
              , d = (i + 1) * (h - 1) + c - 1
              , f = (i + 1) * (h - 1) + c
              , m = (i + 1) * h + c
              , T = new THREE.Face3(p,d,m,[s[p].clone(), s[d].clone(), s[m].clone()]);
            this.faces.push(T),
            this.faceVertexUvs[0].push([a[p].clone(), a[d].clone(), a[m].clone()]),
            T = new THREE.Face3(d,f,m,[s[d].clone(), s[f].clone(), s[m].clone()]),
            this.faces.push(T),
            this.faceVertexUvs[0].push([a[d].clone(), a[f].clone(), a[m].clone()])
        }
    this.computeFaceNormals()
}
,
THREE.TorusGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.TorusGeometry.prototype.constructor = THREE.TorusGeometry,
THREE.TorusKnotGeometry = function(t, e, r, i, n, o, a) {
    THREE.Geometry.call(this),
    this.type = "TorusKnotGeometry",
    this.parameters = {
        radius: t,
        tube: e,
        radialSegments: r,
        tubularSegments: i,
        p: n,
        q: o,
        heightScale: a
    },
    t = t || 100,
    e = e || 40,
    r = r || 64,
    i = i || 8,
    n = n || 2,
    o = o || 3,
    a = a || 1;
    for (var s = new Array(r), h = new THREE.Vector3, c = new THREE.Vector3, l = new THREE.Vector3, u = 0; u < r; ++u) {
        s[u] = new Array(i);
        var E = u / r * 2 * n * Math.PI
          , p = A(E, o, n, t, a)
          , d = A(E + .01, o, n, t, a);
        h.subVectors(d, p),
        c.addVectors(d, p),
        l.crossVectors(h, c),
        c.crossVectors(l, h),
        l.normalize(),
        c.normalize();
        for (var f = 0; f < i; ++f) {
            var m = f / i * 2 * Math.PI
              , T = -e * Math.cos(m)
              , g = e * Math.sin(m)
              , v = new THREE.Vector3;
            v.x = p.x + T * c.x + g * l.x,
            v.y = p.y + T * c.y + g * l.y,
            v.z = p.z + T * c.z + g * l.z,
            s[u][f] = this.vertices.push(v) - 1
        }
    }
    for (u = 0; u < r; ++u)
        for (f = 0; f < i; ++f) {
            var R = (u + 1) % r
              , y = (f + 1) % i
              , H = s[u][f]
              , x = s[R][f]
              , w = s[R][y]
              , b = s[u][y]
              , M = new THREE.Vector2(u / r,f / i)
              , _ = new THREE.Vector2((u + 1) / r,f / i)
              , S = new THREE.Vector2((u + 1) / r,(f + 1) / i)
              , C = new THREE.Vector2(u / r,(f + 1) / i);
            this.faces.push(new THREE.Face3(H,x,b)),
            this.faceVertexUvs[0].push([M, _, C]),
            this.faces.push(new THREE.Face3(x,w,b)),
            this.faceVertexUvs[0].push([_.clone(), S, C.clone()])
        }
    function A(t, e, r, i, n) {
        var o = Math.cos(t)
          , a = Math.sin(t)
          , s = e / r * t
          , h = Math.cos(s)
          , c = i * (2 + h) * .5 * o
          , l = i * (2 + h) * a * .5
          , u = n * i * Math.sin(s) * .5;
        return new THREE.Vector3(c,l,u)
    }
    this.computeFaceNormals(),
    this.computeVertexNormals()
}
,
THREE.TorusKnotGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.TorusKnotGeometry.prototype.constructor = THREE.TorusKnotGeometry,
THREE.TubeGeometry = function(t, e, r, i, n, o) {
    THREE.Geometry.call(this),
    this.type = "TubeGeometry",
    this.parameters = {
        path: t,
        segments: e,
        radius: r,
        radialSegments: i,
        closed: n
    },
    e = e || 64,
    r = r || 1,
    i = i || 8,
    n = n || !1,
    o = o || THREE.TubeGeometry.NoTaper;
    var a, s, h, c, l, u, E, p, d, f, m, T, g, v, R, y, H, x, w, b, M, _, S, C = [], A = this, L = e + 1, P = new THREE.Vector3, F = new THREE.TubeGeometry.FrenetFrames(t,e,n), B = F.tangents, U = F.normals, V = F.binormals;
    for (this.tangents = B,
    this.normals = U,
    this.binormals = V,
    d = 0; d < L; d++)
        for (C[d] = [],
        h = d / (L - 1),
        p = t.getPointAt(h),
        B[d],
        a = U[d],
        s = V[d],
        l = r * o(h),
        f = 0; f < i; f++)
            c = f / i * 2 * Math.PI,
            u = -l * Math.cos(c),
            E = l * Math.sin(c),
            P.copy(p),
            P.x += u * a.x + E * s.x,
            P.y += u * a.y + E * s.y,
            P.z += u * a.z + E * s.z,
            C[d][f] = (M = P.x,
            _ = P.y,
            S = P.z,
            A.vertices.push(new THREE.Vector3(M,_,S)) - 1);
    for (d = 0; d < e; d++)
        for (f = 0; f < i; f++)
            m = n ? (d + 1) % e : d + 1,
            T = (f + 1) % i,
            g = C[d][f],
            v = C[m][f],
            R = C[m][T],
            y = C[d][T],
            H = new THREE.Vector2(d / e,f / i),
            x = new THREE.Vector2((d + 1) / e,f / i),
            w = new THREE.Vector2((d + 1) / e,(f + 1) / i),
            b = new THREE.Vector2(d / e,(f + 1) / i),
            this.faces.push(new THREE.Face3(g,v,y)),
            this.faceVertexUvs[0].push([H, x, b]),
            this.faces.push(new THREE.Face3(v,R,y)),
            this.faceVertexUvs[0].push([x.clone(), w, b.clone()]);
    this.computeFaceNormals(),
    this.computeVertexNormals()
}
,
THREE.TubeGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.TubeGeometry.prototype.constructor = THREE.TubeGeometry,
THREE.TubeGeometry.NoTaper = function(t) {
    return 1
}
,
THREE.TubeGeometry.SinusoidalTaper = function(t) {
    return Math.sin(Math.PI * t)
}
,
THREE.TubeGeometry.FrenetFrames = function(t, e, r) {
    var i, n, o, a, s, h, c, l = new THREE.Vector3, u = [], E = [], p = [], d = new THREE.Vector3, f = new THREE.Matrix4, m = e + 1;
    for (this.tangents = u,
    this.normals = E,
    this.binormals = p,
    h = 0; h < m; h++)
        c = h / (m - 1),
        u[h] = t.getTangentAt(c),
        u[h].normalize();
    for (function() {
        E[0] = new THREE.Vector3,
        p[0] = new THREE.Vector3,
        n = Number.MAX_VALUE,
        o = Math.abs(u[0].x),
        a = Math.abs(u[0].y),
        s = Math.abs(u[0].z),
        o <= n && (n = o,
        l.set(1, 0, 0));
        a <= n && (n = a,
        l.set(0, 1, 0));
        s <= n && l.set(0, 0, 1);
        d.crossVectors(u[0], l).normalize(),
        E[0].crossVectors(u[0], d),
        p[0].crossVectors(u[0], E[0])
    }(),
    h = 1; h < m; h++)
        E[h] = E[h - 1].clone(),
        p[h] = p[h - 1].clone(),
        d.crossVectors(u[h - 1], u[h]),
        d.length() > 1e-4 && (d.normalize(),
        i = Math.acos(THREE.Math.clamp(u[h - 1].dot(u[h]), -1, 1)),
        E[h].applyMatrix4(f.makeRotationAxis(d, i))),
        p[h].crossVectors(u[h], E[h]);
    if (r)
        for (i = Math.acos(THREE.Math.clamp(E[0].dot(E[m - 1]), -1, 1)),
        i /= m - 1,
        u[0].dot(d.crossVectors(E[0], E[m - 1])) > 0 && (i = -i),
        h = 1; h < m; h++)
            E[h].applyMatrix4(f.makeRotationAxis(u[h], i * h)),
            p[h].crossVectors(u[h], E[h])
}
,
THREE.PolyhedronGeometry = function(t, e, r, i) {
    THREE.Geometry.call(this),
    this.type = "PolyhedronGeometry",
    this.parameters = {
        vertices: t,
        indices: e,
        radius: r,
        detail: i
    },
    r = r || 1,
    i = i || 0;
    for (var n = this, o = 0, a = t.length; o < a; o += 3)
        R(new THREE.Vector3(t[o],t[o + 1],t[o + 2]));
    var s = this.vertices
      , h = []
      , c = (o = 0,
    0);
    for (a = e.length; o < a; o += 3,
    c++) {
        var l = s[e[o]]
          , u = s[e[o + 1]]
          , E = s[e[o + 2]];
        h[c] = new THREE.Face3(l.index,u.index,E.index,[l.clone(), u.clone(), E.clone()])
    }
    var p = new THREE.Vector3;
    for (o = 0,
    a = h.length; o < a; o++)
        H(h[o], i);
    for (o = 0,
    a = this.faceVertexUvs[0].length; o < a; o++) {
        var d = this.faceVertexUvs[0][o]
          , f = d[0].x
          , m = d[1].x
          , T = d[2].x
          , g = Math.max(f, Math.max(m, T))
          , v = Math.min(f, Math.min(m, T));
        g > .9 && v < .1 && (f < .2 && (d[0].x += 1),
        m < .2 && (d[1].x += 1),
        T < .2 && (d[2].x += 1))
    }
    for (o = 0,
    a = this.vertices.length; o < a; o++)
        this.vertices[o].multiplyScalar(r);
    function R(t) {
        var e = t.normalize().clone();
        e.index = n.vertices.push(e) - 1;
        var r, i = x(t) / 2 / Math.PI + .5, o = (r = t,
        Math.atan2(-r.y, Math.sqrt(r.x * r.x + r.z * r.z)) / Math.PI + .5);
        return e.uv = new THREE.Vector2(i,1 - o),
        e
    }
    function y(t, e, r) {
        var i = new THREE.Face3(t.index,e.index,r.index,[t.clone(), e.clone(), r.clone()]);
        n.faces.push(i),
        p.copy(t).add(e).add(r).divideScalar(3);
        var o = x(p);
        n.faceVertexUvs[0].push([w(t.uv, t, o), w(e.uv, e, o), w(r.uv, r, o)])
    }
    function H(t, e) {
        for (var r = Math.pow(2, e), i = R(n.vertices[t.a]), o = R(n.vertices[t.b]), a = R(n.vertices[t.c]), s = [], h = 0; h <= r; h++) {
            s[h] = [];
            for (var c = R(i.clone().lerp(a, h / r)), l = R(o.clone().lerp(a, h / r)), u = r - h, E = 0; E <= u; E++)
                s[h][E] = 0 == E && h == r ? c : R(c.clone().lerp(l, E / u))
        }
        for (h = 0; h < r; h++)
            for (E = 0; E < 2 * (r - h) - 1; E++) {
                var p = Math.floor(E / 2);
                E % 2 == 0 ? y(s[h][p + 1], s[h + 1][p], s[h][p]) : y(s[h][p + 1], s[h + 1][p + 1], s[h + 1][p])
            }
    }
    function x(t) {
        return Math.atan2(t.z, -t.x)
    }
    function w(t, e, r) {
        return r < 0 && 1 === t.x && (t = new THREE.Vector2(t.x - 1,t.y)),
        0 === e.x && 0 === e.z && (t = new THREE.Vector2(r / 2 / Math.PI + .5,t.y)),
        t.clone()
    }
    this.mergeVertices(),
    this.computeFaceNormals(),
    this.boundingSphere = new THREE.Sphere(new THREE.Vector3,r)
}
,
THREE.PolyhedronGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.PolyhedronGeometry.prototype.constructor = THREE.PolyhedronGeometry,
THREE.DodecahedronGeometry = function(t, e) {
    this.parameters = {
        radius: t,
        detail: e
    };
    var r = (1 + Math.sqrt(5)) / 2
      , i = 1 / r
      , n = [-1, -1, -1, -1, -1, 1, -1, 1, -1, -1, 1, 1, 1, -1, -1, 1, -1, 1, 1, 1, -1, 1, 1, 1, 0, -i, -r, 0, -i, r, 0, i, -r, 0, i, r, -i, -r, 0, -i, r, 0, i, -r, 0, i, r, 0, -r, 0, -i, r, 0, -i, -r, 0, i, r, 0, i];
    THREE.PolyhedronGeometry.call(this, n, [3, 11, 7, 3, 7, 15, 3, 15, 13, 7, 19, 17, 7, 17, 6, 7, 6, 15, 17, 4, 8, 17, 8, 10, 17, 10, 6, 8, 0, 16, 8, 16, 2, 8, 2, 10, 0, 12, 1, 0, 1, 18, 0, 18, 16, 6, 10, 2, 6, 2, 13, 6, 13, 15, 2, 16, 18, 2, 18, 3, 2, 3, 13, 18, 1, 9, 18, 9, 11, 18, 11, 3, 4, 14, 12, 4, 12, 0, 4, 0, 8, 11, 9, 5, 11, 5, 19, 11, 19, 7, 19, 5, 14, 19, 14, 4, 19, 4, 17, 1, 12, 14, 1, 14, 5, 1, 5, 9], t, e)
}
,
THREE.DodecahedronGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.DodecahedronGeometry.prototype.constructor = THREE.DodecahedronGeometry,
THREE.IcosahedronGeometry = function(t, e) {
    var r = (1 + Math.sqrt(5)) / 2
      , i = [-1, r, 0, 1, r, 0, -1, -r, 0, 1, -r, 0, 0, -1, r, 0, 1, r, 0, -1, -r, 0, 1, -r, r, 0, -1, r, 0, 1, -r, 0, -1, -r, 0, 1];
    THREE.PolyhedronGeometry.call(this, i, [0, 11, 5, 0, 5, 1, 0, 1, 7, 0, 7, 10, 0, 10, 11, 1, 5, 9, 5, 11, 4, 11, 10, 2, 10, 7, 6, 7, 1, 8, 3, 9, 4, 3, 4, 2, 3, 2, 6, 3, 6, 8, 3, 8, 9, 4, 9, 5, 2, 4, 11, 6, 2, 10, 8, 6, 7, 9, 8, 1], t, e),
    this.type = "IcosahedronGeometry",
    this.parameters = {
        radius: t,
        detail: e
    }
}
,
THREE.IcosahedronGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.IcosahedronGeometry.prototype.constructor = THREE.IcosahedronGeometry,
THREE.OctahedronGeometry = function(t, e) {
    this.parameters = {
        radius: t,
        detail: e
    };
    THREE.PolyhedronGeometry.call(this, [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1], [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2], t, e),
    this.type = "OctahedronGeometry",
    this.parameters = {
        radius: t,
        detail: e
    }
}
,
THREE.OctahedronGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.OctahedronGeometry.prototype.constructor = THREE.OctahedronGeometry,
THREE.TetrahedronGeometry = function(t, e) {
    THREE.PolyhedronGeometry.call(this, [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1], [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1], t, e),
    this.type = "TetrahedronGeometry",
    this.parameters = {
        radius: t,
        detail: e
    }
}
,
THREE.TetrahedronGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.TetrahedronGeometry.prototype.constructor = THREE.TetrahedronGeometry,
THREE.ParametricGeometry = function(t, e, r) {
    THREE.Geometry.call(this),
    this.type = "ParametricGeometry",
    this.parameters = {
        func: t,
        slices: e,
        stacks: r
    };
    var i, n, o, a, s, h, c, l, u, E, p, d, f = this.vertices, m = this.faces, T = this.faceVertexUvs[0], g = e + 1;
    for (i = 0; i <= r; i++)
        for (a = i / r,
        n = 0; n <= e; n++)
            o = t(n / e, a),
            f.push(o);
    for (i = 0; i < r; i++)
        for (n = 0; n < e; n++)
            s = i * g + n,
            h = i * g + n + 1,
            c = (i + 1) * g + n + 1,
            l = (i + 1) * g + n,
            u = new THREE.Vector2(n / e,i / r),
            E = new THREE.Vector2((n + 1) / e,i / r),
            p = new THREE.Vector2((n + 1) / e,(i + 1) / r),
            d = new THREE.Vector2(n / e,(i + 1) / r),
            m.push(new THREE.Face3(s,h,l)),
            T.push([u, E, d]),
            m.push(new THREE.Face3(h,c,l)),
            T.push([E.clone(), p, d.clone()]);
    this.computeFaceNormals(),
    this.computeVertexNormals()
}
,
THREE.ParametricGeometry.prototype = Object.create(THREE.Geometry.prototype),
THREE.ParametricGeometry.prototype.constructor = THREE.ParametricGeometry,
THREE.AxisHelper = function(t) {
    t = t || 1;
    var e = new Float32Array([0, 0, 0, t, 0, 0, 0, 0, 0, 0, t, 0, 0, 0, 0, 0, 0, t])
      , r = new Float32Array([1, 0, 0, 1, .6, 0, 0, 1, 0, .6, 1, 0, 0, 0, 1, 0, .6, 1])
      , i = new THREE.BufferGeometry;
    i.addAttribute("position", new THREE.BufferAttribute(e,3)),
    i.addAttribute("color", new THREE.BufferAttribute(r,3));
    var n = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    });
    THREE.Line.call(this, i, n, THREE.LinePieces)
}
,
THREE.AxisHelper.prototype = Object.create(THREE.Line.prototype),
THREE.AxisHelper.prototype.constructor = THREE.AxisHelper,
THREE.ArrowHelper = function() {
    var t = new THREE.Geometry;
    t.vertices.push(new THREE.Vector3(0,0,0), new THREE.Vector3(0,1,0));
    var e = new THREE.CylinderGeometry(0,.5,1,5,1);
    return e.applyMatrix((new THREE.Matrix4).makeTranslation(0, -.5, 0)),
    function(r, i, n, o, a, s) {
        THREE.Object3D.call(this),
        void 0 === o && (o = 16776960),
        void 0 === n && (n = 1),
        void 0 === a && (a = .2 * n),
        void 0 === s && (s = .2 * a),
        this.position.copy(i),
        this.line = new THREE.Line(t,new THREE.LineBasicMaterial({
            color: o
        })),
        this.line.matrixAutoUpdate = !1,
        this.add(this.line),
        this.cone = new THREE.Mesh(e,new THREE.MeshBasicMaterial({
            color: o
        })),
        this.cone.matrixAutoUpdate = !1,
        this.add(this.cone),
        this.setDirection(r),
        this.setLength(n, a, s)
    }
}(),
THREE.ArrowHelper.prototype = Object.create(THREE.Object3D.prototype),
THREE.ArrowHelper.prototype.constructor = THREE.ArrowHelper,
THREE.ArrowHelper.prototype.setDirection = function() {
    var t, e = new THREE.Vector3;
    return function(r) {
        r.y > .99999 ? this.quaternion.set(0, 0, 0, 1) : r.y < -.99999 ? this.quaternion.set(1, 0, 0, 0) : (e.set(r.z, 0, -r.x).normalize(),
        t = Math.acos(r.y),
        this.quaternion.setFromAxisAngle(e, t))
    }
}(),
THREE.ArrowHelper.prototype.setLength = function(t, e, r) {
    void 0 === e && (e = .2 * t),
    void 0 === r && (r = .2 * e),
    this.line.scale.set(1, t - e, 1),
    this.line.updateMatrix(),
    this.cone.scale.set(r, e, r),
    this.cone.position.y = t,
    this.cone.updateMatrix()
}
,
THREE.ArrowHelper.prototype.setColor = function(t) {
    this.line.material.color.set(t),
    this.cone.material.color.set(t)
}
,
THREE.BoxHelper = function(t) {
    var e = new THREE.BufferGeometry;
    e.addAttribute("position", new THREE.BufferAttribute(new Float32Array(72),3)),
    THREE.Line.call(this, e, new THREE.LineBasicMaterial({
        color: 16776960
    }), THREE.LinePieces),
    void 0 !== t && this.update(t)
}
,
THREE.BoxHelper.prototype = Object.create(THREE.Line.prototype),
THREE.BoxHelper.prototype.constructor = THREE.BoxHelper,
THREE.BoxHelper.prototype.update = function(t) {
    var e = t.geometry;
    null === e.boundingBox && e.computeBoundingBox();
    var r = e.boundingBox.min
      , i = e.boundingBox.max
      , n = this.geometry.attributes.position.array;
    n[0] = i.x,
    n[1] = i.y,
    n[2] = i.z,
    n[3] = r.x,
    n[4] = i.y,
    n[5] = i.z,
    n[6] = r.x,
    n[7] = i.y,
    n[8] = i.z,
    n[9] = r.x,
    n[10] = r.y,
    n[11] = i.z,
    n[12] = r.x,
    n[13] = r.y,
    n[14] = i.z,
    n[15] = i.x,
    n[16] = r.y,
    n[17] = i.z,
    n[18] = i.x,
    n[19] = r.y,
    n[20] = i.z,
    n[21] = i.x,
    n[22] = i.y,
    n[23] = i.z,
    n[24] = i.x,
    n[25] = i.y,
    n[26] = r.z,
    n[27] = r.x,
    n[28] = i.y,
    n[29] = r.z,
    n[30] = r.x,
    n[31] = i.y,
    n[32] = r.z,
    n[33] = r.x,
    n[34] = r.y,
    n[35] = r.z,
    n[36] = r.x,
    n[37] = r.y,
    n[38] = r.z,
    n[39] = i.x,
    n[40] = r.y,
    n[41] = r.z,
    n[42] = i.x,
    n[43] = r.y,
    n[44] = r.z,
    n[45] = i.x,
    n[46] = i.y,
    n[47] = r.z,
    n[48] = i.x,
    n[49] = i.y,
    n[50] = i.z,
    n[51] = i.x,
    n[52] = i.y,
    n[53] = r.z,
    n[54] = r.x,
    n[55] = i.y,
    n[56] = i.z,
    n[57] = r.x,
    n[58] = i.y,
    n[59] = r.z,
    n[60] = r.x,
    n[61] = r.y,
    n[62] = i.z,
    n[63] = r.x,
    n[64] = r.y,
    n[65] = r.z,
    n[66] = i.x,
    n[67] = r.y,
    n[68] = i.z,
    n[69] = i.x,
    n[70] = r.y,
    n[71] = r.z,
    this.geometry.attributes.position.needsUpdate = !0,
    this.geometry.computeBoundingSphere(),
    this.matrix = t.matrixWorld,
    this.matrixAutoUpdate = !1
}
,
THREE.BoundingBoxHelper = function(t, e) {
    var r = void 0 !== e ? e : 8947848;
    this.object = t,
    this.box = new THREE.Box3,
    THREE.Mesh.call(this, new THREE.BoxGeometry(1,1,1), new THREE.MeshBasicMaterial({
        color: r,
        wireframe: !0
    }))
}
,
THREE.BoundingBoxHelper.prototype = Object.create(THREE.Mesh.prototype),
THREE.BoundingBoxHelper.prototype.constructor = THREE.BoundingBoxHelper,
THREE.BoundingBoxHelper.prototype.update = function() {
    this.box.setFromObject(this.object),
    this.box.size(this.scale),
    this.box.center(this.position)
}
,
THREE.CameraHelper = function(t) {
    var e = new THREE.Geometry
      , r = new THREE.LineBasicMaterial({
        color: 16777215,
        vertexColors: THREE.FaceColors
    })
      , i = {}
      , n = 16755200;
    function o(t, e, r) {
        a(t, r),
        a(e, r)
    }
    function a(t, r) {
        e.vertices.push(new THREE.Vector3),
        e.colors.push(new THREE.Color(r)),
        void 0 === i[t] && (i[t] = []),
        i[t].push(e.vertices.length - 1)
    }
    o("n1", "n2", n),
    o("n2", "n4", n),
    o("n4", "n3", n),
    o("n3", "n1", n),
    o("f1", "f2", n),
    o("f2", "f4", n),
    o("f4", "f3", n),
    o("f3", "f1", n),
    o("n1", "f1", n),
    o("n2", "f2", n),
    o("n3", "f3", n),
    o("n4", "f4", n),
    o("p", "n1", 16711680),
    o("p", "n2", 16711680),
    o("p", "n3", 16711680),
    o("p", "n4", 16711680),
    o("u1", "u2", 43775),
    o("u2", "u3", 43775),
    o("u3", "u1", 43775),
    o("c", "t", 16777215),
    o("p", "c", 3355443),
    o("cn1", "cn2", 3355443),
    o("cn3", "cn4", 3355443),
    o("cf1", "cf2", 3355443),
    o("cf3", "cf4", 3355443),
    THREE.Line.call(this, e, r, THREE.LinePieces),
    this.camera = t,
    this.matrix = t.matrixWorld,
    this.matrixAutoUpdate = !1,
    this.pointMap = i,
    this.update()
}
,
THREE.CameraHelper.prototype = Object.create(THREE.Line.prototype),
THREE.CameraHelper.prototype.constructor = THREE.CameraHelper,
THREE.CameraHelper.prototype.update = function() {
    var t, e, r = new THREE.Vector3, i = new THREE.Camera, n = function(n, o, a, s) {
        r.set(o, a, s).unproject(i);
        var h = e[n];
        if (void 0 !== h)
            for (var c = 0, l = h.length; c < l; c++)
                t.vertices[h[c]].copy(r)
    };
    return function() {
        t = this.geometry,
        e = this.pointMap;
        i.projectionMatrix.copy(this.camera.projectionMatrix),
        n("c", 0, 0, -1),
        n("t", 0, 0, 1),
        n("n1", -1, -1, -1),
        n("n2", 1, -1, -1),
        n("n3", -1, 1, -1),
        n("n4", 1, 1, -1),
        n("f1", -1, -1, 1),
        n("f2", 1, -1, 1),
        n("f3", -1, 1, 1),
        n("f4", 1, 1, 1),
        n("u1", .7, 1.1, -1),
        n("u2", -.7, 1.1, -1),
        n("u3", 0, 2, -1),
        n("cf1", -1, 0, 1),
        n("cf2", 1, 0, 1),
        n("cf3", 0, -1, 1),
        n("cf4", 0, 1, 1),
        n("cn1", -1, 0, -1),
        n("cn2", 1, 0, -1),
        n("cn3", 0, -1, -1),
        n("cn4", 0, 1, -1),
        t.verticesNeedUpdate = !0
    }
}(),
THREE.DirectionalLightHelper = function(t, e) {
    THREE.Object3D.call(this),
    this.light = t,
    this.light.updateMatrixWorld(),
    this.matrix = t.matrixWorld,
    this.matrixAutoUpdate = !1,
    e = e || 1;
    var r = new THREE.Geometry;
    r.vertices.push(new THREE.Vector3(-e,e,0), new THREE.Vector3(e,e,0), new THREE.Vector3(e,-e,0), new THREE.Vector3(-e,-e,0), new THREE.Vector3(-e,e,0));
    var i = new THREE.LineBasicMaterial({
        fog: !1
    });
    i.color.copy(this.light.color).multiplyScalar(this.light.intensity),
    this.lightPlane = new THREE.Line(r,i),
    this.add(this.lightPlane),
    (r = new THREE.Geometry).vertices.push(new THREE.Vector3, new THREE.Vector3),
    (i = new THREE.LineBasicMaterial({
        fog: !1
    })).color.copy(this.light.color).multiplyScalar(this.light.intensity),
    this.targetLine = new THREE.Line(r,i),
    this.add(this.targetLine),
    this.update()
}
,
THREE.DirectionalLightHelper.prototype = Object.create(THREE.Object3D.prototype),
THREE.DirectionalLightHelper.prototype.constructor = THREE.DirectionalLightHelper,
THREE.DirectionalLightHelper.prototype.dispose = function() {
    this.lightPlane.geometry.dispose(),
    this.lightPlane.material.dispose(),
    this.targetLine.geometry.dispose(),
    this.targetLine.material.dispose()
}
,
THREE.DirectionalLightHelper.prototype.update = function() {
    var t = new THREE.Vector3
      , e = new THREE.Vector3
      , r = new THREE.Vector3;
    return function() {
        t.setFromMatrixPosition(this.light.matrixWorld),
        e.setFromMatrixPosition(this.light.target.matrixWorld),
        r.subVectors(e, t),
        this.lightPlane.lookAt(r),
        this.lightPlane.material.color.copy(this.light.color).multiplyScalar(this.light.intensity),
        this.targetLine.geometry.vertices[1].copy(r),
        this.targetLine.geometry.verticesNeedUpdate = !0,
        this.targetLine.material.color.copy(this.lightPlane.material.color)
    }
}(),
THREE.EdgesHelper = function(t, e, r) {
    var i = void 0 !== e ? e : 16777215;
    r = void 0 !== r ? r : 1;
    var n, o = Math.cos(THREE.Math.degToRad(r)), a = [0, 0], s = {}, h = function(t, e) {
        return t - e
    }, c = ["a", "b", "c"], l = new THREE.BufferGeometry;
    t.geometry instanceof THREE.BufferGeometry ? (n = new THREE.Geometry).fromBufferGeometry(t.geometry) : n = t.geometry.clone(),
    n.mergeVertices(),
    n.computeFaceNormals();
    for (var u = n.vertices, E = n.faces, p = 0, d = 0, f = E.length; d < f; d++)
        for (var m = E[d], T = 0; T < 3; T++) {
            a[0] = m[c[T]],
            a[1] = m[c[(T + 1) % 3]],
            a.sort(h),
            void 0 === s[R = a.toString()] ? (s[R] = {
                vert1: a[0],
                vert2: a[1],
                face1: d,
                face2: void 0
            },
            p++) : s[R].face2 = d
        }
    var g = new Float32Array(2 * p * 3)
      , v = 0;
    for (var R in s) {
        var y = s[R];
        if (void 0 === y.face2 || E[y.face1].normal.dot(E[y.face2].normal) <= o) {
            var H = u[y.vert1];
            g[v++] = H.x,
            g[v++] = H.y,
            g[v++] = H.z,
            H = u[y.vert2],
            g[v++] = H.x,
            g[v++] = H.y,
            g[v++] = H.z
        }
    }
    l.addAttribute("position", new THREE.BufferAttribute(g,3)),
    THREE.Line.call(this, l, new THREE.LineBasicMaterial({
        color: i
    }), THREE.LinePieces),
    this.matrix = t.matrixWorld,
    this.matrixAutoUpdate = !1
}
,
THREE.EdgesHelper.prototype = Object.create(THREE.Line.prototype),
THREE.EdgesHelper.prototype.constructor = THREE.EdgesHelper,
THREE.FaceNormalsHelper = function(t, e, r, i) {
    this.object = t,
    this.size = void 0 !== e ? e : 1;
    for (var n = void 0 !== r ? r : 16776960, o = void 0 !== i ? i : 1, a = new THREE.Geometry, s = 0, h = this.object.geometry.faces.length; s < h; s++)
        a.vertices.push(new THREE.Vector3, new THREE.Vector3);
    THREE.Line.call(this, a, new THREE.LineBasicMaterial({
        color: n,
        linewidth: o
    }), THREE.LinePieces),
    this.matrixAutoUpdate = !1,
    this.normalMatrix = new THREE.Matrix3,
    this.update()
}
,
THREE.FaceNormalsHelper.prototype = Object.create(THREE.Line.prototype),
THREE.FaceNormalsHelper.prototype.constructor = THREE.FaceNormalsHelper,
THREE.FaceNormalsHelper.prototype.update = function() {
    var t = this.geometry.vertices
      , e = this.object
      , r = e.geometry.vertices
      , i = e.geometry.faces
      , n = e.matrixWorld;
    e.updateMatrixWorld(!0),
    this.normalMatrix.getNormalMatrix(n);
    for (var o = 0, a = 0, s = i.length; o < s; o++,
    a += 2) {
        var h = i[o];
        t[a].copy(r[h.a]).add(r[h.b]).add(r[h.c]).divideScalar(3).applyMatrix4(n),
        t[a + 1].copy(h.normal).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size).add(t[a])
    }
    return this.geometry.verticesNeedUpdate = !0,
    this
}
,
THREE.GridHelper = function(t, e) {
    var r = new THREE.Geometry
      , i = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors
    });
    this.color1 = new THREE.Color(4473924),
    this.color2 = new THREE.Color(8947848);
    for (var n = -t; n <= t; n += e) {
        r.vertices.push(new THREE.Vector3(-t,0,n), new THREE.Vector3(t,0,n), new THREE.Vector3(n,0,-t), new THREE.Vector3(n,0,t));
        var o = 0 === n ? this.color1 : this.color2;
        r.colors.push(o, o, o, o)
    }
    THREE.Line.call(this, r, i, THREE.LinePieces)
}
,
THREE.GridHelper.prototype = Object.create(THREE.Line.prototype),
THREE.GridHelper.prototype.constructor = THREE.GridHelper,
THREE.GridHelper.prototype.setColors = function(t, e) {
    this.color1.set(t),
    this.color2.set(e),
    this.geometry.colorsNeedUpdate = !0
}
,
THREE.HemisphereLightHelper = function(t, e) {
    THREE.Object3D.call(this),
    this.light = t,
    this.light.updateMatrixWorld(),
    this.matrix = t.matrixWorld,
    this.matrixAutoUpdate = !1,
    this.colors = [new THREE.Color, new THREE.Color];
    var r = new THREE.SphereGeometry(e,4,2);
    r.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI / 2));
    for (var i = 0; i < 8; i++)
        r.faces[i].color = this.colors[i < 4 ? 0 : 1];
    var n = new THREE.MeshBasicMaterial({
        vertexColors: THREE.FaceColors,
        wireframe: !0
    });
    this.lightSphere = new THREE.Mesh(r,n),
    this.add(this.lightSphere),
    this.update()
}
,
THREE.HemisphereLightHelper.prototype = Object.create(THREE.Object3D.prototype),
THREE.HemisphereLightHelper.prototype.constructor = THREE.HemisphereLightHelper,
THREE.HemisphereLightHelper.prototype.dispose = function() {
    this.lightSphere.geometry.dispose(),
    this.lightSphere.material.dispose()
}
,
THREE.HemisphereLightHelper.prototype.update = function() {
    var t = new THREE.Vector3;
    return function() {
        this.colors[0].copy(this.light.color).multiplyScalar(this.light.intensity),
        this.colors[1].copy(this.light.groundColor).multiplyScalar(this.light.intensity),
        this.lightSphere.lookAt(t.setFromMatrixPosition(this.light.matrixWorld).negate()),
        this.lightSphere.geometry.colorsNeedUpdate = !0
    }
}(),
THREE.PointLightHelper = function(t, e) {
    this.light = t,
    this.light.updateMatrixWorld();
    var r = new THREE.SphereGeometry(e,4,2)
      , i = new THREE.MeshBasicMaterial({
        wireframe: !0,
        fog: !1
    });
    i.color.copy(this.light.color).multiplyScalar(this.light.intensity),
    THREE.Mesh.call(this, r, i),
    this.matrix = this.light.matrixWorld,
    this.matrixAutoUpdate = !1
}
,
THREE.PointLightHelper.prototype = Object.create(THREE.Mesh.prototype),
THREE.PointLightHelper.prototype.constructor = THREE.PointLightHelper,
THREE.PointLightHelper.prototype.dispose = function() {
    this.geometry.dispose(),
    this.material.dispose()
}
,
THREE.PointLightHelper.prototype.update = function() {
    this.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
}
,
THREE.SkeletonHelper = function(t) {
    this.bones = this.getBoneList(t);
    for (var e = new THREE.Geometry, r = 0; r < this.bones.length; r++) {
        this.bones[r].parent instanceof THREE.Bone && (e.vertices.push(new THREE.Vector3),
        e.vertices.push(new THREE.Vector3),
        e.colors.push(new THREE.Color(0,0,1)),
        e.colors.push(new THREE.Color(0,1,0)))
    }
    var i = new THREE.LineBasicMaterial({
        vertexColors: THREE.VertexColors,
        depthTest: !1,
        depthWrite: !1,
        transparent: !0
    });
    THREE.Line.call(this, e, i, THREE.LinePieces),
    this.root = t,
    this.matrix = t.matrixWorld,
    this.matrixAutoUpdate = !1,
    this.update()
}
,
THREE.SkeletonHelper.prototype = Object.create(THREE.Line.prototype),
THREE.SkeletonHelper.prototype.constructor = THREE.SkeletonHelper,
THREE.SkeletonHelper.prototype.getBoneList = function(t) {
    var e = [];
    t instanceof THREE.Bone && e.push(t);
    for (var r = 0; r < t.children.length; r++)
        e.push.apply(e, this.getBoneList(t.children[r]));
    return e
}
,
THREE.SkeletonHelper.prototype.update = function() {
    for (var t = this.geometry, e = (new THREE.Matrix4).getInverse(this.root.matrixWorld), r = new THREE.Matrix4, i = 0, n = 0; n < this.bones.length; n++) {
        var o = this.bones[n];
        o.parent instanceof THREE.Bone && (r.multiplyMatrices(e, o.matrixWorld),
        t.vertices[i].setFromMatrixPosition(r),
        r.multiplyMatrices(e, o.parent.matrixWorld),
        t.vertices[i + 1].setFromMatrixPosition(r),
        i += 2)
    }
    t.verticesNeedUpdate = !0,
    t.computeBoundingSphere()
}
,
THREE.SpotLightHelper = function(t) {
    THREE.Object3D.call(this),
    this.light = t,
    this.light.updateMatrixWorld(),
    this.matrix = t.matrixWorld,
    this.matrixAutoUpdate = !1;
    var e = new THREE.CylinderGeometry(0,1,1,8,1,!0);
    e.applyMatrix((new THREE.Matrix4).makeTranslation(0, -.5, 0)),
    e.applyMatrix((new THREE.Matrix4).makeRotationX(-Math.PI / 2));
    var r = new THREE.MeshBasicMaterial({
        wireframe: !0,
        fog: !1
    });
    this.cone = new THREE.Mesh(e,r),
    this.add(this.cone),
    this.update()
}
,
THREE.SpotLightHelper.prototype = Object.create(THREE.Object3D.prototype),
THREE.SpotLightHelper.prototype.constructor = THREE.SpotLightHelper,
THREE.SpotLightHelper.prototype.dispose = function() {
    this.cone.geometry.dispose(),
    this.cone.material.dispose()
}
,
THREE.SpotLightHelper.prototype.update = function() {
    var t = new THREE.Vector3
      , e = new THREE.Vector3;
    return function() {
        var r = this.light.distance ? this.light.distance : 1e4
          , i = r * Math.tan(this.light.angle);
        this.cone.scale.set(i, i, r),
        t.setFromMatrixPosition(this.light.matrixWorld),
        e.setFromMatrixPosition(this.light.target.matrixWorld),
        this.cone.lookAt(e.sub(t)),
        this.cone.material.color.copy(this.light.color).multiplyScalar(this.light.intensity)
    }
}(),
THREE.VertexNormalsHelper = function(t, e, r, i) {
    this.object = t,
    this.size = void 0 !== e ? e : 1;
    for (var n = void 0 !== r ? r : 16711680, o = void 0 !== i ? i : 1, a = new THREE.Geometry, s = t.geometry.faces, h = 0, c = s.length; h < c; h++)
        for (var l = 0, u = s[h].vertexNormals.length; l < u; l++)
            a.vertices.push(new THREE.Vector3, new THREE.Vector3);
    THREE.Line.call(this, a, new THREE.LineBasicMaterial({
        color: n,
        linewidth: o
    }), THREE.LinePieces),
    this.matrixAutoUpdate = !1,
    this.normalMatrix = new THREE.Matrix3,
    this.update()
}
,
THREE.VertexNormalsHelper.prototype = Object.create(THREE.Line.prototype),
THREE.VertexNormalsHelper.prototype.constructor = THREE.VertexNormalsHelper,
THREE.VertexNormalsHelper.prototype.update = function(t) {
    var e = new THREE.Vector3;
    return function(t) {
        var r = ["a", "b", "c", "d"];
        this.object.updateMatrixWorld(!0),
        this.normalMatrix.getNormalMatrix(this.object.matrixWorld);
        for (var i = this.geometry.vertices, n = this.object.geometry.vertices, o = this.object.geometry.faces, a = this.object.matrixWorld, s = 0, h = 0, c = o.length; h < c; h++)
            for (var l = o[h], u = 0, E = l.vertexNormals.length; u < E; u++) {
                var p = n[l[r[u]]]
                  , d = l.vertexNormals[u];
                i[s].copy(p).applyMatrix4(a),
                e.copy(d).applyMatrix3(this.normalMatrix).normalize().multiplyScalar(this.size),
                e.add(i[s]),
                i[s += 1].copy(e),
                s += 1
            }
        return this.geometry.verticesNeedUpdate = !0,
        this
    }
}(),
THREE.VertexTangentsHelper = function(t, e, r, i) {
    this.object = t,
    this.size = void 0 !== e ? e : 1;
    for (var n = void 0 !== r ? r : 255, o = void 0 !== i ? i : 1, a = new THREE.Geometry, s = t.geometry.faces, h = 0, c = s.length; h < c; h++)
        for (var l = 0, u = s[h].vertexTangents.length; l < u; l++)
            a.vertices.push(new THREE.Vector3),
            a.vertices.push(new THREE.Vector3);
    THREE.Line.call(this, a, new THREE.LineBasicMaterial({
        color: n,
        linewidth: o
    }), THREE.LinePieces),
    this.matrixAutoUpdate = !1,
    this.update()
}
,
THREE.VertexTangentsHelper.prototype = Object.create(THREE.Line.prototype),
THREE.VertexTangentsHelper.prototype.constructor = THREE.VertexTangentsHelper,
THREE.VertexTangentsHelper.prototype.update = function(t) {
    var e = new THREE.Vector3;
    return function(t) {
        var r = ["a", "b", "c", "d"];
        this.object.updateMatrixWorld(!0);
        for (var i = this.geometry.vertices, n = this.object.geometry.vertices, o = this.object.geometry.faces, a = this.object.matrixWorld, s = 0, h = 0, c = o.length; h < c; h++)
            for (var l = o[h], u = 0, E = l.vertexTangents.length; u < E; u++) {
                var p = n[l[r[u]]]
                  , d = l.vertexTangents[u];
                i[s].copy(p).applyMatrix4(a),
                e.copy(d).transformDirection(a).multiplyScalar(this.size),
                e.add(i[s]),
                i[s += 1].copy(e),
                s += 1
            }
        return this.geometry.verticesNeedUpdate = !0,
        this
    }
}(),
THREE.WireframeHelper = function(t, e) {
    var r = void 0 !== e ? e : 16777215
      , i = [0, 0]
      , n = {}
      , o = function(t, e) {
        return t - e
    }
      , a = ["a", "b", "c"]
      , s = new THREE.BufferGeometry;
    if (t.geometry instanceof THREE.Geometry) {
        for (var h = t.geometry.vertices, c = t.geometry.faces, l = 0, u = new Uint32Array(6 * c.length), E = 0, p = c.length; E < p; E++)
            for (var d = c[E], f = 0; f < 3; f++) {
                i[0] = d[a[f]],
                i[1] = d[a[(f + 1) % 3]],
                i.sort(o),
                void 0 === n[M = i.toString()] && (u[2 * l] = i[0],
                u[2 * l + 1] = i[1],
                n[M] = !0,
                l++)
            }
        var m = new Float32Array(2 * l * 3);
        for (E = 0,
        p = l; E < p; E++)
            for (f = 0; f < 2; f++) {
                var T = h[u[2 * E + f]];
                m[(w = 6 * E + 3 * f) + 0] = T.x,
                m[w + 1] = T.y,
                m[w + 2] = T.z
            }
        s.addAttribute("position", new THREE.BufferAttribute(m,3))
    } else if (t.geometry instanceof THREE.BufferGeometry)
        if (void 0 !== t.geometry.attributes.index) {
            h = t.geometry.attributes.position.array;
            var g = t.geometry.attributes.index.array
              , v = t.geometry.drawcalls;
            l = 0;
            0 === v.length && (v = [{
                count: g.length,
                index: 0,
                start: 0
            }]);
            u = new Uint32Array(2 * g.length);
            for (var R = 0, y = v.length; R < y; ++R)
                for (var H = v[R].start, x = v[R].count, w = v[R].index, b = (E = H,
                H + x); E < b; E += 3)
                    for (f = 0; f < 3; f++) {
                        var M;
                        i[0] = w + g[E + f],
                        i[1] = w + g[E + (f + 1) % 3],
                        i.sort(o),
                        void 0 === n[M = i.toString()] && (u[2 * l] = i[0],
                        u[2 * l + 1] = i[1],
                        n[M] = !0,
                        l++)
                    }
            for (m = new Float32Array(2 * l * 3),
            E = 0,
            p = l; E < p; E++)
                for (f = 0; f < 2; f++) {
                    w = 6 * E + 3 * f;
                    var _ = 3 * u[2 * E + f];
                    m[w + 0] = h[_],
                    m[w + 1] = h[_ + 1],
                    m[w + 2] = h[_ + 2]
                }
            s.addAttribute("position", new THREE.BufferAttribute(m,3))
        } else {
            var S = (l = (h = t.geometry.attributes.position.array).length / 3) / 3;
            for (m = new Float32Array(2 * l * 3),
            E = 0,
            p = S; E < p; E++)
                for (f = 0; f < 3; f++) {
                    var C = 9 * E + 3 * f;
                    m[(w = 18 * E + 6 * f) + 0] = h[C],
                    m[w + 1] = h[C + 1],
                    m[w + 2] = h[C + 2];
                    _ = 9 * E + (f + 1) % 3 * 3;
                    m[w + 3] = h[_],
                    m[w + 4] = h[_ + 1],
                    m[w + 5] = h[_ + 2]
                }
            s.addAttribute("position", new THREE.BufferAttribute(m,3))
        }
    THREE.Line.call(this, s, new THREE.LineBasicMaterial({
        color: r
    }), THREE.LinePieces),
    this.matrix = t.matrixWorld,
    this.matrixAutoUpdate = !1
}
,
THREE.WireframeHelper.prototype = Object.create(THREE.Line.prototype),
THREE.WireframeHelper.prototype.constructor = THREE.WireframeHelper,
THREE.ImmediateRenderObject = function() {
    THREE.Object3D.call(this),
    this.render = function(t) {}
}
,
THREE.ImmediateRenderObject.prototype = Object.create(THREE.Object3D.prototype),
THREE.ImmediateRenderObject.prototype.constructor = THREE.ImmediateRenderObject,
THREE.MorphBlendMesh = function(t, e) {
    THREE.Mesh.call(this, t, e),
    this.animationsMap = {},
    this.animationsList = [];
    var r = this.geometry.morphTargets.length
      , i = r - 1
      , n = r / 1;
    this.createAnimation("__default", 0, i, n),
    this.setAnimationWeight("__default", 1)
}
,
THREE.MorphBlendMesh.prototype = Object.create(THREE.Mesh.prototype),
THREE.MorphBlendMesh.prototype.constructor = THREE.MorphBlendMesh,
THREE.MorphBlendMesh.prototype.createAnimation = function(t, e, r, i) {
    var n = {
        startFrame: e,
        endFrame: r,
        length: r - e + 1,
        fps: i,
        duration: (r - e) / i,
        lastFrame: 0,
        currentFrame: 0,
        active: !1,
        time: 0,
        direction: 1,
        weight: 1,
        directionBackwards: !1,
        mirroredLoop: !1
    };
    this.animationsMap[t] = n,
    this.animationsList.push(n)
}
,
THREE.MorphBlendMesh.prototype.autoCreateAnimations = function(t) {
    for (var e, r = /([a-z]+)_?(\d+)/, i = {}, n = this.geometry, o = 0, a = n.morphTargets.length; o < a; o++) {
        var s = n.morphTargets[o].name.match(r);
        if (s && s.length > 1)
            i[h = s[1]] || (i[h] = {
                start: 1 / 0,
                end: -1 / 0
            }),
            o < (c = i[h]).start && (c.start = o),
            o > c.end && (c.end = o),
            e || (e = h)
    }
    for (var h in i) {
        var c = i[h];
        this.createAnimation(h, c.start, c.end, t)
    }
    this.firstAnimation = e
}
,
THREE.MorphBlendMesh.prototype.setAnimationDirectionForward = function(t) {
    var e = this.animationsMap[t];
    e && (e.direction = 1,
    e.directionBackwards = !1)
}
,
THREE.MorphBlendMesh.prototype.setAnimationDirectionBackward = function(t) {
    var e = this.animationsMap[t];
    e && (e.direction = -1,
    e.directionBackwards = !0)
}
,
THREE.MorphBlendMesh.prototype.setAnimationFPS = function(t, e) {
    var r = this.animationsMap[t];
    r && (r.fps = e,
    r.duration = (r.end - r.start) / r.fps)
}
,
THREE.MorphBlendMesh.prototype.setAnimationDuration = function(t, e) {
    var r = this.animationsMap[t];
    r && (r.duration = e,
    r.fps = (r.end - r.start) / r.duration)
}
,
THREE.MorphBlendMesh.prototype.setAnimationWeight = function(t, e) {
    var r = this.animationsMap[t];
    r && (r.weight = e)
}
,
THREE.MorphBlendMesh.prototype.setAnimationTime = function(t, e) {
    var r = this.animationsMap[t];
    r && (r.time = e)
}
,
THREE.MorphBlendMesh.prototype.getAnimationTime = function(t) {
    var e = 0
      , r = this.animationsMap[t];
    return r && (e = r.time),
    e
}
,
THREE.MorphBlendMesh.prototype.getAnimationDuration = function(t) {
    var e = -1
      , r = this.animationsMap[t];
    return r && (e = r.duration),
    e
}
,
THREE.MorphBlendMesh.prototype.playAnimation = function(t) {
    var e = this.animationsMap[t];
    e ? (e.time = 0,
    e.active = !0) : THREE.warn("THREE.MorphBlendMesh: animation[" + t + "] undefined in .playAnimation()")
}
,
THREE.MorphBlendMesh.prototype.stopAnimation = function(t) {
    var e = this.animationsMap[t];
    e && (e.active = !1)
}
,
THREE.MorphBlendMesh.prototype.update = function(t) {
    for (var e = 0, r = this.animationsList.length; e < r; e++) {
        var i = this.animationsList[e];
        if (i.active) {
            var n = i.duration / i.length;
            i.time += i.direction * t,
            i.mirroredLoop ? (i.time > i.duration || i.time < 0) && (i.direction *= -1,
            i.time > i.duration && (i.time = i.duration,
            i.directionBackwards = !0),
            i.time < 0 && (i.time = 0,
            i.directionBackwards = !1)) : (i.time = i.time % i.duration,
            i.time < 0 && (i.time += i.duration));
            var o = i.startFrame + THREE.Math.clamp(Math.floor(i.time / n), 0, i.length - 1)
              , a = i.weight;
            o !== i.currentFrame && (this.morphTargetInfluences[i.lastFrame] = 0,
            this.morphTargetInfluences[i.currentFrame] = 1 * a,
            this.morphTargetInfluences[o] = 0,
            i.lastFrame = i.currentFrame,
            i.currentFrame = o);
            var s = i.time % n / n;
            i.directionBackwards && (s = 1 - s),
            this.morphTargetInfluences[i.currentFrame] = s * a,
            this.morphTargetInfluences[i.lastFrame] = (1 - s) * a
        }
    }
}
,
THREE.Cache = {
    files: {},
    add: function(t, e) {
        this.files[t] = e
    },
    get: function(t) {
        return this.files[t]
    },
    remove: function(t) {
        delete this.files[t]
    },
    clear: function() {
        this.files = {}
    }
},
THREE.NURBSCurve = function(t, e, r) {
    this.degree = t,
    this.knots = e,
    this.controlPoints = [];
    for (var i = 0; i < r.length; ++i) {
        var n = r[i];
        this.controlPoints[i] = new THREE.Vector4(n.x,n.y,n.z,n.w)
    }
}
,
THREE.NURBSCurve.prototype = Object.create(THREE.Curve.prototype),
THREE.NURBSCurve.prototype.getPoint = function(t) {
    var e = this.knots[0] + t * (this.knots[this.knots.length - 1] - this.knots[0])
      , r = THREE.NURBSUtils.calcBSplinePoint(this.degree, this.knots, this.controlPoints, e);
    return 1 != r.w && r.divideScalar(r.w),
    new THREE.Vector3(r.x,r.y,r.z)
}
,
THREE.NURBSCurve.prototype.getTangent = function(t) {
    var e = this.knots[0] + t * (this.knots[this.knots.length - 1] - this.knots[0])
      , r = THREE.NURBSUtils.calcNURBSDerivatives(this.degree, this.knots, this.controlPoints, e, 1)[1].clone();
    return r.normalize(),
    r
}
,
THREE.NURBSSurface = function(t, e, r, i, n) {
    this.degree1 = t,
    this.degree2 = e,
    this.knots1 = r,
    this.knots2 = i,
    this.controlPoints = [];
    for (var o = r.length - t - 1, a = i.length - e - 1, s = 0; s < o; ++s) {
        this.controlPoints[s] = [];
        for (var h = 0; h < a; ++h) {
            var c = n[s][h];
            this.controlPoints[s][h] = new THREE.Vector4(c.x,c.y,c.z,c.w)
        }
    }
}
,
THREE.NURBSSurface.prototype = {
    constructor: THREE.NURBSSurface,
    getPoint: function(t, e) {
        var r = this.knots1[0] + t * (this.knots1[this.knots1.length - 1] - this.knots1[0])
          , i = this.knots2[0] + e * (this.knots2[this.knots2.length - 1] - this.knots2[0]);
        return THREE.NURBSUtils.calcSurfacePoint(this.degree1, this.degree2, this.knots1, this.knots2, this.controlPoints, r, i)
    }
},
THREE.NURBSUtils = {
    findSpan: function(t, e, r) {
        var i = r.length - t - 1;
        if (e >= r[i])
            return i - 1;
        if (e <= r[t])
            return t;
        for (var n = t, o = i, a = Math.floor((n + o) / 2); e < r[a] || e >= r[a + 1]; )
            e < r[a] ? o = a : n = a,
            a = Math.floor((n + o) / 2);
        return a
    },
    calcBasisFunctions: function(t, e, r, i) {
        var n = []
          , o = []
          , a = [];
        n[0] = 1;
        for (var s = 1; s <= r; ++s) {
            o[s] = e - i[t + 1 - s],
            a[s] = i[t + s] - e;
            for (var h = 0, c = 0; c < s; ++c) {
                var l = a[c + 1]
                  , u = o[s - c]
                  , E = n[c] / (l + u);
                n[c] = h + l * E,
                h = u * E
            }
            n[s] = h
        }
        return n
    },
    calcBSplinePoint: function(t, e, r, i) {
        for (var n = this.findSpan(t, i, e), o = this.calcBasisFunctions(n, i, t, e), a = new THREE.Vector4(0,0,0,0), s = 0; s <= t; ++s) {
            var h = r[n - t + s]
              , c = o[s]
              , l = h.w * c;
            a.x += h.x * l,
            a.y += h.y * l,
            a.z += h.z * l,
            a.w += h.w * c
        }
        return a
    },
    calcBasisFunctionDerivatives: function(t, e, r, i, n) {
        for (var o = [], a = 0; a <= r; ++a)
            o[a] = 0;
        var s = [];
        for (a = 0; a <= i; ++a)
            s[a] = o.slice(0);
        var h = [];
        for (a = 0; a <= r; ++a)
            h[a] = o.slice(0);
        h[0][0] = 1;
        for (var c = o.slice(0), l = o.slice(0), u = 1; u <= r; ++u) {
            c[u] = e - n[t + 1 - u],
            l[u] = n[t + u] - e;
            for (var E = 0, p = 0; p < u; ++p) {
                var d = l[p + 1]
                  , f = c[u - p];
                h[u][p] = d + f;
                var m = h[p][u - 1] / h[u][p];
                h[p][u] = E + d * m,
                E = f * m
            }
            h[u][u] = E
        }
        for (u = 0; u <= r; ++u)
            s[0][u] = h[u][r];
        for (p = 0; p <= r; ++p) {
            var T = 0
              , g = 1
              , v = [];
            for (a = 0; a <= r; ++a)
                v[a] = o.slice(0);
            v[0][0] = 1;
            for (var R = 1; R <= i; ++R) {
                var y = 0
                  , H = p - R
                  , x = r - R;
                p >= R && (v[g][0] = v[T][0] / h[x + 1][H],
                y = v[g][0] * h[H][x]);
                var w = p - 1 <= x ? R - 1 : r - p;
                for (u = H >= -1 ? 1 : -H; u <= w; ++u)
                    v[g][u] = (v[T][u] - v[T][u - 1]) / h[x + 1][H + u],
                    y += v[g][u] * h[H + u][x];
                p <= x && (v[g][R] = -v[T][R - 1] / h[x + 1][p],
                y += v[g][R] * h[p][x]),
                s[R][p] = y;
                u = T;
                T = g,
                g = u
            }
        }
        for (p = r,
        R = 1; R <= i; ++R) {
            for (u = 0; u <= r; ++u)
                s[R][u] *= p;
            p *= r - R
        }
        return s
    },
    calcBSplineDerivatives: function(t, e, r, i, n) {
        for (var o = n < t ? n : t, a = [], s = this.findSpan(t, i, e), h = this.calcBasisFunctionDerivatives(s, i, t, o, e), c = [], l = 0; l < r.length; ++l) {
            var u = (p = r[l].clone()).w;
            p.x *= u,
            p.y *= u,
            p.z *= u,
            c[l] = p
        }
        for (var E = 0; E <= o; ++E) {
            for (var p = c[s - t].clone().multiplyScalar(h[E][0]), d = 1; d <= t; ++d)
                p.add(c[s - t + d].clone().multiplyScalar(h[E][d]));
            a[E] = p
        }
        for (E = o + 1; E <= n + 1; ++E)
            a[E] = new THREE.Vector4(0,0,0);
        return a
    },
    calcKoverI: function(t, e) {
        for (var r = 1, i = 2; i <= t; ++i)
            r *= i;
        var n = 1;
        for (i = 2; i <= e; ++i)
            n *= i;
        for (i = 2; i <= t - e; ++i)
            n *= i;
        return r / n
    },
    calcRationalCurveDerivatives: function(t) {
        for (var e = t.length, r = [], i = [], n = 0; n < e; ++n) {
            var o = t[n];
            r[n] = new THREE.Vector3(o.x,o.y,o.z),
            i[n] = o.w
        }
        for (var a = [], s = 0; s < e; ++s) {
            var h = r[s].clone();
            for (n = 1; n <= s; ++n)
                h.sub(a[s - n].clone().multiplyScalar(this.calcKoverI(s, n) * i[n]));
            a[s] = h.divideScalar(i[0])
        }
        return a
    },
    calcNURBSDerivatives: function(t, e, r, i, n) {
        var o = this.calcBSplineDerivatives(t, e, r, i, n);
        return this.calcRationalCurveDerivatives(o)
    },
    calcSurfacePoint: function(t, e, r, i, n, o, a) {
        for (var s = this.findSpan(t, o, r), h = this.findSpan(e, a, i), c = this.calcBasisFunctions(s, o, t, r), l = this.calcBasisFunctions(h, a, e, i), u = [], E = 0; E <= e; ++E) {
            u[E] = new THREE.Vector4(0,0,0,0);
            for (var p = 0; p <= t; ++p) {
                var d = n[s - t + p][h - e + E].clone()
                  , f = d.w;
                d.x *= f,
                d.y *= f,
                d.z *= f,
                u[E].add(d.multiplyScalar(c[p]))
            }
        }
        var m = new THREE.Vector4(0,0,0,0);
        for (E = 0; E <= e; ++E)
            m.add(u[E].multiplyScalar(l[E]));
        return m.divideScalar(m.w),
        new THREE.Vector3(m.x,m.y,m.z)
    }
},
THREE.OBJExporter = function() {}
,
THREE.OBJExporter.prototype = {
    constructor: THREE.OBJExporter,
    parse: function(t) {
        console.log(t);
        for (var e = "", r = 0, i = t.vertices.length; r < i; r++) {
            var n = t.vertices[r];
            e += "v " + n.x + " " + n.y + " " + n.z + "\n"
        }
        for (r = 0,
        i = t.faceVertexUvs[0].length; r < i; r++)
            for (var o = t.faceVertexUvs[0][r], a = 0; a < o.length; a++) {
                var s = o[a];
                e += "vt " + s.x + " " + s.y + "\n"
            }
        for (r = 0,
        i = t.faces.length; r < i; r++) {
            var h = t.faces[r].vertexNormals;
            for (a = 0; a < h.length; a++) {
                var c = h[a];
                e += "vn " + c.x + " " + c.y + " " + c.z + "\n"
            }
        }
        for (r = 0,
        a = 1,
        i = t.faces.length; r < i; r++,
        a += 3) {
            var l = t.faces[r];
            e += "f ",
            e += l.a + 1 + "/" + a + "/" + a + " ",
            e += l.b + 1 + "/" + (a + 1) + "/" + (a + 1) + " ",
            e += l.c + 1 + "/" + (a + 2) + "/" + (a + 2) + "\n"
        }
        return e
    }
},
THREE.OBJLoader = function(t) {
    this.manager = void 0 !== t ? t : THREE.DefaultLoadingManager
}
,
THREE.OBJLoader.prototype = {
    constructor: THREE.OBJLoader,
    load: function(t, e, r, i) {
        var n = this
          , o = new THREE.XHRLoader(n.manager);
        o.setCrossOrigin(this.crossOrigin),
        o.load(t, function(t) {
            e(n.parse(t))
        })
    },
    parse: function(t) {
        function e(t, e, r) {
            return new THREE.Vector3(parseFloat(t),parseFloat(e),parseFloat(r))
        }
        function r(t, e, r, i) {
            return new THREE.Face3(t,e,r,i)
        }
        var i, n, o = new THREE.Object3D;
        function a(t) {
            return (t = parseInt(t)) >= 0 ? t - 1 : t + d.length
        }
        function s(t) {
            return (t = parseInt(t)) >= 0 ? t - 1 : t + f.length
        }
        function h(t) {
            return (t = parseInt(t)) >= 0 ? t - 1 : t + m.length
        }
        function c(t, e, i, n) {
            void 0 === n ? A.faces.push(r(d[a(t)] - 1, d[a(e)] - 1, d[a(i)] - 1)) : A.faces.push(r(d[a(t)] - 1, d[a(e)] - 1, d[a(i)] - 1, [f[s(n[0])].clone(), f[s(n[1])].clone(), f[s(n[2])].clone()]))
        }
        function l(t, e, r) {
            A.faceVertexUvs[0].push([m[h(t)].clone(), m[h(e)].clone(), m[h(r)].clone()])
        }
        function u(t, e, r) {
            void 0 === t[3] ? (c(t[0], t[1], t[2], r),
            void 0 !== e && e.length > 0 && l(e[0], e[1], e[2])) : (void 0 !== r && r.length > 0 ? (c(t[0], t[1], t[3], [r[0], r[1], r[3]]),
            c(t[1], t[2], t[3], [r[1], r[2], r[3]])) : (c(t[0], t[1], t[3]),
            c(t[1], t[2], t[3])),
            void 0 !== e && e.length > 0 && (l(e[0], e[1], e[3]),
            l(e[1], e[2], e[3])))
        }
        !1 === /^o /gm.test(t) && (A = new THREE.Geometry,
        i = new THREE.MeshLambertMaterial,
        n = new THREE.Mesh(A,i),
        o.add(n));
        for (var E, p, d = [], f = [], m = [], T = /v( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, g = /vn( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, v = /vt( +[\d|\.|\+|\-|e]+)( +[\d|\.|\+|\-|e]+)/, R = /f( +-?\d+)( +-?\d+)( +-?\d+)( +-?\d+)?/, y = /f( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+))?/, H = /f( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))( +(-?\d+)\/(-?\d+)\/(-?\d+))?/, x = /f( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))( +(-?\d+)\/\/(-?\d+))?/, w = t.split("\n"), b = 0; b < w.length; b++) {
            var M, _ = w[b];
            0 !== (_ = _.trim()).length && "#" !== _.charAt(0) && (null !== (M = T.exec(_)) ? d.push(A.vertices.push(e(M[1], M[2], M[3]))) : null !== (M = g.exec(_)) ? f.push(e(M[1], M[2], M[3])) : null !== (M = v.exec(_)) ? m.push((E = M[1],
            p = M[2],
            new THREE.Vector2(parseFloat(E),parseFloat(p)))) : null !== (M = R.exec(_)) ? u([M[1], M[2], M[3], M[4]]) : null !== (M = y.exec(_)) ? u([M[2], M[5], M[8], M[11]], [M[3], M[6], M[9], M[12]]) : null !== (M = H.exec(_)) ? u([M[2], M[6], M[10], M[14]], [M[3], M[7], M[11], M[15]], [M[4], M[8], M[12], M[16]]) : null !== (M = x.exec(_)) ? u([M[2], M[5], M[8], M[11]], [], [M[3], M[6], M[9], M[12]]) : /^o /.test(_) ? (A = new THREE.Geometry,
            i = new THREE.MeshLambertMaterial,
            (n = new THREE.Mesh(A,i)).name = _.substring(2).trim(),
            o.add(n)) : /^g /.test(_) || (/^usemtl /.test(_) ? i.name = _.substring(7).trim() : /^mtllib /.test(_) || /^s /.test(_)))
        }
        for (var S = o.children, C = (b = 0,
        S.length); b < C; b++) {
            var A;
            (A = S[b].geometry).computeCentroids(),
            A.computeFaceNormals(),
            A.computeBoundingSphere()
        }
        return o
    }
},
THREE.RenderableObject = function() {
    this.id = 0,
    this.object = null,
    this.z = 0
}
,
THREE.RenderableFace = function() {
    this.id = 0,
    this.v1 = new THREE.RenderableVertex,
    this.v2 = new THREE.RenderableVertex,
    this.v3 = new THREE.RenderableVertex,
    this.normalModel = new THREE.Vector3,
    this.vertexNormalsModel = [new THREE.Vector3, new THREE.Vector3, new THREE.Vector3],
    this.vertexNormalsLength = 0,
    this.color = new THREE.Color,
    this.material = null,
    this.uvs = [new THREE.Vector2, new THREE.Vector2, new THREE.Vector2],
    this.z = 0
}
,
THREE.RenderableVertex = function() {
    this.position = new THREE.Vector3,
    this.positionWorld = new THREE.Vector3,
    this.positionScreen = new THREE.Vector4,
    this.visible = !0
}
,
THREE.RenderableVertex.prototype.copy = function(t) {
    this.positionWorld.copy(t.positionWorld),
    this.positionScreen.copy(t.positionScreen)
}
,
THREE.RenderableLine = function() {
    this.id = 0,
    this.v1 = new THREE.RenderableVertex,
    this.v2 = new THREE.RenderableVertex,
    this.vertexColors = [new THREE.Color, new THREE.Color],
    this.material = null,
    this.z = 0
}
,
THREE.RenderableSprite = function() {
    this.id = 0,
    this.object = null,
    this.x = 0,
    this.y = 0,
    this.z = 0,
    this.rotation = 0,
    this.scale = new THREE.Vector2,
    this.material = null
}
,
THREE.Projector = function() {
    var t, e, r, i, n, o, a, s, h, c, l, u = [], E = 0, p = [], d = 0, f = [], m = 0, T = [], g = 0, v = [], R = 0, y = {
        objects: [],
        lights: [],
        elements: []
    }, H = new THREE.Vector3, x = new THREE.Vector4, w = new THREE.Box3(new THREE.Vector3(-1,-1,-1),new THREE.Vector3(1,1,1)), b = new THREE.Box3, M = new Array(3), _ = (new Array(4),
    new THREE.Matrix4), S = new THREE.Matrix4, C = new THREE.Matrix4, A = new THREE.Matrix3, L = new THREE.Frustum, P = new THREE.Vector4, F = new THREE.Vector4;
    this.projectVector = function(t, e) {
        console.warn("THREE.Projector: .projectVector() is now vector.project()."),
        t.project(e)
    }
    ,
    this.unprojectVector = function(t, e) {
        console.warn("THREE.Projector: .unprojectVector() is now vector.unproject()."),
        t.unproject(e)
    }
    ,
    this.pickingRay = function(t, e) {
        console.error("THREE.Projector: .pickingRay() is now raycaster.setFromCamera().")
    }
    ;
    var B = new function() {
        var t = []
          , e = []
          , i = null
          , o = null
          , s = new THREE.Matrix3
          , h = function(t) {
            var e = t.position
              , r = t.positionWorld
              , i = t.positionScreen;
            r.copy(e).applyMatrix4(l),
            i.copy(r).applyMatrix4(S);
            var n = 1 / i.w;
            i.x *= n,
            i.y *= n,
            i.z *= n,
            t.visible = i.x >= -1 && i.x <= 1 && i.y >= -1 && i.y <= 1 && i.z >= -1 && i.z <= 1
        }
          , c = function(t, e, r) {
            return !0 === t.visible || !0 === e.visible || !0 === r.visible || (M[0] = t.positionScreen,
            M[1] = e.positionScreen,
            M[2] = r.positionScreen,
            w.isIntersectionBox(b.setFromPoints(M)))
        }
          , u = function(t, e, r) {
            return (r.positionScreen.x - t.positionScreen.x) * (e.positionScreen.y - t.positionScreen.y) - (r.positionScreen.y - t.positionScreen.y) * (e.positionScreen.x - t.positionScreen.x) < 0
        };
        return {
            setObject: function(r) {
                o = (i = r).material,
                s.getNormalMatrix(i.matrixWorld),
                t.length = 0,
                e.length = 0
            },
            projectVertex: h,
            checkTriangleVisibility: c,
            checkBackfaceCulling: u,
            pushVertex: function(t, e, i) {
                (r = U()).position.set(t, e, i),
                h(r)
            },
            pushNormal: function(e, r, i) {
                t.push(e, r, i)
            },
            pushUv: function(t, r) {
                e.push(t, r)
            },
            pushLine: function(t, e) {
                var r = p[t]
                  , n = p[e];
                (a = D()).id = i.id,
                a.v1.copy(r),
                a.v2.copy(n),
                a.z = (r.positionScreen.z + n.positionScreen.z) / 2,
                a.material = i.material,
                y.elements.push(a)
            },
            pushTriangle: function(r, a, h) {
                var l = p[r]
                  , E = p[a]
                  , d = p[h];
                if (!1 !== c(l, E, d) && (o.side === THREE.DoubleSide || !0 === u(l, E, d))) {
                    (n = V()).id = i.id,
                    n.v1.copy(l),
                    n.v2.copy(E),
                    n.v3.copy(d),
                    n.z = (l.positionScreen.z + E.positionScreen.z + d.positionScreen.z) / 3;
                    for (var f = 0; f < 3; f++) {
                        var m = 3 * arguments[f]
                          , T = n.vertexNormalsModel[f];
                        T.set(t[m], t[m + 1], t[m + 2]),
                        T.applyMatrix3(s).normalize();
                        var g = 2 * arguments[f];
                        n.uvs[f].set(e[g], e[g + 1])
                    }
                    n.vertexNormalsLength = 3,
                    n.material = i.material,
                    y.elements.push(n)
                }
            }
        }
    }
    ;
    function U() {
        if (i === d) {
            var t = new THREE.RenderableVertex;
            return p.push(t),
            d++,
            i++,
            t
        }
        return p[i++]
    }
    function V() {
        if (o === m) {
            var t = new THREE.RenderableFace;
            return f.push(t),
            m++,
            o++,
            t
        }
        return f[o++]
    }
    function D() {
        if (s === g) {
            var t = new THREE.RenderableLine;
            return T.push(t),
            g++,
            s++,
            t
        }
        return T[s++]
    }
    function z() {
        if (c === R) {
            var t = new THREE.RenderableSprite;
            return v.push(t),
            R++,
            c++,
            t
        }
        return v[c++]
    }
    function k(t, e) {
        return t.z !== e.z ? e.z - t.z : t.id !== e.id ? t.id - e.id : 0
    }
    function N(t, e) {
        var r = 0
          , i = 1
          , n = t.z + t.w
          , o = e.z + e.w
          , a = -t.z + t.w
          , s = -e.z + e.w;
        return n >= 0 && o >= 0 && a >= 0 && s >= 0 || !(n < 0 && o < 0 || a < 0 && s < 0) && (n < 0 ? r = Math.max(r, n / (n - o)) : o < 0 && (i = Math.min(i, n / (n - o))),
        a < 0 ? r = Math.max(r, a / (a - s)) : s < 0 && (i = Math.min(i, a / (a - s))),
        !(i < r) && (t.lerp(e, r),
        e.lerp(t, 1 - i),
        !0))
    }
    this.projectScene = function(r, d, f, m) {
        o = 0,
        s = 0,
        c = 0,
        y.elements.length = 0,
        !0 === r.autoUpdate && r.updateMatrixWorld(),
        void 0 === d.parent && d.updateMatrixWorld(),
        _.copy(d.matrixWorldInverse.getInverse(d.matrixWorld)),
        S.multiplyMatrices(d.projectionMatrix, _),
        L.setFromMatrix(S),
        e = 0,
        y.objects.length = 0,
        y.lights.length = 0,
        r.traverseVisible(function(r) {
            if (r instanceof THREE.Light)
                y.lights.push(r);
            else if (r instanceof THREE.Mesh || r instanceof THREE.Line || r instanceof THREE.Sprite) {
                if (!1 === r.material.visible)
                    return;
                !1 !== r.frustumCulled && !0 !== L.intersectsObject(r) || ((t = function() {
                    if (e === E) {
                        var t = new THREE.RenderableObject;
                        return u.push(t),
                        E++,
                        e++,
                        t
                    }
                    return u[e++]
                }()).id = r.id,
                t.object = r,
                H.setFromMatrixPosition(r.matrixWorld),
                H.applyProjection(S),
                t.z = H.z,
                y.objects.push(t))
            }
        }),
        !0 === f && y.objects.sort(k);
        for (var T = 0, g = y.objects.length; T < g; T++) {
            var v = y.objects[T].object
              , R = v.geometry;
            if (B.setObject(v),
            l = v.matrixWorld,
            i = 0,
            v instanceof THREE.Mesh) {
                if (R instanceof THREE.BufferGeometry) {
                    var w = R.attributes
                      , b = R.offsets;
                    if (void 0 === w.position)
                        continue;
                    for (var M = 0, O = (Ht = w.position.array).length; M < O; M += 3)
                        B.pushVertex(Ht[M], Ht[M + 1], Ht[M + 2]);
                    if (void 0 !== w.normal) {
                        var G = w.normal.array;
                        for (M = 0,
                        O = G.length; M < O; M += 3)
                            B.pushNormal(G[M], G[M + 1], G[M + 2])
                    }
                    if (void 0 !== w.uv) {
                        var I = w.uv.array;
                        for (M = 0,
                        O = I.length; M < O; M += 2)
                            B.pushUv(I[M], I[M + 1])
                    }
                    if (void 0 !== w.index) {
                        var W = w.index.array;
                        if (b.length > 0)
                            for (T = 0; T < b.length; T++) {
                                var j = b[T]
                                  , X = j.index;
                                for (M = j.start,
                                O = j.start + j.count; M < O; M += 3)
                                    B.pushTriangle(W[M] + X, W[M + 1] + X, W[M + 2] + X)
                            }
                        else
                            for (M = 0,
                            O = W.length; M < O; M += 3)
                                B.pushTriangle(W[M], W[M + 1], W[M + 2])
                    } else
                        for (M = 0,
                        O = Ht.length / 3; M < O; M += 3)
                            B.pushTriangle(M, M + 1, M + 2)
                } else if (R instanceof THREE.Geometry) {
                    var Y = R.vertices
                      , q = R.faces
                      , Z = R.faceVertexUvs[0];
                    A.getNormalMatrix(l);
                    for (var K = (ct = v.material)instanceof THREE.MeshFaceMaterial, Q = !0 === K ? v.material : null, J = 0, $ = Y.length; J < $; J++) {
                        var tt = Y[J];
                        if (H.copy(tt),
                        !0 === ct.morphTargets)
                            for (var et = R.morphTargets, rt = v.morphTargetInfluences, it = 0, nt = et.length; it < nt; it++) {
                                var ot = rt[it];
                                if (0 !== ot) {
                                    var at = et[it].vertices[J];
                                    H.x += (at.x - tt.x) * ot,
                                    H.y += (at.y - tt.y) * ot,
                                    H.z += (at.z - tt.z) * ot
                                }
                            }
                        B.pushVertex(H.x, H.y, H.z)
                    }
                    for (var st = 0, ht = q.length; st < ht; st++) {
                        var ct, lt = q[st];
                        if (void 0 !== (ct = !0 === K ? Q.materials[lt.materialIndex] : v.material)) {
                            var ut = ct.side
                              , Et = p[lt.a]
                              , pt = p[lt.b]
                              , dt = p[lt.c];
                            if (!1 !== B.checkTriangleVisibility(Et, pt, dt)) {
                                var ft = B.checkBackfaceCulling(Et, pt, dt);
                                if (ut !== THREE.DoubleSide) {
                                    if (ut === THREE.FrontSide && !1 === ft)
                                        continue;
                                    if (ut === THREE.BackSide && !0 === ft)
                                        continue
                                }
                                (n = V()).id = v.id,
                                n.v1.copy(Et),
                                n.v2.copy(pt),
                                n.v3.copy(dt),
                                n.normalModel.copy(lt.normal),
                                !1 !== ft || ut !== THREE.BackSide && ut !== THREE.DoubleSide || n.normalModel.negate(),
                                n.normalModel.applyMatrix3(A).normalize();
                                for (var mt = lt.vertexNormals, Tt = 0, gt = Math.min(mt.length, 3); Tt < gt; Tt++) {
                                    var vt = n.vertexNormalsModel[Tt];
                                    vt.copy(mt[Tt]),
                                    !1 !== ft || ut !== THREE.BackSide && ut !== THREE.DoubleSide || vt.negate(),
                                    vt.applyMatrix3(A).normalize()
                                }
                                n.vertexNormalsLength = mt.length;
                                var Rt = Z[st];
                                if (void 0 !== Rt)
                                    for (var yt = 0; yt < 3; yt++)
                                        n.uvs[yt].copy(Rt[yt]);
                                n.color = lt.color,
                                n.material = ct,
                                n.z = (Et.positionScreen.z + pt.positionScreen.z + dt.positionScreen.z) / 3,
                                y.elements.push(n)
                            }
                        }
                    }
                }
            } else if (v instanceof THREE.Line) {
                if (R instanceof THREE.BufferGeometry) {
                    if (void 0 !== (w = R.attributes).position) {
                        var Ht;
                        for (M = 0,
                        O = (Ht = w.position.array).length; M < O; M += 3)
                            B.pushVertex(Ht[M], Ht[M + 1], Ht[M + 2]);
                        if (void 0 !== w.index)
                            for (M = 0,
                            O = (W = w.index.array).length; M < O; M += 2)
                                B.pushLine(W[M], W[M + 1]);
                        else {
                            var xt = v.mode === THREE.LinePieces ? 2 : 1;
                            for (M = 0,
                            O = Ht.length / 3 - 1; M < O; M += xt)
                                B.pushLine(M, M + 1)
                        }
                    }
                } else if (R instanceof THREE.Geometry) {
                    if (C.multiplyMatrices(S, l),
                    0 === (Y = v.geometry.vertices).length)
                        continue;
                    (Et = U()).positionScreen.copy(Y[0]).applyMatrix4(C);
                    for (xt = v.mode === THREE.LinePieces ? 2 : 1,
                    J = 1,
                    $ = Y.length; J < $; J++)
                        (Et = U()).positionScreen.copy(Y[J]).applyMatrix4(C),
                        (J + 1) % xt > 0 || (pt = p[i - 2],
                        P.copy(Et.positionScreen),
                        F.copy(pt.positionScreen),
                        !0 === N(P, F) && (P.multiplyScalar(1 / P.w),
                        F.multiplyScalar(1 / F.w),
                        (a = D()).id = v.id,
                        a.v1.positionScreen.copy(P),
                        a.v2.positionScreen.copy(F),
                        a.z = Math.max(P.z, F.z),
                        a.material = v.material,
                        v.material.vertexColors === THREE.VertexColors && (a.vertexColors[0].copy(v.geometry.colors[J]),
                        a.vertexColors[1].copy(v.geometry.colors[J - 1])),
                        y.elements.push(a)))
                }
            } else if (v instanceof THREE.Sprite) {
                x.set(l.elements[12], l.elements[13], l.elements[14], 1),
                x.applyMatrix4(S);
                var wt = 1 / x.w;
                x.z *= wt,
                x.z >= -1 && x.z <= 1 && ((h = z()).id = v.id,
                h.x = x.x * wt,
                h.y = x.y * wt,
                h.z = x.z,
                h.object = v,
                h.rotation = v.rotation,
                h.scale.x = v.scale.x * Math.abs(h.x - (x.x + d.projectionMatrix.elements[0]) / (x.w + d.projectionMatrix.elements[12])),
                h.scale.y = v.scale.y * Math.abs(h.y - (x.y + d.projectionMatrix.elements[5]) / (x.w + d.projectionMatrix.elements[13])),
                h.material = v.material,
                y.elements.push(h))
            }
        }
        return !0 === m && y.elements.sort(k),
        y
    }
}
,
THREE.STLBinaryExporter = function() {}
,
THREE.STLBinaryExporter.prototype = {
    constructor: THREE.STLBinaryExporter,
    parse: function() {
        var t = new THREE.Vector3
          , e = new THREE.Matrix3;
        return function(r) {
            var i = 0;
            r.traverse(function(t) {
                t instanceof THREE.Mesh && (i += t.geometry.faces.length)
            });
            var n = 80
              , o = new ArrayBuffer(2 * i + 3 * i * 4 * 4 + 80 + 4)
              , a = new DataView(o);
            return a.setUint32(n, i, !0),
            n += 4,
            r.traverse(function(r) {
                if (r instanceof THREE.Mesh) {
                    var i = r.geometry;
                    if (i instanceof THREE.BufferGeometry && (i = (new THREE.Geometry).fromBufferGeometry(i)),
                    i instanceof THREE.Geometry) {
                        var o = r.matrixWorld
                          , s = i.vertices
                          , h = i.faces;
                        e.getNormalMatrix(o);
                        for (var c = 0, l = h.length; c < l; c++) {
                            var u = h[c];
                            t.copy(u.normal).applyMatrix3(e).normalize(),
                            a.setFloat32(n, t.x, !0),
                            n += 4,
                            a.setFloat32(n, t.y, !0),
                            n += 4,
                            a.setFloat32(n, t.z, !0),
                            n += 4;
                            for (var E = [u.a, u.b, u.c], p = 0; p < 3; p++)
                                t.copy(s[E[p]]).applyMatrix4(o),
                                a.setFloat32(n, t.x, !0),
                                n += 4,
                                a.setFloat32(n, t.y, !0),
                                n += 4,
                                a.setFloat32(n, t.z, !0),
                                n += 4;
                            a.setUint16(n, 0, !0),
                            n += 2
                        }
                    }
                }
            }),
            a
        }
    }()
},
THREE.STLExporter = function() {
    this.stlContent = ""
}
,
THREE.STLExporter.prototype = {
    constructor: THREE.STLExporter,
    exportScene: function(t) {
        var e = [];
        return t.traverse(function(t) {
            t instanceof THREE.Mesh && e.push(t)
        }),
        this.exportMeshes(e)
    },
    exportMesh: function(t) {
        return this.exportMeshes([t])
    },
    exportMeshes: function(t) {
        var e, r, i, n, o, a, s, h, c, l, u;
        for (this.addLineToContent("solid exported"),
        e = 0; e < t.length; e++)
            for (n = (i = t[e]).geometry,
            a = i.matrixWorld,
            s = i.position,
            r = 0; r < n.faces.length; r++)
                h = (o = n.faces[r]).normal,
                c = this.getTransformedPosition(n.vertices[o.a], a, s),
                l = this.getTransformedPosition(n.vertices[o.b], a, s),
                u = this.getTransformedPosition(n.vertices[o.c], a, s),
                this.addTriangleToContent(h, c, l, u);
        return this.addLineToContent("endsolid exported"),
        this.stlContent
    },
    clearContent: function() {
        this.stlContent = ""
    },
    addLineToContent: function(t) {
        this.stlContent += t + "\n"
    },
    addTriangleToContent: function(t, e, r, i) {
        this.addLineToContent("\tfacet normal " + t.x + " " + t.y + " " + t.z),
        this.addLineToContent("\t\touter loop"),
        this.addLineToContent("\t\t\tvertex " + e.x + " " + e.y + " " + e.z),
        this.addLineToContent("\t\t\tvertex " + r.x + " " + r.y + " " + r.z),
        this.addLineToContent("\t\t\tvertex " + i.x + " " + i.y + " " + i.z),
        this.addLineToContent("\t\tendloop"),
        this.addLineToContent("\tendfacet")
    },
    getTransformedPosition: function(t, e, r) {
        var i = t.clone();
        return void 0 !== e && i.applyMatrix4(e),
        void 0 !== r && i.add(r),
        i
    }
},
THREE.STLLoader = function() {}
,
THREE.STLLoader.prototype = {
    constructor: THREE.STLLoader
},
THREE.STLLoader.prototype.load = function(t, e) {
    var r = this
      , i = new XMLHttpRequest;
    i.addEventListener("load", function(i) {
        if (200 === i.target.status || 0 === i.target.status) {
            var n = r.parse(i.target.response || i.target.responseText);
            r.dispatchEvent({
                type: "load",
                content: n
            }),
            e && e(n)
        } else
            r.dispatchEvent({
                type: "error",
                message: "Couldn't load URL [" + t + "]",
                response: i.target.responseText
            })
    }, !1),
    i.addEventListener("progress", function(t) {
        r.dispatchEvent({
            type: "progress",
            loaded: t.loaded,
            total: t.total
        })
    }, !1),
    i.addEventListener("error", function() {
        r.dispatchEvent({
            type: "error",
            message: "Couldn't load URL [" + t + "]"
        })
    }, !1),
    i.overrideMimeType && i.overrideMimeType("text/plain; charset=x-user-defined"),
    i.open("GET", t, !0),
    i.responseType = "arraybuffer",
    i.send(null)
}
,
THREE.STLLoader.prototype.parse = function(t) {
    var e, r = this.ensureBinary(t);
    return 84 + 50 * (e = new DataView(r)).getUint32(80, !0) === e.byteLength ? this.parseBinary(r) : this.parseASCII(this.ensureString(t))
}
,
THREE.STLLoader.prototype.parseBinary = function(t) {
    var e, r, i, n, o, a, s, h, c;
    for (i = (n = new DataView(t)).getUint32(80, !0),
    r = new THREE.Geometry,
    84,
    50,
    e = 0; e < i; e++) {
        for (h = 84 + 50 * e,
        a = new THREE.Vector3(n.getFloat32(h, !0),n.getFloat32(h + 4, !0),n.getFloat32(h + 8, !0)),
        s = 1; s <= 3; s++)
            c = h + 12 * s,
            r.vertices.push(new THREE.Vector3(n.getFloat32(c, !0),n.getFloat32(c + 4, !0),n.getFloat32(c + 8, !0)));
        o = r.vertices.length,
        r.faces.push(new THREE.Face3(o - 3,o - 2,o - 1,a))
    }
    return r.computeBoundingSphere(),
    r
}
,
THREE.STLLoader.prototype.parseASCII = function(t) {
    var e, r, i, n, o, a, s, h;
    for (e = new THREE.Geometry,
    n = /facet([\s\S]*?)endfacet/g; null !== (s = n.exec(t)); ) {
        for (h = s[0],
        o = /normal[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g; null !== (s = o.exec(h)); )
            i = new THREE.Vector3(parseFloat(s[1]),parseFloat(s[3]),parseFloat(s[5]));
        for (a = /vertex[\s]+([\-+]?[0-9]+\.?[0-9]*([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+[\s]+([\-+]?[0-9]*\.?[0-9]+([eE][\-+]?[0-9]+)?)+/g; null !== (s = a.exec(h)); )
            e.vertices.push(new THREE.Vector3(parseFloat(s[1]),parseFloat(s[3]),parseFloat(s[5])));
        r = e.vertices.length,
        e.faces.push(new THREE.Face3(r - 3,r - 2,r - 1,i))
    }
    return e.computeBoundingBox(),
    e.computeBoundingSphere(),
    e
}
,
THREE.STLLoader.prototype.ensureString = function(t) {
    if ("string" != typeof t) {
        for (var e = new Uint8Array(t), r = "", i = 0; i < t.byteLength; i++)
            r += String.fromCharCode(e[i]);
        return r
    }
    return t
}
,
THREE.STLLoader.prototype.ensureBinary = function(t) {
    if ("string" == typeof t) {
        for (var e = new Uint8Array(t.length), r = 0; r < t.length; r++)
            e[r] = 255 & t.charCodeAt(r);
        return e.buffer || e
    }
    return t
}
,
THREE.EventDispatcher.prototype.apply(THREE.STLLoader.prototype),
"undefined" == typeof DataView && (DataView = function(t, e, r) {
    this.buffer = t,
    this.byteOffset = e || 0,
    this.byteLength = r || t.byteLength || t.length,
    this._isString = "string" == typeof t
}
,
DataView.prototype = {
    _getCharCodes: function(t, e, r) {
        for (var i = (e = e || 0) + (r = r || t.length), n = [], o = e; o < i; o++)
            n.push(255 & t.charCodeAt(o));
        return n
    },
    _getBytes: function(t, e, r) {
        var i;
        if (void 0 === r && (r = this._littleEndian),
        e = void 0 === e ? this.byteOffset : this.byteOffset + e,
        void 0 === t && (t = this.byteLength - e),
        "number" != typeof e)
            throw new TypeError("DataView byteOffset is not a number");
        if (t < 0 || e + t > this.byteLength)
            throw new Error("DataView length or (byteOffset+length) value is out of bounds");
        return i = this.isString ? this._getCharCodes(this.buffer, e, e + t) : this.buffer.slice(e, e + t),
        !r && t > 1 && (i instanceof Array || (i = Array.prototype.slice.call(i)),
        i.reverse()),
        i
    },
    getFloat64: function(t, e) {
        var r = this._getBytes(8, t, e)
          , i = 1 - 2 * (r[7] >> 7)
          , n = ((r[7] << 1 & 255) << 3 | r[6] >> 4) - 1023
          , o = (15 & r[6]) * Math.pow(2, 48) + r[5] * Math.pow(2, 40) + r[4] * Math.pow(2, 32) + r[3] * Math.pow(2, 24) + r[2] * Math.pow(2, 16) + r[1] * Math.pow(2, 8) + r[0];
        return 1024 === n ? 0 !== o ? NaN : i * (1 / 0) : -1023 === n ? i * o * Math.pow(2, -1074) : i * (1 + o * Math.pow(2, -52)) * Math.pow(2, n)
    },
    getFloat32: function(t, e) {
        var r = this._getBytes(4, t, e)
          , i = 1 - 2 * (r[3] >> 7)
          , n = (r[3] << 1 & 255 | r[2] >> 7) - 127
          , o = (127 & r[2]) << 16 | r[1] << 8 | r[0];
        return 128 === n ? 0 !== o ? NaN : i * (1 / 0) : -127 === n ? i * o * Math.pow(2, -149) : i * (1 + o * Math.pow(2, -23)) * Math.pow(2, n)
    },
    getInt32: function(t, e) {
        var r = this._getBytes(4, t, e);
        return r[3] << 24 | r[2] << 16 | r[1] << 8 | r[0]
    },
    getUint32: function(t, e) {
        return this.getInt32(t, e) >>> 0
    },
    getInt16: function(t, e) {
        return this.getUint16(t, e) << 16 >> 16
    },
    getUint16: function(t, e) {
        var r = this._getBytes(2, t, e);
        return r[1] << 8 | r[0]
    },
    getInt8: function(t) {
        return this.getUint8(t) << 24 >> 24
    },
    getUint8: function(t) {
        return this._getBytes(1, t)[0]
    }
}),
THREE.SubdivisionModifier = function(t) {
    this.subdivisions = void 0 === t ? 1 : t
}
,
THREE.SubdivisionModifier.prototype.modify = function(t) {
    for (var e = this.subdivisions; e-- > 0; )
        this.smooth(t);
    delete t.__tmpVertices,
    t.computeFaceNormals(),
    t.computeVertexNormals()
}
,
function() {
    var t = ["a", "b", "c"];
    function e(t, e, r) {
        return r[Math.min(t, e) + "_" + Math.max(t, e)]
    }
    function r(t, e, r, i, n, o) {
        var a, s = Math.min(t, e), h = Math.max(t, e), c = s + "_" + h;
        c in i ? a = i[c] : (a = {
            a: r[s],
            b: r[h],
            newEdge: null,
            faces: []
        },
        i[c] = a);
        a.faces.push(n),
        o[t].edges.push(a),
        o[e].edges.push(a)
    }
    function i(t, e, r, i) {
        t.push(new THREE.Face3(e,r,i))
    }
    THREE.SubdivisionModifier.prototype.smooth = function(n) {
        var o, a, s, h, c, l, u, E, p, d, f, m, T, g, v, R, y, H, x, w, b, M, _, S, C, A, L, P = new THREE.Vector3;
        (function(t, e, i, n) {
            var o, a, s;
            for (o = 0,
            a = t.length; o < a; o++)
                i[o] = {
                    edges: []
                };
            for (o = 0,
            a = e.length; o < a; o++)
                r((s = e[o]).a, s.b, t, n, s, i),
                r(s.b, s.c, t, n, s, i),
                r(s.c, s.a, t, n, s, i)
        }
        )(o = n.vertices, a = n.faces, d = new Array(o.length), f = {}),
        m = [];
        for (l in f) {
            for (v = f[l],
            R = new THREE.Vector3,
            H = 3 / 8,
            x = 1 / 8,
            2 != (w = v.faces.length) && (H = .5,
            x = 0),
            R.addVectors(v.a, v.b).multiplyScalar(H),
            P.set(0, 0, 0),
            E = 0; E < w; E++) {
                for (y = v.faces[E],
                p = 0; p < 3 && ((g = o[y[t[p]]]) === v.a || g === v.b); p++)
                    ;
                P.add(g)
            }
            P.multiplyScalar(x),
            R.add(P),
            v.newEdge = m.length,
            m.push(R)
        }
        for (T = [],
        l = 0,
        u = o.length; l < u; l++) {
            for (A = o[l],
            3 == (c = (C = d[l].edges).length) ? b = 3 / 16 : c > 3 && (b = 3 / (8 * c)),
            M = 1 - c * b,
            _ = b,
            c <= 2 && 2 == c && (M = .75,
            _ = 1 / 8),
            L = A.clone().multiplyScalar(M),
            P.set(0, 0, 0),
            E = 0; E < c; E++)
                g = (S = C[E]).a !== A ? S.a : S.b,
                P.add(g);
            P.multiplyScalar(_),
            L.add(P),
            T.push(L)
        }
        s = T.concat(m);
        var F, B, U, V = T.length;
        for (h = [],
        l = 0,
        u = a.length; l < u; l++)
            i(h, F = e((y = a[l]).a, y.b, f).newEdge + V, B = e(y.b, y.c, f).newEdge + V, U = e(y.c, y.a, f).newEdge + V),
            i(h, y.a, F, U),
            i(h, y.b, B, F),
            i(h, y.c, U, B);
        n.vertices = s,
        n.faces = h
    }
}(),
THREE.TrackballControls = function(t, e) {
    var r = this
      , i = {
        NONE: -1,
        ROTATE: 0,
        ZOOM: 1,
        PAN: 2,
        TOUCH_ROTATE: 3,
        TOUCH_ZOOM_PAN: 4
    };
    this.object = t,
    this.domElement = void 0 !== e ? e : document,
    this.enabled = !0,
    this.screen = {
        left: 0,
        top: 0,
        width: 0,
        height: 0
    },
    this.rotateSpeed = 1,
    this.zoomSpeed = 1.2,
    this.panSpeed = .3,
    this.noRotate = !1,
    this.noZoom = !1,
    this.noPan = !1,
    this.staticMoving = !1,
    this.dynamicDampingFactor = .2,
    this.minDistance = 0,
    this.maxDistance = 1 / 0,
    this.keys = [65, 83, 68],
    this.target = new THREE.Vector3;
    var n = new THREE.Vector3
      , o = i.NONE
      , a = i.NONE
      , s = new THREE.Vector3
      , h = new THREE.Vector2
      , c = new THREE.Vector2
      , l = new THREE.Vector3
      , u = 0
      , E = new THREE.Vector2
      , p = new THREE.Vector2
      , d = 0
      , f = 0
      , m = new THREE.Vector2
      , T = new THREE.Vector2;
    this.target0 = this.target.clone(),
    this.position0 = this.object.position.clone(),
    this.up0 = this.object.up.clone();
    var g = {
        type: "change"
    }
      , v = {
        type: "start"
    }
      , R = {
        type: "end"
    };
    this.handleResize = function() {
        if (this.domElement === document)
            this.screen.left = 0,
            this.screen.top = 0,
            this.screen.width = window.innerWidth,
            this.screen.height = window.innerHeight;
        else {
            var t = this.domElement.getBoundingClientRect()
              , e = this.domElement.ownerDocument.documentElement;
            this.screen.left = t.left + window.pageXOffset - e.clientLeft,
            this.screen.top = t.top + window.pageYOffset - e.clientTop,
            this.screen.width = t.width,
            this.screen.height = t.height
        }
    }
    ,
    this.handleEvent = function(t) {
        "function" == typeof this[t.type] && this[t.type](t)
    }
    ;
    var y, H, x, w, b, M, _, S, C, A, L, P, F = (y = new THREE.Vector2,
    function(t, e) {
        return y.set((t - r.screen.left) / r.screen.width, (e - r.screen.top) / r.screen.height),
        y
    }
    ), B = (H = new THREE.Vector2,
    function(t, e) {
        return H.set((t - .5 * r.screen.width - r.screen.left) / (.5 * r.screen.width), (r.screen.height + 2 * (r.screen.top - e)) / r.screen.width),
        H
    }
    );
    function U(t) {
        !1 !== r.enabled && (window.removeEventListener("keydown", U),
        a = o,
        o === i.NONE && (t.keyCode !== r.keys[i.ROTATE] || r.noRotate ? t.keyCode !== r.keys[i.ZOOM] || r.noZoom ? t.keyCode !== r.keys[i.PAN] || r.noPan || (o = i.PAN) : o = i.ZOOM : o = i.ROTATE))
    }
    function V(t) {
        !1 !== r.enabled && (t.preventDefault(),
        t.stopPropagation(),
        o !== i.ROTATE || r.noRotate ? o !== i.ZOOM || r.noZoom ? o !== i.PAN || r.noPan || T.copy(F(t.pageX, t.pageY)) : p.copy(F(t.pageX, t.pageY)) : (h.copy(c),
        c.copy(B(t.pageX, t.pageY))))
    }
    function D(t) {
        !1 !== r.enabled && (t.preventDefault(),
        t.stopPropagation(),
        o = i.NONE,
        document.removeEventListener("mousemove", V),
        document.removeEventListener("mouseup", D),
        r.dispatchEvent(R))
    }
    function z(t) {
        if (!1 !== r.enabled) {
            t.preventDefault(),
            t.stopPropagation();
            var e = 0;
            t.wheelDelta ? e = t.wheelDelta / 40 : t.detail && (e = -t.detail / 3),
            E.y += .01 * e,
            r.dispatchEvent(v),
            r.dispatchEvent(R)
        }
    }
    this.rotateCamera = (w = new THREE.Vector3,
    b = new THREE.Quaternion,
    M = new THREE.Vector3,
    _ = new THREE.Vector3,
    S = new THREE.Vector3,
    C = new THREE.Vector3,
    function() {
        C.set(c.x - h.x, c.y - h.y, 0),
        (x = C.length()) ? (s.copy(r.object.position).sub(r.target),
        M.copy(s).normalize(),
        _.copy(r.object.up).normalize(),
        S.crossVectors(_, M).normalize(),
        _.setLength(c.y - h.y),
        S.setLength(c.x - h.x),
        C.copy(_.add(S)),
        w.crossVectors(C, s).normalize(),
        x *= r.rotateSpeed,
        b.setFromAxisAngle(w, x),
        s.applyQuaternion(b),
        r.object.up.applyQuaternion(b),
        l.copy(w),
        u = x) : !r.staticMoving && u && (u *= Math.sqrt(1 - r.dynamicDampingFactor),
        s.copy(r.object.position).sub(r.target),
        b.setFromAxisAngle(l, u),
        s.applyQuaternion(b),
        r.object.up.applyQuaternion(b)),
        h.copy(c)
    }
    ),
    this.zoomCamera = function() {
        var t;
        o === i.TOUCH_ZOOM_PAN ? (t = d / f,
        d = f,
        s.multiplyScalar(t)) : 1 !== (t = 1 + (p.y - E.y) * r.zoomSpeed) && t > 0 && (s.multiplyScalar(t),
        r.staticMoving ? E.copy(p) : E.y += (p.y - E.y) * this.dynamicDampingFactor)
    }
    ,
    this.panCamera = (A = new THREE.Vector2,
    L = new THREE.Vector3,
    P = new THREE.Vector3,
    function() {
        A.copy(T).sub(m),
        A.lengthSq() && (A.multiplyScalar(s.length() * r.panSpeed),
        P.copy(s).cross(r.object.up).setLength(A.x),
        P.add(L.copy(r.object.up).setLength(A.y)),
        r.object.position.add(P),
        r.target.add(P),
        r.staticMoving ? m.copy(T) : m.add(A.subVectors(T, m).multiplyScalar(r.dynamicDampingFactor)))
    }
    ),
    this.checkDistances = function() {
        r.noZoom && r.noPan || (s.lengthSq() > r.maxDistance * r.maxDistance && r.object.position.addVectors(r.target, s.setLength(r.maxDistance)),
        s.lengthSq() < r.minDistance * r.minDistance && r.object.position.addVectors(r.target, s.setLength(r.minDistance)))
    }
    ,
    this.update = function() {
        s.subVectors(r.object.position, r.target),
        r.noRotate || r.rotateCamera(),
        r.noZoom || r.zoomCamera(),
        r.noPan || r.panCamera(),
        r.object.position.addVectors(r.target, s),
        r.checkDistances(),
        r.object.lookAt(r.target),
        n.distanceToSquared(r.object.position) > 1e-6 && (r.dispatchEvent(g),
        n.copy(r.object.position))
    }
    ,
    this.reset = function() {
        o = i.NONE,
        a = i.NONE,
        r.target.copy(r.target0),
        r.object.position.copy(r.position0),
        r.object.up.copy(r.up0),
        s.subVectors(r.object.position, r.target),
        r.object.lookAt(r.target),
        r.dispatchEvent(g),
        n.copy(r.object.position)
    }
    ,
    this.domElement.addEventListener("contextmenu", function(t) {
        t.preventDefault()
    }, !1),
    this.domElement.addEventListener("mousedown", function(t) {
        !1 !== r.enabled && (t.preventDefault(),
        t.stopPropagation(),
        o === i.NONE && (o = t.button),
        o !== i.ROTATE || r.noRotate ? o !== i.ZOOM || r.noZoom ? o !== i.PAN || r.noPan || (m.copy(F(t.pageX, t.pageY)),
        T.copy(m)) : (E.copy(F(t.pageX, t.pageY)),
        p.copy(E)) : (c.copy(B(t.pageX, t.pageY)),
        h.copy(c)),
        document.addEventListener("mousemove", V, !1),
        document.addEventListener("mouseup", D, !1),
        r.dispatchEvent(v))
    }, !1),
    this.domElement.addEventListener("mousewheel", z, !1),
    this.domElement.addEventListener("DOMMouseScroll", z, !1),
    this.domElement.addEventListener("touchstart", function(t) {
        if (!1 !== r.enabled) {
            switch (t.touches.length) {
            case 1:
                o = i.TOUCH_ROTATE,
                c.copy(B(t.touches[0].pageX, t.touches[0].pageY)),
                h.copy(c);
                break;
            case 2:
                o = i.TOUCH_ZOOM_PAN;
                var e = t.touches[0].pageX - t.touches[1].pageX
                  , n = t.touches[0].pageY - t.touches[1].pageY;
                f = d = Math.sqrt(e * e + n * n);
                var a = (t.touches[0].pageX + t.touches[1].pageX) / 2
                  , s = (t.touches[0].pageY + t.touches[1].pageY) / 2;
                m.copy(F(a, s)),
                T.copy(m);
                break;
            default:
                o = i.NONE
            }
            r.dispatchEvent(v)
        }
    }, !1),
    this.domElement.addEventListener("touchend", function(t) {
        if (!1 !== r.enabled) {
            switch (t.touches.length) {
            case 1:
                h.copy(c),
                c.copy(B(t.touches[0].pageX, t.touches[0].pageY));
                break;
            case 2:
                d = f = 0;
                var e = (t.touches[0].pageX + t.touches[1].pageX) / 2
                  , n = (t.touches[0].pageY + t.touches[1].pageY) / 2;
                T.copy(F(e, n)),
                m.copy(T)
            }
            o = i.NONE,
            r.dispatchEvent(R)
        }
    }, !1),
    this.domElement.addEventListener("touchmove", function(t) {
        if (!1 !== r.enabled)
            switch (t.preventDefault(),
            t.stopPropagation(),
            t.touches.length) {
            case 1:
                h.copy(c),
                c.copy(B(t.touches[0].pageX, t.touches[0].pageY));
                break;
            case 2:
                var e = t.touches[0].pageX - t.touches[1].pageX
                  , n = t.touches[0].pageY - t.touches[1].pageY;
                f = Math.sqrt(e * e + n * n);
                var a = (t.touches[0].pageX + t.touches[1].pageX) / 2
                  , s = (t.touches[0].pageY + t.touches[1].pageY) / 2;
                T.copy(F(a, s));
                break;
            default:
                o = i.NONE
            }
    }, !1),
    window.addEventListener("keydown", U, !1),
    window.addEventListener("keyup", function(t) {
        !1 !== r.enabled && (o = a,
        window.addEventListener("keydown", U, !1))
    }, !1),
    this.handleResize(),
    this.update()
}
,
THREE.TrackballControls.prototype = Object.create(THREE.EventDispatcher.prototype),
THREE.TrackballControls.prototype.constructor = THREE.TrackballControls,
function() {
    "use strict";
    var t = function(t) {
        THREE.MeshBasicMaterial.call(this),
        this.depthTest = !1,
        this.depthWrite = !1,
        this.side = THREE.FrontSide,
        this.transparent = !0,
        this.setValues(t),
        this.oldColor = this.color.clone(),
        this.oldOpacity = this.opacity,
        this.highlight = function(t) {
            t ? (this.color.setRGB(1, 1, 0),
            this.opacity = 1) : (this.color.copy(this.oldColor),
            this.opacity = this.oldOpacity)
        }
    };
    (t.prototype = Object.create(THREE.MeshBasicMaterial.prototype)).constructor = t;
    var e = function(t) {
        THREE.LineBasicMaterial.call(this),
        this.depthTest = !1,
        this.depthWrite = !1,
        this.transparent = !0,
        this.linewidth = 1,
        this.setValues(t),
        this.oldColor = this.color.clone(),
        this.oldOpacity = this.opacity,
        this.highlight = function(t) {
            t ? (this.color.setRGB(1, 1, 0),
            this.opacity = 1) : (this.color.copy(this.oldColor),
            this.opacity = this.oldOpacity)
        }
    };
    (e.prototype = Object.create(THREE.LineBasicMaterial.prototype)).constructor = e,
    THREE.TransformGizmo = function() {
        var t = this;
        this.init = function() {
            THREE.Object3D.call(this),
            this.handles = new THREE.Object3D,
            this.pickers = new THREE.Object3D,
            this.planes = new THREE.Object3D,
            this.add(this.handles),
            this.add(this.pickers),
            this.add(this.planes);
            var t = new THREE.PlaneBufferGeometry(50,50,2,2)
              , e = new THREE.MeshBasicMaterial({
                wireframe: !0
            });
            e.side = THREE.DoubleSide;
            var r = {
                XY: new THREE.Mesh(t,e),
                YZ: new THREE.Mesh(t,e),
                XZ: new THREE.Mesh(t,e),
                XYZE: new THREE.Mesh(t,e)
            };
            this.activePlane = r.XYZE,
            r.YZ.rotation.set(0, Math.PI / 2, 0),
            r.XZ.rotation.set(-Math.PI / 2, 0, 0);
            for (var i in r)
                r[i].name = i,
                this.planes.add(r[i]),
                this.planes[i] = r[i],
                r[i].visible = !1;
            var n = function(t, e) {
                for (var r in t)
                    for (i = t[r].length; i--; ) {
                        var n = t[r][i][0]
                          , o = t[r][i][1]
                          , a = t[r][i][2];
                        n.name = r,
                        o && n.position.set(o[0], o[1], o[2]),
                        a && n.rotation.set(a[0], a[1], a[2]),
                        e.add(n)
                    }
            };
            n(this.handleGizmos, this.handles),
            n(this.pickerGizmos, this.pickers),
            this.traverse(function(t) {
                if (t instanceof THREE.Mesh) {
                    t.updateMatrix();
                    var e = t.geometry.clone();
                    e.applyMatrix(t.matrix),
                    t.geometry = e,
                    t.position.set(0, 0, 0),
                    t.rotation.set(0, 0, 0),
                    t.scale.set(1, 1, 1)
                }
            })
        }
        ,
        this.hide = function() {
            this.traverse(function(t) {
                t.visible = !1
            })
        }
        ,
        this.show = function() {
            this.traverse(function(e) {
                e.visible = !0,
                e.parent == t.pickers && (e.visible = !1),
                e.parent == t.planes && (e.visible = !1)
            }),
            this.activePlane.visible = !1
        }
        ,
        this.highlight = function(t) {
            this.traverse(function(e) {
                e.material && e.material.highlight && (e.name == t ? e.material.highlight(!0) : e.material.highlight(!1))
            })
        }
    }
    ,
    THREE.TransformGizmo.prototype = Object.create(THREE.Object3D.prototype),
    THREE.TransformGizmo.prototype.constructor = THREE.TransformGizmo,
    THREE.TransformGizmo.prototype.update = function(t, e) {
        var r = new THREE.Vector3(0,0,0)
          , i = new THREE.Vector3(0,1,0)
          , n = new THREE.Matrix4;
        this.traverse(function(o) {
            -1 != o.name.search("E") ? o.quaternion.setFromRotationMatrix(n.lookAt(e, r, i)) : -1 == o.name.search("X") && -1 == o.name.search("Y") && -1 == o.name.search("Z") || o.quaternion.setFromEuler(t)
        })
    }
    ,
    THREE.TransformGizmoTranslate = function() {
        THREE.TransformGizmo.call(this);
        var r = new THREE.Geometry
          , i = new THREE.Mesh(new THREE.CylinderGeometry(0,.05,.2,12,1,!1));
        i.position.y = .5,
        i.updateMatrix(),
        r.merge(i.geometry, i.matrix);
        var n = new THREE.Geometry;
        n.vertices.push(new THREE.Vector3(0,0,0), new THREE.Vector3(1,0,0));
        var o = new THREE.Geometry;
        o.vertices.push(new THREE.Vector3(0,0,0), new THREE.Vector3(0,1,0));
        var a = new THREE.Geometry;
        a.vertices.push(new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,1)),
        this.handleGizmos = {
            X: [[new THREE.Mesh(r,new t({
                color: 16711680
            })), [.5, 0, 0], [0, 0, -Math.PI / 2]], [new THREE.Line(n,new e({
                color: 16711680
            }))]],
            Y: [[new THREE.Mesh(r,new t({
                color: 65280
            })), [0, .5, 0]], [new THREE.Line(o,new e({
                color: 65280
            }))]],
            Z: [[new THREE.Mesh(r,new t({
                color: 255
            })), [0, 0, .5], [Math.PI / 2, 0, 0]], [new THREE.Line(a,new e({
                color: 255
            }))]],
            XYZ: [[new THREE.Mesh(new THREE.OctahedronGeometry(.1,0),new t({
                color: 16777215,
                opacity: .25
            })), [0, 0, 0], [0, 0, 0]]],
            XY: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(.29,.29),new t({
                color: 16776960,
                opacity: .25
            })), [.15, .15, 0]]],
            YZ: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(.29,.29),new t({
                color: 65535,
                opacity: .25
            })), [0, .15, .15], [0, Math.PI / 2, 0]]],
            XZ: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(.29,.29),new t({
                color: 16711935,
                opacity: .25
            })), [.15, 0, .15], [-Math.PI / 2, 0, 0]]]
        },
        this.pickerGizmos = {
            X: [[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,1,4,1,!1),new t({
                color: 16711680,
                opacity: .25
            })), [.6, 0, 0], [0, 0, -Math.PI / 2]]],
            Y: [[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,1,4,1,!1),new t({
                color: 65280,
                opacity: .25
            })), [0, .6, 0]]],
            Z: [[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,1,4,1,!1),new t({
                color: 255,
                opacity: .25
            })), [0, 0, .6], [Math.PI / 2, 0, 0]]],
            XYZ: [[new THREE.Mesh(new THREE.OctahedronGeometry(.2,0),new t({
                color: 16777215,
                opacity: .25
            }))]],
            XY: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(.4,.4),new t({
                color: 16776960,
                opacity: .25
            })), [.2, .2, 0]]],
            YZ: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(.4,.4),new t({
                color: 65535,
                opacity: .25
            })), [0, .2, .2], [0, Math.PI / 2, 0]]],
            XZ: [[new THREE.Mesh(new THREE.PlaneBufferGeometry(.4,.4),new t({
                color: 16711935,
                opacity: .25
            })), [.2, 0, .2], [-Math.PI / 2, 0, 0]]]
        },
        this.setActivePlane = function(t, e) {
            var r = new THREE.Matrix4;
            e.applyMatrix4(r.getInverse(r.extractRotation(this.planes.XY.matrixWorld))),
            "X" == t && (this.activePlane = this.planes.XY,
            Math.abs(e.y) > Math.abs(e.z) && (this.activePlane = this.planes.XZ)),
            "Y" == t && (this.activePlane = this.planes.XY,
            Math.abs(e.x) > Math.abs(e.z) && (this.activePlane = this.planes.YZ)),
            "Z" == t && (this.activePlane = this.planes.XZ,
            Math.abs(e.x) > Math.abs(e.y) && (this.activePlane = this.planes.YZ)),
            "XYZ" == t && (this.activePlane = this.planes.XYZE),
            "XY" == t && (this.activePlane = this.planes.XY),
            "YZ" == t && (this.activePlane = this.planes.YZ),
            "XZ" == t && (this.activePlane = this.planes.XZ),
            this.hide(),
            this.show()
        }
        ,
        this.init()
    }
    ,
    THREE.TransformGizmoTranslate.prototype = Object.create(THREE.TransformGizmo.prototype),
    THREE.TransformGizmoTranslate.prototype.constructor = THREE.TransformGizmoTranslate,
    THREE.TransformGizmoRotate = function() {
        THREE.TransformGizmo.call(this);
        var r = function(t, e, r) {
            var i = new THREE.Geometry;
            r = r || 1;
            for (var n = 0; n <= 64 * r; ++n)
                "x" == e && i.vertices.push(new THREE.Vector3(0,Math.cos(n / 32 * Math.PI),Math.sin(n / 32 * Math.PI)).multiplyScalar(t)),
                "y" == e && i.vertices.push(new THREE.Vector3(Math.cos(n / 32 * Math.PI),0,Math.sin(n / 32 * Math.PI)).multiplyScalar(t)),
                "z" == e && i.vertices.push(new THREE.Vector3(Math.sin(n / 32 * Math.PI),Math.cos(n / 32 * Math.PI),0).multiplyScalar(t));
            return i
        };
        this.handleGizmos = {
            X: [[new THREE.Line(new r(1,"x",.5),new e({
                color: 16711680
            }))]],
            Y: [[new THREE.Line(new r(1,"y",.5),new e({
                color: 65280
            }))]],
            Z: [[new THREE.Line(new r(1,"z",.5),new e({
                color: 255
            }))]],
            E: [[new THREE.Line(new r(1.25,"z",1),new e({
                color: 13421568
            }))]],
            XYZE: [[new THREE.Line(new r(1,"z",1),new e({
                color: 7895160
            }))]]
        },
        this.pickerGizmos = {
            X: [[new THREE.Mesh(new THREE.TorusGeometry(1,.12,4,12,Math.PI),new t({
                color: 16711680,
                opacity: .25
            })), [0, 0, 0], [0, -Math.PI / 2, -Math.PI / 2]]],
            Y: [[new THREE.Mesh(new THREE.TorusGeometry(1,.12,4,12,Math.PI),new t({
                color: 65280,
                opacity: .25
            })), [0, 0, 0], [Math.PI / 2, 0, 0]]],
            Z: [[new THREE.Mesh(new THREE.TorusGeometry(1,.12,4,12,Math.PI),new t({
                color: 255,
                opacity: .25
            })), [0, 0, 0], [0, 0, -Math.PI / 2]]],
            E: [[new THREE.Mesh(new THREE.TorusGeometry(1.25,.12,2,24),new t({
                color: 16776960,
                opacity: .25
            }))]],
            XYZE: [[new THREE.Mesh(new THREE.Geometry)]]
        },
        this.setActivePlane = function(t) {
            "E" == t && (this.activePlane = this.planes.XYZE),
            "X" == t && (this.activePlane = this.planes.YZ),
            "Y" == t && (this.activePlane = this.planes.XZ),
            "Z" == t && (this.activePlane = this.planes.XY),
            this.hide(),
            this.show()
        }
        ,
        this.update = function(t, e) {
            THREE.TransformGizmo.prototype.update.apply(this, arguments);
            this.handles,
            this.pickers;
            var r = new THREE.Matrix4
              , i = new THREE.Euler(0,0,1)
              , n = new THREE.Quaternion
              , o = new THREE.Vector3(1,0,0)
              , a = new THREE.Vector3(0,1,0)
              , s = new THREE.Vector3(0,0,1)
              , h = new THREE.Quaternion
              , c = new THREE.Quaternion
              , l = new THREE.Quaternion
              , u = e.clone();
            i.copy(this.planes.XY.rotation),
            n.setFromEuler(i),
            r.makeRotationFromQuaternion(n).getInverse(r),
            u.applyMatrix4(r),
            this.traverse(function(t) {
                n.setFromEuler(i),
                "X" == t.name && (h.setFromAxisAngle(o, Math.atan2(-u.y, u.z)),
                n.multiplyQuaternions(n, h),
                t.quaternion.copy(n)),
                "Y" == t.name && (c.setFromAxisAngle(a, Math.atan2(u.x, u.z)),
                n.multiplyQuaternions(n, c),
                t.quaternion.copy(n)),
                "Z" == t.name && (l.setFromAxisAngle(s, Math.atan2(u.y, u.x)),
                n.multiplyQuaternions(n, l),
                t.quaternion.copy(n))
            })
        }
        ,
        this.init()
    }
    ,
    THREE.TransformGizmoRotate.prototype = Object.create(THREE.TransformGizmo.prototype),
    THREE.TransformGizmoRotate.prototype.constructor = THREE.TransformGizmoRotate,
    THREE.TransformGizmoScale = function() {
        THREE.TransformGizmo.call(this);
        var r = new THREE.Geometry
          , i = new THREE.Mesh(new THREE.BoxGeometry(.125,.125,.125));
        i.position.y = .5,
        i.updateMatrix(),
        r.merge(i.geometry, i.matrix);
        var n = new THREE.Geometry;
        n.vertices.push(new THREE.Vector3(0,0,0), new THREE.Vector3(1,0,0));
        var o = new THREE.Geometry;
        o.vertices.push(new THREE.Vector3(0,0,0), new THREE.Vector3(0,1,0));
        var a = new THREE.Geometry;
        a.vertices.push(new THREE.Vector3(0,0,0), new THREE.Vector3(0,0,1)),
        this.handleGizmos = {
            X: [[new THREE.Mesh(r,new t({
                color: 16711680
            })), [.5, 0, 0], [0, 0, -Math.PI / 2]], [new THREE.Line(n,new e({
                color: 16711680
            }))]],
            Y: [[new THREE.Mesh(r,new t({
                color: 65280
            })), [0, .5, 0]], [new THREE.Line(o,new e({
                color: 65280
            }))]],
            Z: [[new THREE.Mesh(r,new t({
                color: 255
            })), [0, 0, .5], [Math.PI / 2, 0, 0]], [new THREE.Line(a,new e({
                color: 255
            }))]],
            XYZ: [[new THREE.Mesh(new THREE.BoxGeometry(.125,.125,.125),new t({
                color: 16777215,
                opacity: .25
            }))]]
        },
        this.pickerGizmos = {
            X: [[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,1,4,1,!1),new t({
                color: 16711680,
                opacity: .25
            })), [.6, 0, 0], [0, 0, -Math.PI / 2]]],
            Y: [[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,1,4,1,!1),new t({
                color: 65280,
                opacity: .25
            })), [0, .6, 0]]],
            Z: [[new THREE.Mesh(new THREE.CylinderGeometry(.2,0,1,4,1,!1),new t({
                color: 255,
                opacity: .25
            })), [0, 0, .6], [Math.PI / 2, 0, 0]]],
            XYZ: [[new THREE.Mesh(new THREE.BoxGeometry(.4,.4,.4),new t({
                color: 16777215,
                opacity: .25
            }))]]
        },
        this.setActivePlane = function(t, e) {
            var r = new THREE.Matrix4;
            e.applyMatrix4(r.getInverse(r.extractRotation(this.planes.XY.matrixWorld))),
            "X" == t && (this.activePlane = this.planes.XY,
            Math.abs(e.y) > Math.abs(e.z) && (this.activePlane = this.planes.XZ)),
            "Y" == t && (this.activePlane = this.planes.XY,
            Math.abs(e.x) > Math.abs(e.z) && (this.activePlane = this.planes.YZ)),
            "Z" == t && (this.activePlane = this.planes.XZ,
            Math.abs(e.x) > Math.abs(e.y) && (this.activePlane = this.planes.YZ)),
            "XYZ" == t && (this.activePlane = this.planes.XYZE),
            this.hide(),
            this.show()
        }
        ,
        this.init()
    }
    ,
    THREE.TransformGizmoScale.prototype = Object.create(THREE.TransformGizmo.prototype),
    THREE.TransformGizmoScale.prototype.constructor = THREE.TransformGizmoScale,
    THREE.TransformControls = function(t, e) {
        THREE.Object3D.call(this),
        e = document,
        this.gizmo = {},
        this.gizmo.translate = new THREE.TransformGizmoTranslate,
        this.gizmo.rotate = new THREE.TransformGizmoRotate,
        this.gizmo.scale = new THREE.TransformGizmoScale,
        this.add(this.gizmo.translate),
        this.add(this.gizmo.rotate),
        this.add(this.gizmo.scale),
        this.gizmo.translate.hide(),
        this.gizmo.rotate.hide(),
        this.gizmo.scale.hide(),
        this.object = void 0,
        this.snap = null,
        this.space = "world",
        this.size = 1,
        this.axis = null;
        var r = this
          , i = !1
          , n = "translate"
          , o = {
            type: "change"
        }
          , a = {
            type: "mouseDown"
        }
          , s = {
            type: "mouseUp",
            mode: n
        }
          , h = {
            type: "objectChange"
        }
          , c = new THREE.Raycaster
          , l = new THREE.Vector3
          , u = new THREE.Vector3
          , E = new THREE.Vector3
          , p = new THREE.Vector3
          , d = new THREE.Vector3
          , f = 1
          , m = new THREE.Matrix4
          , T = new THREE.Vector3
          , g = new THREE.Matrix4
          , v = new THREE.Vector3
          , R = new THREE.Quaternion
          , y = new THREE.Vector3(1,0,0)
          , H = new THREE.Vector3(0,1,0)
          , x = new THREE.Vector3(0,0,1)
          , w = new THREE.Quaternion
          , b = new THREE.Quaternion
          , M = new THREE.Quaternion
          , _ = new THREE.Quaternion
          , S = new THREE.Quaternion
          , C = new THREE.Vector3
          , A = new THREE.Vector3
          , L = new THREE.Matrix4
          , P = new THREE.Matrix4
          , F = new THREE.Vector3
          , B = new THREE.Vector3
          , U = new THREE.Euler
          , V = new THREE.Matrix4
          , D = new THREE.Vector3
          , z = new THREE.Euler;
        function k(t) {
            if (void 0 !== r.object && !0 !== i) {
                t.preventDefault();
                var e = I(t.changedTouches ? t.changedTouches[0] : t, r.gizmo[n].pickers.children)
                  , a = null;
                e && (a = e.object.name),
                r.axis !== a && (r.axis = a,
                r.update(),
                r.dispatchEvent(o))
            }
        }
        function N(t) {
            if (void 0 !== r.object && !0 !== i) {
                t.preventDefault(),
                t.stopPropagation();
                var e = t.changedTouches ? t.changedTouches[0] : t;
                if (0 === e.button || void 0 === e.button) {
                    var o = I(e, r.gizmo[n].pickers.children);
                    if (o) {
                        r.dispatchEvent(a),
                        r.axis = o.object.name,
                        r.update(),
                        T.copy(D).sub(B).normalize(),
                        r.gizmo[n].setActivePlane(r.axis, T);
                        var s = I(e, [r.gizmo[n].activePlane]);
                        C.copy(r.object.position),
                        A.copy(r.object.scale),
                        L.extractRotation(r.object.matrix),
                        V.extractRotation(r.object.matrixWorld),
                        P.extractRotation(r.object.parent.matrixWorld),
                        F.setFromMatrixScale(g.getInverse(r.object.parent.matrixWorld)),
                        E.copy(s.point)
                    }
                }
                i = !0
            }
        }
        function O(t) {
            if (void 0 !== r.object && null !== r.axis && !1 !== i) {
                t.preventDefault(),
                t.stopPropagation();
                var e = I(t.changedTouches ? t.changedTouches[0] : t, [r.gizmo[n].activePlane]);
                u.copy(e.point),
                "translate" == n ? (u.sub(E),
                u.multiply(F),
                "local" == r.space && (u.applyMatrix4(g.getInverse(V)),
                -1 == r.axis.search("X") && (u.x = 0),
                -1 == r.axis.search("Y") && (u.y = 0),
                -1 == r.axis.search("Z") && (u.z = 0),
                u.applyMatrix4(L),
                r.object.position.copy(C),
                r.object.position.add(u)),
                "world" != r.space && -1 == r.axis.search("XYZ") || (-1 == r.axis.search("X") && (u.x = 0),
                -1 == r.axis.search("Y") && (u.y = 0),
                -1 == r.axis.search("Z") && (u.z = 0),
                u.applyMatrix4(g.getInverse(P)),
                r.object.position.copy(C),
                r.object.position.add(u)),
                null !== r.snap && (-1 != r.axis.search("X") && (r.object.position.x = Math.round(r.object.position.x / r.snap) * r.snap),
                -1 != r.axis.search("Y") && (r.object.position.y = Math.round(r.object.position.y / r.snap) * r.snap),
                -1 != r.axis.search("Z") && (r.object.position.z = Math.round(r.object.position.z / r.snap) * r.snap)),
                BuildTransformControlPointUpdate(t, r)) : "scale" == n ? (u.sub(E),
                u.multiply(F),
                "local" == r.space && ("XYZ" == r.axis ? (f = 1 + u.y / 50,
                r.object.scale.x = A.x * f,
                r.object.scale.y = A.y * f,
                r.object.scale.z = A.z * f) : (u.applyMatrix4(g.getInverse(V)),
                "X" == r.axis && (r.object.scale.x = A.x * (1 + u.x / 50)),
                "Y" == r.axis && (r.object.scale.y = A.y * (1 + u.y / 50)),
                "Z" == r.axis && (r.object.scale.z = A.z * (1 + u.z / 50)))),
                BuildTransformControlPointUpdate(t, r)) : "rotate" == n && (u.sub(B),
                u.multiply(F),
                v.copy(E).sub(B),
                v.multiply(F),
                "E" == r.axis ? (u.applyMatrix4(g.getInverse(m)),
                v.applyMatrix4(g.getInverse(m)),
                p.set(Math.atan2(u.z, u.y), Math.atan2(u.x, u.z), Math.atan2(u.y, u.x)),
                d.set(Math.atan2(v.z, v.y), Math.atan2(v.x, v.z), Math.atan2(v.y, v.x)),
                R.setFromRotationMatrix(g.getInverse(P)),
                S.setFromAxisAngle(T, p.z - d.z),
                w.setFromRotationMatrix(V),
                R.multiplyQuaternions(R, S),
                R.multiplyQuaternions(R, w),
                r.object.quaternion.copy(R)) : "XYZE" == r.axis ? (S.setFromEuler(u.clone().cross(v).normalize()),
                R.setFromRotationMatrix(g.getInverse(P)),
                b.setFromAxisAngle(S, -u.clone().angleTo(v)),
                w.setFromRotationMatrix(V),
                R.multiplyQuaternions(R, b),
                R.multiplyQuaternions(R, w),
                r.object.quaternion.copy(R)) : "local" == r.space ? (u.applyMatrix4(g.getInverse(V)),
                v.applyMatrix4(g.getInverse(V)),
                p.set(Math.atan2(u.z, u.y), Math.atan2(u.x, u.z), Math.atan2(u.y, u.x)),
                d.set(Math.atan2(v.z, v.y), Math.atan2(v.x, v.z), Math.atan2(v.y, v.x)),
                w.setFromRotationMatrix(L),
                b.setFromAxisAngle(y, p.x - d.x),
                M.setFromAxisAngle(H, p.y - d.y),
                _.setFromAxisAngle(x, p.z - d.z),
                "X" == r.axis && w.multiplyQuaternions(w, b),
                "Y" == r.axis && w.multiplyQuaternions(w, M),
                "Z" == r.axis && w.multiplyQuaternions(w, _),
                r.object.quaternion.copy(w)) : "world" == r.space && (p.set(Math.atan2(u.z, u.y), Math.atan2(u.x, u.z), Math.atan2(u.y, u.x)),
                d.set(Math.atan2(v.z, v.y), Math.atan2(v.x, v.z), Math.atan2(v.y, v.x)),
                R.setFromRotationMatrix(g.getInverse(P)),
                b.setFromAxisAngle(y, p.x - d.x),
                M.setFromAxisAngle(H, p.y - d.y),
                _.setFromAxisAngle(x, p.z - d.z),
                w.setFromRotationMatrix(V),
                "X" == r.axis && R.multiplyQuaternions(R, b),
                "Y" == r.axis && R.multiplyQuaternions(R, M),
                "Z" == r.axis && R.multiplyQuaternions(R, _),
                R.multiplyQuaternions(R, w),
                r.object.quaternion.copy(R)),
                BuildTransformControlPointUpdate(t, r)),
                r.update(),
                r.dispatchEvent(o),
                r.dispatchEvent(h)
            }
        }
        function G(t) {
            i && null !== r.axis && (s.mode = n,
            r.dispatchEvent(s)),
            i = !1,
            k(t);
            var e = document.getElementsByTagName("buildPathHelp").item(0);
            null != e && e.parentNode.removeChild(e)
        }
        function I(e, r) {
            var i = e.clientX / window.innerWidth * 2 - 1
              , n = -e.clientY / window.innerHeight * 2 + 1;
            l.set(i, n, 1),
            l.unproject(t),
            c.set(D, l.sub(D).normalize());
            var o = c.intersectObjects(r, !0);
            return !!o[0] && o[0]
        }
        e.addEventListener("mousedown", N, !1),
        e.addEventListener("touchstart", N, !1),
        e.addEventListener("mousemove", k, !1),
        e.addEventListener("touchmove", k, !1),
        e.addEventListener("mousemove", O, !1),
        e.addEventListener("touchmove", O, !1),
        e.addEventListener("mouseup", G, !1),
        e.addEventListener("mouseout", G, !1),
        e.addEventListener("touchend", G, !1),
        e.addEventListener("touchcancel", G, !1),
        e.addEventListener("touchleave", G, !1),
        this.attach = function(t) {
            r.object = t,
            this.gizmo.translate.hide(),
            this.gizmo.rotate.hide(),
            this.gizmo.scale.hide(),
            this.gizmo[n].show(),
            r.update()
        }
        ,
        this.detach = function(t) {
            r.object = void 0,
            this.axis = null,
            this.gizmo.translate.hide(),
            this.gizmo.rotate.hide(),
            this.gizmo.scale.hide()
        }
        ,
        this.setMode = function(t) {
            "scale" == (n = t || n) && (r.space = "local"),
            this.gizmo.translate.hide(),
            this.gizmo.rotate.hide(),
            this.gizmo.scale.hide(),
            this.gizmo[n].show(),
            this.update(),
            r.dispatchEvent(o)
        }
        ,
        this.setSnap = function(t) {
            r.snap = t
        }
        ,
        this.setSize = function(t) {
            r.size = t,
            this.update(),
            r.dispatchEvent(o)
        }
        ,
        this.setSpace = function(t) {
            r.space = t,
            this.update(),
            r.dispatchEvent(o)
        }
        ,
        this.update = function() {
            void 0 !== r.object && (r.object.updateMatrixWorld(),
            B.setFromMatrixPosition(r.object.matrixWorld),
            U.setFromRotationMatrix(g.extractRotation(r.object.matrixWorld)),
            t.updateMatrixWorld(),
            D.setFromMatrixPosition(t.matrixWorld),
            z.setFromRotationMatrix(g.extractRotation(t.matrixWorld)),
            f = B.distanceTo(D) / 6 * r.size,
            this.position.copy(B),
            this.scale.set(f, f, f),
            T.copy(D).sub(B).normalize(),
            "local" == r.space ? this.gizmo[n].update(U, T) : "world" == r.space && this.gizmo[n].update(new THREE.Euler, T),
            this.gizmo[n].highlight(r.axis))
        }
    }
    ,
    THREE.TransformControls.prototype = Object.create(THREE.Object3D.prototype),
    THREE.TransformControls.prototype.constructor = THREE.TransformControls
}(),
THREE.XHRLoader = function(t) {
    this.manager = void 0 !== t ? t : THREE.DefaultLoadingManager
}
,
THREE.XHRLoader.prototype = {
    constructor: THREE.XHRLoader,
    load: function(t, e, r, i) {
        var n = this
          , o = THREE.Cache.get(t);
        if (void 0 === o) {
            var a = new XMLHttpRequest;
            a.open("GET", t, !0),
            a.addEventListener("load", function(r) {
                THREE.Cache.add(t, this.response),
                e && e(this.response),
                n.manager.itemEnd(t)
            }, !1),
            void 0 !== r && a.addEventListener("progress", function(t) {
                r(t)
            }, !1),
            void 0 !== i && a.addEventListener("error", function(t) {
                i(t)
            }, !1),
            void 0 !== this.crossOrigin && (a.crossOrigin = this.crossOrigin),
            void 0 !== this.responseType && (a.responseType = this.responseType),
            a.send(null),
            n.manager.itemStart(t)
        } else
            e && e(o)
    },
    setResponseType: function(t) {
        this.responseType = t
    },
    setCrossOrigin: function(t) {
        this.crossOrigin = t
    }
};
