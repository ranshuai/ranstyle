/**
 * 讲作业列表页
 * 课海手机浏览器 && 班海APP
 */
/**
 * 计划 课海班海公用的方法合并
 *  1.$('body')在初始化的时候先隐藏，由于webpack编译之后的代码要先下加载完以后才渲染样式和js
 *  2.
 *
 *
 *
 *
 *
 * */
var $ = require('n-zepto');
require('lib/dropload.js');

$('body').removeClass('hide');
function  SpeakModule(){
    this.body = $('body');
    this.bOk = null;

}

SpeakModule.prototype = {

    kehai:function(){
    

    },
    banhai:function(){


    }
};

/*时间戳转换*/
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1,                 //月份
        "d+": this.getDate(),                    //日
        "h+": this.getHours(),                   //小时
        "m+": this.getMinutes(),                 //分
        "s+": this.getSeconds(),                 //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds()             //毫秒
    };
    if (/(y+)/.test(fmt))
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

function hint1(mes) {
    if (bool) {
        $("body").append('<div class="alert_bg"></div><div class="alert"><p style="line-height: 1.5rem;">' + mes + '</p></div>');
        setTimeout(function () {
            $(".alert_bg,.alert").hide();
        }, 1500)

        bool = false;
    } else {
        $('.alert_bg,.alert').show();
        $('.alert p').text(mes);
        setTimeout(function () {
            $(".alert_bg,.alert").hide();
        }, 1500)
    }
}

module.exports = new SpeakModule();
