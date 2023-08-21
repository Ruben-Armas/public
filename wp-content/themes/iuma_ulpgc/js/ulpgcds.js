/**
 * @file Jquery library for ULPGC DESIGN SYSTEM
 * @author Ateigh Diseño Web S.L.
 *
 */

(function ($) {

  'use strict';
  
  var layerWorking = false; // variable for menu layer display
  var breakpointHeader = 1125;

    //touch/tablet detection
    function isTablet(){
        if (navigator.userAgent.match(/Tablet/i) ||
            navigator.userAgent.match(/iPad/i) ||
            navigator.userAgent.match(/Kindle/i) ||
            navigator.userAgent.match(/Playbook/i) ||
            navigator.userAgent.match(/Nexus/i) ||
            navigator.userAgent.match(/Xoom/i) ||
            navigator.userAgent.match(/SM-N900T/i) || //Samsung Note 3
            navigator.userAgent.match(/GT-N7100/i) || //Samsung Note 2
            navigator.userAgent.match(/SAMSUNG-SGH-I717/i) || //Samsung Note
            navigator.userAgent.match(/SM-T330NU/i)){ //Samsung Tab 4)
        
            return true;
        }
        else
            return false;
    }
    
  
    function accessibleAccordion() {
        var expanded=false;
        var ariahidden=true;
      
        let getHeaders = (level) => $(".ulpgcds-accordion > " + level);
        var headerLevel = "h2";
        var headerList = getHeaders(headerLevel)
        if (headerList.length == 0) {
          headerLevel = "h3";
          headerList = getHeaders(headerLevel)
          if (headerList.length == 0) return;
        }
      
        var i = 0;
        headerList.each(function(){
          var headerContent = $(this).html();                        
          $(this).html('<button id="accordion-button-' + i + '" ' + ' aria-controls="accordion-panel-' + i +'" aria-expanded="'+ expanded +'">'+
                      '<span class="ulpgcds-accordion__title"><span class="ulpgcds-accordion__icon"></span>'+ headerContent +'</span></button>'
                      );
      
          $(this).nextUntil(headerLevel).wrapAll(
            '<div class="ulpgcds-accordion__panel"><div aria-hidden="'+ariahidden+'" aria-labelledby="accordion-button-' + i + '" '+
                        'class="ulpgcds-accordion__content" id="accordion-panel-' + i +'" role="region">'+'</div></div>'
            );
      
          i++;
      
        });
      
      
        var accordionButtons = $('.ulpgcds-accordion button');
        let addClickStyle =
          (item) => item.addClass("border-click");
        let removeClickStyle =
          (item) => item.removeClass("border-click");
      
        accordionButtons
        .on('click',function(){
          addClickStyle(accordionButtons);
          if ($(this).attr('aria-expanded') == 'true'){
            $(this).attr('aria-expanded','false');
            $('#'+$(this).attr('aria-controls')).attr('aria-hidden','true');
          }
          else{
            $(this).attr('aria-expanded','true');
            $('#'+$(this).attr('aria-controls')).attr('aria-hidden','false');
          }
          $(this).focus();            
        })
        .on('mouseup',function() {
          removeClickStyle($(this).parent().next());
        })
        .on('mousedown', function() {
          addClickStyle($(this).parent().next());
        })
        .hover(
          function(){            
            $(this).parent().next().addClass("border-hover");
            removeClickStyle(accordionButtons);
          },
          function(){
            $(this).parent().next().removeClass("border-hover");
          }
        );
      }
    
    function accesibleAccordion(){
        var i=0;
        var expanded=false;
        var ariahidden=true;
    
        $('.ulpgcds-accordion > h3 , .ulpgcds-accordion > h2').each(function(){          
          var contentTitle = $(this).html();                        
          $(this).html('<button id="accordion-button-' + i + '" ' + ' aria-controls="accordion-panel-' + i +'" aria-expanded="'+ expanded +'">'+
                  '<span class="ulpgcds-accordion__title"><span class="ulpgcds-accordion__icon"></span>'+contentTitle +'</span></button>');          
          i++;
        });
        i=0;
        $('.ulpgcds-accordion > div').each(function(){
            var contentPanel = $(this).html();            
            $(this).html('<div class="ulpgcds-accordion__panel"><div aria-hidden="'+ariahidden+'" aria-labelledby="accordion-button-'+i+'" '+
                    'class="ulpgcds-accordion__content" id="accordion-panel-' + i +'" role="region">'+contentPanel+'</div>');
            i++;
        });
        $('.ulpgcds-accordion button').on('click',function(){  
            $('.ulpgcds-accordion button').removeClass("border-click"); 
            if ($(this).attr('aria-expanded') == 'true'){ 
                $(this).attr('aria-expanded','false');
                $('#'+$(this).attr('aria-controls')).attr('aria-hidden','true');
            }
            else{
                $(this).attr('aria-expanded','true');
                $('#'+$(this).attr('aria-controls')).attr('aria-hidden','false');
            }
            $(this).focus();            
        });        
        $('.ulpgcds-accordion button').on("mouseup",function() {
             $(this).parent().next().removeClass("border-click"); 
          })
          .on("mousedown", function() {
             $(this).parent().next().addClass("border-click");  
          });
        $('.ulpgcds-accordion button').hover(function(){            
                $(this).parent().next().addClass("border-hover");
                $('.ulpgcds-accordion button').removeClass("border-click"); 
            },function(){
                $(this).parent().next().removeClass("border-hover"); 
        });
        
    }
    
    
    function getWidthScreen(){
        if (document.body)	
                var widthScreen = (document.body.clientWidth);	
        else	
                var widthScreen = (window.innerWidth);
        var scrollBarWidth = 0;
            if (window.innerWidth)
            scrollBarWidth = window.innerWidth - jQuery("body").width();

            widthScreen = widthScreen + scrollBarWidth;
        return widthScreen;
    }
    
    function ajustesLayerMenu(){
        
        $(".ulpgcds-header__bottom__menu:first-child li").mouseover(function(){
                //$(".capa-menu").show();                
                $(".layer-menu").addClass("visible");                        
        });
        $(".ulpgcds-header__bottom__menu li").mouseout(function(){			
                //$(".capa-menu").hide();
                $(".layer-menu").removeClass("visible");

        });
        $(".ulpgcds-header .info_usuario").mouseover(function(){
                 $(".layer-menu").addClass("visible");
                 $(".submenu").show();
        });
        $(".ulpgcds-header .info_usuario").mouseout(function(){			
                $(".layer-menu").removeClass("visible");
                $(".submenu").hide();
        });
    }
    
    function ajustesUserMenu(ancho){
        // Menú usuario
        $(".ulpgcds-header__user-menu").on("click", function(ancho){            
            $(".ulpgcds-header .nav-toggle .ulpgcds-btn__icon").addClass("icon-menu"); 
            $(".ulpgcds-header .nav-toggle .ulpgcds-btn__icon").removeClass("icon-close");
            $(".ulpgcds-header .nav-toggle").removeClass("open");               
            if ($(".ulpgcds-header .submenu").css("display") === "none"){
                $(".ulpgcds-header .submenu").fadeIn("normal",function(){});                                                
                $(".ulpgcds-header .info_usuario").addClass("open");
                $("body").addClass("menu-open");
            }
            else{
                $(".ulpgcds-header .submenu").fadeOut("fast",function(){
                    $(".ulpgcds-header__user-menu").removeClass("open");
                    $("body").removeClass("menu-open");
                });                                                

            }

        });
    }
    
    function ajustesMobileMenu(ancho){
        
        $('.ulpgcds-header__bottom__menu span').on('click',function(){                                                                           
            if (!$(this).hasClass("open")){                
               $(this).parent().find("ul").fadeIn("fast",function(){                           
               });
               $(this).addClass("open");
               $(this).parent().find("ul").addClass("open");               
               $(this).parent().addClass("active-trail");
            } else {                                
                $(this).parent().find("ul").slideUp("fast",function(){
                    $(this).parent().find("ul").removeClass("open");                 
                });
                $(this).removeClass("open");
                 
                if (!$(this).parent(".active").length) 
                    $(this).parent().removeClass("active-trail");
            }                        
            return false;
        });
        // Menú
        $(".ulpgcds-header .nav-toggle").on("click", function(){
            layerWorking = true;
             $(".ulpgcds-header .info_usuario").removeClass("open");   
             $(".ulpgcds-header .submenu").hide();  

            if ($(".ulpgcds-header__bottom").css("display") === "none"){
                $(".ulpgcds-header__bottom").fadeIn("normal",function(){});                        
                $(".nav-toggle .ulpgcds-btn__icon").removeClass("icon-menu");
                $(".nav-toggle .ulpgcds-btn__icon").addClass("icon-close");
                $(".nav-toggle").addClass("open");
                $("body").addClass("menu-open");
            }
            else{
                $(".ulpgcds-header__bottom").fadeOut("normal",function(){});                        
                $(".nav-toggle .ulpgcds-btn__icon").addClass("icon-menu");
                $(".nav-toggle .ulpgcds-btn__icon").removeClass("icon-close");
                $(".nav-toggle").removeClass("open");    
                $("body").removeClass("menu-open");
            }
            layerWorking = false;
        });    
        
        $(".submenu-mobile").click(function(){                        
            if(ancho <= breakpointHeader || isTablet()){                
                if($(".ulpgcds-sidebar-left").css("display") == 'none'){
                    $(".ulpgcds-sidebar-left").slideDown("fast");
                    $(".submenu-mobile span.flecha_titulo").removeClass("flecha_abajo");
                    $(".submenu-mobile span.flecha_titulo").addClass("flecha_arriba");
                    $(".submenu-mobile .texto_titulo strong").html("Ocultar &iacute;ndice de ");
                }else{
                    $(".ulpgcds-sidebar-left").slideUp("fast");
                    $(".submenu-mobile span.flecha_titulo").removeClass("flecha_arriba");
                    $(".submenu-mobile span.flecha_titulo").addClass("flecha_abajo");
                    $(".submenu-mobile .texto_titulo strong").html("Mostrar &iacute;ndice de ");
                }			              									
            }
         });

         $("#titulo_menu_izq").click(function(){             
            $("#titulo_menu_izq").toggleClass("active"); 
            if($(".sidebar-left__block").css("display") == 'none'){
				$(".sidebar-left__block").slideDown("fast");
			}else{
				$(".sidebar-left__block").slideUp("fast");			
			}           
         });	

         $(".sidebar-left__block .menu:first-child li:first-child").each(function(index, itemdata){
            if (index == 0){
                if ($("> a", this).length)
                    $("#title-submenu-movil").html($("> a", this).text());
                else
                    $("#title-submenu-movil").html($(this).html());
                
            }
        });

    }
    
    function unboundHeaderButtons(){
        $(".ulpgcds-header .nav-toggle").unbind("click");
        $(".ulpgcds-header__bottom__menu span").unbind("click");
        $(".ulpgcds-header__user").unbind("click");
    }
    
    function validateStyleForm(){
        $('.ulpgcds-form').each(function(){
            $("input[type='submit']",this).on("click", function(){
                $("input:required").each(function(){
                   $(this).addClass("ulpgcds-form__item__error"); 
                });
                $("textarea:required").each(function(){
                   $(this).addClass("ulpgcds-form__item__error"); 
                });
            });
        });
    }
    
    function countCharacterTextarea(){
        $('.ulpgcds-form__item--counter').each(function(){
            if ($('textarea',this).attr('maxlength')){
                $("<div class='counter'>"+$('textarea',this).attr('maxlength')+"</div>").insertBefore($("textarea", this));  
                $(".counter",this).css({ "left" : $('textarea',this).width() - 6});
                var maxlength = $('textarea',this).attr('maxlength');                
                $("textarea",this).on("input", function(){                    
                    if ($(this).val().length){
                        var len = $(this).val().length;
                        if (len >= maxlength+1) {
                            $(this).html("0");
                        } else {                            
                            if (maxlength - len < 10){                                
                                 $(this).parent().find(".counter").addClass("color-red");                                           
                            }
                            else{
                                $(this).parent().find(".counter").removeClass("color-red");
                            }
                            $(this).parent().find(".counter").html(maxlength - len);                            
                            
                        }
                    }
                });
            }
        });      
    }

    function breadcrumbCondensed(){        
        if ($(".ulpgcds-breadcrumb").length){         
              
           $(".ulpgcds-breadcrumb ul").each(function(){
                var breadcrumb = $(this);
                var breadcrumbLen = $("li", this).length;
                var lastChild = $("li:last-child",this).html();  
                var lastChild2 = $("li:nth-last-child(2)",this).html();                  
                if (breadcrumbLen > 3){
                    var subbreadcrumb = $("<ul>");
                    $("li", breadcrumb).each(function(i,l){
                        if (i > 0 && i < breadcrumbLen-1){ 
                            $(this).appendTo(subbreadcrumb);                         
                        }
                    });
                    
                    $("li:nth-child(2)",$(this)).html("<span class='ulpgcds-icon-dots'><span>").addClass('ulpgcds-breadcrumb__submenu');
                    $(subbreadcrumb).appendTo($("li:nth-child(2)",$(this)));                    
                    $(breadcrumb).append("<li>"+lastChild2+"</li>");
                    $(breadcrumb).append("<li>"+lastChild+"</li>");
                }
           });
           
        }    
    }

    function getVimeoThumb(id) {
        return $.ajax({
            type:'GET',
            url: 'https://vimeo.com/api/v2/video/' + id + '.json',
            jsonp: 'callback',
            dataType: 'jsonp',
            success: function(data){
                var thumbnail_src = data[0].thumbnail_large; 
                return thumbnail_src;
            }
        });
    }
    
    function actionsResize(){
        var widthScreen = getWidthScreen();                 
        ajustesUserMenu(widthScreen);
        $(".submenu").hide();         
        if (widthScreen > breakpointHeader && !isTablet()){                    
            $('.ulpgcds-header__bottom__menu').show();                       
            $('.ulpgcds-header__bottom__menu ul').removeClass("open");
            $('.ulpgcds-header__bottom__menu ul:first-child').show();
            $('.ulpgcds-header__bottom__menu ul').each(function(){     
                $('ul',this).removeClass("open");
                $('ul',this).hide();
            });                    
            $('.ulpgcds-header__bottom__menu ul ul').removeClass("open");  
            $('.ulpgcds-header__bottom__menu ul ul').hide();  
            $('.ulpgcds-header__bottom__menu ul ul span').removeClass("open");  
        }else{
            $(".cabecera-scroll-1").removeClass();
            $(".cabecera-scroll-2").removeClass();
        }
    }
    
    /**
    * 
    *
    */
    $(document).ready(function(){   
        var _extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},loadConfig=function(){var t={},e=function(e,i){t[e]=i},i=function(e){return t[e]},n=function(e){return t[e]};return{set:e,get:i,remove:n}},DATA_HASH_ID="data-hashtooltip-id",pluginConfig=loadConfig(),findById=function(t){var e=arguments.length<=1||void 0===arguments[1]?"":arguments[1];return""!==e?document.querySelector("#"+t+"["+DATA_HASH_ID+'="'+e+'"]'):document.getElementById(t)},addClass=function(t,e){t.classList?t.classList.add(e):t.className+=" "+e},hasClass=function(t,e){return t.classList?t.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(t.className)},searchParentHashId=function(t,e){for(var i=!1,n=t;1===n.nodeType&&n&&i===!1;)n.hasAttribute(e)===!0?i=!0:n=n.parentNode;return i===!0?n.getAttribute(e):""},wrapItem=function(t,e,i,n){var o=[e,i].filter(Boolean).join("-"),a=document.createElement("SPAN");return addClass(a,o),a.setAttribute(DATA_HASH_ID,n),t.parentNode.insertBefore(a,t),a.appendChild(t),a},createTooltip=function(t){var e=[t.className,t.tooltipSimpleRaw].filter(Boolean).join("-"),i=t.text;if(!i&&t.id){var n=findById(t.id);n&&(i=n.innerHTML)}return'<span class="'+e+" "+t.jsClass+'" id="'+t.tooltipId+'" '+t.roleTooltip+" "+t.hiddenAttribute+" "+t.hashIdAttribute+">"+i+"</span>"},plugin=function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=_extends({TOOLTIP_SIMPLE:"ulpgcds-tooltip",TOOLTIP_SIMPLE_CONTAINER:"ulpgcds-tooltip__container",TOOLTIP_SIMPLE_RAW:"ulpgcds-tooltip-raw",TOOLTIP_SIMPLE_LABEL_ID:"label_simpletooltip_",TOOLTIP_DATA_TEXT:"data-simpletooltip-text",TOOLTIP_DATA_PREFIX_CLASS:"data-simpletooltip-prefix-class",TOOLTIP_DATA_CONTENT_ID:"data-simpletooltip-content-id",ATTR_DESCRIBEDBY:"aria-describedby",ATTR_HIDDEN:"aria-hidden",ATTR_ROLE:"role",ROLE:"tooltip"},t),i=Math.random().toString(32).slice(2,12);pluginConfig.set(i,e);var n=function(){var t=arguments.length<=0||void 0===arguments[0]?document:arguments[0];return[].slice.call(t.querySelectorAll("."+e.TOOLTIP_SIMPLE))},o=function(t){n(t).forEach(function(t){t.setAttribute(DATA_HASH_ID,i);var n=Math.random().toString(32).slice(2,12),o=t.hasAttribute(e.TOOLTIP_DATA_TEXT)===!0?t.getAttribute(e.TOOLTIP_DATA_TEXT):"",a=t.hasAttribute(e.TOOLTIP_DATA_PREFIX_CLASS)===!0?t.getAttribute(e.TOOLTIP_DATA_PREFIX_CLASS):"",r=t.hasAttribute(e.TOOLTIP_DATA_CONTENT_ID)===!0?t.getAttribute(e.TOOLTIP_DATA_CONTENT_ID):"";t.setAttribute(e.ATTR_DESCRIBEDBY,e.TOOLTIP_SIMPLE_LABEL_ID+n),wrapItem(t,a,e.TOOLTIP_SIMPLE_CONTAINER,i).insertAdjacentHTML("beforeEnd",createTooltip({text:o,className:a,jsClass:e.TOOLTIP_SIMPLE,id:r,tooltipId:e.TOOLTIP_SIMPLE_LABEL_ID+n,tooltipSimpleRaw:e.TOOLTIP_SIMPLE_RAW,hiddenAttribute:e.ATTR_HIDDEN+'="true"',roleTooltip:e.ATTR_ROLE+'="'+e.ROLE+'"',hashIdAttribute:DATA_HASH_ID+'="'+i+'"'}))})};return{attach:o}},main=function(){return["mouseenter","focus","mouseleave","blur","keydown"].forEach(function(t){document.body.addEventListener(t,function(e){var i=searchParentHashId(e.target,DATA_HASH_ID);if(""!==i){var n=pluginConfig.get(i);if(hasClass(e.target,n.TOOLTIP_SIMPLE)===!0){var o=e.target;if("mouseenter"===t||"focus"===t){var a=findById(o.getAttribute(n.ATTR_DESCRIBEDBY),i);a&&a.setAttribute(n.ATTR_HIDDEN,"false")}if("mouseleave"===t||"blur"===t||"keydown"===t&&27===e.keyCode){var a=findById(o.getAttribute(n.ATTR_DESCRIBEDBY),i);a&&a.setAttribute(n.ATTR_HIDDEN,"true")}}}},!0)}),plugin};window.van11yAccessibleSimpleTooltipAria=main();var onLoad=function t(){var e=window.van11yAccessibleSimpleTooltipAria();e.attach(),document.removeEventListener("DOMContentLoaded",t)};document.addEventListener("DOMContentLoaded",onLoad);
    
        // Funciones para controlar la capa de menu y versión móvil del menú
        var widthScreen = getWidthScreen();
        ajustesMobileMenu(widthScreen);
        if (widthScreen > breakpointHeader && !isTablet()){		
            ajustesLayerMenu(widthScreen);
        } else if (widthScreen > breakpointHeader){
            
        }else{                
            ajustesUserMenu(widthScreen);
        }
        
        
        // Funciones para campos de texto
        $('.ulpgcds-form input').keyup(function(){
            if( $(this).val() !== ""){
                $(this).addClass("filled");
            }else{
                $(this).removeClass("filled");
            }
        });  
        $('.ulpgcds-form textarea').keyup(function(){
            if( $(this).val() !== ""){
                $(this).addClass("filled");
            }else{
                $(this).removeClass("filled");
            }
        });
        $('.ulpgcds-form select').on("change",function(){
            if( $(this).val() !== ""){
                $(this).addClass("filled");
            }else{
                $(this).removeClass("filled");
            }
        });
    
        // Funciones para tabs
        $('.ulpgcds-tabs li').on("click",function(){
            var tab_id = $(this).attr('href');
            if (!tab_id) tab_id = $(this).attr('data-href');
            $(this).parent().find("li").removeClass('active');
            $(this).parent().parent().find('.ulpgcds-tab-content').removeClass('active');
            $(this).addClass('active');
            if ($(tab_id))
                $(tab_id).addClass('active');
        });
         
        // Funciones para los acordeones
        if ($('.ulpgcds-accordion').length){           
            //accesibleAccordion();
            accessibleAccordion();
        }  
        
        // Funciones para los artículo
        if ($('.ulpgcds-article--short').length){
            // TODO: optimizacion ratio image
            $('.ulpgcds-article--short').each(function(){
               $('img',this).wrap("<figure></figure>"); 
            }); 
        }  
        
        // Funciones mínimas en formularios
        if ($('.ulpgcds-form').length){
            validateStyleForm();            
            if ($('.ulpgcds-form__item--counter').length){                
                countCharacterTextarea();
            }
        }

        // Funciones inputs numericos
        $('.ulpgcds-form .ulpgcds-form__item input[type="number"]').each(function(){
            $("<span class='spin-number'><span class='icon ulpgcds-icon-caret-up' onclick='this.parentNode.parentNode.querySelector(\"input[type=number]\").stepUp();'></span><span class='icon ulpgcds-icon-caret-down' onclick='this.parentNode.parentNode.querySelector(\"input[type=number]\").stepDown()'></span></span>").insertAfter(this);
        });
        
        // Funciones para selects múltiples 
        if ($('.ulpgcds-form select[multiple="multiple"]').length){
            // Hace uso de la librería chosen
            $('select[multiple="multiple"]').each(function(){
                if (typeof $(this).chosen !== "undefined") {   
                    $(this).chosen();
                }
                else{
                    console.log("Chosen library not install");
                }
            });
            
        }
        
        // Funciones para fechas
        if ($( ".ulpgcds-datepicker" ).length){
            $( ".ulpgcds-datepicker" ).each(function(){
                //var fullmonth_array = $.datepicker.regional['es'].monthNames; 
                $( this ).datepicker({
                    changeMonth: true,
                    changeYear: true,
                    dateFormat: 'dd-mm-yy',
                    monthNamesShort: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
                  });
              });
        }
        
        // Funciones para tablas
        if ($( ".tablesaw" ).length){
            
        }
        
        
        // Funciones para vídeos                
        if ($('.ulpgcds-video').length ) {
            $('.ulpgcds-video').each(function(){
                if ($('iframe[src*="bustreaming.ulpgc.es"]',this).length){
                    var value = $('iframe',this).attr("src"); 
                    var id = value.split("/");                      
                    $('iframe',this).on("load", function(){                        
                        if ($("iframe",this).contents().find("#player1").length){
                            var poster = $("iframe",this).contents().find("#player1").attr("poster");
                            $(this).css({ "background" : "url("+poster+") center center no-repeat" });
                            $(this).css({ "background-size" : "cover"});
                        }
                    });   
                    $(this).on("click", function(event){                                                                                                         
                        $("iframe",this).show();
                        $(this).addclass("with-overlay");
                    });                    
                    $(this).append("<span class='ulpgcds-video__play'><span>");
                }                
                if ($('iframe[src*="youtube.com"]', this).length && $('iframe[src*="youtube.com"]',this)){                    
                    var value = $("iframe", this).attr("src").replace("watch?v=", "embed/"); 
                    var id = value.split("/");
                    $(this).css({ "background" : "url(https://i.ytimg.com/vi/"+id[id.length-1]+"/maxresdefault.jpg) center center no-repeat" });
                    $(this).css({ "background-size" : "cover"});
                    $(this).on("click", function(event){                                                         
                        var video = '<iframe class="ulpgcds-video__iframe" src="' + value + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen"></iframe>';
                        $(this).html(video);  
                        $("iframe",this).show();
                        $(this).addclass("with-overlay");
                    });
                    $(this).append("<span class='ulpgcds-video__play'><span>");                    
                }
                if ($('iframe[src*="vimeo.com"]', this).length && $('iframe[src*="vimeo.com"]',this)){  
                    var value = $("iframe", this).attr("src"); 
                    
                    var id = value.split("/");
                    var thumbnail_src = "";
                    var videoVimeo = $(this);
                    var thumbnail_data =
                        $.ajax({
                            type:'GET',
                            url: 'https://vimeo.com/api/v2/video/' + id[id.length-1] + '.json',
                            jsonp: 'callback',
                            dataType: 'jsonp',
                            success: function(data){
                                thumbnail_src = data[0].thumbnail_large;    
                                $(videoVimeo).css({ "background" : "url("+thumbnail_src+") center center no-repeat" });
                                $(videoVimeo).css({ "background-size" : "cover"});
                            }
                        });                    
                    $(this).on("click", function(event){                                                         
                        var video = '<iframe class="ulpgcds-video__iframe" src="' + value + '" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen"></iframe>';
                        $(this).html(video);  
                        $("iframe",this).show();
                        $(this).addclass("with-overlay");
                    });
                    $(this).append("<span class='ulpgcds-video__play'><span>");     
                    
                }                
            });
            
                        
          }
          //Funciones para breadcrumb     
          if ($('.ulpgcds-breadcrumb').length ) {
            breadcrumbCondensed();
            }          
    });    


    //Ajustes al redimencionsar la ventana
    $(window).bind("resize",function() {
       actionsResize(); 
    });

})(jQuery);

var _extends=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t},loadConfig=function(){var t={},e=function(e,i){t[e]=i},i=function(e){return t[e]},n=function(e){return t[e]};return{set:e,get:i,remove:n}},DATA_HASH_ID="data-hashtooltip-id",pluginConfig=loadConfig(),findById=function(t){var e=arguments.length<=1||void 0===arguments[1]?"":arguments[1];return""!==e?document.querySelector("#"+t+"["+DATA_HASH_ID+'="'+e+'"]'):document.getElementById(t)},addClass=function(t,e){t.classList?t.classList.add(e):t.className+=" "+e},hasClass=function(t,e){return t.classList?t.classList.contains(e):new RegExp("(^| )"+e+"( |$)","gi").test(t.className)},searchParentHashId=function(t,e){for(var i=!1,n=t;1===n.nodeType&&n&&i===!1;)n.hasAttribute(e)===!0?i=!0:n=n.parentNode;return i===!0?n.getAttribute(e):""},wrapItem=function(t,e,i,n){var o=[e,i].filter(Boolean).join("-"),a=document.createElement("SPAN");return addClass(a,o),a.setAttribute(DATA_HASH_ID,n),t.parentNode.insertBefore(a,t),a.appendChild(t),a},createTooltip=function(t){var e=[t.className,t.tooltipSimpleRaw].filter(Boolean).join("-"),i=t.text;if(!i&&t.id){var n=findById(t.id);n&&(i=n.innerHTML)}return'<span class="'+e+" "+t.jsClass+'" id="'+t.tooltipId+'" '+t.roleTooltip+" "+t.hiddenAttribute+" "+t.hashIdAttribute+">"+i+"</span>"},plugin=function(){var t=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],e=_extends({TOOLTIP_SIMPLE:"ulpgcds-tooltip",TOOLTIP_SIMPLE_CONTAINER:"ulpgcds-tooltip__container",TOOLTIP_SIMPLE_RAW:"ulpgcds-tooltip-raw",TOOLTIP_SIMPLE_LABEL_ID:"label_simpletooltip_",TOOLTIP_DATA_TEXT:"data-simpletooltip-text",TOOLTIP_DATA_PREFIX_CLASS:"data-simpletooltip-prefix-class",TOOLTIP_DATA_CONTENT_ID:"data-simpletooltip-content-id",ATTR_DESCRIBEDBY:"aria-describedby",ATTR_HIDDEN:"aria-hidden",ATTR_ROLE:"role",ROLE:"tooltip"},t),i=Math.random().toString(32).slice(2,12);pluginConfig.set(i,e);var n=function(){var t=arguments.length<=0||void 0===arguments[0]?document:arguments[0];return[].slice.call(t.querySelectorAll("."+e.TOOLTIP_SIMPLE))},o=function(t){n(t).forEach(function(t){t.setAttribute(DATA_HASH_ID,i);var n=Math.random().toString(32).slice(2,12),o=t.hasAttribute(e.TOOLTIP_DATA_TEXT)===!0?t.getAttribute(e.TOOLTIP_DATA_TEXT):"",a=t.hasAttribute(e.TOOLTIP_DATA_PREFIX_CLASS)===!0?t.getAttribute(e.TOOLTIP_DATA_PREFIX_CLASS):"",r=t.hasAttribute(e.TOOLTIP_DATA_CONTENT_ID)===!0?t.getAttribute(e.TOOLTIP_DATA_CONTENT_ID):"";t.setAttribute(e.ATTR_DESCRIBEDBY,e.TOOLTIP_SIMPLE_LABEL_ID+n),wrapItem(t,a,e.TOOLTIP_SIMPLE_CONTAINER,i).insertAdjacentHTML("beforeEnd",createTooltip({text:o,className:a,jsClass:e.TOOLTIP_SIMPLE,id:r,tooltipId:e.TOOLTIP_SIMPLE_LABEL_ID+n,tooltipSimpleRaw:e.TOOLTIP_SIMPLE_RAW,hiddenAttribute:e.ATTR_HIDDEN+'="true"',roleTooltip:e.ATTR_ROLE+'="'+e.ROLE+'"',hashIdAttribute:DATA_HASH_ID+'="'+i+'"'}))})};return{attach:o}},main=function(){return["mouseenter","focus","mouseleave","blur","keydown"].forEach(function(t){document.body.addEventListener(t,function(e){var i=searchParentHashId(e.target,DATA_HASH_ID);if(""!==i){var n=pluginConfig.get(i);if(hasClass(e.target,n.TOOLTIP_SIMPLE)===!0){var o=e.target;if("mouseenter"===t||"focus"===t){var a=findById(o.getAttribute(n.ATTR_DESCRIBEDBY),i);a&&a.setAttribute(n.ATTR_HIDDEN,"false")}if("mouseleave"===t||"blur"===t||"keydown"===t&&27===e.keyCode){var a=findById(o.getAttribute(n.ATTR_DESCRIBEDBY),i);a&&a.setAttribute(n.ATTR_HIDDEN,"true")}}}},!0)}),plugin};window.van11yAccessibleSimpleTooltipAria=main();var onLoad=function t(){var e=window.van11yAccessibleSimpleTooltipAria();e.attach(),document.removeEventListener("DOMContentLoaded",t)};document.addEventListener("DOMContentLoaded",onLoad);
