<?php

function agregar_estilo_noticias_single() {
  wp_enqueue_style(
    'single_noticia',
    get_template_directory_uri() . '/css/single_noticia.css');

  wp_enqueue_style(
    'single_navigation',
    get_template_directory_uri() . '/css/single_post_nav.css');
}
add_action('wp_enqueue_scripts', 'agregar_estilo_noticias_single');

?>