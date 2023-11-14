<?php

function agregar_list_category_phone_view() {
  wp_enqueue_script(
    'estilos_movil-list_category',
    get_template_directory_uri() . '/blocks-dynamic/list-category/list_category_phone_view.js',
    array(), // Sin dependencias
    '0.1', // Versión del archivo jquery
    true
  );
}
add_action('wp_enqueue_scripts', 'agregar_list_category_phone_view');

?>