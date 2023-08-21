<?php
/**
 * iuma_ulpgc_child Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package iuma_ulpgc_child
 * @since 1.0.0
 */

/**
 * Define Constants
 */
define( 'CHILD_THEME_IUMA_ULPGC_CHILD_VERSION', '1.0.0' );

/**
 * Enqueue styles
 */
function child_enqueue_styles() {
	$parent_style = 'iuma_ulpgc_child-theme-css'; // Estos son los estilos del tema padre recogidos por el tema hijo.

	wp_enqueue_style( $parent_style, get_stylesheet_directory_uri() . '/style.css',
		array('astra-theme-css'), CHILD_THEME_IUMA_ULPGC_CHILD_VERSION, 'all' );

}

add_action( 'wp_enqueue_scripts', 'child_enqueue_styles', 15 );


function deshabilitar_estilos_astra() {
    wp_dequeue_style( 'astra-theme-css' );
    wp_deregister_style( 'astra-theme-css' );
}

add_action( 'wp_enqueue_scripts', 'deshabilitar_estilos_astra', 20 );