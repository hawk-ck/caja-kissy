<!doctype html>
<html>
<head>
<meta charset="gbk">
<title></title>
<script type="text/javascript" src="http://a.tbcdn.cn/s/kissy/1.3.0/kissy-min.js"></script>
<script type="text/javascript" src="http://a.tbcdn.cn/apps/taesite/balcony/core/r3002/caja/caja-min.js"></script>

<script type="text/javascript" src="../../assets/base/caja-util.js"></script>
<script type="text/javascript" src="../../assets/base/caja-log.js"></script>
<script type="text/javascript" src="../../assets/base/balcony.js"></script>
<script src="../../test/assets.js"></script>
</head>
<body>

<script type="text/javascript" src="../../assets/openjs/1.3.0/adaptor.js"></script>

<link rel="stylesheet" href="imagezoom.css"/>

<!--
    ��Ҫ���Ե�dom�ṹ��ע�⣬�����<div class="J_TScriptedModule" data-componentid="uniqueSign"> ��class��Ϊ���Բ����޸�
    �û���javascript������ֻ�������õ����dom���棬������"Խ��"
-->
<div class="J_TScriptedModule" data-componentid="uniqueSign">
    <img class="iz-standard" src="http://img03.taobaocdn.com/bao/uploaded/i3/T1fftwXf8jXXX7ps79_073021.jpg_310x310.jpg">
</div>

<!--ģ���ʼ���İ����ã�������Ϥ��-->
<script type="text/javascript">
    KISSY.config(
        {
            debug: true,
            packages: [
                {
                    name: "openjs", //����
                    tag: "20130527",//ʱ���, ����ڶ�̬�ű�·������, ���ڸ��°���ģ�����
                    path:"../../assets", //����Ӧ·��, ���·��ָ����ڵ�ǰҳ��·��    //
                    charset: "gbk" //����ģ���ļ������ʽ
                }
            ]
        }
    );
     cajaConfig={//����������Ҫ�����ģ�����ƣ����ᱻuse��
         modules:"openjs/1.3.0/core,openjs/1.3.0/imagezoom"
     }

</script>

<!--�����ǽ��Լ���js�÷���˱���һ�£������·���˵�php·�����Լ���js���ɣ�ע��·��-->
<?
switch ('caja') {
case 'caja':
	$jsurl = "testcase/1.3.0/imagezoom.js"; //ע��·��
	$jsservice = "../common/cajoled_service.php"; //ע��·��
	echo '<script type="text/javascript" src="'.$jsservice.'?jsurl='.$jsurl.'"></script>';
	echo '<script src="../../assets/base/setup.js"></script>';
	break;
case 'native':
	echo '<script src="imagezoom.js"></script>';
	break;
}
?>
</body>
</html>