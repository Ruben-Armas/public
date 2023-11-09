<?php

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

?>