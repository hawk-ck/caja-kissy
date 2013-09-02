<!--页头公共资源引入-->
<? include("../common/head.php");?>

<script type="text/javascript" src="../../assets/openjs/1.3.0/adaptor.js"></script>

<!--
    需要测试的dom结构，注意，最外层<div class="J_TScriptedModule" data-componentid="uniqueSign"> 的class和为属性不可修改
    用户的javascript理论上只可以作用到这个dom下面，不可以"越界"
-->

<link rel="stylesheet" href="http://a.tbcdn.cn/apps/ks/zoo/slide/demo/img/d1.css" />

<div class="J_TScriptedModule" data-componentid="uniqueSign">
	<div class="J_Slide">
		<div class="trigger-bar">
			<a href="javascript:void(0);" title="下翻" class="next"></a>
			<a href="javascript:void(0);" title="上翻" class="prev"></a>
			<div class="scrollable-trigger">
				<a class="" href="javascript:void(0);" target="_self">1</a>	
				<a class="" href="javascript:void(0);" target="_self">2</a>	
				<a class="" href="javascript:void(0);" target="_self">3</a>	
			</div>
		</div>
		<div class="scrollable-panel">
			<div class="scrollable-content">
				<!-- 1~3 -->
				<img src="http://img04.taobaocdn.com/tps/i4/T1uRBrXe0XXXXXXXXX-120-60.gif" />
				<img src="http://img02.taobaocdn.com/tps/i2/T1bQVrXaVpXXXXXXXX-120-60.gif" />
				<img src="http://img01.taobaocdn.com/tps/i1/T1l7FrXgNvXXXXXXXX-120-60.gif" />
			</div>
			<div class="scrollable-content">
				<!-- 4~6 -->
				<img src="http://img04.taobaocdn.com/tps/i4/T1ikRrXglqXXXXXXXX-120-60.gif" />
				<img src="http://img01.taobaocdn.com/tps/i1/T1XYRsXipXXXXXXXXX-120-60.gif" />
				<img src="http://img06.taobaocdn.com/tps/i6/T1MQ8rXe8kXXXXXXXX-120-60.gif" />
			</div>
			<div class="scrollable-content">
				<!-- 7~9 -->
				<img src="http://img05.taobaocdn.com/tps/i5/T1mOJsXXdEXXXXXXXX-120-60.gif" />
				<img src="http://img06.taobaocdn.com/tps/i6/T1bkNrXb8sXXXXXXXX-120-60.gif" />
				<img src="http://img07.taobaocdn.com/tps/i7/T1Ck8rXiXkXXXXXXXX-120-60.gif" />
			</div>
		</div>
	</div>

	<div class="J_Slide-ctrl" style="width:437px;">
		<button class="play" title="Play"></button>
		<button class="pause" title="Pause"></button>
		<button class="stop" title="Stop"></button>
	</div>
</div>

<!--模块初始化的包配置，都很熟悉了-->
<script type="text/javascript">
    KISSY.config(
        {
            debug: true,
            packages: [
                {
                    name: "openjs", //包名
                    tag: "20130827",//时间戳, 添加在动态脚本路径后面, 用于更新包内模块代码
                    path:"../../assets", //包对应路径, 相对路径指相对于当前页面路径    //
                    charset: "gbk" //包里模块文件编码格式
                }
            ]
        }
    );
     cajaConfig={//配置下你需要引入的模块名称，最后会被use到
         modules:"openjs/1.3.0/core,openjs/gallery/slide/1.1/slide"
     }

</script>

<!--这里是将自己的js让服务端编译一下，配置下服务端的php路径和自己的js即可，注意路径-->
<?
    $jsurl="testcase/gallery/slide.js";//注意路径
    $jsservice="../common/cajoled_service.php";//注意路径
    include("../common/foot.php");//引入foot
?>