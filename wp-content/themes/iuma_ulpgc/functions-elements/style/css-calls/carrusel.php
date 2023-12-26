<?php

function agregar_estilos_carrusel() {
  wp_enqueue_style('estilos-carrusel', get_template_directory_uri() . '/css/carrusel.css');
}
add_action('wp_enqueue_scripts', 'agregar_estilos_carrusel');

?>