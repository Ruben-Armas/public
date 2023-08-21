<?php
/*
Plugin Name: My First Accordion
Description: Un plugin para crear un nuevo bloque de acordeón en Gutenberg
Author: Rubén Armas IUMA
Version: 1.0.0
*/

function block_accordion2() {
  // Make path a variable so we don't write it twice
  echo "holaaaaaaaaa";
  
}

// Hook into editor only hook
add_action('init', 'block_accordion2');

?>