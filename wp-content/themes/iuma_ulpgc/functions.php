<?php
/*
 * iuma_ulpgc_child Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package iuma_ulpgc
 * @since 1.0.0
 */

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
require_once get_template_directory() . '/blocks/table-custom/table.php';

// Custom Editor Blocks Dynamic
require_once get_template_directory() . '/blocks-dynamic/carrusel-news/carrusel_news.php';
require_once get_template_directory() . '/blocks-dynamic/image-update/image_update.php';

// Modify WP Editor Blocks Output
require_once get_template_directory() . '/blocks-modified/column_mod.php';

// Añade las librerias en el editor (para ver las vistas previas estilizadas)
function cargar_editor_assets() {
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
add_action( 'enqueue_block_editor_assets', 'cargar_editor_assets' );


// Categoría ULPGC
function add_filter_category_block_ulpgc_when_post_provided( $block_categories, $editor_context ) {    
    if ( !empty( $editor_context->post ) ) {
      /* //Adds at the end
        array_push(
          $block_categories,
          array(
            'slug'  => 'ulpgc',
            'title' => __( 'ULPGC', 'ULPGC-plugin' ),
            'icon'  => 'appearance',
          )
        );
      */
      //Adds in one position
      array_splice(
        $block_categories,
        0,      //'$offset' --> Array position 
        0,      //'$length' --> Num of items to be removed or replaced      
        array(  //array of elements to be inserted at offset
          array(
            'slug'  => 'ulpgc',
            'title' => __( 'ULPGC', 'textdomain' ),
            'icon'  => 'appearance',
          ),
        )
      );
    }
    return $block_categories;
}  
add_filter( 'block_categories_all', 'add_filter_category_block_ulpgc_when_post_provided', 10, 2 );

// Cambia la categoría del bloque existente (core/columns) a ULPGC
function modify_block_category($settings) {
    if (isset($settings['name']) && $settings['name'] === 'core/columns'){
        $settings['category'] = 'ulpgc';
    }
    return $settings;
}
add_filter('block_type_metadata', 'modify_block_category', 10, 2);


//Pruebas--------------------
/*function custom_field_url_suggestions( $suggestions, $field ) {
    if ( 'url' === $field['type'] ) {
        $args = array(
            'post_type' => 'page',
            'posts_per_page' => -1,
        );
        $pages = get_posts( $args );
        foreach ( $pages as $page ) {
            $suggestions[] = array(
                'value' => get_permalink( $page->ID ),
                'label' => get_the_title( $page->ID ),
            );
        }
    }
    return $suggestions;
}
add_filter( 'gcb_field_suggestions', 'custom_field_url_suggestions', 10, 2 );
*/
/*
function enqueue_custom_script() {
    wp_enqueue_script(
        'ulpgcds-script', // Nombre único para el archivo JS
        'https://cdn.ulpgc.es/ulpgcds/1.0/js/ulpgcds.js', // URL completa del archivo JS externo
        array(), // Dependencias (si las hay)
        '1.0', // Versión del archivo JS
        true // Cargar el archivo JS en el pie de página (opcional)
    );
}
add_action( 'wp_enqueue_scripts', 'enqueue_custom_script' );
*/
//--------------------Pruebas

//wp_enqueue_script('carrusel-script', get_template_directory_uri() . '/js/carrusel.js', array('jquery'), '1.0', true);
function carrusel_js(){    
    wp_register_script('miscript', get_stylesheet_directory_uri(). '/js/carrusel.js', array('jquery'), '1.0', true );
    wp_enqueue_script('miscript');    
}
add_action("wp_enqueue_scripts", "carrusel_js");


/**
 * Muestra la barra de navegación superior haciendo uso de un menu con sus sub-menus (Añadidos a mano)
 *
 * @param string $menu_slug Slug del menú que se quiere mostrar (referencia al menú creado en Wordpress) Ej: 'HeaderMenu'
 * 
 * @return void
 */
function get_ulpgc_header_nav_menus($menu_slug) {
    ?>
    <nav class="ulpgcds-header__bottom" id="main-menu">        
        <ul class="ulpgcds-header__bottom__menu">
            <?php
            // Obtener los elementos del menú
            $menu_items = wp_get_nav_menu_items($menu_slug);

            // Variables de control de sub-menú
            $submenu_exists = false;

            // Recorrer los elementos del menú
            foreach ($menu_items as $item) {
                // Si el item es un elemento de primer nivel
                if ($item->menu_item_parent == 0) {
                    // Cerrar el sub-menú anterior (si lo hay)
                    if ($submenu_exists){
                        echo '</ul>';
                        $submenu_exists = false;
                    }                
                    // Mostrar el elemento de primer nivel
                    echo '<li><a href="' . $item->url . '">' . $item->title . '</a>';

                } else {
                    // Si es el primer sub-menú lo abrimos
                    if (!$submenu_exists){
                        echo '<ul>';
                    }
                    $submenu_exists = true;
                    
                    // Mostrar el elemento del sub-menú
                    echo '<li><a href="' . $item->url . '">' . $item->title . '</a></li>';
                }
            }
            ?>
        </ul>
    </nav>
    <?php

}

/**
 * Muestra las "Migas de Pan" / "Breadcrumb" de la página actual
 *
 * @return void
 */
function get_ulpgc_breadcrumb() {
    $ancestors = array_reverse(get_post_ancestors(get_queried_object_id()));
    $current_page = get_the_title();
    ?>
    <nav aria-label="Breadcrumb" class="ulpgcds-breadcrumb">
        <div class="ulpgcds-breadcrumb-label">Te encuentras en:</div>
        <ul>
            <li class="ulpgcds-breadcrumb__item"><a class="ulpgcds-breadcrumb__item__link first" href="<?php echo home_url(); ?>">Inicio</a></li>
            <?php
            foreach ($ancestors as $ancestor) {
                echo '<li class="ulpgcds-breadcrumb__item"><a class="ulpgcds-breadcrumb__item__link" href="' . get_permalink($ancestor) . '">' . get_the_title($ancestor) . '</a></li>';
            }
            ?>
            <li aria-current="page" class="breadcrumb__item"><?php echo $current_page; ?></li>
        </ul>
    </nav>
    <?php
}

/**
 * Muestra el sub-menú de navegación lateral y marca como activa la página actual
 *
 * @param string $menu_slug Slug del menú que se quiere mostrar (referencia al menú creado en Wordpress) Ej: 'AboutMenu'
 * @param string $menu_title Título que se mostrará en el menú. Ej: 'Sobre el IUMA'
 *
 * @return void
 */
function get_ulpgc_submenu_sidebar($menu_slug, $menu_title) {
	?>
	<div class="submenu-mobile" id="titulo_menu_izq"><span id="title-submenu-movil"></span> <span class="ulpgcds-icon ulpgcds-icon-caret-down"></span></div>

	<div class="sidebar-left">
		<div class="sidebar-left__block">
			<ul class="menu">
				<li><span class="nolink"><?php echo $menu_title ?></span>
					<ul>
						<?php //wp_nav_menu( array( 'theme_location' => 'AboutMenu' ) ); ?>
						<?php
							$menu_items = wp_get_nav_menu_items($menu_slug);
							foreach ($menu_items as $menu_item) {
								$url = $menu_item->url;
								$title = $menu_item->title;
								$active = '';
								if (is_page($menu_item->object_id)) {
									$active = 'active';
								}
								echo '<li class="' . $active . '"><a href="' . $url . '">' . $title . '</a></li>';
							}
						?>
					</ul>
				</li>
			</ul>
		</div>
	</div>
	<?php
}


// Añade la opción de seleccionar el submenu_sidebar en el editor
function add_sidebar_custom_meta_boxes() {
	/*$template_slug = get_page_template_slug();
	print($template_slug);
	// Comprueba si la plantilla actual es la que tiene submenu_sidebar
    if ($template_slug == 'page-templates/page-title_sidebar.php') {*/

	add_meta_box(
		'custom_meta_box',	// ID del campo personalizado
		'Opciones del menú de navegación lateral',	// Título del campo personalizado
		'render_sidebar_custom_meta_box',	// Callback para renderizar el campo personalizado
		'page', 	// Página a la que se aplicará el campo personalizado (en este caso, página)
		'side', 	// Ubicación del campo personalizado en la pantalla de edición
		'default' 	// Prioridad del campo personalizado en la pantalla de edición
	);
}
add_action( 'add_meta_boxes', 'add_sidebar_custom_meta_boxes' );

function render_sidebar_custom_meta_box( $post ) {
    wp_nonce_field( basename( __FILE__ ), 'custom_meta_box_nonce' );
    $slug_menu = get_post_meta( $post->ID, 'slug_menu', true );
    $title_menu = get_post_meta( $post->ID, 'title_menu', true );
    $menus = wp_get_nav_menus();
    ?>
	<div id="custom_meta_box">
		<p>
			<label for="slug_menu">Seleccionar un menú:</label><br>
			<select id="slug_menu" name="slug_menu">
				<?php foreach ( $menus as $menu ) { ?>
					<option value="<?php echo esc_attr( $menu->slug ); ?>" <?php selected( $menu->slug, $slug_menu ); ?>><?php echo esc_html( $menu->name ); ?></option>
				<?php } ?>
			</select>
		</p>
		<p>
			<label for="title_menu">Título del menú:</label><br>
			<input type="text" id="title_menu" name="title_menu" value="<?php echo esc_attr( $title_menu ); ?>">
		</p>
		<em>Solo funcionará en la plantilla con el menú de navegación lateral</em>
	</div>    
    <?php
}

function save_sidebar_custom_meta_box_data( $post_id ) {
    if ( ! isset( $_POST['custom_meta_box_nonce'] ) ) {
        return;
    }
    if ( ! wp_verify_nonce( $_POST['custom_meta_box_nonce'], basename( __FILE__ ) ) ) {
        return;
    }
    if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
        return;
    }
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }
    if ( isset( $_POST['slug_menu'] ) ) {
        update_post_meta( $post_id, 'slug_menu', sanitize_text_field( $_POST['slug_menu'] ) );
    }
    if ( isset( $_POST['title_menu'] ) ) {
        update_post_meta( $post_id, 'title_menu', sanitize_text_field( $_POST['title_menu'] ) );
    }
}
add_action( 'save_post', 'save_sidebar_custom_meta_box_data' );


// Soporte para imagenes destacadas
add_theme_support( 'post-thumbnails' );

// Vista previa de las imagenes destacadas de la entrada en el panel de administración
if ( !function_exists('AddThumbColumn') && function_exists('add_theme_support') ) {
    add_theme_support('post-thumbnails', array( 'post', 'page' ) );
    function AddThumbColumn($cols) {
        $cols['thumbnail'] = __('Thumbnail');
        return $cols;
    }
    function AddThumbValue($column_name, $post_id) {
        $width = (int) 50;
        $height = (int) 50;
        if ( 'thumbnail' == $column_name ) {
            $thumbnail_id = get_post_meta( $post_id, '_thumbnail_id', true );
            $attachments = get_children( array('post_parent' => $post_id, 'post_type' => 'attachment', 'post_mime_type' => 'image') );
            if ($thumbnail_id)
                $thumb = wp_get_attachment_image( $thumbnail_id, array($width, $height), true );
            elseif ($attachments) {
                foreach ( $attachments as $attachment_id => $attachment ) {
                    $thumb = wp_get_attachment_image( $attachment_id, array($width, $height), true );
                }
            }
            if ( isset($thumb) && $thumb ) {
                echo $thumb;
            } else {
                echo __('None');
            }
        }
    }
    add_filter( 'manage_posts_columns', 'AddThumbColumn' );
    add_action( 'manage_posts_custom_column', 'AddThumbValue', 10, 2 );
    add_filter( 'manage_pages_columns', 'AddThumbColumn' );
    add_action( 'manage_pages_custom_column', 'AddThumbValue', 10, 2 );
    }
?>