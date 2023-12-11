<?php

/**
 * Añade el JavaScript que modifica el aspecto
 * del formulario de Icegram al estilo de la ULPGC
 *
 * @return void
 */

function iuma_plugin_js() {
  wp_enqueue_script(
    'iuma_plugin_style',
    get_template_directory_uri() . '/js/iuma_plugin.js',
    array('jquery'),
    '0.1', // Versión del archivo jquery
    true
  );
}
add_action('wp_enqueue_scripts', 'iuma_plugin_js');
?>