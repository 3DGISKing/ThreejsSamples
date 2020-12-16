window.App = (function() {
    const images = {
        info : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAAERnUMDAAABv1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8CUf3FAAAAlHRSTlMAAQMEBQcICgwNDg8REhQVFxkaGxwdHh8jJCYnKi0uLzIzNDY3ODk7PT4/QERFRkpLTU5PUVZYXV5gYmNlaGlrbW5yc3R2d3h5en2AgoOEhYmKi42QkZKTlZaXmJuhoqOkp62xsrO0ubq8vb/BxsnKy8zNz9LU1dnb3d/g4eLk5ebn6Ors7fDx8vP09ff4+fr7/P3+uL5JKQAAB9tJREFUeNrtWutfHDUUvZSKIFAeSxGoiFBFWaDWyoKvikitBdsipdAqaAuLFsVakMoqooDglpcI3fMH+yEzO0kmmZnMDI+f9n5od/I4uUlu7j03gUgjRQDAfdewj/p8Gfrzv6wWHzutwf17/q38R5FV61RDHLXALtmzB8/k29gls64SIqJ6GVmE5hUSfkIusEGE2VNBZpa8JQfgNoe/LaoIvSoEIkrzlVmngfOfuFQgahBGAFG7potHASXlReKGSQ6Lqi7vWT9GkCCiKUGjsa0OMpc0AAyeK2mfk+yNybpclhQL1lGnAAVUP6U2I8I+2a2FbbnO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",
        link: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAAERnUMDAAABa1BMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+JdpW7AAAAeHRSTlMAAQIDBAUGCAkMDQ4PERIUFRcYGRobHB0eIyQmJy0vMjM0Njk+P0BERUZHSUtMTlBRVlhdZWZoa25yc3l6fH2Cg4SGio2QkZKWl5ibn6OkpaeorbGyubq7vr/Gy8zP0dLV2d/h5OXm5+rr7PDx8vP09ff5+vv8/f4Urz19AAAIBElEQVR42u1a+V8TOxCfCoIiKlhQDqWgXIoihYfwQJFLy+EFVbSCSjkL5T7s989/P2S3m80mu0nZPvp5z/mF7Wzy3UkymflOApFCKgGA+32X/WjK6zCSf7Ja/O20Bv/CUVVaj85rEBHF8t+KWBrAVqU9mpSl+eaysImIaJxD9n7dpYLwl3sHcEZaEkmnyF9yAN5w+IfkQoHP3ICIkjxW1mmGWbuJMw2WollUdIoKSBUEbpo6xEniDOuYcpu6fmI9TKOeiBZdM5Q46CJzSQLA2P2qzmXB35hkRF2HW5FBowQUkD0KbaZd6yRt8pqta16xAMcLiYions3YmPM1W3rzqgQRocrbwnG8fSLCsrfFu7yqi4je8oNiUmYrFuE/WKpGwHysg3znrAMnwhRn3fiY8nZ6LRltEeSN9YlcpWIdASx3Vt0fA4Ck9H2T8+sQuOtp0CEqMiqHs2XEpZOOv5FDUUzQSN6W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",
        photo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIQAAACECAMAAAERnUMDAAACLlBMVEUAAAD///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8hUBqnAAAAuXRSTlMAAQIDBAUHCAkKCwwNDxAREhMUFRYXGBkaGxwdHh8gIyQlJicqKywtLi8wMzQ2Nzg5Oz0+P0BBREVGR0tMTlFSU1RVVldYWltcXV5iY2VoaWttbnByc3R4eXp7fH1+gIKDhIaHioyNj5CRkpOUmJufoaKjpKWnqKmrrbGys7W4ubq/wcLDxcbIy8zNzs/R0tPU1dbY2drb3N3e3+Dh4uTl5ufo6err7O3u7/Dx8vP09fb3+Pn6+/z9/ifJSksAAAp0SURBVHja7ZvtfxTVFcd/kUhqSSoGYxKgAdGIEaggxKACbV1BbW0ESlps043QFCUKVBErQTRR1EBTlRpppdiAImIISTEhu9//ri/uPN3Zmd3Z7CD5tJ4XYebOuWfO3Hse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"
    };

    function App(options) {
        this._initLookAtPosition = options.initLookAtPosition;

        this._init();
    }

    App.prototype._init = function () {
        this._panorama = new PANOLENS.ImagePanorama('./images/panorama.jpg');
        const viewer = new PANOLENS.Viewer({
            output: 'console',
            autoHideInfospot: false	// disable Auto hide info spots
        });

        viewer.add(this._panorama);

        $('.close').click(function () {
            $('#information_dialog').hide();
        });

        const lookAtPosition = new THREE.Vector3(this._initLookAtPosition[0], this._initLookAtPosition[1], this._initLookAtPosition[2]);

        this._panorama.addEventListener( 'enter-fade-start', function(){
            viewer.tweenControlCenter( lookAtPosition, 0);
        } );

        const northPositionStart = 90;

        viewer.getControl().addEventListener('change',function() {
            const y = viewer.getCamera().rotation.y;

            let dy;

            if (y < 0)
                dy = THREE.Math.radToDeg(y + (2 * Math.PI));

            else
                 dy = THREE.Math.radToDeg(y);

            dy = Math.round(dy) - northPositionStart;

            console.log(`dy=${dy}`);

            $("#compass").rotate(dy);
        });

        $('#panorama-explanation-top-left-button').click(() => {
            $('#panorama-explanation-top-left').hide();
        });

        $('.announcement-close').click(() => {
            $('#announcement').hide();

            $(".announcement-show-button").show();
        });

        $('.announcement-show-button').click(() => {
            $('#announcement').show();
            $(".announcement-show-button").hide();
        });
    };

    App.prototype._initPopupDialog = function() {
        jQuery('#information').html('');
        jQuery('#photo').attr('src', '');
    };

    App.prototype.addInformationInfospot = function (x, y, z, title, description) {
        let informationInfospot;

        informationInfospot = new PANOLENS.Infospot(400, images.info);
        informationInfospot.position.set(x, y, z);
        informationInfospot.addHoverText(title);
        informationInfospot.lockHoverElement();

        informationInfospot.addEventListener( "click", () => {
            this._initPopupDialog();

            jQuery('#title').html(title);
            jQuery('#information').html(description);

            $('#information_dialog').show();
        } );

        this._panorama.add(informationInfospot);

        informationInfospot.element._width = informationInfospot.element.clientWidth;
        informationInfospot.element._height = informationInfospot.element.clientHeight;
    };

    App.prototype.addLinkInfospot = function (x, y, z, title, link) {
        let linkInfoSpot;

        linkInfoSpot = new PANOLENS.Infospot(600, images.link);

        linkInfoSpot.position.set(x, y, z);
        linkInfoSpot.addHoverText(title);
        linkInfoSpot.lockHoverElement();

        linkInfoSpot.addEventListener('click', function () {
            window.open(link);
        });

        this._panorama.add(linkInfoSpot);

        linkInfoSpot.element._width = linkInfoSpot.element.clientWidth;
        linkInfoSpot.element._height = linkInfoSpot.element.clientHeight;
    };

    App.prototype.addPhotoInfospot = function (x, y, z, title, imgSrc) {
        let photoInfoSpot;

        photoInfoSpot = new PANOLENS.Infospot(600, images.photo);
        photoInfoSpot.position.set(x, y, z);
        photoInfoSpot.addHoverText(title);
        photoInfoSpot.lockHoverElement();

        photoInfoSpot.addEventListener('click', () => {
            this._initPopupDialog();

            jQuery('#title').html(title);
            jQuery('#photo').attr('src', imgSrc);
            $('#information_dialog').show();
        });

        this._panorama.add(photoInfoSpot);

        photoInfoSpot.element._width = photoInfoSpot.element.clientWidth;
        photoInfoSpot.element._height = photoInfoSpot.element.clientHeight;
    };

    App.prototype.setPanoramaExplanation = function(s) {
        jQuery('#panorama-explanation').html(s);
    };

    App.prototype.setPanoramaExplanationTopLeft = function(s) {
        jQuery('#panorama-explanation-top-left-content').html(s);
    };

    window.matLines = [];

    App.prototype.addLine = function(points, lineWidth, color, imgSrc, title) {
        let x = 0, y = 0, z = 0;

        for(let i = 0; i < points.length / 3; i++) {
            // we invert y. I do not know why
            points[i * 3] = -points[i * 3];

            x += points[i * 3];
            y += points[i * 3 + 1];
            z += points[i * 3 + 2];
        }

        x /= points.length / 3 ;
        y /= points.length / 3;
        z /= points.length / 3;

        // I do not know why.
        x = -x;

        let photoInfoSpot;

        photoInfoSpot = new PANOLENS.Infospot(600, images.photo);
        photoInfoSpot.position.set(x, y, z);
        photoInfoSpot.addHoverText(title);
        photoInfoSpot.lockHoverElement();

        photoInfoSpot.addEventListener('click', () => {
            this._initPopupDialog();

            jQuery('#title').html(title);
            jQuery('#photo').attr('src', imgSrc);
            $('#information_dialog').show();
        });

        this._panorama.add(photoInfoSpot);

        photoInfoSpot.element._width = photoInfoSpot.element.clientWidth;
        photoInfoSpot.element._height = photoInfoSpot.element.clientHeight;

        var geometry = new THREE.LineGeometry();

        geometry.setPositions(points);

        //geometry.setColors( colors );

        var matLine = new THREE.LineMaterial( {
            color: color,
            linewidth: lineWidth, // in pixels
            vertexColors: false,
            //resolution:  // to be set by renderer, eventually
            dashed: false
        } );

        window.matLines.push(matLine);

        let line = new THREE.Line2( geometry, matLine );
        line.computeLineDistances();
        line.scale.set( 1, 1, 1 );
        this._panorama.add(line);

        line.addEventListener('click', () => {
            this._initPopupDialog();

            jQuery('#title').html("");
            jQuery('#photo').attr('src', imgSrc);
            $('#information_dialog').show();
        });

    };

    App.prototype.addLineWithOnlyText = function(points, lineWidth, color, title) {
        let x = 0, y = 0, z = 0;

        for(let i = 0; i < points.length / 3; i++) {
            // we invert y. I do not know why
            points[i * 3] = -points[i * 3];

            x += points[i * 3];
            y += points[i * 3 + 1];
            z += points[i * 3 + 2];
        }

        x /= points.length / 3 ;
        y /= points.length / 3;
        z /= points.length / 3;

        // I do not know why.
        x = -x;

        let photoInfoSpot;

        photoInfoSpot = new PANOLENS.Infospot(1, images.info);
        photoInfoSpot.position.set(x, y, z);
        photoInfoSpot.addHoverText(title);
        photoInfoSpot.lockHoverElement();

        this._panorama.add(photoInfoSpot);

        photoInfoSpot.element._width = photoInfoSpot.element.clientWidth;
        photoInfoSpot.element._height = photoInfoSpot.element.clientHeight;

        var geometry = new THREE.LineGeometry();

        geometry.setPositions(points);

        //geometry.setColors( colors );

        var matLine = new THREE.LineMaterial( {
            color: color,
            linewidth: lineWidth, // in pixels
            vertexColors: false,
            //resolution:  // to be set by renderer, eventually
            dashed: false
        } );

        window.matLines.push(matLine);

        let line = new THREE.Line2( geometry, matLine );
        line.computeLineDistances();
        line.scale.set( 1, 1, 1 );
        this._panorama.add(line);

        line.addEventListener('click', () => {
            this._initPopupDialog();

            jQuery('#title').html("");
            jQuery('#photo').attr('src', imgSrc);
            $('#information_dialog').show();
        });

    };

    App.prototype.addText = function (x, y, z, title) {
        let informationInfospot;

        informationInfospot = new PANOLENS.Infospot(1, images.info);
        informationInfospot.position.set(x, y, z);
        informationInfospot.addHoverText(title);
        informationInfospot.lockHoverElement();

        this._panorama.add(informationInfospot);

        informationInfospot.element._width = informationInfospot.element.clientWidth;
        informationInfospot.element._height = informationInfospot.element.clientHeight;
    };

    return App;
})();











