<?php

function carrusel_news_dynamic() {
  $blockPath = '/blocks-dynamic/carrusel-news/carrusel_news';

  // Registra el script
  wp_register_script(
    'carruselnews-block-js', // Unique handle for JS file
    get_template_directory_uri() . $blockPath . '.js', // Path to file
    ['wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data'], // Required dependencies for blocks
    filemtime(get_template_directory() . $blockPath . '.js') // Version of last time file was saved
  );
  // Registra el bloque
  register_block_type( 'carruselnews-block/my-block', [
    'editor_script' => 'carruselnews-block-js',
    'render_callback' => 'carruselnews_render',
    'attributes' => [
			'maxPosts' => [
        'type' => 'number',
        'default' => 5
      ],
			'maxWords' => [
        'type' => 'number',
        'default' => 35
      ],
      'selectedCategory' => [
        'type' => 'int',
        'default' => 0,
      ],
      'isEditingBlock' => [
        'type' => 'boolean',
        'default' => false,
      ],
      // Flag para mostrar html diferente en el edit y el save(true)
      'isWebView' => [
        'type' => 'boolean',
        'default' => true,
      ],
		]
  ]);

}
add_action( 'init', 'carrusel_news_dynamic' );


function getFormattedDate($date) {
  if ($date) {
    $tmpFormattedDate = date_i18n('d M Y', strtotime($date));
    return $tmpFormattedDate;
  } else {
    return '';
  }
}


function carruselnews_render($attributes, $content) {
  $recent_posts = wp_get_recent_posts( array(
    'numberposts' => $attributes['maxPosts'],
    'category'    => $attributes['selectedCategory'],
    'post_status' => 'publish',
    'post_type'   => 'post',
    /*
    'numberposts'      => 10,   // Número de posts que deseas obtener. Por defecto, 5.
		'offset'           => 0,    // Número de posts para omitir antes de comenzar a listar. Por defecto, 0.
		'category'         => 0,    // ID de la categoría para obtener posts de una categoría específica. Por defecto, 0 (todos).
		'orderby'          => 'post_date',  // Campo para ordenar los posts. Puede ser 'post_date', 'post_title', 'post_excerpt', 'post_name', 'ID', etc.
		'order'            => 'DESC',       // Dirección de ordenamiento. Puede ser 'ASC' (ascendente) o 'DESC' (descendente). Por defecto, 'DESC'.
		'include'          => '',
		'exclude'          => '',           // Array de IDs de posts para excluir de la consulta.
		'meta_key'         => '',
		'meta_value'       => '',
		'post_type'        => 'post',       // Tipo de post a obtener. Puede ser 'post', 'page', 'attachment', 'revision', etc. Por defecto, 'post'.
		'post_status'      => 'draft, publish, future, pending, private',   // Estado de los posts que se deben obtener. Puede ser 'publish', 'pending', 'draft', 'auto-draft', 'future', 'private', 'inherit', etc. Por defecto, 'publish'.
		'suppress_filters' => true,         // Si se deben suprimir los filtros. Por defecto, true.
    */
  ) );

  if ( empty( $recent_posts ) ) {
    return "<div style='background-color:#f0f07f'>Categoría vacía, seleccione otra o haga alguna entrada</div>";
  }
  
  // Verificar si el bloque está siendo mostrado en la vista pública (frontend)
  $webView = $attributes['isWebView'];
  $output = $webView ? "<ul class='ulpgcds-carrusel ulpgcds-carrusel--medium'>" : "<div class='row'>";

  $maxPostEditToShow = 5; // Número de artículos a mostrar en el editor
  $counter = 0; // Contador para contar los artículos mostrados
  $maxPosts = $attributes['maxPosts'];

  foreach ( $recent_posts as $recent_post ) {
    $counter++;
    $recent_post_title = $recent_post['post_title'];
    $recent_post_excerpt = $recent_post['post_excerpt'];
    $recent_post_date = getFormattedDate($recent_post['post_date']);
    //$recent_post_date_gmt = getFormattedDate($recent_post['post_date_gmt']);  //Hora global
    $recent_post_content = $recent_post['post_content'];  //Todo el contenido
    $recent_post_permalink = get_permalink( $recent_post['ID'] );

    // Si no hay extracto, obtener una versión truncada del contenido para mostrar como extracto
    if ( empty($recent_post_excerpt) ) {
      $content = $recent_post['post_content'];
      $recent_post_excerpt = wp_trim_words( $content, $attributes['maxWords'] );
    } else {
      $recent_post_excerpt = wp_trim_words( $recent_post_excerpt, $attributes['maxWords'] );
    }

    // Mostrar solo 5 artículos en el editor
    if ( !$webView && $counter > $maxPostEditToShow ) {
      break; // Si es la vista pública y ya se mostraron 5 artículos, detener el bucle
    }

    $output .= $webView ? '<li>' : '<div class="col-4 col-sm-4">';
      $output .= "
        <article class='ulpgcds-article'>
          <a href='$recent_post_permalink'>
            <h3>$recent_post_title</h3>
            <div class='ulpgcds-article__date'>$recent_post_date</div>
          </a>
          <p>$recent_post_excerpt</p>
        </article>
      ";
    $output .= $webView ? '</li>' : '</div>';
  }

  // Agregar "..." en el sexto artículo si se están mostrando más de 5 en la vista pública
  if ( !$webView && count($recent_posts) > $maxPostEditToShow ) {
    $po = count($recent_posts);
    $output .= "<div class='col-4 col-sm-4'><article class='ulpgcds-article'><h3>...</h3></article></div>";
  }
  $output .= $webView ? '</ul>' : '</div>';  

  return $output;
}

?>