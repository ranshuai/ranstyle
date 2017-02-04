
require('css/index.less');

$('body').css('display','block');


function BannerList(json){
    this.position = json || {};
}

BannerList.prototype={

    init:function(){
        this.render(this.position.ele);
        this.touch(this.position.ele);
    },
    render:function(ele){
        var childEle = ele.find('li');
        var childW =childEle.width();
        var count = childEle.length;
        ele.css('width',childW*count);
    },
    touch:function(ele){
        ele = ele[0];
        ele.addEventListener('touchstart', function (ev){
            var disX=ev.targetTouches[0].clientX-ele.offsetLeft;
            function fnMove(ev)
            {
                ele.style.left=ev.targetTouches[0].clientX-disX+'px';
            }
            function fnEnd()
            {
                ele.removeEventListener('touchmove', fnMove, false);
                ele.removeEventListener('touchend', fnEnd, false);
            }

            ele.addEventListener('touchmove', fnMove, false);
            ele.addEventListener('touchend', fnEnd, false);
            ev.preventDefault();
        }, false);
    }
};

var bannerList = new BannerList({ele:$('.bannerList')});

bannerList.init();

