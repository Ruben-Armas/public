$(document).ready(function() {
    var prevScrollPos = $(window).scrollTop();

    $(window).scroll(function() {
      var currentScrollPos = $(window).scrollTop();

      if (currentScrollPos > prevScrollPos) {
        // Hacer scroll hacia abajo
        $('#main-menu').css('height', '50px');
      } else {
        // Hacer scroll hacia arriba
        $('#main-menu').css('height', '100px');
      }

      prevScrollPos = currentScrollPos;
    });
  });