<?php

//IUMA Cards/tarjetas style Legacy
function agregar_estilos_tarjetas_iuma_legacy() {
  wp_enqueue_style('estilos-tarjetas_iuma', get_template_directory_uri() . '/css/card_iuma_legacy.css');
}
add_action('wp_enqueue_scripts', 'agregar_estilos_tarjetas_iuma_legacy');

?>