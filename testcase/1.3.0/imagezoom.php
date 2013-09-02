<!--页头公共资源引入-->
<? include("../common/head.php");?>
<script type="text/javascript" src="../../assets/openjs/1.3.0/adaptor.js"></script>

<link rel="stylesheet" href="imagezoom.css"/>

<!--
    需要测试的dom结构，注意，最外层<div class="J_TScriptedModule" data-componentid="uniqueSign"> 的class和为属性不可修改
    用户的javascript理论上只可以作用到这个dom下面，不可以"越界"
-->
<div class="J_TScriptedModule" data-componentid="uniqueSign">
    <img class="iz-standard" src="http://img03.taobaocdn.com/bao/uploaded/i3/T1fftwXf8jXXX7ps79_073021.jpg_310x310.jpg">
</div>

<!--模块初始化的包配置，都很熟悉了-->
<script type="text/javascript">
    KISSY.config(
        {
            debug: true,
            packages: [
                {
                    name: "openjs", //包名
                    tag: "20130527",//时间戳, 添加在动态脚本路径后面, 用于更新包内模块代码
                    path:"../../assets", //包对应路径, 相对路径指相对于当前页面路径    //
                    charset: "gbk" //包里模块文件编码格式
                }
            ]
        }
    );
     cajaConfig={//配置下你需要引入的模块名称，最后会被use到
         modules:"openjs/1.3.0/core,openjs/1.3.0/imagezoom"
     }

</script>

<!--这里是将自己的js让服务端编译一下，配置下服务端的php路径和自己的js即可，注意路径-->
<?
    $jsurl="testcase/1.3.0/imagezoom.js";//注意路径
    $jsservice="../common/cajoled_service.php";//注意路径
    include("../common/foot.php");//引入foot
?>