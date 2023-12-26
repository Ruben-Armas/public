<?php

function agregar_estilos_footer() {
  wp_enqueue_style('estilos-footer', get_template_directory_uri() . '/css/footer.css');
}
add_action('wp_enqueue_scripts', 'agregar_estilos_footer');

?>