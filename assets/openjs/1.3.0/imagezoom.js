/**
 * @fileOverview ImageZoom µÄ°²È«ÊÊÅäÆ÷
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
	static_methods: {
	},
	events: {
	}
});
