<?php

/**
 * Añade el JavaScript que, en las tablas de miembros del IUMA (obtenidas por el Plugin IUMA)
 *  limita la cantidad de filas a mostrar
 *  da funcionalidad a la paginación al estilo de la ULPGC
 *
 * @return void
 */

function iuma_members_plugin_js() {
  wp_enqueue_script(
    'iuma_members_plugin_style',
    get_template_directory_uri() . '/js/iuma_members_plugin.js',
    array('jquery'),
    '0.1', // Versión del archivo jquery
    true
  );
}
add_action('wp_enqueue_scripts', 'iuma_members_plugin_js');
?>