<?php

function image_update_dynamic() {
  $blockPath = '/blocks-dynamic/image-update/image_update';

  // Registra el script
  wp_register_script(
    'imageupdate-block-js', // Unique handle for JS file
    get_template_directory_uri() . $blockPath . '.js', // Path to file
    ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data'], // Required dependencies for blocks
    filemtime(get_template_directory() . $blockPath . '.js') // Version of last time file was saved
  );
  // Registra los estilos del bloque
  wp_register_style(
    'imageupdate-block-css',
    get_template_directory_uri() . $blockPath . '.css',
    array(),
    filemtime( get_template_directory() . $blockPath . '.css' )
  );
  // Registra el bloque
  register_block_type( 'imageupdate-block/my-block', [
    'editor_script' => 'imageupdate-block-js',
    'editor_style' => 'imageupdate-block-css',  // Estilo del editor
    'style' => 'imageupdate-block-css', // Estilo de la vista pública
    'render_callback' => 'imageupdate_render',
    'attributes' => [
			'path_img' => [
        'type' => 'string',
        'default' => '/wp-content/themes/iuma_ulpgc/images/'
      ],
			'name_img' => [
        'type' => 'string',
        'default' => 'publicaciones.png'
      ],
      'url' => [
        'type' => 'string',
        'default' => 'https://accedacris.ulpgc.es/cris/ou/ou00045',
      ],
      'txtUrlCheck' => [
        'type' => 'boolean',
        'default' => 'true',
      ],
      'txtUrl' => [
        'type' => 'string',
        'default' => 'Pulse este enlace para ver más información.',
      ],
      // Flag para mostrar html diferente en el edit y el save(true)
      'isWebView' => [
        'type' => 'boolean',
        'default' => true,
      ]
		]
  ]);

}
add_action( 'init', 'image_update_dynamic' );

function imageupdate_render($attributes) {
  $path_img = $attributes['path_img'];
  $name_img = $attributes['name_img'];
  $url = $attributes['url'];
  $txtUrlCheck = $attributes['txtUrlCheck'];
  $txtUrl = $attributes['txtUrl'];

  // Comprobar si la imagen existe
  $image_exists = file_exists($_SERVER['DOCUMENT_ROOT'] . $path_img . $name_img);

  // Verificar si el bloque está siendo mostrado en la vista pública (frontend)
  $webView = $attributes['isWebView'];
  $output = $webView ? '' : '<div class="notice-error-custom"><p>La imagen no existe o no está en la ruta indicada.</p></div>';

  if ($image_exists) {
    $timestamp = time();
    $imgUrl = $path_img . $name_img . '?v=' . $timestamp;

    $output = "
      <a href='$url' target='_blank' rel='noopener'>
        <img src='$imgUrl' style='width: 100%; height: auto;'>";
    $output .= $txtUrlCheck ? 
        "<h3 class='vertical-margin'>$txtUrl</h3>" : ''; 
    $output .= "
      </a>";
  }

  return $output;
}

?>