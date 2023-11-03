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

add_theme_support('custom-header');

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
require_once get_template_directory() . '/blocks/table-custom/table.php';

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
function theme_styles_scss()  { 
  // Cargar hoja de estilo 
  wp_enqueue_style( 'style_scss', get_template_directory_uri() . '/style.scss'); 
}
add_action('wp_enqueue_scripts', 'theme_styles_scss');
//--------------------Pruebas

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

//IUMA Cards/tarjetas style Legacy
function agregar_estilos_tarjetas_iuma_legacy() {
  wp_enqueue_style('estilos-tarjetas_iuma', get_template_directory_uri() . '/css/custom_styles/card_iuma_legacy.css');
}
add_action('wp_enqueue_scripts', 'agregar_estilos_tarjetas_iuma_legacy');

//Single Post/Entrada
function agregar_estilo_noticias_single() {
  wp_enqueue_style('single_noticia', get_template_directory_uri() . '/css/custom_styles/custom_single_noticia.scss');
}
add_action('wp_enqueue_scripts', 'agregar_estilo_noticias_single');

// JS Lista Categorías --> Modo Móvil
function agregar_list_category_phone_view() {
  wp_enqueue_script(
    'estilos_movil-list_category',
    get_template_directory_uri() . '/blocks-dynamic/list-category/list_category_phone_view.js',
    array(), // Sin dependencias
    '0.1', // Versión del archivo jquery
    true
  );
}
add_action('wp_enqueue_scripts', 'agregar_list_category_phone_view');


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

/**
 * Añade el JavaScript que hace funcionar al Carrusel
 *
 * @return void
 */
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


// SideBar
function subMenu($menu_slug, $menu_title) {
  $subMenu = "
    <li>
      <span class='nolink'>{$menu_title}</span>
      <ul class='menu'>
  ";

  $menu_items = wp_get_nav_menu_items($menu_slug);
  foreach ($menu_items as $menu_item) {
    $url = $menu_item->url;
    $title = $menu_item->title;
    $active = '';
    if (is_page($menu_item->object_id)) {
      $active = 'active';
    }
    $subMenu .= "
      <li class='{$active}'><a href='{$url}'>{$title}</a></li>
    ";
  }  
  
  $subMenu .= "
      </ul>
    </li>
  ";
  return $subMenu;
}
function suscriptionPanel($menu_slug, $menu_title) {
  $suscription = "
    <li class='not-first'>
      <span class='nolink'> Suscripción </span>
      <ul class='menu'>

      ". do_shortcode('[email-subscribers-form id="1"]') ."
      
      </ul>
    </li>
  ";
  return $suscription;
}
function social_facebook() {
  $facebook = "
    <li class='not-first'>
      <span class='nolink'> Facebook </span>
      <ul class='menu'>      
        
        <script async defer crossorigin='anonymous' src='https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v5.0'></script>

        <div class='fb-page' data-href='https://www.facebook.com/IUMA.ulpgc' data-tabs='timeline' data-width='' data-height='600' 
          data-small-header='true' data-adapt-container-width='true' data-hide-cover='false' data-show-facepile='true'>
          
          <blockquote class='fb-xfbml-parse-ignore' cite='https://www.facebook.com/IUMA.ulpgc'>
            <a href='https://www.facebook.com/IUMA.ulpgc'>
              IUMA - ULPGC
            </a>
          </blockquote>
        </div>
      </ul>
    </li>
  ";
  return $facebook;
}
function social_X_twitter() {
  $twitterX = "
    <li class='not-first'>
      <span class='nolink'> Twitter / X </span>
      <ul class='menu'>      
        
      <a class='twitter-timeline' data-height='810' data-theme='light' href='https://twitter.com/IUMAnews?ref_src=twsrc%5Etfw'>
        Tweets by IUMAnews
      </a>
      <script async src='https://platform.twitter.com/widgets.js' charset='utf-8'></script>
      
      </ul>
    </li>
  ";
  return $twitterX;
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
        <?php echo subMenu($menu_slug, $menu_title) ?>        
			</ul>
		</div>
	</div>
	<?php
}
/**
 * Muestra el Menú de navegación lateral y el Panel de suscripción
 *
 * @param string $menu_slug Slug del menú que se quiere mostrar (referencia al menú creado en Wordpress) Ej: 'AboutMenu'
 * @param string $menu_title Título que se mostrará en el menú. Ej: 'Sobre el IUMA'
 *
 * @return void
 */
function get_submenu_suscriptionPanel_sidebar($menu_slug, $menu_title) {
	?>
	<!--<div class="submenu-mobile" id="titulo_menu_izq"><span id="title-submenu-movil"></span> <span class="ulpgcds-icon ulpgcds-icon-caret-down"></span></div>-->

	<div class="sidebar-left">
		<div class="sidebar-left__block">
      <ul class="menu">
        <?php echo subMenu($menu_slug, $menu_title) ?>
        <?php echo suscriptionPanel($menu_slug, $menu_title) ?>  
      </ul>
    </div>
	</div>
	<?php
}
/**
 * Muestra el Menú de navegación lateral, el Panel de suscripción y las redes sociales
 *
 * @param string $menu_slug Slug del menú que se quiere mostrar (referencia al menú creado en Wordpress) Ej: 'AboutMenu'
 * @param string $menu_title Título que se mostrará en el menú. Ej: 'Sobre el IUMA'
 *
 * @return void
 */
function get_submenu_suscriptionPanel_socialMedia_sidebar($menu_slug, $menu_title) {
	?>
	<!--<div class="submenu-mobile" id="titulo_menu_izq"><span id="title-submenu-movil"></span> <span class="ulpgcds-icon ulpgcds-icon-caret-down"></span></div>-->

	<div class="sidebar-left">
		<div class="sidebar-left__block">
      <ul class="menu">
        <?php echo subMenu($menu_slug, $menu_title) ?>
        <?php echo suscriptionPanel($menu_slug, $menu_title) ?>  
        <?php echo social_facebook() ?>
        <?php echo social_X_twitter() ?>  
      </ul>
    </div>
	</div>
	<?php
}


// Añade la opción de seleccionar el submenu/ Menú de navegación lateral en el editor
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

?>