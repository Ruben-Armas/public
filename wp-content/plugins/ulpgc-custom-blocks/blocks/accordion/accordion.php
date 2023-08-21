<?php
/*
Plugin Name: Acordeón
Description: Acordeón con el estilo de la ULPGC
Author: Rubén Armas IUMA
Version: 1.0.0
*/

function accordion_plugin() {

  // Make path a variable so we don't write it twice
  $blockPath = '/js/accordion.js';
  //echo ("accordion");
  
  // Enqueue the main block index.js file
  wp_enqueue_script(
    'accordion-block', // Unique handle for JS file
    plugin_dir_url(__FILE__) . $blockPath, // Path to file
    [ 'wp-blocks', 'wp-element', 'wp-i18n' ], // Required dependencies for blocks
    filemtime(plugin_dir_path(__FILE__) . $blockPath) // Version of last time file was saved
  );
  /*wp_enqueue_style(
    'ejemplo',
    plugins_url( 'ejemplo.css', __FILE__ ) 
  );*/

}
// Hook into editor only hook
add_action( 'enqueue_block_editor_assets', 'accordion_plugin' );

?>