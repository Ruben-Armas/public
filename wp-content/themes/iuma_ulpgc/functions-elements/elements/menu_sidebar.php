<?php

// Menu html
// SideBar /submenu
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
// Sidebar Social
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

// Muestra los Menus
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

// Selector de Menus
// Añade la opción de seleccionar el submenu/ Menú de navegación lateral en el editor
function add_sidebar_custom_meta_boxes() {
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
        <label for="title_menu">Título del menú / Nombre de la miga de pan faltante:</label><br>
        <input type="text" id="title_menu" name="title_menu" value="<?php echo esc_attr( $title_menu ); ?>">
      </p>
      <em>El menú solo funcionará en las plantillas con el menú de navegación lateral</em>
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