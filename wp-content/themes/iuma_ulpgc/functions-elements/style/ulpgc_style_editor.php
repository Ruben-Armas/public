<?php

// Añade las librerias en el editor (para ver las vistas previas estilizadas)
function load_ulpgc_style_editor() {
  // Enqueue the custom CSS
  wp_enqueue_style(
    'ulpgcds-editor-css', // Nombre único del CSS
    'https://cdn.ulpgc.es/ulpgcds/1.0/css/ulpgcds.css',
    array(), // Sin dependencias
    '1.0'   // Versión del archivo CSS
  );
  wp_enqueue_script(
    'ulpgcds-editor-jquery-js', // Nombre único del script
    'https://code.jquery.com/jquery-3.4.1.min.js',
    array(), // Sin dependencias
    '3.4.1', // Versión del archivo jquery
    true    // Cargar el script en el pie de página (true) o en la cabecera (false)
  );
  // Enqueue the custom JavaScript
  wp_enqueue_script(
    'ulpgcds-editor-js', // Nombre único del script
    'https://cdn.ulpgc.es/ulpgcds/1.0/js/ulpgcds.js',
    array(), // Sin dependencias
    '1.0',  // Versión del archivo JS
    true    // Cargar el script en el pie de página (true) o en la cabecera (false)
  );
}
add_action( 'enqueue_block_editor_assets', 'load_ulpgc_style_editor' );

?>