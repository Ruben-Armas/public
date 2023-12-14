<?php
/*
 * iuma_ulpgc_child Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package iuma_ulpgc
 * @since 1.0.0
 */

// Soporte para imagenes destacadas
add_theme_support( 'post-thumbnails' );

// Carga los estilos del tema
function theme_styles()  { 
  // Cargar hoja de estilo 
  wp_enqueue_style( 'style', get_template_directory_uri() . '/style.css'); 
} 
add_action('wp_enqueue_scripts', 'theme_styles');
 
/*
 * Define Constants

define( 'CHILD_THEME_IUMA_ULPGC_CHILD_VERSION', '1.0.0' );

/**
 * Enqueue styles
 
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
add_action( 'wp_enqueue_scripts', 'deshabilitar_estilos_astra', 20 );*/


// Custom Editor Blocks
require_once get_template_directory() . '/blocks/video-youtube/youtube-block.php';
require_once get_template_directory() . '/blocks/video-bustreaming/bustreaming-block.php';
require_once get_template_directory() . '/blocks/video-vimeo/vimeo-block.php';
require_once get_template_directory() . '/blocks/tabs-custom/tabs.php';
require_once get_template_directory() . '/blocks/article-custom/article.php';
require_once get_template_directory() . '/blocks/card-custom/card.php';
require_once get_template_directory() . '/blocks/carrusel-custom/carrusel.php';
require_once get_template_directory() . '/blocks/accordion/accordion.php';
require_once get_template_directory() . '/blocks/text_area-custom/text_area.php';
require_once get_template_directory() . '/blocks/web_view-custom/web_view.php';
require_once get_template_directory() . '/blocks/seemore/seemore.php';
require_once get_template_directory() . '/blocks/divider/divider.php';
require_once get_template_directory() . '/blocks/spacing/spacing.php';
require_once get_template_directory() . '/blocks/table-members/table.php';

require_once get_template_directory() . '/blocks/test-innerblock/test.php';
require_once get_template_directory() . '/blocks/test-blockprops/test.php';

// Custom Editor Blocks Dynamic
require_once get_template_directory() . '/blocks-dynamic/prueba/prueba.php';
require_once get_template_directory() . '/blocks-dynamic/carrusel-category/carrusel_category.php';
require_once get_template_directory() . '/blocks-dynamic/list-category/list_category.php';
require_once get_template_directory() . '/blocks-dynamic/img-auto_update/img-auto_update.php';

// Modify WP Editor Blocks Output
require_once get_template_directory() . '/blocks-modified/column_mod.php';


//Pruebas--------------------

//--------------------Pruebas


// Style
// Añade las librerias en el editor (para ver las vistas previas estilizadas)
include_once get_template_directory() . '/functions-elements/style/ulpgc_style_editor.php';
// IUMA Cards/tarjetas style Legacy
include_once get_template_directory() . '/functions-elements/style/css-calls/card_legacy_iuma.php';
//Single Post/Entrada
include_once get_template_directory() . '/functions-elements/style/css-calls/single_news.php';


// Category
// Categoría ULPGC
include_once get_template_directory() . '/functions-elements/category/ulpgc.php';
// Cambia la categoría del bloque existente (core/columns) a ULPGC
include_once get_template_directory() . '/functions-elements/category/core_columns_ulpgc.php';


// Show in Editor
// Vista previa de las imagenes destacadas de la entrada en el panel de administración
include_once get_template_directory() . '/functions-elements/thumbnail_preview.php';
// Menu location (header/footer)
include_once get_template_directory() . '/functions-elements/menu_location.php';


// JS functions
// JS Lista Categorías --> Modo Móvil
include_once get_template_directory() . '/functions-elements/js-calls/list_category_phone_view.php';
// Añade el JavaScript que hace funcionar al Carrusel y su movimiento
include_once get_template_directory() . '/functions-elements/js-calls/carrusel.php';
// Añade el JavaScript que muestra/oculta el HeaderMenu al hacer Scroll
include_once get_template_directory() . '/functions-elements/js-calls/header_menu_scroll.php';
// Modifica el formulario de Icegram como el de la ULPGC
include_once get_template_directory() . '/functions-elements/js-calls/icegram_ulpgc.php';

// Modifica el aspecto de las tablas generadas por el plugin del IUMA
include_once get_template_directory() . '/functions-elements/js-calls/iuma_members_plugin.php';


// Functional Elements
// Muestra la barra de navegación de menus del Header
include_once get_template_directory() . '/functions-elements/elements/menu_nav_header.php';
// Muestra las "Migas de Pan" / "Breadcrumb" de la página actual
include_once get_template_directory() . '/functions-elements/elements/breadcrumb.php';
// Muestra los SideBar (Submenu y Social)
include_once get_template_directory() . '/functions-elements/elements/menu_sidebar.php';

?>