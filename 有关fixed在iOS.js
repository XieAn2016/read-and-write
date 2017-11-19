var $ = require('./zepto.js');
var ios = $.os.ios && parseFloat($.os.version) >= 5;
var android = $.os.android && parseFloat($.os.version) > 2.1;
var isSupportFix = ios || android;
// 设置固定定位元素 isShow为true 则强制显示.
// $('.fixed') 需要固定定位的元素
function setFixed(isShow) {
    if (isSupportFix) {
        if (isShow === true || document.body.scrollTop > (86 + $(window).height())) {
            $('.fixed').show();
        }else {
            $('.fixed').hide();
        }
    }else if ($.os.ios) {
        if (document.body.scrollTop > (131 + $(window).height())) {
            if (isShow || $('.fixed')[0].style.display === 'none') {
                $('.fixed').show();
            }else {
                $('.fixed').hide();
            }
        }
    }
}

if (isSupportFix) {
    $(window).on('touchstart touchmove touchend scroll load', setFixed);
    $(document).on('scrollStop', function () {
        setFixed();
    });
}else if ($.os.ios) {// ios4
    $('.fixed').css({position: 'absolute'});
    $(window).on('touchmove', function () {
        $('.fixed').hide();
    });
    setFixed();
}