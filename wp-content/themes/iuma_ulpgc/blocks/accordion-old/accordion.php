<?php

function accordion() {

  // Make path a variable so we don't write it twice
  $blockPath = '/blocks/accordion-old/accordion';

  // Registra el script
  wp_register_script(
    'accordionold-block', // Unique handle for JS file
    get_template_directory_uri() . $blockPath . '.js', // Path to file
    array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ), // Required dependencies for blocks
    filemtime(get_template_directory() . $blockPath . '.js') // Version of last time file was saved
  );
  // Registra el bloque
  register_block_type( 'accordionold-block/my-block', array(
    'editor_script' => 'accordionold-block',
    //'editor_style' => 'youtube-block-editor',
    //'style' => 'youtube-block',
  ) );

}
// Hook into editor only hook
add_action( 'enqueue_block_editor_assets', 'accordion' );

?>