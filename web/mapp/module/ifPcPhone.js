//微信支付页面pc端、手机端判断
function PcPhone(){
    var system ={
        win : false,
        mac : false,
        xll : false
    };
    //检测平台
    var p = navigator.platform;
    system.win = p.indexOf("Win") == 0;
    system.mac = p.indexOf("Mac") == 0;
    system.x11 = (p == "X11") || (p.indexOf("Linux") == 0);

    if(system.win||system.mac||system.xll){

        console.log(p);
    }else{
        console.log(2);

        window.location.href="手机站链接";
    }
}


PcPhone();