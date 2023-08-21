<?php
/*
Plugin Name: plugin de prueba
Description: Este es un plugin de ejemplo
Author: Rubén Armas IUMA
Version: 1.0.0
*/

function prueba_plugin() {

  // Make path a variable so we don't write it twice
  $blockPath = '/js/prueba-plugin.js';
  //echo "prueba plugin";
  //echo plugins_url($blockPath, __FILE__);
  
  // Enqueue the main block index.js file
  wp_enqueue_script(
    'prueba-plugin', // Unique handle for JS file
    plugin_dir_url(__FILE__) . $blockPath, // Path to file
    [ 'wp-blocks', 'wp-element', 'wp-i18n' ], // Required dependencies for blocks
    filemtime(plugin_dir_path(__FILE__) . $blockPath) // Version of last time file was saved
  );

}
// Hook into editor only hook
add_action( 'enqueue_block_editor_assets', 'prueba_plugin' );

?>