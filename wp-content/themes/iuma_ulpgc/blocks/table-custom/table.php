<?php

function register_table_custom() {
  $blockPath = '/blocks/table-custom/table';

  // Registra el script
  wp_register_script(
    'table-block', // Unique handle for JS file
    get_template_directory_uri() . $blockPath . '.js',
    array( 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components' ),
    filemtime( get_template_directory() . $blockPath . '.js' )
  );

  // Registra los estilos del bloque
  /*wp_register_style(
    'table-block-css',
    get_template_directory_uri() . $blockPath . '.css',
    array(),
    filemtime( get_template_directory() . $blockPath . '.css' )
  );*/

  // Registra el bloque
  register_block_type( 'table-block/my-block', array(
    'editor_script' => 'table-block',
    //'editor_style' => 'table-block-css',  // Estilo del editor
    //'style' => 'table-block-css', // Estilo de la vista pública
  ) );
}
// Hook into editor only hook
add_action( 'enqueue_block_editor_assets', 'register_table_custom' );

?>