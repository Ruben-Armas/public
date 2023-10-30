<?php

function seemore_block() {
  $blockPath = '/blocks/seemore/seemore';
  
  // Registra el script
  wp_register_script(
    'seemore-block', // Unique handle for JS file
    get_template_directory_uri() . $blockPath . '.js', // Path to file
    ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data'], // Required dependencies for blocks
    filemtime(get_template_directory() . $blockPath . '.js') // Version of last time file was saved
  );
  // Registra el bloque
  register_block_type( 'seemore-block/my-block', [
    'editor_script' => 'seemore-block'
  ]);

}
add_action( 'enqueue_block_editor_assets', 'seemore_block' );

?>
