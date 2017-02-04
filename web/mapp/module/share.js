/**
 * Created by Administrator on 2016/11/23 0023.
 */
/*�ֻ��˶���*/
new function (){
    var _self = this;
    _self.width = 750;//����Ĭ�������
    _self.fontSize = 100;//Ĭ�������С
    _self.widthProportion = function(){var p = (document.body&&document.body.clientWidth||document.getElementsByTagName("html")[0].offsetWidth)/_self.width;return p>1?1:p<0.43?0.43:p;};
    _self.changePage = function(){
        document.getElementsByTagName("html")[0].setAttribute("style","font-size:"+_self.widthProportion()*_self.fontSize+"px !important");
    };
    _self.changePage();
    window.addEventListener('resize',function(){_self.changePage();},false);
};

// window.onresize=function ()
// {
//     document.documentElement.style.fontSize=document.documentElement.clientWidth/16+'px';
// };

