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

  // Registra el bloque
  register_block_type( 'card-block/my-block', array(
    'editor_script' => 'card-block'
  ) );
  
  // Registra los estilos backend y frontend del bloque
  wp_register_style(
    'card-block-style',
    get_template_directory_uri() . $blockPath . '.scss',
    array(),
    filemtime( get_template_directory() . $blockPath . '.scss' )
  );
  wp_enqueue_style( 'card-block-style' );

}

add_action( 'enqueue_block_editor_assets', 'register_card_custom' );
add_action( 'wp_enqueue_scripts', 'register_card_custom' );

?>