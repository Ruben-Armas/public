<?php

function custom_theme_setup() {
  // Habilitar menús personalizados
  register_nav_menus(array(
    'primary' => 'Menú Principal',
    'footer' => 'Menú del Pie de Página',
  ));
}
add_action('after_setup_theme', 'custom_theme_setup');

?>