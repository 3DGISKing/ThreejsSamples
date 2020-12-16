
/*                                                                         */
/***************************************************************************/
var _$_6cd9 = ["multiplyScalar", "Vector3", "position", "previous", "original", "a", "mass", "invMass", "tmp", "tmp2", "addForce", "prototype", "copy", "add", "integrate", "subVectors", "set", "length", "sub", "w", "h", "push", "particles", "constraints", "index", "faces", "normal", "dot", "normalize", "b", "c", "y"];
var DAMPING = 0.03;
var DRAG = 1 - DAMPING;
var MASS = 0.1;
var restDistance = 20;
var xSegs = 10;
var ySegs = 10;
var clothFunction = plane(restDistance * xSegs, restDistance * ySegs);
var cloth = new Cloth(xSegs,ySegs);
var GRAVITY = 0;
var gravity = new THREE[_$_6cd9[1]](0,-GRAVITY,0)[_$_6cd9[0]](MASS);
var TIMESTEP = 18 / 1000;
var TIMESTEP_SQ = TIMESTEP * TIMESTEP;
var pins = [];
var position = [];
var wind = true;
var  positio = 2;
var windForce = new THREE[_$_6cd9[1]](0,0,0);
var tmpForce = new THREE[_$_6cd9[1]]();
var lastTime;
function plane(_0xD7EE, _0xD795) {
    return function(_0xD526, _0xD57F) {
        var _0xD68A = (_0xD526 - 0.5) * _0xD7EE;
        var _0xD6E3 = (_0xD57F - 0.1) * _0xD795;
        var _0xD73C = 0;
        return new THREE[_$_6cd9[1]](_0xD68A,_0xD6E3,_0xD73C)
    }
}
function Particle(_0xD68A, _0xD6E3, _0xD73C, _0xD631) {
    this[_$_6cd9[2]] = clothFunction(_0xD68A, _0xD6E3);
    this[_$_6cd9[3]] = clothFunction(_0xD68A, _0xD6E3);
    this[_$_6cd9[4]] = clothFunction(_0xD68A, _0xD6E3);
    this[_$_6cd9[5]] = new THREE[_$_6cd9[1]](0,0,0);
    this[_$_6cd9[6]] = _0xD631;
    this[_$_6cd9[7]] = 1 / _0xD631;
    this[_$_6cd9[8]] = new THREE[_$_6cd9[1]]();
    this[_$_6cd9[9]] = new THREE[_$_6cd9[1]]()
}
Particle[_$_6cd9[11]][_$_6cd9[10]] = function(_0xD2B7) {
    this[_$_6cd9[5]][_$_6cd9[13]](this[_$_6cd9[9]][_$_6cd9[12]](_0xD2B7)[_$_6cd9[0]](this[_$_6cd9[7]]))
}
;
Particle[_$_6cd9[11]][_$_6cd9[14]] = function(_0xD369) {
    var _0xD310 = this[_$_6cd9[8]][_$_6cd9[15]](this[_$_6cd9[2]], this[_$_6cd9[3]]);
    _0xD310[_$_6cd9[0]](DRAG)[_$_6cd9[13]](this[_$_6cd9[2]]);
    _0xD310[_$_6cd9[13]](this[_$_6cd9[5]][_$_6cd9[0]](_0xD369));
    this[_$_6cd9[8]] = this[_$_6cd9[3]];
    this[_$_6cd9[3]] = this[_$_6cd9[2]];
    this[_$_6cd9[2]] = _0xD310;
    this[_$_6cd9[5]][_$_6cd9[16]](0, 0, 0)
}
;
var diff = new THREE[_$_6cd9[1]]();
function satisfyConstraints(_0xD9AB, _0xDA04, _0xD952) {
    diff[_$_6cd9[15]](_0xDA04[_$_6cd9[2]], _0xD9AB[_$_6cd9[2]]);
    var _0xD8F9 = diff[_$_6cd9[17]]();
    if (_0xD8F9 === 0) {
        return
    }
    ;var _0xD847 = diff[_$_6cd9[0]](1 - _0xD952 / _0xD8F9);
    var _0xD8A0 = _0xD847[_$_6cd9[0]](0.5);
    _0xD9AB[_$_6cd9[2]][_$_6cd9[13]](_0xD8A0);
    _0xDA04[_$_6cd9[2]][_$_6cd9[18]](_0xD8A0)
}
function Cloth(_0xD5D8, _0xD41B) {
    _0xD5D8 = _0xD5D8 || 20;
    _0xD41B = _0xD41B || 20;
    this[_$_6cd9[19]] = _0xD5D8;
    this[_$_6cd9[20]] = _0xD41B;
    var _0xD4CD = [];
    var _0xD3C2 = [];
    var _0xD526, _0xD57F;
    for (_0xD57F = 0; _0xD57F <= _0xD41B; _0xD57F++) {
        for (_0xD526 = 0; _0xD526 <= _0xD5D8; _0xD526++) {
            _0xD4CD[_$_6cd9[21]](new Particle(_0xD526 / _0xD5D8,_0xD57F / _0xD41B,0,MASS))
        }
    }
    ;for (_0xD57F = 0; _0xD57F < _0xD41B; _0xD57F++) {
        for (_0xD526 = 0; _0xD526 < _0xD5D8; _0xD526++) {
            _0xD3C2[_$_6cd9[21]]([_0xD4CD[_0xD474(_0xD526, _0xD57F)], _0xD4CD[_0xD474(_0xD526, _0xD57F + 1)], restDistance]);
            _0xD3C2[_$_6cd9[21]]([_0xD4CD[_0xD474(_0xD526, _0xD57F)], _0xD4CD[_0xD474(_0xD526 + 1, _0xD57F)], restDistance])
        }
    }
    ;for (_0xD526 = _0xD5D8,
              _0xD57F = 0; _0xD57F < _0xD41B; _0xD57F++) {
        _0xD3C2[_$_6cd9[21]]([_0xD4CD[_0xD474(_0xD526, _0xD57F)], _0xD4CD[_0xD474(_0xD526, _0xD57F + 1)], restDistance])
    }
    ;for (_0xD57F = _0xD41B,
              _0xD526 = 0; _0xD526 < _0xD5D8; _0xD526++) {
        _0xD3C2[_$_6cd9[21]]([_0xD4CD[_0xD474(_0xD526, _0xD57F)], _0xD4CD[_0xD474(_0xD526 + 1, _0xD57F)], restDistance])
    }
    ;this[_$_6cd9[22]] = _0xD4CD;
    this[_$_6cd9[23]] = _0xD3C2;
    function _0xD474(_0xD526, _0xD57F) {
        return _0xD526 + _0xD57F * (_0xD5D8 + 1)
    }
    this[_$_6cd9[24]] = _0xD474
}
function simulate(_0xDD7E) {
    if (!lastTime) {
        lastTime = _0xDD7E;
        return
    }
    ;var _0xDB68, _0xDBC1, _0xD4CD, _0xDCCC, _0xDD25, _0xD3C2, _0xDA5D;
    if (wind) {
        var _0xDAB6, _0xDB0F = clothGeometry[_$_6cd9[25]], _0xDC1A;
        _0xD4CD = cloth[_$_6cd9[22]];
        for (_0xDB68 = 0,
                 _0xDBC1 = _0xDB0F[_$_6cd9[17]]; _0xDB68 < _0xDBC1; _0xDB68++) {
            _0xDAB6 = _0xDB0F[_0xDB68];
            _0xDC1A = _0xDAB6[_$_6cd9[26]];
            tmpForce[_$_6cd9[12]](_0xDC1A)[_$_6cd9[28]]()[_$_6cd9[0]](_0xDC1A[_$_6cd9[27]](windForce));
            _0xD4CD[_0xDAB6[_$_6cd9[5]]][_$_6cd9[10]](tmpForce);
            _0xD4CD[_0xDAB6[_$_6cd9[29]]][_$_6cd9[10]](tmpForce);
            _0xD4CD[_0xDAB6[_$_6cd9[30]]][_$_6cd9[10]](tmpForce)
        }
    }
    ;for (_0xD4CD = cloth[_$_6cd9[22]],
              _0xDB68 = 0,
              _0xDBC1 = _0xD4CD[_$_6cd9[17]]; _0xDB68 < _0xDBC1; _0xDB68++) {
        _0xDCCC = _0xD4CD[_0xDB68];
        _0xDCCC[_$_6cd9[10]](gravity);
        _0xDCCC[_$_6cd9[14]](TIMESTEP_SQ)
    }
    ;_0xD3C2 = cloth[_$_6cd9[23]];
    _0xDBC1 = _0xD3C2[_$_6cd9[17]];
    for (_0xDB68 = 0; _0xDB68 < _0xDBC1; _0xDB68++) {
        _0xDA5D = _0xD3C2[_0xDB68];
        satisfyConstraints(_0xDA5D[0], _0xDA5D[1], _0xDA5D[2])
    }
    ;for (_0xD4CD = cloth[_$_6cd9[22]],
              _0xDB68 = 0,
              _0xDBC1 = _0xD4CD[_$_6cd9[17]]; _0xDB68 < _0xDBC1; _0xDB68++) {
        _0xDCCC = _0xD4CD[_0xDB68];
        pos = _0xDCCC[_$_6cd9[2]];
        if (pos[_$_6cd9[31]] < -550) {
            pos[_$_6cd9[31]] = -550
        }
    }
    /*

    ;for (_0xDB68 = 0,
              _0xDBC1 = pins[_$_6cd9[17]]; _0xDB68 < _0xDBC1; _0xDB68++) {
        var _0xDDD7 = pins[_0xDB68];
        var _0xDC73 = _0xD4CD[_0xDDD7];
        _0xDC73[_$_6cd9[2]][_$_6cd9[12]](position[_0xDB68]);
        _0xDC73[_$_6cd9[3]][_$_6cd9[12]](position[_0xDB68])
    }
    */
}
