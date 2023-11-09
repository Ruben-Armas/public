<?php

/**
 * Muestra las "Migas de Pan" / "Breadcrumb" de la página actual
 * 
 * Si el menú no tiene una Página Principal asignada,
 *    pone el nombre del menú (NewsMenu)
 *    o el especificado en el campo del editor (Noticias)
 * si tiene, pone el nombre del menú (Noticias)
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
      // Muestra el título del menú padre si lo tiene (Depende de HeaderMenu)
      $menu_parent_id = get_menu_parent_id(get_the_ID()); //ID del menú principal/secundario

      if ($menu_parent_id) {
        // Declara las variables según si es un ID Secundario o Principal / Busca en HeaderMenu o el resto
        $menu = wp_get_nav_menu_object($menu_parent_id);
        $menu_parent_title = get_post_meta(get_the_ID(), 'title_menu', true); // Nombre definido a mano en el editor
        // Principal - resto de menus
        if ($menu) {
          // Nombre a mano o el del menu
          if (empty($menu_parent_title))
            $menu_parent_title = esc_html($menu->name);
        // Secundario - HeaderMenu
        } else{
          // Nombre a mano o el del menu
          if (empty($menu_parent_title))
            $menu_parent_title = get_the_title($menu_parent_id);
          // Link del Padre, definido en el HeaderMenu
          $menu_parent_item = get_post($menu_parent_id);
          $parent_link = get_post_meta($menu_parent_item->ID, '_menu_item_url', true);
        }        

        if ($parent_link)
          echo '<li class="ulpgcds-breadcrumb__item"><a class="ulpgcds-breadcrumb__item__link" href="'. $parent_link .'">' . $menu_parent_title .'</a></li>';
        else
          echo '<li class="ulpgcds-breadcrumb__item">'. $menu_parent_title .'</li>';
      }

      // Muestra el resto de ancestros
      if ($ancestors){
        foreach ($ancestors as $ancestor) {
          // Si el ancestro es el menú superior, omite la repetición
          if ($ancestor !== $menu_parent_id && get_the_title($ancestor) !== get_the_title($menu_parent_id)) {
            echo '<li class="ulpgcds-breadcrumb__item"><a class="ulpgcds-breadcrumb__item__link" href="' . get_permalink($ancestor) . '">' . get_the_title($ancestor) . '</a></li>';
          }
        }
      }
      ?>

      <li aria-current="page" class="breadcrumb__item"><?php echo $current_page; ?></li>
    </ul>
  </nav>
  <?php
}

/**
 * Muestra las "Migas de Pan" / "Breadcrumb" de la página actual
 * Busca el ID de los menús en 'HeaderMenu', si no está lo busca en el resto
 * ('HeaderMenu' menú formado por otros menús)
 * 
 *  'HeaderMenu'  --> ID de Menú Secundario
 *  El resto      --> ID de Menú Principal
 *
 * @return int ID
 */
function get_menu_parent_id($current_page_id) {
  $item_found = false;
  $menu_name = 'HeaderMenu';
  $menu_items = wp_get_nav_menu_items($menu_name);
  if ($menu_items) {
    foreach ($menu_items as $menu_item) {
      if ($menu_item->object_id == $current_page_id) {
        $item_found = true;
        return $menu_item->menu_item_parent;
      }
    }
  } else {
    var_dump('No se encuentra '. $menu_name);
  }

  // Busca el item en el resto de menus
  if (!$item_found){
    // Todos los menus registrados en WordPress
    $menus = get_terms('nav_menu');

    foreach ($menus as $menu) {
      if ($menu->name !== $menu_name){
        //echo '- '. $menu->name .'<br>';
        $menu_items = wp_get_nav_menu_items($menu->name);
        if ($menu_items) {
          foreach ($menu_items as $menu_item) {
            //echo '--- ' . get_the_title($menu_item->object_id) . '<br>';
            if ($menu_item->object_id == $current_page_id) {
              //echo '<br> ('. get_the_title($menu_item). ' - '. $menu_item->menu_item_parent .')
              //      - ('. get_the_title($menu_item->menu_item_parent). ' - '. $menu_item->menu_item_parent .')
              //      - ('. $menu->name. ' - '. $menu->term_id .') ';
              //return $menu_item->menu_item_parent;
              return $menu->term_id; // Devuelve el nombre del menú si se encuentra la página actual en el menú
            }
          }
        }
      }        
    }
  }
  
  return 0; // Si no se encuentra un menú superior, devuelve 0
}

?>