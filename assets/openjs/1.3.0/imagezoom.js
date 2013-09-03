/**
 * @fileOverview ImageZoom µÄ°²È«ÊÊÅäÆ÷
 *
 * http://docs.kissyui.com/docs/html/api/component/imagezoom/
 */
KISSY.makeAdaptor({
	requires: ['imagezoom'],
	ctor: 'ImageZoom',
	adaptee: KISSY.ImageZoom,
	args: ['simple', 'simple', 'simple', 'simple'],
	properties: {
		bigImageHeight: { writable: true },
		bigImageWidth: { writable: true },
		hasZoom: { writable: true },
		bigImageSrc: { writable: true },
		imageSrc: { writable: true }
	},
	methods: {
	},
	events: {
		show: ['currentTarget', 'target', 'timeStamp', 'type'],
		hide: ['currentTarget', 'target', 'timeStamp', 'type']
	},
	static_methods: {
	}
});
