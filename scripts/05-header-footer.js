/**
 * Created by maximilianovera on 4/21/17.
 */
/*! Sidr - v1.2.1 - 2013-11-06
 * https://github.com/artberri/sidr
 * Copyright (c) 2013 Alberto Varela; Licensed MIT */
(function(e){var t=!1,i=!1,n={isUrl:function(e){var t=RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i");return t.test(e)?!0:!1},loadContent:function(e,t){e.html(t)},addPrefix:function(e){var t=e.attr("id"),i=e.attr("class");"string"==typeof t&&""!==t&&e.attr("id",t.replace(/([A-Za-z0-9_.\-]+)/g,"sidr-id-$1")),"string"==typeof i&&""!==i&&"sidr-inner"!==i&&e.attr("class",i.replace(/([A-Za-z0-9_.\-]+)/g,"sidr-class-$1")),e.removeAttr("style")},execute:function(n,s,a){"function"==typeof s?(a=s,s="sidr"):s||(s="sidr");var r,d,l,c=e("#"+s),u=e(c.data("body")),f=e("html"),p=c.outerWidth(!0),g=c.data("speed"),h=c.data("side"),m=c.data("displace"),v=c.data("onOpen"),y=c.data("onClose"),x="sidr"===s?"sidr-open":"sidr-open "+s+"-open";if("open"===n||"toggle"===n&&!c.is(":visible")){if(c.is(":visible")||t)return;if(i!==!1)return o.close(i,function(){o.open(s)}),void 0;t=!0,"left"===h?(r={left:p+"px"},d={left:"0px"}):(r={right:p+"px"},d={right:"0px"}),u.is("body")&&(l=f.scrollTop(),f.css("overflow-x","hidden").scrollTop(l)),m?u.addClass("sidr-animating").css({width:u.width(),position:"absolute"}).animate(r,g,function(){e(this).addClass(x)}):setTimeout(function(){e(this).addClass(x)},g),c.css("display","block").animate(d,g,function(){t=!1,i=s,"function"==typeof a&&a(s),u.removeClass("sidr-animating")}),v()}else{if(!c.is(":visible")||t)return;t=!0,"left"===h?(r={left:0},d={left:"-"+p+"px"}):(r={right:0},d={right:"-"+p+"px"}),u.is("body")&&(l=f.scrollTop(),f.removeAttr("style").scrollTop(l)),u.addClass("sidr-animating").animate(r,g).removeClass(x),c.animate(d,g,function(){c.removeAttr("style").hide(),u.removeAttr("style"),e("html").removeAttr("style"),t=!1,i=!1,"function"==typeof a&&a(s),u.removeClass("sidr-animating")}),y()}}},o={open:function(e,t){n.execute("open",e,t)},close:function(e,t){n.execute("close",e,t)},toggle:function(e,t){n.execute("toggle",e,t)},toogle:function(e,t){n.execute("toggle",e,t)}};e.sidr=function(t){return o[t]?o[t].apply(this,Array.prototype.slice.call(arguments,1)):"function"!=typeof t&&"string"!=typeof t&&t?(e.error("Method "+t+" does not exist on jQuery.sidr"),void 0):o.toggle.apply(this,arguments)},e.fn.sidr=function(t){var i=e.extend({name:"sidr",speed:200,side:"left",source:null,renaming:!0,body:"body",displace:!0,onOpen:function(){},onClose:function(){}},t),s=i.name,a=e("#"+s);if(0===a.length&&(a=e("<div />").attr("id",s).appendTo(e("body"))),a.addClass("sidr").addClass(i.side).data({speed:i.speed,side:i.side,body:i.body,displace:i.displace,onOpen:i.onOpen,onClose:i.onClose}),"function"==typeof i.source){var r=i.source(s);n.loadContent(a,r)}else if("string"==typeof i.source&&n.isUrl(i.source))e.get(i.source,function(e){n.loadContent(a,e)});else if("string"==typeof i.source){var d="",l=i.source.split(",");if(e.each(l,function(t,i){d+='<div class="sidr-inner">'+e(i).html()+"</div>"}),i.renaming){var c=e("<div />").html(d);c.find("*").each(function(t,i){var o=e(i);n.addPrefix(o)}),d=c.html()}n.loadContent(a,d)}else null!==i.source&&e.error("Invalid Sidr Source");return this.each(function(){var t=e(this),i=t.data("sidr");i||(t.data("sidr",s),"ontouchstart"in document.documentElement?(t.bind("touchstart",function(e){e.originalEvent.touches[0],this.touched=e.timeStamp}),t.bind("touchend",function(e){var t=Math.abs(e.timeStamp-this.touched);200>t&&(e.preventDefault(),o.toggle(s))})):t.click(function(e){e.preventDefault(),o.toggle(s)}))})}})(jQuery);

// Custom Stickyheader
$.fn.stickify = function(topMargin, highLighted, stickyParent) {
    topMargin === undefined ? topMargin = 0 : topMargin;
    highLighted === undefined ? highLighted = 0 : highLighted;

    if(stickyParent) {
        var prevSibling = $(this).prev();
    }
    var stickyHeaderTop = $(this).offset().top,
        $window = $(window),
        that = $(this);
    $window.scroll(function(){
        if( $(window).scrollTop() > stickyHeaderTop - topMargin) {
            stickyParent !== undefined ? that.appendTo(stickyParent) : true;
            that.css({position: 'fixed', top: topMargin, width: '100%', zIndex: '10'});
            fixTopJump = that.height();
            that.next().css ({'margin-top': fixTopJump});
        } else {
            prevSibling !== undefined ? that.insertAfter(prevSibling) : true;
            that.css({position: 'relative', top: 'auto'});
            that.next().css ({'margin-top': 0});
        }
    });

    if(highLighted) {
        anchorarray = new Array();
        var i = 0;
        $(this).find('a').each(function() {
            var anchor = $(this).prop("hash").replace("#", "");
            if($('a[name="' + anchor + '"]').length) {
                var anchor_top = $('a[name="' + anchor + '"]').offset().top;
                anchorarray[i] = new Array(2);
                anchorarray[i][0] = anchor;
                anchorarray[i][1] = anchor_top - 200;
                i++;
            }
        });

        $(window).scroll(function(){
            var i = 0;
            for(i = 0; i < anchorarray.length; i++) {
                if((i+2) > anchorarray.length) {
                    if( $(window).scrollTop() >= anchorarray[i][1]) {
                        that.find('a.active').removeClass('active');
                        that.find('a[href="#' + anchorarray[i][0] + '"]').addClass('active');
                    }
                } else {
                    if( $(window).scrollTop() >= anchorarray[i][1] && $(window).scrollTop() < anchorarray[i+1][1]) {
                        that.find('a.active').removeClass('active');
                        that.find('a[href="#' + anchorarray[i][0] + '"]').addClass('active');
                    }
                }
            }
        });
    }
    return $(this);

}

//
$(function(){

    $('header .search-al-container .search-icon').click(function(){
        $(this).parent().toggleClass('active');
    });

    $('footer .connect-footer .connect-footer').html('<form id="mktoForm_1771"></form>');

    $.getScript('https://app-abd.marketo.com/js/forms2/js/forms2.min.js', function(data){
        MktoForms2.loadForm("https://app-abd.marketo.com", "564-SZS-136", 1771);
    })

    $('#header form .search-icon').unbind('click').click(function(e){
        e.stopPropagation();
        var effect = 'slide';
        var options = { direction: 'left' };
        var duration = 500;

        $('#header .block-search .form-type-searchfield input').toggleClass('active').focus();
        $('.block-search .search-icon.icon-muletheme-search2').toggleClass('active');

    });


    jQuery('.header__region .block-menu > ul.menu').hover(function() {
        jQuery(this).removeClass('unfocused');
        jQuery(this).addClass('focused');
    });
    jQuery('.header__region .block-menu > ul.menu').mouseleave(function() {
        jQuery(this).removeClass('focused');
        jQuery(this).addClass('unfocused');
    });

    var $phoneNum = $("#block-menu-menu-contact-phone-number li:last-child a");
    $phoneNum.click(function(e) {
        e.preventDefault();
    });

    // Mobile Menu
    $('#open-left').sidr({
        side: 'right',
        speed: 150,
        onOpen: function() {
            //$('#sidr .block-search input.form-text').focus();
        },
        onClose: function() {
            $('#sidr .block ul li .expanded div').click();
        }
    });

    // small/medium sized screen primary navigation controls

    $('#sidr .block > ul > li.is-expanded > .menu__link').each(function(){
        $(this).addClass('first-links collapsed');
    });

    $('#sidr .block > ul > li li.is-expanded > .menu__link').each(function(){
        $(this).addClass('first-links collapsed');
    });

    $("#sidr .block ul .first-links").each(function() {
        $(this).append('<div></div>');
    });

    $('#sidr .block-search input.form-text').focus(function(){
        $('#sidr .block-search .search-icon.icon-muletheme-search2').css('border', 'none');
    });

    $("#sidr .block ul li .first-links.collapsed div").click(function(e) {
        var submenu = $(this).parent().next();
        $(this).parent().toggleClass('expanded');
        submenu.toggle(150);
        return false;
    });
    $("#sidr .block ul li .first-links.expanded div").click(function(e) {
        var submenu = $(this).parent().next();
        $(this).parent().removeClass('expanded').addClass('collapsed');
        submenu.toggle(150);
        return false;
    });

    $('.sidr .menu__item.is-expanded div').click(function() {
        $(this).parent().parent().siblings().toggle(150);
    });

    $('#sidr .block-menu > .menu > li ul li .menu__link div').click(function() {
        $(this).parent().parent().parent().siblings('a').toggle(150);
    });

    $('#sidr .block-menu > .menu > li > .menu__link div').click(function() {
        $(this).parent().hasClass('expanded') ?
            $('#block-search-form--2').hide(150) :
            $('#block-search-form--2').show(150);
    });

    // Track Nav click event in GA
    $('header .menu li .menu__link').click(function () {
        ga('send', 'event', 'NAV', 'NavClick', $(this).html());
    });


});