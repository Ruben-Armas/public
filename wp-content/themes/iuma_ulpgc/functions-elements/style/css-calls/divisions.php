<?php

function agregar_estilos_divisiones() {
  wp_enqueue_style('estilos-divisiones', get_template_directory_uri() . '/css/divisions.css');
}
add_action('wp_enqueue_scripts', 'agregar_estilos_divisiones');

?>