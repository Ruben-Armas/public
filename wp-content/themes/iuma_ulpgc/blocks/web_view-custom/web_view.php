<?php

function web_view() {
  $blockPath = '/blocks/web_view-custom/web_view';
  
  // Registra el script
  wp_register_script(
    'webview-block', // Unique handle for JS file
    get_template_directory_uri() . $blockPath . '.js', // Path to file
    array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ), // Required dependencies for blocks
    filemtime(get_template_directory() . $blockPath . '.js') // Version of last time file was saved
  );
  // Registra el bloque
  register_block_type( 'webview-block/my-block', array(
    'editor_script' => 'webview-block'
    ) );

}
// Hook into editor only hook
add_action( 'enqueue_block_editor_assets', 'web_view' );

?>
