<?php

function prueba() {

  // Make path a variable so we don't write it twice
  $blockPath = '/blocks-dynamic/prueba/prueba';

  // Registra el script
  wp_register_script(
    'prueba-block-js', // Unique handle for JS file
    get_template_directory_uri() . $blockPath . '.js', // Path to file
    ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data'], // Required dependencies for blocks
    filemtime(get_template_directory() . $blockPath . '.js') // Version of last time file was saved
  );
  // Registra el bloque
  register_block_type( 'prueba-block/my-block', [
    'editor_script' => 'prueba-block-js',
    'render_callback' => 'prueba_render',
    'attributes' => [
			'selectedPostId' => [
        'type' => 'number',
        'default' => 0
      ],
		]
  ]);

}
add_action( 'init', 'prueba' );

function prueba_render($attributes, $content) {
  $str = '';
	if ($attributes['selectedPostId'] > 0) {
		$post = get_post($attributes['selectedPostId']);
		if (!$post) {
			return $str;
		}
		$str = '<div class="awp-myfirstblock">';
		$str .= '<a href="' . get_the_permalink($post) . '">';
		$str .= '<h3>' . get_the_title($post) . '</h3>';
		$str .= '</a>';
		$str .= '</div>';
	}
  else $str = 'No se ha encontrado o no ha introducido la página';
	return $str;
}

?>