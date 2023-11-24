<?php

function spacing_block() {
  $blockPath = '/blocks/spacing/spacing';
  
  // Registra el script
  wp_register_script(
    'spacing-block', // Unique handle for JS file
    get_template_directory_uri() . $blockPath . '.js', // Path to file
    ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data'], // Required dependencies for blocks
    filemtime(get_template_directory() . $blockPath . '.js') // Version of last time file was saved
  );
  // Registra el bloque
  register_block_type( 'spacing-block/my-block', [
    'editor_script' => 'spacing-block'
  ]);

}
add_action( 'enqueue_block_editor_assets', 'spacing_block' );

?>
