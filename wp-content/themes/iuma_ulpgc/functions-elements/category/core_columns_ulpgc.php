<?php

// Cambia la categoría del bloque existente (core/columns) a ULPGC
function modify_block_category($settings) {
  if (isset($settings['name']) && $settings['name'] === 'core/columns'){
      $settings['category'] = 'ulpgc';
  }
  return $settings;
}
add_filter('block_type_metadata', 'modify_block_category', 10, 2);

?>