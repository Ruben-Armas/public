<?php
/*
Plugin Name: ULPGC
Description: Un plugin para crear los bloques personalizados de la ULPGC en Gutenberg
Author: Rubén Armas IUMA
Version: 1.0.0
*/

function ulpgc_custom_blocks() {
  $blocks = array(
    'accordion',
    'accordion2',
    'accordion3',
  );

  foreach ($blocks as $block) {
    register_block_type(
      $block,
      array(
        'editor_script' => 'block-' . $block,
        'render_callback' => 'render_block_' . $block,
      )
    );
  }
}
//add_action('enqueue_block_editor_assets', 'ulpgc_custom_blocks');

?>