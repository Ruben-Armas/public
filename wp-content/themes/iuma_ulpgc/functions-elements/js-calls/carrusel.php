<?php

/**
 * Añade el JavaScript que hace funcionar al Carrusel
 *
 * @return void
 */
//wp_enqueue_script('carrusel-script', get_template_directory_uri() . '/js/carrusel.js', array('jquery'), '1.0', true);
function carrusel_js(){    
  wp_register_script('carrusel_js', get_stylesheet_directory_uri(). '/js/carrusel.js', array('jquery'), '1.0', true );
  wp_enqueue_script('carrusel_js');    
}
add_action("wp_enqueue_scripts", "carrusel_js");

?>