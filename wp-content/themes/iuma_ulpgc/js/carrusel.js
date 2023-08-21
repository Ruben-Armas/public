//Pequeño
$(document).ready(function(){
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
});