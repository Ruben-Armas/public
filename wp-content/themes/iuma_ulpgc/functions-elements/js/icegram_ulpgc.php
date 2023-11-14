<?php

/**
 * Añade el JavaScript que modifica el aspecto
 * del formulario de Icegram al estilo de la ULPGC
 *
 * @return void
 */

function icegram_ulpgc_js() {
  wp_enqueue_script(
    'icegram_ulpgc_style',
    get_template_directory_uri() . '/js/icegram_ulpgc.js',
    array('jquery'),
    '0.1', // Versión del archivo jquery
    true
  );
}
add_action('wp_enqueue_scripts', 'icegram_ulpgc_js');
?>