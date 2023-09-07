<?php

function register_test_blockprops() {
  $blockPath = '/blocks/test-blockprops/test';

  // Registra el script
  wp_register_script(
    'testblockprops-block', // Unique handle for JS file
    get_template_directory_uri() . $blockPath . '.js',
    array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ),
    filemtime( get_template_directory() . $blockPath . '.js' )
  );

  // Registra el bloque
  register_block_type( 'testblockprops-block/my-block', array(
    'editor_script' => 'testblockprops-block',
  ) );
}
// Hook into editor only hook
add_action( 'enqueue_block_editor_assets', 'register_test_blockprops' );

?>