$(document).ready(function() {
  //console.log("header_menu_scroll");
  var prevScrollPos = $(window).scrollTop();
  var menu = $('#main-menu');
  var scrollThreshold = 600;

  $(window).scroll(function() {
    var currentScrollPos = $(window).scrollTop();
    menu.css('z-index', '-1');

    if (currentScrollPos > prevScrollPos) {
      // Scroll abajo pasando el umbral
      if (currentScrollPos > scrollThreshold) {
        // Aplicar transición solo si se ha bajado más allá del umbral
        $('#main-menu').css({'top': '-36px', 'transition': 'top 1s ease-in-out'});
      }
    } else {
      // Scroll arriba
      $('#main-menu').css({'top': '0px', 'transition': 'top 0.5s ease-in-out'});
    }

    prevScrollPos = currentScrollPos;
  });
});