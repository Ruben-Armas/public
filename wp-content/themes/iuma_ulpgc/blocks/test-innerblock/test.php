<?php

function register_test_innerblock() {
  $blockPath = '/blocks/test-innerblock/test';

  // Registra el script
  wp_register_script(
    'test-block', // Unique handle for JS file
    get_template_directory_uri() . $blockPath . '.js',
    array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ),
    filemtime( get_template_directory() . $blockPath . '.js' )
  );

  // Registra el bloque
  register_block_type( 'test-block/my-block', array(
    'editor_script' => 'test-block',
  ) );
}
// Hook into editor only hook
add_action( 'enqueue_block_editor_assets', 'register_test_innerblock' );

?>