<?php

function agregar_estilos_header() {
  wp_enqueue_style('estilos-header', get_template_directory_uri() . '/css/header.css');
}
add_action('wp_enqueue_scripts', 'agregar_estilos_header');

?>