$(document).ready(function(){
    //PEQUEÑO
    $('.ulpgcds-carrusel--small').slick({
        slidesToShow: 3,
        slidesToScroll: 3,
        prevArrow: '<button type="button" class="slick-prev"><span>Anterior</span></button>',
        nextArrow: '<button type="button" class="slick-next"><span>Siguiente</span></button>',
        dots: true,
        responsive: [
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,  
                dots: true,
            }
        }]
    });

    //MEDIANO
    if ($(".ulpgcds-carrusel--medium").length){
        $(".ulpgcds-carrusel--medium").slick({
            slidesToShow: 3,
            slidesToScroll: 3,                                  
            prevArrow: '<button type="button" class="slick-prev"><span>Anterior</span></button>',
            nextArrow: '<button type="button" class="slick-next"><span>Siguiente</span></button>',
            dots: true, 
            responsive: [
                {
                    breakpoint: 1280,
                    settings: {
                        slidesToShow: 3,
                    }
                },                                
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll:2,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {                             
                        slidesToShow: 1,
                        slidesToScroll:1,
                    }
                }
            ]
        });   
    }

    //GRANDE
    if ($('.ulpgcds-carrusel--large')){            
        $('.ulpgcds-carrusel--large').slick({
            prevArrow: '<button type="button" class="slick-prev"><span>Anterior</span></button>',
            nextArrow: '<button type="button" class="slick-next"><span>Siguiente</span></button>',
            dots: true
        });
        // Ajustes para su uso en portada al redimensionar la pantalla
        $(window).bind("resize",function() {
            if ($('.ulpgcds-carrusel--large').length){
                var ancho = (document.body.clientWidth);
                if (ancho > 1440){
                    var padding = (ancho - 1440)/2;
                    $(".ulpgcds-carrusel--large__box").css({ "paddingLeft" : padding });
                }
                else{
                    $(".ulpgcds-carrusel--large__box").css({ "paddingLeft" : "16px" });
                    if (ancho < 767){                    
                        $('.ulpgcds-carrusel--large li').on('click',function(){                                           
                            window.location.href= $('.ulpgcds-btn',this).attr('href');
                        });
                    }
                }
                var alto = ($('.ulpgcds-carrusel--large').height() - $(".ulpgcds-carrusel--large__box").height);
                $(".ulpgcds-carrusel--large__box").css({ "marginTop" : alto });
            }
        });
    }
});