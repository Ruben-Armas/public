<?php
/*
Plugin Name: My First Accordion
Description: Un plugin para crear un nuevo bloque de acordeón en Gutenberg
Author: Rubén Armas IUMA
Version: 1.0.0
*/

function block_accordion() {
  // Make path a variable so we don't write it twice
  $blockPath = '/blocks/accordion/js/accordion.js';
  echo "holaaaaaaaaa";
  echo get_template_directory_uri();
  echo plugins_url();

  wp_enqueue_script(
    'block_accordion',  // Unique handle for JS file
    get_template_directory_uri() . $blockPath, // Path to file
    [ 'wp-blocks', 'wp-element', 'wp-i18n' ], // Required dependencies for blocks
    filemtime( get_template_directory() . $blockPath ) // Version of last time file was saved
  );
  wp_enqueue_style(
    'ejemplo',
    plugins_url( 'ejemplo.css', __FILE__ ) 
  );
}

// Hook into editor only hook
add_action('enqueue_block_editor_assets', 'block_accordion');

?>