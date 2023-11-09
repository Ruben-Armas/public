<?php

function agregar_estilo_noticias_single() {
  wp_enqueue_style(
    'single_noticia',
    get_template_directory_uri() . '/css/custom_styles/custom_single_noticia.scss');
}
add_action('wp_enqueue_scripts', 'agregar_estilo_noticias_single');

?>