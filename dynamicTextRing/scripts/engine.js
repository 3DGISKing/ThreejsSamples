function scaleDiameterManualConnector(e, t, i, a, s) {
    for (var o = 0; o < e.length; o++)
        if ("manual" == i[o].split(" ")[0]) {
            var r = e[o];
            if ("scalar" == t[o].type) {
                var n = r
                    , h = new THREE.Vector3(n.position.x,n.position.y,n.position.z)
                    , c = (new THREE.Vector3(n.rotation.x,n.rotation.y,n.rotation.z),
                (a - s) / 2)
                    , l = h.x
                    , m = h.y
                    , g = h.z
                    , p = Math.sqrt(Math.pow(l, 2) + Math.pow(m, 2))
                    , d = Math.atan(Math.abs(l / m));
                0 == m && (d = Math.PI / 2),
                    d = l >= 0 && m >= 0 ? d : l >= 0 && m < 0 ? Math.PI - d : l < 0 && m < 0 ? Math.PI + d : 2 * Math.PI - d;
                var y = (v = p + c) * Math.sin(d)
                    , T = v * Math.cos(d);
                n.position.set(y, T, g)
            } else
                for (var u = 0; u < r.length; u++) {
                    n = r[u],
                        h = new THREE.Vector3(n.position.x,n.position.y,n.position.z),
                        new THREE.Vector3(n.rotation.x,n.rotation.y,n.rotation.z),
                        c = (a - s) / 2,
                        l = h.x,
                        m = h.y,
                        g = h.z,
                        p = Math.sqrt(Math.pow(l, 2) + Math.pow(m, 2)),
                        d = Math.atan(Math.abs(l / m));
                    0 == m && (d = Math.PI / 2),
                        d = l >= 0 && m >= 0 ? d : l >= 0 && m < 0 ? Math.PI - d : l < 0 && m < 0 ? Math.PI + d : 2 * Math.PI - d;
                    var v;
                    y = (v = p + c) * Math.sin(d),
                        T = v * Math.cos(d);
                    n.position.set(y, T, g)
                }
        }
}

window.ThreeBSP = function() {
    var a;
    return (a = function(b) {
        var c, d, e, f, g, h, i, j = [];
        if (b instanceof THREE.Geometry) this.matrix = new THREE.Matrix4(); else {
            if (!(b instanceof THREE.Mesh)) {
                if (b instanceof a.Node) return this.tree = b, this.matrix = new THREE.Matrix4(),
                    this;
                throw "ThreeBSP: Given geometry is unsupported";
            }
            b.updateMatrix(), this.matrix = b.matrix.clone(), b = b.geometry;
        }
        for (c = 0, d = b.faces.length; c < d; c++) e = b.faces[c], g = b.faceVertexUvs[0][c],
            i = new a.Polygon(), e instanceof THREE.Face3 ? (f = b.vertices[e.a], h = g ? new THREE.Vector2(g[0].x, g[0].y) : null,
            (f = new a.Vertex(f.x, f.y, f.z, e.vertexNormals[0], h)).applyMatrix4(this.matrix),
            i.vertices.push(f), f = b.vertices[e.b], h = g ? new THREE.Vector2(g[1].x, g[1].y) : null,
            (f = new a.Vertex(f.x, f.y, f.z, e.vertexNormals[1], h)).applyMatrix4(this.matrix),
            i.vertices.push(f), f = b.vertices[e.c], h = g ? new THREE.Vector2(g[2].x, g[2].y) : null,
            (f = new a.Vertex(f.x, f.y, f.z, e.vertexNormals[2], h)).applyMatrix4(this.matrix),
            i.vertices.push(f)) : (THREE.Face4, f = b.vertices[e.a], h = g ? new THREE.Vector2(g[0].x, g[0].y) : null,
            (f = new a.Vertex(f.x, f.y, f.z, e.vertexNormals[0], h)).applyMatrix4(this.matrix),
            i.vertices.push(f), f = b.vertices[e.b], h = g ? new THREE.Vector2(g[1].x, g[1].y) : null,
            (f = new a.Vertex(f.x, f.y, f.z, e.vertexNormals[1], h)).applyMatrix4(this.matrix),
            i.vertices.push(f), f = b.vertices[e.c], h = g ? new THREE.Vector2(g[2].x, g[2].y) : null,
            (f = new a.Vertex(f.x, f.y, f.z, e.vertexNormals[2], h)).applyMatrix4(this.matrix),
            i.vertices.push(f), f = b.vertices[e.d], h = g ? new THREE.Vector2(g[3].x, g[3].y) : null,
            (f = new a.Vertex(f.x, f.y, f.z, e.vertexNormals[3], h)).applyMatrix4(this.matrix),
            i.vertices.push(f)), i.calculateProperties(), j.push(i);
        this.tree = new a.Node(j);
    }).prototype.subtract = function(b) {
        var c = this.tree.clone(), d = b.tree.clone();
        return c.invert(), c.clipTo(d), d.clipTo(c), d.invert(), d.clipTo(c), d.invert(),
            c.build(d.allPolygons()), c.invert(), (c = new a(c)).matrix = this.matrix, c;
    }, a.prototype.union = function(b) {
        var c = this.tree.clone(), d = b.tree.clone();
        return c.clipTo(d), d.clipTo(c), d.invert(), d.clipTo(c), d.invert(), c.build(d.allPolygons()),
            (c = new a(c)).matrix = this.matrix, c;
    }, a.prototype.intersect = function(b) {
        var c = this.tree.clone(), d = b.tree.clone();
        return c.invert(), d.clipTo(c), d.invert(), c.clipTo(d), d.clipTo(c), c.build(d.allPolygons()),
            c.invert(), (c = new a(c)).matrix = this.matrix, c;
    }, a.prototype.toGeometry = function() {
        var a, b, c, d, e, f, g, h, i, j, k = new THREE.Matrix4().getInverse(this.matrix), l = new THREE.Geometry(), m = this.tree.allPolygons(), n = m.length, o = {};
        for (a = 0; a < n; a++) for (d = (c = m[a]).vertices.length, b = 2; b < d; b++) j = [],
            h = c.vertices[0], j.push(new THREE.Vector2(h.uv.x, h.uv.y)), (h = new THREE.Vector3(h.x, h.y, h.z)).applyMatrix4(k),
            void 0 !== o[h.x + "," + h.y + "," + h.z] ? e = o[h.x + "," + h.y + "," + h.z] : (l.vertices.push(h),
                e = o[h.x + "," + h.y + "," + h.z] = l.vertices.length - 1), h = c.vertices[b - 1],
            j.push(new THREE.Vector2(h.uv.x, h.uv.y)), (h = new THREE.Vector3(h.x, h.y, h.z)).applyMatrix4(k),
            void 0 !== o[h.x + "," + h.y + "," + h.z] ? f = o[h.x + "," + h.y + "," + h.z] : (l.vertices.push(h),
                f = o[h.x + "," + h.y + "," + h.z] = l.vertices.length - 1), h = c.vertices[b],
            j.push(new THREE.Vector2(h.uv.x, h.uv.y)), (h = new THREE.Vector3(h.x, h.y, h.z)).applyMatrix4(k),
            void 0 !== o[h.x + "," + h.y + "," + h.z] ? g = o[h.x + "," + h.y + "," + h.z] : (l.vertices.push(h),
                g = o[h.x + "," + h.y + "," + h.z] = l.vertices.length - 1), i = new THREE.Face3(e, f, g, new THREE.Vector3(c.normal.x, c.normal.y, c.normal.z)),
            l.faces.push(i), l.faceVertexUvs[0].push(j);
        return l;
    }, a.prototype.toMesh = function(a) {
        var b = this.toGeometry(), c = new THREE.Mesh(b, a);
        return c.position.setFromMatrixPosition(this.matrix), c.rotation.setFromRotationMatrix(this.matrix),
            c;
    }, a.Polygon = function(a, b, c) {
        a instanceof Array || (a = []), this.vertices = a, a.length > 0 ? this.calculateProperties() : this.normal = this.w = void 0;
    }, a.Polygon.prototype.calculateProperties = function() {
        var a = this.vertices[0], b = this.vertices[1], c = this.vertices[2];
        return this.normal = b.clone().subtract(a).cross(c.clone().subtract(a)).normalize(),
            this.w = this.normal.clone().dot(a), this;
    }, a.Polygon.prototype.clone = function() {
        var b, c, d = new a.Polygon();
        for (b = 0, c = this.vertices.length; b < c; b++) d.vertices.push(this.vertices[b].clone());
        return d.calculateProperties(), d;
    }, a.Polygon.prototype.flip = function() {
        var a, b = [];
        for (this.normal.multiplyScalar(-1), this.w *= -1, a = this.vertices.length - 1; a >= 0; a--) b.push(this.vertices[a]);
        return this.vertices = b, this;
    }, a.Polygon.prototype.classifyVertex = function(a) {
        var b = this.normal.dot(a) - this.w;
        return b < -1e-5 ? 2 : b > 1e-5 ? 1 : 0;
    }, a.Polygon.prototype.classifySide = function(a) {
        var b, c, d, e = 0, f = 0, g = a.vertices.length;
        for (b = 0; b < g; b++) c = a.vertices[b], 1 === (d = this.classifyVertex(c)) ? e++ : 2 === d && f++;
        return e > 0 && 0 === f ? 1 : 0 === e && f > 0 ? 2 : 0 === e && 0 === f ? 0 : 3;
    }, a.Polygon.prototype.splitPolygon = function(b, c, d, e, f) {
        var g = this.classifySide(b);
        if (0 === g) (this.normal.dot(b.normal) > 0 ? c : d).push(b); else if (1 === g) e.push(b); else if (2 === g) f.push(b); else {
            var h, i, j, k, l, m, n, o, p, q = [], r = [];
            for (i = 0, h = b.vertices.length; i < h; i++) j = (i + 1) % h, m = b.vertices[i],
                n = b.vertices[j], k = this.classifyVertex(m), l = this.classifyVertex(n), 2 != k && q.push(m),
            1 != k && r.push(m), 3 == (k | l) && (o = (this.w - this.normal.dot(m)) / this.normal.dot(n.clone().subtract(m)),
                p = m.interpolate(n, o), q.push(p), r.push(p));
            q.length >= 3 && e.push(new a.Polygon(q).calculateProperties()), r.length >= 3 && f.push(new a.Polygon(r).calculateProperties());
        }
    }, a.Vertex = function(a, b, c, d, e) {
        this.x = a, this.y = b, this.z = c, this.normal = d || new THREE.Vector3(), this.uv = e || new THREE.Vector2();
    }, a.Vertex.prototype.clone = function() {
        return new a.Vertex(this.x, this.y, this.z, this.normal.clone(), this.uv.clone());
    }, a.Vertex.prototype.add = function(a) {
        return this.x += a.x, this.y += a.y, this.z += a.z, this;
    }, a.Vertex.prototype.subtract = function(a) {
        return this.x -= a.x, this.y -= a.y, this.z -= a.z, this;
    }, a.Vertex.prototype.multiplyScalar = function(a) {
        return this.x *= a, this.y *= a, this.z *= a, this;
    }, a.Vertex.prototype.cross = function(a) {
        var b = this.x, c = this.y, d = this.z;
        return this.x = c * a.z - d * a.y, this.y = d * a.x - b * a.z, this.z = b * a.y - c * a.x,
            this;
    }, a.Vertex.prototype.normalize = function() {
        var a = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        return this.x /= a, this.y /= a, this.z /= a, this;
    }, a.Vertex.prototype.dot = function(a) {
        return this.x * a.x + this.y * a.y + this.z * a.z;
    }, a.Vertex.prototype.lerp = function(a, b) {
        return this.add(a.clone().subtract(this).multiplyScalar(b)), this.normal.add(a.normal.clone().sub(this.normal).multiplyScalar(b)),
            this.uv.add(a.uv.clone().sub(this.uv).multiplyScalar(b)), this;
    }, a.Vertex.prototype.interpolate = function(a, b) {
        return this.clone().lerp(a, b);
    }, a.Vertex.prototype.applyMatrix4 = function(a) {
        var b = this.x, c = this.y, d = this.z, e = a.elements;
        return this.x = e[0] * b + e[4] * c + e[8] * d + e[12], this.y = e[1] * b + e[5] * c + e[9] * d + e[13],
            this.z = e[2] * b + e[6] * c + e[10] * d + e[14], this;
    }, a.Node = function(b) {
        var c, d, e = [], f = [];
        if (this.polygons = [], this.front = this.back = void 0, b instanceof Array && 0 !== b.length) {
            for (this.divider = b[0].clone(), c = 0, d = b.length; c < d; c++) this.divider.splitPolygon(b[c], this.polygons, this.polygons, e, f);
            e.length > 0 && (this.front = new a.Node(e)), f.length > 0 && (this.back = new a.Node(f));
        }
    }, a.Node.isConvex = function(a) {
        var b, c;
        for (b = 0; b < a.length; b++) for (c = 0; c < a.length; c++) if (b !== c && 2 !== a[b].classifySide(a[c])) return !1;
        return !0;
    }, a.Node.prototype.build = function(b) {
        var c, d, e = [], f = [];
        for (this.divider || (this.divider = b[0].clone()), c = 0, d = b.length; c < d; c++) this.divider.splitPolygon(b[c], this.polygons, this.polygons, e, f);
        e.length > 0 && (this.front || (this.front = new a.Node()), this.front.build(e)),
        f.length > 0 && (this.back || (this.back = new a.Node()), this.back.build(f));
    }, a.Node.prototype.allPolygons = function() {
        var a = this.polygons.slice();
        return this.front && (a = a.concat(this.front.allPolygons())), this.back && (a = a.concat(this.back.allPolygons())),
            a;
    }, a.Node.prototype.clone = function() {
        var b = new a.Node();
        return b.divider = this.divider.clone(), b.polygons = this.polygons.map(function(a) {
            return a.clone();
        }), b.front = this.front && this.front.clone(), b.back = this.back && this.back.clone(),
            b;
    }, a.Node.prototype.invert = function() {
        var a, b, c;
        for (a = 0, b = this.polygons.length; a < b; a++) this.polygons[a].flip();
        return this.divider.flip(), this.front && this.front.invert(), this.back && this.back.invert(),
            c = this.front, this.front = this.back, this.back = c, this;
    }, a.Node.prototype.clipPolygons = function(a) {
        var b, c, d, e;
        if (!this.divider) return a.slice();
        for (d = [], e = [], b = 0, c = a.length; b < c; b++) this.divider.splitPolygon(a[b], d, e, d, e);
        return this.front && (d = this.front.clipPolygons(d)), e = this.back ? this.back.clipPolygons(e) : [],
            d.concat(e);
    }, a.Node.prototype.clipTo = function(a) {
        this.polygons = a.clipPolygons(this.polygons), this.front && this.front.clipTo(a),
        this.back && this.back.clipTo(a);
    }, a;
}();

THREE.RingIdCount = 0;

THREE.Neck = function() {
    this.id = THREE.RingIdCount++, this.uuid = THREE.Math.generateUUID(), this.name = "base neck",
        this.path = null, this.pathType = "2D", this.geometry = null, this.resolution = 1 == platformMobile ? "low" : globalResolution,
        this.editName = [], this.editMarker = [], this.editOptions = [], this.editSelected = [],
        this.asmName = [], this.asmMarker = [], this.asmOptions = [], this.asmSelected = [],
        this.asmObject = [], this.position = [], this.rotation = [], this.scale = [], this.position.push(new THREE.Vector3(0, 0, 0)),
        this.rotation.push(new THREE.Vector3(0, 0, 0)), this.scale.push(new THREE.Vector3(1, 1, 1)),
        this.neckSlope = !1, this.fontLang = "english", this.font = "optimer", this.fontWeight = "normal";
};

THREE.Neck.prototype = {
    constructor: THREE.Neck,
    clone: function() {
        var a = new THREE.Neck();
        a.name = this.name, a.id = THREE.RingIdCount++, a.geometry = this.geometry.clone();
        for (var b = 0; b < this.editName.length; b++) a.editName[b] = this.editName[b],
            a.editMarker[b] = this.editMarker[b].clone(), a.editOptions[b] = this.editOptions[b],
            a.editSelected[b] = this.editSelected[b];
        for (b = 0; b < this.asmName.length; b++) a.asmName[b] = this.asmName[b], a.asmMarker[b] = this.asmMarker[b].clone();
        return a;
    }
};

THREE.EventDispatcher.prototype.apply(THREE.Neck.prototype);

THREE.TextNeck = function(a, b) {
    THREE.Neck.call(this), this.name = "Text necklace", this.editName.push("text change"),
        this.editOptions.push([ 0, 1 ]), this.editSelected.push(0), this.editMarker.push(new THREE.Geometry()),
        this.editName.push("text size"), this.editOptions.push([ 8, 10, 12, 14, 16, 20, 25, 30, 2, 4, 6 ]),
        this.editSelected.push(0), this.editMarker.push(new THREE.Geometry()), this.editName.push("text height"),
        this.editOptions.push([ 1, 1.1, 1.2, 1.3, 1.4, 1.5 ]), this.editSelected.push(0),
        this.editMarker.push(new THREE.Geometry()), this.editName.push("letters connectors"),
        this.editOptions.push([ "yes", "no" ]), this.editSelected.push(0), this.editMarker.push(new THREE.Geometry()),
        this.editName.push("attach letters"), this.editOptions.push([ "no", "yes" ]), this.editSelected.push(1),
        this.editMarker.push(new THREE.Geometry()), this.editName.push("limit length"),
        this.editOptions.push([ "no", "yes" ]), this.editSelected.push(0), this.editMarker.push(new THREE.Geometry()),
        this.asmInfo = [], this.asmName.push("bail right"), this.asmMarker.push(new THREE.Geometry()),
        this.asmOptions.push({
            path: null,
            position: new THREE.Vector3(0, 0, 0),
            scale: new THREE.Vector3(1, 1, 1)
        }), this.asmSelected.push(!1), this.asmObject.push(-1), this.asmInfo.push({
        fix_position: new THREE.Vector3(1, 1, 0),
        type: "scalar"
    }), this.asmName.push("bail left"), this.asmMarker.push(new THREE.Geometry()), this.asmOptions.push({
        path: null,
        position: new THREE.Vector3(1, 0, 0),
        scale: new THREE.Vector3(1, 1, 1)
    }), this.asmSelected.push(!1), this.asmObject.push(-1), this.asmInfo.push({
        fix_position: new THREE.Vector3(1, 1, 0),
        type: "scalar"
    }), this.asmName.push("back"), this.asmMarker.push(new THREE.Geometry()), this.asmOptions.push({
        path: null,
        pathOut: !0,
        position: new THREE.Vector3(0, 0, 0),
        rotation: new THREE.Vector3(0, 0, 0),
        scale: new THREE.Vector3(1, 1, 1)
    }), this.asmSelected.push(!1), this.asmObject.push(-1), this.asmInfo.push({
        fix_position: new THREE.Vector3(0, 0, 0),
        type: "scalar"
    }), this.shape = "flat", this.text = "WG", this.font = "optimer", this.fontWeight = "normal",
        this.fontStyle = "normal", this.lastTextSelected = 0, this.textHint = 0, this.neckR = a = a || defaultNeckR,
        this.circleRadius = 4, this.connect = !0, this.forceGrid = !1, this.forceNoConnect = !1,
        this.bevelEnabled = !0, this.unionLetters = !1, this.forceTextPaths = !1, this.scaleY = !0,
        this.pathType = "2D", this.shapeExtPath = [], this.shapeHolePath = [], (b = b || !1) || this.buildGeometry();
};

THREE.TextNeck.prototype = {
    constructor: THREE.Neck.prototype,
    clone: function () {
        var a = new THREE.TextNeck(this.neckR);
        a.name = this.name, a.id = THREE.RingIdCount++, a.geometry = this.geometry.clone(),
            a.path = this.path, a.shape = this.shape;
        for (var b = 0; b < this.editName.length; b++) a.editName[b] = this.editName[b],
            a.editMarker[b] = this.editMarker[b].clone(), a.editOptions[b] = this.editOptions[b],
            a.editSelected[b] = this.editSelected[b];
        for (b = 0; b < this.asmName.length; b++) a.asmName[b] = this.asmName[b], a.asmMarker[b] = this.asmMarker[b].clone();
        return a;
    },
    buildGeometry: function () {
        this.lastTextSelected != this.editSelected[0] ? (addText(), this.path = null, this.extPath = [],
            this.holePath = []) : this.updateGeometry(this.text);
    },
    updateGeometry: function (a) {
        this.shapeName = this.name, this.text = a = a || "WG", this.editSelected[5] && (this.text = this.text.slice(0, Math.min(10, this.text.length))),
            this.lastTextSelected = this.editSelected[0];
        this.neckR;
        var b = this.editSelected[4];
        this.connect = !this.editSelected[3] && !b;
        var c = 10 * this.editOptions[2][this.editSelected[2]], d = null != this.bevelSize ? this.bevelSize : c / 4, e = this.text, f = 10 * this.editOptions[1][this.editSelected[1]], g = Math.ceil(f / 10), h = c - (this.bevelEnabled ? 2 * d : 0), i = Math.max(3, Math.ceil(this.forceGrid ? .5 * g : "high" == this.resolution ? g : "med" == this.resolution ? .7 * g : .4 * g)), j = this.forceGrid || 0 == this.bevelEnabled ? 2 : d, k = this.forceGrid || 0 == this.bevelEnabled ? 0 : d, l = 0 == this.bevelEnabled ? 3 : Math.ceil(j), m = this.bevelEnabled, n = {
            size: f,
            amount: h,
            curveSegments: i,
            font: this.font,
            weight: this.fontWeight,
            style: this.fontStyle,
            bevelThickness: j,
            bevelSize: k,
            bevelSegments: l,
            bevelEnabled: m
        }, o = new THREE.FontUtils.generateShapes(e, n);
        this.shapePath = o[0], this.shapeExtPath = o.slice(1, o.length), this.shapeHolePath = [];

        for (var p = 0; p < o.length; p++)
            for (var q = o[p], r = 0; r < q.holes.length; r++)
                this.shapeHolePath.push(q.holes[r]);

        if (null != this.path && (this.shapePath = this.path, this.shapeExtPath = this.extPath,
                this.shapeHolePath = this.holePath), null != this.path || this.forceTextPaths)
            o = genTextShapesFromPaths(this.shapePath, this.shapeExtPath, this.shapeHolePath);

        (t = new THREE.ExtrudeGeometry(o, n)).computeBoundingBox();

        var s = (F = t.boundingBox).size();
        (_b = new THREE.Mesh(t)).position.x -= (F.max.x + F.min.x) / 2, _b.position.y -= (F.max.y + F.min.y) / 2,
            _b.position.z = _b.position.z - (F.max.z + F.min.z) / 2;
        var t = new THREE.Geometry();
        THREE.GeometryUtils.merge(t, _b);
        var u = 1 == this.scaleY ? f / s.y : 1;
        F.max.y, F.min.y;
        (_b = new THREE.Mesh(t)).scale.x = _b.scale.y = u;
        t = new THREE.Geometry();
        THREE.GeometryUtils.merge(t, _b);
        var v = this.circleRadius;
        if (new THREE.Shape().absarc(0, 0, v, 0, 2 * Math.PI), "rope2" == this.shape) ; else if ("rope3" == this.shape) ; else ;
        var w = null, x = [], y = new THREE.Geometry(), z = (new THREE.Geometry(), Math.max(10, f / 12)), A = genRingSectionShape(z, 8, "court"), B = connShiftX = z / 2, C = 0;
        this.shiftLetters = [];
        for (var D = 0; D < o.length; D++) {
            var E = o[D];
            if ("flat" == this.shape) {
                (G = new THREE.ExtrudeGeometry(E, n)).computeBoundingBox();
                var F = G.boundingBox;
                (zb = new THREE.Mesh(G)).scale.x = zb.scale.y = u, zb.position.z -= (F.max.z + F.min.z) / 2;
                var G = new THREE.Geometry();
                THREE.GeometryUtils.merge(G, zb), G.mergeVertices(), G.computeBoundingBox();
                var H = G.boundingBox, I = H.size();
                if (this.forceGrid) {
                    var J = "high" == this.resolution ? (this.forceTextPaths && this.path, I.x / 2) : "med" == this.resolution ? I.x / 6 : I.x / 12, K = "high" == this.resolution ? (this.forceTextPaths && this.path,
                    I.y / 2) : "med" == this.resolution ? I.y / 6 : I.y / 12, L = new THREE.CubeGeometry(I.x + 2, I.y + 2, .05, Math.ceil(J), Math.ceil(K), 1), M = new THREE.Mesh(L);
                    M.position.x += (H.max.x + H.min.x) / 2, M.position.y += (H.max.y + H.min.y) / 2,
                        M.position.z = H.max.z;
                    var N = new ThreeBSP(M), O = (O = new ThreeBSP(G)).subtract(N);
                    M.position.z = H.min.z;
                    N = new ThreeBSP(M);
                    (G = (O = O.subtract(N)).toGeometry()).mergeVertices();
                }
            } else if ("sphere" == this.shape) {
                var P = h / 2, Q = new THREE.Spheres(defaultNeckR, !0);
                Q.path = E, Q.editOptions[0] = [P - 2], Q.editSelected[0] = 0, Q.resolution = "med",
                    Q.buildGeometry();
                G = Q.geometry;
            } else if ("path" == this.shape) {
                (R = new THREE.PathObj(10 * h / 2)).path = E, R.resolution = this.resolution, R.buildGeometry();
                G = R.geometry;
            } else if ("filigree" == this.shape) {
                var R = new THREE.FiligreePath(defaultNeckR, !0), S = [this.shapePath];
                if (this.shapeExtPath.length > 0) S = S.concat(this.shapeExtPath);
                R.path = E, R.extPath = [], R.embossPath = S, R.resolution = "ultra-high", R.buildGeometry();
                G = R.geometry;
            } else if ("rope2" == this.shape || "rope3" == this.shape) {
                var T = new THREE.Rope(this.neckR, !0);
                T.path = E, T.shape = this.shape, T.resolution = this.resolution, T.buildGeometry();
                G = T.geometry;
            }
            G.computeBoundingBox();
            s = (F = G.boundingBox).size();
            var U = (F.min.x + F.max.x) / 2, V = (F.min.y + F.max.y) / 2, W = new THREE.Matrix4();
            W.makeScale(u, u, 1);
            var X = shapeApplyMatrix(E, W), Y = X.getLength(), Z = X.getSpacedPoints(Math.ceil(Y)), $ = -5e3, _ = 0, ab = 5e3, bb = 0, cb = -5e3, db = 0, eb = 5e3, fb = -5e3, gb = 5e3, hb = -5e3, ib = -5e3, jb = 0, kb = 0, lb = 5e3, mb = -5e3;
            for (p = 0; p < Z.length; p++) {
                var nb = Z[p].x, ob = Z[p].y;
                nb >= $ && ($ = nb, _ = ob), nb <= ab && (ab = nb, bb = ob), ob <= eb && (eb = ob,
                    nb), ob >= cb && (cb = ob, db = nb), Math.abs(nb - U) < 2 && ob >= fb && (fb = ob),
                Math.abs(nb - U) < 2 && ob <= gb && (gb = ob), Math.abs(ob - V) < 2 && nb >= mb && (mb = nb),
                ob >= hb && nb < U - s.x / 4 && (hb = ob, jb = nb), ob >= ib && nb > U + s.x / 4 && (ib = ob,
                    kb = nb), null != w && Math.abs(ob - Fb) < 3 && nb < lb && (lb = nb);
            }
            if (0 == D) new THREE.Vector2(jb, hb), new THREE.Vector2(kb, ib), new THREE.Vector2(db, cb);
            if (1 == D && w > U && cb > Gb) new THREE.Vector2(jb, hb), new THREE.Vector2(kb, ib),
                new THREE.Vector2(db, cb);
            if (D == o.length - 2) new THREE.Vector2(jb, hb), new THREE.Vector2(kb, ib), new THREE.Vector2(db, cb);
            if (D == o.length - 1 && (w < U || w > U && cb > Gb)) new THREE.Vector2(jb, hb),
                new THREE.Vector2(kb, ib), new THREE.Vector2(db, cb);
            for (var pb = !1, qb = 2; qb < s.y / 10 && 0 == pb; qb += s.y / 40) for (p = 0; p < Z.length; p++) {
                nb = Z[p].x, ob = Z[p].y;
                null != w && Math.abs(ob - Fb) < qb && nb < lb && (lb = nb, pb = !0);
            }
            pb = !1;
            var rb = 5e3;
            for (qb = 2; qb < s.y / 10 && 0 == pb; qb += s.y / 40) for (p = 0; p < Z.length; p++) {
                nb = Z[p].x, ob = Z[p].y;
                null != w && Math.abs(ob - Ib) < qb && nb < rb && (rb = nb, pb = !0);
            }
            var sb = !1, tb = -5e3;
            for (qb = 2; qb <= 12 && 0 == sb; qb += 2) for (p = 0; p < x.length; p++) {
                nb = x[p].x, ob = x[p].y;
                null != w && Math.abs(ob - bb) < qb && nb > tb && (tb = nb, sb = !0);
            }
            var ub = !1, vb = !1, wb = !1, xb = !1;
            for (p = 0; p < Z.length; p++) {
                nb = Z[p].x, ob = Z[p].y;
                nb > $ - 3 && (ob > _ + 3 && (ub = !0), ob < _ - 3 && (vb = !0)), nb < ab + 3 && (ob > bb + 3 && (wb = !0),
                ob < bb - 3 && (xb = !0));
            }
            if (null != w) {
                var yb = Math.max(2, f / 10);
                if (b && null == this.path) {
                    var zb;
                    w > U && (Gb < cb || Gb > cb) ? C = C : (shiftLetters1 = lb < 1e3 ? Math.max(0, lb - w + (this.forceGrid || 0 == this.bevelEnabled ? yb : 1)) : 5e3,
                        shiftLettersMid = Kb < 1e3 && rb < 1e3 ? Math.max(0, rb - Kb + (this.forceGrid || 0 == this.bevelEnabled ? yb : 1)) : 5e3,
                        shiftLetters2 = tb > -1e3 ? Math.max(0, ab - tb + (this.forceGrid || 0 == this.bevelEnabled ? yb : 1)) : 5e3,
                    (shiftLetters1 < 5e3 || shiftLettersMid < 5e3 || shiftLetters2 < 5e3) && (C += Math.min(shiftLetters1, shiftLettersMid, shiftLetters2))),
                        (zb = new THREE.Mesh(G)).position.x = -C;
                    G = new THREE.Geometry();
                    THREE.GeometryUtils.merge(G, zb);
                }
            }
            if (null == this.shiftLetters && (this.shiftLetters = []), this.shiftLetters.push(C),
                    this.unionLetters) if (0 == D) var Ab = new ThreeBSP(G); else {
                var Bb = new ThreeBSP(G);
                Ab = Ab.union(Bb);
            } else THREE.GeometryUtils.merge(y, G);
            if (null != w) {
                var Cb = !1;
                if (w > U && (Gb < cb || Gb > cb) && null == this.path) {
                    if (Gb < cb) var Db = new THREE.Vector3(U, gb + B, 0), Eb = new THREE.Vector3(Hb - connShiftX, Gb - B, 0); else {
                        Db = new THREE.Vector3(U, fb - B, 0), Eb = new THREE.Vector3(Hb - connShiftX, Gb - B, 0);
                        if (Jb > cb) {
                            w = $;
                            var Fb = _, Gb = cb, Hb = db, Ib = V, Jb = eb, Kb = mb, Lb = ub, Mb = vb;
                            x = Z;
                        }
                    }
                    Cb = !0;
                } else {
                    var Nb = 1 == wb ? B : 1 == xb ? -B : 0, Ob = 1 == Lb ? B : 1 == Mb ? -B : Fb > Gb - B ? -B : Fb < Jb + B ? B : 0;
                    Db = new THREE.Vector3(ab + connShiftX, bb + Nb, 0), Eb = new THREE.Vector3(w - connShiftX, Fb + Ob, 0),
                        w = $, Fb = _, Gb = cb, Hb = db, Ib = V, Jb = eb, Kb = mb, Lb = ub, Mb = vb, x = Z;
                }
                var Pb = new THREE.CurvePath(), Qb = new THREE.Vector3((Db.x + Eb.x) / 2, (Db.y + Eb.y) / 2, 0);
                Math.abs(Db.x - Eb.x) < 10 || Math.abs(Db.y - Eb.y) < 10 ? Pb.add(new THREE.LineCurve3(Db, Eb)) : (Pb.add(new THREE.QuadraticBezierCurve3(Db, new THREE.Vector3(Qb.x, Db.y, 0), Qb)),
                    Pb.add(new THREE.QuadraticBezierCurve3(Qb, new THREE.Vector3(Qb.x, Eb.y, 0), Eb)));
                var Rb = {
                    amount: 1
                };
                Rb.extrudePath = Pb, Rb.bevelEnabled = !1, Rb.steps = Math.ceil(Pb.getLength() / 2);
                var Sb = new THREE.ExtrudeGeometry(A, Rb), Tb = new THREE.Mesh(Sb);
                Tb.position.z = (8 - c) / 2, b && (Tb.position.x = -C), (this.connect || Cb) && 0 == this.forceNoConnect && THREE.GeometryUtils.merge(y, Tb);
            } else w = $, Fb = _, Hb = db, Gb = cb, Jb = eb, Ib = V, Kb = mb, x = Z;
        }
        this.unionLetters && o.length > 0 && THREE.GeometryUtils.merge(y, Ab.toGeometry()),
            y.computeBoundingBox();
        var Ub = getShapeBails(y, 1), Vb = Ub.left, Wb = Ub.right, Xb = Ub.center, Yb = (F = y.boundingBox,
            new THREE.Mesh(y)), Zb = -(F.max.x + F.min.x) / 2, $b = -(F.max.y + F.min.y) / 2;
        Yb.position.x = Zb, Yb.position.y = $b, Yb.position.z -= (F.max.z + F.min.z) / 2;
        y = new THREE.Geometry();
        THREE.GeometryUtils.merge(y, Yb), y.verticesNeedUpdate = !0, y.mergeVertices(),
            y.computeFaceNormals(), y.normalsNeedUpdate = !0, y.computeBoundingBox(), this.geometry = null != this.freeGeometry ? this.freeGeometry : y;
        var _b;
        F = y.boundingBox;
        (_b = new THREE.Mesh(t)).position.z = h + 10;
        var ac = new THREE.Geometry();
        THREE.GeometryUtils.merge(ac, _b), this.editMarker[0] = ac;
        var bc = new THREE.Mesh(genArrowGeometry()), cc = new THREE.Geometry();
        bc.position.set(0, f / 2 + 30, h / 2 + 10), THREE.GeometryUtils.merge(cc, bc), bc.rotation.x = -Math.PI,
            bc.position.set(0, -(f / 2 + 30), -(h / 2 + 10)), THREE.GeometryUtils.merge(cc, bc),
            this.editMarker[1] = null == this.path ? cc : new THREE.Geometry();
        var dc = this.editName[1].split(":")[0];
        this.editName[1] = dc + ": " + Math.round(f) / 10 + " mm";
        var ec = new THREE.Mesh(genArrowGeometry()), fc = new THREE.Geometry();
        ec.position.set(y.boundingBox.min.x - 20, 0, h / 2 + 30), ec.rotation.x = Math.PI / 2,
            THREE.GeometryUtils.merge(fc, ec), ec.position.set(y.boundingBox.min.x - 20, 0, -(h / 2 + 30)),
            ec.rotation.x = -Math.PI / 2, THREE.GeometryUtils.merge(fc, ec), this.editMarker[2] = fc;
        dc = this.editName[2].split(":")[0];
        this.editName[2] = dc + ": " + Math.round(c) / 10 + " mm";
        var gc = new THREE.Mesh(genArrowGeometry());
        gc.position.x = y.boundingBox.max.x + 20, 0 == this.editSelected[3] && (gc.rotation.z = Math.PI);
        var hc = new THREE.Geometry();
        THREE.GeometryUtils.merge(hc, gc), this.editMarker[3] = 0 == this.editSelected[4] ? hc : new THREE.Geometry();
        dc = this.editName[3].split(":")[0];
        this.editName[3] = dc + ": " + this.editOptions[3][this.editSelected[3]];
        ec = new THREE.Mesh(genArrowGeometry()), fc = new THREE.Geometry();
        ec.position.set(100, y.boundingBox.max.y + 20, 0), ec.rotation.z = Math.PI / 2,
            THREE.GeometryUtils.merge(fc, ec), ec.position.set(30, y.boundingBox.max.y + 20, 0),
            ec.rotation.z = -Math.PI / 2, THREE.GeometryUtils.merge(fc, ec), this.editMarker[4] = null == this.path ? fc : new THREE.Geometry();
        dc = this.editName[4].split(":")[0];
        this.editName[4] = dc + ": " + this.editOptions[4][this.editSelected[4]];

        var ic = new THREE.TorusGeometry(10, 2, 10, 20);
        var jc = new THREE.Mesh(ic);
        var kc = (1 == this.text.length || "earring" == TYPE_SELECTED ? Xb.x : Wb.x) + Zb;

        var  lc = (1 == this.text.length || "earring" == TYPE_SELECTED ? Xb.y : Wb.y) + $b;
        jc.position.y = lc + 10 - 8, jc.position.x = kc + (1 == this.text.length || "earring" == TYPE_SELECTED ? 0 : 2);
        var mc = new THREE.Geometry();
        THREE.GeometryUtils.merge(mc, jc), this.asmName[0] = 1 == this.text.length || "earring" == TYPE_SELECTED ? "bail" : "bail right",
            this.asmMarker[0] = mc, this.asmOptions[0].position.y = jc.position.y, this.asmOptions[0].position.x = jc.position.x,
            this.asmOptions[0].path = kc, this.asmOptions[0].extPath = [null];
        ic = new THREE.TorusGeometry(10, 2, 10, 20), jc = new THREE.Mesh(ic), kc = Vb.x + Zb,
            lc = Vb.y + $b;
        jc.position.y = lc + 10 - 8, jc.position.x = kc - 2;
        var nc = new THREE.Geometry();
        THREE.GeometryUtils.merge(nc, jc), this.asmMarker[1] = 1 == this.text.length || "earring" == TYPE_SELECTED ? new THREE.Geometry() : nc,
            this.asmOptions[1].position.y = jc.position.y, this.asmOptions[1].position.x = jc.position.x,
            this.asmOptions[1].path = kc, this.asmOptions[1].extPath = [null];
        var oc = new THREE.Mesh(genArrowGeometry());
        oc.position.z = F.min.z - 30, oc.rotation.x = Math.PI / 2;
        var pc = new THREE.Geometry();

        THREE.GeometryUtils.merge(pc, oc), this.asmMarker[2] = "earring" == TYPE_SELECTED ? pc : new THREE.Geometry(),
            this.asmOptions[2].position.z = F.min.z + 1, scaleBboxManualConnector(this.asmOptions, this.asmInfo, this.asmName, this.geometry.boundingBox.size(), this.lastBboxSize),
            this.lastBboxSize = new THREE.Vector3(this.geometry.boundingBox.size().x, this.geometry.boundingBox.size().y, this.geometry.boundingBox.size().z);
    }
};

THREE.Ring = function() {
    this.id = THREE.RingIdCount++,
        this.uuid = THREE.Math.generateUUID(),
        this.name = "base ring",
        this.geometry = null,
        this.resolution = 1 == platformMobile ? "low" : globalResolution,
        this.path = null,
        this.editName = [],
        this.editMarker = [],
        this.editOptions = [],
        this.editSelected = [],
        this.asmName = [],
        this.asmMarker = [],
        this.asmOptions = [],
        this.asmSelected = [],
        this.asmObject = [],
        this.position = [],
        this.rotation = [],
        this.scale = [],
        this.position.push(new THREE.Vector3(0,0,0)),
        this.rotation.push(new THREE.Vector3(0,0,0)),
        this.scale.push(new THREE.Vector3(1,1,1)),
        this.fontLang = "english",
        this.font = "optimer",
        this.fontWeight = "normal",
        this.lastDiameter = null
};



THREE.Ring.prototype = {
    constructor: THREE.Ring,
    clone: function() {
        var e = new THREE.Ring;
        e.name = this.name,
            e.id = THREE.RingIdCount++,
            e.geometry = this.geometry.clone();
        for (var t = 0; t < this.editName.length; t++)
            e.editName[t] = this.editName[t],
                e.editMarker[t] = this.editMarker[t].clone(),
                e.editOptions[t] = this.editOptions[t],
                e.editSelected[t] = this.editSelected[t];
        for (t = 0; t < this.asmName.length; t++)
            e.asmName[t] = this.asmName[t],
                e.asmMarker[t] = this.asmMarker[t].clone(),
                e.asmOptions[t] = this.asmOptions[t],
                e.asmSelected[t] = this.asmSelected[t],
                e.asmObject[t] = this.asmObject[t];
        return e
    }
};

THREE.EventDispatcher.prototype.apply(THREE.Ring.prototype);

THREE.NameRing = function(e, t) {
    THREE.Ring.call(this),
        this.name = "Name ring",
        this.editName.push("text change"),
        this.editOptions.push([0, 1]),
        this.editSelected.push(0),
        this.editMarker.push(new THREE.Geometry),
        this.editName.push("ring depth"),
        this.editOptions.push([.8, .9, 1, 1.1, 1.2, 1.3, 1.4, 1.5]),
        this.editSelected.push(2),
        this.editMarker.push(new THREE.Geometry),
        this.editName.push("ring diameter"),
        this.editOptions.push(ringDiameterNames),
        this.editSelected.push(6),
        this.editMarker.push(new THREE.Geometry),
        this.editName.push("ring height"),
        this.editOptions.push([2, 2.5, 3, 3.5, 4, 5]),
        this.editSelected.push(2),
        this.editMarker.push(new THREE.Geometry),
        this.editName.push("name size"),
        this.editOptions.push([7, 8, 10, 12, 14, 16, 18]),
        this.editSelected.push(1),
        this.editMarker.push(new THREE.Geometry),
        this.editName.push("add letters connectors"),
        this.editOptions.push(["yes", "no"]),
        this.editSelected.push(1),
        this.editMarker.push(new THREE.Geometry),
        this.editName.push("ring section"),
        this.editOptions.push(["edgeless", "convex", "D shape", "comfort", "court"]),
        this.editSelected.push(0),
        this.editMarker.push(new THREE.Geometry),
        this.editName.push("texture change"),
        this.editOptions.push([0, 1]),
        this.editSelected.push(0),
        this.editMarker.push(new THREE.Geometry),
        this.editName.push("attach letters"),
        this.editOptions.push(["no", "yes"]),
        this.editSelected.push(1),
        this.editMarker.push(new THREE.Geometry),
        this.editName.push("shank type"),
        this.editOptions.push(["split", "streight", "none"]),
        this.editSelected.push(0),
        this.editMarker.push(new THREE.Geometry),
        this.editName.push("texture type"),
        this.editOptions.push(["normal", "negative"]),
        this.editSelected.push(0),
        this.editMarker.push(new THREE.Geometry),
        this.asmName.push("back"),
        this.asmMarker.push(new THREE.Geometry),
        this.asmOptions.push({
            path: null,
            position: new THREE.Vector3(0,0,0),
            rotation: new THREE.Vector3(0,0,0),
            scale: new THREE.Vector3(1,1,1)
        }),
        this.asmSelected.push(!1),
        this.asmObject.push(-1),
        this.asmName.push("front"),
        this.asmMarker.push(new THREE.Geometry),
        this.asmOptions.push({
            path: null,
            position: new THREE.Vector3(0,0,0),
            rotation: new THREE.Vector3(0,0,0),
            scale: new THREE.Vector3(1,1,1)
        }),
        this.asmSelected.push(!1),
        this.asmObject.push(-1);
    for (var i = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"], a = 0; a < 8; a++)
        this.asmName.push(i[a]),
            this.asmMarker.push(new THREE.Geometry),
            this.asmOptions.push({
                path: null,
                position: new THREE.Vector3(0,0,0),
                rotation: new THREE.Vector3(0,0,0),
                scale: new THREE.Vector3(1,1,1)
            }),
            this.asmSelected.push(!1),
            this.asmObject.push(-1);
    this.text = "",
        this.font = "script",
        this.fontWeight = "bold",
        this.fontStyle = "normal",
        this.lastTextSelected = 0,
        this.textHint = 0,
        this.texture = {
            grayScale: null,
            width: null,
            height: null
        },
        this.lastTextureSelected = 0,
        this.ringR = e = e || defaultR,
        this.shape = "name",
        this.lastDiameter = null,
        this.pathType = "2D",
        this.shapeExtPath = [],
        this.shapeHolePath = [],
    (t = t || !1) || this.buildGeometry()
};

THREE.NameRing.prototype = {
    constructor: THREE.Ring.prototype,
    clone: function() {
        var e = new THREE.NameRing(this.ringR);
        e.name = this.name,
            e.id = THREE.RingIdCount++,
        null != this.geometry && (e.geometry = this.geometry.clone()),
            e.shape = this.shape,
            e.path = this.path;
        for (var t = 0; t < this.editName.length; t++)
            e.editName[t] = this.editName[t],
                e.editMarker[t] = this.editMarker[t].clone(),
                e.editOptions[t] = this.editOptions[t],
                e.editSelected[t] = this.editSelected[t];
        for (t = 0; t < this.asmName.length; t++)
            e.asmName[t] = this.asmName[t],
                e.asmMarker[t] = this.asmMarker[t].clone();
        return e
    },
    buildGeometry: function() {
        this.lastTextSelected != this.editSelected[0] ? (this.path = null,
            this.extPath = [],
            this.holePath = [],
            addText()) : this.lastTextureSelected != this.editSelected[7] ? editTexture() : this.updateGeometry(this.text)
    },
    updateGeometry: function(e) {
        this.shapeName = "name" == this.shape ? "name ring" : "monogram ring",
            this.diameter = ringDiameter[this.editSelected[2]],
        null == this.lastDiameter && (this.lastDiameter = this.diameter),
        null != this.ringTexture && (this.texture = this.ringTexture,
            this.ringTexture = null),
            this.ringR = this.diameter / 2,
            wizegem.sds ? this.editOptions[4] = [7, 8, 10, 12, 14] : this.editOptions[4] = [7, 8, 10, 12, 14, 16, 18];
        var t = "name" == this.shape ? "wizegem" : "WG"
            , i = "" == this.text ? t : this.text;
        this.lastTextSelected = this.editSelected[0],
            this.lastTextureSelected = this.editSelected[7],
            "name" == this.shape ? this.editOptions[9] = ["split", "streight", "none"] : this.editOptions[9] = ["split", "streight"];
        var a = this.ringR
            , s = 10 * this.editOptions[3][this.editSelected[3]]
            , o = 10 * this.editOptions[1][this.editSelected[1]]
            , r = 2 * Math.PI * (a + o / 2)
            , n = this.editOptions[6][this.editSelected[6]]
            , h = 10 * this.editOptions[4][this.editSelected[4]];

        if (null != this.path && (this.shapePath = this.path,
                this.shapeExtPath = this.extPath,
                this.shapeHolePath = this.holePath),
            "monogram B" == this.shape)
            var c = new THREE.MonogramNeck(this.ringR,!0);
        else
            c = new THREE.TextNeck(this.ringR,!0);

        c.editOptions[2] = [this.editOptions[1][this.editSelected[1]]];

        c.editSelected[2] = 0;
        "monogram B" != this.shape ? (c.editSelected[3] = this.editSelected[5],
            c.editSelected[4] = this.editSelected[8]) : c.editSelected[3] = 2;
        c.text = i;
        c.font = this.font;
        c.fontWeight = this.fontWeight;
        c.fontStyle = this.fontStyle;
        c.resolution = this.resolution;
        c.path = this.path;
        c.extPath = this.extPath;
        c.holePath = this.holePath;
        c.forceGrid = !0;
        c.forceTextPaths = !0;
        c.bevelEnabled = !1;
        c.buildGeometry();
        (g = c.geometry).mergeVertices();
        this.shapePath = c.shapePath;
        this.shapeExtPath = c.shapeExtPath;
        this.shapeHolePath = c.shapeHolePath;

        var l = (Ie = g.boundingBox).size();
        if ("monogram" == this.shape)
            var m = (h / 2 - 0) / Math.sqrt(Math.pow(l.x / 2, 2) + Math.pow(l.y / 2, 2));
        else
            m = h / l.y;
        (R = new THREE.Mesh(g)).position.x = -(Ie.max.x + Ie.min.x) / 2,
            R.position.y = -(Ie.max.y + Ie.min.y) / 2,
            R.position.z = -o / 2 - Ie.min.z;
        var g = new THREE.Geometry;
        THREE.GeometryUtils.merge(g, R),
            (R = new THREE.Mesh(g)).scale.x = R.scale.y = m;
        g = new THREE.Geometry;
        THREE.GeometryUtils.merge(g, R),
            g.computeBoundingBox();
        l = (Ie = g.boundingBox).size();
        if (2 == this.editSelected[9] || l.x > r - 2)
            var p = !0;
        else
            p = !1;
        if (p) {
            for (var d = 5e3, y = -5e3, T = 0; T < g.vertices.length; T++) {
                var u = g.vertices[T].x
                    , v = g.vertices[T].y;
                if (Math.abs(v) < 2 && u < d) {
                    d = u;
                    var x = v
                }
            }
            for (T = 0; T < g.vertices.length; T++) {
                u = g.vertices[T].x,
                    v = g.vertices[T].y;
                Math.abs(v - x) < 2 && u > y && (y = u)
            }
            var E = y > -5e3 && d < 5e3 ? Ie.max.x - y - (Ie.min.x - d) + 4 : 4
        }
        var z = p ? -E : 20;
        if (l.x > r - z) {
            var R = new THREE.Mesh(g)
                , w = (r - z) / l.x;
            R.scale.x = R.scale.y = w;
            g = new THREE.Geometry;
            THREE.GeometryUtils.merge(g, R),
                h *= w
        }
        if ("monogram" == this.shape)
            for (T = 0; T < g.vertices.length; T++)
                g.vertices[T].y *= Math.sqrt(Math.pow(h / 2 - 0, 2) - Math.pow(g.vertices[T].x, 2)) / (l.y / 2);
        (R = new THREE.Mesh(g)).rotation.x = -Math.PI / 2;
        g = new THREE.Geometry;
        THREE.GeometryUtils.merge(g, R),
            g.computeBoundingBox();
        for (var b = g.boundingBox, M = b.size(), H = 1e3, f = -1e3, C = 1e3, S = -1e3, P = !1, G = !1, N = !1, k = !1, O = 1e3, I = 1e3, B = -1e3, U = -1e3, q = .3; q <= .4; q += .1) {
            var V = M.z / 2 * q;
            for (T = 0; T < g.vertices.length; T++) {
                u = g.vertices[T].x;
                var D = g.vertices[T].z;
                Math.abs(Math.abs(u) - M.x / 2) < V && (u < 0 & D < 0 & D < H & 0 == P && (H = D,
                    O = u),
                u < 0 & D > 0 & D > f & 0 == G && (f = D,
                    I = u),
                u > 0 & D < 0 & D < C & 0 == N && (C = D,
                    B = u),
                u > 0 & D > 0 & D > S & 0 == k && (S = D,
                    U = u))
            }
            1e3 != H && (P = !0),
            -1e3 != f && (G = !0),
            1e3 != C && (N = !0),
            -1e3 != S && (k = !0),
            P & G & N & k && (q = .4)
        }
        H += s / 4;
        H = Math.min(H, -s / 4);
        f -= s / 4;
        f = Math.max(f, s / 4);
        C += s / 4;
        C = Math.min(C, -s / 4);
        S -= s / 4;
        S = Math.max(S, s / 4),
            O = 1e3,
            I = 1e3,
            B = -1e3,
            U = -1e3;
        var _, F = -1e3, A = 1e3;
        for (_ = 1 == this.editSelected[9] && "name" == this.shape ? s / 2 * .95 : s / 4,
                 T = 0; T < g.vertices.length; T++) {
            if ((u = g.vertices[T].x) < 0 & (D = g.vertices[T].z) < 0 & D <= H + _ & u < O && (O = u),
                u < 0 & D > 0 & D >= f - _ & u < I && (I = u),
                u > 0 & D < 0 & D <= C + _ & u > B && (B = u),
                u > 0 & D > 0 & D >= S - _ & u > U && (U = u),
                Math.abs(D) < _) {
                if (u > F) {
                    F = u;
                    var W = D
                }
                if (u < A) {
                    A = u;
                    var L = D
                }
            }
        }
        if (F -= 2,
                A += 2,
            0 == this.editSelected[9])
            y = Math.min(r / 2 - 8, b.max.x + Math.max(Math.abs(C), Math.abs(S))),
                d = Math.max(-r / 2 + 8, b.min.x - Math.max(Math.abs(H), Math.abs(f)));
        else
            y = F,
                d = A;
        "high" == this.resolution || this.resolution;
        var J = null != this.texture.grayScale ? "ultra-high" : this.resolution
            , j = r - (y - d) + 4;
        if (p)
            var X = new THREE.Geometry;
        else
            X = genFlatRing(j, o, s, n, J);
        if (null != this.texture.grayScale && 0 == p) {
            for (var Z = genRingSectionTexturePath(o, s, n), Y = Z.getLength(), Q = [], K = 0; K < 629; K++)
                Q.push({
                    a: -1,
                    len: -1
                });
            var $ = Z.getSpacedPoints(2e3)
                , ee = 0
                , te = 2 * Math.PI;
            for (K = 0; K < 2e3; K++) {
                u = $[K].x,
                    v = $[K].y;
                var ie = Math.atan(Math.abs(u / v));
                ie = u >= 0 && v >= 0 ? ie : u >= 0 && v < 0 ? Math.PI - ie : u < 0 && v < 0 ? Math.PI + ie : 2 * Math.PI - ie;
                var ae = Math.round(100 * ie)
                    , se = Z.getTangent(K / 2e3)
                    , oe = Math.atan(Math.abs(se.x / se.y));
                oe = se.x <= 0 && se.y <= 0 ? Math.PI / 2 + oe : se.x <= 0 && se.y > 0 ? 3 * Math.PI / 2 - oe : se.x > 0 && se.y <= 0 ? Math.PI / 2 - oe : 3 * Math.PI / 2 + oe,
                    Q[ae] = {
                        a: oe,
                        len: K / 2e3 * Y
                    },
                u >= 0 && ie > ee && (ee = ie),
                u < 0 && ie < te && (te = ie)
            }
            var re = Y
                , ne = Math.min(j / this.texture.width, re / this.texture.height);
            resX = Math.ceil(j / ne) % this.texture.width,
                Nscale = Math.floor((Math.ceil(j / ne) - resX) / this.texture.width),
                ne = (Nscale * this.texture.width + resX) * ne / ((Nscale + 1) * this.texture.width);
            var he = this.texture.height * ne / re;
            ee *= he,
                te /= he;
            var ce = (1 - he) / 2 * Y
                , le = Y - ce
                , me = (1 - he) * Y / 2
                , ge = this.texture.grayScale;
            for (T = 0; T < X.vertices.length; T++) {
                u = X.vertices[T].x,
                    v = X.vertices[T].y,
                    D = X.vertices[T].z,
                    ie = Math.atan(Math.abs(D / v));
                ie = D >= 0 && v >= 0 ? ie : D >= 0 && v < 0 ? Math.PI - ie : D < 0 && v < 0 ? Math.PI + ie : 2 * Math.PI - ie;
                oe = Q[ae = Math.round(100 * ie)].a;
                var pe = Q[ae].len;
                if (pe >= ce && pe <= le && -1 != oe && X.vertices[T].y >= -o / 2 + 2) {
                    var de = Math.floor((j / 2 + X.vertices[T].x) / ne) % this.texture.width
                        , ye = (256 - ge[Math.floor((pe - me) / ne) % this.texture.height][de]) / (256 / 3);
                    1 == this.editSelected[10] && (ye = 1.5 - ye),
                        X.vertices[T].z -= ye * Math.sin(oe),
                        X.vertices[T].y -= ye * Math.cos(oe)
                }
            }
        }
        var Te = new THREE.Mesh(X);
        Te.position.x = y + j / 2 - 2;
        X = new THREE.Geometry;
        THREE.GeometryUtils.merge(X, Te);
        var ue = {
            amount: 1
        };
        ue.bevelEnabled = !1,
            ue.steps = 100;
        var ve = genRingSectionShapeReverse(o, s / 2, n);
        if (0 == this.editSelected[9] && 0 == p) {
            var xe = h / 20
                , Ee = new THREE.CubicBezierCurve3(new THREE.Vector3(s / 4,0,d - .5),new THREE.Vector3(s / 4,0,d + 10),new THREE.Vector3(-H,0,O - 10 + xe),new THREE.Vector3(-H,0,O + xe));
            ue.extrudePath = Ee;
            var ze = new THREE.ExtrudeGeometry(ve,ue)
                , Re = new THREE.Mesh(ze);
            Re.rotation.y = Math.PI / 2,
                THREE.GeometryUtils.merge(X, Re);
            var we = new THREE.CubicBezierCurve3(new THREE.Vector3(-s / 4,0,d - .5),new THREE.Vector3(-s / 4,0,d + 10),new THREE.Vector3(-f,0,I - 10 + xe),new THREE.Vector3(-f,0,I + xe));
            ue.extrudePath = we;
            var be = new THREE.ExtrudeGeometry(ve,ue)
                , Me = new THREE.Mesh(be);
            Me.rotation.y = Math.PI / 2,
                THREE.GeometryUtils.merge(X, Me);
            var He = new THREE.CubicBezierCurve3(new THREE.Vector3(s / 4,0,y + .5),new THREE.Vector3(s / 4,0,y - 10),new THREE.Vector3(-C,0,B - xe + 10),new THREE.Vector3(-C,0,B - xe));
            ue.extrudePath = He;
            var fe = new THREE.ExtrudeGeometry(ve,ue)
                , Ce = new THREE.Mesh(fe);
            Ce.rotation.y = Math.PI / 2,
                THREE.GeometryUtils.merge(X, Ce);
            var Se = new THREE.CubicBezierCurve3(new THREE.Vector3(-s / 4,0,y + .5),new THREE.Vector3(-s / 4,0,y - 10),new THREE.Vector3(-S,0,U - xe + 10),new THREE.Vector3(-S,0,U - xe));
            ue.extrudePath = Se;
            var Pe = new THREE.ExtrudeGeometry(ve,ue)
                , Ge = new THREE.Mesh(Pe);
            Ge.rotation.y = Math.PI / 2,
                THREE.GeometryUtils.merge(X, Ge)
        }
        if (1 == this.editSelected[9] && "name" == this.shape) {
            (R = new THREE.Mesh(g)).position.z = -(W + L) / 2;
            g = new THREE.Geometry;
            THREE.GeometryUtils.merge(g, R)
        }
        THREE.GeometryUtils.merge(X, g),
            X.computeBoundingBox();
        for (X.boundingBox,
                 K = 0; K < X.faces.length; K++)
            X.faces[K].vertexNormals = [];
        var Ne = r - .1
            , ke = this.ringR + o / 2
            , Oe = convertFlatToRing(X, ke, Ne);
        Oe.verticesNeedUpdate = !0,
            Oe.mergeVertices(),
            Oe.computeFaceNormals(),
            Oe.normalsNeedUpdate = !0,
            Oe.computeBoundingBox(),
            this.geometry = null != this.freeGeometry ? this.freeGeometry : Oe;
        var Ie = Oe.boundingBox
            , Be = g.clone()
            , Ue = ke + o / 2 + 10;
        for (T = 0; T < g.vertices.length; T++) {
            oe = 2 * Math.PI * g.vertices[T].x / Ne;
            var qe = Ue + g.vertices[T].y;
            Be.vertices[T].x = qe * Math.sin(oe),
                Be.vertices[T].y = qe * Math.cos(oe)
        }
        for (K = 0; K < Be.faces.length; K++)
            Be.faces[K].vertexNormals = [];
        Be.verticesNeedUpdate = !0,
            Be.computeFaceNormals(),
            Be.normalsNeedUpdate = !0,
            this.editMarker[0] = Be;
        var Ve = new THREE.Mesh(genArrowGeometry());
        Ve.position.y = -(this.ringR + o + 30),
            Ve.rotation.z = Math.PI;
        var De = new THREE.Geometry;
        THREE.GeometryUtils.merge(De, Ve),
            this.editMarker[1] = De;
        var _e = this.editName[1].split(":")[0];
        this.editName[1] = _e + ": " + Math.round(o) / 10 + " mm";
        var Fe = new THREE.Mesh(genArrowDualGeometry(2 * (this.ringR - 30)))
            , Ae = new THREE.Geometry;
        THREE.GeometryUtils.merge(Ae, Fe),
            this.editMarker[2] = Ae;
        _e = this.editName[2].split(":")[0];
        this.editName[2] = _e + ": " + Math.round(2 * this.ringR) / 10 + " mm";
        var We = new THREE.Mesh(genArrowGeometry())
            , Le = new THREE.Geometry;
        We.rotation.x = Math.PI / 2,
            We.position.set(0, -ke, s / 2 + 30),
            THREE.GeometryUtils.merge(Le, We),
            We.position.z = -s / 2 - 30,
            We.rotation.x = -Math.PI / 2,
            THREE.GeometryUtils.merge(Le, We),
            this.editMarker[3] = Le;
        _e = this.editName[3].split(":")[0];
        this.editName[3] = _e + ": " + Math.round(s) / 10 + " mm";
        var Je = new THREE.Mesh(genArrowGeometry())
            , je = new THREE.Geometry;
        Je.rotation.x = -Math.PI / 2,
            Je.position.z = -(h / 2 + 40),
            Je.position.y = o + ke,
            THREE.GeometryUtils.merge(je, Je),
            Je.rotation.x = Math.PI / 2,
            Je.position.z = h / 2 + 40,
            THREE.GeometryUtils.merge(je, Je),
            this.editMarker[4] = je;
        _e = this.editName[4].split(":")[0];
        this.editName[4] = _e + ": " + Math.round(h) / 10 + " mm";
        var Xe = new THREE.Mesh(genArrowGeometry());
        Xe.position.x = this.ringR + o + 40,
        0 == this.editSelected[5] && (Xe.rotation.z = Math.PI);
        var Ze = new THREE.Geometry;
        THREE.GeometryUtils.merge(Ze, Xe),
            this.editMarker[5] = "monogram B" != this.shape ? Ze : new THREE.Geometry;
        _e = this.editName[5].split(":")[0];
        this.editName[5] = _e + ": " + this.editOptions[5][this.editSelected[5]];
        var Ye = genFlatRing(30, o, s, this.editOptions[6][this.editSelected[6]], "med")
            , Qe = new THREE.Mesh(Ye);
        Qe.position.x = -50,
            Qe.position.y = -(this.ringR + o + 20),
            Qe.rotation.z = Math.PI;
        Ye = new THREE.Geometry;
        THREE.GeometryUtils.merge(Ye, Qe),
            this.editMarker[6] = Ye;
        _e = this.editName[6].split(":")[0];
        this.editName[6] = _e + ": " + this.editOptions[6][this.editSelected[6]];
        var Ke = new THREE.Mesh(genTextureMarkerGeometry());
        Ke.position.x = 50,
            Ke.position.y = -(this.ringR + o + 20),
            Ke.rotation.x = Math.PI / 2;
        var $e = new THREE.Geometry;
        THREE.GeometryUtils.merge($e, Ke),
            this.editMarker[7] = $e;
        var et = new THREE.Mesh(genArrowGeometry());
        De = new THREE.Geometry;
        et.position.set(35, Ie.max.y + 30, 0),
            et.rotation.z = Math.PI / 2,
            THREE.GeometryUtils.merge(De, et),
            et.position.set(-35, Ie.max.y + 30, 0),
            et.rotation.z = -Math.PI / 2,
            THREE.GeometryUtils.merge(De, et),
            this.editMarker[8] = "monogram B" != this.shape ? De : new THREE.Geometry;
        _e = this.editName[8].split(":")[0];
        this.editName[8] = _e + ": " + this.editOptions[8][this.editSelected[8]];
        var tt = new THREE.SphereGeometry(10,Math.floor(20),Math.floor(20))
            , it = new THREE.Mesh(tt);
        it.position.x = Ie.min.x - 40;
        var at = new THREE.Geometry;
        THREE.GeometryUtils.merge(at, it),
            this.editMarker[9] = at;
        _e = this.editName[9].split(":")[0];
        this.editName[9] = _e + ": " + this.editOptions[9][this.editSelected[9]];
        var st = new THREE.Mesh(genArrowDualGeometry(40))
            , ot = new THREE.Geometry;
        st.position.set(80, -(this.ringR + o + 40), 0),
            st.rotation.z = -Math.PI,
            THREE.GeometryUtils.merge(ot, st),
            this.editMarker[10] = ot;
        _e = this.editName[10].split(":")[0];
        this.editName[10] = _e + ": " + this.editOptions[10][this.editSelected[10]];
        var rt = new THREE.Vector3(ke - o / 2,0,-(s / 2 + 6))
            , nt = new THREE.Vector3(ke + o / 2,0,-(s / 2 + 6))
            , ht = new THREE.Vector3(ke + o / 2,0,-(s / 2 + 2))
            , ct = new THREE.Vector3(ke - o / 2,0,-(s / 2 + 2))
            , lt = new THREE.LatheGeometry([rt, nt, ht, ct, rt],Math.floor(this.ringR / 2));
        lt.verticesNeedUpdate = !0,
            lt.computeFaceNormals(),
            this.asmMarker[0] = lt,
            this.asmOptions[0].path = genCircleNurbsPath(this.ringR),
            this.asmOptions[0].position.z = -(s / 2 - 1);
        var mt = .5 + y / r
            , gt = 1.5 + d / r;
        this.asmOptions[0].pathPart = {
            start: mt,
            end: gt
        },
            this.asmOptions[0].rotation.z = Math.PI;
        rt = new THREE.Vector3(ke + o / 2,0,s / 2 + 6),
            nt = new THREE.Vector3(ke - o / 2,0,s / 2 + 6),
            ht = new THREE.Vector3(ke - o / 2,0,s / 2 + 2),
            ct = new THREE.Vector3(ke + o / 2,0,s / 2 + 2);
        var pt = new THREE.LatheGeometry([rt, nt, ht, ct, rt],Math.floor(this.ringR / 2));
        pt.verticesNeedUpdate = !0,
            pt.computeFaceNormals(),
            this.asmMarker[1] = pt,
            this.asmOptions[1].path = genCircleNurbsPath(this.ringR),
            this.asmOptions[1].position.z = s / 2 - 1,
            this.asmOptions[1].pathPart = this.asmOptions[0].pathPart,
            this.asmOptions[1].rotation.z = Math.PI,
            scaleDiameterManualConnector(this.asmOptions, this.asmInfo, this.asmName, this.diameter, this.lastDiameter),
            this.lastDiameter = this.diameter
    }
};


function genTextShapesFromPaths(a, b, c) {
    var d = [], e = [ a ];
    if (null != b) e = e.concat(b);
    for (var f = 0; f < e.length; f++) {
        var g = e[f];
        (h = g.getSpacedPoints(Math.ceil(g.getLength()))).push(h[0]), d.push(new THREE.Shape(h));
        for (var h = g.getSpacedPoints(30), i = 0; i < c.length; i++) {
            var j = !1, k = (l = c[i]).getSpacedPoints(Math.ceil(l.getLength()));
            if (THREE.Shape.Utils.isClockWise(k)) {
                (k = k.reverse()).push(k[0]);
                var l = new THREE.Path(k);
            }
            k = l.getSpacedPoints(4);
            for (var m = 0; m < k.length; m++) 1 == pointInPath(h, k[m]) && (j = !0);
            j && d[f].holes.push(l);
        }
    }
    return d;
}

function pointInPath(a, b) {
    var c = a.length - 1, d = !1;
    for (i = 0; i < a.length; i++) (a[i].y < b.y && a[c].y >= b.y || a[c].y < b.y && a[i].y >= b.y) && (a[i].x <= b.x || a[c].x <= b.x) && (d ^= a[i].x + (b.y - a[i].y) / (a[c].y - a[i].y) * (a[c].x - a[i].x) < b.x),
        c = i;
    return d;
}

function genRingSectionShape(a, b, c) {
    var d = 2 / 3, e = new THREE.Shape();
    if ("flat" == c) e.moveTo(-b / 2, -a / 2), e.lineTo(-b / 2, a / 2), e.lineTo(b / 2, a / 2),
        e.lineTo(b / 2, -a / 2), e.lineTo(-b / 2, -a / 2); else if ("edgeless" == c) {
        var f = 2;
        e.moveTo(-b / 2, -a / 2 + f), e.lineTo(-b / 2, a / 2 - f), e.quadraticCurveTo(-b / 2, a / 2, -b / 2 + f, a / 2),
            e.lineTo(b / 2 - f, a / 2), e.quadraticCurveTo(b / 2, a / 2, b / 2, a / 2 - f),
            e.lineTo(b / 2, -a / 2 + f), e.quadraticCurveTo(b / 2, -a / 2, b / 2 - f, -a / 2),
            e.lineTo(-b / 2 + f, -a / 2), e.quadraticCurveTo(-b / 2, -a / 2, -b / 2, -a / 2 + f);
    } else if ("convex" == c) {
        f = 2;
        e.moveTo(-b / 2, -a / 2 + f), e.lineTo(-b / 2, 0), e.quadraticCurveTo(-b / 2, a / 2, 0, a / 2),
            e.quadraticCurveTo(b / 2, a / 2, b / 2, 0), e.lineTo(b / 2, -a / 2 + f), e.quadraticCurveTo(b / 2, -a / 2, b / 2 - f, -a / 2),
            e.lineTo(-b / 2 + f, -a / 2), e.quadraticCurveTo(-b / 2, -a / 2, -b / 2, -a / 2 + f);
    } else if ("concave" == c) {
        f = 2;
        var g = a / 4;
        e.moveTo(-b / 2, -a / 2 + f), e.lineTo(-b / 2, a / 2 - f), e.quadraticCurveTo(-b / 2, a / 2, -b / 2 + f, a / 2),
            e.quadraticCurveTo((-b / 2 + f) * d, g, 0, g), e.quadraticCurveTo((b / 2 - f) * d, g, b / 2 - f, a / 2),
            e.quadraticCurveTo(b / 2, a / 2, b / 2, a / 2 - f), e.lineTo(b / 2, -a / 2 + f),
            e.quadraticCurveTo(b / 2, -a / 2, b / 2 - f, -a / 2), e.lineTo(-b / 2 + f, -a / 2),
            e.quadraticCurveTo(-b / 2, -a / 2, -b / 2, -a / 2 + f);
    } else if ("D shape" == c) {
        d = (Math.min(70, Math.max(20, b)) - 20) / 200 + .8;
        e.moveTo(-b / 2, -a / 2), e.quadraticCurveTo(-b / 2 * d, a / 2, 0, a / 2), e.quadraticCurveTo(b / 2 * d, a / 2, b / 2, -a / 2),
            e.lineTo(-b / 2, -a / 2);
    } else if ("curve" == c) {
        f = 2;
        e.moveTo(0, -a / 2), e.quadraticCurveTo(-b / 2 * d, -a / 2, -b / 2, -.5), e.lineTo(-b / 2, a - f),
            e.quadraticCurveTo(-b / 2, a, -b / 2 + f, a), e.quadraticCurveTo((-b / 2 + f) * d, a / 2, 0, a / 2),
            e.quadraticCurveTo((b / 2 - f) * d, a / 2, b / 2 - f, a), e.quadraticCurveTo(b / 2, a, b / 2, a - f),
            e.lineTo(b / 2, -.5), e.quadraticCurveTo(b / 2 * d, -a / 2, 0, -a / 2);
    } else if ("comfort" == c) {
        f = a / 3;
        e.moveTo(-b / 2, -a / 2 + f), e.lineTo(-b / 2, a / 6), e.quadraticCurveTo(-b / 2 * d, a / 2, 0, a / 2),
            e.quadraticCurveTo(b / 2 * d, a / 2, b / 2, a / 6), e.lineTo(b / 2, -a / 2 + f),
            e.quadraticCurveTo(b / 2, -a / 2, b / 2 - f, -a / 2), e.lineTo(-b / 2 + f, -a / 2),
            e.quadraticCurveTo(-b / 2, -a / 2, -b / 2, -a / 2 + f);
    } else "court" == c ? (e.moveTo(-b / 2, 0), e.quadraticCurveTo(-b / 2, a / 2, 0, a / 2),
        e.quadraticCurveTo(b / 2, a / 2, b / 2, 0), e.quadraticCurveTo(b / 2, -a / 2, 0, -a / 2),
        e.quadraticCurveTo(-b / 2, -a / 2, -b / 2, 0)) : "double convex" == c && (e.moveTo(-b / 2, -a / 4),
        e.lineTo(-b / 2, a / 4), e.quadraticCurveTo(-b / 2, a / 2, 0, a / 2), e.quadraticCurveTo(b / 2, a / 2, b / 2, a / 4),
        e.lineTo(b / 2, -a / 4), e.quadraticCurveTo(b / 2, -a / 2, 0, -a / 2), e.quadraticCurveTo(-b / 2, -a / 2, -b / 2, -a / 4));
    return e;
}

function shapeApplyMatrix(a, b) {
    if (null != a) {
        if (null != a.actions) for (var c = new THREE.Shape(), d = 0; d < a.actions.length; d++) {
            var e = a.actions[d].action, f = a.actions[d].args;
            if ("moveTo" == e) (o = new THREE.Vector3(f[0], f[1], 0)).applyMatrix4(b), c.moveTo(o.x, o.y); else if ("lineTo" == e) (o = new THREE.Vector3(f[0], f[1], 0)).applyMatrix4(b),
                c.lineTo(o.x, o.y); else if ("quadraticCurveTo" == e) (l = new THREE.Vector3(f[0], f[1], 0)).applyMatrix4(b),
                (m = new THREE.Vector3(f[2], f[3], 0)).applyMatrix4(b), c.quadraticCurveTo(l.x, l.y, m.x, m.y); else if ("bezierCurveTo" == e) (l = new THREE.Vector3(f[0], f[1], 0)).applyMatrix4(b),
                (m = new THREE.Vector3(f[2], f[3], 0)).applyMatrix4(b), (n = new THREE.Vector3(f[4], f[5], 0)).applyMatrix4(b),
                c.bezierCurveTo(l.x, l.y, m.x, m.y, n.x, n.y);
        } else {
            var g = [];
            for (d = 0; d < a.points.length; d++) (o = new THREE.Vector2(a.points[d].x, a.points[d].y)).applyMatrix4(b),
                g.push(o);
            c = new THREE.Shape(g);
        }
        for (var h = 0; h < a.holes.length; h++) {
            var i = a.holes[h];
            if (null != i.degree) {
                var j = [];
                for (d = 0; d < i.controlPoints.length; d++) (o = new THREE.Vector3(i.controlPoints[d].x, i.controlPoints[d].y, i.controlPoints[d].z)).applyMatrix4(b),
                    j.push(new THREE.Vector4(o.x, o.y, o.z, i.controlPoints[d].w));
                var k = new THREE.NURBSCurve(i.degree, i.knots, j);
            } else if (null != i.actions) for (k = new THREE.Path(), d = 0; d < i.actions.length; d++) {
                e = i.actions[d].action, f = i.actions[d].args;
                if ("moveTo" == e) (o = new THREE.Vector3(f[0], f[1], 0)).applyMatrix4(b), k.moveTo(o.x, o.y); else if ("lineTo" == e) (o = new THREE.Vector3(f[0], f[1], 0)).applyMatrix4(b),
                    k.lineTo(o.x, o.y); else if ("quadraticCurveTo" == e) (l = new THREE.Vector3(f[0], f[1], 0)).applyMatrix4(b),
                    (m = new THREE.Vector3(f[2], f[3], 0)).applyMatrix4(b), k.quadraticCurveTo(l.x, l.y, m.x, m.y); else if ("bezierCurveTo" == e) {
                    var l, m, n;
                    (l = new THREE.Vector3(f[0], f[1], 0)).applyMatrix4(b), (m = new THREE.Vector3(f[2], f[3], 0)).applyMatrix4(b),
                        (n = new THREE.Vector3(f[4], f[5], 0)).applyMatrix4(b), k.bezierCurveTo(l.x, l.y, m.x, m.y, n.x, n.y);
                }
            } else {
                g = [];
                if (null != i.points[0].z) {
                    for (d = 0; d < i.points.length; d++) (o = new THREE.Vector3(i.points[d].x, i.points[d].y, i.points[d].z)).applyMatrix4(b),
                        g.push(o);
                    k = new THREE.SplineCurve3(g);
                } else {
                    for (d = 0; d < i.points.length; d++) {
                        var o;
                        (o = new THREE.Vector2(i.points[d].x, i.points[d].y)).applyMatrix4(b), g.push(o);
                    }
                    k = new THREE.SplineCurve(g);
                }
            }
            c.holes.push(k);
        }
        return c;
    }
}

function getShapeBails(a, b) {
    b = b || .5;
    for (var c = a.boundingBox, d = (c.size(), (c.max.x + c.min.x) / 2), e = c.max.x - c.min.x, f = -1e3, g = 1e3, h = -1e3, i = !1, j = !1, k = .3; k >= 0 && (0 == i || 0 == j); k -= .05) for (var l = b; l > 0 && (0 == i || 0 == j); l -= .05) {
        for (var m = bailCheckRightY = c.max.y * l, n = 0; n < a.vertices.length; n++) {
            var o = a.vertices[n].x, p = a.vertices[n].y;
            Math.abs(o - d) < 8 && p > f && (f = p, bailCenterX = o), Math.abs(p - m) < 6 && o < g && o < d - e * k && 0 == i && (g = o,
                bailLeftY = p), Math.abs(p - bailCheckRightY) < 6 && o > h && o > d + e * k && 0 == j && (h = o,
                bailRightY = p);
        }
        g < 1e3 && (i = !0), h > -1e3 && (j = !0);
    }
    return {
        left: new THREE.Vector2(g, bailLeftY),
        center: new THREE.Vector2(bailCenterX, f),
        right: new THREE.Vector2(h, bailRightY)
    };
}

function scaleBboxManualConnector(a, b, c, d, e) {
    if (null != e) for (var f = new THREE.Vector3(d.x / e.x, d.y / e.y, d.z / e.z), g = 0; g < a.length; g++) if ("manual" == c[g].split(" ")[0]) {
        var h = a[g];
        if ("scalar" == b[g].type) {
            var i = h, j = new THREE.Vector3(i.position.x, i.position.y, i.position.z);
            new THREE.Vector3(i.rotation.x, i.rotation.y, i.rotation.z);
            i.position = new THREE.Vector3(j.x * f.x, j.y * f.y, j.z * f.z);
        } else for (var k = 0; k < h.length; k++) {
            i = h[k], j = new THREE.Vector3(i.position.x, i.position.y, i.position.z), new THREE.Vector3(i.rotation.x, i.rotation.y, i.rotation.z);
            i.position = new THREE.Vector3(j.x * f.x, j.y * f.y, j.z * f.z);
        }
    }
}

function genFlatRing(a, b, c, d, e, f) {
    var g = (f = f || !1) ? "ultra-high" == e ? genRingSectionTextureHalfShape(b, c, d) : genRingSectionHalfShape(b, c, d) : "ultra-high" == e ? genRingSectionTextureShape(b, c, d) : genRingSectionShape(b, c, d), h = Math.min(600, "ultra-high" == e ? a : "high" == e ? a / 4 : "med" == e ? a / 8 : "med-low" == e ? a / 12 : a / 16), i = {
        amount: 0
    };
    i.bevelEnabled = !0, i.bevelThickness = a / 2, i.bevelSize = 0, i.bevelSegments = Math.ceil(h),
        i.steps = 1;
    var j = new THREE.ExtrudeGeometry(g, i), k = new THREE.Mesh(j);
    k.rotation.y = Math.PI / 2;
    j = new THREE.Geometry();
    return THREE.GeometryUtils.merge(j, k), j;
}

function genRingSectionTexturePath(a, b, c) {
    var d = 2 / 3, e = new THREE.Path();
    if ("flat" == c) e.moveTo(-b / 2, -a / 2), e.lineTo(-b / 2, a / 2), e.lineTo(b / 2, a / 2),
        e.lineTo(b / 2, -a / 2); else if ("edgeless" == c) {
        var f = 2;
        e.moveTo(-b / 2, -a / 2 + f), e.lineTo(-b / 2, a / 2 - f), e.quadraticCurveTo(-b / 2, a / 2, -b / 2 + f, a / 2),
            e.lineTo(b / 2 - f, a / 2), e.quadraticCurveTo(b / 2, a / 2, b / 2, a / 2 - f),
            e.lineTo(b / 2, -a / 2 + f);
    } else if ("convex" == c) {
        f = 2;
        e.moveTo(-b / 2, -a / 2 + f), e.lineTo(-b / 2, 0), e.quadraticCurveTo(-b / 2, a / 2, 0, a / 2),
            e.quadraticCurveTo(b / 2, a / 2, b / 2, 0), e.lineTo(b / 2, -a / 2 + f);
    } else if ("concave" == c) {
        f = 2;
        var g = a / 4;
        e.moveTo(-b / 2, -a / 2 + f), e.lineTo(-b / 2, a / 2 - f), e.quadraticCurveTo(-b / 2, a / 2, -b / 2 + f, a / 2),
            e.quadraticCurveTo((-b / 2 + f) * d, g, 0, g), e.quadraticCurveTo((b / 2 - f) * d, g, b / 2 - f, a / 2),
            e.quadraticCurveTo(b / 2, a / 2, b / 2, a / 2 - f), e.lineTo(b / 2, -a / 2 + f);
    } else if ("D shape" == c) {
        d = (Math.min(70, Math.max(20, b)) - 20) / 200 + .8;
        e.moveTo(-b / 2, -a / 2), e.quadraticCurveTo(-b / 2 * d, a / 2, 0, a / 2), e.quadraticCurveTo(b / 2 * d, a / 2, b / 2, -a / 2);
    } else if ("curve" == c) {
        f = 2;
        e.moveTo(-b / 2, -.5), e.lineTo(-b / 2, a - f), e.quadraticCurveTo(-b / 2, a, -b / 2 + f, a),
            e.quadraticCurveTo((-b / 2 + f) * d, a / 2, 0, a / 2), e.quadraticCurveTo((b / 2 - f) * d, a / 2, b / 2 - f, a),
            e.quadraticCurveTo(b / 2, a, b / 2, a - f), e.lineTo(b / 2, -.5);
    } else if ("comfort" == c) {
        f = a / 3;
        e.moveTo(-b / 2, -a / 2 + f), e.lineTo(-b / 2, a / 6), e.quadraticCurveTo(-b / 2 * d, a / 2, 0, a / 2),
            e.quadraticCurveTo(b / 2 * d, a / 2, b / 2, a / 6), e.lineTo(b / 2, -a / 2 + f);
    } else "court" == c ? (e.moveTo(-b / 2, 0), e.quadraticCurveTo(-b / 2, a / 2, 0, a / 2),
        e.quadraticCurveTo(b / 2, a / 2, b / 2, 0)) : "double convex" == c && (e.moveTo(-b / 2, -a / 4),
        e.lineTo(-b / 2, a / 4), e.quadraticCurveTo(-b / 2, a / 2, 0, a / 2), e.quadraticCurveTo(b / 2, a / 2, b / 2, a / 4),
        e.lineTo(b / 2, -a / 4));
    return e;
}

function genRingSectionShapeReverse(a, b, c) {
    var d = 2 / 3, e = new THREE.Shape();
    if ("flat" == c) e.moveTo(a / 2, -b / 2), e.lineTo(-a / 2, -b / 2), e.lineTo(-a / 2, b / 2),
        e.lineTo(a / 2, b / 2), e.lineTo(a / 2, -b / 2); else if ("edgeless" == c) {
        var f = 2;
        e.moveTo(a / 2 - f, -b / 2), e.lineTo(-a / 2 + f, -b / 2), e.quadraticCurveTo(-a / 2, -b / 2, -a / 2, -b / 2 + f),
            e.lineTo(-a / 2, b / 2 - f), e.quadraticCurveTo(-a / 2, b / 2, -a / 2 + f, b / 2),
            e.lineTo(a / 2 - f, b / 2), e.quadraticCurveTo(a / 2, b / 2, a / 2, b / 2 - f),
            e.lineTo(a / 2, -b / 2 + f), e.quadraticCurveTo(a / 2, -b / 2, a / 2 - f, -b / 2);
    } else if ("convex" == c) {
        f = 2;
        e.moveTo(a / 2 - f, -b / 2), e.lineTo(0, -b / 2), e.quadraticCurveTo(-a / 2, -b / 2, -a / 2, 0),
            e.quadraticCurveTo(-a / 2, b / 2, 0, b / 2), e.lineTo(a / 2 - f, b / 2), e.quadraticCurveTo(a / 2, b / 2, a / 2, b / 2 - f),
            e.lineTo(a / 2, -b / 2 + f), e.quadraticCurveTo(a / 2, -b / 2, a / 2 - f, -b / 2);
    } else if ("concave" == c) {
        f = 2;
        e.moveTo(a / 2 - f, -b / 2), e.lineTo(-a / 2 + f, -b / 2), e.quadraticCurveTo(-a / 2, -b / 2, -a / 2, -b / 2 + f),
            e.quadraticCurveTo(-.5, -b / 2 + f, -.5, 0), e.quadraticCurveTo(-.5, b / 2 - f, -a / 2, b / 2 - f),
            e.quadraticCurveTo(-a / 2, b / 2, -a / 2 + f, b / 2), e.lineTo(a / 2 - f, b / 2),
            e.quadraticCurveTo(a / 2, b / 2, a / 2, b / 2 - f), e.lineTo(a / 2, -b / 2 + f),
            e.quadraticCurveTo(a / 2, -b / 2, a / 2 - f, -b / 2);
    } else if ("D shape" == c) {
        d = (Math.min(70, Math.max(20, b)) - 20) / 200 + .8;
        e.moveTo(a / 2, -b / 2), e.quadraticCurveTo(-a / 2, -b / 2 * d, -a / 2, 0), e.quadraticCurveTo(-a / 2, b / 2 * d, a / 2, b / 2),
            e.lineTo(a / 2, -b / 2);
    } else if ("curve" == c) e.moveTo(a / 2, 0), e.quadraticCurveTo(a / 2, -b / 2 * d, .5, -b / 2),
        e.lineTo(-a + f, -b / 2), e.quadraticCurveTo(-a, -b / 2, -a, -b / 2 + f), e.quadraticCurveTo(-a / 2, (-b / 2 + f) * d, -a / 2, 0),
        e.quadraticCurveTo(-a / 2, (b / 2 - f) * d, -a, b / 2 - f), e.quadraticCurveTo(-a, b / 2, -a + f, b / 2),
        e.lineTo(.5, b / 2), e.quadraticCurveTo(a / 2, b / 2 * d, a / 2, 0); else if ("comfort" == c) {
        f = a / 3;
        e.moveTo(a / 2 - f, -b / 2), e.lineTo(-a / 6, -b / 2), e.quadraticCurveTo(-a / 2, -b / 2 * d, -a / 2, 0),
            e.quadraticCurveTo(-a / 2, b / 2 * d, -a / 6, b / 2), e.lineTo(a / 2 - f, b / 2),
            e.quadraticCurveTo(a / 2, b / 2, a / 2, b / 2 - f), e.lineTo(a / 2, -b / 2 + f),
            e.quadraticCurveTo(a / 2, -b / 2, a / 2 - f, -b / 2);
    } else "court" == c ? (e.moveTo(0, -b / 2), e.quadraticCurveTo(-a / 2, -b / 2, -a / 2, 0),
        e.quadraticCurveTo(-a / 2, b / 2, 0, b / 2), e.quadraticCurveTo(a / 2, b / 2, a / 2, 0),
        e.quadraticCurveTo(a / 2, -b / 2, 0, -b / 2)) : "double convex" == c && (e.moveTo(a / 4, -b / 2),
        e.lineTo(-a / 4, -b / 2), e.quadraticCurveTo(-a / 2, -b / 2, -a / 2, 0), e.quadraticCurveTo(-a / 2, b / 2, -a / 4, b / 2),
        e.lineTo(a / 4, b / 2), e.quadraticCurveTo(a / 2, b / 2, a / 2, 0), e.quadraticCurveTo(a / 2, -b / 2, a / 4, -b / 2));
    return e;
}

function convertFlatToRing(a, b, c) {
    for (var d = a.clone(), e = 0; e < a.vertices.length; e++) {
        var f = 2 * Math.PI * a.vertices[e].x / c, g = b + a.vertices[e].y;
        d.vertices[e].x = g * Math.sin(f), d.vertices[e].y = g * Math.cos(f);
    }
    return d;
}

function genArrowDualGeometry(a, b) {
    var c = a || 60, d = b || 5, e = new THREE.CylinderGeometry(d, d, c, 8, Math.ceil(c / 4), !1), f = new THREE.CylinderGeometry(1, 1.4 * d, 10, 8, 4, !1), g = new THREE.Mesh(f), h = new THREE.CylinderGeometry(1.4 * d, 1, 10, 8, 4, !1), i = new THREE.Mesh(h);
    return g.position.y += c / 2 + 5, i.position.y -= c / 2 + 5, THREE.GeometryUtils.merge(e, g),
        THREE.GeometryUtils.merge(e, i), e;
}

function genTextureMarkerGeometry() {
    for (var a = new THREE.PlaneGeometry(30, 50, 6, 10), b = 0; b < a.vertices.length; b++) a.vertices[b].z = 10 * Math.random();
    var c = new THREE.CubeGeometry(30, 50, 1, 1, 1, 1);
    return THREE.GeometryUtils.merge(a, c), a;
}


function genCircleNurbsPath(a, b) {
    var c = [];
    b = void 0 === b || b;
    return c.push(new THREE.Vector4(0, a, 0, 1)), c.push(new THREE.Vector4(a, a, 0, .707)),
        c.push(new THREE.Vector4(a, 0, 0, 1)), c.push(new THREE.Vector4(a, -a, 0, .707)),
        c.push(new THREE.Vector4(0, -a, 0, 1)), c.push(new THREE.Vector4(-a, -a, 0, .707)),
        c.push(new THREE.Vector4(-a, 0, 0, 1)), c.push(new THREE.Vector4(-a, a, 0, .707)),
        c.push(new THREE.Vector4(0, a, 0, 1)), b || (c = c.reverse()), new THREE.NURBSCurve(2, [ 0, 0, 0, .25, .25, .5, .5, .75, .75, 1, 1, 1 ], c);
}