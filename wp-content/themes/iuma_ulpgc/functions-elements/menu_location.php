<?php

function custom_theme_setup() {
  // Habilitar menús personalizados
  register_nav_menus(array(
    'primary' => 'Menú Principal',
    'footer' => 'Menú del Pie de Página',
    'header_top_language' => 'Selector de idioma en el Menú de botones del Header',
  ));
}
add_action('after_setup_theme', 'custom_theme_setup');

?>