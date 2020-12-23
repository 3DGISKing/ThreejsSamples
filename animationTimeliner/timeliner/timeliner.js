/*
 * @author Joshua Koo http://joshuakoo.com
 */

const TIMELINER_VERSION = "2.0.0-dev";

import { UndoManager, UndoState } from './utils/util_undo.js'
import { Dispatcher } from './utils/util_dispatcher.js'
import { Theme } from './theme.js'
import { LayoutConstants as Settings } from './layout_constants.js';
import { utils } from './utils/utils.js'
import { LayerCabinet } from './views/layer_cabinet.js'
import { TimelinePanel } from './views/panel.js'
import { IconButton } from './ui/icon_button.js'
var style = utils.style;
var saveToFile = utils.saveToFile;
var openAs = utils.openAs;
var STORAGE_PREFIX = utils.STORAGE_PREFIX;
import { ScrollBar } from './ui/scrollbar.js'
import { DataStore } from './utils/util_datastore.js'
import { DockingWindow } from './utils/docking_window.js'

var Z_INDEX = 999;

function LayerProp(name, label) {
	this.name = name;
	this.label = label;
	this.values = [];

	this._value = 0;

	this._color = '#' + (Math.random() * 0xffffff | 0).toString(16);
	/*
	this.max
	this.min
	this.step
	*/
}

function Timeliner(target) {
	// Dispatcher for coordination
	var dispatcher = new Dispatcher();

	// Data
	const dataStore = new DataStore();
	const layerStore = dataStore.get('layers');
	let layers = layerStore.value;

	window._data = dataStore; // expose it for debugging

	// Undo manager
	var undo_manager = new UndoManager(dispatcher);

	// Views
	var timeline = new TimelinePanel(dataStore, dispatcher);
	var layerPanel = new LayerCabinet(dataStore, dispatcher);

	setTimeout(function() {
		// hack!
		undo_manager.save(new UndoState(dataStore, 'Loaded'), true);
	});

	dispatcher.on('keyframe', function(layer, value) {
		var index = layers.indexOf(layer);

		var t = dataStore.get('ui:currentTime').value;
		var v = utils.findTimeinLayer(layer, t);

		// console.log(v, '...keyframe index', index, utils.format_friendly_seconds(t), typeof(v));
		// console.log('layer', layer, value);

		if (typeof(v) === 'number') {
			layer.values.splice(v, 0, {
				time: t,
				value: value,
				_color: '#' + (Math.random() * 0xffffff | 0).toString(16)
			});

			undo_manager.save(new UndoState(dataStore, 'Add Keyframe'));
		} else {
			console.log('remove from index', v);
			layer.values.splice(v.index, 1);

			undo_manager.save(new UndoState(dataStore, 'Remove Keyframe'));
		}

		repaintAll();

	});

	dispatcher.on('keyframe.move', function(layer, value) {
		undo_manager.save(new UndoState(dataStore, 'Move Keyframe'));
	});

	// dispatcher.fire('value.change', layer, me.value);
	dispatcher.on('value.change', function(layer, value, dont_save) {
		if (layer._mute) return;

		var t = dataStore.get('ui:currentTime').value;
		var v = utils.findTimeinLayer(layer, t);

		// console.log(v, 'value.change', layer, value, utils.format_friendly_seconds(t), typeof(v));
		if (typeof(v) === 'number') {
			layer.values.splice(v, 0, {
				time: t,
				value: value,
				_color: '#' + (Math.random() * 0xffffff | 0).toString(16)
			});
			if (!dont_save) undo_manager.save(new UndoState(dataStore, 'Add value'));
		} else {
			v.object.value = value;
			if (!dont_save) undo_manager.save(new UndoState(dataStore, 'Update value'));
		}

		repaintAll();
	});

	dispatcher.on('action:solo', function(layer, solo) {
		layer._solo = solo;

		console.log(layer, solo);

		// When a track is solo-ed, playback only changes values
		// of that layer.
	});

	dispatcher.on('action:mute', function(layer, mute) {
		layer._mute = mute;

		// When a track is mute, playback does not play
		// frames of those muted layers.

		// also feels like hidden feature in photoshop

		// when values are updated, eg. from slider,
		// no tweens will be created.
		// we can decide also to "lock in" layers
		// no changes to tween will be made etc.
	});

	dispatcher.on('ease', function(layer, ease_type) {
		var t = dataStore.get('ui:currentTime').value;
		var v = utils.timeAtLayer(layer, t);
		// console.log('Ease Change > ', layer, value, v);
		if (v && v.entry) {
			v.entry.tween  = ease_type;
		}

		undo_manager.save(new UndoState(dataStore, 'Add Ease'));

		repaintAll();
	});

	var start_play = null,
		played_from = 0; // requires some more tweaking

	dispatcher.on('controls.toggle_play', function() {
		if (start_play) {
			pausePlaying();
		} else {
			startPlaying();
		}
	});

	dispatcher.on('controls.restart_play', function() {
		if (!start_play) {
			startPlaying();
		}

		setCurrentTime(played_from);
	});

	dispatcher.on('controls.play', startPlaying);
	dispatcher.on('controls.pause', pausePlaying);

	function startPlaying() {
		// played_from = timeline.current_frame;
		start_play = performance.now() - dataStore.get('ui:currentTime').value * 1000;
		layerPanel.setControlStatus(true);
		// dispatcher.fire('controls.status', true);
	}

	function pausePlaying() {
		start_play = null;
		layerPanel.setControlStatus(false);
		// dispatcher.fire('controls.status', false);
	}

	dispatcher.on('controls.stop', function() {
		if (start_play !== null) pausePlaying();
		setCurrentTime(0);
	});

	var currentTimeStore = dataStore.get('ui:currentTime');
	dispatcher.on('time.update', setCurrentTime);

	dispatcher.on('totalTime.update', function(value) {
		// context.totalTime = value;
		// controller.setDuration(value);
		// timeline.repaint();
	});

	/* update scroll viewport */
	dispatcher.on('update.scrollTime', function(v) {
		v = Math.max(0, v);
		dataStore.get('ui:scrollTime').value = v;
		repaintAll();
	});

	function setCurrentTime(value) {
		value = Math.max(0, value);
		currentTimeStore.value = value;

		if (start_play) start_play = performance.now() - value * 1000;
		repaintAll();
		// layer_panel.repaint(s);
	}

	dispatcher.on('target.notify', (name, value) => {
		if (target)
			target[name] = value;

		if(!this._threeJsObject)
			return;

		if(target[ThreeJsObjectKeyingSet.PositionX]) {
			this._threeJsObject.position.x = target[ThreeJsObjectKeyingSet.PositionX];
		}

		if(target[ThreeJsObjectKeyingSet.PositionY])
			this._threeJsObject.position.y = target[ThreeJsObjectKeyingSet.PositionY];

		if(target[ThreeJsObjectKeyingSet.PositionZ])
			this._threeJsObject.position.z = target[ThreeJsObjectKeyingSet.PositionZ];

		if(target[ThreeJsObjectKeyingSet.RotationX])
			this._threeJsObject.rotation.x = target[ThreeJsObjectKeyingSet.RotationX];

		if(target[ThreeJsObjectKeyingSet.RotationY])
			this._threeJsObject.rotation.y = target[ThreeJsObjectKeyingSet.RotationY];

		if(target[ThreeJsObjectKeyingSet.RotationZ])
			this._threeJsObject.rotation.z = target[ThreeJsObjectKeyingSet.RotationZ];
	});

	dispatcher.on('update.scale', function(v) {
		console.log('range', v);
		dataStore.get('ui:timeScale').value = v;

		timeline.repaint();
	});

	// handle undo / redo
	dispatcher.on('controls.undo', function() {
		var history = undo_manager.undo();
		dataStore.setJSONString(history.state);

		updateState();
	});

	dispatcher.on('controls.redo', function() {
		var history = undo_manager.redo();
		dataStore.setJSONString(history.state);

		updateState();
	});

	/*
		Paint Routines
	*/

	function paint() {
		requestAnimationFrame(paint);

		if (start_play) {
			var t = (performance.now() - start_play) / 1000;
			setCurrentTime(t);


			if (t > dataStore.get('ui:totalTime').value) {
				// simple loop
				start_play = performance.now();
			}
		}

		if (needsResize) {
			div.style.width = Settings.width + 'px';
			div.style.height = Settings.height + 'px';

			restyle(layerPanel.dom, timeline.dom);

			timeline.resize();
			repaintAll();
			needsResize = false;

			dispatcher.fire('resize');
		}

		timeline._paint();
	}

	paint();

	/*
		End Paint Routines
	*/

	function save(name) {
		if (!name) name = 'autosave';

		var json = dataStore.getJSONString();

		try {
			localStorage[STORAGE_PREFIX + name] = json;
			dispatcher.fire('save:done');
		} catch (e) {
			console.log('Cannot save', name, json);
		}
	}

	function saveAs(name) {
		if (!name) name = dataStore.get('name').value;
		name = prompt('Pick a name to save to (localStorage)', name);
		if (name) {
			dataStore.data.name = name;
			save(name);
		}
	}

	function saveSimply() {
		var name = dataStore.get('name').value;
		if (name) {
			save(name);
		} else {
			saveAs(name);
		}
	}

	function exportJSON() {
		var json = dataStore.getJSONString();
		var ret = prompt('Hit OK to download otherwise Copy and Paste JSON', json);

		console.log(JSON.stringify(dataStore.data, null, '\t'));
		if (!ret) return;

		// make json downloadable
		json = dataStore.getJSONString('\t');
		var fileName = 'timeliner-test' + '.json';

		saveToFile(json, fileName);
	}

	function loadJSONString(o) {
		// should catch and check errors here
		var json = JSON.parse(o);
		load(json);
	}

	/**
	 * @param {object} data
	 */
	function load(data) {
		dataStore.setJSON(data);

		if (dataStore.getValue('ui') === undefined) {
			dataStore.setValue('ui', {
				currentTime: 0,
				totalTime: Settings.default_length,
				scrollTime: 0,
				timeScale: Settings.time_scale
			});
		}

		undo_manager.clear();
		undo_manager.save(new UndoState(dataStore, 'Loaded'), true);

		updateState();
	}

	function updateState() {
		layers = layerStore.value; // FIXME: support Arrays
		layerPanel.setState(layerStore);
		timeline.setState(layerStore);

		repaintAll();
	}

	function repaintAll() {
		var content_height = layers.length * Settings.LINE_HEIGHT;
		scrollbar.setLength(Settings.TIMELINE_SCROLL_HEIGHT / content_height);

		layerPanel.repaint();
		timeline.repaint();
	}

	function promptImport() {
		var json = prompt('Paste JSON in here to Load');
		if (!json) return;
		console.log('Loading.. ', json);
		loadJSONString(json);
	}

	function open(title) {
		if (title) {
			loadJSONString(localStorage[STORAGE_PREFIX + title]);
		}
	}

	this.openLocalSave = open;

	dispatcher.on('import', function() {
		promptImport();
	}.bind(this));

	dispatcher.on('new', function() {
		dataStore.blank();
		updateState();
	});

	dispatcher.on('openfile', function() {
		openAs(function(data) {
			// console.log('loaded ' + data);
			loadJSONString(data);
		}, div);
	});

	dispatcher.on('open', open);
	dispatcher.on('export', exportJSON);

	dispatcher.on('save', saveSimply);
	dispatcher.on('save_as', saveAs);

	// Expose API
	this.save = save;
	this.load = load;

	/*
		Start DOM Stuff (should separate file)
	*/

	var div = document.createElement('div');

	style(div, {
		textAlign: 'left',
		lineHeight: '1em',
		position: 'absolute',
		top: '22px'
	});

	var pane = document.createElement('div');

	style(pane, {
		position: 'fixed',
		top: '20px',
		left: '20px',
		margin: 0,
		border: '1px solid ' + Theme.a,
		padding: 0,
		overflow: 'hidden',
		backgroundColor: Theme.a,
		color: Theme.d,
		zIndex: Z_INDEX,
		fontFamily: 'monospace',
		fontSize: '12px'
	});


	var header_styles = {
		position: 'absolute',
		top: '0px',
		width: '100%',
		height: '22px',
		lineHeight: '22px',
		overflow: 'hidden'
	};

	var button_styles = {
		width: '20px',
		height: '20px',
		padding: '2px',
		marginRight: '2px'
	};

	let pane_title = document.createElement('div');

	pane_title.id = "pane-title";

	style(pane_title, header_styles, {
		borderBottom: '1px solid ' + Theme.b,
		textAlign: 'center'
	});

	let title_bar = document.createElement('span');

	pane_title.appendChild(title_bar);

	title_bar.innerHTML = 'Animation Editor';
	pane_title.appendChild(title_bar);

	var top_right_bar = document.createElement('div');
	style(top_right_bar, header_styles, {
		textAlign: 'right'
	});

	pane_title.appendChild(top_right_bar);

	// resize minimize
	// var resize_small = new IconButton(10, 'resize_small', 'minimize', dispatcher);
	// top_right_bar.appendChild(resize_small.dom);

	// resize full
	var resize_full = new IconButton(10, 'resize_full', 'maximize', dispatcher);
	style(resize_full.dom, button_styles, { marginRight: '2px' });
	top_right_bar.appendChild(resize_full.dom);

	var pane_status = document.createElement('div');

	pane_status.id = "pane_status";

	var footer_styles = {
		position: 'absolute',
		width: '100%',
		height: '22px',
		lineHeight: '22px',
		bottom: '0',
		// padding: '2px',
		background: Theme.a,
		fontSize: '11px'
	};

	style(pane_status, footer_styles, {
		borderTop: '1px solid ' + Theme.b,
	});

	pane.appendChild(div);
	pane.appendChild(pane_status);
	pane.appendChild(pane_title);

	var label_status = document.createElement('span');
	label_status.textContent = 'hello!';
	label_status.style.marginLeft = '10px';

	this.setStatus = function(text) {
		label_status.textContent = text;
	};

	dispatcher.on('state:save', function(description) {
		dispatcher.fire('status', description);
		save('autosave');
	});

	dispatcher.on('status', this.setStatus);

	var bottom_right = document.createElement('div');
	style(bottom_right, footer_styles, {
		textAlign: 'right'
	});


	// var button_save = document.createElement('button');
	// style(button_save, button_styles);
	// button_save.textContent = 'Save';
	// button_save.onclick = function() {
	// 	save();
	// };

	// var button_load = document.createElement('button');
	// style(button_load, button_styles);
	// button_load.textContent = 'Import';
	// button_load.onclick = this.promptLoad;

	// var button_open = document.createElement('button');
	// style(button_open, button_styles);
	// button_open.textContent = 'Open';
	// button_open.onclick = this.promptOpen;


	// bottom_right.appendChild(button_load);
	// bottom_right.appendChild(button_save);
	// bottom_right.appendChild(button_open);

	pane_status.appendChild(label_status);
	pane_status.appendChild(bottom_right);


	/**/
	// zoom in
	var zoom_in = new IconButton(12, 'zoom_in', 'zoom in', dispatcher);
	// zoom out
	var zoom_out = new IconButton(12, 'zoom_out', 'zoom out', dispatcher);
	// settings
	var cog = new IconButton(12, 'cog', 'settings', dispatcher);

	// bottom_right.appendChild(zoom_in.dom);
	// bottom_right.appendChild(zoom_out.dom);
	// bottom_right.appendChild(cog.dom);

	// add layer
	var plus = new IconButton(12, 'plus', 'New Layer', dispatcher);
	plus.onClick(function() {
		var name = prompt('Layer name?');
		addLayer(name);

		undo_manager.save(new UndoState(dataStore, 'Layer added'));

		repaintAll();
	});
	style(plus.dom, button_styles);
	bottom_right.appendChild(plus.dom);


	// trash
	var trash = new IconButton(12, 'trash', 'Delete save', dispatcher);
	trash.onClick(function() {
		var name = dataStore.get('name').value;
		if (name && localStorage[STORAGE_PREFIX + name]) {
			var ok = confirm('Are you sure you wish to delete ' + name + '?');
			if (ok) {
				delete localStorage[STORAGE_PREFIX + name];
				dispatcher.fire('status', name + ' deleted');
				dispatcher.fire('save:done');
			}
		}
	});
	style(trash.dom, button_styles, { marginRight: '2px' });
	bottom_right.appendChild(trash.dom);


	// pane_status.appendChild(document.createTextNode(' | TODO <Dock Full | Dock Botton | Snap Window Edges | zoom in | zoom out | Settings | help>'));

	/*
			End DOM Stuff
	*/

	var ghostpane = document.createElement('div');
	ghostpane.id = 'ghostpane';
	style(ghostpane, {
		background: '#999',
		opacity: 0.2,
		position: 'fixed',
		margin: 0,
		padding: 0,
		zIndex: (Z_INDEX - 1),
		// transition: 'all 0.25s ease-in-out',
		transitionProperty: 'top, left, width, height, opacity',
		transitionDuration: '0.25s',
		transitionTimingFunction: 'ease-in-out'
	});


	//
	// Handle DOM Views
	//

	// Shadow Root
	var root = document.createElement('timeliner');
	document.body.appendChild(root);
	if (root.createShadowRoot) root = root.createShadowRoot();

	window.r = root;

	// var iframe = document.createElement('iframe');
	// document.body.appendChild(iframe);
	// root = iframe.contentDocument.body;

	root.appendChild(pane);
	root.appendChild(ghostpane);

	div.appendChild(layerPanel.dom);
	div.appendChild(timeline.dom);

	var scrollbar = new ScrollBar(200, 10);
	div.appendChild(scrollbar.dom);

	// percentages
	scrollbar.onScroll.do(function(type, scrollTo) {
		switch (type) {
		case 'scrollto':
			layerPanel.scrollTo(scrollTo);
			timeline.scrollTo(scrollTo);
			break;
	//		case 'pageup':
	// 			scrollTop -= pageOffset;
	// 			me.draw();
	// 			me.updateScrollbar();
	// 			break;
	// 		case 'pagedown':
	// 			scrollTop += pageOffset;
	// 			me.draw();
	// 			me.updateScrollbar();
	// 			break;
		}
	});



	// document.addEventListener('keypress', function(e) {
	// 	console.log('kp', e);
	// });
	// document.addEventListener('keyup', function(e) {
	// 	if (undo) console.log('UNDO');

	// 	console.log('kd', e);
	// });

	// TODO: Keyboard Shortcuts
	// Esc - Stop and review to last played from / to the start?
	// Space - play / pause from current position
	// Enter - play all
	// k - keyframe

	document.addEventListener('keydown', function(e) {
		var play = e.keyCode == 32; // space
		var enter = e.keyCode == 13; //
		var undo = e.metaKey && e.keyCode == 91 && !e.shiftKey;

		var active = document.activeElement;
		// console.log( active.nodeName );

		if (active.nodeName.match(/(INPUT|BUTTON|SELECT|TIMELINER)/)) {
			active.blur();
		}

		if (play) {
			dispatcher.fire('controls.toggle_play');
		}
		else if (enter) {
			// FIXME: Return should play from the start or last played from?
			dispatcher.fire('controls.restart_play');
			// dispatcher.fire('controls.undo');
		}
		else if (e.keyCode == 27) {
			// Esc = stop. FIXME: should rewind head to last played from or Last pointed from?
			dispatcher.fire('controls.pause');
		}
		else console.log('keydown', e.keyCode);
	});

	var needsResize = true;

	function resize(width, height) {
		// data.get('ui:bounds').value = {
		// 	width: width,
		// 	height: height
		// };
		// TODO: remove ugly hardcodes
		width -= 4;
		height -= 44;

		Settings.width = width - Settings.LEFT_PANE_WIDTH;
		Settings.height = height;

		Settings.TIMELINE_SCROLL_HEIGHT = height - Settings.MARKER_TRACK_HEIGHT;
		var scrollable_height = Settings.TIMELINE_SCROLL_HEIGHT;

		scrollbar.setHeight(scrollable_height - 2);

		style(scrollbar.dom, {
			top: Settings.MARKER_TRACK_HEIGHT + 'px',
			left: (width - 16) + 'px',
		});

		needsResize = true;
	}

	function restyle(left, right) {
		left.style.cssText = 'position: absolute; left: 0px; top: 0px; height: ' + Settings.height + 'px;';
		style(left, {
			// background: Theme.a,
			overflow: 'hidden'
		});
		left.style.width = Settings.LEFT_PANE_WIDTH + 'px';

		// right.style.cssText = 'position: absolute; top: 0px;';
		right.style.position = 'absolute';
		right.style.top = '0px';
		right.style.left = Settings.LEFT_PANE_WIDTH + 'px';
	}

	function addLayer(name, label) {
		const layer = new LayerProp(name, label);

		layers = layerStore.value;
		layers.push(layer);

		layerPanel.setState(layerStore);
	}

	this.addLayer = addLayer;

	this.addThreeJsObjectKeyingLayer = (keyName) => {
		if(!this._threeJsObject) {
			console.warn('no three js target object was specified!');
			return;
		}

		if(!ThreeJsObjectKeyingSet[keyName]) {
			console.warn(`unrecognized key name ${keyName}`);
			return
		}

		this.addLayer(ThreeJsObjectKeyingSet[keyName], ThreeJsObjectKeyingSet[keyName]);
	};

	this.dispose = function dispose() {
		var domParent = pane.parentElement;

		domParent.removeChild(pane);
		domParent.removeChild(ghostpane);
	};

	this.setTarget = function(t) {
		target = t;
	};

	this.setTargetThreeJsObject = function (object) {
		if(this._threeJsObject){
			if(this._threeJsObject.uuid === object.uuid) {
				console.warn('already targeted');
				return;
			}

			layerStore.value = [];

			updateState();
			//pausePlaying();
		}

		this._threeJsObject = object;

		if(!object.animationData) {
			console.warn('this threejs object has not any animation data! empty animation data will be created');

			object.animationData = {
				layers: []
			};
		}
		else {
			this._loadDataFromThreeJsObject(object);

			updateState();
		}

		target = {};
	};

	/**
	 * @param {string} layerName
	 * @param {object} value
	 * @param {number} value.time
	 * @param {number} value.value
	 */
	this.addThreejsObjectKeyFrame = (layerName, value) => {
		if(!this._threeJsObject) {
			console.warn('no threejs object added');
			return;
		}

		if(!ThreeJsObjectKeyingSet[layerName]) {
			console.warn(`unrecognized threejs object keying name: ${layerName}`);
			return;
		}

		const filteredLayers = layers.filter(layer => layer.name === layerName);

		if(filteredLayers.length === 0) {
			console.warn(`failed to find layer : ${layerName}`);
			return;
		}

		if(filteredLayers.length !== 1) {
			console.warn(`non unique layer name : ${layerName}`);
			return;
		}

		if(value.time < 0) {
			console.warn(`invalid time: ${value.time} it will fall back to 0!`);
			value.time = 0;
		}

		const layer = filteredLayers[0];

		layer.values.push(value);

		updateState();

		this._updateThreejsObjectAnimationData();
	};

	this._loadDataFromThreeJsObject = (threejsObject) =>{
		const layers = threejsObject.animationData.layers;

		const dataStoreLayers = dataStore.data.layers;

		for(let i = 0; i < layers.length; i++) {
			const layer = layers[i];

			let clonedLayer = {
				label: layer.label,
				name: layer.name,
				_color: layer._color,
				_value: layer._value,
				values: []
			};

			for(let j = 0; j < layer.values.length; j++) {
				const value = layer.values[j];

				clonedLayer.values.push({
					time: value.time,
					tween: value.tween,
					value: value.value,
					_color: value._color
				})
			}

			dataStoreLayers.push(clonedLayer);
		}
	};

	this._updateThreejsObjectAnimationData = () =>{
		const dataStoreLayers = dataStore.data.layers;

		const threejsObject = this._threeJsObject;

		threejsObject.animationData.layers = [];

		for(let i = 0; i < dataStoreLayers.length; i++) {
			const layer = dataStoreLayers[i];

			let clonedLayer = {
				label: layer.label,
				name: layer.name,
				_color: layer._color,
				_value: layer._value,
				values: []
			};

			for(let j = 0; j < layer.values.length; j++) {
				const value = layer.values[j];

				clonedLayer.values.push({
					time: value.time,
					tween: value.tween,
					value: value.value,
					_color: value._color
				})
			}

			threejsObject.animationData.layers.push(clonedLayer);
		}
	};

	function getValueRanges(ranges, interval) {
		interval = interval ? interval : 0.15;
		ranges = ranges ? ranges : 2;

		// not optimized!
		var t = dataStore.get('ui:currentTime').value;

		var values = [];

		for (var u = -ranges; u <= ranges; u++) {
			// if (u == 0) continue;
			var o = {};

			for (var l = 0; l < layers.length; l++) {
				var layer = layers[l];
				var m = utils.timeAtLayer(layer, t + u * interval);
				o[layer.name] = m.value;
			}

			values.push(o);
		}

		return values;
	}

	this.getValues = getValueRanges;

	/* Integrate pane into docking window */
	var widget = new DockingWindow(pane, ghostpane);

	widget.allowMove(false);
	widget.resizes.do(resize);

	pane_title.addEventListener('mouseover', function() {
		widget.allowMove(true);
	});

	pane_title.addEventListener('mouseout', function() {
		widget.allowMove(false);
	});
}

window.Timeliner = Timeliner;

const ThreeJsObjectKeyingSet = {
	PositionX : "PositionX",
	PositionY : "PositionY",
	PositionZ : "PositionZ",
	RotationX : "RotationX",
	RotationY : "RotationY",
	RotationZ : "RotationZ"
};

export { Timeliner, ThreeJsObjectKeyingSet }