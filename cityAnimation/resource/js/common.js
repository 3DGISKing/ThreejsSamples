var ncUI = ncUI || {};
var ncUI = {
    // 변수선언
    g_prevSt : 0,
    g_isWheel : false,
    g_isWheelUp : false,
    g_$header : $('.header_wrap'),
    g_$gnbDepth1 : $('#gnb > li'),
    g_$gnbDepth2 : $('#gnb > li ul > li'),
    g_$topBtn : $('#top_btn'),
    g_$cursor : $('#g_cursor'),
    g_mousePos : 0,

    init: function() {
        ncUI.addEvents();
        ncUI.gnb();
        ncUI.gnbActive();
        ncUI.quickMenu();
        ncUI.selectBoxGnb();
        ncUI.selectBoxDefault();
        $(window).scroll(ncUI.gnbScroll);
        ncUI.gnbScroll();
        ncUI.tabMenuActive();
    },
    // event listener
    addEvents : function() {
        $("html, body").on('mousewheel DOMMouseScroll', ncUI.wheel);

        // mouse cursor 1280 < / only chrome, IE
        var agent = navigator.userAgent.toLowerCase();

        if (window.innerWidth > 1280 && (agent.indexOf("chrome") != -1)) {
            if ((agent.indexOf("whale") != -1) || (agent.indexOf("edge") > -1)) {
                $('body').addClass('cursor');
                return;
            }
            ncUI.mouseLoad();
        } else {
            $('body').addClass('cursor');
        }

        if(!$('body').hasClass('index')){
            setTimeout(function(){
                $('#g_loading').fadeOut();
            }, 800)
        }
    },
    // gnb (common)
    gnb : function() {
        // class
        var $class = {
            headerWrap: $('.header_wrap'),
            header: $('#header'),
            gnb: $('#gnb'),
            gnbItem: $('#gnb > li'),
            submenu: $('#gnb > li > ul'),
            naviLine : $('#navi_line')
        }


        // gnb open
        $class.gnbItem.children('a').mouseenter(function(e){
            e.preventDefault();

            ncUI.gnb1DepthLine($(this));
            ncUI.g_$gnbDepth1.children('a').addClass('disable');
            $class.submenu.addClass('on');
            if (ncUI.g_$cursor.children('i').length > 0) {
                ncUI.g_$cursor.children('i').hide();
            }

        }).mouseleave(function() {
            ncUI.g_$gnbDepth1.children('a').removeClass('disable');
        }).on("focusin", function(){
            $(this).trigger("mouseenter");
        }).on("focusout", function(){
            $(this).trigger("mouseleave");
        });

        $class.header.mouseleave(function(e){
            e.preventDefault();
            $class.headerWrap.removeClass('on');
            $class.submenu.removeClass('on');
            $class.naviLine.hide();
            ncUI.g_$cursor.children('i').show();
            if (ncUI.g_$cursor.children('i').length > 0) {
                ncUI.g_$cursor.children('i').show();
            }
        });


        // submenu effect
        $class.submenu.on('mouseenter', function(e){
            e.preventDefault();

            ncUI.g_$gnbDepth1.find(' > a').addClass('disable');
            ncUI.g_$gnbDepth1.find(' > a').removeClass('active');
            $(this).prev().addClass('active');

            if (!$(this).hasClass('sub6')) {
                ncUI.gnb1DepthLine($(this));
            } else {
                TweenMax.to($class.naviLine, 0.3, {opacity:0,ease:Power2.easeOut});
            }

            $class.submenu.removeClass('on');
            $(this).addClass('on');
        }).on('mouseleave', function() {
            ncUI.g_$gnbDepth1.find(' > a').removeClass('active');
            ncUI.g_$gnbDepth1.find(' > a').removeClass('disable');
        });

        // gnb inMotion
        setTimeout(function() {
            $class.headerWrap.addClass('intro');
        }, 500)
    },

    gnb1DepthLine : function(_this) {
        var elPadding = Number(_this.css('padding-left').replace("px", "")),
            linePosX = _this.offset().left,
            naviLine = $('#navi_line');

        $('.header_wrap').addClass('on');
        naviLine.show();

        TweenMax.to(naviLine, 0.5, {opacity:1, width:_this.width() + (elPadding*2) + 1,left:linePosX,ease:Power2.easeOut});
    },

    // gnb active
    gnbActive : function() {
        var m_$container = $(".wrap"),
            m_classStr = m_$container.attr("class"),
            m_className = m_classStr.split(" ")[1],
            m_bnavi = false;

        if(m_className) {
            m_bnavi = true;
        }

        if(m_bnavi) {
            ncUI.g_$gnbDepth1.find('li').removeClass('on');
            ncUI.g_$gnbDepth2.find('a').removeClass('on');

            var fixDepthArr = m_className.split('_');

            if(fixDepthArr[0]=='subNavi') {
                $('.naviDepth1_'+fixDepthArr[1]).addClass('on');
                $('.naviDepth1_'+fixDepthArr[1]).addClass('on');
                $('.naviDepth2_'+fixDepthArr[1]+'_'+fixDepthArr[2]).addClass('on');
            }
        }
    },

    // gnb scroll
    gnbScroll : function(){
        var m_st = $(window).scrollTop();

        if(!ncUI.g_isWheel) ncUI.g_isWheelUp = false;

        if (m_st <= 0) $('.header_wrap').removeClass('in');
        else $('.header_wrap').addClass('in');

        if(m_st > ncUI.g_$header.height()) {
            ncUI.g_$header.removeClass("up").addClass("hide");

            if(!ncUI.g_isWheelUp && m_st < ncUI.g_prevSt) {  ncUI.g_isWheelUp = true;  }
            if(ncUI.g_isWheelUp) {  ncUI.g_$header.removeClass("hide").addClass("up");  }
        } else {
            ncUI.g_$header.removeClass("hide").removeClass("up");
        }

        ncUI.g_prevSt = m_st;
    },

    whatWeCreateGnbScroll: function(){
        //top button add
        $('body').append('<a href="javascript:;" id="top_btn" class="wwcContentScrolled cursor_hover"><i></i></a>')
        $('.wwcContentScrolled').on('click', function(e){
            e.preventDefault();
            $(window).trigger('wwcContentScrollTo',{top:0, speed:2000})
        })

        $(window).on('wwcContentScrolled', function(e, scrollTop) {
            if(scrollTop > ncUI.g_$header.height()) {
                ncUI.g_$header.removeClass("up").addClass("hide");

                if(!ncUI.g_isWheelUp && scrollTop < ncUI.g_prevSt) {ncUI.g_isWheelUp = true;}
                if(ncUI.g_isWheelUp) {ncUI.g_$header.removeClass("hide").addClass("up");}

                if(scrollTop > $(window).height() - 350) {
                    $('#top_btn').addClass('on');
                }
                else
                {
                    $('#top_btn').removeClass('on');
                }
            } else {
                ncUI.g_$header.removeClass("hide").removeClass("up");
                $('#top_btn').removeClass('on');
            }
            ncUI.g_prevSt = scrollTop;
        })
    },

    whatWeCreateGnbActive: function(){
        $(window).on('wwcContentLoaded', function(e) {
            ncUI.gnbActive();
        })
    },

    wheel : function(e){
        var m_event = e.originalEvent,
            m_delta = 0;

        ncUI.g_isWheel = true;

        if (m_event.detail) m_delta = m_event.detail * -40;
        else m_delta = m_event.wheelDelta;

        if(m_delta > 0) ncUI.g_isWheelUp = true;
        else ncUI.g_isWheelUp = false;
    },

    mouseLoad : function(){
        /* mouse cursor */
        $('html, body').on('mouseenter mousemove', function(e) {
            e.preventDefault();

            ncUI.g_mousePos = e;

            ncUI.g_$cursor.css({
                'transform' : 'translate3d(' + ncUI.g_mousePos.clientX + 'px,' + ncUI.g_mousePos.clientY + 'px, 0)',
                'left' : '0',
                'top' : '0',
                'opacity' : '1'
            })
        });

        $('a:not(.disable), button, .hover, input, textarea').on('mouseenter mousemove', function (e) {
            e.preventDefault();

            ncUI.g_mousePos = e;

            ncUI.g_$cursor.css({
                'transform' : 'translate3d(' + ncUI.g_mousePos.clientX + 'px,' + ncUI.g_mousePos.clientY + 'px, 0)',
                'left' : '0',
                'top' : '0'
            })

            if ($(this).hasClass('cursor_hover')) {
                ncUI.g_$cursor.removeClass('hover').addClass('hover_big');
            } else {
                ncUI.g_$cursor.removeClass('hover_big').addClass('hover');
            }

            ncUI.g_$cursor.find('i').css({'font-size': 0})
        }).on('mouseleave', function (e) {
            e.preventDefault();

            ncUI.g_$cursor.removeClass('hover_big hover');
            ncUI.g_$cursor.find('i').attr('style', '');
        });
    },

    mouseStatus : function(cursor) {
        ncUI.g_$cursor.css({
            'transform' : 'translate3d(' + ncUI.g_mousePos.clientX + 'px,' + ncUI.g_mousePos.clientY + 'px, 0)',
            'left' : '0',
            'top' : '0',
            'opacity' : '1',
        });

        ncUI.g_$cursor.removeClass('hover hover_big click');
        ncUI.g_$cursor.addClass(cursor);
    },

    // quick menu (common)
    quickMenu: function() {
        // class
        var $class = {
            btnQuickMenu : $('.sitemap'),
            quickMenu : $('#quick_menu'),
            quickMenuBg : $('#quick_menu .menu_bg'),
            body : $('body')
        }

        // ui
        // quickmenu open/close
        $class.btnQuickMenu.on('click', function(e){
            e.preventDefault();
            if(!$(this).hasClass('on')) {
                $class.body.addClass('stop');
                $class.quickMenu.addClass('on');
            } else {
                $class.body.removeClass('stop');
                $class.quickMenu.removeClass('on');
            }
        });
        // quickmenu close (bg)
        $class.quickMenuBg.on('click', function(e){
            e.preventDefault();
            $class.body.removeClass('stop');
            $class.quickMenu.removeClass('on');
        });
    },
    // select box - gnb(common)
	selectBoxGnb: function(){
		var $class = {
			selectBox: $('.select_box'),
			selector: $('.select_box dt a')
		};

		$class.selector.on('click', function(e){
            e.preventDefault();
            var that = $(this).parent().parent();
            if (that.hasClass('on')) {
                that.removeClass('on');
                that.find('dd').slideUp();
            } else {
                that.addClass('on');
                that.find('dd').slideDown();
            }
		});

        $('body').on('click', function(event){
            if (!$(event.target).closest('.select_box *').length) {
                $class.selectBox.removeClass('on');
                $class.selectBox.find('dd').slideUp();
            }
        });
	},
    // select box - default(common)
	selectBoxDefault: function(){
		var $class = {
			selectBox: $('.g_selectbox'),
            selectNanoScroll: $('.g_custom_scroll'),
            selectName: $('.g_sort_name'),
            selectBtns : $('.custom_scroll_content > a'),
            formSelectName: $('form .g_sort_name'),
            inputYear : $('#input_year')
        }

        ncUI.selectBoxCalcHeight();

        if($class.inputYear.length !== 0){
            if($class.inputYear[0].value.length !== 0){
                $class.formSelectName.find('a').text($class.inputYear[0].value);
            }else{
                $class.formSelectName.find('a').text('ALL');
            }
        }

        $class.selectName.on('click', 'a', function(e){
            e.preventDefault();
            if ($(this).parent().hasClass('on')) {
                $(this).parent().removeClass('on');
                $(this).parent().next('.g_selectbox').slideUp();
                $(this).parent().next('.g_selectbox').removeClass('on');
            } else {
                $(this).parent().addClass('on');
                $(this).parent().next('.g_selectbox').slideDown();
                $(this).parent().next('.g_selectbox').addClass('on');
            }
        });
        $('body').on('click', function(event){
            if (!$(event.target).closest('.g_sort_area *').length) {
                $class.selectName.removeClass('on');
                $class.selectBox.removeClass('on');
                $class.selectBox.slideUp();
            }
        });

        // active selectbox
        $class.selectBtns.on('click', function() {
            $class.selectName.removeClass('on');
            $class.selectBox.removeClass('on');
            $class.selectBox.slideUp();
            $(this).siblings().removeClass('on');

            if (!$(this).closest('.family_site').hasClass('family_site')) {
                var $selActiveName = $(this).parents('.g_selectbox').prev('.g_sort_name').find('a');
                $selActiveName.html($(this).text());
                $(this).addClass('on');
            }
        });
	},

    /* selectBox - 높이 계산 */
    selectBoxCalcHeight: function() {
        var $class = {
            selectBox: $('.g_selectbox'),
            selectBtns : $('.custom_scroll_content a')
        }
        $class.selectBox.each(function() {
            var m_aLen = $(this).find($class.selectBtns).length,
                m_aH = $(this).find($class.selectBtns).innerHeight(),
                m_selectH = (m_aH * m_aLen);

            if (m_aLen > 0) {
                $(this).height(m_selectH)
            }
        });
    },

    isMobile : function() {
        var UserAgent = navigator.userAgent;

        if (UserAgent.match(/iPhone|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
        {
            return true;
        }else{
            return false;
        }
    },

    topBtn : function() {
        ncUI.g_$topBtn.on('click', function(e){
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            },200)
        })
        $(window).on('scroll', function(){
            var $scrollTop  = parseInt($(window).scrollTop()),
                $windowH = parseInt($(window).outerHeight()),
                $footTop = parseInt($('#footer').offset().top - $windowH);

            if ($scrollTop >= $('.header_wrap').innerHeight())
            {
                ncUI.g_$topBtn.addClass('on');
            }
            else
            {
                ncUI.g_$topBtn.removeClass('on');
            }
            if ($scrollTop >= $footTop)
            {
                ncUI.g_$topBtn.addClass('stop');
            }
            else {
                ncUI.g_$topBtn.removeClass('stop');
            }
        })
    },

    // tabMenu
    tabMenuActive : function(){
        var $class = {
            tabs: $('.g_tab_menu ul li'),
            tabsContents: $('.g_tab_contents')
        }

        var tab_index = 0;
        $class.tabs.on('click', function(){
            tab_index = $(this).index();
            /* depth2-tab setting */
            $class.tabs.eq(tab_index).addClass('on').siblings().removeClass('on');
            /* depth2-content setting */
            $class.tabsContents.eq(tab_index).addClass('on').siblings().removeClass('on');
        });
    }
};


$(document).ready(function(){
    ncUI.init();
});

/*
if(!$('body').hasClass('index')){
    window.onload=function(){
        $('#g_loading').fadeOut();
    }
}
*/