var Slide = KISSY.Slide;
var s = new Slide(KISSY.all('.J_Slide'),{
	eventType:'click',
	navClass:'scrollable-trigger',
	contentClass:'scrollable-panel',
	pannelClass:'scrollable-content',
	selectedClass:'current',
	triggerSelector:'a',
	effect:'fade',
	autoPlay:true

});
s.play();
var ctl = KISSY.all('.J_Slide-ctrl');
ctl.all('.play').on('click',function(){
	s.play();	
});
ctl.all('.pause').on('click',function(){
	s.stop();	
});
ctl.all('.stop').on('click',function(){
	s.stop();	
});
KISSY.all('.next1').on('click',function(){
	s.next();
});
KISSY.all('.prev1').on('click',function(){
	s.previous();
});
