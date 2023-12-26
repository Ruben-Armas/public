<?php

function agregar_estilos_paginacion() {
  wp_enqueue_style('estilos-paginacion', get_template_directory_uri() . '/css/pagination.css');
}
add_action('wp_enqueue_scripts', 'agregar_estilos_paginacion');

?>