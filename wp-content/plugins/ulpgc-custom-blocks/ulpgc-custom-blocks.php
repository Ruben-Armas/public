<?php
/*
Plugin Name: ULPGC Custom Blocks
Description: Un plugin para crear los bloques personalizados de la ULPGC en Gutenberg
Author: Rubén Armas IUMA
Version: 1.0.0
*/

function registrar_bloques_personalizados() {

  //echo "ULPGC";
  //echo plugin_dir_path( __FILE__ );
  //echo "\n" . plugin_dir_path( __FILE__ ) . 'blocks/mi-primer-plugin/mi-primer-plugin.php';

  // Add more includes for each additional block you want to add
  include( plugin_dir_path( __FILE__ ) . 'blocks/prueba-plugin/prueba-plugin.php' );
  include( plugin_dir_path( __FILE__ ) . 'blocks/prueba-new/prueba-new.php' );
  include( plugin_dir_path( __FILE__ ) . 'blocks/prueba-block-settings-sidebar/prueba-sidebar.php' );
  include( plugin_dir_path( __FILE__ ) . 'blocks/prueba-block-settings-toolbar/prueba-toolbar.php' );
  include( plugin_dir_path( __FILE__ ) . 'blocks/accordion/accordion.php' );

}

// Hook into start wordpress
add_action( 'init', 'registrar_bloques_personalizados' );
// Hook into editor only hook
//add_action( 'enqueue_block_editor_assets', 'registrar_bloques_personalizados' );

// Categoría ULPGC
function filter_block_categories_when_post_provided( $block_categories, $editor_context ) {
  if ( ! empty( $editor_context->post ) ) {
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
//add_filter( 'block_categories_all', 'filter_block_categories_when_post_provided', 10, 2 );

?>