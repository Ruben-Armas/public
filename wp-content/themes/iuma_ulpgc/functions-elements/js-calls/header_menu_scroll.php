<?php

/**
 * Añade la función que oculta el header menu al hacer scroll
 *
 * @return void
 */
function header_menu_scroll(){
  wp_register_script('header_menu_scroll_js', get_stylesheet_directory_uri(). '/js/header_menu_scroll.js', array('jquery'), '1.0', true );
  wp_enqueue_script('header_menu_scroll_js');    
}
add_action("wp_enqueue_scripts", "header_menu_scroll");

?>