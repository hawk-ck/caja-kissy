<!--ҳͷ������Դ����-->
<? include("../common/head.php");?>

<script type="text/javascript" src="../../assets/openjs/1.3.0/adaptor.js"></script>

<!--
    ��Ҫ���Ե�dom�ṹ��ע�⣬�����<div class="J_TScriptedModule" data-componentid="uniqueSign"> ��class��Ϊ���Բ����޸�
    �û���javascript������ֻ�������õ����dom���棬������"Խ��"
-->

<link rel="stylesheet" href="http://a.tbcdn.cn/apps/ks/zoo/slide/demo/img/d1.css" />

<div class="J_TScriptedModule" data-componentid="uniqueSign">
	<div class="J_Slide">
		<div class="trigger-bar">
			<a href="javascript:void(0);" title="�·�" class="next"></a>
			<a href="javascript:void(0);" title="�Ϸ�" class="prev"></a>
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

<!--ģ���ʼ���İ����ã�������Ϥ��-->
<script type="text/javascript">
    KISSY.config(
        {
            debug: true,
            packages: [
                {
                    name: "openjs", //����
                    tag: "20130827",//ʱ���, ����ڶ�̬�ű�·������, ���ڸ��°���ģ�����
                    path:"../../assets", //����Ӧ·��, ���·��ָ����ڵ�ǰҳ��·��    //
                    charset: "gbk" //����ģ���ļ������ʽ
                }
            ]
        }
    );
     cajaConfig={//����������Ҫ�����ģ�����ƣ����ᱻuse��
         modules:"openjs/1.3.0/core,openjs/gallery/slide/1.1/slide"
     }

</script>

<!--�����ǽ��Լ���js�÷���˱���һ�£������·���˵�php·�����Լ���js���ɣ�ע��·��-->
<?
    $jsurl="testcase/gallery/slide.js";//ע��·��
    $jsservice="../common/cajoled_service.php";//ע��·��
    include("../common/foot.php");//����foot
?>