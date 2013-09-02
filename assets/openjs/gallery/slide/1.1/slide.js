KISSY.makeAdaptor({
	requires: ['gallery/slide/1.1/'],
	ctor: 'Slide',
	args: ['selector', 'simple'],
	methods: {
		on: [
			'simple',
			function( guestCallback, adaptor ) {
				return function( e ) {
					var event = {
						date: e.date && e.date.toString(),
						end: e.end && e.end.toString(),
						start: e.start && e.start.toString()
					};
					guestCallback.call( adaptor, event );
				};
			}
		],
		play: [],
		pause: [],
		stop: [],
		show: [],
		previous: []
	}
});
