function test( ImageZoom ) {
	var iz = new ImageZoom({
		imageNode: ".iz-standard",
		align:{
			node: ".iz-standard",
			points: ["tr","tl"],
			offset: [10, 0]
		},
		bigImageSrc: "http://img03.taobaocdn.com/bao/uploaded/i3/T1fftwXf8jXXX7ps79_073021.jpg",
		bigImageWidth: 900,
		bigImageHeight: 900
	});

	iz.on( 'show', function( e ) {
		console.log('show:', this, e, e.currentTarget);
		console.log('bigImageWidth:', iz.bigImageWidth);
		console.log('imageSrc:', iz.imageSrc);
	});

	iz.on( 'hide', function( e ) {
		console.log('hide:', this, e, e.currentTarget);
		iz.imageSrc = 'http://a.tbcdn.cn/s/kissy/logo.png';
	});
}

// 兼容 caja 和 native 两种测试运行环境
if ( KISSY.use ) {
	KISSY.use("dom,event,imagezoom", function(S, DOM, Event, ImageZoom) {
		test( ImageZoom );
	});
} else {
	test( KISSY.ImageZoom );
}
