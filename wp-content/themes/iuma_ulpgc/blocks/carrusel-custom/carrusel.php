<?php

function carrusel_custom() {
  $blockPath = '/blocks/carrusel-custom/carrusel';

  // Registra el script
  wp_register_script(
    'carrusel-block-js', // Unique handle for JS file
    get_template_directory_uri() . $blockPath . '.js', // Path to file
    ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data'], // Required dependencies for blocks
    filemtime(get_template_directory() . $blockPath . '.js') // Version of last time file was saved
  );
  
  // Registra los estilos backend y frontend del bloque
  wp_register_style(
    'carrusel-style',
    get_template_directory_uri() . $blockPath . '.scss',
    array(),
    filemtime( get_template_directory() . $blockPath . '.scss' )
  );
  wp_enqueue_style( 'carrusel-style' );

  // Registra el bloque
  register_block_type( 'carrusel-block/my-block', [
    'editor_script' => 'carrusel-block-js',
  ]);

}
add_action( 'enqueue_block_editor_assets', 'carrusel_custom' );

?>