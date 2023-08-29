<?php

function register_card_custom() {
  $blockPath = '/blocks/card-custom/card';

  // Registra el script
  wp_register_script(
    'card-block', // Unique handle for JS file
    get_template_directory_uri() . $blockPath . '.js',
    array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ),
    filemtime( get_template_directory() . $blockPath . '.js' )
  );

  // Registra los estilos del bloque
  wp_register_style(
    'card-block-css',
    get_template_directory_uri() . $blockPath . '.css',
    array(),
    filemtime( get_template_directory() . $blockPath . '.css' )
  );

  // Registra el bloque
  register_block_type( 'card-block/my-block', array(
    'editor_script' => 'card-block',
    'editor_style' => 'card-block-css',  // Estilo del editor
    'style' => 'card-block-css', // Estilo de la vista pública
  ) );
}
// Hook into editor only hook
add_action( 'enqueue_block_editor_assets', 'register_card_custom' );

?>