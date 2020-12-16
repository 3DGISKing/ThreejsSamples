// variables
var $class = {
    topBanner           : $('#top_banner'),
    topBannerClose      : $('#top_banner .btn_close'),
    headerWrap          : $('.header_wrap'),
    slogan              : $('.slogan'),
    gBtn                : $('.slogan .g_btn'),
    scenesNav           : $('.scenes-navigation'),
    cursor              : $('#g_cursor'),
    detailLayer         : $('.detail_layer'),
    layerContent        : $('.detail_layer .layer_content'),
    layerContentRow     : $('.detail_layer .layer_content .row'),
    detailLayerclose    : $('.detail_layer_wrap .btn_close'),
    popup               : $('#popup'),
    popupClose          : $('#popup .btn_close'),
    checkCookie         : $('#check_cookie'),
    menu                : $('.header_wrap, #quick_menu')
}

// ncMainUI
var ncMainUI = ncMainUI || {};
var ncMainUI = {
    init: function() {
        ncMainUI.topbnr();
        ncMainUI.detailLayer();
        ncMainUI.popup();
    },
    // topBanner ui
    topbnr : function(){
        if ($class.topBanner.length > 0)
        {
            $class.topBannerClose.on('click', function(e){
            	addViewCnt($(this).data("seq"));
                e.preventDefault();
                $class.topBanner.slideUp(300);
                $class.headerWrap.stop().animate({top:0},300);
                
                $.cookie('topBanner', 'hidden', {expires : 1, path: '/'});
            })

            if ($.cookie("topBanner") == 'hidden') {
                $class.topBanner.hide();
            }
            else
            {
                $class.headerWrap.css({top:48}); 
                $class.topBanner.show();
            }
        }
    },
    // detail layer ui
    detailLayer : function(){
        $class.menu.on('mouseenter', function(e){
            e.preventDefault();
            var $targetIdx  = $(this).parents().index();
            if ($targetIdx == 1)
            {
                $class.cursor.removeClass('grab drag');
                $class.cursor.children('i').hide();
            }
        })
        $class.menu.on('mouseleave', function(e){
            e.preventDefault();
            var $targetIdx  = $(this).parents().index();
            if ($targetIdx == 1)
            {
                $class.cursor.addClass('drag');
                $class.cursor.children('i').removeClass('hidden');
                $class.cursor.find('i').attr('style', '');
            }
        })
        $class.gBtn.on('mouseenter', function(e){
            e.preventDefault();
            var $targetIdx  = $(this).parents().index();
            if ($targetIdx == 1)
            {
                $class.cursor.removeClass('grab drag');
                $class.cursor.children('i').hide();
            }
        })
        $class.gBtn.on('mouseleave', function(e){
            e.preventDefault();
            var $targetIdx  = $(this).parents().index();
            if ($targetIdx == 1)
            {
                $class.cursor.addClass('drag');
                $class.cursor.children('i').removeClass('hidden');
                $class.cursor.find('i').attr('style', '');
            }
        })
        // detail layer open
        $class.gBtn.on('click', function(e){
            e.preventDefault();
            var $targetIdx  = $(this).parents().index();
            if ($targetIdx == 1)
            {
                $class.cursor.addClass('ico_hidden')
            }
            $class.headerWrap.hide();
            $class.detailLayer.show();
            $class.detailLayer.animate({ scrollTop: 0 }, 0); 
            $class.layerContent.attr('style','');
            $class.layerContent.eq($targetIdx).addClass('on').siblings().removeClass('on');
            $class.layerContent.eq($targetIdx).find('.first').addClass('on');
            $class.layerContent.eq($targetIdx).find('.row1').addClass('on');
            $class.detailLayerclose.show();
            $class.scenesNav.css({'visibility': 'hidden'});
            $class.slogan.css({'visibility': 'hidden'});
            if ($class.topBanner.length > 0)
            {
                $class.topBanner.children('.btn_close').css({'visibility': 'hidden'});
            }
            if ($class.popup.length > 0)
            {
                $class.popup.css({'visibility': 'hidden'});
            }
            
            detailLayerScroll();
        })
    
        // detail layer close
        $class.detailLayerclose.on('click', function(e){
            e.preventDefault();
            if ($('.slogan .second').hasClass('on'))
            {
                $class.cursor.removeClass('ico_hidden')
            }
            $class.layerContent.animate({
                opacity:0
            },300, function(){
                $class.detailLayer.animate({ scrollTop: 0 }, 0); 
                $class.detailLayer.hide();
                $class.headerWrap.show();
                $class.scenesNav.css({'visibility': 'visible'});
                $class.slogan.css({'visibility': 'visible'});
                $class.detailLayerclose.hide();
                $class.layerContentRow.removeClass('on');
                if ($class.popup.length > 0)
                {
                    $class.popup.css({'visibility': 'visible'});
                }
            });
        })

        // detail layer scroll event function
        function detailLayerScroll(){
            var lastScrollTop = 0;
            $class.detailLayer.scroll(function(e){
                e.preventDefault();
                $class.layerContent.find('.row').each( function(i){
                    var bottomObject = $(this).offset().top,
                        bottomWindow = $(window).scrollTop() + $(window).height();
                    if( bottomWindow > bottomObject)
                    {
                        $(this).addClass("on");
                    }
                });
            });
        }
    },
    // popup ui
    popup : function(){        
        $class.popupClose.on('click', function(e){
        	addViewCnt($(this).data("seq"));
            e.preventDefault();
            var checkCookie = $class.checkCookie.is(":checked");
            if (checkCookie === true)
            {
                $.cookie('popup', 'hidden', {expires : 1, path: '/'});
            }
            $class.popup.hide();
        })
    
        if ($.cookie("popup") == 'hidden') {
            //console.log('popup hide!')
            $class.popup.hide();
        }
        else
        {
            $class.popup.show();
        }
        
    }
};


$(document).ready(function(){
    // initial
    ncMainUI.init();
    
})