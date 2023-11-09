<?php

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

?>