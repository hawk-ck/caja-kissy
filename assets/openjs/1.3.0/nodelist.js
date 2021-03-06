KISSY.makeAdaptor({
	requires: ['core'],
	ctor: 'NodeList',
	adaptee: KISSY.NodeList,
	args: ['selector'],
	properties: {
		lengthx: {
			writable: false,
			alias_of: 'length'
		}
	},
	methods: {
		one: ['selector'],
		getDOMNodes: [],
		getDOMNode: [],
		end: [],
		equals: [],
		add: ['selector'],
		item: ['simple'],
		slice: ['simple', 'simple'],
		scrollTop: [],
		scrollLeft: [],
		height: [],
		width: [],
		// addStyleSheet: [],
		append: ['simple'],
		appendTo: ['element'],
		// prepend: [],
		// prependTo: [],
		// insertBefore: [],
		// before: [],
		// after: [],
		// insertAfter: [],
		// animate: [],
		// stop: [],
		// pause: [],
		// resume: [],
		// isRunning: [],
		// isPaused: [],
		// show: [],
		// hide: [],
		// toggle: [],
		// fadeIn: [],
		// fadeOut: [],
		// fadeToggle: [],
		// slideDown: [],
		// slideUp: [],
		// slideToggle: [],

		// filter: [],
		// test: [],
		// clone: [],
		// empty: [],
		// replaceWith: [],
		// hasClass: [],
		// addClass: [],
		// removeClass: [],
		// replaceClass: [],
		// toggleClass: [],
		// removeAttr: [],
		// attr: [],
		// hasAttr: [],
		// prop: [],
		// hasProp: [],
		// val: [],
		text: [],
		// css: [],
		// toggle: [],
		// offset: [],
		// scrollIntoView: [],
		// parent: [],
		// index: [],
		// next: [],
		// prev: [],
		// first: [],
		// last: [],
		// siblings: [],
		// children: [],
		// contains: [],
		// html: [],
		// remove: [],
		// data: [],
		// removeData: [],
		// hasData: [],
		// unselectable: [],
		// contains: [],
		// innerWidth: [],
		// innerHeight: [],
		// outerWidth: [],
		// outerHeight: [],
		// on: [],
		// detach: [],
		// fire: [],

		all: ['selector']
	},
	events: {
		click: ['currentTarget', 'target', 'timeStamp', 'type'],
		mouseover: ['currentTarget', 'target', 'timeStamp', 'type']
	},
	static_methods: {
		all: ['selector'],
		one: ['selector']
	}
});
