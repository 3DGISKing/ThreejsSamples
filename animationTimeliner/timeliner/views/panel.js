import { LayoutConstants }  from '../layout_constants.js'
import { Theme }  from '../theme.js'
import { utils }  from '../utils/utils.js'
import { Tweens }  from '../utils/util_tween.js'
import { handleDrag }  from '../utils/util_handle_drag.js'
import { ScrollCanvas }  from './time_scroller.js'
import { Canvas }  from '../ui/canvas.js'

const proxy_ctx  = utils.proxy_ctx;

let
	LINE_HEIGHT = LayoutConstants.LINE_HEIGHT,
	DIAMOND_SIZE = LayoutConstants.DIAMOND_SIZE,
	TIME_SCROLLER_HEIGHT = 35,
	MARKER_TRACK_HEIGHT = 25,
	LEFT_PANE_WIDTH = LayoutConstants.LEFT_PANE_WIDTH,
	time_scale = LayoutConstants.time_scale,
	TOP = 10;


let frame_start = 0; // this is the current scroll position.


/*
 * This class contains the view for the right main section of timeliner
 */


// TODO
// dirty rendering
// drag block
// DON'T use time.update for everything

let tickMark1;
let tickMark2;
let tickMark3;

function time_scaled() {
	/*
	 * Subdivison LOD
	 * time_scale refers to number of pixels per unit
	 * Eg. 1 inch - 60s, 1 inch - 60fps, 1 inch - 6 mins
	 */
	let div = 60;

	tickMark1 = time_scale / div;
	tickMark2 = 2 * tickMark1;
	tickMark3 = 10 * tickMark1;

}

time_scaled();


/**************************/
// Timeline Panel
/**************************/

function TimelinePanel(data, dispatcher) {
	let dpr = window.devicePixelRatio;
	let track_canvas = document.createElement('canvas');

	let scrollTop = 0, scrollLeft = 0, SCROLL_HEIGHT;
	let layers = data.get('layers').value;

	this.scrollTo = function(s, y) {
		scrollTop = s * Math.max(layers.length * LINE_HEIGHT - SCROLL_HEIGHT, 0);
		repaint();
	};

	this.resize = function() {
		let h = (LayoutConstants.height - TIME_SCROLLER_HEIGHT);
		dpr = window.devicePixelRatio;
		track_canvas.width = LayoutConstants.width * dpr;
		track_canvas.height = h * dpr;
		track_canvas.style.width = LayoutConstants.width + 'px';
		track_canvas.style.height = h + 'px';
		SCROLL_HEIGHT = LayoutConstants.height - TIME_SCROLLER_HEIGHT;
		scroll_canvas.setSize(LayoutConstants.width, TIME_SCROLLER_HEIGHT);
	};

	let div = document.createElement('div');

	let scroll_canvas = new Canvas(LayoutConstants.width, TIME_SCROLLER_HEIGHT);
	// data.addListener('ui', repaint );

	utils.style(track_canvas, {
		position: 'absolute',
		top: TIME_SCROLLER_HEIGHT + 'px',
		left: '0px'
	});

	utils.style(scroll_canvas.dom, {
		position: 'absolute',
		top: '0px',
		left: '10px'
	});

	scroll_canvas.uses(new ScrollCanvas(dispatcher, data));

	div.appendChild(track_canvas);
	div.appendChild(scroll_canvas.dom);
	scroll_canvas.dom.id = 'scroll-canvas';
	track_canvas.id = 'track-canvas';

	// this.dom = canvas;
	this.dom = div;
	this.dom.id = 'timeline-panel';
	this.resize();

	let ctx = track_canvas.getContext('2d');
	let ctx_wrap = proxy_ctx(ctx);

	let currentTime; // measured in seconds
	// technically it could be in frames or  have it in string format (0:00:00:1-60)

	let LEFT_GUTTER = 20;
	let i, x, y, il, j;

	let needsRepaint = false;
	let renderItems = [];

	function EasingRect(x1, y1, x2, y2, frame, frame2, values, layer, j) {
		let self = this;

		this.path = function() {
			ctx_wrap.beginPath()
				.rect(x1, y1, x2-x1, y2-y1)
				.closePath();
		};

		this.paint = function() {
			this.path();
			ctx.fillStyle = frame._color;
			ctx.fill();
		};

		this.mouseover = function() {
			track_canvas.style.cursor = 'pointer'; // pointer move ew-resize
		};

		this.mouseout = function() {
			track_canvas.style.cursor = 'default';
		};

		this.mousedrag = function(e) {
			let t1 = x_to_time(x1 + e.dx);
			t1 = Math.max(0, t1);
			// TODO limit moving to neighbours
			frame.time = t1;

			let t2 = x_to_time(x2 + e.dx);
			t2 = Math.max(0, t2);
			frame2.time = t2;

			// dispatcher.fire('time.update', t1);
		};
	}

	function Diamond(frame, y) {
		let x, y2;

		x = time_to_x(frame.time);
		y2 = y + LINE_HEIGHT * 0.5  - DIAMOND_SIZE / 2;

		let self = this;

		let isOver = false;

		this.path = function(ctx_wrap) {
			ctx_wrap
				.beginPath()
				.moveTo(x, y2)
				.lineTo(x + DIAMOND_SIZE / 2, y2 + DIAMOND_SIZE / 2)
				.lineTo(x, y2 + DIAMOND_SIZE)
				.lineTo(x - DIAMOND_SIZE / 2, y2 + DIAMOND_SIZE / 2)
				.closePath();
		};

		this.paint = function(ctx_wrap) {
			self.path(ctx_wrap);
			if (!isOver)
				ctx_wrap.fillStyle(Theme.c);
			else
				ctx_wrap.fillStyle('yellow'); // Theme.d

			ctx_wrap.fill()
				.stroke();
		};

		this.mouseover = function() {
			isOver = true;
			track_canvas.style.cursor = 'move'; // pointer move ew-resize
			self.paint(ctx_wrap);
		};

		this.mouseout = function() {
			isOver = false;
			track_canvas.style.cursor = 'default';
			self.paint(ctx_wrap);
		};

		this.mousedrag = function(e) {
			let t = x_to_time(x + e.dx);
			t = Math.max(0, t);
			// TODO limit moving to neighbours
			frame.time = t;
			dispatcher.fire('time.update', t);
			// console.log('frame', frame);
			// console.log(s, format_friendly_seconds(s), this);
		};

	}

	function repaint() {
		needsRepaint = true;
	}


	function drawLayerContents() {
		renderItems = [];
		// horizontal Layer lines
		for (i = 0, il = layers.length; i <= il; i++) {
			ctx.strokeStyle = Theme.b;
			ctx.beginPath();
			y = i * LINE_HEIGHT;
			y = ~~y - 0.5;

			ctx_wrap
				.moveTo(0, y)
				.lineTo(LayoutConstants.width, y)
				.stroke();
		}


		let frame, frame2, j;

		// Draw Easing Rects
		for (i = 0; i < il; i++) {
			// check for keyframes
			let layer = layers[i];
			let values = layer.values;

			y = i * LINE_HEIGHT;

			for (j = 0; j < values.length - 1; j++) {
				frame = values[j];
				frame2 = values[j + 1];

				// Draw Tween Rect
				let x = time_to_x(frame.time);
				let x2 = time_to_x(frame2.time);

				if (!frame.tween || frame.tween == 'none') continue;

				let y1 = y + 2;
				let y2 = y + LINE_HEIGHT - 2;

				renderItems.push(new EasingRect(x, y1, x2, y2, frame, frame2));

				// // draw easing graph
				// let color = parseInt(frame._color.substring(1,7), 16);
				// color = 0xffffff ^ color;
				// color = color.toString(16);           // convert to hex
				// color = '#' + ('000000' + color).slice(-6);

				// ctx.strokeStyle = color;
				// let x3;
				// ctx.beginPath();
				// ctx.moveTo(x, y2);
				// let dy = y1 - y2;
				// let dx = x2 - x;

				// for (x3=x; x3 < x2; x3++) {
				// 	ctx.lineTo(x3, y2 + Tweens[frame.tween]((x3 - x)/dx) * dy);
				// }
				// ctx.stroke();
			}

			for (j = 0; j < values.length; j++) {
				// Dimonds
				frame = values[j];
				renderItems.push(new Diamond(frame, y));
			}
		}

		// render items
		let item;
		for (i = 0, il = renderItems.length; i < il; i++) {
			item = renderItems[i];
			item.paint(ctx_wrap);
		}
	}

	function setTimeScale() {

		let v = data.get('ui:timeScale').value;
		if (time_scale !== v) {
			time_scale = v;
			time_scaled();
		}
	}

	let over = null;
	let mousedownItem = null;

	function check() {
		let item;
		let last_over = over;
		// over = [];
		over = null;
		for (i = renderItems.length; i-- > 0;) {
			item = renderItems[i];
			item.path(ctx_wrap);

			if (ctx.isPointInPath(pointer.x * dpr, pointer.y * dpr)) {
				// over.push(item);
				over = item;
				break;
			}
		}

		// clear old mousein
		if (last_over && last_over != over) {
			item = last_over;
			if (item.mouseout) item.mouseout();
		}

		if (over) {
			item = over;
			if (item.mouseover) item.mouseover();

			if (mousedown2) {
				mousedownItem = item;
			}
		}



		// console.log(pointer)
	}

	function pointerEvents() {
		if (!pointer) return;

		ctx_wrap
			.save()
			.scale(dpr, dpr)
			.translate(0, MARKER_TRACK_HEIGHT)
			.beginPath()
			.rect(0, 0, LayoutConstants.width, SCROLL_HEIGHT)
			.translate(-scrollLeft, -scrollTop)
			.clip()
			.run(check)
			.restore();
	}

	function _paint() {
		if (!needsRepaint) {
			pointerEvents();
			return;
		}

		scroll_canvas.repaint();

		setTimeScale();

		currentTime = data.get('ui:currentTime').value;
		frame_start =  data.get('ui:scrollTime').value;

		/**************************/
		// background

		ctx.fillStyle = Theme.a;
		ctx.clearRect(0, 0, track_canvas.width, track_canvas.height);
		ctx.save();
		ctx.scale(dpr, dpr);

		//

		ctx.lineWidth = 1; // .5, 1, 2

		let width = LayoutConstants.width;
		let height = LayoutConstants.height;

		let units = time_scale / tickMark1;
		let offsetUnits = (frame_start * time_scale) % units;

		let count = (width - LEFT_GUTTER + offsetUnits) / units;

		// console.log('time_scale', time_scale, 'tickMark1', tickMark1, 'units', units, 'offsetUnits', offsetUnits, frame_start);

		// time_scale = pixels to 1 second (40)
		// tickMark1 = marks per second (marks / s)
		// units = pixels to every mark (40)

		// labels only
		for (i = 0; i < count; i++) {
			x = i * units + LEFT_GUTTER - offsetUnits;

			// vertical lines
			ctx.strokeStyle = Theme.b;
			ctx.beginPath();
			ctx.moveTo(x, 0);
			ctx.lineTo(x, height);
			ctx.stroke();

			ctx.fillStyle = Theme.d;
			ctx.textAlign = 'center';

			let t = (i * units - offsetUnits) / time_scale + frame_start;
			t = utils.format_friendly_seconds(t);
			ctx.fillText(t, x, 38);
		}

		units = time_scale / tickMark2;
		count = (width - LEFT_GUTTER + offsetUnits) / units;

		// marker lines - main
		for (i = 0; i < count; i++) {
			ctx.strokeStyle = Theme.c;
			ctx.beginPath();
			x = i * units + LEFT_GUTTER - offsetUnits;
			ctx.moveTo(x, MARKER_TRACK_HEIGHT - 0);
			ctx.lineTo(x, MARKER_TRACK_HEIGHT - 16);
			ctx.stroke();
		}

		let mul = tickMark3 / tickMark2;
		units = time_scale / tickMark3;
		count = (width - LEFT_GUTTER + offsetUnits) / units;

		// small ticks
		for (i = 0; i < count; i++) {
			if (i % mul === 0) continue;
			ctx.strokeStyle = Theme.c;
			ctx.beginPath();
			x = i * units + LEFT_GUTTER - offsetUnits;
			ctx.moveTo(x, MARKER_TRACK_HEIGHT - 0);
			ctx.lineTo(x, MARKER_TRACK_HEIGHT - 10);
			ctx.stroke();
		}

		// Encapsulate a scroll rect for the layers
		ctx_wrap
			.save()
			.translate(0, MARKER_TRACK_HEIGHT)
			.beginPath()
			.rect(0, 0, LayoutConstants.width, SCROLL_HEIGHT)
			.translate(-scrollLeft, -scrollTop)
			.clip()
			.run(drawLayerContents)
			.restore();

		// Current Marker / Cursor
		ctx.strokeStyle = 'red'; // Theme.c
		x = (currentTime - frame_start) * time_scale + LEFT_GUTTER;

		let txt = utils.format_friendly_seconds(currentTime);
		let textWidth = ctx.measureText(txt).width;

		let base_line = MARKER_TRACK_HEIGHT - 5, half_rect = textWidth / 2 + 4;

		ctx.beginPath();
		ctx.moveTo(x, base_line);
		ctx.lineTo(x, height);
		ctx.stroke();

		ctx.fillStyle = 'red'; // black
		ctx.textAlign = 'center';
		ctx.beginPath();
		ctx.moveTo(x, base_line + 5);
		ctx.lineTo(x + 5, base_line);
		ctx.lineTo(x + half_rect, base_line);
		ctx.lineTo(x + half_rect, base_line - 14);
		ctx.lineTo(x - half_rect, base_line - 14);
		ctx.lineTo(x - half_rect, base_line);
		ctx.lineTo(x - 5, base_line);
		ctx.closePath();
		ctx.fill();

		ctx.fillStyle = 'white';
		ctx.fillText(txt, x, base_line - 4);

		ctx.restore();

		needsRepaint = false;
		// pointerEvents();

	}

	function y_to_track(y) {
		if (y - MARKER_TRACK_HEIGHT < 0) return -1;
		return (y - MARKER_TRACK_HEIGHT + scrollTop) / LINE_HEIGHT | 0;
	}


	function x_to_time(x) {
		let units = time_scale / tickMark3;

		// return frame_start + (x - LEFT_GUTTER) / time_scale;

		return frame_start + ((x - LEFT_GUTTER) / units | 0) / tickMark3;
	}

	function time_to_x(s) {
		let ds = s - frame_start;
		ds *= time_scale;
		ds += LEFT_GUTTER;

		return ds;
	}

	let me = this;
	this.repaint = repaint;
	this._paint = _paint;

	repaint();

	let mousedown = false, selection = false;

	let dragObject;
	let canvasBounds;

	document.addEventListener('mousemove', onMouseMove);

	track_canvas.addEventListener('dblclick', function(e) {
		canvasBounds = track_canvas.getBoundingClientRect();
		let mx = e.clientX - canvasBounds.left , my = e.clientY - canvasBounds.top;


		let track = y_to_track(my);
		let s = x_to_time(mx);


		dispatcher.fire('keyframe', layers[track], currentTime);

	});

	function onMouseMove(e) {
		canvasBounds = track_canvas.getBoundingClientRect();
		let mx = e.clientX - canvasBounds.left , my = e.clientY - canvasBounds.top;
		onPointerMove(mx, my);
	}

	let pointerdidMoved = false;
	let pointer = null;

	function onPointerMove(x, y) {
		if (mousedownItem) return;
		pointerdidMoved = true;
		pointer = { x: x, y: y };
	}

	track_canvas.addEventListener('mouseout', function() {
		pointer = null;
	});

	let mousedown2 = false, mouseDownThenMove = false;
	handleDrag(track_canvas, function down(e) {
		mousedown2 = true;
		pointer = {
			x: e.offsetx,
			y: e.offsety
		};
		pointerEvents();

		if (!mousedownItem) dispatcher.fire('time.update', x_to_time(e.offsetx));
		// Hit criteria
	}, function move(e) {
		mousedown2 = false;
		if (mousedownItem) {
			mouseDownThenMove = true;
			if (mousedownItem.mousedrag) {
				mousedownItem.mousedrag(e);
			}
		} else {
			dispatcher.fire('time.update', x_to_time(e.offsetx));
		}
	}, function up(e) {
		if (mouseDownThenMove) {
			dispatcher.fire('keyframe.move');
		}
		else {
			dispatcher.fire('time.update', x_to_time(e.offsetx));
		}
		mousedown2 = false;
		mousedownItem = null;
		mouseDownThenMove = false;
	}
	);

	this.setState = function(state) {
		layers = state.value;
		repaint();
	};

}

export { TimelinePanel }
