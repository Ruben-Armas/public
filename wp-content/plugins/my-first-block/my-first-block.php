<?php
/*
Plugin Name: My First Block Arsys
Description: Un plugin para crear un nuevo bloque en Gutenberg
Author: Arsys Internet
Author URI: https://www.arsys.es/
Version: 0.0.0
*/

function my_first_block() {
  wp_enqueue_script(
    'my_first_block-js',
    plugins_url('my-first-block/js/my-first-block.js', dirname(__FILE__),
    array( 'wp-blocks', 'wp-dom-ready', 'wp-edit-post' ))
  );
  /*wp_enqueue_style(
    'ejemplo',
    plugins_url( 'ejemplo.css', __FILE__ ) 
  );*/
}

// Hook into editor only hook
add_action('enqueue_block_editor_assets', 'my_first_block');

?>